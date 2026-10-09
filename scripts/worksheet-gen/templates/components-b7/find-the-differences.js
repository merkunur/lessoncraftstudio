/**
 * templates/components-b7/find-the-differences.js — the K-395 `find-the-differences` apparatus (nt2-G / b7; FINAL §2).
 * Every export is prefixed `fd`; inline CSS, class prefix `fd-`; the pictures themselves come from lib/fd-scene.js
 * renderPanel (the only art). Tokens by value: cream #FBF3E4 · creamDeep #F5E9D2 · teal #146B5E · coral #F2784B ·
 * ink #3A3530 · grid #C8BFAE · inkSoft #7A7266 · white #FFFFFF.
 */
'use strict';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const BALOO = "'Baloo 2',cursive", NUNITO = 'Nunito,sans-serif';

/** the white index tab hanging OFF a picture's right frame edge (outside the frame: 0 px of picture) */
function fdIndexTab({ n }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40" data-lcs-fd-tab="${n}" style="display:block">` +
    `<path d="M0,0 H18 a12,12 0 0 1 12,12 V28 a12,12 0 0 1 -12,12 H0 Z" fill="#FFFFFF" stroke="#146B5E" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<text x="14" y="28" text-anchor="middle" font-family="${BALOO}" font-weight="700" font-size="22" fill="#146B5E">${n}</text></svg>`;
}
/** a picture cell: the panel svg + its tab at the right edge (y 14) */
function fdPicture({ svg, w, h, tab, tabSide = 'right', attrs = '' }) {
  // tabSide 'left': the tab hangs off the LEFT frame edge (the side-by-side faces put picture 1's tab outside the pair)
  const pos = tabSide === 'left' ? `left:${-29}px;transform:scaleX(-1)` : `left:${w - 1}px`;
  const tabHtml = tabSide === 'left' ? fdIndexTab({ n: tab }).replace(/<text /, '<text transform="scale(-1 1) translate(-28 0)" ') : fdIndexTab({ n: tab });
  return `<div class="fd-pic" ${attrs} style="position:relative;width:${w}px;height:${h}px;flex:0 0 auto">${svg}` +
    (tab != null ? `<span style="position:absolute;${pos};top:14px;display:block">${tabHtml}</span>` : '') + `</div>`;
}
/** picture 1 over picture 2 (one left edge; a finger slides down from a drawing to its twin) */
function fdStack({ p1, p2, gap = 12, attrs = '' }) {
  return `<div class="fd-stack" ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;flex:0 0 auto">${p1}${p2}</div>`;
}
/** the page grid: cells with explicit widths, centred */
function fdColumns({ cells, widths, align = 'flex-start', attrs = '' }) {
  const inner = cells.map((c, i) => `<div style="width:${widths[i]}px;flex:0 0 ${widths[i]}px;display:flex;flex-direction:column;align-items:flex-start">${c}</div>`).join('');
  return `<div class="fd-cols" ${attrs} style="display:flex;align-items:${align};justify-content:center;width:675px">${inner}</div>`;
}
const tick = (box) => `<svg xmlns="http://www.w3.org/2000/svg" width="${box}" height="${box}" viewBox="0 0 56 56" style="display:block"><path d="M12,30 L24,42 L44,16" fill="none" stroke="#F2784B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
/** the cream ledger of numbered tick boxes (one tick per find); orient 'column' (beside picture 1) or 'row' (under a pair) */
function fdLedger({ n, box = 56, gap = 10, numerals = true, ticks = null, orient = 'column', dashed = false, attrs = '' }) {
  const b = (i) => `<span data-lcs-fd-box="${i}" style="display:flex;align-items:center;justify-content:center;width:${box}px;height:${box}px;box-sizing:border-box;background:#FFFFFF;border:2.5px ${dashed ? 'dashed #C8BFAE' : 'solid #146B5E'};border-radius:12px">${ticks && ticks[i] ? tick(box - 8) : ''}</span>`;
  const num = (i, side) => (numerals ? `<span style="font-family:${BALOO};font-weight:700;font-size:${side ? 20 : 16}px;color:#146B5E;line-height:1;${side ? 'width:24px;text-align:right' : 'text-align:center'}">${i + 1}</span>` : '');
  if (orient === 'row') {
    const cells = Array.from({ length: n }, (_, i) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px">${num(i, false)}${b(i)}</span>`).join('');
    return `<div class="fd-ledger" data-lcs-fd-ledger="${n}" ${attrs} style="display:flex;gap:8px;align-items:flex-end;justify-content:center">${cells}</div>`;
  }
  const rows = Array.from({ length: n }, (_, i) => `<span style="display:flex;align-items:center;gap:10px">${num(i, true)}${b(i)}</span>`).join('');
  return `<div class="fd-ledger" data-lcs-fd-ledger="${n}" ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:14px;box-sizing:border-box;background:#FBF3E4;border:2px solid #F5E9D2;border-radius:14px">${rows}</div>`;
}
/** the how-many numeral box (blankNumeralBox geometry: white, teal 2.5, r 12; the key prints the numeral) */
function fdCountBox({ w = 88, h = 64, answer = '' }) {
  return `<span class="ws-blankbox" data-lcs-answer="${esc(answer)}" data-lcs-fd-countbox="1" style="display:flex;align-items:center;justify-content:center;width:${w}px;height:${h}px;box-sizing:border-box;background:#FFFFFF;border:2.5px solid #146B5E;border-radius:12px;font-family:${BALOO};font-weight:700;font-size:36px;color:#F2784B">${esc(answer)}</span>`;
}
/** the word column of the what-changed face: [box][word] rows; `ticks` marks the key's changed words; `changed` stamps only on the key */
function fdWordTicks({ words, box = 28, w = 273, ticks = null, stamp = false }) {
  const rows = words.map((x, i) => `<div data-lcs-fd-word="${esc(x.k)}"${stamp && x.changed ? ' data-lcs-fd-changed="1"' : ''} style="display:flex;align-items:center;gap:10px;min-height:36px">` +
    `<span data-lcs-fd-box="${i}" style="display:flex;align-items:center;justify-content:center;width:${box}px;height:${box}px;flex:0 0 ${box}px;box-sizing:border-box;background:#FFFFFF;border:2px solid #146B5E;border-radius:6px">${ticks && ticks[i] ? tick(box - 6) : ''}</span>` +
    `<span style="font-family:${NUNITO};font-weight:800;font-size:18px;color:#3A3530;line-height:1.15;max-width:${w - box - 10}px">${esc(x.text)}</span></div>`).join('');
  return `<div class="fd-words" data-lcs-fd-words="${words.length}" style="display:flex;flex-direction:column;gap:10px;width:${w}px">${rows}</div>`;
}
/** the fold line between the mirror pair: dashed grid line + a fold-arc glyph at both ends; x = its page x (stamped) */
function fdFoldLine({ h, x, w = 16 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${(16 - w) / 2} 0 ${w} ${h}" data-lcs-fd-fold="${x}" style="display:block;flex:0 0 ${w}px">` +
    `<line x1="8" y1="14" x2="8" y2="${h - 14}" stroke="#C8BFAE" stroke-width="2" stroke-dasharray="8 6"/>` +
    `<path d="M2,10 C2,2 14,2 14,10" fill="none" stroke="#146B5E" stroke-width="2"/><path d="M2,${h - 10} C2,${h - 2} 14,${h - 2} 14,${h - 10}" fill="none" stroke="#146B5E" stroke-width="2"/></svg>`;
}
/** a picture-pairs row: window 1, window 2, the tab (top row only) and one tick box */
function fdWindowRow({ w1, w2, gap = 40, tab = null, tab1 = null, box = 56, ticked = false, attrs = '' }) {
  // tab1 (the top row): the "1" tab hangs off window 1's right edge inside the gap (30 of the 40 px)
  return `<div class="fd-row" ${attrs} style="display:flex;align-items:flex-start;gap:0">${w1}<span style="width:${gap}px;flex:0 0 ${gap}px;display:block;padding-top:14px;margin-left:-1px">${tab1 != null ? fdIndexTab({ n: tab1 }) : ''}</span>${w2}` +
    `<span style="width:30px;flex:0 0 30px;display:block;padding-top:14px">${tab != null ? fdIndexTab({ n: tab }) : ''}</span><span style="width:14px;flex:0 0 14px"></span>` +
    `<span data-lcs-fd-box="0" style="display:flex;align-items:center;justify-content:center;width:${box}px;height:${box}px;box-sizing:border-box;background:#FFFFFF;border:2.5px solid #146B5E;border-radius:12px">${ticked ? tick(box - 8) : ''}</span></div>`;
}
/** the how-many screen chips (tap-select items: exactly one is the count); meta carried for the oracle */
function fdChoiceChips({ options, meta = {}, correct = null }) {
  const m = Object.entries(meta).map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
  const chips = options.map((o) => `<span class="ws-pill" data-lcs-fd-hotspot="c${o}" data-lcs-fd-count="${o}" data-lcs-label="${o}"${o === correct ? ' data-lcs-fd-diff="1"' : ''}${m} style="display:flex;align-items:center;justify-content:center;width:72px;height:72px;box-sizing:border-box;border-radius:50%;background:#FFFFFF;border:3px solid #146B5E;font-family:${BALOO};font-weight:700;font-size:32px;color:#146B5E">${o}</span>`).join('');
  return `<div class="fd-chips" data-lcs-fd-chips="${options.length}" style="display:flex;gap:28px;justify-content:center;width:675px;padding-top:12px">${chips}</div>`;
}
/** the screen body: the panels stacked at the full page width (the runtime counts; no tabs, no ledger) */
function fdScreenStack({ panels, gap = 12 }) {
  return `<div class="fd-screen" style="display:flex;flex-direction:column;gap:${gap}px;width:675px">${panels.join('')}</div>`;
}

module.exports = { fdIndexTab, fdPicture, fdStack, fdColumns, fdLedger, fdCountBox, fdWordTicks, fdFoldLine, fdWindowRow, fdChoiceChips, fdScreenStack };
