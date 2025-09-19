'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CreditCard,
  Package,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  TrendingUp,
  Shield,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '@/lib/stripe-config';
import { toast } from 'react-hot-toast';

interface SubscriptionDetails {
  id: string;
  tier: SubscriptionTier;
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd?: string;
}

interface UsageStats {
  worksheetsGenerated: number;
  worksheetsLimit: number;
  downloadsThisMonth: number;
  downloadsLimit: number;
  generatorsAccessed: number;
  generatorsLimit: number;
}

export default function BillingDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refreshUser } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    // Check for success/cancel params
    if (searchParams.get('success') === 'true') {
      toast.success('Payment successful! Your subscription is now active.');
      refreshUser();
      // Remove query params
      router.replace('/dashboard/billing');
    } else if (searchParams.get('cancelled') === 'true') {
      toast.error('Payment cancelled. You can try again anytime.');
      router.replace('/dashboard/billing');
    }

    fetchSubscriptionDetails();
    fetchUsageStats();
  }, [searchParams]);

  const fetchSubscriptionDetails = async () => {
    try {
      const response = await fetch('/api/stripe/subscription');
      if (response.ok) {
        const data = await response.json();
        if (data.status !== 'inactive') {
          setSubscription(data);
        }
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsageStats = async () => {
    // In a real app, this would fetch from your API
    // For now, we'll use mock data
    const tier = user?.subscriptionTier?.toUpperCase() as SubscriptionTier || 'FREE';
    const limits = SUBSCRIPTION_TIERS[tier].limits;
    
    setUsage({
      worksheetsGenerated: 7,
      worksheetsLimit: -1, // Unlimited for all tiers
      downloadsThisMonth: tier === 'FREE' ? 3 : 45,
      downloadsLimit: limits.monthlyDownloads,
      generatorsAccessed: tier === 'FREE' ? 5 : tier === 'CORE' ? 20 : 33,
      generatorsLimit: limits.generators,
    });
  };

  const handlePortalAccess = async () => {
    setPortalLoading(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to access billing portal');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      console.error('Portal error:', error);
      toast.error(error.message || 'Failed to access billing portal');
      setPortalLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
      return;
    }

    try {
      const response = await fetch('/api/stripe/subscription', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      const data = await response.json();
      toast.success(data.message);
      fetchSubscriptionDetails();
      refreshUser();
    } catch (error) {
      console.error('Cancel error:', error);
      toast.error('Failed to cancel subscription');
    }
  };

  const handleReactivate = async () => {
    try {
      const response = await fetch('/api/stripe/subscription', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reactivate' }),
      });

      if (!response.ok) {
        throw new Error('Failed to reactivate subscription');
      }

      toast.success('Subscription reactivated successfully!');
      fetchSubscriptionDetails();
      refreshUser();
    } catch (error) {
      console.error('Reactivate error:', error);
      toast.error('Failed to reactivate subscription');
    }
  };

  const currentTier = subscription?.tier || user?.subscriptionTier?.toUpperCase() || 'FREE';
  const tierInfo = SUBSCRIPTION_TIERS[currentTier as SubscriptionTier];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      trial: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
      past_due: { color: 'bg-red-100 text-red-800', icon: XCircle },
      cancelled: { color: 'bg-gray-100 text-gray-800', icon: XCircle },
      inactive: { color: 'bg-gray-100 text-gray-600', icon: AlertCircle },
    };

    const badge = badges[status as keyof typeof badges] || badges.inactive;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
        <Icon className="h-4 w-4 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Billing & Subscription</h1>

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Current Plan: {tierInfo.name}
            </h2>
            <p className="text-gray-600">{tierInfo.description}</p>
          </div>
          {subscription && getStatusBadge(subscription.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Package className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Plan</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{tierInfo.name}</p>
            <p className="text-sm text-gray-600">
              ${tierInfo.price}{tierInfo.price > 0 ? '/month' : ''}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Billing Period</span>
            </div>
            {subscription ? (
              <>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(subscription.currentPeriodEnd)}
                </p>
                <p className="text-sm text-gray-600">
                  {subscription.cancelAtPeriodEnd ? 'Cancels on' : 'Renews on'}
                </p>
              </>
            ) : (
              <p className="text-lg font-semibold text-gray-900">No active subscription</p>
            )}
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <CreditCard className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Payment Method</span>
            </div>
            {user?.stripeCustomerId ? (
              <>
                <p className="text-lg font-semibold text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/24</p>
              </>
            ) : (
              <p className="text-lg font-semibold text-gray-900">No payment method</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {currentTier === 'FREE' ? (
            <button
              onClick={() => router.push('/pricing')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Upgrade Plan
            </button>
          ) : (
            <>
              {user?.stripeCustomerId && (
                <button
                  onClick={handlePortalAccess}
                  disabled={portalLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {portalLoading ? (
                    <RefreshCw className="h-4 w-4 inline mr-2 animate-spin" />
                  ) : (
                    <ExternalLink className="h-4 w-4 inline mr-2" />
                  )}
                  Manage Billing
                </button>
              )}
              
              {subscription?.cancelAtPeriodEnd ? (
                <button
                  onClick={handleReactivate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 inline mr-2" />
                  Reactivate Subscription
                </button>
              ) : (
                currentTier !== 'FULL' && (
                  <button
                    onClick={() => router.push('/pricing')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <TrendingUp className="h-4 w-4 inline mr-2" />
                    Upgrade Plan
                  </button>
                )
              )}
              
              {subscription && !subscription.cancelAtPeriodEnd && (
                <button
                  onClick={handleCancelSubscription}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Cancel Subscription
                </button>
              )}
            </>
          )}
        </div>

        {subscription?.cancelAtPeriodEnd && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-800">
                  Your subscription is scheduled to cancel on {formatDate(subscription.currentPeriodEnd)}.
                  You'll retain access to all features until then.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Usage Statistics */}
      {usage && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Usage This Month</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Downloads</span>
                <span className="text-sm text-gray-500">
                  {usage.downloadsLimit === -1 
                    ? 'Unlimited' 
                    : `${usage.downloadsThisMonth} / ${usage.downloadsLimit}`
                  }
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: usage.downloadsLimit === -1 
                      ? '100%' 
                      : `${Math.min(100, (usage.downloadsThisMonth / usage.downloadsLimit) * 100)}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Generators Access</span>
                <span className="text-sm text-gray-500">
                  {usage.generatorsLimit === -1 
                    ? 'All 33+' 
                    : `${usage.generatorsAccessed} / ${usage.generatorsLimit}`
                  }
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: usage.generatorsLimit === -1 
                      ? '100%' 
                      : `${Math.min(100, (usage.generatorsAccessed / usage.generatorsLimit) * 100)}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Worksheets Generated</span>
                <span className="text-sm text-gray-500">
                  {usage.worksheetsGenerated}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plan Features */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Plan Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tierInfo.features.map((feature, idx) => (
            <div key={idx} className="flex items-start">
              <Shield className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {currentTier !== 'FULL' && (
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-4">
              Upgrade to unlock more features:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTier === 'FREE' && SUBSCRIPTION_TIERS.CORE.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-start opacity-60">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
              {(currentTier === 'FREE' || currentTier === 'CORE') && 
                SUBSCRIPTION_TIERS.FULL.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-start opacity-60">
                  <TrendingUp className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}