/**
 * K-353 — Tangram Puzzles: Cut Out the Pieces and Build Two Figures (nt10-D;
 * family key `tangram`, K, K.G.B.6, `default_subject: spatial-reasoning`).
 * Design: docs/worksheet-gen/b4-designs/K-353-tangram.md §2/§5.
 *
 * A MATERIALS + MODEL page, wordless in every locale: top-left the 216 px
 * cut-out square with its seven pieces drawn as cut lines (3 px teal on
 * cream) under a scissors strip, beside it the five-row colour legend
 * (swatch + piece glyph, no word), and below two stored figures at the SAME
 * scale drawn WITH their seams — the K model the child copies line for line.
 * Every drawing is a STORED placement of the 7 tans from the locale-neutral
 * bank data/b4/tangram-figures.js (validated at load); `rng` only picks WHICH
 * two figures. No answer is printed and there is none to hide: the page is
 * OPEN, so verify() is STRUCTURAL — it re-derives the seven tans of the
 * cut-out set from the `data-lcs-tan` polygon points (class areas, no
 * overlap, they tile the S x S square), the two figures from their stamps
 * (distinct, in the pool, seven tans each in solution mode or one solid path
 * in silhouette mode, edge floor 56), the legend rows and the scissors.
 *
 * Chrome budget (README 722; 677 under a four-line fi title): strip 30 +
 * template 221 (216 + the 2.5 px stroke pad each side) + gap 16 + the tallest
 * figure (boat 374) = 641 at d2/d3; the slack opens between the two blocks
 * (`justify-content:space-evenly`), never inside them. d1 (the 100 mm
 * true-size sheet, one rectangle at S 378) stacks 30 + 383 + 12 + 273 = 698
 * under a 700 body (the four-line title alone) and declares bodyMin 700;
 * under the 677 combination it is REPORTED by the gate (not shipped).
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED config, never the
 * level index:
 *   S        the family scale (px per unit square side): smallest tan edge =
 *            0.3536 S >= tokens.density.K.minElement (56) → S >= 158.4
 *   figures  how many stored figures row 2 draws (1 | 2)
 *   pool     the figure keys row 2 samples from (`square` is refused there —
 *            it is the template already on the page); every entry must fit
 *            two-up at S under the declared body
 *   seams    true = `solution` mode (cream tans, 2 px seams, 3 px outline);
 *            false = solid teal `silhouette`s (the harder K shadow page, d3)
 *   legend   the five-row colour legend beside the template
 *   Sg       the legend glyph scale (64)
 *   gap      the gap between the template block and the figure row (16;
 *            d1 declares 12 so its 100 mm sheet clears the 700 four-line-title
 *            body: 30 + 383 + 12 + 273 = 698)
 *   bodyMin  the body height the stack is checked against at build (677 =
 *            the four-line fi title + a three-line instruction; d1 declares
 *            700 = the four-line title alone; the d1 sheet is not shipped)
 *   mode     ADDITIVE (Phase 2): undefined = this base path, byte-identical.
 *            The five faces (compose K-358 · silhouette G1-354 · missing
 *            G1-355 · match G2-347 · count K-359) each add a render path +
 *            a verify() branch keyed on `data-lcs-mode`; until a face lands
 *            its mode REFUSES here (never a silent base render under a face
 *            title). Unknown modes refuse too.
 * build() reads ONLY data/b4/tangram.js (lib/b4-common.js `bank`: the
 * locale's strings block — a locale without one is a refusal, never an en
 * fallback) + data/b4/tangram-figures.js; never image-vocabulary.js, never
 * the picture index (themeAxis OFF, no picture on any face), never
 * approved-words. `theme` is ignored (themeless; coordinate.theme '').
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { TANGRAM_FIGURES: FIG } = require('../../data/b4/tangram-figures.js');
const TG = require('../../primitives/tangram.js');
const C4 = require('../../templates/components-b4.js');
const tokens = require('../../primitives/_tokens.js');
const { esc: escBase } = require('../../primitives/_svg.js');
const esc = (v) => escBase(v).replace(/'/g, '&#39;');

const ID = 'K-353';
const KEY = 'tangram';
const BODY_W = 675;
const STRIP_H = 30;
const BLOCK_GAP = 16;
const ROW_GAP = 24;
const FACE_MODES = ['compose', 'silhouette', 'missing', 'match', 'count'];
const K_FLOOR = tokens.density.K.minElement;   // 56
const PAD = tokens.stroke.primitive / 2 + 1;    // 2.5: the svg root's stroke pad each side

module.exports = {
  id: ID,
  slug: KEY,
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { S: 378, figures: 1, pool: ['rectangle'], seams: true, legend: true, Sg: 64, gap: 12, bodyMin: 700 },
    2: { S: 216, figures: 2, pool: FIG.BASE_POOL.slice(), seams: true, legend: true, Sg: 64, bodyMin: 677 },
    3: { S: 216, figures: 2, pool: FIG.BASE_POOL.slice(), seams: false, legend: true, Sg: 64, bodyMin: 677 },
  },
  i18n: {
    en: {
      title: 'Tangram Puzzles: Cut Out the Pieces and Build Two Figures',
      instruction: 'Color each piece like the legend, cut out the seven pieces along the lines, then lay them on the two figures below, line for line.',
    },
  },
  FACE_MODES,
  K_FLOOR,

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d, { locale }, ctx) {
    if (!bankLoc || typeof bankLoc !== 'object' || !bankLoc.strings) throw new Error(`${ID}: the ${locale} bank block carries no strings`);
    if (!d) throw new Error(`${ID}: no difficulty config`);
    if (d.mode !== undefined) {
      if (!FACE_MODES.includes(d.mode)) throw new Error(`${ID}: unknown mode "${d.mode}" (faces: ${FACE_MODES.join(' | ')})`);
      throw new Error(`${ID}: mode "${d.mode}" is a Phase-2 face — its render path lands with the face build; the base never renders under a face config`);
    }
    const rng = ctx.rng;
    const S = d.S;
    if (!(S > 0)) throw new Error(`${ID}: bad scale ${S}`);
    const minEdge = TG.h * S;
    if (minEdge < K_FLOOR) throw new Error(`${ID}: scale ${S} draws a ${minEdge.toFixed(1)} px small edge < the K floor ${K_FLOOR} (S >= ${(K_FLOOR / TG.h).toFixed(1)})`);
    if (!Number.isInteger(d.figures) || d.figures < 1 || d.figures > 2) throw new Error(`${ID}: figures ${d.figures} (1 or 2 fit beside each other)`);
    if (!Array.isArray(d.pool) || !d.pool.length) throw new Error(`${ID}: no figure pool`);
    for (const k of d.pool) if (!FIG.FIGURES[k]) throw new Error(`${ID}: pool names an unknown figure "${k}"`);
    if (d.pool.includes('square')) throw new Error(`${ID}: \`square\` is the template already on the page — refused in the figure pool`);
    const bodyMin = d.bodyMin || 677;
    const gap = d.gap == null ? BLOCK_GAP : d.gap;
    if (!(gap >= 8 && gap <= 24)) throw new Error(`${ID}: block gap ${gap} outside 8..24`);
    const set = FIG.figure('square');
    const templateH = Math.ceil(set.bbox.h * S + 2 * PAD);
    const rowMaxH = bodyMin - (STRIP_H + templateH + gap);
    const rowMaxW = d.figures === 1 ? BODY_W : (BODY_W - ROW_GAP) / 2;
    const fits = d.pool.filter((k) => { const b = FIG.figure(k).bbox; return b.w * S + 2 * PAD <= rowMaxW && b.h * S + 2 * PAD <= rowMaxH; });
    if (fits.length < d.figures) throw new Error(`${ID}: only ${fits.length} of the pool [${d.pool.join(' ')}] fit ${d.figures}-up at S ${S} under a ${bodyMin} body (row <= ${rowMaxW} x ${rowMaxH}) — refuse`);
    if (fits.length < d.pool.length) throw new Error(`${ID}: pool entries [${d.pool.filter((k) => !fits.includes(k)).join(' ')}] do not fit at S ${S} under a ${bodyMin} body — the config lies about its pool`);
    const keys = rng.sample(d.pool, d.figures);
    const figures = keys.map((k) => ({ key: k, tans: FIG.figure(k).tans }));

    const tpl = C4.templateBlock({ S, legend: d.legend !== false, Sg: d.Sg || 64, tans: set.tans });
    const row = C4.figureRow({ figures, S, seams: d.seams !== false, gap: ROW_GAP });
    const stack = tpl.height + gap + row.height;
    if (tpl.width > BODY_W) throw new Error(`${ID}: template block ${tpl.width} > ${BODY_W}`);
    if (row.width > BODY_W) throw new Error(`${ID}: figure row ${row.width} > ${BODY_W}`);
    if (stack > bodyMin) throw new Error(`${ID}: stack ${stack} > the ${bodyMin} body`);
    const cfg = { S, figures: d.figures, pool: d.pool, seams: d.seams !== false, legend: d.legend !== false, Sg: d.Sg || 64, gap, bodyMin };
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-cfg='${esc(JSON.stringify(cfg))}' data-lcs-scale="${S}" data-lcs-pool="${esc(d.pool.join(','))}" data-lcs-seams="${cfg.seams ? 1 : 0}" ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:${gap}px;min-height:0">${tpl.html}${row.html}</div>`;
    const meta = { S, figures: keys, seams: cfg.seams, legend: cfg.legend, stack, template: { w: tpl.width, h: tpl.height }, row: { w: row.width, h: row.height } };
    return { bodyHtml, meta };
  },

  async verify(page) {
    return page.evaluate(({ ID, K_FLOOR }) => {
      const f = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) { f.push('no root'); return f; }
      if (root.dataset.lcsMode) { f.push(`base verify on a face page (mode ${root.dataset.lcsMode})`); return f; }
      let cfg;
      try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { f.push('unreadable cfg'); return f; }
      const S = +cfg.S;
      if (!(S >= K_FLOOR / (Math.SQRT2 / 4))) f.push(`scale ${S} below the K floor (small edge ${(S * Math.SQRT2 / 4).toFixed(1)} < ${K_FLOOR})`);
      if (+root.dataset.lcsScale !== S) f.push('scale stamp ≠ cfg');
      const AREA = { L: 0.25, M: 0.125, S: 0.0625, Q: 0.125, P: 0.125 };
      const IDS = ['L1', 'L2', 'M', 'S1', 'S2', 'Q', 'P'];
      const pts = (el) => (el.getAttribute('points') || '').trim().split(/\s+/).map((p) => p.split(',').map(Number));
      const area = (p) => { let a = 0; for (let i = 0; i < p.length; i++) { const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length]; a += x1 * y2 - x2 * y1; } return a / 2; };
      const clip = (sub, clp) => { const sgn = area(clp) >= 0 ? 1 : -1; let out = sub; for (let i = 0; i < clp.length; i++) { const A = clp[i], B = clp[(i + 1) % clp.length]; const inp = out; out = []; const side = (p) => sgn * ((B[0] - A[0]) * (p[1] - A[1]) - (B[1] - A[1]) * (p[0] - A[0])); for (let j = 0; j < inp.length; j++) { const P = inp[j], Q = inp[(j + 1) % inp.length]; const sp = side(P), sq = side(Q); if (sp >= -1e-9) out.push(P); if ((sp >= -1e-9) !== (sq >= -1e-9)) { const t = sp / (sp - sq); out.push([P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]); } } if (!out.length) break; } return out.length ? Math.abs(area(out)) : 0; };
      const minEdge = (p) => Math.min(...p.map((v, i) => Math.hypot(v[0] - p[(i + 1) % p.length][0], v[1] - p[(i + 1) % p.length][1])));
      const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
      const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
      const inBody = (el, what) => { const r = el.getBoundingClientRect(); if (r.left < body.left - 0.6 || r.right > body.right + 0.6 || r.top < body.top - 0.6 || r.bottom > foot + 0.6) f.push(`${what} outside the body / into the footer`); };
      const unscaled = (svg, what) => { const r = svg.getBoundingClientRect(); if (Math.abs(r.width - +svg.getAttribute('width')) > 0.6 || Math.abs(r.height - +svg.getAttribute('height')) > 0.6) f.push(`${what} is CSS-scaled (${r.width.toFixed(1)}x${r.height.toFixed(1)} vs ${svg.getAttribute('width')}x${svg.getAttribute('height')})`); };
      // the seven tans of one drawing: ids, class areas, no overlap, sum, floor
      const checkTans = (svg, what, opts) => {
        const polys = [...svg.querySelectorAll('polygon[data-lcs-tan]')];
        const ids = polys.map((p) => p.dataset.lcsTan);
        if (ids.slice().sort().join() !== IDS.slice().sort().join()) { f.push(`${what}: tans [${ids.join(' ')}] are not the seven`); return; }
        const P = polys.map(pts);
        let sum = 0;
        polys.forEach((p, i) => {
          const cls = p.dataset.lcsClass;
          if (cls !== ids[i][0]) f.push(`${what}: ${ids[i]} stamped class ${cls}`);
          const a = Math.abs(area(P[i]));
          const want = AREA[cls] * S * S;
          if (Math.abs(a - want) > want * 0.01) f.push(`${what}: ${ids[i]} area ${a.toFixed(0)} ≠ ${want.toFixed(0)}`);
          sum += a;
          if (minEdge(P[i]) < K_FLOOR - 0.5) f.push(`${what}: ${ids[i]} edge ${minEdge(P[i]).toFixed(1)} < the K floor ${K_FLOOR}`);
          if (Math.abs(parseFloat(p.getAttribute('stroke-width')) - opts.seam) > 0.01) f.push(`${what}: ${ids[i]} seam ${p.getAttribute('stroke-width')} ≠ ${opts.seam}`);
          if (p.getAttribute('fill').toUpperCase() !== opts.fill) f.push(`${what}: ${ids[i]} fill ${p.getAttribute('fill')}`);
        });
        if (Math.abs(sum - S * S) > S * S * 0.01) f.push(`${what}: tan areas sum ${sum.toFixed(0)} ≠ S² ${S * S}`);
        for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) if (clip(P[i], P[j]) > 1) f.push(`${what}: ${ids[i]} overlaps ${ids[j]}`);
        if (+svg.dataset.lcsTans !== 7) f.push(`${what}: data-lcs-tans ${svg.dataset.lcsTans} ≠ 7`);
        return P;
      };
      // the cut-out set
      const sets = [...root.querySelectorAll('svg[data-lcs-set]')];
      if (sets.length !== 1) f.push(`${sets.length} cut-out sets`);
      else {
        const svg = sets[0];
        if (svg.dataset.lcsMode !== 'template' || svg.dataset.lcsFigure !== 'square') f.push('the set is not the square in template mode');
        if (+svg.dataset.lcsScale !== S) f.push('set scale ≠ cfg');
        const P = checkTans(svg, 'set', { seam: 3, fill: '#FBF3E4' });
        if (P) {
          const xs = P.flat().map((v) => v[0]), ys = P.flat().map((v) => v[1]);
          const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys);
          if (Math.abs(w - S) > 0.6 || Math.abs(h - S) > 0.6) f.push(`set bbox ${w.toFixed(1)}x${h.toFixed(1)} ≠ S ${S}`);
        }
        if (svg.querySelector('path, text, image')) f.push('the set carries a path / text / image');
        unscaled(svg, 'set'); inBody(svg, 'set');
      }
      if (root.querySelectorAll('[data-lcs-scissors]').length !== 1) f.push('scissors glyph count ≠ 1');
      // legend
      const rows = [...root.querySelectorAll('[data-lcs-legend]')];
      if (cfg.legend) {
        if (rows.map((r) => r.dataset.lcsLegend).join() !== 'L,M,S,Q,P') f.push(`legend rows [${rows.map((r) => r.dataset.lcsLegend).join(' ')}] ≠ L M S Q P`);
        const fills = new Set();
        rows.forEach((r) => {
          const sw = r.querySelector('[data-lcs-swatch]');
          const g = r.querySelector('[data-lcs-glyph]');
          if (!sw) f.push(`legend ${r.dataset.lcsLegend}: no swatch`);
          else { const fl = (sw.getAttribute('fill') || '').toUpperCase(); if (!/^#[0-9A-F]{6}$/.test(fl)) f.push(`legend ${r.dataset.lcsLegend}: swatch fill ${fl}`); if (fills.has(fl)) f.push(`legend ${r.dataset.lcsLegend}: swatch colour repeats`); fills.add(fl); }
          if (!g || g.dataset.lcsGlyph !== r.dataset.lcsLegend) f.push(`legend ${r.dataset.lcsLegend}: glyph ${g && g.dataset.lcsGlyph}`);
          if (r.querySelector('text') || (r.textContent || '').trim()) f.push(`legend ${r.dataset.lcsLegend}: carries text`);
          inBody(r, `legend ${r.dataset.lcsLegend}`);
        });
        const tb = sets[0] && sets[0].getBoundingClientRect();
        if (tb && rows.length) { const lb = rows[0].getBoundingClientRect(); if (lb.left < tb.right + 20) f.push('legend runs into the template'); }
      } else if (rows.length) f.push('a legend on a legend:false config');
      // the figures
      const figs = [...root.querySelectorAll('svg[data-lcs-figure]:not([data-lcs-set])')];
      if (figs.length !== cfg.figures) f.push(`${figs.length} figures ≠ cfg ${cfg.figures}`);
      const keys = figs.map((s) => s.dataset.lcsFigure);
      if (new Set(keys).size !== keys.length) f.push(`figures repeat (${keys.join(' ')})`);
      keys.forEach((k) => { if (!cfg.pool.includes(k)) f.push(`figure "${k}" not in the pool [${cfg.pool.join(' ')}]`); if (k === 'square') f.push('the square is drawn as a figure (it is the template)'); });
      const wantMode = cfg.seams ? 'solution' : 'silhouette';
      figs.forEach((svg, i) => {
        const what = `figure ${i + 1} (${svg.dataset.lcsFigure})`;
        if (svg.dataset.lcsMode !== wantMode) f.push(`${what}: mode ${svg.dataset.lcsMode} ≠ ${wantMode}`);
        if (+svg.dataset.lcsScale !== S) f.push(`${what}: scale ${svg.dataset.lcsScale} ≠ ${S}`);
        if (svg.querySelector('text, image, img')) f.push(`${what}: carries text or an image`);
        if (wantMode === 'solution') {
          checkTans(svg, what, { seam: 2, fill: '#FBF3E4' });
          const o = svg.querySelectorAll('path[data-lcs-outline]');
          if (o.length !== 1) f.push(`${what}: ${o.length} outline paths`);
          else if (o[0].getAttribute('fill') !== 'none' || Math.abs(parseFloat(o[0].getAttribute('stroke-width')) - 3) > 0.01) f.push(`${what}: outline is not a 3 px unfilled path`);
          if (svg.querySelector('[data-lcs-silhouette]')) f.push(`${what}: a silhouette path on a seamed figure`);
        } else {
          if (svg.querySelector('polygon[data-lcs-tan]')) f.push(`${what}: tan polygons on a shadow (seams visible)`);
          const p = svg.querySelectorAll('path[data-lcs-silhouette]');
          if (p.length !== 1) f.push(`${what}: ${p.length} silhouette paths`);
          else {
            const fill = (p[0].getAttribute('fill') || '').toUpperCase(), stroke = (p[0].getAttribute('stroke') || '').toUpperCase();
            if (fill !== stroke || fill !== '#146B5E') f.push(`${what}: shadow fill ${fill} / stroke ${stroke} (must both be teal)`);
          }
          if (+svg.dataset.lcsTans !== 0) f.push(`${what}: data-lcs-tans ${svg.dataset.lcsTans} on a shadow`);
        }
        unscaled(svg, what); inBody(svg, what);
      });
      // no two drawings overlap; the row sits under the template block
      const all = [...sets, ...figs].map((s) => s.getBoundingClientRect());
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i], b = all[j]; if (a.left < b.right - 0.6 && b.left < a.right - 0.6 && a.top < b.bottom - 0.6 && b.top < a.bottom - 0.6) f.push(`drawings ${i + 1} and ${j + 1} overlap`); }
      const tplBlock = root.querySelector('[data-lcs-template-block]'), rowEl = root.querySelector('[data-lcs-figure-row]');
      if (!tplBlock || !rowEl) f.push('template block / figure row missing');
      else { const a = tplBlock.getBoundingClientRect(), b = rowEl.getBoundingClientRect(); const g = +cfg.gap || 16; if (b.top < a.bottom + g - 0.6) f.push(`figure row ${b.top.toFixed(0)} starts above the template block's bottom + ${g} (${a.bottom.toFixed(0)})`); if (a.width > 675.6 || b.width > 675.6) f.push('a block wider than 675'); }
      // nothing else on the page
      if (root.querySelector('img, text, [data-lcs-answer], .ws-answerbox, .ws-card, input')) f.push('the base page carries a picture, text, a card or an answer');
      if ((root.textContent || '').trim()) f.push(`text on the body: "${root.textContent.trim().slice(0, 30)}"`);
      return f;
    }, { ID, K_FLOOR });
  },
};
