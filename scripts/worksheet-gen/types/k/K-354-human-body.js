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
 *
 * PHASE 2 (2026-09-21) — the ADDITIVE `layout` knob (design §3; record
 * _work/K-354-faces.md): 'count' K-360 · 'color' K-361 · 'write' G1-356 ·
 * 'missing' K-362 · 'pairs' K-363. The base's three configs carry no `layout`,
 * so `_buildWith` dispatches to `_buildFace` ONLY when the resolved config
 * carries one and the base path is byte-identical; a face root stamps
 * data-lcs-layout + data-lcs-locale and verify() hands it to _verifyFace
 * (node loads the locale bank for the literal cross-check, the browser
 * re-derives everything from the stamps + geometry). Each face is documented
 * at its builder below.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { withFixedTheme } = require('../_shared/fixed-theme.js');
const C4 = require('../../templates/components-b4.js');
const { bodyFigure, ANCHORS, ANCHOR_IDS, LABEL_MIN_H, MAX_H, MARKER_MIN_GAP, REGIONS, FEATURES, anchorUnit } = require('../../primitives/body-figure.js');
const tokens = require('../../primitives/_tokens.js');
const FACTS = require('../../data/b4/body-facts.json');
const { fileUri } = require('../../image-cache/resolve.js');
const { COLOR_WORDS } = require('../../data/color-words.js');
const { SWATCH } = require('../../templates/components-b2.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');

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
/* ---- the faces (Phase 2) */
const FACE_LAYOUTS = ['count', 'color', 'write', 'missing', 'pairs'];
const FACE_GAP = 12;                      // figure <-> its neighbour column
const FI_BODY = 677;                      // the 4-line fi title chrome (README ruling)
const COUNT_GRID_GAP = 12;                // F1 card gap (design)
const CARDGRID_GAP = 14;                  // .ws-cardgrid gap (page.css) — F4
const PAIR_COL_GAP = 13, PAIR_ROW_GAP = 12;
const COLOR_CLASSES = ['hair', 'head', 'arm', 'hand', 'leg', 'foot'];   // the shirt (torso) and the neck are never in the legend
const COLOR_MIN_PX = 24;                  // F2: one crayon stroke (design §3)
const COLOR_FIGURE_MIN = 630;             // F2: the stage fills the body (ruling 2026-09-21: 540 left 226 px of paper; slack <= 180)
const COLOR_SWATCH_MIN = 36, COLOR_WORD_MIN = 22, COLOR_ROW_MIN = 96;   // a colouring key a K child reads across the room
const FACE_SLACK_MAX = 180;               // the one-line-chrome slack rule the b4 families gate on
const EXCLUDED_PICS = Object.keys(FACTS.excluded || {});   // shoulder neck thumb chin tongue — never drawn on ANY face (the ruling extends the design's chip exclusion)
const OMIT_MIN_PX = 14;                   // F4: an omitted class is legible (design §3)
const NEVER_PAIRS = ['finger', 'toe', 'hair', 'thumb', 'chin', 'tongue'];
const SINGLE_TOKEN = /^[\p{L}][\p{L}'’-]*$/u;
const letterCount = (w) => [...w.replace(/['’-]/g, '')].length;   // a digraph is two boxes, ß / œ one
/** F4: the drawn element that DEPICTS a chip id (a distractor must be present on the figure it sits beside). */
const DEPICTS = { eye: 'eye', ear: 'ear-X', nose: 'nose', mouth: 'mouth', hair: 'hair', head: 'head', arm: 'arm-X', elbow: 'arm-X', hand: 'hand-X', finger: 'hand-X', leg: 'leg-X', knee: 'leg-X', foot: 'foot-X', toe: 'foot-X' };

function literal(obj, key, what, loc) {
  const v = obj && obj[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: ${loc} has no ${what}.${key} (refuse, never pad)`);
  if (v.includes('{')) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" carries a slot (whole literals only)`);
  if (/\d/.test(v)) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" prints a digit`);
  return v;
}

/**
 * The browser half of the face verify (serialised into page.evaluate; self-contained —
 * no closure over the module). `data` = { layout, loc, facts, bank, colorWords, swatch,
 * depicts, regions, features, refused, writePool, colorMin, omitMin }.
 */
function faceVerify(data) {
  const fails = [];
  const { layout, loc, facts, bank } = data;
  const root = document.querySelector('[data-ws-content][data-lcs-type="human-body"]');
  if (!root) return ['no human-body root'];
  if (root.dataset.lcsLayout !== layout) return [`root stamps layout "${root.dataset.lcsLayout}" ≠ "${layout}"`];
  const rect = (el) => el.getBoundingClientRect();
  const body = document.querySelector('[data-lcs-body]');
  const br = body ? rect(body) : null;
  const foot = document.querySelector('.ws-foot'), footTop = foot ? rect(foot).top : Infinity;
  const rr = rect(root);
  const S = root.dataset;
  const inside = (r, what) => {
    if (br && (r.left < br.left - 0.6 || r.right > br.right + 0.6)) fails.push(`${what} leaves the body column`);
    if (r.bottom > footTop + 0.6) fails.push(`${what} reaches the footer`);
  };
  const stem = (im) => { const parts = decodeURIComponent(im.src).split('/'); return parts[parts.length - 1].replace(/@\dx\.webp$/, '').replace(/\.\w+$/, ''); };
  const pic = (im, what, minPx, wantStem) => {
    if (!im) { fails.push(`${what}: no picture`); return; }
    if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
    if (im.getAttribute('alt')) fails.push(`${what}: alt names the picture`);
    const r = rect(im);
    if (Math.min(r.width, r.height) < minPx - 0.6) fails.push(`${what}: picture ${Math.round(Math.min(r.width, r.height))} px < ${minPx}`);
    if (wantStem && stem(im) !== wantStem) fails.push(`${what}: picture "${stem(im)}" ≠ "${wantStem}"`);
  };
  const textOf = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim();
  root.querySelectorAll('img').forEach((im) => { if ((data.excludedPics || []).includes(stem(im))) fails.push(`the excluded picture "${stem(im)}" is drawn (never on any face)`); });
  if ((root.textContent || '').includes('{')) fails.push('a `{` slot is printed in the body');
  root.querySelectorAll('[data-lcs-answer]').forEach((el) => { if (el.getAttribute('data-lcs-answer') !== '') fails.push(`an answer value "${el.getAttribute('data-lcs-answer')}" is stamped`); });
  if (root.querySelector('.ws-answerbox')) fails.push('an answerBox on an open page');
  if (root.querySelector('[data-lcs-anchor-ring], [data-lcs-pointers]')) fails.push('label rings / leaders on a face');
  let lowest = 0; root.querySelectorAll('*').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && r.height && r.bottom > lowest) lowest = r.bottom; });
  if (lowest > footTop + 0.6) fails.push(`content reaches ${Math.round(lowest)} against the footer at ${Math.round(footTop)}`);
  if (br && (rr.left < br.left - 0.6 || rr.right > br.right + 0.6)) fails.push('the face leaves the body column');
  // every figure on the page: === its stamp, >= 300, teal 3 / 2.5 / 1.5 outlines, no text unless a marker
  const figs = [...root.querySelectorAll('svg[data-lcs-body]')];
  if (!figs.length) fails.push('no body figure');
  const figInfo = figs.map((fig) => {
    const wrap = fig.closest('[data-lcs-figure]');
    const h = +fig.getAttribute('data-lcs-body-h'), fr = rect(fig);
    if (!wrap || +wrap.getAttribute('data-lcs-body-h') !== h) fails.push('a figure without its data-lcs-figure wrapper stamp');
    if (Math.abs(fr.height - h) > 1) fails.push(`figure renders ${Math.round(fr.height)} px high ≠ ${h}`);
    if (h < 300) fails.push(`figure ${h} px < 300`);
    const scale = +fig.getAttribute('data-lcs-scale') || (h / 560);
    fig.querySelectorAll('[data-lcs-region] path, [data-lcs-region] rect, [data-lcs-region] ellipse, [data-lcs-region] circle, [data-lcs-feature] path').forEach((el) => {
      const st = el.getAttribute('stroke'), sw = parseFloat(el.getAttribute('stroke-width') || '0');
      if (!st) return;
      if (st.toUpperCase() !== '#146B5E') fails.push(`a figure outline is ${st}, not teal`);
      const px = sw * scale;
      if (![3, 2.5, 1.5].some((w) => Math.abs(px - w) < 0.2)) fails.push(`a figure stroke renders ${px.toFixed(2)} px (want 3 / 2.5 / 1.5)`);
    });
    fig.querySelectorAll('text').forEach((t) => { if (!t.closest('[data-lcs-marker]')) fails.push('SVG text on the figure outside a marker'); });
    inside(fr, 'the figure');
    return { fig, h, fr, hidden: fig.getAttribute('data-lcs-hidden'), regions: fig.querySelectorAll('[data-lcs-region]').length, markers: fig.querySelectorAll('[data-lcs-marker]').length, fill: fig.getAttribute('data-lcs-body-fill') };
  });
  const digitsOutside = (allowSel) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n; while ((n = walker.nextNode())) { if (/\d/.test(n.nodeValue) && !(allowSel && n.parentElement && n.parentElement.closest(allowSel))) fails.push(`a digit is printed outside ${allowSel || 'nothing'}: "${n.nodeValue.trim().slice(0, 12)}"`); }
    figs.forEach((f) => f.querySelectorAll('text').forEach((t) => { if (/\d/.test(t.textContent) && !(allowSel && t.closest(allowSel))) fails.push('a digit on the figure'); }));
  };
  /** SPARSE: the CARDS (never the grid box — a stretched grid with fixed rows passes a box test) span the body top to bottom. */
  const fills = (what, els) => { if (!br || !els.length) return; const top = Math.min(...els.map((e) => rect(e).top)), bottom = Math.max(...els.map((e) => rect(e).bottom)); if (Math.abs(top - br.top) > 1) fails.push(`${what} sit ${(top - br.top).toFixed(1)} px under the body top (not top-anchored) — sparse`); if (Math.abs(bottom - br.bottom) > 1.5) fails.push(`${what} end ${(br.bottom - bottom).toFixed(1)} px above the body bottom (does not fill) — sparse`); };
  const topAnchored = (what, el) => { const r = rect(el); if (br && Math.abs(r.top - br.top) > 1) fails.push(`${what} sits ${(r.top - br.top).toFixed(1)} px under the body top (not top-anchored) — sparse`); };

  /* ---------------- F1 count ---------------- */
  if (layout === 'count') {
    const cards = [...root.querySelectorAll('[data-lcs-fact]')];
    const want = +S.lcsCards, pic0 = +S.lcsPic, box = +S.lcsBox, cardMin = +S.lcsCardMin;
    if (cards.length !== want) fails.push(`${cards.length} count cards ≠ ${want}`);
    const mix = {}; (S.lcsMix || '').split(',').forEach((kv) => { const [c, n] = kv.split(':'); mix[c] = +n; });
    const got = {}, cues = new Set(), parts = new Set();
    cards.forEach((c, i) => {
      const id = c.dataset.lcsFact, count = +c.dataset.lcsCount, what = `card ${i + 1} (${id})`;
      const fact = facts.parts[id] ? { count: facts.parts[id].count, cue: facts.parts[id].cue, part: id } : (facts.facts.find((x) => x.id === id) || null);
      if (!fact) { fails.push(`${what}: unknown fact`); return; }
      if (fact.count !== count) fails.push(`${what}: stamps count ${count} ≠ the fact ${fact.count}`);
      if (fact.part === 'toe' && facts.parts.toe && facts.parts.toe.countFace === false && count === 10) fails.push(`${what}: toe on a count card (countFace false)`);
      if (data.refused.includes(fact.part) || data.refused.includes(id)) fails.push(`${what}: ${loc} refuses ${id} on this face`);
      got[count] = (got[count] || 0) + 1;
      if (parts.has(fact.part)) fails.push(`${what}: part ${fact.part} on two cards`); parts.add(fact.part);
      const im = c.querySelector('img[data-lcs-cue]');
      const imgs = c.querySelectorAll('img');
      if (imgs.length !== 1) fails.push(`${what}: ${imgs.length} pictures`);
      pic(im, what, Math.max(64, pic0), fact.cue);
      if (im) { if (cues.has(stem(im))) fails.push(`${what}: cue "${stem(im)}" shown twice`); cues.add(stem(im)); }
      const lab = c.querySelector('[data-lcs-fact-label]');
      if (!lab) fails.push(`${what}: no fact label`);
      else {
        if (textOf(lab) !== bank.factLabels[id]) fails.push(`${what}: label "${textOf(lab)}" ≠ factLabels.${id} "${bank.factLabels[id]}"`);
        if (lab.scrollWidth > lab.clientWidth + 0.6) fails.push(`${what}: the label is clipped`);
        if (Math.round(lab.scrollHeight / parseFloat(getComputedStyle(lab).lineHeight)) > 2) fails.push(`${what}: the label runs to ${Math.round(lab.scrollHeight / parseFloat(getComputedStyle(lab).lineHeight))} lines (2-line reserve)`);
        if (parseFloat(getComputedStyle(lab).fontSize) < 18 - 0.01) fails.push(`${what}: label under 18 px`);
      }
      const bx = c.querySelector('.ws-blankbox[data-lcs-answer]');
      if (!bx) fails.push(`${what}: no numeral box`);
      else { const r = rect(bx); if (r.height < Math.max(56, box) - 0.6 || r.width < 68 - 0.6) fails.push(`${what}: box ${Math.round(r.width)}×${Math.round(r.height)} < 68×${Math.max(56, box)}`); if (textOf(bx)) fails.push(`${what}: the box prints "${textOf(bx)}"`); }
      const badge = c.querySelector('.ws-card-badge');
      if (!badge || textOf(badge) !== String(i + 1)) fails.push(`${what}: badge "${badge && textOf(badge)}" ≠ ${i + 1}`);
      const r = rect(c); if (r.height < cardMin - 0.6) fails.push(`${what}: ${Math.round(r.height)} px high < ${cardMin}`); inside(r, what);
    });
    for (const c of Object.keys(mix)) if (got[c] !== mix[c]) fails.push(`count ${c}: ${got[c] || 0} cards ≠ mix ${mix[c]}`);
    for (const c of Object.keys(got)) if (!mix[c]) fails.push(`count ${c} is not in the mix`);
    if (Object.keys(got).length < Math.min(3, Object.keys(mix).length)) fails.push(`${Object.keys(got).length} distinct counts on the page`);
    digitsOutside('.ws-card-badge');
    if (root.querySelector('[data-lcs-bank-banner]')) fails.push('a word bank on the count face');
    if (!root.querySelector('[data-lcs-countgrid]')) fails.push('no count grid'); else fills('the count cards', cards);
    figInfo.forEach((f) => { if (f.h !== +S.lcsFigureH) fails.push(`figure ${f.h} ≠ stamp ${S.lcsFigureH}`); if (f.regions !== 12 || f.hidden || f.markers) fails.push(`figure regions ${f.regions} hidden ${f.hidden} markers ${f.markers}`); });
  }

  /* ---------------- F2 color ---------------- */
  if (layout === 'color') {
    const rows = [...root.querySelectorAll('[data-lcs-legend]')];
    const n = +S.lcsLegend, rowH = +S.lcsRowH, wordPx = +S.lcsWordPx;
    if (rows.length !== n) fails.push(`${rows.length} legend rows ≠ ${n}`);
    const ids = rows.map((r) => r.dataset.lcsLegend), colors = rows.map((r) => r.dataset.lcsColor);
    if (new Set(ids).size !== ids.length) fails.push('a legend id repeats');
    if (new Set(colors).size !== colors.length) fails.push('a legend colour repeats');
    const pool = (S.lcsRegionPool || '').split(',');
    const fig = figInfo[0];
    rows.forEach((row, i) => {
      const id = ids[i], key = colors[i], what = `legend row ${i + 1} (${id})`;
      if (!pool.includes(id)) fails.push(`${what}: not in the region pool`);
      if (data.refused.includes(id)) fails.push(`${what}: ${loc} refuses ${id} on this face`);
      const sw = row.querySelector('[data-lcs-swatch] rect');
      if (!sw || (sw.getAttribute('fill') || '').toUpperCase() !== String(data.swatch[key] || '').toUpperCase()) fails.push(`${what}: swatch fill ${sw && sw.getAttribute('fill')} ≠ ${data.swatch[key]}`);
      if (sw && Math.min(rect(sw).width, rect(sw).height) < +S.lcsSwatch - 1.5) fails.push(`${what}: swatch ${Math.round(rect(sw).width)} px < ${S.lcsSwatch}`);
      const tb = row.querySelector('[data-lcs-legend-text]');
      if (tb && rect(tb).height > rect(row).height - 4) fails.push(`${what}: the legend text (${Math.round(rect(tb).height)} px) outgrows its ${Math.round(rect(row).height)} px row`);
      const cw = row.querySelector('[data-lcs-colorword]'), pw = row.querySelector('[data-lcs-partword]');
      if (!cw || textOf(cw) !== data.colorWords[key]) fails.push(`${what}: colour word "${cw && textOf(cw)}" ≠ "${data.colorWords[key]}"`);
      const wantPart = facts.parts[id] && facts.parts[id].count === 2 ? bank.plural[id] : bank.partWords[id];
      if (!pw || textOf(pw) !== wantPart) fails.push(`${what}: part word "${pw && textOf(pw)}" ≠ ${facts.parts[id] && facts.parts[id].count === 2 ? 'plural' : 'partWords'}.${id} "${wantPart}"`);
      if (!row.querySelector('[data-lcs-arrow]')) fails.push(`${what}: no arrow glyph`);
      for (const el of [cw, pw]) if (el) { if (el.scrollWidth > el.clientWidth + 0.6) fails.push(`${what}: "${textOf(el)}" is clipped`); if (parseFloat(getComputedStyle(el).fontSize) < Math.max(18, wordPx) - 0.01) fails.push(`${what}: word under ${Math.max(18, wordPx)} px`); }
      if (row.scrollWidth > row.clientWidth + 0.6) fails.push(`${what}: the row overflows`);
      const r = rect(row); if (r.height < Math.max(48, rowH) - 0.6) fails.push(`${what}: ${Math.round(r.height)} px high < ${Math.max(48, rowH)}`); inside(r, what);
      if (fig) { const sides = ['arm', 'hand', 'leg', 'foot'].includes(id) ? ['-L', '-R'] : ['']; for (const s of sides) if (!fig.fig.querySelector(`[data-lcs-region="${id}${s}"]`)) fails.push(`${what}: region ${id}${s} is not drawn`); }
    });
    if (fig) {
      if (fig.h !== +S.lcsFigureH) fails.push(`figure ${fig.h} ≠ stamp ${S.lcsFigureH}`);
      if (fig.regions !== 12 || fig.hidden || fig.markers) fails.push(`figure regions ${fig.regions} hidden ${fig.hidden} markers ${fig.markers}`);
      if (fig.fill !== 'white') fails.push(`figure fill "${fig.fill}" (the colouring face is white)`);
      fig.fig.querySelectorAll('[data-lcs-region] [stroke]').forEach((el) => { const f = (el.getAttribute('fill') || '').toUpperCase(); if (f !== 'NONE' && f !== '#FFFFFF') fails.push(`region ${el.closest('[data-lcs-region]').dataset.lcsRegion} is pre-filled ${f} (not white)`); });
    }
    if (root.querySelector('img')) fails.push('an <img> on the colouring face');
    digitsOutside(null);
    topAnchored('the colouring stage', root);
    if (rr.height < +S.lcsFigureH - 0.6) fails.push(`stage ${Math.round(rr.height)} < the figure ${S.lcsFigureH} — sparse`);
    if (rr.height < data.colorStageMin - 0.6) fails.push(`stage ${Math.round(rr.height)} < ${data.colorStageMin} — sparse`);
    if (br && br.bottom - rr.bottom > data.slackMax) fails.push(`${(br.bottom - rr.bottom).toFixed(1)} px of paper under the colouring stage (> ${data.slackMax}) — sparse`);
    const col = root.querySelector('[data-lcs-legend-column]');
    if (col && fig) {
      const c = rect(col); if (Math.abs(c.height - fig.h) > 1) fails.push(`legend column ${Math.round(c.height)} ≠ the figure ${fig.h}`);
      const first = rows[0] && rect(rows[0]), last = rows[rows.length - 1] && rect(rows[rows.length - 1]);
      if (first && last && (Math.abs(first.top - c.top) > 1 || Math.abs(c.bottom - last.bottom) > 1)) fails.push('legend rows do not span the figure (the rows share the stage height)');
      const hs = rows.map((r) => rect(r).height); if (Math.max(...hs) - Math.min(...hs) > 1.5) fails.push('legend rows are not equal in height');
    }
  }

  /* ---------------- F3 write ---------------- */
  if (layout === 'write') {
    const labels = +S.lcsLabels, box = +S.lcsBox, floor = +S.lcsFloor, rowH = +S.lcsRowH, rowGap = +S.lcsRowGap, markerMin = +S.lcsMarkerMin, maxLetters = +S.lcsMaxLetters, faceMax = +S.lcsFaceMax, leadMin = +S.lcsLeadMin;
    const parts = (S.lcsParts || '').split(',').filter(Boolean);
    const fig = figInfo[0];
    const markers = fig ? [...fig.fig.querySelectorAll('[data-lcs-marker]')] : [];
    if (markers.length !== labels) fails.push(`${markers.length} markers ≠ ${labels}`);
    const ns = markers.map((m) => +m.dataset.lcsN).sort((a, b) => a - b);
    if (ns.join() !== Array.from({ length: labels }, (_, i) => i + 1).join()) fails.push(`marker numerals ${ns.join()} ≠ 1..${labels}`);
    const centres = markers.map((m) => { const c = m.querySelector('circle'); const r = rect(c); return { id: m.dataset.lcsMarker, n: +m.dataset.lcsN, x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2, r: r.width / 2, text: textOf(m.querySelector('text')) }; });
    for (let i = 0; i < centres.length; i++) {
      if (centres[i].text !== String(centres[i].n)) fails.push(`marker ${centres[i].id} prints "${centres[i].text}" ≠ ${centres[i].n}`);
      if (centres[i].r < 12.5) fails.push(`marker ${centres[i].id} r ${centres[i].r.toFixed(1)} < 13`);
      for (let j = i + 1; j < centres.length; j++) { const d = Math.hypot(centres[i].x - centres[j].x, centres[i].y - centres[j].y); if (d < markerMin - 0.6) fails.push(`markers ${centres[i].id} and ${centres[j].id} are ${d.toFixed(1)} px apart (< ${markerMin})`); }
    }
    const byY = centres.slice().sort((a, b) => a.y - b.y || a.x - b.x).map((c) => c.n);
    if (byY.join() !== ns.join()) fails.push(`marker numerals do not run top-to-bottom (${byY.join()})`);
    if (centres.slice().sort((a, b) => a.n - b.n).map((c) => c.id).join() !== parts.join()) fails.push(`stamped parts ${parts.join()} ≠ the markers in numeral order`);
    const rows = [...root.querySelectorAll('[data-lcs-spell]')];
    if (rows.length !== labels) fails.push(`${rows.length} rows ≠ ${labels}`);
    const seenW = new Set();
    rows.forEach((row, i) => {
      const id = row.dataset.lcsSpell, n = +row.dataset.lcsN, what = `row ${n} (${id})`;
      if (n !== i + 1) fails.push(`${what}: rows are not in numeral order`);
      if (parts[i] !== id) fails.push(`${what}: ≠ stamped part ${parts[i]}`);
      const word = String(bank.partWords[id] || '').normalize('NFC');
      if (!word) { fails.push(`${what}: no ${loc} part word`); return; }
      const len = [...word.replace(/['’-]/g, '')].length;
      if (!/^[\p{L}][\p{L}'’-]*$/u.test(word) || len > maxLetters) fails.push(`${what}: "${word}" is not a single token of <= ${maxLetters} letters`);
      if (!data.writePool.includes(id)) fails.push(`${what}: ${id} is outside the ${loc} eligible pool`);
      if (data.refused.includes(id)) fails.push(`${what}: ${loc} refuses ${id} on this face`);
      const k = word.toLocaleLowerCase(loc); if (seenW.has(k)) fails.push(`${what}: word "${word}" twice`); seenW.add(k);
      const lb = row.querySelector('svg[data-lcs-letterboxes]');
      if (!lb) fails.push(`${what}: no letter boxes`);
      else {
        if (+lb.getAttribute('data-lcs-letterboxes') !== len) fails.push(`${what}: ${lb.getAttribute('data-lcs-letterboxes')} boxes ≠ ${len} letters`);
        const rects = lb.querySelectorAll('rect');
        if (rects.length !== len) fails.push(`${what}: ${rects.length} box rects ≠ ${len}`);
        rects.forEach((rc) => { const r = rect(rc); if (Math.min(r.width, r.height) < Math.max(floor, box) - 0.6) fails.push(`${what}: a letter box is ${Math.round(Math.min(r.width, r.height))} px < ${Math.max(floor, box)}`); });
      }
      const chip = row.querySelector('.ws-chip');
      if (!chip || textOf(chip) !== String(n)) fails.push(`${what}: chip prints "${chip && textOf(chip)}" ≠ ${n}`);
      else { const r = rect(chip); if (Math.min(r.width, r.height) < floor - 0.6) fails.push(`${what}: chip ${Math.round(r.width)} < ${floor}`); if (lb && rect(lb).top < r.bottom - 0.6) fails.push(`${what}: the boxes are not under the numeral`); }
      if (row.scrollWidth > row.clientWidth + 0.6) fails.push(`${what}: the row overflows`);
      const r = rect(row); if (r.height < rowH - 0.6) fails.push(`${what}: ${Math.round(r.height)} px high < ${rowH}`); inside(r, what);
      if (i > 0) { const p = rect(rows[i - 1]); const band = r.top - p.bottom; if (band > rowGap + 1) fails.push(`${what}: ${band.toFixed(1)} px of blank band above it (gap ${rowGap}) — sparse`); }
    });
    const faces = parts.filter((id) => facts.faceSet.includes(id)).length, leads = parts.filter((id) => facts.leadSet.includes(id)).length;
    if (faces > faceMax) fails.push(`${faces} face parts > faceMax ${faceMax}`);
    if (leads < leadMin) fails.push(`${leads} lead parts < leadMin ${leadMin}`);
    if (root.querySelector('img')) fails.push('an <img> on the write face');
    const banner = root.querySelector('[data-lcs-bank-banner]');
    if (S.lcsBank === '1') {
      if (!banner) fails.push('bank:1 but no bank');
      else { const bo = [...banner.querySelectorAll('[data-lcs-bank]')].map((w) => w.dataset.lcsBank); if (bo.slice().sort().join() !== parts.slice().sort().join()) fails.push('bank ids ≠ the parts'); if (bo.join() === parts.join() || bo.join() === parts.slice().reverse().join()) fails.push('the bank order equals the marker order (position leak)'); }
    } else if (banner) fails.push('a word bank on the write face (nothing to copy at d2)');
    // nothing printed but the numerals (and the d1 bank)
    const clone = root.cloneNode(true); clone.querySelectorAll('[data-lcs-bank-banner], svg').forEach((e) => e.remove());
    const txt = (clone.textContent || '').replace(/\d/g, '').trim();
    if (txt) fails.push(`text printed on the write face: "${txt.slice(0, 24)}"`);
    digitsOutside('.ws-chip[data-lcs-row-n], [data-lcs-marker]');
    if (fig) { if (fig.h !== +S.lcsFigureH) fails.push(`figure ${fig.h} ≠ stamp ${S.lcsFigureH}`); if (fig.regions !== 12 || fig.hidden) fails.push(`figure regions ${fig.regions} hidden ${fig.hidden}`); }
    const stage = root.querySelector('[data-lcs-writestage]');
    if (stage) { topAnchored('the write stage', S.lcsBank === '1' ? root : stage); const sr = rect(stage); if (sr.height < labels * rowH + (labels - 1) * rowGap - 0.6) fails.push(`stage ${Math.round(sr.height)} < the rows stack — sparse`); if (fig && Math.abs(fig.fr.top - sr.top) > 1) fails.push('the figure is not top-anchored in the stage'); const rc = root.querySelector('[data-lcs-spellrows]'); if (rc && Math.abs(rect(rc).top - sr.top) > 1) fails.push('the rows are not top-anchored in the stage'); }
  }

  /* ---------------- F4 missing ---------------- */
  if (layout === 'missing') {
    const items = [...root.querySelectorAll('[data-lcs-missing]')];
    const figures = +S.lcsFigures, chipsN = +S.lcsChips, chipPx = +S.lcsChip, picPx = +S.lcsPic;
    const pool = (S.lcsOmitPool || '').split(',');
    if (items.length !== figures) fails.push(`${items.length} items ≠ ${figures} figures`);
    const cards = [...root.querySelectorAll('.ws-card')];
    if (cards.length !== figures) fails.push(`${cards.length} cards ≠ ${figures}`);
    const hiddenSeen = new Set(), correctIdx = new Set();
    let chipSize = null;
    const groupOf = (id) => facts.confusable.find((g) => g.includes(id)) || [id];
    const depicted = (fig, id) => { const d = data.depicts[id]; if (!d) return false; if (d === 'eye') return !!fig.querySelector('[data-lcs-eye]'); if (/-X$/.test(d)) { const b = d.slice(0, -2); return !!fig.querySelector(`[data-lcs-region="${b}-L"], [data-lcs-region="${b}-R"], [data-lcs-feature="${b}-L"], [data-lcs-feature="${b}-R"]`); } return !!fig.querySelector(`[data-lcs-region="${d}"], [data-lcs-feature="${d}"]`); };
    items.forEach((it, i) => {
      const cls = it.dataset.lcsMissing, side = it.dataset.lcsMissingSide, what = `card ${i + 1} (${cls})`;
      if (!pool.includes(cls)) fails.push(`${what}: ${cls} is not in the omit pool`);
      if (hiddenSeen.has(cls)) fails.push(`${what}: ${cls} hidden on two cards`); hiddenSeen.add(cls);
      const fig = it.querySelector('svg[data-lcs-body]');
      if (!fig) { fails.push(`${what}: no figure`); return; }
      const wantHidden = new Set(cls === 'hair' ? ['hair'] : [cls + '-' + side]);
      for (const x of [...wantHidden]) { const m = /^(arm|leg)-([LR])$/.exec(x); if (m) wantHidden.add((m[1] === 'arm' ? 'hand-' : 'foot-') + m[2]); }
      const stamped = new Set((fig.getAttribute('data-lcs-hidden') || '').split(' ').filter(Boolean));
      if ([...stamped].sort().join() !== [...wantHidden].sort().join()) fails.push(`${what}: figure hides ${[...stamped].join(' ') || 'nothing'} ≠ ${[...wantHidden].join(' ')}`);
      for (const rid of data.regions) {
        const el = fig.querySelector(`[data-lcs-region="${rid}"]`);
        if (wantHidden.has(rid)) { if (el) fails.push(`${what}: hidden region ${rid} is present in the DOM`); }
        else if (!el) fails.push(`${what}: region ${rid} missing`);
      }
      for (const fid of data.features) { const el = fig.querySelector(`[data-lcs-feature="${fid}"]`); if (wantHidden.has(fid) ? !!el : !el) fails.push(`${what}: feature ${fid} ${el ? 'present' : 'missing'}`); }
      if (fig.getAttribute('data-lcs-body-fill') !== 'white') fails.push(`${what}: figure fill is not white`);
      const chips = [...it.querySelectorAll('[data-lcs-chip]')];
      if (chips.length !== chipsN) fails.push(`${what}: ${chips.length} chips ≠ ${chipsN}`);
      const ids = chips.map((c) => c.dataset.lcsChip);
      if (new Set(ids).size !== ids.length) fails.push(`${what}: a chip repeats`);
      const correct = chips.filter((c) => c.dataset.lcsCorrect === '1');
      if (correct.length !== 1) fails.push(`${what}: ${correct.length} chips marked correct`);
      else if (correct[0].dataset.lcsChip !== cls) fails.push(`${what}: the correct chip is ${correct[0].dataset.lcsChip} ≠ hidden ${cls}`);
      correctIdx.add(chips.findIndex((c) => c.dataset.lcsCorrect === '1'));
      const fence = new Set(groupOf(cls));
      chips.forEach((c, k) => {
        const id = c.dataset.lcsChip, cw = `${what} chip ${k + 1} (${id})`;
        if (!facts.chipIds.includes(id)) fails.push(`${cw}: not in chipPool`);
        if (data.refused.includes(id)) fails.push(`${cw}: ${loc} refuses ${id} on this face`);
        if (id !== cls && fence.has(id)) fails.push(`${cw}: a distractor from the target's confusable group (${[...fence].join(' ')})`);
        if (id !== cls && !depicted(fig, id)) fails.push(`${cw}: distractor ${id} is not drawn on this figure`);
        if (textOf(c)) fails.push(`${cw}: prints "${textOf(c)}"`);
        const im = c.querySelector('img'); pic(im, cw, picPx, id);
        const r = rect(c);
        if (Math.min(r.width, r.height) < chipPx - 0.6) fails.push(`${cw}: chip ${Math.round(r.width)}×${Math.round(r.height)} < ${chipPx}`);
        const sz = Math.round(r.width) + 'x' + Math.round(r.height);
        if (chipSize && sz !== chipSize) fails.push(`${cw}: chip size ${sz} ≠ ${chipSize} (chips are equal)`); chipSize = chipSize || sz;
        if (getComputedStyle(c).backgroundColor !== 'rgb(255, 255, 255)') fails.push(`${cw}: chip is not white`);
      });
      if (textOf(it)) fails.push(`${what}: text inside the item "${textOf(it).slice(0, 16)}"`);
      const card = it.closest('.ws-card');
      if (card) { const r = rect(card); if (r.height < +S.lcsFigureH + 28 - 0.6) fails.push(`${what}: card ${Math.round(r.height)} < ${+S.lcsFigureH + 28}`); inside(r, what); const badge = card.querySelector('.ws-card-badge'); if (!badge || textOf(badge) !== String(i + 1)) fails.push(`${what}: badge ≠ ${i + 1}`); }
    });
    if (items.length > 1 && correctIdx.size < 2) fails.push('the correct chip sits at the same index on every card (position leak)');
    digitsOutside('.ws-card-badge');
    if (!root.querySelector('.ws-cardgrid')) fails.push('no card grid'); else fills('the cards', cards);
    figInfo.forEach((f) => { if (f.h !== +S.lcsFigureH) fails.push(`figure ${f.h} ≠ stamp ${S.lcsFigureH}`); if (f.markers) fails.push('a marker on the missing face'); });
  }

  /* ---------------- F5 pairs ---------------- */
  if (layout === 'pairs') {
    const cards = [...root.querySelectorAll('[data-lcs-pair-card]')];
    const want = +S.lcsCards, pairsN = +S.lcsPairs, singlesN = +S.lcsSingles, picPx = +S.lcsPic, wordPx = +S.lcsWordPx, rowMin = +S.lcsRowMin;
    if (cards.length !== want) fails.push(`${cards.length} pair cards ≠ ${want}`);
    const ids = cards.map((c) => c.dataset.lcsPairCard);
    if (new Set(ids).size !== ids.length) fails.push('a pair card repeats');
    let p = 0, s = 0;
    const seen = new Set();
    cards.forEach((c, i) => {
      const id = c.dataset.lcsPairCard, flag = c.dataset.lcsPair, what = `card ${i + 1} (${id})`;
      const fact = facts.parts[id];
      if (!fact) { fails.push(`${what}: unknown part`); return; }
      if (facts.neverPairs.includes(id)) fails.push(`${what}: ${id} never sits on a pair card`);
      if (data.refused.includes(id)) fails.push(`${what}: ${loc} refuses ${id} on this face`);
      const isPair = fact.count === 2;
      if (flag !== (isPair ? '1' : '0')) fails.push(`${what}: pair stamp ${flag} ≠ the fact (count ${fact.count})`);
      if (isPair) { p++; if (!facts.pairsPool.pairs.includes(id)) fails.push(`${what}: not in pairsPool.pairs`); } else { s++; if (!facts.pairsPool.singles.includes(id)) fails.push(`${what}: not in pairsPool.singles`); }
      const w = c.querySelector('[data-lcs-pair-word]');
      if (!w) fails.push(`${what}: no word`);
      else {
        if (textOf(w) !== bank.partWords[id]) fails.push(`${what}: word "${textOf(w)}" ≠ the singular partWords.${id} "${bank.partWords[id]}"`);
        if (bank.plural[id] && textOf(w) === bank.plural[id] && bank.plural[id] !== bank.partWords[id]) fails.push(`${what}: prints the plural (the answer)`);
        if (w.scrollWidth > w.clientWidth + 0.6) fails.push(`${what}: word "${textOf(w)}" is clipped`);
        if (parseFloat(getComputedStyle(w).fontSize) < Math.max(18, wordPx) - 0.01) fails.push(`${what}: word under ${Math.max(18, wordPx)} px`);
        const k = textOf(w).toLocaleLowerCase(loc); if (seen.has(k)) fails.push(`${what}: word twice`); seen.add(k);
      }
      const imgs = c.querySelectorAll('img'); if (imgs.length !== 1) fails.push(`${what}: ${imgs.length} pictures`);
      pic(imgs[0], what, Math.max(64, picPx), fact.cue);
      if (c.querySelector('.ws-card-badge')) fails.push(`${what}: a badge numeral on a pair card`);
      const r = rect(c); if (r.height < rowMin - 0.6) fails.push(`${what}: ${Math.round(r.height)} px high < ${rowMin}`); inside(r, what);
    });
    if (p !== pairsN || s !== singlesN) fails.push(`${p} pairs / ${s} singles ≠ ${pairsN} + ${singlesN}`);
    const flags = cards.map((c) => c.dataset.lcsPair).join('');
    if (cards.length > 2 && (/^1+0+$/.test(flags) || /^0+1+$/.test(flags))) fails.push(`the cards are sorted by the answer (${flags})`);
    digitsOutside(null);
    if (!root.querySelector('[data-lcs-pairgrid]')) fails.push('no pair grid'); else fills('the pair cards', cards);
    figInfo.forEach((f) => { if (f.h !== +S.lcsFigureH) fails.push(`figure ${f.h} ≠ stamp ${S.lcsFigureH}`); if (f.regions !== 12 || f.hidden || f.markers) fails.push(`figure regions ${f.regions} hidden ${f.hidden} markers ${f.markers}`); });
  }
  return fails;
}
const FACE_VERIFY_SRC = faceVerify;

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
    if (d.layout) return this._buildFace(bankLoc, d, loc, ctx);   // Phase 2 faces (design §3); the base path below is untouched
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

  /* ================================================================ FACES (Phase 2, 2026-09-21; design §3)
   * ONE additive `layout` knob: 'count' (K-360) · 'color' (K-361) · 'write' (G1-356) ·
   * 'missing' (K-362) · 'pairs' (K-363). The base's configs carry no `layout`, so the
   * base path above is byte-identical (tools/b3-baseline.js). Every guard keys on the
   * RESOLVED config; every face root stamps data-lcs-layout + data-lcs-locale and
   * verify() hands it to _verifyFace (the base's evaluate is untouched).
   * SPARSE rule (_FACE-BRIEF nt10-D additions): a face whose stack is shorter than the
   * body is TOP-ANCHORED (color, write); a face with a card grid lets the grid FILL the
   * body (count, missing, pairs) with rows minmax(<task height>, 1fr) — the slack never
   * floats a small stage in the middle of the page.
   */
  _buildFace(bankLoc, d, loc, ctx) {
    const rng = ctx.rng;
    if (!FACE_LAYOUTS.includes(d.layout)) throw new Error(`${ID}: unknown layout "${d.layout}" (${FACE_LAYOUTS.join(' | ')})`);
    if (Array.isArray(bankLoc.refuse) && bankLoc.refuse.includes(d.layout)) throw new Error(`${ID}: ${loc} refuses the "${d.layout}" face (bank.refuse)`);
    const refused = new Set((bankLoc.refuseWords && bankLoc.refuseWords[d.layout]) || []);
    for (const id of refused) if (!ANCHOR_IDS.includes(id)) throw new Error(`${ID}: ${loc} refuseWords.${d.layout} names an unknown id "${id}"`);
    switch (d.layout) {
      case 'count': return this._buildCount(bankLoc, d, loc, rng, refused);
      case 'color': return this._buildColor(bankLoc, d, loc, rng, refused);
      case 'write': return this._buildWrite(bankLoc, d, loc, rng, refused);
      case 'missing': return this._buildMissing(bankLoc, d, loc, rng, refused);
      case 'pairs': return this._buildPairs(bankLoc, d, loc, rng, refused);
      default: throw new Error(`${ID}: unknown layout "${d.layout}"`);
    }
  },

  _faceRoot(layout, loc, stamps, inner, style) {
    const extra = Object.entries(stamps).map(([k, v]) => ` data-lcs-${k}="${String(v).replace(/"/g, '&quot;')}"`).join('');
    return `<div data-ws-content data-lcs-type="${KEY}" data-lcs-layout="${layout}" data-lcs-locale="${loc}"${extra} style="${style}">${inner}</div>`;
  },

  _figureBox(fig, figureH, extraStyle) {
    return `<div data-lcs-figure data-lcs-body-h="${figureH}" style="width:${fig.width.toFixed(2)}px;height:${figureH}px;flex:0 0 auto${extraStyle ? ';' + extraStyle : ''}">${fig.svg}</div>`;
  },

  /** F1 — How Many? (K-360): a cue picture + the locale's "how many X" literal + an EMPTY numeral box per card; the count is a fact of the child's body. */
  _buildCount(bankLoc, d, loc, rng, refused) {
    const mix = d.mix || {};
    const counts = Object.keys(mix).map(Number).sort((a, b) => a - b);
    if (!counts.length || counts.some((c) => ![1, 2, 5, 10].includes(c) || !(mix[c] >= 1))) throw new Error(`${ID}: count mix ${JSON.stringify(mix)} must map counts in {1,2,5,10} to >= 1 cards`);
    const total = counts.reduce((s, c) => s + mix[c], 0);
    if (d.cards !== total) throw new Error(`${ID}: cards ${d.cards} ≠ the mix total ${total}`);
    if (d.cols * d.rows !== d.cards) throw new Error(`${ID}: ${d.cols} x ${d.rows} ≠ ${d.cards} cards`);
    if (new Set(counts).size < 2) throw new Error(`${ID}: a count face needs >= 2 distinct counts`);
    if (!(d.pic >= 64)) throw new Error(`${ID}: cue picture ${d.pic} < 64 (K face floor)`);
    if (!(d.box >= K_FLOOR)) throw new Error(`${ID}: numeral box ${d.box} < the K floor ${K_FLOOR}`);
    if (!(d.wordPx >= 16)) throw new Error(`${ID}: wordPx ${d.wordPx} < 16`);
    if (!(d.figureH >= 300 && d.figureH <= MAX_H)) throw new Error(`${ID}: figureH ${d.figureH} outside 300..${MAX_H}`);
    const figW = d.figureH * 300 / 560;
    const gridW = BODY_W - FACE_GAP - figW;
    const cardW = (gridW - (d.cols - 1) * COUNT_GRID_GAP) / d.cols;
    if (cardW < 170) throw new Error(`${ID}: count cards ${cardW.toFixed(1)} wide < 170 (figure ${d.figureH} too wide for ${d.cols} columns)`);
    const lh = Math.round(d.wordPx * 1.22);
    const cardMin = d.pic + 6 + 2 * lh + 8 + d.box + 28;   // picture + label reserve + box + padding 24 + border 4
    if (d.rows * cardMin + (d.rows - 1) * COUNT_GRID_GAP > FI_BODY) throw new Error(`${ID}: ${d.rows} count cards of ${cardMin} exceed the ${FI_BODY} body`);
    const FL = bankLoc.factLabels;
    if (!FL) throw new Error(`${ID}: ${loc} bank has no factLabels (refuse)`);
    const pools = {};
    for (const c of counts) {
      if (c === 5) {
        pools[c] = (FACTS.facts || []).filter((x) => x.count === 5 && !refused.has(x.part) && !refused.has(x.id)).map((x) => ({ id: x.id, part: x.part, cue: x.cue, count: 5 }));
      } else {
        pools[c] = (FACTS.countPools[String(c)] || []).filter((id) => !refused.has(id)).map((id) => {
          const p = FACTS.parts[id];
          if (!p || p.count !== c) throw new Error(`${ID}: countPools[${c}] ${id} is not a count-${c} part`);
          if (!p.cue || p.countFace === false) throw new Error(`${ID}: ${id} has no countable cue picture`);
          return { id, part: id, cue: p.cue, count: c };
        });
      }
      if (pools[c].length < mix[c]) throw new Error(`${ID}: ${loc} count-${c} pool ${pools[c].length} < ${mix[c]} cards (refuse)`);
    }
    let cards = null;
    for (let t = 0; t < TRIES && !cards; t++) {
      const draw = counts.flatMap((c) => rng.sample(pools[c], mix[c]));
      const cues = new Set(draw.map((x) => x.cue)), parts = new Set(draw.map((x) => x.part));
      if (cues.size === draw.length && parts.size === draw.length) cards = rng.shuffle(draw);   // distinct cue pictures; never a (5,10) pair of one part
    }
    if (!cards) throw new Error(`${ID}: no count draw with distinct cues in ${TRIES} tries`);
    const inner = cards.map((c, i) => C4.bodyCountCard({ n: i + 1, id: c.id, src: fileUri('body parts', c.cue), label: literal(FL, c.id, 'factLabels', loc), count: c.count, pic: d.pic, boxW: 68, boxH: d.box, labelPx: d.wordPx })).join('');
    const fig = bodyFigure({ h: d.figureH, fill: 'cream' });
    const html = this._faceRoot('count', loc, { cards: d.cards, cols: d.cols, rows: d.rows, mix: counts.map((c) => c + ':' + mix[c]).join(','), pic: d.pic, box: d.box, 'figure-h': d.figureH, 'card-min': cardMin, 'word-px': d.wordPx },
      `<div style="display:flex;align-items:center;flex:0 0 ${fig.width.toFixed(2)}px;min-height:0">${this._figureBox(fig, d.figureH)}</div>` +
      `<div class="ws-cardgrid" data-lcs-countgrid style="flex:1 1 auto;min-height:0;grid-template-columns:repeat(${d.cols},minmax(0,1fr));grid-template-rows:repeat(${d.rows},minmax(${cardMin}px,1fr));gap:${COUNT_GRID_GAP}px">${inner}</div>`,
      `display:flex;gap:${FACE_GAP}px;flex:1 1 auto;min-height:0`);
    return { bodyHtml: html, meta: { layout: 'count', cards: cards.map((c) => c.id + ':' + c.count) } };
  },

  /** F2 — Colour by Legend (K-361): a legend (swatch + colour word + part word) beside a WHITE figure; the child colours the named regions. */
  _buildColor(bankLoc, d, loc, rng, refused) {
    if (!(d.legend >= 3 && d.legend <= 6)) throw new Error(`${ID}: legend ${d.legend} outside 3..6`);
    const pool = (d.regionPool || []).filter((id) => !refused.has(id));
    for (const id of d.regionPool || []) if (!COLOR_CLASSES.includes(id)) throw new Error(`${ID}: regionPool "${id}" is not a colourable class (${COLOR_CLASSES.join(' ')}; the shirt is never in the legend)`);
    if (pool.length < d.legend) throw new Error(`${ID}: ${loc} region pool ${pool.length} < legend ${d.legend} (refuse)`);
    if (!(d.swatch >= COLOR_SWATCH_MIN)) throw new Error(`${ID}: swatch ${d.swatch} < ${COLOR_SWATCH_MIN}`);
    if (!(d.wordPx >= COLOR_WORD_MIN)) throw new Error(`${ID}: wordPx ${d.wordPx} < ${COLOR_WORD_MIN}`);
    if (!(d.figureH >= 300 && d.figureH <= MAX_H)) throw new Error(`${ID}: figureH ${d.figureH} outside 300..${MAX_H}`);
    if (d.figureH < COLOR_FIGURE_MIN && !d.sparseSeam) throw new Error(`${ID}: figureH ${d.figureH} < ${COLOR_FIGURE_MIN} — the colouring stage would float over blank paper (sparse)`);   // sparseSeam = the gate's poison seam, never a shipped config
    if (d.figureH > FI_BODY) throw new Error(`${ID}: figureH ${d.figureH} > the ${FI_BODY} fi body`);
    const CW = COLOR_WORDS[loc];
    if (!CW) throw new Error(`${ID}: no colour words for ${loc} (refuse)`);
    const keys = Object.keys(SWATCH).filter((k) => CW[k]);
    if (keys.length < d.legend) throw new Error(`${ID}: ${loc} has ${keys.length} colour words < legend ${d.legend}`);
    const fig = bodyFigure({ h: d.figureH, fill: 'white' });
    for (const id of pool) for (const r of fig.regions.filter((x) => x.id.replace(/-[LR]$/, '') === id)) {
      if (r.min < COLOR_MIN_PX) throw new Error(`${ID}: region ${r.id} is ${r.min.toFixed(1)} px narrow at h ${d.figureH} < ${COLOR_MIN_PX} (one crayon stroke)`);
    }
    const rowW = Math.floor(BODY_W - FACE_GAP - fig.width);
    if (rowW < 300) throw new Error(`${ID}: legend rows ${rowW} wide < 300 beside a ${d.figureH} figure`);
    const gap = d.rowGap || 12;
    const rowH = Math.floor((d.figureH - (d.legend - 1) * gap) / d.legend);   // the rows SHARE the figure's height
    if (rowH < COLOR_ROW_MIN) throw new Error(`${ID}: ${d.legend} legend rows share ${rowH} px each < ${COLOR_ROW_MIN}`);
    const PL = bankLoc.plural, PW = bankLoc.partWords;
    if (!PL || !PW) throw new Error(`${ID}: ${loc} bank has no plural / partWords block (refuse)`);
    const ids = rng.sample(pool, d.legend);
    const colors = rng.sample(keys, d.legend);
    // the part word is the locale's PLURAL for a class the body has two of (both -L/-R regions colour) and the
    // SINGULAR for head / hair (one region; "heads" beside a one-headed figure contradicts F1's own fact)
    const partWordOf = (id) => (FACTS.parts[id].count === 2 ? literal(PL, id, 'plural', loc) : literal(PW, id, 'partWords', loc));
    const entries = ids.map((id, i) => ({ id, color: colors[i], colorHex: SWATCH[colors[i]], colorWord: CW[colors[i]], partWord: partWordOf(id) }));
    const html = this._faceRoot('color', loc, { legend: d.legend, 'figure-h': d.figureH, swatch: d.swatch, 'word-px': d.wordPx, 'row-h': rowH, 'row-w': rowW, 'region-pool': pool.join(',') },
      C4.bodyColorLegend({ entries, rowW, rowH, swatch: d.swatch, wordPx: d.wordPx, gap, h: d.figureH }) + this._figureBox(fig, d.figureH),
      `display:flex;gap:${FACE_GAP}px;align-items:flex-start;flex:0 0 auto`);
    return { bodyHtml: html, meta: { layout: 'color', legend: entries.map((e) => e.id + ':' + e.color) } };
  },

  /** The F3 eligible pool of a locale: single-token part words of <= maxLetters letters, minus refuseWords.write. */
  _writePool(bankLoc, d, loc, refused) {
    const PW = bankLoc.partWords;
    if (!PW) throw new Error(`${ID}: ${loc} bank has no partWords (refuse)`);
    return ANCHOR_IDS.filter((id) => {
      if (refused.has(id)) return false;
      const w = literal(PW, id, 'partWords', loc).normalize('NFC');
      return SINGLE_TOKEN.test(w) && letterCount(w) <= d.maxLetters;
    });
  },

  /** F3 — Write the Word (G1-356): numbered coral markers on the figure, a letter-box row per numeral; no bank at d2, no picture, nothing to copy. */
  _buildWrite(bankLoc, d, loc, rng, refused) {
    const floor = (tokens.density[this.gradeBand] || tokens.density.K).minElement;
    if (!(d.labels >= 2 && d.labels <= 8)) throw new Error(`${ID}: labels ${d.labels} outside 2..8`);
    if (!(d.faceMax >= 0 && d.faceMax <= 2)) throw new Error(`${ID}: faceMax ${d.faceMax} outside 0..2 (K-344 territory)`);
    if (!(d.leadMin >= 1 && d.leadMin <= d.labels)) throw new Error(`${ID}: leadMin ${d.leadMin} outside 1..${d.labels}`);
    if (d.boxes !== true) throw new Error(`${ID}: a write face needs boxes:true`);
    if (!(d.box >= floor)) throw new Error(`${ID}: letter box ${d.box} < the ${this.gradeBand} floor ${floor}`);
    if (!(d.gap >= 3)) throw new Error(`${ID}: letter-box gap ${d.gap} < 3`);
    if (!(d.maxLetters >= 4 && d.maxLetters <= 8)) throw new Error(`${ID}: maxLetters ${d.maxLetters} outside 4..8`);
    if (!(d.figureH >= 300 && d.figureH <= MAX_H)) throw new Error(`${ID}: figureH ${d.figureH} outside 300..${MAX_H}`);
    if (!(d.markerMin >= MARKER_MIN_GAP)) throw new Error(`${ID}: markerMin ${d.markerMin} < the primitive's ${MARKER_MIN_GAP}`);
    const chip = d.chip || 44, rowGap = d.rowGap || 12;
    const rowH = chip + 4 + d.box + 2;   // the numbered block: chip above the boxes (components-b4/human-body.js bodySpellRow)
    if (chip < floor) throw new Error(`${ID}: numeral chip ${chip} < the ${this.gradeBand} floor ${floor}`);
    if (!(rowGap >= 8)) throw new Error(`${ID}: row gap ${rowGap} < 8`);
    const figW = d.figureH * 300 / 560;
    const rowsW = d.maxLetters * d.box + (d.maxLetters - 1) * d.gap + 2;
    if (figW + FACE_GAP + rowsW > BODY_W + 0.5) throw new Error(`${ID}: figure ${figW.toFixed(1)} + rows ${rowsW} > the body ${BODY_W}`);
    const stackH = d.labels * rowH + (d.labels - 1) * rowGap;
    if (stackH > FI_BODY - (d.bank ? 70 : 0)) throw new Error(`${ID}: ${d.labels} rows of ${rowH} exceed the ${FI_BODY} body`);
    const pool = this._writePool(bankLoc, d, loc, refused);
    if (pool.length < d.labels) throw new Error(`${ID}: ${loc} eligible pool ${pool.length} < ${d.labels} labels (refuse)`);
    const PW = bankLoc.partWords;
    let picked = null;
    const markersOf = (ids, sides) => ids.map((id) => ({ id, side: sides[id], a: anchorUnit(id, sides[id]) }))
      .sort((p, q) => p.a.y - q.a.y || p.a.x - q.a.x).map((m, i) => ({ id: m.id, side: m.side, n: i + 1 }));
    for (let t = 0; t < (d.fixed ? 0 : TRIES) && !picked; t++) {
      const ids = rng.sample(pool, d.labels);
      const faces = ids.filter((id) => FACE_SET.includes(id)).length, leads = ids.filter((id) => LEAD_SET.includes(id)).length;
      if (faces > d.faceMax || leads < d.leadMin) continue;
      const seen = new Set(); let dup = false;
      for (const id of ids) { const k = PW[id].toLocaleLowerCase(loc); if (seen.has(k)) dup = true; seen.add(k); }
      if (dup) continue;
      const sides = {}; for (const id of ids) sides[id] = ANCHORS[id].L ? rng.pick(['L', 'R']) : '';
      const markers = markersOf(ids, sides);
      try { picked = { markers, fig: bodyFigure({ h: d.figureH, fill: 'cream', markers }) }; } catch (e) { if (!/markers .* apart/.test(e.message)) throw e; }
    }
    if (!picked) {
      const fb = FALLBACK[d.labels / 2];
      if (!fb) throw new Error(`${ID}: no marker set passed the spacing in ${TRIES} draws and no fallback for ${d.labels} labels`);
      for (const [id] of fb) if (!pool.includes(id)) throw new Error(`${ID}: ${loc}: no marker set passed the spacing in ${TRIES} draws and the fallback needs "${id}" outside the eligible pool (refuse)`);
      const sides = {}; for (const [id, side] of fb) sides[id] = ANCHORS[id].L ? side : '';
      const markers = markersOf(fb.map(([id]) => id), sides);
      picked = { markers, fig: bodyFigure({ h: d.figureH, fill: 'cream', markers }), fallback: true };
    }
    const rows = picked.markers.map((m) => C4.bodySpellRow({ n: m.n, id: m.id, len: letterCount(PW[m.id].normalize('NFC')), box: d.box, gap: d.gap, chip })).join('');
    const order = picked.markers.map((m) => m.id);
    let bank = '';
    if (d.bank) {
      const BW = bankLoc.bankWords;
      if (!BW) throw new Error(`${ID}: ${loc} bank has no bankWords (refuse)`);
      const words = order.map((id) => ({ id, word: literal(BW, id, 'bankWords', loc) }));
      let bo = null;
      const rev = order.slice().reverse().join();
      for (let t = 0; t < BANK_TRIES && !bo; t++) { const o = rng.shuffle(words); const k = o.map((w) => w.id).join(); if (k !== order.join() && k !== rev) bo = o; }
      if (!bo) throw new Error(`${ID}: no bank order differing from the marker order in ${BANK_TRIES} draws`);
      bank = C4.bodyLabelBank({ words: bo, wordPx: d.bankPx || 18 });
    }
    const stage = `<div data-lcs-writestage style="display:flex;gap:${FACE_GAP}px;align-items:flex-start;flex:0 0 auto">` +
      this._figureBox(picked.fig, d.figureH) +
      `<div data-lcs-spellrows style="display:flex;flex-direction:column;gap:${rowGap}px;flex:0 0 auto">${rows}</div></div>`;
    const html = this._faceRoot('write', loc, { labels: d.labels, 'face-max': d.faceMax, 'lead-min': d.leadMin, box: d.box, gap: d.gap, 'max-letters': d.maxLetters, 'figure-h': d.figureH, 'marker-min': d.markerMin,
      'row-h': rowH, 'row-gap': rowGap, chip, bank: d.bank ? 1 : 0, parts: order.join(','), floor },
      bank + stage, `display:flex;flex-direction:column;flex:0 0 auto`);
    return { bodyHtml: html, meta: { layout: 'write', parts: order, sides: picked.markers.map((m) => m.side), fallback: !!picked.fallback } };
  },

  /** F4 — What Is Missing? (K-362): four small white figures each missing ONE part class; the child circles the picture chip of the missing part (and draws it on). */
  _buildMissing(bankLoc, d, loc, rng, refused) {
    if (d.cols * d.rows !== d.figures) throw new Error(`${ID}: ${d.cols} x ${d.rows} ≠ ${d.figures} figures`);
    if (!(d.figures >= 2 && d.figures <= 4)) throw new Error(`${ID}: figures ${d.figures} outside 2..4`);
    const measured = FACTS.omitPool[String(d.figureH)];
    if (!measured) throw new Error(`${ID}: figureH ${d.figureH} has no measured omitPool (${Object.keys(FACTS.omitPool).join(' / ')})`);
    for (const id of d.omitPool || []) if (!measured.includes(id)) throw new Error(`${ID}: omitPool "${id}" is not measured >= 14 px at h ${d.figureH} (allowed ${measured.join(' ')})`);
    const pool = (d.omitPool || []).filter((id) => !refused.has(id));
    if (pool.length < d.figures) throw new Error(`${ID}: ${loc} omit pool ${pool.length} < ${d.figures} figures (refuse)`);
    if (!(d.chips >= 2 && d.chips <= 4)) throw new Error(`${ID}: chips ${d.chips} outside 2..4`);
    if (!(d.pic >= 64)) throw new Error(`${ID}: chip picture ${d.pic} < 64 (K face floor)`);
    if (!(d.chip >= d.pic + 12)) throw new Error(`${ID}: chip ${d.chip} cannot hold a ${d.pic} picture`);
    const probe = bodyFigure({ h: d.figureH, fill: 'white' });
    for (const id of pool) for (const r of probe.regions.filter((x) => x.id.replace(/-[LR]$/, '') === id)) if (r.bboxMin < OMIT_MIN_PX) throw new Error(`${ID}: ${r.id} is ${r.bboxMin.toFixed(1)} px at h ${d.figureH} < ${OMIT_MIN_PX}`);
    const cardW = (BODY_W - (d.cols - 1) * CARDGRID_GAP) / d.cols, innerW = cardW - 28;
    if (probe.width + 16 + d.chip > innerW) throw new Error(`${ID}: figure ${probe.width.toFixed(1)} + chip ${d.chip} > the card's ${innerW.toFixed(1)}`);
    if (d.rows * (d.figureH + 28) + (d.rows - 1) * CARDGRID_GAP > FI_BODY) throw new Error(`${ID}: ${d.rows} rows of ${d.figureH + 28} exceed the ${FI_BODY} body`);
    if (d.chips * d.chip + (d.chips - 1) * 16 > d.figureH) throw new Error(`${ID}: ${d.chips} chips of ${d.chip} taller than the figure`);
    const chipIds = FACTS.chipPool.map((c) => (typeof c === 'string' ? c : c.id)).filter((id) => !refused.has(id));
    const groupOf = (id) => FACTS.confusable.find((g) => g.includes(id)) || [id];
    const classes = rng.sample(pool, d.figures);
    let bil = 0;
    const cards = classes.map((cls) => {
      const side = cls === 'hair' ? '' : (bil++ % 2 ? 'R' : 'L');
      const fence = new Set(groupOf(cls));
      const dpool = chipIds.filter((id) => id !== cls && !fence.has(id));
      if (dpool.length < d.chips - 1) throw new Error(`${ID}: ${loc} distractor pool for ${cls} is ${dpool.length} < ${d.chips - 1}`);
      const chips = rng.shuffle([cls, ...rng.sample(dpool, d.chips - 1)]).map((id) => ({ id, src: fileUri('body parts', id), correct: id === cls }));
      return { cls, side, chips };
    });
    for (let t = 0; t < TRIES && cards.length > 1 && new Set(cards.map((c) => c.chips.findIndex((x) => x.correct))).size < 2; t++) cards[t % cards.length].chips = rng.shuffle(cards[t % cards.length].chips);
    if (cards.length > 1 && new Set(cards.map((c) => c.chips.findIndex((x) => x.correct))).size < 2) throw new Error(`${ID}: the correct chip sits at one index on every card`);
    const inners = cards.map((c) => C4.bodyMissingCard({ hidden: c.cls, side: c.side, figureH: d.figureH, chips: c.chips, chip: d.chip, pic: d.pic }).html);
    const html = this._faceRoot('missing', loc, { figures: d.figures, cols: d.cols, rows: d.rows, 'figure-h': d.figureH, chips: d.chips, chip: d.chip, pic: d.pic, 'omit-pool': pool.join(',') },
      cardGrid({ cards: inners, cols: d.cols, rows: d.rows, numbered: true }), `display:flex;flex-direction:column;flex:1 1 auto;min-height:0`);
    return { bodyHtml: html, meta: { layout: 'missing', hidden: cards.map((c) => c.cls + (c.side ? '-' + c.side : '')), chips: cards.map((c) => c.chips.map((x) => x.id).join('/')) } };
  },

  /** F5 — Which Come in Twos? (K-363): eight picture + SINGULAR-word cards beside the figure; the child circles every part the body has two of. */
  _buildPairs(bankLoc, d, loc, rng, refused) {
    if (d.pairs + d.singles !== d.cards || d.cols * d.rows !== d.cards) throw new Error(`${ID}: pairs ${d.pairs} + singles ${d.singles} ≠ cards ${d.cards} (${d.cols} x ${d.rows})`);
    if (!(d.pairs >= 2 && d.singles >= 2)) throw new Error(`${ID}: a pairs face needs >= 2 pairs and >= 2 singles`);
    for (const id of [...FACTS.pairsPool.pairs, ...FACTS.pairsPool.singles]) if (EXCLUDED_PICS.includes(id)) throw new Error(`${ID}: pairsPool holds ${id}, whose picture is excluded on every face`);
    if (!(d.pic >= 64)) throw new Error(`${ID}: card picture ${d.pic} < 64 (K face floor)`);
    if (!(d.wordPx >= 16)) throw new Error(`${ID}: wordPx ${d.wordPx} < 16`);
    if (!(d.figureH >= 300 && d.figureH <= MAX_H)) throw new Error(`${ID}: figureH ${d.figureH} outside 300..${MAX_H}`);
    const PP = FACTS.pairsPool;
    const pairs = PP.pairs.filter((id) => !refused.has(id) && !NEVER_PAIRS.includes(id)), singles = PP.singles.filter((id) => !refused.has(id) && !NEVER_PAIRS.includes(id));
    if (pairs.length < d.pairs || singles.length < d.singles) throw new Error(`${ID}: ${loc} pools ${pairs.length} pairs / ${singles.length} singles < ${d.pairs} + ${d.singles} (refuse)`);
    const figW = d.figureH * 300 / 560;
    const gridW = BODY_W - FACE_GAP - figW;
    const cardW = (gridW - (d.cols - 1) * PAIR_COL_GAP) / d.cols;
    if (cardW < 180) throw new Error(`${ID}: pair cards ${cardW.toFixed(1)} wide < 180`);
    const rowMin = d.pic + 6 + Math.round(d.wordPx * 1.2) + 28;
    if (d.rows * rowMin + (d.rows - 1) * PAIR_ROW_GAP > FI_BODY) throw new Error(`${ID}: ${d.rows} pair rows of ${rowMin} exceed the ${FI_BODY} body`);
    const PW = bankLoc.partWords;
    if (!PW) throw new Error(`${ID}: ${loc} bank has no partWords (refuse)`);
    const draw = [...rng.sample(pairs, d.pairs), ...rng.sample(singles, d.singles)];
    let order = null;
    for (let t = 0; t < TRIES && !order; t++) {
      const o = rng.shuffle(draw);
      const flags = o.map((id) => (FACTS.parts[id].count === 2 ? 1 : 0)).join('');
      if (!/^1+0+$/.test(flags) && !/^0+1+$/.test(flags)) order = o;   // never all the pairs first (or last)
    }
    if (!order) throw new Error(`${ID}: no shuffled card order in ${TRIES} draws`);
    const seen = new Set();
    const cards = order.map((id) => {
      const p = FACTS.parts[id];
      if (!p.cue) throw new Error(`${ID}: ${id} has no cue picture for a pair card`);
      const word = literal(PW, id, 'partWords', loc);
      const k = word.toLocaleLowerCase(loc);
      if (seen.has(k)) throw new Error(`${ID}: two pair cards print "${word}" in ${loc}`);
      seen.add(k);
      return C4.bodyPairCard({ id, src: fileUri('body parts', p.cue), word, pair: p.count === 2, pic: d.pic, wordPx: d.wordPx });
    }).join('');
    const fig = bodyFigure({ h: d.figureH, fill: 'cream' });
    const html = this._faceRoot('pairs', loc, { cards: d.cards, pairs: d.pairs, singles: d.singles, cols: d.cols, rows: d.rows, pic: d.pic, 'word-px': d.wordPx, 'figure-h': d.figureH, 'row-min': rowMin },
      `<div style="display:flex;align-items:center;flex:0 0 ${fig.width.toFixed(2)}px;min-height:0">${this._figureBox(fig, d.figureH)}</div>` +
      `<div class="ws-cardgrid" data-lcs-pairgrid style="flex:1 1 auto;min-height:0;grid-template-columns:repeat(${d.cols},minmax(0,1fr));grid-template-rows:repeat(${d.rows},minmax(${rowMin}px,1fr));gap:${PAIR_ROW_GAP}px ${PAIR_COL_GAP}px">${cards}</div>`,
      `display:flex;gap:${FACE_GAP}px;flex:1 1 auto;min-height:0`);
    return { bodyHtml: html, meta: { layout: 'pairs', cards: order.map((id) => id + ':' + (FACTS.parts[id].count === 2 ? 1 : 0)) } };
  },

  /** verify() for the five faces: node loads the locale bank (the cross-check), the browser re-derives everything from the stamps + geometry. */
  async _verifyFace(page, { layout, loc }) {
    let bankLoc;
    try { bankLoc = loadBank(BANK, loc); } catch (e) { return [`no ${loc} bank for the ${layout} face: ${e.message}`]; }
    const refused = new Set((bankLoc.refuseWords && bankLoc.refuseWords[layout]) || []);
    const data = {
      layout, loc,
      facts: { parts: FACTS.parts, facts: FACTS.facts, confusable: FACTS.confusable, omitPool: FACTS.omitPool, pairsPool: FACTS.pairsPool, countPools: FACTS.countPools,
        chipIds: FACTS.chipPool.map((c) => (typeof c === 'string' ? c : c.id)), leadSet: FACTS.leadSet, faceSet: FACTS.faceSet, neverPairs: NEVER_PAIRS },
      bank: { partWords: bankLoc.partWords || {}, plural: bankLoc.plural || {}, factLabels: bankLoc.factLabels || {}, bankWords: bankLoc.bankWords || {} },
      colorWords: COLOR_WORDS[loc] || {}, swatch: SWATCH, depicts: DEPICTS, regions: REGIONS, features: FEATURES, refused: [...refused],
      writePool: layout === 'write' ? (() => { try { return this._writePool(bankLoc, { maxLetters: 8 }, loc, refused); } catch (e) { return []; } })() : [],
      colorMin: COLOR_MIN_PX, omitMin: OMIT_MIN_PX, colorStageMin: COLOR_FIGURE_MIN, slackMax: FACE_SLACK_MAX, excludedPics: EXCLUDED_PICS,
    };
    const fails = await page.evaluate(FACE_VERIFY_SRC, data);
    // node-side floors the browser cannot measure: the F2 crayon width and the F4 omitted-class size, from the primitive's region table
    if (layout === 'color' || layout === 'missing') {
      const h = await page.evaluate(() => { const f = document.querySelector('[data-lcs-type="human-body"] svg[data-lcs-body]'); return f ? +f.getAttribute('data-lcs-body-h') : 0; });
      if (h) {
        const regs = bodyFigure({ h, fill: 'white' }).regions;
        if (layout === 'color') {
          const ids = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-legend]')].map((r) => r.dataset.lcsLegend));
          for (const id of ids) for (const r of regs.filter((x) => x.id.replace(/-[LR]$/, '') === id)) if (r.min < COLOR_MIN_PX) fails.push(`legend region ${r.id} is ${r.min.toFixed(1)} px narrow at h ${h} (< ${COLOR_MIN_PX})`);
        } else {
          const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-missing]')].map((c) => c.dataset.lcsMissing));
          for (const cls of hidden) for (const r of regs.filter((x) => x.id.replace(/-[LR]$/, '') === cls)) if (r.bboxMin < OMIT_MIN_PX) fails.push(`hidden class ${cls} is ${r.bboxMin.toFixed(1)} px at h ${h} (< ${OMIT_MIN_PX}, not in the measured omitPool)`);
        }
      }
    }
    return fails;
  },

  async verify(page) {
    const head = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-type="human-body"]'); return r ? { layout: r.dataset.lcsLayout || null, loc: r.dataset.lcsLocale || 'en' } : null; });
    if (head && head.layout) return this._verifyFace(page, head);
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

const wrapped = withFixedTheme(TYPE, 'body parts');
// tools/gen-b4var-specs.js emits every face as `{ ...base, id, slug, difficulty, i18n }` — an object spread copies OWN
// enumerable properties only, and withFixedTheme's wrapper owns just `themeAxis` + `build`; every method the wrapper's
// build / verify reach through `this` (_buildWith, _buildFace, verify, …) is hoisted here so a face spec carries them
// too (the K-356 precedent). Output unchanged (the same functions); tools/b3-baseline.js --check is the proof.
for (const k of Object.keys(TYPE)) if (!Object.prototype.hasOwnProperty.call(wrapped, k)) wrapped[k] = TYPE[k];
module.exports = wrapped;
module.exports._type = TYPE;   // the unwrapped spec (a gate seam)
