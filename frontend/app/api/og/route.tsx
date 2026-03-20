import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Category metadata for badge colors
const categoryMeta: Record<string, { label: string; color: string }> = {
  math:     { label: 'Math Mastery',       color: '#3B82F6' },
  literacy: { label: 'Literacy & Language', color: '#10B981' },
  visual:   { label: 'Visual Learning',    color: '#F59E0B' },
  matching: { label: 'Matching & Sorting', color: '#8B5CF6' },
  puzzle:   { label: 'Puzzles & Logic',    color: '#EF4444' },
  search:   { label: 'Search & Find',      color: '#06B6D4' },
};

// App ID → category mapping (all 33 apps)
const appCategory: Record<string, string> = {
  'addition': 'math', 'subtraction': 'math', 'code-addition': 'math',
  'more-less': 'math', 'math-puzzle': 'math', 'math-worksheet': 'math',
  'alphabet-train': 'literacy', 'prepositions': 'literacy', 'word-guess': 'literacy',
  'word-scramble': 'literacy', 'wordsearch': 'literacy', 'cryptogram': 'literacy', 'writing': 'literacy',
  'big-small': 'visual', 'pattern-train': 'visual', 'pattern-worksheet': 'visual',
  'draw-and-color': 'visual', 'drawing-lines': 'visual', 'coloring': 'visual', 'chart-count': 'visual',
  'matching': 'matching', 'grid-match': 'matching', 'shadow-match': 'matching',
  'bingo': 'matching', 'picture-sort': 'matching',
  'missing-pieces': 'puzzle', 'odd-one-out': 'puzzle', 'sudoku': 'puzzle', 'picture-path': 'puzzle',
  'find-and-count': 'search', 'find-objects': 'search', 'crossword': 'search', 'treasure-hunt': 'search',
};

// App ID → sample folder name (for fetching preview thumbnails)
const appFolder: Record<string, string> = {
  'addition': 'addition', 'subtraction': 'subtraction', 'code-addition': 'code addition',
  'more-less': 'more less', 'math-puzzle': 'math puzzle', 'math-worksheet': 'math worksheet',
  'alphabet-train': 'alphabet train', 'prepositions': 'prepositions', 'word-guess': 'word guess',
  'word-scramble': 'word scramble', 'wordsearch': 'wordsearch', 'cryptogram': 'cryptogram', 'writing': 'writing',
  'big-small': 'big small', 'pattern-train': 'pattern train', 'pattern-worksheet': 'pattern worksheet',
  'draw-and-color': 'draw and color', 'drawing-lines': 'drawing lines', 'coloring': 'coloring', 'chart-count': 'chart count',
  'matching': 'matching', 'grid-match': 'grid match', 'shadow-match': 'shadow match',
  'bingo': 'bingo', 'picture-sort': 'picture sort',
  'missing-pieces': 'missing pieces', 'odd-one-out': 'odd one out', 'sudoku': 'sudoku', 'picture-path': 'picture path',
  'find-and-count': 'find and count', 'find-objects': 'find objects', 'crossword': 'crossword', 'treasure-hunt': 'treasure hunt',
};

// Locale → sample folder language name
const localeFolderMap: Record<string, string> = {
  en: 'english', de: 'german', fr: 'french', es: 'spanish',
  pt: 'portuguese', it: 'italian',
};

// Page type labels
const typeLabels: Record<string, string> = {
  app: 'Worksheet Generator',
  tool: 'Free Printable Tool',
  bundle: 'Generator Bundle',
  guide: 'How-To Guide',
  idea: 'Business Niche Idea',
  start: 'Getting Started Guide',
};

/**
 * Try to fetch up to 3 sample thumbnail images for an app.
 * Returns base64 data URIs for successfully fetched images.
 */
async function fetchSampleThumbnails(
  appId: string,
  locale: string,
  origin: string
): Promise<string[]> {
  const folder = appFolder[appId];
  if (!folder) return [];

  // Use locale folder if available, fall back to english
  const langFolder = localeFolderMap[locale] || 'english';
  const encodedFolder = encodeURIComponent(folder);

  // Try common sample filenames — these are the patterns used in showcase configs
  const candidates = [
    `${folder.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Fun 1.webp`,
    `${folder.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Fun 2.webp`,
    `${folder.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Fun 3.webp`,
  ];

  const results: string[] = [];

  for (const filename of candidates) {
    if (results.length >= 3) break;
    try {
      const url = `${origin}/samples/${langFolder}/${encodedFolder}/${encodeURIComponent(filename)}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const base64 = Buffer.from(buf).toString('base64');
        const contentType = res.headers.get('content-type') || 'image/webp';
        results.push(`data:${contentType};base64,${base64}`);
      }
    } catch {
      // Skip failed fetches silently
    }
  }

  return results;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const appId = searchParams.get('app') || '';
  const locale = searchParams.get('locale') || 'en';
  const type = searchParams.get('type') || 'app';
  const title = searchParams.get('title') || 'LessonCraftStudio';

  // Determine category info
  const catKey = appCategory[appId] || '';
  const cat = categoryMeta[catKey];
  const categoryLabel = cat?.label || '';
  const categoryColor = cat?.color || '#6366F1';
  const typeLabel = typeLabels[type] || '';

  // Try to fetch sample thumbnails (only for app/tool types that have samples)
  const origin = request.nextUrl.origin;
  let thumbnails: string[] = [];
  if ((type === 'app' || type === 'tool') && appId) {
    thumbnails = await fetchSampleThumbnails(appId, locale, origin);
  }

  const hasThumbnails = thumbnails.length > 0;

  const response = new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.15)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(139, 92, 246, 0.12)',
          display: 'flex',
        }} />

        {/* Main content area */}
        <div style={{
          display: 'flex',
          flex: 1,
          padding: '48px 56px',
          gap: 40,
        }}>
          {/* Left side — text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: hasThumbnails ? '1' : '1',
            maxWidth: hasThumbnails ? 650 : '100%',
          }}>
            {/* Category + type badges */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
              {categoryLabel && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 16px',
                  borderRadius: 20,
                  background: categoryColor,
                  color: '#ffffff',
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}>
                  {categoryLabel}
                </div>
              )}
              {typeLabel && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 16px',
                  borderRadius: 20,
                  background: 'rgba(255,255,255,0.15)',
                  color: '#c7d2fe',
                  fontSize: 16,
                  fontWeight: 600,
                }}>
                  {typeLabel}
                </div>
              )}
            </div>

            {/* Title */}
            <div style={{
              fontSize: title.length > 60 ? 36 : title.length > 40 ? 42 : 48,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: 24,
              display: 'flex',
              flexWrap: 'wrap',
            }}>
              {title}
            </div>

            {/* Feature pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Print-Ready PDF', '11 Languages', '100+ Themes'].map((pill) => (
                <div key={pill} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.1)',
                  color: '#a5b4fc',
                  fontSize: 14,
                  fontWeight: 500,
                }}>
                  <span style={{ color: '#34d399' }}>✓</span>
                  {pill}
                </div>
              ))}
            </div>
          </div>

          {/* Right side — sample thumbnails (if available) */}
          {hasThumbnails && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}>
              {thumbnails.map((src, i) => (
                <div key={i} style={{
                  display: 'flex',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  border: '3px solid rgba(255,255,255,0.2)',
                  transform: i === 1 ? 'translateY(-16px)' : i === 2 ? 'translateY(8px)' : 'none',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    width={140}
                    height={198}
                    style={{ objectFit: 'cover', width: 140, height: 198 }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom branding bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 56px',
          background: 'rgba(0,0,0,0.25)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            {/* Logo mark */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #818cf8, #6366f1)',
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 800,
            }}>
              LC
            </div>
            <span style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#e0e7ff',
            }}>
              LessonCraftStudio
            </span>
          </div>
          <span style={{
            fontSize: 15,
            color: '#a5b4fc',
          }}>
            lessoncraftstudio.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );

  // Cache for 24 hours
  response.headers.set(
    'Cache-Control',
    'public, max-age=86400, s-maxage=86400, immutable'
  );

  return response;
}
