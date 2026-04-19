import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/design-elements/list
 *
 * Query params:
 *   category   (optional) - filter to single category (e.g. "patterns")
 *   locale     (optional) - language code for translations (default "en")
 *
 * Returns:
 *   {
 *     total: number,
 *     items: [
 *       {
 *         id, slug, category, filename, filePath, url,
 *         name, tags,
 *         defaultPlacement, defaultScale, tintable, sortOrder
 *       }
 *     ],
 *     palettes: [{ name, colors }]  // only when no category filter (full manifest)
 *   }
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const locale = searchParams.get('locale') || 'en';

  try {
    const where: any = { isActive: true };
    if (category) where.category = category;

    const rows = await prisma.designElement.findMany({
      where,
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }]
    });

    const items = rows.map(r => {
      const translations = (r.translations as Record<string, string>) || {};
      const name = translations[locale] || translations.en || r.slug;
      return {
        id: r.id,
        slug: r.slug,
        category: r.category,
        filename: r.filename,
        filePath: r.filePath,
        url: `/design-elements/${r.filePath}`,   // served by nginx directly
        name,
        tags: r.tags,
        defaultPlacement: r.defaultPlacement,
        defaultScale: r.defaultScale,
        tintable: r.tintable,
        sortOrder: r.sortOrder
      };
    });

    // Include palettes in the full-manifest response (no category filter)
    let palettes: any = undefined;
    if (!category) {
      try {
        const fs = await import('fs/promises');
        const palettesPath = '/var/www/lcs-media/design-elements/palettes.json';
        const palettesData = await fs.readFile(palettesPath, 'utf-8');
        palettes = JSON.parse(palettesData);
      } catch (e) {
        // fallback to local path (for dev)
        try {
          const fs = await import('fs/promises');
          const path = await import('path');
          const palettesPath = path.resolve(process.cwd(), '..', 'design-elements-library', 'palettes.json');
          const palettesData = await fs.readFile(palettesPath, 'utf-8');
          palettes = JSON.parse(palettesData);
        } catch {
          palettes = [];
        }
      }
    }

    return NextResponse.json({
      total: items.length,
      items,
      ...(palettes ? { palettes } : {})
    });
  } catch (err: any) {
    console.error('[design-elements/list]', err);
    return NextResponse.json(
      { error: 'Failed to fetch design elements', detail: err.message },
      { status: 500 }
    );
  }
}
