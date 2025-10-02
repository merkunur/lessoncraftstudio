// Stripe type definitions for payment integration

export interface StripeConfig {
  publishableKey: string;
  secretKey?: string; // Server-side only
  webhookSecret?: string; // Server-side only
  currency: string;
  country: string;
}

export interface PricingPlan {
  id: string;
  stripeProductId: string;
  stripePriceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  intervalCount: number;
  features: string[];
  limits: {
    worksheetsPerMonth: number;
    storageGB: number;
    teamMembers: number;
    apiRequestsPerMonth: number;
    customTemplates: number;
    exportFormats: string[];
  };
  recommended?: boolean;
  customBadge?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'paused';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  // trialEnd removed - no trials offered
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  pausedUntil?: string;
  metadata: {
    worksheetsUsed: number;
    storageUsed: number;
    lastActivity: string;
  };
}

export interface PaymentMethod {
  id: string;
  stripePaymentMethodId: string;
  type: 'card' | 'bank_account' | 'paypal';
  isDefault: boolean;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  bankAccount?: {
    bankName: string;
    last4: string;
    accountHolderName: string;
  };
  createdAt: string;
}

export interface Invoice {
  id: string;
  stripeInvoiceId: string;
  subscriptionId: string;
  number: string;
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
  amount: number;
  currency: string;
  dueDate?: string;
  paidAt?: string;
  periodStart: string;
  periodEnd: string;
  lineItems: InvoiceLineItem[];
  pdfUrl?: string;
  hostedInvoiceUrl?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitAmount: number;
  amount: number;
  currency: string;
  proration?: boolean;
}

export interface PaymentIntent {
  id: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' |
          'processing' | 'succeeded' | 'canceled';
  paymentMethodId?: string;
  metadata: {
    userId: string;
    subscriptionId?: string;
    invoiceId?: string;
    description: string;
  };
}

export interface CheckoutSession {
  id: string;
  stripeSessionId: string;
  mode: 'payment' | 'subscription' | 'setup';
  successUrl: string;
  cancelUrl: string;
  lineItems: Array<{
    priceId: string;
    quantity: number;
  }>;
  customerId?: string;
  customerEmail?: string;
  metadata: Record<string, string>;
  expiresAt: string;
}

export interface UsageRecord {
  id: string;
  subscriptionId: string;
  metric: 'worksheets' | 'storage' | 'api_calls' | 'team_members';
  quantity: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface TaxInfo {
  type: 'individual' | 'company';
  taxId?: string;
  vatNumber?: string;
  companyName?: string;
  address: BillingAddress;
}

export interface CouponCode {
  id: string;
  stripeCouponId: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountAmount: number;
  duration: 'once' | 'repeating' | 'forever';
  durationInMonths?: number;
  maxRedemptions?: number;
  redeemBy?: string;
  valid: boolean;
}

export interface WebhookEvent {
  id: string;
  stripeEventId: string;
  type: string;
  data: any;
  processed: boolean;
  processedAt?: string;
  error?: string;
  attempts: number;
}