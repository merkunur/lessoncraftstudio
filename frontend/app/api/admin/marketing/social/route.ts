import { NextRequest, NextResponse } from 'next/server';
import { SocialMediaPost } from '@/types/seo';

export const dynamic = 'force-dynamic';

// GET /api/admin/marketing/social - Get social media posts
export async function GET(request: NextRequest) {
  try {
    // Synthetic mock data for the admin Marketing dashboard during dev.
    // URLs reference live classroom surfaces (post-teardown — `/en/apps/*`
    // is 410-Gone per middleware REMOVED_PREFIXES). Numbers and content
    // strings are obviously synthetic; no real engagement metrics here.
    const posts: SocialMediaPost[] = [
      {
        id: 'post_1',
        platform: 'facebook',
        content: 'Free K-3 worksheets and interactive activities in 11 languages — built for dual-language and international-school classrooms. Browse the catalog.',
        images: ['https://example.com/image1.jpg'],
        link: 'https://www.lessoncraftstudio.com/en/worksheets',
        hashtags: ['#K3', '#Multilingual', '#BackToSchool'],
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled'
      },
      {
        id: 'post_2',
        platform: 'twitter',
        content: 'Word search worksheets in 11 languages — handy for vocabulary review in bilingual classrooms. #K3 #LanguageLearning',
        link: 'https://www.lessoncraftstudio.com/en/topic/wordsearch',
        hashtags: ['#K3', '#LanguageLearning'],
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled'
      },
      {
        id: 'post_3',
        platform: 'instagram',
        content: 'Browser-playable K-3 math activities aligned to Common Core. Each one is a short, single-standard task set.',
        images: [
          'https://example.com/math1.jpg',
          'https://example.com/math2.jpg',
          'https://example.com/math3.jpg'
        ],
        hashtags: ['#K3Math', '#CommonCore', '#ElementaryMath'],
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: 'published',
        engagement: {
          likes: 234,
          shares: 45,
          comments: 12,
          clicks: 67
        }
      },
      {
        id: 'post_4',
        platform: 'linkedin',
        content: 'About LessonCraftStudio — free K-3 worksheets and activities in 11 languages, made for dual-language, bilingual, and international-school classrooms.',
        link: 'https://www.lessoncraftstudio.com/en/about',
        scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled'
      },
      {
        id: 'post_5',
        platform: 'pinterest',
        content: 'Free K-3 worksheets for preschool and kindergarten classrooms. Pin this collection for everyday classroom activities.',
        images: ['https://example.com/pinterest-collection.jpg'],
        link: 'https://www.lessoncraftstudio.com/en/worksheets',
        hashtags: ['#K3Worksheets', '#PreschoolActivities', '#KindergartenLearning'],
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        status: 'published',
        engagement: {
          likes: 456,
          shares: 123,
          comments: 34,
          clicks: 189
        }
      },
      {
        id: 'post_6',
        platform: 'facebook',
        content: 'Crossword worksheets are a handy classroom warm-up for vocabulary review. Browse the topic page for samples in 11 languages.',
        images: ['https://example.com/crossword-tip.jpg'],
        link: 'https://www.lessoncraftstudio.com/en/topic/crossword',
        status: 'draft'
      }
    ];

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to get social posts:', error);
    return NextResponse.json(
      { error: 'Failed to get social posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/marketing/social - Create social media post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, create post in database
    const newPost: SocialMediaPost = {
      id: `post_${Date.now()}`,
      ...body,
      status: body.scheduledAt ? 'scheduled' : 'draft'
    };

    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Failed to create social post:', error);
    return NextResponse.json(
      { error: 'Failed to create social post' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/marketing/social/[id] - Update social post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, update post in database
    console.log('Updating social post:', body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update social post:', error);
    return NextResponse.json(
      { error: 'Failed to update social post' },
      { status: 500 }
    );
  }
}