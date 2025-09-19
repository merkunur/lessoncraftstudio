import { NextRequest, NextResponse } from 'next/server';
import { Announcement } from '@/types/help';

// GET /api/help/announcements - Get active announcements
export async function GET(request: NextRequest) {
  try {
    const announcements: Announcement[] = [
      {
        id: 'announce_1',
        title: 'New Feature: Multi-Language Support',
        content: 'We now support 11 languages! Switch your interface language in Settings.',
        type: 'new_feature',
        target: 'all',
        displayLocation: 'banner',
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        dismissible: true,
        link: {
          text: 'Learn more',
          url: '/help/docs/multi-language'
        },
        icon: '🌍',
        priority: 1,
        active: true
      },
      {
        id: 'announce_2',
        title: 'Scheduled Maintenance',
        content: 'System maintenance scheduled for Sunday, 2 AM - 4 AM EST. Service may be temporarily unavailable.',
        type: 'maintenance',
        target: 'all',
        displayLocation: 'notification',
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        dismissible: true,
        icon: '🔧',
        priority: 2,
        active: false
      },
      {
        id: 'announce_3',
        title: 'Welcome to LessonCraft Studio!',
        content: 'Start your journey with our interactive tutorial.',
        type: 'info',
        target: 'new_users',
        displayLocation: 'modal',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        dismissible: true,
        link: {
          text: 'Start Tutorial',
          url: '/help/tutorials/getting-started'
        },
        priority: 3,
        active: false
      }
    ];

    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Failed to get announcements:', error);
    return NextResponse.json(
      { error: 'Failed to get announcements' },
      { status: 500 }
    );
  }
}