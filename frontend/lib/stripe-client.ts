import { loadStripe, Stripe } from '@stripe/stripe-js';
import { StripeConfig } from '@/types/stripe';

// Initialize Stripe client
let stripePromise: Promise<Stripe | null>;

export const getStripeClient = (publishableKey?: string) => {
  if (!stripePromise) {
    const key = publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error('Stripe publishable key is missing');
      stripePromise = Promise.resolve(null);
    } else {
      stripePromise = loadStripe(key);
    }
  }
  return stripePromise;
};

// Stripe configuration
export const stripeConfig: StripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  currency: 'usd',
  country: 'US'
};

// Helper functions for Stripe operations
export const formatCurrency = (amount: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount / 100); // Stripe amounts are in cents
};

export const formatPlanInterval = (interval: string, intervalCount: number): string => {
  if (intervalCount === 1) {
    return `per ${interval}`;
  }
  return `every ${intervalCount} ${interval}s`;
};

export const getCardBrandIcon = (brand: string): string => {
  const brandIcons: Record<string, string> = {
    visa: '💳',
    mastercard: '💳',
    amex: '💳',
    discover: '💳',
    diners: '💳',
    jcb: '💳',
    unionpay: '💳',
    unknown: '💳'
  };
  return brandIcons[brand.toLowerCase()] || brandIcons.unknown;
};

export const getSubscriptionStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    active: 'text-green-600 bg-green-100',
    past_due: 'text-yellow-600 bg-yellow-100',
    canceled: 'text-red-600 bg-red-100',
    paused: 'text-gray-600 bg-gray-100'
  };
  return statusColors[status] || 'text-gray-600 bg-gray-100';
};

export const calculateUsagePercentage = (used: number, limit: number): number => {
  if (limit === -1) return 0; // Unlimited
  return Math.min(100, Math.round((used / limit) * 100));
};