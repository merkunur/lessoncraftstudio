import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SubscriptionController {
  // Create checkout session (Stripe integration placeholder)
  async createCheckoutSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;
      const { priceId, tier, interval, customerEmail } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // In production, this would integrate with Stripe
      // For now, return a mock session
      const mockSessionId = `cs_test_${Date.now()}`;

      res.json({
        sessionId: mockSessionId,
        url: `https://checkout.stripe.com/pay/${mockSessionId}`
      });
    } catch (error) {
      next(error);
    }
  }

  // Get current subscription
  async getSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const subscription = await prisma.subscription.findUnique({
        where: { userId }
      });

      if (!subscription) {
        return res.json({
          tier: 'free',
          status: 'active',
          features: {
            apps: 1,
            watermark: true,
            imageLibrarySize: 'limited'
          }
        });
      }

      res.json(subscription);
    } catch (error) {
      next(error);
    }
  }

  // Update subscription (admin or webhook use)
  async updateSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;
      const { tier, status } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Update or create subscription
      const subscription = await prisma.subscription.upsert({
        where: { userId },
        update: {
          tier,
          status,
          updatedAt: new Date()
        },
        create: {
          userId,
          tier,
          status,
          stripeSubscriptionId: `sub_${Date.now()}`, // Mock ID
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      });

      // Update user's subscription tier
      await prisma.user.update({
        where: { id: userId },
        data: { subscriptionTier: tier }
      });

      res.json({
        message: 'Subscription updated successfully',
        subscription
      });
    } catch (error) {
      next(error);
    }
  }

  // Cancel subscription
  async cancelSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const subscription = await prisma.subscription.findUnique({
        where: { userId }
      });

      if (!subscription) {
        return res.status(404).json({ error: 'No active subscription found' });
      }

      // Update subscription to cancel at period end
      await prisma.subscription.update({
        where: { userId },
        data: {
          cancelAtPeriodEnd: true,
          updatedAt: new Date()
        }
      });

      res.json({
        message: 'Subscription will be cancelled at the end of the billing period'
      });
    } catch (error) {
      next(error);
    }
  }

  // Create customer portal session
  async createPortalSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // In production, this would create a Stripe customer portal session
      const mockPortalUrl = `https://billing.stripe.com/session/${Date.now()}`;

      res.json({
        url: mockPortalUrl
      });
    } catch (error) {
      next(error);
    }
  }
}

export const subscriptionController = new SubscriptionController();