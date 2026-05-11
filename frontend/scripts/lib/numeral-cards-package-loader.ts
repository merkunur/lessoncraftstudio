/**
 * numeral-cards-package-loader.ts — Pillar 5 Phase 1 Sub-Phase 1.2 loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the numeral-cards material configuration per package. Text-only material;
 * no image-library resolution needed (unlike picture-cards loader).
 *
 * Per materials-catalog.json numeral-cards spec (lines 279-305):
 *   - numeralRange: "1-5" | "1-10" | "1-20" | "1-100" (default "1-10")
 *   - showNumberWord: boolean (default true; renders localized number-word)
 *   - cardsPerPage: 4 | 6 | 9 (default 6)
 *   - language, paperSize, borderStyle, roundedCorners, showCutGuides
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');

export interface NumeralCardsPackage {
  slug: string;
  numeralRange: string;     // e.g., "1-10"
  showNumberWord: boolean;
  cardsPerPage: number;
  borderStyle: 'thin' | 'thick' | 'rounded' | 'none';
  roundedCorners: boolean;
  showCutGuides: boolean;
}

interface RawMaterial {
  materialSlug?: string;
  customizationParameters?: {
    numeralRange?: string;
    showNumberWord?: boolean;
    cardsPerPage?: number;
    borderStyle?: string;
    roundedCorners?: boolean;
    showCutGuides?: boolean;
  };
}

interface RawPackage {
  targetSlug?: string;
  materials?: RawMaterial[];
}

function loadOnePackage(packageDir: string): NumeralCardsPackage | null {
  const yamlPath = path.join(PACKAGES_ROOT, packageDir, 'package.yaml');
  if (!fs.existsSync(yamlPath)) return null;
  let raw: RawPackage;
  try {
    raw = yaml.load(fs.readFileSync(yamlPath, 'utf-8')) as RawPackage;
  } catch (e: any) {
    console.warn(`WARN YAML parse failure for ${packageDir}: ${e.message}`);
    return null;
  }
  if (!raw.materials || !Array.isArray(raw.materials)) return null;
  const numeralCardsMaterial = raw.materials.find(
    (m) => m.materialSlug === 'numeral-cards'
  );
  if (!numeralCardsMaterial) return null;
  const cp = numeralCardsMaterial.customizationParameters || {};
  return {
    slug: raw.targetSlug || packageDir,
    numeralRange: cp.numeralRange || '1-10',
    showNumberWord: cp.showNumberWord !== false, // default true
    cardsPerPage: cp.cardsPerPage || 6,
    borderStyle: (cp.borderStyle as any) || 'thin',
    roundedCorners: cp.roundedCorners !== false,
    showCutGuides: cp.showCutGuides !== false,
  };
}

export function loadAllNumeralCardsPackages(): Map<string, NumeralCardsPackage> {
  const out = new Map<string, NumeralCardsPackage>();
  const dirs = fs
    .readdirSync(PACKAGES_ROOT)
    .filter((d) => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());
  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }
  return out;
}

export function loadNumeralCardsPackagesBySlugs(
  slugs: string[]
): Map<string, NumeralCardsPackage> {
  const out = new Map<string, NumeralCardsPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no numeral-cards material for package '${slug}'`);
  }
  return out;
}

/**
 * Parse "1-10" range into array of numerals [1, 2, ..., 10].
 * Defensive: returns [1..10] if range is malformed.
 */
export function parseNumeralRange(range: string): number[] {
  const m = /^(\d+)\s*-\s*(\d+)$/.exec(range);
  if (!m) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const start = parseInt(m[1], 10);
  const end = parseInt(m[2], 10);
  if (isNaN(start) || isNaN(end) || end < start) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const out: number[] = [];
  for (let n = start; n <= end; n++) out.push(n);
  return out;
}
