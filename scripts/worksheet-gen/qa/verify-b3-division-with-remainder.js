#!/usr/bin/env node
/**
 * verify-b3-division-with-remainder.js — the G3-377 `division-with-remainder`
 * gate (design §5): the base face (sections A / C / D) + the five Phase-2 faces
 * G3-380..G3-384 (section E, 2026-09-14 — see its block header below).
 *
 *   node qa/verify-b3-division-with-remainder.js [--quick] [--seeds=N] [--theme=animals]
 *
 * Own ground truth: the gate re-derives q = floor(n/d) and r = n − q·d from
 * the page stamps in ITS OWN in-page code (never the spec's verify), reads
 * data/b3/division-with-remainder.js and types/_shared/notation.js DIRECTLY,
 * cross-checks every stamp against the build's `meta` on the node side, and
 * renders through the REAL pipeline (render/render-instance.js, file:// fonts).
 *
 * Sections
 *   A  bank: validateBank (the §5 validator rules 1-9) on the real bank; the
 *      spec's i18n.en === strings['G3-377'] (one source); the three units
 *      parse; the notation.js table reads as the design's per-locale column
 *      (sv `/`, de/it/nl/da/no/fi `:`, en/fr/es/pt `÷`) — a drift of the ONE
 *      sign table fails here first.
 *   C  renders (real pipeline): en d1/d2/d3 on the theme (Letter), a second
 *      theme, the two other units at d2, LONG chrome (3-line en title, 733) ×
 *      d1-d3, WORST chrome (3-line de title + 3-line fi instruction, 710) ×
 *      d1-d3, DEEP chrome (4-line fi title, 700) × d1-d3, a seed sweep at
 *      d1/d2/d3, and SYNTHETIC locale blocks (de : / sv / / fr product form /
 *      fi ", jää" / nl rest / it "r." / es + pt casita — the design's §1 pins,
 *      NOT the panels' data) at d1 + d2 so every notation shape is measured
 *      inside the real zone (the fr `(4 × [ ]) + [ ]` line in the d1 zone is
 *      the design's flagged risk). Each render: lints clean · verify() empty ·
 *      the gate's own audit (every q/r re-derived, pile count === n, every
 *      picture ≥ 36 px, loaded, inside the card and CLEAR OF THE 30-px BADGE,
 *      numerals ≥ 26 px and === their stamp, boxes ≥ 44 × 40 (casita 44 × 36),
 *      the zone inside the card and `scrollWidth <= clientWidth`, every
 *      division sign on the page === notation.js for the locale, no ÷ on an
 *      sv page) · items === cfg.cards · meta ↔ stamps agree · the page rules
 *      (≥ 3 distinct d / q ≥ 2 on ≥ 3 cards / r varies / n distinct where the
 *      config says so) · chrome probes prove their own line counts (a vacuous
 *      probe fails) · non-vacuity (0 boxes measured = FAIL). Sweep: no two
 *      seeds render the same page.
 *   D  poisons (each must FAIL for the SPECIFIC reason; the correct EN bank +
 *      d2 page is the control): P1 r = d (`… = 4 R 4`, remainder too big) ·
 *      P2 the quotient printed as text · P3 sv with `op:'÷'` (refused at
 *      build) AND an sv page whose sign was rewritten to ÷ (historic minus) ·
 *      P4 q one too big (n ≠ q·d + r) · P8 a `[data-lcs-group]` on the pile
 *      (pre-boxed) · P9 two cards with one (n, d) · P11 a `zoo animals bw`
 *      theme (refused at build) AND a picture path rewritten into the bw dir ·
 *      P12 the validator: a bare de head title, an sv instruction with ÷, an
 *      fr product template without × · P13 n above nMax (49 ÷ 2 at d2) · plus:
 *      an exact item (r = 0) · minR 0 stamped · the en bank with op ':' (bank
 *      + build) · a pile one picture short · pictures shrunk to 30 · the sign
 *      rewritten ÷ → : on an en page · the boxes swapped (r then q) · a box
 *      carrying text · a third printed numeral (q) · an F1 deal row on the
 *      base · a shown pair on the base · alt text on a picture · n repeated
 *      across cards · a page of 3 cards · a blank page · the flat-760 stack
 *      under 3-line chrome · a 19-char remainder word overflowing the zone ·
 *      a casita r box carrying text · an unknown unit (3-4) · a theme below
 *      the noun floor (emotions) · an unauthored locale (no block).
 *      The five poisons the base deferred (P5 / P6 / P7 / P10 / P13-F2) are
 *      COUNTED in section E since the faces landed.
 *   E  the five faces — renders × units × chromes × seeds × ten synthetic
 *      locales, refusals, face poisons (block header below).
 * Exit 1 on any real failure OR any silent / wrong-reason poison.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { divGlyph, mulGlyph } = require('../types/_shared/notation.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev', 'g3377-gate');
const BANK_FILE = path.join(ROOT, 'data', 'b3', 'division-with-remainder.js');

const ICON_FLOOR = 36;       // G23 minElement
const NUMERAL_FLOOR = 26;
const BOX_W = 44, BOX_H_INLINE = 40, BOX_H_CASITA = 36;
const BADGE = 30;
const CARD_PAD = 14;         // 12 padding + 2 border
const ZONE_H = 88;
const DESIGN_SIGNS = { en: '÷', de: ':', es: '÷', pt: '÷', fr: '÷', it: ':', nl: ':', sv: '/', da: ':', no: ':', fi: ':' };

// worst LEGAL chromes, measured in the real pipeline (A4): a 68-char en title wraps to THREE lines
// + a 150-char instruction to TWO -> body ~733; a 3-line de title + a 3-line fi instruction -> ~710;
// a 70-char fi title with long words wraps to FOUR lines -> ~700 (the G2-316 finding). The README's
// 722 sits between; every probe proves its own line count, or the render fails as vacuous.
const LONG_CHROME = {
  title: 'Division with Remainders for Beginners: Ring Every Group of Pictures',
  instruction: 'Ring groups of the second number in every pile on this page. Then write how many whole groups you made and how many pictures are still left over.',
};
// WORST: a 61-char de title (3 lines) + the 150-char fi instruction that G1-310's gate proved wraps to
// THREE lines (a domain-worded fi string at <= 150 chars wrapped to two in every variant measured —
// the third line needs a long word at the very end; the fixture's content is irrelevant to the probe).
const WORST_CHROME = {
  title: 'Teilen mit Rest: Gruppen einkreisen und den Rest aufschreiben',
  instruction: 'Jokaisessa satataulunpalasessa näkyy yksi luku. Kirjoita puuttuvat luvut: oikealle yksi enemmän, vasemmalle yksi vähemmän, alapuolelle kymmenen lisää.',
};
// DEEP: a 70-char fi title that wraps to FOUR lines (measured: head 132 px, body 700 with a 2-line
// instruction; with the 3-line instruction above the body would be 677 — the pile still fits, 130 inner).
const DEEP_CHROME = {
  title: 'Jakojäännöstehtävä: ympyröi samankokoiset ryhmät, laske jakojäännökset',
  instruction: 'Jokaisessa satataulunpalasessa näkyy yksi luku. Kirjoita puuttuvat luvut: oikealle yksi enemmän, vasemmalle yksi vähemmän, alapuolelle kymmenen lisää.',
};

/**
 * Synthetic locale blocks for the RENDER test only — the design's §1/§4 notation
 * pins, so every notation shape is measured in the real zone before the panels
 * author the real blocks. They are NOT data; the panels rebuild, never copy.
 */
function synthBlock(loc, notation) {
  const en = loadBank().en;
  return { exemplar: '2-5', unitLabels: {}, notation: Object.assign({ boxStyle: 'inline', remWord: '', exactWord: 'x', restWord: 'y', leftoverLabel: 'z', rightWord: 'a', wrongWord: 'b', kinds: null }, notation), strings: JSON.parse(JSON.stringify(en.strings)) };
}
const SYNTH = {
  de: { op: ':', template: '{n} : {d} = {q} R {r}', remWord: 'R' },
  sv: { op: '/', template: '{n}/{d} = {q} rest {r}', remWord: 'rest' },
  fr: { op: null, template: '{n} = ({d} × {q}) + {r}', remWord: '' },
  fi: { op: ':', template: '{n} : {d} = {q}, jää {r}', remWord: 'jää' },
  nl: { op: ':', template: '{n} : {d} = {q} rest {r}', remWord: 'rest' },
  it: { op: ':', template: '{n} : {d} = {q} r. {r}', remWord: 'r.' },
  es: { op: '÷', template: '{n} ÷ {d} = {q} R{r}', boxStyle: 'casita', remWord: '' },
  pt: { op: '÷', template: '{n} ÷ {d} = {q} R{r}', boxStyle: 'casita', remWord: '' },   // the BR chave writes no word; 'resto' (39 px) fits the d2 casita (199) but not d1's (184) — refused at build, open item for the pt panel
};

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const QUICK = flags.has('--quick');

function loadBankModule() { delete require.cache[require.resolve(BANK_FILE)]; return require(BANK_FILE); }
function loadBank() { return loadBankModule().DIVISION; }
function clone(o) { return JSON.parse(JSON.stringify(o)); }

/* ---------------- C. renders (real pipeline) + the gate's own audit ---------------- */
async function renderCheck(page, type, inj, job, opts) {
  let t = type;
  const loc = (job.locale || 'en').slice(0, 2);
  if (inj) t = { ...type, build: (o, ctx) => type._buildWith(inj.bank || loadBank()[o.locale.slice(0, 2)], inj.cfg || type.difficulty[o.difficulty], { theme: o.theme, locale: o.locale, unit: o.unit }, ctx) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({
    type: t, theme: job.theme, difficulty: job.difficulty, locale: loc, unit: job.unit || null, strings: job.strings,
    pageSize: job.pageSize, seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const cfg = (inj && inj.cfg) || type.difficulty[job.difficulty];
  const m = await page.evaluate(({ iconFloor, numeralFloor, boxW, boxHInline, boxHCasita, badge, cardPad, zoneH }) => {
    const res = { fails: [], items: [], boxes: 0, opTexts: [], bodyText: (document.querySelector('[data-lcs-body]') || document.body).textContent };
    const F = res.fails;
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.insLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    res.titleLines = Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33);
    const root = document.querySelector('[data-lcs-dwr]');
    if (!root) { F.push('no root'); return res; }
    res.style = root.dataset.lcsStyle; res.op = root.dataset.lcsOp; res.unit = root.dataset.lcsUnit; res.layout = root.dataset.lcsLayout;
    const divisors = (root.dataset.lcsDivisors || '').split(',').map(Number);
    const nMin = +root.dataset.lcsNmin, nMax = +root.dataset.lcsNmax;
    const grid = root.querySelector('.ws-cardgrid');
    if (grid) { const g = grid.getBoundingClientRect(); if (g.bottom > body.bottom + 0.6 || g.top < body.top - 0.6) F.push('size: card grid outside the body'); }
    const items = [...root.querySelectorAll('[data-lcs-item]')];
    items.forEach((it, i) => {
      const P = `item ${i + 1}`;
      const n = +it.dataset.lcsN, d = +it.dataset.lcsD, q = +it.dataset.lcsQ, r = +it.dataset.lcsR;
      // own derivation (diff, not trust)
      const wq = Math.floor(n / d), wr = n - wq * d;
      if (q !== wq || r !== wr) F.push(`${P}: stamps q ${q} r ${r}, derived ${wq} R ${wr}`);
      if (!(wr >= 1 && wr < d)) F.push(`${P}: derived remainder ${wr} outside 1..${d - 1}`);
      if (!divisors.includes(d)) F.push(`${P}: d ${d} outside the divisor set`);
      if (n < nMin || n > nMax) F.push(`${P}: n ${n} outside ${nMin}..${nMax}`);
      const card = it.closest('.ws-card');
      const cr = card ? card.getBoundingClientRect() : null;
      if (!cr) F.push(`${P}: not inside a card`);
      const inner = cr ? { left: cr.left + cardPad, right: cr.right - cardPad, top: cr.top + cardPad, bottom: cr.bottom - cardPad } : null;
      // pile
      const imgs = [...it.querySelectorAll('[data-lcs-pile] img')];
      if (imgs.length !== n) F.push(`${P}: ${imgs.length} pictures for n ${n}`);
      imgs.forEach((img, k) => {
        const b = img.getBoundingClientRect();
        if (!img.complete || img.naturalWidth === 0) F.push(`${P}: picture ${k + 1} not loaded`);
        if (b.width < iconFloor - 0.6 || b.height < iconFloor - 0.6) F.push(`${P}: picture ${k + 1} ${b.width.toFixed(1)} px < ${iconFloor}`);
        if (inner && (b.left < inner.left - 0.6 || b.right > inner.right + 0.6 || b.top < inner.top - 0.6 || b.bottom > inner.bottom + 0.6)) F.push(`${P}: picture ${k + 1} outside the card inner box`);
        if (cr && b.left < cr.left + badge && b.top < cr.top + badge) F.push(`${P}: picture ${k + 1} under the number badge`);
      });
      // numerals
      const nums = [...it.querySelectorAll('[data-lcs-num]')];
      if (nums.length !== 2) F.push(`${P}: ${nums.length} printed numerals`);
      nums.forEach((e) => {
        const fs = parseFloat(getComputedStyle(e).fontSize);
        if (fs < numeralFloor - 0.1) F.push(`${P}: numeral ${fs}px < ${numeralFloor}`);
        if (e.textContent.trim() !== e.dataset.lcsNum) F.push(`${P}: numeral text "${e.textContent.trim()}" != stamp ${e.dataset.lcsNum}`);
        if (![n, d].includes(+e.dataset.lcsNum)) F.push(`${P}: numeral ${e.dataset.lcsNum} is neither n nor d`);
      });
      // operator glyphs
      it.querySelectorAll('[data-lcs-op]').forEach((e) => { const g = e.textContent.trim(); if (['÷', ':', '/', '×', '·'].includes(g)) res.opTexts.push(g); });
      // zone
      const zones = [...it.querySelectorAll('[data-lcs-notation]')];
      if (zones.length !== 1) F.push(`${P}: ${zones.length} zones`);
      zones.forEach((z) => {
        const zb = z.getBoundingClientRect();
        if (z.scrollWidth > z.clientWidth + 0.6) F.push(`${P}: zone content ${z.scrollWidth} > zone ${z.clientWidth} (overflow)`);
        if (inner && (zb.left < inner.left - 0.6 || zb.right > inner.right + 0.6 || zb.top < inner.top - 0.6 || zb.bottom > inner.bottom + 0.6)) F.push(`${P}: zone outside the card inner box`);
        if (zb.height > zoneH + 0.6) F.push(`${P}: zone ${zb.height.toFixed(1)} tall > ${zoneH}`);
        z.querySelectorAll('[data-lcs-line]').forEach((ln) => { if (ln.scrollWidth > z.clientWidth + 0.6) F.push(`${P}: a notation line ${ln.scrollWidth} > zone ${z.clientWidth}`); });
        z.querySelectorAll('[data-lcs-word]').forEach((w) => { const fs = parseFloat(getComputedStyle(w).fontSize); if (fs < 14) F.push(`${P}: remainder word ${fs}px < 14`); });
        if (z.dataset.lcsStyle !== root.dataset.lcsStyle) F.push(`${P}: zone style != page style`);
      });
      // boxes
      const boxes = [...it.querySelectorAll('[data-lcs-answer]')];
      if (boxes.length !== 2) F.push(`${P}: ${boxes.length} boxes`);
      const casita = root.dataset.lcsStyle === 'casita';
      boxes.forEach((b, k) => {
        const bb = b.getBoundingClientRect();
        const minH = casita ? boxHCasita : boxHInline;
        if (bb.width < boxW - 0.6 || bb.height < minH - 0.6) F.push(`${P}: box ${k + 1} ${bb.width.toFixed(1)}x${bb.height.toFixed(1)} < ${boxW}x${minH}`);
        if ((b.textContent || '').trim() || b.dataset.lcsAnswer) F.push(`${P}: box ${k + 1} carries "${b.textContent.trim() || b.dataset.lcsAnswer}"`);
        if (b.dataset.lcsRole !== (k === 0 ? 'q' : 'r')) F.push(`${P}: box ${k + 1} role ${b.dataset.lcsRole}`);
        res.boxes++;
      });
      // no q / r as text
      const walker = document.createTreeWalker(it, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) { const s = node.textContent.trim(); if (s && (s === String(q) || s === String(r)) && s !== String(n) && s !== String(d)) F.push(`${P}: text "${s}" prints the answer`); }
      res.items.push({ n, d, q, r, noun: it.dataset.lcsNoun, imgs: imgs.length });
    });
    return res;
  }, { iconFloor: ICON_FLOOR, numeralFloor: NUMERAL_FLOOR, boxW: BOX_W, boxHInline: BOX_H_INLINE, boxHCasita: BOX_H_CASITA, badge: BADGE, cardPad: CARD_PAD, zoneH: ZONE_H });
  fails.push(...m.fails.map((x) => (x.startsWith('size') ? x : 'audit: ' + x)));
  if (m.items.length !== cfg.cards) fails.push(`count: ${m.items.length} items, config says ${cfg.cards}`);
  // the ONE sign table, on the node side
  const div = divGlyph(loc), mul = mulGlyph(loc);
  if (m.op !== div) fails.push(`sign: root stamps "${m.op}", notation.js says "${div}" for ${loc}`);
  for (const g of m.opTexts) {
    if (['÷', ':', '/'].includes(g) && g !== div) fails.push(`sign: the page prints "${g}", notation.js says "${div}" for ${loc}`);
    if (['×', '·'].includes(g) && g !== mul) fails.push(`sign: the page prints "${g}", notation.js says "${mul}" for ${loc}`);
  }
  if (loc === 'sv' && m.bodyText.includes('÷')) fails.push('sign: an sv page carries ÷ (historic minus)');
  // meta ↔ stamps
  const metaItems = (out.meta && out.meta.items) || [];
  if (metaItems.length !== m.items.length) fails.push(`meta: ${metaItems.length} items vs ${m.items.length} stamped`);
  else metaItems.forEach((mi, i) => { const s = m.items[i]; if (mi.n !== s.n || mi.d !== s.d || mi.q !== s.q || mi.r !== s.r || mi.noun !== s.noun) fails.push(`meta: item ${i + 1} ${JSON.stringify(mi)} vs stamps ${JSON.stringify(s)}`); });
  // page rules on the resolved config
  const resolvedDivisors = cfg.divisors === 'unit' ? type.divisorsOf(job.unit || loadBank()[loc] && loadBank()[loc].exemplar || (inj && inj.bank && inj.bank.exemplar) || '2-5') : cfg.divisors;
  const ds = new Set(m.items.map((x) => x.d));
  if (ds.size < Math.min(cfg.minDistinctD, resolvedDivisors.length)) fails.push(`rule: ${ds.size} distinct divisors, want >= ${Math.min(cfg.minDistinctD, resolvedDivisors.length)}`);
  if (m.items.filter((x) => x.q >= 2).length < cfg.minQ2Cards) fails.push(`rule: q >= 2 on ${m.items.filter((x) => x.q >= 2).length} cards, want >= ${cfg.minQ2Cards}`);
  if (cfg.rVaries && new Set(m.items.map((x) => x.r)).size < 2) fails.push('rule: the remainder is constant across the page');
  if (cfg.distinctN && new Set(m.items.map((x) => x.n)).size < m.items.length) fails.push('rule: n repeats across cards');
  if (new Set(m.items.map((x) => x.n + 'x' + x.d)).size < m.items.length) fails.push('rule: (n, d) repeats across cards');
  // chrome probes prove themselves
  if (job.strings === LONG_CHROME && (m.titleLines < 3 || m.body > 740)) fails.push(`chrome: LONG probe ${m.titleLines}-line title, body ${m.body} (want 3 lines, <= 740)`);
  if (job.strings === WORST_CHROME && (m.titleLines < 3 || m.insLines < 3 || m.body > 722)) fails.push(`chrome: WORST probe ${m.titleLines}/${m.insLines} lines, body ${m.body} (want 3/3, <= 722)`);
  if (job.strings === DEEP_CHROME && (m.titleLines < 4 || m.insLines < 3 || m.body > 705)) fails.push(`chrome: DEEP probe ${m.titleLines}-line title, body ${m.body} (want 4/3 lines, <= 705)`);
  if (!m.boxes) fails.push('non-vacuity: 0 boxes measured');
  return { fails, items: m.items, body: m.body, insLines: m.insLines, titleLines: m.titleLines, pngPath: out.pngPath, html: out.html, unit: m.unit, style: m.style };
}

/** Replace the n-th (0-based) item's stamp; throws when the needle is absent. */
function restamp(html, idx, patch) {
  const re = /<div class="ws-card-stage" data-ws-content data-lcs-item="(\d+)" data-lcs-n="(\d+)" data-lcs-d="(\d+)" data-lcs-q="(\d+)" data-lcs-r="(\d+)"/g;
  let hit = false;
  const out = html.replace(re, (m0, i, n, d, q, r) => {
    if (+i !== idx + 1) return m0;
    hit = true;
    const v = patch({ n: +n, d: +d, q: +q, r: +r });
    return `<div class="ws-card-stage" data-ws-content data-lcs-item="${i}" data-lcs-n="${v.n}" data-lcs-d="${v.d}" data-lcs-q="${v.q}" data-lcs-r="${v.r}"`;
  });
  if (!hit) throw new Error('NEEDLE MATCHED NOTHING (item ' + (idx + 1) + ' stamps)');
  return out;
}
function mustReplace(html, needle, repl, what) {
  const out = typeof needle === 'string' ? html.replace(needle, repl) : html.replace(needle, repl);
  if (out === html) throw new Error('NEEDLE MATCHED NOTHING (' + what + ')');
  return out;
}
/** The html of item k (0-based), for a scoped edit. */
function itemSlice(html, k) {
  const re = /<div class="ws-card-stage" data-ws-content data-lcs-item="(\d+)"[\s\S]*?<\/div><\/section>/g;
  let i = -1, m, found = null;
  while ((m = re.exec(html))) { i++; if (i === k) { found = m; break; } }
  if (!found) throw new Error('NEEDLE MATCHED NOTHING (item ' + (k + 1) + ')');
  return found[0];
}

const OP_SPAN = (g) => new RegExp(`(<span data-lcs-op="${g.replace(/[/]/g, '\\/')}"[^>]*>)${g.replace(/[/]/g, '\\/')}(</span>)`);
let SEEDS = 6;

/* ================================================================== E. the five faces (Phase 2, 2026-09-14)
 * G3-380 share · G3-381 practice · G3-382 exact · G3-383 error · G3-384 line (design §3). Each face
 * renders through the real pipeline at d2 en on the exemplar + the two other units, under LONG /
 * WORST / DEEP chrome, a seed sweep, and TEN synthetic locale blocks (the base's eight + da + no,
 * so the sign is asserted === notation.js and no ÷ appears on an sv / da / no page for EVERY face).
 * Per render: lints clean · verify() empty · the gate's own face audit (q / r re-derived from the
 * stamps; boxes ≥ 44 × 40 (casita 44 × 36); numerals ≥ 26 and === stamp; every zone inside the card
 * inner box and not overflowing; share: strip === n, pictures ≥ 36 px, loaded, inside the card, clear
 * of the badge, homes === d + one leftover, nothing dealt; exact: two word pills on ONE line ≥ 30
 * tall, none marked; error: a shown wrong pair whose open boxes sit exactly under it; line: hop px
 * ≥ 36 measured from the rendered ticks, the mark on n, labels every 5, no printed hop) · items ===
 * cfg.cards · meta ↔ stamps · the page rules · the chrome probes prove their own line counts ·
 * non-vacuity. Sweep: no two seeds identical; F3 exact positions vary, F4 error positions vary, F5
 * landings take ≥ 2 values on every page.
 * Refusals: a themeless face given a theme · share with a BW theme / no leftoverLabel / a label word
 * too long for the home · exact with no exactWord · an unknown mode · a line face whose hop cannot
 * clear 36 px · error kinds that do not sum to the cards · pills too wide even at 18 px.
 * Poisons (each must FAIL for its reason; the correct face page is the control) — the five the base
 * deferred are now COUNTED: P5 F3 `data-lcs-exact="1"` with r = 2 · P6a F4 the shown pair rewritten
 * to the true pair · P6b F4 a rBig card whose shown r < d · P7a F5 a printed [data-lcs-hop] · P7b F5
 * the line shrunk so a hop is 24 px · P10 an F1 home containing a picture · P13 F2 `49 ÷ 2` (q >
 * qMax) · plus: the mode stamp removed (the base verify then runs on a face page) · F3 exact items
 * all first / a fifth exact item / a pill carrying ÷ / one pill / a pre-marked pill / pills on two
 * rows · F4 seven rBig / the true quotient printed in the ghost line / a ghost box carrying text / a
 * sum card with shown r >= d / the ghost line above the shown line / the open q box shifted · F1 no
 * leftover home / one home short / the strip one picture short / a home carrying a tally text / the
 * leftover label rewritten / a picture outside the strip · F2 a picture on the page / d four times
 * / a constant remainder / an exact item · F5 the mark off n / lineEnd < n + d / lineEnd not a
 * multiple of 5 / a tick label missing / a constant landing · sv `/` rewritten to `÷` on EVERY face
 * · en op ':' refused on every face.
 */
const FACE_IDS = { share: 'G3-380', practice: 'G3-381', exact: 'G3-382', error: 'G3-383', line: 'G3-384' };
const FACE_KEYS = { share: 'F1', practice: 'F2', exact: 'F3', error: 'F4', line: 'F5' };
/** Render-test words per locale (the design's §4 pins; NOT data — the panels rebuild). */
const FACE_WORDS = {
  en: { exactWord: 'exact', restWord: 'remainder', leftoverLabel: 'left over' },
  de: { exactWord: 'geht auf', restWord: 'Rest', leftoverLabel: 'Rest' },
  sv: { exactWord: 'går jämnt ut', restWord: 'rest', leftoverLabel: 'rest' },
  fr: { exactWord: 'tombe juste', restWord: 'reste', leftoverLabel: 'reste' },
  fi: { exactWord: 'menee tasan', restWord: 'jää', leftoverLabel: 'jää yli' },
  nl: { exactWord: 'gaat op', restWord: 'rest', leftoverLabel: 'rest' },
  it: { exactWord: 'esatta', restWord: 'con il resto', leftoverLabel: 'resto' },
  es: { exactWord: 'exacta', restWord: 'con residuo', leftoverLabel: 'sobran' },
  pt: { exactWord: 'exata', restWord: 'não exata', leftoverLabel: 'sobra' },
  da: { exactWord: 'går op', restWord: 'rest', leftoverLabel: 'rest' },
  no: { exactWord: 'går opp', restWord: 'rest', leftoverLabel: 'rest' },
};
const FACE_SYNTH = Object.assign({}, SYNTH, {
  da: { op: ':', template: '{n} : {d} = {q} rest {r}', remWord: 'rest' },
  no: { op: ':', template: '{n} : {d} = {q}, rest {r}', remWord: 'rest' },
});
function faceSynth(loc) { return synthBlock(loc, Object.assign({}, FACE_SYNTH[loc], FACE_WORDS[loc])); }
const FACE_THEMELESS = new Set(['practice', 'exact', 'error', 'line']);

/** Render a face and run the gate's own in-page audit. inj = {bank, cfg, items}; opts.post edits the html. */
async function renderFace(page, type, mode, inj, job, opts) {
  let t = type;
  const loc = (job.locale || 'en').slice(0, 2);
  if (inj) t = { ...type, build: (o, ctx) => type._buildWith(inj.bank || loadBank()[o.locale.slice(0, 2)], inj.cfg || type.difficulty[o.difficulty], { theme: o.theme, locale: o.locale, unit: o.unit, items: inj.items }, ctx) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const theme = FACE_THEMELESS.has(mode) ? (job.theme === undefined ? null : job.theme) : job.theme;
  const out = await renderInstance({
    type: t, theme, difficulty: job.difficulty || 2, locale: loc, unit: job.unit || null, strings: job.strings,
    pageSize: job.pageSize, seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const cfg = (inj && inj.cfg) || type.difficulty[job.difficulty || 2];
  const m = await page.evaluate(({ mode, iconFloor, numeralFloor, boxW, boxHInline, boxHCasita, badge, cardPad }) => {
    const res = { fails: [], items: [], boxes: 0, opTexts: [], bodyText: (document.querySelector('[data-lcs-body]') || document.body).textContent };
    const F = res.fails;
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.insLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    res.titleLines = Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33);
    const root = document.querySelector('[data-lcs-dwr]');
    if (!root) { F.push('no root'); return res; }
    res.mode = root.dataset.lcsMode; res.style = root.dataset.lcsStyle; res.op = root.dataset.lcsOp; res.unit = root.dataset.lcsUnit;
    if (res.mode !== mode) F.push(`mode stamp ${res.mode}, want ${mode}`);
    const divisors = (root.dataset.lcsDivisors || '').split(',').map(Number);
    const nMin = +root.dataset.lcsNmin, nMax = +root.dataset.lcsNmax, qMax = root.dataset.lcsQmax ? +root.dataset.lcsQmax : Infinity;
    const casita = root.dataset.lcsStyle === 'casita';
    const grid = root.querySelector('.ws-cardgrid');
    if (grid) { const g = grid.getBoundingClientRect(); if (g.bottom > body.bottom + 0.6 || g.top < body.top - 0.6) F.push('size: card grid outside the body'); }
    const items = [...root.querySelectorAll('[data-lcs-item]')];
    items.forEach((it, i) => {
      const P = `item ${i + 1}`;
      const n = +it.dataset.lcsN, d = +it.dataset.lcsD, q = +it.dataset.lcsQ, r = +it.dataset.lcsR;
      const wq = Math.floor(n / d), wr = n - wq * d;
      if (q !== wq || r !== wr) F.push(`${P}: stamps q ${q} r ${r}, derived ${wq} R ${wr}`);
      if (mode === 'exact' ? !(wr >= 0 && wr < d) : !(wr >= 1 && wr < d)) F.push(`${P}: derived remainder ${wr} outside ${mode === 'exact' ? 0 : 1}..${d - 1}`);
      if (!divisors.includes(d)) F.push(`${P}: d ${d} outside the divisor set`);
      if (n < nMin || n > nMax) F.push(`${P}: n ${n} outside ${nMin}..${nMax}`);
      if (q > qMax) F.push(`${P}: q ${q} > qMax ${qMax}`);
      const card = it.closest('.ws-card');
      const cr = card ? card.getBoundingClientRect() : null;
      if (!cr) F.push(`${P}: not inside a card`);
      const inner = cr ? { left: cr.left + cardPad, right: cr.right - cardPad, top: cr.top + cardPad, bottom: cr.bottom - cardPad } : null;
      const inside = (b, what) => { if (inner && (b.left < inner.left - 0.6 || b.right > inner.right + 0.6 || b.top < inner.top - 0.6 || b.bottom > inner.bottom + 0.6)) F.push(`${P}: ${what} outside the card inner box`); };
      const clearOfBadge = (b, what) => { if (cr && b.left < cr.left + badge && b.top < cr.top + badge) F.push(`${P}: ${what} under the number badge`); };
      // numerals (visible stamps: n and d)
      const nums = [...it.querySelectorAll('[data-lcs-num]')];
      if (nums.length !== 2) F.push(`${P}: ${nums.length} printed numerals`);
      nums.forEach((e) => {
        const fs = parseFloat(getComputedStyle(e).fontSize);
        if (fs < numeralFloor - 0.1) F.push(`${P}: numeral ${fs}px < ${numeralFloor}`);
        if (e.textContent.trim() !== e.dataset.lcsNum) F.push(`${P}: numeral text "${e.textContent.trim()}" != stamp ${e.dataset.lcsNum}`);
        if (![n, d].includes(+e.dataset.lcsNum)) F.push(`${P}: numeral ${e.dataset.lcsNum} is neither n nor d`);
        clearOfBadge(e.getBoundingClientRect(), 'a numeral');
      });
      it.querySelectorAll('[data-lcs-op]').forEach((e) => { const g = e.textContent.trim(); if (['÷', ':', '/', '×', '·'].includes(g)) res.opTexts.push(g); });
      // zones
      const zones = [...it.querySelectorAll('[data-lcs-notation]')];
      if (zones.length !== (mode === 'error' ? 2 : 1)) F.push(`${P}: ${zones.length} zones`);
      zones.forEach((z) => {
        const zb = z.getBoundingClientRect();
        if (z.scrollWidth > z.clientWidth + 0.6) F.push(`${P}: zone content ${z.scrollWidth} > zone ${z.clientWidth} (overflow)`);
        inside(zb, 'zone');
        clearOfBadge(zb, 'the zone');
        z.querySelectorAll('[data-lcs-line]').forEach((ln) => { if (ln.scrollWidth > z.clientWidth + 0.6) F.push(`${P}: a notation line ${ln.scrollWidth} > zone ${z.clientWidth}`); });
        z.querySelectorAll('[data-lcs-word]').forEach((w) => { const fs = parseFloat(getComputedStyle(w).fontSize); if (fs < 14) F.push(`${P}: remainder word ${fs}px < 14`); });
      });
      // open boxes
      const boxes = [...it.querySelectorAll('[data-lcs-answer]')];
      if (boxes.length !== 2) F.push(`${P}: ${boxes.length} boxes`);
      boxes.forEach((b, k) => {
        const bb = b.getBoundingClientRect();
        const minH = casita ? boxHCasita : boxHInline;
        if (bb.width < boxW - 0.6 || bb.height < minH - 0.6) F.push(`${P}: box ${k + 1} ${bb.width.toFixed(1)}x${bb.height.toFixed(1)} < ${boxW}x${minH}`);
        if ((b.textContent || '').trim() || b.dataset.lcsAnswer) F.push(`${P}: box ${k + 1} carries "${b.textContent.trim() || b.dataset.lcsAnswer}"`);
        if (b.dataset.lcsRole !== (k === 0 ? 'q' : 'r')) F.push(`${P}: box ${k + 1} role ${b.dataset.lcsRole}`);
        inside(bb, `box ${k + 1}`);
        res.boxes++;
      });
      // no q / r as text (the error face's SHOWN pair excepted)
      const walker = document.createTreeWalker(it, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const s = node.textContent.trim();
        const inShown = mode === 'error' && node.parentElement && node.parentElement.closest('[data-lcs-shown-q],[data-lcs-shown-r]');
        const tickLabel = mode === 'line' && node.parentElement && node.parentElement.closest('[data-lcs-ticklabel]');   // every multiple of 5 is labelled whatever q / r are
        if (s && (s === String(q) || s === String(r)) && s !== String(n) && s !== String(d) && !inShown && !tickLabel) F.push(`${P}: text "${s}" prints the answer`);
      }
      const rec = { n, d, q, r, imgs: 0 };
      if (mode === 'share') {
        const imgs = [...it.querySelectorAll('[data-lcs-pile] img')];
        rec.imgs = imgs.length; rec.noun = it.dataset.lcsNoun;
        if (imgs.length !== n) F.push(`${P}: ${imgs.length} pictures for n ${n}`);
        imgs.forEach((img, k) => {
          const b = img.getBoundingClientRect();
          if (!img.complete || img.naturalWidth === 0) F.push(`${P}: picture ${k + 1} not loaded`);
          if (b.width < iconFloor - 0.6 || b.height < iconFloor - 0.6) F.push(`${P}: picture ${k + 1} ${b.width.toFixed(1)} px < ${iconFloor}`);
          inside(b, `picture ${k + 1}`);
          clearOfBadge(b, `picture ${k + 1}`);
        });
        if (it.querySelectorAll('img').length !== imgs.length) F.push(`${P}: a picture outside the strip`);
        const slots = [...it.querySelectorAll('[data-lcs-slot]')], lefts = [...it.querySelectorAll('[data-lcs-leftover]')];
        if (slots.length !== d) F.push(`${P}: ${slots.length} homes for d ${d}`);
        if (lefts.length !== 1) F.push(`${P}: ${lefts.length} leftover homes`);
        [...slots, ...lefts].forEach((s, k) => { const b = s.getBoundingClientRect(); if (b.height < 44 - 0.6 || b.width < 36 - 0.6) F.push(`${P}: home ${k + 1} ${b.width.toFixed(0)}x${b.height.toFixed(0)} below 36x44`); inside(b, `home ${k + 1}`); if (s.querySelector('img')) F.push(`${P}: home ${k + 1} holds a picture`); });
        slots.forEach((s, k) => { if ((s.textContent || '').trim()) F.push(`${P}: home ${k + 1} carries text`); });
        lefts.forEach((l) => { if (l.scrollWidth > l.clientWidth + 0.6 || l.scrollHeight > l.clientHeight + 0.6) F.push(`${P}: leftover label overflows`); const fs = parseFloat(getComputedStyle(l).fontSize); if (fs < 14 - 0.1) F.push(`${P}: leftover label ${fs}px < 14`); });
      } else if (it.querySelector('img')) F.push(`${P}: a picture on a themeless face`);
      if (mode === 'exact') {
        const pills = [...it.querySelectorAll('[data-lcs-pill]')];
        rec.exact = it.dataset.lcsExact;
        if (pills.length !== 2) F.push(`${P}: ${pills.length} pills`);
        if (pills.length === 2 && Math.abs(pills[0].getBoundingClientRect().top - pills[1].getBoundingClientRect().top) > 1) F.push(`${P}: pills on two rows`);
        pills.forEach((p, k) => { const b = p.getBoundingClientRect(); if (b.height < 30 - 0.6) F.push(`${P}: pill ${k + 1} ${b.height.toFixed(1)} tall < 30`); inside(b, `pill ${k + 1}`); if (!p.textContent.trim()) F.push(`${P}: pill ${k + 1} empty`); if (/[÷:/×·\d]/.test(p.textContent)) F.push(`${P}: pill ${k + 1} carries a glyph`); if (p.hasAttribute('data-lcs-marked')) F.push(`${P}: pill ${k + 1} marked`); });
        const pr = it.querySelector('[data-lcs-pills]');
        if (pr && zones[0] && pr.getBoundingClientRect().top < zones[0].getBoundingClientRect().bottom - 0.6) F.push(`${P}: pills overlap the notation`);
      }
      if (mode === 'error') {
        rec.kind = it.dataset.lcsKind;
        const sq = it.querySelector('[data-lcs-shown-q]'), sr = it.querySelector('[data-lcs-shown-r]');
        if (!sq || !sr) F.push(`${P}: shown pair missing`);
        else {
          rec.sQ = +sq.dataset.lcsShownQ; rec.sR = +sr.dataset.lcsShownR;
          if (sq.textContent.trim() !== String(rec.sQ) || sr.textContent.trim() !== String(rec.sR)) F.push(`${P}: shown text != stamp`);
          if (rec.sQ === q && rec.sR === r && rec.kind !== 'clean') F.push(`${P}: shown pair is the true pair`);
          if (rec.kind === 'rBig' && !(rec.sR >= d && rec.sQ * d + rec.sR === n)) F.push(`${P}: rBig shape wrong (${rec.sQ} R ${rec.sR} for ${n} / ${d})`);
          if (rec.kind === 'sum' && !(rec.sR >= 1 && rec.sR < d && rec.sQ * d + rec.sR !== n && Math.abs(rec.sQ * d + rec.sR - n) <= 2)) F.push(`${P}: sum shape wrong (${rec.sQ} R ${rec.sR} for ${n} / ${d})`);
          [sq, sr].forEach((e, k) => { const b = e.getBoundingClientRect(); if (b.width < boxW - 0.6 || b.height < 30 - 0.6) F.push(`${P}: shown box ${k + 1} ${b.width.toFixed(1)}x${b.height.toFixed(1)} < 44x30`); const tEl = e.querySelector('text') || e; const fs = parseFloat(getComputedStyle(tEl).fontSize); if (fs < 22 - 0.1) F.push(`${P}: shown numeral ${fs}px < 22`); inside(b, `shown box ${k + 1}`); });
          const gq = it.querySelector('[data-lcs-ghost] [data-lcs-role="q"]'), gr = it.querySelector('[data-lcs-ghost] [data-lcs-role="r"]');
          if (!gq || !gr) F.push(`${P}: open boxes not in a ghost line`);
          else {
            const a = sq.getBoundingClientRect(), b = gq.getBoundingClientRect(), c = sr.getBoundingClientRect(), e = gr.getBoundingClientRect();
            if (Math.abs(a.left - b.left) > 1) F.push(`${P}: open q box ${(b.left - a.left).toFixed(1)} px off the shown q`);
            if (Math.abs(c.left - e.left) > 1) F.push(`${P}: open r box ${(e.left - c.left).toFixed(1)} px off the shown r`);
            if (b.top < a.bottom - 0.6 || e.top < c.bottom - 0.6) F.push(`${P}: open boxes not below the shown pair`);
          }
        }
      }
      if (mode === 'line') {
        const lineEnd = +it.dataset.lcsLineend;
        rec.lineEnd = lineEnd;
        const nl = it.querySelector('[data-lcs-prim="number-line"]');
        if (!nl) F.push(`${P}: no number line`);
        else {
          inside(nl.getBoundingClientRect(), 'the number line');
          clearOfBadge(nl.getBoundingClientRect(), 'the number line');
          if (+nl.dataset.lcsMax !== lineEnd || +nl.dataset.lcsMin !== 0) F.push(`${P}: line ${nl.dataset.lcsMin}..${nl.dataset.lcsMax}, stamp 0..${lineEnd}`);
        }
        if (lineEnd % 5 || lineEnd < n + d) F.push(`${P}: lineEnd ${lineEnd} (want a multiple of 5 >= ${n + d})`);
        const tN = it.querySelector(`[data-lcs-tick="${n}"]`), tB = it.querySelector(`[data-lcs-tick="${n - d}"]`);
        if (!tN || !tB) F.push(`${P}: ticks ${n} / ${n - d} missing`);
        else { rec.hop = tN.getBoundingClientRect().left - tB.getBoundingClientRect().left; if (rec.hop < iconFloor - 0.6) F.push(`${P}: hop ${rec.hop.toFixed(1)} px < ${iconFloor}`); }
        const marks = [...it.querySelectorAll('[data-lcs-mark]')];
        if (marks.length !== 1 || +marks[0].dataset.lcsMark !== n) F.push(`${P}: mark ${marks.map((m) => m.dataset.lcsMark)} for n ${n}`);
        if (marks[0] && tN) { const mb = marks[0].getBoundingClientRect(); if (Math.abs(mb.left + mb.width / 2 - tN.getBoundingClientRect().left) > 1.5) F.push(`${P}: mark off the tick`); }
        if (it.querySelectorAll('[data-lcs-hop]').length) F.push(`${P}: printed hops`);
        const labels = [...it.querySelectorAll('[data-lcs-ticklabel]')];
        if (labels.length !== lineEnd / 5 + 1) F.push(`${P}: ${labels.length} labels for 0..${lineEnd}`);
        labels.forEach((l) => { const fs = parseFloat(getComputedStyle(l).fontSize); if (fs < 17 - 0.1) F.push(`${P}: label ${fs}px < 17`); });
        const wrap = it.querySelector('[data-lcs-linewrap]');
        if (wrap && nl) { const air = nl.getBoundingClientRect().top - wrap.getBoundingClientRect().top; if (air < 20 - 0.6) F.push(`${P}: air ${air.toFixed(1)} < 20`); }
      }
      res.items.push(rec);
    });
    return res;
  }, { mode, iconFloor: ICON_FLOOR, numeralFloor: NUMERAL_FLOOR, boxW: BOX_W, boxHInline: BOX_H_INLINE, boxHCasita: BOX_H_CASITA, badge: BADGE, cardPad: CARD_PAD });
  fails.push(...m.fails.map((x) => (x.startsWith('size') ? x : 'audit: ' + x)));
  if (m.items.length !== cfg.cards) fails.push(`count: ${m.items.length} items, config says ${cfg.cards}`);
  const div = divGlyph(loc), mul = mulGlyph(loc);
  if (m.op !== div) fails.push(`sign: root stamps "${m.op}", notation.js says "${div}" for ${loc}`);
  for (const g of m.opTexts) {
    if (['÷', ':', '/'].includes(g) && g !== div) fails.push(`sign: the page prints "${g}", notation.js says "${div}" for ${loc}`);
    if (['×', '·'].includes(g) && g !== mul) fails.push(`sign: the page prints "${g}", notation.js says "${mul}" for ${loc}`);
  }
  if (!m.opTexts.length && !(inj && inj.bank && inj.bank.notation.op === null) && FACE_SYNTH[loc] && FACE_SYNTH[loc].op === null) { /* fr product form: × only */ }
  if (['sv', 'da', 'no'].includes(loc) && m.bodyText.includes('÷')) fails.push(`sign: a ${loc} page carries ÷ (historic minus)`);
  // meta ↔ stamps
  const metaItems = (out.meta && out.meta.items) || [];
  if (metaItems.length !== m.items.length) fails.push(`meta: ${metaItems.length} items vs ${m.items.length} stamped`);
  else metaItems.forEach((mi, i) => { const s = m.items[i]; if (mi.n !== s.n || mi.d !== s.d || mi.q !== s.q || mi.r !== s.r || (mode === 'share' && mi.noun !== s.noun) || (mode === 'error' && (mi.kind !== s.kind || mi.sQ !== s.sQ || mi.sR !== s.sR)) || (mode === 'line' && mi.lineEnd !== s.lineEnd)) fails.push(`meta: item ${i + 1} ${JSON.stringify(mi)} vs stamps ${JSON.stringify(s)}`); });
  if (out.meta && out.meta.mode !== mode) fails.push(`meta: mode ${out.meta.mode}`);
  // page rules on the resolved config
  const resolvedDivisors = cfg.divisors === 'unit' ? type.divisorsOf(job.unit || (inj && inj.bank && inj.bank.exemplar) || loadBank().en.exemplar) : cfg.divisors;
  const ds = new Set(m.items.map((x) => x.d));
  if (ds.size < Math.min(cfg.minDistinctD || 1, resolvedDivisors.length)) fails.push(`rule: ${ds.size} distinct divisors, want >= ${Math.min(cfg.minDistinctD || 1, resolvedDivisors.length)}`);
  if ((cfg.minQ2Cards || 0) > 0 && m.items.filter((x) => x.q >= 2).length < cfg.minQ2Cards) fails.push('rule: q >= 2 cards');
  if (cfg.rVaries && new Set(m.items.map((x) => x.r)).size < 2) fails.push('rule: the remainder is constant across the page');
  if (cfg.distinctN && new Set(m.items.map((x) => x.n)).size < m.items.length) fails.push('rule: n repeats across cards');
  if (new Set(m.items.map((x) => x.n + 'x' + x.d)).size < m.items.length) fails.push('rule: (n, d) repeats across cards');
  if (cfg.maxPerD) { const c = {}; for (const x of m.items) { c[x.d] = (c[x.d] || 0) + 1; if (c[x.d] > cfg.maxPerD) fails.push(`rule: d ${x.d} more than ${cfg.maxPerD} times`); } }
  if (mode === 'exact') {
    const ex = m.items.map((x) => x.r === 0);
    if (ex.filter(Boolean).length !== cfg.exact) fails.push(`rule: ${ex.filter(Boolean).length} exact items, want ${cfg.exact}`);
    if (ex.slice(0, cfg.exact).every(Boolean) || ex.slice(-cfg.exact).every(Boolean)) fails.push('rule: the exact items are all first or all last');
    m.items.forEach((x, i) => { if ((x.exact === '1') !== (x.r === 0)) fails.push(`rule: item ${i + 1} exact stamp ${x.exact} vs r ${x.r}`); });
  }
  if (mode === 'error') {
    const c = {}; for (const x of m.items) c[x.kind] = (c[x.kind] || 0) + 1;
    for (const [k, v] of Object.entries(cfg.kinds || {})) if ((c[k] || 0) !== v) fails.push(`rule: ${c[k] || 0} ${k}, want ${v}`);
    if ((c.clean || 0) !== (cfg.clean || 0)) fails.push(`rule: ${c.clean || 0} clean, want ${cfg.clean || 0}`);
  }
  if (mode === 'line') { if (new Set(m.items.map((x) => x.r)).size < 2) fails.push('rule: landings take one value'); for (const x of m.items) if (x.lineEnd > cfg.lineMax) fails.push(`rule: lineEnd ${x.lineEnd} > lineMax`); }
  if (job.strings === LONG_CHROME && (m.titleLines < 3 || m.body > 740)) fails.push(`chrome: LONG probe ${m.titleLines}-line title, body ${m.body} (want 3 lines, <= 740)`);
  if (job.strings === WORST_CHROME && (m.titleLines < 3 || m.insLines < 3 || m.body > 722)) fails.push(`chrome: WORST probe ${m.titleLines}/${m.insLines} lines, body ${m.body} (want 3/3, <= 722)`);
  if (job.strings === DEEP_CHROME && (m.titleLines < 4 || m.insLines < 3 || m.body > 705)) fails.push(`chrome: DEEP probe ${m.titleLines}-line title, body ${m.body} (want 4/3 lines, <= 705)`);
  if (!m.boxes) fails.push('non-vacuity: 0 boxes measured');
  return { fails, items: m.items, body: m.body, insLines: m.insLines, titleLines: m.titleLines, pngPath: out.pngPath, html: out.html, unit: m.unit, style: m.style };
}

async function facesSection(page, note, addAssertions, THEME) {
  const bankAll = loadBank();
  const en = bankAll.en;
  const poisons = [];
  for (const [mode, id] of Object.entries(FACE_IDS)) {
    const type = loadType(id);
    const key = FACE_KEYS[mode];
    note(type.difficulty[2].mode === mode, `E ${id}: difficulty[2].mode is ${type.difficulty[2].mode}, want ${mode}`);
    note(type.i18n.en.title === en.strings[key].title && type.i18n.en.instruction === en.strings[key].instruction, `E ${id}: i18n.en != the bank strings.${key} (two sources)`);
    note(type.themeAxis.applicable === (mode === 'share'), `E ${id}: themeAxis.applicable ${type.themeAxis.applicable}`);
    note(JSON.stringify(type.difficulty[1]) === JSON.stringify(type.difficulty[2]) && JSON.stringify(type.difficulty[2]) === JSON.stringify(type.difficulty[3]), `E ${id}: the three levels differ (a face ships one config)`);
    const themed = mode === 'share';
    const jobs = [];
    jobs.push({ difficulty: 2, locale: 'en', theme: themed ? THEME : null, baseName: `${id}-d2-en`, tag: 'level' });
    // share refuses the 6-9 / 2-9 units (a 396-px deal row holds 7 homes at the 36-px floor); the other faces render them
    if (!themed) for (const u of type.unitAxis.units().filter((x) => x !== en.exemplar)) jobs.push({ difficulty: 2, locale: 'en', theme: null, unit: u, baseName: `${id}-d2-en-u${u}`, tag: 'unit' });
    if (themed) jobs.push({ difficulty: 2, locale: 'en', theme: 'fruits', baseName: `${id}-d2-en-fruits`, tag: 'theme' });
    jobs.push({ difficulty: 2, locale: 'en', theme: themed ? THEME : null, strings: LONG_CHROME, pageSize: 'a4', baseName: `${id}-d2-en-longchrome`, tag: 'long-chrome' });
    jobs.push({ difficulty: 2, locale: 'en', theme: themed ? THEME : null, strings: WORST_CHROME, pageSize: 'a4', baseName: `${id}-d2-en-worstchrome`, tag: 'worst-chrome' });
    jobs.push({ difficulty: 2, locale: 'en', theme: themed ? THEME : null, strings: DEEP_CHROME, pageSize: 'a4', baseName: `${id}-d2-en-deepchrome`, tag: 'deep-chrome' });
    for (let s = 2; s <= SEEDS; s++) jobs.push({ difficulty: 2, locale: 'en', theme: themed ? THEME : null, seedEpoch: s, baseName: `${id}-d2-en-seed${s}`, tag: 'seed' });
    for (const l of Object.keys(FACE_SYNTH)) {
      jobs.push({ difficulty: 2, locale: l, theme: themed ? THEME : null, pageSize: 'a4', inj: { bank: faceSynth(l) }, baseName: `${id}-d2-${l}-synth`, tag: 'synth' });
      // the casita locales + the widest inline line under the DEEP chrome (the tightest stack per face)
      if (['es', 'pt', 'fr'].includes(l)) jobs.push({ difficulty: 2, locale: l, theme: themed ? THEME : null, pageSize: 'a4', strings: DEEP_CHROME, inj: { bank: faceSynth(l) }, baseName: `${id}-d2-${l}-synth-deep`, tag: 'synth-deep' });
    }
    const pages = new Map();
    const sweep = { exactPos: new Set(), errorPos: new Set() };
    for (const job of jobs) {
      let r;
      try { r = await renderFace(page, type, mode, job.inj || null, job); } catch (e) { r = { thrown: e.message }; }
      note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
      if (r.thrown) { console.log(`[E] ${job.baseName}: THREW ${r.thrown}`); continue; }
      addAssertions(12 * r.items.length);
      note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
      if (job.tag === 'seed' || job.tag === 'level') {
        const k = r.items.map((p) => `${p.n}/${p.d}` + (p.noun ? '@' + p.noun : '')).join(',');
        const prev = pages.get(k);
        note(!prev, `${job.baseName}: identical page to ${prev}`);
        pages.set(k, job.baseName);
        if (mode === 'exact') sweep.exactPos.add(r.items.map((p) => (p.r === 0 ? 1 : 0)).join(''));
        if (mode === 'error') sweep.errorPos.add(r.items.map((p) => p.kind[0]).join(''));
      }
      if (job.tag !== 'seed') console.log(`[E] ${job.baseName}: body ${r.body} (${r.titleLines}/${r.insLines} lines) ${r.style} ${r.unit} [${r.items.map((p) => `${p.n}÷${p.d}` + (p.kind ? ':' + p.kind : '') + (p.lineEnd ? '/' + p.lineEnd : '')).join(' ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
    }
    console.log(`[E] ${id} sweep over ${SEEDS} seeds: ${pages.size} distinct pages` + (mode === 'exact' ? `, ${sweep.exactPos.size} exact layouts` : '') + (mode === 'error' ? `, ${sweep.errorPos.size} kind layouts` : ''));
    if (mode === 'exact') note(sweep.exactPos.size >= 2, `${id}: the exact positions never vary over ${SEEDS} seeds`);
    if (mode === 'error') note(sweep.errorPos.size >= 2, `${id}: the error positions never vary over ${SEEDS} seeds`);

    // ---- refusals
    const refusals = [];
    if (themed) {
      refusals.push(['share with a BW theme', { theme: 'zoo animals bw' }, /B&W/]);
      refusals.push(['share without a theme', { theme: null }, /theme is required/]);
      refusals.push(['share with no leftoverLabel', { theme: THEME, locale: 'de', inj: { bank: (() => { const b = faceSynth('de'); b.notation.leftoverLabel = ''; return b; })() } }, /REFUSED/]);
      for (const u of type.unitAxis.units().filter((x) => x !== en.exemplar)) refusals.push([`share on the ${u} unit (8-9 homes cannot clear 36 px)`, { theme: THEME, unit: u }, /at most 7 homes/]);
      refusals.push(['share with a 9-char leftover word', { theme: THEME, locale: 'de', inj: { bank: (() => { const b = faceSynth('de'); b.notation.leftoverLabel = 'Restmenge'; return b; })() } }, /cannot fit/]);
    } else refusals.push([`${mode} given a theme`, { theme: THEME }, /themeless face/]);
    if (mode === 'exact') {
      refusals.push(['exact with no exactWord', { locale: 'de', inj: { bank: (() => { const b = faceSynth('de'); b.notation.exactWord = ''; return b; })() } }, /REFUSED/]);
      refusals.push(['exact with pills too wide even at 18 px', { locale: 'de', inj: { bank: (() => { const b = faceSynth('de'); b.notation.exactWord = 'die Division geht vollständig auf'; b.notation.restWord = 'es bleibt ein Rest übrig'; return b; })() } }, /even at 18/]);
      refusals.push(['exact with exact = cards', { inj: { cfg: { ...type.difficulty[2], exact: 8 } } }, /1..cards/]);
    }
    if (mode === 'error') refusals.push(['error kinds not summing to the cards', { inj: { cfg: { ...type.difficulty[2], kinds: { rBig: 7, sum: 2 } } } }, /cards 8/]);
    if (mode === 'line') {
      refusals.push(['line with lineW 300 (no hop can clear 36 px on 0..35)', { inj: { cfg: { ...type.difficulty[2], lineW: 300, divisors: [2] } } }, /no page satisfies/]);
      refusals.push(['line with hopMin 24 (below the element floor)', { inj: { cfg: { ...type.difficulty[2], hopMin: 24 } } }, /element floor/]);
    }
    refusals.push([`${mode} with an unknown unit`, { theme: themed ? THEME : null, unit: '3-4' }, /unknown unit/]);
    refusals.push([`${mode} with mode 'bogus'`, { theme: themed ? THEME : null, inj: { cfg: { ...type.difficulty[2], mode: 'bogus' } } }, /unknown mode/]);
    refusals.push([`${mode} with the en bank op ':'`, { theme: themed ? THEME : null, inj: { bank: (() => { const b = clone(en); b.notation.op = ':'; b.notation.template = '{n} : {d} = {q} R{r}'; return b; })() } }, /division sign/]);
    refusals.push([`${mode} with minR 0`, { theme: themed ? THEME : null, inj: { cfg: { ...type.difficulty[2], minR: mode === 'exact' ? -1 : 0 } } }, /minR must be/]);
    for (const [name, job, want] of refusals) {
      let err = null;
      try { await renderFace(page, type, mode, job.inj || null, { difficulty: 2, locale: job.locale || 'en', theme: job.theme, unit: job.unit, baseName: `${id}-refusal` }); } catch (e) { err = e.message; }
      note(err && want.test(err), `${id} ${name} was not refused (${err || 'rendered'})`);
      console.log(`[E] ${id} refusal ${name}: ${err ? 'refused (' + err.replace(/^.*?: /, '').slice(0, 90) + ')' : 'RENDERED'}`);
    }

    // ---- poisons
    const control = await renderFace(page, type, mode, null, { difficulty: 2, locale: 'en', theme: themed ? THEME : null, baseName: `${id}-control` });
    note(control.fails.length === 0, `${id} control did not pass: ${control.fails.join(' | ')}`);
    const P = (name, run) => poisons.push({ name: `${id} ${name}`, run });
    const htmlPoison = (name, post, want, job) => P(name, async () => {
      const r = await renderFace(page, type, mode, (job && job.inj) || null, { difficulty: 2, locale: (job && job.locale) || 'en', theme: themed ? THEME : null, unit: job && job.unit, strings: job && job.strings, pageSize: job && job.pageSize, baseName: `${id}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 34).toLowerCase() }, { post });
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    });
    const itemsPoison = (name, items, want, extraCfg) => P(name, async () => {
      const r = await renderFace(page, type, mode, { items, cfg: extraCfg ? { ...type.difficulty[2], ...extraCfg } : null }, { difficulty: 2, locale: 'en', theme: themed ? THEME : null, baseName: `${id}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 34).toLowerCase() });
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    });
    const item1 = (h) => { const mm = /data-lcs-item="1" data-lcs-n="(\d+)" data-lcs-d="(\d+)" data-lcs-q="(\d+)" data-lcs-r="(\d+)"/.exec(h); if (!mm) throw new Error('NEEDLE MATCHED NOTHING (item 1)'); return { n: +mm[1], d: +mm[2], q: +mm[3], r: +mm[4] }; };
    // every face: the sv sign rewritten to ÷ (historic minus) + the mode stamp removed
    htmlPoison('sv page with / rewritten to ÷', (h) => mustReplace(h, OP_SPAN('/'), '$1÷$2', 'sv op span'), /historic minus/, { locale: 'sv', inj: { bank: faceSynth('sv') } });
    htmlPoison('en page with ÷ rewritten to :', (h) => mustReplace(h, OP_SPAN('÷'), '$1:$2', 'en op span'), /page sign|notation\.js says/);
    htmlPoison('the mode stamp removed (the base verify runs on a face page)', (h) => mustReplace(h, ` data-lcs-mode="${mode}"`, '', 'mode stamp'), /verify:/);
    htmlPoison('a page of one card fewer', (h) => mustReplace(h, /<section class="ws-card" data-lcs-card="1">[\s\S]*?<\/section>/, '', 'card 1'), /items:|count:/);
    htmlPoison('a blank page (non-vacuity)', (h) => h.replace(/<section class="ws-card"[\s\S]*?<\/section>/g, ''), /non-vacuity|items: 0|blank worksheet/);
    htmlPoison('q one too big (n != q*d + r)', (h) => restamp(h, 0, (v) => ({ n: v.n, d: v.d, q: v.q + 1, r: v.r })), /!= floor|q\*d \+ r|derived/);
    htmlPoison('the boxes swapped (r then q)', (h) => { const it = itemSlice(h, 0); const sw = mustReplace(it, 'data-lcs-role="q"', 'data-lcs-role="X"', 'q role').replace('data-lcs-role="r"', 'data-lcs-role="q"').replace('data-lcs-role="X"', 'data-lcs-role="r"'); return h.replace(it, sw); }, /want q then r|role/);
    htmlPoison('a third printed numeral (q)', (h) => { const v = item1(h); return mustReplace(h, /(<div data-lcs-line[^>]*>|<div data-lcs-notation[^>]*>)/, `$1<span data-lcs-num="${v.q}" style="font-family:'Baloo 2';font-weight:700;font-size:26px">${v.q}</span>`, 'line'); }, /printed numerals|neither n nor d/);
    if (mode === 'share') {
      htmlPoison('P10 a home containing a picture (dealt by the machine)', (h) => { const img = /<img class="ws-icon"[^>]*>/.exec(h); if (!img) throw new Error('NEEDLE MATCHED NOTHING (img)'); return mustReplace(h, /(<span class="ws-groupbox" data-lcs-slot="1"[^>]*>)/, '$1' + img[0], 'slot 1'); }, /dealt by the machine|holds a picture|contains a picture/);
      htmlPoison('the leftover home removed', (h) => mustReplace(h, /<span class="ws-groupbox ws-groupbox--empty" data-lcs-leftover[\s\S]*?<\/span>/, '', 'leftover'), /leftover homes/);
      htmlPoison('one home short', (h) => mustReplace(h, /<span class="ws-groupbox" data-lcs-slot="1"[^>]*><\/span>/, '', 'slot 1'), /homes/);
      htmlPoison('the strip one picture short', (h) => { const it = itemSlice(h, 0); return h.replace(it, mustReplace(it, /<img class="ws-icon"[^>]*>/, '', 'first img')); }, /strip shows|pictures for n/);
      htmlPoison('a home carrying a tally text', (h) => mustReplace(h, /(<span class="ws-groupbox" data-lcs-slot="1"[^>]*>)(<\/span>)/, '$1|||$2', 'slot 1'), /carries text/);
      htmlPoison('the leftover label rewritten', (h) => mustReplace(h, /(data-lcs-leftover[^>]*>)left over(<\/span>)/, '$1rest$2', 'leftover label'), /leftover label/);
      htmlPoison('the leftover label rewritten to the remainder', (h) => { const v = item1(h); return mustReplace(h, /(data-lcs-leftover[^>]*>)left over(<\/span>)/, `$1${v.r}$2`, 'leftover label'); }, /leftover label|prints the answer|answer printed/);
      htmlPoison('a group stamp on the strip (pre-boxed)', (h) => mustReplace(h, /(<div class="ws-icon-row")/, '<span data-lcs-group="1"></span>$1', 'icon row'), /pre-boxed/);
      htmlPoison('pictures shrunk to 30', (h) => { const it = itemSlice(h, 0); return h.replace(it, it.replace(/width:36px;height:36px/g, 'width:30px;height:30px')); }, /< 36/);
      htmlPoison('a picture path rewritten into the bw directory', (h) => mustReplace(h, new RegExp(`(<img class="ws-icon" src="[^"]*?)/${encodeURIComponent(THEME)}/`), '$1/zoo%20animals%20bw/', 'img src'), /B&W/);
      htmlPoison('an exact item (r = 0)', (h) => restamp(h, 0, (v) => ({ n: v.q * v.d, d: v.d, q: v.q, r: 0 })), /exact division|outside 1/);
      itemsPoison('n above nMax 20 (24 pictures = 3 rows)', [{ n: 24, d: 5 }, { n: 11, d: 4 }, { n: 14, d: 3 }, { n: 19, d: 3 }], /above nMax|outside/);
    }
    if (mode === 'practice') {
      htmlPoison('P13 49 ÷ 2 at d2 (q > qMax)', (h) => restamp(h, 0, () => ({ n: 49, d: 2, q: 24, r: 1 })), /above qMax|> qMax/);
      htmlPoison('a picture on the page', (h) => mustReplace(h, /(<div data-lcs-notation)/, '<img class="ws-icon" src="x.png" alt="" style="width:36px;height:36px">$1', 'zone'), /picture on a (numbers|themeless) face|broken image/);
      itemsPoison('divisor 2 four times', [{ n: 5, d: 2 }, { n: 7, d: 2 }, { n: 9, d: 2 }, { n: 11, d: 2 }, { n: 10, d: 3 }, { n: 14, d: 3 }, { n: 13, d: 4 }, { n: 17, d: 4 }, { n: 16, d: 5 }, { n: 22, d: 5 }], /more than 3 times/);
      itemsPoison('a constant remainder', [{ n: 5, d: 2 }, { n: 7, d: 2 }, { n: 9, d: 2 }, { n: 10, d: 3 }, { n: 13, d: 3 }, { n: 16, d: 3 }, { n: 13, d: 4 }, { n: 17, d: 4 }, { n: 21, d: 4 }, { n: 16, d: 5 }], /constant/);
      itemsPoison('an exact item among the rows', [{ n: 5, d: 2 }, { n: 7, d: 2 }, { n: 8, d: 2 }, { n: 10, d: 3 }, { n: 14, d: 3 }, { n: 16, d: 3 }, { n: 13, d: 4 }, { n: 17, d: 4 }, { n: 22, d: 4 }, { n: 16, d: 5 }], /exact division|outside 1/);
    }
    if (mode === 'exact') {
      htmlPoison('P5 data-lcs-exact="1" on an item with a remainder', (h) => { const re = /(data-lcs-item="\d+" data-lcs-n="\d+" data-lcs-d="\d+" data-lcs-q="\d+" data-lcs-r="[1-9]\d*" data-lcs-exact=")0(")/; return mustReplace(h, re, '$11$2', 'a remainder item'); }, /data-lcs-exact=1 but r|exact stamp/);
      itemsPoison('the exact items all first', [{ n: 12, d: 3 }, { n: 16, d: 4 }, { n: 10, d: 2 }, { n: 20, d: 5 }, { n: 13, d: 3 }, { n: 17, d: 4 }, { n: 9, d: 2 }, { n: 21, d: 5 }], /all first/);
      itemsPoison('the exact items all last', [{ n: 13, d: 3 }, { n: 17, d: 4 }, { n: 9, d: 2 }, { n: 21, d: 5 }, { n: 12, d: 3 }, { n: 16, d: 4 }, { n: 10, d: 2 }, { n: 20, d: 5 }], /all last/);
      itemsPoison('a fifth exact item', [{ n: 12, d: 3 }, { n: 17, d: 4 }, { n: 10, d: 2 }, { n: 21, d: 5 }, { n: 15, d: 3 }, { n: 16, d: 4 }, { n: 9, d: 2 }, { n: 20, d: 5 }], /5 exact items/);
      htmlPoison('a pill carrying ÷', (h) => mustReplace(h, /(data-lcs-pill="exact">)exact(<\/span>)/, '$1÷ exact$2', 'exact pill'), /glyph/);
      htmlPoison('one pill removed', (h) => mustReplace(h, /<span class="ws-pill"[^>]*data-lcs-pill="rest">[^<]*<\/span>/, '', 'rest pill'), /pills, want|1 pills/);
      htmlPoison('a pre-marked pill', (h) => mustReplace(h, 'data-lcs-pill="exact"', 'data-lcs-pill="exact" data-lcs-marked="1"', 'exact pill'), /pre-marked|marked/);
      htmlPoison('the pills forced onto two rows', (h) => mustReplace(h, /(data-lcs-pill="rest">)/, '$1a very long remainder word that wraps ', 'rest pill'), /two rows|outside the card|overflow/);
      htmlPoison('a pill font shrunk to 14', (h) => mustReplace(h, /style="font-size:20px;line-height:1.1"/, 'style="font-size:14px;line-height:1.1"', 'pill style'), /pill font/);
    }
    if (mode === 'error') {
      htmlPoison('P6a the shown pair rewritten to the true pair', (h) => { const v = item1(h); const it = itemSlice(h, 0); let s = mustReplace(it, /data-lcs-shown-q="\d+"([^>]*>)\d+(<\/span>)/, `data-lcs-shown-q="${v.q}"$1${v.q}$2`, 'shown q'); s = mustReplace(s, /data-lcs-shown-r="\d+"([^>]*>)\d+(<\/span>)/, `data-lcs-shown-r="${v.r}"$1${v.r}$2`, 'shown r'); return h.replace(it, s); }, /IS the true pair|is the true pair/);
      htmlPoison('P6b a rBig card whose shown r < d', (h) => { const re = /(<div class="ws-card-stage" data-ws-content data-lcs-item="\d+" data-lcs-n="\d+" data-lcs-d="(\d+)" data-lcs-q="\d+" data-lcs-r="\d+" data-lcs-kind="rBig"[\s\S]*?data-lcs-shown-r=")\d+("[^>]*>)\d+(<\/span>)/; const mm = re.exec(h); if (!mm) throw new Error('NEEDLE MATCHED NOTHING (rBig)'); const d = +mm[2]; return h.replace(re, `$1${d - 1}$3${d - 1}$4`); }, /rBig but the shown remainder|rBig shape/);
      itemsPoison('seven rBig, one sum', [{ n: 7, d: 3, kind: 'rBig' }, { n: 9, d: 2, kind: 'rBig' }, { n: 11, d: 4, kind: 'rBig' }, { n: 14, d: 3, kind: 'rBig' }, { n: 17, d: 5, kind: 'rBig' }, { n: 19, d: 4, kind: 'rBig' }, { n: 22, d: 5, kind: 'rBig' }, { n: 13, d: 5, kind: 'sum' }], /7 rBig|rBig items, config says 6/);
      itemsPoison('a sum card with shown r >= d', [{ n: 7, d: 3, kind: 'sum', sQ: 2, sR: 4 }, { n: 9, d: 2, kind: 'rBig' }, { n: 11, d: 4, kind: 'rBig' }, { n: 14, d: 3, kind: 'rBig' }, { n: 17, d: 5, kind: 'rBig' }, { n: 19, d: 4, kind: 'rBig' }, { n: 22, d: 5, kind: 'rBig' }, { n: 13, d: 5, kind: 'sum' }], /sum but the shown remainder|sum shape/);
      itemsPoison('a clean card where none is configured', [{ n: 7, d: 3, kind: 'clean' }, { n: 9, d: 2, kind: 'rBig' }, { n: 11, d: 4, kind: 'rBig' }, { n: 14, d: 3, kind: 'rBig' }, { n: 17, d: 5, kind: 'rBig' }, { n: 19, d: 4, kind: 'rBig' }, { n: 22, d: 5, kind: 'sum' }, { n: 13, d: 5, kind: 'sum' }], /clean/);
      htmlPoison('the true quotient printed in the ghost line', (h) => { const v = item1(h); return mustReplace(h, /(<div data-lcs-notation[^>]*data-lcs-ghost="1"[^>]*>)/, `$1<span style="font-family:'Baloo 2';font-weight:700;font-size:26px">${v.q}</span>`, 'ghost line'); }, /answer printed|prints the answer/);
      htmlPoison('a ghost box carrying text', (h) => mustReplace(h, /(data-lcs-ghost="1"[\s\S]*?data-lcs-role="q" style="[^"]*">)(<\/span>)/, '$17$2', 'ghost q box'), /answer printed|carries/);
      htmlPoison('the ghost line above the shown line', (h) => { const it = itemSlice(h, 0); const re = /(<div data-lcs-notation[^>]*>[\s\S]*?<\/div><\/div>)(<div data-lcs-notation[^>]*data-lcs-ghost="1"[\s\S]*?<\/div><\/div>)/; const mm = re.exec(it); if (!mm) throw new Error('NEEDLE MATCHED NOTHING (two lines)'); return h.replace(it, it.replace(re, '$2$1')); }, /ghost line sits above|not below the shown|not under the shown/);
      htmlPoison('the open q box shifted 12 px', (h) => mustReplace(h, /(data-lcs-ghost="1"[\s\S]*?data-lcs-role="q" style=")/, '$1margin-left:12px;', 'ghost q box'), /not under the shown q|off the shown q/);
      htmlPoison('a shown numeral shrunk to 14', (h) => mustReplace(h, /font-size:22px;line-height:1;color:#F2784B/, 'font-size:14px;line-height:1;color:#F2784B', 'shown box font'), /shown numeral/);
    }
    if (mode === 'line') {
      htmlPoison('P7a a printed hop on the line', (h) => mustReplace(h, /(<circle[^>]*data-lcs-mark="\d+"[^>]*\/>)/, '<path d="M 100 20 Q 120 0 140 20" fill="none" stroke="#F2784B" stroke-width="3" data-lcs-hop="x"/>$1', 'mark'), /printed hops/);
      htmlPoison('P7b the line shrunk to 130 px (a hop of 4 on 0..20 = 23.8 px)', (h) => mustReplace(h, /(<svg[^>]*data-lcs-prim="number-line"[^>]*)>/, '$1 style="width:130px;height:15px">', 'number line svg'), /hop .* px <|too small to draw|< 36/);
      htmlPoison('the mark stamped off n', (h) => { const v = item1(h); return mustReplace(h, `data-lcs-mark="${v.n}"`, `data-lcs-mark="${v.n - 1}"`, 'mark'); }, /mark sits at|mark .* for n/);
      htmlPoison('a tick label removed', (h) => mustReplace(h, /<text[^>]*data-lcs-ticklabel="5"[^>]*>5<\/text>/, '', 'label 5'), /tick labels|labels for/);
      itemsPoison('lineEnd below n + d', [{ n: 14, d: 3, lineEnd: 15 }, { n: 22, d: 4, lineEnd: 30 }, { n: 11, d: 2, lineEnd: 15 }], /lineEnd 15 < n \+ d|lineEnd 15 \(want/);
      itemsPoison('lineEnd not a multiple of 5', [{ n: 14, d: 3, lineEnd: 22 }, { n: 22, d: 4, lineEnd: 30 }, { n: 11, d: 2, lineEnd: 15 }], /multiple of 5/);
      itemsPoison('a constant landing', [{ n: 13, d: 3 }, { n: 21, d: 4 }, { n: 11, d: 2 }], /constant|landings take one value/);
      itemsPoison('an exact item on the line', [{ n: 12, d: 3 }, { n: 21, d: 4 }, { n: 11, d: 2 }], /exact division|outside 1/);
      htmlPoison('the air lane above the line removed', (h) => mustReplace(h, /padding-top:20px;line-height:0/, 'padding-top:0px;line-height:0', 'linewrap'), /air .* < 20/);
    }
  }
  return poisons;
}

async function main() {
  const seeds = +arg('seeds', QUICK ? 6 : 20);
  SEEDS = seeds;
  const THEME = arg('theme', 'animals');
  const THEME2 = THEME === 'fruits' ? 'toys' : 'fruits';
  const type = loadType('G3-377');
  const { validateBank } = loadBankModule();
  let assertions = 0;
  const failures = [];
  const note = (ok, msg) => { assertions++; if (!ok) failures.push(msg); };
  const bankAll = loadBank();
  fs.mkdirSync(OUT, { recursive: true });

  // ---- A
  const v = validateBank(bankAll);
  assertions += 60;
  failures.push(...v.fails.map((x) => 'A ' + x));
  console.log(`[A] bank: ${Object.keys(bankAll).join(',')} · ${v.fails.length} faults${v.notes.length ? ' · notes: ' + v.notes.join(' · ') : ''}`);
  const en = bankAll.en;
  note(en && en.strings['G3-377'].title === type.i18n.en.title && en.strings['G3-377'].instruction === type.i18n.en.instruction, 'A en: strings[G3-377] != the spec i18n.en (two sources)');
  for (const u of type.unitAxis.units()) { let ok = true; try { type.divisorsOf(u); } catch (e) { ok = false; } note(ok, `A unit ${u} does not parse`); }
  note(type.unitAxis.exemplar('en') === en.exemplar && type.unitAxis.units().includes(en.exemplar), 'A exemplar is not a declared unit');
  for (const [l, g] of Object.entries(DESIGN_SIGNS)) note(divGlyph(l) === g, `A notation.js divGlyph(${l}) = "${divGlyph(l)}", the design column says "${g}" — the ONE sign table drifted`);
  for (const s of [LONG_CHROME, WORST_CHROME, DEEP_CHROME]) { note([...s.title].length <= 70, 'probe title > 70: ' + s.title); note([...s.instruction].length <= 150, 'probe instruction > 150'); }
  for (const [l, nt] of Object.entries(SYNTH)) { const vb = validateBank({ [l]: synthBlock(l, nt) }); note(vb.fails.length === 0, `A synthetic ${l} block fails the validator: ${vb.fails.join(' | ')}`); }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    // ---- C
    const renders = [];
    for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: 'en', theme: THEME, baseName: `G3-377-d${d}-en`, tag: 'level' });
    renders.push({ difficulty: 2, locale: 'en', theme: THEME2, baseName: `G3-377-d2-en-${THEME2.replace(/\s+/g, '_')}`, tag: 'theme' });
    for (const u of type.unitAxis.units().filter((x) => x !== en.exemplar)) renders.push({ difficulty: 2, locale: 'en', theme: THEME, unit: u, baseName: `G3-377-d2-en-u${u}`, tag: 'unit' });
    for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: 'en', theme: THEME, strings: LONG_CHROME, pageSize: 'a4', baseName: `G3-377-d${d}-en-longchrome`, tag: 'long-chrome' });
    for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: 'en', theme: THEME, strings: WORST_CHROME, pageSize: 'a4', baseName: `G3-377-d${d}-en-worstchrome`, tag: 'worst-chrome' });
    for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: 'en', theme: THEME, strings: DEEP_CHROME, pageSize: 'a4', baseName: `G3-377-d${d}-en-deepchrome`, tag: 'deep-chrome' });
    for (const d of [1, 2, 3]) for (let s = 2; s <= seeds; s++) renders.push({ difficulty: d, locale: 'en', theme: THEME, seedEpoch: s, baseName: `G3-377-d${d}-en-seed${s}`, tag: 'seed' });
    for (const [l, nt] of Object.entries(SYNTH)) for (const d of [1, 2]) renders.push({ difficulty: d, locale: l, theme: THEME, pageSize: 'a4', strings: d === 1 ? WORST_CHROME : undefined, inj: { bank: synthBlock(l, nt) }, baseName: `G3-377-d${d}-${l}-synth`, tag: 'synth' });
    const pages = { 1: new Map(), 2: new Map(), 3: new Map() };
    for (const job of renders) {
      let r;
      try { r = await renderCheck(page, type, job.inj || null, job); } catch (e) { r = { thrown: e.message }; }
      note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
      if (r.thrown) { console.log(`[C] ${job.baseName}: THREW ${r.thrown}`); continue; }
      assertions += 14 * r.items.length;
      note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
      if (job.tag === 'seed' || job.tag === 'level') {
        const key = r.items.map((p) => `${p.n}/${p.d}@${p.noun}`).join(',');
        const prev = pages[job.difficulty].get(key);
        note(!prev, `${job.baseName}: identical page to ${prev}`);
        pages[job.difficulty].set(key, job.baseName);
      }
      if (job.tag !== 'seed') console.log(`[C] ${job.baseName}: body ${r.body} (${r.titleLines}-line title, ${r.insLines}-line instruction) ${r.style} ${r.unit} [${r.items.map((p) => `${p.n}÷${p.d}`).join(' ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
    }
    for (const d of [1, 2, 3]) console.log(`[C] d${d} sweep over ${seeds} seeds: ${pages[d].size} distinct pages`);
    // refusals (each must THROW with the specific reason)
    const refusals = [
      ['a BW theme (zoo animals bw)', { theme: 'zoo animals bw' }, /B&W/],
      ['a theme below the noun floor (emotions)', { theme: 'emotions' }, /countable nouns/],
      ['an unknown unit (3-4)', { theme: THEME, unit: '3-4' }, /unknown unit/],
      ['an unauthored locale (de: no bank block)', { theme: THEME, locale: 'de' }, /no de block/],
    ];
    for (const [name, job, want] of refusals) {
      let err = null;
      try { await renderCheck(page, type, null, { difficulty: 2, locale: job.locale || 'en', theme: job.theme, unit: job.unit, baseName: 'G3-377-refusal' }); } catch (e) { err = e.message; }
      note(err && want.test(err), `${name} was not refused (${err || 'rendered'})`);
      console.log(`[C] refusal ${name}: ${err ? 'refused (' + err.replace(/^.*?: /, '').slice(0, 90) + ')' : 'RENDERED'}`);
    }

    // ---- D. poisons (en; each must FAIL for its reason; control = the correct bank + page)
    const loc = 'en';
    const control = await renderCheck(page, type, null, { difficulty: 2, locale: loc, theme: THEME, baseName: 'G3-377-control' });
    note(control.fails.length === 0 && validateBank(bankAll).fails.length === 0, 'control (correct bank + page) did not pass: ' + control.fails.join(' | '));
    const poisons = [];
    const bankPoison = (name, all, want) => poisons.push({ name, run: async () => { const f = validateBank(all).fails; return f.some((x) => want.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    const htmlPoison = (name, post, want, job) => poisons.push({ name, run: async () => {
      const r = await renderCheck(page, type, (job && job.inj) || null, { difficulty: (job && job.difficulty) || 2, locale: (job && job.locale) || loc, theme: THEME, strings: job && job.strings, pageSize: job && job.pageSize, baseName: 'G3-377-poison-' + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 30).toLowerCase() }, { post });
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    const buildPoison = (name, run, want) => poisons.push({ name, run: async () => { try { await run(); return 'silent (rendered)'; } catch (e) { return want.test(e.message) ? null : 'wrong error: ' + e.message; } } });

    htmlPoison('P1 an item stamped r = d (23 : 4 = 4 R 4, remainder too big)', (h) => restamp(h, 0, (v) => ({ n: v.n, d: v.d, q: v.q - 1, r: v.r + v.d })), /remainder too big/);
    htmlPoison('P2 the quotient printed as text inside its item', (h) => {
      const m = /data-lcs-item="1" data-lcs-n="(\d+)" data-lcs-d="(\d+)" data-lcs-q="(\d+)"/.exec(h);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (item 1)');
      return mustReplace(h, /(<div data-lcs-line[^>]*>)/, `$1<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#3A3530">${m[3]}</span>`, 'line 1');
    }, /answer printed|prints the answer/);
    buildPoison('P3a sv bank with op ÷ (refused at build)', () => renderCheck(page, type, { bank: synthBlock('sv', { op: '÷', template: '{n} ÷ {d} = {q} rest {r}', remWord: 'rest' }) }, { difficulty: 2, locale: 'sv', theme: THEME, baseName: 'G3-377-poison-p3a' }), /division sign|refuse/);
    bankPoison('P3a-bank sv block with op ÷', { sv: synthBlock('sv', { op: '÷', template: '{n} ÷ {d} = {q} rest {r}', remWord: 'rest' }) }, /historic|must be/);
    htmlPoison('P3b an sv page whose sign was rewritten to ÷ (historic minus)', (h) => mustReplace(h, OP_SPAN('/'), '$1÷$2', 'sv op span'), /historic minus/, { locale: 'sv', inj: { bank: synthBlock('sv', SYNTH.sv) } });
    htmlPoison('P4 q one too big (n != q*d + r)', (h) => restamp(h, 0, (v) => ({ n: v.n, d: v.d, q: v.q + 1, r: v.r })), /!= floor|q\*d \+ r/);
    htmlPoison('P8 a [data-lcs-group] on the pile (pre-boxed)', (h) => mustReplace(h, /(<div class="ws-icon-row")/, '<span data-lcs-group="1"></span>$1', 'icon row'), /pre-boxed pile/);
    htmlPoison('P9 two cards with one (n, d)', (h) => {
      const m = /data-lcs-item="1" data-lcs-n="(\d+)" data-lcs-d="(\d+)" data-lcs-q="(\d+)" data-lcs-r="(\d+)"/.exec(h);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (item 1)');
      return restamp(h, 1, () => ({ n: +m[1], d: +m[2], q: +m[3], r: +m[4] }));
    }, /duplicate item/);
    buildPoison('P11a a zoo animals bw theme refused at build', () => renderCheck(page, type, null, { difficulty: 2, locale: loc, theme: 'zoo animals bw', baseName: 'G3-377-poison-p11a' }), /B&W/);
    htmlPoison('P11b a picture path rewritten into the bw directory', (h) => mustReplace(h, new RegExp(`(<img class="ws-icon" src="[^"]*?)/${encodeURIComponent(THEME).replace(/%20/g, '%20')}/`), '$1/zoo%20animals%20bw/', 'img src'), /B&W/);
    bankPoison('P12a a bare de head title (Teilen mit Rest)', (() => { const b = synthBlock('de', SYNTH.de); b.strings.F2.title = 'Teilen mit Rest'; return { de: b }; })(), /equals the family head/);
    bankPoison('P12b an sv instruction containing ÷', (() => { const b = synthBlock('sv', SYNTH.sv); b.strings.F2.instruction = 'Räkna 23 ÷ 4 och skriv resten.'; return { sv: b }; })(), /contains ÷/);
    bankPoison('P12c an fr product template without ×', { fr: synthBlock('fr', { op: null, template: '{n} = ({d} {q}) + {r}', remWord: '' }) }, /no × /);
    htmlPoison('P13 n above nMax (49 ÷ 2 at d2)', (h) => restamp(h, 0, () => ({ n: 49, d: 2, q: 24, r: 1 })), /above nMax|outside/);
    htmlPoison('an exact item (r = 0)', (h) => restamp(h, 0, (v) => ({ n: v.q * v.d, d: v.d, q: v.q, r: 0 })), /exact division|< 1/);
    htmlPoison('minR 0 stamped on the root', (h) => mustReplace(h, /data-lcs-minr="1"/, 'data-lcs-minr="0"', 'minr'), /minR 0/);
    bankPoison('the en bank with op ":" (bank)', (() => { const b = clone(bankAll); b.en.notation.op = ':'; b.en.notation.template = '{n} : {d} = {q} R{r}'; return b; })(), /disagrees with notation\.js/);
    buildPoison('the en bank with op ":" (build)', () => renderCheck(page, type, { bank: (() => { const b = clone(en); b.notation.op = ':'; b.notation.template = '{n} : {d} = {q} R{r}'; return b; })() }, { difficulty: 2, locale: loc, theme: THEME, baseName: 'G3-377-poison-opcolon' }), /division sign/);
    htmlPoison('a pile one picture short', (h) => { const it = itemSlice(h, 0); return h.replace(it, mustReplace(it, /<img class="ws-icon"[^>]*>/, '', 'first img')); }, /pile shows|pictures for n/);
    htmlPoison('pictures shrunk to 30', (h) => { const it = itemSlice(h, 0); return h.replace(it, it.replace(/width:36px;height:36px/g, 'width:30px;height:30px')); }, /< 36/);
    htmlPoison('the sign rewritten ÷ → : on an en page', (h) => mustReplace(h, OP_SPAN('÷'), '$1:$2', 'en op span'), /page sign|notation\.js says/);
    htmlPoison('the boxes swapped (r then q)', (h) => { const it = itemSlice(h, 0); const sw = mustReplace(it, 'data-lcs-role="q"', 'data-lcs-role="X"', 'q role').replace('data-lcs-role="r"', 'data-lcs-role="q"').replace('data-lcs-role="X"', 'data-lcs-role="r"'); return h.replace(it, sw); }, /want q then r|role/);
    htmlPoison('a box carrying text', (h) => mustReplace(h, /(data-lcs-role="q" style="[^"]*">)(<\/span>)/, '$17$2', 'q box'), /answer printed|carries/);
    htmlPoison('a third printed numeral (q)', (h) => {
      const m = /data-lcs-item="1" data-lcs-n="(\d+)" data-lcs-d="(\d+)" data-lcs-q="(\d+)"/.exec(h);
      return mustReplace(h, /(<div data-lcs-line[^>]*>)/, `$1<span data-lcs-num="${m[3]}" style="font-family:'Baloo 2';font-weight:700;font-size:26px">${m[3]}</span>`, 'line 1');
    }, /printed numerals|neither n nor d/);
    htmlPoison('an F1 deal row on the base', (h) => mustReplace(h, /(<div data-lcs-notation)/, '<span data-lcs-slot="1"></span>$1', 'zone'), /pre-boxed pile/);
    htmlPoison('a shown pair on the base', (h) => mustReplace(h, /(<div data-lcs-notation)/, '<span data-lcs-shown-q="9"></span>$1', 'zone'), /F4 only/);
    htmlPoison('alt text on a picture', (h) => mustReplace(h, /<img class="ws-icon" src="([^"]*)" alt=""/, '<img class="ws-icon" src="$1" alt="cat"', 'alt'), /alt text/);
    htmlPoison('n repeated across cards (different d)', (h) => {
      const m = /data-lcs-item="1" data-lcs-n="(\d+)" data-lcs-d="(\d+)"/.exec(h);
      const n = +m[1]; const d = +m[2] === 2 ? 3 : 2; const q = Math.floor(n / d); const r = n - q * d;
      if (r < 1) throw new Error('poison needs n with a remainder for the other d; seed unsuitable');
      return restamp(h, 1, () => ({ n, d, q, r }));
    }, /distinct-n rule|n repeats/);
    htmlPoison('a page of 3 cards', (h) => mustReplace(h, /<section class="ws-card" data-lcs-card="4">[\s\S]*?<\/section>/, '', 'card 4'), /items: 3|3 items/);
    htmlPoison('a blank page (non-vacuity)', (h) => h.replace(/<section class="ws-card"[\s\S]*?<\/section>/g, ''), /non-vacuity|items: 0|blank worksheet/);
    htmlPoison('the flat-760 stack under 3-line chrome', (h) => h.replace(/<section class="ws-card"/g, '<section class="ws-card" style="min-height:190px"'), /footer overlap|overflow|outside the body|outside the card/, { strings: WORST_CHROME, pageSize: 'a4' });
    htmlPoison('a 19-char remainder word overflowing the zone', (h) => mustReplace(h, /(<span data-lcs-word[^>]*>)R(<\/span>)/, '$1REMAINDER LEFT OVER$2', 'word span'), /overflow/);
    bankPoison('a 9-char remainder word (bank)', (() => { const b = clone(bankAll); b.en.notation.remWord = 'REMAINDER'; return b; })(), /> 8 chars/);
    htmlPoison('a casita r box carrying text', (h) => mustReplace(h, /(<rect[^>]*data-lcs-answer="" data-lcs-role="r")\/>/, '$1></rect><text x="40" y="66" font-family="\'Baloo 2\'" font-size="22" fill="#3A3530" text-anchor="middle" dominant-baseline="central">3</text>', 'casita r box'), /answer printed|prints the answer/, { locale: 'es', inj: { bank: synthBlock('es', SYNTH.es) } });
    buildPoison('an unknown unit (3-4) refused at build', () => renderCheck(page, type, null, { difficulty: 2, locale: loc, theme: THEME, unit: '3-4', baseName: 'G3-377-poison-unit' }), /unknown unit/);
    buildPoison('a theme below the noun floor refused', () => renderCheck(page, type, null, { difficulty: 2, locale: loc, theme: 'emotions', baseName: 'G3-377-poison-emotions' }), /countable nouns/);
    buildPoison('an unauthored locale refused (no bank block)', () => renderCheck(page, type, null, { difficulty: 2, locale: 'de', theme: THEME, baseName: 'G3-377-poison-de' }), /no de block/);
    buildPoison('a template with {q} twice refused', () => renderCheck(page, type, { bank: (() => { const b = clone(en); b.notation.template = '{n} ÷ {d} = {q} R{q}'; return b; })() }, { difficulty: 2, locale: loc, theme: THEME, baseName: 'G3-377-poison-tpl' }), /exactly once/);
    buildPoison('a config with minR 0 refused', () => renderCheck(page, type, { cfg: { ...type.difficulty[2], minR: 0 } }, { difficulty: 2, locale: loc, theme: THEME, baseName: 'G3-377-poison-minr' }), /minR must be/);
    buildPoison('a casita with remWord "residuo" refused (no room left of the r box)', () => renderCheck(page, type, { bank: synthBlock('pt', { op: '÷', template: '{n} ÷ {d} = {q} R{r}', boxStyle: 'casita', remWord: 'residuo' }) }, { difficulty: 2, locale: 'pt', theme: THEME, baseName: 'G3-377-poison-resto' }), /does not fit/);
    buildPoison('a d1 casita with remWord "resto" refused (184-px frame)', () => renderCheck(page, type, { bank: synthBlock('pt', { op: '÷', template: '{n} ÷ {d} = {q} R{r}', boxStyle: 'casita', remWord: 'resto' }) }, { difficulty: 1, locale: 'pt', theme: THEME, baseName: 'G3-377-poison-resto-d1' }), /does not fit/);
    buildPoison('a config with 30-px pictures refused', () => renderCheck(page, type, { cfg: { ...type.difficulty[2], iconPx: 30 } }, { difficulty: 2, locale: loc, theme: THEME, baseName: 'G3-377-poison-iconpx' }), /element floor/);

    // ---- E. the five faces (renders + refusals now; their poisons join the run below)
    const facePoisons = await facesSection(page, note, (k) => { assertions += k; }, THEME);
    poisons.push(...facePoisons);

    let killed = 0;
    for (const p of poisons) {
      let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
      const ok = res === null;
      if (ok) killed++;
      console.log(`[D] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
    }
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    const verdict = failures.length === 0;
    if (failures.length) console.log('FAILS:\n  ' + failures.join('\n  '));
    console.log(verdict ? `PASS (${assertions} assertions, ${killed}/${poisons.length} poisons killed)` : `FAIL (${assertions} assertions, ${failures.length} failures, poisons ${killed}/${poisons.length} killed)`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { LONG_CHROME, WORST_CHROME, DEEP_CHROME, SYNTH, synthBlock };
