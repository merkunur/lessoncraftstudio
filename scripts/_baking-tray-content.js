/* =====================================================================
   _baking-tray-content.js — TOOL #46 landing copy, eleven locales
   ---------------------------------------------------------------------
   The single source for `frontend/messages/tool-content/<loc>.json` and
   for the hub card in `frontend/lib/manipulatives.ts`. Consumed by
   scripts/register-baking-tray.js.

   ⚠ EIGHT REQUIRED FIELDS, and the register script reads that list OFF
   THE ToolEntry INTERFACE rather than trusting this comment: slug, name,
   tagline, about[], howToUse[], classroomIdeas[], metaTitle,
   metaDescription. #42 shipped five of the eight, and the build then
   failed the static export of all eleven landing pages AFTER
   registration had reported success — tsc cannot catch it, because
   tool-content/*.json is untyped at runtime.

   ⭐ THE ROUTINE IS PART OF THE PRODUCT, NOT MARKETING. The pedagogy
   panel's blunt finding was that the tool does not teach the invariant —
   the ROUTINE teaches it. A silent instrument makes nothing salient: a
   child watches a tray split and reasonably concludes there are now two
   trays. So `howToUse` is the six-move routine, in order, and the
   load-bearing move is the fourth one (put it back and break it
   somewhere else), not the crack.

   ⚠ NO `×`, NO `+`, NO `=` AND NO TOTAL in any tool STRING — but the
   landing prose MAY carry them, because a landing page has to be able to
   say what the tool refuses to do. That distinction is the #44 ruling:
   running the apparatus bans over landing copy failed four locales on
   sentences whose whole job was to state the refusal.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    slug: 'baking-tray',
    name: 'The Baking Tray',
    tagline: 'One tray, two facts: the hard one breaks into two the class already owns.',
    about: [
      'A tray of buns is baked in rows, all joined, so the line where two buns meet is a line you could break along. Seven rows of six is a hard fact. Break the tray after the fifth row and it is five rows of six and two rows of six — two facts most of the class already has. Nothing was added and nothing was taken away; the same buns are simply being read as two pieces instead of one.',
      'Turning the tray a quarter turn is the other move, and it is not a trick about the order of the numbers. It changes which lines are there to break along. If nothing useful can be broken off the seven, turn the tray and break the six instead.',
      'The tray never shows a total, never writes a number sentence and never says whether a break was a good one. Where to break it is the question the class is there to argue about, and a tool with an opinion about that would end the argument before it started.'
    ],
    howToUse: [
      'Have the tray on screen before the children come in. Ask for the shape, not the total: how many rows, and how many in each row?',
      'Ask whether anyone knows this one straight away. Usually nobody does, and saying so out loud is worth more than it sounds.',
      'Ask where to break it so that BOTH pieces are ones the class already knows — then break it where they say, including when they say somewhere awkward.',
      'Push the pieces back together and ask whether any buns were lost. Then break it somewhere else. Two different breaks of one tray inside a minute is the whole idea.',
      'Now write it on the board yourself, in the way your class writes it. The tray deliberately does not: it holds the material still while the writing stays yours.',
      'Turn the tray when the breaks on offer are not helpful, and let the class see the same buns read the other way round.'
    ],
    classroomIdeas: [
      'Break the same tray two different ways in one session and put both up on the board. The point is not which is better; it is that one tray makes more than one pair of facts.',
      'Start with a tray whose break is obvious — a ten, or a five — before going anywhere near the sevens and eights. The five line is drawn deeper in the tray for exactly that reason.',
      'Use it the other way round for square numbers: turn a six-by-six and let the class watch nothing at all happen. That is a result, and it is worth naming.'
    ],
    metaTitle: 'The Baking Tray — Breaking a Hard Times Table Fact in Two',
    metaDescription: 'A free whole-class tray of buns for multiplication: break seven rows of six into five rows and two rows, two facts the class already knows. No total, no timer, no score. Ages 7-9.'
  }
};
