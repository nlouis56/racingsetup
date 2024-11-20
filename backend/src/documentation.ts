import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'ThreadBox API',
      version: '1.0.0',
      description: 'This is the API documentation for the ThreadBox application',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      }
    },
    components: {
      schemas: {
        RegisterDTO: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
            displayName: { type: "string" },
          },
        },
        LoginDTO: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            userId: { type: "integer" },
            token: { type: "string" },
            displayName: { type: "string" },
          },
        },
        CreateChannelDTO: {
          type: "object",
          properties: {
            name: { type: "string" },
            theme: { type: "string" },
            isPrivate: { type: "boolean" },
            createdBy: { type: "integer" },
          },
        },
        SubscribeChannelDTO: {
          type: "object",
          properties: {
            channelId: { type: "integer" },
            userId: { type: "integer" },
            role: { type: "string" },
          },
        },
        ChannelRoleDTO: {
          type: "object",
          properties: {
            channelId: { type: "integer" },
            userId: { type: "integer" },
            role: { type: "string" },
          },
        },
        SendMessageDTO: {
          type: "object",
          properties: {
            channelId: { type: "integer" },
            userId: { type: "integer" },
            content: { type: "string" },
          },
        },
        MessageResponse: {
          type: "object",
          properties: {
            id: { type: "integer" },
            channelId: { type: "integer" },
            userId: { type: "integer" },
            content: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        SendPrivateMessageDTO: {
          type: "object",
          properties: {
            senderId: { type: "integer" },
            receiverId: { type: "integer" },
            content: { type: "string" },
          },
        },
        PrivateMessageResponse: {
          type: "object",
          properties: {
            id: { type: "integer" },
            senderId: { type: "integer" },
            receiverId: { type: "integer" },
            content: { type: "string" },
            isRead: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        UploadedFile: {
          type: "object",
          properties: {
            filename: { type: "string" },
            path: { type: "string" },
            originalName: { type: "string" },
            mimetype: { type: "string" },
            size: { type: "number" },
          },
        },
        Channel: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            theme: { type: "string" },
            isPrivate: { type: "boolean" },
            createdBy: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        ChannelSubscription: {
          type: "object",
          properties: {
            id: { type: "integer" },
            channelId: { type: "integer" },
            userId: { type: "integer" },
            role: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        ChannelRole: {
          type: "object",
          properties: {
            id: { type: "integer" },
            channel: { type: "integer" },
            user: { type: "integer" },
            role: { type: "string" },
          },
        },
      },
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
