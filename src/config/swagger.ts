import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SiteScope API',
      version: '1.0.0',
      description: 'A modern Node.js Express application for SEO website crawling, screenshotting, and comprehensive reporting.',
      contact: {
        name: 'SiteScope Team',
        url: 'https://github.com/moveaheadmedia/sitescope',
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.sitescope.dev',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints',
      },
      {
        name: 'Users',
        description: 'User management operations (coming soon)',
      },
      {
        name: 'Crawl Jobs',
        description: 'Website crawling operations (coming soon)',
      },
      {
        name: 'Pages',
        description: 'Crawled page data operations (coming soon)',
      },
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
            message: {
              type: 'string',
              description: 'Detailed error description',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Error timestamp',
            },
          },
          required: ['error', 'message', 'timestamp'],
        },
        HealthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['OK'],
              description: 'Health status',
            },
            message: {
              type: 'string',
              description: 'Health message',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Response timestamp',
            },
            version: {
              type: 'string',
              description: 'Application version',
            },
          },
          required: ['status', 'message', 'timestamp', 'version'],
        },
      },
      responses: {
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        Unauthorized: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  },
  apis: [
    './src/**/*.ts',
    './src/routes/*.ts',
  ],
};

export const specs = swaggerJsdoc(options);