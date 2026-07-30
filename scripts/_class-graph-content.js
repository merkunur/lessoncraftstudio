/* Landing content for TOOL #34 Class Graph, one entry per locale.
   Consumed by register-class-graph.js.

   ⚠ CURATION: each locale's data vocabulary comes from that locale's
   native 3-agent ensemble (§A.13.48), not from a translation. Every
   panel kept the textbook term (Säulendiagramm, staafdiagram,
   stapeldiagram, diagramme en barres, pictograma, pylväsdiagrammi) in
   the PROSE and out of the child-facing chips, on their own judgement.
   [NSR-FLAG] sv/da/no/fi. pt Brazilian per §6. */
'use strict';
const NATIVE = Object.assign({},
  require('./_class-graph-landing.json'),
  require('./_class-graph-landing-2.json'));

const EN = {
  en: {
    slug: 'class-graph', name: 'Class Graph',
    tagline: 'The class answers a question, one child at a time — then watch the children turn into a bar graph.',
    about: [
      'Class Graph puts one question on the class screen with two or three answers under it. Children come up to the one shared device and each taps their answer once; a small figure joins that column. What builds is a picture graph in the oldest sense — one child, one picture. Then you tap once and the columns of children become bars. Tap again and they come back.',
      'That change is the biggest abstraction in early data work, and almost every worksheet in the world presents it already done. A bar is not a picture of anything; it is a length standing in for a count, and a five-year-old has no reason to trust it. Watching it happen — to their own data, with their own selves in the columns — is the difference between being told that a bar means seven children and seeing seven children become one.',
      'The bar is exactly as tall as the pile was. Not roughly: exactly, because it is the same space the children were standing in. So when someone says the bar is bigger, you flip it back and the class checks. The numbers stay hidden until you choose to show them, for the same reason: if a numeral is on screen from the start, nobody looks at the graph at all. Hide them and the class has to compare lengths, which is what a graph is for.',
      'Nothing here ranks anything. There is no winner, no "most popular", no sorting the tallest to the front — a class survey is a portrait of the room, not a contest, and the moment one answer wins, the children who chose the others have lost something. Nothing is timed and nothing is scored. Every figure is identical, so no answer belongs to a nameable child, and when the page closes the answers are gone.'
    ],
    howToUse: [
      'Open it on the class screen. A question and three answers are already up.',
      'Change the question to whatever you actually want to ask, and name the answers.',
      'Pass the device along the carpet, or let children come up one at a time. One tap each.',
      'Before you change anything, ask which column is longest, and how they can tell.',
      'Tap Show the bars and let it happen in front of them. Then tap back to the children and ask whether it is still the same.',
      'Only when they have argued about it, tap Show the numbers.'
    ],
    classroomIdeas: [
      'Ask something with a genuinely close result, so no column is obviously longest. The disagreement is the lesson.',
      'Flip to the bars and back three or four times while they watch. Somebody will notice the bar never changes height, and that is the whole idea arriving on its own.',
      'Cover one bar with your hand and ask how many children are underneath. Then reveal the numbers.',
      'Run the same question with a different class or on a different day and put the two graphs side by side on paper.',
      'Ask a child to explain to another child where the pictures went. The explanation is the assessment, and you do not need to mark anything.'
    ],
    metaTitle: 'Class Graph — Picture Graph to Bar Graph | Free Tool',
    metaDescription: 'A free classroom tool for the first data lessons: the class votes, one child one picture, then watch the picture graph become a bar graph. Nothing is scored.'
  }
};

const ORDER = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const OUT = {};
ORDER.forEach((l) => {
  const e = l === 'en' ? EN.en : NATIVE[l];
  if (!e) throw new Error(`_class-graph-content: no entry for ${l}`);
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
