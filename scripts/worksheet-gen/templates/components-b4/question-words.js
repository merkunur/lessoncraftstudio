/**
 * components-b4/question-words.js — the G1-353 `question-words` family
 * components (design docs/worksheet-gen/b4-designs/G1-353-question-words.md
 * §2 "NEW templates/components-b4/question-words.js"; critic record
 * _work/G1-353-critic.md). Merged into the templates/components-b4.js
 * namespace; HTML + the token palette only, no new primitive (the clock is
 * primitives/clock.js, the rulings are components-b2 rulingBlock, the bins
 * are K-288's dashed lines); ground truth rides on data-lcs-* attributes; the
 * answer is never printed.
 *
 * Exports (exactly the NEW names the design file lists):
 *   markedSpan(text)
 *       `<span data-lcs-mark>` — a FLAT coralSoft bar with a 3 px coral
 *       underline, radius 4, padding 0 4, INSIDE the running sentence in the
 *       sentence's own ink (measured +8 px, +0 height). Throws on an empty string.
 *   renderMarked(text, span)
 *       the sentence html with the ONE word-bounded occurrence of `span`
 *       ((?<!\p{L})…(?!\p{L}), u) replaced by markedSpan; throws unless exactly
 *       one occurrence and the span is not the whole sentence.
 *   qwChips({kinds:[{kind, label}], px=20, h=44, pad=12, gap=12})
 *       `<div class="ws-achips" data-lcs-chips>` (justify flex-start, padding-top
 *       0, gap) of AUTO-WIDTH `.ws-achip` (Baloo 2 700 px, height h, padding 0
 *       pad, nowrap) in the caller's FIXED order — never shuffled; every chip
 *       carries the same style string (the K-288 identical-style check).
 *       Stamps data-lcs-chip=<kind> data-lcs-idx data-lcs-label; NO correct
 *       marker. Throws on < 2 or > 5 chips, duplicate kinds / labels, a label
 *       containing data-lcs-mark, or h < 44.
 *   answerRow({n, src, depicted, frame, kind, ask, name, slots, text, span, chips, picPx=56, fontPx=18, padding='5px 16px', picKind='person', pic, chipPx, chipPad, rowH=44})
 *       the base lane: `.ws-lane` with the inline padding override on grid
 *       `30px 10px ${picPx}px 12px 1fr` / rows `auto ${rowH}px` (row-gap 6,
 *       align-items center; the gap columns are EXPLICIT — `column-gap:10px
 *       12px` is invalid CSS and is dropped whole, P22); the badge and the
 *       picture span both rows; `<p data-lcs-sentence>` Nunito 800 fontPx / 1.3
 *       = renderMarked; qwChips in row 2. Stamps data-ws-content data-lcs-row
 *       data-lcs-frame data-lcs-kind data-lcs-ask data-lcs-name data-lcs-slots
 *       (json); the picture `img.ws-icon[data-lcs-pic="<theme>/<noun>"]
 *       [data-lcs-pickind=person|thing|place][data-lcs-depicted=m|f]`.
 *   qaMatch({left:[{frame, ask, text, name?, slots?}], right:[{kind, literal, src, pic, picKind?, depicted?, badge?, clock}], order, leftW=252, rightW=248, itemH=100, picPx=88, padX=20, fontPx=18, itemMax=null})   (F1)
 *       `.ws-match[data-ws-content][data-lcs-match]` padding 6 padX (inner 635):
 *       left `.ws-match-item` leftW x >= itemH (text inner 228, <= 2 lines) with
 *       a right dot; right `.ws-match-item--plain` rightW x >= itemH = picture
 *       picPx (img, or clock({h, m:0, size:picPx}) data-lcs-prim="clock") + the
 *       literal in Baloo 2 700 20 + a left dot, rendered in `order` (a
 *       derangement, stamped data-lcs-order). Stamps data-lcs-q data-lcs-ask
 *       data-lcs-frame / data-lcs-a data-lcs-kind data-lcs-literal. Throws unless
 *       `order` is a fixed-point-free permutation of the right items, or a clock
 *       size < 74 (the 9 px numeral floor). Phase 2 additions (additive): left
 *       items stamp data-lcs-name + data-lcs-slots (the node cross-check); a right
 *       img stamps data-lcs-pickind (+ data-lcs-depicted for a portrait); `badge`
 *       = n wears the K-287 countBadge on the thing's picture (a count answer); the
 *       clock svg sits in a flex:0 0 auto span (it shrank to 81 beside a wrapping
 *       literal); `itemMax` lets the items GROW from itemH to itemMax (flex:1 1
 *       auto; max-height) before the column's space-around spreads the rest — the
 *       G1-368 SPARSE precedent (stamped data-lcs-itemmax).
 *   questionFrame({n, src, depicted, frame, kind?, ask, name, slots, question, qPrefix, rest, text, span, gapW, gapH=40, fontPx=18, padding='5px 16px', answer, picPx=56})   (F2; `kind` stamps data-lcs-kind)
 *       the F2 lane: grid `30px 10px 56px 12px 1fr` / rows `auto auto` (gap 6);
 *       line 1 `<p data-lcs-question>` = esc(qPrefix) + an EMPTY `.ws-blankbox
 *       [data-lcs-gapbox]` gapW x gapH (inline-block) + the question REST; line 2
 *       `<p data-lcs-sentence>` = renderMarked. Stamps as answerRow +
 *       data-lcs-answer=<qwords literal> data-lcs-gapw. Throws if the rest still
 *       opens with the answer literal (word-bounded), or gapW < 110.
 *   qwBins({tiles:[{frame, kind, text, key}], heads:[{kind, label}], lineCount, binW, binH=350})   (F3)
 *       the K-288 sort layout cloned: shelf `.ws-card` 660 x auto (padding 10
 *       12, row-wrap, gap 10, centred) of `.ws-tile.ws-tile--word` 44 high at
 *       Baloo 20 / padding 0 12 with data-lcs-sortword data-lcs-key=<binIdx>;
 *       a flex row (gap 12, centred) of bins data-lcs-sortbin=i = `.ws-pill`
 *       head (font 20, padding 2 18, data-lcs-sorthead) over `.ws-bin` binW x
 *       binH (padding 0) holding an SVG (width AND viewBox) of lineCount dashed
 *       `grid` lines at gapY = min(58, floor((binH - 20) / (lineCount + 0.5))).
 *       binW defaults to floor(640 / heads.length) - 12 (3 heads → 201). Throws
 *       on a tile text equal to a head label, < 2 heads, or a bin with fewer
 *       lines than its tiles. Root `[data-ws-content][data-lcs-sort]`.
 *   writeRow({n, src, depicted, frame, kind?, ask, name, slots, text, span, answer, w=575, h=48, glyphH=24, fontPx=18, picPx=48})   (F4; `kind` stamps data-lcs-kind)
 *       a LANE-LESS row (measured: the lane version is 86-87 per row → 714 / 725
 *       at 8 rows > 677): grid `30px 10px ${picPx}px 12px 1fr` / rows `auto
 *       ${h}px` gap 6; line 1 `<p data-lcs-sentence>` = renderMarked; line 2 a
 *       `line-height:0` cell holding rulingBlock({rows:1, w, h, glyphH}) (the
 *       inline-SVG descender gap: 90.1 vs 86.1 without it). Stamps data-ws-content
 *       data-lcs-row data-lcs-frame data-lcs-ask data-lcs-answer=<the canonical
 *       question> (a stamp only; never printed). Throws if the sentence prints
 *       the answer, or need(answer) = glyphs x 18 + 16 > w.
 *   askScene({portrait, thing, place, time, tile=120})   (F5)
 *       `.ws-lane` (padding 12 16) with four white tiles (tile + 12) square, r 12,
 *       border 2 creamDeep, padding 4, in a centred row gap 20, each holding a
 *       `tile` px picture (data-lcs-scene-pic) or clock({h, m:0, size:tile})
 *       (numerals 14 px at 120). Stamps data-ws-content data-lcs-ask-scene.
 *       Nothing printed. Throws if a tile picture < 100 or the clock < 74.
 *   starterLines({starters:[6 labels], w=639, h=56, glyphH=26, gap=8})   (F5)
 *       `.ws-lane` (padding 10 16) holding rulingBlock({rows, w, h, glyphH,
 *       starters:{0..n-1}, gap}) in a `line-height:0` cell (the starter font
 *       from primitives/font-metrics.json via starterFontPx — the 2026-09-21
 *       rule). Stamps data-ws-content data-lcs-starters="<csv>". Throws on
 *       < 4 or > 6 starters, a duplicate, or an empty label.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const clock = require('../../primitives/clock.js');
const { rulingBlock, countBadge } = require('../components-b2.js');

const T = tokens.color;
const F = tokens.font;
const CHIP_H = 44;                 // the G1 element floor — every chip strip on this family
const CLOCK_FLOOR = 74;            // clock.js numerals = round(size x 0.115): 74 → 9 px (qa/lints.js:86 floor), 73 → 8 FAIL
const GAP_MIN = 110;               // the F2 gap box floor (design §3 F2)

function reEsc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function wordRe(word, flags = 'u') { return new RegExp('(?<!\\p{L})' + reEsc(word) + '(?!\\p{L})', flags); }
function hasWord(text, word) { return wordRe(word, 'iu').test(String(text)); }
function fold(s) { return String(s || '').trim().toLocaleLowerCase(); }
function attr(k, v) { return `${k}="${esc(v == null ? '' : String(v))}"`; }
/** The pencil space a hand-written question needs on a 48/24 ruling: glyphs x 18 + 16 (design §3 F4). */
function need(answer) { return [...String(answer)].length * 18 + 16; }

function badge(n) {
  return `<span data-lcs-badge style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;` +
    `background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:16px;line-height:1;flex:0 0 30px;grid-column:1;grid-row:1/3">${esc(n)}</span>`;
}
function sentenceP(inner, extra = '', fontPx = 18) {
  return `<p data-lcs-sentence ${extra} style="margin:0;min-width:0;font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:1.3;color:${T.ink}">${inner}</p>`;
}
function picImg({ src, pic, picKind, depicted, px }) {
  if (!src || !pic) throw new Error('question-words: a picture needs src + pic');
  if (!['person', 'thing', 'place'].includes(picKind)) throw new Error(`question-words: picKind "${picKind}"`);
  if (picKind === 'person' && !['m', 'f'].includes(depicted)) throw new Error(`question-words: a portrait needs depicted m|f (got "${depicted}")`);
  return `<img class="ws-icon" src="${src}" alt="" ${attr('data-lcs-pic', pic)} ${attr('data-lcs-pickind', picKind)}${picKind === 'person' ? ' ' + attr('data-lcs-depicted', depicted) : ''} ` +
    `style="width:${px}px;height:${px}px;flex:0 0 auto;grid-column:3;grid-row:1/3">`;
}

/* ---------- markedSpan ---------- */
function markedSpan(text) {
  if (!text || !String(text).trim()) throw new Error('markedSpan: empty text');
  return `<span data-lcs-mark style="background:${T.coralSoft};border-bottom:3px solid ${T.coral};border-radius:4px;padding:0 4px">${esc(text)}</span>`;
}

/* ---------- renderMarked ---------- */
function renderMarked(text, span) {
  const t = String(text), s = String(span);
  if (!s.trim()) throw new Error('renderMarked: empty span');
  if (t.trim() === s.trim()) throw new Error(`renderMarked: the span is the whole sentence ("${t}")`);
  const hits = t.match(wordRe(s, 'gu')) || [];
  if (hits.length !== 1) throw new Error(`renderMarked: "${s}" occurs ${hits.length} times in "${t}" (want exactly 1)`);
  const i = t.search(wordRe(s));
  return esc(t.slice(0, i)) + markedSpan(s) + esc(t.slice(i + s.length));
}

/* ---------- qwChips ---------- */
function qwChips({ kinds, px = 20, h = CHIP_H, pad = 12, gap = 12 }) {
  if (!Array.isArray(kinds) || kinds.length < 2 || kinds.length > 5) throw new Error(`qwChips: ${kinds ? kinds.length : 0} chips (2..5)`);
  if (!(h >= CHIP_H)) throw new Error(`qwChips: h ${h} < the G1 floor ${CHIP_H}`);
  const ks = kinds.map((k) => k && k.kind), ls = kinds.map((k) => k && k.label);
  if (ks.some((k) => !k) || ls.some((l) => !l || !String(l).trim())) throw new Error('qwChips: a chip without kind / label');
  if (new Set(ks).size !== ks.length) throw new Error('qwChips: a kind twice');
  if (new Set(ls.map(fold)).size !== ls.length) throw new Error('qwChips: a label twice');
  for (const l of ls) if (/data-lcs-mark/i.test(l)) throw new Error(`qwChips: the label "${l}" carries a mark`);
  const style = `height:${h}px;padding:0 ${pad}px;font-size:${px}px;white-space:nowrap;flex:0 0 auto`;
  return `<div class="ws-achips" data-lcs-chips="${kinds.length}" style="justify-content:flex-start;padding-top:0;gap:${gap}px;min-width:0">` +
    kinds.map((k, i) => `<span class="ws-achip" style="${style}" ${attr('data-lcs-chip', k.kind)} data-lcs-idx="${i}" ${attr('data-lcs-label', k.label)}>${esc(k.label)}</span>`).join('') + `</div>`;
}

/* ---------- answerRow (base) ---------- */
function answerRow({ n, src, depicted, frame, kind, ask, name, slots, text, span, chips, picPx = 56, fontPx = 18, padding = '5px 16px', picKind = 'person', pic, chipPx = 20, chipPad = 12, rowH = CHIP_H }) {
  if (!(picPx >= 44)) throw new Error(`answerRow: picPx ${picPx} < 44`);
  if (!(fontPx >= 16)) throw new Error(`answerRow: fontPx ${fontPx} < 16`);
  if (!frame || !kind || !ask || !name) throw new Error('answerRow: frame / kind / ask / name are required');
  const p = sentenceP(renderMarked(text, span), '', fontPx);
  const strip = qwChips({ kinds: chips, px: chipPx, h: rowH, pad: chipPad });
  return `<div class="ws-lane" data-ws-content data-lcs-row="${n}" ${attr('data-lcs-frame', frame)} ${attr('data-lcs-kind', kind)} ${attr('data-lcs-ask', ask)} ${attr('data-lcs-name', name)} ${attr('data-lcs-slots', JSON.stringify(slots || {}))} ` +
    `style="padding:${padding};display:grid;grid-template-columns:30px 10px ${picPx}px 12px 1fr;grid-template-rows:auto ${rowH}px;row-gap:6px;align-items:center;min-width:0">` +
    badge(n) + picImg({ src, pic, picKind, depicted, px: picPx }) +
    `<div style="min-width:0;display:flex;align-items:center;grid-column:5;grid-row:1">${p}</div>` +
    `<div style="min-width:0;grid-column:5;grid-row:2">${strip}</div></div>`;
}

/* ---------- qaMatch (F1) ---------- */
function isDerangement(order, n) {
  if (!Array.isArray(order) || order.length !== n) return false;
  const seen = new Set(order);
  if (seen.size !== n || order.some((x) => !Number.isInteger(x) || x < 0 || x >= n)) return false;
  return order.every((x, i) => x !== i);
}
function qaMatch({ left, right, order, leftW = 252, rightW = 248, itemH = 100, picPx = 88, padX = 20, fontPx = 18, itemMax = null }) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length || left.length < 2) throw new Error('qaMatch: left / right must be equal lists of >= 2');
  if (!isDerangement(order, right.length)) throw new Error('qaMatch: order is not a fixed-point-free permutation');
  if (picPx && picPx < CLOCK_FLOOR) throw new Error(`qaMatch: picPx ${picPx} < the clock floor ${CLOCK_FLOOR}`);
  const dot = (side) => `<span class="ws-match-dot ws-match-dot--${side}"></span>`;
  // itemMax (Phase 2, the SPARSE rule; the G1-368 precedent): the items GROW from itemH up to itemMax before the column's
  // space-around spreads what is left — the band between items stays under the 44 px G1 floor at every chrome
  if (itemMax != null && !(itemMax >= itemH)) throw new Error(`qaMatch: itemMax ${itemMax} < itemH ${itemH}`);
  const grow = itemMax != null ? `max-height:${itemMax}px;flex:1 1 auto;` : '';
  const L = left.map((q, i) => `<div class="ws-match-item" data-lcs-q="${i}" ${attr('data-lcs-ask', q.ask)} ${attr('data-lcs-frame', q.frame)}${q.name ? ' ' + attr('data-lcs-name', q.name) : ''}${q.slots ? ' ' + attr('data-lcs-slots', JSON.stringify(q.slots)) : ''} ` +
    `style="width:${leftW}px;min-height:${itemH}px;${grow}justify-content:flex-start;padding:6px 12px">` +
    `<span data-lcs-match-text style="font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:1.3;color:${T.ink};white-space:normal;min-width:0">${esc(q.text)}</span>${dot('right')}</div>`).join('');
  const R = order.map((j) => {
    const a = right[j];
    let picHtml;
    if (a.clock) {
      picHtml = `<span style="flex:0 0 auto;display:inline-flex;line-height:0">${clock({ h: a.clock.h, m: 0, size: picPx }).svg}</span>`;   // flex:0 0 auto: an inline svg shrinks beside a wrapping literal (measured 81 of 88)
    } else {
      if (!a.src || !a.pic) throw new Error(`qaMatch: right item ${j} needs src + pic or a clock`);
      if (a.picKind && !['person', 'thing', 'place'].includes(a.picKind)) throw new Error(`qaMatch: right item ${j} picKind "${a.picKind}"`);
      if (a.picKind === 'person' && !['m', 'f'].includes(a.depicted)) throw new Error(`qaMatch: right item ${j} is a portrait without depicted m|f`);
      const img = `<img class="ws-icon" src="${a.src}" alt="" ${attr('data-lcs-pic', a.pic)}${a.picKind ? ' ' + attr('data-lcs-pickind', a.picKind) : ''}${a.picKind === 'person' ? ' ' + attr('data-lcs-depicted', a.depicted) : ''} style="width:${picPx}px;height:${picPx}px;flex:0 0 auto">`;
      // a count answer: the thing's picture wearing the K-287 count badge (the number word is the literal beside it)
      picHtml = a.badge != null ? `<span style="position:relative;display:inline-flex;flex:0 0 auto">${img}${countBadge(a.badge)}</span>` : img;
    }
    return `<div class="ws-match-item ws-match-item--plain" data-lcs-a="${j}" ${attr('data-lcs-kind', a.kind)} ${attr('data-lcs-literal', a.literal)} ` +
      `style="width:${rightW}px;min-height:${itemH}px;${grow}padding:6px 12px;gap:8px;justify-content:flex-start">${picHtml}` +
      `<span data-lcs-match-text style="font-family:${F.display},cursive;font-weight:700;font-size:20px;line-height:1.15;color:${T.ink};white-space:normal;min-width:0">${esc(a.literal)}</span>${dot('left')}</div>`;
  }).join('');
  return `<div class="ws-match" data-ws-content data-lcs-match ${attr('data-lcs-order', order.join(','))}${itemMax != null ? ` data-lcs-itemmax="${itemMax}"` : ''} style="padding:6px ${padX}px">` +
    `<div class="ws-match-col">${L}</div><div class="ws-match-col">${R}</div></div>`;
}

/* ---------- questionFrame (F2) ---------- */
function questionFrame({ n, src, depicted, frame, kind, ask, name, slots, question, qPrefix = '', rest, text, span, gapW, gapH = 40, fontPx = 18, padding = '5px 16px', answer, picPx = 56 }) {
  if (!(gapW >= GAP_MIN)) throw new Error(`questionFrame: gapW ${gapW} < ${GAP_MIN}`);
  if (!answer || !rest) throw new Error('questionFrame: answer + rest are required');
  if (hasWord(rest.trim().split(/\s+/)[0] || '', answer) || fold(rest).startsWith(fold(answer))) throw new Error(`questionFrame: the rest "${rest}" still opens with the answer "${answer}"`);
  if (hasWord(rest, answer)) throw new Error(`questionFrame: the rest "${rest}" prints the answer "${answer}"`);
  const box = `<span class="ws-blankbox" data-lcs-gapbox style="width:${gapW}px;height:${gapH}px;display:inline-block;vertical-align:middle;margin:0 4px"></span>`;
  const q = `<p data-lcs-question style="margin:0;min-width:0;font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:1.3;color:${T.ink};white-space:nowrap">${esc(qPrefix)}${box}${esc(rest)}</p>`;
  const p = sentenceP(renderMarked(text, span), '', fontPx);
  return `<div class="ws-lane" data-ws-content data-lcs-row="${n}" ${attr('data-lcs-frame', frame)}${kind ? ' ' + attr('data-lcs-kind', kind) : ''} ${attr('data-lcs-ask', ask)} ${attr('data-lcs-name', name)} ${attr('data-lcs-slots', JSON.stringify(slots || {}))} ${attr('data-lcs-answer', answer)} data-lcs-gapw="${gapW}" ` +
    `style="padding:${padding};display:grid;grid-template-columns:30px 10px ${picPx}px 12px 1fr;grid-template-rows:auto auto;row-gap:6px;align-items:center;min-width:0">` +
    badge(n) + picImg({ src, pic: slots && slots.pic, picKind: 'person', depicted, px: picPx }) +
    `<div style="min-width:0;grid-column:5;grid-row:1">${q}</div><div style="min-width:0;grid-column:5;grid-row:2">${p}</div></div>`;
}

/* ---------- qwBins (F3) ---------- */
function qwBins({ tiles, heads, lineCount, binW, binH = 350 }) {
  if (!Array.isArray(heads) || heads.length < 2) throw new Error('qwBins: < 2 heads');
  if (!Array.isArray(tiles) || tiles.length < 2) throw new Error('qwBins: < 2 tiles');
  const headLabels = heads.map((h) => fold(h.label));
  for (const t of tiles) {
    if (!t.text || !String(t.text).trim()) throw new Error('qwBins: an empty tile');
    if (headLabels.includes(fold(t.text)) || headLabels.includes(fold(t.text) + '?')) throw new Error(`qwBins: the tile "${t.text}" equals a head label`);
    if (!Number.isInteger(t.key) || t.key < 0 || t.key >= heads.length) throw new Error(`qwBins: tile "${t.text}" key ${t.key} out of range`);
  }
  const W = binW || Math.floor(640 / heads.length) - 12;
  const shelf = `<div class="ws-card" data-lcs-shelf style="width:660px;padding:10px 12px;flex-direction:row;flex-wrap:wrap;gap:10px;justify-content:center">` +
    tiles.map((t) => `<span class="ws-tile ws-tile--word" ${attr('data-lcs-sortword', t.text)} data-lcs-key="${t.key}" ${attr('data-lcs-kind', t.kind || '')} ${attr('data-lcs-frame', t.frame || '')} ` +
      `style="height:44px;font-size:20px;padding:0 12px;font-family:${F.display},cursive;font-weight:700">${esc(t.text)}</span>`).join('') + `</div>`;
  const bins = heads.map((h, i) => {
    const load = tiles.filter((t) => t.key === i).length;
    const lc = Math.max(lineCount || 0, load);
    if (lc < load) throw new Error(`qwBins: bin ${i} has ${lc} lines for ${load} tiles`);
    const gapY = Math.min(58, Math.floor((binH - 20) / (lc + 0.5)));
    const lines = [];
    for (let k = 1; k <= lc; k++) lines.push(`<line x1="8" y1="${k * gapY}" x2="${W - 14}" y2="${k * gapY}" stroke="${T.grid}" stroke-width="1.5" stroke-dasharray="3 5"/>`);
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px" data-lcs-sortbin="${i}" ${attr('data-lcs-kind', h.kind)} data-lcs-gapy="${gapY}" data-lcs-lines="${lc}">` +
      `<span class="ws-pill" style="font-size:20px;padding:2px 18px" data-lcs-sorthead="${i}">${esc(h.label)}</span>` +
      `<div class="ws-bin" style="width:${W}px;height:${binH}px;max-width:${W}px;padding:0"><svg width="${W - 6}" height="${binH - 5}" viewBox="0 0 ${W - 6} ${binH - 5}" aria-hidden="true">${lines.join('')}</svg></div></div>`;
  }).join('');
  return `<div data-ws-content data-lcs-sort data-lcs-tiles="${tiles.length}" data-lcs-bins="${heads.length}" style="flex:1;display:flex;flex-direction:column;gap:18px;align-items:center;justify-content:flex-start;padding-top:0">` +
    shelf + `<div style="display:flex;gap:12px;justify-content:center">${bins}</div></div>`;
}

/* ---------- writeRow (F4) ---------- */
function writeRow({ n, src, depicted, frame, kind, ask, name, slots, text, span, answer, w = 575, h = 48, glyphH = 24, fontPx = 18, picPx = 48 }) {
  if (!answer) throw new Error('writeRow: answer is required');
  if (!(glyphH >= 24)) throw new Error(`writeRow: glyphH ${glyphH} < 24`);
  if (!(picPx >= 36)) throw new Error(`writeRow: picPx ${picPx} < 36`);
  if (String(text).includes(String(answer))) throw new Error(`writeRow: the sentence prints the answer "${answer}"`);
  if (need(answer) > w) throw new Error(`writeRow: "${answer}" needs ${need(answer)} px > ${w}`);
  const p = sentenceP(renderMarked(text, span), '', fontPx);
  const ruling = rulingBlock({ rows: 1, w, h, glyphH });
  return `<div data-ws-content data-lcs-row="${n}" ${attr('data-lcs-frame', frame)}${kind ? ' ' + attr('data-lcs-kind', kind) : ''} ${attr('data-lcs-ask', ask)} ${attr('data-lcs-name', name)} ${attr('data-lcs-slots', JSON.stringify(slots || {}))} ${attr('data-lcs-answer', answer)} ` +
    `style="display:grid;grid-template-columns:30px 10px ${picPx}px 12px 1fr;grid-template-rows:auto ${h}px;row-gap:6px;align-items:center;min-width:0">` +
    badge(n) + picImg({ src, pic: slots && slots.pic, picKind: 'person', depicted, px: picPx }) +
    `<div style="min-width:0;grid-column:5;grid-row:1">${p}</div>` +
    `<div data-lcs-ruling-cell data-lcs-empty style="line-height:0;min-width:0;grid-column:5;grid-row:2">${ruling}</div></div>`;
}

/* ---------- askScene (F5) ---------- */
function askScene({ portrait, thing, place, time, tile = 120 }) {
  if (!(tile >= 100)) throw new Error(`askScene: tile ${tile} < 100`);
  if (tile < CLOCK_FLOOR) throw new Error(`askScene: the clock at ${tile} < ${CLOCK_FLOOR}`);
  if (!time || !Number.isInteger(time.h)) throw new Error('askScene: time.h is required');
  const box = (inner, stamp) => `<div ${stamp} style="width:${tile + 12}px;height:${tile + 12}px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;padding:4px;display:flex;align-items:center;justify-content:center;flex:0 0 auto">${inner}</div>`;
  const img = (p, kind) => {
    if (!p || !p.src || !p.pic) throw new Error(`askScene: the ${kind} tile needs src + pic`);
    return `<img class="ws-icon" src="${p.src}" alt="" ${attr('data-lcs-scene-pic', p.pic)} ${attr('data-lcs-pickind', kind)} style="width:${tile}px;height:${tile}px">`;
  };
  const tiles = [box(img(portrait, 'person'), 'data-lcs-scene-tile="person"'), box(img(thing, 'thing'), 'data-lcs-scene-tile="thing"'), box(img(place, 'place'), 'data-lcs-scene-tile="place"'),
    box(clock({ h: time.h, m: 0, size: tile }).svg, 'data-lcs-scene-tile="clock"')];
  return `<div class="ws-lane" data-ws-content data-lcs-ask-scene ${attr('data-lcs-time', time.h)} style="padding:12px 16px;display:flex;gap:20px;justify-content:center;align-items:center">${tiles.join('')}</div>`;
}

/* ---------- starterLines (F5) ---------- */
function starterLines({ starters, w = 639, h = 56, glyphH = 26, gap = 8 }) {
  if (!Array.isArray(starters) || starters.length < 4 || starters.length > 6) throw new Error(`starterLines: ${starters ? starters.length : 0} starters (4..6)`);
  if (starters.some((s) => !s || !String(s).trim())) throw new Error('starterLines: an empty starter');
  if (new Set(starters.map(fold)).size !== starters.length) throw new Error('starterLines: a starter twice');
  const st = {};
  starters.forEach((s, i) => { st[i] = s; });
  return `<div class="ws-lane" data-ws-content ${attr('data-lcs-starters', starters.join(','))} style="padding:10px 16px"><div style="line-height:0">${rulingBlock({ rows: starters.length, w, h, glyphH, starters: st, gap })}</div></div>`;
}

module.exports = { markedSpan, renderMarked, qwChips, answerRow, qaMatch, questionFrame, qwBins, writeRow, askScene, starterLines };
