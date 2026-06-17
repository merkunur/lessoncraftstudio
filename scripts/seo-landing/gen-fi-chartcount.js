#!/usr/bin/env node
/**
 * gen-fi-chartcount.js — generate the fi chart-count (Laske kaaviossa) landing entries.
 *
 * OPTION B — THEME-LEVEL honest-count Quiz (operator-resolved, 2026-06-17). Finnish counting
 * requires the partitive singular ("3 poroa", irregular by consonant-gradation, Susi→sutta) across
 * 266 distinct category nouns — not hand-authorable safely + computing it violates the fi-render
 * pure-substitution doctrine. So: category nouns appear ONLY in the NOMINATIVE (locName as-is, as
 * labels) and are NEVER inflected; the honest-count Quiz asks at the THEME/bar level with the
 * generic "kuvaa" (fixed picture-partitive) — max/min/sum from the facts (= the real bar heights),
 * honest by construction.
 *
 * Ledger: K.MD.B.3, 1-luokka (the sv ledger: the bar-chart is a data abstraction → CARRIES),
 * strand Tilastot ja todennäköisyys (OPS).
 *
 * Reads:  scripts/seo-landing/_fi-cc-facts.json    (Stage-A server dump: per deck {themeKey, slug,
 *           siblings, categories:[{nounKey, locName, count}]})
 *         frontend/config/topics-taxonomy.json     (axes.theme.<key>.name.fi)
 *         scripts/seo-landing/fi-chartcount-frames.js  (native p1/p2/p3 templates, {T}/{CATS} markers)
 * Writes: filter OUT existing chart-count landings in fi.json, append the new set (idempotent).
 * Usage: node scripts/seo-landing/gen-fi-chartcount.js [--dry-run]
 */
'use strict';
const fs = require('fs');
const DRY = process.argv.includes('--dry-run');
const FI = 'frontend/content/seo-landing/fi.json';

// Cull: themes the validity gate excludes for "count how many objects" (same set as sv).
const CULL_THEMES = new Set(['4th_of_july', 'activities', 'body_parts', 'emotions', 'spring', 'summer', 'winter', 'weather']);

const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_fi-cc-facts.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const FR = require('./fi-chartcount-frames'); // { p1:[..], p2:[..], p3:[..] } native templates
const THEME_AXIS = (tax.axes && tax.axes.theme) || {};

// §20.5: ignore trailing numbers on theme/category names ("Linnut 2" -> "Linnut") — dedup artifacts.
function stripNum(s) { return String(s || '').replace(/[\s-]*\d+$/, '').trim(); }
function themeDisplay(k) { const e = THEME_AXIS[k]; return stripNum((e && e.name && e.name.fi) ? e.name.fi : k); }
// Coprime cell-assignment (NOT periodic i%len, which clusters same-template collisions): give each
// entry a DISTINCT (p1,p2,p3) template cell so no two pages share all three templates.
function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d = 0; d < cells; d++) for (const cand of [k + d, k - d]) if (cand > 1 && cand < cells && gcd(cand, cells) === 1) return cand; return 1; }
function lc(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
// Finnish list join: "poro, norsu ja susi"
function fiList(items) { if (items.length === 1) return items[0]; return items.slice(0, -1).join(', ') + ' ja ' + items[items.length - 1]; }
function fill(tpl, T, CATS) { return tpl.replace(/\{T\}/g, T).replace(/\{CATS\}/g, CATS); }

const deckList = Array.isArray(facts) ? facts : (facts.decks || facts.facts || []);
const culled = deckList.filter(d => CULL_THEMES.has(d.themeKey || d.theme)).map(d => d.themeKey || d.theme);
const targets = deckList.filter(d => !CULL_THEMES.has(d.themeKey || d.theme));
const report = { dropped: [] };
const entries = [];
// Distinct-template cell space: (p1 × p2) coprime bijection + an independent p3 coprime index.
const CELLS = FR.p1.length * FR.p2.length;
const STRIDE = coprimeStride(CELLS);
const P3N = FR.p3.length, P3STRIDE = coprimeStride(P3N) || 1;
console.log('  template cells ' + FR.p1.length + 'x' + FR.p2.length + '=' + CELLS + ' (stride ' + STRIDE + ') vs decks ' + targets.length + (CELLS > targets.length ? ' [OK distinct]' : ' [WARN cells<decks]'));

targets.forEach((deck, i) => {
  const themeKey = deck.themeKey || deck.theme;
  const cats = (deck.categories || deck.cats || []).filter(c => typeof c.count === 'number');
  if (cats.length < 2) { report.dropped.push((deck.slug || '?') + ' (only ' + cats.length + ' cats)'); return; }
  const T = themeDisplay(themeKey);
  const CATS = fiList(cats.map(c => lc(stripNum(c.locName)))); // nominative-singular labels, trailing-num stripped, never inflected
  const counts = cats.map(c => c.count);
  const max = Math.max(...counts), min = Math.min(...counts), sum = counts.reduce((a, b) => a + b, 0);
  const siblings = deck.siblings || [deck.slug];

  // THEME-LEVEL honest-count Quiz — generic "kuvaa", answers = the real bar values (max/min/sum).
  const pp = [
    { q: 'Kuinka monta kuvaa on eniten yhdessä pylväässä?', a: String(max) },
    { q: 'Kuinka monta kuvaa on vähiten yhdessä pylväässä?', a: String(min) },
    { q: 'Kuinka monta kuvaa kaaviossa on kaikkiaan?', a: String(sum) },
  ];

  entries.push({
    slug: deck.slug,
    variantShape: siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'chart-count', mode: null, theme: themeKey, level: '1-luokka' },
    eyebrow: 'Tehtävä: Laske kaaviossa',
    h1: 'Laske ja täytä kaavio: ' + T + ' – 1. luokan oppilaille',
    strand: 'Tilastot ja todennäköisyys',
    standard: 'K.MD.B.3',
    slotTokens: [...cats.map(c => c.locName), T, '1-luokka', 'kaavio'],
    p1: fill(FR.p1[(((i % CELLS) * STRIDE) % CELLS) % FR.p1.length], T, CATS),
    p2: fill(FR.p2[Math.floor(((i % CELLS) * STRIDE) % CELLS / FR.p1.length) % FR.p2.length], T, CATS),
    p3: fill(FR.p3[((i % P3N) * P3STRIDE) % P3N], T, CATS),
    canonicalDeckSlug: deck.slug,
    carousel: [],
    practiceProblems: pp,
    ...(siblings.length > 1 ? { collapseSiblings: siblings } : {}),
    _barvals: { max, min, sum },
  });
});

console.log('=== gen-fi-chartcount (Option B theme-level) ===');
console.log('countable themes:', targets.length, '/ facts', deckList.length, '| culled(' + culled.length + '):', culled.join(', '));
console.log('dropped (<2 cats, ' + report.dropped.length + '):', report.dropped.join(', ') || '(none)');
console.log('entries built:', entries.length);

// honest-count assertion: every Quiz answer must be a real bar value (max/min/sum from facts).
let bad = 0;
for (const e of entries) {
  const allowed = new Set([String(e._barvals.max), String(e._barvals.min), String(e._barvals.sum)]);
  for (const p of e.practiceProblems) if (!allowed.has(p.a)) { console.error('  HONEST-COUNT BAD ' + e.slug + ' a=' + p.a); bad++; }
  // §4.B: theme noun (T or a category locName) must appear in p1 — slotTokens cover it; spot the digit rule
  if (/\d/.test(e.p1 + e.p2 + e.p3)) { console.error('  BODY-DIGIT ' + e.slug); bad++; }
}
if (bad) { console.error('HALT: ' + bad + ' honest-count/body-digit defect(s).'); process.exit(1); }
console.log('honest-count assertion: clean (all Quiz answers = real bar values; no body digits)');
entries.forEach(e => delete e._barvals);

if (entries.length) { const s = entries[0]; console.log('--- sample [' + s.slug + '] ---\n  h1:', s.h1, '\n  Quiz:', JSON.stringify(s.practiceProblems)); }

if (!DRY) {
  const cur = JSON.parse(fs.readFileSync(FI, 'utf8'));
  const keep = cur.landings.filter(l => !(l.coordinate && l.coordinate.type === 'chart-count'));
  const merged = { _note: cur._note, landings: keep.concat(entries) };
  fs.writeFileSync(FI, JSON.stringify(merged, null, 2) + '\n');
  console.log('fi.json total ' + merged.landings.length);
} else { console.log('(dry-run — fi.json not written)'); }
