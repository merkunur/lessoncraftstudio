'use strict';
/**
 * Teacher notes, English, mathematics: the unit of the designed school year that opens Grade 2, Fact Strategies
 * Within 20 (Daily Teaching System, Part 12.2, stage 1, eighth run). Four FURTHER lessons on points that Grade 1
 * teaches first ("<point>#<name>"): in Grade 2 the same strategies are practiced toward knowing the facts from memory
 * (2.OA.B.2), on the pages of the levels named in the unit file. Each note was written from the page the lesson hands
 * out, in American English, and read by one American teacher-reviewer with the pages (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '1:fluency-within-20#make-ten-sums-11-to-18': {
      title: 'Make ten to add: sums from 11 to 18',
      objective: 'Children add two one-digit numbers with a sum from 11 to 18 by splitting one of them to make ten, such as 8 + 6 = 8 + 2 + 4 = 14, and begin to see the two jumps in their heads.',
      note: {
        mistake: 'Second graders who learned this last year often still count on by ones under their breath and fill in the two parts afterward, so the page looks right and the fact is not getting any faster. Others stall when the first number is the small one, as in 6 + 9, because they have only ever made ten from 8 or 9.',
        words: 'Write 8 + 6 on the board. On the open number line, mark 8 and ask: "How far is it to ten? What is left of the 6?" Draw the two jumps and say: "8 and 2 make 10, and 4 more make 14." Then cover the line: "Can you see the jumps in your head? Try 7 + 5." Have children say the two parts aloud before they say the sum.',
        watch: 'Watch for lips moving: a child who counts on by ones lands on the right sum and never stops at ten. Ask that child for the partner that makes 10 before each problem. The page always starts from the first number; after 6 + 9 ask: "Which number would you rather start from?" Starting from the 9 takes only 1 to reach ten. The page has one worked problem and only three to solve, so keep going aloud: give 9 + 4, 7 + 6, and 5 + 8 without a number line and have children say the two parts before the sum. Note the facts a child answers at once: those need no jumps anymore.',
      },
    },
    '1:near-doubles#doubles-and-near-doubles': {
      title: 'Doubles and near doubles',
      objective: 'Children say the doubles up to 9 + 9 from memory and use them to solve near doubles, such as 7 + 8 = 7 + 7 + 1 = 15.',
      note: {
        mistake: 'Children know the small doubles and stall at 7 + 7, 8 + 8, and 9 + 9, so the near doubles built on them (7 + 8, 8 + 9) turn back into counting. When the larger number comes first, as in 9 + 8, some double the 9 and still add one, and get 19.',
        words: 'Start with the doubles alone. Put 7 counters on the near leaf of the Doubling Mirror and ask: "What will the double be?" Close the tray and count on from 7 as the counters land on the far leaf: 8, 9, 10, 11, 12, 13, 14. Do 6, 8, and 9 the same way until the answers come at once. Then: "7 + 8. Which double is inside? 7 + 7 is 14, and one more is 15." For 9 + 8 ask: "Which number do we double so that one more is left over?"',
        watch: 'On the page for everyone the child writes the double: check that it is the double of the smaller number, because every problem adds one. The easier page prints the double. The harder page has problems that take one away from the double of the larger number (6 + 7 = 7 + 7 − 1); use it with children who finish the page for everyone quickly. A child who cannot say 8 + 8 at once needs the doubles, not more near doubles.',
      },
    },
    '1:fluency-within-20#use-ten-to-subtract': {
      title: 'Use ten to subtract',
      objective: 'Children subtract a one-digit number from a number from 11 to 18 by going back to ten first, such as 15 − 7 = 15 − 5 − 2 = 8.',
      note: {
        mistake: 'Children count back by ones and end one off, because they say the starting number as the first count (15, 14, 13 …). Others subtract the smaller ones digit from the larger one, no matter which number it belongs to, and solve 15 − 7 as 7 − 5 = 2, so 12.',
        words: 'On the rekenrek, show 15 as a full row of ten and 5 beads on the second row. Say: "Take away 7. First the 5 on the second row: now we are at ten. 7 is 5 and 2, so 2 more come off the top row. 8 are left." Ask before every problem: "How many do you take away to get back to ten? How many are still to go?" Then show the same thing on the number line of the page: one jump from 15 back to 10, and one jump of 2 more back to 8.',
        watch: 'Watch the first box: it is always the ones digit of the starting number (for 14 − 6 it is 4). A child who writes another number there has not stopped at ten. The easier page shows the first problem worked with its two jumps. The harder page asks for the same two jumps with larger numbers and no worked problem (62 − 6: back to 60, then 4 more). These numbers go past 20; the two jumps are the same. Give it to children who no longer need to draw the jumps within 20.',
      },
    },
    '1:fact-families#think-addition-and-daily-facts': {
      title: 'Think addition to subtract, and start the daily facts',
      objective: 'Children solve subtraction facts within 20 by thinking of the addition fact (15 − 9 as 9 + ? = 15), and begin a five-minute daily facts routine that runs all year.',
      note: {
        mistake: 'Children treat 15 − 9 and 9 + ? = 15 as two separate problems: they count back for the first and count up for the second, and sometimes write two different numbers. In the daily facts, children who feel pushed to be fast stop thinking and guess.',
        words: 'On the Number Balance, put 15 on one side and 9 on the other. Ask: "What do we add to the 9 to make the beam level?" Say: "9 and 1 make 10, and 5 more make 15. So 9 + 6 = 15, and 15 − 9 = 6." For the daily facts say: "Five minutes, every day. I show a fact, you write the answer and hold it up. For one or two of them, someone tells how they got it: make ten, a double, back to ten, or think addition."',
        watch: 'The page for everyone has no number bond: check that the child writes the same number in both number sentences of a problem. The easier page draws the bond for children who need to see the whole and its two parts. For the daily facts, show eight to ten facts within 20 each day, one at a time, mixing addition and subtraction; in the first weeks take them from this unit. Give children about three seconds, have them answer on whiteboards, and do not time or score them. Keep a list of the facts many children still have to figure out and bring those back the next day; take a fact off the list when almost everyone answers it right away. The lesson has no worksheet for the daily facts.',
      },
    },
  },
};
