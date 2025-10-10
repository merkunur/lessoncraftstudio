import { NextRequest, NextResponse } from 'next/server';
import { PricingPlan } from '@/types/stripe';

export const dynamic = 'force-dynamic';

// GET /api/admin/billing/plans - Get available plans
export async function GET(request: NextRequest) {
  try {
    // Mock pricing plans for development
    const plans: PricingPlan[] = [
      {
        id: 'plan_free',
        stripeProductId: 'prod_free',
        stripePriceId: 'price_free',
        name: 'Free',
        description: 'Perfect for getting started',
        price: 0,
        currency: 'usd',
        interval: 'month',
        intervalCount: 1,
        features: [
          '10 worksheets per month',
          'Basic templates',
          'PDF export',
          'Email support'
        ],
        limits: {
          worksheetsPerMonth: 10,
          storageGB: 1,
          teamMembers: 1,
          apiRequestsPerMonth: 100,
          customTemplates: 0,
          exportFormats: ['pdf']
        }
      },
      {
        id: 'plan_professional',
        stripeProductId: 'prod_professional',
        stripePriceId: 'price_professional',
        name: 'Professional',
        description: 'For educators and small teams',
        price: 2900, // $29.00
        currency: 'usd',
        interval: 'month',
        intervalCount: 1,
        features: [
          '100 worksheets per month',
          'All template types',
          'Advanced customization',
          'Priority support',
          'Team collaboration',
          'API access'
        ],
        limits: {
          worksheetsPerMonth: 100,
          storageGB: 10,
          teamMembers: 5,
          apiRequestsPerMonth: 1000,
          customTemplates: 10,
          exportFormats: ['pdf', 'png', 'jpg', 'svg']
        },
        recommended: true
      },
      {
        id: 'plan_enterprise',
        stripeProductId: 'prod_enterprise',
        stripePriceId: 'price_enterprise',
        name: 'Enterprise',
        description: 'For schools and large organizations',
        price: 9900, // $99.00
        currency: 'usd',
        interval: 'month',
        intervalCount: 1,
        features: [
          'Unlimited worksheets',
          'Custom branding',
          'Advanced analytics',
          'Dedicated support',
          'SSO integration',
          'Custom integrations',
          'SLA guarantee'
        ],
        limits: {
          worksheetsPerMonth: -1, // Unlimited
          storageGB: 100,
          teamMembers: -1, // Unlimited
          apiRequestsPerMonth: -1, // Unlimited
          customTemplates: -1, // Unlimited
          exportFormats: ['pdf', 'png', 'jpg', 'svg', 'docx', 'pptx']
        }
      }
    ];

    return NextResponse.json(plans);
  } catch (error) {
    console.error('Failed to get plans:', error);
    return NextResponse.json(
      { error: 'Failed to get plans' },
      { status: 500 }
    );
  }
}