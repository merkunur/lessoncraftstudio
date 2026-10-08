/**
 * hundreds-screen.js — Level Set 2026-10-08 (Hundreds Chart Puzzles, PDF + interactive): the SCREEN version and ANSWER
 * KEY of a built G1-310-family page, and the robot's INDEPENDENT oracle. New pages only — the published page (level 2,
 * copy 1) never reaches this module.
 *
 *   base     two cells of every piece marked "?" (one question each): tap the number that goes there
 *   place    every piece beside a small chart with ONE of its squares marked "?": tap which of the piece's numbers
 *            goes there (the options are numbers of that piece — the piece must be read)
 *   error    every piece: tap its wrong number (its numbers as chips), then tap the right number
 *   jumps    every chain: tap where it lands
 *   riddle   every riddle: tap the mystery number
 *   distance every pair: tap the jumps down, tap the jumps right
 * The wrong numbers are the real slips (one more / less, ten more / less, the start, the other counter), rank-balanced
 * by lib/answer-slots.js numberChoices and capped so no more than a third of a page's answers are the smallest or the
 * largest option (lib/graph-screen.js numberItems). Every question stamps the facts its oracle needs (the chart's
 * start/step, the piece's cells or the chain's moves) and the oracle recomputes the answer from the ONE position
 * formula — never from the page.
 */
'use strict';
const { seededShuffle } = require('./answer-slots.js');
const { shapeInfo, guideValues } = require('../primitives/chart-fragment.js');
const GS = require('./graph-screen.js');
const C3 = require('../templates/components-b3.js');

const COLS = 10;
const TK = require('../primitives/_tokens.js').color;   // palette lint: tokens only
const TEAL = TK.teal, CORAL = TK.coral, INK = TK.ink, SOFT = TK.tealSoft, GRID = TK.grid;
const valAt = (start, step, r, c) => start + step * (COLS * r + c);

/** a piece drawn for the screen: `mark` cells show "?", `show` cells their number, the rest blank */
function pieceSvg(cells, values, { show = [], mark = -1, cell = 50 }) {
  const w = Math.max(...cells.map(([, c]) => c)) + 1, h = Math.max(...cells.map(([r]) => r)) + 1;
  const W = w * cell + 6, H = h * cell + 6;
  const parts = cells.map(([r, c], i) => {
    const x = 3 + c * cell, y = 3 + r * cell;
    const isMark = i === mark, isShow = show.includes(i);
    const fill = isShow ? SOFT : '#FFFFFF';
    const txt = isMark ? '?' : isShow ? String(values[i]) : '';
    return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${fill}" stroke="${isMark ? CORAL : TEAL}" stroke-width="${isMark ? 4 : 2.5}"/>` +
      (txt ? `<text x="${x + cell / 2}" y="${y + cell / 2 + 8}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${isMark ? 28 : 22}" fill="${isMark ? CORAL : INK}">${txt}</text>` : '');
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="chart piece">${parts}</svg>`;
}

/** a small chart (cell 28) with its printed guides and ONE square marked "?" */
function miniChart(U, guides, markValue) {
  const count = (U.end - U.start) / U.step + 1, rows = count / COLS, cell = 28;
  const G = new Set(guideValues({ start: U.start, end: U.end, step: U.step, guides }));
  let parts = '';
  for (let i = 0; i < count; i++) {
    const v = U.start + i * U.step, r = Math.floor(i / COLS), c = i % COLS, x = 2 + c * cell, y = 2 + r * cell;
    const isMark = v === markValue;
    parts += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${isMark ? '#FBE3D8' : '#FFFFFF'}" stroke="${isMark ? CORAL : GRID}" stroke-width="${isMark ? 3 : 1}"/>`;
    if (isMark) parts += `<text x="${x + cell / 2}" y="${y + cell / 2 + 7}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="20" fill="${CORAL}">?</text>`;
    else if (G.has(v)) parts += `<text x="${x + cell / 2}" y="${y + cell / 2 + 5}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="12" fill="${INK}">${v}</text>`;
  }
  const W = COLS * cell + 4, H = rows * cell + 4;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="number chart">${parts}</svg>`;
}

const arrows = (moves) => moves.map((m) => C3.arrowGlyph({ dir: m, size: 40, stamp: false })).join('');
const given = (v) => C3.chartGiven(v, 76, 56);
const pointer = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><polygon points="3,4 19,11 3,18" fill="${CORAL}"/></svg>`;
const pick2 = (n, salt) => seededShuffle([...Array(n).keys()], salt).slice(0, Math.min(2, n));

function screen(built, salt) {
  const m = built.meta, U = { start: m.start, end: m.end, step: m.step };
  const step = m.step;
  const unit = `${m.start}:${m.end}:${step}`;
  const qs = [];   // number questions
  let extra = '';  // the error face's tap-the-wrong-number items come first
  const mode = m.mode;
  if (mode === 'base') {
    m.pieces.forEach((p, k) => {
      const { cells } = shapeInfo(p.shape, p.rot);
      const ai = p.values.indexOf(p.anchor);
      const blanks = cells.map((_, i) => i).filter((i) => i !== ai);
      for (const j of pick2(blanks.length, salt + '|b' + k).map((x) => blanks[x])) {
        const v = p.values[j];
        qs.push({ q: `cell:${unit}:${p.origin}:${cells[j][0]},${cells[j][1]}`, prompt: pieceSvg(cells, p.values, { show: [ai], mark: j }), ans: v,
          slips: [v + step, v - step, v + 10 * step, v - 10 * step, p.anchor].filter((x) => x >= m.start && x <= m.end), step });
      }
    });
  } else if (mode === 'place') {
    // the piece's numbers are the options: tap the one that belongs in the marked square
    const items = m.pieces.map((p, k) => {
      const j = seededShuffle([...p.values.keys()], salt + '|p' + k)[0];
      const v = p.values[j];
      const others = seededShuffle(p.values.filter((x) => x !== v), salt + '|o' + k).slice(0, 2);
      const opts = seededShuffle([v, ...others], salt + '|s' + k + '|' + v);
      const { cells } = shapeInfo(p.shape, p.rot);
      const prompt = GS.row(pieceSvg(cells, p.values, { show: [...p.values.keys()], cell: 40 }) + miniChart(U, m.guides || 'edges', v), 18);
      return GS.itemBox(k, `place:${unit}:${v}:${p.values.join('-')}`, prompt + GS.row(opts.map((o, i) => GS.chip(i, String(o), o === v, GS.NUM(o), 120)).join('')));
    });
    return GS.wrap(items.join(''));
  } else if (mode === 'error') {
    let n = 0;
    m.pieces.forEach((p, k) => {
      const { cells } = shapeInfo(p.shape, p.rot);
      const o = { r: Math.floor((p.origin - m.start) / step / COLS), c: ((p.origin - m.start) / step) % COLS };
      const shown = cells.map(([r, c], i) => (i === p.wrongIdx ? p.wrongValue : valAt(m.start, step, o.r + r, o.c + c)));
      const trueVal = valAt(m.start, step, o.r + cells[p.wrongIdx][0], o.c + cells[p.wrongIdx][1]);
      // 1) tap the wrong number: the piece's numbers in reading order are the chips
      const order = cells.map((rc, i) => ({ rc, i })).sort((a, b) => a.rc[0] - b.rc[0] || a.rc[1] - b.rc[1]);
      extra += GS.itemBox(n++, `wrong:${unit}:${p.origin}:${cells.map((rc) => rc.join(',')).join(';')}:${shown.join('-')}`,
        GS.row(pieceSvg(cells, shown, { show: [...cells.keys()], cell: 44 }), 0) +
        // up to 9 numbers (a 3x3 piece): 96-px chips (≈45 px on a phone) wrapping onto two rows, so none runs off the page
        `<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:640px">${order.map(({ i }, j) => GS.chip(j, String(shown[i]), i === p.wrongIdx, GS.NUM(shown[i], 30), 96)).join('')}</div>`);
      // 2) the right number
      qs.push({ q: `right:${unit}:${p.origin}:${cells[p.wrongIdx].join(',')}`, prompt: GS.row(GS.NUM(p.wrongValue, 40) + GS.SYM('→') + GS.SYM('?'), 10), ans: trueVal,
        slips: [p.wrongValue, trueVal + step, trueVal - step, trueVal + 10 * step, trueVal - 10 * step].filter((x) => x >= m.start && x <= m.end), step });
    });
    const numbers = GS.numberItems(qs, salt);
    // renumber the number items after the chip items
    return GS.wrap(extra + numbers.map((h, i) => h.replace(/data-lcs-word="\d+"/, `data-lcs-word="${n + i + 1}"`)).join(''));
  } else if (mode === 'jumps') {
    m.chains.forEach((ch) => {
      const v = ch.answer;
      qs.push({ q: `jump:${unit}:${ch.start}:${ch.moves.join('')}`, prompt: GS.row(given(ch.start) + arrows(ch.moves) + GS.SYM('?'), 8), ans: v,
        slips: [ch.start, v + step, v - step, v + 10 * step, v - 10 * step].filter((x) => x >= m.start && x <= m.end), step });
    });
  } else if (mode === 'riddle') {
    m.riddles.forEach((rd) => {
      const v = rd.answer;
      const clue = (c) => GS.row(given(c.start) + arrows([c.move]), 8);
      qs.push({ q: `riddle:${unit}:${rd.clues.map((c) => c.start + c.move).join(';')}`, prompt: `<div style="display:flex;flex-direction:column;gap:8px">${clue(rd.clues[0])}${clue(rd.clues[1])}</div>` + GS.SYM('?', 36), ans: v,
        slips: [...rd.clues.map((c) => c.start), v + step, v - step, v + 10 * step, v - 10 * step].filter((x) => x >= m.start && x <= m.end), step });
    });
  } else if (mode === 'distance') {
    m.pairs.forEach((p) => {
      const pair = GS.row(given(p.a) + pointer + given(p.b), 8);
      qs.push({ q: `down:${unit}:${p.a}:${p.b}`, prompt: pair + GS.row(C3.arrowGlyph({ dir: 'D', size: 40, stamp: false }) + GS.SYM('?'), 6), ans: p.down, slips: [p.right, p.down + 1, p.down - 1, p.down * 10] });
      qs.push({ q: `right:${unit}:${p.a}:${p.b}`, prompt: pair + GS.row(C3.arrowGlyph({ dir: 'R', size: 40, stamp: false }) + GS.SYM('?'), 6), ans: p.right, slips: [p.down, p.right + 1, p.right - 1, p.right * 10] });
    });
  } else throw new Error('hundreds screen: unknown mode ' + mode);
  return GS.wrap(GS.numberItems(qs, salt).join(''));
}

function key(built, rebuildFilled) {
  const m = built.meta;
  // the base and the place board print every answer (a fresh build with keyFill); the boxes show theirs
  let h = (m.mode === 'base' || m.mode === 'place') ? rebuildFilled().bodyHtml : built.bodyHtml;
  const css = [`.ws-blankbox[data-lcs-answer]{position:relative}.ws-blankbox[data-lcs-answer]::after{content:attr(data-lcs-answer);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 26px 'Baloo 2',cursive;color:${CORAL}}`,
    `[data-lcs-wrong]{fill:${CORAL} !important;text-decoration:line-through;font-weight:800}`];
  return h + `<style data-lcs-key>${css.join('')}</style>`;
}

function screenOrKey(built, ctx) {
  if (!built.meta || !built.meta.mode) throw new Error('hundreds screen: the page carries no mode');
  const salt = [ctx.locale || 'en', ctx.variant || '', built.meta.unit || ''].join('/');
  if (!ctx.interactive) return { bodyHtml: key(built, ctx.rebuildFilled), meta: built.meta };
  return { bodyHtml: screen(built, salt), meta: built.meta };
}

// ---- oracle: the ONE position formula, from the stamped facts ----
function solve(q) {
  const parts = q.split(':');
  const kind = parts[0];
  const start = +parts[1], step = +parts[3];
  const pos = (v) => { const i = (v - start) / step; return { r: Math.floor(i / COLS), c: i % COLS }; };
  const at = (r, c) => valAt(start, step, r, c);
  if (kind === 'cell' || kind === 'right') {
    const o = pos(+parts[4]); const [r, c] = parts[5].split(',').map(Number); return at(o.r + r, o.c + c);
  }
  if (kind === 'jump') {
    let v = +parts[4]; for (const mv of parts[5]) { const p = pos(v); v = at(p.r + ({ U: -1, D: 1 }[mv] || 0), p.c + ({ L: -1, R: 1 }[mv] || 0)); } return v;
  }
  if (kind === 'riddle') {
    const ends = parts[4].split(';').map((s) => { const v = +s.slice(0, -1), mv = s.slice(-1), p = pos(v); return at(p.r + ({ U: -1, D: 1 }[mv] || 0), p.c + ({ L: -1, R: 1 }[mv] || 0)); });
    if (ends[0] !== ends[1]) throw new Error('hundreds oracle: riddle clues disagree ' + q);
    return ends[0];
  }
  if (kind === 'down' || kind === 'right2') { const a = pos(+parts[4]), b = pos(+parts[5]); return b.r - a.r; }
  throw new Error('hundreds oracle: unknown question ' + q);
}
function oracle(items) {
  return items.map((it) => {
    const q = (it.meta || {})['data-lcs-q'];
    const L = it.options.map((o) => String(typeof o === 'object' ? o.label : o));
    const parts = q.split(':');
    let want;
    if (parts[0] === 'right' && parts.length === 6 && /^\d+$/.test(parts[5])) {   // distance: jumps right (a:b)
      const start = +parts[1], step = +parts[3], i = (v) => (v - start) / step;
      want = String((i(+parts[5]) % COLS) - (i(+parts[4]) % COLS));
    } else if (parts[0] === 'place') {
      // the marked square's number must be one of the piece's numbers and on the chart
      const v = +parts[4], vals = parts[5].split('-').map(Number), start = +parts[1], end = +parts[2], step = +parts[3];
      if (!vals.includes(v) || v < start || v > end || (v - start) % step) throw new Error('hundreds oracle: marked square ' + v + ' is not on its piece / chart');
      want = String(v);
    } else if (parts[0] === 'wrong') {
      // the number on the piece that is NOT the chart's number at its cell
      const start = +parts[1], step = +parts[3], o = (+parts[4] - start) / step;
      const cells = parts[5].split(';').map((s) => s.split(',').map(Number)), shown = parts[6].split('-').map(Number);
      const bad = cells.map(([r, c], k) => (shown[k] !== valAt(start, step, Math.floor(o / COLS) + r, (o % COLS) + c) ? shown[k] : null)).filter((x) => x != null);
      if (bad.length !== 1) throw new Error('hundreds oracle: ' + bad.length + ' wrong numbers on ' + q);
      want = String(bad[0]);
    } else want = String(solve(q));
    const hits = L.map((l, k) => (l === want ? k : -1)).filter((k) => k >= 0);
    if (hits.length !== 1) throw new Error(`hundreds oracle: ${hits.length} options right for ${q}`);
    return hits[0];
  });
}

const KEYS = { base: 'fill', place: 'place', error: 'error', jumps: 'jumps', riddle: 'riddle', distance: 'distance' };
function interactiveFor(mode) {
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey: KEYS[mode || 'base'], screenHeight: 9000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle };
