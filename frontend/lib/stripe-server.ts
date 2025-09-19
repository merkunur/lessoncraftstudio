import Stripe from 'stripe';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from './stripe-config';

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
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
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
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
  });
  
  return session;
}

// Create a portal session for managing subscription
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
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
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  // Determine tier from price ID
  let tier: SubscriptionTier | null = null;
  const priceId = subscription.items.data[0]?.price.id;
  
  if (priceId === process.env.STRIPE_CORE_PRICE_ID) {
    tier = 'CORE';
  } else if (priceId === process.env.STRIPE_FULL_PRICE_ID) {
    tier = 'FULL';
  }
  
  return {
    status: subscription.status,
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
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
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'create_prorations',
  });
  
  return updatedSubscription;
}