'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the designed school year that the "Year pages D" made possible
 * (Daily Teaching System, Part 12.2): two new units, Teen Numbers and Counting to 100 (Kindergarten) and Adding
 * Within 100 (Grade 1). One entry per lesson: a new teaching point, or a FURTHER lesson on a point that already has
 * one ("<point>#<name>"). Each was written from the page the lesson hands out, read at the level the lesson names,
 * in American English, and read by one American teacher-reviewer with the pages (18 findings applied, 2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Kindergarten: Teen Numbers and Counting to 100 ──
    'K:teen-numbers#ten-and-some-more': {
      title: 'Ten and some more',
      objective: 'Children count a group of 11 to 19 objects, circle ten of them, and write the number as ten and some more ones, such as 10 + 4 = 14.',
      note: {
        mistake: 'After they circle ten, many children count the whole group again from 1. Some circle nine or eleven because they do not use the columns of five. Children who hear "ten and four" sometimes write 104 for 14.',
        words: 'Say: "Two full columns are ten. Circle them." Ask: "How many are outside your circle?" Then count on together: "Ten, and then 11, 12, 13, 14." Have children say the whole sentence: "14 is ten and four more."',
        watch: 'Watch who starts again at 1 and who counts on from ten. Check each child\'s circle on the first problem: a circle around nine or eleven makes the number of extra ones wrong.',
      },
    },
    'K:teen-numbers': {
      title: 'Teen numbers on two ten-frames',
      objective: 'Children count the counters on two ten-frames, one full and one with 1 to 9 counters, write the number, and finish the number sentence, such as 13 = 10 + 3.',
      note: {
        mistake: 'Children count every counter in the full frame one by one. When they write, some reverse the digits (31 for 13), because in "thirteen" they hear the three first. Eleven and twelve give no hint of the ten in their names.',
        words: 'Ask: "Is the first frame full? Then you know it is ten. You do not have to count it." Say: "Ten and three more is thirteen. The 1 is the full frame, the 3 is the other frame." For 11 and 12 say: "Eleven is ten and one. Twelve is ten and two."',
        watch: 'Watch who taps the full frame counter by counter. Look at the written numbers for reversed digits, most often in 13 to 19, where the ones are spoken first.',
      },
    },
    '1:hundreds-chart#count-to-100': {
      title: 'Count to 100 on the hundreds chart',
      objective: 'Children count aloud to 100, point to each number on a hundreds chart as they say it, and write the numbers that are missing on the chart.',
      note: {
        mistake: 'Children stall at the end of a decade: after 29 they stop or say "twenty-ten." To find a missing number, some start again at 1. In the last rows, digits get reversed (17 for 71).',
        words: 'At the end of a row ask: "29. Which number starts the next row?" For an empty box say: "Look at the number before the box and the number after it." Count from 21 to 29 together and ask: "Which word did we say every time?"',
        watch: 'Listen at 29, 39, 49, and so on: that is where the count breaks. Watch who uses the neighbors of an empty box and who counts from the top of the chart every time. Reversed digits in a box are a writing slip at this age, not a counting error.',
      },
    },
    '1:skip-counting#count-by-tens-to-100': {
      title: 'Count by tens to 100',
      objective: 'Children count aloud by tens to 100, go on from any ten, and write the tens that are missing in rows that count by tens.',
      note: {
        mistake: 'Children mix up the -teen and the -ty numbers when they speak and write: 13 for 30, 14 for 40. On a row that starts at 20 or 30, some begin again at 10. After ninety, a few say "tenty."',
        words: 'Fill real cups with ten beans each and count the cups all the way: "ten, twenty, thirty," on to one hundred. Say: "Thirty ends in -ty: three tens. Thirteen ends in -teen: ten and three." For a row that starts at 20 ask: "Twenty. What is ten more?" One row starts at 0. Say: "Zero means no cups yet. Then comes ten."',
        watch: 'Look at how 30, 40 and 50 are written: a 13 in the place of 30 shows the mix-up. Watch who can go on from 20 or 30 and who has to start at 10 every time.',
      },
    },
    // ── Grade 1: Adding Within 100 ──
    '1:mental-math-to-100': {
      title: 'Add tens to a number',
      objective: 'Children add tens to a two-digit number in their heads, such as 34 + 20, with sums up to 99, and say that only the tens digit changes.',
      note: {
        mistake: 'Children add the tens to the ones: 34 + 20 = 36. Others count on by ones twenty times and lose track. When the first number is small, such as 12 + 50, some write 125 or add the 5 to the 2 and get 17.',
        words: 'Ask: "How many tens are in 34? Three. Add two more tens. How many tens now? And the ones?" Count by tens from the number: "34, 44, 54." In the Number Hotel, take the elevator: it goes up one corridor for every ten, and you stay at the same door. Say: "Only the tens change."',
        watch: 'Watch who counts by ones and who changes the ones digit. A child who knows 30 + 20 but not 34 + 20 needs to build the number with rods and cubes a few more times and add whole rods.',
      },
    },
    '1:mental-math-to-100#add-ones-to-a-two-digit-number': {
      title: 'Add ones to a two-digit number',
      objective: 'Children add a one-digit number to a two-digit number when the ones stay under ten, such as 32 + 5, and say that the tens do not change.',
      note: {
        mistake: 'Children count on by ones on their fingers for every problem, when 2 + 5 already tells them the answer. Some add the single digit to the tens: 32 + 5 = 82. A big first number, such as 85 + 4, makes children unsure of a fact they know.',
        words: 'Say: "Look at the ones: 2 and 5. What is 2 + 5? So 32 + 5 is thirty-seven." Show the small fact next to the big one: "3 + 4 = 7, so 23 + 4 = 27 and 53 + 4 = 57." Ask: "Did the tens change? Why not?"',
        watch: 'Watch who uses the small fact and who counts on from the big number. A child who has to count 3 + 4 on fingers needs the facts within 10 first; the two-digit numbers are not the problem.',
      },
    },
    '1:mental-math-to-100#add-ones-and-make-a-new-ten': {
      title: 'Add ones and make a new ten',
      objective: 'Children add a one-digit number to a two-digit number when the ones make a new ten, such as 27 + 5: they jump to the next ten on the number line first, then jump the rest, and write the steps, 27 + 3 + 2 = 32.',
      note: {
        mistake: 'Children keep the old ten: 27 + 5 = 22. Others write the whole 12 after the 2 and get 212. Some reach 30 and then add the whole 5 again, or split the 5 into two parts that do not land on the ten.',
        words: 'Ask: "Which ten comes after 27? How far is it to 30? Three." Then: "You have 5 to add and you used 3. How many are left? 30 and 2 more." Have children check: "Do your two jumps make 5 together?"',
        watch: 'Watch how each child gets to the next ten. A child who counts up to it by ones needs more practice with the pairs that make 10 before this page. Check that the two jumps in the boxes add up to the number being added.',
      },
    },
    '2:add-with-blocks#add-two-two-digit-numbers': {
      title: 'Add two two-digit numbers: tens with tens, ones with ones',
      objective: 'Children add two two-digit numbers shown as rods and cubes when no new ten is made, such as 34 + 25: they add the tens, then the ones, and write the sum up to 99.',
      note: {
        mistake: 'Children count each rod as one, so 34 + 25 becomes 3 + 4 + 2 + 5 = 14. Others count the rods one cube at a time and lose the count. When they write the sum, some put the ones first (95 for 59).',
        words: 'Say: "Rods first. Count them by tens: 10, 20, 30, 40, 50. Now the cubes: 4 and 5 is 9." Then: "5 tens and 9 ones. What number is that?" Give the rule in the children\'s words: "Tens with tens, ones with ones."',
        watch: 'Watch who counts a rod as one and who reverses the digits of the sum. Before a child writes, ask how many tens and how many ones there are in all: a child who can say "5 tens and 9 ones, 59" without recounting is ready for adding without blocks.',
      },
    },
  },
};
