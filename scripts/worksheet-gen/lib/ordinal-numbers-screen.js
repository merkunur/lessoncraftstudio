/**
 * ordinal-numbers-screen.js — Level Set 2026-10-14 (walk #62, Ordinal Numbers, PDF + interactive + key): the SCREEN
 * version and the ANSWER KEY of K-320 and its five faces, built from the PRINTED page's own draw (render-instance
 * rebuilds the same instance with a fresh rng and asserts meta identity), plus the robot's INDEPENDENT oracles.
 *
 * The paper tasks and their screens:
 *   base / either end (K-320, K-336)  "count to the chip, mark that picture"  → tap-choice: one card per chip — the
 *        chip's place, the whole line-up once (unbroken, flag + arrow), and the line-up again as big tap targets in
 *        order FROM THE FLAG (wrapped onto two lines past five pictures; a right-start line runs right to left).
 *   words (G1-316)  "draw a line from the word to the picture"  → tap-choice: one card per word, same line-up.
 *   write (G1-315) · which place (G1-317) · race (G1-318)  the child WRITES the place → type-word: the printed page
 *        redrawn big, a write box over every empty box, typed on a pad (digits, letters and the locale's marks).
 * The KEY is the printed page with every answer in coral: the target picture ringed and badged with its place, every
 * empty box filled in.
 *
 * The oracles never read a correct mark or an answer stamp: each recomputes the place from the line-up order, the
 * start side and the asked place (or, for the race, from every runner's distance to the finish).
 */
'use strict';
const { fileUri } = require('./b2-common.js');
const { ordinalFor, bank } = require('./b3-common.js');

const CORAL = '#F2784B', TEAL = '#146B5E', INK = '#3A3530';
const SCR_W = 660, OPT = 104;   // 104 page-px reaches the 44 px tap floor at 360 wide (Read and Do, measured)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cssStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const img = (theme, noun, px, extra = '') => `<img src="${fileUri(theme, noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain${extra}">`;

/** The start flag (pole + coral pennant); `right` mirrors it so the pennant points into the line. */
function flag(start, h = 60) {
  const g = `<line x1="4" y1="4" x2="4" y2="${h - 4}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><polygon points="5,4 27,14 5,24" fill="${CORAL}"/>`;
  return `<svg width="32" height="${h}" viewBox="0 0 32 ${h}" aria-hidden="true" style="flex:0 0 32px">${start === 'right' ? `<g transform="translate(32 0) scale(-1 1)">${g}</g>` : g}</svg>`;
}
/** A direction arrow under a row, pointing away from the flag. */
function arrow(w, start) {
  const g = `<line x1="4" y1="9" x2="${w - 16}" y2="9" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><polygon points="${w - 16},2 ${w - 2},9 ${w - 16},16" fill="${INK}"/>`;
  return `<svg width="${w}" height="18" viewBox="0 0 ${w} 18" aria-hidden="true">${start === 'right' ? `<g transform="translate(${w} 0) scale(-1 1)">${g}</g>` : g}</svg>`;
}
/** Indices of a line-up in order FROM THE FLAG. */
const fromFlag = (n, start) => Array.from({ length: n }, (_, j) => (start === 'left' ? j : n - 1 - j));
/** The place (1-based) of tile idx under the start side. */
const kOf = (idx, n, start) => (start === 'left' ? idx + 1 : n - idx);
/** How many pictures per line on a wrapped line-up: one line up to five, else two even lines. */
const perLine = (n) => (n <= 5 ? n : Math.ceil(n / 2));

/** The whole line-up, once, unbroken (reading only — never a tap target). */
function stripView(theme, order, start) {
  const n = order.length;
  const t = Math.min(62, Math.floor((SCR_W - 24 - 40 - (n - 1) * 6) / n));
  const tiles = order.map((noun) => `<span style="display:inline-flex;width:${t}px;height:${t}px;align-items:center;justify-content:center;background:#fff;border:2px solid #EFE4D2;border-radius:8px;box-sizing:border-box">${img(theme, noun, t - 10)}</span>`).join('');
  const w = n * t + (n - 1) * 6;
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 10px;background:#FBF3E4;border-radius:12px">` +
    `<div style="display:flex;gap:6px;align-items:center;${start === 'right' ? 'flex-direction:row-reverse' : ''}">${flag(start, t)}<div style="display:flex;gap:6px">${tiles}</div></div>` +
    `<div style="${start === 'right' ? 'align-self:flex-start;margin-left:10px' : 'align-self:flex-end;margin-right:10px'}">${arrow(w, start)}</div></div>`;
}

/** Lines of cells in order from the flag; `cell(idx, j)` draws one. Right starts run right to left. */
function wrapped(n, start, cell, gap = 12) {
  const seq = fromFlag(n, start), per = perLine(n), lines = [];
  for (let i = 0; i < n; i += per) {
    const cells = seq.slice(i, i + per).map((idx, j) => cell(idx, i + j)).join('');
    const lead = i === 0 ? flag(start, OPT) : '<span style="width:32px;flex:0 0 32px"></span>';
    lines.push(`<div style="display:flex;gap:${gap}px;align-items:flex-start;${start === 'right' ? 'flex-direction:row-reverse' : ''}">${lead}${cells}</div>`);
  }
  return `<div style="display:flex;flex-direction:column;gap:12px;align-items:${start === 'right' ? 'flex-end' : 'flex-start'}">${lines.join('')}</div>`;
}

function card(meta, top, body) {
  return `<div data-lcs-item ${meta} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;flex-direction:column;align-items:center;gap:10px">${top}</div>${body}</div>`;
}
const cueChip = (text) => `<span style="display:inline-flex;align-items:center;height:62px;padding:0 26px;border-radius:31px;background:#E3F1EE;border:3px solid ${TEAL};font-family:'Baloo 2',cursive;font-weight:700;font-size:40px;line-height:1;color:${TEAL}">${esc(text)}</span>`;

/** A tap-choice card: the place `k` on a line-up; the options are the line-up's pictures in order from the flag. */
function choiceCard(theme, order, start, k, cueHtml, extraMeta) {
  const n = order.length;
  const target = start === 'left' ? k - 1 : n - k;
  const opt = (idx) => `<span class="ws-achip" data-lcs-opt="${idx}" data-lcs-label="${esc(order[idx])}"${idx === target ? ' data-lcs-correct="1"' : ''} ` +
    `style="width:${OPT}px;height:${OPT}px;min-height:${OPT}px;box-sizing:border-box;padding:6px;display:inline-flex;align-items:center;justify-content:center">${img(theme, order[idx], 84)}</span>`;
  const meta = `data-lcs-k="${k}" data-lcs-start="${start}" data-lcs-order="${esc(order.join(','))}" ${extraMeta || ''}`;
  return card(meta, cueHtml + stripView(theme, order, start), wrapped(n, start, opt));
}

/** A write box (type-word): the empty box of the printed page, big; its meta lets the oracle recompute the answer. */
function writeBox(answer, alts, label, meta, w = OPT, h = OPT) {
  return `<span class="ws-blankbox" data-lcs-wbox data-lcs-answer="${esc(answer)}" data-lcs-label="${esc(label)}" data-lcs-alts="${esc(alts.join('|'))}" ${meta} ` +
    `style="width:${w}px;height:${h}px;flex:0 0 ${w}px;box-sizing:border-box"></span>`;
}
// Accepted alternates on the SCREEN (native + pedagogy review 2026-10-14): what a teacher in that country marks right
// besides the printed notation — never a bare number where the dot / suffix IS the school notation (de 3., sv 3:e),
// never a word (the bank's no "syvende" is a spelling of the WORD, not a notation: kept off the screen).
const SCREEN_ALTS = {
  es: (k) => [`${k}º`, `${k}°`, `${k}.°`].concat(k === 1 ? ['1er', '1.er'] : k === 3 ? ['3er', '3.er'] : []),
  fr: (k) => (k === 1 ? ['1re', '1ère'] : k === 2 ? ['2nd', '2d', '2ème'] : [`${k}ème`]),
  it: (k) => [`${k}°`],
  pt: (k) => [`${k}°`, `${k}.º`, `${k}ª`],   // "a colocação" (the race page's own word) is feminine
  nl: (k) => (k === 1 ? ['1ste'] : k === 8 ? ['8ste'] : [`${k}de`]),
};
function altsOf(loc, k) {
  const own = ((bank('ordinals', loc).alt || {})[k] || []).filter((a) => /\d/.test(a));
  const extra = SCREEN_ALTS[loc] ? SCREEN_ALTS[loc](k) : [];
  const canon = ordinalFor(loc, k);
  return [...new Set(own.concat(extra))].filter((a) => a !== canon);
}
/** every alternate of a locale (the keypad must be able to type each one) */
const allAlts = (loc) => Array.from({ length: 10 }, (_, i) => altsOf(loc, i + 1)).flat();
const wordOf = (entries, noun) => { const e = entries.find((x) => x.noun === noun); return e ? (e.singular || noun) : noun; };

/* ------------------------------------------------------------------ screens */
function screen(layout, d, built, { theme, loc, entries }) {
  const M = built.meta;
  const items = [];
  if (layout === 'base') {
    M.strips.forEach((s, si) => s.chips.forEach(([k]) => items.push(choiceCard(theme, s.order, s.start, k, cueChip(ordinalFor(loc, k)), `data-lcs-strip-n="${si + 1}"`))));
  } else if (layout === 'words') {
    M.strips.forEach((s, si) => s.words.forEach(([k, text]) => items.push(choiceCard(theme, s.order, s.start, k,
      `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:40px;line-height:1.2;color:${INK}">${esc(text)}</span>`, `data-lcs-word="${esc(text)}" data-lcs-strip-n="${si + 1}"`))));
  } else if (layout === 'write') {
    M.strips.forEach((s, si) => {
      const n = s.order.length;
      const cell = (idx) => {
        const k = kOf(idx, n, s.start);
        const ans = s.answers[idx];
        const pic = `<span style="display:inline-flex;width:${OPT}px;height:${OPT}px;align-items:center;justify-content:center;background:#fff;border:2px solid #EFE4D2;border-radius:10px;box-sizing:border-box">${img(theme, s.order[idx], 86)}</span>`;
        const under = ans == null
          ? `<span style="display:inline-flex;width:${OPT}px;height:${OPT}px;align-items:center;justify-content:center;background:#fff;border:2px solid #EFE4D2;border-radius:10px;box-sizing:border-box;font-family:'Baloo 2',cursive;font-weight:700;font-size:38px;color:${INK}">${esc(ordinalFor(loc, k))}</span>`
          : writeBox(ans, altsOf(loc, k), wordOf(entries, s.order[idx]), `data-lcs-idx-of="${idx}" data-lcs-n="${n}" data-lcs-start="${s.start}" data-lcs-gender="${(s.genders && s.genders[idx]) || 'm'}"`);
        return `<span style="display:inline-flex;flex-direction:column;gap:8px">${pic}${under}</span>`;
      };
      items.push(`<div data-ws-content data-lcs-keep data-lcs-panel="${si + 1}" style="width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box;display:flex;justify-content:center">${wrapped(n, s.start, cell)}</div>`);
    });
  } else if (layout === 'where') {
    M.strips.forEach((s, si) => {
      const n = s.order.length;
      const tile = (idx) => `<span style="display:inline-flex;width:96px;height:96px;align-items:center;justify-content:center;background:#fff;border:2px solid #EFE4D2;border-radius:10px;box-sizing:border-box">${img(theme, s.order[idx], 80)}</span>`;
      const qs = s.queries.map(([noun, k]) => `<span style="display:inline-flex;align-items:center;gap:10px">` +
        `<span style="display:inline-flex;width:${OPT}px;height:${OPT}px;align-items:center;justify-content:center;background:#fff;border:3px solid ${TEAL};border-radius:12px;box-sizing:border-box">${img(theme, noun, 86)}</span>` +
        `<svg width="28" height="24" viewBox="0 0 28 24" aria-hidden="true"><line x1="2" y1="12" x2="16" y2="12" stroke="${INK}" stroke-width="3"/><polygon points="15,4 26,12 15,20" fill="${INK}"/></svg>` +
        writeBox(ordinalFor(loc, k), altsOf(loc, k), wordOf(entries, noun), `data-lcs-qnoun="${esc(noun)}" data-lcs-order="${esc(s.order.join(','))}" data-lcs-start="${s.start}"`) + `</span>`).join('');
      items.push(`<div data-ws-content data-lcs-keep data-lcs-panel="${si + 1}" style="width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:16px">` +
        wrapped(n, s.start, tile, 10) + `<div style="display:flex;flex-wrap:wrap;gap:16px 28px;justify-content:center">${qs}</div></div>`);
    });
  } else if (layout === 'race') {
    const LW = 500, H = OPT, f = LW / (d.laneW || 543), pic = 60;
    const b = bank('ordinals', loc), facing = (b.facing && b.facing[theme]) || {};
    const xs = M.runners.map((r) => r[1]).join(',');
    M.runners.forEach(([noun, x, rank]) => {
      const sx = Math.round(x * f * 10) / 10;
      const mirror = (facing[noun] || facing.default || 'front') === 'left' ? ';transform:scaleX(-1)' : '';
      const lane = `<span style="position:relative;display:inline-block;width:${LW}px;height:${H}px;flex:0 0 ${LW}px">` +
        `<svg width="${LW}" height="${H}" aria-hidden="true" style="position:absolute;left:0;top:0"><line x1="6" y1="${H / 2}" x2="${sx}" y2="${H / 2}" stroke="#8A8276" stroke-width="3" stroke-dasharray="6 6"/></svg>` +
        `<img src="${fileUri(theme, noun)}" alt="" style="position:absolute;left:${sx}px;top:${(H - pic) / 2}px;width:${pic}px;height:${pic}px;object-fit:contain${mirror}"></span>`;
      const fin = `<svg width="16" height="${H}" aria-hidden="true">${Array.from({ length: Math.ceil(H / 8) * 2 }, (_, i) => { const r = Math.floor(i / 2), c = i % 2; return `<rect x="${c * 8}" y="${r * 8}" width="8" height="8" fill="${(r + c) % 2 ? "#FFFFFF" : TEAL}"/>`; }).join('')}</svg>`;
      items.push(`<div data-ws-content data-lcs-keep style="width:${SCR_W}px;display:flex;align-items:center;gap:8px;padding:6px 10px;background:#fff;border:2px solid #F0E4CB;border-radius:12px;box-sizing:border-box">` +
        lane + fin + writeBox(ordinalFor(loc, rank), altsOf(loc, rank), wordOf(entries, noun), `data-lcs-x="${x}" data-lcs-xs="${xs}"`) + `</div>`);
    });
  } else throw new Error('ordinal screen: unknown layout ' + layout);
  return { bodyHtml: `<div data-ws-content data-lcs-screen="ordinal-${layout}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:8px">${items.join('')}</div>`, meta: M };
}

/* ------------------------------------------------------------------ the key: the printed page + every answer in coral */
function key(layout, built, { loc }) {
  const M = built.meta;
  const css = [];
  const P = (i) => `[data-lcs-ordinal-page] > :nth-child(${i + 1})`;
  const badge = (sel, text) => css.push(`${sel}{position:relative;outline:4px solid ${CORAL};outline-offset:1px}`,
    `${sel}::after{content:"${cssStr(text)}";position:absolute;top:-12px;right:-10px;padding:0 6px;min-width:26px;height:24px;border-radius:12px;background:${CORAL};color:#fff;font:700 15px/24px 'Baloo 2',cursive;text-align:center;white-space:nowrap}`);
  let html = built.bodyHtml;
  if (layout === 'base') {
    M.strips.forEach((s, si) => s.chips.forEach(([k, , target]) => badge(`${P(si)} [data-lcs-idx="${target}"]`, ordinalFor(loc, k))));
  } else if (layout === 'words') {
    M.strips.forEach((s, si) => s.words.forEach(([k, , target]) => {
      badge(`${P(si)} [data-lcs-idx="${target}"]`, ordinalFor(loc, k));
      badge(`${P(si)} [data-lcs-word-k="${k}"]`, ordinalFor(loc, k));
    }));
  } else {
    // every empty box carries its answer: written INTO the box, centred, coral
    html = html.replace(/(<span class="ws-blankbox"[^>]*data-lcs-answer="([^"]*)"[^>]*style=")([^"]*)("[^>]*>)(<\/span>)/g,
      (m0, open, ans, style, close, end) => `${open}${style};display:inline-flex;align-items:center;justify-content:center${close}<span data-lcs-keytext style="font-family:'Baloo 2',cursive;font-weight:700;font-size:22px;line-height:1;color:${CORAL}">${ans}</span>${end}`);
  }
  return { bodyHtml: html + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : ''), meta: M };
}

/* ------------------------------------------------------------------ oracles (independent) */
/** tap-choice: the option whose picture stands at place k from the flag. */
function choiceOracle(items) {
  return items.map((it) => {
    const m = it.meta || {};
    const order = String(m['data-lcs-order'] || '').split(','), start = m['data-lcs-start'], k = Number(m['data-lcs-k']);
    if (!order.length || !['left', 'right'].includes(start) || !(k >= 1 && k <= order.length)) throw new Error('ordinal oracle: incomplete card meta');
    const noun = order[start === 'left' ? k - 1 : order.length - k];
    const hits = it.options.map((o, i) => ((typeof o === 'object' ? o.label : o) === noun ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`ordinal oracle: ${hits.length} options show "${noun}"`);
    return hits[0];
  });
}
/** type-word: the place written in the locale's own notation, recomputed from the box's meta. */
function writeOracle(items, locale) {
  const loc = String(locale || 'en').slice(0, 2);
  return items.map((it) => {
    const m = it.meta || {};
    if (m['data-lcs-xs']) {   // race: rank by distance to the finish (the farther right, the nearer)
      const xs = m['data-lcs-xs'].split(',').map(Number), x = Number(m['data-lcs-x']);
      return ordinalFor(loc, 1 + xs.filter((o) => o > x).length);
    }
    if (m['data-lcs-qnoun']) {   // which place: find the picture in its line-up
      const order = String(m['data-lcs-order']).split(','), idx = order.indexOf(m['data-lcs-qnoun']);
      if (idx < 0 || order.indexOf(m['data-lcs-qnoun'], idx + 1) >= 0) throw new Error('ordinal oracle: the asked picture is not once in its line');
      return ordinalFor(loc, kOf(idx, order.length, m['data-lcs-start']));
    }
    const idx = Number(m['data-lcs-idx-of']), n = Number(m['data-lcs-n']);
    if (!Number.isInteger(idx) || !(n >= 2)) throw new Error('ordinal oracle: no place on a write box');
    return ordinalFor(loc, kOf(idx, n, m['data-lcs-start']), m['data-lcs-gender'] === 'f' ? 'f' : 'm');
  });
}

module.exports = { screen, key, choiceOracle, writeOracle, altsOf, allAlts, _kOf: kOf };
