import { prisma } from '../lib/prisma';
import { IRepository } from '../types';

export class HealthRepository implements IRepository {
  async checkDatabaseConnection(): Promise<{ status: 'connected' | 'disconnected'; responseTime?: number }> {
    try {
      const startTime = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      const responseTime = Date.now() - startTime;
      
      return {
        status: 'connected',
        responseTime,
      };
    } catch (error) {
      return {
        status: 'disconnected',
      };
    }
  }

  getSystemInfo() {
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();
    
    return {
      uptime,
      memory: {
        used: memoryUsage.heapUsed,
        total: memoryUsage.heapTotal,
        percentage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100),
      },
    };
  }
}