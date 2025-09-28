'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  popular?: string;
}

interface PricingSectionProps {
  plans: Plan[];
  billingToggle: {
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
  locale: string;
}

export default function PricingSection({
  plans,
  billingToggle,
  labels,
  locale
}: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);

  const getDisplayPrice = (plan: Plan) => {
    if (isYearly && plan.yearlyPrice) {
      // Convert monthly to yearly (multiply by 12 and apply 20% discount)
      const monthlyAmount = parseInt(plan.price.replace('$', ''));
      const yearlyAmount = monthlyAmount * 12 * 0.8; // 20% discount
      return `$${yearlyAmount}`;
    }
    return plan.price;
  };

  const getPeriod = (plan: Plan) => {
    if (isYearly && plan.yearlyPrice) {
      return labels.perYear;
    }
    return plan.period;
  };

  return (
    <>
      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <BillingToggle
          monthlyLabel={billingToggle.monthly}
          yearlyLabel={billingToggle.yearly}
          yearlyDiscount={billingToggle.yearlyDiscount}
          onToggle={setIsYearly}
        />
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isPremium = index === 2; // Full access plan
            const isCore = index === 1; // Core bundle

            return (
              <div
                key={plan.name}
                className={`rounded-2xl ${
                  isPremium
                    ? 'border-2 border-blue-600 shadow-xl relative'
                    : 'border border-gray-200'
                } bg-white p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {plan.popular}
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{getDisplayPrice(plan)}</span>
                  <span className="text-gray-500">{getPeriod(plan)}</span>
                  {!isYearly && plan.yearlyPrice && (
                    <p className="text-sm text-gray-500 mt-2">
                      {labels.orYearly} {plan.yearlyPrice}{labels.perYear}
                    </p>
                  )}
                </div>

                {/* Features */}
                {plan.features && plan.features.length > 0 && (
                  <>
                    <p className="font-semibold text-gray-900 mb-3">{labels.whatsIncluded}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Apps */}
                {plan.apps && plan.apps.length > 0 && (
                  <>
                    <p className="font-semibold text-gray-900 mb-3">{labels.appsIncluded}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.apps.map((app, i) => (
                        <li key={i} className="text-gray-600 text-sm">
                          {i === 0 ? <strong>{app}</strong> : `• ${app}`}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* New Apps (for full plan) */}
                {plan.newApps && plan.newApps.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    {plan.newApps.map((app, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {app}
                      </p>
                    ))}
                  </div>
                )}

                {/* Limitations */}
                {plan.limitations && plan.limitations.length > 0 && (
                  <>
                    <p className="font-semibold text-gray-900 mb-3">{labels.limitations}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.limitations.map((limitation, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-gray-500 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Link
                  href={index === 0 ? `/${locale}/auth/signup` : `/${locale}/auth/signup?plan=${index === 1 ? 'core' : 'full'}`}
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isPremium
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : isCore
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}