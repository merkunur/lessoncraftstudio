'use client';

import { useState } from 'react';
import { X, Check, TrendingUp, Zap } from 'lucide-react';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '@/lib/stripe-config';
import { toast } from 'react-hot-toast';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: SubscriptionTier;
  onUpgrade: (tier: SubscriptionTier) => void;
}

export default function UpgradeModal({
  isOpen,
  onClose,
  currentTier,
  onUpgrade,
}: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);

  if (!isOpen) return null;

  const availableUpgrades = Object.entries(SUBSCRIPTION_TIERS).filter(
    ([key]) => {
      if (currentTier === 'FREE') return key !== 'FREE';
      if (currentTier === 'CORE') return key === 'FULL';
      return false;
    }
  );

  const handleUpgrade = async () => {
    if (!selectedTier) {
      toast.error('Please select a plan');
      return;
    }

    setLoading(true);
    try {
      // For immediate upgrade (not using checkout for existing customers)
      const response = await fetch('/api/stripe/subscription', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upgrade',
          tier: selectedTier,
        }),
      });

      if (!response.ok) {
        throw new Error('Upgrade failed');
      }

      toast.success('Subscription upgraded successfully!');
      onUpgrade(selectedTier);
      onClose();
    } catch (error) {
      console.error('Upgrade error:', error);
      toast.error('Failed to upgrade subscription');
    } finally {
      setLoading(false);
    }
  };

  const calculateProration = (newTier: SubscriptionTier) => {
    // Simple proration calculation example
    const currentPrice = SUBSCRIPTION_TIERS[currentTier].price;
    const newPrice = SUBSCRIPTION_TIERS[newTier].price;
    const difference = newPrice - currentPrice;
    return difference;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-2 text-gray-600">
            Choose a plan that fits your needs. You'll be charged the prorated amount immediately.
          </p>
        </div>

        <div className="p-6 space-y-4">
          {availableUpgrades.map(([key, tier]) => {
            const tierKey = key as SubscriptionTier;
            const isSelected = selectedTier === tierKey;
            const proratedAmount = calculateProration(tierKey);

            return (
              <div
                key={key}
                onClick={() => setSelectedTier(tierKey)}
                className={`relative border rounded-lg p-6 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-blue-500 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tier.name}
                    </h3>
                    <p className="text-gray-600 mt-1">{tier.description}</p>

                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">
                        ${tier.price}
                      </span>
                      <span className="text-gray-500 ml-1">/month</span>
                      {proratedAmount > 0 && (
                        <span className="ml-4 text-sm text-green-600">
                          +${proratedAmount.toFixed(2)} today (prorated)
                        </span>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Includes:</p>
                      {tier.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ml-6">
                    {tierKey === 'FULL' ? (
                      <Zap className="h-8 w-8 text-purple-500" />
                    ) : (
                      <TrendingUp className="h-8 w-8 text-blue-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Your card will be charged immediately for the prorated amount.
                Future charges will be on your regular billing date.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpgrade}
                disabled={!selectedTier || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Upgrade Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}