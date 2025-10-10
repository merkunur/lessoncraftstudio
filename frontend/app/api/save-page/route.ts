import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { language, pageName, content } = await request.json();

    // Validate inputs
    if (!language || !pageName || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize page name
    const safeName = pageName.replace(/[^a-z0-9-_]/gi, '').toLowerCase();

    // Create directory if it doesn't exist
    const dirPath = path.join(process.cwd(), 'public', 'static-pages', language, 'pages');
    await fs.mkdir(dirPath, { recursive: true });

    // Save the file
    const filePath = path.join(dirPath, `${safeName}.html`);
    await fs.writeFile(filePath, content, 'utf8');

    // Return success with the URL
    return NextResponse.json({
      success: true,
      message: `Page saved successfully`,
      url: `/static/${language}/${safeName}`,
      path: filePath
    });

  } catch (error) {
    console.error('Error saving page:', error);
    return NextResponse.json(
      { error: 'Failed to save page' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    // Get all pages for the specified language
    const dirPath = path.join(process.cwd(), 'public', 'static-pages', language, 'pages');

    try {
      const files = await fs.readdir(dirPath);
      const pages = files
        .filter(file => file.endsWith('.html'))
        .map(file => ({
          name: file.replace('.html', ''),
          url: `/static/${language}/${file.replace('.html', '')}`,
          file: file
        }));

      return NextResponse.json({
        language,
        pages,
        count: pages.length
      });

    } catch (error) {
      // Directory doesn't exist yet
      return NextResponse.json({
        language,
        pages: [],
        count: 0
      });
    }

  } catch (error) {
    console.error('Error listing pages:', error);
    return NextResponse.json(
      { error: 'Failed to list pages' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');
    const pageName = searchParams.get('page');

    if (!language || !pageName) {
      return NextResponse.json(
        { error: 'Missing language or page parameter' },
        { status: 400 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      'public',
      'static-pages',
      language,
      'pages',
      `${pageName}.html`
    );

    await fs.unlink(filePath);

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}