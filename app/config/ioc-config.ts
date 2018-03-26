import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';
import { Sequelize } from 'sequelize';
import { config } from './app-config';
import { Environment } from '../common/environments';
import { tagParameter } from 'inversify/dts/annotation/decorator_utils';
import * as fs from 'fs';
import { MqttService } from '../services/mqtt-service';
import { CommandsController } from '../controllers/commands-controller';

// set up container
export const container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(CommandsController).whenTargetNamed('CommandsController');

container.bind<MqttService>('MqttService').to(MqttService).inSingletonScope();
