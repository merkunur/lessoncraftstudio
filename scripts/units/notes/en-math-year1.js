'use strict';
/**
 * Teacher notes, English, mathematics: the first lessons of the designed school year (Daily Teaching System,
 * Part 12.2). One entry per lesson: a new teaching point, or a FURTHER lesson on a point that already has one
 * ("<point>#<name>"). Each was written from the page the lesson hands out, read as it is published (the level the
 * lesson names), in American English.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Kindergarten ──
    'K:conservation': {
      title: 'Still the same number',
      objective: 'Children count two groups of the same kind of object, one in a row and one spread out, write how many are in each, and decide whether both groups have the same number.',
      note: {
        mistake: 'Children say that the spread-out group has more because it takes up more room, and some change their answer when the same objects are pushed together. In the scattered group many skip an object or count one twice.',
        words: 'Move the counters while the children watch. Ask: "Did I add any? Did I take any away? So how many are there now?" Say: "Moving them does not change how many." For the scattered group say: "Mark each one as you count it."',
        watch: 'Watch who has to count again from 1 after you have only moved the counters, and who says the number right away. In the scattered group, watch for the child who counts without marking.',
      },
    },
    'K:one-more-one-less': {
      title: 'One more, one less',
      objective: 'Children count a group of up to 9 pictures, draw one more or cross one out as the label says, and write how many there are now.',
      note: {
        mistake: 'Children count the whole group again from 1 after one more is added, when the next counting number is the answer. On the page with both labels some draw one more on every task and do not look at "1 less".',
        words: 'Ask: "You counted 6. One more comes. Which number comes right after 6?" and "One goes away. Which number comes just before 6?" Have children say the whole sentence: "One more than 6 is 7."',
        watch: 'Watch who names the new number without counting again. A child who recounts every time needs more turns with real counters on a ten-frame: put one on, say the next number, take it off, say the number before.',
      },
    },
    'K:compare-groups#which-number-is-greater': {
      title: 'Which number is greater?',
      objective: 'Children compare two written numbers from 1 to 10 and color the greater one.',
      note: {
        mistake: 'With no pictures to count, some children choose the number that is printed on the right, or the one they like. Others mix up "greater" with "comes first" when they count.',
        words: 'Ask: "Which of the two numbers do you say later when you count? That one is greater." Say both sentences: "7 is greater than 5. 5 is less than 7." Have children build both numbers as cube towers and say which tower is taller.',
        watch: 'Watch the pairs that are close together, such as 7 and 8 or 5 and 6. A child who is sure about 2 and 8 but guesses on 7 and 8 needs the number line or the cube towers for a while longer.',
      },
    },
    // (Flat or solid?, the point 2:flat-or-solid, has its note in en-math-2.js; the design teaches it in Kindergarten)
    'K:numeral-formation#write-11-to-20': {
      title: 'Write the numbers 11 to 20',
      objective: 'Children trace the numbers 11 to 20 with the digits in the right order, starting each digit at the dot and following the arrows. Then they write each number once on their own on a whiteboard.',
      note: {
        mistake: 'Children write the digits in the order they hear them: 71 for seventeen and 41 for fourteen. Some start a digit at the bottom, and many turn the 2, 3, 5, or 7 around inside a teen number.',
        words: 'Say: "Every number from 11 to 19 starts with a 1. The 1 stands for one ten." Ask: "Which digit do you write first?" For seventeen say: "I hear seven first, but I write the 1 first."',
        watch: 'Watch the order in which a child writes the two digits, not only how the finished number looks. A child who writes the second digit first will write 71 for 17 as soon as the tracing lines are gone.',
      },
    },
    'K:count-on': {
      title: 'Count on from a number',
      objective: 'Children start at the number printed on a closed box, count on over the pictures beside it, and write how many there are in all, with totals up to 10.',
      note: {
        mistake: 'Children start again at 1 and try to count things they cannot see inside the box. Others say the number on the box a second time for the first picture beside it and end one short.',
        words: 'Tap the box and stretch out its number: "Siiix." Then point to each picture beside it: "seven, eight." Ask: "Do we need to count what is in the box? What does the number on it tell us?"',
        watch: 'Listen to the first word a child says. A child who whispers "1, 2, 3" up to the number on the box is still counting all. Practice with a real closed bag that has its number written on it.',
      },
    },
    'K:take-away': {
      title: 'Take away: how many are left?',
      objective: 'Children look at a ten-frame on which some dots are crossed out, count the dots that are left, and finish the subtraction sentence, such as 7 − 2 = 5.',
      note: {
        mistake: 'Children count all the dots, crossed out or not, and write the starting number again. Others count the crossed-out dots and write how many were taken away, not how many are left.',
        words: 'Say: "7 dots. 2 are crossed out; they are gone. Count the ones that are still there." Read the sentence together: "7 take away 2 is 5." Ask: "Which number tells how many are left?"',
        watch: 'Watch which dots a child touches while counting. With real counters on a paper ten-frame, have the child slide the counters that are taken away off the frame so that only the ones that are left stay on it.',
      },
    },
    '1:word-problems#adding-stories-within-10': {
      title: 'Adding stories: some more come',
      objective: 'Children listen to a story in which some more come, use the picture of the two groups, and write how many there are in all, with totals up to 10.',
      note: {
        mistake: 'Children write one of the two numbers they heard, most often the last one, or count only the second group in the picture. Some cannot retell what happened in the story.',
        words: 'Read each story aloud twice. Ask: "Who can retell the story? What happened first? What happened then?" Before anyone counts, ask: "Will there be more now, or fewer?" Then say: "Show it with your counters."',
        watch: 'Watch who can act out the story with counters before writing. A child who counts the pictures correctly but cannot say what the answer tells ("7 cucumbers in all") has counted, not solved the story.',
      },
    },
    '1:word-problems#take-away-stories-within-10': {
      title: 'Take-away stories: some go away',
      objective: 'Children listen to a story in which some go away, use the picture in which the ones that go away are crossed out, and write how many are left. The starting number is 10 or less.',
      note: {
        mistake: 'Children add the two numbers because every story so far was an adding story. Others count every picture, the crossed-out ones too, and write the starting number.',
        words: 'Ask: "Did some come, or did some go away? Will there be more or fewer than at the start?" Say: "The crossed-out ones are gone." Have children tell the ending in a sentence: "2 plates are left."',
        watch: 'Tell one adding story in the middle of the lesson and watch who notices. A child who takes away every time is following the page, not the story.',
      },
    },
    'K:number-bonds-k#take-apart-8-and-9': {
      title: 'Take apart 8 and 9',
      objective: 'Children find the missing part of a number bond when the whole is 8 or 9, and name the two parts that make the whole.',
      note: {
        mistake: 'Children write the whole again in the empty circle, or they add the whole and the part they can see. Some know one pair for 8 and think it is the only one.',
        words: 'Give each child 8 two-color counters to shake and spill. Ask: "How many red? How many yellow? How many in all?" Say: "8 is 5 and 3. 8 is also 6 and 2." Ask: "Is there another way?"',
        watch: 'Watch who finds the missing part by counting up from the part they see and who still builds the whole with counters. Both are fine at this point; note the child who has no way to start.',
      },
    },
    '1:make-10#how-many-more-to-make-10': {
      title: 'How many more to make 10?',
      objective: 'Children look at a ten-frame with some dots, find how many more make 10, and write the missing number in a sentence such as 6 + 4 = 10.',
      note: {
        mistake: 'Children count the dots they see and write that number in the box, when the box asks for the empty squares. On the page with the cup some write 10 again for the ones that are hiding.',
        words: 'Point to the empty squares: "These are still missing. How many more until the frame is full?" Say: "6 and 4 more make 10." Ask: "How do you know without counting every dot again?"',
        watch: 'Watch who counts the empty squares one by one and who sees them at a glance (a full row is 5). When the frame is already full, ask what "no more" looks like and which number says it.',
      },
    },
    'K:number-bonds-k#partners-of-10': {
      title: 'Partners of 10',
      objective: 'Children find the partner that makes 10 with a given number in a number bond, and say the pair, such as 8 and 2.',
      note: {
        mistake: 'Children count on with their fingers and land one off, because they also count the number they start from. Others give the partner of a pair they remember, such as 5, for every number.',
        words: 'Slide beads on a string of ten: "8 on this side. How many on the other side?" Say it both ways: "8 and 2 make 10. 2 and 8 make 10." Ask: "If you know the partner of 8, what is the partner of 2?"',
        watch: 'Listen for who knows the turned-around pair at once. A child who works out 2 and 8 again from the start has not yet seen that it is the same pair.',
      },
    },
    // ── Grade 1 ──
    '1:true-false-equations': {
      title: 'True or false?',
      objective: 'Children decide whether an addition or subtraction equation within 20 is true or false, including equations that begin with the single number, such as 16 = 13 + 3.',
      note: {
        mistake: 'Children read the equal sign as "the answer comes next" and mark 16 = 13 + 3 false because it looks backwards. Others mark an equation true as soon as they recognize the numbers of a fact they know.',
        words: 'Read the equal sign as "is the same as": "16 is the same as 13 plus 3. Is that true?" Ask: "What is on this side? What is on that side? Are they the same amount?" Have children fix one false equation aloud.',
        watch: 'Watch the equations that begin with the single number. A child who gets the usual form right and misses those does not need more facts; the child needs the Number Balance, where both sides have to weigh the same.',
      },
    },
    '1:near-doubles': {
      title: 'Near doubles',
      objective: 'Children find a sum such as 6 + 7 by using a double and one more (6 + 6 + 1), with sums within 20.',
      note: {
        mistake: 'Children do not see the double inside the problem and count on by ones. Others double the larger number and still add one more, so 6 + 7 becomes 15.',
        words: 'Ask: "Which double is hiding in 6 + 7? How much more is 7 than 6?" Say: "6 + 6 is 12, and one more is 13." Have children say the helping double before they write anything.',
        watch: 'Watch who writes the sum first and fills in the middle afterward. That child may know the fact, which is fine, but should still be able to say which double helps.',
      },
    },
    '1:fluency-within-20#make-ten-to-add': {
      title: 'Make ten to add',
      objective: 'Children add a number to 6, 7, 8, or 9 by jumping to ten first and then jumping the rest on a number line, and write the steps, such as 8 + 5 = 8 + 2 + 3 = 13.',
      note: {
        mistake: 'Children count on by ones from the first number and never stop at ten. Others split the second number into two parts that do not land on ten, such as 8 + 5 = 8 + 3 + 2.',
        words: 'Ask: "How many more does 8 need to reach ten? What is left of the 5?" Say: "First to ten, then the rest." Show it on the rekenrek: fill the top row first, then push the rest onto the second row.',
        watch: 'Watch the first jump: it has to land on ten. A child who draws one long hop straight to the answer has probably counted on by ones and needs more practice with the partners of 10.',
      },
    },
    '1:time-read#match-the-clocks': {
      title: 'Match the clocks',
      objective: 'Children read times to the hour and half hour on analog clocks and draw a line from each clock to the digital time that matches.',
      note: {
        mistake: 'At half past, children read the hour that the short hand is moving toward and match half past 8 to 9:30. Some look only at the long hand and pair any clock that points to the 6 with any time that ends in 30.',
        words: 'Ask: "Where is the short hand? Has it reached the 9 yet?" Say: "At half past 8 the short hand is halfway between 8 and 9. It is still 8-something: 8:30." Have children read each matched pair aloud.',
        watch: 'Watch the two clocks that share an hour, such as 12:00 and 12:30. A child who mixes them up is reading only one of the two hands.',
      },
    },
    '2:equal-shares-shapes#equal-shares-halves-and-fourths': {
      title: 'Equal shares: fair or not?',
      objective: 'Children decide whether a circle or a rectangle is cut into equal shares and circle the shapes that are. With the teacher they name two equal shares halves and four equal shares fourths.',
      note: {
        mistake: 'Children count the parts and call any shape with two parts "halves," even when one part is much bigger. Others think that four small pieces are more than two big ones without looking at the whole.',
        words: 'Ask: "Are the shares the same size? Would it be fair if you got this piece and I got that one?" Say: "Two equal shares are halves. Four equal shares are fourths, or quarters." Several shapes on the page are cut into three equal parts. They are cut fairly too, so children circle them; the name, thirds, comes in Grade 2.',
        watch: 'Watch the rectangles that are cut into strips of different widths. A child who circles them is counting parts, not comparing sizes; let the child fold a paper strip and lay the parts on top of each other.',
      },
    },
    // ── Grade 2 ──
    '2:bundle-ten-ones#ten-tens-make-one-hundred': {
      title: 'Ten tens make one hundred',
      objective: 'Children count the blocks in a picture that has more than nine tens rods, trade ten rods for one hundred, and write the number, such as 12 tens and 5 ones = 125.',
      note: {
        mistake: 'Children write what they count, digit by digit: 12 tens and 5 ones becomes 1,205, or 17. Others count the rods by ones and lose track after nine.',
        words: 'Ask: "How many tens do you see? Can we make a hundred? How many tens are left over?" Say: "Ten tens are the same as one hundred." Have children circle ten rods before they write.',
        watch: 'Watch who circles ten rods first and who writes the count of rods straight into the number. The second child needs to trade real rods for a hundred flat, or to see the trade on The Exchange Machine.',
      },
    },
    '2:expanded-form-digit-value#expanded-form-with-a-zero': {
      title: 'Expanded form with a zero',
      objective: 'Children put the parts of a three-digit number together and break a number into hundreds, tens, and ones, also when the parts are out of order or a place is empty, such as 50 + 600 = 650 and 900 + 30 = 930.',
      note: {
        mistake: 'Children write the parts in the order they are printed: 7 + 500 + 80 becomes 7,580 or 758. With an empty place they push the digits together, so 900 + 30 becomes 93.',
        words: 'Ask: "Which part is the hundreds? Which place has nothing in it?" Say: "Zero holds the place. 900 + 30 has no ones, so we write a 0 in the ones place." Have children say the name of the number before they write it.',
        watch: 'Watch the tasks with only two parts. A child who writes 65 for 50 + 600 is reading digits, not values; build the number on the Place Value Lab and keep the empty column in view.',
      },
    },
    '1:open-number-line': {
      title: 'Jumps on an open number line',
      objective: 'Children add and subtract two-digit numbers within 100 on an open number line: they mark the starting number, draw their jumps, and write the answer.',
      note: {
        mistake: 'Children jump the wrong way when they subtract, or they draw many jumps of one and lose count. Some write the size of the last jump as the answer, not the number they land on.',
        words: 'Ask: "Where do you start? Are you going forward or back? How big is your first jump?" Say: "Jump the tens first, then the ones," or "Jump to the next ten, then the rest." Have two children show two different ways to solve the same problem.',
        watch: 'Watch whether a child writes the landing number under every jump. A line with jumps and no landing numbers cannot be checked, by the child or by you.',
      },
    },
    '3:column-regrouping#add-three-digit-numbers': {
      title: 'Add three-digit numbers and make a new ten or hundred',
      objective: 'Children add two three-digit numbers in columns when the ones make a new ten or the tens make a new hundred, and write the small 1 they carry above the next place.',
      note: {
        mistake: 'Children write both digits of a sum under one column, so 261 + 285 becomes 4,146. Others carry every time out of habit, or forget to add the 1 they carried.',
        words: 'Ask at each column: "How many altogether? Is that ten or more? What do we trade?" Say: "14 tens are 1 hundred and 4 tens. The hundred moves to the hundreds column." Have children estimate first: "About 500, or about 5,000?"',
        watch: 'Watch the column in which no trade is needed. A child who writes a carried 1 there is following a routine without looking at the sum of the column.',
      },
    },
    '3:column-regrouping#subtract-across-a-zero': {
      title: 'Subtract across zeros',
      objective: 'Children subtract in columns from a multiple of 100, such as 500 − 231, by trading one hundred for ten tens and then one ten for ten ones.',
      note: {
        mistake: 'Children subtract the smaller digit from the larger one in every column, so 500 − 231 becomes 331. Others cross out the 5 and write 10 above both zeros, as if one hundred gave ten tens and ten ones at the same time.',
        words: 'Ask: "Can you take 1 one from 0 ones? Where can you get ones? Are there any tens to trade?" Say: "Trade one hundred for ten tens. Then trade one ten for ten ones. Now 500 is 4 hundreds, 9 tens, and 10 ones." Keep the blocks on the tables for this lesson.',
        watch: 'Watch what a child writes above the tens place: it has to end up as 9, not 10. Have the child check one answer by adding it to the number that was taken away.',
      },
    },
    '1:coins#count-mixed-coins': {
      title: 'Count mixed coins',
      objective: 'Children count the coins in a purse (quarters, dimes, nickels, and pennies), starting with the coins that are worth the most, and write the total in cents.',
      note: {
        mistake: 'Children count how many coins there are, not what they are worth. Others keep counting by the old step when the coin changes: 25, 50, 75, 100 for two quarters, a dime, and a nickel.',
        words: 'Say: "Start with the coins that are worth the most." Count aloud and stop at each change: "25, 50 ... now a dime: 60 ... now a nickel: 65 ... now a penny: 66." Ask: "What are you counting by now?"',
        watch: 'Watch the moment the kind of coin changes. Have a child who slips there write the running total under each coin: 25, 50, 60, 65, 66. The coins on the page show their value as a number; use real or plastic coins as well, so that children also learn to tell the coins apart.',
      },
    },
    '1:bar-graphs#make-a-graph-from-counts': {
      title: 'Make a graph from counts',
      objective: 'Children read the counts for four groups and color one box in the graph for each one. Then, with the teacher, they compare the rows of the finished graph: how many more, how many fewer, how many in all.',
      note: {
        mistake: 'Children leave a gap or start coloring in the middle of a row, so that a row with fewer boxes reaches farther than a row with more. Others stop coloring when the row looks long enough and do not count.',
        words: 'Say: "Start next to the picture and color with no gaps." When the graph is done, ask: "Which row is the longest? How many more are in this row than in that one? How many in all?" Have children write an equation for one answer.',
        watch: 'Watch how a child finds "how many more": by counting the extra boxes, or by subtracting. Both work. A child who answers with the larger count has read one row and has not compared two.',
      },
    },
    // ── Grade 3 ──
    '3:times-tables#the-facts-we-still-need': {
      title: 'The facts we still need',
      objective: 'Children fill in a multiplication chart up to 10 × 10, starting with the rows and columns they already know (1, 2, 5, and 10), and list the facts that are left to learn.',
      note: {
        mistake: 'Children fill in the chart row by row by skip-counting from the start of each row, which takes the whole lesson and does not show them which facts they already know. Others do not see that 6 × 7 and 7 × 6 are the same fact and count both as unknown.',
        words: 'Say: "Fill in what you own first: the 1s, 2s, 5s, and 10s, across and down." Ask: "If you know 3 × 5, where is 5 × 3?" Then: "Circle the boxes that are still empty. Those are the facts we still need." Every product you know gives you division facts too: if 6 × 7 = 42, then 42 ÷ 7 = 6.',
        watch: 'Watch who uses a turn-around fact to fill a box and who starts counting again. Keep each child\'s list of the facts still needed; it is the practice plan for the next weeks.',
      },
    },
    // ── lessons the teacher leads without a page (`routine`: what the class does) ──
    'K:measurable-attributes': {
      title: 'What can we measure?',
      objective: 'Children hold a real object, such as a book, a cup, or a block, and say what can be measured about it: how long it is, how heavy it is, or how much it holds.',
      routine: 'Start at the length bench of the Measurement Bench. The class says what is being measured there (how long the object is) and what else could be measured about that object (how heavy it is, how much it holds). Then sit in a circle with a basket of real objects. Each pair takes one object and tells two things about it that can be measured: "We can measure how long it is. We can measure how heavy it is." On the second day each pair takes a new object from the basket and tells again what can be measured about it. This lesson has no worksheet.',
      note: {
        mistake: 'Children name a color or what the object is used for ("It is red. You drink from it.") and not something that can be measured. Many use "big" for everything, whether the object is long, tall, heavy, or holds a lot.',
        words: 'Ask: "What could we find out about this cup with a ruler? With a scale? With water?" Say: "We can measure how tall it is, how heavy it is, and how much it holds." Trade "big" for the exact word: "Is it long, tall, or heavy?"',
        watch: 'Listen for children who name two different things to measure about one object. A child who can only say "big" needs two objects to hold: one that is long and light, and one that is short and heavy.',
      },
    },
    'K:one-to-one#touch-and-count': {
      title: 'Touch and count',
      objective: 'Children touch and move 1 to 10 real counters one at a time into a ten-frame and say exactly one number for each counter.',
      routine: 'Model it first on the Ten Frame tool while the class counts along. Then each child gets a cup with 1 to 10 counters and a ten-frame: two rows of five boxes that you draw on paper, or an egg carton cut down to ten cups. The child slides one counter into a box for each number said, fills the top row first, and stops when the cup is empty. Partners watch each other count. This lesson has no worksheet.',
      note: {
        mistake: 'Children say the number words faster than they move the counters, so the count runs ahead of the hand. Others count a counter twice or skip one, and some keep counting after the cup is empty.',
        words: 'Say: "One touch, one number." Count slowly together: "Slide ... one. Slide ... two." Ask: "How many did you put in? How do you know you counted every one?"',
        watch: 'Watch the hand and listen to the voice at the same time. A child whose last number word lands on the last counter, and who can say "there are 7" without counting again, is ready to write how many.',
      },
    },
    '2:explain-strategies': {
      title: 'Why does it work?',
      objective: 'Children explain with blocks or a drawing why a way of adding or subtracting within 100 works, and compare two worked ways for the same problem, such as 38 + 25.',
      routine: 'Run the lesson as a number talk. Write one problem on the board with two children\'s ways worked out side by side. For 38 + 25: add tens and ones separately (30 + 20 = 50, 8 + 5 = 13, 50 + 13 = 63) and jump to the next ten (38 + 2 = 40, 40 + 23 = 63). On the second day, for 63 − 28: take away the tens, then the ones (63 − 20 = 43, 43 − 8 = 35) and count up from 28 (28 + 2 = 30, 30 + 33 = 63, so 2 + 33 = 35). Pairs say what each child did and why both ways give the same answer. Then they show 38 + 25 with blocks on the Place Value Lab and 63 − 28 with real blocks. This lesson has no worksheet.',
      note: {
        mistake: 'Children retell the steps ("I carried the 1") and cannot say what the 1 stands for. Others think that two different ways must give two different answers, or that only the way they learned first is right.',
        words: 'Ask: "What did this child do first? What happened to the 8 ones and the 5 ones?" Say: "8 ones and 5 ones are 13 ones: 1 new ten and 3 ones." Ask: "Why do both ways give 63?"',
        watch: 'Listen for place-value words: "3 tens and 2 tens," "I made a new ten." A child who can explain a classmate\'s way, not only their own, has understood why it works.',
      },
    },
    '2:estimate-lengths': {
      title: 'Estimate, then measure',
      objective: 'Children estimate lengths in inches, feet, centimeters, and meters with benchmarks they know, then measure and compare the estimate with the measurement.',
      routine: 'Teach four benchmarks first: your little finger is about 1 centimeter wide, your thumb from the tip to the first knuckle is about 1 inch long, a 12-inch ruler is 1 foot long, and a door is about 1 meter wide. Show an inch and a centimeter on the Ruler tool so the class sees how different they are. On the first day pairs estimate in inches or feet, on the second day in centimeters or meters: a pencil, the desk, a bookshelf, and the rug. They estimate first, then measure with a ruler, a yardstick, or a meter stick, and write three things for each, always with the unit: my estimate, my measurement, how far off. This lesson has no worksheet; the children draw three columns on plain paper.',
      note: {
        mistake: 'Children give an estimate with no unit ("about 10") or change the estimate after they measure so that it looks right. Many guess wildly because they have no picture of an inch or a meter in their heads.',
        words: 'Ask: "How many times does the tip of your thumb fit along the pencil? So about how many inches long is it?" Say: "An estimate is a smart guess with a unit. It does not have to be exact; it has to be close." Ask: "Was your estimate too long or too short?"',
        watch: 'Watch the second and third estimates. A child who uses the first measurement to make the next estimate better is estimating; a child whose estimates stay far off needs the benchmarks again.',
      },
    },
  },
};
