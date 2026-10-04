/**
 * cbn-type.js — the illustrated Color by Number worksheet types (2026-10-04): K-393 Scenes, K-394 Pictures.
 * One deck = one design (data/cbn/designs.js) — the design is the unit (unitAxis), so each deck is titled
 * "Color by Number: <design name>" and the Level Set waves enumerate one copy per design at its own level.
 *
 * Page: the numbered line drawing (primitives/cbn-art, numbers placed by tools/cbn-preview.js → data/cbn/labels.json)
 * in a rounded frame, then the crayon key: the number, a crayon in its colour, the native colour word.
 * Screen (tap-paint): render-instance lays the page's own drawing over the screen render; the key's crayons are the
 * palette. Answer key: the picture in full colour.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { DESIGNS, build: buildArt } = require('../data/cbn/designs.js');
const R = require('./cbn-render.js');
const { COLOR_WORDS } = require('../data/color-words.js');

const LABELS = path.join(__dirname, '..', 'data', 'cbn', 'labels.json');
let _labels = null;
function labelsFor(id) {
  if (!_labels) _labels = fs.existsSync(LABELS) ? JSON.parse(fs.readFileSync(LABELS, 'utf8')) : {};
  const l = _labels[id];
  if (!l) throw new Error(`cbn: no labels for "${id}" — run node tools/cbn-preview.js (it labels and gates every design)`);
  if (l.ok !== true) throw new Error(`cbn: design "${id}" failed its gates (numbers / solid objects / frame) — fix it, re-run tools/cbn-preview.js`);
  return l;
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/** a little crayon in its colour (the key swatch) */
function crayon(hex, w = 64, h = 26) {
  const tip = 14, body = w - tip - 6;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" data-lcs-prim="cbn-crayon">` +
    `<path d="M3 5Q3 3 5 3H${body}L${body + tip} ${h / 2}L${body} ${h - 3}H5Q3 ${h - 3} 3 ${h - 5}Z" fill="${hex}" stroke="${R.INK}" stroke-width="1.8" stroke-linejoin="round"/>` +
    `<path d="M${body} 3V${h - 3}" stroke="${R.INK}" stroke-width="1.6"/><path d="M${body + tip - 5} ${h / 2 - 2.6}L${body + tip} ${h / 2}L${body + tip - 5} ${h / 2 + 2.6}Z" fill="${R.INK}"/>` +
    `<path d="M11 3V${h - 3}M17 3V${h - 3}" stroke="${R.INK}" stroke-width="1.2" opacity=".55"/></svg>`;
}

function keyRow(num, loc, screen = false) {
  const words = COLOR_WORDS[loc];
  if (!words) throw new Error('cbn: no colour words for ' + loc);
  const entries = Object.entries(num).sort((a, b) => a[1] - b[1]);
  const wordOf = (c) => { const w = words[c]; if (!w) throw new Error(`cbn: no ${loc} word for colour "${c}"`); return w; };
  const chipBox = 'box-sizing:border-box;border:2px solid #E6DCCB;border-radius:14px;background:#FFF';
  const numSpan = (n, px) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;line-height:1;color:#2E2E2E;min-width:18px;text-align:center">${n}</span>`;
  if (screen) {
    // the SCREEN key is the palette: three big crayon buttons per row, number + crayon over the word (>= 44 px on a phone)
    const w = 212;
    const chips = entries.map(([c, n]) => { const word = wordOf(c);
      const px = Math.max(14, Math.min(24, Math.floor((w - 16) / (0.56 * [...word].length))));
      return `<span data-lcs-crayon="${c}" data-lcs-label="${esc(n + ' ' + word)}" style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:${w}px;height:98px;${chipBox}">` +
        `<span style="display:inline-flex;align-items:center;gap:10px">${numSpan(n, 34)}${crayon(R.PALETTE[c], 96, 32)}</span>` +
        `<span style="font-family:Nunito;font-weight:800;font-size:${px}px;line-height:1.1;color:#3A3530;white-space:nowrap">${esc(word)}</span></span>`; });
    return `<div data-lcs-key style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:660px">${chips.join('')}</div>`;
  }
  const perRow = entries.length <= 4 ? entries.length : Math.ceil(entries.length / 2);
  const w = Math.floor(660 / perRow) - 8;
  const chips = entries.map(([c, n]) => { const word = wordOf(c);
    const px = Math.max(13, Math.min(17, Math.floor((w - 100) / (0.55 * [...word].length))));
    return `<span data-lcs-crayon="${c}" data-lcs-label="${esc(n + ' ' + word)}" style="display:inline-flex;align-items:center;gap:6px;width:${w}px;height:46px;padding:0 6px;${chipBox}">` +
      `${numSpan(n, 26)}${crayon(R.PALETTE[c])}<span style="font-family:Nunito;font-weight:800;font-size:${px}px;line-height:1.1;color:#3A3530;white-space:nowrap">${esc(word)}</span></span>`; });
  return `<div data-lcs-key style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:660px">${chips.join('')}</div>`;
}

function makeCbnType({ id, slug, kind, i18n }) {
  const mine = () => DESIGNS.filter((d) => d.kind === kind);
  const byId = (u) => { const d = mine().find((x) => x.id === u); if (!d) throw new Error(`${id}: no ${kind} design "${u}"`); return d; };
  const nameOf = (d, loc) => { const n = d.names[loc] || null; if (!n) throw new Error(`${id}: design "${d.id}" has no ${loc} name`); return n; };
  const spec = {
    id, slug,
    gradeBand: 'K',
    assetClass: 'icon-placement',
    exerciseType: 'color-by-number',
    themeAxis: { applicable: false },
    unitAxis: {
      applicable: true,
      units: () => mine().map((d) => d.id),
      exemplar: () => (mine().find((d) => d.level === 2) || mine()[0]).id,
      tokens: (unit, loc) => { const n = nameOf(byId(unit), (loc || 'en').slice(0, 2)); return { U: n, L: n, UNIT: n }; },
    },
    // the level is the DESIGN's (measured complexity, lib/cbn-render.js LEVEL_CAPS); a design builds only at its level
    difficulty: { 1: {}, 2: {}, 3: {} },
    i18n,
    levelSetWords(m) { return [m.design]; },
    interactive: {
      kind: 'tap-paint', instructionKey: 'paint',
      /** the robot's oracle: every coloured part's crayon, recomputed from the DESIGN (never the page) */
      oracle: (items, l) => {
        const d = DESIGNS.find((x) => x.id === (items.ctxDesign || null));
        void d;
        return items.map((it) => it.want);
      },
    },
    build({ difficulty, locale, unit }, ctx) {
      const loc = String(locale || 'en').slice(0, 2);
      const d = unit ? byId(unit) : byId(this.unitAxis.exemplar(loc));
      if (d.level !== Number(difficulty)) throw new Error(`${id}: "${d.id}" is a level ${d.level} design, not level ${difficulty}`);
      const art = buildArt(d);
      const L = labelsFor(d.id);
      const labels = L.labels.map(([x, y, r, n]) => ({ x, y, r, n }));
      const answerKey = !!(ctx && ctx.answerKey);
      const screen = !!(ctx && ctx.interactive);
      // on screen the palette is bigger, so the picture gives up a little width (3 rows of crayons at 8 colours)
      const pw = screen ? (Object.keys(L.num).length > 6 ? 440 : 520) : 600;
      const svg = R.toSvg(art, answerKey ? { mode: 'colour', width: pw } : { mode: 'line', labels, width: pw });
      const body = `<div data-ws-content data-lcs-type="${id}" data-lcs-design="${d.id}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">` +
        `<div style="border:3px solid #2E2E2E;border-radius:22px;overflow:hidden;line-height:0;background:#FFF">${svg}</div>` +
        keyRow(L.num, loc, screen) + `</div>`;
      return { bodyHtml: body, meta: { design: d.id, colours: Object.keys(L.num) } };
    },
    async verify(page) {
      return page.evaluate(() => {
        const f = [];
        const svg = document.querySelector('svg[data-lcs-prim="cbn-art"]');
        if (!svg) return ['no picture'];
        const nums = [...svg.querySelectorAll('[data-lcs-num]')].map((t) => +t.getAttribute('data-lcs-num'));
        const key = [...document.querySelectorAll('[data-lcs-crayon]')];
        if (!key.length) f.push('no crayon key');
        const inKey = new Set(key.map((k) => +k.getAttribute('data-lcs-label').split(' ')[0]));
        for (const n of new Set(nums)) if (!inKey.has(n)) f.push(`number ${n} on the picture is not in the key`);
        for (const n of inKey) if (!nums.includes(n)) f.push(`key number ${n} is not on the picture`);
        const box = svg.getBoundingClientRect(), pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
        if (box.bottom > pg.bottom + 0.5) f.push('the picture runs off the page');
        for (const k of key) { const r = k.getBoundingClientRect(); if (r.bottom > pg.bottom - 18) f.push('the key reaches the footer'); }
        return f;
      });
    },
  };
  // the oracle needs the design: the render-capture stamps each item's region; the design id rides in ctx
  spec.interactive.oracle = (items, l, c) => {
    const did = c && c.design;
    const d = DESIGNS.find((x) => x.id === did);
    if (!d) throw new Error(`${id} oracle: no design in ctx`);
    const regs = buildArt(d).regions;
    return items.map((it) => { const r = regs[+((it.meta || {})['data-lcs-region'])]; if (!r) throw new Error(`${id} oracle: no region ${(it.meta || {})['data-lcs-region']}`); return r.colour; });
  };
  return spec;
}

module.exports = { makeCbnType, keyRow, crayon };
