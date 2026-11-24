/**
 * dk-g2.js — the Batch 2 Grade 2 science and health pages (Daily Teaching System, Stage D-5, 2026-11-24): the pages the
 * English Grade 2 year designs need (types G2-584 .. G2-613, one `mode` each; the health modes live in dk-g2-health.js,
 * which registers them in MODES). English only (another locale refuses). Themeless; PDF only.
 *
 * Built on the earlier batches without editing them: the Batch K CSS and page check (dk-kinder.js), the Batch K2 figures
 * (dk-k2.js `fig`) and the Batch 1 layout kit (dk-g1.js `kit`). Bank: data/science/dk-g2.js. Gate: qa/verify-dk-g2.js.
 *
 * RECORD pages (the class's own tests: property table, umbrella test, build and rebuild, the landform model, the globe
 * toss, the erosion tray, the sand designs, the ice race, melt and freeze back, the plant log, the seed test, the bee
 * model, the schoolyard survey, the poster ...) hold no answer. CLOSED items (map labels, the water sort, fast or slow,
 * what a solution slows, can it change back, the seed sort, the habitat bank, the plant match, and the health sorts and
 * pairs) carry one right answer each, stamped (data-dk-answer, never printed) and re-derived by the gate from its own
 * tables; where it sits is checked for tells over 400 seeds.
 *
 * Grade 2 reads short sentences: labels, word banks and sentence frames on writing lines; numbers up to 1,000; simple
 * bar graphs and tally charts. Pictures: colour library pictures (opened at print size) or the simple drawings below.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const { sunDisc, earthDisc } = require('../../primitives/sky-bodies.js');
const DK = require('./dk-kinder.js');
const G1 = require('./dk-g1.js');
const B = require('../../data/science/dk-g2.js');

const { pic, box, tile, drawBox, labelledDraw, chip, word, small, text, head, col, row, grow, svg, art, band, whiteBand, arrow, writeRow, lineBox, frameLine, frameTile, numBox, sunToColor, esc, f1, W, T, DOT } = G1.kit;
const { placesFor, patterned, derange } = DK;
// the Batch 1 classes (the chip, text, small and bubble styles the kit's helpers use)
const G2CSS = `
.g1-chip{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:2px 11px;font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;line-height:20px;color:${T.teal};white-space:nowrap}
.g1-text{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
.g1-small{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:14px;line-height:17px;color:${T.ink};text-align:center}
.g1-bubble{position:relative;display:inline-block;box-sizing:border-box;background:#FFFFFF;border:2.5px solid ${T.teal};border-radius:16px;padding:5px 12px;font-family:'Baloo 2',cursive;font-weight:700;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
`;
const MODES = {};
const CC = require('../../primitives/_tokens.js').codeColors;   // review round 1: the brown, green, red and yellow of the new drawings
const cut = (cw, ch, inner, attrs) => box('dk-cut', cw, ch, inner, attrs);
const cutHead = (t = '✂ cut out') => `<div data-dk-box style="font:700 14px/16px 'Nunito',sans-serif;color:${T.inkSoft}">${esc(t)}</div>`;
/** a numbered tag (map labels): a ring with the number */
const tagRing = (n, attrs = '') => `<span data-dk-box${attrs ? ' ' + attrs : ''} style="display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:30px;height:30px;border-radius:50%;border:2.5px solid ${T.teal};background:#FFFFFF;font:700 18px/20px 'Baloo 2',cursive;color:${T.teal}">${n}</span>`;
/** a picture or a drawing of a bank item `x` ({pic} or {draw}) at px */
const itemArt = (x, px) => (x.pic ? pic(x.pic, px) : art(drawn(x.draw, px)));
/** a labelled draw box that TAKES THE SLACK of its page (flex-grow from minH): where the parts above it vary in height
 *  from copy to copy (wrapping chips), the space goes into the drawing, never into an empty band (review round 3) */
const growDraw = (w, minH, label, attrs = '') => box('dk-draw', w, 'auto', `<span class="dk-head" style="position:absolute;left:12px;top:6px;font-size:19px;line-height:23px">${esc(label)}</span>`, 'data-dk-draw data-g2-growdraw="1"' + (attrs ? ' ' + attrs : ''), `flex:1 1 auto;min-height:${minH}px;align-self:center;position:relative`);
/** a small bar graph to color: `bars` labels along the bottom, values 0..max up the side. A thin grid line at EVERY unit
 *  (Grade 2 bar graphs use a single-unit scale, 2.MD.D.10: a child with 7 drops colors up to the 7th line); a number and a
 *  stronger line every `step` (a Grade 2 skip count: 2 or 5); `unitH` px between two unit lines (review round 2) */
function barGraph({ bars, max, step, unitH, colW, attrs = '' }) {
  const lx = 40, top = 10, gw = bars.length * colW, gh = max * unitH, base = top + gh, fs = Math.min(14, Math.floor(step * unitH - 2));
  let s = '';
  for (let k = 0; k <= max; k++) { const y = base - k * unitH, major = k % step === 0;
    s += `<line x1="${lx}" y1="${f1(y)}" x2="${f1(lx + gw)}" y2="${f1(y)}" stroke="${major ? T.inkSoft : T.grid}" stroke-width="${major ? 1.2 : 0.8}" data-g2-gridline="${k}"/>` +
      (major ? `<text x="${lx - 6}" y="${f1(y + 5)}" text-anchor="end" font-family="Nunito" font-weight="800" font-size="${fs}" fill="${T.ink}">${k}</text>` : ''); }
  bars.forEach((b, i) => { s += `<rect x="${f1(lx + i * colW + colW * 0.22)}" y="${top}" width="${f1(colW * 0.56)}" height="${f1(gh)}" fill="none" stroke="${T.inkSoft}" stroke-width="1.8" data-g2-bar="${esc(b)}"/>`; });
  s += `<line x1="${lx}" y1="${top}" x2="${lx}" y2="${f1(base)}" stroke="${T.ink}" stroke-width="2.5"/>`;
  const g = svg(lx + gw + 4, base + 6, s, `data-g2-graph="1" data-g2-max="${max}" data-g2-step="${step}"` + (attrs ? ' ' + attrs : ''));
  const labels = `<div class="dk-row" style="gap:0;justify-content:flex-start"><div style="width:${lx}px"></div>${bars.map((b) => `<div style="width:${colW}px;display:flex;justify-content:center">${small(b, colW - 4)}</div>`).join('')}</div>`;
  return col(art(g) + labels, 2, 'align-items:flex-start');
}

/* ================================================================ the drawings (simple shapes, listed for the reviewer; review round 1 redrew the burr, the cleavers seeds, the fern, the
   paper towel, the lid, the melted butter and chocolate, the roof swatches and the windbreak, and added cherries and a
   three-leaf clover) */
const SW = (w) => `stroke="${T.teal}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const DRAW = {
  // ---- materials
  'wood-block': () => `<path d="M14 40 L32 24 L86 24 L68 40 Z" fill="${T.cream}" ${SW(2.5)}/><path d="M68 40 L86 24 L86 72 L68 88 Z" fill="${T.creamDeep}" ${SW(2.5)}/><rect x="14" y="40" width="54" height="48" fill="${T.creamDeep}" ${SW(2.5)}/>` +
    `<path d="M20 52 Q40 48 62 54 M20 66 Q42 62 62 70 M20 80 Q38 76 62 82" fill="none" stroke="${T.inkSoft}" stroke-width="1.5"/>`,
  spoon: () => `<ellipse cx="50" cy="24" rx="15" ry="20" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="2.5"/><path d="M45 42 L47 92 Q50 96 53 92 L55 42" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linejoin="round"/><path d="M42 14 Q46 10 50 10" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`,
  'rubber-band': () => `<ellipse cx="50" cy="52" rx="38" ry="26" fill="none" stroke="${T.coral}" stroke-width="7"/><ellipse cx="50" cy="52" rx="38" ry="26" fill="none" stroke="${T.ink}" stroke-width="1" opacity=".4"/>`,
  'paper-towel': () => `<rect x="12" y="10" width="76" height="22" rx="4" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2.5"/><ellipse cx="12" cy="21" rx="5" ry="11" fill="${T.creamDeep}" stroke="${T.inkSoft}" stroke-width="2.5"/><ellipse cx="12" cy="21" rx="2" ry="5" fill="${T.inkSoft}"/>` +
    `<path d="M22 30 L78 30 L78 80 L72 86 L66 80 L60 86 L54 80 L48 86 L42 80 L36 86 L30 80 L22 86 Z" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linejoin="round" data-g2-towel="sheet"/>` +
    [[32, 44], [50, 42], [66, 46], [36, 62], [56, 60], [68, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1"/>`).join(''),
  'plastic-lid': () => `<ellipse cx="50" cy="56" rx="40" ry="18" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="3"/><ellipse cx="50" cy="52" rx="30" ry="11" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2"/><path d="M10 56 L10 62 Q50 84 90 62 L90 56" fill="none" stroke="${T.teal}" stroke-width="3"/><path d="M89 57 L99 54 L100 63 L90 65 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2" stroke-linejoin="round" data-g2-lidtab="1"/>`,
  'plastic-wrap': () => `<g transform="translate(5 14) scale(1.4)"><path d="M3 6 L60 3 L63 42 L6 45 Z" fill="${T.tealSoft}" fill-opacity=".45" stroke="${T.teal}" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 12 L24 22 M40 10 L48 16 M30 30 L42 38" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><path d="M10 30 Q18 24 22 34" fill="none" stroke="${T.teal}" stroke-width="1.2"/></g>`,
  foil: () => `<g transform="translate(5 14) scale(1.4)"><path d="M3 5 L22 3 L40 6 L63 3 L61 24 L63 44 L40 41 L20 45 L4 42 L6 22 Z" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="2" stroke-linejoin="round"/><path d="M14 10 L22 20 L16 32 M34 12 L44 22 L36 34 M50 14 L54 30" fill="none" stroke="#FFFFFF" stroke-width="2.2"/></g>`,
  cloth: () => `<g transform="translate(5 14) scale(1.4)"><path d="M4 6 Q18 2 32 5 Q44 8 48 4 L62 18 Q60 30 63 42 Q46 46 32 43 Q16 40 4 44 Q7 26 4 6 Z" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2" stroke-linejoin="round"/><path d="M48 4 L62 18 L50 16 Z" fill="#FFFFFF" stroke="${T.coral}" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 16 Q24 22 22 34 M34 14 Q40 24 38 36" fill="none" stroke="${T.coral}" stroke-width="1.4"/></g>`,
  // ---- landforms (side view)
  hill: () => `<path d="M4 84 Q50 20 96 84 Z" fill="${T.tealSoft}" ${SW(3)}/><line x1="2" y1="84" x2="98" y2="84" stroke="${T.inkSoft}" stroke-width="2"/>`,
  valley: () => `<path d="M2 84 L2 34 Q22 30 38 70 Q50 84 62 70 Q78 30 98 34 L98 84 Z" fill="${T.tealSoft}" ${SW(3)}/>`,
  plain: () => `<path d="M2 84 L2 62 Q50 58 98 62 L98 84 Z" fill="${T.tealSoft}" ${SW(3)}/>` + [20, 44, 70, 88].map((x) => `<path d="M${x} 61 l-3 -7 M${x} 61 l0 -8 M${x} 61 l3 -7" stroke="${T.teal}" stroke-width="1.5"/>`).join(''),
  lake: () => `<path d="M2 84 L2 46 Q16 44 24 58 L76 58 Q84 44 98 46 L98 84 Z" fill="${T.tealSoft}" ${SW(3)}/><path d="M24 58 Q50 76 76 58 Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/><path d="M36 62 q4 -3 8 0 t8 0 M54 66 q4 -3 8 0" fill="none" stroke="${T.teal}" stroke-width="1.6"/>`,
  mountain: () => `<path d="M4 86 L50 10 L96 86 Z" fill="${T.tealSoft}" ${SW(3)}/><path d="M38 30 L50 10 L62 30 L56 26 L50 32 L44 26 Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2"/>`,
  river: () => `<path d="M2 84 L2 50 L36 50 Q44 70 50 70 Q56 70 64 50 L98 50 L98 84 Z" fill="${T.tealSoft}" ${SW(3)}/><path d="M36 50 Q44 70 50 70 Q56 70 64 50 Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/><path d="M42 56 q4 -3 8 0 t8 0" fill="none" stroke="${T.teal}" stroke-width="1.6"/>`,
  // ---- Earth events
  earthquake: () => `<line x1="2" y1="70" x2="98" y2="70" stroke="${T.inkSoft}" stroke-width="2.5"/><path d="M30 70 L36 34 L58 26 L66 70 Z" fill="${T.cream}" ${SW(2.5)} transform="rotate(-8 48 70)"/><path d="M40 70 L46 78 L42 86 L50 94 L46 100" fill="none" stroke="${T.ink}" stroke-width="3"/>` +
    `<path d="M10 40 q4 -6 8 0 M80 40 q4 -6 8 0 M8 54 q4 -6 8 0 M84 54 q4 -6 8 0" fill="none" stroke="${T.coral}" stroke-width="2.5" stroke-linecap="round"/>`,
  volcano: () => `<path d="M6 92 L36 34 L64 34 L94 92 Z" fill="${T.creamDeep}" ${SW(3)}/><path d="M36 34 Q50 42 64 34 L58 46 Q50 52 42 46 Z" fill="${T.coral}"/><path d="M42 30 Q40 14 50 6 Q60 14 58 30 Z" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.5"/><path d="M58 46 Q66 62 60 80" fill="none" stroke="${T.coral}" stroke-width="6" stroke-linecap="round"/>`,
  landslide: () => `<path d="M2 94 L2 20 Q30 24 50 50 Q70 76 98 80 L98 94 Z" fill="${T.creamDeep}" ${SW(3)}/>` + [[40, 46, 7], [54, 60, 6], [66, 70, 8], [80, 78, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y - 10}" r="${r}" fill="${T.grid}" stroke="${T.ink}" stroke-width="1.8"/>`).join('') + arrow(30, 30, 76, 62, { sw: 3, head: 9 }),
  flood: () => `<path d="M30 46 L50 28 L70 46 L70 80 L30 80 Z" fill="${T.cream}" ${SW(2.5)}/><rect x="44" y="56" width="12" height="14" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2"/><rect x="2" y="64" width="96" height="30" fill="${T.tealSoft}" opacity=".85"/><path d="M4 64 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="${T.teal}" stroke-width="2.5"/>`,
  canyon: () => `<path d="M2 26 L34 26 L40 84 L60 84 L66 26 L98 26 L98 96 L2 96 Z" fill="${T.creamDeep}" ${SW(3)}/>` + [40, 56, 70].map((y) => `<path d="M${2} ${y} L${34 + (y - 26) * 0.1} ${y} M${66 - (y - 26) * 0.1} ${y} L98 ${y}" stroke="${T.coral}" stroke-width="1.6"/>`).join('') + `<path d="M40 84 Q50 78 60 84 L60 90 L40 90 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2"/>`,
  mountain2: () => `<path d="M6 90 Q24 40 50 36 Q76 40 94 90 Z" fill="${T.tealSoft}" ${SW(3)}/>` + [[30, 88], [42, 92], [68, 88], [80, 92], [56, 92]].map(([x, y]) => `<circle cx="${x}" cy="${y - 4}" r="3.4" fill="${T.grid}" stroke="${T.ink}" stroke-width="1.4"/>`).join(''),
  'ice-crack': () => `<path d="M14 88 L20 42 L46 28 L80 34 L88 88 Z" fill="${T.grid}" ${SW(3)}/><path d="M50 30 L46 50 L54 62 L48 86" fill="none" stroke="${T.ink}" stroke-width="3"/>` +
    `<g transform="translate(74 18)"><path d="M0 -10 V10 M-9 -5 L9 5 M-9 5 L9 -5" stroke="${T.teal}" stroke-width="2.5" stroke-linecap="round"/></g>`,
  dunes: () => `<path d="M2 90 Q24 50 46 74 Q66 40 98 70 L98 94 L2 94 Z" fill="${T.creamDeep}" ${SW(3)}/><path d="M8 30 H40 M14 40 H50 M6 50 H30" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linecap="round"/>` + arrow(54, 30, 90, 30, { sw: 2.5, head: 8, stroke: T.inkSoft }),
  // ---- real solutions
  seawall: () => `<rect x="54" y="24" width="18" height="70" fill="${T.grid}" ${SW(2.5)}/><path d="M72 40 L98 40 L98 94 L72 94 Z" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/><path d="M2 58 Q14 46 26 58 T54 58 L54 94 L2 94 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2.5"/><path d="M40 50 Q48 36 54 44" fill="none" stroke="${T.teal}" stroke-width="2.5"/>` +
    [30, 44, 58, 72, 86].map((y) => `<line x1="54" y1="${y}" x2="72" y2="${y}" stroke="${T.inkSoft}" stroke-width="1.2"/>`).join(''),
  windbreak: () => `<line x1="2" y1="86" x2="98" y2="86" stroke="${T.inkSoft}" stroke-width="2"/>` + [44, 60, 76].map((x) => `<path d="M${x} 86 L${x} 66" stroke="${T.teal}" stroke-width="3"/><ellipse cx="${x}" cy="48" rx="9" ry="22" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2.5"/>`).join('') +
    `<path d="M4 40 H30 M8 52 H32 M4 64 H28" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linecap="round"/>` + `<path d="M90 86 l-4 -7 M90 86 l0 -9 M90 86 l4 -7" stroke="${T.teal}" stroke-width="1.8" stroke-linecap="round" data-g2-tuft="1"/>`,
  'sand-fence': () => `<path d="M2 92 Q40 56 98 80 L98 94 L2 94 Z" fill="${T.creamDeep}" ${SW(3)}/>` + [40, 48, 56, 64, 72].map((x) => `<rect x="${x}" y="${f1(50 + (x - 40) * 0.2)}" width="4" height="26" fill="${T.cream}" stroke="${T.inkSoft}" stroke-width="1.6"/>`).join('') +
    `<line x1="38" y1="58" x2="78" y2="64" stroke="${T.inkSoft}" stroke-width="1.6"/><path d="M4 34 H28 M8 46 H30" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linecap="round"/>`,
  'riverbank-rocks': () => `<path d="M2 60 L98 50 L98 94 L2 94 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2"/><path d="M2 20 L98 14 L98 50 L2 60 Z" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/>` +
    [[10, 56, 7], [24, 54, 8], [40, 52, 7], [56, 51, 8], [72, 49, 7], [88, 48, 8]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r + 2}" ry="${r}" fill="${T.grid}" stroke="${T.ink}" stroke-width="1.8"/>`).join('') + `<path d="M20 76 q6 -4 12 0 t12 0 M54 82 q6 -4 12 0" fill="none" stroke="${T.teal}" stroke-width="2"/>`,
  // ---- heating and cooling
  sun: () => sunDisc({ d: 84 }).svg.replace('<svg ', '<svg x="8" y="8" '),
  'metal-tray': () => `<path d="M8 50 L92 50 L84 70 L16 70 Z" fill="${T.grid}" ${SW(2.5)}/><path d="M4 48 L96 48" stroke="${T.inkSoft}" stroke-width="4" stroke-linecap="round"/><path d="M22 56 H40" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`,
  'ice-cube': () => `<path d="M22 40 L40 26 L80 26 L62 40 Z" fill="#FFFFFF" ${SW(2.5)}/><path d="M62 40 L80 26 L80 66 L62 80 Z" fill="${T.tealSoft}" ${SW(2.5)}/><rect x="22" y="40" width="40" height="40" fill="#FFFFFF" ${SW(2.5)}/><path d="M28 48 l10 0 M28 48 l0 10" stroke="${T.teal}" stroke-width="2.5" stroke-linecap="round"/>`,
  butter: () => `<path d="M10 52 L26 40 L92 40 L76 52 Z" fill="${T.cream}" ${SW(2.5)}/><path d="M76 52 L92 40 L92 62 L76 74 Z" fill="${T.creamDeep}" ${SW(2.5)}/><rect x="10" y="52" width="66" height="22" fill="#FFFFFF" ${SW(2.5)}/>` +
    `<text x="43" y="68" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="13" fill="${T.teal}">BUTTER</text><path d="M20 52 L28 74 M66 52 L58 74" stroke="${T.grid}" stroke-width="1.5"/>`,
  'melted-butter': () => `<path d="M14 66 Q10 52 34 54 Q48 44 66 54 Q92 52 86 66 Q84 78 50 78 Q16 78 14 66 Z" fill="${CC.codeYellow}" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linejoin="round" data-g2-fill="butter"/><path d="M30 62 q8 -4 16 0" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`,
  'melted-chocolate': () => `<path d="M14 66 Q10 52 34 54 Q48 44 66 54 Q92 52 86 66 Q84 78 50 78 Q16 78 14 66 Z" fill="${CC.codeBrown}" stroke="${T.ink}" stroke-width="2.5" stroke-linejoin="round" data-g2-fill="chocolate"/><path d="M58 60 q8 -3 14 1" fill="none" stroke="${T.creamDeep}" stroke-width="2" stroke-linecap="round"/><path d="M30 62 q8 -4 16 0" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>`,
  batter: () => `<path d="M10 46 Q50 40 90 46 Q86 84 50 86 Q14 84 10 46 Z" fill="${T.coralSoft}" ${SW(3)}/><ellipse cx="50" cy="46" rx="40" ry="8" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/><path d="M34 46 q8 -4 16 0 t16 0" fill="none" stroke="${T.creamDeep}" stroke-width="2.5"/><path d="M60 46 L82 14" stroke="${T.inkSoft}" stroke-width="5" stroke-linecap="round"/>`,
  clay: () => `<path d="M16 76 Q8 56 26 46 Q34 30 54 34 Q78 30 84 52 Q94 70 78 80 Q50 88 16 76 Z" fill="${T.creamDeep}" stroke="${T.inkSoft}" stroke-width="2.5"/><path d="M34 52 q4 4 8 0 M56 46 q4 4 8 0 M48 62 q4 4 8 0" fill="none" stroke="${T.inkSoft}" stroke-width="1.6"/><path d="M60 76 Q66 70 74 74" fill="none" stroke="${T.teal}" stroke-width="2"/>`,
  // ---- plants and seeds
  cactus: () => `<path d="M44 92 L44 20 Q50 10 56 20 L56 92 Z" fill="${T.tealSoft}" ${SW(3)}/><path d="M44 56 L30 56 Q24 56 24 48 L24 36 Q28 30 32 36 L32 48 L44 48" fill="${T.tealSoft}" ${SW(3)}/><path d="M56 64 L70 64 Q76 64 76 56 L76 42 Q72 36 68 42 L68 56 L56 56" fill="${T.tealSoft}" ${SW(3)}/>` +
    `<line x1="50" y1="24" x2="50" y2="88" stroke="${T.teal}" stroke-width="1.4"/><path d="M20 92 H80" stroke="${T.inkSoft}" stroke-width="3"/>`,
  fern: () => `<path d="M30 95 H70" stroke="${T.inkSoft}" stroke-width="3" stroke-linecap="round"/>` + [
    [[44, 94], [16, 58], [4, 78]], [[56, 94], [84, 58], [96, 80]], [[47, 94], [28, 30], [16, 26]], [[53, 94], [72, 30], [84, 24]], [[50, 94], [50, 36], [56, 8]],
  ].map(([p0, p1, p2], fi) => {
    // one arching frond: a curved stem with rounded leaflets on both sides, shorter toward the tip
    const at = (t) => [(1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]];
    const tan = (t) => [2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]), 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])];
    let g = '';
    for (let t = 0.14; t < 0.97; t += 0.085) {
      const [x, y] = at(t), [dx, dy] = tan(t), a = Math.atan2(dy, dx) * 180 / Math.PI, Lf = 4 + 11 * (1 - t);
      for (const side of [-1, 1]) g += `<ellipse cx="0" cy="${f1(side * (Lf / 2 + 0.8))}" rx="2.2" ry="${f1(Lf / 2 + 0.6)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)}) rotate(${side * -42})" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.2"/>`;
    }
    return `<g data-g2-frond="${fi}">${g}<path d="M${p0[0]} ${p0[1]} Q${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}" fill="none" stroke="${T.teal}" stroke-width="2" stroke-linecap="round"/></g>`;
  }).join(''),
  desert: () => `<rect x="0" y="0" width="100" height="100" fill="#FFFFFF"/><g transform="translate(70 22)"><circle r="12" fill="${T.coral}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<line x1="${f1(Math.cos(a * Math.PI / 180) * 15)}" y1="${f1(Math.sin(a * Math.PI / 180) * 15)}" x2="${f1(Math.cos(a * Math.PI / 180) * 20)}" y2="${f1(Math.sin(a * Math.PI / 180) * 20)}" stroke="${T.coral}" stroke-width="2.5" stroke-linecap="round"/>`).join('')}</g>` +
    `<path d="M0 82 Q26 60 54 76 Q76 62 100 72 L100 100 L0 100 Z" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5"/>`,
  'shady-forest': () => `<rect x="0" y="0" width="100" height="100" fill="${T.cream}"/>` + [[14, 40], [50, 30], [86, 40]].map(([x, r]) => `<path d="M${x} 100 L${x} 50" stroke="${T.inkSoft}" stroke-width="6"/><circle cx="${x}" cy="${42 - r / 4}" r="${r / 1.4}" fill="${T.teal}" opacity=".8"/>`).join('') + `<path d="M0 92 L100 92 L100 100 L0 100 Z" fill="${T.creamDeep}"/>`,
  pond: () => `<rect x="0" y="0" width="100" height="100" fill="#FFFFFF"/><ellipse cx="50" cy="66" rx="46" ry="24" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2.5"/><path d="M22 62 q5 -4 10 0 t10 0 M58 72 q5 -4 10 0 t10 0" fill="none" stroke="${T.teal}" stroke-width="2"/>` + [8, 92].map((x) => `<path d="M${x} 60 l-2 -16 M${x} 60 l2 -14" stroke="${T.teal}" stroke-width="2"/>`).join(''),
  burr: () => { const hook = (cx, cy, a, r0, r1) => { const c = Math.cos(a), sn = Math.sin(a), x2 = cx + c * r1, y2 = cy + sn * r1; return `<path d="M${f1(cx + c * r0)} ${f1(cy + sn * r0)} L${f1(x2)} ${f1(y2)} q${f1(-sn * 3.5 + c * 1.5)} ${f1(c * 3.5 + sn * 1.5)} ${f1(-c * 3 - sn * 3)} ${f1(-sn * 3 + c * 3)}" fill="none" stroke="${T.ink}" stroke-width="2" stroke-linecap="round" data-g2-hook="1"/>`; };
    return `<circle cx="50" cy="50" r="21" fill="${CC.codeBrown}" stroke="${T.ink}" stroke-width="2.5" data-g2-fill="burr"/>` + Array.from({ length: 22 }, (_, k) => hook(50, 50, k * Math.PI / 11, 19, 33)).join('') +
      [[42, 42], [57, 45], [45, 58], [58, 57], [50, 50], [38, 52], [52, 36]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${T.creamDeep}"/>`).join(''); },
  cleavers: () => { const hook = (cx, cy, a, r0, r1) => { const c = Math.cos(a), sn = Math.sin(a), x2 = cx + c * r1, y2 = cy + sn * r1; return `<path d="M${f1(cx + c * r0)} ${f1(cy + sn * r0)} L${f1(x2)} ${f1(y2)} q${f1(-sn * 3 + c)} ${f1(c * 3 + sn)} ${f1(-c * 2.5 - sn * 2.5)} ${f1(-sn * 2.5 + c * 2.5)}" fill="none" stroke="${T.teal}" stroke-width="1.8" stroke-linecap="round" data-g2-hook="1"/>`; };
    return [[36, 52], [64, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="14" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="2.2"/>` + Array.from({ length: 12 }, (_, k) => hook(x, y, k * Math.PI / 6, 13, 21)).join('')).join(''); },
  cherries: () => `<path d="M36 68 Q40 36 58 16 M64 70 Q62 40 58 16" fill="none" stroke="${CC.codeGreen}" stroke-width="3" stroke-linecap="round"/><path d="M58 16 Q74 6 86 18 Q72 26 58 16 Z" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="1.8"/>` +
    [[34, 72], [66, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="${CC.codeRed}" stroke="${T.ink}" stroke-width="2" data-g2-cherry="1"/><path d="M${x - 8} ${y - 5} q3 -5 8 -6" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>`).join(''),
  clover3: () => `<path d="M50 52 Q52 76 46 94" fill="none" stroke="${CC.codeGreen}" stroke-width="3" stroke-linecap="round"/>` + [-90, 30, 150].map((a) => `<g transform="translate(50 48) rotate(${a})" data-g2-leaflet="1"><path d="M0 0 C 10 -4 28 -2 28 9 C 28 16 19 18 14 12 C 10 19 1 16 0 0 Z" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="2" stroke-linejoin="round" transform="rotate(-15)"/></g>`).join(''),
  maple: () => `<ellipse cx="34" cy="70" rx="12" ry="10" fill="${T.creamDeep}" stroke="${T.inkSoft}" stroke-width="2.5"/><path d="M40 64 Q60 20 86 14 Q88 30 70 46 Q58 58 44 74 Z" fill="${T.cream}" stroke="${T.inkSoft}" stroke-width="2.5"/>` + [30, 40, 50].map((t) => `<path d="M${46 + t * 0.2} ${70 - t * 0.6} Q${60 + t * 0.2} ${50 - t * 0.6} ${78 - t * 0.1} ${26 + t * 0.05}" fill="none" stroke="${T.grid}" stroke-width="1.4"/>`).join(''),
  dandelion: () => `<path d="M50 94 L50 56" stroke="${T.teal}" stroke-width="3"/>` + Array.from({ length: 18 }, (_, k) => { const a = k * Math.PI / 9, x2 = 50 + Math.cos(a) * 30, y2 = 40 + Math.sin(a) * 30; return `<line x1="50" y1="40" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${T.inkSoft}" stroke-width="1.2"/><circle cx="${f1(x2)}" cy="${f1(y2)}" r="3" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="1.2"/>`; }).join('') + `<circle cx="50" cy="40" r="5" fill="${T.creamDeep}" stroke="${T.inkSoft}" stroke-width="1.5"/>`,
  // ---- cup labels (light / water) and the fur model
  'no-sun': () => DRAW.sun() + `<line x1="16" y1="16" x2="84" y2="84" stroke="${T.ink}" stroke-width="7" stroke-linecap="round"/>`,
  drop: () => `<path d="M50 14 Q74 50 74 64 A24 24 0 0 1 26 64 Q26 50 50 14 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="3"/>`,
  'no-drop': () => DRAW.drop() + `<line x1="16" y1="16" x2="84" y2="84" stroke="${T.ink}" stroke-width="7" stroke-linecap="round"/>`,
};
/** a drawing `kind` in a px square (viewBox 0 0 100 100) */
function drawn(kind, px) {
  if (!DRAW[kind]) throw new Error('dk-g2: no drawing ' + kind);
  return svg(px, px, DRAW[kind](), `data-g2-drawn="${kind}"`, '0 0 100 100');
}

/* ---------------------------------------------------------------- G2-584 describe it: a property table (record) */
MODES['g2-properties'] = function properties(d, rng) {
  const mats = rng.sample(B.PROPERTY_MATERIALS, d.mats);
  const tests = B.PROPERTY_TESTS.slice(0, d.tests);
  const rh = d.mats === 4 ? 128 : d.frame ? 76 : d.sort ? 66 : 86, mw = 130, tw = Math.floor((W - mw - 16) / tests.length);
  const hdr = row(`<div style="width:${mw}px"></div>` + tests.map((t) => `<div style="width:${tw}px;display:flex;justify-content:center">${word(t.a + ' or ' + t.b, 'font-size:14px;white-space:normal;line-height:16px;width:' + (tw - 8) + 'px')}</div>`).join(''), 0, 'justify-content:flex-start');
  const rows = mats.map((m) => band(row(col(itemArt(m, Math.min(rh - 24, 90)) + small(m.label, mw - 6), 0, `width:${mw}px`) +
    tests.map((t) => `<div style="width:${tw}px;display:flex;flex-direction:column;gap:4px;align-items:center">${chip(t.a, `data-g2-choice="${t.id}-a"`, 'font-size:14px;padding:1px 8px')}${chip(t.b, `data-g2-choice="${t.id}-b"`, 'font-size:14px;padding:1px 8px')}</div>`).join(''), 0, 'justify-content:flex-start'), `data-dk-item="${m.id}"`, 'padding:2px 4px'));
  const parts = [col(hdr + grow(rows.join(''), 'gap:6px;width:100%'), 4, 'flex:1 1 auto;min-height:0;align-items:stretch')];
  if (d.sort) parts.push(whiteBand(col(text('Sort our materials two ways. Write their names.', 'font-size:16px') + row([['hard', 'soft'], ['soaks up water', 'does not']].map(([a, b2]) => row([a, b2].map((x) => `<div data-g2-sortcol="${x}" style="display:flex;flex-direction:column;align-items:center">${word(x, 'font-size:14px') + lineBox(150, 40) + lineBox(150, 40) + lineBox(150, 40)}</div>`).join(''), 8)).join(''), 18), 2), 'data-g2-sort="1"', 'padding:4px 0'));
  if (d.frame) parts.push(frameTile([['The', 120, 'is', 120, ',', 120, ', and', 100, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, mats: mats.map((m) => m.id) } };
};

/* ---------------------------------------------------------------- G2-585 the best material for the job (record) */
MODES['g2-umbrella'] = function umbrella(d, rng) {
  const mats = d.mats === 3 ? rng.sample(B.ROOF_MATERIALS, 3) : rng.shuffle(B.ROOF_MATERIALS);
  const rh = d.mats === 3 ? 150 : d.claim ? 62 : 68;
  const hdr = row(`<div style="width:150px"></div>` + (d.drops ? `<div style="width:190px;display:flex;justify-content:center">${word('drops before it leaked', 'font-size:14px')}</div>` : '') + `<div style="width:200px;display:flex;justify-content:center">${word('Was the toy wet?', 'font-size:14px')}</div>`, 8, 'justify-content:flex-start');
  const rows = mats.map((m) => band(row(col(itemArt(m, Math.min(rh - 20, 96)) + small(m.label, 140), 0, 'width:150px') + (d.drops ? `<div style="width:190px;display:flex;justify-content:center">${numBox(90, rh - 20)}</div>` : '') +
    `<div style="width:200px;display:flex;gap:8px;justify-content:center">${chip('wet', 'data-g2-choice="wet"')}${chip('dry', 'data-g2-choice="dry"')}</div>`, 8, 'justify-content:flex-start'), `data-dk-item="${m.id}"`, 'padding:2px 6px'));
  const top = whiteBand(row(pic(B.ROOF_TOY, 54) + text('Our toy sits under each roof. We drip water on it, one drop at a time. We stop at 20 drops. If it never leaked, write 20+.', 'font-size:15px;white-space:normal;width:540px'), 10), 'data-g2-setup="1"', 'padding:4px 8px');
  const parts = [top, col(hdr + grow(rows.join(''), 'gap:6px;width:100%'), 4, 'flex:1 1 auto;min-height:0;align-items:stretch')];
  if (d.graph) parts.push(whiteBand(col(word('drops before it leaked', 'font-size:14px') + barGraph({ bars: mats.map((m) => m.label), max: 20, step: 5, unitH: d.claim ? 5 : 6, colW: 110 }), 0, 'align-items:flex-start'), 'data-g2-graphband="1"', 'padding:4px 10px'));
  if (d.claim) parts.push(frameTile([['The best material for an umbrella is', 230, 'because'], [600, '.'], ['The best material for a towel is', 250, 'because'], [600, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, mats: mats.map((m) => m.id) } };
};

/* ---------------------------------------------------------------- G2-586 take it apart, build something new (record) */
MODES['g2-rebuild'] = function rebuild(d) {
  const bh = d.frame ? 400 : d.count ? 500 : 620;
  const panel = (k) => col(labelledDraw((W - 20) / 2, bh, 'object ' + k, `data-dk-prompt="object-${k}"`) + (d.count ? row(word('pieces I used:', 'font-size:16px') + numBox(70, 44), 8) : ''), 6);
  const parts = [whiteBand(row(pic(B.BLOCKS, 60) + text('We have 10 pieces. Use them all for object 1. Then take it apart and use them for object 2.', 'font-size:15px;white-space:normal;width:560px'), 10), 'data-g2-setup="1"', 'padding:4px 0'), row(panel(1) + panel(2), 20, 'align-items:flex-start')];
  if (d.count) parts.push(whiteBand(row(text('Did both objects use the same number of pieces?', 'font-size:16px') + chip('yes', 'data-g2-choice="yes"') + chip('no', 'data-g2-choice="no"'), 12), 'data-g2-same="1"', 'padding:6px 0'));
  if (d.frame) parts.push(frameTile([['I used the pieces again by', 380, '.']]));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G2-587 make a map: land and water */
/** the island (seen from above): an outline, a lake inside, a river from the lake to the coast, three hills; every
 *  feature's point (for the numbered tags) in view units 0..100 x 0..70; `flip` mirrors it left to right */
const MAP_AT = { lake: [38, 30], river: [53, 47], hill: [72, 28], ocean: [7, 0] };   // a point on each feature (view units)
function islandMap(w, h, flip, tags) {
  const fx = (x) => (flip ? 100 - x : x);
  const P = (pts) => pts.map(([x, y]) => `${f1(fx(x))} ${f1(y)}`).join(' ');
  let s = `<rect x="0" y="-8" width="100" height="86" fill="#FFFFFF" stroke="${T.grid}" stroke-width=".6"/>`;
  s += `<path d="M ${P([[18, 30]])} C ${P([[16, 12], [40, 6], [56, 10]])} C ${P([[72, 6], [90, 16], [84, 34]])} C ${P([[90, 50], [72, 64], [52, 60]])} C ${P([[34, 66], [12, 54], [18, 30]])} Z" fill="#FFFFFF" stroke="${T.ink}" stroke-width=".9" data-g2-island="1"/>`;
  s += `<ellipse cx="${f1(fx(38))}" cy="30" rx="9" ry="6" fill="#FFFFFF" stroke="${T.ink}" stroke-width=".8" data-g2-feature="lake"/>`;
  s += `<path d="M ${P([[46, 32]])} C ${P([[52, 38], [50, 48], [56, 52]])} C ${P([[60, 55], [62, 58], [62, 61]])}" fill="none" stroke="${T.ink}" stroke-width="2.6" data-g2-feature="river"/><path d="M ${P([[46, 32]])} C ${P([[52, 38], [50, 48], [56, 52]])} C ${P([[60, 55], [62, 58], [62, 61]])}" fill="none" stroke="#FFFFFF" stroke-width="1.6"/>`;
  for (const [x, y] of [[64, 22], [72, 28], [66, 34]]) s += `<path d="M ${P([[x - 5, y + 3]])} Q ${P([[x, y - 6]])} ${P([[x + 5, y + 3]])} Z" fill="#FFFFFF" stroke="${T.ink}" stroke-width=".8" data-g2-feature="hill"/>`;
  const at = MAP_AT;
  for (const t of tags || []) { const [x, y] = at[t.feature]; s += `<circle cx="${f1(fx(x))}" cy="${f1(y)}" r="1.5" fill="${T.coral}" data-g2-dot="${t.feature}"/>`; }
  return svg(w, h, s, `data-g2-map="${flip ? 'flip' : 'plain'}"`, '0 -8 100 86');
}
MODES['g2-map'] = function map(d, rng) {
  const flip = rng.int(0, 1) === 1;
  const parts = [];
  const key = whiteBand(row(head('Key:', 'font-size:18px') + row(box('', 46, 34, '', 'data-g2-keybox="land"', `display:block;border:2.5px solid ${T.ink};border-radius:4px`) + word('land (green or brown)', 'font-size:16px'), 8) +
    row(box('', 46, 34, '', 'data-g2-keybox="water"', `display:block;border:2.5px solid ${T.ink};border-radius:4px`) + word('water (blue)', 'font-size:16px'), 8), 24), 'data-g2-key="1"', 'padding:6px 0');
  let meta = { flip };
  if (d.own) {
    parts.push(col(labelledDraw(W - 30, 560, 'my made-up island', 'data-dk-prompt="island"'), 0));
    parts.push(whiteBand(col(text('My key: draw each symbol and write what it shows.', 'font-size:16px') + row(Array.from({ length: 5 }, (_, k) => col(box('', 52, 40, '', `data-g2-keysym="${k}"`, `display:block;border:2.5px dashed ${T.coral};border-radius:6px`) + lineBox(110, 40), 2)).join(''), 10), 4), 'data-g2-ownkey="1"', 'padding:4px 0'));
    return { html: grow(parts.join(''), 'gap:10px'), meta: { ...meta, record: true } };
  }
  parts.push(key);
  if (d.labels) {
    // four numbered tags; each points to one feature; the numbers never in the word bank's order
    const feats = rng.shuffle(B.MAP_FEATURES);
    let bank;
    for (let t = 0; t < 200; t++) { bank = rng.shuffle(B.MAP_FEATURES); if (bank.some((x, i) => x !== feats[i])) break; }
    const mapW = W - 70, mapH = mapW * 0.86;
    const tags = feats.map((f, i) => ({ feature: f, n: i + 1 }));
    const pos = MAP_AT;
    const tagEls = tags.map((t) => { const [x, y] = pos[t.feature]; const tx = (flip ? 100 - x : x) / 100 * mapW; const ty = (y + 8) / 86 * mapH; return `<div style="position:absolute;left:${f1(tx + 6)}px;top:${f1(ty - 32)}px" data-g2-tagpos="${t.n}">${tagRing(t.n, `data-g2-tag="${t.n}" data-dk-answer="${t.feature}"`)}</div>`; }).join('');
    parts.push(`<div data-dk-box style="position:relative;width:${f1(mapW)}px;height:${f1(mapH)}px;align-self:center">${islandMap(mapW, mapH, flip, tags)}${tagEls}</div>`);
    parts.push(whiteBand(col(row(text('Word bank:') + bank.map((x) => chip(x, `data-g2-bank="${x}"`)).join(''), 10) + row([1, 2, 3, 4].map((n) => row(tagRing(n) + lineBox(110, 44), 4)).join(''), 10), 4), 'data-g2-labels="1"', 'padding:4px 0'));
    meta = { ...meta, tags: tags.map((t) => t.n + ':' + t.feature), bank };
  } else {
    const mapW = W - 20, mapH = mapW * 0.86;
    parts.push(`<div data-dk-box style="line-height:0;align-self:center">${islandMap(mapW, mapH, flip, [])}</div>`);
    parts.push(whiteBand(text('Color the key boxes first. Then color the land and the water on the map.', 'font-size:16px'), 'data-g2-tip="1"', 'padding:6px 0'));
    meta.record = true;
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta };
};

/* ---------------------------------------------------------------- G2-588 a landform model and its map (record) */
MODES['g2-landform-model'] = function landformModel(d, rng) {
  const parts = [];
  if (d.circle) {
    const order = rng.shuffle(B.LANDFORMS.filter((l) => l !== 'river'));
    parts.push(whiteBand(col(text('Circle each landform you made in your model.', 'font-size:16px') + `<div style="display:grid;grid-template-columns:repeat(3,190px);gap:12px;justify-content:center">${order.map((l) => tile(col(art(drawn(l, 150)) + word(l), 2), 190, 200, `data-g2-landform="${l}"`, 'white')).join('')}</div>`, 6), 'data-g2-circle="1"', 'padding:6px 0;flex:1 1 auto'));
    parts.push(col(labelledDraw(W - 40, 200, 'our model', 'data-dk-prompt="model"'), 0));
    return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true, order } };
  }
  const n = d.five ? 5 : 3;
  const bank = d.five ? ['hill', 'valley', 'plain', 'lake', 'mountain'] : ['hill', 'valley', 'lake'];
  parts.push(whiteBand(row(text('Word bank:') + bank.map((x) => chip(x)).join(''), 10), 'data-g2-bank="1"', 'padding:6px 0'));
  parts.push(col(labelledDraw(W - 30, d.five ? 230 : 270, 'our model from the side', 'data-dk-prompt="side"'), 0));
  parts.push(col(labelledDraw(W - 30, d.five ? 260 : 300, 'our model from above (a map)', 'data-dk-prompt="above"'), 0));
  const labels = Array.from({ length: n }, (_, k) => ['label ' + (k + 1) + ':', 200]);
  if (d.five) parts.push(whiteBand(col(text('My key: draw each symbol and name it.', 'font-size:16px') + row(bank.map((x, k) => row(box('', 40, 34, '', `data-g2-keysym="${k}"`, `display:block;border:2.5px dashed ${T.coral};border-radius:6px`) + lineBox(76, 40), 2)).join(''), 6), 2), 'data-g2-ownkey="1"', 'padding:4px 0'));
  else parts.push(whiteBand(text('Label three landforms on your map with words from the word bank.', 'font-size:16px'), 'data-g2-tip="1"', 'padding:6px 0'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, labels: labels.length } };
};

/* ---------------------------------------------------------------- G2-589 where is water on Earth? */
MODES['g2-water-sort'] = function waterSort(d, rng) {
  const cards = d.cards === 8 ? B.WATER_CARDS.slice() : null;
  let pick = cards;
  if (!pick) { const L = B.WATER_CARDS.filter((c) => c.state === 'liquid'), S = B.WATER_CARDS.filter((c) => c.state === 'solid'); pick = [...rng.sample(L, 3), ...rng.sample(S, 3)]; }
  const binOf = (c) => (d.grid ? c.state + ' + ' + c.salt : c.state);
  let order;
  for (let t = 0; t < 400; t++) { order = rng.shuffle(pick); if (!patterned(order.map((c) => c.state === 'solid'))) break; }
  const cw = order.length === 8 ? 150 : 150, per = 4;
  const strip = col(cutHead() + [order.slice(0, per), order.slice(per)].filter((r) => r.length).map((r) => row(r.map((c) => cut(cw, 132, col(pic(c.pic, 96) + small(c.label, cw - 8), 0), `data-g2-card="${c.id}" data-dk-answer="${esc(binOf(c))}"`)).join(''), 0)).join(''), 0);
  let grid;
  if (d.grid) {
    const cell = (st, sa) => box('dk-draw', 280, d.frame ? 128 : 176, `<span class="dk-head" style="position:absolute;left:10px;top:4px;font-size:17px">${st}, ${sa}</span>`, `data-g2-bin="${st} + ${sa}"`);
    grid = `<div style="display:grid;grid-template-columns:repeat(2,280px);gap:10px 14px;justify-content:center">${cell('liquid', 'salty') + cell('liquid', 'fresh') + cell('solid', 'salty') + cell('solid', 'fresh')}</div>`;
    grid = col(text('Glue each card in its box. Some boxes may stay empty.', 'font-size:15px') + grid, 4);
  } else grid = row(['liquid', 'solid'].map((b) => box('dk-draw', 300, 400, `<span class="dk-head" style="position:absolute;left:10px;top:4px">${b} water</span>`, `data-g2-bin="${b}"`)).join(''), 20);
  const parts = [grid, strip];
  if (d.frame) parts.push(frameTile([['Most of Earth’s water is in', 220, '.']], `data-g2-frame="most" data-dk-answer="${esc(B.MOST_WATER.answer)}"`) );
  if (d.frame) parts.splice(2, 0, whiteBand(row(text('Word bank:') + rng.shuffle(B.MOST_WATER.bank).map((x) => chip(x)).join(''), 10), 'data-g2-wordbank="1"', 'padding:4px 0'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { cards: order.map((c) => binOf(c) + ':' + c.id), grid: !!d.grid } };
};

/* ---------------------------------------------------------------- G2-590 globe toss: more water or land? (record) */
MODES['g2-globe-toss'] = function globeToss(d) {
  const parts = [whiteBand(row(art(earthDisc({ d: 70 }).svg) + text(`We toss the globe ${d.catches} times. Where does the catcher’s right thumb land?`, 'font-size:15px;white-space:normal;width:500px'), 12), 'data-g2-setup="1"', 'padding:4px 8px')];
  if (d.catches === 10) {
    parts.push(whiteBand(col(text('Write W for water or L for land after each catch.', 'font-size:16px') + row(Array.from({ length: 10 }, (_, k) => col(small(String(k + 1), 56) + numBox(56, 70), 0)).join(''), 6), 4), 'data-g2-catches="10"', 'padding:6px 0'));
  }
  parts.push(whiteBand(col(row(`<div style="width:110px"></div>` + word('tally', 'font-size:15px;width:330px') + word('total', 'font-size:15px'), 8, 'justify-content:flex-start') +
    ['water', 'land'].map((k) => row(`<div style="width:110px">${chip(k, `data-g2-row="${k}"`)}</div>` + box('dk-draw', 330, d.catches === 10 ? 110 : 64, '', `data-g2-tally="${k}"`) + numBox(80, 50), 8, 'justify-content:flex-start')).join(''), 6, 'align-items:flex-start'), 'data-g2-tallies="1"', 'padding:6px 12px'));
  if (d.graph) parts.push(whiteBand(col(word('catches', 'font-size:14px') + barGraph({ bars: ['water', 'land'], max: 30, step: 5, unitH: d.frame ? 5.2 : 6.8, colW: 170 }), 0, 'align-items:flex-start'), 'data-g2-graphband="1"', 'padding:4px 10px'));
  if (d.catches === 10) parts.push(whiteBand(row(text('There were more:') + chip('water', 'data-g2-choice="water"') + chip('land', 'data-g2-choice="land"') + chip('the same', 'data-g2-choice="same"'), 12), 'data-g2-more="1"', 'padding:6px 0'));
  if (d.frame) parts.push(frameTile([['Most of Earth is covered by', 200, '.'], ['We caught water', 90, 'times and land', 90, 'times.']]));
  else if (d.graph) parts.push(frameTile([['Most of Earth is covered by', 200, '.']]));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true, catches: d.catches } };
};

/* ---------------------------------------------------------------- G2-591 fast changes and slow changes */
MODES['g2-fast-slow'] = function fastSlow(d, rng) {
  const F = B.EARTH_EVENTS.filter((e) => e.speed === 'fast'), S = B.EARTH_EVENTS.filter((e) => e.speed === 'slow');
  const pick = d.cards === 4 ? [...rng.sample(F, 2), ...rng.sample(S, 2)] : [...F, ...S];
  let order;
  for (let t = 0; t < 400; t++) { order = rng.shuffle(pick); const bits = order.map((e) => e.speed === 'fast'); if (patterned(bits)) continue; if (order.length === 8 && [bits.slice(0, 4), bits.slice(4)].some((r) => r.every(Boolean) || r.every((b) => !b))) continue; break; }
  const kind = (e) => (e.id === 'mountain' ? 'mountain2' : e.id);
  const cw = d.cards === 4 ? 160 : 150, ch = d.cards === 4 ? 178 : (d.source ? 138 : 150);
  const per = 4;
  const strip = col(cutHead() + [order.slice(0, per), order.slice(per)].filter((r) => r.length).map((r) => row(r.map((e) => cut(cw, ch, col(art(drawn(kind(e), ch - 52)) + small(e.label, cw - 10), 0), `data-g2-card="${e.id}" data-dk-answer="${e.speed}"`)).join(''), 0)).join(''), 0);
  const slots = d.cards === 4 ? 2 : 4;
  const side = (k, label) => col(head(label, 'font-size:18px') + row(Array.from({ length: slots }, () => col(box('dk-draw', cw - 6, ch - 6, '', `data-g2-slot="${k}"`) + (d.source ? row(['book', 'photo', 'video'].map((s) => chip(s, '', 'font-size:12px;padding:0 5px')).join(''), 2) : ''), 2)).join(''), 4, 'flex-wrap:wrap;width:310px'), 4);
  const line = whiteBand(row(side('fast', 'minutes, hours or days') + `<div style="width:2px;align-self:stretch;background:${T.teal}"></div>` + side('slow', 'many years'), 10, 'align-items:flex-start'), 'data-g2-timeline="1"', 'padding:6px 0;flex:1 1 auto');
  const parts = [line, strip];
  if (d.source) parts.splice(1, 0, whiteBand(text('Under each card, circle what showed you how fast it was.', 'font-size:15px'), 'data-g2-tip="1"', 'padding:4px 0'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { cards: order.map((e) => e.speed + ':' + e.id) } };
};

/* ---------------------------------------------------------------- G2-592 slow changes: water shapes the land */
MODES['g2-erosion'] = function erosion(d, rng) {
  const bh = d.frame ? 230 : d.tally ? 440 : 640;
  const parts = [row(labelledDraw((W - 20) / 2, bh, 'our sand hill before', 'data-dk-prompt="before"') + labelledDraw((W - 20) / 2, bh, 'our sand hill after', 'data-dk-prompt="after"'), 20)];
  if (d.tally) parts.push(whiteBand(row(text('cups of water we poured:') + box('dk-draw', 220, 64, '', 'data-g2-tally="cups"') + word('total', 'font-size:15px') + numBox(70, 48), 10), 'data-g2-cups="1"', 'padding:6px 0'));
  if (d.tally) parts.push(whiteBand(col(text('Circle what you saw in the tray.', 'font-size:16px') + row(['a path cut into the hill', 'sand spread out at the bottom', 'the hill got lower'].map((x) => chip(x, '', 'font-size:15px')).join(''), 10), 4), 'data-g2-saw="1"', 'padding:6px 0'));
  if (d.frame) {
    const bank = rng.shuffle(B.TRAY_FRAME.bank);
    parts.push(whiteBand(row(text('Word bank:') + bank.map((x) => chip(x)).join(''), 10), 'data-g2-wordbank="1"', 'padding:4px 0'));
    parts.push(box('dk-tile dk-tile--white', W, 'auto', col(frameLine(['Our tray changed in', 220, '.']).replace('data-g1-frame="1"', `data-g1-frame="1" data-g2-blank="tray" data-dk-answer="${B.TRAY_FRAME.tray}"`) +
      frameLine(['The Colorado River made the Grand Canyon in', 200, '.']).replace('data-g1-frame="1"', `data-g1-frame="1" data-g2-blank="canyon" data-dk-answer="${B.TRAY_FRAME.canyon}"`), 4, 'align-items:flex-start'), 'data-g1-frames="1"', 'padding:6px 14px'));
    return { html: grow(parts.join(''), 'gap:10px'), meta: { record: false, bank } };
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G2-593 stop the sand from washing away (record) */
MODES['g2-sand-designs'] = function sandDesigns(d) {
  const pw = (W - 16) / 2;
  const panel = (k) => box('dk-tile', pw, '100%', col(head('Design ' + k) + row(B.DESIGN_IDEAS.map((x) => chip(x, '', 'font-size:13px;padding:0 6px')).join(''), 4, 'flex-wrap:wrap;width:' + (pw - 20) + 'px') +
    labelledDraw(pw - 24, d.judge ? 120 : d.count ? 150 : 170, 'our idea', `data-dk-prompt="idea-${k}"`, '', 16) +
    row(labelledDraw((pw - 34) / 2, d.judge ? 100 : 130, 'before', `data-dk-prompt="before-${k}"`, '', 15) + labelledDraw((pw - 34) / 2, d.judge ? 100 : 130, 'after', `data-dk-prompt="after-${k}"`, '', 15), 8) +
    (d.count ? row(word('spoonfuls of sand that washed down:', 'font-size:14px;white-space:normal;width:150px') + numBox(70, 46), 6) : '') +
    (d.judge ? col(small('a strength:', pw - 30) + lineBox(pw - 30, 44) + small('a weakness:', pw - 30) + lineBox(pw - 30, 44), 0) : '') +
    chip('this one kept more sand', `data-g2-choice="kept-${k}"`, 'font-size:14px'), 8, 'height:100%;justify-content:flex-start'), `data-dk-item="design-${k}"`, 'padding:6px 4px');
  const parts = [`<div style="flex:1 1 auto;min-height:0;display:flex;gap:16px;justify-content:center">${panel('A') + panel('B')}</div>`];
  parts.push(whiteBand(text('Circle the words for what each design used. If both kept the same sand, circle both.', 'font-size:15px'), 'data-g2-tip="1"', 'padding:4px 0'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G2-594 which real solution is best? */
MODES['g2-solutions'] = function solutions(d, rng) {
  const pick = d.n === 2 ? [B.SOLUTIONS.find((s) => s.id === 'seawall'), B.SOLUTIONS.find((s) => s.id === 'windbreak')] : B.SOLUTIONS.slice();
  const order = rng.shuffle(pick);
  const at = placesFor(order.length, 2, rng);   // where the RIGHT chip sits in each row
  const rh = d.n === 2 ? 330 : d.frame ? 116 : 132;
  const hdr = row(`<div style="width:180px"></div>` + word('Does it slow wind or water?', 'font-size:14px;width:150px;white-space:normal;line-height:16px') + (d.n > 2 ? word('How it works', 'font-size:14px;width:140px') + word('A problem', 'font-size:14px;width:116px') : '') + word('my pick', 'font-size:14px;width:50px'), 6, 'justify-content:flex-start');
  const rows = order.map((s, i) => {
    const ch = at[i] === 0 ? [s.slows, s.slows === 'wind' ? 'water' : 'wind'] : [s.slows === 'wind' ? 'water' : 'wind', s.slows];
    return box('dk-tile', W, 'auto', row(tile(col(art(drawn(s.id, Math.min(rh - 56, 166))) + small(s.label, 176), 0), 180, rh - 10, `data-g2-solution="${s.id}"`, 'white') +
      `<div style="width:150px;display:flex;flex-direction:column;gap:8px;align-items:center" data-dk-item="${s.id}" data-g1-one="1">${ch.map((c) => chip(c, `data-g2-choice="${c}" data-dk-answer="${c === s.slows ? 'right' : 'no'}"`)).join('')}</div>` +
      (d.n > 2 ? lineBox(140, 50) + lineBox(116, 50) : '') + `<div style="width:50px">${art(svg(40, 40, G1.kit.starPath(20, 21, 18), 'data-g2-star="1"'))}</div>`, 6, 'justify-content:flex-start'), `data-g2-row="${s.id}"`, 'padding:2px 6px');
  });
  const parts = [col(hdr + grow(rows.join(''), 'gap:6px;width:100%'), 4, 'flex:1 1 auto;min-height:0;align-items:stretch')];
  if (d.frame) parts.push(frameTile([['For our sandy hill I would pick', 220, 'because'], [600, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: order.map((s, i) => s.id + '@' + at[i]) } };
};

/* ---------------------------------------------------------------- G2-595 where does ice melt fastest? (record) */
MODES['g2-ice-race'] = function iceRace(d, rng) {
  const places = d.places === 2 ? B.ICE_PLACES.filter((p) => p.id === 'sun' || p.id === 'shade') : B.ICE_PLACES.slice();
  const order = rng.shuffle(places);
  const rh = d.places === 2 ? 230 : d.frame ? 112 : 128;
  const cube = (px) => art(svg(px, px, `<path d="M22 40 L40 26 L80 26 L62 40 Z M62 40 L80 26 L80 66 L62 80 Z" fill="none" stroke="${T.grid}" stroke-width="2.5" stroke-dasharray="5 4" stroke-linejoin="round"/><rect x="22" y="40" width="40" height="40" fill="none" stroke="${T.grid}" stroke-width="2.5" stroke-dasharray="5 4"/>`, 'data-g2-cubeoutline="1"', '0 0 100 100'));
  const ap = Math.min(rh - 50, 96), cp = Math.min(rh - 46, 96);
  const rows = order.map((p) => band(row(col(itemArt(p, ap) + small(p.label, 140) + (p.where ? `<span class="g1-small" data-dk-box data-g2-where="${p.where}" style="width:140px">(${p.where})</span>` : ''), 0, 'width:140px') + col(small('start', 70) + art(drawn('ice-cube', Math.min(rh - 40, 80))), 0) +
    ['10 minutes', '20 minutes', '30 minutes'].map((m) => col(small(m, 120) + tile(cube(cp), 120, Math.min(rh - 30, 150), `data-g2-box="${m}"`, 'white'), 0)).join(''), 8, 'justify-content:flex-start'), `data-dk-item="${p.id}"`, 'padding:2px 6px'));
  const parts = [whiteBand(col(text('Use ice cubes of the same size. Put them all out at the same time.', 'font-size:15px') + (places.some((p) => p.where) ? text('The tray and the mitten sit in the shade, next to the shade cube.', 'font-size:15px') : '') + text('Color the ice that is still left in each box.', 'font-size:15px'), 0), 'data-g2-tip="1" data-g2-fair="1"', 'padding:4px 0'), grow(rows.join(''), 'gap:6px')];
  parts.push(whiteBand(col(['melted fastest:', 'melted slowest:'].map((l) => row(`<div style="width:150px">${text(l)}</div>` + order.map((p) => chip(p.label, '', 'font-size:14px')).join(''), 8, 'justify-content:flex-start')).join(''), 4, 'align-items:flex-start'), 'data-g2-fastest="1"', 'padding:6px 12px'));
  if (d.frame) parts.push(frameTile([['The warmest place was', 200, '. I know because'], [600, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, places: order.map((p) => p.id) } };
};

/* ---------------------------------------------------------------- G2-596 melt it, freeze it back (record) */
MODES['g2-melt-back'] = function meltBack(d, rng) {
  const items = d.items === 2 ? [B.MELT_ITEMS[0], B.MELT_ITEMS[1]] : B.MELT_ITEMS.slice();
  const order = rng.shuffle(items);
  const rh = d.items === 2 ? 220 : d.frame ? 140 : 164;
  const rows = order.map((m) => band(row(col(itemArt(m, Math.min(rh - 64, 110)) + small(m.label, 120) + small('cooled in the ' + m.cool, 130), 0, 'width:140px') +
    ['before', 'warmed', 'cooled'].map((k) => labelledDraw(124, rh - 16, k, `data-dk-prompt="${m.id}-${k}"`, '', 15)).join('') +
    col(chip('it changed back', 'data-g2-choice="back"', 'font-size:14px;padding:1px 8px') + chip('it did not', 'data-g2-choice="not"', 'font-size:14px;padding:1px 8px'), 8), 8, 'justify-content:flex-start'), `data-dk-item="${m.id}"`, 'padding:2px 6px'));
  const parts = [whiteBand(text('We warm each one in a sealed bag in our hands or a sunny window, then cool it.', 'font-size:15px'), 'data-g2-setup="1"', 'padding:4px 0'), grow(rows.join(''), 'gap:8px')];
  if (d.frame) parts.push(frameTile([['Warming made them', 300, '.'], ['Cooling made them', 300, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, items: order.map((m) => m.id) } };
};

/* ---------------------------------------------------------------- G2-597 changes we cannot undo */
MODES['g2-can-go-back'] = function canGoBack(d, rng) {
  const C = B.CHANGE_PAIRS.filter((p) => p.back === 'can'), N = B.CHANGE_PAIRS.filter((p) => p.back === 'cannot');
  const pick = d.pairs === 4 ? [...rng.sample(C, 2), ...rng.sample(N, 2)] : [...rng.sample(C, 3), ...rng.sample(N, 3)];
  let order;
  for (let t = 0; t < 400; t++) { order = rng.shuffle(pick); if (!patterned(order.map((p) => p.back === 'can'))) break; }
  const rh = d.pairs === 4 ? 140 : d.frame ? 92 : 104;
  const side = (x, l) => col(itemArt(x, rh - 34) + small(l, 120), 0, 'width:126px');
  const rows = order.map((p) => band(row(side(p.before, p.labels[0]) + art(svg(46, 30, arrow(4, 15, 42, 15, { sw: 4, head: 11 }))) + side(p.after, p.labels[1]) +
    `<div style="display:flex;flex-direction:column;gap:8px;margin-left:16px" data-dk-item="${p.id}" data-g1-one="1">${chip('can change back', `data-g2-choice="can" data-dk-answer="${p.back === 'can' ? 'right' : 'no'}"`)}${chip('cannot change back', `data-g2-choice="cannot" data-dk-answer="${p.back === 'cannot' ? 'right' : 'no'}"`)}</div>`, 10, 'justify-content:flex-start'), `data-g2-pair="${p.id}"`, 'padding:2px 10px'));
  const parts = [grow(rows.join(''), 'gap:6px')];
  if (d.frame) {
    const bank = rng.shuffle(B.CANNOT_FRAME.bank);
    parts.push(whiteBand(row(text('Word bank:') + bank.map((x) => chip(x)).join(''), 10), 'data-g2-wordbank="1"', 'padding:4px 0'));
    parts.push(box('dk-tile dk-tile--white', W, 'auto', frameLine(['The changes that cannot go back all used', 160, '.']).replace('data-g1-frame="1"', `data-g1-frame="1" data-g2-blank="cannot" data-dk-answer="${B.CANNOT_FRAME.answer}"`), 'data-g1-frames="1"', 'padding:6px 14px'));
  }
  return { html: grow(parts.join(''), 'gap:8px'), meta: { pairs: order.map((p) => p.back + ':' + p.id) } };
};

/* ---------------------------------------------------------------- G2-598 can it change back? an argument (record) */
MODES['g2-claim'] = function claim(d) {
  const parts = [whiteBand(col(text('Circle the change you will write about.', 'font-size:16px') + row(B.CLAIM_CHANGES.map((c) => tile(col(itemArt(c, d.two ? 64 : 78) + small(c.label, 140), 0), 146, d.two ? 104 : 120, `data-g2-change="${c.id}"`, 'white')).join(''), 10), 4), 'data-g2-changes="1"', 'padding:4px 0')];
  if (!d.frames) {
    parts.push(whiteBand(row(text('My claim: it') + chip('can change back', 'data-g2-choice="can"') + chip('cannot change back', 'data-g2-choice="cannot"'), 12), 'data-g2-claim="1"', 'padding:8px 0'));
    parts.push(col(labelledDraw(W - 40, 360, 'My evidence: what I saw in our test', 'data-dk-prompt="evidence"'), 0));
  } else {
    parts.push(frameTile([['My claim:', 200, 'can / cannot change back.'], ['(Cross out the word that is not true.)']]));
    parts.push(col(labelledDraw(W - 40, d.two ? 170 : 250, 'our test', 'data-dk-prompt="test"'), 0));
    const lines = [['My evidence: I saw', 420, '.']];
    if (d.two) lines.push(['I also saw', 470, '.'], ['How could you change it back?', 300, '.'], ['(If it cannot change back, write: It cannot change back.)']);
    parts.push(frameTile(lines));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G2-599 do plants need light and water? (record) */
MODES['g2-plant-log'] = function plantLog(d) {
  const cups = d.cups === 2 ? B.PLANT_CUPS.slice(0, 2) : B.PLANT_CUPS.slice();
  const icons = (c) => row(art(drawn(c.light ? 'sun' : 'no-sun', 34)) + art(drawn(c.water ? 'drop' : 'no-drop', 34)), 2);
  const cupLabel = (c) => col(head('cup ' + c.id, 'font-size:17px') + icons(c) + small((c.light ? 'light' : 'no light') + ', ' + (c.water ? 'water' : 'no water'), 110), 0, 'width:116px');
  const weeks = ['week 1', 'week 2', 'week 3'];
  const parts = cups.some((c) => !c.light) ? [whiteBand(text('A plant in the dark can grow tall and thin, but it turns pale and weak. Look at the color and the leaves, not only the height.', 'font-size:14px;white-space:normal;width:640px'), 'data-g2-note="1"', 'padding:4px 8px')] : [];
  const cellW = 170;
  const hdr = row(`<div style="width:116px"></div>` + weeks.map((w) => `<div style="width:${cellW}px;display:flex;justify-content:center">${word(w, 'font-size:15px')}</div>`).join(''), 8, 'justify-content:flex-start');
  const rh = d.cups === 2 ? 290 : d.graph ? 100 : 122;
  const cell = (c, w) => d.cups === 2 ? labelledDraw(cellW, rh - 12, 'draw', `data-dk-prompt="${c.id}-${w}"`, '', 13)
    : box('dk-draw', cellW, rh - 12, col(row(numBox(46, 32) + word('inches', 'font-size:13px'), 4) + col(row(['green', 'pale'].map((x) => chip(x, `data-g2-leaf="${x}"`, 'font-size:12px;padding:0 6px')).join(''), 4) + chip('brown or dry', 'data-g2-leaf="brown or dry"', 'font-size:12px;padding:0 6px'), 3), 4, 'height:100%;justify-content:center'), `data-g2-cell="${c.id}-${w}"`);
  const rows = cups.map((c) => band(row(cupLabel(c) + weeks.map((w) => cell(c, w)).join(''), 8, 'justify-content:flex-start'), `data-g2-cup="${c.id}"`, 'padding:2px 6px'));
  parts.push(col(hdr + grow(rows.join(''), 'gap:6px;width:100%'), 4, 'flex:1 1 auto;min-height:0;align-items:stretch'));
  if (d.graph) parts.push(whiteBand(row(col(word('final height (inches)', 'font-size:14px') + barGraph({ bars: cups.map((c) => 'cup ' + c.id), max: 15, step: 5, unitH: 6, colW: 70 }), 0, 'align-items:flex-start') +
    col(frameLine(['Plants need', 110, 'and'], 44) + frameLine([110, 'to grow well because'], 44) + frameLine([300, '.'], 44), 2, 'align-items:flex-start'), 12, 'align-items:flex-start'), 'data-g2-graphband="1"', 'padding:4px 8px'));
  else if (d.cups === 4) parts.push(frameTile([['Plants need', 140, 'and', 140, 'to grow well.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, cups: cups.length } };
};

/* ---------------------------------------------------------------- G2-600 seeds on the move */
MODES['g2-seeds'] = function seeds(d, rng) {
  const testSeeds = d.seeds === 3 ? [B.SEEDS.find((s) => s.id === 'burr'), B.SEEDS.find((s) => s.id === 'maple'), B.SEEDS.find((s) => s.id === 'cherry')] : B.SEEDS.slice();
  const tOrder = rng.shuffle(testSeeds);
  const parts = [];
  const fur = labelledDraw(d.sort ? 200 : W - 40, d.sort ? 250 : 420, 'our fur model', 'data-dk-prompt="fur"');
  const rh = d.seeds === 3 ? 88 : 54;
  const chart = box('dk-tile dk-tile--white', d.sort ? W - 212 : W, 'auto', col(text('Did the seed stick to the fur?', 'font-size:16px') + tOrder.map((s) => row(itemArt(s, rh - 8) + `<div style="width:120px">${small(s.label, 118)}</div>` + chip('stuck', '', 'font-size:14px') + chip('fell off', '', 'font-size:14px'), 8, 'justify-content:flex-start')).join(''), 4, 'align-items:flex-start'), 'data-g2-test="1"', 'padding:4px 10px');
  parts.push(d.sort ? row(fur + chart, 10, 'align-items:flex-start') : col(fur, 0) + chart);
  let meta = { record: !d.sort, test: tOrder.map((s) => s.id) };
  if (d.sort) {
    let order;
    for (let t = 0; t < 400; t++) { order = rng.shuffle(B.SEEDS); const k = order.map((s) => s.moves); if (k[0] === k[1] && k[2] === k[3] && k[4] === k[5]) continue; break; }
    const binOrder = rng.shuffle(['sticks', 'eaten', 'wind']);
    parts.push(row(binOrder.map((b) => box('dk-draw', 212, d.frame ? 130 : 168, `<span class="dk-head" style="position:absolute;left:10px;top:4px;font-size:16px">${esc(B.SEED_BINS[b])}</span>`, `data-g2-bin="${b}"`)).join(''), 10));
    parts.push(col(cutHead() + row(order.map((s) => cut(104, 100, col(itemArt(s, 62) + small(s.label, 98), 0), `data-g2-card="${s.id}" data-dk-answer="${s.moves}"`)).join(''), 0), 0));
    meta = { ...meta, cards: order.map((s) => s.moves + ':' + s.id), bins: binOrder };
  }
  if (d.frame) parts.push(frameTile([['The animal helps the plant by', 360, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta };
};

/* ---------------------------------------------------------------- G2-601 be a pollinator (record) */
MODES['g2-pollinator'] = function pollinator(d, rng) {
  const flowers = Array.from({ length: d.flowers }, () => B.GARDEN_FLOWER);
  const gw = W - 20, gh = d.frame ? 400 : 470;
  const spots = d.flowers === 2 ? [[0.2, 0.55], [0.78, 0.45]] : [[0.16, 0.3], [0.8, 0.26], [0.22, 0.74], [0.78, 0.72]];
  const fl = flowers.map((f, i) => { const [x, y] = spots[i]; return `<div style="position:absolute;left:${f1(x * gw - 70)}px;top:${f1(y * gh - 76)}px;width:140px;display:flex;flex-direction:column;align-items:center;gap:2px" data-g2-flower="${f.noun}">${pic(f, 96)}<div class="dk-row" style="gap:4px">${box('', 26, 26, '', `data-g2-chalk="${i}"`, `display:block;border:2px solid ${T.ink};border-radius:50%`)}${small('got pollen from another flower', 104)}</div></div>`; }).join('');
  const bee = `<div style="position:absolute;left:${f1(gw / 2 - 40)}px;top:${f1(gh / 2 - 40)}px" data-g2-bee="1">${pic(B.BEE, 80)}</div>`;
  const garden = box('dk-tile dk-tile--white', gw, gh, `<span class="dk-head" style="position:absolute;left:12px;top:6px">our garden: ${d.flowers} sunflowers</span>${fl}${bee}`, 'data-g2-garden="1"', 'position:relative;display:block;align-self:center');
  const parts = [whiteBand(col(text('Our chalk is the pollen. A flower makes seeds only with pollen from a flower of the same kind.', 'font-size:15px') + text('If a flower got chalk from another flower, color its circle with that chalk color.', 'font-size:15px'), 0), 'data-g2-tip="1"', 'padding:4px 0'), garden,
    whiteBand(row(text('Draw yellow dots of pollen on one flower. Write the word pollen here:', 'font-size:15px') + box('', 140, 40, '', 'data-g2-label="pollen"', `display:block;border:2.5px solid ${T.teal};border-radius:8px`), 8), 'data-g2-labelband="1"', 'padding:6px 0')];
  if (d.frame) parts.push(frameTile([['Many flowers need a visitor to make seeds because', 160], [600, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, flowers: flowers.map((f) => f.noun) } };
};

/* ---------------------------------------------------------------- G2-602 schoolyard survey (record) */
MODES['g2-survey'] = function survey(d, rng) {
  const habs = ['lawn', 'garden or under a tree'];
  const more = () => whiteBand(col(text('Which square had more kinds? Circle one.') + row([...habs, 'the same number'].map((h) => chip(h, h === 'the same number' ? 'data-g2-tie="1"' : '')).join(''), 12), 4), 'data-g2-more="1"', 'padding:6px 0');
  const parts = [whiteBand(text('Look in one square of lawn and one square of garden (or under a tree).', 'font-size:15px'), 'data-g2-setup="1"', 'padding:4px 0')];
  if (!d.tally) {
    parts.push(row(habs.map((h) => labelledDraw((W - 20) / 2, 540, 'kinds we found: ' + h, `data-dk-prompt="${h}"`, '', 16)).join(''), 20));
    parts.push(more());
    return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
  }
  const kinds = B.SURVEY_KINDS;
  const rh = d.graph ? 38 : 48;
  const hdr = row(`<div style="width:170px"></div>` + habs.map((h) => `<div style="width:220px;display:flex;justify-content:center">${word(h, 'font-size:15px')}</div>`).join(''), 10, 'justify-content:flex-start');
  // an animal row is a tally box; a plant row is a box to check (nobody can count the blades of a lawn)
  const cellOf = (id, plant, h) => plant ? `<div style="width:220px;display:flex;justify-content:center">${box('', rh - 10, rh - 10, '', `data-g2-check="${id}|${h}"`, `display:block;border:2.5px solid ${T.ink};border-radius:4px`)}</div>` : box('dk-draw', 220, rh, '', `data-g2-tally="${id}|${h}"`);
  const label = (k) => row(itemArt(k, rh - 6) + word(k.id, 'font-size:15px'), 6, 'width:170px;justify-content:flex-start');
  const animals = kinds.filter((k) => !k.plant), plants = kinds.filter((k) => k.plant);
  const other = (id, plant) => row(row(word('other:', 'font-size:15px') + lineBox(110, rh), 4, 'width:170px;justify-content:flex-start') + habs.map((h) => cellOf(id, plant, h)).join(''), 10, 'justify-content:flex-start');
  const rowsH = row(`<div style="width:170px">${word('animals: tally', 'font-size:14px')}</div>`, 0, 'justify-content:flex-start') +
    animals.map((k) => row(label(k) + habs.map((h) => cellOf(k.id, false, h)).join(''), 10, 'justify-content:flex-start')).join('') + other('other-animal', false) +
    row(`<div style="width:170px">${word('plants: check', 'font-size:14px')}</div>`, 0, 'justify-content:flex-start') +
    plants.map((k) => row(label(k) + habs.map((h) => cellOf(k.id, true, h)).join(''), 10, 'justify-content:flex-start')).join('') + other('other-plant', true) +
    row(`<div style="width:170px">${word('number of kinds', 'font-size:15px')}</div>` + habs.map((h) => `<div style="width:220px;display:flex;justify-content:center">${numBox(80, 44, `data-g2-kinds="${h}"`)}</div>`).join(''), 10, 'justify-content:flex-start');
  parts.push(whiteBand(col(hdr + rowsH, 4, 'align-items:flex-start'), 'data-g2-tallies="1"', 'padding:4px 8px'));
  if (d.graph) parts.push(whiteBand(row(col(word('kinds', 'font-size:14px') + barGraph({ bars: habs, max: 10, step: 2, unitH: 7, colW: 128 }), 0, 'align-items:flex-start') + col(frameLine(['The', 200], 44) + frameLine(['had more kinds because'], 44) + frameLine([300, '.'], 44) + `<span class="g1-small" data-dk-box style="width:290px;text-align:left">A tie? Check this box instead:</span>` + row(box('', 24, 24, '', 'data-g2-tiebox="1"', `display:block;border:2.5px solid ${T.ink};border-radius:4px`) + `<span class="g1-small" data-dk-box style="width:250px;text-align:left">Both had the same number of kinds.</span>`, 6, 'justify-content:flex-start'), 2, 'align-items:flex-start'), 10, 'align-items:flex-start'), 'data-g2-graphband="1"', 'padding:4px 8px'));
  else parts.push(more());
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G2-603 compare habitats */
MODES['g2-habitats3'] = function habitats3(d, rng) {
  const colW = (W - 24) / 3;
  const parts = [];
  let meta = { record: true };
  if (d.bank) {
    let order;
    for (let t = 0; t < 400; t++) { order = rng.shuffle(B.HABITAT_BANK); if (!order.some((c, i) => i && c.home === order[i - 1].home)) break; }
    const columns = B.HABITATS3.map((h) => box('dk-draw', colW, 400, `<span class="dk-head" style="position:absolute;left:10px;top:4px">${h}</span>`, `data-g2-bin="${h}"`)).join('');
    parts.push(row(columns, 12, 'align-items:stretch'));
    parts.push(col(cutHead() + [order.slice(0, 5), order.slice(5)].map((r) => row(r.map((c) => cut(124, 132, col(itemArt(c, 92) + `<span class="g1-small" data-dk-box data-g2-cardname="1" style="width:118px">${esc(c.label || c.id)}</span>`, 0), `data-g2-card="${c.id}" data-dk-answer="${c.home}"`)).join(''), 0)).join(''), 0));
    meta = { cards: order.map((c) => c.home + ':' + c.id) };
  } else {
    const ch = d.frame ? 420 : 640;
    parts.push(row(B.HABITATS3.map((h) => box('dk-draw', colW, ch, `<span class="dk-head" style="position:absolute;left:10px;top:4px">${h}</span>` + `<div style="position:absolute;left:10px;right:10px;top:40px;bottom:10px;display:flex;flex-direction:column;justify-content:space-between">${Array.from({ length: 5 }, (_, k) => `<div style="border-bottom:1.5px solid ${T.grid};height:18px;font:700 14px 'Nunito';color:${T.inkSoft}">${k + 1}.</div>`).join('')}</div>`, `data-g2-col="${h}"`)).join(''), 12));
    parts.push(whiteBand(row(text('In our books, the most kinds were in the:') + B.HABITATS3.map((h) => chip(h)).join(''), 10), 'data-g2-most="1"', 'padding:6px 0'));
    if (d.frame) parts.push(frameTile([['The', 140, 'had more kinds than the', 140, '.'], ['Both the', 140, 'and the', 140, 'had', 90, '.']]));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta };
};

/* ---------------------------------------------------------------- G2-604 plants for every habitat */
MODES['g2-plant-homes'] = function plantHomes(d, rng) {
  const plants = rng.shuffle(B.PLANT_HOMES);
  const order = derange(3, rng);
  const homes = order.map((k) => plants[k]);
  const homeDraw = { desert: 'desert', 'shady forest': 'shady-forest', pond: 'pond' };
  const ih = d.parts ? (d.frame ? 118 : 140) : 176;
  const L = plants.map((p) => row(tile(col(itemArt(p, ih - 40) + small(p.label, 140), 0), 170, ih, `data-g2-left="${p.id}"`, 'white') + DOT(), 8)).join('');
  const R = homes.map((p) => row(DOT() + tile(col(art(drawn(homeDraw[p.home], ih - 40)) + small(p.home === 'pond' ? 'a pond' : p.home === 'desert' ? 'a desert' : 'a shady forest floor', 150), 0), 170, ih, `data-g2-right="${p.id}"`, 'white'), 8)).join('');
  const parts = [whiteBand(row(`<div style="display:flex;flex-direction:column;gap:10px">${L}</div><div style="width:90px"></div><div style="display:flex;flex-direction:column;gap:10px">${R}</div>`, 0, 'align-items:flex-start'), 'data-g2-match="1"', 'padding:8px 0;flex:1 1 auto')];
  const items = [];
  if (d.parts) {
    const phrases = B.PLANT_HOMES.map((p) => p.part);
    const pat = placesFor(plants.length, 3, rng);
    parts.push(whiteBand(col(text('Circle the part that helps each plant grow there.', 'font-size:16px') + plants.map((p, pi) => {
      const ch = rng.shuffle(phrases.filter((x) => x !== p.part)); ch.splice(pat[pi], 0, p.part);
      items.push(p.id + '@' + ch.indexOf(p.part));
      return row(`<div style="width:110px">${word(p.label, 'font-size:15px')}</div>` + `<div class="dk-row" style="gap:6px" data-dk-item="${p.id}" data-g1-one="1">${ch.map((c) => chip(c, `data-g2-part="${esc(c)}" data-dk-answer="${c === p.part ? 'right' : 'no'}"`, 'font-size:13px;padding:1px 7px')).join('')}</div>`, 6, 'justify-content:flex-start');
    }).join(''), 4, 'align-items:flex-start'), 'data-g2-parts="1"', 'padding:4px 8px'));
  }
  if (d.frame) parts.push(frameTile(plants.map((p) => ['The ' + p.label + ' grows well there because', 270, '.'])));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { pairs: plants.map((p) => p.id), right: homes.map((p) => p.id), items } };
};

/* ================================================================ the type */
function makeG2Type({ id, slug, mode, exerciseType, difficulty, i18n }) {
  if (!MODES[mode]) throw new Error('dk-g2: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G2', assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    difficulty,
    i18n,
    dkMode: mode,
    build({ difficulty: lv, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the Batch 2 pages are English (no ${locale} bank)`);
      const d = this.difficulty[lv] || this.difficulty[2];
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${DK.CSS}${G2CSS}</style><div class="dk-root" data-ws-content data-dk="${mode}" data-dk-level="${lv}" data-dk-record="${out.meta.record ? 1 : 0}">${out.html}</div>`,
        meta: { mode, level: Number(lv), ...out.meta },
      };
    },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(G1.g1VerifyInPage), await page.evaluate(g2VerifyInPage));
    },
  };
}

/** the Batch 2 page checks (in page.evaluate): cut-out cards and bins agree; numbered tags sit inside the map; every
 *  bar graph has its bars; the poster checklist and the 14 suns are there where the page has them */
function g2VerifyInPage() {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no dk root'];
  const bins = [...R.querySelectorAll('[data-g2-bin]')].map((b) => b.dataset.g2Bin);
  R.querySelectorAll('[data-g2-card][data-dk-answer]').forEach((c) => { if (bins.length && !bins.includes(c.dataset.dkAnswer) && !R.querySelector('[data-g2-slot]')) f.push(`card ${c.dataset.g2Card}: its answer "${c.dataset.dkAnswer}" is no bin on the page`); });
  const map = R.querySelector('[data-g2-map]');
  if (map) { const m = map.getBoundingClientRect(); R.querySelectorAll('[data-g2-tag]').forEach((t) => { const q = t.getBoundingClientRect(); if (q.left < m.left - 1 || q.right > m.right + 1 || q.top < m.top - 1 || q.bottom > m.bottom + 1) f.push(`map tag ${t.dataset.g2Tag} runs off the map`); }); }
  R.querySelectorAll('[data-g2-graph]').forEach((g) => { if (!g.querySelector('[data-g2-bar]')) f.push('a bar graph without bars');
    // review round 2: a drawn line at EVERY unit (2.MD.D.10), each a real line across the bars, in order
    const max = Number(g.dataset.g2Max), ys = [...g.querySelectorAll('[data-g2-gridline]')].map((l) => [Number(l.dataset.g2Gridline), l.getBoundingClientRect()]);
    const have = new Set(ys.map(([k]) => k));
    if (!(max > 0) || ys.length !== max + 1 || [...Array(max + 1).keys()].some((k) => !have.has(k))) f.push(`a bar graph without a line at every unit (${ys.length} lines for 0..${g.dataset.g2Max})`);
    else { const byK = ys.sort((a, b) => a[0] - b[0]); for (let k = 1; k < byK.length; k++) if (!(byK[k][1].top < byK[k - 1][1].top - 2)) { f.push('a bar graph whose unit lines are not spaced up the axis'); break; } } });
  // review round 2: every ad name sits inside its package (no package line cuts a letter)
  R.querySelectorAll('[data-g2-adname]').forEach((n) => { const pk = n.closest('svg') && n.closest('svg').querySelector('[data-g2-package]'); if (!pk) { f.push(`the ad name "${n.dataset.g2Adname}" has no package`); return; }
    const q = n.getBoundingClientRect(), p = pk.getBoundingClientRect(), m = p.width * 0.06;
    if (q.left < p.left + m || q.right > p.right - m || q.top < p.top || q.bottom > p.bottom) f.push(`the ad name "${n.dataset.g2Adname}" runs out of its package`); });
  R.querySelectorAll('[data-g2-suns]').forEach((s) => { const n = s.querySelectorAll('[data-g1-sun]').length; if (n !== Number(s.dataset.g2Suns)) f.push(`the sun strip has ${n} suns (${s.dataset.g2Suns})`); });
  R.querySelectorAll('[data-g2-pairone]').forEach((g) => { const a = [...g.querySelectorAll('[data-dk-answer]')].map((e) => e.dataset.dkAnswer); if (a.filter((x) => x === 'safe').length !== 1 || a.length !== 2) f.push(`${g.dataset.g2Pairone}: not one safe card of two`); });
  // review round 1: a life jacket is worn on the TORSO (below the head, not over it); a helmet sits ON a head (unless it is
  // the one hung on the handlebars)
  const headsIn = (el) => [...(el.closest('svg') || R).querySelectorAll('[data-k2-head]')].map((h) => h.getBoundingClientRect());
  R.querySelectorAll('[data-g2-lifejacket]').forEach((v) => { const q = v.getBoundingClientRect(); const hs = headsIn(v); const h = hs.find((x) => x.right > q.left && x.left < q.right);
    if (!h) f.push('a life jacket with no child under it'); else if (q.top < h.bottom - 0.5 || q.top > h.bottom + h.height) f.push(`a life jacket that is not on the torso (its top ${Math.round(q.top - h.bottom)} px from the head's bottom)`); });
  R.querySelectorAll('[data-g2-helmet]:not([data-g2-onbars])').forEach((v) => { const q = v.getBoundingClientRect(); const hs = headsIn(v); const cx = (x) => (x.left + x.right) / 2;
    if (!hs.some((h) => cx(h) > q.left && cx(h) < q.right && h.top >= q.top - 1 && h.top < q.bottom)) f.push('a helmet that is on no head'); });
  return f;
}

module.exports = { makeG2Type, MODES, g2VerifyInPage, drawn, DRAW, barGraph, growDraw, itemArt, cut, cutHead, tagRing, G2CSS };
