'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Package,
  Receipt,
  Settings,
  Download,
  Plus,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  HardDrive,
  Zap,
  Shield,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Pause,
  Play
} from 'lucide-react';
import {
  PricingPlan,
  Subscription,
  PaymentMethod,
  Invoice,
  UsageRecord
} from '@/types/stripe';
import { formatCurrency, formatPlanInterval, getSubscriptionStatusColor } from '@/lib/stripe-client';
import toast from 'react-hot-toast';

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [usage, setUsage] = useState<Record<string, UsageRecord[]>>({});
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      // Load all billing data
      const [subRes, plansRes, methodsRes, invoicesRes, usageRes] = await Promise.all([
        fetch('/api/admin/billing/subscription'),
        fetch('/api/admin/billing/plans'),
        fetch('/api/admin/billing/payment-methods'),
        fetch('/api/admin/billing/invoices'),
        fetch('/api/admin/billing/usage')
      ]);

      if (subRes.ok) {
        const data = await subRes.json();
        setSubscription(data);
      }

      if (plansRes.ok) {
        const data = await plansRes.json();
        setPlans(data);
      }

      if (methodsRes.ok) {
        const data = await methodsRes.json();
        setPaymentMethods(data);
      }

      if (invoicesRes.ok) {
        const data = await invoicesRes.json();
        setInvoices(data);
      }

      if (usageRes.ok) {
        const data = await usageRes.json();
        setUsage(data);
      }
    } catch (error) {
      console.error('Failed to load billing data:', error);
      toast.error('Failed to load billing information');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradePlan = async (plan: PricingPlan) => {
    try {
      const response = await fetch('/api/admin/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id })
      });

      if (response.ok) {
        const { checkoutUrl } = await response.json();
        window.location.href = checkoutUrl;
      } else {
        toast.error('Failed to start checkout process');
      }
    } catch (error) {
      toast.error('Failed to upgrade plan');
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/billing/subscription/cancel', {
        method: 'POST'
      });

      if (response.ok) {
        toast.success('Subscription canceled successfully');
        loadBillingData();
      } else {
        toast.error('Failed to cancel subscription');
      }
    } catch (error) {
      toast.error('Failed to cancel subscription');
    }
  };

  const handlePauseSubscription = async () => {
    try {
      const response = await fetch('/api/admin/billing/subscription/pause', {
        method: 'POST'
      });

      if (response.ok) {
        toast.success('Subscription paused');
        loadBillingData();
      } else {
        toast.error('Failed to pause subscription');
      }
    } catch (error) {
      toast.error('Failed to pause subscription');
    }
  };

  const handleResumeSubscription = async () => {
    try {
      const response = await fetch('/api/admin/billing/subscription/resume', {
        method: 'POST'
      });

      if (response.ok) {
        toast.success('Subscription resumed');
        loadBillingData();
      } else {
        toast.error('Failed to resume subscription');
      }
    } catch (error) {
      toast.error('Failed to resume subscription');
    }
  };

  const currentPlan = subscription ? plans.find(p => p.id === subscription.planId) : null;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
          {subscription && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubscriptionStatusColor(subscription.status)}`}>
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </span>
          )}
        </div>

        {currentPlan ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h4>
                <p className="text-gray-600">{currentPlan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  {formatCurrency(currentPlan.price, currentPlan.currency)}
                </div>
                <div className="text-gray-600">
                  {formatPlanInterval(currentPlan.interval, currentPlan.intervalCount)}
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Worksheets</span>
                  <span className="text-sm font-medium">
                    {subscription?.metadata.worksheetsUsed || 0} / {currentPlan.limits.worksheetsPerMonth === -1 ? '∞' : currentPlan.limits.worksheetsPerMonth}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${currentPlan.limits.worksheetsPerMonth === -1 ? 0 : (subscription?.metadata.worksheetsUsed || 0) / currentPlan.limits.worksheetsPerMonth * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Storage</span>
                  <span className="text-sm font-medium">
                    {subscription?.metadata.storageUsed || 0} GB / {currentPlan.limits.storageGB} GB
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(subscription?.metadata.storageUsed || 0) / currentPlan.limits.storageGB * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Team Members</span>
                  <span className="text-sm font-medium">
                    3 / {currentPlan.limits.teamMembers === -1 ? '∞' : currentPlan.limits.teamMembers}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: currentPlan.limits.teamMembers === -1 ? 0 : '30%' }}
                  />
                </div>
              </div>
            </div>

            {/* Billing Period */}
            {subscription && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Current period</span>
                </div>
                <span className="font-medium">
                  {new Date(subscription.currentPeriodStart).toLocaleDateString()} - {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Upgrade Plan
              </button>

              {subscription?.status === 'active' && (
                <button
                  onClick={handlePauseSubscription}
                  className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-50"
                >
                  <Pause className="w-4 h-4 inline mr-2" />
                  Pause
                </button>
              )}

              {subscription?.status === 'paused' && (
                <button
                  onClick={handleResumeSubscription}
                  className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-50"
                >
                  <Play className="w-4 h-4 inline mr-2" />
                  Resume
                </button>
              )}

              <button
                onClick={handleCancelSubscription}
                className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
              >
                <X className="w-4 h-4 inline mr-2" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No active subscription</p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Choose a Plan
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(currentPlan?.price || 0, currentPlan?.currency || 'usd')}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Payment</p>
              <p className="text-lg font-medium text-gray-900">
                {subscription ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Payment Methods</p>
              <p className="text-2xl font-bold text-gray-900">{paymentMethods.length}</p>
            </div>
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
            </div>
            <Receipt className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlans = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your needs. All plans include core features with different limits and capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg border-2 ${
              plan.recommended ? 'border-blue-500 relative' : 'border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Recommended
                </span>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {formatCurrency(plan.price, plan.currency)}
                </span>
                <span className="text-gray-600 ml-2">
                  {formatPlanInterval(plan.interval, plan.intervalCount)}
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Worksheets</span>
                  <span className="font-medium">
                    {plan.limits.worksheetsPerMonth === -1 ? 'Unlimited' : `${plan.limits.worksheetsPerMonth}/month`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Storage</span>
                  <span className="font-medium">{plan.limits.storageGB} GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Team Members</span>
                  <span className="font-medium">
                    {plan.limits.teamMembers === -1 ? 'Unlimited' : plan.limits.teamMembers}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleUpgradePlan(plan)}
                className={`w-full mt-6 px-4 py-2 rounded font-medium ${
                  subscription?.planId === plan.id
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : plan.recommended
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                disabled={subscription?.planId === plan.id}
              >
                {subscription?.planId === plan.id ? 'Current Plan' : 'Select Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {method.card?.brand} •••• {method.card?.last4}
                    </div>
                    <div className="text-sm text-gray-600">
                      Expires {method.card?.expMonth}/{method.card?.expYear}
                    </div>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                    Default
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                {!method.isDefault && (
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Set as Default
                  </button>
                )}
                <button className="text-sm text-red-600 hover:text-red-700 ml-auto">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-8 text-center">
          <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">No payment methods added</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add Payment Method
          </button>
        </div>
      )}
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing History</h2>

      {invoices.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">#{invoice.number}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(invoice.periodStart).toLocaleDateString()} - {new Date(invoice.periodEnd).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString() : 'Pending'}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : invoice.status === 'open'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {invoice.pdfUrl && (
                        <a
                          href={invoice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                      {invoice.hostedInvoiceUrl && (
                        <a
                          href={invoice.hostedInvoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-8 text-center">
          <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No invoices yet</p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription, payment methods, and billing history</p>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="flex gap-6">
          {[
            { id: 'overview', label: 'Overview', icon: Package },
            { id: 'plans', label: 'Plans', icon: Zap },
            { id: 'payment', label: 'Payment Methods', icon: CreditCard },
            { id: 'invoices', label: 'Invoices', icon: Receipt }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'plans' && renderPlans()}
      {activeTab === 'payment' && renderPaymentMethods()}
      {activeTab === 'invoices' && renderInvoices()}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Choose a Plan</h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderPlans()}
          </div>
        </div>
      )}
    </div>
  );
}