import { NextRequest, NextResponse } from 'next/server';
import { SocialMediaPost } from '@/types/seo';

export const dynamic = 'force-dynamic';

// GET /api/admin/marketing/social - Get social media posts
export async function GET(request: NextRequest) {
  try {
    // Mock social media posts for development
    const posts: SocialMediaPost[] = [
      {
        id: 'post_1',
        platform: 'facebook',
        content: '🎒 Back to school season is here! Create engaging worksheets for your students with our easy-to-use generators. Try it free today! #Education #Teachers #BackToSchool',
        images: ['https://example.com/image1.jpg'],
        link: 'https://www.lessoncraftstudio.com/en/apps',
        hashtags: ['#Education', '#Teachers', '#BackToSchool'],
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled'
      },
      {
        id: 'post_2',
        platform: 'twitter',
        content: 'New feature alert! 🚀 Create word search puzzles in 30+ languages. Perfect for language teachers worldwide! #EdTech #LanguageLearning',
        link: 'https://www.lessoncraftstudio.com/en/apps/word-search',
        hashtags: ['#EdTech', '#LanguageLearning'],
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled'
      },
      {
        id: 'post_3',
        platform: 'instagram',
        content: 'Make math fun with our colorful puzzle generators! 🔢✨ Swipe to see examples from happy teachers.',
        images: [
          'https://example.com/math1.jpg',
          'https://example.com/math2.jpg',
          'https://example.com/math3.jpg'
        ],
        hashtags: ['#MathIsFun', '#TeacherResources', '#ElementaryMath'],
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
        content: 'Empowering educators with innovative worksheet generation tools. Our platform helps teachers save time while creating engaging educational content. Learn how schools are transforming their teaching methods.',
        link: 'https://www.lessoncraftstudio.com/en/about',
        scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled'
      },
      {
        id: 'post_5',
        platform: 'pinterest',
        content: 'Free printable worksheets for preschool and kindergarten! Pin this collection for endless learning activities.',
        images: ['https://example.com/pinterest-collection.jpg'],
        link: 'https://www.lessoncraftstudio.com/en/apps',
        hashtags: ['#PrintableWorksheets', '#PreschoolActivities', '#KindergartenLearning'],
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
        content: 'Teacher tip of the week: Use our crossword generator to create vocabulary reviews tailored to your lesson plans! 📚',
        images: ['https://example.com/crossword-tip.jpg'],
        link: 'https://www.lessoncraftstudio.com/en/apps/crossword',
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