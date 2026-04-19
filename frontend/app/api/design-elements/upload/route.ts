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
const SERVER_BASE = '/var/www/lcs-media/design-elements';
const DEV_BASE = path.resolve(process.cwd(), '..', 'design-elements-library');
const UPDATE_SCRIPT = '/var/www/lcs-media/scripts/update-design-element.sh';

const VALID_CATEGORIES = [
  'patterns', 'textures', 'frames', 'corners', 'banners', 'dividers',
  'badges', 'title-banners', 'accents', 'scatter-packs', 'footers'
];

const VALID_PLACEMENTS = ['center', 'top', 'bottom', 'full-frame', 'divider'];

function isValidSlug(s: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) && s.length >= 2 && s.length <= 60;
}

function validateSvg(svg: string): { ok: boolean; reason?: string } {
  if (!svg.includes('<svg')) return { ok: false, reason: 'Not an SVG document' };
  if (svg.length > 500_000) return { ok: false, reason: 'SVG exceeds 500KB' };

  const lower = svg.toLowerCase();
  if (/<script\b/.test(lower)) return { ok: false, reason: '<script> forbidden' };
  if (/<foreignobject\b/.test(lower)) return { ok: false, reason: '<foreignObject> forbidden' };
  if (/\son[a-z]+\s*=/i.test(svg)) return { ok: false, reason: 'event handler attributes (on*=) forbidden' };

  // External href/src: reject unless data: or internal fragment
  const hrefMatches = svg.matchAll(/\s(?:href|xlink:href|src)\s*=\s*["']([^"']+)["']/gi);
  for (const m of hrefMatches) {
    const v = m[1].trim().toLowerCase();
    if (!v.startsWith('#') && !v.startsWith('data:')) {
      return { ok: false, reason: `external reference not allowed: ${m[1].slice(0, 40)}` };
    }
  }

  return { ok: true };
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const formData = await request.formData();
    const svgFile = formData.get('svg') as File | null;
    const slug = (formData.get('slug') as string || '').trim();
    const category = (formData.get('category') as string || '').trim();
    const translationsRaw = (formData.get('translations') as string || '{}').trim();
    const defaultPlacement = (formData.get('defaultPlacement') as string || '').trim() || null;
    const defaultScaleRaw = formData.get('defaultScale') as string | null;
    const tintableRaw = formData.get('tintable') as string | null;
    const tagsRaw = (formData.get('tags') as string || '[]').trim();
    const sortOrderRaw = formData.get('sortOrder') as string | null;

    if (!svgFile) return NextResponse.json({ error: 'svg file is required' }, { status: 400 });
    if (!isValidSlug(slug)) return NextResponse.json({ error: 'slug must be lowercase alphanumeric with hyphens' }, { status: 400 });
    if (!VALID_CATEGORIES.includes(category)) return NextResponse.json({ error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` }, { status: 400 });
    if (defaultPlacement && !VALID_PLACEMENTS.includes(defaultPlacement)) return NextResponse.json({ error: 'invalid defaultPlacement' }, { status: 400 });

    let translations: Record<string, string>;
    try {
      translations = JSON.parse(translationsRaw);
    } catch {
      return NextResponse.json({ error: 'translations must be valid JSON' }, { status: 400 });
    }
    if (!translations.en || typeof translations.en !== 'string') {
      return NextResponse.json({ error: 'translations must include at least a non-empty "en" string' }, { status: 400 });
    }

    let tags: string[];
    try {
      tags = JSON.parse(tagsRaw);
      if (!Array.isArray(tags)) throw new Error();
    } catch {
      return NextResponse.json({ error: 'tags must be a JSON array' }, { status: 400 });
    }

    const defaultScale = defaultScaleRaw != null && defaultScaleRaw !== '' ? parseFloat(defaultScaleRaw) : null;
    if (defaultScale != null && (isNaN(defaultScale) || defaultScale < 0 || defaultScale > 1)) {
      return NextResponse.json({ error: 'defaultScale must be between 0 and 1' }, { status: 400 });
    }

    const tintable = tintableRaw == null ? true : tintableRaw === 'true';

    const svgText = await svgFile.text();
    const validation = validateSvg(svgText);
    if (!validation.ok) return NextResponse.json({ error: `SVG rejected: ${validation.reason}` }, { status: 400 });

    const existing = await prisma.designElement.findUnique({ where: { slug } });
    if (existing) return NextResponse.json({ error: `slug already exists: ${slug}` }, { status: 409 });

    // Determine sortOrder
    let sortOrder = sortOrderRaw != null && sortOrderRaw !== '' ? parseInt(sortOrderRaw, 10) : NaN;
    if (isNaN(sortOrder)) {
      const last = await prisma.designElement.findFirst({
        where: { category },
        orderBy: { sortOrder: 'desc' },
        select: { sortOrder: true }
      });
      sortOrder = (last?.sortOrder ?? -1) + 1;
    }

    const filename = `${slug}.svg`;
    const filePath = `${category}/${filename}`;
    const svgBuffer = Buffer.from(svgText, 'utf8');

    // Write file
    if (IS_PRODUCTION) {
      const tmpPath = path.join(os.tmpdir(), `de-upload-${crypto.randomBytes(6).toString('hex')}.svg`);
      await fs.writeFile(tmpPath, svgBuffer);
      try {
        await execFileAsync(UPDATE_SCRIPT, [tmpPath, filePath]);
      } catch (err: any) {
        // Cleanup tmp on failure
        await fs.unlink(tmpPath).catch(() => {});
        return NextResponse.json({ error: 'failed to install SVG on disk', detail: err.message }, { status: 500 });
      }
    } else {
      const devDir = path.join(DEV_BASE, category);
      await fs.mkdir(devDir, { recursive: true });
      await fs.writeFile(path.join(devDir, filename), svgBuffer);
    }

    const item = await prisma.designElement.create({
      data: {
        slug,
        category,
        filename,
        filePath,
        fileSize: svgBuffer.length,
        mimeType: 'image/svg+xml',
        translations,
        tags,
        defaultPlacement,
        defaultScale,
        tintable,
        sortOrder,
        isActive: true
      }
    });

    return NextResponse.json({ ok: true, item });
  } catch (err: any) {
    console.error('[design-elements/upload]', err);
    return NextResponse.json({ error: 'upload failed', detail: err.message }, { status: 500 });
  }
}
