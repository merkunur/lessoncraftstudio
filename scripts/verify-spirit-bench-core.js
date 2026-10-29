#!/usr/bin/env node
/* =====================================================================
   verify-spirit-bench-core.js — the gate for ACTIVITY #156, The Spirit
   Level (2.MD.B.5). The gate keeps its OWN oracle: the design's story
   table, its own solver per story shape, its own bench model (whole on
   top, parts below) and its own keyword-trap rule — never read off the
   tool.
   A the stories (answers, decoys, regrouping, balance) · B the pictures ·
   C every bench the child can build × typed numbers, graded by the own
   oracle · D the bench rules · E miss-2 help · F the bots · G the plan ·
   H strings ×11 and reachability · I drawing rules · J the manifest row.
   SB_CORE / SB_ACT / SB_MANIFEST let mutate-spirit-bench.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.SB_CORE || path.join(ROOT, 'mini tools', 'spirit-bench-core.js');
const ACT_PATH = process.env.SB_ACT || path.join(ROOT, 'mini tools', 'spirit-bench-activity.js');
const MAN_PATH = process.env.SB_MANIFEST || path.join(ROOT, 'mini tools', 'bram-board-shop-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6) ---------- */
const SHAPES = ['addResult', 'addChange', 'addStart', 'takeResult', 'takeChange', 'takeStart', 'apartPart', 'cmpDiff', 'cmpBigger', 'cmpSmaller', 'together'];
const OWN = {
  80: [[25, 20, 5, 45], [20, 35, 55, 15], [15, 40, 55, 25], [45, 15, 60, 30], [35, 25, 60, 10], [20, 35, 15, 55], [50, 30, 80, 20], [55, 20, 75, 35], [25, 15, 10, 40], [65, 15, 80, 50], [35, 30, 5, 65]],
  100: [[38, 27, 11, 65], [34, 62, 96, 28], [26, 64, 90, 38], [52, 35, 87, 17], [58, 39, 97, 19], [27, 48, 21, 75], [61, 24, 85, 37], [63, 29, 92, 34], [47, 36, 11, 83], [64, 29, 93, 35], [46, 39, 7, 85]]
};
/* the own solver: each shape's equation in its story's numbers a, b */
const SOLVE = { addResult: (a, b) => a + b, addChange: (a, b) => b - a, addStart: (a, b) => b - a, takeResult: (a, b) => a - b, takeChange: (a, b) => a - b, takeStart: (a, b) => a + b,
  apartPart: (a, b) => a - b, cmpDiff: (a, b) => a - b, cmpBigger: (a, b) => a + b, cmpSmaller: (a, b) => a - b, together: (a, b) => a + b };
/* the own bench model: the whole on top, the two parts below (the unknown is one of the three) */
const MODEL = (shape, a, b) => { const x = SOLVE[shape](a, b); const whole = { addResult: x, addChange: b, addStart: b, takeResult: a, takeChange: a, takeStart: x, apartPart: a, cmpDiff: a, cmpBigger: x, cmpSmaller: a, together: x }[shape];
  const parts = { addResult: [a, b], addChange: [a, x], addStart: [x, a], takeResult: [b, x], takeChange: [b, x], takeStart: [b, a], apartPart: [b, x], cmpDiff: [b, x], cmpBigger: [a, b], cmpSmaller: [b, x], together: [a, b] }[shape];
  return { whole, parts, unknownTop: whole === x && !parts.includes(x) }; };
const KEYWORD = (shape, a, b) => (['addResult', 'cmpBigger', 'together', 'takeStart'].includes(shape) ? Math.abs(a - b) : a + b);   /* the other operation */
const LONGER = { en: /longer/, de: /länger/, fr: /plus longue/, es: /más larga/, pt: /mais comprida/, it: /più lunga/, nl: /langer/, sv: /längre/, da: /længere/, no: /lengre/, fi: /pidempi/ };
const PICS = { clothing: ['scarf'], tools: ['hammer', 'handsaw'], furniture: ['shelf'] };

/* ---------- A. the stories ---------- */
for (const L of ['80', '100']) {
  const R = C.rounds(L), own = OWN[L], max = +L;
  ok(R.length === 11 && R.length >= 7, 'A: ' + L + ' has the eleven shapes');
  ok(R.map((r) => r.shape).join() === SHAPES.join(), 'A: ' + L + ' shapes in the design order');
  R.forEach((r, i) => {
    const [a, b, d, ans] = own[i], tag = 'A: ' + L + '/' + r.shape;
    ok(r.a === a && r.b === b && r.decoy === d, tag + ' numbers are the design table');
    ok(SOLVE[r.shape](a, b) === ans && r.answer === ans, tag + ' answer ' + ans + ' (own solver)');
    ok(ans >= 1 && ans <= max && a <= max && b <= max && d <= max && d >= 1, tag + ' every length fits the bench (1..' + max + ')');
    ok(d !== ans && d !== a && d !== b, tag + ' the decoy is not the answer and not a known');
    ok(d === KEYWORD(r.shape, a, b), tag + ' the decoy is the keyword-operation answer (' + d + ')');
    ok(r.rack.slice().sort((x, y) => x - y).join() === [a, b, d].sort((x, y) => x - y).join(), tag + ' the rack is the two story lengths and the decoy');
    const M = MODEL(r.shape, a, b);
    ok(r.mystery === (M.unknownTop ? 'top' : 'bottom'), tag + ' the mystery is on the ' + (M.unknownTop ? 'top' : 'bottom') + ' rail');
    ok(M.whole === M.parts[0] + M.parts[1] && M.whole >= Math.max(...M.parts), tag + ' the top rail is the longest length (whole = parts)');
    if (L === '80') ok([a, b, d, ans].every((x) => x % 5 === 0), tag + ' within 80 in fives');
    if (L === '100') { const sum = ['addResult', 'cmpBigger', 'together', 'takeStart'].includes(r.shape), big = sum ? null : Math.max(a, b), small = sum ? null : (r.shape === 'addChange' || r.shape === 'addStart' ? a : b);
      ok(sum ? (a % 10) + (b % 10) >= 10 : (big % 10) < (small % 10), tag + ' regroups'); }
  });
  ok(new Set(R.map((r) => r.answer)).size === 11, 'A: ' + L + ' all answers differ');
  ok(R.filter((r) => r.mystery === 'top').length === 4, 'A: ' + L + ' the mystery is on top in 4 of 11');
  [0, 1, 2].forEach((s) => { const n = R.filter((r) => r.rack[s] === r.decoy).length; ok(n >= 3 && n <= 4, 'A: ' + L + ' the decoy sits in rack slot ' + (s + 1) + ' ' + n + ' times (3–4)'); });
}

/* ---------- B. the pictures ---------- */
for (const L of ['80', '100']) C.rounds(L).forEach((r) => {
  const [th, n] = r.pic, j = path.join(ROOT, 'mini tools', 'pictures', th + '.json');
  ok(PICS[th] && PICS[th].includes(n), 'B: ' + r.shape + ' uses an allowed job picture (' + th + '/' + n + ')');
  ok(fs.existsSync(j) && JSON.parse(fs.readFileSync(j, 'utf8')).nouns[n], 'B: ' + th + '/' + n + ' is a labelled library picture');
  ok(fs.existsSync(path.join(ROOT, 'image-library-webp', 'themes', th, n + '@2x.webp')), 'B: ' + th + '/' + n + ' exists on disk');
});

/* ---------- C. every bench × typed number, against the own oracle ---------- */
const benches = () => { const out = []; const slots = ['top', 'bottom']; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (i !== j) for (const ri of slots) for (const rj of slots) { if (ri === 'top' && rj === 'top') continue; out.push([[i, ri], [j, rj]]); } return out; };
for (const L of ['80', '100']) for (const r of C.rounds(L)) {
  const M = MODEL(r.shape, r.a, r.b), di = r.rack.indexOf(r.decoy);
  const e0 = C.newState(L, r.k);
  ok(C.check(e0).key === 'hintBoards' && e0.misses === 0, 'C: ' + L + '/' + r.shape + ' nothing on the bench → hintBoards, never a miss');
  ok(!C.typeDigit(e0, '1') && e0.typed === null, 'C: the keypad stays locked until the bench is built');
  for (const bench of benches()) for (const typed of [null, r.answer, r.decoy, r.a, r.b, r.answer + 1, r.answer + 10, Math.abs(r.a - r.b) || 1, r.a + r.b]) {
    if (typed !== null && (typed < 1 || typed > 99)) continue;
    const st = C.newState(L, r.k);
    bench.forEach(([i, rail]) => C.put(st, i, rail));
    if (C.placed(st) !== 2) continue;
    if (typed !== null) String(typed).split('').forEach((d) => C.typeDigit(st, d));
    const top = st.top === null ? null : r.rack[st.top], bot = st.bottom.map((i) => r.rack[i]);
    const decoyOn = bench.some(([i]) => i === di);
    const modelOk = !decoyOn && (M.unknownTop ? top === null && bot.slice().sort().join() === M.parts.slice().sort().join() : top === M.whole && bot.length === 1 && M.parts.includes(bot[0]));
    const want = typed === null ? 'note' : decoyOn ? 'decoy' : !modelOk ? 'wrongRail' : typed !== r.answer ? 'number' : 'ok';
    const x = C.check(st), got = x.result === 'miss' ? x.kind : x.result;
    if (got !== want) ok(false, 'C: ' + L + '/' + r.shape + ' bench ' + JSON.stringify(bench) + ' typed ' + typed + ' → ' + got + ', want ' + want); else pass++;
    if (x.result === 'miss') {
      const topLen = top === null ? typed : top, botLen = bot.reduce((s, v) => s + v, 0) + (top === null ? 0 : typed);
      ok(st.verdict.top === topLen && st.verdict.bottom === botLen, 'C: the cut board is the TYPED length (rails ' + topLen + ' / ' + botLen + ')');
      const flat = topLen === botLen, h = C.hint(st);
      ok(h === (want === 'decoy' ? (flat ? 'hintDecoyFlat' : 'hintDecoy') : want === 'wrongRail' ? (flat ? 'hintRailFlat' : 'hintRail') : 'hintLevel'), 'C: ' + L + '/' + r.shape + ' ' + want + (flat ? ' (balanced)' : '') + ' → ' + h);
    }
  }
}

/* ---------- D. the bench rules ---------- */
(() => {
  const st = C.newState('80', 3);   /* takeResult 45 − 15, rack [60, 15, 45] */
  ok(C.put(st, 2, 'top').ok && C.put(st, 1, 'bottom').ok, 'D: two boards go on');
  ok(C.put(st, 0, 'bottom').full && C.where(st, 0) === 'rack', 'D: a third board is refused (the saw cuts the third)');
  ok(C.put(st, 0, 'top').full, 'D: the top rail holds one board');
  ok(C.mystery(st) === 'bottom', 'D: the empty place is the mystery');
  ok(C.put(st, 1, 'rack').ok && C.mystery(st) === null && C.placed(st) === 1, 'D: a board goes back to the rack, the mystery disappears');
  ok(C.put(st, 2, 'bottom').ok && C.where(st, 2) === 'bottom' && st.top === null, 'D: a board moves from rail to rail');
  const t = C.newState('80', 0); C.put(t, 1, 'bottom'); C.put(t, 2, 'bottom'); C.typeDigit(t, '4'); C.typeDigit(t, '5');
  ok(C.tilt(t, null) < 0 || C.tilt(t, null) > 0, 'D: a test without a cut board leans');
  ok(C.check(t).result === 'ok' && t.done, 'D: 25 + 20 on the bottom, 45 typed → solved');
  ok(!C.put(t, 0, 'top').ok && C.check(t).result === 'no', 'D: a solved bench is locked');
  const k = C.newState('80', 3); C.put(k, 2, 'top'); C.put(k, 1, 'bottom');
  ok(!C.typeDigit(k, '0') && C.typeDigit(k, '3') && C.typeDigit(k, '0') && !C.typeDigit(k, '1') && k.typed === 30, 'D: no leading zero, at most two digits');
  C.backspace(k); ok(k.typed === 3, 'D: delete removes the last digit');
  const v = C.newState('80', 3); C.put(v, 2, 'top'); C.put(v, 1, 'bottom'); C.typeDigit(v, '6'); C.check(v);
  ok(v.verdict && C.put(v, 1, 'rack').ok && v.verdict === null, 'D: any move takes the verdict away');
})();

/* ---------- E. miss-2 help ---------- */
for (const L of ['80', '100']) for (const r of C.rounds(L)) {
  const M = MODEL(r.shape, r.a, r.b), sp = C.span(r);
  const known = M.parts.find((p) => p !== r.answer);   /* the bottom rail lays the known piece first, the mystery after it */
  ok(M.unknownTop ? sp.s === 0 && sp.e === M.whole : sp.s === known && sp.e === M.whole, 'E: ' + L + '/' + r.shape + ' the count-up span is ' + sp.s + ' → ' + sp.e + ' (own model)');
  ok(sp.e - sp.s === r.answer, 'E: ' + L + '/' + r.shape + ' counting up from s to e gives the answer');
  const st = C.newState(L, r.k), di = r.rack.indexOf(r.decoy), ki = [0, 1, 2].find((i) => i !== di);
  C.put(st, di, 'top'); C.put(st, ki, 'bottom'); C.typeDigit(st, '5'); C.check(st); C.check(st);
  ok(st.help && C.hint(st) === 'hintFixed', 'E: ' + L + '/' + r.shape + ' miss 2 on a wrong bench → hintFixed');
  C.fixModel(st);
  ok(C.modelRight(st) && !C.decoyOn(st) && C.placed(st) === 2, 'E: ' + L + '/' + r.shape + ' the fix puts the story on the bench and the decoy back on the rack');
  /* the number help on the right bench: on the top rail the mystery starts at 0, so the help never names its end (that would be the answer) */
  const nb = C.newState(L, r.k); C.fixModel(nb); const wrong = r.answer + 5 <= 99 ? r.answer + 5 : r.answer - 5;
  String(wrong).split('').forEach((d) => C.typeDigit(nb, d)); C.check(nb); C.check(nb);
  const sp2 = C.spanOf(nb), first = r.rack[nb.bottom[0]];
  if (r.mystery === 'top') ok(C.hint(nb) === 'hintCountTop' && sp2.s === first && sp2.e === M.whole, 'E: ' + L + '/' + r.shape + ' top mystery → hintCountTop from the first piece (' + sp2.s + ')');
  else ok(C.hint(nb) === 'hintCount' && sp2.s === sp.s && sp2.e === sp.e, 'E: ' + L + '/' + r.shape + ' bottom mystery → hintCount ' + sp2.s + ' → ' + sp2.e);
}

/* ---------- F. the bots ---------- */
for (const L of ['80', '100']) {
  const R = C.rounds(L);
  const playBench = (choose) => R.filter((r) => { const st = C.newState(L, r.k), [i, j] = choose(r); C.put(st, i, 'top'); C.put(st, j, 'bottom'); const t = r.rack[i] - r.rack[j]; if (t < 1) return false; String(t).split('').forEach((d) => C.typeDigit(st, d)); return C.check(st).result === 'ok'; }).length;
  const two = (r, order) => { const s = r.rack.map((v, i) => [v, i]).sort((x, y) => order * (y[0] - x[0])); return [s[0][1], s[1][1]]; };
  /* the baseline is guessing the operation without the bench; no bench shortcut may beat it (an invented 6 would be no measurement) */
  const typeOnly0 = (f) => R.filter((r) => f(r) === r.answer).length, base = Math.max(typeOnly0((r) => r.a + r.b), typeOnly0((r) => Math.abs(r.a - r.b)));
  ok(playBench((r) => two(r, 1)) <= base, 'F: ' + L + ' "the two biggest boards, subtract" wins ' + playBench((r) => two(r, 1)) + ' of 11');
  ok(playBench((r) => [two(r, -1)[1], two(r, -1)[0]]) <= base, 'F: ' + L + ' "the two smallest boards, subtract" wins ' + playBench((r) => [two(r, -1)[1], two(r, -1)[0]]) + ' of 11');
  ok(Math.max(playBench(() => [0, 1]), playBench(() => [1, 0]), playBench(() => [1, 2]), playBench(() => [2, 1]), playBench(() => [0, 2]), playBench(() => [2, 0])) <= base, 'F: ' + L + ' no fixed rack position wins more than the operation guess (' + base + ')');
  const typeOnly = (f) => R.filter((r) => f(r) === r.answer).length;
  ok(typeOnly((r) => r.decoy) === 0, 'F: ' + L + ' typing the decoy never wins');
  ok(typeOnly((r) => r.a + r.b) <= 4 && typeOnly((r) => Math.abs(r.a - r.b)) <= 7, 'F: ' + L + ' "always add" wins ' + typeOnly((r) => r.a + r.b) + ', "always subtract" ' + typeOnly((r) => Math.abs(r.a - r.b)) + ' of 11 — the bench model, not one operation');
}

/* ---------- G. the plan ---------- */
for (const L of ['80', '100']) {
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let prev = null, same = 0, runs = 0; const seen = new Set();
  for (let p = 0; p < 300; p++) { const o = C.plan(L, p, rnd, prev); ok(o.slice().sort((a, b) => a - b).join() === C.rounds(L).map((r) => r.k).join(), 'G: ' + L + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; const R = C.rounds(L); for (let i = 2; i < o.length; i++) if (R[o[i]].mystery === R[o[i - 1]].mystery && R[o[i]].mystery === R[o[i - 2]].mystery) runs++; seen.add(o.join()); prev = o; }
  ok(same === 0, 'G: ' + L + ' never repeats the previous order');
  ok(runs === 0, 'G: ' + L + ' the mystery is never on the same rail three rounds in a row');
  ok(seen.size > 100, 'G: ' + L + ' orders really shuffle (' + seen.size + ')');
  const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
  for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(L, 0, stream(sd), null), o2 = C.plan(L, 0, stream(sd), o1); ok(o1.join() !== o2.join(), 'G: ' + L + ' replayed stream ' + sd + ' gives a new order'); }
}

/* ---------- H. strings ×11 and reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
const sandbox = {}; new Function('window', 'document', 'SpiritBenchCore', SRC.replace(/injectSpiritBenchCSS\(\);/, '') + ';window.X=SpiritBenchActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings;
ok(keys.length >= 40, 'H: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  const built = /^s_/.test(k) && /'s_' \+ r\.shape/.test(body) || /^ok_/.test(k) && /'ok_' \+ r\.shape/.test(body);
  ok(body.includes("'" + k + "'") || built || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
});
SHAPES.forEach((sh) => LOCALES.forEach((l) => {
  const s = STR['s_' + sh] && STR['s_' + sh][l], o = STR['ok_' + sh] && STR['ok_' + sh][l];
  ok(s && s.indexOf('{a}') >= 0 && s.indexOf('{b}') > s.indexOf('{a}') && !/\{c\}/.test(s), 'H: ' + l + ' s_' + sh + ' gives {a} then {b}, never the answer');
  ok(o && /\{c\}/.test(o) && /[+−=]/.test(o) && !/-/.test(o.replace(/[\p{L}]-[\p{L}]/gu, '')), 'H: ' + l + ' ok_' + sh + ' is an equation with U+2212 and the answer');
  ok(!/\d/.test(s.replace(/\{\w+\}/g, '')), 'H: ' + l + ' s_' + sh + ' carries no number of its own');
}));
LOCALES.forEach((l) => ok(LONGER[l].test(STR.s_cmpSmaller[l]), 'H: ' + l + ' the compare-smaller story keeps the "longer" trap'));
LOCALES.forEach((l) => ok(!/{e}/.test(STR.hintCountTop[l]) && /{s}/.test(STR.hintCountTop[l]), 'H: ' + l + ' hintCountTop names only where the first piece ends (its end would be the answer)'));
LOCALES.forEach((l) => ok(!/(third|dritte|troisième|tercera|terceira|terza|derde|tredje|tredje|tredje|kolmanne)/i.test(STR.hintFull[l]), 'H: ' + l + ' hintFull never points at the third (decoy) board'));
ok(LONGER.en.test('It is 15 cm longer') && !LONGER.fi.test('Se on lyhyempi'), 'H: the longer-trap check fires and passes');
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ; and inside « »');
ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(strBlock), 'H: no "free" in the activity text');
/* a unit follows a number: da/no "tomme" is also the word for EMPTY (den tomme plads), so the ban needs the number before it */
const INCH = /(\d|\})\s*(inch|inches|feet|foot|zoll|pouces?|pulgadas?|polegadas?|pollici|pollice|duim|tum|tommer?|tuumaa?)(?!\p{L})/iu;
ok(keys.every((k) => LOCALES.every((l) => !INCH.test(STR[k][l]))) && INCH.test('3 inches') && INCH.test('{a} tommer') && !INCH.test('Til den tomme plads'), 'H: metric only (fires on 3 inches and {a} tommer, passes den tomme plads)');
ok(!/metre|centimetre/.test(keys.map((k) => STR[k].en).join(' ')), 'H: en uses US spelling');

/* ---------- I. drawing rules ---------- */
const ACT_BODY = SRC.replace(strBlock, '');
ok(/cut = st\.verdict \? st\.verdict\.typed : st\.done \? r\.answer : null/.test(ACT_BODY), 'I: the saw cuts the TYPED length (the answer only once it is solved)');
ok(/var m = C\.mystery\(st\)/.test(ACT_BODY) && /if \(m && !st\.done && !vk\)/.test(ACT_BODY), 'I: the mystery place exists only once two boards are on the bench');
ok(/var Rl = st\.testing && !vk && !st\.done \? C\.rails\(st, null\) : R, t = Rl\.bottom - Rl\.top/.test(ACT_BODY), 'I: the level leans by the rails, never by the answer');
ok(!/r\.answer[^;\n]*sb-level|sb-level[^;\n]*r\.answer/.test(ACT_BODY), 'I: nothing about the level reads the answer');
ok(/b\.disabled = st\.done \|\| !ready/.test(ACT_BODY), 'I: the keypad unlocks only when the bench is built');
ok(/\(r\.mystery === 'top' \? \[sp\.s\] : \[sp\.s, sp\.e\]\)/.test(ACT_BODY), 'I: on a top-rail mystery the help never marks its end (the answer) on the ruler');

/* ---------- J. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const row = list.find((x) => x.id === 'bram-board-shop.length-word-problems.2-md-b-5');
ok(row && row.tool === 'spirit-bench-activity' && row.task_template === 'spirit-bench', 'J: the row points at the spirit level');
ok(row && row.alignment.code === '2.MD.B.5', 'J: the alignment stays');
ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'J: the row ships in all 11 locales');
ok(row && new Set(Object.values(row.slug)).size === 11 && Object.values(row.slug).every((s) => /^[a-z0-9-]+$/.test(s)), 'J: 11 different url-safe slugs');

console.log(`verify-spirit-bench-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
