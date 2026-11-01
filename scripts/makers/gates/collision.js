#!/usr/bin/env node
/**
 * Gate 14 `collision` (ARCHITECTURE §15; task 4 of the ten, 2026-11-01): no two rendered content elements of a page
 * overlap. Every existing page gate measures ONE box against a floor (the page box, the footer band, a font size);
 * none asks whether two boxes collide (CLAUDE.md §23.6 "none asked whether two rendered things COLLIDE").
 *
 * Per built maker × template × en + fi × level × 2 themes × 2 copies (the maker's own runtime, mounted in Chromium at
 * the catalogue's 703 × 945): inside `.ws-body` every visible pictures (`img`), drawn figure (a top-level `svg`), write
 * box (`.ws-answerbox`, an empty `[data-lcs-answer]`), text leaf (an element with its own text), badge and chip is a
 * box — measured by its INK (glyphs, opaque picture pixels, drawn svg geometry; a decorative rotation is undone).
 * Two boxes collide when their ink overlaps by more than TOL px in both directions and neither contains the other. The inside of an svg is its own drawing (not
 * measured; the figure's box is). Intentional overlaps are listed in EXEMPT with the reason, per selector pair.
 *
 * Non-vacuity: every page must yield ≥ 2 boxes (a page where nothing was measured fails).
 * Poisons, both directions, every run: a text leaf placed over a picture must FAIL; a page's chips pushed into each
 * other must FAIL; the real page must PASS.
 *
 *   node scripts/makers/gates/collision.js [--makers=a,b] [--locales=en,fi] [--copies=2] [--keys] [--quick] [--json=out]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const MP = require('./lib/maker-pages.js');

const A = MP.args();
const QUICK = !!A.quick;
const LOCS = String(A.locales || (QUICK ? 'en' : 'en,fi')).split(',');
const COPIES = Number(A.copies || (QUICK ? 1 : 2));
const TOL = 1.0;   // px of ink overlap in BOTH directions: sub-pixel rounding, a hairline shared by neighbours

/**
 * Intentional overlaps: [selector of a, selector of b, reason]. A pair is exempt when a matches one and b the other
 * (either order). Keep this list small and each reason true of what the child sees.
 */
const EXEMPT = [
  ['[data-lcs-key-sample], [data-lcs-key-sample] *', '*', 'the answer key draws its sample (a faint extra picture, a tally, a colouring) over the task on purpose'],
  ['[data-lcs-crossed] svg', 'img', 'the taken-away pictures are crossed out: the X is drawn over them (picture-equation crossoutGroup)'],
  ['svg[data-lcs-prim="number-line"]', '.ws-answerbox', 'a label box sits on its tick of the number line by design (G2-395 label the number line)'],
  ['[data-lcs-house] > svg', '*', 'the odd / even house outline frames its content: the tiles and boxes live inside the house by design (G1-351)'],
  ['svg[data-lcs-ink]', '*', "the teacher's own drawing lies over the page by design"],
];

/**
 * Runs in the page: the INK of every content element of the body, and every pair whose ink overlaps.
 * Ink, not layout boxes (the first version compared boxes and accused big digits whose line boxes touch, a badge beside
 * a picture's transparent margin, a tally beside a frame — nothing a child sees):
 *   text   per text node, per line: the glyph ink from canvas metrics (actualBoundingBox) placed on the line's baseline
 *   img    the picture's opaque bounds (alpha scan, cached per picture), scaled into its layout box (rotation undone)
 *   svg    the union of its drawn children's geometry boxes (a fill="none" stroke-less hit rect draws nothing)
 *   box / badge / chip   the element box itself (a border, a filled badge, a filled chip ARE ink)
 */
function collide({ tol, exempt }) {
  const body = document.querySelector('.ws-body') || document.querySelector('[data-lcs-page]');
  const els = Array.prototype.slice.call(body.querySelectorAll('*'));
  const cv = document.createElement('canvas'), cx = cv.getContext('2d', { willReadFrequently: true });
  const alphaCache = new Map();
  /** opaque bounds of a picture as fractions of its natural size (null = fully transparent / not loaded) */
  const alphaBounds = (img) => {
    const key = img.currentSrc || img.src;
    if (alphaCache.has(key)) return alphaCache.get(key);
    let out = null;
    if (img.complete && img.naturalWidth) {
      const w = Math.min(256, img.naturalWidth), h = Math.round(img.naturalHeight * (w / img.naturalWidth)) || 1;
      cv.width = w; cv.height = h; cx.clearRect(0, 0, w, h);
      try {
        cx.drawImage(img, 0, 0, w, h);
        const d = cx.getImageData(0, 0, w, h).data;
        let l = w, t = h, r = -1, b = -1;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { if (d[(y * w + x) * 4 + 3] > 24) { if (x < l) l = x; if (x > r) r = x; if (y < t) t = y; if (y > b) b = y; } }
        if (r >= 0) out = { l: l / w, t: t / h, r: (r + 1) / w, b: (b + 1) / h };
      } catch (e) { out = { l: 0, t: 0, r: 1, b: 1 }; }
    }
    alphaCache.set(key, out);
    return out;
  };
  /** glyph ink rects of a text node, one per line */
  const textInk = (node, el) => {
    const cs = getComputedStyle(el);
    cx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    const range = document.createRange(); range.selectNodeContents(node);
    const rects = Array.prototype.slice.call(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0);
    const m = cx.measureText(node.textContent.trim());
    const fa = m.fontBoundingBoxAscent, fd = m.fontBoundingBoxDescent;
    const aa = m.actualBoundingBoxAscent, ad = m.actualBoundingBoxDescent;
    return rects.map((r) => {
      // the line box holds the content area (font ascent + descent) centred by half-leading; the baseline sits
      // fontAscent below the content top; the ink spans the text's own ascent / descent around it
      const half = (r.height - (fa + fd)) / 2;
      const base = r.top + half + fa;
      return { l: r.left, t: base - aa, r: r.right, b: base + ad };
    });
  };
  const DRAWN = 'path, rect, circle, ellipse, line, polyline, polygon, text, image, use';
  const svgInk = (svg) => {
    let u = null;
    for (const g of svg.querySelectorAll(DRAWN)) {
      const gs = getComputedStyle(g);
      const fill = g.getAttribute('fill') || gs.fill, stroke = g.getAttribute('stroke') || gs.stroke;
      const noFill = fill === 'none', noStroke = !stroke || stroke === 'none';
      if (noFill && noStroke && g.tagName.toLowerCase() !== 'text') continue;
      if (parseFloat(gs.opacity) === 0 || gs.visibility === 'hidden') continue;
      const r = g.getBoundingClientRect(); if (r.width <= 0 && r.height <= 0) continue;
      const sw = noStroke ? 0 : (parseFloat(g.getAttribute('stroke-width') || gs.strokeWidth) || 1) / 2;
      const b = { l: r.left - sw, t: r.top - sw, r: r.right + sw, b: r.bottom + sw };
      u = u ? { l: Math.min(u.l, b.l), t: Math.min(u.t, b.t), r: Math.max(u.r, b.r), b: Math.max(u.b, b.b) } : b;
    }
    return u;
  };
  const cand = [];
  for (const el of els) {
    const tag = el.tagName.toLowerCase();
    if (el.closest('svg') && tag !== 'svg') continue;              // inside a drawing: the drawing's own business
    if (tag === 'svg' && el.parentElement && el.parentElement.closest('svg')) continue;
    if (tag === 'br' || tag === 'style' || tag === 'script') continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
    const base = { el, tag, cls: (el.getAttribute('class') || '').trim() };
    if (tag === 'img') {
      const t = el.style.transform, had = cs.transform !== 'none';
      if (had) el.style.transform = 'none';
      const r = el.getBoundingClientRect();
      if (had) el.style.transform = t;
      const ab = alphaBounds(el);
      if (!ab || r.width <= 0) continue;
      cand.push({ ...base, kind: 'img', r: { l: r.left + ab.l * r.width, t: r.top + ab.t * r.height, r: r.left + ab.r * r.width, b: r.top + ab.b * r.height } });
    } else if (tag === 'svg') {
      const u = svgInk(el); if (!u) continue;
      cand.push({ ...base, kind: 'svg', r: u });
    } else if (el.classList.contains('ws-answerbox') || (el.hasAttribute('data-lcs-answer') && !el.children.length) || el.classList.contains('ws-card-badge') || el.classList.contains('ws-chip')) {
      const r = el.getBoundingClientRect(); if (r.width <= 0 || r.height <= 0) continue;
      cand.push({ ...base, kind: el.classList.contains('ws-card-badge') ? 'badge' : el.classList.contains('ws-chip') ? 'chip' : 'box', r: { l: r.left, t: r.top, r: r.right, b: r.bottom } });
    } else {
      for (const n of el.childNodes) {
        if (n.nodeType !== 3 || !n.textContent.trim()) continue;
        for (const r of textInk(n, el)) if (r.r - r.l > 0 && r.b - r.t > 0) cand.push({ ...base, kind: 'text', text: n.textContent.trim(), r });
      }
    }
  }
  const isEx = (a, b) => exempt.some(([sa, sb]) => (a.el.matches(sa) && b.el.matches(sb)) || (a.el.matches(sb) && b.el.matches(sa)));
  const hits = [];
  const name = (c) => c.kind + ':' + c.tag + (c.cls ? '.' + c.cls.split(/\s+/)[0] : '');
  for (let i = 0; i < cand.length; i++) for (let j = i + 1; j < cand.length; j++) {
    const a = cand[i], b = cand[j];
    if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
    const ix = Math.min(a.r.r, b.r.r) - Math.max(a.r.l, b.r.l), iy = Math.min(a.r.b, b.r.b) - Math.max(a.r.t, b.r.t);
    if (ix <= tol || iy <= tol) continue;
    if (isEx(a, b)) continue;
    hits.push({ a: name(a), b: name(b), ix: Math.round(ix * 10) / 10, iy: Math.round(iy * 10) / 10, ta: (a.text || a.el.textContent || '').trim().slice(0, 20), tb: (b.text || b.el.textContent || '').trim().slice(0, 20), at: { x: Math.round(Math.max(a.r.l, b.r.l)), y: Math.round(Math.max(a.r.t, b.r.t)) } });
  }
  return { boxes: cand.length, figures: cand.filter((c) => c.kind === 'svg').length, hits };
}

if (require.main !== module) { module.exports = { collide, EXEMPT, TOL }; return; }

(async () => {
  const makers = MP.builtMakers(A.makers);
  const m = await new MP.Mounter().open();
  let fails = 0, pages = 0, boxes = 0;
  const report = [];
  const fail = (s) => { fails++; if (fails <= 80) console.log('FAIL ' + s); };
  const exempt = EXEMPT.map(([a, b]) => [a, b]);
  const run = async (html) => { const page = await m.mount(html, 703); return page.evaluate(collide, { tol: TOL, exempt }); };

  for (const { maker, tj } of makers) {
    let n = 0;
    for (const t of tj.templates) {
      const type = MP.loadType(t);
      for (const loc of LOCS.filter((l) => t.locales.includes(l))) {
        for (const o of MP.settingsSpace(t, loc, { themes: QUICK ? 1 : 2, units: 1, copies: COPIES, sample: LOCS.indexOf(loc) })) {
          const tag = `${maker} ${t.id} ${loc} L${o.difficulty} v${o.variant}${o.theme ? ' ' + o.theme : ''}${o.unit ? ' ' + o.unit : ''}`;
          let r;
          try { r = MP.buildPage(t, type, tj, loc, o, { answerKey: !!A.keys && (t.keyLevels || []).includes(o.difficulty) }); } catch (e) { fail(`${tag}: build — ${e.message}`); continue; }
          for (const [what, html] of [['page', r.html], ['key', r.keyHtml]]) {
            if (!html) continue;
            const c = await run(html);
            pages++; n++; boxes += c.boxes;
            if (!c.boxes || (c.boxes < 2 && !c.figures)) fail(`${tag} ${what}: measured nothing (${c.boxes} boxes)`);
            if (c.hits.length) {
              const seen = new Set();
              const uniq = c.hits.filter((h) => { const k = h.a + '|' + h.b; if (seen.has(k)) return false; seen.add(k); return true; });
              report.push({ maker, id: t.id, locale: loc, level: o.difficulty, variant: o.variant, theme: o.theme, unit: o.unit, what, hits: c.hits.length, pairs: uniq });
              fail(`${tag} ${what}: ${c.hits.length} collisions — ` + uniq.slice(0, 3).map((h) => `${h.a} × ${h.b} (${h.ix}×${h.iy} px${h.ta || h.tb ? ' "' + (h.ta || h.tb) + '"' : ''})`).join('; '));
            }
          }
        }
      }
    }
    console.log(`${maker}: ${n} pages measured`);
  }

  // ---- poisons, both directions (counting K-002 en L2)
  {
    const K002 = require(path.join(MP.REPO, 'scripts/worksheet-gen/types/k/K-002-count-and-circle.js'));
    const tj = { answerKey: { en: 'Answer key' } };
    const base = MP.buildPage({ id: 'K-002' }, K002, tj, 'en', { difficulty: 2, theme: 'animals', unit: null, variant: 1 });
    const good = await run(base.html);
    if (good.hits.length) fail('poison control: the real K-002 page collides (' + good.hits.slice(0, 2).map((h) => h.a + ' × ' + h.b).join('; ') + ')');
    if (good.boxes < 10) fail('poison control: K-002 measured ' + good.boxes + ' boxes (want ≥ 10)');
    // (1) a text leaf over a picture (card 1 made the positioning box; the text sits on its first icon row)
    const card1 = '<section class="ws-card" data-lcs-card="1">';
    const p1 = base.html.replace(card1, card1.replace('>', ' style="position:relative">') + '<span class="ws-poison" style="position:absolute;left:40px;top:40px;font-size:20px;z-index:5">over the picture</span>');
    if (p1 === base.html) throw new Error('poison 1: card 1 not found');
    const r1 = await run(p1);
    if (!r1.hits.some((h) => (/text:span\.ws-poison/.test(h.a) || /text:span\.ws-poison/.test(h.b)) && (/img/.test(h.a) || /img/.test(h.b)))) fail('poison 1: a text placed over a picture PASSED (' + r1.hits.length + ' hits)');
    // (2) chips pushed into each other
    const p2 = base.html.replace('</head>', '<style>.ws-choices .ws-chip+.ws-chip{margin-left:-30px}</style></head>');
    const r2 = await run(p2);
    if (!r2.hits.some((h) => /chip/.test(h.a) && /chip/.test(h.b))) fail('poison 2: chips pushed into each other PASSED');
    // (3) an exempt pair must NOT fire (the exemption list works), a non-exempt one must: the same overlap, the overlay tagged as a key sample
    const p3 = base.html.replace('<div class="ws-choices">', '<span data-lcs-key-sample style="position:absolute;left:30px;top:-60px;font-size:20px">sample</span><div class="ws-choices">').replace('<section class="ws-card" data-lcs-card="1">', '<section class="ws-card" data-lcs-card="1" style="position:relative">');
    const r3 = await run(p3);
    if (r3.hits.length) fail('poison 3: an exempt (key sample) overlay FAILED the page');
  }

  await m.close();
  if (m.errors.length) fail('page errors: ' + m.errors.slice(0, 3).join(' | '));
  if (A.json) fs.writeFileSync(A.json, JSON.stringify(report, null, 1));
  // the summary tells the two classes apart: an ink overlap a child sees (over 3 px) and a hairline contact (every
  // overlap ≤ 3 px: a card badge on the first pixels of a picture, a ring or a box; a divider line touching a picture)
  const byTemplate = {}, hair = {};
  for (const r of report) {
    const big = r.pairs.some((p) => Math.min(p.ix, p.iy) > 3);
    const o = big ? byTemplate : hair;
    (o[r.id] = o[r.id] || new Set()).add(`${r.locale} L${r.level}${r.what === 'key' ? ' key' : ''}`);
  }
  const list = (o) => Object.entries(o).map(([id, s]) => `${id} (${[...s].join(', ')})`).join(' · ');
  if (Object.keys(byTemplate).length) console.log('\ncolliding templates (an ink overlap over 3 px): ' + list(byTemplate));
  if (Object.keys(hair).length) console.log('\nhairline contacts (every overlap ≤ 3 px): ' + list(hair));
  console.log(`collision: ${pages} pages, ${boxes} boxes measured, ${report.length} pages with collisions in ${Object.keys(byTemplate).length + Object.keys(hair).length} templates (${Object.keys(hair).length} hairline only)` + (fails ? `; ${fails} failing` : '; poisons fire both ways'));
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('collision: error — ' + e.stack); process.exit(1); });
