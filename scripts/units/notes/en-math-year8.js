'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the planned school year that "Year pages Q" made possible (Daily
 * Teaching System, Part 12.2): three lessons of the new Grade 1 unit Story Problems Within 20 (find the missing part,
 * what happened in the middle, how many more and how many fewer) and the Grade 2 lesson One-step stories with a bar
 * model. Written from the worksheets of the lessons and read by a US teacher-reviewer beside the pages (2026-11-14).
 * What a note says a tool does was read in the tool's code (the Number Bonds Board goes to 10 without the plan, The
 * Gap chooses its own change, The Planks print the two lengths and never the difference).
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that
 * runs past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '1:word-problems#find-the-missing-part': {
      title: 'Find the missing part',
      objective: 'Children solve put-together stories within 20 in which the total and one part are known: they mark the missing part with a question mark in a bar model and write an equation for the story.',
      note: {
        mistake: 'Children add the two numbers they see (12 in all and 7 in the red box become 19), because nothing is taken away in the story. Others write the total in one of the small parts of the bar.',
        words: 'Open the Number Bonds Board, set the number to 10, tap counters across until the left part holds 6, and put the cloth over the right part: "Two boxes have 10 apples in all. 6 are in the red box. What do we know? What are we looking for?" Draw the bar on the board: "The long bar is all 10. The two short bars are the parts. One part is 6. The other part is our question mark." Write 6 + ? = 10, then take the cloth off.',
        watch: 'On the page for everyone the total is between 11 and 20. The easier page stays within 10 and its first story is worked, so a child sees what goes where; the harder page uses whole tens (70 in all, 30 in the red box). Check the bar first: the total belongs in the long bar. For 12 in all and 7 in one part, the key writes 7 + 5 = 12; 12 − 7 = 5 is just as correct. A child who answers 19 has added: build the 12 with counters and cover the 7.',
      },
    },
    '1:word-problems#what-happened-in-the-middle': {
      title: 'What happened in the middle?',
      objective: 'Children solve stories within 20 in which the start and the end are known and the change is missing (some came or some left): they mark the change with a question mark in a bar model and write an equation for the story.',
      note: {
        mistake: 'Children add the two numbers in the story no matter what happened. In a story where some leave, many write the starting number in a small part of the bar, but in those stories the start is the whole.',
        words: 'Open The Gap and choose "up to sixteen" in its settings. Count the marks on the ground together (say there are 8), tap "Show the gap," and count again (say 13). Write both numbers: "Did some come or did some leave? How many?" Take a child\'s number and try it. Then draw the bar: "More came, so 13 is all of them. 8 were there at the start. The question mark is what came." Write 8 + ? = 13. When some left, the first count is all of them.',
        watch: 'The page for everyone has one story in which some more come and two in which some leave, with a larger number from 11 to 20. The easier page stays within 10 and its first story is worked; the harder page uses whole tens. Ask "Which number is all of them?" before the child writes: in 8 + ? = 13 it is the end, in 12 − ? = 7 it is the start. Either true equation counts (13 − 8 = 5 for 8 + ? = 13).',
      },
    },
    '1:word-problems#how-many-more-how-many-fewer': {
      title: 'How many more? How many fewer?',
      objective: 'Children compare two amounts within 20 in a story, shown as two lined-up rows of pictures, and find how many more or how many fewer.',
      note: {
        mistake: 'Children hear "more" and add the two amounts (12 and 7 become 19), or they answer with the larger amount. "How many fewer" is harder than "how many more", although it is the same difference.',
        words: 'Open The Planks and drag the two planks to 12 and 7 before you say anything: "Mia has 12 stickers. Ben has 7. Where do you see how many more?" Let the class say how long the piece under the bracket is, then move it to the end of the short plank: "Mia has 5 more than Ben. Ben has 5 fewer than Mia. Ben needs 5 more to have as many as Mia." Say all three sentences for every pair.',
        watch: 'The page shows the two amounts as two rows of pictures that start at the same line. Have the child circle the pictures that stick out before writing the number in the box; the dotted space is for a drawing or an equation. On the page for everyone the larger amount is 11 to 14 in both stories; the easier page stays within 10; the harder page has three stories. A child who writes 19 has added: cover what both rows have and ask what is left. Children can also practice story problems on screen.',
      },
    },
    '2:two-step-word-problems#one-step-stories-with-a-bar-model': {
      title: 'One-step stories with a bar model',
      objective: 'Children solve one-step story problems within 100 in which the end, the change, or a part is missing, with a bar model and an equation, and write the question for a story that has none.',
      note: {
        mistake: 'With two-digit numbers children stop reading and just compute: they add the two numbers in every story. When more are added and the story asks for the change (34 + ? = 52), they write 34 + 52.',
        words: 'Open The Missing Question and tell a story with no numbers, for example: "There are some pencils in a box. Sam puts in some more." Ask: "What could we ask?" Collect their questions, then tell the numbers one at a time. Draw the bar: "Which number is all of them? Which part do we know? Where is the question mark?" Write 34 + ? = 52 first, then the equation you solve, 52 − 34 = 18.',
        watch: 'On the bar-model page one story asks for the end and two ask for the change; its easier page asks for the end in all three stories and the first is worked; its harder page asks for the change or for a missing part. The second page, Question, Equation, Answer, has three more stories and no bar. On the page for everyone one question is missing and the child writes it: accept any question that needs both numbers ("How many are still on the table?"). One story there compares two boxes. Either true equation counts.',
      },
    },
  },
};
