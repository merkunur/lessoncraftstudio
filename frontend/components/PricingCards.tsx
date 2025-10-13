'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';
import BillingToggle from './BillingToggle';

interface Plan {
  name: string;
  price: string;
  period: string;
  yearlyPrice?: string;
  description: string;
  features: string[];
  limitations?: string[];
  apps?: string[];
  newApps?: string[];
  cta: string;
  ctaLink: string;
  variant: string;
  popular?: boolean;
}

interface PricingCardsProps {
  plans: Plan[];
  billingToggleLabels: {
    monthly: string;
    yearly: string;
    yearlyDiscount: string;
  };
  labels: {
    whatsIncluded: string;
    limitations: string;
    appsIncluded: string;
    orYearly: string;
    perYear: string;
  };
}

export default function PricingCards({
  plans,
  billingToggleLabels,
  labels
}: PricingCardsProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  // Debug: Log when component mounts
  console.log('[PricingCards] Component mounted. isAuthenticated:', isAuthenticated, 'user:', user?.email || 'none');

  const getDisplayPrice = (plan: Plan) => {
    if (isYearly && plan.yearlyPrice) {
      return plan.yearlyPrice;
    }
    return plan.price;
  };

  const getDisplayPeriod = (plan: Plan) => {
    if (isYearly && plan.yearlyPrice) {
      return labels.perYear;
    }
    return plan.period;
  };

  const handlePlanClick = async (plan: Plan, e: React.MouseEvent) => {
    console.log('[PricingCards] Button clicked - Plan:', plan.variant, 'Authenticated:', isAuthenticated);

    // If not authenticated, redirect to signin with plan and billing interval parameters
    // This allows automatic checkout creation after signin without requiring user to click Subscribe again
    if (!isAuthenticated) {
      const locale = window.location.pathname.split('/')[1] || 'en';
      const currentPath = window.location.pathname;
      const planParam = plan.variant.toLowerCase(); // 'core' or 'full'
      const billingParam = isYearly ? 'yearly' : 'monthly';
      const signinUrl = `/${locale}/auth/signin?redirect=${encodeURIComponent(currentPath)}&plan=${planParam}&billing=${billingParam}`;
      console.log('[PricingCards] User NOT authenticated, redirecting to signin with plan:', planParam, 'billing:', billingParam);
      router.push(signinUrl);
      return;
    }

    // If authenticated, create checkout session
    console.log('[PricingCards] Authenticated, creating checkout session...');
    setIsLoading(plan.variant);
    try {
      const token = localStorage.getItem('accessToken');
      const locale = window.location.pathname.split('/')[1] || 'en';
      const baseUrl = window.location.origin;
      console.log('[PricingCards] Access token:', token ? 'Found' : 'Not found');

      // Construct locale-aware redirect URLs
      const successUrl = `${baseUrl}/${locale}/dashboard/billing?success=true`;
      const cancelUrl = `${baseUrl}/${locale}/pricing?cancelled=true`;

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          tier: plan.variant.toUpperCase(),
          billingInterval: isYearly ? 'yearly' : 'monthly',
          successUrl,
          cancelUrl,
        }),
      });

      console.log('[PricingCards] Checkout response status:', response.status);
      const data = await response.json();
      console.log('[PricingCards] Checkout response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        console.log('[PricingCards] Redirecting to Stripe:', data.url);
        window.location.href = data.url;
      } else {
        console.error('[PricingCards] No URL in response');
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('[PricingCards] Checkout error:', error);
      toast.error(error.message || 'Failed to start checkout');
      setIsLoading(null);
    }
  };

  return (
    <>
      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <BillingToggle
          monthlyLabel={billingToggleLabels.monthly}
          yearlyLabel={billingToggleLabels.yearly}
          yearlyDiscount={billingToggleLabels.yearlyDiscount}
          onToggle={setIsYearly}
        />
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl ${
                plan.popular
                  ? 'ring-2 ring-primary shadow-xl scale-105'
                  : 'border border-gray-200 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">{getDisplayPrice(plan)}</span>
                  <span className="text-gray-500">{getDisplayPeriod(plan)}</span>
                  {!isYearly && plan.yearlyPrice && (
                    <p className="text-sm text-gray-500 mt-2">
                      {labels.orYearly} {plan.yearlyPrice}{labels.perYear}
                    </p>
                  )}
                </div>

                {plan.variant === 'free' ? (
                  <Link href={plan.ctaLink}>
                    <button
                      className="w-full py-3 px-6 rounded-lg font-semibold transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200">
                      {plan.cta}
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={(e) => handlePlanClick(plan, e)}
                    disabled={isLoading === plan.variant}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      plan.popular
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}>
                    {isLoading === plan.variant ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      plan.cta
                    )}
                  </button>
                )}

                {/* Features */}
                {plan.features && plan.features.length > 0 && (
                  <div className="mt-8">
                    <p className="font-semibold text-gray-900 mb-4">{labels.whatsIncluded}</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Limitations */}
                {plan.limitations && plan.limitations.length > 0 && (
                  <div className="mt-8">
                    <p className="font-semibold text-gray-900 mb-4">{labels.limitations}</p>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-gray-500 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Apps Included */}
                {plan.apps && plan.apps.length > 0 && (
                  <div className="mt-8 border-t pt-6">
                    <p className="font-semibold text-gray-900 mb-4">{labels.appsIncluded}</p>
                    <ul className="space-y-2">
                      {plan.apps.map((app, i) => (
                        <li key={i} className="text-gray-600 text-sm">
                          {i === 0 ? <strong>{app}</strong> : `• ${app}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* New Apps (for full plan) */}
                {plan.newApps && plan.newApps.length > 0 && (
                  <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    {plan.newApps.map((app, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {app}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}