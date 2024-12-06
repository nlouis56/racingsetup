import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Racing Setup API',
      version: '1.0.0',
      description: 'This is the API documentation for the RacingSetup application',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Local server'
      }
    ]
  },
  apis: ['src/**/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export const swagger = {
  serve: swaggerUI.serve,
  setup: swaggerUI.setup(swaggerSpec),
};
