import { NextRequest, NextResponse } from 'next/server';
import { PageSEO } from '@/types/seo';

export const dynamic = 'force-dynamic';

// GET /api/admin/seo/pages - Get all pages with SEO data
export async function GET(request: NextRequest) {
  try {
    // Mock pages data for development
    const pages: PageSEO[] = [
      {
        id: 'page_1',
        url: '/worksheets/word-search',
        title: 'Word Search Generator',
        metaTags: {
          title: 'Word Search Puzzle Generator - Create Custom Word Searches',
          description: 'Create custom word search puzzles for education and fun. Perfect for teachers and parents.',
          keywords: ['word search', 'puzzle generator', 'educational games'],
          canonical: 'https://lessoncraftstudio.com/worksheets/word-search',
          ogTitle: 'Word Search Puzzle Generator',
          ogDescription: 'Create custom word search puzzles instantly',
          ogImage: 'https://lessoncraftstudio.com/images/word-search-og.png',
          ogUrl: 'https://lessoncraftstudio.com/worksheets/word-search'
        },
        lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        indexable: true,
        crawlable: true,
        score: 85
      },
      {
        id: 'page_2',
        url: '/worksheets/math-puzzles',
        title: 'Math Puzzle Worksheets',
        metaTags: {
          title: 'Math Puzzle Worksheets - Fun Mathematics Practice',
          description: 'Generate engaging math puzzles for students. Addition, subtraction, multiplication practice.',
          keywords: ['math puzzles', 'math worksheets', 'educational math'],
          canonical: 'https://lessoncraftstudio.com/worksheets/math-puzzles',
          ogTitle: 'Math Puzzle Worksheets',
          ogDescription: 'Fun mathematics practice for students',
          ogImage: 'https://lessoncraftstudio.com/images/math-puzzles-og.png',
          ogUrl: 'https://lessoncraftstudio.com/worksheets/math-puzzles'
        },
        lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        indexable: true,
        crawlable: true,
        score: 78
      },
      {
        id: 'page_3',
        url: '/pricing',
        title: 'Pricing Plans',
        metaTags: {
          title: 'Pricing - Affordable Plans for Educators | LessonCraftStudio',
          description: 'Choose the perfect plan for your educational needs. Free trial available.',
          keywords: ['pricing', 'subscription', 'educational software pricing'],
          canonical: 'https://lessoncraftstudio.com/pricing',
          ogTitle: 'LessonCraftStudio Pricing',
          ogDescription: 'Affordable plans for educators and parents',
          ogImage: 'https://lessoncraftstudio.com/images/pricing-og.png',
          ogUrl: 'https://lessoncraftstudio.com/pricing'
        },
        lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        indexable: true,
        crawlable: true,
        score: 92,
        issues: []
      },
      {
        id: 'page_4',
        url: '/about',
        title: 'About Us',
        metaTags: {
          title: 'About LessonCraftStudio - Your Educational Partner',
          description: 'Learn about our mission to make education more engaging and accessible.',
          keywords: ['about', 'educational technology', 'teaching resources'],
          canonical: 'https://lessoncraftstudio.com/about',
          ogTitle: 'About LessonCraftStudio',
          ogDescription: 'Making education more engaging',
          ogImage: 'https://lessoncraftstudio.com/images/about-og.png',
          ogUrl: 'https://lessoncraftstudio.com/about'
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
          title: 'Admin Dashboard - LessonCraftStudio',
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