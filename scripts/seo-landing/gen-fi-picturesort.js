#!/usr/bin/env node
/* FI picture-sort "-vs-" PAIRS × esikoulu, READINESS (Luokittelu). The de-orphan's content side,
 * ported to Finnish. Each page sorts the pictures of TWO themes (A,B) into two groups; the body
 * references BOTH themes' concrete nouns (the -vs- differentiation).
 *
 * fi-render.render2 is PURE SUBSTITUTION (no morphology) — reads the hand-verified fi-themes fields:
 *   {A_NPL}/{B_NPL}   -> nomPl      ("{A_NPL} ja {B_NPL} ovat sekaisin")
 *   {A_PART_PL}/{B_..}-> partPl     ("lajittele {A_PART_PL} ja {B_PART_PL}")
 *   {A_H1}/{B_H1}     -> h1Display  (display)
 *   {A_GEN}/{B_GEN}   -> genPl
 *
 * NO `standard` key (readiness). COUNT-FENCE: sort/group lexicon, NEVER count-framing
 * (no laske/montako/lukumäärä/kaavio as an instruction; negated "katsotaan ja lajitellaan, ei lasketa" OK).
 * SIBLING-FENCE vs odd-one-out: picture-sort GROUPS (excludes nothing) — no "ei kuulu joukkoon / erilainen".
 * 16×12=192 cells (§22.1 coprime bijection) > pair count → distinct (SKEL,P2) cell per pair.
 * Frames are native-authored in fi-picturesort-frames.js. Usage: node scripts/seo-landing/gen-fi-picturesort.js
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./fi-themes');
const { render2, assertThemeTable } = require('./fi-render');
const { SKEL, P2, P3 } = require('./fi-picturesort-frames');
const FI = 'frontend/content/seo-landing/fi.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/fi-picture-sort-coordinates.json', 'utf8')).coordinates;

// FAIL-halt on any fi-themes defect before rendering.
{ const fails = assertThemeTable(THEMES); if (fails && fails.length) { console.error('FATAL fi-themes assertThemeTable (' + fails.length + '):'); fails.slice(0, 20).forEach(m => console.error('  ' + m)); process.exit(1); } }

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d = 0; d < cells; d++) for (const cand of [k + d, k - d]) if (cand > 1 && cand < cells && gcd(cand, cells) === 1) return cand; return 1; }
function cellAssign(i, S, P) { const cells = S * P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

const list = COORDS.slice().sort((a, b) => a.pairKey < b.pairKey ? -1 : 1);
const cells = SKEL.length * P2.length;
console.log('  ' + (cells > list.length ? '[invariant OK]' : '[invariant: cells<pairs -> coprime bijection wraps]') + ' picture-sort: ' + SKEL.length + 'x' + P2.length + '=' + cells + ' vs pairs ' + list.length);

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const L = THEMES[co.left], R = THEMES[co.right];
  if (!L || !R) { console.log('NO COPY DATA for ' + co.pairKey + ' (L:' + !!L + ' R:' + !!R + ')'); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const entry = {
    slug: co.canonical,
    variantShape: co.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'picture-sort', mode: null, theme: co.pairKey, level: 'esikoulu' },
    eyebrow: 'Tehtävä: Lajittele kuvat',
    h1: 'Lajittele kuvat: ' + L.h1Display + ' ja ' + R.h1Display + ' – esikouluikäisille',
    strand: 'Luokittelu',
    slotTokens: [L.nomPl, R.nomPl, L.partPl, R.partPl, L.h1Display, R.h1Display, co.left.replace(/_/g, ' '), co.right.replace(/_/g, ' '), 'esikoulu', 'lajittele'],
    p1: render2(SKEL[cell.skel], L, R),
    p2: render2(P2[cell.p2], L, R),
    p3: render2(P3, L, R),
    canonicalDeckSlug: co.canonical,
    carousel: [1, 2, 5, 11].map(off => {
      const n = list[(i + off) % list.length];
      const nL = THEMES[n.left], nR = THEMES[n.right];
      return { label: 'Lajittele kuvat: ' + nL.h1Display + ' ja ' + nR.h1Display, href: n.canonical };
    }),
  };
  if (co.n > 1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(FI, 'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate && l.coordinate.type === 'picture-sort'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(FI, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + out.length + ' picture-sort landings (blocked ' + blocked + '); fi.json total ' + merged.landings.length);

// ===== audit: >=200 words, no `standard`, BOTH themes' nouns present, no count-framing leak, no
// odd-one-out exclusion leak. COUNT-FENCE: laske/montako/kuinka monta as an INSTRUCTION is forbidden;
// the only allowed use sits in a negation window ("ei lasketa", "ei tarvitse laskea", "ilman laskemista").
const FENCE_HARD = ['montako', 'kuinka monta', 'lukumäär', 'kaavio', 'diagramm', 'pylväs']; // count-framing forbidden even negated
const SIBLING_HARD = ['ei kuulu joukkoon', 'erilainen', 'poikkeava', 'mikä ei kuulu']; // odd-one-out exclusion frame
// Unicode-safe negator detection (JS \b breaks after Finnish ä/ö, so use [^letters] boundaries).
// A "laske*" is allowed iff a negator word sits in the ~36 chars before OR ~30 after (same clause).
const NEG_RE = /(^|[^a-zäöyåA-ZÄÖÅ])(ei|eikä|eivät|en|et|emme|ette|ilman|älä|älkää|ettei|eihän)([^a-zäöyåA-ZÄÖÅ]|$)/;
function inNegationWindow(lc, idx) {
  const pre = lc.slice(Math.max(0, idx - 36), idx);
  if (NEG_RE.test(pre)) return true;
  const post = lc.slice(idx, idx + 30);
  return NEG_RE.test(post);
}
let short = 0, fence = 0, hasStd = 0, missNoun = 0, sib = 0;
out.forEach(e => {
  const body = e.p1 + ' ' + e.p2 + ' ' + e.p3;
  const lc = body.toLowerCase();
  const w = body.split(/\s+/).filter(Boolean).length;
  if (w < 200) { short++; console.log('  SHORT ' + e.slug + ': ' + w); }
  if ('standard' in e) { hasStd++; console.log('  HAS-STANDARD ' + e.slug); }
  FENCE_HARD.forEach(f => { if (lc.includes(f)) { fence++; console.log('  FENCE-LEAK "' + f + '" ' + e.slug); } });
  SIBLING_HARD.forEach(f => { if (lc.includes(f)) { sib++; console.log('  SIBLING-LEAK "' + f + '" ' + e.slug); } });
  let p = 0, m;
  while ((m = lc.indexOf('lask', p)) >= 0) { if (!inNegationWindow(lc, m)) { fence++; console.log('  LASKE-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, m - 18), m + 8).trim() + '"'); } p = m + 4; }
  const co = COORDS.find(c => c.canonical === e.slug);
  const hasL = lc.includes(THEMES[co.left].nomPl.toLowerCase()) || lc.includes(THEMES[co.left].partPl.toLowerCase());
  const hasR = lc.includes(THEMES[co.right].nomPl.toLowerCase()) || lc.includes(THEMES[co.right].partPl.toLowerCase());
  if (!hasL || !hasR) { missNoun++; console.log('  MISSING-THEME-NOUN ' + e.slug + ' (L:' + hasL + ' R:' + hasR + ')'); }
});
console.log(
  (short ? short + ' short' : 'all >=200 words') + ' | ' +
  (hasStd ? hasStd + ' HAS-STANDARD' : 'all readiness (no standard)') + ' | ' +
  (missNoun ? missNoun + ' missing-theme-noun' : 'both-themes nouns present') + ' | ' +
  (fence ? fence + ' COUNT-FENCE-LEAK' : 'no count-framing leak') + ' | ' +
  (sib ? sib + ' SIBLING-LEAK' : 'no odd-one-out leak')
);
