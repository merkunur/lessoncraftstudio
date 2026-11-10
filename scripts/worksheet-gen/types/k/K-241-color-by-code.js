/**
 * K-241 — Color by code (fr "coloriage magique" — one of the biggest French
 * school-printable terms; en color-by-number; de Rechenbilder register).
 * The legend banner maps a CODE to a color: swatch square + the NATIVE color
 * word (the word is the B&W-proof, literacy-bearing signal). The child
 * colors outline shapes. Outlines are warm ink; swatches use the governed
 * tokens.codeColors namespace (legend-swatch-only — see _tokens.js).
 * d1: shape code (color all triangles red) · d2: addition code (color by
 * sum) · d3: mixed ± code. CCSS K.G.A.2 / K.OA.A.5 fluency dressing.
 * Makers (2026-11-02): three more codes on the same page — mode 'words' (a sight word in each shape, data/literacy/sight-
 * words.js), 'facts' (a multiplication fact, the code its product), 'sounds' (a picture in each shape, the code the
 * letter its name starts with: the reviewed bins of data/literacy/sort-by-beginning-sound.json); d.top caps a ± code's
 * biggest number (levels of the faces); five codes take a fifth crayon. The published pages build exactly as before.
 * Three more (2026-11-02): 'parity' (a number in each shape, the code even / odd — data/parity-words.json, the Odd and
 * Even family's reviewed words), 'numwords' (a number WORD in each wide shape, the code its numeral — lib/number-words.js)
 * and 'own' (numbers, and a key the teacher or the child fills: an empty crayon and a line for the colour — ungraded).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el } = require('../../primitives/_svg.js');
const { COLOR_WORDS } = require('../../data/color-words.js');
const { fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');

const COLOR_KEYS = ['red', 'blue', 'yellow', 'green'];
const SWATCH = { red: tokens.codeColors.codeRed, blue: tokens.codeColors.codeBlue, yellow: tokens.codeColors.codeYellow, green: tokens.codeColors.codeGreen, orange: tokens.codeColors.codeOrange };

function shapeSvg(kind, size, inner, fill, w, h) {
  const s = size, c = s / 2;
  const stroke = { fill: fill || tokens.color.white, stroke: tokens.color.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' };
  let el1;
  if (kind === 'pill') el1 = el('rect', { x: 3, y: 3, width: w - 6, height: h - 6, rx: (h - 6) / 2, ...stroke });
  else if (kind === 'circle') el1 = el('circle', { cx: c, cy: c, r: c - 3, ...stroke });
  else if (kind === 'square') el1 = el('rect', { x: 3, y: 3, width: s - 6, height: s - 6, rx: 6, ...stroke });
  else if (kind === 'triangle') el1 = el('path', { d: `M ${c} 4 L ${s - 3} ${s - 4} L 3 ${s - 4} Z`, ...stroke });
  else if (kind === 'star') {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? c - 2 : (c - 2) * 0.45;
      const a = -Math.PI / 2 + i * Math.PI / 5;
      pts.push(`${(c + r * Math.cos(a)).toFixed(1)},${(c + r * Math.sin(a)).toFixed(1)}`);
    }
    el1 = el('polygon', { points: pts.join(' '), ...stroke });
  } else { // heart — wide lobes, school-poster proportions
    el1 = el('path', {
      d: `M ${c} ${s - 6} C ${s * 0.02} ${s * 0.52} ${s * 0.08} ${s * 0.06} ${c} ${s * 0.3} C ${s * 0.92} ${s * 0.06} ${s * 0.98} ${s * 0.52} ${c} ${s - 6}`,
      ...stroke,
    });
  }
  return el1 + (inner || '');
}

function legendBanner({ entries, mode, screen, ctx }) {
  // entries: [{code, colorKey, word}] — code is a shape kind (d1) or number (d2/3)
  const items = entries.map((e) => {
    const codeCell = mode === 'shapes'
      ? svgRoot({ width: 30, height: 30, label: e.code }, shapeSvg(e.code, 30), {})
      : `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#3A3530">${e.label != null ? e.label : e.code}</span>`;
    // an open key (mode 'own'): an empty crayon square and a line for the colour's name — or the teacher's word
    const word = e.blank ? (e.word ? `<span style="font-family:'Nunito';font-weight:800;font-size:17px;color:#3A3530"${slot.attr(ctx, 'key' + e.slot, 0)}>${e.word}</span>`
      : `<span style="display:inline-block;width:92px;border-bottom:2px solid #8A8276;height:20px"${slot.attr(ctx, 'key' + e.slot, 0)}></span>`)
      : `<span style="font-family:'Nunito';font-weight:800;font-size:17px;color:#3A3530">${e.word}</span>`;
    // makers (2026-11-02): a sight-word code is a slot (tap the word in the code: another word of the bank)
    // on the screen a code is a bin that PAINTS the tapped item its colour (data-lcs-fill); without it the tap wrote the
    // legend's text over the item (found 2026-11-10 by screen.js's colour-bin check)
    return `<span style="display:inline-flex;align-items:center;gap:8px" data-lcs-legend="${e.code}" data-lcs-color="${e.colorKey}"${screen ? ` data-lcs-bin="${e.code}"${e.blank ? '' : ` data-lcs-fill="${SWATCH[e.colorKey]}"`}` : ''}${e.slot != null ? slot.attr(ctx, 'word', e.slot) : ''}>` +
      codeCell +
      `<span style="font-family:'Baloo 2';font-weight:700;font-size:16px;color:#8A8276">→</span>` +
      svgRoot({ width: 22, height: 22, label: e.colorKey },
        el('rect', { x: 1, y: 1, width: 20, height: 20, rx: 5, fill: e.blank ? tokens.color.white : SWATCH[e.colorKey], stroke: tokens.color.ink, 'stroke-width': e.blank ? 1.6 : 1 }), {}) +
      word + `</span>`;
  }).join('');
  return `<div class="ws-scene-banner" style="gap:24px;flex-wrap:wrap">${items}</div>`;
}

module.exports = {
  id: 'K-241',
  slug: 'color-by-code',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'color-by-number',
  themeAxis: { applicable: false },
  difficulty: {
    1: { mode: 'shapes', codes: 3, items: 12, size: 92 },
    2: { mode: 'sums', codes: 4, items: 12, size: 100, max: 10, ops: ['+'] },
    3: { mode: 'sums', codes: 4, items: 12, size: 100, max: 10, ops: ['+', '-'] },
  },
  i18n: {
    en: {
      title: 'Color by Code',
      instruction: 'Look at the code. Then color every shape to match it.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const words = COLOR_WORDS[(locale || 'en').slice(0, 2)] || COLOR_WORDS.en;
    const colorKeys = rng.shuffle(d.codes > 4 ? COLOR_KEYS.concat(['orange']) : COLOR_KEYS).slice(0, d.codes);
    const stageW = 660, stageH = 615;
    const cols = 4, rows = 3;
    const cellW = stageW / cols, cellH = stageH / rows;
    const items = [];
    let entries;

    const loc = (locale || 'en').slice(0, 2);
    if (d.mode === 'shapes') {
      const kinds = rng.shuffle(['triangle', 'circle', 'square', 'star', 'heart']).slice(0, d.codes);
      entries = kinds.map((k, i) => ({ code: k, colorKey: colorKeys[i], word: words[colorKeys[i]] }));
      // guarantee ≥3 of each kind across 12 items (fewer when the items cannot hold 3 of every kind)
      const bag = [];
      const per = Math.min(3, Math.floor(d.items / d.codes));
      kinds.forEach((k) => { for (let j = 0; j < per; j++) bag.push(k); });
      while (bag.length < d.items) bag.push(rng.pick(kinds));
      const order = rng.shuffle(bag);
      order.forEach((k, i) => items.push({ kind: k, code: k, inner: '' }));
    } else if (d.mode === 'parity') {
      // a number in every shape (from d.range, never 0, all different), the code even / odd; each kind on half the shapes, give or take one
      const PW = require('../../data/parity-words.json').words;
      const pw = PW[loc] || PW.en;
      entries = ['even', 'odd'].map((k, i) => ({ code: k, label: pw[k], colorKey: colorKeys[i], word: words[colorKeys[i]] }));
      const [lo, hi] = d.range, nums = [];
      for (let n = Math.max(1, lo); n <= hi; n++) nums.push(n);
      let pick;
      for (let g = 0; g < 50; g++) { pick = rng.sample(nums, d.items); const ev = pick.filter((n) => n % 2 === 0).length; if (Math.abs(2 * ev - d.items) <= 2) break; }
      const kinds = ['circle', 'square', 'triangle', 'star', 'heart'];
      pick.forEach((n) => items.push({ kind: rng.pick(kinds), code: n % 2 === 0 ? 'even' : 'odd', num: n, plainText: String(n) }));
    } else if (d.mode === 'numwords') {
      // a number word in every wide shape, the code its numeral (d.range, never 0); each code on 2 shapes or more
      const { numberWord } = require('../../lib/number-words.js');
      const [lo, hi] = d.range, nums = [];
      for (let n = Math.max(1, lo); n <= hi; n++) nums.push(n);
      const values = rng.sample(nums, d.codes);
      entries = values.map((v, i) => ({ code: v, colorKey: colorKeys[i], word: words[colorKeys[i]] }));
      const bag = []; values.forEach((v) => { bag.push(v, v); }); while (bag.length < d.items) bag.push(rng.pick(values));
      rng.shuffle(bag).forEach((v) => { const w = numberWord(v, loc); if (!w) throw new Error('K-241: no number word for ' + v + ' in ' + loc); items.push({ kind: 'pill', code: v, word: w }); });
    } else if (d.mode === 'own') {
      // an open key: numbers 1 to codes, each on 2 shapes or more; the key's colour names are the teacher's (slots) or blank
      const values = []; for (let v = 1; v <= d.codes; v++) values.push(v);
      entries = values.map((v, i) => ({ code: v, colorKey: colorKeys[i], blank: true, slot: i, word: slot.text(ctx, '', 'key' + i, 14).replace(/[&<>"]/g, '') }));
      const bag = []; values.forEach((v) => { bag.push(v, v); }); while (bag.length < d.items) bag.push(rng.pick(values));
      const kinds = ['circle', 'square', 'triangle', 'star', 'heart'];
      rng.shuffle(bag).forEach((v) => items.push({ kind: rng.pick(kinds), code: v, plain: true }));
    } else if (d.mode === 'words' || d.mode === 'sounds') {
      // a word or a picture in every shape (roomy shapes only), each code on at least two shapes
      const roomy = d.mode === 'words' ? ['circle', 'square', 'heart'] : ['circle', 'square'];   // a picture needs the room
      if (d.mode === 'words') {
        const pool = (require('../../data/literacy/sight-words.js').SIGHT_WORDS[loc] || []).slice(0, d.wordPool || 24).filter((w) => [...w].length <= 6);
        if (pool.length < d.codes) throw new Error('K-241: ' + loc + ' has ' + pool.length + ' short sight words');
        const ws = slot.words(ctx, rng.sample(pool, d.codes), pool, 'word');
        entries = ws.map((w, i) => ({ code: w, colorKey: colorKeys[i], word: words[colorKeys[i]], slot: i }));
        const bag = []; ws.forEach((w) => { bag.push(w, w); }); while (bag.length < d.items) bag.push(rng.pick(ws));
        rng.shuffle(bag).forEach((w) => items.push({ kind: rng.pick(roomy), code: w, word: w }));
      } else {
        const S = require('../../data/literacy/sort-by-beginning-sound.json');
        const all = (S.itemsByLocale && S.itemsByLocale[loc]) || (loc === 'en' ? S.items : null);
        if (!all) throw new Error('K-241: no reviewed first-sound pictures in ' + loc);
        const letters = rng.sample([...new Set(all.map((it) => it.bin))], d.codes);
        entries = letters.map((l, i) => ({ code: l, colorKey: colorKeys[i], word: words[colorKeys[i]] }));
        const per = Math.floor(d.items / d.codes);
        const drawn = letters.flatMap((l) => rng.sample(all.filter((it) => it.bin === l), per));
        if (drawn.length !== per * d.codes) throw new Error('K-241: too few first-sound pictures in ' + loc);
        // makers (2026-11-02): every picture is a slot — any reviewed picture of the page's letters (a picture of another
        // letter of the code takes that letter's colour; a letter keeps at least two shapes: per is 4)
        const chosen = slot.anyPictures(ctx, drawn, all.filter((it) => letters.includes(it.bin)), 'pic');
        rng.shuffle(chosen.map((_, i) => i)).forEach((i) => items.push({ kind: rng.pick(roomy), code: chosen[i].bin, pic: chosen[i], slot: i }));
      }
    } else {
      // number codes: distinct target values, each value ≥2 shapes
      // nt20-VAR: d.values = custom value pool (sums-to-20 page); mode
      // 'numbers' = the classic plain color-by-number (numeral in the shape,
      // no arithmetic — the legend numeral IS the code)
      const values = rng.sample(d.values || [2, 3, 4, 5, 6, 7, 8, 9, 10], d.codes);
      // a multiplication code (mode 'facts'): every product has at least two facts among the level's factors
      const factsOf = (v) => { const f = []; for (const a of d.factors || []) for (const b of d.factors || []) if (a * b === v) f.push([a, b]); return f; };
      entries = values.map((v, i) => ({ code: v, colorKey: colorKeys[i], word: words[colorKeys[i]] }));
      const bag = [];
      values.forEach((v) => { bag.push(v, v); });
      while (bag.length < d.items) bag.push(rng.pick(values));
      const order = rng.shuffle(bag);
      const kinds = ['circle', 'square', 'triangle', 'star', 'heart'];
      if (d.mode === 'numbers') {
        order.forEach((v) => items.push({ kind: rng.pick(kinds), code: v, plain: true }));
        entries = entries.slice(); // same legend shape; no expressions anywhere
      } else if (d.mode === 'facts') {
        const used = new Map();
        const wide = ['circle', 'square'];   // "10 × 4" is wider than a star's middle
        order.forEach((v) => {
          const fs = factsOf(v);
          if (fs.length < 2) throw new Error('K-241: product ' + v + ' has fewer than two facts');
          const k = used.get(v) || 0; used.set(v, k + 1);
          const [a, b] = k < fs.length ? rng.shuffle(fs)[0] : rng.pick(fs);
          items.push({ kind: rng.pick(wide), code: v, expr: `${a} × ${b}` });
        });
      } else if (d.top) {
        // a ± code inside 0 … d.top (the faces' levels): every expression lands on its value, nothing above the top
        const usedExpr = new Set();
        order.forEach((v) => {
          let a, b, op, guard = 0;
          do {
            op = rng.pick(d.ops);
            if (op === '+') { a = rng.int(0, v); b = v - a; } else { b = rng.int(1, Math.max(1, d.top - v)); a = v + b; }
            guard++;
          } while ((a > d.top || usedExpr.has(`${a}${op}${b}`)) && guard < 80);
          if (a > d.top) throw new Error('K-241: no expression for ' + v + ' within ' + d.top);
          usedExpr.add(`${a}${op}${b}`);
          items.push({ kind: rng.pick(kinds), code: v, expr: `${a} ${op === '-' ? '−' : '+'} ${b}` });
        });
      } else {
      const usedExpr = new Set();
      order.forEach((v) => {
        // find a fresh ± expression landing exactly on v
        let a, b, op, guard = 0;
        do {
          op = rng.pick(d.ops);
          if (op === '+') { a = rng.int(0, v); b = v - a; }
          else { b = rng.int(1, 9); a = v + b; }
          guard++;
        } while ((op === '-' && a > 12 || usedExpr.has(`${a}${op}${b}`)) && guard < 60);
        usedExpr.add(`${a}${op}${b}`);
        const expr = `${a} ${op === '-' ? '−' : '+'} ${b}`;
        items.push({ kind: rng.pick(kinds), code: v, expr });
      });
      }
    }

    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const colorOf = Object.fromEntries(entries.map((e) => [String(e.code), e.colorKey]));
    // jittered grid scatter of outline shapes
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
    const picked = rng.shuffle(cells).slice(0, d.items);
    const shapes = items.map((it, i) => {
      const [c, r] = picked[i];
      const size = d.size + rng.int(-10, 8);
      const W = it.kind === 'pill' ? Math.round(cellW - 10) : size, H = it.kind === 'pill' ? Math.round(size * 0.78) : size;
      const jx = rng.int(-8, 8), x = c * cellW + (cellW - W) / 2 + (it.kind === 'pill' ? Math.max(-4, Math.min(4, jx)) : jx);
      const y = r * cellH + (cellH - H) / 2 + rng.int(-8, 8);
      const innerLabel = it.expr || it.plainText || (it.plain ? String(it.code) : it.word || '');
      const inner = it.pic
        ? el('image', { href: fileUri(it.pic.theme, it.pic.noun), x: size * 0.22, y: size * (it.kind === 'heart' ? 0.2 : 0.22), width: size * 0.56, height: size * 0.56, 'data-lcs-pic': it.pic.noun })
        : innerLabel && it.kind === 'pill'
        ? el('text', {
            x: W / 2, y: H / 2, 'font-family': tokens.font.display, 'font-weight': 700, 'data-lcs-word': it.word,
            'font-size': Math.min(Math.round(size * 0.26), Math.floor((W - 18) / (0.5 * [...innerLabel].length))),
            fill: tokens.color.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central',
          }, innerLabel)
        : innerLabel
        ? el('text', {
            x: size / 2, y: size * (it.kind === 'triangle' ? 0.68 : it.kind === 'heart' ? 0.5 : 0.5),
            'font-family': tokens.font.display, 'font-size': Math.round(size * (it.plain || it.plainText ? 0.3 : it.word ? 0.21 : 0.2)), 'font-weight': 700,
            fill: tokens.color.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central',
          }, innerLabel)
        : '';
      // makers (2026-11-02): the KEY paints every shape its code's colour (a drawn sample); the SCREEN makes the code a
      // palette and the shapes drop targets (tap a colour, then the shapes) — the catalogue page is unchanged
      // an open key (mode 'own') has no answers: no painted key, no screen answers
      const open = d.mode === 'own';
      return `<span style="position:absolute;left:${x.toFixed(0)}px;top:${y.toFixed(0)}px" data-lcs-item="${it.code}"${it.num != null ? ` data-lcs-num="${it.num}"` : ''}${it.expr ? ` data-lcs-expr="${it.expr}"` : ''}${it.pic ? slot.attr(ctx, 'pic', it.slot) : ''}` +
        (open ? '' : key ? ' data-lcs-key-sample="1"' : scr ? ` data-lcs-drop="1" data-lcs-answer="${it.code}"` : '') + `>` +
        svgRoot({ width: W, height: H, label: String(it.code) }, shapeSvg(it.kind, size, inner, key && !open ? SWATCH[colorOf[it.code]] : null, W, H), {}) + `</span>`;
    }).join('');

    const bodyHtml =
      legendBanner({ entries, mode: d.mode, screen: scr && d.mode !== 'own', ctx }) +
      `<div data-ws-content style="flex:1;position:relative;margin-top:6px">` +
      // the key's title carries " — Answer Key" and may take a second line: its shapes are drawn 4 % smaller (the same
      // places, scaled), so the key never reaches the footer
      (key ? `<div style="position:relative;width:${stageW}px;height:${Math.round(stageH * 0.96)}px;margin:0 auto"><div style="position:absolute;left:0;top:0;width:${stageW}px;height:${stageH}px;transform:scale(0.96);transform-origin:top center">${shapes}</div></div></div>`
        : `<div style="position:relative;width:${stageW}px;height:${stageH}px;margin:0 auto">${shapes}</div></div>`);
    return { bodyHtml, meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const legend = [...document.querySelectorAll('[data-lcs-legend]')];
      const items = [...document.querySelectorAll('[data-lcs-item]')];
      if (legend.length < 2) fails.push(`legend has ${legend.length} entries`);
      if (items.length < 2 * legend.length) fails.push(`only ${items.length} shapes for ${legend.length} codes`);
      const codes = new Set(legend.map((l) => l.dataset.lcsLegend));
      if (codes.size !== legend.length) fails.push('duplicate legend codes');
      const colors = legend.map((l) => l.dataset.lcsColor);
      if (new Set(colors).size !== colors.length) fails.push('duplicate legend colors');
      const counts = {};
      items.forEach((it) => {
        const code = it.dataset.lcsItem;
        if (!codes.has(code)) fails.push(`item code ${code} not in legend`);
        counts[code] = (counts[code] || 0) + 1;
        if (it.dataset.lcsNum != null && (+it.dataset.lcsNum % 2 === 0 ? 'even' : 'odd') !== code) fails.push(`${it.dataset.lcsNum} is not ${code}`);
        if (it.dataset.lcsNum === '0') fails.push('a 0 on the page');
        const expr = it.dataset.lcsExpr;
        if (expr) {
          const m = expr.match(/^(\d+) ([+−×]) (\d+)$/);
          if (!m) { fails.push(`bad expr "${expr}"`); return; }
          const v = m[2] === '+' ? +m[1] + +m[3] : m[2] === '×' ? +m[1] * +m[3] : +m[1] - +m[3];
          if (v !== +code) fails.push(`expr ${expr} != code ${code}`);
        }
      });
      codes.forEach((code) => {
        if ((counts[code] || 0) < 2) fails.push(`code ${code} appears ${counts[code] || 0}× (want ≥2)`);
      });
      return fails;
    });
  },
};
