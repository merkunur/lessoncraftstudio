import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  try {
    // Read from local JSON file
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'borders-metadata.json');

    let themes = [];

    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      themes = metadata.themes
        .filter(theme => theme.active)
        .map(theme => ({
          value: theme.name,
          displayName: theme.displayNames[locale] || theme.displayNames['en'] || theme.name
        }))
        .sort((a, b) => {
          const themeA = metadata.themes.find(t => t.name === a.value);
          const themeB = metadata.themes.find(t => t.name === b.value);
          return (themeA?.sortOrder || 0) - (themeB?.sortOrder || 0);
        });
    }

    // If no themes found, use minimal fallback
    if (themes.length === 0) {
      themes = [
        { value: 'spring', displayName: 'Spring' },
        { value: 'math', displayName: 'Math' }
      ];
    }

    return NextResponse.json(themes, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      },
    });
  } catch (error) {
    console.error('Error fetching border themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch border themes' },
      { status: 500 }
    );
  }
}