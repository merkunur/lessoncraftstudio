'use strict';
/**
 * Guest teacher scripts, language en, teaching points of grade 3 (Daily Teaching System, Part 5). One script
 * per teaching point: what to SAY, how to START together, what to do when a child is STUCK; `byType` for one
 * worksheet type. Written from the pictures of the worksheets. Merged by scripts/sub-plans/apply-texts.js.
 */
module.exports = {
  loc: 'en',
  points: {
    '3:rounding': {
      say: '"Rounding means finding the nearest round number. Each number line on this page goes from one hundred to the next. Look at the dot. Is it closer to the hundred on the left or to the hundred on the right? Circle the hundred it is closer to."',
      first: 'Draw the first number line on the board with 800 at one end, 900 at the other, and the dot. Mark the halfway point and ask what number it is: 850. Ask, "Is the dot before the halfway point or after it?" It is before, so it is closer to 800. Circle 800.',
      stuck: 'Have the child put a finger on the dot and count the small steps to each end of the line; the end with fewer steps is closer. Each small step is 10. For your own reference, on the page for everyone the answers are 800, 0, and 500.',
      byType: {
        'G3-391': {
          say: '"Rounding means finding the nearest round number. On this page you round each number two times: first to the nearest ten, then to the nearest hundred. The box at the top shows how: look at the digit to the right of the place you are rounding to. If it is 0, 1, 2, 3, or 4, round down. If it is 5, 6, 7, 8, or 9, round up."',
          first: 'Read the example at the top together: 472 is about 470 to the nearest ten, and about 500 to the nearest hundred. The wavy equal sign means "is about." Do the first number on the board. For the nearest ten, underline the tens digit of 159 and look at the ones digit: it is 9, so round up to 160. For the nearest hundred, underline the hundreds digit and look at the tens digit: it is 5, so round up to 200. Tell the children to start from the number on the page both times.',
          stuck: 'Have the child say the two tens the number is between (150 and 160) and ask which one is closer; then the two hundreds (100 and 200). A 5 always rounds up. For your own reference, on the page for everyone the answers are 160 and 200; 490 and 500; 790 and 800; 310 and 300; 350 and 400; 540 and 500; 570 and 600; 560 and 600.',
        },
      },
    },
    '3:word-fields': {
      say: '"Some words belong together because they are about the same thing. The ten words at the top are all ways to go or ways to look. Write each word in the field where it belongs: the field for go or the field for look."',
      first: 'Read the ten words aloud together. Act out two of them: ask a volunteer to creep across the front of the room, and have everyone squint. Ask, "Is creeping a way to go or a way to look?" Write creep in the field for go. Tell the children to cross out each word at the top once it is written in a field.',
      stuck: 'Read the word to the child and have the child try it in two sentences: "I ___ across the room" and "I ___ at the picture." The sentence that makes sense tells the field. Observe and watch do not fit either sentence; for those two, try "I ___ the birds," which is a way to look. For your own reference, on the page for everyone the words for go are creep, stroll, hurry, and walk; the words for look are squint, gaze, peek, glance, observe, and watch.',
    },
    '3:times-tables': {
      say: '"This is multiplication practice with facts from different times tables. Multiply, and write each product in the box. Do the facts you know by heart first. Then go back and figure out the others."',
      first: 'Do the first two facts on the board. For 6 times 3, ask the children how they know the answer: by heart, by counting by threes six times, or by turning the fact around to 3 times 6. Accept every way that gives the right answer.',
      stuck: 'Have the child turn the fact around if that is easier, count by the smaller number on fingers, or start from a fact the child knows: 5 times 7 is 35, and two more sevens make 49. For your own reference, on the page for everyone the products are 18, 42, 21, 27, 10, 6, 14, 40, 49, 16, 15, and 32.',
    },
    '3:muldiv-word-problems': {
      say: '"These are multiplication word problems. Each story tells about equal groups, and the picture under the story shows them. Read the story, write the multiplication in the work space, and write the answer in the box."',
      first: 'Read the first story aloud together. Ask, "How many rows are there? How many swans are in each row?" Write the multiplication on the board: 3 times 2 equals 6. Count the swans in the picture to check. Have the children write the answer as a sentence on the lines: "There are 6 swans altogether."',
      stuck: 'Ask the child to underline the two numbers in the story and to say what each number counts: the groups, or how many are in each group. The picture shows the groups, and counting them is fine as a check. For your own reference, on the page for everyone the answers are 6 swans and 16 zebras.',
      byType: {
        'G3-372': {
          say: '"These are division word problems about sharing. Each story shares a number of things equally. Deal the things into the boxes, one at a time. Then write how many are in each box."',
          first: 'Read the first story aloud together: 20 persimmons, 5 groups. Show dealing on the board: cross out one fruit and draw a dot in the first box, then one in the second box, and go around all five boxes again and again until the fruit is gone. Count the dots in one box. Write the division in the work space, 20 divided by 5 equals 4, write the answer in the box, and write an answer sentence on the lines.',
          stuck: 'Have the child cross out each fruit as its dot is drawn and give every box one dot before any box gets a second one. A child who knows the multiplication fact may use it: 5 times what makes 20? For your own reference, on the page for everyone the answers are 4 persimmons in each group and 5 papayas in each row.',
        },
        'G3-372+': {
          say: '"These are division word problems about sharing. Read each story. Decide how many things there are and how many equal groups they go into. Write the division, and write the answer in the box. The picture is there if you want to check."',
          first: 'Read the first story aloud together: 5 children share 30 pens. Ask, "How many pens in all? How many children?" Write the division on the board: 30 divided by 5. Ask how the children can find the answer: by knowing that 5 times 6 is 30, or by dealing the pens into the five boxes. Write 6 in the answer box, and write the whole division, with its answer, on the lines. Then say the answer together in a whole sentence: "Each child gets 6 pens."',
          stuck: 'Have the child underline the two numbers in the story and say what each one counts. Then ask for the multiplication fact: "4 times what makes 24?" A child who does not know the fact deals the things into the boxes with dots, one for each box in turn. For your own reference, on the page for everyone the answers are 6 pens, 6 notebooks, and 4 rulers.',
        },
      },
    },
    '3:planets': {
      say: '"This is a science page about the eight planets. They all travel around the Sun, each one at its own distance. Write the name of each planet on its line, starting with the planet closest to the Sun. Use every name in the bank one time."',
      first: 'Read the eight names in the bank aloud together. Ask what the children already know: Which planet do we live on? Which planet is closest to the Sun? Write the first name on the board: Mercury. The children fill in the planets they know first. If the classroom has a science book or a poster of the solar system, the children may use it. After about five minutes, write all eight names on the board in order so that every child can finish. A sentence helps the children remember the order: "My Very Excellent Mother Just Served Us Nachos." Each word starts with the same letter as a planet.',
      stuck: 'Tell the child that Earth is the third planet from the Sun, and give the others two at a time if the child does not know them; nobody is expected to know the order by heart, and writing the names correctly is part of the task. For your own reference, the order is Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
    },
    '3:latin-square-sudoku': {
      say: '"This is a picture sudoku with six animals. Every row, every column, and every box with a thick border needs all six animals, each one exactly one time. Draw the missing animals in the empty cells. A quick sketch is enough."',
      first: 'Hold up the page and show a row, a column, and one of the boxes with a thick border. Find a row or a box together that has only one or two empty cells. Ask, "Which animals are already here? Which ones are missing?" If two are missing, look up and down the column of an empty cell to see which of the two is already there. Fill in one cell together. Tell the children that this puzzle takes time and that it is fine if they do not finish it today.',
      stuck: 'Have the child choose the row, column, or box with the fewest empty cells and go through the six animals in the strip at the bottom one by one, pointing to each one that is already there. To check a finished row or column, the child runs a finger along it: no animal may be there twice.',
    },
    '3:arithmetic-patterns': {
      say: '"Each row of numbers follows a rule: the numbers go up by the same amount every time. Find the rule of the row. Then write the missing numbers."',
      first: 'Write the first row on the board the way it is printed. Find two numbers that stand side by side with no gap between them: 108 and 114. Ask, "How far is it from 108 to 114?" Six. Check the rule with 84 and 96: that is two steps of six. Fill in the missing numbers by adding six each time. Tell the children to find the rule of every row the same way.',
      stuck: 'Have the child find two numbers that stand next to each other with no gap and count up from one to the other. Where there is one empty box between two numbers, the jump is two steps: in the second row, from 48 to 60 is 12, so one step is 6. The child checks by counting on along the whole row. For your own reference, every row on the page for everyone goes up by 6.',
    },
    '3:root-words-in-context': {
      say: '"The four words above each stone are a word family: they are all built from the root word on the stone. Each word fits into one of the four sentences below it. Read each sentence and write the word that fits in the gap. Use every word one time."',
      first: 'Read the four words of the first family aloud together: enjoy, enjoyment, joyful, joyfully. Point to their root word, joy. Do the first sentence together by trying the words in the gap: "The dog jumped enjoy when we came home? The dog jumped joyfully when we came home." Tell the children to cross out each word once they have used it.',
      stuck: 'Read the sentence to the child once with each of the words that are left and ask which one sounds right. The child starts with the sentences they are sure about; the last word goes in the last gap. For your own reference, on the page for everyone the words are, in order, joyfully, enjoy, enjoyment, joyful, then sleeper, sleepy, sleepiness, sleepily.',
    },
    '3:column-regrouping': {
      say: '"These are addition problems with three-digit numbers, written one number under the other. Add one place at a time, starting with the ones. When a place adds up to ten or more, regroup: write the ones digit of that sum and carry the 1 to the next place."',
      first: 'Write the first problem on the board the way it is printed: 261 plus 285. Add the ones: 1 plus 5 is 6. Add the tens: 6 plus 8 is 14, so write 4 under the tens and carry the 1 into the small box above the hundreds. Add the hundreds: 2 plus 2 plus the carried 1 is 5. Read the whole answer aloud: 546. Point out that the small boxes above each problem are for the carried digits.',
      stuck: 'Have the child cover all but one column and say its sum aloud. If the sum is ten or more, ask, "Which digit stays here, and which digit is carried?" The most common slip is to forget the carried 1; the child checks the small box before adding the next column. For your own reference, on the page for everyone the answers are 546, 521, 708, 909, 889, and 703.',
      byType: {
        'G3-359': {
          say: '"These are addition problems, written one number under the other. Add one place at a time, starting with the ones. When a place adds up to ten or more, regroup: write the ones digit of that sum and carry the 1 to the next place."',
          first: 'Write the second problem on the board the way it is printed: 18 plus 55. Add the ones: 8 plus 5 is 13, so write 3 under the ones and carry the 1 into the small box above the tens. Add the tens: 1 plus 5 plus the carried 1 is 7. Read the whole answer aloud: 73. Tell the children that in some problems the tens add up to ten or more; then the answer has three digits.',
          stuck: 'Have the child cover all but one column and say its sum aloud. If the sum is ten or more, ask, "Which digit stays here, and which digit is carried?" The child checks the small box before adding the next column. For your own reference, on the page for everyone the answers are 149, 73, 123, 134, 117, and 54.',
        },
        'G3-360': {
          say: '"These are subtraction problems, written one number under the other. Subtract one place at a time, starting with the ones. When the top digit is too small, regroup: take one ten from the tens place and turn it into ten ones."',
          first: 'Write the first problem on the board the way it is printed: 73 minus 17. Look at the ones: "3 minus 7. Can we do that?" No, so regroup: cross out the 7 tens and write 6, and turn the 3 ones into 13. Now 13 minus 7 is 6, and 6 tens minus 1 ten is 5 tens. Read the whole answer aloud: 56.',
          stuck: 'Have the child ask at the ones place, "Is the top digit big enough?" If not, the child crosses out the tens digit, writes one less above it, and puts a small 1 in front of the ones digit. The most common slip is to subtract the smaller digit from the bigger one no matter which is on top. For your own reference, on the page for everyone the answers are 56, 37, 19, 36, 27, and 48.',
        },
      },
    },
    '3:mult-div-relationship': {
      say: '"Multiplication and division belong together. One array gives a whole family of four facts: two multiplications and two divisions. Use each array to finish all four number sentences next to it."',
      first: 'Draw the first array on the board: 2 rows of 5. Count the rows and count how many are in one row. Finish the two multiplications: 2 times 5 is 10, and 5 times 2 is 10. Then ask, "Ten shapes in 2 equal rows: how many are in each row?" Finish the two divisions: 10 divided by 2 is 5, and 10 divided by 5 is 2. Show that all four facts use the same three numbers.',
      stuck: 'Have the child count the rows, the shapes in one row, and all the shapes, and write these three numbers next to the array. Every number sentence of the family uses only these three numbers. For a division, ask, "How many groups of 5 can you see in the array?" For your own reference, on the page for everyone the four arrays hold 10, 30, 15, and 12 shapes.',
    },
    '3:magic-squares': {
      say: '"In a magic square, every row and every column adds up to the same number: the magic number. On this page the magic number is 15. Fill in the empty cells so that every row and every column adds up to 15."',
      first: 'Draw the first square on the board. Find a row or a column with only one empty cell: the top row has 6 and 1. Ask, "6 and 1 make 7. How many more do we need to get to 15?" Write 8 in the empty cell. Tell the children to look for a row or a column with just one empty cell each time; every number they fill in opens up the next one.',
      stuck: 'Have the child run a finger along a row or a column with one empty cell, add the two numbers that are there, and count up to 15. To check a finished square, the child adds every row and every column. For your own reference, on the page for everyone the rows of the first square are 6, 1, 8, then 7, 5, 3, then 2, 9, 4; the rows of the second square are 6, 7, 2, then 1, 5, 9, then 8, 3, 4.',
    },
    '3:input-output': {
      say: '"Each number machine has a rule, printed at the top. A number goes in on the left, the machine uses its rule, and a new number comes out on the right. Fill in the missing numbers. Watch out: sometimes the number that went in is the one that is missing."',
      first: 'Do the first machine together. Its rule is plus 7. Ask, "14 goes in. What comes out?" Write 21. Then do the row where the box on the left is empty: "Something went in, the machine added 7, and 22 came out. What went in?" Work backward: 22 minus 7 is 15. Check it by putting 15 through the machine.',
      stuck: 'Ask the child, "Is the missing number before the arrow or after it?" After the arrow, the child uses the rule. Before the arrow, the child does the opposite and subtracts, then checks by putting the number through the machine. For your own reference, on the page for everyone the first machine gives 21, 24, 15, and 44; the second gives 37, 14, 36, and 4.',
      byType: {
        'G3-328+': {
          say: '"Each number machine has a rule, printed at the top. A number goes in on the left, the machine uses its rule, and a new number comes out on the right. One machine multiplies, and one subtracts. Fill in the missing numbers. Watch out: sometimes the number that went in is the one that is missing."',
          first: 'Do the first machine together. Its rule is times 5. Ask, "6 goes in. What comes out?" Write 30. Then do the row where the box on the left is empty: "Something went in, the machine multiplied it by 5, and 35 came out. What went in?" Work backward: 35 divided by 5 is 7. Check it by putting 7 through the machine.',
          stuck: 'Ask the child, "Is the missing number before the arrow or after it?" After the arrow, the child uses the rule. Before the arrow, the child does the opposite (divide for times, add for minus) and then checks by putting the number through the machine. For your own reference, on the page for everyone the first machine gives 30, 60, 7, 50, and 2; the second gives 18, 15, 7, 27, and 9.',
        },
      },
    },
    '3:person-words': {
      say: '"Many words for people are made from a verb and an ending. Someone who teaches is a teacher. Look at each person, read the word next to them, and write the word for the person who does it in the empty brick."',
      first: 'Do the first two on the board. Ask, "Someone who runs is a …?" Write runner and point out the double n. Ask, "Someone who takes photographs is a …?" Write photographer. Tell the children that every person word on this page ends in -er.',
      stuck: 'Have the child say the sentence aloud: "Someone who ___ is a ___." For the spelling: a word that ends in e only adds an r, as in dance and dancer; run doubles its last letter. For your own reference, on the page for everyone the words are runner, photographer, dancer, gardener, teacher, baker, farmer, and singer.',
    },
    '3:area-model': {
      say: '"Each rectangle on this page is made of squares. The number of squares is the area of the rectangle. Count the rows, and count how many squares are in one row. Then finish the multiplication to find how many squares there are in all."',
      first: 'Draw the first rectangle on the board: 3 rows of 5 squares. Count the rows, then count the squares in one row. Say, "3 rows of 5: 3 times 5 is 15." Count the squares one by one to check. Say the answer as a sentence: "The area is 15 squares."',
      stuck: 'Have the child run a finger down the left side to count the rows and along the top to count the squares in one row. A child who does not know the fact adds the rows, 5 plus 5 plus 5, or counts every square. For your own reference, on the page for everyone the answers are 15, 16, 20, and 27.',
    },
    '3:water-cycle': {
      say: '"This is a science page about the water cycle: the way water travels from the sea up into the sky and back down again. The diagram has four numbers. Read the four words in the bank, and write each word on the line that has the same number as its place in the diagram."',
      first: 'Follow the arrows in the diagram together, starting at the sea: the Sun warms the water and it rises into the air; high up it cools and forms a cloud; it falls as rain; it runs back to the sea. Read the four words aloud and say each one in plain words: evaporation means water rises into the air, condensation means it turns into the tiny drops of a cloud, precipitation means rain or snow falls, and collection means the water gathers in rivers, lakes, and the sea. Do number 1 together.',
      stuck: 'Point to the number in the diagram and ask, "What is the water doing here: going up, making a cloud, falling, or gathering?" Then read the four words to the child again. For your own reference, on the page for everyone 1 is evaporation, 2 is condensation, 3 is precipitation, and 4 is collection.',
    },
    '3:fraction-unit-build': {
      say: '"Each shape on this page is cut into equal parts, and some of the parts are shaded. Write the fraction that the shaded parts show. The bottom number tells how many equal parts the whole shape has. The top number tells how many of them are shaded."',
      first: 'Draw the first shape on the board: a bar cut into four equal parts, with two of them shaded. Ask, "How many equal parts does the bar have in all?" Write 4 in the bottom box. Ask, "How many parts are shaded?" Write 2 in the top box. Read the fraction aloud: two fourths.',
      stuck: 'Have the child count all the parts first, shaded or not, and write that number at the bottom; then the child counts only the shaded parts for the top. The most common slip is to count only the parts that are not shaded for the bottom number.',
    },
    '3:perimeter': {
      say: '"The perimeter is the distance all the way around a shape, like a walk along its edge. Each rectangle on this page is made of squares. Count the edges of the small squares all the way around the outside of the rectangle. Write the perimeter in the box."',
      first: 'Draw the first rectangle on the board. Mark a starting corner with a dot. Count the edges along the top, down the side, along the bottom, and back up to the dot, making a small mark on each edge as you count it. Write the total in the box. Then show the shortcut: count each of the four sides and add the four numbers.',
      stuck: 'Have the child mark a starting corner and make a small mark on each edge as it is counted, so that no edge is skipped or counted twice. A child who counts the squares inside is finding the area; point to the outside edge. A square in a corner has two outside edges, and both count. For your own reference, on the page for everyone the perimeters are 20, 14, 20, and 22.',
    },
    '3:life-cycles-compare': {
      say: '"This is a science page about two animals that change a great deal as they grow: the butterfly and the frog. Read each sentence. If it is true for the butterfly, put a check under the butterfly. If it is true for the frog, put a check under the frog. If it is true for both, check both."',
      first: 'Ask the children how each animal grows, and write the two chains on the board: egg, caterpillar, chrysalis, butterfly; and egg, tadpole, young frog, frog. Do the first sentence together: "The grown-up catches insects to eat." That is true for the frog only, so only the frog gets a check. Tell the children that some sentences are true for both animals.',
      stuck: 'Read the sentence to the child and ask about each animal separately: "Is that true for the butterfly? Is it true for the frog?" Point to the two chains on the board. For your own reference, on the page for everyone the answers are, from top to bottom: frog, butterfly, both, frog, butterfly, frog, both, butterfly.',
    },
  },
};
