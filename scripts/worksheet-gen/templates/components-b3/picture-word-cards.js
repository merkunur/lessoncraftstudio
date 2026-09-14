/**
 * components-b3/picture-word-cards.js — the K-324 family's NEW components
 * (design file §2 "NEW in templates/components-b3.js"). Merged into the
 * components-b3 namespace by templates/components-b3.js; names are unique
 * across every family file (checked against __owner at build time).
 *
 * A MATERIALS SHEET: white cards edge to edge, separated only by dashed cut
 * lines drawn ONCE as an overlay (a per-card border restarts the dash phase
 * at every edge; one element per cut keeps it continuous — K-240's proven
 * 2.5px dashed #C8BFAE line, `types/k/K-240-cut-and-paste.js:85`).
 *
 *   scissorsGlyph(size=26)                      byte-copy of K-240:16-25 (data-lcs-scissors, inkSoft)
 *   cutLines({w, h, cols, rows})                ONE svg overlay: frame (roundedRect r 0, inset by half
 *                                               the stroke so the whole dash prints) + cols-1 vertical
 *                                               + rows-1 horizontal lines, T.grid 2.5, dash '8 6', butt
 *                                               caps; stamps data-lcs-cutlines / -cut-frame / -cut-v=k
 *                                               / -cut-h=k; aria-hidden
 *   cardSheet({cards, cols, rows, w, h, kind, legend, cellW, cellH, extra})
 *                                               strip 30 (scissors at x 0 [+ legend, right]) + the
 *                                               position:relative grid + cutLines; root stamps
 *                                               data-ws-content data-lcs-sheet=kind data-lcs-cols/-rows
 *   cutCard({inner, kind, vocabKey, word, twin, pad, attrs})
 *                                               <section class="ws-cutcard"> — T.white, no border,
 *                                               padding = pad (the 3 mm cut margin), flex column centred,
 *                                               gap 6, overflow hidden; stamps data-lcs-card=kind
 *                                               (+ data-lcs-vocab / data-lcs-word / data-lcs-twin)
 *   labelLines(word, {cap, lineCap, maxLines})  [lines] or null (REFUSE): <= cap glyphs = one line;
 *                                               longer multi-token words wrap greedily at spaces into
 *                                               <= maxLines lines of <= lineCap glyphs; a single token
 *                                               above the cap (or any token above lineCap) = null.
 *                                               Glyphs are code points ([...s].length), never inside a token.
 *   wordPlate({lines, px, lineH, family, color, dot, padX, maxW})
 *                                               <span class="ws-wordplate"> T.cream r 10, padding 3px
 *                                               padX, nowrap lines; stamps data-lcs-lines / data-lcs-px;
 *                                               `dot` = an inline 16x16 svg circle r 7 filled from
 *                                               codeColors[dot], stroke T.ink 1 (a face concern)
 *   wordCard(...)                               picture over word (the base card)
 *   pictureCard(...)                            picture only (twin rows 1-2)
 *   wordOnlyCard(...)                           word only (twin rows 3-4)
 *   twinSheet(...)                              8 picture cards + 8 word cards (deranged by the caller)
 *
 * Phase 2 (the faces, 2026-09-14) — additive, the base output is byte-identical:
 *   cutCard / wordCard gain a `gap` param (default 6 = the base)
 *   articleCard(...)                            picture over [dot][chip word] — the article face;
 *                                               stamps data-lcs-chip / data-lcs-base beside
 *                                               data-lcs-word (= the joined label)
 *   legendDots({ legend, chips, dots, sep })    the strip legend with a 12 px dot before each
 *                                               segment of the bank's authored legend literal
 *   cloneRow({ src, vocabKey, n, iconPx, rng }) n same-picture imgs in one centred row
 *                                               (components.js iconRows' idiom + the
 *                                               data-lcs-pic stamp verify() requires)
 *   pluralPair(...)                             [oneCard, manyCard] — ONE picture + singular
 *                                               beside THREE pictures + plural, equal sizes
 *   bilingualLabel / bilingualCard(...)         host Baloo 2 26 / 30 T.ink over partner
 *                                               Nunito 700 20 / 24 T.teal in one plate (60)
 *   syllableCard(...)                           picture + syllableWord + printed arcs (arc
 *                                               locales) or picture + a hyphenated plate
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, circle, roundedRect, line, esc } = require('../../primitives/_svg.js');
// G1-305's syllable word + arcs (design §3 F6 dependency). Required from the
// sibling file directly: this file is itself loaded by components-b3.js, so
// requiring the namespace here would be a circular require.
const { syllableWord, syllableArcsForWord } = require('./syllable-split.js');

const T = tokens.color;
const CUT_STROKE = tokens.stroke.grid + 1;   // 2.5 — K-240's dashed cut line
const CUT_DASH = '8 6';
const STRIP_H = 30;

/** byte-copy of types/k/K-240-cut-and-paste.js:16-25 */
function scissorsGlyph(size = 26) {
  const s = size;
  const parts = [
    el('path', { d: `M ${s * 0.2} ${s * 0.2} L ${s * 0.85} ${s * 0.62}`, stroke: tokens.color.inkSoft, 'stroke-width': 2.4, 'stroke-linecap': 'round', fill: 'none' }),
    el('path', { d: `M ${s * 0.2} ${s * 0.8} L ${s * 0.85} ${s * 0.38}`, stroke: tokens.color.inkSoft, 'stroke-width': 2.4, 'stroke-linecap': 'round', fill: 'none' }),
    circle({ cx: s * 0.16, cy: s * 0.16, r: s * 0.13, strokeColor: tokens.color.inkSoft, strokeWidth: 2 }),
    circle({ cx: s * 0.16, cy: s * 0.84, r: s * 0.13, strokeColor: tokens.color.inkSoft, strokeWidth: 2 }),
  ];
  return svgRoot({ width: s, height: s, label: 'cut here' }, parts.join(''), { 'data-lcs-scissors': '1' });
}

function cutLines({ w, h, cols, rows }) {
  const half = CUT_STROKE / 2;
  const parts = [
    roundedRect({ x: half, y: half, w: w - CUT_STROKE, h: h - CUT_STROKE, r: 0, strokeColor: T.grid, strokeWidth: CUT_STROKE, dash: CUT_DASH, data: { 'data-lcs-cut-frame': '1' } }),
  ];
  for (let k = 1; k < cols; k++) {
    const x = (k * w) / cols;
    parts.push(line({ x1: x, y1: 0, x2: x, y2: h, strokeColor: T.grid, strokeWidth: CUT_STROKE, cap: 'butt', dash: CUT_DASH, data: { 'data-lcs-cut-v': k } }));
  }
  for (let k = 1; k < rows; k++) {
    const y = (k * h) / rows;
    parts.push(line({ x1: 0, y1: y, x2: w, y2: y, strokeColor: T.grid, strokeWidth: CUT_STROKE, cap: 'butt', dash: CUT_DASH, data: { 'data-lcs-cut-h': k } }));
  }
  return svgRoot({ width: w, height: h, label: 'cut lines' }, parts.join(''), {
    'data-lcs-cutlines': '1', 'aria-hidden': 'true',
    style: 'position:absolute;inset:0;pointer-events:none;display:block',
  });
}

/**
 * The sheet block: strip + grid + overlay. `cards` = the inner HTML of each
 * card IN GRID ORDER (already wrapped by cutCard). Returns the block html.
 */
function cardSheet({ cards, cols, rows, w = 674, h = 692, kind = 'word', legend = null, extra = '' }) {
  if (cards.length !== cols * rows) throw new Error(`cardSheet: ${cards.length} cards for a ${cols}x${rows} grid`);
  const strip = `<div class="ws-cardsheet-strip" style="height:${STRIP_H}px;width:${w}px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex:0 0 auto">` +
    scissorsGlyph(26) +
    (legend ? `<span class="ws-cardsheet-legend" style="font-family:${tokens.font.body},sans-serif;font-weight:700;font-size:16px;color:${T.ink};display:inline-flex;align-items:center;gap:6px" data-lcs-legend>${legend}</span>` : '') +
    `</div>`;
  const grid = `<div class="ws-cardsheet-grid" style="position:relative;width:${w}px;height:${h}px;margin:0 auto;display:grid;` +
    `grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr);gap:0;flex:0 0 auto" data-lcs-grid>` +
    cards.join('') + cutLines({ w, h, cols, rows }) + `</div>`;
  return `<div class="ws-cardsheet" data-ws-content data-lcs-sheet="${esc(kind)}" data-lcs-cols="${cols}" data-lcs-rows="${rows}"${extra} ` +
    `style="flex:0 0 auto;margin:auto 0;display:flex;flex-direction:column;width:${w}px;align-self:center">${strip}${grid}</div>`;
}

function cutCard({ inner, kind = 'word', vocabKey, word, twin = null, pad = 12, attrs = '', gap = 6 }) {
  const stamps = [`data-lcs-card="${esc(kind)}"`];
  if (vocabKey != null) stamps.push(`data-lcs-vocab="${esc(vocabKey)}"`);
  if (word != null) stamps.push(`data-lcs-word="${esc(word)}"`);
  if (twin != null) stamps.push(`data-lcs-twin="${esc(twin)}"`);
  return `<section class="ws-cutcard" ${stamps.join(' ')}${attrs ? ' ' + attrs : ''} ` +
    `style="background:${T.white};border:0;padding:${pad}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${gap}px;overflow:hidden;min-width:0;min-height:0">` +
    inner + `</section>`;
}

const glyphs = (s) => [...String(s)].length;

function labelLines(word, { cap = 20, lineCap = 16, maxLines = 2 } = {}) {
  const w = String(word).trim();
  if (!w) return null;
  if (glyphs(w) <= cap) return [w];
  const toks = w.split(/\s+/);
  if (toks.length < 2) return null;                       // a single token above the cap: REFUSE
  if (toks.some((t) => glyphs(t) > lineCap)) return null; // never break inside a token
  const lines = [];
  let cur = '';
  for (const t of toks) {
    const cand = cur ? cur + ' ' + t : t;
    if (glyphs(cand) <= lineCap) cur = cand;
    else { lines.push(cur); cur = t; }
  }
  lines.push(cur);
  return lines.length <= maxLines ? lines : null;
}

function wordPlate({ lines, px = 26, lineH, family = tokens.font.display, color = T.ink, dot = null, padX = 10, maxW = null }) {
  if (!Array.isArray(lines) || !lines.length) throw new Error('wordPlate: lines[] required');
  const lh = lineH || (px + 4);
  let dotSvg = '';
  if (dot) {
    const fill = tokens.codeColors[dot];
    if (!fill) throw new Error('wordPlate: dot "' + dot + '" is not a codeColors key');
    dotSvg = svgRoot({ width: 16, height: 16, label: 'article colour' }, circle({ cx: 8, cy: 8, r: 7, fill, strokeColor: T.ink, strokeWidth: 1 }), { 'data-lcs-dot': dot, style: 'flex:0 0 auto' });
  }
  const text = lines.map((l) => `<span class="ws-wordplate-line" style="display:block;white-space:nowrap;line-height:${lh}px" data-lcs-line>${esc(l)}</span>`).join('');
  return `<span class="ws-wordplate" data-lcs-lines="${lines.length}" data-lcs-px="${px}" ` +
    `style="display:inline-flex;align-items:center;gap:6px;background:${T.cream};border-radius:10px;padding:3px ${padX}px;` +
    `font-family:${family},sans-serif;font-weight:700;font-size:${px}px;line-height:${lh}px;color:${color};text-align:center;` +
    `max-width:${maxW ? maxW + 'px' : '100%'};flex:0 0 auto">${dotSvg}<span style="display:block">${text}</span></span>`;
}

/** picture over word (the base card). `lines` = labelLines(word) already resolved. */
function wordCard({ src, vocabKey, word, lines, pic, px, lineH, pad = 12, innerW, kind = 'word', dot = null, padX = 10, twin = null, extra = '', gap = 6 }) {
  const inner =
    `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" style="width:${pic}px;height:${pic}px;flex:0 0 auto">` +
    wordPlate({ lines, px, lineH, dot, padX, maxW: innerW });
  return cutCard({ inner, kind, vocabKey, word, twin, pad, attrs: extra, gap });
}

/* ------------------------------------------------------------ the faces */

/**
 * The article face card: picture over [dot 16][6][chip word]. `word` is the
 * JOINED label (chip + ' ' + base, or chip + base when the chip ends with an
 * apostrophe — l'arbre); `lines` = labelLines(word) already resolved.
 */
function articleCard({ src, vocabKey, chip, base, word, lines, pic, px, lineH, pad = 12, innerW, dot = null, extra = '' }) {
  const stamps = `data-lcs-chip="${esc(chip)}" data-lcs-base="${esc(base)}"${extra ? ' ' + extra : ''}`;
  return wordCard({ src, vocabKey, word, lines, pic, px, lineH, pad, innerW, kind: 'article', dot, extra: stamps });
}

/** The strip legend: the authored literal split at `sep`, a 12 px dot before segment i (= chip i). */
function legendDots({ legend, chips, dots, sep = ' · ' }) {
  const segs = String(legend).split(sep);
  if (segs.length !== chips.length || segs.length !== dots.length) throw new Error(`legendDots: ${segs.length} legend segments for ${chips.length} chips / ${dots.length} dots`);
  return segs.map((seg, i) => {
    const fill = tokens.codeColors[dots[i]];
    if (!fill) throw new Error('legendDots: dot "' + dots[i] + '" is not a codeColors key');
    const d = svgRoot({ width: 12, height: 12, label: 'article colour' }, circle({ cx: 6, cy: 6, r: 5.5, fill, strokeColor: T.ink, strokeWidth: 1 }), { 'data-lcs-legend-dot': dots[i], style: 'flex:0 0 auto' });
    return `<span style="display:inline-flex;align-items:center;gap:4px" data-lcs-legend-seg="${i}">${d}<span>${esc(seg.trim())}</span></span>`;
  }).join(`<span aria-hidden="true">${esc(sep.trim())}</span>`);
}

/** n same-picture imgs in one centred row (iconRows' rotation warmth, plus the data-lcs-pic stamp). */
function cloneRow({ src, vocabKey, n, iconPx, rng, gap = 10 }) {
  const imgs = [];
  for (let k = 0; k < n; k++) {
    const rot = (rng.next() * 8 - 4).toFixed(1);
    imgs.push(`<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" style="width:${iconPx}px;height:${iconPx}px;flex:0 0 auto;transform:rotate(${rot}deg)">`);
  }
  return `<div class="ws-clone-row" style="display:flex;justify-content:center;gap:${gap}px;flex:0 0 auto" data-lcs-clones="${n}">${imgs.join('')}</div>`;
}

/**
 * One row of the plural face: [one picture + singular] [three pictures + plural].
 * Returns the two cards in grid order. Equal picture sizes — the only
 * difference the child sees is NUMBER.
 */
function pluralPair({ src, vocabKey, singular, plural, sLines, pLines, sPx, sLineH, pPx, pLineH, pic, clones = 3, pad = 12, innerW, rng, extra = '' }) {
  const img = `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" style="width:${pic}px;height:${pic}px;flex:0 0 auto">`;
  const one = cutCard({ inner: img + wordPlate({ lines: sLines, px: sPx, lineH: sLineH, maxW: innerW }), kind: 'plural', vocabKey, word: singular, pad, attrs: `data-lcs-role="one"${extra ? ' ' + extra : ''}` });
  const many = cutCard({ inner: cloneRow({ src, vocabKey, n: clones, iconPx: pic, rng }) + wordPlate({ lines: pLines, px: pPx, lineH: pLineH, maxW: innerW }), kind: 'plural', vocabKey, word: plural, pad, attrs: `data-lcs-role="many"${extra ? ' ' + extra : ''}` });
  return [one, many];
}

/**
 * The bilingual plate: host line (Baloo 2 700 hostPx / +4, T.ink) over the
 * partner line (Nunito 700 partnerPx / +4, T.teal). data-lcs-lines counts the
 * HOST lines only (the partner line carries data-lcs-partner-line, never
 * data-lcs-line, so the base plate rule reads the host word unchanged).
 */
function bilingualLabel({ host, partner, hostPx = 26, partnerPx = 20, maxW = null }) {
  const hl = hostPx + 4, pl = partnerPx + 4;
  return `<span class="ws-wordplate" data-lcs-lines="1" data-lcs-px="${hostPx}" ` +
    `style="display:inline-flex;align-items:center;background:${T.cream};border-radius:10px;padding:3px 10px;` +
    `font-family:${tokens.font.display},sans-serif;font-weight:700;font-size:${hostPx}px;line-height:${hl}px;color:${T.ink};text-align:center;` +
    `max-width:${maxW ? maxW + 'px' : '100%'};flex:0 0 auto"><span style="display:block">` +
    `<span class="ws-wordplate-line" style="display:block;white-space:nowrap;line-height:${hl}px" data-lcs-line>${esc(host)}</span>` +
    `<span class="ws-wordplate-partner" style="display:block;white-space:nowrap;font-family:${tokens.font.body},sans-serif;font-weight:700;font-size:${partnerPx}px;line-height:${pl}px;color:${T.teal}" data-lcs-partner-line>${esc(partner)}</span>` +
    `</span></span>`;
}

function bilingualCard({ src, vocabKey, host, partner, pic, hostPx, partnerPx, pad = 12, innerW, gap = 4, extra = '' }) {
  const inner =
    `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" style="width:${pic}px;height:${pic}px;flex:0 0 auto">` +
    bilingualLabel({ host, partner, hostPx, partnerPx, maxW: innerW });
  return cutCard({ inner, kind: 'bilingual', vocabKey, word: host, pad, attrs: `data-lcs-partner-word="${esc(partner)}"${extra ? ' ' + extra : ''}`, gap });
}

/**
 * The syllable face card. mark 'arc': picture + syllableWord (equal letter
 * cells, the display word — de keeps its capital in cell 1) + printed arcs from
 * the split; mark 'hyphen': picture + a plate printing split.join(hyphen).
 * Stamps data-lcs-split (syllables joined by '|'), data-lcs-count, data-lcs-mark.
 */
function syllableCard({ src, vocabKey, word, split, pic, mark = 'arc', cell = 28, fontPx = 26, arcH = 26, hyphen = '-', px = 26, lineH = 30, pad = 12, innerW, extra = '' }) {
  const img = `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" style="width:${pic}px;height:${pic}px;flex:0 0 auto">`;
  const stamps = `data-lcs-split="${esc(split.join('|'))}" data-lcs-count="${split.length}" data-lcs-mark="${esc(mark)}"${extra ? ' ' + extra : ''}`;
  if (mark === 'hyphen') {
    const label = split.join(hyphen);
    const inner = img + wordPlate({ lines: [label], px, lineH, maxW: innerW });
    return cutCard({ inner, kind: 'syllable', vocabKey, word, pad, attrs: stamps, gap: 6 });
  }
  const inner = img +
    `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;flex:0 0 auto" data-lcs-syllable-stack>` +
    syllableWord({ word, cell, fontPx }) +
    syllableArcsForWord({ split, cell, h: arcH, mode: 'printed' }) +
    `</div>`;
  return cutCard({ inner, kind: 'syllable', vocabKey, word, pad, attrs: stamps, gap: 4 });
}

/** picture only (twin rows 1-2). */
function pictureCard({ src, vocabKey, pic, pad = 10, twin, kind = 'twin' }) {
  const inner = `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" style="width:${pic}px;height:${pic}px;flex:0 0 auto">`;
  return cutCard({ inner, kind, vocabKey, twin, pad });
}

/** word only (twin rows 3-4). */
function wordOnlyCard({ vocabKey, word, lines, px, lineH, pad = 10, innerW, twin, kind = 'twin', padX = 6 }) {
  const inner = wordPlate({ lines, px, lineH, padX, maxW: innerW });
  return cutCard({ inner, kind, vocabKey, word, twin, pad });
}

/**
 * The 4x4 twin sheet: `pictures` = 8 {src, vocabKey} in slot order (rows 1-2),
 * `words` = 8 {vocabKey, word, lines, px} in slot order (rows 3-4; the CALLER
 * deranges them so word slot i never names picture slot i).
 */
function twinSheet({ pictures, words, cols = 4, rows = 4, w = 674, h = 692, pic = 120, pad = 10, innerW, legend = null, extra = '' }) {
  if (pictures.length !== words.length || pictures.length * 2 !== cols * rows) throw new Error(`twinSheet: ${pictures.length} pictures + ${words.length} words for ${cols}x${rows}`);
  const cards = [
    ...pictures.map((p, i) => pictureCard({ src: p.src, vocabKey: p.vocabKey, pic, pad, twin: 'p' + i })),
    ...words.map((x, i) => wordOnlyCard({ vocabKey: x.vocabKey, word: x.word, lines: x.lines, px: x.px, lineH: x.lineH, pad, innerW, twin: 'w' + i })),
  ];
  return cardSheet({ cards, cols, rows, w, h, kind: 'twin', legend, extra });
}

module.exports = { scissorsGlyph, cutLines, cardSheet, cutCard, labelLines, wordPlate, wordCard, pictureCard, wordOnlyCard, twinSheet, articleCard, legendDots, cloneRow, pluralPair, bilingualLabel, bilingualCard, syllableCard };
