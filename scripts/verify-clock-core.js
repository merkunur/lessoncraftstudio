#!/usr/bin/env node
/* =====================================================================
   verify-clock-core.js — build-time clock-correctness gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/clock-core.js (under a window shim) and proves,
   for the shipped activity manifest, that:

     1. every round is within 1.MD.B.3 scope (hour ∈ 1..12, minute ∈ {0,30});
     2. the time→angle math is EXACT: driving the core to the round's
        canonical time, the hour-hand angle === (30·H + 0.5·M) mod 360 and
        the minute-hand angle === (6·M) mod 360 (the coupled formula — the
        hour hand sits between hours at half-past);
     3. the discrete grade DISCRIMINATES: setHour=H,setMinute=M → isCorrect
        true; a wrong hour OR a flipped minute → isCorrect false;
     4. a non-empty worded `timeExpr` exists for every (round, locale) — so
        no prompt ever shows a bare "H:MM" key (the worded mapping's
        semantic correctness — the half-idiom — is native-owned, not gated);
     5. the pool has ≥7 rounds (CLAUDE.md §A.13.60 variety floor).

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const REPO = path.join(__dirname, '..');

/* ---- load the real core under a window shim ---- */
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'clock-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ClockCore;
if (!Core) { console.error('FAIL: clock-core.js did not define window.ClockCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'clock-activities.json'), 'utf8'));

const failures = [];
function check(cond, msg) { if (!cond) failures.push(msg); }
function near(a, b) { return Math.abs(a - b) < 1e-9; }
function timeKey(h, m) { return h + ':' + (m === 30 ? '30' : '00'); }

let roundCount = 0;
for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} variety floor (§A.13.60)`);
  rounds.forEach((r, i) => {
    roundCount++;
    const label = `${row.id}#${i}[${timeKey(r.hour, r.minute)}]`;

    // 1. scope
    check(r.hour >= 1 && r.hour <= 12, `${label}: hour ${r.hour} outside 1..12`);
    check(r.minute === 0 || r.minute === 30, `${label}: minute ${r.minute} not 0|30 (1.MD.B.3 scope)`);

    Core.init({});
    Core.setupTask({ hour: r.hour, minute: r.minute });

    // 2. exact coupled angle math at the canonical time
    Core.setHour = r.hour; Core.setMinute = r.minute;
    const ha = Core._handAngles();
    const expHour = ((30 * r.hour + 0.5 * r.minute) % 360 + 360) % 360;
    const expMin = ((6 * r.minute) % 360 + 360) % 360;
    check(near(ha.hour, expHour), `${label}: hour-hand angle ${ha.hour} ≠ 30H+0.5M ${expHour}`);
    check(near(ha.minute, expMin), `${label}: minute-hand angle ${ha.minute} ≠ 6M ${expMin}`);
    const ta = Core.targetAngles();
    check(near(ta.hour, expHour) && near(ta.minute, expMin), `${label}: targetAngles ${JSON.stringify(ta)} ≠ {${expHour},${expMin}}`);

    // 3. discrete grade discriminates
    check(Core.isCorrect() === true, `${label}: correct state (set==target) rejected`);
    Core.setHour = (r.hour % 12) + 1;
    check(Core.isCorrect() === false, `${label}: a wrong HOUR was accepted`);
    Core.setHour = r.hour; Core.setMinute = (r.minute === 0) ? 30 : 0;
    check(Core.isCorrect() === false, `${label}: a wrong MINUTE was accepted`);

    // 4. worded timeExpr present for every locale
    const te = Core.strings.timeExpr[timeKey(r.hour, r.minute)];
    check(!!te, `${label}: no timeExpr entry`);
    if (te) {
      LOCALES.forEach((loc) => {
        check(typeof te[loc] === 'string' && te[loc].trim().length > 0, `${label}: timeExpr missing/empty for locale "${loc}"`);
      });
    }
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} clock-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s) across ${manifest.length} coordinate(s): hand angles = 30H+0.5M / 6M (exact, coupled); discrete grade accepts target + rejects wrong hour/minute; worded timeExpr present for all ${LOCALES.length} locales; ≥${VARIETY_MIN} rounds; minutes ∈ {0,30}.`);
process.exit(0);
