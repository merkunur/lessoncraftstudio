'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import {
  CreditCard,
  Check,
  X,
  Crown,
  Zap,
  Users,
  Download,
  Globe,
  Shield,
  HeadphonesIcon,
  ArrowRight,
  AlertCircle,
  Calendar,
} from 'lucide-react';

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      name: 'Free',
      id: 'free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out LessonCraftStudio',
      features: [
        '5 worksheet generators',
        '50 monthly exports',
        'Basic image library',
        'Community support',
        'PDF & image downloads',
      ],
      notIncluded: [
        'Advanced generators',
        'Priority support',
        'Custom branding',
        'API access',
      ],
      current: user?.subscriptionTier === 'free',
    },
    {
      name: 'Core',
      id: 'core',
      price: '$9.99',
      period: 'per month',
      description: 'Great for teachers and parents',
      features: [
        '15 worksheet generators',
        '500 monthly exports',
        'Enhanced image library',
        'Priority email support',
        'PDF & image downloads',
        'Remove watermarks',
        'Save templates',
      ],
      notIncluded: [
        'All generators',
        'Phone support',
        'API access',
      ],
      current: user?.subscriptionTier === 'core',
      popular: true,
    },
    {
      name: 'Full',
      id: 'full',
      price: '$19.99',
      period: 'per month',
      description: 'For schools and professional educators',
      features: [
        'All 33 worksheet generators',
        'Unlimited exports',
        'Full image library access',
        'Premium support (phone & email)',
        'PDF & image downloads',
        'Remove watermarks',
        'Save unlimited templates',
        'Custom branding options',
        'API access',
        'Team collaboration',
      ],
      notIncluded: [],
      current: user?.subscriptionTier === 'full',
    },
  ];

  const currentPlan = plans.find(p => p.current);

  const handleUpgrade = (planId: string) => {
    setIsLoading(true);
    // TODO: Implement Stripe checkout
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Subscription & Billing
          </h2>
          <p className="mt-2 text-gray-600">
            Manage your subscription and billing preferences
          </p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Current Plan
                </h3>
                <div className="mt-2 flex items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    {currentPlan?.name}
                  </span>
                  {currentPlan?.id !== 'free' && (
                    <span className="ml-3 px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {currentPlan?.description}
                </p>
                
                {user?.subscription && user.subscription.currentPeriodEnd && (
                  <div className="mt-4 flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next billing date: {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
                  </div>
                )}
              </div>
              
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                {currentPlan?.id !== 'free' && (
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Manage Billing
                  </button>
                )}
              </div>
            </div>

            {/* Usage Stats */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Usage This Month</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-sm text-gray-600">Worksheets Created</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-900">0</div>
                  <div className="text-xs text-gray-500">Unlimited</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Exports Used</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-900">
                    0 / {currentPlan?.id === 'full' ? '∞' : currentPlan?.id === 'core' ? '500' : '50'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {currentPlan?.id === 'full' ? 'Unlimited' : 'Monthly limit'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Generators Available</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-900">
                    {currentPlan?.id === 'full' ? '33' : currentPlan?.id === 'core' ? '15' : '5'}
                  </div>
                  <div className="text-xs text-gray-500">Active generators</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Available Plans</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg shadow-sm border ${
                  plan.current
                    ? 'border-blue-500 ring-2 ring-blue-500'
                    : 'border-gray-200'
                } bg-white p-6`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {plan.current && (
                  <div className="absolute -top-3 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Current Plan
                    </span>
                  </div>
                )}

                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{plan.name}</h4>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-base font-medium text-gray-500">/{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{plan.description}</p>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="ml-3 text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <X className="flex-shrink-0 h-5 w-5 text-gray-400" />
                        <span className="ml-3 text-sm text-gray-500 line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {plan.current ? (
                      <button
                        disabled
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
                      >
                        Current Plan
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={isLoading}
                        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                          plan.popular
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-800 hover:bg-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
                      >
                        {plan.price === '$0' ? 'Downgrade' : 'Upgrade'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Can I cancel anytime?</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">What payment methods do you accept?</h4>
                <p className="mt-1 text-sm text-gray-600">
                  We accept all major credit cards, debit cards, and PayPal through our secure payment processor Stripe.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Can I change plans later?</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Do you offer discounts for schools?</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Yes, we offer special pricing for schools and educational institutions. Contact our support team for more information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Have questions about pricing or need help choosing a plan?
          </p>
          <Link
            href="/support"
            className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <HeadphonesIcon className="h-4 w-4 mr-1" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}