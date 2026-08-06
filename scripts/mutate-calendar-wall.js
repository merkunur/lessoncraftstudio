#!/usr/bin/env node
/* =====================================================================
   mutate-calendar-wall.js — every mutation must be killed.
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-calendar-wall.js

   Breaks one model invariant at a time and requires
   `verify-calendar-wall.js` to FAIL on each. A gate that has only ever
   been seen to pass is indistinguishable from a gate that cannot fail.

   Each poison is a defect the tool could plausibly have shipped, and
   several of them are defects it DID ship: the day-of-month pattern
   index, the day count following the calendar instead of the tally.

   ⚠ A MISSING NEEDLE IS A HARNESS FAULT, NOT A SKIP. If a needle no
   longer matches, the run fails rather than quietly shrinking the total
   — otherwise the report still reads "every mutation killed" while
   testing fewer of them each time the tool is edited.
   ⚠ A HANG COUNTS AS SURVIVED, so every child runs under a timeout.
   ⚠ AND THE CONTROL MATTERS AS MUCH AS THE POISONS: the restored file
   must PASS at the end, or the run proved nothing about anything.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const P = path.join(__dirname, '..', 'mini tools', 'calendar-wall.js');
const SMOKE = path.join(__dirname, 'verify-calendar-wall.js');
const origRaw = fs.readFileSync(P, 'utf8');
/* ⚠ NORMALISE BEFORE SEARCHING. git's autocrlf can hand this file back
   with CRLF endings, and every multi-line needle below would then match
   nothing — the harness would report a shrinking total while still
   saying "every mutation killed". Remember which ending the file had so
   the restore is byte-faithful. */
const HAD_CRLF = origRaw.indexOf('\r\n') >= 0;
const orig = origRaw.split('\r\n').join('\n');
const denorm = (t) => (HAD_CRLF ? t.split('\n').join('\r\n') : t);

const POISONS = [
  { name: 'sleepsBetween uses naive ms (the DST bug)',
    find: "      var ms = Date.UTC(db.getFullYear(), db.getMonth(), db.getDate())\n             - Date.UTC(da.getFullYear(), da.getMonth(), da.getDate());\n      return Math.round(ms / 86400000);",
    to:   "      return Math.floor((db - da) / 86400000);" },

  { name: 'shiftKey uses +86400000 instead of the Date constructor',
    find: "      return this.keyFromDate(new Date(d.getFullYear(), d.getMonth(), d.getDate() + (n | 0)));",
    to:   "      return this.keyFromDate(new Date(d.getTime() + (n | 0) * 86400000));" },

  { name: 'countDay does not refuse a day already counted',
    find: "      if (this.countedOn(wall, key)) return null;",
    to:   "      if (false) return null;" },

  { name: 'countDay ignores the off mark (the count follows the calendar)',
    find: "      if (!this.isSchoolDay(wall, key)) return null;",
    to:   "      if (!this.meetsDow(wall, this.dowOf(key))) return null;" },

  { name: 'an off mark decrements the count (the forbidden auto-change)',
    find: "      if (!wall.events[key]) wall.events[key] = [];\n      wall.events[key].push(e);\n      return e.id;",
    to:   "      if (!wall.events[key]) wall.events[key] = [];\n      wall.events[key].push(e);\n      if (e.k === 'off') delete wall.days[key];\n      return e.id;" },

  { name: 'the pattern indexes by day-of-month again (the shipped defect)',
    find: "      var n = this.ordinalOn(wall, key);\n      if (!n) return null;\n      var p = (wall && wall.pattern) || 'ab';",
    to:   "      var n = +String(key).slice(8, 10);\n      var p = (wall && wall.pattern) || 'ab';" },

  { name: 'monthMatrix pads to 6 rows always (breaks the aspect ratio)',
    find: "      var rows = Math.ceil((offset + n) / 7);",
    to:   "      var rows = 6;" },

  { name: 'a yearly repeat slides onto 28 Feb in a common year',
    find: "              if (this.isKey(a1)) anchors.push({ k: a1, rep: true });",
    to:   "              anchors.push({ k: this.isKey(a1) ? a1 : String(y) + '-02-28', rep: true });" },

  { name: 'the countdown horizon is removed (the anti-nag mechanism)',
    find: "      if (sleeps > this.HORIZON) return null;",
    to:   "      if (false) return null;" },

  { name: 'schoolDaysBetween counts every day (the two numbers collapse)',
    find: "        if (this.isSchoolDay(wall, k)) count++;",
    to:   "        count++;" },

  { name: 'uncountDay lets a hole open in the middle of the ordinals',
    find: "      if (!n || n !== this.dayCount(wall)) return null;",
    to:   "      if (!n) return null;" },

  { name: 'cleanText stops capping the length',
    find: "      if (typeof max === 'number' && t.length > max) t = t.slice(0, max).trim();",
    to:   "      if (false) t = t.slice(0, max).trim();" },
];

let survived = 0, faults = 0;
console.log('poisoning ' + POISONS.length + ' invariants\n');
for (const p of POISONS) {
  if (orig.indexOf(p.find) < 0) {
    console.log('  FAULT   needle missing :: ' + p.name);
    faults++; continue;                       /* a missing needle is a HARNESS fault, not a skip */
  }
  fs.writeFileSync(P, denorm(orig.split(p.find).join(p.to)), 'utf8');
  let died = false;
  try { execFileSync(process.execPath, [SMOKE], { stdio: 'pipe', timeout: 30000 }); }
  catch (e) { died = true; }
  console.log((died ? '  killed  ' : '  SURVIVED ') + p.name);
  if (!died) survived++;
}
fs.writeFileSync(P, denorm(orig), 'utf8');      /* always restore, in the file's own ending */

/* CONTROL: the restored file must pass, or the poison run proved nothing */
let controlOk = true;
try { execFileSync(process.execPath, [SMOKE], { stdio: 'pipe', timeout: 30000 }); }
catch (e) { controlOk = false; }
console.log('\ncontrol (restored file passes): ' + (controlOk ? 'yes' : 'NO — the restore is broken'));
console.log(survived === 0 && faults === 0 && controlOk
  ? 'RESULT: PASS — every poison killed, control clean'
  : 'RESULT: FAIL — survived ' + survived + ', harness faults ' + faults);
process.exit((survived === 0 && faults === 0 && controlOk) ? 0 : 1);
