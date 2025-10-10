import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// Save or update PDF metadata including translations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, fileName, metadata } = body;

    if (!slug || !fileName || !metadata) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create metadata directory if it doesn't exist
    const metadataDir = path.join(process.cwd(), 'data', 'blog', 'pdf-metadata', slug);
    await fs.mkdir(metadataDir, { recursive: true });

    // Save metadata as JSON file
    const metadataPath = path.join(metadataDir, `${fileName}.json`);
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'PDF metadata saved successfully'
    });

  } catch (error) {
    console.error('Error saving PDF metadata:', error);
    return NextResponse.json(
      { error: 'Failed to save PDF metadata' },
      { status: 500 }
    );
  }
}

// Get PDF metadata
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const fileName = searchParams.get('fileName');

    if (!slug || !fileName) {
      return NextResponse.json(
        { error: 'Missing slug or fileName' },
        { status: 400 }
      );
    }

    const metadataPath = path.join(
      process.cwd(),
      'data',
      'blog',
      'pdf-metadata',
      slug,
      `${fileName}.json`
    );

    try {
      const metadata = await fs.readFile(metadataPath, 'utf-8');
      return NextResponse.json(JSON.parse(metadata));
    } catch {
      // Return default metadata if file doesn't exist
      return NextResponse.json({
        translations: {
          en: { title: '', description: '' },
          de: { title: '', description: '' },
          fr: { title: '', description: '' },
          es: { title: '', description: '' },
          pt: { title: '', description: '' },
          it: { title: '', description: '' },
          nl: { title: '', description: '' },
          sv: { title: '', description: '' },
          da: { title: '', description: '' },
          no: { title: '', description: '' },
          fi: { title: '', description: '' }
        }
      });
    }

  } catch (error) {
    console.error('Error fetching PDF metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PDF metadata' },
      { status: 500 }
    );
  }
}