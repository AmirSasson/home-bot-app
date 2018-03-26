import { injectable } from 'inversify';
import { config } from '../config/app-config';
import { logger } from '../common/logger';
import { Coordinates } from '../contracts/value';
import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';
import { createWriteStream } from 'fs';

export enum Topics {
    MOVE = "bot-move",
    SPEAK = "bot-speak"
}

@injectable()
export class MqttService {
    private mqttClient: MqttClient;
    constructor() {
        const host = config.get('MQTT_HOST');
        if (host) {
            this.mqttClient = mqtt.connect(host,
                {
                    username: config.get('MQTT_USER'),
                    password: config.get('MQTT_PASSWORD'),
                    port: config.get('MQTT_PORT'),
                }
            );
            this.mqttClient.on('connect', () => console.info("MQTT CONNECTED!"));
        }
    }
    public async send(topic: Topics, message: object): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.mqttClient.publish(topic, JSON.stringify(message),
                (err, pack) => {
                    if (err) {
                        console.warn(err);
                        reject(err);
                    }
                    resolve(pack);
                });
        });

    }
}
