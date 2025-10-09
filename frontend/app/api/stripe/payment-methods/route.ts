import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe-server';
import { prisma } from '@/lib/prisma';

// GET /api/stripe/payment-methods - List all payment methods for the customer
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!user.stripeCustomerId) {
      return NextResponse.json({
        paymentMethods: [],
        defaultPaymentMethod: null,
      });
    }

    // Get payment methods from Stripe
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: 'card',
    });

    // Get customer to find default payment method
    const customer = await stripe.customers.retrieve(user.stripeCustomerId);

    let defaultPaymentMethodId: string | null = null;
    if (customer && !customer.deleted) {
      defaultPaymentMethodId = customer.invoice_settings.default_payment_method as string || null;
    }

    // Format payment methods for response
    const formattedMethods = paymentMethods.data.map((pm) => ({
      id: pm.id,
      type: pm.type,
      card: pm.card ? {
        brand: pm.card.brand,
        last4: pm.card.last4,
        expMonth: pm.card.exp_month,
        expYear: pm.card.exp_year,
      } : null,
      isDefault: pm.id === defaultPaymentMethodId,
      createdAt: new Date(pm.created * 1000),
    }));

    return NextResponse.json({
      paymentMethods: formattedMethods,
      defaultPaymentMethod: defaultPaymentMethodId,
    });
  } catch (error) {
    console.error('Get payment methods error:', error);
    return NextResponse.json(
      { error: 'Failed to get payment methods' },
      { status: 500 }
    );
  }
}

// POST /api/stripe/payment-methods - Attach a new payment method
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const schema = z.object({
      paymentMethodId: z.string().min(1, 'Payment method ID is required'),
      setAsDefault: z.boolean().optional().default(false),
    });

    const body = await request.json();
    const validationResult = schema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { paymentMethodId, setAsDefault } = validationResult.data;

    // Ensure user has a Stripe customer ID
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const { getOrCreateStripeCustomer } = await import('@/lib/stripe-server');
      customerId = await getOrCreateStripeCustomer(
        user.id,
        user.email,
        `${user.firstName} ${user.lastName}`.trim() || undefined
      );

      // Save customer ID to database
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Set as default if requested
    if (setAsDefault) {
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // Update default payment method on active subscriptions
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

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'payment_method_added',
        details: `New payment method added${setAsDefault ? ' and set as default' : ''}`,
        metadata: {
          paymentMethodId,
          setAsDefault,
        },
      },
    });

    return NextResponse.json({
      message: 'Payment method added successfully',
      paymentMethodId,
      isDefault: setAsDefault,
    });
  } catch (error: any) {
    console.error('Add payment method error:', error);

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to add payment method' },
      { status: 500 }
    );
  }
}

// DELETE /api/stripe/payment-methods - Remove a payment method
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const paymentMethodId = searchParams.get('id');

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: 'Payment method ID is required' },
        { status: 400 }
      );
    }

    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No payment methods found' },
        { status: 404 }
      );
    }

    // Verify payment method belongs to this customer
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    if (paymentMethod.customer !== user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Payment method not found' },
        { status: 404 }
      );
    }

    // Check if this is the default payment method
    const customer = await stripe.customers.retrieve(user.stripeCustomerId);
    const isDefault = !customer.deleted &&
      customer.invoice_settings.default_payment_method === paymentMethodId;

    if (isDefault) {
      // Get active subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active',
      });

      if (subscriptions.data.length > 0) {
        return NextResponse.json(
          {
            error: 'Cannot remove default payment method with active subscriptions',
            suggestion: 'Please set a different payment method as default first'
          },
          { status: 400 }
        );
      }
    }

    // Detach payment method
    await stripe.paymentMethods.detach(paymentMethodId);

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'payment_method_removed',
        details: `Payment method ${paymentMethod.card?.brand} ending in ${paymentMethod.card?.last4} removed`,
        metadata: {
          paymentMethodId,
          wasDefault: isDefault,
        },
      },
    });

    return NextResponse.json({
      message: 'Payment method removed successfully',
    });
  } catch (error) {
    console.error('Remove payment method error:', error);
    return NextResponse.json(
      { error: 'Failed to remove payment method' },
      { status: 500 }
    );
  }
}

// PATCH /api/stripe/payment-methods - Update payment method (set as default)
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const schema = z.object({
      paymentMethodId: z.string().min(1, 'Payment method ID is required'),
      action: z.literal('set_default'),
    });

    const body = await request.json();
    const validationResult = schema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { paymentMethodId } = validationResult.data;

    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No customer found' },
        { status: 404 }
      );
    }

    // Verify payment method belongs to this customer
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    if (paymentMethod.customer !== user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Payment method not found' },
        { status: 404 }
      );
    }

    // Update customer default payment method
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Update default payment method on all active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'active',
    });

    for (const subscription of subscriptions.data) {
      await stripe.subscriptions.update(subscription.id, {
        default_payment_method: paymentMethodId,
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'payment_method_set_default',
        details: `Payment method ${paymentMethod.card?.brand} ending in ${paymentMethod.card?.last4} set as default`,
        metadata: {
          paymentMethodId,
        },
      },
    });

    return NextResponse.json({
      message: 'Default payment method updated successfully',
      paymentMethodId,
    });
  } catch (error) {
    console.error('Update default payment method error:', error);
    return NextResponse.json(
      { error: 'Failed to update default payment method' },
      { status: 500 }
    );
  }
}
