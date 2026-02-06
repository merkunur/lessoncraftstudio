import { productPageSlugs } from '@/config/product-page-slugs';
import fs from 'fs/promises';
import path from 'path';

export const revalidate = 3600; // 1 hour ISR

// Base path for samples (filesystem scanning)
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

// Locale to language folder mapping
const localeToFolder: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  it: 'italian',
  pt: 'portuguese',
  nl: 'dutch',
  da: 'danish',
  sv: 'swedish',
  no: 'norwegian',
  fi: 'finnish',
};

// Map appId \u2192 folder name in /samples/
const appIdToFolderName: Record<string, string> = {
  'word-search': 'wordsearch',
  'image-addition': 'addition',
  'alphabet-train': 'alphabet train',
  'coloring': 'coloring',
  'math-worksheet': 'math worksheet',
  'word-scramble': 'word scramble',
  'find-and-count': 'find and count',
  'matching-app': 'matching',
  'drawing-lines': 'drawing lines',
  'picture-bingo': 'bingo',
  'sudoku': 'sudoku',
  'big-small-app': 'big small',
  'chart-count-color': 'chart count',
  'code-addition': 'code addition',
  'draw-and-color': 'draw and color',
  'find-objects': 'find objects',
  'grid-match': 'grid match',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'math-puzzle': 'math puzzle',
  'missing-pieces': 'missing pieces',
  'more-less': 'more less',
  'odd-one-out': 'odd one out',
  'pattern-train': 'pattern train',
  'pattern-worksheet': 'pattern worksheet',
  'picture-path': 'picture path',
  'picture-sort': 'picture sort',
  'prepositions': 'prepositions',
  'shadow-match': 'shadow match',
  'subtraction': 'subtraction',
  'treasure-hunt': 'treasure hunt',
  'word-guess': 'word guess',
  'writing-app': 'writing',
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';

  let urls = '';

  for (const app of productPageSlugs) {
    const folderName = appIdToFolderName[app.appId];
    if (!folderName) continue;

    for (const [locale, slug] of Object.entries(app.slugs)) {
      if (!slug) continue;

      const language = localeToFolder[locale];
      if (!language) continue;

      const dir = path.join(SAMPLES_BASE, language, folderName);

      let files: string[];
      try {
        files = await fs.readdir(dir);
      } catch {
        continue;
      }

      // Find all PDF files
      const pdfFiles = files.filter(f => /\.pdf$/i.test(f)).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true })
      );

      for (const pdfFile of pdfFiles) {
        const pdfUrl = `${baseUrl}/samples/${language}/${folderName}/${pdfFile}`.replace(/ /g, '%20');
        urls += `  <url>\n    <loc>${escapeXml(pdfUrl)}</loc>\n  </url>\n`;
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
