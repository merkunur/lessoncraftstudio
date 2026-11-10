/**
 * K-489 — Count the Kinds of Changes (Find the Differences maker 2026-11-02, NEW-TEMPLATES §29 T2): picture 1 over
 * picture 2; the child finds every difference and SORTS them — how many things are gone, how many got bigger or smaller
 * (and, from level 2, how many moved) — writing one count per kind. The step between "how many differences?" (G1-413) and
 * "tick the words of what changed" (G1-414): categorising and counting on one visual task.
 *
 * Every change on the page is of a counted kind (no swap, which could read as gone + new; a moved drawing only where
 * the level names "moved", and only a short move — the composer keeps its change box near the drawing's own size). The
 * kinds are the ones every scene has many of (a new drawing or a flipped one is rare: 0-3 per scene, measured
 * 2026-11-02). The counts per kind are drawn first (each kind at least once, the rest at random), then the changes of
 * each kind are composed from the scene's gated candidates, apart from the ones already placed; the page's raster diff
 * proves the total. Levels: 1 four changes, gone + bigger or smaller · 2 five changes, + moved · 3 six, smaller ones.
 */
'use strict';
const F = require('../../lib/fd-faces.js');
const C7 = require('../../templates/components-b7.js');

const D = {
  // measured 2026-11-02 over 60 scenes: 4 changes of two kinds fit 34, 5 of three kinds 21, 6 of three kinds 10 (the
  // rings 20 / 18 px apart, as the busier faces); the scenes that carry a level are pinned (data/b7/fd-face-pins.json)
  1: { n: 4, kinds: ['remove', 'scale'], ring: 56, area: 2000, sep: 20 },
  2: { n: 5, kinds: ['remove', 'scale', 'move'], ring: 48, area: 1500, move: 50, sep: 20 },
  3: { n: 6, kinds: ['remove', 'scale', 'move'], ring: 36, area: 800, move: 50, sep: 18 },
};
// the kind labels (short headings, not sentences: the b7 change words are sentence parts — "est en plus", "har kommit till")
const LABEL = {
  en: { remove: 'gone', scale: 'bigger or smaller', move: 'moved' },
  de: { remove: 'weg', scale: 'größer oder kleiner', move: 'verschoben' },
  fr: { remove: 'disparu', scale: 'plus grand ou plus petit', move: 'déplacé' },
  es: { remove: 'falta', scale: 'más grande o más chico', move: 'se movió' },
  pt: { remove: 'sumiu', scale: 'maior ou menor', move: 'mudou de lugar' },
  it: { remove: 'manca', scale: 'più grande o più piccolo', move: 'spostato' },
  nl: { remove: 'weg', scale: 'groter of kleiner', move: 'verplaatst' },
  sv: { remove: 'borta', scale: 'större eller mindre', move: 'flyttad' },
  da: { remove: 'væk', scale: 'større eller mindre', move: 'flyttet' },
  no: { remove: 'borte', scale: 'større eller mindre', move: 'flyttet' },
  fi: { remove: 'poissa', scale: 'isompi tai pienempi', move: 'siirtynyt' },
};
// the kind icons (drawn: no codepoint): an empty dashed place · a small and a big shape · a dashed place, an arrow, the drawing
const ICON = {
  remove: '<circle cx="24" cy="24" r="17" fill="none" stroke="#8A8276" stroke-width="3" stroke-dasharray="7 5"/>',
  scale: '<rect x="4" y="27" width="13" height="13" rx="2" fill="none" stroke="#146B5E" stroke-width="3"/><rect x="21" y="9" width="23" height="31" rx="3" fill="none" stroke="#146B5E" stroke-width="3"/>',
  move: '<circle cx="11" cy="30" r="8" fill="none" stroke="#8A8276" stroke-width="2.5" stroke-dasharray="4 3"/><circle cx="37" cy="18" r="8" fill="#146B5E"/><path d="M17 26 L28 20" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/><path d="M23 17 L30 19 L26 25" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
};
const icon = (k) => `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" data-lcs-fd-kind-icon="${k}" style="display:block">${ICON[k]}</svg>`;

/**
 * the changes of the page: ONE composition over all the counted kinds (the composer's own search places n separated
 * changes on n different drawings; composing kind by kind left no room for the later kinds — measured 2026-11-02), drawn
 * again up to 30 times until every kind is there at least once; the counts are what the composition holds
 */
function compose(scene, d, pw, rng) {
  let err;
  for (let t = 0; t < 30; t++) {
    try {
      const r = F.pickOps(scene, { ...F.cfgOf({ n: d.n, kinds: d.kinds, ring: d.ring, area: d.area, move: d.move, minSepPx: d.sep, noKindCap: true }, pw), spread: 'none' }, rng);
      const counts = d.kinds.map((k) => r.ops.filter((o) => o.kind === k).length);
      if (counts.some((c) => !c)) throw new Error(`fd-compose: ${scene.id} — a kind is missing (${counts.join('/')})`);
      return { ops: r.ops, rings: r.rings, counts };
    } catch (e) { err = e; if (!/fd-compose/.test(e.message)) throw e; }
  }
  throw err;
}

module.exports = {
  id: 'K-489',
  slug: 'count-the-kinds-of-changes',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'find-the-differences',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Count the Kinds of Changes',
      instruction: 'Find every difference in picture 2. Count the changes of each kind and write the number in its box.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey), loc = String(locale || 'en').slice(0, 2);
    const L = LABEL[loc] || LABEL.en;
    // the stack fills the body (2 × 358 + 12); a teacher's longer title gives the pictures back their px (fitsChrome)
    const chromeExtra = (ctx && ctx.chromeExtra) || 0;
    const pw = chromeExtra ? Math.floor(384 * Math.max(0.7, 1 - chromeExtra / 733)) : 384, ph = Math.round(pw * F.H / F.W);
    const got = F.sceneFor('K-489', difficulty, ctx, (scene) => ({ scene, c: compose(scene, d, pw, rng) }));
    const p1 = C7.fdPicture({ svg: F.panel(got.scene, [], { width: pw, clipId: 'fdk1', attrs: ' data-lcs-fd-panel="1"' }), w: pw, h: ph, tab: 1 });
    const p2 = C7.fdPicture({ svg: F.panel(got.scene, got.c.ops, { width: pw, clipId: 'fdk2', attrs: ' data-lcs-fd-panel="2"', ...(key ? { rings: got.c.rings } : {}) }), w: pw, h: ph, tab: 2 });
    // the kinds in a shuffled order: the composer makes more removals than moves, so a fixed order would read as a count
    // that goes down the column (the settings-space gate, 2026-11-02: "index-rev" 58 % at level 3)
    const order = rng.shuffle(d.kinds.map((k, i) => i));
    const rows = order.map((i) => d.kinds[i]).map((k) => { const i = d.kinds.indexOf(k); return `<div data-lcs-fd-kind="${k}" style="display:flex;align-items:center;gap:12px">` +
      `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;width:140px">${icon(k)}<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:18px;line-height:1.1;color:#3A3530;text-align:center">${L[k]}</span></div>` +
      `<span class="ws-answerbox" data-lcs-answer="${got.c.counts[i]}" data-lcs-label="${L[k]}" style="display:inline-block;width:68px;height:60px;box-sizing:border-box;border:2.5px solid #146B5E;border-radius:12px;background:#FFFFFF;font-family:'Baloo 2',cursive;font-weight:700;font-size:36px;line-height:56px;text-align:center"></span></div>`; }).join('');
    const right = `<div style="padding-top:${ph + 12 + 20}px;display:flex;flex-direction:column;gap:22px">${rows}</div>`;
    const body = `<div data-ws-content${require('../../lib/fl-art.js').tap(ctx)} data-lcs-fd-face="kinds" data-lcs-fd-unit="${got.id}" data-lcs-fd-count="${got.c.ops.length}"${key ? ' data-lcs-fd-key="1"' : ''} style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">` +
      C7.fdColumns({ cells: [C7.fdStack({ p1, p2 }), '', '', right], widths: [pw, 30, 6, 230] }) + `</div>`;
    return { bodyHtml: body, meta: { unit: got.id, counts: d.kinds.map((k, i) => k + ':' + got.c.counts[i]).join(',') } };
  },

  /** the pin tool's test (tools/build-fd-face-pins.js): the print size (a teacher's longer title only shrinks the pictures) */
  pinFits(scene, level) { return F.fits('K-489', level, scene, (s, rng) => compose(s, D[level], 384, rng)); },

  async verify(page) {
    const fails = [];
    const info = await page.evaluate(() => {
      const R = document.querySelector('[data-lcs-fd-face]');
      return { total: +R.dataset.lcsFdCount, boxes: [...document.querySelectorAll('[data-lcs-fd-kind] [data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer) };
    });
    if (info.boxes.length < 2) fails.push(`${info.boxes.length} kind boxes`);
    if (info.boxes.some((v) => !(v >= 1))) fails.push('a kind counted 0 times');
    const sum = info.boxes.reduce((a, b) => a + b, 0);
    if (sum !== info.total) fails.push(`the kind counts add to ${sum}, the page carries ${info.total} changes`);
    const r = await F.changes(page, 'svg[data-lcs-fd-panel="1"]', 'svg[data-lcs-fd-panel="2"]');
    if (r.error) fails.push(r.error);
    else if (r.comps.length !== info.total) fails.push(`${r.comps.length} visible differences, the counts say ${info.total}`);
    return fails.concat(await F.pageChecks(page));
  },
};
