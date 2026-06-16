#!/usr/bin/env node
/* PT picture-sort "-vs-" PAIRS × educação infantil, READINESS (Agrupar e classificar).
 * The de-orphan's content side, ported to Brazilian Portuguese (cloned from gen-it-picturesort.js).
 * Each page sorts the pictures of TWO themes (A,B) into two groups; the body references BOTH themes' nouns.
 *
 * render2 is PURE SUBSTITUTION (no morphology in code):
 *   {A_NPL}/{B_NPL} -> nPl                  bare concrete-noun list ("com {A_NPL}", "entre {A_NPL}")
 *   {A_GRP}/{B_GRP} -> genArt + ' ' + gen   definite collective ("os acessórios") — object/subject
 *   {A_TO}/{B_TO}   -> a+os=aos / a+as=às + gen   ("pertence aos animais")
 *   {A_FROM}/{B_FROM} -> de+os=dos / de+as=das + gen  ("separe os X dos Y")
 *   {A_H1}/{B_H1}   -> h1                    display (only h1/carousel, built by the gen)
 *
 * NO `standard` key (readiness; the audit hard-fails if present). COUNT-FENCE: sort/group lexicon only,
 * NEVER count-framing (no conte/contar/contagem/quantos/quantas/quantidade/número/gráfico as an
 * instruction; only the negated divergence "não se conta, se separa"). SIBLING-FENCE vs odd-one-out:
 * picture-sort GROUPS, excludes nothing (no intruso/não pertence/o diferente/a imagem que sobra).
 * DIGIT-FREE body. Cell-space = SKEL.length × P2.length (16×12=192 > 122 pairs → coprime bijection gives
 * every pair a DISTINCT (SKEL,P2) cell, §22.1).
 * Usage: node scripts/seo-landing/gen-pt-picturesort.js
 */
'use strict';
const fs = require('fs');
const _ptThemes = require('./pt-themes');
const THEMES = _ptThemes.THEMES || _ptThemes;       // tolerate both {THEMES} and direct-export shapes
const { SKEL, P2, P3 } = require('./pt-picturesort-frames');
const PT = 'frontend/content/seo-landing/pt.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/pt-picture-sort-coordinates.json', 'utf8')).coordinates;

// PURE SUBSTITUTION — Portuguese agreement lives in the stored values, never computed.
function render2(tpl, vals) {
  let s = tpl;
  Object.keys(vals).forEach(function (k) {
    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vals[k]);
  });
  return s;
}
// preposition+article contractions, keyed by the theme's stored plural article (os/as)
const PREP_A = { os: 'aos', as: 'às' };
const PREP_DE = { os: 'dos', as: 'das' };

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d = 0; d < cells; d++) for (const cand of [k + d, k - d]) if (cand > 1 && cand < cells && gcd(cand, cells) === 1) return cand; return 1; }
function cellAssign(i, S, P) { const cells = S * P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

const list = COORDS.slice().sort((a, b) => a.pairKey < b.pairKey ? -1 : 1);
const cells = SKEL.length * P2.length;
console.log('  ' + (cells > list.length ? '[invariant OK]' : '[invariant: cells<pairs -> coprime bijection wraps via i%cells]') + ' picture-sort: ' + SKEL.length + 'x' + P2.length + '=' + cells + ' vs pairs ' + list.length);

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const L = THEMES[co.left], R = THEMES[co.right];
  if (!L || !R) { console.log('NO COPY DATA for ' + co.pairKey); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const vals = {
    A_NPL: L.nPl, B_NPL: R.nPl,
    A_GRP: L.genArt + ' ' + L.gen, B_GRP: R.genArt + ' ' + R.gen,
    A_TO: PREP_A[L.genArt] + ' ' + L.gen, B_TO: PREP_A[R.genArt] + ' ' + R.gen,
    A_FROM: PREP_DE[L.genArt] + ' ' + L.gen, B_FROM: PREP_DE[R.genArt] + ' ' + R.gen,
    A_H1: L.h1, B_H1: R.h1,
  };
  const entry = {
    slug: co.canonical,
    variantShape: co.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'picture-sort', mode: null, theme: co.pairKey, level: 'educacao-infantil' },
    eyebrow: 'Atividade: Separe as imagens',
    h1: 'Separe as imagens: ' + L.h1 + ' e ' + R.h1 + ' – para a educação infantil',
    strand: 'Agrupar e classificar',
    slotTokens: [L.nPl, R.nPl, L.h1, R.h1, co.left.replace(/_/g, ' '), co.right.replace(/_/g, ' '), 'educacao-infantil', 'separe'],
    p1: render2(SKEL[cell.skel], vals),
    p2: render2(P2[cell.p2], vals),
    p3: render2(P3, vals),
    canonicalDeckSlug: co.canonical,
    carousel: [1, 2, 5, 11].map(off => {
      const n = list[(i + off) % list.length];
      const nL = THEMES[n.left], nR = THEMES[n.right];
      return { label: 'Separe as imagens: ' + nL.h1 + ' e ' + nR.h1, href: n.canonical };
    }),
  };
  if (co.n > 1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(PT, 'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate && l.coordinate.type === 'picture-sort'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(PT, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + out.length + ' picture-sort landings (blocked ' + blocked + '); pt.json total ' + merged.landings.length);

// ===== audit: >=200 words, 0 digits in BODY, no `standard` key, BOTH themes' nouns present,
// no count-FRAMING leak, no odd-one-out SIBLING-FENCE leak. =====
const FENCE_HARD = ['gráfico', 'grafico', 'diagrama']; // chart-framing forbidden even negated (no sort reason to mention a chart)
const SIBLING_HARD = ['intruso', 'não pertence', 'nao pertence', 'a imagem que sobra', 'a imagem a mais', 'o diferente', 'o errado']; // odd-one-out lexicon
function inNegationWindow(lc, idx) {
  // count words are allowed ONLY as the negated sort-not-count divergence ("não se conta", "sem números",
  // "jamais se conta", "ninguém precisa contar"). Negator BEFORE within ~32 chars, OR inversion AFTER.
  const pre = lc.slice(Math.max(0, idx - 32), idx);
  if (/(não|nao|nunca|jamais|sem|nada|nenhum\w*|ningu[ée]m|nem)\b[^.!?]*$/.test(pre)) return true;
  const post = lc.slice(idx, idx + 34);
  return /^(cont\w*|quant\w*|n[úu]mero\w*)[^.!?]*\b(nada|nunca|jamais|não|nao|nenhum\w*|ningu[ée]m)\b/.test(post);
}
let short = 0, fence = 0, hasStd = 0, missNoun = 0, dig = 0, sib = 0;
out.forEach(e => {
  const body = e.p1 + ' ' + e.p2 + ' ' + e.p3;
  const lc = body.toLowerCase();
  const w = body.split(/\s+/).filter(Boolean).length;
  if (w < 200) { short++; console.log('  SHORT ' + e.slug + ': ' + w); }
  if (/[0-9]/.test(body)) { dig++; console.log('  BODY-DIGIT ' + e.slug); }
  if ('standard' in e) { hasStd++; console.log('  HAS-STANDARD ' + e.slug); }
  FENCE_HARD.forEach(f => { if (lc.includes(f)) { fence++; console.log('  FENCE-LEAK "' + f + '" ' + e.slug); } });
  SIBLING_HARD.forEach(f => { if (lc.includes(f)) { sib++; console.log('  SIBLING-LEAK "' + f + '" ' + e.slug); } });
  // count-verb "cont*" (conte/contar/contagem/contam) must sit in a negation window. Skip benign pt collisions:
  // continu* (continuar), content* (contente), encontr* (encontrar), conto/conto\b (tale), contorn* (contorno), contat* (contato).
  let p = 0, m;
  while ((m = lc.indexOf('cont', p)) >= 0) {
    const tail = lc.slice(m);
    const benign = /^cont(inu|ent|orn|at|o\b|ado\b|ando\b)/.test(tail) || /encont/.test(lc.slice(Math.max(0, m - 2), m + 4));
    if (!benign && !inNegationWindow(lc, m)) { fence++; console.log('  CONTA-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, m - 18), m + 8).trim() + '"'); }
    p = m + 4;
  }
  // count-framing "quantos/quantas/quantidade" must sit in a negation window. Benign "quanto"/"enquanto"/
  // "tanto ... quanto" (how-much / while / as-much-as — NOT count-framing) are deliberately not matched.
  const qre = /quant(os|as|idade)/g; let mq;
  while ((mq = qre.exec(lc))) {
    if (!inNegationWindow(lc, mq.index)) { fence++; console.log('  QUANT-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, mq.index - 18), mq.index + 9).trim() + '"'); }
  }
  // count-noun "número(s)" must sit in a negation window (allows "sem números", "não importa o número")
  const nre = /n[úu]mero/g; let mn;
  while ((mn = nre.exec(lc))) {
    if (!inNegationWindow(lc, mn.index)) { fence++; console.log('  NUMERO-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, mn.index - 18), mn.index + 8).trim() + '"'); }
  }
  const co = COORDS.find(c => c.canonical === e.slug);
  const hasL = lc.includes(THEMES[co.left].nPl.toLowerCase()) || lc.includes(THEMES[co.left].gen.toLowerCase());
  const hasR = lc.includes(THEMES[co.right].nPl.toLowerCase()) || lc.includes(THEMES[co.right].gen.toLowerCase());
  if (!hasL || !hasR) { missNoun++; console.log('  MISSING-THEME-NOUN ' + e.slug + ' (L:' + hasL + ' R:' + hasR + ')'); }
});
console.log(
  (short ? short + ' short' : 'all >=200 words') + ' | ' +
  (dig ? dig + ' DIGITS' : '0 digits') + ' | ' +
  (hasStd ? hasStd + ' HAS-STANDARD' : 'all readiness (no standard)') + ' | ' +
  (missNoun ? missNoun + ' missing-theme-noun' : 'both-themes nouns present') + ' | ' +
  (fence ? fence + ' COUNT-FENCE-LEAK' : 'no count-framing leak') + ' | ' +
  (sib ? sib + ' SIBLING-LEAK' : 'no odd-one-out leak')
);
