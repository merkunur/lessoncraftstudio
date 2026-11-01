/**
 * logic-picture-more.js — the two Logic & Math Puzzles templates that keep what two old apps did (OLD-APPS.md;
 * ENGINES §22 "keep"; 2026-11-01):
 *
 *   secret   G1-474 Secret Word Addition (the old `code-addition` app's word-reveal mode): a legend gives each picture its
 *            number; each numbered row adds pictures; the sum's letter (from the code) goes in the box with the row's
 *            number; the boxes spell a word — a thing from the page's theme, in the page's language. The code lists the
 *            word's letters by number with a few decoy letters, so a letter is found only by doing the sum.
 *            L1 three pictures 1-5, two addends (to 10), a 3-4 letter word · L2 four pictures 1-9, two addends (to 18),
 *            4-5 letters · L3 four pictures, three addends (to 20), 5-6 letters.
 *   rebuild  G1-475 Solve and Rebuild the Picture (the old `math-puzzle` app, NEW-TEMPLATES T5): a grid of sums, every
 *            answer different; the picture pieces below carry the answers; each piece is glued on the sum with its
 *            number and the picture appears. L1 3 × 3 addition to 10 · L2 3 × 3 addition and subtraction to 20 ·
 *            L3 4 × 4 addition and subtraction to 20.
 *
 * ONE right answer: every sum has one value, the code gives each number one letter, the pieces' numbers are all
 * different. Marks: answer boxes (sums, letters) → key text + type screen; a piece is a palette bin (data-lcs-bin), a
 * sum cell a drop (data-lcs-drop + data-lcs-answer = the piece) → place screen; the key draws the rebuilt picture
 * (data-lcs-key-sample). The puzzle rides on the page (data-lcs-puzzle) so verify() re-checks it.
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { labelSafeNouns, fileUri, labelsForKey } = require('../../image-cache/resolve.js');
const { artExtentSync } = require('../../image-cache/silhouette.js');
const { GRAPH_THEMES, distinctPick } = require('../../lib/picture-distinct.js');
const slot = require('../../lib/slot.js');
const { esc } = require('../../primitives/_svg.js');

const GROUND = '#E3F1EE';
const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', CREAM = '#FBF3E4', WHITE = '#FFFFFF';
const NUM = (s, size, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;line-height:1;color:${color}">${s}</span>`;
const stamp = (o) => ` data-lcs-puzzle="${esc(JSON.stringify(o))}"`;
const loc2 = (locale) => String(locale || 'en').slice(0, 2);

/** the page words that are not the instruction (native-checked ×11): the code's heading and the word line */
const WORDS = {
  en: { code: 'Code', word: 'Secret word' }, de: { code: 'Code', word: 'Geheimwort' }, fr: { code: 'Code', word: 'Mot secret' },
  es: { code: 'Clave', word: 'Palabra secreta' }, pt: { code: 'Código', word: 'Palavra secreta' }, it: { code: 'Codice', word: 'Parola segreta' },
  nl: { code: 'Code', word: 'Geheim woord' }, sv: { code: 'Kod', word: 'Hemligt ord' }, da: { code: 'Kode', word: 'Hemmeligt ord' },
  no: { code: 'Kode', word: 'Hemmelig ord' }, fi: { code: 'Koodi', word: 'Salainen sana' },
};
/** each locale's alphabet: a secret word uses only these letters, a decoy is drawn from the first 26 */
const EXTRA = { de: 'ÄÖÜ', fr: 'ÀÂÇÉÈÊËÎÏÔÛÙŸ', es: 'ÁÉÍÓÚÑÜ', pt: 'ÁÂÃÀÇÉÊÍÓÔÕÚ', it: 'ÀÈÉÌÒÙ', nl: '', sv: 'ÅÄÖ', da: 'ÆØÅ', no: 'ÆØÅ', fi: 'ÅÄÖ', en: '' };
const BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
/** a decoy may also be a letter only this alphabet has (else Ä / Ø / Ñ in the code would always be a word letter) */
const DECOY_EXTRA = { de: 'ÄÖÜ', es: 'Ñ', sv: 'ÅÄÖ', da: 'ÆØÅ', no: 'ÆØÅ', fi: 'ÅÄÖ' };

const SECRET = {
  1: { pics: 3, maxVal: 5, addends: 2, maxSum: 10, word: [3, 4], decoys: 2 },
  2: { pics: 4, maxVal: 9, addends: 2, maxSum: 18, word: [4, 5], decoys: 3 },
  3: { pics: 4, maxVal: 6, addends: 3, maxSum: 20, word: [5, 6], decoys: 3 },
};
const REBUILD = {
  1: { n: 3, ops: ['+'], max: 10, cell: 112 },
  2: { n: 3, ops: ['+', '-'], max: 20, cell: 112 },
  3: { n: 4, ops: ['+', '-'], max: 20, cell: 92 },
};

/** the theme's pictures a child tells apart */
function pickPictures(theme, n, rng, ctx) {
  const pool = labelSafeNouns(theme);
  if (pool.length < n) throw new Error('logic-picture-more: theme ' + theme + ' has ' + pool.length + ' pictures, needs ' + n);
  let picked = rng.sample(pool, n);
  if (GRAPH_THEMES.includes(theme)) picked = distinctPick(theme, picked, pool, rng);
  return slot.pictures(ctx, picked, pool, theme);
}

/** the secret words a page may use: the theme's things, singular, in the page's language, its letters only */
function wordPool(theme, L, len) {
  const ok = new RegExp('^[' + BASE + EXTRA[L] + ']+$');
  const seen = new Set();
  const out = [];
  for (const n of labelSafeNouns(theme)) {
    const s = (labelsForKey(n.vocabKey, L) || [])[0];
    if (!s) continue;
    const w = String(s).toLocaleUpperCase(L);
    if (w.length !== String(s).length || !ok.test(w) || w.length < len[0] || w.length > len[1] || seen.has(w)) continue;   // ß → SS, spaces, hyphens: not a code word
    seen.add(w);
    out.push({ word: w, noun: n.noun });
  }
  return out;
}

// ---------------------------------------------------------------- secret word
/** each distinct letter its own sum; a letter used k times a sum with ≥ k ways to make it (null: the word does not fit) */
function assignSums(word, sums, bySum, rng) {
  const reps = {};
  for (const ch of word) reps[ch] = (reps[ch] || 0) + 1;
  const letterSum = {};
  const free = rng.shuffle(sums.slice());
  for (const ch of Object.keys(reps).sort((a, b) => reps[b] - reps[a])) {
    const i = free.findIndex((s) => bySum.get(s).length >= reps[ch]);
    if (i < 0) return null;
    letterSum[ch] = free.splice(i, 1)[0];
  }
  return { reps, letterSum };
}

function secretPage({ d, theme, L, rng, ctx }) {
  const pics = pickPictures(theme, d.pics, rng, ctx);
  // a thing of the page's theme; a theme with no word of the level's length in this language (dinosaur names, music)
  // takes an animal's name — the word is the reward, not the theme, and a theme the maker offers works in every language
  let pool = wordPool(theme, L, d.word);
  if (!pool.length) pool = wordPool('animals', L, d.word);
  if (!pool.length) throw new Error(`G1-474: no ${d.word[0]}-${d.word[1]} letter word for ${theme} (${L}) — REFUSED`);
  const poolWords = pool.map((p) => p.word);
  // the teacher's word (tap-to-edit) or the theme's words in a fresh order; new picture values until a word fits — a
  // copy is never refused because one draw of values could not spell it
  const asked = ctx && ctx.overrides && ctx.overrides.word && ctx.overrides.word[0];
  // (after the theme's own words, an animal's name: one draw of values may spell none of a short theme list)
  const backup = theme === 'animals' ? [] : wordPool('animals', L, d.word).map((p) => p.word).filter((w) => !poolWords.includes(w));
  const candidates = asked && poolWords.includes(asked) ? [asked] : rng.shuffle(poolWords.slice()).concat(rng.shuffle(backup));
  let found = null;
  for (let attempt = 0; attempt < 40 && !found; attempt++) {
    const vals = rng.sample(Array.from({ length: d.maxVal }, (_, i) => i + 1), d.pics);
    const combos = [];
    const rec = (start, acc) => {
      if (acc.length === d.addends) { const s = acc.reduce((a, i) => a + vals[i], 0); if (s <= d.maxSum) combos.push({ terms: acc.slice(), sum: s }); return; }
      for (let i = start; i < d.pics; i++) { acc.push(i); rec(i, acc); acc.pop(); }
    };
    rec(0, []);
    const bySum = new Map();
    for (const c of combos) (bySum.get(c.sum) || bySum.set(c.sum, []).get(c.sum)).push(c);
    const sums = [...bySum.keys()].sort((a, b) => a - b);
    for (const w of candidates) {
      // the code is listed by number: if the word's letters (in the order they first appear) had rising or falling sums,
      // the code would spell the word left to right (or right to left) — redrawn (native + pedagogy review 2026-11-01)
      for (let tries = 0; tries < 6; tries++) {
        const fit = assignSums(w, sums, bySum, rng);
        if (!fit) break;
        const order = [...new Set(w)].map((ch) => fit.letterSum[ch]);
        const up = order.every((v, i) => !i || v > order[i - 1]), down = order.every((v, i) => !i || v < order[i - 1]);
        if (order.length > 1 && (up || down)) continue;
        found = { vals, bySum, word: w, ...fit }; break;
      }
      if (found) break;
    }
  }
  if (!found) throw new Error(`G1-474: no word of ${theme} (${L}) fits the sums — REFUSED`);
  const word = slot.words(ctx, [found.word], poolWords, 'word')[0];
  const { vals, bySum, reps, letterSum } = found;
  // the rows, in the word's order, each a different set of pictures
  const usedWay = {};
  const rows = [...word].map((ch) => {
    const s = letterSum[ch];
    usedWay[s] = usedWay[s] || [];
    const left = bySum.get(s).filter((w) => !usedWay[s].includes(w));
    const w = rng.pick(left);
    usedWay[s].push(w);
    return { terms: rng.shuffle(w.terms.slice()), sum: s, letter: ch };
  });
  // the code: the word's letters + decoys (other letters on numbers no row makes), listed by number
  const decoyLetters = rng.shuffle([...(BASE + (DECOY_EXTRA[L] || ''))].filter((ch) => !(ch in reps))).slice(0, d.decoys);
  const freeNums = rng.shuffle(Array.from({ length: d.maxSum - 1 }, (_, i) => i + 2).filter((n) => !Object.values(letterSum).includes(n))).slice(0, d.decoys);
  const code = Object.entries(letterSum).map(([ch, n]) => ({ n, ch })).concat(decoyLetters.map((ch, i) => ({ n: freeNums[i], ch }))).sort((a, b) => a.n - b.n);
  return { pics, vals, rows, word, code, noun: (pool.find((p) => p.word === word) || {}).noun };
}

function secretHtml({ page, theme, L, ctx }) {
  const W = WORDS[L] || WORDS.en;
  const k = page.rows.length;
  const three = page.rows[0].terms.length > 2;
  const tile = three ? 52 : k > 5 ? 54 : 62;
  const tileOf = (i, px, extra = '') => `<span class="ws-pattern-slot" style="width:${px}px;height:${px}px"${extra}><img class="ws-icon" src="${fileUri(theme, page.pics[i].noun)}" alt="" style="width:${px - 12}px;height:${px - 12}px"></span>`;
  const op = (ch, px) => NUM(ch, px, TEAL);
  const badge = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${TEAL};color:${WHITE};font-family:'Baloo 2';font-weight:700;font-size:17px;flex:0 0 auto">${n}</span>`;
  const legend = page.pics.map((p, i) => `<span style="display:inline-flex;align-items:center;gap:8px">${tileOf(i, 64, slot.attr(ctx, 'pic', i))}${op('=', 26)}${NUM(page.vals[i], 34)}</span>`).join('');
  const rows = page.rows.map((r, ri) => {
    const parts = [badge(ri + 1)];
    r.terms.forEach((t, i) => { if (i) parts.push(op('+', 26)); parts.push(tileOf(t, tile)); });
    parts.push(op('=', 26), answerBox({ w: 66, h: 50, answer: r.sum }));
    return `<div style="display:flex;align-items:center;gap:10px" data-lcs-secret-row="${ri}">${parts.join('')}</div>`;
  });
  // two columns of rows when there are more than four
  const half = Math.ceil(k / 2);
  const rowsHtml = k > 4 && !three
    ? `<div style="display:flex;gap:34px;justify-content:center"><div style="display:flex;flex-direction:column;gap:14px">${rows.slice(0, half).join('')}</div><div style="display:flex;flex-direction:column;gap:14px">${rows.slice(half).join('')}</div></div>`
    : `<div style="display:flex;flex-direction:column;gap:${three ? 10 : 14}px;align-items:flex-start">${rows.join('')}</div>`;
  const codeHtml = `<div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 12px;max-width:640px;padding:10px 14px;border:2px solid ${GRID};border-radius:14px;background:${CREAM}" data-lcs-code="1">` +
    `<span style="font-family:'Baloo 2';font-weight:700;font-size:20px;color:${TEAL};margin-right:4px">${esc(W.code)}</span>` +
    page.code.map((c) => `<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:9px;background:${WHITE};border:1.5px solid ${GRID}" data-lcs-code-entry="${c.n}">${NUM(c.n, 22)}${NUM('=', 18, TEAL)}${NUM(esc(c.ch), 22, CORAL)}</span>`).join('') + `</div>`;
  const wordHtml = `<div style="display:flex;flex-direction:column;align-items:center;gap:6px"${slot.attr(ctx, 'word', 0)}>` +
    `<span style="font-family:'Baloo 2';font-weight:700;font-size:20px;color:${TEAL}">${esc(W.word)}</span>` +
    `<div style="display:flex;gap:8px">${[...page.word].map((ch, i) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:3px">${answerBox({ w: 50, h: 54, answer: ch })}${NUM(i + 1, 15, INK)}</span>`).join('')}</div></div>`;
  const legendHtml = `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px 30px">${legend}</div>`;
  return `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;min-height:0"` +
    stamp({ kind: 'secret', vals: page.vals, rows: page.rows.map((r) => ({ terms: r.terms, sum: r.sum })), code: page.code, word: page.word }) + `>` +
    legendHtml + rowsHtml + codeHtml + wordHtml + `</div>`;
}

// ---------------------------------------------------------------- rebuild the picture
/** the picture square of a drawing: its ink box, made square around its middle, kept inside the picture (fractions) */
function cropSquare(theme, noun) {
  const e = artExtentSync(theme, noun);
  const side = Math.min(1, Math.max(e.widthFrac, e.heightFrac) * 1.04);
  const cx = e.leftFrac + e.widthFrac / 2, cy = e.topFrac + e.heightFrac / 2;
  const clamp = (c) => Math.min(1 - side, Math.max(0, c - side / 2));
  return { x: clamp(cx), y: clamp(cy), side, fill: (e.widthFrac * e.heightFrac) / (side * side) };
}
/** one piece: the drawing seen through a viewBox (an inline SVG crops exactly and prints with no background setting) */
function pieceSvg(href, crop, n, r, c, px) {
  const unit = crop.side / n;
  const vb = [(crop.x + c * unit) * 1000, (crop.y + r * unit) * 1000, unit * 1000, unit * 1000].map((v) => v.toFixed(2)).join(' ');
  // a soft ground behind the drawing: a piece of plain background reads as part of the picture, never as a blank card
  return `<svg width="${px}" height="${px}" viewBox="${vb}" preserveAspectRatio="none" style="display:block" data-lcs-prim="lp-piece"><rect x="0" y="0" width="1000" height="1000" fill="${GROUND}"/><image href="${href}" x="0" y="0" width="1000" height="1000"/></svg>`;
}
function rebuildPage({ d, theme, rng, ctx }) {
  const cells = d.n * d.n;
  // the answers: all different, 2 … max
  const answers = rng.sample(Array.from({ length: d.max - 1 }, (_, i) => i + 2), cells);
  // both operations on a mixed level, half and half (never left to chance: one page drew nine subtractions); a page's
  // largest answer can only be a sum (a − b with b ≥ 1 stays under max)
  const minus = new Set();
  if (d.ops.length > 1) for (const i of rng.shuffle(answers.map((a, i) => i).filter((i) => answers[i] <= d.max - 1)).slice(0, Math.floor(cells / 2))) minus.add(i);
  const eqs = answers.map((a, i) => {
    const op = minus.has(i) ? '-' : '+';
    if (op === '+') { const x = rng.int(1, a - 1); return { a: x, b: a - x, op, ans: a }; }
    const y = rng.int(1, d.max - a); return { a: a + y, b: y, op, ans: a };
  });
  // the picture: a drawing of the theme that fills its square (pieces that are mostly blank teach nothing)
  // (a teacher may choose it: tap-to-edit over the same pool, lib/slot.js)
  const fills = labelSafeNouns(theme).filter((p) => { try { return cropSquare(theme, p.noun).fill >= 0.45; } catch (e) { return false; } });
  if (!fills.length) throw new Error('G1-475: no picture of ' + theme + ' fills its square — REFUSED');
  const pic = slot.pictures(ctx, [rng.pick(fills)], fills, theme)[0];
  const crop = cropSquare(theme, pic.noun);
  const order = rng.shuffle(Array.from({ length: cells }, (_, i) => i));   // the pieces' order under the grid
  return { eqs, pic, crop, order };
}
function rebuildHtml({ page, d, theme, locale, ctx }) {
  const key = !!(ctx && ctx.answerKey), screen = !!(ctx && ctx.screen);
  const n = d.n, S = d.cell, href = fileUri(theme, page.pic.noun);
  const minus = '−';
  const tag = (num, px) => `<span style="position:absolute;top:3px;left:3px;display:inline-flex;align-items:center;justify-content:center;min-width:${px}px;height:${px}px;padding:0 3px;box-sizing:border-box;border-radius:${px}px;background:${WHITE};border:2px solid ${INK};font-family:'Baloo 2';font-weight:700;font-size:${Math.round(px * 0.62)}px;line-height:1;color:${INK}">${num}</span>`;
  const grid = page.eqs.map((e, i) => {
    const r = Math.floor(i / n), c = i % n;
    const box = `position:relative;width:${S}px;height:${S}px;box-sizing:border-box;border:2px dashed ${GRID};display:flex;align-items:center;justify-content:center;background:${WHITE}`;
    const sum = NUM(`${e.a} ${e.op === '-' ? minus : '+'} ${e.b}`, n === 3 ? 26 : 22, INK);
    if (key) return `<span style="${box};border-style:solid;border-color:${CREAM}"><span data-lcs-key-sample="1" style="position:absolute;inset:0">${pieceSvg(href, page.crop, n, r, c, S - 4)}</span>${tag(e.ans, n === 3 ? 26 : 22)}</span>`;
    return `<span style="${box}"${screen ? ` data-lcs-drop="1" data-lcs-answer="${i}"` : ''}>${sum}</span>`;
  }).join('');
  const gridHtml = `<span data-lcs-table="1" style="display:grid;grid-template-columns:repeat(${n},${S}px);gap:0"${slot.attr(ctx, 'pic', 0)}${stamp({ kind: 'rebuild', n, eqs: page.eqs, order: page.order })}>${grid}</span>`;
  const T = S;   // a piece is glued on a sum: the same size
  const pieces = page.order.map((i) => {
    const r = Math.floor(i / n), c = i % n;
    return `<span style="position:relative;width:${T}px;height:${T}px;box-sizing:border-box;border:2px dashed ${INK};background:${WHITE}" data-lcs-piece="${page.eqs[i].ans}"${screen ? ` data-lcs-bin="${i}"` : ''}>${pieceSvg(href, page.crop, n, r, c, T - 4)}${tag(page.eqs[i].ans, n === 3 ? 26 : 22)}</span>`;
  }).join('');
  return `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;min-height:0">` +
    gridHtml + (key ? '' : `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;max-width:${n === 3 ? 600 : 620}px">${pieces}</div>`) + `</div>`;
}

// ---------------------------------------------------------------- the type factory
function makePicturePuzzleType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'visual-logic',
    exerciseType: 'visual-logic',
    themeAxis: { applicable: true, minNouns: mode === 'secret' ? 6 : 4 },
    puzzle: true,
    difficulty: mode === 'secret' ? SECRET : REBUILD,
    i18n,
    build({ theme, difficulty, locale }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng, L = loc2(locale);
      if (mode === 'secret') {
        const page = secretPage({ d, theme, L, rng, ctx });
        return { bodyHtml: secretHtml({ page, theme, L, ctx }), meta: { items: page.rows.map((r) => r.terms.join('+') + '=' + r.sum), word: page.word } };
      }
      const page = rebuildPage({ d, theme, rng, ctx });
      return { bodyHtml: rebuildHtml({ page, d, theme, locale, ctx }), meta: { items: page.eqs.map((e) => e.a + e.op + e.b), picture: page.pic.noun } };
    },

    /** inside the page: every sum, every letter and every piece is the one answer the stamp allows */
    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-puzzle]');
        if (!root) return ['no puzzle stamped on the page'];
        const p = JSON.parse(root.getAttribute('data-lcs-puzzle'));
        if (p.kind === 'secret') {
          const sums = [...root.querySelectorAll('[data-lcs-secret-row] .ws-answerbox')].map((b) => Number(b.getAttribute('data-lcs-answer')));
          if (sums.length !== p.rows.length) fails.push(sums.length + ' sum boxes for ' + p.rows.length + ' rows');
          p.rows.forEach((r, i) => { const s = r.terms.reduce((a, t) => a + p.vals[t], 0); if (s !== r.sum || sums[i] !== s) fails.push('row ' + (i + 1) + ': the sum is not ' + s); });
          // the code: one letter per number, the word's letters found by their rows' sums
          const byNum = {};
          for (const c of p.code) { if (byNum[c.n] != null) fails.push('the code gives ' + c.n + ' twice'); byNum[c.n] = c.ch; }
          const decoded = p.rows.map((r) => byNum[r.sum]).join('');
          if (decoded !== p.word) fails.push('the sums spell ' + decoded + ', not ' + p.word);
          // the code (listed by number) never spells the word left to right or right to left
          const firstSums = [...new Set(p.word)].map((ch) => p.code.find((c) => c.ch === ch).n);
          if (firstSums.length > 1 && (firstSums.every((v, i) => !i || v > firstSums[i - 1]) || firstSums.every((v, i) => !i || v < firstSums[i - 1]))) fails.push('the code lists the word in order');
          const letters = [...root.querySelectorAll('[data-lcs-slot^="word"] .ws-answerbox, div > div > span > .ws-answerbox')].map((b) => b.getAttribute('data-lcs-answer')).filter((a) => a && !/^\d+$/.test(a));
          if (letters.join('') !== p.word) fails.push('the word boxes hold ' + letters.join('') + ', not ' + p.word);
          if (root.querySelectorAll('[data-lcs-code-entry]').length !== p.code.length) fails.push('the printed code and the stamp differ');
          // two rows never show the same pictures
          const sig = p.rows.map((r) => r.terms.slice().sort().join(','));
          if (new Set(sig).size !== sig.length) fails.push('two rows show the same pictures');
        } else if (p.kind === 'rebuild') {
          const ans = p.eqs.map((e) => (e.op === '-' ? e.a - e.b : e.a + e.b));
          p.eqs.forEach((e, i) => { if (ans[i] !== e.ans) fails.push('sum ' + (i + 1) + ' is not ' + e.ans); if (ans[i] < 1 || e.a < 1 || e.b < 1) fails.push('sum ' + (i + 1) + ' uses zero or less'); });
          if (new Set(ans).size !== ans.length) fails.push('two sums have the same answer');
          const pieces = [...root.parentElement.querySelectorAll('[data-lcs-piece]')].map((x) => Number(x.getAttribute('data-lcs-piece')));
          if (pieces.length && pieces.slice().sort((a, b) => a - b).join() !== ans.slice().sort((a, b) => a - b).join()) fails.push('the pieces and the answers differ');
          if (pieces.length && pieces.every((v, i) => v === ans[i])) fails.push('the pieces lie in the grid order');
        } else fails.push('unknown puzzle ' + p.kind);
        return fails;
      });
    },
  };
}

module.exports = { makePicturePuzzleType, SECRET, REBUILD, WORDS, wordPool, cropSquare };
