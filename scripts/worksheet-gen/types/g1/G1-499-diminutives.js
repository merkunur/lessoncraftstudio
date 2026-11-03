/**
 * G1-499 — Diminutives (Vocabulary maker 2026-11-02, NEW-TEMPLATES §46 T3; word formation — de "Verkleinerungsform
 * -chen / -lein", nl "verkleinwoorden -je", es "diminutivos -ito", pt "diminutivo e aumentativo", it "nomi alterati", fr
 * "le nom du petit"): each row a picture and its word, then the same picture drawn small and a box; the child writes the
 * small form. Level 3: in de / nl the word comes with its article and the child writes the article too — every
 * diminutive is "das" / "het" (der Hund → das Hündchen); in es / pt / it half the rows ask the big form (the picture
 * drawn big: casa → casota / casarão, libro → librone). The forms are literals per locale (data/word-meaning/word-meaning-
 * new.js DIMINUTIVES / AUGMENTATIVES — never a computed suffix: Hund → Hündchen carries an umlaut, vaca → vaquita a new
 * letter); the base word is the vocabulary's own, checked against the table. en, sv, da, no and fi are refused: no
 * diminutive their schools teach. Every box is an answer box holding the form (the other accepted forms as alts).
 * Levels: 1 six rows · 2 eight rows · 3 de / nl: six rows with the article; es / pt / it: eight rows, small and big; fr:
 * eight rows.
 */
'use strict';
const { DIMINUTIVES, AUGMENTATIVES } = require('../../data/word-meaning/word-meaning-new.js');
const { vocab } = require('../../lib/b2-common.js');
const { picOf, srcOf } = require('../_shared/pic-by-key.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { rows: 6 }, 2: { rows: 8 }, 3: { rows: 8, mix: true } };
const ARTICLE = { de: { m: 'der', f: 'die', n: 'das', dim: 'das' }, nl: { d: 'de', h: 'het', dim: 'het' } };

module.exports = {
  id: 'G1-499',
  slug: 'diminutives',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'word-parts',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Little Words', instruction: 'Write the small form of each word.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const dims = DIMINUTIVES[L];
    if (!dims) throw new Error(`G1-499: ${L} has no diminutive its schools teach`);
    const v = vocab();
    const usable = (list) => list.filter(([k, base]) => picOf(k) && v[k] && v[k][L] && v[k][L][0] === base);
    const article = d.mix && ARTICLE[L];
    const withAug = d.mix && AUGMENTATIVES[L];
    let rows;
    if (withAug) {
      const aug = rng.shuffle(usable(AUGMENTATIVES[L])).slice(0, Math.floor(d.rows / 2)).map((x) => ({ x, big: true }));
      const used = new Set(aug.map((r) => r.x[0]));
      const dim = rng.shuffle(usable(dims).filter(([k]) => !used.has(k))).slice(0, d.rows - aug.length).map((x) => ({ x, big: false }));
      rows = rng.shuffle([...aug, ...dim]);
    } else {
      rows = rng.shuffle(usable(dims)).slice(0, article ? 6 : d.rows).map((x) => ({ x, big: false }));
    }
    const want = withAug ? d.rows : article ? 6 : d.rows;
    if (rows.length < want) throw new Error(`G1-499: ${L} has ${rows.length} words with pictures (< ${want})`);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const items = rows.map(({ x: [k, base, forms], big }) => {
      const [form, ...alts] = forms.split('|');
      const g = v[k][L][2];
      const word = L === 'de' ? base : base.toLocaleLowerCase(L);
      const shown = article ? `${ARTICLE[L][g]} ${word}` : word;
      const answer = article ? `${ARTICLE[L].dim} ${form}` : form;
      return { k, shown, answer, alts: article ? alts.map((a) => `${ARTICLE[L].dim} ${a}`) : alts, big, src: srcOf(picOf(k)) };
    });
    const n = items.length, px = n > 6 ? 54 : 72;
    const longest = Math.max(...items.map((it) => [...it.answer].length));
    const boxW = Math.min(260, Math.max(170, longest * 15 + 30));
    const html = items.map((it, i) => {
      const k2 = Math.round(px * (it.big ? 1.25 : 0.55));
      return `<div data-lcs-dim-row="${i + 1}" data-lcs-big="${it.big ? 1 : 0}" style="display:flex;align-items:center;gap:14px;padding:4px 14px;border-radius:14px;background:${T.cream}">` +
        `<img class="ws-icon" src="${it.src}" alt="" style="width:${px}px;height:${px}px;flex:0 0 auto;object-fit:contain">` +
        `<span style="flex:1 1 0;min-width:0;font:700 26px/1.1 'Baloo 2',cursive;color:${T.ink}">${it.shown}</span>` +
        `<span style="font:700 28px/1 'Baloo 2',cursive;color:${T.teal}">→</span>` +
        `<span style="flex:0 0 auto;display:flex;align-items:flex-end;justify-content:center;width:${Math.round(px * 1.25)}px;height:${Math.round(px * 1.25)}px"><img class="ws-icon" src="${it.src}" alt="" style="width:${k2}px;height:${k2}px;object-fit:contain"></span>` +
        `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${it.answer}"${it.alts.length ? ` data-lcs-alts="${it.alts.join('|')}"` : ''}` : ''} style="display:inline-flex;flex:0 0 auto;width:${boxW}px;height:50px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-diminutives style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${html.join('')}</div>`,
      meta: { rows: items.map((it) => `${it.shown} → ${it.big ? 'BIG ' : ''}[${it.answer}]${it.alts.length ? ' (' + it.alts.join('/') + ')' : ''}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-dim-row]')];
      if (rows.length < 6) fails.push(`${rows.length} rows`);
      const root = document.querySelector('[data-lcs-diminutives]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`row ${i + 1} leaves the page`);
        r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: a picture did not load`); });
      });
      return fails;
    });
  },
};
