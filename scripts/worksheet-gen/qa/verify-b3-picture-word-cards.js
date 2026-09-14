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
 *    DEFERRED (Phase 2 — the face they poison is not built): P6 de `die
 *    Hund` / P19 fr `l' arbre` / P20 sv `blocks` (article face), P7 two
 *    clones (plural face), P8 partner line in the host language (bilingual
 *    face), P9 en `acorn` non-TeX (syllable face). Listed, not counted.
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b3-common.js');
const { vocab, entriesFor } = require('../lib/b2-common.js');
const { loadAllTypes } = require('../lib/load-types.js');
const { ARTICLES } = require('../data/b2/articles.js');
const C3 = require('../templates/components-b3.js');
const tokens = require('../primitives/_tokens.js');

const TYPE = require('../types/k/K-324-picture-word-cards.js');
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
  const names = b.partnerNames || {};
  others.forEach((l) => { if (typeof names[l] !== 'string' || !names[l].trim()) push(`bilingual.partnerNames.${l} missing`); });
  Object.keys(names).forEach((l) => { if (!others.includes(l)) push(`bilingual.partnerNames.${l} is not a partner`); });
  // (4)
  const s = bank.syllable || {};
  if (!['arc', 'hyphen', 'colour'].includes(s.mark)) push(`syllable.mark "${s.mark}"`);
  if (loc === 'fi' && s.mark !== 'hyphen') push('fi syllable.mark must be hyphen');
  if (loc === 'da' && s.strictPool !== true) push('da syllable.strictPool must be true');
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
  walk(strings, 'strings'); walk({ legend: a.legend, elisionChip: a.elisionChip }, 'articleStyle'); walk(names, 'partnerNames');
  // (7)
  const V = opts.vocab || vocab();
  (bank.exclude || []).forEach((k) => { if (!V[k]) push(`exclude key "${k}" is not in the vocab`); });
  return f;
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { theme, difficulty, baseName, seedEpoch, strings, locale }) {
  const out = await renderInstance({ type, theme, difficulty, locale: locale || 'en', page, outDir: OUT, baseName, seedEpoch, strings });
  const m = await page.evaluate(() => {
    const sheet = document.querySelector('[data-lcs-sheet]');
    const grid = sheet && sheet.querySelector('[data-lcs-grid]');
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }; };
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const cards = [...document.querySelectorAll('[data-lcs-card]')].map((c) => {
      const p = c.querySelector('.ws-wordplate');
      const lines = p ? [...p.querySelectorAll('[data-lcs-line]')] : [];
      return { ...rect(c), word: c.dataset.lcsWord || null, vocab: c.dataset.lcsVocab, twin: c.dataset.lcsTwin || null, px: p ? +p.dataset.lcsPx : null, lines: lines.map((l) => l.textContent), plateRect: p ? rect(p) : null,
        overflow: p ? [p, ...lines].some((el) => el.scrollWidth > el.clientWidth + 0.5) : false, icon: (() => { const i = c.querySelector('img'); return i ? Math.min(i.offsetWidth, i.offsetHeight) : null; })() };
    });
    const ov = grid && grid.querySelector('[data-lcs-cutlines]');
    const cuts = ov ? [...ov.querySelectorAll('[data-lcs-cut-v], [data-lcs-cut-h]')].map((l) => ({ v: l.dataset.lcsCutV, h: l.dataset.lcsCutH, x1: +l.getAttribute('x1'), x2: +l.getAttribute('x2'), y1: +l.getAttribute('y1'), y2: +l.getAttribute('y2'), stroke: l.getAttribute('stroke'), dash: l.getAttribute('stroke-dasharray') })) : [];
    const frame = ov && ov.querySelector('[data-lcs-cut-frame]');
    return {
      stamps: sheet ? { ...sheet.dataset } : null, sheet: sheet ? rect(sheet) : null, grid: grid ? rect(grid) : null, overlay: ov ? rect(ov) : null, cuts,
      frame: frame ? { stroke: frame.getAttribute('stroke'), dash: frame.getAttribute('stroke-dasharray') } : null,
      scissors: document.querySelectorAll('[data-lcs-scissors]').length, cards,
      body: { left: body.left, right: body.right, top: body.top, bottom: body.bottom, height: body.height },
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
      titleLines: Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33),
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

function assertRender(name, r, d, opts = {}) {
  const cfg = TYPE.difficulty[d];
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
  ok(minIcon >= MIN_ICON, `${name}: picture ${minIcon} px < K floor ${MIN_ICON}`);
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
function gateFindings(name, r, d) {
  const before = fails.length, saved = assertions;
  assertRender(name, r, d);
  const found = fails.splice(before);
  assertions = saved;
  return found;
}
const SECTION_RE = /<section class="ws-cutcard"[\s\S]*?<\/section>/g;

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
      try { TYPE.build({ theme: EXEMPLAR_THEME, difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); msg = ''; } catch (e) { msg = e.message; }
      ok(/no de block/.test(msg), `an unauthored locale must REFUSE (throw), never fall back to en: ${msg}`);
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

    // 4. poisons
    let killed = 0;
    const TOTAL = 14;
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
      const de = { ...clone(en), cardCase: 'keep', articleStyle: { enabled: true, level: 2, dots: ['codeBlue', 'codeRed', 'codeGreen'], elision: 'refuse', elisionChip: null, legend: 'der = blau · die = rot · das = grün' }, bilingual: { partnerExemplar: 'en', partnerNames: { en: 'Englisch', es: 'Spanisch', pt: 'Portugiesisch', fr: 'Französisch', it: 'Italienisch', nl: 'Niederländisch', sv: 'Schwedisch', da: 'Dänisch', no: 'Norwegisch', fi: 'Finnisch' }, legendSep: ' · ' } };
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
      const fi = { ...clone(en), articleStyle: { enabled: true, level: 2, dots: null, elision: 'refuse', elisionChip: null, legend: null }, syllable: { enabled: true, mark: 'hyphen', hyphen: '-', strictPool: false }, bilingual: { partnerExemplar: 'en', partnerNames: { en: 'englanti', de: 'saksa', es: 'espanja', pt: 'portugali', fr: 'ranska', it: 'italia', nl: 'hollanti', sv: 'ruotsi', da: 'tanska', no: 'norja' }, legendSep: ' · ' } };
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
    for (const d of ['P6 de `die Hund` (article face)', 'P7 F4 right card with 2 clones (plural face)', 'P8 F5 partner line in the host language (bilingual face)', 'P9 F6 en `acorn` non-TeX (syllable face)', 'P19 fr `l\' arbre` (article face)', 'P20 sv `blocks` on an article card (article face)']) {
      poisonLog.push(`  ${d}: DEFERRED — Phase 2, the face is not built`);
    }
    console.log('poison:\n' + poisonLog.join('\n'));
    const allKilled = killed === TOTAL;
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && allKilled;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed, 6 deferred to Phase 2${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${TOTAL} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank };
