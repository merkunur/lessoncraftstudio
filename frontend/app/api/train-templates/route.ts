import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Read from local JSON file
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'train-templates-metadata.json');

    if (!fs.existsSync(metadataPath)) {
      // Return default templates if metadata doesn't exist
      return NextResponse.json([
        {
          path: '/images/train_templates/briefcase.png',
          name: 'Briefcase Train',
          url: '/images/train_templates/briefcase.png'
        },
        {
          path: '/images/train_templates/star.png',
          name: 'Star Train',
          url: '/images/train_templates/star.png'
        }
      ]);
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    // Transform the data to the expected format
    const templates = metadata.templates.map(template => ({
      path: template.path,
      url: template.path,
      name: template.translations?.[locale] || template.translations?.['en'] || template.displayName || template.name
    }));

    console.log(`Train templates API - locale=${locale}, count=${templates.length}`);

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching train templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch train templates' },
      { status: 500 }
    );
  }
}