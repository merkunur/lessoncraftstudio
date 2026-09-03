/**
 * K-284 — Trace and Write the Words (nt20-B; `word-tracing`, K, L.K.1.a).
 * Four flashcard rows: a big theme picture on a cream card, then a STACKED
 * full-width lane block — the word once in solid teal school hand, the same
 * word beneath in dashed centreline strokes (letters line up as a copying
 * scaffold), then an empty school-line trio. Every word owns the full lane
 * width, so "Regenschirm" and "sammakko" trace at the same K size as "cat".
 * d1: 3 rows, short words · d2: 4 rows · d3: 4 rows, caption model + two
 * writing trios ("trace once, write twice"). de keeps the vocab capital.
 */
'use strict';
const { strokeWordLane } = require('../../primitives/trace-path.js');
const { entriesFor, displayWord, traceable, distinctByWord, fileUri } = require('../../lib/b2-common.js');

module.exports = {
  id: 'K-284',
  slug: 'trace-and-write-the-words',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'word-tracing',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: {
    1: { rows: 3, maxLetters: 5, glyphH: 56, laneH: 68, pic: 150, cardW: 176, rowH: 218, caption: false, reps: 2 },
    2: { rows: 4, maxLetters: 9, glyphH: 46, laneH: 58, pic: 120, cardW: 150, rowH: 178, caption: false, reps: 2 },
    3: { rows: 4, minLetters: 5, maxLetters: 11, glyphH: 40, laneH: 52, pic: 96, cardW: 150, rowH: 178, caption: true, reps: 1 },
  },
  i18n: {
    en: {
      title: 'Trace and Write the Words',
      instruction: 'Say the picture word. Trace the dashed letters, then write the word yourself on the empty lines.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    let pool = entriesFor(theme, loc).map((e) => ({ ...e, word: displayWord(e.singular, loc) }))
      .filter((e) => traceable(e.word))
      .filter((e) => [...e.word].length <= d.maxLetters && [...e.word].length >= (d.minLetters || 2));
    // `case: 'upper'` traces the word in block capitals. A different motor task,
    // not a harder one, and the FIRST hand taught in several of these systems —
    // data/tracing/letter-sets.js records the French panel's note that GS traces
    // CAPITALES d'imprimerie first. Applied after the length filter so the pool is
    // chosen on the real word, and with the LOCALE's caser so Turkish-style dotted
    // i rules would be honoured if such a locale is ever added.
    if (d.case === 'upper') pool = pool.map((e) => ({ ...e, word: e.word.toLocaleUpperCase(loc) }));
    pool = distinctByWord(pool, (e) => e.word);
    if (pool.length < d.rows) {
      // d1 fallback: the shortest words when the theme has few ≤5-letter nouns
      pool = distinctByWord(entriesFor(theme, loc).map((e) => ({ ...e, word: displayWord(e.singular, loc) })).filter((e) => traceable(e.word)), (e) => e.word)
        .sort((a, b) => [...a.word].length - [...b.word].length).slice(0, Math.max(d.rows, 6));
      if (pool.length < d.rows) throw new Error(`K-284: theme ${theme} has ${pool.length} traceable nouns < ${d.rows}`);
    }
    const picks = rng.sample(pool, d.rows);
    const laneW = 660 - d.cardW - 14;
    const rows = picks.map((e) => {
      const rot = (rng.next() * 8 - 4).toFixed(1);
      let card;
      if (d.caption) {
        const cap = strokeWordLane({ text: e.word, w: d.cardW - 12, h: 32, glyphH: [...e.word].length >= 9 ? 18 : 24, reps: 1, stack: true, align: 'center', padLeft: 0 });
        card = `<div class="ws-card" style="width:${d.cardW}px;height:${d.rowH}px;flex:0 0 auto;align-items:center;justify-content:center;gap:6px;padding:8px">` +
          `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic="${e.vocabKey}" style="width:${d.pic}px;height:${d.pic}px;transform:rotate(${rot}deg)">` +
          `<div data-lcs-caption>${cap.svg}</div></div>`;
      } else {
        card = `<div class="ws-card" style="width:${d.cardW}px;height:${d.rowH}px;flex:0 0 auto;align-items:center;justify-content:center;padding:8px">` +
          `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic="${e.vocabKey}" style="width:${d.pic}px;height:${d.pic}px;transform:rotate(${rot}deg)"></div>`;
      }
      // d1/d2: model + trace + empty · d3: trace + empty + empty (caption is the model)
      // traceLane:false removes the dashed lane from the CAPTION variant, leaving
      // caption-model + two empty rails — copying from a model rather than tracing
      // over one, which is the next handwriting stage. verify() needs no change:
      // expectTrios = reps + emptySlot falls to 1, its `j < reps` loop never runs,
      // and data-lcs-empty-slot is still set. Undefined everywhere else, so every
      // shipped coordinate is byte-identical.
      const capReps = d.traceLane === false ? 0 : 1;
      const lane = d.caption
        ? strokeWordLane({ text: e.word, w: laneW, h: d.laneH, glyphH: d.glyphH, reps: capReps, stack: true, modelless: true, emptyLast: true, padLeft: 10 })
        : strokeWordLane({ text: e.word, w: laneW, h: d.laneH, glyphH: d.glyphH, reps: d.reps, stack: true, emptyLast: true, padLeft: 10 });
      const extraEmpty = d.caption
        ? strokeWordLane({ text: e.word, w: laneW, h: d.laneH, glyphH: d.glyphH, reps: 0, stack: true, emptyLast: true, padLeft: 10 }).svg
        : '';
      return `<div class="ws-trace-lane" style="display:flex;align-items:center;gap:14px;height:${d.rowH}px" ` +
        `data-lcs-word="${e.word}" data-lcs-vocab="${e.vocabKey}" data-lcs-case="${/^\p{Lu}/u.test(e.word) ? 'upper' : 'lower'}"${d.case ? ` data-lcs-casemode="${d.case}"` : ''}>` +
        card + `<div style="display:flex;flex-direction:column;gap:2px" data-lcs-lanes>${lane.svg}${extraEmpty}</div></div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${rows.join('')}</div>`,
      meta: { words: picks.map((e) => e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const rows = [...document.querySelectorAll('[data-lcs-word]')];
      if (rows.length < 3) fails.push(`only ${rows.length} rows`);
      const seenW = new Set(), seenK = new Set();
      rows.forEach((row, i) => {
        const word = row.dataset.lcsWord;
        if (seenW.has(word)) fails.push(`row ${i + 1}: duplicate word`);
        seenW.add(word);
        if (seenK.has(row.dataset.lcsVocab)) fails.push(`row ${i + 1}: duplicate noun`);
        seenK.add(row.dataset.lcsVocab);
        if (!/^[\p{L}][\p{L} '’-]{0,15}$/u.test(word)) fails.push(`row ${i + 1}: suspicious word "${word}"`);
        const first = [...word][0];
        const isUpper = first !== first.toLowerCase();
        // ⚠ WITHOUT THIS BRANCH THE ASSERTION FAILS A CORRECT PAGE IN TEN OF
        // ELEVEN LOCALES. It encodes 'German capitalises nouns, nobody else does',
        // which is right for the default pool and exactly wrong for a face whose
        // whole subject is block capitals. The mode is stamped only when declared.
        const caseMode = row.dataset.lcsCasemode;
        if (caseMode === 'upper') {
          if ([...word].some((ch) => ch.toLocaleLowerCase(lang) === ch && ch.toLocaleUpperCase(lang) !== ch)) {
            fails.push(`row ${i + 1}: "${word}" is not all capitals`);
          }
        } else if ((lang === 'de') !== isUpper) fails.push(`row ${i + 1}: case rule (${lang}) violated for "${word}"`);
        if (row.dataset.lcsCase !== (isUpper ? 'upper' : 'lower')) fails.push(`row ${i + 1}: case stamp mismatch`);
        const img = row.querySelectorAll('img');
        if (img.length !== 1 || !img[0].complete || img[0].naturalWidth === 0) fails.push(`row ${i + 1}: picture missing/broken`);
        const lanes = [...row.querySelectorAll('[data-lcs-prim="trace-word"]')];
        const main = lanes.find((l) => l.closest('[data-lcs-lanes]'));
        if (!main) { fails.push(`row ${i + 1}: no lane`); return; }
        if (main.dataset.lcsText !== word) fails.push(`row ${i + 1}: lane text != word`);
        if (+main.dataset.lcsLetters !== [...word].length) fails.push(`row ${i + 1}: letters ${main.dataset.lcsLetters} != ${[...word].length}`);
        if (main.querySelectorAll('text').length) fails.push(`row ${i + 1}: word rendered as <text>`);
        if (main.querySelectorAll('circle, polygon').length) fails.push(`row ${i + 1}: guides on a word lane`);
        const reps = +main.dataset.lcsReps;
        const trios = [...main.querySelectorAll(':scope > g')];
        const expectTrios = reps + (main.dataset.lcsEmptySlot ? 1 : 0);
        if (trios.length !== expectTrios) fails.push(`row ${i + 1}: ${trios.length} trios, want ${expectTrios}`);
        trios.forEach((g, j) => {
          const paths = g.querySelectorAll('path');
          if (j < reps) {
            if (paths.length !== +main.dataset.lcsStrokes) fails.push(`row ${i + 1} trio ${j + 1}: ${paths.length} strokes`);
            const dashed = [...paths].every((p) => p.getAttribute('stroke-dasharray'));
            const solid = [...paths].every((p) => !p.getAttribute('stroke-dasharray'));
            const modelless = !!main.dataset.lcsModelless;
            if (j === 0 && !modelless && !solid) fails.push(`row ${i + 1}: model not solid`);
            if ((j > 0 || modelless) && !dashed) fails.push(`row ${i + 1} trio ${j + 1}: not dashed`);
          } else if (paths.length) fails.push(`row ${i + 1}: empty trio has strokes`);
          if (g.querySelectorAll('line').length < 3) fails.push(`row ${i + 1} trio ${j + 1}: school lines missing`);
        });
        if (!main.dataset.lcsEmptySlot) fails.push(`row ${i + 1}: no empty writing trio`);
      });
      return fails;
    });
  },
};
