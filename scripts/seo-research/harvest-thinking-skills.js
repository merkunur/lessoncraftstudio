#!/usr/bin/env node
/**
 * harvest-thinking-skills.js — what US K-3 teachers type around THINKING-SKILLS units (Daily Teaching System, Stage D-3,
 * plan decision 4: one Thinking Skills unit per grade K-3 — visual perception, mazes, grid copy, picture sudoku,
 * analogies, logic grids — for morning work and centers; titles from the US search heads).
 *
 * Probes: each head × each grade name ("<head> for <grade>", "<grade> <head>"), plus a-z crossings of the bare unit
 * heads (which phrasings people complete at all). Google autocomplete gives NO volumes: an answer shows a phrasing
 * exists; the count of answers shows a tail's width.
 *
 * NON-DESTRUCTIVE: writes only docs/SEO/daily-system-demand/thinking-skills.en.json. Resumable: answered probes are
 * kept. One process at a time, 300 ms apart (five at once got the IP refused on 2026-11-11); stops after 8 errors in a row.
 *
 *   node scripts/seo-research/harvest-thinking-skills.js [--delay=300] [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'docs', 'SEO', 'daily-system-demand', 'thinking-skills.en.json');
const MARKET = { hl: 'en', gl: 'us' };
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const DELAY = Number(arg('delay', '300'));
const DRY = process.argv.includes('--dry-run');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** heads as US teachers name the work (probes written by the build session, not copy) */
const HEADS = [
  'critical thinking worksheets', 'critical thinking activities', 'critical thinking lesson plans', 'logic puzzles',
  'logic worksheets', 'logic grid puzzles', 'brain teasers', 'thinking skills', 'visual perception worksheets',
  'visual discrimination worksheets', 'spot the difference', 'mazes', 'picture sudoku', 'sudoku', 'analogies',
  'problem solving worksheets', 'reasoning worksheets', 'morning work', 'early finisher activities',
];
const GRADES = ['kindergarten', 'first grade', '1st grade', 'second grade', '2nd grade', 'third grade', '3rd grade'];
const PATTERNS = ['{h} for {g}', '{g} {h}'];
const DEEP = ['critical thinking unit', 'thinking skills unit', 'logic unit', 'critical thinking lesson plans', 'logic puzzles for kids', 'critical thinking worksheets'];

function probes() {
  const out = [];
  for (const h of HEADS) for (const g of GRADES) for (const p of PATTERNS) out.push({ q: p.replace('{h}', h).replace('{g}', g), head: h, grade: g });
  for (const h of DEEP) { out.push({ q: h, deep: h }); for (const c of 'abcdefghijklmnopqrstuvwxyz') out.push({ q: h + ' ' + c, deep: h }); }
  return out;
}
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 12000, headers: { 'User-Agent': 'Mozilla/5.0 (research)' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const c = []; res.on('data', (x) => c.push(x));
      res.on('end', () => { try { resolve(JSON.parse(Buffer.concat(c).toString('utf8'))); } catch (e) { reject(e); } });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}
(async () => {
  const all = probes();
  if (DRY) { console.log(all.length + ' probes'); console.log(all.slice(0, 8).map((p) => p.q).join('\n')); return; }
  const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { answers: {} };
  const answers = prev.answers || {};
  let errs = 0, asked = 0;
  for (const p of all) {
    if (answers[p.q]) continue;
    const url = 'https://suggestqueries.google.com/complete/search?client=firefox&oe=utf-8&hl=' + MARKET.hl + '&gl=' + MARKET.gl + '&q=' + encodeURIComponent(p.q);
    try { const j = await fetchJson(url); answers[p.q] = { head: p.head || p.deep || null, grade: p.grade || null, s: j[1] || [] }; errs = 0; asked++; }
    catch (e) { errs++; console.log('error ' + p.q + ': ' + e.message); if (errs >= 8) { console.log('8 errors in a row: stopping (resumable)'); break; } }
    await sleep(DELAY);
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ market: 'US', generatedAt: new Date().toISOString(), probes: all.length, answered: Object.keys(answers).length, answers }, null, 1));
  console.log('asked ' + asked + ', answered ' + Object.keys(answers).length + ' of ' + all.length + ' → ' + path.relative(ROOT, OUT));
})();
