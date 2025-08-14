import { HealthRepository } from '../repositories/healthRepository';
import { HealthCheckResult, IService } from '../types';

export class HealthService implements IService {
  private healthRepository: HealthRepository;

  constructor() {
    this.healthRepository = new HealthRepository();
  }

  async performHealthCheck(): Promise<HealthCheckResult> {
    try {
      const systemInfo = this.healthRepository.getSystemInfo();
      const databaseStatus = await this.healthRepository.checkDatabaseConnection();

      return {
        status: databaseStatus.status === 'connected' ? 'ok' : 'error',
        timestamp: new Date().toISOString(),
        uptime: systemInfo.uptime,
        database: databaseStatus,
        memory: systemInfo.memory,
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      };
    }
  }

  async getSimpleHealthCheck(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}