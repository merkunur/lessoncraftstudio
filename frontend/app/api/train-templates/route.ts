import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Use filesystem fallback directly for instant response
    const trainTemplateDir = path.join(process.cwd(), 'public', 'images', 'template', 'train');

    let templates: any[] = [];

    if (fs.existsSync(trainTemplateDir)) {
      const files = fs.readdirSync(trainTemplateDir);
      templates = files
        .filter(file => /\.(png|jpe?g|gif|svg)$/i.test(file))
        .map(file => ({
          path: `/images/template/train/${file}`,
          url: `/images/template/train/${file}`,
          name: path.basename(file, path.extname(file)).replace(/[-_]/g, ' '),
          theme: 'train'
        }));
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