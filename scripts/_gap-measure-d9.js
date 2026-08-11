/* Verify the number this fix wrote into the header: how many rail offers
   landed on 0 BEFORE the guard changed?  Measured against the backup, not
   quoted from the review. */
const path = require('path');
const OLD = require(path.join(process.cwd(), 'scripts', '_gap-backup-the-gap.js.bak'));
const NEW = require(path.join(process.cwd(), 'mini tools', 'the-gap.js'));

function count(T) {
  let offers = 0, zero = 0;
  for (const range of ['ten', 'sixteen']) {
    const cap = T.cap(range);
    for (const sc of T.scenes(cap)) {
      const st = { n: sc.n, k: sc.k, m: sc.m, phase: 'after', tried: null };
      for (const k of T.rail(st, range)) { offers++; if (sc.n + k < 1) zero++; }
    }
  }
  return { offers, zero };
}
const a = count(OLD), b = count(NEW);
console.log('BEFORE  offers=' + a.offers + '  landing on 0 = ' + a.zero);
console.log('AFTER   offers=' + b.offers + '  landing on 0 = ' + b.zero);
console.log('removed ' + (a.offers - b.offers) + ' offers');
