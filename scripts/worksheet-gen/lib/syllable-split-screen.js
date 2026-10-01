/**
 * syllable-split-screen.js — Level Set 2026-10-01 (Syllable Division, PDF + interactive): the SCREEN version of a built
 * G1-305 page (base or face) and the robot's INDEPENDENT oracle. New pages only — the published pages never reach this
 * file. Every target is at least 84 px on the page (44 px on a 360 px phone, where the page is drawn at ~53 %).
 *
 *   count     (base)      the picture and its word; tap how many syllables (1-4).
 *   dashes    (rewrite)   three ways of writing the word with dashes, one per row: the right one, one with a break
 *                         missing (the wrong number of parts), one that splits off a lone consonant (a "syllable" with
 *                         no vowel, which no locale here has). Tap the right one.
 *   missing   (cloze)     the word with its box; three syllables: the missing one + two from other words on the page.
 *   spell     (scramble)  the word's syllables as tiles; tap them in order.
 *   sort      (sort)      each bank word; tap its column (the locale's 2 / 3 labels).
 *   kings     (Vowel King) one item per syllable: the syllable as big units (each consonant letter, its ONE vowel run
 *                         as one unit); tap the vowel.
 * The oracle recomputes every answer from the phonics pipeline (lib/b3-common.js approvedByKey: the gated split and
 * count of the vocab key), never from the page's own marks.
 */
'use strict';
const { fileUri } = require('./b2-common.js');
const { approvedByKey, bank } = require('./b3-common.js');
const VOWELS = require('../data/literacy/letter-knowledge.json').vowels;
const freeClaim = require('../../lib/free-claim.js');

const SCR_W = 660, CORAL = '#F2784B', TEAL = '#146B5E', INK = '#1F2B2A';
const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const card = (attrs, inner) => `<div data-lcs-item data-ws-content ${attrs} style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:16px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${inner}</div>`;
const row = (html, gap = 12, wrap = true) => `<div style="display:flex;gap:${gap}px;justify-content:center;align-items:center;${wrap ? 'flex-wrap:wrap;' : ''}max-width:640px">${html}</div>`;
const pic = (theme, noun, px) => `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
const bigWord = (w, px = 44) => `<div style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:${INK}">${esc(w)}</div>`;
const opt = (i, label, correct, w, h, px, inner) => `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${h}px;box-sizing:border-box;font-size:${px}px">${inner != null ? inner : esc(label)}</span>`;
function hash(str) { let h = 2166136261; for (const c of String(str)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; }
const order = (arr, key) => arr.map((x, k) => ({ x, h: hash(key + '|' + k) })).sort((a, b) => a.h - b.h).map((q) => q.x);

/** the word's syllables in DISPLAY case (syllable 1 takes the word's own case: de keeps its capital) */
const tokens = (word, split) => split.map((syl, i) => (i === 0 ? [...word].slice(0, [...syl].length).join('') : syl));
const isVowel = (ch, loc) => (VOWELS[loc] || 'aeiou').includes(ch.toLocaleLowerCase(loc)) || 'yàáâãäåæèéêëìíîïòóôõöøùúûüÿœ'.includes(ch.toLocaleLowerCase(loc));

/**
 * The two WRONG ways of writing a word with dashes (rewrite face): a break removed (one part fewer), and a lone
 * consonant split off (a part with no vowel). Pure: a function of the split, never of the page. Either may be absent.
 */
function wrongDashes(toks, loc, hy) {
  const out = [];
  if (toks.length >= 2) {
    const k = hash(toks.join('')) % (toks.length - 1);
    out.push(toks.slice(0, k).concat([toks[k] + toks[k + 1]], toks.slice(k + 2)).join(hy));
  }
  for (let k = 0; k < toks.length && out.length < 2; k++) {
    const t = [...toks[k]];
    // the last letter of a syllable that keeps a vowel without it
    if (t.length >= 2 && !isVowel(t[t.length - 1], loc) && t.slice(0, -1).some((c) => isVowel(c, loc))) {
      out.push(toks.slice(0, k).concat([t.slice(0, -1).join(''), t[t.length - 1]], toks.slice(k + 1)).join(hy));
      break;
    }
    // the first letter of a syllable that keeps a vowel without it
    if (t.length >= 2 && !isVowel(t[0], loc) && t.slice(1).some((c) => isVowel(c, loc))) {
      out.push(toks.slice(0, k).concat([t[0], t.slice(1).join('')], toks.slice(k + 1)).join(hy));
      break;
    }
  }
  return out;
}

/** the units of one syllable: every consonant letter alone, its maximal vowel run(s) as one unit (nl ij is a vowel) */
function units(syl, loc, extra) {
  const ch = [...syl];
  const X = (extra || []).map((x) => String(x).toLocaleLowerCase(loc));
  const out = [];
  let i = 0;
  while (i < ch.length) {
    // the vowel set of the Vowel King face itself (G1-305 kingRuns: the locale vowels + its extra digraphs), nothing wider
    let len = 1, v = (VOWELS[loc] || '').includes(ch[i].toLocaleLowerCase(loc));
    for (const x of X) { const xl = [...x].length; if (ch.slice(i, i + xl).join('').toLocaleLowerCase(loc) === x) { len = xl; v = true; break; } }
    const piece = ch.slice(i, i + len).join('');
    if (v && out.length && out[out.length - 1].v) out[out.length - 1].t += piece; else out.push({ t: piece, v });
    i += len;
  }
  return out;
}

/** screen(built, face, loc, theme, bankBlock) — built.meta carries keys + nouns on every new page */
function screen(built, face, loc, theme, b) {
  const m = built.meta;
  const words = m.words || [], keys = m.keys || [], nouns = m.nouns || [];
  if (!keys.length) throw new Error('syllable-split screen: the built page carries no vocab keys (not a new page?)');
  const split = (i) => String(m.splits[i]).split(m.face === 'rewrite' ? (b.hyphen || '-') : '-');
  const hy = b.hyphen || '-';
  let items = [];
  if (face === 'base') {
    items = words.map((w, i) => card(`data-lcs-vocab="${esc(keys[i])}" data-lcs-face="count"`,
      pic(theme, nouns[i], 150) + bigWord(w) + row([1, 2, 3, 4].map((n, j) => opt(j, String(n), n === split(i).length, 140, 100, 44)).join(''), 12, false)));
  } else if (face === 'rewrite') {
    items = words.map((w, i) => {
      const toks = tokens(w, split(i));
      const right = toks.join(hy);
      let opts = order([{ t: right, ok: true }, ...[...new Set(wrongDashes(toks, loc, hy))].filter((x) => x !== right).map((t) => ({ t }))], keys[i] + '|dash');
      // one row over the next is read as one line: rotate until no two rows read as a "free" claim (pt "bal-de" / "balde")
      for (let r = 0; r < opts.length && freeClaim.hit(opts.map((o) => o.t).join('\n')); r++) opts = opts.slice(1).concat(opts[0]);
      if (freeClaim.hit(opts.map((o) => o.t).join('\n'))) opts = [opts[0], opts[2], opts[1]].filter(Boolean);
      return card(`data-lcs-vocab="${esc(keys[i])}" data-lcs-face="dashes"`, pic(theme, nouns[i], 130) +
        `<div style="display:flex;flex-direction:column;gap:12px;align-items:center">${opts.map((o, j) => opt(j, o.t, o.ok, 600, 100, 38)).join('')}</div>`);
    });
  } else if (face === 'cloze') {
    const all = words.map((w, i) => tokens(w, split(i)));
    items = words.map((w, i) => {
      const toks = all[i], bi = m.blanks[i];
      const shown = toks.map((t, k) => (k === bi ? `<span style="display:inline-block;min-width:110px;height:58px;margin:0 4px;vertical-align:middle;border:3px dashed ${CORAL};border-radius:10px;background:#FFF"></span>` : esc(t))).join('');
      const others = [...new Set(all.flatMap((t, k) => (k === i ? [] : t)).map((x) => x.toLocaleLowerCase(loc)))]
        .filter((x) => x !== toks[bi].toLocaleLowerCase(loc) && [...x].length >= 2 && !toks.some((t) => t.toLocaleLowerCase(loc) === x));
      const wrong = order(others, keys[i] + '|miss').slice(0, 2);
      const opts = order([{ t: bi === 0 ? toks[bi] : toks[bi].toLocaleLowerCase(loc), ok: true }, ...wrong.map((t) => ({ t: bi === 0 && b.casing === 'keep' ? t.charAt(0).toLocaleUpperCase(loc) + t.slice(1) : t }))], keys[i] + '|missopt');
      return card(`data-lcs-vocab="${esc(keys[i])}" data-lcs-face="missing" data-lcs-blank="${bi}"`, pic(theme, nouns[i], 130) +
        `<div style="font-family:'Baloo 2',cursive;font-weight:700;font-size:44px;line-height:1.3;color:${INK}">${shown}</div>` +
        row(opts.map((o, j) => opt(j, o.t, o.ok, 190, 96, 38)).join(''), 12, false));
    });
  } else if (face === 'scramble') {
    items = words.map((w, i) => {
      const toks = tokens(w, split(i));
      const ord = String(m.orders[i]).split('').map(Number);
      const tw = Math.min(150, Math.floor((620 - (toks.length - 1) * 12) / toks.length));
      const tiles = row(ord.map((k) => `<span class="ws-achip" data-lcs-tile data-lcs-label="${esc(toks[k])}" style="width:${tw}px;height:96px;box-sizing:border-box;font-size:36px">${esc(toks[k])}</span>`).join(''), 12, false);
      const slots = row(toks.map(() => `<span data-lcs-slot style="display:inline-block;width:${tw}px;height:80px;box-sizing:border-box;border:3px dashed ${CORAL};border-radius:12px;background:#FFF"></span>`).join(''), 12, false);
      return card(`data-lcs-answer="${esc(toks.join(''))}" data-lcs-vocab="${esc(keys[i])}" data-lcs-face="spell"`, pic(theme, nouns[i], 130) + slots + tiles);
    });
  } else if (face === 'sort') {
    const labels = b.sortLabels || {};
    items = words.map((w, i) => card(`data-lcs-vocab="${esc(keys[i])}" data-lcs-face="sort"`,
      pic(theme, nouns[i], 120) + bigWord(w, 40) + row([2, 3].map((n, j) => opt(j, String(labels[n] != null ? labels[n] : n), n === m.counts[i], 290, 96, 30)).join(''), 14, false)));
  } else if (face === 'kings') {
    const extra = b.vowelExtra || [];
    words.forEach((w, i) => {
      const toks = tokens(w, split(i));
      toks.forEach((syl, k) => {
        const u = units(syl, loc, extra);
        if (u.length < 2) return;   // a lone-vowel syllable: one tile, nothing to choose
        // a long syllable (de "Schnitt": 7 units) wraps to two rows, so every unit stays >= 94 px (44 on a 360 px phone)
        const perRow = u.length > 6 ? Math.ceil(u.length / 2) : u.length;
        const uw = Math.min(110, Math.floor((630 - (perRow - 1) * 8) / perRow));
        const shown = toks.map((t, q) => (q === k ? `<span style="color:${CORAL};border-bottom:5px solid ${CORAL}">${esc(t)}</span>` : `<span style="color:#9AA3AF">${esc(t)}</span>`)).join('<span style="color:#C9CED4">·</span>');
        items.push(card(`data-lcs-vocab="${esc(keys[i])}" data-lcs-face="kings" data-lcs-syl="${k}"`, pic(theme, nouns[i], 90) +
          `<div style="font-family:'Baloo 2',cursive;font-weight:700;font-size:42px;line-height:1.2">${shown}</div>` +
          row(u.map((x, j) => opt(j, x.t, x.v, uw, 96, 40)).join(''), 8, perRow < u.length)));
      });
    });
  } else {
    throw new Error('syllable-split screen: no screen for face ' + face);
  }
  return { bodyHtml: `<div data-ws-content data-lcs-type="syllable-split" data-lcs-screen="${esc(face)}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`, meta: built.meta };
}

/* ------------------------------------------------------------------ the oracle */
function gated(key, loc) {
  const a = approvedByKey(loc).get(key);
  if (!a || !Array.isArray(a.split)) throw new Error(`syllable-split oracle: ${key}/${loc} is not an approved word`);
  return a;
}
function oracle(kind, items, l) {
  const loc = (l || 'en').slice(0, 2);
  const b = bank('syllable-split', loc);
  return items.map((it) => {
    const m = it.meta || {};
    const a = gated(m['data-lcs-vocab'], loc);
    const split = a.split.map((s) => s.toLocaleLowerCase(loc));
    const pick = (pred) => { const hit = it.options.map((o, i) => (pred(String(o).toLocaleLowerCase(loc)) ? i : -1)).filter((i) => i >= 0); if (hit.length !== 1) throw new Error(`syllable-split oracle: ${hit.length} right options (${kind}, ${m['data-lcs-vocab']})`); return hit[0]; };
    if (kind === 'count') return pick((o) => Number(o) === a.count);
    if (kind === 'dashes') return pick((o) => o === split.join(b.hyphen || '-'));
    if (kind === 'missing') return pick((o) => o === split[Number(m['data-lcs-blank'])]);
    if (kind === 'sort') { const labels = b.sortLabels || {}; return pick((o) => o === String(labels[a.count] != null ? labels[a.count] : a.count).toLocaleLowerCase(loc)); }
    if (kind === 'kings') {
      const syl = split[Number(m['data-lcs-syl'])];
      const v = units(syl, loc, b.vowelExtra || []).filter((x) => x.v);
      if (v.length !== 1) throw new Error(`syllable-split oracle: "${syl}" has ${v.length} vowel runs`);
      return pick((o) => o === v[0].t.toLocaleLowerCase(loc));
    }
    // spell: the word's syllables in order, as the tiles are labelled (display case)
    return [...split];
  });
}

const INSTR = { base: 'count', rewrite: 'dashes', cloze: 'missing', scramble: 'spell', sort: 'sort', kings: 'kings' };
function interactiveFor(face) {
  const key = INSTR[face] || face;
  if (key === 'spell') {
    return {
      kind: 'tap-spell', item: '[data-lcs-item]', tile: '[data-lcs-tile]', slot: '[data-lcs-slot]',
      answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-vocab', metaAttrs: ['data-lcs-vocab', 'data-lcs-face'],
      instructionKey: 'spell', screenHeight: 6400,
      oracle: (items, l) => oracle('spell', items, l),
    };
  }
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]',
    metaAttrs: ['data-lcs-vocab', 'data-lcs-face', 'data-lcs-blank', 'data-lcs-syl'], instructionKey: key,
    // Vowel King: one item per SYLLABLE (up to 8 words x 3 at level 3) needs the taller screen
    screenHeight: key === 'kings' ? 9600 : 6400,
    oracle: (items, l) => oracle(key, items, l),
  };
}

module.exports = { screen, oracle, interactiveFor, wrongDashes, units };
