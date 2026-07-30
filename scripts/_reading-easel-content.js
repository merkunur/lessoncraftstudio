/* Landing content for TOOL #33 Reading Easel, one entry per locale.
   Consumed by register-reading-easel.js.

   ⚠ CURATION: every locale's classroom terminology comes from that
   locale's native 3-agent ensemble (§A.13.48), not from a translation.
   Each tradition has its own word for reading in meaning-groups and its
   own word for the mark — de Sinnschritt/Bogen, nl boogje, sv båge,
   fr groupe de mots/arc — and the prose uses the locale's own.
   [NSR-FLAG] sv/da/no/fi. pt Brazilian per §6. */
'use strict';
const NATIVE = Object.assign({},
  require('./_reading-easel-landing.json'),
  require('./_reading-easel-landing-2.json'));

const EN = {
  en: {
    slug: 'reading-easel', name: 'Reading Easel',
    tagline: 'Scoop the line into phrases, then hear it read both ways — and the class hears phrasing appear.',
    about: [
      'Reading Easel puts one line of text on the class screen, big enough for the back row. Between every two words there is a gap you can tap, and tapping it draws a scoop under the words that belong together. Then the tool reads the line aloud twice: once like a robot, with a break after every single word, and once in your scoops. That is the whole apparatus, and the difference between those two readings is the lesson.',
      'A child who reads word by word has decoded but has not read. Decoding is the part that gets taught and tested; phrasing is the part that turns it into reading, and it is much harder to teach because it is invisible on the page. Marking a sentence into meaning-groups and reading the groups — phrase-cued text — is the standard way to fix it, and teachers have always done it with a marker on a whiteboard. This does it with a voice, which is the part a marker cannot do.',
      'The tool never says where a scoop belongs. It cannot, honestly: in most sentences there is more than one defensible answer, and arguing about it is better for a class than being told. What it does instead is obey you exactly. Put a scoop in an odd place and the line audibly comes apart there, and somebody will say so. The commas turn out to want a scoop, which is how punctuation is best learned — by ear, discovered rather than announced.',
      'There is no timer here and there never will be. Fluency is the one part of reading the whole market gamifies, with words-per-minute and a stopwatch and a score, and that is the part of fluency that is not reading. Nothing in this tool counts anything, times anything, or marks anything right or wrong. Type your own line, or start from one of the ready ones, and let the class hear the difference.'
    ],
    howToUse: [
      'Open it on the class screen. A line is already up — nothing to set up.',
      'Read it together once, the way the class would naturally read it.',
      'Tap “Read it like a robot” and let them hear word-by-word reading from outside their own heads. It is usually funny, and the point lands immediately.',
      'Now ask where the words belong together, and tap the gaps they choose. The scoops appear under the line.',
      'Tap “Read it in scoops” and let them compare. Then move a scoop and play it again — the wrong place sounds wrong, and nobody had to be corrected.',
      'Use “Scoop by scoop” to walk through one group at a time; each lights up as it is read, so the class can echo it back.'
    ],
    classroomIdeas: [
      'Put up a line with a comma in it and say nothing about the comma. Let the class scoop it however they like, play it, and wait. Someone will notice where the pause wants to be.',
      'Read a line like a robot, then ask the class to read it that way on purpose. Doing the wrong thing deliberately is the fastest route to hearing the right one.',
      'Take two children who scooped the same line differently and play both. Often both sound fine, which is a more useful discovery than a right answer.',
      'Type a sentence from the book you are reading together. The scoops transfer straight back to the page they are holding.',
      'Scoop a line, then take the scoops off and ask the class to read it aloud from memory of the phrasing. What they are practising is what to do with a line they have never seen.'
    ],
    metaTitle: 'Reading Easel — Phrasing and Fluency | Free Tool',
    metaDescription: 'A free classroom tool for reading fluency: scoop a line into phrases and hear it read both ways. No timer, no words-per-minute, nothing is scored.'
  }
};

const ORDER = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const OUT = {};
ORDER.forEach((l) => {
  const e = l === 'en' ? EN.en : NATIVE[l];
  if (!e) throw new Error(`_reading-easel-content: no entry for ${l}`);
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
