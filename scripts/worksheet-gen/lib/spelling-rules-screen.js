/**
 * spelling-rules-screen.js — Level Set 2026-10-01 (Spelling Rules, PDF + interactive): the SCREEN version of a built
 * G2-315 page (any face) and the robot's INDEPENDENT oracle. New pages only — the published pages never reach it.
 *
 *   base / detective  tap-choice: the picture and its word (base: the rule letters missing; detective: the whole word)
 *                     → tap the rule letters (the rule's candidates: the answer + up to three others; magic e "a_e")
 *   choice            tap-choice over the page's own two letter chips
 *   bins              tap-choice: the picture → tap the bin (the two chips) its word is spelled with
 *   anchor            tap-spell: the rule letters printed in place, a slot for every other letter, those letters as tiles
 *   plural            tap-choice: the word for one + three pictures + the plural with its gap → tap the right ending
 * The picture fixes the word, so a page has exactly one right answer per item.
 * The oracle recomputes every answer from the bank (the rule's items by vocabKey → g / gaps / plural), never from the
 * page's stamps. The answer key is the printed page with the answers filled (G2-315 ctx.keyFill), not built here.
 */
'use strict';
const { fileUri, displayWord } = require('./b2-common.js');
const { bank: loadBank } = require('./b3-common.js');
const { tileOrder } = require('./singular-plural-screen.js');

const SCR_W = 660, OPT_H = 104, TILE = 100, SLOT = 64, CORAL = '#F2784B', TEAL = '#146B5E', INK = '#3A3530';
const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** A deterministic hash for picking distractors (the same item always gets the same options). */
function hash(s) { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; }

/** The options of an item: the answer + up to three other candidates, in a fixed seeded order. */
function optionsFor(answer, cands, seed) {
  const others = (cands || []).filter((c) => c !== answer);
  // a doubled consonant's single letter is the real misconception: offer it first when it is a candidate
  others.sort((a, b) => (hash(seed + a) - hash(seed + b)));
  const pick = others.slice(0, 3);
  const all = [answer, ...pick];
  return all.sort((a, b) => hash(seed + '#' + a) - hash(seed + '#' + b));
}
const shown = (c, rule) => (rule.gap && rule.gap.boxes === 'split' && [...c].length === 2 ? `${[...c][0]}_${[...c][1]}` : c);

function card(attrs, inner) {
  return `<div data-lcs-item data-ws-content ${attrs} style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:16px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${inner}</div>`;
}
const pic = (it, px) => `<img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" data-lcs-pic="${esc(it.key)}" style="width:${px}px;height:${px}px;object-fit:contain">`;
const row = (html, gap = 12) => `<div style="display:flex;gap:${gap}px;justify-content:center;align-items:center;flex-wrap:wrap;max-width:640px">${html}</div>`;
const letterSpan = (ch, color) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:44px;line-height:1;color:${color || INK}">${esc(ch)}</span>`;
const gapSpan = (n) => `<span style="display:inline-block;width:${Math.max(1, n) * 30 + 14}px;height:52px;border:3px dashed ${CORAL};border-radius:10px;background:#FFF;vertical-align:middle"></span>`;

/** The word with its gaps as dashed boxes (one box per gap; the width never gives the answer away beyond the page's). */
function gappedWord(word, gaps) {
  const letters = [...word];
  const at = new Map((gaps || []).map((g) => [g.from, g]));
  const out = [];
  for (let i = 0; i < letters.length; i++) {
    const g = at.get(i);
    if (g) { out.push(gapSpan(2)); i += g.len - 1; } else out.push(letterSpan(letters[i]));
  }
  return `<div style="display:flex;gap:4px;align-items:center;justify-content:center">${out.join('')}</div>`;
}
const optChips = (opts, rule, answer, w) => row(opts.map((o, i) => `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(o)}"${o === answer ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:40px">${esc(shown(o, rule))}</span>`).join(''));
const optW = (n) => Math.min(200, Math.floor((SCR_W - 24 - (n - 1) * 12) / n));

function screen(built, ctx, loc, bank) {
  const m = built.meta;
  const face = m.face || 'base';
  const rule = bank.rules[m.rule];
  if (!Array.isArray(m.items) || !m.items.length) throw new Error('spelling-rules screen: the built page carries no items');
  const items = m.items.map((it) => {
    const attrs = `data-lcs-rule="${esc(m.rule)}" data-lcs-vocab="${esc(it.key)}" data-lcs-face="${face}"`;
    if (face === 'anchor') {
      const letters = [...it.word];
      const inGap = new Set();
      for (const g of it.gaps) for (let k = 0; k < g.len; k++) inGap.add(g.from + k);
      const rest = letters.filter((_, i) => !inGap.has(i));
      const slots = letters.map((ch, i) => (inGap.has(i) ? letterSpan(ch, CORAL) : `<span data-lcs-slot style="display:inline-block;width:${SLOT}px;height:${SLOT}px;box-sizing:border-box;border:3px dashed ${CORAL};border-radius:10px;background:#FFF"></span>`)).join('');
      const order = tileOrder(rest, it.key + '|anchor|' + loc);
      const tiles = order.map((v) => `<span class="ws-achip" data-lcs-tile data-lcs-label="${esc(rest[v])}" style="width:${TILE}px;height:${TILE}px;box-sizing:border-box;font-size:40px">${esc(rest[v])}</span>`).join('');
      return card(attrs + ` data-lcs-word="${esc(rest.join(''))}"`, pic(it, 150) + row(slots, 6) + row(tiles));
    }
    if (face === 'bins' || face === 'choice') {
      const opts = m.order;
      const top = face === 'bins' ? pic(it, 170) : pic(it, 140) + gappedWord(it.word, it.gaps);
      return card(attrs, top + optChips(opts, rule, it.g, optW(2)));
    }
    if (face === 'plural') {
      const ending = it.gaps.map((g) => [...it.plural].slice(g.from, g.from + g.len).join('')).join('');
      const opts = optionsFor(ending, rule.cands, it.key + '|plural|' + loc);
      const top = `<div style="display:flex;gap:16px;align-items:center;justify-content:center;flex-wrap:wrap">${pic(it, 110)}${letterSpan(it.word)}<span style="font-size:36px;color:${CORAL}">→</span>${pic(it, 70)}${pic(it, 70)}${pic(it, 70)}</div>`;
      return card(attrs, top + gappedWord(it.plural, it.gaps) + optChips(opts, rule, ending, optW(opts.length)));
    }
    // base / detective
    const opts = optionsFor(it.g, rule.cands, it.key + '|' + face + '|' + loc);
    const word = face === 'detective' ? `<div style="display:flex;gap:4px;justify-content:center">${[...it.word].map((ch) => letterSpan(ch)).join('')}</div>` : gappedWord(it.word, it.gaps);
    return card(attrs, pic(it, 150) + word + optChips(opts, rule, it.g, optW(opts.length)));
  });
  return { bodyHtml: `<div data-ws-content data-lcs-type="spelling-rules" data-lcs-screen="${face}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`, meta: m };
}

/** The bank item of a vocab key under a rule, its display forms recomputed. */
function itemOf(bank, ruleId, key, loc) {
  const rule = bank.rules[ruleId];
  if (!rule) throw new Error(`spelling-rules oracle: no rule ${ruleId}/${loc}`);
  const it = (rule.items || []).find((x) => x.vocabKey === key);
  if (!it) throw new Error(`spelling-rules oracle: no item ${key} under ${ruleId}/${loc}`);
  return { ...it, word: displayWord(it.word, loc, bank.capital), plural: it.plural ? displayWord(it.plural, loc, bank.capital) : null };
}

function oracle(face, items, l) {
  const loc = (l || 'en').slice(0, 2);
  const bank = loadBank('spelling-rules', loc);
  return items.map((x) => {
    const m = x.meta || {};
    const it = itemOf(bank, m['data-lcs-rule'], m['data-lcs-vocab'], loc);
    const cut = (w) => it.gaps.map((g) => [...w].slice(g.from, g.from + g.len).join('')).join('');
    if (face === 'anchor') {
      const inGap = new Set();
      for (const g of it.gaps) for (let k = 0; k < g.len; k++) inGap.add(g.from + k);
      return [...it.word].filter((_, i) => !inGap.has(i));
    }
    const answer = face === 'plural' ? cut(it.plural) : it.g;
    if (face !== 'plural' && cut(it.word) !== it.g) throw new Error(`spelling-rules oracle: ${it.vocabKey} gaps spell "${cut(it.word)}" not "${it.g}"`);
    const i = x.options.indexOf(answer);
    if (i < 0) throw new Error(`spelling-rules oracle: "${answer}" not among the options of ${it.vocabKey}`);
    return i;
  });
}

/** The interactive declaration of a face. */
function interactiveFor(face) {
  const key = face || 'gap';
  if (face === 'anchor') {
    return {
      kind: 'tap-spell', item: '[data-lcs-item]', tile: '[data-lcs-tile]', slot: '[data-lcs-slot]',
      answerAttr: 'data-lcs-word', labelAttr: 'data-lcs-vocab', metaAttrs: ['data-lcs-rule', 'data-lcs-vocab', 'data-lcs-face'],
      instructionKey: 'anchor', screenHeight: 7200, oracle: (items, l) => oracle('anchor', items, l),
    };
  }
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]',
    metaAttrs: ['data-lcs-rule', 'data-lcs-vocab', 'data-lcs-face'], instructionKey: key, screenHeight: 7200,
    oracle: (items, l) => oracle(face || 'base', items, l),
  };
}

module.exports = { screen, oracle, interactiveFor, optionsFor };
