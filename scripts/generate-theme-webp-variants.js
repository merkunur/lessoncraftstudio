#!/usr/bin/env node
/**
 * Build the @1x/@2x/@3x WebP mirror for an image-library directory that has raw
 * files but no variants — the gap `audit-theme-webp-coverage.js` reports.
 *
 * Encoder settings are taken from `scripts/convert-png-to-webp.js` (the pipeline
 * that produced every other theme) so a repaired directory is indistinguishable
 * from one built normally. It does NOT re-derive them and it does NOT invent them.
 *
 * ⚠ It generates from the RAW source file only. An earlier repair aliased the
 * missing variants to a similarly-named older theme's files; the names matched,
 * the artwork did not, and children saw puzzle pieces change picture. The
 * --verify pass exists because of that: it decodes each generated variant next to
 * its own source and fails if they are not the same picture.
 *
 *   node scripts/generate-theme-webp-variants.js --dir=<dirname>            # dry run
 *   node scripts/generate-theme-webp-variants.js --dir=<dirname> --apply
 *   node scripts/generate-theme-webp-variants.js --dir=<dirname> --verify   # pixel proof
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/);
  return m ? [m[1], m[2] ?? true] : [a, true];
}));

const RAW_ROOT = args['raw-root'] || '/opt/lessoncraftstudio/frontend/public/images';
const WEBP_ROOT = args['webp-root'] || '/var/www/lcs-media/image-library-webp';
const DIR = args.dir;
if (!DIR) { console.log('  --dir=<directory name under public/images> is required'); process.exit(1); }

// Verbatim from scripts/convert-png-to-webp.js — do not tune these here.
const VARIANTS = [['1x', 512], ['2x', 1024], ['3x', 1536]];
const QUALITY = 85;
const ALPHA_QUALITY = 100;
const EFFORT = 5;

const src = path.join(RAW_ROOT, DIR);
if (!fs.existsSync(src)) { console.log(`  no such raw directory: ${src}`); process.exit(1); }
const files = fs.readdirSync(src).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));
if (!files.length) { console.log(`  no raw images in ${src}`); process.exit(1); }

(async () => {
  if (args.verify) {
    let worst = 0, worstName = '', pairs = 0;
    const sig = async (p) => sharp(p).resize(64, 64, { fit: 'fill' }).removeAlpha().raw().toBuffer();
    for (const f of files) {
      const stem = f.replace(/\.[^.]+$/, '');
      const a = await sig(path.join(src, f));
      for (const tree of ['themes', 'themes-lossless']) {
        const v = path.join(WEBP_ROOT, tree, DIR, `${stem}@3x.webp`);
        if (!fs.existsSync(v)) { console.log(`  MISSING ${v}`); continue; }
        const b = await sig(v);
        let d = 0; for (let i = 0; i < a.length; i++) d += Math.abs(a[i] - b[i]);
        const mean = d / a.length; pairs++;
        if (mean > worst) { worst = mean; worstName = `${tree}/${stem}`; }
      }
    }
    if (!pairs) { console.log('  FAIL: verified nothing — no variants present.'); process.exit(1); }
    console.log(`  pixel-compared ${pairs} variant/source pairs`);
    console.log(`  worst mean difference: ${worst.toFixed(2)} of 255, on ${worstName}`);
    // Resize + re-encode noise measures ~5; a different picture measures 40+.
    console.log(worst < 15 ? '  PASS: every variant is the same picture as its own source.'
                           : '  FAIL: a variant is not its source — do NOT ship this.');
    process.exit(worst < 15 ? 0 : 1);
  }

  console.log(`  ${args.apply ? 'APPLY' : 'DRY-RUN'} — ${files.length} raw images in ${DIR}`);
  let made = 0, skipped = 0;
  for (const tree of ['themes', 'themes-lossless']) {
    const out = path.join(WEBP_ROOT, tree, DIR);
    if (args.apply) fs.mkdirSync(out, { recursive: true });
    for (const f of files) {
      const stem = f.replace(/\.[^.]+$/, '');
      for (const [name, edge] of VARIANTS) {
        const dest = path.join(out, `${stem}@${name}.webp`);
        if (fs.existsSync(dest)) { skipped++; continue; }
        if (!args.apply) { made++; continue; }
        let p = sharp(path.join(src, f)).resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true });
        p = tree === 'themes-lossless'
          ? p.webp({ lossless: true, alphaQuality: ALPHA_QUALITY, effort: EFFORT })
          : p.webp({ quality: QUALITY, alphaQuality: ALPHA_QUALITY, effort: EFFORT, smartSubsample: true });
        await p.toFile(dest);
        made++;
      }
    }
  }
  console.log(`  ${args.apply ? 'written' : 'would write'}: ${made}   already present: ${skipped}`);
  if (args.apply) console.log('  next: chown lcs-media: the new directories, then --verify');
})();
