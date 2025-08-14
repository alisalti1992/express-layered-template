import { Response } from 'express';
import { ApiResponse } from '../types';

export class ResponseHelper {
  static success<T>(res: Response, data?: T, message?: string): Response<ApiResponse<T>> {
    return res.json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static error(res: Response, statusCode: number, message: string, error?: string): Response<ApiResponse> {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  }

  static created<T>(res: Response, data?: T, message?: string): Response<ApiResponse<T>> {
    return res.status(201).json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }
}