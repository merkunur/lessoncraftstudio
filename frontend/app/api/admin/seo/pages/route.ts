import { NextRequest, NextResponse } from 'next/server';
import { PageSEO } from '@/types/seo';

export const dynamic = 'force-dynamic';

// GET /api/admin/seo/pages - Get all pages with SEO data
export async function GET(request: NextRequest) {
  try {
    // Synthetic mock data for the admin SEO dashboard during dev. URLs
    // reference live classroom surfaces (post-teardown — `/en/apps/*` and
    // `/en/pricing` are 410-Gone / reshelled 404 per middleware
    // REMOVED_PREFIXES + CLAUDE.md §17.1). Scores and metaTag strings are
    // obviously synthetic; no real SEO metrics here.
    const pages: PageSEO[] = [
      {
        id: 'page_1',
        url: '/en/topic/wordsearch',
        title: 'Word search worksheets',
        metaTags: {
          title: 'Word search worksheets in 11 languages | LessonCraftStudio',
          description: 'Browser-playable and printable word search worksheets in 11 languages, made for K-3 multilingual classrooms.',
          keywords: ['word search', 'worksheets', 'multilingual classroom'],
          canonical: 'https://www.lessoncraftstudio.com/en/topic/wordsearch',
          ogTitle: 'Word search worksheets',
          ogDescription: 'Word search worksheets for K-3 multilingual classrooms',
          ogImage: 'https://www.lessoncraftstudio.com/og-homepage.png',
          ogUrl: 'https://www.lessoncraftstudio.com/en/topic/wordsearch'
        },
        lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        indexable: true,
        crawlable: true,
        score: 85
      },
      {
        id: 'page_2',
        url: '/en/topic/math-puzzle',
        title: 'Math puzzle worksheets',
        metaTags: {
          title: 'Math puzzle worksheets for K-3 | LessonCraftStudio',
          description: 'Printable and interactive math puzzle worksheets for K-3 classrooms. Free in 11 languages.',
          keywords: ['math puzzles', 'K-3 math', 'math worksheets'],
          canonical: 'https://www.lessoncraftstudio.com/en/topic/math-puzzle',
          ogTitle: 'Math puzzle worksheets',
          ogDescription: 'K-3 math puzzle worksheets',
          ogImage: 'https://www.lessoncraftstudio.com/og-homepage.png',
          ogUrl: 'https://www.lessoncraftstudio.com/en/topic/math-puzzle'
        },
        lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        indexable: true,
        crawlable: true,
        score: 78
      },
      {
        id: 'page_3',
        url: '/en/worksheets',
        title: 'All worksheets',
        metaTags: {
          title: 'All worksheets — K-3 in 11 languages | LessonCraftStudio',
          description: 'Free printable and interactive K-3 worksheets in 11 languages. Phonics, math, vocabulary for dual-language and international classrooms.',
          keywords: ['K-3 worksheets', '11 languages', 'multilingual classroom'],
          canonical: 'https://www.lessoncraftstudio.com/en/worksheets',
          ogTitle: 'All worksheets — K-3 in 11 languages',
          ogDescription: 'Free printable and interactive K-3 worksheets',
          ogImage: 'https://www.lessoncraftstudio.com/og-homepage.png',
          ogUrl: 'https://www.lessoncraftstudio.com/en/worksheets'
        },
        lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        indexable: true,
        crawlable: true,
        score: 92,
        issues: []
      },
      {
        id: 'page_4',
        url: '/en/about',
        title: 'About',
        metaTags: {
          title: 'About | LessonCraftStudio',
          description: 'About LessonCraftStudio — free K-3 worksheets and interactive activities in 11 languages, built for dual-language, bilingual, and international-school classrooms.',
          keywords: ['about', 'K-3', 'multilingual classroom'],
          canonical: 'https://www.lessoncraftstudio.com/en/about',
          ogTitle: 'About LessonCraftStudio',
          ogDescription: 'K-3 worksheets and activities in 11 languages',
          ogImage: 'https://www.lessoncraftstudio.com/og-homepage.png',
          ogUrl: 'https://www.lessoncraftstudio.com/en/about'
        },
        lastModified: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        indexable: true,
        crawlable: true,
        score: 88
      },
      {
        id: 'page_5',
        url: '/admin',
        title: 'Admin Dashboard',
        metaTags: {
          title: 'Admin Dashboard — LessonCraftStudio',
          description: 'Admin dashboard for managing content',
          robots: 'noindex, nofollow'
        },
        lastModified: new Date().toISOString(),
        indexable: false,
        crawlable: false
      }
    ];

    return NextResponse.json(pages);
  } catch (error) {
    console.error('Failed to get SEO pages:', error);
    return NextResponse.json(
      { error: 'Failed to get SEO pages' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/seo/pages/[id] - Update page SEO
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, update page SEO data
    console.log('Updating page SEO:', body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update page SEO:', error);
    return NextResponse.json(
      { error: 'Failed to update page SEO' },
      { status: 500 }
    );
  }
}