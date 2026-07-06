#!/usr/bin/env node
/**
 * augment-gate.js — verification gate for the Unit 3 landing augment (2026-07-06).
 *
 * Asserts, per locale:
 *   1. COVERAGE: ≥50% of landings have an augment entry, and ≥60% of entries
 *      carry manifest data (deckStats or contentDate) — the differentiation payload.
 *   2. ANSWER HYGIENE: no augment entry for a HIDE type (cryptogram, word-guess,
 *      word-scramble, crossword) carries realWords/imageNouns/sampleProblems.
 *   3. NO RESULTS: no sampleProblems string contains a computed result
 *      (must end "= ?"; never "= <digits>").
 *   4. RENDER CHECK (optional --rendered=<dir>): sampled rendered pages of
 *      augmented landings contain the facts section; sampled HIDE-type pages
 *      contain NO wordlist section with realWords.
 *
 * Exit 1 on any FAIL. Usage:
 *   node scripts/seo-landing/augment-gate.js --locales=en,de [--rendered=/var/www/lcs-media/landings]
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_CANDIDATES = [path.resolve(__dirname, '..', '..'), '/opt/lessoncraftstudio'];
const ROOT = REPO_CANDIDATES.find((r) => fs.existsSync(path.join(r, 'frontend', 'config', 'topics-taxonomy.json')));
const LANDING_DIRS = [path.join(ROOT, 'content-data', 'seo-landing'), path.join(ROOT, 'frontend', 'content', 'seo-landing')];
const AUGMENT_DIR = process.env.LCS_AUGMENT_DIR || '/var/www/lcs-media/landings-augment';
const ALL_LOCALES = ['en', 'de', 'es', 'sv', 'nl', 'da', 'it', 'no', 'fr', 'pt', 'fi'];
const HIDE_TYPES = new Set(['cryptogram', 'word-guess', 'word-scramble', 'crossword']);

function parseArgs() {
  const args = { locales: ALL_LOCALES, rendered: null };
  for (const a of process.argv.slice(2)) {
    if (a.startsWith('--locales=')) {
      const v = a.slice(10);
      args.locales = v === 'all' ? ALL_LOCALES.slice() : v.split(',');
    } else if (a.startsWith('--rendered=')) args.rendered = a.slice(11);
    else { console.error('unknown arg: ' + a); process.exit(2); }
  }
  return args;
}

function loadLandings(locale) {
  for (const dir of LANDING_DIRS) {
    const p = path.join(dir, `${locale}.json`);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')).landings;
  }
  return null;
}

function main() {
  const args = parseArgs();
  let fails = 0;
  const fail = (msg) => { fails++; console.error('FAIL ' + msg); };

  for (const locale of args.locales) {
    const landings = loadLandings(locale);
    if (!landings) { console.warn(`(no landings for ${locale} — skipped)`); continue; }
    const augPath = path.join(AUGMENT_DIR, `${locale}.json`);
    if (!fs.existsSync(augPath)) { fail(`${locale}: augment file missing at ${augPath}`); continue; }
    const aug = JSON.parse(fs.readFileSync(augPath, 'utf8'));

    const typeBySlug = new Map(landings.map((l) => [l.slug, l.coordinate.type]));
    const entries = Object.entries(aug);
    const covered = entries.length;
    const withData = entries.filter(([, v]) => v.deckStats || v.contentDate).length;

    // 1. coverage
    const covPct = covered / landings.length;
    const dataPct = covered ? withData / covered : 0;
    console.log(`${locale}: ${covered}/${landings.length} covered (${(covPct * 100).toFixed(0)}%), ${withData} with manifest data (${(dataPct * 100).toFixed(0)}%)`);
    if (covPct < 0.5) fail(`${locale}: coverage ${(covPct * 100).toFixed(0)}% < 50%`);
    if (dataPct < 0.6) fail(`${locale}: manifest-data rate ${(dataPct * 100).toFixed(0)}% < 60%`);

    // 2 + 3. hygiene
    for (const [slug, v] of entries) {
      const type = typeBySlug.get(slug);
      if (HIDE_TYPES.has(type) && (v.realWords || v.imageNouns || v.sampleProblems)) {
        fail(`${locale}/${slug}: HIDE type ${type} carries word/problem content`);
      }
      for (const p of v.sampleProblems || []) {
        if (/=\s*\d/.test(p)) fail(`${locale}/${slug}: sampleProblem leaks a result: "${p}"`);
      }
    }

    // 4. rendered spot-check
    if (args.rendered) {
      const augmented = entries.filter(([, v]) => v.deckStats).slice(0, 5);
      for (const [slug] of augmented) {
        const p = path.join(args.rendered, locale, slug, 'index.html');
        if (!fs.existsSync(p)) continue;
        const html = fs.readFileSync(p, 'utf8');
        if (!html.includes('class="facts"')) fail(`${locale}/${slug}: rendered page missing facts section`);
      }
      const hidden = landings.filter((l) => HIDE_TYPES.has(l.coordinate.type)).slice(0, 5);
      for (const l of hidden) {
        const p = path.join(args.rendered, locale, l.slug, 'index.html');
        if (!fs.existsSync(p)) continue;
        const html = fs.readFileSync(p, 'utf8');
        const m = /class="wordlist"[\s\S]*?<\/section>/.exec(html);
        if (m && !/class="prob"/.test(m[0])) fail(`${locale}/${l.slug}: HIDE type renders a word list`);
      }
    }
  }

  if (fails) { console.error(`\naugment-gate: ${fails} FAILURE(S)`); process.exit(1); }
  console.log('\naugment-gate: PASS');
}

main();
