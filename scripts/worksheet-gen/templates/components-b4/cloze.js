/**
 * components-b4/cloze.js — the G1-350 `cloze` family components (design:
 * docs/worksheet-gen/b4-designs/G1-350-cloze.md §2 "NEW templates/components-b4/
 * cloze.js"). Merged into the templates/components-b4.js namespace; every name
 * is type-scoped (`gap…` / `…Gap…` / `storyBlock` / `sentenceMatch`) so no
 * sibling family can collide.
 *
 * The one thing this family owns: a picture-cued NOUN gap INSIDE a running
 * sentence — ONE dashed coral box floating in the line of text, the picture
 * 12 px to its left on the same lane. Nothing here prints an answer: the truth
 * lives in `data-lcs-*` stamps (the answer literal, the vocab key, the form);
 * the only words a surface prints are the frame text, the bank pills / chips
 * (the answers of the page, deranged) and the row badge numeral.
 *
 * Exports (every contract of §2; each throws rather than degrades):
 *   gapBox({w, h=40, attrs='', slim=false})
 *       `<span class="ws-blankbox" data-lcs-gapbox …>` (page.css:445 — white,
 *       dashed coral 2.5, r 10; NOT `answerBox`, which stamps
 *       data-lcs-answer="undefined" without an answer). Inline-block,
 *       vertical-align middle, margin 0 4px, so it WRAPS AS A WORD — a long
 *       frame breaks before or after the box, never through it. Throws on
 *       w < 150 || w > 300 || h < 36 unless `slim:true` (the match face's
 *       90 x 30 blank, never written into).
 *   letterGap({n, box=26, gap=4, starter=null})
 *       an inline-block `<span data-lcs-lettergap data-lcs-boxes=n>` around
 *       components-b2 `letterBoxes({n, box, gap})` (W = n*box + (n-1)*gap + 2;
 *       12 letters = 358). `starter` (d1 only) prints the first grapheme in
 *       box 1 as an SVG text overlay sized by `starterFontPx` (the MEASURED
 *       metrics, README rule) and stamps data-lcs-starter. Throws below box 26.
 *   gapRow({n, src, key, frameId, form, kase, text, answer, slot, picPx=56,
 *           fontPx=18, lineHeight=1.3, padding='5px 16px', attrs=''})
 *       THE LANE: `.ws-lane` (page.css:401) with the inline padding override
 *       (the default 12 16 costs 14 px per row — PR9), grid
 *       `30px <picPx>px 1fr` column-gap 10 / 12 (30 + 10 + 56 + 12 + 531 =
 *       639), align-items center: the teal badge (read-and-do's markup, cloned
 *       here: 30 px circle, Baloo 2 700 16 white), the `.ws-icon` picture
 *       picPx x picPx stamped data-lcs-pic=<key>, and `<p data-lcs-sentence>`
 *       Nunito 800 fontPx / lineHeight (margin 0, min-width 0,
 *       overflow-wrap normal) whose `{gap}` (exactly once, else throws) is
 *       replaced by `slot` (the rendered gapBox / letterGap / choice line).
 *       Stamps data-ws-content data-lcs-row=n data-lcs-frame data-lcs-key
 *       data-lcs-form [data-lcs-case] data-lcs-answer (the answer is stamped,
 *       never printed — the row throws if the answer occurs in the text).
 *   choiceGap({chips:[{word, role:'answer'|'foil'}], idx, px=20, h=44, pad=16})
 *       line 2 of a choice row (F2): `<div class="ws-achips" data-lcs-chips=2
 *       data-lcs-idx=idx style="justify-content:flex-start;padding-top:6px">`
 *       with two `.ws-achip` (Baloo 2 700 px, height h, padding 0 pad,
 *       data-lcs-chip=<word> data-lcs-role). Throws on < 2 chips, duplicate
 *       chips, idx outside 0..1, h < 44.
 *   cloneGapRow({n, src, key, clones, clonePx=48, gap=6, colW=156, text, answer, slot, frameId, form, attrs=''})
 *       the plural lane (F3): grid `30px <colW>px 1fr`; the clone strip
 *       (flex, centred, gap 6: 3 x 48 + 2 x 6 = 156) of `clones` identical
 *       `.ws-icon`s each data-lcs-pic=<key>, strip data-lcs-clones=n; the
 *       sentence width 639 - 30 - 10 - 156 - 12 = 431. No hint chip (§3 F3:
 *       the singular is the noun's OTHER number and is never printed). Throws
 *       outside 2..3 clones.
 *   storyBlock({n, pics:[{src, key}], order, lines:[{text, key, form, answer, frameId}], gapW, picPx=44, storyId})
 *       the story lane (F4): `.ws-lane` padding 8 16, flex column gap 8: the
 *       strip row (badge 30 + three `.ws-icon` picPx in the stamped `order`,
 *       each data-lcs-strip-pic=<key>; row stamp data-lcs-strip-order="2,0,1")
 *       then three `<p data-lcs-sentence data-lcs-line=i data-lcs-key
 *       data-lcs-form data-lcs-answer>` Nunito 800 18 / 1.3, each with one
 *       gapBox({w:gapW, h:36}), gap 6. Inner = 44 + 8 + 3 x 36 + 2 x 6 = 172;
 *       block 192. Stamps data-ws-content data-lcs-story=n data-lcs-keys.
 *       Throws unless 3 pics + 3 lines, `order` a permutation of 0..2, every
 *       line one {gap}, no answer printed.
 *   sentenceMatch({left:[{frameId, key, text, form, answer}], right:[{key, src}], order,
 *                  itemH=92, leftW=330, rightW=100, picPx=64, blankW=90})
 *       the match face (F5): `<div class="ws-match" data-ws-content data-lcs-match
 *       style="padding:6px 30px">` (inner 615): left `.ws-match-item` leftW x
 *       itemH (justify flex-start, padding 0 12) holding `<span
 *       data-lcs-match-text>` Nunito 800 18 / 1.3 white-space normal with a
 *       slim gapBox({w:blankW, h:30, slim:true}) inline + `.ws-match-dot--right`;
 *       right `.ws-match-item--plain` rightW x itemH with `.ws-icon` picPx +
 *       `.ws-match-dot--left`, rendered in `order` (a derangement the caller
 *       proves; this component throws on a fixed point). Stamps
 *       data-lcs-match-left=<frameId> (+ key / form / answer) and
 *       data-lcs-match-right=<key>.
 *   gapBank({words, rowOrder, order, rng, wordPx=18})
 *       the two-row dashed bank over components-b2 `wordBank` (`.ws-scene-banner
 *       .ws-bank`, stamps data-lcs-bank-word / data-lcs-bank-banner): the
 *       answers in a DERANGEMENT of `rowOrder` (re-shuffled until no pill index
 *       equals its row index and the order is not the reverse; `order` = a
 *       derangement the caller drew, validated here) + the two-row
 *       guard (`pillEstimate` sum <= 2 x 651 — a third row is a refusal).
 *       Stamps data-lcs-bank-order (the derangement) on a wrapper.
 *   derange(order, rng)  / pillEstimate(word, px) / BANK_INNER   pure helpers the spec + gate share.
 *
 * Palette: cream / creamDeep / white / teal / coral / ink tokens only
 * (page.css classes carry their own hexes); no SVG hex outside the palette
 * (qa/lints.js). No em-dashes.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc, svgRoot } = require('../../primitives/_svg.js');
const { letterBoxes, wordBank, starterFontPx } = require('../components-b2.js');

const T = tokens.color;
const F = tokens.font;
const BANK_INNER = 651;           // .ws-bank padding 8 12 inside the 675 body column (the G1-307 constant)
const GAP_MIN = 150, GAP_MAX = 300, GAP_H_MIN = 36;
const LANE_COLS = 639;            // .ws-lane inner at the inline padding 5 16 (675 - 32 - 4)

function pillEstimate(word, px) { return 32 + 0.57 * px * [...String(word)].length + 10; }

function hasWord(text, word) {
  const w = String(word).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const t = String(text).normalize('NFD').replace(/[̀-ͯ]/g, '');
  return new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu').test(t);
}

function badge(n) {
  return `<span data-lcs-badge style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;` +
    `background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:16px;line-height:1;flex:0 0 30px">${n}</span>`;
}

function icon(src, key, px, extra) {
  return `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(key)}"${extra ? ' ' + extra : ''} style="width:${px}px;height:${px}px;flex:0 0 ${px}px">`;
}

/* ------------------------------------------------------------------ the gap ------------------------------------------------------------------ */

function gapBox({ w, h = 40, attrs = '', slim = false }) {
  if (!Number.isFinite(w) || !Number.isFinite(h)) throw new Error('gapBox: w / h must be numbers');
  if (!slim && (w < GAP_MIN || w > GAP_MAX || h < GAP_H_MIN)) throw new Error(`gapBox: ${w} x ${h} outside [${GAP_MIN}, ${GAP_MAX}] x >= ${GAP_H_MIN} (pass slim:true only for the match face's blank)`);
  if (slim && (w < 60 || h < 24)) throw new Error(`gapBox: slim ${w} x ${h} below 60 x 24`);
  return `<span class="ws-blankbox" data-lcs-gapbox${slim ? ' data-lcs-slim="1"' : ''}${attrs ? ' ' + attrs : ''} ` +
    `style="width:${w}px;height:${h}px;display:inline-block;vertical-align:middle;margin:0 4px"></span>`;
}

function letterGap({ n, box = 26, gap = 4, starter = null }) {
  if (!Number.isInteger(n) || n < 1) throw new Error('letterGap: n must be a positive integer');
  if (box < 26) throw new Error(`letterGap: box ${box} below 26`);
  let svg = letterBoxes({ n, box, gap });
  let stamp = '';
  if (starter) {
    const f = starterFontPx({ h: box, glyphH: box - 6 });
    const txt = `<text x="${(1 + box / 2).toFixed(1)}" y="${(1 + f.yBase).toFixed(1)}" text-anchor="middle" font-family="${F.body}" font-size="${f.px}" font-weight="700" fill="${T.inkSoft}" data-lcs-starter="1" data-lcs-starter-px="${f.px}">${esc(starter)}</text>`;
    svg = svg.replace('</svg>', txt + '</svg>');
    stamp = ` data-lcs-starter="${esc(starter)}"`;
  }
  const W = n * box + (n - 1) * gap + 2;
  return `<span data-lcs-lettergap data-lcs-boxes="${n}"${stamp} style="display:inline-block;vertical-align:middle;margin:0 4px;width:${W}px;height:${box + 2}px;line-height:0">${svg}</span>`;
}

/** `{gap}` -> slot; throws unless the text carries {gap} exactly once and never the answer. */
function fillGap(text, slot, answer) {
  const t = String(text);
  if ((t.match(/\{gap\}/g) || []).length !== 1) throw new Error(`cloze: the frame must carry {gap} exactly once ("${t}")`);
  if (answer && hasWord(t, answer)) throw new Error(`cloze: the frame prints its answer "${answer}" ("${t}")`);
  const [pre, post] = t.split('{gap}');
  return esc(pre) + slot + esc(post);
}

function sentenceP(inner, { fontPx = 18, lineHeight = 1.3, attrs = '', margin = '0' } = {}) {
  return `<p data-lcs-sentence${attrs ? ' ' + attrs : ''} style="margin:${margin};min-width:0;overflow-wrap:normal;font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:${lineHeight};color:${T.ink}">${inner}</p>`;
}

function rowStamps({ n, frameId, key, form, kase, answer, attrs }) {
  const a = ['data-ws-content', `data-lcs-row="${n}"`, `data-lcs-frame="${esc(frameId)}"`, `data-lcs-key="${esc(key)}"`, `data-lcs-form="${esc(form)}"`];
  if (kase) a.push(`data-lcs-case="${esc(kase)}"`);
  a.push(`data-lcs-answer="${esc(answer)}"`);
  if (attrs) a.push(attrs);
  return a.join(' ');
}

function gapRow({ n, src, key, frameId, form, kase = null, text, answer, slot, picPx = 56, fontPx = 18, lineHeight = 1.3, padding = '5px 16px', attrs = '' }) {
  if (!src || !key || !frameId || !form || !answer) throw new Error('gapRow: src / key / frameId / form / answer are required');
  if (!slot) throw new Error('gapRow: a rendered slot is required');
  if (picPx < 44) throw new Error(`gapRow: picPx ${picPx} below the G1 floor 44`);
  if (fontPx < 16) throw new Error(`gapRow: fontPx ${fontPx} below 16`);
  // columns 30 | picPx | text: gaps 10 / 12 (the 12 = column-gap 10 + the sentence's 2 px margin) -> 30 + 10 + 56 + 12 + 531 = 639
  return `<div class="ws-lane" ${rowStamps({ n, frameId, key, form, kase, answer, attrs })} ` +
    `style="padding:${padding};display:grid;grid-template-columns:30px ${picPx}px minmax(0,1fr);column-gap:10px;align-items:center;min-height:0">` +
    badge(n) + icon(src, key, picPx) + sentenceP(fillGap(text, slot, answer), { fontPx, lineHeight, margin: '0 0 0 2px' }) + `</div>`;
}

function choiceGap({ chips, idx, px = 20, h = 44, pad = 16 }) {
  if (!Array.isArray(chips) || chips.length !== 2) throw new Error('choiceGap: exactly 2 chips');
  if (new Set(chips.map((c) => String(c.word).toLowerCase())).size !== 2) throw new Error('choiceGap: duplicate chips');
  if (![0, 1].includes(idx)) throw new Error(`choiceGap: idx ${idx} outside 0..1`);
  if (h < 44) throw new Error(`choiceGap: h ${h} below the G1 floor 44`);
  if (chips.filter((c) => c.role === 'answer').length !== 1 || chips.some((c) => !['answer', 'foil'].includes(c.role))) throw new Error('choiceGap: one answer + one foil');
  if (chips[idx].role !== 'answer') throw new Error(`choiceGap: idx ${idx} is not the answer chip`);
  return `<div class="ws-achips" data-lcs-chips="2" data-lcs-idx="${idx}" style="justify-content:flex-start;padding-top:6px">` +
    chips.map((c) => `<span class="ws-achip" data-lcs-chip="${esc(c.word)}" data-lcs-role="${c.role}" style="height:${h}px;padding:0 ${pad}px;font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:1">${esc(c.word)}</span>`).join('') +
    `</div>`;
}

function cloneGapRow({ n, src, key, clones, clonePx = 48, gap = 6, colW = 156, text, answer, slot, frameId, form = 'pl', attrs = '' }) {
  if (!Number.isInteger(clones) || clones < 2 || clones > 3) throw new Error(`cloneGapRow: clones ${clones} outside 2..3`);
  if (clonePx < 36) throw new Error(`cloneGapRow: clonePx ${clonePx} below the G2 floor 36`);
  if (clones * clonePx + (clones - 1) * gap > colW) throw new Error(`cloneGapRow: ${clones} x ${clonePx} + gaps > colW ${colW}`);
  const strip = `<span data-lcs-clones="${clones}" style="display:flex;justify-content:center;align-items:center;gap:${gap}px;width:${colW}px">` +
    Array.from({ length: clones }, () => icon(src, key, clonePx)).join('') + `</span>`;
  return `<div class="ws-lane" ${rowStamps({ n, frameId, key, form, kase: null, answer, attrs })} ` +
    `style="padding:5px 16px;display:grid;grid-template-columns:30px ${colW}px minmax(0,1fr);column-gap:10px;align-items:center;min-height:0">` +
    badge(n) + strip + sentenceP(fillGap(text, slot, answer), { margin: '0 0 0 2px' }) + `</div>`;
}

function storyBlock({ n, pics, order, lines, gapW, picPx = 44, storyId = '' }) {
  if (!Array.isArray(pics) || pics.length !== 3 || !Array.isArray(lines) || lines.length !== 3) throw new Error('storyBlock: 3 pics + 3 lines');
  if (!Array.isArray(order) || order.slice().sort().join(',') !== '0,1,2') throw new Error(`storyBlock: order ${JSON.stringify(order)} is not a permutation of 0..2`);
  if (picPx < 36) throw new Error(`storyBlock: picPx ${picPx} below 36`);
  const strip = `<div data-lcs-strip-order="${order.join(',')}" style="display:flex;align-items:center;gap:12px">` + badge(n) +
    order.map((i) => icon(pics[i].src, pics[i].key, picPx, 'data-lcs-strip-pic="1"')).join('') + `</div>`;
  const ps = lines.map((l, i) => sentenceP(fillGap(l.text, gapBox({ w: gapW, h: 36 }), l.answer),
    { attrs: `data-lcs-line="${i}" data-lcs-key="${esc(l.key)}" data-lcs-form="${esc(l.form)}" data-lcs-answer="${esc(l.answer)}" data-lcs-frame="${esc(l.frameId || '')}"` })).join('');
  return `<div class="ws-lane" data-ws-content data-lcs-story="${n}"${storyId ? ` data-lcs-story-id="${esc(storyId)}"` : ''} data-lcs-keys="${esc(lines.map((l) => l.key).join(','))}" ` +
    `style="padding:8px 16px;display:flex;flex-direction:column;gap:8px;min-height:0">${strip}<div style="display:flex;flex-direction:column;gap:6px">${ps}</div></div>`;
}

function sentenceMatch({ left, right, order, itemH = 92, leftW = 330, rightW = 100, picPx = 64, blankW = 90 }) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length || left.length < 2) throw new Error('sentenceMatch: left / right of equal length >= 2');
  if (!Array.isArray(order) || order.length !== right.length || order.slice().sort((a, b) => a - b).join(',') !== right.map((_, i) => i).join(',')) throw new Error('sentenceMatch: order is not a permutation');
  if (order.some((o, i) => o === i)) throw new Error('sentenceMatch: a right item sits at its left index (not a derangement)');
  if (picPx < 56) throw new Error(`sentenceMatch: picPx ${picPx} below the K-late floor 56`);
  const L = left.map((l, i) => `<div class="ws-match-item" data-lcs-match-left="${esc(l.frameId)}" data-lcs-key="${esc(l.key)}" data-lcs-form="${esc(l.form || 'sg')}" data-lcs-answer="${esc(l.answer)}" ` +
    `style="width:${leftW}px;height:${itemH}px;justify-content:flex-start;padding:0 12px"><span data-lcs-match-text style="font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:1.3;white-space:normal;color:${T.ink}">` +
    fillGap(l.text, gapBox({ w: blankW, h: 30, slim: true }), l.answer) + `</span><span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
  const R = order.map((o) => { const r = right[o]; return `<div class="ws-match-item ws-match-item--plain" data-lcs-match-right="${esc(r.key)}" style="width:${rightW}px;height:${itemH}px">` +
    icon(r.src, r.key, picPx) + `<span class="ws-match-dot ws-match-dot--left"></span></div>`; }).join('');
  return `<div class="ws-match" data-ws-content data-lcs-match data-lcs-pairs="${left.length}" style="padding:6px 30px"><div class="ws-match-col">${L}</div><div class="ws-match-col">${R}</div></div>`;
}

/** A derangement of 0..n-1 (no fixed point, not the reverse) drawn from `rng`; n < 2 throws. */
function derange(order, rng) {
  const n = order.length;
  if (n < 2) throw new Error('derange: needs >= 2 items');
  const rev = order.slice().reverse().join(',');
  for (let t = 0; t < 500; t++) {
    const p = rng.shuffle(order);
    if (p.some((v, i) => v === order[i])) continue;
    if (n > 2 && p.join(',') === rev) continue;
    return p;
  }
  throw new Error('derange: no derangement in 500 tries');
}

function gapBank({ words, rowOrder, order, rng, wordPx = 18 }) {
  if (!Array.isArray(words) || words.length < 2) throw new Error('gapBank: >= 2 words');
  if (new Set(words.map((w) => String(w).toLowerCase())).size !== words.length) throw new Error('gapBank: a bank word twice');
  const est = words.reduce((s, w) => s + pillEstimate(w, wordPx), 0);
  if (est > 2 * BANK_INNER) throw new Error(`gapBank: ${words.length} pills estimate ${Math.round(est)} px > two rows (${2 * BANK_INNER}) — refuse, never a third row`);
  const base = rowOrder || words.map((_, i) => i);
  if (base.length !== words.length) throw new Error('gapBank: rowOrder length');
  let d;
  if (order) {
    if (order.length !== base.length || order.slice().sort((a, b) => a - b).join(',') !== base.slice().sort((a, b) => a - b).join(',')) throw new Error('gapBank: order is not a permutation of rowOrder');
    if (order.some((v, i) => v === base[i])) throw new Error('gapBank: order has a fixed point (a pill at its row index)');
    if (base.length > 2 && order.join(',') === base.slice().reverse().join(',')) throw new Error('gapBank: order is the reverse of the rows');
    d = order;
  } else {
    if (!rng) throw new Error('gapBank: rng required without an order');
    d = derange(base, rng);
  }
  return `<div data-lcs-bank-order="${d.join(',')}">` + wordBank({ words: d.map((i) => ({ word: words[i] })), wordPx }) + `</div>`;
}

module.exports = { gapBox, letterGap, gapRow, choiceGap, cloneGapRow, storyBlock, sentenceMatch, gapBank, derange, pillEstimate, BANK_INNER };
