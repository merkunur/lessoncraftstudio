/**
 * G2-482 — Print and Cursive Match (Cursive Handwriting maker 2026-11-02, NEW-TEMPLATES §35 T3): the transcoding step —
 * each word printed on the left, the same words in the locale's school script on the right in another order; the child
 * reads the joined hand and draws a line to its printed form (G2-387 matches cursive to PICTURES; this one to print).
 * Words: the locale's reviewed cursive words (bank words, join words, level-set join words), letters only; no two on a
 * page within one letter of each other (two cursive forms a child cannot tell apart at a glance — bat / hat), and at the
 * harder level ≥ 2 pairs share their first letter (one within a letter of length) so the first letter alone cannot solve
 * it (G2-377 readClash). The right column is a derangement that is not a shift and puts at most one partner one row
 * away (G2-377 derangeOrder: no position tell). Built on G2-377's face machinery (one unit, ONE text node per word).
 * Levels: 1 four short words (≤ 5 letters) · 2 six words (≤ 7) · 3 six words (≤ 9), first letters shared.
 * Key: each printed word numbered, each cursive word carries its partner's number; screen: tap a word, tap its partner.
 */
'use strict';
const G = require('./G2-377-cursive-writing.js');
const C6 = require('../../templates/components-b6.js');
const SR = require('../../primitives/school-ruling.js');
const { color } = require('../../primitives/_tokens.js');
const { keyNumber } = require('../_shared/key-number.js');
const CW = G._cw;
const ID = 'G2-482';

const D = {
  1: { n: 4, max: 5, clash: false },
  2: { n: 6, max: 7, clash: false },
  3: { n: 6, max: 9, clash: true },
};
const GAP = 12, CARD_W = 270, MIN_H = 76;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/** the edit distance of two words (lower case) */
function editDistance(a, b) {
  a = [...a.toLocaleLowerCase()]; b = [...b.toLocaleLowerCase()];
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i].concat(Array(b.length).fill(0)));
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

module.exports = {
  id: ID,
  slug: 'print-and-cursive-match',
  gradeBand: 'G2',
  assetClass: 'geometry',
  exerciseType: 'cursive-writing',
  themeAxis: { applicable: false },
  // the reading face's script (de: LA)
  unitAxis: { ...G.unitAxis, exemplar: (loc) => { const b = CW.loadBank(CW.KEY, String(loc).slice(0, 2)); return (b.exemplarByMode && b.exemplarByMode.read) || b.exemplar; } },
  difficulty: D,
  i18n: { en: { title: 'Match Print and Cursive', instruction: 'Read each word in cursive. Draw a line to the same word in print.' } },

  build({ difficulty, locale, unit }, ctx0) {
    const ctx = ctx0 || {}, rng = ctx.rng;
    const d = D[difficulty] || D[2], loc = String(locale || 'en').slice(0, 2);
    if (CW.NEUTRAL.refusedLocales[loc]) throw new Error(`${ID}: refused in ${loc}: no national joined school script (${CW.NEUTRAL.refusedLocales[loc]})`);
    const key = !!ctx.answerKey, scr = !key && !!ctx.screen;
    const bankLoc = CW.loadBank(CW.KEY, loc), ls = CW.levelSetData(loc);
    const u0 = unit || (bankLoc.exemplarByMode && bankLoc.exemplarByMode.read) || bankLoc.exemplar;
    const c = { ...CW.faceContext(bankLoc, { mode: 'read' }, loc, u0), typeId: ID };
    // the locale's pictured cursive nouns in their citation form (the join words carry inflected forms — da "æblet" —,
    // adverbs — no "ute" — and loanwords — "quiz": native review 2026-11-02)
    const pool = [...new Set(Object.values(bankLoc.words || {}).map(CW.wordText))]
      .filter((w) => w && /^\p{L}+$/u.test(w) && [...w].length >= 3 && [...w].length <= d.max).sort();
    const initial = (w) => [...w.toLocaleLowerCase(loc)][0];
    const grams = (w) => { const a = [...w.toLocaleLowerCase(loc)]; return new Set(a.slice(0, -2).map((_, k) => a.slice(k, k + 3).join(''))); };
    const shareGram = (a, b) => { const g = grams(b); return [...grams(a)].some((x) => g.has(x)); };
    // a page's set: no two words within one letter of each other; levels 1-2 one word per first letter (shared first letters
    // are level 3's difficulty) and level 1 no two words sharing a three-letter run (taart / paard); level 3 first letters
    // shared on purpose (G2-377 readClash: the first letter alone cannot solve it)
    const okSet = (set) => {
      for (let a = 0; a < set.length; a++) for (let b = a + 1; b < set.length; b++) {
        if (editDistance(set[a], set[b]) < 2) return false;
        if (!d.clash && initial(set[a]) === initial(set[b])) return false;
        if (difficulty === 1 && shareGram(set[a], set[b])) return false;
      }
      return !d.clash || CW.readClash(set).ok;
    };
    const { makeRng } = require('../../lib/rng.js');
    const draw = (seed, avoid) => {
      const r = makeRng(seed), from = pool.filter((w) => !avoid.has(w));
      for (let t = 0; t < 4000; t++) { const set = r.sample(from, d.n); if (set.length < d.n) return null; if (okSet(set)) return set; }
      return null;
    };
    // copy k never repeats copy k-1's words (each copy drawn from its own seed, the previous copy's words set aside)
    const copyNo = Math.max(1, parseInt(String(ctx.variant || 1), 10) || 1);
    const setOf = (k, sv) => {
      const prev = k > 1 ? setOf(k - 1, null) : null;
      const seed = `${ID}|${loc}|${difficulty}|${k}${sv ? '|' + sv : ''}`;
      return (prev && draw(seed, new Set(prev))) || draw(seed, new Set());
    };
    const items = setOf(copyNo, ctx.seedVariant || null);
    if (!items) throw new Error(`${ID}: ${loc}: no ${d.n} words of ≤ ${d.max} letters, each ≥ 2 letters apart${d.clash ? ', first letters shared' : ', first letters distinct'} (refuse)`);
    const order = CW.derangeOrder(d.n, rng);   // cursive row k shows the word order[k]
    const m = SR.metricsFor(c.unit), fs = c.X / m.xHeight;
    const lb = C6.cwLineBox(c.unit, fs);
    const inkH = (m.ascender + m.descender) * fs;
    const maxH = Math.floor((814 - CW.TAG_H - (d.n - 1) * GAP) / d.n);
    const minH = Math.max(MIN_H, Math.ceil(inkH) + 14);
    const stack = CW.TAG_H + d.n * minH + (d.n - 1) * GAP;
    if (stack > CW.STACK_MAX) throw new Error(`${ID}: ${loc} ${c.unit}: ${d.n} rows at ${minH} px = ${stack} > ${CW.STACK_MAX} (refuse)`);
    const itemStyle = `width:${CARD_W}px;flex:1 1 ${minH}px;min-height:${minH}px;max-height:${maxH}px;box-sizing:border-box`;
    // print: the left column, numbered on the key; the screen's items
    const left = items.map((w, i) => `<div class="ws-match-item ws-match-item--plain" data-lcs-print-word="${esc(w)}" data-lcs-row-index="${i}"` +
      (key ? ` data-lcs-pair="${i + 1}"` : scr ? ` data-lcs-key-badge="p${i + 1}"` : '') + ` style="${itemStyle};position:relative">` + (key ? keyNumber(i + 1) : '') +
      `<span style="font-family:'Nunito';font-weight:800;font-size:26px;color:${color.ink};white-space:nowrap">${esc(w)}</span><span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
    // cursive: the right column in the derangement's order — the word's ink centred in its card (as G2-377's reading face)
    const right = order.map((wi, k) => {
      const w = items[wi];
      const node = `<span data-lcs-cursive="${esc(c.unit)}" data-lcs-role="model" data-lcs-fs="${Math.round(fs * 100) / 100}" data-lcs-word-node="${esc(w)}" style="position:absolute;left:50%;top:calc(50% - ${Math.round((inkH / 2 + (lb.asc - m.ascender * fs)) * 100) / 100}px);transform:translateX(-50%);font-family:'LCS Cursive ${c.unit}';font-size:${Math.round(fs * 100) / 100}px;line-height:${lb.lh}px;font-weight:400;font-style:normal;color:${color.ink};white-space:nowrap;letter-spacing:0;word-spacing:0;text-transform:none">${esc(w)}</span>`;
      return `<div class="ws-match-item ws-match-item--plain cw-row cw-card" data-lcs-cursive-word="${esc(w)}" data-lcs-row-index="${k}" data-lcs-card-yb="${Math.round((m.ascender * fs - inkH / 2) * 100) / 100}"` +
        (key ? ` data-lcs-key-badge="${wi + 1}"` : scr ? ` data-lcs-pair="p${wi + 1}"` : '') + ` style="${itemStyle};position:relative">${node}<span class="ws-match-dot ws-match-dot--left"></span></div>`;
    }).join('');
    const col = (html) => `<div class="ws-match-col" style="justify-content:flex-start;gap:${GAP}px">${html}</div>`;
    const html = C6.cwFontFace(c.unit) +
      `<div class="cw-page" data-ws-content="" data-lcs-cw="" data-lcs-type="${ID}" data-lcs-face="match" data-lcs-mode="match" data-lcs-locale="${loc}"` +
      ` data-lcs-unit="${c.unit}" data-lcs-x="${c.X}" data-lcs-floor="${c.floor}" data-lcs-ruling="none" data-lcs-stack="${stack}" data-lcs-practice="0" data-lcs-count="${d.n}" data-lcs-lift="${c.lift}"` +
      ` data-lcs-order="${order.join(',')}" style="display:flex;flex-direction:column;justify-content:flex-start;height:100%;width:${CW.BODY_W}px;margin:0 auto">` +
      C6.cwScriptTag({ scriptName: c.scriptName, w: CW.BODY_W }) +
      `<div class="ws-match cw-read" data-lcs-flow="" style="flex:1 1 auto;padding:0 30px;justify-content:space-between;align-items:stretch">${col(left)}${col(right)}</div></div>`;
    return { bodyHtml: html, meta: { words: items, order, unit: c.unit } };
  },

  async verify(page) {
    const fails = await page.evaluate(CW.browserVerify, { ID, STACK_MAX: CW.STACK_MAX, ink: CW.hexToRgb(color.ink), grid: CW.hexToRgb(color.grid), face: { mode: 'match', cards: true, freeLines: null } });
    const own = await page.evaluate(() => {
      const out = [];
      const L = [...document.querySelectorAll('[data-lcs-print-word]')], R = [...document.querySelectorAll('[data-lcs-cursive-word]')];
      if (L.length < 4 || L.length !== R.length) out.push(`${L.length} printed, ${R.length} cursive words`);
      const lw = L.map((x) => x.dataset.lcsPrintWord), rw = R.map((x) => x.dataset.lcsCursiveWord);
      if (lw.slice().sort().join('|') !== rw.slice().sort().join('|')) out.push('the two columns are not one set of words');
      L.forEach((x, i) => { if (x.textContent.trim() !== lw[i]) out.push(`row ${i + 1}: printed "${x.textContent.trim()}"`); });
      R.forEach((x, i) => { const nd = x.querySelector('[data-lcs-cursive]'); if (!nd || nd.textContent !== rw[i]) out.push(`row ${i + 1}: cursive "${nd && nd.textContent}"`); });
      const off = lw.map((w, i) => rw.indexOf(w) - i), n = lw.length;
      if (off.some((o) => o === 0)) out.push(`a word faces itself (offsets ${off.join(',')})`);
      if (n > 1 && off.map((o) => (o + n) % n).every((o, _, a) => o === a[0])) out.push('the partner is a constant shift');
      if (off.filter((o) => Math.abs(o) === 1).length > 1) out.push('position tell: two partners one row away');
      const ed = (a, b) => { a = [...a.toLowerCase()]; b = [...b.toLowerCase()]; const dp = Array.from({ length: a.length + 1 }, (_, i) => [i].concat(Array(b.length).fill(0))); for (let j = 1; j <= b.length; j++) dp[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return dp[a.length][b.length]; };
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (ed(lw[i], lw[j]) < 2) out.push(`"${lw[i]}" and "${lw[j]}" differ by one letter`);
      R.forEach((x, i) => { const nd = x.querySelector('[data-lcs-cursive]'), r = x.getBoundingClientRect(), q = document.createRange(); q.selectNodeContents(nd); const t = q.getBoundingClientRect(); if (t.left < r.left + 4 || t.right > r.right - 4) out.push(`row ${i + 1}: the cursive word leaves its card`); });
      L.forEach((x, i) => { const s = x.querySelector('span:not(.ws-match-dot):not([data-lcs-key-sample])'), r = x.getBoundingClientRect(), t = s.getBoundingClientRect(); if (t.right > r.right - 4) out.push(`row ${i + 1}: the printed word leaves its card`); });
      return out;
    });
    const all = fails.concat(own.map((f) => `${ID}: ${f}`));
    if (page.live) return all;
    return all.concat(await CW.rasterVerify(page, { ID }));
  },
};
