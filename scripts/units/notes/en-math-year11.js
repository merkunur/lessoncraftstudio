'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the planned school year that "Year pages T" made possible (Daily
 * Teaching System, Part 12.2): the three new lessons of the Grade 3 unit Story Problems with All Four Operations.
 * Written from the built worksheets of the lessons and read by a US teacher-reviewer beside nine pictures of the pages
 * (2026-11-14: 21 findings, one must-fix; the page for everyone has three stories of four kinds, "near" means within
 * about 100, the Baking Tray tells a bun story because it cannot take buns away).
 * What a note says a tool does was read in the tool's code: the Exchange Machine deals its own sums ("Another sum",
 * "Change the operation"; three-digit sums with the Teacher plan); the Baking Tray is set to rows of buns; the Rounding
 * Hill has a ground "between two hundreds", a boulder that moves in steps of ten and settles into the nearer dip.
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that
 * runs past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '3:two-step-word-problems#two-step-stories-add-and-subtract': {
      title: 'Two-step stories: add and subtract',
      objective: 'Children solve two-step story problems with adding and subtracting within 1,000 and show each step as an equation.',
      note: {
        mistake: 'Children add every number they see, or they finish the first step and write that number as the answer. With three-digit numbers, some lose track of the story while they regroup, or carry the wrong number from step a) into step b).',
        words: 'Tell a story in two parts and stop in the middle: "A store has 356 pencils. A truck brings 124 more. How many pencils does the store have now?" Write 356 + 124 = 480 and circle the 480. "Then the store sells 213. Which number do we start from now?" Write 480 − 213 = 267 under it and draw an arrow from the 480 to the second line. Ask, "Does 267 make sense? The store sold more than the truck brought, so it has fewer than at the start." If the regrouping gets in the way, do one subtraction on the Exchange Machine first (it deals its own numbers).',
        watch: 'On the page for everyone, the two steps are printed as a) and b) with boxes, and the dotted space is for the written work. It has three stories from four kinds: a store that gets a delivery and then sells, a market that sells and then gets a delivery, workers who pack on three days, and a truck that leaves things at two stores. The easier page has two stories with numbers that end in 0 (380 + 270). On the harder page, only the answer box is printed, and the child finds the two steps; there, in a truck story, adding the two amounts first and subtracting once is right, too.',
      },
    },
    '3:two-step-word-problems#two-step-stories-multiply-or-divide': {
      title: 'Two-step stories: multiply or divide',
      objective: 'Children solve two-step story problems in which one step multiplies or divides within 100 and the other adds or subtracts.',
      note: {
        mistake: 'Children miss the word "each" and add: for "There are 6 baskets. Each basket holds 8 medals. 3 are taken out," they compute 6 + 8 − 3. Others multiply and stop. In the sharing stories, some divide the first number they see before they have asked what is being shared.',
        words: 'On the Baking Tray, set 4 rows of 6 buns: "The baker made 4 rows with 6 buns in each row. How many buns? Which fact?" Write 4 × 6 = 24. "She sells 5." The tray cannot take buns away, so write it: "What happens to the 24?" 24 − 5 = 19. Then tell a sharing story without the tray: "There are 12 pens in a red box and 8 in a blue box. 4 children share all of them fairly. What is being shared? All the pens. What first?" Write 12 + 8 = 20, then 20 ÷ 4 = 5.',
        watch: 'On the page for everyone, the steps are printed as a) and b): one story multiplies first, one divides first, and one adds the things in two boxes first and then shares. The easier page has two stories that multiply first, with factors from 2 to 5. On the harder page, only the answer box is printed; one story may be "keeps some and shares the rest," where subtracting comes first. A child who cannot say what each number counts (baskets, things in one basket, things taken out) draws the story in the dotted space first.',
      },
    },
    '3:two-step-word-problems#an-equation-with-a-letter-and-an-estimate': {
      title: 'A letter for the unknown and an estimate to check the answer',
      objective: 'Children write one equation with a letter for the unknown for a two-step story problem, solve it, and check the answer against an estimate from rounded numbers.',
      note: {
        mistake: 'Children treat the estimate as one more exercise and never compare it with the answer. Many round the exact answer after they have computed it, which checks nothing. Some think n is the same number in every story; it is only a name for the number we do not know yet.',
        words: 'Write the store story as one line: 356 + 124 − 213 = n. "n is the number of pencils the store has at the end." Estimate before computing. On the Rounding Hill, choose the ground between two hundreds, shift the hill to 300 and 400, move the boulder to 360 (the spot nearest 356), and let go: it settles into 400. "356 rounds to 400, 124 to 100, 213 to 200. 400 + 100 − 200 = 300." Compute n = 267: "Is 267 near 300? Yes." Then write n = 693: "A child got this. Near 300? No. What went wrong?" (The 213 was added.)',
        watch: 'On the easier page, the equation is printed and the estimate has a frame of boxes for the rounded numbers. On the page for everyone, the child writes both on lines. The harder page has three stories; the last one prints a child\'s finished answer, which is right on some pages and far off on others: the child estimates, marks yes or no, and then finds n. No number on these pages ends in 45 to 55, so no one has to argue about a halfway number. A right answer is never more than 100 from the estimate, and a wrong printed answer is at least 200 away: "near" means within about 100.',
      },
    },
  },
};
