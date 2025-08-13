import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import { logger, createContextLogger } from './config/logger';
import { globalLimiter } from './middlewares/rateLimiter';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { requestLogger, errorLogger, skipLogging } from './middlewares/logging';
import { ApiResponseUtils } from './utils/apiResponse';
import demoRoutes from './routes/demo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create server logger
const serverLogger = createContextLogger('SERVER');

// Security & Rate Limiting
app.use(helmet());
app.use(cors());
app.use(globalLimiter);

// Request logging
app.use(requestLogger);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'SiteScope API Documentation',
}));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the SiteScope API server
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *             example:
 *               status: "OK"
 *               message: "SiteScope API is running"
 *               timestamp: "2025-08-12T06:51:53.012Z"
 *               version: "1.0.0"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'SiteScope API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome endpoint
 *     description: Returns a welcome message for the SiteScope API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Welcome message
 *                 version:
 *                   type: string
 *                   description: API version
 *               required:
 *                 - message
 *                 - version
 *             example:
 *               message: "Welcome to SiteScope API"
 *               version: "1.0.0"
 */
app.get('/', (req, res) => {
  ApiResponseUtils.success(res, {
    message: 'Welcome to SiteScope API',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/demo', demoRoutes);

// Error handling (must be last)
app.use(errorLogger);
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  serverLogger.info('SiteScope server started', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: `http://localhost:${PORT}/health`,
      docs: `http://localhost:${PORT}/api-docs`,
      api: `http://localhost:${PORT}/api`,
    }
  });
  
  // Keep console logs for immediate feedback during development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 SiteScope server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  }
});

export default app;
