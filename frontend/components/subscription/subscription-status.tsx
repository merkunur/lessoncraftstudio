'use client';

import { useEffect, useState } from 'react';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '@/lib/stripe-config';
import Link from 'next/link';

interface SubscriptionStatusProps {
  compact?: boolean;
  showUpgrade?: boolean;
}

export default function SubscriptionStatus({
  compact = false,
  showUpgrade = true,
}: SubscriptionStatusProps) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/stripe/subscription');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>
    );
  }

  const tier = subscription?.tier || user?.subscriptionTier?.toUpperCase() || 'FREE';
  const tierInfo = SUBSCRIPTION_TIERS[tier as SubscriptionTier];
  const status = subscription?.status || 'inactive';

  const getStatusIcon = () => {
    if (status === 'active' || status === 'trial') {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (status === 'past_due') {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
    return <Shield className="h-4 w-4 text-gray-400" />;
  };

  const getStatusColor = () => {
    if (tier === 'FULL') return 'text-purple-600 bg-purple-50';
    if (tier === 'CORE') return 'text-blue-600 bg-blue-50';
    return 'text-gray-600 bg-gray-50';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor()}`}>
          {tierInfo.name}
        </span>
        {showUpgrade && tier !== 'FULL' && (
          <Link
            href="/pricing"
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Upgrade
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <p className="text-sm text-gray-600">Current Plan</p>
            <p className="font-semibold text-gray-900">{tierInfo.name}</p>
          </div>
        </div>
        
        {showUpgrade && tier !== 'FULL' && (
          <Link
            href="/pricing"
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upgrade
          </Link>
        )}
      </div>

      {subscription?.cancelAtPeriodEnd && (
        <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
          <p className="text-xs text-yellow-800">
            Subscription ends on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
        </div>
      )}

      {status === 'past_due' && (
        <div className="mt-3 p-2 bg-red-50 rounded-lg">
          <p className="text-xs text-red-800">
            Payment failed. Please update your payment method.
          </p>
        </div>
      )}

      {/* Usage summary for non-full plans */}
      {tier !== 'FULL' && (
        <div className="mt-3 pt-3 border-t">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Generators</span>
              <span className="font-medium">
                {tierInfo.limits.generators === -1 ? 'All' : `${tierInfo.limits.generators} available`}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Downloads</span>
              <span className="font-medium">
                {tierInfo.limits.monthlyDownloads === -1 ? 'Unlimited' : `${tierInfo.limits.monthlyDownloads}/month`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}