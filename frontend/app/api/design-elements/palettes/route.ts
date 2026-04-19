import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const execFileAsync = promisify(execFile);

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SERVER_PATH = '/var/www/lcs-media/design-elements/palettes.json';
const DEV_PATH = path.resolve(process.cwd(), '..', 'design-elements-library', 'palettes.json');
const UPDATE_SCRIPT = '/var/www/lcs-media/scripts/update-design-element.sh';

function validateHex(c: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(c) || /^#[0-9a-fA-F]{3}$/.test(c);
}

export async function GET() {
  try {
    const target = IS_PRODUCTION ? SERVER_PATH : DEV_PATH;
    const raw = await fs.readFile(target, 'utf8');
    const palettes = JSON.parse(raw);
    if (!Array.isArray(palettes)) {
      return NextResponse.json({ error: 'palettes file is not an array' }, { status: 500 });
    }
    return NextResponse.json({ palettes });
  } catch (err: any) {
    if (err.code === 'ENOENT') return NextResponse.json({ palettes: [] });
    console.error('[design-elements/palettes GET]', err);
    return NextResponse.json({ error: 'read failed', detail: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const palettes = body.palettes;

    if (!Array.isArray(palettes)) {
      return NextResponse.json({ error: 'body.palettes must be an array' }, { status: 400 });
    }

    for (const p of palettes) {
      if (!p || typeof p.name !== 'string' || !p.name.trim()) {
        return NextResponse.json({ error: 'each palette must have a non-empty name' }, { status: 400 });
      }
      if (!Array.isArray(p.colors) || p.colors.length < 3 || p.colors.length > 8) {
        return NextResponse.json({ error: `palette "${p.name}" must have 3-8 colors` }, { status: 400 });
      }
      for (const c of p.colors) {
        if (typeof c !== 'string' || !validateHex(c)) {
          return NextResponse.json({ error: `invalid hex color in "${p.name}": ${c}` }, { status: 400 });
        }
      }
    }

    // Normalize structure to {name, colors}
    const normalized = palettes.map((p: any) => ({ name: p.name.trim(), colors: p.colors }));
    const json = JSON.stringify(normalized, null, 2);

    if (IS_PRODUCTION) {
      const tmpPath = path.join(os.tmpdir(), `palettes-${crypto.randomBytes(6).toString('hex')}.json`);
      await fs.writeFile(tmpPath, json, 'utf8');
      try {
        await execFileAsync(UPDATE_SCRIPT, [tmpPath, 'palettes.json']);
      } catch (err: any) {
        await fs.unlink(tmpPath).catch(() => {});
        return NextResponse.json({ error: 'failed to install palettes.json', detail: err.message }, { status: 500 });
      }
    } else {
      await fs.mkdir(path.dirname(DEV_PATH), { recursive: true });
      await fs.writeFile(DEV_PATH, json, 'utf8');
    }

    return NextResponse.json({ ok: true, count: normalized.length });
  } catch (err: any) {
    console.error('[design-elements/palettes PUT]', err);
    return NextResponse.json({ error: 'write failed', detail: err.message }, { status: 500 });
  }
}
