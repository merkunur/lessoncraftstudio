'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Receipt, Download, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  createdAt: string;
  stripePaymentIntentId: string;
}

export default function PaymentHistory() {
  const router = useRouter();
  const t = useTranslations('dashboard.paymentHistory');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  // Get current locale from URL
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || 'en' : 'en';

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/payments?limit=5', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments || []);
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{t('title')}</h2>
          <Receipt className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="p-6">
        {payments.length > 0 ? (
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(payment.status)}
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatAmount(payment.amount, payment.currency)}
                    </p>
                    <p className="text-sm text-gray-600">{payment.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {t(payment.status as 'succeeded' | 'failed' | 'pending')}
                  </span>
                  {payment.status === 'succeeded' && (
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      title={t('downloadInvoice')}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">{t('noPayments')}</p>
            <p className="text-sm text-gray-400 mt-1">
              {t('noPaymentsSubtext')}
            </p>
          </div>
        )}

        {payments.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push(`/${locale}/dashboard/billing`)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {t('viewAll')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
