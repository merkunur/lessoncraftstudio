import Stripe from 'stripe';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from './stripe-config';

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
});

// Create or retrieve a Stripe customer
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name?: string
): Promise<string> {
  // First, check if user already has a Stripe customer ID in database
  // This would be stored in the User model (we'll add stripeCustomerId field)
  
  // For now, create a new customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      userId,
    },
  });
  
  return customer.id;
}

// Create a checkout session for subscription
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  userId: string,
  successUrl: string,
  cancelUrl: string,
  locale?: string
): Promise<Stripe.Checkout.Session> {
  // Check if Stripe Tax is enabled
  const taxEnabled = process.env.STRIPE_TAX_ENABLED === 'true';

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
    },
    subscription_data: {
      metadata: {
        userId,
      },
    },
    allow_promotion_codes: true,

    // Set checkout language based on user's locale
    ...(locale && { locale: locale as Stripe.Checkout.SessionCreateParams.Locale }),

    // Enable automatic tax calculation
    ...(taxEnabled && {
      automatic_tax: {
        enabled: true,
      },
      // Collect customer address for accurate tax calculation
      billing_address_collection: 'required',
      // Automatically save address and name to customer
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
      // Tax ID collection disabled for now - can be enabled later when needed for EU VAT
      // tax_id_collection: {
      //   enabled: true,
      // },
    }),
  });

  return session;
}

// Create a portal session for managing subscription
export async function createPortalSession(
  customerId: string,
  returnUrl: string,
  locale?: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
    // Set portal language based on user's locale
    ...(locale && { locale: locale as Stripe.BillingPortal.SessionCreateParams.Locale }),
  });

  return session;
}

// Get subscription status
export async function getSubscriptionStatus(
  subscriptionId: string
): Promise<{
  status: Stripe.Subscription.Status;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  tier: SubscriptionTier | null;
}> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;

  // Determine tier from price ID (check both monthly and yearly)
  let tier: SubscriptionTier | null = null;
  const priceId = subscription.items.data[0]?.price.id;
  let billingInterval: 'monthly' | 'yearly' = 'monthly';

  if (priceId === process.env.STRIPE_PRICE_CORE_MONTHLY ||
      priceId === process.env.STRIPE_PRICE_CORE_YEARLY) {
    tier = 'CORE';
    billingInterval = priceId === process.env.STRIPE_PRICE_CORE_YEARLY ? 'yearly' : 'monthly';
  } else if (priceId === process.env.STRIPE_PRICE_FULL_MONTHLY ||
             priceId === process.env.STRIPE_PRICE_FULL_YEARLY) {
    tier = 'FULL';
    billingInterval = priceId === process.env.STRIPE_PRICE_FULL_YEARLY ? 'yearly' : 'monthly';
  }

  // Get period end date with fallback logic (same as webhook handler)
  let currentPeriodEnd: Date;

  if (subscription.current_period_end) {
    currentPeriodEnd = new Date(subscription.current_period_end * 1000);
  } else if (subscription.billing_cycle_anchor) {
    // Fallback: Calculate from billing_cycle_anchor
    const anchorDate = new Date(subscription.billing_cycle_anchor * 1000);
    currentPeriodEnd = new Date(anchorDate);
    if (billingInterval === 'yearly') {
      currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
    } else {
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    }
  } else if (subscription.start_date) {
    // Last fallback: Calculate from start_date
    const startDate = new Date(subscription.start_date * 1000);
    currentPeriodEnd = new Date(startDate);
    if (billingInterval === 'yearly') {
      currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
    } else {
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    }
  } else {
    // Ultimate fallback if no dates available
    currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
  }

  return {
    status: subscription.status,
    currentPeriodEnd,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    tier,
  };
}

// Cancel subscription at period end
export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
  
  return subscription;
}

// Reactivate a cancelled subscription
export async function reactivateSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
  
  return subscription;
}

// Verify webhook signature
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, secret);
}

// Update subscription (upgrade/downgrade)
export async function updateSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
  const taxEnabled = process.env.STRIPE_TAX_ENABLED === 'true';

  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'create_prorations',
    // Ensure tax calculation continues for updated subscription
    ...(taxEnabled && {
      automatic_tax: {
        enabled: true,
      },
    }),
  }) as any;

  return updatedSubscription;
}

// Get tax information from a checkout session
export async function getCheckoutSessionTax(
  sessionId: string
): Promise<{
  taxAmount: number;
  taxRate: number | null;
  totalAmount: number;
  currency: string;
  taxExempt: boolean;
} | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['total_details'],
    }) as any;

    if (!session.amount_total) {
      return null;
    }

    const taxAmount = session.total_details?.amount_tax || 0;
    const totalAmount = session.amount_total;
    const currency = session.currency || 'usd';
    const subtotal = session.amount_subtotal || totalAmount - taxAmount;

    return {
      taxAmount: taxAmount / 100, // Convert from cents
      taxRate: subtotal > 0 ? (taxAmount / subtotal) * 100 : null,
      totalAmount: totalAmount / 100,
      currency,
      taxExempt: taxAmount === 0,
    };
  } catch (error) {
    console.error('Error retrieving tax information:', error);
    return null;
  }
}

// Get tax information from an invoice
export async function getInvoiceTax(
  invoiceId: string
): Promise<{
  taxAmount: number;
  taxRate: number | null;
  totalAmount: number;
  currency: string;
  taxExempt: boolean;
  taxIds: Array<{ type: string; value: string }>;
} | null> {
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId, {
      expand: ['total_tax_amounts', 'customer_tax_ids'],
    }) as any;

    const taxAmount = invoice.tax || 0;
    const totalAmount = invoice.total;
    const currency = invoice.currency || 'usd';
    const subtotal = invoice.subtotal;

    // Extract customer tax IDs (e.g., EU VAT numbers)
    const taxIds = (invoice.customer_tax_ids || []).map((taxId: any) => ({
      type: taxId.type,
      value: taxId.value,
    }));

    return {
      taxAmount: taxAmount / 100,
      taxRate: subtotal > 0 ? (taxAmount / subtotal) * 100 : null,
      totalAmount: totalAmount / 100,
      currency,
      taxExempt: taxAmount === 0,
      taxIds,
    };
  } catch (error) {
    console.error('Error retrieving invoice tax information:', error);
    return null;
  }
}

// Payment Method Management

// List all payment methods for a customer
export async function listPaymentMethods(
  customerId: string
): Promise<Stripe.PaymentMethod[]> {
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: 'card',
  });

  return paymentMethods.data;
}

// Attach a payment method to a customer
export async function attachPaymentMethod(
  paymentMethodId: string,
  customerId: string
): Promise<Stripe.PaymentMethod> {
  return await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });
}

// Detach a payment method from a customer
export async function detachPaymentMethod(
  paymentMethodId: string
): Promise<Stripe.PaymentMethod> {
  return await stripe.paymentMethods.detach(paymentMethodId);
}

// Set default payment method for customer and subscriptions
export async function setDefaultPaymentMethod(
  customerId: string,
  paymentMethodId: string
): Promise<void> {
  // Update customer default
  await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  // Update all active subscriptions
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
  });

  for (const subscription of subscriptions.data) {
    await stripe.subscriptions.update(subscription.id, {
      default_payment_method: paymentMethodId,
    });
  }
}

// Create a SetupIntent for adding payment methods
export async function createSetupIntent(
  customerId: string,
  metadata?: Record<string, string>
): Promise<Stripe.SetupIntent> {
  return await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ['card'],
    metadata,
  });
}

// Get default payment method for a customer
export async function getDefaultPaymentMethod(
  customerId: string
): Promise<string | null> {
  const customer = await stripe.customers.retrieve(customerId) as any;

  if (customer.deleted) {
    return null;
  }

  return customer.invoice_settings?.default_payment_method as string || null;
}

// Refund Management

// Create a refund for a payment
export async function createRefund(
  paymentIntentId: string,
  amount?: number, // In cents, if not provided = full refund
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer',
  metadata?: Record<string, string>
): Promise<Stripe.Refund> {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount,
    reason,
    metadata,
  });
}

// Create a refund for a charge
export async function createChargeRefund(
  chargeId: string,
  amount?: number,
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer',
  metadata?: Record<string, string>
): Promise<Stripe.Refund> {
  return await stripe.refunds.create({
    charge: chargeId,
    amount,
    reason,
    metadata,
  });
}

// List refunds for a payment intent
export async function listRefunds(
  paymentIntentId: string
): Promise<Stripe.Refund[]> {
  const refunds = await stripe.refunds.list({
    payment_intent: paymentIntentId,
  });

  return refunds.data;
}

// Get refund details
export async function getRefund(
  refundId: string
): Promise<Stripe.Refund> {
  return await stripe.refunds.retrieve(refundId);
}

// Cancel a pending refund
export async function cancelRefund(
  refundId: string
): Promise<Stripe.Refund> {
  return await stripe.refunds.cancel(refundId);
}