import { Request, Response } from 'express';
import { HealthService } from '../services/healthService';
import { IController } from '../types';
import { ResponseHelper } from '../utils/responseHelper';

export class HealthController implements IController {
  private healthService: HealthService;

  constructor() {
    this.healthService = new HealthService();
  }

  healthCheck = async (req: Request, res: Response): Promise<void> => {
    try {
      const healthResult = await this.healthService.performHealthCheck();
      
      if (healthResult.status === 'ok') {
        ResponseHelper.success(res, healthResult, 'Application is healthy');
      } else {
        ResponseHelper.error(res, 503, 'Application is unhealthy', 'Health check failed');
      }
    } catch (error) {
      ResponseHelper.error(res, 500, 'Health check failed', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  simpleHealthCheck = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.healthService.getSimpleHealthCheck();
      ResponseHelper.success(res, result);
    } catch (error) {
      ResponseHelper.error(res, 500, 'Health check failed', error instanceof Error ? error.message : 'Unknown error');
    }
  };
}