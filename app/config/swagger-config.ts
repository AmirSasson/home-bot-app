const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    'swagger': '2.0',
    info: {
        title: 'DAAS Backend',
        version: '1.0.0',
        description: 'Full api for DAAS management',
    },
    'produces': [
        'application/json'
    ],
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    security: [
        { jwt: [] }
    ],
    definitions:
        {
            'Coordinates': {
                'type': 'object',
                'properties': {
                    'x': {
                        'type': 'number'
                    },
                    'y': {
                        'type': 'number'
                    }
                },
                'required': [
                    'x','y'
                ]
            }
        }
};
// Options for the swagger docs
const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [__dirname + '/../controllers/**/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
