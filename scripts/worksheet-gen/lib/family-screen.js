/**
 * family-screen.js — Level Set 2026-10-14 (walk #66, Family Members, PDF + interactive + key): the interactive specs,
 * the ANSWER-KEY fill and the robot's INDEPENDENT oracles of the `family` faces.
 *
 * The child WRITES on every checkable family page, so every screen is a WRITE screen (operator rule: a page where the
 * child writes gets a screen where the child writes) — the printed page redrawn with big write boxes:
 *   Who Is Who? (K-370)            the number of the person each family word names   → type-number
 *   Generations (G1-385)          1, 2 or 3 for each word (oldest → youngest)         → type-number
 *   Read the Clues (G1-386)       the name from a clue, in its empty name box          → type-word
 *   Riddles (G2-362)              the family word that solves each riddle             → type-word
 * Trace and Write (K-375, handwriting) and the Tree Template (open-ended) are PDF only.
 *
 * The oracles never read data-lcs-answer: Who Is Who? re-derives the number from the drawn badges and the kin map,
 * Generations from the kin paths of the word, the clues from the printed clue sentence and its frame, the riddles
 * from the composed kin path.
 */
'use strict';
const { bank } = require('./b5-common.js');
const { letterPad } = require('./letter-pad.js');
const { seatOnRow } = require('./key-on-row.js');
const tokens = require('../primitives/_tokens.js');

const CORAL = tokens.color.coral;
const LS_DATA = (() => { try { return require('../data/b5/family-levelset.json'); } catch (e) { return {}; } })();
const PRON = (() => { try { return require('../data/b4/pronouns-levelset.json'); } catch (e) { return {}; } })();
const loc2 = (l) => String(l || 'en').slice(0, 2);
const GRAND = ['MM', 'MF', 'FM', 'FF'];
const genOf = (p) => (GRAND.includes(p) ? 0 : /^[MF]([ZB])?$/.test(p) ? 1 : 2);
const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/** a family word typed without its article is right too (fr la tante → tante, it lo zio → zio, fr l’oncle → oncle) */
function altsOf(text) {
  const t = String(text);
  const m = /^(?:la|le|les|il|lo|gli|l’|l')\s*(.+)$/i.exec(t);
  return m ? [m[1]] : [];
}

/* ------------------------------------------------------------------ answer key */
/**
 * fillKey(html, words) — every answer written in, coral: a number INTO its numeral box (centred), a name or a family
 * word SEATED on its writing row (lib/key-on-row.js: baseline on the base rule, x-height at the dashed midline).
 */
function fillKey(html, words) {
  // numeral boxes (Who Is Who?, Generations): an EMPTY ws-blankbox carrying data-lcs-answer
  let out = html.replace(/(<span class="ws-blankbox"[^>]*data-lcs-answer="([^"]*)"[^>]*style=")([^"]*)("[^>]*>)(<\/span>)/g,
    (m0, open, ans, style, close, end) => `${open}${style};display:inline-flex;align-items:center;justify-content:center${close}<span data-lcs-keytext style="font-family:'Baloo 2',cursive;font-weight:700;font-size:26px;line-height:1;color:${CORAL}">${ans}</span>${end}`);
  // name boxes (Read the Clues) and riddle slots: the writing row inside gets the answer seated on it
  out = out.replace(/(<span class="ws-blankbox"[^>]*data-lcs-answer="([^"]*)"[^>]*data-lcs-namebox=""[^>]*>)(<svg[\s\S]*?<\/svg>)(<\/span>)/g,
    (m0, open, ans, svg, end) => open + seatOnRow(svg, unesc(ans)) + end);
  out = out.replace(/(<span class="fam-slot"[^>]*data-lcs-answer="([^"]*)"[^>]*>)(<svg[\s\S]*?<\/svg>)(<\/span>)/g,
    (m0, open, wk, svg, end) => { const w = words[unesc(wk)]; if (!w) throw new Error('family key: no word for ' + wk); return open + seatOnRow(svg, w.text) + end; });
  return out;
}

/* ------------------------------------------------------------------ oracles (independent) */
/** Who Is Who?: the badge of the one drawn person whose kin word is the box's word */
function whoOracle(items, locale) {
  const b = bank('family', loc2(locale));
  return items.map((it) => {
    const m = it.meta || {};
    const wk = m['data-lcs-kinword'];
    const pairs = String(m['data-lcs-badges'] || '').split(',').filter(Boolean).map((x) => x.split(':'));
    const hits = pairs.filter(([path]) => b.kin[path] === wk);
    if (hits.length !== 1) throw new Error(`family who oracle: "${wk}" names ${hits.length} drawn people`);
    return Number(hits[0][1]);
  });
}
/** Generations: 1 + the generation every kin path of the word lives in */
function genOracle(items, locale) {
  const b = bank('family', loc2(locale));
  return items.map((it) => {
    const wk = (it.meta || {})['data-lcs-word'];
    const gs = new Set(Object.keys(b.kin).filter((p) => b.kin[p] === wk).map(genOf));
    if (gs.size !== 1) throw new Error(`family gen oracle: "${wk}" names ${gs.size} generations`);
    return [...gs][0] + 1;
  });
}
/** Read the Clues: the name the printed clue gives this plate's relation (the clue frame read back) */
function clueOracle(items, locale) {
  const b = bank('family', loc2(locale));
  return items.map((it) => {
    const m = it.meta || {};
    const frame = b.clueFrames[m['data-lcs-plate-path']];
    const clue = m['data-lcs-clue'] || '';
    if (!frame || !clue) throw new Error('family clue oracle: no frame / clue for ' + m['data-lcs-plate-path']);
    const rx = new RegExp('^' + frame.split('{name}').map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{egoGen\\\}|\\\{egoName\\\}/g, '.+?')).join('(.+?)') + '$', 'u');
    const g = rx.exec(clue);
    if (!g) throw new Error(`family clue oracle: the clue "${clue}" does not read back through its frame`);
    return g[1];
  });
}
/** Riddles: the family word of the composed kin path ('MZ.M' = the mother of the aunt = MM) */
function riddleOracle(items, locale) {
  const b = bank('family', loc2(locale));
  return items.map((it) => {
    const k = (it.meta || {})['data-lcs-riddle-path'];
    const wk = b.kin[(LS_DATA._paths || {})[k] || k];
    if (!wk || !b.words[wk]) throw new Error('family riddle oracle: no word for ' + k);
    return b.words[wk].text;
  });
}

/* ------------------------------------------------------------------ pads */
function namesPad(d, locale) {
  const l = loc2(locale), b = bank('family', l);
  const names = [...(b.names || []).map((n) => n.name), ...(((PRON[l] || {}).names) || []).map((n) => n.name)];
  return letterPad(l, names);
}
function wordsPad(d, locale) {
  const l = loc2(locale), b = bank('family', l);
  return letterPad(l, Object.values(b.words).map((w) => w.text));
}

const SPECS = {
  who: { kind: 'type-number', item: '[data-lcs-kinbox]', answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-kinword',
    metaAttrs: ['data-lcs-kinword', 'data-lcs-badges'], instructionKey: 'who', screenHeight: 3000,
    maxDigits: () => 1, oracle: whoOracle },
  gen: { kind: 'type-number', item: '[data-lcs-genbox]', answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-word'], instructionKey: 'gen', screenHeight: 4000,
    maxDigits: () => 1, oracle: genOracle },
  names: { kind: 'type-word', item: '[data-lcs-namebox]', answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-plate-path',
    metaAttrs: ['data-lcs-plate-path', 'data-lcs-clue'], instructionKey: 'names', screenHeight: 3200,
    wordPad: namesPad, oracle: clueOracle },
  riddle: { kind: 'type-word', item: '[data-lcs-riddle-path]', answerAttr: 'data-lcs-word', labelAttr: 'data-lcs-riddle-path',
    metaAttrs: ['data-lcs-riddle-path', 'data-lcs-alts'], instructionKey: 'riddle', screenHeight: 4000,
    wordPad: wordsPad, oracle: riddleOracle },
};

module.exports = { SPECS, fillKey, altsOf, whoOracle, genOracle, clueOracle, riddleOracle };
