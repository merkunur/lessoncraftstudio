/**
 * division-remainder-screen.js — Level Set 2026-10-06 (Division with Remainders, PDF + interactive): the SCREEN version
 * and the ANSWER KEY of a built G3-377 page (the base or one of its five faces), plus the robot's INDEPENDENT oracle.
 * New pages only — the published page (level 2, copy 1) never reaches this module.
 *
 *   screen: one card per division — the pictures of the pile (the two picture pages: ring the groups, share it out),
 *           the shown WRONG working struck through (find the error), then the division in the locale's own notation
 *           with "?" for the answer and the remainder, and three options written the way the page writes them (the
 *           right-hand side of the notation template: en "4 R2", de "4 R 2", fi "4, jää 2", fr "(5 × 4) + 3").
 *           Wrong options = the two slips the page is about: one group too few with the remainder too big
 *           (q − 1, r + d), and the leftover miscounted by one (q, r ± 1); a third, one group too many (q + 1, r).
 *           The right option's slot is irregular (lib/answer-slots.js — never a rotation).
 *   oracle: q = floor(n / d), r = n − q·d from the card's n and d, written with the locale's template — never the
 *           page's stamped answer.
 *   key:    the printed page with q and r written in every answer box (HTML boxes: centred; casita SVG boxes: a
 *           centred <text>), the right pill ringed on "exact or not".
 */
'use strict';
const { slotFor } = require('./answer-slots.js');
const { fileUri } = require('./b2-common.js');

const CORAL = '#F2784B', INK = '#1F2B2A';
const SCR_W = 660, OPT_H = 96;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function bankOf(loc) { return require('./b3-common.js').bank('division-with-remainder', loc); }
function divSign(loc) { return require('../types/_shared/notation.js').divGlyph(loc); }

/** the template with n, d filled (and q, r when given); the op glyph is the locale's own */
function fill(tpl, v, loc) {
  return String(tpl).replace(/÷|:|\//g, (m) => (m === ':' || m === '÷' || m === '/' ? m : m))
    .replace('{n}', v.n).replace('{d}', v.d).replace('{q}', v.q).replace('{r}', v.r);
}
/** what an option shows: the right-hand side of the template (after its "="), q and r filled */
function answerLabel(tpl, n, d, q, r) {
  const s = String(tpl);
  const i = s.indexOf('=');
  return s.slice(i + 1).trim().replace('{n}', n).replace('{d}', d).replace('{q}', q).replace('{r}', r);
}
/** the question: the whole template with q and r shown as "?" */
function question(tpl, n, d) { return String(tpl).replace('{n}', n).replace('{d}', d).replace('{q}', '?').replace('{r}', '?'); }

/** three distinct options; the right one at `at` */
function optionsFor(tpl, it, at) {
  const { n, d, q, r } = it;
  const wrong = [];
  const add = (q2, r2) => { if (q2 >= 0 && r2 >= 0 && !(q2 === q && r2 === r)) wrong.push(answerLabel(tpl, n, d, q2, r2)); };
  const slip = slotFor(n + 'x' + d, 2);   // which slips lead, varying card to card
  const cand = [[q - 1, r + d], [q, r + 1 < d ? r + 1 : r - 1], [q + 1, r]];
  if (slip) cand.push(cand.shift());
  for (const [a, b] of cand) add(a, b);
  const right = answerLabel(tpl, n, d, q, r);
  const o = [...new Set(wrong.filter((x) => x !== right))].slice(0, 2);
  if (o.length < 2) throw new Error(`division-remainder screen: only ${o.length} wrong options for ${n} / ${d}`);
  o.splice(at, 0, right);
  return { opts: o, right };
}

function pictures(theme, noun, n) {
  if (!theme || !noun) return '';
  const src = fileUri(theme, noun);
  const imgs = Array.from({ length: n }, () => `<img src="${src}" alt="" style="width:40px;height:40px;object-fit:contain">`).join('');
  return `<div style="display:grid;grid-template-columns:repeat(10,40px);gap:6px;justify-content:center">${imgs}</div>`;
}

function screen(built, loc) {
  const m = built.meta;
  const items = m.items || [];
  if (!items.length) throw new Error('division-remainder screen: no items in meta');
  const tpl = bankOf(loc).notation.template;
  const theme = m.theme || null;
  const cards = items.map((it, i) => {
    const at = slotFor(it.n + '/' + it.d + '|' + i, 3);
    const { opts, right } = optionsFor(tpl, it, at);
    const px = Math.max(20, Math.min(32, Math.floor(560 / (0.6 * Math.max(...opts.map((x) => [...x].length))))));
    const wide = opts.some((x) => [...x].length > 9);
    const chips = opts.map((v, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${esc(v)}"${v === right ? ' data-lcs-correct="1"' : ''} ` +
      `style="width:${wide ? 600 : 196}px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px;white-space:nowrap">${esc(v)}</span>`).join('');
    const shownWrong = m.mode === 'error' && it.sQ != null
      ? `<p style="margin:0;font-family:'Baloo 2',cursive;font-weight:700;font-size:28px;color:#8A9694;text-decoration:line-through;text-decoration-color:${CORAL};text-decoration-thickness:3px">${esc(fill(tpl, { n: it.n, d: it.d, q: it.sQ, r: it.sR }, loc))}</p>` : '';
    return `<div data-lcs-item data-lcs-word="${i + 1}" data-lcs-n="${it.n}" data-lcs-d="${it.d}" data-ws-content ` +
      `style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
      pictures(theme, it.noun, it.n) + shownWrong +
      `<p style="margin:0;font-family:'Baloo 2',cursive;font-weight:700;font-size:36px;line-height:1.2;color:${INK}">${esc(question(tpl, it.n, it.d))}</p>` +
      `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${chips}</div></div>`;
  });
  return `<div data-ws-content data-lcs-screen="dwr" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:4px">${cards.join('')}</div>`;
}

/** the answer key: q and r written in each item's empty boxes (HTML span or casita SVG rect), the right pill ringed */
function key(built) {
  const h = built.bodyHtml;
  const parts = h.split(/(?=<div class="ws-card-stage" data-ws-content data-lcs-item=")/);
  const out = parts.map((seg) => {
    const m = /^<div class="ws-card-stage" data-ws-content data-lcs-item="\d+" data-lcs-n="(\d+)" data-lcs-d="(\d+)" data-lcs-q="(\d+)" data-lcs-r="(\d+)"/.exec(seg);
    if (!m) return seg;
    const val = { q: m[3], r: m[4] };
    let s = seg.replace(/<span class="ws-blankbox" data-lcs-answer="" data-lcs-role="(q|r)"([^>]*)><\/span>/g,
      (x, role, rest) => `<span class="ws-blankbox" data-lcs-answer="${val[role]}" data-lcs-role="${role}" data-lcs-gapbox${rest}></span>`);
    // casita SVG boxes: a centred coral number on the rect
    s = s.replace(/<rect\b([^>]*?)data-lcs-answer=""([^>]*?)data-lcs-role="(q|r)"([^>]*?)\/>/g, (x, a, b, role, c) => {
      const attr = (k) => { const mm = new RegExp(`\\b${k}="([\\d.]+)"`).exec(a + b + c); return mm ? +mm[1] : 0; };
      const cx = attr('x') + attr('width') / 2, cy = attr('y') + attr('height') / 2;
      return `<rect${a}data-lcs-answer="${val[role]}"${b}data-lcs-role="${role}"${c}/>` +
        `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="Baloo 2" font-weight="700" font-size="24" fill="${CORAL}" data-lcs-keytext="1">${val[role]}</text>`;
    });
    // exact or not: ring the right pill
    const exact = +val.r === 0 ? 'exact' : 'rest';
    s = s.replace(`data-lcs-pill="${exact}"`, `data-lcs-pill="${exact}" data-lcs-keyring="1"`);
    return s;
  });
  const css = `[data-lcs-gapbox]{position:relative}[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 22px 'Baloo 2',cursive;color:${CORAL}}` +
    `[data-lcs-keyring]{outline:4px solid ${CORAL};outline-offset:3px}`;
  return out.join('') + `<style data-lcs-key>${css}</style>`;
}

function screenOrKey(built, ctx, loc) {
  const out = { bodyHtml: built.bodyHtml, meta: built.meta };
  out.bodyHtml = ctx.interactive ? screen(built, loc) : key(built);
  return out;
}

/** the robot's oracle: the option that writes floor(n/d) and n mod d in the locale's notation */
function oracle(items, loc) {
  const tpl = bankOf(loc).notation.template;
  return items.map((it) => {
    const n = +it.meta['data-lcs-n'], d = +it.meta['data-lcs-d'];
    if (!(n > 0 && d > 1)) throw new Error('division-remainder oracle: card without n / d');
    const q = Math.floor(n / d), r = n - q * d;
    const want = answerLabel(tpl, n, d, q, r);
    const L = it.options.map((o) => (typeof o === 'object' ? o.label : o));
    const hits = L.map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`division-remainder oracle: ${hits.length} options read "${want}" (${L.join(' | ')})`);
    return hits[0];
  });
}

function interactiveFor() {
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-n', 'data-lcs-d'], instructionKey: 'choose', screenHeight: 6000, oracle: (items, l) => oracle(items, (l || 'en').slice(0, 2)) };
}

module.exports = { screenOrKey, interactiveFor, oracle, answerLabel, optionsFor };
