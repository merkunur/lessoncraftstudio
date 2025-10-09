/**
 * Mock Stripe implementation for development/testing
 * When STRIPE_SECRET_KEY is invalid or missing, this mock mode allows
 * testing the payment flow without real Stripe integration
 */

export const MOCK_MODE_ENABLED = process.env.NODE_ENV === 'development' &&
  (!process.env.STRIPE_SECRET_KEY ||
   process.env.STRIPE_SECRET_KEY.includes('placeholder') ||
   process.env.STRIPE_SECRET_KEY === 'sk_test_51234567890abcdefghijklmnopqrstuvwxyz');

/**
 * Create a mock checkout session
 * Simulates Stripe's checkout.sessions.create() response
 */
export async function createMockCheckoutSession(
  customerId: string,
  priceId: string,
  userId: string,
  tier: string,
  billingInterval: string,
  successUrl: string,
  cancelUrl: string
) {
  console.log('[MOCK STRIPE] Creating mock checkout session');
  console.log('[MOCK STRIPE] Customer ID:', customerId);
  console.log('[MOCK STRIPE] Tier:', tier);
  console.log('[MOCK STRIPE] Billing interval:', billingInterval);

  // Generate a mock session ID
  const mockSessionId = `cs_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Create mock checkout URL that will redirect to success with session_id
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const mockCheckoutUrl = `${baseUrl}/api/stripe/mock-checkout?session_id=${mockSessionId}&user_id=${userId}&tier=${tier}&interval=${billingInterval}&success_url=${encodeURIComponent(successUrl)}`;

  console.log('[MOCK STRIPE] Mock checkout URL:', mockCheckoutUrl);

  return {
    id: mockSessionId,
    url: mockCheckoutUrl,
    payment_status: 'paid',
    customer: customerId,
    metadata: {
      userId,
      tier,
      billingInterval
    }
  };
}

/**
 * Get mock Stripe customer ID
 */
export function getMockCustomerId(userId: string): string {
  return `cus_mock_${userId.substring(0, 14)}`;
}

/**
 * Create mock subscription
 */
export function createMockSubscription(
  customerId: string,
  priceId: string,
  userId: string,
  tier: string,
  billingInterval: string
) {
  console.log('[MOCK STRIPE] Creating mock subscription');

  const now = new Date();
  const currentPeriodEnd = new Date();
  currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + (billingInterval === 'yearly' ? 12 : 1));

  return {
    id: `sub_mock_${Date.now()}`,
    customer: customerId,
    status: 'active',
    current_period_start: Math.floor(now.getTime() / 1000),
    current_period_end: Math.floor(currentPeriodEnd.getTime() / 1000),
    items: {
      data: [{
        id: `si_mock_${Date.now()}`,
        price: {
          id: priceId,
          recurring: {
            interval: billingInterval
          }
        }
      }]
    },
    metadata: {
      userId,
      tier
    }
  };
}

/**
 * Get mock price info
 */
export function getMockPriceInfo(tier: string, billingInterval: string) {
  const prices = {
    CORE: {
      monthly: 999, // $9.99
      yearly: 9999 // $99.99
    },
    FULL: {
      monthly: 1999, // $19.99
      yearly: 19999 // $199.99
    }
  };

  return {
    amount: prices[tier as keyof typeof prices][billingInterval as 'monthly' | 'yearly'] || 0,
    currency: 'usd'
  };
}
