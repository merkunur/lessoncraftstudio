/**
 * K-322 — Four Seasons Sort (nt20-C; family key `seasons`; K; science;
 * readiness — no CCSS code). Design: docs/worksheet-gen/b3-designs/
 * K-322-seasons.md §2/§5 under _BUILD-BRIEF.md + the README rulings.
 *
 * The SANDWICH: four season SIGNS in a row across the middle (white cards,
 * teal frame, a language-free SVG glyph over the season name), four marker
 * pictures above and four below, each with one coral dot on the edge facing
 * the signs; the child draws one pencil line per picture from its dot to its
 * sign. Nothing else is printed.
 *
 * THEMELESS (`themeAxis:{applicable:false}`): the pools ARE the theme —
 * cross-theme `(theme, noun)` refs resolved by `fileUri` (winter / spring /
 * summer / thanksgivinng / tree / vegetables / forest creatures). One instance
 * per (difficulty, locale); the fan lever is the seed. `unitAxis` NOT
 * applicable (a marker category is a pool filter, not a move).
 *
 * Boundary (load-bearing): K-322 owns SEASON MARKERS. K-207 (summer-vs-winter
 * CLOTHES) owns its 12 nouns — they never enter a neutral pool (the gate reads
 * data/science/summer-vs-winter-clothes.json at validate time; the page never
 * does). Answers are never printed: a tile carries its season only in
 * `data-lcs-season`, the bins print glyph + name and are empty; `verify(page)`
 * re-derives the whole composition from the stamps + geometry.
 *
 * Difficulty is a CONFIG; every guard keys on the resolved config, never on
 * the level index:
 *   perBin         markers per season (items = 4 × perBin; K ceiling [4, 8]
 *                  at d1/d2, d3 = 12 by design — the rows shrink to 84 px)
 *   rowLen         tiles per row (= 2 × perBin)
 *   tile / iconPx  tile box / picture size (≥ the K floor 56)
 *   cols           bin column per tile (tile centres = bin centres) or null
 *                  (d3: a centred row, no column alignment)
 *   maxAlignedPerRow  ≤ N tiles per row may sit over their OWN sign (null = off)
 *   allowWeak      d3 admits the `weak:true` markers (pale in mono)
 *   writeNames / binH  d3: the bin prints the glyph over an empty writing row
 *   namePx         the bin name size (Baloo 2 700; the K label floor is 18)
 * Refusal (throw, never a filler): a pool below `perBin` after veto /
 * override / weak-filter, an unknown season key, a cycle that is not a
 * rotation of the four keys, or no shuffle satisfying (a)-(d) in 400 tries.
 */
'use strict';
const { bank: loadBank, bankModule } = require('../../lib/b3-common.js');
const { fileUri, sampleEntries } = require('../../lib/b2-common.js');
const { markerTile, seasonBin, seasonSortStage } = require('../../templates/components-b3.js');

const BANK = 'seasons';
const KEYS = ['winter', 'spring', 'summer', 'autumn'];
const TRIES = 400;

function isRotation(seq, cycle) {
  if (seq.length !== cycle.length) return false;
  for (let s = 0; s < cycle.length; s++) {
    if (seq.every((v, i) => v === cycle[(i + s) % cycle.length])) return true;
  }
  return false;
}
/** (a) no contiguous window of 4 tiles reads as a rotation of the cycle. */
function hasCycleWindow(seasons, cycle) {
  for (let i = 0; i + cycle.length <= seasons.length; i++) {
    if (isRotation(seasons.slice(i, i + cycle.length), cycle)) return true;
  }
  return false;
}

module.exports = {
  id: 'K-322',
  slug: 'seasons',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'seasons',
  themeAxis: { applicable: false },
  difficulty: {
    1: { perBin: 1, rowLen: 2, tile: 124, iconPx: 100, cols: [1, 2], maxAlignedPerRow: 1, allowWeak: false, writeNames: false, binH: 160, namePx: 22, rowGap: 51 },
    2: { perBin: 2, rowLen: 4, tile: 112, iconPx: 88, cols: [0, 1, 2, 3], maxAlignedPerRow: 1, allowWeak: false, writeNames: false, binH: 160, namePx: 22, rowGap: 63 },
    3: { perBin: 3, rowLen: 6, tile: 84, iconPx: 64, cols: null, maxAlignedPerRow: null, allowWeak: true, writeNames: true, binH: 190, namePx: 22, rowGap: 20 },
  },
  i18n: {
    en: {
      title: 'Four Seasons Sort',
      instruction: 'Draw a line from the dot on each picture to the season box it belongs to.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const mod = bankModule(BANK);
    if (!mod.neutral) throw new Error('K-322: data/b3/seasons.js has no neutral block');
    return this._buildWith({ neutral: mod.neutral, block: loadBank(BANK, loc) }, { theme, difficulty, locale: loc }, ctx);
  },

  /** The effective pool of one season for a locale block (override > veto > weak filter). */
  _pool(neutral, block, season, allowWeak) {
    const ov = block.override && block.override[season];
    if (ov) {
      if (!Array.isArray(ov.items)) throw new Error(`K-322: override ${season} without items`);
      return ov.items.filter((it) => allowWeak || !it.weak);
    }
    const base = neutral.pools && neutral.pools[season];
    if (!Array.isArray(base)) throw new Error(`K-322: neutral pool "${season}" is absent`);
    const veto = new Set((block.veto || []).map((v) => v.theme + '/' + v.noun));
    return base.filter((it) => !veto.has(it.theme + '/' + it.noun)).filter((it) => allowWeak || !it.weak);
  },

  /** The whole build over an INJECTED bank {neutral, block} (the gate's poison seam). */
  _buildWith(bank, { difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-322: no difficulty ' + difficulty);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const { neutral, block } = bank;
    const keys = neutral.keys || KEYS;
    if (keys.length !== 4 || keys.some((k) => !KEYS.includes(k))) throw new Error('K-322: neutral.keys must be the four season keys');
    const cycle = block.cycle;
    if (!Array.isArray(cycle) || !isRotation(cycle, KEYS)) throw new Error(`K-322: ${loc} cycle ${JSON.stringify(cycle)} is not a rotation of ${KEYS.join(',')}`);
    if (d.perBin < 1) throw new Error('K-322: perBin < 1');
    if (d.rowLen !== 2 * d.perBin) throw new Error(`K-322: rowLen ${d.rowLen} ≠ 2 × perBin ${d.perBin}`);
    if (d.iconPx < 56) throw new Error(`K-322: iconPx ${d.iconPx} < the K floor 56`);
    if (d.cols && d.cols.length !== d.rowLen) throw new Error('K-322: cols must name one bin column per tile');
    for (const k of KEYS) if (!block.names || !block.names[k]) throw new Error(`K-322: ${loc} has no name for ${k}`);

    // one pool per season; sample-or-throw (a pool below perBin is a refusal)
    const items = [];
    for (const season of KEYS) {
      const pool = this._pool(neutral, block, season, d.allowWeak);
      const picked = sampleEntries(rng, pool, d.perBin, `K-322 ${loc} ${season}`);
      for (const it of picked) items.push({ theme: it.theme, noun: it.noun, season });
    }
    const nouns = new Set(items.map((it) => it.noun));
    if (nouns.size !== items.length) throw new Error('K-322: a noun appears twice on the page');

    // (a) neither row a cycle rotation, (b) no row single-season,
    // (c) <= maxAlignedPerRow tiles per row over their own sign, (d) no noun twice
    const aligned = (row) => d.cols ? row.filter((it, i) => cycle[d.cols[i]] === it.season).length : 0;
    let top = null, bottom = null;
    for (let t = 0; t < TRIES; t++) {
      const order = rng.shuffle(items);
      const a = order.slice(0, d.rowLen), b = order.slice(d.rowLen);
      const okRow = (row) => new Set(row.map((it) => it.season)).size >= 2 &&
        !hasCycleWindow(row.map((it) => it.season), cycle) &&
        (d.maxAlignedPerRow == null || aligned(row) <= d.maxAlignedPerRow);
      if (okRow(a) && okRow(b)) { top = a; bottom = b; break; }
    }
    if (!top) throw new Error(`K-322 ${loc}: no row order satisfies (a)-(d) in ${TRIES} tries (refuse)`);

    const tileOf = (it, dot) => markerTile({ theme: it.theme, noun: it.noun, src: fileUri(it.theme, it.noun), season: it.season, px: d.iconPx, tile: d.tile, dot });
    const bins = cycle.map((k) => seasonBin({ key: k, name: block.names[k], h: d.binH, namePx: d.namePx || 22, writeLane: !!d.writeNames }));
    const stage = seasonSortStage({
      top: top.map((it) => tileOf(it, 'bottom')),
      bins,
      bottom: bottom.map((it) => tileOf(it, 'top')),
      tile: d.tile, rowGap: d.rowGap, cols: d.cols,
    });
    const bodyHtml = stage.replace('data-lcs-seasons ',
      `data-lcs-seasons data-lcs-per-bin="${d.perBin}" data-lcs-max-aligned="${d.maxAlignedPerRow == null ? 'off' : d.maxAlignedPerRow}" data-lcs-icon-px="${d.iconPx}" `);
    return {
      bodyHtml,
      meta: { perBin: d.perBin, cycle, top: top.map((it) => it.theme + '/' + it.noun), bottom: bottom.map((it) => it.theme + '/' + it.noun), seasons: { top: top.map((it) => it.season), bottom: bottom.map((it) => it.season) } },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const KEYS = ['winter', 'spring', 'summer', 'autumn'];
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-ws-content][data-lcs-seasons]');
      if (!root) return ['no seasons root'];
      const perBin = +root.dataset.lcsPerBin;
      const maxAligned = root.dataset.lcsMaxAligned;
      const bins = [...root.querySelectorAll('[data-lcs-bin]')];
      const cycle = bins.map((b) => b.dataset.lcsBin);
      // 4 bins = a rotation of the four keys, in order
      if (cycle.length !== 4) fails.push(`${cycle.length} bins, want 4`);
      const isRot = (seq) => seq.length === 4 && [0, 1, 2, 3].some((s) => seq.every((v, i) => v === cycle[(i + s) % 4]));
      if (new Set(cycle).size !== 4 || cycle.some((k) => !KEYS.includes(k)) || !isRot(KEYS)) fails.push(`bins ${cycle.join(',')} are not a rotation of ${KEYS.join(',')}`);
      // the bin prints a name (or a writing row at d3), never a picture; names distinct
      const names = [];
      bins.forEach((b, i) => {
        if (b.querySelector('img')) fails.push(`bin ${i + 1}: prints a picture`);
        if (!b.querySelector(`[data-lcs-icon="${b.dataset.lcsBin}"]`)) fails.push(`bin ${i + 1}: glyph ≠ ${b.dataset.lcsBin}`);
        const span = b.querySelector('.ws-season-name');
        const row = b.querySelector('[data-lcs-prim="writing-row"]');
        if (b.dataset.lcsWrite === '1') { if (!row) fails.push(`bin ${i + 1}: no writing row`); if (span) fails.push(`bin ${i + 1}: prints the name on a write bin`); }
        else {
          if (!span || !span.textContent.trim()) fails.push(`bin ${i + 1}: no name`);
          else {
            names.push(span.textContent.trim());
            if (span.scrollWidth > b.clientWidth - 16 + 0.6) fails.push(`bin ${i + 1}: "${span.textContent.trim()}" (${Math.round(span.scrollWidth)} px) wider than the bin's inner ${b.clientWidth - 16}`);
          }
        }
      });
      if (new Set(names.map((n) => n.toLocaleLowerCase())).size !== names.length) fails.push('two bins print the same name');
      // items
      const rows = ['top', 'bottom'].map((w) => [...root.querySelectorAll(`[data-lcs-row="${w}"] [data-lcs-item]`)]);
      const all = rows.flat();
      if (all.length !== 4 * perBin) fails.push(`${all.length} tiles ≠ 4 × perBin ${perBin}`);
      const count = {};
      const nouns = new Set();
      const minPx = Math.max(56, +root.dataset.lcsIconPx || 0);
      all.forEach((t, i) => {
        const s = t.dataset.lcsSeason;
        if (!cycle.includes(s)) fails.push(`tile ${i + 1}: season "${s}" is not a bin`);
        count[s] = (count[s] || 0) + 1;
        const noun = (t.dataset.lcsItem || '').split('/').pop();
        if (nouns.has(noun)) fails.push(`tile ${i + 1}: noun "${noun}" appears twice`);
        nouns.add(noun);
        if (t.textContent.trim()) fails.push(`tile ${i + 1}: prints text`);
        const imgs = t.querySelectorAll('img');
        if (imgs.length !== 1) { fails.push(`tile ${i + 1}: ${imgs.length} pictures`); return; }
        const im = imgs[0];
        if (!im.complete || im.naturalWidth === 0) fails.push(`tile ${i + 1}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`tile ${i + 1}: alt names the picture`);
        const parts = decodeURIComponent(im.src).split('/');
        const dir = parts[parts.length - 2] || '';
        if (BW.test(dir)) fails.push(`tile ${i + 1}: picture from a B&W directory "${dir}"`);
        const file = parts[parts.length - 1].replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
        if (file !== noun) fails.push(`tile ${i + 1}: picture "${file}" ≠ stamped noun "${noun}"`);
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < minPx - 0.6) fails.push(`tile ${i + 1}: icon ${Math.round(Math.min(r.width, r.height))} px < ${minPx}`);
        if (!t.querySelector('.ws-season-dot')) fails.push(`tile ${i + 1}: no dot`);
      });
      for (const k of cycle) if ((count[k] || 0) !== perBin) fails.push(`${k} receives ${count[k] || 0} tiles, want ${perBin}`);
      // (a)-(c) from DOM order + geometry
      const binCx = bins.map((b) => { const r = b.getBoundingClientRect(); return (r.left + r.right) / 2; });
      rows.forEach((row, ri) => {
        const seq = row.map((t) => t.dataset.lcsSeason);
        for (let i = 0; i + 4 <= seq.length; i++) if (isRot(seq.slice(i, i + 4))) fails.push(`${ri ? 'bottom' : 'top'} row reads as the season order (${seq.slice(i, i + 4).join(',')})`);
        if (new Set(seq).size < 2) fails.push(`${ri ? 'bottom' : 'top'} row is single-season`);
        if (maxAligned !== 'off') {
          let al = 0;
          row.forEach((t) => {
            const r = t.getBoundingClientRect(); const cx = (r.left + r.right) / 2;
            const over = binCx.findIndex((x) => Math.abs(x - cx) < 1);
            if (over >= 0 && cycle[over] === t.dataset.lcsSeason) al++;
          });
          if (al > +maxAligned) fails.push(`${ri ? 'bottom' : 'top'} row: ${al} tiles over their own sign > ${maxAligned}`);
        }
      });
      // dots face the signs: top-row dots below the tile centre, bottom-row above
      rows[0].forEach((t, i) => { const d = t.querySelector('.ws-season-dot'); if (d && d.getBoundingClientRect().top < t.getBoundingClientRect().top + t.offsetHeight / 2) fails.push(`top tile ${i + 1}: dot is not on the bottom edge`); });
      rows[1].forEach((t, i) => { const d = t.querySelector('.ws-season-dot'); if (d && d.getBoundingClientRect().bottom > t.getBoundingClientRect().top + t.offsetHeight / 2) fails.push(`bottom tile ${i + 1}: dot is not on the top edge`); });
      return fails;
    });
  },
};
