/* Landing content for TOOL #35 The Folding Sheet, one entry per locale.
   Consumed by register-folding-sheet.js.

   ⚠ CURATION: en authored; the other ten come from that locale's native
   3-agent ensemble (§A.13.48), rebuilt rather than translated. Every
   panel was given the tool's LOCKED UI vocabulary so the landing page
   and the tool speak the same words — a landing that calls it a Falz
   while the tool says Faltlinie is two products.
   [NSR-FLAG] sv/da/no/fi. pt Brazilian per §6. es Mexican. */
'use strict';
const NATIVE = Object.assign({},
  require('./_folding-sheet-landing.json'),
  require('./_folding-sheet-landing-2.json'));

const EN = {
  en: {
    slug: 'folding-sheet', name: 'The Folding Sheet',
    tagline: 'Colour some squares, decide where the mirror is, and fold it to find out.',
    about: [
      'The Folding Sheet is a square of squared paper on the class screen. Children colour squares — anywhere, on both halves. Then somebody says where they think the mirror is, and puts the crease there. Then you fold, and the paper answers. It takes a minute to learn and a term to exhaust.',
      'When the sheet folds, the far half lands on the near half like a transparency. Where colour meets colour you see two layers. Where colour meets bare paper you see one layer, because one thickness of paint is thinner than two. Where two different colours meet you get a third thing. Nothing is marked and nobody is told they are wrong — single thickness is a property of paper, not a verdict.',
      'The crease is the interesting part, and it is why this is a tool rather than a worksheet. "Is it symmetric?" has no answer at all until you say along which crease. A shape can fold beautifully down the middle and not at all across. So two children put the crease in two different places, and both of them fold, and the argument is settled by the paper rather than by the grown-up. Then you move it again.',
      'It refuses a lot on purpose. Nothing is timed, nothing is scored, there is no right answer and no counter anywhere. It never counts how many ways a shape folds, because that is a much later idea and counting it here would turn a conversation into a test. Nothing is saved: close the page and the sheet is gone.'
    ],
    howToUse: [
      'Open it on the class screen so everyone is looking at the same sheet.',
      'Let children come up and colour squares — on both halves, not just one.',
      'Before folding, ask where the mirror is. Put the crease exactly there.',
      'Ask what they think will happen, then fold it in front of them.',
      'Look together: which squares came out with two layers, and which with one.',
      'Open it out, move the crease somewhere else, and fold it again.'
    ],
    classroomIdeas: [
      'Colour a lopsided blob on purpose and ask the class to find a crease that makes any of it match. The failures are as useful as the successes.',
      'Colour only one half, then tap Show me the mirror and let a child commit the partners one at a time before you fold.',
      'Press and hold a square so its partner lights up. Ask a child to predict the partner before you press it.',
      'Use the corner-to-corner crease on a figure the class already folded down the middle, and ask why it stops working.',
      'Data and shape work like this sits in the early primary curriculum; finish by copying the folded sheet onto squared paper, one square per square.'
    ],
    metaTitle: 'The Folding Sheet — Symmetry Tool | Free',
    metaDescription: 'A free classroom tool for early symmetry: colour the squares, put the crease where you think the mirror is, and fold it to find out. Nothing is scored.'
  }
};

const ORDER = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const OUT = {};
ORDER.forEach((l) => {
  const e = l === 'en' ? EN.en : NATIVE[l];
  if (!e) throw new Error(`_folding-sheet-content: no entry for ${l}`);
  ['slug', 'name', 'tagline', 'metaTitle', 'metaDescription'].forEach((k) => {
    if (!e[k] || typeof e[k] !== 'string') throw new Error(`${l}.${k} missing`);
  });
  if (!/^[a-z0-9-]+$/.test(e.slug)) throw new Error(`${l}.slug is not ASCII-safe: ${e.slug}`);
  if (e.about.length !== 4) throw new Error(`${l}.about has ${e.about.length} paragraphs, expected 4`);
  if (e.howToUse.length !== 6) throw new Error(`${l}.howToUse has ${e.howToUse.length} steps, expected 6`);
  if (e.classroomIdeas.length !== 5) throw new Error(`${l}.classroomIdeas has ${e.classroomIdeas.length}, expected 5`);
  /* ⚠ the same fence the tool carries (M13): the landing must not name
     the Grade-4 axis either, or the page teaches what the tool refuses */
  const axis = /(line[s]? of symmetry|axis of symmetry|Symmetrieachse|Spiegelachse|axe de sym|eje de simetr|eixo de simetr|asse di simmetria|symmetrieas|spiegelas|symmetrilinje|symmetriaxel|spegelaxel|symmetriakse|spejlingsakse|speilakse|symmetria-akseli|peiliakseli)/i;
  const all = [e.tagline, e.metaTitle, e.metaDescription].concat(e.about, e.howToUse, e.classroomIdeas).join(' ');
  if (axis.test(all)) throw new Error(`${l}: the landing names the Grade-4 axis vocabulary`);
  OUT[l] = e;
});

module.exports = OUT;
