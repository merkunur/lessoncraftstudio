#!/usr/bin/env node
/* =====================================================================
   verify-say-it-slot-core.js — the logic gate of ACTIVITY #165, The
   Say-It Slot ("Count Out the Money", 2.MD.C.8). Its ground truth is the
   design file's own tables (docs/activities-rebuild/designs/165-money.md
   §6), parsed here and re-measured with this gate's own solver — never
   the tool's tables. It checks:
     · every round equals the design table, in every family;
     · every coin is that country's real coin (nl/fi no 1/2 c, pt no 1
       centavo, sv no 20 kr coin, no no 2 kr coin, es whole pesos);
     · level 1: two ways at least (NOK R2 the one listed exception), spare
       coins, no coin equal to the price; level 2: the fewest set unique,
       ≥ 2 coins, a longer way there; level 3: the gap, an add-purse that
       makes it, an overshoot coin unless the gap reaches the biggest coin;
       compare R7 won by fewer coins, R8 by more;
     · the bots: biggest-first finishes 8/8 everywhere, smallest-first is
       stranded exactly in the design's ✱ rounds, a coins-as-ones player
       finishes 0, a turn-to-the-pin player has no first coin accepted;
     · the slot takes exactly one counter value per (box, coin); the counter
       never leaves [box, pin] under a 10,000-move fuzz; success only at the
       price with a coin in; give-back pops the last coin; stranding fires;
       the fewest level refuses a longer exact set; endless never runs out;
       compare slips, the wrong pick and its correction; the count-on steps;
     · the cloth is shuffled (each slot within ±3 points of uniform over
       4,000 showings); the plan (incl. a stuck random source);
     · the strings (11 locales, placeholders, no "free"), the manifest row.
   Env overrides (the mutation script): SIS_CORE, SIS_ACT, SIS_MAN.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..');
const C = require(process.env.SIS_CORE || path.join(REPO, 'mini tools', 'say-it-slot-core.js'));
const ACT = process.env.SIS_ACT || path.join(REPO, 'mini tools', 'say-it-slot-activity.js');
const MAN = process.env.SIS_MAN || path.join(REPO, 'mini tools', 'money-activities.json');
let pass = 0, fail = 0;
const is = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL: ' + m); } };
const sum = (a) => a.reduce((x, y) => x + y, 0), desc = (a) => a.slice().sort((x, y) => y - x);
const FAMS = ['USD', 'EURF', 'EURR', 'MXN', 'BRL', 'SEK', 'DKK', 'NOK'];
const LOCFAM = { en: 'USD', de: 'EURF', fr: 'EURF', it: 'EURF', nl: 'EURR', fi: 'EURR', es: 'MXN', pt: 'BRL', sv: 'SEK', da: 'DKK', no: 'NOK' };
/* the real coins per country (design §9) */
const PALETTE = { USD: [1, 5, 10, 25], EURF: [1, 2, 5, 10, 20, 50, 100], EURR: [5, 10, 20, 50, 100], MXN: [1, 2, 5, 10], BRL: [5, 10, 25, 50, 100], SEK: [1, 2, 5, 10], DKK: [1, 2, 5, 10, 20], NOK: [1, 5, 10, 20] };

/* ---------- the design tables, parsed ---------- */
const md = fs.readFileSync(path.join(REPO, 'docs', 'activities-rebuild', 'designs', '165-money.md'), 'utf8');
const section = (from, to) => md.slice(md.indexOf(from), md.indexOf(to, md.indexOf(from)));
const rowsOf = (txt) => { const out = {}; txt.split('\n').filter((l) => /^\| (USD|EURF|EURR|MXN|BRL|SEK|DKK|NOK) /.test(l)).forEach((l) => { const cells = l.split('|').slice(2, -1).map((x) => x.trim()); out[l.match(/^\| (\w+)/)[1]] = cells; }); return out; };
const list = (s) => { const out = []; s.trim().split(/[ ,]+/).forEach((t) => { const m = t.match(/^(\d+)×(\d+)$/); if (m) for (let i = 0; i < +m[2]; i++) out.push(+m[1]);  /* «1×8» = eight 1s */ else if (t) out.push(+t); }); return out; };
const D1 = {}, D2 = {}, D3 = {}, STAR = {};
for (const [f, cells] of Object.entries(rowsOf(section('**Level 1', '**Level 2')))) { D1[f] = cells.map((c) => { const m = c.match(/\*\*(\d+)\*\* \[([^\]]+)\]/); return { price: +m[1], purse: list(m[2]), star: /✱/.test(c) }; }); STAR[f] = D1[f].map((r, i) => r.star ? i : -1).filter((i) => i >= 0); }
for (const [f, cells] of Object.entries(rowsOf(section('**Level 2', '**Level 3')))) D2[f] = cells.map((c) => { const m = c.match(/\*\*(\d+)\*\* \[([^\]]+)\] → ([\d+]+)/); return { price: +m[1], purse: list(m[2]), fewest: m[3].split('+').map(Number) }; });
for (const [f, cells] of Object.entries(rowsOf(section('**Level 3', '**Measured')))) D3[f] = cells.map((c) => {
  let m = c.match(/^(\d+) − (\d+) \(([\d+]+)\) = \*\*(\d+)\*\* \[([^\]]+)\]$/);
  if (m) return { kind: 'top', price: +m[1], pre: m[3].split('+').map(Number), gap: +m[4], purse: list(m[5]), preTotal: +m[2] };
  m = c.match(/^A \[([^\]]+)\] = (\d+) · B \[([^\]]+)\] = (\d+) → (A|B)$/);
  return { kind: 'compare', a: list(m[1]), b: list(m[3]), sa: +m[2], sb: +m[4], win: m[5].toLowerCase() };
});
is(Object.keys(D1).length === 8 && Object.keys(D2).length === 8 && Object.keys(D3).length === 8, 'the design tables parse: 8 families × 3 levels');

/* ---------- own solver ---------- */
const ways = (target, purse) => { const seen = new Set(), out = []; const n = purse.length; for (let m = 1; m < (1 << n); m++) { const p = []; for (let i = 0; i < n; i++) if (m & (1 << i)) p.push(purse[i]); if (sum(p) === target) { const k = desc(p).join(); if (!seen.has(k)) { seen.add(k); out.push(desc(p)); } } } return out; };

for (const fam of FAMS) {
  const R1 = C.rounds(fam, '1'), R2 = C.rounds(fam, '2'), R3 = C.rounds(fam, '3'), pal = PALETTE[fam];
  is(R1.length === 8 && R2.length === 8 && R3.length === 8, fam + ': 8 rounds per level');
  is(desc(C.kinds(fam)).join() === desc(pal).join(), fam + ': the coins are the country\'s real coins ' + C.kinds(fam).join(','));
  const inPal = (a) => a.every((v) => pal.includes(v));
  D1[fam].forEach((d, i) => {
    const r = R1[i], tag = fam + ' L1 R' + (i + 1);
    is(r.kind === 'count' && r.price === d.price && desc(r.purse).join() === desc(d.purse).join(), tag + ': equals the design ' + d.price + ' [' + d.purse + ']');
    is(inPal(r.purse), tag + ': real coins only');
    const w = ways(r.price, r.purse);
    is(w.length >= 2 || (fam === 'NOK' && i === 1 && w.length === 1), tag + ': ' + w.length + ' ways to make it');
    is(!r.purse.includes(r.price) && sum(r.purse) > r.price, tag + ': no coin equals the price, spare coins');
  });
  D2[fam].forEach((d, i) => {
    const r = R2[i], tag = fam + ' L2 R' + (i + 1);
    is(r.kind === 'fewest' && r.price === d.price && desc(r.purse).join() === desc(d.purse).join(), tag + ': equals the design');
    is(inPal(r.purse), tag + ': real coins only');
    const w = ways(r.price, r.purse), min = Math.min(...w.map((x) => x.length)), mins = w.filter((x) => x.length === min);
    is(mins.length === 1 && mins[0].join() === desc(d.fewest).join() && min >= 2, tag + ': the fewest set is unique, ' + min + ' coins, = the design ' + d.fewest.join('+'));
    is(w.some((x) => x.length > min), tag + ': a longer way exists (fewest is a choice)');
    is(C.fewestCount(r.price, r.purse) === min, tag + ': the core\'s fewest count');
  });
  D3[fam].forEach((d, i) => {
    const r = R3[i], tag = fam + ' L3 R' + (i + 1);
    is(r.kind === d.kind, tag + ': kind ' + d.kind);
    if (d.kind === 'top') {
      is(r.price === d.price && desc(r.pre).join() === desc(d.pre).join() && desc(r.purse).join() === desc(d.purse).join(), tag + ': equals the design');
      is(sum(d.pre) === d.preTotal && d.price - d.preTotal === d.gap, tag + ': the design\'s own sums hold (' + d.price + ' − ' + d.preTotal + ' = ' + d.gap + ')');
      is(inPal(r.pre) && inPal(r.purse), tag + ': real coins only');
      is(ways(d.gap, r.purse).length >= 1, tag + ': the add-purse makes the gap ' + d.gap);
      is(r.purse.some((v) => v > d.gap) || d.gap >= Math.max(...pal.filter((v) => v < 100)) || d.gap >= Math.max(...pal), tag + ': an overshoot coin to meet the pin');
    } else {
      is(desc(r.a).join() === desc(d.a).join() && desc(r.b).join() === desc(d.b).join() && sum(d.a) === d.sa && sum(d.b) === d.sb, tag + ': equals the design');
      is(inPal(r.a) && inPal(r.b), tag + ': real coins only');
      const win = sum(r.a) > sum(r.b) ? 'a' : 'b', wc = win === 'a' ? r.a : r.b, lc = win === 'a' ? r.b : r.a;
      is(win === d.win && C.answer(r) === win, tag + ': tray ' + win + ' holds more');
      is(i === 6 ? wc.length < lc.length : wc.length > lc.length, tag + (i === 6 ? ': won by FEWER coins' : ': won by MORE coins'));
    }
  });
  /* ---------- the bots ---------- */
  const bot = (level, k, pickFn, mode) => {
    const st = C.newState(fam, level, k, mode || 'purse', () => 0.42);
    for (let g = 0; g < 60 && !st.done; g++) {
      const gap = st.round.price - C.inBox(st), fit = C.where(st, mode === 'endless' ? 'supply' : 'cloth').filter((c) => c.v <= gap);
      if (!fit.length) return 'stranded';
      const c = pickFn(fit); st.counter = C.inBox(st) + c.v;
      const r = C.drop(st, c.id); if (r.result !== 'in') return 'refused';
      if (r.fewer) return 'fewer';
    }
    return st.done ? 'done' : 'stuck';
  };
  const big = (f) => f.slice().sort((a, b) => b.v - a.v)[0], small = (f) => f.slice().sort((a, b) => a.v - b.v)[0];
  const stranded = [];
  for (let k = 0; k < 8; k++) {
    is(bot('1', k, big) === 'done', fam + ' L1 R' + (k + 1) + ': biggest-first finishes');
    if (bot('1', k, small) === 'stranded') stranded.push(k);
    is(bot('2', k, big) === 'done', fam + ' L2 R' + (k + 1) + ': biggest-first lands on the fewest set');
    is(bot('2', k, small) !== 'done', fam + ' L2 R' + (k + 1) + ': smallest-first strands or overspends');
    is(bot('1', k, big, 'endless') === 'done', fam + ' L1 R' + (k + 1) + ' endless: biggest-first finishes');
  }
  is(stranded.join() === STAR[fam].join(), fam + ': smallest-first stranded exactly in the design\'s ✱ rounds (' + stranded.map((k) => k + 1) + ' vs ' + STAR[fam].map((k) => k + 1) + ')');
  is(stranded.length === (fam === 'EURR' || fam === 'NOK' ? 3 : 4), fam + ': smallest-first stranded in ' + stranded.length + '/8');
  /* coins-as-ones: counts every coin as one more — finishes nothing; turn-to-the-pin: no first coin accepted */
  let ones = 0, pinFirst = 0;
  for (const level of ['1', '2']) for (let k = 0; k < 8; k++) {
    const st = C.newState(fam, level, k, 'purse', Math.random);
    for (let g = 0; g < 20 && !st.done; g++) { const cl = C.where(st, 'cloth'); if (!cl.length) break; st.counter = C.inBox(st) + 1; if (st.counter > st.round.price) break; C.drop(st, cl[0].id); }
    if (st.done) ones++;
    const s2 = C.newState(fam, level, k, 'purse', Math.random); s2.counter = s2.round.price;
    if (C.where(s2, 'cloth').some((c) => { const t = C.newState(fam, level, k, 'purse', () => 0.5); t.counter = t.round.price; const cc = C.where(t, 'cloth').find((x) => x.v === c.v); return C.drop(t, cc.id).result === 'in'; })) pinFirst++;
  }
  is(ones === 0, fam + ': a coins-as-ones player finishes 0/16');
  is(pinFirst === 0, fam + ': a turn-to-the-pin player has 0/16 first coins accepted');

  /* ---------- the slot takes exactly one counter value per (box, coin) ---------- */
  for (const level of ['1', '2', '3']) for (let k = 0; k < 8; k++) {
    const base = C.newState(fam, level, k, 'purse', () => 0.3); if (base.round.kind === 'compare') continue;
    const has = C.inBox(base), max = C.maxCounter(base);
    for (const c0 of C.where(base, 'cloth')) {
      let ins = 0, idle = 0, spit = 0, big2 = 0;
      for (let n = has; n <= max; n++) {
        const st = C.newState(fam, level, k, 'purse', () => 0.3); st.counter = n; const c = C.where(st, 'cloth').find((x) => x.id === c0.id);
        const r = C.drop(st, c.id).result;
        if (r === 'in') { ins++; is(n === has + c.v, fam + ' L' + level + ' R' + (k + 1) + ': swallowed only at box + coin'); is(st.counter === n, 'the counter stays where the child put it'); }
        else if (r === 'idle') { idle++; is(n === has, 'idle only when the counter was not turned'); }
        else if (r === 'spit') { spit++; is(st.counter === has, 'a spit rolls the wheels back to the box (' + fam + ')'); }
        else if (r === 'tooBig') big2++;
      }
      is(has + c0.v > max ? (big2 === max - has + 1 && ins === 0) : (ins === 1 && idle === 1), fam + ' L' + level + ' R' + (k + 1) + ' coin ' + c0.v + ': exactly one counter value opens the slot');
    }
  }
  /* ---------- the counter never leaves [box, pin] ---------- */
  { let bad = 0; const rnd = mulberry(7);
    for (let t = 0; t < 10000; t++) {
      const level = String(1 + (t % 3)), k = t % 8, st = C.newState(fam, level, k, 'purse', rnd);
      for (let m = 0; m < 8; m++) {
        const p = Math.floor(rnd() * C.digits(st)), d = rnd() < 0.5 ? 1 : -1; C.roll(st, p, d);
        if (rnd() < 0.2) { const fr = C.where(st, st.round.kind === 'compare' ? (st.pick ? 'tray-a' : 'none') : 'cloth'); if (fr.length) C.drop(st, fr[0].id); }
        if (rnd() < 0.05) C.giveBack(st);
        if (st.round.kind === 'compare' && !st.pick) C.pickTray(st, 'a');
        const lo = C.inBox(st), hi = C.maxCounter(st);
        if (st.counter < lo || st.counter > hi) bad++;
        if (st.done && st.round.kind !== 'compare' && (C.inBox(st) !== st.round.price || !st.box.length)) bad++;
      }
    }
    is(bad === 0, fam + ': 10,000 random move runs keep the counter in [box, pin], success only at the price with a coin in (' + bad + ' bad)');
  }
  /* ---------- give back, tip out, stranding, fewest, endless ---------- */
  { const st = C.newState(fam, '1', 0, 'purse', () => 0.1), cl = C.where(st, 'cloth');
    const a = cl.find((c) => c.v < st.round.price), b = cl.find((c) => c !== a && a.v + c.v < st.round.price);
    st.counter = a.v; C.drop(st, a.id); if (b) { st.counter = a.v + b.v; C.drop(st, b.id); }
    const back = C.giveBack(st);
    is(back && back.id === (b || a).id && st.counter === (b ? a.v : 0) && back.at === 'cloth', fam + ': the lever gives back the LAST coin in, the counter rolls back');
    C.tipOut(st); is(st.box.length === 0 && st.counter === 0, fam + ': the ring tips every coin out, the counter to 0');
  }
  { const st = C.newState(fam, '3', 0, 'purse', () => 0.1), pre = C.inBox(st);
    is(pre === sum(st.round.pre) && st.counter === pre && C.giveBack(st) === null && C.roll(st, 0, -1) === 'floor', fam + ': top-up starts at Pip\'s ' + pre + ', which the lever and the wheels cannot take');
  }
  { const k = STAR[fam][0], st = C.newState(fam, '1', k, 'purse', () => 0.5); let res = null;
    for (let g = 0; g < 20 && !res; g++) { const fit = C.where(st, 'cloth').filter((c) => c.v <= st.round.price - C.inBox(st)).sort((x, y) => x.v - y.v); if (!fit.length) break; st.counter = C.inBox(st) + fit[0].v; const r = C.drop(st, fit[0].id); if (r.stranded) res = r; }
    is(res && res.stranded === 1 && !C.canFinish(st), fam + ' L1 R' + (k + 1) + ': smallest-first is told it is stranded');
    C.sortCloth(st); const cv = C.where(st, 'cloth').map((c) => c.v);
    is(st.box.length === 0 && cv.join() === desc(cv).join() && st.sorted, fam + ': the second stranding tips out and lays the cloth biggest first');
  }
  { const st = C.newState(fam, '2', 0, 'purse', () => 0.1), w = ways(st.round.price, st.round.purse), longer = w.sort((a, b) => b.length - a.length)[0];
    let last = null; for (const v of longer) { const c = C.where(st, 'cloth').find((x) => x.v === v); st.counter = C.inBox(st) + v; last = C.drop(st, c.id); }
    is(last.fewer === 1 && !st.done, fam + ' L2: exact with ' + longer.length + ' coins is refused as not the fewest');
    const fc = C.fewestCoin(st); is(D2[fam][0].fewest.includes(fc) , fam + ' L2: the ringed coin ' + fc + ' belongs to the fewest set');
  }
  { const st = C.newState(fam, '1', 0, 'endless', () => 0.1), sup = C.where(st, 'supply');
    is(desc(sup.map((c) => c.v)).join() === desc(PALETTE[fam]).join(), fam + ' endless: one supply pile per coin');
    const c = sup.find((x) => x.v < st.round.price); st.counter = c.v; const r = C.drop(st, c.id);
    is(r.result === 'in' && C.where(st, 'supply').length === sup.length && C.byId(st, c.id).at === 'supply', fam + ' endless: dropping a coin never empties its pile');
    C.giveBack(st); is(C.where(st, 'supply').length === sup.length && st.coins.length === sup.length, fam + ' endless: the lever takes it away again');
    is(C.canFinish(st), fam + ' endless: never stranded');
  }
  /* compare: pick, count both trays, the slips; the wrong pick and its correction */
  for (const k of [6, 7]) for (const wrong of [false, true]) {
    const st = C.newState(fam, '3', k, 'purse', () => 0.3), r = st.round, right = C.answer(r), pick = wrong ? (right === 'a' ? 'b' : 'a') : right;
    const c0 = C.where(st, 'tray-a')[0];
    is(C.drop(st, c0.id).result === 'pickFirst', fam + ' compare: no counting before a tray is picked');
    C.pickTray(st, pick);
    for (const t of ['a', 'b']) {
      for (const c of C.where(st, 'tray-' + t)) { if (t === 'b' && st.box.length === 0) { const o = C.where(st, 'tray-a'); is(o.length === 0, 'tray a is emptied first'); } st.counter = C.inBox(st) + c.v; C.drop(st, c.id); }
      is(st.slips[t] === sum(r[t]), fam + ' compare R' + (k + 1) + ': tray ' + t + ' prints ' + sum(r[t]));
    }
    is(st.done === !wrong && st.compareMiss === wrong, fam + ' compare R' + (k + 1) + (wrong ? ': the wrong pick is a miss' : ': the right pick wins'));
    if (wrong) { C.pickTray(st, right); is(st.done, fam + ' compare: tapping the tray with more money then finishes'); }
  }
  { const st = C.newState(fam, '3', 6, 'purse', () => 0.3); C.pickTray(st, 'a'); const a1 = C.where(st, 'tray-a')[0], b1 = C.where(st, 'tray-b')[0];
    st.counter = a1.v; C.drop(st, a1.id); is(C.drop(st, b1.id).result === 'otherTray', fam + ' compare: the other tray waits until this one is counted'); }
  /* shuffled cloth: the biggest coin's slot is uniform */
  { const r = C.rounds(fam, '1')[0], n = r.purse.length, cnt = Array(n).fill(0), N = 4000, bigV = Math.max(...r.purse);
    for (let t = 0; t < N; t++) { const st = C.newState(fam, '1', 0, 'purse', Math.random); cnt[C.where(st, 'cloth').findIndex((c) => c.v === bigV)]++; }
    const share = cnt.map((x) => x / N), first = r.purse.filter((v) => v === bigV).length / n;
    is(share.every((s) => Math.abs(s - 1 / n) <= 0.03 + (first - 1 / n)), fam + ': the cloth is shuffled (' + share.map((s) => (s * 100).toFixed(1)).join(' ') + ')');
  }
}
/* the count-on steps */
const ST = (a, v, want) => is(C.steps(a, v).join() === want.join(), 'steps ' + a + ' + ' + v + ' → ' + want.join(', '));
ST(35, 25, [45, 55, 60]); ST(13, 2, [14, 15]); ST(0, 100, [100]); ST(40, 1, [41]); ST(20, 50, [30, 40, 50, 60, 70]); ST(7, 5, [12]);
for (let a = 0; a < 60; a++) for (const v of [1, 2, 5, 10, 20, 25, 50, 100]) { const s = C.steps(a, v); is(s[s.length - 1] === a + v && s.every((x, i) => i === 0 || x > s[i - 1]), 'steps end at ' + (a + v)); }
/* the plan */
for (const fam of FAMS) for (const level of ['1', '2', '3']) {
  let prev = null;
  for (let p = 0; p < 40; p++) { const o = C.plan(fam, level, Math.random, prev); is(o.slice().sort().join() === [0, 1, 2, 3, 4, 5, 6, 7].join() && (!prev || o.join() !== prev.join()), fam + ' L' + level + ': a reshuffle, never the previous order'); if (level === '3') { const i6 = o.indexOf(6), i7 = o.indexOf(7); is(Math.abs(i6 - i7) > 1, fam + ': the two compare rounds never side by side'); } prev = o; }
  const s0 = C.plan(fam, level, () => 0, null), stuck = C.plan(fam, level, () => 0, s0); prev = s0; is(stuck.join() !== prev.join() && (level !== '3' || Math.abs(stuck.indexOf(6) - stuck.indexOf(7)) > 1), fam + ' L' + level + ': a stuck random source still gets a valid new order');
}
/* ---------- strings ---------- */
const ctx = { window: {}, SayItSlotCore: C }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(ACT, 'utf8').replace(/injectSayItSlotCSS\(\);/, '') + '\n;this.__A = SayItSlotActivity;', ctx);
const A = ctx.__A, LOC = Object.keys(LOCFAM), keys = Object.keys(A.strings);
is(keys.length >= 50, 'the strings block holds ' + keys.length + ' keys');
for (const k of keys) {
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  for (const l of LOC) {
    const s = A.strings[k][l];
    is(typeof s === 'string' && s.length > 0, k + ' [' + l + '] authored');
    if (typeof s !== 'string') continue;
    is(ph(s) === ph(A.strings[k].en), k + ' [' + l + '] carries the same placeholders as en');
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmainen|gratuita)(?!\p{L})/iu.test(s), k + ' [' + l + '] says nothing is free');
    if (l === 'fr') is(!/ [?!:;]/.test(s), k + ' [fr] a narrow no-break space before ? ! : ;');
  }
}
/* every authored key is asked for somewhere (the shell asks for title / instruction / setting labels) */
const src = fs.readFileSync(ACT, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '');
const SHELL = ['title', 'instruction', 'instrBubble', 'okBubble'];
for (const k of keys) is(SHELL.includes(k) || new RegExp("'" + k + "'").test(src) || (/^name\d+$/.test(k) && /'name' \+ v/.test(src)) || (/^a(Hund|Tens|Ones)(Up|Down)$/.test(k) && src.includes("'" + k + "'")), 'the key ' + k + ' is reached by the code');
/* the success key mapping and the hidden Check after 0.5 s */
is(/OK_MS: 500/.test(src), 'Next appears 0.5 s after success (OK_MS 500)');
/* ---------- the activity layer, run in node (no DOM: _wrap is null, so _paint is a no-op; timers queued by hand) ---------- */
is(!/\.counter\s*=[^=]/.test(src), 'the activity never writes the counter itself (no running total: only the child turns it)');
{
  const Q = []; ctx.setTimeout = (fn) => { Q.push(fn); return Q.length; }; ctx.clearTimeout = () => {};
  const flush = () => { while (Q.length) Q.shift()(); };
  const mk = (loc, level, k, mode) => {
    const a = Object.create(A);
    a.api = { lang: loc, settings: { level: level, coins: mode || 'purse' }, t: (key) => A.strings[key][loc], sound: () => {}, announce: () => {} };
    a._timers = []; a._wrap = null; a.FAST = true; a._g = { k: 2.6 };
    a.st = C.newState(LOCFAM[loc], level, k, mode || 'purse', () => 0.3);
    a._view = { note: '', soft: false, sel: null, spit: null, said: null, open: false, shiver: false, show: null, ring: null, glow: false, wiggle: false };
    return a;
  };
  vm.runInContext('this.__mk = 1', ctx);
  for (const loc of LOC) {
    const a = mk(loc, '1', 0), st = a.st, c = C.where(st, 'cloth')[0], has = C.inBox(st);
    a._select(c.id);
    is(a._view.sel === c.id && st.counter === has, '[' + loc + '] picking up a coin does not move the counter');
    a._drop(c.id);
    is(a._view.note === A.strings.hintIdle[loc].replace(/ (?=[?!:;])/g, ' ') || a._view.note === A.strings.hintIdle[loc], '[' + loc + '] dropping with the counter not turned → hintIdle, no miss');
    is(st.missTotal === 0, '[' + loc + '] the idle drop is not a miss');
    st.counter = has + c.v + 1 <= C.maxCounter(st) ? has + c.v + 1 : has + c.v - 1; a._drop(c.id);
    is(st.missTotal === 1 && a._view.said != null && st.counter === has && /\{/.test(a._view.note) === false, '[' + loc + '] a wrong count is spat out, the said number shown, the wheels back');
    const n1 = a._view.note;
    st.counter = has + c.v + 1 <= C.maxCounter(st) ? has + c.v + 1 : has + c.v - 1; a._drop(c.id);
    is(n1 !== a._view.note && a._view.note.indexOf(C.steps(has, c.v).map((x) => a._money(x)).join(', ')) >= 0, '[' + loc + '] miss 2 on the same coin shows the count-on steps');
    flush();
    is(a._view.show === null && st.counter === has, '[' + loc + '] after the count-on the wheels are back on the box (never left on the answer)');
    /* the success line with the child's chain */
    const b = mk(loc, '1', 0), sb = b.st; let line = '';
    b._paint = () => {}; b._success = function () { line = this._t(this._okKey(), this._args()); };
    for (const v of desc(sb.round.purse)) { const gap = sb.round.price - C.inBox(sb); if (v > gap) continue; const cc = C.where(sb, 'cloth').find((x) => x.v === v); sb.counter = C.inBox(sb) + v; b._drop(cc.id); if (sb.done) break; }
    is(sb.done && line.indexOf(sb.said.map((x) => b._money(x)).join(', ')) >= 0 && !/\{\w+\}/.test(line) && !/kr\.\./.test(line), '[' + loc + '] success names the child\'s own chain: ' + line);
    /* coin faces: none on the US coins, the worth numeral elsewhere */
    const face = a._coinSvg(C.kinds(LOCFAM[loc])[0], 40);
    is(loc === 'en' ? !/<text/.test(face) : /<text/.test(face), '[' + loc + '] coin faces: ' + (loc === 'en' ? 'no numeral, like the real US coins' : 'the worth numeral'));
    is(/<text[^>]*is-ghost/.test(a._coinSvg(10, 40, { ghost: true })) === (loc === 'en'), '[' + loc + '] the ghost numeral appears only on the en second miss');
  }
  /* the compare hint: «more coins is not always more money» only when the wrongly picked tray holds MORE coins */
  for (const loc of LOC) for (const k of [6, 7]) {
    const c = mk(loc, '3', k), st = c.st, right = C.answer(st.round), wrong = right === 'a' ? 'b' : 'a'; c._paint = () => {};
    C.pickTray(st, wrong); for (const t of ['a', 'b']) for (const x of C.where(st, 'tray-' + t)) { st.counter = C.inBox(st) + x.v; c._drop(x.id); }
    const mine = st.round[wrong].length > st.round[right].length;
    is(st.compareMiss && c._view.note === c._t(mine ? 'hintCompare' : 'hintCompareMoney', c._compareArgs()), '[' + loc + '] compare R' + (k + 1) + ': the wrong pick (' + (mine ? 'more' : 'fewer') + ' coins) → ' + (mine ? 'hintCompare' : 'hintCompareMoney'));
  }
  { const k1 = mk('en', '1', 0), key1 = k1._key(); k1.api.settings.coins = 'endless'; is(k1._key() !== key1, 'changing Coins starts a fresh round at once (the pool key carries the mode)'); }
  const da = mk('da', '1', 0); is(!/kr\.\./.test(da._t('pCount', { price: da._money(13) })), 'da: «13 kr.» never «kr..» at a sentence end');
  const de = mk('de', '1', 6); is(de._split(150) === '1 € 50 ct' && mk('it', '1', 6)._split(150) === '1 euro e 50 cent' && mk('pt', '1', 7)._split(100) === '1 real', 'the split form: «1 € 50 ct», «1 euro e 50 cent», «1 real»');
}
/* ---------- the manifest row ---------- */
const row = JSON.parse(fs.readFileSync(MAN, 'utf8')).find((x) => x.id === 'money.count-out.2-md-c-8');
is(row && row.tool === 'say-it-slot-activity' && row.task_template === 'say-it-slot' && JSON.stringify(row.params) === '{}', 'the manifest row points at the new tool, old params dropped');
is(row && Object.keys(row.slug).length === 11 && row.alignment.code === '2.MD.C.8', 'the row ships in 11 locales, 2.MD.C.8');

function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
console.log(`verify-say-it-slot-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
