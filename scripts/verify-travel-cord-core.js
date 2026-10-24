#!/usr/bin/env node
/* =====================================================================
   verify-travel-cord-core.js — build-time gate for ACTIVITY #99, The
   Travelling Cord (1.MD.A.1). Its OWN oracle: the round tables are typed
   here literally, and "shorter / as long / longer than the cord" is
   len vs 6 computed here — never read off the core.
   Proves: the cord is 6 in every round (the frozen intro's promise); every
   question is decidable from the three tags alone and its answer is the
   oracle's max / min / equal / sort; tall rounds use one picture, heights
   3–9, and in the trap rounds the highest TOP is not the answer; over 300
   showings the answer sits in each place 28–39 %, is the rightmost end
   ≤ 40 %, (tall) has the highest top ≤ 50 %, close calls keep their rivals
   in different directions every time, illusion rounds keep their places;
   the drawn geometry is the length (x1 − x0 = len) and stays on the wall;
   the measure / choose / place / Check ladder; the plan; the strings.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const MT = path.join(__dirname, '..', 'mini tools');
const CORE = path.join(process.env.TC_CORE_DIR || MT, 'travel-cord-core.js'); /* the mutation harness points this at a mutated copy */
const C = require(CORE);
const SRC = fs.readFileSync(path.join(MT, 'travel-cord-activity.js'), 'utf8');
const A = (() => { const ctx = { window: {}, TravelCordCore: C }; vm.createContext(ctx); vm.runInContext(SRC + ';this.__A = TravelCordActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const CORD = 6;
const tag = (len) => len < CORD ? 'short' : len > CORD ? 'long' : 'same';

/* ---- the tables, typed literally (design §6) ---- */
const MIXED = {
  L1: 'long red8H blue5S green3C', L2: 'long blue4H green9C yellow6S', L3: 'long purple7C red6H orange3S', L4: 'long green6H yellow10C blue2S', L5: 'long orange6H red7C purple4S', L6: 'long blue9H red6S green5C', L7: 'long yellow3S purple6H orange7C',
  S1: 'short red4C blue7H green9S', S2: 'short blue8C green6H yellow2S', S3: 'short red9H purple6S orange3C', S4: 'short green5H yellow6S blue10C', S5: 'short orange7C red6H purple5S', S6: 'short blue6H green9C yellow5S', S7: 'short purple3H orange8S red7C',
  C1: 'same red6C blue8H green3S', C2: 'same blue4S green6H yellow9C', C3: 'same red6H purple2S orange9C', C4: 'same green7C yellow6S blue5H', C5: 'same orange6H red7C purple4S', C6: 'same blue5C green7H yellow6S', C7: 'same purple6S orange3H red10C'
};
const ORDER = { O1: 'red8H blue6S green4C', O2: 'yellow3C purple6H orange9S', O3: 'blue7H green6C red5S', O4: 'orange2S yellow6C purple10H', O5: 'green9C red4H blue6S', O6: 'purple5H orange7S yellow6C', O7: 'red6H green3S blue8C' };
const TALL = { T1: 'long candle 8 5 4', T2: 'short bottle 7 9 3', T3: 'same candle 4 6 9', T4: 'long bottle 9 5 6', T5: 'short candle 8 5 7', T6: 'same bottle 6 3 8', T7: 'long candle 4 7 5', T8: 'short bottle 8 6 5', T9: 'same candle 9 6 3' };
const TALL_ORDER = { TO1: 'candle 7 6 4', TO2: 'bottle 3 6 8', TO3: 'candle 6 9 5', TO4: 'bottle 9 6 3', TO5: 'candle 6 4 7', TO6: 'bottle 5 6 9', TO7: 'candle 8 3 6' };
const CLOSE = ['L3', 'L5', 'L7', 'S4', 'S5', 'S6', 'C4', 'C5', 'C6'], ILLUSION = ['L5', 'S4', 'S7'], TRAP = ['T4', 'T8'];
const STAND_H = { stool: 0.8, box: 2, shelf: 4 };
const parseRib = (s) => s.split(' ').map(x => { const m = x.match(/^([a-z]+)(\d+)([HSC])$/); return { id: m[1], len: +m[2], home: m[3] }; });

/* ---- the rounds against the literal tables ---- */
ok(C.CORD === CORD && C.DATA.CORD === CORD, 'the cord is 6');
const check = (q, t, table, kindOf, itemsOf) => {
  ok(JSON.stringify(C.ids(q, t).slice().sort()) === JSON.stringify(Object.keys(table).sort()), `${q} ${t}: the round ids match the design`);
  for (const id of Object.keys(table)) {
    const r = C.round(q, t, id), want = itemsOf(table[id]), kind = kindOf(table[id]), w = `${q} ${t} ${id}`;
    ok(r.cord === CORD, `${w}: the cord is 6`);
    ok(r.kind === kind && JSON.stringify(r.items.map(x => [x.id, x.len])) === JSON.stringify(want.map(x => [x.id, x.len])), `${w}: items and kind as typed`);
    const tags = want.map(x => tag(x.len));
    if (kind === 'order') {
      ok(tags.slice().sort().join() === 'long,same,short', `${w}: one shorter, one as long, one longer`);
      ok(JSON.stringify(C.answer(r)) === JSON.stringify(want.slice().sort((a, b) => a.len - b.len).map(x => x.id)), `${w}: the order is the sort by length`);
    } else {
      const need = kind, hits = want.filter(x => tag(x.len) === need);
      ok(hits.length === 1, `${w}: exactly one ${need} — decidable from the tags alone`);
      const own = kind === 'long' ? want.reduce((a, b) => (b.len > a.len ? b : a)) : kind === 'short' ? want.reduce((a, b) => (b.len < a.len ? b : a)) : hits[0];
      ok(C.answer(r) === own.id && hits[0].id === own.id, `${w}: the answer ${C.answer(r)} is the oracle's ${own.id}`);
    }
    for (const x of r.items) ok(C.tagOf(r, x.id) === tag(x.len), `${w} ${x.id}: tag by length`);
    ok(new Set(r.items.map(x => x.id)).size === 3, `${w}: three different things`);
  }
};
check('mixed', 'ribbons', MIXED, (s) => s.split(' ')[0], (s) => parseRib(s.split(' ').slice(1).join(' ')));
check('order', 'ribbons', ORDER, () => 'order', parseRib);
const parseTall = (s, k) => { const p = s.split(' ').slice(k); return [0, 1, 2].map(i => ({ id: ['stool', 'box', 'shelf'][i], len: +p[i + 1] })); };
check('mixed', 'tall', TALL, (s) => s.split(' ')[0], (s) => parseTall(s, 1));
check('order', 'tall', TALL_ORDER, () => 'order', (s) => parseTall(s, 0));
for (const [tb, q] of [[TALL, 'mixed'], [TALL_ORDER, 'order']]) for (const id of Object.keys(tb)) {
  const r = C.round(q, 'tall', id), pic = tb[id].split(' ')[q === 'mixed' ? 1 : 0];
  ok(r.pic === pic && ['candle', 'bottle'].indexOf(r.pic) >= 0, `tall ${id}: one picture (${pic})`);
  ok(r.items.every(x => x.len >= 3 && x.len <= 9), `tall ${id}: heights 3–9`);
}
for (const k of ['long', 'short', 'same']) ok(Object.keys(MIXED).filter(id => MIXED[id].startsWith(k)).length === 7, `mixed: seven ${k} rounds`);

/* ---- traps (default stands): T4 (tallest) the highest TOP is not the tallest; T8 (shortest) the lowest TOP is not the shortest — judging by the tops fails ---- */
for (const id of TRAP) {
  const r = C.round('mixed', 'tall', id), lay = C.layout(r, Math.random), floor = C.WALL.tall.H - 0.4;
  ok(r.items.every(x => lay.place[x.id] === x.home), `${id}: the trap keeps its stands`);
  const tops = r.items.map(x => ({ id: x.id, top: floor - STAND_H[lay.place[x.id]] - x.len })).sort((a, b) => a.top - b.top);
  const eye = r.kind === 'long' ? tops[0].id : tops[tops.length - 1].id;
  ok(eye !== C.answer(r), `${id}: judging by the tops gives ${eye}, not the answer ${C.answer(r)}`);
  ok(tops[0].id === 'shelf', `${id}: the thing on the high shelf reaches highest`);
}

/* ---- positions over 300 showings ---- */
let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
{
  const cnt = { H: 0, S: 0, C: 0 }; let n = 0, right = 0, closeOk = 0, closeN = 0, illOk = 0, illN = 0;
  for (let k = 0; k < 300; k++) for (const id of Object.keys(MIXED)) {
    const r = C.round('mixed', 'ribbons', id), lay = C.layout(r, rnd), g = C.geom(r, lay), a = C.answer(r);
    cnt[lay.place[a]]++; n++;
    const ends = r.items.map(x => [x.id, g[x.id].x1]).sort((u, v) => v[1] - u[1]); if (ends[0][0] === a) right++;
    if (CLOSE.indexOf(id) >= 0) { const rival = r.items.find(x => x.id !== a && Math.abs(x.len - C.item(r, a).len) === 1 && ((lay.place[x.id] === 'H') !== (lay.place[a] === 'H'))); closeN++; if (rival) closeOk++; }
    if (ILLUSION.indexOf(id) >= 0) { illN++; if (r.items.every(x => lay.place[x.id] === x.home)) illOk++; }
    for (const x of r.items) { const o = lay.off[x.id]; if (!(o >= 0 && o <= 2 && o * 2 === Math.round(o * 2))) { ok(false, `${id}: offset ${o} outside 0–2 in halves`); } }
  }
  for (const p of ['H', 'S', 'C']) { const f = cnt[p] / n; ok(f >= 0.28 && f <= 0.39, `mixed: the answer sits ${p === 'H' ? 'on the hook' : p === 'S' ? 'on the shelf' : 'on the counter'} ${(f * 100).toFixed(1)} % (28–39)`); }
  ok(right / n <= 0.40, `mixed: the answer is the rightmost end ${(right / n * 100).toFixed(1)} % (≤ 40)`);
  ok(closeOk === closeN, `close calls: answer and a 1-unit rival lie in different directions in every showing (${closeOk}/${closeN})`);
  ok(illOk === illN, `illusion rounds keep their places (${illOk}/${illN})`);
}
{
  let top = 0, n = 0;
  for (let k = 0; k < 300; k++) for (const id of Object.keys(TALL)) { const r = C.round('mixed', 'tall', id), lay = C.layout(r, rnd), g = C.geom(r, lay), a = C.answer(r); const hi = r.items.map(x => [x.id, g[x.id].top]).sort((u, v) => u[1] - v[1])[0][0]; if (hi === a) top++; n++; }
  ok(top / n <= 0.50, `tall: the answer has the highest top ${(top / n * 100).toFixed(1)} % (≤ 50)`);
}

/* ---- geometry: the drawing IS the length, and stays on the wall ---- */
for (const [q, t] of [['mixed', 'ribbons'], ['order', 'ribbons'], ['mixed', 'tall'], ['order', 'tall']]) for (const id of C.ids(q, t)) for (let k = 0; k < 20; k++) {
  const r = C.round(q, t, id), lay = C.layout(r, rnd), g = C.geom(r, lay), W = C.WALL[t];
  for (const x of r.items) {
    const q2 = g[x.id], L = Math.hypot(q2.x1 - q2.x0, q2.y1 - q2.y0);
    if (Math.abs(L - x.len) > 1e-9) ok(false, `${id} ${x.id}: drawn ${L} for length ${x.len}`);
    if (Math.min(q2.x0, q2.x1) < 0.2 || Math.max(q2.x0, q2.x1) > W.W - 0.2 || Math.min(q2.y0, q2.y1) < 0.2 || Math.max(q2.y0, q2.y1) > W.H) ok(false, `${id} ${x.id}: off the wall`);
  }
  if (t === 'ribbons') { const laid = r.items.map(x => g[x.id]).filter(q2 => q2.dir === 'h').map(q2 => q2.x0 + C.CORD); ok(laid.every(e => e <= W.W - 0.4), `${id}: the laid cord stays on the wall`); }
}

/* ---- the hand: the cord must visit all three before Check takes an answer ---- */
for (const [q, t] of [['mixed', 'ribbons'], ['order', 'ribbons'], ['mixed', 'tall'], ['order', 'tall']]) for (const id of C.ids(q, t)) {
  const r = C.round(q, t, id), w = `${q} ${t} ${id}`, T = t === 'tall' ? 'Tall' : '';
  let st = C.newState(r, C.layout(r, rnd));
  ok(C.check(st).result === 'none' && st.misses === 0 && C.hint(st).key === 'hintTagFirst' + T, `${w}: Check with no tags → hintTagFirst${T}, no miss`);
  /* the right answer chosen by eye, before the cord has been to all three: still refused, no miss */
  if (r.kind === 'order') C.answer(r).forEach((id2, i) => C.place(st, id2, i)); else C.choose(st, C.answer(r));
  C.measure(st, r.items[0].id); C.measure(st, r.items[1].id);
  ok(C.check(st).result === 'none' && !st.done && st.misses === 0 && C.hint(st).key === 'hintTagFirst' + T, `${w}: the right answer with two tags → still hintTagFirst${T}, no miss`);
  st = C.newState(r, C.layout(r, rnd));
  for (const x of r.items) ok(C.measure(st, x.id) === tag(x.len) && st.tags[x.id] === tag(x.len) && st.laid === x.id, `${w} ${x.id}: the cord says ${tag(x.len)}`);
  if (r.kind === 'order') {
    const ans = C.answer(r), rev = ans.slice().reverse();
    C.place(st, rev[0], 0); ok(C.check(st).result === 'none' && C.hint(st).key === 'hintFill', `${w}: a part-filled rail → hintFill`);
    rev.forEach((id2, i) => C.place(st, id2, i));
    ok(C.check(st).result === 'miss' && st.misses === 1 && C.hint(st).key === 'hintOrder' + T, `${w}: longest first → miss, hintOrder${T}`);
    C.check(st); ok(C.hint(st).key === 'hintTags2' + T, `${w}: miss 2 → hintTags2${T}`);
    ans.forEach((id2, i) => C.place(st, id2, i)); ok(st.slots.join() === ans.join(), `${w}: places and swaps set the rail`);
    ok(C.check(st).result === 'ok' && st.done, `${w}: shortest first is right`);
    const ko = C.okOf(st); ok(ko.key === 'okOrder' + T && ko.order.join() === ans.join(), `${w}: ${ko.key}`);
  } else {
    const a2 = C.answer(r), wrong = r.items.find(x => x.id !== a2).id;
    ok(C.check(st).result === 'none' && st.misses === 0 && C.hint(st).key === 'hintNone' + T, `${w}: three tags, nothing chosen → hintNone${T}, no miss`);
    C.choose(st, wrong);
    ok(C.check(st).result === 'miss' && st.misses === 1 && C.hint(st).key === (r.kind === 'long' ? 'hintLong' : r.kind === 'short' ? 'hintShort' : 'hintSame') + T, `${w}: a wrong choice → miss, ${C.hint(st).key}`);
    C.check(st); ok(C.hint(st).key === 'hintTags2' + T && st.show === 2, `${w}: miss 2 → hintTags2${T}`);
    C.choose(st, a2); ok(st.last === null && st.show === 0, `${w}: a new choice takes the help away`);
    ok(C.check(st).result === 'ok' && st.done, `${w}: ${a2} is right`);
    const ko = C.okOf(st); ok(ko.id === a2 && ko.key === (r.kind === 'long' ? 'okLong' : r.kind === 'short' ? 'okShort' : 'okSame') + T, `${w}: ${ko.key}`);
  }
  ok(C.measure(st, r.items[0].id) === null && C.choose(st, r.items[0].id) === 'no', `${w}: nothing moves once done`);
}

/* ---- the plan ---- */
const mk = (sd) => () => { sd = (sd * 16807) % 2147483647; return (sd - 1) / 2147483646; };
for (const [q, t] of [['mixed', 'ribbons'], ['order', 'ribbons'], ['mixed', 'tall'], ['order', 'tall']]) {
  let prev = null, diff = 0;
  for (let k = 0; k < 60; k++) {
    const p = C.plan(q, t, rnd, prev), ids = C.ids(q, t);
    ok(p.order.length === ids.length && new Set(p.order).size === ids.length, `${q} ${t} plan ${k}: a permutation`);
    ok(!prev || p.order.join() !== prev.join(), `${q} ${t} plan ${k}: never the previous order`);
    if (q === 'mixed') { let bad = 0; for (let i = 2; i < p.order.length; i++) { const kk = p.order.slice(i - 2, i + 1).map(id => C.round(q, t, id).kind); if (kk[0] === kk[1] && kk[1] === kk[2]) bad++; } ok(bad === 0, `${q} ${t} plan ${k}: one question never three times in a row`); }
    if (prev && p.order[0] !== prev[0]) diff++; prev = p.order;
  }
  ok(diff >= 25, `${q} ${t}: the first round varies (${diff}/59)`);
  for (const sd of [3, 11, 29]) { const p1 = C.plan(q, t, mk(sd)), p2 = C.plan(q, t, mk(sd), p1.order); ok(p2.order.join() !== p1.order.join(), `${q} ${t} seed ${sd}: the same seed after the same order gives a new order`); }
}

/* ---- strings ---- */
const S = A.strings, keys = Object.keys(S);
for (const k of keys) {
  ok(LOCS.every(l => typeof S[k][l] === 'string' && S[k][l].length > 0), `${k}: 11 locales`);
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  ok(LOCS.every(l => ph(S[k][l]) === ph(S[k].en)), `${k}: the same placeholders in every locale`);
  if (/^hint/.test(k)) ok(!/\{\w+\}/.test(S[k].en) && LOCS.every(l => !/\d/.test(S[k][l])), `${k}: a hint names no thing and no number`);
}
for (const l of LOCS) { const R2 = A.RIBBON[l]; ok(R2 && C.DATA.COLOURS.every(c => typeof R2[c] === 'string' && R2[c].length) && new Set(Object.values(R2)).size === 6, `${l}: six distinct ribbon phrases`); }
const body = SRC.slice(SRC.indexOf('/*RIBBON-END*/')) + fs.readFileSync(CORE, 'utf8');
const SHELL = { instrBubble: 'promptKey (shell)', okBubble: 'celebrateKey (shell)', title: 'shell title' };
const DYN = { tLong: "'tLong' built as k + 'Tall'", tShort: 'k', tSame: 'k', tOrder: 'k', tLongTall: 'k + Tall', tShortTall: 'k + Tall', tSameTall: 'k + Tall', tOrderTall: 'k + Tall', aSlot1: "'aSlot' + (i + 1)", aSlot2: 'same', aSlot3: 'same', on_stool: "'on_' + stand", on_box: 'same', on_shelf: 'same', placeH: "'place' + place", placeS: 'same', placeC: 'same', tagShort: "tagText + Tall", tagSame: 'same', tagLong: 'same', tagShortTall: 'same', tagSameTall: 'same', tagLongTall: 'same', hintLongTall: "core: kind key + 'Tall'", hintTagFirstTall: "core: 'hintTagFirst' + 'Tall'", hintTags2Tall: "core: 'hintTags2' + T", hintShortTall: 'same', hintSameTall: 'same', hintOrderTall: 'same', okLongTall: "core: + 'Tall'", okShortTall: 'same', okSameTall: 'same', okOrderTall: 'core literal' };
for (const k of keys) ok(SHELL[k] || DYN[k] || body.indexOf("'" + k + "'") >= 0, `${k}: reached by the activity or the core`);
/* the dynamic keys really are built: their stems appear in the source */
for (const stem of ["'hintTagFirst'", "'hintTags2'", "'tLong'", "'aSlot'", "'on_'", "'place'", "'tagShort'", "'hintLong'", "'okLong'", "'okOrderTall'", "'Tall'"]) ok(body.indexOf(stem) >= 0, `the source builds keys from ${stem}`);

console.log(`verify-travel-cord-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
