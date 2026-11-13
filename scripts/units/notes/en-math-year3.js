'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the designed school year that the "Year pages E and F" made
 * possible (Daily Teaching System, Part 12.2): nine further lessons in five units that exist. One entry per lesson, a
 * FURTHER lesson on a point that already has one ("<point>#<name>"). Each was written from the page the lesson hands
 * out, read at the level the lesson names, in American English, and read by one American teacher-reviewer with the
 * pages (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Kindergarten: Number Bonds and Partners of 10 ──
    'K:number-bonds-k#take-apart-6-and-7': {
      title: 'Take apart 6 and 7',
      objective: 'Children break a train of 6 or 7 cubes into two parts in different ways, color each way on a strip of squares, and write it as two numbers that make 6 or 7, such as 4 + 2 = 6.',
      note: {
        mistake: 'Many children find one way and then color the same way again on the next strip. Some count 4 + 2 and 2 + 4 as the same and stop early; on this page they are two different strips. A few leave one color out and write 6 + 0, which the page does not ask for.',
        words: 'Give each child a train of six cubes. Say: "Break it into two parts. How many here? How many there?" Then: "Put it back. Can you break it in a different place?" On the page say: "Color the part in one hand red and the part in the other hand blue. Write the red number, then the blue number."',
        watch: 'Watch who works in order (1 and 5, 2 and 4, 3 and 3) and who jumps around: both are fine, but the child who works in order can tell you when no way is left. Check that the two numbers match the squares the child colored. The easier page gives the two numbers to color; the harder page has strips of 7, so give it to every child once the ways to make 6 are found.',
      },
    },
    // ── Kindergarten: Teen Numbers and Counting to 100 ──
    'K:teen-numbers#build-and-draw-a-teen-number': {
      title: 'Build and draw a teen number',
      objective: 'Children read a written number from 11 to 20, build it with ten cubes on a stick and loose cubes, and draw it on two ten-frames with the first frame full.',
      note: {
        mistake: 'Children spread the dots over both frames and leave gaps in the first one, so the ten cannot be seen. Some read 15 as "fifty" and fill both frames. For 20 some stop at ten because the first frame is full.',
        words: 'Say: "Read the number. Build it: one stick of ten and some more." Then: "Draw the ten first. Fill the first frame, every box." Ask: "How many more do you need? Draw them in the second frame, starting at the top left."',
        watch: 'Watch whether the child fills the first frame without counting to the number each time. Ask one child at a time: "How do you know this is 14 without counting every dot?" The answer you hope for names the full frame as ten.',
      },
    },
    'K:teen-numbers#ten-and-how-many-more': {
      title: 'Ten and how many more?',
      objective: 'Children take 11 to 19 cubes apart into a stick of ten and the rest, and write the missing part in a number bond that has the teen number as the whole and 10 as one part.',
      note: {
        mistake: 'Children add the two numbers they see (17 and 10) and write 27 in the empty circle. Others write the whole number again. In a number such as 17 many do not yet see that the 1 stands for the ten.',
        words: 'Point to the top circle: "This is all of them, 17." Point to the 10: "This part is the stick of ten." Ask: "How many are not on the stick?" Let children check with cubes: snap ten together, count the rest, and say: "17 is ten and seven more."',
        watch: 'Watch who needs the cubes for every bond and who answers from the number itself (the 7 in 17). On level 3 the ten or the whole can be the empty circle: see whether the child still knows which circle is the whole.',
      },
    },
    '1:hundreds-chart#count-to-50': {
      title: 'Count to 50',
      objective: 'Children count aloud to 50 by ones, touch each box of a number chart from 1 to 50, and write the numbers that are missing.',
      note: {
        mistake: 'The hard places are the turns to a new ten: after 29 many children say "twenty-ten" or jump to 40. When they write, some reverse the digits (12 for 21), most often in the teens, where the ones are said first ("seventeen" written as 71).',
        words: 'Count together and touch each box. Stop before an empty box: "What did we just say? What comes next?" At the end of a row say: "The row is full. A new ten starts." Show that every number in a column ends with the same digit.',
        watch: 'Listen to each child count from 25 to 42 alone: this is where the count breaks. On the page, look first at the empty boxes at the start or the end of a row (such as 21), and at whether the child uses the box above to find the number.',
      },
    },
    'K:count-forward-missing#start-at-any-number': {
      title: 'Start at any number and count on',
      objective: 'Children start at a number that is not 1, count on aloud without going back to 1, and write the missing numbers on a number strip.',
      note: {
        mistake: 'Many children can only find what comes after 36 by counting from 1, or from 30. At a turn to a new ten (39, 40) they stop or say the wrong ten. Some write the same number as the box before.',
        words: 'Say a start number and count on together for five numbers: "36. Keep going: 37, 38, 39, 40." Ask: "Do you need to go back to 1? No. Say the number in the box, then the next one." When the tens change, say: "After 39 comes a new ten: 40."',
        watch: 'Watch who whispers from 1 before writing. Check the strips that cross into a new ten first: a child who cannot write the new ten (39, then 40) needs the number chart beside the page for a few more days.',
      },
    },
    // ── Grade 1: Tens and Ones ──
    '1:tens-and-ones#teen-numbers-one-ten-and-some-ones': {
      title: 'Teen numbers: one ten and some ones',
      objective: 'Children build the numbers 11 to 19 with one ten-rod and loose cubes and write them as one ten and some ones.',
      note: {
        mistake: 'Children count the ten-rod as one more cube and write 6 for a rod and five cubes. Others count every unit of the rod one by one. When they write, some put the ones first (51 for 15).',
        words: 'Hold up a rod: "This is one ten. Ten cubes are stuck together, so I do not count them again." Say: "One ten and five ones is fifteen." Have children say it for each picture, then write how many ones and the number.',
        watch: 'Watch whether the child counts on from ten (10, 11, 12 …) or starts at 1 on the rod. Look at the written numbers for reversed digits, and ask: "Which digit tells you about the rod?"',
      },
    },
    '1:tens-and-ones#count-the-tens': {
      title: 'Count the tens: 10 to 90',
      objective: 'Children count 1 to 9 ten-rods, say how many tens there are with no ones left over, and write the number from 10 to 90.',
      note: {
        mistake: 'Children write the number of rods as the number (4 for four rods) and leave the zero out. Some count by ones along the rods and lose their place. The names "thirty" and "fifty" do not sound like three tens and five tens.',
        words: 'Count the rods two ways: "1, 2, 3, 4 tens" and "10, 20, 30, 40." Say: "Four tens and no ones is forty. The 0 says: no ones." Link the names: "Six tens: sixty. Three tens: thirty. Five tens: fifty."',
        watch: 'Watch whether the child counts by tens or by ones. Check the two boxes of each row: the first holds how many tens, the second the number. A child who writes 4 and 4 has not yet linked the rods to the number.',
      },
    },
    // ── Grade 1: Adding Within 100 ──
    '1:mental-math-to-100#subtract-tens-from-tens': {
      title: 'Subtract tens from tens',
      objective: 'Children subtract multiples of 10 from multiples of 10 in the range 10 to 90 (70 − 30) by crossing out ten-rods, and explain why 7 tens take away 3 tens leaves 4 tens.',
      note: {
        mistake: 'Children cross out the right number of rods and then write how many rods are left (4) in place of the number (40). Others count back by ones from 70 and lose count. Some count the crossed-out rods again when they count what is left.',
        words: 'Say the problem in tens: "70 is 7 tens. Take away 3 tens. Cross out three rods. How many tens are left? Four tens is forty." Then link it to a fact they know: "7 − 3 = 4, so 7 tens − 3 tens = 4 tens." Show it in the Number Hotel too: from 70 the elevator goes down three floors, 60, 50, 40.',
        watch: 'Watch who uses 7 − 3 and who counts each rod that is left by tens. Check the answers for a missing zero. Ask a child who is done early to solve 60 − 20 with no picture and to tell you how.',
      },
    },
    // ── Grade 2: Adding and Subtracting Within 1,000 ──
    '2:column-method#subtract-three-digit-numbers': {
      title: 'Subtract three-digit numbers with regrouping',
      objective: 'Children subtract within 1,000 in columns when a ten or a hundred must be regrouped (432 − 151), and check each answer by adding.',
      note: {
        mistake: 'The common error is to subtract the smaller digit from the larger one in every column (432 − 151 = 321). Children who do regroup often forget to write one fewer ten or one fewer hundred, or regroup a ten when there are already enough ones.',
        words: 'Start at the ones each time and ask: "Enough ones? If not, regroup: trade one ten for ten ones. One ten fewer, ten more ones." Then the tens: "Enough tens? If not, trade one hundred for ten tens." Have children cross out the digit and write the new one above it.',
        watch: 'Watch the first step of each problem: does the child ask "enough ones?" or just subtract? Have every child check two answers by adding the answer and the number taken away. Level 1 takes away a two-digit number: use it for children who are not yet sure of the columns. On level 3 children regroup twice in the same problem, a ten and a hundred.',
      },
    },
  },
};
