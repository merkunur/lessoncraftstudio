/**
 * Page-level QA lints, run inside the rendered Puppeteer page.
 * Hard-fail classes: safe-area overflow/clip, broken images, font-size floor,
 * off-palette colors.
 */
'use strict';
const tokens = require('../primitives/_tokens.js');

const PALETTE = new Set(
  Object.values(tokens.color).map((c) => c.toUpperCase())
);

function runLints(page, { gradeBand }) {
  const density = tokens.density[gradeBand] || tokens.density.K;
  return page.evaluate(({ palette: paletteArr, density }) => {
    const palette = new Set(paletteArr);
    const fails = [];
    const pageEl = document.querySelector('[data-lcs-page]');
    const pb = pageEl.getBoundingClientRect();

    // 1. overflow/clip: every visible element inside the page box
    document.querySelectorAll('.ws-page *').forEach((el) => {
      if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const fudge = 0.6; // sub-pixel rounding
      if (r.left < pb.left - fudge || r.right > pb.right + fudge ||
          r.top < pb.top - fudge || r.bottom > pb.bottom + fudge) {
        fails.push(`overflow: <${el.tagName.toLowerCase()} class="${el.className.baseVal || el.className}"> exceeds page box`);
      }
    });

    // 2. broken images
    document.querySelectorAll('img').forEach((img) => {
      if (!img.complete || img.naturalWidth === 0) fails.push('broken image: ' + img.src.slice(-60));
    });

    // 3. font-size floor on text-bearing elements
    document.querySelectorAll('.ws-page p, .ws-page span, .ws-page h1, .ws-page text').forEach((el) => {
      if (!el.textContent.trim()) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs && fs < 9) fails.push(`font too small (${fs}px): "${el.textContent.trim().slice(0, 24)}"`);
    });

    // 4. palette whitelist on SVG fills/strokes (hex values only)
    document.querySelectorAll('svg [fill], svg [stroke]').forEach((el) => {
      for (const attr of ['fill', 'stroke']) {
        const v = (el.getAttribute(attr) || '').toUpperCase();
        if (v.startsWith('#') && !palette.has(v)) fails.push(`off-palette ${attr}: ${v}`);
      }
    });

    return fails;
  }, { palette: Array.from(PALETTE), density });
}

module.exports = { runLints };
