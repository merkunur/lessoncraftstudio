#!/usr/bin/env node
/**
 * check-b9-landing-draft.js <locale> <landings.json> — a locale panel's landing draft checked BEFORE the locale is applied
 * (the composer scripts/seo-landing/gen-b9-landings.js needs the applied taxonomy + waves; this checker needs nothing):
 * the same field rules the composer refuses on — 20 ids, every field present, slug ascii kebab + unique, h1 ≤ 70, title ≤ 75,
 * metaDescription 120-170, p1+p2+p3 ≥ 200 words, no visible free-claim (scripts/lib/free-claim.js), no answer-key / screen
 * promise in any field (the family is PDF only), no soft hyphen, and every landing distinct (word-3-gram Jaccard of the
 * bodies < 0.65 against every sibling).
 */
'use strict';
const fs = require('fs'); const path = require('path');
const freeClaim = require(path.join(__dirname, '..', '..', 'lib', 'free-claim.js'));
const { FACES } = require('../data/b9/picture-tracing.js');
const [, , loc, file] = process.argv;
if (!loc || !file) { console.error('usage: check-b9-landing-draft.js <loc> <landings.json>'); process.exit(2); }
const J = JSON.parse(fs.readFileSync(file, 'utf8'));
const L = J.landings || {};
const IDS = Object.values(FACES).map((f) => f.id);
const errs = [];
if (J.locale !== loc) errs.push('locale ' + J.locale + ' ≠ ' + loc);
for (const id of IDS) if (!L[id]) errs.push(id + ': missing');
for (const id of Object.keys(L)) if (!IDS.includes(id)) errs.push(id + ': unknown id');
const FIELDS = ['slug', 'eyebrow', 'h1', 'title', 'metaDescription', 'strand', 'p1', 'p2', 'p3'];
const VISIBLE = ['eyebrow', 'h1', 'strand', 'p1', 'p2', 'p3'];
const KEY = /answer key|answer sheet|with answers|solutions?|screen|interactive|mit l(?:ö|oe)sung|l(?:ö|oe)sungsblatt|l(?:ö|oe)sungen|con (?:las )?respuestas|hoja de respuestas|com (?:as )?respostas|gabarito|corrig[ée]|con (?:le )?soluzioni|soluzioni|antwoordblad|met (?:de )?antwoorden|facit|fasit|vastaukset|vastausavain|ratkaisut|écran|pantalla|tela interativa|schermo|bildschirm|skärm|skærm|skjerm|näyttö/i;   // a PROMISE of a key / screen; 'write the answer in the box' is pedagogy, not a promise
const slugs = new Set();
const words = (s) => (String(s || '').match(/\S+/g) || []).length;
for (const id of IDS) {
  const e = L[id]; if (!e) continue;
  for (const f of FIELDS) if (!e[f] || typeof e[f] !== 'string') errs.push(id + '.' + f + ' missing');
  for (const f of Object.keys(e)) if (!FIELDS.includes(f)) errs.push(id + '.' + f + ': unknown field');
  if (e.slug && !/^[a-z0-9-]+$/.test(e.slug)) errs.push(id + ': slug not ascii-kebab "' + e.slug + '"');
  if (e.slug && slugs.has(e.slug)) errs.push(id + ': duplicate slug'); slugs.add(e.slug);
  if (e.slug && e.slug.length > 75) errs.push(id + ': slug ' + e.slug.length + ' chars');
  if (e.h1 && [...e.h1].length > 70) errs.push(id + ': h1 ' + [...e.h1].length + ' > 70');
  if (e.title && [...e.title].length > 75) errs.push(id + ': title ' + [...e.title].length + ' > 75');
  if (e.metaDescription && ([...e.metaDescription].length < 120 || [...e.metaDescription].length > 170)) errs.push(id + ': metaDescription ' + [...e.metaDescription].length + ' chars (120-170)');
  const w = words(e.p1) + words(e.p2) + words(e.p3); if (w < 200) errs.push(id + ': body ' + w + ' words < 200');
  for (const f of VISIBLE) { const h = freeClaim.hit(e[f] || ''); if (h) errs.push(id + '.' + f + ': free-claim "' + h + '" in a visible field'); }
  for (const f of [...VISIBLE, 'title', 'metaDescription']) { const m = KEY.exec(e[f] || ''); if (m) errs.push(id + '.' + f + ': promises a key / screen ("' + m[0] + '") — PDF only'); }
  for (const f of FIELDS) if (/­/.test(e[f] || '')) errs.push(id + '.' + f + ': soft hyphen');
}
// distinctness of the bodies
const grams = (s) => { const t = String(s).toLowerCase().match(/[\p{L}\p{N}]+/gu) || []; const g = new Set(); for (let i = 0; i + 2 < t.length; i++) g.add(t[i] + ' ' + t[i + 1] + ' ' + t[i + 2]); return g; };
const G = IDS.filter((id) => L[id]).map((id) => [id, grams(L[id].p1 + ' ' + L[id].p2 + ' ' + L[id].p3)]);
let worst = 0, pair = '';
for (let a = 0; a < G.length; a++) for (let b = a + 1; b < G.length; b++) {
  let inter = 0; for (const x of G[a][1]) if (G[b][1].has(x)) inter++;
  const j = inter / (G[a][1].size + G[b][1].size - inter || 1);
  if (j > worst) { worst = j; pair = G[a][0] + '~' + G[b][0]; }
  if (j >= 0.65) errs.push(G[a][0] + ' ~ ' + G[b][0] + ': bodies too alike (' + j.toFixed(2) + ')');
}
if (errs.length) { errs.forEach((x) => console.log(' - ' + x)); console.log('FAIL ' + errs.length); process.exit(1); }
console.log('PASS ' + loc + ': 20 landings, most similar pair ' + pair + ' ' + worst.toFixed(2));
