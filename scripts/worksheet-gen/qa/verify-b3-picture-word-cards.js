#!/usr/bin/env node
/**
 * verify-b3-picture-word-cards.js — the K-324 `picture-word-cards` gate
 * (design file §5; brief deliverable 4). A MATERIALS SHEET has no answers,
 * so this is a STRUCTURAL gate over the DOM the real pipeline renders.
 *
 *   node scripts/worksheet-gen/qa/verify-b3-picture-word-cards.js [--quick]
 *
 * 1. BANK — every locale block of data/b3/picture-word-cards.js against the
 *    §5 validator rules: (1) cardCase enum, `keep` de only; (2) fi
 *    `articleStyle.enabled:false` REQUIRED, `dots` are codeColors keys with
 *    length === chips.length (chipsD3 at level 3), legend iff dots,
 *    elisionChip iff elision:'print' (fr only), level 3 only where chipsD3
 *    exists; (3) partnerExemplar another of the 11, partnerNames has the 10
 *    others; (4) syllable.mark enum, fi hyphen, da strictPool; (5) the 6
 *    (fi 5) {title, instruction} <= 70 / <= 150, no worksheet word, unique
 *    in the block AND the base title unique in the K band (loadAllTypes),
 *    `article` absent in fi; (6) no `{` and no `color:` in any literal;
 *    (7) exclude keys exist in the vocab. The spec's i18n.en === the bank's
 *    'K-324' strings.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): exemplar theme d1/d2/d3 + the long-word theme d2/d3 + a
 *    long-chrome d2 (70-char title wrapping to three lines + 150-char
 *    instruction = the 722 body). Asserts verify() empty, qa/lints.js clean,
 *    and ITSELF: `.ws-icon` >= tokens.density.K.minElement (56, measured —
 *    qa/lints.js has no size lint), the sheet 674 x 692 and the block 722
 *    (strip 30 + sheet) inside the body column above the footer, card count
 *    === cols x rows, every card === cellW x cellH (+-1), the overlay lines'
 *    endpoints on the card edges (+-1), every plate's px === the spec's
 *    plateFor() re-derived from the stamped word (the tier rule), every
 *    plate + line span scrollWidth <= clientWidth (the ONLY font measurement,
 *    in the real pipeline), exactly one scissors, one overlay.
 * 3. SWEEP — 20 seeds d2 (8 distinct words each, >= 2 distinct sets) and
 *    20 seeds d3 (never identity, multisets equal) (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON, no fail = SILENT; either exits 1). The correct
 *    EN bank is the control (0 findings, renders clean).
 *      P1  base card without its img                       → verify()
 *      P2  twin word card from another theme               → verify() multiset
 *      P3  theme `zoo animals bw`                           → the spec REFUSES (throw)
 *      P4  de `Wütend` capitalised (gender-null entry)     → verify() case rule
 *      P5  fi `articleStyle.enabled:true`                  → bank rule 2
 *      P10 nl `ambulanceverpleegkundige` forced through    → labelLines null + verify() overflow
 *      P11 one word on two base cards                      → verify() duplicate
 *      P12 twin in identity order                          → verify() identity
 *      P13 per-card dashed borders instead of the overlay  → verify() no overlay + border
 *      P14 overlay 1 px narrower than the sheet            → verify() overlay size
 *      P15 `padding:4`                                     → verify() padding + cut margin
 *      P16 a 760 block under three-line chrome             → qa/lints.js footer overlap
 *      P17 twin word 12 glyphs at 26                       → the gate's tier check
 *      P18 cream `.ws-cutcard`                             → verify() white background
 *      P6  de `die Hund` (article face)                    → the gate re-derives chips[keyFor(e)]
 *      P7  plural many-card with 2 clones                  → verify() picture count
 *      P8  bilingual partner line in the host language      → the gate re-derives vocab[key][unit]
 *      P9  syllable en `acorn` (rule-only boundary)         → the pool's texPool filter + the gate's TeX check
 *      P19 fr `l' arbre` with a space                        → verify() join rule
 *      P20 sv `blocks` on an article card                    → the pool's refuseKeys + the gate's stamp check
 * 5. FACES (Phase 2) — the five variation faces K-347 (twin, PARAM) · K-348
 *    (article) · K-349 (plural) · K-350 (bilingual, unitAxis) · G1-324
 *    (syllable) each render through the real pipeline at d2 en on the
 *    exemplar theme + the worst legal chrome; assertRender runs per kind
 *    (icons per card, tiers, widths, overlay); the gate RE-DERIVES from the
 *    stamps what verify() cannot see in the DOM: the article chip from
 *    ARTICLES[loc].keyFor, the plural label from the vocab, the partner line
 *    from vocab[key][unit], the syllable split + TeX agreement from the
 *    approved words; face strings === the bank's strings.<mode> (bilingual
 *    through its unit tokens); en pools per face over every colour theme +
 *    the per-locale refusal census over bank-shaped blocks (no en fallback).
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule, approvedByKey, texAgreed, daStrict } = require('../lib/b3-common.js');
const { vocab, entriesFor, countable } = require('../lib/b2-common.js');
const { resolveUnitTokens } = require('../lib/unit-axis.js');
const { loadAllTypes } = require('../lib/load-types.js');
const { ARTICLES } = require('../data/b2/articles.js');
const C3 = require('../templates/components-b3.js');
const tokens = require('../primitives/_tokens.js');

const TYPE = require('../types/k/K-324-picture-word-cards.js');
const FACE = {
  twin: require('../types/k/K-347-picture-word-cards-twin-set.js'),
  article: require('../types/k/K-348-picture-word-cards-article-cards.js'),
  plural: require('../types/k/K-349-picture-word-cards-one-and-many.js'),
  bilingual: require('../types/k/K-350-picture-word-cards-bilingual-cards.js'),
  syllable: require('../types/g1/G1-324-picture-word-cards-syllable-cards.js'),
};
const FACE_IDS = { twin: 'K-347', article: 'K-348', plural: 'K-349', bilingual: 'K-350', syllable: 'G1-324' };
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const MIN_ICON = tokens.density.K.minElement;   // 56
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const FACES = ['twin', 'article', 'plural', 'bilingual', 'syllable'];
const EXEMPLAR_THEME = 'animals';
const LONG_THEME = 'dinosaurs';
const STRIP_H = 30;
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä/i;
// The worst LEGAL chrome (README: a three-line title + the instruction cap):
// a 69-char fi title wraps to THREE lines at the ~375 px title column and a
// 148-char instruction to two (measured: every realistic 150-char instruction
// is two lines; only w/m-heavy nonsense reaches three) → body 733 px.
const LONG_STRINGS = {
  title: 'Kuvakortit leikattavaksi: sana ja kuva jokaisessa kortissa esikouluun',
  instruction: 'Leikkaa kortit irti katkoviivoja pitkin. Sano jokaisen kuvan nimi ääneen, lue sen alla oleva sana ja laita kortti pinoon muiden korttien kanssa.',
};
// A 69-char GERMAN title with long tokens wraps to FOUR lines (132 px) → body
// 700 px: the 722 block then reaches the attribution band by 22 px. This is
// outside the README ruling (three-line title) — the backstop render below
// proves qa/lints.js catches it at generation, so a panel title that wraps
// to four lines can never ship silently (the panels keep de titles <= 3 lines).
const FOUR_LINE_TITLE = 'Bildkarten zum Ausschneiden: Wort-Bild-Karten für den Wortschatz Kita';

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
const glyphs = (s) => [...String(s)].length;

/* ------------------------------------------------------------------ bank */
function validateBank(bank, loc, opts = {}) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  if (!bank || typeof bank !== 'object') { push('no block'); return f; }
  // (1)
  if (!['lower', 'keep', 'upper'].includes(bank.cardCase)) push(`cardCase "${bank.cardCase}" not in lower|keep|upper`);
  if (bank.cardCase === 'keep' && loc !== 'de') push('cardCase keep outside de');
  // (2)
  const a = bank.articleStyle || {};
  const art = ARTICLES[loc] || {};
  if (loc === 'fi') { if (a.enabled !== false) push('fi articleStyle.enabled must be false (no articles)'); }
  else {
    if (typeof a.enabled !== 'boolean') push('articleStyle.enabled must be boolean');
    if (![2, 3].includes(a.level)) push(`articleStyle.level ${a.level} not 2|3`);
    if (a.level === 3 && !Array.isArray(art.chipsD3)) push('articleStyle.level 3 where ARTICLES has no chipsD3');
    const chips = a.level === 3 ? art.chipsD3 : art.chips;
    if (a.dots != null) {
      if (!Array.isArray(a.dots)) push('articleStyle.dots must be an array or null');
      else {
        a.dots.forEach((d) => { if (!tokens.codeColors[d]) push(`articleStyle.dots "${d}" is not a codeColors key`); });
        if (chips && a.dots.length !== chips.length) push(`articleStyle.dots length ${a.dots.length} ≠ chips ${chips.length}`);
      }
      if (!a.legend) push('articleStyle.legend required when dots are set');
    } else if (a.legend) push('articleStyle.legend without dots');
    if (!['refuse', 'print'].includes(a.elision)) push(`articleStyle.elision "${a.elision}"`);
    if (a.elision === 'print') { if (loc !== 'fr') push('elision print outside fr'); if (!a.elisionChip) push('elision print without elisionChip'); }
    else if (a.elisionChip) push('elisionChip without elision print');
  }
  // (3)
  const b = bank.bilingual || {};
  if (!LOCALES.includes(b.partnerExemplar) || b.partnerExemplar === loc) push(`bilingual.partnerExemplar "${b.partnerExemplar}" is not another of the 11`);
  const others = LOCALES.filter((l) => l !== loc);
  if (typeof b.hostName !== 'string' || !b.hostName.trim()) push('bilingual.hostName missing (the legend prints hostName · partner)');
  const names = b.partnerNames || {};
  others.forEach((l) => { if (typeof names[l] !== 'string' || !names[l].trim()) push(`bilingual.partnerNames.${l} missing`); });
  Object.keys(names).forEach((l) => { if (!others.includes(l)) push(`bilingual.partnerNames.${l} is not a partner`); });
  // (4)
  const s = bank.syllable || {};
  if (!['arc', 'hyphen', 'colour'].includes(s.mark)) push(`syllable.mark "${s.mark}"`);
  if (loc === 'fi' && s.mark !== 'hyphen') push('fi syllable.mark must be hyphen');
  if (loc === 'da' && s.strictPool !== true) push('da syllable.strictPool must be true');
  if (s.exclude != null) {
    if (!Array.isArray(s.exclude)) push('syllable.exclude must be an array');
    else if (!opts.skipApproved) {
      let ap = null;
      try { ap = approvedByKey(loc); } catch (e) { ap = null; }
      s.exclude.forEach((k) => { if (ap && !ap.has(k)) push(`syllable.exclude "${k}" is not an approved word in ${loc}`); });
    }
  }
  if (!(bank.plural && bank.plural.clones === 3)) push('plural.clones must be 3');
  if (!(bank.twinLayout && bank.twinLayout.cols === 4 && bank.twinLayout.blockRows === 2)) push('twinLayout must be {cols:4, blockRows:2}');
  // (5)
  const strings = bank.strings || {};
  const keys = ['K-324', ...FACES.filter((x) => !(loc === 'fi' && x === 'article'))];
  if (loc === 'fi' && strings.article) push('fi must not carry article strings (F3 refused)');
  const titles = new Set();
  for (const k of keys) {
    const st = strings[k];
    if (!st || typeof st.title !== 'string' || typeof st.instruction !== 'string') { push(`strings.${k} missing {title, instruction}`); continue; }
    if (glyphs(st.title) > 70) push(`strings.${k}.title > 70`);
    if (glyphs(st.instruction) > 150) push(`strings.${k}.instruction > 150`);
    if (WORKSHEET_WORD.test(st.title)) push(`strings.${k}.title carries the worksheet word`);
    const t = st.title.toLocaleLowerCase(loc);
    if (titles.has(t)) push(`strings.${k}.title duplicates another face title`); titles.add(t);
  }
  // (6)
  const walk = (o, p) => { for (const [k, v] of Object.entries(o || {})) { if (typeof v === 'string') { if (v.includes('{')) push(`${p}.${k} carries "{"`); if (/color:/i.test(v)) push(`${p}.${k} carries "color:"`); } else if (v && typeof v === 'object') walk(v, p + '.' + k); } };
  walk(strings, 'strings'); walk({ legend: a.legend, elisionChip: a.elisionChip }, 'articleStyle'); walk(names, 'partnerNames'); walk({ hostName: b.hostName }, 'bilingual');
  // (7)
  const V = opts.vocab || vocab();
  (bank.exclude || []).forEach((k) => { if (!V[k]) push(`exclude key "${k}" is not in the vocab`); });
  return f;
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { theme, difficulty, baseName, seedEpoch, strings, locale, unit }) {
  const out = await renderInstance({ type, theme, difficulty, locale: locale || 'en', page, outDir: OUT, baseName, seedEpoch, strings, unit: unit || null });
  const m = await page.evaluate(() => {
    const sheet = document.querySelector('[data-lcs-sheet]');
    const grid = sheet && sheet.querySelector('[data-lcs-grid]');
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }; };
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const cards = [...document.querySelectorAll('[data-lcs-card]')].map((c) => {
      const p = c.querySelector('.ws-wordplate');
      const lines = p ? [...p.querySelectorAll('[data-lcs-line]')] : [];
      const dot = p && p.querySelector('[data-lcs-dot]');
      const pl = c.querySelector('[data-lcs-partner-line]');
      const sw = c.querySelector('[data-lcs-prim="syllable-word"]');
      return { ...rect(c), word: c.dataset.lcsWord || null, vocab: c.dataset.lcsVocab, twin: c.dataset.lcsTwin || null, px: p ? +p.dataset.lcsPx : null, lines: lines.map((l) => l.textContent), plateRect: p ? rect(p) : null,
        overflow: p ? [p, ...lines].some((el) => el.scrollWidth > el.clientWidth + 0.5) : false, icon: (() => { const i = c.querySelector('img'); return i ? Math.min(i.offsetWidth, i.offsetHeight) : null; })(),
        imgs: c.querySelectorAll('img').length, kind: c.dataset.lcsCard, role: c.dataset.lcsRole || null,
        chip: c.dataset.lcsChip || null, base: c.dataset.lcsBase || null, dot: dot ? dot.dataset.lcsDot : null,
        partner: c.dataset.lcsPartnerWord || null, partnerText: pl ? pl.textContent : null, partnerOverflow: pl ? pl.scrollWidth > pl.clientWidth + 0.5 : false,
        split: c.dataset.lcsSplit || null, count: c.dataset.lcsCount ? +c.dataset.lcsCount : null, cellsW: sw ? rect(sw).width : null,
        stackRect: (() => { const st = c.querySelector('[data-lcs-syllable-stack]'); return st ? rect(st) : null; })() };
    });
    const legendEl = sheet && sheet.querySelector('[data-lcs-legend]');
    const ov = grid && grid.querySelector('[data-lcs-cutlines]');
    const cuts = ov ? [...ov.querySelectorAll('[data-lcs-cut-v], [data-lcs-cut-h]')].map((l) => ({ v: l.dataset.lcsCutV, h: l.dataset.lcsCutH, x1: +l.getAttribute('x1'), x2: +l.getAttribute('x2'), y1: +l.getAttribute('y1'), y2: +l.getAttribute('y2'), stroke: l.getAttribute('stroke'), dash: l.getAttribute('stroke-dasharray') })) : [];
    const frame = ov && ov.querySelector('[data-lcs-cut-frame]');
    return {
      stamps: sheet ? { ...sheet.dataset } : null, sheet: sheet ? rect(sheet) : null, grid: grid ? rect(grid) : null, overlay: ov ? rect(ov) : null, cuts,
      frame: frame ? { stroke: frame.getAttribute('stroke'), dash: frame.getAttribute('stroke-dasharray') } : null,
      scissors: document.querySelectorAll('[data-lcs-scissors]').length, cards,
      legend: legendEl ? { text: legendEl.textContent, dots: [...legendEl.querySelectorAll('[data-lcs-legend-dot]')].map((d) => d.dataset.lcsLegendDot) } : null,
      body: { left: body.left, right: body.right, top: body.top, bottom: body.bottom, height: body.height },
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
      titleLines: Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33),
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

function assertRender(name, r, d, opts = {}) {
  const type = opts.type || TYPE;
  const cfg = type.difficulty[d];
  const m = r.m;
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  if (!m.sheet || !m.grid) { ok(false, `${name}: no sheet`); return; }
  ok(Math.abs(m.grid.width - TYPE.SHEET_W) < 0.6 && Math.abs(m.grid.height - TYPE.SHEET_H) < 0.6, `${name}: sheet ${m.grid.width}x${m.grid.height} ≠ ${TYPE.SHEET_W}x${TYPE.SHEET_H}`);
  ok(Math.abs(m.sheet.height - (TYPE.SHEET_H + STRIP_H)) < 0.6, `${name}: block ${m.sheet.height} ≠ ${TYPE.SHEET_H + STRIP_H}`);
  ok(m.sheet.left >= m.body.left - 0.6 && m.sheet.right <= m.body.right + 0.6, `${name}: block outside the body column`);
  ok(m.sheet.top >= m.body.top - 0.6 && m.sheet.bottom <= m.foot - 0.6, `${name}: block ${Math.round(m.sheet.top)}..${Math.round(m.sheet.bottom)} outside the body ${Math.round(m.body.top)}..footer ${Math.round(m.foot)}`);
  ok(m.stamps.lcsSheet === cfg.kind && +m.stamps.lcsCols === cfg.cols && +m.stamps.lcsRows === cfg.rows, `${name}: stamps ${JSON.stringify(m.stamps)} ≠ config`);
  const want = cfg.cols * cfg.rows;
  ok(m.cards.length === want, `${name}: ${m.cards.length} cards ≠ ${want}`);
  const cellW = TYPE.SHEET_W / cfg.cols, cellH = TYPE.SHEET_H / cfg.rows;
  m.cards.forEach((c, i) => ok(Math.abs(c.width - cellW) <= 1 && Math.abs(c.height - cellH) <= 1, `${name}: card ${i + 1} ${c.width}x${c.height} ≠ cell ${cellW}x${cellH}`));
  ok(m.scissors === 1, `${name}: ${m.scissors} scissors`);
  ok(!!m.overlay && Math.abs(m.overlay.width - m.grid.width) < 0.6 && Math.abs(m.overlay.height - m.grid.height) < 0.6, `${name}: overlay ≠ sheet`);
  ok(!!m.frame && m.frame.stroke === tokens.color.grid && !!m.frame.dash, `${name}: frame stroke ${m.frame && m.frame.stroke} / dash ${m.frame && m.frame.dash}`);
  ok(m.cuts.length === cfg.cols - 1 + cfg.rows - 1, `${name}: ${m.cuts.length} cut lines ≠ ${cfg.cols - 1 + cfg.rows - 1}`);
  // overlay endpoints on the card edges (the overlay vs cells drift risk)
  for (const cut of m.cuts) {
    ok(cut.stroke === tokens.color.grid && !!cut.dash, `${name}: cut ${cut.v ? 'v' + cut.v : 'h' + cut.h} stroke ${cut.stroke} dash ${cut.dash}`);
    if (cut.v) {
      const x = m.grid.left + cut.x1;
      const edges = m.cards.filter((c) => Math.abs(c.left - x) <= 1 || Math.abs(c.right - x) <= 1);
      ok(edges.length === 2 * cfg.rows && Math.abs(cut.y2 - cut.y1 - m.grid.height) < 0.6, `${name}: vertical cut ${cut.v} at ${cut.x1} touches ${edges.length} card edges`);
    } else {
      const y = m.grid.top + cut.y1;
      const edges = m.cards.filter((c) => Math.abs(c.top - y) <= 1 || Math.abs(c.bottom - y) <= 1);
      ok(edges.length === 2 * cfg.cols && Math.abs(cut.x2 - cut.x1 - m.grid.width) < 0.6, `${name}: horizontal cut ${cut.h} at ${cut.y1} touches ${edges.length} card edges`);
    }
  }
  // K floor + tiers + width, from the stamps
  let minIcon = Infinity;
  m.cards.forEach((c, i) => {
    if (c.icon != null) minIcon = Math.min(minIcon, c.icon);
    if (cfg.kind === 'syllable') {
      // no tier rule: the arc card has letter cells (verify() checks them), the hyphen card one 26 px line
      const wantPic = m.stamps.lcsMark === 'hyphen' ? (cfg.hyphenPic || cfg.pic) : cfg.pic;
      ok(c.icon === wantPic, `${name}: card ${i + 1} picture ${c.icon} ≠ ${wantPic}`);
      if (c.stackRect) ok(c.stackRect.width <= cellW - 2 * cfg.pad + 0.6 && c.stackRect.bottom <= c.bottom - cfg.pad + 0.6, `${name}: card ${i + 1} syllable stack ${Math.round(c.stackRect.width)} wide / bottom ${Math.round(c.stackRect.bottom)} vs card ${Math.round(c.bottom - cfg.pad)}`);
      if (c.px != null) { ok(c.px === 26 && !c.overflow, `${name}: card ${i + 1} hyphen plate at ${c.px} px / overflow ${c.overflow}`); }
      return;
    }
    if (c.word != null) {
      const lines = C3.labelLines(c.word, { cap: cfg.cap, lineCap: cfg.lineCap, maxLines: cfg.maxLines });
      ok(!!lines && JSON.stringify(lines) === JSON.stringify(c.lines), `${name}: card ${i + 1} lines ${JSON.stringify(c.lines)} ≠ labelLines ${JSON.stringify(lines)}`);
      if (lines) {
        const p = TYPE.plateFor(lines, cfg);
        ok(c.px === p.px, `${name}: card ${i + 1} "${c.word}" at ${c.px} px, the tier rule says ${p.px}`);
        if (c.icon != null) ok(c.icon === p.pic, `${name}: card ${i + 1} picture ${c.icon} ≠ ${p.pic}`);
      }
      ok(!c.overflow, `${name}: card ${i + 1} "${c.word}" overflows its plate`);
      ok(c.plateRect.width <= cellW - 2 * cfg.pad + 0.6, `${name}: card ${i + 1} plate ${c.plateRect.width} wider than the inner cell`);
    }
  });
  const icons = m.cards.filter((c) => c.icon != null).length;
  ok(icons === (cfg.kind === 'twin' ? cfg.cards : want), `${name}: ${icons} pictures`);
  const totalImgs = m.cards.reduce((n, c) => n + c.imgs, 0);
  const wantImgs = cfg.kind === 'twin' ? cfg.cards : cfg.kind === 'plural' ? cfg.cards * (1 + (m.stamps.lcsClones ? +m.stamps.lcsClones : 3)) : want;
  ok(totalImgs === wantImgs, `${name}: ${totalImgs} pictures in total ≠ ${wantImgs}`);
  if (cfg.kind === 'bilingual') m.cards.forEach((c, i) => { ok(!!c.partner && c.partnerText === c.partner && !c.partnerOverflow, `${name}: card ${i + 1} partner "${c.partnerText}" (stamp "${c.partner}", overflow ${c.partnerOverflow})`); });
  const floor = type.gradeBand === 'G1' ? tokens.density.G1.minElement : MIN_ICON;
  ok(minIcon >= floor, `${name}: picture ${minIcon} px < ${type.gradeBand} floor ${floor}`);
  if (opts.longChrome) ok(m.titleLines >= 3, `${name}: title wrapped to ${m.titleLines} lines (want 3)`);
  return minIcon;
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
const EN = () => bankModule('picture-word-cards').en;
function typeWith(bank, patch, extra = {}) {
  return Object.assign({}, TYPE, extra, { build(args, ctx) { const out = TYPE._buildWith(bank, args, ctx); return patch ? patch(out) : out; } });
}
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
/** run assertRender on a poison without counting its findings against the control */
function gateFindings(name, r, d, type) {
  const before = fails.length, saved = assertions;
  assertRender(name, r, d, { type: type || TYPE });
  const found = fails.splice(before);
  assertions = saved;
  return found;
}
const SECTION_RE = /<section class="ws-cutcard"[\s\S]*?<\/section>/g;

/**
 * A bank block SHAPED for another locale (the panels' data is not authored
 * yet): the en block with the locale's articleStyle (de dots + legend, it
 * level 3, fi refused), bilingual (exemplar en, names placeholders),
 * syllable (fi hyphen, da strict). Used for the refusal census + the
 * locale-bound poisons; NEVER a fallback in the pipeline (bank() refuses).
 */
function shaped(loc, patch = {}) {
  const b = clone(EN());
  b.cardCase = loc === 'de' ? 'keep' : 'lower';
  b.articleStyle = loc === 'fi' ? { enabled: false }
    : { enabled: true, level: loc === 'it' ? 3 : 2, dots: loc === 'de' ? ['codeBlue', 'codeRed', 'codeGreen'] : null, elision: 'refuse', elisionChip: null, legend: loc === 'de' ? 'der = blau · die = rot · das = grün' : null };
  const names = {};
  LOCALES.filter((l) => l !== loc).forEach((l) => { names[l] = l.toUpperCase(); });
  b.bilingual = { partnerExemplar: loc === 'en' ? 'es' : 'en', hostName: loc.toUpperCase(), partnerNames: names, legendSep: ' · ' };
  b.syllable = { enabled: true, mark: loc === 'fi' ? 'hyphen' : 'arc', hyphen: '-', strictPool: loc === 'da', exclude: loc === 'en' ? ['seagull'] : [] };
  if (loc === 'fi') delete b.strings.article;
  return Object.assign(b, patch);
}
/** A face spec over an injected bank (+ an html patch) — the face's own difficulty, the base's _buildWith. */
function faceWith(mode, bank, patch) {
  const F = FACE[mode];
  return Object.assign({}, F, { build(args, ctx) { const out = F._buildWith(bank, args, ctx); return patch ? patch(out) : out; } });
}
const lowerIn = (loc) => (w) => String(w).toLocaleLowerCase(loc);

/**
 * What verify() cannot see in the DOM, re-derived in node from the stamps:
 * the article chip from ARTICLES[loc].keyFor (+ refuseKeys, dots, legend),
 * the plural label from the vocab, the partner line from vocab[key][unit],
 * the syllable split / count / TeX agreement / da strict from the approved
 * words. Returns findings (the caller counts or judges them).
 */
function rederive(mode, type, r, bank, loc) {
  const f = [];
  const cfg = type.difficulty[2];
  const theme = r.meta.theme;
  const exclude = new Set(bank.exclude || []);
  const cards = r.m.cards;
  if (mode === 'article') {
    const { pool, dots, chips } = TYPE._articlePool(bank, theme, loc, bank.cardCase, exclude);
    const refuse = new Set((ARTICLES[loc].refuseKeys || []).map((k) => String(k).toLowerCase()));
    cards.forEach((c, i) => {
      if (refuse.has(String(c.vocab).toLowerCase())) f.push(`card ${i + 1}: ${c.vocab} is a refused key for ${loc}`);
      const e = pool.find((x) => x.vocabKey === c.vocab);
      if (!e) { f.push(`card ${i + 1}: ${c.vocab} is not an eligible article entry for ${loc}`); return; }
      if (c.chip !== e.chip) f.push(`card ${i + 1}: chip ${c.chip} ≠ ${e.chip} (${c.vocab})`);
      if (c.word !== e.word) f.push(`card ${i + 1}: label "${c.word}" ≠ "${e.word}"`);
      const wantDot = dots && e.key >= 0 ? dots[e.key] : null;
      if ((c.dot || null) !== wantDot) f.push(`card ${i + 1}: dot ${c.dot} ≠ ${wantDot}`);
      if (!chips.includes(c.chip) && c.chip !== (bank.articleStyle || {}).elisionChip) f.push(`card ${i + 1}: chip "${c.chip}" is not one of ${chips.join('/')}`);
    });
    if (dots) { if (!r.m.legend || r.m.legend.dots.join(',') !== dots.join(',')) f.push(`legend dots ${r.m.legend && r.m.legend.dots} ≠ ${dots}`); }
    else if (r.m.legend) f.push('a legend without dots');
  } else if (mode === 'plural') {
    const { pool } = TYPE._pluralPool(bank, cfg, theme, loc, bank.cardCase, exclude);
    cards.forEach((c, i) => {
      const e = pool.find((x) => x.vocabKey === c.vocab);
      if (!e) { f.push(`card ${i + 1}: ${c.vocab} is not a countable entry for ${loc}`); return; }
      const want = c.role === 'many' ? e.plural_ : e.word;
      if (c.word !== want) f.push(`card ${i + 1}: ${c.role} label "${c.word}" ≠ vocab "${want}"`);
    });
  } else if (mode === 'bilingual') {
    const unit = r.m.stamps.lcsPartner;
    if (!LOCALES.includes(unit) || unit === loc) f.push(`partner stamp ${unit}`);
    cards.forEach((c, i) => {
      const want = TYPE._partnerLabel({ vocabKey: c.vocab }, unit);
      if (c.partner !== want) f.push(`card ${i + 1}: partner "${c.partner}" ≠ vocab ${unit} "${want}"`);
      if (c.partnerText !== want) f.push(`card ${i + 1}: partner line "${c.partnerText}" ≠ vocab ${unit} "${want}"`);
      if (glyphs(c.partner || '') > cfg.partnerCap) f.push(`card ${i + 1}: partner ${glyphs(c.partner)} glyphs > ${cfg.partnerCap}`);
    });
  } else if (mode === 'syllable') {
    const ap = approvedByKey(loc);
    const lower = lowerIn(loc);
    const sexcl = new Set(((bank.syllable || {}).exclude) || []);
    cards.forEach((c, i) => {
      const a = ap.get(c.vocab);
      if (!a) { f.push(`card ${i + 1}: ${c.vocab} is not an approved word in ${loc}`); return; }
      if (cfg.pool === 'tex' && !texAgreed(a)) f.push(`card ${i + 1}: ${c.vocab} is not TeX-agreed (${a.split.join('-')})`);
      if (c.split !== a.split.map(lower).join('|')) f.push(`card ${i + 1}: split ${c.split} ≠ approved ${a.split.join('|')}`);
      if (!(a.count >= cfg.minCount && a.count <= cfg.maxCount)) f.push(`card ${i + 1}: ${c.vocab} has ${a.count} syllables (${cfg.minCount}..${cfg.maxCount})`);
      if (glyphs(c.word) > cfg.maxLetters) f.push(`card ${i + 1}: ${c.word} > ${cfg.maxLetters} letters`);
      if ((loc === 'da' || (bank.syllable || {}).strictPool === true) && !daStrict(a)) f.push(`card ${i + 1}: ${c.vocab} is outside the strict pool`);
      if (sexcl.has(c.vocab)) f.push(`card ${i + 1}: ${c.vocab} is excluded by the bank`);
    });
  }
  return f;
}

/** The eligible pool size of a face on (theme, loc) over a bank block; -1 = the face refuses the locale/theme by rule. */
function poolSize(mode, bank, theme, loc) {
  const cfg = FACE[mode].difficulty[2];
  const exclude = new Set(bank.exclude || []);
  try {
    if (mode === 'twin') {
      const pool = entriesFor(theme, loc).map((e) => TYPE.labelFor(e, loc, bank.cardCase)).filter((w) => C3.labelLines(w, { cap: cfg.cap, lineCap: cfg.lineCap, maxLines: cfg.maxLines }));
      return new Set(pool).size;
    }
    if (mode === 'article') return TYPE._articlePool(bank, theme, loc, bank.cardCase, exclude).pool.filter((e) => C3.labelLines(e.word, { cap: cfg.cap, lineCap: cfg.lineCap, maxLines: cfg.maxLines })).length;
    if (mode === 'plural') return TYPE._pluralPool(bank, cfg, theme, loc, bank.cardCase, exclude).pool.length;
    if (mode === 'bilingual') return TYPE._bilingualPool(bank, cfg, theme, loc, bank.cardCase, exclude, bank.bilingual.partnerExemplar).pool.length;
    if (mode === 'syllable') return TYPE._syllablePool(bank, cfg, theme, loc, bank.cardCase, exclude).pool.length;
  } catch (e) { if (/REFUSED/.test(e.message)) return -1; throw e; }
  throw new Error('poolSize: ' + mode);
}

async function main() {
  const banks = bankModule('picture-word-cards');
  // 1. bank (control)
  for (const loc of Object.keys(banks)) {
    const f = validateBank(banks[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`bank ${loc}: cardCase ${banks[loc].cardCase}, faces ${Object.keys(banks[loc].strings).join(' ')}`);
  }
  const en = banks.en;
  ok(TYPE.i18n.en.title === en.strings['K-324'].title && TYPE.i18n.en.instruction === en.strings['K-324'].instruction, 'spec i18n.en ≠ bank strings K-324');
  const kTitles = loadAllTypes().filter((t) => t.id.startsWith('K-') && t.id !== 'K-324').map((t) => t.i18n.en.title.toLowerCase());
  ok(!kTitles.includes(TYPE.i18n.en.title.toLowerCase()), 'base title not unique in the K band');
  // pools: every colour theme >= 8 in en under the base rule (measured, not assumed)
  {
    const m = require('../image-cache/resolve.js').manifest();
    const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
    const themes = Object.keys(m.themes).filter((t) => !BW.test(t));
    const short = [];
    for (const t of themes) {
      const pool = entriesFor(t, 'en').map((e) => TYPE.labelFor(e, 'en', en.cardCase)).filter((w) => C3.labelLines(w, { cap: 20, lineCap: 16, maxLines: 2 }));
      if (new Set(pool).size < 8) short.push(t + ':' + new Set(pool).size);
    }
    ok(short.length === 0, `en themes below 8 under the base rule: ${short.join(' ')}`);
    console.log(`pools: ${themes.length} colour themes, ${themes.length - short.length} >= 8 in en`);
  }

  // 2. renders through the real pipeline
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { theme: EXEMPLAR_THEME, difficulty: d, baseName: `K-324-gate-${EXEMPLAR_THEME}-d${d}-en` });
      const mi = assertRender(`d${d} ${EXEMPLAR_THEME}`, r, d);
      pngs.push(r.png);
      console.log(`render d${d} ${EXEMPLAR_THEME}: verify ${r.verify.length} lints ${r.lints.length} icons>=${mi} cards ${r.m.cards.length} block ${Math.round(r.m.sheet.height)} body ${Math.round(r.m.body.height)}`);
    }
    for (const d of [2, 3]) {
      const r = await renderWith(page, TYPE, { theme: LONG_THEME, difficulty: d, baseName: `K-324-gate-${LONG_THEME}-d${d}-en` });
      const mi = assertRender(`d${d} ${LONG_THEME}`, r, d);
      pngs.push(r.png);
      console.log(`render d${d} ${LONG_THEME}: verify ${r.verify.length} lints ${r.lints.length} icons>=${mi} words ${r.meta.words.join(' ')}`);
    }
    // the long-chrome test: the 722 body (three-line title + three-line instruction)
    {
      const r = await renderWith(page, TYPE, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-d2-en-longchrome', strings: LONG_STRINGS });
      assertRender('d2 long chrome', r, 2, { longChrome: true });
      pngs.push(r.png);
      console.log(`render d2 long chrome (title ${glyphs(LONG_STRINGS.title)} / ${r.m.titleLines} lines, instruction ${glyphs(LONG_STRINGS.instruction)}): verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.height)} px, block bottom ${Math.round(r.m.sheet.bottom)} vs footer ${Math.round(r.m.foot)}`);
      // the four-line-title backstop: the lint MUST fire (a silent pass here would mean a 4-line panel title ships over the footer)
      const r4 = await renderWith(page, TYPE, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-d2-en-fourlinetitle', strings: { ...LONG_STRINGS, title: FOUR_LINE_TITLE } });
      ok(r4.m.titleLines === 4, `four-line backstop: the de title wrapped to ${r4.m.titleLines} lines, not 4 (re-measure the title column)`);
      ok(r4.lints.some((x) => /footer overlap/.test(x)), `four-line backstop: qa/lints.js did NOT catch the 722 block under a 4-line title (body ${Math.round(r4.m.body.height)})`);
      console.log(`render d2 four-line title (backstop, ${glyphs(FOUR_LINE_TITLE)} chars / ${r4.m.titleLines} lines): body ${Math.round(r4.m.body.height)} px, block bottom ${Math.round(r4.m.sheet.bottom)} vs footer ${Math.round(r4.m.foot)} → lint ${r4.lints.length ? 'FIRES (' + r4.lints[0] + ')' : 'SILENT'}`);
    }
    // refusals are throws, never fillers
    {
      let msg = '';
      try { TYPE._buildWith(en, { theme: 'post office', difficulty: 3, locale: 'en' }, { rng: makeRng('x') }); } catch (e) { msg = e.message; }
      // post office has exactly 8 en labels; the twin's 13-cap keeps them all → must build; a 9-card demand must throw
      ok(msg === '', `post office d3 must build (8 = 8): ${msg}`);
      const nine = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 9: { ...TYPE.difficulty[2], cards: 9, rows: 4.5 } } });
      try { nine._buildWith(en, { theme: 'post office', difficulty: 9, locale: 'en' }, { rng: makeRng('x') }); msg = ''; } catch (e) { msg = e.message; }
      ok(/only 8 eligible nouns, need 9/.test(msg), `a short pool must REFUSE (throw): ${msg}`);
      try { TYPE._buildWith(en, { theme: null, difficulty: 2, locale: 'en' }, { rng: makeRng('x') }); msg = ''; } catch (e) { msg = e.message; }
      ok(/theme is required/.test(msg), `a themeless build must refuse: ${msg}`);
      try { TYPE.build({ theme: EXEMPLAR_THEME, difficulty: 2, locale: 'xx' }, { rng: makeRng('x') }); msg = ''; } catch (e) { msg = e.message; }
      ok(/no xx block/.test(msg), `an unauthored locale must REFUSE (throw), never fall back to en: ${msg}`);
    }

    // 3. seed sweep (build only, no browser)
    if (!QUICK) {
      const sets = new Set();
      for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: 'K-324', theme: EXEMPLAR_THEME, difficulty: 2, seedEpoch: k }));
        const b = TYPE.build({ theme: EXEMPLAR_THEME, difficulty: 2, locale: 'en' }, { rng });
        ok(new Set(b.meta.words).size === 8 && b.meta.words.length === 8, `sweep d2 seed ${k}: ${b.meta.words.length} words / ${new Set(b.meta.words).size} distinct`);
        sets.add(b.meta.words.slice().sort().join(','));
      }
      ok(sets.size >= 2, `sweep d2: only ${sets.size} distinct word sets over 20 seeds`);
      let identity = 0;
      for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: 'K-324', theme: EXEMPLAR_THEME, difficulty: 3, seedEpoch: k }));
        const b = TYPE.build({ theme: EXEMPLAR_THEME, difficulty: 3, locale: 'en' }, { rng });
        if (b.meta.order.some((v, i) => v === i)) identity++;
        ok(b.meta.order.slice().sort((a, c) => a - c).join(',') === '0,1,2,3,4,5,6,7', `sweep d3 seed ${k}: order ${b.meta.order} is not a permutation`);
      }
      ok(identity === 0, `sweep d3: ${identity} of 20 seeds leave a word at its picture slot`);
      console.log(`sweep: d2 ${sets.size} distinct word sets, d3 0/20 identity slots`);
    }

    // 5. FACES — through the real pipeline, per kind, + node re-derivations
    const colourThemes = Object.keys(require('../image-cache/resolve.js').manifest().themes).filter((t) => !/\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i.test(t));
    for (const mode of FACES) {
      const t = FACE[mode];
      ok(t.id === FACE_IDS[mode], `${mode}: id ${t.id} ≠ ${FACE_IDS[mode]}`);
      const want = en.strings[mode];
      const got = resolveUnitTokens(t.i18n.en, t, null, 'en');
      ok(!!want && got.title === want.title && got.instruction === want.instruction, `${t.id}: spec i18n.en ≠ bank strings.${mode} ("${got.title}" vs "${want && want.title}")`);
      ok(glyphs(got.title) <= 70 && glyphs(got.instruction) <= 150 && !WORKSHEET_WORD.test(got.title), `${t.id}: title/instruction outside the caps`);
      ok(t.difficulty[2].kind === (mode === 'twin' ? 'twin' : mode), `${t.id}: kind ${t.difficulty[2].kind}`);
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: `${t.id}-gate-${EXEMPLAR_THEME}-d2-en` });
      const mi = assertRender(`${t.id} d2 ${EXEMPLAR_THEME}`, r, 2, { type: t });
      const rd = rederive(mode, t, r, en, 'en');
      ok(rd.length === 0, `${t.id} re-derive: ${JSON.stringify(rd)}`);
      pngs.push(r.png);
      const rl = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: `${t.id}-gate-d2-en-longchrome`, strings: LONG_STRINGS });
      assertRender(`${t.id} long chrome`, rl, 2, { type: t, longChrome: true });
      const words = mode === 'syllable' ? r.meta.words.map((w, i) => r.meta.splits[i].join('-')) : mode === 'bilingual' ? r.meta.words.map((w, i) => w + '/' + r.meta.partners[i]) : mode === 'plural' ? r.meta.words.map((w, i) => w + '/' + r.meta.plurals[i]) : r.meta.words;
      console.log(`render ${t.id} ${mode} d2 ${EXEMPLAR_THEME}: verify ${r.verify.length} lints ${r.lints.length} icons>=${mi} cards ${r.m.cards.length} block ${Math.round(r.m.sheet.height)} body ${Math.round(r.m.body.height)} | long chrome body ${Math.round(rl.m.body.height)} bottom ${Math.round(rl.m.sheet.bottom)} vs footer ${Math.round(rl.m.foot)} | ${words.join(' ')}`);
    }
    // bilingual with a configured unit (the fan): partner de keeps its noun capital
    {
      const r = await renderWith(page, FACE.bilingual, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-350-gate-animals-d2-en-ude', unit: 'de' });
      assertRender('K-350 unit de', r, 2, { type: FACE.bilingual });
      const rd = rederive('bilingual', FACE.bilingual, r, en, 'en');
      ok(rd.length === 0 && r.m.stamps.lcsPartner === 'de', `K-350 unit de: ${JSON.stringify(rd)} partner ${r.m.stamps.lcsPartner}`);
      ok(r.m.cards.every((c) => /^\p{Lu}/u.test(c.partner)), `K-350 unit de: a German noun without its capital: ${r.m.cards.map((c) => c.partner).join(' ')}`);
      ok(/English/.test(r.m.legend.text) && /German/.test(r.m.legend.text), `K-350 unit de legend "${r.m.legend.text}"`);
      pngs.push(r.png);
      console.log(`render K-350 unit de: verify ${r.verify.length} lints ${r.lints.length} legend "${r.m.legend.text}" | ${r.m.cards.map((c) => c.word + '/' + c.partner).join(' ')}`);
      let msg = '';
      try { FACE.bilingual.build({ theme: EXEMPLAR_THEME, difficulty: 2, locale: 'en', unit: 'en' }, { rng: makeRng('x') }); } catch (e) { msg = e.message; }
      ok(/partner en is the host language/.test(msg), `a host-language partner must refuse: ${msg}`);
      try { FACE.bilingual.build({ theme: EXEMPLAR_THEME, difficulty: 2, locale: 'en', unit: 'xx' }, { rng: makeRng('x') }); msg = ''; } catch (e) { msg = e.message; }
      ok(/not one of the 11 locales/.test(msg), `an unknown partner must refuse: ${msg}`);
      ok(FACE.bilingual.unitAxis.exemplar('en') === 'es' && FACE.bilingual.unitAxis.units('en').length === 10, 'K-350 unitAxis en: exemplar es, 10 units');
    }
    // the hyphen mark (fi) through the real pipeline over a fi-shaped block
    {
      const fi = shaped('fi');
      const r = await renderWith(page, faceWith('syllable', fi), { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'G1-324-gate-animals-d2-fi-hyphen', locale: 'fi', strings: { title: 'Tavutetut kuvakortit', instruction: 'Leikkaa kortit irti. Lue sana tavu kerrallaan.' } });
      assertRender('G1-324 fi hyphen', r, 2, { type: FACE.syllable });
      const rd = rederive('syllable', FACE.syllable, r, fi, 'fi');
      ok(rd.length === 0 && r.m.stamps.lcsMark === 'hyphen' && r.m.cards.every((c) => c.px === 26 && c.icon === 96), `G1-324 fi hyphen: ${JSON.stringify(rd)} mark ${r.m.stamps.lcsMark}`);
      pngs.push(r.png);
      console.log(`render G1-324 fi hyphen: verify ${r.verify.length} lints ${r.lints.length} | ${r.m.cards.map((c) => c.lines.join(' ')).join(' ')}`);
    }
    // en pools per face over every colour theme (the pinned theme must hold 8 on every face)
    for (const mode of FACES) {
      const short = colourThemes.map((t) => [t, poolSize(mode, en, t, 'en')]).filter(([, n]) => n < 8);
      const pinned = poolSize(mode, en, EXEMPLAR_THEME, 'en');
      ok(pinned >= 8, `${FACE_IDS[mode]}: ${EXEMPLAR_THEME} en pool ${pinned} < 8`);
      console.log(`pools ${FACE_IDS[mode]} ${mode} en: ${colourThemes.length - short.length}/${colourThemes.length} themes >= 8, ${EXEMPLAR_THEME} ${pinned}${short.length ? '; below 8: ' + short.map(([t, n]) => t + ':' + n).join(' ') : ''}`);
    }
    // per-locale refusal census over bank-SHAPED blocks (measured, reported; the pinned theme asserted)
    {
      const rows = [];
      for (const loc of LOCALES) {
        const b = shaped(loc);
        const cells = FACES.map((mode) => {
          const sizes = colourThemes.map((t) => poolSize(mode, b, t, loc));
          const refused = sizes.every((n) => n === -1);
          const okN = sizes.filter((n) => n >= 8).length;
          const pinned = poolSize(mode, b, EXEMPLAR_THEME, loc);
          if (!refused) ok(pinned >= 8, `${FACE_IDS[mode]} ${loc}: ${EXEMPLAR_THEME} pool ${pinned} < 8`);
          const short = colourThemes.map((t, i) => [t, sizes[i]]).filter(([, n]) => n >= 0 && n < 8 && !/^(colors|emotions)$/.test(n === -1 ? '' : ''));
          const shortTxt = short.length && short.length <= 8 ? ' below: ' + short.map(([t, n]) => t + ':' + n).join(' ') : '';
          return refused ? 'REFUSED' : `${okN}/${colourThemes.length} (${EXEMPLAR_THEME} ${pinned})${shortTxt}`;
        });
        rows.push(`  ${loc}: ` + FACES.map((m, i) => `${m} ${cells[i]}`).join(' · '));
      }
      console.log('census (themes >= 8 per face, bank-shaped blocks):\n' + rows.join('\n'));
    }
    // face seed sweeps (build only)
    if (!QUICK) {
      for (const mode of FACES) {
        const t = FACE[mode];
        const sets = new Set();
        for (let k = 1; k <= 10; k++) {
          const rng = makeRng(instanceSeed({ typeId: t.id, theme: EXEMPLAR_THEME, difficulty: 2, seedEpoch: k }));
          const b = t.build({ theme: EXEMPLAR_THEME, difficulty: 2, locale: 'en' }, { rng });
          ok(new Set(b.meta.vocab).size === t.difficulty[2].cards, `sweep ${t.id} seed ${k}: ${new Set(b.meta.vocab).size} distinct entries`);
          sets.add(b.meta.vocab.slice().sort().join(','));
        }
        console.log(`sweep ${t.id}: ${sets.size} distinct entry sets over 10 seeds${sets.size === 1 ? ' (the pool is exactly the card count)' : ''}`);
      }
    }

    // 4. poisons
    let killed = 0;
    const TOTAL = 20;
    // P1 — a base card without its img
    {
      const t = typeWith(en, (o) => { o.bodyHtml = o.bodyHtml.replace(/<img class="ws-icon"[^>]*>/, ''); return o; });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-poison-P1' });
      if (judge('P1', r.verify, /card 1: 0 pictures ≠ 1/)) killed++;
    }
    // P2 — a twin word card from another theme (a word the pictures do not show)
    {
      const t = typeWith(en, (o) => {
        const secs = o.bodyHtml.match(SECTION_RE);
        const w0 = secs.find((s) => /data-lcs-twin="w0"/.test(s));
        const bad = w0.replace(/data-lcs-vocab="[^"]+"/, 'data-lcs-vocab="apple"').replace(/data-lcs-word="[^"]+"/, 'data-lcs-word="apple"').replace(/<span class="ws-wordplate-line"[^>]*>[^<]*<\/span>/, '<span class="ws-wordplate-line" style="display:block;white-space:nowrap;line-height:30px" data-lcs-line>apple</span>');
        o.bodyHtml = o.bodyHtml.replace(w0, bad); return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 3, baseName: 'K-324-gate-poison-P2' });
      if (judge('P2', r.verify, /word vocab multiset ≠ picture vocab multiset/)) killed++;
    }
    // P3 — a BW theme: (a) the spec refuses before any render; (b) a BW picture
    // forced into a rendered card (past the spec) is caught by verify() on the src
    {
      let msg = [];
      try { TYPE._buildWith(en, { theme: 'zoo animals bw', difficulty: 2, locale: 'en' }, { rng: makeRng('p3') }); } catch (e) { msg = [e.message]; }
      const a = judge('P3 build', msg, /"zoo animals bw" is a BW directory/, 'the spec refused');
      const bw = require('../image-cache/resolve.js').fileUri('animals bw', 'bat');
      const t = typeWith(en, (o) => { o.bodyHtml = o.bodyHtml.replace(/(<img class="ws-icon" src=")[^"]+(")/, `$1${bw}$2`); return o; });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-poison-P3' });
      const b = judge('P3 render', r.verify, /card 1: BW directory "animals bw"/);
      if (a && b) killed++;
    }
    // P4 — de `Wütend` capitalised: a gender-null entry printed with the noun capital
    {
      const de = { ...clone(en), cardCase: 'keep', articleStyle: { enabled: true, level: 2, dots: ['codeBlue', 'codeRed', 'codeGreen'], elision: 'refuse', elisionChip: null, legend: 'der = blau · die = rot · das = grün' }, bilingual: { partnerExemplar: 'en', hostName: 'Deutsch', partnerNames: { en: 'Englisch', es: 'Spanisch', pt: 'Portugiesisch', fr: 'Französisch', it: 'Italienisch', nl: 'Niederländisch', sv: 'Schwedisch', da: 'Dänisch', no: 'Norwegisch', fi: 'Finnisch' }, legendSep: ' · ' } };
      const strings = { title: 'Bildkarten', instruction: 'Schneide die Karten aus.' };
      // control: the de emotions page prints every adjective lower ("wütend"), nouns would keep the capital
      const ctl = await renderWith(page, typeWith(de), { theme: 'emotions', difficulty: 2, baseName: 'K-324-gate-P4-control', strings, locale: 'de' });
      const ctlOk = ctl.verify.length === 0 && ctl.m.cards.every((c) => c.word === c.word.toLocaleLowerCase('de'));
      ok(ctlOk, `P4 control: de emotions must render clean and lower: ${JSON.stringify(ctl.verify)} ${ctl.m.cards.map((c) => c.word).join(' ')}`);
      const t = typeWith(de, (o) => {
        const w = o.meta.words[0];
        const W = w[0].toLocaleUpperCase('de') + w.slice(1);
        o.bodyHtml = o.bodyHtml.replace(`data-lcs-word="${w}"`, `data-lcs-word="${W}"`).replace(`data-lcs-line>${w}<`, `data-lcs-line>${W}<`);
        return o;
      });
      const r = await renderWith(page, t, { theme: 'emotions', difficulty: 2, baseName: 'K-324-gate-poison-P4', strings, locale: 'de' });
      if (judge('P4', r.verify, /de non-noun "\p{Lu}\p{Ll}+" capitalised/u, 'de render, cardCase keep')) killed++;
    }
    // P5 — fi articleStyle.enabled:true
    {
      const fi = { ...clone(en), articleStyle: { enabled: true, level: 2, dots: null, elision: 'refuse', elisionChip: null, legend: null }, syllable: { enabled: true, mark: 'hyphen', hyphen: '-', strictPool: false }, bilingual: { partnerExemplar: 'en', hostName: 'suomi', partnerNames: { en: 'englanti', de: 'saksa', es: 'espanja', pt: 'portugali', fr: 'ranska', it: 'italia', nl: 'hollanti', sv: 'ruotsi', da: 'tanska', no: 'norja' }, legendSep: ' · ' } };
      delete fi.strings.article;
      const control = validateBank({ ...fi, articleStyle: { enabled: false } }, 'fi');
      ok(control.length === 0, `P5 control (fi enabled:false) must validate: ${control.join('; ')}`);
      if (judge('P5', validateBank(fi, 'fi'), /fi articleStyle\.enabled must be false/)) killed++;
    }
    // P10 — nl `ambulanceverpleegkundige` forced through the 26 px plate
    {
      const a = judge('P10 rule', C3.labelLines('ambulanceverpleegkundige', { cap: 20, lineCap: 16, maxLines: 2 }) === null ? ['labelLines null'] : [], /labelLines null/, 'the label rule refuses the 24-glyph token');
      const t = typeWith(en, (o) => {
        const w = o.meta.words[0];
        o.bodyHtml = o.bodyHtml.replace(`data-lcs-word="${w}"`, 'data-lcs-word="ambulanceverpleegkundige"').replace(`data-lcs-line>${w}<`, 'data-lcs-line>ambulanceverpleegkundige<');
        return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-poison-P10' });
      const b = judge('P10 render', r.verify, /"ambulanceverpleegkundige" overflows its plate/);
      if (a && b) killed++;
    }
    // P11 — one word on two base cards
    {
      const t = typeWith(en, (o) => {
        const secs = o.bodyHtml.match(SECTION_RE);
        o.bodyHtml = o.bodyHtml.replace(secs[1], secs[0]); return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-poison-P11' });
      if (judge('P11', r.verify, /card 2: duplicate word/)) killed++;
    }
    // P12 — the twin in identity order (word slot i names picture slot i)
    {
      const t = typeWith(en, (o) => {
        const secs = o.bodyHtml.match(SECTION_RE);
        const words = secs.filter((s) => /data-lcs-twin="w\d+"/.test(s));
        const byVocab = new Map(words.map((s) => [s.match(/data-lcs-vocab="([^"]+)"/)[1], s]));
        const inOrder = o.meta.vocab.map((k, i) => byVocab.get(k).replace(/data-lcs-twin="w\d+"/, `data-lcs-twin="w${i}"`));
        let html = o.bodyHtml;
        words.forEach((s, i) => { html = html.replace(s, `@@W${i}@@`); });
        inOrder.forEach((s, i) => { html = html.replace(`@@W${i}@@`, s); });
        o.bodyHtml = html; return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 3, baseName: 'K-324-gate-poison-P12' });
      if (judge('P12', r.verify, /word slot 0 names picture slot 0 \(identity\)/)) killed++;
    }
    // P13 — per-card dashed borders instead of the overlay
    {
      const t = typeWith(en, (o) => {
        o.bodyHtml = o.bodyHtml.replace(/<svg[^>]*data-lcs-cutlines[\s\S]*?<\/svg>/, '').replace(/border:0;padding/g, 'border:2.5px dashed #C8BFAE;padding');
        return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-poison-P13' });
      const a = judge('P13 overlay', r.verify, /0 cut overlays/);
      const b = judge('P13 border', r.verify, /card 1 has a border/);
      if (a && b) killed++;
    }
    // P14 — the overlay 1 px narrower than the sheet
    {
      const t = typeWith(en, (o) => { o.bodyHtml = o.bodyHtml.replace(/(<svg[^>]*width=")674("[^>]*data-lcs-cutlines)/, '$1673$2'); return o; });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-poison-P14' });
      if (judge('P14', r.verify, /overlay 673x692 ≠ sheet 674x692/)) killed++;
    }
    // P15 — padding:4 (the 3 mm cut margin gone)
    {
      const t = typeWith(en, (o) => { o.bodyHtml = o.bodyHtml.replace(/padding:12px;display:flex/g, 'padding:4px;display:flex'); return o; });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-poison-P15' });
      if (judge('P15', r.verify, /card 1 padding 4px ≠ 12/)) killed++;
    }
    // P16 — a 760 block under three-line chrome (sheet 730 + strip 30)
    {
      const t = typeWith(en, (o) => { o.bodyHtml = o.bodyHtml.replace(/height:692px/, 'height:730px'); return o; });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-poison-P16', strings: LONG_STRINGS });
      if (judge('P16', r.lints, /footer overlap/, `block bottom ${Math.round(r.m.sheet.bottom)} vs footer ${Math.round(r.m.foot)}`)) killed++;
    }
    // P17 — a twin word of 12 glyphs at 26 (the tier says 20); the stamp agrees with the CSS so only the gate's re-derivation sees it
    {
      const t = typeWith(en, (o) => {
        const secs = o.bodyHtml.match(SECTION_RE);
        const w = o.meta.words.find((x) => glyphs(x) >= 11 && glyphs(x) <= 12);
        if (!w) throw new Error('P17: the seed drew no 11-12 glyph word');
        const sec = secs.find((s) => s.includes(`data-lcs-word="${w}"`));
        o.bodyHtml = o.bodyHtml.replace(sec, sec.replace('data-lcs-px="20"', 'data-lcs-px="26"').replace('font-size:20px;line-height:24px', 'font-size:26px;line-height:30px'));
        return o;
      });
      const r = await renderWith(page, t, { theme: LONG_THEME, difficulty: 3, baseName: 'K-324-gate-poison-P17' });
      const found = gateFindings('P17', r, 3);
      if (judge('P17', found, /at 26 px, the tier rule says 20/, `verify ${r.verify.length} lints ${r.lints.length}`)) killed++;
    }
    // P18 — cream cards
    {
      const t = typeWith(en, (o) => { o.bodyHtml = o.bodyHtml.replace(/background:#FFFFFF;border:0/g, 'background:#FBF3E4;border:0'); return o; });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-324-gate-poison-P18' });
      if (judge('P18', r.verify, /card 1 background rgb\(251, 243, 228\) \(must be white\)/)) killed++;
    }
    // P6 — de `die Hund`: the chip on card 1 swapped for another chip (stamp + text agree; only the vocab re-derivation sees it)
    {
      const de = shaped('de');
      const strings = { title: 'Der, die, das: Bildkarten mit Artikel', instruction: 'Schneide die acht Karten aus.' };
      const ctl = await renderWith(page, faceWith('article', de), { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-348-gate-P6-control-de', strings, locale: 'de' });
      const ctlRd = rederive('article', FACE.article, ctl, de, 'de');
      ok(ctl.verify.length === 0 && ctl.lints.length === 0 && ctlRd.length === 0 && ctl.m.cards.every((c) => c.dot) && ctl.m.legend && ctl.m.legend.dots.length === 3, `P6 control (de dots + legend) must render clean: ${JSON.stringify(ctl.verify)} ${JSON.stringify(ctlRd)} legend ${JSON.stringify(ctl.m.legend)}`);
      pngs.push(ctl.png);
      console.log(`render K-348 de (P6 control): verify ${ctl.verify.length} lints ${ctl.lints.length} legend "${ctl.m.legend.text}" | ${ctl.m.cards.map((c) => c.word).join(' · ')}`);
      const t = faceWith('article', de, (o) => {
        const chip = o.meta.chips[0], word = o.meta.words[0];
        const other = ['der', 'die', 'das'].find((x) => x !== chip);
        const bad = word.replace(chip + ' ', other + ' ');
        o.bodyHtml = o.bodyHtml.replace(`data-lcs-chip="${chip}"`, `data-lcs-chip="${other}"`).replace(`data-lcs-word="${word}"`, `data-lcs-word="${bad}"`).replace(`data-lcs-line>${word}<`, `data-lcs-line>${bad}<`);
        return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-348-gate-poison-P6', strings, locale: 'de' });
      const found = rederive('article', FACE.article, r, de, 'de');
      if (judge('P6', found, /card 1: chip d\w\w ≠ d\w\w \(/, `verify ${r.verify.length} (the DOM is self-consistent), re-derive ${found.length}`)) killed++;
    }
    // P7 — a many-card with two clones
    {
      const t = faceWith('plural', en, (o) => {
        const secs = o.bodyHtml.match(SECTION_RE);
        const many = secs.find((x) => /data-lcs-role="many"/.test(x));
        o.bodyHtml = o.bodyHtml.replace(many, many.replace(/<img class="ws-icon"[^>]*>/, ''));
        return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-349-gate-poison-P7' });
      if (judge('P7', r.verify, /card 2: 2 pictures ≠ 3/)) killed++;
    }
    // P8 — the partner line printed in the host language
    {
      const t = faceWith('bilingual', en, (o) => {
        const i = o.meta.words.findIndex((w, k) => w !== o.meta.partners[k]);
        if (i < 0) throw new Error('P8: every drawn pair is a shared word');
        const host = o.meta.words[i], partner = o.meta.partners[i];
        o.bodyHtml = o.bodyHtml.replace(`data-lcs-partner-word="${partner}"`, `data-lcs-partner-word="${host}"`).replace(`data-lcs-partner-line>${partner}<`, `data-lcs-partner-line>${host}<`);
        return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-350-gate-poison-P8' });
      const found = rederive('bilingual', FACE.bilingual, r, en, 'en');
      if (judge('P8', found, /card \d+: partner "[^"]+" ≠ vocab es "[^"]+"/, `verify ${r.verify.length} (the DOM is self-consistent), re-derive ${found.length}`)) killed++;
    }
    // P9 — en `acorn`: a rule-only boundary (ac-orn; TeX says acorn). (a) the texPool filter drops it from the
    // pool where the full pool keeps it; (b) forced onto a rendered card past the spec, the gate's TeX check sees the stamp
    {
      const cfg = FACE.syllable.difficulty[2];
      const full = TYPE._syllablePool(en, { ...cfg, pool: 'full' }, 'miscellaneous', 'en', 'lower', new Set()).pool.map((e) => e.vocabKey);
      const tex = TYPE._syllablePool(en, cfg, 'miscellaneous', 'en', 'lower', new Set()).pool.map((e) => e.vocabKey);
      ok(full.includes('acorn'), 'P9 control: the FULL en pool of miscellaneous carries acorn (ac-orn)');
      const a = judge('P9 pool', tex.includes('acorn') ? [] : ['acorn dropped by the texPool filter'], /acorn dropped/, `full ${full.length} → tex ${tex.length}`);
      const t = faceWith('syllable', en, (o) => {
        const v = o.meta.vocab[0], w = o.meta.words[0], sp = o.meta.splits[0].join('|');
        o.bodyHtml = o.bodyHtml.replace(`data-lcs-vocab="${v}"`, 'data-lcs-vocab="acorn"').replace(`data-lcs-pic="${v}"`, 'data-lcs-pic="acorn"').replace(`data-lcs-word="${w}"`, 'data-lcs-word="acorn"').replace(`data-lcs-split="${sp}"`, 'data-lcs-split="ac|orn"');
        return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'G1-324-gate-poison-P9' });
      const found = rederive('syllable', FACE.syllable, r, en, 'en');
      const b = judge('P9 render', found, /card 1: acorn is not TeX-agreed \(ac-orn\)/, `verify ${r.verify.length}`);
      if (a && b) killed++;
    }
    // P19 — fr `l' arbre`: the elided article printed with a space (fr-shaped block with elision:'print')
    {
      const fr = shaped('fr', { articleStyle: { enabled: true, level: 2, dots: null, elision: 'print', elisionChip: "l'", legend: null } });
      const strings = { title: "Imagier : le, la ou l'", instruction: 'Découpe les huit cartes.' };
      const refuseDefault = TYPE._articlePool(shaped('fr'), EXEMPLAR_THEME, 'fr', 'lower', new Set()).pool;
      const printPool = TYPE._articlePool(fr, EXEMPLAR_THEME, 'fr', 'lower', new Set()).pool;
      ok(refuseDefault.every((e) => !/^[aeiouyhéèêàâîïôûù]/i.test(e.base)), 'fr default (elision refuse): no vowel/h-initial noun in the pool');
      ok(printPool.some((e) => e.chip === "l'" && /^l'\S/.test(e.word)), `fr elision print: an l'noun in the pool (${printPool.filter((e) => e.chip === "l'").map((e) => e.word).join(' ')})`);
      // h aspiré / h muet and y are undecidable from the vocab: print never elides an h- or y-initial noun (hibou → refused, never "l'hibou")
      ok(printPool.every((e) => !/^[hy]/i.test(e.base)), `fr elision print elided an h/y-initial noun: ${printPool.filter((e) => /^[hy]/i.test(e.base)).map((e) => e.word).join(' ')}`);
      ok(entriesFor(EXEMPLAR_THEME, 'fr').some((e) => /^h/i.test(e.singular)), 'fr control: the exemplar theme carries an h-initial noun (hibou / hippopotame) so the rule is exercised');
      const ctl = await renderWith(page, faceWith('article', fr), { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-348-gate-P19-control-fr', strings, locale: 'fr' });
      const ctlRd = rederive('article', FACE.article, ctl, fr, 'fr');
      ok(ctl.verify.length === 0 && ctl.lints.length === 0 && ctlRd.length === 0, `P19 control (fr elision print) must render clean: ${JSON.stringify(ctl.verify)} ${JSON.stringify(ctlRd)}`);
      pngs.push(ctl.png);
      console.log(`render K-348 fr (P19 control, elision print): verify ${ctl.verify.length} lints ${ctl.lints.length} | ${ctl.m.cards.map((c) => c.word).join(' · ')}`);
      const t = faceWith('article', fr, (o) => {
        const chip = o.meta.chips[0], word = o.meta.words[0];
        const base = chip.endsWith("'") ? word.slice(chip.length) : word.slice(chip.length + 1);
        const bad = "l' " + base;
        o.bodyHtml = o.bodyHtml.replace(`data-lcs-chip="${chip}"`, `data-lcs-chip="l'"`).replace(`data-lcs-word="${word}"`, `data-lcs-word="${bad}"`).replace(`data-lcs-line>${word}<`, `data-lcs-line>${bad}<`);
        return o;
      });
      const r = await renderWith(page, t, { theme: EXEMPLAR_THEME, difficulty: 2, baseName: 'K-348-gate-poison-P19', strings, locale: 'fr' });
      if (judge('P19', r.verify, /card 1: elided article "l'" printed with a space/)) killed++;
    }
    // P20 — sv `blocks` on an article card: (a) the pool honours refuseKeys (en toys keeps domino, sv drops it);
    // (b) a refused key forced onto a rendered card past the spec is caught on the stamp
    {
      const sv = shaped('sv');
      const svPool = TYPE._articlePool(sv, 'toys', 'sv', 'lower', new Set()).pool.map((e) => e.vocabKey);
      const enPool = TYPE._articlePool(en, 'toys', 'en', 'lower', new Set()).pool.map((e) => e.vocabKey);
      ok(enPool.includes('domino'), 'P20 control: the en toys article pool keeps domino (no refuseKeys)');
      const a = judge('P20 pool', ['blocks', 'lego', 'domino', 'crayons', 'chess'].filter((k) => svPool.includes(k)).length ? [] : ['sv refuseKeys dropped'], /sv refuseKeys dropped/, `sv toys pool ${svPool.length}`);
      const strings = { title: 'En eller ett: bildkort', instruction: 'Klipp ut de åtta korten.' };
      const t = faceWith('article', sv, (o) => {
        const v = o.meta.vocab[0], chip = o.meta.chips[0], word = o.meta.words[0];
        const bad = 'en klossar';
        o.bodyHtml = o.bodyHtml.replace(`data-lcs-vocab="${v}"`, 'data-lcs-vocab="blocks"').replace(`data-lcs-pic="${v}"`, 'data-lcs-pic="blocks"')
          .replace(`data-lcs-chip="${chip}"`, 'data-lcs-chip="en"').replace(/data-lcs-base="[^"]+"/, 'data-lcs-base="klossar"').replace(`data-lcs-word="${word}"`, `data-lcs-word="${bad}"`).replace(`data-lcs-line>${word}<`, `data-lcs-line>${bad}<`);
        return o;
      });
      const r = await renderWith(page, t, { theme: 'farm animals', difficulty: 2, baseName: 'K-348-gate-poison-P20', strings, locale: 'sv' });
      const found = rederive('article', FACE.article, r, sv, 'sv');
      const b = judge('P20 render', found, /card 1: blocks is a refused key for sv/);
      if (a && b) killed++;
    }
    console.log('poison:\n' + poisonLog.join('\n'));
    const allKilled = killed === TOTAL;
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && allKilled;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed${QUICK ? ', --quick: sweeps skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${TOTAL} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank };
