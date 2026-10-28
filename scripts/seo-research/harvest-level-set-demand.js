#!/usr/bin/env node
/**
 * harvest-level-set-demand.js — what people actually type AFTER a worksheet type's name,
 * per market, for the worksheet types whose Level Set decks are noindex.
 *
 * Why it exists: harvest-suggest.js seeded each type with one or two phrases, so the topic
 * long tail behind a head ("color by number christmas", "mazes for 5 year olds",
 * "sight words list kindergarten") was never probed. This script crosses each type's
 * search head with the alphabet ("<head> a" … "<head> z", plus the bare head), which is
 * how autocomplete reveals the continuations people really search. The output feeds
 * build-level-set-demand-report.js, which matches the phrases to noindex decks.
 *
 * Heads: the taxonomy display name per locale (axes.exercise-type.<key>.name.<locale>,
 * lower-cased), plus an explicit list where the display name is not the search head
 * (HEADS below). NON-DESTRUCTIVE: writes only docs/SEO/level-set-demand/harvest.<loc>.json.
 * Resumable: an existing output keeps its answered seeds, only missing seeds are fetched.
 *
 * Usage:
 *   node scripts/seo-research/harvest-level-set-demand.js --locale=en [--delay=250] [--types=a,b]
 *   node scripts/seo-research/harvest-level-set-demand.js --all
 *   node scripts/seo-research/harvest-level-set-demand.js --locale=en --dry-run
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'docs', 'SEO', 'level-set-demand');
const MARKETS = {
  en: { hl: 'en', gl: 'us' }, de: { hl: 'de', gl: 'de' }, fr: { hl: 'fr', gl: 'fr' }, es: { hl: 'es', gl: 'mx' },
  pt: { hl: 'pt', gl: 'br' }, it: { hl: 'it', gl: 'it' }, nl: { hl: 'nl', gl: 'nl' }, sv: { hl: 'sv', gl: 'se' },
  da: { hl: 'da', gl: 'dk' }, no: { hl: 'no', gl: 'no' }, fi: { hl: 'fi', gl: 'fi' },
};
/* the types whose Level Set decks are noindex (measured from the DB 2026-10-28, 73 types) */
const TYPES = ['sight-words', 'pre-writing', 'arrays-multiplication', 'picture-word-cards', 'picture-writing', 'number-charts', 'picture-tracing', 'number-lines', 'fractions', 'word-tracing', 'money', 'ordinal-numbers', 'write-the-word', 'doubles-halves', 'graphing-data', 'division-with-remainder', 'read-and-color', 'how-to-draw', 'maze-puzzles', 'find-the-differences', 'color-by-number', 'letter-of-the-week', 'geometry', 'word-problems', 'column-arithmetic', 'telling-time', 'measurement', 'dot-to-dot', 'multiplication-tables', 'number-bonds', 'letter-tracing', 'word-classes', 'story-sequencing', 'question-words', 'number-walls', 'mental-math', 'hundreds-chart-puzzles', 'singular-plural', 'rounding', 'reading-comprehension', 'number-words', 'rhyming-words', 'syllable-reading', 'pronouns', 'odd-and-even', 'logic-puzzles', 'verb-forms', 'read-and-do', 'synonyms', 'fact-families', 'cursive-writing', '2d-shapes', 'syllable-split', 'maps', 'number-tracing', 'calendar', 'family', 'word-parts', 'capitals-punctuation', 'spelling-rules', 'days-and-months', 'cloze', 'opposites', 'sound-boxes', 'number-of-the-day', 'grid-coordinates', 'alphabetical-order', 'sentence-building', 'digraphs', 'articles', 'feelings', 'all-about-me', 'compound-words'];
/* English search heads where the catalogue's display name is not what people type */
const HEADS = {
  en: {
    'maze-puzzles': ['mazes', 'maze worksheets'], 'dot-to-dot': ['dot to dot'], 'how-to-draw': ['how to draw'],
    'find-the-differences': ['spot the difference', 'find the difference'], 'color-by-number': ['color by number'],
    'picture-tracing': ['tracing pictures', 'tracing worksheets'], 'pre-writing': ['pre writing worksheets', 'line tracing'],
    'arrays-multiplication': ['arrays worksheets'], 'picture-word-cards': ['picture word cards', 'vocabulary cards'],
    'letter-of-the-week': ['letter of the week'], 'word-problems': ['word problems'], 'telling-time': ['telling time worksheets'],
    'multiplication-tables': ['multiplication tables', 'times tables worksheets'], 'reading-comprehension': ['reading comprehension'],
    'cursive-writing': ['cursive writing worksheets'], 'logic-puzzles': ['logic puzzles for kids'], 'sight-words': ['sight words', 'sight word worksheets'],
    'number-tracing': ['number tracing'], 'letter-tracing': ['letter tracing'], 'all-about-me': ['all about me worksheet'],
  },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };
const has = (k) => process.argv.includes(`--${k}`);

function suggestUrl(m, q) { return 'https://suggestqueries.google.com/complete/search?client=firefox&oe=utf-8' + `&hl=${m.hl}&gl=${m.gl}&q=${encodeURIComponent(q)}`; }
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 12000, headers: { 'User-Agent': 'Mozilla/5.0 (research)' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const c = []; res.on('data', (x) => c.push(x)); res.on('end', () => { try { resolve(JSON.parse(Buffer.concat(c).toString('utf8'))); } catch (e) { reject(e); } });
    });
    req.on('timeout', () => req.destroy(new Error('timeout'))); req.on('error', reject);
  });
}
function headsFor(locale, type) {
  const tax = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));
  const e = tax.axes['exercise-type'][type]; const name = e && e.name && e.name[locale];
  const out = new Set(); if (name) out.add(name.toLowerCase().replace(/[–—:]/g, ' ').replace(/\s+/g, ' ').trim());
  ((HEADS[locale] || {})[type] || []).forEach((h) => out.add(h));
  return [...out];
}
function seedsFor(locale, types) {
  const seeds = [];
  for (const t of types) for (const h of headsFor(locale, t)) {
    seeds.push({ type: t, head: h, q: h });
    for (const ch of 'abcdefghijklmnopqrstuvwxyz') seeds.push({ type: t, head: h, q: h + ' ' + ch });
  }
  return seeds;
}
async function run(locale) {
  const types = arg('types') ? arg('types').split(',') : TYPES;
  const seeds = seedsFor(locale, types);
  if (has('dry-run')) { console.log(locale, seeds.length, 'seeds;', [...new Set(seeds.map((s) => s.head))].slice(0, 12).join(' | ')); return; }
  fs.mkdirSync(OUT, { recursive: true });
  const file = path.join(OUT, `harvest.${locale}.json`);
  const doc = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { locale, market: MARKETS[locale], answers: {} };
  const delay = +arg('delay', 250); let n = 0, errs = 0, streak = 0;
  for (const s of seeds) {
    if (doc.answers[s.q]) continue;
    try {
      const j = await fetchJson(suggestUrl(MARKETS[locale], s.q));
      doc.answers[s.q] = { type: s.type, head: s.head, s: (j[1] || []).map(String) }; streak = 0; n++;
    } catch (e) {
      errs++; streak++;
      if (/HTTP 429|HTTP 403/.test(e.message)) { console.error(`  ${locale}: ${e.message} — backing off 60 s`); await sleep(60000); }
      if (streak >= 8) { console.error(`  ${locale}: 8 errors in a row, stopping (resume later)`); break; }
    }
    if (n % 100 === 0) fs.writeFileSync(file, JSON.stringify(doc));
    await sleep(delay + Math.floor(Math.random() * 120));
  }
  doc.generatedAt = new Date().toISOString(); doc.seedCount = seeds.length;
  doc.answered = Object.keys(doc.answers).length;
  fs.writeFileSync(file, JSON.stringify(doc));
  console.log(`${locale}: ${n} fetched now, ${doc.answered}/${seeds.length} answered, ${errs} errors`);
}
(async () => {
  const locs = has('all') ? Object.keys(MARKETS) : [arg('locale', 'en')];
  for (const l of locs) await run(l);
})();
