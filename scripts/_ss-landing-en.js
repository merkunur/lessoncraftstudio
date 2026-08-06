#!/usr/bin/env node
/* THROWAWAY — rewrites the English landing copy so it matches what the
   code actually gates.

   MEASURED in mini tools/syllable-splitter.js:
     premium  = non-free shelves (`_shelfUnlocked`) and sort mode only
     FREE     = typing your own words (`customShelf()` is `free:true`,
                `_saveStore` has no entitlement check), the printable
                worksheet (`_deskPrint` has no gate), the drum, the arcs,
                the reveal, whole-word audio, build mode.

   The shipped English sold TWO things that were already free — a
   printable sheet and keeping your own words between lessons — and the
   second of those was also the false sentence inside the tool's own
   paywall. Both native panels found it independently by reading the
   model rather than the copy. */
'use strict';
const fs = require('fs');
const P = 'frontend/messages/tool-content/en.json';
const j = JSON.parse(fs.readFileSync(P, 'utf8'));
const t = j['syllable-splitter'];

const before = t.about[1];

t.about[1] =
  'The first word set is free and stays free, with nothing held back inside it: the drum, the arcs, ' +
  'the reveal, the whole-word audio and the scramble-and-rebuild face all work in full. So does typing ' +
  'your own words — your class’s names, this week’s topic words — which you add at any time and split ' +
  'yourself by tapping between the letters where you hear a new clap. The tool never guesses that split ' +
  'for you, because on a teacher’s own words it has nothing to check it against, and a confident wrong ' +
  'answer is worse than none. Your words stay yours, on your machine, for as long as you keep them, and ' +
  'the printable worksheet is free too. It opens on a projector or interactive whiteboard with no account ' +
  'and nothing to install. Premium adds the other word sets — one-clap words, a second bank of two-clap ' +
  'words, and three-clap words — and the sorting fields, where children place each picture in the one-, ' +
  'two- or three-clap field it belongs to. Nothing was taken out of the free set to make room for either.';

if (t.about[1] === before) throw new Error('about[1] unchanged');
if (/keeps your own words|printable clapping sheet/.test(t.about[1])) throw new Error('a false claim survived');

fs.writeFileSync(P, JSON.stringify(j, null, 2) + '\n');
console.log('en about[1] rewritten to match what the code actually gates');
