'use client';

import { useState, useEffect } from 'react';
import { Plus, CreditCard as CreditCardIcon } from 'lucide-react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { AddPaymentMethodForm } from './AddPaymentMethodForm';
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

export function PaymentMethodManager() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      const response = await fetch('/api/stripe/payment-methods');

      if (!response.ok) {
        if (response.status === 404) {
          // No payment methods yet
          setPaymentMethods([]);
          return;
        }
        throw new Error('Failed to load payment methods');
      }

      const data = await response.json();
      setPaymentMethods(data.paymentMethods || []);
    } catch (error) {
      console.error('Error loading payment methods:', error);
      toast.error('Failed to load payment methods');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (paymentMethodId: string) => {
    setActionLoading(true);
    try {
      const response = await fetch('/api/stripe/payment-methods', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to set default payment method');
      }

      // Reload payment methods to update UI
      await loadPaymentMethods();
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (paymentMethodId: string) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/stripe/payment-methods?id=${paymentMethodId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to remove payment method');
      }

      // Reload payment methods to update UI
      await loadPaymentMethods();
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddSuccess = async () => {
    setShowAddForm(false);
    await loadPaymentMethods();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-20 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your payment methods and set a default for subscriptions
          </p>
        </div>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Card</span>
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddPaymentMethodForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddForm(false)}
            setAsDefault={paymentMethods.length === 0}
          />
        </div>
      )}

      {paymentMethods.length === 0 && !showAddForm ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <CreditCardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No payment methods
          </h3>
          <p className="text-gray-600 mb-4">
            Add a payment method to manage your subscriptions
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Your First Card</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              paymentMethod={pm}
              onSetDefault={handleSetDefault}
              onDelete={handleDelete}
              disabled={actionLoading}
            />
          ))}
        </div>
      )}

      {paymentMethods.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Your default payment method will be used for all future subscription charges.
            You cannot delete your default payment method without setting a new one first.
          </p>
        </div>
      )}
    </div>
  );
}
