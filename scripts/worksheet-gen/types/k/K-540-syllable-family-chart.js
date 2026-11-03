/**
 * K-540 — Syllable Family Chart (Syllables maker 2026-11-02, NEW-TEMPLATES §40 T2; the syllabic method of es / pt / it /
 * fr: "família silábica", "lectura de sílabas", "le sillabe", "lecture de syllabes"): one consonant and its syllables
 * (b + a = ba, b + e = be …), each with a picture whose name starts with that syllable where the reviewed bank has one
 * (data/b3/syllable-reading.js + data/b3/locales: the consonant families of the Syllable Carpet G1-306, every word's
 * split from the syllable safety pipeline). A syllable with no picture is printed alone. en de nl sv da no fi are
 * refused: the syllable family is not a teaching convention there (de's Silbenteppich is the carpet, G1-306).
 * Level 1: read the chart — consonant + vowel = syllable, the picture and its word with the syllable in colour.
 * Level 2: the syllable box is empty — the child joins consonant and vowel and writes the syllable (answer box).
 * Level 3: trace each syllable three times on school lines (the model first, solid), beside its picture.
 * Levels 1 and 3 have no answer; level 2's boxes hold their syllable.
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');
const { manifest, labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const { strokeWordLane } = require('../../primitives/trace-path.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const LOCALES = new Set(['es', 'pt', 'it', 'fr']);
const D = { 1: { task: 'read' }, 2: { task: 'write' }, 3: { task: 'trace' } };
const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
let PIC = null;
function picOf(key) {
  if (!PIC) {
    PIC = new Map();
    for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) for (const n of labelSafeNouns(theme)) {
      const k = n.vocabKey || n.noun;
      if (!PIC.has(k) && !nameRefused(theme, n.noun) && !REFUSED_NOUNS.has(n.noun)) PIC.set(k, { theme, noun: n.noun });
    }
  }
  return PIC.get(key) || null;
}

// words a child of the locale names otherwise (es-MX "manopla" is an oven mitt or brass knuckles; review 2026-11-02)
const CHART_REJECT = { es: ['manopla'] };

module.exports = {
  id: 'K-540',
  slug: 'syllable-family-chart',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'syllable-reading',
  themeAxis: { applicable: false },
  // the languages that teach the syllable family (the maker offers it there only; build-bundles probes in the first)
  onlyLocales: ['es', 'pt', 'it', 'fr'],
  difficulty: D,
  i18n: { en: { title: 'Syllable Family', instruction: 'Read each syllable and the word of its picture.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[1], rng = ctx.rng, L = A.loc2(locale);
    if (!LOCALES.has(L)) throw new Error(`K-540: ${L} refused (the syllable family is not taught there)`);
    const R = bank('syllable-reading', L);
    // a family whose five plain syllables (consonant + a e i o u) each have a picture where possible: at least three
    const fam = (R.units || []).map((u) => {
      const cells = u.cells.slice(0, 5);
      const rows = cells.map((syl) => {
        const w = rng.shuffle(u.words.filter((x) => x.unit === syl && picOf(x.key) && !(CHART_REJECT[L] || []).includes(x.word)))[0] || null;
        return { syl, word: w ? w.word : null, pic: w ? picOf(w.key) : null };
      });
      return { id: u.id, rows, withPic: rows.filter((r) => r.pic).length };
    }).filter((f) => f.rows.length === 5 && f.withPic >= 3);
    if (!fam.length) throw new Error(`K-540: ${L} has no syllable family with three pictures`);
    const f = fam[((ctx.variant || 1) - 1) % fam.length];
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const cons = f.id.split('-')[0];
    const big = (s, color) => `<span style="font:700 40px/1 'Baloo 2',cursive;color:${color || T.ink}">${s}</span>`;
    const rows = f.rows.map((r) => {
      const vowel = r.syl.slice(cons.length) || r.syl.slice(-1);
      const pic = r.pic ? `<img class="ws-icon" src="${fileUri(r.pic.theme, r.pic.noun)}" alt="" style="width:76px;height:76px;flex:0 0 auto">` : `<span style="width:76px;flex:0 0 auto"></span>`;
      const word = r.word ? `<span style="font:700 26px/1 'Baloo 2',cursive;color:${T.ink};min-width:150px"><span style="color:${T.coral}">${r.word.slice(0, r.syl.length)}</span>${r.word.slice(r.syl.length)}</span>` : `<span style="min-width:150px"></span>`;
      let left;
      if (d.task === 'trace') {
        left = `<div style="flex:0 0 auto">${strokeWordLane({ text: r.syl, w: 380, h: 78, glyphH: 52, reps: 3 }).svg}</div>`;
      } else {
        const box = d.task === 'write'
          ? `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${r.syl}"` : ''} style="display:inline-flex;width:86px;height:58px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:12px;background:#FFFFFF"></span>`
          : `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:86px;height:58px;border-radius:12px;background:${T.tealSoft || '#DCEFEA'}">${big(r.syl, T.teal)}</span>`;
        left = `<div style="display:flex;align-items:center;gap:12px;flex:0 0 auto">${big(cons)}${big('+', T.inkSoft)}${big(vowel, T.coral)}${big('=', T.inkSoft)}${box}</div>`;
      }
      return `<div data-lcs-family-row="${r.syl}" style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:8px 14px;border-radius:16px;background:${T.cream}">${left}${pic}${d.task === 'trace' ? '' : word}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-family="${f.id}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${rows.join('')}</div>`,
      meta: { family: f.id, rows: f.rows.map((r) => `${r.syl}${r.word ? ' ' + r.word : ''}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-family-row]')];
      if (rows.length !== 5) fails.push(`${rows.length} syllables`);
      const root = document.querySelector('[data-lcs-family]');
      const R = root.getBoundingClientRect();
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect();
        if (b.right > R.right + 1 || b.left < R.left - 1) fails.push(`row ${i + 1} leaves the page`);
        r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: the picture did not load`); });
      });
      return fails;
    });
  },
};
