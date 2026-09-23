/**
 * components-b5/synonyms.js — the G2-358 `synonyms` components (nt10-E; design
 * docs/worksheet-gen/b5-designs/G2-358-synonyms.md §2). Every export is
 * prefixed `syn` (templates/components-b5.js refuses a duplicate name across
 * the ten families). Palette tokens only; every function throws on a missing
 * required argument.
 *
 * BASE (built 2026-09-23):
 *   synSameLink({w, h, ground})   the teal JOINED-RINGS mark: two interlocking rounded
 *                                 rings (A passes over B once and under it once), the
 *                                 semantic inverse of the opposites double arrow.
 *                                 Decorative (aria-hidden); min 24 x 14, stroke stays 3.
 *   synTwinGrid({cards, rows, rowMin, rowGap})
 *                                 the 2-column card grid (cardGrid's .ws-cardgrid /
 *                                 .ws-card / .ws-card-badge markup) with a configurable
 *                                 row gap and minmax(rowMin, 1fr) rows — cardGrid
 *                                 hard-codes minmax(0,1fr) + gap 14 and .ws-card is
 *                                 overflow:hidden (a silent clip at the 677 chrome).
 *                                 Cards spread their slack with space-evenly.
 *   synTwinCard({target, groupId, domain, concept, tags, answerSlot, targetPx, chipPx, chipH, grid})
 *                                 the tealSoft BAND (rings + one big target word) over a
 *                                 square of identical white word TAGS (grid '2x2' = 4
 *                                 tags, '3x1' = 3 stacked tags). No data-lcs-answer: the
 *                                 answer is DERIVED (the one tag whose group = the target's).
 *
 * FACES (Phase 2, not built here): synPictureCard, synStrengthKey, synRamp, synShadeRow,
 * synSayBubble, synSayRow, synFieldPlot, and F2's half-ring tags (synLinkTag; the sock was
 * RETIRED 2026-09-23 by lead ruling — it read as a luggage tag in greyscale).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');

const T = tokens.color;
const F = tokens.font;
const GROUNDS = [T.tealSoft, T.cream, T.white];
const MAX_GLYPHS = { '2x2': 13, '3x1': 13 };

function glyphs(s) { return [...String(s)].length; }

function synSameLink({ w = 30, h = 18, ground = T.tealSoft } = {}) {
  if (!GROUNDS.map((g) => g.toUpperCase()).includes(String(ground).toUpperCase())) throw new Error(`synSameLink: ground ${ground} is not tealSoft / cream / white`);
  if (w < 24 || h < 14) throw new Error(`synSameLink: ${w} x ${h} below the 24 x 14 minimum`);
  const sw = 3 * 30 / w;   // the stroke stays 3 px at any drawn size
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 30 18" aria-hidden="true" data-lcs-same-link="1" style="display:block;flex:0 0 ${w}px;overflow:visible">` +
    `<rect x="1.5" y="3" width="17" height="12" rx="6" fill="none" stroke="${T.teal}" stroke-width="${sw.toFixed(2)}"/>` +
    `<rect x="11.5" y="3" width="17" height="12" rx="6" fill="none" stroke="${T.teal}" stroke-width="${sw.toFixed(2)}"/>` +
    `<rect x="12.5" y="1.5" width="4" height="3" fill="${ground}" stroke="none"/>` +
    `<path d="M13 3 H 12.5 A6 6 0 0 1 18.5 9" fill="none" stroke="${T.teal}" stroke-width="${sw.toFixed(2)}"/>` +
    `</svg>`;
}

function synTwinGrid({ cards, rows, rowMin, rowGap = 12, colGap = 14, attrs = '' }) {
  if (!Array.isArray(cards) || !cards.length) throw new Error('synTwinGrid: cards[] required');
  if (!Number.isInteger(rows) || rows * 2 < cards.length) throw new Error(`synTwinGrid: ${cards.length} cards do not fit ${rows} rows x 2`);
  if (!Number.isFinite(rowMin) || rowMin <= 0) throw new Error('synTwinGrid: rowMin required');
  const items = cards.map((inner, i) => `<section class="ws-card" data-lcs-card="${i + 1}" style="justify-content:space-evenly;padding:12px">` +
    `<span class="ws-card-badge">${i + 1}</span>${inner}</section>`).join('\n');
  return `<div class="ws-cardgrid" data-lcs-syn-grid${attrs ? ' ' + attrs : ''} style="grid-template-columns:repeat(2,minmax(0,1fr));` +
    `grid-template-rows:repeat(${rows},minmax(${rowMin}px,1fr));column-gap:${colGap}px;row-gap:${rowGap}px">\n${items}\n</div>`;
}

function synTwinCard({ target, groupId, domain, concept, tags, answerSlot, targetPx = 24, chipPx = 18, chipH = 36, grid = '2x2', maxGlyphs = 13 }) {
  if (!target || !groupId || !domain || !concept) throw new Error('synTwinCard: target / groupId / domain / concept are required');
  if (!['2x2', '3x1'].includes(grid)) throw new Error(`synTwinCard: grid ${grid} is not 2x2 / 3x1`);
  const n = grid === '2x2' ? 4 : 3;
  if (!Array.isArray(tags) || tags.length !== n) throw new Error(`synTwinCard: grid ${grid} needs ${n} tags, got ${tags && tags.length}`);
  if (!Number.isInteger(answerSlot) || answerSlot < 0 || answerSlot >= n) throw new Error(`synTwinCard: answerSlot ${answerSlot} outside 0..${n - 1}`);
  if (tags[answerSlot].groupId !== groupId) throw new Error(`synTwinCard: the tag in answerSlot ${answerSlot} is not of the target's group`);
  const cap = Math.min(maxGlyphs, MAX_GLYPHS[grid]);
  for (const w of [target, ...tags.map((t) => t.word)]) if (glyphs(w) > cap) throw new Error(`synTwinCard: "${w}" has ${glyphs(w)} glyphs > ${cap} (refuse, never shrink)`);
  if (chipH < 36) throw new Error(`synTwinCard: chipH ${chipH} below the G2 floor 36`);
  if (chipPx < 16) throw new Error(`synTwinCard: chipPx ${chipPx} below 16`);
  const band = `<div data-lcs-band style="display:flex;align-items:center;gap:8px;padding:0 10px 0 36px;height:40px;flex:0 0 40px;box-sizing:border-box;background:${T.tealSoft};border-radius:10px">` +
    synSameLink({ ground: T.tealSoft }) +
    `<span data-lcs-target-word style="font-family:${F.display},cursive;font-weight:700;font-size:${targetPx}px;line-height:1;color:${T.teal};white-space:nowrap">${esc(target)}</span></div>`;
  const cols = grid === '2x2' ? 'minmax(0,1fr) minmax(0,1fr)' : 'minmax(0,1fr)';   // a long word never widens its column: it overflows and verify names it
  const tagHtml = tags.map((t, i) => `<span class="ws-achip" data-lcs-tag data-lcs-group="${esc(t.groupId)}" data-lcs-slot="${i}" ` +
    `style="width:100%;height:${chipH}px;border-radius:12px;padding:0 8px;font-size:${chipPx}px;box-sizing:border-box;white-space:nowrap;line-height:1">` +
    `<span data-lcs-word>${esc(t.word)}</span></span>`).join('');
  const square = `<div data-lcs-square data-lcs-grid="${grid}" style="display:grid;grid-template-columns:${cols};column-gap:14px;row-gap:10px;margin-top:8px">${tagHtml}</div>`;
  return `<div data-lcs-twin data-lcs-target="${esc(groupId + ':' + target)}" data-lcs-concept="${esc(concept)}" data-lcs-domain="${esc(domain)}" style="display:contents">${band}${square}</div>`;
}

/* ============================================================== FACES (Phase E, 2026-09-23) */
const { gapBox } = require('../components-b4/cloze.js');
const { blankNumeralBox } = require('../components-b3/ordinal-numbers.js');
const { rulingBlock } = require('../components-b2.js');

function tagSpan({ word, groupId, slot, chipH, chipPx, radius = 12, pad = 8, extra = '' }) {
  return `<span class="ws-achip" data-lcs-tag data-lcs-group="${esc(groupId)}" data-lcs-slot="${slot}"${extra ? ' ' + extra : ''} ` +
    `style="width:100%;height:${chipH}px;border-radius:${radius}px;padding:0 ${pad}px;font-size:${chipPx}px;box-sizing:border-box;white-space:nowrap;line-height:1">` +
    `<span data-lcs-word>${esc(word)}</span></span>`;
}

/**
 * F1 — synPictureCard: a white picture frame (the picture carries the meaning; the rings mark
 * sits top-right) over a 2 x 2 square of four identical tags; TWO tags share the pictured
 * concept's group. No data-lcs-answer: verify derives the answers from the group stamps.
 */
function synPictureCard({ pic, groupId, tags, picPx = 74, picMaxW = 220, chipPx = 19, chipH = 44, frameH = 80, maxGlyphs = 11 }) {
  if (!pic || !pic.src || !pic.theme || !pic.noun || !pic.concept) throw new Error('synPictureCard: pic {src, theme, noun, concept} is required');
  if (!groupId) throw new Error('synPictureCard: groupId is required');
  if (!Array.isArray(tags) || tags.length !== 4) throw new Error(`synPictureCard: 4 tags required, got ${tags && tags.length}`);
  if (tags.filter((t) => t.groupId === groupId).length !== 2) throw new Error('synPictureCard: exactly two tags must share the picture\'s group');
  for (const t of tags) if (glyphs(t.word) > maxGlyphs) throw new Error(`synPictureCard: "${t.word}" has ${glyphs(t.word)} glyphs > ${maxGlyphs} (refuse, never shrink)`);
  if (chipH < 44) throw new Error(`synPictureCard: chipH ${chipH} below the G1 floor 44`);
  if (picPx < 44) throw new Error(`synPictureCard: picture height ${picPx} below the G1 floor 44`);
  // Fit the picture by its DRAWN CONTENT, not its square bitmap: `pic.box` = the measured content box
  // [x0, y0, x1, y1] (fractions of the bitmap). The img box is picPx high and as wide as the content needs
  // (<= picMaxW); object-fit:cover scales by the box width, so a wide picture (the race car, content
  // 0.95 x 0.385) fills the frame width instead of shrinking to a 40 px strip inside a square.
  const bx = pic.box || [0, 0, 1, 1];
  const cw = bx[2] - bx[0], ch = bx[3] - bx[1];
  let h = picPx, w = Math.min(picMaxW, Math.max(h, h / ch));
  if (w * ch < h * 0.999 && w === picMaxW) h = Math.max(44, Math.round(w * ch));
  w = Math.round(w);
  const win = h / w, cy = (bx[1] + bx[3]) / 2;
  const ypos = win >= 1 ? 50 : Math.max(0, Math.min(100, ((cy - win / 2) / (1 - win)) * 100));
  const frame = `<div data-lcs-picframe style="position:relative;display:flex;align-items:center;justify-content:center;height:${frameH}px;flex:0 0 ${frameH}px;box-sizing:border-box;background:${T.white};border:2px solid ${T.teal};border-radius:12px">` +
    `<img class="ws-icon" src="${pic.src}" alt="" data-lcs-pic-img data-lcs-pic-box="${bx.join(',')}" style="width:${w}px;height:${h}px;flex:0 0 ${w}px;object-fit:cover;object-position:50% ${ypos.toFixed(1)}%">` +
    `<span style="position:absolute;right:8px;top:6px">${synSameLink({ ground: T.white })}</span></div>`;
  const square = `<div data-lcs-square data-lcs-grid="2x2" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:14px;row-gap:10px">` +
    tags.map((t, i) => tagSpan({ word: t.word, groupId: t.groupId, slot: i, chipH, chipPx })).join('') + `</div>`;
  return `<div data-lcs-piccard data-lcs-pic="${esc(pic.theme + '/' + pic.noun)}" data-lcs-concept="${esc(pic.concept)}" data-lcs-group="${esc(groupId)}" style="display:contents">${frame}${square}</div>`;
}

/**
 * F2 — synLinkTag: a white word tag (.ws-match-item) with a teal HALF-RING on its inner edge
 * (left column: the ring opens to the right; right column: to the left) and the coral match
 * dot beyond that edge. Replaces the retired sock (lead ruling 2026-09-23). Same size for
 * every tag on the page, so no width marks a partner.
 */
function synLinkTag({ word, groupId, side, w = 210, h = 64, wordPx = 20, attrs = '' }) {
  if (!word || !groupId) throw new Error('synLinkTag: word / groupId required');
  if (!['left', 'right'].includes(side)) throw new Error(`synLinkTag: side ${side}`);
  if (glyphs(word) > 14) throw new Error(`synLinkTag: "${word}" has ${glyphs(word)} glyphs > 14 (refuse, never shrink)`);
  if (h < 36) throw new Error(`synLinkTag: h ${h} below the G2 floor 36`);
  const ring = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="28" viewBox="0 0 16 28" aria-hidden="true" data-lcs-half-ring="${side}" ` +
    `style="position:absolute;top:50%;${side === 'left' ? 'right:6px' : 'left:6px'};transform:translateY(-50%)${side === 'right' ? ' scaleX(-1)' : ''}">` +
    `<path d="M2 3 A 11 11 0 0 1 2 25" fill="none" stroke="${T.teal}" stroke-width="3" stroke-linecap="round"/></svg>`;
  const stamp = side === 'left' ? `data-lcs-match-left="${esc(groupId)}"` : `data-lcs-match-right="${esc(groupId)}"`;
  return `<div class="ws-match-item ws-match-item--plain" ${stamp}${attrs ? ' ' + attrs : ''} style="width:${w}px;flex:1 1 ${h}px;min-height:${h}px;max-height:${h + 16}px;box-sizing:border-box;border:2.5px solid ${T.teal};border-radius:14px;` +
    `padding:0 ${side === 'left' ? 28 : 12}px 0 ${side === 'left' ? 12 : 28}px">` +
    `<span data-lcs-link-word style="font-family:${F.body},sans-serif;font-weight:800;font-size:${wordPx}px;line-height:1;color:${T.ink};white-space:nowrap">${esc(word)}</span>` +
    ring + `<span class="ws-match-dot ws-match-dot--${side === 'left' ? 'right' : 'left'}"></span></div>`;
}

/** F2 — the two columns (.ws-match). */
function synPairMatch({ left, right, w = 210, h = 64, wordPx = 20 }) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length || !left.length) throw new Error('synPairMatch: two equal non-empty columns required');
  const col = (items, side) => `<div class="ws-match-col" data-lcs-col="${side}" style="gap:12px">` + items.map((x) => synLinkTag({ word: x.word, groupId: x.groupId, side, w, h, wordPx })).join('') + `</div>`;
  return `<div class="ws-match" data-lcs-pairs style="padding:6px 30px;min-height:0">${col(left, 'left')}${col(right, 'right')}</div>`;
}

/** F3 — the strength key (once per page): three growing blocks, numerals 1 2 3 under them (the fixed legend). */
function synStrengthKey({ w = 280, h = 56 } = {}) {
  const fills = [[T.tealSoft, 1], [T.teal, 0.5], [T.teal, 1]];
  const hs = [12, 22, 34];
  let body = '';
  for (let i = 0; i < 3; i++) {
    body += `<rect x="${i * 100}" y="${34 - hs[i]}" width="80" height="${hs[i]}" rx="4" fill="${fills[i][0]}"${fills[i][1] < 1 ? ` fill-opacity="${fills[i][1]}"` : ''} stroke="${T.teal}" stroke-width="1.5"/>`;
    body += `<text x="${i * 100 + 40}" y="54" text-anchor="middle" font-family="${F.display}" font-weight="700" font-size="18" fill="${T.ink}" data-lcs-key-numeral="${i + 1}">${i + 1}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 280 56" data-lcs-strength-key="1" role="img" aria-label="1 2 3" style="display:block;flex:0 0 ${h}px;margin:0 auto;overflow:visible">${body}</svg>`;
}

/** F3 — the row lead: the same three blocks, scaled, no numerals. */
function synRamp({ w = 48, h = 32 } = {}) {
  const hs = [11, 21, 32], xs = [0, 17, 34];
  const fills = [[T.tealSoft, 1], [T.teal, 0.5], [T.teal, 1]];
  let body = '';
  for (let i = 0; i < 3; i++) body += `<rect x="${xs[i]}" y="${32 - hs[i]}" width="14" height="${hs[i]}" rx="2" fill="${fills[i][0]}"${fills[i][1] < 1 ? ` fill-opacity="${fills[i][1]}"` : ''} stroke="${T.teal}" stroke-width="1"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 48 32" aria-hidden="true" data-lcs-ramp="1" style="display:block">${body}</svg>`;
}

/**
 * F3 — one shade row: the ramp, then three cells (a tag over an open numeral box). The printed
 * order is a derangement of the stored weakest -> strongest order; each box carries its rank as
 * ground truth (data-lcs-answer, never printed).
 */
function synShadeRow({ scaleId, cells, chipPx = 20, chipH = 44, box = [40, 32], maxGlyphs = 12 }) {
  if (!scaleId || !Array.isArray(cells) || cells.length !== 3) throw new Error('synShadeRow: scaleId + 3 cells required');
  for (const c of cells) if (glyphs(c.word) > maxGlyphs) throw new Error(`synShadeRow: "${c.word}" has ${glyphs(c.word)} glyphs > ${maxGlyphs}`);
  if (chipH < 44) throw new Error(`synShadeRow: chipH ${chipH} below the G1 floor 44`);
  const cellHtml = cells.map((c, i) => `<div data-lcs-shade-cell="${i}" style="display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">` +
    `<span class="ws-achip" data-lcs-shade-word style="width:100%;height:${chipH}px;padding:0 14px;font-size:${chipPx}px;border-radius:22px;box-sizing:border-box;white-space:nowrap;line-height:1">${esc(c.word)}</span>` +
    blankNumeralBox({ w: box[0], h: box[1], answer: String(c.rank), attrs: 'data-lcs-rank-box' }) + `</div>`).join('');
  return `<div class="ws-lane" data-ws-content data-lcs-scale="${esc(scaleId)}" data-lcs-order="${esc(JSON.stringify(cells.map((c) => c.rank)))}" ` +
    `style="padding:4px 16px;display:grid;grid-template-columns:48px repeat(3,minmax(0,1fr));column-gap:16px;align-items:center;flex:1 1 0;min-height:0">` +
    `<div style="display:flex;align-items:center;justify-content:center">${synRamp()}</div>${cellHtml}</div>`;
}

/** Nunito 800 pill estimate (the cloze pill estimate, px scaled). */
function pillW(word, px) { return 32 + 0.57 * px * glyphs(word) + 10; }
const BUBBLE_INNER = 642;

/**
 * F4 — the speech bubble: the struck head word (never an answer) and the six field words.
 * Own two-row guard: head + pills must fit two rows of the 642 px bubble inner, else REFUSE.
 */
function synSayBubble({ head, words, wordPx = 18, headPx = 20, rowsMax = 2 }) {
  if (!head || !Array.isArray(words) || !words.length) throw new Error('synSayBubble: head + words required');
  const need = pillW(head, headPx) + words.reduce((a, w) => a + pillW(w, wordPx), 0) + 10 * words.length;
  if (need > rowsMax * BUBBLE_INNER) throw new Error(`synSayBubble: head + ${words.length} words need ${Math.round(need)} px > ${rowsMax} rows x ${BUBBLE_INNER} — refuse (never a third row)`);
  const tail = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16" aria-hidden="true" data-lcs-bubble-tail style="position:absolute;left:44px;bottom:-16px;overflow:visible">` +
    `<path d="M0 0 L24 0 L4 16 Z" fill="${T.white}"/><path d="M0 0 L4 16 L24 0" fill="none" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
  const headHtml = `<span data-lcs-head style="display:inline-flex;align-items:center;padding:0 6px;font-family:${F.display},cursive;font-weight:700;font-size:${headPx}px;color:${T.inkSoft};text-decoration:line-through;text-decoration-thickness:3px;text-decoration-color:${T.coral}">${esc(head)}</span>`;
  const pills = words.map((w) => `<span class="ws-bankword" data-lcs-bank-word="${esc(w)}" style="font-size:${wordPx}px">${esc(w)}</span>`).join('');
  return `<div data-lcs-bank-banner data-lcs-say-head="${esc(head)}" data-lcs-bank-order="${esc(JSON.stringify(words))}" ` +
    `style="position:relative;flex:0 0 auto;border:2.5px solid ${T.teal};border-radius:18px;background:${T.white};padding:10px 14px;margin-bottom:26px;` +
    `display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 10px">${headHtml}${pills}${tail}</div>`;
}

/** F4 — one sentence lane: the number disc, the sentence with ONE open gap box (the answer rides on the box stamp). */
function synSayRow({ n, sentenceId, pre, post, answer, gapW, fontPx = 18 }) {
  if (!sentenceId || !answer || !Number.isFinite(gapW)) throw new Error('synSayRow: sentenceId / answer / gapW required');
  const disc = `<span data-lcs-disc style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:16px;line-height:1">${n}</span>`;
  const gap = gapBox({ w: gapW, h: 40, attrs: `data-lcs-answer="${esc(answer)}"` });
  return `<div class="ws-lane" data-ws-content data-lcs-say-row="${n}" data-lcs-sentence-id="${esc(sentenceId)}" ` +
    `style="padding:5px 16px;display:grid;grid-template-columns:30px minmax(0,1fr);column-gap:12px;align-items:center;flex:1 1 0;min-height:0">${disc}` +
    `<p data-lcs-sentence style="margin:0;min-width:0;font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:1.3;color:${T.ink}">${esc(pre)}${gap}${esc(post)}</p></div>`;
}

/** F5 — a fenced word field: picket fence, a sign with the rings and the head verb in quotes, six empty writing rows. */
function synFieldPlot({ fieldId, head, quotes, rows = 6, w = 301, rowH = 52, glyphH = 28, headPx = 24 }) {
  if (!fieldId || !head || !Array.isArray(quotes) || quotes.length !== 2) throw new Error('synFieldPlot: fieldId / head / quotes required');
  let pickets = '';
  for (let x = 4; x + 8 <= 325; x += 16) pickets += `<path d="M${x} 18 V6 L${x + 4} 1 L${x + 8} 6 V18 Z" fill="${T.white}" stroke="${T.teal}" stroke-width="2" stroke-linejoin="round"/>`;
  const fence = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="18" viewBox="0 0 329 18" preserveAspectRatio="none" aria-hidden="true" data-lcs-fence style="display:block;flex:0 0 18px">` +
    `<line x1="0" y1="11" x2="329" y2="11" stroke="${T.teal}" stroke-width="2"/>${pickets}</svg>`;
  const sign = `<div data-lcs-field-sign style="display:flex;align-items:center;justify-content:center;gap:10px;height:40px;flex:0 0 40px;background:${T.tealSoft};border-radius:10px;padding:0 14px;margin-top:4px">` +
    synSameLink({ ground: T.tealSoft }) + `<span data-lcs-field-head style="font-family:${F.display},cursive;font-weight:700;font-size:${headPx}px;line-height:1;color:${T.teal};white-space:nowrap">${esc(quotes[0] + head + quotes[1])}</span></div>`;
  const ruling = rulingBlock({ rows, w, h: rowH, glyphH }).replace('style="display:flex;flex-direction:column;gap:6px"', 'data-lcs-field-lines style="display:flex;flex-direction:column;justify-content:space-evenly;gap:6px;flex:1 1 auto;min-height:0;margin-top:4px"');
  return `<div data-ws-content data-lcs-field="${esc(fieldId)}" data-lcs-lines="${rows}" style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:0 12px">${fence}${sign}${ruling}</div>`;
}

/** F5 — the word pile (the field words, each stamped with its field; the head verbs are never pills). */
function synWordPile({ words, wordPx = 18 }) {
  if (!Array.isArray(words) || !words.length) throw new Error('synWordPile: words required');
  return `<div class="ws-scene-banner ws-bank" data-lcs-pile style="flex:0 0 auto;margin-bottom:12px">` +
    words.map((w) => `<span class="ws-bankword" data-lcs-bank-word="${esc(w.word)}" data-lcs-pile-field="${esc(w.field)}" style="font-size:${wordPx}px">${esc(w.word)}</span>`).join('') + `</div>`;
}

module.exports = { synSameLink, synTwinGrid, synTwinCard, synPictureCard, synLinkTag, synPairMatch, synStrengthKey, synRamp, synShadeRow, synSayBubble, synSayRow, synFieldPlot, synWordPile };
