#!/usr/bin/env node
/**
 * build-topic-overrides.js — merges a locale's research deliverable
 * (docs/SEO/demand-terms-<locale>.json, produced by the native demand-map
 * ensembles) into the live override file
 * (frontend/content/topic-seo-overrides/<locale>.json).
 *
 * - singleAxis: title/h1/metaDescription copied per key (prose only if the
 *   terms file carries one). ALL winnability classes are merged — a
 *   research-grounded title beats the generic template even on "hard" keys.
 * - intersection: merged ONLY for entries that carry `prose` (the ≥200-word
 *   authored body a flip requires — see validate-topic-overrides.js). Entries
 *   without prose are reported as pending so the flip never ships thin.
 * - Existing override entries not present in the terms file are preserved.
 *
 * Always run scripts/seo/validate-topic-overrides.js after this.
 *
 * Usage: node scripts/seo/build-topic-overrides.js --locale=en [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const argVal = (n, d) => {
  const a = process.argv.find((x) => x.startsWith(`--${n}=`));
  return a ? a.split('=')[1] : d;
};
const locale = argVal('locale', null);
const dryRun = process.argv.includes('--dry-run');
if (!locale) { console.error('Usage: --locale=<loc> [--dry-run]'); process.exit(2); }

const termsPath = path.join(ROOT, 'docs', 'SEO', `demand-terms-${locale}.json`);
const outPath = path.join(ROOT, 'frontend', 'content', 'topic-seo-overrides', `${locale}.json`);
const terms = JSON.parse(fs.readFileSync(termsPath, 'utf8'));

let out = { $comment: `Demand-keyed SEO overrides authored from docs/SEO/demand-map-${locale}.md (+ demand-terms-${locale}.json). Validated by scripts/seo/validate-topic-overrides.js.`, singleAxis: {}, intersection: {} };
if (fs.existsSync(outPath)) {
  const existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  out.singleAxis = existing.singleAxis || {};
  out.intersection = existing.intersection || {};
  if (existing.$comment) out.$comment = existing.$comment;
}

let sAdded = 0, sUpdated = 0;
for (const [key, e] of Object.entries(terms.singleAxis || {})) {
  const entry = {};
  if (e.title) entry.title = e.title;
  if (e.h1) entry.h1 = e.h1;
  if (e.metaDescription) entry.metaDescription = e.metaDescription;
  if (e.prose) entry.prose = e.prose;
  if (!Object.keys(entry).length) continue;
  if (out.singleAxis[key]) sUpdated++; else sAdded++;
  out.singleAxis[key] = Object.assign({}, out.singleAxis[key], entry);
}

let iAdded = 0, iPendingProse = 0;
for (const e of terms.intersections || []) {
  if (!e.key) continue;
  if (!e.prose || !e.prose.trim()) { iPendingProse++; continue; }
  const entry = { title: e.title, h1: e.h1, metaDescription: e.metaDescription, prose: e.prose };
  Object.keys(entry).forEach((k) => { if (entry[k] == null) delete entry[k]; });
  out.intersection[e.key] = Object.assign({}, out.intersection[e.key], entry);
  iAdded++;
}

console.log(`[${locale}] singleAxis: +${sAdded} new, ~${sUpdated} updated (total ${Object.keys(out.singleAxis).length})`);
console.log(`[${locale}] intersection: +${iAdded} merged, ${iPendingProse} pending prose (total ${Object.keys(out.intersection).length})`);
if (dryRun) { console.log('dry-run: nothing written'); process.exit(0); }
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(`wrote ${outPath}`);
