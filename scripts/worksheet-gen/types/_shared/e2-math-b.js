/**
 * e2-math-b.js — Batch DE-B (Daily Teaching System Stage E-2, 2026-11-26): the German mathematics pages of the Klasse 3
 * year design (scripts/units/year/design.de.math.json) that no existing type teaches:
 *   G3-633 e2b-hz       Rechnen mit Hunderter- und Zehnerzahlen                       (mental-math)
 *   G3-634 e2b-hsub     Halbschriftlich subtrahieren: abziehen oder ergänzen?          (number-lines)
 *   G3-635 e2b-mz       Einmaleins mit Zehnerzahlen: 3 · 40 und 240 : 6                (multiplication-tables)
 *   G3-636 e2b-hmul     Halbschriftlich multiplizieren: 4 · 37                         (arrays-multiplication)
 *   G3-637 e2b-hdiv     Halbschriftlich dividieren: 84 : 4                             (mental-math)
 *   G3-638 e2b-mm       Millimeter: genau messen und zeichnen          REAL SIZE       (measurement)
 *   G3-639 e2b-km       Meter und Kilometer: Wie weit ist ein Kilometer?               (measurement)
 *   G3-640 e2b-komma    Mit Komma schreiben: Euro und Cent, Meter und Zentimeter       (money)
 *   G3-641 e2b-ueber    Überschlagen beim Einkaufen: Reicht das Geld?                  (money)
 *   G3-642 e2b-tab      Preistabellen: je mehr, desto teurer          (ratio tables)   (number-charts)
 *   G3-643 e2b-tab      Sachaufgaben mit Tabellen lösen               (ratio tables)   (word-problems)
 *   G3-644 e2b-zirkel   Mit dem Zirkel zeichnen: Kreise und Kreismuster  REAL SIZE     (geometry)
 *   G3-645 e2b-dia      Diagramme genau lesen: Was stimmt, was nicht?                  (graphing-data)
 *   G3-646 e2b-kombi    Alle Möglichkeiten finden: Tabelle und Baumdiagramm            (logic-puzzles)
 * Each type is printed in German only (`onlyLocales: ['de']`; any other locale refuses at build). Themeless; PDF only.
 *
 * ONE ratio-table mode (e2b-tab) serves G3-642 and G3-643: the same two-row table (Anzahl / Preis in €), the same arrows
 * with their operator boxes; the price tables continue a printed table, the word problems fill an empty one.
 *
 * Built on the Batch K CSS and page check (dk-kinder.js) and the Batch 1 layout kit and one-answer check (dk-g1.js); the
 * play notes and the Rechenstrich are E-1's (e1-math-art.js). None of those files is edited; this file has its own modes,
 * its own CSS and its own page check (e2bVerifyInPage). Drawings: e2-math-b-art.js. Bank: data/e2b/e2-math-b.js. Gate:
 * qa/verify-e2-de-b.js.
 *
 * Stamps (never printed): data-e2b-answer on a box with ONE value; data-dk-answer on the choices of a one-answer group;
 * data-e2b-match / data-e2b-target on the two ends of a line to draw; data-e2b-open + data-e2b-key on an open item (the
 * child chooses its way: the key says every valid way, none is marked wrong); data-e2b-alt on a box pair whose two
 * numbers may come in either order (3 · 2 or 2 · 3); boxes with neither are the child's own (a drawing, a measurement
 * the child takes, a sentence).
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const DK = require('./dk-kinder.js');
const G = require('./dk-g1.js');
const E1 = require('./e1-math-art.js');
const A = require('./e2-math-b-art.js');
const B = require('../../data/e2b/e2-math-b.js');

const T = TOK.color;
const W = 675;
const { box, col, row, lineBox, frameLine, esc, f1 } = G.kit;
const MODES = {};
const LOC = {};   // mode -> the one locale it prints in
const MN = '−';   // the minus sign printed on the page
const MAL = '·';  // the German multiplication dot

/* ================================================================ the layout kit */
const E2BCSS = `
.e2b-t{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:16px;line-height:21px;color:${T.ink};white-space:nowrap}
.e2b-tw{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;line-height:19px;color:${T.ink};white-space:normal}
.e2b-head{display:block;box-sizing:border-box;font-family:'Baloo 2',cursive;font-weight:700;font-size:17px;line-height:21px;color:${T.teal};white-space:nowrap}
.e2b-big{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:21px;line-height:25px;color:${T.ink};white-space:nowrap}
.e2b-op{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:20px;line-height:25px;color:${T.coral};white-space:nowrap}
.e2b-badge{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;flex-shrink:0;width:25px;height:25px;border-radius:50%;background:${T.teal};font-family:'Baloo 2',cursive;font-weight:700;font-size:15px;line-height:19px;color:#FFFFFF}
.e2b-pick{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.2px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:1px 9px;font-family:'Nunito',sans-serif;font-weight:800;font-size:14px;line-height:18px;color:${T.ink};white-space:nowrap}
.e2b-tick{display:block;box-sizing:border-box;width:20px;height:20px;border:2.2px solid ${T.ink};border-radius:4px;background:#FFFFFF;flex-shrink:0}
.e2b-cell{box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-right:1.5px solid ${T.grid};padding:2px 3px}
.e2b-th{box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-right:1.5px solid ${T.grid};padding:1px 3px;font-family:'Baloo 2',cursive;font-weight:700;font-size:15px;line-height:18px;color:${T.teal};white-space:nowrap}
.e2b-paper{box-sizing:border-box;background:#FFFFFF;border:1.8px solid ${T.grid};border-radius:6px;padding:3px 9px;display:flex;flex-direction:column;align-items:stretch;gap:1px}
.ws-blankbox[data-e2b-sign]{border-radius:50% !important}
`;
const t = (s, attrs = '', style = '', cls = 'e2b-t') => `<span class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(s)}</span>`;
const tw = (s, w, attrs = '', style = '') => `<span class="e2b-tw" data-dk-box${attrs ? ' ' + attrs : ''} style="width:${w}px${style ? ';' + style : ''}">${esc(s)}</span>`;
const head = (s, attrs = '', style = '') => t(s, attrs, style, 'e2b-head');
const big = (s, attrs = '', style = '') => t(s, attrs, style, 'e2b-big');
const op = (s, style = '') => t(s, '', style, 'e2b-op');
const badge = (s, attrs = '') => `<span class="e2b-badge" data-dk-box${attrs ? ' ' + attrs : ''}>${esc(s)}</span>`;
/** a box to write ONE number in; the answer stamped (never printed) */
const ansBox = (w, h, answer, attrs = '') => box('ws-blankbox', w, h, '', `data-dk-numbox data-e2b-answer="${esc(answer)}"${attrs ? ' ' + attrs : ''}`, 'display:block');
/** a box for the child's own number or word (an open way, a part it chooses): no stamp */
const freeBox = (w, h, attrs = '') => box('ws-blankbox', w, h, '', `data-dk-numbox data-e2b-free="1"${attrs ? ' ' + attrs : ''}`, 'display:block');
/** a round box for a sign (+ or −) the child writes */
const signBox = (h, answer = null, attrs = '') => box('ws-blankbox', h, h, '', `data-dk-numbox data-e2b-sign="1"${answer != null ? ` data-e2b-answer="${esc(answer)}"` : ' data-e2b-free="1"'}${attrs ? ' ' + attrs : ''}`, 'display:block');
const tick = (attrs = '') => `<span class="e2b-tick" data-dk-box${attrs ? ' ' + attrs : ''}></span>`;
/** a one-answer circle group (dk-g1 g1VerifyInPage: exactly one right) */
const pick = (s, right, attrs = '') => `<span class="e2b-pick" data-dk-box data-e2b-pick="${esc(s)}" data-dk-answer="${right ? 'right' : 'no'}"${attrs ? ' ' + attrs : ''}>${esc(s)}</span>`;
const oneOf = (item, opts, right, gap = 6, attrs = '', style = '') => `<div class="dk-row" data-dk-item="${esc(item)}" data-g1-one="1"${attrs ? ' ' + attrs : ''} style="gap:${gap}px;justify-content:flex-start;${style}">` + opts.map((o) => pick(o, o === right)).join('') + '</div>';
/** an OPEN choice: tick boxes with their words; no box is stamped right (the key says why every choice is allowed) */
const openTicks = (item, opts, key, gap = 12, style = '') => `<div class="dk-row" data-e2b-open="${esc(item)}" data-e2b-key="${esc(key)}" style="gap:${gap}px;justify-content:flex-start;${style}">` + opts.map((o) => `<div class="dk-row" style="gap:5px">${tick('data-e2b-opt="' + esc(o) + '"')}${t(o, '', 'font-size:15px')}</div>`).join('') + '</div>';
const card = (inner, w, h, attrs = '', style = '') => box('dk-tile', w, h, inner, attrs, style);
const white = (inner, w, h, attrs = '', style = '') => box('dk-tile dk-tile--white', w, h, inner, attrs, style);
const art = (s, attrs = '') => `<div data-dk-box${attrs ? ' ' + attrs : ''} style="line-height:0;flex-shrink:0">${s}</div>`;
const rint = (rng, a, b) => a + Math.floor(rng.next() * (b - a + 1));
const shuffle = (rng, a) => rng.shuffle(a.slice());
/**
 * a number sentence: parts are numbers / words (printed), operators ('+', '−', '·', ':', '='), { box: v } (a box with
 * ONE value), { free: true } (the child's own), { sign: v|true } (a round sign box). The row carries data-e2b-eq.
 */
function eq(parts, o = {}) {
  const bw = o.bw || 52, bh = o.bh || 32, fs = o.fs ? `font-size:${o.fs}px;line-height:${o.fs + 4}px` : '';
  const inner = parts.map((p) => {
    if (p && typeof p === 'object' && 'box' in p) return ansBox(p.w || bw, bh, p.box, p.attrs || '');
    if (p && typeof p === 'object' && p.free) return freeBox(p.w || bw, bh, p.attrs || '');
    if (p && typeof p === 'object' && 'sign' in p) return signBox(bh, p.sign === true ? null : p.sign, p.attrs || '');
    if (['+', MN, MAL, ':', '='].includes(p)) return op(p, o.fs ? `font-size:${o.fs}px;line-height:${o.fs + 4}px` : '');
    return big(String(p), '', fs);
  }).join('');
  return `<div class="dk-row" data-e2b-eq="${esc(o.id || '1')}"${o.attrs ? ' ' + o.attrs : ''} style="gap:${o.gap || 5}px;justify-content:flex-start${o.style ? ';' + o.style : ''}">${inner}</div>`;
}
/** a short arrow drawn (no arrow glyph exists in the page fonts) */
const arrowArt = (w = 26, h = 14) => art(A.artSvg(`<line x1="2" y1="${h / 2}" x2="${w - 7}" y2="${h / 2}" stroke="${T.coral}" stroke-width="2.4" stroke-linecap="round"/><path d="M${w - 10} 2 L${w - 2} ${h / 2} L${w - 10} ${h - 2}" fill="none" stroke="${T.coral}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`, w, h, 'data-e2b-arrow="1"'));
/** "3,50" from 350 (cents or centimetres): the German comma, two digits after it */
const comma = (n) => `${Math.floor(n / 100)},${String(n % 100).padStart(2, '0')}`;
const src = (p) => require('../../image-cache/resolve.js').fileUri(p[0], p[1]);   // looked up at build time only

/* ================================================================ G3-633 — Rechnen mit Hunderter- und Zehnerzahlen */
LOC['e2b-hz'] = 'de';
/** blocks: A Hunderterzahlen, B Zehnerzahlen im Hunderter, C Zehnerzahlen über den Hunderter; fill: to the next hundred
 *  (next) and to 1000 (k); L3: the big tasks alone (the child thinks of the small task) and two-step completions */
const HZ_LV = {
  1: { blocks: [['A', 6], ['B', 6]], next: 6, k: 0 },
  2: { blocks: [['A', 4], ['B', 4], ['C', 6]], next: 2, k: 2 },
  3: { mixed: { A: 4, B: 6, C: 8 }, twoStep: 4 },
};
/** a task of block kind and operation: the small task and the big one (small x 100 for A, x 10 for B and C). The
 *  instruction's own example (3 + 4 = 7, also 300 + 400 = 700) never comes as a task. */
function hzTask(kind, o, rng) {
  for (;;) {
    if (kind === 'A') {
      // the hundreds stay under 1000: the completions to 1000 below own every sentence with 1000 in it
      if (o === '+') { const x = rint(rng, 1, 8), y = rint(rng, 1, 9); if (x + y > 9 || x === y || (x * y === 12 && x + y === 7)) continue; return { kind, o, s: [x, y, x + y], b: [100 * x, 100 * y, 100 * (x + y)] }; }
      const x = rint(rng, 3, 9), y = rint(rng, 1, x - 1); if (2 * y === x) continue; return { kind, o, s: [x, y, x - y], b: [100 * x, 100 * y, 100 * (x - y)] };
    }
    const s = rint(rng, 11, 99), k = rint(rng, 1, 9), e = s % 10;
    if (e === 0) continue;
    if (kind === 'B') {
      if (o === '+' ? e + k > 9 : e - k < 1) continue;
      const z = o === '+' ? s + k : s - k;
      return { kind, o, s: [s, k, z], b: [10 * s, 10 * k, 10 * z] };
    }
    // C: over the hundred (the small task crosses a ten), never landing on a hundred
    if (o === '+') { if (e + k < 11 || s + k > 99) continue; return { kind, o, s: [s, k, s + k], b: [10 * s, 10 * k, 10 * (s + k)] }; }
    if (e >= k || s - k < 11 || (s - k) % 10 === 0) continue;
    return { kind, o, s: [s, k, s - k], b: [10 * s, 10 * k, 10 * (s - k)] };
  }
}
MODES['e2b-hz'] = (d, rng) => {
  const lv = HZ_LV[d.level], X = B.TEXT.hz;
  // no two number sentences of a page share their three numbers: "500 + 100 = _" beside "600 − 100 = _", or
  // "380 + _ = 1000" beside "620 + _ = 1000", gave each other's answers away (measured on 140-183 of 200 pages before)
  const fam = new Set(), famKey = (a, b, c) => [a, b, c].sort((x, y) => x - y).join('|');
  // to 1000 from whole hundreds (taken first, so the tasks above keep clear of them): never both of a pair that makes
  // 1000 (200 and 800 give each other's answer)
  const hs = shuffle(rng, [[1, 9], [2, 8], [4, 6], [7]]).slice(0, lv.k || 0).map((pr) => rng.pick(pr));
  hs.forEach((h) => fam.add(famKey(100 * h, 1000 - 100 * h, 1000)));
  const draw = (kind, n) => {
    const out = [];
    const ops = shuffle(rng, Array.from({ length: n }, (_, i) => (i % 2 ? MN : '+')));
    for (const o of ops) { let q; for (let k = 0; ; k++) { q = hzTask(kind, o, rng); const key = famKey(...q.b); if (!fam.has(key)) { fam.add(key); break; } if (k > 20000) throw new Error('e2b-hz: no new task'); } out.push(q); }
    return out;
  };
  const eqOf = (v, o, w, fs, attrs) => eq([v[0], o, v[1], '=', { box: v[2], w }], { bh: fs > 19 ? 30 : 28, fs, attrs, gap: 4 });
  // a pair: the small task, a drawn arrow, the big task (fixed widths, so the arrows of a block stand in one column)
  const pairHtml = (q, k) => `<div class="dk-row" data-e2b-pair="${k}" style="gap:6px;justify-content:flex-start;width:312px">` +
    `<div style="width:118px;display:flex;justify-content:flex-start">${eqOf(q.s, q.o, 38, 18, `data-e2b-small="${k}"`)}</div>${arrowArt(22, 12)}` +
    `<div style="display:flex;justify-content:flex-start">${eqOf(q.b, q.o, 54, 20, `data-e2b-bigtask="${k}"`)}</div></div>`;
  const rowsBox = (rows, gapMin) => `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-evenly;gap:${gapMin}px;width:100%">${rows.join('')}</div>`;
  let html = '', items = [];
  let n = 0;
  const legend = row(t(X.small, '', 'font-size:13px;color:' + T.inkSoft) + arrowArt(18, 10) + t(X.big, '', 'font-size:13px;color:' + T.inkSoft), 5, 'justify-content:flex-end');
  if (!lv.mixed) {
    lv.blocks.forEach(([kind, cnt], bi) => {
      const qs = draw(kind, cnt);
      const pairs = qs.map((q) => pairHtml(q, ++n));
      items.push(...qs.map((q) => `${q.b[0]}${q.o}${q.b[1]}`));
      const rows = [];
      for (let i = 0; i < pairs.length; i += 2) rows.push(row(pairs[i] + (pairs[i + 1] || ''), 12, 'justify-content:space-between;width:100%'));
      html += card(col(row(head(X.blocks[kind]) + (bi === 0 ? legend : ''), 16, 'justify-content:space-between;width:100%') + rowsBox(rows, 6), 4, 'align-items:stretch;width:100%;height:100%'),
        W, 'auto', `data-e2b-block="${kind}"`, `padding:5px 12px;flex:${cnt} 1 auto;align-items:stretch`);
    });
  } else {
    const qs = [];
    for (const [kind, cnt] of Object.entries(lv.mixed)) qs.push(...draw(kind, cnt));
    const all = shuffle(rng, qs);
    items.push(...all.map((q) => `${q.b[0]}${q.o}${q.b[1]}`));
    const cells = all.map((q) => `<div style="width:200px;display:flex;justify-content:flex-start">${eqOf(q.b, q.o, 58, 20, `data-e2b-bigtask="${++n}" data-e2b-kind="${q.kind}"`)}</div>`);
    const rows = [];
    for (let i = 0; i < cells.length; i += 3) rows.push(row(cells.slice(i, i + 3).join(''), 10, 'justify-content:space-between;width:100%'));
    html += card(col(head(X.mixed) + rowsBox(rows, 6), 6, 'align-items:stretch;width:100%;height:100%'), W, 'auto', 'data-e2b-block="mixed"', 'padding:6px 14px;flex:1 1 auto;align-items:stretch');
  }
  // completing: to the next hundred, to 1000, or both in two steps
  const fills = [];
  const nextOf = (x) => Math.ceil(x / 100) * 100;
  const seenX = new Set();
  const tensNumber = (to1000) => { for (let k = 0; k < 20000; k++) { const x = 10 * rint(rng, 11, 89), H = nextOf(x); const keys = [famKey(x, H - x, H)].concat(to1000 ? [famKey(H, 1000 - H, 1000), famKey(x, 1000 - x, 1000)] : []); if (x % 100 && !seenX.has(x) && !seenX.has('H' + H) && keys.every((q) => !fam.has(q))) { seenX.add(x); seenX.add('H' + H); keys.forEach((q) => fam.add(q)); return x; } } throw new Error('e2b-hz: no number to complete'); };
  if (!lv.mixed) {
    for (let i = 0; i < lv.next; i++) { const x = tensNumber(); fills.push(eq([x, '+', { box: nextOf(x) - x, w: 54 }, '=', nextOf(x)], { bh: 30, fs: 20, gap: 4, attrs: 'data-e2b-fill="next"' })); items.push(`${x}+?=${nextOf(x)}`); }
    for (const h of hs) { fills.push(eq([100 * h, '+', { box: 1000 - 100 * h, w: 54 }, '=', 1000], { bh: 30, fs: 20, gap: 4, attrs: 'data-e2b-fill="k"' })); items.push(`${100 * h}+?=1000`); }
    const fr = [];
    for (let i = 0; i < fills.length; i += 3) fr.push(row(fills.slice(i, i + 3).map((f) => `<div style="width:205px;display:flex">${f}</div>`).join(''), 10, 'justify-content:space-between;width:100%'));
    const lead = lv.k ? X.blocks.Dk : X.blocks.D;
    html += white(col(head(lead) + rowsBox(fr, 8), 5, 'align-items:stretch;width:100%;height:100%'), W, 'auto', 'data-e2b-block="D"', 'padding:6px 14px;flex:2 1 auto;align-items:stretch');
  } else {
    const two = [];
    for (let i = 0; i < lv.twoStep; i++) {
      const x = tensNumber(true), H = nextOf(x);
      two.push(col(eq([x, '+', { box: H - x, w: 50 }, '=', H], { bh: 28, fs: 18, gap: 4, attrs: 'data-e2b-two="1"' }) + eq([H, '+', { box: 1000 - H, w: 50 }, '=', 1000], { bh: 28, fs: 18, gap: 4, attrs: 'data-e2b-two="2"' }) +
        row(t(X.also, '', 'font-size:15px;color:' + T.inkSoft) + eq([x, '+', { box: 1000 - x, w: 50 }, '=', 1000], { bh: 28, fs: 18, gap: 4, attrs: 'data-e2b-two="3"' }), 6, 'justify-content:flex-start'), 4, 'align-items:flex-start;width:300px'));
      items.push(`${x}+?=1000`);
    }
    const tr = []; for (let i = 0; i < two.length; i += 2) tr.push(row(two[i] + (two[i + 1] || ''), 14, 'justify-content:space-between;width:100%;align-items:flex-start'));
    html += white(col(head(X.blocks.D3) + rowsBox(tr, 10), 6, 'align-items:stretch;width:100%;height:100%'), W, 'auto', 'data-e2b-block="D3"', 'padding:6px 12px;flex:1 1 auto;align-items:stretch');
  }
  return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:9px">${html}</div>`, meta: { items } };
};

/* ================================================================ G3-634 — Halbschriftlich subtrahieren: abziehen oder ergänzen? */
LOC['e2b-hsub'] = 'de';
/**
 * Two task cards (each with an empty Rechenstrich and three step rows), one card on BOTH ways with the question which way
 * was geschickter here, and (levels 2, 3) four tasks to decide only. Both ways are right everywhere: the choice and the
 * comparison are OPEN (the key says so); only each result has one value. far: the numbers lie far apart; near: they lie
 * close together across a hundred (503 − 497).
 *   L1  the two task cards name the way (one "Ziehe schrittweise ab", one "Ergänze") with its first step printed; the
 *       both-ways task is near; abziehen never crosses a ten or a hundred
 *   L2  the child chooses on both cards; one crossing; four tasks to decide
 *   L3  two crossings; the both-ways task is far; "Warum?" with a line; four tasks to decide
 */
const HSUB_LV = {
  1: { given: true, cross: 0, nearMax: 12, both: 'near', quick: 2, why: false },
  2: { given: false, cross: 1, nearMax: 25, both: 'near', quick: 4, why: false },
  3: { given: false, cross: 2, nearMax: 30, both: 'far', quick: 2, why: true },   // two decisions: the four Ergänzen rows and the Warum line need the room
};
const dig3 = (n) => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
/** the steps of a − b, abziehen schrittweise: from a, the hundreds, then the tens, then the ones of b */
function subSteps(a, b) { const [h, z, e] = dig3(b); const s1 = a - 100 * h, s2 = s1 - 10 * z; return [[a, MN, 100 * h, s1], [s1, MN, 10 * z, s2], [s2, MN, e, s2 - e]].filter((s) => s[2] > 0); }
/** the steps of a − b, ergänzen: from b up to the next ten, the next hundred, a's hundred, then on to a (steps that are 0
 *  dropped; up to four, so every Ergänzen place has four rows) */
function addSteps(a, b) {
  const out = []; let x = b;
  const t10 = Math.min(a, Math.ceil(x / 10) * 10); if (t10 > x) { out.push([x, '+', t10 - x, t10]); x = t10; }
  const t100 = Math.min(a, Math.ceil(x / 100) * 100); if (t100 > x) { out.push([x, '+', t100 - x, t100]); x = t100; }
  const tH = Math.floor(a / 100) * 100; if (tH > x) { out.push([x, '+', tH - x, tH]); x = tH; }   // 600 + 300 = 900 (review round 1)
  if (a > x) out.push([x, '+', a - x, a]);
  return out;
}
/** how many places borrow in the schrittweise subtraction (the tens step crossing a hundred, the ones step a ten) */
function subCross(a, b) { const [, az, ae] = dig3(a), [, bz, be] = dig3(b); return (ae < be ? 1 : 0) + (az - (ae < be ? 1 : 0) < bz ? 1 : 0); }
function hsubTask(kind, lv, rng, used) {
  for (let k = 0; k < 50000; k++) {
    let a, b;
    if (kind === 'far') {
      b = 100 * rint(rng, 1, 6) + 10 * rint(rng, 1, 9) + rint(rng, 1, 9); a = rint(rng, b + 150, 989);
      if (dig3(a).slice(1).includes(0) && rng.next() < 0.7) continue;
      if (subCross(a, b) !== lv.cross) continue;
      // never a whole hundred as the result: 862 − 462 printed "862 − 400 = 462" as its first step, the answer 400 in it
      if ((a - b) % 100 === 0) continue;
    } else {
      const h = rint(rng, 2, 9); a = 100 * h + rint(rng, 0, Math.min(15, lv.nearMax - 2)); b = 100 * (h - 1) + rint(rng, 100 - lv.nearMax + (a % 100), 99);
      if (a - b < 3 || a - b > lv.nearMax || b % 10 === 0) continue;
    }
    if (used.has(a + '-' + b) || used.has('r' + (a - b))) continue;
    used.add(a + '-' + b); used.add('r' + (a - b));
    return { a, b, r: a - b, kind };
  }
  throw new Error('e2b-hsub: no ' + kind + ' task');
}
const hsubKey = (q) => `Beide Wege sind richtig. Abziehen: ${subSteps(q.a, q.b).map((s) => `${s[0]} ${MN} ${s[2]} = ${s[3]}`).join(', ')}. Ergänzen: ${addSteps(q.a, q.b).map((s) => `${s[0]} + ${s[2]} = ${s[3]}`).join(', ')} (zusammen ${q.r}). Jeder Weg mit richtigen Schritten ist richtig.`;
MODES['e2b-hsub'] = (d, rng) => {
  const lv = HSUB_LV[d.level], X = B.TEXT.hsub;
  const used = new Set();
  // the two task cards: one far, one near (their order drawn). L1 names the way and models the lesson's choice: the near
  // task is ergänzt (400 − 389 taken away step by step modelled the clumsy way), the far task is abgezogen
  const kinds = shuffle(rng, ['far', 'near']);
  const tasks = kinds.map((k) => hsubTask(k, lv, rng, used));
  const givenWays = lv.given ? kinds.map((k) => (k === 'near' ? 'add' : 'sub')) : null;
  const both = hsubTask(lv.both, lv, rng, used);
  const quick = lv.quick ? shuffle(rng, Array.from({ length: lv.quick }, (_, i) => (i % 2 ? 'near' : 'far'))).map((k) => hsubTask(k, lv, rng, used)) : [];
  const cw = Math.floor((W - 12) / 2);
  // the step rows: three for abziehen (hundreds, tens, ones), FOUR wherever the child may ergänzen (925 − 549: + 1, + 50,
  // + 300, + 25; review round 1); a little lower than before so the page keeps its room
  const stepRows = (w, n, first = null, sign = null, attrs = '') => Array.from({ length: n }, (_, i) => {
    if (i === 0 && first) return eq([first[0], first[1], first[2], '=', first[3]], { bh: 23, fs: 17, gap: 4, attrs: 'data-e2b-model="1"' });
    return eq([{ free: true, w }, sign ? sign : { sign: true }, { free: true, w }, '=', { free: true, w }], { bh: 23, gap: 4, attrs: `data-e2b-steprow="${i + 1}"${attrs}` });
  }).join('');
  const stepsBox = (way, inner) => `<div data-e2b-steps="${way}" style="display:flex;flex-direction:column;gap:2px;align-items:flex-start">${inner}</div>`;
  const strich = (w) => art(E1.rechenstrich(w, 78, 30), 'data-e2b-strich="1"');
  const taskCard = (q, k) => {
    const way = givenWays && givenWays[k];
    const st = way === 'sub' ? subSteps(q.a, q.b)[0] : way === 'add' ? addSteps(q.a, q.b)[0] : null;
    const top = row(badge(String(k + 1)) + eq([q.a, MN, q.b, '=', { box: q.r, w: 64 }], { fs: 21, attrs: `data-e2b-task="${k + 1}" data-e2b-kind="${q.kind}"` }), 8, 'justify-content:flex-start');
    const choice = way ? t(X.given[way], `data-e2b-way="${way}"`, 'font-size:15px;color:' + T.teal) : openTicks('choose-' + (k + 1), [X.sub, X.add], hsubKey(q));
    return card(col(top + choice + strich(cw - 28) + stepsBox(way || 'open', stepRows(46, way === 'sub' ? 3 : 4, st, way ? (way === 'sub' ? MN : '+') : null)), 5, 'align-items:flex-start;width:100%;height:100%;justify-content:space-between'),
      cw, 'auto', `data-e2b-card="${k + 1}" data-e2b-a="${q.a}" data-e2b-b="${q.b}" data-e2b-key="${esc(hsubKey(q))}"`, 'flex:1 1 0;min-height:0;padding:5px 10px;align-items:stretch');
  };
  const half = Math.floor((W - 40) / 2);
  const bothHalf = (lab, sign) => col(t(lab, '', 'font-size:15px;color:' + T.teal) + strich(half - 10) + stepsBox(sign === MN ? 'sub' : 'add', stepRows(44, sign === MN ? 3 : 4, null, sign)), 4, 'align-items:flex-start');
  const bothCard = card(col(
    row(badge('3') + eq([both.a, MN, both.b, '=', { box: both.r, w: 64 }], { fs: 21, attrs: `data-e2b-task="3" data-e2b-kind="${both.kind}"` }) + t(X.both, '', 'font-size:15px;color:' + T.teal), 10, 'justify-content:flex-start') +
    row(bothHalf(X.bothSub, MN) + bothHalf(X.bothAdd, '+'), 14, 'justify-content:space-between;width:100%;align-items:flex-start') +
    row(t(X.which, '', 'font-size:15px') + openTicks('which', [X.whichSub, X.whichAdd], `Beide Antworten sind richtig: Das Kind sagt, welcher Weg ihm hier leichter fiel. ${hsubKey(both)}`), 12, 'justify-content:flex-start') +
    (lv.why ? frameLine([X.why, W - 110], 34) : ''),
  5, 'align-items:stretch;width:100%'), W, 'auto', `data-e2b-both="1" data-e2b-a="${both.a}" data-e2b-b="${both.b}"`, 'padding:5px 12px;flex-shrink:0');
  let quickHtml = '';
  if (quick.length) {
    // two decisions to a row: the task at 17 px and narrow gaps, so the widest pair (868 − 648) fits the card (copy 335)
    const cells = quick.map((q, i) => row(eq([q.a, MN, q.b], { fs: 17, gap: 4, attrs: `data-e2b-quick="${i + 1}" data-e2b-kind="${q.kind}"` }) + openTicks('quick-' + (i + 1), [X.sub, X.add], `Beide Wege sind richtig. ${q.kind === 'near' ? 'Die Zahlen liegen nah beieinander: Ergänzen geht hier mit wenigen Schritten.' : 'Die Zahlen liegen weit auseinander: Abziehen geht hier gut.'}`, 6), 7, 'justify-content:flex-start'));
    const rws = []; for (let i = 0; i < cells.length; i += 2) rws.push(row(cells[i] + (cells[i + 1] || ''), 10, 'justify-content:space-between;width:100%'));
    quickHtml = white(col(head(X.quickHead) + col(rws.join(''), 5, 'width:100%;align-items:stretch'), 3, 'align-items:stretch;width:100%'), W, 'auto', 'data-e2b-quickblock="1"', 'padding:4px 12px;flex-shrink:0');
  }
  const html = `<div class="dk-row" style="gap:12px;flex:1 1 auto;min-height:0;align-items:stretch">${taskCard(tasks[0], 0)}${taskCard(tasks[1], 1)}</div>` + bothCard + quickHtml;
  return { html, meta: { tasks: tasks.map((q) => `${q.a}-${q.b}=${q.r}`), both: `${both.a}-${both.b}=${both.r}`, quick: quick.map((q) => `${q.a}-${q.b}`), items: tasks.concat([both], quick).map((q) => `${q.a}-${q.b}`) } };
};

/* ================================================================ G3-635 — Einmaleins mit Zehnerzahlen */
LOC['e2b-mz'] = 'de';
/** pairs (the Einmaleins task, then the task with the Zehnerzahl); the first four with a picture of Zehnerstangen.
 *  L1 times only (one factor 2, 3, 4, 5 or 10's partner); L2 times and divided; L3 the missing number moves */
const MZ_LV = {
  1: { pics: 4, plain: 16, div: 0, missing: false },
  2: { pics: 4, plain: 16, div: 0.5, missing: false },
  3: { pics: 4, plain: 16, div: 0.5, missing: true },
};
MODES['e2b-mz'] = (d, rng) => {
  const lv = MZ_LV[d.level], X = B.TEXT.mz;
  const used = new Set(), usedProd = new Set();
  const draw = (pic, isDiv) => {
    for (let k = 0; k < 20000; k++) {
      const a = pic ? rint(rng, 2, isDiv ? 6 : 4) : rint(rng, 2, 9), b = pic ? rint(rng, 2, isDiv ? 4 : 5) : rint(rng, 2, 9);
      if (d.level === 1 && !pic && ![2, 3, 4, 5].includes(a) && ![2, 3, 4, 5].includes(b)) continue;
      const key = (isDiv ? 'd' : 'm') + a + 'x' + b;
      if (used.has(key) || used.has((isDiv ? 'd' : 'm') + b + 'x' + a) && rng.next() < 0.8) continue;
      // the instruction's own examples (3 · 4 = 12, also 3 · 40 = 120; 24 : 6 = 4, also 240 : 6 = 40) never come as a task
      if (isDiv ? a === 6 && b === 4 : a * b === 12 && Math.abs(a - b) === 1) continue;
      // where a product is ever printed (a division's number, L3's missing factor), no two pairs share it: "80 : 4" under
      // "4 · 20 = _" printed the answer of the other task (measured on 362 of 400 pages before)
      if ((lv.div || lv.missing) && (usedProd.has(a * b) || usedProd.has(10 * a * b))) continue;
      used.add(key); usedProd.add(a * b); usedProd.add(10 * a * b);
      // times: a · b and a · 10b; divided: (a·b) : a and (10·a·b) : a
      return isDiv ? { div: true, a, b, small: [a * b, ':', a, b], big: [10 * a * b, ':', a, 10 * b] } : { div: false, a, b, small: [a, MAL, b, a * b], big: [a, MAL, 10 * b, 10 * a * b] };
    }
    throw new Error('e2b-mz: no pair');
  };
  // where the box sits (L3: the missing number moves: first, middle or last)
  const blankAt = () => (lv.missing ? rng.pick([0, 2, 3, 3]) : 3);
  const eqFor = (v, at, attrs, fs, bw) => eq(v.map((x, i) => (i === 3 ? (at === 3 ? { box: x, w: bw } : x) : i === at ? { box: x, w: bw } : x)).flatMap((x, i) => (i === 2 ? [x, '='] : [x])), { fs, bh: 30, attrs });
  const pairRow = (p, k, pic) => {
    const at = pic ? 3 : blankAt();
    return row(eqFor(p.small, at, `data-e2b-small="${k}"`, 19, 44) + arrowArt() + eqFor(p.big, at, `data-e2b-bigtask="${k}"`, 20, 60), 7, 'justify-content:flex-start');
  };
  const nDiv = Math.round((lv.pics + lv.plain) * lv.div);
  const divFlags = shuffle(rng, Array.from({ length: lv.pics + lv.plain }, (_, i) => i < nDiv));
  // the four picture pairs: two times and two divided at L2/L3
  const picFlags = lv.div ? shuffle(rng, [true, true, false, false]) : [false, false, false, false];
  const pics = picFlags.map((isDiv) => draw(true, isDiv));
  const plain = Array.from({ length: lv.plain }, (_, i) => draw(false, lv.div ? divFlags[i] : false));
  let n = 0;
  const cw = Math.floor((W - 12) / 2);
  const picCards = pics.map((p) => {
    const k = ++n;
    const g = p.div ? p.a : p.a, kk = p.div ? p.b : p.b;   // a groups of b rods: a · 10b, or 10ab shared in a groups
    return card(col(art(A.rodGroups(g, kk), `data-e2b-pic="${k}" data-e2b-groups="${g}" data-e2b-rods="${kk}"`) + pairRow(p, k, true), 6, 'align-items:center;width:100%'), cw, 'auto', `data-e2b-paircard="${k}" data-e2b-div="${p.div ? 1 : 0}"`, 'padding:5px 8px;flex:1 1 auto');
  });
  const picRows = [];
  for (let i = 0; i < picCards.length; i += 2) picRows.push(`<div class="dk-row" style="gap:12px;align-items:stretch">${picCards[i]}${picCards[i + 1]}</div>`);
  const plainRows = [];
  const pr = plain.map((p) => pairRow(p, ++n));
  for (let i = 0; i < pr.length; i += 2) plainRows.push(row(pr[i] + pr[i + 1], 16, 'justify-content:space-between;width:100%'));
  const html = col(picRows.join(''), 8, 'align-items:stretch;flex-shrink:0') + row(t(X.rod, '', 'font-size:14px;color:' + T.inkSoft) + art(A.rodGroups(1, 1, { s: 3 })), 8, 'justify-content:flex-start;margin-top:-4px') +
    white(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px;width:100%;height:100%">${plainRows.join('')}</div>`, W, 'auto', 'data-e2b-plain="1"', 'padding:6px 14px;flex:1 1 auto;align-items:stretch');
  const all = pics.concat(plain);
  return { html, meta: { pairs: all.map((p) => p.big.join(' ')), items: all.map((p) => `${p.big[0]}${p.div ? ':' : '*'}${p.big[2]}`) } };
};

/* ================================================================ G3-636 — Halbschriftlich multiplizieren: 4 · 37 */
LOC['e2b-hmul'] = 'de';
/**
 * The page models the ZERLEGUNG of the second factor in Zehner und Einer (4 · 37 = 4 · 30 + 4 · 7), shown three ways:
 * the Punktefeld split at the tens (the child writes the two parts over it), the Malkreuz (the one-digit factor printed at
 * the row's head, so the cross has one layout) and the Rechenschritte (the one-digit factor printed first, so 30 · 4 is
 * never a second fill), the tens first, then the ones, then the sum (the instruction names the order).
 *   L1  four tasks (2-4 · 12-39); the Malkreuz's heads printed; the step rows print the tens and the ones
 *   L2  four tasks (3-6 · 23-49); everything but the one-digit factor to write
 *   L3  five tasks (3-9 · 23-98, products to 1000), no Punktefeld; one task a row (six did not fit with the reflection)
 */
const HMUL_LV = {
  1: { tasks: 4, field: true, a: [2, 4], b: [12, 39], heads: true },
  2: { tasks: 4, field: true, a: [3, 6], b: [23, 49], heads: false },
  3: { tasks: 5, field: false, a: [3, 9], b: [23, 98], heads: false },
};
MODES['e2b-hmul'] = (d, rng) => {
  const lv = HMUL_LV[d.level], X = B.TEXT.hmul;
  const tasks = [], used = new Set();
  for (let k = 0; tasks.length < lv.tasks; k++) {
    if (k > 20000) throw new Error('e2b-hmul: no tasks');
    const a = rint(rng, lv.a[0], lv.a[1]), b = rint(rng, lv.b[0], lv.b[1]), e = b % 10;
    if (e < 2 || b === 37 || a * b > 1000 || used.has(b) || used.has('p' + a * b)) continue;
    used.add(b); used.add('p' + a * b);
    tasks.push({ a, b, z: b - e, e, p: a * b });
  }
  const bh = 28;
  const kreuz = (q) => {
    const c = (inner, wd, br, bb) => `<div class="e2b-cell" style="width:${wd}px;height:${bh + 8}px;border-right:${br ? '2.5px solid ' + T.ink : 'none'};border-bottom:${bb ? '2.5px solid ' + T.ink : 'none'}">${inner}</div>`;
    const hd = (v, which) => (lv.heads ? big(String(v), `data-e2b-head="${which}"`, 'font-size:19px') : ansBox(which === 'z' ? 46 : 42, bh, v, `data-e2b-kopf="${which}"`));
    const cap = (w0, wd) => `<span class="e2b-t" data-dk-box style="width:${wd}px;text-align:center;font-size:11px;line-height:13px;color:${T.inkSoft}">${w0}</span>`;
    return `<div data-dk-box data-e2b-kreuz="1" style="display:flex;flex-direction:column;flex-shrink:0">` + `<div class="dk-row" style="gap:0;justify-content:flex-start"><span style="width:28px;display:block"></span>${cap(X.zehner, 54)}${cap(X.einer, 50)}</div>` +
      `<div class="dk-row" style="gap:0">${c(op(MAL), 28, true, true)}${c(hd(q.z, 'z'), 54, false, true)}${c(hd(q.e, 'e'), 50, false, true)}</div>` +
      `<div class="dk-row" style="gap:0">${c(big(String(q.a), 'data-e2b-rowhead="1"', 'font-size:19px'), 28, true, false)}${c(ansBox(48, bh, q.a * q.z, 'data-e2b-teil="z"'), 54, false, false)}${c(ansBox(44, bh, q.a * q.e, 'data-e2b-teil="e"'), 50, false, false)}</div></div>`;
  };
  const steps = (q) => col(
    eq([q.a, MAL, lv.heads ? q.z : { box: q.z, w: 42 }, '=', { box: q.a * q.z, w: 50 }], { bh, fs: 19, gap: 3, attrs: 'data-e2b-step="1"' }) +
    eq([q.a, MAL, lv.heads ? q.e : { box: q.e, w: 42 }, '=', { box: q.a * q.e, w: 50 }], { bh, fs: 19, gap: 3, attrs: 'data-e2b-step="2"' }) +
    eq([{ box: q.a * q.z, w: 46, attrs: `data-e2b-alt="${q.a * q.e}"` }, '+', { box: q.a * q.e, w: 42, attrs: `data-e2b-alt="${q.a * q.z}"` }, '=', { box: q.p, w: 50 }], { bh, fs: 19, gap: 3, attrs: 'data-e2b-step="3"' }), 4, 'align-items:flex-start');
  const field = (q) => {
    const f = A.dotField(q.a, q.b, { pitch: q.b > 40 ? 5 : q.b > 30 ? 6.4 : 7.2, r: q.b > 40 ? 1.9 : 2.4 });
    // over each part "4 · ☐": the factor printed, the child writes how many columns (30 and 7), never the dots
    const off = 26, bw = 40, gw = 72, lx = off + f.left, rx = off + f.right;
    const zl = Math.max(0, Math.round(lx - gw / 2)), el = Math.max(Math.round(rx - gw / 2), zl + gw + 8);
    const w = Math.max(off + f.w, el + gw) + 2, hgt = Math.max(34 + f.h + 2, 34 + f.h / 2 + 13);
    const grp = (v, which) => `<div class="dk-row" data-e2b-partgroup="${which}" style="position:absolute;top:0;gap:3px;flex-wrap:nowrap;justify-content:flex-start;width:${gw}px;left:${which === 'z' ? zl : el}px">` +
      `<span class="e2b-t" data-dk-box data-e2b-partlabel="${which}" style="font-size:16px;line-height:20px;white-space:nowrap">${q.a}\u00a0${MAL}</span>${ansBox(bw, 28, v, `data-e2b-part="${which}"`)}</div>`;
    return `<div data-dk-box data-e2b-fieldbox="1" style="position:relative;flex-shrink:0;width:${Math.round(w)}px;height:${Math.round(hgt)}px">` +
      grp(q.z, 'z') + grp(q.e, 'e') +
      `<div style="position:absolute;left:0;top:${Math.round(34 + f.h / 2 - 11)}px">${big(String(q.a), 'data-e2b-fieldrows="1"', 'font-size:17px;line-height:22px')}</div>` +
      `<div style="position:absolute;left:${off}px;top:34px">${art(f.svg)}</div></div>`;
  };
  const header = (q, k) => row(badge(String(k + 1)) + eq([q.a, MAL, q.b, '=', { box: q.p, w: 64 }], { fs: 21, bh: 30, attrs: `data-e2b-task="${k + 1}"` }), 8, 'justify-content:flex-start');
  const lab = (s) => t(s, '', 'font-size:12px;line-height:14px;color:' + T.inkSoft);
  let body;
  if (lv.field) {
    const cw = Math.floor((W - 12) / 2);
    const cardHtml = (q, k) => card(col(header(q, k) + col(lab(X.field) + field(q), 1, 'align-items:flex-start') + row(col(lab(X.cross) + kreuz(q), 1, 'align-items:flex-start') + col(lab(X.steps) + steps(q), 1, 'align-items:flex-start'), 8, 'justify-content:flex-start;align-items:flex-start;flex-wrap:nowrap'), 4, 'align-items:flex-start;width:100%;height:100%;justify-content:space-around'),
      cw, 'auto', `data-e2b-mul="${k + 1}" data-e2b-a="${q.a}" data-e2b-b="${q.b}"`, 'flex:1 1 0;min-height:0;padding:5px 9px;align-items:stretch');
    const rows = [];
    for (let k = 0; k < tasks.length; k += 2) rows.push(`<div class="dk-row" style="gap:12px;flex:1 1 0;min-height:0;align-items:stretch">${cardHtml(tasks[k], k)}${cardHtml(tasks[k + 1], k + 1)}</div>`);
    body = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:9px">${rows.join('')}</div>`;
  } else {
    body = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:7px">` + tasks.map((q, k) => card(row(header(q, k) + col(lab(X.cross) + kreuz(q), 1, 'align-items:flex-start') + col(lab(X.steps) + steps(q), 1, 'align-items:flex-start'), 16, 'justify-content:space-between;width:100%;align-items:center'),
      W, 'auto', `data-e2b-mul="${k + 1}" data-e2b-a="${q.a}" data-e2b-b="${q.b}"`, 'flex:1 1 0;min-height:0;padding:3px 12px')).join('') + '</div>';
  }
  const opts = lv.field ? X.helpsOpts : X.helpsOpts3;
  const refl = white(col(head(lv.field ? X.helps : X.helps3, '', 'font-size:16px') + openTicks('helps', opts, 'Jede Antwort ist richtig: Das Kind sagt, welche Darstellung ihm hilft, und begründet es.', 18) + frameLine([lv.field ? X.because : X.because3, W - 300], 32), 3, 'align-items:flex-start'),
    W, 'auto', 'data-e2b-reflect="1"', 'padding:4px 14px;flex-shrink:0');
  return { html: body + refl, meta: { tasks: tasks.map((q) => `${q.a}*${q.b}=${q.p}`), items: tasks.map((q) => `${q.a}*${q.b}`) } };
};

/* ================================================================ G3-637 — Halbschriftlich dividieren: 84 : 4 */
LOC['e2b-hdiv'] = 'de';
/**
 * Every division has no remainder (the objective: "ohne Rest"). The Zerlegung of the given tasks is printed and drawn (a
 * dashed line in the blocks); on the child's own tasks any split into two numbers that both divide without remainder is
 * right (OPEN, the key says so); only the result, and so the last box, has one value. The Probe multiplies the result by
 * the divisor (printed), so it has one value too.
 *   L1  numbers to 99, divisors 2-5, the place-value split works (84 = 80 + 4); 4 given, 3 own (with blocks)
 *   L2  numbers to 99, divisors 3-8, the place-value split does NOT work (96 = 80 + 16); 4 given, 3 own (with blocks)
 *   L3  numbers 100-200, divisors 2-9 (135 = 100 + 35); 2 given, 6 own (no blocks)
 */
const HDIV_LV = {
  1: { given: 4, own: 3, ownPic: true, kind: 'place' },
  2: { given: 4, own: 3, ownPic: true, kind: 'times' },
  3: { given: 2, own: 6, ownPic: false, kind: 'big' },
};
/** the Zerlegung a page prints: the largest Zehnerzahl that divides (L1: the tens themselves) */
function hdivSplit(n, dv, kind) { if (kind === 'place') return n - (n % 10); let L = 0; for (let m = 1; 10 * dv * m <= n; m++) L = 10 * dv * m; return L; }
function hdivTask(kind, rng, used) {
  for (let k = 0; k < 50000; k++) {
    let n, dv;
    if (kind === 'place') { dv = rint(rng, 2, 5); const tz = dv * rint(rng, 1, Math.floor(9 / dv)), e = dv * rint(rng, 1, Math.floor(9 / dv)); n = 10 * tz + e; }
    else if (kind === 'times') { dv = rint(rng, 3, 8); n = dv * rint(rng, 11, Math.floor(99 / dv)); if ((Math.floor(n / 10) % dv) === 0) continue; }
    else { dv = rint(rng, 2, 9); n = dv * rint(rng, Math.ceil(100 / dv), Math.floor(198 / dv)); }
    const L = hdivSplit(n, dv, kind), R = n - L;
    if (!L || R <= 0 || L % dv || R % dv || n / dv < 11) continue;
    // one number to divide once a page (96 : 6 and 96 : 8 printed the one's result in the other's split), and a result
    // never equal to a part of its own split (125 = 100 + 25 above 125 : 5 = 25)
    // nor a result that is another task's number to divide (88 : 2 = 44 above 44 = 40 + 4 printed the first task's
    // steps in the second's split)
    if (used.has('n' + n) || used.has('q' + n / dv) || used.has('q' + n) || used.has('n' + n / dv) || n / dv === L || n / dv === R) continue;
    used.add('n' + n); used.add('q' + n / dv);
    return { n, d: dv, q: n / dv, L, R };
  }
  throw new Error('e2b-hdiv: no ' + kind + ' task');
}
const hdivKey = (q) => `Jede Zerlegung in zwei Zahlen, die sich ohne Rest durch ${q.d} teilen lassen, ist richtig, zum Beispiel ${q.n} = ${q.L} + ${q.R}: ${q.L} : ${q.d} = ${q.L / q.d}, ${q.R} : ${q.d} = ${q.R / q.d}, ${q.L / q.d} + ${q.R / q.d} = ${q.q}.`;
MODES['e2b-hdiv'] = (d, rng) => {
  const lv = HDIV_LV[d.level], X = B.TEXT.hdiv;
  const used = new Set();
  const given = Array.from({ length: lv.given }, () => hdivTask(lv.kind, rng, used));
  const own = Array.from({ length: lv.own }, () => hdivTask(lv.kind, rng, used));
  const bh = 28, fs = 19;
  const header = (q, k) => row(badge(String(k)) + eq([q.n, ':', q.d, '=', { box: q.q, w: 56 }], { fs: 20, bh: 30, attrs: `data-e2b-task="${k}"` }), 7, 'justify-content:flex-start');
  const blocks = (q, split) => art(A.baseTen(q.n, { s: q.n > 99 ? 5 : 7, split: split ? q.L : null }), `data-e2b-blocks="${q.n}"`);
  let k = 0;
  const gw = Math.floor((W - 12) / 2);
  const givenCards = given.map((q) => {
    k++;
    const right = col(eq([q.n, '=', q.L, '+', q.R], { fs, bh, attrs: 'data-e2b-split="given"' }) +
      eq([q.L, ':', q.d, '=', { box: q.L / q.d, w: 44 }], { fs, bh, gap: 4, attrs: 'data-e2b-part="1"' }) +
      eq([q.R, ':', q.d, '=', { box: q.R / q.d, w: 44 }], { fs, bh, gap: 4, attrs: 'data-e2b-part="2"' }) +
      eq([{ box: q.L / q.d, w: 40, attrs: `data-e2b-alt="${q.R / q.d}"` }, '+', { box: q.R / q.d, w: 36, attrs: `data-e2b-alt="${q.L / q.d}"` }, '=', { box: q.q, w: 42 }], { fs, bh, gap: 4, attrs: 'data-e2b-part="3"' }), 4, 'align-items:flex-start');
    return card(col(header(q, k) + row(blocks(q, true) + right, 12, 'justify-content:flex-start;align-items:center'), 5, 'align-items:flex-start;width:100%'), gw, 'auto', `data-e2b-div="${k}" data-e2b-given="1" data-e2b-n="${q.n}" data-e2b-d="${q.d}"`, 'flex:1 1 auto;padding:5px 9px;align-items:stretch');
  });
  const ow = Math.floor((W - 24) / 3);
  const ownCards = own.map((q) => {
    k++;
    const body = col((lv.ownPic ? blocks(q, false) : '') +
      eq([q.n, '=', { free: true, w: 46 }, '+', { free: true, w: 44 }], { fs, bh, attrs: 'data-e2b-split="own"' }) +
      eq([{ free: true, w: 44 }, ':', q.d, '=', { free: true, w: 40 }], { fs, bh, attrs: 'data-e2b-part="1"' }) +
      eq([{ free: true, w: 44 }, ':', q.d, '=', { free: true, w: 40 }], { fs, bh, attrs: 'data-e2b-part="2"' }) +
      eq([{ free: true, w: 40 }, '+', { free: true, w: 38 }, '=', { box: q.q, w: 44 }], { fs, bh, attrs: 'data-e2b-part="3"' }), 4, 'align-items:flex-start');
    return card(col(header(q, k) + body, 5, 'align-items:flex-start;width:100%;height:100%;justify-content:space-around'), ow, 'auto', `data-e2b-div="${k}" data-e2b-given="0" data-e2b-n="${q.n}" data-e2b-d="${q.d}" data-e2b-open="split-${k}" data-e2b-key="${esc(hdivKey(q))}"`, 'flex:1 1 0;padding:5px 8px;align-items:stretch');
  });
  // the Probe for two of the child's own tasks (their places drawn)
  const probeIdx = shuffle(rng, own.map((_, i) => i)).slice(0, 2).sort((a, b) => a - b);
  const probes = probeIdx.map((i) => { const q = own[i], kk = lv.given + i + 1; return row(t(`${X.probeTo} ${kk}:`, '', 'font-size:15px') + eq([{ box: q.q, w: 46 }, MAL, q.d, '=', { box: q.n, w: 54 }], { fs, bh, attrs: `data-e2b-probe="${kk}"` }), 6, 'justify-content:flex-start'); }).join('');
  const gRows = []; for (let i = 0; i < givenCards.length; i += 2) gRows.push(`<div class="dk-row" style="gap:12px;align-items:stretch">${givenCards[i]}${givenCards[i + 1] || ''}</div>`);
  const oRows = []; for (let i = 0; i < ownCards.length; i += 3) oRows.push(`<div class="dk-row" style="gap:12px;align-items:stretch;flex:1 1 0;min-height:0">${ownCards.slice(i, i + 3).join('')}</div>`);
  const html = col(head(X.givenHead, '', 'font-size:16px') + col(gRows.join(''), 8, 'align-items:stretch;width:100%'), 3, 'align-items:flex-start;flex-shrink:0') +
    col(head(X.ownHead, '', 'font-size:16px') + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px;width:100%">${oRows.join('')}</div>`, 3, 'align-items:flex-start;flex:1 1 auto;min-height:0') +
    white(row(head(X.probe, '', 'font-size:16px') + probes, 24, 'justify-content:flex-start'), W, 'auto', 'data-e2b-probes="1"', 'padding:4px 14px;flex-shrink:0');
  return { html, meta: { given: given.map((q) => `${q.n}:${q.d}=${q.L}+${q.R}`), own: own.map((q) => `${q.n}:${q.d}`), items: given.concat(own).map((q) => `${q.n}:${q.d}`) } };
};

/* ================================================================ G3-638 — Millimeter: genau messen und zeichnen (REAL SIZE) */
LOC['e2b-mm'] = 'de';
/**
 * Everything measured or drawn is printed at its REAL size (96 px to the inch; A4 at 100 %): the 10-cm ruler, every line
 * and every thing. Every length is a whole number of millimetres, never a whole centimetre (the mm part is the lesson),
 * and the lines and things of a page all differ by 3 mm or more. A line's ends are thin upright marks (never a round cap a
 * printer could blur over the next millimetre).
 *   L1  four lines and two things to measure; four lines to draw, given as "6 cm 3 mm"
 *   L2  four lines and four things; four lines to draw, two as "6 cm 3 mm" and two as "85 mm"
 *   L3  three lines and four things, and how much longer the longest line is than the shortest; four lines to draw, one
 *       longer than 10 cm
 */
const MM_LV = {
  1: { lines: 4, things: 2, draw: ['cmmm', 'cmmm', 'cmmm', 'cmmm'], diff: false, long: false },
  2: { lines: 4, things: 4, draw: ['cmmm', 'mm', 'cmmm', 'mm'], diff: false, long: false },
  3: { lines: 3, things: 4, draw: ['cmmm', 'mm', 'cmmm', 'mm'], diff: true, long: true },
};
MODES['e2b-mm'] = (d, rng) => {
  const lv = MM_LV[d.level], X = B.TEXT.mm;
  const taken = [];
  const free = (v) => v % 10 !== 0 && v !== 47 && taken.every((u) => Math.abs(u - v) >= 3);
  const pickLen = (lo, hi) => { for (let k = 0; k < 5000; k++) { const v = rint(rng, lo, hi); if (free(v)) { taken.push(v); return v; } } throw new Error('e2b-mm: no length'); };
  const things = shuffle(rng, B.MM_THINGS).slice(0, lv.things).map((th) => ({ ...th, len: pickLen(th.mm[0], th.mm[1]) }));
  const lines = Array.from({ length: lv.lines }, () => pickLen(31, 96));
  const draws = lv.draw.map((form, i) => ({ form, len: lv.long && i === lv.draw.length - 1 ? pickLen(101, 129) : pickLen(31, 96) }));
  if (lv.long) { const j = rint(rng, 0, draws.length - 1); const tmp = draws[j]; draws[j] = draws[draws.length - 1]; draws[draws.length - 1] = tmp; }
  const letters = 'abcdefghijk';
  const frame = (len, attrs) => eq([{ box: Math.floor(len / 10), w: 36 }, 'cm', { box: len % 10, w: 36 }, 'mm', '=', { box: len, w: 48 }, 'mm'], { bh: 28, fs: 17, attrs, gap: 4 });
  const ruler = white(row(art(A.mmRuler(10), 'data-e2b-ruler="1"') + col(tw(X.ruler, 200, '', 'font-size:13px;line-height:16px') + t(X.rule, '', 'font-size:15px;color:' + T.teal), 4, 'align-items:flex-start'), 14, 'justify-content:flex-start;align-items:center'), W, 'auto', 'data-e2b-rulerbox="1"', 'padding:5px 10px;flex-shrink:0');
  const lineRows = lines.map((len, i) => row(row(t(letters[i], '', 'font-size:17px;width:14px') + art(A.mmLine(len), `data-e2b-line="${letters[i]}"`), 6, 'justify-content:flex-start') + frame(len, `data-e2b-frame="${letters[i]}"`), 8, 'justify-content:space-between;width:100%')).join('');
  const thingRows = things.map((th) => row(row(t(th.de, '', 'font-size:15px;width:118px') + art(A.realThing(th.id, th.len), `data-e2b-realthing="${th.id}"`), 6, 'justify-content:flex-start') + frame(th.len, `data-e2b-frame="${th.id}"`), 8, 'justify-content:space-between;width:100%')).join('');
  const diff = lv.diff ? row(t(X.diff, '', 'font-size:15px') + eq([{ box: Math.max(...lines) - Math.min(...lines), w: 52 }, 'mm'], { bh: 28, fs: 17, attrs: 'data-e2b-diff="1"' }), 8, 'justify-content:flex-start') : '';
  const dl = letters.slice(lines.length);
  const drawRows = draws.map((q, i) => row(t(`${dl[i]}: ${q.form === 'mm' ? q.len + ' mm' : Math.floor(q.len / 10) + ' cm ' + (q.len % 10) + ' mm'}`, `data-e2b-drawlabel="${dl[i]}"`, 'font-size:16px;width:122px') + art(A.startPoint(q.len + 8), `data-e2b-draw="${dl[i]}" data-e2b-len="${q.len}"`), 6, 'justify-content:flex-start')).join('');
  const sec = (h, inner, attrs) => card(col(head(h, '', 'font-size:16px') + col(inner, 5, 'align-items:stretch;width:100%'), 3, 'align-items:stretch;width:100%'), W, 'auto', attrs, 'padding:4px 12px;flex:1 1 auto;justify-content:center');
  const html = ruler + sec(X.lines, lineRows + diff, 'data-e2b-sec="lines"') + sec(X.things, thingRows, 'data-e2b-sec="things"') + sec(X.draw, drawRows, 'data-e2b-sec="draw"');
  return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${html}</div>`, meta: { lines, things: things.map((th) => `${th.id}:${th.len}`), draws: draws.map((q) => q.len), items: lines.map((l) => l + 'mm').concat(things.map((th) => th.id)) } };
};

/* ================================================================ G3-639 — Meter und Kilometer */
LOC['e2b-km'] = 'de';
/**
 * A town map: five places on five fixed spots (which place stands where is drawn), six roads, each road's length in metres
 * PROPORTIONAL to its drawn length (so the picture never contradicts the numbers). A route names every place it passes,
 * so it runs along one road between each two (one way to add it). "Ergänze bis 1 km" has one value. The everyday distances
 * each go to the card nearest on a tenfold scale (etwa 100 m / etwa 1 km / viele Kilometer); the bank's ranges hold it.
 *   L1  routes of two roads, lengths in fifties; complete hundreds to 1 km
 *   L2  routes of two roads, lengths in tens; complete Zehnerzahlen to 1 km
 *   L3  two routes of three roads (the name on one line, the sum under it); which of two routes is shorter; how many
 *       metres each route lacks to 1 km
 */
const KM_LV = {
  1: { legs: 2, routes: 4, round: 50, maxRoad: 480, fills: 4, fillKind: 'h', shorter: false, missing: 0 },
  2: { legs: 2, routes: 4, round: 10, maxRoad: 470, fills: 4, fillKind: 'z', shorter: false, missing: 0 },
  3: { legs: 3, routes: 2, round: 10, maxRoad: 380, fills: 0, fillKind: 'z', shorter: true, missing: 2 },
};
const MAP_W = 651, MAP_H = 214;
const MAP_SLOTS = [[84, 44], [320, 34], [572, 48], [470, 158], [170, 160]];
const MAP_ROADS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]];
const DAT_FROM = { schule: 'der Schule', baeckerei: 'der Bäckerei', spielplatz: 'dem Spielplatz', schwimmbad: 'dem Schwimmbad', bahnhof: 'dem Bahnhof' };
const TO_PLACE = { schule: 'zur Schule', baeckerei: 'zur Bäckerei', spielplatz: 'zum Spielplatz', schwimmbad: 'zum Schwimmbad', bahnhof: 'zum Bahnhof' };
const ACC = { schule: 'die Schule', baeckerei: 'die Bäckerei', spielplatz: 'den Spielplatz', schwimmbad: 'das Schwimmbad', bahnhof: 'den Bahnhof' };
/** every simple path of `legs` roads */
function mapPaths(n, roads, legs) {
  const adj = Array.from({ length: n }, () => []);
  roads.forEach((r, i) => { adj[r[0]].push([r[1], i]); adj[r[1]].push([r[0], i]); });
  const out = [];
  const rec = (path, rs) => { if (rs.length === legs) { out.push({ path: path.slice(), roads: rs.slice() }); return; } for (const [v, ri] of adj[path[path.length - 1]]) if (!path.includes(v)) { path.push(v); rs.push(ri); rec(path, rs); path.pop(); rs.pop(); } };
  for (let s = 0; s < n; s++) rec([s], []);
  return out;
}
MODES['e2b-km'] = (d, rng) => {
  const lv = KM_LV[d.level], X = B.TEXT.km;
  for (let attempt = 0; attempt < 400; attempt++) {
    const order = shuffle(rng, B.PLACES);
    const pos = MAP_SLOTS.map(([x, y]) => [x + rint(rng, -8, 8), y + rint(rng, -6, 6)]);
    const px = MAP_ROADS.map(([a, b]) => Math.hypot(pos[a][0] - pos[b][0], pos[a][1] - pos[b][1]));
    const scale = lv.maxRoad / Math.max(...px);
    const m = px.map((p) => Math.max(lv.round, Math.round(p * scale / lv.round) * lv.round));
    const sumOf = (rs) => rs.reduce((s, ri) => s + m[ri], 0);
    // routes: simple paths (a route and its reverse count once), sums from 300 to 1000 m
    const seen = new Set();
    const cands = shuffle(rng, mapPaths(5, MAP_ROADS, lv.legs)).filter((p) => { const k = p.path.slice().sort().join() + '|' + p.roads.slice().sort().join(); if (seen.has(k)) return false; seen.add(k); const s = sumOf(p.roads); return s >= 300 && s <= 1000; });
    const routes = [], totals = new Set();
    for (const c of cands) { const s = sumOf(c.roads); if (totals.has(s)) continue; routes.push(c); totals.add(s); if (routes.length === lv.routes) break; }
    if (routes.length < lv.routes) continue;
    // L3: two routes of two roads between the same two places, their totals 30 m or more apart
    let cmp = null;
    if (lv.shorter) {
      const two = mapPaths(5, MAP_ROADS, 2);
      const pairs = [];
      const allPaths = [2, 3, 4].flatMap((L) => mapPaths(5, MAP_ROADS, L));
      const minVia = (a, b, v) => Math.min(...allPaths.filter((x) => x.path[0] === a && x.path[x.path.length - 1] === b && x.path.includes(v)).map((x) => sumOf(x.roads)));
      for (const p of two) for (const q of two) if (p.path[0] === q.path[0] && p.path[2] === q.path[2] && p.path[1] < q.path[1] && Math.abs(sumOf(p.roads) - sumOf(q.roads)) >= 30 && minVia(p.path[0], p.path[2], p.path[1]) === sumOf(p.roads) && minVia(q.path[0], q.path[2], q.path[1]) === sumOf(q.roads)) pairs.push([p, q]);
      if (!pairs.length) continue;
      // the two ways in either order: which one is printed first never tells which one is shorter
      const [p, q] = rint(rng, 0, 1) ? rng.pick(pairs) : rng.pick(pairs).slice().reverse();
      cmp = { from: p.path[0], to: p.path[2], via: [p.path[1], q.path[1]], sums: [sumOf(p.roads), sumOf(q.roads)], legs: [p.roads.map((ri) => m[ri]), q.roads.map((ri) => m[ri])] };
    }
    const name = (i) => order[i].de;
    const places = order.map((p, i) => ({ id: p.id, name: p.de, icon: p.id, x: pos[i][0], y: pos[i][1] }));
    const roads = MAP_ROADS.map(([a, b], i) => ({ a: order[a].id, b: order[b].id, m: m[i] }));
    const mapHtml = row(art(A.townMap({ w: MAP_W, h: MAP_H, places, roads }), 'data-e2b-map="1"'), 0, 'justify-content:center;width:100%');
    // the routes
    const routeRows = routes.map((r, k) => {
      const parts = [];
      r.roads.forEach((ri, j) => { if (j) parts.push('+'); parts.push({ box: m[ri], w: 50 }, 'm'); });
      parts.push('=', { box: sumOf(r.roads), w: 58 }, 'm');
      const nm = t(r.path.map(name).join(' – ') + ':', `data-e2b-route="${r.path.map((i) => order[i].id).join(',')}"`, 'font-size:15px'), e0 = eq(parts, { bh: 28, fs: 17, gap: 4, attrs: `data-e2b-routeeq="${k + 1}"` });
      return lv.legs > 2 ? row(badge(String(k + 1)) + col(nm + e0, 3, 'align-items:flex-start'), 8, 'justify-content:flex-start') : row(badge(String(k + 1)) + nm + e0, 8, 'justify-content:flex-start');
    }).join('');
    // completing to 1 km (L3: what a route lacks first)
    const fills = [], fillVals = new Set();
    const missing = routes.slice(0, lv.missing).map((r, k) => row(t(`Aufgabe ${k + 1}: ${X.missingShort}`, '', 'font-size:15px') + eq([{ box: 1000 - sumOf(r.roads), w: 56 }, 'm.'], { bh: 28, fs: 17, attrs: `data-e2b-missing="${k + 1}"` }), 8, 'justify-content:flex-start'));
    // the completion rows are named by their TASK ("Aufgabe 1"), not "Weg 1", which a child read as the first way
    // of a task (German teacher re-check 2026-11-26)
    // a completion never prints a route's total or what a route lacks to 1 km ("280 m + _ = 1 km" under "Weg 1: Bis
    // 1 km fehlen noch _ m" with Weg 1 = 720 m gave the route's answer away), nor another completion's answer
    const routeNums = new Set(routes.flatMap((r) => [sumOf(r.roads), 1000 - sumOf(r.roads)]));
    const fillCands = shuffle(rng, lv.fillKind === 'h' ? Array.from({ length: 18 }, (_, i) => 50 * (i + 2)).filter((x) => x !== 500) : Array.from({ length: 88 }, (_, i) => 10 * (i + 11)).filter((x) => x % 100 && x !== 500));
    for (const x of fillCands) { if (fills.length === lv.fills) break; if (routeNums.has(x) || fillVals.has(1000 - x)) continue; fillVals.add(x); fills.push(eq([x, 'm', '+', { box: 1000 - x, w: 56 }, 'm', '=', '1 km'], { bh: 28, fs: 17, gap: 4, attrs: 'data-e2b-fill="1"' })); }
    if (fills.length < lv.fills) continue;
    const fillRows = []; const fl = missing.concat(fills);
    for (let i = 0; i < fl.length; i += 2) fillRows.push(row(fl[i] + (fl[i + 1] || ''), 18, 'justify-content:space-between;width:100%'));
    let shorter = '';
    if (cmp) {
      const opts = cmp.via.map((v) => `über ${ACC[order[v].id]}`), rightOpt = opts[cmp.sums[0] < cmp.sums[1] ? 0 : 1];
      // each way written out under the question ("über den Spielplatz: _ m + _ m = _ m"), then the shorter circled
      const viaRow = (o, k) => row(pick(o, o === rightOpt, 'style="width:184px;text-align:center;box-sizing:border-box"') + eq([{ box: cmp.legs[k][0], w: 50 }, 'm', '+', { box: cmp.legs[k][1], w: 50 }, 'm', '=', { box: cmp.sums[k], w: 58 }, 'm'], { bh: 27, fs: 17, gap: 4, attrs: `data-e2b-viaeq="${k + 1}"` }), 10, 'justify-content:flex-start');
      shorter = col(t(`Von ${DAT_FROM[order[cmp.from].id]} ${TO_PLACE[order[cmp.to].id]}: ${X.shorter}`, 'data-e2b-cmp="1"', 'font-size:15px') +
        `<div class="dk-row" data-dk-item="shorter" data-g1-one="1" data-e2b-sums="${cmp.sums.join(',')}" style="gap:4px;flex-direction:column;align-items:flex-start;justify-content:flex-start">${opts.map(viaRow).join('')}</div>`, 3, 'align-items:flex-start');
    }
    // matching the everyday distances: two for each card, the cards in their order
    const pool = { h: [], k: [], v: [] };
    for (const x of shuffle(rng, B.DISTANCES)) if (pool[x.card].length < 2) pool[x.card].push(x);
    const items = shuffle(rng, [...pool.h, ...pool.k, ...pool.v]);
    const left = items.map((x, i) => `<div class="dk-row" data-e2b-match="${x.card}" data-e2b-dist="${x.id}" style="gap:8px;justify-content:space-between;width:340px">${t(x.de, '', 'font-size:14px;line-height:18px')}<span class="dk-dot" data-dk-box data-e2b-dotfrom="${i}"></span></div>`).join('');
    const cardsHtml = ['h', 'k', 'v'].map((c) => row(`<span class="dk-dot" data-dk-box data-e2b-dotto="${c}"></span>` + `<span class="e2b-pick" data-dk-box data-e2b-target="${c}" style="font-size:15px">${esc(X.cards[c])}</span>`, 8, 'justify-content:flex-start')).join('');
    const match = row(col(left, 6, 'align-items:flex-start') + col(cardsHtml, 34, 'align-items:flex-start;justify-content:center'), 60, 'justify-content:flex-start;align-items:center');
    const sec = (h, inner, attrs, style = '') => card(col(row(head(h, '', 'font-size:16px') + (attrs.includes('routes') ? t(X.rule, '', 'font-size:15px;color:' + T.coral) : ''), 16, 'justify-content:space-between;width:100%') + inner, 5, 'align-items:stretch;width:100%'), W, 'auto', attrs, 'padding:4px 12px;flex-shrink:0' + style);
    const html = mapHtml + sec(X.routes, col(routeRows + shorter, 5, 'align-items:flex-start'), 'data-e2b-sec="routes"') +
      sec(lv.missing ? X.fill + ' ' : X.fill, col(fillRows.join(''), 5, 'align-items:stretch;width:100%'), 'data-e2b-sec="fill"') + sec(X.match, match, 'data-e2b-sec="match"');
    return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:7px;justify-content:space-between">${html}</div>`, meta: { roads: roads.map((r) => `${r.a}-${r.b}:${r.m}`), routes: routes.map((r) => r.path.map((i) => order[i].id).join('>') + '=' + sumOf(r.roads)), match: items.map((x) => x.id + ':' + x.card), items: routes.map((r) => r.path.map((i) => order[i].id).join('>')) } };
  }
  throw new Error('e2b-km: no map');
};

/* ================================================================ G3-640 — Mit Komma schreiben */
LOC['e2b-komma'] = 'de';
/**
 * Money (euros and cents) and lengths (metres and centimetres) written three ways: "3 € 50 ct | 350 ct | 3,50 €" and
 * "1 m 25 cm | 125 cm | 1,25 m" — the comma only for money and m/cm (the Klasse-3 Lehrplan), always two digits after
 * it. The money is drawn as play money in the euro's colours (E-1's notes, this batch's coins); a length is read off a
 * strip of a tape measure (centimetres), an arrow at the length.
 *   L1  whole tens of cents (3,50 €); lengths with cm from 11 to 99; eight conversions, no 0 after the comma
 *   L2  any cents and cm; one amount and one length with a 0 after the comma (4,05 €); twelve conversions, three with a 0
 *   L3  as L2 with two of each with a 0; twelve conversions, also "3 € 7 ct = ☐ €" and "5,09 € = ☐ € ☐ ct"
 */
const KOMMA_LV = {
  1: { money: 4, len: 4, zeroRows: 0, tens: true, conv: 8, zeroConv: 0, forms: ['c2ct', 'ct2c', 'm2cm', 'cm2m'] },
  2: { money: 4, len: 4, zeroRows: 1, tens: false, conv: 12, zeroConv: 3, forms: ['c2ct', 'ct2c', 'm2cm', 'cm2m'] },
  3: { money: 4, len: 4, zeroRows: 2, tens: false, conv: 12, zeroConv: 4, forms: ['c2ct', 'ct2c', 'm2cm', 'cm2m', 'mix2c', 'mixm2c', 'c2mix'] },
};
const PIECES_CT = [500, 200, 100, 50, 20, 10, 5, 2, 1];
const greedy = (v) => { const out = []; for (const p of PIECES_CT) while (v >= p) { out.push(p); v -= p; } return out; };
/** the drawn width of an amount's money (notes 27 px high, the 2-euro coin 35 px across, 5 px apart) */
const purseWidth = (v) => greedy(v).reduce((w, p) => w + 5 + (p >= 500 ? Math.round(27 * 2.15 * A.MONEY_NOTE_MM[p / 100] / A.MONEY_NOTE_MM[5]) : Math.round(35 * A.COIN_MM[p] / A.COIN_MM[200])), -5);
MODES['e2b-komma'] = (d, rng) => {
  const lv = KOMMA_LV[d.level], X = B.TEXT.komma;
  const usedV = new Set();
  const amount = (zero, pieces) => {
    for (let k = 0; k < 20000; k++) {
      const e = rint(rng, 1, 9);
      const tens = lv.tens && pieces;   // level 1: money in tens of cents (3,50 €); lengths any cm
      const c = tens ? 10 * rint(rng, 1, 9) : zero ? rint(rng, 1, 9) : rint(rng, 11, 99);
      if (!tens && !zero && c % 10 === 0) continue;
      if (!pieces && c % 5 === 0) continue;
      const v = 100 * e + c;
      if (usedV.has(v) || v === 405 || (pieces && purseWidth(v) > 190)) continue;
      usedV.add(v); return v;
    }
    throw new Error('e2b-komma: no amount');
  };
  const zFlags = (n) => shuffle(rng, Array.from({ length: n }, (_, i) => i < lv.zeroRows));
  const money = zFlags(lv.money).map((z) => amount(z, true));
  const lens = zFlags(lv.len).map((z) => amount(z, false));
  const CW = [232, 128, 96, 108];   // picture | first | second | comma
  const cell = (inner, w, attrs = '') => `<div class="e2b-cell" style="width:${w}px;border-right:none;justify-content:flex-start"${attrs ? ' ' + attrs : ''}>${inner}</div>`;
  const headRow = (labels) => `<div class="dk-row" style="gap:0;justify-content:flex-start">${cell('', CW[0])}${labels.map((l, i) => cell(t(l, '', 'font-size:14px;color:' + T.teal), CW[i + 1])).join('')}</div>`;
  const moneyPic = (v) => `<div class="dk-row" data-e2b-purse="${v}" style="gap:5px;justify-content:flex-start;flex-wrap:nowrap">` + greedy(v).map((p) => art(p >= 500 ? A.euroNote(p / 100, 27) : A.euroCoin(p, 35), `data-e2b-piece="${p}"`)).join('') + '</div>';
  const moneyRow = (v, k) => `<div class="dk-row" data-e2b-row="money" data-e2b-v="${v}" style="gap:0;justify-content:flex-start;align-items:center">` +
    cell(row(badge(String.fromCharCode(65 + k)) + moneyPic(v), 6, 'justify-content:flex-start'), CW[0]) +
    cell(eq([{ box: Math.floor(v / 100), w: 32 }, '€', { box: v % 100, w: 36 }, 'ct'], { bh: 28, fs: 16, gap: 3, attrs: 'data-e2b-form="split"' }), CW[1]) +
    cell(eq([{ box: v, w: 54 }, 'ct'], { bh: 28, fs: 16, gap: 3, attrs: 'data-e2b-form="small"' }), CW[2]) +
    cell(eq([{ box: comma(v), w: 64 }, '€'], { bh: 28, fs: 16, gap: 3, attrs: 'data-e2b-form="comma"' }), CW[3]) + '</div>';
  const lenRow = (v, k) => {
    const c0 = Math.min(985, 5 * Math.floor((v - rint(rng, 3, 10)) / 5));   // the tape never prints past 1000 (numbers to 1000)
    return `<div class="dk-row" data-e2b-row="len" data-e2b-v="${v}" style="gap:0;justify-content:flex-start;align-items:center">` +
      cell(row(badge(String.fromCharCode(65 + lv.money + k)) + art(A.tape(c0, c0 + 15, v, { px: 10 }), `data-e2b-tape="${v}"`), 6, 'justify-content:flex-start'), CW[0]) +
      cell(eq([{ box: Math.floor(v / 100), w: 32 }, 'm', { box: v % 100, w: 36 }, 'cm'], { bh: 28, fs: 16, gap: 3, attrs: 'data-e2b-form="split"' }), CW[1]) +
      cell(eq([{ box: v, w: 54 }, 'cm'], { bh: 28, fs: 16, gap: 3, attrs: 'data-e2b-form="small"' }), CW[2]) +
      cell(eq([{ box: comma(v), w: 64 }, 'm'], { bh: 28, fs: 16, gap: 3, attrs: 'data-e2b-form="comma"' }), CW[3]) + '</div>';
  };
  // the conversions: the level's forms in turn, the zeros after the comma spread over them
  const conv = [], usedC = new Set();
  const zc = shuffle(rng, Array.from({ length: lv.conv }, (_, i) => i < lv.zeroConv));
  const forms = shuffle(rng, Array.from({ length: lv.conv }, (_, i) => lv.forms[i % lv.forms.length]));
  forms.forEach((f, i) => {
    let v; do { v = 100 * rint(rng, 1, 9) + (zc[i] ? rint(rng, 1, 9) : lv.tens ? 10 * rint(rng, 1, 9) : rint(rng, 11, 99)); } while (usedC.has(v) || usedV.has(v) || v === 405 || (!zc[i] && !lv.tens && v % 10 === 0));
    usedC.add(v);
    const cur = ['c2ct', 'ct2c', 'mix2c', 'c2mix'].includes(f);
    const big2 = cur ? 'ct' : 'cm', unit = cur ? '€' : 'm';
    let parts;
    if (f === 'c2ct' || f === 'm2cm') parts = [comma(v), unit, '=', { box: v, w: 56 }, big2];
    else if (f === 'ct2c' || f === 'cm2m') parts = [v, big2, '=', { box: comma(v), w: 64 }, unit];
    else if (f === 'mix2c' || f === 'mixm2c') parts = [Math.floor(v / 100), unit, v % 100, big2, '=', { box: comma(v), w: 64 }, unit];
    else parts = [comma(v), unit, '=', { box: Math.floor(v / 100), w: 34 }, unit, { box: v % 100, w: 38 }, big2];
    conv.push(eq(parts, { bh: 28, fs: 16, gap: 3, attrs: `data-e2b-conv="${f}" data-e2b-v="${v}"` }));
  });
  const cRows = []; for (let i = 0; i < conv.length; i += 3) cRows.push(row(conv.slice(i, i + 3).join(''), 10, 'justify-content:space-between;width:100%'));
  const sec = (h, inner, attrs) => card(col(head(h, '', 'font-size:16px') + inner, 3, 'align-items:stretch;width:100%'), W, 'auto', attrs, 'padding:3px 10px;flex:1 1 auto;justify-content:center');
  const html = sec(X.moneyHead, headRow(X.moneyCols) + col(money.map(moneyRow).join(''), 4, 'align-items:stretch'), 'data-e2b-sec="money"') +
    sec(X.lenHead, headRow(X.lenCols) + col(lens.map(lenRow).join(''), 4, 'align-items:stretch'), 'data-e2b-sec="len"') +
    white(col(head(X.convert, '', 'font-size:16px') + col(cRows.join(''), 7, 'align-items:stretch;width:100%'), 4, 'align-items:stretch;width:100%'), W, 'auto', 'data-e2b-sec="conv"', 'padding:4px 12px;flex-shrink:0');
  return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${html}</div>`, meta: { money, lens, conv: forms, items: money.map(comma).concat(lens.map(comma)) } };
};

/* ================================================================ G3-641 — Überschlagen beim Einkaufen: Reicht das Geld? */
LOC['e2b-ueber'] = 'de';
/**
 * The rule is printed: every price to whole euros (from 50 cents up), then add. Each shopping list is decided by that
 * rule, and so that no reading of it can turn the answer: an "enough" list stays under the note even when every price is
 * rounded UP (and its Überschlag is at least 1 € under it); a "not enough" list is over the note even when every price is
 * rounded DOWN. No price ends in ,50. A receipt's printed total is right (then it lies within 1,50 € of the Überschlag)
 * or wrong by a typical slip (a price forgotten, or counted twice; then 3 € or more away); the receipt rule ("more than
 * 2 € from your Überschlag: it cannot be right") decides each one, even for a child who also rounds the printed total.
 *   L1  four lists of three prices and a 10-euro note; one receipt
 *   L2  four lists of three or four prices, 10- or 20-euro notes; two receipts
 *   L3  four lists of four prices; two receipts, each with a line to give the reason
 */
const UEBER_LV = {
  1: { lists: 4, prices: [3, 3], notes: [10], receipts: 1, because: false },
  2: { lists: 4, prices: [3, 4], notes: [10, 20], receipts: 2, because: false },
  3: { lists: 4, prices: [4, 4], notes: [10, 20], receipts: 2, because: true },
};
const euro = (c) => `${comma(c)} €`;
const roundEur = (c) => Math.floor((c + 50) / 100);
MODES['e2b-ueber'] = (d, rng) => {
  const lv = UEBER_LV[d.level], X = B.TEXT.ueber;
  const price = (it) => { for (;;) { const c = rint(rng, it.ct[0], it.ct[1]); if (c % 100 !== 50 && c % 100 !== 0) return c; } };
  const usedItems = new Set();
  const list = ([enough, note, n]) => {
    for (let k = 0; k < 20000; k++) {
      const its = shuffle(rng, B.SHOP).slice(0, n);
      const ps = its.map(price);
      const E = ps.reduce((s, c) => s + roundEur(c), 0), up = ps.reduce((s, c) => s + Math.ceil(c / 100), 0), down = ps.reduce((s, c) => s + Math.floor(c / 100), 0);
      if (enough ? !(up <= note - 1 && E <= note - 1) : !(down >= note + 1)) continue;
      if (E < note * 0.5 || E > note * 1.6) continue;   // a page of real decisions: never far from the note
      return { items: its.map((it, i) => ({ id: it.id, de: it.de, c: ps[i] })), note, E, enough, total: ps.reduce((s, c) => s + c, 0) };
    }
    throw new Error('e2b-ueber: no list');
  };
  // each list's decision and its note drawn together: both notes take both decisions
  const kinds = shuffle(rng, lv.notes.map((nt) => [[true, nt], [false, nt]]).flat().concat(lv.notes.length === 1 ? [[true, lv.notes[0]], [false, lv.notes[0]]] : []).slice(0, lv.lists));
  // how many prices a list has never tells its decision: the length goes with the NOTE (L2: three prices with 10 €,
  // four with 20 €), and each note takes both decisions. (Three prices that 20 € do not cover need three of the dearest
  // things in the shop: 1 list in 20000 tries, measured 2026-11-26.)
  const lenOf = (note) => (lv.prices[0] === lv.prices[1] ? lv.prices[0] : note === Math.min(...lv.notes) ? lv.prices[0] : lv.prices[1]);
  const lists = kinds.map(([enough, note]) => list([enough, note, lenOf(note)]));
  // a receipt's verdict and its length drawn first, each on its own: neither the share of right receipts nor a
  // receipt's length follows from what a wrong receipt needs (a price of 3,50 € or more to forget or count twice)
  const receipt = () => {
    const right = rng.next() < 0.5, n = rint(rng, 3, 4);
    for (let k = 0; k < 20000; k++) {
      const its = shuffle(rng, B.SHOP).slice(0, n), ps = its.map(price);
      const T0 = ps.reduce((s, c) => s + c, 0), E = ps.reduce((s, c) => s + roundEur(c), 0);
      let printed = T0, slip = null;
      if (!right) { const i = rint(rng, 0, n - 1); if (ps[i] < 350) continue; slip = rng.next() < 0.5 ? 'forgot' : 'twice'; printed = slip === 'forgot' ? T0 - ps[i] : T0 + ps[i]; }
      const dist = Math.abs(printed - 100 * E);
      if (right ? dist > 150 : dist < 300) continue;
      if (printed > 2500) continue;
      return { items: its.map((it, i) => ({ de: it.de, c: ps[i] })), printed, E, right, slip };
    }
    throw new Error('e2b-ueber: no receipt');
  };
  const receipts = Array.from({ length: lv.receipts }, receipt);
  const cw = Math.floor((W - 12) / 2);
  const listCard = (L, k) => {
    const lines = L.items.map((it, i) => `<div class="dk-row" data-e2b-item="${it.id}" data-e2b-ct="${it.c}" style="gap:5px;justify-content:flex-start">${t(it.de, '', 'font-size:14px;width:86px')}${t(euro(it.c), '', 'font-size:14px;width:50px;text-align:right')}${ansBox(32, 24, roundEur(it.c), `data-e2b-rounded="${i + 1}"`)}${t('€', '', 'font-size:14px')}</div>`).join('');
    const paper = `<div class="e2b-paper" data-dk-box data-e2b-list="${k + 1}" style="width:202px;padding:3px 7px">${row(t(X.list, '', 'font-size:13px;color:' + T.teal) + t('gerundet', '', 'font-size:11px;color:' + T.inkSoft), 6, 'justify-content:space-between')}${lines}</div>`;
    const have = col(t(X.have, '', 'font-size:13px') + art(A.euroNote(L.note, 26), `data-e2b-note="${L.note}"`), 3, 'align-items:center;width:66px');
    const parts = []; L.items.forEach((it, i) => { if (i) parts.push('+'); parts.push({ box: roundEur(it.c), w: 30 }); }); parts.push('=', { box: L.E, w: 36 }, '€');
    const est = row(t(X.est, '', 'font-size:13px;color:' + T.teal) + eq(parts, { bh: 27, fs: 15, gap: 2, attrs: 'data-e2b-est="1"' }), 4, 'justify-content:flex-start');
    return card(col(row(badge(String(k + 1)) + paper + have, 5, 'justify-content:flex-start;align-items:flex-start') + est + oneOf('list-' + (k + 1), [X.enough, X.notEnough], L.enough ? X.enough : X.notEnough, 8, `data-e2b-decide="${k + 1}"`), 6, 'align-items:flex-start;width:100%;justify-content:space-around;height:100%'),
      cw, 'auto', `data-e2b-shop="${k + 1}" data-e2b-total="${L.total}" data-e2b-note="${L.note}"`, 'flex:1 1 0;padding:5px 8px;align-items:stretch');
  };
  const rows = []; for (let k = 0; k < lists.length; k += 2) rows.push(`<div class="dk-row" style="gap:12px;align-items:stretch;flex:1 1 0;min-height:0">${listCard(lists[k], k)}${listCard(lists[k + 1], k + 1)}</div>`);
  // a receipt: the slip, "Mein Überschlag" with its box, and what the Überschlag shows (two receipts: on its own line)
  const one = lv.receipts === 1, rw = one ? W : cw;
  const recCard = (R, k) => {
    const L = String.fromCharCode(65 + k);
    const lines = R.items.map((it) => row(t(it.de, '', 'font-size:13px') + t(euro(it.c), '', 'font-size:13px'), 8, 'justify-content:space-between;width:100%')).join('');
    const paper = `<div class="e2b-paper" data-dk-box data-e2b-receipt="${L}" data-e2b-printed="${R.printed}" style="width:${one ? 230 : 144}px;padding:3px 7px">${t(X.receipt, '', 'font-size:13px;color:' + T.teal)}${lines}<div style="border-top:1.8px solid ${T.ink};margin-top:2px"></div>${row(t(X.total, '', 'font-size:14px') + t(euro(R.printed), '', 'font-size:14px'), 8, 'justify-content:space-between;width:100%')}</div>`;
    const est = col(t('Mein ' + X.est, '', 'font-size:14px') + eq([{ box: R.E, w: 46 }, '€'], { bh: 27, fs: 16, attrs: 'data-e2b-recest="1"' }), 3, 'align-items:flex-start');
    const chips = oneOf('receipt-' + L, [X.can, X.cannot], R.right ? X.can : X.cannot, 6, `data-e2b-recdecide="${L}"`);
    const after = one ? t(X.after, '', 'font-size:13px;color:' + T.teal) : tw(X.after, 118, '', 'font-size:13px;line-height:16px;color:' + T.teal);
    const why = lv.because ? frameLine([X.because, rw - 110], 30) : '';
    const right = one ? col(est + after + chips, 6, 'align-items:flex-start') : col(est + after, 6, 'align-items:flex-start');
    return card(col(row(badge(L) + paper + right, 8, 'justify-content:flex-start;align-items:flex-start') + (one ? '' : chips) + why, 4, 'align-items:flex-start;width:100%'), rw, 'auto', `data-e2b-rec="${L}" data-e2b-right="${R.right ? 1 : 0}" data-e2b-slip="${R.slip || 'none'}"`, 'flex:1 1 0;padding:5px 8px;align-items:stretch');
  };

  const recRow = `<div class="dk-row" style="gap:12px;align-items:stretch">${receipts.map(recCard).join('')}</div>`;
  const rule = white(row(t(X.ruleHead, '', 'font-size:15px;color:' + T.teal) + tw(X.rule, W - 180, '', 'font-size:14px;line-height:17px'), 8, 'justify-content:flex-start;align-items:flex-start'), W, 'auto', 'data-e2b-rule="1"', 'padding:3px 12px;flex-shrink:0;justify-content:flex-start');
  const recRule = tw(X.receiptRule, W - 10, 'data-e2b-recrule="1"', 'font-size:14px;line-height:17px;color:' + T.teal);
  const html = rule + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:9px">${rows.join('')}</div>` + col(recRule + recRow, 3, 'align-items:stretch;flex-shrink:0');
  return { html, meta: { lists: lists.map((L) => `${L.items.map((i) => i.c).join('+')}|${L.note}|E${L.E}|${L.enough ? 'ok' : 'no'}`), receipts: receipts.map((R) => `${R.printed}|E${R.E}|${R.right ? 'ok' : R.slip}`), items: lists.map((L) => L.items.map((i) => i.id).join('+')) } };
};

/* ================================================================ G3-642 / G3-643 — the ONE ratio-table mode */
/**
 * A two-row table (Anzahl / Preis in €) and, for the word problems, arrows between its columns, each with a box for its
 * operator ("· 2", ": 2", ": 3"). Proportional only (every piece costs the same: the instruction says so), so every blank
 * has one value; the arrows always start at the column the problem gives (never between two asked columns, where
 * "+ 3 Hefte" would be a second right label).
 *   preis (G3-642) five price tables continued to 10 pieces and the sentence "Für jede Brezel mehr kommen ☐ € dazu"; the
 *         last table gives one price only (5 Hefte 10 €): first the price of one
 *     L1  1, 2 and 3 pieces given; one piece costs 1-5 €
 *     L2  1 piece and one more given; 2-9 €
 *     L3  two prices given, neither for 1 piece; 2-10 €; the last table gives 4, 5 or 6 pieces
 *   sach  (G3-643) four word problems, each with its table to fill, its arrows and an answer line (five did not fit)
 *     L1  the double, the half and the third; the Anzahl row printed
 *     L2  also two questions on one problem (· 2 and · 3); every cell to fill
 *     L3  also the price of ONE first (: 4, then · 3); numbers to 1000
 */
LOC['e2b-tab-preis'] = 'de'; LOC['e2b-tab-sach'] = 'de';
const TAB_LV = {
  preis: { 1: { tables: 5, unit: [1, 5], given: 'first3', lastN: [5] }, 2: { tables: 5, unit: [2, 9], given: 'one-mid', lastN: [5] }, 3: { tables: 5, unit: [2, 10], given: 'two', lastN: [4, 5, 6] } },
  sach: { 1: { kinds: ['double', 'half', 'third'], fill: 'count', big: 0 }, 2: { kinds: ['half', 'third', 'two'], fill: 'none', big: 1 }, 3: { kinds: ['two', 'unit', 'third'], fill: 'none', big: 2 } },
};
const TAB_CW = 50, TAB_HW = 88, SACH_CW = 64;
/** the table: counts and prices, each a number (printed) or { box }; cw = the width of a column */
function ratioTable(counts, prices, attrs = '', cw = TAB_CW) {
  const cell = (v, wd, hd) => `<div class="${hd ? 'e2b-th' : 'e2b-cell'}" style="width:${wd}px;height:31px">${v}</div>`;
  const val = (v, kind, i) => (v && typeof v === 'object' ? ansBox(cw - 12, 25, v.box, `data-e2b-cellbox="${kind}${i}"`) : big(String(v), `data-e2b-cellval="${kind}${i}"`, 'font-size:18px;line-height:22px'));
  const X = B.TEXT.tab;
  return `<div data-dk-box data-e2b-table="1"${attrs ? ' ' + attrs : ''} style="display:flex;flex-direction:column;flex-shrink:0;border:2px solid ${T.teal};border-radius:6px;background:#FFFFFF;width:${TAB_HW + counts.length * cw + 4}px">` +
    `<div class="dk-row" style="gap:0;border-bottom:1.5px solid ${T.teal};justify-content:flex-start">${cell(X.count, TAB_HW, true)}${counts.map((v, i) => cell(val(v, 'n', i), cw, false)).join('')}</div>` +
    `<div class="dk-row" style="gap:0;justify-content:flex-start">${cell(X.price, TAB_HW, true)}${prices.map((v, i) => cell(val(v, 'p', i), cw, false)).join('')}</div></div>`;
}
/**
 * the table with its arrows: arrows = [{ from, to, op, level }] (level 0 a low arc, 1 a high one), each drawn over the
 * Anzahl row AND under the Preis row (the same operator works on both rows), its box beyond the arc's top (never on it).
 */
function arrowTable(counts, prices, arrows, attrs = '') {
  const cw = SACH_CW, hi = arrows.some((a) => a.level), band = hi ? 68 : 42, tw0 = TAB_HW + counts.length * cw + 4, th = 66;
  const cx = (i) => 2 + TAB_HW + i * cw + cw / 2;
  let svg = '', boxes = '';
  for (const a of arrows) {
    const x1 = cx(a.from) + 5, x2 = cx(a.to) - (a.to > a.from ? 5 : -5), mid = (cx(a.from) + cx(a.to)) / 2, peak = a.level ? 38 : 13;
    for (const side of ['top', 'bot']) {
      const y0 = side === 'top' ? band - 3 : band + th + 3, s = side === 'top' ? -1 : 1, ctrlY = y0 + 2 * s * peak;
      svg += `<path d="M${f1(x1)} ${y0} Q${f1(mid)} ${f1(ctrlY)} ${f1(x2)} ${y0}" fill="none" stroke="${T.coral}" stroke-width="2" data-e2b-arc="${a.from}-${a.to}-${side}"/>`;
      const ang = Math.atan2(y0 - ctrlY, x2 - mid);
      svg += `<path d="M${f1(x2 - 8 * Math.cos(ang - 0.45))} ${f1(y0 - 8 * Math.sin(ang - 0.45))} L${f1(x2)} ${y0} L${f1(x2 - 8 * Math.cos(ang + 0.45))} ${f1(y0 - 8 * Math.sin(ang + 0.45))}" fill="none" stroke="${T.coral}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
      const top = side === 'top' ? y0 - peak - 25 : y0 + peak + 2;
      boxes += `<div style="position:absolute;left:${Math.round(mid - 19)}px;top:${Math.round(top)}px">${ansBox(38, 23, a.op, `data-e2b-op="${a.from}-${a.to}-${side}"`)}</div>`;
    }
  }
  const H = band + th + band;
  return `<div data-dk-box data-e2b-arrowtable="1"${attrs ? ' ' + attrs : ''} style="position:relative;flex-shrink:0;width:${tw0}px;height:${H}px">` +
    `<div style="position:absolute;left:0;top:0;line-height:0">${A.artSvg(svg, tw0, H, 'data-e2b-arcs="1"')}</div>` +
    `<div style="position:absolute;left:0;top:${band}px">${ratioTable(counts, prices, '', cw)}</div>${boxes}</div>`;
}

const pieceForm = (it, n) => (n === 1 ? `1 ${it.sg}` : `${n} ${it.pl}`);
const costs = (n) => (n === 1 ? 'kostet' : 'kosten');
/** one word problem of a kind: the text, the table's columns, the arrows, the key sentence */
function sachProblem(kind, it, rng) {
  for (let k = 0; k < 5000; k++) {
    const u = rint(rng, it.eur[0], it.eur[1]);
    let n, cols, arrows, q;
    if (kind === 'double') { n = rint(rng, 2, 5); cols = [n, 2 * n]; arrows = [{ from: 0, to: 1, op: `${MAL} 2`, level: 0 }]; }
    else if (kind === 'half') { n = 2 * rint(rng, 2, 5); cols = [n, n / 2]; arrows = [{ from: 0, to: 1, op: ': 2', level: 0 }]; }
    else if (kind === 'third') { n = rng.pick([6, 9]); cols = [n, n / 3]; arrows = [{ from: 0, to: 1, op: ': 3', level: 0 }]; }
    else if (kind === 'two') { n = rint(rng, 2, 3); cols = [n, 2 * n, 3 * n]; arrows = [{ from: 0, to: 1, op: `${MAL} 2`, level: 0 }, { from: 0, to: 2, op: `${MAL} 3`, level: 1 }]; }
    else { n = rint(rng, 3, 5); const m = rint(rng, 2, 6); if (m === n) continue; cols = [n, 1, m]; arrows = [{ from: 0, to: 1, op: `: ${n}`, level: 0 }, { from: 1, to: 2, op: `${MAL} ${m}`, level: 0 }]; }
    const prices = cols.map((c) => c * u);
    if (Math.max(...prices) > 1000) continue;
    const asks = cols.slice(1).map((c) => (c === 1 ? `Wie viel kostet 1 ${it.sg}?` : `Wie viel kosten ${c} ${it.pl}?`)).join(' ');
    const text = `${pieceForm(it, n)} ${costs(n)} ${prices[0]} €. ${asks}`;
    const key = cols.slice(1).map((c, i) => `${pieceForm(it, c)} ${costs(c)} ${prices[i + 1]} €.`).join(' ');
    return { kind, it: it.id, u, cols, prices, arrows, text, key };
  }
  throw new Error('e2b-tab: no ' + kind + ' problem for ' + it.id);
}
function tabMode(kind) {
  return (d, rng) => {
    const X = B.TEXT.tab;
    if (kind === 'preis') {
      const lv = TAB_LV.preis[d.level];
      const items = shuffle(rng, B.PIECES.filter((it) => it.eur[1] >= lv.unit[0] && it.eur[0] <= lv.unit[1])).slice(0, lv.tables);
      if (items.length < lv.tables) throw new Error('e2b-tab: too few pieces');
      const usedU = new Set();
      const tables = items.map((it, k) => {
        const lo = Math.max(lv.unit[0], it.eur[0]), hi = Math.min(lv.unit[1], it.eur[1]);
        let u; for (let tries = 0; ; tries++) { u = rint(rng, lo, hi); if (!usedU.has(u) || tries > 30) break; } usedU.add(u);
        const last = k === lv.tables - 1;
        let given;
        if (last) given = [rng.pick(lv.lastN)];
        else if (lv.given === 'first3') given = [1, 2, 3];
        else if (lv.given === 'one-mid') given = [1, rint(rng, 4, 7)];
        else given = [rint(rng, 2, 4), rint(rng, 6, 9)];
        return { it, u, given, last };
      });
      const html = tables.map((tb, k) => {
        const counts = Array.from({ length: 10 }, (_, i) => i + 1);
        const prices = counts.map((n) => (tb.given.includes(n) ? n * tb.u : { box: n * tb.u }));
        const each = X.each[tb.it.g].replace('{sg}', tb.it.sg);
        const one = tb.last ? row(t(X.one[tb.it.g].replace('{sg}', tb.it.sg), '', 'font-size:15px') + ansBox(44, 26, tb.u, 'data-e2b-one="1"') + t('€.', '', 'font-size:15px'), 5, 'justify-content:flex-start') : '';
        return card(col(row(badge(String(k + 1)) + head(tb.it.pl, '', 'font-size:16px') + one, 12, 'justify-content:flex-start') + ratioTable(counts, prices, `data-e2b-unit="${tb.u}" data-e2b-given="${tb.given.join(',')}"`) +
          row(t(each, '', 'font-size:15px') + ansBox(44, 26, tb.u, 'data-e2b-each="1"') + t(X.eachTail, '', 'font-size:15px'), 5, 'justify-content:flex-start'), 4, 'align-items:flex-start'),
        W, 'auto', `data-e2b-pricetable="${k + 1}" data-e2b-item="${tb.it.id}" data-e2b-last="${tb.last ? 1 : 0}"`, 'padding:4px 12px;flex:1 1 auto;justify-content:center');
      }).join('');
      return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${html}</div>`, meta: { tables: tables.map((tb) => `${tb.it.id}:${tb.u}@${tb.given.join(',')}`), items: tables.map((tb) => tb.it.id) } };
    }
    const lv = TAB_LV.sach[d.level];
    // the pieces: small things, and (lv.big of the five) big ones with prices to 1000
    const bigIdx = new Set(shuffle(rng, lv.kinds.map((_, i) => i)).slice(0, lv.big));
    const smallPool = shuffle(rng, B.PIECES), bigPool = shuffle(rng, B.BIG_PIECES);
    const probs = lv.kinds.map((kd, i) => sachProblem(kd, bigIdx.has(i) ? bigPool.pop() : smallPool.pop(), rng));
    const order = shuffle(rng, probs.map((_, i) => i));
    const html = order.map((i, k) => {
      const p = probs[i];
      const counts = p.cols.slice();
      const prices = p.prices.map((v, j) => (j === 0 && lv.fill === 'count' ? v : { box: v }));
      const left = row(badge(String(k + 1)) + tw(p.text, 300, 'data-e2b-text="1"', 'font-size:15px;line-height:19px'), 8, 'justify-content:flex-start;align-items:flex-start');
      // one full-width writing line for every question (an answer sentence of 20-26 characters is ~ 11 cm in Klasse-3 hand)
      const lineW = W - 24 - 82;
      // line 2 keeps the label's place (the label is there, hidden), so both lines start and end together
      const lines = Array.from({ length: p.cols.length - 1 }, (_, q) => `<div data-e2b-ansline="${q + 1}" style="width:100%">${q ? frameLine([X.answer, lineW], 30).replace('<span class="g1-text" data-dk-box style="', '<span class="g1-text" data-dk-box aria-hidden="true" style="visibility:hidden;') : frameLine([X.answer, lineW], 30)}</div>`).join('');
      return card(col(row(left + arrowTable(counts, prices, p.arrows, `data-e2b-kind="${p.kind}"`), 12, 'justify-content:space-between;width:100%;align-items:center') + lines, 2, 'align-items:stretch;width:100%'),
        W, 'auto', `data-e2b-problem="${k + 1}" data-e2b-key="${esc(p.key)}" data-e2b-unitprice="${p.u}"`, 'padding:2px 12px;flex:1 1 auto');
    }).join('');
    return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:7px">${html}</div>`, meta: { problems: order.map((i) => `${probs[i].kind}:${probs[i].it}:${probs[i].cols.join('/')}@${probs[i].u}`), items: order.map((i) => probs[i].it) } };
  };
}
MODES['e2b-tab-preis'] = tabMode('preis');
MODES['e2b-tab-sach'] = tabMode('sach');

/* ================================================================ G3-644 — Mit dem Zirkel zeichnen (REAL SIZE) */
LOC['e2b-zirkel'] = 'de';
/**
 * Everything is at its REAL size: the child's circles get a centre M with room for the circle (the region round it is
 * free of all print), the size printed as a radius or as a diameter (said which); the target's three radii; the flower's
 * middle circle and the circles begun (each centred on the middle circle, 60 degrees apart, all of one radius), and a small
 * model drawn true. No key value beyond the radius (the drawing is the child's).
 *   L1  three circles by their radius; the target's 2-cm circle drawn; the flower with three circles and its six centres
 *       marked
 *   L2  two by the radius, one by the diameter; the flower with two circles, no centres marked
 *   L3  two by the diameter, one by the radius; the flower's middle circle and one point on it only
 */
const ZIRKEL_LV = {
  1: { set: [['r', 2], ['r', 3], ['r', 2]], targetStart: true, flowerDrawn: 3, marks: true },
  2: { set: [['r', 3], ['d', 4], ['r', 2]], targetStart: false, flowerDrawn: 2, marks: false },
  3: { set: [['d', 6], ['d', 4], ['r', 2]], targetStart: false, flowerDrawn: 1, marks: false },
};
const FLOWER_R = 15, MODEL_R = 4;   // mm (review round 1: a 12-mm flower was too small for a Klasse-3 compass; the model shrinks to make room)
MODES['e2b-zirkel'] = (d, rng) => {
  const lv = ZIRKEL_LV[d.level], X = B.TEXT.zirkel, P = A.PX_MM;
  // section 1: the three circles in a drawn order; each region 2r + 9 mm wide, the centres on one line
  const set = shuffle(rng, lv.set).map(([k, v]) => ({ kind: k, v, r: k === 'd' ? v / 2 : v }));
  const rmax = Math.max(...set.map((s) => s.r));
  const regW = set.map((s) => (2 * s.r * 10 + 9) * P), w1 = regW.reduce((a, b) => a + b, 0), h1 = (2 * rmax * 10 + 4) * P + 18;
  let b1 = '', x = 0;
  const cy1 = (rmax * 10 + 2) * P;
  set.forEach((s, i) => {
    const cx = x + regW[i] / 2;
    b1 += `<rect x="${(x + 2).toFixed(2)}" y="1" width="${(regW[i] - 4).toFixed(2)}" height="${(h1 - 20).toFixed(2)}" rx="8" fill="none" stroke="${T.grid}" stroke-width="1.2" stroke-dasharray="5 4" data-e2b-region="${i}"/>` +
      A.centreMark(cx, cy1) + A.text(cx, h1 - 6, `${s.kind === 'r' ? X.radius : X.diameter} ${s.v} cm`, 15, { attrs: `data-e2b-size="${s.kind}${s.v}"` });
    x += regW[i];
  });
  const sec1 = art(A.artSvg(b1, w1, h1, `data-e2b-art="circles" data-e2b-set="${set.map((s) => s.kind + s.v).join(',')}"`), 'data-e2b-circlesbox="1"');
  // section 2: the target (radii 2, 3 and 4 cm round one M)
  const tw0 = (80 + 2) * P, tc = tw0 / 2;   // the 8-cm target with 1 mm round it (the card gives more)
  const sec2 = art(A.artSvg(A.centreMark(tc, tc) + (lv.targetStart ? A.realCircle(tc, tc, 20, 'circle', 'data-e2b-targetstart="1"') : ''), tw0, tw0, 'data-e2b-art="target"'), 'data-e2b-targetbox="1"');
  // section 3: the model (small, true) and the flower begun
  const fr = FLOWER_R * P, fw = (4 * FLOWER_R + 8) * P, fh = ((2 + 2 * Math.sin(Math.PI / 3)) * FLOWER_R + 8) * P, fcx = fw / 2, fcy = fh / 2;
  const cs = A.flowerCentres(fcx, fcy, fr);
  const startK = rint(rng, 0, 5);
  const drawnOuter = Array.from({ length: lv.flowerDrawn - 1 }, (_, i) => (startK + i) % 6);
  let bf = A.realCircle(fcx, fcy, FLOWER_R, 'circle', 'data-e2b-flower="0"');
  drawnOuter.forEach((k) => { bf += A.realCircle(cs[k + 1][0], cs[k + 1][1], FLOWER_R, 'circle', `data-e2b-flower="${k + 1}"`); });
  if (lv.marks) cs.slice(1).forEach(([px, py], k) => { bf += `<circle cx="${px.toFixed(2)}" cy="${py.toFixed(2)}" r="2.4" fill="${A.REAL_INK.centre}" data-e2b-flowermark="${k + 1}"/>`; });
  else bf += `<circle cx="${cs[startK + 1][0].toFixed(2)}" cy="${cs[startK + 1][1].toFixed(2)}" r="2.4" fill="${A.REAL_INK.centre}" data-e2b-flowermark="${startK + 1}"/>`;
  bf += `<circle cx="${fcx.toFixed(2)}" cy="${fcy.toFixed(2)}" r="2.4" fill="${A.REAL_INK.centre}" data-e2b-flowermid="1"/>`;
  const flower = art(A.artSvg(bf, fw, fh, `data-e2b-art="flower" data-e2b-r="${FLOWER_R}" data-e2b-drawn="${lv.flowerDrawn}"`), 'data-e2b-flowerbox="1"');
  const mr = MODEL_R * P, mw = (4 * MODEL_R + 3) * P, mh = ((2 + 2 * Math.sin(Math.PI / 3)) * MODEL_R + 3) * P;
  const mcs = A.flowerCentres(mw / 2, mh / 2, mr);
  const model = art(A.artSvg(mcs.map(([px, py], k) => A.realCircle(px, py, MODEL_R, 'model', `data-e2b-model="${k}"`)).join(''), mw, mh, `data-e2b-art="flower-model" data-e2b-r="${MODEL_R}"`), 'data-e2b-modelbox="1"');
  const cardS = (inner, w, attrs, style = '') => card(inner, w, 'auto', attrs, 'padding:4px 10px;align-items:stretch;' + style);
  const html = cardS(col(head(X.circles, '', 'font-size:16px') + row(sec1, 0, 'justify-content:center;width:100%'), 2, 'align-items:flex-start;width:100%'), W, 'data-e2b-sec="circles"', 'flex-shrink:0') +
    `<div class="dk-row" style="gap:10px;align-items:stretch;justify-content:space-between">` +
    cardS(col(tw(X.target, Math.round(tw0) - 4, '', 'font-size:14px;line-height:17px;color:' + T.teal) + t(`${X.radii}`, 'data-e2b-radii="2,3,4"', 'font-size:15px') + sec2, 2, 'align-items:center'), Math.round(tw0) + 20, 'data-e2b-sec="target"') +
    cardS(col(head(X.flower, '', 'font-size:16px') + row(tw(X.flowerHint, W - Math.round(tw0) - 160, '', 'font-size:13px;line-height:16px') + col(t(X.model, '', 'font-size:12px;line-height:14px;color:' + T.inkSoft) + model, 2, 'align-items:center'), 8, 'justify-content:space-between;width:100%;align-items:flex-start') + flower, 3, 'align-items:center;width:100%'), W - Math.round(tw0) - 30, 'data-e2b-sec="flower"') + '</div>';
  return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:6px">${html}</div>`, meta: { set: set.map((s) => s.kind + s.v), flowerStart: startK, items: set.map((s) => s.kind + s.v) } };
};

/* ================================================================ G3-645 — Diagramme genau lesen */
LOC['e2b-dia'] = 'de';
/**
 * Statements about ONE survey, each decided by the chart alone (stimmt / stimmt nicht / kann man nicht ablesen), two of
 * each on every page: values distinct (no tie behind "die meisten"), "mehr" never between equal values, a wrong number
 * 5 off (one step), a "doppelt so viele" exactly double or clearly not, and the third kind names what no chart of
 * favourite sports shows (girls and boys, a name, a club, the fastest runners, every day, next year).
 *   L1  a picture chart, one picture for 5 children (said on the page)
 *   L2  the same data twice: a bar chart from 0 in fives and one whose scale starts at 10; why the bars look so different
 *   L3  a bar chart from 0 in tens (some bars end between two lines) and one starting at 20 in fives; the same question
 */
const DIA_LV = {
  1: { charts: 'picture', cats: 4, vals: [5, 35], step: 5, why: false },
  2: { charts: 'two', cats: 4, vals: [15, 40], step: 5, y0b: 10, y1: 40, stepA: 5, stepB: 5, why: true },
  3: { charts: 'two', cats: 4, vals: [25, 60], step: 5, y0b: 20, y1: 60, stepA: 10, stepB: 5, why: true },
};
/** what "Unser Lieblingssport" never shows (no age or class: a Klasse-3 child could answer those from its own class) */
const CANT = ['Mehr Mädchen als Jungen mögen {A}.', 'Lena mag {A} am liebsten.', 'Nächstes Jahr mögen mehr Kinder {A}.', 'Die Kinder, die {A} mögen, spielen in einem Verein.', 'Die Kinder treiben jeden Tag Sport.', 'Die Kinder, die {A} mögen, sind die schnellsten Läufer.'];
function diaStatements(cats, vals, rng) {
  const n = cats.length, idx = [...Array(n).keys()];
  const maxI = vals.indexOf(Math.max(...vals)), minI = vals.indexOf(Math.min(...vals));
  /** one statement of a kind that is true (or false) for these data, or null */
  const make = (kind, truth) => {
    for (let t = 0; t < 40; t++) {
      const [i, j] = shuffle(rng, idx);
      const X = cats[i], Y = cats[j], vx = vals[i], vy = vals[j];
      if (kind === 'most') { if (truth) return { kind, truth, s: `Die meisten Kinder mögen ${cats[maxI]}.` }; const o = idx.filter((k) => k !== maxI); return { kind, truth, s: `Die meisten Kinder mögen ${cats[rng.pick(o)]}.` }; }
      if (kind === 'least') { if (truth) return { kind, truth, s: `Die wenigsten Kinder mögen ${cats[minI]}.` }; const o = idx.filter((k) => k !== minI); return { kind, truth, s: `Die wenigsten Kinder mögen ${cats[rng.pick(o)]}.` }; }
      if (kind === 'exact') { const v = truth ? vx : vx + rng.pick([-5, 5]); if (v <= 0 || (!truth && vals.includes(v))) continue; return { kind, truth, s: `Genau ${v} Kinder mögen ${X}.` }; }
      if (kind === 'more') { if (vx === vy) continue; const big = vx > vy === truth ? [X, Y] : [Y, X]; return { kind, truth, s: `Mehr Kinder mögen ${big[0]} als ${big[1]}.` }; }
      if (kind === 'double') {
        const pairs = []; for (const a of idx) for (const c of idx) if (a !== c && (truth ? vals[a] === 2 * vals[c] : vals[a] > vals[c] && vals[a] !== 2 * vals[c] && Math.abs(vals[a] - 2 * vals[c]) >= 5)) pairs.push([a, c]);
        if (!pairs.length) return null;
        const [a, c] = rng.pick(pairs);
        return { kind, truth, s: `Doppelt so viele Kinder mögen ${cats[a]} wie ${cats[c]}.` };
      }
      if (kind === 'diff') { if (vx <= vy) continue; const dd = truth ? vx - vy : vx - vy + rng.pick([-5, 5]); if (dd <= 0) continue; return { kind, truth, s: `${X} mögen ${dd} Kinder mehr als ${Y}.` }; }
    }
    return null;
  };
  // only kinds these data can make BOTH true and false, and the two "stimmt" and two "stimmt nicht" dealt to them at
  // random: a kind never tells its answer ("Genau …" was true on 72 % of the pages, "Doppelt so viele" on 22 %, before)
  const kindsOk = ['most', 'least', 'exact', 'more', 'double', 'diff'].filter((k) => make(k, true) && make(k, false));
  if (kindsOk.length < 4) throw new Error('e2b-dia: too few kinds for these data');
  for (let k = 0; k < 400; k++) {
    // four different kinds: two statements of one kind (two 'die meisten') would let one decide the other
    const kinds = shuffle(rng, kindsOk).slice(0, 4), truths = shuffle(rng, [true, true, false, false]);
    const st = kinds.map((kd, q) => make(kd, truths[q]));
    if (st.some((x) => !x) || new Set(st.map((x) => x.s)).size !== 4) continue;
    const cant = shuffle(rng, CANT).slice(0, 2).map((s) => ({ kind: 'cant', truth: null, s: s.replace('{A}', rng.pick(cats)) }));
    return shuffle(rng, st.concat(cant));
  }
  throw new Error('e2b-dia: no statements');
}
MODES['e2b-dia'] = (d, rng) => {
  const lv = DIA_LV[d.level], X = B.TEXT.dia;
  let cats, vals, st;
  for (let k = 0; ; k++) {
    if (k > 500) throw new Error('e2b-dia: no data');
    cats = shuffle(rng, B.SPORTS).slice(0, lv.cats);
    const pool = shuffle(rng, Array.from({ length: (lv.vals[1] - lv.vals[0]) / lv.step + 1 }, (_, i) => lv.vals[0] + i * lv.step));
    vals = pool.slice(0, lv.cats);
    if (lv.charts === 'two' && lv.stepA === 10 && vals.filter((v) => v % 10).length < 2) continue;   // L3: some bars end between two lines
    try { st = diaStatements(cats, vals, rng); break; } catch (e) { /* draw again */ }
  }
  let charts;
  if (lv.charts === 'picture') {
    charts = white(col(row(head(X.title, '', 'font-size:16px') + t(X.key.replace('{N}', '5'), 'data-e2b-chartkey="5"', 'font-size:15px;color:' + T.coral), 16, 'justify-content:space-between;width:100%') + art(A.pictureChart({ cats, values: vals, per: 5, w: 600, rowH: 34, s: 26 }), 'data-e2b-chart="picture"') + col(t(X.read, '', 'font-size:15px;color:' + T.teal) + row(cats.map((c, i) => row(t(c + ':', '', 'font-size:15px') + ansBox(44, 28, vals[i], `data-e2b-read="${i}"`) + t(X.axis, '', 'font-size:14px'), 4, 'justify-content:flex-start')).join(''), 10, 'justify-content:space-between;width:100%;flex-wrap:wrap'), 3, 'align-items:flex-start;width:100%'), 6, 'align-items:flex-start;width:100%'), W, 'auto', 'data-e2b-charts="1"', 'padding:5px 14px;flex-shrink:0');
  } else {
    const cw = Math.floor((W - 12) / 2);
    const one = (lab, y0, step, which) => card(col(head(`${lab}: ${X.title}`, '', 'font-size:15px') + art(A.barChart({ cats, values: vals, y0, y1: lv.y1, step, w: cw - 20, h: lv.cats > 4 ? 196 : 184 }), `data-e2b-chart="${which}"`), 2, 'align-items:flex-start'), cw, 'auto', '', 'padding:4px 8px');
    charts = col(t(X.same, '', 'font-size:14px;color:' + T.teal) + `<div class="dk-row" style="gap:12px;align-items:stretch">${one(X.chart1, 0, lv.stepA, 'a')}${one(X.chart2, lv.y0b, lv.stepB, 'b')}</div>`, 2, 'align-items:flex-start;flex-shrink:0');
  }
  const opts = [X.yes, X.no, X.cant];
  const rows = st.map((s, k) => row(badge(String(k + 1)) + tw(s.s, 300, `data-e2b-statement="${s.kind}"`, 'font-size:15px;line-height:18px') + oneOf('s' + (k + 1), opts, s.truth === true ? X.yes : s.truth === false ? X.no : X.cant, 6, `data-e2b-judge="${k + 1}"`), 8, 'justify-content:flex-start;width:100%')).join('');
  const why = lv.why ? col(t(X.why, '', 'font-size:15px;color:' + T.teal) + lineBox(W - 30, 32) + lineBox(W - 30, 32), 2, 'align-items:flex-start') : '';
  const html = charts + card(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px;width:100%;height:100%">${rows}</div>`, W, 'auto', 'data-e2b-statements="1"', 'padding:6px 12px;flex:1 1 auto;align-items:stretch') + (why ? white(why, W, 'auto', 'data-e2b-why="1"', 'padding:3px 12px;flex-shrink:0') : '');
  return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${html}</div>`, meta: { cats, vals, statements: st.map((s) => `${s.truth === null ? 'cant' : s.truth ? 'yes' : 'no'}:${s.s}`), items: cats } };
};

/* ================================================================ G3-646 — Alle Möglichkeiten finden */
LOC['e2b-kombi'] = 'de';
/**
 * Small sets only (2 x 3, 3 x 3, 2 x 2 x 2, three children in a row): the table and the tree have ONE place for every
 * possibility (each listed once), so the count has one value; the Malaufgabe takes its two factors in either order (the
 * key says so); what the child draws or writes in a cell is its own.
 *   L1  a table of 3 T-shirts and 2 trousers (one cell done as an example) with the Malaufgabe; a table of words 2 x 3; a
 *       tree 2 x 2 x 2 with every branch drawn and the first one written
 *   L2  a table 3 x 3 (one cell done); an ordered list 2 x 3 begun; the tree as in L1
 *   L3  a table 3 x 3 (no example); a tree 2 x 2 x 2 with its first branch only; three children in a row (a tree begun)
 */
const KOMBI_LV = {
  1: { shirts: 3, pants: 2, example: true, second: 'words', tree: 'full', kids: false },
  2: { shirts: 3, pants: 3, example: true, second: 'list', tree: 'full', kids: false },
  3: { shirts: 3, pants: 3, example: false, second: 'tree', tree: 'branch', kids: true },
};
const NAMES_K = ['Ole', 'Lea', 'Finn', 'Mia', 'Can', 'Ida', 'Paul', 'Elif'];
/** a tree drawn left to right: levels = [[a, b], [c, d], [e, f]] (or the row of children); labels printed on the nodes of
 *  the first branch (path 0 ... 0), the other nodes empty boxes (mode 'full') or not drawn (mode 'branch': only the first
 *  node of each level and its children are drawn) */
function treeArt(levels, mode, { lw = 92, lh = 18, gap = 2 } = {}) {
  // leaves: product of the level sizes; each node's y = the middle of its leaves
  const sizes = levels.map((l) => l.length), leaves = sizes.reduce((a, b) => a * b, 1);
  const colX = (lvl) => 14 + lvl * (lw + 26), H = leaves * (lh + gap) + 2;
  let s = `<circle cx="6" cy="${H / 2}" r="4" fill="${T.teal}" data-e2b-root="1"/>`;
  const draw = (lvl, path, y0, y1, px, py) => {
    if (lvl === levels.length) return;
    const n = sizes[lvl], span = (y1 - y0) / n;
    for (let i = 0; i < n; i++) {
      const p = path.concat(i), first = p.every((x) => x === 0);
      if (mode === 'branch' && !p.slice(0, -1).every((x) => x === 0)) continue;
      const cy = y0 + span * (i + 0.5), x = colX(lvl);
      s += `<line x1="${px}" y1="${py.toFixed(1)}" x2="${x}" y2="${cy.toFixed(1)}" stroke="${T.ink}" stroke-width="1.5" data-e2b-edge="${p.join('')}"/>`;
      s += `<rect x="${x}" y="${(cy - lh / 2).toFixed(1)}" width="${lw}" height="${lh}" rx="5" fill="${T.white}" stroke="${first ? T.teal : T.coral}" stroke-width="1.6" ${first ? '' : 'stroke-dasharray="4 3" '}data-e2b-node="${p.join('')}"/>`;
      if (first) s += A.text(x + lw / 2, cy, levels[lvl][i], 12, { font: "'Nunito'", weight: 800, attrs: `data-e2b-nodelabel="${p.join('')}"` });
      draw(lvl + 1, p, y0 + span * i, y0 + span * (i + 1), x + lw, cy);
    }
  };
  draw(0, [], 0, H, 10, H / 2);
  // a tree to finish: an empty dot where each of the other leaves ends (review round 1: the eight-leaf height is shown)
  if (mode === 'branch') {
    const xl = colX(levels.length - 1), span = H / leaves;
    for (let k = 0; k < leaves; k++) { const cy = span * (k + 0.5); if (cy < span * sizes[levels.length - 1]) continue; s += `<circle cx="${xl + 6}" cy="${cy.toFixed(1)}" r="3.2" fill="${T.white}" stroke="${T.coral}" stroke-width="1.4" data-e2b-leafdot="${k}"/>`; }
  }
  return A.artSvg(s, colX(levels.length - 1) + lw + 2, H, `data-e2b-art="tree" data-e2b-leaves="${leaves}" data-e2b-mode="${mode}"`);
}
MODES['e2b-kombi'] = (d, rng) => {
  const lv = KOMBI_LV[d.level], X = B.TEXT.kombi;
  const name = rng.pick(NAMES_K);
  const cols = shuffle(rng, B.COLOURS);
  const shirts = cols.slice(0, lv.shirts), pants = shuffle(rng, B.COLOURS).slice(0, lv.pants);
  const n1 = lv.shirts * lv.pants;
  const countRow = (n, attrs, mal = null) => row(t(X.count, '', 'font-size:15px') + ansBox(46, 28, n, attrs) + t(X.countTail, '', 'font-size:15px') +
    (mal ? row(t(X.mal, '', 'font-size:15px;margin-left:10px') + eq([{ box: mal[0], w: 38, attrs: `data-e2b-alt="${mal[1]}"` }, MAL, { box: mal[1], w: 38, attrs: `data-e2b-alt="${mal[0]}"` }, '=', { box: n, w: 46 }], { bh: 28, fs: 17, attrs: 'data-e2b-mal="1"' }), 6, 'justify-content:flex-start') : ''), 6, 'justify-content:flex-start');
  // task 1: the clothes table
  const cellW = 74, cellH = 52, headW = 86;
  const shirtHead = (c) => row(art(A.tshirt(A.clothFill(c.id), 30)) + t(c.w, '', 'font-size:13px'), 3, 'justify-content:flex-start');
  const pantHead = (c) => col(art(A.trousers(A.clothFill(c.id), 18)) + t(c.w, '', 'font-size:13px'), 1);
  const cellBox = (i, j) => `<div class="e2b-cell" style="width:${cellW}px;height:${cellH}px;border-bottom:1.5px solid ${T.grid}" data-e2b-combo="${i}-${j}">` +
    (lv.example && i === 0 && j === 0 ? row(art(A.tshirt(A.clothFill(shirts[0].id), 26)) + art(A.trousers(A.clothFill(pants[0].id), 15)), 2) : row(art(A.tshirt(T.white, 26)) + art(A.trousers(T.white, 15)), 2)) + '</div>';
  const table = `<div data-dk-box data-e2b-ctable="1" data-e2b-rows="${lv.shirts}" data-e2b-cols="${lv.pants}" style="display:flex;flex-direction:column;flex-shrink:0;border:2px solid ${T.teal};border-radius:6px;background:#FFFFFF">` +
    `<div class="dk-row" style="gap:0;justify-content:flex-start;border-bottom:1.5px solid ${T.teal}"><div class="e2b-th" style="width:${headW}px;height:46px">${esc(X.tshirts)}</div>${pants.map((c) => `<div class="e2b-th" style="width:${cellW}px;height:46px">${pantHead(c)}</div>`).join('')}</div>` +
    shirts.map((c, i) => `<div class="dk-row" style="gap:0;justify-content:flex-start"><div class="e2b-th" style="width:${headW}px;height:${cellH}px;border-bottom:1.5px solid ${T.grid}">${shirtHead(c)}</div>${pants.map((_, j) => cellBox(i, j)).join('')}</div>`).join('') + '</div>';
  const task1Text = X.tableTask.replace('{N}', name).replace('{T}', String(lv.shirts)).replace('{H}', String(lv.pants));
  const task1 = card(row(badge('1') + table + col(tw(task1Text + ' ' + X.paint, 270, 'data-e2b-tasktext="1"', 'font-size:15px;line-height:19px') + countRow(n1, 'data-e2b-count="1"', [lv.shirts, lv.pants]).replace('class="dk-row"', 'class="dk-row" style="flex-wrap:wrap;width:280px"'), 8, 'align-items:flex-start'), 14, 'justify-content:flex-start;align-items:flex-start'),
    W, 'auto', 'data-e2b-task="1" data-e2b-kind="table"', 'padding:5px 12px;flex-shrink:0');
  const parts = [task1];
  const items = [`${lv.shirts}x${lv.pants}`];
  // task 2 (L1 a table of words, L2 an ordered list, L3 the tree begun)
  const tree = rng.pick(B.TREES);
  if (lv.second === 'words') {
    const wt = rng.pick(B.WORD_TABLES), rws = wt.rows.slice(0, 2), cls = wt.cols;
    const wtab = `<div data-dk-box data-e2b-wtable="1" data-e2b-rows="${rws.length}" data-e2b-cols="${cls.length}" style="display:flex;flex-direction:column;flex-shrink:0;border:2px solid ${T.teal};border-radius:6px;background:#FFFFFF">` +
      `<div class="dk-row" style="gap:0;justify-content:flex-start;border-bottom:1.5px solid ${T.teal}"><div class="e2b-th" style="width:96px;height:28px">${esc(wt.rowsHead)}</div>${cls.map((c) => `<div class="e2b-th" style="width:104px;height:28px">${esc(c)}</div>`).join('')}</div>` +
      rws.map((r) => `<div class="dk-row" style="gap:0;justify-content:flex-start"><div class="e2b-th" style="width:96px;height:32px;border-bottom:1.5px solid ${T.grid}">${esc(r)}</div>${cls.map((c, j) => `<div class="e2b-cell" style="width:104px;height:32px;border-bottom:1.5px solid ${T.grid}" data-e2b-wcell="${j}"></div>`).join('')}</div>`).join('') + '</div>';
    const q = wt.q.replace('Brötchen gibt', 'Brötchen (hell oder dunkel) gibt');
    parts.push(card(col(row(badge('2') + tw(q + ' Schreibe in jedes Feld, was es ist.', W - 60, 'data-e2b-tasktext="2"', 'font-size:15px;line-height:19px'), 8, 'justify-content:flex-start;align-items:flex-start') + row(wtab + countRow(rws.length * cls.length, 'data-e2b-count="2"'), 18, 'justify-content:flex-start'), 5, 'align-items:flex-start'),
      W, 'auto', 'data-e2b-task="2" data-e2b-kind="words"', 'padding:5px 12px;flex-shrink:0'));
    items.push(`${rws.length}x${cls.length}`);
  } else if (lv.second === 'list') {
    const outer = ['Waffel', 'Becher'], inner = shuffle(rng, ['Erdbeere', 'Schoko', 'Vanille', 'Zitrone']).slice(0, 3);
    const all = []; for (const o of outer) for (const i of inner) all.push(`${o} mit ${i}`);
    const lines = all.map((s, k) => (k < 2 ? row(t(`${k + 1}.`, '', 'font-size:15px;width:22px') + t(s, `data-e2b-listdone="${k}"`, 'font-size:15px'), 4, 'justify-content:flex-start;width:300px') : row(t(`${k + 1}.`, '', 'font-size:15px;width:22px') + lineBox(270, 30), 4, 'justify-content:flex-start'))).join('');
    const q = `Es gibt Waffel oder Becher und die Sorten ${inner[0]}, ${inner[1]} oder ${inner[2]}. Jedes Kind nimmt eine Kugel. Schreibe alle Möglichkeiten geordnet auf.`;
    const lineArr = all.map((s0, k) => (k < 2 ? row(t(`${k + 1}.`, '', 'font-size:15px;width:22px') + t(s0, `data-e2b-listdone="${k}"`, 'font-size:15px'), 4, 'justify-content:flex-start;width:250px;height:30px') : row(t(`${k + 1}.`, '', 'font-size:15px;width:22px') + lineBox(220, 30), 4, 'justify-content:flex-start')));
    parts.push(card(col(row(badge('2') + tw(q, W - 60, 'data-e2b-tasktext="2"', 'font-size:15px;line-height:19px'), 8, 'justify-content:flex-start;align-items:flex-start') + row(col(lineArr.slice(0, 3).join(''), 3, 'align-items:flex-start') + col(lineArr.slice(3).join(''), 3, 'align-items:flex-start'), 18, 'justify-content:flex-start;align-items:flex-start') + countRow(6, 'data-e2b-count="2"'), 5, 'align-items:flex-start'),
      W, 'auto', 'data-e2b-task="2" data-e2b-kind="list"', 'padding:5px 12px;flex-shrink:0'));
    items.push('2x3');
  }
  // the tree 2 x 2 x 2 (L1, L2: every branch drawn, the first written; L3: the first branch only)
  const treeTask = (k) => card(col(row(badge(String(k)) + tw(`${tree.intro} ${tree.levels.map((l) => l.join(' oder ')).join(', ')}. ${tree.q}${lv.tree === 'branch' ? ' Zeichne das Baumdiagramm fertig.' : ' Schreibe in jedes Kästchen, was es ist.'}`, W - 60, `data-e2b-tasktext="${k}"`, 'font-size:15px;line-height:19px'), 8, 'justify-content:flex-start;align-items:flex-start') +
    row(art(treeArt(tree.short, lv.tree), `data-e2b-treebox="${k}"`) + countRow(8, `data-e2b-count="${k}"`), 20, 'justify-content:flex-start;align-items:center'), 4, 'align-items:flex-start'), W, 'auto', `data-e2b-task="${k}" data-e2b-kind="tree"`, 'padding:5px 12px;flex:1 1 auto');
  if (lv.second === 'tree') parts.push(treeTask(2)); else parts.push(treeTask(3));
  items.push('2x2x2');
  if (lv.kids) {
    const kids = rng.pick(B.ROW_KIDS);
    const levels = [kids, kids.slice(1), kids.slice(2)];
    // the row tree: first place any of the three, second one of the other two, third the last one: drawn for the first child
    const rowTree = (() => {
      const lw = 70, lh = 21, gap = 3, H = 6 * (lh + gap);
      const colX = (l) => 14 + l * (lw + 24);
      let s = `<circle cx="6" cy="${H / 2}" r="4" fill="${T.teal}"/>`;
      for (let i = 0; i < 3; i++) {
        const y0 = i * H / 3, y1 = (i + 1) * H / 3, cy = (y0 + y1) / 2, first = i === 0;
        s += `<line x1="10" y1="${H / 2}" x2="${colX(0)}" y2="${cy}" stroke="${T.ink}" stroke-width="1.5"/><rect x="${colX(0)}" y="${cy - lh / 2}" width="${lw}" height="${lh}" rx="5" fill="${T.white}" stroke="${first ? T.teal : T.coral}" stroke-width="1.6"${first ? '' : ' stroke-dasharray="4 3"'} data-e2b-node="${i}"/>`;
        if (first) s += A.text(colX(0) + lw / 2, cy, kids[0], 13, { font: "'Nunito'", weight: 800 });
        for (let j = 0; j < 2; j++) {
          const yy0 = y0 + j * (y1 - y0) / 2, yy1 = y0 + (j + 1) * (y1 - y0) / 2, cy2 = (yy0 + yy1) / 2;
          const rest = kids.filter((_, q) => q !== i), second = rest[j], third = rest[1 - j];
          s += `<line x1="${colX(0) + lw}" y1="${cy}" x2="${colX(1)}" y2="${cy2}" stroke="${T.ink}" stroke-width="1.5"/><rect x="${colX(1)}" y="${cy2 - lh / 2}" width="${lw}" height="${lh}" rx="5" fill="${T.white}" stroke="${first ? T.teal : T.coral}" stroke-width="1.6"${first ? '' : ' stroke-dasharray="4 3"'} data-e2b-node="${i}${j}"/>`;
          s += `<line x1="${colX(1) + lw}" y1="${cy2}" x2="${colX(2)}" y2="${cy2}" stroke="${T.ink}" stroke-width="1.5"/><rect x="${colX(2)}" y="${cy2 - lh / 2}" width="${lw}" height="${lh}" rx="5" fill="${T.white}" stroke="${first ? T.teal : T.coral}" stroke-width="1.6"${first ? '' : ' stroke-dasharray="4 3"'} data-e2b-node="${i}${j}0"/>`;
          if (first) s += A.text(colX(1) + lw / 2, cy2, second, 13, { font: "'Nunito'", weight: 800 }) + A.text(colX(2) + lw / 2, cy2, third, 13, { font: "'Nunito'", weight: 800 });
        }
      }
      // the places of the row over the three columns (vorne, in der Mitte, hinten)
      const heads = X.places.map((w0, l) => A.text(colX(l) + lw / 2, -11, w0, 12, { fill: T.teal, font: "'Nunito'", weight: 800, attrs: `data-e2b-place="${l}"` })).join('');
      return A.artSvg(heads + s, colX(2) + lw + 2, H + 20, 'data-e2b-art="row-tree" data-e2b-leaves="6"', `0 -20 ${colX(2) + lw + 2} ${H + 20}`);
    })();
    void levels;
    const q = X.rowTask.replace('{A}', kids[0]).replace('{B}', kids[1]).replace('{C}', kids[2]) + ' Schreibe die Namen in die Kästchen: vorne, in der Mitte, hinten.';
    parts.push(card(col(row(badge('3') + tw(q, W - 60, 'data-e2b-tasktext="3"', 'font-size:15px;line-height:19px'), 8, 'justify-content:flex-start;align-items:flex-start') + row(art(rowTree, 'data-e2b-treebox="kids"') + countRow(6, 'data-e2b-count="3"'), 20, 'justify-content:flex-start;align-items:center'), 4, 'align-items:flex-start'),
      W, 'auto', 'data-e2b-task="3" data-e2b-kind="row"', 'padding:5px 12px;flex:1 1 auto'));
    items.push('3!');
  }
  // the tasks in their printed order (task 1 first; the tree task is 3 unless it is task 2)
  const html = parts.join('');
  return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${html}</div>`, meta: { shirts: shirts.map((c) => c.id), pants: pants.map((c) => c.id), tree: tree.id, items } };
};

/* ================================================================ the page check */
/** per mode: what the rendered page must hold (each check proves it found something to judge) */
function e2bVerifyInPage() {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no e2b root'];
  const mode = R.dataset.e2bMode, lv = Number(R.dataset.e2bLevel);
  const rect = (e) => e.getBoundingClientRect();
  const overlap = (a, b, tol = 1) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > tol && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > tol;
  const PXMM = 96 / 25.4, TOL = 0.2 * PXMM;   // 0.2 mm
  // every answer box is a box a child can write in
  R.querySelectorAll('[data-e2b-answer].ws-blankbox, [data-e2b-free].ws-blankbox').forEach((b) => { const r = rect(b); if (r.height < 21.5 || r.width < 21.5) f.push(`a box ${Math.round(r.width)}x${Math.round(r.height)} px`); });
  // open items carry their key
  R.querySelectorAll('[data-e2b-open]').forEach((o) => { if (!(o.dataset.e2bKey || '').trim()) f.push(`an open item without its key (${o.dataset.e2bOpen})`); });
  // writing lines long enough to write on
  R.querySelectorAll('[data-dk-writerow]').forEach((w) => { if (rect(w).width < 100) f.push(`a writing line ${Math.round(rect(w).width)} px`); });
  if (mode === 'e2b-hsub') {
    // the Rechenstrich: about 15 mm over the line for the jumps, 9 mm under it for the stop numbers (E-1's review)
    R.querySelectorAll('[data-e1-strich]').forEach((ln) => {
      const box = ln.closest('[data-e2b-strich]'), above = box.previousElementSibling, below = box.nextElementSibling;
      const ly = rect(ln).top + rect(ln).height / 2;
      if (!above || !below) { f.push('a Rechenstrich without what stands over and under it'); return; }
      if (ly - rect(above).bottom < 52) f.push(`${Math.round(ly - rect(above).bottom)} px over a Rechenstrich (about 14 mm = 52 px)`);
      if (rect(below).top - ly < 30) f.push(`${Math.round(rect(below).top - ly)} px under a Rechenstrich (8 mm = 30 px)`);
    });
    if (R.querySelectorAll('[data-e1-strich]').length !== 4) f.push(`${R.querySelectorAll('[data-e1-strich]').length} Rechenstriche (4)`);
  }
  if (mode === 'e2b-hmul') {
    R.querySelectorAll('[data-e2b-fieldbox]').forEach((fb) => {
      const fld = fb.querySelector('[data-e2b-art="dot-field"]'), a = +fld.dataset.e2bRows, b = +fld.dataset.e2bCols, z = +fld.dataset.e2bZ;
      const dots = [...fld.querySelectorAll('circle')];
      if (dots.length !== a * b) f.push(`a Punktefeld with ${dots.length} dots for ${a} x ${b}`);
      const sx = rect(fld.querySelector('[data-e2b-fieldsplit]')); const split = sx.left + sx.width / 2;
      const left = dots.filter((c) => rect(c).left + rect(c).width / 2 < split).length;
      if (left !== a * z) f.push(`the Punktefeld is split after ${left / a} columns, not ${z}`);
      const zb = rect(fb.querySelector('[data-e2b-part="z"]')), eb = rect(fb.querySelector('[data-e2b-part="e"]'));
      if (zb.left + zb.width / 2 > split || eb.left + eb.width / 2 < split) f.push('a part box is not over its part of the Punktefeld');
      if (overlap(zb, eb, 0)) f.push('the two part boxes overlap');
    });
  }
  if (mode === 'e2b-hdiv') {
    R.querySelectorAll('[data-e2b-art="blocks"]').forEach((bl) => {
      const n = +bl.dataset.e2bN, v = 100 * bl.querySelectorAll('[data-e2b-plate]').length + 10 * bl.querySelectorAll('[data-e2b-rod]').length + bl.querySelectorAll('[data-e2b-cube]').length;
      if (v !== n) f.push(`the blocks show ${v}, not ${n}`);
      if (bl.dataset.e2bSplit) {
        const sl = bl.querySelector('[data-e2b-splitline]'); if (!sl) { f.push('a given split without its line'); return; }
        const sx = rect(sl).left + rect(sl).width / 2;
        const lv2 = [...bl.querySelectorAll('[data-e2b-plate]')].filter((e) => rect(e).right < sx).length * 100 + [...bl.querySelectorAll('[data-e2b-rod]')].filter((e) => rect(e).right < sx).length * 10 + [...bl.querySelectorAll('[data-e2b-cube]')].filter((e) => rect(e).right < sx).length;
        if (lv2 !== +bl.dataset.e2bSplit) f.push(`the blocks are split at ${lv2}, the page says ${bl.dataset.e2bSplit}`);
      }
    });
  }
  if (mode === 'e2b-mm') {
    // REAL SIZE, measured in the render (the gate measures the PDF too)
    const ru = R.querySelector('[data-e2b-art="mm-ruler"]');
    if (!ru) f.push('no ruler');
    else {
      const ticks = [...ru.querySelectorAll('[data-e2b-tick]')].map((e) => ({ i: +e.dataset.e2bTick, x: rect(e).left + rect(e).width / 2 }));
      if (ticks.length !== 101) f.push(`the ruler has ${ticks.length} ticks`);
      const x0 = ticks[0].x;
      for (const tk of ticks) if (Math.abs(tk.x - x0 - tk.i * PXMM) > TOL) { f.push(`ruler tick ${tk.i} lies ${((tk.x - x0) / PXMM).toFixed(2)} mm from 0`); break; }
    }
    R.querySelectorAll('[data-e2b-art="mm-line"]').forEach((ln) => {
      const mm = +ln.dataset.e2bMm, m0 = rect(ln.querySelector('[data-e2b-endmark="0"]')), m1 = rect(ln.querySelector('[data-e2b-endmark="1"]'));
      const len = (m1.left + m1.width / 2) - (m0.left + m0.width / 2);
      if (Math.abs(len - mm * PXMM) > TOL) f.push(`a ${mm}-mm line is ${(len / PXMM).toFixed(2)} mm`);
      if (mm % 10 === 0) f.push(`a line of a whole ${mm / 10} cm`);
    });
    R.querySelectorAll('[data-e2b-art="real-thing"]').forEach((th) => {
      const mm = +th.dataset.e2bMm, sw = +th.dataset.e2bSw, o = th.querySelector('[data-e2b-outline]');
      const bb = o.getBBox(), k = rect(th).width / th.viewBox.baseVal.width;
      // the outline's own ends plus half a stroke each side: the ink a ruler meets (round joins and caps reach that far)
      const ink = (bb.width + sw) * k;
      if (Math.abs(ink - mm * PXMM) > TOL) f.push(`the ${th.dataset.e2bThing} is ${(ink / PXMM).toFixed(2)} mm, the page says ${mm} mm`);
      const svgW = rect(th).width; if (Math.abs(svgW - mm * PXMM) > TOL) f.push(`the ${th.dataset.e2bThing}'s drawing is ${(svgW / PXMM).toFixed(2)} mm wide`);
    });
    R.querySelectorAll('[data-e2b-art="start-point"]').forEach((sp) => { const room = +sp.dataset.e2bRoom, d0 = rect(sp.querySelector('[data-e2b-start]')); const free = rect(sp).right - (d0.left + d0.width / 2); if (free < room * PXMM - 1) f.push(`a start point with ${(free / PXMM).toFixed(1)} mm of room for ${room} mm`); });
  }
  if (mode === 'e2b-km') {
    const map = R.querySelector('[data-e2b-art="town-map"]');
    if (!map) return f.concat('no map');
    const labels = [...map.querySelectorAll('[data-e2b-roadlabel]')].map((e) => ({ id: e.dataset.e2bRoadlabel, r: rect(e) }));
    const places = [...map.querySelectorAll('[data-e2b-place]')].map((e) => ({ id: e.dataset.e2bPlace, r: rect(e) }));
    if (places.length !== 5 || labels.length !== 6) f.push(`${places.length} places, ${labels.length} road labels`);
    labels.forEach((a, i) => { places.forEach((p) => { if (overlap(a.r, p.r)) f.push(`the road label ${a.id} covers ${p.id}`); }); labels.slice(i + 1).forEach((b) => { if (overlap(a.r, b.r)) f.push(`two road labels overlap (${a.id}, ${b.id})`); }); });
    places.forEach((a, i) => places.slice(i + 1).forEach((b) => { if (overlap(a.r, b.r)) f.push(`two places overlap (${a.id}, ${b.id})`); }));
    // the road lengths in proportion to the drawn roads (the picture never contradicts the numbers): metres per pixel
    // the same on every road within 15 %
    const roads = [...map.querySelectorAll('[data-e2b-road]')].map((e) => { const x1 = +e.getAttribute('x1'), y1 = +e.getAttribute('y1'), x2 = +e.getAttribute('x2'), y2 = +e.getAttribute('y2'); return +e.dataset.e2bM / Math.hypot(x2 - x1, y2 - y1); });
    if (Math.max(...roads) / Math.min(...roads) > 1.45) f.push(`roads drawn out of proportion to their lengths (${(Math.max(...roads) / Math.min(...roads)).toFixed(2)})`);
    const items = [...R.querySelectorAll('[data-e2b-match]')], targets = [...R.querySelectorAll('[data-e2b-target]')].map((e) => e.dataset.e2bTarget);
    if (items.length !== 6 || targets.join() !== 'h,k,v') f.push(`${items.length} distances and the cards ${targets}`);
  }
  if (mode === 'e2b-komma') {
    R.querySelectorAll('[data-e2b-purse]').forEach((p) => { const v = [...p.querySelectorAll('[data-e2b-piece]')].reduce((s, e) => s + +e.dataset.e2bPiece, 0); if (v !== +p.dataset.e2bPurse) f.push(`the money shows ${v} ct, not ${p.dataset.e2bPurse}`); });
    R.querySelectorAll('[data-e2b-art="tape"]').forEach((tp) => { const v = +tp.dataset.e2bV, ar = rect(tp.querySelector('[data-e2b-tapearrow]')), tk = tp.querySelector(`[data-e2b-tapecm="${v}"]`); if (!tk) { f.push(`no mark at ${v} cm`); return; } const tr = rect(tk); if (Math.abs((ar.left + ar.width / 2) - (tr.left + tr.width / 2)) > 1.2) f.push(`the tape's arrow is not at ${v} cm`); if (v === +tp.dataset.e2bC0 || v === +tp.dataset.e2bC1) f.push('the tape\'s arrow at the strip\'s end'); });
  }
  if (mode === 'e2b-tab-sach') {
    R.querySelectorAll('[data-e2b-arrowtable]').forEach((at) => {
      const cells = [...at.querySelectorAll('[data-e2b-table] .dk-row')[0].children].slice(1).map(rect);
      at.querySelectorAll('[data-e2b-op]').forEach((b) => { const [i, j] = b.dataset.e2bOp.split('-').map(Number); const r = rect(b), c = r.left + r.width / 2; const lo = Math.min(cells[i].left, cells[j].left), hi = Math.max(cells[i].right, cells[j].right); if (c < lo || c > hi) f.push(`an arrow's box ${b.dataset.e2bOp} is not between its columns`); });
      const bs = [...at.querySelectorAll('[data-e2b-op]')].map(rect); bs.forEach((a, i) => bs.slice(i + 1).forEach((b) => { if (overlap(a, b)) f.push('two arrow boxes overlap'); }));
      const tb = rect(at.querySelector('[data-e2b-table]')); bs.forEach((b) => { if (overlap(b, tb)) f.push('an arrow box on the table'); });
    });
    // the answer sentence fits (review round 1): a writing line for every question, each as long as the longest answer
    // sentence of the key in Klasse-3 handwriting (about 4,2 mm a character: 18-20 letters on 7,5 cm)
    R.querySelectorAll('[data-e2b-problem]').forEach((pr) => {
      const sents = (pr.dataset.e2bKey || '').split(/(?<=\.)\s+/).filter(Boolean), longest = Math.max(...sents.map((x) => x.length));
      const lines = [...pr.querySelectorAll('[data-e2b-ansline] [data-dk-writerow]')];
      if (lines.length < sents.length) f.push(`a problem with ${sents.length} questions and ${lines.length} answer lines`);
      lines.forEach((l) => { const mm = rect(l).width / PXMM; if (mm < longest * 4.2) f.push(`an answer line of ${mm.toFixed(0)} mm for a ${longest}-character answer (${(longest * 4.2).toFixed(0)} mm)`); });
    });
  }
  if (mode === 'e2b-zirkel') {
    // REAL SIZE: every circle's radius, every centre's free room, the model and the flower drawn true
    R.querySelectorAll('[data-e2b-circle]').forEach((c) => { const k = rect(c.ownerSVGElement).width / c.ownerSVGElement.viewBox.baseVal.width, r = +c.getAttribute('r') * k; if (Math.abs(r - +c.dataset.e2bRmm * PXMM) > TOL) f.push(`a circle of ${(r / PXMM).toFixed(2)} mm radius, the page says ${c.dataset.e2bRmm} mm`); });
    const cs = R.querySelector('[data-e2b-art="circles"]');
    if (!cs) f.push('no circles to draw');
    else {
      const set = cs.dataset.e2bSet.split(','), marks = [...cs.querySelectorAll('[data-e2b-centre]')], regs = [...cs.querySelectorAll('[data-e2b-region]')];
      if (marks.length !== set.length) f.push(`${marks.length} centres for ${set.length} circles`);
      marks.forEach((m, i) => {
        const r = (set[i][0] === 'd' ? +set[i].slice(1) / 2 : +set[i].slice(1)) * 10 * PXMM;
        const ln = m.querySelector('line'), lr = rect(ln), cx = lr.left + lr.width / 2, cy = lr.top + lr.height / 2;
        const reg = rect(regs[i]);
        if (cx - r < reg.left + 2 * PXMM || cx + r > reg.right - 2 * PXMM || cy - r < reg.top + 1.5 * PXMM || cy + r > reg.bottom + 0.5) f.push(`circle ${i + 1} (${set[i]}) has no room in its place`);
        const lab = cs.querySelector(`[data-e2b-size="${set[i]}"]`) || cs.querySelectorAll('[data-e2b-size]')[i];
        const la = rect(lab); const dy = la.top - cy; if (dy < r + 1.5 * PXMM && Math.abs((la.left + la.width / 2) - cx) < r) f.push(`circle ${i + 1}'s label lies inside the circle`);
      });
    }
    const fl = R.querySelector('[data-e2b-art="flower"]'), mo = R.querySelector('[data-e2b-art="flower-model"]');
    for (const [g, sel, lab] of [[fl, '[data-e2b-flower]', 'flower'], [mo, '[data-e2b-model]', 'model']]) {
      if (!g) { f.push('no ' + lab); continue; }
      const circ = [...g.querySelectorAll(sel)].map((c) => ({ k: +(c.dataset.e2bFlower || c.dataset.e2bModel), x: +c.getAttribute('cx'), y: +c.getAttribute('cy'), r: +c.getAttribute('r') }));
      const mid = circ.find((c) => c.k === 0);
      if (!mid) { f.push(`the ${lab}'s middle circle is missing`); continue; }
      circ.forEach((c) => { if (Math.abs(c.r - mid.r) > 0.05) f.push(`the ${lab}'s circles are not one size`); if (c.k) { const dd = Math.hypot(c.x - mid.x, c.y - mid.y); if (Math.abs(dd - mid.r) > 0.05) f.push(`a ${lab} circle is not centred on the middle circle`); const ang = Math.atan2(mid.y - c.y, c.x - mid.x) * 180 / Math.PI; const kk = (((Math.round(ang / 60)) % 6) + 6) % 6; if (Math.abs(ang - Math.round(ang / 60) * 60) > 0.05 || kk + 1 !== c.k) f.push(`a ${lab} circle is not at its 60-degree place`); } });
      if (lab === 'model' && circ.length !== 7) f.push(`the model has ${circ.length} circles (7)`);
    }
  }
  if (mode === 'e2b-dia') {
    R.querySelectorAll('[data-e2b-art="bar-chart"]').forEach((ch) => {
      const ys = {}; ch.querySelectorAll('[data-e2b-grid]').forEach((g) => { ys[g.dataset.e2bGrid] = rect(g).top + rect(g).height / 2; });
      const vs = Object.keys(ys).map(Number).sort((a, b) => a - b); if (vs.length < 3) { f.push('a chart with fewer than three grid lines'); return; }
      const pxPer = (ys[vs[0]] - ys[vs[vs.length - 1]]) / (vs[vs.length - 1] - vs[0]);
      ch.querySelectorAll('[data-e2b-bar]').forEach((b) => { const v = +b.dataset.e2bVal, top = rect(b).top, want = ys[vs[0]] - (v - vs[0]) * pxPer; if (Math.abs(top - want) > 1.2) f.push(`the ${b.dataset.e2bBar} bar does not end at ${v}`); });
    });
    R.querySelectorAll('[data-e2b-art="picture-chart"]').forEach((ch) => { if (!ch.querySelector('[data-e2b-face]')) f.push('a picture chart without pictures'); });
    const st = [...R.querySelectorAll('[data-e2b-judge]')];
    if (st.length !== 6) f.push(`${st.length} statements`);
  }
  if (mode === 'e2b-kombi') {
    const tb = R.querySelector('[data-e2b-ctable]');
    if (!tb) f.push('no table');
    else if (tb.querySelectorAll('[data-e2b-combo]').length !== +tb.dataset.e2bRows * +tb.dataset.e2bCols) f.push('the table has not one cell for every possibility');
    R.querySelectorAll('[data-e2b-art="tree"]').forEach((tr) => { if (tr.dataset.e2bMode === 'full' && tr.querySelectorAll('[data-e2b-node]').length !== 14) f.push(`a tree with ${tr.querySelectorAll('[data-e2b-node]').length} nodes (2 + 4 + 8)`); });
  }
  return f;
}

/** makeE2bType({ id, slug, mode, exerciseType, gradeBand, i18n }) */
/** for the teacher, never on the child page (catalogue / unit text): the real sizes hold only at 100 % print */
const TEACHER_NOTE = { 'e2b-mm': () => B.TEXT.mm.teacher, 'e2b-zirkel': () => B.TEXT.zirkel.teacher };
function makeE2bType({ id, slug, mode, exerciseType, gradeBand, i18n }) {
  if (!MODES[mode]) throw new Error('e2-math-b: unknown mode ' + mode);
  const only = LOC[mode];
  const pageMode = mode.startsWith('e2b-tab') ? 'e2b-tab' : mode;
  return {
    id, slug, gradeBand, assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    onlyLocales: [only],
    difficulty: { 1: {}, 2: {}, 3: {} },
    i18n,
    e2bMode: mode,
    ...(TEACHER_NOTE[mode] ? { teacherNote: { de: TEACHER_NOTE[mode]() } } : {}),
    build({ difficulty: lv, locale }, ctx) {
      const L = String(locale || 'en').slice(0, 2);
      if (L !== only) throw new Error(`${id}: printed in ${only} only (no ${locale} page; the type teaches a German lesson)`);
      const d = { level: Number(lv) || 2 };
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${DK.CSS}${E2BCSS}</style><div class="dk-root" data-ws-content data-dk="${pageMode}" data-e2b-mode="${mode}" data-e2b-level="${d.level}" data-e2b-locale="${only}" data-dk-record="0">${out.html}</div>`,
        meta: { mode, level: d.level, ...out.meta },
      };
    },
    levelSetWords(meta) { return (meta.items || []).map(String); },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(G.g1VerifyInPage), await page.evaluate(e2bVerifyInPage));
    },
  };
}

module.exports = { makeE2bType, MODES, LOC, e2bVerifyInPage, HZ_LV, hzTask, HSUB_LV, subSteps, addSteps, subCross, MZ_LV, HMUL_LV, HDIV_LV, hdivSplit, MM_LV, KM_LV, MAP_SLOTS, MAP_ROADS, KOMMA_LV, greedy, comma, UEBER_LV, roundEur, TAB_LV, sachProblem, ZIRKEL_LV, FLOWER_R, MODEL_R, DIA_LV, CANT, KOMBI_LV };
