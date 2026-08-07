#!/usr/bin/env node
/* =====================================================================
   poison-say-it-icons.js — prove the icon gate can FAIL.
   ---------------------------------------------------------------------
   `prove-say-it-icons.js` now reports PASS. That is worth exactly
   nothing until each of its checks has been shown to fire on a
   synthetic violation, one at a time.

   ⚠⚠ POISON EVERY ASSERTION, NOT JUST THE FIRST. The obvious poison
   short-circuits at check one and leaves every later check never
   observed failing — indistinguishable from a check that is UNABLE to
   fail. So each poison below targets ONE rule, and the run asserts that
   the gate fails FOR THAT REASON, matched on the rule's own tag, not
   merely that it exited non-zero.

   ⚠ AND A CONTROL RUNS FIRST: the untouched file must PASS. Without it
   a broken harness would report a clean sweep of nothing — every
   "poison killed" would just be the gate failing to load a file.

   Usage: node scripts/poison-say-it-icons.js
   Exit 1 if any poison survives, or if the control fails.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC_FILE = path.join(ROOT, 'mini tools', 'home-language-bridge.js');
const GATE = path.join(__dirname, 'prove-say-it-icons.js');

/* ⚠ NORMALISE LINE ENDINGS BEFORE SEARCHING. `git checkout` runs the
   file through core.autocrlf, and a multi-line needle then silently
   matches nothing — seven needles went blind that way on tool #43, and
   the only reason it was not seven silent passes is that the harness
   counts a missing needle as a FAULT rather than a skip. */
const original = fs.readFileSync(SRC_FILE, 'utf8').split('\r\n').join('\n');

/* Each poison: [name, find, replace, expected tag in the gate output].
   `rules` poisons run with --rules (fast, no browser); `render` poisons
   need the full pass. */
const POISONS = [
  ['G1 a fragment smuggles its own <svg>',
   "thanks: '<path d=\"M24 39S9 30",
   "thanks: '<svg viewBox=\"0 0 48 48\"><path d=\"M24 39S9 30",
   /G1 thanks/, 'rules'],

  /* ⚠ THESE TWO INJECT A NEW ICON RATHER THAN MUTATING AN EXISTING ONE.
     Their first versions carried the literal markup of `yes`, and both
     went blind the moment that icon was redrawn — the harness reported
     ANCHOR NOT FOUND, which is a FAULT and a failure, not a skip, which
     is the only reason I noticed. A needle that encodes the current
     text of what it mutates has a half-life. Anchoring on the START of
     a stable declaration and prepending a synthetic entry does not. */
  ['G4 a hairline stroke slips in',
   "    blank: '<rect x=\"7\" y=\"9\"",
   "    poisonhairline: '<circle cx=\"24\" cy=\"24\" r=\"12\" fill=\"none\" stroke=\"#146B5E\" stroke-width=\"1.4\"/>',\n    blank: '<rect x=\"7\" y=\"9\"",
   /G4 poisonhairline/, 'rules'],

  ['G6 a colour from outside the palette',
   'thanks: \'<path d="M24 39S9 30 9 21.2A7.2 7.2 0 0 1 24 16.6 7.2 7.2 0 0 1 39 21.2C39 30 24 39 24 39z" fill="#F2784B"/>\'',
   'thanks: \'<path d="M24 39S9 30 9 21.2A7.2 7.2 0 0 1 24 16.6 7.2 7.2 0 0 1 39 21.2C39 30 24 39 24 39z" fill="#BB33CC"/>\'',
   /G6 thanks.*not in the Direction A palette/, 'rules'],

  ['G7 an id attribute, which collides when stamped 72 times',
   'blank: \'<rect x="7" y="9"',
   'blank: \'<rect id="frame" x="7" y="9"',
   /G7\/G8 blank: contains an id attribute/, 'rules'],

  ['G8 currentColor, which the constant cream ground makes wrong here',
   'person: \'<circle cx="24" cy="18" r="9" fill="#FFFDF7" stroke="#146B5E"',
   'person: \'<circle cx="24" cy="18" r="9" fill="#FFFDF7" stroke="currentColor"',
   /G7\/G8 person: contains currentColor/, 'rules'],

  ['G9 an opacity under the 0.30 floor',
   'stroke-dasharray="5 4.5" stroke-linecap="round"/>\'\n         + \'<circle cx="24" cy="17" r="5.6"',
   'stroke-dasharray="5 4.5" stroke-linecap="round" opacity="0.12"/>\'\n         + \'<circle cx="24" cy="17" r="5.6"',
   /G9 alone: opacity 0\.12/, 'rules'],

  ['G10 a tick — the verdict mark this board refuses by name',
   "finished: '<path d=\"M14 5h14l6 6v18H14z\"",
   "finished: '\\u2713<path d=\"M14 5h14l6 6v18H14z\"",
   /G10 finished: contains a tick/, 'rules'],

  ['G10 a thumbs-up — obscene in several of the markets we ship to',
   "    thing: '<rect x=\"9\" y=\"16\"",
   "    poisonthumb: '\\u{1F44D}<circle cx=\"24\" cy=\"24\" r=\"12\" fill=\"#146B5E\"/>',\n    thing: '<rect x=\"9\" y=\"16\"",
   /G10 poisonthumb: contains a thumb/, 'rules'],

  ['G11 an icon that is colour-only and dies on a mono printer',
   'thanks: \'<path d="M24 39S9 30 9 21.2A7.2 7.2 0 0 1 24 16.6 7.2 7.2 0 0 1 39 21.2C39 30 24 39 24 39z" fill="#F2784B"/>\'',
   'thanks: \'<path d="M24 39S9 30 9 21.2A7.2 7.2 0 0 1 24 16.6 7.2 7.2 0 0 1 39 21.2C39 30 24 39 24 39z" fill="#FFFDF7"/>\'',
   /G11 thanks: nothing survives the monochrome pass/, 'rules'],

  ['the calibration set names an icon that is not drawn',
   "['nose', 'lunchbox'],",
   "['nose', 'lunchboxx'],",
   /calibration set names icons that are not drawn/, 'render'],

  /* ⭐⭐ THE ONE THAT MATTERS, AND THE FIRST VERSION OF IT SURVIVED.
     Two phrases carrying the same picture is a wrong utterance on a
     communication board, and catching that is the whole reason this
     gate renders anything at all — so this poison surviving would have
     meant the gate was decorative.

     ⚠ IT SURVIVED BECAUSE THE POISON WAS WRONG, NOT THE GATE. The first
     attempt PREPENDED the heart to `medicine`, making it heart+bottle —
     a strictly larger shape, whose Jaccard against the bare heart is
     |heart| / |heart u bottle|, i.e. LOW. I had written a poison that
     tested nothing and would have taught me to weaken a correct check.
     ⭐ A POISON IS ONLY AS GOOD AS ITS CONSTRUCTION: it must produce the
     exact condition the check is for. Here that means two icons that
     are IDENTICAL, not merely overlapping. */
  ['two icons drawn identically — the confusion the gate exists for',
   'saybubble: \'<path d="M5 12A5 5 0 0 1 10 7h28a5 5 0 0 1 5 5v16a5 5 0 0 1-5 5H21l-10 9v-9h-1A5 5 0 0 1 5 28z" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.8" stroke-linejoin="round"/>\'',
   'saybubble: \'<path d="M24 39S9 30 9 21.2A7.2 7.2 0 0 1 24 16.6 7.2 7.2 0 0 1 39 21.2C39 30 24 39 24 39z" fill="#F2784B"/>\'',
   /ERROR (saybubble ~ thanks|thanks ~ saybubble)/, 'render'],

  ['a blank icon — the non-vacuity trap, which would otherwise score distinct from everything',
   'blank: \'<rect x="7" y="9" width="34" height="30" rx="5" fill="#FFFDF7" stroke="#146B5E" stroke-width="2.6" stroke-dasharray="5 4.5"/>\'\n         + \'<g stroke="#9FB6B0" stroke-width="3.2" stroke-linecap="round"><path d="M24 18v12M18 24h12"/></g>\'',
   'blank: \'<rect x="7" y="9" width="0.01" height="0.01" fill="none" stroke="#146B5E" stroke-width="2.6"/>\'',
   /blank: rasterised to a blank or near-blank bitmap/, 'render']
];

function runGate(dir, mode) {
  const args = [GATE];
  if (mode === 'rules') args.push('--rules');
  try {
    const out = execFileSync(process.execPath, args, {
      env: Object.assign({}, process.env, { HLB_TOOL_DIR: dir }),
      stdio: 'pipe', timeout: 300000, encoding: 'utf8'
    });
    return { pass: true, out };
  } catch (e) {
    if (e.killed || e.signal) return { pass: false, out: 'TIMED OUT', timedOut: true };
    return { pass: false, out: String(e.stdout || '') + String(e.stderr || '') };
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sayit-icons-poison-'));
const dir = path.join(tmp, 'mini tools');
fs.mkdirSync(dir, { recursive: true });
const target = path.join(dir, 'home-language-bridge.js');

/* ---- CONTROL FIRST ------------------------------------------------- */
fs.writeFileSync(target, original, 'utf8');
process.stdout.write('control (unpoisoned, rules) ... ');
const ctlRules = runGate(dir, 'rules');
if (!ctlRules.pass) {
  console.log('FAIL');
  console.error('\nFATAL the control run does not pass. Every "poison killed" below would be');
  console.error('meaningless — the gate would be failing for a reason unrelated to the poison.');
  console.error(ctlRules.out.split('\n').slice(-14).join('\n'));
  process.exit(1);
}
console.log('PASS');

process.stdout.write('control (unpoisoned, render) ... ');
const ctlFull = runGate(dir, 'render');
if (!ctlFull.pass) {
  console.log('FAIL');
  console.error('\nFATAL the full control run does not pass.');
  console.error(ctlFull.out.split('\n').slice(-20).join('\n'));
  process.exit(1);
}
console.log('PASS');
console.log('');

/* ---- THE POISONS --------------------------------------------------- */
let killed = 0, survived = [], faults = [];
POISONS.forEach(([name, find, repl, expect, mode]) => {
  const needle = find.replace(/\\u\{?[0-9A-F]{4,5}\}?/gi, (m) =>
    JSON.parse('"' + m.replace(/\\u\{([0-9A-F]+)\}/i, (x, h) =>
      '\\u{' + h + '}') + '"'));
  const n = original.split(find).length - 1;
  if (n === 0) { faults.push(`${name}  [ANCHOR NOT FOUND]`); return; }
  if (n > 1) { faults.push(`${name}  [ANCHOR AMBIGUOUS x${n}]`); return; }

  const poisoned = original.split(find).join(
    repl.replace(/\\u\{([0-9A-F]+)\}/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
        .replace(/\\u([0-9A-F]{4})/gi, (m, h) => String.fromCharCode(parseInt(h, 16))));
  fs.writeFileSync(target, poisoned, 'utf8');

  const r = runGate(dir, mode);
  if (r.pass) {
    survived.push(name);
    console.log(`  SURVIVED  ${name}`);
  } else if (r.timedOut) {
    survived.push(name + ' (TIMED OUT)');
    console.log(`  SURVIVED  ${name}  [the gate hung — a gate that hangs is a gate that survived]`);
  } else if (!expect.test(r.out)) {
    /* ⚠ IT FAILED, BUT NOT FOR THE RIGHT REASON. That is not a kill: a
       gate that fails for an unrelated reason has not demonstrated that
       THIS check can fire. */
    survived.push(name + ' (failed for the wrong reason)');
    console.log(`  SURVIVED  ${name}`);
    console.log(`            gate failed, but not with ${expect} — this check was never observed firing`);
  } else {
    killed++;
    console.log(`  killed    ${name}`);
  }
});

fs.writeFileSync(target, original, 'utf8');

console.log('');
console.log(`${killed}/${POISONS.length} poisons killed`);
if (faults.length) {
  console.log('');
  console.log('FAULTS — a needle that no longer matches is a failure, not a skip:');
  faults.forEach((f) => console.log('  ' + f));
}
if (survived.length) {
  console.log('');
  console.log('SURVIVED — these checks have NOT been shown to be able to fail:');
  survived.forEach((s) => console.log('  ' + s));
}
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) {}
process.exit((survived.length || faults.length) ? 1 : 0);
