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
 *   knobs the base already carries, stamped as data-lcs-scope) / trace.* /
 *   write.* px sizes. A pool that cannot fill the config THROWS (refusal).
 */
'use strict';
const { strokeLetterLane, strokeWordLane } = require('../../primitives/trace-path.js');
const { bank: loadBank, nfdBase } = require('../../lib/b3-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const { letterCard, huntCard } = require('../../templates/components-b3.js');

const BANK = 'letter-of-the-week';
const COLUMN = 660;   // the design column inside the 675 px body (page 703 − 2 × 14)
const GAP = 12;       // hunt-grid gap
const CARD_GAP = 14;  // letterCard ↔ lanes

function letterBlock(bank, L) {
  const b = (bank.letters || []).find((x) => x.L === L);
  if (!b) throw new Error(`K-317: letter "${L}" is not in the bank (letters: ${(bank.letters || []).map((x) => x.L).join(',')})`);
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
  if (policy === 'avoid') return want(clean.filter((f) => (block.avoid || []).includes([...f.word][0])), nFoils, `avoid-initial (${(block.avoid || []).join('/')})`);
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
    const L = unit || bank.exemplar;
    const block = letterBlock(bank, L);
    const hitPos = d.hunt.hitPos || 'initial';
    const scope = hitPos === 'initial' ? 'initial' : 'anywhere';

    // zone 2 — the hunt
    const hits = pickHits(rng, block, d.hunt, level);
    const foils = pickFoils(rng, block, d.hunt, hits);
    const cards = rng.shuffle([...hits.map((i) => ({ ...i, hit: true })), ...foils.map((f) => ({ ...f, hit: false }))]);
    const seenW = new Set();
    for (const c of cards) { if (seenW.has(c.word)) throw new Error('K-317: duplicate word on the page: ' + c.word); seenW.add(c.word); }
    const huntHtml = cards.map((c) => huntCard({
      src: fileUri(c.theme, c.noun), vocabKey: c.key, word: c.word,
      graphemes: c.graphemes || [...c.word.toLocaleLowerCase(loc)], hit: c.hit,
      w: d.hunt.cardW, h: d.hunt.cardH, iconPx: d.hunt.iconPx, rot: rng.next() * 8 - 4,
    })).join('');
    const huntRows = Math.ceil(d.hunt.n / d.hunt.cols);
    const zone2 = `<div data-lcs-zone="hunt" style="display:grid;grid-template-columns:repeat(${d.hunt.cols},${d.hunt.cardW}px);` +
      `grid-template-rows:repeat(${huntRows},${d.hunt.cardH}px);gap:${GAP}px;width:${COLUMN}px;justify-content:space-between">${huntHtml}</div>`;

    // zone 1 — letter card + trace lanes (the card may grow for a wide unit; the lanes take what is left)
    const card = letterCard({ text: block.upper + block.L, w: d.card.w, h: d.card.h, glyphH: d.card.glyphH });
    const laneW = COLUMN - card.width - CARD_GAP;
    const laneUp = strokeLetterLane({ text: block.upper, w: laneW, h: d.trace.laneH, glyphH: d.trace.glyphH, reps: d.trace.reps, emptyLast: true });
    const laneLo = strokeLetterLane({ text: block.L, w: laneW, h: d.trace.laneH, glyphH: d.trace.glyphH, reps: d.trace.reps, emptyLast: true, lowercase: true });
    const zone1 = `<div data-lcs-zone="trace" style="display:flex;align-items:center;gap:${CARD_GAP}px;width:${COLUMN}px">${card.html}` +
      `<div style="display:flex;flex-direction:column;gap:6px">${laneUp.svg}${laneLo.svg}</div></div>`;

    // zone 3 — write rows: solid model at the left, the rest of the trio empty
    const wUp = strokeWordLane({ text: block.upper, w: COLUMN, h: d.write.laneH, glyphH: d.write.glyphH, reps: 1, stack: true, padLeft: 10 });
    const wLo = strokeWordLane({ text: block.L, w: COLUMN, h: d.write.laneH, glyphH: d.write.glyphH, reps: 1, stack: true, padLeft: 10 });
    const zone3 = `<div data-lcs-zone="write" style="display:flex;flex-direction:column;gap:6px;width:${COLUMN}px">${wUp.svg}${wLo.svg}</div>`;

    const bodyHtml = `<div data-ws-content data-lcs-target="${block.L}" data-lcs-target-upper="${block.upper}" data-lcs-level="${level}" ` +
      `data-lcs-scope="${scope}" data-lcs-hits="${d.hunt.hits}" data-lcs-cards="${d.hunt.n}" data-lcs-foil-policy="${d.hunt.foilPolicy || 'any'}" ` +
      `data-lcs-pair="${block.pair || ''}" data-lcs-avoid="${(block.avoid || []).join(',')}" data-lcs-icon-px="${d.hunt.iconPx}" ` +
      `style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;min-height:0">` +
      zone1 + zone2 + zone3 + `</div>`;
    return { bodyHtml, meta: { letter: block.L, hits: hits.map((h) => h.word), foils: foils.map((f) => f.word), scope } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-target]');
      if (!root) return ['no letter-of-the-week root'];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const L = root.dataset.lcsTarget, U = root.dataset.lcsTargetUpper;
      const level = root.dataset.lcsLevel, scope = root.dataset.lcsScope, policy = root.dataset.lcsFoilPolicy;
      const wantHits = +root.dataset.lcsHits, wantCards = +root.dataset.lcsCards;
      const pair = root.dataset.lcsPair, avoid = (root.dataset.lcsAvoid || '').split(',').filter(Boolean);
      if (!L || !U || U.toLocaleLowerCase(lang) !== L) fails.push(`target stamp ${U}/${L} inconsistent`);
      if (!['letter', 'sound'].includes(level)) fails.push('level stamp ' + level);
      if (!['initial', 'anywhere'].includes(scope)) fails.push('scope stamp ' + scope);
      const nfd = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase(lang);

      // zone 2 — every card's hit re-derived from its own stamps
      const cards = [...root.querySelectorAll('[data-lcs-word][data-lcs-hit]')];
      if (cards.length !== wantCards) fails.push(`${cards.length} hunt cards, want ${wantCards}`);
      const words = [], seenW = new Set(), seenK = new Set();
      let hitN = 0, foilN = 0, carriers = 0, pairN = 0;
      cards.forEach((c, i) => {
        const word = c.dataset.lcsWord;
        let g; try { g = JSON.parse(c.dataset.lcsGraphemes); } catch (e) { g = null; }
        if (!Array.isArray(g) || !g.length) { fails.push(`card ${i + 1}: no graphemes`); return; }
        if (level === 'letter' && g.join('') !== word.toLocaleLowerCase(lang)) fails.push(`card ${i + 1}: graphemes ≠ word`);
        words.push(word);
        if (seenW.has(word)) fails.push(`card ${i + 1}: duplicate word`); seenW.add(word);
        if (seenK.has(c.dataset.lcsVocab)) fails.push(`card ${i + 1}: duplicate vocab key`); seenK.add(c.dataset.lcsVocab);
        const first = level === 'sound' ? g[0] : [...word.toLocaleLowerCase(lang)][0];
        const at = g.indexOf(L);
        const derived = scope === 'initial' ? first === L : at > 0;
        const stamped = c.dataset.lcsHit === '1';
        if (derived !== stamped) fails.push(`card ${i + 1}: "${word}" stamped hit=${stamped ? 1 : 0} but ${scope === 'initial' ? 'begins with ' + first : 'letter at ' + at}`);
        if (stamped) hitN++;
        else {
          foilN++;
          if (scope === 'initial' && first === L) fails.push(`card ${i + 1}: foil "${word}" begins with ${L}`);
          const carries = nfd(word).includes(L);
          if (carries) carriers++;
          if (policy !== 'pair-noninitial' && carries) fails.push(`card ${i + 1}: foil "${word}" contains ${L}`);
          if (policy === 'avoid' && !avoid.includes(first)) fails.push(`card ${i + 1}: foil "${word}" does not begin with an avoid letter (${avoid.join('/')})`);
          if (first === pair) pairN++;
        }
        const img = c.querySelectorAll('img');
        if (img.length !== 1 || !img[0].complete || img[0].naturalWidth === 0) fails.push(`card ${i + 1}: picture missing/broken`);
        if (c.querySelector('text') || c.textContent.trim()) fails.push(`card ${i + 1}: text on a hunt card`);
      });
      if (hitN !== wantHits) fails.push(`${hitN} hits, want ${wantHits}`);
      if (foilN !== wantCards - wantHits) fails.push(`${foilN} foils, want ${wantCards - wantHits}`);
      if (policy === 'pair-noninitial') {
        if (carriers !== 1) fails.push(`pair-noninitial: ${carriers} foils carry ${L} non-initially, want exactly 1`);
        if (pairN < 2) fails.push(`pair-noninitial: ${pairN} foils begin with the pair letter ${pair}, want >= 2`);
      }

      // zone 1 — two letter lanes (upper / lower), reps and empty slot, model solid
      const lanes = [...root.querySelectorAll('[data-lcs-prim="trace-letter"]')];
      const laneTexts = lanes.filter((l) => !l.closest('[data-lcs-letter-card]')).map((l) => l.dataset.lcsText);
      if (laneTexts.length !== 2 || laneTexts[0] !== U || laneTexts[1] !== L) fails.push(`trace lanes ${JSON.stringify(laneTexts)}, want [${U},${L}]`);
      lanes.forEach((l) => {
        if (l.querySelectorAll('text').length && +l.dataset.lcsStrokes) {
          // stroke-order badges are legal text only on large lanes; none here (glyphH < 80)
          fails.push(`lane ${l.dataset.lcsText}: <text> in a trace lane`);
        }
        if (!l.closest('[data-lcs-letter-card]') && !l.dataset.lcsEmptySlot) fails.push(`lane ${l.dataset.lcsText}: no empty slot`);
      });
      const card = root.querySelector('[data-lcs-letter-card]');
      if (!card || card.dataset.lcsLetterCard !== U + L) fails.push('letter card missing or wrong text');

      // zone 3 — two stacked write rows, ONE solid model each
      const writes = [...root.querySelectorAll('[data-lcs-prim="trace-word"]')];
      const wTexts = writes.map((w) => w.dataset.lcsText);
      if (wTexts.length !== 2 || wTexts[0] !== U || wTexts[1] !== L) fails.push(`write rows ${JSON.stringify(wTexts)}, want [${U},${L}]`);
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
