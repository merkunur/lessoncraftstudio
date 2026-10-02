/**
 * syllable-reading-screen.js — Level Set 2026-10-02 (Word Families, PDF + interactive): the SCREEN version and the ANSWER
 * KEY of a built G1-306 page (the base or one of its five faces), from the printed page's own meta (the same instance:
 * render-instance asserts meta identity), plus the robot's INDEPENDENT oracle, which re-derives every answer from the
 * bank (the word's own row, onset and split), never from the page. New pages only.
 *
 *   base / blends  the picture (+ the printed rime, R shape) → tap what goes on the line: S the first syllable, R the
 *                  onset, B the whole word (its own carpet cell's piece + two other pieces of ITS carpet row)
 *   circle         the picture → tap its word among the card's own printed pills
 *   carpet         the picture → tap its carpet cell (its own cell + two other cells of its row)
 *   join           the syllable tiles → tap the word they make (the right word + two other words of the page)
 *   split          the word printed in syllables → tap its picture (the right picture + two other bank pictures)
 * Every target >= 100 page px. The key: written answers SEATED on their lanes (key-on-row.js), circled pills
 * outlined, carpet cells filled in their card's colour, numbers centred in their boxes.
 */
'use strict';
const { bank } = require('./b3-common.js');
const { fileUri } = require('./b2-common.js');
const { seatAfter } = require('./key-on-row.js');
const tokens = require('../primitives/_tokens.js');

const CORAL = '#F2784B', INK = '#3A3530', TEAL = '#146B5E';
const SCR_W = 660, OPT_H = 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);
const cssStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const BANK = 'syllable-reading';
function rowsOf(cfg, structure) { return structure === 'complex' ? cfg.complexUnits : (cfg.shape === 'rime' ? cfg.rimes : cfg.units); }
function parseCell(cell) { const s = String(cell); const i = s.indexOf('|'); return i < 0 ? { onset: null, rime: null, text: s } : { onset: s.slice(0, i), rime: s.slice(i + 1), text: s.slice(0, i) + s.slice(i + 1) }; }

/** the piece a base / blends card asks for, from the bank word: S its first syllable (the unit), R its onset, B the word */
function pieceOf(shape, w, loc) { return shape === 'syllable' ? low(w.unit, loc) : shape === 'rime' ? String(w.unit) : String(w.word); }
/** the piece a carpet CELL offers (the same reading, so options compare like with like) */
function cellPiece(shape, c, loc) { return shape === 'syllable' ? low(c.text, loc) : shape === 'rime' ? (c.onset != null ? c.onset : c.text) : c.text; }

function findWord(cfg, structure, rowId, key) {
  const row = (rowsOf(cfg, structure) || []).find((r) => r.id === rowId);
  const w = row && (row.words || []).find((x) => x.key === key);
  if (!w) throw new Error(`syllable-reading screen: no word ${key} in row ${rowId}`);
  return { row, w };
}

function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap">${top}</div>${body}</div>`;
}
function optsHtml(labels, correct, inners) {
  const w = labels.length >= 4 ? 150 : labels.length === 3 ? 200 : 290;
  const g = Math.max(...labels.map((l) => [...String(l)].length));
  const px = Math.max(20, Math.min(36, Math.floor((w - 24) / (0.6 * g))));
  return `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${labels.map((l, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${esc(l)}"${j === correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${inners ? 130 : OPT_H}px;box-sizing:border-box;font-size:${px}px;white-space:nowrap">${inners ? inners[j] : esc(l)}</span>`).join('')}</div>`;
}
const pic = (p, px) => `<img class="ws-icon" src="${fileUri(p[0], p[1])}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
const big = (t, px = 44) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:${INK}">${t}</span>`;
const GAP = `<span style="display:inline-block;width:96px;height:44px;border:3px dashed ${CORAL};border-radius:10px;vertical-align:middle"></span>`;
/** the right label + up to two others (distinct), the right one at i % n */
function rotate(right, others, i, loc) {
  const o = [];
  for (const x of others) if (low(x, loc) !== low(right, loc) && !o.some((y) => low(y, loc) === low(x, loc))) o.push(x);
  const pick = o.slice(i % Math.max(1, o.length)).concat(o.slice(0, i % Math.max(1, o.length))).slice(0, 2);
  const at = i % (pick.length + 1); const out = pick.slice(); out.splice(at, 0, right);
  return { opts: out, at };
}

/** syllables as the word prints them: a capitalised word (de nouns) starts with a capitalised syllable */
function asPrinted(tokens, word, loc) {
  const t = tokens.slice(); const f = [...String(word)][0];
  if (f && f !== f.toLocaleLowerCase(loc) && t[0]) t[0] = t[0][0].toLocaleUpperCase(loc) + t[0].slice(1);
  return t;
}

function screenOrKey(built, ctx, loc) {
  const m = built.meta, cfg = bank(BANK, loc), shape = cfg.shape;
  if (!m || !Array.isArray(m.keys)) throw new Error('syllable-reading screen: the built page carries no keys (not a new page?)');
  const face = m.face, structure = m.structure || 'simple';
  const out = { bodyHtml: built.bodyHtml, meta: m };
  if (ctx.interactive) {
    let items = [];
    if (face === 'base' || face === 'carpet' || face === 'circle') {
      items = m.keys.map((key, i) => {
        const { row, w } = findWord(cfg, structure, m.rowIds[i], key);
        const cells = row.cells.map(parseCell);
        const meta = `data-lcs-word="${esc(key)}" data-lcs-row="${esc(row.id)}" data-lcs-structure="${structure}" data-lcs-face="${face}"`;
        if (face === 'circle') {
          // the card's own printed pills, in their printed order
          const at = built.bodyHtml.indexOf(`data-lcs-vocab="${key}"`);
          const blk = built.bodyHtml.slice(at, built.bodyHtml.indexOf('</div></div>', at) + 12);
          const pills = [...blk.matchAll(/data-lcs-choice="([^"]*)"/g)].map((x) => x[1].replace(/&amp;/g, '&'));
          const right = shape === 'syllable' ? low(w.unit, loc) : String(w.word);
          return item(meta, pic(m.pics[i], 150), optsHtml(pills, pills.findIndex((p) => low(p, loc) === low(right, loc))));
        }
        if (face === 'carpet') {
          const own = shape === 'syllable' ? low(w.unit, loc) : String(w.word);
          const r = rotate(own, cells.map((c) => (shape === 'syllable' ? low(c.text, loc) : c.text)), i, loc);
          return item(meta, pic(m.pics[i], 150), optsHtml(r.opts, r.at));
        }
        const right = pieceOf(shape, w, loc);
        const r = rotate(right, cells.map((c) => cellPiece(shape, c, loc)).filter((p) => !(shape === 'rime' && p === String(w.word))), i, loc);
        const top = pic(m.pics[i], 150) + (shape === 'rime' ? big(GAP + `<span style="color:${CORAL}">${esc(m.rimes[i])}</span>`) : '');
        return item(meta, top, optsHtml(r.opts, r.at));
      });
    } else if (face === 'join') {
      items = m.keys.map((key, i) => {
        const r = rotate(m.words[i], m.words.filter((x, k) => k !== i), i, loc);
        const tiles = asPrinted(m.splits[i].split('-'), m.words[i], loc).map((t) => `<span style="border:2px solid ${TEAL};border-radius:12px;padding:4px 14px">${esc(t)}</span>`).join(`<span style="color:${TEAL}">+</span>`);
        return item(`data-lcs-word="${esc(key)}" data-lcs-face="join"`, pic(m.pics[i], 120) + big(tiles, 40), optsHtml(r.opts, r.at));
      });
    } else if (face === 'syllabified') {
      items = m.keys.map((key, i) => {
        const r = rotate(key, m.bankKeys.filter((k) => k !== key), i, loc);
        const inners = r.opts.map((k) => pic(m.bankPics[m.bankKeys.indexOf(k)], 110));
        return item(`data-lcs-word="${esc(key)}" data-lcs-face="syllabified"`, big(esc(asPrinted(m.splits[i].split('-'), m.words[i], loc).join('-')), 46), optsHtml(r.opts, r.at, inners));
      });
    } else throw new Error(`syllable-reading screen: face ${face} has no screen`);
    out.bodyHtml = `<div data-ws-content data-lcs-type="syllable-reading" data-lcs-screen="${face}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }

  // the answer key
  let h = out.bodyHtml;
  const css = [];
  if (face === 'base') {
    m.keys.forEach((key, i) => {
      const { w } = findWord(cfg, structure, m.rowIds[i], key);
      h = seatAfter(h, `data-lcs-vocab="${key}"`, pieceOf(shape, w, loc), { fill: CORAL, font: 'baloo2-700' });
    });
  } else if (face === 'join') {
    m.keys.forEach((key, i) => { h = seatAfter(h, `data-lcs-vocab="${key}"`, m.words[i], { fill: CORAL, font: 'baloo2-700' }); });
  } else if (face === 'circle') {
    m.keys.forEach((key, i) => {
      const { w } = findWord(cfg, structure, m.rowIds[i], key);
      const right = shape === 'syllable' ? low(w.unit, loc) : String(w.word);
      css.push(`[data-lcs-vocab="${cssStr(key)}"] [data-lcs-choice="${cssStr(right)}"]{outline:4px solid ${CORAL};outline-offset:3px}`);
    });
  } else if (face === 'carpet') {
    // each picture's cell filled in the picture's own colour
    const colours = [...h.matchAll(/data-lcs-vocab="([^"]*)"[^>]*data-lcs-colour="([^"]*)"/g)].reduce((a, x) => (a[x[1]] = x[2], a), {});
    m.keys.forEach((key, i) => {
      const { w } = findWord(cfg, structure, m.rowIds[i], key);
      const cellText = shape === 'syllable' ? null : String(w.word);
      const fill = tokens.codeColors[colours[key]];
      const cells = rowsOf(cfg, structure).find((r) => r.id === m.rowIds[i]).cells.map(parseCell);
      const cell = cells.find((c) => (cellText ? c.text === cellText : low(c.text, loc) === low(w.unit, loc)));
      css.push(`[data-lcs-cell="${cssStr(cell.text)}"] rect{fill:${fill}}`);
    });
  } else if (face === 'syllabified') {
    css.push(`[data-lcs-sr-row] [data-lcs-number-box]{position:relative}`);
    m.answers.forEach((n, i) => css.push(`[data-lcs-sr-row="${i + 1}"] [data-lcs-number-box]::after{content:"${n}";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 24px 'Baloo 2',cursive;color:${CORAL}}`));
  }
  out.bodyHtml = h + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
  return out;
}

/** the robot's oracle: the right option index, from the bank's own word records */
function oracle(items, l) {
  const loc = (l || 'en').slice(0, 2);
  const cfg = bank(BANK, loc), shape = cfg.shape;
  const multi = new Map((cfg.multi || []).map((w) => [w.key, w]));
  return items.map((it) => {
    const M = it.meta || {}, face = M['data-lcs-face'], key = it.label;
    let want;
    if (face === 'join') want = multi.get(key).word;
    else if (face === 'syllabified') want = key;
    else {
      const { w } = findWord(cfg, M['data-lcs-structure'] || 'simple', M['data-lcs-row'], key);
      want = face === 'base' ? pieceOf(shape, w, loc) : (shape === 'syllable' ? low(w.unit, loc) : String(w.word));
    }
    const hits = it.options.map((o, i) => (low(o, loc) === low(want, loc) ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`syllable-reading oracle: ${face} ${key}: "${want}" offered ${hits.length} times (${it.options.join(', ')})`);
    return hits[0];
  });
}

const INSTR = { base: 'base', circle: 'circle', carpet: 'carpet', join: 'join', syllabified: 'split' };
function interactiveFor(face) {
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-face', 'data-lcs-row', 'data-lcs-structure'], instructionKey: INSTR[face] || face, screenHeight: 9600,
    oracle: (items, l) => oracle(items, l),
  };
}

module.exports = { screenOrKey, oracle, interactiveFor };
