/**
 * Factory for the column-arithmetic family (G2-251 / G3-357) — vertically
 * written addition & subtraction. Design-panel locks:
 *  - place-value architecture visible: per-column digit cells (44px) with the
 *    ones column washed coralSoft and the tens column tealSoft
 *  - a 3px teal rule as the equals bar (echoes the page header rule)
 *  - the operator glyph large in the left gutter
 *  - ADDITION cards with regrouping get a small dashed CARRY mini-row above;
 *    SUBTRACTION never gets pre-printed borrow scaffolding (algorithms
 *    differ by country — de Ergänzungsverfahren writes below, fr uses
 *    compensation on both rows; empty headroom is the safe universal design)
 *  - answers are per-digit dashed write-in cells aligned under the columns
 *
 * cfg.regroup: false → every column sum ≤ 9 / top ≥ bottom (no carrying)
 *              true  → at least one carry/borrow REQUIRED per problem
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const CELL = 44;
const COL_WASH = ['#FBE3D8', '#DDEBE8', '#F5E9D2']; // ones, tens, hundreds (right→left)

function digitsOf(n) { return String(n).split('').map(Number); }

/** how many columns regroup (carry for +, borrow for −; a borrow chain across zeros counts each column it crosses) */
function regroupCount(a, b, op) {
  let n = 0, x = a, y = b, c = 0;
  while (x > 0 || y > 0) {
    const dx = x % 10, dy = y % 10;
    if (op === '+') { c = dx + dy + c > 9 ? 1 : 0; n += c; }
    else { const need = dx - c < dy; n += need ? 1 : 0; c = need ? 1 : 0; }
    x = Math.floor(x / 10); y = Math.floor(y / 10);
  }
  return n;
}

/** Does a+b carry in any column / does a-b borrow in any column? */
function hasCarry(a, b) {
  let x = a, y = b;
  while (x > 0 || y > 0) {
    if ((x % 10) + (y % 10) > 9) return true;
    x = Math.floor(x / 10); y = Math.floor(y / 10);
  }
  return false;
}
function hasBorrow(a, b) {
  let x = a, y = b;
  while (y > 0) {
    if ((x % 10) < (y % 10)) return true;
    x = Math.floor(x / 10); y = Math.floor(y / 10);
  }
  return false;
}

function digitCell(digit, { wash, answer, cell = CELL }) {
  const base = `width:${cell}px;height:${cell}px;display:flex;align-items:center;justify-content:center;` +
    `font-family:'Baloo 2';font-weight:700;font-size:${Math.round(cell * 26 / CELL)}px;color:#3A3530;border-radius:8px;`;
  if (answer) {
    return `<span style="${base}background:#FFFFFF;border:2px dashed #C8BFAE" data-lcs-digit="${digit}"></span>`;
  }
  if (digit === '') return `<span style="${base}"></span>`;
  return `<span style="${base}background:${wash}">${digit}</span>`;
}

function problemCard({ a, b, op, showCarryRow, cell = CELL }) {
  const CELL = cell;   // Level Set 2026-10-05: 4-problem pages draw bigger digit boxes (d.cell); the published size is 44
  const res = op === '+' ? a + b : a - b;
  const width = Math.max(String(a).length, String(b).length, String(res).length);
  const pad = (n) => {
    const ds = digitsOf(n);
    return Array(width - ds.length).fill('').concat(ds);
  };
  const rowA = pad(a), rowB = pad(b), rowR = digitsOf(res);
  const rowRPadded = Array(width - rowR.length).fill(null).concat(rowR);
  const washFor = (col) => COL_WASH[Math.min(width - 1 - col, COL_WASH.length - 1)];

  const row = (cells) => `<div style="display:flex;gap:6px">${cells.join('')}</div>`;
  const rows = [];
  if (showCarryRow) {
    // dashed 24px carry mini-row (addition only; deliberately small — one
    // pencil digit) — never rendered for subtraction
    const mini = `width:${CELL}px;height:24px;display:flex;border-radius:6px;`;
    rows.push(`<div style="display:flex;gap:6px;margin-bottom:2px">` + Array.from({ length: width }, (_, c) =>
      c === width - 1 ? `<span style="${mini}"></span>`
        : `<span style="${mini}background:#FFFFFF;border:1.5px dashed #C8BFAE"></span>`).join('') + `</div>`);
  } else {
    rows.push(`<div style="height:20px"></div>`); // empty headroom (crossing-out space)
  }
  const opGlyph = `<span style="position:absolute;left:-40px;bottom:${CELL / 2 - 16}px;font-family:'Baloo 2';` +
    `font-weight:700;font-size:${Math.round(cell * 32 / 44)}px;color:${op === '+' ? '#146B5E' : '#F2784B'}">${op === '+' ? '+' : '−'}</span>`;
  const html =
    `<div style="position:relative;display:flex;flex-direction:column;gap:6px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-op="${op}">` +
    rows[0] +
    row(rowA.map((dg, c) => digitCell(dg, { wash: dg === '' ? null : washFor(c), cell }))) +
    `<div style="position:relative">${opGlyph}` +
    row(rowB.map((dg, c) => digitCell(dg, { wash: dg === '' ? null : washFor(c), cell }))) + `</div>` +
    `<div style="height:3px;background:#146B5E;border-radius:2px;margin:2px 0"></div>` +
    row(rowRPadded.map((dg) => dg === null
      ? `<span style="width:${CELL}px;height:${CELL}px"></span>`
      : digitCell(dg, { answer: true, cell }))) +
    `</div>`;
  return `<div class="ws-card-stage" style="padding-left:40px">${html}</div>`;
}

function makeColumnType(cfg) {
  const { id, slug, gradeBand, regroup, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'numeral-charts',
    exerciseType: 'column-arithmetic',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty,
    i18n,

    // Level Set (2026-10-05): the screen version + answer key of NEW pages (lib/column-screen.js); the published
    // page (level 2, copy 1) never reaches it
    interactive: require('../../lib/column-screen.js').interactiveFor(),
    levelSetWords(m) { return m.problems || []; },

    build({ difficulty, locale }, ctx) {
      const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
      if (!published && ctx && (ctx.interactive || ctx.answerKey)) {
        const built = this.build({ difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
        return require('../../lib/column-screen.js').screenOrKey(built, ctx, { regroup });
      }
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const used = new Set();
      const cards = [], probs = [];
      for (let i = 0; i < d.cards; i++) {
        let a, b, op, guard = 0, ok = false;
        while (!ok && guard++ < 400) {
          op = rng.pick(d.ops);
          a = rng.int(d.min, d.max);
          b = rng.int(d.bMin || d.min, d.bMax || d.max);
          if (op === '-' && b > a) [a, b] = [b, a];
          if (op === '-' && a === b) continue;
          if (op === '+' && a + b > d.sumMax) continue;
          const carries = op === '+' ? hasCarry(a, b) : hasBorrow(a, b);
          if (regroup !== carries) continue;
          // nt20-VAR d.acrossZero: subtraction page where the minuend carries
          // a 0 in the tens place (302 − 158 class) — the hardest borrow;
          // additive-only, undefined = current behavior
          if (d.acrossZero && !(op === '-' && a >= 100 && Math.floor(a / 10) % 10 === 0 && hasBorrow(a, b))) continue;
          // Level Set options (additive; undefined = the published behaviour)
          if (d.digits && !d.digits.includes(String(a).length)) continue;
          if (d.sameDigits && String(a).length !== String(b).length) continue;
          if (d.maxCarries && regroupCount(a, b, op) > d.maxCarries) continue;
          if (d.minCarries && regroupCount(a, b, op) < d.minCarries) continue;
          if (d.zeros === 2 && !(op === '-' && a >= 100 && a % 100 === 0 && hasBorrow(a, b))) continue;
          if (d.resultMin && (op === '+' ? a + b : a - b) < d.resultMin) continue;
          if (used.has(`${a}${op}${b}`)) continue;
          ok = true;
        }
        if (!ok) throw new Error(`${id}: could not fill card ${i + 1} (band too tight)`);
        used.add(`${a}${op}${b}`);
        cards.push(problemCard({ a, b, op, showCarryRow: regroup && op === '+', ...(d.cell ? { cell: d.cell } : {}) }));
        probs.push({ a, b, op });
      }
      return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: published ? {} : { problems: probs.map((p) => `${p.a}${p.op}${p.b}`) }, _probs: probs };
    },

    async verify(page) {
      const wantRegroup = regroup;
      return page.evaluate((wantRegroup) => {
        const fails = [];
        const carry = (x, y) => {
          let a = x, b = y;
          while (a > 0 || b > 0) { if ((a % 10) + (b % 10) > 9) return true; a = Math.floor(a / 10); b = Math.floor(b / 10); }
          return false;
        };
        const borrow = (x, y) => {
          let a = x, b = y;
          while (b > 0) { if ((a % 10) < (b % 10)) return true; a = Math.floor(a / 10); b = Math.floor(b / 10); }
          return false;
        };
        const blocks = document.querySelectorAll('[data-lcs-card] [data-lcs-a]');
        if (!blocks.length) fails.push('no problems');
        blocks.forEach((bl, i) => {
          const a = +bl.dataset.lcsA, b = +bl.dataset.lcsB, op = bl.dataset.lcsOp;
          const res = op === '+' ? a + b : a - b;
          if (res < 0) fails.push(`p${i + 1}: negative result`);
          const regrouped = op === '+' ? carry(a, b) : borrow(a, b);
          if (regrouped !== wantRegroup) fails.push(`p${i + 1}: regroup=${regrouped}, want ${wantRegroup}`);
          const cells = [...bl.querySelectorAll('[data-lcs-digit]')];
          const want = String(res);
          if (cells.length !== want.length) fails.push(`p${i + 1}: ${cells.length} answer cells for ${want}`);
          else cells.forEach((c, j) => {
            if (c.dataset.lcsDigit !== want[j]) fails.push(`p${i + 1}: cell ${j} != ${want[j]}`);
            if (c.textContent.trim() !== '') fails.push(`p${i + 1}: answer digit visible`);
          });
        });
        return fails;
      }, wantRegroup);
    },
  };
}

module.exports = { makeColumnType, regroupCount, hasCarry, hasBorrow };
