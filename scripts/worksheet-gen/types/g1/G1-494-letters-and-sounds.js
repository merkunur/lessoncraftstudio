/**
 * G1-494 — Letters and Sounds (Phonics & Sounds maker 2026-11-02, NEW-TEMPLATES §38 T4; RF.1.3.a two letters for one
 * sound, RF.K.2.d): a picture with its word; the child counts the word's LETTERS and the SOUNDS heard, and writes both —
 * where they differ, two letters make one sound (sh, ck, ll, ie, ch, rr, eau …), the insight of Sound Boxes K-318.
 * The counts come from the reviewed sound-box segmentations (data/b3/sound-boxes.js + data/b3/locales: one box per
 * SOUND, a silent letter merged into its neighbour's box), the bank K-318 prints its boxes from. A word whose count the
 * boxes do not give is left out: a box of TWO sounds — x (/ks/) everywhere, de Sp / St / Pf, nl nk and sch (/ŋk/ /sx/),
 * it qu and pt qu + a o (/kw/) — and nl -dje / -tje, two boxes for one sound (broodje). fi refused (as many sounds as
 * letters in every word); da refused (soft d, vocalised r and the eg / øg diphthongs are not in its boxes).
 * The labels are signs, not words: "Aa" for letters, an ear for sounds.
 * Every box is an answer box holding its number (the key writes it, the screen types it).
 * Levels: 1 six words of 3-4 letters · 2 eight words of 4-5 letters · 3 eight words of 5-7 letters; about half the words
 * of a page have fewer sounds than letters.
 */
'use strict';
const slot = require('../../lib/slot.js');
const { bank } = require('../../lib/b3-common.js');
const { vocab, displayWord } = require('../../lib/b2-common.js');
const { manifest, labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const D = {
  1: { cards: 6, min: 3, max: 4, px: 78 },
  2: { cards: 8, min: 4, max: 5, px: 64 },
  3: { cards: 8, min: 5, max: 7, px: 64 },
};
// fi: as many sounds as letters in every word; da: soft d, vocalised r, eg / øg diphthongs the boxes do not mark
const REFUSED_LOCALES = new Set(['fi', 'da']);
// a box that is two sounds
// (and nl -dje / -tje: two boxes for ONE sound, broodje — left out below)
const TWO_SOUNDS = { all: /x/, de: /^(sp|st|qu|pf)$/, nl: /^(nk|sch)$/, it: /^qu$/ };
const twoSoundBox = (g, L, next) => TWO_SOUNDS.all.test(g) || (TWO_SOUNDS[L] && TWO_SOUNDS[L].test(g)) || (L === 'pt' && g === 'qu' && /^[ao]/.test(next || ''));
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

function poolFor(L, d) {
  const c = bank('sound-boxes', L), V = vocab(), out = [];
  for (const [key, rows] of Object.entries(c.bank || {})) {
    if ((c.exclude || []).includes(key) || !V[key] || !V[key][L] || !(V[key].de && V[key].de[2])) continue;
    const p = picOf(key);
    if (!p) continue;
    const flat = rows.flat(), word = displayWord(V[key][L][0], L), n = [...word].length;
    if (!/^\p{L}+$/u.test(word) || n < d.min || n > d.max || flat.join('') !== word.toLocaleLowerCase(L)) continue;
    if (flat.some((g, i) => twoSoundBox(g, L, flat[i + 1]))) continue;
    if (L === 'nl' && flat.some((g, i) => (g === 'd' || g === 't') && flat[i + 1] === 'j')) continue;
    // counts teachers do not agree on (review 2026-11-02): an r after a vowel in en (deer, fork: 2 or 3); pt nasal vowels
    // (trem em, balão ã + o) and a sounded u after g (pinguim); nl aai / ooi / oei and the silent w of erwten; sv / no
    // r + d t s n l, one retroflex sound in the east (bord, karta, ørn)
    if (L === 'en' && /[aeiou]r/.test(word.toLowerCase())) continue;
    if (L === 'pt' && (flat.some((g) => /[ãõ]/.test(g) || /^[aeiouáéíóúâêô]+[mn]$/.test(g)) || /gu[ie]/.test(word))) continue;
    if (L === 'nl' && (flat.some((g) => /^(aai|ooi|oei)$/.test(g)) || word === 'erwten')) continue;
    if ((L === 'sv' || L === 'no') && /r[dtsnl]/.test(word.toLocaleLowerCase(L))) continue;
    // nl: n + g across a syllable boundary is ONE sound /ŋ/ (engel e.n.g.e.l = 4 sounds, as tang t.a.ng)
    const ng = L === 'nl' ? flat.filter((g, i) => g === 'n' && flat[i + 1] === 'g').length : 0;
    out.push({ ...p, key, word, letters: n, sounds: flat.length - ng, boxes: flat.join('.') });
  }
  return out;
}

const ear = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true"><path d="M13 30c2 5 9 5 10-1 1-4 7-6 7-14a10 10 0 0 0-20 0" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round"/><path d="M16 16a4 4 0 0 1 8 0c0 3-4 3-4 6" fill="none" stroke="${T.teal}" stroke-width="3" stroke-linecap="round"/></svg>`;

module.exports = {
  id: 'G1-494',
  slug: 'letters-and-sounds',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'sound-boxes',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Letters and Sounds', instruction: 'Read each word. Count its letters (Aa) and the sounds you hear (ear). Write both numbers.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    if (REFUSED_LOCALES.has(L)) throw new Error(`G1-494: ${L} refused (as many sounds as letters in every word)`);
    // a level whose letter range gives too few words with fewer sounds than letters takes a letter or two more (es, da)
    let pool = poolFor(L, d);
    for (let w = 1; w <= 2 && pool.filter((x) => x.sounds < x.letters).length < Math.ceil(d.cards / 2); w++) pool = poolFor(L, { ...d, max: d.max + w });
    const differ = rng.shuffle(pool.filter((x) => x.sounds < x.letters)), equal = rng.shuffle(pool.filter((x) => x.sounds === x.letters));
    const nd = Math.ceil(d.cards / 2), ne = d.cards - nd;
    if (differ.length < 2 || differ.length + Math.min(equal.length, ne) < d.cards) throw new Error(`G1-494: ${L} has ${differ.length} + ${equal.length} words of ${d.min}-${d.max} letters`);
    const picks = [...differ.slice(0, Math.max(nd, d.cards - equal.length)), ...equal.slice(0, ne)].slice(0, d.cards);
    // a teacher's pictures (maker): a word with fewer sounds than letters for one of those, an even one for an even one
    const kindOf = (x) => (x.sounds < x.letters ? 'differ' : 'equal');
    const KS = slot.byKind(ctx, rng.shuffle(picks), kindOf, (k) => (k === 'differ' ? differ : equal), { multi: true, prefix: 'w' });
    const cards = KS.items;
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const box = (n) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${n}"` : ''} style="display:inline-flex;width:52px;height:50px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
    const html = cards.map((it, ci) => `<div class="ws-card-stage" style="justify-content:center;align-items:center;gap:16px;padding:6px 10px" data-ws-content data-lcs-ls-word="${it.word}"${KS.tap(ci)} data-lcs-letters="${it.letters}" data-lcs-sounds="${it.sounds}">` +
      `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:0 0 auto"><img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${d.px}px;height:${d.px}px">` +
      `<span style="font:700 26px/1 'Baloo 2',cursive;color:${T.ink}">${it.word}</span></div>` +
      `<div style="display:flex;flex-direction:column;gap:10px;flex:0 0 auto">` +
      `<div style="display:flex;align-items:center;gap:8px"><span style="width:40px;text-align:center;font:700 24px/1 'Baloo 2',cursive;color:${T.teal}">Aa</span>${box(it.letters)}</div>` +
      `<div style="display:flex;align-items:center;gap:8px"><span style="width:40px;display:inline-flex;justify-content:center">${ear(34)}</span>${box(it.sounds)}</div></div></div>`);
    return {
      bodyHtml: cardGrid({ cards: html, cols: 2, rows: Math.ceil(html.length / 2), numbered: true }),
      meta: { words: cards.map((it) => `${it.word} ${it.letters}/${it.sounds} (${it.boxes})`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-ls-word]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      const words = cards.map((c) => c.dataset.lcsLsWord);
      if (new Set(words).size !== words.length) fails.push('a word twice');
      const differ = cards.filter((c) => +c.dataset.lcsSounds < +c.dataset.lcsLetters).length;
      if (differ < 2 || differ === cards.length) fails.push(`${differ} of ${cards.length} words have fewer sounds than letters`);
      cards.forEach((c, i) => {
        if ([...c.dataset.lcsLsWord].length !== +c.dataset.lcsLetters) fails.push(`card ${i + 1}: the letter count is not the word's`);
        const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`card ${i + 1}: the picture did not load`);
        const R = c.getBoundingClientRect();
        c.querySelectorAll('span,img').forEach((x) => { const r = x.getBoundingClientRect(); if (r.width && (r.left < R.left - 1 || r.right > R.right + 1)) fails.push(`card ${i + 1}: a part leaves the card`); });
      });
      return [...new Set(fails)];
    });
  },
};
