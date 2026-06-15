#!/usr/bin/env node
/* NO picture-sort "-vs-" PAIRS × 1. trinn, READINESS (Logisk tenkning — sortering). Clone of
 * gen-da-picturesort.js with native bokmål frames (module ./no-picturesort-frames). Each page sorts
 * the pictures of TWO themes (A,B) into two groups; the body references BOTH themes' nouns.
 *
 * Bokmål definite plural is the SUFFIXED form from no-themes (dyrene/blomstene) — render2 is PURE
 * SUBSTITUTION (no morphology here; no-render.js owns the decl rules at assertion time):
 *   {A_PL}/{B_PL}   -> plIndef    ("med {A_PL} og {B_PL}")
 *   {A_DEF}/{B_DEF} -> plDef     ("sorter {A_DEF}")
 *   {A_H1}/{B_H1}   -> h1Display (display)
 * NO B5 double-definiteness gate (da's "den/det/de before plDef" lint is DROPPED — bokmål permits
 * "de små dyrene"; the frames never put an article before a token, confirmed by the native author).
 *
 * NO `standard` key (readiness). CHART-COUNT FENCE (bokmål): sort/group lexicon, NEVER count-framing.
 * HARD-FENCE (forbidden outright): "hvor mange"/"hvor mye"/antall/diagram/søyle/stolpe/statistikk.
 * tell-stem words (telle/teller/tell/telles/telling/talte/talt) allowed ONLY inside a negation window
 * ("her teller du ikke", "uten å telle", "ingen skal telle"). Bokmål e->a split: a /tell/-only regex
 * MISSES talte/talt, so both stems are matched. Non-letter guard before the stem (JS \b is unreliable
 * around æ/ø/å, and "fortelle" carries a letter before the stem -> structurally protected).
 * CROSS-LOCALE-LEAK lint: any da/sv contamination (tæl/räkn/antal/søjle/sortera/hur många/...) FAILs.
 * 16x12=224... no: 16x12=192 cells (§22.1 cell-space invariant: 192 > 180 no pairs -> injective).
 * Usage: node scripts/seo-landing/gen-no-picturesort.js
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./no-themes');
const { SKEL, P2, P3 } = require('./no-picturesort-frames');
const NO = 'frontend/content/seo-landing/no.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/no-picture-sort-coordinates.json', 'utf8')).coordinates;

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

// spring & flowers share the countable surrogate "blomster" in no-themes; a -vs- pair needs TWO
// distinct nouns, so the spring side falls back to "vårblomster" for such a pair only
// (h1Display stays Vår/Blomster — already distinct). (da precedent: forårsblomster.)
const PAIR_DISAMBIG = {
  spring: { plIndef: 'vårblomster', plDef: 'vårblomstene' },
};

const list = COORDS.slice().sort((a, b) => a.pairKey < b.pairKey ? -1 : 1);
const cells = SKEL.length * P2.length;
console.log('  ' + (cells > list.length ? '[invariant OK]' : '[invariant: cells<pairs -> coprime bijection wraps via i%cells]') + ' picture-sort: ' + SKEL.length + 'x' + P2.length + '=' + cells + ' vs pairs ' + list.length);

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const L0 = THEMES[co.left], R0 = THEMES[co.right];
  if (!L0 || !R0) { console.log('NO COPY DATA for ' + co.pairKey); blocked++; return; }
  let L = { plIndef: L0.plIndef, plDef: L0.plDef, h1Display: L0.h1Display };
  let R = { plIndef: R0.plIndef, plDef: R0.plDef, h1Display: R0.h1Display };
  if (L.plIndef === R.plIndef) {
    if (PAIR_DISAMBIG[co.left]) L = Object.assign({}, L, PAIR_DISAMBIG[co.left]);
    else if (PAIR_DISAMBIG[co.right]) R = Object.assign({}, R, PAIR_DISAMBIG[co.right]);
    if (L.plIndef === R.plIndef) { console.log('NOUN-COLLISION unresolved ' + co.pairKey); blocked++; return; }
  }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const vals = {
    A_PL: L.plIndef, B_PL: R.plIndef,
    A_DEF: L.plDef, B_DEF: R.plDef,
    A_H1: L.h1Display, B_H1: R.h1Display,
  };
  const entry = {
    slug: co.canonical,
    variantShape: co.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'picture-sort', mode: null, theme: co.pairKey, level: '1-trinn' },
    eyebrow: 'Oppgave: Sorter bildene',
    h1: 'Sorter bildene: ' + L.h1Display + ' og ' + R.h1Display + ' – oppgave til 1. trinn',
    strand: 'Logisk tenkning — sortering',
    slotTokens: [L.plIndef, R.plIndef, L.h1Display, R.h1Display, co.left.replace(/_/g, ' '), co.right.replace(/_/g, ' '), '1-trinn', 'sortere'],
    p1: render2(SKEL[cell.skel], vals),
    p2: render2(P2[cell.p2], vals),
    p3: render2(P3, vals),
    canonicalDeckSlug: co.canonical,
    carousel: [1, 2, 5, 11].map(off => {
      const n = list[(i + off) % list.length];
      const nL = THEMES[n.left], nR = THEMES[n.right];
      return { label: 'Sorter bildene: ' + nL.h1Display + ' og ' + nR.h1Display, href: n.canonical };
    }),
  };
  if (co.n > 1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(NO, 'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate && l.coordinate.type === 'picture-sort'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(NO, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + out.length + ' picture-sort landings (blocked ' + blocked + '); no.json total ' + merged.landings.length);

// ===== audit: >=200 words, 0 digits in BODY, no `standard` key, BOTH themes' nouns present,
// no count-FRAMING leak, no cross-locale (da/sv) contamination. =====
const FENCE_HARD = ['hvor mange', 'hvor mye', 'antall', 'diagram', 'søyle', 'stolpe', 'statistikk'];
const NEG = '(ikke|aldri|uten|ingenting|ingen|intet|verken)';
// bokmål count-verb forms (e->a split): telles/teller/telling/telle/talte/talt/tell (longest first)
const TELL = '(telles|teller|telling|telle|talte|talt|tell)';
function inNegationWindow(lc, idx) {
  const pre = lc.slice(Math.max(0, idx - 34), idx);
  if (new RegExp('(^|[^a-zæøå])' + NEG + '(?![a-zæøå])[^.!?]*$').test(pre)) return true;
  const post = lc.slice(idx, idx + 42);
  return new RegExp('^' + TELL + '(?![a-zæøå])[^.!?]*[^a-zæøå]' + NEG + '(?![a-zæøå])').test(post);
}
// cross-locale-leak: da/sv contamination (word-boundaries keep antall/bilde/oppgave clean)
const LEAK = /sortera|sortér|räkn|tæl|hur många|\bantal\b|stapeldiagram|søjle|aldrig|\bbild\b|\bopgave|korsord|krydsord|\binte\b|\binget\b|varken|hverken/i;
let short = 0, fence = 0, hasStd = 0, missNoun = 0, dig = 0, leak = 0;
out.forEach(e => {
  const body = e.p1 + ' ' + e.p2 + ' ' + e.p3;
  const lc = body.toLowerCase();
  const w = body.split(/\s+/).filter(Boolean).length;
  if (w < 200) { short++; console.log('  SHORT ' + e.slug + ': ' + w); }
  // the readiness band label "1. trinn" (and "2. trinn") legitimately carries a digit — exempt it;
  // any OTHER digit in a sorting body would be a count-number leak (forbidden).
  if (/[0-9]/.test(body.replace(/\d\.\s*trinn/gi, ''))) { dig++; console.log('  BODY-DIGIT ' + e.slug); }
  if ('standard' in e) { hasStd++; console.log('  HAS-STANDARD ' + e.slug); }
  const lk = body.match(LEAK);
  if (lk) { leak++; console.log('  CROSS-LOCALE-LEAK "' + lk[0] + '" ' + e.slug); }
  FENCE_HARD.forEach(f => { if (lc.includes(f)) { fence++; console.log('  FENCE-LEAK "' + f + '" ' + e.slug); } });
  const re = new RegExp('(^|[^a-zæøå])' + TELL + '(?![a-zæøå])', 'g');
  let m;
  while ((m = re.exec(lc)) !== null) {
    const idx = m.index + m[1].length;
    if (!inNegationWindow(lc, idx)) { fence++; console.log('  TELL-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, idx - 20), idx + 12).trim() + '"'); }
  }
  const co2 = COORDS.find(c => c.canonical === e.slug);
  const Lth = THEMES[co2.left], Rth = THEMES[co2.right];
  const Lkey = Lth.plIndef.toLowerCase(), Rkey = Rth.plIndef.toLowerCase();
  const Ldef = Lth.plDef.toLowerCase(), Rdef = Rth.plDef.toLowerCase();
  // spring-vs-flowers: the spring side renders as vårblomster/vårblomstene (PAIR_DISAMBIG)
  const Lalt = (PAIR_DISAMBIG[co2.left] || {});
  const hasL = lc.includes(Lkey) || lc.includes(Ldef) || (Lalt.plIndef && lc.includes(Lalt.plIndef)) || (Lalt.plDef && lc.includes(Lalt.plDef));
  const hasR = lc.includes(Rkey) || lc.includes(Rdef);
  if (!hasL || !hasR) { missNoun++; console.log('  MISSING-THEME-NOUN ' + e.slug + ' (L:' + hasL + ' R:' + hasR + ')'); }
});
console.log(
  (short ? short + ' short' : 'all >=200 words') + ' | ' +
  (dig ? dig + ' DIGITS' : '0 digits') + ' | ' +
  (leak ? leak + ' CROSS-LOCALE-LEAK' : '0 cross-locale-leak') + ' | ' +
  (hasStd ? hasStd + ' HAS-STANDARD' : 'all readiness (no standard)') + ' | ' +
  (missNoun ? missNoun + ' missing-theme-noun' : 'both-themes nouns present') + ' | ' +
  (fence ? fence + ' FENCE-LEAK' : 'no count-framing leak')
);
if (short || fence || hasStd || missNoun || dig || leak) { console.error('no picture-sort lint: FAIL — halting (fix frames, regenerate).'); process.exit(1); }
