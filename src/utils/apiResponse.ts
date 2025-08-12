import { Response } from 'express';
import { ApiResponse, ApiError } from '../types/api';

export class ApiResponseUtils {
  static success<T>(res: Response, data: T, message?: string, statusCode = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    error: string,
    message: string,
    statusCode = 500,
    details?: any
  ): void {
    const errorResponse: ApiError = {
      error,
      message,
      timestamp: new Date().toISOString(),
      details,
      path: res.req.path,
      method: res.req.method,
    };
    res.status(statusCode).json(errorResponse);
  }

  static badRequest(res: Response, message: string, details?: any): void {
    this.error(res, 'Bad Request', message, 400, details);
  }

  static unauthorized(res: Response, message = 'Unauthorized'): void {
    this.error(res, 'Unauthorized', message, 401);
  }

  static forbidden(res: Response, message = 'Forbidden'): void {
    this.error(res, 'Forbidden', message, 403);
  }

  static notFound(res: Response, message = 'Resource not found'): void {
    this.error(res, 'Not Found', message, 404);
  }

  static validationError(res: Response, message: string, details: any): void {
    this.error(res, 'Validation Error', message, 422, details);
  }

  static tooManyRequests(res: Response, message = 'Too many requests'): void {
    this.error(res, 'Too Many Requests', message, 429);
  }

  static internalError(res: Response, message = 'Internal server error'): void {
    this.error(res, 'Internal Server Error', message, 500);
  }
}