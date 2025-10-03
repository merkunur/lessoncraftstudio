import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Use filesystem fallback directly for instant response
    const bordersDir = path.join(process.cwd(), 'public', 'images', 'borders');

    let themes: any[] = [];

    if (fs.existsSync(bordersDir)) {
      const files = fs.readdirSync(bordersDir, { withFileTypes: true });
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
    console.error('Error fetching border themes:', error);
    return NextResponse.json([], {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
}
