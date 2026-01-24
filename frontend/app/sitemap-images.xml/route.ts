import { productPageSlugs } from '@/config/product-page-slugs';

export const revalidate = 1800; // 30 minutes ISR

const localeToFolder: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  pt: 'portuguese',
  it: 'italian',
  nl: 'dutch',
  sv: 'swedish',
  da: 'danish',
  no: 'norwegian',
  fi: 'finnish',
};

// CRITICAL: Maps appId from productPageSlugs to actual folder name in /samples/
// These 9 appIds differ from folder names - verified against productPageSlugs:
const appIdToFolder: Record<string, string> = {
  // 9 CORRECTED mappings (appId → folder)
  'word-search': 'wordsearch',
  'image-addition': 'addition',
  'matching-app': 'matching',
  'picture-bingo': 'bingo',
  'big-small-app': 'big-small',
  'chart-count-color': 'chart-count',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'writing-app': 'writing',
  // 24 unchanged (appId matches folder name)
  'subtraction': 'subtraction',
  'math-worksheet': 'math',
  'pattern-worksheet': 'pattern',
  'word-scramble': 'word-scramble',
  'word-guess': 'word-guess',
  'alphabet-train': 'alphabet-train',
  'prepositions': 'prepositions',
  'coloring': 'coloring',
  'sudoku': 'sudoku',
  'treasure-hunt': 'treasure-hunt',
  'odd-one-out': 'odd-one-out',
  'picture-path': 'picture-path',
  'pattern-train': 'pattern-train',
  'draw-and-color': 'draw-and-color',
  'drawing-lines': 'drawing-lines',
  'find-and-count': 'find-and-count',
  'find-objects': 'find-objects',
  'grid-match': 'grid-match',
  'math-puzzle': 'math-puzzle',
  'missing-pieces': 'missing-pieces',
  'more-less': 'more-less',
  'picture-sort': 'picture-sort',
  'shadow-match': 'shadow-match',
  'code-addition': 'code-addition',
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';

  let urls = '';

  for (const app of productPageSlugs) {
    const appFolder = appIdToFolder[app.appId] || app.appId;

    for (const [locale, slug] of Object.entries(app.slugs)) {
      if (!slug) continue;

      const languageFolder = localeToFolder[locale] || 'english';
      const pageUrl = `${baseUrl}/${locale}/apps/${slug}`;

      // Generate image URLs for samples - actual files use sample-1.jpeg, sample-2.jpeg pattern
      const images = [
        `${baseUrl}/samples/${languageFolder}/${appFolder}/sample-1.jpeg`,
        `${baseUrl}/samples/${languageFolder}/${appFolder}/sample-2.jpeg`,
      ];

      const imageXml = images
        .map(img => `    <image:image>\n      <image:loc>${escapeXml(img)}</image:loc>\n    </image:image>`)
        .join('\n');

      urls += `  <url>\n    <loc>${escapeXml(pageUrl)}</loc>\n${imageXml}\n  </url>\n`;
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800',
    },
  });
}
