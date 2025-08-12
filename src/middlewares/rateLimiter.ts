import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { ApiResponseUtils } from '../utils/apiResponse';

// Global rate limiter
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too Many Requests',
    message: 'Too many requests from this IP, please try again later.',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    ApiResponseUtils.tooManyRequests(
      res,
      'Too many requests from this IP, please try again later.'
    );
  },
});

// Strict rate limiter for sensitive endpoints
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too Many Requests',
    message: 'Too many requests for this endpoint, please try again later.',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    ApiResponseUtils.tooManyRequests(
      res,
      'Too many requests for this endpoint, please try again later.'
    );
  },
});

// Authentication rate limiter
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 authentication attempts per windowMs
  message: {
    error: 'Too Many Requests',
    message: 'Too many authentication attempts, please try again later.',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (req: Request, res: Response) => {
    ApiResponseUtils.tooManyRequests(
      res,
      'Too many authentication attempts, please try again later.'
    );
  },
});

// API creation rate limiter (for creating crawl jobs, etc.)
export const creationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 creation requests per hour
  message: {
    error: 'Too Many Requests',
    message: 'Too many creation requests, please try again later.',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    ApiResponseUtils.tooManyRequests(
      res,
      'Too many creation requests, please try again later.'
    );
  },
});