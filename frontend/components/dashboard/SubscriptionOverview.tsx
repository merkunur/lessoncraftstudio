'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CreditCard, Calendar, TrendingUp, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';

interface SubscriptionData {
  id: string;
  tier: string;
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export default function SubscriptionOverview() {
  const router = useRouter();
  const t = useTranslations('dashboard.subscription');
  const tTiers = useTranslations('dashboard.tiers');
  const tTierNames = useTranslations('dashboard.tierNames');
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Get current locale from URL
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || 'en' : 'en';

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/stripe/subscription', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status !== 'inactive') {
          setSubscription(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = () => {
    router.push(`/${locale}/dashboard/billing`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const tier = subscription?.tier || 'FREE';
  const tierInfo = SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS];

  const getStatusIcon = () => {
    if (subscription?.status === 'active') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (subscription?.status === 'past_due') {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
    return <Shield className="h-5 w-5 text-gray-400" />;
  };

  const getStatusColor = () => {
    if (subscription?.status === 'active') return 'text-green-600 bg-green-50';
    if (subscription?.status === 'past_due') return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{t('title')}</h2>
          {getStatusIcon()}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Current Plan */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">{t('currentPlan')}</p>
              <h3 className="text-2xl font-bold text-gray-900">{tTierNames(tier.toLowerCase())}</h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
              {subscription?.status || t('free')}
            </div>
          </div>

          {tier !== 'FREE' && subscription ? (
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <CreditCard className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  ${tierInfo.price}{t('perMonth')}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  {subscription.cancelAtPeriodEnd ? t('cancelsOn') : t('renewsOn')}{' '}
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              {tTiers(`${tier.toLowerCase()}.description`)}
            </p>
          )}
        </div>

        {/* Features Summary */}
        <div className="pt-4 border-t">
          <p className="text-sm font-medium text-gray-900 mb-2">{t('whatsIncluded')}</p>
          <ul className="space-y-2">
            {(() => {
              const features = tTiers.raw(`${tier.toLowerCase()}.features`);
              const featureArray = Array.isArray(features) ? features : [];
              return featureArray.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ));
            })()}
          </ul>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t space-y-3">
          {tier !== 'FULL' && (
            <button
              onClick={() => router.push(`/${locale}/pricing`)}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              {t('upgradePlan')}
            </button>
          )}

          {subscription && (
            <button
              onClick={handleManageBilling}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('manageBilling')}
            </button>
          )}
        </div>

        {/* Cancellation Warning */}
        {subscription?.cancelAtPeriodEnd && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              {t('cancelWarning', { date: new Date(subscription.currentPeriodEnd).toLocaleDateString() })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
