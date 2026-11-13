'use strict';
/**
 * Teacher notes, English, mathematics: the lesson of the designed school year that the "Year pages I" made possible
 * (Daily Teaching System, Part 12.2): one further lesson in the Grade 3 unit Fractions. Written from the pages the
 * lesson hands out, in American English, and read by one American teacher-reviewer with the pages (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Grade 3: Fractions ──
    '3:fraction-number-line#unit-fractions-on-the-number-line': {
      title: 'Unit fractions on the number line',
      objective: 'Children see the distance from 0 to 1 on a number line partitioned into 2, 3, 4, 6, or 8 equal parts and name the endpoint of the first part as 1/2, 1/3, 1/4, 1/6, or 1/8. Then they count equal parts from 0 to place a fraction such as 3/8 on the line.',
      note: {
        mistake: 'Children count the tick marks instead of the equal parts, so on a line partitioned into fourths they write 1/5 (five marks) or 1/3 (three marks between 0 and 1). Some write the fraction upside down (4/1). Many think 1/8 is greater than 1/4 because 8 is greater than 4.',
        words: 'Say: "Count the jumps from 0 to 1, not the marks. How many equal parts? Four. Each part is one fourth." Point to the dot: "The dot is at the end of the first part. That is 1 of 4 equal parts: 1 on top, 4 on the bottom." Compare two lines: "Which first part is longer, one fourth or one eighth? Why?" For the second worksheet say: "Three eighths. Each jump is one eighth. Start at 0 and count three jumps: one eighth, two eighths, three eighths. Draw the dot there."',
        watch: 'Watch what the child counts: parts or marks. Check the bottom number first: it must be the number of equal parts between 0 and 1. On the second worksheet the fraction is printed and the child draws the dot. Most of its fractions are not unit fractions (3/8, 2/3, 4/6): watch that the child counts that many parts from 0 and does not stop at the first mark. The harder page of the first worksheet has fractions such as 3/4.',
      },
    },
  },
};
