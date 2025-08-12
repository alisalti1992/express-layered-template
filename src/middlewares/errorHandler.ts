import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiResponseUtils } from '../utils/apiResponse';

export interface CustomError extends Error {
  statusCode?: number;
  details?: any;
}

export function errorHandler(
  error: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const validationErrors = (error as any).errors.map((err: any) => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }));
    
    return ApiResponseUtils.validationError(
      res,
      'Request validation failed',
      validationErrors
    );
  }

  // Handle custom errors with status codes
  if ('statusCode' in error && error.statusCode) {
    const details = 'details' in error ? error.details : undefined;
    
    switch (error.statusCode) {
      case 400:
        return ApiResponseUtils.badRequest(res, error.message, details);
      case 401:
        return ApiResponseUtils.unauthorized(res, error.message);
      case 403:
        return ApiResponseUtils.forbidden(res, error.message);
      case 404:
        return ApiResponseUtils.notFound(res, error.message);
      case 422:
        return ApiResponseUtils.validationError(res, error.message, details);
      case 429:
        return ApiResponseUtils.tooManyRequests(res, error.message);
      default:
        return ApiResponseUtils.error(res, 'Error', error.message, error.statusCode);
    }
  }

  // Handle Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    return ApiResponseUtils.badRequest(res, 'Database operation failed');
  }

  if (error.name === 'PrismaClientUnknownRequestError') {
    return ApiResponseUtils.internalError(res, 'Database connection error');
  }

  if (error.name === 'PrismaClientValidationError') {
    return ApiResponseUtils.badRequest(res, 'Invalid data provided');
  }

  // Handle generic errors
  return ApiResponseUtils.internalError(
    res,
    process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  );
}

// Not found handler (should be the last middleware)
export function notFoundHandler(req: Request, res: Response): void {
  ApiResponseUtils.notFound(
    res,
    `Route ${req.method} ${req.path} not found`
  );
}

// Async error wrapper to catch async errors
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}