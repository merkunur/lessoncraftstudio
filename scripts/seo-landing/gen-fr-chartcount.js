#!/usr/bin/env node
/**
 * gen-fr-chartcount.js — the fr chart-count (Graphique en barres) landing generator.
 * Engine = a clone of gen-no/it-chartcount.js (facts loading, vocab plural resolution with an
 * OVERRIDE map, honest-count Quiz binding, prose assembly, idempotent merge, zero-mismatch
 * assertion); LANGUAGE LAYER = native French (fr-chartcount-frames.js), vocab col fr.
 *
 * Honest-count binding: per-category count = facts.count (= the rendered bar height). Prose p2
 * counts AND the practiceProblems answers BOTH draw from the SAME facts -> agree-by-construction
 * with the chart. Operator gate: ZERO mismatches (asserted; halts).
 *
 * The Quiz head is "Combien {DE} {pluriel} ?" with MANDATORY elision (de -> d' before a vowel or
 * mute-h; de stays "de" before aspirate-h — a lookup, not spelling: hibou/haricot/hérisson/...).
 * Count-list "3 chats, 4 chiens et 5 canards" (digit + plural, "et" before last, NO Oxford comma);
 * at a count of 1 -> "1 chat" (digit + SINGULAR, never spelled un/une -> dodges the gender trap).
 *
 * Ledger (fr ledger-lock, go-luminous-moon.md Wave E):
 *   strand   = Organisation et gestion de données (Éducation Nationale data domain)
 *   standard = K.MD.B.3 (recognition) -> CARRIES (educationalAlignment present)
 *   band     = cp (Cours préparatoire, ~6 ans; tall 0-10). NO Nordic offset.
 *
 * Reads:  scripts/seo-landing/_fr-cc-facts.json     (Stage-A dump, gen-cc-facts.js --locale=fr)
 *         REFERENCE TRANSLATIONS/image-vocabulary.js (fr [sing, plural, gender])
 *         frontend/config/topics-taxonomy.json       (axes.theme.<key>.name.fr)
 *         scripts/seo-landing/fr-themes.js           (plIndef/h1Display, hand-verified)
 *         scripts/seo-landing/fr-chartcount-frames.js (native FR p1/p2/p3)
 * Writes: filter OUT existing chart-count landings in fr.json, append the new set (idempotent).
 * Usage: node scripts/seo-landing/gen-fr-chartcount.js [--dry-run]
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./fr-themes');
const { p1, p2: P2FN, p3 } = require('./fr-chartcount-frames');

const DRY = process.argv.includes('--dry-run');
const FR = 'frontend/content/seo-landing/fr.json';

// Cull: the semantically-non-countable themes (activities=verbs, body_parts per operator,
// emotions=faces, seasons/weather=abstract) + 4th_of_july (US holiday, the standing non-EN drop).
const CULL_THEMES = new Set([
  'activities', 'body_parts', 'emotions',
  'spring', 'summer', 'winter', 'weather',
  '4th_of_july',
]);

// --- load sources ---
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_fr-cc-facts.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const vmod = {};
new Function('module', fs.readFileSync('REFERENCE TRANSLATIONS/image-vocabulary.js', 'utf8') + '\nmodule.exports=IMAGE_VOCABULARY;')(vmod);
const VOCAB = vmod.exports;

// OVERRIDE_BY_NAME[locName] = [singular, plural, gender(m/f)] — native-verified French (8 plural
// trap classes + icon-misdepictions parity with the it/sv OVERRIDE: same deck thumbnails). Checked
// BEFORE the fr vocabulary. Filled from the dry-run NEEDS-PLURAL report + the it icon set.
const OVERRIDE_BY_NAME = {
  // (a) icon-misdepictions — the manifest label mis-describes the rendered ICON (it/sv-parity icons)
  'Liberté': ['Statue de la Liberté', 'Statues de la Liberté', 'f'], // icon: Statue of Liberty
  'Oncle Sam': ['Oncle Sam', 'Oncles Sam', 'm'],
  'Automne': ['Arbre d\'automne', 'Arbres d\'automne', 'm'],   // icon: autumn-foliage tree
  'Livraison': ['Facteur', 'Facteurs', 'm'],                  // icon: mail carrier
  'Père Noël': ['Père Noël', 'Pères Noël', 'm'],
  'Timbre': ['Timbre', 'Timbres', 'm'],                        // postage stamp
  'Lune': ['Lune', 'Lunes', 'f'],
  // (b) tree species (icon = a TREE) — fr vocab gap parity with it
  'Palmier': ['Palmier', 'Palmiers', 'm'],
  'Sapin': ['Sapin', 'Sapins', 'm'],
  'Chêne': ['Chêne', 'Chênes', 'm'],
  'Cèdre': ['Cèdre', 'Cèdres', 'm'],
  'Érable': ['Érable', 'Érables', 'm'],
  // (c) plural-shape traps the vocab may give wrong (-x / -aux / invariable) — seed the common ones
  'Hibou': ['Hibou', 'Hiboux', 'm'],                           // -ou -> -oux + ASPIRATE H
  'Cheval': ['Cheval', 'Chevaux', 'm'],                        // -al -> -aux
  'Souris': ['Souris', 'Souris', 'f'],                         // invariable + feminine
  // (d) vocab-gap fills (dry-run NEEDS-PLURAL report); -al->-aux adjective agreement load-bearing
  'Calendrier': ['Calendrier', 'Calendriers', 'm'],
  'Violette': ['Violette', 'Violettes', 'f'],
  'Gaufre': ['Gaufre', 'Gaufres', 'f'],                        // forest gopher
  'Dossier médical': ['Dossier médical', 'Dossiers médicaux', 'm'], // médical -> médicaux
  "Blouse d'hôpital": ["Blouse d'hôpital", "Blouses d'hôpital", 'f'],
  'Camion postal': ['Camion postal', 'Camions postaux', 'm'],  // postal -> postaux
  'Octogone': ['Octogone', 'Octogones', 'm'],
  'Faucon': ['Faucon', 'Faucons', 'm'],
  'Clé à molette': ['Clé à molette', 'Clés à molette', 'f'],
  'Clou': ['Clou', 'Clous', 'm'],                              // -ou -> -ous (regular, NOT the 7)
  'Épicéa': ['Épicéa', 'Épicéas', 'm'],
  'Citronnier': ['Citronnier', 'Citronniers', 'm'],
  'Cocotier': ['Cocotier', 'Cocotiers', 'm'],
};

// French aspirate-h nouns (plural form, lowercased) — block elision: "Combien de hiboux ?" NOT *d'.
const ASPIRATE_H = new Set([
  'hiboux', 'haricots', 'hérissons', 'hamsters', 'haches', 'haies', 'harpes', 'hangars',
]);
// proper nouns whose first letter must NOT be lowercased mid-sentence
const PROPER = new Set(['Statue de la Liberté', 'Statues de la Liberté', 'Oncle Sam', 'Oncles Sam', 'Père Noël', 'Pères Noël', 'Lune', 'Lunes', 'Mars', 'Mercure', 'Neptune']);

function lc(s) {
  if (PROPER.has(s)) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}
// de -> d' before vowel/mute-h; de stays "de" before aspirate-h (lookup). pluralLc is lowercased.
function elideDe(pluralLc) {
  if (ASPIRATE_H.has(pluralLc)) return 'de ' + pluralLc;
  if (/^[aeiouyàâäéèêëîïôöùûüœæh]/i.test(pluralLc)) return "d'" + pluralLc;
  return 'de ' + pluralLc;
}

function resolveFr(nounKey, locNameRaw) {
  if (!locNameRaw) return null;
  const locName = locNameRaw.replace(/\s+\d+$/, '');
  const ovr = OVERRIDE_BY_NAME[locName];
  if (ovr) return { sing: ovr[0], plural: ovr[1], gender: ovr[2] || 'm', src: 'override' };
  const base = nounKey.replace(/-\d+$/, '');
  const cands = [nounKey, nounKey.replace(/-/g, '_'), nounKey.replace(/-/g, ''), base, base.replace(/-/g, '_'), base.replace(/-/g, '')];
  for (const k of cands) {
    if (VOCAB[k] && VOCAB[k].fr && VOCAB[k].fr[0] && VOCAB[k].fr[0].toLowerCase() === locName.toLowerCase()) {
      const v = VOCAB[k].fr;
      return { sing: locName, plural: v[1], gender: v[2] || 'm', src: 'vocab' };
    }
  }
  return { sing: locName, plural: null, src: 'needs-plural' };
}

function themeDisplay(themeKey) {
  const t = THEMES[themeKey];
  if (t && t.h1Display) return t.h1Display;
  const e = tax.axes.theme[themeKey];
  return (e && e.name && e.name.fr) ? e.name.fr : themeKey;
}
function themeNoun(themeKey) {
  const t = THEMES[themeKey];
  return (t && t.plIndef) ? t.plIndef : lc(themeDisplay(themeKey));
}

// list-join: "3 chats, 4 chiens et 5 canards" (no Oxford comma)
function frList(items) {
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' et ' + items[items.length - 1];
}

function buildEntry(deck, i, report) {
  const D = themeDisplay(deck.themeKey);
  const TN = themeNoun(deck.themeKey);
  const cats = [];
  for (const c of deck.categories) {
    if (c.count === 0) continue;
    const r = resolveFr(c.nounKey, c.locName);
    if (!r) { report.unresolved.push(`${c.nounKey} (${deck.themeKey})`); continue; }
    if (r.src === 'needs-plural' || !r.plural) {
      report.needsPlural.push(`"${c.locName}" (${c.nounKey} @ ${deck.themeKey})`);
      continue;
    }
    cats.push({ sing: r.sing, plural: r.plural, gender: r.gender, count: c.count });
  }
  // De-dup by resolved plural: two slots resolving to the same plural (e.g. a "Chat" + "Chat 2"
  // image pair) would make "Combien de chats ?" ambiguous and break the honest-count weave.
  const seenPl = new Set();
  const deduped = cats.filter((c) => { const k = c.plural.toLowerCase(); if (seenPl.has(k)) { (report.dupDropped = report.dupDropped || []).push(`${c.plural} @ ${deck.themeKey}`); return false; } seenPl.add(k); return true; });
  cats.length = 0; cats.push(...deduped);
  // substring-collision guard: if cat X's plural is a whole-word substring of cat Y's plural in the
  // SAME deck (e.g. "chapeaux" ⊂ "chapeaux de fête", "tortues" ⊂ "tortues terrestres"), the shorter
  // Quiz noun "Combien de chapeaux ?" is ambiguous (could mean either bar) → drop the SHORTER, more-
  // generic category, keep the specific one. Mirrors the de-dup honest-count discipline.
  const dropIdx = new Set();
  for (let x = 0; x < cats.length; x++) for (let y = 0; y < cats.length; y++) {
    if (x === y) continue;
    const sx = lc(cats[x].plural), sy = lc(cats[y].plural);
    if (sx.length < sy.length && new RegExp('\\b' + sx.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(sy)) dropIdx.add(x);
  }
  if (dropIdx.size) {
    (report.substringDropped = report.substringDropped || []).push(...[...dropIdx].map((k) => cats[k].plural + ' @ ' + deck.themeKey));
    const kept = cats.filter((_, k) => !dropIdx.has(k));
    cats.length = 0; cats.push(...kept);
  }
  if (cats.length < 2) { report.droppedDecks.push(`${deck.slug} (only ${cats.length} cats)`); return null; }

  // DISTANCE-2 variant assignment: unique (p1,p2) pair (12x6=72 cells), p3=(p1+p2)%12.
  const p1i = i % 12;
  const p2i = Math.floor(i / 12) % 6;
  const p3i = (p1i + p2i) % 12;

  // p2: HONEST-COUNT weave — "3 chats, 4 chiens et 5 canards" (count + lc sing/plural).
  const items = cats.map((c) => `${c.count} ${lc(c.count === 1 ? c.sing : c.plural)}`);
  const list = frList(items);
  const ex = cats.map((c) => lc(c.plural));
  const sorted = [...cats].sort((a, b) => b.count - a.count);
  const top = lc(sorted[0].plural);
  const low = lc(sorted[sorted.length - 1].plural);

  // practiceProblems — "Combien de/d' {pluriel} ?" (gender-neutral; elision applied)
  const pp = cats.map((c) => ({ q: `Combien ${elideDe(lc(c.plural))} ?`, a: String(c.count) }));

  return {
    slug: deck.slug,
    variantShape: deck.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'chart-count', mode: null, theme: deck.themeKey, level: 'cp' },
    eyebrow: 'Fiche : Graphique en barres',
    h1: `Graphique en barres : ${D} – compte et complète (CP)`,
    strand: 'Organisation et gestion de données',
    standard: 'K.MD.B.3',
    slotTokens: [...cats.map((c) => c.sing), D, 'CP'],
    p1: p1(D, TN, ex[0], ex[1] || ex[0], ex[2] || ex[1] || ex[0], p1i),
    p2: P2FN(list, top, low, p2i),
    p3: p3(D, TN, top, ex[0], ex[1] || ex[0], p3i),
    canonicalDeckSlug: deck.slug,
    carousel: [],
    practiceProblems: pp,
    ...(deck.siblings.length > 1 ? { collapseSiblings: deck.siblings } : {}),
  };
}

// --- build ---
const culled = facts.filter((d) => CULL_THEMES.has(d.themeKey)).map((d) => d.themeKey);
const targets = facts.filter((d) => !CULL_THEMES.has(d.themeKey));
const report = { unresolved: [], droppedDecks: [], needsPlural: [] };
const entries = [];
targets.forEach((d, i) => { const e = buildEntry(d, i, report); if (e) entries.push(e); });

// carousel post-pass: neighbours at [1,2,5,11], label 'Graphique en barres – <display>'.
entries.forEach((e, i) => {
  e.carousel = [1, 2, 5, 11].map((off) => {
    const n = entries[(i + off) % entries.length];
    return { label: 'Graphique en barres – ' + themeDisplay(n.coordinate.theme), href: n.slug };
  });
});

// --- summary ---
console.log('=== gen-fr-chartcount summary ===');
console.log('themes processed (countable):', targets.length, '/ facts', facts.length);
console.log('culled (' + culled.length + '):', culled.join(', '));
console.log('categories unresolved (' + report.unresolved.length + '):', report.unresolved.join(', ') || '(none)');
console.log('dup-dropped (' + (report.dupDropped || []).length + '):', (report.dupDropped || []).join(', ') || '(none)');
console.log('substring-dropped (' + (report.substringDropped || []).length + '):', (report.substringDropped || []).join(', ') || '(none)');
console.log('decks dropped (<2 cats, ' + report.droppedDecks.length + '):', report.droppedDecks.join(', ') || '(none)');
console.log('NEEDS-PLURAL (' + report.needsPlural.length + ') — add to OVERRIDE_BY_NAME:');
report.needsPlural.forEach((m) => console.log('   ' + m));
console.log('total entries built:', entries.length);
if (entries.length) {
  const s = entries[0];
  console.log('--- sample [' + s.slug + '] ---');
  console.log('  h1:', s.h1);
  console.log('  p2:', s.p2);
  console.log('  practiceProblems:', JSON.stringify(s.practiceProblems));
}

// --- honest-count assertion: every practiceProblem answer must appear with the same number in
// p2's count list (both come from facts, but assert it — defence in depth). Strip "Combien (de|d')"
// + " ?", match "(\d+) <noun>". ---
let mismatch = 0;
for (const e of entries) {
  for (const pp of e.practiceProblems) {
    const noun = pp.q.replace(/^Combien d['’]/, '').replace(/^Combien de /, '').replace(/\s*\?$/, '').trim();
    const re = new RegExp('(\\d+) ' + noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
    const m = e.p2.match(re);
    if (m && m[1] !== pp.a) { console.error('  HONEST-COUNT MISMATCH ' + e.slug + ': p2 "' + m[0] + '" vs pp a=' + pp.a); mismatch++; }
  }
}
if (mismatch) { console.error('HONEST-COUNT: ' + mismatch + ' mismatch(es) — halting.'); process.exit(1); }
console.log('honest-count assertion: clean (p2 counts ↔ practiceProblems answers agree)');

if (DRY) { console.log('\n[DRY-RUN] no write.'); process.exit(0); }

// --- read / filter-out existing chart-count / append / write (idempotent) ---
let cur = { _note: 'FR landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(FR, 'utf8')); } catch (e) {}
const keep = (cur.landings || []).filter((l) => l.coordinate.type !== 'chart-count');
const merged = { _note: cur._note, landings: keep.concat(entries) };
JSON.parse(JSON.stringify(merged));
fs.writeFileSync(FR, JSON.stringify(merged, null, 2) + '\n');
console.log('\nwrote ' + entries.length + ' chart-count entries; fr.json total landings now ' + merged.landings.length);
