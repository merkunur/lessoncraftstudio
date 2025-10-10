'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionTier: string;
}

interface Subscription {
  tier: string;
  status: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd: boolean;
}

export default function SubscriptionPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/auth/signin');
      return;
    }
    
    const userData = JSON.parse(userStr);
    setUser(userData);
    
    // Mock subscription data for now
    setSubscription({
      tier: userData.subscriptionTier,
      status: 'active',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false
    });
    
    setIsLoading(false);
  }, [router]);

  const handleUpgrade = async (newTier: string) => {
    setIsProcessing(true);
    // TODO: Implement Stripe checkout
    console.log('Upgrading to:', newTier);
    setTimeout(() => {
      alert('Stripe integration coming soon!');
      setIsProcessing(false);
    }, 1000);
  };

  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      setIsProcessing(true);
      // TODO: Implement cancellation
      setTimeout(() => {
        alert('Cancellation feature coming soon!');
        setIsProcessing(false);
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const plans = [
    {
      name: 'Free',
      tier: 'free',
      price: '$0',
      period: '',
      features: [
        '1 App - Word Search',
        'Watermarked output',
        'Limited image library',
        'Basic support'
      ]
    },
    {
      name: 'Core Bundle',
      tier: 'core',
      price: '$15',
      period: '/month',
      features: [
        '10 Most Popular Apps',
        'No watermarks',
        'Full image library',
        'POD commercial license',
        'Standard support'
      ]
    },
    {
      name: 'Full Access',
      tier: 'full',
      price: '$25',
      period: '/month',
      features: [
        'All 33 Apps',
        'No watermarks',
        'Full image library',
        'POD commercial license',
        'Priority support',
        'Early access to new apps'
      ]
    }
  ];

  const currentPlan = plans.find(p => p.tier === user?.subscriptionTier);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Subscription & Billing</h1>

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{currentPlan?.name}</h3>
            <p className="text-gray-600">
              {currentPlan?.tier === 'free' 
                ? 'You are on the free plan' 
                : `Billed ${currentPlan?.price}${currentPlan?.period}`}
            </p>
          </div>
          
          {subscription?.tier !== 'free' && (
            <div className="text-right">
              <p className="text-sm text-gray-600">Next billing date</p>
              <p className="font-semibold">
                {subscription?.currentPeriodEnd 
                  ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          )}
        </div>

        {subscription?.tier !== 'free' && (
          <div className="flex gap-4">
            <button 
              onClick={handleCancel}
              disabled={isProcessing}
              className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              Cancel Subscription
            </button>
            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Download Invoice
            </button>
          </div>
        )}
      </div>

      {/* Available Plans */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {user?.subscriptionTier === 'free' ? 'Upgrade Your Plan' : 'Available Plans'}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.tier === user?.subscriptionTier;
            const isUpgrade = 
              (user?.subscriptionTier === 'free' && plan.tier !== 'free') ||
              (user?.subscriptionTier === 'core' && plan.tier === 'full');
            
            return (
              <div 
                key={plan.tier}
                className={`bg-white rounded-lg border-2 ${
                  isCurrent ? 'border-primary' : 'border-gray-200'
                } p-6`}
              >
                {isCurrent && (
                  <div className="bg-primary text-white text-xs px-2 py-1 rounded-full inline-block mb-4">
                    CURRENT PLAN
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {isUpgrade && (
                  <button 
                    onClick={() => handleUpgrade(plan.tier)}
                    disabled={isProcessing}
                    className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Upgrade'}
                  </button>
                )}
                
                {isCurrent && (
                  <button disabled className="w-full py-2 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed">
                    Current Plan
                  </button>
                )}
                
                {!isCurrent && !isUpgrade && (
                  <button disabled className="w-full py-2 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed">
                    Not Available
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing History</h2>
        
        {user?.subscriptionTier === 'free' ? (
          <p className="text-gray-600">No billing history for free accounts</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Description</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    {currentPlan?.name} - Monthly
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    {currentPlan?.price}
                  </td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Paid
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Method */}
      {user?.subscriptionTier !== 'free' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">VISA</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">"""" """" """" 4242</p>
                <p className="text-sm text-gray-600">Expires 12/25</p>
              </div>
            </div>
            
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}