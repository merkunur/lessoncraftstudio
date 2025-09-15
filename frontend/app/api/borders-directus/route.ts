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
        bi.id,
        bi.file_name,
        bi.image_file,
        bi.translations,
        df.filename_disk,
        df.storage
      FROM border_images bi
      LEFT JOIN directus_files df ON bi.image_file = df.id::text
      WHERE bi.status = 'active'
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
    const borders = result.rows.map(row => {
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
    const filteredBorders = theme && theme !== 'all'
      ? borders.filter(b => b.theme === theme)
      : borders;

    return NextResponse.json({
      images: filteredBorders,
      themes: themes
    });

  } catch (error) {
    console.error('Error fetching borders from Directus:', error);
    return NextResponse.json(
      { error: 'Failed to fetch borders from database' },
      { status: 500 }
    );
  }
}