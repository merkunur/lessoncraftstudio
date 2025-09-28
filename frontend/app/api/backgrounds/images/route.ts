import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');

  if (!theme) {
    return NextResponse.json({ error: 'A valid background theme is required' }, { status: 400 });
  }

  try {
    // Read from local JSON file
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'backgrounds-metadata.json');

    let backgrounds = [];

    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      const themeData = metadata.themes.find(t => t.name === theme);

      if (themeData && themeData.images) {
        backgrounds = themeData.images.map(img => ({
          name: img.displayName || img.id,
          path: img.path
        }));
      }
    }

    console.log(`Fetching backgrounds for theme: ${theme}, count: ${backgrounds.length}`);

    return NextResponse.json({
      images: backgrounds
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      },
    });
  } catch (err: any) {
    console.error('Error fetching background images:', err);
    return NextResponse.json(
      { error: 'Failed to fetch background images' },
      { status: 500 }
    );
  }
}