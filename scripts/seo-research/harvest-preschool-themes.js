#!/usr/bin/env node
/**
 * harvest-preschool-themes.js — what US teachers type around PRESCHOOL THEME units (Daily Teaching System, Stage D-4,
 * plan decision 5: a theme week per teaching week for pre-K, titles from the US search heads).
 *
 * Probes per candidate theme (the US pre-K name of the theme, not the picture library's key):
 *   "<theme> theme preschool", "preschool <theme> theme", "<theme> preschool lesson plans", "<theme> theme pre-k",
 *   "<theme> theme for preschool"
 * plus a-z crossings of the bare heads "preschool theme" and "pre-k theme" (which themes people name at all).
 * Google autocomplete gives NO volumes: an answer shows a phrasing exists; the count of answers shows a tail's width.
 *
 * NON-DESTRUCTIVE: writes only docs/SEO/daily-system-demand/preschool-themes.en.json. Resumable: answered probes are
 * kept. One process at a time, 300 ms apart (five at once got the IP refused on 2026-11-11); stops after 8 errors in a row.
 *
 *   node scripts/seo-research/harvest-preschool-themes.js [--delay=300] [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'docs', 'SEO', 'daily-system-demand', 'preschool-themes.en.json');
const MARKET = { hl: 'en', gl: 'us' };
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const DELAY = Number(arg('delay', '300'));
const DRY = process.argv.includes('--dry-run');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** candidate themes, as US pre-K teachers name them (probes written by the build session, not copy) */
const THEMES = [
  'all about me', 'family', 'feelings', 'friendship', 'five senses', 'my body', 'apple', 'fall', 'leaves', 'pumpkin',
  'farm', 'fire safety', 'community helpers', 'halloween', 'thanksgiving', 'winter', 'snow', 'christmas', 'gingerbread',
  'hibernation', 'arctic animals', 'mitten', 'valentines', 'dental health', 'dinosaur', 'nursery rhymes',
  'transportation', 'st patricks day', 'spring', 'weather', 'rainbow', 'plants', 'seeds', 'garden', 'flowers', 'bugs',
  'insects', 'butterfly', 'frog', 'pond', 'easter', 'earth day', 'recycling', 'ocean', 'beach', 'summer', 'zoo',
  'zoo animals', 'pets', 'birds', 'space', 'camping', 'healthy food', 'nutrition', 'fruits and vegetables', 'colors',
  'shapes', 'construction', 'grocery store', 'bakery', 'doctor', 'post office', 'music', 'sports', 'fourth of july',
  'clothing', 'toys', 'forest animals', 'woodland animals', 'jungle', 'reptiles', 'school', 'back to school', 'my home',
  'kitchen', 'cooking', 'breakfast', 'farm animals', 'vehicles', 'airplane', 'gardening', 'nests', 'eggs', 'chicks',
];
const PATTERNS = ['{t} theme preschool', 'preschool {t} theme', '{t} preschool lesson plans', '{t} theme pre-k', '{t} theme for preschool'];
const DEEP = ['preschool theme', 'pre-k theme', 'preschool themes', 'preschool theme lesson plans'];

function probes() {
  const out = [];
  for (const t of THEMES) for (const p of PATTERNS) out.push({ q: p.replace('{t}', t), theme: t });
  for (const h of DEEP) { out.push({ q: h, head: h }); for (const c of 'abcdefghijklmnopqrstuvwxyz') out.push({ q: h + ' ' + c, head: h }); }
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
    try { const j = await fetchJson(url); answers[p.q] = { theme: p.theme || null, head: p.head || null, s: j[1] || [] }; errs = 0; asked++; }
    catch (e) { errs++; console.log('error ' + p.q + ': ' + e.message); if (errs >= 8) { console.log('8 errors in a row: stopping (resumable)'); break; } }
    await sleep(DELAY);
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ market: 'US', generatedAt: new Date().toISOString(), probes: all.length, answered: Object.keys(answers).length, answers }, null, 1));
  console.log('asked ' + asked + ', answered ' + Object.keys(answers).length + ' of ' + all.length + ' → ' + path.relative(ROOT, OUT));
})();
