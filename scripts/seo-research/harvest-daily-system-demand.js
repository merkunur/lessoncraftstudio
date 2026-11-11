#!/usr/bin/env node
/**
 * harvest-daily-system-demand.js — what teachers type around the five NEW surfaces of the
 * Daily Teaching System (docs/daily-teaching-system/PLAN.md, Part 0.3): units and lesson
 * plans, the national curriculum, assessments, substitute-teacher packs, first readers.
 *
 * Probes: scripts/seo-research/daily-system-seeds.json — per market and surface, `deep` heads
 * (asked bare and crossed with a–z) and `shallow` heads (asked bare only). Google autocomplete
 * gives NO volumes: the answers show which phrasings exist and how wide each head's tail is.
 *
 * RUN ONE PROCESS AT A TIME. On 2026-11-11 two processes at 300 ms answered 3,200 lookups
 * cleanly; five at once got the IP refused (HTTP 403) for a while. The script stops after
 * eight errors in a row and resumes where it stopped.
 *
 * NON-DESTRUCTIVE: writes only docs/SEO/daily-system-demand/harvest.<loc>.json.
 * Resumable: an existing file keeps its answered seeds; only missing seeds are fetched.
 *
 * Usage:
 *   node scripts/seo-research/harvest-daily-system-demand.js --locale=en [--delay=300]
 *   node scripts/seo-research/harvest-daily-system-demand.js --locales=en,de,sv
 *   node scripts/seo-research/harvest-daily-system-demand.js --all
 *   node scripts/seo-research/harvest-daily-system-demand.js --all --dry-run
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'docs', 'SEO', 'daily-system-demand');
const SEEDS = require('./daily-system-seeds.json');
/* en = United States, es = Mexico, pt = Brazil (the site's locale variants) */
const MARKETS = {
  en: { hl: 'en', gl: 'us' }, de: { hl: 'de', gl: 'de' }, fr: { hl: 'fr', gl: 'fr' }, es: { hl: 'es', gl: 'mx' },
  pt: { hl: 'pt', gl: 'br' }, it: { hl: 'it', gl: 'it' }, nl: { hl: 'nl', gl: 'nl' }, sv: { hl: 'sv', gl: 'se' },
  da: { hl: 'da', gl: 'dk' }, no: { hl: 'no', gl: 'no' }, fi: { hl: 'fi', gl: 'fi' },
};
const SURFACES = ['units', 'curriculum', 'assessments', 'sub', 'readers'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const has = (k) => process.argv.includes('--' + k);

function suggestUrl(m, q) {
  return 'https://suggestqueries.google.com/complete/search?client=firefox&oe=utf-8&hl=' + m.hl + '&gl=' + m.gl + '&q=' + encodeURIComponent(q);
}
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 12000, headers: { 'User-Agent': 'Mozilla/5.0 (research)' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const c = []; res.on('data', (x) => c.push(x));
      res.on('end', () => { try { resolve(JSON.parse(Buffer.concat(c).toString('utf8'))); } catch (e) { reject(e); } });
    });
    req.on('timeout', () => req.destroy(new Error('timeout'))); req.on('error', reject);
  });
}
function seedsFor(locale) {
  const out = [];
  for (const surface of SURFACES) {
    const s = (SEEDS[locale] || {})[surface]; if (!s) throw new Error('no seeds for ' + locale + '/' + surface);
    for (const h of s.deep) {
      out.push({ surface, head: h, depth: 'deep', q: h });
      for (const ch of 'abcdefghijklmnopqrstuvwxyz') out.push({ surface, head: h, depth: 'deep', q: h + ' ' + ch });
    }
    for (const h of s.shallow) out.push({ surface, head: h, depth: 'shallow', q: h });
  }
  return out;
}
async function run(locale) {
  const seeds = seedsFor(locale);
  if (has('dry-run')) { console.log(locale, seeds.length, 'requests;', new Set(seeds.map((s) => s.head)).size, 'heads'); return true; }
  fs.mkdirSync(OUT, { recursive: true });
  const file = path.join(OUT, 'harvest.' + locale + '.json');
  const doc = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { locale, market: MARKETS[locale], answers: {} };
  const delay = +arg('delay', 300); let n = 0, errs = 0, streak = 0;
  for (const s of seeds) {
    if (doc.answers[s.q]) continue;
    try {
      const j = await fetchJson(suggestUrl(MARKETS[locale], s.q));
      doc.answers[s.q] = { surface: s.surface, head: s.head, depth: s.depth, got: Array.isArray(j[1]) ? j[1] : [] };
      n++; streak = 0;
      if (n % 40 === 0) { fs.writeFileSync(file, JSON.stringify(doc)); process.stdout.write(locale + ' ' + n + ' '); }
    } catch (e) {
      errs++; streak++;
      if (streak >= 8) { fs.writeFileSync(file, JSON.stringify(doc)); console.log('\n' + locale + ': 8 errors in a row (' + e.message + ') — stopped; re-run to resume'); return false; }
      await sleep(2500);
    }
    await sleep(delay);
  }
  doc.harvested = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(file, JSON.stringify(doc));
  const answered = seeds.filter((s) => doc.answers[s.q]).length;
  console.log('\n' + locale + ': ' + answered + ' of ' + seeds.length + ' seeds answered (' + n + ' new, ' + errs + ' errors)' + (answered < seeds.length ? ' — INCOMPLETE, re-run' : ''));
  return answered === seeds.length;
}
(async () => {
  const locales = has('all') ? Object.keys(MARKETS) : (arg('locales') ? arg('locales').split(',') : [arg('locale', 'en')]);
  let ok = true;
  for (const l of locales) { if (!MARKETS[l]) { console.error('unknown locale ' + l); process.exit(2); } ok = (await run(l)) && ok; }
  process.exit(ok ? 0 : 1);
})();
