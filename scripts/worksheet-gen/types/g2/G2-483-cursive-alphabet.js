/**
 * G2-483 — Cursive Alphabet (Cursive Handwriting maker 2026-11-02, NEW-TEMPLATES §35 T4): the locale's school script as
 * a classroom reference — every letter in the country's alphabet order (the native capitals list of the Level Set:
 * en/fr/it/nl A–Z, pt A–Z then Ç, es with Ñ, de with Ä Ö Ü and ß, da/no with Æ Ø Å), each on its card in the page's ONE Playwrite
 * unit (one text node per letter, the unit's own entry and exit strokes), the print form small underneath so the child
 * links the two. A material page: nothing to answer, no key.
 * Levels: 1 a poster of the capital and the small letter · 2 a poster of the small letters, bigger · 3 desk strips: the
 * small letters (the forms a child writes most), fifteen to a row, on strips to cut out and tape to the desk.
 * Built on G2-377's face machinery: the locale's unit (de: the copy face's VA, the script setting picks LA), the letter
 * size measured so the widest pair and the tallest letter fit their card (primitives/cursive-advances.json +
 * cursive-metrics.json), the whole page verified by the family's DOM half (one face, one text node, no fallback glyph).
 */
'use strict';
const G = require('./G2-377-cursive-writing.js');
const C6 = require('../../templates/components-b6.js');
const SR = require('../../primitives/school-ruling.js');
const { color } = require('../../primitives/_tokens.js');
const ADV = require('../../primitives/cursive-advances.json');
const CW = G._cw;
const ID = 'G2-483';

const D = {
  1: { layout: 'poster', both: true, cols: 5 },
  2: { layout: 'poster', both: false, cols: 6 },
  3: { layout: 'strips', both: false, perRow: 15 },
};
const GAP = 10, LABEL_H = 22, PAD = 6, BUDGET = 677, FS_MAX = 64;
const r2 = (v) => Math.round(v * 100) / 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/** the locale's alphabet: the native capitals list in order, each with its small letter; de adds ß (small only) */
function alphabetOf(bankLoc, ls, loc) {
  const caps = [...new Set(((ls && ls.capitals) || []).map((e) => e.capital))];
  if (caps.length < 20) throw new Error(`${ID}: ${loc} has no alphabet (level-set capitals)`);
  const out = caps.map((C) => ({ cap: C, low: C.toLocaleLowerCase(loc) }));
  const lessons = new Set(Object.values(bankLoc.lessons || {}).flat(2));
  if (loc === 'de' && lessons.has('ß')) out.push({ cap: null, low: 'ß' });
  // pt: Ç is not one of the 26 letters, but Brazilian cursive charts show it after Z (maçã, onça — native review 2026-11-02)
  if (loc === 'pt' && lessons.has('ç')) out.push({ cap: 'Ç', low: 'ç' });
  return out;
}

module.exports = {
  id: ID,
  slug: 'cursive-alphabet',
  gradeBand: 'G2',
  assetClass: 'geometry',
  exerciseType: 'cursive-writing',
  themeAxis: { applicable: false },
  unitAxis: { ...G.unitAxis, exemplar: (loc) => { const b = CW.loadBank(CW.KEY, String(loc).slice(0, 2)); return (b.exemplarByMode && b.exemplarByMode.copy) || b.exemplar; } },
  difficulty: D,
  i18n: { en: { title: 'The Cursive Alphabet', instruction: 'Look at each letter in cursive and in print. Use the alphabet when you write in cursive.' } },

  build({ difficulty, locale, unit }) {
    const d = D[difficulty] || D[2], loc = String(locale || 'en').slice(0, 2);
    if (CW.NEUTRAL.refusedLocales[loc]) throw new Error(`${ID}: refused in ${loc}: no national joined school script (${CW.NEUTRAL.refusedLocales[loc]})`);
    const bankLoc = CW.loadBank(CW.KEY, loc), ls = CW.levelSetData(loc);
    const u0 = unit || (bankLoc.exemplarByMode && bankLoc.exemplarByMode.copy) || bankLoc.exemplar;
    const c = { ...CW.faceContext(bankLoc, { mode: 'copy' }, loc, u0), typeId: ID };
    const m = SR.metricsFor(c.unit), adv = ADV[c.unit];
    if (!adv) throw new Error(`${ID}: primitives/cursive-advances.json has no unit ${c.unit}`);
    const letters = alphabetOf(bankLoc, ls, loc);
    const showCap = (L) => d.both && L.cap;
    // the ink band of a card: the tallest letter (an accented capital where the alphabet has one) to the deepest descender
    const hasAcc = letters.some((L) => showCap(L) && /[ÄÖÜÅÑ]/u.test(L.cap));
    const A = Math.max(m.ascender, d.both ? (hasAcc ? m.accCap : m.cap) : 0), Dd = Math.max(m.descender, d.both ? m.capDescender : 0);
    const wEm = (L) => (showCap(L) ? adv[L.cap] + 0.3 : 0) + adv[L.low];
    for (const L of letters) if ((showCap(L) && adv[L.cap] == null) || adv[L.low] == null) throw new Error(`${ID}: ${loc} ${c.unit}: no measured advance for ${L.cap || ''}${L.low}`);
    const widest = Math.max(...letters.map(wEm));
    let cardW, cardH, rows, strips = 0, perStrip = 0;
    if (d.layout === 'poster') {
      rows = Math.ceil(letters.length / d.cols);
      cardW = Math.floor((CW.BODY_W - (d.cols - 1) * GAP) / d.cols);
      cardH = Math.floor((BUDGET - CW.TAG_H - (rows - 1) * GAP) / rows);
    } else {
      perStrip = Math.ceil(letters.length / d.perRow);   // rows per strip
      cardW = Math.floor((CW.BODY_W - 20 - (d.perRow - 1) * 4) / d.perRow);
      strips = Math.max(1, Math.floor((BUDGET - CW.TAG_H + 18) / (perStrip * 64 + (perStrip - 1) * 4 + 16 + 18)));
      rows = perStrip * strips;
      cardH = Math.floor((BUDGET - CW.TAG_H - (strips - 1) * 18 - strips * ((perStrip - 1) * 4 + 16)) / rows);
    }
    // the letter size: the tallest ink and the widest pair fit the card's cursive zone (a card keeps its print label)
    const zoneH = cardH - (d.layout === 'poster' ? LABEL_H : 14) - 2 * PAD;
    const fs = Math.min(FS_MAX, zoneH / (A + Dd), (cardW - 2 * PAD) / (widest * 1.06));
    if (fs * m.xHeight < CW.NEUTRAL.xFloor.G2 * (d.layout === 'strips' ? 0.55 : 1)) throw new Error(`${ID}: ${loc} ${c.unit}: the letters would be ${r2(fs * m.xHeight)} px x-height (refuse)`);
    const lb = C6.cwLineBox(c.unit, fs);
    const inkH = (A + Dd) * fs, yb = A * fs - inkH / 2;   // the baseline below the zone's centre
    const style = `font-family:'LCS Cursive ${c.unit}';font-size:${r2(fs)}px;line-height:${lb.lh}px;font-weight:400;font-style:normal;color:${color.ink};white-space:nowrap;letter-spacing:0;word-spacing:0;text-transform:none`;
    const node = (t, role) => `<span data-lcs-cursive="${esc(c.unit)}" data-lcs-role="model" data-lcs-fs="${r2(fs)}" data-lcs-kind="${role}" style="${style}">${esc(t)}</span>`;
    const label = (L, small) => `<div class="cw-strip" data-lcs-print="${esc((showCap(L) ? L.cap : '') + L.low)}" style="position:absolute;left:0;right:0;bottom:${small ? 1 : PAD}px;text-align:center;font-family:'Nunito';font-weight:800;font-size:${small ? 11 : 15}px;line-height:${small ? 12 : 16}px;color:${color.inkSoft}">${esc(showCap(L) ? L.cap + ' ' + L.low : L.low)}</div>`;
    const card = (L, i, small) => {
      // the cursive zone is the card above its print label; its centre sits label/2 above the card's centre, so a card that
      // grows with its row keeps the pair centred: baseline = card centre + (yb − label/2), whatever the card's height
      const lab = small ? 14 : LABEL_H, base = r2(yb - lab / 2);
      // the pair sits on one baseline: one flex row of two nodes (equal line boxes), its top = baseline − line ascent
      const ink = `<div style="position:absolute;left:0;right:0;top:calc(50% + ${r2(base - lb.asc)}px);display:flex;justify-content:center;gap:${r2(0.3 * fs)}px">${showCap(L) ? node(L.cap, 'cap') : ''}${node(L.low, 'low')}</div>`;
      return `<div class="ws-match-item ws-match-item--plain cw-row cw-card" data-lcs-letter-card="${esc((showCap(L) ? L.cap : '') + L.low)}" data-lcs-card-yb="${base}" data-lcs-index="${i}"` +
        ` style="box-sizing:border-box;width:${cardW}px;min-height:${cardH}px;flex:0 0 auto${small ? ';border-width:1.5px;border-radius:8px' : ''}">${ink}${label(L, small)}</div>`;
    };
    // a row of cards grows with the page (at most 30 px), so the page fills its body with no blank band between rows
    const rowStyle = (gap) => `display:flex;gap:${gap}px;flex:1 1 ${cardH}px;min-height:${cardH}px;max-height:${cardH + 30}px`;
    let content;
    if (d.layout === 'poster') {
      const rowsHtml = [];
      // a short last row is centred (one Z alone at the left edge looks forgotten)
      for (let r = 0; r < rows; r++) rowsHtml.push(`<div data-lcs-poster-row="${r + 1}" style="${rowStyle(GAP)};justify-content:${r === rows - 1 && letters.length % d.cols ? 'center' : 'flex-start'}">${letters.slice(r * d.cols, (r + 1) * d.cols).map((L, j) => card(L, r * d.cols + j, false)).join('')}</div>`);
      content = `<div data-lcs-flow="" style="flex:1 1 auto;display:flex;flex-direction:column;gap:${GAP}px">${rowsHtml.join('')}</div>`;
    } else {
      const lines = Array.from({ length: perStrip }, (_, r) => letters.slice(r * d.perRow, (r + 1) * d.perRow));
      const strip = (s) => `<div data-lcs-strip="${s + 1}" style="box-sizing:border-box;width:${CW.BODY_W}px;padding:6px 8px;border:2px solid ${color.teal};border-radius:12px;background:${color.cream};display:flex;flex-direction:column;gap:4px;flex:1 1 auto">` +
        lines.map((row, ri) => `<div style="${rowStyle(4)};justify-content:flex-start">${row.map((L, j) => card(L, ri * d.perRow + j, true)).join('')}</div>`).join('') + `</div>`;
      const cut = `<div data-lcs-cut="" style="height:18px;flex:0 0 auto;display:flex;align-items:center"><div style="flex:1;border-top:2px dashed ${color.grid}"></div></div>`;
      content = `<div data-lcs-flow="" style="flex:1 1 auto;display:flex;flex-direction:column">${Array.from({ length: strips }, (_, s) => strip(s)).join(cut)}</div>`;
    }
    const stack = d.layout === 'poster' ? CW.TAG_H + rows * cardH + (rows - 1) * GAP : CW.TAG_H + strips * (perStrip * cardH + (perStrip - 1) * 4 + 16) + (strips - 1) * 18;
    const html = C6.cwFontFace(c.unit) +
      `<div class="cw-page" data-ws-content="" data-lcs-cw="" data-lcs-type="${ID}" data-lcs-face="alphabet" data-lcs-mode="alphabet" data-lcs-locale="${loc}"` +
      ` data-lcs-unit="${c.unit}" data-lcs-x="${r2(fs * m.xHeight)}" data-lcs-floor="${r2(fs * m.xHeight)}" data-lcs-ruling="none" data-lcs-stack="${stack}" data-lcs-practice="0" data-lcs-count="${letters.length}" data-lcs-lift="${c.lift}"` +
      ` data-lcs-layout="${d.layout}" data-lcs-both="${d.both ? 1 : 0}" data-lcs-alphabet="${esc(letters.map((L) => (L.cap || '') + L.low).join('|'))}" style="display:flex;flex-direction:column;justify-content:flex-start;height:100%;width:${CW.BODY_W}px;margin:0 auto">` +
      C6.cwScriptTag({ scriptName: c.scriptName, w: CW.BODY_W }) + content + `</div>`;
    return { bodyHtml: html, meta: { letters: letters.length, unit: c.unit, fs: r2(fs), strips } };
  },

  async verify(page) {
    const fails = await page.evaluate(CW.browserVerify, { ID, STACK_MAX: BUDGET, ink: CW.hexToRgb(color.ink), grid: CW.hexToRgb(color.grid), face: { mode: 'alphabet', cards: true, freeLines: null } });
    const own = await page.evaluate(() => {
      const out = [];
      const root = document.querySelector('[data-lcs-cw]'), both = root.dataset.lcsBoth === '1', layout = root.dataset.lcsLayout;
      const want = root.dataset.lcsAlphabet.split('|');
      const strips = layout === 'strips' ? [...root.querySelectorAll('[data-lcs-strip]')] : [root];
      if (layout === 'strips' && strips.length < 2) out.push(`${strips.length} strips`);
      strips.forEach((s, si) => {
        const cards = [...s.querySelectorAll('[data-lcs-letter-card]')];
        const got = cards.map((x) => x.dataset.lcsLetterCard);
        if (got.join('|') !== want.map((w) => (both ? w : w.slice(-1))).join('|')) out.push(`${layout === 'strips' ? 'strip ' + (si + 1) : 'poster'}: the letters are not the alphabet in order`);
        cards.forEach((x, i) => {
          const ns = [...x.querySelectorAll('[data-lcs-cursive]')].map((n) => n.textContent).join('');
          if (ns !== x.dataset.lcsLetterCard) out.push(`card ${i + 1}: cursive "${ns}" ≠ "${x.dataset.lcsLetterCard}"`);
          const r = x.getBoundingClientRect();
          x.querySelectorAll('[data-lcs-cursive]').forEach((n) => { const q = document.createRange(); q.selectNodeContents(n); const t = q.getBoundingClientRect(); if (t.left < r.left + 1 || t.right > r.right - 1) out.push(`card ${i + 1}: "${n.textContent}" leaves its card`); });
          const lab = x.querySelector('[data-lcs-print]');
          if (!lab || lab.textContent.replace(/\s/g, '') !== x.dataset.lcsLetterCard) out.push(`card ${i + 1}: print label "${lab && lab.textContent}"`);
        });
      });
      return out;
    });
    // no raster half: the family's raster oracle measures ink on RULED writing lines and joins inside one word; an
    // alphabet card has no ruling and holds two letters (a capital's flourish crosses the midpoint the oracle cuts at)
    return fails.concat(own.map((f) => `${ID}: ${f}`));
  },
};
