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
 * Stack 69 + 592 = 661. MEASURED (qa/verify-b5-plants.js): a 4-line title + 3-line
 * instruction leaves a 667 px body (not the ruled 677), so the design's h 600 plant
 * (stack 669) overflowed the footer by 3 px; the plant is drawn at h 592 (scale 0.987,
 * every px-sized mark — tags, rings, strokes — unchanged). Recorded in the build report.
 *
 * Stamps: root [data-ws-content][data-lcs-type="plants"] data-lcs-parts (ids in part
 * order) data-lcs-numbers (JSON id -> n) data-lcs-anchors (px JSON relative to the
 * stage) data-lcs-rows/-row-h/-glyph-h/-bank/-figure-h/-locale; the svg
 * [data-lcs-plant][data-lcs-stage="full"]; each tag <g data-lcs-tag data-lcs-part
 * data-lcs-n>; each card row data-lcs-row-n; each bank word data-lcs-bank=<id>.
 * verify(page) re-derives everything from the stamps + the rendered geometry and
 * cross-checks every bank literal against partWords[loc] in node.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const C5 = require('../../templates/components-b5.js');
const { ANCHORS, PARTS, VB_W, VB_H } = require('../../primitives/plant-figure.js');

const ID = 'G1-376';
const KEY = 'plants';
const BANK = 'plants';
const STAGE_W = 380, STAGE_GAP = 16, CARD_W = 279, BODY_W = 675, STAGE_H = 600;
const G1_FLOOR = 44;
const TRIES = 40;

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
    1: { parts: ['root', 'stem', 'leaf', 'flower'], bank: true, figureH: 592, rowH: 72, glyphH: 32, bankPx: 18, boxW: 205 },
    2: { parts: ['root', 'stem', 'leaf', 'flower', 'fruit', 'seed'], bank: true, figureH: 592, rowH: 64, glyphH: 30, bankPx: 18, boxW: 205 },
    3: { parts: ['root', 'stem', 'leaf', 'flower', 'fruit', 'seed'], bank: false, figureH: 592, rowH: 64, glyphH: 30, bankPx: 18, boxW: 205 },
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
    if (d.layout) throw new Error(`${ID}: layout "${d.layout}" is a Phase-2 face (not built yet)`);
    // guards on the RESOLVED config
    if (!Array.isArray(d.parts) || d.parts.length < 2) throw new Error(`${ID}: parts must list >= 2 part ids`);
    for (const p of d.parts) if (!PARTS.includes(p)) throw new Error(`${ID}: unknown part "${p}"`);
    if (new Set(d.parts).size !== d.parts.length) throw new Error(`${ID}: a part repeats`);
    if (d.rowH < G1_FLOOR) throw new Error(`${ID}: rowH ${d.rowH} < the G1 floor ${G1_FLOOR}`);
    if (d.glyphH < 24 || d.rowH - 6 < d.glyphH + 12) throw new Error(`${ID}: row ${d.rowH} cannot hold a glyphH ${d.glyphH} writing row`);
    if (d.figureH > STAGE_H) throw new Error(`${ID}: figureH ${d.figureH} > the stage ${STAGE_H}`);
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

    const stage = C5.plantTagStage({ parts: d.parts, anchorPick, numbers, h: d.figureH, w: STAGE_W });
    const card = C5.plantLabelCard({ rows: tagOrder.map((p) => numbers[p]), rowH: d.rowH, glyphH: d.glyphH, boxW: d.boxW, cardW: CARD_W });
    const bankHtml = d.bank ? C5.plantBank({ words: bankOrder.map((id) => ({ id, word: words[id] })), wordPx: d.bankPx }) : '';
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const bodyHtml = `<div data-ws-content data-lcs-type="${KEY}" data-lcs-locale="${loc}" data-lcs-parts="${d.parts.join(',')}" ` +
      `data-lcs-numbers='${js(numbers)}' data-lcs-picks='${js(anchorPick)}' data-lcs-anchors='${js(stage.anchors)}' ` +
      `data-lcs-rows="${d.parts.length}" data-lcs-row-h="${d.rowH}" data-lcs-glyph-h="${d.glyphH}" data-lcs-bank-on="${d.bank ? 1 : 0}" data-lcs-figure-h="${d.figureH}" ` +
      `style="flex:1;min-height:0;display:grid;grid-template-rows:${d.bank ? 'auto ' : ''}${d.figureH}px;align-content:start">` +
      bankHtml +
      `<div data-lcs-stage-row style="display:grid;grid-template-columns:${STAGE_W}px ${STAGE_GAP}px ${CARD_W}px;align-items:center;min-height:0">` +
      stage.html + `<div></div>` + `<div style="display:flex;justify-content:center">${card}</div>` +
      `</div></div>`;
    return { bodyHtml, meta: { parts: d.parts, numbers, anchorPick, bank: bankOrder } };
  },

  async verify(page) {
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
      try { numbers = JSON.parse(root.dataset.lcsNumbers || '{}'); anchors = JSON.parse(root.dataset.lcsAnchors || '{}'); } catch (e) { fails.push('a stamp is not JSON'); }
      const N = parts.length, rowH = +root.dataset.lcsRowH, figureH = +root.dataset.lcsFigureH, bankOn = root.dataset.lcsBankOn === '1';
      // the plant
      const svg = root.querySelector('svg[data-lcs-plant][data-lcs-stage="full"]');
      const stage = root.querySelector('[data-lcs-plant-stage]');
      if (!svg || !stage) { fails.push('no full-stage plant'); return fails; }
      if (svg.getAttribute('data-lcs-ground') !== 'box') fails.push('the plant has no soil box (roots must show)');
      const sr = rect(svg), st = rect(stage);
      if (Math.abs(sr.height - figureH) > 1) fails.push(`the plant renders ${Math.round(sr.height)} px high ≠ ${figureH}`);
      const scale = sr.height / VBH;
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
        const ax = st.left + a.x, ay = st.top + a.y;
        const ring = svg.querySelector(`circle[data-lcs-ring="${p}"]`);
        if (!ring) { fails.push(`${p}: no ring`); continue; }
        const rr = rect(ring), rx = (rr.left + rr.right) / 2, ry = (rr.top + rr.bottom) / 2;
        if (Math.hypot(rx - ax, ry - ay) > 1.5) fails.push(`${p}: ring sits ${Math.hypot(rx - ax, ry - ay).toFixed(1)} px off its anchor`);
        if (p === 'root' && ay <= soilY) fails.push(`root anchor above the soil line (${ay.toFixed(1)} <= ${soilY.toFixed(1)})`);
        if (p !== 'root' && ay >= soilY) fails.push(`${p} anchor below the soil line`);
        const th = svg.querySelector(`line[data-lcs-thread="${p}"]`);
        if (!th) { fails.push(`${p}: no thread`); continue; }
        const X = (v) => sr.left + +v * scale, Y = (v) => sr.top + +v * scale;
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
