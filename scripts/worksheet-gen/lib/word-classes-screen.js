/**
 * word-classes-screen.js — Level Set 2026-10-02 (Word Classes, PDF + interactive): the SCREEN version and the ANSWER KEY
 * of a built G2-275 page (the base or one of its faces), from the printed page's own meta (the same instance:
 * render-instance asserts meta identity), plus the robot's INDEPENDENT oracle, which re-derives every word's class from
 * the word-class bank and the theme's nouns, never from the page. New pages only — the published pages never reach here.
 *
 *   screen  one item per word chip (the word, and its picture where the printed page shows one) → tap its bin
 *           (the bins' own school terms, in the printed order). Every target >= 100 page px.
 *   key     every chip word written in coral in its bin, on the bin's own dashed lines: the text is placed at the line's
 *           y inside the same SVG (the line IS its baseline reference — no guessed offset), below a worked example.
 */
'use strict';
const { WORD_CLASSES } = require('../data/b2/word-classes.js');
const { entriesFor, displayWord, fileUri } = require('./b2-common.js');

const CORAL = '#F2784B', INK = '#3A3530';
const SCR_W = 660, OPT_H = 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);

function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:16px">${top}</div>${body}</div>`;
}
function optsHtml(labels, correct) {
  const w = labels.length >= 3 ? 200 : 290;
  const g = Math.max(...labels.map((l) => [...String(l)].length));
  const px = Math.max(18, Math.min(28, Math.floor((w - 24) / (0.58 * g))));
  return `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${labels.map((l, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${esc(l)}"${j === correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px;white-space:nowrap">${esc(l)}</span>`).join('')}</div>`;
}

function screenOrKey(built, ctx, loc, theme) {
  const m = built.meta;
  if (!m || !Array.isArray(m.chips)) throw new Error('word-classes screen: the built page carries no chips (not a new page?)');
  const W = WORD_CLASSES[loc];
  const out = { bodyHtml: built.bodyHtml, meta: m };
  if (ctx.interactive) {
    const terms = m.classes.map((c) => W.terms[c]);
    const items = m.chips.map((c) => {
      const pic = c.noun ? `<img class="ws-icon" src="${fileUri(theme, c.noun)}" alt="" style="width:120px;height:120px;object-fit:contain">` : '';
      return item(`data-lcs-word="${esc(c.word)}" data-lcs-theme="${esc(theme)}"`, pic + `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:48px;line-height:1.1;color:${INK}">${esc(c.word)}</span>`,
        optsHtml(terms, m.classes.indexOf(c.cls)));
    });
    out.bodyHtml = `<div data-ws-content data-lcs-type="word-classes" data-lcs-screen="sort" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // the key: each bin's words on its own lines, below the worked example (if any)
  let h = out.bodyHtml;
  const step = (m.binH - 10) / (m.lines + 1);
  for (const cls of m.classes) {
    const ws = m.chips.filter((c) => c.cls === cls).map((c) => c.word);
    const first = m.examples && m.examples[cls] ? 2 : 1;
    if (first + ws.length - 1 > m.lines) throw new Error(`word-classes key: ${ws.length} ${cls} words do not fit ${m.lines} lines`);
    const texts = ws.map((w, k) => `<text x="97" y="${(first + k) * step - 5}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${m.font + 2}" fill="${CORAL}" data-lcs-keyword="${cls}">${esc(w)}</text>`).join('');
    const re = new RegExp(`(data-lcs-bin="${cls}"[^>]*><svg[^>]*>[\\s\\S]*?)(</svg>)`);
    if (!re.test(h)) throw new Error(`word-classes key: no bin ${cls}`);
    h = h.replace(re, `$1${texts}$2`);
  }
  out.bodyHtml = h;
  return out;
}

/** the robot's oracle: each word's class from the bank (verbs / adjectives) and the theme's nouns, never from the page */
function oracle(items, l) {
  const loc = (l || 'en').slice(0, 2);
  const W = WORD_CLASSES[loc];
  const verbs = new Set(W.verbs.map((v) => low(v.w, loc))), adjs = new Set(W.adjectives.map((a) => low(a.w, loc)));
  return items.map((it) => {
    const word = low(it.label, loc), theme = (it.meta || {})['data-lcs-theme'];
    const nouns = new Set(entriesFor(theme, loc).map((e) => low(displayWord(e.singular, loc, 'lower'), loc)));
    const cls = [verbs.has(word) && 'verb', adjs.has(word) && 'adj', nouns.has(word) && 'noun'].filter(Boolean);
    if (cls.length !== 1) throw new Error(`word-classes oracle: "${it.label}" belongs to ${cls.length} classes (${cls})`);
    const hit = it.options.map((o, i) => (o === W.terms[cls[0]] ? i : -1)).filter((i) => i >= 0);
    if (hit.length !== 1) throw new Error(`word-classes oracle: the ${cls[0]} bin offered ${hit.length} times`);
    return hit[0];
  });
}

function interactiveFor(key) {
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-theme'], instructionKey: key, screenHeight: 9600,
    oracle: (items, l) => oracle(items, l),
  };
}

module.exports = { screenOrKey, oracle, interactiveFor };
