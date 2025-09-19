'use client';

import { useState, FormEvent } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Loader2, CreditCard, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentMethodFormProps {
  clientSecret: string;
  onSuccess: (paymentMethodId: string) => void;
  onCancel?: () => void;
  amount?: number;
  currency?: string;
}

function PaymentMethodFormContent({
  onSuccess,
  onCancel,
  amount,
  currency = 'usd',
}: Omit<PaymentMethodFormProps, 'clientSecret'>) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
        redirect: 'if_required', // Only redirect if 3D Secure is required
      });

      if (error) {
        // Show error to customer
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message || 'Payment failed');
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
        console.error('Payment error:', error);
      } else if (paymentIntent) {
        // Payment succeeded
        if (paymentIntent.status === 'succeeded') {
          toast.success('Payment successful!');
          onSuccess(paymentIntent.payment_method as string);
        } else if (paymentIntent.status === 'processing') {
          toast.success('Payment is processing. We\'ll update you when complete.');
          onSuccess(paymentIntent.payment_method as string);
        } else if (paymentIntent.status === 'requires_payment_method') {
          setErrorMessage('Payment failed. Please try another payment method.');
        }
      }
    } catch (err: any) {
      console.error('Payment submission error:', err);
      setErrorMessage('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment amount display */}
      {amount && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount to pay</span>
            <span className="text-2xl font-bold text-gray-900">
              ${(amount / 100).toFixed(2)} {currency.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Payment Element */}
      <div className="border rounded-lg p-4">
        <PaymentElement
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                email: '',
              },
            },
          }}
        />
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

      {/* Security badge */}
      <div className="flex items-center justify-center text-sm text-gray-600">
        <Lock className="h-4 w-4 mr-1" />
        Secure payment powered by Stripe
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5 mr-2" />
              Pay Now
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function PaymentMethodForm({
  clientSecret,
  onSuccess,
  onCancel,
  amount,
  currency,
}: PaymentMethodFormProps) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#2563eb',
        colorBackground: '#ffffff',
        colorText: '#111827',
        colorDanger: '#dc2626',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentMethodFormContent
        onSuccess={onSuccess}
        onCancel={onCancel}
        amount={amount}
        currency={currency}
      />
    </Elements>
  );
}