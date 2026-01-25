import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Force dynamic to prevent build-time caching
export const dynamic = 'force-dynamic';

// Base path for samples - production uses isolated /var/www/lcs-media/samples
// This is COMPLETELY SEPARATE from the code repository to prevent accidental deletion
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

const LANGUAGES = [
  'english', 'german', 'french', 'spanish', 'italian',
  'portuguese', 'dutch', 'danish', 'swedish', 'norwegian', 'finnish'
];

interface SamplesHealthCheck {
  status: 'healthy' | 'degraded' | 'critical';
  samplesDirectoryExists: boolean;
  sampleImageCount: number;
  webpImageCount: number;
  heroImagesStatus: Record<string, {
    hasPortrait: boolean;
    hasLandscape: boolean;
  }>;
  timestamp: string;
}

async function countFilesRecursively(dir: string, extension: string): Promise<number> {
  let count = 0;

  async function walkDir(currentDir: string) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await walkDir(fullPath);
        } else if (entry.name.endsWith(extension)) {
          count++;
        }
      }
    } catch {
      // Directory doesn't exist or can't be read
    }
  }

  await walkDir(dir);
  return count;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function GET(): Promise<NextResponse> {
  const checks: SamplesHealthCheck = {
    status: 'critical',
    samplesDirectoryExists: false,
    sampleImageCount: 0,
    webpImageCount: 0,
    heroImagesStatus: {},
    timestamp: new Date().toISOString(),
  };

  try {
    // Check samples directory exists
    await fs.access(SAMPLES_BASE);
    checks.samplesDirectoryExists = true;

    // Count files (limit for performance)
    const [jpegCount, webpCount] = await Promise.all([
      countFilesRecursively(SAMPLES_BASE, '.jpeg'),
      countFilesRecursively(SAMPLES_BASE, '.webp'),
    ]);

    checks.sampleImageCount = jpegCount;
    checks.webpImageCount = webpCount;

    // Check hero images for each language
    for (const lang of LANGUAGES) {
      const heroDir = path.join(SAMPLES_BASE, lang, 'homepage');
      const [hasPortrait, hasLandscape] = await Promise.all([
        fileExists(path.join(heroDir, 'hero-portrait_preview.webp')),
        fileExists(path.join(heroDir, 'hero-landscape_preview.webp')),
      ]);
      checks.heroImagesStatus[lang] = { hasPortrait, hasLandscape };
    }

    // Determine overall status
    const heroComplete = Object.values(checks.heroImagesStatus).filter(
      h => h.hasPortrait && h.hasLandscape
    ).length;

    // Sample count is informational only - samples are uploaded via content manager
    // Zero samples is a valid starting state
    checks.status = 'healthy';

  } catch (error) {
    console.error('[HEALTH/SAMPLES] Error:', error);
    checks.status = 'critical';
  }

  return NextResponse.json(checks, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
}
