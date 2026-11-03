/**
 * K-530 — Alphabet Train (Alphabet & Letters maker 2026-11-02, NEW-TEMPLATES §37 T1 — the old alphabet-train app kept;
 * RF.K.1.d alphabet order): the locale's alphabet on the wagons of a train in school order, some letters missing; the
 * child writes them. The easier levels put the letter's chart picture on the wagon (a word that starts with that sound,
 * types/_shared/alphabet-more.js) — the old app's "letter hints", an explicit easier mode (A13). A letter with no honest
 * picture is always given at those levels (a blank wagon always has its picture), and the first wagon is always given.
 * Every blank wagon is an empty answer box holding its letter: the key writes it, the screen types it.
 * Levels: 1 the first half of the alphabet, a picture on every wagon, about a third missing (never two side by side) ·
 * 2 the whole alphabet, a picture on each missing wagon, ten missing (never three in a row) · 3 the whole alphabet in
 * small letters, no pictures, twelve missing (never three in a row).
 */
'use strict';
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { half: true, pics: 'all', share: 0.34, run: 1, upper: true, perRow: 5, wagonH: 172, box: 54, pic: 78, fs: 36 },
  2: { half: false, pics: 'blanks', blanks: 10, run: 2, upper: true, perRow: 8, wagonH: 142, box: 44, pic: 56, fs: 29 },
  3: { half: false, pics: 'none', blanks: 12, run: 2, upper: false, perRow: 8, wagonH: 86, box: 44, pic: 0, fs: 29 },
};
const W = 660;

/** the locomotive, drawn (no library art fits a wagon train): body, cab, chimney, wheels — palette only */
function loco(w, h) {
  const wh = Math.round(h * 0.13), base = h - wh - 4;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" style="display:block">` +
    `<rect x="${w * 0.08}" y="${base - h * 0.34}" width="${w * 0.56}" height="${h * 0.34}" rx="8" fill="${T.coral}" stroke="${T.ink}" stroke-width="2.5"/>` +
    `<rect x="${w * 0.6}" y="${base - h * 0.62}" width="${w * 0.34}" height="${h * 0.62}" rx="6" fill="${T.teal}" stroke="${T.ink}" stroke-width="2.5"/>` +
    `<rect x="${w * 0.67}" y="${base - h * 0.54}" width="${w * 0.2}" height="${h * 0.18}" rx="3" fill="${T.cream}" stroke="${T.ink}" stroke-width="2"/>` +
    `<rect x="${w * 0.16}" y="${base - h * 0.58}" width="${w * 0.12}" height="${h * 0.26}" fill="${T.ink}"/>` +
    `<rect x="${w * 0.12}" y="${base - h * 0.62}" width="${w * 0.2}" height="${h * 0.06}" rx="2" fill="${T.ink}"/>` +
    [0.22, 0.48, 0.77].map((x) => `<circle cx="${w * x}" cy="${base + wh * 0.3}" r="${wh}" fill="${T.ink}"/><circle cx="${w * x}" cy="${base + wh * 0.3}" r="${wh * 0.4}" fill="${T.creamDeep}"/>`).join('') +
    `</svg>`;
}

/** the wagon body's bottom edge (the wheels hang below it) */
const bodyBottom = (h) => h - Math.round(Math.min(14, h * 0.11)) - 4;
/** a wagon's body (the letter box and the picture are HTML on top of it) */
function wagonSvg(w, h, first) {
  const wh = Math.round(Math.min(14, h * 0.11)), base = bodyBottom(h);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" style="position:absolute;left:0;top:0">` +
    (first ? '' : `<rect x="0" y="${base - 18}" width="${w * 0.1}" height="5" fill="${T.ink}"/>`) +
    `<rect x="${w * 0.08}" y="4" width="${w * 0.88}" height="${base - 4}" rx="10" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2.5"/>` +
    [0.3, 0.74].map((x) => `<circle cx="${w * x}" cy="${base + wh * 0.4}" r="${wh}" fill="${T.ink}"/><circle cx="${w * x}" cy="${base + wh * 0.4}" r="${wh * 0.4}" fill="${T.creamDeep}"/>`).join('') +
    `</svg>`;
}

module.exports = {
  id: 'K-530',
  slug: 'alphabet-train',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-knowledge',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Alphabet Train', instruction: 'Write the missing letters on the cars so the alphabet train is in order. The picture on each empty car starts with the missing letter.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const all = A.orderAlphabetOf(L);
    const letters = d.half ? all.slice(0, Math.ceil(all.length / 2)) : all;
    const pic = letters.map((ch) => A.pictureOf(ch, L));
    // a wagon may be blank when it is not the first and (where pictures help) its letter has an honest picture
    const can = letters.map((_, i) => i > 0 && (d.pics === 'none' || !!pic[i]));
    const want = d.blanks || Math.round(letters.length * d.share);
    const order = rng.shuffle(letters.map((_, i) => i).filter((i) => can[i]));
    const blank = new Set();
    const runAt = (i) => { let r = 1; for (let k = i - 1; blank.has(k); k--) r++; for (let k = i + 1; blank.has(k); k++) r++; return r; };
    for (const i of order) { if (blank.size >= want) break; blank.add(i); if (runAt(i) > d.run) blank.delete(i); }
    if (blank.size < Math.min(want, 4)) throw new Error(`K-530: ${L} gives only ${blank.size} missing letters`);
    // rows of wagons, the locomotive leading the first row
    const wagonW = Math.floor((W - 8) / d.perRow) - 4, locoW = Math.round(wagonW * 1.15);
    const units = [{ loco: true }].concat(letters.map((ch, i) => ({ ch, i })));
    const rows = [];
    let row = [], used = 0;
    for (const u of units) {
      const w = u.loco ? locoW : wagonW;
      if (used + w > W - 8 && row.length) { rows.push(row); row = []; used = 0; }
      row.push(u); used += w + 4;
    }
    if (row.length) rows.push(row);
    const wagon = (u, firstInRow) => {
      const ch = A.inCase(u.ch, d.upper, L), isBlank = blank.has(u.i);
      const showPic = d.pics === 'all' ? !!pic[u.i] : d.pics === 'blanks' ? isBlank : false;
      const box = isBlank
        ? `<span class="ws-answerbox" data-lcs-answer="${ch}" style="width:${d.box}px;height:${d.box}px;font-size:${d.fs}px;border-width:2.5px"></span>`
        : `<span data-lcs-given="${ch}" style="display:inline-flex;align-items:center;justify-content:center;width:${d.box}px;height:${d.box}px;box-sizing:border-box;background:#FFFFFF;border:2.5px solid ${T.teal};border-radius:10px;font:700 ${d.fs}px/1 'Baloo 2',cursive;color:${T.teal}">${ch}</span>`;
      // the picture fills the body between the letter box and the wheels (never down onto them)
      const px = Math.min(d.pic, bodyBottom(d.wagonH) - 10 - d.box - 4 - 6, Math.floor(wagonW * 0.84));
      const img = showPic ? `<img class="ws-icon" src="${pic[u.i].src}" alt="" data-lcs-wagon-pic="${pic[u.i].noun}" style="width:${px}px;height:${px}px;object-fit:contain">` : '';
      return `<div data-lcs-wagon="${u.ch}" data-lcs-index="${u.i}" data-lcs-body-bottom="${bodyBottom(d.wagonH)}" style="position:relative;flex:0 0 auto;width:${wagonW}px;height:${d.wagonH}px">${wagonSvg(wagonW, d.wagonH, firstInRow)}` +
        `<div style="position:absolute;left:${wagonW * 0.08}px;width:${wagonW * 0.88}px;top:10px;display:flex;flex-direction:column;align-items:center;gap:4px">${box}${img}</div></div>`;
    };
    const rail = `<div style="height:5px;margin:2px 0 0;background:${T.inkSoft};border-radius:3px"></div>`;
    const rowsHtml = rows.map((r) => `<div data-lcs-train-row style="display:flex;flex-direction:column"><div style="display:flex;align-items:flex-end;gap:4px">` +
      r.map((u, k) => (u.loco ? `<div data-lcs-loco style="flex:0 0 auto">${loco(locoW, d.wagonH)}</div>` : wagon(u, k === 0))).join('') + `</div>${rail}</div>`).join('');
    return {
      bodyHtml: `<div data-ws-content data-lcs-train="${difficulty}" data-lcs-alphabet="${letters.join('')}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;padding:0 4px">${rowsHtml}</div>`,
      meta: { missing: [...blank].sort((a, b) => a - b).map((i) => letters[i]) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-train]'), lv = +root.dataset.lcsTrain;
      const want = [...root.dataset.lcsAlphabet];
      const wagons = [...document.querySelectorAll('[data-lcs-wagon]')];
      if (wagons.map((w) => w.dataset.lcsWagon).join('') !== want.join('')) fails.push('the wagons are not the alphabet in order');
      if (!document.querySelector('[data-lcs-loco]')) fails.push('no locomotive');
      const blanks = wagons.map((w) => !!w.querySelector('[data-lcs-answer]'));
      if (blanks[0]) fails.push('the first wagon is empty');
      if (blanks.filter(Boolean).length < 4) fails.push(`${blanks.filter(Boolean).length} missing letters`);
      let run = 0, maxRun = 0; blanks.forEach((b) => { run = b ? run + 1 : 0; maxRun = Math.max(maxRun, run); });
      if (maxRun > (lv === 1 ? 1 : 2)) fails.push(`${maxRun} missing letters in a row`);
      wagons.forEach((w, i) => {
        const a = w.querySelector('[data-lcs-answer]'), g = w.querySelector('[data-lcs-given]'), ch = w.dataset.lcsWagon;
        const shown = (a ? a.dataset.lcsAnswer : g && g.dataset.lcsGiven) || '';
        if (shown.toLowerCase() !== ch) fails.push(`wagon ${i + 1}: shows ${shown}, the alphabet has ${ch}`);
        if (a && a.textContent.trim()) fails.push(`wagon ${i + 1}: the missing letter is printed`);
        if (a && lv < 3 && !w.querySelector('img')) fails.push(`wagon ${i + 1}: an empty wagon without its picture`);
        const im = w.querySelector('img'); if (im && (!im.complete || !im.naturalWidth)) fails.push(`wagon ${i + 1}: the picture did not load`);
        const r = w.getBoundingClientRect(), b = (a || g).getBoundingClientRect();
        if (b.left < r.left || b.right > r.right) fails.push(`wagon ${i + 1}: the letter box leaves the wagon`);
        if (im) { const q = im.getBoundingClientRect(); if (q.bottom > r.top + +w.dataset.lcsBodyBottom - 2) fails.push(`wagon ${i + 1}: the picture runs into the wheels`); }
      });
      return fails;
    });
  },
};
