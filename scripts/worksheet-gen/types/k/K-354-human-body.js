/**
 * K-354 — Parts of the Body: Label the Figure (nt10-D; family key `human-body`,
 * K, science, readiness — no K-2 CCSS code names body parts; `teaches` "Parts of
 * the body (readiness)"). Design: docs/worksheet-gen/b4-designs/K-354-human-body.md
 * §2/§5; every ruling in _work/K-354-critic.md; build record _work/K-354-build.md.
 *
 * ONE drawn child (primitives/body-figure.js, 504 px tall, teal 3 px line art on
 * a cream fill — the figure IS the art, no library picture on the base), six
 * EMPTY label lanes, three a side, each tied by a straight teal leader to a
 * coral RING on a part of the body, and a word bank of the six part words on
 * top. The child copies each word onto the lane whose leader ends on that
 * part. NOT K-344 (label the FACE picture with eye ear nose mouth hair
 * eyebrow chin from a bank onto ruled lanes): every page LEADS with
 * `arm leg hand foot knee elbow shoulder neck head finger toe` (>= leadMin
 * targets from that set) and admits at most `faceMax` of `eye ear nose
 * mouth hair`; the coral RING (K-344 prints solid coral dots on a 260 px
 * photo-like face) is the signature a teacher tells apart across the room.
 *
 * THEME FIXED to `body parts` (types/_shared/fixed-theme.js → themeAxis
 * non-applicable; landings carry coordinate.theme:''). The base draws NO
 * library picture; `body parts` is the pool the faces' chips come from
 * (Phase 2). No unitAxis. build() reads ONLY its bank (lib/b4-common.js
 * bank('human-body', loc) — a missing locale block THROWS, never an en
 * fallback); every printed word is a whole panel literal (`bankWords[id]`,
 * which must END with `partWords[id]`); a literal that is missing, carries a
 * `{` slot or a digit REFUSES. Never image-vocabulary.js at render; the
 * counts of data/b4/body-facts.json are the faces' business.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys, never the
 * level index (design §2 ladder):
 *   d1  labels 4 / perSide 2 / faceMax 1 / leadMin 3, lanes 195 x 64, glyphH 40
 *   d2  labels 6 / perSide 3 / faceMax 2 / leadMin 4, lanes 195 x 64      (ships)
 *   d3  labels 8 / perSide 4 / faceMax 2 / leadMin 6, lanes 195 x 56, glyphH 36
 *
 * COMPOSER (locale-neutral: same ids, sides and bank order in all 11 — only
 * the literals change): rng.sample `labels` ids of the 16 under faceMax /
 * leadMin, rng.shuffle them, the first perSide take side L and the rest side
 * R (a bilateral id takes ITS side's anchor; nose / mouth / neck are midline
 * points either side may claim); the stage is built and its crossing sweep
 * (components-b4/human-body.js: no two leaders intersect, none passes within
 * 16 px of another target's ring, none crosses a limb it does not belong to)
 * REJECTS the draw — bounded 40 tries, then the design's fixed set for that
 * perSide (head leg foot | arm hand knee at d2). A locale's per-word refusal
 * (`refuseWords.base`) shrinks the pool and rejects any draw holding the id
 * (locales without one stay byte-identical in ids / sides / order). The bank
 * order is rng.shuffle'd until it differs from the top-to-bottom lane order
 * AND its reverse (the G1-244 position-leak idiom).
 *
 * Chrome budget (README ruling): body 722 with 3-line title + 3-line
 * instruction, 677 with a 4-line fi title. Root grid rows `auto
 * minmax(580px,1fr)`: bank 59 (+10 margin) one row / 108 with two-row article
 * literals, then the stage cell; the 675 x 580 stage is CENTRED in its cell so
 * the slack splits above and below the figure (a static page cannot re-run
 * placeLanes against a taller stage; centring is the faithful equivalent).
 * Stack 69 + 580 = 649 <= 677; two-row bank 118 + 580 = 698 <= 722.
 *
 * Answer hiding + stamps: lanes are EMPTY; the mapping word -> lane lives only
 * in data-lcs-label="<id>" on the lane and data-lcs-bank="<id>" on the bank
 * word (never text). Root: data-lcs-parts (ids in lane order), data-lcs-anchors
 * (px per id with side), data-lcs-per-side / -face-max / -lead-min / -lane-w /
 * -lane-h / -figure-h; the figure svg[data-lcs-body] with data-lcs-body-h; no
 * <img>, no digit, no `{`, no data-lcs-answer, no data-lcs-layout on the base
 * (the faces stamp it only when declared — Phase 2). verify(page) re-derives
 * everything from the stamps: bank ids <=> lane ids (bijection), perSide lanes
 * a side, every pointer's anchor within 2 px of the stamped anchor and inside
 * the figure box on the lane's side of the midline, the drawn line starting on
 * the ring's edge and ending on the lane's near-edge midpoint, the sweep,
 * empty lanes (no text, no SVG text), 12 regions and nothing hidden, faceMax +
 * leadMin honoured, bank order !== lane order (and its reverse), distinct
 * unclipped bank words.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { withFixedTheme } = require('../_shared/fixed-theme.js');
const C4 = require('../../templates/components-b4.js');
const { ANCHOR_IDS, LABEL_MIN_H } = require('../../primitives/body-figure.js');

const ID = 'K-354';
const KEY = 'human-body';
const BANK = 'human-body';
const BODY_W = 675;
const STAGE_H = 580;
const GAP_X = 7;
const LANE_GAP = 20;
const K_FLOOR = 56;
const LEAD_SET = ['arm', 'leg', 'hand', 'foot', 'knee', 'elbow', 'shoulder', 'neck', 'head', 'finger', 'toe'];
const FACE_SET = ['eye', 'ear', 'nose', 'mouth', 'hair'];
const TRIES = 40;
const BANK_TRIES = 20;
/** The design's fixed sets (the composer's fallback after TRIES rejections), per lanes-a-side. */
const FALLBACK = {
  2: [['head', 'L'], ['foot', 'L'], ['arm', 'R'], ['knee', 'R']],
  3: [['head', 'L'], ['leg', 'L'], ['foot', 'L'], ['arm', 'R'], ['hand', 'R'], ['knee', 'R']],
  4: [['head', 'L'], ['elbow', 'L'], ['leg', 'L'], ['foot', 'L'], ['shoulder', 'R'], ['arm', 'R'], ['hand', 'R'], ['knee', 'R']],
};

function literal(obj, key, what, loc) {
  const v = obj && obj[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: ${loc} has no ${what}.${key} (refuse, never pad)`);
  if (v.includes('{')) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" carries a slot (whole literals only)`);
  if (/\d/.test(v)) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" prints a digit`);
  return v;
}

const TYPE = {
  id: ID,
  slug: 'human-body',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  difficulty: {
    1: { labels: 4, perSide: 2, faceMax: 1, leadMin: 3, figureH: 504, laneW: 195, laneH: 64, glyphH: 40, bankPx: 18 },
    2: { labels: 6, perSide: 3, faceMax: 2, leadMin: 4, figureH: 504, laneW: 195, laneH: 64, glyphH: 40, bankPx: 18 },
    3: { labels: 8, perSide: 4, faceMax: 2, leadMin: 6, figureH: 504, laneW: 195, laneH: 56, glyphH: 36, bankPx: 18 },
  },
  i18n: {
    en: {
      title: 'Parts of the Body',
      instruction: 'Copy each word from the bank onto the line that points to that part of the body.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d, { locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx && ctx.rng;
    if (!rng) throw new Error(`${ID}: no rng in ctx (a seeded page)`);
    if (d.layout) throw new Error(`${ID}: layout "${d.layout}" is a Phase 2 face — not built`);
    // guards on the RESOLVED config
    if (!(d.labels >= 2 && d.labels <= 8)) throw new Error(`${ID}: labels ${d.labels} outside 2..8`);
    if (d.labels !== 2 * d.perSide) throw new Error(`${ID}: labels ${d.labels} ≠ 2 × perSide ${d.perSide}`);
    if (!(d.faceMax >= 0 && d.faceMax <= 2)) throw new Error(`${ID}: faceMax ${d.faceMax} outside 0..2 (K-344 territory)`);
    if (!(d.leadMin >= 1 && d.leadMin <= d.labels)) throw new Error(`${ID}: leadMin ${d.leadMin} outside 1..${d.labels}`);
    if (d.labels - d.faceMax > LEAD_SET.length) throw new Error(`${ID}: ${d.labels} labels with faceMax ${d.faceMax} exceed the lead set`);
    if (d.laneH < K_FLOOR) throw new Error(`${ID}: laneH ${d.laneH} < the K floor ${K_FLOOR}`);
    if (d.glyphH < 32) throw new Error(`${ID}: glyphH ${d.glyphH} < 32 (a K writing lane)`);
    if (d.laneH - 6 < d.glyphH + 8) throw new Error(`${ID}: lane ${d.laneH} cannot hold a glyphH ${d.glyphH} row`);
    if (d.figureH < LABEL_MIN_H) throw new Error(`${ID}: figureH ${d.figureH} < LABEL_MIN_H ${LABEL_MIN_H}`);
    if (d.figureH > STAGE_H) throw new Error(`${ID}: figureH ${d.figureH} > the stage ${STAGE_H}`);
    const figW = d.figureH * 300 / 560;
    if (2 * d.laneW + 2 * GAP_X + figW > BODY_W + 0.5) throw new Error(`${ID}: lanes + figure ${(2 * d.laneW + 2 * GAP_X + figW).toFixed(1)} > the body ${BODY_W}`);
    if (d.laneW < 150) throw new Error(`${ID}: laneW ${d.laneW} < 150`);
    if (d.perSide * (d.laneH + LANE_GAP) - LANE_GAP > STAGE_H) throw new Error(`${ID}: ${d.perSide} lanes of ${d.laneH} do not fit the ${STAGE_H} stage`);
    if (!(d.bankPx >= 16)) throw new Error(`${ID}: bankPx ${d.bankPx} < 16`);
    if (!FALLBACK[d.perSide]) throw new Error(`${ID}: no fallback set for ${d.perSide} lanes a side`);
    // the bank literals
    const PW = bankLoc && bankLoc.partWords, BW = bankLoc && bankLoc.bankWords;
    if (!PW || !BW) throw new Error(`${ID}: ${loc} bank has no partWords / bankWords block (refuse)`);
    for (const id of ANCHOR_IDS) {
      const p = literal(PW, id, 'partWords', loc), b = literal(BW, id, 'bankWords', loc);
      if (!b.toLocaleLowerCase(loc).endsWith(p.toLocaleLowerCase(loc))) throw new Error(`${ID}: ${loc} bankWords.${id} "${b}" does not end with partWords.${id} "${p}"`);
    }
    const refused = new Set((bankLoc.refuseWords && bankLoc.refuseWords.base) || []);
    for (const id of refused) if (!ANCHOR_IDS.includes(id)) throw new Error(`${ID}: ${loc} refuseWords.base names an unknown id "${id}"`);
    if (Array.isArray(bankLoc.refuse) && bankLoc.refuse.includes('base')) throw new Error(`${ID}: ${loc} refuses the base (bank.refuse)`);

    const { targets, stage } = this._compose(rng, d, loc, refused);
    const laneOrder = stage.laneOrder;
    const words = laneOrder.map((id) => ({ id, word: BW[id] }));
    const seen = new Set();
    for (const w of words) { const k = w.word.toLocaleLowerCase(loc); if (seen.has(k)) throw new Error(`${ID}: two parts print the same bank word "${w.word}" in ${loc}`); seen.add(k); }
    let bankOrder = null;
    const rev = laneOrder.slice().reverse().join();
    for (let t = 0; t < BANK_TRIES; t++) {
      const o = rng.shuffle(words);
      const key = o.map((w) => w.id).join();
      if (key !== laneOrder.join() && key !== rev) { bankOrder = o; break; }
    }
    if (!bankOrder) throw new Error(`${ID}: no bank order differing from the lane order in ${BANK_TRIES} draws`);

    const anchorJson = JSON.stringify(Object.fromEntries(Object.entries(stage.anchors).map(([id, a]) => [id, { x: +a.x.toFixed(1), y: +a.y.toFixed(1), side: a.side }])));
    const bodyHtml = `<div data-ws-content data-lcs-type="${KEY}" data-lcs-locale="${loc}" data-lcs-parts="${laneOrder.join(',')}" ` +
      `data-lcs-anchors='${anchorJson.replace(/'/g, '&#39;')}' data-lcs-per-side="${d.perSide}" data-lcs-face-max="${d.faceMax}" data-lcs-lead-min="${d.leadMin}" ` +
      `data-lcs-lane-w="${d.laneW}" data-lcs-lane-h="${d.laneH}" data-lcs-figure-h="${d.figureH}" data-lcs-bank-px="${d.bankPx}" data-lcs-stage-h="${STAGE_H}" ` +
      `style="flex:1;min-height:0;display:grid;grid-template-rows:auto minmax(${STAGE_H}px,1fr)">` +
      C4.bodyLabelBank({ words: bankOrder, wordPx: d.bankPx }) +
      `<div data-lcs-stagecell style="display:flex;align-items:center;justify-content:center;min-height:0">${stage.html}</div>` +
      `</div>`;
    return { bodyHtml, meta: { parts: laneOrder, targets: targets.map((t) => t.id + '-' + t.side), bank: bankOrder.map((w) => w.id), fallback: !!stage.fallback } };
  },

  /** rng.sample + rejection on the stage's crossing sweep; the design's fixed set after TRIES rejections. */
  _compose(rng, d, loc, refused) {
    const pool = ANCHOR_IDS.filter((id) => !refused.has(id));
    if (pool.length < d.labels) throw new Error(`${ID}: ${loc} refuses ${refused.size} words, ${pool.length} left < ${d.labels} labels (refuse)`);
    const stageOf = (targets) => C4.bodyLabelStage({ targets, figureH: d.figureH, laneW: d.laneW, laneH: d.laneH, glyphH: d.glyphH, w: BODY_W, h: STAGE_H, gapX: GAP_X });
    for (let t = 0; t < (d.fixed ? 0 : TRIES); t++) {   // `fixed:true` = the gate's seam onto the design's fixed set (never a shipped config)
      const ids = rng.sample(pool, d.labels);
      const faces = ids.filter((id) => FACE_SET.includes(id)).length, leads = ids.filter((id) => LEAD_SET.includes(id)).length;
      if (faces > d.faceMax || leads < d.leadMin) continue;
      const order = rng.shuffle(ids);
      const targets = order.map((id, i) => ({ id, side: i < d.perSide ? 'L' : 'R' }));
      try { return { targets, stage: stageOf(targets) }; } catch (e) { if (e.code !== 'LEADER_CROSS') throw e; }
    }
    const targets = FALLBACK[d.perSide].map(([id, side]) => ({ id, side }));
    for (const t of targets) if (refused.has(t.id)) throw new Error(`${ID}: ${loc} refuses "${t.id}" and no sampled set passed the sweep in ${TRIES} draws (refuse)`);
    const stage = stageOf(targets);   // the fixed set is sweep-clean by construction (the gate asserts it)
    stage.fallback = true;
    return { targets, stage };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="human-body"]');
      if (!root) return ['no human-body root'];
      const rect = (el) => el.getBoundingClientRect();
      const body = document.querySelector('[data-lcs-body]');
      const K = 56;
      const LEAD = ['arm', 'leg', 'hand', 'foot', 'knee', 'elbow', 'shoulder', 'neck', 'head', 'finger', 'toe'];
      const FACE = ['eye', 'ear', 'nose', 'mouth', 'hair'];
      const loc = root.dataset.lcsLocale || 'en';
      if (root.hasAttribute('data-lcs-layout')) fails.push('data-lcs-layout is stamped on the base');
      if (root.querySelector('img')) fails.push('an <img> on the base (the figure is the art)');
      if (/\d/.test(root.textContent || '')) fails.push('a digit is printed in the body');
      if ((root.textContent || '').includes('{')) fails.push('a `{` slot is printed in the body');
      root.querySelectorAll('[data-lcs-answer]').forEach((el) => { if (el.getAttribute('data-lcs-answer') !== '') fails.push(`an answer value "${el.getAttribute('data-lcs-answer')}" is stamped`); });
      if (root.querySelector('.ws-answerbox')) fails.push('an answerBox on an open page');
      const perSide = +root.dataset.lcsPerSide, faceMax = +root.dataset.lcsFaceMax, leadMin = +root.dataset.lcsLeadMin;
      const laneW = +root.dataset.lcsLaneW, laneH = +root.dataset.lcsLaneH, figureH = +root.dataset.lcsFigureH;
      const parts = (root.dataset.lcsParts || '').split(',').filter(Boolean);
      let anchors = {}; try { anchors = JSON.parse(root.dataset.lcsAnchors || '{}'); } catch (e) { fails.push('anchor stamp is not JSON'); }
      // the figure
      const figWrap = root.querySelector('[data-lcs-figure]');
      const fig = figWrap && figWrap.querySelector('svg[data-lcs-body]');
      if (!fig) fails.push('no body figure');
      else {
        if (+fig.getAttribute('data-lcs-body-h') !== figureH) fails.push(`figure stamps h ${fig.getAttribute('data-lcs-body-h')} ≠ ${figureH}`);
        if (Math.abs(rect(fig).height - figureH) > 1) fails.push(`figure renders ${Math.round(rect(fig).height)} px high ≠ ${figureH}`);
        if (fig.hasAttribute('data-lcs-hidden')) fails.push('a region is hidden on the base');
        const regions = fig.querySelectorAll('[data-lcs-region]');
        if (regions.length !== 12) fails.push(`${regions.length} figure regions ≠ 12`);
        if (fig.querySelector('[data-lcs-marker]')) fails.push('a marker on the base');
        if (fig.querySelector('text')) fails.push('SVG text on the figure');
        const scale = +fig.getAttribute('data-lcs-scale') || (figureH / 560);
        fig.querySelectorAll('[data-lcs-region] path, [data-lcs-region] rect, [data-lcs-region] ellipse, [data-lcs-region] circle').forEach((el) => {
          const st = el.getAttribute('stroke'), sw = parseFloat(el.getAttribute('stroke-width') || '0');
          if (!st) return;
          if (st.toUpperCase() !== '#146B5E') fails.push(`a region outline is ${st}, not teal`);
          const px = sw * scale;
          if (![3, 2.5, 1.5].some((w) => Math.abs(px - w) < 0.2)) fails.push(`a region stroke renders ${px.toFixed(2)} px (want 3 / 2.5 / 1.5)`);
        });
      }
      const fr = fig ? rect(fig) : null;
      const midX = fr ? (fr.left + fr.right) / 2 : 0;
      // bank <=> lanes
      const bankWords = [...root.querySelectorAll('[data-lcs-bank-banner] [data-lcs-bank]')];
      const lanes = [...root.querySelectorAll('[data-lcs-label]')];
      const bankIds = bankWords.map((w) => w.dataset.lcsBank).sort(), laneIds = lanes.map((l) => l.dataset.lcsLabel).sort();
      if (bankIds.join() !== laneIds.join()) fails.push(`bank ids [${bankIds.join()}] ≠ lane ids [${laneIds.join()}] (no bijection)`);
      if (new Set(laneIds).size !== laneIds.length) fails.push('a lane id repeats');
      if (laneIds.join() !== parts.slice().sort().join()) fails.push(`lane ids ≠ the stamped parts [${parts.join()}]`);
      if (lanes.length !== 2 * perSide) fails.push(`${lanes.length} lanes ≠ 2 × ${perSide}`);
      for (const s of ['L', 'R']) { const n = lanes.filter((l) => l.dataset.lcsSide === s).length; if (n !== perSide) fails.push(`${n} lanes on side ${s} ≠ ${perSide}`); }
      const faces = laneIds.filter((id) => FACE.includes(id)).length, leads = laneIds.filter((id) => LEAD.includes(id)).length;
      if (faces > faceMax) fails.push(`${faces} face parts > faceMax ${faceMax}`);
      if (leads < leadMin) fails.push(`${leads} lead parts < leadMin ${leadMin}`);
      // the bank words: whole, distinct, unclipped; the order never equals the lane order (or its reverse)
      const texts = bankWords.map((w) => w.textContent.trim().toLocaleLowerCase(loc));
      if (new Set(texts).size !== texts.length) fails.push('two bank words print the same text');
      bankWords.forEach((w, i) => {
        if (!w.textContent.trim()) fails.push(`bank word ${i + 1} is empty`);
        if (w.scrollWidth > w.clientWidth + 0.6) fails.push(`bank word "${w.textContent.trim()}" is clipped`);
        if (parseFloat(getComputedStyle(w).fontSize) < 16) fails.push(`bank word "${w.textContent.trim()}" under 16 px`);
      });
      const laneOrder = lanes.slice().sort((a, b) => rect(a).top - rect(b).top || (a.dataset.lcsSide === 'L' ? -1 : 1)).map((l) => l.dataset.lcsLabel);
      const bankOrder = bankWords.map((w) => w.dataset.lcsBank);
      if (bankOrder.join() === laneOrder.join()) fails.push('the bank order equals the top-to-bottom lane order (position leak)');
      if (bankOrder.join() === laneOrder.slice().reverse().join()) fails.push('the bank order is the reversed lane order (position leak)');
      if (laneOrder.join() !== parts.join()) fails.push(`the stamped parts [${parts.join()}] ≠ the rendered lane order [${laneOrder.join()}]`);
      // the lanes: empty, a writing row, the floors, inside the stage, no overlap with the figure or each other
      const br = body ? rect(body) : null;
      const foot = document.querySelector('.ws-foot'), footTop = foot ? rect(foot).top : Infinity;
      lanes.forEach((ln) => {
        const what = `lane ${ln.dataset.lcsLabel}`;
        if (!ln.classList.contains('ws-blankbox')) fails.push(`${what}: not a .ws-blankbox`);
        if (ln.textContent.trim()) fails.push(`${what}: the lane prints "${ln.textContent.trim().slice(0, 16)}"`);
        if (!ln.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push(`${what}: no writing row`);
        if (ln.querySelector('text')) fails.push(`${what}: SVG text on the lane (a model word)`);
        const r = rect(ln);
        if (r.height < Math.max(K, laneH) - 0.6) fails.push(`${what}: ${Math.round(r.height)} px high < ${Math.max(K, laneH)}`);
        if (Math.abs(r.width - laneW) > 1) fails.push(`${what}: ${Math.round(r.width)} wide ≠ ${laneW}`);
        if (fr && Math.min(r.right, fr.right) - Math.max(r.left, fr.left) > 0.6 && Math.min(r.bottom, fr.bottom) - Math.max(r.top, fr.top) > 0.6) fails.push(`${what} overlaps the figure`);
        if (br && (r.left < br.left - 0.6 || r.right > br.right + 0.6)) fails.push(`${what} leaves the body column`);
        if (r.bottom > footTop + 0.6) fails.push(`${what} reaches the footer`);
      });
      for (let i = 0; i < lanes.length; i++) for (let j = i + 1; j < lanes.length; j++) {
        const a = rect(lanes[i]), b = rect(lanes[j]);
        if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.6 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > -10 + 0.6) fails.push(`lanes ${lanes[i].dataset.lcsLabel} and ${lanes[j].dataset.lcsLabel} are closer than 10 px`);
      }
      // the pointers: one per lane; anchor === the stamp, inside the figure, on the lane's side; ring on the anchor; line from the ring edge to the lane's near-edge midpoint
      const stage = root.querySelector('[data-lcs-labelstage]');
      const overlay = stage && stage.querySelector('svg[data-lcs-pointers]');
      const ptrs = overlay ? [...overlay.querySelectorAll('line[data-lcs-pointer]')] : [];
      if (ptrs.length !== lanes.length) fails.push(`${ptrs.length} pointers ≠ ${lanes.length} lanes`);
      if (overlay && overlay.getAttribute('aria-hidden') !== 'true') fails.push('the pointer overlay is not aria-hidden');
      const or = overlay ? rect(overlay) : { left: 0, top: 0 };
      const ringR = +(stage && stage.dataset.lcsRingR) || 7;
      const seg = ptrs.map((l) => ({ id: l.dataset.lcsPointer, side: l.dataset.lcsSide, ax: or.left + +l.dataset.lcsAx, ay: or.top + +l.dataset.lcsAy, lx: or.left + +l.dataset.lcsLx, ly: or.top + +l.dataset.lcsLy,
        x1: or.left + +l.getAttribute('x1'), y1: or.top + +l.getAttribute('y1'), x2: or.left + +l.getAttribute('x2'), y2: or.top + +l.getAttribute('y2') }));
      const distPS = (px, py, s) => { const dx = s.lx - s.ax, dy = s.ly - s.ay; const t = Math.max(0, Math.min(1, ((px - s.ax) * dx + (py - s.ay) * dy) / (dx * dx + dy * dy))); return Math.hypot(px - (s.ax + t * dx), py - (s.ay + t * dy)); };
      const cross = (a, b) => { const d = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x); const A = { x: a.ax, y: a.ay }, B = { x: a.lx, y: a.ly }, C = { x: b.ax, y: b.ay }, D = { x: b.lx, y: b.ly }; return d(A, B, C) * d(A, B, D) < 0 && d(C, D, A) * d(C, D, B) < 0; };
      seg.forEach((s) => {
        const what = `pointer ${s.id}`;
        const a = anchors[s.id];
        if (!a) { fails.push(`${what}: no stamped anchor`); return; }
        if (Math.hypot(s.ax - (or.left + a.x), s.ay - (or.top + a.y)) > 2) fails.push(`${what}: anchor end sits off the stamped anchor`);
        if (a.side !== s.side) fails.push(`${what}: side ${s.side} ≠ the stamped side ${a.side}`);
        if (fr && (s.ax < fr.left || s.ax > fr.right || s.ay < fr.top || s.ay > fr.bottom)) fails.push(`${what}: anchor outside the figure box`);
        if (s.side === 'L' && s.ax > midX + 0.6) fails.push(`${what}: an L lane from an anchor right of the midline (the leader crosses the figure)`);
        if (s.side === 'R' && s.ax < midX - 0.6) fails.push(`${what}: an R lane from an anchor left of the midline (the leader crosses the figure)`);
        const ring = overlay.querySelector(`circle[data-lcs-anchor-ring="${s.id}"]`);
        if (!ring) fails.push(`${what}: no ring`);
        else {
          if (Math.hypot(or.left + +ring.getAttribute('cx') - s.ax, or.top + +ring.getAttribute('cy') - s.ay) > 0.6) fails.push(`${what}: ring off the anchor`);
          if (+ring.getAttribute('r') !== ringR || (ring.getAttribute('fill') || 'none') !== 'none' || (ring.getAttribute('stroke') || '').toUpperCase() !== '#F2784B') fails.push(`${what}: not a hollow coral ring r ${ringR}`);
        }
        const d1 = Math.hypot(s.x1 - s.ax, s.y1 - s.ay);
        if (Math.abs(d1 - (ringR + 1.5)) > 1) fails.push(`${what}: the line starts ${d1.toFixed(1)} px from the anchor (want the ring's edge, ${ringR + 1.5})`);
        if (Math.hypot(s.x2 - s.lx, s.y2 - s.ly) > 0.6) fails.push(`${what}: the drawn line ends off the stamped lane end`);
        const ln = lanes.find((l) => l.dataset.lcsLabel === s.id);
        if (!ln) fails.push(`${what}: no lane`);
        else {
          const r = rect(ln), side = ln.dataset.lcsSide;
          if (side !== s.side) fails.push(`${what}: lane side ${side} ≠ pointer side ${s.side}`);
          const ex = side === 'L' ? r.right : r.left, ey = (r.top + r.bottom) / 2;
          if (Math.hypot(s.lx - ex, s.ly - ey) > 1.5) fails.push(`${what}: lane end sits ${Math.round(Math.hypot(s.lx - ex, s.ly - ey))} px off the lane's near-edge midpoint`);
        }
        for (const o of seg) {
          if (o.id === s.id) continue;
          const d = distPS(o.ax, o.ay, s);
          if (d < 16) fails.push(`${what} passes the ${o.id} ring (${d.toFixed(1)} px < 16)`);
        }
        for (const w of bankWords) { const wr = rect(w); const nx = Math.max(wr.left, Math.min(s.lx, wr.right)), ny = Math.max(wr.top, Math.min(s.ly, wr.bottom)); if (Math.hypot(s.lx - nx, s.ly - ny) < 20) fails.push(`${what}: a bank word within 20 px of its lane end`); }
      });
      for (let i = 0; i < seg.length; i++) for (let j = i + 1; j < seg.length; j++) if (cross(seg[i], seg[j])) fails.push(`pointers ${seg[i].id} and ${seg[j].id} cross`);
      // the bank sits above the stage; everything above the footer and inside the body column
      const banner = root.querySelector('[data-lcs-bank-banner]');
      if (!banner) fails.push('no word bank');
      else if (stage && rect(banner).bottom > rect(stage).top + 0.6) fails.push('the bank overlaps the stage');
      if (stage) { const sr = rect(stage); if (sr.bottom > footTop + 0.6) fails.push('the stage reaches the footer'); if (br && (sr.left < br.left - 0.6 || sr.right > br.right + 0.6)) fails.push('the stage leaves the body column'); }
      return fails;
    });
  },
};

module.exports = withFixedTheme(TYPE, 'body parts');
