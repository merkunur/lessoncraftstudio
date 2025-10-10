import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { slug, locale } = await request.json();

    if (!slug || !locale) {
      return NextResponse.json(
        { error: 'Missing required fields: slug and locale' },
        { status: 400 }
      );
    }

    // Delete the HTML file for the specified language
    const filePath = path.join(process.cwd(), 'public', 'blog', locale, `${slug}.html`);

    try {
      await fs.unlink(filePath);
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    // Also try to delete associated sample worksheets if this is the last language version
    try {
      const samplesDir = path.join(process.cwd(), 'public', 'blog', 'samples', slug);
      await fs.rmdir(samplesDir, { recursive: true });
    } catch (error) {
      // Ignore if directory doesn't exist
    }

    // Invalidate cache
    await fetch(`${request.nextUrl.origin}/api/blog/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'invalidate-cache' })
    });

    return NextResponse.json({
      success: true,
      message: `Blog post ${slug} deleted for ${locale}`,
      deletedFile: `/blog/${locale}/${slug}.html`
    });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete blog post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}