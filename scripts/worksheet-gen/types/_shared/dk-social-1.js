/**
 * dk-social-1.js — Batch S1 (Daily Teaching System Stage D-5, 2026-11-24): the Grade 1 social studies pages the English
 * year design (scripts/units/year/design.en.social.json, grade "1") needs:
 *   G1-653 s1-rules       Rules in Different Places              (feelings, D2.Civ.3.K-2)
 *   G1-654 s1-citizen     Being a Good Citizen                   (feelings, D2.Civ.7.K-2)
 *   G1-655 s1-leaders     Leaders and Their Jobs                 (science-match, D2.Civ.1.K-2)
 *   G1-656 s1-postcard    Clues in an Old Postcard               (family, D2.His.11.K-2)
 *   G1-657 s1-interview   Ask Someone Older                      (family, D2.His.10.K-2; a record page)
 *   G1-658 s1-thennow     School and Play Long Ago and Today     (family, D2.His.4.K-2)
 *   G1-659 s1-communities City, Suburb and Small Town            (maps, D2.Geo.8.K-2)
 *   G1-660 s1-landwork    Work That Fits the Land                (maps, D2.Geo.9.K-2)
 *   G1-661 s1-park        Caring for Our Park                    (recycling, D2.Geo.5.K-2; a change of K-395 / G1-413)
 *   G1-662 s1-symbols     Symbols of the United States           (write-the-word, D2.Civ.8.K-2)
 *   G1-663 s1-sources     Sources About Two Presidents           (write-the-word, D2.His.9.K-2)
 *   G1-664 s1-july4       Why We Have the Fourth of July         (reading-comprehension, D2.His.14.K-2)
 *   G1-665 s1-fairer      People Who Made Life Fairer            (feelings, D2.His.3.K-2; a record page with true facts)
 *   G1-666 s1-goods       Goods and Services                     (science-sort, D2.Eco.4.K-2)
 *   G1-667 s1-jobs        Jobs and Earning Money                 (science-match, D2.Eco.6.K-2)
 *   G1-668 s1-saving      Saving for a Goal                      (money, D2.Eco.10.K-2)
 *   G1-669 s1-meeting     Our Class Meeting                      (feelings, D2.Civ.9.K-2; the teacher-led lesson's page)
 *   G1-670 s1-market      Prices at the Market                   (money, D2.Eco.5.K-2; en-1-036; review round 1, in
 *                         place of the G2-472 alias: real US coins at their real sizes, exactly one set pays each price)
 * English (American) only; themeless; PDF only. Built on the Batch K CSS and page check (dk-kinder.js), the Grade 1 kit
 * (dk-g1.js: writing rows, sentence frames, one-answer groups) and the Batch SK figure, palette and page checks
 * (dk-social-k.js, dk-social-k-art.js). None of those files is edited: this file has its OWN modes table.
 *
 * Grade 1 reads a little: the teacher reads the instruction (a level prints its own, i18n/level-instructions.json);
 * short sentences, labels and word banks are printed; Level 3 writes on a sentence frame. Numbers within 120.
 * CLOSED items carry their one answer as data-dk-answer (never printed; the gate qa/verify-dk-social-1.js re-derives
 * each from its own tables); RECORD parts (the interview, the class meeting, the questions to a person, the frames) hold
 * no answer. Drawings: types/_shared/dk-social-1-art.js (every colour in its PAL1). Library pictures: colour only, through
 * resolve.fileUri at BUILD time (never while the module loads). Bank: data/social/dk-social-1.js.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const DK = require('./dk-kinder.js');
const G = require('./dk-g1.js');
const SK = require('./dk-social-k.js');
const KA = require('./dk-social-k-art.js');
const A = require('./dk-social-1-art.js');
const B = require('../../data/social/dk-social-1.js');
const BK = require('../../data/social/dk-social-k.js');

const T = TOK.color;
const W = 675;
const { box, tile, drawBox, labelledDraw, chip, head, col, row, grow, writeRow, lineBox, frameLine, numBox, esc, f1 } = G.kit;
const { patterned, derange, placesFor } = DK;
const MODES = {};

/* ================================================================ the layout kit */
const S1CSS = `
.g1-chip{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:2px 11px;font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;line-height:20px;color:${T.teal};white-space:nowrap}
.g1-text{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
.g1-small{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:14px;line-height:17px;color:${T.ink};text-align:center}
.s1-text{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:normal}
.s1-sm{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;line-height:18px;color:${T.ink};white-space:normal;text-align:center}
.s1-q{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:19px;line-height:23px;color:${T.teal};white-space:nowrap}
.s1-pick{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:3px 13px;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
.s1-sent{box-sizing:border-box;display:flex;align-items:center;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF;padding:6px 14px;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink}}
.s1-letter{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:30px;line-height:30px;color:${T.teal}}
.sk-or{font-family:'Baloo 2',cursive;font-weight:700;font-size:20px;color:${T.inkSoft}}
`;
/** an svg drawing (a Batch SK style drawing: the lint leaves its colours to this batch's gate, which holds them to PAL1) */
const scene = (body, w, h, vb, attrs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" style="display:block;overflow:hidden" data-lcs-prim="sk-art"${attrs ? ' ' + attrs : ''}>${body}</svg>`;
const pic = (p, w, h = w) => `<img class="ws-icon" data-dk-pic="${esc(p.theme + '/' + p.noun)}" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${w}px;height:${h}px;display:block;object-fit:contain">`;
const txt = (t, w, attrs = '', cls = 's1-text') => `<span class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''} style="width:${typeof w === 'number' ? w + 'px' : w}">${esc(t)}</span>`;
const q = (t, attrs = '') => `<span class="s1-q" data-dk-box${attrs ? ' ' + attrs : ''}>${esc(t)}</span>`;
const pick = (t, answer, attrs = '', inner = '') => `<span class="s1-pick" data-dk-box data-s1-pick="${esc(t)}"${answer ? ` data-dk-answer="${answer}"` : ''}${attrs ? ' ' + attrs : ''}>${inner}${esc(t)}</span>`;
const orSep = '<span class="sk-or" data-dk-box>or</span>';
/** a white tile of sentence frames on writing lines (one frame per line); parts as dk-g1 frameLine */
const frames = (lines, attrs = '', w = W, rowH = 50) => box('dk-tile dk-tile--white', w, 'auto', col(lines.map((l) => frameLine(l, rowH)).join(''), 4, 'align-items:flex-start'), 'data-g1-frames="1"' + (attrs ? ' ' + attrs : ''), 'padding:6px 14px;justify-content:flex-start;flex-shrink:0');
/** n writing lines, full width (a written answer) */
const lines = (n, w, h = 46, attrs = '') => col(Array.from({ length: n }, () => lineBox(w, h)).join(''), 2, 'align-items:flex-start' + (attrs ? '' : ''));
const dot = (attrs = '') => `<span class="dk-dot" data-dk-box${attrs ? ' ' + attrs : ''}></span>`;
const cast = (n, rng, opts) => SK.cast(n, rng, opts);

/* ================================================================ answer places, splits, orders (no tell) */
/** which of 2 places holds the right answer in each of n rows (the SK rule: random, never all alike from 3, never a
 *  pattern from 4) */
const sides = (n, rng) => SK.sides(n, rng);
/** the right column's order of a match: 3+ rows a derangement; 2 rows straight across half the time (SK review ruling) */
const rightOrder = (n, rng) => (n >= 3 ? derange(n, rng) : n === 2 ? (rng.next() < 0.5 ? [0, 1] : [1, 0]) : [0]);
/** an order of two kinds a child could read off: all alike, or taking turns (from 4); from 6 also one block then the
 *  other. (Refusing one-block orders in a row of 4 or 5 would keep a lone item off both ends: a tell of its own.) */
function badOrder(bits) {
  const s = bits.map((b) => (b ? 1 : 0)).join('');
  if (/^(1+|0+)$/.test(s)) return true;
  if (s.length >= 4 && (/^(10)+1?$/.test(s) || /^(01)+0?$/.test(s))) return true;
  if (s.length >= 6 && (/^1+0+$/.test(s) || /^0+1+$/.test(s))) return true;
  return false;
}
/** a split of n items into two kinds: one of `splits` (counts of kind A) taken evenly, the order never one a child reads */
function splitOrder(aItems, bItems, n, splits, rng) {
  const k = rng.pick(splits);
  for (let t = 0; t < 400; t++) {
    const set = [...rng.sample(aItems, k).map((x) => [x, true]), ...rng.sample(bItems, n - k).map((x) => [x, false])];
    const o = rng.shuffle(set);
    if (n >= 3 && badOrder(o.map((x) => x[1]))) continue;
    return o.map((x) => x[0]);
  }
  throw new Error('dk-social-1: no order for a split of ' + n);
}

/** the order of a word box: never the order the cards ask for the words (a child would copy them down in that order) */
function wordOrder(set, rng) { for (let t = 0; t < 200; t++) { const o = rng.shuffle(set); if (o.some((x, i) => x !== set[i])) return o; } return set.slice().reverse(); }

/* ================================================================ the match layout (a line from each left dot) */
function matchRows(lefts, rights, lw, rw, h, gapMid = 100, rowFlex = 'flex:1 1 0;min-height:0') {
  const n = Math.max(lefts.length, rights.length), out = [];
  for (let i = 0; i < n; i++) {
    const L = lefts[i], R = rights[i];
    out.push(`<div class="dk-row" style="gap:0;justify-content:space-between;width:${W}px;${rowFlex}">` +
      row(tile(L.html, lw, h, `data-s1-key="${L.key}" data-dk-answer="${L.partner}"`, 'white') + dot(`data-s1-dot="L${i}"`), 10) +
      `<span style="flex:1 1 auto;min-width:${gapMid}px"></span>` +
      row(dot(`data-s1-dot="R${i}"`) + tile(R.html, rw, h, `data-s1-key="${R.key}" data-s1-right="1"`, 'white'), 10) + '</div>');
  }
  return out.join('');
}

/** the match laid out top to bottom (review round 1, G1-667: the worker pictures were an inch wide at the far right while
 *  the sentence cards ran four inches, mostly empty): the left items in a row on top, a dot under each; the right items in a
 *  row below, a dot over each. The same marks as matchRows (data-s1-key / data-dk-answer / data-s1-right / the dots). */
function matchCols(tops, bottoms, tw, bw, bh, gapMid = 56) {
  const topRow = `<div class="dk-row" style="gap:0;justify-content:space-between;width:${W}px;align-items:stretch;flex:0 0 auto">` + tops.map((T, i) => col(tile(T.html, tw, 'auto', `data-s1-key="${T.key}" data-dk-answer="${T.partner}"`, 'white', 'padding:6px 0;flex:1 1 auto') + dot(`data-s1-dot="L${i}"`), 8, 'align-items:center')).join('') + '</div>';
  const botRow = `<div class="dk-row" style="gap:0;justify-content:space-between;width:${W}px;flex:0 0 auto">` + bottoms.map((Bt, i) => col(dot(`data-s1-dot="R${i}"`) + tile(Bt.html, bw, bh, `data-s1-key="${Bt.key}" data-s1-right="1"`, 'white'), 8, 'align-items:center')).join('') + '</div>';
  return topRow + `<span style="display:block;height:${gapMid}px;flex:0 0 auto"></span>` + botRow;
}

/* ================================================================ G1-653 rules in different places */
MODES['s1-rules'] = function rules(d, rng) {
  let set;
  if (d.n === 2) { for (let t = 0; t < 200; t++) { set = rng.sample(B.RULES, 2); if (!B.RULE_CONFUSABLE.some(([a, b]) => set.some((r) => r.place === a) && set.some((r) => r.place === b))) break; } } else set = rng.shuffle(B.RULES);
  const ro = rightOrder(set.length, rng), looks = cast(3 * set.length, rng);
  const h = d.n === 2 ? 320 : d.frame ? 128 : 166, lw = d.n === 2 ? 240 : 270, rw = d.n === 2 ? 330 : Math.max(172, Math.round((h - 34) * 200 / 140) + 10), ic = d.n === 2 ? 96 : Math.min(76, h - 26);
  const lefts = set.map((r) => ({ key: r.id, partner: r.place, html: row(scene(A.clueIcon(r.clue), ic, ic, '0 0 100 100', `data-s1-art="clue:${r.clue}"`) + txt(r.text, lw - ic - 30, `data-s1-rule="${r.id}"`), 8, 'width:100%;padding:0 6px;justify-content:flex-start') }));
  const rights = ro.map((j) => set[j]).map((r, i) => ({ key: r.place, html: col(scene(A.placeScene(r.place, looks.slice(3 * i, 3 * i + 3)), rw - 10, h - 34, '0 0 200 140', `data-s1-art="place:${r.place}"`) + txt(B.PLACE_WORD[r.place], rw - 10, `data-s1-placeword="${r.place}"`, 's1-sm'), 2) }));
  let html = matchRows(lefts, rights, lw, rw, h, 40, d.frame || d.n === 2 ? 'flex:0 0 auto' : 'flex:1 1 0;min-height:0');
  if (d.frame) html += box('dk-tile dk-tile--white', W, 'auto', col(row(pic(B.PLAYGROUND, 64) + q('A rule for the playground:'), 10, 'justify-content:flex-start') + frameLine(['We', 560], 50) + frameLine(['so that', 520, '.'], 50), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s1-frame="playground"', 'padding:6px 14px;justify-content:flex-start;flex:1 1 auto');
  return { html: grow(html, d.n === 2 ? 'gap:24px;justify-content:space-around' : 'gap:10px'), meta: { pairs: set.map((r) => r.id + '>' + r.place), right: ro.map((j) => set[j].place), items: set.map((r) => r.id) } };
};

/* ================================================================ G1-654 being a good citizen */
function virtuePicks(st, rng, at) {
  const wrong = rng.pick(B.VIRTUES.filter((v) => !st.defensible.includes(v)));
  const two = at === 0 ? [st.virtue, wrong] : [wrong, st.virtue];
  return `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="${st.id}:virtue" style="gap:14px;justify-content:flex-start">` +
    two.map((v) => pick(v, v === st.virtue ? 'right' : 'no', `data-s1-virtue="${v}"`, scene(A.virtueIcon(v), 26, 26, '0 0 40 40', `data-s1-art="virtue:${v}"`))).join('') + '</div>';
}
MODES['s1-citizen'] = function citizen(d, rng) {
  const set = d.n === 2 ? rng.sample(B.CITIZEN, 2) : rng.shuffle(B.CITIZEN);
  const at = sides(set.length, rng), vat = sides(set.length, rng);
  const SEX = { paint: 'f', alone: 'm', fish: null, ball: 'f' };
  // one cast for the whole page (three children a story), so the skin tones vary across the page, not story by story
  const sexes = set.flatMap((st) => [SEX[st.id] || (rng.next() < 0.5 ? 'f' : 'm'), rng.next() < 0.5 ? 'f' : 'm', rng.next() < 0.5 ? 'f' : 'm']);
  const all = cast(3 * set.length, rng, { sex: sexes });
  const bands = set.map((st, i) => {
    const k = all.slice(3 * i, 3 * i + 3);
    const story = txt(st.story, d.pictures ? W - 40 : 460, `data-s1-story="${st.id}"`);
    if (d.pictures) {
      const ph = 208, pw = Math.round(ph * 200 / 140);
      const two = [{ k: 'good', a: 'right' }, { k: 'not', a: 'no' }]; if (at[i]) two.reverse();
      const cards = two.map((c) => tile(scene(A.citizenArt(st.id, c.k, k), pw - 8, ph - 8, '0 0 200 140', `data-s1-art="citizen:${st.id}:${c.k}"`), pw, ph, `data-s1-choice="${c.k}" data-dk-answer="${c.a}"`, 'white'));
      return box('dk-tile', W, 'auto', col(story + `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="${st.id}" style="gap:16px">${cards[0]}${orSep}${cards[1]}</div>` + virtuePicks(st, rng, vat[i]), 6), `data-s1-band="${st.id}"`, 'flex:1 1 0;min-height:0;padding:6px 0');
    }
    const ph = d.more ? 112 : 128, pw = Math.round(ph * 200 / 140);
    const two = [{ t: st.good, a: 'right' }, { t: st.not, a: 'no' }]; if (at[i]) two.reverse();
    // the two choices one under the other (two long sentences side by side ran past the margin), the two words beside them
    const choices = `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="${st.id}" style="gap:6px;flex-direction:column;align-items:flex-start">${two.map((c) => pick(c.t, c.a, `data-s1-choice="${c.a === 'right' ? 'good' : 'not'}"`)).join('')}</div>`;
    const virt = virtuePicks(st, rng, vat[i]).replace('style="gap:14px;justify-content:flex-start"', 'style="gap:6px;flex-direction:column;align-items:flex-start"');
    return box('dk-tile', W, 'auto', row(tile(scene(A.citizenArt(st.id, 'setup', k), pw - 8, ph - 8, '0 0 200 140', `data-s1-art="citizen:${st.id}:setup"`), pw, ph, '', 'white') + col(story + row(choices + virt, 22, 'align-items:center;justify-content:flex-start'), 4, 'align-items:flex-start'), 12, 'justify-content:flex-start;padding:0 8px'), `data-s1-band="${st.id}"`, 'flex:1 1 0;min-height:0;padding:4px 0');
  });
  if (d.more) {
    const k = cast(1, rng);
    // review round 1: a larger picture, and TWO writing lines ("I would help my friend pick them up." does not fit one)
    bands.push(box('dk-tile dk-tile--white', W, 'auto', row(scene(A.citizenArt('crayons', 'setup', k), 166, 116, '0 0 200 140', 'data-s1-art="citizen:more"') + col(txt('One more: ' + B.CITIZEN_MORE.text, 470, 'data-s1-more="1"') + frameLine(['I would', 380], 46) + frameLine([440, '.'], 46), 2, 'align-items:flex-start'), 12, 'justify-content:flex-start;padding:0 10px'), 'data-g1-frames="1" data-s1-frame="more"', 'flex:0 0 auto;padding:4px 0'));
  }
  return { html: grow(bands.join(''), 'gap:8px'), meta: { items: set.map((s) => s.id), good: set.map((s, i) => s.id + ':' + (at[i] ? 'R' : 'L')) } };
};

/* ================================================================ G1-655 leaders and their jobs */
const leadPlace = (p, w, h) => (p === 'school' ? scene(A.schoolArt(), w, h, '0 0 100 100', 'data-s1-art="lead:school"') : p === 'town' ? scene(A.townArt(), w, h, '0 0 100 100', 'data-s1-art="lead:town"') : scene(A.usMap(Math.round(w * 1.6), Math.round(h * 1.6), p), w, h, `0 0 ${Math.round(w * 1.6)} ${Math.round(h * 1.6)}`, `data-s1-art="lead:${p}"`));
MODES['s1-leaders'] = function leaders(d, rng) {
  const set = d.n === 2 ? rng.sample(B.LEADERS, 2) : rng.shuffle(B.LEADERS);
  const ro = rightOrder(set.length, rng), looks = cast(set.length, rng);
  const h = d.n === 2 ? 322 : d.says ? 118 : d.frame ? 136 : 146, ah = h - 34, lw = d.n === 2 ? 250 : Math.max(ah + 12, 124), rw = d.n === 2 ? 310 : 250, la = Math.min(ah - 8, lw - 16);
  const lefts = set.map((l, i) => ({ key: l.id, partner: l.leads, html: col(scene(A.leaderArt({ skin: looks[i].skin, hair: looks[i].hair === 'hijab' ? 'bun' : looks[i].hair, hairColor: looks[i].hairColor, top: rng.pick(['navy', 'teal', 'purple', '#5A6470']) }), la, la, '0 0 100 100', `data-s1-art="leader:${l.id}"`) + chip(l.word, `data-s1-role="${l.id}"`), 2) }));
  const rights = ro.map((j) => set[j]).map((l) => ({ key: l.leads, html: col(leadPlace(l.leads, l.leads === 'state' || l.leads === 'country' ? Math.min(rw - 14, Math.round(ah * 1.45)) : ah, ah) + txt(B.LEAD_WORD[l.leads], rw - 12, `data-s1-leadword="${l.leads}"`, 's1-sm'), 0) }));
  let html = matchRows(lefts, rights, lw, rw, h, 50, d.says || d.frame || d.n === 2 ? 'flex:0 0 auto' : 'flex:1 1 0;min-height:0');
  if (d.says) {
    // the sentences in their own order (never the order of the leader cards above)
    let saysOrder = rng.shuffle(set); for (let t = 0; t < 50 && saysOrder.every((x, i) => x === set[i]); t++) saysOrder = rng.shuffle(set);
    const at = placesFor(set.length, 2, rng);
    html += box('dk-tile dk-tile--white', W, 'auto', col(q('Who says it? Circle.') + saysOrder.map((l, i) => { const other = rng.pick(B.LEADERS.filter((x) => x.id !== l.id)); const two = at[i] === 0 ? [l, other] : [other, l]; return `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="says:${l.id}" style="gap:12px;justify-content:flex-start;width:${W - 28}px">${txt('“' + l.says + '”', 300)}${two.map((x) => pick(x.word, x.id === l.id ? 'right' : 'no', `data-s1-says="${x.id}"`)).join('')}</div>`; }).join(''), 6, 'align-items:flex-start'), 'data-s1-says="1"', 'padding:6px 14px;flex:1 1 auto;justify-content:flex-start');
  }
  if (d.frame) html += box('dk-tile dk-tile--white', W, 'auto', col(frameLine(['A mayor helps a town by', 380], 50) + lineBox(W - 28, 50), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s1-frame="mayor"', 'padding:6px 14px;flex:1 1 auto;justify-content:flex-start');
  return { html: grow(html, d.n === 2 ? 'gap:24px;justify-content:space-around' : 'gap:10px'), meta: { pairs: set.map((l) => l.id + '>' + l.leads), right: ro.map((j) => set[j].leads), items: set.map((l) => l.id) } };
};

/* ================================================================ G1-656 clues in an old postcard */
// review round 1: "Who made it?" let a child argue for the shop on the sign (a diner had cards printed of itself): the
// questions ask about the PHOTO, whose maker, year and town the back prints in the photo line
const QWORD = { who: 'Who took the photo?', when: 'When was the photo taken?', where: 'Where was the photo taken?' };
const CLUE_OF = { who: 'studio', when: 'date', where: 'studio' };
MODES['s1-postcard'] = function postcard(d, rng) {
  const pc = rng.pick(B.POSTCARDS);
  const qs = d.q === 2 ? rng.sample(B.POSTCARD_QUESTIONS, 2) : B.POSTCARD_QUESTIONS.slice();
  const k = cast(3, rng);
  // the two sides one above the other on the left, large (the back's words print at about 17 px), the questions beside them
  // review round 1: levels 1-2 had 1.7 inches of empty page: the card's two sides are larger (500 px) and the question
  // cards fill the column beside them (the questions and choices wrap inside it)
  const cw = d.frame ? 400 : 516, chh = Math.round(cw * 210 / 320), wrapQ = !d.frame;
  // level 1: the clues the asked questions need are ringed in color on the card (the sign is a clue too: it shows where)
  const ring = (side) => { if (!d.rings) return ''; const R = []; const need = new Set(qs.map((x) => CLUE_OF[x])); if (side === 'back' && need.has('studio')) R.push('<rect x="5" y="43" width="158" height="70" rx="24" fill="none" stroke="#F2784B" stroke-width="3.6" data-s1-ring="studio"/>'); if (side === 'back' && need.has('date')) R.push('<circle cx="226" cy="74" r="36" fill="none" stroke="#F2784B" stroke-width="3.6" data-s1-ring="date"/>'); return R.join(''); };
  const cards = col(head('the front') + scene(A.postcardFront(pc, k) + ring('front'), cw, chh, '0 0 320 210', 'data-s1-art="postcard:front"') + head('the back') + scene(A.postcardBack(pc) + ring('back'), cw, chh, '0 0 320 210', 'data-s1-art="postcard:back"'), 2, 'align-items:flex-start');
  const choicesOf = (x) => (x === 'who' ? [pc.studio, pc.shop, pc.town] : x === 'when' ? [String(pc.year), ...rng.sample(pc.otherYears, 2).map(String)] : [pc.town, ...rng.sample(pc.otherTowns, 2)]);
  const at = placesFor(qs.length, 3, rng);
  const qw = W - cw - 12;
  const qTxt = (x) => (wrapQ ? `<span class="s1-q" data-dk-box data-s1-question="${x}" style="white-space:normal;text-align:center;width:${qw - 20}px">${esc(QWORD[x])}</span>` : q(QWORD[x], `data-s1-question="${x}"`));
  const pickStyle = wrapQ ? ` style="white-space:normal;text-align:center;width:${qw - 22}px;font-size:18px;line-height:22px;padding:6px 8px"` : '';
  const rows = qs.map((x, i) => { const [right, ...others] = choicesOf(x); const ch = rng.shuffle(others); ch.splice(at[i], 0, right); return box('dk-tile', qw, 'auto', col(qTxt(x) + `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="${x}" style="gap:8px;flex-direction:column">${ch.map((c) => pick(c, c === right ? 'right' : 'no', `data-s1-choice="${esc(c)}"${pickStyle}`)).join('')}</div>`, 6), `data-s1-q="${x}"`, 'flex:0 0 auto;padding:8px 0'); });
  let html = row(cards + col(rows.join(''), 12, `width:${qw}px;align-self:stretch;justify-content:space-around`), 12, 'align-items:stretch');
  if (d.frame) html += frames([['In ' + pc.year + ', people', 420], [W - 40]], 'data-s1-frame="life"');
  return { html: grow(html, 'gap:10px'), meta: { card: pc.town + '|' + pc.year, asks: qs, items: qs.map((x) => x + ':' + choicesOf(x)[0]) } };
};

/* ================================================================ G1-657 ask someone older (a record page) */
MODES['s1-interview'] = function interview(d, rng) {
  const qs = d.q === 2 && !d.own ? rng.sample(B.INTERVIEW, 2) : d.own ? rng.sample(B.INTERVIEW, 2) : B.INTERVIEW.slice();
  const nameRow = box('dk-tile dk-tile--white', W, 'auto', frameLine(['The older person I asked:', 380], 50), 'data-s1-name="1" data-g1-frames="1"', 'padding:4px 14px;justify-content:flex-start;flex-shrink:0');
  // review round 1: the picture clues larger (about 0.9 inch at level 1, where the child leans on them)
  const cs = d.draw ? 86 : 64;
  const qhead = (x) => row(scene(A.interviewClue(x.clue), cs, cs, '0 0 100 100', `data-s1-art="clue:${x.clue}"`) + q(x.q, `data-s1-asked="${x.id}"`), 10, 'justify-content:flex-start');
  const parts = [nameRow];
  // level 1: the question on its own line, the (larger) picture clue beside the drawing box
  if (d.draw) for (const x of qs) parts.push(box('dk-tile', W, 'auto', col(q(x.q, `data-s1-asked="${x.id}"`) + row(scene(A.interviewClue(x.clue), cs, cs, '0 0 100 100', `data-s1-art="clue:${x.clue}"`) + col(labelledDraw(W - 28 - cs - 12, 'auto', 'draw the answer', `data-dk-prompt="${x.id}"`, '', 17).replace('height:auto;', 'height:auto;flex:1 1 auto;min-height:236px;'), 0, 'align-self:stretch;flex:1 1 auto'), 12, 'align-items:flex-start;width:100%;flex:1 1 auto'), 4, 'align-items:flex-start;height:100%'), `data-s1-qbox="${x.id}"`, 'flex:1 1 0;min-height:0;padding:6px 14px;align-items:stretch'));
  else for (const x of qs) parts.push(box('dk-tile', W, 'auto', col(qhead(x) + lines(d.write ? 1 : 2, W - 28, d.write ? 50 : 46), 2, 'align-items:flex-start'), `data-s1-qbox="${x.id}"`, 'flex:0 0 auto;padding:4px 14px'));
  if (d.write) parts.push(col(labelledDraw(W - 20, 'auto', 'draw one answer', 'data-dk-prompt="one-answer"', '', 17).replace('height:auto;', 'height:auto;flex:1 1 auto;min-height:230px;'), 0, 'flex:1 1 auto;min-height:0;align-self:stretch;align-items:center'));
  if (d.own) {
    // the child's own question asks about the past too (review round 1)
    parts.push(box('dk-tile', W, 'auto', col(row(scene(A.interviewClue('ask'), cs, cs, '0 0 100 100', 'data-s1-art="clue:ask"') + q('My own question:'), 10, 'justify-content:flex-start') + frameLine(['When you were little,', W - 270, '?'], 50) + lineBox(W - 28, 46), 2, 'align-items:flex-start'), 'data-s1-qbox="own" data-g1-frames="1"', 'flex:0 0 auto;padding:4px 14px'));
    parts.push(box('dk-tile dk-tile--white', W, 'auto', col(frameLine(['I learned that', 500], 52) + lineBox(W - 28, 52), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s1-frame="learned"', 'padding:6px 14px;flex:1 1 auto;justify-content:flex-start'));
  }
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: 1, items: qs.map((x) => x.id), asks: qs.map((x) => x.id) } };
};

/* ================================================================ G1-658 school and play long ago and today */
const timePicks = (id, time) => `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="${id}" style="gap:6px">${['long ago', 'today'].map((t) => pick(t, t === time ? 'right' : 'no', `data-s1-time="${t}" style="font-size:15px;padding:2px 9px"`)).join('')}</div>`;
MODES['s1-thennow'] = function thenNow(d, rng) {
  const P = splitOrder(B.THEN_NOW_PICS.filter((x) => x.time === 'long ago'), B.THEN_NOW_PICS.filter((x) => x.time === 'today'), 4, [1, 2, 3], rng);
  const looks = cast(4, rng);
  const big = !d.sentences, cw = 330, ph = big ? 236 : d.frame ? 130 : 150;
  const card = (x, i) => tile(col((x.pic ? pic(x.pic, ph, ph) : scene(A.thenNowArt(x.id, { ...looks[i], other: looks[(i + 1) % 4] }), ph, ph, '0 0 100 100', `data-s1-art="then:${x.id}"`)) + txt(x.word, cw - 10, `data-s1-word="${x.id}"`, 's1-sm') + timePicks(x.id, x.time), 4), cw, 'auto', `data-s1-card="${x.id}"`, 'white', 'padding:6px 0;flex:1 1 auto');
  const grid = col(row(card(P[0], 0) + card(P[1], 1), 14, 'align-items:stretch;flex:1 1 0') + row(card(P[2], 2) + card(P[3], 3), 14, 'align-items:stretch;flex:1 1 0'), 10, 'flex:1 1 auto;min-height:0');
  const parts = [grid];
  let S = [];
  if (d.sentences) {
    // review round 2: never both halves of a pair on one page (a picture and the sentence about the same thing): the
    // sentences of the pictures dealt are left out, and the split is one the sentences left can make
    const dealt = new Set(P.map((x) => x.id)), free = B.THEN_NOW_SENTENCES.filter((x) => !dealt.has(x.pair));
    const ago = free.filter((x) => x.time === 'long ago'), now = free.filter((x) => x.time === 'today');
    S = splitOrder(ago, now, d.sentences, [1, 2].filter((k) => k <= ago.length && d.sentences - k <= now.length), rng);
    parts.push(box('dk-tile', W, 'auto', col(q('A child said:') + S.map((x) => `<div class="dk-row" style="gap:12px;justify-content:space-between;width:${W - 28}px">${txt('“' + x.text + '”', 430, `data-s1-sentence="${x.id}"`)}${timePicks(x.id, x.time)}</div>`).join(''), 8, 'align-items:flex-start'), 'data-s1-sentences="1"', 'flex:0 0 auto;padding:6px 14px;justify-content:flex-start'));
  }
  if (d.frame) parts.push(frames([['I would like to go to school', `<pick>`, 'because'], [W - 40]].map((l) => l), 'data-s1-frame="like"').replace(/<span class="g1-text" data-dk-box style="padding-bottom:\d+px">&lt;pick&gt;<\/span>/, `<span data-dk-box style="display:flex;gap:6px;padding-bottom:4px">${pick('long ago', null, 'data-s1-like="long ago"')}${pick('today', null, 'data-s1-like="today"')}</span>`));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { items: [...P.map((x) => x.id + ':' + x.time), ...S.map((x) => x.id + ':' + x.time)] } };
};

/* ================================================================ G1-659 city, suburb and small town */
MODES['s1-communities'] = function communities(d, rng) {
  const comms = rng.shuffle(d.comms === 2 ? rng.sample(B.COMMUNITIES, 2) : B.COMMUNITIES);
  const letters = ['A', 'B', 'C'];
  const look = cast(3, rng);
  const cw = comms.length === 2 ? 330 : 216, chh = Math.round((cw - 8) * 140 / 200);
  const cards = row(comms.map((c, i) => tile(col(row(`<span class="s1-letter" data-dk-box data-s1-letter="${letters[i]}">${letters[i]}</span>` + txt(c.word, 150, `data-s1-comm="${c.id}"`, 's1-text'), 8) + scene(A.communityArt(c.id, look), cw - 8, chh, '0 0 200 140', `data-s1-art="community:${c.id}"`), 2), cw, 'auto', `data-s1-key="${c.id}"`, 'white', 'padding:4px 0')).join(''), 12);
  const pool = B.COMMUNITY_SENTENCES.filter((s) => comms.some((c) => c.id === s.place));
  let S;
  for (let t = 0; t < 400; t++) {
    S = rng.sample(pool, d.sentences);
    if (new Set(S.map((s) => s.place)).size < comms.length) continue;
    const seq = S.map((s) => s.place);
    if (seq.some((p, i) => i >= 2 && p === seq[i - 1] && p === seq[i - 2])) continue;
    if (d.sentences >= 6 && seq.join() === [...seq].sort().join()) continue;
    break;
  }
  const letterOf = (p) => letters[comms.findIndex((c) => c.id === p)];
  const rows = S.map((s, i) => `<div class="dk-row" data-dk-box data-dk-item="${s.id}" style="gap:12px;justify-content:flex-start;width:${W - 28}px">${txt((i + 1) + '. ' + s.text, 520, `data-s1-sentence="${s.id}"`)}${numBox(56, 46, `data-s1-write="${s.id}" data-dk-answer="${letterOf(s.place)}"`)}</div>`);
  const parts = [cards, box('dk-tile', W, 'auto', col(q('Write the letter of the place.') + rows.join(''), 8, 'align-items:flex-start;align-self:stretch;justify-content:space-evenly'), 'data-s1-sentences="1"', 'flex:1 1 auto;padding:8px 14px')];
  if (d.frame) parts.push(frames([['I live in a', 300, '.'], ['We get food from', 360, '.']], 'data-s1-frame="me"'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { order: comms.map((c) => c.id), items: S.map((s) => s.id + ':' + letterOf(s.place)) } };
};

/* ================================================================ G1-660 work that fits the land */
MODES['s1-landwork'] = function landWork(d, rng) {
  const set = d.n === 2 ? rng.sample(B.LAND_WORK, 2) : rng.shuffle(B.LAND_WORK);
  const ro = rightOrder(set.length, rng), looks = cast(set.length + 1, rng);
  const h = d.n === 2 ? 332 : d.frame ? 132 : 166, ah = h - 30, lw = d.n === 2 ? 240 : 250, rw = d.n === 2 ? 330 : Math.round(ah * 200 / 140) + 12, wa = Math.min(ah, lw - 16), la2 = d.n === 2 ? Math.min(ah, Math.round((rw - 12) * 140 / 200)) : ah;
  const lefts = set.map((x, i) => ({ key: x.id, partner: x.land, html: col(scene(A.workerArt(x.id, { skin: looks[i].skin, hair: 'short', hairColor: looks[i].hairColor, kidSkin: looks[set.length].skin }), wa, wa, '0 0 100 100', `data-s1-art="worker:${x.id}"`) + txt(x.worker, lw - 10, `data-s1-workerword="${x.id}"`, 's1-sm'), 0) }));
  const rights = ro.map((j) => set[j]).map((x) => ({ key: x.land, html: col(scene(A.landArt(x.land), rw - 12, la2, '0 0 200 140', `data-s1-art="land:${x.land}"`) + txt(x.land_word, rw - 12, `data-s1-landword="${x.land}"`, 's1-sm'), 0) }));
  let html = matchRows(lefts, rights, lw, rw, h, 40, d.frame || d.n === 2 ? 'flex:0 0 auto' : 'flex:1 1 0;min-height:0');
  // review round 1: the frame names the place ("here" did not say which picture the child meant); review round 2: "Place:"
  // on a line of its own (a child copying "At the forest" or "At the flat farmland" wrote English nobody says: we say
  // IN the forest, ON the farmland), then the rest of the frame in natural English
  if (d.frame) html += box('dk-tile dk-tile--white', W, 'auto', col(frameLine(['Place:', 330], 48) + frameLine(['People can', 300, 'there'], 48) + frameLine(['because the land has', 330, '.'], 48), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s1-frame="land"', 'padding:6px 14px;flex:1 1 auto;justify-content:flex-start');
  return { html: grow(html, 'gap:10px'), meta: { pairs: set.map((x) => x.id + '>' + x.land), right: ro.map((j) => set[j].land), items: set.map((x) => x.id) } };
};

/* ================================================================ G1-661 caring for our park */
MODES['s1-park'] = function park(d, rng) {
  const changes = rng.sample(B.PARK_CHANGES.map((c) => c.id), d.changes);
  // six helpers' looks and the visitor's (k[6])
  const helpers = cast(7, rng);
  const pw = (w, h, st, attrs, vb = '0 0 260 120') => scene(A.parkArt(st, changes, helpers), w, h, vb, attrs);
  const parts = [];
  if (d.pics === 2) {
    // review round 1: the two pictures taller (1.4 inches of empty page were left under picture 2): a taller view of the
    // same park (more sky), full width
    const h = 330;
    parts.push(col(head('1. The park in the morning') + pw(W - 20, h, 'clean', 'data-s1-art="park:clean" data-s1-park="clean"', '0 -14 260 134'), 2, 'flex:1 1 0'));
    parts.push(col(head(`2. The park in the evening: circle ${d.changes} things people changed.`) + pw(W - 20, h, 'after', 'data-s1-art="park:after" data-s1-park="after"', '0 -14 260 134'), 2, 'flex:1 1 0'));
  } else {
    // review round 1: level 2 has no "Find the changes" box (it repeated the instruction): picture 1, the one the child
    // compares against, is larger and stands alone; level 3 keeps the schoolyard frame beside it
    const one = (w, h) => col(head('1. In the morning') + pw(w, h, 'clean', 'data-s1-art="park:clean" data-s1-park="clean"'), 2);
    parts.push(d.frame ? row(one(300, 138) + box('dk-tile dk-tile--white', 350, 'auto', col(q('Our schoolyard:') + frameLine(['Our class can', 200], 46) + lineBox(320, 44) + lineBox(320, 44), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s1-frame="schoolyard"', 'padding:4px 10px;justify-content:flex-start;align-self:stretch'), 12, 'align-items:stretch;justify-content:flex-start') : one(420, 194));
    const h = d.frame ? 238 : 226;
    parts.push(col(head(`2. In the evening: circle the ${d.changes} changes people made.`) + pw(W - 20, h, 'after', 'data-s1-art="park:after" data-s1-park="after"'), 2));
    parts.push(col(head('3. On clean-up day: circle each person who helps.') + pw(W - 20, h, 'cleanup', 'data-s1-art="park:cleanup" data-s1-park="cleanup"'), 2));
  }
  return { html: grow(parts.join(''), 'gap:8px;align-items:center'), meta: { changes, items: changes } };
};

/* ================================================================ G1-662 symbols of the United States */
/** the flag of the United States to its own proportions (BK.FLAG; Executive Order 10834), the colored model; the SK page
 *  check reads its data-sk-* marks (13 stripes, the canton over 7, 50 stars, 10 : 19) */
function flagSvg(FW) {
  const F = BK.FLAG, H = FW / F.fly, sh = H / 13, cw = F.cantonW * H, ch = 7 * sh;
  let s = '';
  for (let i = 0; i < 13; i++) s += `<rect x="0" y="${f1(i * sh)}" width="${f1(FW)}" height="${f1(sh)}" fill="${i % 2 === 0 ? F.red_ : '#FFFFFF'}" stroke="#3A3530" stroke-width="0.6" data-sk-stripe="${i % 2 === 0 ? 'red' : 'white'}"/>`;
  s += `<rect x="0" y="0" width="${f1(cw)}" height="${f1(ch)}" fill="${F.blue_}" stroke="#3A3530" stroke-width="0.6" data-sk-canton="1"/>`;
  const K = F.starD * H / 2, E = F.E * H, Gs = F.G * H;
  F.rows.forEach((cnt, r) => { for (let k = 0; k < cnt; k++) { const cx = cnt === 6 ? Gs * (2 * k + 1) : Gs * (2 * k + 2), cy = E * (r + 1); const pts = Array.from({ length: 10 }, (_, j) => { const a = -Math.PI / 2 + j * Math.PI / 5, rr = j % 2 ? K * 0.4 : K; return f1(cx + Math.cos(a) * rr) + ',' + f1(cy + Math.sin(a) * rr); }).join(' '); s += `<polygon points="${pts}" fill="#FFFFFF" data-sk-star="1"/>`; } });
  s += `<rect x="0" y="0" width="${f1(FW)}" height="${f1(H)}" fill="none" stroke="#3A3530" stroke-width="1.4"/>`;
  return scene(s, FW + 4, H + 4, `-2 -2 ${f1(FW + 4)} ${f1(H + 4)}`, 'data-sk-flag="model" data-s1-art="symbol:flag"');
}
const symbolPic = (s, px, maxW = 9999) => (s.id === 'flag' ? `<div data-dk-box style="height:${px}px;display:flex;align-items:center">${flagSvg(Math.min(Math.round(px * 1.3), maxW))}</div>` : s.id === 'bell' ? scene(A.libertyBell(), px, px, '0 0 100 100', 'data-s1-art="symbol:bell"') : pic(s.pic, px));
MODES['s1-symbols'] = function symbols(d, rng) {
  const set = d.n === 2 ? rng.sample(B.SYMBOLS, 2) : rng.shuffle(B.SYMBOLS);
  // level 1: two big symbols, each name traced three times (the card fills its half of the page)
  const cw = 330, px = d.n === 2 ? 320 : d.draw ? 108 : 170;
  const card = (s) => tile(col(symbolPic(s, px, cw - 24) + txt(s.clue, cw - 24, `data-s1-clue="${s.id}"`, 's1-sm') + (d.trace ? `<div data-dk-box data-s1-trace="${s.id}" data-dk-answer="${esc(s.name)}" style="line-height:0;display:flex;flex-direction:column;gap:10px">${writeRow(cw - 24, 78, s.name)}${writeRow(cw - 24, 78, s.name)}${writeRow(cw - 24, 78, s.name)}</div>` : `<div data-dk-box data-s1-write="${s.id}" data-dk-answer="${esc(s.name)}" style="line-height:0">${writeRow(cw - 24, 56)}</div>`), 4), cw, 'auto', `data-s1-card="${s.id}"`, 'white', 'padding:6px 0;flex:1 1 auto');
  const parts = [];
  if (d.box) parts.push(box('dk-tile dk-tile--white', W, 'auto', row(q('Word box:') + wordOrder(set, rng).map((s) => chip(s.name, `data-s1-bank="${s.id}"`)).join(''), 12), 'data-s1-wordbox="1"', 'padding:6px 0;flex-shrink:0'));
  // review round 1: levels 2-3 write each name on ONE LONG line (about 5 inches: "Statue of Liberty" in a Grade 1 hand needs
  // that much; the card's 3.2-inch line did not hold it): each symbol is a row, its picture on the left, the clue and the
  // line on the right
  const slot = d.draw ? 110 : 160, rpx = d.draw ? 80 : 122, lineW = W - slot - 40;
  const rowCard = (s) => tile(row(`<div data-dk-box style="width:${slot}px;height:${rpx}px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${symbolPic(s, rpx, slot - 8)}</div>` + col(txt(s.clue, lineW, `data-s1-clue="${s.id}"`) + `<div data-dk-box data-s1-write="${s.id}" data-dk-answer="${esc(s.name)}" style="line-height:0">${writeRow(lineW, 56)}</div>`, 6, 'align-items:flex-start'), 14, 'justify-content:flex-start;padding:0 10px'), W, 'auto', `data-s1-card="${s.id}"`, 'white', 'padding:6px 0;flex:1 1 auto');
  parts.push(set.length === 2 ? row(card(set[0]) + card(set[1]), 14, 'align-items:stretch;flex:1 1 auto') : col(set.map(rowCard).join(''), 10, 'flex:1 1 auto;min-height:0'));
  if (d.draw) parts.push(row(col(labelledDraw(320, 'auto', 'a symbol for our class', 'data-dk-prompt="class-symbol"', '', 17).replace('height:auto;', 'height:auto;flex:1 1 auto;min-height:232px;'), 0, 'align-self:stretch') + box('dk-tile dk-tile--white', 340, 'auto', col(frameLine(['It stands for', 200], 50) + lineBox(310, 50) + lineBox(310, 50), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s1-frame="symbol"', 'padding:6px 10px;justify-content:flex-start;align-self:stretch'), 14, 'align-items:stretch;flex-shrink:0'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { items: set.map((s) => s.id) } };
};

/* ================================================================ G1-663 sources about two presidents */
function sourcePic(s, px, look, maxW = 9999, ring1 = false) {
  if (s.id === 'painting') return scene(A.paintingArt(look), Math.round(px * 100 / 120), px, '0 0 100 120', 'data-s1-art="source:painting"');
  if (s.id === 'letter') return scene(A.letterArt(), Math.round(px * 100 / 120), px, '0 0 100 120', 'data-s1-art="source:letter"');
  if (s.id === 'memorial') { const mw = Math.min(Math.round(px * 1.2), maxW); return scene(A.memorialArt(), mw, Math.round(mw / 1.2), '0 0 120 100', 'data-s1-art="source:memorial"'); }
  // the quarter at its REAL size: 24.26 mm across = 91.7 px at 96 px to the inch. Review round 1: its FRONT and its BACK
  // (the eagle and "QUARTER DOLLAR") side by side, both at real size, so it reads as a quarter in black and white too;
  // level 1 adds a dotted ring of the same size to lay a real quarter on
  const d0 = Math.round(B.QUARTER_MM / 25.4 * 96 * 10) / 10;
  const side = (word, svg) => col(`<span class="g1-small" data-dk-box style="width:${f1(d0 + 8)}px">${word}</span>` + svg, 2);
  const front = side('front', scene(A.quarterArt(d0 / 2 - 2, 'f'), d0, d0, `0 0 ${f1(d0)} ${f1(d0)}`, `data-s1-art="source:quarter" data-s1-realsize="${d0}"`));
  const back = side('back', scene(A.quarterBackArt(d0 / 2 - 2, 'b'), d0, d0, `0 0 ${f1(d0)} ${f1(d0)}`, `data-s1-art="source:quarter-back" data-s1-realsize="${d0}"`));
  const ring = ring1 ? row(`<span data-dk-box data-s1-realring="${d0}" style="display:block;box-sizing:border-box;width:${f1(d0)}px;height:${f1(d0)}px;border:2.5px dashed ${T.inkSoft};border-radius:50%"></span>` + `<span class="s1-sm" data-dk-box style="width:130px;text-align:left">Put a real quarter here.</span>`, 12) : '';
  return `<div data-dk-box style="height:${px}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">${row(front + back, 18)}${ring}</div>`;
}
MODES['s1-sources'] = function sources(d, rng) {
  const set = d.n === 2 ? rng.sample(B.SOURCES, 2) : rng.shuffle(B.SOURCES);
  const look = { skin: 's1' }, cw = 330, px = d.n === 2 ? 300 : d.frame ? 116 : 150;
  const at = placesFor(set.length, 2, rng);
  const pres = ['Washington', 'Lincoln'];
  const card = (s, i) => { const two = at[i] === 0 ? [s.about, pres.find((p) => p !== s.about)] : [pres.find((p) => p !== s.about), s.about]; return tile(col(sourcePic(s, px, look, cw - 24, d.n === 2) + `<div data-dk-box data-s1-write="${s.id}" data-dk-answer="${s.kind}" style="line-height:0">${writeRow(cw - 60, 52)}</div>` + `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="${s.id}:about" style="gap:8px">${two.map((p) => pick(B.PRESIDENTS[p], p === s.about ? 'right' : 'no', `data-s1-about="${p}" style="font-size:15px;padding:2px 9px"`)).join('')}</div>`, 6), cw, 'auto', `data-s1-card="${s.id}"`, 'white', 'padding:6px 0;flex:1 1 auto'); };
  const parts = [box('dk-tile dk-tile--white', W, 'auto', row(q('Word box:') + wordOrder(set, rng).map((s) => chip(s.kind, `data-s1-bank="${s.kind}"`)).join(''), 12), 'data-s1-wordbox="1"', 'padding:6px 0;flex-shrink:0')];
  parts.push(set.length === 2 ? row(card(set[0], 0) + card(set[1], 1), 14, 'align-items:stretch;flex:1 1 auto') : col(row(card(set[0], 0) + card(set[1], 1), 14, 'align-items:stretch;flex:1 1 0') + row(card(set[2], 2) + card(set[3], 3), 14, 'align-items:stretch;flex:1 1 0'), 10, 'flex:1 1 auto;min-height:0'));
  if (d.frame) parts.push(frames([['I would most like to see the', 280, 'because'], [W - 40]], 'data-s1-frame="see"'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { items: set.map((s) => s.id + ':' + s.kind + ':' + s.about) } };
};

/* ================================================================ G1-664 why we have the Fourth of July */
MODES['s1-july4'] = function july4(d, rng) {
  const set = splitOrder(B.JULY4.filter((x) => x.real), B.JULY4.filter((x) => !x.real), d.n, d.n === 2 ? [1] : [1, 2, 3], rng);
  // review round 1: level 1 left 1.4 inches empty: the picture as large as the width allows, the two cards taller
  const ph = d.n === 2 ? 327 : d.frame ? 240 : 290;
  const parts = [col(scene(A.readingArt(rng), Math.round(ph * 2), ph, '0 0 300 150', 'data-s1-art="july4:reading"') + txt('The Declaration of Independence is read to the people in 1776.', W - 40, 'data-s1-caption="1"', 's1-sm'), 2)];
  // each sentence with a small picture (level 1 leans on pictures; the teacher reads the sentences)
  const ip = d.n === 2 ? 150 : d.frame ? 50 : 60;
  parts.push(col(set.map((x, i) => `<div class="s1-sent" data-dk-box data-s1-reason="${x.id}" data-dk-answer="${x.real ? 'right' : 'no'}" style="width:${W - 40}px;gap:14px;padding:${d.n === 2 ? '8px 14px;font-size:23px;line-height:28px' : '4px 14px'}">${scene(A.july4Icon(x.id), ip, ip, '0 0 100 100', `data-s1-art="reason:${x.id}"`)}<span>${esc((i + 1) + '. ' + x.text)}</span></div>`).join(''), d.n === 2 ? 18 : 8, 'flex:0 0 auto'));
  if (d.frame) parts.push(frames([['The colonists wanted', 420], [W - 40]], 'data-s1-frame="wanted"'));
  return { html: grow(parts.join(''), d.n === 2 ? 'gap:28px;justify-content:flex-start' : 'gap:10px;justify-content:space-evenly'), meta: { items: set.map((x) => x.id + ':' + (x.real ? 'real' : 'not')) } };
};

/* ================================================================ G1-665 people who made life fairer (a record page) */
MODES['s1-fairer'] = function fairer(d, rng) {
  const set = d.n === 2 ? rng.sample(B.FAIRER, 2) : rng.shuffle(B.FAIRER);
  const cw = 330, big = d.n === 2, sw = big ? 300 : d.two ? 150 : 196, sh = Math.round(sw * 100 / 140);
  const card = (p) => tile(col(scene(A.fairerArt(p.id, rng), sw, sh, '0 0 140 100', `data-s1-art="person:${p.id}"`) + `<span class="s1-q" data-dk-box data-s1-name="${p.id}">${esc(p.name)}</span>` + txt(p.fact, cw - 24, `data-s1-fact="${p.id}"`, 's1-sm'), 4), cw, 'auto', `data-s1-person="${p.id}"`, 'white', 'padding:6px 0;flex:1 1 auto');
  // review round 2 (level 1): two tall cards side by side left an inch of empty card above and below each picture: each
  // person is now a full-width card, a large picture (3.75 inches) on the left and the name and fact beside it, and the
  // room left goes to the question (three writing lines)
  const wideCard = (p) => { const pw = 360, ph = Math.round(pw * 100 / 140); return tile(row(scene(A.fairerArt(p.id, rng), pw, ph, '0 0 140 100', `data-s1-art="person:${p.id}"`) + col(`<span class="s1-q" data-dk-box data-s1-name="${p.id}" style="font-size:21px;line-height:25px">${esc(p.name)}</span>` + txt(p.fact, W - pw - 52, `data-s1-fact="${p.id}"`), 8, 'align-items:flex-start'), 16, 'justify-content:flex-start;padding:0 12px'), W, 'auto', `data-s1-person="${p.id}"`, 'white', 'padding:6px 0;flex:1 1 auto;justify-content:center'); };
  const parts = [set.length === 2 ? col(wideCard(set[0]) + wideCard(set[1]), 10, 'flex:1 1 auto;min-height:0;align-items:stretch') : col(row(card(set[0]) + card(set[1]), 14, 'align-items:stretch;flex:1 1 0') + row(card(set[2]) + card(set[3]), 14, 'align-items:stretch;flex:1 1 0'), 10, 'flex:1 1 auto;min-height:0')];
  const whyHow = `<span data-dk-box style="display:flex;gap:6px;padding-bottom:4px">${pick('Why', null, 'data-s1-wh="why"')}${pick('How', null, 'data-s1-wh="how"')}</span>`;
  // a Grade 1 question does not fit on one line of handwriting: every question gets a second line, the ? at its end
  const wh = (n, lh = 50) => frameLine([`<wh${n}>`, 'did you', 430], lh).replace(new RegExp(`<span class="g1-text" data-dk-box style="padding-bottom:\\d+px">&lt;wh${n}&gt;</span>`), whyHow) + frameLine([W - 60, '?'], lh);
  if (big) parts.push(frames([['Why did you', 470], [W - 40], [W - 60, '?']], 'data-s1-frame="ask"'));
  else if (!d.two) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(q('Circle Why or How. Ask your question:') + wh(1), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s1-frame="ask"', 'padding:6px 14px;justify-content:flex-start;flex-shrink:0'));
  else parts.push(box('dk-tile dk-tile--white', W, 'auto', col(wh(1, 46) + wh(2, 46) + frameLine([200, 'matters because', 290], 46) + frameLine([W - 60, '.'], 46), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s1-frame="ask2"', 'padding:6px 14px;justify-content:flex-start;flex-shrink:0'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: 1, items: set.map((p) => p.id) } };
};

/* ================================================================ G1-666 goods and services */
/** a haircut happening (drawn on 0 0 128 100, shown through HAIRCUT_VB): the child in the barber chair (the S1 drawing)
 *  and the barber beside the chair. Review round 2: the barber stands closer, so the blades' tips are at the child's hair
 *  (HAIRCUT_SNIP.tip) and the one cut lock falls just below them; the view is cropped to the scene (no empty side where
 *  the old tufts were), so the child, the scissors and the small lock are a third larger on every level. */
const HAIRCUT_VB = '16 9 96 91';
function haircutScene(k) {
  const b = { age: 'adult', s: 0.8, x: 96, y: 98, ...k[1], top: '#FFFFFF', bottomColor: 'dark', look: -1 };
  b.la = KA.armTo(b, 'l', 64, 30);
  const bp = KA.person(b), h = bp.hand('l');
  return `<g>${A.haircutArt({ ...k[0], hair: 'short' })}</g>` + `<rect x="100" y="0" width="28" height="86" fill="#EAF2EE"/><rect x="100" y="86" width="28" height="14" fill="#E6DBC6"/>` + bp.svg +
    `<g data-s1-drawn="scissors" transform="rotate(-40 ${f1(h[0])} ${f1(h[1])})"><circle cx="${f1(h[0] + 2)}" cy="${f1(h[1] + 4)}" r="2.4" fill="none" stroke="#D9534F" stroke-width="1.3"/><circle cx="${f1(h[0] + 6)}" cy="${f1(h[1] + 3)}" r="2.4" fill="none" stroke="#D9534F" stroke-width="1.3"/><line x1="${f1(h[0] + 3)}" y1="${f1(h[1] + 1)}" x2="${f1(h[0] - 6)}" y2="${f1(h[1] - 8)}" stroke="#8C8C8C" stroke-width="1.5"/><line x1="${f1(h[0] + 5)}" y1="${f1(h[1])}" x2="${f1(h[0] - 3)}" y2="${f1(h[1] - 10)}" stroke="#8C8C8C" stroke-width="1.5"/></g>`;
}
const colorBox = (id, px = 50) => `<span data-dk-box data-s1-colorbox="${id}" style="display:block;box-sizing:border-box;width:${px}px;height:${px}px;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF"></span>`;
MODES['s1-goods'] = function goods(d, rng) {
  const set = splitOrder(B.GOODS_SERVICES.filter((x) => x.kind === 'good'), B.GOODS_SERVICES.filter((x) => x.kind === 'service'), d.n, d.n === 4 ? [1, 2, 3] : [3, 4, 5], rng);
  // one cast for the page; each card that shows people gets its own children (the tones vary across the page)
  const svc = set.filter((x) => !x.pic).map((x) => x.id), kk = cast(Math.max(6, 3 * svc.length), rng), kOf = (x) => { const j = svc.indexOf(x.id); return kk.slice(3 * j, 3 * j + 3); };
  const big = d.n === 4, cw = big ? 330 : 160, px = big ? 180 : d.map ? 86 : 140;
  const itemPic = (x) => (x.pic ? pic(x.pic, px) : x.id === 'haircut' ? scene(haircutScene(kOf(x)), px, px, HAIRCUT_VB, 'data-s1-art="service:haircut"') : scene(A.serviceArt(x.id, kOf(x)), px, px, '0 0 100 100', `data-s1-art="service:${x.id}"`));
  const card = (x) => tile(col(itemPic(x) + txt(x.word, cw - 12, `data-s1-word="${x.id}"`, 's1-sm') + colorBox(x.id, big ? 56 : 48), 4), cw, 'auto', `data-s1-item="${x.id}" data-dk-answer="${x.kind}"`, 'white', 'padding:6px 0;flex:1 1 auto');
  const chipKey = (kind) => { const K = B.GOODS_KEY[kind]; return `<span class="sk-key" data-dk-box data-s1-key="${kind}" style="display:flex;align-items:center;gap:8px;font-family:'Nunito',sans-serif;font-weight:800;font-size:18px;color:${T.ink}"><span data-dk-box style="display:block;width:30px;height:30px;border-radius:7px;border:2px solid ${T.ink};background:${K.hex}"></span>${esc(K.word)}: color ${esc(K.color)}</span>`; };
  const parts = [box('dk-tile dk-tile--white', W, 'auto', row(chipKey('good') + chipKey('service'), 40), 'data-s1-colorkey="1"', 'padding:6px 0;flex-shrink:0')];
  parts.push(big ? col(row(card(set[0]) + card(set[1]), 14, 'align-items:stretch;flex:1 1 0') + row(card(set[2]) + card(set[3]), 14, 'align-items:stretch;flex:1 1 0'), 10, 'flex:1 1 auto;min-height:0') : col(row(set.slice(0, 4).map(card).join(''), 8, 'align-items:stretch;flex:1 1 0') + row(set.slice(4).map(card).join(''), 8, 'align-items:stretch;flex:1 1 0'), 8, 'flex:1 1 auto;min-height:0'));
  let town = [];
  if (d.map) {
    // review round 1: EVERY place on the map carries its label on every copy (bread, milk and apples: a child who circled
    // the bakery's bread with no bread label was right and marked wrong), with one or two goods from far away; the order
    // is never one a child reads off
    const local = B.TOWN_GOODS.filter((x) => x.local), far = B.TOWN_GOODS.filter((x) => !x.local), nf = rng.next() < 0.5 ? 1 : 2;
    for (let t = 0; t < 200; t++) { town = rng.shuffle([...local, ...rng.sample(far, nf)]); if (!badOrder(town.map((x) => x.local))) break; }
    parts.push(box('dk-tile', W, 'auto', col(q('Read the labels. Circle each label about a good from our town.') + row(col(q('Our town') + scene(A.townMapArt(), 300, 180, '0 0 300 180', 'data-s1-art="town-map"'), 2) + col(town.map((x) => `<div class="s1-sent" data-dk-box data-s1-town="${x.id}" data-dk-answer="${x.local ? 'right' : 'no'}" style="width:330px;gap:8px;padding:1px 10px">${pic(x.pic, 34)}<span class="s1-text" style="width:270px;font-size:16px;line-height:19px">${esc(x.label)}</span></div>`).join(''), 4, 'align-items:flex-start;align-self:center'), 12, 'align-items:flex-start'), 4), 'data-s1-townpart="1"', 'padding:6px 0;flex-shrink:0'));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { items: [...set.map((x) => x.id + ':' + x.kind), ...town.map((x) => x.id + ':' + (x.local ? 'local' : 'far'))] } };
};

/* ================================================================ G1-667 jobs and earning money */
MODES['s1-jobs'] = function jobs(d, rng) {
  const set = d.n === 2 ? rng.sample(B.JOBS, 2) : rng.shuffle(B.JOBS);
  const ro = rightOrder(set.length, rng), looks = cast(set.length + 2, rng);
  const big = d.n === 2, h = 236, ah = big ? h - 12 : 148, lw = big ? 300 : 158, rw = big ? ah + 16 : 158;
  const lefts = set.map((x) => ({ key: x.id, partner: x.id, html: big ? txt('“' + x.says + '”', lw - 24, `data-s1-says="${x.id}"`) : `<span class="s1-text" data-dk-box data-s1-says="${x.id}" style="width:${lw - 16}px;font-size:16px;line-height:20px;text-align:center">${esc('“' + x.says + '”')}</span>` }));
  const rights = ro.map((j) => [set[j], j]).map(([x, j]) => ({ key: x.id, html: scene(A.jobArt(x.id, { skin: looks[j].skin, hair: looks[j].sex === 'f' ? 'bun' : 'short', hairColor: looks[j].hairColor, riders: [looks[set.length].skin, looks[set.length + 1].skin] }), ah, ah, '0 0 100 100', `data-s1-art="job:${x.id}"`) }));
  // levels 2-3: the sentences in a row on top, the workers (about 1.6 inches) in a row below
  let html = big ? matchRows(lefts, rights, lw, rw, h, 60, 'flex:0 0 auto') : matchCols(lefts, rights, lw, rw, ah + 8, d.frame ? 44 : 48);
  const items = splitOrder(B.SPEND.filter((x) => x.buy), B.SPEND.filter((x) => !x.buy), d.n === 2 ? 4 : 5, d.n === 2 ? [2, 3] : [2, 3, 4], rng);
  // review round 2 (level 2): the five pictures were 1.2 inches in one row, with an inch of empty box above and below:
  // they are about 1.4 inches now, in two rows (three, then two)
  const two = d.n !== 2 && !d.frame, ipx = two ? 132 : 112, tw = two ? 180 : 124;
  const spendTile = (x) => tile(col(scene(A.spendArt(x.id, looks.slice(set.length)), ipx, ipx, '0 0 100 100', `data-s1-art="spend:${x.id}"`) + txt(x.word, tw - 6, `data-s1-spendword="${x.id}"`, 's1-sm'), 2), tw, 'auto', `data-s1-spend="${x.id}" data-dk-answer="${x.buy ? 'right' : 'no'}"`, 'white', 'padding:4px 0');
  const spendRows = two ? row(items.slice(0, 3).map(spendTile).join(''), 12, 'align-items:stretch') + row(items.slice(3).map(spendTile).join(''), 12, 'align-items:stretch') : row(items.map(spendTile).join(''), 8, 'align-items:stretch');
  html += box('dk-tile', W, 'auto', col(q('What can a family spend its pay on? Circle.') + spendRows, 6), 'data-s1-spendpart="1"', 'padding:6px 0;flex:1 1 auto;justify-content:center');
  if (d.frame) html += frames([['I would like to be a', 380, '.'], ['I would be paid to', 400, '.']], 'data-s1-frame="job"');
  return { html: grow(html, 'gap:10px'), meta: { pairs: set.map((x) => x.id), right: ro.map((j) => set[j].id), items: [...set.map((x) => x.id), ...items.map((x) => x.id + ':' + (x.buy ? 'buy' : 'not'))] } };
};

/* ================================================================ G1-668 saving for a goal */
MODES['s1-saving'] = function saving(d, rng) {
  const goal = rng.pick(B.SAVE_GOALS), name = rng.pick(B.SAVE_NAMES), price = d.price;
  const at = rng.next() < 0.5 ? 0 : 1;
  const story = box('dk-tile dk-tile--white', W, 'auto', row(col(txt(`${name} saves $1 each week to buy ${goal.word}. It costs $${price}.`, 330, 'data-s1-story="1"') + scene(A.dollarArt(), d.own ? 100 : 120, d.own ? 44 : 53, '0 0 100 44', 'data-s1-art="dollar"') + txt('$1 each week', 160, '', 's1-sm'), 6, 'align-items:flex-start') + col(pic(goal.pic, d.own ? 84 : 128) + scene(A.priceTag('$' + price), 96, 55, '0 0 70 40', `data-s1-art="tag" data-s1-price="${price}"`), 2), 24, 'justify-content:center'), 'data-s1-goal="1"', 'padding:6px 0;flex-shrink:0');
  const jh = d.own ? 220 : 440, jw = Math.round(jh * 0.62);
  const jar = col(head('the savings jar') + scene(A.savingJar(price, jw, jh), jw, jh, `0 0 ${jw} ${jh}`, `data-s1-art="jar" data-s1-parts="${price}"`), 2);
  const whyTwo = [{ t: B.SAVE_WHY.right, a: 'right' }, { t: B.SAVE_WHY.wrong, a: 'no' }]; if (at) whyTwo.reverse();
  // levels 2-3 also read the jar part of the way: after `wk` weeks (2 .. price-1) the child has $wk
  const wk = d.after ? 2 + Math.floor(rng.next() * (price - 2)) : 0;
  const afterRow = d.after ? row(txt(`After ${wk} weeks, ${name} has`, 196) + `<span class="g1-text" data-dk-box style="font-family:'Nunito',sans-serif;font-weight:800;font-size:19px">$</span>` + numBox(64, 56, `data-s1-after="${wk}" data-dk-answer="${wk}"`), 8, 'justify-content:flex-start') : '';
  const asks = col(
    box('dk-tile', 380, 'auto', col(txt(`Color one part for each week ${name} saves, until the jar is full.`, 350, 'data-s1-colorjar="1"') + afterRow + row(txt(`How many weeks does ${name} need to save?`, 250) + numBox(64, 56, `data-s1-weeks="1" data-dk-answer="${price}"`), 10, 'justify-content:flex-start'), 8, 'align-items:flex-start'), 'data-s1-ask="weeks"', 'padding:8px 12px') +
    box('dk-tile', 380, 'auto', col(txt(`Why did ${name} save?`, 350) + `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="why" style="gap:8px;flex-direction:column;align-items:flex-start">${whyTwo.map((c) => pick(c.t, c.a, `data-s1-why="${c.a}"`)).join('')}</div>`, 6, 'align-items:flex-start'), 'data-s1-ask="why"', 'padding:8px 12px'), 12, 'align-items:flex-start');
  const parts = [story, row(jar + asks, 24, 'align-items:center')];
  if (d.own) parts.push(row(col(labelledDraw(260, 'auto', 'my goal ($20 or less)', 'data-dk-prompt="my-goal"', '', 17).replace('height:auto;', 'height:auto;flex:1 1 auto;min-height:236px;'), 0, 'align-self:stretch') + box('dk-tile dk-tile--white', 410, 'auto', col(frameLine(['My goal costs $', 90, '.'], 50) + frameLine(['If I save $1 a week, I need', 70, 'weeks.'], 50), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s1-frame="goal"', 'padding:6px 10px;justify-content:center;align-self:stretch'), 12, 'align-items:stretch;flex-shrink:0'));
  return { html: grow(parts.join(''), 'gap:10px;justify-content:space-evenly'), meta: { items: [goal.id + ':' + price, 'why:' + (at ? 'R' : 'L'), ...(wk ? ['after:' + wk] : [])], goal: goal.id, name } };
};

/* ================================================================ G1-670 prices at the market (review round 1) */
/** a coin's real diameter in px (96 px to the inch) */
const coinPx = (c) => Math.round(c.mm / 25.4 * 96 * 10) / 10;
/** every way (counts of each kind) the coins `tray` (a list of coin ids) can pay `price` exactly */
function payWays(tray, price) {
  const kinds = [...new Set(tray)], have = kinds.map((k) => tray.filter((x) => x === k).length), val = kinds.map((k) => B.US_COINS.find((c) => c.id === k).cents);
  const out = [];
  const walk = (i, left, pick) => { if (i === kinds.length) { if (left === 0 && pick.some((n) => n > 0)) out.push(pick.slice()); return; } for (let n = 0; n <= have[i] && n * val[i] <= left; n++) { pick[i] = n; walk(i + 1, left - n * val[i], pick); } pick[i] = 0; };
  walk(0, price, kinds.map(() => 0));
  return out.map((p) => Object.fromEntries(kinds.map((k, i) => [k, p[i]]).filter((e) => e[1] > 0)));
}
/** the stamp of a way to pay: "dime:1,nickel:1,penny:2" (kinds in the order of US_COINS) */
const wayKey = (w) => B.US_COINS.map((c) => c.id).filter((k) => w[k]).map((k) => k + ':' + w[k]).join(',');
/**
 * a tray of coins for a price: the level's coins only (level 1: pennies and ONE nickel), 3 to 6 coins, the level's
 * biggest coin always in it, more money than the price (the child stops), and EXACTLY ONE set of coins that pays the
 * price (pennies are all alike: "two of the three pennies" is one set). The order is random.
 */
function payTray(price, L, rng) {
  const top = L.coins[L.coins.length - 1];
  for (let t = 0; t < 1500; t++) {
    const size = 3 + Math.floor(rng.next() * 4), tray = [top];
    while (tray.length < size) { const k = rng.pick(L.coins); if (tray.filter((x) => x === k).length < L.maxOf[k]) tray.push(k); }
    const total = tray.reduce((a, k) => a + B.US_COINS.find((c) => c.id === k).cents, 0);
    if (total <= price) continue;
    const ways = payWays(tray, price);
    if (ways.length !== 1) continue;
    return { tray: rng.shuffle(tray), way: ways[0] };
  }
  return null;   // no tray of 3-6 coins pays this price one way only (level 2: 19 and 24 cents): the page picks another price
}
MODES['s1-market'] = function market(d, rng) {
  const L = B.MARKET_LEVEL[d.level], coins = L.coins.map((id) => B.US_COINS.find((c) => c.id === id));
  // the things and their prices: different things, different prices; level 3 has at least one price above a quarter
  let items, prices, trays;
  for (let t = 0; t < 400; t++) {
    items = rng.sample(B.MARKET_ITEMS, d.n);
    prices = items.map(() => L.min + Math.floor(rng.next() * (L.max - L.min + 1)));
    if (new Set(prices).size !== prices.length) continue;
    if (d.level === 3 && !prices.some((p) => p > 25)) continue;
    trays = prices.map((pr) => payTray(pr, L, rng));
    if (trays.some((x) => !x)) continue;
    break;
  }
  if (!trays || trays.some((x) => !x)) throw new Error('dk-social-1: no market page');
  const big = d.n === 2;
  // the coins of the level, each at its real size, its name and its value beside it. Review round 2: "Coins:" stands on
  // its own line above them (in the row it sat on the card's left border at level 3), and the row keeps at least a
  // quarter inch (24 px) from the card's border on both sides
  const key = box('dk-tile dk-tile--white', W, 'auto', col(q('Coins:', 'data-s1-coinlabel="1" style="align-self:flex-start;margin-left:26px"') + row(coins.map((c) => row(scene(A.usCoin(c.id, coinPx(c) / 2 - 2, 'k'), coinPx(c), coinPx(c), `0 0 ${f1(coinPx(c))} ${f1(coinPx(c))}`, `data-s1-art="coin:${c.id}" data-s1-coinkey="${c.id}" data-s1-realsize="${coinPx(c)}"`) + col(`<span class="s1-text" data-dk-box data-s1-coinname="${c.id}" style="width:64px">${esc(c.word)}</span>` + `<span class="s1-q" data-dk-box data-s1-coinvalue="${c.id}">${c.cents}¢</span>`, 0, 'align-items:flex-start'), 6)).join(''), coins.length > 3 ? 10 : 22, 'justify-content:center'), 0, 'align-items:stretch;width:100%'), 'data-s1-coins="1"', 'padding:4px 0;flex-shrink:0');
  // the market stall: a striped awning over the things for sale, each thing with its price tag and a tray of coins
  const aw = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="30" viewBox="0 0 ${W} 30" style="display:block;flex-shrink:0" data-lcs-prim="sk-art" data-s1-art="awning">${Array.from({ length: 15 }, (_, i) => `<path d="M${f1(i * W / 15)},0 L${f1((i + 1) * W / 15)},0 L${f1((i + 1) * W / 15)},18 Q${f1((i + 0.5) * W / 15)},32 ${f1(i * W / 15)},18 Z" fill="${i % 2 ? '#FFFFFF' : '#D9534F'}" stroke="#3A3530" stroke-width="1.4"/>`).join('')}</svg>`;
  // review round 2: the price tag of levels 2-3 a little smaller (70 x 40, its own proportions), so the coin key's own
  // "Coins:" line fits the page without squeezing the awning
  const ipx = big ? 96 : 64, tw = big ? 96 : 70, th = big ? 55 : 40;
  const rows = items.map((it, i) => {
    const { tray, way } = trays[i];
    const coinHtml = tray.map((k, j) => { const c = B.US_COINS.find((x) => x.id === k), px = coinPx(c); return `<span data-dk-box data-s1-coin="${k}" style="display:block;flex-shrink:0">${scene(A.usCoin(k, px / 2 - 2, i + '-' + j), px, px, `0 0 ${f1(px)} ${f1(px)}`, `data-s1-art="coin:${k}" data-s1-realsize="${px}"`)}</span>`; }).join('');
    return tile(row(col(pic(it.pic, ipx) + scene(A.priceTag(prices[i] + '¢'), tw, th, '0 0 70 40', `data-s1-art="tag" data-s1-tagprice="${prices[i]}"`), 2) +
      `<div class="dk-row" data-dk-box data-s1-tray="${it.id}" data-s1-price="${prices[i]}" data-dk-answer="${wayKey(way)}" style="gap:8px;justify-content:flex-start;flex-wrap:nowrap">${coinHtml}</div>`, 12, 'justify-content:flex-start;padding:0 8px'), W, 'auto', `data-s1-item="${it.id}"`, 'white', 'padding:4px 0;flex:1 1 auto');
  });
  const stall = col(aw + col(rows.join(''), 6, 'width:100%;flex:1 1 auto'), 0, 'flex:1 1 auto;min-height:0');
  // which costs more: pairs of the things on the page (level 1 one pair, levels 2-3 two pairs of the three)
  const pairs = d.n === 2 ? [[0, 1]] : rng.sample([[0, 1], [1, 2], [0, 2]], 2);
  const at = sides(pairs.length, rng);
  const ppx = big ? 92 : 58;
  const pairRows = pairs.map(([a, b], r) => {
    const hi = prices[a] > prices[b] ? a : b, lo = hi === a ? b : a;
    const two = at[r] ? [lo, hi] : [hi, lo];
    const card = (j) => tile(row(pic(items[j].pic, ppx) + scene(A.priceTag(prices[j] + '¢'), big ? 86 : 70, big ? 49 : 40, '0 0 70 40', `data-s1-art="tag" data-s1-tagprice="${prices[j]}"`), 8), big ? 250 : 200, 'auto', `data-s1-more="${items[j].id}" data-dk-answer="${j === hi ? 'right' : 'no'}"`, 'white', 'padding:4px 8px');
    return `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="more:${items[a].id}-${items[b].id}" style="gap:16px">${card(two[0])}${orSep}${card(two[1])}</div>`;
  });
  const more = box('dk-tile', W, 'auto', col(q('Which costs more? Circle it.') + pairRows.join(''), 6), 'data-s1-morepart="1"', 'padding:6px 0;flex-shrink:0');
  return { html: grow(key + stall + more, 'gap:8px'), meta: { items: items.map((it, i) => it.id + ':' + prices[i]), prices } };
};

/* ================================================================ G1-669 our class meeting (a record page) */
MODES['s1-meeting'] = function meeting(d, rng) {
  const k = cast(9, rng);
  const big = !!d.draw, aw = big ? 196 : 180, ahh = Math.round(aw * 100 / 140);
  const rules = row(B.TALK_RULES.map((r, i) => tile(col(scene(A.talkRuleArt(r.id, k.slice(3 * i, 3 * i + 3)), aw, ahh, '0 0 140 100', `data-s1-art="talk:${r.id}"`) + row(`<span data-dk-box data-s1-check="${r.id}" style="display:block;width:30px;height:30px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF"></span>` + txt(r.text, aw - 46, `data-s1-talkrule="${r.id}"`, 's1-sm'), 6), 4), 214, 'auto', `data-s1-rule="${r.id}"`, 'white', 'padding:6px 0')).join(''), 10, 'align-items:stretch');
  const parts = [col(q('Our talking rules: check each rule you followed.') + rules, 4)];
  if (big) parts.push(col(labelledDraw(W - 20, 'auto', 'my idea for our class jobs', 'data-dk-prompt="idea"', '', 17).replace('height:auto;', 'height:auto;flex:1 1 auto;min-height:240px;'), 0, 'flex:1 1 auto;min-height:0;align-self:stretch;align-items:center'));
  else {
    parts.push(frames(d.decided ? [['I heard', 200, 'say', 300, '.'], ['I think', 520, '.']] : [['I heard', 200, 'say', 300, '.'], ['I think', 520], [W - 60, '.']], 'data-s1-frame="heard"'));
    const pills = `${pick('day', null, 'data-s1-every="day"')}${pick('week', null, 'data-s1-every="week"')}${pick('month', null, 'data-s1-every="month"')}`;
    // review round 2: level 3 tells the child to circle one (the sentence carried no verb there; level 2's job chart
    // heading and instruction already say to circle): the sentence, then "Circle one:" before day, week and month
    const often = d.decided ? `<div class="dk-row" data-dk-box data-s1-decide="often" style="gap:6px;flex-direction:column;align-items:flex-start">${txt('We will change class jobs every', 290)}<div class="dk-row" style="gap:12px;justify-content:flex-start">${q('Circle one:', 'data-s1-circleone="1"')}${pills}</div></div>`
      : `<div class="dk-row" data-dk-box data-s1-decide="often" style="gap:12px;justify-content:flex-start">${txt('We will change class jobs every', 290)}${pills}</div>`;
    const jobs = `<div class="dk-row" data-dk-box data-s1-jobs="1" style="gap:8px;flex-wrap:wrap;justify-content:flex-start;width:${W - 40}px">${B.CLASS_JOBS.map((j) => (d.decided ? chip(j, `data-s1-job="${esc(j)}"`) : pick(j, null, `data-s1-job="${esc(j)}"`))).join('')}</div>`;
    parts.push(box('dk-tile', W, 'auto', col(q(d.decided ? 'Our class job chart' : 'Our class job chart: circle a job you would like.') + jobs + often + (d.decided ? frameLine(['A job I would like:', 300, '.'], 48) + frameLine(['Our class decided', 430, '.'], 48) : ''), 6, 'align-items:flex-start;align-self:stretch;justify-content:space-evenly'), 'data-s1-decision="1"', 'padding:6px 14px;flex:1 1 auto'));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: 1, items: [String(d.level)] } };
};

/* ================================================================ the type + the S1 page checks */
/**
 * The S1 page checks (in page.evaluate): a match page has a dot on every card, each left card's partner on the page once,
 * no partner straight across from three rows on, every card inside the margin; a frame has its writing line; a written
 * answer box holds its stamp; a drawing box asked for drawing is at least about 2.5 inches tall where the page says so;
 * the quarter is drawn at its real size; the postcard's clues are printed on it; a record page carries no answer.
 */
function s1VerifyInPage(OPT) {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no dk root'];
  const mode = R.dataset.dk, lv = R.dataset.dkLevel;
  const lefts = [...R.querySelectorAll('[data-s1-key][data-dk-answer]')], rights = [...R.querySelectorAll('[data-s1-right]')];
  if (rights.length) {
    if (R.querySelectorAll('[data-s1-dot^="L"]').length !== lefts.length || R.querySelectorAll('[data-s1-dot^="R"]').length !== rights.length) f.push('a match card without its dot');
    lefts.forEach((e, i) => { const j = rights.findIndex((r) => r.dataset.s1Key === e.dataset.dkAnswer); if (j < 0) f.push(`${e.dataset.s1Key}: its partner is not on the page`); else if (j === i && lefts.length > 2) f.push(`${e.dataset.s1Key}: its partner sits straight across`); });
    if (new Set(lefts.map((e) => e.dataset.dkAnswer)).size !== lefts.length) f.push('two cards share one partner');
    const rule = document.querySelector('.ws-body').getBoundingClientRect();
    [...lefts, ...rights].forEach((e) => { const q = e.getBoundingClientRect(); if (q.right > rule.right + 0.5 || q.left < rule.left - 0.5) f.push(`${e.dataset.s1Key}: its card runs past the margin`); });
  }
  // a record page holds no answer; a closed page holds at least one
  if (R.dataset.dkRecord === '1' && R.querySelector('[data-dk-answer]')) f.push('a record page carries an answer stamp');
  if (R.dataset.dkRecord !== '1' && !R.querySelector('[data-dk-answer]')) f.push('a closed page carries no answer stamp');
  // every drawing box is at least about 2.5 inches tall (a child draws a person, a thing or a scene in it)
  R.querySelectorAll('[data-dk-draw]').forEach((b) => { const h = b.getBoundingClientRect().height, min = OPT.minDraw; if (h < min) f.push(`a drawing box ${Math.round(h)} px tall (${b.dataset.dkPrompt}; at least ${min})`); });
  // a box a child colors is at least about 0.5 inch
  R.querySelectorAll('[data-s1-colorbox], [data-s1-check]').forEach((b) => { const q = b.getBoundingClientRect(); if (q.width < 29.5 || q.height < 29.5) f.push(`a box to color or check ${Math.round(q.width)} px (at least 30)`); if (b.dataset.s1Colorbox && q.width < 47.5) f.push(`a box to color ${Math.round(q.width)} px (about 0.5 inch: 48)`); });
  // the quarter is drawn at its real size (24.26 mm = 91.7 px)
  R.querySelectorAll('svg[data-s1-art="source:quarter"]').forEach((s) => { const w = s.getBoundingClientRect().width; if (Math.abs(w - OPT.quarterPx) > 0.6) f.push(`the quarter is ${w.toFixed(1)} px across (its real size: ${OPT.quarterPx})`); });
  // the postcard: the clue each question needs is printed on the card (the studio and town on the back, the year)
  if (mode === 's1-postcard') {
    const back = R.querySelector('svg[data-s1-art="postcard:back"]'), front = R.querySelector('svg[data-s1-art="postcard:front"]');
    if (!back || !front) f.push('the postcard has no front or no back');
    else {
      const bt = back.textContent.replace(/\s+/g, ' ');
      R.querySelectorAll('[data-g1-one]').forEach((g) => { const right = g.querySelector('[data-dk-answer="right"]'); if (right && !bt.includes(right.textContent.trim())) f.push(`the answer "${right.textContent.trim()}" is not printed on the back of the card`); g.querySelectorAll('[data-dk-answer="no"]').forEach((w) => { if (g.dataset.dkItem !== 'who' && (bt + front.textContent).includes(w.textContent.trim())) f.push(`a wrong choice "${w.textContent.trim()}" is printed on the card`); }); });
      if (lv === '1' && R.querySelectorAll('[data-s1-ring]').length < 1) f.push('level 1 rings no clue');
      if (lv !== '1' && R.querySelector('[data-s1-ring]')) f.push('a ring on the card above level 1');
      const bw = new Set([...OPT.greys.map((x) => x.toUpperCase()), '#F2784B']);
      if ([...front.querySelectorAll('[fill],[stroke]')].some((e) => ['fill', 'stroke'].some((a) => { const v = (e.getAttribute(a) || '').toUpperCase(); return v.startsWith('#') && !bw.has(v); }))) f.push('the old photograph is not black and white');
    }
  }
  // the park: picture 2 shows exactly the changes the page asks for; picture 3 a helper for each; picture 1 none
  if (mode === 's1-park') {
    const ch = [...R.querySelectorAll('svg[data-s1-park="after"] [data-s1-change]')].map((e) => e.dataset.s1Change).sort();
    const hp = [...R.querySelectorAll('svg[data-s1-park="cleanup"] [data-s1-help]')].map((e) => e.dataset.s1Help);
    if (R.querySelector('svg[data-s1-park="clean"] [data-s1-change], svg[data-s1-park="clean"] [data-s1-help]')) f.push('the morning park shows a change or a helper');
    const want = Number(OPT.parkChanges[lv]); if (ch.length !== want) f.push(`picture 2 shows ${ch.length} changes (${want})`);
    if (R.querySelector('svg[data-s1-park="cleanup"]') && hp.length !== ch.length) f.push(`picture 3 shows ${hp.length} helpers for ${ch.length} changes`);
    // review round 1: each change is ONE thing in one place (its drawing small against the picture, so "3 things" are 3
    // things to circle); on clean-up day every helper stands apart from the others and from the one visitor
    const after = R.querySelector('svg[data-s1-park="after"]');
    if (after) { const pr = after.getBoundingClientRect(); after.querySelectorAll('[data-s1-change]').forEach((c) => { const q = c.getBoundingClientRect(); if (q.width > pr.width * OPT.changeMaxW || q.height > pr.height * OPT.changeMaxH) f.push(`the change "${c.dataset.s1Change}" is spread over ${Math.round(100 * q.width / pr.width)}% x ${Math.round(100 * q.height / pr.height)}% of the picture (one thing in one place)`); if (c.querySelector('[data-s1-change]')) f.push(`the change "${c.dataset.s1Change}" holds another change`);
      // its parts touch one another (within 2.5% of the picture's width): one thing, never pieces apart to circle one by one
      const parts = [...c.children].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0.2 || r.height > 0.2), tol = pr.width * OPT.changeGap, up = parts.map((_, i) => i), find = (i) => (up[i] === i ? i : (up[i] = find(up[i])));
      for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) { const a = parts[i], b = parts[j]; if (a.left - tol <= b.right && b.left - tol <= a.right && a.top - tol <= b.bottom && b.top - tol <= a.bottom) up[find(i)] = find(j); }
      const n = new Set(parts.map((_, i) => find(i))).size; if (n > 1) f.push(`the change "${c.dataset.s1Change}" is drawn in ${n} places apart (one thing to circle)`); }); }
    const up = R.querySelector('svg[data-s1-park="cleanup"]');
    if (up) {
      const vis = up.querySelectorAll('[data-s1-visitor]');
      if (vis.length !== 1) f.push(`picture 3 shows ${vis.length} visitors (one person who is not cleaning)`);
      vis.forEach((v) => { if (v.querySelector('[data-s1-help]') || v.closest('[data-s1-help]')) f.push('the visitor is drawn as a helper'); });
      const people = [...up.querySelectorAll('[data-s1-help] > [data-sk-skin], [data-s1-visitor] > [data-sk-skin]')].map((e) => ({ who: e.parentElement.dataset.s1Help || 'visitor', r: e.getBoundingClientRect() }));
      if (people.length !== hp.length + vis.length) f.push(`picture 3: ${people.length} people drawn for ${hp.length} helpers and ${vis.length} visitor`);
      for (let i = 0; i < people.length; i++) for (let j = i + 1; j < people.length; j++) { const a = people[i].r, b = people[j].r; const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (w > 0.5 && h > 0.5) f.push(`picture 3: the ${people[i].who} and the ${people[j].who} people overlap (each helper stands apart)`); }
      // review round 2: a visitor who does not help is in the picture, so every helper must PLAINLY help: a hand of each
      // helper on the thing it works with (the trash-can helper stood beside the can with her arms down)
      const near = (a, b, t) => a.left - t <= b.right && b.left - t <= a.right && a.top - t <= b.bottom && b.top - t <= a.bottom;
      up.querySelectorAll('[data-s1-help]').forEach((hg) => { const hands = [...hg.querySelectorAll('[data-sk-hand]')].map((e) => e.getBoundingClientRect()), tools = [...hg.querySelectorAll('[data-s1-tool]')].map((e) => e.getBoundingClientRect()); if (!tools.length || !hands.some((hd) => tools.some((t) => near(hd, t, 2)))) f.push(`picture 3: the ${hg.dataset.s1Help} helper has no hand on the work (every helper plainly helping)`); });
      // the trash can lifted with BOTH hands on it
      const canH = up.querySelector('[data-s1-help="stand-can"]');
      if (canH) { const c = canH.querySelector('[data-s1-drawn="can-being-lifted"]'), hs = [...canH.querySelectorAll('[data-sk-hand]')]; if (!c || hs.length !== 2 || hs.some((hd) => !near(hd.getBoundingClientRect(), c.getBoundingClientRect(), 1.5))) f.push('picture 3: the trash-can helper does not lift the can with both hands'); }
      // the cup goes into a trash bag: the cup over the bag's mouth, held low (a cup at face height reads as drinking)
      const cupH = up.querySelector('[data-s1-help="pick-up-bench"]');
      if (cupH) { const c = cupH.querySelector('[data-s1-drawn="cup-into-bag"]'), m = cupH.querySelector('[data-s1-drawn="trash-bag-mouth"]'), pp = cupH.querySelector('[data-sk-skin]');
        if (!c || !m || !pp) f.push('picture 3: the cup helper drops no cup into a trash bag');
        else { const q = c.getBoundingClientRect(), mo = m.getBoundingClientRect(), ps = pp.getBoundingClientRect(), cb = c.querySelector('[data-s1-cupbody]'), cx = (q.left + q.right) / 2; if (cx < mo.left || cx > mo.right || q.bottom < mo.top - 2 || q.top > mo.bottom) f.push('picture 3: the cup is not over the trash bag\'s mouth'); if (!cb || cb.getBoundingClientRect().top < ps.top + 0.3 * ps.height) f.push('picture 3: the cup is held up at the face (it reads as drinking)'); } }
    }
    // review round 2: the stepped-on flowers read at print size: one big shoe print, two flowers broken off
    if (after) after.querySelectorAll('[data-s1-change="flowers"]').forEach((c) => { const sp = c.querySelectorAll('[data-s1-drawn="shoe-print"]'); if (sp.length !== 1) f.push(`the stepped-on flower bed has ${sp.length} shoe prints (one)`); else if (sp[0].getBoundingClientRect().width < OPT.printMin) f.push(`the shoe print is ${Math.round(sp[0].getBoundingClientRect().width)} px wide (at least ${OPT.printMin}: it reads at print size)`); if (c.querySelectorAll('[data-s1-drawn="broken-flower"]').length !== 2) f.push('the stepped-on flower bed has no two flowers broken off'); });
  }
  // review round 1: the page fills its body (1.4-1.7 inches were left empty under the last part of some pages)
  { const body = document.querySelector('.ws-body').getBoundingClientRect(); const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect()).filter((r) => r.width > 1 && r.height > 1); const low = Math.max(...ink.map((r) => r.bottom)); if (body.bottom - low > OPT.maxBottomGap) f.push(`${Math.round(body.bottom - low)} px of empty page under the last part (at most ${OPT.maxBottomGap})`); }
  // the state card is a close-up of one state: no Alaska, no Hawaii, no lower 48; the state large on its card
  R.querySelectorAll('svg[data-s1-art="lead:state"]').forEach((sv) => { if (sv.querySelector('[data-s1-us]')) f.push('the state card draws the whole country (a child can match the president to it)'); const st = sv.querySelector('[data-s1-state]'); if (!st) f.push('the state card draws no state'); else { const q = st.getBoundingClientRect(), w = sv.getBoundingClientRect(); if (q.width < w.width * OPT.stateMinFrac) f.push(`the state is ${Math.round(100 * q.width / w.width)}% of its card's width (a close-up: at least ${Math.round(100 * OPT.stateMinFrac)}%)`); } });
  // the quarter: its front and its back, both at the real size, the back saying QUARTER DOLLAR; level 1's ring the same size
  if (R.querySelector('svg[data-s1-art="source:quarter"]')) { const back = R.querySelector('svg[data-s1-art="source:quarter-back"]'); if (!back) f.push('the quarter has no back'); else { if (Math.abs(back.getBoundingClientRect().width - OPT.quarterPx) > 0.6) f.push(`the quarter's back is ${back.getBoundingClientRect().width.toFixed(1)} px across (${OPT.quarterPx})`); if (!/QUARTER DOLLAR/.test(back.textContent)) f.push('the back of the quarter does not say QUARTER DOLLAR'); } }
  R.querySelectorAll('[data-s1-realring]').forEach((e) => { if (Math.abs(e.getBoundingClientRect().width - OPT.quarterPx) > 0.6) f.push(`the ring for a real quarter is ${Math.round(e.getBoundingClientRect().width)} px (${OPT.quarterPx})`); });
  // the symbols' names are written on a long line (about 5 inches: "Statue of Liberty")
  if (mode === 's1-symbols' && lv !== '1') R.querySelectorAll('[data-s1-write]').forEach((e) => { const w = e.getBoundingClientRect().width; if (w < OPT.nameLineMin) f.push(`a line for a symbol's name ${Math.round(w)} px (at least ${OPT.nameLineMin})`); });
  // the workers drawn large (about 1.6 inches at levels 2-3, the width of a quarter of the page)
  if (mode === 's1-jobs') R.querySelectorAll('svg[data-s1-art^="job:"]').forEach((e) => { const w = e.getBoundingClientRect().width; if (w < OPT.workerMin) f.push(`a worker drawn ${Math.round(w)} px wide (at least ${OPT.workerMin})`); });
  // the market: every coin drawn at its real size, as a coin (no numeral on it); every tray inside the page
  R.querySelectorAll('svg[data-s1-art^="coin:"]').forEach((e) => { const k = e.dataset.s1Art.slice(5), w = e.getBoundingClientRect().width; if (!OPT.coinPx[k]) f.push(`a coin "${k}" that is not a US coin`); else if (Math.abs(w - OPT.coinPx[k]) > 0.6) f.push(`a ${k} drawn ${w.toFixed(1)} px across (its real size: ${OPT.coinPx[k]})`); if (/[0-9]/.test(e.textContent)) f.push(`a ${k} with a numeral on it (a coin is never a numbered circle)`); });
  if (mode === 's1-market') { const rule = document.querySelector('.ws-body').getBoundingClientRect(); R.querySelectorAll('[data-s1-tray]').forEach((t) => { const q = t.getBoundingClientRect(); if (q.right > rule.right + 0.5) f.push(`the coins for "${t.dataset.s1Tray}" run past the margin`); }); }
  // review round 2: the haircut's cut hair is ONE lock falling and ONE small pile on the floor, each smaller than the child's
  // ear (the round-1 tufts, each as big as the child's head, read as combs, brooms or claws)
  R.querySelectorAll('svg[data-s1-art="service:haircut"]').forEach((sv) => {
    const fall = [...sv.querySelectorAll('[data-s1-clipping="falling"]')], floor = [...sv.querySelectorAll('[data-s1-clipping="floor"]')];
    if (fall.length !== 1 || floor.length !== 1) f.push(`the haircut draws ${fall.length} falling locks and ${floor.length} piles of hair (one of each)`);
    const kid = sv.querySelector('[data-sk-age="child"]'), ears = kid ? [...kid.querySelectorAll('circle')].filter((c) => c.getAttribute('r') === OPT.earR) : [];
    if (ears.length !== 2) { f.push('the haircut child has no two ears to measure the cut hair against'); return; }
    const ear = Math.max(...ears.map((e) => e.getBoundingClientRect().width));
    [...fall, ...floor].forEach((gr) => { const q = gr.getBoundingClientRect(), m = Math.max(q.width, q.height); if (m >= ear) f.push(`the cut hair (${gr.dataset.s1Clipping}) is ${m.toFixed(1)} px, not smaller than the child's ear (${ear.toFixed(1)} px)`); });
  });
  // review round 2 (G1-654): the teacher of the paint story is plainly a grown-up (about 1.5 times Maya's height, a
  // lanyard), and Maya's "I did it." face is sorry, never a proud grin
  R.querySelectorAll('svg[data-s1-art^="citizen:paint:"]').forEach((sv) => {
    const t = sv.querySelector('[data-s1-teacher] [data-sk-age="adult"]'), kid = sv.querySelector('[data-sk-age="child"]');
    if (!t || !kid) { f.push('the paint story has no teacher or no Maya'); return; }
    const ratio = t.getBoundingClientRect().height / kid.getBoundingClientRect().height;
    if (ratio < OPT.adultRatio) f.push(`the teacher is ${ratio.toFixed(2)} times Maya's height (a grown-up: at least ${OPT.adultRatio})`);
    if (!sv.querySelector('[data-s1-teacher] [data-s1-drawn="lanyard"]')) f.push('the teacher has no lanyard (a grown-up at school)');
    if (sv.dataset.s1Art === 'citizen:paint:good') { if (!sv.querySelector('[data-s1-drawn="sorry-face"]')) f.push('"I did it." is not said with a sorry face'); if (kid.querySelector('path[fill="#9B3B34"]')) f.push('Maya grins at "I did it." (it reads as proud, not sorry)'); }
  });
  // review round 2: no empty band inside a card (G1-665 level 1 had an inch of empty card above and below each picture,
  // G1-667 level 2 an inch above and below the spend pictures): the content reaches within half an inch of the box
  R.querySelectorAll('[data-s1-person], [data-s1-spendpart]').forEach((b) => { const q = b.getBoundingClientRect(); const ink = [...b.querySelectorAll('[data-dk-box], svg')].filter((e) => e !== b && !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect()).filter((r) => r.width > 1 && r.height > 1); if (!ink.length) return; const top = Math.min(...ink.map((r) => r.top)) - q.top, bot = q.bottom - Math.max(...ink.map((r) => r.bottom)); if (top > OPT.maxInnerBand || bot > OPT.maxInnerBand) f.push(`${b.dataset.s1Person || 'the spend box'}: ${Math.round(Math.max(top, bot))} px of empty box ${top > bot ? 'above' : 'below'} its content (at most ${OPT.maxInnerBand})`); });
  // review round 2 (G1-670): "Coins:" on its own line above the coins, and the key a quarter inch from the card's border
  if (mode === 's1-market') { const key = R.querySelector('[data-s1-coins]'); if (key) { const k = key.getBoundingClientRect(), lab = key.querySelector('[data-s1-coinlabel]'), parts = [...key.querySelectorAll('[data-s1-coinkey], [data-s1-coinname], [data-s1-coinvalue]')].map((e) => e.getBoundingClientRect());
    if (!lab) f.push('the coin key has no "Coins:" label'); else { const l = lab.getBoundingClientRect(); if (l.left - k.left < OPT.keyMargin) f.push(`"Coins:" sits ${Math.round(l.left - k.left)} px from the card's border (at least ${OPT.keyMargin})`); if (parts.some((r) => r.top < l.bottom - 0.5)) f.push('"Coins:" is not on its own line above the coins'); }
    const lo = Math.min(...parts.map((r) => r.left)) - k.left, hi = k.right - Math.max(...parts.map((r) => r.right)); if (lo < OPT.keyMargin || hi < OPT.keyMargin) f.push(`the coin key runs to ${Math.round(Math.min(lo, hi))} px from the card's border (at least ${OPT.keyMargin}: a quarter inch)`); } }
  // the jar has as many parts as the price (one part for each $1 week)
  R.querySelectorAll('svg[data-s1-art="jar"]').forEach((s) => { const n = s.querySelectorAll('[data-s1-jarline]').length + 1, p = Number(s.dataset.s1Parts); const w = R.querySelector('[data-s1-weeks]'); if (n !== p || !w || Number(w.dataset.dkAnswer) !== p) f.push(`the jar has ${n} parts for a price of $${p}`); });
  // 2026-11-25 picture fix (the bakery class, batch S3's live finding): a person who stands at furniture (a lectern, the library checkout desk; the classroom tables are open: legs show)
  // stands BEHIND it: the furniture comes after the person in document order and hides the person's lower body,
  // measured: every point of the lowest 40% of the figure drawn below the furniture's top lies inside the furniture's
  // shapes, and the feet are no lower than its foot. A person drawn after it whose feet stand more than OPT.frontGap px
  // below its foot is in front of it and is not judged. Each drawing of people at furniture (OPT.atFurniture: its name ->
  // the people in it at furniture) judges at least that many, wherever a page draws it (else the check measured nothing).
  {
    const FURN = '[data-s1-drawn="lectern"], [data-s1-drawn="checkout-desk"]';
    const rr0 = (e) => e.getBoundingClientRect();
    const shapesOf = (e) => (e.matches('path, rect, circle, ellipse, polygon') ? [e] : [...e.querySelectorAll('path, rect, circle, ellipse, polygon')]).filter((x) => x.getAttribute('fill') !== 'none');
    const inAny = (els, X, Y) => els.some((x) => { const q0 = new DOMPoint(X, Y).matrixTransform(x.getScreenCTM().inverse()); return x.isPointInFill(q0) || x.isPointInStroke(q0); });
    let pairs = 0; const per = new Map();
    R.querySelectorAll(FURN).forEach((F) => {
      const svg = F.closest('svg'), fb = rr0(F), fs0 = shapesOf(F), name = F.getAttribute('data-s1-drawn');
      [...svg.querySelectorAll('[data-sk-skin]')].forEach((P0) => {
        if (F.contains(P0)) return;
        const pb = rr0(P0), ov = Math.min(pb.right, fb.right) - Math.max(pb.left, fb.left);
        if (ov < pb.width * 0.4 || pb.bottom <= fb.top + 1) return;
        const after = !(P0.compareDocumentPosition(F) & Node.DOCUMENT_POSITION_FOLLOWING);
        if (after && pb.bottom > fb.bottom + OPT.frontGap) return;
        pairs++; per.set(svg, (per.get(svg) || 0) + 1);
        const who = P0.dataset.skPerson || ('a ' + (P0.dataset.skAge || 'person'));
        if (after) { f.push(`${who} at the ${name} is drawn after it (the person reads as standing inside the ${name})`); return; }
        if (pb.bottom > fb.bottom + 0.5) { f.push(`${who} at the ${name}: the feet are ${(pb.bottom - fb.bottom).toFixed(1)} px below its foot (in front of it, though drawn behind it)`); return; }
        const ps = shapesOf(P0); let shown = 0;
        for (let Y = Math.max(fb.top, pb.bottom - OPT.lowerBody * pb.height) + 1; Y < pb.bottom; Y += 1.5) for (let X = pb.left + 0.5; X < pb.right; X += 1.5) if (inAny(ps, X, Y) && !inAny(fs0, X, Y)) shown++;
        if (shown > OPT.legsShown) f.push(`${who} at the ${name}: ${shown} points of the lower body show past it (at most ${OPT.legsShown})`);
      });
    });
    R.querySelectorAll('svg[data-s1-art]').forEach((sv) => { const a0 = sv.getAttribute('data-s1-art'), want = (OPT.atFurniture || {})[a0] || 0; if ((per.get(sv) || 0) < want) f.push(`${per.get(sv) || 0} people at furniture judged in "${a0}" (it draws ${want}: the check would measure nothing)`); });
    void pairs; void mode; void lv;
  }
  return f;
}

/** the bank's values the page checks need (passed into page.evaluate) */
/** 2026-11-25 picture fix: the people at furniture each drawing judges at least (by its name; measured) */
const ATFURN_S1 = { 'leader:mayor': 1, 'leader:governor': 1, 'leader:president': 1, 'leader:principal': 1, 'place:library': 1 };
const S1_OPT = { legsShown: 2, frontGap: 3, lowerBody: 0.4, atFurniture: ATFURN_S1, earR: String(f1(KA.BODY.child.r * 0.22)), printMin: 28, adultRatio: 1.38, maxInnerBand: 48, keyMargin: 24, maxBottomGap: 96, changeMaxW: 0.25, changeMaxH: 0.45, changeGap: 0.025, stateMinFrac: 0.35, nameLineMin: 460, workerMin: 140, coinPx: Object.fromEntries(B.US_COINS.map((c) => [c.id, Math.round(c.mm / 25.4 * 96 * 10) / 10])), minDraw: 230, quarterPx: Math.round(B.QUARTER_MM / 25.4 * 96 * 10) / 10, parkChanges: { 1: 3, 2: 5, 3: 5 }, greys: ['#FFFFFF', ...['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9'].map((k) => A.S1_SCENE[k])] };
/** makeS1Type({ id, slug, mode, exerciseType, difficulty, i18n, words }) */
function makeS1Type({ id, slug, mode, exerciseType, difficulty, i18n }) {
  if (!MODES[mode]) throw new Error('dk-social-1: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G1', assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    difficulty,
    i18n,
    dkMode: mode,
    build({ difficulty: lv, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the Batch S1 pages are English (no ${locale} bank)`);
      const d = { ...(this.difficulty[lv] || this.difficulty[2]), level: Number(lv) };
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${DK.CSS}${S1CSS}</style><div class="dk-root" data-ws-content data-dk="${mode}" data-dk-level="${lv}" data-dk-record="${out.meta.record ? 1 : 0}">${out.html}</div>`,
        meta: { mode, level: Number(lv), ...out.meta },
      };
    },
    /** what a Level Set copy asks (build-waves compares copies on it): the items each page draws */
    levelSetWords(meta) { return [...(meta.items || []), ...(meta.changes || [])].map(String); },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(G.g1VerifyInPage), await page.evaluate(SK.skVerifyInPage, [...A.PAL1], SK.SK_OPT), await page.evaluate(s1VerifyInPage, S1_OPT));
    },
  };
}

module.exports = { makeS1Type, MODES, s1VerifyInPage, S1_OPT, flagSvg, haircutScene, HAIRCUT_VB, splitOrder, rightOrder, sides, payWays, wayKey, coinPx };
