#!/usr/bin/env node
/* =====================================================================
   verify-story-stage-core.js — the gate for THE STORY STAGE (#24,
   K.OA.A.2). Its own oracle: answers recomputed here from the story
   type, numerals parsed back out of every rendered sentence in every
   locale, pictures checked on disk. Design §12 rules 1–8 + the
   activity-layer strings.
   Usage: node scripts/verify-story-stage-core.js   (SS_CORE_DIR=<dir> for mutants)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.SS_CORE_DIR || MT, 'story-stage-core.js'));
let ACT = null; try { ACT = require(path.join(MT, 'story-stage-activity.js')); } catch (e) { ACT = null; }
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const TYPE = { bird: 'add', apple: 'add', duck: 'add', bunny: 'add', balloon: 'take', cookie: 'take', fish: 'take', tulip: 'take', animals: 'put', fruits: 'put' };
const oracle = (kind, a, b) => TYPE[kind] === 'take' ? a - b : a + b;
const CEIL = { within5: 5, within10: 10, within20: 20 };
const nums = (s) => (String(s).match(/\d+/g) || []).map(Number);
const seeded = (seed) => () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

/* 0 — the locales and the kinds */
is(JSON.stringify(C.LOCALES.slice().sort()) === JSON.stringify(LOCALES.slice().sort()), 'eleven locales');
for (const k of Object.keys(TYPE)) is(C.KINDS[k] && C.KINDS[k].type === TYPE[k], `kind ${k} is ${TYPE[k]}`);

/* 1 + 3 — every round: answer recomputed, no 0, the answer never equals a number in the story */
for (const lv of ['within5', 'within10', 'within20']) {
  const R = C.rounds(lv);
  is(R.length >= 7, `${lv}: ≥ 7 rounds (${R.length})`);
  is(new Set(R.map(r => r.kind + r.a + '-' + r.b)).size === R.length, `${lv}: no two rounds the same`);
  for (const r of R) {
    const want = oracle(r.kind, r.a, r.b);
    is(r.answer === want && C.result(r) === want, `${r.id}: answer ${r.answer} = ${want}`);
    is(r.a >= 1 && r.b >= 1 && r.answer >= 1, `${r.id}: no 0 (a ${r.a}, b ${r.b}, answer ${r.answer})`);
    is(r.answer !== r.a && r.answer !== r.b, `${r.id}: the answer ${r.answer} is not a number in the story`);
    is(Math.max(r.a, r.b, r.answer) <= CEIL[lv], `${r.id}: within ${CEIL[lv]}`);
    if (lv !== 'within20') is(Math.max(r.a + (r.type === 'take' ? 0 : r.b)) <= 10, `${r.id}: fits one ten-frame`);
    else is(r.a + (r.type === 'take' ? 0 : r.b) <= 20, `${r.id}: fits two ten-frames`);
    if (lv === 'within20') is(r.a + (r.type === 'take' ? 0 : r.b) > 10 || r.a > 10, `${r.id}: within 20 needs the second frame`);
  }
}
/* each level covers all three story types */
for (const lv of ['within5', 'within10', 'within20']) for (const ty of ['add', 'take', 'put']) is(C.rounds(lv).some(r => r.type === ty), `${lv} has a ${ty} story`);

/* 2 — the stories in every locale: complete, the numerals in the text = the data, *_1 forms where a 1 appears */
for (const loc of LOCALES) {
  const S = C.STORIES[loc];
  is(!!S, `${loc}: stories exist`);
  if (!S) continue;
  for (const k of Object.keys(TYPE)) {
    const s = S[k];
    is(s && s.s0 && s.s1 && s.q && s.done, `${loc}/${k}: s0 s1 q done`);
    if (!s) continue;
    for (const key of Object.keys(s)) {
      is(/[.!?]\s*$|[!?]$/.test(s[key].trim()) || /[.!?] ?[!?]?$/.test(s[key]), `${loc}/${k}.${key} ends a sentence: "${s[key]}"`);
      is(!/\d/.test(s[key]), `${loc}/${k}.${key} carries no literal digit (only {a} {b} {n})`);
      const need = key.startsWith('s0') ? '{a}' : key.startsWith('s1') ? '{b}' : key.startsWith('done') ? '{n}' : null;
      if (need) is((s[key].split(need).length - 1) === 1, `${loc}/${k}.${key} holds ${need} exactly once`);
      else is(!/\{\w+\}/.test(s[key]), `${loc}/${k}.q holds no number`);
    }
  }
  for (const lv of ['within5', 'within10', 'within20']) for (const r of C.rounds(lv)) {
    const [s0, s1, q] = C.sentences(loc, r), done = C.line(loc, r, 'done');
    is(JSON.stringify(nums(s0)) === JSON.stringify([r.a]), `${loc} ${r.id}: narrator line says ${r.a} — "${s0}"`);
    is(JSON.stringify(nums(s1)) === JSON.stringify([r.b]), `${loc} ${r.id}: child's line says ${r.b} — "${s1}"`);
    is(nums(q).length === 0, `${loc} ${r.id}: the question names no number — "${q}"`);
    is(JSON.stringify(nums(done)) === JSON.stringify([r.answer]), `${loc} ${r.id}: the done line says ${r.answer} — "${done}"`);
    for (const v of C.needs(r)) is(!!C.STORIES[loc][r.kind][v], `${loc} ${r.id}: has the ${v} form (a 1 in the story)`);
    is(![s0, s1, q, done].some(x => /\{|\}/.test(x)), `${loc} ${r.id}: no placeholder left`);
  }
}
/* the singular forms are actually used: line() picks the _1 form for a 1 */
{
  const r = C.rounds('within5').find(x => x.kind === 'duck');
  is(C.line('en', r, 's0') === '1 duckling swims in the pond.', `en duck 1 → singular ("${C.line('en', r, 's0')}")`);
  const f = C.rounds('within5').find(x => x.kind === 'fish');
  is(C.line('en', f, 'done') === '1 fish is left!', `en fish 1 left → singular`);
  const c = C.rounds('within5').find(x => x.kind === 'cookie');
  is(C.line('fi', c, 's1') === 'Syöt 1 keksin.', `fi cookie 1 → accusative ("${C.line('fi', c, 's1')}")`);
}

/* 4 / 4b — the hand: take stories have no supply, add stories cannot take, the question needs a move */
for (const lv of ['within5', 'within10', 'within20']) for (const r of C.rounds(lv)) {
  const st = C.newState(r);
  is(C.add(st) === 'locked', `${r.id}: nothing moves while the narrator acts`);
  C.actAll(st);
  is(st.line === 1 && C.solid(st) === r.a, `${r.id}: the narrator acted ${r.a} (${C.solid(st)})`);
  is(!C.canAsk(st) && C.ask(st) === false && st.line === 1, `${r.id}: the question cannot be reached with zero moves`);
  if (r.type === 'take') {
    is(C.supplyKind(st) === -1 && C.add(st) === 'closed', `${r.id}: the pile is closed in a take story`);
    const first = st.places.findIndex(p => p);
    is(C.tap(st, first) === 'taken' && C.solid(st) === r.a - 1, `${r.id}: a tap makes one leave`);
    is(st.places[first] && st.places[first].out, `${r.id}: a taken thing stays as an outline`);
    is(C.tap(st, first) === 'restored' && C.solid(st) === r.a, `${r.id}: a tap on the outline brings it back`);
    const empty = st.places.findIndex(p => !p);
    if (empty >= 0) is(C.tap(st, empty) === 'closed', `${r.id}: an empty place cannot be filled in a take story`);
  } else {
    is(C.supplyKind(st) === (r.type === 'put' ? 1 : 0), `${r.id}: the pile gives the ${r.type === 'put' ? 'second' : 'same'} kind`);
    const first = st.places.findIndex(p => p);
    is(C.tap(st, first) === 'locked' && C.solid(st) === r.a, `${r.id}: the narrator's things cannot be taken in an add story`);
    const i = C.add(st);
    is(typeof i === 'number' && st.places[i].who === 'c', `${r.id}: the pile brings one`);
    is(C.tap(st, i) === 'back' && !st.places[i], `${r.id}: a tap sends a brought one back`);
    is(C.add(st, 9) === 9 || st.places[9], `${r.id}: a drop lands on the chosen empty place`);
    if (r.type === 'put') is(st.places.some(p => p && p.k === 1) && st.places.some(p => p && p.k === 0), `${r.id}: two kinds on the stage`);
    else is(!st.places.some(p => p && p.k !== 0), `${r.id}: one kind in an add story`);
  }
  is(C.canAsk(st) || r.type === 'take' && (C.tap(st, st.places.findIndex(p => p && !p.out)), C.canAsk(st)), `${r.id}: one move wakes the question`);
}

/* the keypad: within 5 / 10 whole numbers 1–10; within 20 digits with 0 refused first, every answer typeable */
for (const lv of ['within5', 'within10', 'within20']) for (const r of C.rounds(lv)) {
  const st = C.newState(r); C.actAll(st);
  if (r.type === 'take') C.tap(st, 0); else C.add(st);
  is(C.key(st, '3') === 'locked', `${r.id}: the keys sleep before the question`);
  C.ask(st);
  const keys = C.keypad(st);
  if (lv === 'within20') {
    is(JSON.stringify(keys) === JSON.stringify(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']), `${r.id}: digits 1–9 and 0`);
    is(C.key(st, '0') === 'refused' && st.typed === '', `${r.id}: 0 cannot start an answer`);
    for (const d of String(r.answer)) C.key(st, d);
    is(st.typed === String(r.answer), `${r.id}: ${r.answer} can be typed (${st.typed})`);
    if (r.answer > 9) is(C.key(st, '5') === 'full', `${r.id}: two digits at most`);
  } else {
    is(keys.join(',') === '1,2,3,4,5,6,7,8,9,10', `${r.id}: keys 1–10`);
    C.key(st, String(r.answer));
    is(st.typed === String(r.answer), `${r.id}: the answer key types ${r.answer}`);
  }
  is(C.del(st) && st.typed.length < String(r.answer).length, `${r.id}: delete removes`);
}

/* Check: before the question no miss; empty no miss; wrong = miss + the help ladder; right = done */
for (const r of C.rounds('within10')) {
  const st = C.newState(r); C.actAll(st);
  let res = C.check(st);
  is(res.slip === 'act' && st.misses === 0, `${r.id}: Check before acting — "act", no miss`);
  is(C.hint(st).key === 'hintAct', `${r.id}: the act hint`);
  if (r.type === 'take') C.tap(st, 0); else C.add(st);
  C.ask(st);
  res = C.check(st);
  is(res.slip === 'empty' && st.misses === 0, `${r.id}: empty Check — no miss`);
  is(C.hint(st).key === (r.type === 'take' ? 'hintAskLeft' : 'hintAsk'), `${r.id}: the ask counts ${r.type === 'take' ? 'only what is still there' : 'the stage'}`);
  C.key(st, String(r.a)); res = C.check(st);
  is(!res.ok && res.slip === 'wrong' && st.misses === 1 && st.help === 1, `${r.id}: the start number is not accepted`);
  is(/^hintReplay/.test(C.hint(st).key), `${r.id}: miss 1 → the replay hint`);
  C.key(st, String(r.b)); is(st.help === 0, `${r.id}: a keypress takes the help away`);
  res = C.check(st);
  is(!res.ok && st.misses === 2 && st.help === 2, `${r.id}: the change number is not accepted`);
  is(C.hint(st).key === (r.type === 'take' ? 'hintBright' : 'hintEvery') && C.hint(st).more === 'hintNumbers', `${r.id}: miss 2 hint`);
  C.key(st, String(r.answer)); res = C.check(st);
  is(res.ok && st.done, `${r.id}: the answer finishes`);
  is(C.check(st) === null, `${r.id}: nothing after done`);
  is(C.tap(st, 0) === 'locked' && C.key(st, '1') === 'locked', `${r.id}: the stage locks when done`);
}

/* 5 — outlines are not counted; the replay ends on the TRUE story whatever the child acted */
{
  const rand = seeded(7);
  for (const lv of ['within5', 'within10', 'within20']) for (const r of C.rounds(lv)) for (let trial = 0; trial < 40; trial++) {
    const st = C.newState(r); C.actAll(st);
    const moves = 1 + Math.floor(rand() * 8);
    for (let m = 0; m < moves; m++) {
      if (r.type === 'take') { const i = Math.floor(rand() * st.places.length); C.tap(st, i); }
      else if (rand() < 0.8) C.add(st, Math.floor(rand() * st.places.length)); else { const kids = st.places.map((p, i) => p && p.who === 'c' ? i : -1).filter(i => i >= 0); if (kids.length) C.tap(st, kids[0]); }
    }
    const outs = st.places.filter(p => p && p.out).length;
    is(C.solid(st) === st.places.filter(p => p).length - outs, `${r.id}: solid excludes outlines`);
    const k = C.acted(st);
    const script = C.replayScript(st);
    is(script.start.length === r.a, `${r.id}: the replay re-acts ${r.a} first (${script.start.length})`);
    is(script.change.length === r.b, `${r.id}: the replay acts the TRUE change ${r.b}, not the child's ${k} (${script.change.length})`);
    C.settle(st);
    is(C.solid(st) === r.answer && C.acted(st) === r.b, `${r.id}: after the replay the stage tells the true story (${C.solid(st)} solid)`);
    is(st.places.filter(p => p && p.who === 's').length === r.a, `${r.id}: the narrator's things are all still there`);
  }
}

/* the numbers on the things: miss 2 → 1 … n−1 and '?', never the answer; done → 1 … n */
for (const lv of ['within5', 'within10', 'within20']) for (const r of C.rounds(lv)) {
  const st = C.newState(r); C.actAll(st);
  if (r.type === 'take') C.tap(st, 0); else C.add(st);
  C.ask(st);
  is(C.chips(st).every(c => c === ''), `${r.id}: no numbers before a miss`);
  C.key(st, r.answer === 1 ? '2' : '1'); C.check(st); C.settle(st);
  is(C.chips(st).every(c => c === ''), `${r.id}: no numbers after miss 1`);
  C.key(st, r.answer === 2 ? '3' : '2'); C.check(st);
  const ch = C.chips(st).filter(c => c !== '');
  is(ch.length === r.answer && ch[ch.length - 1] === '?' && !ch.includes(r.answer), `${r.id}: miss 2 numbers to ${r.answer - 1} then "?" (${ch.join(' ')})`);
  is(st.places.every((p, i) => !(p && p.out) || C.chips(st)[i] === ''), `${r.id}: outlines stay unnumbered`);
  st.typed = ''; C.key(st, r.level === 'within20' ? String(r.answer)[0] : String(r.answer)); if (r.level === 'within20' && r.answer > 9) C.key(st, String(r.answer)[1]);
  C.check(st);
  const dc = C.chips(st).filter(c => c !== '');
  is(st.done && dc.length === r.answer && dc[dc.length - 1] === r.answer, `${r.id}: done numbers 1 … ${r.answer}`);
}

/* 6 — the order: 10 000 seeds per level, chained passes */
for (const lv of ['within5', 'within10', 'within20']) {
  const pool = C.rounds(lv); let bad = 0, same = 0, seam = 0;
  const rand = seeded(lv.length * 977);
  let prev = null;
  for (let s = 0; s < 10000; s++) {
    const o = C.order(pool, rand, prev);
    if (o.length !== pool.length || new Set(o).size !== pool.length) { bad++; continue; }
    for (let i = 1; i < o.length; i++) {
      if (pool[o[i]].answer === pool[o[i - 1]].answer) bad++;
      if (i > 1 && pool[o[i]].type === pool[o[i - 1]].type && pool[o[i]].type === pool[o[i - 2]].type) bad++;
    }
    if (prev && prev.join(',') === o.join(',')) same++;
    if (prev && o[0] === prev[prev.length - 1]) seam++;
    prev = o;
  }
  is(bad === 0, `${lv}: 10 000 orders — no equal answers side by side, no type run of 3 (${bad} bad)`);
  is(same === 0, `${lv}: never the same order twice in a row (${same})`);
  is(seam === 0, `${lv}: a pass never opens on the story the last one closed on (${seam})`);
  /* a fixed random source repeats itself: the next pass must still differ */
  const zero = () => 0, o1 = C.order(pool, zero, null), o2 = C.order(pool, zero, o1), o3 = C.order(pool, () => 0.999, o2);
  is(o1.join(',') !== o2.join(',') && o2.join(',') !== o3.join(','), `${lv}: a repeating random source still never repeats the order (${o1.join('')} / ${o2.join('')})`);
}

/* 7 — within 20 = two frames of drawn counters; within 5 / 10 = one frame of pictures */
for (const lv of ['within5', 'within10', 'within20']) for (const r of C.rounds(lv)) {
  const st = C.newState(r);
  is(st.frames === (lv === 'within20' ? 2 : 1) && st.counters === (lv === 'within20') && st.places.length === st.frames * 10, `${r.id}: ${st.frames} frame(s), counters ${st.counters}`);
}

/* 8 — every picture exists in its colour theme's index and on disk */
for (const k of Object.keys(C.KINDS)) for (const p of C.KINDS[k].pics) {
  const [dir, key] = C.PICS[p] || [];
  is(!!dir, `${k}: picture ${p} is mapped`);
  if (!dir) continue;
  is(!/(\s|^)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(dir), `${p}: ${dir} is a colour theme`);
  const file = path.join(MT, 'pictures', dir.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.json');
  let th = null; try { th = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { th = null; }
  is(th && th.nouns && th.nouns[key], `${p}: "${key}" in ${path.basename(file)}`);
  if (th && th.nouns[key]) is(fs.existsSync(path.join(ROOT, th.nouns[key].src.replace(/^\//, ''))), `${p}: ${th.nouns[key].src} on disk`);
  is(/^#[0-9A-F]{6}$/i.test(C.COUNTER[p] || ''), `${p}: a counter colour`);
}
/* put-together kinds are two different pictures with two different counter colours */
for (const k of ['animals', 'fruits']) { const [x, y] = C.KINDS[k].pics; is(x !== y && C.COUNTER[x] !== C.COUNTER[y], `${k}: two kinds, two colours`); }

/* the reading pause: never dropped, longer when the voice reads */
is(C.pause('3 birds sit on a branch.', false) >= 1200, 'read aloud off: the line still waits 1.2 s');
is(C.pause('3 birds sit on a branch, and so on and so on and on.', true) >= C.pause('3 birds sit on a branch.', false), 'read aloud on: at least as long');

/* layout: the picture floors and the widths */
{
  const w = C.layout(648, 1);
  is(w.mode === 'wide' && w.pic >= 96 && 5 * w.place + 4 * w.gap + 2 * w.pad <= 648, `704 page: places ${w.place}, pictures ${w.pic} ≥ 96, fit`);
  const n = C.layout(328, 1);
  is(n.mode === 'narrow' && n.pic >= 64 && 5 * n.place + 4 * n.gap <= 328, `360 phone: places ${n.place}, pictures ${n.pic} ≥ 64, fit`);
  const n4 = C.layout(288, 1); is(5 * n4.place + 4 * n4.gap <= 288, `320 phone fits (${n4.place})`);
  const w2 = C.layout(648, 2);
  is(10 * w2.place + 8 * w2.gap + 4 * w2.pad + w2.between <= 648 && w2.place >= 44, `two frames side by side fit (${w2.place})`);
  const n2 = C.layout(328, 2); is(5 * n2.place + 4 * n2.gap + 2 * n2.pad <= 328 && n2.place >= 44, `two frames stacked on a phone (${n2.place})`);
  is(w.tabPic >= 96 && n.tabPic >= 64, 'the pile picture meets the floors');
}

/* free play: the sentence builder */
{
  const st = C.newPlay(C.rounds('within10')[0]);
  is(C.playLines(st)[0].key === 'playHint', 'free play opens with the pile hint');
  C.add(st); C.add(st); C.add(st);
  is(C.playLines(st)[0].key === 'playStart' && C.playLines(st)[0].n === 3, 'three on the stage → "There are 3."');
  is(C.playNext(st) && st.line === 1, 'Next line');
  C.tap(st, 0); C.add(st);
  const L = C.playLines(st).map(x => x.key);
  is(L.join(',') === 'playStart,playMore1,playAway1,playNow', `the builder writes every change (${L.join(',')})`);
  is(C.playLines(st)[3].m === 3, 'now there are 3');
  C.tap(st, 1); C.tap(st, 2); C.tap(st, st.places.findIndex(p => p && p.who === 'c'));
  is(C.playLines(st).some(x => x.key === 'playNone'), 'all gone → "none", never 0');
}

/* the success line: add / put / take, and the take line that leaves exactly 1 */
for (const r of [].concat(C.rounds('within5'), C.rounds('within10'), C.rounds('within20'))) {
  const want = TYPE[r.kind] === 'take' ? (oracle(r.kind, r.a, r.b) === 1 ? 'sumTake1' : r.b === 1 ? 'sumTakeB1' : 'sumTake') : TYPE[r.kind] === 'put' ? 'sumPut' : 'sumAdd';
  is(C.celebrateKey(r) === want, `${r.id}: success line ${want} (${C.celebrateKey(r)})`);
}

/* the activity strings: every key in eleven locales, every hint the core names exists */
if (ACT) {
  const S = ACT.strings;
  for (const k of Object.keys(S)) for (const loc of LOCALES) is(typeof S[k][loc] === 'string' && S[k][loc].length > 0, `strings.${k}.${loc}`);
  const used = ['hintAct', 'hintTurnAdd', 'hintTurnTake', 'hintAsk', 'hintReplayLeft', 'hintReplayAll', 'hintStory', 'hintBright', 'hintEvery', 'hintNumbers', 'sumAdd', 'sumTake', 'sumTake1', 'sumTakeB1', 'sumPut', 'hintAskLeft', 'playHint', 'playStart', 'playStart1', 'playMore', 'playMore1', 'playAway', 'playAway1', 'playNow', 'playNow1', 'playNone', 'taskLine'];
  for (const k of used) is(!!S[k], `strings has ${k}`);
  for (const r of [].concat(C.rounds('within5'), C.rounds('within10'), C.rounds('within20'))) {
    const key = C.celebrateKey(r);
    for (const loc of LOCALES) { const txt = S[key][loc].replace('{a}', r.a).replace('{b}', r.b).replace('{c}', r.answer); is(JSON.stringify(nums(txt)) === JSON.stringify([r.a, r.b, r.answer]), `${loc} ${r.id}: the success line says ${r.a}, ${r.b}, ${r.answer} — "${txt}"`); }
  }
  for (const loc of LOCALES) for (const k of Object.keys(S)) is(!/\bfree\b|\bgratis\b|\bgratuit|\bkostenlos|\bilmai/i.test(S[k][loc]), `strings.${k}.${loc}: no "free"`);
} else is(false, 'story-stage-activity.js loads in Node');

console.log(`verify-story-stage-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
