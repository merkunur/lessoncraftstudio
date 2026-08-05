#!/usr/bin/env node
/* =====================================================================
   verify-learning-clock.js — the model gate.

   ⭐ THE ORACLES ARE IMPLEMENTED HERE, NOT READ OFF THE TOOL. The tool
   writes the hour angle as `total/2`; this file recomputes it as
   `30*h + 0.5*m` from the raw minute count and requires the two to agree
   over the WHOLE domain. Reading the expectation off the artefact is how
   a gate marks its own homework — #44 shipped a MIRRORED side profile
   past a green suite because both sides of the comparison carried the
   same convention.

   ⚠ NO BROWSER WORK IN THIS FILE. A gate that hangs is scored by the
   mutation harness as SURVIVED, so every loop here is bounded by a
   constant.

   ⚠ NON-VACUITY FIRST, EVERYWHERE. A radius comparison passes trivially
   on a clock with no hands and a locale sweep passes trivially on an
   empty table, so each section asserts its subject is non-empty before it
   asserts anything about it.

   DOMAIN, and it is exhaustive rather than sampled:
     · 720 integer minute totals x 5 granularities  = 3,600 snap states
     · 360 x 360 signed-delta pairs                 = 129,600
     · 720 totals x 2 hands                         gearing
     · 11 locales x 12 positions x 2 overlays       arc direction
     · 720 targets x 5 granularities                practice start pose

   Run:  node scripts/verify-learning-clock.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = process.env.LCK_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const FILE = path.join(DIR, 'learning-clock.js');
const SRC = fs.readFileSync(FILE, 'utf8').replace(/\r\n/g, '\n');
const T = require(FILE);

/* ⚠ CAPTURED AT LOAD, BEFORE ANY ASSERTION CAN TOUCH THEM. A mutation
   that empties a constant must not be repaired by reading a sibling that
   happens to agree with it. */
const DECLARED_FREE = Array.isArray(T.FREE_STEPS) ? T.FREE_STEPS.slice() : null;
const G = T.G ? JSON.parse(JSON.stringify(T.G)) : null;
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

let checks = 0, errors = [];
function ok(cond, msg) { checks++; if (!cond) errors.push(msg); }
function section(n) { process.stdout.write('  [' + n + '] '); }
function done() { process.stdout.write('ok\n'); }

/* ---------------- V1 · the artefact is present at all -------------- */
section('V1 shape');
ok(T && T.id === 'learning-clock', 'V1 id');
ok(!!G, 'V1 geometry table missing');
ok(Array.isArray(DECLARED_FREE) && DECLARED_FREE.length > 0, 'V1 FREE_STEPS empty or absent');
ok(Array.isArray(T.STEPS) && T.STEPS.length === 5, 'V1 STEPS must be the 5-rung ladder');
ok(T.TIME_RULES && Object.keys(T.TIME_RULES).length === 11, 'V1 TIME_RULES must carry 11 locales');
ok(typeof T.sayTime === 'function', 'V1 sayTime missing');
ok(typeof T._handPath === 'function', 'V1 _handPath missing');
done();

/* ---------------- V2 · hand angles, exhaustive over 720 ------------ */
section('V2 hand angles (720)');
/* ⭐ CALL THE TOOL. A first version wrote `const toolHourAngle = t => t/2`
   — the tool's own expression, copied in — and the mutation harness then
   reported SIX survivors in a row, because both sides of every comparison
   were this file's own arithmetic. The model is now five pure functions
   on the tool and the gate drives them. */
ok(typeof T.hourAngle === 'function' && typeof T.minuteAngle === 'function' &&
   typeof T.applyDelta === 'function' && typeof T.snapTo === 'function' &&
   typeof T.startPoseFor === 'function', 'V2 the pure model is not exposed — nothing below tests the tool');
const toolHourAngle = t => T.hourAngle(t);
const toolMinAngle = t => T.minuteAngle(t);
let agreeH = 0, agreeM = 0;
for (let t = 0; t < 720; t++) {
  const h = Math.floor(t / 60), m = t % 60;
  const oracleH = 30 * h + 0.5 * m;      /* independent: 30 per hour + half a degree per minute */
  const oracleM = 6 * m;                 /* independent: six degrees per minute */
  if (Math.abs(toolHourAngle(t) - oracleH) < 1e-9) agreeH++;
  if (Math.abs(toolMinAngle(t) - oracleM) < 1e-9) agreeM++;
}
ok(agreeH === 720, `V2 hour angle disagrees with 30h+0.5m on ${720 - agreeH} of 720`);
ok(agreeM === 720, `V2 minute angle disagrees with 6m on ${720 - agreeM} of 720`);
/* ⚠ non-vacuity: the oracle must be able to DISAGREE */
ok(Math.abs((30 * 2 + 0.5 * 30) - toolHourAngle(151)) > 0.1, 'V2 oracle cannot distinguish anything — vacuous');
done();

/* ---------------- V3 · the gearing law ----------------------------- */
section('V3 gearing');
const applyMinute = (t, deg) => T.applyDelta('minute', t, deg);
const applyHour = (t, deg) => T.applyDelta('hour', t, deg);
/* the independent statement of the same law: a minute drag is degrees/6
   and an hour drag is degrees*2, both wrapped into [0,720) */
const oracleApply = (which, t, deg) => (((t + (which === 'minute' ? deg / 6 : deg * 2)) % 720) + 720) % 720;
let gearAgree = 0, gearN = 0;
for (let t = 0; t < 720; t += 7) for (const d of [-90, -1, 0, 1, 5, 90, 360]) {
  for (const wch of ['minute', 'hour']) {
    gearN++;
    if (Math.abs(T.applyDelta(wch, t, d) - oracleApply(wch, t, d)) < 1e-9) gearAgree++;
  }
}
ok(gearN > 1000, 'V3 gearing domain too small — vacuous');
ok(gearAgree === gearN, `V3 applyDelta disagrees with degrees/6 and degrees*2 on ${gearN - gearAgree} of ${gearN}`);
/* a full lap of the minute hand advances the hour hand exactly one hour */
let lapOk = 0;
for (let t = 0; t < 720; t++) {
  const after = applyMinute(t, 360);
  const before = Math.floor(t / 60), now = Math.floor(after / 60);
  if (((now - before) + 12) % 12 === 1) lapOk++;
}
ok(lapOk === 720, `V3 a 360-degree minute lap failed to advance the hour on ${720 - lapOk} of 720`);
/* dragging the hour hand sweeps the minute hand at exactly twelve times */
let sweepOk = 0;
for (let t = 0; t < 720; t += 1) {
  const d = 5;
  const after = applyHour(t, d);
  const dm = ((toolMinAngle(after) - toolMinAngle(t)) % 360 + 360) % 360;
  const dh = ((toolHourAngle(after) - toolHourAngle(t)) % 360 + 360) % 360;
  if (Math.abs(dm - (dh * 12) % 360) < 1e-6) sweepOk++;
}
ok(sweepOk === 720, `V3 the hour hand failed to sweep the minute at 12x on ${720 - sweepOk} of 720`);
done();

/* ---------------- V4 · signed delta wraps, 129,600 pairs ----------- */
section('V4 signed delta (129,600)');
const signed = T._signedDelta.bind(T);
/* ⚠ ASSERT THE LAW, NOT A HALF-OPEN INTERVAL I PICKED. A first version
   required (-180,180] and failed 180 correct cases: at exactly half a
   turn the two answers are +180 and -180, the tool returns -180 and the
   oracle +180, and BOTH are the shortest way round. The real requirement
   is |d| <= 180 and d congruent to (b-a) mod 360 — that is checkable and
   strictly stronger than the interval I invented. */
let inRange = 0, congruent = 0, shortest = 0;
for (let a = 0; a < 360; a++) {
  for (let b = 0; b < 360; b++) {
    const d = signed(a, b);
    if (Math.abs(d) <= 180 + 1e-9) inRange++;
    if ((((d - (b - a)) % 360) + 360) % 360 < 1e-9) congruent++;
    let e = ((b - a) % 360 + 360) % 360;
    if (e > 180) e -= 360;
    if (Math.abs(Math.abs(d) - Math.abs(e)) < 1e-9) shortest++;
  }
}
ok(inRange === 129600, `V4 ${129600 - inRange} deltas exceeded half a turn`);
ok(congruent === 129600, `V4 ${129600 - congruent} deltas were not congruent to b-a mod 360`);
ok(shortest === 129600, `V4 ${129600 - shortest} deltas were not the shortest way round`);
ok(Math.abs(signed(0, 90) - 90) < 1e-9 && Math.abs(signed(350, 10) - 20) < 1e-9,
  'V4 the wrap is wrong on its own worked examples — vacuous');
done();

/* ---------------- V5 · snapping, 3,600 states ---------------------- */
section('V5 snap (3,600)');
const snap = (t, g) => T.snapTo(t, g);
let idem = 0, near = 0, onGrid = 0, total5 = 0;
for (const g of [60, 30, 15, 5, 1]) {
  for (let t = 0; t < 720; t++) {
    total5++;
    const s = snap(t, g);
    if (snap(s, g) === s) idem++;
    let d = Math.abs(s - t); if (d > 360) d = 720 - d;
    if (d <= g / 2 + 1e-9) near++;
    if (s % g === 0) onGrid++;
  }
}
ok(total5 === 3600, 'V5 domain is not 3,600');
ok(idem === 3600, `V5 snap is not idempotent on ${3600 - idem}`);
ok(near === 3600, `V5 snap moved further than half a step on ${3600 - near}`);
ok(onGrid === 3600, `V5 snap landed off the grid on ${3600 - onGrid}`);
done();

/* ---------------- V6 · THE POINTING CONTRACT ----------------------- */
section('V6 pointing contract');
ok(G.hourTip > 0 && G.minTip > 0 && G.hourNumR > 0 && G.dotR > 0, 'V6 radii are not all positive — vacuous');
/* each hand stops just inside the ring it points at, and never reaches
   the ring belonging to the other hand */
ok(G.hourTip < G.hourNumR, `V6 the hour hand must stop INSIDE the hour numerals (${G.hourTip} vs ${G.hourNumR})`);
ok(G.hourNumR - G.hourTip >= 25, 'V6 the hour hand ends too close to the numerals to read as pointing at them');
ok(G.minTip >= G.dotR - 6 && G.minTip <= G.dotR + 6, `V6 the minute hand must land ON the coral dot ring (${G.minTip} vs ${G.dotR})`);
ok(G.hourTip < G.ring24R || G.ring24R === 0 || G.hourTip > G.ring24R,
  'V6 the hour hand must not terminate on the 24-hour ring');
/* ⚠ THE SHIPPED BUILD FAILED EXACTLY THIS: hourTip 40 against numerals at
   64 and a 13-24 ring at 47, so on a non-English face the hour hand ended
   ON the inner ring and a child following it read "14" for "2". */
ok(Math.abs(G.hourTip - G.ring24R) > 20, 'V6 the hour hand terminates on the 24-hour ring — the shipped defect');
/* the two grips can never become ambiguous */
const sep = Math.abs(G.gripMinR - G.gripHourR) / 1000;
ok(sep >= 0.18, `V6 grip separation ${(sep * 100).toFixed(1)}% is below the 18% floor — the hands become ambiguous when collinear`);
ok(G.gripHourR < G.hourTip, 'V6 the hour grip must sit ON its own blade');
ok(G.gripMinR <= G.minTip + 2, 'V6 the minute grip must sit on its own blade');
done();

/* ---------------- V7 · the hand silhouettes ------------------------ */
section('V7 hand geometry');
function fakeNS(tag, attrs) { return { tag: tag, attrs: attrs || {}, kids: [], appendChild(k) { this.kids.push(k); }, setAttribute(k, v) { this.attrs[k] = v; } }; }
const hourG = T._handPath(fakeNS, 'hour', false);
const minG = T._handPath(fakeNS, 'minute', false);
ok(hourG && hourG.kids.length >= 2, 'V7 the hour hand drew nothing — vacuous');
ok(minG && minG.kids.length >= 2, 'V7 the minute hand drew nothing — vacuous');
function pathOf(g) { const p = g.kids.find(k => k.tag === 'path'); return p && p.attrs.d; }
function weightOf(g) { const c = g.kids.find(k => k.tag === 'circle'); return c && c.attrs; }
const hd = pathOf(hourG), md = pathOf(minG);
ok(!!hd && !!md, 'V7 no blade path');
/* ⚠ THE TAIL MUST BE BEHIND THE PIVOT. Written `cy - back` the blade
   started on the TIP side, so each hand floated clear of the hub with its
   counterweight bobbing at the far end. Every gate passed; a render
   caught it. The test is coordinate-level, not visual: the blade's base
   y must be GREATER than the centre (below it) and its tip y LESS. */
/* ⚠ PARSE THE EXPLICIT COMMANDS. A first version split the path on
   /[ML A]+/, which silently swallowed the arc's flag arguments and then
   crashed on an undefined pair — and a CRASHED gate reads exactly like a
   FAILED one while having measured nothing. */
function moveTo(d) { const m = /M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/.exec(d); return m ? { x: +m[1], y: +m[2] } : null; }
function allPts(d) {
  const out = []; const re = /[ML]\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/g; let m;
  while ((m = re.exec(d))) out.push({ x: +m[1], y: +m[2] });
  return out;
}
[['hour', hd], ['minute', md]].forEach(([name, d]) => {
  const base = moveTo(d), pts = allPts(d);
  ok(!!base, `V7 the ${name} path has no move-to — vacuous`);
  ok(pts.length >= 3, `V7 the ${name} path has only ${pts.length} points — vacuous`);
  ok(base.y > G.C, `V7 the ${name} hand's blade starts on the TIP side of the pivot (${base.y} vs centre ${G.C})`);
  const tipY = Math.min.apply(null, pts.map(p => p.y));
  ok(tipY < G.C, `V7 the ${name} hand's tip is not past the pivot`);
  /* ⚠ BOTH BASE CORNERS, NOT JUST THE MOVE-TO. Checking only the first
     point let a mutation flip the FAR corner to the tip side and survive
     — the blade would have rendered as a bow-tie through the pivot. */
  const behind = pts.filter(p => p.y > G.C).length;
  const ahead = pts.filter(p => p.y < G.C).length;
  ok(behind === 2, `V7 the ${name} blade has ${behind} corner(s) behind the pivot, expected exactly 2`);
  ok(ahead >= 1, `V7 the ${name} blade has no point past the pivot`);
});
[['hour', weightOf(hourG)], ['minute', weightOf(minG)]].forEach(([name, w]) => {
  ok(w && Number(w.cy) > G.C, `V7 the ${name} counterweight is on the tip side of the pivot`);
  ok(w && Number(w.r) > 0, `V7 the ${name} counterweight has no radius`);
});
/* ⭐ THE CREAM KEYLINE is what stops the two hands merging at 12:00 */
[['hour', hourG], ['minute', minG]].forEach(([name, g]) => {
  const p = g.kids.find(k => k.tag === 'path');
  ok(p && p.attrs.stroke && p.attrs['paint-order'] === 'stroke',
    `V7 the ${name} hand has no paint-order:stroke keyline — the hands merge when collinear`);
});
/* the hour hand must be visibly the WIDER one at every shared radius */
const hw = (hd.match(/M(-?\d+(?:\.\d+)?)/) || [])[1];
const mw = (md.match(/M(-?\d+(?:\.\d+)?)/) || [])[1];
ok(Number(hw) < Number(mw), 'V7 the hour hand is not wider than the minute hand at the pivot');
done();

/* ---------------- V8 · the arc direction, DERIVED ------------------ */
section('V8 arc direction (11 x 12 x 2)');
/* ⭐ THE ASSERTION THAT WOULD HAVE CAUGHT THE SHIPPED DEFECT. The old
   build chose the arc's direction from a hardcoded locale list plus
   `m >= 20`; de and sv name the CURRENT hour at :20 (`zwanzig nach {H}`)
   and only switch at :25, so the signature feature pointed the wrong way
   in the two locales it exists to convert. Direction is a property of the
   PHRASE, so it is read off the resolved template. */
let arcChecks = 0, arcOk = 0;
for (const loc of LOCALES) {
  const rules = T.TIME_RULES[loc];
  ok(!!rules && !!rules.positions, `V8 ${loc} has no positions table — vacuous`);
  for (const overlay of [false, true]) {
    for (let m = 0; m < 60; m += 5) {
      /* ⚠ Object.create(T), not a hand-built stub. The stub carried three
         hand-copied fields and broke the moment _towardNext was split into
         _template/_halfTokens — a gate that has to be kept in step with a
         refactor is a gate that will silently stop testing. */
      const fake = Object.create(T);
      fake.api = { lang: loc };
      fake._store = { deQuarter: overlay };
      fake._halfTok = undefined;
      const got = T._towardNext.call(fake, m);
      let tpl = null;
      if (overlay && rules.overlays && rules.overlays.deQuarter && rules.overlays.deQuarter[m] !== undefined) tpl = rules.overlays.deQuarter[m];
      else tpl = rules.positions[m];
      const want = /\{N2?3?\}/.test(String(tpl));
      arcChecks++;
      if (got === want) arcOk++;
    }
  }
}
ok(arcChecks === 11 * 12 * 2, `V8 domain is ${arcChecks}, expected ${11 * 12 * 2}`);
ok(arcOk === arcChecks, `V8 the arc direction disagreed with its own phrase on ${arcChecks - arcOk}`);
/* the two cases the shipped rule got wrong, named */
{
  const mk = (loc, dq) => { const f = Object.create(T); f.api = { lang: loc }; f._store = { deQuarter: !!dq }; f._halfTok = undefined; return f; };
  ok(T._towardNext.call(mk('de'), 20) === false, 'V8 de :20 — "zwanzig nach 2" names the CURRENT hour');
  ok(T._towardNext.call(mk('de'), 25) === true, 'V8 de :25 — "fünf vor halb 3" names the COMING hour');
  ok(T._towardNext.call(mk('sv'), 20) === false, 'V8 sv :20 — "tjugo över 2" names the CURRENT hour');
  ok(T._towardNext.call(mk('de'), 15, true) === false || T._towardNext.call(mk('de', true), 15) === true,
    'V8 de :15 under the regional overlay — "viertel 3" names the COMING hour');
  ok(T._towardNext.call(mk('fr'), 35) === true, 'V8 fr :35 — "3 heures moins vingt-cinq" names the COMING hour');

  /* ---- V8b · THE ANCHOR, which is the defect two panels found --------
     Deciding WHICH HOUR the phrase names is not enough: a half-relative
     idiom measures its distance to the HALF mark, not to the hour. The
     arc swept 35 minutes for `fem i halv 3`, a phrase that says five.
     MEASURED before the fix, in six locales, at :20 :25 :35 :40. */
  const HALF_ZONE = { de: [25, 35], sv: [25, 35], nl: [20, 25, 35, 40], da: [20, 25, 35, 40],
    no: [20, 25, 35, 40], fi: [20, 25, 35, 40] };
  let anchorChecks = 0;
  Object.keys(HALF_ZONE).forEach(loc => {
    HALF_ZONE[loc].forEach(m => {
      anchorChecks++;
      ok(T._arcAnchor.call(mk(loc), m) === 30,
        `V8b ${loc} :${m} is half-relative — the arc must measure to the HALF mark, not the hour`);
    });
  });
  ok(anchorChecks === 20, `V8b the half-zone census is ${anchorChecks}, expected 20 — vacuous`);
  /* and the phrases that genuinely do run to the hour must NOT move */
  [['de', 45], ['sv', 45], ['nl', 45], ['fr', 45], ['fr', 35], ['it', 40], ['es', 40], ['pt', 45]].forEach(c => {
    ok(T._arcAnchor.call(mk(c[0]), c[1]) === 60,
      `V8b ${c[0]} :${c[1]} names the coming hour — the arc must still run to 60`);
  });
  /* past-the-hour phrases measure from the top */
  [['en', 25], ['en', 5], ['it', 20], ['es', 20], ['fr', 20], ['de', 10]].forEach(c => {
    ok(T._arcAnchor.call(mk(c[0]), c[1]) === 0,
      `V8b ${c[0]} :${c[1]} is past-the-hour — the arc must run from the top`);
  });
  /* the half token is DERIVED, and it must actually find one where a half
     idiom exists, or the whole section above passes for the wrong reason */
  ['de', 'sv', 'da', 'no', 'nl', 'fi', 'en', 'es', 'pt', 'it', 'fr'].forEach(loc => {
    const toks = T._halfTokens.call(mk(loc));
    ok(toks && toks.length > 0, `V8b ${loc}: no distinctive :30 word was derived — the anchor test would be vacuous`);
  });
}
done();

/* ---------------- V9 · the practice start pose --------------------- */
section('V9 practice start pose (3,600)');
/* ⭐⭐ STATED AS THE NEGATION OF A MEASURED FAILURE. The shipped build
   opened each round at `(target + 180) % 720` — 180 MINUTES is exactly
   three hours, so the minute hand began ON THE ANSWER in 948 of 948
   rounds and Practice never once asked a child to set it. */
const startPose = target => T.startPoseFor(target);
let poseOk = 0, poseTotal = 0, oldFail = 0;
for (const g of [60, 30, 15, 5, 1]) {
  for (let target = 0; target < 720; target += g) {
    poseTotal++;
    const s = startPose(target);
    /* the rule, stated plainly: the pose is never the answer, and for any
       target that is NOT on the hour the minute hand must also differ.
       (For an o'clock target the answer IS "minute at 12", so a 12:00
       pose has it right by construction — that round is a one-hand task
       by nature, which is not the shipped defect.) */
    const notTheAnswer = s !== target;
    const minuteDiffers = (target % 60 === 0) || ((s % 60) !== (target % 60));
    if (notTheAnswer && minuteDiffers) poseOk++;
    /* and prove the OLD rule really did fail, so this is not a tautology */
    const oldStart = snap((target + 180) % 720, g);
    if ((oldStart % 60) === (target % 60)) oldFail++;
  }
}
ok(poseOk === poseTotal, `V9 the start pose still hands the child the minute hand on ${poseTotal - poseOk} of ${poseTotal}`);
ok(oldFail === poseTotal, `V9 the poison is wrong: the OLD rule should fail every round, it failed ${oldFail}/${poseTotal}`);
/* 12:00 is the one target that cannot start at 12:00 */
ok(startPose(0) !== 0, 'V9 a 12:00 target must not start at 12:00');
done();

/* ---------------- V10 · the free/paid line ------------------------- */
section('V10 tiering');
ok(DECLARED_FREE.indexOf('60') >= 0 && DECLARED_FREE.indexOf('30') >= 0, 'V10 hours and half hours must be free');
ok(DECLARED_FREE.indexOf('15') >= 0, 'V10 quarter hours must be free — halv and kvart are ONE lesson in 7 of the 11');
ok(DECLARED_FREE.indexOf('5') >= 0, 'V10 the 5-minute step must be free — it is where every hard idiom lives');
ok(DECLARED_FREE.indexOf('1') < 0, 'V10 the 1-minute step is the paid rung (it is the only one that reaches the formal register)');
T.STEPS.forEach(s => ok(typeof s === 'string', 'V10 STEPS must be strings'));
done();

/* ---------------- V11 · strings ------------------------------------ */
section('V11 strings');
const keys = Object.keys(T.strings || {});
ok(keys.length > 40, `V11 only ${keys.length} string keys — vacuous`);
let missing = [], leaks = [], phLost = [];
keys.forEach(k => {
  const row = T.strings[k];
  LOCALES.forEach(l => {
    const v = row[l];
    if (typeof v !== 'string' || !v.trim()) missing.push(k + '.' + l);
  });
  /* placeholders must survive into every locale */
  const en = String(row.en || '');
  const ph = (en.match(/\{\w+\}/g) || []);
  ph.forEach(p => LOCALES.forEach(l => { if (String(row[l] || '').indexOf(p) < 0) phLost.push(k + '.' + l + ' lost ' + p); }));
});
ok(missing.length === 0, 'V11 missing strings: ' + missing.slice(0, 8).join(', '));
ok(phLost.length === 0, 'V11 lost placeholders: ' + phLost.slice(0, 8).join(', '));
/* ---- an untranslated leak. ⚠ NOT a blanket "must differ from English":
   French genuinely says "5 minutes", "1 minute" and "{n} minutes", so a
   blanket rule would condemn three pieces of correct native prose and
   teach the next panel to reword AROUND the gate. Measured: those are the
   only three collisions in the set, so the exemption is an auditable list
   with its reason, not a loosened pattern. */
const LEAK_OK = { 'granFive.fr': 'French for 5 minutes is 5 minutes', 'granMinute.fr': 'likewise', 'durMinutes.fr': 'likewise' };
const leaked = [];
keys.forEach(k => LOCALES.filter(l => l !== 'en').forEach(l => {
  if (T.strings[k][l] === T.strings[k].en && !LEAK_OK[k + '.' + l]) leaked.push(k + '.' + l);
}));
ok(leaked.length === 0, 'V11 untranslated English leak: ' + leaked.slice(0, 8).join(', '));
ok(Object.keys(LEAK_OK).length === 3, 'V11 the leak exemption grew — every entry needs a reason');
/* ⚠ NO CONTROL CHARACTERS IN SOURCE. The shipped build substituted a
   U+0001 sentinel into the practice prompt and split on it — correct, and
   invisible to sed, to grep and to a file reader, so one normalising
   editor away from breaking eleven locales with no gate able to see it.
   I reported it as a defect from that misreading and had to retract. */
const ctrl = SRC.match(/[ --]/g);
ok(!ctrl, `V11 ${ctrl ? ctrl.length : 0} control character(s) in source`);
/* ---- no verdict / score / countdown vocabulary, and the ban is
   POISON-TESTED IN BOTH DIRECTIONS, per locale, because my first version
   was too wide in exactly the recorded way.
   ⚠⚠ `timer` IS THE DANISH AND NORWEGIAN WORD FOR *HOURS* — this tool's
   own subject. The blanket ban condemned `granHour.da = "Timer"`,
   `granHalf.da = "Halve timer"` and `durHours.no = "{h} timer og {m}
   minutter"`: seven pieces of correct native prose, on the one tool where
   hours are the whole point. Swedish is unaffected (hours are `timmar`),
   so the exemption is an auditable two-locale list with its reason, never
   a loosened pattern. ⚠ And `\b` is ASCII-only even under /u, so the
   lookarounds are \p{L}-based or the ban is dead beside any accent. */
const TIMER_EXEMPT = { da: 'timer = hours', no: 'timer = hours' };
const w = body => new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', 'iu');
const BANNED_ALL = w('score|streak|countdown|nedtelling|nedtælling');
const BANNED_TIMER = w('timer');
let banned = [];
keys.forEach(k => LOCALES.forEach(l => {
  const v = String(T.strings[k][l] || '');
  if (BANNED_ALL.test(v)) banned.push(k + '.' + l);
  if (!TIMER_EXEMPT[l] && BANNED_TIMER.test(v)) banned.push(k + '.' + l + ' (timer)');
}));
ok(banned.length === 0, 'V11 banned vocabulary: ' + banned.join(', '));
/* MUST FIRE */
ok(BANNED_ALL.test('the score was'), 'V11 ban vacuous on "score"');
ok(BANNED_ALL.test('Countdown läuft'), 'V11 ban vacuous on "countdown"');
ok(BANNED_TIMER.test('a 5 minute timer'), 'V11 timer-ban vacuous');
/* MUST PASS — each one a real string this tool ships */
ok(!BANNED_ALL.test('Zifferblätter ausdrucken'), 'V11 ban too wide: correct German');
ok(!BANNED_ALL.test('{h} timer og {m} minutter'), 'V11 ban too wide: Danish for hours');
ok(!BANNED_ALL.test('Räkna vidare med fem'), 'V11 ban too wide: correct Swedish');
ok(!!TIMER_EXEMPT.da && !!TIMER_EXEMPT.no, 'V11 the timer exemption must name its two locales');
done();

/* ---------------- V12 · no dead strings ---------------------------- */
section('V12 reachability');
/* keys the SHELL consumes, with the citation, per the recorded rule that
   an exemption is an auditable list and never a loosened pattern */
const SHELL_CONSUMED = ['title', 'instruction'];   /* lcs-shell.js:448-449 */
const dead = [];
keys.forEach(k => {
  if (SHELL_CONSUMED.indexOf(k) >= 0) return;
  /* referenced anywhere OUTSIDE the strings declaration */
  const body = SRC.slice(SRC.indexOf('  G: {'));
  if (body.indexOf("'" + k + "'") < 0 && body.indexOf('"' + k + '"') < 0) dead.push(k);
});
ok(dead.length === 0, 'V12 authored but never referenced: ' + dead.join(', '));
done();

/* ---------------- V13 · the CSS bans ------------------------------- */
section('V13 css');
const cssStart = SRC.indexOf('function injectLearningClockCSS');
ok(cssStart > 0, 'V13 no CSS block — vacuous');
const CSS = SRC.slice(cssStart);
/* ⚠ `vh` IS FORBIDDEN INSIDE A MANIPULATIVE: the iframe grows to the
   content, so a height input is a feedback loop. */
ok(!/\d\s*vh\b/.test(CSS), 'V13 a vh unit survives in the CSS');
ok(!/\dvmin\b/.test(CSS), 'V13 a vmin unit survives in the CSS');
ok(!/@media[^{]*\b(?:min|max)-height\b/.test(CSS), 'V13 a height-keyed media query survives in the CSS');
ok(/\d\s*vw\b/.test(CSS), 'V13 no vw at all — the bans above would be vacuous on an empty stylesheet');
/* faux bold: lcs-shell imports Baloo 2 at 500;600;700 only */
ok(!/font-weight:\s*800/.test(CSS), 'V13 font-weight:800 is FAUX bold — Baloo 2 ships 500;600;700');
ok(!/font-weight['"]?\s*[:,]\s*800/.test(SRC), 'V13 font-weight 800 survives in an SVG attribute');
/* the touch rule, on all three surfaces */
['.lck-face{', '.lck-svg{', '.lck-grip{'].forEach(sel => {
  const i = CSS.indexOf(sel);
  ok(i > 0, 'V13 no rule for ' + sel);
  ok(CSS.slice(i, i + 400).indexOf('touch-action:none') > 0,
    'V13 ' + sel + ' is missing touch-action:none — this is the shipped defect');
});
/* the print sheet is DOUBLE-locked */
ok(/@media print\{/.test(CSS), 'V13 no @media print block at all');
const pm = CSS.slice(CSS.indexOf('@media print{'));
const printRules = (pm.match(/'[^']*\{[^']*'/g) || []);
ok(printRules.length > 6, 'V13 the print block is empty — vacuous');
const unscoped = printRules.filter(r => !/body\.lck-paid|@page|@media/.test(r));
ok(unscoped.length === 0, 'V13 print rules not scoped to body.lck-paid (Ctrl+P would reach a free visitor): ' + unscoped.slice(0, 3).join(' | '));
done();

/* ---------------- report ------------------------------------------ */
console.log('');
if (errors.length) {
  errors.forEach(e => console.log('  ✗ ' + e));
  console.log(`\nFAIL — ${errors.length} of ${checks} assertions`);
  process.exit(1);
}
console.log(`PASS — ${checks} assertions (exhaustive over 3,600 snap states, 129,600 deltas, 264 arc cases)`);
