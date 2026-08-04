#!/usr/bin/env node
/* =====================================================================
   verify-place-value-lab-claims.js — the landing copy must not describe
   a tool that does not exist.

   ⭐ WHY. Freeing the hundreds place made the English landing page say
   "Premium adds the hundreds place" about something that is now free,
   and fixing the Subtract lab made two locales describe removing
   "the marked blocks" when nothing is marked any more. Both were live
   for days. Nothing checked, because the copy and the code are in
   different files and only a human ever read them together.

   This reads the SHIPPED tool for what is actually gated and what the
   apparatus actually does, then reads all eleven landing files and
   fails on a contradiction.

   ⚠ IT DERIVES THE GATED SET FROM THE TOOL, not from a list here. A
   hand list would be the same drift in a new place.

   Run: node scripts/verify-place-value-lab-claims.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const TOOL = fs.readFileSync(path.join(REPO, 'mini tools', 'place-value-lab.js'), 'utf8');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

let fails = 0;
const FAIL = (m) => { fails++; console.log('  ✗ FAIL ' + m); };

/* ---- what the SHIPPED tool actually does ------------------------- */
/* hundreds are free iff _maxPlaces does not consult premium */
const maxPlaces = (TOOL.match(/_maxPlaces: function \(\)\s*\{[\s\S]{0,240}?\}/) || [''])[0];
const hundredsFree = !/premium/.test(maxPlaces);
/* nothing is pre-marked iff _nextSub sets _marked to null */
const nextSub = (TOOL.match(/_nextSub: function \(\)\s*\{[\s\S]*?\n  \},/) || [''])[0];
const preMarks = /_marked = \{/.test(nextSub);
/* the borrow is a decision iff bo is rolled free of ao */
const forcesBorrow = /var bo = ao \+ 1/.test(nextSub);

if (!maxPlaces) FAIL('could not read _maxPlaces from the tool — the check would be vacuous');
if (!nextSub) FAIL('could not read _nextSub from the tool — the check would be vacuous');

console.log(`tool says: hundreds ${hundredsFree ? 'FREE' : 'PREMIUM'} · blocks ${preMarks ? 'PRE-MARKED' : 'not marked'} · borrow ${forcesBorrow ? 'FORCED' : 'a decision'}`);

/* ---- the claims, per locale --------------------------------------- */
/* a claim is a pair: a phrase that means X, and whether X is true */
const HUNDREDS_WORD = /hundert|hundred|centain|centinai|centena|honderdtal|hundratal|hundreder|hundrere|sada|sata/i;
const PAID_WORD = /premium|abonnement|abonemang|tilaus|de pago|pagamento|payant|betal/i;
const MARKED_WORD = /markier\w*|marqué\w*|segnat\w*|marcad\w*|gemarkeerd\w*|markerade|markerede|merkede|merkity\w*|\bmarked\b/i;

for (const L of LOCALES) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'tool-content', L + '.json'), 'utf8'))['place-value-lab'];
  if (!j) { FAIL(`${L}: no place-value-lab entry`); continue; }
  const prose = [].concat(j.about || [], j.howToUse || [], j.classroomIdeas || [], [j.tagline || '', j.metaDescription || '']);

  for (const s of prose) {
    /* ⚠ SENTENCE-SCOPED. Matching "premium" and "hundreds" anywhere in a
       300-word paragraph would condemn a page that mentions both in
       unrelated sentences — the ban-too-wide trap. */
    for (const sent of s.split(/(?<=[.!?…])\s+/)) {
      if (hundredsFree && PAID_WORD.test(sent) && HUNDREDS_WORD.test(sent)) {
        FAIL(`${L}: sells the hundreds place, which is FREE — "${sent.trim().slice(0, 110)}"`);
      }
      if (!preMarks && MARKED_WORD.test(sent)) {
        FAIL(`${L}: describes marked blocks, and nothing is marked — "${sent.trim().slice(0, 110)}"`);
      }
    }
  }
}

/* ---- ⭐ AND THE TOOL'S OWN STRINGS, which is where the next one hid.
   The first version of this gate read the landing files only, and the
   render then showed the tool itself instructing the child to "tap the
   MARKED blocks" — in eleven locales — with nothing marked. A claim
   about the apparatus is a claim wherever it is written. */
const strings = (TOOL.match(/strings: \{[\s\S]*?\n  \},/) || [''])[0];
if (!strings) FAIL('could not read the strings block — the in-tool half would be vacuous');
else {
  let inTool = 0;
  for (const line of strings.split('\n')) {
    const key = (line.match(/^\s*(\w+):/) || [])[1];
    if (!key) continue;
    if (!preMarks && MARKED_WORD.test(line)) { FAIL(`tool string "${key}" describes marked blocks, and nothing is marked`); }
    if (hundredsFree && PAID_WORD.test(line) && HUNDREDS_WORD.test(line)) { FAIL(`tool string "${key}" sells the hundreds place, which is FREE`); }
    inTool++;
  }
  if (inTool < 20) FAIL(`only ${inTool} tool strings parsed — implausible, the scan is not seeing the block`);
  console.log(`  scanned ${inTool} tool strings and ${LOCALES.length} landing files`);
}

console.log(`${fails ? 'FAIL' : 'PASS'}  claims  (${LOCALES.length} locales, ${fails} contradictions)`);
process.exit(fails ? 1 : 0);
