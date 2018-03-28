import { Request, Response } from 'express';
import * as guardCall from 'express-jwt-permissions';
import { controller, httpPost, requestParam, queryParam, httpGet } from 'inversify-express-utils';
import * as jwt from 'express-jwt';
import { config } from '../config/app-config';
import { inject } from 'inversify';
import { BaseController } from './base';
import { transformAndValidate } from 'class-transformer-validator';
import * as _ from 'lodash';
import { logger } from '../common/logger';
import { Coordinates } from '../contracts/coordinates';
import { MqttService, Topics } from '../services/mqtt-service';
import { SpeakCommand } from '../contracts/speak-command';
import * as uuid from 'uuid/v4';

@controller('/api/commands')
export class CommandsController extends BaseController {

    constructor(
        @inject('MqttService') private _service: MqttService
    ) {
        super();
    }

    /**
     * @swagger
     * /api/values:
     *   get:
     *     summary: get example
     *     description: http get example
     *     parameters:
     *       - name: val1
     *         in: query
     *         required: true
     *         description: number describes
     *         type: number
     *       - name: val2
     *         in: query
     *         required: true
     *         type: number
     *     tags:
     *       - Values
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *          description: The sum of 2 values
     */
    @httpGet('/')
    public async getValues(
        @queryParam('val1') val1: number,
        @queryParam('val2') val2: number,
        request: Request,
        response: Response) {

        // do validations of input
        // const sum = this._service.sum(Number(val1), Number(val2));
        response.json({ sum: 1 });
    }

    /**
     * @swagger
     * /api/commands/{id}:
     *   post:
     *     summary: Updates emails statues
     *     description: Will update winners status and audit status
     *     parameters:
     *       - name: Coordinates
     *         in: body
     *         description: Personalization parameters
     *         schema:
     *           $ref: '#/definitions/Coordinates'
     *     tags:
     *       - Commands
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *          description: The request was received
     */
    @httpPost('/')
    public async postNewCoordinates(
        request: Request,
        response: Response) {

        // do validations of input
        let coordinates: Coordinates;
        try {
            coordinates = await transformAndValidate(
                Coordinates,
                request.body as object
            );
        } catch (errors) {
            this.badRequest(response, errors);
            return;
        }
        await this._service.send(Topics.MOVE, coordinates);
        response.sendStatus(200);
    }

    /**
   * @swagger
   * /api/commands/{id}:
   *   post:
   *     summary: Updates emails statues
   *     description: Will update winners status and audit status
   *     parameters:
   *       - name: Coordinates
   *         in: body
   *         description: Personalization parameters
   *         schema:
   *           $ref: '#/definitions/Coordinates'
   *     tags:
   *       - Commands
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *          description: The request was received
   */
    @httpPost('/speak')
    public async postSpeak(
        request: Request,
        response: Response) {

        // do validations of input
        let speakCmd: SpeakCommand;
        try {
            speakCmd = await transformAndValidate(
                SpeakCommand,
                request.body as object
            );
        } catch (errors) {
            this.badRequest(response, errors);
            return;
        }
        await this._service.send(Topics.SPEAK, speakCmd);
        response.sendStatus(200);
    }

    @httpPost('/start-cam')
    public async postStartCam(
        request: Request,
        response: Response) {

        // do validations of input
        const id = config.get('VID_STREAM_ID');
        const streamServer = config.get('VID_STREAM_SERVER_URL');
        const streamUrl = `${streamServer}/${id}`;
        await this._service.send(Topics.CAM, { action: 'start', stream_url: streamUrl });
        response.status(200).send({ stream: streamUrl.replace('http', 'ws') });
    }
}
