/* Landing content for TOOL #32 Pattern Bench, one entry per locale.
   Consumed by register-pattern-bench.js.

   ⚠ CURATION: every locale's classroom terminology for the repeating unit
   comes from that locale's native 3-agent ensemble (§A.13.48), not from a
   translation of the English. Where a tradition has its own word for the
   repeating part — Musterfolge, motif, ritmo, kuviojono — it is used.
   [NSR-FLAG] sv/da/no/fi. pt Brazilian per §6. */
'use strict';
const NATIVE = Object.assign({},
  require('./_pattern-bench-landing.json'),
  require('./_pattern-bench-landing-2.json'));

const EN = {
  en: {
    slug: 'pattern-bench', name: 'Pattern Bench',
    tagline: 'Clap it, colour it, shape it — and watch the class realise it was the same pattern all along.',
    about: [
      'Pattern Bench is a strip of beads that repeats whatever small unit you build. Put red-blue in the unit and the strip runs red-blue-red-blue as far as you like. Put red-blue-yellow in and it runs in threes. That is the entire apparatus, and everything interesting comes from what you do with it.',
      'A child who can carry on red-blue-red-blue has not necessarily seen the pattern. They may simply be alternating, which is a much smaller idea. The child who sees that red-blue-red-blue and circle-square-circle-square and clap-stamp-clap-stamp are the same pattern has seen something else entirely — that a pattern is a structure, not a surface. That recognition is where algebraic thinking starts, years before any letter stands for a number.',
      'So the bench stores your pattern as pure structure and treats colour, shape and picture as costumes it can put on. Switch costume and the strip re-dresses in front of the class while the pattern underneath is provably untouched. Cover a bead in the middle of the strip and the only way to work out what is under it is to reason from the unit, because there is nothing next to it to copy. Hide the unit altogether and the question stops being carry it on and becomes what is the part that repeats, which is much harder and much more worth arguing about.',
      'There is no right answer button anywhere in this tool, and that is deliberate: in ABABAB the repeating part can honestly be read as AB or as BA, and the bench lets a class test each claim by rebuilding the strip from it. The material settles the argument, not the adult.'
    ],
    howToUse: [
      'Open it on the class screen. A two-bead unit and a strip already repeating it — nothing to set up.',
      'Tap a bead in the unit to change it. The whole strip re-forms instantly, which is the point: the unit is the only thing that decides the strip.',
      'Tap a bead in the strip to cover it. Choose one in the middle. A gap at the end can be solved by copying the last bead; a gap in the middle can only be solved from the unit.',
      'Switch between colours, shapes and pictures while the class watches. Ask what changed and what did not.',
      'Tap Clap it to hear the pattern one bead at a time, then clap it with your hands and ask whether that was the same pattern. It was.',
      'When they are ready, hide the unit and leave only the strip. Now the question is what repeats, and that is the one worth their time.'
    ],
    classroomIdeas: [
      'Build a pattern in colours, then switch to shapes without saying anything and wait. Someone always notices first, and what they say next is the lesson.',
      'Cover the sixth bead of a twelve-bead strip and ask how they know, not what it is. Reasoning from the unit and copying a neighbour sound completely different.',
      'Hide the unit and ask two children who disagree to each rebuild the strip from their version. In ABABAB both AB and BA carry on correctly, and finding that out together beats being told.',
      'Turn the letters on only after the class has been talking about the pattern for a while. A B A B lands as a description of something they already know, rather than a new thing to learn.',
      'Clap the strip with the sound on, then turn the sound off and clap it together. Ask whether the pattern was in the screen or in the room.'
    ],
    metaTitle: 'Pattern Bench — Repeating Patterns for K-1 | Free Tool',
    metaDescription: 'A free classroom tool for repeating patterns: build the unit, watch the strip repeat it, then show the same pattern in colours, shapes or pictures. Nothing is marked.'
  }
};

/* the ten native locales, in the platform's canonical order */
const ORDER = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const OUT = {};
ORDER.forEach((l) => {
  const e = l === 'en' ? EN.en : NATIVE[l];
  if (!e) throw new Error(`_pattern-bench-content: no entry for ${l}`);
  /* fail loudly rather than shipping a half-written landing page */
  ['slug', 'name', 'tagline', 'metaTitle', 'metaDescription'].forEach((k) => {
    if (!e[k] || typeof e[k] !== 'string') throw new Error(`${l}.${k} missing`);
  });
  if (!/^[a-z0-9-]+$/.test(e.slug)) throw new Error(`${l}.slug is not ASCII-safe: ${e.slug}`);
  if (e.about.length !== 4) throw new Error(`${l}.about has ${e.about.length} paragraphs, expected 4`);
  if (e.howToUse.length !== 6) throw new Error(`${l}.howToUse has ${e.howToUse.length} steps, expected 6`);
  if (e.classroomIdeas.length !== 5) throw new Error(`${l}.classroomIdeas has ${e.classroomIdeas.length}, expected 5`);
  OUT[l] = e;
});

module.exports = OUT;
