'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the planned school year that "Year pages W" made possible (Daily
 * Teaching System, Part 12.2): one new lesson each in the Grade 3 units Division and Fractions and in the Grade 2 unit
 * Equal Groups and Equal Shares.
 * Written from the built worksheets of the lessons. The pages were read by a native and teaching reviewer beside twelve
 * pictures (2026-11-14): whole rectangles are drawn as one outlined shape, the US wording is "tens rods", "basic fact"
 * and "divide the rectangle", and the page on whole numbers as fractions is published in English only.
 * What a note says a tool does was read in the tool's code: The Baking Tray shows a tray of buns in rows, the number
 * of rows on its left edge and the number in each row on its top edge; small arrow buttons (not plus and minus)
 * change either number ("One row fewer.", "One row more.", "One fewer in each row.", "One more in each row."); "Turn the tray" turns
 * it a quarter turn; the count of buns never changes on a turn. The Fraction Kitchen lets the class pick a food (the
 * pizza, the cake; with the Teacher plan also the chocolate bar) and a number of pieces, cut along the lines, and then
 * says the name of the parts and their number ("Fourths! 4 equal parts."); after the cut a chip "one whole" closes the
 * pieces up again ("4 fourths make one whole."); it shows one food at a time and no fraction symbols.
 * A US teacher-reviewer read the notes beside four pictures of the pages and the code of both tools (2026-11-14):
 * every number recomputed and right; three must-fix (arrow buttons, the factors of the easier rod page, the top number
 * only on the number-line page) and the US wording applied.
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that
 * runs past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Grade 3: Division (the unit also finishes the multiplication facts) ──
    '3:times-tables#multiply-by-tens': {
      title: 'Multiply by multiples of 10',
      objective: 'Children multiply a one-digit number by a multiple of 10 from 20 to 90 (4 × 60) by thinking in tens: 4 × 6 tens = 24 tens = 240.',
      note: {
        mistake: 'Children multiply the digits and leave out the zero, so 4 × 60 becomes 24. Others "add a zero" as a trick and cannot say why, and then write 2,400 or 204. In 5 × 40, some write 20: the fact itself ends in zero (5 × 4 = 20), so they think the zero is already there.',
        words: 'Draw 4 groups of 6 tens rods on the board, or lay them out. "How many rods are in each group? 6. How many groups? 4. How many rods in all? 4 × 6 = 24. Each rod is a ten, so that is 24 tens. What number is 24 tens?" Ten rods make 100, so 20 tens are 200, and 4 more tens make 240. Write three lines, one under the other: 4 × 6 = 24, 4 × 6 tens = 24 tens, 4 × 60 = 240. "What stays the same in every line? What changes?" Do 5 × 4 tens the same way and ask why the answer has two zeros.',
        watch: 'Warm up with Times Table of 10; have children read each fact as tens, not "add a zero" (3 × 10 is 3 tens, 30). On the easier page of Multiply by Multiples of 10, six pictures show tens rods in equal groups; the child writes how many tens there are and then the product (2 to 5 groups of 2 to 5 tens). On the page for everyone, each of the eight cards has three lines: the basic fact, the same fact in tens, and the product (3 × 7 = 21, 3 × 7 tens = 21 tens, 3 × 70 = 210). On the harder page, there are twelve equations with no help; in six of them the multiple of 10 comes first (70 × 3). Ask a child who writes 21 for 3 × 70 to say the middle line aloud. Watch the facts that end in zero: 5 × 60 is 30 tens, 300.',
      },
    },
    // ── Grade 3: Fractions ──
    '3:equivalent-fractions#whole-numbers-as-fractions': {
      title: 'Whole numbers as fractions',
      objective: 'Children write whole numbers as fractions (1 = 4/4, 2 = 8/4, 3 = 3/1) and find the fraction and the whole number at the same point on a number line.',
      note: {
        mistake: 'Children think a fraction is always less than 1, so 8/4 looks wrong to them. Others read 4/4 as 4, or write 2 = 2/4 because both numbers are in the problem. Many read 3/1 as one third.',
        words: 'In Fraction Kitchen, pick Pizza, tap "fourths," and cut. "How many fourths make the whole pizza? 4." Tap "one whole" to check, and write 4/4 = 1. Draw a second pizza in fourths on the board: "Two whole pizzas? 8 fourths: 8/4 = 2." Draw a number line from 0 to 3 and mark it in halves. Count the jumps aloud: "one half, two halves. Two halves land on 1." Write 2/2 under the 1, then 4/2 under the 2 and 6/2 under the 3. "What does the denominator, the bottom number, tell us? How many parts make one whole." Finally, hold up three uncut sheets of paper: "One part makes each whole, so the bottom number is 1. Three parts: 3/1 = 3."',
        watch: 'On the easier page, one, two, or three whole shapes are shaded completely; the child counts all the shaded parts for the top number (the bottom number is printed) and writes how many wholes that is. Each outlined shape is one whole. On the page for everyone, four number lines are marked in equal parts; the child writes the top number of each fraction under its whole number (the bottom number is printed); the first part (such as 1/3) is labeled. Watch for children who count the marks, not the spaces between them. On the harder page, twelve equations have one number missing (6/6 = _, 3 = _/1, 2 = _/4, _/3 = 2). For 2 = _/4 ask: "How many fourths are in one whole? In two?"',
      },
    },
    // ── Grade 2: Equal Groups and Equal Shares ──
    '2:arrays#rows-and-columns-of-squares': {
      title: 'Rows and columns of squares',
      objective: 'Children divide a rectangle into rows and columns of same-size squares (up to 4 rows and 5 columns) and count the squares by rows.',
      note: {
        mistake: 'Children draw the lines freehand, so the squares come out in different sizes, or they draw one line too many. Others mix up rows and columns. When they count, some count the lines they drew, not the squares.',
        words: 'On The Baking Tray, use the arrow buttons to make 3 rows with 4 in each row. "Rows go across. How many rows? 3. Columns go up and down. How many columns? 4." Count the buns row by row: 4, 8, 12, and write 4 + 4 + 4 = 12. Tap "Turn the tray" and ask what changed and what did not (skip the on-screen question about breaking the tray). Now squares instead of buns: give each pair a paper rectangle and square tiles: "Cover it with no gaps or overlaps. How many rows? How many columns?" On the board, draw a rectangle with marks on its sides and show how to lay the ruler from one mark to the mark across from it.',
        watch: 'Every child needs a ruler. On the easier page, one row and one column of squares are already drawn; the child draws the missing lines and writes the number of rows, columns, and squares. On the page for everyone, there are only marks on all four sides: the child joins each mark to the mark across from it, then adds the squares row by row (4 + 4 + 4 = 12). On the harder page, the marks are on two sides only, so the child must line up the ruler with no second mark to aim at. Each box in the addition gets the number of squares in one row; there are as many boxes as rows. Check the drawing before the numbers: crooked lines make squares of different sizes.',
      },
    },
  },
};
