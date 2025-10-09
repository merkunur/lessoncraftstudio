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
  TrendingUp,
  Shield,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '@/lib/stripe-config';
import { toast } from 'react-hot-toast';
import { PaymentMethodManager } from '@/components/billing/PaymentMethodManager';
import { InvoiceList } from '@/components/billing/InvoiceList';
import { PlanUpgradeModal } from '@/components/billing/PlanUpgradeModal';

interface SubscriptionDetails {
  id: string;
  tier: SubscriptionTier;
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  // trialEnd removed - no trials offered
}


export default function BillingDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, checkAuth } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    // Check for success/cancel params
    if (searchParams.get('success') === 'true') {
      toast.success('Payment successful! Your subscription is now active.');
      checkAuth();
      // Remove query params
      router.replace('/en/dashboard/billing');
    } else if (searchParams.get('cancelled') === 'true') {
      toast.error('Payment cancelled. You can try again anytime.');
      router.replace('/en/dashboard/billing');
    }

    fetchSubscriptionDetails();
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
      checkAuth();
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
      checkAuth();
    } catch (error) {
      console.error('Reactivate error:', error);
      toast.error('Failed to reactivate subscription');
    }
  };

  const handleUpgradeClick = () => {
    if (currentTier === 'FREE') {
      // Free users go to pricing page
      router.push('/en/pricing');
    } else {
      // Paid users see upgrade modal
      setShowUpgradeModal(true);
    }
  };

  const handleUpgradeSuccess = () => {
    fetchSubscriptionDetails();
    checkAuth();
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
              <span className="text-sm font-medium">Status</span>
            </div>
            {subscription ? (
              <>
                <p className="text-lg font-semibold text-gray-900">Active</p>
                <p className="text-sm text-gray-600">
                  {subscription.cancelAtPeriodEnd ? 'Ends' : 'Renews'} {formatDate(subscription.currentPeriodEnd)}
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-900">Inactive</p>
                <p className="text-sm text-gray-600">No active subscription</p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {currentTier === 'FREE' ? (
            <button
              onClick={handleUpgradeClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Upgrade Plan
            </button>
          ) : (
            <>
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
                    onClick={handleUpgradeClick}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <TrendingUp className="h-4 w-4 inline mr-2" />
                    Change Plan
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

              {user?.stripeCustomerId && (
                <button
                  onClick={handlePortalAccess}
                  disabled={portalLoading}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {portalLoading ? (
                    <RefreshCw className="h-4 w-4 inline mr-2 animate-spin" />
                  ) : (
                    <ExternalLink className="h-4 w-4 inline mr-2" />
                  )}
                  Stripe Portal
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

      {/* Payment Methods */}
      {user?.stripeCustomerId && <PaymentMethodManager />}

      {/* Invoice History */}
      {user?.stripeCustomerId && (
        <div className="mt-8">
          <InvoiceList />
        </div>
      )}

      {/* Plan Features */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
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

      {/* Upgrade Modal */}
      {showUpgradeModal && subscription && (
        <PlanUpgradeModal
          currentTier={currentTier as SubscriptionTier}
          currentBillingInterval={subscription.tier === 'FREE' ? 'monthly' : (subscription as any).billingInterval || 'monthly'}
          onClose={() => setShowUpgradeModal(false)}
          onSuccess={handleUpgradeSuccess}
        />
      )}
    </div>
  );
}