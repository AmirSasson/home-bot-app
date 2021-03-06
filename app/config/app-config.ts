import { NPMLoggingLevel } from 'winston';
import { Environment } from '../common/environments';
export const config = require('nconf');
const path = require('path');

config
    // 1. Command-line arguments
    .argv()
    // 2. Environment variables
    .env([
        'NODE_ENV',
        'PORT',
        'APP_CORS_ORIGIN',
        'AUTHORIZATION_TOKEN_SECRET',
        'LOG_LEVEL',
        'AUTH_ID_HEADER_NAME',
        'RESTRICT_TO_USERS',
        'MQTT_HOST',
        'MQTT_USER',
        'MQTT_PASSWORD',
        'MQTT_PORT',
        'VID_STREAM_ID',
        'VID_STREAM_SERVER_URL'
    ])
    // 3. Config file
    .file({ file: path.join(__dirname, '../app-config.json') })
    // 4. Defaults
    .defaults({
        PORT: 5000,
        DAAS_CORS_ORIGIN: '*',
        // Set secret keys
        AUTH_ID_HEADER_NAME: 'X-MS-CLIENT-PRINCIPAL-NAME',
        RESTRICT_TO_USERS: '[]',
        VID_STREAM_SERVER_URL: '',
        VID_STREAM_ID: ''
    });

