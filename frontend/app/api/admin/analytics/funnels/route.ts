import { NextRequest, NextResponse } from 'next/server';
import { ConversionFunnel } from '@/types/analytics';

export const dynamic = 'force-dynamic';

// GET /api/admin/analytics/funnels - Get conversion funnels
export async function GET(request: NextRequest) {
  try {
    // Mock conversion funnel data for development
    const funnels: ConversionFunnel[] = [
      {
        id: 'signup_funnel',
        name: 'User Signup Funnel',
        steps: [
          {
            name: 'Landing Page',
            visitors: 10000,
            conversionRate: 100,
            dropoffRate: 0
          },
          {
            name: 'Signup Page',
            visitors: 3500,
            conversionRate: 35,
            dropoffRate: 65,
            averageTime: 45
          },
          {
            name: 'Email Verification',
            visitors: 2800,
            conversionRate: 80,
            dropoffRate: 20,
            averageTime: 120
          },
          {
            name: 'Profile Setup',
            visitors: 2100,
            conversionRate: 75,
            dropoffRate: 25,
            averageTime: 180
          },
          {
            name: 'First Worksheet',
            visitors: 1680,
            conversionRate: 80,
            dropoffRate: 20,
            averageTime: 240
          }
        ],
        overallConversion: 16.8
      },
      {
        id: 'purchase_funnel',
        name: 'Purchase Funnel',
        steps: [
          {
            name: 'Pricing Page',
            visitors: 5000,
            conversionRate: 100,
            dropoffRate: 0
          },
          {
            name: 'Plan Selection',
            visitors: 1500,
            conversionRate: 30,
            dropoffRate: 70,
            averageTime: 60
          },
          {
            name: 'Checkout',
            visitors: 900,
            conversionRate: 60,
            dropoffRate: 40,
            averageTime: 150
          },
          {
            name: 'Payment',
            visitors: 720,
            conversionRate: 80,
            dropoffRate: 20,
            averageTime: 90
          },
          {
            name: 'Confirmation',
            visitors: 684,
            conversionRate: 95,
            dropoffRate: 5,
            averageTime: 30
          }
        ],
        overallConversion: 13.7
      },
      {
        id: 'worksheet_creation',
        name: 'Worksheet Creation Funnel',
        steps: [
          {
            name: 'Browse Templates',
            visitors: 8000,
            conversionRate: 100,
            dropoffRate: 0
          },
          {
            name: 'Select Template',
            visitors: 5600,
            conversionRate: 70,
            dropoffRate: 30,
            averageTime: 45
          },
          {
            name: 'Customize',
            visitors: 4480,
            conversionRate: 80,
            dropoffRate: 20,
            averageTime: 300
          },
          {
            name: 'Generate',
            visitors: 4032,
            conversionRate: 90,
            dropoffRate: 10,
            averageTime: 15
          },
          {
            name: 'Download',
            visitors: 3628,
            conversionRate: 90,
            dropoffRate: 10,
            averageTime: 10
          }
        ],
        overallConversion: 45.4
      }
    ];

    return NextResponse.json(funnels);
  } catch (error) {
    console.error('Failed to get conversion funnels:', error);
    return NextResponse.json(
      { error: 'Failed to get conversion funnels' },
      { status: 500 }
    );
  }
}