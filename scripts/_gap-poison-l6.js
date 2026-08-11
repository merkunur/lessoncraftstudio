/* =====================================================================
   _gap-poison-l6.js — prove L6's NEW alignment assertion can FAIL.
   Run:  node scripts/_gap-poison-l6.js

   ⚠⚠ A NEW GATE IS WORTHLESS UNTIL IT HAS BEEN SEEN TO FAIL. The old L6
   passed on a build whose ground announced the direction at gap-entry —
   that is the leak the `_pulsed` change exists to close, and it ran
   unmeasured. This restores exactly that build, in a COPY, and requires
   verify to reject it.

   Poisoned BOTH directions:
     (a) MUST FIRE — the pre-`_pulsed` condition `s.phase === 'before'`,
         which announces the direction for the whole gap including the
         380ms before the pulse.
     (b) MUST PASS — the correct build, restored, so a gate that fails
         on everything is not mistaken for a gate that works.

   ⚠ The tool is backed up and restored from that backup, not from git:
   `git checkout --` restores from the INDEX and would discard every
   uncommitted fix in this file.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
const VERIFY = path.join(__dirname, 'verify-the-gap.js');
const ORIGINAL = fs.readFileSync(TOOL, 'utf8');
const BACKUP = path.join(os.tmpdir(), 'the-gap.poison-backup.js');
fs.writeFileSync(BACKUP, ORIGINAL);

function runVerify(port) {
  try {
    const out = execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { THE_GAP_PORT: String(port) }),
      encoding: 'utf8', timeout: 600000
    });
    return /\nPASS/.test(out) ? 'PASS' : 'FAIL';
  } catch (e) {
    const out = String((e.stdout || '') + (e.stderr || ''));
    if (/the ground announced the DIRECTION/.test(out)) return 'FAIL(alignment)';
    return /\nFAIL/.test(out) ? 'FAIL' : 'ERROR';
  }
}

const FIND = "      if (s.phase === 'before' || (s.phase === 'gap' && !this._pulsed)) {";
const POISON = "      if (s.phase === 'before') {";

if (ORIGINAL.split(FIND).length - 1 !== 1) {
  console.log('⚠ FAULT: the poison needle did not match exactly once — the test would prove nothing.');
  process.exit(1);
}

let bad = 0;

console.log('(a) MUST FIRE — restore the pre-fix condition (direction announced at gap-entry)');
fs.writeFileSync(TOOL, ORIGINAL.replace(FIND, POISON));
const a = runVerify(5731);
console.log('    verify = ' + a);
if (a.indexOf('FAIL') !== 0) { console.log('    ✗ THE NEW ASSERTION CANNOT FIRE — it is decorative'); bad++; }
else if (a !== 'FAIL(alignment)') { console.log('    ⚠ it failed, but NOT on the alignment assertion — the poison proves something else'); bad++; }
else { console.log('    ✓ rejected, and on the alignment assertion specifically'); }

console.log('(b) MUST PASS — the correct build');
fs.writeFileSync(TOOL, ORIGINAL);
const b = runVerify(5732);
console.log('    verify = ' + b);
if (b !== 'PASS') { console.log('    ✗ the gate rejects a CORRECT build'); bad++; }
else { console.log('    ✓ accepted'); }

/* restore from the backup, never from git */
fs.writeFileSync(TOOL, fs.readFileSync(BACKUP, 'utf8'));
if (fs.readFileSync(TOOL, 'utf8') !== ORIGINAL) { console.log('✗ THE TOOL WAS NOT RESTORED'); bad++; }
else { console.log('tool restored byte-identical'); }

console.log(bad ? '\nFAIL' : '\nPASS — the alignment assertion fires on the leak and passes the fix');
process.exit(bad ? 1 : 0);
