/**
 * G1-376 — Parts of a Plant: tag the plant (nt10-E, b5; family key `plants`, G1,
 * science, no CCSS — `teaches` "Parts of a plant (science readiness)"; en prose names
 * NGSS 1-LS1-1). Design: docs/worksheet-gen/b5-designs/G1-376-plants.md §2/§5; every
 * ruling in _work/G1-376-critic.md; build record _work/G1-376-build.md.
 *
 * ONE drawn plant (primitives/plant-figure.js, 592 px, teal line art in a see-through
 * cream soil box so the ROOTS show as clearly as the flower) fills the left of the
 * page; six coral numbered tags hang on thin teal threads from six parts, each thread
 * ending on a teal ring round the exact part (one seed inside the opened pod, the
 * solid pod tip for the fruit). On the right a cream label card holds six numbered
 * EMPTY writing rows; a six-word bank sits on top. The child follows a tag's thread
 * and writes that part's name on the row with the same number. No library picture.
 *
 * THEME axis OFF, no unitAxis. build() reads ONLY its bank (lib/b5-common.js
 * bank('plants', loc) — a missing locale block THROWS, never an en fallback); every
 * printed word is a whole panel literal `partWords[id]` (a literal that is missing,
 * carries a `{` slot or a digit REFUSES). Never image-vocabulary.js at render.
 *
 * Ladder (a CONFIG; every guard keys on the RESOLVED keys, never the level index):
 *   d1  parts root stem leaf flower           · bank · rows 4 / rowH 72 / glyphH 32
 *   d2  parts root stem leaf flower fruit seed · bank · rows 6 / rowH 64 / glyphH 30  (ships)
 *   d3  same six, NO bank (recall; a scaffold level, never shipped)
 *
 * COMPOSER (locale-neutral — same anchors, numbers and bank order in all 11 locales):
 * one candidate anchor per part (flower/leaf/stem/root have two, fruit/seed one);
 * tag numbers = rng.shuffle(1..N), re-drawn until NOT top-to-bottom (by tag y) and
 * NOT bottom-to-top; bank order = rng.shuffle, re-drawn until it differs from the
 * part order of tags 1..N AND its reverse.
 *
 * Layout (design §2): root grid rows `auto <figureH>px`, TOP-ANCHORED (align-content:start —
 * the nt10-D SPARSE ruling: slack falls BELOW the stage, never between the bank and the
 * plant; bank margin 10 + the flower's 12-unit top = a ~22 px gap), stage row = grid
 * 380 | 16 | 279 = 675; the label card is centred on the plant (top near the flower,
 * bottom near the soil box).
 * Stack 69 + 592 = 661 at the minimum. MEASURED (qa/verify-b5-plants.js): a 4-line title + 3-line
 * instruction leaves a 667 px body (not the ruled 677), so the design's h 600 plant
 * (stack 669) overflowed the footer by 3 px; the plant is drawn at h 592 (scale 0.987,
 * every px-sized mark — tags, rings, strokes — unchanged). Recorded in the build report.
 * FILL (base review 2026-09-23): the stage row is minmax(figureH, figureMax) — the plant GROWS
 * with the body (plantFillStage: meet, top-anchored) to 680 (d1/d2, under the bank) / 712 (d3,
 * the 380 px width limit), so at the 814 chrome it ends at ~94 % / ~89 % of the body and at the
 * 667 fi body it stays at its 592 minimum. Anchors are stamped in VIEWBOX units (data-lcs-anchors-u
 * + data-lcs-vb); verify() maps them through the rendered svg's CTM.
 *
 * Stamps: root [data-ws-content][data-lcs-type="plants"] data-lcs-parts (ids in part
 * order) data-lcs-numbers (JSON id -> n) data-lcs-anchors-u (viewBox JSON) data-lcs-vb
 * data-lcs-figure-max data-lcs-rows/-row-h/-glyph-h/-bank/-figure-h/-locale; the svg
 * [data-lcs-plant][data-lcs-stage="full"]; each tag <g data-lcs-tag data-lcs-part
 * data-lcs-n>; each card row data-lcs-row-n; each bank word data-lcs-bank=<id>.
 * verify(page) re-derives everything from the stamps + the rendered geometry and
 * cross-checks every bank literal against partWords[loc] in node.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const C5 = require('../../templates/components-b5.js');
const { ANCHORS, PARTS, VB_W, VB_H, FLOWER_ANCHORS } = require('../../primitives/plant-figure.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { PLANTS_NEUTRAL: NEUTRAL } = require('../../data/b5/plants.js');   // the locale-neutral facts of the SAME bank module

const ID = 'G1-376';
const KEY = 'plants';
const BANK = 'plants';
const STAGE_W = 380, STAGE_GAP = 16, CARD_W = 279, BODY_W = 675, STAGE_H = 600;
const G1_FLOOR = 44;
const TRIES = 40;
/* faces (Phase 2) */
const FACE_LAYOUTS = ['needs', 'cycle', 'eat', 'jobs', 'flower'];
const FACE_BODY = 667;     // MEASURED: the worst legal chrome (4-line fi title + 3-line instruction) leaves 667, not the ruled 677
const FACE_SPARSE = 40;    // nt10-E SPARSE ruling: max blank band between consecutive content blocks (body top counts as a block)
const wordRe = (w, loc) => new RegExp('(?<!\\p{L})' + String(w).normalize('NFC').toLocaleLowerCase(loc).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u');
/** Tag numbers 1..N off the y order (neither top-to-bottom nor bottom-to-top); the base's own composer is untouched. */
function offOrderNumbers(parts, slotY, rng) {
  const byY = parts.slice().sort((a, b) => slotY(a) - slotY(b));
  const up = byY.map((_, i) => i + 1).join(), down = byY.map((_, i) => byY.length - i).join();
  for (let t = 0; t < TRIES; t++) {
    const ns = rng.shuffle(parts.map((_, i) => i + 1));
    const cand = Object.fromEntries(parts.map((p, i) => [p, ns[i]]));
    const seq = byY.map((p) => cand[p]).join();
    if (seq !== up && seq !== down) return cand;
  }
  throw new Error(`${ID}: no tag numbering off the y order in ${TRIES} draws`);
}

function literal(obj, key, what, loc) {
  const v = obj && obj[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: ${loc} ${what}.${key} is missing (refuse)`);
  if (v !== v.trim()) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" is not trimmed`);
  if (/[{}]/.test(v)) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" carries a slot`);
  if (/\d/.test(v)) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" carries a digit`);
  return v;
}

const TYPE = {
  id: ID,
  slug: 'parts-of-a-plant',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  difficulty: {
    1: { parts: ['root', 'stem', 'leaf', 'flower'], bank: true, figureH: 592, figureMax: 680, rowH: 72, glyphH: 32, bankPx: 18, boxW: 205 },
    2: { parts: ['root', 'stem', 'leaf', 'flower', 'fruit', 'seed'], bank: true, figureH: 592, figureMax: 680, rowH: 64, glyphH: 30, bankPx: 18, boxW: 205 },
    3: { parts: ['root', 'stem', 'leaf', 'flower', 'fruit', 'seed'], bank: false, figureH: 592, figureMax: 712, rowH: 64, glyphH: 30, bankPx: 18, boxW: 205 },
  },
  i18n: {
    en: {
      title: 'Parts of a Plant',
      instruction: 'Follow each numbered tag to a part of the plant. Write the name of that part from the word bank on the line with the same number.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam). */
  _buildWith(bankLoc, d, { locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx && ctx.rng;
    if (!rng) throw new Error(`${ID}: no rng in ctx (a seeded page)`);
    if (d.layout) return this._buildFace(bankLoc, d, loc, rng);   // the five faces (additive; the base path below is untouched)
    // guards on the RESOLVED config
    if (!Array.isArray(d.parts) || d.parts.length < 2) throw new Error(`${ID}: parts must list >= 2 part ids`);
    for (const p of d.parts) if (!PARTS.includes(p)) throw new Error(`${ID}: unknown part "${p}"`);
    if (new Set(d.parts).size !== d.parts.length) throw new Error(`${ID}: a part repeats`);
    if (d.rowH < G1_FLOOR) throw new Error(`${ID}: rowH ${d.rowH} < the G1 floor ${G1_FLOOR}`);
    if (d.glyphH < 24 || d.rowH - 6 < d.glyphH + 12) throw new Error(`${ID}: row ${d.rowH} cannot hold a glyphH ${d.glyphH} writing row`);
    if (d.figureH > STAGE_H) throw new Error(`${ID}: figureH ${d.figureH} > the stage ${STAGE_H}`);
    // FILL (base review 2026-09-23): the plant grows from figureH to figureMax with the body; above the
    // width limit of the 380 px stage (380 x 600/320 = 712.5) the meet box would stop growing and float.
    if (!(d.figureMax >= d.figureH && d.figureMax <= STAGE_W * VB_H / VB_W)) throw new Error(`${ID}: figureMax ${d.figureMax} outside [${d.figureH}, ${STAGE_W * VB_H / VB_W}]`);
    const cardH = C5.plantLabelCardHeight({ rows: d.parts.length, rowH: d.rowH });
    if (cardH > STAGE_H) throw new Error(`${ID}: label card ${cardH} px > the stage ${STAGE_H}`);
    if (STAGE_W + STAGE_GAP + CARD_W !== BODY_W) throw new Error(`${ID}: stage row ${STAGE_W + STAGE_GAP + CARD_W} ≠ ${BODY_W}`);
    if (!(d.bankPx >= 16)) throw new Error(`${ID}: bankPx ${d.bankPx} < 16`);
    if (Array.isArray(bankLoc && bankLoc.refuse) && bankLoc.refuse.includes('base')) throw new Error(`${ID}: ${loc} refuses the base (bank.refuse)`);
    const PW = bankLoc && bankLoc.partWords;
    if (!PW) throw new Error(`${ID}: ${loc} bank has no partWords block (refuse)`);
    const words = {};
    for (const p of d.parts) words[p] = literal(PW, p, 'partWords', loc);
    const seen = new Set();
    for (const p of d.parts) { const k = words[p].normalize('NFC').toLocaleLowerCase(loc); if (seen.has(k)) throw new Error(`${ID}: two parts print the same word "${words[p]}" in ${loc}`); seen.add(k); }

    // composer: anchors, numbers (not y-sorted either way), bank order (≠ tag order, ≠ reverse)
    const anchorPick = {};
    for (const p of d.parts) anchorPick[p] = ANCHORS[p].length > 1 ? rng.int(0, ANCHORS[p].length - 1) : 0;
    const slotY = (p) => ANCHORS[p][anchorPick[p]].slot.y;
    const byY = d.parts.slice().sort((a, b) => slotY(a) - slotY(b));
    let numbers = null;
    for (let t = 0; t < TRIES; t++) {
      const ns = rng.shuffle(d.parts.map((_, i) => i + 1));
      const cand = Object.fromEntries(d.parts.map((p, i) => [p, ns[i]]));
      const seq = byY.map((p) => cand[p]).join();
      const up = byY.map((_, i) => i + 1).join(), down = byY.map((_, i) => byY.length - i).join();
      if (seq !== up && seq !== down) { numbers = cand; break; }
    }
    if (!numbers) throw new Error(`${ID}: no tag numbering off the y order in ${TRIES} draws`);
    if (d.forceNumbers) numbers = { ...d.forceNumbers };   // the GATE's poison seam (PR7: a y-sorted numbering) — never a shipped config
    const tagOrder = d.parts.slice().sort((a, b) => numbers[a] - numbers[b]);
    let bankOrder = null;
    if (d.bank) {
      const rev = tagOrder.slice().reverse().join();
      for (let t = 0; t < TRIES; t++) {
        const o = rng.shuffle(d.parts);
        if (o.join() !== tagOrder.join() && o.join() !== rev) { bankOrder = o; break; }
      }
      if (!bankOrder) throw new Error(`${ID}: no bank order off the tag order in ${TRIES} draws`);
    }

    // FILL: drawn at its MINIMUM figureH (every px mark at design size), grown by the grid row minmax(figureH, figureMax)
    // (CSS, meet, top-anchored) — the row takes the body's slack up to figureMax, so a short chrome never floats the plant.
    const stage = C5.plantFillStage({ parts: d.parts, anchorPick, numbers, h: d.figureH });
    const card = C5.plantLabelCard({ rows: tagOrder.map((p) => numbers[p]), rowH: d.rowH, glyphH: d.glyphH, boxW: d.boxW, cardW: CARD_W });
    const bankHtml = d.bank ? C5.plantBank({ words: bankOrder.map((id) => ({ id, word: words[id] })), wordPx: d.bankPx }) : '';
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const bodyHtml = `<div data-ws-content data-lcs-type="${KEY}" data-lcs-locale="${loc}" data-lcs-parts="${d.parts.join(',')}" ` +
      `data-lcs-numbers='${js(numbers)}' data-lcs-picks='${js(anchorPick)}' data-lcs-anchors-u='${js(stage.anchorsU)}' data-lcs-vb='${js(stage.vb)}' ` +
      `data-lcs-rows="${d.parts.length}" data-lcs-row-h="${d.rowH}" data-lcs-glyph-h="${d.glyphH}" data-lcs-bank-on="${d.bank ? 1 : 0}" data-lcs-figure-h="${d.figureH}" data-lcs-figure-max="${d.figureMax}" ` +
      `style="flex:1;min-height:0;display:grid;grid-template-rows:${d.bank ? 'auto ' : ''}minmax(${d.figureH}px,${d.figureMax}px);align-content:start">` +
      bankHtml +
      `<div data-lcs-stage-row style="display:grid;grid-template-columns:${STAGE_W}px ${STAGE_GAP}px ${CARD_W}px;align-items:center;min-height:0;height:100%">` +
      stage.html + `<div></div>` + `<div style="display:flex;justify-content:center">${card}</div>` +
      `</div></div>`;
    return { bodyHtml, meta: { parts: d.parts, numbers, anchorPick, bank: bankOrder } };
  },

  /* ================================================================ FACES (Phase 2, 2026-09-23)
   * ONE additive knob `layout` (design §3): undefined = the base above, byte-identical;
   * 'needs' (K) · 'cycle' (G1) · 'eat' (G2) · 'jobs' (G2) · 'flower' (G3). A face stamps
   * data-lcs-layout (never the base). Every guard keys on the RESOLVED config. The draws are
   * locale-neutral (the rng never sees a word), so a position tell would ship to all 11 at once:
   * each composer rejects its tell BY CONSTRUCTION and verify() re-measures it on the page.
   * `force*` keys are the GATE's poison seams — never a shipped config. */
  _buildFace(bankLoc, d, loc, rng) {
    const L = d.layout;
    if (!FACE_LAYOUTS.includes(L)) throw new Error(`${ID}: unknown layout "${L}"`);
    if (Array.isArray(bankLoc && bankLoc.refuse) && bankLoc.refuse.includes(L)) throw new Error(`${ID}: ${loc} refuses the ${L} face (bank.refuse)`);
    const N = NEUTRAL;
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const rootOpen = (extra, style) => `<div data-ws-content data-lcs-type="${KEY}" data-lcs-layout="${L}" data-lcs-locale="${loc}" ${extra} style="flex:1;min-height:0;display:grid;align-content:start;justify-content:center;${style}">`;
    const draw = (tries, make, okFn, what) => { for (let t = 0; t < tries; t++) { const c = make(); if (okFn(c)) return c; } throw new Error(`${ID}: no ${what} in ${tries} draws`); };

    if (L === 'needs') {
      if (!(d.rows >= 2 && d.rows <= 5)) throw new Error(`${ID}: needs rows ${d.rows} outside 2..5 (the 667 stack)`);
      if (!(d.gift >= 56) || !(d.potH >= 96)) throw new Error(`${ID}: needs gift ${d.gift} / pot ${d.potH} under the K floors 56 / 96`);
      const mix = d.mix || {};
      const kinds = Object.entries(mix).flatMap(([k, n]) => Array(n).fill(k));
      if (kinds.length !== d.rows) throw new Error(`${ID}: needs mix sums to ${kinds.length} ≠ rows ${d.rows}`);
      for (const k of kinds) if (!['noWater', 'noLight', 'neither'].includes(k)) throw new Error(`${ID}: needs mix kind "${k}"`);
      if (d.rows * d.rowH + (d.rows - 1) * d.rowGap > FACE_BODY) throw new Error(`${ID}: needs stack ${d.rows * d.rowH + (d.rows - 1) * d.rowGap} > ${FACE_BODY}`);
      const order = rng.shuffle(kinds);
      const sideOk = (s) => { const nl = s.filter((x) => x === 'L').length; if (Math.abs(nl - (s.length - nl)) > 1) return false; if (new Set(s).size < 2) return false; if (s.every((x, i) => i === 0 || x !== s[i - 1])) return false; return true; };
      let sides = draw(TRIES, () => order.map(() => (rng.int(0, 1) ? 'L' : 'R')), sideOk, 'winner-side sequence');
      if (d.forceSides) sides = d.forceSides.slice();
      const nn = rng.shuffle(N.NON_NEEDS.slice());
      let q = 0;
      const pic = (p) => ({ key: p.noun, src: fileUri(p.theme, p.noun) });
      const sun = pic(N.NEED_PICS.sun), drop = pic(N.NEED_PICS.raindrop);
      const rows = order.map((kind, i) => {
        const win = rng.shuffle([sun, drop]);
        const lose = kind === 'noWater' ? [sun, pic(nn[q++])] : kind === 'noLight' ? [drop, pic(nn[q++])] : [pic(nn[q++]), pic(nn[q++])];
        const loseO = rng.shuffle(lose);
        const W = C5.plantNeedUnit({ gifts: win, grows: true, potH: d.potH, gift: d.gift, h: d.rowH });
        const Lo = C5.plantNeedUnit({ gifts: loseO, grows: false, potH: d.potH, gift: d.gift, h: d.rowH });
        const pair = sides[i] === 'L' ? W + Lo : Lo + W;
        return `<div data-lcs-need-row="${i + 1}" data-lcs-kind="${kind}" data-lcs-block style="display:flex;justify-content:center;gap:39px;height:${d.rowH}px">${pair}</div>`;
      });
      if (d.forceGrows) rows[0] = rows[0].replace('data-lcs-grows="0"', 'data-lcs-grows="1"');
      const bodyHtml = rootOpen(`data-lcs-mix='${js(mix)}' data-lcs-needs="${N.NEEDS.join(',')}" data-lcs-sides="${sides.join('')}"`,
        `grid-template-rows:repeat(${d.rows},${d.rowH}px);row-gap:${d.rowGap}px`) + rows.join('') + `</div>`;
      return { bodyHtml, meta: { layout: L, kinds: order, sides } };
    }

    if (L === 'cycle') {
      const st = d.stages;
      if (!Array.isArray(st) || st.length < 3) throw new Error(`${ID}: cycle stages`);
      for (const s of st) if (!N.STAGES.includes(s)) throw new Error(`${ID}: cycle stage "${s}"`);
      if (new Set(st).size !== st.length) throw new Error(`${ID}: a cycle stage repeats`);
      if (d.given !== st[0] || st[0] !== 'seed') throw new Error(`${ID}: the given slot must be the SEED (stages[0]); a cycle has no first element otherwise`);
      if (st[st.length - 1] !== 'fruiting') throw new Error(`${ID}: the last stage must be the fruiting plant (its seeds close the ring)`);
      const rest = st.slice(1);
      const rev = rest.slice().reverse().join();
      let strip = draw(TRIES, () => rng.shuffle(rest), (o) => o.every((x, i) => x !== rest[i]) && o.join() !== rev, 'strip derangement');
      if (d.forceStrip) strip = d.forceStrip.slice();
      const ring = C5.plantCycleRing({ stages: st, slot: d.slot, R: d.R });
      const cut = C5.plantCycleStrip({ stages: strip, card: d.slot });
      if (ring.height + d.stripGap + cut.height > FACE_BODY) throw new Error(`${ID}: cycle stack ${ring.height + d.stripGap + cut.height} > ${FACE_BODY}`);
      let ringHtml = ring.html;
      if (d.dropReturn) ringHtml = ringHtml.replace(/<g data-lcs-arrow="return"[\s\S]*?<\/g>/, '');
      const bodyHtml = rootOpen(`data-lcs-stages="${st.join(',')}" data-lcs-strip="${strip.join(',')}"`, `grid-template-rows:${ring.height}px ${cut.height}px;row-gap:${d.stripGap}px`) +
        ringHtml + cut.html + `</div>`;
      return { bodyHtml, meta: { layout: L, strip } };
    }

    if (L === 'eat') {
      const PW = bankLoc && bankLoc.partWords;
      if (!PW) throw new Error(`${ID}: ${loc} bank has no partWords block (refuse)`);
      const words = {};
      for (const p of N.PARTS) words[p] = literal(PW, p, 'partWords', loc);
      const refused = new Set(bankLoc.refuseItems || []);
      const pool = N.EAT.filter((x) => !refused.has(x.noun));
      const mix = pool.some((x) => x.part === 'stem') ? d.mix : d.mixNoStem;
      const cards = Object.values(mix).reduce((a, b) => a + b, 0);
      if (cards !== d.cols * d.rows) throw new Error(`${ID}: eat mix ${cards} ≠ ${d.cols} x ${d.rows}`);
      if (d.rows * d.cardH + (d.rows - 1) * d.rowGap > FACE_BODY) throw new Error(`${ID}: eat stack > ${FACE_BODY}`);
      if (!(d.pic >= 36 && d.chipH >= 36 && d.chipPx >= 17)) throw new Error(`${ID}: eat under the G2 floors`);
      const picked = [];
      for (const [part, n] of Object.entries(mix)) {
        const cand = rng.shuffle(pool.filter((x) => x.part === part));
        if (cand.length < n) throw new Error(`${ID}: ${loc} eat pool has ${cand.length} ${part} < ${n} (refuse)`);
        picked.push(...cand.slice(0, n));
      }
      const items = rng.shuffle(picked);
      const C = d.chips;
      const base = Array.from({ length: cards }, (_, i) => i % C);
      const stair = (s) => [1, -1].some((dir) => s.every((x, i) => x === ((s[0] + dir * i) % C + C) % C));
      const slotsOk = (s) => { const cnt = Array(C).fill(0); s.forEach((x) => cnt[x]++); return new Set(s).size > 1 && !stair(s) && cnt.every((c) => c >= Math.floor(cards / C) && c <= Math.ceil(cards / C)); };
      let slots = draw(TRIES, () => rng.shuffle(base), slotsOk, 'answer-slot sequence');
      if (d.forceSlots) slots = d.forceSlots.slice();
      const html = items.map((it, i) => {
        const dis = rng.shuffle(it.allow.slice()).slice(0, C - 1);
        const chips = [];
        let q = 0;
        for (let s = 0; s < C; s++) chips.push(s === slots[i] ? it.part : dis[q++]);
        let card = C5.plantEatCard({ src: fileUri(it.theme, it.noun), food: it.theme + '/' + it.noun, answer: it.part, chips: chips.map((p) => ({ part: p, word: words[p] })), pic: d.pic, chipW: d.chipW, chipH: d.chipH, chipPx: d.chipPx, w: d.cardW, h: d.cardH });
        if (d.forceCaption && i === 0) card = card.replace('<div data-lcs-chips', `<span data-lcs-caption style="font-size:17px">${it.noun}</span><div data-lcs-chips`);
        return card;
      });
      const bodyHtml = rootOpen(`data-lcs-mix='${js(mix)}' data-lcs-slots="${slots.join('')}"`,
        `grid-template-columns:repeat(${d.cols},${d.cardW}px);column-gap:${d.colGap}px;grid-template-rows:repeat(${d.rows},${d.cardH}px);row-gap:${d.rowGap}px`) + html.join('') + `</div>`;
      return { bodyHtml, meta: { layout: L, items: items.map((x) => x.noun), slots } };
    }

    if (L === 'jobs') {
      const JB = bankLoc && bankLoc.jobs;
      if (!JB) throw new Error(`${ID}: ${loc} bank has no jobs block (refuse)`);
      for (const p of d.parts) if (!N.JOB_PARTS.includes(p)) throw new Error(`${ID}: no job part "${p}"`);
      const texts = {};
      for (const p of d.parts) texts[p] = literal(JB, p, 'jobs', loc);
      const leak = [...Object.values(bankLoc.partWords || {}), ...(bankLoc.partStems || [])];
      for (const p of d.parts) for (const w of leak) if (wordRe(w, loc).test(texts[p].normalize('NFC').toLocaleLowerCase(loc))) throw new Error(`${ID}: ${loc} jobs.${p} "${texts[p]}" names the part word "${w}" (refuse)`);
      if (d.figureH > FACE_BODY) throw new Error(`${ID}: jobs figureH ${d.figureH} > ${FACE_BODY}`);
      if (C5.plantJobCardHeight({ rows: d.parts.length, rowH: d.rowH, rowGap: d.rowGap }) > d.figureH) throw new Error(`${ID}: the job card's minimum is taller than the plant's minimum`);
      if (d.jobStageW + STAGE_GAP + d.jobCardW !== BODY_W) throw new Error(`${ID}: jobs row ≠ ${BODY_W}`);
      if (!(d.jobPx >= 17)) throw new Error(`${ID}: job text ${d.jobPx} < 17`);
      const anchorPick = {};
      for (const p of d.parts) anchorPick[p] = ANCHORS[p].length > 1 ? rng.int(0, ANCHORS[p].length - 1) : 0;
      const numbers = offOrderNumbers(d.parts, (p) => ANCHORS[p][anchorPick[p]].slot.y, rng);
      const tagOrder = d.parts.slice().sort((a, b) => numbers[a] - numbers[b]);
      const rev = tagOrder.slice().reverse().join();
      const jobOrder = draw(TRIES, () => rng.shuffle(d.parts), (o) => o.join() !== tagOrder.join() && o.join() !== rev, 'job order');
      // FILL (coordinator review): the plant is drawn at its MINIMUM figureH and grows with the body
      // (CSS, meet, top-anchored); the job card stretches to the full row, its rows share the height.
      const stage = C5.plantFillStage({ parts: d.parts, anchorPick, numbers, h: d.figureH });
      let card = C5.plantJobCard({ jobs: jobOrder.map((p) => ({ part: p, text: texts[p] })), box: d.box, textPx: d.jobPx, lineH: d.jobLineH, rowH: d.rowH, rowGap: d.rowGap, w: d.jobCardW, fill: true });
      if (d.forceLeak) card = card.replace(/(<span data-lcs-job-text[^>]*>)/, `$1${d.forceLeak} `);
      if (d.forceAnswerBox) card = card.replace('data-lcs-answer=""', 'data-lcs-answer="undefined"');
      const bodyHtml = rootOpen(`data-lcs-parts="${d.parts.join(',')}" data-lcs-numbers='${js(numbers)}' data-lcs-picks='${js(anchorPick)}' data-lcs-anchors-u='${js(stage.anchorsU)}' data-lcs-vb='${js(stage.vb)}' data-lcs-figure-h="${d.figureH}" data-lcs-jobs="${jobOrder.join(',')}"`,
        `grid-template-rows:minmax(${d.figureH}px,1fr);justify-content:stretch`) +
        `<div data-lcs-stage-row style="display:grid;grid-template-columns:${d.jobStageW}px ${STAGE_GAP}px ${d.jobCardW}px;align-items:stretch;min-height:0;height:100%">` +
        stage.html + `<div></div>` + card + `</div></div>`;
      return { bodyHtml, meta: { layout: L, numbers, anchorPick, jobs: jobOrder } };
    }

    // L === 'flower'
    const FW = bankLoc && bankLoc.flowerWords, PW = bankLoc && bankLoc.partWords;
    if (!FW || !PW) throw new Error(`${ID}: ${loc} bank has no flowerWords / partWords (refuse)`);
    for (const p of d.labels) if (!N.FLOWER_PARTS.includes(p) || !FLOWER_ANCHORS[p]) throw new Error(`${ID}: flower label "${p}"`);
    if (d.decoy !== 'root') throw new Error(`${ID}: the flower decoy must be the root (the section draws none)`);
    if (!(d.glyphH >= 24)) throw new Error(`${ID}: flower glyphH ${d.glyphH} < the G3 24`);
    const words = {};
    for (const p of d.labels) words[p] = literal(FW, p, 'flowerWords', loc);
    const decoyWord = literal(PW, 'root', 'partWords', loc);
    const lw = (s) => s.normalize('NFC').toLocaleLowerCase(loc);
    for (const p of d.labels) if (lw(words[p]).includes(lw(decoyWord))) throw new Error(`${ID}: ${loc} the decoy "${decoyWord}" is inside flowerWords.${p} "${words[p]}" (refuse)`);
    const seenW = new Set();
    for (const w of [...Object.values(words), decoyWord]) { if (seenW.has(lw(w))) throw new Error(`${ID}: ${loc} two bank words print "${w}"`); seenW.add(lw(w)); }
    const numbers = offOrderNumbers(d.labels, (p) => FLOWER_ANCHORS[p].slot.y, rng);
    const tagOrder = d.labels.slice().sort((a, b) => numbers[a] - numbers[b]);
    const all = [...d.labels, 'decoy'];
    const rev = tagOrder.slice().reverse().join();
    let bankOrder = draw(TRIES, () => rng.shuffle(all), (o) => { const w = o.filter((x) => x !== 'decoy'); return o[0] !== 'decoy' && o[o.length - 1] !== 'decoy' && w.join() !== tagOrder.join() && w.join() !== rev; }, 'flower bank order');
    if (d.forceBank) bankOrder = d.forceBank.slice();
    // FILL (coordinator review): the cut-away is the HERO, drawn at its minimum figureH and grown with the
    // body (CSS, meet, top-anchored) in a row that takes all the height left; the whole-plant thumbnail
    // stands beside it; the label card is a two-column card pinned to the bottom of the body.
    const stage = C5.plantFlowerFillStage({ labels: d.labels, numbers, h: d.figureH, vbTop: d.vbTop });
    const inset = C5.plantFlowerInset({ h: d.insetH, beside: true });
    const card = C5.plantLabelGrid({ rows: tagOrder.map((p) => numbers[p]), rowH: d.rowH, glyphH: d.glyphH, boxW: d.boxW, cols: 2 });
    const cardH = C5.plantLabelGridHeight({ rows: d.labels.length, rowH: d.rowH, cols: 2 });
    if (69 + d.figureH + d.rowGap + cardH > FACE_BODY) throw new Error(`${ID}: flower stack ${69 + d.figureH + d.rowGap + cardH} > ${FACE_BODY}`);
    const bank = C5.plantBank({ words: bankOrder.map((id) => ({ id: id === 'decoy' ? 'root' : id, word: id === 'decoy' ? decoyWord : words[id] })), wordPx: d.bankPx })
      .replace(/(data-lcs-bank="root")/, '$1 data-lcs-decoy="1"').replace('data-lcs-bank-banner>', 'data-lcs-bank-banner data-lcs-block>');
    const bodyHtml = rootOpen(`data-lcs-labels="${d.labels.join(',')}" data-lcs-numbers='${js(numbers)}' data-lcs-anchors-u='${js(stage.anchorsU)}' data-lcs-vb='${js(stage.vb)}' data-lcs-figure-h="${d.figureH}" data-lcs-glyph-h="${d.glyphH}" data-lcs-row-h="${d.rowH}"`,
      `grid-template-rows:auto minmax(${d.figureH}px,1fr) auto;justify-content:stretch`) +
      bank +
      `<div data-lcs-stage-row style="display:grid;grid-template-columns:minmax(0,1fr) ${d.insetColW}px;column-gap:${STAGE_GAP}px;align-items:stretch;min-height:0;height:100%">` +
      stage.html + `<div style="display:flex;align-items:center;justify-content:center">${inset.html}</div></div>` +
      `<div style="display:flex;justify-content:center;margin-top:${d.rowGap}px">${card}</div>` +
      `</div>`;
    return { bodyHtml, meta: { layout: L, numbers, bank: bankOrder } };
  },

  /** verify() for the five faces: re-derives every answer from the stamps + the rendered page. */
  async _verifyFace(page, layout) {
    const fails = await page.evaluate((L, SOIL, FLOWER_SLOT_Y, SPARSE) => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="plants"]');
      const rect = (el) => el.getBoundingClientRect();
      const all = (s, r) => [...(r || root).querySelectorAll(s)];
      const J = (k) => { try { return JSON.parse(root.getAttribute(k) || 'null'); } catch (e) { fails.push(`${k} is not JSON`); return null; } };
      const seq = (n) => Array.from({ length: n }, (_, i) => i + 1).join();
      const foot = document.querySelector('.ws-foot');
      // shared: nothing past the footer, no horizontal overflow, every img loaded, SPARSE
      const low = Math.max(0, ...all('*').map((e) => rect(e).bottom));
      if (foot && low > rect(foot).top + 0.6) fails.push(`content reaches the footer (${low.toFixed(0)} > ${rect(foot).top.toFixed(0)})`);
      if (root.scrollWidth > root.clientWidth + 0.6) fails.push('the body overflows horizontally');
      all('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`a picture did not load (${im.src.slice(-40)})`); });
      {
        const name = (e) => [...e.attributes].map((a) => a.name).find((n) => n.startsWith('data-lcs-') && n !== 'data-lcs-block') || e.className || e.tagName;
        const iv = all('[data-lcs-block]').map((e) => { const r = rect(e); return [r.top, r.bottom, name(e)]; }).sort((a, b) => a[0] - b[0]);
        if (!iv.length) fails.push('no [data-lcs-block] on the page (SPARSE cannot be measured)');
        let edge = rect(root).top, gap = 0, at = 'the body top', prev = 'the body top';
        for (const [t, b, n] of iv) { if (t - edge > gap) { gap = t - edge; at = `${prev} -> ${n}`; } if (b > edge) { edge = b; prev = n; } }
        if (gap > SPARSE) fails.push(`SPARSE — ${gap.toFixed(0)} px blank band between content blocks (${at}; > ${SPARSE})`);
      }
      const noText = (el, what) => { const c = el.cloneNode(true); c.querySelectorAll('title').forEach((t) => t.remove()); if (c.textContent.trim()) fails.push(`${what} prints "${c.textContent.trim().slice(0, 40)}"`); };
      const tagsCheck = (svg, parts, numbers, anchors, slotY) => {
        const tags = all('g[data-lcs-tag]', svg);
        if (tags.map((g) => g.dataset.lcsPart).sort().join() !== parts.slice().sort().join()) fails.push(`tag parts [${tags.map((g) => g.dataset.lcsPart)}] ≠ [${parts}]`);
        if (tags.map((g) => +g.dataset.lcsN).sort((a, b) => a - b).join() !== seq(parts.length)) fails.push('tag numbers ≠ 1..N');
        // anchors are stamped in VIEWBOX units (the figure grows with the body): map them through the
        // rendered svg box with preserveAspectRatio xMidYMin meet
        const vb = J('data-lcs-vb'), sr0 = rect(svg);
        const sc = Math.min(sr0.width / vb.w, sr0.height / vb.h), ox = (sr0.width - vb.w * sc) / 2;
        const at = (a) => ({ x: sr0.left + ox + (a.x - vb.x) * sc, y: sr0.top + (a.y - vb.y) * sc });
        const T = {};
        tags.forEach((g) => { const p = g.dataset.lcsPart; const tx = g.querySelector('text'); if (!tx || tx.textContent.trim() !== String(numbers[p])) fails.push(`tag ${p} prints ${tx && tx.textContent} ≠ ${numbers[p]}`); const disc = g.querySelectorAll('circle')[1]; const r = rect(disc); T[p] = { y: (r.top + r.bottom) / 2, w: r.width }; if (r.width < 28) fails.push(`tag ${p} disc ${r.width.toFixed(1)} < 28`); });
        const byY = Object.keys(T).sort((a, b) => T[a].y - T[b].y).map((p) => numbers[p]);
        const N = byY.length;
        if (byY.join() === seq(N)) fails.push('the tag numbers run top-to-bottom (numbering tell)');
        if (byY.slice().reverse().join() === seq(N)) fails.push('the tag numbers run bottom-to-top (numbering tell)');
        for (const p of parts) {
          const ring = svg.querySelector(`circle[data-lcs-ring="${p}"]`), a = anchors && anchors[p];
          if (!ring || !a) { fails.push(`${p}: no ring / anchor`); continue; }
          const rr = rect(ring);
          const A = at(a), off = Math.hypot((rr.left + rr.right) / 2 - A.x, (rr.top + rr.bottom) / 2 - A.y);
          if (off > 1.5) fails.push(`${p}: ring off its anchor (${off.toFixed(1)} px)`);
        }
        return T;
      };

      if (L === 'needs') {
        const needs = (root.dataset.lcsNeeds || '').split(',');
        const mix = J('data-lcs-mix') || {};
        const rows = all('[data-lcs-need-row]');
        const want = Object.values(mix).reduce((a, b) => a + b, 0);
        if (rows.length !== want) fails.push(`${rows.length} rows ≠ the mix ${want}`);
        const got = {}, sides = [];
        let plantSvg = null;
        rows.forEach((r, i) => {
          const units = all('[data-lcs-need-unit]', r);
          if (units.length !== 2) fails.push(`row ${i + 1}: ${units.length} pots ≠ 2`);
          const winners = units.filter((u) => u.dataset.lcsGrows === '1');
          if (winners.length !== 1) fails.push(`row ${i + 1}: ${winners.length} growing pots — one winner per row`);
          units.forEach((u) => {
            const gifts = (u.dataset.lcsGifts || '').split(',');
            const shown = all('[data-lcs-gift]', u).map((g) => g.dataset.lcsGift);
            if (shown.join() !== gifts.join() || shown.length !== 2) fails.push(`row ${i + 1}: the drawn gifts [${shown}] ≠ the stamp [${gifts}]`);
            if (new Set(gifts).size !== 2) fails.push(`row ${i + 1}: a pot gets the same thing twice`);
            const grows = needs.every((n) => gifts.includes(n));
            if (grows !== (u.dataset.lcsGrows === '1')) fails.push(`row ${i + 1}: grows ${u.dataset.lcsGrows} ≠ (gifts ⊇ needs) ${grows}`);
            if (!grows) { const miss = needs.filter((n) => !gifts.includes(n)); const k = miss.length === 2 ? 'neither' : miss[0] === 'raindrop' ? 'noWater' : 'noLight'; got[k] = (got[k] || 0) + 1; }
            const svg = u.querySelector('[data-lcs-pot] svg');
            if (!svg) fails.push(`row ${i + 1}: no pot`); else {
              if (plantSvg == null) plantSvg = svg.outerHTML; else if (svg.outerHTML !== plantSvg) fails.push(`row ${i + 1}: a seedling differs from the others (a health cue)`);
              if (rect(svg).height < 96 - 0.6) fails.push(`row ${i + 1}: pot ${rect(svg).height.toFixed(0)} px < 96`);
            }
            all('img', u).forEach((im) => { const r = rect(im); if (r.width < 56 - 0.6 || r.height < 56 - 0.6) fails.push(`row ${i + 1}: a gift ${r.width.toFixed(0)} px < 56`); if (/grayscale|opacity/.test(im.getAttribute('style') || '')) fails.push('a greyed picture'); });
          });
          const wIdx = units.findIndex((u) => u.dataset.lcsGrows === '1');
          sides.push(wIdx === 0 ? 'L' : 'R');
        });
        for (const k of new Set([...Object.keys(mix), ...Object.keys(got)])) if ((mix[k] || 0) !== (got[k] || 0)) fails.push(`missing-need mix ${k}: ${got[k] || 0} ≠ ${mix[k] || 0}`);
        const nl = sides.filter((s) => s === 'L').length;
        if (Math.abs(nl - (sides.length - nl)) > 1) fails.push(`winner side ${sides.join('')}: left/right counts differ by > 1 (side tell)`);
        if (new Set(sides).size < 2) fails.push(`winner side ${sides.join('')} is constant (side tell)`);
        if (sides.length > 1 && sides.every((s, i) => i === 0 || s !== sides[i - 1])) fails.push(`winner side ${sides.join('')} is alternating (alternating tell)`);
        noText(root, 'the needs body');
        if (all('svg [data-lcs-cross], svg line[data-lcs-x]').length) fails.push('a crossed picture');
        return fails;
      }

      if (L === 'cycle') {
        const stages = (root.dataset.lcsStages || '').split(',');
        const slots = all('[data-lcs-slot]');
        if (slots.length !== stages.length) fails.push(`${slots.length} slots ≠ ${stages.length} stages`);
        slots.forEach((s) => {
          const k = +s.dataset.lcsSlot;
          if (s.dataset.lcsExpect !== stages[k - 1]) fails.push(`slot ${k} expects ${s.dataset.lcsExpect} ≠ ${stages[k - 1]}`);
          const fig = s.querySelector('svg');
          if (k === 1) { if (!fig || fig.getAttribute('data-lcs-figure') !== 'plant-' + stages[0]) fails.push('slot 1 does not hold the given seed'); }
          else if (fig || s.querySelector('img') || s.textContent.trim()) fails.push(`slot ${k} is not empty`);
        });
        const cards = all('[data-lcs-cut-card]');
        const strip = cards.map((c) => c.dataset.lcsStage);
        const rest = stages.slice(1);
        if (strip.slice().sort().join() !== rest.slice().sort().join()) fails.push(`strip [${strip}] ≠ the stages after the seed`);
        if (strip.some((x, i) => x === rest[i])) fails.push(`strip [${strip}] is not a derangement of the slot order`);
        if (strip.join() === rest.slice().reverse().join()) fails.push('strip is the reversed slot order');
        const s2 = slots.find((s) => +s.dataset.lcsSlot === 2);
        cards.forEach((c) => {
          const r = rect(c), q = s2 && rect(s2);
          if (q && (Math.abs(r.width - q.width) > 0.6 || Math.abs(r.height - q.height) > 0.6)) fails.push(`card ${c.dataset.lcsStage} ${r.width.toFixed(1)}x${r.height.toFixed(1)} ≠ slot ${q.width.toFixed(1)}x${q.height.toFixed(1)}`);
          const fig = c.querySelector('svg[data-lcs-figure]');
          if (!fig || fig.getAttribute('data-lcs-figure') !== 'plant-' + c.dataset.lcsStage) fails.push(`card ${c.dataset.lcsStage} is not its plantStage`);
          if (c.dataset.lcsStage === 'fruiting' && fig && fig.querySelectorAll('[data-lcs-seed]').length < 3) fails.push('the fruiting card shows < 3 seeds');
        });
        const arrows = all('[data-lcs-arrow]');
        if (arrows.length !== stages.length) fails.push(`${arrows.length} arrows ≠ ${stages.length}`);
        const ret = root.querySelector('[data-lcs-arrow="return"]');
        const s1 = slots.find((s) => +s.dataset.lcsSlot === 1);
        if (!ret) fails.push('cycle not closed: no return arrow into the seed');
        else if (s1) {
          const hd = ret.querySelector('polygon'), tip = hd.getAttribute('points').split(' ')[0].split(',').map(Number);
          const box = ret.ownerSVGElement.getBoundingClientRect(), r1 = rect(s1);
          const tx = box.left + tip[0], ty = box.top + tip[1];
          const dx = Math.max(r1.left - tx, 0, tx - r1.right), dy = Math.max(r1.top - ty, 0, ty - r1.bottom);
          if (Math.hypot(dx, dy) > 12) fails.push(`cycle not closed: the return arrow ends ${Math.hypot(dx, dy).toFixed(0)} px from the seed slot`);
          if (ret.dataset.lcsFrom !== String(stages.length) || ret.dataset.lcsTo !== '1') fails.push('the return arrow does not run from the last slot to the seed');
        }
        for (let a = 0; a < slots.length; a++) for (let b = a + 1; b < slots.length; b++) { const p = rect(slots[a]), q = rect(slots[b]); if (Math.min(p.right, q.right) - Math.max(p.left, q.left) > 0 && Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top) > 0) fails.push(`slots ${a + 1} and ${b + 1} overlap`); }
        if (all('img').length) fails.push('a library picture on the cycle face');
        noText(root, 'the cycle body');
        return fails;
      }

      if (L === 'eat') {
        const mix = J('data-lcs-mix') || {};
        const cards = all('[data-lcs-eat-card]');
        const want = Object.values(mix).reduce((a, b) => a + b, 0);
        if (cards.length !== want) fails.push(`${cards.length} food cards ≠ ${want}`);
        const got = {}, slots = [], foods = new Set();
        cards.forEach((c, i) => {
          const part = c.dataset.lcsPart; got[part] = (got[part] || 0) + 1; foods.add(c.dataset.lcsFood);
          const chips = all('[data-lcs-chip]', c).map((x) => x.dataset.lcsChip);
          if (chips.length !== 3) fails.push(`card ${i + 1}: ${chips.length} chips ≠ 3`);
          if (new Set(chips).size !== chips.length) fails.push(`card ${i + 1}: a chip repeats`);
          if (chips.filter((x) => x === part).length !== 1) fails.push(`card ${i + 1}: the answer ${part} is not exactly one chip`);
          slots.push(chips.indexOf(part));
          all('[data-lcs-chip]', c).forEach((x) => {
            const ic = x.querySelector('svg[data-lcs-part-icon]');
            if (!ic || ic.getAttribute('data-lcs-part-icon') !== x.dataset.lcsChip) fails.push(`card ${i + 1}: the ${x.dataset.lcsChip} chip carries the wrong icon`);
            const r = rect(x), t = x.querySelector('[data-lcs-chip-text]');
            if (r.height < 36 - 0.6) fails.push(`card ${i + 1}: chip ${r.height.toFixed(0)} px < 36`);
            if (t && (t.scrollWidth > t.clientWidth + 0.6 || rect(t).right > r.right - 2)) fails.push(`card ${i + 1}: chip word "${t.textContent}" is clipped`);
            if (t && parseFloat(getComputedStyle(t).fontSize) < 17) fails.push(`card ${i + 1}: chip word under 17 px`);
          });
          const im = c.querySelector('img');
          if (!im || rect(im).width < 90 - 0.6) fails.push(`card ${i + 1}: picture under 90 px`);
          const cl = c.cloneNode(true); cl.querySelectorAll('[data-lcs-chip]').forEach((x) => x.remove()); cl.querySelectorAll('title').forEach((x) => x.remove());
          if (cl.textContent.trim()) fails.push(`card ${i + 1}: a food name in body ("${cl.textContent.trim()}")`);
          if (rect(c).bottom > rect(root).bottom + 0.6 && foot) void 0;
        });
        if (foods.size !== cards.length) fails.push('a food picture repeats');
        for (const k of new Set([...Object.keys(mix), ...Object.keys(got)])) if ((mix[k] || 0) !== (got[k] || 0)) fails.push(`card-part mix ${k}: ${got[k] || 0} ≠ ${mix[k] || 0}`);
        const C = 3, cnt = [0, 0, 0]; slots.forEach((s) => cnt[s]++);
        if (cnt.some((c) => c < Math.floor(slots.length / C) || c > Math.ceil(slots.length / C))) fails.push(`answer slots ${slots.join('')}: uneven [${cnt}] (slot tell)`);
        if (new Set(slots).size < 2) fails.push(`answer slots ${slots.join('')} constant (slot tell)`);
        if ([1, -1].some((dir) => slots.every((x, i) => x === ((slots[0] + dir * i) % C + C) % C))) fails.push(`answer slots ${slots.join('')}: a staircase (slot tell)`);
        return fails;
      }

      if (L === 'jobs') {
        const parts = (root.dataset.lcsParts || '').split(',');
        const numbers = J('data-lcs-numbers') || {}, anchors = J('data-lcs-anchors-u') || {};
        const svg = root.querySelector('svg[data-lcs-plant][data-lcs-stage="full"]');
        if (!svg) { fails.push('no tagged plant'); return fails; }
        { const r = rect(svg), vb = J('data-lcs-vb'), dh = vb.h * Math.min(r.width / vb.w, r.height / vb.h); if (dh < +root.dataset.lcsFigureH - 1) fails.push(`the plant is drawn ${dh.toFixed(0)} px < its minimum ${root.dataset.lcsFigureH}`); }
        const T = tagsCheck(svg, parts, numbers, anchors);
        void T;
        const rows = all('[data-lcs-job]');
        const jobs = rows.map((r) => r.dataset.lcsJob);
        if (jobs.slice().sort().join() !== parts.slice().sort().join()) fails.push(`job rows [${jobs}] ≠ tag parts [${parts}] (no bijection)`);
        const tagOrder = parts.slice().sort((a, b) => numbers[a] - numbers[b]);
        if (jobs.join() === tagOrder.join()) fails.push('the job order equals the tag order (position leak)');
        if (jobs.join() === tagOrder.slice().reverse().join()) fails.push('the job order is the reversed tag order (position leak)');
        rows.forEach((r) => {
          const box = r.querySelector('.ws-blankbox'), t = r.querySelector('[data-lcs-job-text]');
          if (!box || box.getAttribute('data-lcs-answer') !== '' || box.textContent.trim()) fails.push(`job ${r.dataset.lcsJob}: the box is not an empty blankNumeralBox (data-lcs-answer="${box && box.getAttribute('data-lcs-answer')}")`);
          else { const b = rect(box); if (b.width < 52 - 0.6 || b.height < 48 - 0.6) fails.push(`job ${r.dataset.lcsJob}: box ${b.width.toFixed(0)}x${b.height.toFixed(0)} < 52x48`); }
          if (!t) { fails.push('a job row has no text'); return; }
          const lh = parseFloat(getComputedStyle(t).lineHeight), fs = parseFloat(getComputedStyle(t).fontSize);
          if (fs < 17) fails.push(`job text under 17 px`);
          if (rect(t).height > 4 * lh + 1) fails.push(`job ${r.dataset.lcsJob}: ${Math.round(rect(t).height / lh)} lines > 4 (a 90-char job at 19 px in the 213 px column)`);
          if (rect(t).bottom > rect(r).bottom + 0.6 || rect(t).top < rect(r).top - 0.6) fails.push(`job ${r.dataset.lcsJob}: the text leaves its row`);
        });
        if (root.querySelector('[data-lcs-bank-banner]')) fails.push('a word bank on the jobs face');
        const card = root.querySelector('[data-lcs-job-card]');
        if (card) { const c = rect(card), p = rect(svg); if (Math.min(c.right, p.right) - Math.max(c.left, p.left) > 0.6 && Math.min(c.bottom, p.bottom) - Math.max(c.top, p.top) > 0.6) fails.push('the job card overlaps the plant'); }
        const cl = root.cloneNode(true); cl.querySelectorAll('g[data-lcs-tag], [data-lcs-job-text], title').forEach((e) => e.remove());
        if (cl.textContent.trim()) fails.push(`text outside the tags and the jobs: "${cl.textContent.trim().slice(0, 30)}"`);
        return fails;
      }

      // flower
      const labels = (root.dataset.lcsLabels || '').split(',');
      const numbers = J('data-lcs-numbers') || {}, anchors = J('data-lcs-anchors-u') || {};
      const svg = root.querySelector('svg[data-lcs-figure="flower"]');
      if (!svg) { fails.push('no flower section'); return fails; }
      { const r = rect(svg), vb = J('data-lcs-vb'), dh = vb.h * Math.min(r.width / vb.w, r.height / vb.h); if (dh < +root.dataset.lcsFigureH - 1) fails.push(`the flower is drawn ${dh.toFixed(0)} px < its minimum ${root.dataset.lcsFigureH}`); }
      tagsCheck(svg, labels, numbers, anchors);
      const banner = root.querySelector('[data-lcs-bank-banner]');
      if (!banner) { fails.push('no word bank'); return fails; }
      const words = all('[data-lcs-bank]', banner);
      const ids = words.map((w) => w.dataset.lcsBank);
      const decoys = words.filter((w) => w.hasAttribute('data-lcs-decoy'));
      if (decoys.length !== 1 || decoys[0].dataset.lcsBank !== 'root') fails.push('the bank does not carry exactly one decoy (the root word)');
      if (ids.filter((x) => x !== 'root').sort().join() !== labels.slice().sort().join()) fails.push(`bank [${ids}] ≠ labels ∪ decoy`);
      if (ids[0] === 'root' || ids[ids.length - 1] === 'root') fails.push('decoy position tell: the decoy is first or last in the bank');
      if (labels.includes('root')) fails.push('the decoy is a label');
      const tagOrder = labels.slice().sort((a, b) => numbers[a] - numbers[b]);
      const w = ids.filter((x) => x !== 'root');
      if (w.join() === tagOrder.join() || w.join() === tagOrder.slice().reverse().join()) fails.push('the bank order equals the tag order (position leak)');
      if (new Set(words.map((x) => rect(x).top.toFixed(0))).size > 1) fails.push('the word bank wraps to a second row');
      words.forEach((x) => { if (x.scrollWidth > x.clientWidth + 0.6) fails.push(`bank word "${x.textContent.trim()}" is clipped`); });
      const rows = all('[data-lcs-label-card] [data-lcs-row-n]');
      if (rows.map((r) => +r.dataset.lcsRowN).sort((a, b) => a - b).join() !== seq(labels.length)) fails.push('card rows ≠ 1..N');
      rows.forEach((r) => { if (r.textContent.trim() || r.querySelector('text')) fails.push(`row ${r.dataset.lcsRowN} is not empty`); if (rect(r).height < 44 - 0.6) fails.push(`row ${r.dataset.lcsRowN} < 44`); });
      if (+root.dataset.lcsGlyphH < 24) fails.push('glyphH < 24 (G3)');
      const insets = all('[data-lcs-inset]');
      if (insets.length !== 1) fails.push(`${insets.length} insets ≠ 1`);
      else if (insets[0].querySelector('g[data-lcs-tag]')) fails.push('the inset carries a tag');
      else if (!insets[0].querySelector('[data-lcs-look-ring]')) fails.push('the inset has no ring round its flower');
      const cl = root.cloneNode(true); cl.querySelectorAll('g[data-lcs-tag], [data-lcs-row-badge], [data-lcs-bank-banner], title').forEach((e) => e.remove());
      if (cl.textContent.trim()) fails.push(`text outside the tags, badges and bank: "${cl.textContent.trim().slice(0, 30)}"`);
      return fails;
    }, layout, 440, null, FACE_SPARSE);

    // node cross-checks: every printed literal === the bank's
    const got = await page.evaluate(() => {
      const r = document.querySelector('[data-lcs-type="plants"]');
      return {
        loc: r.dataset.lcsLocale,
        chips: [...r.querySelectorAll('[data-lcs-chip]')].map((c) => [c.dataset.lcsChip, c.querySelector('[data-lcs-chip-text]').textContent.trim()]),
        eat: [...r.querySelectorAll('[data-lcs-eat-card]')].map((c) => [c.dataset.lcsFood, c.dataset.lcsPart, [...c.querySelectorAll('[data-lcs-chip]')].map((x) => x.dataset.lcsChip)]),
        jobs: [...r.querySelectorAll('[data-lcs-job]')].map((j) => [j.dataset.lcsJob, j.querySelector('[data-lcs-job-text]').textContent.trim()]),
        bank: [...r.querySelectorAll('[data-lcs-bank-banner] [data-lcs-bank]')].map((w) => [w.dataset.lcsBank, w.textContent.trim()]),
      };
    });
    let b = null;
    try { b = loadBank(BANK, got.loc); } catch (e) { fails.push(`no ${got.loc} bank for the cross-check: ${e.message}`); return fails; }
    const lw = (s) => s.normalize('NFC').toLocaleLowerCase(got.loc);
    for (const [p, t] of got.chips) if (b.partWords[p] !== t) fails.push(`chip ${p} prints "${t}" ≠ partWords.${p} "${b.partWords[p]}"`);
    for (const [food, part, chips] of got.eat) {
      const it = NEUTRAL.EAT.find((x) => x.theme + '/' + x.noun === food);
      if (!it) { fails.push(`food ${food} is not in EAT`); continue; }
      if (it.part !== part) fails.push(`food ${food}: stamped answer ${part} ≠ EAT ${it.part}`);
      for (const c of chips) if (c !== it.part && !it.allow.includes(c)) fails.push(`food ${food}: distractor ${c} ∉ allow [${it.allow}]`);
      if ((b.refuseItems || []).includes(it.noun)) fails.push(`food ${food} is refused in ${got.loc}`);
    }
    const leak = [...Object.values(b.partWords || {}), ...(b.partStems || [])];
    for (const [p, t] of got.jobs) {
      if (!b.jobs || b.jobs[p] !== t) fails.push(`job ${p} prints "${t}" ≠ jobs.${p}`);
      for (const w of leak) if (wordRe(w, got.loc).test(lw(t))) fails.push(`job ${p} leak: "${t}" names the part word "${w}"`);
    }
    if (layout === 'flower') for (const [id, t] of got.bank) { const want = id === 'root' ? b.partWords.root : b.flowerWords[id]; if (want !== t) fails.push(`bank word ${id} prints "${t}" ≠ "${want}"`); }
    return fails;
  },

  async verify(page) {
    const layout = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-type="plants"]'); return r ? r.getAttribute('data-lcs-layout') : null; });
    if (layout) return this._verifyFace(page, layout);
    const fails = await page.evaluate((VBW, VBH) => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="plants"]');
      if (!root) return ['no plants root'];
      const rect = (el) => el.getBoundingClientRect();
      const loc = root.dataset.lcsLocale || 'en';
      if (root.hasAttribute('data-lcs-layout')) fails.push('data-lcs-layout is stamped on the base');
      if (root.querySelector('img')) fails.push('an <img> on the base (the plant is the art)');
      root.querySelectorAll('[data-lcs-answer]').forEach((el) => fails.push(`an answer stamp "${el.getAttribute('data-lcs-answer')}" on the base`));
      const parts = (root.dataset.lcsParts || '').split(',').filter(Boolean);
      let numbers = {}, anchors = {};
      try { numbers = JSON.parse(root.dataset.lcsNumbers || '{}'); anchors = JSON.parse(root.dataset.lcsAnchorsU || '{}'); } catch (e) { fails.push('a stamp is not JSON'); }
      const N = parts.length, rowH = +root.dataset.lcsRowH, figureH = +root.dataset.lcsFigureH, figureMax = +root.dataset.lcsFigureMax, bankOn = root.dataset.lcsBankOn === '1';
      // the plant
      const svg = root.querySelector('svg[data-lcs-plant][data-lcs-stage="full"]');
      const stage = root.querySelector('[data-lcs-plant-stage]');
      if (!svg || !stage) { fails.push('no full-stage plant'); return fails; }
      if (svg.getAttribute('data-lcs-ground') !== 'box') fails.push('the plant has no soil box (roots must show)');
      const st = rect(stage);
      // FILL: the svg fills the grown stage (meet, top-anchored); every viewBox point maps through its CTM
      const M = svg.getScreenCTM();
      const scale = M.d;
      const sr = { left: M.e, top: M.f, right: M.e + VBW * M.a, bottom: M.f + VBH * M.d, height: VBH * M.d };
      if (!(figureMax >= figureH)) fails.push('no data-lcs-figure-max stamp');
      if (sr.height < figureH - 1 || sr.height > figureMax + 1) fails.push(`the plant renders ${Math.round(sr.height)} px high, outside [${figureH}, ${figureMax}]`);
      if (sr.bottom > st.bottom + 0.6 || sr.top < st.top - 0.6 || sr.left < st.left - 0.6 || sr.right > st.right + 0.6) fails.push('the drawn plant leaves its stage');
      const soilY = sr.top + 440 * scale;
      // tags
      const tags = [...svg.querySelectorAll('g[data-lcs-tag]')];
      const tagParts = tags.map((g) => g.dataset.lcsPart);
      if (tags.length !== N) fails.push(`${tags.length} tags ≠ ${N}`);
      if (tagParts.slice().sort().join() !== parts.slice().sort().join()) fails.push(`tag parts [${tagParts.join()}] ≠ parts [${parts.join()}]`);
      const tagNs = tags.map((g) => +g.dataset.lcsN).sort((a, b) => a - b);
      if (tagNs.join() !== Array.from({ length: N }, (_, i) => i + 1).join()) fails.push(`tag numbers [${tagNs.join()}] ≠ 1..${N}`);
      const T = {};
      tags.forEach((g) => {
        const p = g.dataset.lcsPart, n = +g.dataset.lcsN;
        if (numbers[p] !== n) fails.push(`tag ${p} prints n ${n} ≠ the stamp ${numbers[p]}`);
        const txt = g.querySelector('text');
        if (!txt || txt.textContent.trim() !== String(n)) fails.push(`tag ${p}: numeral "${txt && txt.textContent}" ≠ ${n}`);
        const disc = g.querySelector('[data-lcs-tag-disc]');
        const r = rect(disc);
        T[p] = { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2, r: r.width / 2 };
        if (r.width < 28) fails.push(`tag ${p} disc ${r.width.toFixed(1)} px < 28`);
        if (r.left < st.left - 0.6 || r.right > st.right + 0.6 || r.top < st.top - 0.6 || r.bottom > st.bottom + 0.6) fails.push(`tag ${p} leaves the stage`);
        if (txt && parseFloat(txt.getAttribute('font-size')) * scale < 16) fails.push(`tag ${p} numeral under 16 px`);
      });
      const ps = Object.keys(T);
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const d = Math.hypot(T[ps[i]].x - T[ps[j]].x, T[ps[i]].y - T[ps[j]].y);
        if (d < 32) fails.push(`tags ${ps[i]} and ${ps[j]} are ${d.toFixed(1)} px apart (< 32)`);
      }
      // numbering not y-sorted either way
      const byY = ps.slice().sort((a, b) => T[a].y - T[b].y).map((p) => numbers[p]).join();
      if (byY === Array.from({ length: N }, (_, i) => i + 1).join()) fails.push('the tag numbers run top-to-bottom (numbering tell)');
      if (byY === Array.from({ length: N }, (_, i) => N - i).join()) fails.push('the tag numbers run bottom-to-top (numbering tell)');
      // rings on the anchors, threads from the disc edge to the ring
      const segs = [];
      for (const p of ps) {
        const a = anchors[p];
        if (!a) { fails.push(`${p}: no stamped anchor`); continue; }
        const ax = sr.left + a.x * M.a, ay = sr.top + a.y * M.d;
        const ring = svg.querySelector(`circle[data-lcs-ring="${p}"]`);
        if (!ring) { fails.push(`${p}: no ring`); continue; }
        const rr = rect(ring), rx = (rr.left + rr.right) / 2, ry = (rr.top + rr.bottom) / 2;
        if (Math.hypot(rx - ax, ry - ay) > 1.5) fails.push(`${p}: ring sits ${Math.hypot(rx - ax, ry - ay).toFixed(1)} px off its anchor`);
        if (p === 'root' && ay <= soilY) fails.push(`root anchor above the soil line (${ay.toFixed(1)} <= ${soilY.toFixed(1)})`);
        if (p !== 'root' && ay >= soilY) fails.push(`${p} anchor below the soil line`);
        const th = svg.querySelector(`line[data-lcs-thread="${p}"]`);
        if (!th) { fails.push(`${p}: no thread`); continue; }
        const X = (v) => sr.left + +v * M.a, Y = (v) => sr.top + +v * M.d;
        const s = { p, x1: X(th.getAttribute('x1')), y1: Y(th.getAttribute('y1')), x2: X(th.getAttribute('x2')), y2: Y(th.getAttribute('y2')) };
        const ringR = rr.width / 2 - 1.25;
        if (Math.abs(Math.hypot(s.x2 - ax, s.y2 - ay) - ringR) > 1.5) fails.push(`${p}: thread ends ${Math.hypot(s.x2 - ax, s.y2 - ay).toFixed(1)} px from the anchor (want the ring edge ${ringR.toFixed(1)})`);
        if (T[p] && Math.abs(Math.hypot(s.x1 - T[p].x, s.y1 - T[p].y) - T[p].r) > 1.5) fails.push(`${p}: thread does not start on its tag's edge`);
        segs.push(s);
      }
      const cross = (a, b) => { const d = (px, py, qx, qy, rx, ry) => (qx - px) * (ry - py) - (qy - py) * (rx - px);
        return d(a.x1, a.y1, a.x2, a.y2, b.x1, b.y1) * d(a.x1, a.y1, a.x2, a.y2, b.x2, b.y2) < 0 && d(b.x1, b.y1, b.x2, b.y2, a.x1, a.y1) * d(b.x1, b.y1, b.x2, b.y2, a.x2, a.y2) < 0; };
      const distPS = (px, py, s) => { const dx = s.x2 - s.x1, dy = s.y2 - s.y1; const t = Math.max(0, Math.min(1, ((px - s.x1) * dx + (py - s.y1) * dy) / (dx * dx + dy * dy))); return Math.hypot(px - (s.x1 + t * dx), py - (s.y1 + t * dy)); };
      for (let i = 0; i < segs.length; i++) for (let j = i + 1; j < segs.length; j++) if (cross(segs[i], segs[j])) fails.push(`threads ${segs[i].p} and ${segs[j].p} cross`);
      for (const s of segs) for (const p of ps) if (p !== s.p && distPS(T[p].x, T[p].y, s) < T[p].r + 4) fails.push(`thread ${s.p} runs over tag ${p}`);
      // the label card: rows 1..N, empty, the floors
      const rows = [...root.querySelectorAll('[data-lcs-label-card] [data-lcs-row-n]')];
      const rowNs = rows.map((r) => +r.dataset.lcsRowN);
      if (rowNs.slice().sort((a, b) => a - b).join() !== Array.from({ length: N }, (_, i) => i + 1).join()) fails.push(`card rows [${rowNs.join()}] ≠ 1..${N}`);
      const card = root.querySelector('[data-lcs-label-card]');
      rows.forEach((r) => {
        const n = r.dataset.lcsRowN, rb = rect(r);
        if (r.textContent.trim()) fails.push(`row ${n} prints "${r.textContent.trim()}"`);
        if (r.querySelector('text')) fails.push(`row ${n}: SVG text on the row`);
        if (!r.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push(`row ${n}: no writing row`);
        if (rb.height < Math.max(44, rowH) - 0.6) fails.push(`row ${n}: ${rb.height.toFixed(1)} px < ${Math.max(44, rowH)}`);
        const badge = r.parentElement && r.parentElement.querySelector('[data-lcs-row-badge]');
        if (!badge || badge.getAttribute('data-lcs-row-badge') !== n) fails.push(`row ${n}: its badge does not carry ${n}`);
      });
      if (card) {
        const cr = rect(card);
        if (Math.min(cr.right, sr.right) - Math.max(cr.left, sr.left) > 0.6 && Math.min(cr.bottom, sr.bottom) - Math.max(cr.top, sr.top) > 0.6) fails.push('the label card overlaps the plant');
        if (cr.bottom > st.bottom + 0.6 || cr.top < st.top - 0.6) fails.push('the label card leaves the stage row');
      } else fails.push('no label card');
      // the bank
      const banner = root.querySelector('[data-lcs-bank-banner]');
      if (bankOn) {
        if (!banner) fails.push('no word bank');
        else {
          const words = [...banner.querySelectorAll('[data-lcs-bank]')];
          const ids = words.map((w) => w.dataset.lcsBank);
          if (ids.slice().sort().join() !== parts.slice().sort().join()) fails.push(`bank ids [${ids.join()}] ≠ tag parts (no bijection)`);
          const tagOrder = ps.slice().sort((a, b) => numbers[a] - numbers[b]);
          if (ids.join() === tagOrder.join()) fails.push('the bank order equals the tag order (position leak)');
          if (ids.join() === tagOrder.slice().reverse().join()) fails.push('the bank order is the reversed tag order (position leak)');
          const tops = new Set(words.map((w) => Math.round(rect(w).top)));
          if (tops.size > 1) fails.push('the word bank wraps to a second row');
          words.forEach((w) => {
            if (w.scrollWidth > w.clientWidth + 0.6) fails.push(`bank word "${w.textContent.trim()}" is clipped`);
            if (parseFloat(getComputedStyle(w).fontSize) < 18) fails.push(`bank word "${w.textContent.trim()}" under 18 px`);
          });
          const txt = words.map((w) => w.textContent.trim().toLocaleLowerCase(loc));
          if (new Set(txt).size !== txt.length) fails.push('two bank words print the same text');
          if (rect(banner).bottom > st.top + 0.6) fails.push('the bank overlaps the stage');
          if (rect(banner).width > 675.6) fails.push('the bank is wider than the body');
        }
      } else if (banner) fails.push('a word bank on a no-bank config');
      // everything above the footer, no body overflow
      const foot = document.querySelector('.ws-foot');
      if (foot && Math.max(st.bottom, card ? rect(card).bottom : 0) > rect(foot).top + 0.6) fails.push('the stage reaches the footer');
      if (root.scrollWidth > root.clientWidth + 0.6) fails.push('the body overflows horizontally');
      // no numeral anywhere but the tag numerals and the row badges
      const clone = root.cloneNode(true);
      clone.querySelectorAll('g[data-lcs-tag], [data-lcs-row-badge]').forEach((e) => e.remove());
      if (/\d/.test(clone.textContent)) fails.push('a digit is printed outside the tags and the row badges');
      return fails;
    }, VB_W, VB_H);
    // node cross-check: every bank literal === partWords[loc][id]
    const got = await page.evaluate(() => { const r = document.querySelector('[data-lcs-type="plants"]'); return r ? { loc: r.dataset.lcsLocale, words: [...r.querySelectorAll('[data-lcs-bank-banner] [data-lcs-bank]')].map((w) => [w.dataset.lcsBank, w.textContent.trim()]) } : null; });
    if (got && got.words.length) {
      let b = null;
      try { b = loadBank(BANK, got.loc); } catch (e) { fails.push(`no ${got.loc} bank for the cross-check: ${e.message}`); }
      if (b) for (const [id, txt] of got.words) if (!b.partWords || b.partWords[id] !== txt) fails.push(`bank word ${id} prints "${txt}" ≠ partWords.${id} "${b.partWords && b.partWords[id]}"`);
    }
    return fails;
  },
};

module.exports = TYPE;
