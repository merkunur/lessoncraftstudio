'use client';

import { CreditCard, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    fingerprint: string;
  };
  isDefault: boolean;
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onSetDefault: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  disabled?: boolean;
}

export function PaymentMethodCard({
  paymentMethod,
  onSetDefault,
  onDelete,
  disabled = false,
}: PaymentMethodCardProps) {
  const { id, card, isDefault } = paymentMethod;

  const handleSetDefault = async () => {
    try {
      await onSetDefault(id);
      toast.success('Default payment method updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to set default payment method');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove this payment method?')) {
      return;
    }

    try {
      await onDelete(id);
      toast.success('Payment method removed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove payment method');
    }
  };

  const getBrandIcon = (brand: string) => {
    // You can replace these with actual brand logos
    const brandColors = {
      visa: 'text-blue-600',
      mastercard: 'text-orange-600',
      amex: 'text-green-600',
      discover: 'text-purple-600',
    };

    return brandColors[brand.toLowerCase() as keyof typeof brandColors] || 'text-gray-600';
  };

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between hover:border-gray-400 transition-colors">
      <div className="flex items-center space-x-4">
        <div className={`${getBrandIcon(card.brand)}`}>
          <CreditCard className="h-8 w-8" />
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <p className="font-medium text-gray-900 capitalize">
              {card.brand} •••• {card.last4}
            </p>
            {isDefault && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Default
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Expires {String(card.expMonth).padStart(2, '0')}/{card.expYear}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!isDefault && (
          <button
            onClick={handleSetDefault}
            disabled={disabled}
            className="px-3 py-1.5 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Set as Default
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={disabled || isDefault}
          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={isDefault ? 'Cannot delete default payment method' : 'Remove payment method'}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
