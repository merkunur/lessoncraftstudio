/* =====================================================================
   _number-sieve-content.js — the landing content for TOOL #36
   ---------------------------------------------------------------------
   Consumed by scripts/register-number-sieve.js. `en` is authored here.

   ⚠ THE TEN NON-EN ENTRIES ARE NATIVE PANEL OUTPUT, rebuilt and not
   translated (§A.13.48). The NAME did not survive in four locales: es
   rejected `criba` (its one school association half-names a clue family),
   pt rejected `crivo` (it lives in `passar pelo crivo` = to be judged),
   and da/no replaced `sold` with `si/sil`. Do not "restore" any of them.
   [NSR-FLAG] sv/da/no/fi.

   ⚠ The paid-plan name is the SUITE's, not this tool's — normalised
   against the shipped tools rather than left to the panels, or the
   subscription ends up called three things in one product.
   ===================================================================== */

'use strict';

const EN = {
  slug: 'number-sieve',
  name: 'The Number Sieve',
  tagline: 'The clue does not tell you — it acts',
  about: [
    'The Number Sieve is a projectable field of every number in range, all of them lit, and a small deck of sealed clue cards. Turn a card and it says nothing at all: it acts on the field, and the numbers it excludes go dark and drop out. What is left standing is the answer, and the tool never announces it.',
    /* ⚠ the example here is SPATIAL on purpose. It used to read "why did
       every second one go?", which names a clue family in prose — the
       exact thing the instrument refuses to do, caught by the German
       panel reviewing my English. */
    'That is the whole idea. Because no card ever names its rule, the class has to read the rule off the pattern of what died — "why has the whole bottom half gone?" — which turns a listening task into a reasoning task, and does it without a single word on the apparatus. A child who cannot read yet can run the whole routine.',
    /* ⚠ this used to end "...and nobody has to be told they were wrong",
       which put a verdict word on the landing page of the tool whose
       whole thesis is that it never judges. Caught the moment the fence
       here was widened from two languages to eleven. */
    'Before the first card turns, children park a marker on the number they think it is. From that moment the marker cannot be moved, so when its number goes dark it is the material that takes it off the field, and nobody has to say anything at all. There is no score, no timer, no chime, and nothing on screen ever congratulates anybody.',
    'Shuffle the deck and run the same board in a different order, and the survivors are identical every time — which is a thing a class can test rather than be told. The free tool carries the whole apparatus, all six kinds of card, all three fields and a builder that makes a fresh board around any number you tap. The Teacher plan adds the curated library and printing.'
  ],
  howToUse: [
    'Pick a field: one to twenty for the youngest children, one to a hundred, or one to a hundred and twenty.',
    /* ⚠ the second sentence is the French panel's only BLOCKING finding
       across ten panels: the English never said how thirty children park
       a marker on one board, and without it a school files this as a demo
       rather than an activity. */
    'Ask the class to park a marker on the number they think the cards are hiding. With a whole class, each child parks on their own number strip or slate and only the two or three children whose turn it is park on the board. Once the first card turns, every marker is fixed.',
    'Tap the next card. Watch the field, then wait — the question is what went dark, and why.',
    'When three or four numbers are still alight, ask the move that matters: what would a card have to take away to leave just one?',
    'Tap a number yourself and choose "New cards" to build a fresh board around it in a second.',
    'Shuffle and run it again in a different order, and let the class notice that the answer did not move.'
  ],
  classroomIdeas: [
    'Warm-up: one board a day on the one-to-twenty field, four cards, five minutes.',
    'Prediction round: before each card turns, ask which numbers the class thinks are about to go.',
    'Silent sieve: turn every card without saying a word, then ask what the cards must have been.',
    'Two orders: run a board, shuffle, run it again — and ask why the same numbers survived.',
    'Build it backwards: pick a number together, let the tool make the cards, and see who can spot the clue that did the most work.'
  ],
  metaTitle: 'The Number Sieve — Free Mystery Number Tool | LessonCraftStudio',
  metaDescription: 'A free projectable number field and sealed clue cards. Each clue acts on the field instead of naming a rule, so the class reads it from what goes dark. No scores, no timers, no reading required.'
};

/* ---- the ten native panels (§A.13.48), rebuilt not translated ---- */
const NATIVE = Object.assign({},
  require('./_number-sieve-landing.json'),
  require('./_number-sieve-landing-2.json'));

const OUT = { en: EN };
Object.keys(NATIVE).forEach(function (loc) { OUT[loc] = NATIVE[loc]; });

/* ---- the artefact validates itself at require time, so register-*.js
        cannot half-run ---------------------------------------------- */
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const slugs = {};
LOCALES.forEach((l) => {
  const e = OUT[l];
  if (!e) throw new Error(`${l} missing`);
  ['slug', 'name', 'tagline', 'metaTitle', 'metaDescription'].forEach((k) => {
    if (!e[k] || typeof e[k] !== 'string') throw new Error(`${l}.${k} missing`);
  });
  if (!/^[a-z0-9-]+$/.test(e.slug)) throw new Error(`${l}.slug is not ASCII-safe: ${e.slug}`);
  /* ⚠ da folds o-slash to "oe" and no folds it to "o" — two locales must
     never be handed the identical slug */
  if (slugs[e.slug]) throw new Error(`${l}.slug collides with ${slugs[e.slug]}: ${e.slug}`);
  slugs[e.slug] = l;
  if (e.about.length !== 4) throw new Error(`${l}.about has ${e.about.length} paragraphs, expected 4`);
  if (e.howToUse.length !== 6) throw new Error(`${l}.howToUse has ${e.howToUse.length} steps, expected 6`);
  if (e.classroomIdeas.length !== 5) throw new Error(`${l}.classroomIdeas has ${e.classroomIdeas.length}, expected 5`);
  /* ⚠ THE SAME FENCE THE TOOL CARRIES, IN ELEVEN LANGUAGES. This used to
     check English and German only, so no Portuguese or Italian sentence
     was fenced at all — the panels happened to be clean, which is
     discipline rather than structure. Caught by the it panel reviewing
     its own output: its draft carried `giusto`, the exact token N12 bans,
     on the landing page of the tool whose thesis is "never a verdict". */
  const all = [e.tagline, e.metaTitle, e.metaDescription].concat(e.about, e.howToUse, e.classroomIdeas).join(' ');
  const FAMILY = /\b(even numbers|odd numbers|multiples of|gerade Zahlen|ungerade Zahlen|Vielfache|nombres pairs|nombres impairs|multiples de|números pares|números impares|múltiplos|numeri pari|numeri dispari|multipli|even getallen|oneven getallen|veelvouden|jämna tal|udda tal|lige tal|ulige tal|like tall|ulike tall|parilliset|parittomat)\b/i;
  if (FAMILY.test(all)) throw new Error(`${l}: the landing names a clue family — the card must act, not be explained`);
  const VERDICT = /\b(correct|incorrect|wrong|well done|richtig|falsch|correcto|incorrecto|faux|bravo|giusto|sbagliato|goed gedaan|fout|rätt|fel|rigtigt|forkert|riktig|feil|oikein|väärin)\b/i;
  if (VERDICT.test(all)) throw new Error(`${l}: the landing carries verdict wording — this tool never judges`);
  if (/[­​-‍⁠﻿]/.test(all)) throw new Error(`${l}: the landing carries an invisible character`);
});

module.exports = OUT;
