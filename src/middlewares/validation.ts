import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodSchema } from 'zod';
import { ApiResponseUtils } from '../utils/apiResponse';
import { ValidationError } from '../types/api';

export interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export function validateRequest(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: ValidationError[] = [];

    // Validate request body
    if (schemas.body) {
      try {
        req.body = schemas.body.parse(req.body);
      } catch (error) {
        if (error instanceof ZodError) {
          errors.push(...formatZodErrors(error, 'body'));
        }
      }
    }

    // Validate query parameters
    if (schemas.query) {
      try {
        (req as any).query = schemas.query.parse(req.query);
      } catch (error) {
        if (error instanceof ZodError) {
          errors.push(...formatZodErrors(error, 'query'));
        }
      }
    }

    // Validate route parameters
    if (schemas.params) {
      try {
        (req as any).params = schemas.params.parse(req.params);
      } catch (error) {
        if (error instanceof ZodError) {
          errors.push(...formatZodErrors(error, 'params'));
        }
      }
    }

    // If validation errors exist, return them
    if (errors.length > 0) {
      return ApiResponseUtils.validationError(
        res,
        'Request validation failed',
        errors
      );
    }

    next();
  };
}

function formatZodErrors(error: ZodError, source: string): ValidationError[] {
  return error.issues.map((err) => ({
    field: `${source}.${err.path.join('.')}`,
    message: err.message,
    code: err.code,
  }));
}

// Common validation schemas
export const commonSchemas = {
  // Pagination
  pagination: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  }),

  // UUID validation
  uuid: z.string().uuid(),

  // URL validation
  url: z.string().url(),

  // Email validation
  email: z.string().email(),

  // Common string validations
  nonEmptyString: z.string().min(1, 'This field is required'),
  optionalString: z.string().optional(),
  
  // Numeric validations
  positiveInt: z.number().int().positive(),
  nonNegativeInt: z.number().int().min(0),
};