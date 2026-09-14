/**
 * K-317 — Letter of the Week (nt20-C; `letter-of-the-week`, K, RF.K.1.d +
 * RF.K.3.a + L.K.1.a). Design: docs/worksheet-gen/b3-designs/K-317-letter-of-the-week.md §2/§5.
 *
 * One letter owns the page, three zones a non-reader follows top to bottom:
 *   1  letterCard "Mm" + a capital lane and a small lane (model, dashed reps,
 *      one empty slot — strokeLetterLane);
 *   2  the HUNT: 8 picture cards, 4 whose name BEGINS with the letter + 4 foils,
 *      shuffled; the child circles the four (no caption, no word printed);
 *   3  two write rows: one solid model on a school-line trio, the rest empty
 *      (strokeWordLane stack:true reps:1 — K-284's caption trick).
 * No word is printed anywhere, so the answer is never on the page; the ground
 * truth is the data-lcs-* stamps and verify() re-derives every hit from them.
 *
 * THEMELESS (README ruling): the page draws from a cross-theme per-letter pool
 * in data/b3/letter-of-the-week.js (panel-opened pictures pinned per item);
 * the LETTER is the unit axis (lib/unit-axis.js): `build()` renders
 * `unit || bank.exemplar`, a wave fans letters with unitsPerType/unitOverrides.
 *
 * Difficulty is a CONFIG, guards key on the resolved config (never the level):
 *   hunt.n / hunt.hits / hunt.foilPolicy ('any' = any foil, 'avoid' = foils
 *   beginning with a confusable `avoid` letter, 'pair-noninitial' = two foils
 *   beginning with the `pair` letter + one word carrying L NON-initially + one
 *   other) / hunt.hitPos ('initial' base; 'noninitial'|'any' are the face-2
 *   knobs the base already carries, stamped as data-lcs-scope; with
 *   hunt.minMedial the page carries at least that many MEDIAL hits, stamped
 *   data-lcs-min-medial) / trace.* / write.* px sizes. A pool that cannot fill
 *   the config THROWS (refusal).
 *
 * FACE KNOBS (nt20-C Phase 2, design §3; each ADDITIVE — absent on the base,
 * so the base's output stays byte-identical; stamped data-lcs-face only when
 * declared; every face keeps zone 1):
 *   trace.lanes:'upper'      the SLIM zone 1 (letterCard 110 + ONE capital lane)
 *   write:null               no write rows (faces 3 / 4 / 6)
 *   positions:{cards, cols, split:[b,m,e], cardW, cardH, iconPx, boxPx, glyphH,
 *              laneH, mode?}  face 3 — WHERE is the letter: positionCard × cards,
 *              split beginning/middle/end, letter ONCE per word; mode
 *              'letter'|'syllable' (default = the bank's positionMode), the word
 *              printed as a stroke model iff the bank says showWordInPositions
 *   wordHunt:{rows, capsRows, maxLetters, occ:[min,max], minTotal, iconPx, laneW,
 *             laneH, glyphH, boxPx, gap}  face 4 — circle the letter INSIDE
 *             printed picture words (stroke glyphs, never <text>) and count
 *             it; capsRows rows in block capitals; total >= minTotal
 *   pair:{cards, cols, split:[a,b], cardW, cardH, iconPx, chipPx}  face 6 —
 *             a | b letterChips under each picture, a = L, b = block.pair;
 *             the pair-side pictures are the block's pair-initial foils
 *   unit:{huntPos:'any'|'initial', foilPolicy:'components'|'any'}  face 5 —
 *             the two-letter UNIT (bank.units) is the page's target: hit iff
 *             graphemes include the unit as ONE grapheme; foils carry no unit
 *             substring ('components' = every component letter separately)
 */
'use strict';
const { strokeLetterLane, strokeWordLane } = require('../../primitives/trace-path.js');
const { bank: loadBank, nfdBase } = require('../../lib/b3-common.js');
const { fileUri, traceable } = require('../../lib/b2-common.js');
const { answerBox } = require('../../templates/components.js');
const { letterCard, huntCard, positionCard, letterChips } = require('../../templates/components-b3.js');
const { alphabets } = require('../../data/literacy/letter-knowledge.json');
const letterStrokes = require('../../data/tracing/letter-strokes.js');

const BANK = 'letter-of-the-week';
const COLUMN = 660;   // the design column inside the 675 px body (page 703 − 2 × 14)
const GAP = 12;       // hunt-grid gap
const CARD_GAP = 14;  // letterCard ↔ lanes

function letterBlock(bank, L) {
  const b = (bank.letters || []).find((x) => x.L === L);
  if (!b) throw new Error(`K-317: letter "${L}" is not in the bank (letters: ${(bank.letters || []).map((x) => x.L).join(',')})`);
  return b;
}
function unitBlock(bank, u) {
  const b = (bank.units || []).find((x) => x.u === u);
  if (!b) throw new Error(`K-317: unit "${u}" is not in the bank (units: ${(bank.units || []).map((x) => x.u).join(',')})`);
  return b;
}
function isHit(item, L, level, hitPos) {
  const first = level === 'sound' ? item.graphemes[0] : [...item.word.toLocaleLowerCase()][0];
  if (hitPos === 'initial') return first === L;
  const at = item.graphemes.indexOf(L);
  if (hitPos === 'noninitial') return at > 0;
  return at >= 0;   // 'any'
}
function pickHits(rng, block, cfg, level) {
  const cand = block.items.filter((i) => isHit(i, block.L, level, cfg.hitPos || 'initial'));
  if (cfg.hitPos === 'noninitial' && cfg.minMedial) {
    const medial = cand.filter((i) => i.graphemes.indexOf(block.L) < i.graphemes.length - 1);
    if (medial.length < cfg.minMedial) throw new Error(`K-317: letter ${block.L} has ${medial.length} medial items < ${cfg.minMedial}`);
    if (cand.length < cfg.hits) throw new Error(`K-317: letter ${block.L} has ${cand.length} ${cfg.hitPos} items < ${cfg.hits} hits`);
    // face 2: the page must CARRY minMedial medial hits (design §3 F2 "≥ 2 medial"),
    // not merely draw from a pool that has them — sample the medial quota first.
    const med = rng.sample(medial, cfg.minMedial);
    const usedW = new Set(med.map((i) => i.word));
    const rest = rng.sample(cand.filter((i) => !usedW.has(i.word)), cfg.hits - cfg.minMedial);
    return rng.shuffle([...med, ...rest]);
  }
  if (cand.length < cfg.hits) throw new Error(`K-317: letter ${block.L} has ${cand.length} ${cfg.hitPos || 'initial'} items < ${cfg.hits} hits`);
  return rng.sample(cand, cfg.hits);
}
function pickFoils(rng, block, cfg, hits) {
  const L = block.L;
  const clean = block.foils.filter((f) => !nfdBase(f.word).includes(L));
  const nFoils = cfg.n - cfg.hits;
  const policy = cfg.foilPolicy || 'any';
  const want = (arr, n, what) => {
    if (arr.length < n) throw new Error(`K-317: letter ${L} has ${arr.length} ${what} foils < ${n}`);
    return rng.sample(arr, n);
  };
  // folded initial: verify() folds too; an un-folded de capital never matched an avoid letter (de panel 2026-09-14)
  if (policy === 'avoid') return want(clean.filter((f) => (block.avoid || []).includes([...f.word.toLocaleLowerCase()][0])), nFoils, `avoid-initial (${(block.avoid || []).join('/')})`);
  if (policy === 'pair-noninitial') {
    const pairFoils = want(clean.filter((f) => [...f.word][0] === block.pair), 2, `pair-initial (${block.pair})`);
    const usedWords = new Set([...hits, ...pairFoils].map((x) => x.word));
    const nonInit = block.items.filter((i) => i.graphemes.indexOf(L) > 0 && !usedWords.has(i.word));
    const carrier = want(nonInit, 1, 'non-initial carrier');
    const rest = want(clean.filter((f) => !usedWords.has(f.word) && [...f.word][0] !== block.pair), nFoils - 3, 'other');
    return [...pairFoils, ...carrier, ...rest];
  }
  return want(clean, nFoils, '');
}

/* ----------------------------------------------------- face 5: the unit */
function unitHits(rng, ub, cfg, ucfg) {
  const u = ub.u;
  const pos = ucfg.huntPos || 'any';
  const cand = (ub.items || []).filter((i) => Array.isArray(i.graphemes) && (pos === 'initial' ? i.graphemes[0] === u : i.graphemes.includes(u)));
  if (cand.length < cfg.hits) throw new Error(`K-317: unit ${u} has ${cand.length} ${pos} items < ${cfg.hits} hits`);
  return rng.sample(cand, cfg.hits);
}
function unitFoils(rng, ub, cfg, ucfg) {
  const u = ub.u;
  const comps = [...u];
  const clean = (ub.foils || []).filter((f) => !nfdBase(f.word).includes(u) && !(f.graphemes || []).includes(u));
  const policy = ucfg.foilPolicy || 'any';
  const pool = policy === 'components' ? clean.filter((f) => comps.every((c) => nfdBase(f.word).includes(c))) : clean;
  const n = cfg.n - cfg.hits;
  if (pool.length < n) throw new Error(`K-317: unit ${u} has ${pool.length} ${policy} foils < ${n}`);
  return rng.sample(pool, n);
}

/* --------------------------------------------- face 3: where is the letter */
function positionOf(item, L, mode) {
  if (mode === 'syllable') {
    const s = item.split || [];
    const k = s.findIndex((syl) => nfdBase(syl).includes(L));
    if (k < 0 || s.length < 2) return -1;
    return k === 0 ? 0 : k === s.length - 1 ? 2 : 1;
  }
  const g = item.graphemes;
  const at = g.indexOf(L);
  if (at < 0) return -1;
  return at === 0 ? 0 : at === g.length - 1 ? 2 : 1;
}
function occursOnce(item, L, mode) {
  if (mode === 'syllable') return (item.split || []).filter((syl) => nfdBase(syl).includes(L)).length === 1;
  return item.graphemes.filter((g) => g === L).length === 1 && [...nfdBase(item.word)].filter((c) => c === L).length === 1;
}
function pickPositions(rng, block, cfg, mode) {
  const L = block.L;
  const once = block.items.filter((i) => Array.isArray(i.graphemes) && occursOnce(i, L, mode));
  const out = [];
  const used = new Set();
  cfg.split.forEach((n, p) => {
    const cand = once.filter((i) => positionOf(i, L, mode) === p && !used.has(i.word));
    if (cand.length < n) throw new Error(`K-317: letter ${L} has ${cand.length} once-only ${['beginning', 'middle', 'end'][p]} items (${mode}) < ${n}`);
    for (const it of rng.sample(cand, n)) { used.add(it.word); out.push({ ...it, pos3: p }); }
  });
  return rng.shuffle(out);
}

/* ----------------------------------------- face 4: circle it in the words */
function letterCount(item, L, chunkLayer) {
  const inWord = [...nfdBase(item.word)].filter((c) => c === L).length;
  const inGraph = (item.graphemes || []).filter((g) => g === L).length;
  // de/nl/sv/no: every L must be its OWN grapheme (a c inside "sch" is not a sound)
  if (chunkLayer && inGraph !== inWord) return -1;
  return inWord;
}
function pickWordHunt(rng, block, cfg, chunkLayer) {
  const L = block.L;
  const [lo, hi] = cfg.occ;
  const cand = block.items.filter((i) => [...i.word].length <= cfg.maxLetters)
    .map((i) => ({ ...i, count: letterCount(i, L, chunkLayer) })).filter((i) => i.count >= lo && i.count <= hi);
  if (cand.length < cfg.rows) throw new Error(`K-317: letter ${L} has ${cand.length} words with ${lo}-${hi} occurrences (<= ${cfg.maxLetters} letters) < ${cfg.rows} rows`);
  // reach minTotal: take the richest words first, as many as the shortfall needs, then fill
  const need = Math.max(0, cfg.minTotal - cfg.rows);
  const multi = cand.filter((i) => i.count > 1);
  const rich = [];
  let extra = 0;
  for (const it of rng.shuffle(multi)) { if (extra >= need) break; rich.push(it); extra += it.count - 1; }
  if (extra < need) throw new Error(`K-317: letter ${L}: ${cfg.rows} words cannot reach ${cfg.minTotal} occurrences (multi-occurrence words carry ${extra})`);
  const usedW = new Set(rich.map((i) => i.word));
  const rest = rng.sample(cand.filter((i) => !usedW.has(i.word)), cfg.rows - rich.length);
  const rows = rng.shuffle([...rich, ...rest]);
  // capsRows rows in block capitals: re-check traceable() AFTER uppercasing (K-284 lesson)
  const capIdx = new Set(rng.sample(rows.map((_, k) => k), cfg.capsRows));
  return rows.map((r, k) => {
    const upper = capIdx.has(k);
    const text = upper ? r.word.toLocaleUpperCase(cfg.locale) : r.word;
    if (upper && !traceable(text)) throw new Error(`K-317: "${text}" is not traceable() in block capitals`);
    return { ...r, upper, text };
  });
}

module.exports = {
  id: 'K-317',
  slug: 'letter-of-the-week',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-of-the-week',
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: (loc) => loadBank(BANK, loc).letters.map((l) => l.L),
    exemplar: (loc) => loadBank(BANK, loc).exemplar,
    tokens: (unit, loc) => { const b = letterBlock(loadBank(BANK, loc), unit); return { U: b.upper, L: b.L, UNIT: unit }; },
  },
  difficulty: {
    1: { hunt: { n: 6, hits: 3, cols: 3, cardW: 212, cardH: 150, iconPx: 110, foilPolicy: 'any', hitPos: 'initial' }, trace: { glyphH: 56, laneH: 90, reps: 4 }, write: { glyphH: 44, laneH: 60 }, card: { w: 150, h: 150, glyphH: 64 } },
    2: { hunt: { n: 8, hits: 4, cols: 4, cardW: 156, cardH: 140, iconPx: 100, foilPolicy: 'avoid', hitPos: 'initial' }, trace: { glyphH: 52, laneH: 80, reps: 5 }, write: { glyphH: 40, laneH: 56 }, card: { w: 150, h: 150, glyphH: 64 } },
    3: { hunt: { n: 8, hits: 4, cols: 4, cardW: 156, cardH: 140, iconPx: 100, foilPolicy: 'pair-noninitial', hitPos: 'initial' }, trace: { glyphH: 48, laneH: 74, reps: 5 }, write: { glyphH: 40, laneH: 56 }, card: { w: 150, h: 150, glyphH: 64 } },
  },
  i18n: {
    en: {
      title: 'Letter of the Week: {U}{L}',
      instruction: 'Trace the big and small letter, circle the four pictures whose name begins with {U}, then write a row of each.',
    },
  },

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), { theme, difficulty, locale: loc, unit }, ctx);
  },

  /** The whole build over an INJECTED bank (the gate's poison seam); build() passes the real one. */
  _buildWith(bank, { difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-317: no difficulty ' + difficulty);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const level = bank.level === 'sound' ? 'sound' : 'letter';
    const face = d.unit ? 'unit' : d.positions ? 'positions' : d.wordHunt ? 'word-hunt' : d.pair ? 'pair' : null;

    // the page's target: a letter block (base + faces 2/3/4/6) or a unit block (face 5)
    let block, L, U;
    if (face === 'unit') {
      block = unitBlock(bank, unit || bank.unitExemplar || (bank.units && bank.units[0] && bank.units[0].u));
      L = block.u; U = block.upper;
    } else {
      block = letterBlock(bank, unit || bank.exemplar);
      L = block.L; U = block.upper;
    }
    const hitPos = (d.hunt && d.hunt.hitPos) || 'initial';
    const scope = hitPos === 'initial' ? 'initial' : 'anywhere';
    const rootStamps = [];
    let zone2, meta;

    if (face === 'positions') {
      // face 3 — WHERE is the letter (beginning / middle / end), the letter once per word
      const p = d.positions;
      const mode = p.mode || bank.positionMode || 'letter';
      const showWord = !!bank.showWordInPositions;
      const items = pickPositions(rng, block, p, mode);
      const html = items.map((it) => positionCard({
        src: fileUri(it.theme, it.noun), vocabKey: it.key, word: it.word, graphemes: it.graphemes, pos: it.pos3,
        split: mode === 'syllable' ? it.split : null, w: p.cardW, h: p.cardH, iconPx: p.iconPx, boxPx: p.boxPx,
        showWord, glyphH: p.glyphH, laneH: p.laneH,
      })).join('');
      const rows = Math.ceil(p.cards / p.cols);
      zone2 = `<div data-lcs-zone="positions" style="display:grid;grid-template-columns:repeat(${p.cols},${p.cardW}px);` +
        `grid-template-rows:repeat(${rows},${p.cardH}px);gap:${GAP}px;width:${COLUMN}px;justify-content:space-between">${html}</div>`;
      rootStamps.push(`data-lcs-face="positions" data-lcs-pos-mode="${mode}" data-lcs-show-word="${showWord ? 1 : 0}" data-lcs-split="${p.split.join(',')}" data-lcs-cards="${p.cards}" data-lcs-icon-px="${p.iconPx}" data-lcs-box-px="${p.boxPx}"`);
      meta = { letter: L, face, words: items.map((i) => i.word), positions: items.map((i) => i.pos3) };
    } else if (face === 'word-hunt') {
      // face 4 — circle every L inside six printed picture words (stroke glyphs), count it
      const w = d.wordHunt;
      const rows = pickWordHunt(rng, block, { ...w, locale: loc }, bank.level === 'sound' && ['de', 'nl', 'sv', 'no'].includes(loc));
      const total = rows.reduce((n, r) => n + r.count, 0);
      const html = rows.map((r) => {
        const lane = strokeWordLane({ text: r.text, w: w.laneW, h: w.laneH, glyphH: w.glyphH, reps: 1, stack: true, padLeft: 10 });
        return `<div class="ws-card" data-lcs-row="1" data-lcs-word="${r.word}" data-lcs-vocab="${r.key}" data-lcs-count="${r.count}" data-lcs-casemode="${r.upper ? 'upper' : 'lower'}" ` +
          `style="width:${COLUMN}px;height:${w.iconPx + 12}px;flex:0 0 auto;padding:4px 8px;flex-direction:row;align-items:center;gap:12px;box-sizing:border-box">` +
          `<img class="ws-icon" src="${fileUri(r.theme, r.noun)}" alt="" data-lcs-pic="${r.key}" style="width:${w.iconPx}px;height:${w.iconPx}px;flex:0 0 auto">` +
          `<div style="flex:0 0 auto">${lane.svg}</div>` +
          `<div style="flex:1 1 auto;display:flex;justify-content:flex-end">${answerBox({ w: w.boxPx, h: w.boxPx, answer: r.count })}</div></div>`;
      }).join('');
      zone2 = `<div data-lcs-zone="word-hunt" style="display:flex;flex-direction:column;gap:${w.gap}px;width:${COLUMN}px">${html}</div>`;
      rootStamps.push(`data-lcs-face="word-hunt" data-lcs-rows="${w.rows}" data-lcs-caps-rows="${w.capsRows}" data-lcs-min-total="${w.minTotal}" data-lcs-total="${total}" data-lcs-occ="${w.occ.join(',')}" data-lcs-icon-px="${w.iconPx}" data-lcs-box-px="${w.boxPx}"`);
      meta = { letter: L, face, words: rows.map((r) => r.text), counts: rows.map((r) => r.count), total };
    } else if (face === 'pair') {
      // face 6 — L or its confusable pair, a | b chips under each picture
      const p = d.pair;
      const a = block.L, b = block.pair;
      if (!b) throw new Error(`K-317: letter ${a} has no pair letter`);
      const alpha = alphabets[loc] || alphabets.en;
      for (const x of [a, b]) if (!alpha.includes(x)) throw new Error(`K-317: pair letter "${x}" is not in the ${loc} alphabet`);
      const aItems = block.items.filter((i) => isHit(i, a, level, 'initial'));
      const bItems = block.foils.filter((f) => !nfdBase(f.word).includes(a) && (level === 'sound' && f.graphemes ? f.graphemes[0] === b : [...f.word.toLocaleLowerCase(loc)][0] === b));
      const [na, nb] = p.split;
      if (aItems.length < na) throw new Error(`K-317: letter ${a} has ${aItems.length} initial items < ${na}`);
      if (bItems.length < nb) throw new Error(`K-317: pair letter ${b} has ${bItems.length} initial foils < ${nb}`);
      const cards = rng.shuffle([
        ...rng.sample(aItems, na).map((i) => ({ ...i, answer: a })),
        ...rng.sample(bItems, nb).map((f) => ({ ...f, graphemes: f.graphemes || [...f.word.toLocaleLowerCase(loc)], answer: b })),
      ]);
      const seen = new Set();
      for (const c of cards) { if (seen.has(c.word)) throw new Error('K-317: duplicate word on the page: ' + c.word); seen.add(c.word); }
      const html = cards.map((c) => `<div class="ws-card" style="width:${p.cardW}px;height:${p.cardH}px;flex:0 0 auto;padding:8px;align-items:center;justify-content:space-between" ` +
        `data-lcs-word="${c.word}" data-lcs-vocab="${c.key}" data-lcs-graphemes="${JSON.stringify(c.graphemes).replace(/"/g, '&quot;')}" data-lcs-answer="${c.answer}">` +
        `<img class="ws-icon" src="${fileUri(c.theme, c.noun)}" alt="" data-lcs-pic="${c.key}" style="width:${p.iconPx}px;height:${p.iconPx}px;flex:0 0 auto">` +
        letterChips({ a, b, px: p.chipPx }) + `</div>`).join('');
      const rows = Math.ceil(p.cards / p.cols);
      zone2 = `<div data-lcs-zone="pair" style="display:grid;grid-template-columns:repeat(${p.cols},${p.cardW}px);` +
        `grid-template-rows:repeat(${rows},${p.cardH}px);gap:${GAP}px;width:${COLUMN}px;justify-content:space-between">${html}</div>`;
      rootStamps.push(`data-lcs-face="pair" data-lcs-pair-a="${a}" data-lcs-pair-b="${b}" data-lcs-split="${p.split.join(',')}" data-lcs-cards="${p.cards}" data-lcs-icon-px="${p.iconPx}" data-lcs-chip-px="${p.chipPx}"`);
      meta = { letter: L, face, pair: b, words: cards.map((c) => c.word), answers: cards.map((c) => c.answer) };
    } else {
      // zone 2 — the hunt (base / face 2 / face 5)
      const hits = face === 'unit' ? unitHits(rng, block, d.hunt, d.unit) : pickHits(rng, block, d.hunt, level);
      const foils = face === 'unit' ? unitFoils(rng, block, d.hunt, d.unit) : pickFoils(rng, block, d.hunt, hits);
      const cards = rng.shuffle([...hits.map((i) => ({ ...i, hit: true })), ...foils.map((f) => ({ ...f, hit: false }))]);
      const seenW = new Set();
      for (const c of cards) { if (seenW.has(c.word)) throw new Error('K-317: duplicate word on the page: ' + c.word); seenW.add(c.word); }
      const huntHtml = cards.map((c) => huntCard({
        src: fileUri(c.theme, c.noun), vocabKey: c.key, word: c.word,
        graphemes: c.graphemes || [...c.word.toLocaleLowerCase(loc)], hit: c.hit,
        w: d.hunt.cardW, h: d.hunt.cardH, iconPx: d.hunt.iconPx, rot: rng.next() * 8 - 4,
      })).join('');
      const huntRows = Math.ceil(d.hunt.n / d.hunt.cols);
      zone2 = `<div data-lcs-zone="hunt" style="display:grid;grid-template-columns:repeat(${d.hunt.cols},${d.hunt.cardW}px);` +
        `grid-template-rows:repeat(${huntRows},${d.hunt.cardH}px);gap:${GAP}px;width:${COLUMN}px;justify-content:space-between">${huntHtml}</div>`;
      if (face === 'unit') rootStamps.push(`data-lcs-face="unit" data-lcs-unit="${L}" data-lcs-unit-pos="${d.unit.huntPos || 'any'}" data-lcs-unit-foils="${d.unit.foilPolicy || 'any'}"`);
      if (d.hunt.minMedial) rootStamps.push(`data-lcs-min-medial="${d.hunt.minMedial}"`);
      meta = { letter: L, hits: hits.map((h) => h.word), foils: foils.map((f) => f.word), scope };
      if (face) meta.face = face;
    }

    // zone 1 — letter card + trace lanes (the card may grow for a wide unit; the lanes take what is left)
    const cardText = face === 'unit' ? U : U + L;
    const card = letterCard({ text: cardText, w: d.card.w, h: d.card.h, glyphH: d.card.glyphH });
    const laneW = COLUMN - card.width - CARD_GAP;
    let reps = d.trace.reps;
    if (face === 'unit') {
      // a wide unit ("Sch") must not overlap its own dashed reps: shrink reps to what the lane holds
      const unitW = letterStrokes.textGlyphs(U).width * (d.trace.glyphH / 68);
      while (reps > 2 && laneW / reps < unitW + 12) reps--;
    }
    const laneUp = strokeLetterLane({ text: U, w: laneW, h: d.trace.laneH, glyphH: d.trace.glyphH, reps, emptyLast: true });
    const laneLo = d.trace.lanes === 'upper' ? null : strokeLetterLane({ text: L, w: laneW, h: d.trace.laneH, glyphH: d.trace.glyphH, reps, emptyLast: true, lowercase: true });
    const zone1 = `<div data-lcs-zone="trace" style="display:flex;align-items:center;gap:${CARD_GAP}px;width:${COLUMN}px">${card.html}` +
      `<div style="display:flex;flex-direction:column;gap:6px">${laneUp.svg}${laneLo ? laneLo.svg : ''}</div></div>`;

    // zone 3 — write rows: solid model at the left, the rest of the trio empty (absent when write:null)
    let zone3 = '';
    if (d.write) {
      const wUp = strokeWordLane({ text: U, w: COLUMN, h: d.write.laneH, glyphH: d.write.glyphH, reps: 1, stack: true, padLeft: 10 });
      const wLo = strokeWordLane({ text: L, w: COLUMN, h: d.write.laneH, glyphH: d.write.glyphH, reps: 1, stack: true, padLeft: 10 });
      zone3 = `<div data-lcs-zone="write" style="display:flex;flex-direction:column;gap:6px;width:${COLUMN}px">${wUp.svg}${wLo.svg}</div>`;
    }

    const huntStamps = d.hunt
      ? `data-lcs-hits="${d.hunt.hits}" data-lcs-cards="${d.hunt.n}" data-lcs-foil-policy="${d.hunt.foilPolicy || 'any'}" `
      : '';
    const bodyHtml = `<div data-ws-content data-lcs-target="${L}" data-lcs-target-upper="${U}" data-lcs-level="${level}" ` +
      `data-lcs-scope="${scope}" ${huntStamps}` +
      `data-lcs-pair="${block.pair || ''}" data-lcs-avoid="${(block.avoid || []).join(',')}" ` + (d.hunt ? `data-lcs-icon-px="${d.hunt.iconPx}" ` : '') +
      (rootStamps.length ? rootStamps.join(' ') + ' ' : '') + (d.trace.lanes === 'upper' ? 'data-lcs-lanes="upper" ' : '') +
      `style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;min-height:0">` +
      zone1 + zone2 + zone3 + `</div>`;
    return { bodyHtml, meta };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-target]');
      if (!root) return ['no letter-of-the-week root'];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const L = root.dataset.lcsTarget, U = root.dataset.lcsTargetUpper;
      const level = root.dataset.lcsLevel, scope = root.dataset.lcsScope, policy = root.dataset.lcsFoilPolicy;
      const face = root.dataset.lcsFace || null;
      const wantHits = +root.dataset.lcsHits, wantCards = +root.dataset.lcsCards;
      const pair = root.dataset.lcsPair, avoid = (root.dataset.lcsAvoid || '').split(',').filter(Boolean);
      if (!L || !U || U.toLocaleLowerCase(lang) !== L) fails.push(`target stamp ${U}/${L} inconsistent`);
      if (!['letter', 'sound'].includes(level)) fails.push('level stamp ' + level);
      if (!['initial', 'anywhere'].includes(scope)) fails.push('scope stamp ' + scope);
      const nfd = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase(lang);
      const words = [];
      const imgOk = (c, i, what) => {
        const img = c.querySelectorAll('img');
        if (img.length !== 1 || !img[0].complete || img[0].naturalWidth === 0) fails.push(`${what} ${i + 1}: picture missing/broken`);
      };
      const parseG = (c, i, what) => {
        let g; try { g = JSON.parse(c.dataset.lcsGraphemes); } catch (e) { g = null; }
        if (!Array.isArray(g) || !g.length) { fails.push(`${what} ${i + 1}: no graphemes`); return null; }
        if (g.join('') !== c.dataset.lcsWord.toLocaleLowerCase(lang)) fails.push(`${what} ${i + 1}: graphemes ≠ word`);
        return g;
      };
      const noDup = (() => { const w = new Set(), k = new Set(); return (c, i, what) => {
        if (w.has(c.dataset.lcsWord)) fails.push(`${what} ${i + 1}: duplicate word`); w.add(c.dataset.lcsWord);
        if (k.has(c.dataset.lcsVocab)) fails.push(`${what} ${i + 1}: duplicate vocab key`); k.add(c.dataset.lcsVocab);
      }; })();

      if (face === 'positions') {
        // face 3 — every card's position re-derived from its graphemes (or syllables); the letter once; split honoured
        const mode = root.dataset.lcsPosMode, showWord = root.dataset.lcsShowWord === '1';
        const split = root.dataset.lcsSplit.split(',').map(Number);
        const cards = [...root.querySelectorAll('[data-lcs-word][data-lcs-pos]')];
        if (cards.length !== +root.dataset.lcsCards || cards.length !== split.reduce((a, b) => a + b, 0)) fails.push(`${cards.length} position cards, want ${root.dataset.lcsCards}`);
        const got = [0, 0, 0];
        cards.forEach((c, i) => {
          const word = c.dataset.lcsWord; words.push(word); noDup(c, i, 'card'); imgOk(c, i, 'card');
          const g = parseG(c, i, 'card'); if (!g) return;
          let derived, n;
          if (mode === 'syllable') {
            let s; try { s = JSON.parse(c.dataset.lcsSplit); } catch (e) { s = null; }
            if (!Array.isArray(s) || s.length < 2 || s.join('') !== word.toLocaleLowerCase(lang)) { fails.push(`card ${i + 1}: syllable split missing/≠ word`); return; }
            const idx = s.map((syl, k) => (nfd(syl).includes(L) ? k : -1)).filter((k) => k >= 0);
            n = idx.length; derived = n ? (idx[0] === 0 ? 0 : idx[0] === s.length - 1 ? 2 : 1) : -1;
          } else {
            const idx = g.map((x, k) => (x === L ? k : -1)).filter((k) => k >= 0);
            n = idx.length; derived = n ? (idx[0] === 0 ? 0 : idx[0] === g.length - 1 ? 2 : 1) : -1;
            if ([...nfd(word)].filter((ch) => ch === L).length !== 1) fails.push(`card ${i + 1}: "${word}" carries ${L} more than once`);
          }
          if (n !== 1) fails.push(`card ${i + 1}: "${word}" carries ${L} ${n} times (want once)`);
          if (String(derived) !== c.dataset.lcsPos) fails.push(`card ${i + 1}: "${word}" stamped pos ${c.dataset.lcsPos} but derived ${derived}`);
          if (derived >= 0) got[derived]++;
          const boxes = [...c.querySelectorAll('[data-lcs-posbox]')];
          if (boxes.length !== 3 || boxes.map((b) => b.dataset.lcsPosbox).join('') !== '012') fails.push(`card ${i + 1}: position boxes ${boxes.length}`);
          boxes.forEach((b) => { if (b.textContent.trim() || b.dataset.lcsAnswer) fails.push(`card ${i + 1}: a position box is not empty`); });
          const lanes = c.querySelectorAll('[data-lcs-prim="trace-word"]');
          if (showWord !== (lanes.length === 1)) fails.push(`card ${i + 1}: word lane ${lanes.length}, showWord ${showWord}`);
          if (showWord && lanes[0].dataset.lcsText !== word) fails.push(`card ${i + 1}: word lane prints "${lanes[0].dataset.lcsText}"`);
          if (c.querySelector('text')) fails.push(`card ${i + 1}: <text> on a position card`);
        });
        if (got.join(',') !== split.join(',')) fails.push(`positions ${got.join('/')} ≠ split ${split.join('/')}`);
        if ((level === 'letter') !== showWord && mode === 'letter') fails.push(`showWord ${showWord} at level ${level}`);
      } else if (face === 'word-hunt') {
        // face 4 — recount the target in every printed word (case-insensitively); caps rows all-capital; total floor
        const rows = [...root.querySelectorAll('[data-lcs-row]')];
        if (rows.length !== +root.dataset.lcsRows) fails.push(`${rows.length} rows, want ${root.dataset.lcsRows}`);
        let total = 0, caps = 0;
        const [lo, hi] = root.dataset.lcsOcc.split(',').map(Number);
        rows.forEach((r, i) => {
          const word = r.dataset.lcsWord; words.push(word); noDup(r, i, 'row'); imgOk(r, i, 'row');
          const lane = r.querySelector('[data-lcs-prim="trace-word"]');
          if (!lane) { fails.push(`row ${i + 1}: no word lane`); return; }
          const text = lane.dataset.lcsText;
          if (text.toLocaleLowerCase(lang) !== word.toLocaleLowerCase(lang)) fails.push(`row ${i + 1}: lane prints "${text}" for "${word}"`);
          const n = [...nfd(text)].filter((ch) => ch === L).length;
          if (n < lo || n > hi) fails.push(`row ${i + 1}: "${word}" carries ${L} ${n} times, want ${lo}-${hi}`);
          if (String(n) !== r.dataset.lcsCount) fails.push(`row ${i + 1}: stamped count ${r.dataset.lcsCount} ≠ ${n}`);
          const box = r.querySelector('[data-lcs-answer]');
          if (!box || box.dataset.lcsAnswer !== String(n)) fails.push(`row ${i + 1}: answer box ${box ? box.dataset.lcsAnswer : 'missing'} ≠ ${n}`);
          if (box && box.textContent.trim()) fails.push(`row ${i + 1}: the answer box prints something`);
          const upper = r.dataset.lcsCasemode === 'upper';
          if (upper) { caps++; if (text !== text.toLocaleUpperCase(lang)) fails.push(`row ${i + 1}: caps row prints "${text}"`); }
          else if (text !== text.toLocaleLowerCase(lang) && lang !== 'de') fails.push(`row ${i + 1}: lower row prints "${text}"`);
          if (lane.dataset.lcsReps !== '1') fails.push(`row ${i + 1}: reps ${lane.dataset.lcsReps}`);
          if (lane.querySelectorAll('text').length || r.querySelector('text')) fails.push(`row ${i + 1}: <text> on a word row`);
          total += n;
        });
        if (caps !== +root.dataset.lcsCapsRows) fails.push(`${caps} caps rows, want ${root.dataset.lcsCapsRows}`);
        if (total !== +root.dataset.lcsTotal) fails.push(`total ${total} ≠ stamp ${root.dataset.lcsTotal}`);
        if (total < +root.dataset.lcsMinTotal) fails.push(`total ${total} < ${root.dataset.lcsMinTotal}`);
      } else if (face === 'pair') {
        // face 6 — the answer under every picture re-derived from its first grapheme; a/b split; chips fixed
        const a = root.dataset.lcsPairA, b = root.dataset.lcsPairB;
        const split = root.dataset.lcsSplit.split(',').map(Number);
        if (a !== L) fails.push(`pair a ${a} ≠ target ${L}`);
        if (!a || !b || a === b || [...a].length !== 1 || [...b].length !== 1) fails.push(`pair letters ${a}/${b}`);
        if (pair && b !== pair) fails.push(`pair b ${b} ≠ block pair ${pair}`);
        const cards = [...root.querySelectorAll('[data-lcs-word][data-lcs-answer]')];
        if (cards.length !== +root.dataset.lcsCards) fails.push(`${cards.length} pair cards, want ${root.dataset.lcsCards}`);
        const got = { [a]: 0, [b]: 0 };
        cards.forEach((c, i) => {
          const word = c.dataset.lcsWord; words.push(word); noDup(c, i, 'card'); imgOk(c, i, 'card');
          const g = parseG(c, i, 'card'); if (!g) return;
          const first = level === 'sound' ? g[0] : [...word.toLocaleLowerCase(lang)][0];
          if (first !== a && first !== b) fails.push(`card ${i + 1}: "${word}" begins with ${first}, neither ${a} nor ${b}`);
          if (c.dataset.lcsAnswer !== first) fails.push(`card ${i + 1}: "${word}" stamped ${c.dataset.lcsAnswer} but begins with ${first}`);
          if (first === b && nfd(word).includes(a)) fails.push(`card ${i + 1}: ${b}-word "${word}" contains ${a}`);
          got[first] = (got[first] || 0) + 1;
          const chips = [...c.querySelectorAll('[data-lcs-chip]')];
          if (chips.length !== 2 || chips[0].dataset.lcsChip !== a || chips[1].dataset.lcsChip !== b) fails.push(`card ${i + 1}: chips ${chips.map((x) => x.dataset.lcsChip).join('|')}, want ${a}|${b}`);
          chips.forEach((ch) => { if (ch.textContent.trim() !== ch.dataset.lcsChip) fails.push(`card ${i + 1}: chip prints "${ch.textContent.trim()}"`); });
          // nothing else printed on the card (the chips are the only characters)
          const other = [...c.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
          if (other.length) fails.push(`card ${i + 1}: stray text`);
        });
        if (got[a] !== split[0] || got[b] !== split[1]) fails.push(`split ${got[a]}/${got[b]} ≠ ${split.join('/')}`);
      } else {
        // zone 2 — every card's hit re-derived from its own stamps (base / face 2 / face 5)
        const unit = face === 'unit' ? root.dataset.lcsUnit : null;
        const unitFoilPolicy = root.dataset.lcsUnitFoils;
        const minMedial = +(root.dataset.lcsMinMedial || 0);
        if (unit && (unit !== L || [...unit].length < 2)) fails.push(`unit stamp ${unit} ≠ target ${L}`);
        const cards = [...root.querySelectorAll('[data-lcs-word][data-lcs-hit]')];
        if (cards.length !== wantCards) fails.push(`${cards.length} hunt cards, want ${wantCards}`);
        let hitN = 0, foilN = 0, carriers = 0, pairN = 0, medialN = 0;
        cards.forEach((c, i) => {
          const word = c.dataset.lcsWord;
          let g; try { g = JSON.parse(c.dataset.lcsGraphemes); } catch (e) { g = null; }
          if (!Array.isArray(g) || !g.length) { fails.push(`card ${i + 1}: no graphemes`); return; }
          if (level === 'letter' && g.join('') !== word.toLocaleLowerCase(lang)) fails.push(`card ${i + 1}: graphemes ≠ word`);
          words.push(word); noDup(c, i, 'card');
          const first = level === 'sound' ? g[0] : [...word.toLocaleLowerCase(lang)][0];
          const at = g.indexOf(L);
          const stamped = c.dataset.lcsHit === '1';
          if (unit) {
            // face 5: hit iff the unit is ONE grapheme; a foil carries no unit grapheme AND no unit substring
            const derived = root.dataset.lcsUnitPos === 'initial' ? g[0] === unit : g.includes(unit);
            if (derived !== stamped) fails.push(`card ${i + 1}: "${word}" stamped hit=${stamped ? 1 : 0} but unit ${unit} ${derived ? 'is' : 'is not'} a grapheme`);
            if (stamped) hitN++;
            else {
              foilN++;
              if (nfd(word).includes(unit)) fails.push(`card ${i + 1}: foil "${word}" contains the unit ${unit}`);
              if (unitFoilPolicy === 'components' && ![...unit].every((ch) => nfd(word).includes(ch))) fails.push(`card ${i + 1}: foil "${word}" does not carry every letter of ${unit}`);
            }
          } else {
            const derived = scope === 'initial' ? first === L : at > 0;
            if (derived !== stamped) fails.push(`card ${i + 1}: "${word}" stamped hit=${stamped ? 1 : 0} but ${scope === 'initial' ? 'begins with ' + first : 'letter at ' + at}`);
            if (stamped) { hitN++; if (scope === 'anywhere' && at < g.length - 1) medialN++; }
            else {
              foilN++;
              if (scope === 'initial' && first === L) fails.push(`card ${i + 1}: foil "${word}" begins with ${L}`);
              const carries = nfd(word).includes(L);
              if (carries) carriers++;
              if (policy !== 'pair-noninitial' && carries) fails.push(`card ${i + 1}: foil "${word}" contains ${L}`);
              if (policy === 'avoid' && !avoid.includes(first)) fails.push(`card ${i + 1}: foil "${word}" does not begin with an avoid letter (${avoid.join('/')})`);
              if (first === pair) pairN++;
            }
          }
          const img = c.querySelectorAll('img');
          if (img.length !== 1 || !img[0].complete || img[0].naturalWidth === 0) fails.push(`card ${i + 1}: picture missing/broken`);
          if (c.querySelector('text') || c.textContent.trim()) fails.push(`card ${i + 1}: text on a hunt card`);
        });
        if (hitN !== wantHits) fails.push(`${hitN} hits, want ${wantHits}`);
        if (foilN !== wantCards - wantHits) fails.push(`${foilN} foils, want ${wantCards - wantHits}`);
        if (minMedial && medialN < minMedial) fails.push(`${medialN} medial hits < ${minMedial}`);
        if (policy === 'pair-noninitial') {
          if (carriers !== 1) fails.push(`pair-noninitial: ${carriers} foils carry ${L} non-initially, want exactly 1`);
          if (pairN < 2) fails.push(`pair-noninitial: ${pairN} foils begin with the pair letter ${pair}, want >= 2`);
        }
      }

      // zone 1 — the letter lanes (upper / lower, or upper only on a slim face), reps and empty slot, model solid
      const slim = root.dataset.lcsLanes === 'upper';
      const lanes = [...root.querySelectorAll('[data-lcs-prim="trace-letter"]')];
      const laneTexts = lanes.filter((l) => !l.closest('[data-lcs-letter-card]')).map((l) => l.dataset.lcsText);
      const wantLanes = slim ? [U] : [U, L];
      if (laneTexts.join('|') !== wantLanes.join('|')) fails.push(`trace lanes ${JSON.stringify(laneTexts)}, want ${JSON.stringify(wantLanes)}`);
      lanes.forEach((l) => {
        if (l.querySelectorAll('text').length && +l.dataset.lcsStrokes) {
          // stroke-order badges are legal text only on large lanes; none here (glyphH < 80)
          fails.push(`lane ${l.dataset.lcsText}: <text> in a trace lane`);
        }
        if (!l.closest('[data-lcs-letter-card]') && !l.dataset.lcsEmptySlot) fails.push(`lane ${l.dataset.lcsText}: no empty slot`);
      });
      const card = root.querySelector('[data-lcs-letter-card]');
      const wantCard = face === 'unit' ? U : U + L;
      if (!card || card.dataset.lcsLetterCard !== wantCard) fails.push('letter card missing or wrong text');

      // zone 3 — two stacked write rows, ONE solid model each (absent on the slim faces)
      const writes = [...root.querySelectorAll('[data-lcs-zone="write"] [data-lcs-prim="trace-word"]')];
      const wTexts = writes.map((w) => w.dataset.lcsText);
      const hasWrite = !!root.querySelector('[data-lcs-zone="write"]');
      if (hasWrite && (wTexts.length !== 2 || wTexts[0] !== U || wTexts[1] !== L)) fails.push(`write rows ${JSON.stringify(wTexts)}, want [${U},${L}]`);
      if (!hasWrite && !['positions', 'word-hunt', 'pair'].includes(face)) fails.push('write rows missing');
      writes.forEach((w) => {
        if (w.dataset.lcsReps !== '1') fails.push(`write row ${w.dataset.lcsText}: reps ${w.dataset.lcsReps}`);
        const paths = [...w.querySelectorAll('path')];
        if (paths.some((p) => p.getAttribute('stroke-dasharray'))) fails.push(`write row ${w.dataset.lcsText}: dashed model`);
        if (w.querySelectorAll('text').length) fails.push(`write row ${w.dataset.lcsText}: <text>`);
      });

      // the answer is never printed: no text node equals a stamped word
      const walker = document.createTreeWalker(document.querySelector('.ws-page'), NodeFilter.SHOW_TEXT);
      const wl = new Set(words.map((w) => w.toLocaleLowerCase(lang)));
      let n;
      while ((n = walker.nextNode())) {
        const t = n.textContent.trim().toLocaleLowerCase(lang);
        if (t && wl.has(t)) fails.push(`text node prints a hidden word: "${t}"`);
      }
      return fails;
    });
  },
};
