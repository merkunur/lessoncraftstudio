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

                <Link href={plan.ctaLink}>
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    {plan.cta}
                  </button>
                </Link>

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