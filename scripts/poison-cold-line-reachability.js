/* POISON TEST for the reachability gate in smoke-cold-line-locales.js.

   ⚠ THE FIRST ATTEMPT NEVER REACHED THE GATE. It injected a 20th key
   authored in all eleven locales, but apply-cold-line-locales.js
   refused it at the ORDER check — an earlier gate fired first, so the
   run failed for a reason that had nothing to do with reachability.
   A poison that is stopped upstream tells you nothing about the gate
   downstream of it.

   So this poisons the ACTUAL defect shape #39 shipped: a key that is
   authored, whose t() call still sits in the file, and whose BRANCH is
   dead. That is precisely the case a source scan cannot see, and the
   reason the gate was rewritten to drive real states with a recorder.

   The gate must FAIL and must NAME zeroOff. Everything is restored
   afterwards, whatever happens. */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const R = path.join(__dirname, '..');

const TOOL = path.join(R, 'mini tools/cold-line.js');
const bak = fs.readFileSync(TOOL, 'utf8');

const LIVE = "(this.inView(s, 0) ? '' : ' ' + api.t('zeroOff'))";
const DEAD = "(true ? '' : ' ' + api.t('zeroOff'))";

let code = 1;
try {
  if (bak.indexOf(LIVE) < 0) throw new Error('the zeroOff branch is not where the poison expects it');
  fs.writeFileSync(TOOL, bak.replace(LIVE, DEAD), 'utf8');

  let out = '', failed = false;
  try {
    out = execFileSync('node', ['scripts/smoke-cold-line-locales.js'], { cwd: R, encoding: 'utf8' });
  } catch (e) {
    failed = true;
    out = (e.stdout || '') + (e.stderr || '');
  }

  const named = /NEVER ASKED FOR: [^\n]*zeroOff/.test(out);
  if (failed && named) {
    console.log('POISON OK — a live t() call in a DEAD BRANCH was caught, and named (zeroOff)');
    console.log('            a source scan would have seen the call and passed');
    code = 0;
  } else {
    console.error('POISON FAILED — exit=' + (failed ? 'nonzero' : 'ZERO') + '  named=' + named);
    console.error(out.split('\n').filter((l) => /zeroOff|REQUESTED|^PASS|^FAIL/.test(l)).slice(0, 6).join('\n'));
  }
} finally {
  fs.writeFileSync(TOOL, bak, 'utf8');
  console.log('restored the tool');
}
process.exit(code);
