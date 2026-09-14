/**
 * components-b3/opposites.js — the G1-307 `opposites` family components
 * (design: docs/worksheet-gen/b3-designs/G1-307-opposites.md §2 "NEW in
 * templates/components-b3.js"). Merged into the templates/components-b3.js
 * namespace. The base consumes `oppositeArrow` + `pairCard` and its card body
 * `oppositeCard` (lifted out of the spec so the gate can build a page past the
 * spec's guards); the Phase 2 faces (2026-09-14) add the seven type-scoped
 * face components below (`oppositeMatch` … `oppositePrefixRow` — the design's
 * matchColumns / frameRow / pairLane / choiceRow / prefixChips under the
 * `opposite…` prefix, the K-319 `feeling…` convention against namespace
 * collisions). The base's three exports are byte-untouched.
 *
 *   oppositeArrow({ w = 36, h = 20 })
 *     One shaft with two opposed heads, T.teal, stroke 3, round caps, on the
 *     token palette only. `data-lcs-opp-arrow`, aria-hidden — decoration, never
 *     an answer. 48×24 is the F3 lane separator size.
 *
 *   pairCard({ picA:{src}, picB:{src}, transformB:'scale'|'none', size = 80,
 *              w = 160, h = 88, cueKey })
 *     A WHITE tile with two `.ws-icon` pictures baseline-aligned (the K-032
 *     size-compare idiom): `scale` prints ONE noun twice, picA at `size`, picB
 *     at max(44, round(size·0.55)) — never below the G1 floor, no mirror, no X,
 *     no opacity; `none` prints two different nouns both at round(size·0.72)
 *     (≥ 44 from size 62). The box defaults to the icons + gap 10 + padding 8
 *     + border 2 each side (`w`/`h` may only widen it).
 *     The cue is a picture of the RELATION (both states); no word rides on it.
 *     Stamps `data-lcs-cue-key` (= the pair id; verify checks it against the
 *     card's `data-lcs-pair`) and `data-lcs-cue-kind`.
 *
 *   oppositeCard({ given, pair, a, b, dir, wordPx, laneW, laneH, glyphH,
 *                  cue = null })
 *     The base's card body: `<div class="ws-card-stage" data-ws-content …>`
 *     stamped `data-lcs-pair` / `data-lcs-a` / `data-lcs-b` / `data-lcs-dir`
 *     ("ab" = a is printed) — line 1 = arrow + the GIVEN word (Baloo 2 700
 *     `wordPx`, `data-lcs-given`) with the optional `pairCard` cue right-aligned
 *     on the SAME line (design deviation 1 in the build record: the design's
 *     d1 stack forgot the word line; beside the word the cue costs no height);
 *     `line1H` = the page's uniform line-1 height (the cue height at d1) so
 *     every lane on the page sits at the same y; line 1 carries margin-left 20
 *     so the arrow clears the 30 px card badge; the stage distributes its slack
 *     `space-evenly`. Line 2 = one empty `writingRow` (`data-lcs-prim=
 *     "writing-row"`). The written word appears NOWHERE on the card — only in
 *     the bank.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');
const { writingRow, textLaneGeometry, LM } = require('../../primitives/trace-path.js');

const T = tokens.color;
const F = tokens.font;
const G1_FLOOR = tokens.density.G1.minElement;   // 44

function oppositeArrow({ w = 36, h = 20 } = {}) {
  const y = h / 2;
  const head = Math.max(5, Math.round(h * 0.32));
  const d = `M${head + 2} ${y} H ${w - head - 2} ` +
    `M${head + 2} ${y} L ${head + 2 + head} ${y - head} M${head + 2} ${y} L ${head + 2 + head} ${y + head} ` +
    `M${w - head - 2} ${y} L ${w - 2 - 2 * head} ${y - head} M${w - head - 2} ${y} L ${w - 2 - 2 * head} ${y + head}`;
  return svgRoot({ width: w, height: h, label: 'opposite arrow' },
    el('path', { d, fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    { 'data-lcs-opp-arrow': '1', 'aria-hidden': 'true' });
}

function pairCard({ picA, picB, transformB = 'none', size = 80, w, h, cueKey }) {
  if (!picA || !picA.src || !picB || !picB.src) throw new Error('pairCard: both pictures need a src');
  if (transformB !== 'scale' && transformB !== 'none') throw new Error('pairCard: transformB must be "scale" or "none"');
  const pxA = transformB === 'scale' ? size : Math.round(size * 0.72);
  const pxB = transformB === 'scale' ? Math.max(G1_FLOOR, Math.round(size * 0.55)) : Math.round(size * 0.72);
  if (Math.min(pxA, pxB) < G1_FLOOR) throw new Error(`pairCard: icon ${Math.min(pxA, pxB)} px below the G1 floor ${G1_FLOOR}`);
  // default box = the two icons + the 10 px gap + padding 8/8 + border 2/2 (a caller may widen, never narrow)
  const W = Math.max(w || 0, pxA + pxB + 10 + 16 + 4);
  const H = Math.max(h || 0, pxA + 8 + 4);
  const img = (src, px) => `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px;flex:0 0 auto">`;
  return `<div style="display:inline-flex;align-items:flex-end;justify-content:center;gap:10px;width:${W}px;height:${H}px;` +
    `background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;box-sizing:border-box;padding:4px 8px;flex:0 0 auto" ` +
    `data-lcs-cue-key="${esc(cueKey)}" data-lcs-cue-kind="${transformB}">${img(picA.src, pxA)}${img(picB.src, pxB)}</div>`;
}

function oppositeCard({ given, pair, a, b, dir, wordPx = 28, laneW = 302, laneH = 64, glyphH = 28, cue = null, line1H }) {
  const lineH = wordPx + 4;
  const lane = writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg;
  const cueHtml = cue ? pairCard(cue) : '';
  // line 1 is the same height on every card of a page (the caller passes the page's cue height at d1), so
  // the lanes line up across the grid; margin-left 20 keeps the arrow's ink clear of the 30 px card badge
  // (measured: badge box x 15..45 on the page, arrow ink from x 36 without it — a 5 px overlap at d3)
  const L1 = Math.max(lineH, line1H || 0);
  return `<div class="ws-card-stage" style="flex-direction:column;align-items:stretch;justify-content:space-evenly;gap:4px;padding:0" ` +
    `data-ws-content data-lcs-pair="${esc(pair)}" data-lcs-a="${esc(a)}" data-lcs-b="${esc(b)}" data-lcs-dir="${dir}">` +
    `<div style="display:flex;align-items:center;gap:8px;height:${L1}px;min-height:0;margin-left:20px" data-lcs-line="word">` +
    oppositeArrow() +
    `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${wordPx}px;line-height:${lineH}px;color:${T.ink};white-space:nowrap;flex:0 1 auto;min-width:0" data-lcs-given="${esc(given)}">${esc(given)}</span>` +
    (cueHtml ? `<span style="flex:1 1 auto"></span>${cueHtml}` : '') +
    `</div>` +
    `<div style="display:flex;justify-content:center" data-lcs-line="lane">${lane}</div></div>`;
}

/* ================================================================== faces (Phase 2, 2026-09-14) */
/*
 * Type-scoped names (the design's matchColumns / frameRow / pairLane / choiceRow / prefixChips are
 * generic enough to collide with a sibling family in the shared namespace loader, which refuses a
 * duplicate for every family at once — the K-319 precedent).
 *
 *   oppositeMatch({ left, right, tileW, itemH, minH, wordPx })            F1 K-351 `layout:'match'`
 *     .ws-match with two columns: LEFT cream items (`data-lcs-left="<pair>"`, dot --right) print
 *     picture + word of member a; RIGHT white items (`data-lcs-right="<pair>"`, dot --left) print the
 *     OPPOSITE picture + word b, in the caller's (deranged) order. Each item = [img .ws-icon px][word
 *     Baloo 2 700 wordPx]; `px` per item (a scale pair prints ONE noun at two sizes, both >= the K
 *     floor 56). `flex:0 1 auto; min-height:minH` lets the column shrink under a long chrome.
 *   oppositeFrameRow({ pair, a, b, given, answer, pic, line1, pre, post, picPx, textW, fontPx,
 *                      laneW, laneH, glyphH })                                F2 G1-335 `layout:'frames'`
 *     .ws-lane (padding 4 16 -> inner 639) stamped data-lcs-frame / -a / -b / -given / -answer:
 *     [img picPx][text column textW: line 1 (Nunito 800 fontPx) / line 2 = pre + an inline
 *     writingRow laneW x laneH + post (the end mark)]. The answer is never in the text.
 *   oppositeChipRow({ chips, fontPx, tileH })                               F3 G1-336 `layout:'pairup'`
 *     .ws-tilerow centred, `.ws-tile.ws-tile--word` chips stamped data-lcs-chip="<word>" and
 *     data-lcs-chip-pair="<pair>" (the mapping the gate re-derives; nothing visible carries it).
 *   oppositePairLane({ n, w, h, glyphH, arrowW, arrowH })                   F3 lane
 *     .ws-lane (padding 5 16) stamped data-lcs-pairlane="n": [badge 30][writingRow w x h][arrow]
 *     [writingRow w x h] — two EMPTY lanes round a two-way arrow; the child writes one pair per row.
 *   oppositeChoiceRow({ pair, target, b, pills, correct, targetPx, pillPx })  F4 G1-337 `layout:'choice'`
 *     .ws-lane (padding 8 16) stamped data-lcs-choice="<pair>" data-lcs-target data-lcs-b
 *     data-lcs-correct="<i>": line 1 the target word (Baloo 2 700 targetPx, data-lcs-target-word);
 *     line 2 three white .ws-pill (Baloo 700 pillPx, h >= 40) stamped data-lcs-pill="<word>"
 *     data-lcs-role="antonym|syn|far".
 *   oppositePrefixChips({ prefixes, px })                                   F5 G2-320 legend
 *     .ws-nstrip of .ws-nchip 44 high printing "<prefix>-", data-lcs-prefix="<prefix>" — a legend,
 *     never an answer (data-lcs-prefix-legend on the strip).
 *   oppositePrefixRow({ n, base, prefix, expected, wordPx, colW, laneW, laneH, glyphH })   F5 row
 *     .ws-lane (padding 6 12 -> inner 647) stamped data-lcs-prefix-row data-lcs-base data-lcs-prefix
 *     data-lcs-expected: [badge 30][base word Baloo 2 700 wordPx in colW][arrow 48x24][writingRow
 *     laneW x laneH]. Only the base word is printed; the child writes prefix + base on the lane.
 */
const K_FLOOR = tokens.density.K.minElement;   // 56

const badge = (n) => `<span class="ws-card-badge" style="position:static;border-radius:50%;flex:0 0 auto" aria-hidden="true">${n}</span>`;
const wordSpan = (word, px, attrs = '') =>
  `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:${px + 4}px;color:${T.ink};white-space:nowrap;flex:0 1 auto;min-width:0"${attrs}>${esc(word)}</span>`;

function oppositeMatchItem({ side, pair, word, src, px, tileW, itemH, minH, wordPx }) {
  if (px < K_FLOOR) throw new Error(`oppositeMatch: icon ${px} px below the K floor ${K_FLOOR}`);
  const cls = side === 'left' ? 'ws-match-item' : 'ws-match-item ws-match-item--plain';
  const dot = side === 'left' ? 'ws-match-dot ws-match-dot--right' : 'ws-match-dot ws-match-dot--left';
  const stamp = side === 'left' ? `data-lcs-left="${esc(pair)}"` : `data-lcs-right="${esc(pair)}"`;
  return `<div class="${cls}" style="width:${tileW}px;height:${itemH}px;min-height:${minH}px;flex:0 1 auto;gap:10px;padding:0 8px" ${stamp} data-lcs-word="${esc(word)}">` +
    `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px;flex:0 0 auto">` +
    wordSpan(word, wordPx, ' data-lcs-match-word') +
    `<span class="${dot}"></span></div>`;
}

function oppositeMatch({ left, right, tileW = 250, itemH = 114, minH, wordPx = 26 }) {
  const picMax = Math.max(...left.map((i) => i.px), ...right.map((i) => i.px));
  const mh = minH == null ? Math.max(picMax + 16, wordPx + 24) : minH;
  const l = left.map((i) => oppositeMatchItem({ side: 'left', ...i, tileW, itemH, minH: mh, wordPx })).join('');
  const r = right.map((i) => oppositeMatchItem({ side: 'right', ...i, tileW, itemH, minH: mh, wordPx })).join('');
  return `<div class="ws-match" style="min-height:0" data-ws-content data-lcs-match-block data-lcs-pairs="${left.length}">` +
    `<div class="ws-match-col" style="min-height:0" data-lcs-col="left">${l}</div>` +
    `<div class="ws-match-col" style="min-height:0" data-lcs-col="right">${r}</div></div>`;
}

function oppositeFrameRow({ pair, a, b, given, answer, name = null, pic, line1, pre, post, picPx = 64, textW = 563, fontPx = 19, laneW = 200, laneH = 56, glyphH = 28 }) {
  const lane = writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg;
  // the sentence text sits ON the lane's base line: pad the line-2 spans up from the SVG's bottom edge by
  // (laneH - yBase - the font's descent), measured off the same geometry the writing row rules itself by
  const geo = textLaneGeometry({ h: laneH, glyphH, heightUnits: LM.base - LM.ascender, inkTop: LM.ascender, inkBottom: LM.desc });
  const pad = Math.max(0, Math.round(laneH - geo.yBase - fontPx * 0.24));
  const txt = (s, attr, onLane) => `<span style="font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:${fontPx + 3}px;color:${T.ink};white-space:nowrap${onLane ? ';padding-bottom:' + pad + 'px' : ''}"${attr || ''}>${esc(s)}</span>`;
  const img = pic && pic.src ? `<img class="ws-icon" src="${pic.src}" alt="" style="width:${picPx}px;height:${picPx}px;flex:0 0 auto" data-lcs-frame-pic="${esc(pic.theme + '/' + pic.noun)}">` : '';
  return `<div class="ws-lane" style="padding:4px 16px;display:flex;align-items:center;gap:12px;min-height:0" data-ws-content ` +
    `data-lcs-frame="${esc(pair)}" data-lcs-a="${esc(a)}" data-lcs-b="${esc(b)}" data-lcs-given="${esc(given)}" data-lcs-answer="${esc(answer)}"${name ? ` data-lcs-name="${esc(name)}"` : ''}>` +
    img +
    `<div style="display:flex;flex-direction:column;justify-content:center;gap:2px;width:${textW}px;min-height:0" data-lcs-frame-text>` +
    `<div style="display:flex;align-items:center;min-height:0" data-lcs-frame-line="1">${line1 ? txt(line1) : ''}</div>` +
    `<div style="display:flex;align-items:flex-end;gap:6px;min-height:0" data-lcs-frame-line="2">${pre ? txt(pre, '', true) : ''}${lane}${post ? txt(post, '', true) : ''}</div>` +
    `</div></div>`;
}

function oppositeChipRow({ chips, fontPx = 20, tileH = 44 }) {
  const items = chips.map((c) =>
    `<span class="ws-tile ws-tile--word" style="height:${tileH}px;font-size:${fontPx}px" data-lcs-chip="${esc(c.word)}" data-lcs-chip-pair="${esc(c.pair)}">${esc(c.word)}</span>`).join('');
  return `<div class="ws-tilerow" style="justify-content:center;flex:0 0 auto" data-lcs-chiprow="${chips.length}">${items}</div>`;
}

function oppositePairLane({ n, w = 260, h = 64, glyphH = 28, arrowW = 48, arrowH = 24 }) {
  const lane = () => writingRow({ w, h, glyphH, xHeight: true }).svg;
  return `<div class="ws-lane" style="padding:5px 16px;display:flex;align-items:center;justify-content:center;gap:12px;min-height:0" data-ws-content data-lcs-pairlane="${n}">` +
    badge(n) + `<span data-lcs-pairlane-slot="1" style="display:flex">${lane()}</span>` + oppositeArrow({ w: arrowW, h: arrowH }) +
    `<span data-lcs-pairlane-slot="2" style="display:flex">${lane()}</span></div>`;
}

function oppositeChoiceRow({ pair, target, b, pills, correct, targetPx = 26, pillPx = 22 }) {
  const ps = pills.map((p, i) =>
    `<span class="ws-pill" style="font-size:${pillPx}px;min-height:40px;line-height:${pillPx + 4}px" data-lcs-pill="${esc(p.word)}" data-lcs-role="${p.role}"${i === correct ? ' data-lcs-correct-pill="1"' : ''}>${esc(p.word)}</span>`).join('');
  return `<div class="ws-lane" style="padding:8px 16px;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px;min-height:0" data-ws-content ` +
    `data-lcs-choice="${esc(pair)}" data-lcs-target="${esc(target)}" data-lcs-b="${esc(b)}" data-lcs-correct="${correct}">` +
    `<div style="display:flex;align-items:center;gap:10px;min-height:0">${oppositeArrow()}${wordSpan(target, targetPx, ' data-lcs-target-word')}</div>` +
    `<div style="display:flex;justify-content:center;gap:12px;min-height:0" data-lcs-pills="${pills.length}">${ps}</div></div>`;
}

function oppositePrefixChips({ prefixes, px = 22 }) {
  const chips = prefixes.map((p) =>
    `<span class="ws-nchip" style="height:44px;padding:0 18px;font-size:${px}px" data-lcs-prefix="${esc(p)}">${esc(p)}-</span>`).join('');
  return `<div class="ws-nstrip" style="gap:12px;flex:0 0 auto;margin-bottom:12px" data-lcs-prefix-legend="${prefixes.length}">${chips}</div>`;
}

function oppositePrefixRow({ n, base, prefix, expected, wordPx = 24, colW = 220, laneW = 300, laneH = 56, glyphH = 26 }) {
  const lane = writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg;
  return `<div class="ws-lane" style="padding:6px 12px;display:flex;align-items:center;gap:12px;min-height:0" data-ws-content ` +
    `data-lcs-prefix-row="${n}" data-lcs-base="${esc(base)}" data-lcs-prefix="${esc(prefix)}" data-lcs-expected="${esc(expected)}">` +
    badge(n) +
    `<div style="display:flex;align-items:center;width:${colW}px;min-width:0">${wordSpan(base, wordPx, ' data-lcs-base-word')}</div>` +
    oppositeArrow({ w: 48, h: 24 }) +
    `<span data-lcs-prefix-slot style="display:flex">${lane}</span></div>`;
}

module.exports = { oppositeArrow, pairCard, oppositeCard,
  oppositeMatch, oppositeFrameRow, oppositeChipRow, oppositePairLane, oppositeChoiceRow, oppositePrefixChips, oppositePrefixRow };
