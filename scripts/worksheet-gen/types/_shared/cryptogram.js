/**
 * types/_shared/cryptogram.js — the Secret Code maker's factory (2026-11-03, ENGINES Part 3 §C; the old cryptogram app's
 * phrases, picture code and revealed letters kept). A short sentence of the language (data/puzzles/phrases.js) is written
 * in a code; the key is printed, so decoding is a lookup, never a guess:
 *   pictures  one library picture per letter (distinct pictures; a theme with too few refuses)
 *   numbers   A = 1 in the language's alphabet order (data/b2/collation.js: es Ñ after N, sv/fi Å Ä Ö after Z, da/no Æ Ø Å)
 *   sums      each cell a sum whose answer is the letter's number (the key: numbers → letters)
 *   symbols   simple drawn shapes; level 2 / 3 key with gaps that ONE solved word fills (complete the key, then decode)
 *   own       an empty key and lines: the child makes a code of her own (open)
 * A letter with an accent (é, ã, ä) is a letter of its own in the key — never stripped (the old app wrote «ecole»). The
 * child writes CAPITALS; words never break across lines; punctuation is printed. «Given» letters are written in, never so
 * many that a word has nothing left to decode. Each letter cell is an answer box; the key fills them.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { refusedPicture } = require('../../lib/picture-refusals.js');
const slot = require('../../lib/slot.js');
const { COLLATION } = require('../../data/b2/collation.js');
const { PHRASES } = require('../../data/puzzles/phrases.js');
const T = require('../../primitives/_tokens.js').color;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// 24 language-free shapes (viewBox 0 0 40 40): drawn, never a text glyph (the page fonts carry none)
const SHAPES = [
  '<circle cx="20" cy="20" r="14"/>', '<rect x="7" y="7" width="26" height="26"/>', '<path d="M20 5 L35 33 L5 33 Z"/>', '<path d="M20 4 L24 15 L36 15 L26 22 L30 34 L20 27 L10 34 L14 22 L4 15 L16 15 Z"/>',
  '<path d="M20 34 C4 24 4 10 13 9 C17 9 20 13 20 13 C20 13 23 9 27 9 C36 10 36 24 20 34 Z"/>', '<path d="M20 4 L34 20 L20 36 L6 20 Z"/>', '<path d="M14 5 H26 V14 H35 V26 H26 V35 H14 V26 H5 V14 H14 Z"/>',
  '<path d="M27 6 A15 15 0 1 0 27 34 A11 11 0 1 1 27 6 Z"/>', '<path d="M20 4 L34 18 H26 V36 H14 V18 H6 Z"/>', '<path d="M12 6 H28 L36 20 L28 34 H12 L4 20 Z"/>', '<path d="M20 4 L35 15 L29 34 H11 L5 15 Z"/>',
  '<path d="M20 5 C26 14 32 20 32 26 A12 12 0 0 1 8 26 C8 20 14 14 20 5 Z"/>', '<path d="M8 8 L32 32 M32 8 L8 32" stroke-width="7" fill="none"/>', '<path d="M5 20 H35 M20 5 V35" stroke-width="7" fill="none"/>',
  '<circle cx="20" cy="20" r="14" fill="none" stroke-width="6"/>', '<rect x="8" y="8" width="24" height="24" fill="none" stroke-width="6"/>', '<path d="M20 7 L33 31 L7 31 Z" fill="none" stroke-width="5"/>',
  '<path d="M20 5 L34 20 L20 35 L6 20 Z" fill="none" stroke-width="5"/>', '<path d="M6 30 L20 8 L34 30" fill="none" stroke-width="6"/>', '<path d="M6 12 Q13 4 20 12 T34 12 M6 26 Q13 18 20 26 T34 26" fill="none" stroke-width="5"/>',
  '<path d="M5 13 H35 V27 H5 Z"/>', '<path d="M13 5 H27 V35 H13 Z"/>', '<circle cx="12" cy="20" r="7"/><circle cx="28" cy="20" r="7"/>', '<path d="M8 32 L20 8 L32 32 M12 24 H28" fill="none" stroke-width="5"/>',
];
const shapeSvg = (i, px) => `<svg width="${px}" height="${px}" viewBox="0 0 40 40" aria-hidden="true" style="display:block"><g fill="${T.teal}" stroke="${T.teal}" stroke-linejoin="round">${SHAPES[i]}</g></svg>`;

/** the code letters of a sentence in the language: capitals, accents kept, ß as SS */
const lettersOf = (s, L) => [...s.toLocaleUpperCase(L)].filter((c) => /\p{L}/u.test(c));
/** the key's alphabet: the language's school alphabet in its order, then each accented letter the sentence uses */
function alphabetFor(L, msg) {
  const base = COLLATION[L].alphabet.map((c) => c.toLocaleUpperCase(L));
  return base.concat([...new Set(lettersOf(msg, L))].filter((c) => !base.includes(c)));
}

function makeCryptogram(spec) {
  const { D } = spec;
  return {
    id: spec.id, slug: spec.slug, gradeBand: spec.gradeBand, assetClass: spec.code === 'pictures' ? 'icon-placement' : 'none', exerciseType: 'secret-code',
    themeAxis: spec.code === 'pictures' ? { applicable: true, minNouns: 12, excludeBw: true } : { applicable: false },
    difficulty: D, i18n: spec.i18n,

    build({ theme, difficulty, locale }, ctx) {
      const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
      const mark = !!(ctx && (ctx.answerKey || ctx.screen));
      if (spec.code === 'own') return buildOwn(d, L);
      const pics = spec.code === 'pictures' ? rng.shuffle(labelSafeNouns(theme).filter((x) => !refusedPicture(theme, x.noun))) : [];
      const fit = (PHRASES[L] || []).filter((ph) => {
        const ls = lettersOf(ph, L), distinct = new Set(ls).size;
        return ls.length >= d.min && ls.length <= d.max && distinct <= (spec.code === 'pictures' ? Math.min(pics.length, d.maxDistinct || 14) : d.maxDistinct || 30);
      });
      if (!fit.length) throw new Error(`${spec.id}: no sentence fits (${L}${theme ? '/' + theme : ''})`);
      // the secret message: a teacher may pick another of the reviewed sentences that fit the level (maker), else as drawn
      const msg = slot.words(ctx, [rng.pick(fit)], fit, 'message')[0], letters = lettersOf(msg, L), distinct = [...new Set(letters)];
      const alpha = alphabetFor(L, msg);
      // the code of each letter
      const codeOf = new Map();
      if (spec.code === 'pictures') distinct.forEach((c, i) => codeOf.set(c, { pic: pics[i] }));
      else if (spec.code === 'symbols') { const sh = rng.sample(SHAPES.map((_, i) => i), distinct.length); distinct.forEach((c, i) => codeOf.set(c, { shape: sh[i] })); }
      else alpha.forEach((c, i) => codeOf.set(c, { num: i + 1 }));
      // given letters: written in; every word keeps a letter to decode
      const words = msg.toLocaleUpperCase(L).split(/\s+/).filter(Boolean);
      const givenSet = new Set();
      if (d.given) {
        for (const c of rng.shuffle(distinct)) {
          if (givenSet.size >= d.given) break;
          const trial = new Set([...givenSet, c]);
          if (words.every((w) => lettersOf(w, L).some((x) => !trial.has(x)))) givenSet.add(c);
        }
      }
      // complete the key (symbols, levels 2-3): some key letters left blank, ONE solved word that holds every one of them
      let solved = null, blankKey = new Set();
      if (spec.code === 'symbols' && d.solvedWord) {
        const cand = rng.shuffle(words.map((w) => lettersOf(w, L).join('')).filter((w) => w.length >= 3));
        for (const w of cand) {
          const ws = new Set([...w]);
          const blanks = [...ws].filter((c) => !givenSet.has(c)).slice(0, d.blank);
          if (blanks.length < Math.min(d.blank, 2)) continue;
          solved = w; blankKey = new Set(blanks); break;
        }
        if (!solved) throw new Error(`${spec.id}: no word can carry the missing key letters (${L})`);
      }
      // the cells
      let cw = 54;
      const sym = (c, px) => {
        const k = codeOf.get(c);
        if (k.pic) return `<img class="ws-icon" src="${fileUri(theme, k.pic.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
        if (k.shape != null) return shapeSvg(k.shape, px - 6);
        if (spec.code === 'sums') {
          // a sum whose answer is the letter's number: a + b (both ≥ 1), or on level 3 sometimes (n + b) − b
          const n = k.num;
          let txt;
          if ((d.sub && rng.next() < 0.4) || n < 2) { const b = rng.int(1, 9); txt = `${n + b}−${b}`; }
          else { const a = rng.int(1, n - 1); txt = `${a}+${n - a}`; }
          return `<span data-lcs-sum="${n}" style="font:700 ${px > 64 ? 20 : px > 50 ? 17 : 15}px/1 'Nunito',sans-serif;color:${T.teal};white-space:nowrap">${esc(txt)}</span>`;
        }
        return `<span style="font:700 ${Math.max(22, Math.round(px * 0.42))}px/1 'Baloo 2',cursive;color:${T.teal}">${k.num}</span>`;
      };
      const cellOf = (c) => `<div data-lcs-cg-cell style="display:flex;flex-direction:column;align-items:center;gap:4px;width:${cw}px">` +
        `<div style="height:${cw - 6}px;display:flex;align-items:center;justify-content:center">${sym(c, cw - 6)}</div>` +
        (givenSet.has(c)
          ? `<span style="display:flex;align-items:center;justify-content:center;width:${cw - 6}px;height:${cw - 6}px;box-sizing:border-box;border:2px solid ${T.grid};border-radius:8px;font:700 26px/1 'Nunito',sans-serif;color:${T.ink}">${esc(c)}</span>`
          : `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(c)}"` : ''} style="width:${cw - 6}px;height:${cw - 6}px"></span>`) + '</div>';
      // lines: words never broken, at most `per` cells a line; the cell grows to fill the page — the widest line fits
      // 640 px, all the lines fit under the key — and `per` (from the longest word up to d.perLine) is the one that
      // gives the biggest cell (≤ d.cell or 80 px)
      const cellsOf = (w) => [...w].reduce((a, ch) => a + (/\p{L}/u.test(ch) ? (ch === 'ß' ? 2 : 1) : 0), 0);
      const marksOf = (w) => [...w].filter((ch) => !/\p{L}/u.test(ch)).length;
      const keyN = spec.code === 'pictures' || spec.code === 'symbols' ? distinct.length : alpha.length;
      const keyH = Math.ceil(keyN * (spec.code === 'pictures' ? 57 : 46) / 620) * (spec.code === 'pictures' ? 80 : 72) + 24 + (solved ? 90 : 0);
      const breakAt = (per) => {
        const out = [[]];
        for (const w of words) {
          const n = lettersOf(w, L).length, cur = out[out.length - 1], used = cur.reduce((a, x) => a + lettersOf(x, L).length + 1, 0);
          if (cur.length && used + n > per) out.push([w]); else cur.push(w);
        }
        return out;
      };
      const cellFor = (lns) => {
        const widthFit = Math.min(...lns.map((ln) => {
          const n = ln.reduce((a, w) => a + cellsOf(w), 0), m = ln.reduce((a, w) => a + marksOf(w), 0);
          return Math.floor((640 - (ln.length - 1) * 22 - m * 20) / n) - 4;
        }));
        const heightFit = Math.floor(((700 - keyH) / lns.length - 22) / 2) + 6;
        return Math.min(d.cell || 80, widthFit, heightFit);
      };
      let lines = breakAt(d.perLine);
      for (let per = Math.max(...words.map((w) => cellsOf(w))); per < d.perLine; per++) {
        const lns = breakAt(per);
        if (cellFor(lns) > cellFor(lines)) lines = lns;
      }
      cw = Math.max(40, cellFor(lines));
      const wordHtml = (w) => {
        const out = [];
        for (const ch of [...w]) out.push(/\p{L}/u.test(ch) ? (ch === 'ß' ? cellOf('S') + cellOf('S') : cellOf(ch)) : `<span style="align-self:flex-end;font:700 26px/1 'Nunito',sans-serif;color:${T.ink};padding-bottom:10px">${esc(ch)}</span>`);
        return `<div data-lcs-cg-word style="display:flex;gap:4px">${out.join('')}</div>`;
      };
      const msgHtml = lines.map((ln) => `<div style="display:flex;gap:22px;justify-content:center;flex-wrap:nowrap">${ln.map(wordHtml).join('')}</div>`).join('');
      // the key
      const keyCells = (spec.code === 'pictures' || spec.code === 'symbols' ? rng.shuffle(distinct) : alpha);
      const keyCell = (c) => {
        const blank = blankKey.has(c);
        return `<div data-lcs-cg-key="${esc(c)}" style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:3px;border-radius:8px;background:#FFFFFF;border:2px solid ${T.grid}">` +
          `<div style="height:${spec.code === 'pictures' ? 40 : 32}px;display:flex;align-items:center">${spec.code === 'pictures' ? sym(c, 40) : spec.code === 'symbols' ? shapeSvg(codeOf.get(c).shape, 30) : `<span style="font:700 17px/1 'Baloo 2',cursive;color:${T.teal}">${codeOf.get(c).num}</span>`}</div>` +
          (blank ? `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(c)}"` : ''} style="width:30px;height:30px"></span>` : `<span style="font:700 20px/1 'Nunito',sans-serif;color:${T.ink}">${esc(c)}</span>`) + '</div>';
      };
      const key = `<div data-lcs-cg-keybox style="display:flex;flex-wrap:wrap;justify-content:center;gap:5px;padding:10px;border-radius:14px;background:${T.cream}">${keyCells.map(keyCell).join('')}</div>`;
      const solvedHtml = solved ? `<div data-lcs-cg-solved style="display:flex;gap:4px;justify-content:center;padding:8px 14px;border:2.5px dashed ${T.teal};border-radius:12px">${[...solved].map((c) => `<div style="display:flex;flex-direction:column;align-items:center;gap:4px">${shapeSvg(codeOf.get(c).shape, 34)}<span style="font:700 22px/1 'Nunito',sans-serif;color:${T.ink}">${esc(c)}</span></div>`).join('')}</div>` : '';
      return {
        bodyHtml: `<div data-ws-content data-lcs-cryptogram${slot.attr(ctx, 'message', 0)} style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:14px;min-height:0">${key}${solvedHtml}<div data-lcs-cg-message style="display:flex;flex-direction:column;gap:18px">${msgHtml}</div></div>`,
        meta: { message: msg, given: [...givenSet], ...(solved ? { solved } : {}) },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const cells = [...document.querySelectorAll('[data-lcs-cg-cell]')];
        if (!cells.length && !document.querySelector('[data-lcs-cg-own]')) fails.push('no code cells');
        const root = document.querySelector('[data-ws-content]').getBoundingClientRect();
        document.querySelectorAll('[data-lcs-cg-keybox], [data-lcs-cg-message], [data-lcs-cg-solved], [data-lcs-cg-own]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1 || r.left < root.left - 1) fails.push('a block leaves the page'); });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        return fails;
      });
    },
  };

  /** the open page: the alphabet with empty code boxes, lines for a message and its code */
  function buildOwn(d, L) {
    const alpha = COLLATION[L].alphabet.map((c) => c.toLocaleUpperCase(L));
    const key = `<div data-lcs-cg-own style="display:grid;grid-template-columns:repeat(${alpha.length > 26 ? 10 : 9},1fr);gap:6px;padding:12px;border-radius:14px;background:${T.cream}">` +
      alpha.map((c) => `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><span style="font:700 22px/1 'Nunito',sans-serif;color:${T.ink}">${esc(c)}</span><span style="width:44px;height:40px;box-sizing:border-box;border:2px solid ${T.grid};border-radius:8px;background:#FFFFFF"></span></div>`).join('') + '</div>';
    const line = `<span style="display:block;border-bottom:2.5px solid ${T.ink};height:${d.lineH || 44}px"></span>`;
    const lines = Array.from({ length: d.lines }, () => line).join('');
    return {
      bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:16px;min-height:0">${key}` +
        `<div style="display:flex;flex-direction:column;gap:6px"><span style="font:700 20px/1 'Baloo 2',cursive;color:${T.teal}">${esc(spec.labels[L][0])}</span>${lines}</div>` +
        `<div style="display:flex;flex-direction:column;gap:6px"><span style="font:700 20px/1 'Baloo 2',cursive;color:${T.teal}">${esc(spec.labels[L][1])}</span>${lines}</div></div>`,
      meta: { lines: d.lines },
    };
  }
}

module.exports = { makeCryptogram, lettersOf, alphabetFor, SHAPES };
