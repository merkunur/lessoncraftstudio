import { NextRequest, NextResponse } from 'next/server';
import { PaymentMethod } from '@/types/stripe';

export const dynamic = 'force-dynamic';

// GET /api/admin/billing/payment-methods - Get payment methods
export async function GET(request: NextRequest) {
  try {
    // Mock payment methods for development
    const paymentMethods: PaymentMethod[] = [
      {
        id: 'pm_1',
        stripePaymentMethodId: 'pm_mock123',
        type: 'card',
        isDefault: true,
        card: {
          brand: 'Visa',
          last4: '4242',
          expMonth: 12,
          expYear: 2025
        },
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'pm_2',
        stripePaymentMethodId: 'pm_mock456',
        type: 'card',
        isDefault: false,
        card: {
          brand: 'MasterCard',
          last4: '5555',
          expMonth: 3,
          expYear: 2026
        },
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    return NextResponse.json(paymentMethods);
  } catch (error) {
    console.error('Failed to get payment methods:', error);
    return NextResponse.json(
      { error: 'Failed to get payment methods' },
      { status: 500 }
    );
  }
}

// POST /api/admin/billing/payment-methods - Add payment method
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, add payment method via Stripe API
    console.log('Adding payment method:', body);

    const newPaymentMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      stripePaymentMethodId: `pm_mock${Date.now()}`,
      type: 'card',
      isDefault: false,
      card: {
        brand: 'Visa',
        last4: '1234',
        expMonth: 12,
        expYear: 2027
      },
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(newPaymentMethod);
  } catch (error) {
    console.error('Failed to add payment method:', error);
    return NextResponse.json(
      { error: 'Failed to add payment method' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/billing/payment-methods/[id] - Remove payment method
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    // In production, remove payment method via Stripe API
    console.log('Removing payment method:', id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to remove payment method:', error);
    return NextResponse.json(
      { error: 'Failed to remove payment method' },
      { status: 500 }
    );
  }
}