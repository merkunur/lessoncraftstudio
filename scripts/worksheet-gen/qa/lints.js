/**
 * Page-level QA lints, run inside the rendered Puppeteer page.
 * Hard-fail classes: safe-area overflow/clip, broken images, font-size floor,
 * off-palette colors.
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const freeClaim = require('../../lib/free-claim.js');

freeClaim.selfTest();   // a ban is trusted only after it fires on MUST_FIRE and stays silent on MUST_PASS

const PALETTE = new Set([
  ...Object.values(tokens.color).map((c) => c.toUpperCase()),
  // Legend-swatch-only colors (color-by-code family). Merged EXPLICITLY from
  // the separate tokens.codeColors namespace — see the note in _tokens.js.
  // These are licensed for legend swatches, never for primitive artwork.
  ...Object.values(tokens.codeColors || {}).map((c) => c.toUpperCase()),
]);

async function runLints(page, { gradeBand }) {
  const density = tokens.density[gradeBand] || tokens.density.K;
  const fails = await page.evaluate(({ palette: paletteArr, density }) => {
    const palette = new Set(paletteArr);
    const fails = [];
    const pageEl = document.querySelector('[data-lcs-page]');
    const pb = pageEl.getBoundingClientRect();
    // The parts of a drawn story picture (primitives/story-art.js, 2026-10-01) are clipped by their own <svg> (the
    // picture is a window onto a larger scene) and painted from the story palette, which qa/verify-b6-story-panel.js
    // gates. The picture's <svg> box itself is still measured here; only what it clips is skipped.
    // illustrations with their own governed palette: story panels (story-art.js PAL), the Color by Number pictures + crayons
    // (cbn-render.js PALETTE), and the nt2-G line-art panels (fd-scene.js: the same crayons + the scene ink; htd-steps.js: the
    // drawing's own ink, both 2026-10-09) — each gated by its own family verify; the Position Words maker's landmark
    // shapes (types/_shared/position-scenes.js COLORS, 2026-11-03: one fixed pastel per shape kind); a shape drawn in the
    // picture library's own two colours to sit among its pictures (geometry-tasks.js LIB_SHAPE, 2026-11-04)
    const inArt = (el) => el.tagName.toLowerCase() !== 'svg' && !!(el.closest && el.closest('svg[data-lcs-story-panel], svg[data-lcs-prim="cbn-art"], svg[data-lcs-prim="cbn-crayon"], svg[data-lcs-prim="color-glyph"], svg[data-lcs-prim="color-word"], svg[data-lcs-prim="color-part"], svg[data-lcs-prim="fd-panel"], svg[data-lcs-prim="htd-step"], svg[data-lcs-prim="htd-full"], svg[data-lcs-prim="hm-scene"], svg[data-lcs-prim="hm-strip"], svg[data-lcs-prim="pt-scene"], svg[data-lcs-prim="lp-piece"], svg[data-lcs-prim="pos-scene"], svg[data-lcs-prim="lib-shape"]'));
    // a picture CROPPED by an overflow:hidden strip (measured objects, ruler art bands) shows only the strip: measure that
    const visRect = (el) => { const c = el.tagName.toLowerCase() === 'img' && el.closest && el.closest('[data-lcs-art], [data-lcs-artband]'); return (c || el).getBoundingClientRect(); };

    // 0. non-empty body: a worksheet must render at least one content unit.
    // Catches the "blank sheet" class (e.g. a themed generator finding no usable
    // nouns and emitting zero cards) BEFORE it can be published. Every type's
    // body uses one of these content primitives.
    // .ws-trace-lane = tracing-family lanes (K-236..K-239); [data-ws-content]
    // = generic content stamp for full-page hero layouts (maze, symmetry grid,
    // column-arithmetic frames) that don't sit inside a .ws-card-stage.
    const CONTENT_SEL = '.ws-card-stage, .ws-match-item, .ws-bin, .ws-pattern-slot, .ws-pattern-chip, [data-lit-content], .ws-trace-lane, [data-ws-content]';
    if (document.querySelectorAll('.ws-page ' + CONTENT_SEL.split(', ').join(', .ws-page ')).length === 0) {
      fails.push('blank worksheet: no content elements rendered');
    }

    // 0b. a value that never existed reached the page — "coin undefined", "NaN cm" (2026-11-02: Finnish money purses drew
    // an undefined coin; it passed every gate). Text nodes and the attributes a reader or a screen reader meets.
    {
      const MISSING = /(^|[^\p{L}])(undefined|NaN)(?![\p{L}])/u;
      const tw = document.createTreeWalker(document.querySelector('.ws-page') || document.body, NodeFilter.SHOW_TEXT);
      let bad = null;
      while (!bad && tw.nextNode()) if (MISSING.test(tw.currentNode.nodeValue)) bad = tw.currentNode.nodeValue.trim().slice(0, 40);
      if (!bad) document.querySelectorAll('.ws-page *').forEach((el) => { if (bad) return; for (const a of el.attributes) if (/^(aria-label|alt|title|data-lcs-[a-z0-9-]+)$/.test(a.name) && MISSING.test(a.value)) { bad = a.name + '="' + a.value.slice(0, 40) + '"'; break; } });
      if (bad) fails.push('a missing value printed on the page: ' + bad);
    }

    // 1. overflow/clip: every visible element inside the page box
    document.querySelectorAll('.ws-page *').forEach((el) => {
      if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return;
      if (inArt(el)) return;
      const r = visRect(el);
      if (r.width === 0 || r.height === 0) return;
      const fudge = 0.6; // sub-pixel rounding
      if (r.left < pb.left - fudge || r.right > pb.right + fudge ||
          r.top < pb.top - fudge || r.bottom > pb.bottom + fudge) {
        fails.push(`overflow: <${el.tagName.toLowerCase()} class="${el.className.baseVal || el.className}"> exceeds page box`);
      }
    });

    // 1b. footer-band intrusion. The check above measures the PAGE BOX (945px);
    // the attribution strip `.ws-foot` occupies the last ~24px of it, so content
    // can clear the page edge and still be printed on top of the footer. That is
    // a defect a teacher sees — answer boxes overlapping the attribution line —
    // and nothing could catch it: the overflow lint passes, verify() passes, and
    // a card-height calculation cannot see it because the CARD reports itself
    // inside the page while its content spills past its own box.
    // Measured on nt20-B-VAR: 2 of 83 English renders and one shipped base deck.
    // Found by a native panel reading its own render, not by any gate.
    const foot = document.querySelector('.ws-foot');
    if (foot) {
      const ft = foot.getBoundingClientRect().top;
      let worst = null;
      document.querySelectorAll('.ws-page *').forEach((el) => {
        if (el === foot || foot.contains(el)) return;
        if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return;
        if (inArt(el)) return;
        const r = visRect(el);
        if (r.width === 0 || r.height === 0) return;
        if (r.bottom > ft + 0.6 && (!worst || r.bottom > worst.bottom)) {
          worst = { bottom: r.bottom, tag: el.tagName.toLowerCase(), cls: el.className.baseVal || el.className };
        }
      });
      if (worst) {
        fails.push(`footer overlap: <${worst.tag} class="${worst.cls}"> reaches ` +
          `${Math.round(worst.bottom)} against the attribution band at ${Math.round(ft)}`);
      }
    }

    // 2. broken images
    document.querySelectorAll('img').forEach((img) => {
      if (!img.complete || img.naturalWidth === 0) fails.push('broken image: ' + img.src.slice(-60));
    });

    // 2b. a picture inside a FRAMED box (a choice circle, a card) stays inside its frame (2026-11-05, operator: Growing
    // Patterns' groups of 4-6 ran out of their answer circles, on the page and in the key — no check looked inside a box).
    // The frame = the nearest of the picture's three closest ancestors with a drawn border. A round frame (a circle or
    // a pill) holds the middle of the picture (70 % of its box, the drawing; the box corners are transparent); a square
    // one holds the whole box, within 1 px.
    document.querySelectorAll('.ws-page img').forEach((img) => {
      const r = img.getBoundingClientRect();
      if (!(r.width > 0)) return;
      // only a BORDERED ancestor is a frame: an unbordered fourth ancestor the loop stepped onto is not one (round 12:
      // 13 templates refused against plain wrappers that were never checked for a border)
      let f = null;
      for (let a = img.parentElement, k = 0; a && k < 3; k++, a = a.parentElement) {
        const cs = getComputedStyle(a);
        if (['Top', 'Right', 'Bottom', 'Left'].some((s) => parseFloat(cs['border' + s + 'Width']) >= 1.5 && cs['border' + s + 'Style'] !== 'none' && !/rgba\(.*,\s*0\)$|transparent/.test(cs['border' + s + 'Color']))) { f = a; break; }
      }
      if (!f || f.classList.contains('ws-page')) return;
      const fr = f.getBoundingClientRect(), cs = getComputedStyle(f);
      const L = fr.left + parseFloat(cs.borderLeftWidth), T = fr.top + parseFloat(cs.borderTopWidth);
      const W = fr.width - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth), H = fr.height - parseFloat(cs.borderTopWidth) - parseFloat(cs.borderBottomWidth);
      // the frame's inside is a rounded rectangle (a circle and a pill are rounded rectangles too)
      const rr = Math.max(0, Math.min((parseFloat(cs.borderTopLeftRadius) || 0) - parseFloat(cs.borderTopWidth), W / 2, H / 2));
      const inRect = ([x, y]) => x >= L - 1 && x <= L + W + 1 && y >= T - 1 && y <= T + H + 1;
      const inside = ([x, y]) => {
        if (!inRect([x, y])) return false;
        const qx = Math.min(Math.max(x, L + rr), L + W - rr), qy = Math.min(Math.max(y, T + rr), T + H - rr);
        return Math.hypot(x - qx, y - qy) <= rr + 1;
      };
      // what shows is the picture box cut by every clipping box between it and the frame (a puzzle piece, a closure
      // window, the ruler's art band: a large picture placed by its ink behind a small overflow:hidden window, round 12)
      let v = { l: r.left, t: r.top, r: r.right, b: r.bottom }, clipped = false;
      for (let a = img.parentElement; a && a !== f.parentElement; a = a.parentElement) {
        const s = getComputedStyle(a);
        if (s.overflowX === 'visible' && s.overflowY === 'visible') continue;
        const ar = a.getBoundingClientRect();
        v = { l: Math.max(v.l, ar.left), t: Math.max(v.t, ar.top), r: Math.min(v.r, ar.right), b: Math.min(v.b, ar.bottom) };
        clipped = true;
      }
      if (!(v.r - v.l > 0 && v.b - v.t > 0)) return;
      const vw = v.r - v.l, vh = v.b - v.t, cx = (v.l + v.r) / 2, cy = (v.t + v.b) / 2;
      const round = rr >= 0.4 * Math.min(W, H);
      // round frame, whole picture: the drawing's edge-middles (35 % out) and its corners (30 % out on each axis) in the
      // circle. Square frame (or a clipped window): the whole box in the frame's rectangle, and the box 15 % in from its
      // corners in the rounded inside — a picture box's own corners are transparent and may reach into a rounded corner
      const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
      const out = round && !clipped
        ? [[cx - 0.35 * vw, cy], [cx + 0.35 * vw, cy], [cx, cy - 0.35 * vh], [cx, cy + 0.35 * vh],
          ...corners.map(([a, b]) => [cx + a * 0.3 * vw, cy + b * 0.3 * vh])].some((p) => !inside(p))
        : corners.some(([a, b]) => !inRect([cx + a * vw / 2, cy + b * vh / 2]) || !inside([cx + a * 0.35 * vw, cy + b * 0.35 * vh]));
      if (out) fails.push(`picture outside its frame: <${f.tagName.toLowerCase()} class="${f.className.baseVal || f.className}">`);
    });

    // 3. font-size floor on text-bearing elements
    document.querySelectorAll('.ws-page p, .ws-page span, .ws-page h1, .ws-page text').forEach((el) => {
      if (!el.textContent.trim()) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs && fs < 9) fails.push(`font too small (${fs}px): "${el.textContent.trim().slice(0, 24)}"`);
    });

    // 4. palette whitelist on SVG fills/strokes (hex values only)
    document.querySelectorAll('svg [fill], svg [stroke]').forEach((el) => {
      if (inArt(el)) return;
      for (const attr of ['fill', 'stroke']) {
        const v = (el.getAttribute(attr) || '').toUpperCase();
        if (v.startsWith('#') && !palette.has(v)) fails.push(`off-palette ${attr}: ${v}`);
      }
    });

    return fails;
  }, { palette: Array.from(PALETTE), density });

  // 5. visible copy never claims "free" (operator ruling 2026-09-14: the free
  // tier grants 3 PDF downloads a month, so SEO METADATA may say "free
  // printable" — the printed sheet, which the child and teacher SEE, may not).
  // Price words + carrier collocations per locale; bare frei/vrij/fritt stay
  // legal (scripts/lib/free-claim.js, self-tested both directions on load).
  // Measured 2026-09-14: 0 hits across all 10,444 live sheet strings.
  // The sheet's OWN words — title strip, instruction, name/date line, footer — are what the ruling names; the exercise's
  // content is not a claim about the sheet (2026-11-03: a Danish reading page's wrong answer "Kringlen var gratis", the
  // pastry was free, failed every maker copy of it). A page without that chrome is read whole, as before.
  const visible = await page.evaluate(() => {
    const chrome = [...document.querySelectorAll('.ws-page .ws-title, .ws-page .ws-instruction, .ws-page .ws-namedate, .ws-page .ws-foot')];
    return chrome.length ? chrome.map((el) => el.innerText || '').join('\n') : ((document.querySelector('.ws-page') || document.body).innerText || '');
  });
  const claim = freeClaim.hit(visible);
  if (claim) fails.push(`visible copy claims free ("${claim}") — metadata only, never on the sheet`);
  return fails;
}

module.exports = { runLints };
