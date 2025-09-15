import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'lcsuser',
  password: 'lcspass123!',
  host: 'localhost',
  port: 5432,
  database: 'lessoncraftstudio',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const locale = searchParams.get('locale') || 'en';

  try {
    let query = `
      SELECT
        bg.id,
        bg.file_name,
        bg.image_file,
        bg.translations,
        df.filename_disk,
        df.storage
      FROM background_images bg
      LEFT JOIN directus_files df ON bg.image_file = df.id::text
      WHERE bg.status = 'active'
    `;

    const result = await pool.query(query);

    // Get unique themes from the data
    const themes = [...new Set(result.rows.map(row => {
      // Extract theme from file_name or use a default categorization
      return row.file_name || 'default';
    }))];

    // If requesting themes list
    if (searchParams.get('list') === 'themes') {
      return NextResponse.json(themes);
    }

    // Format the response
    const backgrounds = result.rows.map(row => {
      const translations = row.translations || {};
      const displayName = translations[locale] || translations['en'] || row.file_name;

      return {
        id: row.id,
        name: displayName,
        originalName: row.file_name,
        path: row.filename_disk ? `/api/directus-image/${row.filename_disk}` : null,
        theme: theme || 'default',
        translations: row.translations
      };
    });

    // Filter by theme if specified
    const filteredBackgrounds = theme && theme !== 'all'
      ? backgrounds.filter(b => b.theme === theme)
      : backgrounds;

    return NextResponse.json({
      images: filteredBackgrounds,
      themes: themes
    });

  } catch (error) {
    console.error('Error fetching backgrounds from Directus:', error);
    return NextResponse.json(
      { error: 'Failed to fetch backgrounds from database' },
      { status: 500 }
    );
  }
}