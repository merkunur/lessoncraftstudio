/* =====================================================================
   _dbm-en-landing.js — rewrite the ENGLISH landing copy for #54.
   Run: node scripts/_dbm-en-landing.js [--dry-run]

   ⭐⭐ NINE OF TEN NATIVE PANELS INDEPENDENTLY REWROTE about[0], and two
   gave the decisive reason: `speil` / `spegel` / `peili` are
   `folding-sheet`'s SHIPPED part-names, so a paragraph whose whole
   vocabulary is the banned list would hand a sibling's headline noun to
   the tool built to be the other thing — and in ten locales the tool is
   called THE HINGE, so "it is not a mirror" answers a question no
   reader asked. The ARGUMENT survives; the object goes unnamed. That is
   now the default for every locale including English.

   The other four are plain factual repairs the panels measured:
     · metaDescription said THIRTEEN, which is unreachable at reach=ten
       (max total 10) — and "thirteen leaves one with no partner"
       garden-paths on this tool's own part-name in the one sentence
       Google shows.
     · classroomIdeas "start from a full tray INSTEAD" — `newState`
       always begins OPEN, so a full tray is a three-step route, not a
       starting point. This is the second time that sentence has
       shipped.
     · "Both are nine" was false: `fetch` adds a counter, so the tray
       reads TEN.
     · howToUse told the class to take BOTH answers to one leftover —
       `give` sets odd:0 and `fetch` requires odd===1, so the total must
       be rebuilt in between or the second press refuses.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const DRY = process.argv.indexOf('--dry-run') >= 0;
const F = path.join(__dirname, '..', 'frontend', 'messages', 'tool-content', 'en.json');

const EN = {
  tagline: 'Say the double, close the tray and count the counters as they land. Then open it, and the same counters share back out into two — one tray, both ways round.',
  metaDescription: 'Free whiteboard tool: say what the double will be, then close the tray and count. Open it and the whole shares back out — and nine leaves one with no partner.',
  about: [
    'An appearance that has doubled is not a quantity that has doubled, and that is the whole point of this tray. A child who counts twelve where six things are standing has counted six things twice, and the second six cannot be touched. So everything here is a real counter: the far leaf does not show you a copy, it receives its own counters, laid down one at a time, and the class counts every one of them in.',
    'A shut tray is the whole; an open tray is two parts. Put counters on the near leaf, say what the double will be before anything moves, and close the hinge — the far leaf receives the same number again, one at a time, so the room can count them as they arrive. Then open it, and the whole tray shares back out into two. It is the same hinge running the other way, on the very same counters, and that is the half most classes never get to watch.',
    'And a total that will not share out completely does not stall. One counter is left with nobody across from it, and the class decides what to do about it: give it the near leaf, and nine is four and four and one more; or fetch it a partner, and nine turns out to have been a double one short — and once that partner arrives, the tray holds ten. Both are true about nine, and children will want different ones. Nothing is scored, nothing is timed, and nothing is ever marked right or wrong.'
  ],
  howToUse: [
    'Set the near leaf and take the vote before anything shuts. The saying-first is the lesson; the closing is the check.',
    'Close the hinge and count the counters aloud as they land on the far leaf, one at a time. There is nothing to take on trust.',
    'Open the tray and ask what one leaf will hold — one number if it shares out evenly, two if the two leaves will not match. That is the harder half of the fact, and the half most classes never practise.',
    'When one counter is left with no partner, ask the room: does it join the near leaf, or do we fetch it a partner? Take one answer, read what the tray says, then build the same total again to try the other — settling the leftover uses it up, so it has to come back before the second answer can be tried.'
  ],
  classroomIdeas: [
    'Begin at the halving end. Close the hinge on a small near leaf, walk the shut tray up one counter at a time to the number you want, and only then open it. Halving is the same hinge running the other way, and the class can watch it be.',
    'A two-minute routine: three trays, three numbers said out loud, and the count afterwards to settle each one.',
    'Do eight and then nine back to back. Ask what the tray did differently — it did nothing differently, and that is exactly the point.',
    'Ask for both answers to the same leftover. Give it the near leaf: the tray reads five and four, and nine is a double and one more. Then build nine again and fetch it a partner instead: nine was a double one short — but count the tray afterwards, because it now holds ten. Both sentences are about nine; only one of them leaves nine on the leaves.'
  ]
};

const j = JSON.parse(fs.readFileSync(F, 'utf8'));
const d = j['doubling-mirror'];
if (!d) { console.log('FATAL: no doubling-mirror entry'); process.exit(1); }
/* the frozen SEO fields are not ours to touch */
['slug', 'name', 'metaTitle'].forEach(k => {
  if (!d[k]) { console.log('FATAL: frozen field `' + k + '` is missing'); process.exit(1); }
});
const before = JSON.stringify(d);
Object.keys(EN).forEach(k => { d[k] = EN[k]; });

/* the tool's own fence, applied to the landing prose too */
const BAN = ['mirror', 'reflection', 'reflect', 'glass', 'twin', 'fold', 'crease', 'odd', 'even'];
const ban = w => new RegExp('(?<!\\p{L})' + (/e$/.test(w)
  ? '(?:' + w + '(?:s|d)?|' + w.slice(0, -1) + '(?:ed|ing))'
  : w + '(?:s|es|ed|ing)?') + '(?!\\p{L})', 'iu');
let hits = 0;
['tagline', 'metaDescription'].forEach(k => BAN.forEach(w => {
  if (ban(w).test(d[k])) { console.log('  ✗ ' + k + ' uses "' + w + '"'); hits++; }
}));
['about', 'howToUse', 'classroomIdeas'].forEach(k => d[k].forEach((s, i) => BAN.forEach(w => {
  if (ban(w).test(s)) { console.log('  ✗ ' + k + '[' + i + '] uses "' + w + '"'); hits++; }
})));
/* poison, both ways — a fence that cannot fire is not a fence */
if (!ban('mirror').test('it is not a mirror')) { console.log('  ✗ POISON: the fence cannot fire'); hits++; }
if (ban('odd').test('a curious oddity')) { console.log('  ✗ POISON: the fence over-reaches'); hits++; }
if (hits) { console.log('FAIL  ' + hits + ' fence hits'); process.exit(1); }

console.log('EN landing rewritten: ' + Object.keys(EN).join(', '));
console.log('  metaDescription ' + d.metaDescription.length + ' chars');
if (before === JSON.stringify(d)) console.log('  (no change)');
if (DRY) { console.log('(dry run — nothing written)'); process.exit(0); }
fs.writeFileSync(F, JSON.stringify(j, null, 2) + '\n', 'utf8');
console.log('wrote ' + F);
