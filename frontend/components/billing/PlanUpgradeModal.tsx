'use client';

import { useState, useEffect } from 'react';
import { X, TrendingUp, AlertCircle } from 'lucide-react';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '@/lib/stripe-config';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface PlanUpgradeModalProps {
  currentTier: SubscriptionTier;
  currentBillingInterval: 'monthly' | 'yearly';
  onClose: () => void;
  onSuccess: () => void;
}

interface ProrationPreview {
  currentPlan: {
    tier: SubscriptionTier;
    billingInterval: string;
  };
  newPlan: {
    tier: SubscriptionTier;
    billingInterval: string;
  };
  proration: {
    changeType: 'upgrade' | 'downgrade';
    immediateCharge: number;
    tax: number;
    subtotal: number;
    description: string;
  };
}

export function PlanUpgradeModal({
  currentTier,
  currentBillingInterval,
  onClose,
  onSuccess,
}: PlanUpgradeModalProps) {
  const t = useTranslations('billing');
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(currentTier);
  const [selectedInterval, setSelectedInterval] = useState<'monthly' | 'yearly'>(currentBillingInterval);
  const [preview, setPreview] = useState<ProrationPreview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Load preview when selection changes
    if (selectedTier !== currentTier || selectedInterval !== currentBillingInterval) {
      loadPreview();
    }
  }, [selectedTier, selectedInterval]);

  const loadPreview = async () => {
    setLoadingPreview(true);
    try {
      const response = await fetch('/api/stripe/subscription/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          billingInterval: selectedInterval,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to load preview');
      }

      const data = await response.json();
      setPreview(data);
    } catch (error: any) {
      console.error('Preview error:', error);
      toast.error(error.message || 'Failed to load preview');
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleUpgrade = async () => {
    if (!preview) return;

    setProcessing(true);
    try {
      const response = await fetch('/api/stripe/subscription', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_plan',
          tier: selectedTier,
          billingInterval: selectedInterval,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to change plan');
      }

      const data = await response.json();
      toast.success(data.message || 'Plan changed successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Upgrade error:', error);
      toast.error(error.message || 'Failed to change plan');
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'usd',
    }).format(amount);
  };

  const availableTiers: SubscriptionTier[] = currentTier === 'FREE'
    ? ['CORE', 'FULL']
    : currentTier === 'CORE'
    ? ['FULL']
    : [];

  const canChangePlan = selectedTier !== currentTier || selectedInterval !== currentBillingInterval;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{t('upgradeModal.title')}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Plan */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">{t('upgradeModal.currentPlan')}</p>
            <p className="text-lg font-semibold text-gray-900">
              {t(`tiers.${currentTier}.name`)} ({t(`upgradeModal.${currentBillingInterval}`)})
            </p>
          </div>

          {/* Tier Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('upgradeModal.selectTier')}
            </label>
            <div className="grid grid-cols-1 gap-3">
              {availableTiers.map((tier) => {
                const tierInfo = SUBSCRIPTION_TIERS[tier];
                const isSelected = selectedTier === tier;

                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`text-left border-2 rounded-lg p-4 transition-colors ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{t(`tiers.${tier}.name`)}</h3>
                        <p className="text-sm text-gray-600 mt-1">{t(`tiers.${tier}.description`)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${tierInfo.price}</p>
                        <p className="text-sm text-gray-600">{t('upgradeModal.perMonth')}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Billing Interval */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('upgradeModal.billingInterval')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedInterval('monthly')}
                className={`border-2 rounded-lg p-4 transition-colors ${
                  selectedInterval === 'monthly'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">{t('upgradeModal.monthly')}</p>
                <p className="text-sm text-gray-600 mt-1">{t('upgradeModal.payMonthly')}</p>
              </button>
              <button
                onClick={() => setSelectedInterval('yearly')}
                className={`border-2 rounded-lg p-4 transition-colors ${
                  selectedInterval === 'yearly'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">{t('upgradeModal.yearly')}</p>
                <p className="text-sm text-gray-600 mt-1">{t('upgradeModal.savePercent')}</p>
              </button>
            </div>
          </div>

          {/* Proration Preview */}
          {canChangePlan && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              {loadingPreview ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full" />
                  <span className="ml-2 text-gray-600">{t('upgradeModal.calculating')}</span>
                </div>
              ) : preview ? (
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 mb-2">
                        {preview.proration.changeType === 'upgrade' ? t('upgradeModal.upgradePreview') : t('upgradeModal.changePreview')}
                      </p>
                      <p className="text-sm text-blue-800 mb-3">
                        {preview.proration.description}
                      </p>

                      <div className="space-y-2 bg-white rounded p-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('upgradeModal.subtotal')}</span>
                          <span className="text-gray-900">{formatCurrency(preview.proration.subtotal)}</span>
                        </div>
                        {preview.proration.tax > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('upgradeModal.tax')}</span>
                            <span className="text-gray-900">{formatCurrency(preview.proration.tax)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold pt-2 border-t">
                          <span className="text-gray-900">
                            {preview.proration.immediateCharge >= 0 ? t('upgradeModal.dueToday') : t('upgradeModal.creditApplied')}
                          </span>
                          <span className="text-gray-900">
                            {formatCurrency(Math.abs(preview.proration.immediateCharge))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              disabled={processing}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {t('upgradeModal.cancel')}
            </button>
            <button
              onClick={handleUpgrade}
              disabled={!canChangePlan || processing || loadingPreview}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {processing ? t('upgradeModal.processing') : canChangePlan ? t('upgradeModal.confirmChange') : t('upgradeModal.selectDifferentPlan')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
