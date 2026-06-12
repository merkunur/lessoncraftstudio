/**
 * Silhouette derivation — turns a cached theme image into a solid-ink shadow
 * shape (alpha-preserving), cached at cache/silhouettes/<theme>/<noun>.png.
 * Used by shadow-match / visual-perception types.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { themeEntry } = require('./resolve.js');

const CACHE = path.join(__dirname, '..', 'cache');
const INK = { r: 0x3A, g: 0x35, b: 0x30 }; // tokens.color.ink

async function silhouetteUri(theme, noun) {
  const entry = themeEntry(theme).nouns[noun];
  if (!entry) throw new Error('silhouette: noun not cached: ' + theme + '/' + noun);
  const src = path.join(CACHE, 'themes', theme, entry.files[0]);
  const dir = path.join(CACHE, 'silhouettes', theme);
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, noun + '.png');
  if (!fs.existsSync(dest)) {
    const { width, height } = await sharp(src).metadata();
    // flat ink-colored canvas + the source's alpha channel = the shadow shape
    const alpha = await sharp(src).ensureAlpha().extractChannel(3).raw().toBuffer();
    await sharp({ create: { width, height, channels: 3, background: INK } })
      .joinChannel(alpha, { raw: { width, height, channels: 1 } })
      .png()
      .toFile(dest);
  }
  return require('url').pathToFileURL(dest).href;
}

const _maskCache = new Map();

/**
 * Low-res binary alpha mask (24×24) for shape-similarity checks.
 * Used to keep shadow-match pairs visually DISTINCT (two round fruits would
 * make near-identical, ambiguous shadows).
 */
async function maskSignature(theme, noun) {
  const key = theme + '/' + noun;
  if (_maskCache.has(key)) return _maskCache.get(key);
  const entry = themeEntry(theme).nouns[noun];
  const src = path.join(CACHE, 'themes', theme, entry.files[0]);
  const buf = await sharp(src).ensureAlpha().extractChannel(3)
    .resize(24, 24, { fit: 'contain', background: { r: 0, g: 0, b: 0 } }).raw().toBuffer();
  const mask = Array.from(buf, (v) => (v > 64 ? 1 : 0));
  _maskCache.set(key, mask);
  return mask;
}

/** Intersection-over-union of two binary masks (1 = identical shape). */
function maskIoU(a, b) {
  let inter = 0, union = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] & b[i]) inter++;
    if (a[i] | b[i]) union++;
  }
  return union === 0 ? 0 : inter / union;
}

/**
 * Pick `count` nouns whose silhouettes are pairwise distinct (IoU below
 * threshold). Greedy over an rng-shuffled candidate order — deterministic
 * per seed. Throws if the theme cannot supply enough distinct shapes.
 */
async function pickDistinctSilhouettes(theme, nouns, count, rng, threshold) {
  // 0.72 calibrated on the fruits theme (apple-vs-peach/persimmon/nectarine
  // confusables sit at 0.74-0.91; legitimately distinct pairs at <=0.71)
  const thr = threshold || 0.72;
  const order = rng.shuffle(nouns);
  const picked = [];
  for (const cand of order) {
    const m = await maskSignature(theme, cand.noun);
    let ok = true;
    for (const p of picked) {
      if (maskIoU(m, p._mask) >= thr) { ok = false; break; }
    }
    if (ok) picked.push(Object.assign({ _mask: m }, cand));
    if (picked.length === count) return picked.map(({ _mask, ...rest }) => rest);
  }
  throw new Error(`silhouette: theme ${theme} cannot supply ${count} shape-distinct nouns (got ${picked.length})`);
}

module.exports = { silhouetteUri, maskSignature, maskIoU, pickDistinctSilhouettes };
