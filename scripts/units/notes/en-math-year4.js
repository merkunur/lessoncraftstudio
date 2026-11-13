'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the designed school year that the "Year pages G and H" made
 * possible (Daily Teaching System, Part 12.2): three further lessons in three units that exist. One entry per lesson,
 * a FURTHER lesson on a point that already has one ("<point>#<name>"). Each was written from the page the lesson hands
 * out, read at the level the lesson names, in American English, and read by one American teacher-reviewer with the
 * pages (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Kindergarten: Counting in Order to 20 ──
    'K:count-how-many#count-and-write-up-to-20': {
      title: 'Count and write how many: up to 20',
      objective: 'Children count 11 to 20 objects arranged in rows of five, touching each one once, and write the number.',
      note: {
        mistake: 'Children skip a picture or count one twice when their finger and their voice get out of step, most often at the start of a new row. Some lose the counting order in the teens (they skip 13 or 15, or say "ten-teen"), so the last number is wrong even when every picture was touched once. When they write, some reverse the digits (41 for 14).',
        words: 'Say: "Touch each one as you count. Go along the row, then start the next row at the left." Ask: "Two full rows are how many? Ten. So you can start at ten: 11, 12, 13." Let children put a cube on each picture and move the cubes into two ten-frames. On the ten-frame tool, switch to two frames: fill one frame for the first two rows (ten) and put the rest on the second frame: "Ten and 3 more is 13."',
        watch: 'Watch the child\'s finger at each new row. Ask "How many?" again when the child has finished: a child who counts all over again does not yet know that the last number said tells how many. Check the written number against the number the child says.',
      },
    },
    // ── Kindergarten: Counting to 10 ──
    'K:compare-groups#match-them-up': {
      title: 'Match them up: more, fewer, or the same',
      objective: 'Children match the pictures in two rows one-to-one and say which row has more, which has fewer, or that both rows have the same number.',
      note: {
        mistake: 'Children pick a row by looking, without pairing: they choose the row with the bigger pictures, or, with loose cubes, the row that is spread out longer. Some draw two lines to one picture or skip a picture, so the wrong number of pictures is left over, or the wrong row seems to have more. Many can say "more" and do not yet use "fewer".',
        words: 'Use cubes of two colors first: "Give every red cube a blue partner. Are any left over? That color has more. The other color has fewer." On the page say: "Draw one line from each picture to a partner. No picture gets two lines. Some pictures may have no partner. The row with pictures left over has more. No picture left over? Both rows have the same number: color the star."',
        watch: 'Watch that no picture has two lines and that only the extra pictures at the end of the longer row have no line. Ask about every task: "Which row has more? Which has fewer?" On the ten-frame, show two groups of up to five: one color in the top row and the other color in the bottom row, so the counters left over stand out. For rows of 6 to 10, use two trains of cubes side by side.',
      },
    },
    // ── Grade 1: Doubles, Three Addends, and Addition Pyramids ──
    '1:fact-families#think-addition-to-subtract': {
      title: 'Think addition to subtract',
      objective: 'Children subtract from numbers 11 to 18 by finding the unknown addend, for example solving 13 − 8 by asking 8 + ? = 13.',
      note: {
        mistake: 'Children count back by ones from 13 and lose track, or they do not see that 13 − 8 and 8 + ? = 13 ask for the same number. Some write one number in the subtraction and another in the addition; a frequent one is adding the two numbers they see in 8 + □ = 13 and writing 21 in the box.',
        words: 'Point to the number bond: "13 is the whole. 8 is one part. What is the other part?" Say: "I don\'t have to count back. I can ask: 8 and how many more make 13?" Count up through ten: "8 and 2 make 10, and 3 more make 13. 2 and 3 make 5." Then read all three: "8 + 5 = 13, so 13 − 8 = 5."',
        watch: 'Watch who counts back and who counts up from the part. Check that the same number is written in all three places on a card. The easier page has wholes to 10: use it for children who still need to learn what the number bond shows. The harder page has no number bond. On the number balance, put 13 on one side and 8 on the other and ask: "What must we add to the 8 side to make it level?" Add 5: 8 + 5 = 13, so 13 − 8 = 5.',
      },
    },
  },
};
