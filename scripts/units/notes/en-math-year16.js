'use strict';
/**
 * Teacher notes, English, mathematics: the lesson of the planned school year that "Year pages Y" made possible (Daily
 * Teaching System, Part 12.2): one new lesson in the Grade 3 unit Shapes and Data.
 * Written from the built worksheet of the lesson (the page was read by a native and teaching reviewer, 2026-11-14:
 * the inch rulers are drawn at about two thirds of their size and the page says so).
 * What the note says the tool does was read in the tool's code: the Ruler shows a fixed ruler and a bar between a
 * start handle and an end handle (the bar is the object); in inches every inch has eight small spaces of one size
 * (all seven marks inside an inch have one height), the handles move a small space at a time (arrow keys too), and
 * "Show length" prints the bar's length as a mixed number in eighths, reduced (2 1/4 in).
 * A US teacher-reviewer read the note beside the page and the tool's code (2026-11-14): every number right. Must-fix
 * applied: on the tool a quarter inch is two small spaces, on the page it is one, so the note teaches "count the
 * spaces in one inch first" and not "two spaces". The lesson stands AFTER the lesson that reads a line plot in halves
 * (read before make, halves before quarters), where the first placement had it before.
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that
 * runs past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Grade 3: Shapes and Data ──
    '3:line-plot-halves#measure-to-the-quarter-inch': {
      title: 'Measure to the nearest quarter inch',
      objective: 'Children measure lengths to the nearest half and quarter inch on a ruler and show the lengths as Xs on a line plot marked in quarters.',
      note: {
        mistake: 'Children count the marks from 0, not the spaces, so every length comes out a quarter inch too long. Others read each small mark as a half (2¼ becomes 2½) or write 2 2/4 for 2½. When a pencil does not start at 0, they write the number where it ends.',
        words: 'On the Ruler, set the units to inches and turn off "Show length." "How many small spaces in one inch? Eight. So a quarter inch, one of four equal parts, is two spaces." Leave the start handle at 0 and drag the end handle two small spaces past the 2. "How long is the bar? Two inches and one quarter of an inch: 2¼." Turn "Show length" on to check: it reads 2 1/4 in. (If it shows eighths, nudge with the arrow keys.) Do 3½ and 1¾ the same way. Then put the end at 3¼, move the start handle to 1, and ask how long the bar is now (2¼). Give each pair a paper strip and a ruler: they measure it to the nearest quarter inch, say how they know, and add an X to a class line plot.',
        watch: 'On the easier page, six pencils are each lined up with their own ruler, marked in halves; the lengths are whole and half inches; there is no line plot. On the page for everyone, eight pencils lie on rulers marked in quarters (here one space is a quarter, not two); the child writes each length, draws an X for each pencil on the line plot, and answers two questions. On the harder page, the pencils start at the 1 or the 2, and the child counts the inches and quarter inches from where the pencil starts to where it ends (from 1 to 3¼ is 2¼). The rulers are drawn smaller than a real ruler: the child reads the ruler on the page. On the line plot every quarter inch from 1 to 4 has a labeled tick mark; two pencils of the same length make a stack of two Xs.',
      },
    },
  },
};
