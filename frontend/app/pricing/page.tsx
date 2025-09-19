'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Zap, Star, Rocket } from 'lucide-react';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (tier: 'CORE' | 'FULL') => {
    if (!user) {
      router.push('/auth/signin?redirect=/pricing');
      return;
    }

    setLoading(tier);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast.error(error.message || 'Failed to start subscription');
      setLoading(null);
    }
  };

  const tiers = [
    {
      id: 'FREE',
      name: 'Free',
      icon: <Zap className="h-8 w-8" />,
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our platform',
      features: SUBSCRIPTION_TIERS.FREE.features,
      notIncluded: [
        'Premium templates',
        'Priority support',
        'No watermarks',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      id: 'CORE',
      name: 'Core Bundle',
      icon: <Star className="h-8 w-8" />,
      price: '$9.99',
      period: 'per month',
      description: 'Ideal for regular classroom use',
      features: SUBSCRIPTION_TIERS.CORE.features,
      notIncluded: [
        'Access to all 33+ generators',
        'Custom branding',
        'API access',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      popular: true,
    },
    {
      id: 'FULL',
      name: 'Full Access',
      icon: <Rocket className="h-8 w-8" />,
      price: '$19.99',
      period: 'per month',
      description: 'Everything you need for professional use',
      features: SUBSCRIPTION_TIERS.FULL.features,
      notIncluded: [],
      cta: 'Start Free Trial',
      highlighted: false,
    },
  ];

  const currentTier = user?.subscriptionTier?.toUpperCase() || 'FREE';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock premium features and create unlimited educational worksheets
            for your classroom or homeschool.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => {
            const isCurrentPlan = currentTier === tier.id;
            const canUpgrade = 
              (currentTier === 'FREE' && tier.id !== 'FREE') ||
              (currentTier === 'CORE' && tier.id === 'FULL');

            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-8 ${
                  tier.highlighted
                    ? 'bg-white shadow-2xl ring-2 ring-blue-500'
                    : 'bg-white shadow-lg'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon and Title */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-blue-500 mb-2">{tier.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {tier.name}
                    </h3>
                  </div>
                  {isCurrentPlan && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Current Plan
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-gray-500 ml-2">/{tier.period}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{tier.description}</p>

                {/* Features */}
                <div className="mb-8 space-y-3">
                  <p className="font-semibold text-gray-900 mb-2">Includes:</p>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {tier.notIncluded.length > 0 && (
                    <>
                      <div className="border-t pt-3 mt-3" />
                      {tier.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start opacity-50">
                          <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500 text-sm">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* CTA Button */}
                {tier.id === 'FREE' ? (
                  user ? (
                    <button
                      disabled
                      className="w-full py-3 px-4 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                    >
                      {isCurrentPlan ? 'Your Current Plan' : 'Always Free'}
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push('/auth/signup')}
                      className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                    >
                      {tier.cta}
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => handleSubscribe(tier.id as 'CORE' | 'FULL')}
                    disabled={loading === tier.id || isCurrentPlan || !canUpgrade}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isCurrentPlan
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : canUpgrade
                        ? tier.highlighted
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {loading === tier.id
                      ? 'Processing...'
                      : isCurrentPlan
                      ? 'Your Current Plan'
                      : canUpgrade
                      ? tier.cta
                      : 'Not Available'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. You'll continue
                to have access until the end of your billing period.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee. If you're not satisfied,
                contact us within 7 days for a full refund.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can upgrade or downgrade your plan at any time.
                Changes take effect at the start of your next billing cycle.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is my payment information secure?
              </h3>
              <p className="text-gray-600">
                Yes, all payments are processed securely through Stripe. We never
                store your credit card information on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Trusted by over 10,000 educators worldwide
          </p>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-gray-400">
              <svg className="h-8 w-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <span className="text-xs">Secure</span>
            </div>
            <div className="text-gray-400">
              <svg className="h-8 w-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-xs">Verified</span>
            </div>
            <div className="text-gray-400">
              <svg className="h-8 w-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
              </svg>
              <span className="text-xs">Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}