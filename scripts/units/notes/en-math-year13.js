'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the planned school year that "Year pages V" made possible (Daily
 * Teaching System, Part 12.2): one new lesson of the Grade 1 unit Adding Within 100 and two of the Grade 2 unit Adding
 * and Subtracting Within 100.
 * Written from the built worksheets of the lessons and read by a US teacher-reviewer beside nine pictures of the pages
 * (2026-11-14: every number recomputed and right; one must-fix, at the source: four ones digits can make three new
 * tens, so the harder column page now stops at two; the rest US wording: "circle" for "ring", "problem" for a sum that
 * is not an answer, "regrouped" said once beside "open a ten").
 * What a note says a tool does was read in the tool's code: the Place Value Lab holds one number as tens and ones
 * ("Add a ten", "Add a one"), lets up to 19 loose ones lie in the ones column, asks "Ten ones! Can you make a ten?" and
 * bundles them on "Make a ten!"; the Exchange Machine deals its own sums in a fixed order (48 − 23, 42 − 17, 63 − 28,
 * 50 − 24, 204 − 137, 38 + 25, 96 + 47; its button reads "Another sum"), adds or subtracts two numbers only, and on a
 * tap lets one of a column come apart into ten in the column to its right, or ten gather into one in the column to its
 * left.
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that
 * runs past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Grade 1: Adding Within 100 ──
    '2:add-with-blocks#add-two-two-digit-numbers-and-make-a-new-ten': {
      title: 'Add two two-digit numbers and make a new ten',
      objective: 'Children add two two-digit numbers when the ones make a new ten (36 + 28), with a drawing of sticks and dots on a tens-and-ones mat, and tell why the new ten joins the tens.',
      note: {
        mistake: 'Children add each column and write both totals side by side, so 36 + 28 becomes 514 (5 tens, 14 ones). Others circle ten dots and forget to draw the new stick, or draw it and still count the circled dots as ones.',
        words: 'On the Place Value Lab, build 36 with "Add a ten" and "Add a one." Then add 28 more: two tens and eight ones. "How many ones now? 14. Can we write 14 in the ones place?" The lab asks, "Ten ones! Can you make a ten?" Tap "Make a ten!" and say: "Ten ones make one ten. It joins the tens: 6 tens and 4 ones, 64." Do the same problem on the board with sticks and dots, the dots in rows of five: circle ten dots, draw one new stick, and ask a child to tell why you drew it.',
        watch: 'On the easier page, both numbers are drawn on the mat, the second under the first (in green); the child circles ten dots, draws the new stick, and counts. On the page for everyone, the mat is empty: the child draws both numbers first, and every problem makes a new ten. On the harder page, two of the six problems make no new ten, so the child has to look before circling. In the boxes under the mat, ten circled dots count as one ten: 6 tens and 4 ones, not 5 tens and 14 ones. When the ones make exactly ten (41 + 29), the child writes 7 tens and 0 ones; watch for an empty ones box.',
      },
    },
    // ── Grade 2: Adding and Subtracting Within 100 ──
    '2:subtract-with-blocks#subtract-and-open-a-ten': {
      title: 'Subtract and open a ten',
      objective: 'Children subtract within 100 when there are not enough ones (52 − 27) by regrouping: they open one ten into ten ones in a drawing of sticks and dots.',
      note: {
        mistake: 'Children subtract the smaller ones digit from the larger, no matter which number it is in, so 52 − 27 becomes 35. Others draw the ten dots but do not cross out the stick they opened, so they take 2 tens from 5, not from 4. Some open a ten in every problem, even when there are enough ones.',
        words: 'The Exchange Machine opens with 48 − 23. "Start at the ones. Are there enough to take 3 away? Yes." Tap "Another sum": 42 − 17. "Enough ones to take 7 away? No, there are only 2." Tap the tens column: one ten crosses over and comes apart into ten ones, and the 4 is crossed out. "We regrouped: 3 tens and 12 ones. It is still 42." Draw the same on the board: four sticks and two dots. Cross out one stick, draw ten dots for it, then cross out 7 dots and 1 stick. "What is left? 2 tens and 5 ones: 25."',
        watch: 'The easier page takes away a one-digit number; the page for everyone, a two-digit number. On the harder page, the mat is empty and the child draws the first number. Every page has problems that need no ten opened (two on the first two pages, one on the harder page): there the child marks "yes" and only crosses out. Check the yes/no mark first; a wrong mark explains a wrong answer. A first number with no ones (50 − 4) always needs a ten opened; watch for 54. Have children say what the mat shows after the trade ("4 tens and 10 ones") before they cross anything out.',
      },
    },
    '2:column-method#add-three-and-four-two-digit-numbers': {
      title: 'Add three and four two-digit numbers',
      objective: 'Children add three or four two-digit numbers with a sum within 100 in columns, look for ones that make ten, and write the new tens above the tens column.',
      note: {
        mistake: 'Children add the ones, get 18 or 23, and write both digits under the line, so the answer has three digits. Others write the new ten above the tens and forget to add it. When the ones add up to 20 or more, they still write 1 in the small box.',
        words: 'On the Exchange Machine, tap "Another sum" five times, until 38 + 25 appears. Fill the outlines in the ones column: "8 and 5 make 13. Only one digit fits under the line." Tap the ones column: ten gather into one new ten on the left. The machine adds two numbers only, so go to the board. Write 18 + 36 + 24 in columns. "Look at the ones: 8, 6, 4. Do two of them make ten? 6 and 4. Ten and 8 more is 18." Write 8 under the ones and a small 1 above the tens. "Now the tens: 1 new ten, and 1, 3, 2. That makes 7 tens." 78.',
        watch: 'On the easier page, there are six problems with three numbers; the ones make no new ten and there is no small box. On the page for everyone, four problems have three numbers and four have four; in each, two of the ones digits make ten, and one new ten goes in the small box. On the harder page, every problem has four numbers and the ones make one or two new tens (8 + 9 + 6 + 0 = 23: write 3 under the ones and 2 in the small box). When the ones make exactly 20, a 0 goes under the ones. Ask children to say the sum of the ones before they write. Have them check by adding from the bottom up.',
      },
    },
  },
};
