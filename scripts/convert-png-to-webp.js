#!/usr/bin/env node
/*
 * convert-png-to-webp.js
 *
 * Generates a parallel WebP image library from the LessonCraftStudio PNG source.
 * Produces three resolution variants per source (longest-edge: 512 / 1024 / 1536),
 * never upscales, defaults to lossy quality 85 with an opt-in lossless override list.
 *
 * Usage:
 *   node scripts/convert-png-to-webp.js --pilot [--source <path>] [--out <path>]
 *   node scripts/convert-png-to-webp.js --full  [--source <path>] [--out <path>] [--concurrency N] [--auto-lossless]
 *
 * The pilot mode runs first (REQUIRED). It converts ~20 hand-curated samples and
 * writes a side-by-side HTML gallery for visual review. Operator approves quality
 * before --full runs against the whole 3,125-file library.
 *
 * Originals are never modified. Output goes to a parallel directory.
 */

'use strict';

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const os = require('os');

// Sharp lives in frontend/node_modules (it's a frontend dependency).
let sharp;
try {
  sharp = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'sharp'));
} catch (err) {
  console.error('ERROR: cannot load sharp from frontend/node_modules/sharp');
  console.error('       run `npm install` in frontend/ first');
  console.error(err.message);
  process.exit(2);
}

// Shared normalization rules — keeps converter output in agreement with the
// runtime lookup function. Without this, a key like "Teddy Bear" would
// normalize to "teddy_bear" at lookup time but resolve to "teddy bear@Nx.webp"
// on disk, missing entirely.
let LCSImageRef;
try {
  LCSImageRef = require(path.join(__dirname, '..', 'frontend', 'public', 'worksheet-generators', 'js', 'image-reference.js'));
} catch (err) {
  console.error('ERROR: cannot load image-reference.js from frontend/public/worksheet-generators/js/');
  console.error('       this file must exist for filename normalization to be consistent');
  console.error(err.message);
  process.exit(2);
}

// ============================================================
// Constants
// ============================================================

const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SOURCE = path.join(REPO_ROOT, 'image library');
const DEFAULT_OUTPUT = path.join(REPO_ROOT, 'image-library-webp');
const OVERRIDES_FILE = path.join(__dirname, 'webp-lossless-overrides.txt');

const TARGETS = [
  { name: '1x', edge: 512 },
  { name: '2x', edge: 1024 },
  { name: '3x', edge: 1536 },
];

const QUALITY = 85;
const MIN_QUALITY = 80;
const ALPHA_QUALITY = 100;
const EFFORT = 5;

const DEFAULT_CONCURRENCY = 6;
const MIN_FREE_BYTES = 3 * 1024 * 1024 * 1024; // 3 GB

if (QUALITY < MIN_QUALITY) {
  throw new Error(`QUALITY ${QUALITY} below MIN_QUALITY ${MIN_QUALITY}`);
}

// ============================================================
// Pilot candidates
//
// 20 entries spanning the operator's six visual-characteristic categories.
// Entries with a literal filename are tried first; entries with `firstIn` pick
// the first .png file in that theme folder at runtime so the pilot still works
// even if the explicit candidate doesn't exist.
//
// Operator: feel free to swap entries here and re-run --pilot. It's cheap.
// ============================================================

const PILOT_CANDIDATES = [
  // Simple cartoon animals
  { category: 'Simple cartoon animal', source: 'animals/cat.png' },
  { category: 'Simple cartoon animal', source: 'animals/dog.png' },
  { category: 'Simple cartoon animal', source: 'farm animals/horse.png' },

  // Detailed scenes
  { category: 'Detailed illustration', firstIn: 'At the Supermarket' },
  { category: 'Detailed illustration', firstIn: 'christmas' },
  { category: 'Detailed illustration', firstIn: 'bakery' },

  // Fine line art (black & white)
  { category: 'Fine line art', firstIn: 'animals bw' },
  { category: 'Fine line art', firstIn: 'apparel bw' },
  { category: 'Fine line art', firstIn: 'classroom bw' },

  // Subtle gradients / shading
  { category: 'Subtle gradients', firstIn: 'BACKGROUNDS' },
  { category: 'Subtle gradients', firstIn: 'beach' },
  { category: 'Subtle gradients', firstIn: 'space' },

  // Sharp geometric edges / flat color (the closest analog to the missing
  // numerals/alphabet category — these are the file types most likely to
  // suffer visible artifacts under lossy compression)
  { category: 'Sharp edges / flat color', source: 'shapes/circle.png' },
  { category: 'Sharp edges / flat color', source: 'shapes/hexagon.png' },
  { category: 'Sharp edges / flat color', source: 'colors/blue.png' },
  { category: 'Sharp edges / flat color', firstIn: 'BORDERS' },

  // Hard alpha / transparency
  { category: 'Transparency / hard alpha', firstIn: 'accessories' },
  { category: 'Transparency / hard alpha', firstIn: 'body parts' },
  { category: 'Transparency / hard alpha', firstIn: 'birds' },
  { category: 'Transparency / hard alpha', firstIn: 'tools' },
];

// ============================================================
// CLI parsing
// ============================================================

function parseArgs(argv) {
  const args = {
    pilot: false,
    full: false,
    autoLossless: false,
    losslessTree: false,
    source: DEFAULT_SOURCE,
    out: DEFAULT_OUTPUT,
    concurrency: DEFAULT_CONCURRENCY,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--pilot') args.pilot = true;
    else if (a === '--full') args.full = true;
    else if (a === '--auto-lossless') args.autoLossless = true;
    else if (a === '--lossless-tree') args.losslessTree = true;
    else if (a === '--source') args.source = path.resolve(argv[++i]);
    else if (a === '--out') args.out = path.resolve(argv[++i]);
    else if (a === '--concurrency') args.concurrency = Math.max(1, parseInt(argv[++i], 10));
    else if (a === '--help' || a === '-h') { printUsage(); process.exit(0); }
    else { console.error('Unknown flag:', a); printUsage(); process.exit(1); }
  }
  if (!args.pilot && !args.full) {
    console.error('ERROR: must pass either --pilot or --full');
    printUsage();
    process.exit(1);
  }
  if (args.pilot && args.full) {
    console.error('ERROR: pass only one of --pilot or --full');
    process.exit(1);
  }
  return args;
}

function printUsage() {
  console.log(`
Usage:
  node scripts/convert-png-to-webp.js --pilot
      Convert ~20 sample images and write a comparison gallery for review.
      REQUIRED before --full.

  node scripts/convert-png-to-webp.js --full
      Convert the whole library. Run only after reviewing the pilot gallery.

Optional flags:
  --source <path>       Override source directory (default: "${DEFAULT_SOURCE}")
  --out <path>          Override output directory (default: "${DEFAULT_OUTPUT}")
  --concurrency N       Parallel workers (default: ${DEFAULT_CONCURRENCY})
  --auto-lossless       Experimental: auto-detect images that should be lossless
                        based on luma entropy. Off by default. Ignored with --lossless-tree.
  --lossless-tree       Build the parallel LOSSLESS tree at
                          <out>/themes-lossless/<theme>/<key>@Nx.webp
                        instead of the default lossy <out>/themes/. Every image
                        is encoded lossless regardless of overrides. Used by
                        the on-screen Fabric canvas + printable PDF/PNG/JPEG
                        path in the 33 worksheet apps; the existing lossy tree
                        keeps feeding the interactive-HTML overlay layer.

Manual lossless overrides: edit scripts/webp-lossless-overrides.txt.
`);
}

// ============================================================
// Helpers
// ============================================================

function loadOverrides() {
  if (!fs.existsSync(OVERRIDES_FILE)) return new Set();
  const lines = fs.readFileSync(OVERRIDES_FILE, 'utf8').split(/\r?\n/);
  const set = new Set();
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    set.add(line.replace(/\\/g, '/').toLowerCase());
  }
  return set;
}

async function checkFreeSpace(dir) {
  try {
    const stat = await fsp.statfs(path.dirname(dir));
    const free = stat.bsize * stat.bavail;
    if (free < MIN_FREE_BYTES) {
      throw new Error(`Need >= ${(MIN_FREE_BYTES / 1024 / 1024 / 1024).toFixed(1)} GB free on ${dir}; got ${(free / 1024 / 1024 / 1024).toFixed(1)} GB`);
    }
    return free;
  } catch (err) {
    if (err.code === 'ERR_INVALID_ARG_VALUE' || !fsp.statfs) {
      console.warn('WARN: cannot check free space on this Node version; proceeding');
      return null;
    }
    throw err;
  }
}

async function* walkPngs(root) {
  const entries = await fsp.readdir(root, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(root, e.name);
    if (e.isDirectory()) {
      yield* walkPngs(full);
    } else if (e.isFile() && /\.png$/i.test(e.name)) {
      yield full;
    }
  }
}

async function listThemes(root) {
  const entries = await fsp.readdir(root, { withFileTypes: true });
  return entries.filter(e => e.isDirectory()).map(e => e.name);
}

async function firstPngIn(root, theme) {
  const dir = path.join(root, theme);
  if (!fs.existsSync(dir)) return null;
  // Direct PNGs first
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const sorted = [...entries].sort((a, b) => a.name.localeCompare(b.name));
  for (const e of sorted) {
    if (e.isFile() && /\.png$/i.test(e.name)) return path.join(theme, e.name);
  }
  // Recurse into first subdirectory that contains a PNG
  for (const e of sorted) {
    if (e.isDirectory()) {
      const nested = await firstPngIn(root, path.join(theme, e.name));
      if (nested) return nested;
    }
  }
  return null;
}

function bytesHuman(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function pct(part, whole) {
  if (!whole) return '0%';
  return `${((part / whole) * 100).toFixed(1)}%`;
}

function median(nums) {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function p95(nums) {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(s.length * 0.95))];
}

function avg(nums) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

// Concurrency pool: maps an async fn over `items` with at most `n` in flight.
async function asyncPool(n, items, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array(Math.min(n, items.length)).fill(0).map(async () => {
    while (true) {
      const i = cursor++;
      if (i >= items.length) return;
      try { results[i] = { ok: true, value: await fn(items[i], i) }; }
      catch (err) { results[i] = { ok: false, error: err }; }
    }
  });
  await Promise.all(workers);
  return results;
}

// ============================================================
// Encode core
// ============================================================

function plannedVariants(meta) {
  const longest = Math.max(meta.width, meta.height);
  const variants = TARGETS.filter(t => t.edge <= longest).map(t => ({ ...t }));
  if (variants.length === 0) variants.push({ name: '1x', edge: longest, native: true });
  return variants;
}

async function encodeVariant({ inputPath, outputPath, edge, lossless, native }) {
  const tmp = `${outputPath}.tmp`;
  let pipeline = sharp(inputPath, { failOn: 'none' });
  if (!native) {
    pipeline = pipeline.resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true });
  }
  if (lossless) {
    pipeline = pipeline.webp({ lossless: true, alphaQuality: ALPHA_QUALITY, effort: EFFORT });
  } else {
    pipeline = pipeline.webp({ quality: QUALITY, alphaQuality: ALPHA_QUALITY, effort: EFFORT, smartSubsample: true });
  }
  await pipeline.toFile(tmp);
  await fsp.rename(tmp, outputPath);
  const verify = await sharp(outputPath).metadata();
  if (!verify.width || !verify.height) {
    throw new Error(`decode-roundtrip failed: ${outputPath}`);
  }
  const stat = await fsp.stat(outputPath);
  return { bytes: stat.size, width: verify.width, height: verify.height, hasAlpha: !!verify.hasAlpha };
}

async function cleanStaleTmps(outRoot) {
  if (!fs.existsSync(outRoot)) return 0;
  let removed = 0;
  async function recurse(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) await recurse(full);
      else if (e.isFile() && full.endsWith('.tmp')) {
        await fsp.unlink(full); removed++;
      }
    }
  }
  await recurse(outRoot);
  return removed;
}

function relPosix(from, to) {
  return path.relative(from, to).replace(/\\/g, '/');
}

function isLosslessFor(sourceRel, overrides, autoStats) {
  if (overrides.has(sourceRel.toLowerCase())) return true;
  if (autoStats) {
    // luma entropy heuristic: low entropy + few distinct values = posterized / line art
    const lumaEntropy = autoStats.entropy ?? 8;
    if (lumaEntropy < 4.5) return true;
  }
  return false;
}

async function maybeAutoStats(inputPath, autoLossless) {
  if (!autoLossless) return null;
  try {
    const s = await sharp(inputPath, { failOn: 'none' }).stats();
    return { entropy: s.entropy };
  } catch {
    return null;
  }
}

async function processOne({ inputPath, sourceRoot, outRoot, overrides, autoLossless, losslessTree }) {
  const sourceRel = relPosix(sourceRoot, inputPath);
  const themeAndStem = sourceRel.replace(/\.png$/i, '');
  const themeDir = path.dirname(sourceRel);
  const stem = LCSImageRef.normalizeKey(path.basename(themeAndStem));
  // --lossless-tree writes to a parallel directory so it never collides with
  // the default lossy tree. Both trees can coexist and both feed the apps:
  // themes/ → interactive-HTML overlay (lossy WebP), themes-lossless/ → canvas
  // load + printable PDF/PNG/JPEG (lossless WebP).
  const treeDir = losslessTree ? 'themes-lossless' : 'themes';
  const outThemeDir = path.join(outRoot, treeDir, themeDir);
  await fsp.mkdir(outThemeDir, { recursive: true });

  const sourceStat = await fsp.stat(inputPath);
  const meta = await sharp(inputPath, { failOn: 'none' }).metadata();
  const variants = plannedVariants(meta);
  const autoStats = losslessTree ? null : await maybeAutoStats(inputPath, autoLossless);
  const lossless = losslessTree ? true : isLosslessFor(sourceRel, overrides, autoStats);

  const results = [];
  let allFresh = true;
  const expected = variants.map(v => ({
    v,
    out: path.join(outThemeDir, `${stem}@${v.name}.webp`),
  }));

  for (const { v, out } of expected) {
    let needs = true;
    if (fs.existsSync(out)) {
      const st = fs.statSync(out);
      if (st.size > 0 && st.mtimeMs >= sourceStat.mtimeMs) needs = false;
    }
    if (!needs) {
      const st = fs.statSync(out);
      results.push({ variant: v.name, bytes: st.size, skipped: true });
      continue;
    }
    allFresh = false;
    const r = await encodeVariant({ inputPath, outputPath: out, edge: v.edge, lossless, native: !!v.native });
    results.push({ variant: v.name, bytes: r.bytes, width: r.width, height: r.height, hasAlpha: r.hasAlpha });
  }

  return {
    sourceRel,
    sourceBytes: sourceStat.size,
    sourceWidth: meta.width,
    sourceHeight: meta.height,
    sourceHasAlpha: !!meta.hasAlpha,
    lossless,
    skipped: allFresh,
    variants: results,
  };
}

// ============================================================
// Pilot mode
// ============================================================

async function runPilot(args) {
  console.log('Mode: PILOT');
  console.log(`Source: ${args.source}`);
  console.log(`Output: ${args.out}\n`);

  if (!fs.existsSync(args.source)) {
    console.error(`ERROR: source directory not found: ${args.source}`);
    process.exit(2);
  }

  await fsp.mkdir(args.out, { recursive: true });
  const pilotDir = path.join(args.out, '_pilot');
  await fsp.mkdir(pilotDir, { recursive: true });

  // Resolve candidates
  console.log('Resolving pilot candidates...');
  const resolved = [];
  for (const c of PILOT_CANDIDATES) {
    let rel = c.source;
    if (!rel && c.firstIn) {
      rel = await firstPngIn(args.source, c.firstIn);
      if (!rel) {
        console.warn(`  SKIP (theme not found): ${c.firstIn}`);
        continue;
      }
    }
    const full = path.join(args.source, rel);
    if (!fs.existsSync(full)) {
      console.warn(`  SKIP (file not found): ${rel}`);
      continue;
    }
    resolved.push({ category: c.category, sourceRel: rel.replace(/\\/g, '/'), sourcePath: full });
    console.log(`  ${c.category.padEnd(28)} ${rel}`);
  }

  if (resolved.length === 0) {
    console.error('ERROR: no pilot candidates resolved. Check --source path.');
    process.exit(2);
  }
  console.log(`\n${resolved.length} samples will be converted (lossy@85 + lossless, both at @2x).\n`);

  const PILOT_EDGE = 1024;
  const samples = [];

  for (let i = 0; i < resolved.length; i++) {
    const r = resolved[i];
    const stem = path.basename(r.sourceRel, path.extname(r.sourceRel));
    const themeSlug = path.dirname(r.sourceRel).replace(/[\\/]/g, '__').replace(/\s+/g, '_');
    const baseName = `${themeSlug}__${stem}`.toLowerCase();

    const origOut = path.join(pilotDir, `${baseName}.original.png`);
    const lossyOut = path.join(pilotDir, `${baseName}.lossy85.webp`);
    const losslessOut = path.join(pilotDir, `${baseName}.lossless.webp`);

    await fsp.copyFile(r.sourcePath, origOut);

    await sharp(r.sourcePath, { failOn: 'none' })
      .resize({ width: PILOT_EDGE, height: PILOT_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY, alphaQuality: ALPHA_QUALITY, effort: EFFORT, smartSubsample: true })
      .toFile(lossyOut);

    await sharp(r.sourcePath, { failOn: 'none' })
      .resize({ width: PILOT_EDGE, height: PILOT_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ lossless: true, alphaQuality: ALPHA_QUALITY, effort: EFFORT })
      .toFile(losslessOut);

    const origSize = fs.statSync(origOut).size;
    const lossySize = fs.statSync(lossyOut).size;
    const losslessSize = fs.statSync(losslessOut).size;

    samples.push({
      category: r.category,
      sourceRel: r.sourceRel,
      origFile: path.basename(origOut),
      lossyFile: path.basename(lossyOut),
      losslessFile: path.basename(losslessOut),
      origSize, lossySize, losslessSize,
    });
    process.stdout.write(`  [${String(i + 1).padStart(2)}/${resolved.length}] ${r.sourceRel.padEnd(45)} ${bytesHuman(origSize)} → lossy ${bytesHuman(lossySize)} (${pct(lossySize, origSize)}) | lossless ${bytesHuman(losslessSize)} (${pct(losslessSize, origSize)})\n`);
  }

  await writePilotGallery(pilotDir, samples);

  const totalOrig = samples.reduce((s, x) => s + x.origSize, 0);
  const totalLossy = samples.reduce((s, x) => s + x.lossySize, 0);
  const totalLossless = samples.reduce((s, x) => s + x.losslessSize, 0);

  console.log('');
  console.log('-----------------------------------------------------------');
  console.log(`PILOT COMPLETE — ${samples.length} samples written.`);
  console.log('');
  console.log(`Originals total: ${bytesHuman(totalOrig)}`);
  console.log(`Lossy@85 total : ${bytesHuman(totalLossy)}   (saved ${pct(totalOrig - totalLossy, totalOrig)})`);
  console.log(`Lossless total : ${bytesHuman(totalLossless)}   (saved ${pct(totalOrig - totalLossless, totalOrig)})`);
  console.log('');
  console.log('NEXT STEP — open this in your browser to review quality:');
  console.log(`  ${path.join(pilotDir, 'index.html')}`);
  console.log('');
  console.log('If anything looks bad at lossy 85, list those files in:');
  console.log(`  ${OVERRIDES_FILE}`);
  console.log('Then run the full conversion:');
  console.log('  node scripts/convert-png-to-webp.js --full');
  console.log('-----------------------------------------------------------');
}

async function writePilotGallery(pilotDir, samples) {
  const totalOrig = samples.reduce((s, x) => s + x.origSize, 0);
  const totalLossy = samples.reduce((s, x) => s + x.lossySize, 0);
  const totalLossless = samples.reduce((s, x) => s + x.losslessSize, 0);

  const rows = samples.map(s => `
    <section class="sample">
      <div class="meta">
        <span class="cat">${escapeHtml(s.category)}</span>
        <code>${escapeHtml(s.sourceRel)}</code>
      </div>
      <div class="trio">
        <figure>
          <img src="${encodeURIComponent(s.origFile)}" alt="original">
          <figcaption><b>Original PNG</b><br>${bytesHuman(s.origSize)}</figcaption>
        </figure>
        <figure>
          <img src="${encodeURIComponent(s.lossyFile)}" alt="lossy 85">
          <figcaption><b>Lossy WebP q85</b><br>${bytesHuman(s.lossySize)} <span class="save">(saved ${pct(s.origSize - s.lossySize, s.origSize)})</span></figcaption>
        </figure>
        <figure>
          <img src="${encodeURIComponent(s.losslessFile)}" alt="lossless">
          <figcaption><b>Lossless WebP</b><br>${bytesHuman(s.losslessSize)} <span class="save">(saved ${pct(s.origSize - s.losslessSize, s.origSize)})</span></figcaption>
        </figure>
      </div>
    </section>`).join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>WebP pilot — visual comparison</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 1200px; margin: 24px auto; padding: 0 16px; color: #222; }
  h1 { margin: 0 0 8px; }
  p.intro { color: #555; margin-top: 0; }
  table.summary { border-collapse: collapse; margin: 16px 0 32px; font-size: 14px; }
  table.summary th, table.summary td { border: 1px solid #ddd; padding: 6px 12px; text-align: right; }
  table.summary th { background: #f5f5f5; text-align: left; }
  section.sample { border-top: 1px solid #eee; padding: 18px 0; }
  .meta { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; font-size: 13px; }
  .cat { background: #eef; color: #335; padding: 2px 8px; border-radius: 4px; font-weight: 600; }
  code { color: #555; }
  .trio { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  figure { margin: 0; text-align: center; }
  figure img { width: 100%; max-width: 320px; height: auto; background: repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 0 / 16px 16px; border: 1px solid #ddd; }
  figcaption { font-size: 12px; margin-top: 6px; color: #444; }
  .save { color: #060; }
</style>
</head>
<body>
  <h1>WebP pilot — visual comparison</h1>
  <p class="intro">${samples.length} samples rendered at @2x (max 1024px on long edge — what students actually see). Look for: color fidelity, edge crispness, absence of compression blocks/halos, preservation of subtle gradients. The checkered backdrop on each image reveals transparency.</p>

  <table class="summary">
    <tr><th>Category</th><th>Bytes</th><th>vs original</th></tr>
    <tr><td>Originals (PNG)</td><td>${bytesHuman(totalOrig)}</td><td>—</td></tr>
    <tr><td>Lossy WebP q85</td><td>${bytesHuman(totalLossy)}</td><td>saved ${pct(totalOrig - totalLossy, totalOrig)}</td></tr>
    <tr><td>Lossless WebP</td><td>${bytesHuman(totalLossless)}</td><td>saved ${pct(totalOrig - totalLossless, totalOrig)}</td></tr>
  </table>

  ${rows}
</body>
</html>`;
  await fsp.writeFile(path.join(pilotDir, 'index.html'), html, 'utf8');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ============================================================
// Full mode
// ============================================================

async function runFull(args) {
  console.log(`Mode: FULL${args.losslessTree ? ' (LOSSLESS-TREE)' : ''}`);
  console.log(`Source: ${args.source}`);
  console.log(`Output: ${args.out}/${args.losslessTree ? 'themes-lossless' : 'themes'}/`);
  console.log(`Concurrency: ${args.concurrency}`);
  if (args.losslessTree) {
    console.log('All images will be encoded LOSSLESS regardless of overrides.');
  } else {
    console.log(`Auto-lossless heuristic: ${args.autoLossless ? 'ON (experimental)' : 'OFF'}`);
  }

  if (!fs.existsSync(args.source)) {
    console.error(`ERROR: source directory not found: ${args.source}`);
    process.exit(2);
  }

  // Free space
  const free = await checkFreeSpace(args.out);
  if (free !== null) console.log(`Free disk space: ${(free / 1024 / 1024 / 1024).toFixed(1)} GB`);

  // Overrides
  const overrides = loadOverrides();
  console.log(`Lossless overrides loaded: ${overrides.size} entries\n`);

  await fsp.mkdir(args.out, { recursive: true });
  const removedTmps = await cleanStaleTmps(args.out);
  if (removedTmps > 0) console.log(`Cleaned ${removedTmps} stale .tmp files from prior interrupted run\n`);

  // Enumerate PNGs
  console.log('Scanning source...');
  const pngs = [];
  for await (const f of walkPngs(args.source)) pngs.push(f);
  console.log(`Found ${pngs.length} PNG files\n`);

  // Process
  const t0 = Date.now();
  let done = 0;
  let lastEtaPrint = t0;
  const records = [];
  const failures = [];

  await asyncPool(args.concurrency, pngs, async (inputPath) => {
    try {
      const r = await processOne({
        inputPath,
        sourceRoot: args.source,
        outRoot: args.out,
        overrides,
        autoLossless: args.autoLossless,
        losslessTree: args.losslessTree,
      });
      records.push(r);
      done++;
      const variantSummary = r.variants.map(v => `@${v.variant} (${bytesHuman(v.bytes)})`).join(' ');
      const totalOut = r.variants.reduce((s, v) => s + v.bytes, 0);
      const skipTag = r.skipped ? ' [skipped — fresh]' : '';
      const losslessTag = r.lossless ? ' [LL]' : '';
      const savings = r.sourceBytes ? `saved ${pct(r.sourceBytes - totalOut, r.sourceBytes)}` : '';
      process.stdout.write(`[${String(done).padStart(4)}/${pngs.length}] ${r.sourceRel}${losslessTag}  →  ${variantSummary}  ${savings}${skipTag}\n`);

      const now = Date.now();
      if (now - lastEtaPrint > 10_000 && done > 0 && done < pngs.length) {
        const elapsed = (now - t0) / 1000;
        const rate = done / elapsed;
        const remaining = (pngs.length - done) / rate;
        process.stdout.write(`     -- ETA: ${(remaining / 60).toFixed(1)} min (${rate.toFixed(1)} files/s)\n`);
        lastEtaPrint = now;
      }
    } catch (err) {
      done++;
      failures.push({ inputPath, message: err.message });
      process.stdout.write(`[${String(done).padStart(4)}/${pngs.length}] FAIL ${path.relative(args.source, inputPath)}: ${err.message}\n`);
    }
  });

  const elapsed = (Date.now() - t0) / 1000;
  console.log(`\nFinished in ${(elapsed / 60).toFixed(1)} minutes.`);
  console.log(`Processed: ${records.length}   Failed: ${failures.length}\n`);

  await writeReport(args.out, args.source, records, failures, elapsed, args.losslessTree);
}

async function writeReport(outRoot, sourceRoot, records, failures, elapsedSec, losslessTree) {
  const totalSourceBytes = records.reduce((s, r) => s + r.sourceBytes, 0);
  const byVariant = { '1x': [], '2x': [], '3x': [] };
  let totalOutBytes = 0;
  let outCount = 0;

  for (const r of records) {
    for (const v of r.variants) {
      byVariant[v.variant]?.push(v.bytes);
      totalOutBytes += v.bytes;
      outCount++;
    }
  }

  // Anomalies
  const anomalies = {
    largerThanSource: [],
    filenameOddities: [],
    duplicateKeys: [],
    decodeFailures: failures.map(f => ({ source: relPosix(sourceRoot, f.inputPath), error: f.message })),
  };

  for (const r of records) {
    const totalOut = r.variants.reduce((s, v) => s + v.bytes, 0);
    if (totalOut > r.sourceBytes && r.sourceBytes > 0) {
      anomalies.largerThanSource.push({ source: r.sourceRel, sourceBytes: r.sourceBytes, outputBytes: totalOut });
    }
    const baseName = path.basename(r.sourceRel);
    if (/[A-Z]/.test(baseName) || /\s/.test(baseName) || /[^\x00-\x7f]/.test(baseName)) {
      anomalies.filenameOddities.push(r.sourceRel);
    }
  }

  // Duplicate keys (same filename stem in multiple themes)
  const stemMap = new Map();
  for (const r of records) {
    const stem = path.basename(r.sourceRel, path.extname(r.sourceRel)).toLowerCase();
    if (!stemMap.has(stem)) stemMap.set(stem, []);
    stemMap.get(stem).push(r.sourceRel);
  }
  for (const [stem, paths] of stemMap.entries()) {
    if (paths.length > 1) anomalies.duplicateKeys.push({ key: stem, locations: paths });
  }

  const variantSummary = (name) => {
    const arr = byVariant[name];
    return {
      count: arr.length,
      totalBytes: arr.reduce((a, b) => a + b, 0),
      avgBytes: Math.round(avg(arr)),
      medianBytes: Math.round(median(arr)),
      p95Bytes: Math.round(p95(arr)),
      maxBytes: arr.length ? Math.max(...arr) : 0,
    };
  };

  const report = {
    generatedAt: new Date().toISOString(),
    elapsedSec: Math.round(elapsedSec),
    sourceRoot,
    outRoot,
    totals: {
      sourceFiles: records.length,
      outputFiles: outCount,
      sourceBytes: totalSourceBytes,
      outputBytes: totalOutBytes,
      reduction: pct(totalSourceBytes - totalOutBytes, totalSourceBytes),
      losslessCount: records.filter(r => r.lossless).length,
    },
    byVariant: {
      '1x': variantSummary('1x'),
      '2x': variantSummary('2x'),
      '3x': variantSummary('3x'),
    },
    anomalies,
    failures: failures.map(f => ({ source: relPosix(sourceRoot, f.inputPath), error: f.message })),
    files: records.map(r => ({
      source: r.sourceRel,
      sourceBytes: r.sourceBytes,
      sourceWidth: r.sourceWidth,
      sourceHeight: r.sourceHeight,
      sourceHasAlpha: r.sourceHasAlpha,
      lossless: r.lossless,
      variants: r.variants,
    })),
  };

  const reportSuffix = losslessTree ? '-lossless' : '';
  const jsonPath = path.join(outRoot, `_report${reportSuffix}.json`);
  await fsp.writeFile(jsonPath, JSON.stringify(report, null, 2), 'utf8');

  const md = renderReportMd(report);
  const mdPath = path.join(outRoot, `_report${reportSuffix}.md`);
  await fsp.writeFile(mdPath, md, 'utf8');

  console.log(`Report written:\n  ${mdPath}\n  ${jsonPath}`);
}

function renderReportMd(r) {
  const v = r.byVariant;
  const lines = [];
  lines.push(`# WebP conversion report`);
  lines.push('');
  lines.push(`Generated: ${r.generatedAt}`);
  lines.push(`Elapsed: ${(r.elapsedSec / 60).toFixed(1)} min`);
  lines.push('');
  lines.push('## Source / output');
  lines.push('');
  lines.push(`- Source: \`${r.sourceRoot}\``);
  lines.push(`- Output: \`${r.outRoot}\``);
  lines.push('');
  lines.push('## Totals');
  lines.push('');
  lines.push(`| Metric | Value |`);
  lines.push(`|---|---|`);
  lines.push(`| Source PNG files | ${r.totals.sourceFiles} |`);
  lines.push(`| Output WebP files | ${r.totals.outputFiles} |`);
  lines.push(`| Source bytes | ${bytesHuman(r.totals.sourceBytes)} (${r.totals.sourceBytes.toLocaleString()}) |`);
  lines.push(`| Output bytes (all variants) | ${bytesHuman(r.totals.outputBytes)} (${r.totals.outputBytes.toLocaleString()}) |`);
  lines.push(`| Size reduction | **${r.totals.reduction}** |`);
  lines.push(`| Files encoded as lossless | ${r.totals.losslessCount} |`);
  lines.push('');
  lines.push('## Per-variant size distribution');
  lines.push('');
  lines.push(`| Variant | Count | Total | Avg | Median | p95 | Max |`);
  lines.push(`|---|---:|---:|---:|---:|---:|---:|`);
  for (const name of ['1x', '2x', '3x']) {
    const vs = v[name];
    lines.push(`| @${name} | ${vs.count} | ${bytesHuman(vs.totalBytes)} | ${bytesHuman(vs.avgBytes)} | ${bytesHuman(vs.medianBytes)} | ${bytesHuman(vs.p95Bytes)} | ${bytesHuman(vs.maxBytes)} |`);
  }
  lines.push('');
  lines.push('## Anomalies');
  lines.push('');
  lines.push(`### WebP outputs larger than source PNG: ${r.anomalies.largerThanSource.length}`);
  if (r.anomalies.largerThanSource.length) {
    lines.push('');
    for (const a of r.anomalies.largerThanSource) {
      lines.push(`- \`${a.source}\` — source ${bytesHuman(a.sourceBytes)} → output ${bytesHuman(a.outputBytes)}`);
    }
  }
  lines.push('');
  lines.push(`### Filename oddities (uppercase / spaces / non-ASCII): ${r.anomalies.filenameOddities.length}`);
  if (r.anomalies.filenameOddities.length) {
    lines.push('');
    lines.push('Filenames in this list may need to be renamed in source if the deck-rendering side does case-sensitive lookups. Output paths are lowercased; if a vocabulary key uses the mixed-case form, lookup will miss.');
    lines.push('');
    for (const f of r.anomalies.filenameOddities) lines.push(`- \`${f}\``);
  }
  lines.push('');
  lines.push(`### Duplicate keys across themes: ${r.anomalies.duplicateKeys.length}`);
  if (r.anomalies.duplicateKeys.length) {
    lines.push('');
    for (const d of r.anomalies.duplicateKeys) {
      lines.push(`- \`${d.key}\` → ${d.locations.map(l => `\`${l}\``).join(', ')}`);
    }
  }
  lines.push('');
  lines.push(`### Decode failures: ${r.anomalies.decodeFailures.length}`);
  if (r.anomalies.decodeFailures.length) {
    lines.push('');
    for (const d of r.anomalies.decodeFailures) lines.push(`- \`${d.source}\`: ${d.error}`);
  }
  lines.push('');
  return lines.join('\n');
}

// ============================================================
// Entry point
// ============================================================

(async () => {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.pilot) await runPilot(args);
    else await runFull(args);
  } catch (err) {
    console.error('\nFATAL:', err.stack || err.message);
    process.exit(1);
  }
})();
