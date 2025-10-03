import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Use filesystem fallback directly for instant response
    const backgroundsDir = path.join(process.cwd(), 'public', 'images', 'backgrounds');

    let themes: any[] = [];

    if (fs.existsSync(backgroundsDir)) {
      const files = fs.readdirSync(backgroundsDir, { withFileTypes: true });
      themes = files
        .filter(file => file.isDirectory())
        .map(file => ({
          value: file.name,
          displayName: file.name.charAt(0).toUpperCase() + file.name.slice(1)
        }));
    }

    return NextResponse.json(themes, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching background themes:', error);
    return NextResponse.json([], {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
}
