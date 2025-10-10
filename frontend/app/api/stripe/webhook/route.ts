import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, verifyWebhookSignature } from '@/lib/stripe-server';
import { STRIPE_WEBHOOK_EVENTS } from '@/lib/stripe-config';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

// Stripe webhook endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event: Stripe.Event;

    try {
      event = verifyWebhookSignature(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case STRIPE_WEBHOOK_EVENTS.CHECKOUT_COMPLETED: {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case STRIPE_WEBHOOK_EVENTS.SUBSCRIPTION_CREATED:
      case STRIPE_WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED: {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case STRIPE_WEBHOOK_EVENTS.SUBSCRIPTION_DELETED: {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case STRIPE_WEBHOOK_EVENTS.INVOICE_PAID: {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case STRIPE_WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED: {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Handle successful checkout
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  if (!userId) {
    console.error('No userId in checkout session metadata');
    return;
  }

  // Update user with Stripe customer ID
  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeCustomerId: customerId,
    },
  });

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  await updateUserSubscription(userId, subscription);
}

// Handle subscription updates
async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  
  if (!userId) {
    // Try to find user by customer ID
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: subscription.customer as string },
    });
    
    if (user) {
      await updateUserSubscription(user.id, subscription);
    }
  } else {
    await updateUserSubscription(userId, subscription);
  }
}

// Handle subscription deletion
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: subscription.customer as string },
  });

  if (!user) {
    console.error('User not found for customer:', subscription.customer);
    return;
  }

  // Update user subscription status
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'cancelled',
      subscriptionTier: 'free',
    },
  });

  // Update subscription record
  await prisma.subscription.updateMany({
    where: {
      userId: user.id,
      stripeSubscriptionId: subscription.id,
    },
    data: {
      status: 'cancelled',
      canceledAt: new Date(),
    },
  });

  // Create activity log
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: 'subscription_cancelled',
      details: 'Subscription cancelled',
      metadata: {
        subscriptionId: subscription.id,
      },
    },
  });
}

// Handle successful invoice payment
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: invoice.customer as string },
  });

  if (!user) {
    console.error('User not found for customer:', invoice.customer);
    return;
  }

  // Record payment (upsert for idempotency - prevents duplicates if webhook is retried)
  await prisma.payment.upsert({
    where: {
      stripePaymentIntentId: (invoice as any).payment_intent as string,
    },
    update: {
      status: 'succeeded',
      amount: invoice.amount_paid / 100,
    },
    create: {
      userId: user.id,
      stripePaymentIntentId: (invoice as any).payment_intent as string,
      amount: invoice.amount_paid / 100, // Convert from cents
      currency: invoice.currency,
      status: 'succeeded',
      description: `Subscription payment for ${invoice.period_start ? new Date(invoice.period_start * 1000).toLocaleDateString() : 'N/A'}`,
    },
  });

  // Create activity log
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: 'payment_succeeded',
      details: `Payment succeeded: ${invoice.currency.toUpperCase()} ${(invoice.amount_paid / 100).toFixed(2)}`,
      metadata: {
        amount: invoice.amount_paid / 100,
        currency: invoice.currency,
        invoiceId: invoice.id,
      },
    },
  });
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: invoice.customer as string },
  });

  if (!user) {
    console.error('User not found for customer:', invoice.customer);
    return;
  }

  // Record failed payment (upsert for idempotency)
  await prisma.payment.upsert({
    where: {
      stripePaymentIntentId: (invoice as any).payment_intent as string,
    },
    update: {
      status: 'failed',
      amount: invoice.amount_due / 100,
    },
    create: {
      userId: user.id,
      stripePaymentIntentId: (invoice as any).payment_intent as string,
      amount: invoice.amount_due / 100,
      currency: invoice.currency,
      status: 'failed',
      description: 'Subscription payment failed',
    },
  });

  // Create notification
  await prisma.notification.create({
    data: {
      userId: user.id,
      type: 'payment_failed',
      title: 'Payment Failed',
      message: 'Your subscription payment failed. Please update your payment method.',
      priority: 'high',
    },
  });

  // Create activity log
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: 'payment_failed',
      details: `Payment failed: ${invoice.currency.toUpperCase()} ${(invoice.amount_due / 100).toFixed(2)}`,
      metadata: {
        amount: invoice.amount_due / 100,
        currency: invoice.currency,
        invoiceId: invoice.id,
      },
    },
  });
}

// Helper function to update user subscription
async function updateUserSubscription(userId: string, subscription: Stripe.Subscription) {
  // Determine subscription tier from price ID
  let tier: 'free' | 'core' | 'full' = 'free';
  let planName = 'free';
  let billingInterval: 'monthly' | 'yearly' | null = null;
  const priceId = subscription.items.data[0]?.price.id;

  // Match price ID to tier and plan
  if (priceId === process.env.STRIPE_PRICE_CORE_MONTHLY) {
    tier = 'core';
    planName = 'core_monthly';
    billingInterval = 'monthly';
  } else if (priceId === process.env.STRIPE_PRICE_CORE_YEARLY) {
    tier = 'core';
    planName = 'core_yearly';
    billingInterval = 'yearly';
  } else if (priceId === process.env.STRIPE_PRICE_FULL_MONTHLY) {
    tier = 'full';
    planName = 'full_monthly';
    billingInterval = 'monthly';
  } else if (priceId === process.env.STRIPE_PRICE_FULL_YEARLY) {
    tier = 'full';
    planName = 'full_yearly';
    billingInterval = 'yearly';
  }

  // Map Stripe status to our status (no trial status - we don't offer trials)
  let status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'unpaid' = 'active';
  if (subscription.status === 'canceled') {
    status = 'canceled';
  } else if (subscription.status === 'past_due') {
    status = 'past_due';
  } else if (subscription.status === 'incomplete') {
    status = 'incomplete';
  } else if (subscription.status === 'unpaid') {
    status = 'unpaid';
  }

  // Update user
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionTier: tier,
    },
  });

  // Create or update subscription record
  await prisma.subscription.upsert({
    where: {
      userId,
    },
    update: {
      planName,
      status,
      billingInterval,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    create: {
      userId,
      planName,
      status,
      billingInterval,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}