import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
);

export interface PriceInfo {
  tier: 'core' | 'full';
  interval: 'month' | 'year';
  priceId: string;
  amount: number;
}

// Price IDs for different plans (would come from environment variables in production)
export const STRIPE_PRICES: Record<string, PriceInfo> = {
  core_monthly: {
    tier: 'core',
    interval: 'month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY || 'price_core_monthly',
    amount: 1500 // $15.00 in cents
  },
  core_yearly: {
    tier: 'core',
    interval: 'year',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_YEARLY || 'price_core_yearly',
    amount: 14400 // $144.00 in cents (20% discount)
  },
  full_monthly: {
    tier: 'full',
    interval: 'month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL_MONTHLY || 'price_full_monthly',
    amount: 2500 // $25.00 in cents
  },
  full_yearly: {
    tier: 'full',
    interval: 'year',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL_YEARLY || 'price_full_yearly',
    amount: 24000 // $240.00 in cents (20% discount)
  }
};

export async function createCheckoutSession(
  priceKey: string,
  userEmail?: string
): Promise<{ sessionId?: string; error?: string }> {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const priceInfo = STRIPE_PRICES[priceKey];
    if (!priceInfo) {
      throw new Error('Invalid price selection');
    }

    const response = await fetch('http://localhost:3001/api/subscriptions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        priceId: priceInfo.priceId,
        tier: priceInfo.tier,
        interval: priceInfo.interval,
        customerEmail: userEmail
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    return { sessionId: data.sessionId };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return { error: error.message || 'Something went wrong' };
  }
}

export async function redirectToCheckout(sessionId: string) {
  const stripe = await stripePromise;
  if (!stripe) {
    console.error('Stripe not initialized');
    return;
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  
  if (error) {
    console.error('Error redirecting to checkout:', error);
    alert(error.message);
  }
}

export async function createPortalSession(): Promise<{ url?: string; error?: string }> {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch('http://localhost:3001/api/subscriptions/create-portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create portal session');
    }

    return { url: data.url };
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    return { error: error.message || 'Something went wrong' };
  }
}