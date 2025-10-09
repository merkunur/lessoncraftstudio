'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Invoice {
  id: string;
  number: string | null;
  status: string;
  amount: number;
  currency: string;
  date: string;
  invoiceUrl: string | null;
  invoicePdf: string | null;
  receiptUrl: string | null;
  subtotal: number;
  tax: number;
}

export function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastInvoiceId, setLastInvoiceId] = useState<string | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async (startingAfter?: string) => {
    try {
      const url = new URL('/api/stripe/invoices', window.location.origin);
      if (startingAfter) {
        url.searchParams.set('starting_after', startingAfter);
      }

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          // No invoices yet
          setInvoices([]);
          return;
        }
        throw new Error('Failed to load invoices');
      }

      const data = await response.json();

      if (startingAfter) {
        setInvoices((prev) => [...prev, ...(data.invoices || [])]);
      } else {
        setInvoices(data.invoices || []);
      }

      setHasMore(data.hasMore || false);

      if (data.invoices && data.invoices.length > 0) {
        setLastInvoiceId(data.invoices[data.invoices.length - 1].id);
      }
    } catch (error) {
      console.error('Error loading invoices:', error);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!lastInvoiceId || loadingMore) return;
    setLoadingMore(true);
    loadInvoices(lastInvoiceId);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      paid: 'bg-green-100 text-green-800',
      open: 'bg-blue-100 text-blue-800',
      void: 'bg-gray-100 text-gray-800',
      uncollectible: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badges[status as keyof typeof badges] || badges.open}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Invoice History</h2>
        <p className="text-sm text-gray-600 mt-1">
          View and download your invoices and receipts
        </p>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No invoices yet
          </h3>
          <p className="text-gray-600">
            Your invoice history will appear here once you have an active subscription
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="border rounded-lg p-4 hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {invoice.number || `Invoice ${invoice.id.slice(-8)}`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(invoice.date)}
                      </p>
                    </div>
                    {getStatusBadge(invoice.status)}
                  </div>

                  <div className="ml-8 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-900">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                    </div>
                    {invoice.tax > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax:</span>
                        <span className="text-gray-900">{formatCurrency(invoice.tax, invoice.currency)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-semibold pt-1 border-t">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-gray-900">{formatCurrency(invoice.amount, invoice.currency)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {invoice.invoicePdf && (
                    <a
                      href={invoice.invoicePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center space-x-1"
                    >
                      <Download className="h-4 w-4" />
                      <span>PDF</span>
                    </a>
                  )}
                  {invoice.invoiceUrl && (
                    <a
                      href={invoice.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center space-x-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View</span>
                    </a>
                  )}
                  {invoice.receiptUrl && invoice.status === 'paid' && (
                    <a
                      href={invoice.receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center space-x-1"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Receipt</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 inline-flex items-center space-x-2"
              >
                {loadingMore ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span>Load More</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
