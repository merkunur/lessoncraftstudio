#!/usr/bin/env node
/* =====================================================================
   verify-story-film-core.js — the build gate of ACTIVITY #82, The Story
   Film ("Vet's Diagnosis Window", 1.OA.A.1). It keeps its OWN ground truth
   — a hand-typed table of every round's kind, story numbers and answer —
   and its own film physics, and never reads an expectation off the core.
   It proves:
     (1) solve = the gate's answer for every round of every level, and no
         round stores an answer;
     (2) every locale's clause for a known role carries exactly that role's
         numeral and nothing else; the unknown's clause and the question
         carry no numeral; the answer sentence carries the answer once;
     (3) answer ≥ 1 and ≠ a story number; decoy ≠ answer and ≠ a story
         number; Groups decoy = the sum; the decoy's size rank is spread
         (w20 biggest 6 / smallest 6 / between 4; w10 4 / 4 / 2);
     (4) "drop the biggest tile" and "drop the smallest tile" each leave
         the two story numbers in ≤ 40 % of rounds; "add the two numbers"
         is right in < 30 %;
     (5) the film, exhaustively — every binding of the three tiles to the
         two known frames × every mystery frame × dials: the right model
         and only it passes; a wrong tile stops the film at the FIRST
         frame (in film order) whose story number differs (the two part
         frames of a put-together story are interchangeable); a wrong dial
         lands as spill or empty sockets of exactly the gate's count;
     (6) Groups: sharing deals round-robin, making groups fills tray by tray;
     (7) w20 mystery places: change first 3 / chute 3 / last 2, bracket
         part 2 / whole 1, compare gap 1 / long 2 / short 2; a pass never
         puts two equal answers or three same kinds side by side;
     (8) the dial runs 1–20 (Groups 1–30), never 0; Check hints (empty /
         mystery) are no miss; miss 2 names the kind's count;
     (9) every equation evaluates true and uses the locale's school signs;
     (10) every picture and patient exists in a colour theme.
   Usage: node scripts/verify-story-film-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const MT = path.join(__dirname, '..', 'mini tools');
const C = require(path.join(process.env.SF_CORE_DIR || MT, 'story-film-core.js'));   /* SF_CORE_DIR: the mutation harness points this at a mutated copy */
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---- the gate's own truth: [kind, numbers by role, answer] ---- */
const T = {
  w20: [['take-result', { start: 9, change: 3 }, 6], ['add-change', { start: 5, result: 12 }, 7], ['add-start', { change: 6, result: 14 }, 8], ['add-start', { change: 4, result: 13 }, 9],
    ['take-change', { start: 12, result: 8 }, 4], ['take-change', { start: 15, result: 9 }, 6], ['take-start', { change: 4, result: 6 }, 10], ['put-part', { whole: 13, part1: 5 }, 8],
    ['put-part', { whole: 11, part1: 4 }, 7], ['cmp-diff', { big: 14, small: 5 }, 9], ['cmp-big', { small: 5, gap: 7 }, 12], ['cmp-diff', { big: 11, small: 6 }, 5],
    ['cmp-small', { big: 12, gap: 7 }, 5], ['cmp-small', { big: 11, gap: 6 }, 5], ['add-result', { start: 8, change: 5 }, 13], ['put-total', { part1: 9, part2: 8 }, 17]],
  w10: [['add-result', { start: 4, change: 3 }, 7], ['add-change', { start: 2, result: 6 }, 4], ['add-start', { change: 3, result: 8 }, 5], ['take-result', { start: 8, change: 2 }, 6],
    ['take-change', { start: 9, result: 6 }, 3], ['take-start', { change: 3, result: 5 }, 8], ['put-part', { whole: 9, part1: 4 }, 5], ['put-part', { whole: 10, part1: 4 }, 6],
    ['cmp-diff', { big: 7, small: 3 }, 4], ['cmp-small', { big: 7, gap: 5 }, 2]],
  grp: [['grp-total', { groups: 4, each: 5 }, 20], ['grp-total', { groups: 6, each: 3 }, 18], ['grp-total', { groups: 5, each: 2 }, 10], ['grp-share', { total: 12, groups: 3 }, 4],
    ['grp-share', { total: 20, groups: 4 }, 5], ['grp-share', { total: 18, groups: 6 }, 3], ['grp-make', { total: 15, each: 5 }, 3], ['grp-make', { total: 16, each: 2 }, 8], ['grp-make', { total: 24, each: 6 }, 4]]
};
const ORDER = { change: ['start', 'change', 'result'], bracket: ['part1', 'part2', 'whole'], compare: ['big', 'small', 'gap'], groups: ['groups', 'each', 'total'] };
const DIAG = k => k.startsWith('cmp') ? 'compare' : k.startsWith('grp') ? 'groups' : k.startsWith('put') ? 'bracket' : 'change';
const UNKNOWN = { 'add-result': 'result', 'take-result': 'result', 'add-change': 'change', 'take-change': 'change', 'add-start': 'start', 'take-start': 'start', 'put-total': 'whole', 'put-part': 'part2', 'cmp-diff': 'gap', 'cmp-big': 'big', 'cmp-small': 'small', 'grp-total': 'total', 'grp-share': 'each', 'grp-make': 'groups' };
const HINT = { 'add-change': 'hCame', 'take-change': 'hWent', 'add-start': 'hBefore', 'take-start': 'hBefore', 'put-part': 'hPart', 'cmp-diff': 'hGap', 'cmp-big': 'hLong', 'cmp-small': 'hShort', 'grp-share': 'hTray', 'grp-make': 'hTrays' };
function full(k, v, ans) { const f = Object.assign({}, v); f[UNKNOWN[k]] = ans; return f; }
function arrive(k, m) { const d = DIAG(k); if (d === 'change') return k.startsWith('take') ? m.start - m.change : m.start + m.change; if (d === 'bracket') return m.part1 + m.part2; if (d === 'compare') return m.big - m.small; return m.groups * m.each; }
const LAND = { change: 'result', bracket: 'whole', compare: 'gap', groups: 'total' };
const nums = s => (String(s).match(/\d+/g) || []).map(Number);

is(!/\banswer\s*:/.test(fs.readFileSync(path.join(process.env.SF_CORE_DIR || MT, 'story-film-core.js'), 'utf8').split('var TX = {')[0].split('var ROUNDS = {')[1] || ''), 'no round stores an answer');

for (const L of ['w20', 'w10', 'grp']) {
  const rs = C.ids(L).map(i => C.round(L, i));
  is(rs.length === T[L].length && rs.length >= 7, `${L}: ${rs.length} rounds = gate ${T[L].length} (≥ 7)`);
  const ranks = { big: 0, small: 0, mid: 0 }; let dropBig = 0, dropSmall = 0, addAll = 0;
  rs.forEach((r, i) => {
    const [k, v, ans] = T[L][i], tag = `${L}.${i}`;
    /* (1) */
    is(r.k === k && JSON.stringify(r.v) === JSON.stringify(v), `${tag}: kind and numbers = gate (${r.k} ${JSON.stringify(r.v)})`);
    is(C.solve(r) === ans && r.answer === ans, `${tag}: solve ${C.solve(r)} = gate ${ans}`);
    is(r.d === DIAG(k) && r.u === UNKNOWN[k], `${tag}: diagram ${r.d}, unknown ${r.u}`);
    /* (3) */
    const story = Object.values(v);
    is(ans >= 1 && story.indexOf(ans) < 0, `${tag}: answer ${ans} ≥ 1 and not a story number`);
    is(r.decoy >= 1 && r.decoy !== ans && story.indexOf(r.decoy) < 0, `${tag}: decoy ${r.decoy} ≠ answer, ≠ story numbers`);
    if (L === 'grp') is(r.decoy === story[0] + story[1], `${tag}: Groups decoy = the sum`);
    const tiles = story.concat([r.decoy]).sort((a, b) => a - b);
    ranks[r.decoy === tiles[2] ? 'big' : r.decoy === tiles[0] ? 'small' : 'mid']++;
    if (tiles[2] === r.decoy) dropBig++; if (tiles[0] === r.decoy) dropSmall++;
    if (story[0] + story[1] === ans) addAll++;
    /* (2) every locale's clauses */
    for (const loc of C.LOCALES) {
      const t = C.text(loc, r);
      is(t.clauses.length === r.cl.length, `${loc} ${tag}: ${t.clauses.length} clauses`);
      t.clauses.forEach(c => { const want = c.role === r.u ? [] : [v[c.role]]; is(JSON.stringify(nums(c.t)) === JSON.stringify(want), `${loc} ${tag} [${c.role}] «${c.t}» carries ${JSON.stringify(nums(c.t))}, not ${JSON.stringify(want)}`); });
      is(Object.keys(v).every(role => t.clauses.some(c => c.role === role)), `${loc} ${tag}: every known number has its clause`);
      is(nums(t.q).length === 0, `${loc} ${tag}: the question carries no numeral («${t.q}»)`);
      is(JSON.stringify(nums(t.a)) === JSON.stringify([ans]), `${loc} ${tag}: the answer sentence carries ${ans} once («${t.a}»)`);
      /* (9) */
      const eq = C.equation(loc, r), M = { de: '·', da: '·', no: '·', sv: '·', fi: '·' }[loc] || '×', D = { en: '÷', es: '÷', pt: '÷' }[loc] || ':';   /* the school signs (reviewer 2026-10-23: it divides with ':', sv and fi multiply with '·') */
      const ex = eq.replace(/[  ]/g, '').split('='), lhs = ex[0].replace(/−/g, '-').replace(new RegExp('\\' + M, 'g'), '*').replace(new RegExp(D === ':' ? ':' : '÷', 'g'), '/');
      is(ex.length === 2 && /^[0-9+\-*/]+$/.test(lhs) && Function('return ' + lhs)() === +ex[1], `${loc} ${tag}: «${eq}» is true`);
      if (k.startsWith('grp')) is(eq.indexOf(k === 'grp-total' ? M : D) >= 0, `${loc} ${tag}: «${eq}» uses ${k === 'grp-total' ? M : D}`);
      if (C.LOCALES.indexOf(loc) === 0) is(nums(eq).indexOf(ans) >= 0, `${tag}: the equation names the answer`);
    }
    /* (5) the film, exhaustively */
    const f = full(k, v, ans), roles = ORDER[r.d], known = Object.keys(v), tileVals = story.concat([r.decoy]);
    for (const myst of roles) {
      const others = roles.filter(x => x !== myst);
      for (const a of [0, 1, 2]) for (const b of [0, 1, 2]) {
        if (a === b) continue;
        for (const dial of [ans, ans + 1, Math.max(1, ans - 1), ans + 3]) {
          const st = C.newState(r, [0, 1, 2]);
          C.place(st, others[0], 't' + a); C.place(st, others[1], 't' + b); C.markMystery(st, myst); C.setDial(st, dial);
          const model = {}; model[others[0]] = tileVals[a]; model[others[1]] = tileVals[b]; model[myst] = st.dial;
          /* the gate's expectation */
          let swap = false;
          if (r.d === 'bracket' && myst !== 'whole' && r.u !== 'whole' && myst !== r.u) swap = true;
          if (r.d === 'bracket' && r.u === 'whole' && model.part1 !== f.part1 && model.part1 === f.part2 && model.part2 === f.part1) swap = true;
          const S = x => swap && x !== 'whole' ? (x === 'part1' ? 'part2' : 'part1') : x;
          let want = null;
          for (const x of roles) {
            if (x === myst) { if (S(x) !== r.u) { want = { at: x, why: 'place' }; break; } continue; }
            if (model[x] !== f[S(x)] || S(x) === r.u) { want = { at: x, why: 'place' }; break; }
          }
          if (!want && st.dial !== ans) { const land = LAND[r.d], ar = arrive(k, model), ou = model[land]; want = { at: land, why: ar > ou ? 'spill' : 'gap', n: Math.abs(ar - ou) }; }
          const got = C.runFilm(st);
          const okW = !want, okG = !!got.ok;
          if (okW !== okG || (want && (got.at !== want.at || got.why !== want.why || (want.n != null && got.n !== want.n)))) is(false, `${tag} myst ${myst} tiles ${tileVals[a]},${tileVals[b]} dial ${st.dial}: film ${JSON.stringify(got)}, gate ${JSON.stringify(want)}`); else PASS++;
          if (want && want.why !== 'place' && r.d !== 'groups') is(want.n === Math.abs(st.dial - ans), `${tag}: an additive story's spill/gap = |dial − answer|`);
        }
      }
    }
    /* (8) check */
    { const st = C.newState(r, [0, 1, 2]); let res = C.check(st); is(!res.ok && res.reason === 'empty' && st.misses === 0, `${tag}: nothing placed = empty, no miss`);
      const ks = Object.keys(v); C.place(st, ks[0], 't0'); C.place(st, ks[1], 't1'); C.place(st, r.u, 't2'); res = C.check(st); is(!res.ok && res.reason === 'mystery' && st.misses === 0, `${tag}: no mystery = a hint, no miss`);
      C.markMystery(st, r.u); is(st.placed[r.u] === null && st.mystery === r.u, `${tag}: marking a frame takes its tile back`);
      C.setDial(st, ans === 1 ? 2 : 1); C.check(st); is(st.misses === 1 && C.hint(st) === 'hMiss1', `${tag}: miss 1`);
      C.check(st); is(st.misses === 2 && C.hint(st) === (HINT[k] || 'hAll'), `${tag}: miss 2 says ${C.hint(st)}`);
      C.setDial(st, ans); is(st.show === 0, `${tag}: a move hides the help`); res = C.check(st); is(res.ok && st.done, `${tag}: the right model heals`);
      const s0 = C.newState(r); C.markMystery(s0, r.u); C.setDial(s0, 0); is(s0.dial === 1, `${tag}: the dial never shows 0`); C.setDial(s0, 99); is(s0.dial === (L === 'grp' ? 30 : 20), `${tag}: the dial stops at ${L === 'grp' ? 30 : 20}`); }
    /* (6) */
    if (k === 'grp-share' || k === 'grp-make') {
      const o = C.dealOrder(r, f.groups, f.each), want = [];
      if (k === 'grp-share') { for (let e = 0; e < f.each; e++) for (let g = 0; g < f.groups; g++) want.push(g); } else { for (let g = 0; g < f.groups; g++) for (let e = 0; e < f.each; e++) want.push(g); }
      is(o.join() === want.join(), `${tag}: the ${k === 'grp-share' ? 'sharing' : 'making-groups'} film deals ${k === 'grp-share' ? 'round-robin' : 'tray by tray'}`);
    }
  });
  /* (3)(4) */
  if (L === 'w20') is(ranks.big === 6 && ranks.small === 6 && ranks.mid === 4, `w20: decoy ranks ${JSON.stringify(ranks)} = 6/6/4`);
  if (L === 'w10') is(ranks.big === 4 && ranks.small === 4 && ranks.mid === 2, `w10: decoy ranks ${JSON.stringify(ranks)} = 4/4/2`);
  if (L !== 'grp') {
    is(dropBig / rs.length <= 0.4 && dropSmall / rs.length <= 0.4, `${L}: drop-biggest ${dropBig}/${rs.length}, drop-smallest ${dropSmall}/${rs.length} ≤ 40 %`);
    is(addAll / rs.length < 0.3, `${L}: add-the-two-numbers right in ${addAll}/${rs.length} < 30 %`);
  }
  /* (7) */
  if (L === 'w20') {
    const at = {}; rs.forEach(r => { at[r.d + ':' + r.u] = (at[r.d + ':' + r.u] || 0) + 1; });
    const want = { 'change:start': 3, 'change:change': 3, 'change:result': 2, 'bracket:part2': 2, 'bracket:whole': 1, 'compare:gap': 2, 'compare:big': 1, 'compare:small': 2 };
    is(JSON.stringify(Object.keys(want).map(x => at[x] || 0)) === JSON.stringify(Object.values(want)) && Object.values(at).every(n => n <= 3), `w20: mystery places ${JSON.stringify(at)}`);
  }
  let seed = 3; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; let prev = null;
  for (let pass = 0; pass < 400; pass++) {
    const p = C.plan(L, rnd, prev), seq = p.order.map(i => C.round(L, i));
    is(p.order.length === rs.length && new Set(p.order).size === rs.length, `${L} pass ${pass}: every round once`);
    is(seq.every((r, j) => j === 0 || r.answer !== seq[j - 1].answer), `${L} pass ${pass}: no two equal answers side by side`);
    is(seq.every((r, j) => j < 2 || !(r.k === seq[j - 1].k && r.k === seq[j - 2].k)), `${L} pass ${pass}: no kind three times running`);
    is(p.trays.length === rs.length && p.trays.every(t => t.slice().sort().join() === '0,1,2'), `${L} pass ${pass}: tiles shuffled`);
    if (prev) is(p.order.join() !== prev.join(), `${L} pass ${pass}: never the order just played`);
    prev = p.order;
  }
  for (let sd = 1; sd <= 15; sd++) { const mk = () => { let x = sd * 7919; return () => (x = (x * 16807) % 2147483647) / 2147483647; }; const p1 = C.plan(L, mk(), null), p2 = C.plan(L, mk(), p1.order); is(p2.order.join() !== p1.order.join(), `${L} seed ${sd}: the same stream steps past the order it was handed`); }
}

/* the hand: a tile on an occupied frame swaps; a tile on the mystery clears it */
{ const r = C.round('w20', 0), st = C.newState(r, [0, 1, 2]); C.place(st, 'start', 't0'); C.place(st, 'change', 't1'); C.place(st, 'start', 't1');
  is(st.placed.start === 't1' && st.placed.change === 't0', 'a tile moved onto an occupied frame swaps the two');
  C.markMystery(st, 'result'); C.place(st, 'result', 't2'); is(st.mystery === null && st.placed.result === 't2', 'a tile on the mystery frame clears the mark'); }

/* (10) pictures */
const BW = /(^|[ _-])(bw|sw|bn|nb|zw|sh|pb|mv|sv)( \d+)?$/i, seen = new Set();
for (const L of ['w20', 'w10', 'grp']) C.ids(L).forEach(i => { const r = C.round(L, i); r.pics.concat([r.patient]).forEach(p => seen.add(p)); });
seen.add(C.DATA.BANDAGE);
for (const k of seen) {
  const [th, noun] = k.split('/'), pj = path.join(MT, 'pictures', th + '.json'), J = fs.existsSync(pj) ? JSON.parse(fs.readFileSync(pj, 'utf8')) : null, e = J && J.nouns[noun];
  is(!!e && fs.existsSync(path.join(__dirname, '..', decodeURIComponent(e.src))), `${k}: in the picture index, file exists`);
  is(!!J && !BW.test(J.dir), `${k}: colour theme`);
  is(['fruits/cherry', 'fruits/plum', 'bakery/bun', 'farm-animals/duck', 'things-that-fly/duck', 'birds-2/duck'].indexOf(k) < 0, `${k}: not a ruled-out drawing`);
}
for (const W of [288, 328, 619, 620, 704]) { const L = C.layout(W), f = W >= 620 ? 96 : 64; is(L.thing >= f && L.patient >= f, `layout ${W}: pictures ≥ ${f}`); }

console.log(`verify-story-film-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
