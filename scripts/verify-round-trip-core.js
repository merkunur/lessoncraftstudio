#!/usr/bin/env node
/* =====================================================================
   verify-round-trip-core.js — the build gate for ACTIVITY #143, The
   Round-Trip Cart ("Gus's Snack Cart", 2.NBT.B.5), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · its own copy of the design's tables, re-solved from scratch: the
       eight one-stop answers (37 38 35 43 30 63 72 66, distinct, five
       regroup / three not), every route leg (inside 1–99, + and − mixed,
       18 of 24 regroup, finals distinct), every round-first row (half-up
       rounding, 8 up / 8 down, 4 / 4 per position, the about and exact
       values);
     · the old activity's stories (read from git): every number pair is
       still a round;
     · the round trip itself: for every round and EVERY claim 0–99 the
       trip closes if and only if the claim is the answer, and the gap is
       claim − answer; the hops decompose the step;
     · every verdict and its literal hint key, typing, the rounding taps,
       the plan (bands kept, never the same order twice), free play only
       once home;
     · every picture on disk (colour, never B&W), strings ×11 (each story
       carries exactly its round's numbers, never "free", no digit in a
       hint), prose ×11 and the manifest.
   Usage: node scripts/verify-round-trip-core.js   (RT_CORE / RT_ACT / RT_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.RT_CORE || path.join(MINI, 'round-trip-core.js');
const ACTF = process.env.RT_ACT || path.join(MINI, 'round-trip-activity.js');
const MAN = process.env.RT_MANIFEST || path.join(MINI, 'gus-snack-cart-activities.json');
const ID = 'gus-snack-cart.within-100.2-nbt-b-5', BEFORE = '1570d1d4';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, RoundTripCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.RoundTripActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MINUS = '−';
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };
let rng = 11; const rnd = () => { rng = (rng * 1103515245 + 12345) % 2147483648; return rng / 2147483648; };
const regroups = (a, s) => s > 0 ? (a % 10) + (s % 10) >= 10 : (a % 10) < (Math.abs(s) % 10);

/* ---------- 1. my own tables ---------- */
const MY_ONE = [[45, -8, 37], [23, 15, 38], [60, -25, 35], [34, 9, 43], [70, -40, 30], [27, 36, 63], [88, -16, 72], [19, 47, 66]];
const MY_BANDS = [1, 1, 2, 2, 1, 3, 2, 3];
const MY_ROUTE = [[24, [30, -6, 15], [54, 48, 63]], [58, [-20, 7, -19], [38, 45, 26]], [17, [25, -9, 40], [42, 33, 73]], [66, [-8, 16, -30], [58, 74, 44]], [39, [12, -24, 35], [51, 27, 62]], [81, [-40, 9, -13], [41, 50, 37]], [45, [8, -28, 50], [53, 25, 75]], [92, [-35, 6, -18], [57, 63, 45]]];
const MY_ROUND = [[38, 21, 40, 20, 60, 59], [43, 36, 40, 40, 80, 79], [25, 42, 30, 40, 70, 67], [17, 34, 20, 30, 50, 51], [61, 28, 60, 30, 90, 89], [46, 45, 50, 50, 100, 91], [33, 12, 30, 10, 40, 45], [54, 19, 50, 20, 70, 73]];
const myNearer = (n) => { const o = n % 10; return o >= 5 ? n - o + 10 : n - o; };

const one = C.rounds('one');
ok(one.length === 8, 'one stop: eight rounds');
one.forEach((r, i) => {
  const [a, s, c] = MY_ONE[i];
  ok(r.start === a && r.steps.length === 1 && r.steps[0] === s && a + s === c, `one stop ${i}: ${a} ${s < 0 ? '−' : '+'} ${Math.abs(s)} = ${c}`);
  ok(r.band === MY_BANDS[i], `one stop ${i}: band ${MY_BANDS[i]}`);
  ok(c >= 25 && c <= 99 && Math.abs(s) >= 1, `one stop ${i}: result in 25–99, a step of at least 1`);
  ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.ITEMS[r.item].pic + '@2x.webp')), `one stop ${i}: the picture ${C.ITEMS[r.item].pic} exists`);
});
ok(new Set(MY_ONE.map(x => x[2])).size === 8, 'one stop: the answers are all different');
ok(MY_ONE.filter(x => regroups(x[0], x[1])).length === 5, 'one stop: five regroup, three do not');
ok(MY_ONE.filter(x => x[1] < 0).length === 4, 'one stop: four take away, four add');
const route = C.rounds('route');
ok(route.length === 8, 'route: eight rounds');
let rg = 0;
route.forEach((r, i) => {
  const [st0, steps, stocks] = MY_ROUTE[i];
  ok(r.start === st0 && r.steps.join() === steps.join(), `route ${i}: ${st0} ${steps}`);
  let v = st0; steps.forEach((s, j) => { if (regroups(v, s)) rg++; v += s; ok(v === stocks[j] && v >= 1 && v <= 99, `route ${i} leg ${j}: ${v} inside 1–99`); });
  ok(C.stops(r).join() === stocks.join(), `route ${i}: the core's stops are mine`);
  ok(steps.some(s => s > 0) && steps.some(s => s < 0), `route ${i}: + and − mixed`);
});
ok(rg === 18, `route: 18 of 24 legs regroup (${rg})`);
ok(new Set(MY_ROUTE.map(r => r[2][2])).size === 8, 'route: the finals are all different');
const round = C.rounds('round');
let up = 0, upPos = [0, 0];
round.forEach((r, i) => {
  const [a, b, ra, rb, about, exact] = MY_ROUND[i];
  ok(r.start === a && r.steps[0] === b && a + b === exact, `round first ${i}: ${a} + ${b} = ${exact}`);
  ok(myNearer(a) === ra && myNearer(b) === rb && ra + rb === about && C.nearerTen(a) === ra && C.nearerTen(b) === rb, `round first ${i}: ${a} → ${ra}, ${b} → ${rb}, about ${about}`);
  [[a, ra], [b, rb]].forEach(([n, rn], j) => { if (rn > n) { up++; upPos[j]++; } });
  ok(C.posts(a).join() === [a - a % 10, a - a % 10 + 10].join(), `round first ${i}: the two posts of ${a}`);
});
ok(up === 8 && upPos[0] === 4 && upPos[1] === 4, `round first: 8 up / 8 down, 4 / 4 per position (${up}, ${upPos})`);
ok(C.nearerTen(25) === 30 && C.nearerTen(45) === 50 && C.nearerTen(44) === 40, 'five rounds up');
{ const s5 = C.newState('round', 2); ok(C.roundTap(s5, 0, 20) === 'five' && s5.rounded[0] == null && C.roundTap(s5, 0, 30) === 'ok', 'halfway: the lower ten gets the five-rounds-up note, the upper ten takes the tag'); }
/* the old activity's stories, from git */
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/gus-snack-cart-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const old = head.params.rounds || [];
ok(old.length === 8, 'the old activity has eight stories');
old.forEach(o => ok(one.some(r => r.start === o.a && r.steps[0] === (o.op === '-' ? -o.b : o.b)), `the old story ${o.a} ${o.op} ${o.b} is still a round`));

/* ---------- 2. the round trip, every claim ---------- */
for (const mode of ['one', 'round', 'route']) C.rounds(mode).forEach((r, i) => {
  let from = r.start, bad = 0;
  r.steps.forEach((s) => {
    for (let c = 0; c <= 99; c++) { const t = C.tripFor(from, s, c); if (t.closes !== (c === from + s) || t.gap !== c - (from + s) || t.back !== c - s) bad++; }
    from += s;
  });
  ok(bad === 0, `${mode} ${i}: the trip closes only on the answer, the gap is claim − answer`);
});
for (let s = -99; s <= 99; s++) { if (!s) continue; const h = C.hops(s); if (h.tens * 10 + h.ones !== Math.abs(s) || h.dir !== Math.sign(s) || h.ones > 9) ok(false, `hops(${s})`); }
PASS++;

/* ---------- 3. the hand ---------- */
const typeIn = (st, str) => str.split('').forEach(d => C.type(st, d));
{
  const st = C.newState('one', 0);
  ok(st.focus === 'answer' && st.cart === 45, 'one stop: the answer box is open, the cart on its flag at 45');
  let r = C.check(st); ok(r.result === 'note' && r.key === 'hintStart' && st.misses === 0, 'Check with nothing typed → a note, no miss');
  typeIn(st, '047'); ok(st.typed.answer === '47', 'a leading 0 is dropped');
  ok(!C.type(st, '1') && st.typed.answer === '47', 'two digits at most');
  ok(!C.drive(st, 20), 'the cart is parked during a round');
  r = C.check(st); ok(r.result === 'away' && st.trip.legs[0].back === 55 && st.trip.legs[0].gap === 10 && C.hint(st) === 'hintGap' && st.misses === 1 && !st.help, '47 → back +8 → 55, ten off, hintGap');
  C.type(st, 'del'); ok(st.typed.answer === '4' && st.trip === null, 'delete clears a digit and the last trip');
  C.type(st, '9'); r = C.check(st); ok(r.result === 'away' && st.help && C.hint(st) === 'hintHops', 'a second miss → hintHops');
  C.type(st, 'del'); C.type(st, 'del'); typeIn(st, '37'); r = C.check(st);
  ok(r.result === 'home' && st.done && st.cart === 45, '37 → the cart comes home to 45');
  ok(C.check(st).result === 'no' && !C.type(st, '1'), 'a finished round takes nothing');
  ok(C.drive(st, 72) && st.cart === 72 && C.drive(st, 130) && st.cart === 100, 'free play once home, clamped to the road');
}
{
  const st = C.newState('one', 7); typeIn(st, '99'); C.check(st);
  ok(st.trip.legs[0].back === 52 && C.hint(st) === 'hintGap', '19 + 47 claimed 99 → back to 52');
  const s2 = C.newState('one', 0); typeIn(s2, '5'); C.check(s2);
  ok(s2.trip.legs[0].back === 13, '45 − 8 claimed 5 → back to 13');
  const s3 = C.newState('one', 7); typeIn(s3, '5'); C.check(s3);
  ok(s3.trip.legs[0].back === -42 && C.hint(s3) === 'hintOff', 'a return that runs off the road → hintOff');
}
{
  const st = C.newState('route', 0);
  ok(st.focus === 'leg0', 'route: the first sign is open');
  typeIn(st, '54'); ok(st.focus === 'leg1', 'two digits hand on to the next sign');
  let r = C.check(st); ok(r.result === 'note' && r.key === 'hintLeg', 'route with empty signs → hintLeg, no miss');
  typeIn(st, '49'); typeIn(st, '63');
  r = C.check(st); ok(r.result === 'away' && st.trip.fail === 1 && st.trip.legs.length === 2 && st.trip.legs[1].back === 55, 'route: the first wrong sign is the one checked, later legs wait');
  C.setFocus(st, 'leg1'); C.type(st, 'del'); C.type(st, 'del'); typeIn(st, '48'); r = C.check(st);
  ok(r.result === 'home' && st.done && st.trip.legs.length === 3, 'route: 54, 48, 63 → home');
}
{
  const st = C.newState('round', 0);
  ok(st.focus === null && !C.setFocus(st, 'answer') && !C.type(st, '5'), 'round first: no box opens before the rounding');
  let r = C.check(st); ok(r.result === 'note' && r.key === 'hintRound', 'Check before rounding → hintRound');
  ok(C.roundTap(st, 1, 20) === 'no', 'the second number waits for the first');
  ok(C.roundTap(st, 0, 30) === 'far' && st.rounded[0] == null, 'the farther post is refused');
  ok(C.roundTap(st, 0, 50) === 'no', 'a post that is not one of the two is ignored');
  ok(C.roundTap(st, 0, 40) === 'ok' && C.roundTap(st, 1, 20) === 'ok' && st.focus === 'about', '38 → 40, 21 → 20, the about box opens');
  ok(C.unround(st, 1) && st.rounded[1] == null && C.roundTap(st, 1, 20) === 'ok', 'a rounded tag can be taken back');
  C.setFocus(st, 'answer'); typeIn(st, '59');
  r = C.check(st); ok(r.result === 'note' && r.key === 'hintAbout' && st.focus === 'about', 'the about box first → hintAbout');
  typeIn(st, '70'); r = C.check(st);
  ok(r.result === 'home' && st.aboutOk === false && st.misses === 0, 'a wrong about value is never a miss on its own');
  ok(C.aboutValue(st) === 60, 'about 60');
  ok(!C.unround(st, 0), 'nothing to undo once home');
  const s2 = C.newState('round', 5); C.roundTap(s2, 0, 50); C.roundTap(s2, 1, 50); typeIn(s2, '100'); ok(s2.typed.about === '100', 'the about box takes 100');
}
/* the plan */
for (const mode of ['one', 'route', 'round']) {
  let prev = null;
  for (let t = 0; t < 40; t++) {
    const p = C.plan(mode, rnd, prev), R = C.rounds(mode);
    ok(p.order.slice().sort((a, b) => a - b).join() === '0,1,2,3,4,5,6,7' && (!prev || p.order.join() !== prev.join()), `plan ${mode}: every round once, never the previous order`);
    if (mode === 'one') ok(p.order.map(k => R[k].band).join() === R.map(r => r.band).sort().join(), 'plan one: the bands stay in order');
    prev = p.order;
  }
}
ok(C.modeOf('route', 'on') === 'route' && C.modeOf('one', 'on') === 'round' && C.modeOf(undefined, undefined) === 'one', 'the settings pick the mode');
ok(C.band(560).wide && !C.band(559).wide && C.band(309).cramp && !C.band(310).cramp, 'the width bands');

/* ---------- 4. pictures + strings ---------- */
const BW = /(^|\/)[^/]*\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i;
[C.CART].concat(C.ITEMS.map(x => x.pic)).forEach(p => { ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', p + '@2x.webp')) && !BW.test(p + '/'), `picture ${p}: on disk, in colour`); });
ok(!C.ITEMS.some(x => /plum|^fruits\/cherry|pretzels/.test(x.pic)), 'no refused picture (plum, fruits/cherry, pretzels)');
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 50, 'strings: the set is there');
const NODIGIT = ['instruction', 'pOne', 'pRoute', 'pRound', 'hintStart', 'hintLeg', 'hintRound', 'hintAbout', 'hintFar', 'hintFive', 'hintGap', 'hintOff', 'hintHops', 'pTensN', 'pOnesN', 'okSub', 'okAdd', 'okRoute', 'okAbout', 'sRoute'];
const NEED = { hintGap: ['r', 'a'], hintHops: ['a', 'parts'], pTensN: ['k'], pOnesN: ['k'], pAnd: ['t', 'o'], okSub: ['a', 'b', 'c'], okAdd: ['a', 'b', 'c'], okRoute: ['a', 's1', 's2', 's3'], okAbout: ['c', 'about'], sRoute: ['a'], aRoad: ['c', 'h'], aAfter: ['r', 'h', 'g'], aLeg: ['i'], aPost: ['n'], aTag: ['n'] };
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (NODIGIT.indexOf(k) >= 0) ok(!/\d/.test(v.replace(/\{\w+\}/g, '')), `strings.${k}.${l}: no digit`);
  if (NEED[k]) ok(NEED[k].every(x => v.indexOf('{' + x + '}') >= 0), `strings.${k}.${l}: carries ${NEED[k].join(', ')}`);
  /* the success lines say the whole round: each number exactly as often as the sentence needs it */
  const COUNT = { okSub: { a: 2, b: 2, c: 2 }, okAdd: { a: 2, b: 2, c: 1 } };
  if (COUNT[k]) ok(Object.keys(COUNT[k]).every(x => v.split('{' + x + '}').length - 1 === COUNT[k][x]), `strings.${k}.${l}: says ${JSON.stringify(COUNT[k])}`);
  ok(!/\{(?!(a|b|c|r|k|t|o|s1|s2|s3|about|parts|h|g|i|n|msg)\})/.test(v), `strings.${k}.${l}: no unknown placeholder`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (l === 'es' && /[!?]/.test(v)) ok(/[¡¿]/.test(v), `strings.${k}.es: opens its ¡ ¿`);
  ok(!/\bgopher|squirrel|ardilla|esquilo|eekhoorn|scoiattolo|Eichhörnchen|écureuil|ekorre|egern|ekorn|orava/i.test(v), `strings.${k}.${l}: Gus is never an animal`);
}
for (const l of LOCS) {
  one.forEach((r, i) => { const nums = (S['sOne' + i][l].match(/\d+/g) || []).map(Number); ok(nums.join() === [r.start, Math.abs(r.steps[0])].join(), `${l}: sOne${i} carries ${r.start} and ${Math.abs(r.steps[0])} (${nums})`); });
  round.forEach((r, i) => { const nums = (S['sRound' + i][l].match(/\d+/g) || []).map(Number); ok(nums.join() === [r.start, r.steps[0]].join(), `${l}: sRound${i} carries ${r.start} and ${r.steps[0]} (${nums})`); });
  ACT.api = { t: k => S[k][l] };
  const hp = ACT._hopsPhrase(-8), hp2 = ACT._hopsPhrase(36), hp3 = ACT._hopsPhrase(30);
  ok(/8/.test(hp) && !/0/.test(hp) && /3/.test(hp2) && /6/.test(hp2) && hp2.indexOf(S.pAnd[l].replace(/\{\w\}/g, '').trim()) >= 0 && !/\b0\b/.test(hp3), `${l}: hops phrases «${hp}» «${hp2}» «${hp3}»`);
  const R0 = C.newState('route', 0); ACT.st = R0; typeIn(R0, '544863'); C.check(R0);
  const line = ACT._okLine();
  ok(line.indexOf('24') >= 0 && line.indexOf('+30') >= 0 && line.indexOf(MINUS + '6') >= 0 && line.indexOf('+15') >= 0, `${l}: «${line}»`);
  const O0 = C.newState('one', 0); ACT.st = O0; typeIn(O0, '37'); C.check(O0); const l0 = ACT._okLine();
  ok(['45', '8', '37'].every(x => l0.indexOf(x) >= 0), `${l}: «${l0}»`);
}
ACT.api = null; ACT.st = null;
ok(ACT._signed(-6) === MINUS + '6' && ACT._signed(30) === '+30', 'the true minus sign');
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setTrips', 'tOne', 'tRoute', 'setRound', 'rOff', 'rOn'];
for (const k of KEYS) {
  const dyn = (/^sOne\d$/.test(k) || /^sRound\d$/.test(k)) && /'sRound' : 'sOne'\) \+ rd\.k/.test(src);
  ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || dyn || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
}
ok(!/role', 'img'|role="img"/.test(src), 'no role="img" anywhere');

/* ---------- 5. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  ok(['45 ' + MINUS + ' 8', '37', '47', '55', '24 → +30 → ' + MINUS + '6 → +15', '38 + 21', '40 + 20', '60', '59'].every(x => all.indexOf(x) >= 0), `prose.${l}: quotes what the activity shows`);
  ok(!/(?<![\p{L}\d])-\d/u.test(all), `prose.${l}: a minus is the true minus sign`);
  ok(!/\bgopher|squirrel|ardilla|esquilo|eekhoorn|scoiattolo|Eichhörnchen|écureuil|ekorre|egern|ekorn|orava/i.test(all), `prose.${l}: Gus is never an animal`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(rows.length === headRows.length && row && row.tool === 'round-trip-activity', 'manifest: the row, tool round-trip-activity');
ok(row && row.params.trips.join() === 'one,route' && row.params.round.join() === 'off,on' && row.params.rounds.one === 8 && row.params.rounds.route === 8 && row.params.rounds.round === 8, 'manifest: params match the core');
['id', 'alignment', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
['slug', 'page_title', 'page_intro'].forEach(k => Object.keys(head[k]).forEach(l => ok(row[k][l] === head[k][l], `manifest: ${k}.${l} frozen`)));
['sv', 'da', 'no', 'fi'].forEach(l => ok(!head.slug[l] && /^[a-z0-9-]+$/.test(row.slug[l] || '') && row.page_title[l] && row.page_intro[l] && !FREE.test(row.page_title[l] + row.page_intro[l]) && !/Common Core|2\.NBT/.test(row.page_title[l] + row.page_intro[l]), `manifest: ${l} gets a new slug, title and intro`));
ok(LOCS.every(l => row.slug[l]), 'manifest: the row ships in all 11 locales');

console.log(`\nverify-round-trip-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
