import { z } from 'zod';

/**
 * Validation schemas for subscription-related API endpoints
 */

export const sessionCheckSchema = z.object({
  userId: z.string().cuid('Invalid user ID format'),
  deviceId: z.string().min(10, 'Device ID must be at least 10 characters').max(100, 'Device ID too long'),
});

export const revokeSessionSchema = z.object({
  sessionId: z.string().cuid('Invalid session ID format'),
});

export const createCheckoutSchema = z.object({
  priceId: z.string().startsWith('price_', 'Invalid Stripe price ID'),
  successUrl: z.string().url('Invalid success URL').optional(),
  cancelUrl: z.string().url('Invalid cancel URL').optional(),
});

export const upgradeUserSchema = z.object({
  userId: z.string().cuid('Invalid user ID format'),
  tier: z.enum(['free', 'core', 'full'], {
    message: 'Tier must be one of: free, core, full',
  }),
});

export const cancelSubscriptionSchema = z.object({
  userId: z.string().cuid('Invalid user ID format'),
  reason: z.string().optional(),
});

export const webhookEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.any(),
  }),
});

// Type exports for TypeScript
export type SessionCheckInput = z.infer<typeof sessionCheckSchema>;
export type RevokeSessionInput = z.infer<typeof revokeSessionSchema>;
export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
export type UpgradeUserInput = z.infer<typeof upgradeUserSchema>;
export type CancelSubscriptionInput = z.infer<typeof cancelSubscriptionSchema>;
export type WebhookEventInput = z.infer<typeof webhookEventSchema>;
