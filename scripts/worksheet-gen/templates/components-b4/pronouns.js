/**
 * components-b4/pronouns.js — the G1-352 `pronouns` family components (design
 * docs/worksheet-gen/b4-designs/G1-352-pronouns.md §2 "NEW
 * templates/components-b4/pronouns.js"). Merged into the
 * templates/components-b4.js namespace; HTML + the token palette only, no new
 * primitive (every drawing is a library picture, a page.css box, `writingRow`
 * or K-288's dashed bin lines); ground truth rides on data-lcs-* attributes;
 * the answer is never printed.
 *
 * Exports (exactly the NEW names the design file lists):
 *   portraitStrip({pics:[{src, key}], px, gap=8, w})
 *       `<div data-lcs-portraits="n">` flex row of 1..3 `img.ws-icon` at px
 *       (`flex:0 0 auto` — a 2 px shortfall can never shrink a picture),
 *       each `data-lcs-pic=<personKey>`. Throws on 0 or > 3 pictures, px < 36,
 *       or the same src twice.
 *   namePlate({text, px=18, h=26, attrs=''})
 *       `.ws-tile.ws-tile--word[data-lcs-plate]` (page.css:395-400: white,
 *       border 2 #F0E4CB, no shadow, Nunito 800, nowrap) at height h / font px /
 *       padding 0 10. Throws on empty text or px < 16.
 *   pronounChips({chips, correctIndex, count, w, fontPx, padTop=4, h=44})
 *       `articleChips` (components-b2.js:48, the K-288 stamp contract) inside a
 *       wrapper that overrides `.ws-achips` padding-top (4 base / 2 F3) — the
 *       width table: count 3|2 → w 84 / fontPx 24; count 4 → w 66 / fontPx 20;
 *       a caller may pass its own {w, fontPx} (F3); h 44 = the G1 floor (the d1
 *       ladder passes 52; anything < 44 throws).
 *       Asserts chips.length === count and correctIndex in range.
 *   portraitCard({pics, plate, chips, correctIndex, key, refs, names, pic, pairPic, plateH, plateFont, chipW, chipH, chipFont, gap=2, chipPad=2})
 *       the base card body: `.ws-card-stage[data-lcs-item]` (column, gap,
 *       padding 0) = portraitStrip + namePlate + pronounChips(padTop chipPad);
 *       stamps data-lcs-key / -refs / -names / -chip-key. DEVIATION (measured,
 *       _work/G1-352-build.md): the design's gap 3 / pad 4 stack (144) is 1 px
 *       over the card inner at the MEASURED 3-line-title + 3-line-instruction
 *       chrome (body 710, not the README's 722 → inner 143); gap 2 / pad 2 = 140.
 *   nameGapRow({pics, line1, line2, gapW=96, gapH=30, picPx=52, pairPx=48, frameId, num, key, answer})   (F1)
 *       `.ws-lane` (inline padding 6 16) on grid `100px 1fr`: the portrait(s)
 *       and two `<p>` Nunito 800 18 / 1.3; line 2 opens with a `.ws-blankbox`
 *       gapW × gapH. Stamps data-ws-content data-lcs-frame data-lcs-num
 *       data-lcs-key data-lcs-answer. Throws if line2 !== line1 minus its
 *       leading subject phrase.
 *   initialBank({words, rng, chipOrder})   (F1)
 *       `wordBank({words, wordPx:18})` over a shuffle that differs from
 *       chipOrder when words.length >= 3.
 *   anaphoraBlock({referents:[{pics, name, target}], intro, sentences:[{pronoun, rest, ref}], namesW=163, zone=70, platePx=16})   (F2)
 *       `.ws-lane` (padding 8 16) on grid `163px 70px 1fr`: two name rows
 *       (portraits 44 + namePlate 16 + a static `.ws-match-dot`
 *       data-lcs-target), the empty line zone, the intro `<p>` + two sentence
 *       rows (dot data-lcs-anchor + the pronoun in a teal `.ws-tile`
 *       data-lcs-pronoun + the rest). Throws if the two pronoun literals are
 *       equal, a name occurs in a sentence, or intro lacks either name.
 *   ownerLane({owners:{pics}, thing:{src, key}, frame, chips, correctIndex, chipW, num, ownerKey, thingKey, chipFont=20})   (F3)
 *       `.ws-lane` (padding 4 16) on grid `140px 1fr`: a 92 px owner box
 *       (single 44 centred / pair 2 × 44 + 4) + the thing at 44, then the frame
 *       `<p>` with ONE inline `.ws-blankbox` 64 × 24 over left-aligned chips.
 *       Throws if the frame lacks exactly one `___` or any chip literal occurs
 *       in the frame as a word.
 *   nameCardBins({cards:[{pics, caption, key}], bins:[{head, idx}], binLayout:'row'|'grid', binH, lineCounts})   (F4)
 *       the K-288 sortWords idiom on NAME cards: a 660 px shelf of 118 × 92
 *       `.ws-tile--word` cards (portraits + a 110 × 36 caption zone,
 *       data-lcs-sortword / data-lcs-key), then the bins — a flex row
 *       (`'row'`: floor(640 / n) − 12 wide × binH) or a 2 × 2 grid (`'grid'`:
 *       308 × binH, row gap 12) — each a `.ws-pill` head (data-lcs-sorthead) +
 *       a `.ws-bin` of `lineCounts[i]` dashed lines at
 *       gapY = min(58, floor((binH − 10) / (lineCount + 0.5))). Root
 *       `[data-lcs-layout="sort"][data-ws-content]`, padding-top 0. Throws if
 *       gapY < 34 or a bin's lineCount is below its load.
 *   rewriteLane({pics, sentence, w=535, h=48, glyphH=24, num, frameId, key, answer, picPx=56, pairPx=44})   (F5)
 *       grid `92px 1fr` (no lane chrome): the portrait(s) and the printed
 *       sentence `<p>` over a `writingRow({w, h, glyphH, xHeight:true})` in
 *       `[data-lcs-ruling-row][data-lcs-empty]`. Throws if the sentence
 *       contains the answer's pronoun as a word, or need(answer) > w.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { articleChips, wordBank } = require('../components-b2.js');
const { writingRow } = require('../../primitives/trace-path.js');

const T = tokens.color;
const F = tokens.font;
const CHIP_H = 44;                   // the G1 element floor; every chip row on this family
const WIDTHS = { 2: { w: 84, fontPx: 24 }, 3: { w: 84, fontPx: 24 }, 4: { w: 66, fontPx: 20 } };

function fold(s) { return String(s || '').trim().toLocaleLowerCase(); }
function hasWord(text, word) {
  const w = String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu').test(String(text));
}
/** The pencil space an answer needs on a writing row: glyphs × 0.75 × glyphH + 16. */
function need(answer, glyphH) { return [...String(answer)].length * 0.75 * glyphH + 16; }

/* ---------- portraitStrip ---------- */
function portraitStrip({ pics, px, gap = 8, w }) {
  if (!Array.isArray(pics) || pics.length < 1 || pics.length > 3) throw new Error(`portraitStrip: ${pics ? pics.length : 0} pictures (1..3)`);
  if (!(px >= 36)) throw new Error(`portraitStrip: px ${px} < 36`);
  const seen = new Set();
  for (const p of pics) {
    if (!p || !p.src || !p.key) throw new Error('portraitStrip: a picture without src/key');
    if (seen.has(p.src)) throw new Error(`portraitStrip: the same src twice (${p.key})`);
    seen.add(p.src);
  }
  const imgs = pics.map((p) => `<img class="ws-icon" src="${p.src}" alt="" data-lcs-pic="${esc(p.key)}" style="width:${px}px;height:${px}px;flex:0 0 auto">`).join('');
  return `<div data-lcs-portraits="${pics.length}" style="display:flex;gap:${gap}px;align-items:center;justify-content:center${w ? ';width:' + w + 'px' : ''}">${imgs}</div>`;
}

/* ---------- namePlate ---------- */
function namePlate({ text, px = 18, h = 26, attrs = '' }) {
  if (!text || !String(text).trim()) throw new Error('namePlate: empty text');
  if (!(px >= 16)) throw new Error(`namePlate: px ${px} < 16`);
  return `<span class="ws-tile ws-tile--word" data-lcs-plate ${attrs} style="height:${h}px;font-size:${px}px;padding:0 10px;justify-content:center;white-space:nowrap">${esc(text)}</span>`;
}

/* ---------- pronounChips ---------- */
function pronounChips({ chips, correctIndex, count, w, fontPx, padTop = 4, h = CHIP_H }) {
  if (!Array.isArray(chips) || chips.length !== count) throw new Error(`pronounChips: ${chips ? chips.length : 0} chips, count ${count}`);
  if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex >= count) throw new Error(`pronounChips: correctIndex ${correctIndex} out of range`);
  if (!(h >= CHIP_H)) throw new Error(`pronounChips: h ${h} < the G1 floor ${CHIP_H}`);
  const t = WIDTHS[count];
  if (!t && (w == null || fontPx == null)) throw new Error(`pronounChips: no width table for ${count} chips`);
  const W = w != null ? w : t.w, FP = fontPx != null ? fontPx : t.fontPx;
  return `<div data-lcs-chiprow style="padding-top:${padTop}px">` +
    articleChips({ chips, correctIndex, w: W, h, fontPx: FP }).replace('class="ws-achips"', 'class="ws-achips" style="padding-top:0"') + `</div>`;
}

/* ---------- portraitCard (base) ---------- */
function portraitCard({ pics, plate, chips, correctIndex, key, refs, names, pic, pairPic, plateH = 26, plateFont = 18, chipW, chipH, chipFont, gap = 2, chipPad = 2 }) {
  const px = pics.length > 1 ? pairPic : pic;
  const strip = portraitStrip({ pics, px });
  const nplate = namePlate({ text: plate, px: plateFont, h: plateH });
  const row = pronounChips({ chips, correctIndex, count: chips.length, w: chipW, fontPx: chipFont, padTop: chipPad, h: chipH });
  return `<div class="ws-card-stage" data-lcs-item data-lcs-key="${esc(key)}" data-lcs-refs="${esc(refs.join(','))}" data-lcs-names="${esc(names.join('|'))}" data-lcs-chip-key="${correctIndex}" ` +
    `style="flex-direction:column;gap:${gap}px;padding:0">${strip}${nplate}${row}</div>`;
}

/* ---------- nameGapRow (F1) ---------- */
function nameGapRow({ pics, line1, line2, gapW = 96, gapH = 30, picPx = 52, pairPx = 48, frameId, num, key, answer }) {
  if (!line1 || !line2) throw new Error('nameGapRow: both lines are required');
  // line 2 = line 1 minus its leading subject phrase (the box takes the subject's place)
  if (!String(line1).endsWith(String(line2)) || String(line1) === String(line2)) throw new Error(`nameGapRow: line2 "${line2}" is not line1 "${line1}" minus its leading subject`);
  const strip = portraitStrip({ pics, px: pics.length > 1 ? pairPx : picPx, gap: 4, w: 100 });
  const p = (inner, attrs) => `<p ${attrs} style="margin:0;font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:1.3;color:${T.ink};white-space:nowrap">${inner}</p>`;
  const box = `<span class="ws-blankbox" data-lcs-gapbox style="width:${gapW}px;height:${gapH}px;vertical-align:middle;margin:0 4px 0 0"></span>`;
  return `<div class="ws-lane" data-ws-content data-lcs-frame="${esc(frameId)}" data-lcs-num="${esc(num)}" data-lcs-key="${esc(key)}" data-lcs-answer="${esc(answer)}" ` +
    `style="padding:6px 16px;display:grid;grid-template-columns:100px 1fr;column-gap:12px;align-items:center;min-width:0">` +
    strip + `<div style="min-width:0">${p(esc(line1), 'data-lcs-line1')}${p(box + esc(line2), 'data-lcs-line2')}</div></div>`;
}

/* ---------- initialBank (F1) ---------- */
function initialBank({ words, rng, chipOrder }) {
  if (!Array.isArray(words) || words.length < 2) throw new Error('initialBank: < 2 words');
  const ref = (chipOrder || words).map(fold).join('|');
  let order = rng.shuffle(words);
  if (words.length >= 3) {
    let guard = 0;
    while (order.map(fold).join('|') === ref && guard++ < 50) order = rng.shuffle(words);
    if (order.map(fold).join('|') === ref) throw new Error('initialBank: could not shuffle away from the chip order');
  }
  return wordBank({ words: order.map((w) => ({ word: w })), wordPx: 18 });
}

/* ---------- anaphoraBlock (F2) ---------- */
function anaphoraBlock({ referents, intro, sentences, namesW = 163, zone = 70, platePx = 16 }) {
  if (!Array.isArray(referents) || referents.length !== 2) throw new Error('anaphoraBlock: exactly two referents');
  if (!Array.isArray(sentences) || sentences.length !== 2) throw new Error('anaphoraBlock: exactly two sentences');
  if (fold(sentences[0].pronoun) === fold(sentences[1].pronoun)) throw new Error(`anaphoraBlock: both sentences open with "${sentences[0].pronoun}" (no single solution)`);
  for (const r of referents) {
    if (!hasWord(intro, r.name)) throw new Error(`anaphoraBlock: intro lacks the name "${r.name}"`);
    for (const s of sentences) if (hasWord(s.rest, r.name)) throw new Error(`anaphoraBlock: the name "${r.name}" occurs in a sentence`);
  }
  const dot = (attrs) => `<span class="ws-match-dot" ${attrs} style="position:static;transform:none;flex:0 0 12px"></span>`;
  const rows = referents.map((r) => `<div data-lcs-referent="${esc(r.target)}" style="display:grid;grid-template-columns:auto 1fr 12px;column-gap:6px;align-items:center;height:44px">` +
    portraitStrip({ pics: r.pics, px: 44, gap: 4 }) + namePlate({ text: r.name, px: platePx, h: 26 }) + dot(`data-lcs-target="${esc(r.target)}"`) + `</div>`).join('');
  const pStyle = `margin:0;font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:1.3;color:${T.ink};white-space:nowrap`;
  const sent = sentences.map((s) => `<div data-lcs-anaphor data-lcs-ref="${esc(s.ref)}" style="display:flex;gap:8px;align-items:center;height:30px">` +
    dot('data-lcs-anchor') +
    `<span class="ws-tile" data-lcs-pronoun="${esc(s.pronoun)}" style="height:30px;font-size:18px;padding:0 10px">${esc(s.pronoun)}</span>` +
    `<span style="${pStyle}">${esc(s.rest)}</span></div>`).join('<div style="height:6px"></div>');
  return `<div class="ws-lane" data-ws-content data-lcs-pair data-lcs-a="${esc(referents[0].name)}" data-lcs-b="${esc(referents[1].name)}" ` +
    `style="padding:8px 16px;display:grid;grid-template-columns:${namesW}px ${zone}px 1fr;align-items:center;min-width:0">` +
    `<div style="display:flex;flex-direction:column;gap:8px">${rows}</div><div data-lcs-zone></div>` +
    `<div style="min-width:0"><p data-lcs-intro style="${pStyle};margin-bottom:6px">${esc(intro)}</p>${sent}</div></div>`;
}

/* ---------- ownerLane (F3) ---------- */
function ownerLane({ owners, thing, frame, chips, correctIndex, chipW, num, ownerKey, thingKey, chipFont = 20 }) {
  const parts = String(frame).split('___');
  if (parts.length !== 2) throw new Error(`ownerLane: the frame needs exactly one ___ ("${frame}")`);
  for (const c of chips) if (hasWord(frame, c)) throw new Error(`ownerLane: the chip "${c}" occurs in the frame`);
  const ownerBox = `<div style="width:92px;display:flex;justify-content:center">${portraitStrip({ pics: owners.pics, px: 44, gap: 4 })}</div>`;
  const thingImg = `<img class="ws-icon" src="${thing.src}" alt="" data-lcs-thing-pic="${esc(thing.key)}" style="width:44px;height:44px;flex:0 0 auto">`;
  const box = `<span class="ws-blankbox" data-lcs-gapbox style="width:64px;height:24px;vertical-align:middle;margin:0 4px"></span>`;
  const p = `<p data-lcs-frametext style="margin:0;font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:1.3;color:${T.ink};white-space:nowrap">${esc(parts[0])}${box}${esc(parts[1])}</p>`;
  const row = pronounChips({ chips, correctIndex, count: chips.length, w: chipW, fontPx: chipFont, padTop: 2 })
    .replace('style="padding-top:0"', 'style="padding-top:0;justify-content:flex-start"');
  return `<div class="ws-lane" data-ws-content data-lcs-item data-lcs-num="${esc(num)}" data-lcs-owner="${esc(ownerKey)}" data-lcs-thing="${esc(thingKey)}" data-lcs-chip-key="${correctIndex}" ` +
    `style="padding:4px 16px;display:grid;grid-template-columns:140px 1fr;column-gap:12px;align-items:center;min-width:0">` +
    `<div style="display:flex;align-items:center;gap:4px">${ownerBox}${thingImg}</div><div style="min-width:0">${p}${row}</div></div>`;
}

/* ---------- nameCardBins (F4) ---------- */
function nameCardBins({ cards, bins, binLayout = 'row', binH = 330, lineCounts }) {
  if (!Array.isArray(cards) || !cards.length) throw new Error('nameCardBins: no cards');
  if (!Array.isArray(bins) || bins.length < 2) throw new Error('nameCardBins: < 2 bins');
  if (!['row', 'grid'].includes(binLayout)) throw new Error(`nameCardBins: binLayout "${binLayout}"`);
  if (binLayout === 'row' && bins.length === 4) throw new Error('nameCardBins: 4 bins in a row are 148 px wide — use the grid');
  const loads = bins.map((b) => cards.filter((c) => c.key === b.idx).reduce((s, c) => s + (c.pics.length > 1 ? 2 : 1), 0));
  const counts = lineCounts || loads.map((l) => Math.max(4, l));
  const shelfCards = cards.map((c) => `<span class="ws-tile ws-tile--word" data-lcs-sortword="${esc(c.caption)}" data-lcs-key="${c.key}" ` +
    `style="width:118px;height:92px;flex-direction:column;justify-content:center;padding:4px;gap:2px;white-space:normal">` +
    portraitStrip({ pics: c.pics, px: c.pics.length > 1 ? 44 : 56, gap: 4 }) +
    `<span data-lcs-caption style="width:110px;height:36px;display:flex;align-items:center;justify-content:center;text-align:center;font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:1.15;color:${T.ink}">${esc(c.caption)}</span></span>`).join('');
  const shelf = `<div class="ws-card" data-lcs-shelf style="width:660px;padding:10px 12px;flex-direction:row;flex-wrap:wrap;justify-content:center;gap:10px">${shelfCards}</div>`;
  const binW = binLayout === 'grid' ? 308 : Math.floor(640 / bins.length) - 12;
  const binHtml = bins.map((b, i) => {
    const lineCount = counts[i];
    if (lineCount < loads[i]) throw new Error(`nameCardBins: bin ${i} has ${lineCount} lines for a load of ${loads[i]}`);
    const gapY = Math.min(58, Math.floor((binH - 10) / (lineCount + 0.5)));
    if (gapY < 34) throw new Error(`nameCardBins: bin ${i} gapY ${gapY} < 34 (re-deal)`);
    const lines = [];
    for (let k = 1; k <= lineCount; k++) lines.push(`<line x1="8" y1="${k * gapY}" x2="${binW - 14}" y2="${k * gapY}" stroke="${T.grid}" stroke-width="1.5" stroke-dasharray="3 5"/>`);
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px" data-lcs-sortbin="${b.idx}" data-lcs-gapy="${gapY}" data-lcs-lines="${lineCount}">` +
      `<span class="ws-pill" style="font-size:20px;padding:2px 18px" data-lcs-sorthead="${b.idx}">${esc(b.head)}</span>` +
      `<div class="ws-bin" style="width:${binW}px;height:${binH}px;max-width:${binW}px;padding:0"><svg width="${binW - 6}" height="${binH - 5}" viewBox="0 0 ${binW - 6} ${binH - 5}" aria-hidden="true">${lines.join('')}</svg></div></div>`;
  }).join('');
  const binsWrap = binLayout === 'grid'
    ? `<div style="display:grid;grid-template-columns:repeat(2,308px);column-gap:12px;row-gap:12px;justify-content:center">${binHtml}</div>`
    : `<div style="display:flex;gap:12px;justify-content:center">${binHtml}</div>`;
  return `<div data-lcs-layout="sort" data-ws-content data-lcs-binlayout="${binLayout}" style="flex:1;display:flex;flex-direction:column;gap:18px;align-items:center;justify-content:flex-start;padding-top:0">${shelf}${binsWrap}</div>`;
}

/* ---------- rewriteLane (F5) ---------- */
function rewriteLane({ pics, sentence, w = 535, h = 48, glyphH = 24, num, frameId, key, answer, picPx = 56, pairPx = 44 }) {
  const pron = String(answer).split(/\s+/)[0];
  if (hasWord(sentence, pron)) throw new Error(`rewriteLane: the sentence prints the answer's pronoun "${pron}"`);
  if (need(answer, glyphH) > w) throw new Error(`rewriteLane: "${answer}" needs ${need(answer, glyphH)} px > ${w}`);
  const strip = portraitStrip({ pics, px: pics.length > 1 ? pairPx : picPx, gap: 4, w: 92 });
  const p = `<p data-lcs-sentence style="margin:0 0 6px;font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:1.3;color:${T.ink};white-space:nowrap">${esc(sentence)}</p>`;
  const row = writingRow({ w, h, glyphH, xHeight: true }).svg;
  return `<div data-ws-content data-lcs-frame="${esc(frameId)}" data-lcs-num="${esc(num)}" data-lcs-key="${esc(key)}" data-lcs-answer="${esc(answer)}" ` +
    `style="display:grid;grid-template-columns:92px 1fr;column-gap:12px;align-items:center;min-width:0">` +
    strip + `<div style="min-width:0">${p}<div data-lcs-ruling-row data-lcs-empty style="line-height:0">${row}</div></div></div>`;
}

module.exports = { portraitStrip, namePlate, pronounChips, portraitCard, nameGapRow, initialBank, anaphoraBlock, ownerLane, nameCardBins, rewriteLane };
