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
const platform = require('./platform/index.js');   // labels.json (disk in Node, preloaded in a maker) — S6, 2026-11-01
const { DESIGNS, build: buildArt, isLib, load: loadDesign } = require('../data/cbn/designs.js');
const FL = require('./fl-art.js');
const R = require('./cbn-render.js');
const { COLOR_WORDS } = require('../data/color-words.js');

const LABELS = path.join(__dirname, '..', 'data', 'cbn', 'labels.json');
let _labels = null;
function labelsFor(id) {
  if (isLib(id)) { const r = loadDesign(id); return { ok: true, labels: r.labels, num: r.num }; }   // a library picture carries its own numbers (tools/fl-cbn.js)
  if (!_labels) _labels = platform.exists(LABELS) ? platform.readJson(LABELS) : {};
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

/**
 * The key of a coded page (K-587 sums, G2-498 products, K-588 letters): each colour's number becomes what the page prints.
 * → { n: { show, clue } }: show = on the picture, clue = in the key (a sum the child solves, or the letter itself).
 */
function codeFor(code, num, rng, loc, lv) {
  const ns = Object.values(num).sort((a, b) => a - b), out = {};
  if (code === 'letters') {
    // the key letters are the ones a font-9 number of a tiny section holds (lib/cbn-render.js TINY_FONT; measured
    // 2026-11-09 in Chromium, Baloo 2, 30 pictures): the plain capitals put 0.2-0.7 % of their pixels on the outline and
    // Ø 0.3 %, but W 3.1 %, Æ 3.4 % and the accented capitals (Å Ä Ö Ü É Ç Ñ) 2-5 %, so those never join the key. I and O
    // stay out as before (read as 1 and 0). Every language keeps 18-23 letters for at most 8 colours.
    const { letterUnits, unitForms } = require('../types/k/K-238-letter-tracing.js');
    const L = rng.shuffle(letterUnits(loc).map((u) => unitForms(u, loc).cap).filter((c) => !!c && /^[A-HJ-NP-VX-ZØ]$/.test(c))).slice(0, ns.length).sort((a, b) => a.localeCompare(b, loc));
    ns.forEach((n, i) => { out[n] = { show: L[i], clue: L[i] }; });
    return out;
  }
  const pool = [];
  if (code === 'sums') { const M = { 1: 10, 2: 15, 3: 20 }[lv]; for (let v = 3; v <= M; v++) pool.push(v); }
  if (code === 'products') for (const v of { 1: [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20], 2: [12, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36], 3: [24, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 49, 54, 56, 63, 64, 72, 81] }[lv]) pool.push(v);
  const vals = rng.shuffle(pool).slice(0, ns.length);
  ns.forEach((n, i) => {
    const v = vals[i];
    if (code === 'sums') { const a = rng.int(1, v - 1); out[n] = { show: String(v), clue: `${a} + ${v - a} =`, answer: v }; return; }
    const fs2 = []; for (let a = 2; a <= 9; a++) if (v % a === 0 && v / a >= 2 && v / a <= 9) fs2.push(a);
    const a = rng.pick(fs2); out[n] = { show: String(v), clue: `${a} × ${v / a} =`, answer: v };
  });
  return out;
}

function keyRow(num, loc, screen = false, coded = null, reveal = false) {
  const words = COLOR_WORDS[loc];
  if (!words) throw new Error('cbn: no colour words for ' + loc);
  const entries = Object.entries(num).sort((a, b) => a[1] - b[1]);
  const wordOf = (c) => { const w = words[c === 'none' ? 'white' : c]; if (!w) throw new Error(`cbn: no ${loc} word for colour "${c}"`); return w; };
  const chipBox = 'box-sizing:border-box;border:2px solid #E6DCCB;border-radius:14px;background:#FFF';
  const numSpan = (n, px) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${coded && coded[n].answer ? Math.round(px * 0.8) : px}px;line-height:1;color:#2E2E2E;min-width:18px;text-align:center${coded ? ';white-space:nowrap' : ''}">${coded ? coded[n].clue : n}</span>`;
  const shown = (n) => (coded ? coded[n].show : n);
  if (screen) {
    // the SCREEN key is the palette: three big crayon buttons per row, number + crayon over the word (>= 44 px on a phone)
    const w = 212;
    const chips = entries.map(([c, n]) => { const word = wordOf(c);
      const px = Math.max(14, Math.min(24, Math.floor((w - 16) / (0.56 * [...word].length))));
      return `<span data-lcs-crayon="${c}" data-lcs-label="${esc(shown(n) + ' ' + word)}" style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:${w}px;height:98px;${chipBox}">` +
        `<span style="display:inline-flex;align-items:center;gap:10px">${numSpan(n, 34)}${crayon(R.PALETTE[c], 96, 32)}</span>` +
        `<span style="font-family:Nunito;font-weight:800;font-size:${px}px;line-height:1.1;color:#3A3530;white-space:nowrap">${esc(word)}</span></span>`; });
    return `<div data-lcs-key style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:660px">${chips.join('')}</div>`;
  }
  // a key that prints sums takes two columns: the sum, a box for its answer, the crayon, the colour
  if (coded && Object.values(coded).some((x) => x.answer)) {
    const rows = entries.map(([c, n]) => `<span data-lcs-crayon="${c}" data-lcs-label="${esc(shown(n) + ' ' + wordOf(c))}" style="display:inline-flex;align-items:center;gap:6px;width:324px;height:50px;padding:0 6px;${chipBox}">${numSpan(n, 30)}<span class="ws-answerbox" style="width:48px;height:38px;display:inline-flex;align-items:center;justify-content:center;font:700 22px 'Baloo 2',cursive">${reveal ? coded[n].answer : ''}</span>${crayon(R.PALETTE[c], 54, 24)}<span style="font-family:Nunito;font-weight:800;font-size:15px;line-height:1.1;color:#3A3530;white-space:nowrap">${esc(wordOf(c))}</span></span>`);
    return `<div data-lcs-key style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;width:660px">${rows.join('')}</div>`;
  }
  const perRow = entries.length <= 4 ? entries.length : Math.ceil(entries.length / 2);
  const w = Math.floor(660 / perRow) - 8;
  const chips = entries.map(([c, n]) => { const word = wordOf(c);
    const px = Math.max(13, Math.min(17, Math.floor((w - 100) / (0.55 * [...word].length))));
    return `<span data-lcs-crayon="${c}" data-lcs-label="${esc(shown(n) + ' ' + word)}" style="display:inline-flex;align-items:center;gap:6px;width:${w}px;height:46px;padding:0 6px;${chipBox}">` +
      `${numSpan(n, 26)}${crayon(R.PALETTE[c])}<span style="font-family:Nunito;font-weight:800;font-size:${px}px;line-height:1.1;color:#3A3530;white-space:nowrap">${esc(word)}</span></span>`; });
  return `<div data-lcs-key style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:660px">${chips.join('')}</div>`;
}

function makeCbnType({ id, slug, kind, i18n, code, gradeBand }) {
  const mine = () => DESIGNS.filter((d) => d.kind === kind);
  // a library picture (docs/makers/FLAGSHIP.md): its record is its design, its name the picture's own
  const libDesign = (u) => ({ id: u, kind, level: loadDesign(u).level, lib: FL.keyOf(u), names: {} });
  // a two-digit key (sums, products) needs room for two digits in EVERY numbered section: only pictures whose smallest
  // number has radius >= MIN_R_COMPACT (measured 2026-11-09: "24" / "81" put 0 % of their pixels on the outline there,
  // 6.5 % in the smaller sections). Only one level-3 design is that roomy, so a level-3 key also takes level-2 pictures:
  // on these pages the KEY carries the level (sums to 20, the harder tables), not the picture.
  const wide = code === 'sums' || code === 'products';
  const roomy = (u) => { if (!wide) return true; try { return Math.min(...labelsFor(u).labels.map((l) => l[2])) >= R.MIN_R_COMPACT; } catch (e) { return false; } };
  const levelFits = (dl, lv) => dl === lv || (wide && lv === 3 && dl === 2);
  const wideLib = (lv) => FL.keys('cbn', (l, e) => levelFits(l, lv) && (e.cbnR || 0) >= R.MIN_R_COMPACT);
  const byId = (u) => { if (isLib(u)) return libDesign(u); const d = mine().find((x) => x.id === u); if (!d) throw new Error(`${id}: no ${kind} design "${u}"`); return d; };
  const nameOf = (d, loc) => { const n = d.lib ? FL.nameOf(d.lib, loc) : d.names[loc] || null; if (!n) throw new Error(`${id}: design "${d.id}" has no ${loc} name`); return n; };
  const spec = {
    id, slug,
    gradeBand: gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: 'color-by-number',
    themeAxis: { applicable: false },
    unitAxis: {
      applicable: true,
      hideInMaker: kind === 'picture',   // the panel's theme tiles and picture picker replace the word list
      units: () => mine().filter((d) => roomy(d.id)).map((d) => d.id),
      exemplar: () => { const own = mine().filter((d) => roomy(d.id)); const d = own.find((x) => x.level === 2) || own[0]; return d ? d.id : FL.slugOf(wideLib(2)[0]); },
      levelOf: (u) => byId(u).level,
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
    build({ difficulty, locale, unit, fixed }, ctx) {
      const loc = String(locale || 'en').slice(0, 2);
      // a maker page with no design (makers 2026-11-02): the copy picks one of its LEVEL's designs (level 2, copy 1 = the
      // exemplar, as published); the catalogue always names its design
      const lvDesigns = () => { const ex = spec.unitAxis.exemplar(loc); const l = mine().filter((x) => levelFits(x.level, Number(difficulty)) && roomy(x.id)); return l.some((x) => x.id === ex) ? [byId(ex)].concat(l.filter((x) => x.id !== ex)) : l; };
      // a maker retry (ctx.retry "<maker copy>.<k>") moves k designs on from the copy it retries (ctx.variant)
      const pickByCopy = () => { const l = lvDesigns(); const v = String((ctx && (ctx.seedVariant || ctx.variant)) || 1); const n0 = /^\d+$/.test(v) ? +v : (+v.split('.')[0] || 1) + (+v.split('.')[1] || 0); const n = ctx && ctx.retry ? (Math.max(1, parseInt(ctx.variant || 1, 10) || 1) + (+String(ctx.retry).split('.')[1] || 0)) : n0; return l.length ? l[(n - 1) % l.length] : byId(spec.unitAxis.exemplar(loc)); };
      const picked = !unit && ctx && ctx.slotsOut;
      let d = unit ? byId(unit) : picked ? pickByCopy() : byId(spec.unitAxis.exemplar(loc));
      // a maker page: the teacher's picture or theme; New version walks the level's designs, then the library's pictures of
      // this level (docs/makers/FLAGSHIP.md). The catalogue never comes here: it names its design and has no slotsOut.
      let artPool = null;
      if (ctx && ctx.slotsOut && !fixed) {
        // a sums or multiplication key: only roomy pictures (roomy / wideLib above); the level's own designs are filtered
        // the same way by lvDesigns
        const lv = Number(difficulty), lib = kind === 'picture' ? (wide ? wideLib(lv) : FL.keys('cbn', (l) => l === lv)) : [];
        const copy = Number((ctx && ctx.makerCopy) || 1), own = lvDesigns(), hit = FL.choose(ctx, lib, copy);
        if (hit) d = byId(FL.slugOf(hit));
        else if (copy > 1 && !unit) { const n = copy - 1, all = own.length + lib.length; d = n % all < own.length ? own[n % all] : byId(FL.slugOf(lib[n % all - own.length])); }
        if (kind === 'picture') artPool = lib;
      }
      // a coded page with no picture named (a sample, a thumbnail): the level's first roomy design or library picture
      if (wide && !unit && (!levelFits(d.level, Number(difficulty)) || !roomy(d.id))) { const lw = wideLib(Number(difficulty)); const alt = lvDesigns()[0] || (kind === 'picture' && lw.length ? byId(FL.slugOf(lw[0])) : null); if (alt) d = alt; }
      // the picker is told the picture the page SHOWS, after that fallback (2026-11-09: K-587 / G3-479 level 1 showed the
      // book while the picker said "no picture", so choosing the book changed nothing — own-input + slots gates)
      if (artPool) FL.report(ctx, artPool, d.lib || null);
      if (!levelFits(d.level, Number(difficulty))) throw new Error(`${id}: "${d.id}" is a level ${d.level} design, not level ${difficulty}`);
      if (!roomy(d.id)) throw new Error(`${id}: "${d.id}" has a section too small for a two-digit answer`);
      const art = buildArt(d);
      const L = labelsFor(d.id);
      const coded = code ? codeFor(code, L.num, ctx.rng, loc, Number(difficulty)) : null;
      const labels = L.labels.map(([x, y, r, n]) => ({ x, y, r, n: coded ? coded[n].show : n }));
      const answerKey = !!(ctx && ctx.answerKey);
      const screen = !!(ctx && ctx.interactive);
      // on screen the palette is bigger, so the picture gives up a little width (3 rows of crayons at 8 colours)
      const sums = coded && Object.values(coded).some((x) => x.answer);
      const pw = screen ? (Object.keys(L.num).length > 6 ? 440 : 520) : sums ? Math.min(600, Math.floor((700 - Math.ceil(Object.keys(L.num).length / 2) * 56 - 18) * 600 / 560)) : 600;
      const svg = R.toSvg(art, answerKey ? { mode: 'colour', width: pw } : { mode: 'line', labels, width: pw });
      const body = `<div data-ws-content data-lcs-type="${id}" data-lcs-design="${d.id}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">` +
        `<div${kind === 'picture' ? FL.tap(ctx) : ''} style="border:3px solid #2E2E2E;border-radius:22px;overflow:hidden;line-height:0;background:#FFF">${svg}</div>` +
        keyRow(L.num, loc, screen, coded, answerKey) + `</div>`;
      return { bodyHtml: body, meta: { design: d.id, colours: Object.keys(L.num) }, ...(picked || d.id !== unit ? { unit: d.id } : {}) };
    },
    async verify(page) {
      return page.evaluate(() => {
        const f = [];
        const svg = document.querySelector('svg[data-lcs-prim="cbn-art"]');
        if (!svg) return ['no picture'];
        const nums = [...svg.querySelectorAll('[data-lcs-num]')].map((t) => t.getAttribute('data-lcs-num'));
        const key = [...document.querySelectorAll('[data-lcs-crayon]')];
        if (!key.length) f.push('no crayon key');
        const inKey = new Set(key.map((k) => k.getAttribute('data-lcs-label').split(' ')[0]));
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
    const d = isLib(did) ? { id: did, kind } : DESIGNS.find((x) => x.id === did);
    if (!d) throw new Error(`${id} oracle: no design in ctx`);
    const regs = buildArt(d).regions;
    return items.map((it) => { const r = regs[+((it.meta || {})['data-lcs-region'])]; if (!r) throw new Error(`${id} oracle: no region ${(it.meta || {})['data-lcs-region']}`); return r.colour; });
  };
  return spec;
}

module.exports = { makeCbnType, keyRow, crayon, codeFor };
