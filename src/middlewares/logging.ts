import { Request, Response, NextFunction } from 'express';
import { logger, createContextLogger } from '../config/logger';

// Create a context logger for HTTP requests
const httpLogger = createContextLogger('HTTP');

// Interface to extend Express Request with additional logging properties
interface LoggingRequest extends Request {
  startTime?: number;
  requestId?: string;
}

// Generate a unique request ID
function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Get client IP address, considering proxies
function getClientIP(req: Request): string {
  const xForwardedFor = req.headers['x-forwarded-for'];
  const xRealIp = req.headers['x-real-ip'];
  
  if (typeof xForwardedFor === 'string') {
    return xForwardedFor.split(',')[0].trim();
  }
  
  if (typeof xRealIp === 'string') {
    return xRealIp;
  }
  
  return req.socket.remoteAddress || 'unknown';
}

// Sanitize sensitive data from request body/query
function sanitizeData(data: any): any {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth', 'authorization'];
  const sanitized = { ...data };
  
  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }
  
  return sanitized;
}

// Request logging middleware
export function requestLogger(req: LoggingRequest, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const requestId = generateRequestId();
  
  // Add request ID and start time to request object
  req.startTime = startTime;
  req.requestId = requestId;
  
  // Add request ID to response headers
  res.setHeader('X-Request-ID', requestId);
  
  const clientIP = getClientIP(req);
  const userAgent = req.headers['user-agent'] || 'unknown';
  
  // Log incoming request
  httpLogger.info('Incoming request', {
    requestId,
    method: req.method,
    url: req.url,
    clientIP,
    userAgent,
    query: sanitizeData(req.query),
    body: req.method !== 'GET' ? sanitizeData(req.body) : undefined,
    headers: {
      'content-type': req.headers['content-type'],
      'accept': req.headers['accept'],
      'origin': req.headers['origin'],
      'referer': req.headers['referer'],
    },
  });
  
  // Override res.json to capture response data
  const originalJson = res.json;
  res.json = function (data: any) {
    // Log response if not already logged
    if (!res.headersSent) {
      logResponse(req as LoggingRequest, res, data);
    }
    return originalJson.call(this, data);
  };
  
  // Override res.send to capture response data
  const originalSend = res.send;
  res.send = function (data: any) {
    // Log response if not already logged
    if (!res.headersSent) {
      logResponse(req as LoggingRequest, res, data);
    }
    return originalSend.call(this, data);
  };
  
  // Handle response completion
  res.on('finish', () => {
    // Only log if we haven't already logged in json/send overrides
    if (!res.locals.responseLogged) {
      logResponse(req as LoggingRequest, res);
    }
  });
  
  next();
}

// Log response details
function logResponse(req: LoggingRequest, res: Response, responseData?: any) {
  if (res.locals.responseLogged) {
    return; // Avoid duplicate logging
  }
  
  res.locals.responseLogged = true;
  
  const duration = req.startTime ? Date.now() - req.startTime : 0;
  const statusCode = res.statusCode;
  const isError = statusCode >= 400;
  
  const logData: any = {
    requestId: req.requestId,
    method: req.method,
    url: req.url,
    statusCode,
    duration: `${duration}ms`,
    contentLength: res.get('Content-Length') || 0,
  };
  
  // Add response data for errors or debug logging
  if (isError || process.env.LOG_LEVEL === 'debug') {
    logData.responseData = sanitizeData(responseData);
  }
  
  // Choose log level based on status code
  if (statusCode >= 500) {
    httpLogger.error('Request completed with server error', logData);
  } else if (statusCode >= 400) {
    httpLogger.warn('Request completed with client error', logData);
  } else if (duration > 5000) {
    // Log slow requests as warnings
    httpLogger.warn('Slow request detected', logData);
  } else {
    httpLogger.info('Request completed successfully', logData);
  }
}

// Error logging middleware (should be placed after routes)
export function errorLogger(
  err: Error,
  req: LoggingRequest,
  res: Response,
  next: NextFunction
) {
  const errorLogger = createContextLogger('ERROR');
  
  errorLogger.error('Unhandled error occurred', {
    requestId: req.requestId,
    method: req.method,
    url: req.url,
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
    query: sanitizeData(req.query),
    body: sanitizeData(req.body),
    headers: {
      'user-agent': req.headers['user-agent'],
      'content-type': req.headers['content-type'],
    },
  });
  
  next(err);
}

// Health check and monitoring endpoint should skip detailed logging
export function skipLogging(req: Request, res: Response, next: NextFunction) {
  res.locals.skipLogging = true;
  next();
}

// Conditional request logger that respects skipLogging
export function conditionalRequestLogger(req: Request, res: Response, next: NextFunction) {
  if (res.locals.skipLogging) {
    return next();
  }
  return requestLogger(req, res, next);
}