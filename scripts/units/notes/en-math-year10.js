'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the planned school year that "Year pages S" made possible (Daily
 * Teaching System, Part 12.2): Compare stories: more and fewer, and Two-step stories, the last two lessons of the new
 * Grade 2 unit Story Problems Within 100. Written from the worksheets of the lessons and read by a US teacher-reviewer
 * beside the pages (2026-11-14: 16 findings, none a wrong answer; American punctuation, what a correct page for everyone
 * does and does not show, the answer of the board example). What a note says a tool does was read in the tool's code (The Planks: two planks up
 * to 16, a bracket over the piece that sticks out, only the two lengths are printed).
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that
 * runs past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '2:two-step-word-problems#compare-stories-more-and-fewer': {
      title: 'Compare stories: more and fewer',
      objective: 'Children solve compare stories within 100 in which the difference, the larger amount, or the smaller amount is unknown, with two bars and an equation.',
      note: {
        mistake: 'Children add when they read "more" and subtract when they read "fewer" without asking which box has more. That fails when the story says "That is 29 more than in the blue box": the red box has more, so the blue box has fewer, and the child has to subtract.',
        words: 'Open The Planks and drag the two planks to 15 and 9: "The red box has 15. The blue box has 9. Which box has more? How many more?" Carry away the piece that sticks out and say all three sentences: "The red box has 6 more. The blue box has 6 fewer. 9 and 6 more make 15." Then draw two bars on the board: "There are 85 oranges in a red box. That is 29 more than in the blue box. Which bar is longer?" The dashed piece is the piece that sticks out, drawn next to the short bar. Write 85 in the long bar, 29 in the dashed piece, a question mark in the short bar, and 85 − 29 = 56: "The blue box has 56."',
        watch: 'On the page for everyone, the bars are drawn: the longer bar is the box with more, and the dashed piece next to the shorter bar is the difference. In all three stories, "more" means add and "fewer" means subtract, so a correct page does not yet show that the child compared. On the easier page, every number is a multiple of 10 and the first story is done. On the harder page, two stories say "That is … more than" or "That is … fewer than," and the child draws the bars next to the red and blue squares. Ask "Which box has more?" before any number is written.',
      },
    },
    '2:two-step-word-problems#two-step-stories': {
      title: 'Two-step stories',
      objective: 'Children solve story problems within 100 that need two steps of adding or subtracting, and write an equation for each step.',
      note: {
        mistake: 'Children do one step and stop, or they add all three numbers no matter what happens in the story. Many start the second step from the first number of the story again instead of from the answer to the first step.',
        words: 'Tell a story in two parts and stop in the middle: "There are 36 apples in a box. Mia takes out 21." Ask, "How many are in the box now?" Write 36 − 21 = 15 and circle the 15. "Then Mia puts in 27. Which number do we start from now?" Write 15 + 27 = 42 under it and draw an arrow from the 15 to the start of the second line. Have a child retell the whole story with the numbers.',
        watch: 'On the page for everyone, the two steps are printed as a) and b) with boxes: the answer to step a) is written again at the start of step b). The easier page has two stories with multiples of 10. On the harder page, only the answer box is printed, and the child works out the two steps in the dotted space. Where two children take some, adding the two amounts first and subtracting once is right, too. The second page, Two-Step Word Problems, has three stories within 20 with the steps printed: start there with children who are not sure. A child who adds all three numbers needs to act the story out with counters and small numbers.',
      },
    },
  },
};
