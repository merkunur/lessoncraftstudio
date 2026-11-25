/**
 * dk-social-2.js — Batch S2 (Daily Teaching System Stage D-5, 2026-11-25): the Grade 2 social studies pages the English
 * year design (scripts/units/year/design.en.social.json, grade "2") needs:
 *   G2-614 s2-view       My View, Your View                     (all-about-me, D2.Civ.10.K-2; a record page; a change of G1-531)
 *   G2-615 s2-laws       Laws in Our Community                  (science-match, D2.Civ.3.K-2)
 *   G2-616 s2-gov        Local, State and National Government   (science-sort, D2.Civ.5.K-2)
 *   G2-617 s2-services   Services Our Government Provides       (science-sort, D2.Eco.12.K-2)
 *   G2-618 s2-change     How Places Change                      (maps, D2.Geo.10.K-2)
 *   G2-619 s2-disaster   When Disaster Strikes                  (maps, D2.Geo.12.K-2)
 *   G2-620 s2-traditions Winter Traditions Families May Keep    (family, D2.Geo.6.K-2)
 *   G2-621 s2-labels     Where Does It Come From?               (maps, D2.Geo.11.K-2)
 *   G2-622 s2-trade      Made Here, Sold There                  (science-sort, D2.Eco.15.K-2)
 *   G2-623 s2-islands    Why Countries Trade                    (maps, D2.Eco.14.K-2)
 *   G2-624 s2-accounts   Two Stories of the Same Day            (reading-comprehension, D2.His.6.K-2; a change of G3-579)
 *   G2-625 s2-photo      Questions About an Old Photograph      (family, D2.His.12.K-2; a record page)
 *   G2-626 s2-town       Why Did the Town Change?               (reading-comprehension, D2.His.16.K-2; a change of G2-527)
 *   G2-627 s2-tools      Tools and Skills for the Job           (science-sort, D2.Eco.13.K-2)
 *   G2-628 s2-lemonade   What Does It Cost to Make?             (money, D2.Eco.7.K-2; a change of G2-291)
 *   G2-629 s2-bank       What Banks Do                          (money, D2.Eco.9.K-2)
 *   G2-630 s2-market     Class Market Day                       (money, D2.Eco.5.K-2; the teacher-led lesson's page)
 * English (American) only; themeless; PDF only. Built on the Batch K CSS and page check (dk-kinder.js), the Grade 1 kit
 * (dk-g1.js), the Batch SK figure, palette and page check (dk-social-k.js) and the Batch S1 page check, coins and helpers
 * (dk-social-1.js, dk-social-1-art.js). None of those files is edited: this file has its OWN modes table.
 *
 * Grade 2 reads short texts: the teacher reads the instruction (a level prints its own, i18n/level-instructions.json);
 * sentences of about 12 words or fewer; word banks at levels 1-2, sentence frames at level 3. Numbers within 1,000; money
 * in cents to a dollar and in whole dollars. CLOSED items carry their one answer as data-dk-answer (never printed; the
 * gate qa/verify-dk-social-2.js re-derives each from its own tables); RECORD parts hold no answer. Drawings:
 * dk-social-2-art.js (every colour in its PAL2). Library pictures: colour only, placed at BUILD time. Bank:
 * data/social/dk-social-2.js; maps: data/social/dk-social-2-geo.js (Natural Earth).
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const DK = require('./dk-kinder.js');
const G = require('./dk-g1.js');
const SK = require('./dk-social-k.js');
const S1 = require('./dk-social-1.js');
const A1 = require('./dk-social-1-art.js');
const A = require('./dk-social-2-art.js');
const B = require('../../data/social/dk-social-2.js');
const B1 = require('../../data/social/dk-social-1.js');

const T = TOK.color;
const W = 675;
const { box, tile, labelledDraw, chip, head, col, row, grow, writeRow, lineBox, frameLine, numBox, esc, f1 } = G.kit;
const { derange } = DK;
const { splitOrder, rightOrder, sides, payWays, wayKey, coinPx } = S1;
const MODES = {};

/* ================================================================ the layout kit */
const S2CSS = `
.g1-chip{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:2px 11px;font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;line-height:20px;color:${T.teal};white-space:nowrap}
.g1-text{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
.g1-small{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:14px;line-height:17px;color:${T.ink};text-align:center}
.s2-text{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:normal}
.s2-sm{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;line-height:18px;color:${T.ink};white-space:normal;text-align:center}
.s2-q{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:19px;line-height:23px;color:${T.teal};white-space:nowrap}
.s2-pick{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:3px 13px;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
.s2-letter{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:26px;line-height:28px;color:${T.teal}}
.s2-story{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:18px;line-height:34px;color:${T.ink};white-space:normal}
.sk-or{font-family:'Baloo 2',cursive;font-weight:700;font-size:20px;color:${T.inkSoft}}
`;
/** an svg drawing (Batch SK style: the lint leaves its colours to this batch's gate, which holds them to PAL2) */
const scene = (body, w, h, vb, attrs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" style="display:block;overflow:hidden" data-lcs-prim="sk-art"${attrs ? ' ' + attrs : ''}>${body}</svg>`;
const pic = (p, w, h = w) => `<img class="ws-icon" data-dk-pic="${esc(p.theme + '/' + p.noun)}" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${w}px;height:${h}px;display:block;object-fit:contain">`;
const txt = (t, w, attrs = '', cls = 's2-text', style = '') => `<span class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''} style="width:${typeof w === 'number' ? w + 'px' : w}${style ? ';' + style : ''}">${esc(t)}</span>`;
const q = (t, attrs = '', style = '') => `<span class="s2-q" data-dk-box${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(t)}</span>`;
const pick = (t, answer, attrs = '', inner = '') => `<span class="s2-pick" data-dk-box data-s2-pick="${esc(t)}"${answer ? ` data-dk-answer="${answer}"` : ''}${attrs ? ' ' + attrs : ''}>${inner}${esc(t)}</span>`;
const dot = (attrs = '') => `<span class="dk-dot" data-dk-box${attrs ? ' ' + attrs : ''}></span>`;
/** a white tile of sentence frames on writing lines (one frame per line) */
const frames = (lines, attrs = '', w = W, rowH = 48, style = '') => box('dk-tile dk-tile--white', w, 'auto', col(lines.map((l) => (l.head ? q(l.head) : frameLine(l, rowH))).join(''), 4, 'align-items:flex-start'), 'data-g1-frames="1"' + (attrs ? ' ' + attrs : ''), 'padding:6px 14px;justify-content:flex-start;flex-shrink:0' + (style ? ';' + style : ''));
const cast = (n, rng, opts) => SK.cast(n, rng, opts);
/** a box a child colors (about 0.5 inch) */
const colorBox = (id, px = 50) => `<span data-dk-box data-s1-colorbox="${id}" style="display:block;box-sizing:border-box;width:${px}px;height:${px}px;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF"></span>`;
/** a colour key chip: a swatch and its words */
const keyChip = (hex, word, attrs = '') => `<span data-dk-box${attrs ? ' ' + attrs : ''} style="display:flex;align-items:center;gap:8px;font-family:'Nunito',sans-serif;font-weight:800;font-size:18px;color:${T.ink}"><span data-dk-box style="display:block;width:30px;height:30px;border-radius:7px;border:2px solid ${T.ink};background:${hex}"></span>${esc(word)}</span>`;
/** the order of a word box: never the order the items ask for the words */
function wordOrder(set, rng) { for (let t = 0; t < 200; t++) { const o = rng.shuffle(set); if (o.some((x, i) => x !== set[i])) return o; } return set.slice().reverse(); }
/** a permutation of n that is not the identity (n >= 2), for lettered answers */
const notIdentity = (n, rng) => { for (let t = 0; t < 200; t++) { const p = rng.shuffle([...Array(n).keys()]); if (n < 2 || p.some((x, i) => x !== i)) return p; } return [...Array(n).keys()].reverse(); };

/** a match: a line from each left dot to its partner's dot (the S1 marks: data-s1-key / data-dk-answer / data-s1-right) */
function matchRows(lefts, rights, lw, rw, h, gapMid = 60, rowFlex = 'flex:0 0 auto') {
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

/* ================================================================ G2-614 my view, your view (a record page) */
/** two overlapping circles with their three parts named and lines to write on in each (w x h px) */
function venn(w, h, linesIn, attrs = '') {
  // two wide overlapping ovals: each part (only me, both of us, only my partner) about a third of the width, so a word
  // or a short sentence fits on its lines
  const ry = h / 2 - 20, rx = w * 0.31, cx1 = w / 2 - rx * 0.52, cx2 = w / 2 + rx * 0.52, cy = h / 2 + 12;
  const lab = (x, t, id) => `<text x="${f1(x)}" y="22" text-anchor="middle" font-family="Baloo 2, cursive" font-weight="700" font-size="19" fill="${T.teal}" data-s2-part="${id}">${t}</text>`;
  let s = `<ellipse cx="${f1(cx1)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${T.coralSoft}" fill-opacity="0.6" stroke="${T.coral}" stroke-width="3"/><ellipse cx="${f1(cx2)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${T.tealSoft}" fill-opacity="0.6" stroke="${T.teal}" stroke-width="3"/>`;
  const lensL = cx2 - rx, lensR = cx1 + rx;   // the shared part, at the middle line
  s += lab((cx1 - rx + lensL) / 2, B.VIEW_PARTS[0], 'me') + lab(w / 2, B.VIEW_PARTS[1], 'both') + lab((lensR + cx2 + rx) / 2, B.VIEW_PARTS[2], 'partner');
  // lines to write on in each part, inside the ovals (each line kept inside its part at its own height)
  for (let k = 0; k < linesIn; k++) {
    const y = cy + 4 + (k - (linesIn - 1) / 2) * 42, dy = (y - cy) / ry, half = Math.sqrt(Math.max(0, 1 - dy * dy)) * rx;
    const xs = [[cx1 - half + 10, cx2 - half - 8, 'me'], [cx2 - half + 8, cx1 + half - 8, 'both'], [cx1 + half + 8, cx2 + half - 10, 'partner']];
    for (const [x1, x2, id] of xs) s += `<line x1="${f1(x1)}" y1="${f1(y)}" x2="${f1(x2)}" y2="${f1(y)}" stroke="${T.ink}" stroke-width="1.6" data-s2-vennline="${id}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="0 0 ${f1(w)} ${f1(h)}" style="display:block" data-lcs-prim="sk-art" data-s2-venn="1"${attrs ? ' ' + attrs : ''}>${s}</svg>`;
}
MODES['s2-view'] = function view(d, rng) {
  const parts = [];
  if (d.pics) {
    // level 1: four rule pictures, numbered; the child writes the number of the rule and a word from the box
    const set = rng.sample(B.VIEW_RULES, 4), looks = cast(8, rng);
    const card = (r, i) => tile(col(`<span class="s2-letter" data-dk-box data-s2-num="${i + 1}">${i + 1}</span>` + scene(A.ruleArt(r.id, looks.slice(2 * i, 2 * i + 2)), 112, 112, '0 0 100 100', `data-s2-art="rule:${r.id}"`) + txt(r.text, 146, `data-s2-rule="${r.id}"`, 's2-sm'), 2), 158, 'auto', `data-s2-rulecard="${r.id}"`, 'white', 'padding:4px 0;flex:1 1 auto');
    parts.push(row(set.map(card).join(''), 8, 'align-items:stretch'));
    parts.push(box('dk-tile dk-tile--white', W, 'auto', row(q('Word box:') + B.VIEW_WORDS.map((w) => chip(w, `data-s2-word="${esc(w)}"`)).join(''), 8, 'flex-wrap:wrap'), 'data-s2-wordbox="1"', 'padding:5px 8px;flex-shrink:0'));
    parts.push(frames([['I think our most important rule is number', 70, '.'], ['It helps us', 220, '.'], ['My partner thinks it is number', 70, '.'], ['It helps us', 220, '.']], 'data-s2-frame="views"', W, 42));
    parts.push(box('dk-tile', W, 'auto', col(q('How are our ideas alike and different? Write a word in each part.') + venn(W - 30, 200, 2), 2), 'data-s2-vennpart="1" data-s2-fill="the circles"', 'padding:6px 0;flex:1 1 auto;justify-content:center'));
    return { html: grow(parts.join(''), 'gap:8px'), meta: { record: 1, items: set.map((r) => r.id) } };
  }
  // review round 1 (rows 1-2): both rule frames get their full-width second line and the circles three lines a part at
  // level 3 too (the hardest level never gives the least room); level 3 packs its rows a little closer to fit
  const rh = d.agree ? 40 : 44;
  parts.push(frames([{ head: 'My view' }, ['I think our most important rule is', 290], [W - 40, '.'], ['because', W - 140, '.']], 'data-s2-frame="mine"', W, rh));
  parts.push(frames([{ head: 'My partner\'s view' }, ['My partner thinks our most important rule is', 200], [W - 40, '.'], ['because', W - 140, '.']], 'data-s2-frame="partner"', W, rh));
  const vh = d.agree ? 196 : 236;
  parts.push(box('dk-tile', W, 'auto', col(q('How are our views alike and different?') + venn(W - 30, vh, 3), 2), 'data-s2-vennpart="1" data-s2-fill="the circles"', 'padding:2px 0;flex:1 1 auto;justify-content:center'));
  if (d.agree) parts.push(frames([['Our class agreement: We will', 330], ['and we will', 480, '.']], 'data-s2-frame="agreement"', W, rh));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: 1, items: [String(d.level)] } };
};


/* ================================================================ G2-615 laws in our community */
MODES['s2-laws'] = function laws(d, rng) {
  let set;
  if (d.n === 2) { for (let t = 0; t < 200; t++) { set = rng.sample(B.LAWS, 2); if (!B.LAW_CONFUSABLE.some(([a, b]) => set.some((x) => x.id === a) && set.some((x) => x.id === b))) break; } } else set = rng.shuffle(B.LAWS);
  const n = set.length, perm = d.n === 2 ? (rng.next() < 0.5 ? [0, 1] : [1, 0]) : derange(n, rng), letters = 'ABCD';
  // the problems, lettered, in an order never the laws' own (2 laws: either order, half the time)
  const probs = perm.map((j) => set[j].problem);
  const letterOf = (p) => letters[probs.indexOf(p)];
  const looks = cast(n + 1, rng), cars = ['#4A7BD0', '#D9534F', '#6BB36B', '#8E6CC5'];
  const big = d.n === 2, pw = big ? 330 : d.frame ? 132 : 176, ph = Math.round(pw * 100 / 140);
  const pbox = box('dk-tile dk-tile--white', W, 'auto', col(q('Problems') + row(probs.map((p, i) => `<span data-dk-box data-s2-problem="${p}" style="display:flex;align-items:center;gap:8px"><span class="s2-letter">${letters[i]}</span>${txt(B.PROBLEMS[p], big ? 220 : 128, '', 's2-text')}</span>`).join(''), big ? 30 : 14, 'justify-content:flex-start;flex-wrap:nowrap;width:100%'), 2, 'align-items:flex-start'), 'data-s2-problems="1"', 'padding:6px 14px;flex-shrink:0');
  const rows = set.map((l, i) => tile(row(scene(A.lawArt(l.id, [{ ...looks[i], car: rng.pick(cars) }]), pw, ph, '0 0 140 100', `data-s2-art="law:${l.id}"`) + col(txt(l.text, W - pw - 140, `data-s2-law="${l.id}"`, 's2-text', big ? 'font-size:22px;line-height:27px' : '') + row(txt('It stops problem', 136, '', 's2-sm', 'text-align:left') + numBox(56, 48, `data-s2-write="${l.id}" data-dk-answer="${letterOf(l.problem)}"`), 10, 'justify-content:flex-start'), 10, 'align-items:flex-start'), 18, 'justify-content:flex-start;padding:0 12px'), W, 'auto', `data-s2-lawrow="${l.id}" data-s2-fill="the law ${l.id}"`, 'white', 'padding:6px 0;flex:1 1 auto'));
  const parts = [pbox, col(rows.join(''), 8, 'flex:1 1 auto;align-items:stretch')];
  if (d.frame) parts.push(frames([['The law:', 480], ['Our community needs this law because', 220], [W - 40, '.']], 'data-s2-frame="needs"', W, 46));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { items: set.map((l) => l.id + ':' + letterOf(l.problem)), letters: set.map((l) => letterOf(l.problem)) } };
};

/* ================================================================ G2-616 local, state and national government */
function leaderCard(l, look, groupLooks, w) {
  // review round 1 (row 7): a grown-up in a jacket at a lectern with a flag; the council and Congress the same grown-ups
  const art = l.group ? A.leaderGroup(groupLooks, l.id === 'congress' ? 2 : 1) : A.leaderOne(look);
  const aw = w === 129 ? w - 10 : w - 26;   // level 2 (five cards): the picture fills its card (review round 1, row 8)
  return tile(col(scene(art, aw, aw, '0 0 100 100', `data-s2-art="leader:${l.id}"`) + chip(l.word, `data-s2-role="${l.id}"`, w < 150 ? 'font-size:13px;padding:1px 6px' : ''), 4), w, 'auto', `data-s2-leader="${l.id}" data-dk-answer="${l.level}"`, 'white', 'padding:6px 0');
}
MODES['s2-gov'] = function gov(d, rng) {
  // the five cards never lined up by level, small to large or large to small (a child would read the boxes off the order)
  const LV = ['local', 'state', 'national'], lined = (o) => o.every((x, i) => i === 0 || LV.indexOf(o[i - 1].level) <= LV.indexOf(x.level)) || o.every((x, i) => i === 0 || LV.indexOf(o[i - 1].level) >= LV.indexOf(x.level));
  const set = d.n === 3 ? rng.shuffle(B.GOV_LEADERS.filter((l) => ['mayor', 'governor', 'president'].includes(l.id))) : (() => { for (let t = 0; t < 200; t++) { const o = rng.shuffle(B.GOV_LEADERS); if (!lined(o)) return o; } throw new Error('dk-social-2: no order for the leaders'); })();
  const looks = cast(20, rng);
  const cw = set.length === 3 ? 190 : d.jobs ? 112 : 129;
  const cards = row(set.map((l, i) => leaderCard(l, looks[i], looks.slice(5, l.id === 'congress' ? 13 : 10), cw)).join(''), set.length === 3 ? 22 : 7, 'align-items:stretch');
  // the nested boxes: our country holds our state, our state holds our town or city; each with its picture and two lines
  const lineW = d.jobs ? 270 : 330, lh = d.jobs ? 33 : d.n === 3 ? 42 : 50;
  // review round 1 (row 9): the state picture is captioned "one state" (it is one example, not the child's state), and the
  // State box has a line "Our state is ___." for the child to write theirs, on every level
  const icon = (id, w, h) => (id === 'national' ? scene(A.usCountry(160, 120), w, h, '0 0 160 120', 'data-s2-art="level:national"') : id === 'state' ? col(scene(A.stateIcon(160, 120), w, h - 16, '0 0 160 120', 'data-s2-art="level:state"') + `<span class="g1-small" data-dk-box data-s2-onestate="1">one state</span>`, 0) : scene(A.townIcon(), h, h, '0 0 100 100', 'data-s2-art="level:local"'));
  const iw = d.jobs ? 110 : d.n === 3 ? 132 : 160, ih = d.jobs ? 82 : d.n === 3 ? 99 : 120;
  // review round 2 (row 10): the line runs to the State box's right edge and holds the longest names in Grade 2 handwriting
  // (North Carolina, Massachusetts: 14 letters at a quarter inch each, 3.5 inches)
  const OUR_STATE_LINE = 336;
  const ourState = (L) => (L.id === 'state' ? frameLine(['Our state is', OUR_STATE_LINE, '.'], d.jobs ? 33 : d.n === 3 ? 42 : 46).replace('data-dk-box', 'data-dk-box data-s2-ourstate="1"') : '');
  const band = (L, inner, pad) => box('dk-tile dk-tile--white', 'auto', 'auto', col(row(icon(L.id, iw, ih) + col(q(L.word + ': ' + L.place, `data-s2-levelword="${L.id}"`) + ourState(L) + lineBox(lineW, lh) + lineBox(lineW, lh), 2, 'align-items:flex-start'), 12, 'justify-content:flex-start;width:100%') + inner, 6, 'align-items:stretch'), `data-s2-level="${L.id}"`, `padding:${pad};border:2.5px solid ${L.id === 'national' ? T.teal : L.id === 'state' ? T.coral : T.inkSoft};align-self:stretch`);
  const [N, S, Lo] = B.GOV_LEVELS;
  const nested = band(N, band(S, band(Lo, '', '6px 10px'), '6px 10px'), '6px 10px');
  const parts = [txt(B.GOV_DEFINITION, W - 20, 'data-s2-definition="1"', 's2-text', 'text-align:center'), cards, nested];
  if (d.jobs) parts.push(frames([{ head: 'One job of each level:' }, ['Local:', 560], ['State:', 560], ['National:', 540]], 'data-s2-frame="jobs"', W, 38));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { items: set.map((l) => l.id + ':' + l.level) } };
};

/* ================================================================ G2-617 services our government provides */
MODES['s2-services'] = function services(d, rng) {
  const svc = B.SERVICE_PLACES.filter((p) => p.kind === 'service'), biz = B.SERVICE_PLACES.filter((p) => p.kind === 'business');
  const chosen = d.n === 5 ? [...rng.sample(svc, 4), rng.pick(biz)] : [...svc, ...biz];
  const onLots = rng.shuffle(chosen.filter((p) => p.id !== 'road').map((p) => p.id));
  const hasRoad = chosen.some((p) => p.id === 'road');
  const nTop = Math.ceil(onLots.length / 2), top = onLots.slice(0, nTop), bottom = onLots.slice(nTop);
  const H = d.n === 5 ? 640 : d.frame ? 300 : 516, roadAt = hasRoad ? 0.18 + rng.next() * 0.64 : null;
  const town = scene(A.serviceTown(655, H, top, bottom, roadAt, cast(9, rng)), 655, H, `0 0 655 ${H}`, 'data-s2-art="town"');
  const parts = [txt('A government service is work the town, the state or the country does for everyone.', W - 20, 'data-s2-definition="1"', 's2-text', 'text-align:center'), box('dk-tile', W, 'auto', town, 'data-s2-townpart="1"', 'padding:6px 0;flex-shrink:0;justify-content:center')];
  // review round 1 (row 14): "The ___ helps ___." fits every service ("is used by" did not fit the mail carrier or road work)
  if (d.uses) parts.push(frames([{ head: 'Who does it help?' }, ['The', 230, 'helps', 300, '.'], ['The', 230, 'helps', 300, '.']], 'data-s2-frame="uses"', W, 46));
  if (d.frame) parts.push(frames([['This service:', 420], ['It helps everyone because', 340], [W - 40, '.']], 'data-s2-frame="helps"', W, 44));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { items: [...chosen.map((p) => p.id + ':' + p.kind), 'lots:' + top.join(',') + '|' + bottom.join(',')], top, bottom, road: hasRoad } };
};

/* ================================================================ G2-618 how places change */
MODES['s2-change'] = function change(d, rng) {
  const nat = B.PLACE_CHANGES.filter((x) => x.kind === 'nature'), ppl = B.PLACE_CHANGES.filter((x) => x.kind === 'people');
  const set = splitOrder(nat, ppl, d.n, d.n === 2 ? [0, 1, 2] : [1, 2], rng);
  const big = d.n === 2;
  const pw = big ? 300 : d.draw ? 100 : 190, ph = Math.round(pw * 100 / 140);
  const choices = (x) => `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="${x.id}" style="gap:6px;flex-direction:${big ? 'row' : 'column'};align-items:flex-start">${['nature', 'people'].map((k) => pick(B.CHANGE_CHOICES[k], k === x.kind ? 'right' : 'no', `data-s2-kind="${k}" style="font-size:16px;padding:2px 10px"`)).join('')}</div>`;
  const pair = (x, i) => {
    const pics = ['before', 'after'].map((w) => col(scene(A.changeArt(x.id, w), pw, ph, '0 0 140 100', `data-s2-art="change:${x.id}:${w}"`) + txt(w, pw, '', 'g1-small'), 2)).join('');
    const sent = txt((i + 1) + '. ' + x.text, W - 30, `data-s2-sentence="${x.id}"`, 's2-text');
    if (big) return box('dk-tile dk-tile--white', W, 'auto', col(sent + row(pics, 14) + choices(x), 6), `data-s2-pair="${x.id}" data-s2-fill="the pair ${x.id}"`, 'padding:6px 0;flex:1 1 auto;justify-content:center');
    const because = frameLine(['It changed because', W - 260], 44);
    // level 3 (review round 1, row 17): the "because" line runs the full card width under the pictures, as on level 2
    if (d.draw) return box('dk-tile dk-tile--white', W, 'auto', col(sent + row(pics + choices(x), 12, 'justify-content:flex-start') + frameLine(['It changed because', W - 260], 36), 2, 'align-items:flex-start'), `data-s2-pair="${x.id}"`, 'padding:2px 12px;flex:1 1 auto;justify-content:center');
    return box('dk-tile dk-tile--white', W, 'auto', col(sent + row(pics + choices(x), 12, 'justify-content:flex-start') + (d.because ? because : ''), 4, 'align-items:flex-start'), `data-s2-pair="${x.id}"`, 'padding:4px 12px;flex:1 1 auto;justify-content:center');
  };
  const parts = [col(set.map(pair).join(''), 8, 'flex:1 1 auto;align-items:stretch')];
  if (d.draw) parts.push(row(col(labelledDraw(300, 'auto', 'a place near our school', 'data-dk-prompt="near-school"', '', 17).replace('height:auto;', 'height:auto;flex:1 1 auto;min-height:232px;'), 0, 'align-self:stretch') + box('dk-tile dk-tile--white', 362, 'auto', col(frameLine(['It changed:', 220], 46) + lineBox(336, 46) + frameLine(['It changed because', 160], 46) + lineBox(336, 46), 2, 'align-items:flex-start'), 'data-g1-frames="1" data-s2-frame="near"', 'padding:6px 10px;justify-content:center;align-self:stretch'), 12, 'align-items:stretch;flex-shrink:0'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: set.map((x) => x.id + ':' + x.kind) } };
};

/* ================================================================ G2-619 when disaster strikes */
function kitPart(rng, w, slotH, compact = false) {
  const items = B.KIT;
  const icon = (x, px) => (x.pic ? pic(x.pic, px) : scene(A.kitArt(x.id), px, px, '0 0 100 100', `data-s2-art="kit:${x.id}"`));
  // the word bank: every word in it is a thing a family really keeps (the child picks any four)
  const bank = compact ? row(items.map((x) => chip(x.word, `data-s2-kitword="${x.id}"`, 'font-size:14px;padding:1px 8px')).join(''), 5, 'flex-wrap:wrap;justify-content:center;width:100%')
    : row(items.map((x) => col(icon(x, 46) + txt(x.word, 82, `data-s2-kitword="${x.id}"`, 'g1-small'), 2)).join(''), 4, 'justify-content:space-between;width:100%;align-items:flex-start');
  const sw = compact ? Math.round((w - 40) / 2) : Math.round((w - 70) / 4);
  const slot = (n) => `<span data-dk-box data-s2-kitslot="${n}" style="display:block;box-sizing:border-box;width:${sw}px;height:${slotH}px;border:2.5px dashed ${T.coral};border-radius:12px;background:#FFFFFF"></span>`;
  const slots = compact ? col(row(slot(1) + slot(2), 8) + row(slot(3) + slot(4), 8), 8) : row([1, 2, 3, 4].map(slot).join(''), 10);
  return box('dk-tile', w, 'auto', col(q(compact ? 'Our emergency kit:' : 'Our family emergency kit: draw or write 4 things.') + (compact ? txt('Draw or write 4 things.', w - 24, '', 's2-sm') : '') + bank + slots, 6), 'data-s2-kit="1"', 'padding:6px 10px;flex-shrink:0;justify-content:center');
}
function coastMap(w, h) {
  const m = A.us48(6, 36, w - 12, h - 70, { coasts: B.COASTS.map((c) => c.id), band: 13 });
  const U = require('../../data/social/dk-social-2-geo.js').US48;
  const mid = (id) => { const pts = [...U.coasts[id].matchAll(/(-?[0-9.]+),(-?[0-9.]+)/g)].map((x) => [+x[1], +x[2]]); return m.T(...pts[Math.floor(pts.length / 2)]); };
  const LAB = { pacific: [4, 24], gulf: [w * 0.42, h - 6], atlantic: [w - 4, 24] };
  let s = `<rect x="0" y="0" width="${w}" height="${h}" fill="#DDEFF7"/>` + m.svg;
  for (const c of B.COASTS) {
    const [mx, my] = mid(c.id), [lx, ly] = LAB[c.id], anchor = c.id === 'pacific' ? 'start' : c.id === 'atlantic' ? 'end' : 'middle';
    const tw = c.word.length * 8.4 + 10, bx = anchor === 'start' ? lx : anchor === 'end' ? lx - tw : lx - tw / 2;
    s += `<line x1="${f1(mx)}" y1="${f1(my)}" x2="${f1(bx + tw / 2)}" y2="${f1(ly - 8)}" stroke="${A.C.worldBorder}" stroke-width="1"/>`;
    s += `<g data-s2-coastlabel="${c.id}" data-dk-answer="${c.hurricanes ? 'hurricane' : 'no'}"><rect x="${f1(bx)}" y="${f1(ly - 18)}" width="${f1(tw)}" height="22" rx="4" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1"/><text x="${f1(bx + tw / 2)}" y="${f1(ly - 2)}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="15" fill="${T.ink}">${c.word}</text></g>`;
  }
  return s;
}
MODES['s2-disaster'] = function disaster(d, rng) {
  const k = cast(4, rng);
  const side = !!d.coasts, pw = side ? 328 : d.kit ? 432 : 655, FH = side || d.kit ? 150 : 155, ph = Math.round(pw * FH / 300);
  const parts = [];
  const hd = (t) => (side ? `<span class="dk-head" data-dk-box style="white-space:normal;width:${pw}px;text-align:center;font-size:17px;line-height:20px">${esc(t)}</span>` : head(t));
  const pics = col(hd('1. A town before the flood: rain is coming.') + scene(A.floodArt('before', k, FH), pw, ph, `0 0 300 ${FH}`, 'data-s2-art="flood:before" data-s2-flood="before"'), 2, side ? 'justify-content:flex-end' : '') +
    col(hd('2. This town after the flood: circle the 3 things the flood changed.') + scene(A.floodArt('after', k, FH), pw, ph, `0 0 300 ${FH}`, 'data-s2-art="flood:after" data-s2-flood="after"'), 2, side ? 'justify-content:flex-end' : '');
  parts.push(side ? row(pics, 10, 'align-items:stretch') : col(pics, 8, 'align-items:center'));
  if (d.kit && !d.coasts) parts.push(kitPart(rng, W, 104));
  // level 3 (review round 1, row 21): the kit boxes and the coast map fill their panels (no empty band above or below)
  if (d.coasts) parts.push(row(kitPart(rng, 300, 128, true) + box('dk-tile', 364, 'auto', col(q('Color the coasts where hurricanes most often come ashore.', '', 'white-space:normal;width:340px;text-align:center') + scene(coastMap(352, 318), 352, 318, '0 0 352 318', 'data-s2-art="coasts"'), 2), 'data-s2-coastpart="1"', 'padding:6px 0;justify-content:center'), 10, 'align-items:stretch;flex:1 1 auto'));
  if (d.coasts) parts.push(frames([['Neighbors can help by', 450, '.']], 'data-s2-frame="neighbors"', W, 46));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: ['flood:' + B.FLOOD_CHANGES.join(','), ...(d.coasts ? ['coasts:gulf,atlantic'] : [])] } };
};

/* ================================================================ G2-620 winter traditions families may keep */
MODES['s2-traditions'] = function traditions(d, rng) {
  const set = d.n === 3 ? rng.sample(B.TRADITIONS, 3) : rng.shuffle(B.TRADITIONS);
  const ro = rightOrder(set.length, rng);
  // level 3 (review round 1, row 25): the symbols nearly as large as on level 2 (the map is smaller, its names beside it)
  const big = d.n === 3, h = big ? 150 : d.map ? 86 : 104, sp = h - 12;
  const symPic = (t) => (t.symbol === 'tree' ? pic(B.TRADITION_TREE, sp) : scene(A.traditionArt(t.symbol), sp, sp, '0 0 100 100', `data-s2-art="symbol:${t.symbol}"`));
  const lw = big ? 440 : 480, rw = big ? 150 : 110;
  const lefts = set.map((t) => ({ key: t.id, partner: t.symbol, html: txt(t.text, lw - 24, `data-s2-tradition="${t.id}"`, 's2-text', d.map ? 'font-size:15px;line-height:18px' : big ? 'font-size:19px;line-height:24px' : '') }));
  const rights = ro.map((j) => set[j]).map((t) => ({ key: t.symbol, html: symPic(t) }));
  const parts = [matchRows(lefts, rights, lw, rw, h, 30)];
  if (d.map) {
    const M = B.TRADITION_MAP, labels = { USA: [0, 4], MEX: [-34, 22], CHN: [0, 0], BRA: [0, 0], IND: [-6, 4] };
    const wm = A.worldMap(470, { labels, words: B.COUNTRY_WORD, font: 12 });
    const tags = wordOrder(M.lines, rng).map((id) => `<span data-dk-box data-s2-tag="${id}" data-dk-answer="${B.TRADITIONS.find((t) => t.id === id).country}" style="display:flex;align-items:center;gap:6px">${chip(id === 'posadas' ? 'Las Posadas' : id === 'kwanzaa' ? 'Kwanzaa' : 'Lunar New Year')}${dot()}</span>`).join('');
    parts.push(box('dk-tile', W, 'auto', col(q('Draw a line from each name to the country where it began.') + row(col(tags, 18, 'align-items:flex-end') + scene(wm.svg, 470, wm.h, `0 0 470 ${f1(wm.h)}`, 'data-s2-art="world" data-s2-map="traditions"'), 14, 'justify-content:center;width:100%;align-items:center'), 4), 'data-s2-mappart="1"', 'padding:4px 0;flex-shrink:0'));
  } else if (big) parts.push(row(col(labelledDraw(300, 'auto', 'a tradition (if you want to)', 'data-dk-prompt="my-tradition"', '', 17).replace('height:auto;', 'height:auto;flex:1 1 auto;min-height:230px;'), 0, 'align-self:stretch') + box('dk-tile dk-tile--white', 362, 'auto', col(txt('If you want to, draw a tradition your family keeps, or one you would like to learn about.', 330, 'data-s2-optional="1"'), 4), 'data-s2-share="1"', 'padding:8px 10px;justify-content:center;align-self:stretch'), 12, 'align-items:stretch;flex:1 1 auto'));
  else parts.push(frames([['If you want to share: a tradition I know is', 210, '.']], 'data-s2-frame="share"', W, 46));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { pairs: set.map((t) => t.id + '>' + t.symbol), right: ro.map((j) => set[j].symbol), items: set.map((t) => t.id) } };
};

/* ================================================================ G2-621 where does it come from? */
// the United States named inside the country, above its star (review round 1, row 27: below the star it lay over Mexico)
const ORIGIN_LABELS = { ECU: [-62, 14], COL: [58, -8], MEX: [-40, 18], VNM: [48, 26], USA: [0, -15], CAN: [0, -4], BRA: [14, 6], PER: [-58, 42], CHN: [0, -6], IND: [-10, 6] };
MODES['s2-labels'] = function labels(d, rng) {
  // level 1 (review round 1, row 28): never Ecuador with Colombia (the two outlines touch and read as one shape)
  const apart = (o) => !(o.some((x) => x.country === 'ECU') && o.some((x) => x.country === 'COL'));
  const set = d.n === 2 ? (() => { for (let t = 0; t < 200; t++) { const o = rng.sample(B.ORIGINS, 2); if (apart(o)) return o; } throw new Error('dk-social-2: no pair of labels'); })() : rng.shuffle(B.ORIGINS);
  const big = d.n === 2, cw = 330, px = big ? 258 : d.home ? 112 : 150;
  const goodPic = (x) => (x.pic ? pic(x.pic, px) : scene(A.goodArt(x.id), px, px, '0 0 100 100', `data-s2-art="good:${x.id}"`));
  const tag = (x) => `<span data-dk-box data-s2-labeltag="${x.id}" style="display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:${cw - 16}px;border:2px dashed ${T.inkSoft};border-radius:8px;background:#FFFFFF;padding:2px 6px;font-family:'Nunito',sans-serif;font-weight:800;font-size:${big ? 18 : 15}px;line-height:${big ? 22 : 18}px;color:${T.ink};text-align:center">Label: ${esc(x.label)}</span>`;
  const card = (x) => tile(big ? col(goodPic(x) + `<span class="s2-q" data-dk-box data-s2-good="${x.id}">${esc(x.word)}</span>` + tag(x), 4) : row(goodPic(x) + col(`<span class="s2-q" data-dk-box data-s2-good="${x.id}">${esc(x.word)}</span>` + tag(x).replace(`width:${cw - 16}px`, `width:${cw - px - 34}px`), 6, 'align-items:flex-start'), 10, 'justify-content:flex-start;padding:0 8px'), cw, 'auto', `data-s2-origin="${x.id}" data-dk-answer="${x.country}"`, 'white', 'padding:6px 0;flex:1 1 auto');
  const cards = big ? row(set.map(card).join(''), 14, 'align-items:stretch') : col(row(card(set[0]) + card(set[1]), 14, 'align-items:stretch') + row(card(set[2]) + card(set[3]), 14, 'align-items:stretch'), 8);
  const show = [...B.ORIGINS.map((x) => x.country), 'USA', ...B.ORIGIN_MAP_OTHERS];
  const wm = A.worldMap(665, { labels: Object.fromEntries(show.map((id) => [id, ORIGIN_LABELS[id]])), words: B.COUNTRY_WORD, font: 13, star: 'USA', pick: big ? set.map((x) => x.country) : [] });
  const parts = [cards, box('dk-tile', W, 'auto', col(row(q('Circle each country. Draw a line from it to the star.'), 8) + scene(wm.svg, 665, wm.h, `0 0 665 ${f1(wm.h)}`, `data-s2-art="world" data-s2-map="origins" data-s2-want="${set.map((x) => x.country).join(',')}"`) + (d.home ? '' : row(scene(A.star(10, 10, 8, A.C.starGold, 1.3), 20, 20, '0 0 20 20', 'data-s2-art="star-key"') + txt('the United States, our country', 300, 'data-s2-starkey="1"', 's2-sm', 'text-align:left'), 6)), 2), 'data-s2-mappart="1"', 'padding:4px 0;flex-shrink:0;justify-content:center')];
  if (d.home) parts.push(frames([['One thing in our classroom:', 380], ['Its label says it came from', 340, '.']], 'data-s2-frame="classroom"', W, 46));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: set.map((x) => x.id + ':' + x.country), picked: big ? set.map((x) => x.country) : [] } };
};

/* ================================================================ G2-622 made here, sold there */
function arrowBand(way, w, h, nLines) {
  const left = way === 'in';
  const fill = left ? A.C.arrowIn : A.C.arrowOut, head = 34;
  const shape = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0" data-lcs-prim="sk-art" data-s2-arrow="${way}"><path d="M2,10 L${w - head},10 L${w - head},2 L${w - 2},${h / 2} L${w - head},${h - 2} L${w - head},${h - 10} L2,${h - 10} Z" fill="${fill}" stroke="${T.ink}" stroke-width="2.2" stroke-linejoin="round"/></svg>`;
  const inner = col(txt(B.TRADE_ARROWS[way], w - head - 30, `data-s2-arrowword="${way}"`, 's2-text', 'font-size:16px;line-height:19px;text-align:center') + Array.from({ length: nLines }, () => lineBox(w - head - 34, Math.min(52, Math.floor((h - 78) / nLines)))).join(''), 2, 'align-items:center;position:relative;padding:14px 0 0 12px');
  return `<div data-dk-box data-s2-arrowband="${way}" style="position:relative;box-sizing:border-box;width:${w}px;height:${h}px;flex-shrink:0">${shape}<div style="position:relative;width:${w - head}px">${inner}</div></div>`;
}
MODES['s2-trade'] = function trade(d, rng) {
  const ins = B.TRADE_GOODS.filter((x) => x.way === 'in'), outs = B.TRADE_GOODS.filter((x) => x.way === 'out');
  const set = d.n === 4 ? splitOrder(ins, outs, 4, [1, 2, 3], rng) : splitOrder(ins, outs, 6, [3], rng);
  const cw = d.n === 4 ? 330 : 215, px = d.n === 4 ? 140 : 76;
  const goodPic = (x) => (x.pic ? pic(x.pic, px) : scene(A.goodArt(x.id), px, px, '0 0 100 100', `data-s2-art="good:${x.id}"`));
  const card = (x) => tile(d.n === 4 ? row(goodPic(x) + col(`<span class="s2-q" data-dk-box data-s2-good="${x.id}" style="font-size:19px">${esc(x.word)}</span>` + txt(x.fact, cw - px - 40, `data-s2-fact="${x.id}"`, 's2-text', 'font-size:16px;line-height:20px'), 4, 'align-items:flex-start'), 10, 'justify-content:flex-start;padding:0 10px') : col(goodPic(x) + `<span class="s2-q" data-dk-box data-s2-good="${x.id}" style="font-size:17px">${esc(x.word)}</span>` + txt(x.fact, cw - 16, `data-s2-fact="${x.id}"`, 's2-sm'), 3), cw, 'auto', `data-s2-trade="${x.id}" data-dk-answer="${x.way}"`, 'white', 'padding:5px 0;flex:1 1 auto');
  const half = set.length / 2, cards = col(row(set.slice(0, half).map(card).join(''), d.n === 4 ? 14 : 8, 'align-items:stretch') + row(set.slice(half).map(card).join(''), d.n === 4 ? 14 : 8, 'align-items:stretch'), 8);
  const aw = 232, ah = d.frame ? 180 : d.n === 4 ? 280 : 262, nl = 3;
  const us = scene(A.usCountry(160, 130), 172, 140, '0 0 160 130', 'data-s2-art="us-map"');
  const globe = scene(`<circle cx="50" cy="50" r="44" fill="${A.C.worldSea}" stroke="${T.ink}" stroke-width="2"/><ellipse cx="50" cy="50" rx="20" ry="44" fill="none" stroke="${A.C.worldBorder}" stroke-width="1.4"/><line x1="6" y1="50" x2="94" y2="50" stroke="${A.C.worldBorder}" stroke-width="1.4"/>`, 26, 26, '0 0 100 100', 'data-s2-art="globe"');
  const diagram = row(arrowBand('in', aw, ah, nl) + col(us + txt('the United States', 172, 'data-s2-usword="1"', 'g1-small'), 2) + col(arrowBand('out', aw, ah, nl) + row(globe + txt('other countries', 120, '', 'g1-small'), 4), 2), 8, 'align-items:center;justify-content:center');
  const parts = [cards, box('dk-tile', W, 'auto', col(q('Write each thing in the right arrow.') + diagram, 4), 'data-s2-arrows="1"', 'padding:6px 0;flex-shrink:0;justify-content:center')];
  if (d.frame) parts.push(frames([['The United States sells', 230, 'to other countries.'], ['The United States buys', 230, 'from other countries.']], 'data-s2-frame="sells"', W, 46));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: set.map((x) => x.id + ':' + x.way) } };
};

/* ================================================================ G2-623 why countries trade */
MODES['s2-islands'] = function islands(d, rng) {
  const isl = d.n === 2 ? B.ISLANDS_TWO : B.ISLANDS;
  const order = rng.shuffle(isl.map((_, i) => i));
  const Wv = 655, Hv = d.n === 2 ? 556 : d.what ? 420 : 486, sc = d.n === 2 ? 1.5 : d.what ? 1.12 : 1.26;
  // two islands on a slant (one high on the left, one low on the right) so they fill the sea between them
  const spots = d.n === 2 ? [[178, Hv * 0.335], [478, Hv * 0.775]] : [[165, Hv * 0.36], [492, Hv * 0.36], [330, Hv * 0.79]];
  const looks = cast(3, rng);
  let body = `<rect x="0" y="0" width="${Wv}" height="${Hv}" fill="${A.C.worldSea}"/>` + [0, 1, 2, 3, 4].map((q2) => `<path d="M${40 + q2 * 130},${Hv * 0.62} q8,-4 16,0 q8,4 16,0" fill="none" stroke="#FFFFFF" stroke-width="1.6"/>`).join('');
  order.forEach((ix, p) => { const I = isl[ix], [x, y] = spots[p]; body += A.islandArt(I, x, y, looks[ix], { scale: sc }); });
  // the island names, on signs under each island
  order.forEach((ix, p) => { const I = isl[ix], [x, y] = spots[p]; body += A.sign(x - 56, y + 42 * sc, 112, 19, I.word.toUpperCase(), 12, '#FFFFFF', '#3A3530', `data-s2-islandname="${I.id}"`); });
  const giverOf = (need) => isl.find((x) => x.makes === need).id;
  const svg = scene(body, Wv, Hv, `0 0 ${Wv} ${Hv}`, 'data-s2-art="islands"');
  const stamps = isl.map((I) => `<span data-s2-trade-need="${I.id}" data-dk-answer="${I.needs}<-${giverOf(I.needs)}" style="display:none"></span>`).join('');
  // the key lines in the islands' places (left to right, then the one below), so each line sits over its own island
  const key = row(order.map((ix) => isl[ix]).map((I) => `<span data-dk-box data-s2-islandkey="${I.id}" style="display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;line-height:18px;color:${T.ink};text-align:center;width:${Math.floor((W - 30) / isl.length) - 8}px">${esc(I.word)} has ${esc(I.makes)} and needs ${esc(I.needs)}.</span>`).join(''), 8, 'justify-content:space-around;width:100%');
  const parts = [box('dk-tile', W, 'auto', col(key + svg + stamps, 4), 'data-s2-islandpart="1" data-s2-fill="the islands"', 'padding:6px 0;flex:1 1 auto;justify-content:center')];
  parts.push(frames([['Countries trade because', 400], [W - 40, '.']], 'data-s2-frame="because"', W, 46));
  if (d.what) parts.push(frames([['If Cold Island could not trade,', 340], [W - 40, '.']], 'data-s2-frame="what-if"', W, 46));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: [...isl.map((I) => I.id + ':' + I.needs + '<-' + giverOf(I.needs)), 'places:' + order.map((ix) => isl[ix].id).join(',')], order: order.map((ix) => isl[ix].id) } };
};

/* ================================================================ G2-624 two stories of the same day */
MODES['s2-accounts'] = function accounts(d, rng) {
  const ev = rng.pick(B.ACCOUNTS);
  const bothIds = new Set(ev.a.sentences.map((s) => s[0]).filter((id) => ev.b.sentences.some((t) => t[0] === id)));
  // level 1: four sentences in each story (one "only" fact of each left out, never a "both" fact)
  const keep = (st) => { if (!d.short) return st.sentences; const only = st.sentences.filter((s) => !bothIds.has(s[0])); const drop = rng.pick(only)[0]; return st.sentences.filter((s) => s[0] !== drop); };
  const sa = keep(ev.a), sb = keep(ev.b);
  const looks = cast(4, rng, { sex: [ev.a.sex, ev.a.sex === 'f' ? 'm' : 'm', ev.b.sex, 'f'] });
  // each story a full-width card: the teller's picture and name on the left, one sentence on each line (a whole sentence
  // is underlined in one stroke), the lines spaced for a crayon
  const lh = d.short ? 50 : d.why ? 36 : 44, fs = d.why ? 18 : 20, aw = d.why ? 160 : 190;
  const storyCard = (st, sents, who) => {
    const art = scene(A.tellerArt(st.role, { ...looks[who === 'a' ? 0 : 2], parade: ev.id === 'parade' && who === 'a', dad: { ...looks[1], hair: 'short', bottom: 'pants' } }), aw, Math.round(aw * 0.7), '0 0 100 70', `data-s2-art="teller:${st.role}"`);
    const lines = sents.map(([id, t]) => `<span class="s2-story" data-dk-box data-s2-sent="${who}:${id}" data-dk-answer="${bothIds.has(id) ? 'both' : 'one'}" style="font-size:${fs}px;line-height:${lh}px;width:${W - aw - 60}px;white-space:nowrap">${esc(t)}</span>`).join('');
    return tile(row(col(art + `<span class="s2-q" data-dk-box data-s2-teller="${who}" style="white-space:normal;width:${aw}px;text-align:center">${esc(st.title)}</span>`, 4) + col(lines, 0, 'align-items:flex-start'), 16, 'justify-content:flex-start;align-items:center;padding:0 12px'), W, 'auto', `data-s2-storycard="${who}" data-s2-fill="${who === 'a' ? 'the first' : 'the second'} story"`, 'white', 'padding:6px 0;flex:1 1 auto;justify-content:flex-start');
  };
  const key = box('dk-tile dk-tile--white', W, 'auto', row(keyChip('#4A7BD0', B.ACCOUNT_KEY.both.word + ': underline it in blue', 'data-s2-key="both"') + keyChip('#F39C40', B.ACCOUNT_KEY.one.word + ': underline it in orange', 'data-s2-key="one"'), 6, 'flex-direction:column;align-items:flex-start'), 'data-s2-keypart="1"', 'padding:6px 14px;flex-shrink:0');
  const parts = [txt('Two people tell about ' + ev.day + '.', W - 20, 'data-s2-day="1"', 's2-text', 'text-align:center'), key, col(storyCard(ev.a, sa, 'a') + storyCard(ev.b, sb, 'b'), 8, 'align-items:stretch;flex:1 1 auto')];
  if (d.why) parts.push(frames([['They noticed different things because', 240], [W - 40], [W - 40, '.']], 'data-s2-frame="why"', W, 42));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { event: ev.id, items: [ev.id, ...sa.map((s) => 'a:' + s[0]), ...sb.map((s) => 'b:' + s[0])] } };
};

/* ================================================================ G2-625 questions about an old photograph (a record page) */
MODES['s2-photo'] = function photo(d, rng) {
  const looks = cast(6, rng);
  const pw = d.find ? 655 : d.three ? 410 : 500, ph = Math.round(pw * 250 / 400);
  const framePhoto = (w, h) => `<div data-dk-box data-s2-photo="1" style="box-sizing:border-box;padding:10px 10px 6px;background:#FAFAFA;border:1.5px solid ${T.inkSoft};box-shadow:2px 2px 0 #D9D9D9;display:flex;flex-direction:column;align-items:center;gap:4px">${scene(A.oldPhotoArt(looks), w, h, '0 0 400 250', 'data-s2-art="old-photo"')}<span data-dk-box style="font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;color:${T.inkSoft}">${esc(B.PHOTO_CAPTION)}</span></div>`;
  const parts = [];
  if (d.find) {
    parts.push(row(framePhoto(pw - 24, Math.round((pw - 24) * 250 / 400)), 0));
    parts.push(box('dk-tile dk-tile--white', W, 'auto', col(q('Find these and circle them in the photo:') + row(wordOrder(B.PHOTO_FIND, rng).map((x) => chip(x.word, `data-s2-find="${x.id}"`)).join(''), 8, 'flex-wrap:wrap;justify-content:flex-start'), 4, 'align-items:flex-start'), 'data-s2-findpart="1"', 'padding:6px 14px;flex-shrink:0'));
    parts.push(frames([['I wonder why', 470], [W - 60, '?']], 'data-s2-frame="wonder"', W, 46));
    return { html: grow(parts.join(''), 'gap:8px'), meta: { record: 1, items: ['find'] } };
  }
  const chart = (title, n, prompt) => box('dk-tile dk-tile--white', W, 'auto', col(row(q(title) + txt(prompt, 420, '', 's2-sm', 'text-align:left'), 12, 'justify-content:flex-start;width:100%') + Array.from({ length: n }, () => lineBox(W - 30, 42)).join(''), 2, 'align-items:flex-start'), `data-s2-chart="${title.split(' ')[1].toLowerCase()}"`, 'padding:4px 14px;flex-shrink:0');
  parts.push(row(framePhoto(pw - 24, Math.round((pw - 24) * 250 / 400)), 0));
  parts.push(chart('I see', d.three ? 1 : 2, 'things in the photo'));
  parts.push(chart('I think', 1, 'what life was like then'));
  parts.push(chart('I wonder', d.three ? 3 : 2, d.three ? 'three questions' : 'two questions'));
  if (d.three) parts.push(frames([['How could we find out? We could', 330], [W - 40, '.']], 'data-s2-frame="find-out"', W, 42));
  return { html: grow(parts.join(''), 'gap:6px'), meta: { record: 1, items: [String(d.level)] } };
};

/* ================================================================ G2-626 why did the town change? */
MODES['s2-town'] = function town(d, rng) {
  const h = rng.pick(B.TOWNS);
  const wrong = rng.sample(B.TOWN_WRONG, d.n - 1);
  const at = Math.floor(rng.next() * d.n);
  const reasons = wrong.slice(); reasons.splice(at, 0, h.reason);
  const text = box('dk-tile dk-tile--white', W, 'auto', col(q('The story of ' + h.town) + h.sentences.map((t, i) => `<span class="s2-story" data-dk-box data-s2-townsent="${i}"${i === h.clue ? ' data-dk-answer="clue"' : ''} style="width:${W - 40}px;${d.why ? "line-height:30px" : "font-size:20px;line-height:38px"}">${esc(t)}</span>`).join(''), 0, 'align-items:flex-start'), 'data-s2-history="1"', 'padding:6px 16px;flex-shrink:0');
  const pics = row(['then', 'later'].map((st) => col(scene(A.townGrowArt(st, h.id), d.why ? 196 : 270, Math.round((d.why ? 196 : 270) * 90 / 140), '0 0 140 90', `data-s2-art="town:${st}"`) + txt(st === 'then' ? h.town + ' at first' : h.town + ' later', 220, '', 'g1-small'), 2)).join(''), 24);
  const choice = box('dk-tile', W, 'auto', col(q('Circle the most likely reason the town grew.') + `<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item="reason" style="gap:12px;flex-wrap:wrap">${reasons.map((r) => pick(r, r === h.reason ? 'right' : 'no', `data-s2-reason="${esc(r)}"`)).join('')}</div>`, 6), 'data-s2-reasons="1"', 'padding:6px 0;flex-shrink:0');
  const copy = frames([{ head: 'Copy the sentence that says the town grew and tells why.' }, [W - 40], [W - 40, '.']], 'data-s2-frame="copy"', W, 46);
  const parts = [pics, text, choice, copy];
  if (d.why) parts.push(frames([[400, 'is less likely because'], [W - 40, '.']], 'data-s2-frame="less"', W, 44));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: [h.id, ...reasons.map((r) => (r === h.reason ? 'right:' : 'no:') + r)], town: h.id, clue: h.clue } };
};

/* ================================================================ G2-627 tools and skills for the job */
const MACHINES = new Set(['oven', 'mixer']);
MODES['s2-tools'] = function tools(d, rng) {
  const prods = d.n === 1 ? [rng.pick(B.PRODUCERS)] : rng.shuffle(B.PRODUCERS);
  // review round 1 (row 43): EVERY card shows the worker in the same place. A tool card: the worker holding or using the
  // tool or machine; a skill card: the worker thinking, a thought bubble of what the worker knows. Holding a thing vs
  // knowing it in your head IS the concept; no other part of the card (the first word, the length of the words, the
  // background) sorts the cards (the gate measures it over the copies). Levels 2-3: the picture and the box to color
  // side by side, so the pictures can be larger.
  const big = d.n === 1, cw = big ? 330 : 150, px = big ? 176 : d.frame ? 80 : 88;
  const looks = cast(12, rng);
  let li = 0;
  const ids = [];
  // the tool in its box (b = x, y, w, h); mirrored when the bank says flip (so it faces away from the worker)
  const thing = (x) => (b, flip) => {
    const inner = x.pic ? `<image href="${fileUri(x.pic.theme, x.pic.noun)}" x="0" y="0" width="${f1(b[2])}" height="${f1(b[3])}" preserveAspectRatio="xMidYMid meet" data-dk-pic="${esc(x.pic.theme + '/' + x.pic.noun)}"/>` : `<g transform="scale(${f1(b[2] / 100)})">${A.goodArt(x.id)}</g>`;
    return flip ? `<g transform="translate(${f1(b[0] + b[2])} ${f1(b[1])}) scale(-1 1)">${inner}</g>` : `<g transform="translate(${f1(b[0])} ${f1(b[1])})">${inner}</g>`;
  };
  const rows = prods.map((p) => {
    const cards = splitOrder(p.tools.map((x) => ({ ...x, kind: 'tool' })), p.skills.map((x) => ({ ...x, kind: 'skill' })), 4, [1, 2, 3], rng);
    // level 3 asks "The baker uses ___ to make more bread": the baker's row always shows a machine (an oven or a mixer),
    // which makes more bread, not only a hand tool; it takes the place of the row's first tool (same place, kind)
    if (d.frame && p.id === 'baker' && !cards.some((x) => MACHINES.has(x.id))) {
      const at = cards.findIndex((x) => x.kind === 'tool');
      cards[at] = { ...rng.pick(p.tools.filter((x) => MACHINES.has(x.id))), kind: 'tool' };
    }
    ids.push(...cards.map((x) => x.id + ':' + x.kind));
    const pc = (x) => (x.kind === 'skill' ? scene(A.skillArt(p.id, x.think, looks[li++ % looks.length]), px, px, '0 0 100 100', `data-s2-art="skill:${x.id}"`)
      : scene(A.toolArt(p.id, looks[li++ % looks.length], x, thing(x)), px, px, '0 0 100 100', `data-s2-art="tool:${x.id}"`));
    const word = (x) => txt(x.word, big ? 300 : cw - 12, `data-s2-cardword="${x.id}"`, 's2-sm', big ? 'font-size:19px;line-height:24px' : d.frame ? 'font-size:14px;line-height:16px' : 'font-size:15px;line-height:18px');
    const card = (x) => tile(big ? col(pc(x) + word(x) + colorBox(x.id, 56), 6) : col(row(pc(x) + colorBox(x.id, 48), 6, 'align-items:center') + word(x), d.frame ? 2 : 3), cw, 'auto', `data-s2-card="${x.id}" data-dk-answer="${x.kind}"`, 'white', d.frame ? 'padding:3px 0;flex:1 1 auto' : 'padding:5px 0;flex:1 1 auto');
    const grid = big ? col(row(card(cards[0]) + card(cards[1]), 12, 'align-items:stretch') + row(card(cards[2]) + card(cards[3]), 12, 'align-items:stretch'), 10) : row(cards.map(card).join(''), 8, 'align-items:stretch');
    return box('dk-tile', W, 'auto', col(q('The ' + p.word.replace(/^an? /, '') + ' uses or knows:', `data-s2-producer="${p.id}"`) + grid, 4, 'align-items:flex-start'), `data-s2-producerrow="${p.id}" data-s2-fill="the ${p.id} row"`, d.frame ? 'padding:3px 12px;flex:1 1 auto;justify-content:center' : 'padding:5px 12px;flex:1 1 auto;justify-content:center');
  });
  const keyRow = box('dk-tile dk-tile--white', W, 'auto', row(keyChip(B.TOOL_KEY.tool.hex, 'a tool or machine: color blue', 'data-s2-key="tool"') + keyChip(B.TOOL_KEY.skill.hex, 'a skill: color orange', 'data-s2-key="skill"'), 30), 'data-s2-toolkey="1"', 'padding:6px 0;flex-shrink:0');
  const parts = [keyRow, col(rows.join(''), 8, 'flex:1 1 auto;align-items:stretch')];
  // review round 1 (row 44): "With a ___" broke on "an oven"; this frame fits every tool and machine
  if (d.frame) parts.push(frames([['The baker uses', 190, 'to make more bread because'], [W - 40, '.']], 'data-s2-frame="uses"', W, 42));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: [...prods.map((p) => p.id), ...ids] } };
};

/* ================================================================ G2-628 what does it cost to make? */
/** the prices of the things the children need: whole dollars; the total within $9, never what a price per cup brings in
 *  (no "covers it exactly"); returns { prices, total, lowest } or null */
function lemonCosts(needs, rng, want) {
  const incomes = B.LEMON_PRICES.map((c) => (c * B.LEMON_CUPS) / 100);
  for (let t = 0; t < 400; t++) {
    const prices = needs.map((x) => rng.pick(x.price)), total = prices.reduce((a, b) => a + b, 0);
    if (total > 9 || incomes.includes(total)) continue;
    const lowest = B.LEMON_PRICES.find((c) => (c * B.LEMON_CUPS) / 100 > total);
    if (want != null && lowest !== want) continue;
    return { prices, total, lowest };
  }
  return null;
}
MODES['s2-lemonade'] = function lemonade(d, rng) {
  const needs = B.LEMON_NEEDS.filter((x) => d.n === 4 || !x.l2);
  const [n1, n2] = rng.pick(B.LEMON_NAMES);
  // the price list's answer: 50 cents or 1 dollar a cup, half the time each (20 cents never covers three or more things)
  const want = rng.next() < 0.5 ? 50 : 100;
  const c = lemonCosts(needs, rng, want) || lemonCosts(needs, rng, null);
  const tryPrices = d.n === 3 ? (c.lowest === 50 ? rng.pick([[20, 50], [50, 100]]) : rng.pick([[20, 100], [50, 100]])) : B.LEMON_PRICES.slice();
  const shown = rng.shuffle(tryPrices);
  const lowest = shown.filter((p) => (p * B.LEMON_CUPS) / 100 > c.total).sort((a, b) => a - b)[0];
  const extras = rng.sample(B.LEMON_EXTRAS, d.n === 3 ? 1 : 2);
  const list = rng.shuffle([...needs.map((x, i) => ({ ...x, cost: c.prices[i], need: true })), ...extras.map((x) => ({ ...x, cost: x.price, need: false }))]);
  const k = cast(2, rng);
  const story = txt(`${n1} and ${n2} want to sell lemonade. They need ${needs.map((x) => x.word.replace('10 cups', 'cups').replace('poster paper for a sign', 'a sign')).join(', ').replace(/, ([^,]+)$/, ' and $1')}.`, 390, 'data-s2-story="1"', 's2-text');
  const head1 = row(scene(A.lemonadeStandArt(k), d.frame ? 176 : d.hint ? 300 : 260, d.frame ? 97 : d.hint ? 165 : 143, '0 0 200 110', 'data-s2-art="stand"') + story, 14, 'justify-content:flex-start');
  const itemPic = (x, px) => (x.pic ? pic(x.pic, px) : scene(A.goodArt(x.id), px, px, '0 0 100 100', `data-s2-art="good:${x.id}"`));
  const px = d.n === 3 ? 84 : d.frame ? 52 : 70, iw = Math.floor((W - 20) / list.length) - 6;
  const priceList = box('dk-tile', W, 'auto', col(q('The store\'s price list: circle what they must buy before they can sell.') + row(list.map((x) => tile(col(itemPic(x, px) + txt(x.word, iw - 8, `data-s2-listword="${x.id}"`, 'g1-small', 'white-space:normal') + scene(A1.priceTag('$' + x.cost), 64, 37, '0 0 70 40', `data-s2-art="tag" data-s2-cost="${x.cost}"`), 2), iw, 'auto', `data-s2-listitem="${x.id}" data-dk-answer="${x.need ? 'need' : 'no'}"`, 'white', 'padding:4px 0')).join(''), 6, 'align-items:stretch'), 4), 'data-s2-pricelist="1"', 'padding:6px 0;flex-shrink:0');
  const plus = needs.map(() => '$' + ' ___').join(' + ');
  void plus;
  const addRow = row(q('What they must pay: ') + needs.map((x, i) => (i ? `<span class="g1-text" data-dk-box>+</span>` : '') + `<span class="g1-text" data-dk-box>$</span>` + numBox(46, 44, `data-s2-cost="${i}"`)).join('') + `<span class="g1-text" data-dk-box>=</span><span class="g1-text" data-dk-box>$</span>` + numBox(56, 44, `data-s2-total="1" data-dk-answer="${c.total}"`), 6, 'justify-content:flex-start;flex-wrap:nowrap');
  const money = (cents) => (cents >= 100 ? '$' + cents / 100 : cents + '¢');
  const incomeRows = shown.map((p) => `<div class="dk-row" data-dk-box data-s2-income="${p}" style="gap:8px;justify-content:flex-start;width:${W - 40}px">${pick(money(p) + ' a cup', p === lowest ? 'right' : 'no', `data-s2-price="${p}" style="min-width:120px"`)}${txt(`${B.LEMON_CUPS} cups bring in`, 160, '', 's2-text')}<span class="g1-text" data-dk-box>$</span>${numBox(56, d.frame ? 42 : d.hint ? 56 : 50, `data-s2-brings="${p}" data-dk-answer="${(p * B.LEMON_CUPS) / 100}"`)}${d.hint ? txt(p === 100 ? '' : p === 50 ? '(2 cups make $1)' : '(5 cups make $1)', 170, '', 's2-sm', 'text-align:left;color:#8A8276') : ''}</div>`).join('');
  const incomeBox = box('dk-tile', W, 'auto', col(addRow + q(`If they sell ${B.LEMON_CUPS} cups:`) + `<div data-dk-box data-g1-one="1" data-dk-item="lowest" style="display:flex;flex-direction:column;gap:${d.frame ? 6 : d.hint ? 20 : 12}px">${incomeRows}</div>` + txt('Circle the lowest price that brings in more than they must pay.', W - 40, 'data-s2-lowest="1"', 's2-text'), 6, 'align-items:flex-start'), 'data-s2-incomepart="1" data-s2-fill="the money box"', 'padding:6px 14px;flex:1 1 auto;justify-content:center');
  const parts = [head1, priceList, incomeBox];
  if (d.frame) parts.push(frames([{ head: 'Choose a price that brings in more than they must pay.' }, ['At', 90, 'a cup, they have $', 70, 'left over.'], ['I chose it because', 440], [W - 40, '.']], 'data-s2-frame="left-over"', W, 40));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: [...list.map((x) => x.id + ':' + x.cost + (x.need ? ':need' : ':no')), 'total:' + c.total, 'lowest:' + lowest, ...shown.map((p) => 'try:' + p)], total: c.total, lowest, names: [n1, n2] } };
};

/* ================================================================ G2-629 what banks do */
MODES['s2-bank'] = function bank(d, rng) {
  const set = d.n === 2 ? rng.sample(B.BANK_JOBS, 2) : rng.shuffle(B.BANK_JOBS);
  const k = cast(3, rng);
  const big = d.n === 2, pw = big ? 336 : d.frame ? 172 : 230, ph = Math.round(pw * 110 / 160);
  const sents = box('dk-tile dk-tile--white', W, 'auto', col(q('Sentences:') + wordOrder(set, rng).map((x) => txt(x.sentence, W - 60, `data-s2-banksent="${x.id}"`, 's2-text', 'font-size:19px;line-height:24px')).join(''), 4, 'align-items:flex-start'), 'data-s2-sentbox="1"', 'padding:6px 16px;flex-shrink:0');
  const rows = set.map((x, i) => tile(row(scene(A.bankArt(x.id, [k[i], k[(i + 1) % 3], k[(i + 2) % 3]], B.BANK_STATEMENT), pw, ph, '0 0 160 110', `data-s2-art="bank:${x.id}"`) + `<div data-dk-box data-s2-banklines="${x.id}" data-dk-answer="${x.id}" style="display:flex;flex-direction:column;gap:2px;line-height:0">${writeRow(W - pw - 60, 46)}${writeRow(W - pw - 60, 46)}</div>`, 14, 'justify-content:flex-start;padding:0 12px'), W, 'auto', `data-s2-bankrow="${x.id}" data-s2-fill="the picture ${x.id}"`, 'white', 'padding:6px 0;flex:1 1 auto'));
  const parts = [sents, col(rows.join(''), 8, 'flex:1 1 auto;align-items:stretch')];
  if (d.frame) parts.push(frames([['A family might borrow money because', 230], ['They must pay it back because', 290], [W - 40, '.']], 'data-s2-frame="borrow"', W, 42));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: set.map((x) => x.id) } };
};

/* ================================================================ G2-630 class market day (the teacher-led lesson's page) */
/** a tray of real coins for a market price: 3 to 6 coins of the level, the level's biggest coin always on it, more money
 *  than the price, and EXACTLY ONE set of coins that pays it (pennies are alike, so "two of the three pennies" is one
 *  set); random order */
function marketTray(price, L, rng) {
  for (let t = 0; t < 3000; t++) {
    const size = 3 + Math.floor(rng.next() * 4), tray = [L.top];
    while (tray.length < size) { const k = rng.pick(L.coins); if (tray.filter((x) => x === k).length < L.maxOf[k]) tray.push(k); }
    const total = tray.reduce((a, k) => a + B1.US_COINS.find((c) => c.id === k).cents, 0);
    if (total <= price) continue;
    const ways = payWays(tray, price);
    if (ways.length !== 1) continue;
    return { tray: rng.shuffle(tray), way: ways[0] };
  }
  return null;
}
const coinSvg = (k, uid) => { const c = B1.US_COINS.find((x) => x.id === k), px = coinPx(c); return scene(A1.usCoin(k, px / 2 - 2, uid), px, px, `0 0 ${f1(px)} ${f1(px)}`, `data-s1-art="coin:${k}" data-s1-realsize="${px}"`); };
MODES['s2-market'] = function market(d, rng) {
  const L = B.MARKET2[d.level];
  const all = ['quarter', 'dime', 'nickel', 'penny'];
  let uid = 0;
  // the shopper's record (no wrong answer: what the child bought and what it cost are the child's own). The coins are
  // drawn at their real size, each with its name, its value and a box for how many; the coins must make the price (the
  // child checks it: "My coins make ___ cents")
  const coinCells = () => all.map((k) => { const c = B1.US_COINS.find((x) => x.id === k); return row(coinSvg(k, 'r' + (uid++)) + col(`<span class="s2-sm" data-dk-box style="width:52px;text-align:left;font-size:14px;line-height:16px">${esc(c.word)}</span><span class="s2-sm" data-dk-box style="width:52px;text-align:left;font-size:14px;line-height:16px">${c.cents}¢</span>` + numBox(46, 40, `data-s2-count="${k}"`), 2, 'align-items:flex-start'), 4); }).join('');
  const makes = (n) => row(`<span class="g1-text" data-dk-box>=</span>` + numBox(52, 40, `data-s2-makes="${n}"`) + `<span class="g1-text" data-dk-box>¢</span>`, 4);
  const record = (n) => box('dk-tile', W, 'auto', col(
    (d.level === 1 ? row(col(labelledDraw(220, 'auto', 'what I bought', `data-dk-prompt="bought-${n}"`, '', 16).replace('height:auto;', 'height:auto;min-height:240px;'), 0) + col(frameLine(['I bought', 200, '.'], 46) + frameLine(['It cost', 70, '¢.'], 46) + frameLine(['My coins make', 70, '¢.'], 46), 12, 'align-items:flex-start'), 14, 'justify-content:flex-start;align-items:center') + txt('I paid with:', 200, '', 's2-text') + row(coinCells(), 10, 'justify-content:space-between;width:100%')
      : row(q('Thing ' + n + ':') + frameLine(['I bought', 220, '.'], 44) + frameLine(['It cost', 64, '¢.'], 44), 8, 'justify-content:flex-start;flex-wrap:nowrap') + txt('I paid with (how many of each coin), and my coins make:', W - 40, '', 's2-sm', 'text-align:left') + row(coinCells() + makes(n), 6, 'justify-content:space-between;width:100%')),
    4, 'align-items:flex-start'), `data-s2-record="${n}"`, 'padding:6px 12px;flex-shrink:0');
  const parts = [txt('My shopping record: what I bought, what it cost, and how many of each coin I paid with.', W - 20, 'data-s2-recordhead="1"', 's2-text'), ...Array.from({ length: L.records }, (_, i) => record(i + 1))];
  // the practice trays: a thing of the class market with its price, and coins where exactly one set pays it
  const goods = rng.sample(B.MARKET_GOODS, L.trays);
  const trays = [];
  for (const gd of goods) {
    let tr = null, pr = 0;
    for (let t = 0; t < 300 && !tr; t++) { pr = L.min + Math.floor(rng.next() * (L.max - L.min + 1)); if (trays.some((x) => x.price === pr)) continue; tr = marketTray(pr, L, rng); }
    if (!tr) throw new Error('dk-social-2: no market tray');
    trays.push({ ...tr, price: pr, good: gd });
  }
  const trayRows = trays.map((t) => tile(row(col(scene(A.goodArt(t.good.id), 66, 66, '0 0 100 100', `data-s2-art="good:${t.good.id}"`) + scene(A1.priceTag(t.price >= 100 ? '$1' : t.price + '¢'), 70, 40, '0 0 70 40', `data-s2-art="tag" data-s2-tagprice="${t.price}"`), 2) +
    `<div class="dk-row" data-dk-box data-s2-tray="${t.good.id}" data-s2-price="${t.price}" data-dk-answer="${wayKey(t.way)}" style="gap:8px;justify-content:flex-start;flex-wrap:nowrap">${t.tray.map((k2) => `<span data-dk-box data-s2-coin="${k2}" style="display:block;flex-shrink:0">${coinSvg(k2, 't' + (uid++))}</span>`).join('')}</div>`, 12, 'justify-content:flex-start;padding:0 8px'), W, 'auto', `data-s2-trayrow="${t.good.id}"`, 'white', 'padding:4px 0;flex:1 1 auto'));
  parts.push(box('dk-tile', W, 'auto', col(q('Practice: circle the coins that pay the price exactly.') + col(trayRows.join(''), 6, 'width:100%'), 4), 'data-s2-practice="1" data-s2-fill="the practice box"', 'padding:6px 0;flex:1 1 auto;justify-content:center'));
  let change = 0;
  if (L.change) {
    change = 5 * (L.change[0] / 5 + Math.floor(rng.next() * ((L.change[1] - L.change[0]) / 5 + 1)));
    const gd = rng.pick(B.MARKET_GOODS.filter((g2) => !goods.includes(g2)));
    parts.push(box('dk-tile dk-tile--white', W, 'auto', row(scene(A.goodArt(gd.id), 56, 56, '0 0 100 100', `data-s2-art="good:${gd.id}"`) + txt(`${gd.word[0].toUpperCase() + gd.word.slice(1)} costs ${change}¢. You pay with 1 dollar. Your change is`, 400, 'data-s2-change="1"', 's2-text') + numBox(60, 46, `data-s2-changebox="1" data-dk-answer="${100 - change}"`) + `<span class="g1-text" data-dk-box>¢.</span>`, 10, 'justify-content:flex-start;padding:0 12px'), 'data-s2-changepart="1"', 'padding:6px 0;flex-shrink:0'));
    parts.push(frames([['At our market,', 220, 'sold the most.'], ['I think it sold well because', 360, '.']], 'data-s2-frame="sold"', W, 42));
  }
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: [...trays.map((t) => t.good.id + ':' + t.price), ...(change ? ['change:' + change] : [])], prices: trays.map((t) => t.price), change } };
};

/* ================================================================ the type + the S2 page checks */
/**
 * The S2 page checks (in page.evaluate): the maps (every named country where it is, labels apart, the star in the United
 * States), the coasts, the flood's three changes, the symbols (nine branches, seven candles in their colours), the long
 * writing lines, the coins at their real size (S1's check reads data-s1-art="coin:<kind>"), the drawings inside their
 * cards. Each returns the faults it finds.
 */
function s2VerifyInPage(OPT) {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no dk root'];
  const mode = R.dataset.dk, lv = R.dataset.dkLevel;
  const rr = (e) => e.getBoundingClientRect();
  const overlap = (a, b, t = 0) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > t && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > t;
  // the world maps: every label inside the map and apart from every other label; the star inside the United States
  R.querySelectorAll('svg[data-s2-art="world"]').forEach((sv) => {
    const box0 = rr(sv), labs = [...sv.querySelectorAll('[data-s2-label]')];
    labs.forEach((l) => { const q = rr(l); if (q.left < box0.left - 0.5 || q.right > box0.right + 0.5 || q.top < box0.top - 0.5 || q.bottom > box0.bottom + 0.5) f.push(`the map label "${l.dataset.s2Label}" runs off the map`); });
    for (let i = 0; i < labs.length; i++) for (let j = i + 1; j < labs.length; j++) if (overlap(rr(labs[i]), rr(labs[j]), 0.5)) f.push(`the map labels "${labs[i].dataset.s2Label}" and "${labs[j].dataset.s2Label}" overlap`);
    // no label box lies on the OUTLINE of a country the page asks about, its own label included (review round 1, row 27:
    // this check read a data-s2-want the factory never wrote, so it measured nothing; the origins map now names its asked
    // countries and must). Geometry, not boxes: points of the label inside the country, or the country's outline inside
    // the label.
    const want = (sv.dataset.s2Want || '').split(',').filter(Boolean);
    if (sv.dataset.s2Map === 'origins' && !want.length) f.push('the origins map names no country it asks about (the label check would measure nothing)');
    for (const id of want) {
      const c = sv.querySelector(`[data-s2-country="${id}"]`); if (!c) { f.push(`the map has no ${id}`); continue; }
      const inv = c.getScreenCTM().inverse(), fwd = c.getScreenCTM(), L = c.getTotalLength();
      const outline = []; for (let s = 0; s < L; s += Math.max(0.2, L / 600)) { const p = c.getPointAtLength(s).matrixTransform(fwd); outline.push([p.x, p.y]); }
      labs.forEach((l) => {
        const q = rr(l.querySelector('rect') || l); let hit = outline.some(([x, y]) => x >= q.left && x <= q.right && y >= q.top && y <= q.bottom);
        for (let i = 0; i <= 8 && !hit; i++) for (let j = 0; j <= 4 && !hit; j++) { const pt = sv.createSVGPoint(); pt.x = q.left + (q.width * i) / 8; pt.y = q.top + (q.height * j) / 4; if (c.isPointInFill(pt.matrixTransform(inv))) hit = true; }
        if (hit) f.push(`the label "${l.dataset.s2Label}" lies on ${id}, a country the page asks about`);
      });
    }
    const st = sv.querySelector('[data-s2-star]');
    if (st) { const us = sv.querySelector('[data-s2-country="USA"]'), q = rr(st), cx = (q.left + q.right) / 2, cy = (q.top + q.bottom) / 2; const pt = sv.createSVGPoint(); pt.x = cx; pt.y = cy; const loc = pt.matrixTransform(us.getScreenCTM().inverse()); if (!us.isPointInFill(loc)) f.push('the star is not inside the United States'); }
    sv.querySelectorAll('[data-s2-label]').forEach((l) => { const id = l.dataset.s2Label, c = sv.querySelector(`[data-s2-country="${id}"]`); if (!c) f.push(`the map names ${id}, a country it does not draw`); });
  });
  // review round 1 (rows 7, 35, 48): a grown-up is drawn clearly taller than any child in the same picture, and on a page
  // of story cards than any child teller (a seated grown-up, in a boat or at a long desk, is left out: seated)
  const ht = (e) => rr(e).height, grown = (e) => !e.closest('[data-s2-grownup="lifevest"]');
  const tall = (pics, where) => { const ad = pics.flatMap((sv) => [...sv.querySelectorAll('[data-sk-age="adult"],[data-sk-age="elder"]')]).filter(grown), ch = pics.flatMap((sv) => [...sv.querySelectorAll('[data-sk-age="child"]')]); if (!ad.length || !ch.length) return; const a = Math.min(...ad.map(ht)), c = Math.max(...ch.map(ht)); if (a < OPT.adultRatio * c) f.push(`${where}: a grown-up ${Math.round(a)} px tall beside a child ${Math.round(c)} px (at least ${OPT.adultRatio} times as tall)`); };
  R.querySelectorAll('svg[data-lcs-prim="sk-art"]').forEach((sv) => tall([sv], `the picture ${sv.dataset.s2Art || ''}`));
  if (mode === 's2-accounts') tall([...R.querySelectorAll('svg[data-s2-art^="teller:"]')], 'the story cards');
  // the flood helpers SIT in the boat (their legs inside its side): one thing to circle (review round 1, row 19)
  R.querySelectorAll('[data-s2-change="boat-helpers"]').forEach((g0) => { const hull = g0.querySelector('[data-s2-drawn="boat"]'), hs = [...g0.querySelectorAll('[data-s2-grownup="lifevest"]')]; if (!hull || hs.length !== 2) { f.push('the boat or its two helpers in life vests are not drawn'); return; } const hb = rr(hull); hs.forEach((h) => { const q = rr(h), cx = (q.left + q.right) / 2; if (cx < hb.left || cx > hb.right || q.bottom < hb.top || q.bottom > hb.bottom + 1) f.push('a helper is not sitting in the boat'); }); });
  // review round 2 (row 52): every tool card's tool touches the worker's hand (the tool's drawn ink, not its picture box)
  R.querySelectorAll('svg[data-s2-art^="tool:"]').forEach((sv) => { const hand = sv.querySelector('[data-s2-worker="tool"] [data-sk-hand="r"]'), ink = sv.querySelector('[data-s2-inkbox]'); if (!hand || !ink) { f.push(`the ${sv.dataset.s2Art} card draws no hand or no tool`); return; } if (!overlap(rr(hand), rr(ink))) f.push(`the ${sv.dataset.s2Art.slice(5)} floats beside the worker's hand`); });
  // review round 2 (row 47): every word on a sign lies inside its sign, with a margin
  R.querySelectorAll('[data-s2-sign]').forEach((sg) => { const shape = sg.querySelector('rect, path'), words = [...sg.querySelectorAll('text')]; if (!shape || !words.length) return; const b = rr(shape), m = OPT.signMargin; words.forEach((t) => { const q = t.getBBox ? (() => { const bb = t.getBBox(), M = t.getScreenCTM(); const p1 = new DOMPoint(bb.x, bb.y).matrixTransform(M), p2 = new DOMPoint(bb.x + bb.width, bb.y + bb.height).matrixTransform(M); return { left: Math.min(p1.x, p2.x), right: Math.max(p1.x, p2.x), top: Math.min(p1.y, p2.y), bottom: Math.max(p1.y, p2.y) }; })() : rr(t); const cy = (q.top + q.bottom) / 2; if (q.left < b.left + m || q.right > b.right - m || cy < b.top || cy > b.bottom) f.push(`the word "${t.textContent}" runs past its sign`); }); });
  // the tradition symbols large enough to count the candles (review round 1, row 25)
  R.querySelectorAll('[data-s1-right] svg[data-s2-art^="symbol:"], [data-s1-right] img').forEach((e) => { const w = rr(e).width; if (w < OPT.minSymbol) f.push(`a tradition symbol ${Math.round(w)} px (at least ${OPT.minSymbol}: the candles must be countable)`); });
  // the flood: exactly the three changes in the after picture, none before; the instruction asks for 3
  if (mode === 's2-disaster') {
    const before = R.querySelector('svg[data-s2-flood="before"]'), after = R.querySelector('svg[data-s2-flood="after"]');
    if (!before || !after) f.push('the flood pictures are missing');
    else { const ch = [...after.querySelectorAll('[data-s2-change]')].map((e) => e.dataset.s2Change).sort(); if (ch.join() !== OPT.flood.slice().sort().join()) f.push(`the after picture shows the changes ${ch.join(', ')} (${OPT.flood.join(', ')})`); if (before.querySelector('[data-s2-change]')) f.push('the before picture shows a change'); }
    const askN = (R.textContent.match(/circle the (\d+) things the flood changed/i) || [])[1]; if (Number(askN) !== OPT.flood.length) f.push(`the page asks for ${askN} changes (${OPT.flood.length} drawn)`);
    R.querySelectorAll('[data-s2-kitslot]').forEach((s) => { const q = rr(s); if (q.width < 60 || q.height < 60) f.push(`a kit box ${Math.round(q.width)} x ${Math.round(q.height)} px (at least 60 x 60: a child draws in it)`); });
    const cm = R.querySelector('svg[data-s2-art="coasts"]');
    if (cm) { const labs = [...cm.querySelectorAll('[data-s2-coastlabel]')]; if (labs.length !== 3) f.push('the coast map does not name the three coasts'); for (let i = 0; i < labs.length; i++) for (let j = i + 1; j < labs.length; j++) if (overlap(rr(labs[i]), rr(labs[j]))) f.push('two coast labels overlap'); const usb = rr(cm.querySelector('[data-s2-us="lower48"]')); labs.forEach((l) => { if (overlap(rr(l), usb, 6)) f.push(`the "${l.dataset.s2Coastlabel}" label covers the map`); }); }
  }
  // the symbols: the menorah's nine branches; the kinara's seven candles, three red, one black, three green, in that order
  R.querySelectorAll('[data-s2-drawn="kinara"]').forEach((k) => { const c = [...k.querySelectorAll('[data-s2-candle]')].sort((a, b) => rr(a).left - rr(b).left).map((e) => e.dataset.s2Candle).join(','); if (c !== 'red,red,red,black,green,green,green') f.push(`the kinara's candles are ${c}`); });
  R.querySelectorAll('[data-s2-drawn="menorah"]').forEach((m) => { if (m.dataset.s2Branches !== '9') f.push('the menorah has not nine branches'); });
  // writing lines long enough for the words: every line a child writes a sentence or a name on is at least the minimum
  R.querySelectorAll('[data-g1-frames] [data-dk-writerow], [data-s2-banklines] [data-dk-writerow]').forEach((e) => { const w = rr(e).width; if (w < OPT.minLine) f.push(`a writing line ${Math.round(w)} px (at least ${OPT.minLine} for a word or a sentence)`); });
  // the price list: every price tag readable; the coins on a tray inside the margin
  if (mode === 's2-market') { const rule = rr(document.querySelector('.ws-body')); R.querySelectorAll('[data-s2-tray]').forEach((t) => { if (rr(t).right > rule.right + 0.5) f.push(`the coins for "${t.dataset.s2Tray}" run past the margin`); }); }
  // the Venn: three parts named, lines in each part
  R.querySelectorAll('svg[data-s2-venn]').forEach((v) => { const parts = [...v.querySelectorAll('[data-s2-part]')].map((e) => e.dataset.s2Part).sort().join(); if (parts !== 'both,me,partner') f.push('the circles do not name their three parts'); ['me', 'both', 'partner'].forEach((p) => { const ls = v.querySelectorAll(`[data-s2-vennline="${p}"]`); if (!ls.length) f.push(`no line to write on in "${p}"`); ls.forEach((l) => { if (rr(l).width < OPT.vennLine) f.push(`a line in "${p}" ${Math.round(rr(l).width)} px (at least ${OPT.vennLine})`); }); }); });
  // a drawing inside an svg stays inside its picture (a person cut off at the edge reads as half a person)
  R.querySelectorAll('svg[data-s2-art^="change:"], svg[data-s2-art^="flood:"], svg[data-s2-art^="law:"], svg[data-s2-art^="bank:"]').forEach((sv) => { const b0 = rr(sv); sv.querySelectorAll('[data-sk-skin]').forEach((p) => { const q = rr(p); if (q.left < b0.left - 1 || q.right > b0.right + 1 || q.top < b0.top - 1) f.push(`a person runs off the picture ${sv.dataset.s2Art}`); }); });
  // the town: every place to circle is apart from the others (a circle round one never takes in another)
  R.querySelectorAll('svg[data-s2-art="town"]').forEach((sv) => { const ps = [...sv.querySelectorAll('[data-s2-place]')].filter((p) => p.hasAttribute('data-dk-answer')); for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) if (overlap(rr(ps[i]), rr(ps[j]), 2)) f.push(`the town's ${ps[i].dataset.s2Place} and ${ps[j].dataset.s2Place} overlap (one circle would take in both)`); });
  // a box that grows to fill the page holds no empty band (its content within OPT.innerBand of its top and its bottom)
  R.querySelectorAll('[data-s2-fill]').forEach((b) => { const q = rr(b); const ink = [...b.querySelectorAll('[data-dk-box], svg, img')].filter((e) => e !== b && !(e.parentElement && e.parentElement.closest('svg'))).map(rr).filter((x) => x.width > 1 && x.height > 1); if (!ink.length) return; const top = Math.min(...ink.map((x) => x.top)) - q.top, bot = q.bottom - Math.max(...ink.map((x) => x.bottom)); if (top > OPT.innerBand || bot > OPT.innerBand) f.push(`${b.dataset.s2Fill}: ${Math.round(Math.max(top, bot))} px of empty box ${top > bot ? 'above' : 'below'} its content (at most ${OPT.innerBand})`); });
  // the old photograph is black and white
  R.querySelectorAll('svg[data-s2-art="old-photo"]').forEach((sv) => { const bw = new Set(OPT.greys.map((x) => x.toUpperCase())); if ([...sv.querySelectorAll('[fill],[stroke]')].some((e) => ['fill', 'stroke'].some((a) => { const v = (e.getAttribute(a) || '').toUpperCase(); return v.startsWith('#') && !bw.has(v); }))) f.push('the old photograph is not black and white'); });
  void lv;
  // 2026-11-25 picture fix (the bakery class, batch S3's live finding): a person who stands at furniture (a lectern, a long desk, a desk, a counter, a stand, a bench)
  // stands BEHIND it: the furniture comes after the person in document order and hides the person's lower body,
  // measured: every point of the lowest 40% of the figure drawn below the furniture's top lies inside the furniture's
  // shapes, and the feet are no lower than its foot. A person drawn after it whose feet stand more than OPT.frontGap px
  // below its foot is in front of it and is not judged. Each drawing of people at furniture (OPT.atFurniture: its name ->
  // the people in it at furniture) judges at least that many, wherever a page draws it (else the check measured nothing).
  {
    const FURN = '[data-s2-drawn="lectern"], [data-s2-drawn="long-desk"], [data-s2-drawn="desk"], [data-s2-drawn="counter"], [data-s2-drawn="stand"], [data-s2-drawn="bench"]';
    const rr0 = (e) => e.getBoundingClientRect();
    const shapesOf = (e) => (e.matches('path, rect, circle, ellipse, polygon') ? [e] : [...e.querySelectorAll('path, rect, circle, ellipse, polygon')]).filter((x) => x.getAttribute('fill') !== 'none');
    const inAny = (els, X, Y) => els.some((x) => { const q0 = new DOMPoint(X, Y).matrixTransform(x.getScreenCTM().inverse()); return x.isPointInFill(q0) || x.isPointInStroke(q0); });
    let pairs = 0; const per = new Map();
    R.querySelectorAll(FURN).forEach((F) => {
      const svg = F.closest('svg'), fb = rr0(F), fs0 = shapesOf(F), name = F.getAttribute('data-s2-drawn');
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
    R.querySelectorAll('svg[data-s2-art]').forEach((sv) => { const a0 = sv.getAttribute('data-s2-art'), want = (OPT.atFurniture || {})[a0] || 0; if ((per.get(sv) || 0) < want) f.push(`${per.get(sv) || 0} people at furniture judged in "${a0}" (it draws ${want}: the check would measure nothing)`); });
    void pairs; void mode; void lv;
  }
  return f;
}
/** 2026-11-25 picture fix: the people at furniture each drawing judges at least (by its name; measured) */
const ATFURN_S2 = { 'leader:mayor': 1, 'leader:governor': 1, 'leader:president': 1, 'leader:council': 4, 'leader:congress': 8, 'teller:librarian': 1, 'bank:loan': 1, 'bank:safe': 1, stand: 2 };
const S2_OPT = { legsShown: 2, frontGap: 3, lowerBody: 0.4, atFurniture: ATFURN_S2, flood: B.FLOOD_CHANGES, minLine: 60, vennLine: 80, innerBand: 60, adultRatio: 1.2, minSymbol: 70, signMargin: 1, greys: ['#FFFFFF', ...['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9'].map((k) => A1.S1_SCENE[k])] };
/** makeS2Type({ id, slug, mode, exerciseType, difficulty, i18n }) */
function makeS2Type({ id, slug, mode, exerciseType, difficulty, i18n }) {
  if (!MODES[mode]) throw new Error('dk-social-2: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G2', assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    difficulty,
    i18n,
    dkMode: mode,
    build({ difficulty: lv, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the Batch S2 pages are English (no ${locale} bank)`);
      const d = { ...(this.difficulty[lv] || this.difficulty[2]), level: Number(lv) };
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${DK.CSS}${S2CSS}</style><div class="dk-root" data-ws-content data-dk="${mode}" data-dk-level="${lv}" data-dk-record="${out.meta.record ? 1 : 0}">${out.html}</div>`,
        meta: { mode, level: Number(lv), ...out.meta },
      };
    },
    /** what a Level Set copy asks (build-waves compares copies on it): the items each page draws */
    levelSetWords(meta) { return (meta.items || []).map(String); },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(G.g1VerifyInPage), await page.evaluate(SK.skVerifyInPage, [...A.PAL2], SK.SK_OPT), await page.evaluate(S1.s1VerifyInPage, S1.S1_OPT), await page.evaluate(s2VerifyInPage, S2_OPT));
    },
  };
}

module.exports = { makeS2Type, MODES, s2VerifyInPage, S2_OPT, lemonCosts, marketTray, venn };
