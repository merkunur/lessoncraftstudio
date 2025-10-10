import { NextRequest, NextResponse } from 'next/server';
import { FeatureFlag } from '@/types/admin-tools';

export const dynamic = 'force-dynamic';

// GET /api/admin/tools/feature-flags - Get all feature flags
export async function GET(request: NextRequest) {
  try {
    // Mock feature flags data
    const flags: FeatureFlag[] = [
      {
        id: 'flag_1',
        key: 'new_editor_ui',
        name: 'New Editor UI',
        description: 'Enable the new worksheet editor interface with enhanced features',
        enabled: true,
        type: 'percentage',
        percentage: 75,
        tags: ['ui', 'editor', 'beta'],
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'admin@lessoncraft.com'
      },
      {
        id: 'flag_2',
        key: 'ai_suggestions',
        name: 'AI Content Suggestions',
        description: 'Provide AI-powered content suggestions for worksheet creation',
        enabled: false,
        type: 'boolean',
        tags: ['ai', 'experimental'],
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'admin@lessoncraft.com'
      },
      {
        id: 'flag_3',
        key: 'multi_language_support',
        name: 'Multi-Language Support',
        description: 'Enable support for 11 languages in worksheet generation',
        enabled: true,
        type: 'variant',
        variants: [
          { id: 'v1', name: 'Basic (5 languages)', value: 'basic', percentage: 40, description: 'EN, DE, FR, ES, IT' },
          { id: 'v2', name: 'Extended (8 languages)', value: 'extended', percentage: 30, description: 'Basic + PT, NL, SV' },
          { id: 'v3', name: 'Full (11 languages)', value: 'full', percentage: 30, description: 'All languages' }
        ],
        tags: ['localization', 'rollout'],
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'admin@lessoncraft.com'
      },
      {
        id: 'flag_4',
        key: 'premium_templates',
        name: 'Premium Templates',
        description: 'Show premium template options to users',
        enabled: true,
        type: 'schedule',
        schedule: {
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          timezone: 'UTC'
        },
        tags: ['monetization', 'templates'],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'admin@lessoncraft.com'
      },
      {
        id: 'flag_5',
        key: 'collaborative_editing',
        name: 'Collaborative Editing',
        description: 'Allow multiple teachers to work on the same worksheet',
        enabled: false,
        type: 'boolean',
        tags: ['collaboration', 'planned'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'admin@lessoncraft.com'
      },
      {
        id: 'flag_6',
        key: 'performance_mode',
        name: 'Performance Mode',
        description: 'Enable performance optimizations for large worksheets',
        enabled: true,
        type: 'boolean',
        value: true,
        tags: ['performance', 'optimization'],
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'admin@lessoncraft.com'
      }
    ];

    return NextResponse.json(flags);
  } catch (error) {
    console.error('Failed to get feature flags:', error);
    return NextResponse.json(
      { error: 'Failed to get feature flags' },
      { status: 500 }
    );
  }
}

// POST /api/admin/tools/feature-flags - Create new feature flag
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newFlag: FeatureFlag = {
      id: `flag_${Date.now()}`,
      ...body,
      enabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin@lessoncraft.com'
    };

    return NextResponse.json(newFlag);
  } catch (error) {
    console.error('Failed to create feature flag:', error);
    return NextResponse.json(
      { error: 'Failed to create feature flag' },
      { status: 500 }
    );
  }
}