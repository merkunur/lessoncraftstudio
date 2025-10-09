'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { X, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface AddPaymentMethodFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  setAsDefault?: boolean;
}

function PaymentForm({ onSuccess, onCancel, setAsDefault = false }: AddPaymentMethodFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create SetupIntent
      const setupIntentResponse = await fetch('/api/stripe/setup-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!setupIntentResponse.ok) {
        const error = await setupIntentResponse.json();
        throw new Error(error.error || 'Failed to initialize payment setup');
      }

      const { clientSecret } = await setupIntentResponse.json();

      // Confirm card setup
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { setupIntent, error: confirmError } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (!setupIntent || setupIntent.status !== 'succeeded') {
        throw new Error('Payment method setup failed');
      }

      // Add payment method to customer
      const addResponse = await fetch('/api/stripe/payment-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: setupIntent.payment_method,
          setAsDefault,
        }),
      });

      if (!addResponse.ok) {
        const error = await addResponse.json();
        throw new Error(error.error || 'Failed to save payment method');
      }

      toast.success('Payment method added successfully');
      onSuccess();
    } catch (err: any) {
      console.error('Payment method error:', err);
      setError(err.message || 'Failed to add payment method');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="border rounded-lg p-3 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
              hidePostalCode: false,
            }}
          />
        </div>
      </div>

      {setAsDefault && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="setAsDefault"
            checked={true}
            disabled
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="setAsDefault" className="ml-2 text-sm text-gray-700">
            Set as default payment method
          </label>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Adding...' : 'Add Payment Method'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Your payment information is securely processed by Stripe. We never store your full card details.
      </p>
    </form>
  );
}

export function AddPaymentMethodForm(props: AddPaymentMethodFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <div className="border rounded-lg p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Add Payment Method
            </h3>
          </div>
          <button
            onClick={props.onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <PaymentForm {...props} />
      </div>
    </Elements>
  );
}
