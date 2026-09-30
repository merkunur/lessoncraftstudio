/**
 * sentence-building-screen.js — Level Set 2026-09-30 (Sentence Building, PDF + interactive): the screen version
 * (tap-spell with WORD tiles: tap the words in order into the sentence's slots) and the answer key for G1-249 and its
 * faces, built from the printed page's own meta (the same instance), plus the robot's INDEPENDENT oracle, which
 * rebuilds every sentence from the merged bank (frame text + the noun's vocabulary form + the page's names) and
 * applies the level's display rules (capital / end mark hidden) exactly as the printed tiles do.
 */
'use strict';

const SB = require('./sentence-bank.js');
const { vocab, displayWord } = require('./b2-common.js');
const { seatAfter } = require('./key-on-row.js');

const CORAL = '#F2784B';
const SCR_W = 660;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The tokens as the page shows them (mirrors G1-249 build: end mark stripped, first word lowercased unless a name). */
function shownOf(canonical, names, showCap, showEnd, loc) {
  const toks = SB.tokenize(canonical);
  const nameSet = new Set([].concat(names).map((x) => String(x).toLocaleLowerCase(loc)));
  const nameIdx = toks.map((t, k) => (nameSet.has(t.replace(/[.?!¿¡]/g, '').toLocaleLowerCase(loc)) ? k : -1)).filter((k) => k >= 0);
  const caps = showCap ? SB.capsIndices(toks) : [...new Set(SB.capsIndices(toks).concat(nameIdx))];
  const end = SB.endMark(canonical);
  return toks.map((t, k) => {
    let s = t;
    if (!showEnd && k === toks.length - 1 && end) s = s.replace(/[\s  ]*[.?!]$/, '');
    if (!showCap && k === 0 && !caps.includes(0)) s = s.toLocaleLowerCase(loc);
    if (!showCap && k === 0 && /^[¿¡]/.test(s)) s = s.replace(/^[¿¡]/, '');
    return s;
  });
}

function screenOrKey(built, ctx, loc) {
  const m = built.meta;
  const out = { bodyHtml: built.bodyHtml, meta: m };
  if (ctx.interactive) {
    const rules = `${m.showCap ? 1 : 0}${m.showEnd ? 1 : 0}`;
    const items = m.lanes.map((ln) => {
      const longest = Math.max(...ln.shown.map((w) => [...w].length));
      const w = Math.max(120, Math.min(300, Math.round(longest * 19 + 40)));
      const slots = ln.shown.map(() => `<span data-lcs-slot style="display:inline-block;width:${w}px;height:86px;border:3px dashed ${CORAL};border-radius:14px;box-sizing:border-box;background:#fff"></span>`).join('');
      const tiles = ln.order.map((idx) => `<span class="ws-achip" data-lcs-tile="${idx}" data-lcs-label="${esc(ln.shown[idx])}" style="min-width:${w}px;height:104px;box-sizing:border-box;font-size:28px;padding:0 14px">${esc(ln.shown[idx])}</span>`).join('');
      return `<div data-lcs-item data-lcs-frame="${esc(ln.frame)}" data-lcs-noun="${esc(ln.noun)}" data-lcs-names="${esc(JSON.stringify(ln.names))}" data-lcs-rules="${rules}" data-lcs-word="${esc(ln.shown.join(''))}" data-ws-content ` +
        `style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:16px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
        `<img class="ws-icon" src="${ln.src}" alt="" style="width:120px;height:120px;object-fit:contain">` +
        `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">${slots}</div>` +
        `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">${tiles}</div></div>`;
    });
    out.bodyHtml = `<div data-ws-content data-lcs-type="sentence-building" data-lcs-screen="order" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // answer key: each lane's sentence written in coral, SEATED on its own writing row (key-on-row.js)
  let html = out.bodyHtml;
  for (const ln of m.lanes) html = seatAfter(html, `data-lcs-frame="${esc(ln.frame)}"`, ln.canonical, { fill: CORAL, font: 'nunito-700' });
  out.bodyHtml = html;
  return out;
}

/** The robot's truth per item: the sentence rebuilt from the merged bank, shown as the level shows it (a word list). */
function oracle(items, loc, bank) {
  const V = vocab();
  return items.map((it) => {
    const frame = bank.frames.find((f) => f.id === it.meta['data-lcs-frame']);
    if (!frame) throw new Error(`sentence oracle: no frame ${it.meta['data-lcs-frame']}`);
    const key = it.meta['data-lcs-noun'];
    const e = V[key] && V[key][loc];
    if (!e) throw new Error(`sentence oracle: no vocabulary ${key}/${loc}`);
    const mode = bank.nounCase === 'keep' ? 'keep' : 'lower';
    const noun = SB.resolveNoun(bank, frame, { vocabKey: key, singular: displayWord(e[0], loc, mode), plural: displayWord(e[1] || '', loc, mode) }, loc);
    const names = JSON.parse(it.meta['data-lcs-names'] || '[]');
    const canonical = SB.fillFrame(frame.text, { name: names, noun, n: '', color: '' });
    const rules = it.meta['data-lcs-rules'] || '11';
    return shownOf(canonical, names, rules[0] === '1', rules[1] === '1', loc);
  });
}

module.exports = { screenOrKey, oracle, shownOf };
