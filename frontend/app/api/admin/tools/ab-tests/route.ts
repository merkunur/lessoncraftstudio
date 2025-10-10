import { NextRequest, NextResponse } from 'next/server';
import { ABTest } from '@/types/admin-tools';

export const dynamic = 'force-dynamic';

// GET /api/admin/tools/ab-tests - Get all A/B tests
export async function GET(request: NextRequest) {
  try {
    const tests: ABTest[] = [
      {
        id: 'test_1',
        name: 'Homepage CTA Button',
        description: 'Test different call-to-action button colors on homepage',
        hypothesis: 'A green CTA button will increase conversions by 15% compared to blue',
        status: 'running',
        type: 'split',
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        variants: [
          {
            id: 'variant_control',
            name: 'Blue Button',
            description: 'Current blue button design',
            control: true,
            weight: 50,
            changes: [
              { type: 'style', target: '.cta-button', value: 'bg-blue-600', originalValue: 'bg-blue-600' }
            ],
            participants: 2456,
            conversions: 123
          },
          {
            id: 'variant_test',
            name: 'Green Button',
            description: 'Test with green button',
            control: false,
            weight: 50,
            changes: [
              { type: 'style', target: '.cta-button', value: 'bg-green-600', originalValue: 'bg-blue-600' }
            ],
            participants: 2398,
            conversions: 156
          }
        ],
        metrics: [
          {
            id: 'metric_1',
            name: 'Sign-up Conversion',
            type: 'conversion',
            goal: 'maximize',
            primaryMetric: true,
            calculation: 'signups / visitors'
          }
        ],
        targeting: [],
        trafficAllocation: 100,
        results: {
          winner: 'variant_test',
          confidence: 94.5,
          significanceLevel: 0.05,
          sampleSize: 4854,
          duration: 7,
          variantResults: {
            'variant_control': {
              participants: 2456,
              conversions: 123,
              conversionRate: 5.01,
              improvement: 0,
              confidence: 0
            },
            'variant_test': {
              participants: 2398,
              conversions: 156,
              conversionRate: 6.51,
              improvement: 30.0,
              confidence: 94.5
            }
          }
        },
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        createdBy: 'admin@lessoncraft.com'
      },
      {
        id: 'test_2',
        name: 'Pricing Page Layout',
        description: 'Test grid vs list layout for pricing plans',
        hypothesis: 'Grid layout will improve plan selection by 20%',
        status: 'paused',
        type: 'split',
        startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        variants: [
          {
            id: 'variant_list',
            name: 'List Layout',
            description: 'Traditional list view',
            control: true,
            weight: 50,
            changes: [
              { type: 'component', target: 'pricing-layout', value: 'list', originalValue: 'list' }
            ],
            participants: 1234,
            conversions: 45
          },
          {
            id: 'variant_grid',
            name: 'Grid Layout',
            description: 'Modern grid view',
            control: false,
            weight: 50,
            changes: [
              { type: 'component', target: 'pricing-layout', value: 'grid', originalValue: 'list' }
            ],
            participants: 1189,
            conversions: 52
          }
        ],
        metrics: [
          {
            id: 'metric_2',
            name: 'Plan Selection',
            type: 'conversion',
            goal: 'maximize',
            primaryMetric: true,
            calculation: 'plan_selections / visitors'
          },
          {
            id: 'metric_3',
            name: 'Time on Page',
            type: 'engagement',
            goal: 'minimize',
            primaryMetric: false,
            calculation: 'average_time_seconds'
          }
        ],
        targeting: [],
        trafficAllocation: 50,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'admin@lessoncraft.com'
      },
      {
        id: 'test_3',
        name: 'Onboarding Flow',
        description: 'Test simplified vs detailed onboarding',
        hypothesis: 'Simplified onboarding will increase completion rate by 25%',
        status: 'completed',
        type: 'split',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        variants: [
          {
            id: 'variant_detailed',
            name: 'Detailed Onboarding',
            description: '5-step onboarding with all options',
            control: true,
            weight: 50,
            changes: [
              { type: 'feature', target: 'onboarding_steps', value: 5, originalValue: 5 }
            ],
            participants: 3456,
            conversions: 1987
          },
          {
            id: 'variant_simple',
            name: 'Simplified Onboarding',
            description: '3-step onboarding with essentials',
            control: false,
            weight: 50,
            changes: [
              { type: 'feature', target: 'onboarding_steps', value: 3, originalValue: 5 }
            ],
            participants: 3398,
            conversions: 2378
          }
        ],
        metrics: [
          {
            id: 'metric_4',
            name: 'Completion Rate',
            type: 'conversion',
            goal: 'maximize',
            primaryMetric: true,
            calculation: 'completed / started'
          }
        ],
        targeting: [],
        trafficAllocation: 100,
        results: {
          winner: 'variant_simple',
          confidence: 99.2,
          significanceLevel: 0.05,
          sampleSize: 6854,
          duration: 20,
          variantResults: {
            'variant_detailed': {
              participants: 3456,
              conversions: 1987,
              conversionRate: 57.52,
              improvement: 0,
              confidence: 0
            },
            'variant_simple': {
              participants: 3398,
              conversions: 2378,
              conversionRate: 69.95,
              improvement: 21.6,
              confidence: 99.2
            }
          }
        },
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'admin@lessoncraft.com'
      }
    ];

    return NextResponse.json(tests);
  } catch (error) {
    console.error('Failed to get A/B tests:', error);
    return NextResponse.json(
      { error: 'Failed to get A/B tests' },
      { status: 500 }
    );
  }
}

// POST /api/admin/tools/ab-tests - Create new A/B test
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newTest: ABTest = {
      id: `test_${Date.now()}`,
      ...body,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin@lessoncraft.com'
    };

    return NextResponse.json(newTest);
  } catch (error) {
    console.error('Failed to create A/B test:', error);
    return NextResponse.json(
      { error: 'Failed to create A/B test' },
      { status: 500 }
    );
  }
}