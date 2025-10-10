import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';

  if (!theme) {
    return NextResponse.json({ error: 'A valid border theme is required' }, { status: 400 });
  }

  try {
    // Use filesystem fallback directly for instant response
    const themeDir = path.join(process.cwd(), 'public', 'images', 'borders', theme);

    let images: any[] = [];

    if (fs.existsSync(themeDir)) {
      const files = fs.readdirSync(themeDir);
      images = files
        .filter(file => /\.(png|jpe?g|gif|svg)$/i.test(file))
        .map(file => ({
          name: path.basename(file, path.extname(file)).replace(/[-_]/g, ' '),
          path: `/images/borders/${theme}/${file}`
        }));
    }

    return NextResponse.json(images, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (err: any) {
    console.error('Error fetching border images:', err);
    return NextResponse.json([], {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
}
