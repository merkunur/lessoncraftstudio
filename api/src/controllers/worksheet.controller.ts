import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class WorksheetController {
  async trackGeneration(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;
      const { appName, configuration, watermarked } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Save generation record
      const generation = await prisma.worksheetGeneration.create({
        data: {
          userId,
          appName,
          configuration: configuration || {},
          watermarked: watermarked || false
        }
      });

      res.json({
        message: 'Generation tracked successfully',
        generationId: generation.id
      });
    } catch (error) {
      next(error);
    }
  }

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;
      const { limit = 20, offset = 0 } = req.query;

      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const history = await prisma.worksheetGeneration.findMany({
        where: { userId },
        orderBy: { generatedAt: 'desc' },
        take: Number(limit),
        skip: Number(offset)
      });

      const total = await prisma.worksheetGeneration.count({
        where: { userId }
      });

      res.json({
        history,
        total,
        limit: Number(limit),
        offset: Number(offset)
      });
    } catch (error) {
      next(error);
    }
  }

  async getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Get statistics for the user
      const totalGenerations = await prisma.worksheetGeneration.count({
        where: { userId }
      });

      // Get app usage statistics
      const appUsage = await prisma.worksheetGeneration.groupBy({
        by: ['appName'],
        where: { userId },
        _count: {
          appName: true
        },
        orderBy: {
          _count: {
            appName: 'desc'
          }
        }
      });

      // Get recent activity (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentActivity = await prisma.worksheetGeneration.count({
        where: {
          userId,
          generatedAt: {
            gte: thirtyDaysAgo
          }
        }
      });

      res.json({
        totalGenerations,
        recentActivity,
        appUsage: appUsage.map(item => ({
          appName: item.appName,
          count: item._count.appName
        })),
        mostUsedApp: appUsage[0]?.appName || null
      });
    } catch (error) {
      next(error);
    }
  }
}

export const worksheetController = new WorksheetController();