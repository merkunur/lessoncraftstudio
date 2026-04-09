import { NextRequest, NextResponse } from 'next/server';
import { productPageSlugs } from '@/config/product-page-slugs';
import { bundlePageSlugs } from '@/config/bundle-page-slugs';
import { startPageSlugs } from '@/config/start-page-slugs';
import { guidePageSlugs } from '@/config/guide-page-slugs';
import { ideaPageSlugs } from '@/config/idea-page-slugs';
import { blogPageSlugs } from '@/config/blog-page-slugs';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { ALL_APPS } from '@/config/products';
import type { AppId } from '@/config/products';
import { getLocalizedAppName } from '@/config/app-translations';
import { imgUrl } from '@/config/showcase-i18n';
import { encodeImagePath } from '@/lib/encode-image-path';
import {
  getAppImageEntries,
  getBundleImageEntries,
  getStartImageEntries,
  getGuideImageEntries,
  getIdeaImageEntries,
  getBlogImageEntries,
  type ImageSitemapEntry,
} from '@/lib/image-sitemap-data';

const baseUrl = 'https://www.lessoncraftstudio.com';
const allLocales = [...SUPPORTED_LOCALES];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildImageXml(images: ImageSitemapEntry[]): string {
  return images.map(img =>
    `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
      <image:license>${escapeXml(img.license)}</image:license>
    </image:image>`
  ).join('\n');
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const urlEntries: string[] = [];

  // ID 1: App detail pages (33 apps × 11 locales)
  if (id === 1) {
    for (const app of productPageSlugs) {
      for (const locale of allLocales) {
        const slug = app.slugs[locale as keyof typeof app.slugs];
        if (!slug) continue;
        const images = await getAppImageEntries(app.appId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/apps/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 3: Tool pages — removed from image sitemap (canonical to /apps/)
  // Return empty urlset to prevent 404 if Google has cached the old URL

  // ID 4: Bundle pages (6 bundles × 11 locales)
  if (id === 4) {
    for (const bundle of bundlePageSlugs) {
      for (const locale of allLocales) {
        const slug = bundle.slugs[locale as keyof typeof bundle.slugs];
        if (!slug) continue;
        const images = await getBundleImageEntries(bundle.bundleId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/bundles/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 5: Start pages (cornerstone guides × 11 locales)
  if (id === 5) {
    for (const start of startPageSlugs) {
      for (const locale of allLocales) {
        const slug = start.slugs[locale as keyof typeof start.slugs];
        if (!slug) continue;
        const images = await getStartImageEntries(start.startId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/start/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 6: Guide pages (how-to guides × 11 locales)
  if (id === 6) {
    for (const guide of guidePageSlugs) {
      for (const locale of allLocales) {
        const slug = guide.slugs[locale as keyof typeof guide.slugs];
        if (!slug) continue;
        const images = await getGuideImageEntries(guide.guideId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/guides/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 7: Idea pages (niche ideas × 11 locales)
  if (id === 7) {
    for (const idea of ideaPageSlugs) {
      for (const locale of allLocales) {
        const slug = idea.slugs[locale as keyof typeof idea.slugs];
        if (!slug) continue;
        const images = await getIdeaImageEntries(idea.ideaId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/ideas/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 10: Gallery page (1 page × 11 locales, 33 images each)
  if (id === 10) {
    const galleryHeroFiles: Record<string, string> = {
      'addition': 'addition-fun-1.webp', 'subtraction': 'subtraction-fun-1.webp',
      'code-addition': 'code-breaker-addition-1.webp', 'more-less': 'more-less-10.webp',
      'math-puzzle': 'math-puzzles.webp', 'math-worksheet': 'math-worksheet-10.webp',
      'alphabet-train': 'alphabet-train-1.webp', 'prepositions': 'prepositions-worksheet-1.webp',
      'word-guess': 'clue-grid-worksheet.webp', 'word-scramble': 'word-scramble-portrait.webp',
      'wordsearch': 'word-search-1.webp', 'cryptogram': 'cryptogram-worksheet.webp',
      'writing': 'writing.webp', 'big-small': 'big-small-worksheet-worksheet.webp',
      'pattern-train': 'pattern-train-worksheet.webp', 'pattern-worksheet': 'pattern-worksheet.webp',
      'draw-and-color': 'grid-drawing-worksheet.webp', 'drawing-lines': 'drawing-lines-horizontal.webp',
      'coloring': 'coloring-portrait-1.webp', 'chart-count': 'chart-count.webp',
      'matching': 'matching-portrait.webp', 'grid-match': 'grid-match.webp',
      'shadow-match': 'shadow-match-worksheet.webp', 'bingo': 'bingo-card.webp',
      'picture-sort': 'picture-sort.webp', 'missing-pieces': 'missing-pieces.webp',
      'odd-one-out': 'find-the-odd-one-out.webp', 'sudoku': 'sudoku-worksheet.webp',
      'picture-path': 'picture-pathway.webp', 'find-and-count': 'find-and-count-portrait.webp',
      'find-objects': 'spotworks-worksheet.webp', 'crossword': 'crossword-worksheet.webp',
      'treasure-hunt': 'treasure-hunt-1.webp',
    };
    const galleryFolders: Record<string, string> = {
      'addition': 'addition', 'subtraction': 'subtraction', 'code-addition': 'code addition',
      'more-less': 'more less', 'math-puzzle': 'math puzzle', 'math-worksheet': 'math worksheet',
      'alphabet-train': 'alphabet train', 'prepositions': 'prepositions', 'word-guess': 'word guess',
      'word-scramble': 'word scramble', 'wordsearch': 'wordsearch', 'cryptogram': 'cryptogram',
      'writing': 'writing', 'big-small': 'big small', 'pattern-train': 'pattern train',
      'pattern-worksheet': 'pattern worksheet', 'draw-and-color': 'draw and color',
      'drawing-lines': 'drawing lines', 'coloring': 'coloring', 'chart-count': 'chart count',
      'matching': 'matching', 'grid-match': 'grid match', 'shadow-match': 'shadow match',
      'bingo': 'bingo', 'picture-sort': 'picture sort', 'missing-pieces': 'missing pieces',
      'odd-one-out': 'odd one out', 'sudoku': 'sudoku', 'picture-path': 'picture path',
      'find-and-count': 'find and count', 'find-objects': 'find objects', 'crossword': 'crossword',
      'treasure-hunt': 'treasure hunt',
    };
    const appIds = Object.keys(ALL_APPS) as AppId[];
    for (const locale of allLocales) {
      const images: ImageSitemapEntry[] = [];
      for (const appId of appIds) {
        const folder = galleryFolders[appId] || appId;
        const filename = galleryHeroFiles[appId];
        if (!filename) continue;
        const src = imgUrl(folder, filename, locale);
        const name = getLocalizedAppName(appId, locale);
        images.push({
          loc: `${baseUrl}${encodeImagePath(src)}`,
          title: `${name} printable worksheet sample`,
          caption: `${name} printable worksheet sample`,
          license: `${baseUrl}/${locale}/license`,
        });
      }
      if (images.length > 0) {
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/gallery</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 9: Blog pages (112 posts × 11 locales)
  if (id === 9) {
    for (const blog of blogPageSlugs) {
      for (const locale of allLocales) {
        const slug = blog.slugs[locale as keyof typeof blog.slugs];
        if (!slug) continue;
        const images = getBlogImageEntries(blog.blogId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/blog/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
