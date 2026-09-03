/**
 * K-287 — Singular and Plural (nt20-B; `singular-plural`, K, L.K.1.c).
 * ONE → MANY story rows: one picture with its word printed solid on the
 * left; the same picture cloned two or three times on the right with the
 * PLURAL in dashed strokes under the crowd and an empty writing trio. Count
 * badges (1 · 3) make the row legible without reading. Regular (prefix)
 * plurals ONLY at every level (L.K.1.c is regular plurals; irregulars are
 * L.2.1.b) — a locale/theme short of regular plurals refuses.
 * d1: 3 rows, 2 clones · d2: 4 rows · d3: 4 rows, longer words.
 */
'use strict';
const { strokeWordLane } = require('../../primitives/trace-path.js');
const { countBadge } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, traceable, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { LABELS } = require('../../data/b2/labels.js');

// en: the L.K.1.c prefix rule (cat→cats, box→boxes). Other locales: the locale's own
// default pattern — the stem (all but the last letter, diacritics folded) carries over
// and only the ending changes (it mela→mele, de Apfel→Äpfel, fi kissa→kissat).
function isRegular(sing, plur, loc) {
  const s = sing.toLocaleLowerCase(loc), p = plur.toLocaleLowerCase(loc);
  if (p === s) return false;
  if (loc === 'en') return p.startsWith(s);
  const fold = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const stem = fold(s).slice(0, Math.max(2, [...s].length - 1));
  return fold(p).startsWith(stem);
}

module.exports = {
  id: 'K-287',
  slug: 'singular-and-plural',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'singular-plural',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: {
    1: { rows: 3, clones: [2], rowH: 232, picSingle: 96, picClone: 70, glyphSing: 34, glyphPlur: 46, laneH: 58, minLetters: 0, maxLetters: 7 },
    2: { rows: 4, clones: [2, 3], rowH: 172, picSingle: 80, picClone: 50, glyphSing: 30, glyphPlur: 36, laneH: 46, minLetters: 0, maxLetters: 10 },
    3: { rows: 4, clones: [2, 3], rowH: 172, picSingle: 76, picClone: 48, glyphSing: 28, glyphPlur: 34, laneH: 44, minLetters: 5, maxLetters: 12 },
  },
  i18n: {
    en: {
      title: 'Singular and Plural',
      instruction: 'Read the word for one. Then trace the word for many and write it yourself on the empty line.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const L = LABELS[loc] && LABELS[loc].singularPlural;
    if (!L) throw new Error(`K-287: no labels for locale ${loc}`);
    let pool = entriesFor(theme, loc)
      .filter((e) => e.plural && isRegular(e.singular, e.plural, loc))
      .map((e) => ({ ...e, sing: displayWord(e.singular, loc), plur: displayWord(e.plural, loc) }))
      .filter((e) => traceable(e.sing) && traceable(e.plur))
      .filter((e) => [...e.plur].length >= d.minLetters && [...e.plur].length <= d.maxLetters);
    pool = distinctByWord(pool, (e) => e.sing);
    if (pool.length < d.rows) throw new Error(`K-287: theme ${theme}/${loc} has ${pool.length} regular traceable plurals < ${d.rows}`);
    const picks = rng.sample(pool, d.rows);
    const rows = picks.map((e) => {
      const n = rng.pick(d.clones);
      // direction:'toSingular' reverses which side is given. The shipped pair both
      // run one -> many; going the other way is the harder and more diagnostic
      // direction, because the child must REMOVE an ending rather than add one,
      // and that is where the misconceptions live. `isRegular()` already
      // guarantees the plural extends the stem, so the backward derivation is
      // well defined in every locale.
      const toSing = d.direction === 'toSingular';
      const single = toSing
        ? strokeWordLane({ text: e.sing, w: 160, h: d.laneH, glyphH: d.glyphSing, reps: 1, stack: true, modelless: true, emptyLast: true, align: 'center', padLeft: 0 })
        : strokeWordLane({ text: e.sing, w: 160, h: d.glyphSing + 14, glyphH: d.glyphSing, reps: 1, stack: true, align: 'center', padLeft: 0 });
      // plurModel:false removes the DASHED model from the plural lane, leaving a
      // bare writing rail. That turns a motor task into a recall task: the child
      // must produce the ending from the singular and the crowd of pictures
      // alone, which is the step between tracing and independent spelling.
      // `reps: 0` is a path the primitive already supports (K-284 uses it for
      // its extra empty lane), so this is a parameter, not a new code path.
      const plural = toSing
        ? strokeWordLane({ text: e.plur, w: 440, h: d.laneH, glyphH: d.glyphPlur, reps: 1, stack: true, align: 'center', padLeft: 8 })
        : strokeWordLane({ text: e.plur, w: 440, h: d.laneH, glyphH: d.glyphPlur, reps: d.plurModel === false ? 0 : 1, stack: true, modelless: true, emptyLast: true, padLeft: 8 });
      const clones = Array.from({ length: n }, (_, k) => {
        const rot = ((k - (n - 1) / 2) * 6).toFixed(1);
        return `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic="${e.vocabKey}" style="width:${d.picClone}px;height:${d.picClone}px;transform:rotate(${rot}deg)">`;
      }).join('');
      return `<div class="ws-card" style="flex-direction:row;height:${d.rowH}px;padding:8px 10px;gap:12px;align-items:center" ` +
        `data-lcs-row data-lcs-vocab="${e.vocabKey}" data-lcs-singular="${e.sing}" data-lcs-plural="${e.plur}" data-lcs-n="${n}"${d.plurModel === false ? ' data-lcs-plurmodel="0"' : ''}${toSing ? ' data-lcs-direction="toSingular"' : ''}>` +
        `<div style="width:176px;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative" data-lcs-side="one">` +
        `<div style="position:relative;margin:10px 0 0 10px">${countBadge(1)}<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic="${e.vocabKey}" style="width:${d.picSingle}px;height:${d.picSingle}px"></div>` +
        `${single.svg}</div>` +
        `<div style="width:2px;align-self:stretch;border-left:2px dashed #C8BFAE"></div>` +
        `<div style="flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:4px;position:relative" data-lcs-side="many">` +
        `<div style="position:relative;display:flex;gap:8px;align-items:flex-end;padding-left:22px;margin-top:10px">${countBadge(n)}${clones}</div>` +
        `<div class="ws-trace-lane">${plural.svg}</div></div></div>`;
    });
    const head = `<div style="display:flex;justify-content:space-between;padding:0 24px 0 44px" data-lcs-heads>` +
      `<span class="ws-pill" style="font-size:18px;padding:2px 18px" data-lcs-head="one">1 · ${L.one}</span>` +
      `<span class="ws-pill" style="font-size:18px;padding:2px 18px" data-lcs-head="many">2 · 3 · ${L.many}</span></div>`;
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px">${head}${rows.join('')}</div>`,
      meta: { pairs: picks.map((e) => [e.sing, e.plur]) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const rows = [...document.querySelectorAll('[data-lcs-row]')];
      if (rows.length < 3) fails.push(`only ${rows.length} rows`);
      const seen = new Set();
      rows.forEach((row, i) => {
        const s = row.dataset.lcsSingular, p = row.dataset.lcsPlural, n = +row.dataset.lcsN;
        if (seen.has(row.dataset.lcsVocab)) fails.push(`row ${i + 1}: duplicate noun`);
        seen.add(row.dataset.lcsVocab);
        if (s === p) fails.push(`row ${i + 1}: plural equals singular`);
        const fold = (w) => w.toLocaleLowerCase(lang).normalize('NFD').replace(/[̀-ͯ]/g, '');
        const stem = lang === 'en' ? s.toLocaleLowerCase(lang) : fold(s).slice(0, Math.max(2, [...s].length - 1));
        if (!(lang === 'en' ? p.toLocaleLowerCase(lang) : fold(p)).startsWith(stem)) fails.push(`row ${i + 1}: "${p}" is not a regular plural of "${s}"`);
        if (n < 2 || n > 3) fails.push(`row ${i + 1}: ${n} clones`);
        const oneImgs = row.querySelectorAll('[data-lcs-side="one"] img');
        const manyImgs = row.querySelectorAll('[data-lcs-side="many"] img');
        if (oneImgs.length !== 1) fails.push(`row ${i + 1}: ${oneImgs.length} single pictures`);
        if (manyImgs.length !== n) fails.push(`row ${i + 1}: ${manyImgs.length} clones, want ${n}`);
        const srcs = new Set([...oneImgs, ...manyImgs].map((im) => im.getAttribute('src')));
        if (srcs.size !== 1) fails.push(`row ${i + 1}: pictures differ`);
        const badges = [...row.querySelectorAll('[data-lcs-count-badge]')].map((b) => +b.dataset.lcsCountBadge);
        if (badges.join(',') !== `1,${n}`) fails.push(`row ${i + 1}: badges ${badges.join(',')}`);
        const lanes = [...row.querySelectorAll('[data-lcs-prim="trace-word"]')];
        const sLane = lanes.find((l) => l.dataset.lcsText === s), pLane = lanes.find((l) => l.dataset.lcsText === p);
        if (!sLane || !pLane) { fails.push(`row ${i + 1}: lanes missing`); return; }
        // ⚠ EVERY LANE ASSERTION BELOW ASSUMES one -> many, so the reversed face
        // would fail all of them: the singular is no longer the solid model and
        // the plural is no longer the dashed one. Stamped only when declared.
        const toSing = row.dataset.lcsDirection === 'toSingular';
        const sPaths = [...sLane.querySelectorAll('path')];
        if (toSing) {
          if (!sPaths.length || sPaths.some((x) => !x.getAttribute('stroke-dasharray'))) fails.push(`row ${i + 1}: singular should be the dashed model`);
          if (!sLane.dataset.lcsEmptySlot) fails.push(`row ${i + 1}: singular has no empty writing trio`);
        } else if (!sPaths.length || sPaths.some((x) => x.getAttribute('stroke-dasharray'))) fails.push(`row ${i + 1}: singular not solid`);
        // Three assertions branch on plurModel, and every one of them would fail a
        // CORRECT no-model page: with reps 0 there are no paths at all, so
        // "plural has a solid stroke" fires on an empty set, and the trio count
        // is 1 rather than 2. The stamp is emitted only when the face declares
        // it, so the default assertions are unchanged in strength.
        const noModel = row.dataset.lcsPlurmodel === '0';
        const pPaths = [...pLane.querySelectorAll('path')];
        const trios = pLane.querySelectorAll(':scope > g');
        if (toSing) {
          // reversed: the PLURAL is the solid given and carries no writing trio
          if (!pPaths.length || pPaths.some((x) => x.getAttribute('stroke-dasharray'))) fails.push(`row ${i + 1}: plural should be the solid given`);
        } else if (noModel) {
          if (pPaths.length) fails.push(`row ${i + 1}: plural lane should carry no model at all`);
          if (trios.length !== 1) fails.push(`row ${i + 1}: ${trios.length} trios, want 1`);
        } else {
          if (!pPaths.length || pPaths.some((x) => !x.getAttribute('stroke-dasharray'))) fails.push(`row ${i + 1}: plural has a solid stroke`);
          if (trios.length !== 2) fails.push(`row ${i + 1}: ${trios.length} trios, want 2`);
          if (trios[1] && trios[1].querySelectorAll('path').length) fails.push(`row ${i + 1}: empty trio has strokes`);
        }
        if (!toSing && !pLane.dataset.lcsEmptySlot) fails.push(`row ${i + 1}: no empty writing trio`);
        if (row.querySelectorAll('[data-lcs-prim="trace-word"] text').length) fails.push(`row ${i + 1}: word printed as <text>`);
        // the plural never appears as visible text on the row
        const txt = row.textContent;
        if (txt.includes(p)) fails.push(`row ${i + 1}: plural printed as text`);
      });
      const heads = document.querySelectorAll('[data-lcs-head]');
      if (heads.length !== 2) fails.push('column heads missing');
      return fails;
    });
  },
};
