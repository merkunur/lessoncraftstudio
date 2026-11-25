/**
 * dk-social-3.js — Batch S3 (Daily Teaching System Stage D-5, 2026-11-25): the Grade 3 social studies pages the English
 * year design (scripts/units/year/design.en.social.json, grade "3") needs:
 *   G3-612 s3-virtues      Civic Virtues at School                (feelings, D2.Civ.7.3-5)
 *   G3-613 s3-constitution Our Class Constitution                 (feelings, D2.Civ.3.3-5)
 *   G3-614 s3-changelaw    How People Change Laws                 (reading-comprehension, D2.Civ.12.3-5)
 *   G3-615 s3-scale        How Far Is It? Using a Map Scale       (maps, D2.Geo.3.3-5; a change of G2-476 / G3-493)
 *   G3-616 s3-gridmap      Make a Grid Map of Our Community       (maps, D2.Geo.1.3-5; a change of G1-530 / G3-510; a record page)
 *   G3-617 s3-live         Where People Live and Why              (maps, D2.Geo.6.3-5)
 *   G3-618 s3-settle       Towns Grow Near Resources              (maps, D2.Geo.8.3-5)
 *   G3-619 s3-levels       Three Levels of Government             (science-sort, D2.Civ.1.3-5)
 *   G3-620 s3-branches     Three Branches of Government           (science-sort, D2.Civ.5.3-5)
 *   G3-621 s3-taxes        Where Taxes Go                         (science-sort, D2.Eco.12.3-5)
 *   G3-622 s3-ways         Ways to Decide                         (reading-comprehension, D2.Civ.11.3-5)
 *   G3-623 s3-problem      Solving a Community Problem            (sentence-building, D2.Civ.13.3-5; a change of G2-562)
 *   G3-624 s3-sources      Primary and Secondary Sources          (science-sort, D2.His.9.3-5)
 *   G3-625 s3-timeline     A Double Timeline                      (family, D2.His.1.3-5)
 *   G3-626 s3-thennow      Life Then and Now                      (family, D2.His.2.3-5; a record page)
 *   G3-627 s3-resources    Resources at the Bakery                (science-sort, D2.Eco.3.3-5)
 *   G3-628 s3-causes       Causes and Effects in a Town's History (reading-comprehension, D2.His.14.3-5; a change of G3-501)
 *   G3-629 s3-deliberate   Deciding Together                      (feelings, D2.Civ.9.3-5; the teacher-led lesson's page; a record page)
 * English (American) only; themeless; PDF only. Built on the Batch K CSS and page check (dk-kinder.js), the Grade 1 kit
 * (dk-g1.js), the Batch SK figure, palette and page check (dk-social-k.js), the Batch S1 page check (dk-social-1.js) and
 * the Batch S2 page check and drawings (dk-social-2.js, dk-social-2-art.js). None of those files is edited: this file has
 * its OWN modes table.
 *
 * Grade 3 reads short texts: the teacher reads the instruction (a level prints its own, i18n/level-instructions.json);
 * sentences of about 15 words or fewer; a word bank at level 1, frames at levels 2-3. Numbers within 1,000 (years are
 * dates). CLOSED items carry their one answer as data-dk-answer (never printed; the gate qa/verify-dk-social-3.js
 * re-derives each from its own tables); RECORD parts hold no answer. Drawings: dk-social-3-art.js (every colour in its
 * PAL3). Bank: data/social/dk-social-3.js; the US maps: data/social/dk-social-3-geo.js (Natural Earth, 2020 Census).
 * The map scale page draws at 1:1 on paper (96 px = 1 inch, the money family's real-size coins use the same).
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const DK = require('./dk-kinder.js');
const G = require('./dk-g1.js');
const SK = require('./dk-social-k.js');
const S1 = require('./dk-social-1.js');
const S2 = require('./dk-social-2.js');
const A2 = require('./dk-social-2-art.js');
const A = require('./dk-social-3-art.js');
const B = require('../../data/social/dk-social-3.js');
const GEO = require('../../data/social/dk-social-3-geo.js');
const { compassRose } = require('../../primitives/compass-rose.js');

const T = TOK.color;
const W = 675;
const IN = 96;                       // px per inch on paper (the money family's real-size coins use the same)
const { box, tile, labelledDraw, chip, col, row, grow, lineBox, frameLine, numBox, esc, f1 } = G.kit;
const { derange } = DK;
const MODES = {};

/* ================================================================ the layout kit */
const S3CSS = `
.g1-chip{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:2px 11px;font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;line-height:20px;color:${T.teal};white-space:nowrap}
.g1-text{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
.g1-small{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:14px;line-height:17px;color:${T.ink};text-align:center}
.s3-text{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:normal}
.s3-sm{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;line-height:18px;color:${T.ink};white-space:normal}
.s3-q{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:19px;line-height:23px;color:${T.teal};white-space:nowrap}
.s3-pick{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:3px 13px;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
.s3-letter{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:30px;height:30px;border-radius:50%;border:2.5px solid ${T.teal};background:#FFFFFF;font-family:'Baloo 2',cursive;font-weight:700;font-size:18px;line-height:20px;color:${T.teal};flex-shrink:0}
.s3-story{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:18px;line-height:30px;color:${T.ink};white-space:normal}
.s3-head{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:20px;line-height:24px;color:${T.teal};white-space:nowrap;text-align:center}
`;
/** an svg drawing (Batch SK style: the lint leaves its colours to this batch's gate, which holds them to PAL3) */
const scene = (body, w, h, vb, attrs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" style="display:block;overflow:hidden" data-lcs-prim="sk-art"${attrs ? ' ' + attrs : ''}>${body}</svg>`;
const txt = (t, w, attrs = '', cls = 's3-text', style = '') => `<span class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''} style="width:${typeof w === 'number' ? w + 'px' : w}${style ? ';' + style : ''}">${esc(t)}</span>`;
const q = (t, attrs = '', style = '') => `<span class="s3-q" data-dk-box${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(t)}</span>`;
const pick = (t, answer, attrs = '') => `<span class="s3-pick" data-dk-box data-s3-pick="${esc(t)}"${answer ? ` data-dk-answer="${answer}"` : ''}${attrs ? ' ' + attrs : ''}>${esc(t)}</span>`;
const dot = (attrs = '') => `<span class="dk-dot" data-dk-box${attrs ? ' ' + attrs : ''}></span>`;
const letterBadge = (L, attrs = '') => `<span class="s3-letter" data-dk-box${attrs ? ' ' + attrs : ''}>${esc(L)}</span>`;
/** a white tile of sentence frames on writing lines (one frame per line; { head } a heading line) */
const frames = (lines, attrs = '', w = W, rowH = 46, style = '') => box('dk-tile dk-tile--white', w, 'auto', col(lines.map((l) => (l.head ? q(l.head) : frameLine(l, rowH))).join(''), 4, 'align-items:flex-start'), 'data-g1-frames="1"' + (attrs ? ' ' + attrs : ''), 'padding:6px 14px;justify-content:flex-start;flex-shrink:0' + (style ? ';' + style : ''));
const cast = (n, rng, opts) => SK.cast(n, rng, opts);
/** a word box: the head, then chips (a word, or a word with what it means) */
const wordBox = (head, items, attrs = '', style = '') => box('dk-tile dk-tile--white', W, 'auto', row(q(head) + items.join(''), 10, 'flex-wrap:wrap;justify-content:flex-start'), attrs, 'padding:6px 12px;flex-shrink:0' + (style ? ';' + style : ''));
/** the order of a word box: never the order the items ask for the words */
function wordOrder(set, rng) { for (let t = 0; t < 200; t++) { const o = rng.shuffle(set); if (o.some((x, i) => x !== set[i])) return o; } return set.slice().reverse(); }
/** a match: a line from each left dot to its partner's dot (the S1 marks: data-s1-key / data-dk-answer / data-s1-right) */
function matchRows(lefts, rights, lw, rw, h, gapMid = 60) {
  const n = Math.max(lefts.length, rights.length), out = [];
  for (let i = 0; i < n; i++) {
    const L = lefts[i], R = rights[i];
    out.push(`<div class="dk-row" style="gap:0;justify-content:space-between;width:${W}px;flex:0 0 auto">` +
      row(tile(L.html, lw, h, `data-s1-key="${L.key}" data-dk-answer="${L.partner}"`, 'white') + dot(`data-s1-dot="L${i}"`), 10) +
      `<span style="flex:1 1 auto;min-width:${gapMid}px"></span>` +
      row(dot(`data-s1-dot="R${i}"`) + tile(R.html, rw, h, `data-s1-key="${R.key}" data-s1-right="1"`, 'white'), 10) + '</div>');
  }
  return out.join('');
}
/** the columns of a sort: each a head and `n` writing lines (every column the same number of lines: a column with fewer
 *  would tell its count); `id` marks the column for the gate */
const sortColumns = (cols, n, lineH, w, extra = '') => row(cols.map((c) => box('dk-tile dk-tile--white', w, 'auto', col((c.headHtml || q(c.word, `data-s3-colhead="${c.id}"`)) + (c.def ? txt(c.def, w - 20, `data-s3-coldef="${c.id}"`, 's3-sm', 'padding:0 8px;box-sizing:border-box;min-height:38px;text-align:center') : '') + Array.from({ length: n }, () => lineBox(w - 24, lineH)).join(''), 2), `data-s3-column="${c.id}"`, 'padding:6px 0;justify-content:flex-start')).join(''), 8, 'align-items:stretch' + (extra ? ';' + extra : ''));
/** the count of perfect matchings of items -> answers, each item allowed its own set (the one-answer check of a page) */
function matchings(allowed, answers) {
  let n = 0; const used = new Set();
  const walk = (i) => { if (i === allowed.length) { n++; return; } for (const a of answers) if (allowed[i].includes(a) && !used.has(a)) { used.add(a); walk(i + 1); used.delete(a); } };
  walk(0);
  return n;
}
/** weights over a list of allowed pages (each a list of item ids) that make every item as common as any other, found by
 *  iterative scaling (deterministic; computed once a list) */
function evenWeights(combos, group = () => 0) {
  // fix round 1: each item as common as the OTHERS OF ITS GROUP (a situation drawn more often than its kind's others
  // makes its own words a cue to its kind); with one group, as common as any other
  const items = [...new Set(combos.flat())];
  let w = combos.map(() => 1 / combos.length);
  for (let it = 0; it < 600; it++) {
    const f = Object.fromEntries(items.map((s) => [s, 0]));
    combos.forEach((c, i) => c.forEach((s) => { f[s] += w[i]; }));
    const mean = {}; for (const s0 of items) { const k = group(s0); mean[k] = mean[k] || [0, 0]; mean[k][0] += f[s0]; mean[k][1]++; }
    w = combos.map((c, i) => w[i] * Math.pow(c.reduce((a, s0) => a * (mean[group(s0)][0] / mean[group(s0)][1] / f[s0]), 1), 1 / c.length));
    const sum = w.reduce((a, b) => a + b, 0); w = w.map((x) => x / sum);
  }
  return w;
}
/** one allowed page, drawn by those weights */
function evenPick(combos, rng, group) {
  if (!combos.w) combos.w = evenWeights(combos, group);
  let r = rng.next();
  for (let i = 0; i < combos.length; i++) { r -= combos.w[i]; if (r < 0) return combos[i]; }
  return combos[combos.length - 1];
}
/** G3-612: every allowed set of situations. Three: three virtues, one situation each, and no situation whose other
 *  defensible virtue is in the word box. Five: one situation a virtue, and exactly one way to give each its word. */
const VIRTUE_COMBOS = {};
function virtueCombos(n) {
  if (VIRTUE_COMBOS[n]) return VIRTUE_COMBOS[n];
  const ids = B.VIRTUES.map((v) => v.id), of = (v) => B.SITUATIONS.filter((x) => x.virtue === v), out = [];
  const prod = (vs) => vs.reduce((acc, v) => acc.flatMap((a) => of(v).map((x) => [...a, x])), [[]]);
  const sets = n === 5 ? [ids] : ids.flatMap((a, i) => ids.slice(i + 1).flatMap((b, j) => ids.slice(i + j + 2).map((c) => [a, b, c])));
  for (const vs of sets) for (const xs of prod(vs)) {
    if (n === 5 ? matchings(xs.map((x) => [x.virtue, ...x.also]), vs) !== 1 : xs.some((x) => x.also.some((a) => vs.includes(a)))) continue;
    out.push(xs.map((x) => x.id));
  }
  if (!out.length) throw new Error('dk-social-3: no allowed set of situations');
  return (VIRTUE_COMBOS[n] = out);
}

/* ================================================================ G3-612 civic virtues at school */
MODES['s3-virtues'] = function virtues(d, rng) {
  // level 1: three virtues, one situation each, and no situation whose other defensible virtue is on the page;
  // levels 2-3: all five, one situation each, "Use each word one time." and exactly one way to give every situation a word
  // every page the rules allow, drawn with weights that make each situation as common as any other (a situation drawn
  // more often than its kind's others would make its own words a cue to its virtue: the gate measures every word)
  const pick0 = evenPick(virtueCombos(d.n), rng, (id) => B.SITUATIONS.find((x) => x.id === id).virtue).map((id) => B.SITUATIONS.find((x) => x.id === id));
  const vs = B.VIRTUES.filter((v) => pick0.some((x) => x.virtue === v.id));
  const set = rng.shuffle(pick0);
  let boxOrder = vs;   // the word box: never in the order the situations ask for the words
  for (let t = 0; t < 200; t++) { boxOrder = rng.shuffle(vs); if (boxOrder.map((v) => v.id).join() !== set.map((x) => x.virtue).join()) break; }
  const big = d.n === 3, own = !!d.own;
  const entry = (v) => `<span data-dk-box data-s3-virtue="${v.id}" style="display:flex;align-items:center;gap:8px"><span class="g1-chip" style="font-size:${big ? 18 : own ? 15 : 16}px;min-width:${big ? 150 : 130}px;${own ? 'line-height:16px;padding:0 10px' : ''}">${esc(v.word)}</span><span class="s3-sm" style="text-align:left;white-space:normal;width:${big ? 470 : 480}px;font-size:${big ? 17 : own ? 14 : 15}px;line-height:${big ? 20 : own ? 16 : 19}px">${esc(v.means)}</span></span>`;
  const wb = box('dk-tile dk-tile--white', W, 'auto', col(q(big ? 'Word box: three virtues and what they mean' : 'Word box: five virtues and what they mean') + col(boxOrder.map(entry).join(''), big ? 5 : own ? 1 : 3, 'align-items:flex-start'), 3, 'align-items:flex-start'), 'data-s3-wordbox="1"', 'padding:6px 12px;flex-shrink:0');
  const fs = big ? 'font-size:19px;line-height:24px' : own ? 'font-size:15px;line-height:18px' : 'font-size:16px;line-height:20px';
  const virtueLine = (x, w0, h) => frameLine(['Virtue:', w0], h).replace('data-dk-box data-dk-blank="1"', `data-dk-box data-dk-blank="1" data-s3-write="${x.id}" data-dk-answer="${x.virtue}"`);
  const card = (x, i) => {
    const head0 = row(`<span class="s3-q" data-dk-box style="width:24px">${i + 1}.</span>` + txt(x.text, W - 60, `data-s3-situation="${x.id}"`, 's3-text', fs), 6, 'align-items:flex-start;justify-content:flex-start;width:100%');
    // review round 1: every level the same writing room: the virtue line 2.5 inches (240 px), "A good citizen would"
    // with a full-width second line (levels 2-3 start the sentence beside the virtue line: five situations a page)
    const lh2 = own ? 28 : 34;
    const body = big ? virtueLine(x, 240, 38) + frameLine(['A good citizen would', 440], 38) + frameLine([W - 60, '.'], 38)
      : row(virtueLine(x, 240, lh2) + frameLine(['A good citizen would', 116], lh2), 12, 'justify-content:flex-start;align-items:flex-end') + frameLine([W - 60, '.'], lh2);
    return tile(col(head0 + body, big ? 2 : 0, 'align-items:flex-start'), W, 'auto', `data-s3-sitcard="${x.id}" data-s2-fill="the situation ${x.id}"`, 'white', `padding:${big ? 6 : 3}px 12px;flex:1 1 auto;justify-content:center`);
  };
  const parts = [wb, col(set.map(card).join(''), big ? 10 : 5, 'flex:1 1 auto;align-items:stretch')];
  if (own) parts.push(frames([{ head: 'My own situation for a partner:' }, [W - 40], [W - 40, '.']], 'data-s3-frame="own"', W, 30));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: set.map((x) => x.id + ':' + x.virtue), box: boxOrder.map((v) => v.id) } };
};

/* ================================================================ G3-613 the Constitution and our class constitution */
MODES['s3-constitution'] = function constitution(d, rng) {
  const looks = cast(8, rng);
  const panel = box('dk-tile', W, 'auto', col(`<span class="s3-head" data-dk-box data-s3-wethepeople="1" style="font-size:27px;line-height:32px;color:${T.ink}">&#8220;${esc(B.CONSTITUTION_WORDS)}&#8221;</span>` + B.CONSTITUTION_SAYS.map((s0) => txt(s0, W - 40, 'data-s3-say="1"', 's3-sm', 'text-align:center')).join(''), 2), 'data-s3-panel="1"', `padding:8px 0;flex-shrink:0;background:${A.C.parchment};border:2.5px solid ${A.C.parchmentDark}`);
  const parts = [panel];
  if (d.match) {
    // level 1: the three freedoms on the left, their pictures on the right (never straight across)
    const ro = S1.rightOrder(3, rng);
    const lefts = B.FREEDOMS.map((f) => ({ key: f.id, partner: 'pic-' + f.id, html: col(`<span class="s3-q" data-dk-box data-s3-freedom="${f.id}" style="font-size:20px">${esc(f.word)}</span>` + txt(f.means, 300, '', 's3-sm', 'text-align:left'), 2, 'align-items:flex-start;padding-left:12px') }));
    const rights = ro.map((j) => B.FREEDOMS[j]).map((f) => ({ key: 'pic-' + f.id, html: scene(A.freedomArt(f.id, looks), 144, 90, '0 0 160 100', `data-s3-art="freedom:${f.id}"`) }));
    parts.push(box('dk-tile', W, 'auto', col(q(B.BILL_OF_RIGHTS) + matchRows(lefts, rights, 360, 156, 96, 30), 5), 'data-s3-freedoms="match" data-s2-fill="the freedoms"', 'padding:5px 0;flex:1 1 auto;justify-content:center'));
  } else {
    const pw = d.protect ? 132 : 172;
    const card = (f) => tile(col(scene(A.freedomArt(f.id, looks), pw, Math.round(pw * 100 / 160), '0 0 160 100', `data-s3-art="freedom:${f.id}"`) + `<span class="s3-q" data-dk-box data-s3-freedom="${f.id}" style="font-size:18px">${esc(f.word)}</span>` + txt(f.means, 196, '', 's3-sm'), 2), 212, 'auto', `data-s3-freedomcard="${f.id}"`, 'white', 'padding:4px 0');
    // level 3 (fix round 1, room for full-width rule lines): the three freedoms as a short list, no pictures
    const listRow = (f) => row(`<span class="s3-q" data-dk-box data-s3-freedom="${f.id}" style="font-size:17px;width:190px">${esc(f.word)}</span>` + txt(f.means, 420, '', 's3-sm', 'text-align:left'), 8, 'justify-content:flex-start;align-items:center');
    parts.push(box('dk-tile', W, 'auto', col(q(B.BILL_OF_RIGHTS) + (d.protect ? col(B.FREEDOMS.map(listRow).join(''), 2, 'align-items:flex-start;padding-left:14px') : row(B.FREEDOMS.map(card).join(''), 8, 'align-items:stretch')), 4), 'data-s3-freedoms="info"', 'padding:5px 0;flex-shrink:0'));
  }
  // review round 1: each rule a full-width line, "because" a second full-width line under it
  const nRules = d.match ? 2 : 4, rh = d.match ? 36 : 31;
  const rules = Array.from({ length: nRules }, (_, i) => frameLine([`${i + 1}.`, W - 70], rh) + frameLine(['because', W - 120, '.'], rh)).join('');
  parts.push(box('dk-tile dk-tile--white', W, 'auto', col(frameLine(['We the students of Room', 60, ', in order to', 270, ','], rh) + `<span class="g1-text" data-dk-box>agree to these rules:</span>` + rules, 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s3-frame="constitution" data-s2-fill="the class constitution"', 'padding:6px 14px;flex:1 1 auto;justify-content:center'));
  if (d.protect) parts.push(frames([['Rule number', 60, 'protects freedom of', 190, 'in our class.'], ['It does this by', 460, '.']], 'data-s3-frame="protect"', W, 30));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: d.match ? 0 : 1, items: d.match ? ['match', ...B.FREEDOMS.map((f) => f.id)] : [String(d.level)] } };
};

/* ================================================================ G3-614 how people change laws */
MODES['s3-changelaw'] = function changelaw(d, rng) {
  const looks = cast(8, rng);
  const set = d.n === 1 ? [rng.pick(B.CHANGES)] : B.CHANGES.slice();
  const big = d.n === 1;
  const card = (c) => tile(row(scene(A.changeArt(c.id, looks), big ? 280 : d.ask ? 130 : 170, big ? 165 : d.ask ? 76 : 100, '0 0 170 100', `data-s3-art="change:${c.id}"`) + col(`<span class="s3-q" data-dk-box data-s3-story="${c.id}" style="${big ? 'font-size:21px' : 'font-size:17px;line-height:20px'}">${esc(c.title)}</span>` + txt(c.text.join(' '), big ? 350 : d.ask ? 470 : 450, `data-s3-storytext="${c.id}"`, 's3-text', big ? 'font-size:18px;line-height:25px' : d.ask ? 'font-size:13.5px;line-height:16.5px' : 'font-size:14.5px;line-height:18px'), 2, 'align-items:flex-start'), 12, 'justify-content:flex-start;padding:0 10px;align-items:center'), W, 'auto', `data-s3-storycard="${c.id}"`, 'white', `padding:${d.ask ? 2 : 5}px 0;flex-shrink:0`);
  const COLS = [['who', 'Who wanted the change?'], ['did', 'What did they do?'], ['changed', 'What changed?']];
  const cellOf = (c, k, w0, n, lh) => {
    const given = big && k === 'who';
    return `<div data-dk-box data-s3-cell="${c.id}:${k}"${given ? '' : ` data-dk-answer="${esc(c[k])}"`} style="width:${w0}px;display:flex;flex-direction:column;gap:2px">${given ? txt(c[k], w0, 'data-s3-given="1"', 's3-text', `font-size:19px;color:${T.teal};padding:6px 4px 0`) : Array.from({ length: n }, () => lineBox(w0, lh)).join('')}</div>`;
  };
  let chart;
  if (big) {
    // level 1: the chart turned on its side (one story): each question a row, the first one done
    const c = set[0];
    chart = box('dk-tile dk-tile--white', W, 'auto', col(q('Finish the chart. The first answer is done for you.') + COLS.map(([k, h0]) => row(`<span class="s3-q" data-dk-box style="width:190px;font-size:19px;white-space:normal">${esc(h0)}</span>` + cellOf(c, k, 430, k === 'who' ? 1 : 3, 50), 8, 'justify-content:flex-start;align-items:center')).join(''), 16, 'align-items:flex-start'), 'data-s3-chart="1" data-s2-fill="the chart"', 'padding:6px 12px;flex:1 1 auto;justify-content:center');
  } else {
    const cw = [146, 204, 180], lab = 92, lh = d.ask ? 24 : 30;   // review round 1: three lines a cell
    const head = row(`<span data-dk-box style="width:${lab}px"></span>` + COLS.map(([, h0], i) => `<span class="s3-q" data-dk-box style="width:${cw[i]}px;font-size:16px;line-height:19px;text-align:center;white-space:normal">${esc(h0)}</span>`).join(''), 4, 'justify-content:flex-start');
    const rows0 = set.map((c) => row(`<span class="s3-sm" data-dk-box style="width:${lab}px;text-align:left;font-size:14px;line-height:17px">${esc(c.title)}</span>` + COLS.map(([k], i) => cellOf(c, k, cw[i], 3, lh)).join(''), 4, 'justify-content:flex-start;align-items:center')).join('');
    chart = box('dk-tile dk-tile--white', W, 'auto', col(q('Fill in the chart.') + head + rows0, 4, 'align-items:flex-start'), 'data-s3-chart="1" data-s2-fill="the chart"', 'padding:6px 10px;flex:1 1 auto;justify-content:center');
  }
  const parts = [col(set.map(card).join(''), 6, 'align-items:stretch'), chart];
  if (d.ask) parts.push(frames([['One change I would ask for at school:', 300], ['How I would ask:', 470], [W - 40, '.']], 'data-s3-frame="ask"', W, 29));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: set.map((c) => c.id) } };
};

/* ================================================================ G3-615 how far is it? a map scale */
/**
 * the places of the town map (inches, on a half-inch lattice inside the map; at least one inch apart) and the pairs the
 * page asks: level 1 whole inches along a street (same row or same column), level 2 whole and half inches, level 3 also
 * a trip from the school to two places (a right triangle: every leg a whole or half inch; one order shorter)
 */
/** the streets of the town map (inches): up-down streets at SX, cross streets at SY (every inch from a quarter inch) */
const SX = [0.25, 1.25, 2.25, 3.25, 4.25], SY = [0.25, 1.25, 2.25];
/** the street a pair of dots runs along, or null (fix round 1: no pair, no trip leg, runs across a block) */
function streetOf(a, b) {
  if (Math.abs(a.y - b.y) < 1e-9 && SY.some((y) => Math.abs(y - a.y) < 1e-9)) return 'y' + a.y;
  if (Math.abs(a.x - b.x) < 1e-9 && SX.some((x) => Math.abs(x - a.x) < 1e-9)) return 'x' + a.x;
  return null;
}
function scaleLayout(d, rng, MW, MH) {
  // fix round 1: every place's dot sits ON a street, on the center line of one of the two cross streets (1.25 or 2.25
  // inches down), at a half-inch point along it; a dot where an up-down street crosses sits on both. Every asked pair
  // runs along one street; level 3's school and two places sit on one street (both legs of the trip along it).
  const ids = B.SCALE_PLACES.map((p) => p.id);
  const xs = [], ys = [1.25, 2.25];
  for (let x = 0.75; x <= MW - 0.75 + 1e-9; x += 0.5) xs.push(x);
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const isHalf = (v) => Math.abs(v * 2 - Math.round(v * 2)) < 1e-9;
  const need = d.half && !d.trip ? 4 : 3;
  const longTrip = !!d.trip && rng.next() < 0.5;   // review round 2: the trip's length, drawn once (see below)
  for (let t = 0; t < 4000; t++) {
    const pos = {};
    for (const id of rng.shuffle(ids)) {
      let ok = false;
      for (let u = 0; u < 60 && !ok; u++) { const p = { x: rng.pick(xs), y: rng.pick(ys) }; if (Object.values(pos).every((o) => Math.abs(o.y - p.y) > 1e-9 || Math.abs(o.x - p.x) >= 1 - 1e-9)) { pos[id] = p; ok = true; } }
      if (!ok) break;
    }
    if (Object.keys(pos).length !== 5) continue;
    const pairs = [];
    for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) { const a = pos[ids[i]], b = pos[ids[j]]; if (streetOf(a, b)) pairs.push([ids[i], ids[j], dist(a, b)]); }
    const chosen = rng.shuffle(pairs).filter((p) => isHalf(p[2])).slice(0, need);
    if (chosen.length < need) continue;
    if (d.half && !chosen.some((p) => Math.abs(p[2] - Math.round(p[2])) > 1e-9)) continue;
    if (!d.half && chosen.some((p) => Math.abs(p[2] - Math.round(p[2])) > 1e-9)) continue;
    if (new Set(chosen.map((p) => p[2])).size < 2) continue;
    let trip = null;
    if (d.trip) {
      // the school and two places on ONE street: both legs of either order run along it; the two orders of different length
      // review round 2: the school sits BETWEEN the two places, one on each side, so the order matters: the shorter trip
      // goes to the nearer place first, comes back past the school and goes on (near + near + far); its length is never a
      // distance the page already asks
      // the map allows two trip lengths (3 1/2 and 4 miles): each on half the copies (a length that is nearly always the
      // same would be a guess that is nearly always right)
      const s0 = pos.school, others = rng.shuffle(ids.filter((x) => x !== 'school'));
      for (const a of others) for (const b of others) { if (a === b || trip) continue; const st = streetOf(s0, pos[a]); if (!st || streetOf(s0, pos[b]) !== st || streetOf(pos[a], pos[b]) !== st) continue; const between = st[0] === 'y' ? (pos[a].x - s0.x) * (pos[b].x - s0.x) < 0 : (pos[a].y - s0.y) * (pos[b].y - s0.y) < 0; if (!between) continue; const sa = dist(s0, pos[a]), sb = dist(s0, pos[b]), ab = dist(pos[a], pos[b]), len = Math.min(sa, sb) + ab; if ([sa, sb, ab].every((v) => isHalf(v)) && Math.abs(sa - sb) > 0.49 && !chosen.some((p) => Math.abs(p[2] - len) < 1e-9) && (len > 3.75) === longTrip) trip = { a, b, sa, sb, ab }; }
      if (!trip) continue;
    }
    return { pos, pairs: chosen, trip };
  }
  return null;
}
MODES['s3-scale'] = function scale(d, rng) {
  const MW = 4.5, MH = 3;   // the town map: 4.5 x 3 inches on paper (fix round 1: the places on the two cross streets)
  let L = null;
  for (let t = 0; t < 40 && !L; t++) L = scaleLayout(d, rng, MW, MH);
  if (!L) throw new Error('dk-social-3: no town map');
  const words = Object.fromEntries(B.SCALE_PLACES.map((p) => [p.id, p.word]));
  const places = Object.entries(L.pos).map(([id, p]) => ({ id, x: p.x * IN, y: p.y * IN }));
  const mw = MW * IN, mh = MH * IN;
  const svgTown = `<svg xmlns="http://www.w3.org/2000/svg" width="${mw}" height="${mh}" viewBox="0 0 ${mw} ${mh}" style="display:block;overflow:hidden" data-lcs-prim="sk-art" data-s3-art="town-map" data-s3-pxin="${IN}">${A.scaleTownMap(mw, mh, places, words)}</svg>`;
  const bar = `<svg xmlns="http://www.w3.org/2000/svg" width="${2 * IN + 60}" height="34" viewBox="0 0 ${2 * IN + 60} 34" style="display:block" data-lcs-prim="sk-art" data-s3-art="scale-bar">${A.scaleBar(6, 4, IN, 2, ['0', '1', '2'], 'miles')}</svg>`;
  const north = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="38" viewBox="0 0 26 38" style="display:block" data-lcs-prim="sk-art" data-s3-art="north">${A.northArrow(13, 37, 22)}</svg>`;
  const st = A.sampleStateMap(170, 236, B.STATE_CITIES, rng.next() < 0.5);
  const left = col(q('A sample town', 'data-s3-maptitle="town"', 'font-size:17px') + svgTown + row(north + bar + txt('1 inch on the map stands for 1 mile.', 130, 'data-s3-scaleword="1"', 's3-sm', 'text-align:left'), 10, 'justify-content:flex-start;width:100%'), 2, 'align-items:flex-start');
  const right = col(q('A sample state', 'data-s3-maptitle="state"', 'font-size:17px') + scene(st.svg, 170, 236, '0 0 170 236', 'data-s3-art="state-map"') + txt('The whole town is the red dot. 1 inch stands for 100 miles.', 172, 'data-s3-stateword="1"', 's3-sm', 'font-size:14px;line-height:17px'), 2);
  const maps = box('dk-tile', W, 'auto', row(left + right, 14, 'align-items:flex-start;justify-content:center'), 'data-s3-maps="1"', 'padding:5px 0;flex-shrink:0');
  const fmt = (v) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : Math.floor(v) ? Math.floor(v) + ' 1/2' : '1/2');
  // review round 1: "inches" and "miles" are column labels ABOVE the boxes (a frame "__ inches = __ miles" reads
  // "1 inches = 1 miles" with the most common answer)
  const bh = d.trip ? 32 : d.half ? 38 : 44, LW = 330, BW = 70;
  const qRow = (p, i) => `<div class="dk-row" data-dk-box data-s3-pair="${p[0]}|${p[1]}" data-dk-answer="${fmt(p[2])}" style="gap:14px;justify-content:flex-start;align-items:flex-end">` + `<span class="g1-text" data-dk-box style="padding-bottom:4px;width:${LW}px">${i + 1}. From the ${esc(words[p[0]])} to the ${esc(words[p[1]])}:</span>` + numBox(BW, bh, 'data-s3-inches="1"') + numBox(BW, bh, 'data-s3-miles="1"') + `</div>`;
  const colHead = `<div class="dk-row" data-dk-box data-s3-colheads="1" style="gap:14px;justify-content:flex-start"><span data-dk-box style="width:${LW}px"></span><span class="s3-q" data-dk-box data-s3-colhead="inches" style="width:${BW}px;text-align:center;font-size:17px">inches</span><span class="s3-q" data-dk-box data-s3-colhead="miles" style="width:${BW}px;text-align:center;font-size:17px">miles</span></div>`;
  const dists = box('dk-tile dk-tile--white', W, 'auto', col(q(d.half ? 'Measure from dot to dot to the nearest half inch.' : 'Measure from dot to dot to the nearest inch.') + colHead + L.pairs.map(qRow).join(''), d.half ? 2 : 5, 'align-items:flex-start'), 'data-s3-distances="1" data-s2-fill="the distances"', 'padding:5px 14px;flex:1 1 auto;justify-content:center');
  // which map shows ...: two questions, one answered by each map; the two choices in a random order on each question
  const town = B.SCALE_COMPARE.filter((c) => c.map === 'town'), state = B.SCALE_COMPARE.filter((c) => c.map === 'state');
  const cmp = rng.shuffle([rng.pick(town), rng.pick(state)]);
  const cmpCol = (c) => col(txt(c.text, 300, `data-s3-compare="${c.id}"`, 's3-text', 'font-size:16px') + (() => { const ch = rng.next() < 0.5 ? ['town', 'state'] : ['state', 'town']; return `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="${c.id}" style="gap:10px;justify-content:flex-start">${ch.map((m) => pick(m === 'town' ? 'the town map' : 'the state map', m === c.map ? 'right' : 'no', `data-s3-map="${m}" style="font-size:16px;padding:2px 11px"`)).join('')}</div>`; })(), 3, 'align-items:flex-start');
  const parts = [maps, dists, box('dk-tile dk-tile--white', W, 'auto', col(q('Circle the map.') + row(cmp.map(cmpCol).join(''), 20, 'justify-content:flex-start;align-items:flex-start'), 2, 'align-items:flex-start'), 'data-s3-compares="1"', 'padding:5px 14px;flex-shrink:0')];
  let trip = null;
  if (d.trip) {
    const T0 = L.trip, first = T0.sa < T0.sb ? T0.a : T0.b, far = first === T0.a ? T0.b : T0.a, len = Math.min(T0.sa, T0.sb) + T0.ab;
    trip = { first, far, len };
    parts.push(box('dk-tile dk-tile--white', W, 'auto', col(q('The shortest trip. Measure from dot to dot.', 'data-s3-tripmeasure="1"', 'font-size:17px;line-height:20px') + txt(`From the school to the ${words[T0.a]} and the ${words[T0.b]}:`, W - 30, 'data-s3-trip="1"', 's3-text', 'font-size:16px') +
      row(frameLine(['First I go to the', 180, '.'], 34).replace('data-dk-box data-dk-blank="1"', `data-dk-box data-dk-blank="1" data-s3-tripfirst="1" data-dk-answer="${first}"`) + row(`<span class="g1-text" data-dk-box style="padding-bottom:4px">The trip is</span>` + numBox(70, 38, `data-s3-triplen="1" data-dk-answer="${fmt(len)}"`) + `<span class="g1-text" data-dk-box style="padding-bottom:4px">miles.</span>`, 6, 'align-items:flex-end'), 16, 'justify-content:flex-start;align-items:flex-end'), 2, 'align-items:flex-start'), 'data-s3-tripbox="1"', 'padding:5px 14px;flex-shrink:0'));
  }
  return { html: grow(parts.join(''), 'gap:6px'), meta: { items: [...Object.entries(L.pos).map(([id, p]) => `${id}@${p.x},${p.y}`), ...L.pairs.map((p) => `${p[0]}-${p[1]}=${p[2]}`), ...cmp.map((c) => 'cmp:' + c.id), ...(trip ? ['trip:' + trip.first + '>' + trip.far] : [])], pos: L.pos, pairs: L.pairs.map((p) => ({ a: p[0], b: p[1], inches: p[2] })), trip, compare: cmp.map((c) => c.id) } };
};

/* ================================================================ G3-616 make a grid map of our community (a record page) */
MODES['s3-gridmap'] = function gridmap(d) {
  const cell = d.directions ? 56 : 64, gp = A.gridPlate(cell, !!d.started, A.KEY_ICONS);
  const plate = `<svg xmlns="http://www.w3.org/2000/svg" width="${gp.size}" height="${gp.height}" viewBox="0 0 ${gp.size} ${gp.height}" style="display:block" data-lcs-prim="sk-art" data-s3-art="grid" data-s3-cell="${cell}">${gp.svg}</svg>`;
  const rw = W - gp.size - 12;
  const side = (head, inner, attrs, grow0) => box('dk-tile dk-tile--white', rw, 'auto', col(q(head, '', 'font-size:18px') + inner, 2, 'align-items:flex-start' + (grow0 ? ';flex:1 1 auto;align-self:stretch' : '')), attrs, 'padding:4px 10px;' + (grow0 ? 'flex:1 1 auto' : 'flex-shrink:0'));
  const letters = { n: 'N', e: 'E', s: 'S', w: 'W' };
  const RP = 196;   // review round 2: level 1's rose larger (its letter boxes bigger), so the side column fills
  const rose = d.started ? compassRose({ px: 180, given: 'n', letters }).svg.replace('<svg', '<svg data-s3-rose="given-n"').replace(/width="180" height="180"/, `width="${RP}" height="${RP}"`) : '';
  // review round 1: five key rows on every level (the checklist needs five symbols), in a full-width box under the grid
  const kr = 5, kh = d.directions ? 30 : 34;
  const keyRows = d.started ? B.GRID_KEY_L1.map((k) => row(`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="-32 -32 64 64" style="display:block" data-lcs-prim="sk-art" data-s3-art="key:${k.id}">${A.KEY_ICONS[k.id]}</svg>` + `<span class="g1-text" data-dk-box style="white-space:nowrap">= ${esc(k.word)}</span>`, 4, 'justify-content:flex-start;align-items:center')).join('')
    : Array.from({ length: kr }, () => row(`<span data-dk-box data-s3-keybox="1" style="display:block;box-sizing:border-box;width:${kh}px;height:${kh}px;border:2.5px solid ${T.grid};border-radius:8px;background:#FFFFFF"></span><span class="g1-text" data-dk-box>=</span>` + lineBox(150, kh), 4, 'justify-content:flex-start;align-items:flex-end'));
  // review round 2: levels 2-3's key lines are 1.56 inches (a third grader writes "grocery store" in them): the heading
  // and two symbols, then three symbols
  const keyBox = d.started ? box('dk-tile dk-tile--white', W, 'auto', row(q('Key: copy these symbols', '', 'font-size:18px') + keyRows, 16, 'flex-wrap:wrap;justify-content:flex-start;align-items:center;row-gap:4px'), 'data-s3-box="key"', 'padding:4px 12px;flex-shrink:0')
    : box('dk-tile dk-tile--white', W, 'auto', col(row(q('Key:', '', 'font-size:18px') + keyRows.slice(0, 2).join(''), 18, 'justify-content:flex-start;align-items:flex-end') + row(keyRows.slice(2).join(''), 18, 'justify-content:flex-start;align-items:flex-end'), 4, 'align-items:flex-start'), 'data-s3-box="key"', 'padding:4px 12px;flex-shrink:0');
  const sideCol = col(side('Title', lineBox(rw - 24, d.directions ? 34 : 38), 'data-s3-box="title"') +
    side('Compass rose', d.started ? `<div data-dk-box style="line-height:0;align-self:center;margin:auto 0">${rose}</div>` : `<span data-dk-box data-s3-drawhere="rose" style="display:block;box-sizing:border-box;width:${rw - 24}px;flex:1 1 auto;min-height:${d.directions ? 80 : 110}px;border:2px dashed ${T.grid};border-radius:10px"></span>`, 'data-s3-box="rose"', true) +
    side('Scale', d.started ? txt('1 square = 1 block', rw - 24, 'data-s3-scalegiven="1"', 's3-text') : frameLine(['1 square =', 60, 'block(s)'], 36), 'data-s3-box="scale"'), 6, 'align-items:stretch;justify-content:flex-start;align-self:stretch').replace(/^<div /, '<div data-s3-stack="the side column" ');
  const top = row(plate + sideCol, 12, 'align-items:stretch;justify-content:flex-start');
  const check = box('dk-tile dk-tile--white', W, 'auto', row(q('Checklist:') + B.GRID_CHECKLIST.map((w0) => `<span data-dk-box style="display:flex;align-items:center;gap:5px"><span data-dk-box data-s1-check="1" style="display:block;box-sizing:border-box;width:30px;height:30px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF"></span><span class="s3-sm" style="white-space:nowrap">${esc(w0)}</span></span>`).join(''), 8, 'flex-wrap:wrap;justify-content:flex-start'), 'data-s3-checklist="1"', 'padding:5px 10px;flex-shrink:0');
  const pl = d.directions ? 32 : d.started ? 34 : 38, pr = [130, 'is in square', 60, '.'];   // review round 3: level 1's lines 34 (the plate band above the grid)
  const partner = box('dk-tile dk-tile--white', W, 'auto', col(q('For my partner: four places and their squares') + row(frameLine(pr, pl) + frameLine(pr, pl), 24, 'justify-content:flex-start') + row(frameLine(pr, pl) + frameLine(pr, pl), 24, 'justify-content:flex-start'), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s3-frame="partner"', 'padding:5px 14px;flex-shrink:0');
  const parts = [top, keyBox, check, partner];
  if (d.directions) parts.push(frames([['From the', 110, ', go', 60, 'block(s)', 80, 'to the', 100, '.'], ['From the', 110, ', go', 60, 'block(s)', 80, 'to the', 100, '.']], 'data-s3-frame="directions"', W, 30));
  return { html: grow(parts.join(''), 'gap:6px'), meta: { record: 1, items: [String(d.level)] } };
};

/* ================================================================ G3-617 where people live and why */
MODES['s3-live'] = function live(d, rng) {
  // one real place of each kind (two places to choose from per kind), the letters A-D in a random order
  const kinds = ['atlantic', 'lakes', 'desert', 'mountains'];
  const chosenKinds = d.n === 2 ? rng.sample(kinds, 2) : rng.shuffle(kinds);
  const places = chosenKinds.map((k) => rng.pick(GEO.places.filter((p) => p.kind === k)));
  const letters = 'ABCD'.slice(0, places.length).split('');
  const marks = places.map((p, i) => ({ letter: letters[i], id: p.id, x: p.x, y: p.y }));
  const mw = 329;
  const pm = A.usLiveMap('people', mw, marks, 'p'), lm = A.usLiveMap('land', mw, marks, 'l');
  const mh = Math.round(pm.h);
  const mapPart = (title, m, kind) => col(q(title, `data-s3-maptitle="${kind}"`, 'font-size:17px') + `<svg xmlns="http://www.w3.org/2000/svg" width="${mw}" height="${mh}" viewBox="0 0 ${mw} ${mh}" style="display:block;overflow:hidden" data-lcs-prim="sk-art" data-s3-art="us-${kind}" data-s3-k="${m.k}">${m.svg}</svg>`, 2);
  const keys = row(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="20" viewBox="0 0 150 20" style="display:block" data-lcs-prim="sk-art" data-s3-art="key-people">${A.peopleKey()}</svg>` + `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="38" viewBox="0 0 400 38" style="display:block" data-lcs-prim="sk-art" data-s3-art="key-land">${A.landKey()}</svg>`, 40, 'justify-content:center;align-items:flex-start');
  const maps = box('dk-tile', W, 'auto', col(row(mapPart('Where people live', pm, 'people') + mapPart('The land and water', lm, 'land'), 8, 'align-items:flex-start;justify-content:center') + keys, 4), 'data-s3-maps="1"', 'padding:5px 0;flex-shrink:0');
  const big = d.n === 2, lh = big ? 46 : d.own ? 36 : 42;
  const ans = (p) => B.LIVE_KINDS[p.kind].people;
  const rowFor = (p, i) => tile(col(row(letterBadge(letters[i], `data-s3-letter="${letters[i]}"`) + `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="${letters[i]}" style="gap:10px">${['many', 'few'].map((m) => pick(m + ' people', m === ans(p) ? 'right' : 'no', `data-s3-people="${m}"`)).join('')}</div>`, 10, 'justify-content:flex-start') +
    frameLine(['because', W - 140, '.'], lh) + (big ? frameLine([W - 60, '.'], lh) : ''), 2, 'align-items:flex-start'), W, 'auto', `data-s3-liverow="${letters[i]}" data-s3-place="${p.id}" data-s2-fill="the letter ${letters[i]}"`, 'white', `padding:${big ? 6 : 3}px 12px;flex:1 1 auto;justify-content:center`);
  const parts = [maps];
  if (big) parts.push(wordBox('Reason words:', B.LIVE_REASONS.map((w0) => chip(w0, `data-s3-reason="${esc(w0)}"`)), 'data-s3-reasons="1"'));
  parts.push(col(places.map(rowFor).join(''), big ? 8 : 4, 'flex:1 1 auto;align-items:stretch'));
  if (d.own) parts.push(frames([['In our state, many people live', 310], ['because', 520, '.']], 'data-s3-frame="own-state"', W, 36));
  return { html: grow(parts.join(''), 'gap:6px'), meta: { items: places.map((p, i) => letters[i] + ':' + p.id + ':' + ans(p)), places: places.map((p) => p.id) } };
};

/* ================================================================ G3-618 towns grow near resources */
MODES['s3-settle'] = function settle(d, rng) {
  const all = ['river', 'dry', 'harbor'];
  // level 1: the dry site and one good site; levels 2-3 all three; the letters in a random order
  const ids = d.n === 2 ? rng.shuffle(['dry', rng.pick(['river', 'harbor'])]) : rng.shuffle(all);
  const letters = 'ABC'.slice(0, ids.length).split('');
  const sites = Object.fromEntries(ids.map((id, i) => [id, letters[i]]));
  const mirror = rng.next() < 0.5;
  const big = d.n === 2, mw = big ? 560 : d.own ? 430 : 470, mh = Math.round(mw * 320 / 430);
  const map = scene(A.resourceStateArt(sites, mirror), mw, mh, '0 0 430 320', `data-s3-art="resource-state" data-s3-mirror="${mirror ? 1 : 0}"`);
  const bySite = (id) => B.TOWN_SITES.find((s) => s.id === id);
  const parts = [box('dk-tile', W, 'auto', col(q('A sample state and the sites ' + letters.join(letters.length === 2 ? ' and ' : ', ').replace(/, ([A-Z])$/, ' and $1') + ' where a town could start', 'data-s3-maptitle="sample-state"', 'font-size:18px') + map, 3), 'data-s3-mappart="1"', 'padding:5px 0;flex-shrink:0')];
  const good = ids.find((id) => !bySite(id).poor);
  if (big) {
    // circle the better site, then the resource it offers (three choices, exactly one of them at that site)
    const res = bySite(good).offers, right = rng.pick(res);
    const others = rng.sample(B.TOWN_RESOURCES.filter((r) => !res.includes(r.id) && r.id !== 'trees' && r.id !== 'minerals'), 1);
    const choices = rng.shuffle([B.TOWN_RESOURCES.find((r) => r.id === right), ...others, B.TOWN_RESOURCES.find((r) => r.id === 'minerals')]);
    parts.push(box('dk-tile dk-tile--white', W, 'auto', col(row(txt('1. Circle the better place to start a town:', 360, '', 's3-text') + `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="better" style="gap:12px">${letters.map((L) => pick('Site ' + L, ids[letters.indexOf(L)] === good ? 'right' : 'no', `data-s3-site="${L}"`)).join('')}</div>`, 8, 'justify-content:flex-start') +
      col(txt('2. Circle what that site has:', 360, '', 's3-text') + `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="resource" style="gap:10px;justify-content:flex-start">${choices.map((r) => pick(r.word, r.id === right ? 'right' : 'no', `data-s3-resource="${r.id}"`)).join('')}</div>`, 4, 'align-items:flex-start') +
      frameLine(['A town there could grow because', 320, '.'], 46), 10, 'align-items:flex-start'), 'data-s3-settleq="1" data-s2-fill="the questions"', 'padding:6px 14px;flex:1 1 auto;justify-content:center'));
    return { html: grow(parts.join(''), 'gap:8px'), meta: { items: [...ids.map((id) => sites[id] + ':' + id), 'better:' + sites[good], 'resource:' + right, mirror ? 'mirror' : 'plain'], sites, good, mirror } };
  }
  // levels 2-3: what each site has (all three, in letter order: naming only the good ones would give the worst away),
  // then the worst place for a town (one right answer: the dry, rocky site). The two good sites are not ranked against
  // each other: water and soil, or a harbor, are both good reasons (two defensible orders).
  const poor = ids.find((id) => bySite(id).poor);
  const lh = d.own ? 32 : 36;
  const offers = letters.map((L) => { const id = ids[letters.indexOf(L)]; return (frameLine([`Site ${L} has`, W - 150], lh) + frameLine(['so a town there could', W - 260, '.'], lh)).replace('data-dk-box data-dk-blank="1"', `data-dk-box data-dk-blank="1" data-s3-offer="${L}" data-dk-answer="${bySite(id).poor ? 'none' : bySite(id).offers.join(',')}"`); }).join('');
  const worst = row(`<span class="g1-text" data-dk-box style="padding-bottom:4px">Site</span>` + numBox(46, 40, `data-s3-worst="1" data-dk-answer="${sites[poor]}"`) + frameLine(['is the worst place for a town because', 190, '.'], lh), 6, 'justify-content:flex-start;align-items:flex-end');
  parts.push(box('dk-tile dk-tile--white', W, 'auto', col(offers + worst, 4, 'align-items:flex-start'), 'data-s3-settleq="1" data-g1-frames="1" data-s2-fill="the questions"', 'padding:6px 14px;flex:1 1 auto;justify-content:center'));
  if (d.own) parts.push(frames([['A resource that helped our town begin:', 250], ['It helped because', 470, '.']], 'data-s3-frame="own-town"', W, 36));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: [...ids.map((id) => sites[id] + ':' + id), 'poor:' + sites[poor], mirror ? 'mirror' : 'plain'], sites, poor, mirror } };
};

/* ================================================================ G3-619 three levels of government */
const LEVEL_ORDER = ['local', 'state', 'national'];
/** cards never lined up by level, either way (a child would read the columns off the order) */
const linedUp = (o) => o.every((x, i) => i === 0 || LEVEL_ORDER.indexOf(o[i - 1].level) <= LEVEL_ORDER.indexOf(x.level)) || o.every((x, i) => i === 0 || LEVEL_ORDER.indexOf(o[i - 1].level) >= LEVEL_ORDER.indexOf(x.level));
function unlined(set, rng) { for (let t = 0; t < 400; t++) { const o = rng.shuffle(set); if (!linedUp(o)) return o; } throw new Error('dk-social-3: no order for the cards'); }
MODES['s3-levels'] = function levels(d, rng) {
  const C0 = B.LEVEL_CARDS, by = (lv, kind) => C0.filter((c) => c.level === lv && c.kind === kind);
  // level 1: the six leaders; levels 2-3: the leaders and two services of each level (4 cards a level, so every column
  // takes the same number of cards and has the same number of lines)
  const set = d.leaders ? C0.filter((c) => c.kind === 'leader') : LEVEL_ORDER.flatMap((lv) => [...by(lv, 'leader'), ...rng.sample(by(lv, 'service'), 2)]);
  const order = unlined(set, rng);
  const looks = cast(24, rng);
  const big = !!d.leaders, cw = big ? 215 : 160, px = big ? 172 : d.ask ? 70 : 96;
  // every leader card its own grown-ups (the same figure on every card read as one person with three jobs)
  const pic = (c, i) => scene(c.kind === 'leader' ? A.leaderIcon(c.id, looks.slice(i).concat(looks.slice(0, i))) : A.serviceIcon(c.id, looks), px, px, '0 0 100 100', `data-s3-art="card:${c.id}"`);
  const card = (c, i) => tile(col(pic(c, i) + `<span class="s3-q" data-dk-box data-s3-cardword="${c.id}" style="font-size:${big ? 19 : 16}px;line-height:${big ? 22 : 19}px;white-space:normal;text-align:center;width:${cw - 12}px">${esc(c.word)}</span>`, 2), cw, 'auto', `data-s3-card="${c.id}" data-dk-answer="${c.level}"`, 'white', 'padding:4px 0;flex:1 1 auto');
  const perRow = big ? 3 : 4, rowsC = [];
  for (let i = 0; i < order.length; i += perRow) rowsC.push(row(order.slice(i, i + perRow).map((c, k) => card(c, i + k)).join(''), 8, 'align-items:stretch'));
  const headPic = (id) => (id === 'national' ? scene(A2.usCountry(160, 120), 90, 68, '0 0 160 120', 'data-s3-art="level:national"') : id === 'state' ? scene(A2.stateIcon(160, 120), 90, 68, '0 0 160 120', 'data-s3-art="level:state"') : scene(A2.townIcon(), 68, 68, '0 0 100 100', 'data-s3-art="level:local"'));
  const nLines = big ? 2 : 4;
  const chart = sortColumns(B.LEVELS.map((L) => ({ id: L.id, word: L.word, headHtml: row(headPic(L.id) + q(L.word, `data-s3-colhead="${L.id}"`, 'font-size:21px'), 6) })), nLines, big ? 54 : d.ask ? 36 : 44, 219);
  const parts = [col(rowsC.join(''), 6, 'align-items:stretch'), box('dk-tile', W, 'auto', col(q('Write each card in its column.') + chart, 3), 'data-s3-chartpart="1"', 'padding:4px 0;flex:1 1 auto;justify-content:center')];
  if (d.ask) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(txt('The swing in a city park is broken.', W - 30, 'data-s3-swing="1"', 's3-text') + frameLine(['The level to ask:', 220], 36).replace('data-dk-box data-dk-blank="1"', 'data-dk-box data-dk-blank="1" data-s3-swingwrite="1" data-dk-answer="local"') + frameLine(['Why:', 560, '.'], 36), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s3-frame="swing"', 'padding:4px 14px;flex-shrink:0'));
  return { html: grow(parts.join(''), 'gap:6px'), meta: { items: order.map((c) => c.id + ':' + c.level) } };
};

/* ================================================================ G3-620 three branches */
MODES['s3-branches'] = function branches(d, rng) {
  const sets = d.state ? ['national', 'job', 'state'] : ['national', 'job'];
  const cards = B.BRANCH_CARDS.filter((c) => sets.includes(c.set));
  const BR = B.BRANCHES.map((b) => b.id);
  let order;
  for (let t = 0; t < 400; t++) { order = rng.shuffle(cards); const ix = order.map((c) => BR.indexOf(c.branch)); const runs = ix.every((v, i) => !i || v >= ix[i - 1]) || ix.every((v, i) => !i || v <= ix[i - 1]); const triples = ix.length >= 6 && ix.slice(0, 3).join() === ix.slice(3, 6).join(); if (!runs && !triples) break; }
  const big = !d.state;
  const chips = box('dk-tile dk-tile--white', W, 'auto', row(q('Cards:') + order.map((c) => `<span class="g1-chip" data-dk-box data-s3-bcard="${c.id}" data-dk-answer="${c.branch}" style="font-size:${big ? 20 : 17}px;line-height:${big ? 26 : 21}px;padding:3px 12px">${esc(c.word)}</span>`).join(''), big ? 12 : 8, 'flex-wrap:wrap;justify-content:flex-start'), 'data-s3-cards="1"', `padding:${big ? 10 : 6}px 12px;flex-shrink:0`);
  const bw = 655, bh = big ? 290 : d.check ? 186 : 236;
  const build = (art, h, attrs) => `<svg xmlns="http://www.w3.org/2000/svg" width="${bw}" height="${h}" viewBox="0 0 ${bw} ${h}" style="display:block" data-lcs-prim="sk-art" ${attrs}>${art.svg}</svg>`;
  const boxes = (which, lh, n) => row(B.BRANCHES.map((b) => box('dk-tile dk-tile--white', 213, 'auto', col(`<span class="s3-q" data-dk-box data-s3-branchname="${which}:${b.id}" style="font-size:18px">${esc(b.word)}</span>` + Array.from({ length: n }, () => lineBox(190, lh)).join(''), 2), `data-s3-branchbox="${which}:${b.id}"`, 'padding:4px 0')).join(''), 8, 'align-items:stretch');
  const parts = [chips];
  // review round 1: every level says what "check" means
  // review round 2: "(a veto)" never breaks across two lines (a no-break space)
  const CHECK = 'To check means to stop or limit. For example, the president can say no to a bill (a\u00a0veto).';
  parts.push(txt(big ? 'The U.S. Constitution splits our national government into three branches. Each branch can check the others. ' + CHECK : CHECK, W - 20, 'data-s3-splits="1" data-s3-checkmeans="1"', 's3-text', 'text-align:center' + (big ? '' : ';font-size:16px;line-height:20px')));
  parts.push(box('dk-tile', W, 'auto', col(build(A.branchesArt(bw, bh, 'Our national government'), bh, 'data-s3-art="branches:national"') + boxes('national', big ? 54 : d.check ? 34 : 40, 2), 4), 'data-s3-building="national"', 'padding:5px 0;flex:1 1 auto;justify-content:center'));
  if (d.state) parts.push(box('dk-tile', W, 'auto', col(q('Our state government has the same three branches:') + boxes('state', d.check ? 34 : 40, 2), 4), 'data-s3-building="state"', 'padding:5px 0;flex-shrink:0'));
  // review round 2: the veto is the page's example, so level 3 asks for ANOTHER way (else every child copies the example)
  if (d.check) parts.push(frames([{ head: 'Another way one branch can check another:' }, ['The', 200, 'can', 360, '.']], 'data-s3-frame="check"', W, 36));
  return { html: grow(parts.join(''), 'gap:7px'), meta: { items: order.map((c) => c.id + ':' + c.branch) } };
};

/* ================================================================ G3-621 where taxes go */
MODES['s3-taxes'] = function taxes(d, rng, ctx) {
  const looks = cast(6, rng);
  const ink = G.kit.T.ink;
  const flow = box('dk-tile', W, 'auto', row(col(scene(A.taxPayersArt(looks), 200, 125, '0 0 160 100', 'data-s3-art="tax:payers"') + txt('People and businesses pay taxes.', 200, 'data-s3-step="pay"', 's3-sm'), 2) +
    `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="40" viewBox="0 0 54 40" style="display:block" data-s3-arrow="1">${G.kit.arrow(4, 20, 50, 20, { stroke: ink, sw: 4, head: 13 })}</svg>` +
    col(scene(A.governmentsArt(), 250, 131, '0 0 210 110', 'data-s3-art="tax:governments"') + txt('Each level of government collects its own taxes.', 250, 'data-s3-step="collect"', 's3-sm'), 2), 8, 'justify-content:center;align-items:center'), 'data-s3-flow="1"', 'padding:6px 0;flex-shrink:0');
  const FW = W - 30;
  const fan = `<svg xmlns="http://www.w3.org/2000/svg" width="${FW}" height="32" viewBox="0 0 ${FW} 32" style="display:block" data-s3-fan="1">${[FW / 6, FW / 2, 5 * FW / 6].map((x) => G.kit.arrow(FW / 2, 2, x, 30, { stroke: ink, sw: 3.5, head: 11 })).join('')}</svg>`;
  const parts = [flow, `<div data-dk-box style="line-height:0;flex-shrink:0;align-self:center">${fan}</div>`];
  let items;
  const fh = d.spend ? 36 : 44;
  if (d.drawn) {
    // level 1: the three services drawn, one of each level (each names its level), in a random order; a word box
    // fix round 1: the state and national services (two each) take turns by the copy number, so each is on exactly half
    // the copies (a word on one card of a pair sorts no better than its share); the local one is drawn
    const v = (ctx && ctx.variant) || 1;
    // review round 2: the state keeps one service (the driver's license left the pool), so the turns run over each list
    const pickOf = (lv) => { const list = B.TAX_SERVICES.filter((x) => x.level === lv); return lv === 'national' ? list[v % list.length] : lv === 'state' ? list[Math.floor(v / 2) % list.length] : rng.pick(list); };
    const svc = rng.shuffle(LEVEL_ORDER.map(pickOf));
    let lvBox = LEVEL_ORDER; for (let t = 0; t < 50; t++) { lvBox = rng.shuffle(LEVEL_ORDER); if (lvBox.join() !== svc.map((x) => x.level).join()) break; }
    items = svc.map((x) => x.id + ':' + x.level);
    // review round 2: the pictures are taller (the empty card above and below them closed); "Level:" has more room
    const sbox = (x) => tile(col(scene(A.taxServiceArt(x.id, looks), 200, 225, '0 -45 120 135', `data-s3-art="service:${x.id}"`) + txt(x.word, 200, `data-s3-service="${x.id}"`, 's3-text', 'text-align:center;font-size:17px;line-height:20px') + frameLine(['Level:', 120], 50).replace('data-dk-box data-dk-blank="1"', `data-dk-box data-dk-blank="1" data-s3-levelwrite="${x.id}" data-dk-answer="${x.level}"`), 2), 213, 'auto', `data-s3-servicebox="${x.id}" data-s3-fill="the service ${x.id}"`, 'white', 'padding:4px 0;flex:1 1 auto;justify-content:space-between');
    parts.push(row(svc.map(sbox).join(''), 8, 'align-items:stretch;flex:1 1 auto'));
    parts.push(wordBox('Word box (use each word one time):', lvBox.map((w0) => chip(w0, `data-s3-levelword="${w0}"`))));
  } else {
    items = [String(d.level)];
    // review round 2: level 2's drawing box is taller (about 1.7 inches), the empty card above and below it closed
    const sbox = (i) => tile(col(q(`Service ${i + 1}`) + `<span data-dk-box data-s3-drawbox="${i}" style="display:block;box-sizing:border-box;width:190px;height:${d.spend ? 112 : 196}px;border:2px dashed ${T.grid};border-radius:10px;background:#FFFFFF"></span>` + Array.from({ length: 2 }, () => lineBox(190, fh)).join('') + frameLine(['Level:', 120], fh), 2), 213, 'auto', `data-s3-servicebox="${i}" data-s3-fill="service box ${i + 1}"`, 'white', 'padding:4px 0;flex:1 1 auto;justify-content:center');
    parts.push(row([0, 1, 2].map(sbox).join(''), 8, 'align-items:stretch;flex:1 1 auto'));
  }
  parts.push(frames([['Without taxes,', 250, 'would not have'], ['money for', W - 140, '.']], 'data-s3-frame="without"', W, fh));
  if (d.spend) parts.push(frames([['Our town should spend more on', 330], ['because', 520, '.']], 'data-s3-frame="spend"', W, 36));
  return { html: grow(parts.join(''), 'gap:6px'), meta: { record: d.drawn ? 0 : 1, items } };
};

/* ================================================================ G3-622 ways to decide */
MODES['s3-ways'] = function ways(d, rng) {
  const looks = cast(6, rng);
  const order = rng.shuffle(B.DECIDE_WAYS);
  const big = !!d.model;
  const tcard = (w0) => tile(col(scene(A.decideArt(w0.id, looks), big ? 170 : 150, big ? 119 : 105, '0 0 100 70', `data-s3-art="decide:${w0.id}"`) + `<span class="s3-q" data-dk-box data-s3-way="${w0.id}" style="font-size:18px">${esc(w0.title)}</span>` + txt(w0.text.join(' '), 205, `data-s3-waytext="${w0.id}"`, 's3-sm', 'text-align:left;font-size:15px;line-height:19px'), 2), 215, 'auto', `data-s3-waycard="${w0.id}"`, 'white', 'padding:5px 0');
  const nl = d.field ? 3 : big ? 4 : 3, lh = d.field ? 30 : 36, rl = 114, cw = 168;   // review round 1: three lines a row on level 3
  const model = big ? 'who' : null;
  const head = row(`<span data-dk-box style="width:${rl}px"></span>` + order.map((w0) => `<span class="s3-q" data-dk-box data-s3-chartcol="${w0.id}" style="width:${cw}px;text-align:center;font-size:16px">${esc(w0.title)}</span>`).join(''), 5, 'justify-content:flex-start');
  const rowsH = B.DECIDE_ROWS.map((r0) => row(`<span class="s3-q" data-dk-box data-s3-chartrow="${r0.id}" style="width:${rl}px;font-size:16px;line-height:19px;white-space:normal">${esc(r0.word)}</span>` + order.map((w0) => (r0.id === model ? `<div data-dk-box data-s3-cell="${w0.id}:${r0.id}" style="width:${cw}px">${txt(w0[r0.id], cw, 'data-s3-given="1"', 's3-text', 'font-size:16px;line-height:19px;color:' + G.kit.T.teal)}</div>` : `<div data-dk-box data-s3-cell="${w0.id}:${r0.id}" data-dk-answer="${esc(w0[r0.id])}" style="width:${cw}px;display:flex;flex-direction:column;gap:2px">${Array.from({ length: nl }, () => lineBox(cw, lh)).join('')}</div>`)).join(''), 5, 'justify-content:flex-start;align-items:center')).join('');
  const chart = box('dk-tile dk-tile--white', W, 'auto', col(q(model ? 'Fill in the chart. The first row is done for you.' : 'Fill in the chart from the three texts.') + head + rowsH, d.field ? 4 : 8, 'align-items:flex-start'), 'data-s3-chart="1" data-s2-fill="the chart"', 'padding:6px 8px;flex:1 1 auto;justify-content:center');
  const parts = [row(order.map(tcard).join(''), 8, 'align-items:stretch'), chart];
  if (d.field) parts.push(frames([['To choose a field trip, our class should use', 200], ['because', 520, '.']], 'data-s3-frame="field-trip"', W, 36));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: order.map((w0) => w0.id) } };
};

/* ================================================================ G3-623 solving a community problem */
MODES['s3-problem'] = function problem(d, rng) {
  const looks = cast(4, rng);
  const top = box('dk-tile', W, 'auto', row(col(q('A problem in a sample town') + B.PROBLEM_TEXT.map((s0) => txt(s0, 260, 'data-s3-problemtext="1"', 's3-sm', 'text-align:left')).join(''), 4, 'align-items:flex-start') + scene(A.problemArt(looks), 380, 178, '0 0 320 150', 'data-s3-art="problem"'), 10, 'justify-content:center;align-items:center'), 'data-s3-problem="1"', 'padding:6px 0;flex-shrink:0');
  const sol = rng.shuffle(B.SOLUTIONS);
  const cw = [190, 205, 215];
  const head = row(['Solution', 'Cost', 'Benefit'].map((h0, i) => `<span class="s3-q" data-dk-box style="width:${cw[i]}px;font-size:17px">${h0}</span>`).join(''), 8, 'justify-content:flex-start');
  const given = !!d.given;
  const trow = (s0) => row(given ? [['word', 0], ['cost', 1], ['benefit', 2]].map(([k, j]) => txt(s0[k], cw[j], `data-s3-sol="${s0.id}:${k}"`, 's3-text', 'text-align:left;font-size:16px;line-height:20px')).join('') : [0, 1, 2].map((j) => lineBox(cw[j], d.carry ? 36 : 42)).join(''), 8, 'justify-content:flex-start;align-items:center');
  const table = box('dk-tile dk-tile--white', W, 'auto', col(q(given ? 'Three solutions. Circle the one you choose.' : 'Write three solutions, a cost and a benefit for each.') + head + (given ? sol.map(trow).join('') : [0, 1, 2].map(() => trow(null)).join('')), given ? 8 : 2, 'align-items:flex-start'), `data-s3-table="${given ? 'given' : 'blank'}"`, 'padding:6px 14px;flex-shrink:0');
  const lh = given ? 52 : d.carry ? 34 : 42;
  const letter = given ? [{ head: 'Dear City Council members,' }, ['We noticed', 500, '.'], ['We suggest', 230, 'because', 230], [W - 40, '.'], ['Sincerely,', 260]]
    : [{ head: 'Dear City Council members,' }, ['We noticed', 500, '.'], ['We suggest', 230, 'because', 230], [W - 40, '.'], ['Thank you for', 450, '.'], ['Sincerely,', 260]];
  const parts = [top, table, frames(letter, 'data-s3-frame="letter" data-s2-fill="the letter"', W, lh, 'flex:1 1 auto;justify-content:center')];
  if (d.carry) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(txt('Who would carry out the plan the city council agrees to? Circle one.', W - 30, 'data-s3-carryq="1"', 's3-text') + `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="carry" style="gap:14px;justify-content:flex-start">${rng.shuffle(B.CARRY_OUT).map((c) => pick(c.word, c.right ? 'right' : 'no', `data-s3-carry="${c.id}"`)).join('')}</div>`, 4, 'align-items:flex-start'), 'data-s3-carrypart="1"', 'padding:5px 14px;flex-shrink:0'));
  return { html: grow(parts.join(''), 'gap:7px'), meta: { record: d.carry ? 0 : 1, items: given ? sol.map((s0) => s0.id) : [String(d.level)] } };
};

/* ================================================================ G3-624 primary and secondary sources */
const SOURCE_KINDS = ['primary', 'secondary'];
MODES['s3-sources'] = function sources(d, rng) {
  const P = B.SOURCES.filter((x) => x.kind === 'primary'), Sx = B.SOURCES.filter((x) => x.kind === 'secondary');
  let set;
  if (d.n === 4) { const np = rng.pick([1, 2, 3]); set = rng.shuffle([...rng.sample(P, np), ...rng.sample(Sx, 4 - np)]); }
  else { for (let t = 0; t < 200; t++) { set = rng.shuffle(B.SOURCES); const bits = set.map((x) => (x.kind === 'primary' ? 1 : 0)).join(''); if (!/^(1+0+|0+1+)$/.test(bits) && !/^(10)+1?$|^(01)+0?$/.test(bits)) break; } }
  const big = d.n === 4, cw = big ? 330 : 160, px = big ? 150 : d.school ? 84 : 100;
  const card = (x) => tile(big ? row(scene(A.sourceArt(x.id), px, Math.round(px * 0.8), '0 0 100 80', `data-s3-art="source:${x.id}"`) + col(`<span class="s3-q" data-dk-box data-s3-sourceword="${x.id}" style="font-size:18px;white-space:normal;width:${cw - px - 40}px">${esc(x.word)}</span>` + txt(x.about, cw - px - 40, `data-s3-about="${x.id}"`, 's3-sm', 'text-align:left;font-size:16px;line-height:20px'), 2, 'align-items:flex-start'), 8, 'justify-content:flex-start;padding:0 8px;align-items:center')
    : col(scene(A.sourceArt(x.id), px, Math.round(px * 0.8), '0 0 100 80', `data-s3-art="source:${x.id}"`) + `<span class="s3-q" data-dk-box data-s3-sourceword="${x.id}" style="font-size:16px;line-height:19px;white-space:normal;text-align:center;width:${cw - 10}px">${esc(x.word)}</span>` + txt(x.about, cw - 10, `data-s3-about="${x.id}"`, 's3-sm', 'font-size:13.5px;line-height:16px'), 2), cw, 'auto', `data-s3-source="${x.id}" data-dk-answer="${x.kind}"`, 'white', 'padding:4px 0;flex:1 1 auto');
  const perRow = big ? 2 : 4, rowsC = [];
  for (let i = 0; i < set.length; i += perRow) rowsC.push(row(set.slice(i, i + perRow).map(card).join(''), 8, 'align-items:stretch'));
  const parts = [];
  if (big) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(SOURCE_KINDS.map((k) => row(`<span class="s3-q" data-dk-box data-s3-def="${k}" style="font-size:18px">${k === 'primary' ? 'A primary source' : 'A secondary source'}</span>` + txt('is ' + B.SOURCE_DEFS[k] + '.', 440, '', 's3-text', 'text-align:left'), 8, 'justify-content:flex-start')).join(''), 2, 'align-items:flex-start'), 'data-s3-defs="1"', 'padding:6px 14px;flex-shrink:0'));
  parts.push(col(rowsC.join(''), 6, 'align-items:stretch'));
  const n = big ? 5 : 6;   // review round 1: one more line a column (the empty bands close); review round 2: one more on level 1
  parts.push(box('dk-tile', W, 'auto', col(q('Write the name of each source in its column.') + sortColumns([{ id: 'primary', word: 'Primary sources' }, { id: 'secondary', word: 'Secondary sources' }], n, big ? 56 : d.school ? 31 : 41, 328), 3), 'data-s3-chartpart="1" data-s2-fill="the columns"', 'padding:4px 0;flex:1 1 auto;justify-content:center'));
  if (d.school) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(frameLine(['The source that best tells what school was like in 1900:', 190], 34).replace('data-dk-box data-dk-blank="1"', `data-dk-box data-dk-blank="1" data-s3-schoolwrite="1" data-dk-answer="${B.SOURCE_SCHOOL_1900}"`) + frameLine(['because', 520, '.'], 34), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s3-frame="school-1900"', 'padding:4px 14px;flex-shrink:0'));
  return { html: grow(parts.join(''), 'gap:7px'), meta: { items: set.map((x) => x.id + ':' + x.kind) } };
};

/* ================================================================ G3-625 a double timeline */
MODES['s3-timeline'] = function timeline(d, rng) {
  const evs = d.n === 4 ? B.TIMELINE_EVENTS.filter((e) => B.TIMELINE_LEVEL1.includes(e.id)) : B.TIMELINE_EVENTS.slice();
  const letters = 'ABCDEFG'.slice(0, evs.length).split('');
  const lettered = rng.shuffle(evs).map((e, i) => ({ ...e, letter: letters[i] }));
  const big = d.n === 4;
  const card = (e) => tile(row(letterBadge(e.letter, `data-s3-evletter="${e.letter}"`) + `<span class="s3-q" data-dk-box style="font-size:${big ? 20 : 17}px;width:${big ? 54 : 46}px">${e.year}</span>` + txt(e.word, big ? 220 : 228, '', 's3-text', big ? 'font-size:17px;line-height:21px' : 'font-size:15px;line-height:18px'), 6, 'justify-content:flex-start;align-items:center;padding:0 6px'), 326, 'auto', `data-s3-event="${e.id}" data-dk-answer="${e.line}:${e.year}"`, 'white', `padding:${big ? 9 : 4}px 0`);
  const town = lettered.filter((e) => e.line === 'town'), us = lettered.filter((e) => e.line === 'us');
  const listCol = (title, list) => col(`<span class="s3-q" data-dk-box style="font-size:18px">${esc(title)}</span>` + list.map(card).join(''), big ? 8 : 4, 'align-items:flex-start');
  const lists = row(listCol('Our sample town', town) + listCol('The United States', us), 8, 'align-items:flex-start');
  // the two timelines, 1860 to 1940, a labelled tick every ten years and a small one every five; room above each line
  // for the letters, room between them for the joining lines
  const w = 655, x0 = 26, x1 = w - 26, H = big ? 410 : d.own ? 250 : 370, yA = Math.round(H * 0.3), yB = Math.round(H * 0.82);
  const X = (yr) => x0 + (yr - B.TIMELINE_FROM) * (x1 - x0) / (B.TIMELINE_TO - B.TIMELINE_FROM);
  const ink = G.kit.T.ink;
  let s = `<rect x="0" y="0" width="${w}" height="${H}" fill="#FFFFFF"/>`;
  for (const [y, label, id] of [[yA, 'Our sample town', 'town'], [yB, 'The United States', 'us']]) {
    s += `<g data-s3-line="${id}"><line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${ink}" stroke-width="3.2"/>`;
    for (let yr = B.TIMELINE_FROM; yr <= B.TIMELINE_TO; yr += 5) { const big10 = yr % 10 === 0; s += `<line x1="${f1(X(yr))}" y1="${y - (big10 ? 10 : 6)}" x2="${f1(X(yr))}" y2="${y + (big10 ? 10 : 6)}" stroke="${ink}" stroke-width="${big10 ? 2.2 : 1.4}" data-s3-tick="${yr}"/>`; if (big10) s += `<text x="${f1(X(yr))}" y="${y + 27}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="14" fill="${ink}">${yr}</text>`; }
    s += `<text x="${x0 - 6}" y="${y - (big ? 62 : d.own ? 46 : 56)}" font-family="Baloo 2, cursive" font-weight="700" font-size="17" fill="${G.kit.T.teal}" data-s3-linelabel="${id}">${label}</text></g>`;
  }
  const tl = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${H}" viewBox="0 0 ${w} ${H}" style="display:block" data-lcs-prim="sk-art" data-s3-art="timelines" data-s3-x0="${x0}" data-s3-x1="${x1}">${s}</svg>`;
  const parts = [box('dk-tile dk-tile--white', W, 'auto', lists, 'data-s3-events="1"', 'padding:6px 4px;flex-shrink:0'), box('dk-tile', W, 'auto', col(q('Write each letter above its year on its timeline.') + tl, 2), 'data-s3-timelines="1" data-s2-fill="the timelines"', 'padding:5px 0;flex:1 1 auto;justify-content:center')];
  if (d.own) parts.push(frames([{ head: 'Two events from our town (find them with your teacher):' }, ['In', 70, ',', 470, '.'], ['In', 70, ',', 470, '.']], 'data-s3-frame="own-events"', W, 34));
  return { html: grow(parts.join(''), 'gap:7px'), meta: { items: lettered.map((e) => e.letter + ':' + e.id), letters: Object.fromEntries(lettered.map((e) => [e.id, e.letter])) } };
};

/* ================================================================ G3-626 life then and now (a record page) */
MODES['s3-thennow'] = function thennow(d, rng) {
  const looks = cast(6, rng);
  const rowsSet = d.n === 2 ? rng.sample(B.THEN_ROWS, 2).sort((a, b) => B.THEN_ROWS.indexOf(a) - B.THEN_ROWS.indexOf(b)) : B.THEN_ROWS.slice();
  const big = d.n === 2, pw = big ? 250 : d.most ? 132 : 146, ph = Math.round(pw * 250 / 400);
  const photo = (r) => `<div data-dk-box data-s3-photo="${r.id}" style="box-sizing:border-box;padding:4px 4px 2px;background:#FAFAFA;border:1.5px solid ${G.kit.T.inkSoft};box-shadow:2px 2px 0 #D9D9D9;display:flex;flex-direction:column;align-items:center;gap:1px;flex-shrink:0">${scene(A.thenPhotoArt(r.id, looks), pw, ph, '0 0 400 250', `data-s3-art="then:${r.id}"`)}<span data-dk-box style="font-family:'Nunito',sans-serif;font-weight:800;font-size:11.5px;line-height:14px;color:${G.kit.T.inkSoft}">a sample photo, about 1900</span></div>`;
  const lh = big ? 46 : d.most ? 32 : 36, nl = big ? 3 : 2, tw = big ? 140 : 214, lw = big ? 210 : 238;
  const rowC = (r) => tile(row(photo(r) + col(`<span class="s3-q" data-dk-box data-s3-row="${r.id}" style="font-size:18px">${esc(r.word)}</span>` + `<span class="s3-q" data-dk-box style="font-size:14px;line-height:16px">About 1900</span>` + txt(r.text.join(' '), tw, `data-s3-thentext="${r.id}"`, 's3-sm', 'text-align:left;font-size:' + (big ? 15 : 14) + 'px;line-height:' + (big ? 19 : 17) + 'px'), 1, 'align-items:flex-start') +
    col(`<span class="s3-q" data-dk-box style="font-size:15px">Today</span>` + Array.from({ length: nl }, () => lineBox(lw, lh)).join(''), 0, 'align-items:flex-start'), 8, 'justify-content:flex-start;align-items:center;padding:0 6px'), W, 'auto', `data-s3-thenrow="${r.id}" data-s2-fill="the row ${r.id}"`, 'white', 'padding:4px 0;flex:1 1 auto;justify-content:center');
  const fl = big ? 44 : d.most ? 32 : 38;
  const parts = [col(rowsSet.map(rowC).join(''), 6, 'flex:1 1 auto;align-items:stretch'), frames(big ? [['What changed most:', 450], [W - 40, '.'], ['Something that stayed the same:', 340], [W - 40, '.']] : [['What changed most:', 450, '.'], ['Something that stayed the same:', 340, '.']], 'data-s3-frame="changed"', W, fl)];
  if (d.most) parts.push(frames([['The change that mattered most:', 340], ['because', 520, '.']], 'data-s3-frame="mattered"', W, 32));
  return { html: grow(parts.join(''), 'gap:6px'), meta: { record: 1, items: rowsSet.map((r) => r.id) } };
};

/* ================================================================ G3-627 resources at the bakery */
const RES_KINDS = ['natural', 'human', 'capital'];
MODES['s3-resources'] = function resources(d, rng) {
  const looks = cast(4, rng);
  const by = (k) => B.RESOURCES.filter((x) => x.kind === k);
  const set = d.n === 6 ? RES_KINDS.flatMap((k) => rng.sample(by(k), 2)) : B.RESOURCES.slice();
  let order;
  for (let t = 0; t < 400; t++) { order = rng.shuffle(set); const ix = order.map((x) => RES_KINDS.indexOf(x.kind)); if (!(ix.every((v, i) => !i || v >= ix[i - 1]) || ix.every((v, i) => !i || v <= ix[i - 1]))) break; }
  const big = d.n === 6, tall = !d.own;
  const pic = scene(A.bakeryArt(looks), W - 20, Math.round((W - 20) * (tall ? 190 : 150) / 420), tall ? '0 -20 420 190' : '0 0 420 150', 'data-s3-art="bakery"');
  const cards = box('dk-tile dk-tile--white', W, 'auto', row(q('Cards:') + order.map((x) => `<span class="g1-chip" data-dk-box data-s3-rcard="${x.id}" data-dk-answer="${x.kind}" style="font-size:${big ? 19 : 17}px;line-height:${big ? 24 : 21}px;padding:3px 12px">${esc(x.word)}</span>`).join(''), big ? 12 : 8, 'flex-wrap:wrap;justify-content:flex-start'), 'data-s3-cards="1"', 'padding:6px 12px;flex-shrink:0');
  const n = big ? 3 : 4;
  const cols0 = [{ id: 'natural', word: 'Natural' }, { id: 'human', word: 'Human' }, { id: 'capital', word: 'Capital' }].map((c) => ({ ...c, def: big ? B.RESOURCE_DEFS[c.id] : null }));
  const parts = [box('dk-tile', W, 'auto', pic, 'data-s3-bakery="1"', 'padding:4px 0;flex-shrink:0;justify-content:center'), cards,
    box('dk-tile', W, 'auto', col(q('Write each card in its column: the resources of the bakery.') + sortColumns(cols0, n, big ? 48 : d.own ? 34 : 46, 219), 3), 'data-s3-chartpart="1" data-s2-fill="the columns"', 'padding:4px 0;flex:1 1 auto;justify-content:center')];
  if (d.own) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(frameLine(['A business in our town:', 380], 34) + row(RES_KINDS.map((k) => col(`<span class="s3-q" data-dk-box style="font-size:17px">${k[0].toUpperCase() + k.slice(1)}</span>` + lineBox(205, 34), 0)).join(''), 10), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s3-frame="own-business"', 'padding:4px 14px;flex-shrink:0'));
  return { html: grow(parts.join(''), 'gap:7px'), meta: { items: order.map((x) => x.id + ':' + x.kind) } };
};

/* ================================================================ G3-628 causes and effects in a town's history */
MODES['s3-causes'] = function causes(d, rng) {
  const tw = rng.pick(B.CAUSE_TOWNS);
  const fill = (s0, id) => s0.replace('{year}', tw.years[id] || '').replace('{town}', tw.town);
  const story = [B.CAUSE_START.replace('{town}', tw.town), ...B.CAUSES.map((c) => fill(c.story, c.id))];
  let set;
  if (d.n === 2) { for (let t = 0; t < 200; t++) { set = rng.sample(B.CAUSES, 2); if (!B.CAUSE_CONFUSABLE.some(([a, b]) => set.some((x) => x.id === a) && set.some((x) => x.id === b))) break; } } else set = B.CAUSES.slice();
  const lefts0 = rng.shuffle(set);
  const perm = S1.rightOrder(set.length, rng);   // two rows: straight across half the time (SK review ruling); 3+: a derangement
  const big = d.n === 2, cwid = big ? 270 : 260;
  const cardTxt = (t, attr) => txt(t, cwid - 16, attr, 's3-text', big ? 'font-size:20px;line-height:25px;padding:0 8px' : 'font-size:17px;line-height:21px;padding:0 8px');
  const lefts = lefts0.map((c) => ({ key: c.id, partner: 'eff-' + c.id, html: cardTxt(c.cause, `data-s3-cause="${c.id}"`) }));
  const rights = perm.map((j) => lefts0[j]).map((c) => ({ key: 'eff-' + c.id, html: cardTxt(c.effect, `data-s3-effect="${c.id}"`) }));
  // review round 2: level 3's story at level 2's size (the hardest level never gets the smallest text)
  const st = box('dk-tile dk-tile--white', W, 'auto', col(q('The story of ' + tw.town + ', a sample town') + story.map((s0, i) => `<span class="s3-story" data-dk-box data-s3-storysent="${i}" style="width:${W - 36}px;${big ? 'font-size:19px;line-height:31px' : d.own ? 'font-size:18px;line-height:25px' : 'font-size:18px;line-height:29px'}">${esc(s0)}</span>`).join(''), 0, 'align-items:flex-start'), 'data-s3-history="1"', 'padding:6px 16px;flex-shrink:0');
  const heads = row(`<span class="s3-q" data-dk-box style="width:${cwid}px;text-align:center">Cause</span><span class="s3-q" data-dk-box style="width:${cwid}px;text-align:center">Effect</span>`, 70, 'justify-content:space-between;width:100%');
  // review round 2: the cards are taller and the rows spread over the panel from its heading down (no empty band above
  // "Cause / Effect" or under the last row)
  const rh = big ? 150 : d.own ? 68 : 92;
  const parts = [st, box('dk-tile', W, 'auto', col(heads + matchRows(lefts, rights, cwid, cwid, rh, 40), big ? 16 : 6, 'justify-content:space-between;align-self:stretch'), 'data-s3-matchpart="1" data-s3-fill="the causes and effects"', 'padding:8px 0;flex:1 1 auto;justify-content:center')];
  if (d.own) parts.push(frames([['In our town,', W - 150, '.'], ['It happened because', 420, '.'], ['My source:', 470, '.']], 'data-s3-frame="our-town"', W, 34));   // review round 1: a whole-sentence answer fits
  return { html: grow(parts.join(''), 'gap:7px'), meta: { town: tw.id, items: [tw.id, ...lefts0.map((c) => c.id)], pairs: lefts0.map((c) => c.id) } };
};

/* ================================================================ G3-629 deciding together (a record page) */
MODES['s3-deliberate'] = function deliberate(d) {
  const L = d.level, lh = L === 1 ? 46 : L === 2 ? 38 : 32;
  const q0 = frames([['Our question:', 520, '?']], 'data-s3-frame="question"', W, lh);
  const choice = (c) => (L === 1 ? [[`Choice ${c}:`, 520], ['A reason for it:', 470], [W - 40, '.']] : [[`Choice ${c}:`, 520], ['A reason for it:', 470, '.'], ['A reason against it:', 440, '.']]);
  const choices = frames([{ head: 'Our three choices' }, ...['A', 'B', 'C'].flatMap(choice)], 'data-s3-frame="choices"', W, lh);
  const parts = [q0, choices];
  if (L >= 2) parts.push(frames([['The question I asked another group:', 300], [W - 40, '?']], 'data-s3-frame="asked"', W, lh));
  parts.push(frames([['The choice our class reached:', 360, '.'], ['I can accept it because', 400, '.']], 'data-s3-frame="reached"', W, lh));   // review round 1: every level records the choice the class can accept
  if (L === 3) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(row(`<span class="g1-text" data-dk-box>Did my mind change? Circle one:</span>` + ['yes', 'no'].map((w0) => `<span class="s3-pick" data-dk-box data-s3-mind="${w0}">${w0}</span>`).join(''), 12, 'justify-content:flex-start') + frameLine(['What changed my mind, or what kept it the same:', 200], lh) + frameLine([W - 40, '.'], lh), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s3-frame="mind"', 'padding:6px 14px;flex-shrink:0'));
  return { html: grow(parts.join(''), 'gap:6px'), meta: { record: 1, items: [String(L)] } };
};

/* ================================================================ the type + the S3 page checks */
/**
 * The S3 page checks (in page.evaluate). Each returns the faults it finds, and each fails when it finds nothing to judge
 * on a page that must have it (a check that measures nothing is a fault, never a pass).
 *  - the map scale: every asked distance is the stamped inches on paper, dot centre to dot centre (96 px an inch), the
 *    town map drawn at 1:1, the scale bar's mile a true inch; every place's label clear of every other place's drawing
 *  - where people live: every letter on land, on the same point on both maps; the people at a letter (the DRAWN dots
 *    within PLACE_R) agree with the many / few the page stamps
 *  - towns grow: each site on its land (the dry site in the dry land, the river site by the river, the harbor site by
 *    the harbor); no word on the map covers a site
 *  - the timelines: every tick at its year
 */
function s3VerifyInPage(OPT) {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no dk root'];
  const mode = R.dataset.dk;
  const rr = (e) => e.getBoundingClientRect();
  const ctr = (e) => { const q0 = rr(e); return [(q0.left + q0.right) / 2, (q0.top + q0.bottom) / 2]; };
  const overlap = (a, b, t = 0) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > t && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > t;
  if (mode === 's3-scale') {
    const map = R.querySelector('svg[data-s3-art="town-map"]');
    if (!map) f.push('the town map is missing');
    else {
      const px = Number(map.dataset.s3Pxin), mw = rr(map).width;
      if (Math.abs(mw - Number(map.getAttribute('width'))) > 0.5) f.push(`the town map is drawn ${mw.toFixed(1)} px wide, not at its own size (${map.getAttribute('width')}): its inches are not true inches`);
      const pairs = [...R.querySelectorAll('[data-s3-pair]')];
      if (!pairs.length) f.push('the map scale page asks no distance (the distance check would measure nothing)');
      pairs.forEach((p) => {
        const [a, b] = p.dataset.s3Pair.split('|'), da = map.querySelector(`[data-s3-dot="${a}"]`), db = map.querySelector(`[data-s3-dot="${b}"]`);
        if (!da || !db) { f.push(`the dot of the ${!da ? a : b} is missing`); return; }
        const [ax, ay] = ctr(da), [bx, by] = ctr(db), inch = Math.hypot(ax - bx, ay - by) / px;
        const want = p.dataset.dkAnswer.split(' ').reduce((s0, t) => s0 + (t === '1/2' ? 0.5 : Number(t)), 0);
        if (Math.abs(inch - want) * px > OPT.distTol) f.push(`from the ${a} to the ${b}: ${inch.toFixed(3)} inches on the page, the page says ${want}`);
      });
      // every label clear of every place's drawing (its own dot included) and of the other labels
      const labs = [...map.querySelectorAll('[data-s3-label]')], shapes = [...map.querySelectorAll('[data-s3-place]')];
      if (labs.length !== shapes.length || !labs.length) f.push(`${labs.length} labels for ${shapes.length} places`);
      labs.forEach((l) => { const box0 = rr(l.querySelector('rect')); shapes.forEach((s0) => { const own = s0.dataset.s3Place === l.dataset.s3Label; [...s0.children].forEach((c) => { if (own && c.tagName !== 'circle') return; if (overlap(box0, rr(c), 0.5)) f.push(`the label "${l.dataset.s3Label}" covers the ${s0.dataset.s3Place}`); }); }); });
      for (let i = 0; i < labs.length; i++) for (let j = i + 1; j < labs.length; j++) if (overlap(rr(labs[i]), rr(labs[j]), 0.5)) f.push('two place labels overlap');
    }
    const bar = R.querySelector('svg[data-s3-art="scale-bar"]');
    if (!bar) f.push('the scale bar is missing');
    else { const ticks = [...bar.querySelectorAll('line')].map((l) => ctr(l)[0]).sort((a, b) => a - b); if (ticks.length < 2) f.push('the scale bar has no ticks'); else { const seg = ticks[1] - ticks[0]; if (Math.abs(seg - OPT.pxin) > 0.5) f.push(`the scale bar's mile is ${seg.toFixed(2)} px (one inch is ${OPT.pxin})`); } }
    if (R.querySelector('[data-s3-tripfirst]') && !R.querySelector('[data-s3-triplen]')) f.push('the trip asks the first place but not its length');
    // review round 1: every place's dot sits ON a street (on a street's center line)
    if (map) {
      const streets = [...map.querySelectorAll('[data-s3-street]')].map((s0) => ({ k: s0.dataset.s3Street[0], b: rr(s0) }));
      const dotsP = [...map.querySelectorAll('[data-s3-dot]')];
      if (!streets.length || !dotsP.length) f.push('the town map draws no street or no dot (the street check would measure nothing)');
      dotsP.forEach((d0) => { const [cx, cy] = ctr(d0); const on = streets.some((s0) => (s0.k === 'y' ? Math.abs((s0.b.top + s0.b.bottom) / 2 - cy) <= 1.5 && cx >= s0.b.left && cx <= s0.b.right : Math.abs((s0.b.left + s0.b.right) / 2 - cx) <= 1.5 && cy >= s0.b.top && cy <= s0.b.bottom)); if (!on) f.push(`the ${d0.dataset.s3Dot}'s dot is not on a street`); });
    }
  }
  if (mode === 's3-virtues') {
    // review round 1: every situation the same writing room: the virtue line at least 2.5 inches, a full-width line for
    // "A good citizen would"
    const cards = [...R.querySelectorAll('[data-s3-sitcard]')];
    if (!cards.length) f.push('no situation cards (the writing-room check would measure nothing)');
    cards.forEach((c) => { const vw = c.querySelector('[data-s3-write] svg[data-dk-writerow], [data-s3-write][data-dk-writerow]'), vb = c.querySelector('[data-s3-write]'); const w0 = vw ? rr(vw).width : vb ? rr(vb).width : 0; if (w0 < OPT.virtueW) f.push(`the ${c.dataset.s3Sitcard} virtue line is ${w0.toFixed(0)} px (at least ${OPT.virtueW})`); const long = [...c.querySelectorAll('svg[data-dk-writerow]')].some((s0) => rr(s0).width >= OPT.fullLine); if (!long) f.push(`the ${c.dataset.s3Sitcard} card has no full-width line for "A good citizen would"`); });
  }
  if (mode === 's3-constitution') {
    // review round 1: each rule a full-width line and "because" a second full-width line
    const fr = R.querySelector('[data-s3-frame="constitution"]');
    if (!fr) f.push('the class constitution frame is missing');
    else { const nR = [...fr.querySelectorAll('span')].filter((s0) => /^\d\.$/.test(s0.textContent.trim())).length, long = [...fr.querySelectorAll('svg[data-dk-writerow]')].filter((s0) => rr(s0).width >= OPT.ruleLine).length; if (!nR) f.push('the class constitution has no numbered rule'); if (long < 2 * nR) f.push(`the class constitution has ${long} long lines for ${nR} rules (a full line for each rule and each "because")`); }
  }
  if (mode === 's3-taxes') {
    const art = R.querySelector('svg[data-s3-art="tax:payers"]');
    if (!art || !art.querySelector('[data-s3-drawn="tax-box"]')) f.push('the payers drop their money into no tax box');
    const boxes = [...R.querySelectorAll('[data-s3-drawbox]')];
    if (!R.querySelector('[data-s3-art^="service:"]') && (boxes.length !== 3 || boxes.some((b0) => rr(b0).height < 100))) f.push(`levels 2-3: ${boxes.length} drawing boxes for the services (three, each at least 100 px)`);
  }
  if (mode === 's3-live') {
    const maps = [...R.querySelectorAll('svg[data-s3-art^="us-"]')];
    if (maps.length !== 2) f.push(`${maps.length} US maps (two: where people live, the land)`);
    const marks = maps.map((m) => [...m.querySelectorAll('[data-s3-mark]')].map((g0) => ({ L: g0.dataset.s3Mark, id: g0.dataset.s3Place, c: ctr(g0.querySelector('circle')), m })));
    if (!marks.length || !marks[0].length) f.push('the maps mark no place (the check would measure nothing)');
    maps.forEach((m, i) => { const us = m.querySelector('[data-s3-us]'); if (!us) { f.push('a map without the United States'); return; } const inv = us.getScreenCTM().inverse(); marks[i].forEach((k) => { const pt = m.createSVGPoint(); pt.x = k.c[0]; pt.y = k.c[1]; if (!us.isPointInFill(pt.matrixTransform(inv))) f.push(`the letter ${k.L} is not on land`); }); });
    if (marks.length === 2) marks[0].forEach((k) => { const o = marks[1].find((x) => x.L === k.L); if (!o) { f.push(`the letter ${k.L} is on one map only`); return; } const r0 = rr(k.m), r1 = rr(o.m); if (Math.abs((k.c[0] - r0.left) - (o.c[0] - r1.left)) > 0.6 || Math.abs((k.c[1] - r0.top) - (o.c[1] - r1.top)) > 0.6) f.push(`the letter ${k.L} is not at the same place on both maps`); });
    // the people at each letter: the DRAWN dots within PLACE_R (frame units) of the letter, on the dot map
    const pm = maps.find((m) => m.dataset.s3Art === 'us-people');
    if (pm) {
      const dots = [...pm.querySelectorAll('[data-s3-dots] circle')];
      if (!dots.length) f.push('the dot map draws no dots');
      const k = Number(pm.dataset.s3K), M0 = pm.getScreenCTM(), box0 = rr(pm);
      const centres = dots.map((c0) => { const p = new DOMPoint(Number(c0.getAttribute('cx')), Number(c0.getAttribute('cy'))).matrixTransform(c0.getScreenCTM()); return [p.x, p.y]; });
      void M0;
      [...pm.querySelectorAll('[data-s3-mark]')].forEach((g0) => {
        const [cx, cy] = ctr(g0.querySelector('circle')), Rpx = OPT.placeR * k * (box0.width / Number(pm.getAttribute('width')));
        const n = centres.filter(([x, y]) => Math.hypot(x - cx, y - cy) <= Rpx).length, said = (R.querySelector(`[data-dk-item="${g0.dataset.s3Mark}"] [data-dk-answer="right"]`) || {}).dataset;
        if (!said) { f.push(`the letter ${g0.dataset.s3Mark} has no many / few to circle`); return; }
        const truth = n >= OPT.many ? 'many' : n <= OPT.few ? 'few' : 'unclear';
        if (truth === 'unclear') f.push(`the letter ${g0.dataset.s3Mark}: ${n} dots near it (neither many, at least ${OPT.many}, nor few, at most ${OPT.few})`);
        else if (said.s3People !== truth) f.push(`the letter ${g0.dataset.s3Mark}: the map shows ${truth} people (${n} dots), the page says ${said.s3People}`);
      });
    }
  }
  if (mode === 's3-settle') {
    const map = R.querySelector('svg[data-s3-art="resource-state"]');
    if (!map) f.push('the sample state is missing');
    else {
      const sites = [...map.querySelectorAll('[data-s3-site]')];
      if (!sites.length) f.push('the map marks no site');
      const dry = map.querySelector('[data-s3-drawn="dry-rocky"] path'), river = map.querySelector('[data-s3-drawn="river"]'), bay = map.querySelector('[data-s3-drawn="harbor"] path');
      sites.forEach((s0) => {
        const c = s0.querySelector('circle'), cx = Number(c.getAttribute('cx')), cy = Number(c.getAttribute('cy')), pt = new DOMPoint(cx, cy);
        const near = (el, R0) => { const L0 = el.getTotalLength(); for (let t = 0; t <= L0; t += 2) { const p = el.getPointAtLength(t); if (Math.hypot(p.x - cx, p.y - cy) <= R0) return true; } return false; };
        if (s0.dataset.s3Site === 'dry' && !dry.isPointInFill(pt)) f.push('the dry site is not in the dry, rocky land');
        if (s0.dataset.s3Site === 'dry' && near(river, OPT.siteFar)) f.push('the dry site is near the river');
        if (s0.dataset.s3Site === 'river' && !near(river, OPT.siteNear)) f.push('the river site is not by the river');
        if (s0.dataset.s3Site === 'harbor' && !near(bay, OPT.siteNear)) f.push('the harbor site is not by the harbor');
        if (s0.dataset.s3Site !== 'harbor' && near(bay, OPT.siteFar)) f.push(`the ${s0.dataset.s3Site} site is by the harbor too`);
        map.querySelectorAll('[data-s3-landlabel]').forEach((l) => { if (overlap(rr(l), rr(c), 0.5)) f.push(`the word "${l.dataset.s3Landlabel}" covers a site`); });
        // review round 1: no site is near the mine (else it "has minerals", and a mining town is arguable)
        const mine = map.querySelector('[data-s3-drawn="mine"]');
        if (!mine) f.push('the mine is missing');
        else { const [mx, my] = ctr(mine), [sx, sy] = ctr(c); if (Math.hypot(mx - sx, my - sy) < OPT.mineFar) f.push(`the ${s0.dataset.s3Site} site is near the mine (${Math.hypot(mx - sx, my - sy).toFixed(0)} px)`); }
      });
    }
  }
  if (mode === 's3-timeline') {
    const tl = R.querySelector('svg[data-s3-art="timelines"]');
    if (!tl) f.push('the timelines are missing');
    else { const x0 = Number(tl.dataset.s3X0), x1 = Number(tl.dataset.s3X1), ticks = [...tl.querySelectorAll('[data-s3-tick]')]; if (ticks.length !== 2 * 17) f.push(`${ticks.length} ticks (17 on each timeline)`); ticks.forEach((t) => { const yr = Number(t.dataset.s3Tick), x = Number(t.getAttribute('x1')); if (Math.abs(x - (x0 + (yr - OPT.from) * (x1 - x0) / (OPT.to - OPT.from))) > 0.2) f.push(`the tick of ${yr} is off its place`); }); }
  }
  // review round 2: a box that fills its space holds no empty band (its content within OPT.fillBand of its top and its
  // bottom), and a stacked column of boxes no empty band between them (OPT.stackGap)
  const inkOf = (b) => [...b.querySelectorAll('[data-dk-box], svg, img')].filter((e) => e !== b && !(e.parentElement && e.parentElement.closest('svg'))).map(rr).filter((x) => x.width > 1 && x.height > 1);
  R.querySelectorAll('[data-s3-fill]').forEach((b) => { const q0 = rr(b), ink = inkOf(b); if (!ink.length) { f.push(`${b.dataset.s3Fill}: nothing in it`); return; } const top = Math.min(...ink.map((x) => x.top)) - q0.top, bot = q0.bottom - Math.max(...ink.map((x) => x.bottom)); if (top > OPT.fillBand || bot > OPT.fillBand) f.push(`${b.dataset.s3Fill}: ${Math.round(Math.max(top, bot))} px of empty box ${top > bot ? 'above' : 'below'} its content (at most ${OPT.fillBand})`); });
  R.querySelectorAll('[data-s3-stack]').forEach((st0) => { const q0 = rr(st0), kids = [...st0.children].map(rr).filter((x) => x.height > 1).sort((x, y) => x.top - y.top); if (!kids.length) { f.push(`${st0.dataset.s3Stack}: nothing in it`); return; } const gaps = [kids[0].top - q0.top, ...kids.slice(1).map((k, i) => k.top - kids[i].bottom), q0.bottom - kids[kids.length - 1].bottom]; const worst = Math.max(...gaps); if (worst > OPT.stackGap) f.push(`${st0.dataset.s3Stack}: an empty band of ${Math.round(worst)} px between its boxes (at most ${OPT.stackGap})`); });
  if (mode === 's3-gridmap') {
    // review round 2: the street-name plates big enough to write in (0.3 by 1.6 inches at least, a writing line of 1.2
    // inches); the key lines of levels 2-3 at least 1.5 inches long
    const grid = R.querySelector('svg[data-s3-art="grid"]'), plates = grid ? [...grid.querySelectorAll('[data-s3-streetname]')] : [];
    // review round 3: every plate stands upright (wider than tall, its writing line level) and sits on its own street
    // (the across plate on the across street's line, the up-down plate on the up-down street's line)
    plates.forEach((p0) => { const b = rr(p0.querySelector('rect')), ln = p0.querySelector('[data-s3-plateline]'), lb = ln ? rr(ln) : null, st0 = grid.querySelector(`[data-s3-street="${p0.dataset.s3Streetname}"] rect`); if (b.width <= b.height || !lb || lb.height > 2) f.push(`the ${p0.dataset.s3Streetname} street's name plate is turned on its side (a child would write sideways)`); if (!st0) { f.push(`the ${p0.dataset.s3Streetname} street is missing`); return; } const sb = rr(st0), [px0, py0] = [(b.left + b.right) / 2, (b.top + b.bottom) / 2]; const on = p0.dataset.s3Streetname === 'down' ? Math.abs(px0 - (sb.left + sb.right) / 2) <= 2 : Math.abs(py0 - (sb.top + sb.bottom) / 2) <= 2; if (!on) f.push(`the ${p0.dataset.s3Streetname} street's name plate is not on its street`); });
    if (R.querySelector('svg[data-s3-art^="key:"]')) {
      if (plates.length !== 2) f.push(`level 1: ${plates.length} street-name plates (two)`);
      plates.forEach((p0) => { const b = rr(p0.querySelector('rect')), lo = Math.min(b.width, b.height), hi = Math.max(b.width, b.height); if (lo < OPT.plateThick || hi < OPT.plateLong) f.push(`the ${p0.dataset.s3Streetname} street's name plate is ${(lo / OPT.pxin).toFixed(2)} by ${(hi / OPT.pxin).toFixed(2)} inches (at least ${(OPT.plateThick / OPT.pxin).toFixed(1)} by ${(OPT.plateLong / OPT.pxin).toFixed(1)})`); const ln = p0.querySelector('[data-s3-plateline]'); const L0 = ln ? Math.max(rr(ln).width, rr(ln).height) : 0; if (L0 < OPT.plateLine) f.push(`the ${p0.dataset.s3Streetname} street's name plate has ${(L0 / OPT.pxin).toFixed(2)} inches to write in (at least ${(OPT.plateLine / OPT.pxin).toFixed(1)})`); });
    } else {
      const key = R.querySelector('[data-s3-box="key"]'), lines0 = key ? [...key.querySelectorAll('svg[data-dk-writerow]')] : [];
      if (lines0.length !== 5) f.push(`levels 2-3: ${lines0.length} key lines (five)`);
      lines0.forEach((l, i) => { const w0 = rr(l).width; if (w0 < OPT.keyLine) f.push(`key line ${i + 1} is ${(w0 / OPT.pxin).toFixed(2)} inches (at least ${(OPT.keyLine / OPT.pxin).toFixed(1)})`); });
    }
  }
  if (mode === 's3-live') {
    // review round 3: every colour the land map fills has a key entry (a swatch of that colour beside its word)
    const lmap = R.querySelector('svg[data-s3-art="us-land"]'), key = R.querySelector('svg[data-s3-art="key-land"]');
    if (!lmap || !key) f.push('the land map or its key is missing');
    else {
      const keyed = new Set([...key.querySelectorAll('[data-s3-keyfill]')].map((e) => e.getAttribute('fill').toUpperCase()));
      const fills = new Set([...lmap.querySelectorAll('path, rect, circle, ellipse, polygon')].filter((e) => !e.closest('defs, clipPath, pattern, [data-s3-mark]')).map((e) => (e.getAttribute('fill') || (e.closest('[fill]') || { getAttribute: () => '' }).getAttribute('fill') || '').toUpperCase()).filter((c) => c && c !== 'NONE' && !c.startsWith('URL(')));
      if (!fills.size) f.push('the land map fills nothing (the key check would measure nothing)');
      for (const c of fills) if (!keyed.has(c)) f.push(`the land map's colour ${c} has no key entry`);
    }
  }
  if (mode === 's3-settle') {
    // review round 2: the north arrow sits in the sea, on every copy (mirrored ones too): no point of it on the land, a
    // region, a label or a site
    const map = R.querySelector('svg[data-s3-art="resource-state"]'), na = map && map.querySelector('[data-s3-drawn="north-arrow"]');
    if (!na) f.push('the sample state has no north arrow');
    else {
      const bb = na.getBBox(), SC = na.getScreenCTM(), pts = [];
      for (let i = 0; i <= 8; i++) for (let j = 0; j <= 8; j++) pts.push(new DOMPoint(bb.x + bb.width * i / 8, bb.y + bb.height * j / 8).matrixTransform(SC));
      const shapes = [...map.querySelectorAll('[data-s3-drawn]:not([data-s3-drawn="north-arrow"]), [data-s3-landlabel], [data-s3-site]')].flatMap((e) => (e.matches('path, rect, circle, ellipse, polygon, line, polyline') ? [e] : [...e.querySelectorAll('path, rect, circle, ellipse, polygon, line, polyline')]).map((x) => [e, x]));
      if (!map.querySelector('[data-s3-drawn="land"]')) f.push('the sample state draws no land (the north-arrow check would measure nothing)');
      const hit = new Set();
      shapes.forEach(([e, x]) => { const inv = x.getScreenCTM().inverse(); if (pts.some((p) => { const q0 = p.matrixTransform(inv); return x.isPointInFill(q0) || x.isPointInStroke(q0); })) hit.add(e.dataset.s3Drawn || (e.dataset.s3Landlabel ? 'the word ' + e.dataset.s3Landlabel : 'site ' + e.dataset.s3Site)); });
      if (hit.size) f.push(`the north arrow sits on ${[...hit].join(', ')}`);
    }
  }
  if (mode === 's3-branches') {
    // review round 2: "(a veto)" never breaks across two lines
    const cm = R.querySelector('[data-s3-checkmeans]'), tn = cm && [...cm.childNodes, ...cm.querySelectorAll('*')].flatMap((e) => (e.nodeType === 3 ? [e] : [...e.childNodes].filter((c) => c.nodeType === 3))).find((t) => /\(a\sveto\)/.test(t.nodeValue));
    if (!tn) f.push('the page does not say "(a veto)"');
    else { const i = tn.nodeValue.search(/\(a\sveto\)/), rg = document.createRange(); rg.setStart(tn, i); rg.setEnd(tn, i + 8); const tops = new Set([...rg.getClientRects()].filter((x) => x.width > 0.5).map((x) => Math.round(x.top))); if (tops.size > 1) f.push('"(a veto)" breaks across two lines'); }
  }
  if (mode === 's3-causes') {
    // review round 2: the story is never smaller than level 2's (the hardest level does not get the smallest text)
    const ss = [...R.querySelectorAll('[data-s3-storysent]')];
    if (!ss.length) f.push('no story sentences (the story-size check would measure nothing)');
    ss.forEach((e) => { const fs0 = parseFloat(getComputedStyle(e).fontSize); if (fs0 < OPT.storyMin) f.push(`a story sentence at ${fs0}px (at least ${OPT.storyMin})`); });
  }
  // a column of a sort holds the same number of lines as every other column of the page
  const cols = [...R.querySelectorAll('[data-s3-column]')].map((c) => c.querySelectorAll('[data-dk-writerow]').length);
  if (cols.length && new Set(cols).size > 1) f.push(`the columns hold ${cols.join(', ')} lines (the same number in each: a column's count would tell)`);
  return f;
}
const S3_OPT = { pxin: IN, distTol: 0.75, placeR: GEO.PLACE_R, many: 60, few: 12, siteNear: 26, siteFar: 40, mineFar: 120, virtueW: 239.5, fullLine: 560, ruleLine: 520, from: B.TIMELINE_FROM, to: B.TIMELINE_TO,
  // review round 2
  fillBand: 30, stackGap: 20, plateThick: 0.3 * IN, plateLong: 1.6 * IN, plateLine: 1.2 * IN, keyLine: 1.5 * IN, storyMin: 18 };
/** makeS3Type({ id, slug, mode, exerciseType, difficulty, i18n }) */
function makeS3Type({ id, slug, mode, exerciseType, difficulty, i18n }) {
  if (!MODES[mode]) throw new Error('dk-social-3: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G3', assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    difficulty,
    i18n,
    dkMode: mode,
    build({ difficulty: lv, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the Batch S3 pages are English (no ${locale} bank)`);
      const d = { ...(this.difficulty[lv] || this.difficulty[2]), level: Number(lv) };
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${DK.CSS}${S3CSS}</style><div class="dk-root" data-ws-content data-dk="${mode}" data-dk-level="${lv}" data-dk-record="${out.meta.record ? 1 : 0}">${out.html}</div>`,
        meta: { mode, level: Number(lv), ...out.meta },
      };
    },
    /** what a Level Set copy asks (build-waves compares copies on it): the items each page draws */
    levelSetWords(meta) { return (meta.items || []).map(String); },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(G.g1VerifyInPage), await page.evaluate(SK.skVerifyInPage, [...A.PAL3], SK.SK_OPT), await page.evaluate(S1.s1VerifyInPage, S1.S1_OPT), await page.evaluate(S2.s2VerifyInPage, S2.S2_OPT), await page.evaluate(s3VerifyInPage, S3_OPT));
    },
  };
}

module.exports = { makeS3Type, MODES, s3VerifyInPage, S3_OPT, matchings, scaleLayout, IN };
