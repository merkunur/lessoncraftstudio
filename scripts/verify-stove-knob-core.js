#!/usr/bin/env node
/* =====================================================================
   verify-stove-knob-core.js — the build gate for ACTIVITY #134, The Stove
   Knob (Pesto's Soup Stall, L.1.5.d), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core's answers. Its own ground truth:
     · the English ladders, written out here (the anchor every locale's
       ladder is built against: same ids, same length, ranks ascending);
     · its own grading rule for every kind of round (a word is right on a
       click iff its rank is that click; between: the middle word; twins:
       the twin; go/look: the right field AND the right rank), applied to
       thousands of random placements and compared with check().
   Data: every ladder three distinct words (four where a 4-word ladder
   exists), no ticket holds a word of its own ladder or the start of one
   (pytte → pytteliten), every said ticket has its blank, decoys outside
   their ladder, ≥7 twin rounds with three different words and the twin
   never on a different click of a ladder, five going words that are not
   looking words, creep and stroll never on one knob. Then the model
   (empty = a hint, no miss; a wrong word = a jump at exactly the wrong
   clicks; miss 2 = the stronger showing; a move takes it away), the plan
   (fresh order, the shelf never in order or reversed, bots no better
   than chance, level 2 answers 7/7/7), strings ×11, prose and manifest.
   Usage: node scripts/verify-stove-knob-core.js   (SK_CORE / SK_ACT / SK_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.SK_CORE || path.join(MINI, 'stove-knob-core.js');
const ACTF = process.env.SK_ACT || path.join(MINI, 'stove-knob-activity.js');
const MAN = process.env.SK_MANIFEST || path.join(MINI, 'shades-activities.json');
const ID = 'shades.pick.l-1-5-d';
const C = require(CORE), D = C.DATA;
const ACT = (() => { const ctx = { window: {}, StoveKnobCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.StoveKnobActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };

/* ---------- the gate's own truth ---------- */
const EN = { heat: ['warm', 'hot', 'boiling'], cold: ['cool', 'cold', 'freezing'], wet: ['damp', 'wet', 'soaked'], voice: ['whisper', 'talk', 'shout'], said: ['whispered', 'said', 'shouted'], size: ['small', 'big', 'huge'], speed: ['stroll', 'run', 'dash'], time: ['glance', 'look', 'stare'] };
const EN_ANSWER = ['warm', 'boiling', 'damp', 'soaked', 'whisper', 'shout', 'small', 'huge', 'stroll', 'dash', 'glance', 'stare', 'talk', 'big', 'whispered', 'said', 'shouted'];
const IDS = Object.keys(EN);
const stems = (w) => w.toLowerCase().split(/[\s'’]+/).filter(p => p.length >= 4).map(p => p.slice(0, Math.max(4, p.length - 2)));
const holds = (text, w) => {
  const t = text.toLowerCase().replace(/_+/g, ' '), parts = w.toLowerCase().split(/[\s'’]+/);
  if (stems(w).some(s => new RegExp('(?<!\\p{L})' + s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u').test(t))) return true;
  return (t.match(/\p{L}+/gu) || []).some(x => x.length >= 4 && parts.some(p => p.length > x.length && p.startsWith(x)));
};
const exists = (pic) => fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', pic + '@2x.webp'));
ok(exists('kitchen tools/pot') && exists('kitchen tools/bowl'), 'the pot and the bowl pictures exist');
ok(JSON.stringify(D.IDS) === JSON.stringify(IDS), 'the eight ladders, in order');
IDS.forEach(id => ok(JSON.stringify(D.en.lad[id].w3) === JSON.stringify(EN[id]), `en ${id}: the anchor ladder ${EN[id].join(' < ')}`));
D.ORD.forEach(([id, a], i) => ok(EN[id][a - 1] === EN_ANSWER[i], `en ticket ${i + 1}: the answer is ${EN_ANSWER[i]}`));
/* level 2: the answers' ranks are 7/7/7 of 21 (the knob starts at click 1, so "don't turn" is chance) */
{ const cnt = [0, 0, 0]; D.ORD.forEach(([, a]) => cnt[a - 1]++); D.BETWEEN.forEach(() => cnt[1]++); ok(cnt.join() === '7,7,7', `level 2 answer ranks 7/7/7 (${cnt})`); }
ok(D.GO_ROUNDS.length === 7 && D.GO_ROUNDS.every(g => g.length === 3 && !(g.indexOf(0) >= 0 && g.indexOf(1) >= 0) && g.every((x, i) => i === 0 || x > g[i - 1])), 'go rounds: three going words each, creep and stroll never together, slow to fast');

/* ---------- 1. the data, per locale ---------- */
for (const l of LOCS) {
  const L = D[l];
  ok(!!L, `${l}: data present`); if (!L) continue;
  IDS.forEach(id => {
    const w3 = L.lad[id].w3, w4 = L.lad[id].w4;
    ok(w3.length === 3 && new Set(w3.map(x => x.toLowerCase())).size === 3 && w3.every(x => x && x === x.trim()), `${l} ${id}: three different words (${w3})`);
    if (w4) ok(w4.length === 4 && new Set(w4.map(x => x.toLowerCase())).size === 4, `${l} ${id}: four different words (${w4})`);
    if (l === 'fr' || l === 'it') ok(w3.concat(w4 || []).every(x => x.indexOf("'") < 0), `${l} ${id}: typographic apostrophes`);
  });
  ok(L.tickets.length === D.ORD.length, `${l}: ${D.ORD.length} tickets`);
  D.ORD.forEach(([id], i) => {
    const t = L.tickets[i], lad = L.lad[id].w3.concat(L.lad[id].w4 || []);
    lad.forEach(w => ok(!holds(t, w), `${l} ticket ${i + 1} («${t}») never holds «${w}» of its ladder`));
    ok(/[.!?»”"]$/.test(t.trim()) && /^[\p{Lu}«“”"„—–¡¿]/u.test(t), `${l} ticket ${i + 1}: a whole sentence`);
    if (id === 'said') ok(/_{3}/.test(t), `${l} ticket ${i + 1}: the said ticket has its blank`);
    if (l === 'fr') ok(!/ [:!?;»]/.test(t) && t.indexOf("'") < 0, `fr ticket ${i + 1}: French typography`);
  });
  D.BETWEEN.forEach(([id]) => { const d = L.decoy[id]; ok(d && d.length >= 1 && d.every(x => L.lad[id].w3.indexOf(x) < 0), `${l} between ${id}: decoys outside the ladder (${d})`); });
  ok(L.twins.length >= 7, `${l}: at least seven twin rounds`);
  L.twins.forEach((t, i) => {
    ok(t.length === 3 && new Set(t.map(x => x.toLowerCase())).size === 3, `${l} twin ${i + 1}: three different words`);
    IDS.forEach(id => { const w = L.lad[id].w4 || L.lad[id].w3, a = w.indexOf(t[0]), b = w.indexOf(t[1]); ok(!(a >= 0 && b >= 0 && a !== b), `${l} twin ${i + 1}: ${t[0]} and ${t[1]} are not on different clicks of the ${id} ladder`); });
  });
  ok(L.go.length === 5 && new Set(L.go).size === 5 && L.go.every(g => L.lad.time.w3.indexOf(g) < 0), `${l}: five going words, none a looking word`);
  ok(L.field.length === 2 && L.field[0] !== L.field[1], `${l}: two field words`);
}

/* ---------- 2. the model, graded by the gate's own rule ---------- */
let seed = 7; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const ownAt = (rd, w, j) => {
  const W = rd.windows[w]; if (j == null) return false; const t = rd.tiles[j];
  if (rd.kind === 'order') return t.rank === W.click + 1 && t.kind === 'ladder';
  if (rd.kind === 'between') return w !== 1 || (t.kind === 'ladder' && t.rank === 2);
  if (rd.kind === 'twin') return w === 0 || t.kind === 'twin';
  if (rd.kind === 'golook') return t.knob === W.knob && t.rank === W.click + 1;
  return true;
};
const own = (rd, win) => rd.windows.every((_, w) => ownAt(rd, w, win[w]));
for (const l of LOCS) for (const lv of ['1', '3', '4']) for (const r of C.rounds(lv)) for (const words of (lv === '1' ? [3, 4] : [3])) {
  for (let trial = 0; trial < 12; trial++) {
    const st = C.newState(l, lv, r, { words }), rd = st.rd, open = rd.windows.map((_, w) => w).filter(w => rd.fixed[w] == null);
    const free = rd.tiles.map((_, j) => j).filter(j => st.win.indexOf(j) < 0), pick = free.slice().sort(() => rnd() - 0.5);
    open.forEach((w, i) => { if (pick[i] != null) C.place(st, pick[i], w); });
    /* the invention: the soup follows the WORD on a click (its rank), never the click itself; a word of the wrong field or a trap is grey */
    rd.windows.forEach((W, w) => {
      const j = st.win[w]; if (j == null) return; const t = rd.tiles[j], n = rd.kind === 'golook' ? 3 : rd.knobs[W.knob].n;
      const want = rd.kind === 'twin' ? (t.kind === 'other' ? 'grey' : 0.7) : (rd.kind === 'golook' && t.knob !== W.knob) ? 'grey' : 0.12 + 0.88 * (t.rank - 1) / (n - 1), got = C.soupAt(st, w);
      ok(typeof want === 'string' ? got === want : Math.abs(got - want) < 1e-9, `${l} L${lv}.${r + 1}: the soup on click ${W.click + 1} is the strength of «${t.text}» (${got} vs ${want})`);
    });
    const want = own(rd, st.win), res = C.check(st);
    ok((res.result === 'ok') === want, `${l} L${lv}.${r + 1}/${words}: check() agrees with the gate's rule (${res.result}, want ${want ? 'ok' : 'miss'})`);
    if (res.result === 'miss') { const wrong = rd.windows.map((_, w) => w).filter(w => !ownAt(rd, w, st.win[w])); ok(res.jumped.join() === wrong.join(), `${l} L${lv}.${r + 1}: the soup jumps at exactly the wrong clicks (${res.jumped} vs ${wrong})`); }
  }
}
for (const l of LOCS) for (const r of C.rounds('2')) {
  const st = C.newState(l, '2', r), rd = st.rd;
  if (rd.kind === 'pick') {
    ok(rd.tiles.map(t => t.text).join() === D[l].lad[rd.knobs[0].ladder].w3.join() && st.win.every(x => x != null), `${l} L2.${r + 1}: the knob holds its ladder in order`);
    ok(st.knob[0] === 0, `${l} L2.${r + 1}: the knob starts at the smallest flame`);
    ok(rd.tiles[rd.answer].text === D[l].lad[D.ORD[r][0]].w3[D.ORD[r][1] - 1], `${l} L2.${r + 1}: the answer is the ticket's word`);
    for (let c = 0; c < 3; c++) { const s2 = C.newState(l, '2', r); C.turn(s2, 0, c); ok((C.check(s2).result === 'ok') === (c === rd.answer), `${l} L2.${r + 1}: serving at click ${c + 1} is ${c === rd.answer ? 'right' : 'wrong'}`); }
  } else {
    ok(rd.kind === 'between' && rd.tiles[rd.answer].rank === 2 && rd.tiles[rd.answer].text === D[l].lad[rd.knobs[0].ladder].w3[1], `${l} L2.${r + 1}: between — the middle word is the answer`);
    rd.tiles.forEach((t, j) => { if (st.win.indexOf(j) >= 0) return; const s2 = C.newState(l, '2', r); C.place(s2, j, 1); ok((C.check(s2).result === 'ok') === (j === rd.answer), `${l} L2.${r + 1}: «${t.text}» in the middle is ${j === rd.answer ? 'right' : 'wrong'}`); });
  }
}
/* the moves: empty, miss, miss 2, a move takes the help away, done takes no more */
{
  let st = C.newState('en', '1', 0); ok(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', 'empty clicks: a hint, no miss');
  const rank = (j) => st.rd.tiles[j].rank, js = st.rd.tiles.map((_, j) => j);
  const r1 = js.find(j => rank(j) === 1), r2 = js.find(j => rank(j) === 2), r3 = js.find(j => rank(j) === 3);
  C.place(st, r3, 0); C.place(st, r2, 1); C.place(st, r1, 2);
  let res = C.check(st); ok(res.result === 'miss' && res.jumped.join() === '0,2' && st.misses === 1 && C.hint(st) === 'missJump' && C.hintWord(st) === 'boiling' && !st.help, 'miss 1: the soup jumps at the two swapped words, the hint names the first');
  res = C.check(st); ok(st.misses === 2 && st.help && C.hint(st) === 'missGlow', 'miss 2: the stronger showing');
  C.place(st, r1, 0); ok(!st.help && st.jumped.length === 0, 'a move takes the help away');
  ok(st.win[2] === r3, 'a placed word swaps with the one it lands on');
  res = C.check(st); ok(res.result === 'ok' && st.done, 'right order → done');
  ok(C.place(st, r1, 1) === 'no' && C.check(st).result === 'done', 'a done round takes no more moves');
  st = C.newState('en', '1', 0); C.place(st, r1, 0); ok(C.pick(st, r1) === 'home' && st.win[0] === null, 'a word on the knob tapped goes back to the shelf');
  st = C.newState('en', '3', 0); ok(C.place(st, 0, 1) === 'no', 'the twin round keeps its first word');
  const other = st.rd.tiles.findIndex(t => t.kind === 'other'); C.place(st, other, 1); C.check(st); ok(C.hint(st) === 'missTwin' && C.hintWord(st) === st.rd.tiles[other].text, 'twins: the trap is named');
  st = C.newState('en', '4', 0); const lookOnGo = st.rd.tiles.map((t, j) => t.knob === 1 ? j : -1).filter(j => j >= 0), goT = st.rd.tiles.map((t, j) => t.knob === 0 ? j : -1).filter(j => j >= 0);
  lookOnGo.forEach((j, i) => C.place(st, j, i)); goT.forEach((j, i) => C.place(st, j, 3 + i)); C.check(st); ok(C.hint(st) === 'missField', 'go/look: a word on the wrong knob is named as the wrong field');
  st = C.newState('en', '2', 0); C.turn(st, 0, 2); C.check(st); ok(C.hint(st) === 'missPick' && !st.help, 'pick: miss 1 → read the ticket again'); C.check(st); ok(C.hint(st) === 'missPick2' && st.help, 'pick: miss 2 → the soup colours'); C.turn(st, 0, 1); ok(!st.help, 'pick: turning takes the help away');
}

/* ---------- 3. the plan ---------- */
for (const l of ['en', 'de', 'fi']) for (const lv of ['1', '2', '3', '4']) for (const words of (lv === '1' ? [3, 4] : [3])) {
  let prev = null, keep = 0, rev = 0, short = 0, long = 0, n1 = 0, twinFirst = 0, nt = 0, n4 = 0, keep4 = 0;
  for (let p = 0; p < 300; p++) {
    const P = C.plan(l, lv, rnd, prev, words);
    ok(P.order.slice().sort((a, b) => a - b).join() === C.rounds(lv).join(), `${l} L${lv}/${words}: a pass is every round once`);
    if (prev) ok(P.order.join() !== prev.join(), `${l} L${lv}/${words}: a fresh order every pass`);
    prev = P.order;
    P.order.forEach(r => {
      const rd = C.round(l, lv, r, { words, order: P.orders[r] });
      if (lv === '1') {
        const ranks = rd.tiles.map(t => t.rank), n = ranks.length; n1++;
        ok(ranks.join() !== ranks.slice().sort().join() && ranks.join() !== ranks.slice().sort().reverse().join(), `${l} L1.${r + 1}: the shelf is never in order or reversed`);
        const byLen = rd.tiles.map((t, j) => j).sort((a, b) => rd.tiles[a].text.length - rd.tiles[b].text.length || a - b);
        if (byLen.every((j, i) => rd.tiles[j].rank === i + 1)) short++;
        if (byLen.slice().reverse().every((j, i) => rd.tiles[j].rank === n - i)) long++;
      }
      if (lv === '3') { nt++; if (rd.tiles[1].kind === 'twin') twinFirst++; }
      if (lv === '4') { n4++; const bot = [0, 1, 2, 3, 4, 5].every(i => { const t = rd.tiles[i]; return t.knob === (i < 3 ? 0 : 1) && t.rank === i % 3 + 1; }); if (bot) keep4++; }
    });
  }
  if (lv === '1') { ok(short / n1 <= 1 / 8 + 0.02, `${l} L1/${words}: "shortest word first" wins ≤ 1/8 (${(short / n1).toFixed(3)})`); ok(long / n1 <= 1 / 8 + 0.02, `${l} L1/${words}: "longest word strongest" wins ≤ 1/8 (${(long / n1).toFixed(3)})`); }
  if (lv === '3') ok(Math.abs(twinFirst / nt - 0.5) <= 0.05, `${l} L3: the twin's shelf place balanced (${(twinFirst / nt).toFixed(3)})`);
  if (lv === '4') ok(keep4 / n4 <= 0.01, `${l} L4: "shelf order" bot never wins (${keep4}/${n4})`);
}

/* ---------- 4. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8').replace(/\/\*DATA-BEGIN\*\/[\s\S]*\/\*DATA-END\*\//, '');
const KEYS = Object.keys(S); ok(KEYS.length >= 40, 'strings: the set is there');
const HINTS = ['hintEmpty', 'hintBetween', 'hintTwin', 'missJump', 'missGlow', 'missPick', 'missPick2', 'missBetween', 'missTwin', 'missField'];
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (HINTS.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit in a hint`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;]/.test(v), `strings.${k}.fr: a narrow space before : ! ? ;`);
}
for (const l of LOCS) ok(S.instruction[l].indexOf(S.turnUp[l]) >= 0, `strings.instruction.${l} names the button «${S.turnUp[l]}»`);
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setLevel', 'l1', 'l2', 'l3', 'l4', 'setWords', 'w3', 'w4', 'setPeek', 'peekOff', 'peekOn'], BYLEVEL = ['t1', 't2', 't3', 't4'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING, BYLEVEL).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
HINTS.forEach(k => ok(new RegExp("'" + k + "'").test(fs.readFileSync(CORE, 'utf8')), `hint ${k} is dispatched by the core`));

/* ---------- 5. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  ok(all.indexOf(D[l].lad.heat.w3.join(', ')) >= 0, `prose.${l}: names the locale's own heat ladder`);
  ok(all.indexOf(S.turnUp[l]) >= 0, `prose.${l}: names the button «${S.turnUp[l]}»`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(row && row.tool === 'stove-knob-activity', 'manifest: the row points at the stove knob');
ok(row && JSON.stringify(row.params.rounds) === JSON.stringify({ '1': 8, '2': 21, '3': 8, '4': 7 }) && row.params.level.join() === '1,2,3,4' && row.params.words.join() === '3,4' && row.params.peek.join() === 'off,on', 'manifest: params match the core');
const head = JSON.parse(execSync('git show HEAD:"mini tools/shades-activities.json"', { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })).find(x => x.id === ID);
['slug', 'page_title', 'page_intro'].forEach(k => ok(row[k].en === head[k].en, `manifest: en ${k} frozen`));
LOCS.filter(l => l !== 'en').forEach(l => { ['slug', 'page_title', 'page_intro'].forEach(k => ok(row[k][l] && !FREE.test(row[k][l]) && !/Common Core/.test(row[k][l]), `manifest: ${l} ${k} authored`)); ok(/^[a-z0-9-]+$/.test(row.slug[l]), `manifest: ${l} slug url-safe`); });

console.log(`verify-stove-knob-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
