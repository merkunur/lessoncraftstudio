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
  ['svg[data-lcs-prim="lp-piece"]', '[data-lcs-piece-tag], [data-lcs-piece-tag] *', 'each cut-out piece carries its number in its corner: the badge is printed on the piece by design (G1-475)'],
  ['[data-lcs-key-sample], [data-lcs-key-sample] *', '*', 'the answer key draws its sample (a faint extra picture, a tally, a colouring) over the task on purpose'],
  ['[data-lcs-crossed] svg', 'img', 'the taken-away pictures are crossed out: the X is drawn over them (picture-equation crossoutGroup)'],
  ['svg[data-lcs-prim="number-line"]', '.ws-answerbox', 'a label box sits on its tick of the number line by design (G2-395 label the number line)'],
  ['[data-lcs-house] > svg', '*', 'the odd / even house outline frames its content: the tiles and boxes live inside the house by design (G1-351)'],
  ['svg[data-lcs-ink]', '*', "the teacher's own drawing lies over the page by design"],
  ['[data-lcs-wagon] > svg', '*', 'a wagon carries its letter box and its picture: they sit on the wagon by design (K-530 alphabet train)'],
  ['[data-lcs-hunt-obj] > svg', '*', 'the letter is written on its balloon, kite or sign by design (K-532 letter hunt)'],
  ['svg[data-lcs-htd-rail]', '[data-lcs-htd-badge], [data-lcs-htd-badge] *', 'the step numbers sit ON the steps rail: the rail runs behind each numbered badge by design (How to Draw)'],
  ['svg[data-lcs-htd-ring]', 'svg', 'the dashed ring marks the empty place IN the scene where the child draws: it lies over the scene by design (How to Draw, draw in the scene)'],
  ['svg[data-lcs-prim="logic-grid"], svg[data-lcs-prim="logic-lgrid"]', 'img[data-lcs-col], img[data-lcs-rowpic]', 'the elimination grid frames its column and row pictures: each sits in its header cell by design (G2-319 family; the two-attribute grid of G3-379 too)'],
  ['[data-lcs-ring] > svg, [data-lcs-clue-cross] svg', 'img[data-lcs-pic]', 'a picture clue rings its picture, and crosses out a "does not have" picture, on purpose (G1-349)'],
  ['[data-lcs-clue-cross] svg', '[data-lcs-ring] > svg', 'the cross of a "does not have" clue lies inside its own ring (G1-349)'],
  ['[data-lcs-kind="balance"] svg', '[data-lcs-kind="balance"] img', 'the object rests in the dish of its balance pan: its bottom sits inside the pan by design (G2-252 / G2-261 / G2-262)'],
  ['[data-lcs-art] img, [data-lcs-artband] img', 'svg[data-lcs-cuberow], svg[data-lcs-prim="ruler"]', 'a measured object stands ON its row of unit squares / its ruler: the ink meets the row along its edge (registration is the task) — a contact only, 2 px at most', 2],
  // final phase round 3 (2026-11-03), each read on a full-size render:
  ['svg[data-lcs-stage-svg]', '*', 'the family tree drawing is the stage: the frames, name plates and name boxes sit on it by design (family tree pages)'],
  ['svg[data-lcs-cord]', '[data-lcs-line-marker] svg', "a story line's mark hangs on its cord by design (story sequencing)"],
  ['svg[data-lcs-cutlines]', '*', 'the dashed cut lines run along every card edge of the sheet: they meet each card by design (cut-out cards)'],
  ['.ss-tag svg', '.ss-tag .ws-blankbox', 'the number box is printed on its tag (story sequencing, number the pictures)'],
  ['[data-lcs-cw-cell] .ws-answerbox', '[data-lcs-cw-cell] span', "a crossword cell prints its clue number in its corner, and neighbouring cells share one border line, by design"],
  ['svg[data-lcs-brick]', '*', 'a wall brick / stone carries its word or its writing line: printed on the brick by design (word parts, root words)'],
  ['[data-lcs-scene-prep="in"] svg[data-lcs-prim="pos-scene"], [data-lcs-scene-prep="on top of"] svg[data-lcs-prim="pos-scene"], [data-lcs-scene-prep="on"] svg[data-lcs-prim="pos-scene"], [data-lcs-scene-prep="behind"] svg[data-lcs-prim="pos-scene"], [data-lcs-scene-prep="in front of"] svg[data-lcs-prim="pos-scene"]', '[data-lcs-scene-prep] img', 'the picture is IN / ON the shape, half hidden BEHIND it or IN FRONT of it: that overlap is the position word (Where Is It, Read and Draw, Choose the Position Word)'],
  ['[data-lcs-relation="on"] svg', '[data-lcs-relation="on"] img', 'the picture ON the crate rests on it: their contact is the position word (on / under)'],
  ['svg[data-lcs-prim="writing-row"], svg[data-lcs-prim="school-ruling"]', '*', 'a letter, word, model or answer box is written ON its lines: the line meets it (the 1.5-px stroke) — a contact only', 2],
  ['.ws-countbadge', 'img', 'a number badge meets the corner of a picture beside it — a contact only', 2],
  ['[data-lcs-numbered-bank] .ws-countbadge', '[data-lcs-numbered-bank] img', "a numbered picture bank: each picture wears its number on its top-left corner like a sticker (the bank has no room for a separate number band; at level 3 it already wraps) — a touch of the drawing's corner only", 10],
];

/**
 * Runs in the page: the INK of every content element of the body, and every pair whose ink overlaps.
 * Ink, not layout boxes (the first version compared boxes and accused big digits whose line boxes touch, a badge beside
 * a picture's transparent margin, a tally beside a frame — nothing a child sees):
 *   text   per text node, per line: the glyph ink from canvas metrics (actualBoundingBox) placed on the line's baseline
 *   img    the picture's opaque bounds (alpha scan, cached per picture), scaled into its layout box (rotation undone)
 *   svg    the union of its drawn children's geometry boxes (a fill="none" stroke-less hit rect draws nothing); a box
 *          overlap with a drawn SHAPE is then tested against the shape itself (isPointInFill / isPointInStroke on a 2 px
 *          grid of the overlap): one path's box holds empty corners — a tangram arrow's box reached the card badge while
 *          the arrow did not (2026-11-02)
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
  const SHAPES = ['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'];
  /** is there drawn ink of the shape at client point (x, y) */
  const inkAt = (sh, x, y) => {
    const m = sh.g.getScreenCTM(); if (!m) return true;
    const q = new DOMPoint(x, y).matrixTransform(m.inverse());
    const pt = sh.g.ownerSVGElement.createSVGPoint(); pt.x = q.x; pt.y = q.y;
    return (sh.fill && sh.g.isPointInFill(pt)) || (sh.stroke && sh.g.isPointInStroke(pt));
  };
  /** does the overlap rect of a and b hold ink of every drawn shape among them (sampled every 2 px inside the overlap) */
  const shapesMeet = (a, b, o) => {
    const sh = [a.shape, b.shape].filter(Boolean);
    if (!sh.length) return true;
    const step = 2;
    for (let y = o.t + 0.5; y < o.b; y += step) for (let x = o.l + 0.5; x < o.r; x += step) if (sh.every((h) => inkAt(h, x, y))) return true;
    return false;
  };
  /** the ink of a drawing: one box per drawn shape (a union box would accuse its own empty corners — the number-bond
   *  diagram's box reached the card badge while nothing drawn did), the union for a big drawing (> 200 shapes) */
  const svgInks = (svg) => {
    const boxes = [];
    // an svg viewport clips what it draws (an inline svg's default overflow is hidden): a picture seen through a viewBox
    // window — the G1-475 puzzle pieces — is measured as the window, not as the whole picture behind it (2026-11-02)
    const clip = getComputedStyle(svg).overflow === 'visible' ? null : svg.getBoundingClientRect();
    for (const g of svg.querySelectorAll(DRAWN)) {
      const gs = getComputedStyle(g);
      const fill = g.getAttribute('fill') || gs.fill, stroke = g.getAttribute('stroke') || gs.stroke;
      const noFill = fill === 'none', noStroke = !stroke || stroke === 'none';
      if (noFill && noStroke && g.tagName.toLowerCase() !== 'text') continue;
      if (parseFloat(gs.opacity) === 0 || gs.visibility === 'hidden') continue;
      const r = g.getBoundingClientRect(); if (r.width <= 0 && r.height <= 0) continue;
      const sw = noStroke ? 0 : (parseFloat(g.getAttribute('stroke-width') || gs.strokeWidth) || 1) / 2;
      const b = { l: r.left - sw, t: r.top - sw, r: r.right + sw, b: r.bottom + sw };
      if (clip) { b.l = Math.max(b.l, clip.left); b.t = Math.max(b.t, clip.top); b.r = Math.min(b.r, clip.right); b.b = Math.min(b.b, clip.bottom); if (b.r <= b.l || b.b <= b.t) continue; }
      if (SHAPES.includes(g.tagName.toLowerCase())) b.shape = { g, fill: !noFill, stroke: !noStroke };
      boxes.push(b);
    }
    if (boxes.length > 200) return [boxes.reduce((u, b) => ({ l: Math.min(u.l, b.l), t: Math.min(u.t, b.t), r: Math.max(u.r, b.r), b: Math.max(u.b, b.b) }))];
    return boxes;
  };
  // what an ancestor with overflow hidden / clip cuts off is not on the paper (2026-11-02: a measured object or an Order by
  // Size picture is cropped to its ink by an overflow:hidden box; the alpha scan of the 512 px file found ink a few px
  // outside that crop — invisible — and the gate accused it of meeting the squares below)
  const clipOf = (el) => {
    let c = null;
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (s.overflowX === 'visible' && s.overflowY === 'visible') continue;
      const q = p.getBoundingClientRect();
      c = c ? { l: Math.max(c.l, q.left), t: Math.max(c.t, q.top), r: Math.min(c.r, q.right), b: Math.min(c.b, q.bottom) } : { l: q.left, t: q.top, r: q.right, b: q.bottom };
    }
    return c;
  };
  const clipTo = (r, c) => (c ? { l: Math.max(r.l, c.l), t: Math.max(r.t, c.t), r: Math.min(r.r, c.r), b: Math.min(r.b, c.b) } : r);
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
      const ri = clipTo({ l: r.left + ab.l * r.width, t: r.top + ab.t * r.height, r: r.left + ab.r * r.width, b: r.top + ab.b * r.height }, clipOf(el));
      if (ri.r > ri.l && ri.b > ri.t) cand.push({ ...base, kind: 'img', r: ri });
    } else if (tag === 'svg') {
      const c = clipOf(el);
      for (const u0 of svgInks(el)) { const u = clipTo(u0, c); if (u.r > u.l && u.b > u.t) cand.push({ ...base, kind: 'svg', r: u, shape: u0.shape || null }); }
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
  // an entry with a 4th value exempts only a CONTACT that thin (px, the smaller overlap side): a deeper overlap still fails
  const isEx = (a, b, ix, iy) => exempt.some(([sa, sb, thin]) => ((a.el.matches(sa) && b.el.matches(sb)) || (a.el.matches(sb) && b.el.matches(sa))) && (thin == null || Math.min(ix, iy) <= thin));
  // a picture's OWN ground shadow (the scene stage, G2-278): a flat ellipse centred under the picture, at its feet — its
  // rim meets the picture's ink box by design. A shadow anywhere else on a picture (a neighbour's, over its body) still fails.
  const ownShadow = (s, im) => {
    if (s.kind !== 'svg' || !s.shape || s.shape.g.tagName.toLowerCase() !== 'ellipse' || im.kind !== 'img') return false;
    const e = s.shape.g.getBoundingClientRect(), b = im.el.getBoundingClientRect();
    if (!(e.height < 0.35 * e.width)) return false;
    const ecx = (e.left + e.right) / 2, ecy = (e.top + e.bottom) / 2;
    return Math.abs(ecx - (b.left + b.right) / 2) <= 0.1 * b.width && ecy >= b.bottom - 0.15 * b.height && ecy <= b.bottom + 6 && e.width <= b.width;
  };
  const hits = [];
  const name = (c) => c.kind + ':' + c.tag + (c.cls ? '.' + c.cls.split(/\s+/)[0] : '');
  for (let i = 0; i < cand.length; i++) for (let j = i + 1; j < cand.length; j++) {
    const a = cand[i], b = cand[j];
    if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
    const ix = Math.min(a.r.r, b.r.r) - Math.max(a.r.l, b.r.l), iy = Math.min(a.r.b, b.r.b) - Math.max(a.r.t, b.r.t);
    if (ix <= tol || iy <= tol) continue;
    if (isEx(a, b, ix, iy)) continue;
    if (ownShadow(a, b) || ownShadow(b, a)) continue;
    if ((a.shape || b.shape) && !shapesMeet(a, b, { l: Math.max(a.r.l, b.r.l), t: Math.max(a.r.t, b.r.t), r: Math.min(a.r.r, b.r.r), b: Math.min(a.r.b, b.r.b) })) continue;
    hits.push({ a: name(a), b: name(b), ix: Math.round(ix * 10) / 10, iy: Math.round(iy * 10) / 10, ta: (a.text || a.el.textContent || '').trim().slice(0, 20), tb: (b.text || b.el.textContent || '').trim().slice(0, 20), at: { x: Math.round(Math.max(a.r.l, b.r.l)), y: Math.round(Math.max(a.r.t, b.r.t)) } });
  }
  return { boxes: cand.length, figures: cand.filter((c) => c.kind === 'svg').length, hits };
}

if (require.main !== module) { module.exports = { collide, EXEMPT, TOL }; return; }

/** template → the levels whose page is one item by design (exactly one box measured is right there, never zero) */
const ONE_ITEM = { 'K-476': [1] };

(async () => {
  const makers = MP.builtMakers(A.makers);
  const m = await new MP.Mounter().open();
  let fails = 0, pages = 0, boxes = 0;
  const report = [];
  const fail = (s) => { fails++; if (fails <= 80) console.log('FAIL ' + s); };
  const exempt = EXEMPT.map(([a, b, , thin]) => [a, b, thin == null ? null : thin]);
  const run = async (html) => { const page = await m.mount(html, 703); return page.evaluate(collide, { tol: TOL, exempt }); };

  for (const { maker, tj } of makers) {
    let n = 0;
    for (const t of tj.templates) {
      const type = MP.loadType(t);
      for (const loc of LOCS.filter((l) => t.locales.includes(l))) {
        for (const o of MP.settingsSpace(t, loc, { themes: QUICK ? 1 : 2, units: 1, copies: COPIES, sample: LOCS.indexOf(loc) })) {
          const tag = `${maker} ${t.id} ${loc} L${o.difficulty} v${o.variant}${o.theme ? ' ' + o.theme : ''}${o.unit ? ' ' + o.unit : ''}`;
          let r;
          try { r = MP.buildShown(t, type, tj, loc, o, { answerKey: !!A.keys && (t.keyLevels || []).includes(o.difficulty) }); } catch (e) { fail(`${tag}: build — ${e.message}`); continue; }
          for (const [what, html] of [['page', r.html], ['key', r.keyHtml]]) {
            if (!html) continue;
            const c = await run(html);
            pages++; n++; boxes += c.boxes;
            // a level whose page holds ONE thing by design (one big coloring picture) measures one box — nothing can collide
            const single = (ONE_ITEM[t.id] || []).includes(o.difficulty) && c.boxes === 1;
            if (!c.boxes || (c.boxes < 2 && !c.figures && !single)) fail(`${tag} ${what}: measured nothing (${c.boxes} boxes)`);
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
    // (4) a cropped picture: ink its overflow:hidden crop cuts off is not on the paper (must NOT fire); the same picture
    // uncropped meets the drawing below (must fire)
    const src = (/<img class="ws-icon" src="([^"]+)"/.exec(base.html) || [])[1];
    if (!src) throw new Error('poison 4: no picture on the K-002 page');
    const rig = (cropH, overflow, svgTop, cuberow) => base.html.replace(card1, card1 + `<div style="position:relative;width:220px;height:130px">` +
      `<span data-lcs-art="1" style="position:absolute;left:0;top:0;width:100px;height:${cropH}px;overflow:${overflow}"><img class="ws-poisonimg" src="${src}" alt="" style="position:absolute;left:0;top:0;width:100px;height:100px"></span>` +
      `<svg class="ws-poisonsvg"${cuberow ? ' data-lcs-cuberow="3"' : ''} style="position:absolute;left:0;top:${svgTop}px" width="100" height="20"><rect x="1" y="1" width="98" height="18" fill="#FFFFFF" stroke="#146B5E" stroke-width="2"/></svg></div>`);
    const imgSvg = (r) => r.hits.some((h) => [h.a, h.b].some((x) => /ws-poisonimg/.test(x)) && [h.a, h.b].some((x) => /ws-poisonsvg/.test(x)));   // the rig's own pair only
    if (imgSvg(await run(rig(40, 'hidden', 60, false)))) fail('poison 4: ink hidden by its crop was counted as a collision');
    if (!imgSvg(await run(rig(40, 'visible', 60, false)))) fail('poison 4: an uncropped picture over a drawing PASSED');
    // (5) the thin-contact exemption: a measured object meeting its square row by 2 px passes, 9 px into it fails
    if (imgSvg(await run(rig(60, 'hidden', 58.5, true)))) fail('poison 5: a 2 px contact of an object with its square row FAILED');
    if (!imgSvg(await run(rig(60, 'hidden', 52, true)))) fail('poison 5: an object drawn 9 px into its square row PASSED');
    // (6) a drawn shape is measured as itself, not its box: a badge over the EMPTY corner of a triangle's box passes, the
    // same badge over its filled corner fails (the tangram arrow, 2026-11-02)
    const tri = (left, top) => base.html.replace(card1, card1 + `<div style="position:relative;width:120px;height:120px">` +
      `<svg class="ws-poisontri" style="position:absolute;left:0;top:0" width="100" height="100"><path d="M0 100L100 100L100 0Z" fill="#146B5E" stroke="#146B5E" stroke-width="2"/></svg>` +
      `<span class="ws-card-badge ws-poisonbadge" style="position:absolute;left:${left}px;top:${top}px;width:20px;height:20px;padding:0">1</span></div>`);
    const triHit = (r) => r.hits.some((h) => [h.a, h.b].some((x) => /ws-poisontri/.test(x)) && [h.a, h.b].some((x) => /ws-card-badge/.test(x)) && h.ix < 25);
    if (triHit(await run(tri(2, 2)))) fail("poison 6: a badge over a triangle's EMPTY corner was counted as a collision");
    if (!triHit(await run(tri(76, 76)))) fail("poison 6: a badge over a triangle's FILLED corner PASSED");
    // (7) a picture's own ground shadow: a flat ellipse at its feet passes (it overlaps the ink box by design); the same
    // ellipse over the picture's body fails (the scene stage, G2-278, 2026-11-04)
    const shadow = (cy) => base.html.replace(card1, card1 + `<div style="position:relative;width:120px;height:120px">` +
      `<svg class="ws-poisonshadow" style="position:absolute;left:0;top:0" width="120" height="120"><ellipse cx="50" cy="${cy}" rx="42" ry="9" fill="#146B5E"/></svg>` +
      `<img class="ws-poisonimg" src="${src}" alt="" style="position:absolute;left:0;top:0;width:100px;height:100px"></div>`);
    const shadowHit = (r) => r.hits.some((h) => [h.a, h.b].some((x) => /ws-poisonimg/.test(x)) && [h.a, h.b].some((x) => /ws-poisonshadow/.test(x)));
    if (shadowHit(await run(shadow(88)))) fail("poison 7: a picture's own ground shadow at its feet was counted as a collision");
    if (!shadowHit(await run(shadow(50)))) fail("poison 7: a shadow ellipse over a picture's body PASSED");
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
