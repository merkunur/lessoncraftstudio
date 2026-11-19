/**
 * two-texts-k.js — the Kindergarten page Two Texts, One Topic (English literacy year, Daily Teaching System Part 12.3,
 * 2026-11-16; unit "Reading to Learn: Fact Texts", its fifth lesson).
 *
 * RI.K.9: with prompting and support, identify basic similarities in and differences between two texts on the same
 * topic. Two fact texts of four short sentences in big print stand one under the other (data/literacy/
 * info-texts.en.json, key `k2`: a pair of texts on one topic, each with a library picture). Two things are told by
 * BOTH texts, two by the first text only, two by the second only; each of the six is a library picture whose word
 * stands in the text (the bank checks it). The teacher reads the texts aloud.
 *
 *   level 1  six pictures to cut out; the child glues each where it belongs: first text only, both texts, second only
 *   level 2  the child DRAWS one thing for each of the three places
 *   level 3  the child draws and writes the name of the thing on a line of three quarters of an inch
 *
 * English only. Themeless: a copy is another pair of texts (meta.items names the pair). PDF only. The answer key
 * shows the pictures in their places (on levels 2 and 3 as samples: a child may draw the other thing of a place).
 */
'use strict';
const { writingRow } = require('../../primitives/trace-path.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/info-texts.en.json');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pk = (p) => p.theme + '/' + p.noun;
const words = (s) => String(s).split(/\s+/).filter(Boolean).length;
const has = (text, word) => new RegExp('(^|[^A-Za-z])' + String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^A-Za-z]|$)', 'i').test(text);

// The picture cache is on the machines that BUILD pages; the server loads every type module without it.
let HAVE_PICTURES = true;
try { require('../../image-cache/resolve.js').manifest(); } catch (e) { HAVE_PICTURES = false; }

/** What must be true of a pair of texts before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(p) {
  const f = [], id = p.id;
  if (!p.a || !p.b || !p.topic) return [id + ': not two texts and a topic'];
  for (const [k, t] of [['first', p.a], ['second', p.b]]) {
    if (!t.title || !t.picture || !Array.isArray(t.sentences) || t.sentences.length !== 4) { f.push(`${id}: the ${k} text has no title, no picture or not four sentences`); continue; }
    const n = words(t.sentences.join(' '));
    if (n < 14 || n > 32) f.push(`${id}: the ${k} text has ${n} words (14 to 32)`);
    t.sentences.forEach((s, i) => { if (words(s) > 9 || s.length > 38) f.push(`${id}: sentence ${i + 1} of the ${k} text is too long for one line`); if (!/[.!]$/.test(s)) f.push(`${id}: sentence ${i + 1} of the ${k} text has no end mark`); });
  }
  if (f.length) return f;
  if (p.a.title === p.b.title || pk(p.a.picture) === pk(p.b.picture)) f.push(id + ': the two texts share their title or their picture');
  const A = p.a.sentences.join(' '), B = p.b.sentences.join(' ');
  const sets = { both: p.both, a: p.onlyA, b: p.onlyB };
  for (const [k, list] of Object.entries(sets)) {
    if (!Array.isArray(list) || list.length !== 2) { f.push(`${id}: not two pictures for "${k}"`); continue; }
    for (const c of list) {
      if (!c.word || !c.label) { f.push(`${id}: the picture ${pk(c)} has no word of the text or no label`); continue; }
      const inA = has(A, c.word), inB = has(B, c.word);
      if (k === 'both' && !(inA && inB)) f.push(`${id}: "${c.word}" is said to be in both texts and is not`);
      if (k === 'a' && !(inA && !inB)) f.push(`${id}: "${c.word}" is said to be in the first text only`);
      if (k === 'b' && !(inB && !inA)) f.push(`${id}: "${c.word}" is said to be in the second text only`);
    }
  }
  const cards = [...(p.both || []), ...(p.onlyA || []), ...(p.onlyB || [])];
  if (new Set(cards.map(pk)).size !== 6 || new Set(cards.map((c) => c.label)).size !== 6) f.push(id + ': not six different pictures with six different labels');
  if (cards.some((c) => pk(c) === pk(p.a.picture) || pk(c) === pk(p.b.picture))) f.push(id + ': a picture to sort is the picture of a text');
  if (HAVE_PICTURES) for (const c of [p.a.picture, p.b.picture, ...cards]) { try { fileUri(c.theme, c.noun); } catch (e) { f.push(`${id}: no library picture ${pk(c)}`); } }
  return f;
}
const PAIRS = BANK.k2 || [];
{ const f = PAIRS.flatMap(faultsOf); if (f.length) throw new Error('info-texts.en.json (k2): ' + f.join('; ')); }

const LEVELS = { 1: { font: 25, slot: 100, pic: 88 }, 2: { font: 23 }, 3: { font: 22.5 } };

const img = (p, size, attrs = '') => `<img class="ws-icon" ${attrs} src="${fileUri(p.theme, p.noun)}" alt="" style="width:${size}px;height:${size}px;display:block;object-fit:contain">`;
function textBox(t, which, font) {
  return `<div data-lcs-text2="${which}" data-lcs-words="${words(t.sentences.join(' '))}" style="flex:0 0 auto;display:flex;gap:16px;align-items:center;padding:8px 16px 9px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<span data-lcs-textpic style="flex:0 0 auto">${img(t.picture, 104)}</span>` +
    `<div style="flex:1 1 auto;min-width:0"><div data-lcs-title style="font:700 26px/1.15 'Baloo 2',cursive;color:${T.teal};margin-bottom:2px">${esc(t.title)}</div>` +
    t.sentences.map((s, i) => `<div data-lcs-sent="${i + 1}" style="font:700 ${font}px/1.4 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(s)}</div>`).join('') + `</div></div>`;
}
/** the head of a place: the picture of its text (or of both texts) and its words */
const head = (pics, text) => `<div data-lcs-placehead style="display:flex;align-items:center;justify-content:center;gap:6px;min-height:46px">${pics.map((p) => img(p, 42)).join('')}<span style="font:700 19px/1.1 'Baloo 2',cursive;color:${T.teal}">${text}</span></div>`;
const row = (w, h, word, key) => { const svg = writingRow({ w, h, glyphH: Math.round(h * 0.54), xHeight: true }).svg; return `<div data-lcs-line style="line-height:0;align-self:center">${key && word ? seatOnRow(svg, word, { fill: T.teal }) : svg}</div>`; };

function makeTwoTextsKType({ id, slug, i18n }) {
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: LEVELS,
    i18n,
    // the unit checks (Part 7.6): the page's task made small, one card a task (twoTextsCheckPage below)
    checkPage(args, ctx) { return twoTextsCheckPage(args, ctx); },

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the fact texts are English texts (no ${locale} bank)`);
      if (!PAIRS.length) throw new Error(`${id}: the bank holds no pair of texts`);
      const lv = Number(difficulty) || 2, d = LEVELS[lv] || LEVELS[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const p = rng.sample(PAIRS, 1)[0];
      const PLACES = [['a', [p.a.picture], 'only', p.onlyA], ['both', [p.a.picture, p.b.picture], 'both', p.both], ['b', [p.b.picture], 'only', p.onlyB]];
      let places, cut = '';
      if (lv === 1) {
        const slot = (c) => `<span data-lcs-glue style="display:inline-flex;align-items:center;justify-content:center;width:${d.slot}px;height:${d.slot}px;border:2.5px solid ${T.ink};border-radius:12px;background:#FFFFFF">${key ? `<span data-lcs-key-pic="${esc(pk(c))}">${img(c, d.pic - 6)}</span>` : ''}</span>`;
        places = PLACES.map(([k, pics, w, list]) => `<div data-lcs-place="${k}" style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:5px;padding:6px 4px 8px;border-radius:14px;background:${T.cream}">${head(pics, w)}<div style="display:flex;gap:8px">${list.map(slot).join('')}</div></div>`).join('');
        // the six pictures in an order that keeps no two of one place side by side
        const all = [...p.onlyA.map((c) => ['a', c]), ...p.both.map((c) => ['both', c]), ...p.onlyB.map((c) => ['b', c])];
        let order;
        for (let n = 0; n < 300; n++) { order = shuffle(all, rng); if (!order.some((x, i) => i && x[0] === order[i - 1][0])) break; }
        cut = `<div data-lcs-cut style="flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;padding:8px 2px 0;border-top:2.5px dashed ${T.ink}">` +
          order.map(([k, c]) => `<span data-lcs-cutpic="${k}" data-lcs-pic="${esc(pk(c))}" style="display:inline-flex;align-items:center;justify-content:center;width:${d.slot}px;height:${d.slot}px;border:2.5px dashed ${T.ink};border-radius:6px;background:#FFFFFF">${img(c, d.pic)}</span>`).join('') + `</div>`;
      } else {
        places = PLACES.map(([k, pics, w, list]) => `<div data-lcs-place="${k}" style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:5px;padding:6px 8px 8px;border-radius:14px;background:${T.cream}">${head(pics, w)}` +
          `<div data-lcs-draw style="flex:1 1 auto;min-height:${lv === 3 ? 120 : 200}px;display:flex;align-items:center;justify-content:center;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF">${key ? `<span data-lcs-key-sample="1">${img(list[0], 96)}</span>` : ''}</div>` +
          (lv === 3 ? row(196, 72, list[0].label, key) : '') + `</div>`).join('');
      }
      return {
        bodyHtml: `<div data-ws-content data-lcs-twotexts="${lv}"${key ? ' data-lcs-iskey="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` +
          textBox(p.a, 'a', d.font) + textBox(p.b, 'b', d.font) +
          `<div data-lcs-places style="flex:${lv === 1 ? '0 0 auto' : '1 1 auto'};min-height:0;display:flex;align-items:stretch;gap:8px">${places}</div>${cut}</div>`,
        meta: { text: p.id, items: [p.id + ': both', p.id + ': first', p.id + ': second'] },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-twotexts]');
        if (!root) return ['no page'];
        const lv = +root.dataset.lcsTwotexts;
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root);
        // the page says itself whether it is the key: a filled box on the child page must not pass as one
        const isKey = root.dataset.lcsIskey === '1';
        const texts = [...document.querySelectorAll('[data-lcs-text2]')];
        if (texts.map((t) => t.dataset.lcsText2).join() !== 'a,b') return ['not two texts'];
        if (R(texts[1]).top < R(texts[0]).bottom) fails.push('the second text does not stand under the first');
        texts.forEach((t, k) => {
          const n = +t.dataset.lcsWords; if (n < 14 || n > 32) fails.push(`text ${k + 1} has ${n} words`);
          const sents = [...t.querySelectorAll('[data-lcs-sent]')];
          if (sents.length !== 4) fails.push(`text ${k + 1} has ${sents.length} sentences`);
          sents.forEach((s, i) => { const fs = parseFloat(getComputedStyle(s).fontSize); if (fs < 22) fails.push(`sentence ${i + 1} of text ${k + 1} is not in big print`); if (R(s).height > fs * 1.4 + 2) fails.push(`sentence ${i + 1} of text ${k + 1} runs over two lines`); if (s.scrollWidth > s.clientWidth + 1 || R(s).right > R(t).right - 8) fails.push(`sentence ${i + 1} of text ${k + 1} leaves its box`); });
          const pic = t.querySelector('[data-lcs-textpic] img'); if (!pic || R(pic).width < 90) fails.push(`text ${k + 1} has no picture of 90 px`);
          if (!t.querySelector('[data-lcs-title]')) fails.push(`text ${k + 1} has no title`);
        });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const places = [...document.querySelectorAll('[data-lcs-place]')];
        if (places.map((x) => x.dataset.lcsPlace).join() !== 'a,both,b') fails.push('the places are not: first text, both, second text');
        places.forEach((pl) => { const hd = pl.querySelector('[data-lcs-placehead]'); const want = pl.dataset.lcsPlace === 'both' ? 2 : 1; if (!hd || hd.querySelectorAll('img').length !== want) fails.push('a place does not show the picture of its text'); pl.querySelectorAll('img, svg, [data-lcs-draw], [data-lcs-glue]').forEach((e) => { const r = R(e), b = R(pl); if (r.width && (r.right > b.right + 0.5 || r.bottom > b.bottom + 0.5)) fails.push('something leaves its place'); }); });
        const textPics = texts.map((t) => t.querySelector('[data-lcs-textpic] img').getAttribute('src'));
        if (lv === 1) {
          const cuts = [...document.querySelectorAll('[data-lcs-cutpic]')];
          const seq = cuts.map((c) => c.dataset.lcsCutpic);
          if (cuts.length !== 6 || ['a', 'both', 'b'].some((k) => seq.filter((x) => x === k).length !== 2)) fails.push('not six pictures to cut out, two for each place');
          if (seq.some((x, i) => i && x === seq[i - 1])) fails.push('two pictures of one place stand side by side: ' + seq.join(' '));
          if (new Set(cuts.map((c) => c.dataset.lcsPic)).size !== cuts.length) fails.push('a picture to cut out stands twice');
          cuts.forEach((c) => { if (R(c).width < 88) fails.push('a picture to cut out is smaller than 88 px'); if (textPics.includes(c.querySelector('img').getAttribute('src'))) fails.push('a picture to cut out is the picture of a text'); });
          const cr = cuts.map(R); if (cr.some((r, i) => i && r.left < cr[i - 1].right + 2)) fails.push('two pictures to cut out touch');
          places.forEach((pl) => { const g = [...pl.querySelectorAll('[data-lcs-glue]')]; if (g.length !== 2 || g.some((x) => R(x).width < 96)) fails.push('a place has not two boxes of 96 px to glue into'); if (!isKey && g.some((x) => x.querySelector('img'))) fails.push('a box to glue into is filled'); });
          if (isKey) places.forEach((pl) => { const want = cuts.filter((c) => c.dataset.lcsCutpic === pl.dataset.lcsPlace).map((c) => c.dataset.lcsPic).sort().join(); const got = [...pl.querySelectorAll('[data-lcs-key-pic]')].map((x) => x.dataset.lcsKeyPic).sort().join(); if (want !== got) fails.push('the key shows other pictures in a place'); });
          if (document.querySelector('[data-lcs-draw], [data-lcs-line]')) fails.push('level 1 has nothing to draw or write');
        } else {
          if (document.querySelector('[data-lcs-cut], [data-lcs-glue]')) fails.push('levels 2 and 3 have nothing to cut out');
          const draws = [...document.querySelectorAll('[data-lcs-draw]')];
          if (draws.length !== 3 || draws.some((x) => R(x).height < 115 || R(x).width < 150)) fails.push('not three boxes of 150 by 115 px to draw in');
          // a line to write on is three quarters of an inch high (72 px): a five-year-old writes big
          document.querySelectorAll('[data-lcs-line] svg').forEach((sv) => { if (R(sv).height < 70) fails.push('a writing line lower than 70 px'); });
          const lines = document.querySelectorAll('[data-lcs-line]').length;
          if (lv === 3 ? lines !== 3 : lines) fails.push(lines + ' writing lines on level ' + lv);
          if (!isKey && document.querySelector('[data-lcs-draw] img')) fails.push('a box to draw in is filled');
        }
        return fails;
      });
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small. One picture of
 *  the six to sort and the three places of the page as pictures to circle: the first text's picture (only the first text
 *  tells it), both texts' pictures (both tell it), the second text's picture (only the second). The level-1 page glues it
 *  into its place; the level-2 page draws one thing for each place. THE TEACHER READS: a card prints no word; the two
 *  texts, the name of the picture and the question stand on the card's root as data-lcs-teacher-reads (the key and the
 *  teacher pages print them, the child's form never does). Every card carries its pair of texts as data-lcs-text. A
 *  picture whose thing is the picture of a text is not taken (an apple beside the apple tree's picture is matched by
 *  its look). FORMS (review en.review-1119-read): one pair a form (CHECK_PAIR); every card carries "pair|thing" as
 *  data-lcs-text and its place, one text or both, as data-lcs-sortkind, so a part takes a one-text card AND a both card.
 *  The teacher names each text by its picture ("Text 1, The Daytime Sky, with the sun picture"), and the question says
 *  what the card shows: "circle the box with both pictures" for both. */
/** the pair of texts of each form of the unit check (review en.review-1119-read: no text in both forms); neither pair shares
 *  its topic with a text of the OTHER form of the unit (the sky; the pets beside the Dogs text of form B) */
const CHECK_PAIR = { A: 'two-skies', B: 'two-pets' };
/** the two pictures of each form's part (review en.review-1119-read2: owl means night and mouse means cat to a child who did
 *  not listen): a thing only one text tells that world knowledge does not place — the rainbow is in the daytime text only,
 *  the mail truck in the dog text only — and a thing both texts tell (the airplane flies by day AND by night; both pets sleep
 *  in a soft bed). The rainbow also keeps the butterfly, the owl and the stars, answers and pictures of the form's other
 *  parts, off this part. */
const CHECK_PICS = { A: ['rainbow', 'airplane'], B: ['mail_truck', 'bed'] };
/** the form a check page is built for: build-checks seeds its pages "check|<unit>|A…" or "…|B…"; none outside a check */
const checkFormOf = (ctx) => { const m = /^check\|[^|]+\|([AB])\d*\|/.exec(String((ctx && ctx.rng && ctx.rng.seed) || '')); return m ? m[1] : null; };
function twoTextsCheckPage({ difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`two-texts-k check: the fact texts are English texts (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const att = (s) => esc(s).replace(/"/g, '&quot;');
  // (the card shows each text by its picture only: the teacher names it — "Text 1, The Daytime Sky, with the sun picture")
  const told = (t) => `${t.title}, with the ${t.picture.noun.replace(/_/g, ' ')} picture: ${t.sentences.join(' ')}`;
  const form = checkFormOf(ctx);
  const cards = [];
  for (const p of shuffle(PAIRS.filter((x) => !form || x.id === CHECK_PAIR[form]), rng)) {
    const heads = [['a', [p.a.picture]], ['both', [p.a.picture, p.b.picture]], ['b', [p.b.picture]]];
    const sorted = [...p.onlyA.map((c) => ['a', c]), ...p.both.map((c) => ['both', c]), ...p.onlyB.map((c) => ['b', c])].filter(([, c]) => c.noun !== p.a.picture.noun && c.noun !== p.b.picture.noun);
    for (const [where, c] of (form ? CHECK_PICS[form].map((n) => sorted.find(([, x]) => x.noun === n)) : shuffle(sorted, rng))) {
      // (the "both" place is ONE box that shows both pictures: the direction names that box; review en.review-1119-read)
      const reads = 'Text 1, ' + told(p.a) + ' Text 2, ' + told(p.b) + ` Look at the ${c.label}. Which text tells about it? Circle that text's picture. If both texts tell about it, circle the box with both pictures.`;
      const opts = heads.map(([k, pics]) => `<span data-lcs-place="${k}" data-lcs-choice="${k}"${k === where ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;align-items:center;gap:4px;padding:5px 9px;border:3px solid ${key && k === where ? T.teal : 'transparent'};border-radius:18px;background:#FFFFFF">${pics.map((x) => img(x, 72)).join('')}</span>`).join('');
      // (the text id names the pair AND the picture: a form's part takes two pictures of its one pair, one that only one text
      // tells about and one that both do)
      cards.push(`<div data-lcs-text="${att(p.id + '|' + c.noun)}" data-lcs-sortkind="${where === 'both' ? 'both' : 'one'}" data-lcs-teacher-reads="${att(reads)}" style="display:flex;align-items:center;gap:18px;padding:2px 4px">` +
        `<span data-lcs-sortpic="${esc(pk(c))}" style="flex:0 0 auto;display:inline-flex;padding:6px;border:2.5px dashed ${T.ink};border-radius:8px;background:#FFFFFF">${img(c, 84)}</span>` +
        `<div data-lcs-places style="flex:1 1 auto;display:flex;justify-content:space-around;align-items:center">${opts}</div></div>`);
    }
  }
  return { bodyHtml: `<div data-lcs-twotextscheck="${lv}"${key ? ' data-lcs-iskey="1"' : ''}>` + checkGrid(cards, { cols: 1 }) + `</div>`, meta: {} };
}

module.exports = { makeTwoTextsKType, faultsOf, PAIRS, LEVELS };
