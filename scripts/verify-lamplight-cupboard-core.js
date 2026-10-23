#!/usr/bin/env node
/* =====================================================================
   verify-lamplight-cupboard-core.js — the build gate of ACTIVITY #80, The
   Lamplight Cupboard (Sock & Shadow, SL.K.6). It keeps its OWN ground truth —
   its own matcher (which word fits which thing), its own list of which
   rounds need a detail, the reason → picture tables, and a phrase table per
   locale — and never reads an expectation off the core. It proves:
     (a) the lamps: for every Level-1 round, under EVERY legal deal (mirror ×
         every column order that keeps the side-by-side pairs), the core's
         lit set equals the gate's matcher for every word set of up to three
         words (exhaustive);
     (b) one clear target: under every legal deal the target alone can be
         lit with at most 2 words (so a memory of 2 still solves it), the
         noun alone is ambiguous in the detail rounds, and no other thing has
         a 1-word phrase that ALSO picks out the target's twin;
     (c) Check: ok IFF exactly the target is lit; two or more lit = jam,
         none = none, one wrong = wrong, a word beyond memory = overflow
         (the FIRST word rolls off) — every word set of every round;
     (d) feelings: ok IFF the face is Sock's feeling and the reason is the
         event's; no feeling = noFeel, no reason = noWhy (all three helps
         lit); every round's face set holds the feeling once, its reason
         cards the reason once, its helps the reason's help once;
     (e) the deal: Level 1 opens with rounds 0 and 1, never the same target
         cubby twice running, 4–5 targets on the top shelf, a pass never
         repeats the previous order; Level 2 face and help positions
         balanced (3/3/2);
     (f) the phrases: every locale's phrase for every round has no missing
         word, starts with a capital, and matches the gate's phrase table;
     (g) every picture exists, no black-and-white theme; the picture floor
         (96 px wide, 64 px phone).
   Usage: node scripts/verify-lamplight-cupboard-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const MT = path.join(__dirname, '..', 'mini tools');
const C = require(path.join(process.env.LC_CORE_DIR || MT, 'lamplight-cupboard-core.js'));   /* LC_CORE_DIR: the mutation harness points this at a mutated copy */
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---- the gate's own truth ---- */
const DETAIL_ROUNDS = [2, 3, 4, 5, 6, 7, 8];   /* the noun alone lights two or more */
const HELP = { rain: 'umbrella', dark: 'lamp', late: 'pillow', sick: 'tissue', birthday: 'cake', sunny: 'kite', cold: 'scarf' };
const EVENT = { rain: 'rainy', dark: 'moon', late: 'clock', sick: 'thermometer', birthday: 'present', sunny: 'sunny', cold: 'snowflake' };
const FEEL = [['sad', 'rain'], ['scared', 'dark'], ['tired', 'late'], ['sad', 'sick'], ['happy', 'birthday'], ['happy', 'sunny'], ['sad', 'cold'], ['surprised', 'birthday']];
function mine(r, t, w) {   /* the gate's matcher */
  const [c, k] = [w[0], w.slice(2)];
  if (c === 'n') return t.noun === k;
  if (c === 's') return (k === 'big') === (t.size === 'B');
  if (c === 'h') return (k === 'top') === (t.shelf === 'T');
  if (c === 'x') return r.things.some(o => o.i !== t.i && o.shelf === t.shelf && (o.col === t.col - 1 || o.col === t.col + 1) && o.noun === k);
  return true;
}
const litMine = (r, ws) => r.things.filter(t => ws.every(w => mine(r, t, w))).map(t => t.i);
const subsets = (a, max) => { const out = []; for (let m = 1; m < (1 << a.length); m++) { const s = a.filter((x, b) => m & (1 << b)); if (s.length <= max && new Set(s.map(w => w[0])).size === s.length) out.push(s); } return out; };
const perms = a => a.length < 2 ? [a.slice()] : a.flatMap((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).map(p => [x].concat(p)));
function legalLays(idx) {   /* every mirror × column order that keeps the pairs side by side */
  const x = C.DATA.L1[idx], top = [], bot = [], out = [];
  x.things.forEach((t, i) => (t[2] === 'T' ? top : bot).push(i));
  for (const pt of perms([0, 1, 2])) for (const pb of perms([0, 1, 2])) {
    const cols = []; top.forEach((i, k) => { cols[i] = pt[k]; }); bot.forEach((i, k) => { cols[i] = pb[k]; });
    if ((x.pairs || []).some(p => Math.abs(cols[p[0]] - cols[p[1]]) !== 1)) continue;
    const key = cols.join();
    if (out.some(o => o.cols.join() === key)) continue;
    out.push({ mirror: false, cols }); out.push({ mirror: true, cols });
  }
  return out;
}

/* (a)–(c) Level 1 */
const L1N = C.DATA.L1.length;
is(L1N >= 7, 'level 1 has at least 7 rounds (' + L1N + ')');
for (let idx = 0; idx < L1N; idx++) {
  const lays = legalLays(idx);
  is(lays.length >= 2, `l1.${idx}: has legal deals`);
  for (const lay of lays) {
    const r = C.round('l1', idx, lay), ws = r.chips.concat(r.say), tag = `l1.${idx} ${lay.mirror ? 'M' : ''}${lay.cols.join('')}`;
    is(r.things.length === C.DATA.L1[idx].things.length && r.things.every(t => t.col >= 0 && t.col <= 2), tag + ': things placed');
    is(new Set(r.things.map(C.cubby)).size === r.things.length, tag + ': one thing per cubby');
    is(r.say.length === new Set(r.things.map(t => t.noun)).size && r.say.every(w => w[0] === 'n'), tag + ': every noun sayable once');
    is(r.chips.every(w => 'shx'.indexOf(w[0]) >= 0), tag + ': the tray holds only detail words');
    let best = 9;
    for (const s of subsets(ws, 3)) {
      const want = litMine(r, s), got = C.litSet(r, s);
      is(want.join() === got.join(), `${tag} [${s}]: lit ${got} but the gate says ${want}`);
      if (want.length === 1 && want[0] === r.target) best = Math.min(best, s.length);
    }
    is(best <= 2, `${tag}: the target can be lit alone with ≤2 words (best ${best})`);
    is(C.shortest(r) === best, `${tag}: shortest() ${C.shortest(r)} = gate ${best}`);
    const noun = 'n:' + r.things[r.target].noun;
    is(DETAIL_ROUNDS.includes(idx) === (litMine(r, [noun]).length > 1), `${tag}: noun alone ${DETAIL_ROUNDS.includes(idx) ? 'must be' : 'must not be'} ambiguous`);
    /* (c) Check over every word set up to 4 words at memory 3 and 2 */
    for (const mem of ['3', '2']) for (const s of subsets(ws, 4)) {
      const st = C.newState(r, mem, 'live');
      s.forEach(w => C.addWord(st, w));
      const res = C.check(st), m = +mem, kept = s.slice(Math.max(0, s.length - m)), L = litMine(r, kept);
      const want = L.length === 1 && L[0] === r.target ? 'ok' : s.length > m ? 'overflow' : L.length > 1 ? 'jam' : L.length === 0 ? 'none' : 'wrong';
      const got = res.ok ? 'ok' : st.last.reason;
      if (want !== got) is(false, `${tag} mem ${mem} [${s}]: check ${got}, gate ${want}`); else PASS++;
      if (s.length > m) is(st.dropped.join() === s.slice(0, s.length - m).join() && st.pegs.join() === kept.join(), `${tag} [${s}]: the first word rolls off`);
    }
  }
}
/* "next to" on a synthetic shelf of three (the shipped rounds never put a third thing where it matters) */
{
  const r = { things: [{ i: 0, noun: 'car', size: 'B', shelf: 'T', col: 0 }, { i: 1, noun: 'ball', size: 'B', shelf: 'T', col: 1 }, { i: 2, noun: 'cup', size: 'B', shelf: 'T', col: 2 }, { i: 3, noun: 'mug', size: 'B', shelf: 'U', col: 0 }] };
  for (const t of r.things) for (const w of ['x:car', 'x:ball', 'x:cup', 'x:mug']) is(C.fits(r, t, w) === mine(r, t, w), `synthetic shelf: ${t.noun} ${w} = ${mine(r, t, w)}`);
}
/* an empty strip, and please alone, are "empty" */
{ const st = C.newState(C.round('l1', 0, { mirror: false, cols: [0, 1, 0] }), '3', 'live'); is(C.check(st).ok === false && st.last.reason === 'empty', 'empty strip = empty'); }

/* (d) Level 2 */
is(C.DATA.L2.length >= 7, 'level 2 has at least 7 rounds');
C.DATA.L2.forEach((y, idx) => {
  is(FEEL[idx] && FEEL[idx][0] === y[0] && FEEL[idx][1] === y[1], `l2.${idx}: feeling/reason = gate (${y[0]}/${y[1]})`);
  for (let fp = 0; fp < 3; fp++) for (let hp = 0; hp < 3; hp++) {
    const r = C.round('l2', idx, { facePos: fp, helpPos: hp }), tag = `l2.${idx} f${fp}h${hp}`;
    is(r.faces.filter(f => f === y[0]).length === 1 && r.faces[fp] === y[0], tag + ': the feeling once, at its slot');
    is(r.helps.filter(h => h === y[1]).length === 1 && r.helps[hp] === y[1], tag + ': the reason’s help once, at its slot');
    is(new Set(r.helps.map(h => HELP[h])).size === 3, tag + ': three different help pictures');
    is(r.chips.filter(w => w === 'r:' + y[1]).length === 1 && r.chips.filter(w => w[0] === 'r').length >= 2, tag + ': the reason card once, with a decoy');
    is(r.say.length === 3 && r.say.every(w => w[0] === 'f'), tag + ': three faces to say');
    const ws = r.chips.concat(r.say);
    for (const s of subsets(ws, 3)) {
      const st = C.newState(r, '3', 'live'); s.forEach(w => C.addWord(st, w));
      const res = C.check(st), f = s.find(w => w[0] === 'f'), x = s.find(w => w[0] === 'r');
      const want = !s.some(w => w[0] !== 'p') ? 'empty' : (f === 'f:' + y[0] && x === 'r:' + y[1]) ? 'ok' : !f ? 'noFeel' : !x ? 'noWhy' : f !== 'f:' + y[0] ? 'wrongFace' : 'wrongHelp';
      const got = res.ok ? 'ok' : st.last.reason;
      if (want !== got) is(false, `${tag} [${s}]: check ${got}, gate ${want}`); else PASS++;
      if (!x) is(C.litHelps(r, s).length === 3, tag + ': no reason lights all three helps');
    }
  }
});

/* (e) the deal */
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (const level of ['l1', 'l2']) {
  let prev = null;
  for (let pass = 0; pass < 60; pass++) {
    const p = C.plan(level, rnd, prev), n = level === 'l1' ? L1N : C.DATA.L2.length;
    is(p.order.length === n && new Set(p.order).size === n, `${level} pass ${pass}: every round once`);
    if (prev) is(p.order.join() !== prev.join(), `${level} pass ${pass}: order differs from the last pass`);
    if (level === 'l1') {
      is(p.order[0] === 0 && p.order[1] === 1, `l1 pass ${pass}: opens with rounds 0 and 1`);
      let tops = 0, last = -1;
      p.order.forEach((idx, k) => {
        const r = C.round('l1', idx, p.lays[k]), tg = r.things[r.target];
        is(C.cubby(tg) !== last, `l1 pass ${pass} pos ${k}: target cubby not repeated`); last = C.cubby(tg);
        if (tg.shelf === 'T') tops++;
      });
      is(tops >= 4 && tops <= 5, `l1 pass ${pass}: 4–5 top-shelf targets (${tops})`);
    } else {
      const fc = [0, 0, 0], hc = [0, 0, 0];
      p.lays.forEach(l => { fc[l.facePos]++; hc[l.helpPos]++; });
      is(fc.sort().join() === '2,3,3' && hc.sort().join() === '2,3,3', `l2 pass ${pass}: face/help positions balanced`);
    }
    if (level === 'l1') p.order.forEach((idx, k) => (C.DATA.L1[idx].pairs || []).forEach(pr => is(Math.abs(p.lays[k].cols[pr[0]] - p.lays[k].cols[pr[1]]) === 1, `l1 pass ${pass} round ${idx}: the pair is dealt side by side`)));
    prev = p.order;
  }
  /* the same random stream twice: the second pass must step past the order the first one drew */
  for (let sd = 1; sd <= 20; sd++) {
    const mk = () => { let x = sd * 7919; return () => (x = (x * 16807) % 2147483647) / 2147483647; };
    const p1 = C.plan(level, mk(), null), p2 = C.plan(level, mk(), p1.order);
    is(p2.order.join() !== p1.order.join(), `${level} seed ${sd}: a pass never repeats the order it was handed`);
  }
}

/* (f) phrases */
const PHRASE = require('./verify-lamplight-cupboard-phrases.json');   /* the gate's own table: locale → { key: phrase } */
for (const loc of C.LOCALES) {
  for (let idx = 0; idx < L1N; idx++) {
    const r = C.round('l1', idx, { mirror: false, cols: legalLays(idx)[0].cols });
    const all = [r.say.find(w => w.slice(2) === r.things[r.target].noun)].concat(r.chips);
    for (const s of subsets(all, 3)) {
      const t = C.phraseText(C.build(loc, s));
      is(t && !/(?<!\p{L})(undefined|null)(?!\p{L})|\{|\s\s|^\s|\s$/u.test(t) && /^\p{Lu}/u.test(t), `${loc} l1.${idx} [${s}]: «${t}»`);
    }
  }
  C.DATA.L2.forEach((y, idx) => {
    for (const s of [['f:' + y[0], 'r:' + y[1]], ['f:' + y[0], 'r:' + y[1], 'p:please'], ['f:' + y[0]], ['r:' + y[1]]]) {
      const t = C.phraseText(C.buildFeel(loc, s));
      is(t && !/(?<!\p{L})(undefined|null)(?!\p{L})|\{|\s\s|^\s|\s$/u.test(t) && /^\p{Lu}/u.test(t), `${loc} l2.${idx} [${s}]: «${t}»`);
    }
  });
  const want = Object.assign({}, PHRASE[loc] || {});
  is(Object.keys(want).length >= 6, `${loc}: the gate's phrase table has at least 6 entries`);
  for (const k in want) {
    const [head, ...ws] = k.split(' '), lv = head.split(':')[0];
    const got = lv === 'l1' ? C.phraseText(C.build(loc, ws)) : C.phraseText(C.buildFeel(loc, ws));
    is(got === want[k], `${loc} ${k}: «${got}» ≠ gate «${want[k]}»`);
  }
}

/* (g) pictures + floor */
const LIB = path.join(__dirname, '..', 'image-library-webp', 'themes');
const BW = /(^|[ _-])(bw|sw|bn|nb|zw|sh|pb|mv|sv)( \d+)?$/i;
const pics = Object.assign({}, C.DATA.PIC, C.DATA.FACE);
Object.keys(C.DATA.HELP).forEach(k => { pics['help-' + k] = C.DATA.HELP[k]; is(C.DATA.HELP[k].split('/')[1] === HELP[k], `help for ${k} = ${HELP[k]}`); });
Object.keys(C.DATA.EVENT).forEach(k => { pics['event-' + k] = C.DATA.EVENT[k]; is(C.DATA.EVENT[k].split('/')[1] === EVENT[k], `event for ${k} = ${EVENT[k]}`); });
for (const k in pics) {
  const [th, noun] = pics[k].split('/');
  is(!BW.test(th), `${k}: ${th} is a colour theme`);
  const pj = path.join(MT, 'pictures', th + '.json'), J = fs.existsSync(pj) ? JSON.parse(fs.readFileSync(pj, 'utf8')) : null, e = J && J.nouns[noun];
  is(!!e, `${k}: ${pics[k]} is in mini tools/pictures/${th}.json`);
  is(!!e && fs.existsSync(path.join(__dirname, '..', decodeURIComponent(e.src))), `${k}: ${e && e.src} exists`);
  is(!!J && !BW.test(J.dir), `${k}: ${J && J.dir} is a colour theme`);
}
for (const W of [280, 320, 360, 412, 560, 600, 619, 620, 704, 1024, 1366]) {
  const L = C.layout(W), floor = W >= 620 ? 96 : 64;
  is(L.small >= floor && L.face >= floor && L.chipPic >= floor && L.big >= 1.35 * L.small, `layout ${W}: pictures ≥ ${floor}, big ≥ 1.35 × small (${L.big}/${L.small})`);
}

console.log(`verify-lamplight-cupboard-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
