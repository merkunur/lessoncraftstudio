/**
 * parent-letter-package-loader.ts — Pillar 5 Phase 2 Sub-Phase 2.2 loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the parent-take-home-letter material configuration + package metadata needed
 * for parent-letter PDF rendering.
 *
 * Per materials-catalog.json parent-take-home-letter spec (10 params):
 *   - tone (warm/formal/playful) / imageSource / themeName / vocabKeys
 *   - pictureCueCount / homeLanguage / language / colorMode
 *   - signatureLine / paperSize
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');

export type Tone = 'warm' | 'formal' | 'playful';

/**
 * F7 strand axis. Pedagogical-class classification used by parent-letter
 * body-prose + picture-cue resolution. 5 classes per F7 Phase 0 §F7-§5
 * recommended resolution; 8 empirical domains map down to these 5 via
 * STRAND_LEAF_TO_CLASS table below.
 */
export type Strand = 'numeracy' | 'literacy' | 'vocabulary' | 'world-knowledge' | 'sel';

export interface ParentLetterPackage {
  slug: string;
  tone: Tone;
  strand: Strand;
  imageSource: 'theme' | 'vocabKeyList' | null;
  themeName: string | null;
  vocabKeys: string[] | null;
  pictureCueCount: number;
  homeLanguage: string;
  language: string;
  colorMode: 'color' | 'bw';
  signatureLine: boolean;
  paperSize: 'a4' | 'letter';
  title: Record<string, string>;
  durationMinutes: number;
  compositionalRationale: Record<string, string>;
}

interface RawMaterial {
  materialSlug?: string;
  customizationParameters?: {
    tone?: string;
    imageSource?: string;
    themeName?: string;
    vocabKeys?: string[];
    pictureCueCount?: number;
    homeLanguage?: string;
    language?: string;
    colorMode?: string;
    signatureLine?: boolean;
    paperSize?: string;
  };
}

interface RawPackage {
  targetSlug?: string;
  title?: Record<string, string>;
  durationMinutes?: number;
  materials?: RawMaterial[];
  compositionalRationale?: Record<string, string>;
  strand?: string; // F7 hybrid γ: optional top-level structured override
}

/**
 * F7 strand-leaf → class mapping table. Empirical 59 leaf-strand values
 * surfaced from compositionalRationale.en "Primary strand:" prose across
 * 143 packages cluster into 5 classes per F7 Phase 0 §F7-§5 adjudication.
 * Order matters: longer / more-specific substrings match first.
 */
const STRAND_LEAF_TO_CLASS: Array<[RegExp, Strand]> = [
  // numeracy
  [/counting\s+and\s+cardinality/i, 'numeracy'],
  [/addition[\s-]?subtraction/i, 'numeracy'],
  [/numeral[\s-]?recognition/i, 'numeracy'],
  [/place[\s-]?value/i, 'numeracy'],
  [/data[\s-]?and[\s-]?graphs/i, 'numeracy'],
  [/measurement/i, 'numeracy'],
  [/geometry/i, 'numeracy'],
  [/early[\s-]?numeracy/i, 'numeracy'],
  [/pre[\s-]?numeracy/i, 'numeracy'],
  [/number[\s-]?sense/i, 'numeracy'],
  [/subitization/i, 'numeracy'],
  [/\baddition\b/i, 'numeracy'],
  [/\bsubtraction\b/i, 'numeracy'],
  [/\bcounting\b/i, 'numeracy'],
  [/\bmath\b/i, 'numeracy'],
  // literacy
  [/letter[\s-]?recognition/i, 'literacy'],
  [/phonics[\s-]?decoding/i, 'literacy'],
  [/phonics/i, 'literacy'],
  [/multilingual[\s-]?language[\s-]?awareness/i, 'literacy'],
  [/early[\s-]?literacy/i, 'literacy'],
  // vocabulary (check after phonics since "vocabulary + phonics" should match literacy first via /phonics/)
  [/vocabulary[\s-]?acquisition/i, 'vocabulary'],
  // sel
  [/personal[\s-]?social[\s-]?emotional/i, 'sel'],
  [/social[\s-]?emotional/i, 'sel'],
  [/\bPSED\b/i, 'sel'],
  // world-knowledge (and cognitive-EF / world-knowledge-adjacent / science)
  [/living[\s-]?things/i, 'world-knowledge'],
  [/environment[\s-]?and[\s-]?weather/i, 'world-knowledge'],
  [/world[\s-]?knowledge/i, 'world-knowledge'],
  [/logical[\s-]?reasoning/i, 'world-knowledge'],
  [/pattern[\s-]?recognition/i, 'world-knowledge'],
  [/\bsorting\b/i, 'world-knowledge'],
  [/memory[\s-]?and[\s-]?attention/i, 'world-knowledge'],
  [/cognitive[\s-]?and[\s-]?executive[\s-]?function/i, 'world-knowledge'],
  [/materials[\s-]?and[\s-]?properties/i, 'world-knowledge'],
  [/community[\s-]?and[\s-]?roles/i, 'world-knowledge'],
  [/\bscience\b/i, 'world-knowledge'],
  // fine-motor + visual-spatial fall through to vocabulary default (per F7 §F7-§5 leaf-mapping)
  [/visual[\s-]?discrimination/i, 'vocabulary'],
  [/fine[\s-]?motor/i, 'vocabulary'],
];

/**
 * Resolves a strand class from raw prose. Returns null if no pattern matched.
 * Used by hybrid γ resolver to parse compositionalRationale.en line.
 */
function classifyStrandLeaf(leaf: string): Strand | null {
  for (const [pattern, cls] of STRAND_LEAF_TO_CLASS) {
    if (pattern.test(leaf)) return cls;
  }
  return null;
}

/**
 * F7 hybrid γ strand resolver. Order:
 *   1. Top-level YAML `strand` field (if present + recognized): use as-is
 *   2. Parse compositionalRationale.en for "Primary strand: ..." line, map
 *      leaf prose to class via STRAND_LEAF_TO_CLASS
 *   3. Fallback to 'vocabulary' (current behavior; preserves backward-compat)
 *
 * WARN to stderr when fallback fires; surfaces packages needing operator
 * review for future structured-field migration.
 */
function resolveStrand(
  raw: RawPackage,
  packageDir: string
): Strand {
  const validStrands: Strand[] = ['numeracy', 'literacy', 'vocabulary', 'world-knowledge', 'sel'];
  if (typeof raw.strand === 'string' && (validStrands as string[]).includes(raw.strand)) {
    return raw.strand as Strand;
  }
  const rationale = raw.compositionalRationale?.en;
  if (typeof rationale === 'string') {
    // Match "Primary strand: <value>" up to end-of-line or sentence terminator.
    const match = rationale.match(/Primary\s+strand[:\s]+([^.\n]+)/i);
    if (match) {
      const leaf = match[1].trim();
      const cls = classifyStrandLeaf(leaf);
      if (cls) return cls;
      console.warn(
        `WARN parent-letter strand-resolution: package '${packageDir}' Primary strand prose '${leaf}' unrecognized; falling back to 'vocabulary'`
      );
      return 'vocabulary';
    }
  }
  console.warn(
    `WARN parent-letter strand-resolution: package '${packageDir}' has no top-level 'strand' field and compositionalRationale.en lacks 'Primary strand:' line; falling back to 'vocabulary'`
  );
  return 'vocabulary';
}

function loadOnePackage(packageDir: string): ParentLetterPackage | null {
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
  const plMaterial = raw.materials.find((m) => m.materialSlug === 'parent-take-home-letter');
  if (!plMaterial) return null;
  const cp = plMaterial.customizationParameters || {};

  const tone: Tone = (cp.tone === 'formal' || cp.tone === 'playful') ? cp.tone : 'warm';
  const colorMode: 'color' | 'bw' = cp.colorMode === 'bw' ? 'bw' : 'color';
  const paperSize: 'a4' | 'letter' = cp.paperSize === 'letter' ? 'letter' : 'a4';
  const imageSource: 'theme' | 'vocabKeyList' | null =
    cp.imageSource === 'vocabKeyList' ? 'vocabKeyList' :
    cp.imageSource === 'theme' ? 'theme' : null;

  const strand = resolveStrand(raw, packageDir);

  return {
    slug: raw.targetSlug || packageDir,
    tone,
    strand,
    imageSource,
    themeName: typeof cp.themeName === 'string' ? cp.themeName : null,
    vocabKeys: Array.isArray(cp.vocabKeys) ? cp.vocabKeys : null,
    pictureCueCount: typeof cp.pictureCueCount === 'number' ? cp.pictureCueCount : 6,
    homeLanguage: typeof cp.homeLanguage === 'string' ? cp.homeLanguage : 'en',
    language: typeof cp.language === 'string' ? cp.language : 'en',
    colorMode,
    signatureLine: cp.signatureLine !== false,
    paperSize,
    title: raw.title || {},
    durationMinutes: raw.durationMinutes || 30,
    compositionalRationale: raw.compositionalRationale || {},
  };
}

export function loadAllParentLetterPackages(): Map<string, ParentLetterPackage> {
  const out = new Map<string, ParentLetterPackage>();
  const dirs = fs
    .readdirSync(PACKAGES_ROOT)
    .filter((d) => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());
  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }
  return out;
}

export function loadParentLetterPackagesBySlugs(
  slugs: string[]
): Map<string, ParentLetterPackage> {
  const out = new Map<string, ParentLetterPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no parent-take-home-letter material for package '${slug}'`);
  }
  return out;
}

export function localizedField(
  field: Record<string, string>,
  locale: string
): string {
  if (field[locale]) return field[locale];
  if (field.en) return field.en;
  const firstKey = Object.keys(field)[0];
  return firstKey ? field[firstKey] : '';
}
