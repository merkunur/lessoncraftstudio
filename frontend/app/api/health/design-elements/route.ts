import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const BASE = IS_PRODUCTION
  ? '/var/www/lcs-media/design-elements'
  : path.resolve(process.cwd(), '..', 'design-elements-library');
const THRESHOLD = 70;

const CATEGORIES = [
  'patterns', 'textures', 'frames', 'corners', 'banners', 'dividers',
  'badges', 'title-banners', 'accents', 'scatter-packs', 'footers'
];

async function countSvgsInDir(dir: string): Promise<number> {
  try {
    const entries = await fs.readdir(dir);
    let n = 0;
    for (const e of entries) if (e.endsWith('.svg')) n++;
    return n;
  } catch {
    return 0;
  }
}

export async function GET() {
  const result: any = {
    status: 'unhealthy',
    total: 0,
    byCategory: {} as Record<string, number>,
    dbRowCount: 0,
    palettesCount: 0,
    fileCountMatchesDbCount: false,
    threshold: THRESHOLD,
    lastChecked: new Date().toISOString()
  };

  try {
    // File counts per category
    let fileTotal = 0;
    for (const cat of CATEGORIES) {
      const n = await countSvgsInDir(path.join(BASE, cat));
      result.byCategory[cat] = n;
      fileTotal += n;
    }
    result.total = fileTotal;

    // Palettes
    try {
      const raw = await fs.readFile(path.join(BASE, 'palettes.json'), 'utf8');
      const arr = JSON.parse(raw);
      result.palettesCount = Array.isArray(arr) ? arr.length : 0;
    } catch {
      result.palettesCount = 0;
    }

    // DB count
    try {
      result.dbRowCount = await prisma.designElement.count({ where: { isActive: true } });
    } catch {
      result.dbRowCount = 0;
    }

    result.fileCountMatchesDbCount = fileTotal === result.dbRowCount;

    if (fileTotal < THRESHOLD || result.dbRowCount < THRESHOLD) {
      result.status = 'unhealthy';
    } else if (!result.fileCountMatchesDbCount) {
      result.status = 'degraded';
    } else {
      result.status = 'healthy';
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[health/design-elements]', err);
    result.status = 'unhealthy';
    result.error = err.message;
    return NextResponse.json(result, { status: 500 });
  }
}
