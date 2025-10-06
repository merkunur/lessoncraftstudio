import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Read metadata file
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'train-templates-metadata.json');

    let templates: any[] = [];

    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

      // Extract all images from all themes
      if (metadata.themes && Array.isArray(metadata.themes)) {
        templates = metadata.themes.flatMap((theme: any) => {
          if (!theme.images || !Array.isArray(theme.images)) {
            return [];
          }

          return theme.images.map((img: any) => ({
            path: img.path,
            url: img.path,
            name: img.translations?.[locale] || img.displayName || img.filename,
            theme: theme.name,
            themeName: theme.displayNames?.[locale] || theme.name
          }));
        });
      }
    }

    return NextResponse.json(templates, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching train templates:', error);
    return NextResponse.json([], {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
}
