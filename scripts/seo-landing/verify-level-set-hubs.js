#!/usr/bin/env node
/**
 * verify-level-set-hubs.js — the content gate for the Level Set hub pages
 * (frontend/content/seo-landing-hubs/<loc>.json, built by scripts/seo-research/build-level-set-hubs.js).
 *
 * Uses the landing gate's own measures (scripts/seo-landing/gate.js), so a hub is held to the
 * same bar as a landing:
 *   - whole-page RAW word-3-gram Jaccard against every other hub AND every landing of the locale:
 *     FAIL >= 0.80, WARN 0.65-0.80 (never move the gauge — fix the copy);
 *   - the BANNED genericness phrases; body >= 200 words; no soft hyphen;
 *   - the shared visible "free"-claim detector (scripts/lib/free-claim.js) on h1 / p1-p3;
 *   - >= 3 decks, every deck slug unique within the hub, no slug equal to a landing slug.
 * --poison proves each check fires on a broken hub and passes a clean control.
 *
 * Usage: node scripts/seo-landing/verify-level-set-hubs.js [--locales=en,de] | --poison
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const freeClaim = require('../lib/free-claim.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BANNED = ['fun and engaging', 'fun and interactive', 'perfect for', 'ideal for', 'great for', 'dive into', 'dive in', 'great way to',
  'wonderful way to', 'excellent way to', "in today's classroom", 'in the modern classroom', 'sneaky', 'find a way in', 'something for everyone',
  'one of the earliest', 'one of the oldest', 'one of the most important forms of', 'engaging', 'captivating', 'delightful', 'amazing',
  'watch as they learn', 'before you know it', 'in no time', 'boost', 'supercharge', 'unlock', 'easy and fun', 'simple yet effective'];
const FAIL_AT = 0.80, WARN_AT = 0.65;

const words = (s) => (String(s || '').toLowerCase().match(/[\p{L}0-9]+/gu) || []);
function grams(s, n) { const w = words(s); const g = new Set(); for (let i = 0; i + n <= w.length; i++) g.add(w.slice(i, i + n).join(' ')); return g; }
function jaccard(a, b) { if (a.size === 0 && b.size === 0) return 1; let inter = 0; for (const x of a) if (b.has(x)) inter++; return inter / (a.size + b.size - inter); }
const bodyOf = (p) => [p.h1, p.p1, p.p2, p.p3].join(' ');

function checkLocale(loc, hubs, landings) {
  const fails = [], warns = [];
  const landingSlugs = new Set(landings.map((l) => l.slug));
  const lg = landings.map((l) => ({ slug: l.slug, g: grams(bodyOf(l), 3) }));
  const hg = hubs.map((h) => ({ slug: h.slug, g: grams(bodyOf(h), 3) }));
  hubs.forEach((h, i) => {
    const body = [h.p1, h.p2, h.p3].join(' ');
    if (words(body).length < 200) fails.push(`${loc}/${h.slug}: body ${words(body).length} words < 200`);
    const ban = BANNED.filter((b) => body.toLowerCase().includes(b));
    if (ban.length) fails.push(`${loc}/${h.slug}: banned phrase [${ban.join(', ')}]`);
    for (const f of ['h1', 'title', 'metaDescription', 'p1', 'p2', 'p3']) if (/­/.test(h[f] || '')) fails.push(`${loc}/${h.slug}: soft hyphen in ${f}`);
    for (const f of ['h1', 'p1', 'p2', 'p3']) { const hit = freeClaim.hit(h[f] || ''); if (hit) fails.push(`${loc}/${h.slug}: visible free-claim in ${f}: "${hit}"`); }
    if (!h.decks || h.decks.length < 3) fails.push(`${loc}/${h.slug}: ${h.decks ? h.decks.length : 0} decks < 3`);
    if (h.decks && new Set(h.decks.map((d) => d.slug)).size !== h.decks.length) fails.push(`${loc}/${h.slug}: a deck is listed twice`);
    if (landingSlugs.has(h.slug)) fails.push(`${loc}/${h.slug}: slug equals a landing slug`);
    let worst = { s: 0, with: '' };
    for (let j = 0; j < hg.length; j++) if (j !== i) { const s = jaccard(hg[i].g, hg[j].g); if (s > worst.s) worst = { s, with: 'hub ' + hg[j].slug }; }
    for (const l of lg) { const s = jaccard(hg[i].g, l.g); if (s > worst.s) worst = { s, with: 'landing ' + l.slug }; }
    if (worst.s >= FAIL_AT) fails.push(`${loc}/${h.slug}: similarity ${worst.s.toFixed(3)} with ${worst.with}`);
    else if (worst.s >= WARN_AT) warns.push(`${loc}/${h.slug}: similarity ${worst.s.toFixed(3)} with ${worst.with}`);
    h._max = worst;
  });
  return { fails, warns };
}

function poison() {
  const body = (seed) => Array.from({ length: 70 }, (_, i) => `${seed}${i} wort${i % 7}`).join(' ');
  const mk = (slug, seed, extra = {}) => ({ slug, h1: 'H ' + slug, title: 'T ' + slug, metaDescription: 'M', p1: body(seed + 'a'), p2: body(seed + 'b'), p3: body(seed + 'c'),
    decks: [{ slug: slug + '-1' }, { slug: slug + '-2' }, { slug: slug + '-3' }], ...extra });
  const control = checkLocale('de', [mk('a', 'x'), mk('b', 'y')], [{ slug: 'land', h1: 'L', p1: body('z'), p2: body('w'), p3: body('v') }]);
  const out = [];
  if (control.fails.length) out.push('CONTROL failed: ' + control.fails.join('; '));
  const cases = {
    'near-duplicate hub': [mk('a', 'x'), mk('b', 'x')],
    'short body': [mk('a', 'x', { p1: 'kurz', p2: 'kurz', p3: 'kurz' }), mk('b', 'y')],
    'banned phrase': [mk('a', 'x', { p2: body('xb') + ' perfect for kids' }), mk('b', 'y')],
    'two decks': [mk('a', 'x', { decks: [{ slug: 'q1' }, { slug: 'q2' }] }), mk('b', 'y')],
    'deck twice': [mk('a', 'x', { decks: [{ slug: 'q1' }, { slug: 'q1' }, { slug: 'q2' }] }), mk('b', 'y')],
    'landing slug': [mk('land', 'x'), mk('b', 'y')],
  };
  for (const [name, hubs] of Object.entries(cases)) {
    const r = checkLocale('de', hubs, [{ slug: 'land', h1: 'L', p1: body('z'), p2: body('w'), p3: body('v') }]);
    if (!r.fails.length) out.push('NOT CAUGHT: ' + name);
  }
  const copyOfLanding = checkLocale('de', [mk('a', 'z', { h1: 'L', p1: body('z'), p2: body('w'), p3: body('v') }), mk('b', 'y')], [{ slug: 'land', h1: 'L', p1: body('z'), p2: body('w'), p3: body('v') }]);
  if (!copyOfLanding.fails.some((f) => /similarity/.test(f))) out.push('NOT CAUGHT: copy of a landing');
  if (out.length) { console.error('poison FAILED:\n  ' + out.join('\n  ')); process.exit(1); }
  console.log(`poison OK: ${Object.keys(cases).length + 1} defects caught, control passes`);
}

function main() {
  if (process.argv.includes('--poison')) return poison();
  const a = process.argv.find((x) => x.startsWith('--locales='));
  const locs = a ? a.slice(10).split(',') : LOCALES;
  let fails = [], warns = [], n = 0, maxAll = { s: 0 };
  for (const loc of locs) {
    const hp = path.join(ROOT, 'frontend', 'content', 'seo-landing-hubs', `${loc}.json`);
    if (!fs.existsSync(hp)) continue;
    const hubs = JSON.parse(fs.readFileSync(hp, 'utf8')).hubs;
    const landings = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'content', 'seo-landing', `${loc}.json`), 'utf8')).landings;
    const r = checkLocale(loc, hubs, landings);
    fails = fails.concat(r.fails); warns = warns.concat(r.warns); n += hubs.length;
    for (const h of hubs) if (h._max.s > maxAll.s) maxAll = { s: h._max.s, at: `${loc}/${h.slug} ~ ${h._max.with}` };
  }
  warns.forEach((w) => console.log('  WARN ' + w));
  fails.forEach((f) => console.log('  FAIL ' + f));
  console.log(`${n} hubs: ${fails.length} fail, ${warns.length} warn; highest similarity ${maxAll.s.toFixed(3)} (${maxAll.at || '-'})`);
  if (fails.length) process.exit(1);
}
main();
