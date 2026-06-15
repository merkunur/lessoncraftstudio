#!/usr/bin/env node
/* FR picture-sort "-vs-" PAIRS × maternelle, READINESS (Trier et classer). The de-orphan's content
 * side, ported to French (cloned from gen-no/it-picturesort.js). Each page sorts the pictures of TWO
 * themes (A,B) into two groups; the body references BOTH themes' bare plural nouns.
 *
 * render2 is PURE SUBSTITUTION (no morphology in code — French plural article is invariably "les"):
 *   {A_PL}/{B_PL}   -> plIndef            bare plural ("avec {A_PL} et {B_PL}", "trie {A_PL}")
 *   {A_LES}/{B_LES} -> "les " + plIndef   definite plural ("range {A_LES} d'un côté")
 *   {A_DES}/{B_DES} -> "des " + plIndef   de+les ("le groupe {A_DES}")
 *   {A_H1}/{B_H1}   -> h1Display          display (h1/carousel only, built by the gen)
 *
 * NO `standard` key (readiness; maternelle / no-framework-chip). TITLE SPLIT (Wave E operator):
 * the rekey title head is "Tri des images" (noun-search), the H1/body below keep "Trier les images".
 *
 * CHART-COUNT FENCE (sorting must NEVER read as counting): a count word as an INSTRUCTION is forbidden;
 * the only allowed use is a NEGATED reassurance ("on ne compte pas : on trie"). HARD-FORBIDDEN even
 * negated: nombre de / diagramme / graphique / quantité. The compt / dénombr stems must sit in a
 * negation window. SIBLING-FENCE (NOT odd-one-out): l'intrus / n'appartient pas / ne va pas avec /
 * le différent / l'image en trop -> 0. DIGIT-FREE body. 16×12=192 cells > 138 pairs (§22.1 cell-space
 * invariant): the coprime bijection gives every pair a DISTINCT (SKEL,P2) cell. [NSR-FLAG][fr]
 * Usage: node scripts/seo-landing/gen-fr-picturesort.js
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./fr-themes');
const { SKEL, P2, P3 } = require('./fr-picturesort-frames');
const FR = 'frontend/content/seo-landing/fr.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/fr-picture-sort-coordinates.json', 'utf8')).coordinates;

// PURE SUBSTITUTION — French plural article "les" is invariant; literal placeholder->value.
function render2(tpl, vals) {
  let s = tpl;
  Object.keys(vals).forEach(function (k) {
    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vals[k]);
  });
  return s;
}

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d = 0; d < cells; d++) for (const cand of [k + d, k - d]) if (cand > 1 && cand < cells && gcd(cand, cells) === 1) return cand; return 1; }
function cellAssign(i, S, P) { const cells = S * P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

// Many fr themes share a bare plIndef ("animaux" = animals/farm_animals/forest_creatures/zoo_animals;
// "oiseaux" = birds/birds_2; "objets" = around_the_house/miscellaneous; "fleurs" = flowers/spring).
// A -vs- pair needs TWO distinct nouns, so a collision side falls back to a distinct surrogate noun
// (h1Display stays distinct — already shown in the H1). The fallback keeps vowelInit-agnostic forms
// since "les/des + X" need no elision.
const PAIR_DISAMBIG = {
  zoo_animals: { plIndef: 'animaux du zoo' },
  farm_animals: { plIndef: 'animaux de la ferme' },
  forest_creatures: { plIndef: 'animaux de la forêt' },
  birds_2: { plIndef: 'oiseaux' }, // identical to birds — resolved below by giving one side a qualifier
  miscellaneous: { plIndef: 'objets divers' },
  spring: { plIndef: 'fleurs de printemps' },
};

const list = COORDS.slice().sort((a, b) => a.pairKey < b.pairKey ? -1 : 1);
const cells = SKEL.length * P2.length;
console.log('  ' + (cells > list.length ? '[invariant OK]' : '[invariant: cells<pairs -> coprime bijection wraps via i%cells]') + ' picture-sort: ' + SKEL.length + 'x' + P2.length + '=' + cells + ' vs pairs ' + list.length);

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const L0 = THEMES[co.left], R0 = THEMES[co.right];
  if (!L0 || !R0) { console.log('NO COPY DATA for ' + co.pairKey); blocked++; return; }
  let L = { plIndef: L0.plIndef, h1Display: L0.h1Display };
  let R = { plIndef: R0.plIndef, h1Display: R0.h1Display };
  if (L.plIndef === R.plIndef) {
    if (PAIR_DISAMBIG[co.left]) L = Object.assign({}, L, PAIR_DISAMBIG[co.left]);
    else if (PAIR_DISAMBIG[co.right]) R = Object.assign({}, R, PAIR_DISAMBIG[co.right]);
    if (L.plIndef === R.plIndef) { console.log('NOUN-COLLISION unresolved ' + co.pairKey); blocked++; return; }
  }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const vals = {
    A_PL: L.plIndef, B_PL: R.plIndef,
    A_LES: 'les ' + L.plIndef, B_LES: 'les ' + R.plIndef,
    A_DES: 'des ' + L.plIndef, B_DES: 'des ' + R.plIndef,
    A_H1: L.h1Display, B_H1: R.h1Display,
  };
  const entry = {
    slug: co.canonical,
    variantShape: co.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'picture-sort', mode: null, theme: co.pairKey, level: 'maternelle' },
    eyebrow: 'Fiche : Trier les images',
    h1: 'Trier les images : ' + L.h1Display + ' et ' + R.h1Display + ' – fiche pour la maternelle',
    strand: 'Trier et classer',
    slotTokens: [L.plIndef, R.plIndef, L.h1Display, R.h1Display, co.left.replace(/_/g, ' '), co.right.replace(/_/g, ' '), 'maternelle', 'trier'],
    p1: render2(SKEL[cell.skel], vals),
    p2: render2(P2[cell.p2], vals),
    p3: render2(P3, vals),
    canonicalDeckSlug: co.canonical,
    carousel: [1, 2, 5, 11].map(off => {
      const n = list[(i + off) % list.length];
      const nL = THEMES[n.left], nR = THEMES[n.right];
      return { label: 'Trier les images : ' + nL.h1Display + ' et ' + nR.h1Display, href: n.canonical };
    }),
  };
  if (co.n > 1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(FR, 'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate && l.coordinate.type === 'picture-sort'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(FR, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + out.length + ' picture-sort landings (blocked ' + blocked + '); fr.json total ' + merged.landings.length);

// ===== audit: >=200 words, 0 digits in BODY, no `standard` key, BOTH themes' nouns present,
// no count-FRAMING leak, no odd-one-out sibling-fence leak. =====
const FENCE_HARD = ['nombre de', "nombre d'", 'diagramme', 'graphique', 'quantité'];
const NEG = "(ne |n'|sans |pas besoin de|inutile de|jamais|aucun)";
// French count-verb stems: compt* (compte/compter/comptons/…) + dénombr* (longest-first not needed, prefix).
const COUNT = "(combien|compt(?:er|es?|ons|ez|ent|ée?s?)|dénombr(?:er|es?|ons|ez|ent|ée?s?))";
function inNegationWindow(lc, idx) {
  const pre = lc.slice(Math.max(0, idx - 40), idx);
  return new RegExp(NEG + '[^.!?]*$').test(pre);
}
// odd-one-out sibling-fence (picture-sort GROUPS into two buckets; nothing is excluded)
const ODD = /l'intrus|n'appartient pas|ne va pas avec|le différent|l'image en trop/i;
let short = 0, fence = 0, hasStd = 0, missNoun = 0, dig = 0, odd = 0;
out.forEach(e => {
  const body = e.p1 + ' ' + e.p2 + ' ' + e.p3;
  const lc = body.toLowerCase();
  const w = body.split(/\s+/).filter(Boolean).length;
  if (w < 200) { short++; console.log('  SHORT ' + e.slug + ': ' + w); }
  if (/[0-9]/.test(body)) { dig++; console.log('  BODY-DIGIT ' + e.slug); }
  if ('standard' in e) { hasStd++; console.log('  HAS-STANDARD ' + e.slug); }
  const od = body.match(ODD);
  if (od) { odd++; console.log('  ODD-ONE-OUT-LEAK "' + od[0] + '" ' + e.slug); }
  FENCE_HARD.forEach(f => { if (lc.includes(f)) { fence++; console.log('  FENCE-LEAK "' + f + '" ' + e.slug); } });
  const re = new RegExp('(^|[^a-zà-ÿ])' + COUNT + '(?![a-zà-ÿ])', 'gi');
  let m;
  while ((m = re.exec(lc)) !== null) {
    const idx = m.index + m[1].length;
    if (!inNegationWindow(lc, idx)) { fence++; console.log('  COUNT-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, idx - 22), idx + 12).trim() + '"'); }
  }
  const co2 = COORDS.find(c => c.canonical === e.slug);
  const Lth = THEMES[co2.left], Rth = THEMES[co2.right];
  const Lalt = (PAIR_DISAMBIG[co2.left] || {}).plIndef, Ralt = (PAIR_DISAMBIG[co2.right] || {}).plIndef;
  const hasL = lc.includes(Lth.plIndef.toLowerCase()) || (Lalt && lc.includes(Lalt.toLowerCase()));
  const hasR = lc.includes(Rth.plIndef.toLowerCase()) || (Ralt && lc.includes(Ralt.toLowerCase()));
  if (!hasL || !hasR) { missNoun++; console.log('  MISSING-THEME-NOUN ' + e.slug + ' (L:' + hasL + ' R:' + hasR + ')'); }
});
console.log(
  (short ? short + ' short' : 'all >=200 words') + ' | ' +
  (dig ? dig + ' DIGITS' : '0 digits') + ' | ' +
  (odd ? odd + ' ODD-ONE-OUT-LEAK' : '0 odd-one-out-leak') + ' | ' +
  (hasStd ? hasStd + ' HAS-STANDARD' : 'all readiness (no standard)') + ' | ' +
  (missNoun ? missNoun + ' missing-theme-noun' : 'both-themes nouns present') + ' | ' +
  (fence ? fence + ' FENCE-LEAK' : 'no count-framing leak')
);
if (short || fence || hasStd || missNoun || dig || odd) { console.error('fr picture-sort lint: FAIL — halting (fix frames, regenerate).'); process.exit(1); }
