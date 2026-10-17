#!/usr/bin/env node
/* check-hazel-chip-shares.js — Hazel's Word Bridge: every round offers 3 chips (its locale's
   4 conjunctions minus round.hide). Lists the offered chips per round, and per chip prints
   (a) the share of NON-answer rounds in which it is offered, (b) P(answer | offered).
   FAILS if: a hide is missing / not in the locale set / equals the answer; or any chip's
   P(answer | offered) exceeds 0.5 (chance with 3 chips = 0.33). */
'use strict';
const fs = require('fs'); const path = require('path');
const M = path.join(__dirname, '..', 'mini tools', 'hazel-word-bridge-activities.json');
const CONJ = {
  en: { addition: 'and', contrast: 'but', cause: 'because', result: 'so' },
  de: { addition: 'und', alternative: 'oder', contrast: 'aber', cause: 'denn' },
  fr: { addition: 'et', alternative: 'ou', contrast: 'mais', cause: 'car' },
  es: { addition: 'y', alternative: 'o', contrast: 'pero', cause: 'porque' },
  pt: { addition: 'e', alternative: 'ou', contrast: 'mas', cause: 'porque' },
  it: { addition: 'e', alternative: 'o', contrast: 'ma', cause: 'perché' },
  nl: { addition: 'en', alternative: 'of', contrast: 'maar', cause: 'want' },
  sv: { addition: 'och', alternative: 'eller', contrast: 'men', cause: 'för' },
};
const row = JSON.parse(fs.readFileSync(M, 'utf8'))[0];
const pools = Object.assign({ en: row.params.rounds }, row.params.roundsL10n);
const fails = [];
for (const [loc, rounds] of Object.entries(pools)) {
  const t = CONJ[loc]; const set = Object.values(t);
  const st = {}; set.forEach((c) => (st[c] = { nonAns: 0, offeredNonAns: 0, offered: 0, ans: 0 }));
  console.log('== ' + loc);
  for (const r of rounds) {
    const ans = t[r.relation];
    if (!r.hide || set.indexOf(r.hide) < 0) fails.push(`${loc}/${r.id}: hide "${r.hide}" not in ${set}`);
    if (r.hide === ans) fails.push(`${loc}/${r.id}: hides its own answer`);
    const offered = set.filter((c) => c !== r.hide);
    console.log(`  ${r.sentence.padEnd(58)} [${ans}]  offered: ${offered.join(', ')}`);
    for (const c of set) {
      const o = offered.indexOf(c) >= 0;
      if (o) st[c].offered++;
      if (c === ans) st[c].ans++; else { st[c].nonAns++; if (o) st[c].offeredNonAns++; }
    }
  }
  for (const c of set) {
    const s = st[c]; const p = s.ans / (s.offered || 1);
    console.log(`  chip ${c.padEnd(8)} offered in ${s.offeredNonAns}/${s.nonAns} non-answer rounds (${(100 * s.offeredNonAns / s.nonAns).toFixed(0)}%) · P(answer|offered) ${(100 * p).toFixed(0)}%`);
    if (p > 0.5) fails.push(`${loc}: chip "${c}" is the answer in ${(100 * p).toFixed(0)}% of the rounds it is offered — a presence tell`);
  }
}
if (fails.length) { console.error('\nCHECK-HAZEL-CHIP-SHARES FAILED:\n  ' + fails.join('\n  ')); process.exit(1); }
console.log('\nCHECK-HAZEL-CHIP-SHARES PASSED — every round offers 3 chips, the hidden one is never the answer, no chip answers > 50% of the rounds it appears in.');
