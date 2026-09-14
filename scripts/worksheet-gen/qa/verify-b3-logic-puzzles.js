#!/usr/bin/env node
/**
 * verify-b3-logic-puzzles.js — the G2-319 `logic-puzzles` gate (design §5).
 *
 *   node qa/verify-b3-logic-puzzles.js [--quick] [--locales=en] [--seeds=N]
 *
 * Own ground truth: the gate reads data/b3/logic-puzzles.js (bank + SETS)
 * directly, runs the bank validator, and re-derives every puzzle from the
 * PAGE STAMPS in ITS OWN in-page code (an independent brute-force solver +
 * propagation, never the spec's verify) — "diff, not trust". Every render goes
 * through the REAL pipeline (render/render-instance.js, file:// fonts).
 *
 * Sections
 *   A  bank: validateBank (rules 1-7: frames ≥ 2 per kind with exactly their
 *      slots, gendered-token ban, fi adessive rule, 8 capitalised names,
 *      allowlists ≥ 6 after confusable pairs + cached + vocab ×11 + no BW
 *      marker, truth kinds, 6 strings ≤ 70 / ≤ 150 / unique / no worksheet-
 *      word / no "sudoku" / no free claim / head ≠ visual-logic·sudoku name);
 *      spec.i18n.en === strings['G2-319'] (one source).
 *   C  renders: d1/d2/d3 on the exemplar theme (pets), d2 on every other fan
 *      theme, an unlisted theme REFUSED, LONG chrome (3-line en title + 148-
 *      char instruction, body 733) × d1-d3, WORST instruction chrome (3-line
 *      fi instruction, 710) × d1-d3, the 4-LINE fi TITLE chrome (700) × d1-d3,
 *      the 4-line-title + 3-line-instruction combination (677: d2/d3 asserted,
 *      d1 measured and REPORTED — see _work/G2-319-build.md), a seed sweep at
 *      d1/d2/d3. Each render: lints clean · verify() empty · the gate's own
 *      audit (unique solution === stamp, every clue necessary, propagation-
 *      solvable, not the identity, names / pictures disjoint, allowlist + no
 *      confusable pair, kinds / counts / quotas within the config, every clue
 *      row carries the name literal + the stamped pictures by src, cells
 *      empty, no mark, strip in column order and unmarked) · floors MEASURED
 *      (cells ≥ cfg.cell ≥ 36, header pictures ≥ 56, inline ≥ 36, strip ≥ 36,
 *      tile text ≤ 104, rows ≤ 66, name font ≥ 22, badge ≥ 26) · every band
 *      above the footer and inside 675 · markKey present, no ground truth ·
 *      non-vacuity (0 cells = FAIL). Sweep: no identity solution, no two
 *      seeds identical, every kind of d.kinds appears across the sweep, no
 *      name / picture repeats within a page.
 *   D  poisons (each must FAIL; the correct EN bank + page is the control):
 *      P1 a 3×3 with A¬X, B¬Y, C¬Z (two solutions) · P2 A¬X with A has X (no
 *      solution) · P3 a frame with a bare {noun} slot · P4 a printed ✓ in a
 *      grid cell / a ring on an answer chip · P5 a 4-clue 3×3 with one
 *      redundant clue · P7 hamster + mouse in one case (confusable) and fish +
 *      goldfish (off the allowlist) · P9 a fi frame "{name} ei ole {pic}" ·
 *      P10 the same name in both cases · P11 an es frame "El niño que tiene
 *      {pic} no es {name}." · P13 a [data-lcs-cell] with a child element ·
 *      P14 an answer chip carrying data-lcs-answer · P15 a d1 case with two
 *      pos clues (maxPos 1) · plus: the identity solution · a hand-edited name
 *      tile · a clue row whose picture is not the stamped column · a 12-char
 *      name (tile overflow) · a theme without an allowlist · an allowlist of
 *      5 · a locale without a bank block · an `either` kind on a bank that
 *      refuses it · cell 30 (below the G2 floor) · answer:'box' (unbuilt) ·
 *      the flat stack under 3-line chrome (footer lint) · a blank page.
 *   E  the five Phase-2 faces (2026-09-14; G2-344 F1 · G3-378 F2 · G1-349 F3 ·
 *      G3-379 F4 · G2-345 F5): each at d2 on every fan theme + the LONG / WORST /
 *      4-line-title chromes (+ the 677 combination asserted for F1 / F2 / F4 /
 *      F5, reported for F3 whose stack is 692) + a seed sweep; the base
 *      path faces through renderCheck with per-face floors (F2: header 52, tile
 *      84, name 18), the mode faces through faceCheck (the gate's OWN audit per
 *      mode: own solvers incl. the two-attribute state solver + copy-rule
 *      propagation, statement truth re-evaluation, printed marks = the solved
 *      permutation, pictogram = stamp, floors, footer, non-vacuity). Then the
 *      face poisons incl. the base-deferred P8 / P12 / P15b (P6 is MEASURED
 *      VACUOUS at 3×3×3, see section E). Row title/instruction === bank
 *      strings.F1..F5 === the emitted spec (one source).
 * Exit 1 on any real failure OR any silent poison.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev', 'g2319-gate');
const BANK_FILE = path.join(ROOT, 'data', 'b3', 'logic-puzzles.js');
const ID = 'G2-319';
const EXEMPLAR_THEME = 'pets';
const G2_FLOOR = 36;
const HEAD_PIC = 56;
const NAME_PX = 22;
const TILE_INNER = 104;
const ROW_MAX = 66;

// worst LEGAL chromes, measured 2026-09-14 in the real pipeline (scratch g2319-chrome*.js):
// a 68-char en title wraps to THREE lines (99) + a 148-char instruction to TWO (46) -> body 733;
// a 3-line fi instruction (69) under a 3-line title -> 710; a 68-char fi title of long compounds
// wraps to FOUR lines (132) -> 700; the four-line title + the three-line instruction -> 677.
const LONG_CHROME = {
  title: 'Logic Grid Puzzles for Second Grade: Three Clues and One Answer Each',
  instruction: 'Read the three clues of each case. Cross out on the grid every picture that cannot be true, tick the one that must be true, then circle each answer.',
};
// the batch's proven 3-line fi instruction (G1-310 gate, 150 chars): no 150-char logic-themed fi string
// reached three lines in 12 attempts (scratch g2319-chrome5..7.js: 46 px each) — the probe measures chrome
// height, not meaning, and the vacuity assertion below refuses a 2-line probe.
const FI_INSTRUCTION = 'Jokaisessa satataulunpalasessa näkyy yksi luku. Kirjoita puuttuvat luvut: oikealle yksi enemmän, vasemmalle yksi vähemmän, alapuolelle kymmenen lisää.';
const WORST_CHROME = { title: 'Logicals: drei Hinweise, eine Lösung für die zweite Klasse gedacht', instruction: FI_INSTRUCTION };
const FI4_CHROME = { title: 'Loogisen päättelyn ruudukkotehtävät alakoululaisille: kolme vihjettä', instruction: 'Lue kolme vihjettä. Yliviivaa päättelyruudukosta vaihtoehdot, jotka eivät voi pitää paikkaansa, ja ympyröi lopuksi jokaisen lapsen kuva.' };
const COMBO_CHROME = { title: FI4_CHROME.title, instruction: FI_INSTRUCTION };
const BODY_EXPECT = new Map([[LONG_CHROME, 733], [WORST_CHROME, 710], [FI4_CHROME, 700], [COMBO_CHROME, 677]]);

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const QUICK = flags.has('--quick');

function loadBankModule() { delete require.cache[require.resolve(BANK_FILE)]; return require(BANK_FILE); }
function clone(o) { return JSON.parse(JSON.stringify(o)); }

/* ---------------- C. the gate's own in-page audit ---------------- */
async function renderCheck(page, type, inj, job, opts) {
  let t = type;
  if (inj) t = { ...type, build: (o, ctx) => type._buildWith(inj.bank || loadBankModule().LOGIC_PUZZLES[o.locale.slice(0, 2)], inj.cfg || type.difficulty[o.difficulty], { theme: o.theme, locale: o.locale }, ctx, inj.sets || null) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({
    type: t, theme: job.theme === undefined ? EXEMPLAR_THEME : job.theme, difficulty: job.difficulty, locale: job.locale, unit: null, strings: job.strings,
    pageSize: job.pageSize, seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const { SETS } = loadBankModule();
  const FL = { HEAD_PIC, NAME_PX, TILE_INNER, ...((opts && opts.floors) ? { HEAD_PIC: opts.floors.headPic, NAME_PX: opts.floors.namePx, TILE_INNER: opts.floors.tileInner } : {}) };
  const m = await page.evaluate(({ SETS, G2_FLOOR, HEAD_PIC, NAME_PX, TILE_INNER, ROW_MAX }) => {
    const res = { fails: [], cases: [], cells: 0 };
    const F = res.fails;
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.insLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    res.titleLines = Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33);
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const root = document.querySelector('[data-lcs-type="G2-319"]');
    if (!root) { F.push('no root'); return res; }
    const cfg = JSON.parse(root.dataset.lcsCfg);
    const theme = root.dataset.lcsTheme;
    res.theme = theme;
    const allow = SETS.distinct[theme] || [];
    const badPairs = new Set(SETS.confusable.map(([a, b]) => [a, b].sort().join('|')));
    const keyEl = root.querySelector('.ws-logic-markkey');
    if (!keyEl) F.push('audit: no markKey');
    else {
      const kr = keyEl.getBoundingClientRect();
      if (kr.width > 675.6 || kr.left < body.left - 0.6 || kr.right > body.right + 0.6) F.push('size: markKey outside the body');
      if (keyEl.querySelector('[data-lcs-cell],[data-lcs-clues],[data-lcs-solution],[data-lcs-answer],[data-lcs-mark]')) F.push('audit: markKey carries ground truth');
    }
    // own solver: brute force over permutations by index arrays
    const perms = (n) => { const out = []; const go = (rest, acc) => { if (!rest.length) return out.push(acc); for (let i = 0; i < rest.length; i++) go(rest.slice(0, i).concat(rest.slice(i + 1)), acc.concat(rest[i])); }; go([...Array(n).keys()], []); return out; };
    const ok = (c, s) => c.k === 'neg' ? s[c.a] !== c.v : c.k === 'pos' ? s[c.a] === c.v : c.k === 'either' ? (c.v[0] === s[c.a] || c.v[1] === s[c.a]) : false;
    const survivors = (clues, n) => perms(n).filter((s) => clues.every((c) => ok(c, s)));
    // own propagation: a candidate table, cross what the clues cross, then singles by row and by column
    const prop = (clues, n) => {
      const T = [...Array(n)].map(() => Array(n).fill(1));
      clues.forEach((c) => {
        if (c.k === 'neg') T[c.a][c.v] = 0;
        if (c.k === 'pos') { for (let j = 0; j < n; j++) if (j !== c.v) T[c.a][j] = 0; for (let i = 0; i < n; i++) if (i !== c.a) T[i][c.v] = 0; }
        if (c.k === 'either') for (let j = 0; j < n; j++) if (j !== c.v[0] && j !== c.v[1]) T[c.a][j] = 0;
      });
      let moved = true;
      while (moved) {
        moved = false;
        for (let i = 0; i < n; i++) { const js = T[i].map((x, j) => (x ? j : -1)).filter((j) => j >= 0); if (js.length === 1) for (let r = 0; r < n; r++) if (r !== i && T[r][js[0]]) { T[r][js[0]] = 0; moved = true; } }
        for (let j = 0; j < n; j++) { const is = T.map((row, i) => (row[j] ? i : -1)).filter((i) => i >= 0); if (is.length === 1) for (let c = 0; c < n; c++) if (c !== j && T[is[0]][c]) { T[is[0]][c] = 0; moved = true; } }
      }
      return T.map((row) => { const js = row.map((x, j) => (x ? j : -1)).filter((j) => j >= 0); return js.length === 1 ? js[0] : -1; });
    };
    const secs = [...root.querySelectorAll('section[data-lcs-puzzle]')];
    if (secs.length !== 2) F.push(`audit: ${secs.length} cases`);
    const namesSeen = new Map(), picsSeen = new Map();
    secs.forEach((sec, p) => {
      const P = `case ${p + 1}`;
      const n = +sec.dataset.lcsSize;
      const sol = sec.dataset.lcsSolution.split(',').map(Number);
      const clues = JSON.parse(sec.dataset.lcsClues);
      const forms = JSON.parse(sec.dataset.lcsForms);
      const names = sec.dataset.lcsNames.split(',').map(Number);
      const pics = sec.dataset.lcsPics.split(',');
      const nouns = sec.dataset.lcsNouns.split(',');
      res.cases.push({ names, pics, sol, kinds: clues.map((c) => c.f), clues: clues.length });
      names.forEach((i) => { if (namesSeen.has(i)) F.push(`audit: name ${i} in ${P} and case ${namesSeen.get(i) + 1}`); namesSeen.set(i, p); });
      pics.forEach((k) => { if (picsSeen.has(k)) F.push(`audit: picture ${k} in ${P} and case ${picsSeen.get(k) + 1}`); picsSeen.set(k, p); });
      pics.forEach((k) => { if (!allow.includes(k)) F.push(`audit: ${P} picture "${k}" off the ${theme} allowlist`); });
      for (let i = 0; i < pics.length; i++) for (let j = i + 1; j < pics.length; j++) if (badPairs.has([pics[i], pics[j]].sort().join('|'))) F.push(`audit: ${P} confusable ${pics[i]}/${pics[j]}`);
      if (sol.every((v, i) => v === i)) F.push(`audit: ${P} identity solution`);
      const S = survivors(clues, n);
      if (S.length !== 1) F.push(`audit: ${P} ${S.length} solutions`);
      else if (S[0].join() !== sol.join()) F.push(`audit: ${P} solver ${S[0]} != stamp ${sol}`);
      clues.forEach((_, i) => { if (survivors(clues.filter((__, j) => j !== i), n).length === 1) F.push(`audit: ${P} clue ${i + 1} redundant`); });
      const pr = prop(clues, n);
      if (pr.join() !== sol.join()) F.push(`audit: ${P} propagation stops at ${pr}`);
      if (clues.length < cfg.clues[0] || clues.length > cfg.clues[1]) F.push(`audit: ${P} ${clues.length} clues outside [${cfg.clues}]`);
      const by = {}; clues.forEach((c) => { by[c.f] = (by[c.f] || 0) + 1; if (!cfg.kinds.includes(c.f)) F.push(`audit: ${P} kind ${c.f} outside cfg`); });
      if (cfg.maxPos != null && (by.pos || 0) > cfg.maxPos) F.push(`audit: ${P} pos > maxPos`);
      if (cfg.minEither != null && (by.either || 0) < cfg.minEither) F.push(`audit: ${P} either < minEither`);
      if (cfg.minHolderNot != null && (by.holderNot || 0) < cfg.minHolderNot) F.push(`audit: ${P} holderNot < minHolderNot`);
      if (cfg.maxHolderNot != null && (by.holderNot || 0) > cfg.maxHolderNot) F.push(`audit: ${P} holderNot > maxHolderNot`);
      // the rendered apparatus
      const grid = sec.querySelector('[data-lcs-grid]');
      if (!grid) { F.push(`audit: ${P} no grid`); return; }
      const gb = grid.getBoundingClientRect();
      const cells = [...grid.querySelectorAll('[data-lcs-cell]')];
      if (cells.length !== n * n) F.push(`audit: ${P} ${cells.length} cells`);
      cells.forEach((c) => {
        res.cells++;
        const r = c.getBoundingClientRect();
        if (r.width < cfg.cell - 0.6 || r.height < cfg.cell - 0.6) F.push(`size: ${P} cell ${r.width.toFixed(0)}x${r.height.toFixed(0)} < cfg ${cfg.cell}`);
        if (r.width < G2_FLOOR || r.height < G2_FLOOR) F.push(`size: ${P} cell below ${G2_FLOOR}`);
        if (c.childNodes.length || c.getAttribute('class') || (c.textContent || '').trim()) F.push(`audit: ${P} cell ${c.dataset.lcsCell} not empty`);
      });
      if (grid.querySelector('[data-lcs-mark], text:not([data-lcs-row])')) F.push(`audit: ${P} a mark or extra text on the grid`);
      const heads = [...grid.querySelectorAll('img[data-lcs-col]')];
      if (heads.length !== n) F.push(`audit: ${P} ${heads.length} header pictures`);
      const headSrc = [];
      heads.forEach((im) => {
        const j = +im.dataset.lcsCol; headSrc[j] = im.src;
        const r = im.getBoundingClientRect();
        if (r.width < HEAD_PIC - 0.6 || r.height < HEAD_PIC - 0.6) F.push(`size: ${P} header picture ${r.width.toFixed(0)} < ${HEAD_PIC}`);
        if (!im.complete || !im.naturalWidth) F.push(`audit: ${P} header picture ${j} broken`);
        const file = decodeURIComponent(im.src.split('/').pop());
        if (!file.startsWith(nouns[j] + '@') && !file.startsWith(nouns[j] + '.')) F.push(`audit: ${P} header ${j} file ${file} != noun ${nouns[j]}`);
      });
      const labels = [...grid.querySelectorAll('text[data-lcs-row]')];
      if (labels.length !== n) F.push(`audit: ${P} ${labels.length} tiles`);
      labels.forEach((t) => {
        const r = +t.dataset.lcsRow;
        if (t.textContent !== forms[r].nom) F.push(`audit: ${P} tile ${r} "${t.textContent}" != "${forms[r].nom}"`);
        if (t.getComputedTextLength() > TILE_INNER + 0.5) F.push(`size: ${P} tile "${t.textContent}" ${t.getComputedTextLength().toFixed(1)} > ${TILE_INNER}`);
        if (parseFloat(getComputedStyle(t).fontSize) < NAME_PX - 0.1) F.push(`size: ${P} tile font ${getComputedStyle(t).fontSize} < ${NAME_PX}`);
        const tb = t.getBoundingClientRect();
        if (tb.left < gb.left || tb.right > gb.right) F.push(`size: ${P} tile text outside the grid`);
      });
      const rows = [...sec.querySelectorAll('[data-lcs-clue]')];
      if (rows.length !== clues.length) F.push(`audit: ${P} ${rows.length} rows for ${clues.length} clues`);
      rows.forEach((row) => {
        const i = +row.dataset.lcsClue; const c = clues[i]; if (!c) { F.push(`audit: ${P} row ${i} unstamped`); return; }
        const lit = c.f === 'holderNot' ? forms[c.a].nom : (forms[c.a].ade || forms[c.a].nom);
        if (!row.textContent.includes(lit)) F.push(`audit: ${P} row ${i + 1} lacks "${lit}"`);
        const want = Array.isArray(c.v) ? c.v : [c.v];
        const imgs = [...row.querySelectorAll('img')];
        if (imgs.length !== want.length) F.push(`audit: ${P} row ${i + 1} ${imgs.length} pictures for ${want.length}`);
        imgs.forEach((im, q) => {
          if (im.src !== headSrc[want[q]]) F.push(`audit: ${P} row ${i + 1} picture ${q} is not column ${want[q]}`);
          const r = im.getBoundingClientRect();
          if (r.width < cfg.inlinePic - 0.6 || r.width < G2_FLOOR) F.push(`size: ${P} inline picture ${r.width.toFixed(0)} < ${Math.max(cfg.inlinePic, G2_FLOOR)}`);
        });
        const badge = row.querySelector('span');
        const bb = badge.getBoundingClientRect();
        if (bb.width < 26 - 0.6 || bb.height < 26 - 0.6) F.push(`size: ${P} badge ${bb.width.toFixed(0)}`);
        const rb = row.getBoundingClientRect();
        if (rb.height > ROW_MAX) F.push(`size: ${P} row ${i + 1} ${rb.height.toFixed(0)} > ${ROW_MAX}`);
        if (rb.bottom > gb.bottom + 0.6) F.push(`size: ${P} row ${i + 1} below the grid bottom`);
        if (rb.right > gb.left - 19.4) F.push(`size: ${P} row ${i + 1} runs into the grid`);
        [...row.querySelectorAll('img, span')].forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > rb.right + 0.6 || r.left < rb.left - 0.6)) F.push(`size: ${P} row ${i + 1} content outside the row`); });
      });
      const slots = [...sec.querySelectorAll('[data-lcs-answer-slot]')];
      if (cfg.answer === 'circle') {
        if (slots.length !== n) F.push(`audit: ${P} ${slots.length} answer chips`);
        slots.forEach((ch) => {
          const r = +ch.dataset.lcsAnswerSlot;
          if (ch.hasAttribute('data-lcs-answer') || ch.querySelector('svg, [data-lcs-mark], [data-lcs-answer]')) F.push(`audit: ${P} chip ${r} marked`);
          const imgs = [...ch.querySelectorAll('img')];
          if (imgs.length !== n) F.push(`audit: ${P} chip ${r} ${imgs.length} pictures`);
          imgs.forEach((im, j) => { if (im.src !== headSrc[j]) F.push(`audit: ${P} chip ${r} picture ${j} out of column order`); const b = im.getBoundingClientRect(); if (b.width < cfg.bankPic - 0.6 || b.width < G2_FLOOR) F.push(`size: ${P} chip picture ${b.width.toFixed(0)}`); });
          const nm = ch.querySelector('span');
          if (!nm || nm.textContent.trim() !== forms[r].nom) F.push(`audit: ${P} chip ${r} name`);
          const cb = ch.getBoundingClientRect();
          if (cb.bottom > foot + 0.6) F.push(`size: ${P} chip ${r} below the footer`);
          [...ch.querySelectorAll('img, span')].forEach((el) => { const b = el.getBoundingClientRect(); if (b.width && (b.right > cb.right + 0.6 || b.left < cb.left - 0.6 || b.top < cb.top - 0.6 || b.bottom > cb.bottom + 0.6)) F.push(`size: ${P} chip ${r} content outside the chip`); });
        });
      } else if (slots.length) F.push(`audit: ${P} answer chips on a no-strip config`);
      const sb = sec.getBoundingClientRect();
      if (sb.bottom > foot + 0.6) F.push(`size: ${P} band bottom ${sb.bottom.toFixed(0)} below the footer ${foot.toFixed(0)}`);
      if (sb.left < body.left - 0.6 || sb.right > body.right + 0.6) F.push(`size: ${P} band outside the body`);
      if (sb.width > 675.6) F.push(`size: ${P} band ${sb.width.toFixed(0)} > 675`);
    });
    if (cfg.pageMin) { const tally = {}; secs.forEach((sec) => JSON.parse(sec.dataset.lcsClues).forEach((c) => { tally[c.f] = (tally[c.f] || 0) + 1; })); for (const [k, min] of Object.entries(cfg.pageMin)) if ((tally[k] || 0) < min) F.push(`audit: page carries ${tally[k] || 0} ${k} < pageMin ${min}`); }
    if (cfg.maxEither != null) secs.forEach((sec, p) => { const k = JSON.parse(sec.dataset.lcsClues).filter((c) => c.f === 'either').length; if (k > cfg.maxEither) F.push(`audit: case ${p + 1} ${k} either clues > maxEither ${cfg.maxEither}`); });
    if (root.querySelector('[data-lcs-answer]')) F.push('audit: a data-lcs-answer on the page');
    return res;
  }, { SETS, G2_FLOOR, HEAD_PIC: FL.HEAD_PIC, NAME_PX: FL.NAME_PX, TILE_INNER: FL.TILE_INNER, ROW_MAX });
  fails.push(...m.fails);
  const cfg = (inj && inj.cfg) || type.difficulty[job.difficulty];
  if (cfg && m.cases.length && m.cases.length !== cfg.cases) fails.push(`count: ${m.cases.length} cases, config says ${cfg.cases}`);
  const expect = BODY_EXPECT.get(job.strings);
  if (expect != null && Math.abs(m.body - expect) > 1) fails.push(`chrome: body measured ${m.body}, the probe expects ${expect} (vacuous or shifted chrome)`);
  if (job.strings === WORST_CHROME && m.insLines < 3) fails.push(`chrome: WORST_CHROME wrapped to ${m.insLines} instruction lines, not 3 (vacuous)`);
  if ((job.strings === LONG_CHROME || job.strings === WORST_CHROME) && m.titleLines < 3) fails.push(`chrome: the probe title wrapped to ${m.titleLines} lines, not 3 (vacuous)`);
  if ((job.strings === FI4_CHROME || job.strings === COMBO_CHROME) && m.titleLines < 4) fails.push(`chrome: the fi probe title wrapped to ${m.titleLines} lines, not 4 (vacuous)`);
  if (!m.cells) fails.push('non-vacuity: 0 cells measured');
  return { fails, cases: m.cases, body: m.body, insLines: m.insLines, titleLines: m.titleLines, pngPath: out.pngPath, theme: m.theme };
}

/* ---------------- poison helpers (html post-processing on the REAL page; every needle throws when absent) ---------------- */
function caseAttr(h, p, attr, value) {
  const re = new RegExp(`(<section data-ws-content data-lcs-puzzle="${p}"[^>]*?${attr}=)(?:'[^']*'|"[^"]*")`);
  if (!re.test(h)) throw new Error(`NEEDLE MATCHED NOTHING (${attr} of case ${p})`);
  const q = value.includes('"') ? "'" : '"';
  return h.replace(re, `$1${q}${value}${q}`);
}
function setClues(h, p, clues, sol) {
  let out = caseAttr(h, p, 'data-lcs-clues', JSON.stringify(clues).replace(/"/g, '&quot;'));
  if (sol) out = caseAttr(out, p, 'data-lcs-solution', sol.join(','));
  return out;
}

/* ================================================================== E. the Phase-2 faces (2026-09-14; design §3, record _work/G2-319-faces.md)
 * F1 G2-344 + F2 G3-378 run through the BASE path (renderCheck with per-face floors); F3 G1-349,
 * F4 G3-379 and F5 G2-345 through faceCheck: the gate's OWN in-page audit per mode (a third,
 * independent copy of the solvers — never the spec's verify), floors measured, every band above
 * the footer, non-vacuity. Then the face poisons (each must FAIL; the correct face page is the
 * control), incl. the base-deferred P8 / P12 / P15b. P6 ("unique only by case-splitting") is
 * MEASURED VACUOUS at 3×3×3: exhaustive over every unique clue set of the face's kinds (≤ 6
 * clues without `either`: 119,826 sets; ≤ 5 with: 54,924) not one stalls the copy-rule
 * propagation, so no such page can exist at the shipped size; the assertion stays as a guard.
 */
const FACES = [
  { id: 'G2-344', face: 'F1', path: 'base', dir: 'g2', floors: { headPic: 56, namePx: 22, tileInner: 104 }, combo: 'assert', stack: 668 },
  { id: 'G3-378', face: 'F2', path: 'base', dir: 'g3', floors: { headPic: 52, namePx: 18, tileInner: 84 }, combo: 'assert', stack: 676 },
  { id: 'G1-349', face: 'F3', path: 'face', dir: 'g1', combo: 'report', stack: 692 },
  { id: 'G3-379', face: 'F4', path: 'face', dir: 'g3', combo: 'assert', stack: 620 },
  { id: 'G2-345', face: 'F5', path: 'face', dir: 'g2', combo: 'assert', stack: 484 },
];

async function faceCheck(page, type, inj, job, opts) {
  let t = type;
  if (inj) t = { ...type, build: (o, ctx) => type._buildWith(inj.bank || loadBankModule().LOGIC_PUZZLES[o.locale.slice(0, 2)], inj.cfg || type.difficulty[o.difficulty], { theme: o.theme, locale: o.locale }, ctx, inj.sets || null) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({
    type: t, theme: job.theme === undefined ? EXEMPLAR_THEME : job.theme, difficulty: job.difficulty || 2, locale: job.locale, unit: null, strings: job.strings,
    pageSize: job.pageSize, seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const { SETS } = loadBankModule();
  const m = await page.evaluate(({ SETS, ROW_MAX }) => {
    const res = { fails: [], cases: [], cells: 0, mode: null };
    const F = res.fails;
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.insLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    res.titleLines = Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33);
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const root = document.querySelector('[data-lcs-type="G2-319"]');
    if (!root) { F.push('no root'); return res; }
    const mode = root.dataset.lcsMode; res.mode = mode;
    if (!mode) { F.push('audit: no data-lcs-mode on a face page'); return res; }
    const cfg = JSON.parse(root.dataset.lcsCfg);
    res.cfg = cfg;
    const theme = root.dataset.lcsTheme; res.theme = theme;
    const allow = SETS.distinct[theme] || [];
    const badPairs = new Set(SETS.confusable.map(([a, b]) => [a, b].sort().join('|')));
    const floor = mode === 'picture' ? 44 : 36;
    // own solvers
    const perms = (n) => { const out = []; const go = (rest, acc) => { if (!rest.length) return out.push(acc); for (let i = 0; i < rest.length; i++) go(rest.slice(0, i).concat(rest.slice(i + 1)), acc.concat(rest[i])); }; go([...Array(n).keys()], []); return out; };
    const ok1 = (c, s) => c.k === 'neg' ? s[c.a] !== c.v : c.k === 'pos' ? s[c.a] === c.v : c.k === 'either' ? (c.v[0] === s[c.a] || c.v[1] === s[c.a]) : false;
    const surv1 = (clues, n) => perms(n).filter((s) => clues.every((c) => ok1(c, s)));
    const prop1 = (clues, n) => {
      const T = [...Array(n)].map(() => Array(n).fill(1));
      clues.forEach((c) => { if (c.k === 'neg') T[c.a][c.v] = 0; if (c.k === 'pos') { for (let j = 0; j < n; j++) if (j !== c.v) T[c.a][j] = 0; for (let i = 0; i < n; i++) if (i !== c.a) T[i][c.v] = 0; } if (c.k === 'either') for (let j = 0; j < n; j++) if (j !== c.v[0] && j !== c.v[1]) T[c.a][j] = 0; });
      let moved = true;
      while (moved) { moved = false; for (let i = 0; i < n; i++) { const js = T[i].map((x, j) => (x ? j : -1)).filter((j) => j >= 0); if (js.length === 1) for (let r = 0; r < n; r++) if (r !== i && T[r][js[0]]) { T[r][js[0]] = 0; moved = true; } } for (let j = 0; j < n; j++) { const is = T.map((row, i) => (row[j] ? i : -1)).filter((i) => i >= 0); if (is.length === 1) for (let c = 0; c < n; c++) if (c !== j && T[is[0]][c]) { T[is[0]][c] = 0; moved = true; } } }
      return T.map((row) => { const js = row.map((x, j) => (x ? j : -1)).filter((j) => j >= 0); return js.length === 1 ? js[0] : -1; });
    };
    // two-attribute: a state is a pair of permutations; a pc clue reads through the child who has that attr-1 picture
    const ok2 = (c, S) => { if (c.g === 'pc') { const a = S.np.indexOf(c.a); const has = S.nc[a] === c.v; return c.k === 'neg' ? !has : has; } const v = S[c.g][c.a]; return c.k === 'neg' ? v !== c.v : c.k === 'either' ? c.v.includes(v) : v === c.v; };
    const surv2 = (clues, n) => { const P = perms(n), out = []; for (const np of P) for (const nc of P) if (clues.every((c) => ok2(c, { np, nc }))) out.push({ np, nc }); return out; };
    const prop2 = (clues, n) => {
      const T = { np: [...Array(n)].map(() => Array(n).fill(1)), nc: [...Array(n)].map(() => Array(n).fill(1)), pc: [...Array(n)].map(() => Array(n).fill(1)) };
      const zero = (g, r, c) => { if (T[g][r][c]) { T[g][r][c] = 0; return true; } return false; };
      const set = (g, r, c) => { let m = false; for (let j = 0; j < n; j++) if (j !== c) m = zero(g, r, j) || m; for (let i = 0; i < n; i++) if (i !== r) m = zero(g, i, c) || m; return m; };
      clues.forEach((c) => { if (c.k === 'neg') zero(c.g, c.a, c.v); else if (c.k === 'pos') set(c.g, c.a, c.v); else if (c.k === 'either') { for (let j = 0; j < n; j++) if (!c.v.includes(j)) zero(c.g, c.a, j); } });
      const one = (g, r) => { const js = T[g][r].map((x, j) => (x ? j : -1)).filter((j) => j >= 0); return js.length === 1 ? js[0] : -1; };
      let moved = true, guard = 0;
      while (moved && guard++ < 200) {
        moved = false;
        for (const g of ['np', 'nc', 'pc']) {
          for (let r = 0; r < n; r++) { const j = one(g, r); if (T[g][r].every((x) => !x)) return null; if (j >= 0) moved = set(g, r, j) || moved; }
          for (let j = 0; j < n; j++) { const is = T[g].map((row, i) => (row[j] ? i : -1)).filter((i) => i >= 0); if (!is.length) return null; if (is.length === 1) moved = set(g, is[0], j) || moved; }
        }
        for (let a = 0; a < n; a++) { const p = one('np', a); if (p >= 0) for (let c = 0; c < n; c++) { if (!T.nc[a][c]) moved = zero('pc', p, c) || moved; if (!T.pc[p][c]) moved = zero('nc', a, c) || moved; } }
        for (let a = 0; a < n; a++) { const c = one('nc', a); if (c >= 0) for (let p = 0; p < n; p++) { if (!T.np[a][p]) moved = zero('pc', p, c) || moved; if (!T.pc[p][c]) moved = zero('np', a, p) || moved; } }
        for (let p = 0; p < n; p++) { const c = one('pc', p); if (c >= 0) for (let a = 0; a < n; a++) { if (!T.np[a][p]) moved = zero('nc', a, c) || moved; if (!T.nc[a][c]) moved = zero('np', a, p) || moved; } }
      }
      const np = [...Array(n).keys()].map((r) => one('np', r)), nc = [...Array(n).keys()].map((r) => one('nc', r));
      return np.every((x) => x >= 0) && nc.every((x) => x >= 0) ? { np, nc } : null;
    };
    const truth = (st, sol) => st.k === 'has' || st.k === 'holderIs' ? sol[st.a] === st.v : st.k === 'hasNot' ? sol[st.a] !== st.v : st.k === 'either' ? st.v.includes(sol[st.a]) : false;

    const keyEl = root.querySelector('.ws-logic-markkey');
    if (mode === 'read' ? keyEl : !keyEl) F.push(`audit: markKey ${keyEl ? 'present on read' : 'missing'}`);
    if (keyEl && keyEl.querySelector('[data-lcs-cell],[data-lcs-clues],[data-lcs-solution],[data-lcs-answer],[data-lcs-mark]')) F.push('audit: markKey carries ground truth');
    const secs = [...root.querySelectorAll('section[data-lcs-puzzle]')];
    const wantCases = mode === 'two-attr' ? 1 : 2;
    if (secs.length !== wantCases) F.push(`audit: ${secs.length} cases, want ${wantCases}`);
    const namesSeen = new Map(), picsSeen = new Map();
    secs.forEach((sec, p) => {
      const P = `case ${p + 1}`;
      const n = +sec.dataset.lcsSize;
      const forms = JSON.parse(sec.dataset.lcsForms);
      const names = sec.dataset.lcsNames.split(',').map(Number);
      const pics = sec.dataset.lcsPics.split(',');
      const nouns = sec.dataset.lcsNouns.split(',');
      const rec = { names, pics, kinds: [], clues: 0 };
      res.cases.push(rec);
      names.forEach((i) => { if (namesSeen.has(i)) F.push(`audit: name ${i} in ${P} and case ${namesSeen.get(i) + 1}`); namesSeen.set(i, p); });
      pics.forEach((k) => { if (picsSeen.has(k)) F.push(`audit: picture ${k} in ${P} and case ${picsSeen.get(k) + 1}`); picsSeen.set(k, p); });
      pics.forEach((k) => { if (!allow.includes(k)) F.push(`audit: ${P} picture "${k}" off the ${theme} allowlist`); });
      for (let i = 0; i < pics.length; i++) for (let j = i + 1; j < pics.length; j++) if (badPairs.has([pics[i], pics[j]].sort().join('|'))) F.push(`audit: ${P} confusable ${pics[i]}/${pics[j]}`);
      const grid = sec.querySelector('[data-lcs-grid]');
      if (!grid) { F.push(`audit: ${P} no grid`); return; }
      const gb = grid.getBoundingClientRect();
      const cells = [...grid.querySelectorAll('[data-lcs-cell]')];
      cells.forEach((c) => {
        res.cells++;
        const r = c.getBoundingClientRect();
        if (r.width < cfg.cell - 0.6 || r.height < cfg.cell - 0.6) F.push(`size: ${P} cell ${r.width.toFixed(0)} < cfg ${cfg.cell}`);
        if (r.width < floor) F.push(`size: ${P} cell below the floor ${floor}`);
        if (c.childNodes.length || c.getAttribute('class') || (c.textContent || '').trim()) F.push(`audit: ${P} cell ${c.dataset.lcsCell} not empty`);
      });
      const heads = [...grid.querySelectorAll('img[data-lcs-col]')];
      const headSrc = [];
      heads.forEach((im) => {
        const j = +im.dataset.lcsCol; headSrc[j] = im.src;
        const r = im.getBoundingClientRect();
        if (r.width < cfg.picPx - 0.6) F.push(`size: ${P} header picture ${r.width.toFixed(0)} < ${cfg.picPx}`);
        if (!im.complete || !im.naturalWidth) F.push(`audit: ${P} header picture ${j} broken`);
        if (j < n) { const file = decodeURIComponent(im.src.split('/').pop()); if (!file.startsWith(nouns[j] + '@') && !file.startsWith(nouns[j] + '.')) F.push(`audit: ${P} header ${j} file ${file} != noun ${nouns[j]}`); }
      });
      const labels = [...grid.querySelectorAll('text[data-lcs-row]')];
      if (labels.length !== n) F.push(`audit: ${P} ${labels.length} tiles`);
      labels.forEach((t) => {
        const r = +t.dataset.lcsRow;
        if (t.textContent !== forms[r].nom) F.push(`audit: ${P} tile ${r} "${t.textContent}" != "${forms[r].nom}"`);
        if (t.getComputedTextLength() > cfg.tileInner + 0.5) F.push(`size: ${P} tile "${t.textContent}" ${t.getComputedTextLength().toFixed(1)} > ${cfg.tileInner}`);
        if (parseFloat(getComputedStyle(t).fontSize) < (cfg.tileInner < 100 ? 18 : 22) - 0.1) F.push(`size: ${P} tile font ${getComputedStyle(t).fontSize}`);
      });
      const sb = sec.getBoundingClientRect();
      if (sb.bottom > foot + 0.6) F.push(`size: ${P} band bottom ${sb.bottom.toFixed(0)} below the footer ${foot.toFixed(0)}`);
      if (sb.left < body.left - 0.6 || sb.right > body.right + 0.6) F.push(`size: ${P} band outside the body`);
      if (gb.bottom > foot + 0.6) F.push(`size: ${P} grid below the footer`);

      if (mode === 'picture') {
        const sol = sec.dataset.lcsSolution.split(',').map(Number);
        const clues = JSON.parse(sec.dataset.lcsClues);
        rec.kinds = clues.map((c) => c.f); rec.clues = clues.length; rec.sol = sol;
        if (grid.dataset.lcsMode !== 'blank') F.push(`audit: ${P} grid mode ${grid.dataset.lcsMode}`);
        if (cells.length !== n * n) F.push(`audit: ${P} ${cells.length} cells`);
        if (grid.querySelector('[data-lcs-mark]')) F.push(`audit: ${P} a mark on the grid`);
        if (sol.every((v, i) => v === i)) F.push(`audit: ${P} identity solution`);
        const S = surv1(clues, n);
        if (S.length !== 1) F.push(`audit: ${P} ${S.length} solutions`); else if (S[0].join() !== sol.join()) F.push(`audit: ${P} solver ${S[0]} != stamp ${sol}`);
        clues.forEach((_, i) => { if (surv1(clues.filter((__, j) => j !== i), n).length === 1) F.push(`audit: ${P} clue ${i + 1} redundant`); });
        if (prop1(clues, n).join() !== sol.join()) F.push(`audit: ${P} propagation stops`);
        if (clues.length < cfg.clues[0] || clues.length > cfg.clues[1]) F.push(`audit: ${P} ${clues.length} clues outside [${cfg.clues}]`);
        const by = {}; clues.forEach((c) => { by[c.f] = (by[c.f] || 0) + 1; if (!cfg.kinds.includes(c.f) || (c.f !== 'neg' && c.f !== 'pos')) F.push(`audit: ${P} kind ${c.f}`); });
        if (cfg.maxPos != null && (by.pos || 0) > cfg.maxPos) F.push(`audit: ${P} pos > maxPos`);
        const col = sec.querySelector('[data-lcs-cluecol]');
        if (!col) { F.push(`audit: ${P} no clue block`); return; }
        if (col.querySelector('p, [data-lcs-clue-text]')) F.push(`audit: ${P} a sentence element in the picture-clue block`);
        const nameSet = new Set(forms.map((f) => f.nom));
        const w = document.createTreeWalker(col, NodeFilter.SHOW_TEXT); let tn;
        while ((tn = w.nextNode())) { const t = tn.textContent.trim(); if (t && !nameSet.has(t)) F.push(`audit: ${P} text "${t.slice(0, 20)}" in the picture-clue block`); }
        const rows = [...col.querySelectorAll('[data-lcs-clue]')];
        if (rows.length !== clues.length) F.push(`audit: ${P} ${rows.length} rows for ${clues.length} clues`);
        let hasN = 0;
        rows.forEach((row) => {
          const i = +row.dataset.lcsClue; const c = clues[i]; if (!c) { F.push(`audit: ${P} row ${i} unstamped`); return; }
          const not = row.hasAttribute('data-lcs-not'), has = row.hasAttribute('data-lcs-has');
          if (not === has) F.push(`audit: ${P} row ${i + 1} not/has stamp`);
          if ((c.k === 'neg') !== not) F.push(`audit: ${P} row ${i + 1} pictogram ${not ? 'not' : 'has'} != stamped ${c.k}`);
          if (has) hasN++;
          if (not !== !!row.querySelector('[data-lcs-notmark]')) F.push(`audit: ${P} row ${i + 1} cross mark ${not ? 'missing' : 'on a has-clue'}`);
          const tile = row.querySelector('[data-lcs-nametile]');
          if (!tile || tile.textContent.trim() !== forms[c.a].nom) F.push(`audit: ${P} row ${i + 1} name tile`);
          const im = row.querySelector('img[data-lcs-pic]');
          if (!im || +im.dataset.lcsPic !== c.v || im.src !== headSrc[c.v]) F.push(`audit: ${P} row ${i + 1} picture is not column ${c.v}`);
          if (im) { const r = im.getBoundingClientRect(); if (r.width < floor) F.push(`size: ${P} row ${i + 1} picture ${r.width.toFixed(0)} < ${floor}`); }
          const ring = row.querySelector('[data-lcs-ring]'); const rb = ring && ring.getBoundingClientRect();
          if (!rb || rb.width < cfg.ring - 0.6) F.push(`size: ${P} row ${i + 1} ring`);
          const rr = row.getBoundingClientRect();
          if (rr.height > ROW_MAX) F.push(`size: ${P} row ${i + 1} ${rr.height.toFixed(0)} > ${ROW_MAX}`);
          if (rr.right > gb.left - 19.4) F.push(`size: ${P} row ${i + 1} runs into the grid`);
        });
        if (hasN > 1) F.push(`audit: ${P} ${hasN} has-clues`);
        if (col.scrollHeight > gb.height + 0.6) F.push(`size: ${P} clue block taller than the grid`);
        const slots = [...sec.querySelectorAll('[data-lcs-answer-slot]')];
        if (slots.length !== n) F.push(`audit: ${P} ${slots.length} answer chips`);
        slots.forEach((ch) => {
          const r = +ch.dataset.lcsAnswerSlot;
          if (ch.hasAttribute('data-lcs-answer') || ch.querySelector('svg, [data-lcs-mark], [data-lcs-answer]')) F.push(`audit: ${P} chip ${r} marked`);
          const imgs = [...ch.querySelectorAll('img')];
          if (imgs.length !== n) F.push(`audit: ${P} chip ${r} ${imgs.length} pictures`);
          imgs.forEach((im, j) => { if (im.src !== headSrc[j]) F.push(`audit: ${P} chip ${r} picture ${j} out of column order`); const b = im.getBoundingClientRect(); if (b.width < cfg.bankPic - 0.6 || b.width < floor) F.push(`size: ${P} chip picture ${b.width.toFixed(0)}`); });
          const nm = ch.querySelector('span'); if (!nm || nm.textContent.trim() !== forms[r].nom) F.push(`audit: ${P} chip ${r} name`);
          const cb = ch.getBoundingClientRect(); if (cb.bottom > foot + 0.6) F.push(`size: ${P} chip ${r} below the footer`);
          [...ch.querySelectorAll('img, span')].forEach((el) => { const b = el.getBoundingClientRect(); if (b.width && (b.right > cb.right + 0.6 || b.left < cb.left - 0.6 || b.top < cb.top - 0.6 || b.bottom > cb.bottom + 0.6)) F.push(`size: ${P} chip ${r} content outside the chip`); });
        });
      }

      if (mode === 'two-attr') {
        const m = /^np:([\d,]+);nc:([\d,]+)$/.exec(sec.dataset.lcsSolution || '');
        if (!m) { F.push(`audit: ${P} solution stamp shape`); return; }
        const S = { np: m[1].split(',').map(Number), nc: m[2].split(',').map(Number) };
        const clues = JSON.parse(sec.dataset.lcsClues);
        rec.kinds = clues.map((c) => c.f); rec.clues = clues.length; rec.sol = S; rec.attr2 = sec.dataset.lcsAttr2;
        const pics2 = sec.dataset.lcsPics2.split(','), nouns2 = sec.dataset.lcsNouns2.split(',');
        const attr2 = sec.dataset.lcsAttr2;
        if (attr2 === theme || attr2 !== cfg.attr2 || attr2 !== root.dataset.lcsAttr2) F.push(`audit: ${P} attr2 ${attr2} (theme ${theme}, cfg ${cfg.attr2})`);
        const allow2 = SETS.distinct[attr2] || [];
        pics2.forEach((k) => { if (!allow2.includes(k)) F.push(`audit: ${P} picture "${k}" off the ${attr2} allowlist`); });
        const six = pics.concat(pics2);
        if (new Set(six).size !== 6) F.push(`audit: ${P} a picture in both attributes`);
        for (let i = 0; i < six.length; i++) for (let j = i + 1; j < six.length; j++) if (badPairs.has([six[i], six[j]].sort().join('|'))) F.push(`audit: ${P} confusable ${six[i]}/${six[j]}`);
        const pc = S.np.map((p, a) => [p, S.nc[a]]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
        for (const [g, s] of [['np', S.np], ['nc', S.nc], ['pc', pc]]) { if (s.length !== n || new Set(s).size !== n) F.push(`audit: ${P} ${g} not a permutation`); if (s.every((v, i) => v === i)) F.push(`audit: ${P} ${g} identity`); }
        if (grid.dataset.lcsLgrid !== 'np,nc,pc') F.push(`audit: ${P} not the three-body grid`);
        if (cells.length !== 3 * n * n) F.push(`audit: ${P} ${cells.length} cells, want ${3 * n * n}`);
        for (const g of ['np', 'nc', 'pc']) if (cells.filter((c) => c.dataset.lcsBody === g).length !== n * n) F.push(`audit: ${P} body ${g} cell count`);
        if (grid.querySelector('[data-lcs-mark]')) F.push(`audit: ${P} a mark on the grid`);
        if (heads.length !== 2 * n) F.push(`audit: ${P} ${heads.length} header pictures, want ${2 * n}`);
        const rowPics = [...grid.querySelectorAll('img[data-lcs-rowpic]')];
        if (rowPics.length !== n) F.push(`audit: ${P} ${rowPics.length} row pictures`);
        rowPics.forEach((im) => { const k = +im.dataset.lcsRowpic; if (im.src !== headSrc[n + k]) F.push(`audit: ${P} row picture ${k} != attr-2 header ${k}`); const r = im.getBoundingClientRect(); if (r.width < cfg.picPx - 0.6) F.push(`size: ${P} row picture ${k}`); });
        for (let j = 0; j < n; j++) { const file = headSrc[n + j] ? decodeURIComponent(headSrc[n + j].split('/').pop()) : ''; if (!file.startsWith(nouns2[j] + '@') && !file.startsWith(nouns2[j] + '.')) F.push(`audit: ${P} attr-2 header ${j} file ${file} != ${nouns2[j]}`); }
        const T2 = surv2(clues, n);
        if (T2.length !== 1) F.push(`audit: ${P} ${T2.length} states`); else if (T2[0].np.join() !== S.np.join() || T2[0].nc.join() !== S.nc.join()) F.push(`audit: ${P} solver state != stamp`);
        clues.forEach((_, i) => { if (surv2(clues.filter((__, j) => j !== i), n).length === 1) F.push(`audit: ${P} clue ${i + 1} redundant`); });
        const pr = prop2(clues, n);
        if (!pr || pr.np.join() !== S.np.join() || pr.nc.join() !== S.nc.join()) F.push(`audit: ${P} propagation with the copy rule stops (case-splitting)`);
        if (clues.length < cfg.clues[0] || clues.length > cfg.clues[1]) F.push(`audit: ${P} ${clues.length} clues outside [${cfg.clues}]`);
        const by = {};
        clues.forEach((c, i) => {
          by[c.f] = (by[c.f] || 0) + 1;
          if (!cfg.kinds.includes(c.f)) F.push(`audit: ${P} kind ${c.f} outside cfg`);
          if (!ok2(c, S)) F.push(`audit: ${P} clue ${i + 1} false`);
          if ((c.f === 'cross' || c.f === 'crossNot') !== (c.g === 'pc')) F.push(`audit: ${P} clue ${i + 1} ${c.f} on ${c.g}`);
        });
        if (!clues.some((c) => c.g === 'pc')) F.push(`audit: ${P} no linking clue`);
        if (cfg.maxPos != null && (by.pos || 0) > cfg.maxPos) F.push(`audit: ${P} pos > maxPos`);
        if (cfg.minCross != null && (by.cross || 0) < cfg.minCross) F.push(`audit: ${P} cross < minCross`);
        const rows = [...sec.querySelectorAll('[data-lcs-clue]')];
        if (rows.length !== clues.length) F.push(`audit: ${P} ${rows.length} rows for ${clues.length} clues`);
        rows.forEach((row) => {
          const i = +row.dataset.lcsClue; const c = clues[i]; if (!c) { F.push(`audit: ${P} row ${i} unstamped`); return; }
          const txt = row.textContent;
          if (c.g !== 'pc') { const lit = c.f === 'holderNot' ? forms[c.a].nom : (forms[c.a].ade || forms[c.a].nom); if (!txt.includes(lit)) F.push(`audit: ${P} row ${i + 1} lacks "${lit}"`); }
          else if (forms.some((f) => txt.includes(f.nom))) F.push(`audit: ${P} linking row ${i + 1} names a child`);
          const want = c.g === 'pc' ? (c.rev ? [n + c.v, c.a] : [c.a, n + c.v]) : (Array.isArray(c.v) ? c.v : [c.v]).map((v) => (c.g === 'np' ? v : n + v));
          const imgs = [...row.querySelectorAll('img')];
          if (imgs.length !== want.length) F.push(`audit: ${P} row ${i + 1} ${imgs.length} pictures for ${want.length}`);
          imgs.forEach((im, q) => { if (im.src !== headSrc[want[q]]) F.push(`audit: ${P} row ${i + 1} picture ${q} is not column ${want[q]}`); const r = im.getBoundingClientRect(); if (r.width < cfg.inlinePic - 0.6) F.push(`size: ${P} inline picture ${r.width.toFixed(0)}`); });
          const badge = row.querySelector('span'); const bb = badge.getBoundingClientRect(); if (bb.width < 25.4) F.push(`size: ${P} badge`);
          const rb = row.getBoundingClientRect();
          if (rb.height > ROW_MAX) F.push(`size: ${P} row ${i + 1} ${rb.height.toFixed(0)} > ${ROW_MAX}`);
          if (rb.width > cfg.colW + 0.6) F.push(`size: ${P} row ${i + 1} wider than the column`);
          [...row.querySelectorAll('img, span')].forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > rb.right + 0.6 || r.left < rb.left - 0.6)) F.push(`size: ${P} row ${i + 1} content outside the row`); });
        });
        const col = sec.querySelector('[data-lcs-cluecol]'); const cb = col.getBoundingClientRect();
        if (cb.height > 196.6) F.push(`size: ${P} clue block ${cb.height.toFixed(0)} > 196`);
        if (cb.bottom > gb.top - 19.4) F.push(`size: ${P} clue block runs into the grid`);
        if (sec.querySelector('[data-lcs-answer-slot]')) F.push(`audit: ${P} answer chips on a no-strip face`);
      }

      if (mode === 'read') {
        const sol = sec.dataset.lcsSolved.split(',').map(Number);
        const stmts = JSON.parse(sec.dataset.lcsStmts);
        const tr = sec.dataset.lcsTruth.split(',').map(Number);
        rec.kinds = stmts.map((s) => s.k); rec.clues = stmts.length; rec.sol = sol; rec.trueCount = tr.reduce((x, y) => x + y, 0);
        if (sol.length !== n || new Set(sol).size !== n) F.push(`audit: ${P} solved not a permutation`);
        if (sol.every((v, i) => v === i)) F.push(`audit: ${P} identity solved grid`);
        if (grid.dataset.lcsMode !== 'solved') F.push(`audit: ${P} grid mode ${grid.dataset.lcsMode}`);
        if (cells.length !== n * n) F.push(`audit: ${P} ${cells.length} cells`);
        const marks = [...grid.querySelectorAll('[data-lcs-mark]')];
        if (marks.length !== n * n) F.push(`audit: ${P} ${marks.length} marks`);
        const seen = new Set();
        marks.forEach((mk) => {
          const m2 = /^(\d+):(\d+):(\d+)$/.exec(mk.dataset.lcsMarkCell || ''); if (!m2 || +m2[1] !== p) { F.push(`audit: ${P} mark cell stamp`); return; }
          const r = +m2[2], c = +m2[3]; const k = r + ':' + c; if (seen.has(k)) F.push(`audit: ${P} two marks in ${k}`); seen.add(k);
          const want = sol[r] === c ? '1' : '0';
          if (mk.dataset.lcsMark !== want) F.push(`audit: ${P} cell ${k} prints the wrong mark`);
          const st = (mk.querySelector('path') || {}).getAttribute ? (mk.querySelector('path').getAttribute('stroke') || '').toUpperCase() : '';
          if (want === '1' ? st !== '#146B5E' : st !== '#F2784B') F.push(`audit: ${P} mark ${k} colour ${st}`);
          const mb = mk.getBoundingClientRect(); if (mb.width < cfg.cell * 0.35) F.push(`size: ${P} mark ${k} ${mb.width.toFixed(0)} < 35 % of the cell`);
        });
        if (stmts.length !== cfg.statements || tr.length !== stmts.length) F.push(`audit: ${P} ${stmts.length} statements / ${tr.length} truths`);
        const keys = new Set(), pairs = new Set(); let nobody = 0;
        stmts.forEach((st, i) => {
          if (!cfg.stmtKinds.includes(st.k)) F.push(`audit: ${P} statement ${i + 1} kind ${st.k}`);
          if (st.k === 'nobody') nobody++;
          const key = st.k + ':' + st.a + ':' + JSON.stringify(st.v); if (keys.has(key)) F.push(`audit: ${P} statement ${i + 1} repeats`); keys.add(key);
          if (st.k !== 'nobody' && st.k !== 'either') { const pr2 = st.a + ':' + st.v; if (pairs.has(pr2)) F.push(`audit: ${P} statement ${i + 1} re-uses pair ${pr2}`); pairs.add(pr2); }
          if ((truth(st, sol) ? 1 : 0) !== tr[i]) F.push(`audit: ${P} statement ${i + 1} truth stamp wrong`);
        });
        if (rec.trueCount < cfg.trueRange[0] || rec.trueCount > cfg.trueRange[1]) F.push(`audit: ${P} ${rec.trueCount} true outside [${cfg.trueRange}]`);
        if (cfg.maxNobody != null && nobody > cfg.maxNobody) F.push(`audit: ${P} nobody > max`);
        const rows = [...sec.querySelectorAll('[data-lcs-stmt]')];
        if (rows.length !== stmts.length) F.push(`audit: ${P} ${rows.length} rows for ${stmts.length} statements`);
        rows.forEach((row) => {
          const i = +row.dataset.lcsStmt; const st = stmts[i]; if (!st) { F.push(`audit: ${P} row ${i} unstamped`); return; }
          if (st.a >= 0) { const lit = st.k === 'holderIs' ? forms[st.a].nom : (forms[st.a].ade || forms[st.a].nom); if (!row.textContent.includes(lit)) F.push(`audit: ${P} statement ${i + 1} lacks "${lit}"`); }
          const want = Array.isArray(st.v) ? st.v : [st.v];
          const imgs = [...row.querySelectorAll('img')];
          if (imgs.length !== want.length) F.push(`audit: ${P} statement ${i + 1} ${imgs.length} pictures`);
          imgs.forEach((im, q) => { if (im.src !== headSrc[want[q]]) F.push(`audit: ${P} statement ${i + 1} picture ${q} is not column ${want[q]}`); const r = im.getBoundingClientRect(); if (r.width < cfg.inlinePic - 0.6) F.push(`size: ${P} statement picture ${r.width.toFixed(0)}`); });
          const gl = [...row.querySelectorAll('[data-lcs-glyph]')];
          if (gl.length !== 2 || gl[0].dataset.lcsGlyph !== 'yes' || gl[1].dataset.lcsGlyph !== 'no') F.push(`audit: ${P} statement ${i + 1} glyph pair`);
          gl.forEach((g) => {
            if (g.hasAttribute('data-lcs-answer') || g.querySelector('circle,[data-lcs-answer],[data-lcs-mark]')) F.push(`audit: ${P} statement ${i + 1} glyph carries an answer`);
            if (getComputedStyle(g).backgroundColor !== 'rgb(255, 255, 255)') F.push(`audit: ${P} statement ${i + 1} glyph ${g.dataset.lcsGlyph} filled`);
            const r = g.getBoundingClientRect(); if (r.width < cfg.glyph - 0.6) F.push(`size: ${P} glyph ${r.width.toFixed(0)} < ${cfg.glyph}`);
            const mk = g.querySelector('[data-lcs-glyphmark]'); if (!mk || mk.dataset.lcsGlyphmark !== g.dataset.lcsGlyph) F.push(`audit: ${P} glyph ${g.dataset.lcsGlyph} mark`);
          });
          const rb = row.getBoundingClientRect();
          if (rb.height > ROW_MAX) F.push(`size: ${P} statement ${i + 1} ${rb.height.toFixed(0)} > ${ROW_MAX}`);
          if (rb.right > gb.left - 19.4) F.push(`size: ${P} statement ${i + 1} runs into the grid`);
          [...row.querySelectorAll('img, span')].forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > rb.right + 0.6 || r.left < rb.left - 0.6)) F.push(`size: ${P} statement ${i + 1} content outside the row`); });
        });
        if (sb.height > cfg.bandMax + 0.6) F.push(`size: ${P} band ${sb.height.toFixed(0)} > ${cfg.bandMax}`);
        if (sec.querySelector('[data-lcs-answer-slot],[data-lcs-clue]')) F.push(`audit: ${P} chips / clue rows on a read page`);
      }
    });
    if (root.querySelector('[data-lcs-answer]')) F.push('audit: a data-lcs-answer on the page');
    return res;
  }, { SETS, ROW_MAX });
  fails.push(...m.fails);
  const expect = BODY_EXPECT.get(job.strings);
  if (expect != null && Math.abs(m.body - expect) > 1) fails.push(`chrome: body measured ${m.body}, the probe expects ${expect} (vacuous or shifted chrome)`);
  if (job.strings === WORST_CHROME && m.insLines < 3) fails.push('chrome: WORST_CHROME wrapped to fewer than 3 instruction lines (vacuous)');
  if ((job.strings === LONG_CHROME || job.strings === WORST_CHROME) && m.titleLines < 3) fails.push('chrome: the probe title wrapped to fewer than 3 lines (vacuous)');
  if ((job.strings === FI4_CHROME || job.strings === COMBO_CHROME) && m.titleLines < 4) fails.push('chrome: the fi probe title wrapped to fewer than 4 lines (vacuous)');
  if (!m.cells) fails.push('non-vacuity: 0 cells measured');
  if (!m.cases.length) fails.push('non-vacuity: 0 cases measured');
  return { fails, cases: m.cases, body: m.body, insLines: m.insLines, titleLines: m.titleLines, pngPath: out.pngPath, theme: m.theme, mode: m.mode, cfg: m.cfg };
}

/** Section E: renders + sweep for every face, then the face poisons. Returns {killed, total}. */
async function runFaces(page, note, addAssertions, report, seeds, bankAll, SETS) {
  const loc = 'en';
  const rowsMod = require('../tools/b3var-rows/logic-puzzles.js');
  const killedList = [];
  const poisons = [];
  for (const fc of FACES) {
    const type = loadType(fc.id);
    const row = rowsMod.ROWS.find((r) => r[1] === fc.id);
    note(!!row, `${fc.id}: no row in tools/b3var-rows/logic-puzzles.js`);
    if (row) {
      const S = bankAll.en.strings[fc.face];
      note(S && row[6] === S.title && row[7] === S.instruction, `${fc.id}: the row's EN title/instruction ≠ bank strings.${fc.face} (two sources)`);
      note(type.i18n.en.title === row[6] && type.i18n.en.instruction === row[7], `${fc.id}: the emitted spec's i18n ≠ the row (re-run gen-b3var-specs)`);
    }
    note(type.gradeBand === fc.dir.toUpperCase(), `${fc.id}: gradeBand ${type.gradeBand} ≠ ${fc.dir.toUpperCase()}`);
    const D = type.difficulty[2];
    note(JSON.stringify(type.difficulty[1]) === JSON.stringify(D) && JSON.stringify(type.difficulty[3]) === JSON.stringify(D), `${fc.id}: the three levels differ (a face is one config)`);
    const check = fc.path === 'base' ? (p, t, inj, job, o) => renderCheck(p, t, inj, job, { ...(o || {}), floors: fc.floors }) : faceCheck;
    const renders = [{ baseName: `${fc.id}-d2-${loc}`, tag: 'ship' }];
    for (const t of SETS.fan.filter((x) => x !== EXEMPLAR_THEME)) renders.push({ theme: t, baseName: `${fc.id}-d2-${loc}-${t.replace(/\s+/g, '_')}`, tag: 'theme' });
    for (const [name, strings] of [['longchrome', LONG_CHROME], ['worstchrome', WORST_CHROME], ['fi4title', FI4_CHROME]]) renders.push({ strings, pageSize: 'a4', baseName: `${fc.id}-${loc}-${name}`, tag: name });
    if (fc.combo === 'assert') renders.push({ strings: COMBO_CHROME, pageSize: 'a4', baseName: `${fc.id}-${loc}-combo677`, tag: 'combo' });
    for (let s = 2; s <= seeds; s++) renders.push({ seedEpoch: s, baseName: `${fc.id}-d2-${loc}-seed${s}`, tag: 'seed' });
    const pages = new Map(), kindsSeen = new Set(), trueCounts = new Set(), attr2Seen = new Set();
    for (const job of renders) {
      let r;
      try { r = await check(page, type, null, { difficulty: 2, locale: loc, ...job }); } catch (e) { r = { thrown: e.message }; }
      note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
      if (r.thrown) { console.log(`[E] ${job.baseName}: THREW ${r.thrown}`); continue; }
      addAssertions(40 + 12 * r.cases.reduce((s2, c) => s2 + c.clues, 0));
      note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
      for (const c of r.cases) { for (const k of c.kinds) kindsSeen.add(k); if (c.trueCount != null) trueCounts.add(c.trueCount); if (c.attr2) attr2Seen.add(job.theme || EXEMPLAR_THEME + '>' + c.attr2); }
      if (fc.face === 'F1' && r.cases.length) { const all = r.cases.flatMap((c) => c.kinds); note(all.includes('pos') && all.includes('either'), `${job.baseName}: the page lacks a pos or an either clue (pageMin)`); }
      if (fc.face === 'F3' && r.cases.length) { const all = r.cases.flatMap((c) => c.kinds); note(all.includes('pos') && all.includes('neg'), `${job.baseName}: the page lacks a ringed (pos) or a crossed-out (neg) picture`); }
      if (fc.face === 'F4' && r.cases.length) { const want = (job.theme || EXEMPLAR_THEME) === 'fruits' ? 'pets' : 'fruits'; note(r.cases[0].attr2 === want, `${job.baseName}: attr2 ${r.cases[0].attr2} ≠ ${want}`); }
      if (job.tag === 'seed' || job.tag === 'ship') { const key = r.cases.map((c) => `${c.names}/${c.pics}/${JSON.stringify(c.sol)}/${c.kinds}`).join(';'); const prev = pages.get(key); note(!prev, `${job.baseName}: identical page to ${prev}`); pages.set(key, job.baseName); }
      if (job.tag !== 'seed') console.log(`[E] ${job.baseName}: body ${r.body} (${r.titleLines}-line title, ${r.insLines}-line instruction), cases [${r.cases.map((c) => c.pics.join('+') + ':' + c.kinds.join('/') + (c.trueCount != null ? ' true ' + c.trueCount : '')).join(' | ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
    }
    const wantKinds = fc.face === 'F5' ? D.stmtKinds : D.kinds;
    note(wantKinds.every((k) => kindsSeen.has(k)), `${fc.id} sweep never produced kind(s) ${wantKinds.filter((k) => !kindsSeen.has(k))}`);
    if (fc.face === 'F5') note(trueCounts.size >= 2, `${fc.id} sweep: the true count never varied (${[...trueCounts]})`);
    console.log(`[E] ${fc.id} sweep over ${seeds} seeds: ${pages.size} distinct pages, kinds seen ${[...kindsSeen].join('/')}${fc.face === 'F5' ? ', true counts ' + [...trueCounts].sort().join('/') : ''}`);
    if (fc.combo === 'report') {
      let r; try { r = await check(page, type, null, { difficulty: 2, locale: loc, strings: COMBO_CHROME, pageSize: 'a4', baseName: `${fc.id}-${loc}-combo677` }); } catch (e) { r = { thrown: e.message }; }
      const line = r.thrown ? 'THREW ' + r.thrown : `body ${r.body}: ${r.fails.length ? r.fails.join(' | ') : 'ok'}`;
      report.push(`${fc.id} under the 4-line title + 3-line instruction (677, stack ${fc.stack}): ${line}`);
      console.log(`[E] ${fc.id}-${loc}-combo677 (REPORTED, not asserted): ${line}`);
    }
  }

  /* ---- face poisons (each must FAIL; the correct face page is the control) ---- */
  const T = Object.fromEntries(FACES.map((f) => [f.face, loadType(f.id)]));
  const CH = (face) => (FACES.find((f) => f.face === face).path === 'base' ? (p, t, inj, job, o) => renderCheck(p, t, inj, job, { ...(o || {}), floors: FACES.find((f) => f.face === face).floors }) : faceCheck);
  for (const face of ['F1', 'F2', 'F3', 'F4', 'F5']) {
    const c = await CH(face)(page, T[face], null, { difficulty: 2, locale: loc, baseName: `${T[face].id}-control` });
    note(c.fails.length === 0, `${face} control did not pass: ` + c.fails.join(' | '));
  }
  const htmlPoison = (name, face, post, want, job) => poisons.push({ name, run: async () => {
    const r = await CH(face)(page, T[face], (job && job.inj) || null, { difficulty: 2, locale: loc, theme: job && job.theme, strings: job && job.strings, pageSize: job && job.pageSize, baseName: `${T[face].id}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 30).toLowerCase() }, { post });
    return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
  } });
  const buildPoison = (name, face, inj, want, job) => poisons.push({ name, run: async () => { try { await CH(face)(page, T[face], inj, { difficulty: 2, locale: loc, theme: job && job.theme, baseName: `${T[face].id}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 30).toLowerCase() }); return 'silent (rendered)'; } catch (e) { return want.test(e.message) ? null : 'wrong error: ' + e.message; } } });
  const solOf = (h, p) => { const m = new RegExp(`<section data-ws-content data-lcs-puzzle="${p}"[^>]*?data-lcs-solution="(\\d)(?:,(\\d))+"`).exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (solution of case ' + p + ')'); return m[0].match(/data-lcs-solution="([\d,]+)"/)[1].split(',').map(Number); };
  const rootCfg = (h, edit) => { const m = /data-lcs-cfg='([^']*)'/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (root cfg)'); const cfg = JSON.parse(m[1].replace(/&quot;/g, '"')); edit(cfg); return h.replace(m[0], `data-lcs-cfg='${JSON.stringify(cfg).replace(/"/g, '&quot;')}'`); };

  // F1
  htmlPoison('F1 a page short of its page-level quota (pageMin pos:3)', 'F1', (h) => rootCfg(h, (cfg) => { cfg.pageMin = { pos: 3, either: 1 }; }), /pageMin/);
  htmlPoison('F1 a case with no either clue (minEither 1)', 'F1', (h) => { const s = solOf(h, 0); const x = (s[0] + 1) % 3, y = (s[0] + 2) % 3; const z = [0, 1, 2].find((v) => v !== s[1] && v !== s[0]); return setClues(h, 0, [{ k: 'neg', f: 'neg', a: 0, v: x }, { k: 'neg', f: 'neg', a: 0, v: y }, { k: 'neg', f: 'neg', a: 1, v: z }]); }, /minEither/);
  // F2
  htmlPoison('P15b F2 render with a 7th clue row', 'F2', (h) => { const m = /<section data-ws-content data-lcs-puzzle="0"[\s\S]*?(<div data-lcs-clue="0"[\s\S]*?<\/span><\/div>)/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F2 clue row 0)'); const extra = m[1].replace('data-lcs-clue="0"', 'data-lcs-clue="6"'); const col = /(<div data-lcs-cluecol[^>]*>)/.exec(h); if (!col) throw new Error('NEEDLE MATCHED NOTHING (F2 clue column)'); return h.replace(col[1], col[1] + extra); }, /rows for|clue rows|unstamped/);
  htmlPoison('F2 an answer strip on the 4x4 page', 'F2', (h) => { const m = /(<section data-ws-content data-lcs-puzzle="0"[\s\S]*?)(<\/section>)/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F2 case 0)'); return h.replace(m[0], m[1] + '<div data-lcs-answerbank style="display:flex"><div data-lcs-answer-slot="0"><span>x</span></div></div>' + m[2]); }, /answer chips|no-strip/);
  htmlPoison('F2 a case with three either clues (maxEither 2)', 'F2', (h) => { const s = solOf(h, 0); const o = (i) => s[(i + 1) % 4]; return setClues(h, 0, [{ k: 'either', f: 'either', a: 0, v: [s[0], o(0)] }, { k: 'either', f: 'either', a: 1, v: [s[1], o(1)] }, { k: 'either', f: 'either', a: 2, v: [s[2], o(2)] }, { k: 'neg', f: 'neg', a: 3, v: s[0] }, { k: 'neg', f: 'neg', a: 3, v: s[1] }, { k: 'neg', f: 'neg', a: 3, v: s[2] }]); }, /maxEither/);
  buildPoison('F2 with cell 30 (below the G3 floor 36)', 'F2', { cfg: { ...T.F2.difficulty[2], cell: 30, picPx: 30 } }, /G2 floor/);
  // F3
  htmlPoison('P12 F3 with a <p> clue sentence', 'F3', (h) => { const col = /(<div data-lcs-cluecol[^>]*>)/.exec(h); if (!col) throw new Error('NEEDLE MATCHED NOTHING (F3 clue column)'); return h.replace(col[1], col[1] + '<p style="font-size:16px">Mia does not have the parrot.</p>'); }, /sentence element|is not a case name|in the picture-clue block/);
  htmlPoison('F3 a page with no ringed picture (pageMin pos:1)', 'F3', (h) => rootCfg(h, (cfg) => { cfg.pageMin = { pos: 3 }; }), /pageMin/);
  htmlPoison('F3 a case with two has-clues (maxPos 1)', 'F3', (h) => { const s = solOf(h, 0); return setClues(h, 0, [{ k: 'pos', f: 'pos', a: 0, v: s[0] }, { k: 'pos', f: 'pos', a: 1, v: s[1] }]); }, /maxPos|has-clues/);
  htmlPoison('F3 a has-row drawn as a not-row (pictogram ≠ stamp)', 'F3', (h) => { const m = /<div data-lcs-clue="0" data-lcs-not="1"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F3 not-row 0)'); return h.replace(m[0], '<div data-lcs-clue="0" data-lcs-has="1"'); }, /pictogram|cross mark/);
  htmlPoison('F3 a ring picture that is not the stamped column', 'F3', (h) => { const m = /<section data-ws-content data-lcs-puzzle="0"[\s\S]*?<img class="ws-icon" src="([^"]+)" alt="[^"]*" data-lcs-pic="(\d)"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F3 ring picture)'); const other = h.match(new RegExp(`<img class="ws-icon" src="([^"]+)" alt="[^"]*" data-lcs-col="${(+m[2] + 1) % 3}"`)); if (!other) throw new Error('NEEDLE MATCHED NOTHING (another column)'); return h.replace(m[0], m[0].replace(`src="${m[1]}"`, `src="${other[1]}"`)); }, /not column|src/);
  htmlPoison('F3 a text node (a noun) in the clue block', 'F3', (h) => { const m = /(<span data-lcs-ring)/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F3 ring)'); return h.replace(m[1], '<span>parrot</span>' + m[1]); }, /not a case name|in the picture-clue block/);
  buildPoison('F3 with cell 40 (below the G1 floor 44)', 'F3', { cfg: { ...T.F3.difficulty[2], cell: 40, picPx: 40 } }, /floor 44/);
  buildPoison('F3 with an either kind (not a picture-clue kind)', 'F3', { cfg: { ...T.F3.difficulty[2], kinds: ['neg', 'either'] } }, /within neg\|pos/);
  // F4
  htmlPoison('F4 no linking clue (three separate puzzles)', 'F4', (h) => { const m = /data-lcs-solution="np:(\d),(\d),(\d);nc:(\d),(\d),(\d)"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F4 solution)'); const np = [+m[1], +m[2], +m[3]], nc = [+m[4], +m[5], +m[6]]; const two = (g, s) => [{ k: 'neg', f: 'neg', g, a: 0, v: (s[0] + 1) % 3 }, { k: 'neg', f: 'neg', g, a: 0, v: (s[0] + 2) % 3 }, { k: 'neg', f: 'neg', g, a: 1, v: [0, 1, 2].find((v) => v !== s[1] && v !== s[0]) }]; return caseAttr(h, 0, 'data-lcs-clues', JSON.stringify(two('np', np).concat(two('nc', nc))).replace(/"/g, '&quot;')); }, /no linking clue|linking/);
  htmlPoison('P6\' F4 the linking clue dropped (two states survive)', 'F4', (h) => { const m = /data-lcs-clues='([^']*)'/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F4 clues)'); const clues = JSON.parse(m[1].replace(/&quot;/g, '"')); if (!clues.some((c) => c.g === 'pc')) throw new Error('NEEDLE MATCHED NOTHING (no pc clue to drop)'); return h.replace(m[0], `data-lcs-clues='${JSON.stringify(clues.filter((c) => c.g !== 'pc')).replace(/"/g, '&quot;')}'`); }, /states|solutions/);
  htmlPoison('F4 np stamped as the identity', 'F4', (h) => { const m = /data-lcs-solution="np:[\d,]+;nc:([\d,]+)"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F4 solution)'); return h.replace(m[0], `data-lcs-solution="np:0,1,2;nc:${m[1]}"`); }, /identity/);
  htmlPoison('F4 a picture in both attributes', 'F4', (h) => { const m = /data-lcs-pics="([^",]+),([^",]+),([^",]+)"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F4 pics)'); const m2 = /data-lcs-pics2="([^",]+),([^",]+),([^",]+)"/.exec(h); if (!m2) throw new Error('NEEDLE MATCHED NOTHING (F4 pics2)'); return h.replace(m2[0], `data-lcs-pics2="${m[1]},${m2[2]},${m2[3]}"`); }, /both attributes|off the/);
  htmlPoison('F4 a linking clue that names a child', 'F4', (h) => { const m = /data-lcs-clues='([^']*)'/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F4 clues)'); const clues = JSON.parse(m[1].replace(/&quot;/g, '"')); const i = clues.findIndex((c) => c.g === 'pc'); if (i < 0) throw new Error('NEEDLE MATCHED NOTHING (no pc clue)'); const nm = /data-lcs-forms='\[\{&quot;nom&quot;:&quot;([^&]+)&quot;/.exec(h); if (!nm) throw new Error('NEEDLE MATCHED NOTHING (F4 name)'); const row = new RegExp(`(<div data-lcs-clue="${i}"[\\s\\S]*?data-lcs-clue-text>)`).exec(h); if (!row) throw new Error('NEEDLE MATCHED NOTHING (F4 pc row)'); return h.replace(row[1], row[1] + nm[1] + ' '); }, /names a child/);
  htmlPoison('F4 seven clues stamped', 'F4', (h) => { const m = /data-lcs-clues='([^']*)'/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F4 clues)'); const clues = JSON.parse(m[1].replace(/&quot;/g, '"')); while (clues.length < 7) clues.push({ ...clues[0] }); return h.replace(m[0], `data-lcs-clues='${JSON.stringify(clues).replace(/"/g, '&quot;')}'`); }, /outside|rows for|redundant/);
  buildPoison('F4 on the fruits fan with attr2 [fruits] only (no second attribute)', 'F4', { cfg: { ...T.F4.difficulty[2], attr2: ['fruits'] } }, /no second attribute/, { theme: 'fruits' });
  buildPoison('F4 kinds without a linking kind', 'F4', { cfg: { ...T.F4.difficulty[2], kinds: ['neg', 'pos'], minCross: null } }, /linking kind/);
  buildPoison('F4 attr2 = a theme sharing pictures with the fan theme (farm animals vs pets: rabbit)', 'F4', { cfg: { ...T.F4.difficulty[2], attr2: ['farm animals'] } }, /share pictures/);
  buildPoison('F4 with two cases', 'F4', { cfg: { ...T.F4.difficulty[2], cases: 2 } }, /exactly 1 case/);
  // F5
  htmlPoison('P8 F5 with 5 true of 5', 'F5', (h) => { const m = /<section data-ws-content data-lcs-puzzle="0"[^>]*?data-lcs-solved="(\d),(\d),(\d)"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F5 solved)'); const s = [+m[1], +m[2], +m[3]]; const st = [{ k: 'has', a: 0, v: s[0] }, { k: 'has', a: 1, v: s[1] }, { k: 'has', a: 2, v: s[2] }, { k: 'holderIs', a: 0, v: s[0] }, { k: 'holderIs', a: 1, v: s[1] }]; let out = caseAttr(h, 0, 'data-lcs-stmts', JSON.stringify(st).replace(/"/g, '&quot;')); return caseAttr(out, 0, 'data-lcs-truth', '1,1,1,1,1'); }, /true statements outside|true outside/);
  htmlPoison('F5 with 1 true of 5', 'F5', (h) => { const m = /<section data-ws-content data-lcs-puzzle="0"[^>]*?data-lcs-solved="(\d),(\d),(\d)"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F5 solved)'); const s = [+m[1], +m[2], +m[3]]; const st = [{ k: 'has', a: 0, v: s[0] }, { k: 'hasNot', a: 1, v: s[1] }, { k: 'hasNot', a: 2, v: s[2] }, { k: 'has', a: 0, v: (s[0] + 1) % 3 }, { k: 'has', a: 1, v: (s[1] + 1) % 3 }]; let out = caseAttr(h, 0, 'data-lcs-stmts', JSON.stringify(st).replace(/"/g, '&quot;')); return caseAttr(out, 0, 'data-lcs-truth', '1,0,0,0,0'); }, /true statements outside|true outside/);
  htmlPoison('F5 a statement stamped true that re-evaluates false', 'F5', (h) => { const m = /<section data-ws-content data-lcs-puzzle="0"[^>]*?data-lcs-truth="(\d),(\d),(\d),(\d),(\d)"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F5 truth)'); const t = m.slice(1, 6).map(Number); t[0] = 1 - t[0]; return caseAttr(h, 0, 'data-lcs-truth', t.join(',')); }, /re-evaluates|truth stamp/);
  htmlPoison('F5 a wrong mark printed on the solved grid', 'F5', (h) => { const m = /data-lcs-mark="1" data-lcs-mark-cell="0:0:(\d)"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F5 tick 0:0)'); return h.replace(m[0], `data-lcs-mark="0" data-lcs-mark-cell="0:0:${m[1]}"`); }, /prints|wrong mark/);
  htmlPoison('F5 a filled glyph chip (an answer hint)', 'F5', (h) => { const m = /<span data-lcs-glyph="yes" style="[^"]*background:#FFFFFF/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F5 glyph white background)'); return h.replace(m[0], m[0].replace('background:#FFFFFF', 'background:#DDEBE8')); }, /filled/);
  htmlPoison('F5 the solved grid stamped as the identity', 'F5', (h) => caseAttr(h, 0, 'data-lcs-solved', '0,1,2'), /identity/);
  htmlPoison('F5 a markKey on the read page (no room in the budget)', 'F5', (h) => { const m = /(<div data-lcs-bands)/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F5 bands)'); return h.replace(m[1], '<div class="ws-logic-markkey" aria-hidden="true" style="height:36px"></div>' + m[1]); }, /markKey/);
  htmlPoison('F5 two statements on one (child, picture) pair', 'F5', (h) => { const m = /<section data-ws-content data-lcs-puzzle="0"[^>]*?data-lcs-solved="(\d),(\d),(\d)"/.exec(h); if (!m) throw new Error('NEEDLE MATCHED NOTHING (F5 solved)'); const s = [+m[1], +m[2], +m[3]]; const st = [{ k: 'has', a: 0, v: s[0] }, { k: 'hasNot', a: 0, v: s[0] }, { k: 'hasNot', a: 1, v: s[0] }, { k: 'has', a: 2, v: (s[2] + 1) % 3 }, { k: 'holderIs', a: 1, v: s[1] }]; let out = caseAttr(h, 0, 'data-lcs-stmts', JSON.stringify(st).replace(/"/g, '&quot;')); return caseAttr(out, 0, 'data-lcs-truth', '1,0,1,0,1'); }, /re-uses|pair/);
  buildPoison('F5 trueRange [0,5] (a page could be all true)', 'F5', { cfg: { ...T.F5.difficulty[2], trueRange: [0, 5] } }, /trueRange/);
  buildPoison('F5 with a nobody kind while the bank refuses it', 'F5', { bank: (() => { const b = clone(bankAll.en); b.truth.nobody = []; return b; })(), cfg: { ...T.F5.difficulty[2], stmtKinds: ['has', 'nobody'] } }, /refuses the nobody/);
  // any face
  buildPoison('an unknown mode', 'F3', { cfg: { ...T.F3.difficulty[2], mode: 'zzz' } }, /unknown mode/);
  buildPoison('a face on a theme without an allowlist', 'F4', null, /no curated allowlist/, { theme: 'animals' });

  let killed = 0;
  for (const p of poisons) {
    let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
    const ok = res === null;
    if (ok) killed++;
    console.log(`[E] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
  }
  console.log('[E] P6 F4 two-attribute set unique only by case-splitting: MEASURED VACUOUS at 3×3×3 (exhaustive: 0 stalls; the propagation assertion stays as a guard; P6\' above covers the dropped link)');
  return { killed, total: poisons.length };
}

async function main() {
  const locales = arg('locales', 'en').split(',');
  const seeds = +arg('seeds', QUICK ? 6 : 20);
  const type = loadType(ID);
  const mod = loadBankModule();
  const { LOGIC_PUZZLES: bankAll, SETS, validateBank } = mod;
  let assertions = 0;
  const failures = [];
  const note = (ok, msg) => { assertions++; if (!ok) failures.push(msg); };
  fs.mkdirSync(OUT, { recursive: true });
  for (const s of [LONG_CHROME, WORST_CHROME, FI4_CHROME, COMBO_CHROME]) { note([...s.title].length <= 70, 'probe title > 70: ' + s.title); note([...s.instruction].length <= 150, 'probe instruction > 150'); }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const report = [];
  try {
    for (const loc of locales) {
      const b = bankAll[loc];
      note(!!b, `no ${loc} block in the bank (refusal — the ${loc} panel has not authored it)`);
      if (!b) { console.log(`[A] ${loc}: no block (refused)`); continue; }
      // ---- A
      const a = validateBank(bankAll, { locales: [loc] });
      assertions += 60;
      failures.push(...a.map((x) => 'A ' + x));
      if (loc === 'en') note(b.strings[ID].title === type.i18n.en.title && b.strings[ID].instruction === type.i18n.en.instruction, 'A en: strings[G2-319] != spec i18n.en (two sources)');
      console.log(`[A] ${loc}: head "${b.head}", ${b.names.length} names, ${Object.keys(b.frames).length} frame kinds · ${a.length} data faults`);
      // ---- C
      const renders = [];
      for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: loc, baseName: `${ID}-d${d}-${loc}`, tag: 'level' });
      for (const t of SETS.fan.filter((x) => x !== EXEMPLAR_THEME)) renders.push({ difficulty: 2, locale: loc, theme: t, baseName: `${ID}-d2-${loc}-${t.replace(/\s+/g, '_')}`, tag: 'theme' });
      for (const [name, strings] of [['longchrome', LONG_CHROME], ['worstchrome', WORST_CHROME], ['fi4title', FI4_CHROME]]) for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: loc, strings, pageSize: 'a4', baseName: `${ID}-d${d}-${loc}-${name}`, tag: name });
      for (const d of [2, 3]) renders.push({ difficulty: d, locale: loc, strings: COMBO_CHROME, pageSize: 'a4', baseName: `${ID}-d${d}-${loc}-combo677`, tag: 'combo' });
      for (const d of [1, 2, 3]) for (let s = 2; s <= seeds; s++) renders.push({ difficulty: d, locale: loc, seedEpoch: s, baseName: `${ID}-d${d}-${loc}-seed${s}`, tag: 'seed' });
      const pages = { 1: new Map(), 2: new Map(), 3: new Map() };
      const kindsSeen = { 1: new Set(), 2: new Set(), 3: new Set() };
      for (const job of renders) {
        let r;
        try { r = await renderCheck(page, type, null, job); } catch (e) { r = { thrown: e.message }; }
        note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
        if (r.thrown) { console.log(`[C] ${job.baseName}: THREW ${r.thrown}`); continue; }
        assertions += 40 + 12 * r.cases.reduce((s2, c) => s2 + c.clues, 0);
        note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
        for (const c of r.cases) for (const k of c.kinds) kindsSeen[job.difficulty].add(k);
        if (job.tag === 'seed' || job.tag === 'level') {
          const key = r.cases.map((c) => `${c.names}/${c.pics}/${c.sol}/${c.kinds}`).join(';');
          const prev = pages[job.difficulty].get(key);
          note(!prev, `${job.baseName}: identical page to ${prev}`);
          pages[job.difficulty].set(key, job.baseName);
        }
        if (job.tag !== 'seed') console.log(`[C] ${job.baseName}: body ${r.body} (${r.titleLines}-line title, ${r.insLines}-line instruction), cases [${r.cases.map((c) => c.pics.join('+') + ':' + c.kinds.join('/')).join(' | ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
      }
      for (const d of [1, 2, 3]) {
        const want = type.difficulty[d].kinds;
        note(want.every((k) => kindsSeen[d].has(k)), `d${d} sweep never produced kind(s) ${want.filter((k) => !kindsSeen[d].has(k))}`);
        console.log(`[C] d${d} sweep over ${seeds} seeds: ${pages[d].size} distinct pages, kinds seen ${[...kindsSeen[d]].join('/')}`);
      }
      // the 677 combination at d1: MEASURED and reported, not asserted (see the build record)
      {
        let r; try { r = await renderCheck(page, type, null, { difficulty: 1, locale: loc, strings: COMBO_CHROME, pageSize: 'a4', baseName: `${ID}-d1-${loc}-combo677` }); } catch (e) { r = { thrown: e.message }; }
        const line = r.thrown ? 'THREW ' + r.thrown : `body ${r.body}: ${r.fails.length ? r.fails.join(' | ') : 'ok'}`;
        report.push(`d1 under the 4-line title + 3-line instruction (677): ${line}`);
        console.log(`[C] ${ID}-d1-${loc}-combo677 (REPORTED, not asserted): ${line}`);
      }
      // refusals
      const refuse = async (name, run, want) => { let err = null; try { await run(); } catch (e) { err = e.message; } note(err && want.test(err), `${name}: ${err ? 'wrong error ' + err : 'RENDERED (not refused)'}`); console.log(`[C] ${name}: ${err ? 'refused (' + err.replace(/^.*G2-319: /, '').slice(0, 90) + ')' : 'RENDERED'}`); };
      await refuse('theme without an allowlist (animals)', () => renderCheck(page, type, null, { difficulty: 2, locale: loc, theme: 'animals', baseName: `${ID}-refuse-animals` }), /no curated allowlist/);
      await refuse('theme null', () => renderCheck(page, type, null, { difficulty: 2, locale: loc, theme: null, baseName: `${ID}-refuse-null` }), /theme is required|no curated allowlist/);
    }

    // ---- D. poisons (en; each must FAIL; control = the correct bank + page)
    const loc = 'en';
    const cfgB = bankAll.en;
    const control = await renderCheck(page, type, null, { difficulty: 2, locale: loc, baseName: `${ID}-control` });
    note(control.fails.length === 0 && validateBank(bankAll, { locales: ['en'] }).length === 0, 'control (correct bank + page) did not pass: ' + control.fails.join(' | '));
    const poisons = [];
    const bankPoison = (name, block, want, locale) => poisons.push({ name, run: async () => { const all = { ...clone(bankAll), [locale || 'en']: block }; const f = validateBank(all, { locales: [locale || 'en'], skipPictures: true }); return f.some((x) => want.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    const setsPoison = (name, sets, want) => poisons.push({ name, run: async () => { const f = validateBank(bankAll, { locales: ['en'], sets, skipPictures: true }); return f.some((x) => want.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    const htmlPoison = (name, post, want, job) => poisons.push({ name, run: async () => {
      const r = await renderCheck(page, type, (job && job.inj) || null, { difficulty: (job && job.difficulty) || 2, locale: loc, theme: job && job.theme, strings: job && job.strings, pageSize: job && job.pageSize, baseName: `${ID}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 30).toLowerCase() }, { post });
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    const buildPoison = (name, run, want) => poisons.push({ name, run: async () => { try { await run(); return 'silent (rendered)'; } catch (e) { return want.test(e.message) ? null : 'wrong error: ' + e.message; } } });

    htmlPoison('P1 a 3x3 with A¬X, B¬Y, C¬Z (two solutions)', (h) => setClues(h, 0, [{ k: 'neg', f: 'neg', a: 0, v: 0 }, { k: 'neg', f: 'neg', a: 1, v: 1 }, { k: 'neg', f: 'neg', a: 2, v: 2 }], [1, 2, 0]), /2 solutions/);
    htmlPoison('P2 A¬X with A has X (no solution)', (h) => setClues(h, 0, [{ k: 'neg', f: 'neg', a: 0, v: 0 }, { k: 'pos', f: 'pos', a: 0, v: 0 }, { k: 'neg', f: 'neg', a: 1, v: 1 }]), /0 solutions/);
    bankPoison('P3 a frame with a bare {noun} slot', (() => { const b = clone(cfgB); b.frames.neg[0] = '{name} does not have {noun}.'; return b; })(), /unknown slot|slots/);
    htmlPoison('P4a a printed tick in a grid cell', (h) => {
      const m = h.match(/<rect x="(\d+(?:\.\d+)?)" y="(\d+(?:\.\d+)?)" width="60" height="60" fill="none" data-lcs-cell="0:0:0"\/>/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (cell 0:0:0)');
      return h.replace(m[0], m[0] + `<path d="M14 31l9 9 21-22" transform="translate(${+m[1] + 12} ${+m[2] + 12}) scale(0.6)" fill="none" stroke="#146B5E" stroke-width="6" data-lcs-mark="1"/>`);
    }, /mark/);
    htmlPoison('P4b a ring on an answer chip', (h) => {
      const m = h.match(/<div data-lcs-answer-slot="1"[^>]*>/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (answer slot 1)');
      return h.replace(m[0], m[0] + '<svg width="40" height="40" style="position:absolute"><circle cx="20" cy="20" r="18" fill="none" stroke="#F2784B" stroke-width="2.5"/></svg>');
    }, /ring|marked/);
    htmlPoison('P5 a 4-clue 3x3 with one redundant clue', (h) => {
      const m = h.match(/data-lcs-clues='([^']*)' data-lcs-solution="(\d),(\d),(\d)"/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (clues of case 0)');
      const clues = JSON.parse(m[1].replace(/&quot;/g, '"'));
      const sol = [+m[2], +m[3], +m[4]];
      const extra = { k: 'neg', f: 'neg', a: 0, v: (sol[0] + 1) % 3 };   // true, and redundant beside a unique set
      if (clues.some((c) => c.k === 'neg' && c.a === extra.a && c.v === extra.v)) extra.v = (sol[0] + 2) % 3;
      return setClues(h, 0, clues.concat(extra));
    }, /redundant|outside/);
    htmlPoison('P7 hamster and mouse in one case (confusable)', (h) => caseAttr(h, 0, 'data-lcs-pics', 'dog,hamster,mouse'), /confusable/);
    htmlPoison('P7b fish and goldfish in one case (goldfish off the allowlist)', (h) => caseAttr(h, 0, 'data-lcs-pics', 'fish,goldfish,dog'), /allowlist/);
    bankPoison('P9 a fi frame "{name} ei ole {pic}" (nominative where the adessive is required)', (() => { const b = clone(cfgB); b.names = b.names.map((n) => ({ nom: n.nom, ade: n.nom + 'lla', gen: n.nom + 'n' })); b.frames.neg = ['{name} ei ole {pic}.', '{nameAde} ei ole {pic}.']; return b; })(), /adessive/, 'fi');
    htmlPoison('P10 the same name in both cases', (h) => {
      const m = h.match(/data-lcs-names="(\d),(\d),(\d)"/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (names of case 0)');
      const m2 = h.match(/<section data-ws-content data-lcs-puzzle="1"[^>]*?data-lcs-names="(\d),(\d),(\d)"/);
      if (!m2) throw new Error('NEEDLE MATCHED NOTHING (names of case 1)');
      return caseAttr(h, 1, 'data-lcs-names', `${m[1]},${m2[2]},${m2[3]}`);
    }, /shared by both cases|in case 1/);
    bankPoison('P11 an es frame "El niño que tiene {pic} no es {name}."', (() => { const b = clone(cfgB); b.frames.holderNot = ['El niño que tiene {pic} no es {name}.', 'Quien tiene {pic} no es {name}.']; return b; })(), /gendered/, 'es');
    htmlPoison('P13 a [data-lcs-cell] with a child element', (h) => {
      const m = h.match(/<rect ([^>]*data-lcs-cell="0:1:1")\/>/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (cell 0:1:1)');
      return h.replace(m[0], `<rect ${m[1]}><title>x</title></rect>`);
    }, /not empty/);
    htmlPoison('P14 an answer chip carrying data-lcs-answer', (h) => {
      if (!/<div data-lcs-answer-slot="0"/.test(h)) throw new Error('NEEDLE MATCHED NOTHING (answer slot 0)');
      return h.replace('<div data-lcs-answer-slot="0"', '<div data-lcs-answer-slot="0" data-lcs-answer="2"');
    }, /data-lcs-answer|marked|carries/);
    htmlPoison('P15 a d1 case with two pos clues (maxPos 1)', (h) => {
      const m = h.match(/data-lcs-solution="(\d),(\d),(\d)"/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (solution)');
      const sol = [+m[1], +m[2], +m[3]];
      return setClues(h, 0, [{ k: 'pos', f: 'pos', a: 0, v: sol[0] }, { k: 'pos', f: 'pos', a: 1, v: sol[1] }]);
    }, /maxPos/, { difficulty: 1 });
    htmlPoison('the identity solution', (h) => setClues(h, 0, [{ k: 'neg', f: 'neg', a: 0, v: 1 }, { k: 'neg', f: 'neg', a: 0, v: 2 }, { k: 'neg', f: 'neg', a: 1, v: 2 }], [0, 1, 2]), /identity/);
    htmlPoison('a hand-edited name tile', (h) => {
      const m = h.match(/(data-lcs-row="0" data-lcs-tile-inner="104">)([^<]+)(<\/text>)/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (tile 0)');
      return h.replace(m[0], m[1] + m[2] + 'x' + m[3]);
    }, /tile 0|prints/);
    htmlPoison('a clue picture that is not the stamped column', (h) => {
      const m = h.match(/<section data-ws-content data-lcs-puzzle="0"[\s\S]*?data-lcs-clue="0"[\s\S]*?<img class="ws-icon" src="([^"]+)" alt="[^"]*" data-lcs-pic="(\d)"/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (clue 0 picture)');
      const other = h.match(new RegExp(`<img class="ws-icon" src="([^"]+)" alt="[^"]*" data-lcs-col="${(+m[2] + 1) % 3}"`));
      if (!other) throw new Error('NEEDLE MATCHED NOTHING (another column picture)');
      return h.replace(m[0], m[0].replace(`src="${m[1]}"`, `src="${other[1]}"`));
    }, /src|not column/);
    htmlPoison('a 12-char name (tile overflow)', (h) => h, /> the tile inner|> 104/, { inj: { bank: (() => { const b = clone(cfgB); b.names[0] = { nom: 'Maximilianus' }; b.names[1] = { nom: 'Bartholomeus' }; b.names[2] = { nom: 'Wilhelmina' }; b.names[3] = { nom: 'Annabellina' }; return b; })() } });
    buildPoison('a theme without an allowlist refuses', () => renderCheck(page, type, null, { difficulty: 2, locale: loc, theme: 'animals', baseName: `${ID}-poison-animals` }), /no curated allowlist/);
    buildPoison('an allowlist of 5 refuses', () => renderCheck(page, type, { sets: { ...SETS, distinct: { ...SETS.distinct, pets: ['dog', 'cat', 'rabbit', 'fish', 'parrot'] } } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-allow5` }), /< 6/);
    setsPoison('an allowlist of 5 fails the bank check', { ...SETS, distinct: { ...SETS.distinct, pets: ['dog', 'cat', 'rabbit', 'fish', 'parrot'] } }, /< 6/);
    setsPoison('an allowlist with a BW marker', { ...SETS, distinct: { ...SETS.distinct, 'pets BW': ['dog', 'cat', 'rabbit', 'fish', 'parrot', 'frog'] } }, /BW/);
    buildPoison('a locale without a bank block refuses (de)', () => renderCheck(page, type, null, { difficulty: 2, locale: 'de', baseName: `${ID}-poison-de` }), /no de block/);
    buildPoison('an either kind on a bank that refuses it', () => renderCheck(page, type, { bank: (() => { const b = clone(cfgB); b.frames.either = []; return b; })(), cfg: { ...type.difficulty[2], kinds: ['neg', 'either'], minEither: 1 } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-either` }), /refuses the either/);
    buildPoison('cell 30 (below the G2 floor)', () => renderCheck(page, type, { cfg: { ...type.difficulty[2], cell: 30, picPx: 30 } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-cell30` }), /G2 floor/);
    buildPoison("answer:'box' (the unbuilt fallback)", () => renderCheck(page, type, { cfg: { ...type.difficulty[2], answer: 'box' } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-box` }), /box/);
    buildPoison('a cross kind on the base', () => renderCheck(page, type, { cfg: { ...type.difficulty[2], kinds: ['neg', 'cross'] } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-cross` }), /F4 face/);
    buildPoison('an unknown mode on the base config', () => renderCheck(page, type, { cfg: { ...type.difficulty[2], mode: 'zzz' } }, { difficulty: 2, locale: loc, baseName: `${ID}-poison-mode` }), /unknown mode/);
    htmlPoison('the flat stack under 3-line chrome (bands 340 px)', (h) => h.replace(/<section data-ws-content data-lcs-puzzle="(\d)"([^>]*)style="/g, '<section data-ws-content data-lcs-puzzle="$1"$2style="min-height:340px;'), /footer overlap|footer|outside the body/, { strings: LONG_CHROME, pageSize: 'a4', difficulty: 1 });
    htmlPoison('a blank page (non-vacuity)', (h) => h.replace(/<section data-ws-content data-lcs-puzzle="\d"[\s\S]*?<\/section>/g, ''), /non-vacuity|0 cases|2 cases|blank/);
    bankPoison('a title that is the bare head', (() => { const b = clone(cfgB); b.strings.F2.title = 'Logic Grid Puzzles'; return b; })(), /bare/);
    bankPoison('a title saying sudoku', (() => { const b = clone(cfgB); b.strings.F5.title = 'Picture Sudoku: True or False'; return b; })(), /sudoku/);
    bankPoison('a visible free claim', (() => { const b = clone(cfgB); b.strings.F1.instruction = 'Free printable logic grid puzzles: cross out, tick, circle.'; return b; })(), /free/);
    bankPoison('one frame only for a kind', (() => { const b = clone(cfgB); b.frames.pos = ['{name} has {pic}.']; return b; })(), />= 2/);
    bankPoison('an either frame with one {pic}', (() => { const b = clone(cfgB); b.frames.either[0] = '{name} has {pic} or nothing.'; return b; })(), /slots/);
    bankPoison('seven names', (() => { const b = clone(cfgB); b.names = b.names.slice(0, 7); return b; })(), /names, want 8/);

    let killed = 0;
    for (const p of poisons) {
      let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
      const ok = res === null;
      if (ok) killed++;
      console.log(`[D] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
    }
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    // ---- E. the faces
    const E = await runFaces(page, note, (k) => { assertions += k; }, report, seeds, bankAll, SETS);
    note(E.killed === E.total, `${E.total - E.killed} face poison(s) survived`);
    killed += E.killed;
    const poisonTotal = poisons.length + E.total;
    for (const r of report) console.log('[R] ' + r);
    const verdict = failures.length === 0;
    if (failures.length) console.log('FAILS:\n  ' + failures.join('\n  '));
    console.log(verdict ? `PASS (${assertions} assertions, ${killed}/${poisonTotal} poisons killed)` : `FAIL (${assertions} assertions, ${failures.length} failures, ${killed}/${poisonTotal} poisons killed)`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { LONG_CHROME, WORST_CHROME, FI4_CHROME, COMBO_CHROME };
