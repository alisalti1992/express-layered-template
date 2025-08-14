import { Request, Response, NextFunction } from 'express';

// Base interfaces for the layered architecture (simplified)
export interface IController {
  // Interface for controller classes - no strict index signature
}

export interface IService {
  // Interface for service classes - no strict index signature
}

export interface IRepository {
  // Interface for repository classes - no strict index signature
}

// Health check types
export interface HealthCheckResult {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  database?: {
    status: 'connected' | 'disconnected';
    responseTime?: number;
  };
  memory?: {
    used: number;
    total: number;
    percentage: number;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

// Request with user context (for future auth)
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}