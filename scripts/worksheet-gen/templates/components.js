/**
 * Shared worksheet components — the visual vocabulary reused across types:
 * icon row blocks, scattered icon stages, numeral chips, write-answer boxes,
 * icon cluster groups. All sizes derive from card geometry constants.
 */
'use strict';
const { fileUri } = require('../image-cache/resolve.js');

/** N same-noun icons in centered rows (max perRow per row), with rotation warmth. */
function iconRows({ theme, noun, n, iconPx, perRow, rng, gapX, gapY }) {
  const rows = [];
  let left = n;
  while (left > 0) {
    const take = Math.min(perRow, left);
    const imgs = [];
    for (let k = 0; k < take; k++) {
      const rot = (rng.next() * 8 - 4).toFixed(1);
      imgs.push(`<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" ` +
        `style="width:${iconPx}px;height:${iconPx}px;transform:rotate(${rot}deg)">`);
    }
    rows.push(`<div class="ws-icon-row"${gapX ? ` style="gap:${gapX}px"` : ''}>${imgs.join('')}</div>`);
    left -= take;
  }
  return `<div class="ws-icon-rows"${gapY ? ` style="gap:${gapY}px"` : ''}>${rows.join('')}</div>`;
}

/** Pick row/icon geometry for n icons in a stage box. */
function fitIcons({ n, stageW, stageH, maxPx, gapX = 10, gapY = 8 }) {
  const perRow = n <= 5 ? n : Math.ceil(n / Math.ceil(n / 5));
  const rows = Math.ceil(n / perRow);
  const iconPx = Math.min(
    maxPx || 84,
    Math.floor((stageW - (perRow - 1) * gapX) / perRow),
    Math.floor((stageH - (rows - 1) * gapY) / rows)
  );
  return { perRow, rows, iconPx };
}

/**
 * N icons scattered in a w×h stage without overlap: jittered shuffled grid
 * cells (deterministic via rng). Returns absolutely-positioned imgs.
 */
function iconScatter({ theme, noun, n, w, h, iconPx, rng }) {
  const cols = Math.ceil(Math.sqrt(n * (w / h)));
  const rows = Math.ceil(n / cols);
  const cellW = w / cols, cellH = h / rows;
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
  const picked = rng.shuffle(cells).slice(0, n);
  const jx = Math.max(0, (cellW - iconPx) / 2 - 2);
  const jy = Math.max(0, (cellH - iconPx) / 2 - 2);
  const imgs = picked.map(([c, r]) => {
    const x = c * cellW + (cellW - iconPx) / 2 + (rng.next() * 2 - 1) * jx;
    const y = r * cellH + (cellH - iconPx) / 2 + (rng.next() * 2 - 1) * jy;
    const rot = (rng.next() * 16 - 8).toFixed(1);
    return `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" ` +
      `style="position:absolute;left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;` +
      `width:${iconPx}px;height:${iconPx}px;transform:rotate(${rot}deg)">`;
  });
  return `<div style="position:relative;width:${w}px;height:${h}px">${imgs.join('')}</div>`;
}

/**
 * Mixed-noun scatter: counts = { noun: n, ... } placed in one w×h stage on
 * jittered shuffled grid cells (no overlap). Each img carries
 * data-lcs-scatter="<vocabKey>" for counting in verify().
 */
function mixedScatter({ theme, items, w, h, iconPx, rng, mark }) {
  const total = items.reduce((a, it) => a + it.n, 0);
  const cols = Math.ceil(Math.sqrt(total * (w / h)));
  const rows = Math.ceil(total / cols);
  const cellW = w / cols, cellH = h / rows;
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
  const picked = rng.shuffle(cells).slice(0, total);
  const flat = [];
  items.forEach((it) => { for (let k = 0; k < it.n; k++) flat.push(it); });
  const order = rng.shuffle(flat);
  const jx = Math.max(0, (cellW - iconPx) / 2 - 2);
  const jy = Math.max(0, (cellH - iconPx) / 2 - 2);
  const imgs = order.map((it, i) => {
    const [c, r] = picked[i];
    const x = c * cellW + (cellW - iconPx) / 2 + (rng.next() * 2 - 1) * jx;
    const y = r * cellH + (cellH - iconPx) / 2 + (rng.next() * 2 - 1) * jy;
    const rot = (rng.next() * 16 - 8).toFixed(1);
    const extra = mark ? mark(it, i) : '';
    return `<img class="ws-icon" src="${fileUri(theme, it.noun)}" alt="" data-lcs-scatter="${it.vocabKey}"${extra} ` +
      `style="position:absolute;left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;` +
      `width:${iconPx}px;height:${iconPx}px;transform:rotate(${rot}deg)">`;
  });
  return `<div style="position:relative;width:${w}px;height:${h}px">${imgs.join('')}</div>`;
}

/** Numeral choice chips; exactly one carries data-lcs-correct. */
function chipRow({ choices, correct, size }) {
  const px = size || 52;
  const font = Math.round(px * 0.54);
  return `<div class="ws-choices">` + choices.map((v) =>
    `<span class="ws-chip" style="width:${px}px;height:${px}px;font-size:${font}px" ` +
    `data-lcs-choice="${v}"${v === correct ? ' data-lcs-correct="1"' : ''}>${v}</span>`).join('') +
    `</div>`;
}

/** Write-in answer box (dashed, friendly). data carries ground truth. */
function answerBox({ w, h, answer, label }) {
  return `<span class="ws-answerbox" style="width:${w || 64}px;height:${h || 56}px" ` +
    `data-lcs-answer="${answer}">${label || ''}</span>`;
}

/**
 * Wrong numbers near the right one (± the deltas, inside [min, max]). The RANK of the right number among all the choices
 * is drawn first, evenly over the ranks the range allows, then the wrong numbers that give it: picking ± deltas at random
 * made the right number the middle one about half the time, so "pick the middle number" scored (task 4 settings-space,
 * 2026-11-01: K-002 level 3 67 %, K-027 level 2 81 %). Only at the edge of the range (the right number is min or max) is
 * the rank forced.
 */
function distractorsFor({ correct, count, min, max, rng, deltas }) {
  const pool = deltas || [-3, -2, -1, 1, 2, 3];
  const ok = (v) => v >= min && v <= max && v !== correct;
  const below = [...new Set(pool.filter((d) => d < 0).map((d) => correct + d))].filter(ok);
  const above = [...new Set(pool.filter((d) => d > 0).map((d) => correct + d))].filter(ok);
  const ranks = [];
  for (let r = 0; r <= count; r++) if (below.length >= r && above.length >= count - r) ranks.push(r);
  if (ranks.length) {
    const r = rng.pick(ranks);
    return [...rng.shuffle(below).slice(0, r), ...rng.shuffle(above).slice(0, count - r)];
  }
  const ds = new Set([...below, ...above].slice(0, count));
  if (ds.size < count) { // degenerate range fallback: walk outward
    for (let step = 1; ds.size < count; step++) {
      for (const v of [correct - step, correct + step]) {
        if (ok(v) && ds.size < count) ds.add(v);
      }
      if (step > (max - min)) break;
    }
  }
  return [...ds];
}

module.exports = { iconRows, fitIcons, iconScatter, mixedScatter, chipRow, answerBox, distractorsFor };
