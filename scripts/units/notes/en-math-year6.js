'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the designed school year that the "Year pages K" made possible
 * (Daily Teaching System, Part 12.2): two further lessons in two units that exist. One entry per lesson, a FURTHER
 * lesson on a point that already has one ("<point>#<name>"). Each was written from the page the lesson hands out, read
 * at the level the lesson names, in American English, and read by one American teacher-reviewer with the pages
 * (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Grade 2: Adding and Subtracting Within 100 ──
    '1:mental-math-to-100#add-tens-and-ones': {
      title: 'Add tens and ones, then put them together',
      objective: 'Children add two two-digit numbers within 100 when the ones make a new ten (47 + 38) by adding the tens, adding the ones, and adding the two partial sums (70 + 15).',
      note: {
        mistake: 'When the ones add up to more than nine, children write the two sums side by side, so 47 + 38 becomes 715, or they drop the new ten and answer 75. Some add the tens as if they were ones and write 4 + 3 = 7 instead of 40 + 30 = 70.',
        words: 'Build 47 in the Place Value Lab and add 38: first 3 tens, then 8 ones. Say: "4 tens and 3 tens are 7 tens: 70. 7 ones and 8 ones are 15 ones. 70 and 15 make 85." Ask: "What is 15? One ten and five ones. Where does that ten go?" Let children draw sticks and dots for one problem on scrap paper and circle ten dots to make a new stick.',
        watch: 'Check the first box of each problem: for 40 + 30, did the child write 70 and not 7? The easier page has problems with no new ten, such as 34 + 25. On the harder page children write the tens and ones themselves; the first problem shows how. Check there that the first line says 40 + 30 and not 4 + 3. Not every problem on the harder page makes a new ten; ask children to say which ones will before they add. Have children test an answer against an estimate: 47 + 38 is close to 50 + 40.',
      },
    },
    // ── Grade 3: Division ──
    '3:times-tables#break-a-hard-fact': {
      title: 'Break a hard fact into two easy ones',
      objective: 'Children split an array for a fact with 7, 8, or 9 into two arrays they know and add the two products, such as 7 × 8 = 5 × 8 + 2 × 8 = 40 + 16.',
      note: {
        mistake: 'Children cut the array into two parts they do not know either, such as 7 × 8 into 4 × 8 and 3 × 8, and then skip-count both parts. Others write both products correctly and forget to add them. Some cut between columns, so the two parts no longer fit the number sentence under the array.',
        words: 'On the Baking Tray, set 7 rows of 8 buns and break the tray after the fifth row. Say: "5 rows of 8 is 40. 2 rows of 8 is 16. 7 × 8 is 40 + 16, so 56." Ask: "Where will you draw your line so that you know both parts?" Push the pieces back together and ask: "Did the number of buns change?"',
        watch: 'Look at where each child draws the line: a cut after 5 rows gives a 5s fact and a small part of 2, 3, or 4 rows. A child who does not know the small part yet can build it from the 2s: 2 × 8 is 16, so 4 × 8 is double, 32, and 3 × 8 is 16 and 8 more, 24. The easier page has the line and the two smaller facts printed. On the harder page children cut the same array in two different ways and see that the total stays the same.',
      },
    },
  },
};
