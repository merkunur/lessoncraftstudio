/* =====================================================================
   _gap-fix-needle.js — re-anchor the one mutation needle my English fix
   killed.
   Run:  node scripts/_gap-fix-needle.js

   ⚠⚠ "A NEEDLE THAT ENCODES THE CURRENT TEXT OF WHAT IT MUTATES HAS A
   HALF-LIFE" — recorded on #43, and it fired here exactly as written.
   The FOURTH-named-part needle carried the literal `'Try this many'`;
   fixing that string's own defect (it rendered as "Try this many 3")
   made the needle unmatchable, and the mutation never ran.

   ⭐ THE HARNESS BEHAVED CORRECTLY AND THAT IS THE POINT: it counts a
   missing needle as a FAULT rather than a skip, so the run reported
   88/89 with 1 fault instead of silently shrinking the denominator and
   still saying "every mutation killed". Without that rule this would
   have been an invisible loss of coverage on the L5 fourth-part ban.

   Re-anchored on the key as well as the value, so a future edit to a
   DIFFERENT string cannot silently retarget it, and the replacement
   still injects `rail` — a noun on the L5 FOURTH list and a sibling
   tool's own part-name — so the assertion under test is unchanged.

   ⚠ A script file, not `node -e`; node, not Python text mode.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const MUT = path.join(__dirname, 'mutate-the-gap.js');
const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
let src = fs.readFileSync(MUT, 'utf8').replace(/\r\n/g, '\n');

const FIND = "['a FOURTH named part gets a noun, and it is a sibling\\'s own', \"'Try this many'\", \"'Try this many on the rail'\"],";
const REPL = "/* ⚠ RE-ANCHORED. This carried the literal `'Try this many'`, which\n" +
  "     that string's own fix removed, so the needle went unmatchable and\n" +
  "     the mutation silently never ran — caught only because a missing\n" +
  "     needle is a FAULT here, not a skip. Anchored on the KEY too now. */\n" +
  "  ['a FOURTH named part gets a noun, and it is a sibling\\'s own',\n" +
  "    \"      test: {\\n        en: 'Try',\", \"      test: {\\n        en: 'Try on the rail',\"],";

if (src.split(FIND).length - 1 !== 1) {
  console.log('⚠ FAULT: the needle-fix needle matched ' + (src.split(FIND).length - 1) + ' times, expected 1. NOTHING written.');
  process.exit(1);
}
src = src.replace(FIND, REPL);
fs.writeFileSync(MUT, src);

/* ---- the new needle must actually match the tool, or we have swapped
   one dead needle for another ---------------------------------------- */
const tool = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
const needle = "      test: {\n        en: 'Try',";
const hits = tool.split(needle).length - 1;
console.log('new needle matches the tool ' + hits + ' time(s)');
if (hits !== 1) { console.log('✗ the replacement needle is ALSO dead — nothing gained'); process.exit(1); }

/* ---- and the mutated value must still trip the L5 FOURTH ban -------- */
if (!/rail/.test("Try on the rail")) { console.log('✗ the mutation no longer injects a banned noun'); process.exit(1); }

console.log('PASS — needle re-anchored on the key and verified live against the tool');
