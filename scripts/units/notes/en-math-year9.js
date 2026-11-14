'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the planned school year that "Year pages R" made possible (Daily
 * Teaching System, Part 12.2): Stories with three numbers (Grade 1, the last lesson of Story Problems Within 20) and
 * What was there at the start? (Grade 2, in Adding and Subtracting Within 100). Written from the worksheets of the
 * lessons and read by a US teacher-reviewer beside the pages (2026-11-14). What a note says a tool does was read in the
 * tool's code (The Missing Question: three places, "one thing happened", numbers up to twenty).
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that
 * runs past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '1:add-three-addends#stories-with-three-numbers': {
      title: 'Stories with three numbers',
      objective: 'Children solve story problems that add three numbers with a total up to 20, with a drawing and an equation, and look for two numbers that make ten before they add.',
      note: {
        mistake: 'Children add the first two numbers and stop, or they count all three groups by ones and lose count. Few look at all three numbers before they start, so a pair that makes ten goes unused.',
        words: 'Write a story on the board: "There are 4 pencils on the table, 7 in a box, and 6 in a basket. How many pencils are there in all?" Draw three groups of dots and write 4 + 7 + 6. Ask: "Which two numbers make ten?" Circle 4 and 6 and write 10 + 7 = 17. Then point to the groups in another order: "Did the total change?" Any order gives the same total, so we can start with the ten.',
        watch: 'On the page for everyone every story has two numbers that make ten, in a different place each time: the child draws the three groups in the box, writes the three numbers in the frame, and adds. The easier page has totals from 6 to 10 and no ten to find. On the harder page one story has a ten, one has a double (such as 3 + 8 + 3), and one has neither, so the child has to look first. The second page, Add Three Numbers, has twelve problems with no story. On its page for everyone each has a pair that makes ten; on its harder page only half do. A child who adds from left to right and is correct has done nothing wrong: ask, "Is there a faster way?"',
      },
    },
    '2:two-step-word-problems#what-was-there-at-the-start': {
      title: 'What was there at the start?',
      objective: 'Children solve one-step story problems within 100 in which the starting amount is unknown, with a bar model and an equation.',
      note: {
        mistake: 'Children do what the story says: when 17 more are put in, they add 17 to the number they see, and when some are taken out, they subtract. In these stories the words point the wrong way: "takes out 25, now there are 38 left" calls for adding.',
        words: 'Open The Missing Question and choose "one thing happened". Tell a story with no numbers: "There are some pencils in a box. Sam puts in some more. Now there are a lot." Ask, "What could we ask?" until someone asks what was there at the start (ask it yourself if no one does); choose that place as the one to work out and give the other two numbers (the tool goes up to twenty). Then draw the bar model with two-digit numbers: "45 are in the box now. 17 were put in. The question mark is what was there before." Write ? + 17 = 45, then 45 − 17 = 28.',
        watch: 'On the page for everyone all three stories ask for the start. When some were added, the end is the whole (? + 17 = 45). When some were taken away, the start is the whole, so the question mark goes in the long bar and the child adds (? − 25 = 38, so 38 + 25 = 63). On the easier page every number is a multiple of 10 and the first story is worked. On the harder page one story asks for the change, so the child has to read which number is missing. Accept either equation: ? + 17 = 45 or 45 − 17 = 28.',
      },
    },
  },
};
