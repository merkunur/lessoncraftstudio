'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
import { CancelSubscriptionModal } from '@/components/billing/CancelSubscriptionModal';
import PaymentHistory from '@/components/dashboard/PaymentHistory';

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
  const t = useTranslations('billing');
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Get current locale from URL
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || 'en' : 'en';

  useEffect(() => {
    // Check for success/cancel params
    if (searchParams.get('success') === 'true') {
      toast.success(t('messages.paymentSuccess'));
      checkAuth();
      // Remove query params
      router.replace(`/${locale}/dashboard/billing`);
    } else if (searchParams.get('cancelled') === 'true') {
      toast.error(t('messages.paymentCancelled'));
      router.replace(`/${locale}/dashboard/billing`);
    }

    // Refresh user context and fetch subscription details
    checkAuth();
    fetchSubscriptionDetails();
  }, [searchParams]);

  const fetchSubscriptionDetails = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/stripe/subscription', {
        headers: token ? {
          'Authorization': `Bearer ${token}`,
        } : {},
      });
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
        throw new Error(error.error || t('messages.portalAccessFailed'));
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      console.error('Portal error:', error);
      toast.error(error.message || t('messages.portalAccessFailed'));
      setPortalLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    console.log('🔴 handleCancelSubscription: Starting cancellation process');
    console.log('🔴 Current subscription data:', JSON.stringify(subscription, null, 2));
    console.log('🔴 Current user stripeCustomerId:', user?.stripeCustomerId);

    try {
      console.log('🔴 Making DELETE request to /api/stripe/subscription...');
      const response = await fetch('/api/stripe/subscription', {
        method: 'DELETE',
      });

      console.log('📡 Response received - Status:', response.status);
      console.log('📡 Response ok?:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Cancel failed - Error response:', errorData);
        throw new Error(t('messages.cancelFailed'));
      }

      const data = await response.json();
      console.log('✅ Subscription cancelled successfully:', data);
      toast.success(data.message);
      fetchSubscriptionDetails();
      checkAuth();
    } catch (error) {
      console.error('❌ Cancel error - Full error object:', error);
      console.error('❌ Cancel error - Error message:', (error as Error).message);
      console.error('❌ Cancel error - Error stack:', (error as Error).stack);
      toast.error(t('messages.cancelFailed'));
      throw error; // Re-throw to let modal handle error state
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
        throw new Error(t('messages.reactivateFailed'));
      }

      toast.success(t('messages.reactivateSuccess'));
      fetchSubscriptionDetails();
      checkAuth();
    } catch (error) {
      console.error('Reactivate error:', error);
      toast.error(t('messages.reactivateFailed'));
    }
  };

  const handleUpgradeClick = () => {
    console.log('🔵 Change plan button clicked');
    console.log('Current tier:', currentTier);

    if (currentTier === 'FREE') {
      // Free users go to pricing page
      console.log('➡️ Redirecting to pricing page...');
      router.push(`/${locale}/pricing`);
    } else {
      // Paid users see upgrade modal
      console.log('🎯 Opening upgrade modal...');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('pageTitle')}</h1>

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t('currentPlanTitle', { plan: t(`tiers.${currentTier}.name`) })}
            </h2>
            <p className="text-gray-600">{t(`tiers.${currentTier}.description`)}</p>
          </div>
          {subscription && getStatusBadge(subscription.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Package className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{t('planCard.title')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{t(`tiers.${currentTier}.name`)}</p>
            <p className="text-sm text-gray-600">
              ${tierInfo.price}{tierInfo.price > 0 ? t('planCard.perMonth') : ''}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{t('billingPeriodCard.title')}</span>
            </div>
            {subscription ? (
              <>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(subscription.currentPeriodEnd)}
                </p>
                <p className="text-sm text-gray-600">
                  {subscription.cancelAtPeriodEnd ? t('billingPeriodCard.cancelsOn') : t('billingPeriodCard.renewsOn')}
                </p>
              </>
            ) : (
              <p className="text-lg font-semibold text-gray-900">{t('billingPeriodCard.noActiveSubscription')}</p>
            )}
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <CreditCard className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{t('statusCard.title')}</span>
            </div>
            {subscription ? (
              <>
                <p className="text-lg font-semibold text-gray-900">{t('statusCard.active')}</p>
                <p className="text-sm text-gray-600">
                  {subscription.cancelAtPeriodEnd ? t('statusCard.ends') : t('statusCard.renews')} {formatDate(subscription.currentPeriodEnd)}
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-900">{t('statusCard.inactive')}</p>
                <p className="text-sm text-gray-600">{t('statusCard.noSubscription')}</p>
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
              {t('actions.upgradePlan')}
            </button>
          ) : (
            <>
              {subscription?.cancelAtPeriodEnd ? (
                <button
                  onClick={handleReactivate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 inline mr-2" />
                  {t('actions.reactivateSubscription')}
                </button>
              ) : (
                currentTier !== 'FULL' && subscription?.status !== 'manual' && (
                  <button
                    onClick={handleUpgradeClick}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <TrendingUp className="h-4 w-4 inline mr-2" />
                    {t('actions.changePlan')}
                  </button>
                )
              )}

              {/* Only show cancel button for real Stripe subscriptions, not manual ones */}
              {subscription && !subscription.cancelAtPeriodEnd && subscription.status !== 'manual' && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  {t('actions.cancelSubscription')}
                </button>
              )}

              {/* Only show Stripe Portal for real Stripe customers, not mock ones */}
              {user?.stripeCustomerId && !user.stripeCustomerId.startsWith('cus_mock_') && subscription?.status !== 'manual' && (
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
                  {t('actions.stripePortal')}
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
                  {t('messages.cancelWarning', { date: formatDate(subscription.currentPeriodEnd) })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Methods - only for real Stripe customers */}
      {user?.stripeCustomerId && !user.stripeCustomerId.startsWith('cus_mock_') && <PaymentMethodManager />}

      {/* Invoice History - only for real Stripe customers */}
      {user?.stripeCustomerId && !user.stripeCustomerId.startsWith('cus_mock_') && (
        <div className="mt-8">
          <InvoiceList />
        </div>
      )}

      {/* Payment History - only for real Stripe customers */}
      {user?.stripeCustomerId && !user.stripeCustomerId.startsWith('cus_mock_') && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('paymentHistory.title')}</h2>
          <PaymentHistory />
        </div>
      )}

      {/* Plan Features */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('features.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.raw(`tiers.${currentTier}.features`) && (t.raw(`tiers.${currentTier}.features`) as string[]).map((feature: string, idx: number) => (
            <div key={idx} className="flex items-start">
              <Shield className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {currentTier !== 'FULL' && (
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-4">
              {t('features.upgradePrompt')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTier === 'FREE' && t.raw('tiers.CORE.features') && (t.raw('tiers.CORE.features') as string[]).slice(0, 3).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start opacity-60">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
              {(currentTier === 'FREE' || currentTier === 'CORE') &&
                t.raw('tiers.FULL.features') && (t.raw('tiers.FULL.features') as string[]).slice(0, 3).map((feature: string, idx: number) => (
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

      {/* Cancel Subscription Modal */}
      {showCancelModal && subscription && (
        <CancelSubscriptionModal
          onConfirm={handleCancelSubscription}
          onClose={() => setShowCancelModal(false)}
          currentPeriodEnd={subscription.currentPeriodEnd}
        />
      )}
    </div>
  );
}