'use strict';
/**
 * Teacher notes, English, mathematics: the lesson of the planned school year that "Year pages AB" made possible (Daily
 * Teaching System, Part 12.2): one new lesson in the Grade 2 unit Time, Money, and Measuring Length (2.MD.B.5).
 * Written from the built worksheet of the lesson (G2-518 Length Story Problems, read by a native and teaching reviewer
 * in all eleven languages, 2026-11-14: the instruction now says that the longest length goes in the top bar, because a
 * child who copied a worked join story modeled every take-away story as an addition).
 * What the note says the tool does was read in its code (mini tools/comparison-planks.js): The Planks shows two planks
 * from one line, each with its length as a numeral (1 to 16, set by dragging a plank's end); where one reaches further,
 * a bracket stands over the piece that sticks out; dragging the bracket down takes that piece off, and it can be laid at
 * the end of the shorter plank, where the two reach exactly as far as the long one. The tool never prints the third
 * number: the class says it ("Before you move it, say out loud how long that piece is").
 * A US teacher-reviewer read the note beside the pages and the tool's code (2026-11-14): the unit is printed beside every
 * answer box (so leaving it off is not this page's error), and the bracket takes the piece off only when it is dragged
 * below the bottom plank (a shorter drag puts it back).
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that runs
 * past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Grade 2: Time, Money, and Measuring Length ──
    '2:compare-lengths#length-story-problems': {
      title: 'Length story problems',
      objective: 'Children solve story problems within 100 about lengths given in the same unit (inches or feet): they draw a bar model with a ? for the unknown and write a matching equation.',
      note: {
        mistake: 'Children add the two numbers of every story, even when a piece is cut off or two lengths are compared. Many put the longest length in a part of the bar instead of on top, so their equation adds what it should subtract. Others answer with a length the story gives.',
        words: 'On The Planks, drag the ends to make the top plank 16 and the bottom plank 9. "Which is longer? By how much?" Before moving the piece that sticks out, the class says how long it is: 7. Drag the bracket all the way down to take the piece off and lay it at the end of the short plank: 9 and 7 reach exactly as far as 16. Draw it on the board as a bar: 16 on top, 9 and ? below, and write 16 − 9 = ?. Then tell a story with bigger numbers: "The red ribbon is 63 inches long. The blue ribbon is 48 inches long. How much longer is the red ribbon?" Pairs draw the bar with the longest length on top and write an equation.',
        watch: 'Every page has three stories about a ribbon, tape, a scarf, a garden hose, or a fence, each in one unit, with a bar, an equation frame, and the unit beside the answer box. On the easier page, the lengths are whole tens, and the first story is done. On the page for everyone, the stories join two lengths, cut one off and compare two. On the harder page, the unknown moves: find the longer or shorter length, or the piece cut off. 63 − 48 = 15 and 48 + 15 = 63 are both right. Ask: "Which length goes on top, and why?"',
      },
    },
  },
};
