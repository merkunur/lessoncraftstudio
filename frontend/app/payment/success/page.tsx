'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState , Suspense} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Download, Loader2, Home, FileText } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  invoiceUrl?: string;
  receiptUrl?: string;
  subscriptionTier?: string;
}

function PaymentSuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');

    if (redirectStatus === 'succeeded' && paymentIntentId) {
      fetchPaymentDetails(paymentIntentId);
    } else if (!paymentIntentId) {
      // Check if coming from embedded checkout
      const sessionId = searchParams.get('session_id');
      if (sessionId) {
        fetchCheckoutSession(sessionId);
      } else {
        setError('No payment information found');
        setLoading(false);
      }
    } else {
      setError('Payment was not successful');
      setLoading(false);
    }
  }, [searchParams]);

  const fetchPaymentDetails = async (paymentIntentId: string) => {
    try {
      const response = await fetch(`/api/stripe/payment-intent/${paymentIntentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment details');
      }
      const data = await response.json();
      setPaymentDetails(data);
    } catch (err) {
      console.error('Error fetching payment details:', err);
      setError('Failed to load payment details');
    } finally {
      setLoading(false);
    }
  };

  const fetchCheckoutSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/stripe/checkout?session_id=${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch session details');
      }
      const data = await response.json();
      setPaymentDetails({
        amount: data.amountTotal || 0,
        currency: data.currency || 'usd',
        description: 'Subscription payment',
        customerEmail: data.customerEmail || '',
      });
      
      // Show success message
      toast.success('Payment successful! Your subscription is now active.');
    } catch (err) {
      console.error('Error fetching session details:', err);
      setError('Failed to load payment details');
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = async () => {
    try {
      const response = await fetch('/api/stripe/receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: searchParams.get('payment_intent'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate receipt');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading receipt:', err);
      toast.error('Failed to download receipt');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Link
              href="/pricing"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/dashboard"
              className="block w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Payment Details Card */}
        {paymentDetails && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-semibold text-gray-900">
                  ${(paymentDetails.amount / 100).toFixed(2)} {paymentDetails.currency.toUpperCase()}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Description</span>
                <span className="text-gray-900">{paymentDetails.description}</span>
              </div>
              
              {paymentDetails.customerEmail && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Email</span>
                  <span className="text-gray-900">{paymentDetails.customerEmail}</span>
                </div>
              )}
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Date</span>
                <span className="text-gray-900">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Payment ID</span>
                <span className="text-xs text-gray-500 font-mono">
                  {searchParams.get('payment_intent') || 'N/A'}
                </span>
              </div>
            </div>

            {/* Receipt Download */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900 mb-3">
                A receipt has been sent to your email address. You can also download it below.
              </p>
              <button
                onClick={downloadReceipt}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </button>
            </div>
          </div>
        )}

        {/* What's Next Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-green-600 font-semibold text-sm">1</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-900 font-medium">Access your premium features</p>
                <p className="text-gray-600 text-sm mt-1">
                  Your subscription is now active. Explore all the new features available to you.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-green-600 font-semibold text-sm">2</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-900 font-medium">Manage your subscription</p>
                <p className="text-gray-600 text-sm mt-1">
                  Visit your billing dashboard to view invoices, update payment methods, or change plans.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-green-600 font-semibold text-sm">3</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-900 font-medium">Need help?</p>
                <p className="text-gray-600 text-sm mt-1">
                  Our support team is here to help. Contact us anytime through the help center.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Dashboard
          </Link>
          <Link
            href="/dashboard/billing"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            View Billing
          </Link>
        </div>

        {/* Support Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Questions about your payment?{' '}
            <a href="/support" className="text-blue-600 hover:text-blue-700">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <PaymentSuccessPageContent />
    </Suspense>
  );
}
