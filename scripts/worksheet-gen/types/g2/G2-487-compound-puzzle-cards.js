/**
 * G2-487 — Compound Puzzle Cards (Vocabulary maker 2026-11-02, NEW-TEMPLATES §46 T1; L.2.4.d compound words; de
 * "zusammengesetzte Nomen", nl "samenstellingen", sv / da / no "sammansatta ord"; material): the two parts of each
 * compound on puzzle pieces to cut out (the first part with its joining letter on the tab — de Sonne·n·blume, nl
 * zon·ne·bloem), printed mixed up; the children join the pieces and write each compound on a line. The compounds are the
 * reviewed bank (data/b3/compound-words.js + data/b3/locales, every picture opened): only transparent compounds, no
 * part twice on a page, and no first part that makes a second real word with another compound's second part (the
 * bank's crossWords and every compound it lists). fr / es / pt / it are refused: their bank is word families, not
 * compounds (Romance compounds are few). Level 3 leaves the tab blank in the locales with joining letters (the child
 * finds the letter) and drops the pictures in the others.
 * On the screen the child pairs each first part with its second part; the key numbers the two pieces of each compound
 * and writes the compounds on the lines.
 * Levels: 1 six compounds · 2 eight compounds · 3 eight compounds, the joining letter to find (or no pictures) — a bank
 * too small for eight (nl / sv / fi once the second joins are blocked) gives six or seven.
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');
const { vocab } = require('../../lib/b2-common.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { keyNumber } = require('../_shared/key-number.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const A = require('../_shared/alphabet-more.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const W = 660;
// a first part + another compound's second part that makes a real word a child knows (review 2026-11-02): never on one
// page together — beside the bank's own crossWords and any word of the vocabulary
const CROSS = {
  en: [['book', 'worm'], ['book', 'bag'], ['hand', 'ball'], ['sun', 'fish']], de: [['Wasser', 'ball'], ['Hand', 'ball']],
  nl: [['water', 'schoen']], sv: [['bok', 'bil']], da: [['strand', 'bold'], ['strand', 'hus'], ['sø', 'orm']],
  no: [['is', 'bjørn'], ['is', 'kake'], ['vann', 'fugl']], fi: [['sade', 'housut'], ['vesi', 'pallo']],
};
// compounds left out of this page: not a grade-2 word, opaque, read as something else, or a joining letter the page
// would teach inconsistently (da / no vask·e·bjørn beside skrive·bord)
const LEAVE_OUT = { en: ['saucepan'], nl: ['kaastaart'], da: ['søko', 'fårekylling', 'vaskebjørn'], no: ['isfugl', 'vaskebjørn'] };
const D = { 1: { n: 6, hard: false }, 2: { n: 8, hard: false }, 3: { n: 8, hard: true } };

module.exports = {
  id: 'G2-487',
  slug: 'compound-puzzle-cards',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'compound-words',
  themeAxis: { applicable: false },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Compound Word Puzzles', instruction: 'Cut out the pieces. Put two pieces together to make a compound word, then write the word on a line.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const B = bank('compound-words', L);
    if (B.shape !== 'compound') throw new Error(`G2-487: the ${L} bank holds no compounds yet`);
    const all = (B.units || []).flatMap((u) => u.items);
    const wholes = new Set(all.map((x) => x.whole.word.toLocaleLowerCase(L)));
    const cross = [...(B.crossWords || []), ...(CROSS[L] || [])].map(([a, b]) => `${a}|${b}`.toLocaleLowerCase(L));
    // every word of the vocabulary in this language: a join that spells one is a second right answer
    const known = new Set(Object.values(vocab()).flatMap((e) => (e && e[L] ? [e[L][0], e[L][1]] : [])).filter(Boolean).map((w) => String(w).toLocaleLowerCase(L)));
    const links = (B.links || []).some((l) => l);
    // only parts that join as they stand (part + joining letter + part = the word): de Pfanne → Pfannkuchen, nl brief →
    // brievenbus change the first part and are left out
    const pool = all.filter((x) => x.picOpened && !x.opaque && x.a && x.b && x.a.word && x.b.word && !(LEAVE_OUT[L] || []).includes(x.whole.word.toLocaleLowerCase(L)) &&
      (x.a.word + (x.link || '') + x.b.word).toLocaleLowerCase(L) === x.whole.word.toLocaleLowerCase(L));
    const join = (x, y) => (x.a.word + (x.link || '') + y.b.word).toLocaleLowerCase(L);
    const clash = (x, y) => [join(x, y), (x.a.word + y.b.word).toLocaleLowerCase(L)].some((w) => wholes.has(w) || known.has(w)) || cross.includes(`${x.a.word}|${y.b.word}`.toLocaleLowerCase(L));
    const lo = (s) => s.toLocaleLowerCase(L);
    // greedy over a shuffle, tried again on a new shuffle when a small bank runs short
    // the best of 40 shuffles; a small bank gives as many as it can, never fewer than six
    let picks = [];
    for (let t = 0; t < 40 && picks.length < d.n; t++) {
      const got = [];
      for (const x of rng.shuffle(pool)) {
        if (got.length === d.n) break;
        // no word on two pieces at all (nl bloem as a second part AND a first part: two joins would both be right)
        const mine = [x.a.word, x.b.word].map(lo);
        if (got.some((y) => [y.a.word, y.b.word].map(lo).some((w) => mine.includes(w)) || lo(y.whole.word) === lo(x.whole.word) || clash(x, y) || clash(y, x))) continue;
        got.push(x);
      }
      if (got.length > picks.length) picks = got;
    }
    if (picks.length < Math.min(d.n, 6)) throw new Error(`G2-487: ${L} has ${picks.length} compounds that cannot be mixed up (< ${d.n})`);
    // a teacher's compounds (maker): another compound of the bank — refused when a word sits on two pieces or two pieces join
    // into a second word (the page's own mix-up rules)
    {
      const tagged = pool.map((x) => ({ word: x.whole.word, x }));
      const cur = picks.map((x) => tagged[pool.indexOf(x)]);
      const chosen = slot.words(ctx, cur, tagged, 'word');
      if (chosen.some((c, i) => c !== cur[i])) {
        const list = chosen.map((c) => c.x), hadPics = picks.every((x) => x.a.pic && x.b.pic);
        const bad = (hadPics && !list.every((x) => x.a.pic && x.b.pic)) || list.some((x, i) => list.some((y, j) => j !== i && ([y.a.word, y.b.word].map(lo).some((w) => [x.a.word, x.b.word].map(lo).includes(w)) || lo(y.whole.word) === lo(x.whole.word) || clash(x, y))));
        if (!bad) picks = list; else { slot.words({ ...ctx, overrides: null }, cur, tagged, 'word'); slot.refuse(ctx, 'word'); }
      }
    }
    // pictures only when every piece on the page has one (a page half pictures, half words reads as two tasks)
    const pics = !(d.hard && !links) && picks.every((x) => x.a.pic && x.b.pic);
    const blankTab = d.hard && links;
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const extra = (ctx && ctx.chromeExtra) || 0;
    // the second part alone is a word of its own: de nouns keep their capital
    const second = (x) => (L === 'de' ? x.b.word.charAt(0).toLocaleUpperCase(L) + x.b.word.slice(1) : x.b.word);
    const pieces = rng.shuffle(picks.flatMap((x, i) => [{ x, i, side: 'a' }, { x, i, side: 'b' }]));
    const cols = 4, gap = 10, rows = Math.ceil(pieces.length / cols);
    const pw = Math.floor((W - gap * (cols - 1)) / cols), ph = Math.min(118, Math.floor((420 - extra - gap * (rows - 1)) / rows));
    const px = pics ? Math.max(40, ph - 48) : 0;
    const piece = ({ x, i, side }) => {
      const p = side === 'a' ? x.a : x.b;
      const word = side === 'a' ? x.a.word : second(x);
      const mk = scr ? (side === 'a' ? ` data-lcs-key-badge="c${i + 1}"` : ` data-lcs-pair="c${i + 1}"`) : '';
      const tab = side === 'a' && (x.link || blankTab)
        ? `<span data-lcs-link="${x.link || ''}" style="position:absolute;right:-2px;top:50%;transform:translateY(-50%);min-width:30px;height:38px;padding:0 4px;box-sizing:border-box;border:2.5px solid ${T.teal};border-right:none;border-radius:19px 0 0 19px;background:#FFFFFF;font:700 22px/34px 'Baloo 2',cursive;color:${T.teal};text-align:center">${blankTab ? (key && x.link ? `<span data-lcs-key-sample="1">${x.link}</span>` : '') : x.link}</span>`
        : '';
      const edge = side === 'a' ? `border-right:5px solid ${T.teal}` : `border-left:5px solid ${T.coral}`;
      return `<div data-lcs-piece="c${i + 1}" data-lcs-side="${side}"${side === 'a' ? slot.attr(ctx, 'word', i) : ''}${mk} style="position:relative;box-sizing:border-box;width:${pw}px;height:${ph}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:2px dashed ${T.grid};${edge};border-radius:12px;background:#FFFFFF">` +
        // the key number: top right, but top LEFT on a first part, whose tab holds the right edge
        (key ? (side === 'a' ? `<span style="position:absolute;left:0;top:0;width:44px;height:44px">${keyNumber(i + 1)}</span>` : keyNumber(i + 1)) : '') +
        (pics && p.pic ? `<img class="ws-icon" src="${fileUri(p.pic.theme, p.pic.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">` : '') +
        `<span style="font:700 ${[...word].length > 9 ? 20 : 24}px/1.1 'Baloo 2',cursive;color:${T.ink};text-align:center;padding:0 ${side === 'a' ? 30 : 6}px 0 6px">${word}</span>` + tab + '</div>';
    };
    const lineW = Math.floor((W - 24) / 2);
    const lines = picks.map((x, i) => `<div style="position:relative;display:flex;align-items:flex-end;gap:8px"><span style="font:700 22px/1 'Baloo 2',cursive;color:${T.teal}">${i + 1}.</span>` +
      // the key word seated ON the row (lib/key-on-row.js), never a guessed offset
      `<div style="position:relative">${key ? seatOnRow(writingRow({ w: lineW - 30, h: 52, glyphH: 26, xHeight: true }).svg, x.whole.word, { fill: T.teal }) : writingRow({ w: lineW - 30, h: 52, glyphH: 26, xHeight: true }).svg}</div></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-compound-puzzle style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">` +
        `<div style="display:grid;grid-template-columns:repeat(${cols},${pw}px);gap:${gap}px;justify-content:center">${pieces.map(piece).join('')}</div>` +
        `<div data-lcs-compound-lines style="display:grid;grid-template-columns:1fr 1fr;gap:6px 24px">${lines.join('')}</div></div>`,
      meta: { compounds: picks.map((x) => `${x.a.word}${x.link ? '·' + x.link : ''}·${second(x)} = ${x.whole.word}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const ps = [...document.querySelectorAll('[data-lcs-piece]')];
      if (ps.length < 12) fails.push(`${ps.length} pieces`);
      const by = {}; ps.forEach((p) => { (by[p.dataset.lcsPiece] = by[p.dataset.lcsPiece] || []).push(p.dataset.lcsSide); });
      Object.entries(by).forEach(([k, v]) => { if (v.slice().sort().join() !== 'a,b') fails.push(`compound ${k}: pieces ${v.join(',')}`); });
      ps.forEach((p, i) => {
        const R = p.getBoundingClientRect();
        p.querySelectorAll('img,span').forEach((x) => { const r = x.getBoundingClientRect(); if (r.width && (r.right > R.right + 3 || r.bottom > R.bottom + 1 || r.left < R.left - 3)) fails.push(`piece ${i + 1}: content leaves the piece`); });
        p.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`piece ${i + 1}: a picture did not load`); });
      });
      return fails;
    });
  },
};
