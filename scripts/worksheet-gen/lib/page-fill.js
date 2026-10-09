/**
 * page-fill.js — does a page USE its page? (2026-10-08; first written for Graphs and Data, where half of every page
 * was empty — operator: "Half of the page is blank in some designs. It is unacceptable.")
 *
 * pageFill() runs INSIDE the page (pass it to page.evaluate): it takes every visible content element of the body —
 * svg, img, answer boxes, cards, frames, chips — and measures how much of the body's HEIGHT they cover, and the
 * largest empty band (top, bottom or between). Returns { covered, band, bandPx, fails[] } against the floors
 * (covered ≥ 0.55, band ≤ 0.20). A type's verify() can call it with page.evaluate(pageFill).
 */
'use strict';
function pageFill() {
  const fails = [];
  const bodyEl = document.querySelector('.ws-body');
  if (!bodyEl) return { covered: 0, band: 1, bandPx: 0, fails: ['no .ws-body'] };
  const body = bodyEl.getBoundingClientRect();
  const sel = '[data-lcs-art], svg, img, .ws-answerbox, .ws-gcard, .ws-card, [data-lcs-frame], [data-lcs-table], .ws-pattern-slot, .ws-chip, [data-lcs-answer], [data-lcs-given]';
  const iv = [...bodyEl.querySelectorAll(sel)].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 2 && r.height > 2)
    .map((r) => [Math.max(r.top, body.top), Math.min(r.bottom, body.bottom)]).filter(([a, b]) => b > a).sort((a, b) => a[0] - b[0]);
  let covered = 0, cur = null, last = body.top; const gaps = [];
  for (const [a, b] of iv) {
    if (!cur || a > cur[1]) { if (cur) covered += cur[1] - cur[0]; gaps.push(a - last); cur = [a, b]; } else cur[1] = Math.max(cur[1], b);
    last = Math.max(last, b);
  }
  if (cur) covered += cur[1] - cur[0];
  gaps.push(body.bottom - last);
  const bandPx = Math.max(...gaps);
  const c = covered / body.height, band = bandPx / body.height;
  if (c < 0.55) fails.push(`page under-used: content covers ${Math.round(100 * c)}% of the page height`);
  if (band > 0.2) fails.push(`empty band of ${Math.round(bandPx)}px (${Math.round(100 * band)}% of the page)`);
  return { covered: c, band, bandPx, fails };
}
/**
 * cardFill() — runs INSIDE the page: does what is DRAWN fill its card? (2026-10-09, Measurement: tiny thermometers,
 * balances and jugs sat in big empty cards — pageFill() passed them, because a card counts as content.) For every
 * .ws-card, the share of the card's AREA covered by drawn elements (svg, img, answer boxes, chips; never the number
 * badge), sampled on a 24 × 24 grid — a bounding box from a small picture to a far answer box looked "full" when it
 * was not. Returns { min, cards: [ratio…], fails[] } against the floor (each card ≥ 0.30).
 */
function cardFill(floor) {
  const F = floor || 0.3, fails = [], ratios = [];
  document.querySelectorAll('.ws-body .ws-card').forEach((card, i) => {
    const c = card.getBoundingClientRect();
    const rs = [...card.querySelectorAll('[data-lcs-art], svg, img, .ws-answerbox, .ws-blankbox, .ws-pattern-chip, .ws-achip, [data-lcs-answer]')]
      .filter((e) => !e.closest('.ws-card-badge') && !(e.tagName.toLowerCase() === 'img' && e.closest('[data-lcs-art]')) && !(e.tagName.toLowerCase() === 'svg' && e.parentElement && e.parentElement.closest('svg')))
      .map((e) => e.getBoundingClientRect()).filter((r) => r.width > 2 && r.height > 2);
    if (!rs.length) return;
    const N = 24; let hit = 0;
    for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) {
      const x = c.left + (a + 0.5) * c.width / N, y = c.top + (b + 0.5) * c.height / N;
      if (rs.some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom)) hit++;
    }
    const ratio = hit / (N * N);
    ratios.push(ratio);
    if (ratio < F) fails.push(`card ${i + 1}: its drawing covers ${Math.round(100 * ratio)}% of the card`);
  });
  return { min: ratios.length ? Math.min(...ratios) : 1, cards: ratios, fails };
}
module.exports = { pageFill, cardFill };
