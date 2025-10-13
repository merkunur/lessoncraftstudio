'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, AlertTriangle } from 'lucide-react';

interface CancelSubscriptionModalProps {
  onConfirm: () => Promise<void>;
  onClose: () => void;
  currentPeriodEnd?: string;
}

export function CancelSubscriptionModal({
  onConfirm,
  onClose,
  currentPeriodEnd,
}: CancelSubscriptionModalProps) {
  const t = useTranslations('billing.cancelModal');
  const [isProcessing, setIsProcessing] = useState(false);

  // Log when modal is mounted
  console.log('🟡 CancelSubscriptionModal: Modal mounted');
  console.log('🟡 CancelSubscriptionModal: currentPeriodEnd:', currentPeriodEnd);
  console.log('🟡 CancelSubscriptionModal: onConfirm type:', typeof onConfirm);
  console.log('🟡 CancelSubscriptionModal: onClose type:', typeof onClose);

  const handleConfirm = async () => {
    console.log('🟡 CancelSubscriptionModal: Confirm button clicked');
    setIsProcessing(true);
    console.log('🟡 CancelSubscriptionModal: Processing state set to true');
    try {
      console.log('🟡 CancelSubscriptionModal: Calling onConfirm handler...');
      await onConfirm();
      console.log('🟡 CancelSubscriptionModal: onConfirm completed successfully, closing modal');
      onClose();
    } catch (error) {
      console.error('🟡 CancelSubscriptionModal: onConfirm failed with error:', error);
      // Error handling is done in the parent component
      setIsProcessing(false);
      console.log('🟡 CancelSubscriptionModal: Processing state set to false after error');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t('title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isProcessing}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            {t('description')}
          </p>

          {currentPeriodEnd && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>{t('accessUntil')}:</strong> {formatDate(currentPeriodEnd)}
              </p>
              <p className="text-sm text-yellow-700 mt-2">
                {t('accessNote')}
              </p>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-2">
              <strong>{t('whatHappens')}</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>{t('point1')}</li>
              <li>{t('point2')}</li>
              <li>{t('point3')}</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {t('keepSubscription')}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? t('processing') : t('confirmCancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
