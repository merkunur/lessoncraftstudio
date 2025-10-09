import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe publishable key (from environment)
export const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

// Initialize Stripe client
let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  FREE: {
    id: 'free',
    name: 'Free',
    description: 'Get started with Word Search generator',
    price: 0,
    priceMonthly: 0,
    priceYearly: 0,
    priceId: null, // No Stripe price for free tier
    priceIdMonthly: null,
    priceIdYearly: null,
    features: [
      'Word Search generator only',
      'Unlimited worksheet generation',
      'Watermarked downloads',
      'Community support',
    ],
    limits: {
      generators: 1, // Only Word Search
      monthlyDownloads: -1, // Unlimited but watermarked
      watermarked: true,
      customTemplates: false,
      prioritySupport: false,
    },
  },
  CORE: {
    id: 'core',
    name: 'Core Bundle',
    description: 'Perfect for regular classroom use',
    price: 15, // Monthly price
    priceMonthly: 15,
    priceYearly: 144, // $12/month billed annually (20% off)
    priceId: process.env.STRIPE_PRICE_CORE_MONTHLY, // Default to monthly
    priceIdMonthly: process.env.STRIPE_PRICE_CORE_MONTHLY,
    priceIdYearly: process.env.STRIPE_PRICE_CORE_YEARLY,
    features: [
      'Access to 10 popular worksheet generators',
      'Unlimited worksheet generation',
      'No watermarks',
      'High-quality PDF downloads',
      'Premium templates',
      'Email support',
    ],
    limits: {
      generators: 10,
      monthlyDownloads: -1, // Unlimited
      watermarked: false,
      customTemplates: true,
      prioritySupport: false,
    },
  },
  FULL: {
    id: 'full',
    name: 'Full Access',
    description: 'Complete access for power users',
    price: 25, // Monthly price
    priceMonthly: 25,
    priceYearly: 240, // $20/month billed annually (20% off)
    priceId: process.env.STRIPE_PRICE_FULL_MONTHLY, // Default to monthly
    priceIdMonthly: process.env.STRIPE_PRICE_FULL_MONTHLY,
    priceIdYearly: process.env.STRIPE_PRICE_FULL_YEARLY,
    features: [
      'Access to all 33+ worksheet generators',
      'Unlimited worksheet generation',
      'No watermarks',
      'High-quality PDF downloads',
      'All premium templates',
      'Priority email support',
      'Commercial license included',
    ],
    limits: {
      generators: -1, // All generators (33)
      monthlyDownloads: -1, // Unlimited
      watermarked: false,
      customTemplates: true,
      prioritySupport: true,
    },
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;
export type SubscriptionTierInfo = typeof SUBSCRIPTION_TIERS[SubscriptionTier];

// Helper function to check feature access
export function hasFeatureAccess(
  userTier: SubscriptionTier | null,
  feature: keyof SubscriptionTierInfo['limits']
): boolean {
  if (!userTier) userTier = 'FREE';
  
  const tier = SUBSCRIPTION_TIERS[userTier];
  const value = tier.limits[feature];
  
  // For boolean features
  if (typeof value === 'boolean') return value;
  
  // For numeric limits (-1 means unlimited)
  return value === -1 || value > 0;
}

// Helper function to get download limit
export function getDownloadLimit(userTier: SubscriptionTier | null): number {
  if (!userTier) userTier = 'FREE';
  return SUBSCRIPTION_TIERS[userTier].limits.monthlyDownloads;
}

// Helper function to get generator access count
export function getGeneratorAccess(userTier: SubscriptionTier | null): number {
  if (!userTier) userTier = 'FREE';
  return SUBSCRIPTION_TIERS[userTier].limits.generators;
}

// Webhook events we handle
export const STRIPE_WEBHOOK_EVENTS = {
  CHECKOUT_COMPLETED: 'checkout.session.completed',
  SUBSCRIPTION_CREATED: 'customer.subscription.created',
  SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  INVOICE_PAID: 'invoice.paid',
  INVOICE_PAYMENT_FAILED: 'invoice.payment_failed',
} as const;