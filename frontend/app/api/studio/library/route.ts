import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireStudioSubscriber } from '@/lib/studio/story-gate';
import { STUDIO_IMAGE_LIBRARY_THEMES_DIR } from '@/lib/studio/paths';

// Story Studio tenancy — the props library index (the worksheet-generator
// image library, grouped by theme). Ports the local studio-server's
// libraryIndex(): skips B&W themes + BACKGROUNDS/BORDERS, lists @2x.webp
// nouns. Phase B replaces this with the static
// /mini-tools/storybook-library/props-manifest.json; kept as the dynamic
// fallback until then.

export const dynamic = 'force-dynamic';

function isBWTheme(name: string): boolean {
  return /\bbw(\s*\d+)?$/i.test(name.trim());
}

interface LibraryCache {
  at: number;
  data: { themes: Array<{ theme: string; count: number; nouns: string[] }> };
}
let cache: LibraryCache | null = null;
const CACHE_MS = 10 * 60 * 1000;

function buildIndex() {
  const themes: Array<{ theme: string; count: number; nouns: string[] }> = [];
  const root = STUDIO_IMAGE_LIBRARY_THEMES_DIR;
  if (!fs.existsSync(root)) return { themes };
  for (const t of fs.readdirSync(root)) {
    const dir = path.join(root, t);
    try {
      if (!fs.statSync(dir).isDirectory()) continue;
    } catch {
      continue;
    }
    if (isBWTheme(t)) continue;
    if (/^(BACKGROUNDS|BORDERS)$/i.test(t)) continue;
    const files = fs.readdirSync(dir).filter(f => /@2x\.webp$/i.test(f));
    if (!files.length) continue;
    themes.push({
      theme: t,
      count: files.length,
      nouns: files.map(f => f.replace(/@2x\.webp$/i, '')).sort(),
    });
  }
  themes.sort((a, b) => a.theme.localeCompare(b.theme));
  return { themes };
}

export async function GET(request: NextRequest) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const refresh = new URL(request.url).searchParams.get('refresh') === '1';
  if (!cache || refresh || Date.now() - cache.at > CACHE_MS) {
    cache = { at: Date.now(), data: buildIndex() };
  }
  return NextResponse.json(cache.data, { headers: { 'Cache-Control': 'no-store' } });
}
