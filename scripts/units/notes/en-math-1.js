'use strict';
/**
 * Teacher notes, English, Grade 1 math (Daily Teaching System, Part 4.2). Written from what each lesson's worksheets
 * PRINT (scripts/units/dump-points.js), in American English. The eight points of the pilot unit "Addition and
 * Subtraction Within 10" were written straight into frontend/content/units/points/en.json and are not repeated here.
 */
module.exports = {
  loc: 'en',
  points: {
    '1:doubles-halves': {
      title: 'Doubles and halves',
      objective: 'Children double a group of pictures and split an even group into two equal halves, writing the numbers.',
      note: {
        mistake: 'Children think doubling means adding 2, so the double of 6 becomes 8. For half, they take some away and do not check that the two parts are the same; half of 10 becomes 4 and 6.',
        words: 'Say: "Double means the same again. Six and six more." Use two hands: "Show me 4 on each hand." For half: "Half means two EQUAL parts. One for you, one for me, until they are gone. Are the two parts the same?"',
        watch: 'Watch who knows the doubles to 5 + 5 without counting and who still counts every picture; the page goes on to 7 + 7. Children who count should build each double on two hands or in two rows of a ten frame and say it: "4 and 4 is 8." On the halves page, look at the two parts a child writes: they must match.',
      },
    },
    '1:odd-even-pairs': {
      title: 'Odd and even numbers',
      objective: 'Children count a group in pairs or share it between two friends, and say whether the number is odd or even.',
      note: {
        mistake: 'Children decide by how the number looks ("11 is even because it has two ones") and skip the pairing. When sharing, they forget to write the one that is left, or they give it to one of the friends.',
        words: 'Ask: "Can two friends share them fairly? Is one left over?" Say: "Even numbers share fairly. Odd numbers leave one over." Tie it to the doubles: "8 is 4 and 4. Every even number is a double." Have children count by twos as they circle: "2, 4, 6… and one more makes 7."',
        watch: 'Notice who begins to see the rule in the ones place: numbers that end in 0, 2, 4, 6, or 8 are even. Let children find that rule from their own pages before you say it.',
      },
    },
    '1:add-three-addends': {
      title: 'Add three groups',
      objective: 'Children add three groups of pictures and write the total, adding an easy pair first.',
      note: {
        mistake: 'Children add the first two groups, write that number, and forget the third. Or they count every picture from 1 and never use a fact they know, such as a double or a pair that makes 10.',
        words: 'Say: "Three groups. Add two of them first, then add the third." Ask: "Which two are easy to add first? Do you see a double? Do you see a ten?" Show that you may choose the pair: "4 + 3 + 6. I add 4 and 6 first. That is 10. And 3 more is 13."',
        watch: 'Watch who looks for an easy pair before adding. Ask a child to tell you which two numbers were added first and why; the reason matters more than the speed.',
      },
    },
    '1:number-walls': {
      title: 'Number walls (addition pyramids)',
      objective: 'Children fill a number wall in which each brick is the sum of the two bricks under it, and find a missing bottom brick.',
      note: {
        mistake: 'Children add two bricks that sit side by side and write the sum next to them, not above them. When a bottom brick is missing, they add the two numbers they can see and do not ask what is missing.',
        words: 'Some books call this a number pyramid. Point with two fingers under one brick: "This brick sits on these two. It is their sum." For a missing brick: "7 sits on 4 and what? Four and how many make seven?" Say "sum" for the brick on top.',
        watch: 'Look at the walls with a missing bottom brick. A child who writes 11 beside a 4 under a 7 has added again. Ask: "Can a brick below be bigger than the brick on top of it?"',
      },
    },
    '1:tens-and-ones': {
      title: 'Tens and ones',
      objective: 'Children read a two-digit number shown with base-ten blocks (tens rods and ones cubes), and choose the blocks that show a number.',
      note: {
        mistake: 'Children count every rod as 1, so 3 rods and 4 cubes make 7. Or they write the digits in the order they counted them: 4 cubes and then 3 rods becomes 43.',
        words: 'Count the rods by tens and the cubes by ones: "10, 20, 30… 31, 32, 33, 34." Say: "3 tens and 4 ones is thirty-four." Ask: "What does the 3 in 34 mean?" (Three tens, or thirty; not three.)',
        watch: 'Watch the switch from counting by tens to counting by ones; that is where children slip. Have a child who slips touch the last rod, say "thirty," pause, and then touch the cubes: "thirty-one, thirty-two." Check numbers like 40: a child who writes 4 for four rods has left out the zero that holds the ones place.',
      },
    },
    '1:number-words': {
      title: 'Number words',
      objective: 'Children read numbers and match them to their words, to twenty and for the tens to one hundred.',
      note: {
        mistake: 'Children mix up the teen words and the tens words: thirteen and thirty, fifteen and fifty. Eleven, twelve, and eight are guessed from the first letter.',
        words: 'Say the endings clearly: "thir-TEEN is a ten and three. thir-TY is three tens." Ask: "Does it end in -teen or in -ty?" Have children underline the ending before they circle. Spell the hard ones together: eight, eleven, twelve, forty.',
        watch: 'Listen while a child reads the choices aloud. A child who reads "fifty" for fifteen is looking only at the start of the word; cover the start with a finger and read the ending first. On the tens page, check 40 and 50: "forty" and "fifty" do not look like "four" and "five."',
      },
    },
    '1:compare-order-two-digit': {
      title: 'Compare and order two-digit numbers',
      objective: 'Children compare two two-digit numbers with the signs for greater than and less than, and put three numbers in order.',
      note: {
        mistake: 'Children compare the ones digits ("29 is more than 41 because 9 is more than 1") or add the digits. The signs are mixed up too: children know which number is greater and still circle the wrong sign.',
        words: 'Say: "Look at the tens first. More tens means a greater number. Only if the tens are the same, look at the ones." Read the sign as words: "41 is greater than 29." The open side of the sign faces the greater number.',
        watch: 'Keep two questions apart: does the child know which number is greater, and does the child know the sign? Have the child say the whole sentence aloud before circling.',
      },
    },
    '1:number-of-the-day': {
      title: 'Number of the day',
      objective: 'Children show one number in many ways: as tens and ones, on ten frames, with tally marks, with its number word, and by writing 10 more and 10 less.',
      note: {
        mistake: 'Children fill each box as a separate task and do not notice when two boxes disagree: 15 in tens and ones, but 14 tally marks. A teen number is written as 1 and 5 with no idea that the 1 is a ten.',
        words: 'Ask after the page: "Do all your boxes show the same number? Prove it." Say: "Fifteen is one ten and five ones. Show me the ten in your ten frames: one full frame. Show me the ten in your tally: two bundles of five."',
        watch: 'Use the page as a quick look at what each child can do: which box is left empty or done last? That box tells you what to teach that child next.',
      },
    },
    '1:ordinal-numbers': {
      title: 'Ordinal numbers to tenth',
      objective: 'Children write the ordinal numbers 1st to 10th in order and match ordinal words such as third and fifth to a place in a line.',
      note: {
        mistake: 'Children write 1th, 2th, 3th, or the plain number with no ending. They read "fifth" as "five" and "eighth" as "eight," and find the place by counting pictures, not by reading the word.',
        words: 'Teach the endings for the first ten places: "1st, 2nd, 3rd. From 4th to 10th they all end in th." Read the words aloud together: "first, second, third, fourth, fifth." Ask every time: "Where is the flag? That is where we start."',
        watch: 'Check the endings on 1st, 2nd, and 3rd, and whether a child starts from the flag. Reading the ordinal words is a reading task; read them with the children who cannot yet.',
      },
    },
    '1:number-line-placement': {
      title: 'Find a number on the number line',
      objective: 'Children read the number an arrow points to on a number line to 20 and to 30, counting on from the nearest printed number.',
      note: {
        mistake: 'Children count the tick marks beginning with 1 at zero, so every answer is one too big. When only some numbers are printed, they count from 0 for every arrow and lose count on the way.',
        words: 'Say: "Zero is the start, not number one. Count the JUMPS, not the marks." When few numbers are printed: "Which printed number is closest to the arrow? Start there. You can count back, too."',
        watch: 'Watch where a child starts for an arrow at 18. Counting back two from 20 shows a child who uses the line; counting up from 0 works but is slow. An answer that is off by exactly one means the child counted marks, not jumps: draw the jumps as hops above the line and count the hops.',
      },
    },
    '1:hundreds-chart': {
      title: 'The hundreds chart',
      objective: 'Children fill in missing numbers on a hundreds chart and use its pattern: one more to the right, ten more below.',
      note: {
        mistake: 'Children fill a gap by counting from the start of the row, or from 1. On a puzzle piece they write the next counting number in the box below (35 under 34), because they do not see that going down a row adds ten.',
        words: 'Run a finger down a column and read: "4, 14, 24, 34. What stays the same? What changes?" Say: "Right is one more. Down is ten more. Left is one less. Up is ten less."',
        watch: 'Look at the boxes below and above the printed number on a piece. A child who gets left and right and misses up and down needs the whole chart beside the page for a few more days.',
      },
    },
    '1:one-ten-more-less': {
      title: '1 more, 1 less, 10 more, 10 less',
      objective: 'Children write the number that is 1 more and 1 less, and the number that is 10 more and 10 less, than a two-digit number.',
      note: {
        mistake: 'For 10 more, children count on ten ones with their fingers and are often off by one. For 10 less they change the wrong digit. One more than 29 is written 210, because the child says "twenty-ten."',
        words: 'Ask: "Ten more than 34. Which digit changes? Which digit stays?" Say: "Ten more is one more TEN. The ones stay the same." Check on the hundreds chart only after you have written your answer.',
        watch: 'Watch who still counts by ones to find ten more. Check the numbers that cross a ten, such as 1 more than 39 and 1 less than 40; say those numbers aloud together before writing.',
      },
    },
    '1:skip-counting': {
      title: 'Count by tens, fives, and twos',
      objective: 'Children skip count by 10, by 5, and by 2, and write the missing numbers in each counting row.',
      note: {
        mistake: 'Children say the skip-counting chant correctly and then write the next counting number in the gap (10, 20, 21). Counting by twos, they slip onto the odd numbers after one mistake and do not notice.',
        words: 'Count aloud as a class and stop on a number: "…30, 40. What comes next? How much more is it?" Ask about the pattern: "Counting by fives, what do the numbers end in?" (5 and 0.) "Counting by tens?" (Always 0.) "Counting by twos?" (0, 2, 4, 6, or 8: the even numbers.)',
        watch: 'Notice who checks a row by its pattern ("this cannot be right, it ends in 3"). Start some rows in the middle, at 40 or at 15; a child who can only begin at the start has learned a song, not a count. Three pages are a lot for one day: do tens and fives first, and twos the next day.',
      },
    },
    '1:time-read': {
      title: 'Tell time to the hour and half hour',
      objective: 'Children read a clock to the hour and to the half hour and choose the matching time.',
      note: {
        mistake: 'Children mix up the two hands and read 6:00 as 12:30. At half past, the hour hand sits between two numbers and children name the one ahead, so half past 2 is read as 3:30.',
        words: 'Say: "The short hand tells the hour. Read it first." At half past: "The short hand is on its way from 2 to 3. It has not reached 3, so the hour is still 2." Say it both ways: "half past two" and "two thirty."',
        watch: 'Ask where the hour hand points at half past and listen for "between." A child who expects it on the 3 at 2:30 should move the hands of a real clock from 2:00 to 3:00 and watch the short hand travel.',
      },
    },
    '1:time-set-hands': {
      title: 'Draw the clock hands',
      objective: 'Children read a time to the hour or the half hour and draw the hour hand and the minute hand on a clock.',
      note: {
        mistake: 'Children draw both hands the same length, so nobody can read the clock. For half past they put the hour hand exactly on the number and not halfway to the next one.',
        words: 'Say: "When we READ a clock, we start with the short hand. When we DRAW one, the long hand is easier to place, so draw it first: to the 12 for o\'clock, to the 6 for half past. Then the hour hand: SHORT." For 4:30: "The short hand goes halfway between the 4 and the 5."',
        watch: 'Look at the lengths of the two hands and at where the short hand sits at half past. Drawing shows what reading hides: a child can pick 4:30 from a list and still not know where the hour hand belongs.',
      },
    },
    '1:days-months-seasons': {
      title: 'Yesterday, today, tomorrow, and the months',
      objective: 'Children write the day that was yesterday and the day that will be tomorrow, and put the twelve months in order.',
      note: {
        mistake: 'Children mix up yesterday and tomorrow, and they are stuck when today is Saturday or Sunday because the week seems to end there. With the months, the order falls apart after the first few.',
        words: 'Say: "Yesterday is the day before today. Tomorrow is the day after." Show that the week goes around: "After Saturday comes Sunday again." Say the months in four groups of three, and ask: "Which month is your birthday in? Which month comes before it?"',
        watch: 'Check the items where today sits at the edge of the week: after Saturday comes Sunday, and the week starts over. For the months, notice who has to start from January each time; say the months with the calendar until the order holds from any month.',
      },
    },
    '1:coins': {
      title: 'Count coins',
      objective: 'Children name a penny, a nickel, a dime, and a quarter, say what each is worth, and count the coins in a purse, starting with purses that hold one kind of coin.',
      note: {
        mistake: 'Children count the coins, not the cents: three dimes are "3." They think the nickel is worth more than the dime because it is bigger. With two kinds of coins they count everything by ones.',
        words: 'Hold up each coin: "A dime is small and worth 10 cents. A nickel is bigger and worth only 5." Count with the value: "10, 20, 30 cents." With two kinds: "Start with the coins that are worth the most. 10, 20… 25, 30." With a quarter: "Say 25 first, then count on: 25, 35, 45."',
        watch: 'Watch the switch from counting by tens to counting by fives or ones inside one purse. Children who lose the count there should stay on the first-steps page. Use real or plastic coins first; the coins on a page are hard to tell apart for children who have not handled money.',
      },
    },
    '1:shape-attributes': {
      title: 'What makes a shape that shape?',
      objective: 'Children decide by its sides and corners whether a shape really is a triangle, a rectangle, or a square, and write the names of shapes.',
      note: {
        mistake: 'Children accept a shape with a curved side or an open corner as a triangle because it "looks like one," and reject a real triangle that is long, thin, or turned. Color and size are taken as part of what a shape is.',
        words: 'Ask: "What MUST a triangle have?" (Three straight sides, three corners, and it is closed.) "Does it matter if it is big, red, or turned?" (No.) Have children give the reason: "It is not a triangle because this side is curved."',
        watch: 'Listen for reasons that name sides and corners. A child who says "it is too pointy" or "it is upside down" is still going by looks. A square is also a rectangle; accept that answer and say why.',
      },
    },
    '1:tangram-compose': {
      title: 'Tangram puzzles',
      objective: 'Children build a figure with the seven tangram pieces and find the piece that is missing from a figure.',
      note: {
        mistake: 'Children place the big pieces last and have no room left, or they leave a piece over and call the figure finished. For the missing piece they pick one with the right shape and the wrong size.',
        words: 'Say: "Start with the two big triangles. Where could they go?" Ask: "Did you use all seven? Is anything sticking out?" For the missing piece: "Right shape AND right size. Turn it in your head."',
        watch: 'These shadow puzzles have no lines inside and are hard: let children work in pairs, and give a child who is stuck one piece placed for them, not the whole answer. Each child or pair needs a tangram set; if you have none, print and cut the page "Tangram Puzzles: Cut Out the Pieces and Build Two Figures" from the Kindergarten unit on shapes.',
      },
    },
    '1:measure-length-units': {
      title: 'Measure with unit squares',
      objective: 'Children measure the length of an object by counting the unit squares under it, and put three objects in order from shortest to longest.',
      note: {
        mistake: 'Children count every square in the row, also the ones the object does not reach, or they count the lines and not the squares. When ordering, they go by where an object ends on the page and not by how long it is.',
        words: 'Say: "Count only the squares under the object, from its start to its end." Say the unit every time: "The pencil is 6 squares long." Ask: "Which is longer? How many squares longer?"',
        watch: 'Listen for an answer with no unit ("6") and ask "six what?" Check an object that does not start at the edge of the row; that is where children count too many.',
      },
    },
    '1:sort-three-groups': {
      title: 'Sort into three groups',
      objective: 'Children decide where each picture belongs and sort a set of pictures into three groups.',
      note: {
        mistake: 'Children sort by something of their own (color, or what they like) and not by the three groups on the page. A picture that could go two ways stops them, or gets two lines.',
        words: 'Read the three bins first: "What goes in this one? What is the rule?" Ask for the reason with each line: "Why does the apple go there?" Afterward: "Which bin has the most? Which has the fewest?"',
        watch: 'Listen to the reasons more than you check the lines. A child who can say the rule for a bin is classifying; a child who matches by looks alone will be lost when the pictures change.',
      },
    },
    '1:picture-graphs-sort-count': {
      title: 'Sort, count, and read a picture graph',
      objective: 'Children count each kind in a mixed set, write the totals in a table, and read how many a picture graph shows in each row.',
      note: {
        mistake: 'Children write a total in the wrong row of the table because they do not check the picture at the start of the row. The pages ask only for totals; when you add the question "how many more," children give the bigger number and not the difference.',
        words: 'Say: "Each picture in the graph stands for one thing." Ask three kinds of questions: "How many apples? Which has the most? How many MORE apples than pears?" For "how many more," line up the two rows and count the extra ones.',
        watch: 'Ask every child one "how many more" question; it is the hard one. See who compares two rows by matching them and who just reads off the larger number.',
      },
    },
    '1:bar-graphs': {
      title: 'Read and make a bar graph',
      objective: 'Children read the number each bar shows and color a bar graph, one box for each one counted.',
      note: {
        mistake: 'Children count the boxes in a bar and skip the bottom box, or count the line at the top as one more, so the number is off by one. They do not follow the top of the bar across to the number on the side.',
        words: 'Say: "Put your finger on the top of the bar. Slide it across to the numbers. What number is it on?" When coloring: "Start at the bottom. One box for each one. Stop at the number."',
        watch: 'See who uses the numbers on the side and who counts boxes one by one; both work, but the numbers on the side are the new idea. Check that colored bars start at the bottom and have no gaps.',
      },
    },
    '1:patterns-missing': {
      title: 'Two are missing',
      objective: 'Children find the part that repeats in a pattern and fill in two missing pictures.',
      note: {
        mistake: 'Children fill both empty boxes with the same picture, or look only at the picture right before each gap. A gap in the middle of the row is harder than one at the end.',
        words: 'Read the row aloud and clap at each empty box: "star, moon, star, (clap), star, moon." Ask: "What is the part that repeats? Say it. Now what belongs in the gap?" Check by reading the finished row aloud.',
        watch: 'Notice who reads the whole row again after filling the gaps. That check catches most mistakes; teach it as the last step of every pattern.',
      },
    },
  },
};
