#!/usr/bin/env node
/* =====================================================================
   verify-drive-cables-core.js — the gate for ACTIVITY #160, The Drive
   Cables ("Sprocket's Clock — Match Analog and Digital", 2.MD.C.7). The
   gate keeps its OWN oracle: the design's round tables (§6), its own hand
   angles (hour = 30h + m/2, minute = 6m), its own error names and its own
   grading — never read off the tool.
   A the rounds · B the answer-position balance · C every way to plug the
   three cards × every round, graded by the own oracle · D the plugs · E the
   printed times · F the success line's tip · G the plan · H strings ×11
   and reachability · I drawing rules · J the manifest row.
   DC_CORE / DC_ACT / DC_MANIFEST let mutate-drive-cables.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.DC_CORE || path.join(ROOT, 'mini tools', 'drive-cables-core.js');
const ACT_PATH = process.env.DC_ACT || path.join(ROOT, 'mini tools', 'drive-cables-activity.js');
const MAN_PATH = process.env.DC_MANIFEST || path.join(ROOT, 'mini tools', 'clock-digital-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6, after the critic's re-lay; L2 #8's middle card is 9:10) ---------- */
const OWN = {
  1: [
    [['3:00', '7:30', '11:00'], '6:30', 'half', 'LABC'], [['9:00', '2:30', '5:00'], '1:30', 'half', 'ALCB'], [['12:00', '4:30', '8:00'], '4:00', 'longHand', 'CBLA'],
    [['6:00', '10:30', '1:00'], '12:30', 'swap', 'ALBC'], [['2:00', '8:30', '11:30'], '7:30', 'half', 'BCAL'], [['7:00', '3:30', '10:00'], '3:00', 'longHand', 'CBAL'],
    [['5:30', '9:30', '4:00'], '12:20', 'swap', 'LBAC'], [['1:30', '6:30', '12:00'], '6:00', 'longHand', 'BCLA']
  ],
  2: [
    [['10:15', '5:20', '8:00'], '10:45', 'quarter', 'BLCA'], [['1:45', '7:30', '11:15'], '1:15', 'quarter', 'BCAL'], [['6:45', '2:30', '4:05'], '6:15', 'quarter', 'LBAC'],
    [['9:40', '12:15', '3:25'], '9:20', 'five', 'LCBA'], [['11:15', '3:50', '7:10'], '11:45', 'quarter', 'CALB'], [['4:45', '1:20', '8:35'], '5:45', 'hourHand', 'BLAC'],
    [['2:55', '10:25', '4:15'], '3:55', 'hourHand', 'ALCB'], [['12:45', '9:10', '5:35'], '1:45', 'hourHand', 'ABLC'], [['3:00', '8:20', '11:40'], '12:15', 'swap', 'CABL']
  ]
};
const tm = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
const HA = (t) => (Math.floor(t / 60) % 12) * 30 + (t % 60) / 2, MA = (t) => (t % 60) * 6;
const same = (a, b) => HA(a) === HA(b) && MA(a) === MA(b);
/* the own error names: what a child must have misread to put card c on clock k */
const OWN_ERR = (c, k) => {
  if (same(c, k)) return null;
  const ch = Math.floor(c / 60), cm = c % 60, kh = Math.floor(k / 60), km = k % 60;
  /* swapped: the clock's hour is the number the card's long hand points at, and its long hand points at the card's hour */
  if (cm % 5 === 0 && kh % 12 === (cm / 5) % 12 && MA(k) === (ch % 12) * 30) return 'swap';
  const d = Math.abs(ch % 12 - kh % 12), near = d === 1 || d === 11;
  if (cm === km && near) return cm === 30 ? 'half' : 'hourHand';
  if (ch === kh && cm === 30 && km === 0) return 'longHand';
  if (ch === kh && ((cm === 15 && km === 45) || (cm === 45 && km === 15))) return 'quarter';
  if (ch === kh && cm % 15 !== 0) return 'five';
  return 'other';
};
const OWN_HINT = { swap: 'hintSwap', half: 'hintHalf', hourHand: 'hintHourHand', longHand: 'hintLongHand', quarter: 'hintQuarter', five: 'hintFive', other: 'hintOther' };
const slotsOf = (row) => row[3].split('').map((ch) => (ch === 'L' ? 'L' : 'ABC'.indexOf(ch)));

/* ---------- A. the rounds ---------- */
for (const lv of ['1', '2']) {
  const R = C.rounds(lv), tag = 'A: L' + lv;
  ok(R.length === OWN[lv].length && R.length >= 7, tag + ' has ' + OWN[lv].length + ' rounds (≥ 7)');
  ok(C.passSize(lv) === OWN[lv].length, tag + ' pass size');
  R.forEach((r, i) => {
    const row = OWN[lv][i], cards = row[0].map(tm), lure = tm(row[1]), lay = slotsOf(row), t = tag + ' #' + (i + 1);
    ok(r.cards.join() === cards.join() && r.lure === lure, t + ' cards ' + row[0].join(' ') + ' · lure ' + row[1] + ' (design table)');
    ok(r.layout.join() === lay.join(), t + ' slot layout ' + row[3]);
    const clocks = lay.map((x) => (x === 'L' ? lure : cards[x]));
    ok(r.slots.join() === clocks.join(), t + ' the four clocks show the table\'s times');
    ok(new Set(clocks.map((k) => HA(k) + '/' + MA(k))).size === 4, t + ' no two clocks show the same hands');
    cards.forEach((c, j) => ok(clocks.filter((k) => same(c, k)).length === 1, t + ' card ' + row[0][j] + ' matches exactly one clock'));
    ok(cards.every((c) => !same(c, lure)), t + ' the lure matches no card');
    const baited = cards.map((c, j) => [j, OWN_ERR(c, lure)]).filter((p) => p[1] !== 'other');
    ok(baited.length === 1 && baited[0][1] === row[2], t + ' the lure baits exactly one card, by "' + row[2] + '" (' + JSON.stringify(baited) + ')');
    ok(baited.length === 1 && r.baited === baited[0][0] && r.lureError === row[2], t + ' the core names the same baited card');
    /* L1 cards (and so their clocks) are :00/:30; only a swapped-hands lure may sit elsewhere (4:00 swapped is 12:20) */
    const ms = cards.map((x) => x % 60).concat(row[2] === 'swap' ? [] : [lure % 60]);
    ok(lv === '1' ? ms.every((m) => m === 0 || m === 30) : clocks.concat(cards).every((x) => x % 5 === 0), t + (lv === '1' ? ' only :00 and :30 (a swapped-hands lure excepted)' : ' five-minute times'));
    ok(clocks.concat(cards).every((x) => x >= 60 && x < 13 * 60), t + ' every time is a 1–12 clock time');
  });
  /* the angles the drawing uses are the own ones (the hour hand is never ON the hour at :30) */
  for (const r of R) for (const k of r.slots.concat(r.cards)) ok(C.hourAngle(k) === HA(k) && C.minuteAngle(k) === MA(k), tag + ' hand angles for ' + C.fmt('en', k));
}

/* ---------- B. answer-position balance (the critic's measured rule) ---------- */
for (const lv of ['1', '2']) {
  const rows = OWN[lv], shift = [0, 0, 0, 0], cs = {}, lureAt = [0, 0, 0, 0]; let pairs = 0;
  rows.forEach((row) => { const lay = slotsOf(row); lay.forEach((x, s) => { if (x === 'L') { lureAt[s]++; return; } pairs++; shift[(s - x + 4) % 4]++; cs[x + '/' + s] = (cs[x + '/' + s] || 0) + 1; }); });
  ok(Math.max(...shift) / pairs <= 0.30, 'B: L' + lv + ' no fixed shift "slot = card + k" is right more than 30 % (' + shift.join('/') + ' of ' + pairs + ')');
  ok(Object.values(cs).every((n) => n <= 3), 'B: L' + lv + ' every (card, slot) at most 3 times');
  ok(Object.keys(cs).length === 12, 'B: L' + lv + ' every card position reaches every slot');
  ok(lureAt.every((n) => n >= 2 && n <= 3), 'B: L' + lv + ' the lure sits 2–3 times in each slot (' + lureAt.join('/') + ')');
  /* a bot that matches by the long hand only, first clock wins, never solves a round whose lure is a long-hand twin */
  let solved = 0;
  rows.forEach((row) => { const cards = row[0].map(tm), lay = slotsOf(row), clocks = lay.map((x) => (x === 'L' ? tm(row[1]) : cards[x])); const used = new Set(); const pick = cards.map((c) => { const s = clocks.findIndex((k, i) => !used.has(i) && MA(k) === MA(c)); used.add(s); return s; }); if (pick.every((s, j) => s >= 0 && same(cards[j], clocks[s]))) solved++; });
  ok(solved < rows.length, 'B: L' + lv + ' reading the long hand alone does not solve every round (' + solved + '/' + rows.length + ')');
}

/* ---------- C. every way to plug three cards into four clocks × every round ---------- */
const perms = []; for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) for (let c = 0; c < 4; c++) if (a !== b && b !== c && a !== c) perms.push([a, b, c]);
ok(perms.length === 24, 'C: 24 ways to plug');
for (const lv of ['1', '2']) C.rounds(lv).forEach((r, k) => {
  const row = OWN[lv][k], cards = row[0].map(tm), clocks = slotsOf(row).map((x) => (x === 'L' ? tm(row[1]) : cards[x]));
  let right = 0;
  for (const p of perms) {
    const st = C.newState(lv, k);
    p.forEach((s, c) => C.plug(st, c, s));
    ok(st.plugs.join() === p.join(), 'C: L' + lv + '#' + (k + 1) + ' plugs ' + p.join());
    const res = C.check(st), errs = p.map((s, c) => OWN_ERR(cards[c], clocks[s])), good = errs.every((e) => e === null);
    if (good) right++;
    ok((res.result === 'ok') === good && st.done === good, 'C: L' + lv + '#' + (k + 1) + ' ' + p.join() + ' graded ' + (good ? 'right' : 'wrong'));
    if (!good) {
      const first = errs.findIndex((e) => e !== null);
      ok(st.misses === 1 && !st.help, 'C: one miss, no help yet');
      ok(st.locked.join() === errs.map((e) => e === null).join(), 'C: L' + lv + '#' + (k + 1) + ' ' + p.join() + ' exactly the right pairs stay lit');
      ok(C.hint(st) === OWN_HINT[errs[first]], 'C: L' + lv + '#' + (k + 1) + ' ' + p.join() + ' hint ' + OWN_HINT[errs[first]] + ' (got ' + C.hint(st) + ')');
      ok(st.verdict.pairs.every((q, c) => q.error === errs[c]), 'C: every pair carries the own error name');
      C.check(st); ok(st.misses === 2 && st.help && C.hint(st) === 'hintHelp', 'C: a second miss turns the help on');
    }
  }
  ok(right === 1, 'C: L' + lv + '#' + (k + 1) + ' exactly one way is right');
});

/* ---------- D. the plugs ---------- */
{
  const st = C.newState('1', 0);
  ok(C.check(st).result === 'note' && st.misses === 0, 'D: Check with no cards → a note, no miss');
  C.plug(st, 0, 1); C.plug(st, 1, 2);
  const n = C.check(st); ok(n.result === 'note' && n.key === 'hintPlug' && st.misses === 0, 'D: Check with two cards → hintPlug, no miss');
  ok(C.plug(st, 2, 1) && st.plugs[2] === 1 && st.plugs[0] === null, 'D: a socket holds one plug: the plug already there springs back to its card');
  ok(!C.plug(st, 2, 1), 'D: plugging a card where it already is changes nothing');
  ok(C.unplug(st, 2) && st.plugs[2] === null && !C.unplug(st, 2), 'D: a card can be pulled out (once)');
  ok(!C.plug(st, 0, 4) && !C.plug(st, 0, -1), 'D: only four sockets');
  /* a lit pair cannot move, and its socket refuses another plug */
  const s2 = C.newState('1', 0), r = s2.round; const right = (c) => r.layout.indexOf(c);
  C.plug(s2, 0, right(0)); C.plug(s2, 1, r.layout.indexOf('L')); C.plug(s2, 2, right(2)); C.check(s2);
  ok(s2.locked[0] && s2.locked[2] && !s2.locked[1], 'D: after a miss the right pairs are lit');
  ok(!C.plug(s2, 0, right(1)) && !C.unplug(s2, 0), 'D: a lit card cannot be moved or pulled out');
  ok(!C.plug(s2, 1, right(0)), 'D: a lit socket refuses another plug');
  ok(C.plug(s2, 1, right(1)) && s2.verdict === null, 'D: moving the wrong card clears the ghosts');
  ok(C.check(s2).result === 'ok' && s2.done, 'D: then Check solves it');
  ok(!C.plug(s2, 1, r.layout.indexOf('L')) && C.check(s2).result === 'no', 'D: a solved board is frozen');
}

/* ---------- E. the printed times (own expectation per locale) ---------- */
const E = { en: '7:30', de: '7:30', es: '7:30', pt: '7:30', it: '7:30', nl: '7.30', sv: '7.30', da: '7.30', no: '7.30', fi: '7.30', fr: '7 h 30' };
LOCALES.forEach((l) => { ok(C.fmt(l, tm('7:30')) === E[l], 'E: ' + l + ' prints 7:30 as "' + E[l] + '"'); ok(/0?5$/.test(C.fmt(l, tm('4:05'))) && /05$/.test(C.fmt(l, tm('4:05'))), 'E: ' + l + ' keeps the minutes two digits'); ok(!/[ap]\.?m/i.test(C.fmt(l, tm('11:00'))), 'E: ' + l + ' no a.m./p.m. on a card'); });

/* ---------- F. the tip: about the baited card, with the right hand facts ---------- */
const sandbox = {}; new Function('window', 'document', 'DriveCablesCore', SRC.replace(/injectDriveCablesCSS\(\);/, '') + ';window.X=DriveCablesActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings;
const fill = (s, a) => s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m));
for (const lv of ['1', '2']) C.rounds(lv).forEach((r, k) => {
  const row = OWN[lv][k], cards = row[0].map(tm), j = cards.findIndex((c) => OWN_ERR(c, tm(row[1])) !== 'other'), c = cards[j], h = Math.floor(c / 60), m = c % 60;
  const ownKey = m === 0 ? 'tipOclock' : m === 30 ? 'tipHalf' : m === 15 ? 'tipPast' : m === 45 ? 'tipTo' : 'tipFive';
  LOCALES.forEach((l) => {
    const tip = C.tipOf(r, l), txt = fill(STR[tip.key][l], tip.args);
    ok(tip.key === ownKey && tip.args.t === C.fmt(l, c), 'F: L' + lv + '#' + (k + 1) + ' ' + l + ' explains ' + row[0][j] + ' with ' + ownKey);
    ok(tip.args.h === h && tip.args.h1 === h % 12 + 1 && (ownKey !== 'tipFive' || (tip.args.n === m / 5 && tip.args.m === m)), 'F: L' + lv + '#' + (k + 1) + ' ' + l + ' the hand facts (hour ' + h + ', next ' + (h % 12 + 1) + ')');
    ok(!/\{\w+\}/.test(txt), 'F: ' + l + ' the tip fills every placeholder');
  });
});

/* ---------- G. the plan ---------- */
for (const lv of ['1', '2']) {
  const n = OWN[lv].length, all = Array.from({ length: n }, (_, i) => i).join();
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let prev = null, same2 = 0; const seen = new Set();
  for (let p = 0; p < 300; p++) { const o = C.plan(lv, p, rnd, prev); ok(o.slice().sort((a, b) => a - b).join() === all, 'G: L' + lv + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same2++; seen.add(o.join()); prev = o; }
  ok(same2 === 0, 'G: L' + lv + ' never repeats the previous order');
  ok(seen.size > 100, 'G: L' + lv + ' orders really shuffle (' + seen.size + ')');
  /* the same random stream replayed must still give a NEW order (a plan that ignores prev repeats it here) */
  const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
  for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(lv, 0, stream(sd), null), o2 = C.plan(lv, 0, stream(sd), o1); ok(o1.join() !== o2.join(), 'G: L' + lv + ' replayed stream ' + sd + ' gives a new order'); }
}

/* ---------- H. strings ×11 and reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
ok(keys.length >= 30, 'H: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).filter((x, i, a) => a.indexOf(x) === i).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  ok(body.includes("'" + k + "'") || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
});
/* every key the code asks for exists */
const asked = new Set([...body.matchAll(/(?:_t|\bT)\('(\w+)'/g)].map((m) => m[1]).concat([...body.matchAll(/return '(hint\w+)'/g)].map((m) => m[1])).concat([...body.matchAll(/'(tip\w+)'/g)].map((m) => m[1])));
asked.forEach((k) => ok(keys.includes(k), 'H: the code asks for "' + k + '", which is authored'));
['hintPick', 'hintPlug', 'hintSwap', 'hintHalf', 'hintHourHand', 'hintLongHand', 'hintQuarter', 'hintFive', 'hintOther', 'hintHelp', 'taskLine'].forEach((k) => LOCALES.forEach((l) => ok(!/\{/.test(STR[k][l]) && !/\d{1,2}[:.]\d\d|\d\s?h\s?\d\d/.test(STR[k][l]), 'H: ' + l + ' ' + k + ' names no time')));
/* the half-past trap: in de/nl/sv/da/no/fi "half X" names the NEXT hour, so no hint or tip may use the word */
const HALF = { de: /(?<!\p{L})halb(?!\p{L})/iu, nl: /(?<!\p{L})half(?!\p{L})/iu, sv: /(?<!\p{L})halv(?!\p{L})/iu, da: /(?<!\p{L})halv(?!\p{L})/iu, no: /(?<!\p{L})halv(?!\p{L})/iu, fi: /(?<!\p{L})puoli (?:yksi|kaksi|kolme|neljä|viisi|kuusi|seitsemän|kahdeksan|yhdeksän|kymmenen)/iu };
Object.keys(HALF).forEach((l) => keys.filter((k) => /^(hint|tip)/.test(k)).forEach((k) => ok(!HALF[l].test(STR[k][l]), 'H: ' + l + ' ' + k + ' avoids the "half to the next hour" idiom')));
/* poison the trap both ways */
ok(HALF.de.test('um halb acht') && !HALF.de.test('genau zwischen zwei Zahlen') && !HALF.de.test('halbe Stunden'), 'H: the de half-idiom ban fires on "halb acht" and not on correct text');
ok(HALF.sv.test('klockan halv åtta') && !HALF.sv.test('halva timmar'), 'H: the sv half-idiom ban fires on "halv åtta" and not on "halva timmar"');
/* the hour-hand lures sit at :45 / :55, where the short hand is NEARLY at the next number: the hint must point back to the number it has ALREADY passed (the reviewer's 2026-10-29 finding) */
for (const lv of ['1', '2']) OWN[lv].forEach((row) => { if (row[2] === 'hourHand') { const j = row[0].map(tm).findIndex((c) => OWN_ERR(c, tm(row[1])) === 'hourHand'); ok(tm(row[0][j]) % 60 >= 45, 'H: the hour-hand lure for ' + row[0][j] + ' is a late-in-the-hour time'); } });
ok(/already passed/.test(STR.hintHourHand.en) && /nearly at/.test(STR.hintHourHand.en) && !/just passed/.test(STR.hintHourHand.en), 'H: en hintHourHand points to the number ALREADY passed, not the one it is nearly at');
LOCALES.forEach((l) => ok((STR.hintHourHand[l].match(/[?？]/g) || []).length === 1 && /[?]\s+\S/.test(STR.hintHourHand[l]), 'H: ' + l + ' hintHourHand asks, then warns off the nearly-reached number'));
LOCALES.forEach((l) => ok(/\{a\}/.test(STR.okAll[l]) && /\{b\}/.test(STR.okAll[l]) && /\{c\}/.test(STR.okAll[l]), 'H: ' + l + ' okAll names all three cards'));
LOCALES.forEach((l) => ok(!/\{time\}/.test(STR.aClockOn[l]) && !/\{time\}/.test(STR.aClockBetween[l]), 'H: ' + l + ' before success a clock is read by its hands, never its time'));
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ;');
ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(strBlock), 'H: no "free" in the activity text');

/* ---------- I. drawing rules ---------- */
const ACT_BODY = SRC.replace(strBlock, '');
ok(/var c = r\.cards\[pair\.card\]; opts\.ghost = c;/.test(ACT_BODY), 'I: the ghost hands show the CARD\'s time, not the clock\'s');
ok(/opts\.pulseH = C\.hourAngle\(c\) !== C\.hourAngle\(t\); opts\.pulseM = C\.minuteAngle\(c\) !== C\.minuteAngle\(t\);/.test(ACT_BODY), 'I: only the hand that disagrees blinks');
ok(/if \(st\.help\) \{ opts\.dots = C\.minuteAngle\(c\);/.test(ACT_BODY), 'I: the five-minute dots come only with the help');
ok(/opts\.bold = x\.m \? \[x\.h % 12 \|\| 12, \(x\.h % 12\) \+ 1\] : \[x\.h % 12 \|\| 12\];/.test(ACT_BODY), 'I: bold the two numbers the short hand sits between (one at o\'clock)');
ok(/pair\.error !== undefined && pair\.error !== null && st\.verdict/.test(ACT_BODY), 'I: ghosts only on wrong pairs after Check');
ok(/var label = st\.done \? self\._t\('aClockDone'/.test(ACT_BODY), 'I: a clock says its time only after success');
ok(/for \(var h = 1; h <= 12; h\+\+\) \{ if \(q && h % 3\) continue;/.test(ACT_BODY) && !/if \(q[^)]*\) continue;[^\n]*dc-tick/.test(ACT_BODY), 'I: "only 12, 3, 6, 9" hides numerals, never the ticks');
ok(/var lit = pair && pair\.lit/.test(ACT_BODY), 'I: a lamp lights only for a locked (right) pair');
ok(/\.lcs-activity-check\{display:none !important;\}/.test(ACT_BODY) && /chk\.click\(\); \}, this\.OK_MS\)/.test(ACT_BODY) && /OK_MS: 500/.test(ACT_BODY), 'I: the shell\'s Check is hidden and pressed 0.5 s after success');
ok(!/role="img"/.test(ACT_BODY), 'I: no svg role="img"');

/* ---------- J. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const mrow = list.find((x) => x.id === 'clock-digital.match-clocks.2-md-c-7');
ok(mrow && mrow.tool === 'drive-cables-activity' && mrow.task_template === 'drive-cables', 'J: the row points at the drive cables');
ok(mrow && mrow.alignment.code === '2.MD.C.7' && mrow.alignment.grade === '2', 'J: the alignment stays');
ok(mrow && LOCALES.every((l) => mrow.slug[l] && mrow.page_title[l] && mrow.page_intro[l]), 'J: the row ships in all 11 locales');
ok(mrow && new Set(Object.values(mrow.slug)).size === 11 && Object.values(mrow.slug).every((s) => /^[a-z0-9-]+$/.test(s)), 'J: 11 different url-safe slugs');
ok(mrow && !LOCALES.some((l) => /(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(mrow.page_title[l] + ' ' + mrow.page_intro[l])), 'J: no "free" in the page metadata');

console.log(`verify-drive-cables-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
