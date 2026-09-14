/**
 * components-b3/rhyming-words.js — the G1-309 `rhyming-words` family
 * components (design: docs/worksheet-gen/b3-designs/G1-309-rhyming-words.md
 * §2 "NEW in templates/components-b3.js"). Merged into the
 * templates/components-b3.js namespace. The four BASE components
 * (`rhymeMark`, `anchorTile`, `choiceRing`, `rhymeRow`) are unchanged since
 * the base build; the six FACE components the design names (`yesNoChips`,
 * `pairCardRhyme`, `rhymeBins`, `coupletCard`, `stringLane`, `ownRhymeCard`)
 * plus two bank helpers (`rhymeBank`, `stringBank` — the b2 `numberedBank` /
 * `wordBank` markup re-emitted with the class / word / role stamps the face
 * gates re-derive from; components-b2.js and the sibling's numberedBank are
 * never edited) were added in Phase 2 (2026-09-14, _work/G1-309-faces.md).
 *
 *   rhymeMark({ px = 20 })
 *     The "say it" cue: three teal arcs (design paths `M6 5 q6 5 0 10`,
 *     `M9 2 q10 8 0 16`, `M12 -1 q14 11 0 22`), T.teal 2.5, round caps, no
 *     letters, aria-hidden — decoration, never an answer. The design box is
 *     20 wide; the outer arc runs from y −1 to 21, so the svg is 20×24 with a
 *     viewBox starting at y −2 (nothing is clipped).
 *
 *   anchorTile({ src, tile = 76, px = 64 })
 *     The framed ANCHOR picture: a WHITE `tile`×`tile` box, T.teal 2 solid,
 *     r 12, one `.ws-icon` at `px`. No stamp of its own — the row's stage
 *     carries `data-lcs-anchor` / `data-lcs-class` (rhymeRow).
 *
 *   choiceRing({ src, tile = 76, px = 60, vocabKey, cls, word, rhyme, foil })
 *     One CHOICE: a white `tile`×`tile` disc with a T.grid 1.5 DASHED ring
 *     (the circle target — the child traces it round the picture that
 *     rhymes), one `.ws-icon` at `px`. All three rings of a row are
 *     identical; nothing marks the answer. Stamps `data-lcs-choice`
 *     (vocabKey), `data-lcs-class` (the choice's rhyme class; '' for a
 *     near-miss foil that is a member of no class), `data-lcs-word` (the
 *     citation word the answer key prints), `data-lcs-rhyme="1|0"`,
 *     `data-lcs-foil="1"` on a d3 near-miss foil.
 *
 *   rhymeRow({ anchor, choices, lane, anchorTile, anchorPx, choiceTile,
 *              choicePx, badgeGap = 20, gap = 10, laneGap = 14 })
 *     The base's row body: `<div class="ws-card-stage" data-ws-content
 *     data-lcs-anchor data-lcs-class data-lcs-anchor-word>` — [anchorTile]
 *     [rhymeMark] [choices…] [lane], one flex row, vertically centred, the
 *     lane pushed to the right edge (margin-left:auto) so the card's slack
 *     opens between the rings and the lane, never inside the ring group.
 *     `badgeGap` = margin-left on the anchor so its ink clears the 30 px
 *     `.ws-card-badge` (0 on the K shape, which drops the badge). The lane is
 *     one `writingRow` (x-height school lines, `data-lcs-prim="writing-row"`)
 *     or, when `lane.starter` is set (d1), a one-row `rulingBlock` printing
 *     the first glyph of the answer in inkSoft (`data-lcs-starter`) — the
 *     scaffold the design puts on d1 only. The written word appears NOWHERE
 *     on the row: the lane prints nothing else.
 *
 *   ---- Phase 2 face components (design §3) ----
 *
 *   yesNoChips({ px = 56, gap = 14 })                                     F1 K-352 `mode:'judge'`
 *     Two identical white `.ws-chip` discs (inline width/height px) holding an
 *     inline SVG check (`M14 27 l9 9 l17 -18`) / cross (`M16 16 l20 20 M36 16
 *     l-20 20`) in T.teal 3.5 — BOTH teal (a coral X is the house "crossed
 *     out" and would read as a verdict), no text. `data-lcs-chip="yes|no"`.
 *   pairCardRhyme({ a, b, px, rhyme, chipPx, markPx = 24 })                F1 card
 *     `.ws-card-stage[data-ws-content][data-lcs-pair]` stamped data-lcs-a / -b
 *     (vocabKeys), -class-a / -class-b, -word-a / -word-b, data-lcs-rhyme="1|0":
 *     [img px][rhymeMark markPx][img px] over yesNoChips. Nothing marks the
 *     answer; both chips are identical.
 *   rhymeBank({ items, iconPx = 64, gap = 14 })                              F2 G1-343 bank
 *     A `.ws-scene-banner` of numbered pictures (countBadge at the corner),
 *     data-lcs-numbered-bank on the banner; each item data-lcs-bank-index
 *     (1-based) / -vocab / -class / -word. No word is printed.
 *   rhymeBins({ bins, colW, laneW, laneH, glyphH, headTile, headPx, gap = 15 })  F2 columns
 *     A grid of `bins.length` `.ws-lane` columns (inline padding 10 8 -> inner
 *     colW − 20), each `data-ws-content data-lcs-bin data-lcs-class
 *     data-lcs-anchor data-lcs-anchor-word`: an anchorTile head (picture only)
 *     and `n` EMPTY writingRows spread evenly down the column (the columns
 *     stretch to the body, so the page reads as three sorting mats).
 *   coupletCard({ pic, line1, pre, post, rhymeWith, answer, laneW, laneH, glyphH, fontPx,
 *                 tile, px })                                              F3 G1-344 row
 *     `.ws-lane` (inline padding 8 16 -> inner 639) `data-ws-content
 *     data-lcs-couplet data-lcs-answer data-lcs-answer-word data-lcs-class
 *     data-lcs-rhyme-with`: [anchorTile tile/px = the answer's picture cue]
 *     [text column: <p data-lcs-verse="1"> Nunito 800 fontPx, then <p
 *     data-lcs-verse="2"> = pre + an inline EMPTY writingRow + post]. The
 *     answer word appears nowhere; line 1 carries the printed rhyme partner.
 *   stringBank({ words, wordPx = 18 })                                       F4 G1-345 bank
 *     The b2 wordBank markup (`.ws-scene-banner.ws-bank` / `.ws-bankword`)
 *     with data-lcs-bank-word / -bank (vocabKey) / -class / -role="answer|foil".
 *   stringLane({ anchor, n, laneW, laneH, glyphH, tile, px, gap = 14 })      F4 row
 *     `.ws-lane` (inline padding 8 16) `data-ws-content data-lcs-string
 *     data-lcs-anchor data-lcs-class data-lcs-anchor-word data-lcs-answers`
 *     (the two bank words, "|"-joined): [anchorTile] [n EMPTY writingRows
 *     SIDE BY SIDE — a rhyme string reads left to right: cat → hat → bat;
 *     100 + 14 + 2 × 250 + 14 = 628 <= 639]. The anchor's own word is
 *     printed nowhere.
 *   ownRhymeCard({ pic, word, wordPx, px, lines, laneW, laneH, glyphH, badgeGap = 20 })  F5 G1-346
 *     `.ws-card-stage[data-ws-content][data-lcs-open]` stamped data-lcs-anchor
 *     / -class / -word: a header row [img px][the word, Baloo 2 700 wordPx,
 *     data-lcs-word-print] over a rulingBlock of `lines` empty rows. The word
 *     IS printed here (the child rhymes against it); no bank.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');
const { writingRow, textLaneGeometry, LM } = require('../../primitives/trace-path.js');
const { rulingBlock, countBadge } = require('../components-b2.js');
const F = tokens.font;

const T = tokens.color;

function rhymeMark({ px = 20 } = {}) {
  const h = Math.round(px * 1.2);
  return svgRoot({ width: px, height: h, viewBox: '0 -2 20 24', label: 'say it' },
    el('path', { d: 'M6 5 q6 5 0 10 M9 2 q10 8 0 16 M12 -1 q14 11 0 22', fill: 'none', stroke: T.teal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }),
    { 'data-lcs-rhyme-mark': '1', 'aria-hidden': 'true' });
}

function anchorTile({ src, tile = 76, px = 64 }) {
  if (!src) throw new Error('anchorTile: src missing');
  if (!(px <= tile - 4)) throw new Error(`anchorTile: picture ${px} does not fit the ${tile} tile (border 2 each side)`);
  return `<div style="display:flex;align-items:center;justify-content:center;width:${tile}px;height:${tile}px;flex:0 0 auto;` +
    `background:${T.white};border:2px solid ${T.teal};border-radius:12px;box-sizing:border-box" data-lcs-anchor-tile="1">` +
    `<img class="ws-icon" src="${esc(src)}" alt="" style="width:${px}px;height:${px}px"></div>`;
}

function choiceRing({ src, tile = 76, px = 60, vocabKey, cls, word, rhyme, foil = false }) {
  if (!src) throw new Error('choiceRing: src missing');
  if (!vocabKey || !word) throw new Error('choiceRing: vocabKey and word are required');
  if (!(px <= tile - 3)) throw new Error(`choiceRing: picture ${px} does not fit the ${tile} ring (border 1.5 each side)`);
  return `<div style="display:flex;align-items:center;justify-content:center;width:${tile}px;height:${tile}px;flex:0 0 auto;` +
    `background:${T.white};border:1.5px dashed ${T.grid};border-radius:50%;box-sizing:border-box" ` +
    `data-lcs-choice="${esc(vocabKey)}" data-lcs-class="${esc(cls == null ? '' : cls)}" data-lcs-word="${esc(word)}" data-lcs-rhyme="${rhyme ? '1' : '0'}"${foil ? ' data-lcs-foil="1"' : ''}>` +
    `<img class="ws-icon" src="${esc(src)}" alt="" style="width:${px}px;height:${px}px"></div>`;
}

function rhymeRow({ anchor, choices, lane, anchorTile: aTile = 76, anchorPx = 64, choiceTile: cTile = 76, choicePx = 60, badgeGap = 20, gap = 10, laneGap = 14 }) {
  if (!anchor || !anchor.src || !anchor.vocabKey || !anchor.cls) throw new Error('rhymeRow: anchor needs src, vocabKey, cls');
  if (!Array.isArray(choices) || choices.length < 2) throw new Error('rhymeRow: at least two choices');
  if (!lane || !lane.w || !lane.h || !lane.glyphH) throw new Error('rhymeRow: lane needs w, h, glyphH');
  let laneHtml;
  if (lane.starter) {
    if ([...lane.starter].length !== 1) throw new Error('rhymeRow: a starter is exactly one glyph');
    laneHtml = rulingBlock({ rows: 1, w: lane.w, h: lane.h, glyphH: lane.glyphH, starters: { 0: lane.starter }, gap: 0 });
  } else laneHtml = writingRow({ w: lane.w, h: lane.h, glyphH: lane.glyphH, xHeight: true }).svg;
  const rings = choices.map((c) => choiceRing({ src: c.src, tile: cTile, px: choicePx, vocabKey: c.vocabKey, cls: c.cls, word: c.word, rhyme: c.rhyme, foil: c.foil })).join('');
  return `<div class="ws-card-stage" style="justify-content:flex-start;align-items:center;gap:${gap}px;padding:0;min-width:0" ` +
    `data-ws-content data-lcs-anchor="${esc(anchor.vocabKey)}" data-lcs-class="${esc(anchor.cls)}" data-lcs-anchor-word="${esc(anchor.word || '')}">` +
    `<div style="margin-left:${badgeGap}px;flex:0 0 auto;display:flex" data-lcs-slot="anchor">${anchorTile({ src: anchor.src, tile: aTile, px: anchorPx })}</div>` +
    `<div style="flex:0 0 auto;display:flex;align-items:center" data-lcs-slot="mark">${rhymeMark({ px: 20 })}</div>` +
    `<div style="display:flex;gap:${gap}px;flex:0 0 auto" data-lcs-slot="choices">${rings}</div>` +
    `<div style="margin-left:auto;padding-left:${Math.max(0, laneGap - gap)}px;flex:0 0 auto;display:flex" data-lcs-slot="lane" data-lcs-lane-w="${lane.w}">${laneHtml}</div>` +
    `</div>`;
}

/* ------------------------------------------------------------------ faces */
function yesNoChips({ px = 56, gap = 14 } = {}) {
  if (!(px >= 40)) throw new Error('yesNoChips: chip ' + px + ' px is below the tap floor');
  const glyph = Math.round(px * 0.72);
  const chip = (kind, d) => `<span class="ws-chip" style="width:${px}px;height:${px}px;padding:0;flex:0 0 auto" data-lcs-chip="${kind}">` +
    svgRoot({ width: glyph, height: glyph, viewBox: '0 0 52 52', label: kind },
      el('path', { d, fill: 'none', stroke: T.teal, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), { 'aria-hidden': 'true' }) +
    '</span>';
  return `<div class="ws-choices" style="gap:${gap}px;padding-top:8px" data-lcs-yesno="1">${chip('yes', 'M14 27 l9 9 l17 -18')}${chip('no', 'M16 16 l20 20 M36 16 l-20 20')}</div>`;
}

function pairCardRhyme({ a, b, px = 72, rhyme, chipPx = 56, markPx = 24 }) {
  for (const x of [a, b]) if (!x || !x.src || !x.vocabKey || !x.word) throw new Error('pairCardRhyme: each side needs src, vocabKey, word');
  const img = (x) => `<img class="ws-icon" src="${esc(x.src)}" alt="" style="width:${px}px;height:${px}px;flex:0 0 auto">`;
  return `<div class="ws-card-stage" style="flex-direction:column;justify-content:center;align-items:center;padding:0;gap:0;min-width:0" data-ws-content data-lcs-pair="1" ` +
    `data-lcs-a="${esc(a.vocabKey)}" data-lcs-b="${esc(b.vocabKey)}" data-lcs-class-a="${esc(a.cls == null ? '' : a.cls)}" data-lcs-class-b="${esc(b.cls == null ? '' : b.cls)}" ` +
    `data-lcs-word-a="${esc(a.word)}" data-lcs-word-b="${esc(b.word)}" data-lcs-rhyme="${rhyme ? '1' : '0'}">` +
    `<div style="display:flex;align-items:center;gap:10px;flex:0 0 auto" data-lcs-slot="pair">${img(a)}${rhymeMark({ px: markPx })}${img(b)}</div>` +
    yesNoChips({ px: chipPx }) + '</div>';
}

function rhymeBank({ items, iconPx = 64, gap = 14 }) {
  if (!Array.isArray(items) || items.length < 2) throw new Error('rhymeBank: at least two items');
  const cells = items.map((it, i) => {
    if (!it.src || !it.vocabKey || !it.word) throw new Error('rhymeBank: item ' + (i + 1) + ' needs src, vocabKey, word');
    return `<span style="position:relative;display:inline-flex;padding:8px 0 0 8px" data-lcs-bank-index="${i + 1}" data-lcs-vocab="${esc(it.vocabKey)}" data-lcs-class="${esc(it.cls == null ? '' : it.cls)}" data-lcs-word="${esc(it.word)}">` +
      `<img class="ws-icon" src="${esc(it.src)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
      `<span style="position:absolute;left:0;top:0">${countBadge(i + 1)}</span></span>`;
  }).join('');
  return `<div class="ws-scene-banner" style="gap:${gap}px;flex-wrap:wrap" data-lcs-numbered-bank="${items.length}">${cells}</div>`;
}

function rhymeBins({ bins, colW = 215, laneW = 190, laneH = 64, glyphH = 28, headTile = 120, headPx = 100, gap = 15 }) {
  if (!Array.isArray(bins) || bins.length < 2) throw new Error('rhymeBins: at least two bins');
  const inner = colW - 16 - 4;   // inline padding 10 8 + the 2 px border each side
  if (laneW > inner || headTile > inner) throw new Error(`rhymeBins: lane ${laneW} / head ${headTile} does not fit the ${inner} px column`);
  const n = bins[0].n;
  const cols = bins.map((b, i) => {
    if (!b.anchor || !b.anchor.src || !b.anchor.vocabKey || !b.cls) throw new Error('rhymeBins: bin ' + (i + 1) + ' needs anchor {src, vocabKey} and cls');
    if (!(b.n >= 1)) throw new Error('rhymeBins: bin ' + (i + 1) + ' needs n lanes');
    const lanes = Array.from({ length: b.n }, (_, k) => `<div data-lcs-bin-lane="${k + 1}" style="display:flex;justify-content:center">${writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg}</div>`).join('');
    // the head sits at the top of its bin; the lanes spread EVENLY over the rest of the column (the bins
    // stretch to the body): a sorting mat with two big writing zones, never a head with two lines pinned
    // under it and half a bin of cream (measured 2026-09-14: the pinned shape left ~330 px of every bin
    // empty at the shipping chrome; a fully even spread floated the head mid-column)
    return `<div class="ws-lane" style="padding:10px 8px;display:flex;flex-direction:column;align-items:center;min-height:${headTile + b.n * laneH + (b.n + 1) * 12}px" data-ws-content data-lcs-bin="${i + 1}" ` +
      `data-lcs-class="${esc(b.cls)}" data-lcs-anchor="${esc(b.anchor.vocabKey)}" data-lcs-anchor-word="${esc(b.anchor.word || '')}">` +
      `<div style="flex:0 0 auto;display:flex" data-lcs-slot="head">${anchorTile({ src: b.anchor.src, tile: headTile, px: headPx })}</div>` +
      `<div style="display:flex;flex-direction:column;justify-content:space-evenly;flex:1 1 auto;min-height:${b.n * laneH + (b.n + 1) * 12}px;width:100%" data-lcs-slot="lanes">${lanes}</div>` +
      '</div>';
  }).join('');
  return `<div style="flex:1 1 auto;display:grid;grid-template-columns:repeat(${bins.length},${colW}px);gap:${gap}px;min-height:0;justify-content:center" data-lcs-bins="${bins.length}" data-lcs-per-bin="${n}">${cols}</div>`;
}

function coupletCard({ pic, line1, pre, post = '', rhymeWith, answer, laneW = 170, laneH = 56, glyphH = 26, fontPx = 18, tile = 76, px = 64, textW = 551 }) {
  if (!answer || !answer.vocabKey || !answer.word || !answer.cls) throw new Error('coupletCard: answer needs vocabKey, word, cls');
  if (typeof line1 !== 'string' || !line1) throw new Error('coupletCard: line1 missing');
  if (typeof pre !== 'string') throw new Error('coupletCard: pre (line 2 before the blank) must be a string');
  const lh = fontPx + 6;
  // the line-2 text sits ON the lane's base line: the same geometry writingRow rules the lane with. Measured
  // 2026-09-14 (Nunito 800, line-height fontPx + 6): the text baseline sits (lh - fontPx) px above the span's
  // content-box bottom, so padding-bottom = (laneH - yBase) - (lh - fontPx) lands it on the base line to
  // 0.1 px; verify() measures the two against each other.
  const g = textLaneGeometry({ h: laneH, glyphH, heightUnits: LM.base - LM.ascender, inkTop: LM.ascender, inkBottom: LM.desc });
  const padBottom = Math.max(0, Math.round(((laneH - g.yBase) - (lh - fontPx)) * 10) / 10);
  const txt = (t, pad) => `<span style="font-family:${F.body},sans-serif;font-weight:800;font-size:${fontPx}px;line-height:${lh}px;color:${T.ink};white-space:nowrap${pad ? ';padding-bottom:' + pad + 'px' : ''}" data-lcs-verse-text="1">${esc(t)}</span>`;
  const cue = pic && pic.src ? `<div style="flex:0 0 auto;display:flex" data-lcs-slot="cue">${anchorTile({ src: pic.src, tile, px })}</div>` : `<div style="width:${tile}px;height:${tile}px;flex:0 0 auto" data-lcs-slot="cue" data-lcs-cue-free="1"></div>`;
  const lane = `<span style="display:inline-flex;flex:0 0 auto" data-lcs-slot="lane" data-lcs-lane-w="${laneW}">${writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg}</span>`;
  return `<div class="ws-lane" style="padding:8px 16px;display:flex;align-items:center;gap:12px;min-height:0" data-ws-content data-lcs-couplet="1" ` +
    `data-lcs-answer="${esc(answer.vocabKey)}" data-lcs-answer-word="${esc(answer.word)}" data-lcs-class="${esc(answer.cls)}" data-lcs-rhyme-with="${esc(rhymeWith || '')}"${pic && pic.src ? '' : ' data-lcs-cue-free="1"'}>` +
    cue +
    `<div style="display:flex;flex-direction:column;justify-content:center;gap:4px;width:${textW}px;min-width:0;min-height:0" data-lcs-slot="text">` +
    `<p style="margin:0;display:flex;align-items:center;min-height:${lh}px" data-lcs-verse="1">${txt(line1)}</p>` +
    `<p style="margin:0;display:flex;align-items:flex-end;gap:8px;min-height:0" data-lcs-verse="2">${pre ? txt(pre, padBottom) : ''}${lane}${post ? txt(post, padBottom) : ''}</p>` +
    '</div></div>';
}

function stringBank({ words, wordPx = 18 }) {
  if (!Array.isArray(words) || words.length < 2) throw new Error('stringBank: at least two words');
  const items = words.map((wd) => {
    if (!wd.word || !wd.vocabKey) throw new Error('stringBank: every word needs word + vocabKey');
    return `<span class="ws-bankword" style="font-size:${wordPx}px" data-lcs-bank-word="${esc(wd.word)}" data-lcs-bank="${esc(wd.vocabKey)}" data-lcs-class="${esc(wd.cls == null ? '' : wd.cls)}" data-lcs-role="${wd.foil ? 'foil' : 'answer'}"><span>${esc(wd.word)}</span></span>`;
  }).join('');
  return `<div class="ws-scene-banner ws-bank" data-lcs-bank-banner="1" data-lcs-bank-size="${words.length}">${items}</div>`;
}

function stringLane({ anchor, n = 2, laneW = 250, laneH = 64, glyphH = 28, tile = 100, px = 84, gap = 14, answers = [] }) {
  if (!anchor || !anchor.src || !anchor.vocabKey || !anchor.cls || !anchor.word) throw new Error('stringLane: anchor needs src, vocabKey, cls, word');
  if (!(n >= 1)) throw new Error('stringLane: n lanes');
  const lanes = Array.from({ length: n }, (_, k) => `<div data-lcs-string-lane="${k + 1}" style="display:flex">${writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg}</div>`).join('');
  if (tile + 14 + n * laneW + (n - 1) * gap > 639) throw new Error(`stringLane: ${tile} + ${n} × ${laneW} lanes do not fit the 639 px row`);
  return `<div class="ws-lane" style="padding:8px 16px;display:flex;align-items:center;gap:14px;min-height:0" data-ws-content data-lcs-string="1" ` +
    `data-lcs-anchor="${esc(anchor.vocabKey)}" data-lcs-class="${esc(anchor.cls)}" data-lcs-anchor-word="${esc(anchor.word)}" data-lcs-answers="${esc(answers.join('|'))}">` +
    `<div style="flex:0 0 auto;display:flex" data-lcs-slot="anchor">${anchorTile({ src: anchor.src, tile, px })}</div>` +
    `<div style="display:flex;flex-direction:row;gap:${gap}px;flex:0 0 auto" data-lcs-slot="lanes" data-lcs-lane-w="${laneW}">${lanes}</div>` +
    '</div>';
}

function ownRhymeCard({ pic, word, wordPx = 24, px = 64, lines = 2, laneW = 302, laneH = 56, glyphH = 26, badgeGap = 20, vocabKey, cls }) {
  if (!pic || !pic.src || !word || !vocabKey || !cls) throw new Error('ownRhymeCard: pic, word, vocabKey, cls required');
  return `<div class="ws-card-stage" style="flex-direction:column;align-items:stretch;justify-content:flex-start;padding:0;gap:8px;min-width:0" data-ws-content data-lcs-open="1" ` +
    `data-lcs-anchor="${esc(vocabKey)}" data-lcs-class="${esc(cls)}" data-lcs-word="${esc(word)}">` +
    `<div style="display:flex;align-items:center;gap:10px;margin-left:${badgeGap}px;height:${px}px;flex:0 0 auto" data-lcs-slot="head">` +
    `<img class="ws-icon" src="${esc(pic.src)}" alt="" style="width:${px}px;height:${px}px;flex:0 0 auto">` +
    `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${wordPx}px;line-height:${wordPx + 4}px;color:${T.ink};white-space:nowrap;min-width:0" data-lcs-word-print="1">${esc(word)}</span></div>` +
    `<div style="flex:0 0 auto" data-lcs-slot="rulings">${rulingBlock({ rows: lines, w: laneW, h: laneH, glyphH, gap: 4 })}</div>` +
    '</div>';
}

module.exports = { rhymeMark, anchorTile, choiceRing, rhymeRow, yesNoChips, pairCardRhyme, rhymeBank, rhymeBins, coupletCard, stringBank, stringLane, ownRhymeCard };
