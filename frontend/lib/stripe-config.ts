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
    description: 'Get started with basic features',
    price: 0,
    priceId: null, // No Stripe price for free tier
    features: [
      'Access to 5 worksheet generators',
      'Download up to 10 worksheets per month',
      'Basic templates',
      'Community support',
    ],
    limits: {
      generators: 5,
      monthlyDownloads: 10,
      customTemplates: false,
      prioritySupport: false,
    },
  },
  CORE: {
    id: 'core',
    name: 'Core Bundle',
    description: 'Perfect for regular classroom use',
    price: 9.99,
    priceId: process.env.STRIPE_CORE_PRICE_ID,
    features: [
      'Access to 20 worksheet generators',
      'Unlimited downloads',
      'Premium templates',
      'Save and organize worksheets',
      'Email support',
      'No watermarks',
    ],
    limits: {
      generators: 20,
      monthlyDownloads: -1, // Unlimited
      customTemplates: true,
      prioritySupport: false,
    },
  },
  FULL: {
    id: 'full',
    name: 'Full Access',
    description: 'Complete access for power users',
    price: 19.99,
    priceId: process.env.STRIPE_FULL_PRICE_ID,
    features: [
      'Access to all 33+ worksheet generators',
      'Unlimited downloads',
      'All premium templates',
      'Save and organize worksheets',
      'Custom branding options',
      'Priority support',
      'Early access to new features',
      'API access (coming soon)',
    ],
    limits: {
      generators: -1, // All generators
      monthlyDownloads: -1, // Unlimited
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