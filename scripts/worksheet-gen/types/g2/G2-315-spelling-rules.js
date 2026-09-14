/**
 * G2-315 — Spelling Rules (nt20-C; family key `spelling-rules`, G2, en base
 * L.2.2.d + RF.2.3.a; the national framework NAME elsewhere). Design:
 * docs/worksheet-gen/b3-designs/G2-315-spelling-rules.md §2/§5.
 *
 * "Read the rule, look at the picture, write the rule letters in the gap."
 * A rule box on top (one coral chip per rule grapheme + MODEL words with
 * their rule letters in coral) and cream cards (2×N): a picture above the
 * word printed in EQUAL LETTER CELLS with one dashed coral box per gap where
 * the rule grapheme belongs; the child writes the grapheme (1-3 letters). The
 * answer is never printed. Distinct from K-224 (one arbitrary CVC letter at
 * K), G1-244 d2 (whole word, no rule), G1-305 (a syllable, no rule), K-317 F5
 * (a sound unit traced + circled), K-318 (no letters printed).
 *
 * THEMELESS (README ruling; per theme every rule reaches 0-4 words): the
 * page draws from a cross-theme per-rule `items[]` pool in
 * data/b3/spelling-rules.js (panel-opened pictures pinned per item); the RULE
 * is the unit axis (lib/unit-axis.js; the design file's `ruleAxis`):
 * `build()` renders `unit || bank.exemplar`, a wave fans rules with
 * unitsPerType / unitOverrides, `{UNIT}` in the title resolves to `rule.head`.
 *
 * Difficulty is a CONFIG; guards key on the resolved config, never the level:
 *   cards/cols/rows   cards on the page
 *   pic               picture px (shrinks to ≥ minPic under a long chrome)
 *   cellMax           the letter cell (px) at short words; cells shrink to
 *                     hold longer words, never below CELL_MIN (font 22 = the
 *                     G2 answer floor) — a word needing more than
 *                     floor(296 / CELL_MIN) cells is not eligible
 *   minLetters/maxLetters   word length window
 *   models            model pills in the rule box (0 = chips only)
 *   gapCells          'len' (a box as wide as its grapheme) | N (fixed width,
 *                     so the box no longer shows the grapheme length)
 *   minPool           the face-pool floor (≥ this many eligible words, else
 *                     the (rule, locale, level) is REFUSED — never a filler)
 * build() reads ONLY data/b3/spelling-rules.js (lib/b3-common.js bank) and
 * the picture index guard; never image-vocabulary.js.
 *
 * Answer hiding: each stage stamps data-lcs-word / -vocab / -gap ("from:len[,
 * from:len]") / -side / -cell; the root stamps the rule id, its regex and
 * cands; verify() re-derives g from the stamps (word minus the visible
 * letters), asserts g ∈ cands and that the gap sits where the rule regex
 * fires, every box `gapCells·cell − 2` wide, the printed letters === the word
 * minus the gap letters, no model word on a card, no duplicate, every
 * picture loaded and inside its card, the rule box chips + models re-derived.
 * Single-solution (frame uniqueness) is node-side: the bank validator in
 * qa/verify-b3-spelling-rules.js.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { gapWord, ruleBox } = require('../../templates/components-b3.js');
const { displayWord, distinctByWord, sampleEntries, fileUri } = require('../../lib/b2-common.js');
const { candidates } = require('../../lib/b3-picture-index.js');
const { bank: loadBank } = require('../../lib/b3-common.js');
const { esc } = require('../../primitives/_svg.js');

const KEY = 'spelling-rules';
const ID = 'G2-315';
const CELL_ROW_MAX = 296;   // cells never exceed this (3 px each side inside the 302 stage)
const CELL_MIN = 24;        // font 22 = the G2 answer floor (design §2)
const MIN_PIC = 36;         // the G2 element floor

function ruleOf(bank, id) {
  const r = bank.rules && bank.rules[id];
  if (!r) throw new Error(`${ID}: rule "${id}" is not in the bank (rules: ${Object.keys(bank.rules || {}).join(',')})`);
  return r;
}
/** Cells per gap for a resolved config: 'len' → each gap's own length; N → N for every gap. */
function gapCellsFor(gaps, cfg) { return gaps.map((g) => (cfg === 'len' ? g.len : cfg)); }
function cellCount(n, gaps, gc) { return n - gaps.reduce((s, g) => s + g.len, 0) + gc.reduce((s, c) => s + c, 0); }
function cellFor(cells, cellMax) { return Math.min(cellMax, Math.floor(CELL_ROW_MAX / cells)); }
function onceRe(re) { return new RegExp(re, 'gu'); }

/**
 * The eligible items of (rule, loc) for a resolved config — PURE, no rng.
 * Order: bank items → displayWord (bank.capital) → letters only → not in the
 * bank's excluded family → letters in range → the rule grapheme occurs
 * EXACTLY once → cells ≤ floor(296/CELL_MIN)
 * under the config's gapCells → not a model word → distinct by word.
 * @returns {Array<{theme, noun, vocabKey, word, gaps, g, side, cells, gapCells}>}
 */
function eligible(loc, ruleId, opts) {
  const l = String(loc || 'en').slice(0, 2);
  const o = Object.assign({ minLetters: 3, maxLetters: 12, gapCells: 'len' }, opts || {});
  const b = o.bank || loadBank(KEY, l);
  const rule = ruleOf(b, ruleId);
  const models = new Set((rule.models || []).map((m) => m.word));
  const maxCells = Math.floor(CELL_ROW_MAX / CELL_MIN);
  const re = onceRe(rule.gap.re);
  const exclRe = b.exclude && b.exclude.re ? new RegExp(b.exclude.re, 'u') : null;   // an item family the locale refuses
  const pool = (rule.items || [])
    .map((it) => ({ ...it, word: displayWord(it.word, l, b.capital) }))
    .filter((it) => /^\p{L}+$/u.test(it.word))
    .filter((it) => !(exclRe && exclRe.test(it.word.toLocaleLowerCase(l))))
    .filter((it) => { const n = [...it.word].length; return n >= o.minLetters && n <= o.maxLetters; })
    .filter((it) => rule.gap.kind !== 'regex' || [...it.word.toLocaleLowerCase(l).matchAll(re)].length === 1)
    .map((it) => { const gc = gapCellsFor(it.gaps, o.gapCells); return { ...it, gapCells: gc, cells: cellCount([...it.word].length, it.gaps, gc) }; })
    .filter((it) => it.cells <= maxCells)
    .filter((it) => !models.has(it.word));
  return distinctByWord(pool, (it) => it.word);
}

/** The pinned picture must be a colour-index candidate for the key (BW dirs, blocked, excluded, uncached all refuse). */
function pictureOf(p, loc) {
  const ok = candidates(p.vocabKey, loc).some((c) => c.theme === p.theme && c.noun === p.noun);
  if (!ok) throw new Error(`${ID}: picture ${p.theme}/${p.noun} is not a colour-index candidate for "${p.vocabKey}" in ${loc} — refuse`);
  return fileUri(p.theme, p.noun);
}

module.exports = {
  id: ID,
  slug: 'spelling-rules',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: (loc) => Object.keys(loadBank(KEY, loc).rules),
    exemplar: (loc) => loadBank(KEY, loc).exemplar,
    tokens: (unit, loc) => { const r = ruleOf(loadBank(KEY, loc), unit); return { U: r.head, L: r.head.toLocaleLowerCase(loc), UNIT: r.head }; },
  },
  difficulty: {
    1: { cards: 6, cols: 2, rows: 3, pic: 120, cellMax: 36, minLetters: 3, maxLetters: 8, models: 3, gapCells: 'len', mode: 'gap', minPool: 10 },
    2: { cards: 8, cols: 2, rows: 4, pic: 88, cellMax: 32, minLetters: 3, maxLetters: 12, models: 2, gapCells: 'len', mode: 'gap', minPool: 10 },
    3: { cards: 8, cols: 2, rows: 4, pic: 80, cellMax: 32, minLetters: 6, maxLetters: 12, models: 0, gapCells: 3, mode: 'gap', minPool: 10 },
  },
  i18n: {
    en: {
      title: 'Spelling Rules: {UNIT}',
      instruction: 'Read the rule in the box. Say each picture word, then write the missing rule letters in the dashed boxes.',
    },
  },
  eligible,
  cellFor,
  cellCount,

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(KEY, loc), { theme, difficulty, locale: loc, unit }, ctx);
  },

  /** The whole build over an INJECTED bank (the gate's poison seam); build() passes the real one. */
  _buildWith(bank, { difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const ruleId = unit || bank.exemplar;
    const rule = ruleOf(bank, ruleId);
    if (d.mode !== 'gap') throw new Error(`${ID}: the base renders mode 'gap' only (got ${d.mode})`);
    if ((rule.models || []).length < d.models) throw new Error(`${ID}: rule ${ruleId}/${loc} has ${(rule.models || []).length} models < ${d.models} — REFUSED`);
    const pool = eligible(loc, ruleId, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: d.gapCells, bank });
    const floor = Math.max(d.cards, d.minPool || 0);
    if (pool.length < floor) throw new Error(`${ID}: rule ${ruleId}/${loc} has ${pool.length} eligible words < ${floor} (d${difficulty}) — REFUSED`);
    const picks = rng.shuffle(sampleEntries(rng, pool, d.cards, ID));
    const seenK = new Set();
    for (const p of picks) { if (seenK.has(p.vocabKey)) throw new Error(`${ID}: duplicate vocab key on the page: ${p.vocabKey}`); seenK.add(p.vocabKey); }

    const models = (rule.models || []).slice(0, d.models).map((m) => ({
      src: pictureOf(m, loc), word: displayWord(m.word, loc, bank.capital), gaps: m.gaps,
    }));
    const chips = String(rule.chip || '').split(/\s+/).filter(Boolean);
    const box = ruleBox({ chips, models, w: 675, h: 60 });

    const cards = picks.map((it) => {
      const n = [...it.word].length;
      const cell = cellFor(it.cells, d.cellMax);
      const fontPx = cell - 2;
      const svg = gapWord({ word: it.word, gaps: it.gaps, gapCells: it.gapCells, cell, fontPx, mode: 'gap' });
      const gapStamp = it.gaps.map((g) => g.from + ':' + g.len).join(',');
      return `<div class="ws-card-stage" style="padding:6px 0;flex-direction:column;justify-content:center;gap:0" data-ws-content ` +
        `data-lcs-word="${esc(it.word)}" data-lcs-vocab="${esc(it.vocabKey)}" data-lcs-gap="${esc(gapStamp)}" data-lcs-side="${esc(it.side || 'rule')}" ` +
        `data-lcs-cell="${cell}" data-lcs-cells="${it.cells}" data-lcs-face="base">` +
        `<img class="ws-icon" src="${pictureOf(it, loc)}" alt="" data-lcs-pic="${esc(it.vocabKey)}" style="width:${d.pic}px;height:${d.pic}px;flex:0 1 auto;min-height:${MIN_PIC}px">` +
        `<div style="margin-top:6px;line-height:0" data-lcs-wordrow>${svg}</div></div>`;
    });
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-face="base" data-lcs-rule="${esc(ruleId)}" data-lcs-rule-head="${esc(rule.head)}" ` +
      `data-lcs-re="${esc(rule.gap.re)}" data-lcs-boxes="${esc(rule.gap.boxes || 'wide')}" data-lcs-cands="${esc((rule.cands || []).join(','))}" ` +
      `data-lcs-cards="${d.cards}" data-lcs-models="${d.models}" data-lcs-gapcells="${d.gapCells}" data-lcs-cellmax="${d.cellMax}" ` +
      `data-lcs-minletters="${d.minLetters}" data-lcs-maxletters="${d.maxLetters}" data-lcs-pic="${d.pic}" ` +
      `style="flex:1;display:flex;flex-direction:column;min-height:0;gap:14px">` +
      box + cardGrid({ cards, cols: d.cols, rows: d.rows }) + `</div>`;
    return { bodyHtml, meta: { rule: ruleId, words: picks.map((p) => p.word), gaps: picks.map((p) => p.g), models: models.map((m) => m.word), pool: pool.length } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const root = document.querySelector('[data-lcs-type="G2-315"]');
      if (!root) return ['no G2-315 root'];
      const rule = root.dataset.lcsRule, cands = (root.dataset.lcsCands || '').split(',').filter(Boolean);
      const want = +root.dataset.lcsCards, wantModels = +root.dataset.lcsModels, cellMax = +root.dataset.lcsCellmax;
      const minL = +root.dataset.lcsMinletters, maxL = +root.dataset.lcsMaxletters;
      const gcCfg = root.dataset.lcsGapcells === 'len' ? 'len' : +root.dataset.lcsGapcells;
      const boxes = root.dataset.lcsBoxes;
      let re = null;
      try { re = new RegExp(root.dataset.lcsRe, 'gu'); } catch (e) { fails.push('rule regex does not compile: ' + root.dataset.lcsRe); }
      if (!rule || !cands.length) fails.push('rule / cands stamp missing');

      // the rule box: chips + models re-derived
      const box = root.querySelector('[data-lcs-rulebox]');
      if (!box) fails.push('no rule box');
      const modelWords = new Set();
      if (box) {
        const chips = [...box.querySelectorAll('[data-lcs-chip]')];
        if (!chips.length) fails.push('rule box has no chip');
        chips.forEach((c) => {
          const t = c.textContent.trim();
          if (!t || t !== c.dataset.lcsChip) fails.push(`chip text "${t}" ≠ stamp`);
          if (!cands.includes(t.replace(/_/g, ''))) fails.push(`chip "${t}" is not a candidate of the rule`);
          const r = c.getBoundingClientRect();
          if (r.width < 36 || r.height < 36) fails.push(`chip "${t}" ${Math.round(r.width)}×${Math.round(r.height)} < 36`);
        });
        const pills = [...box.querySelectorAll('[data-lcs-model]')];
        if (pills.length !== wantModels) fails.push(`${pills.length} model pills, want ${wantModels}`);
        pills.forEach((p) => {
          const w = p.dataset.lcsModel;
          modelWords.add(w.toLocaleLowerCase(lang));
          const txt = [...p.querySelectorAll('span')].filter((s) => s.children.length === 0).map((s) => s.textContent).join('');
          const whole = p.querySelector('span:not([data-lcs-rule-letter])');
          if (!whole || whole.textContent !== w) fails.push(`model "${w}": printed "${whole && whole.textContent}"`);
          const gaps = (p.dataset.lcsModelGaps || '').split(',').filter(Boolean).map((s) => s.split(':').map(Number));
          const coral = [...p.querySelectorAll('[data-lcs-rule-letter]')].map((s) => +s.dataset.lcsRuleLetter);
          const wantIdx = [];
          for (const [from, len] of gaps) for (let k = 0; k < len; k++) wantIdx.push(from + k);
          if (coral.join(',') !== wantIdx.join(',')) fails.push(`model "${w}": rule letters at ${coral.join(',')} want ${wantIdx.join(',')}`);
          const g = wantIdx.map((i) => [...w][i]).join('').toLocaleLowerCase(lang);
          if (!cands.includes(g)) fails.push(`model "${w}": rule letters "${g}" not in cands`);
          if (re) { re.lastIndex = 0; const m = [...w.toLocaleLowerCase(lang).matchAll(re)]; if (m.length !== 1) fails.push(`model "${w}": rule grapheme occurs ${m.length}× (want 1)`); }
          const img = p.querySelector('img');
          if (!img || !img.complete || img.naturalWidth === 0) fails.push(`model "${w}": picture broken`);
          else { const r = img.getBoundingClientRect(); if (r.width < 36 || r.height < 36) fails.push(`model "${w}": picture ${Math.round(r.width)} < 36`); }
          void txt;
        });
        if (box.scrollWidth > box.clientWidth + 1) fails.push(`rule box content ${box.scrollWidth} wider than the box ${box.clientWidth}`);
        const br = box.getBoundingClientRect();
        [...box.querySelectorAll('img, span')].forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width && (r.left < br.left - 0.6 || r.right > br.right + 0.6 || r.top < br.top - 0.6 || r.bottom > br.bottom + 0.6)) fails.push('rule box element outside the box');
        });
      }

      // the cards
      const stages = [...root.querySelectorAll('.ws-card-stage[data-lcs-face="base"]')];
      const cardsEl = [...root.querySelectorAll('.ws-card')];
      if (stages.length !== want) fails.push(`${stages.length} stages, want ${want}`);
      if (cardsEl.length !== want) fails.push(`${cardsEl.length} cards, want ${want}`);
      const seenW = new Set(), seenK = new Set();
      stages.forEach((st, i) => {
        const tag = `card ${i + 1}`;
        const word = st.dataset.lcsWord || '';
        const L = [...word];
        const n = L.length;
        const gaps = (st.dataset.lcsGap || '').split(',').filter(Boolean).map((s) => { const [from, len] = s.split(':').map(Number); return { from, len }; });
        const cell = +st.dataset.lcsCell;
        if (!word || !/^\p{L}+$/u.test(word)) fails.push(`${tag}: word "${word}" is not letters only`);
        if (n < minL || n > maxL) fails.push(`${tag}: ${n} letters outside ${minL}..${maxL}`);
        if (seenW.has(word.toLocaleLowerCase(lang))) fails.push(`${tag}: duplicate word "${word}"`);
        seenW.add(word.toLocaleLowerCase(lang));
        if (seenK.has(st.dataset.lcsVocab)) fails.push(`${tag}: duplicate vocab key`);
        seenK.add(st.dataset.lcsVocab);
        if (modelWords.has(word.toLocaleLowerCase(lang))) fails.push(`${tag}: "${word}" is a model word`);
        if (!gaps.length) { fails.push(`${tag}: no gap stamp`); return; }
        gaps.forEach((g, k) => {
          if (!(g.from >= 0 && g.len >= 1 && g.from + g.len <= n)) fails.push(`${tag}: gap ${g.from}:${g.len} out of range`);
          if (k && g.from < gaps[k - 1].from + gaps[k - 1].len) fails.push(`${tag}: overlapping gaps`);
          if (lang === 'de' && g.from === 0) fails.push(`${tag}: de gap in cell 0 (the capital)`);
        });
        // the case rule: de keeps the capital, everyone else prints lowercase
        if ((lang === 'de') !== /^\p{Lu}/u.test(word)) fails.push(`${tag}: case rule (${lang}) violated for "${word}"`);
        // g re-derived from the stamps
        const gIdx = [];
        for (const g of gaps) for (let k = 0; k < g.len; k++) gIdx.push(g.from + k);
        const g = gIdx.map((k) => L[k]).join('').toLocaleLowerCase(lang);
        if (!cands.includes(g)) fails.push(`${tag}: gap letters "${g}" not in cands [${cands.join(',')}]`);
        // the gap sits where the rule fires, exactly once
        if (re) {
          re.lastIndex = 0;
          const low = word.toLocaleLowerCase(lang);
          const ms = [...low.matchAll(re)];
          if (ms.length !== 1) fails.push(`${tag}: rule grapheme occurs ${ms.length}× in "${word}" (want 1)`);
          else {
            const at = [...low.slice(0, ms[0].index)].length, mlen = [...ms[0][0]].length;
            if (boxes === 'split') {
              if (gaps.length !== 2 || gaps[0].len !== 1 || gaps[1].len !== 1 || gaps[0].from !== at || gaps[1].from !== n - 1) fails.push(`${tag}: split rule needs two one-letter gaps at ${at} and ${n - 1}, got ${st.dataset.lcsGap}`);
            } else if (gaps.length !== 1 || gaps[0].from !== at || gaps[0].len !== mlen) fails.push(`${tag}: gap ${st.dataset.lcsGap} is not at the rule grapheme (${at}:${mlen})`);
          }
        }
        // the word svg: cells, boxes, letters
        const ws = st.querySelector('[data-lcs-prim="gap-word"]');
        if (!ws) { fails.push(`${tag}: no word cells`); return; }
        if (ws.dataset.lcsMode !== 'gap') fails.push(`${tag}: mode ${ws.dataset.lcsMode} (base = gap)`);
        const gc = gaps.map((x) => (gcCfg === 'len' ? x.len : gcCfg));
        const wantCells = n - gaps.reduce((s, x) => s + x.len, 0) + gc.reduce((s, c) => s + c, 0);
        if (+ws.dataset.lcsCells !== wantCells) fails.push(`${tag}: ${ws.dataset.lcsCells} cells, want ${wantCells}`);
        if (+st.dataset.lcsCells !== wantCells) fails.push(`${tag}: stage cells stamp ${st.dataset.lcsCells} ≠ ${wantCells}`);
        if (+ws.dataset.lcsCell !== cell) fails.push(`${tag}: cell stamp mismatch`);
        if (cell > cellMax || cell < 24) fails.push(`${tag}: cell ${cell} outside 24..${cellMax}`);
        if (wantCells * cell > 296) fails.push(`${tag}: cells ${wantCells}×${cell} exceed 296`);
        const boxesEl = [...ws.querySelectorAll('[data-lcs-gapbox]')];
        if (boxesEl.length !== gaps.length) fails.push(`${tag}: ${boxesEl.length} gap boxes, want ${gaps.length}`);
        // expected x layout: letters and boxes in cell order
        const expect = [];   // {kind:'letter', ch, x} | {kind:'box', cells, x}
        let x = 0;
        for (let k = 0; k < n; k++) {
          const gi = gaps.findIndex((q) => q.from === k);
          if (gi >= 0) { expect.push({ kind: 'box', i: gi, cells: gc[gi], x }); x += gc[gi]; k += gaps[gi].len - 1; }
          else { expect.push({ kind: 'letter', ch: L[k], x }); x++; }
        }
        const texts = [...ws.querySelectorAll('text')];
        const wantLetters = expect.filter((e) => e.kind === 'letter');
        if (texts.map((t) => t.textContent).join('') !== wantLetters.map((e) => e.ch).join('')) fails.push(`${tag}: printed letters "${texts.map((t) => t.textContent).join('')}" ≠ word minus gaps "${wantLetters.map((e) => e.ch).join('')}"`);
        texts.forEach((t, k) => {
          const e = wantLetters[k]; if (!e) return;
          if (Math.abs(+t.getAttribute('x') - (e.x + 0.5) * cell) > 0.51) fails.push(`${tag}: letter ${k} at x=${t.getAttribute('x')}, want ${(e.x + 0.5) * cell}`);
          if (+t.getAttribute('font-size') !== cell - 2) fails.push(`${tag}: font ${t.getAttribute('font-size')} ≠ cell−2`);
          if ((t.getAttribute('fill') || '').toUpperCase() === '#F2784B') fails.push(`${tag}: a coral letter on a base card`);
        });
        expect.filter((e) => e.kind === 'box').forEach((e) => {
          const b = boxesEl.find((bx) => +bx.dataset.lcsGapbox === e.i);
          if (!b) { fails.push(`${tag}: gap box ${e.i} missing`); return; }
          const bw = +b.getAttribute('width'), bx = +b.getAttribute('x');
          if (Math.abs(bw - (e.cells * cell - 2)) > 0.51) fails.push(`${tag}: gap box ${e.i} width ${bw}, want ${e.cells * cell - 2} (gap width leaks the answer)`);
          if (Math.abs(bx - (e.x * cell + 1)) > 0.51) fails.push(`${tag}: gap box ${e.i} at x=${bx}, want ${e.x * cell + 1}`);
          if (+b.getAttribute('height') < cell + 8 - 0.5) fails.push(`${tag}: gap box height ${b.getAttribute('height')} < cell+8`);
          if (b.querySelector && b.textContent && b.textContent.trim()) fails.push(`${tag}: text inside a gap box`);
        });
        if (ws.querySelectorAll('rect').length !== gaps.length) fails.push(`${tag}: ${ws.querySelectorAll('rect').length} rects ≠ ${gaps.length} gap boxes`);
        if (ws.getBoundingClientRect().width > 302.6) fails.push(`${tag}: word svg wider than the card`);
        // the visible text of the whole card is the printed letters only (no gap letter, no whole word)
        const card = st.closest('.ws-card');
        const vis = [...card.querySelectorAll('*')].filter((el) => el.children.length === 0 && el.tagName !== 'IMG' && !el.closest('.ws-card-badge'))
          .map((el) => el.textContent.trim()).filter(Boolean).join('');
        if (vis !== wantLetters.map((e) => e.ch).join('')) fails.push(`${tag}: visible text "${vis}" ≠ printed letters`);
        const img = st.querySelector('img');
        if (!img || !img.complete || img.naturalWidth === 0) fails.push(`${tag}: picture broken`);
        else { const r = img.getBoundingClientRect(); if (r.width < 36 || r.height < 36) fails.push(`${tag}: picture ${Math.round(r.width)}×${Math.round(r.height)} < the G2 floor 36`); }
        // containment: the card's overflow:hidden hides clipping from the page lint
        const cr = card.getBoundingClientRect();
        [...st.querySelectorAll('img, svg')].forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.top < cr.top - 0.6 || r.bottom > cr.bottom + 0.6 || r.left < cr.left - 0.6 || r.right > cr.right + 0.6) {
            fails.push(`${tag}: <${el.tagName.toLowerCase()}> clipped by its card (${Math.round(r.bottom)} > ${Math.round(cr.bottom)})`);
          }
        });
      });
      // no text node anywhere in the body prints a card word or its gap letters beside the cells
      const body = document.querySelector('[data-lcs-body]') || root;
      const cardWords = new Set(stages.map((s) => (s.dataset.lcsWord || '').toLocaleLowerCase(lang)));
      const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const t = node.textContent.trim().toLocaleLowerCase(lang);
        if (t && cardWords.has(t)) fails.push(`text node prints a card word: "${t}"`);
      }
      return fails;
    });
  },
};
