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
  const sel = 'svg, img, .ws-answerbox, .ws-gcard, .ws-card, [data-lcs-frame], [data-lcs-table], .ws-pattern-slot, .ws-chip, [data-lcs-answer], [data-lcs-given]';
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
module.exports = { pageFill };
