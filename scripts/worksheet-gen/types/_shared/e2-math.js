/**
 * e2-math.js — Batch DE-A (Daily Teaching System Stage E-2, 2026-11-26): the German mathematics pages of the Klasse 1-2
 * year design (scripts/units/year/design.de.math.json) that no existing type teaches:
 *   G1-673 e2-null    Rechnen mit der Null                                        (mental-math; Klasse 1)
 *   G1-674 e2-wege1   Rechenwege vergleichen: Wie rechnest du 7 + 8?              (mental-math; Klasse 1)
 *   G1-675 e2-mess    Mit Handspanne, Fuß und Schritt messen     (set 'koerper') (measurement; Klasse 1; a record page)
 *   G2-634 e2-zehner  Zum Zehner ergänzen, vom Zehner abziehen                    (mental-math; Klasse 2)
 *   G2-635 e2-wege2   Rechenwege vergleichen: schrittweise oder mit Hilfsaufgabe? (mental-math; Klasse 2)
 *   G2-636 e2-mess    Meter und Zentimeter: erst schätzen, dann messen  (set 'mcm') (measurement; Klasse 2)
 * Each type is printed in German only (`onlyLocales: ['de']`; any other locale refuses at build). Themeless; PDF only.
 * Batch SV (2026-11-26) added two Swedish sets of the measuring-table mode, printed in Swedish only:
 *   G2-637 e2-mess    Meter och centimeter                    (set 'cmsv') (measurement; åk 2: whole cm or whole m)
 *   G3-650 e2-mess    Äldre mått: tum, fot, aln och famn      (set 'aldre') (measurement; åk 3; a record page)
 * Their paths (lv.short, S.cw, S.rowH, S.whole, the 'mcm' column, bottom 'unit', top 'realref' / 'bodyunits', lv.why,
 * lv.conv) are reached only by those sets: every DE-A page is byte-identical (lcs-stage-d/batch-sv/work/hash-sv.js).
 *
 * ONE recording-table mode for every measuring page (e2-mess): a SET in the bank (data/e2/e2-math.js SETS) names its
 * locale, its units (data/e2 UNITS: a drawing and the words per locale) and its things, and per level its rows and
 * columns (thing | with | est | meas | partner | diff). A later batch (the Swedish äldre mått: tum, fot, aln, famn) adds
 * its units and a set to the bank and a drawing to e2-math-art.js bodyUnit; nothing here changes.
 *
 * Built on the Batch K CSS and page check (dk-kinder.js) and the Batch 1 layout kit and one-answer check (dk-g1.js); the
 * children are the figure set of dk-social-k-art.js (through e2-math-art.js). None of those files is edited; this file
 * has its own modes, its own CSS and its own page check (e2VerifyInPage). Gate: qa/verify-e2-de-a.js.
 *
 * Stamps (never printed): data-e2-answer on a box with ONE value; data-dk-answer on the choices of a one-answer group;
 * data-e2-match / data-e2-target on the two sides of a line to draw; data-e2-open + data-e2-key on an open item (the
 * child chooses its way: the key lists every valid way, none is marked wrong); data-e2-record on a box that holds the
 * child's own measurement (no key value: the key says so).
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const DK = require('./dk-kinder.js');
const G = require('./dk-g1.js');
const A = require('./e2-math-art.js');
const B = require('../../data/e2/e2-math.js');

const T = TOK.color;
const W = 675;
const { box, col, row, lineBox, esc } = G.kit;
const MODES = {};
const LOC = {};   // mode -> the one locale it prints in (e2-mess: its set's locale)
const MN = '−';   // the minus sign printed on the page

/* ================================================================ the layout kit */
const E2CSS = `
.g1-chip{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:2px 11px;font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;line-height:20px;color:${T.teal};white-space:nowrap}
.e2-t{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:22px;color:${T.ink};white-space:nowrap}
.e2-tw{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;line-height:19px;color:${T.ink};white-space:normal}
.e2-head{display:block;box-sizing:border-box;font-family:'Baloo 2',cursive;font-weight:700;font-size:18px;line-height:22px;color:${T.teal};white-space:nowrap}
.e2-big{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:24px;line-height:28px;color:${T.ink};white-space:nowrap}
.e2-op{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:22px;line-height:26px;color:${T.coral};white-space:nowrap}
.e2-badge{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;flex-shrink:0;width:26px;height:26px;border-radius:50%;background:${T.teal};font-family:'Baloo 2',cursive;font-weight:700;font-size:15px;line-height:19px;color:#FFFFFF}
.e2-bubble{box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;gap:2px;background:#FFFFFF;border:2.5px solid ${T.teal};border-radius:14px;padding:4px 9px 5px}
.e2-chain{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:21px;line-height:24px;color:${T.ink};white-space:nowrap}
.e2-name{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2px solid ${T.teal};border-radius:999px;background:${T.tealSoft};padding:0 9px;font-family:'Baloo 2',cursive;font-weight:700;font-size:15px;line-height:20px;color:${T.teal};white-space:nowrap}
.e2-tick{display:block;box-sizing:border-box;width:22px;height:22px;border:2.5px solid ${T.ink};border-radius:4px;background:#FFFFFF;flex-shrink:0}
.ws-blankbox[data-e2-hs="sign"]{border-radius:50% !important}
.e2-cell{box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-right:1.5px solid ${T.grid};padding:3px 4px}
.e2-th{box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-right:1.5px solid ${T.grid};padding:2px 4px;font-family:'Baloo 2',cursive;font-weight:700;font-size:15px;line-height:18px;color:${T.teal};white-space:nowrap}
`;
const t = (s, attrs = '', style = '', cls = 'e2-t') => `<span class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(s)}</span>`;
const tw = (s, w, attrs = '', style = '') => `<span class="e2-tw" data-dk-box${attrs ? ' ' + attrs : ''} style="width:${w}px${style ? ';' + style : ''}">${esc(s)}</span>`;
const head = (s, attrs = '', style = '') => t(s, attrs, style, 'e2-head');
const big = (s, attrs = '', style = '') => t(s, attrs, style, 'e2-big');
const op = (s, style = '') => t(s, '', style, 'e2-op');
const badge = (s, attrs = '') => `<span class="e2-badge" data-dk-box${attrs ? ' ' + attrs : ''}>${esc(s)}</span>`;
/** a box to write ONE number in; the answer stamped (never printed) */
const ansBox = (w, h, answer, attrs = '') => box('ws-blankbox', w, h, '', `data-dk-numbox data-e2-answer="${esc(answer)}"${attrs ? ' ' + attrs : ''}`, 'display:block');
/** a box for the child's own number (a measurement, an open way): no answer */
const freeBox = (w, h, attrs = '') => box('ws-blankbox', w, h, '', `data-dk-numbox${attrs ? ' ' + attrs : ''}`, 'display:block');
/** a box to tick; in a one-answer group its stamp says right / no */
const tick = (attrs = '') => `<span class="e2-tick" data-dk-box${attrs ? ' ' + attrs : ''}></span>`;
const card = (inner, w, h, attrs = '', style = '') => box('dk-tile', w, h, inner, attrs, style);
const white = (inner, w, h, attrs = '', style = '') => box('dk-tile dk-tile--white', w, h, inner, attrs, style);
const art = (s, attrs = '') => `<div data-dk-box${attrs ? ' ' + attrs : ''} style="line-height:0;flex-shrink:0">${s}</div>`;
const dot = (attrs = '') => `<span class="dk-dot" data-dk-box${attrs ? ' ' + attrs : ''}></span>`;
const src = (p) => require('../../image-cache/resolve.js').fileUri(p[0], p[1]);   // looked up at build time only (the server has no cache)
const rint = (rng, a, b) => a + Math.floor(rng.next() * (b - a + 1));
/** a number sentence of parts: numbers, operators, answer boxes ({ box: value } or { free: true }) */
function sentence(parts, o = {}) {
  const bw = o.bw || 44, bh = o.bh || 36, cls = o.small ? 'font-size:20px;line-height:24px' : '';
  return row(parts.map((p) => {
    if (p && typeof p === 'object' && 'box' in p) return ansBox(p.w || bw, bh, p.box, p.attrs || '');
    if (p && typeof p === 'object' && p.free) return freeBox(p.w || bw, bh, p.attrs || '');
    if (p === '+' || p === MN || p === '=') return op(p, cls);
    return big(String(p), '', cls);
  }).join(''), o.gap || 6, 'justify-content:flex-start;align-items:center' + (o.style ? ';' + o.style : ''));
}
const shuffleSafe = (rng, a) => rng.shuffle(a.slice());

/* ================================================================ the children (G1-674, G2-635) */
/** a cast of n children with different skin tones, hair and clothes (the dk-social-k convention, copied: that module's
 *  cast() lives in a page factory this file does not load) */
const TONES = ['s1', 's2', 's3', 's4', 's5', 's6'];
const HAIRS = { f: ['long', 'puffs', 'bun', 'braids', 'pony', 'curly'], m: ['short', 'curly', 'spiky', 'short'] };
const HAIRCOL = { s1: ['blond', 'brown', 'red', 'dark'], s2: ['brown', 'dark', 'blond', 'black'], s3: ['dark', 'black', 'brown'], s4: ['black', 'dark'], s5: ['black', 'dark'], s6: ['black'] };
const TOPS = ['teal', 'coral', 'yellow', 'blue', 'purple', 'green', 'orange', 'pink', 'red', 'sky'];
function kids(n, rng) {
  const tones = rng.shuffle(TONES.slice()), tops = rng.shuffle(TOPS.slice());
  const used = new Set();
  return Array.from({ length: n }, (_, i) => {
    const sex = rng.next() < 0.5 ? 'f' : 'm';
    const name = rng.pick(B.NAMES[sex].filter((x) => !used.has(x))); used.add(name);
    const skin = tones[i % tones.length];
    return { name, sex, skin, hair: rng.pick(HAIRS[sex]), hairColor: rng.pick(HAIRCOL[skin]), top: tops[i % tops.length], bottom: sex === 'f' ? rng.pick(['pants', 'skirt', 'dress']) : 'pants', bottomColor: rng.pick(['denim', 'khaki', 'navy', 'dark']) };
  });
}
/** a child with a speech bubble: the figure (its name under it) and, to its right, the bubble with the words */
function talking(kid, bubbleInner, bw, px = 76, attrs = '') {
  const fig = col(art(A.child(kid, px), `data-e2-kid="${esc(kid.name)}"`) + `<span class="e2-name" data-dk-box data-e2-name="${esc(kid.name)}" style="font-size:13px;line-height:17px;padding:0 5px">${esc(kid.name)}</span>`, 2);
  const tail = `<div style="line-height:0;flex-shrink:0;margin-right:-3px;align-self:flex-start;margin-top:16px;position:relative;z-index:1">${A.bubbleTail()}</div>`;
  return row(fig + tail + box('e2-bubble', bw, 'auto', bubbleInner, `data-e2-bubble="${esc(kid.name)}"${attrs ? ' ' + attrs : ''}`), 0, 'align-items:flex-start;justify-content:flex-start');
}

/* ================================================================ G1-673 — Rechnen mit der Null */
LOC['e2-null'] = 'de';
/**
 * Per level: the story numbers (n things at the start, k come or go), the tasks' number range and their forms. A form is
 * [shape, blank]: shape 'a+0' 0+a a-0 a-a (with a zero) or a+b a-b (ordinary); blank = the part left empty (0 the first
 * number, 2 the second, 3 the result). Every level: four stories (three with a zero: nothing comes, nothing goes, all go;
 * one ordinary) and twelve tasks (eight with a zero, four ordinary), shuffled.
 */
const NULL_LV = {
  1: { n: [2, 5], k: [2, 3], max: 6, tmax: 6,
    forms: [['a+0', 3], ['0+a', 3], ['a-0', 3], ['a-a', 3], ['a+0', 3], ['0+a', 3], ['a-0', 3], ['a-a', 3], ['a+b', 3], ['a+b', 3], ['a-b', 3], ['a-b', 3]] },
  2: { n: [3, 7], k: [2, 3], max: 8, tmax: 10,   // review round 1: at most eight things in a picture
    forms: [['a+0', 3], ['0+a', 3], ['a-0', 3], ['a-a', 3], ['a+0', 2], ['a-0', 2], ['a-a', 2], ['0+a', 2], ['a+b', 3], ['a-b', 3], ['a+b', 2], ['a-b', 2]] },
  3: { n: [4, 8], k: [2, 4], max: 8, tmax: 10,
    forms: [['a+0', 0], ['0+a', 2], ['a-0', 0], ['a-a', 0], ['a-0', 2], ['a+0', 2], ['0+a', 0], ['a-a', 3], ['a+b', 0], ['a+b', 2], ['a-b', 0], ['a-b', 2]] },
};
/** the four parts [x, op, y, z] of a task shape with a (and b) */
function nullParts(shape, a, b) {
  if (shape === 'a+0') return [a, '+', 0, a];
  if (shape === '0+a') return [0, '+', a, a];
  if (shape === 'a-0') return [a, MN, 0, a];
  if (shape === 'a-a') return [a, MN, a, 0];
  if (shape === 'a+b') return [a, '+', b, a + b];
  if (shape === 'a-b') return [a, MN, b, a - b];
  throw new Error('e2-null: shape ' + shape);
}
/** the two sentences of a story (the teacher reads them aloud): the place, then what happens */
function nullCaption(th, kind) {
  const kein = th.g === 'f' ? 'keine' : 'kein', Kein = th.g === 'f' ? 'Keine' : 'Kein';
  const start = `${th.place} ${th.pl}.`;
  let act;
  if (th.kind === 'animal') act = { plus0: `Es kommt ${kein} ${th.sg} dazu.`, plusK: `Es kommen noch ${th.pl} dazu.`, minus0: `${Kein} ${th.sg} ${th.goSg}.`, minusK: `Ein paar ${th.pl} ${th.goPl}.`, all: `Alle ${th.pl} ${th.goPl}.` }[kind];
  else act = { plus0: `Es wird ${kein} ${th.sg} dazugelegt.`, plusK: `Es werden noch ${th.pl} dazugelegt.`, minus0: `${Kein} ${th.sg} wird gegessen.`, minusK: `Ein paar ${th.pl} werden gegessen.`, all: `Alle ${th.pl} werden gegessen.` }[kind];
  return [start, act];
}
MODES['e2-null'] = (d, rng) => {
  const lv = NULL_LV[d.level], X = B.TEXT.null;
  // the stories: three with a zero and one ordinary, each with its own thing and (where it can) its own start number
  let stories;
  for (let tries = 0; ; tries++) {
    if (tries > 2000) throw new Error('e2-null: no stories');
    const kinds = rng.shuffle(['plus0', 'minus0', 'all', rng.next() < 0.5 ? 'plusK' : 'minusK']);
    const things = rng.shuffle(B.NULL_THINGS.slice()).slice(0, 4);
    stories = kinds.map((kind, i) => {
      const n = rint(rng, lv.n[0], lv.n[1]);
      let k = 0;
      if (kind === 'all') k = n;
      if (kind === 'plusK') k = rint(rng, lv.k[0], lv.k[1]);
      if (kind === 'minusK') k = rint(rng, lv.k[0], Math.min(lv.k[1], n - 1));
      const plus = kind.startsWith('plus');
      return { kind, th: things[i], n, k, plus, z: plus ? n + k : n - k };
    });
    if (stories.some((s) => (s.kind === 'plusK' && s.z > lv.max) || (s.kind === 'minusK' && (s.k < lv.k[0] || s.z < 1)))) continue;
    if (new Set(stories.map((s) => s.n)).size < 3) continue;
    // review round 2: every story's place holds its things in the rows it can carry (a leaf, a pond, a stone or a plate
    // one row; the first group the same in both pictures, the newcomers' place kept free in picture 1)
    if (stories.some((s) => { const L = A.storyLayout({ scene: s.th.scene, nStay: s.n, nCome: s.plus ? s.k : 0, w: 186, h: 84 }); return !L || L.p < 21; })) continue;   // pictures at least 21 px (5.6 mm)
    break;
  }
  const storyHtml = stories.map((s, i) => {
    const P = s.th.pic, pic = P.join('/'), one = { src: src(P), pic };
    const before = Array.from({ length: s.n }, () => ({ ...one }));
    const after = s.plus ? before.concat(Array.from({ length: s.k }, () => ({ ...one, arrives: true }))) : before.map((x, j) => ({ ...x, crossed: j >= s.n - s.k }));
    const [c1, c2] = nullCaption(s.th, s.kind);
    const frame = sentence([{ box: s.n, attrs: 'data-e2-story="n"' }, s.plus ? '+' : MN, { box: s.k, attrs: 'data-e2-story="k"' }, '=', { box: s.z, attrs: 'data-e2-story="z"' }], { bw: 42, bh: 36 });
    const caption = row(t(c1, 'data-e2-caption="1"', 'font-size:16px;line-height:20px') + t(c2, 'data-e2-caption="2"', 'font-size:16px;line-height:20px'), 6, 'justify-content:flex-start');
    const pics = row(art(A.storyPanel({ scene: s.th.scene, things: before, come: s.plus ? s.k : 0, w: 186, h: 84 }), 'data-e2-panel="1"') + art(A.storyArrow()) + art(A.storyPanel({ scene: s.th.scene, things: after, w: 186, h: 84 }), 'data-e2-panel="2"') + frame, 7, 'justify-content:flex-start');
    return card(row(badge(String(i + 1)) + col(caption + pics, 3, 'align-items:flex-start'), 8, 'justify-content:flex-start;width:100%'),
      W, 'auto', `data-e2-storycard="${i + 1}" data-e2-kind="${s.kind}" data-e2-thing="${s.th.id}" data-e2-n="${s.n}" data-e2-k="${s.k}"${s.plus ? ` data-e2-alt="${s.k} + ${s.n} = ${s.z}"` : ''}`, 'flex:1 1 0;min-height:0;padding:4px 8px;justify-content:flex-start');
  }).join('');
  // the tasks: twelve, distinct, in a drawn order
  const tasks = [];
  const seen = new Set();
  for (const [shape, blank] of lv.forms) {
    for (let tries = 0; ; tries++) {
      if (tries > 5000) throw new Error('e2-null: no task ' + shape);
      const a = rint(rng, 1, lv.tmax), b = rint(rng, 1, lv.tmax);
      if (shape === 'a+b' && a + b > lv.tmax) continue;
      if (shape === 'a-b' && a - b < 1) continue;
      const parts = nullParts(shape, a, b);
      const key = parts.join(' ') + '|' + blank;
      if (seen.has(parts.join(' '))) continue;
      seen.add(parts.join(' '));
      tasks.push({ shape, blank, parts, answer: parts[blank], zero: !/b/.test(shape), key });
      break;
    }
  }
  const order = rng.shuffle(tasks.slice());
  const taskHtml = order.map((q, i) => {
    const P = q.parts.map((v, j) => (j === 1 ? v : j === q.blank ? { box: v, attrs: `data-e2-task="${i + 1}"` } : v));
    return sentence([P[0], P[1], P[2], '=', P[3]], { bw: 44, bh: 36, gap: 5 });
  });
  const colsHtml = [0, 1, 2].map((c) => col(taskHtml.filter((_, i) => i % 3 === c).join(''), 9, 'align-items:flex-start')).join('');
  const missing = lv.forms.some((f) => f[1] !== 3);
  const tasksBox = white(col(head(missing ? X.tasksHeadMissing : X.tasksHead) + `<div class="dk-row" style="gap:10px;justify-content:space-between;align-items:flex-start;width:100%">${colsHtml}</div>`, 4, 'align-items:flex-start;width:100%'), W, 'auto', 'data-e2-tasks="1"', 'padding:4px 16px 8px;flex-shrink:0;justify-content:flex-start');
  const html = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:7px">${storyHtml}</div>` + tasksBox;
  return {
    html,
    meta: {
      stories: stories.map((s) => `${s.kind}:${s.th.id}:${s.n}${s.plus ? '+' : '-'}${s.k}=${s.z}`),
      tasks: order.map((q) => q.parts.map((v, j) => (j === q.blank ? '[' + v + ']' : v)).join(' ').replace(/ (\S+)$/, ' = $1')),
      items: stories.map((s) => s.kind + ':' + s.th.id).concat(order.map((q) => q.shape + '@' + q.blank)),
    },
  };
};

/* ================================================================ the ways to 7 + 8 (G1-674) */
LOC['e2-wege1'] = 'de';
/**
 * The three ways (the designer's): ZEHN erst bis zur 10 from the FIRST number (7 + 3 + 5); DOPPEL verdoppeln, the double
 * of the smaller number and the rest (7 + 7 + 1); TAUSCH the Tauschaufgabe, then to the 10 from the larger SECOND number
 * (8 + 2 + 5). A worked chain of a new task belongs to exactly one of them (the gate re-derives it):
 *   zehn   starts with the task's first number a, and a + its next number = 10  (a is never 5: 5 + 5 is also a double)
 *   tausch starts with the task's second number b > a, and b + its next number = 10
 *   doppel starts with a double (x + x), x the smaller number (first or second), and the rest makes the sum
 * Level 1-2: "Wessen Weg ist das?" (closed: one child per chain). Level 3: "Welcher Weg passt gut?" (open: the child
 * chooses; the key lists every way that works and which one is the short way, none is marked wrong).
 */
const WEGE1_LV = {
  1: { recompute: 'steps', B: 'ident', nB: 3, nC: 2, Cmode: 'frame' },   // the designer: "schreibt bei zwei Aufgaben seinen eigenen Weg"
  2: { recompute: 'sum', B: 'ident', nB: 4, nC: 2, Cmode: 'circle' },
  3: { recompute: 'sum', B: 'open', nB: 4, nC: 2, Cmode: 'free' },
};
/** every crossing task (sum 11..18, both numbers 2..9) and, per way, its chain when that way applies as defined above */
function wege1Chains(a, b) {
  const s = a + b, out = {};
  if (a !== 5 && a < 10) { const c = [a, 10 - a, s - 10]; if (c[1] >= 1 && c[2] >= 1) out.zehn = c; }
  if (b > a && b !== 5) { const c = [b, 10 - b, s - 10]; if (c[1] >= 1 && c[2] >= 1) out.tausch = c; }
  const m = Math.min(a, b), d = Math.abs(a - b);
  if (d >= 1 && d <= 2 && m !== 5) out.doppel = [m, m, d];   // 6 + 7 = 6 + 6 + 1 and 8 + 7 = 7 + 7 + 1
  return out;
}
const distinctParts = (c) => new Set(c).size === c.length;
/** the identification pool: tasks whose chain for `way` is clean (three different numbers, except the double) and that
 *  are not 7 + 8 or 8 + 7 */
function identPool(way) {
  const out = [];
  for (let a = 2; a <= 9; a++) for (let b = 2; b <= 9; b++) {
    if (a + b < 11 || (a === 7 && b === 8) || (a === 8 && b === 7)) continue;
    const c = wege1Chains(a, b)[way];
    if (!c) continue;
    if (way !== 'doppel' && !distinctParts(c)) continue;
    if (way === 'doppel' && c[2] === c[0]) continue;
    out.push({ a, b, way, chain: c });
  }
  return out;
}
/** every way a Klasse-1 child may write for a + b, for the key of an open item (all right; each way with the name of the
 *  child on the page who rechnet so) */
function wege1Key(a, b, names = {}) {
  const s = a + b, ways = [], nm = (w) => (names[w] ? ` (${names[w]})` : '');
  if (a !== 5) ways.push(`erst bis zur 10${nm('zehn')}: ${a} + ${10 - a} + ${s - 10}`);
  if (b !== 5) ways.push(`Tauschaufgabe${nm('tausch')}: ${b} + ${10 - b} + ${s - 10}`);
  const m = Math.min(a, b), M = Math.max(a, b), d = M - m;
  // review round 1: "verdoppeln" only for a near double (the two numbers 1 or 2 apart), also from the larger number
  if (d >= 1 && d <= 2) { ways.push(`verdoppeln${nm('doppel')}: ${m} + ${m} + ${d}`); ways.push(`verdoppeln und weniger: ${M} + ${M} − ${d}`); }
  // review round 1: with a 9, plus 10 and back 1
  if (a === 9) ways.push(`mit der 10: 10 + ${b} − 1`);
  if (b === 9) ways.push(`mit der 10: ${a} + 10 − 1`);
  if (a >= 5 && b >= 5) ways.push(`Kraft der Fünf: 5 + 5 + ${a - 5} + ${b - 5}`);
  return `${a} + ${b} = ${s}. Jeder Weg mit richtigen Schritten ist richtig: ${ways.join(' · ')}.`;
}
MODES['e2-wege1'] = (d, rng) => {
  const lv = WEGE1_LV[d.level], X = B.TEXT.wege1;
  const ways = rng.shuffle(['zehn', 'doppel', 'tausch']);
  const cast = kids(3, rng);
  const who = Object.fromEntries(ways.map((w, i) => [w, cast[i]]));
  const names = Object.fromEntries(ways.map((w) => [w, who[w].name]));
  // 1. the three children with their ways for 7 + 8, and the recompute frames
  const recompute = (w) => {
    const [x, y, z] = X.ways[w].chain.map(Number);
    if (lv.recompute === 'steps') return col(sentence([x, '+', y, '=', { box: x + y, attrs: `data-e2-re="${w}1"` }], { bw: 42, bh: 34, small: true }) + sentence([{ box: x + y, attrs: `data-e2-re="${w}2a"` }, '+', z, '=', { box: 15, attrs: `data-e2-re="${w}2"` }], { bw: 42, bh: 34, small: true }), 6, 'align-items:flex-start');
    return sentence([x, '+', y, '+', z, '=', { box: 15, attrs: `data-e2-re="${w}"` }], { bw: 46, bh: 36, small: true });
  };
  const bubble = (w) => X.ways[w].line.map((l, k) => t(l, k ? '' : `data-e2-wayline="${w}"`, 'font-size:15px;line-height:18px')).join('') + t(X.ways[w].chain.join(' + '), `data-e2-waychain="${w}"`, 'margin-top:2px', 'e2-chain');
  const aCards = ways.map((w) => card(col(talking(who[w], bubble(w), 132, 84) + recompute(w), 8, 'align-items:flex-start;width:100%'),
    Math.floor((W - 16) / 3), 'auto', `data-e2-way="${w}" data-e2-who="${esc(who[w].name)}"`, 'padding:6px 6px 8px;justify-content:flex-start;align-items:flex-start')).join('');
  const partA = col(head(X.headA) + `<div class="dk-row" style="gap:8px;align-items:stretch;width:100%">${aCards}</div>`, 3, 'align-items:flex-start;width:100%;flex-shrink:0');
  // 2. new tasks
  const used = new Set(['7+8', '8+7']);
  const takeTask = (pool) => { const free = pool.filter((p) => !used.has(p.a + '+' + p.b) && !used.has(p.b + '+' + p.a)); if (!free.length) throw new Error('e2-wege1: no task left'); const p = rng.pick(free); used.add(p.a + '+' + p.b); return p; };
  let bInner;
  const bItems = [];
  if (lv.B === 'ident') {
    const wanted = ['zehn', 'doppel', 'tausch'].concat(lv.nB > 3 ? [rng.pick(['zehn', 'doppel', 'tausch'])] : []);
    // the first way (smaller number first three times in four) and the doubling way (by a coin) with either number first;
    // the Tauschaufgabe always has the larger number second (measured: with these two chances the order of the task's
    // numbers names no child, balanced accuracy about 50 %)
    for (const w of wanted) { const small = rng.next() < (w === 'zehn' ? 0.75 : 0.5); const pool = identPool(w); bItems.push(takeTask(w === 'tausch' ? pool : pool.filter((p) => (small ? p.a < p.b : p.a > p.b)))); }
    const left = rng.shuffle(bItems.slice());
    const names = rng.shuffle(ways.slice());
    const L = left.map((p, i) => row(card(t(`${p.a} + ${p.b} = ${p.chain.join(' + ')}`, '', '', 'e2-chain'), 250, 42, `data-e2-chainitem="${i + 1}" data-e2-match="${p.way}" data-e2-task="${p.a}+${p.b}"`, 'padding:0 12px;justify-content:flex-start') + dot(`data-e2-leftdot="${i + 1}"`), 8)).join('');
    const R = names.map((w) => row(dot(`data-e2-rightdot="${w}"`) + `<span class="e2-name" data-dk-box data-e2-target="${w}" style="font-size:18px;line-height:26px;padding:2px 16px">${esc(who[w].name)}</span>`, 8, 'justify-content:flex-start')).join('');
    // the rows spread over the card (room for the lines, no empty band above or below them)
    bInner = `<div class="dk-row" style="justify-content:space-between;align-items:stretch;width:100%;height:100%">${col(L, 12, 'align-items:flex-start;justify-content:space-around;height:100%')}${col(R, 12, 'align-items:flex-start;width:150px;justify-content:space-around;height:100%')}</div>`;
    bItems.splice(0, bItems.length, ...left);
  } else {
    // level 3: one task where the first way is the short way, one for the Tauschaufgabe, one near double, one more
    const pools = [identPool('zehn').filter((p) => p.a >= 8 && p.a - p.b >= 2), identPool('tausch').filter((p) => p.b >= 8 && p.b - p.a >= 2), identPool('doppel'), identPool('zehn').concat(identPool('tausch'))];
    for (const pool of pools) bItems.push(takeTask(pool));
    const order = rng.shuffle(bItems.slice());
    bItems.splice(0, bItems.length, ...order);
    const items = order.map((p, i) => card(col(row(big(`${p.a} + ${p.b}`, '', 'font-size:22px;line-height:26px') + t(X.name, '', 'font-size:15px;margin-left:10px') + lineBox(120, 30), 4, 'justify-content:flex-start;align-items:flex-end') +
      sentence([`${p.a} + ${p.b} =`, { free: true }, '+', { free: true }, '+', { free: true }, '=', { free: true }], { bw: 36, bh: 32, small: true, gap: 3 }), 8, 'align-items:flex-start'),
    Math.floor((W - 50) / 2), 'auto', `data-e2-openitem="${i + 1}" data-e2-open="1" data-e2-key="${esc(wege1Key(p.a, p.b, names))}"`, 'padding:6px 10px;justify-content:flex-start')).join('');
    bInner = `<div class="dk-row" style="gap:10px;flex-wrap:wrap;row-gap:10px;width:100%;height:100%;justify-content:space-between;align-content:space-around">${items}</div>`;
  }
  const partB = col(head(lv.B === 'ident' ? X.headB : X.headB3) + white(bInner, W, 'auto', 'data-e2-part="B"', 'flex:1 1 auto;min-height:0;padding:8px 14px;justify-content:center;align-items:stretch'), 3, 'align-items:flex-start;width:100%;flex:1.4 1 0;min-height:0');
  // 3. the child's own way
  const cTasks = [];
  const crossing = []; for (let a = 2; a <= 9; a++) for (let b = 2; b <= 9; b++) if (a + b >= 11 && a + b <= 18 && a !== b) crossing.push({ a, b });
  for (let k = 0; k < lv.nC; k++) cTasks.push(takeTask(crossing));
  const cHtml = cTasks.map((p) => {
    const key = `data-e2-open="1" data-e2-key="${esc(wege1Key(p.a, p.b, names))}" data-e2-owntask="${p.a}+${p.b}"`;
    if (lv.Cmode === 'free') return card(col(big(`${p.a} + ${p.b} =`) + lineBox(280, 34) + lineBox(280, 34), 2, 'align-items:flex-start'), Math.floor((W - 50) / 2), 'auto', key, 'padding:4px 10px;justify-content:flex-start');
    const circle = lv.Cmode === 'circle' ? row(ways.map((w) => `<span class="e2-name" data-dk-box data-e2-circle="${w}">${esc(who[w].name)}</span>`).join(''), 8, 'justify-content:flex-start') : '';
    // review round 1: a writing line, so every taught way fits (10 + 3 − 1, 9 + 9 − 1, 5 + 5 + 3 + 4)
    return card(col(circle + row(big(`${p.a} + ${p.b} =`, '', 'font-size:20px;line-height:24px') + lineBox(lv.Cmode === 'circle' ? 196 : 210, 36), 6, 'justify-content:flex-start;align-items:flex-end'), 8, 'align-items:flex-start'), Math.floor((W - 50) / 2), 'auto', key, 'padding:6px 10px;justify-content:flex-start');
  }).join('');
  const partC = col(head(lv.Cmode === 'free' ? X.headC3 : X.headC) + white(`<div class="dk-row" style="gap:12px;width:100%;justify-content:${lv.nC === 1 ? 'flex-start' : 'space-between'};align-items:stretch">${cHtml}</div>`, W, 'auto', 'data-e2-part="C"', 'flex-shrink:0;padding:8px 14px;justify-content:center'), 3, 'align-items:flex-start;width:100%;flex-shrink:0');
  const html = partA + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${partB}${partC}</div>`;
  return {
    html,
    meta: {
      ways: ways.map((w) => w + ':' + who[w].name), kids: cast.map((k) => `${k.name}(${k.sex},${k.skin})`),
      partB: bItems.map((p) => `${p.a}+${p.b}=${p.chain.join('+')}:${p.way}`), own: cTasks.map((p) => p.a + '+' + p.b),
      items: bItems.map((p) => p.way).concat(cTasks.map((p) => p.a + '+' + p.b)),
    },
  };
};

/* ================================================================ the measuring tables (G1-675 koerper, G2-636 mcm) */
/** one recording-table mode for every measuring page: the set (data/e2 SETS) gives everything per level */
function messMode(setId) {
  return (d, rng) => {
    const S = B.SETS[setId], lv = S.levels[d.level], loc = S.locale, X = B.TEXT.mess[loc];
    const metric = S.units.every((u) => B.UNITS[u].kind === 'tool');
    // the rows: things of the set (the comparison's thing always), every unit at least once when the unit is set per row
    let rows;
    for (let tries = 0; ; tries++) {
      if (tries > 2000) throw new Error('e2-mess: no rows for ' + setId);
      const pool = metric ? S.things.slice() : Object.keys(S.pairs);
      const pick = (S.must || []).concat(rng.shuffle(pool.filter((x) => !(S.must || []).includes(x))).slice(0, lv.rows - (S.must || []).length));
      rows = rng.shuffle(pick).map((id) => ({ id, unit: metric || lv.choose ? null : S.pairs[id] }));   // level 3: the child chooses
      if (!metric && !lv.choose && S.units.some((u) => !rows.some((r) => r.unit === u))) continue;
      if (metric && lv.short != null) { if (rows.filter((r) => B.THINGS[r.id].short).length !== lv.short) continue; }   // Batch SV: a set may fix how many short things
      else {
        if (metric && !rows.some((r) => !B.THINGS[r.id].short)) continue;
        if (metric && rows.filter((r) => B.THINGS[r.id].short).length > 2) continue;
      }
      break;
    }
    // the columns' widths (the thing first; the rest share what is left); a set may give its own per level (Batch SV)
    const cw = { thing: metric ? 150 : 182, with: metric ? 120 : lv.choose ? 150 : 104, est: metric ? 114 : 80, meas: metric ? 114 : 80, partner: metric ? 114 : 80, diff: metric ? 84 : 84, ...((S.cw && S.cw[d.level]) || {}) };
    const cols = lv.cols, tot = cols.reduce((s, c) => s + cw[c], 0), spare = Math.max(0, W - 28 - tot);
    cols.forEach((c) => { if (c !== 'thing') cw[c] += Math.floor(spare / (cols.length - 1)); });
    const rowH = S.rowH ? S.rowH[d.level] : metric ? 56 : d.level === 1 ? 92 : 74;   // metric: a thing's name may take three lines (Bank auf dem Schulhof)
    const unitWord = (u) => B.UNITS[u][loc];
    const valueCell = (r, c) => {
      const attrs = `data-e2-record="${c}"`;
      // Batch SV: metres and centimetres on a body-measure page (G3-650)
      if (c === 'mcm') return row(freeBox(34, 34, attrs) + t(X.m, '', 'font-size:14px') + freeBox(36, 34, attrs) + t(X.cm, '', 'font-size:14px'), 2);
      // Batch SV: whole centimetres OR whole metres (G2-637): the unit printed (level 1: cm for a short thing, m for a long
      // one) or a short line where the child writes it
      if (S.whole) return row(freeBox(54, 34, attrs) + (lv.unitGiven && r ? t(B.THINGS[r.id].short ? X.cm : X.m, `data-e2-unitgiven="${B.THINGS[r.id].short ? 'cm' : 'm'}"`, 'font-size:16px') : lineBox(44, 34, `data-e2-unitline="${c}"`)), 5);
      if (!metric) return freeBox(54, 36, attrs);
      if (c === 'diff') return row(freeBox(46, 34, attrs) + t(X.cm, '', 'font-size:14px'), 2);
      // review round 1: every estimate, measurement and partner's number in "☐ m ☐ cm" (the m box stays empty under 1 m)
      return row(freeBox(34, 34, attrs) + t(X.m, '', 'font-size:14px') + freeBox(36, 34, attrs) + t(X.cm, '', 'font-size:14px'), 2);
    };
    const withCell = (r) => {
      if (metric || (lv.choose)) {
        const us = S.units;
        return row(us.map((u) => col(art(metric ? A.toolArt(B.UNITS[u].draw, 34, 20) : A.unitArt(B.UNITS[u].draw, src, ...(S.choosePx || [42, 32])), `data-e2-unitart="${u}"`) + tick(`data-e2-choose="${u}"`), 2)).join(''), metric ? 3 : 5);
      }
      const u = r ? r.unit : null;
      // Batch SV: a set may lay out the own row's units as a grid (S.ownUnitPx) and size the drawn unit (S.unitPx)
      if (!u && S.ownUnitPx) { const [ow, oh] = S.ownUnitPx; return `<div style="display:grid;grid-template-columns:repeat(2,auto);gap:1px 6px;align-items:center">` + S.units.map((uu) => row(art(A.unitArt(B.UNITS[uu].draw, src, ow, oh), `data-e2-unitart="${uu}"`) + tick(`data-e2-choose="${uu}"`), 2)).join('') + '</div>'; }
      if (!u) return row(S.units.map((uu) => col(art(A.unitArt(B.UNITS[uu].draw, src, 40, 30), `data-e2-unitart="${uu}"`) + tick(`data-e2-choose="${uu}"`), 2)).join(''), 4);
      const up = S.unitPx ? S.unitPx[d.level] : null;
      return col(art(up ? A.unitArt(B.UNITS[u].draw, src, up[0], up[1]) : d.level === 1 ? A.unitArt(B.UNITS[u].draw, src, 74, 52) : A.unitArt(B.UNITS[u].draw, src, 62, 42), `data-e2-unitart="${u}" data-e2-unit="${u}"`) + t(unitWord(u).many, '', 'font-size:13px;line-height:15px;color:' + T.inkSoft), 1);
    };
    const thingCell = (r) => {
      const dw = metric ? 52 : 60;
      if (!r) return row(box('dk-draw', dw, metric ? 40 : 48, '', 'data-dk-draw data-e2-owndraw="1"') + col(tw(S.ownKey ? X[S.ownKey] : X.own, cw.thing - dw - 18, '', 'font-size:14px;line-height:16px') + lineBox(cw.thing - dw - 18, 24), 0, 'align-items:flex-start'), 6, 'justify-content:flex-start;width:100%');
      const th = B.THINGS[r.id];
      const tp = S.thingPx ? S.thingPx[d.level] : null;   // Batch SV: a set may size the drawn thing
      if (tp) return row(art(A.thingArt(th.draw, tp[0], tp[1]), `data-e2-thingart="${r.id}"`) + tw(th[loc], cw.thing - tp[0] - 18, `data-e2-thingword="${r.id}"`, 'font-size:15px;line-height:17px'), 6, 'justify-content:flex-start;width:100%');
      return row(art(metric ? A.thingArt(th.draw, 54, 40) : d.level === 1 ? A.thingArt(th.draw, 76, 54) : A.thingArt(th.draw, 64, 46), `data-e2-thingart="${r.id}"`) + tw(th[loc], cw.thing - (metric ? 72 : d.level === 1 ? 94 : 82), `data-e2-thingword="${r.id}"`, metric ? 'font-size:14px;line-height:16px' : 'font-size:15px;line-height:17px'), 6, 'justify-content:flex-start;width:100%');
    };
    const cell = (c, inner, last) => `<div class="e2-cell" style="width:${cw[c]}px;height:${rowH}px;${last ? 'border-right:none;' : ''}${c === 'thing' ? 'justify-content:flex-start;' : ''}">${inner}</div>`;
    const header = `<div style="display:flex;border-bottom:2px solid ${T.teal}">` + cols.map((c, k) => `<div class="e2-th" style="font-size:14px;width:${cw[c]}px;${k === cols.length - 1 ? 'border-right:none' : ''}" data-e2-col="${c}">${esc(X.cols[c])}</div>`).join('') + '</div>';
    const trow = (r, k) => `<div style="display:flex;border-bottom:1.5px solid ${T.grid}" data-e2-row="${r ? r.id : 'own'}"${r && r.unit ? ` data-e2-rowunit="${r.unit}"` : ''}>` + cols.map((c, j) => cell(c, c === 'thing' ? thingCell(r) : c === 'with' ? withCell(r) : valueCell(r, c), j === cols.length - 1)).join('') + '</div>';
    void trow;
    const tableRows = rows.map((r, k) => trow(r, k)).concat([trow(null, rows.length)]).join('');
    const table = white(box('', W - 24, 'auto', header + tableRows, 'data-e2-table="1"', `border:1.5px solid ${T.grid};border-radius:6px;overflow:hidden;display:flex;flex-direction:column`), W, 'auto', '', 'padding:6px 10px;flex-shrink:0');
    let top = '', bottom = '';
    if (S.bottom === 'sort') {
      top = white(row(t(X.refsHead, '', 'color:' + T.teal + ';font-size:16px') + lv.refs.map((r) => `<span class="e2-name" data-dk-box data-e2-ref="${r}" style="background:#FFFFFF;font-family:'Nunito',sans-serif;font-weight:800;font-size:14px">${esc(B.REFS[r][loc])}</span>`).join(''), 8, 'justify-content:flex-start;flex-wrap:wrap;row-gap:4px'), W, 'auto', 'data-e2-refs="1"', 'padding:5px 12px;flex-shrink:0;justify-content:flex-start');
      // 1 m = _ cm (and more on the harder levels)
      const conv = d.level === 1 ? [['1 m', 100, 'cm']] : d.level === 2 ? [['1 m', 100, 'cm'], ['2 m', 200, 'cm']] : [['1 m', 100, 'cm'], ['1 m 50 cm', 150, 'cm'], ['300 cm', 3, 'm']];
      const convHtml = row(conv.map(([lhs, v, unit]) => row(big(lhs + ' =', '', 'font-size:20px') + ansBox(unit === 'm' ? 44 : 58, 34, v, 'data-e2-conv="1"') + t(unit, '', 'font-size:18px'), 5)).join(''), 22, 'justify-content:flex-start');
      // the pictures to connect with the cards
      const n = d.level === 1 ? 6 : 8;
      let pics;
      for (let tries = 0; ; tries++) {
        if (tries > 500) throw new Error('e2-mess: no sort pictures');
        const u = rng.next(), about = d.level === 1 ? 0 : u < 0.25 ? 0 : u < 0.75 ? 1 : 2;   // review round 1: up to two, of three
        const nShort = Math.floor((n - about) / 2) + (rng.next() < 0.5 ? 0 : (n - about) % 2), nLong = n - about - nShort;
        const sh = rng.shuffle(B.LENGTH_PICS.filter((p) => p.ans === 'short')).slice(0, nShort), lo = rng.shuffle(B.LENGTH_PICS.filter((p) => p.ans === 'long')).slice(0, nLong), ab = rng.shuffle(B.LENGTH_PICS.filter((p) => p.ans === 'about')).slice(0, about);
        pics = rng.shuffle(sh.concat(lo, ab));
        if (pics.length === n && !pics.some((p) => rows.some((r) => r.id === p.id))) break;
      }
      const cards = d.level === 1 ? ['short', 'long'] : ['short', 'about', 'long'];
      const pw = Math.floor((W - 24 - (n - 1) * 6) / n);
      const picRow = `<div class="dk-row" style="gap:6px;justify-content:space-between;width:100%">` + pics.map((p, i) => col(card(`<img class="ws-icon" src="${src(p.pic)}" alt="" data-dk-box data-e2-pic="${esc(p.pic.join('/'))}" style="width:${pw - 16}px;height:${pw - 16}px;display:block;object-fit:contain;flex-shrink:0">`, pw, pw - 4, `data-e2-sortpic="${i + 1}" data-e2-match="${p.ans}" data-e2-picid="${p.id}"`, 'padding:4px') + dot(`data-e2-leftdot="${i + 1}"`), 4)).join('') + '</div>';
      const cardRow = `<div class="dk-row" style="gap:20px;justify-content:space-around;width:100%;margin-top:${d.level === 1 ? 24 : 18}px">` + cards.map((c) => col(dot(`data-e2-rightdot="${c}"`) + `<span class="e2-name" data-dk-box data-e2-target="${c}" style="font-size:17px;line-height:26px;padding:2px 16px;background:#FFFFFF">${esc(X.cards[c])}</span>`, 4)).join('') + '</div>';
      // review round 1: "Eine Karte kann leer bleiben." on every page with three cards (printed always, so it tells nothing)
      const empty = d.level === 1 ? '' : t(X.cardEmpty, 'data-e2-cardempty="1"', 'font-size:14px;line-height:17px;color:' + T.inkSoft + ';align-self:center');
      bottom = white(col(row(head(X.meterHead, '', 'font-size:16px') + convHtml, 12, 'justify-content:flex-start') + head(d.level === 1 ? X.sortHead : X.sortHead3, '', 'font-size:16px;margin-top:4px') + picRow + cardRow + empty, 4, 'align-items:flex-start;width:100%'), W, 'auto', 'data-e2-bottom="sort"', 'padding:5px 12px 8px;flex-shrink:0;justify-content:flex-start');
    } else if (S.bottom === 'unit') {
      // Batch SV (G2-637): the pictured things, cm or m to ring for each (half of them each way, in a drawn order); level 3
      // also the conversions
      const n = lv.pics, P = B.UNIT_PICS;
      let pics;
      for (let tries = 0; ; tries++) {
        if (tries > 500) throw new Error('e2-mess: no unit pictures');
        pics = rng.shuffle(rng.shuffle(P.filter((p) => p.ans === 'cm')).slice(0, n / 2).concat(rng.shuffle(P.filter((p) => p.ans === 'm')).slice(0, n / 2)));
        if (!pics.some((p) => rows.some((r) => r.id === 'sv_' + p.id))) break;
      }
      const pw = Math.floor((W - 24 - (n - 1) * 6) / n), ip = Math.min(70, pw - 14);
      const picCard = (p, i) => card(col(`<img class="ws-icon" src="${src(p.pic)}" alt="" data-dk-box data-e2-pic="${esc(p.pic.join('/'))}" style="width:${ip}px;height:${ip}px;display:block;object-fit:contain;flex-shrink:0">` + t(p[loc], `data-e2-picword="${p.id}"`, 'font-size:14px;line-height:17px') +
        `<div class="dk-row" data-dk-item="unit${i + 1}" data-g1-one="1" style="gap:${n > 6 ? 5 : 10}px">${['cm', 'm'].map((u) => `<span class="g1-chip" data-dk-box data-e2-unitpick="${u}" data-dk-answer="${u === p.ans ? 'right' : 'no'}" style="font-size:15px;padding:1px ${n > 6 ? 6 : 10}px;border-width:2px">${u}</span>`).join('')}</div>`, 3), pw, 'auto', `data-e2-unitpic="${i + 1}" data-e2-picid="${p.id}" data-e2-ans="${p.ans}"`, 'padding:4px 2px 6px');
      const picRows = `<div class="dk-row" style="gap:6px;justify-content:space-between;width:100%">${pics.map((p, j) => picCard(p, j)).join('')}</div>`;
      const conv = lv.conv ? row(head(X.convHead, '', 'font-size:16px') + row(lv.conv.map(([lhs, v, unit]) => row(big(lhs, '', 'font-size:20px') + ansBox(unit === 'm' ? 44 : 58, 34, v, 'data-e2-conv="1"') + t(unit, '', 'font-size:18px'), 5)).join(''), 22, 'justify-content:flex-start'), 12, 'justify-content:flex-start') : '';
      bottom = white(col(head(X.unitHead, '', 'font-size:16px') + picRows + conv, 6, 'align-items:flex-start;width:100%'), W, 'auto', 'data-e2-bottom="unit"', 'padding:5px 12px 8px;flex-shrink:0;justify-content:flex-start');
    } else {
      // the comparison under the table: the Tisch in Handspannen, the child's and another child's, and whose span is bigger
      const span = unitWord(S.compare.unit).many;
      const whoseRow = row(X.whoseChoices.map((c, i) => row(tick(`data-e2-whose="${i}"`) + t(c, '', 'font-size:16px'), 5)).join(''), 22, 'justify-content:flex-start');
      // a set may give the number of writing lines for the why per level (Batch SV: lv.why); else the DE-A levels' own
      const whyN = lv.why != null ? lv.why : d.level === 1 ? 0 : d.level === 2 ? 1 : 2;
      const why = whyN === 0 ? '' : whyN === 1 ? G.kit.frameLine([X.why, 300], 34) : col(G.kit.frameLine([X.why, 300], 34) + lineBox(W - 40, 34), 0, 'align-items:flex-start');
      // Batch SV (G3-650 level 3): how the old measures go together
      const conv = lv.conv ? row(t(X.oldConvHead, '', 'font-size:16px;color:' + T.teal) + row(lv.conv.map(([lhs, v, unit]) => row(big(lhs, '', 'font-size:19px') + ansBox(46, 34, v, 'data-e2-conv="1"') + t(unit, '', 'font-size:17px'), 4)).join(''), 16, 'justify-content:flex-start'), 10, 'justify-content:flex-start;flex-wrap:wrap;row-gap:4px') : '';
      bottom = white(col(head(X.cmpHead) + row(row(t(X.mine) + freeBox(54, 36, 'data-e2-record="mine"') + t(span), 6) + row(t(X.theirs) + lineBox(130, 32) + t(':') + freeBox(54, 36, 'data-e2-record="theirs"') + t(span), 6, 'align-items:flex-end'), 30, 'justify-content:flex-start;flex-wrap:wrap') +
        (S.whoseInline ? row(t(X.whose) + whoseRow, 16, 'justify-content:flex-start;margin-top:2px') : t(X.whose, '', 'margin-top:4px') + whoseRow) + why + conv, 6, 'align-items:flex-start;width:100%'), W, 'auto', `data-e2-bottom="compare" data-e2-rule="${esc(X.rule)}"`, 'padding:6px 14px 8px;flex-shrink:0;justify-content:flex-start');
    }
    // Batch SV: what a set draws above its table — 1 cm and 10 cm at real size (G2-637); the four old body measures with
    // their old Swedish lengths (G3-650)
    if (S.top === 'realref') top = white(row(col(t(X.ref1, '', 'font-size:15px') + art(A.realBar(10), 'data-e2-realref="bar"') + t(X.ref100, 'data-e2-ref100="1"', 'font-size:19px;margin-top:4px'), 3, 'align-items:flex-start') + col(t(X.ref10, '', 'font-size:15px') + art(A.realRuler(10), 'data-e2-realref="ruler"') + (S.printNote ? t(X.printNote, 'data-e2-printnote="1"', 'font-size:12px;line-height:14px;color:' + T.inkSoft) : ''), 4, 'align-items:flex-start'),
      30, 'justify-content:flex-start;align-items:flex-start;width:100%'), W, 'auto', 'data-e2-refs="real"', 'padding:6px 14px;flex-shrink:0;justify-content:flex-start');
    if (S.top === 'bodyunits') top = white(col(t(X.oldHead, '', 'font-size:15px;color:' + T.teal) + `<div class="dk-row" style="gap:8px;justify-content:space-between;width:100%;align-items:stretch">` + S.units.map((u) => card(col(art(A.unitArt(B.UNITS[u].draw, src, 90, 42), `data-e2-oldunit="${u}"`) +
      tw(B.OLD_UNITS[u].body, 146, `data-e2-oldbody="${u}"`, 'font-size:13px;line-height:15px;text-align:center') + t(B.OLD_UNITS[u].sv, `data-e2-oldval="${u}"`, 'font-size:15px;line-height:18px'), 1), 152, 'auto', `data-e2-old="${u}"`, 'padding:3px 3px 4px;background:#FFFFFF')).join('') + '</div>', 3, 'align-items:flex-start;width:100%'),
    W, 'auto', 'data-e2-refs="old"', 'padding:5px 10px 7px;flex-shrink:0;justify-content:flex-start');
    const html = top + table + bottom;
    return { html, meta: { record: true, set: setId, rows: rows.map((r) => r.id + (r.unit ? ':' + r.unit : '')), items: rows.map((r) => r.id).concat(['own']) } };
  };
}
LOC['e2-mess-koerper'] = B.SETS.koerper.locale;
LOC['e2-mess-mcm'] = B.SETS.mcm.locale;
MODES['e2-mess-koerper'] = messMode('koerper');
MODES['e2-mess-mcm'] = messMode('mcm');
// Batch SV (2026-11-26): G2-637 Meter och centimeter, G3-650 Äldre mått (Swedish sets of the same mode)
LOC['e2-mess-cmsv'] = B.SETS.cmsv.locale;
LOC['e2-mess-aldre'] = B.SETS.aldre.locale;
MODES['e2-mess-cmsv'] = messMode('cmsv');
MODES['e2-mess-aldre'] = messMode('aldre');

/* ================================================================ G2-634 — Zum Zehner ergänzen, vom Zehner abziehen */
LOC['e2-zehner'] = 'de';
/**
 * kinds: E  a + _ = T        (a not a ten; the next ten)       verliebte Zahlen  e + _ = 10
 *        A  T − e = _        (T a ten, e 1..9)                                    10 − e = _
 *        A2 T − _ = T − e    (the missing number)                                 10 − _ = 10 − e
 *        H  a + _ = T, T + _ = 100, a + _ = 100   (two steps to the hundred; level 3)
 * Level 1: every task on its Zahlenstrahl section (from the ten below to the ten above, the start marked); levels 2-3:
 * no picture. Every blank has one value.
 */
const ZEHNER_LV = {
  1: { kinds: ['E', 'E', 'E', 'E', 'A', 'A', 'A', 'A'], line: true },
  2: { kinds: ['E', 'E', 'E', 'E', 'A', 'A', 'A', 'A2', 'A2', 'A2'], line: false },
  3: { kinds: ['E', 'E', 'A', 'A', 'A2', 'A2'], hundred: 2, line: false },
};
MODES['e2-zehner'] = (d, rng) => {
  const lv = ZEHNER_LV[d.level], X = B.TEXT.zehner;
  const tasks = [], seen = new Set();
  const order = rng.shuffle(lv.kinds.slice());
  for (const kind of order) {
    for (let tries = 0; ; tries++) {
      if (tries > 5000) throw new Error('e2-zehner: no ' + kind);
      let q;
      if (kind === 'E') { const a = rint(rng, 11, 99); if (a % 10 === 0) continue; const T10 = Math.ceil(a / 10) * 10, e = a % 10; q = { kind, a, T: T10, e, ans: T10 - a, helper: [e, '+', { box: 10 - e }, '=', 10] }; }
      else { const T10 = 10 * rint(rng, 2, 10), e = rint(rng, 1, 9); q = { kind, T: T10, e, ans: kind === 'A' ? T10 - e : e, helper: kind === 'A' ? [10, MN, e, '=', { box: 10 - e }] : [10, MN, { box: e }, '=', 10 - e] }; }
      const key = kind + (q.a || q.T) + '|' + q.e;
      // a different single digit and a different ten for every task of a kind (two tasks on the 70-80 line read as one)
      if (seen.has(key) || [...seen].some((k) => k.endsWith('|' + q.e) && k.startsWith(kind)) || tasks.some((p) => p.kind === kind && p.T === q.T)) continue;
      seen.add(key);
      tasks.push(q); break;
    }
  }
  const taskSentence = (q) => (q.kind === 'E' ? [q.a, '+', { box: q.ans, attrs: 'data-e2-z="main"' }, '=', q.T] : q.kind === 'A' ? [q.T, MN, q.e, '=', { box: q.ans, attrs: 'data-e2-z="main"' }] : [q.T, MN, { box: q.ans, attrs: 'data-e2-z="main"' }, '=', q.T - q.e]);
  const helperSentence = (q) => q.helper.map((p) => (p && typeof p === 'object' ? { box: p.box, attrs: 'data-e2-z="helper"', w: 38 } : p));
  const cwid = Math.floor((W - 12) / 2);
  const taskCard = (q, i) => card(col((lv.line ? art(A.tensLine({ from: q.kind === 'E' ? q.T - 10 : q.T - 10, mark: q.kind === 'E' ? q.a : q.T, w: 290, h: 46 }), 'data-e2-line="1"') : '') +
    row(badge(String(i + 1)) + sentence(taskSentence(q), { bw: 48, bh: 38 }), 8, 'justify-content:flex-start') + row(art(A.heart(18)) + sentence(helperSentence(q), { bw: 40, bh: 32, small: true, gap: 4 }), 6, 'justify-content:flex-start;margin-left:34px'), lv.line ? 4 : 8, 'align-items:flex-start;width:100%;justify-content:center;height:100%'),
  cwid, 'auto', `data-e2-zcard="${i + 1}" data-e2-zkind="${q.kind}" data-e2-zt="${q.T}" data-e2-ze="${q.e}"${q.a ? ` data-e2-za="${q.a}"` : ''}`, 'flex:1 1 0;min-height:0;padding:4px 10px');
  const rowsHtml = [];
  for (let k = 0; k < tasks.length; k += 2) rowsHtml.push(`<div class="dk-row" style="gap:12px;flex:1 1 0;min-height:0;align-items:stretch">${taskCard(tasks[k], k)}${taskCard(tasks[k + 1], k + 1)}</div>`);
  let hundred = '';
  const hTasks = [];
  if (lv.hundred) {
    for (let k = 0; k < lv.hundred; k++) for (let tries = 0; ; tries++) {
      const a = rint(rng, 11, 89); if (a % 10 === 0 || hTasks.some((h) => h.a === a || h.a % 10 === a % 10)) continue;
      const T10 = Math.ceil(a / 10) * 10; if (T10 === 100) continue;
      hTasks.push({ a, T: T10 }); break;
    }
    const hc = hTasks.map((h, i) => white(col(sentence([h.a, '+', { box: h.T - h.a, attrs: 'data-e2-h="1"' }, '=', h.T], { bw: 46, bh: 34, small: true }) + sentence([h.T, '+', { box: 100 - h.T, attrs: 'data-e2-h="2"' }, '=', 100], { bw: 46, bh: 34, small: true }) + row(t(X.so, '', 'font-size:16px') + sentence([h.a, '+', { box: 100 - h.a, attrs: 'data-e2-h="3"' }, '=', 100], { bw: 46, bh: 34, small: true }), 8, 'justify-content:flex-start'), 4, 'align-items:flex-start'),
      cwid, 'auto', `data-e2-hundred="${i + 1}" data-e2-ha="${h.a}"`, 'padding:5px 12px;justify-content:flex-start')).join('');
    hundred = col(head(X.hundredHead) + `<div class="dk-row" style="gap:12px;align-items:stretch;width:100%">${hc}</div>`, 3, 'align-items:flex-start;width:100%;flex-shrink:0');
  }
  const headTxt = d.level === 1 ? X.headMix : X.headMix;
  const html = head(headTxt) + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:9px">${rowsHtml.join('')}</div>` + hundred;
  return { html, meta: { tasks: tasks.map((q) => (q.kind === 'E' ? `${q.a}+[${q.ans}]=${q.T}` : q.kind === 'A' ? `${q.T}-${q.e}=[${q.ans}]` : `${q.T}-[${q.ans}]=${q.T - q.e}`)), hundred: hTasks.map((h) => h.a), items: tasks.map((q) => q.kind + ':' + q.e) } };
};

/* ================================================================ G2-635 — Rechenwege vergleichen: schrittweise oder mit Hilfsaufgabe? */
LOC['e2-wege2'] = 'de';
/**
 * The anchor a + b: a ends in 9 (19 .. 59), b two-digit with 3 .. 6 ones, sum ≤ 99. The three ways (the designer's):
 *   schritt  schrittweise: a + Z(b) = s1, s1 + E(b) = sum
 *   stellen  Zehner und Einer extra: Z(a) + Z(b) = z, E(a) + E(b) = e, z + e = sum
 *   hilfs    Hilfsaufgabe: (a + 1) + b = h, h − 1 = sum
 * The fourth child's way has ONE mistake, a typical one, the rest computed right from it:
 *   a ten lost in a step that carries a ten (schritt step 1 or 2, stellen step 1 or 3, hilfs step 1),
 *   the Zehner-und-Einer middle step um eins verzählt (9 + 5 = 13: a ten lost there would leave a one-digit sum, a surface
 *   that only a wrong step would carry), or
 *   the Hilfsaufgabe corrected the wrong way (hilfs step 2: + 1 instead of − 1).
 * Which way and which step are drawn so that the wrong step's place (first, middle, last) tells nothing (the gate measures
 * it over the seeds).
 */
const WEGE2_LV = {
  1: { same: true, recompute: 'steps', hilfs: [['+', 9], ['+', 9]], signBlank: false, amountBlank: false, nOwn: 1 },
  2: { same: false, recompute: 'steps', hilfs: [['+', 9], [MN, 9]], signBlank: true, amountBlank: false, nOwn: 2 },
  3: { same: false, recompute: 'blank', hilfs: [['+', 8], [MN, 8]], signBlank: true, amountBlank: true, nOwn: 2 },
};
const ERRORS = [['schritt', 1], ['schritt', 2], ['stellen', 1], ['stellen', 2], ['stellen', 3], ['hilfs', 1], ['hilfs', 2]];
/** the kind of each mistake: a ten lost; the Zehner-und-Einer middle step um eins verzählt (a ten lost there would show a
 *  one-digit sum, a surface no right step has); the Hilfsaufgabe corrected the wrong way */
const ERROR_KIND = (w, s) => (w === 'hilfs' && s === 2 ? 'direction' : w === 'stellen' && s === 2 ? 'off-by-one' : 'ten-lost');
/** the steps of a way for a + b: [x, op, y, z] (z = what the child wrote); `err` = the step (1-based) with the mistake */
function wege2Steps(way, a, b, err = 0) {
  const Za = Math.floor(a / 10) * 10, Ea = a % 10, Zb = Math.floor(b / 10) * 10, Eb = b % 10;
  const steps = [];
  if (way === 'schritt') {
    let s1 = a + Zb; if (err === 1) s1 -= 10;
    steps.push([a, '+', Zb, s1]);
    let s2 = s1 + Eb; if (err === 2) s2 -= 10;
    steps.push([s1, '+', Eb, s2]);
  } else if (way === 'stellen') {
    let z = Za + Zb; if (err === 1) z -= 10;
    steps.push([Za, '+', Zb, z]);
    let e = Ea + Eb; if (err === 2) e += (a + b) % 2 ? -1 : 1;   // um eins verzählt (9 + 5 = 13 or 15)
    steps.push([Ea, '+', Eb, e]);
    let s = z + e; if (err === 3) s -= 10;
    steps.push([z, '+', e, s]);
  } else {
    let h = a + 1 + b; if (err === 1) h -= 10;
    steps.push([a + 1, '+', b, h]);
    steps.push(err === 2 ? [h, '+', 1, h + 1] : [h, MN, 1, h - 1]);
  }
  return steps;
}
/** every way a Klasse-2 child may write for x o y (open items' key; all right when the steps are right) */
function wege2Key(x, o, y) {
  const r = o === '+' ? x + y : x - y, Zy = Math.floor(y / 10) * 10, Ey = y % 10, up = Math.ceil(y / 10) * 10, dn = up - y;
  const w = [];
  if (o === '+') {
    w.push(`schrittweise: ${x} + ${Zy} = ${x + Zy}, ${x + Zy} + ${Ey} = ${r}`);
    w.push(`Zehner und Einer extra: ${Math.floor(x / 10) * 10} + ${Zy} = ${Math.floor(x / 10) * 10 + Zy}, ${x % 10} + ${Ey} = ${x % 10 + Ey}, zusammen ${r}`);
    if (dn) w.push(`Hilfsaufgabe: ${x} + ${up} = ${x + up}, ${x + up} − ${dn} = ${r}`);
    if (x % 10 >= 8) w.push(`Hilfsaufgabe mit der ersten Zahl: ${Math.ceil(x / 10) * 10} + ${y} = ${Math.ceil(x / 10) * 10 + y}, ${Math.ceil(x / 10) * 10 + y} − ${Math.ceil(x / 10) * 10 - x} = ${r}`);
    w.push(`erst bis zum Zehner: ${x} + ${Math.ceil(x / 10) * 10 - x} = ${Math.ceil(x / 10) * 10}, dann der Rest`);
  } else {
    w.push(`schrittweise: ${x} − ${Zy} = ${x - Zy}, ${x - Zy} − ${Ey} = ${r}`);
    if (dn) w.push(`Hilfsaufgabe: ${x} − ${up} = ${x - up}, ${x - up} + ${dn} = ${r}`);
    w.push(`ergänzen: ${y} + ${r} = ${x}`);
    if (dn) w.push(`gleichsinnig verändern: ${x + dn} − ${up} = ${r}`);
  }
  return `${x} ${o} ${y} = ${r}. Jeder Weg mit richtigen Schritten ist richtig: ${w.join(' · ')}.`;
}
MODES['e2-wege2'] = (d, rng) => {
  const lv = WEGE2_LV[d.level], X = B.TEXT.wege2;
  // b's ones 3 .. 6: 9 + them crosses the ten with ones left over (39 + 25: 9 + 5 = 14), so every way has a ten to carry
  const anchor = () => { for (;;) { const a = 10 * rint(rng, 1, 5) + 9, b = 10 * rint(rng, 1, 4) + rint(rng, 3, 6); if (a + b <= 99) return [a, b]; } };
  const [a, b] = anchor();
  const ways = rng.shuffle(['schritt', 'stellen', 'hilfs']);
  const cast = kids(4, rng);
  const who = Object.fromEntries(ways.map((w, i) => [w, cast[i]]));
  // the way in the bubble (Zehner und Einer extra in two lines: "30 + 20" / "und 9 + 5")
  const chainOf = (w, x, y) => (w === 'schritt' ? [`${x} + ${Math.floor(y / 10) * 10} + ${y % 10}`] : w === 'stellen' ? [`${Math.floor(x / 10) * 10} + ${Math.floor(y / 10) * 10}`, `${X.and} ${x % 10} + ${y % 10}`] : [`${x + 1} + ${y} ${MN} 1`]);
  // 1. the three ways, recomputed
  const recompute = (w) => {
    const st = wege2Steps(w, a, b);
    // level 3 (review round 1): the steps with every number left out (the Hilfsaufgabe's "− 1" printed), so the child
    // follows each child's way, in the order of its bubble
    // review round 2: a "+" step written as its Tauschaufgabe is right too (data-e2-alt on the step's first box)
    if (lv.recompute === 'blank') return col(st.map(([x, o, y, z], k) => sentence([{ box: x, attrs: `data-e2-re="${w}${k + 1}x"` + (o === '+' ? ` data-e2-alt="${y} + ${x} = ${z}"` : ''), w: 38 }, o, w === 'hilfs' && k === 1 ? y : { box: y, attrs: `data-e2-re="${w}${k + 1}y"`, w: 38 }, '=', { box: z, attrs: `data-e2-re="${w}${k + 1}"`, w: 40 }], { bh: 30, small: true, gap: 3 })).join(''), 3, 'align-items:flex-start');
    return col(st.map(([x, o, y, z], k) => {
      const carried = (w === 'schritt' && k === 1) || (w === 'hilfs' && k === 1) ? { box: x, attrs: `data-e2-re="${w}${k + 1}a"` } : (w === 'stellen' && k === 2) ? { box: x, attrs: `data-e2-re="${w}${k + 1}a"` } : x;
      const second = w === 'stellen' && k === 2 ? { box: y, attrs: `data-e2-re="${w}${k + 1}b"` } : y;
      return sentence([carried, o, second, '=', { box: z, attrs: `data-e2-re="${w}${k + 1}"` }], { bw: 40, bh: 30, small: true, gap: 3 });
    }).join(''), 3, 'align-items:flex-start');
  };
  const aCards = ways.map((w) => card(col(talking(who[w], X.ways[w].map((l, k) => t(l, k ? '' : `data-e2-wayline="${w}"`, 'font-size:13px;line-height:16px')).join('') + chainOf(w, a, b).map((c, k) => t(c, k ? '' : `data-e2-waychain="${w}"`, 'font-size:18px;line-height:21px', 'e2-chain')).join(''), 140, 62) + recompute(w), 5, 'align-items:flex-start;width:100%'),
    Math.floor((W - 16) / 3), 'auto', `data-e2-way="${w}" data-e2-who="${esc(who[w].name)}"`, 'padding:5px 6px;justify-content:flex-start;align-items:flex-start')).join('');
  const partA = col(row(head(X.headA) + big(`${a} + ${b}`, 'data-e2-anchor="1"', 'font-size:21px;line-height:22px'), 8, 'justify-content:flex-start;align-items:baseline') + `<div class="dk-row" style="gap:8px;align-items:stretch;width:100%">${aCards}</div>`, 3, 'align-items:flex-start;width:100%');
  // 2. the fourth child's way with one mistake
  const [ew, es] = rng.pick(ERRORS);
  let fa = a, fb = b;
  if (!lv.same) for (;;) { const x = 10 * rint(rng, 1, 5) + 9, y = 10 * rint(rng, 1, 4) + rint(rng, 3, 6); if (x + y <= 99 && (x !== a || y !== b)) { fa = x; fb = y; break; } }
  const wrong = wege2Steps(ew, fa, fb, es), right = wege2Steps(ew, fa, fb);
  const fourth = cast[3];
  const stepLines = wrong.map(([x, o, y, z], k) => row(`<span class="e2-tick" data-dk-box data-e2-errstep="${k + 1}" data-dk-answer="${k + 1 === es ? 'right' : 'no'}"></span>` + big(`${x} ${o} ${y} = ${z}`, '', 'font-size:20px;line-height:24px'), 8, 'justify-content:flex-start')).join('');
  const fix = right[es - 1];
  const bubbleB = X.ways[ew].map((l, k) => t(l, k ? '' : `data-e2-wayline="${ew}"`, 'font-size:14px;line-height:17px')).join('') + t(`${fa} + ${fb}`, '', 'font-size:18px;line-height:22px', 'e2-chain');
  const partB = col(head(X.headB.replace('{name}', fourth.name)) + t(X.headB2, 'data-e2-errquestion="1"', 'font-size:16px;line-height:19px;color:' + T.teal) +
    white(row(talking(fourth, bubbleB, 206, 64) + col(`<div class="dk-row" data-g1-one="1" data-dk-item="errstep" style="flex-direction:column;align-items:flex-start;gap:5px">${stepLines}</div>`, 0, 'align-items:flex-start') +
      col(t(X.fixLine, '', 'font-size:15px') + lineBox(190, 32) + row(t(X.result, '', 'font-size:15px') + ansBox(52, 32, fa + fb, 'data-e2-fixresult="1"'), 6, 'justify-content:flex-start'), 4, 'align-items:flex-start;margin-left:auto'), 12, 'justify-content:flex-start;align-items:center;width:100%'),
    W, 'auto', `data-e2-errway="${ew}" data-e2-errstep-at="${es}" data-e2-errof="${wrong.length}" data-e2-fix="${esc(fix[0] + ' ' + fix[1] + ' ' + fix[2] + ' = ' + fix[3])}" data-e2-fa="${fa}" data-e2-fb="${fb}"`, 'padding:5px 10px;justify-content:flex-start'), 3, 'align-items:flex-start;width:100%');
  // 3. with the Hilfsaufgabe
  const hTasks = [];
  for (const [o, ones] of lv.hilfs) for (;;) {
    const y = 10 * rint(rng, 1, 4) + (d.level === 3 ? rng.pick([8, 9]) : ones), x = o === '+' ? rint(rng, 21, 99 - y) : rint(rng, y + 11, 98);
    if (x % 10 === 0 || (o === '+' && x + y > 99) || hTasks.some((h) => h.x === x || h.y === y) || x === a || x === fa) continue;   // two different second numbers
    if (o === MN && (x % 10) >= (y % 10)) continue;   // the minus tasks cross a ten (where the Hilfsaufgabe helps)
    if (o === '+' && (x % 10) + (y % 10) < 10) continue;
    hTasks.push({ x, o, y }); break;
  }
  const hCards = hTasks.map((h, i) => {
    const up = Math.ceil(h.y / 10) * 10, dn = up - h.y, r1 = h.o === '+' ? h.x + up : h.x - up, res = h.o === '+' ? h.x + h.y : h.x - h.y, back = h.o === '+' ? MN : '+';
    const step2 = [{ box: r1, attrs: 'data-e2-hs="2a"', w: 46 }, lv.signBlank ? { box: back, attrs: 'data-e2-hs="sign"', w: 34 } : back, lv.amountBlank ? { box: dn, attrs: 'data-e2-hs="amount"', w: 34 } : dn, '=', { box: res, attrs: 'data-e2-hs="2"', w: 46 }];
    return white(col(row(big(`${h.x} ${h.o} ${h.y} =`, '', 'font-size:21px') + ansBox(52, 32, res, 'data-e2-hs="res"'), 6, 'justify-content:flex-start') +
      row(t(X.helper, '', 'font-size:15px;color:' + T.teal) + sentence([h.x, h.o, up, '=', { box: r1, attrs: 'data-e2-hs="1"', w: 46 }], { bh: 30, small: true, gap: 3 }), 6, 'justify-content:flex-start') +
      sentence(step2, { bh: 30, small: true, gap: 3, style: 'margin-left:104px' }), 4, 'align-items:flex-start'),
    Math.floor((W - 12) / 2), 'auto', `data-e2-hilfs="${i + 1}" data-e2-hx="${h.x}" data-e2-ho="${h.o === '+' ? 'plus' : 'minus'}" data-e2-hy="${h.y}"${h.o === '+' ? '' : ` data-e2-alt="${esc(`${dn} + ${r1} = ${res}`)}"`}`, 'padding:5px 10px;justify-content:flex-start');
  }).join('');
  const partC = col(head(X.headC) + `<div class="dk-row" style="gap:12px;align-items:stretch;width:100%">${hCards}</div>`, 3, 'align-items:flex-start;width:100%');
  // 4. the child's own way (open)
  const own = [];
  for (let k = 0; k < lv.nOwn; k++) for (;;) {
    const o = k === 1 ? MN : '+', y = 10 * rint(rng, 1, 3) + rint(rng, 3, 9), x = o === '+' ? rint(rng, 21, 99 - y) : rint(rng, y + 12, 95);
    if (x % 10 === 0 || (o === '+' && (x % 10) + (y % 10) < 10) || (o === MN && (x % 10) >= (y % 10)) || own.some((q) => q.x === x)) continue;
    own.push({ x, o, y }); break;
  }
  const ownCards = own.map((q) => white(col(big(`${q.x} ${q.o} ${q.y} =`, '', 'font-size:21px') + lineBox(lv.nOwn === 1 ? W - 50 : 290, 30) + lineBox(lv.nOwn === 1 ? W - 50 : 290, 30), 0, 'align-items:flex-start'),
    lv.nOwn === 1 ? W : Math.floor((W - 12) / 2), 'auto', `data-e2-open="1" data-e2-key="${esc(wege2Key(q.x, q.o, q.y))}" data-e2-owntask="${q.x}${q.o === '+' ? '+' : '-'}${q.y}"`, 'padding:4px 10px;justify-content:flex-start')).join('');
  const partD = col(head(X.headD) + `<div class="dk-row" style="gap:12px;align-items:stretch;width:100%">${ownCards}</div>`, 3, 'align-items:flex-start;width:100%');
  const html = partA + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${partB}${partC}${partD}</div>`;
  return {
    html,
    meta: {
      anchor: `${a}+${b}`, ways: ways.map((w) => w + ':' + who[w].name), error: `${ew}#${es}/${wrong.length}:${fa}+${fb}`,
      hilfs: hTasks.map((h) => `${h.x}${h.o === '+' ? '+' : '-'}${h.y}`), own: own.map((q) => `${q.x}${q.o === '+' ? '+' : '-'}${q.y}`),
      items: [ew + '#' + es].concat(hTasks.map((h) => (h.o === '+' ? 'plus' : 'minus'))),
    },
  };
};

/* ================================================================ the page check */
/** per mode: what the rendered page must hold (each check proves it found something to judge) */
function e2VerifyInPage() {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no e2 root'];
  const mode = R.dataset.dk;
  const rect = (e) => e.getBoundingClientRect();
  const num = (e) => Number(e.dataset.e2Answer);
  // every box a child writes in is big enough (at least 28 px tall and 30 px wide; a number box at least 34 px wide)
  const boxes = [...R.querySelectorAll('.ws-blankbox')];
  if (!boxes.length) f.push('no box to write in');
  boxes.forEach((b) => { const r = rect(b); if (r.height < 27.5 || r.width < 29.5) f.push(`a box ${Math.round(r.width)}x${Math.round(r.height)} px`); });
  // a line to draw: every left item has its dot, every answer is one of the targets, and the targets are distinct
  const lefts = [...R.querySelectorAll('[data-e2-match]')], targets = [...R.querySelectorAll('[data-e2-target]')].map((e) => e.dataset.e2Target);
  if (lefts.length && new Set(targets).size !== targets.length) f.push('two targets with one key');
  lefts.forEach((l) => { if (!targets.includes(l.dataset.e2Match)) f.push(`a line to draw has no target "${l.dataset.e2Match}"`); });
  // open items carry their key; record boxes carry no answer
  R.querySelectorAll('[data-e2-open][data-e2-key]').forEach((o) => { if (!/Jeder Weg mit richtigen Schritten ist richtig/.test(o.dataset.e2Key)) f.push('an open item without its key'); if (o.querySelector('[data-e2-answer]')) f.push('an open item carries a stamped answer'); });
  R.querySelectorAll('[data-e2-record]').forEach((b) => { if (b.hasAttribute('data-e2-answer')) f.push('a measurement box carries an answer'); });
  if (mode === 'e2-null') {
    const cards = [...R.querySelectorAll('[data-e2-storycard]')];
    if (cards.length !== 4) f.push(`${cards.length} stories`);
    cards.forEach((c) => {
      const kind = c.dataset.e2Kind, n = +c.dataset.e2N, k = +c.dataset.e2K;
      const p1 = c.querySelector('[data-e2-panel="1"]'), p2 = c.querySelector('[data-e2-panel="2"]');
      const cnt = (p, s) => p.querySelectorAll(`[data-e2-thing="${s}"]`).length;
      if (cnt(p1, 'stays') !== n || cnt(p1, 'crossed') || cnt(p1, 'arrives')) f.push(`story ${c.dataset.e2Storycard}: the first picture does not show ${n}`);
      const plus = kind.startsWith('plus');
      if (plus ? cnt(p2, 'stays') !== n || cnt(p2, 'arrives') !== k || cnt(p2, 'crossed') : cnt(p2, 'stays') + cnt(p2, 'crossed') !== n || cnt(p2, 'crossed') !== k || cnt(p2, 'arrives')) f.push(`story ${c.dataset.e2Storycard}: the second picture does not show ${kind}`);
      if (p2.querySelectorAll('[data-e2-cross]').length !== cnt(p2, 'crossed')) f.push(`story ${c.dataset.e2Storycard}: crosses`);
      // the arrow that says "es kommen dazu": over the things that come, and only on a story where some come
      const ar = p2.querySelector('[data-e2-comes]');
      if (!!ar !== cnt(p2, 'arrives') > 0) f.push(`story ${c.dataset.e2Storycard}: ${ar ? 'an arrow with nothing coming' : 'things come without the arrow'}`);
      else if (ar) { const ab = rect(ar), cs = [...p2.querySelectorAll('[data-e2-thing="arrives"]')].map(rect); const gl = Math.min(...cs.map((r) => r.left)), gr = Math.max(...cs.map((r) => r.right)), gt = Math.min(...cs.map((r) => r.top)); if (ab.bottom > gt + 8 || ab.right < gl || ab.left > gr + 12) f.push(`story ${c.dataset.e2Storycard}: the arrow does not point at the things that come`); }
      const v = ['n', 'k', 'z'].map((x) => c.querySelector(`[data-e2-story="${x}"]`)).map((e) => (e ? num(e) : NaN));
      if (v[0] !== n || v[1] !== k || v[2] !== (plus ? n + k : n - k)) f.push(`story ${c.dataset.e2Storycard}: the boxes are not ${n}, ${k}`);
      const op = [...c.querySelectorAll('.e2-op')].map((e) => e.textContent).join('');
      if (op !== (plus ? '+=' : '−=')) f.push(`story ${c.dataset.e2Storycard}: the operator printed is "${op}"`);
      // the pictures as big as a Klasse-1 child counts them (at least 18 px)
      [p1, p2].forEach((p) => p.querySelectorAll('[data-e2-thing]').forEach((im) => { if (rect(im).width < 17.5) f.push(`story ${c.dataset.e2Storycard}: a picture ${Math.round(rect(im).width)} px`); }));
      // review round 1: things never overlap (each in its own place: a child counts and crosses out each one)
      [p1, p2].forEach((p) => { const r = [...p.querySelectorAll('[data-e2-thing]')].map(rect); r.forEach((a, i) => r.forEach((b2, j) => { if (j <= i) return; const ox = Math.min(a.right, b2.right) - Math.max(a.left, b2.left), oy = Math.min(a.bottom, b2.bottom) - Math.max(a.top, b2.top); if (ox > 0.5 && oy > 0.5) f.push(`story ${c.dataset.e2Storycard}: two pictures cover each other`); })); });
    });
    const tasks = [...R.querySelectorAll('[data-e2-task]')];
    if (tasks.length !== 12) f.push(`${tasks.length} tasks`);
  }
  if (mode === 'e2-wege1' || mode === 'e2-wege2') {
    const wayCards = [...R.querySelectorAll('[data-e2-way]')];
    if (wayCards.length !== 3) f.push(`${wayCards.length} children's ways`);
    // every child drawn, with its name under it and a bubble beside it; the bubble's tail at the bubble
    R.querySelectorAll('[data-e2-bubble]').forEach((bb) => { const kid = R.querySelector(`[data-e2-kid="${bb.dataset.e2Bubble}"]`); if (!kid) f.push(`a bubble without its child (${bb.dataset.e2Bubble})`); else if (rect(kid).right > rect(bb).left + 2) f.push(`${bb.dataset.e2Bubble}: the bubble covers the child`); });
    const names = [...R.querySelectorAll('[data-e2-name]')].map((e) => e.dataset.e2Name);
    if (new Set(names).size !== names.length) f.push('two children with one name');
    const skins = [...R.querySelectorAll('[data-e2-art="child"]')].map((e) => e.dataset.e2Skin);
    if (new Set(skins).size < Math.min(3, skins.length)) f.push('the children all look alike');
  }
  if (mode === 'e2-wege2') {
    const card = R.querySelector('[data-e2-errway]');
    if (!card) f.push('no way with a mistake');
    else if (card.querySelectorAll('[data-e2-errstep]').length !== +card.dataset.e2Errof) f.push('the mistake card lacks a step');
  }
  if (mode === 'e2-mess') {
    const tb = R.querySelector('[data-e2-table]');
    if (!tb) return f.concat('no table');
    const rows = [...tb.querySelectorAll('[data-e2-row]')];
    if (rows.length < 5) f.push(`${rows.length} table rows`);
    if (!tb.querySelector('[data-e2-row="own"]')) f.push('no row for a thing the child chooses');
    rows.forEach((r) => { const cells = [...r.children]; const hc = [...tb.querySelectorAll('[data-e2-col]')]; if (cells.length !== hc.length) f.push('a row with a missing column'); cells.forEach((c, i) => { if (hc[i] && Math.abs(rect(c).left - rect(hc[i]).left) > 1.5) f.push('a column out of line'); }); });
    R.querySelectorAll('[data-e2-record]').forEach((b) => { const r = rect(b); if (r.width < 33) f.push(`a measuring box ${Math.round(r.width)} px wide`); });
    // a thing's name stays inside its cell (a long word runs under the next column, where the table clips it): its
    // content measured, not its box (a hyphenated piece may pass the box by a few px inside the cell's padding)
    R.querySelectorAll('[data-e2-thingword]').forEach((w) => { const cell = w.closest('.e2-cell'); if (cell && rect(w).left + w.scrollWidth > rect(cell).right - 1) f.push(`the name "${w.textContent.replace(/\u00ad/g, '')}" runs out of its cell`); });
  }
  return f;
}

/** makeE2Type({ id, slug, mode, exerciseType, gradeBand, i18n }) */
function makeE2Type({ id, slug, mode, exerciseType, gradeBand, i18n }) {
  if (!MODES[mode]) throw new Error('e2-math: unknown mode ' + mode);
  const only = LOC[mode];
  const pageMode = mode.startsWith('e2-mess') ? 'e2-mess' : mode;
  return {
    id, slug, gradeBand, assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    onlyLocales: [only],
    difficulty: { 1: {}, 2: {}, 3: {} },
    i18n,
    e2Mode: mode,
    build({ difficulty: lv, locale }, ctx) {
      const L = String(locale || 'en').slice(0, 2);
      if (L !== only) throw new Error(`${id}: printed in ${only} only (no ${locale} page; the type teaches a ${only === 'sv' ? 'Swedish' : 'German'} lesson)`);
      const d = { level: Number(lv) || 2 };
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${DK.CSS}${E2CSS}</style><div class="dk-root" data-ws-content data-dk="${pageMode}" data-e2-mode="${mode}" data-e2-level="${d.level}" data-e2-locale="${only}" data-dk-record="${out.meta.record ? 1 : 0}">${out.html}</div>`,
        meta: { mode, level: d.level, ...out.meta },
      };
    },
    // a copy is told apart by what it ASKS: the task shapes of items plus the tasks, stories and worked chains themselves
    // (with shapes alone, two pages of different sums counted as one page and a level kept a single copy, 2026-11-26)
    levelSetWords(meta) { return [].concat(meta.items || [], meta.stories || [], meta.tasks || [], meta.partB || [], meta.own || [], meta.anchor ? [meta.anchor] : [], meta.error ? [meta.error] : [], meta.hilfs || []).map(String); },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(G.g1VerifyInPage), await page.evaluate(e2VerifyInPage));
    },
  };
}

module.exports = { makeE2Type, MODES, LOC, e2VerifyInPage, NULL_LV, nullParts, nullCaption, WEGE1_LV, wege1Chains, identPool, wege1Key, ZEHNER_LV, WEGE2_LV, ERRORS, ERROR_KIND, wege2Steps, wege2Key, messMode };
