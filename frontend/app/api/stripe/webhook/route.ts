import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, verifyWebhookSignature } from '@/lib/stripe-server';
import { STRIPE_WEBHOOK_EVENTS } from '@/lib/stripe-config';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import {
  sendPaymentReceiptEmail,
  sendPaymentFailedEmail,
  sendPaymentReminderEmail,
  sendServiceSuspendedEmail,
  sendSubscriptionUpgradeEmail
} from '@/lib/email';

export const dynamic = 'force-dynamic';

// Disable body parsing - Stripe needs the raw body
export const runtime = 'nodejs';

// Stripe webhook endpoint
export async function POST(request: NextRequest) {
  try {
    // Get raw body as buffer for signature verification
    const buf = await request.arrayBuffer();
    const body = Buffer.from(buf).toString('utf8');
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
      console.log('✅ Webhook signature verified successfully');
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    console.log(`📨 Processing webhook event: ${event.type}`);

    // Idempotency check - prevent duplicate processing
    const existingEvent = await prisma.webhookEvent.findUnique({
      where: { stripeEventId: event.id },
    });

    if (existingEvent) {
      console.log(`⚠️ Duplicate webhook event detected: ${event.id}`);
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Log event before processing
    await prisma.webhookEvent.create({
      data: {
        stripeEventId: event.id,
        eventType: event.type,
        status: 'processing',
        payload: event.data.object as any,
      },
    });

    let processingError: string | null = null;

    try {
      // Handle the event
      switch (event.type) {
      case STRIPE_WEBHOOK_EVENTS.CHECKOUT_COMPLETED: {
        console.log('🛒 Handling checkout.session.completed');
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        console.log('✅ Checkout completed handler finished');
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
    } catch (eventError) {
      processingError = eventError instanceof Error ? eventError.message : 'Unknown error';
      console.error('Event processing error:', eventError);
    }

    // Update webhook event status
    await prisma.webhookEvent.update({
      where: { stripeEventId: event.id },
      data: {
        status: processingError ? 'failed' : 'processed',
        errorMessage: processingError,
      },
    });

    if (processingError) {
      // Still return 200 to prevent Stripe from retrying
      // The error is logged for investigation
      return NextResponse.json({ received: true, error: processingError });
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
  console.log('🔍 handleCheckoutCompleted started');
  const userId = session.metadata?.userId;
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  console.log(`📝 Checkout data - userId: ${userId}, customerId: ${customerId}, subscriptionId: ${subscriptionId}`);

  if (!userId) {
    console.error('❌ No userId in checkout session metadata');
    return;
  }

  if (!customerId) {
    console.error('❌ No customerId in checkout session');
    return;
  }

  try {
    // Update user with Stripe customer ID
    console.log(`💾 Updating user ${userId} with customer ID ${customerId}`);
    await prisma.user.update({
      where: { id: userId },
      data: {
        stripeCustomerId: customerId,
      },
    });
    console.log('✅ User updated with customer ID');

    // Only process subscription if it exists
    if (subscriptionId) {
      // Get subscription details
      console.log(`🔍 Retrieving subscription ${subscriptionId} from Stripe`);
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      console.log(`📦 Subscription retrieved: ${subscription.id}, status: ${subscription.status}`);

      await updateUserSubscription(userId, subscription);
      console.log('✅ User subscription updated successfully');
    } else {
      console.log('ℹ️  No subscription ID in checkout session - subscription will be processed by subscription.created event');
    }
  } catch (error) {
    console.error('❌ Error in handleCheckoutCompleted:', error);
    throw error;
  }
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

  // Check if this was due to non-payment (status was unpaid or past_due)
  const wasDueToNonPayment = subscription.status === 'unpaid' || subscription.status === 'past_due';

  // Update user subscription status
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'cancelled',
      subscriptionTier: 'free',
      // If suspended due to non-payment, record the suspension
      accountSuspendedAt: wasDueToNonPayment ? new Date() : undefined,
      gracePeriodEndsAt: null,
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

  // Mark any pending payment failures as failed
  await prisma.paymentFailure.updateMany({
    where: {
      userId: user.id,
      status: { in: ['pending', 'retrying'] },
    },
    data: {
      status: 'failed',
    },
  });

  // Create activity log
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: wasDueToNonPayment ? 'subscription_suspended_nonpayment' : 'subscription_cancelled',
      details: wasDueToNonPayment ? 'Subscription suspended due to non-payment' : 'Subscription cancelled',
      metadata: {
        subscriptionId: subscription.id,
        reason: wasDueToNonPayment ? 'non_payment' : 'user_cancelled',
      },
    },
  });

  // Send service suspended email if due to non-payment
  if (wasDueToNonPayment) {
    console.log(`📧 Sending service suspended email to ${user.email}`);
    const updatePaymentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`;

    sendServiceSuspendedEmail({
      email: user.email,
      firstName: user.firstName || '',
      suspensionDate: new Date().toLocaleDateString(),
      dataRetentionDays: 30, // Data retained for 30 days
      updatePaymentUrl,
      language: user.language || 'en',
    }).catch(error => {
      console.error('❌ Failed to send service suspended email:', error);
    });
  }
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

  // Get payment identifiers - prefer payment_intent, then charge, then invoice as fallback
  const invoicePaymentIntent = ((invoice as any).payment_intent as string | null);
  const invoiceCharge = ((invoice as any).charge as string | null);
  const paymentId = invoicePaymentIntent || invoiceCharge || invoice.id;

  // Prepare payment data
  const paymentData = {
    userId: user.id,
    stripePaymentIntentId: paymentId,
    stripeInvoiceId: invoice.id!,
    stripePaymentId: invoiceCharge || undefined, // Store charge ID separately if available
    amount: invoice.amount_paid / 100, // Convert from cents
    currency: invoice.currency,
    status: 'succeeded',
    description: `Subscription payment for ${invoice.period_start ? new Date(invoice.period_start * 1000).toLocaleDateString() : 'N/A'}`,
    invoiceUrl: invoice.hosted_invoice_url || undefined,
    invoicePdf: invoice.invoice_pdf || undefined,
  };

  // Record payment (upsert for idempotency - prevents duplicates if webhook is retried)
  await prisma.payment.upsert({
    where: {
      stripePaymentIntentId: paymentId,
    },
    update: {
      status: paymentData.status,
      amount: paymentData.amount,
      stripeInvoiceId: paymentData.stripeInvoiceId,
      stripePaymentId: paymentData.stripePaymentId,
      invoiceUrl: paymentData.invoiceUrl,
      invoicePdf: paymentData.invoicePdf,
    },
    create: paymentData,
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

  // Send payment receipt email
  // Note: There's a race condition where invoice.paid can arrive before subscription is created
  // We retry a few times with a short delay to handle this
  let subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });

  // Retry up to 3 times with 500ms delay if subscription not found (race condition with checkout.session.completed)
  if (!subscription) {
    console.log(`⏳ Subscription not found for user ${user.id}, retrying...`);
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      subscription = await prisma.subscription.findUnique({
        where: { userId: user.id },
      });
      if (subscription) {
        console.log(`✅ Subscription found on retry ${i + 1}`);
        break;
      }
    }
  }

  // Send email even if subscription not found - use fallback values
  console.log(`📧 Sending payment receipt email to ${user.email}`);
  sendPaymentReceiptEmail({
    email: user.email,
    firstName: user.firstName || '',
    invoiceNumber: invoice.number || invoice.id || `INV-${Date.now()}`,
    amount: invoice.amount_paid / 100,
    currency: invoice.currency,
    date: new Date().toLocaleDateString(),
    plan: subscription?.planName || 'Subscription',
    billingPeriod: subscription?.billingInterval || 'monthly',
    paymentMethod: 'Card',
    invoiceUrl: invoice.hosted_invoice_url || undefined,
    language: user.language || 'en',
  }).catch(error => {
    console.error('❌ Failed to send payment receipt email:', error);
  });
}

// Handle failed invoice payment with enhanced dunning logic
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: invoice.customer as string },
  });

  if (!user) {
    console.error('User not found for customer:', invoice.customer);
    return;
  }

  // Get payment identifiers - prefer payment_intent, then charge, then invoice as fallback
  const invoicePaymentIntent = ((invoice as any).payment_intent as string | null);
  const invoiceCharge = ((invoice as any).charge as string | null);
  const paymentId = invoicePaymentIntent || invoiceCharge || invoice.id;
  const failureReason = (invoice as any).last_payment_error?.message || 'Payment declined';
  const failureCode = (invoice as any).last_payment_error?.code || 'card_declined';

  // Prepare payment data
  const paymentData = {
    userId: user.id,
    stripePaymentIntentId: paymentId,
    stripeInvoiceId: invoice.id!,
    stripePaymentId: invoiceCharge || undefined,
    amount: invoice.amount_due / 100,
    currency: invoice.currency,
    status: 'failed',
    description: 'Subscription payment failed',
    failureReason,
  };

  // Record failed payment (upsert for idempotency)
  await prisma.payment.upsert({
    where: {
      stripePaymentIntentId: paymentId,
    },
    update: {
      status: paymentData.status,
      amount: paymentData.amount,
      stripeInvoiceId: paymentData.stripeInvoiceId,
      stripePaymentId: paymentData.stripePaymentId,
      failureReason: paymentData.failureReason,
    },
    create: paymentData,
  });

  // Track payment failure for dunning
  const existingFailure = await prisma.paymentFailure.findFirst({
    where: {
      userId: user.id,
      stripeInvoiceId: invoice.id!,
      status: { in: ['pending', 'retrying'] },
    },
    orderBy: { createdAt: 'desc' },
  });

  const retryCount = (existingFailure?.retryCount || 0) + 1;
  const GRACE_PERIOD_DAYS = 14;
  const now = new Date();

  // Calculate next retry date (Stripe typically retries every 3-5 days)
  const nextRetryDate = new Date(now);
  nextRetryDate.setDate(nextRetryDate.getDate() + 3);

  if (existingFailure) {
    // Update existing failure record
    await prisma.paymentFailure.update({
      where: { id: existingFailure.id },
      data: {
        retryCount,
        lastRetryAt: now,
        nextRetryAt: nextRetryDate,
        failureCode,
        failureMessage: failureReason,
        status: 'retrying',
      },
    });
  } else {
    // Create new failure record
    await prisma.paymentFailure.create({
      data: {
        userId: user.id,
        stripeInvoiceId: invoice.id!,
        stripePaymentIntentId: invoicePaymentIntent ?? undefined,
        failureCode,
        failureMessage: failureReason,
        amount: invoice.amount_due / 100,
        currency: invoice.currency,
        retryCount: 1,
        lastRetryAt: now,
        nextRetryAt: nextRetryDate,
        status: 'pending',
      },
    });

    // Set grace period on first failure
    const gracePeriodEndsAt = new Date(now);
    gracePeriodEndsAt.setDate(gracePeriodEndsAt.getDate() + GRACE_PERIOD_DAYS);

    await prisma.user.update({
      where: { id: user.id },
      data: { gracePeriodEndsAt },
    });
  }

  // Create notification
  await prisma.notification.create({
    data: {
      userId: user.id,
      type: 'payment_failed',
      title: 'Payment Failed',
      message: `Your subscription payment failed. Please update your payment method. Attempt ${retryCount}.`,
      priority: 'high',
    },
  });

  // Create activity log
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: 'payment_failed',
      details: `Payment failed (attempt ${retryCount}): ${invoice.currency.toUpperCase()} ${(invoice.amount_due / 100).toFixed(2)}`,
      metadata: {
        amount: invoice.amount_due / 100,
        currency: invoice.currency,
        invoiceId: invoice.id,
        retryCount,
        failureCode,
      },
    },
  });

  // Send appropriate dunning email based on retry count
  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });

  if (subscription) {
    const updatePaymentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`;

    if (retryCount === 1) {
      // First failure - send initial failed payment email
      console.log(`📧 Sending first payment failed email to ${user.email}`);
      sendPaymentFailedEmail({
        email: user.email,
        firstName: user.firstName || '',
        amount: invoice.amount_due / 100,
        currency: invoice.currency,
        failureReason,
        updatePaymentUrl,
        nextRetryDate: nextRetryDate.toLocaleDateString(),
        language: user.language || 'en',
      }).catch(error => {
        console.error('❌ Failed to send payment failed email:', error);
      });
    } else {
      // Subsequent failures - send escalating reminder with days countdown
      const daysUntilSuspension = Math.max(0, GRACE_PERIOD_DAYS - (retryCount * 3));
      console.log(`📧 Sending payment reminder email (attempt ${retryCount}) to ${user.email}, ${daysUntilSuspension} days until suspension`);

      sendPaymentReminderEmail({
        email: user.email,
        firstName: user.firstName || '',
        amount: invoice.amount_due / 100,
        currency: invoice.currency,
        failureReason,
        updatePaymentUrl,
        daysUntilSuspension,
        language: user.language || 'en',
      }).catch(error => {
        console.error('❌ Failed to send payment reminder email:', error);
      });
    }
  }
}

// Helper function to update user subscription
async function updateUserSubscription(userId: string, subscription: Stripe.Subscription) {
  console.log('🔧 updateUserSubscription started');
  console.log(`📦 Full subscription object keys: ${Object.keys(subscription).join(', ')}`);
  console.log(`📅 Raw subscription dates - current_period_start: ${(subscription as any).current_period_start}, current_period_end: ${(subscription as any).current_period_end}`);

  // Determine subscription tier from price ID
  let tier: 'free' | 'core' | 'full' = 'free';
  let planName = 'free';
  let billingInterval: 'monthly' | 'yearly' | null = null;
  const priceId = subscription.items.data[0]?.price.id;

  console.log(`💰 Price ID from subscription: ${priceId}`);
  console.log(`🔑 Environment price IDs - CORE_MONTHLY: ${process.env.STRIPE_PRICE_CORE_MONTHLY}, CORE_YEARLY: ${process.env.STRIPE_PRICE_CORE_YEARLY}`);
  console.log(`🔑 Environment price IDs - FULL_MONTHLY: ${process.env.STRIPE_PRICE_FULL_MONTHLY}, FULL_YEARLY: ${process.env.STRIPE_PRICE_FULL_YEARLY}`);

  // Match price ID to tier and plan
  if (priceId === process.env.STRIPE_PRICE_CORE_MONTHLY) {
    tier = 'core';
    planName = 'core_monthly';
    billingInterval = 'monthly';
    console.log('✅ Matched CORE_MONTHLY plan');
  } else if (priceId === process.env.STRIPE_PRICE_CORE_YEARLY) {
    tier = 'core';
    planName = 'core_yearly';
    billingInterval = 'yearly';
    console.log('✅ Matched CORE_YEARLY plan');
  } else if (priceId === process.env.STRIPE_PRICE_FULL_MONTHLY) {
    tier = 'full';
    planName = 'full_monthly';
    billingInterval = 'monthly';
    console.log('✅ Matched FULL_MONTHLY plan');
  } else if (priceId === process.env.STRIPE_PRICE_FULL_YEARLY) {
    tier = 'full';
    planName = 'full_yearly';
    billingInterval = 'yearly';
    console.log('✅ Matched FULL_YEARLY plan');
  } else {
    console.warn(`⚠️ Price ID ${priceId} did not match any configured price - defaulting to free tier`);
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

  console.log(`📊 Updating user ${userId} with tier: ${tier}, plan: ${planName}, status: ${status}`);

  // Get period dates from the subscription
  const subAny = subscription as any;

  // Stripe API returns period dates in different properties depending on the version
  // Try multiple sources to find the period dates
  let currentPeriodStart: Date;
  let currentPeriodEnd: Date;

  // Try to get from standard properties first
  if (subAny.current_period_start && subAny.current_period_end) {
    currentPeriodStart = new Date(subAny.current_period_start * 1000);
    currentPeriodEnd = new Date(subAny.current_period_end * 1000);
    console.log(`✅ Using current_period_start and current_period_end from subscription`);
  } else if (subAny.billing_cycle_anchor) {
    // Fallback: Use billing_cycle_anchor and calculate end date based on interval
    console.log(`⚠️ Using billing_cycle_anchor fallback (current_period_start/end not available)`);
    currentPeriodStart = new Date(subAny.billing_cycle_anchor * 1000);

    // Calculate end date based on billing interval
    currentPeriodEnd = new Date(currentPeriodStart);
    if (billingInterval === 'yearly') {
      currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
    } else {
      // monthly or null defaults to monthly
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    }
    console.log(`📅 Calculated period end from billing_cycle_anchor + interval`);
  } else if (subAny.start_date) {
    // Last fallback: Use start_date
    console.log(`⚠️ Using start_date fallback (no billing_cycle_anchor available)`);
    currentPeriodStart = new Date(subAny.start_date * 1000);

    // Calculate end date based on billing interval
    currentPeriodEnd = new Date(currentPeriodStart);
    if (billingInterval === 'yearly') {
      currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
    } else {
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    }
    console.log(`📅 Calculated period end from start_date + interval`);
  } else {
    console.error(`❌ No valid date properties found in subscription!`);
    console.error(`❌ Available properties: ${Object.keys(subscription).join(', ')}`);
    console.error(`❌ Subscription status: ${subscription.status}, ID: ${subscription.id}`);
    throw new Error('Subscription is missing all date properties (current_period_start, billing_cycle_anchor, start_date)');
  }

  console.log(`📅 Period: ${currentPeriodStart.toISOString()} to ${currentPeriodEnd.toISOString()}`);

  try {
    // Get user's current subscription tier before updating (to detect upgrades)
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscriptionTier: true,
        email: true,
        firstName: true,
        language: true,
      },
    });

    const oldTier = currentUser?.subscriptionTier || 'free';
    const isUpgrade = oldTier !== tier && tier !== 'free';

    // Update user
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: tier,
      },
    });
    console.log('✅ User tier updated in database');

    // Create or update subscription record
    const subscriptionRecord = await prisma.subscription.upsert({
      where: {
        userId,
      },
      update: {
        planName,
        status,
        billingInterval,
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId,
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      create: {
        userId,
        planName,
        status,
        billingInterval,
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId,
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
    console.log(`✅ Subscription record upserted in database with ID: ${subscriptionRecord.id}`);

    // Send subscription upgrade confirmation email for new subscriptions or upgrades
    if (isUpgrade && currentUser) {
      console.log(`📧 Sending subscription upgrade email to ${currentUser.email}`);
      const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

      sendSubscriptionUpgradeEmail({
        email: currentUser.email,
        firstName: currentUser.firstName || '',
        language: currentUser.language || 'en',
        oldPlan: oldTier === 'free' ? 'Free' : oldTier === 'core' ? 'Core' : 'Full',
        newPlan: tier === 'core' ? 'Core' : 'Full',
      }).catch(error => {
        console.error('❌ Failed to send subscription upgrade email:', error);
      });
    }
  } catch (error) {
    console.error('❌ Error updating database:', error);
    throw error;
  }
}