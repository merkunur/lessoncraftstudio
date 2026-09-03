#!/usr/bin/env node
/**
 * stage-new-faces.js <locale> [--apply]
 *
 * Copies ONLY the not-yet-published faces out of a built wave into
 * out/upload/<wave>/, ready to SCP.
 *
 * WHY. The b2var wave builds all 100 faces, but 64 of them are already
 * published (704 landings live = 64 x 11). Uploading the whole staging
 * directory would drive 64 INSERT-path collisions per locale straight into
 * publish-bulk's title/description uniqueness gates — which is a HALT, not a
 * skip. The new set is derived from the LIVE corpus, never from a hand-written
 * list: a hand-written count certifies a subset, and this one has already been
 * wrong once in this batch.
 *
 * Non-vacuity: refuses to run if the derived new-set is empty or is the whole
 * wave, since either means the corpus read failed rather than that the answer is
 * genuinely 0 or 100.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const REPO = path.join(ROOT, '..', '..');
const { ROWS } = require(path.join(ROOT, 'tools', 'gen-b2var-specs.js'));

const loc = process.argv[2];
const apply = process.argv.includes('--apply');
if (!loc) { console.error('usage: stage-new-faces.js <locale> [--apply]'); process.exit(2); }

const corpusPath = path.join(REPO, 'frontend', 'content', 'seo-landing', loc + '.json');
const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8')).landings;
const published = new Set();
for (const l of corpus) {
  const m = /-((?:k|g\d)\d+)$/.exec(l.canonicalDeckSlug || '');
  if (m) published.add(m[1].replace(/^(k|g\d)/, (x) => x.toUpperCase() + '-'));
}
const all = ROWS.map((r) => r[1]);
const fresh = all.filter((id) => !published.has(id));
if (!fresh.length || fresh.length === all.length) {
  console.error(`refusing: derived ${fresh.length} new faces of ${all.length} — the corpus read looks wrong`);
  process.exit(2);
}

const src = path.join(ROOT, 'out', 'staging', 'wave-b2var-' + loc);
const dst = path.join(ROOT, 'out', 'upload', 'wave-b2var-' + loc);
const zips = fs.readdirSync(src).filter((f) => f.endsWith('.zip'));
const wanted = zips.filter((f) => {
  const m = /-((?:k|g\d)\d+)-/.exec(f);
  return m && fresh.includes(m[1].replace(/^(k|g\d)/, (x) => x.toUpperCase() + '-'));
});

console.log(`${loc}: ${zips.length} built, ${published.size} already published, ${fresh.length} new -> ${wanted.length} zips`);
if (wanted.length !== fresh.length) console.error(`  ⚠ ${fresh.length} new faces but ${wanted.length} zips — a face did not build`);
if (apply) {
  fs.rmSync(dst, { recursive: true, force: true });
  fs.mkdirSync(dst, { recursive: true });
  for (const f of wanted) fs.copyFileSync(path.join(src, f), path.join(dst, f));
  console.log('  -> ' + dst);
}
