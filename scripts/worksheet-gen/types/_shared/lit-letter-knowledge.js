/**
 * Factory: LITERACY letter-knowledge — TEXT-tile letter work (no pictures).
 * Modes:
 *   'upper-lower'      two columns (UPPERCASE left, lowercase right, deranged);
 *                      child draws a line from each capital to its small letter.
 *   'missing-alphabet' the locale alphabet in order with some letters blanked
 *                      (dashed boxes); child writes the missing letters.
 *   'find-letter-grid' a target letter + a grid of letters; circle every match.
 *   'vowel-consonant'  a strip of letters + two word-labeled bins (Vowels /
 *                      Consonants); draw each letter to the right bin.
 *
 * NATIVE-PER-LANGUAGE: the alphabet is the locale's own (en a-z; de adds ä ö ü;
 * Nordic adds å æ ø; es ñ; etc.) — supplied per locale in the data file. No
 * pool words are needed (this is pure letter knowledge), so it is buildable for
 * every locale from its alphabet alone.
 *
 * cfg: { id, slug, gradeBand, exerciseType, mode, data, i18n, [difficulty] }
 *   data = { alphabets: { en:"abc…", de:"abc…äöü", … } }   (lowercase, in order)
 *
 * Cores untouched: borrows .ws-match / .ws-match-col / .ws-match-item /
 * .ws-match-dot for the match mode; all letter-tile CSS scoped inline.
 * themeAxis OFF; the letter sample + derangement (or blank positions) = variety.
 */
'use strict';
const { keyNumber } = require('./key-number.js');

/*
 * The maker's answer key and screen (2026-11-02): marks stamped on the KEY and SCREEN builds only (mk = 'key' | 'screen',
 * from ctx.answerKey / ctx.screen); the catalogue page carries none and is byte-unchanged.
 *   upper-lower       key: each capital numbered, each small letter the number of its capital · screen: tap-to-pair
 *   missing-alphabet  every blank an empty answer box holding its letter (key writes it, screen types it)
 *   find-letter-grid  every letter a tap candidate, the targets correct (key: ringed)
 *   vowel-consonant   every letter a drop spot answered by its bin, the bins the palette (key: bin numbers)
 */

const SCOPED_CSS = `
.lit-lk{flex:1 1 auto;display:flex;align-items:stretch;justify-content:center;min-height:0;padding:6px 0}
.lit-letter{font-family:'Baloo 2',cursive;font-weight:700;color:#146B5E;line-height:1}
.lit-lk-mtile{display:flex;align-items:center;justify-content:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:16px}
.lit-lk-seq{flex:1 1 auto;display:flex;flex-wrap:wrap;align-content:space-evenly;justify-content:center;gap:16px 14px}
.lit-lk-cell{display:flex;align-items:center;justify-content:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:16px}
.lit-lk-blank{background:#FFFFFF;border:2.5px dashed #F2784B;font:700 38px/1 'Baloo 2',cursive}
.lit-lk-target{display:flex;align-items:center;justify-content:center;gap:14px;padding:6px 0 16px}
.lit-lk-target-chip{display:flex;align-items:center;justify-content:center;width:64px;height:64px;background:#146B5E;color:#FFFFFF;border-radius:16px;font-family:'Baloo 2',cursive;font-weight:700;font-size:38px}
.lit-lk-grid{flex:1 1 auto;display:grid;gap:14px;justify-content:center;align-content:space-evenly}
.lit-lk-sort{flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:40px;min-height:0;padding:6px 0}
.lit-lk-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;padding:4px 0 10px}
.lit-lk-bins{display:flex;justify-content:space-evenly;align-items:flex-end;gap:24px;padding-top:24px}
.lit-lk-bin{flex:1 1 0;max-width:300px;height:280px;background:#FFFFFF;border:3px solid #146B5E;border-top:3px dashed #146B5E;border-radius:0 0 18px 18px;position:relative}
.lit-lk-bin-label{position:absolute;top:-26px;left:50%;transform:translateX(-50%);white-space:nowrap;background:#FBF3E4;border:2.5px solid #146B5E;border-radius:999px;padding:6px 18px;font-family:'Baloo 2',cursive;font-weight:700;font-size:17px;color:#146B5E}
`;

const slot = require('../../lib/slot.js');

function makeLitLetterKnowledge(cfg) {
  const data = cfg.data || {};
  const alphabets = data.alphabets || {};
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'letter-knowledge',
    mode: cfg.mode || 'upper-lower',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { n: 6 }, 2: { n: 8 }, 3: { n: 10 } },
    i18n: cfg.i18n,

    build({ difficulty, locale }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const alphabet = (alphabets[locale] || alphabets.en || 'abcdefghijklmnopqrstuvwxyz').split('');
      const mk = ctx && ctx.answerKey ? 'key' : ctx && ctx.screen ? 'screen' : null;

      if (this.mode === 'missing-alphabet') return buildMissingAlphabet(alphabet, d, rng, mk, ctx);
      if (this.mode === 'find-letter-grid') return buildFindLetterGrid(alphabet, d, rng, null, mk, ctx);
      if (this.mode === 'vowel-consonant') return buildVowelConsonant(alphabet, d, rng, locale, data, mk, ctx);
      return buildUpperLower(alphabet, d, rng, mk, ctx);
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const blanks = document.querySelectorAll('.lit-lk-blank').length;
        const left = [...document.querySelectorAll('[data-lk-left]')].map((e) => e.dataset.lkLeft);
        const right = [...document.querySelectorAll('[data-lk-right]')].map((e) => e.dataset.lkRight);
        const targets = document.querySelectorAll('[data-lk-target]').length;
        const bins = [...document.querySelectorAll('[data-lk-bin]')].map((b) => b.dataset.lkBin);
        const items = [...document.querySelectorAll('[data-lk-item]')].map((i) => i.dataset.lkItem);
        if (targets > 0) {
          // find-letter-grid
          if (!document.querySelector('.lit-lk-target-chip')) fails.push('find-letter: no target chip');
          const gridCells = document.querySelectorAll('.lit-lk-grid .lit-lk-cell').length;
          if (gridCells < 20) fails.push('find-letter: grid smaller than 20 cells');
          if (targets < 4) fails.push('find-letter: fewer than 4 target letters to find');
        } else if (bins.length) {
          // vowel-consonant sort
          if (bins.length !== 2) fails.push('vowel/consonant: expected 2 bins');
          items.forEach((b, i) => { if (!bins.includes(b)) fails.push(`item ${i + 1} bin "${b}" has no labeled bin`); });
          bins.forEach((bk) => { if (!items.includes(bk)) fails.push(`bin "${bk}" got no letters`); });
        } else if (left.length) {
          if (left.length !== right.length) fails.push('letter column length mismatch');
          if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column not a permutation of left');
          left.forEach((v, i) => { if (right[i] === v) fails.push(`row ${i + 1}: capital sits straight across from its match`); });
        } else if (blanks === 0) {
          fails.push('letter-knowledge: no recognized content rendered');
        }
        return fails;
      });
    },
  };
}

/* --- upper-lower match --- */
function buildUpperLower(alphabet, d, rng, mk, ctx) {
  const n = Math.min(d.n, alphabet.length);
  const letters = slot.words(ctx, rng.sample(alphabet, n), alphabet, 'letter');   // a teacher's letters (maker)
  let order;
  do { order = rng.shuffle(letters.map((_, i) => i)); }
  while (n > 1 && order.some((v, i) => v === i));

  const itemH = Math.floor((720 - (n - 1) * 14) / n);
  const tile = Math.min(78, itemH - 18);
  const fs = Math.round(tile * 0.6);

  const left = letters.map((ch, i) =>
    `<div class="ws-match-item" style="width:170px;height:${itemH}px" data-lk-left="${ch}"${slot.attr(ctx, 'letter', i)}` +
    (mk === 'key' ? ` data-lcs-pair="${i + 1}">${keyNumber(i + 1)}` : mk === 'screen' ? ` data-lcs-key-badge="u${i + 1}">` : '>') +
    `<span class="lit-lk-mtile lit-letter" style="width:${tile}px;height:${tile}px;font-size:${fs}px">${ch.toUpperCase()}</span>` +
    `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
  const right = order.map((srcIdx) => {
    const ch = letters[srcIdx];
    return `<div class="ws-match-item ws-match-item--plain" style="width:170px;height:${itemH}px" data-lk-right="${ch}"` +
      (mk === 'key' ? ` data-lcs-key-badge="${srcIdx + 1}">` : mk === 'screen' ? ` data-lcs-pair="u${srcIdx + 1}">` : '>') +
      `<span class="ws-match-dot ws-match-dot--left"></span>` +
      `<span class="lit-lk-mtile lit-letter" style="width:${tile}px;height:${tile}px;font-size:${fs}px">${ch}</span></div>`;
  }).join('');

  return {
    bodyHtml:
      `<style>${SCOPED_CSS}</style>` +
      `<div class="lit-lk ws-match" style="padding:6px 56px">` +
      `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
    meta: { mode: 'upper-lower', pairs: letters.map((c) => c.toUpperCase() + '→' + c) },
  };
}

/* --- missing-letter-in-alphabet --- */
function buildMissingAlphabet(alphabet, d, rng, mk, ctx) {
  // blank out d.n positions (never the first), spaced out
  const total = alphabet.length;
  const blankCount = Math.min(d.n, Math.floor(total / 2));
  const candidatePositions = alphabet.map((_, i) => i).filter((i) => i > 0);
  // a teacher's missing letters (maker): the blanks as letters, chosen from every letter but the first
  const missing = slot.words(ctx, rng.sample(candidatePositions, blankCount).map((i) => alphabet[i]), alphabet.slice(1), 'missing');
  const blanks = new Set(missing.map((ch) => alphabet.indexOf(ch)));

  const tile = 66;   // as big as eight to a row allow (2026-11-02: 56 px tiles left half the page blank)
  const fs = 38;
  const cells = alphabet.map((ch, i) => {
    if (blanks.has(i)) {
      return `<span class="lit-lk-cell lit-lk-blank" data-lit-content data-lk-missing="${ch}"${slot.attr(ctx, 'missing', missing.indexOf(ch))}${mk ? ` data-lcs-answer="${ch}"` : ''} style="width:${tile}px;height:${tile}px"></span>`;   // the answer font is the .lit-lk-blank rule (the screen build adds marks only)
    }
    return `<span class="lit-lk-cell lit-letter" data-lit-content style="width:${tile}px;height:${tile}px;font-size:${fs}px">${ch}</span>`;
  }).join('');

  return {
    bodyHtml:
      `<style>${SCOPED_CSS}</style>` +
      `<div class="lit-lk"><div class="lit-lk-seq">${cells}</div></div>`,
    meta: { mode: 'missing-alphabet', missing: [...blanks].sort((a, b) => a - b).map((i) => alphabet[i]) },
  };
}

/* --- find-letter-in-grid --- */
function buildFindLetterGrid(alphabet, d, rng, opts, mk, ctx) {
  const target = slot.words(ctx, rng.sample(alphabet, 1), alphabet, 'target')[0];   // a teacher's letter to find (maker)
  const others = alphabet.filter((c) => c !== target);
  const cols = 6, rows = 5, total = cols * rows;
  const hits = Math.min(d.n, total - cols); // d.n target instances
  const cells = [];
  for (let i = 0; i < hits; i++) cells.push(target);
  while (cells.length < total) cells.push(others[Math.floor(rng.next() * others.length)]);
  const grid = rng.shuffle(cells);
  const tile = 52, fs = 28;
  const cellsHtml = grid.map((ch) => {
    const isT = ch === target;
    return `<span class="lit-lk-cell lit-letter" data-lit-content${isT ? ' data-lk-target="1"' : ''}${mk ? ` data-lcs-pick="1"${isT ? ' data-lcs-correct="1"' : ''}` : ''} ` +
      `style="width:${tile}px;height:${tile}px;font-size:${fs}px">${ch}</span>`;
  }).join('');
  return {
    bodyHtml:
      `<style>${SCOPED_CSS}</style>` +
      `<div class="lit-lk" style="flex-direction:column">` +
      `<div class="lit-lk-target"><span class="lit-lk-target-chip"${slot.attr(ctx, 'target', 0)}>${target}</span>` +
      `<span class="lit-lk-target-chip" style="background:#FBF3E4;color:#146B5E;border:2.5px solid #146B5E">${target.toUpperCase()}</span></div>` +
      `<div class="lit-lk-grid" style="grid-template-columns:repeat(${cols},auto)">${cellsHtml}</div></div>`,
    meta: { mode: 'find-letter-grid', target, hits },
  };
}

/* --- vowel/consonant sort --- */
function buildVowelConsonant(alphabet, d, rng, locale, data, mk, ctx) {
  const vowelStr = (data.vowels && (data.vowels[locale] || data.vowels.en)) || 'aeiou';
  const vowelSet = new Set(vowelStr.split(''));
  const lab = data.vcLabels || { vowels: { en: 'Vowels' }, consonants: { en: 'Consonants' } };
  const vLabel = (lab.vowels[locale] || lab.vowels.en);
  const cLabel = (lab.consonants[locale] || lab.consonants.en);

  const vowels = alphabet.filter((c) => vowelSet.has(c));
  const consonants = alphabet.filter((c) => !vowelSet.has(c));
  const perBin = Math.max(2, Math.floor(d.n / 2));
  // a teacher's letters (maker): the vowels from the vowels, the consonants from the consonants
  const vs = slot.words(ctx, rng.sample(vowels, Math.min(perBin, vowels.length)), vowels, 'vowel');
  const cs = slot.words(ctx, rng.sample(consonants, Math.min(perBin + 1, consonants.length)), consonants, 'consonant');
  const pick = rng.shuffle([
    ...vs.map((c, i) => ({ ch: c, bin: 'vowel', i })),
    ...cs.map((c, i) => ({ ch: c, bin: 'consonant', i })),
  ]);
  const tile = 64, fs = 36;
  const binNo = { vowel: 1, consonant: 2 };
  const strip = pick.map((it) =>
    `<span class="lit-lk-cell lit-letter" data-lit-content data-lk-item="${it.bin}"${slot.attr(ctx, it.bin, it.i)}${mk === 'screen' ? ` data-lcs-drop="1" data-lcs-answer="${it.bin}"` : ''} ` +
    `style="width:${tile}px;height:${tile}px;font-size:${fs}px${mk === 'key' ? ';position:relative' : ''}">${it.ch}${mk === 'key' ? keyNumber(binNo[it.bin]).replace('top:6px;right:6px', 'top:-12px;right:-12px') : ''}</span>`).join('');
  const binsHtml =
    `<div class="lit-lk-bin" data-lk-bin="vowel"${mk === 'screen' ? ' data-lcs-bin="vowel"' : ''}><span class="lit-lk-bin-label">${vLabel}</span>${mk === 'key' ? keyNumber(1) : ''}</div>` +
    `<div class="lit-lk-bin" data-lk-bin="consonant"${mk === 'screen' ? ' data-lcs-bin="consonant"' : ''}><span class="lit-lk-bin-label">${cLabel}</span>${mk === 'key' ? keyNumber(2) : ''}</div>`;
  return {
    bodyHtml:
      `<style>${SCOPED_CSS}</style>` +
      `<div class="lit-lk-sort"><div class="lit-lk-strip">${strip}</div>` +
      `<div class="lit-lk-bins">${binsHtml}</div></div>`,
    meta: { mode: 'vowel-consonant', items: pick.map((it) => ({ ch: it.ch, bin: it.bin })) },
  };
}

module.exports = { makeLitLetterKnowledge };
