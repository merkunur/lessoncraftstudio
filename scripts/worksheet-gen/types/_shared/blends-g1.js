/**
 * blends-g1.js — four Grade 1 phonics pages on digraphs and consonant blends (English literacy year, Daily Teaching
 * System Part 12.3, 2026-11-16; the unit "Digraphs and Blends" of Grade 1). The words are data/literacy/blends-g1.en.json.
 * The pages are led by PRINTED WORDS (a first grader reads and writes them); a picture stands only where the library has
 * one that a child names with that word. Every word is one syllable with one short vowel (the unit comes before long vowels).
 *
 *   digraphs  Digraphs: sh, ch, and th (RF.1.3.a)                 G1-588
 *   teams     Digraphs: ck, ng, and wh (RF.1.3.a)                 G1-589
 *   start     Blends at the start: s-, l-, r-blends (RF.1.3.b)    G1-590
 *   end       Blends at the end: nd, mp, st, nk (RF.1.3.b)        G1-591
 *
 * The same three levels in every mode (levels 1 and 2 of the digraph modes use no word that starts with a blend):
 *   level 1  ONE spelling a copy (digraphs: sh, ch or th; teams: ck or ng; start: s-blends; end: nd):
 *            1. a worked row in grey and five new words to make from an old word (sip -> __ip: write sh; start: top -> _top,
 *               add s); 2. a worked word in grey and five words with a gap for the spelling (start: two blends, a worked
 *            word and two words each); 3. three sentences with the two words of such a pair to choose from (the right word
 *            is sometimes the one WITHOUT the spelling: "Take a sip of your milk.")
 *   level 2  TWO spellings (digraphs: sh and ch; teams: ck and ng; start: s- and l-blends; end: nd and mp):
 *            six printed words and four pictures (two words differ from a pictured word only in the spelling and have no
 *            picture), then six printed words to sort into two columns (three each) on 89 px rows
 *   level 3  ALL spellings: three pictures to write the word for, six words to sort into three columns (end: four words, one
 *            under each ending, in two blocks of two columns), and three sentences with one word printed with a gap where its
 *            spelling stands; each sentence draws its spelling by itself (two spellings or more on a page); a letter box shows
 *            the spellings (start: none, the sentence tells the blend)
 *
 * Handwriting rows are 89 px high. Gaps are 96 px for two letters, 60 px for one. Ligatures are off on the whole page (fi,
 * ff). English only. Themeless: a copy draws other words. PDF only (the answer key is for checks and review: sort answers
 * are marked "any order"). The bank is checked when this file loads (blendFaultsOf); no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/blends-g1.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, line } = _parts;

const PICS = BANK.pics || {};
const MODES = BANK.modes || {};
const ROW = 89;                                      // every handwriting row (half an inch from the top rule to the baseline)
const GAP2 = 96, GAP1 = 60;                          // the width of a gap for two letters and for one
/** where a digraph of the 'any' modes may stand (ck and ng end a word, wh starts it; sh, ch, th stand at either end) */
const PLACE_OF = { ck: 'end', ng: 'end', wh: 'start' };
const DIGRAPHS = ['sh', 'ch', 'th', 'wh'];
/** what a child might write into a gap on a page that shows no letters to choose from (start mode) */
const EXTRA_START = ['sh', 'ch', 'th', 'wh', 'sl', 'tw', 'dw'];
/** spellings that make a word too hard for this unit: an r after the vowel, a silent letter, a long or odd vowel */
const NOT_SHORT = [/[aeiou]r/, /(^|[^s])wa|qu/, /all$/, /ind$/, /ild$/, /old$/, /olt$/, /^(most|host|post|ghost)$/, /tch/, /mb$/, /^(kn|wr)/, /gh/, /e$/, /y/, /chr|chef|sch/, /^from$/];
const oneShort = (w) => typeof w === 'string' && /^[a-z]{2,7}$/.test(w) && (w.match(/[aeiou]/g) || []).length === 1 && !NOT_SHORT.some((r) => r.test(w));
/** a word that starts with two consonant sounds (a blend), not with a digraph */
const startsWithBlend = (w) => /^[^aeiou][^aeiou]/.test(w) && !DIGRAPHS.includes(w.slice(0, 2));
const stemOf = (w) => w.replace(/s$/, '');

const blendsOf = (M) => Object.values(M.families || {}).flat();
/** the spelling (start: the family) a word of a mode holds, or null when it holds none or more than one */
function spellingOf(M, w) {
  if (M.place === 'start') {
    const fam = Object.keys(M.families).find((f) => M.families[f].includes(w.slice(0, 2)));
    if (!fam || !/[aeiou]/.test(w[2] || '')) return null;
    if (blendsOf(M).some((b) => w.indexOf(b, 1) >= 1)) return null;
    return fam;
  }
  const has = M.spellings.filter((s) => w.includes(s));
  if (has.length !== 1) return null;
  const s = has[0], at = w.indexOf(s);
  if (w.indexOf(s, at + 1) >= 0) return null;
  const place = M.place === 'end' ? 'end' : PLACE_OF[s];
  if (place === 'end' && at !== w.length - 2) return null;
  if (place === 'start' && at !== 0) return null;
  return s;
}
/** the spelling of a PICTURED word (it is matched or written, never sorted): a plural s is let through, and a blend at
 *  the end may follow a blend at the start (stamp: st and mp; it is shown for mp) */
function picSpellingOf(M, w) {
  if (M.place === 'end') return M.spellings.includes(w.slice(-2)) ? w.slice(-2) : null;
  return spellingOf(M, w) || spellingOf(M, stemOf(w));
}
/** where the gap of a word stands and which letters fill it */
function gapOf(M, w, sp) {
  if (M.place === 'start') return { at: 0, g: w.slice(0, 2) };
  if (M.place === 'end') return { at: w.length - 2, g: w.slice(-2) };
  return { at: w.indexOf(sp), g: sp };
}
/** the place of the spelling in a pictured word, for its decoys */
const spellAt = (M, w, sp) => (M.place === 'start' ? { at: 0, g: w.slice(0, 2) } : M.place === 'end' ? { at: w.length - 2, g: w.slice(-2) } : { at: w.indexOf(sp), g: sp });
/** a decoy: the pictured word with its spelling written as zero to two other letters */
function isDecoyOf(M, sp, decoy, w) {
  const { at, g } = spellAt(M, w, sp);
  if (at < 0) return false;
  const head = w.slice(0, at), tail = w.slice(at + g.length);
  if (!decoy.startsWith(head) || !decoy.endsWith(tail) || decoy.length < head.length + tail.length) return false;
  const x = decoy.slice(head.length, decoy.length - tail.length);
  return x.length <= 2 && x !== g && /^[a-z]*$/.test(x);
}
/** an old word of a new word: the spelling written as one other letter (start mode: the word without its first s) */
function isOldOf(M, sp, oldW, newW) {
  if (M.place === 'start') return newW[0] === 's' && newW.slice(1) === oldW;
  const at = newW.indexOf(sp);
  return at >= 0 && oldW.length === newW.length - 1 && oldW.slice(0, at) === newW.slice(0, at) && oldW.slice(at + 1) === newW.slice(at + 2) && oldW[at] !== undefined;
}
const offeredFor = (M) => (M.place === 'start' ? [...blendsOf(M), ...EXTRA_START] : M.spellings.slice());
/** the letters printed beside a gap */
const fragmentsOf = (w, at, g) => [w.slice(0, at), w.slice(at + g.length)].filter(Boolean);

/** What must be true of the word bank before any page prints it. Returns the list of faults (empty = sound). */
function blendFaultsOf(b) {
  const f = [];
  for (const [w, p] of Object.entries(b.pics || {})) if (!Array.isArray(p) || p.length !== 2 || !p.every((x) => typeof x === 'string' && x) || /bw( ?\d+)?$/i.test(p[0])) f.push('picture of ' + w + ': not a colour theme and a noun');
  if (!Array.isArray(b.bad) || b.bad.length < 10) f.push('no list of words a gap may never make');
  if (!Array.isArray(b.badFragments) || !b.badFragments.includes('ag') || !b.badFragments.includes('ass')) f.push('no list of letters that may never stand beside a gap');
  if (!Array.isArray(b.printOnly) || b.printOnly.length < 5) f.push('no list of pictures that are shown only with their printed word');
  const banned = new Set([...(b.bad || []), ...(b.badFragments || [])]);
  const known = new Set();
  for (const M of Object.values(b.modes || {})) {
    Object.values(M.words || {}).flat().forEach((w) => known.add(w));
    Object.values(M.newWords || {}).flat(2).forEach((w) => known.add(w));
    Object.values(M.choose || {}).flat().forEach((c) => { known.add(c.right); known.add(c.wrong); });
    (M.knownWords || []).forEach((w) => known.add(w));
  }
  for (const [id, M] of Object.entries(b.modes || {})) {
    const SP = M.spellings || [];
    if (!SP.length || !M.levels) { f.push(id + ': no spellings or levels'); continue; }
    for (const lv of [1, 2, 3]) {
      const sets = M.levels[lv] || [];
      if (!sets.length || sets.some((s) => !s.length || s.some((x) => !SP.includes(x)) || s.length !== { 1: 1, 2: 2, 3: SP.length }[lv])) f.push(`${id}: level ${lv} does not draw ${lv === 1 ? 'one spelling' : lv === 2 ? 'two spellings' : 'all spellings'}`);
    }
    if (M.place === 'start' && (!M.families || Object.keys(M.families).join() !== SP.join() || !M.familyName)) f.push(id + ': the families of blends do not match the spellings');
    const plain = (lv) => (M.noStartBlend || []).includes(lv);   // this level uses no word that starts with a blend
    const all = [];
    for (const sp of SP) {
      const ws = (M.words || {})[sp] || [];
      all.push(...ws);
      ws.forEach((w) => { if (!oneShort(w)) f.push(`${id}: "${w}" is not one syllable with one short vowel`); else if (spellingOf(M, w) !== sp) f.push(`${id}: "${w}" does not hold ${sp} once, in its place, and no other spelling of the page`); });
    }
    if (new Set(all).size !== all.length) f.push(id + ': a word stands twice');
    // the letters printed beside a gap: never a banned word (every word that can stand with a gap)
    const gappable = [];
    for (const sp of new Set((M.levels[1] || []).flat())) (M.words[sp] || []).forEach((w) => gappable.push([w, sp]));
    for (const [sp, prs] of Object.entries(M.newWords || {})) prs.forEach((p) => gappable.push([p[1], sp]));
    for (const [sp, fl] of Object.entries(M.fill || {})) fl.forEach((s) => gappable.push([s.word, sp]));
    for (const [w, sp] of gappable) { const { at, g } = gapOf(M, w, sp); const bad = fragmentsOf(w, at, g).filter((x) => banned.has(x)); if (bad.length) f.push(`${id}: the gap of "${w}" leaves ${bad.join(', ')} printed`); }
    const l1 = new Set((M.levels[1] || []).flat()), used3 = new Set((M.levels[3] || []).flat());
    for (const sp of SP) {
      const ws = M.words[sp] || [];
      if (l1.has(sp)) {
        const ws1 = ws.filter((w) => !plain(1) || !startsWithBlend(w));
        const nw = (M.newWords || {})[sp] || [];
        if (nw.length < 6) f.push(`${id} ${sp}: fewer than six new words to make (a worked row and five)`);
        nw.forEach(([o, n]) => { if (!ws1.includes(n) || !oneShort(o) || spellingOf(M, o) === sp || !isOldOf(M, sp, o, n)) f.push(`${id} ${sp}: "${o}" -> "${n}" is no old word and a new word with ${sp} (level 1 words start with no blend)`); });
        if (new Set(nw.map((p) => p[1])).size !== nw.length) f.push(`${id} ${sp}: a new word stands twice`);
        if (M.place === 'start') { const bl = M.families[sp].filter((x) => ws.filter((w) => w.startsWith(x) && !nw.some((p) => p[1] === w)).length >= 3); if (bl.length < 2) f.push(`${id} ${sp}: fewer than two blends with a worked word and two words to write`); }
        else if (ws1.length < 11) f.push(`${id} ${sp}: fewer than eleven words for level 1 (six new words and five to finish)`);
        const cs = (M.choose || {})[sp] || [];
        if (cs.length < 5) f.push(`${id} ${sp}: fewer than five sentences to choose in`);
        cs.forEach((c) => {
          const tgt = [c.right, c.wrong].find((w) => ws1.includes(w)), pl = tgt === c.right ? c.wrong : c.right;
          if (typeof c.text !== 'string' || c.text.split('___').length !== 2 || c.text.length > 44 || !/[.!?]$/.test(c.text) || c.right === c.wrong || !tgt || !isOldOf(M, sp, pl, tgt) || !nw.some((p) => p[0] === pl && p[1] === tgt)) f.push(`${id} ${sp}: the sentence "${c.text}" has not one blank and the two words of a pair of the new-word card`);
        });
        const tgtRight = cs.filter((c) => ws1.includes(c.right)).length;
        if (tgtRight < 2 || cs.length - tgtRight < 2) f.push(`${id} ${sp}: the right words of the sentences are not both kinds (with ${sp} and without)`);
      }
      if (used3.has(sp)) {
        if (ws.length < 4) f.push(`${id} ${sp}: fewer than four words to sort`);
        const fl = (M.fill || {})[sp] || [];
        if (fl.length < 3) f.push(`${id} ${sp}: fewer than three sentences to finish`);
        const off = offeredFor(M);
        fl.forEach((s) => {
          if (typeof s.text !== 'string' || s.text.split('___').length !== 2 || s.text.length > 44 || !/[.!?]$/.test(s.text) || !ws.includes(s.word)) { f.push(`${id} ${sp}: the sentence "${s.text}" has not one blank or its word "${s.word}" is no ${sp} word`); return; }
          const { at, g } = gapOf(M, s.word, sp);
          const made = off.filter((x) => x !== g).map((x) => s.word.slice(0, at) + x + s.word.slice(at + g.length));
          const undeclared = made.filter((w) => known.has(w) && !(s.rivals || []).includes(w));
          if (undeclared.length) f.push(`${id}: "${s.text}" (${s.word}): the gap also makes ${undeclared.join(', ')}, and the bank does not say it was checked`);
          const bad = made.filter((w) => b.bad.includes(w));
          if (bad.length) f.push(`${id}: "${s.text}" (${s.word}): the gap can make ${bad.join(', ')}`);
        });
        if (new Set(fl.map((s) => s.word)).size !== fl.length) f.push(`${id} ${sp}: two sentences to finish have one word`);
      }
    }
    // level 2: the pictured words to match, each with printed decoys
    const lv2 = M.levels[2][0];
    const mw = Object.entries(M.match || {}).flatMap(([sp, ws]) => ws.map((w) => ({ w, sp })));
    mw.forEach(({ w, sp }) => {
      if (!(b.pics || {})[w] || !SP.includes(sp) || picSpellingOf(M, w) !== sp || !oneShort(stemOf(w)) || (plain(2) && startsWithBlend(w))) f.push(`${id}: the pictured word "${w}" has no picture, does not hold ${sp}, or starts with a blend on a page that has none`);
      const ds = (M.decoys || {})[w] || [];
      ds.forEach((d) => { if (!oneShort(stemOf(d)) || !known.has(d) || !isDecoyOf(M, sp, d, w) || mw.some((x) => stemOf(x.w) === stemOf(d)) || (plain(2) && startsWithBlend(d))) f.push(`${id}: "${d}" is no real word that differs from "${w}" only in ${sp} and names no picture of the page`); });
    });
    if (lv2.some((sp) => !(M.match || {})[sp]) || mw.filter((x) => lv2.includes(x.sp)).length < 4) f.push(`${id}: level 2 (${lv2.join(', ')}) has fewer than four pictured words to match`);
    if (mw.filter((x) => lv2.includes(x.sp) && ((M.decoys || {})[x.w] || []).length).length < 3) f.push(`${id}: fewer than three pictured words of level 2 have a printed word without a picture`);
    // level 3: the pictures to write: one name each, never a print-only picture
    const wr = M.write || [];
    wr.forEach((w) => { if (!(b.pics || {})[w] || (b.printOnly || []).includes(w) || !picSpellingOf(M, w)) f.push(`${id}: "${w}" to write has no picture, is a print-only picture, or holds no spelling`); });
    if (wr.length < 3) f.push(id + ': fewer than three pictures to write');
  }
  return f;
}
{ const f = blendFaultsOf(BANK); if (f.length) throw new Error('blends-g1.en.json: ' + f.join('; ')); }

const LEVELS = {
  1: { card: 5, cfont: 34, crow: 26, gaps: 5, startGaps: 2, gfont: 42, grow: 20, sents: 3, sfont: 26, pill: 26, spad: 8, pad: 14 },
  2: { match: 4, decoys: 2, mfont: 28, mrowW: 40, mgap: 6, mpic: 60, sort: 3, rowH: ROW, pad: 8 },
  3: { write: 3, wpic: 64, sort: { 3: 2, 4: 1 }, rowH: ROW, fill: 3, ffont: 24, fpad: 3, pad: 8 },
};
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks

/** In this font an f before i, f, or l touches the next letter even with ligatures off (the i of "fish" loses its dot):
 *  every printed f before i, f, or l gets a little room of its own. Text inside tags, <svg> and <style> is left alone. */
function fRoom(html) {
  let out = '', i = 0, inSvg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) inSvg++; else if (/^<\/svg>/i.test(tag)) inSvg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += inSvg ? text : text.replace(/f(?=[ifl])/g, '<span data-lcs-fsep style="margin-right:0.07em">f</span>');
    i = j < 0 ? html.length : j;
  }
  return out;
}
const img = (w, size) => `<img class="ws-icon" data-lcs-pic="${esc(w)}" src="${fileUri(PICS[w][0], PICS[w][1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const cream = (attrs, inner, pad = 8, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:6px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 20) => `<div data-lcs-label data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
const orList = (xs) => xs.length === 2 ? `${teal(xs[0])} or ${teal(xs[1])}` : xs.slice(0, -1).map(teal).join(', ') + `, or ${teal(xs[xs.length - 1])}`;
/** a word to circle (the key rings the right one) */
const pill = (text, ok, key, font, kind) => `<span data-lcs-pill${ok ? ' data-lcs-ok="1"' : ''} data-lcs-kind="${kind}" style="flex:0 0 auto;font:800 ${font}px/1.15 'Nunito',sans-serif;color:${T.ink};padding:2px 12px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
/** a place to write letters into a printed word: 96 px for two letters, 60 px for one; the key prints them in teal, a
 *  worked example prints them in grey on every page */
const gapBox = (g, key, font, example, tight) => `<span data-lcs-gap="${g}"${example ? ' data-lcs-example-gap="1"' : ''} style="display:inline-block;width:${g.length === 1 ? GAP1 : GAP2}px;height:${Math.round(font * 1.15)}px;margin:0 ${tight ? 0 : 3}px 0 3px;border-bottom:3.5px solid ${example ? T.inkSoft : T.ink};text-align:center;color:${example ? T.inkSoft : T.teal};font:800 ${font}px/1.1 'Nunito',sans-serif">${key || example ? g : ''}</span>`;
const gapWord = (word, at, g, key, font, tail = '', example = false) => {
  const core = `<span data-lcs-gapword="${word}"${example ? ' data-lcs-example="1"' : ''} style="display:inline-flex;align-items:flex-end;font:800 ${font}px/1.1 'Nunito',sans-serif;color:${example ? T.inkSoft : T.ink}">${esc(word.slice(0, at))}${gapBox(g, key, font, example, !!tail && at + g.length === word.length)}${esc(word.slice(at + g.length))}</span>`;
  return tail ? `<span style="display:inline-flex;align-items:flex-end">${core}<span data-lcs-tail>${esc(tail)}</span></span>` : core;
};
const chip = (text, attr, font = 22) => `<span ${attr} style="font:800 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 14px;border-radius:999px;background:#FFFFFF;border:2px solid ${T.teal}">${esc(text)}</span>`;
/** a sort column head: a filled teal bar with white letters */
const headBar = (text) => `<div data-lcs-colhead style="background:${T.teal};color:#FFFFFF;border-radius:8px;text-align:center;font:800 22px/1.35 'Nunito',sans-serif;padding:1px 0">${esc(text)}</div>`;
/** a sentence split at its blank; punctuation right after the blank stays with the word (no space before a period) */
const splitAt = (text) => { const [a, b] = text.split('___'); const m = b.match(/^[.!?,]+/); return { a: a.trim(), tail: m ? m[0] : '', b: (m ? b.slice(m[0].length) : b).trim() }; };
/** n places for a two-way choice: both used, never one place for every row */
function twoWay(n, rng) { for (let k = 0; k < 100; k++) { const p = Array.from({ length: n }, () => rng.int(0, 1)); if (n < 2 || new Set(p).size === 2) return p; } return Array.from({ length: n }, (_, i) => i % 2); }
/** an order of a list of spelling-tagged items with no three of one spelling in a row */
function mixed(items, rng) { let o = items; for (let k = 0; k < 200; k++) { o = shuffle(items, rng); if (!o.some((x, i) => i >= 2 && x.sp === o[i - 1].sp && x.sp === o[i - 2].sp)) break; } return o; }
/** a staircase: three or more places in a row that step by one the same way */
const staircase = (idx) => idx.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1));

function makeBlendType({ id, slug, mode, i18n }) {
  const M = MODES[mode];
  if (!M) throw new Error('blends-g1: unknown mode ' + mode);
  const head = (sp) => (M.place === 'start' ? M.familyName[sp] : sp);
  return {
    id, slug, gradeBand: 'G1', assetClass: 'none', exerciseType: 'digraphs',
    themeAxis: { applicable: false },
    difficulty: LEVELS,
    i18n,
    // THE ITEM BANK of the unit checks (Part 7.6): G1-589 only (blendCheckPage below)
    ...(BLEND_CHECK_MODES.has(mode) ? { checkPage(args, ctx) { return blendCheckPage(M, args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = LEVELS[lv] || LEVELS[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const inner = W - 24;
      const sps = M.levels[lv][rng.int(0, M.levels[lv].length - 1)];
      const plainLv = (M.noStartBlend || []).includes(lv);
      const ok = (w) => !plainLv || !startsWithBlend(w);       // no word starting with a blend on this level
      const blocks = [], items = [], shown = new Set();       // shown: every word printed whole or with a gap on the page
      const seen = (w) => shown.has(w) || shown.has(stemOf(w)) || [...shown].some((x) => stemOf(x) === w);
      const take = (list, n, more = () => true) => { const got = shuffle(list.filter((w) => ok(w) && !seen(w) && more(w)), rng).slice(0, n); got.forEach((w) => shown.add(w)); return got; };

      if (lv === 1) {
        const sp = sps[0], ws = M.words[sp].filter(ok);
        // three sentences (the right word with the spelling and without it, both); their pairs stand on the new-word card,
        // the first as the worked row
        let sents;
        for (let k = 0; k < 300; k++) { sents = shuffle(M.choose[sp], rng).slice(0, d.sents); const tr = sents.filter((c) => ws.includes(c.right)).length; if (tr >= 1 && tr < d.sents && new Set(sents.flatMap((c) => [c.right, c.wrong])).size === d.sents * 2) break; }
        const pairOf = (c) => M.newWords[sp].find((p) => p.includes(c.right) && p.includes(c.wrong));
        const fromSents = sents.map(pairOf);
        const others = shuffle(M.newWords[sp].filter((p) => !fromSents.includes(p) && !fromSents.some((q) => q[1] === p[1])), rng).slice(0, d.card + 1 - fromSents.length);
        const example = fromSents[0];
        const card = shuffle([...fromSents.slice(1), ...others], rng);
        [example, ...card].forEach((p) => { shown.add(p[0]); shown.add(p[1]); });
        sents.forEach((c) => { shown.add(c.right); shown.add(c.wrong); });
        const newGap = (n) => (M.place === 'start' ? { at: 0, g: 's' } : gapOf(M, n, sp));
        const pairRow = ([o, n], ex) => { const { at, g } = newGap(n);
          return `<div data-lcs-newpair="${o}|${n}"${ex ? ' data-lcs-example="1"' : ''} style="display:flex;align-items:flex-end;gap:10px;font:800 ${d.cfont}px/1.1 'Nunito',sans-serif;color:${ex ? T.inkSoft : T.ink}"><span data-lcs-read style="flex:0 0 ${Math.round(d.cfont * 2.2)}px">${esc(o)}</span><span style="color:${ex ? T.inkSoft : T.teal}">&#8594;</span>${gapWord(n, at, g, key, d.cfont, '', ex)}</div>`; };
        blocks.push(cream(`data-lcs-newcard="${sp}"`, label(`${num(1)}${M.place === 'start' ? `Add ${teal('s')} to the start of each word.` : `Write ${teal(sp)} to make a new word.`} Read your new words to a partner.`) +
          `<div style="display:grid;grid-template-columns:1fr 1fr;gap:${d.crow}px 20px;padding:6px 6px">` + [pairRow(example, true), ...card.map((p) => pairRow(p, false))].join('') + `</div>`, d.pad));
        // the gaps: a worked word in grey and five words of the spelling (start: two blends of the family, a worked word and two words each)
        const groups = [];
        if (M.place === 'start') {
          const bl = shuffle(M.families[sp].filter((x) => ws.filter((w) => w.startsWith(x) && !seen(w)).length >= 3), rng).slice(0, 2);
          bl.forEach((x) => { const three = take(ws, d.startGaps + 1, (w) => w.startsWith(x)); groups.push({ g: x, example: three[0], words: three.slice(1) }); });
        } else groups.push({ g: sp, example: example[1], words: take(ws, d.gaps) });
        groups.forEach((gr, k) => {
          const cell = (w, ex) => { const { at, g } = M.place === 'start' ? { at: 0, g: gr.g } : gapOf(M, w, sp); return gapWord(w, at, g, key, d.gfont, '', ex); };
          blocks.push(cream(`data-lcs-gaps="${gr.g}"`, label(`${num(2 + k)}Write ${teal(gr.g)} in each word. Read your new words to a partner.`) +
            `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:${d.grow}px 10px;justify-items:center;padding:6px 0 4px">${[cell(gr.example, true), ...gr.words.map((w) => cell(w, false))].join('')}</div>`, d.pad));
          items.push(...gr.words);
        });
        // the sentences
        const at = twoWay(sents.length, rng);
        blocks.push(cream('data-lcs-choose="1"', label(`${num(2 + groups.length)}Read the sentence. Circle the word that fits.`) + sents.map((c, i) => {
          const tgt = ws.includes(c.right) ? c.right : c.wrong, pl = tgt === c.right ? c.wrong : c.right;
          const two = [[c.right, true], [c.wrong, false]]; if (at[i]) two.reverse();
          const { a, tail, b: b2 } = splitAt(c.text);
          return `<div data-lcs-sentence="${c.right}" data-lcs-pair="${tgt}|${pl}" data-lcs-read style="display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;font:700 ${d.sfont}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:${d.spad}px 0 ${d.spad}px 18px">${a ? `<span>${esc(a)}</span>` : ''}<span style="display:inline-flex;align-items:center"><span style="display:inline-flex;align-items:center;gap:4px">${two.map(([w, okk]) => pill(w, okk, key, d.pill, w === tgt ? 'team' : 'plain')).join('')}</span>${tail ? `<span data-lcs-tail>${esc(tail)}</span>` : ''}</span>${b2 ? `<span>${esc(b2)}</span>` : ''}</div>`;
        }).join(''), d.pad));
        items.push(...card.map((p) => 'new:' + p[1]), ...sents.map((c) => 'sent:' + c.right));
      }

      if (lv === 2) {
        // four pictured words (every spelling of the pair that has pictures; first letters in pairs where the bank allows)
        const pool = sps.flatMap((sp) => (M.match[sp] || []).filter(ok).map((w) => ({ w, sp })));
        let best = null, bestScore = -1;
        for (let k = 0; k < 300; k++) {
          const c = shuffle(pool, rng).slice(0, d.match);
          if (!sps.every((sp) => !(M.match[sp] || []).filter(ok).length || c.some((x) => x.sp === sp))) continue;
          const score = c.filter((x) => c.some((y) => y !== x && y.w[0] === x.w[0])).length;
          if (score > bestScore) { best = c; bestScore = score; }
        }
        const pics4 = best;
        pics4.forEach((x) => shown.add(x.w));
        // two printed words without a picture, each from another pictured word: it differs only in the spelling
        let dec;
        for (let k = 0; k < 300; k++) {
          const ps = shuffle(pics4.filter((x) => (M.decoys[x.w] || []).length), rng).slice(0, d.decoys);
          dec = ps.map((x) => ({ w: shuffle((M.decoys[x.w] || []).filter((y) => ok(y) && !seen(y)), rng)[0], of: x.w, sp: x.sp }));
          if (dec.every((x) => x.w) && new Set(dec.map((x) => stemOf(x.w))).size === dec.length) break;
        }
        dec.forEach((x) => shown.add(x.w));
        // six rows of words, four rows of pictures; no word straight across from its picture, not all one distance away
        const Hw = d.mrowW, G = d.mgap, n6 = d.match + d.decoys, Hp = Math.floor((n6 * Hw + (n6 - 1) * G - (d.match - 1) * G) / d.match);
        const yw = (i) => i * (Hw + G) + Hw / 2, yp = (j) => j * (Hp + G) + Hp / 2;
        let rows, perm;
        for (let k = 0; k < 500; k++) {
          rows = shuffle([...pics4.map((x) => ({ ...x, pic: true })), ...dec.map((x) => ({ ...x, pic: false }))], rng);
          const di = rows.map((r, i) => (r.pic ? -1 : i)).filter((i) => i >= 0);
          if (Math.abs(di[0] - di[1]) === 1) continue;
          perm = shuffle([0, 1, 2, 3], rng);   // picture row j shows pics4[perm[j]]
          const off = pics4.map((x, s) => { const i = rows.findIndex((r) => r.w === x.w), j = perm.indexOf(s); return yp(j) - yw(i); });
          if (off.every((o) => Math.abs(o) >= 18) && new Set(off.map((o) => Math.round(o / 10))).size > 1) break;
        }
        const LW = 200, GW = 170, RW = 130, Htot = n6 * Hw + (n6 - 1) * G;
        const lines = key ? pics4.map((x, s) => { const i = rows.findIndex((r) => r.w === x.w), j = perm.indexOf(s); return `<line data-lcs-keyline="${i}-${j}" x1="7" y1="${yw(i)}" x2="${GW - 7}" y2="${yp(j)}" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>`; }).join('') : '';
        const dots = rows.map((_, i) => `<circle cx="7" cy="${yw(i)}" r="7" fill="${T.ink}"/>`).join('') + perm.map((_, j) => `<circle cx="${GW - 7}" cy="${yp(j)}" r="7" fill="${T.ink}"/>`).join('');
        blocks.push(cream('data-lcs-matchcard="1"', label(`${num(1)}Read each word. Draw a line to its picture. Two words have no picture.`) +
          `<div data-lcs-match="${n6}" style="display:grid;grid-template-columns:${LW}px ${GW}px ${RW}px;justify-content:center;align-items:start">` +
          `<div style="display:flex;flex-direction:column;gap:${G}px">${rows.map((r, i) => `<div data-lcs-mword="${i}" data-lcs-sp="${r.sp}"${r.pic ? '' : ` data-lcs-decoy="${r.of}"`} data-lcs-read style="height:${Hw}px;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end;padding-right:16px;font:800 ${d.mfont}px/1 'Nunito',sans-serif;color:${T.ink}">${r.w}</div>`).join('')}</div>` +
          `<svg data-lcs-gutter width="${GW}" height="${Htot}" viewBox="0 0 ${GW} ${Htot}" style="display:block">${lines}${dots}</svg>` +
          `<div style="display:flex;flex-direction:column;gap:${G}px">${perm.map((s) => `<div data-lcs-mpic="${pics4[s].w}" style="height:${Hp}px;box-sizing:border-box;display:flex;align-items:center;padding-left:16px">${img(pics4[s].w, d.mpic)}</div>`).join('')}</div></div>`, d.pad));
        items.push(...pics4.map((x) => 'pic:' + x.w), ...dec.map((x) => 'no-pic:' + x.w));
        blocks.push(sortBlock(2, [sps.map((sp) => ({ sp, n: d.sort }))], d.rowH));
      }

      if (lv === 3) {
        // three pictures to write the word for (one name each): as many spellings as the pictures allow
        const pool = (M.write || []).map((w) => ({ w, sp: picSpellingOf(M, w) }));
        const need = Math.min(d.write, new Set(pool.map((x) => x.sp)).size);
        let wr;
        for (let k = 0; k < 300; k++) { wr = shuffle(pool, rng).slice(0, d.write); if (new Set(wr.map((x) => x.sp)).size >= need) break; }
        wr.forEach((x) => shown.add(x.w));
        // the sentences to finish: each draws its spelling by itself; two spellings or more; no staircase
        const nF = d.fill;
        let fills;
        for (let k = 0; k < 400; k++) {
          const spsK = Array.from({ length: nF }, () => sps[rng.int(0, sps.length - 1)]);
          if (new Set(spsK).size < 2 || staircase(spsK.map((s) => sps.indexOf(s)))) continue;
          const used = new Set();
          fills = spsK.map((sp) => { const s = shuffle(M.fill[sp].filter((x) => !seen(x.word) && !used.has(x.word)), rng)[0]; if (s) used.add(s.word); return { sp, s }; });
          if (fills.every((x) => x.s)) break;
        }
        fills.forEach((x) => shown.add(x.s.word));
        blocks.push(cream('data-lcs-writes="1"', label(`${num(1)}Write the word for each picture.`) +
          `<div style="display:grid;grid-template-columns:repeat(${d.write},1fr);gap:12px">` + wr.map((x) => `<div data-lcs-write="${x.w}" data-lcs-sp="${x.sp}" style="display:flex;flex-direction:column;align-items:center;gap:3px">${img(x.w, d.wpic)}${line({ w: Math.floor((inner - 12 * (d.write - 1)) / d.write), h: d.rowH, answer: key ? x.w : null })}</div>`).join('') + `</div>`, d.pad));
        items.push(...wr.map((x) => 'write:' + x.w));
        const per = d.sort[sps.length] || 2;
        const layout = sps.length > 3 ? [sps.slice(0, 2), sps.slice(2)] : [sps];
        blocks.push(sortBlock(2, layout.map((blk) => blk.map((sp) => ({ sp, n: per }))), d.rowH));
        const box = M.place === 'start' ? '' : `<div data-lcs-letterbox style="display:flex;justify-content:center;gap:10px">${sps.map((sp) => chip(sp, `data-lcs-boxsp="${sp}"`, 22)).join('')}</div>`;
        blocks.push(cream('data-lcs-fill="1"', label(`${num(3)}Read each sentence. ${M.place === 'start' ? 'Write the two letters that start the word.' : `Finish the word with ${orList(sps)}.`}`) + box +
          fills.map((x) => { const { at, g } = gapOf(M, x.s.word, x.sp); const { a, tail, b: b2 } = splitAt(x.s.text);
            return `<div data-lcs-fillrow="${x.s.word}" data-lcs-sp="${x.sp}" data-lcs-read style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:2px 8px;font:700 ${d.ffont}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:${d.fpad}px 0 ${d.fpad}px 18px">${a ? `<span>${esc(a)}</span>` : ''}${gapWord(x.s.word, at, g, key, d.ffont + 4, tail)}${b2 ? `<span>${esc(b2)}</span>` : ''}</div>`; }).join(''), d.pad));
        items.push(...fills.map((x) => 'fill:' + x.s.word));
      }

      /** the sort: printed words in a bank, a teal-headed column of 89 px writing rows for each spelling (start: each kind of
       *  blend); `layout` is a list of blocks of columns (four endings: two blocks of two) */
      function sortBlock(k, layout, rowH) {
        const groups = layout.flat();
        const ws = groups.flatMap((g) => take(M.words[g.sp], g.n).map((w) => ({ w, sp: g.sp })));
        const bank = mixed(ws, rng);
        items.push(...ws.map((x) => x.w));
        const where = M.place === 'start' ? 'its kind of blend' : M.place === 'end' ? 'its ending' : orList(groups.map((g) => g.sp));
        return cream('data-lcs-sort="1"', label(`${num(k)}Read the words. Write each word under ${where}. Cross out each word when you write it.` + (key ? ` <span data-lcs-anyorder style="font-weight:700;font-size:16px;color:${T.teal}">(any order)</span>` : '')) +
          `<div data-lcs-bank style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px 8px;margin:0 0 2px">${bank.map((x) => chip(x.w, `data-lcs-bankword="${x.w}" data-lcs-sp="${x.sp}"`, 22)).join('')}</div>` +
          layout.map((blk) => { const cols = blk.length, colW = Math.floor((inner - 16 * (cols - 1)) / cols);
            return `<div data-lcs-sortblock style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:4px 16px">` + blk.map((g) => `<div data-lcs-column="${g.sp}" style="display:flex;flex-direction:column;gap:2px">${headBar(head(g.sp))}${ws.filter((x) => x.sp === g.sp).map((x) => line({ w: colW, h: rowH, answer: key ? x.w : null, sample: true })).join('')}</div>`).join('') + `</div>`; }).join(''), d.pad);
      }

      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-blendpage="${mode}|${lv}|${sps.join(',')}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + sps.join('-') + ':' + items.slice(0, 3).join(','), items },
      };
    },

    async verify(page) {
      return page.evaluate((CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-blendpage]');
        if (!root) return ['no page'];
        const [mode, lvS, spS] = root.dataset.lcsBlendpage.split('|'), lv = +lvS, sps = spS.split(','), M = CFG.modes[mode], d = CFG.LEVELS[lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const rb = R(root);
        const blendStart = (w) => /^[^aeiou][^aeiou]/.test(w) && !['sh', 'ch', 'th', 'wh'].includes(w.slice(0, 2));
        const plainLv = (M.noStartBlend || []).includes(lv);
        // the spelling a word holds (start: its family), as the bank's own check reads it
        const spOf = (w) => {
          if (M.place === 'start') { const f = Object.keys(M.families).find((k) => M.families[k].includes(w.slice(0, 2))); return f && /[aeiou]/.test(w[2] || '') && !Object.values(M.families).flat().some((b) => w.indexOf(b, 1) >= 1) ? f : null; }
          const has = M.spellings.filter((s) => w.includes(s)); if (has.length !== 1) return null;
          const s = has[0], at = w.indexOf(s), place = M.place === 'end' ? 'end' : CFG.PLACE_OF[s];
          if (w.indexOf(s, at + 1) >= 0 || (place === 'end' && at !== w.length - 2) || (place === 'start' && at !== 0)) return null;
          return s;
        };
        const picSp = (w) => (M.place === 'end' ? (M.spellings.includes(w.slice(-2)) ? w.slice(-2) : null) : spOf(w) || spOf(w.replace(/s$/, '')));
        // ligatures off on the whole page (fi, ff)
        const ligOff = (e) => cs(e).fontVariantLigatures === 'none' && /"liga" 0/.test(cs(e).fontFeatureSettings);
        if (!ligOff(root)) fails.push('the page does not turn ligatures off');
        if (root.dataset.lcsNoliga !== '1') fails.push('the page root does not carry data-lcs-noliga');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[ifl]/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, or ff joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg') && /f[ifl]/.test(n.textContent)) { fails.push('an f before i, f, or l has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 60) fails.push('a picture smaller than 60 px'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, [data-lcs-line] svg').forEach((e) => { const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < CFG.ROW - 0.5) fails.push(`a writing row lower than ${CFG.ROW} px`); });
        document.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 19) fails.push('text a first grader reads is smaller than 19 px'); });
        document.querySelectorAll('[data-lcs-pill], [data-lcs-bankword], [data-lcs-boxsp], [data-lcs-colhead]').forEach((e) => { if (fs(e) < 20) fails.push('a word to choose or sort is smaller than 20 px'); });
        document.querySelectorAll('[data-lcs-colhead]').forEach((e) => { if (cs(e).backgroundColor !== 'rgb(20, 107, 94)' || cs(e).color !== 'rgb(255, 255, 255)') fails.push('a sort column head is not a teal bar with white letters'); });
        document.querySelectorAll('[data-lcs-tail]').forEach((e) => { const p = e.previousElementSibling; if (!p || R(e).left - R(p).right > 1.5) fails.push('a period stands apart from its word'); });
        const gaps = [...document.querySelectorAll('[data-lcs-gap]')];
        gaps.forEach((g) => { const want = g.dataset.lcsGap.length === 1 ? CFG.GAP1 : CFG.GAP2; if (Math.abs(R(g).width - want) > 1) fails.push(`a gap of ${Math.round(R(g).width)} px, not ${want}`);
          const ex = g.dataset.lcsExampleGap === '1'; if ((isKey || ex) ? g.textContent.trim() !== g.dataset.lcsGap : g.textContent.trim()) fails.push('a gap is filled on the page of the child, or wrong on the key or in a worked example'); });
        const gapFits = (wEl) => { if (!wEl) return false; const c = wEl.cloneNode(true), g = c.querySelector('[data-lcs-gap]'); if (!g) return false; g.textContent = g.dataset.lcsGap; return c.textContent.replace(/\s+/g, '') === wEl.dataset.lcsGapword; };
        const printed = [];   // words printed whole or with a gap, page-wide (none twice)
        if (plainLv) document.querySelectorAll('[data-lcs-newpair], [data-lcs-gapword], [data-lcs-mword], [data-lcs-bankword], [data-lcs-pill]').forEach((e) => { const w = (e.dataset.lcsGapword || e.dataset.lcsBankword || e.textContent.trim().split('→').pop() || '').trim(); if (blendStart(w)) fails.push(`"${w}" starts with a blend on a level that has none`); });

        if (lv === 1) {
          const sp = sps[0];
          if (sps.length !== 1) fails.push('level 1 draws more than one spelling');
          const prs = [...document.querySelectorAll('[data-lcs-newpair]')].map((e) => ({ e, o: e.dataset.lcsNewpair.split('|')[0], n: e.dataset.lcsNewpair.split('|')[1], ex: e.dataset.lcsExample === '1' }));
          const exs = prs.filter((p) => p.ex);
          if (exs.length !== 1 || !prs[0].ex) fails.push('the new-word card has not one worked row, first');
          if (prs.length - exs.length !== d.card || new Set(prs.map((p) => p.n)).size !== prs.length) fails.push(`not ${d.card} different new words and a worked row`);
          prs.forEach(({ e, o, n }) => {
            const g = e.querySelector('[data-lcs-gap]');
            const okk = M.place === 'start' ? n === 's' + o && g && g.dataset.lcsGap === 's' : spOf(n) === sp && g && g.dataset.lcsGap === sp && o.length === n.length - 1 && o.slice(0, n.indexOf(sp)) === n.slice(0, n.indexOf(sp)) && o.slice(n.indexOf(sp) + 1) === n.slice(n.indexOf(sp) + 2);
            if (!okk || !gapFits(e.querySelector('[data-lcs-gapword]'))) fails.push(`"${o}" -> "${n}" is no new word with ${sp} made from an old word`);
          });
          const gc = [...document.querySelectorAll('[data-lcs-gaps]')];
          if (M.place === 'start' ? gc.length !== 2 || new Set(gc.map((c) => c.dataset.lcsGaps)).size !== 2 : gc.length !== 1) fails.push(`${gc.length} cards of words to finish`);
          gc.forEach((c) => { const all = [...c.querySelectorAll('[data-lcs-gapword]')], g = c.dataset.lcsGaps, ws = all.filter((w) => w.dataset.lcsExample !== '1');
            if (all.length - ws.length !== 1 || all[0].dataset.lcsExample !== '1') fails.push('a card of words to finish has not one worked word, first');
            if (ws.length !== (M.place === 'start' ? d.startGaps : d.gaps) || all.some((w) => w.querySelector('[data-lcs-gap]').dataset.lcsGap !== g || spOf(w.dataset.lcsGapword) !== sp || (M.place === 'start' && !w.dataset.lcsGapword.startsWith(g)) || !gapFits(w))) fails.push(`the words to finish with ${g} are not ${M.place === 'start' ? d.startGaps : d.gaps} words of ${sp} with a gap for ${g}`);
            if (M.place === 'start' && !M.families[sp].includes(g)) fails.push(`${g} is no ${sp}`);
            ws.forEach((w) => printed.push(w.dataset.lcsGapword)); });
          const sn = [...document.querySelectorAll('[data-lcs-sentence]')];
          if (sn.length !== d.sents) fails.push(`${sn.length} sentences`);
          const kinds = [], places = [];
          sn.forEach((e) => { const pills = [...e.querySelectorAll('[data-lcs-pill]')], okp = pills.filter((p) => p.dataset.lcsOk); const [tgt, pl] = e.dataset.lcsPair.split('|');
            if (pills.length !== 2 || okp.length !== 1 || okp[0].textContent.trim() !== e.dataset.lcsSentence || pills.map((p) => p.textContent.trim()).sort().join() !== [tgt, pl].sort().join() || spOf(tgt) !== sp || !prs.some((p) => p.n === tgt && p.o === pl)) fails.push('a sentence is not keyed to its word among the two words of a pair of the card');
            kinds.push(okp[0] ? okp[0].dataset.lcsKind : ''); places.push(pills.indexOf(okp[0])); });
          if (!kinds.includes('team') || !kinds.includes('plain')) fails.push('the right words of the sentences are all words with the spelling, or all without');
          if (new Set(places).size < 2) fails.push('the right word stands in one place in every sentence');
          if (isKey && document.querySelectorAll('[data-lcs-pill][data-lcs-ok]').length !== sn.length) fails.push('the key does not ring every right word');
          if (lines.length) fails.push('level 1 has writing rows');
          const gw = gc.flatMap((c) => [...c.querySelectorAll('[data-lcs-gapword]')].filter((w) => w.dataset.lcsExample !== '1').map((w) => w.dataset.lcsGapword));
          if (gw.some((w) => prs.some((p) => p.n === w || p.o === w) || sn.some((e) => e.dataset.lcsPair.split('|').includes(w)))) fails.push('a word to finish is printed elsewhere on the page');
          if (new Set(gw).size !== gw.length) fails.push('a word to finish stands twice');
        }
        // the sort (levels 2 and 3)
        const sortCheck = (per) => {
          const bank = [...document.querySelectorAll('[data-lcs-bankword]')].map((e) => ({ w: e.dataset.lcsBankword, sp: e.dataset.lcsSp })), cols = [...document.querySelectorAll('[data-lcs-column]')];
          if (bank.length !== per * sps.length || sps.some((sp) => bank.filter((x) => x.sp === sp).length !== per) || bank.some((x) => spOf(x.w) !== x.sp) || cols.map((c) => c.dataset.lcsColumn).join() !== sps.join() || cols.some((c) => c.querySelectorAll('[data-lcs-line]').length !== per)) fails.push(`the sort is not ${per} words of each spelling and a column of ${per} rows for each`);
          if (bank.some((x, i) => i >= 2 && x.sp === bank[i - 1].sp && x.sp === bank[i - 2].sp)) fails.push('three words of one spelling stand in a row in the sort');
          if (isKey) { cols.forEach((c) => [...c.querySelectorAll('[data-lcs-line]')].forEach((l) => { if (spOf(l.dataset.lcsAnswer || '') !== c.dataset.lcsColumn) fails.push('the key sorts a word into the wrong column'); })); if (!document.querySelector('[data-lcs-anyorder]')) fails.push('the key does not say the sort may be written in any order'); }
          if (!/Cross out each word/.test((document.querySelector('[data-lcs-sort] [data-lcs-label]') || {}).textContent || '')) fails.push('the sort does not tell the child to cross out each word');
          if (new Set(bank.map((x) => x.w)).size !== bank.length) fails.push('a word stands twice in the sort');
          bank.forEach((x) => printed.push(x.w));
        };
        if (lv === 2) {
          const mw = [...document.querySelectorAll('[data-lcs-mword]')], mp = [...document.querySelectorAll('[data-lcs-mpic]')];
          const real = mw.filter((e) => !e.dataset.lcsDecoy), dec = mw.filter((e) => e.dataset.lcsDecoy);
          if (mw.length !== d.match + d.decoys || real.length !== d.match || dec.length !== d.decoys || mp.length !== d.match) fails.push(`not ${d.match + d.decoys} words for ${d.match} pictures, ${d.decoys} of them without a picture`);
          const picWords = mp.map((e) => e.dataset.lcsMpic);
          real.forEach((e) => { const w = e.textContent.trim(), pc = mp.find((p) => p.dataset.lcsMpic === w);
            if (!pc || !pc.querySelector('img') || pc.querySelector('img').dataset.lcsPic !== w) fails.push('a word has no picture of its own');
            if (!sps.includes(e.dataset.lcsSp) || picSp(w) !== e.dataset.lcsSp) fails.push('a word to match holds no spelling of this page');
            if (pc) { const o = (R(pc).top + R(pc).height / 2) - (R(e).top + R(e).height / 2); e.dataset.off = o; if (Math.abs(o) < 18) fails.push(`"${w}" stands straight across from its picture`); }
            printed.push(w); });
          if (new Set(real.map((e) => Math.round(+e.dataset.off / 10))).size < 2) fails.push('every picture stands the same distance from its word');
          const di = mw.map((e, i) => (e.dataset.lcsDecoy ? i : -1)).filter((i) => i >= 0);
          if (di.length === 2 && Math.abs(di[0] - di[1]) === 1) fails.push('the two words without a picture stand next to each other');
          dec.forEach((e) => { const w = e.textContent.trim(), of = e.dataset.lcsDecoy, sp = e.dataset.lcsSp;
            const at = M.place === 'start' ? 0 : M.place === 'end' ? of.length - 2 : of.indexOf(sp), g = M.place === 'start' ? of.slice(0, 2) : M.place === 'end' ? of.slice(-2) : sp;
            const headS = of.slice(0, at), tailS = of.slice(at + g.length), x = w.startsWith(headS) && w.endsWith(tailS) && w.length >= headS.length + tailS.length ? w.slice(headS.length, w.length - tailS.length) : null;
            if (!picWords.includes(of) || x === null || x === g || x.length > 2) fails.push(`"${w}" does not differ from the pictured "${of}" only in the spelling`);
            if (picWords.some((p) => p.replace(/s$/, '') === w.replace(/s$/, ''))) fails.push(`"${w}" names a picture of the page`);
            printed.push(w); });
          const msp = new Set(real.map((e) => e.dataset.lcsSp)); if (sps.some((sp) => CFG.pictured[mode].includes(sp) && !msp.has(sp))) fails.push('a spelling of this page that has pictures has none among the words to match');
          const kl = document.querySelectorAll('[data-lcs-keyline]').length; if (kl !== (isKey ? d.match : 0)) fails.push(`${kl} lines are drawn`);
          sortCheck(d.sort);
          if (lines.length !== d.sort * 2) fails.push(`${lines.length} writing rows`);
        }
        if (lv === 3) {
          if (sps.join() !== M.spellings.join()) fails.push('level 3 does not draw every spelling');
          const wr = [...document.querySelectorAll('[data-lcs-write]')];
          if (wr.length !== d.write || wr.some((e) => !e.querySelector('img') || e.querySelector('img').dataset.lcsPic !== e.dataset.lcsWrite || e.querySelectorAll('[data-lcs-line]').length !== 1) || new Set(wr.map((e) => e.dataset.lcsWrite)).size !== d.write) fails.push(`not ${d.write} different pictures to write the word for`);
          if (wr.some((e) => CFG.printOnly.includes(e.dataset.lcsWrite))) fails.push('a print-only picture is to be written');
          if (new Set(wr.map((e) => e.dataset.lcsSp)).size < CFG.writeNeed[mode]) fails.push('the pictures to write do not show every spelling that has a picture');
          if (isKey) wr.forEach((e) => { if (e.querySelector('[data-lcs-line]').dataset.lcsAnswer !== e.dataset.lcsWrite) fails.push('the key writes another word under a picture'); });
          wr.forEach((e) => printed.push(e.dataset.lcsWrite));
          const per = d.sort[sps.length]; sortCheck(per);
          if (sps.length > 3 && document.querySelectorAll('[data-lcs-sortblock]').length !== 2) fails.push('the four endings are not sorted in two blocks of two columns');
          const fr = [...document.querySelectorAll('[data-lcs-fillrow]')];
          if (fr.length !== d.fill) fails.push(`${fr.length} sentences to finish`);
          const seq = fr.map((e) => e.dataset.lcsSp);
          if (new Set(seq).size < 2) fails.push('the sentences to finish take one spelling only');
          fr.forEach((e) => { const w = e.dataset.lcsFillrow, gw = e.querySelector('[data-lcs-gapword]'), g = gw && gw.querySelector('[data-lcs-gap]');
            if (!gw || gw.dataset.lcsGapword !== w || spOf(w) !== e.dataset.lcsSp || !g || g.dataset.lcsGap !== (M.place === 'start' ? w.slice(0, 2) : e.dataset.lcsSp) || !gapFits(gw)) fails.push(`the sentence for "${w}" has not a gap for its spelling`);
            printed.push(w); });
          const idx = seq.map((s) => sps.indexOf(s));
          if (idx.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1))) fails.push('the sentences take the spellings in a staircase');
          const box = [...document.querySelectorAll('[data-lcs-boxsp]')].map((e) => e.dataset.lcsBoxsp);
          if (M.place === 'start' ? box.length : box.join() !== sps.join()) fails.push('the letters to choose from are not the spellings of this page');
          if (lines.length !== d.write + per * sps.length) fails.push(`${lines.length} writing rows`);
        }
        if (lv > 1) { const st = printed.map((w) => w.replace(/s$/, '')); if (new Set(st).size !== st.length) fails.push('a word stands twice on the page'); }
        return fails;
      }, { LEVELS, PLACE_OF, ROW, GAP1, GAP2, printOnly: BANK.printOnly || [],
        modes: Object.fromEntries(Object.entries(MODES).map(([k, m]) => [k, { place: m.place, spellings: m.spellings, families: m.families || null, noStartBlend: m.noStartBlend || [] }])),
        pictured: Object.fromEntries(Object.entries(MODES).map(([k, m]) => [k, Object.keys(m.match || {}).filter((sp) => (m.match[sp] || []).filter((w) => !(m.noStartBlend || []).includes(2) || !startsWithBlend(w)).length)])),
        writeNeed: Object.fromEntries(Object.entries(MODES).map(([k, m]) => [k, Math.min(LEVELS[3].write, new Set((m.write || []).map((w) => picSpellingOf(m, w))).size)])) });
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the level-2 match made small. A card is one
 *  pictured word of the level's spellings (never a print-only picture: the child chooses from the picture) beside its word
 *  and one printed word of the bank that differs from it only in the spelling and names no picture (its decoys: sock /
 *  song, rock / rod); the word for the picture carries data-lcs-correct (the child circles it). The right word stands on
 *  top on some cards and below on others.
 *  Every decoy is PLAIN: its letters in place of the spelling are none of the page's spellings (dug, rod, log; never song or
 *  long beside a ck picture: form B, whose decoys were ng words, was harder than form A, review en-1119-lit). A card names
 *  its spelling (data-lcs-ckind), so that each form asks every spelling the pictures allow once.
 *   teams (G1-589)  ck and ng. The bank pictures ONE ng word on its level-2 page (ring), so the check adds the swing it
 *                   pictures for the s-blends (CHECK_EXTRA: swing / swim, the same sw in both words; only the ending
 *                   decides), that both forms ask an ng word (review en-1119-lit: every answer had been ck).
 *   end   (G1-591)  nd and mp: the two pictured words of its level-2 page (hand, lamp), one card in each form (lists: take 1).
 *  The sh-ch page has three pictured words with a plain decoy and the s- and l-blend page three: their lessons take another
 *  page (G1-380, G1-493). The sort of every level-2 page is no check card: a word is written under the letters it shows,
 *  which needs no reading. */
const BLEND_CHECK_MODES = new Set(['teams', 'end']);
const CHECK_EXTRA = { teams: [{ w: 'swing', sp: 'ng', alt: 'swim' }] };
function blendCheckPage(M, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`blends-g1 check: the words are English words (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, rng = ctx.rng;
  const sps = [...new Set(M.levels[lv].flat())];   // (every spelling the level draws: one card shows one picture)
  const plainLv = (M.noStartBlend || []).includes(lv), ok = (w) => !plainLv || !startsWithBlend(w);
  // a plain decoy: the letters in place of the spelling are no spelling of the mode
  const plain = (sp, d, w) => { const { at, g } = spellAt(M, w, sp); const x = d.slice(at, d.length - (w.length - at - g.length)); return !(M.spellings || []).some((s) => x.includes(s)) && !DIGRAPHS.some((s) => x.includes(s)); };
  const pool = sps.flatMap((sp) => (M.match[sp] || []).filter((w) => ok(w) && !(BANK.printOnly || []).includes(w)).map((w) => ({ w, sp, alts: ((M.decoys || {})[w] || []).filter((d) => ok(d) && plain(sp, d, w)) })).filter((x) => x.alts.length));
  // the extra pictured words of the check (CHECK_EXTRA), each held to the bank: a picture of the bank, a word of its lists
  // with the spelling, and a real word of the bank that differs from it only there
  const known = new Set(Object.values(MODES).flatMap((m) => Object.values(m.words || {}).flat()));
  for (const x of (CHECK_EXTRA[Object.keys(MODES).find((k) => MODES[k] === M)] || [])) {
    if (!PICS[x.w] || !((M.words || {})[x.sp] || []).includes(x.w) || !known.has(x.alt) || !isDecoyOf(M, x.sp, x.alt, x.w) || !plain(x.sp, x.alt, x.w)) throw new Error(`blends-g1 check: the extra card ${x.w} / ${x.alt} is not held by the bank`);
    if (sps.includes(x.sp)) pool.push({ w: x.w, sp: x.sp, alts: [x.alt] });
  }
  if (pool.length < 2) throw new Error(`blends-g1 check: ${pool.length} pictured words with a plain decoy`);
  const items = shuffle(pool, rng).map((x) => ({ ...x, alt: shuffle(x.alts, rng)[0] }));
  let at; for (let k = 0; k < 200; k++) { at = items.map(() => rng.int(0, 1)); if (new Set(at).size === 2 && !/000|111/.test(at.join(''))) break; }
  const word = (w, okk) => `<span data-lcs-choice="${esc(w)}"${okk ? ' data-lcs-correct="1"' : ''} style="flex:0 0 auto;display:inline-flex;padding:0 14px 4px;font:800 34px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>`;
  const cards = items.map((x, i) => { const two = [word(x.w, true), word(x.alt, false)]; if (at[i]) two.reverse();
    return `<div data-lcs-blendcheck="${x.w}" data-lcs-sp="${x.sp}" data-lcs-ckind="${x.sp}" style="display:flex;align-items:center;justify-content:center;gap:22px;padding:6px 8px">${img(x.w, 84)}<div data-lcs-two style="display:flex;flex-direction:column;align-items:center;gap:10px">${two.join('')}</div></div>`; });
  return { bodyHtml: STYLE + `<div data-lcs-noliga="1" style="${LIGS}">` + fRoom(checkGrid(cards, { cols: 2 })) + `</div>`, meta: {} };
}

module.exports = { makeBlendType, blendFaultsOf, LEVELS };
