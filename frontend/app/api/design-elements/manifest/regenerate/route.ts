import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const execFileAsync = promisify(execFile);

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SERVER_PATH = '/var/www/lcs-media/design-elements/manifest.json';
const DEV_PATH = path.resolve(process.cwd(), '..', 'design-elements-library', 'manifest.json');
const UPDATE_SCRIPT = '/var/www/lcs-media/scripts/update-design-element.sh';

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const rows = await prisma.designElement.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }]
    });

    const items = rows.map(r => {
      const translations = (r.translations as Record<string, string>) || {};
      return {
        category: r.category,
        slug: r.slug,
        filename: r.filename,
        file_path: r.filePath,
        name_en: translations.en || r.slug,
        sort_order: r.sortOrder,
        size_bytes: r.fileSize ?? 0
      };
    });

    const manifest = {
      extractedAt: new Date().toISOString(),
      source: 'database',
      count: items.length,
      items
    };

    const json = JSON.stringify(manifest, null, 2);

    if (IS_PRODUCTION) {
      const tmpPath = path.join(os.tmpdir(), `manifest-${crypto.randomBytes(6).toString('hex')}.json`);
      await fs.writeFile(tmpPath, json, 'utf8');
      try {
        await execFileAsync(UPDATE_SCRIPT, [tmpPath, 'manifest.json']);
      } catch (err: any) {
        await fs.unlink(tmpPath).catch(() => {});
        return NextResponse.json({ error: 'failed to install manifest.json', detail: err.message }, { status: 500 });
      }
    } else {
      await fs.mkdir(path.dirname(DEV_PATH), { recursive: true });
      await fs.writeFile(DEV_PATH, json, 'utf8');
    }

    return NextResponse.json({ ok: true, count: items.length });
  } catch (err: any) {
    console.error('[design-elements/manifest/regenerate]', err);
    return NextResponse.json({ error: 'regeneration failed', detail: err.message }, { status: 500 });
  }
}
