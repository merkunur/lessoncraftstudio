/**
 * qa/b5-unauthored.js — the "an unauthored locale REFUSES" probe, made independent of which
 * locales the panels have applied (nt10-E, 2026-09-23: all 11 locales landed, so every gate that
 * probed "sv" / "de" / "nl" as the unauthored locale started failing for the wrong reason — the
 * block existed and the build returned a page).
 *
 * Why not B5_LOCALES_DIR: lib/b5-common.js reads that dir ONCE per bank and caches the merged
 * module (bankModule), so by the time a gate probes, the real blocks are already in the cache and
 * an env var set inside the probe changes nothing. Hiding the one block in the cached map is the
 * same state an empty locales dir produces for that locale, and it is restored in `finally`.
 *
 * refusalProbe(bankName, loc, build) → { hidden, real }: the thrown message (or null) with the
 * locale's block absent, and the same build with the block as authored. A gate asserts
 * refused(hidden, re) AND — the poison, the other direction — !refused(real, absentRe): a build
 * that does NOT throw must FAIL the same check, so the probe can never pass vacuously.
 */
'use strict';
const { bankModule } = require('../lib/b5-common.js');

function withLocaleHidden(bankName, loc, fn) {
  const all = bankModule(bankName);
  const had = Object.prototype.hasOwnProperty.call(all, loc);
  const saved = all[loc];
  delete all[loc];
  try { return fn(); } finally { if (had) all[loc] = saved; }
}
const msgOf = (fn) => { try { fn(); return null; } catch (e) { return e.message; } };
function refusalProbe(bankName, loc, build) {
  return { hidden: withLocaleHidden(bankName, loc, () => msgOf(build)), real: msgOf(build) };
}
/** the check every probe applies: a refusal is a THROW whose message matches `re` */
const refused = (msg, re) => !!msg && re.test(msg);

module.exports = { withLocaleHidden, refusalProbe, refused, msgOf };
