'use strict';
/**
 * Teacher notes, English, Grade 3 math (Daily Teaching System, Part 4.2). Written from what each lesson's worksheets
 * PRINT (scripts/units/dump-points.js), in American English.
 */
module.exports = {
  loc: 'en',
  points: {
    '3:compare-4-digit': {
      title: 'Compare four-digit numbers',
      objective: 'Children compare two four-digit numbers place by place from the left and circle the sign for greater than, less than, or equal.',
      note: {
        mistake: 'Children compare the first digits and guess when those match, or they are drawn to big digits at the end: 3,099 looks greater than 3,100. A number with zeros inside is misread, 4,007 as "four hundred seven."',
        words: 'Say: "Read both numbers aloud first. Then start on the left: thousands, hundreds, tens, ones. Stop at the first place where they differ." Ask: "Which place decided it?"',
        watch: 'Have the child name the place that decided each comparison. Check pairs that differ only in the tens or the ones, and numbers with zeros; reading a number aloud shows whether its places are understood.',
      },
    },
    '3:rounding': {
      title: 'Round to the nearest hundred',
      objective: 'Children find which hundred a number is closer to on a number line and round three-digit numbers to the nearest hundred.',
      note: {
        mistake: 'Children look at the ones digit, as they did when rounding to ten, so 349 is rounded up to 400 because of the 9. Or they change only the tens and write 350.',
        words: 'Ask: "Which two hundreds is 349 between? What number is halfway?" (350.) "Is 349 before or after halfway?" Say: "For hundreds, the TENS digit decides. The ones do not matter."',
        watch: 'Use 349 and 351 as test numbers. A child who rounds both the same way is not thinking of the halfway point; put both numbers on a line from 300 to 400.',
      },
    },
    '3:column-regrouping': {
      title: 'Add and subtract with regrouping',
      objective: 'Children add and subtract in columns within 1,000, regrouping when a place has more than nine or not enough to take away.',
      note: {
        mistake: 'Children forget to add the new ten or hundred, or they write it and add it twice. In subtraction they trade a ten for ten ones and forget to make the tens one smaller; with a zero in the tens place (402 − 178) they do not know where the ten ones can come from.',
        words: 'Say each step: "8 and 7 is 15 ones. That is 1 ten and 5 ones. Write the 5, and write the new ten above the tens." For a zero: "No tens to trade. Go to the hundreds: trade one hundred for ten tens. Now trade one of those tens for ten ones."',
        watch: 'Check subtraction across a zero first. Have children add the answer back to check a subtraction, and ask "About how much should it be?" before they compute.',
      },
    },
    '3:estimate-by-rounding': {
      title: 'Round, then estimate the sum',
      objective: 'Children round two numbers to the nearest ten and add the rounded numbers to estimate the sum; with the teacher, they use an estimate to judge whether an exact answer is reasonable.',
      note: {
        mistake: 'Children work out the exact sum first and then round the answer, which defeats the purpose. Or they round only one of the two numbers.',
        words: 'Say: "Round first, then add. An estimate is fast and close, not exact." Show it: "48 + 31 is about 50 + 30. About 80." Then: "Someone got 109 for 48 + 31. Can that be right? How do you know without adding?"',
        watch: 'See who writes the exact sum in the margin before rounding. Give a wrong exact answer and ask the class to catch it with an estimate; that is what estimating is for.',
      },
    },
    '3:parity-of-sums': {
      title: 'Is the sum odd or even?',
      objective: 'Children decide whether a sum will be odd or even by looking at the ones digits of the two numbers, without adding.',
      note: {
        mistake: 'Children add anyway and then look at the answer. Or they guess a rule that feels right: "odd plus odd must be odd."',
        words: 'Try small numbers first and collect the results: "3 + 5 = 8. Odd plus odd… even!" Ask why: "Each odd number has one left over. The two leftovers make a pair." Build the three rules together: even + even, odd + odd, even + odd.',
        watch: 'Ask a child to explain odd plus odd with counters laid out in pairs. A child who can only recite the table will forget it; one who sees the two leftovers pair up will not.',
      },
    },
    '3:arithmetic-patterns': {
      title: 'Find the rule of a number pattern',
      objective: 'Children find how much a number pattern grows or shrinks at each step and write the missing numbers.',
      note: {
        mistake: 'Children look at one pair of numbers, decide on a rule, and do not test it on the rest of the row. In shrinking patterns they keep adding. Two missing numbers in a row stop them.',
        words: 'Ask: "How do you get from this number to the next? Is it the same jump every time? Check it on three pairs." Have children write the rule above the row: "+ 25" or "− 4." For a double gap: "Two jumps take you from 40 to 60. How big is one jump?"',
        watch: 'See who writes the rule down and tests it. Mix growing and shrinking rows; a child who adds in a shrinking row has stopped looking at the numbers.',
      },
    },
    '3:mult-equal-groups': {
      title: 'Multiplication as equal groups',
      objective: 'Children read a picture of equal groups or an array, finish the multiplication, and find the total.',
      note: {
        mistake: 'Children count every picture by ones and never use the groups. In the equation they write the total where a factor belongs.',
        words: 'Say: "6 groups of 4 is 6 times 4." Find the total from a fact you know: "5 groups of 4 is 20, one more group is 24." Use the words "factor" for the numbers you multiply and "product" for the total.',
        watch: 'Ask how the child found the total. Counting by ones gives a right answer and no progress; a child who says "five of them and one more" is building the tables.',
      },
    },
    '3:mult-number-line': {
      title: 'Multiplication hops',
      objective: 'Children show a multiplication as equal hops from zero on a number line and write the number where each hop lands.',
      note: {
        mistake: 'Children write the number of the hop (1, 2, 3) under each landing and not the place where it lands. Or they start the first hop at 1, so that every landing is one too big.',
        words: 'Say: "Every hop is the same size. Start at zero. Hops of 4 land on 4, 8, 12." Ask: "How many hops? How big is each one? Where are you after 5 hops of 4?" Call the landing numbers "multiples of 4."',
        watch: 'Check that the first landing equals the size of the hop. Ask for "3 hops of 5" and "5 hops of 3" and let children see that both end in the same place.',
      },
    },
    '3:commutative': {
      title: 'Turn the array around',
      objective: 'Children see that an array turned on its side shows the same total, and write both multiplication equations.',
      note: {
        mistake: 'Children count both arrays from scratch as two separate problems and do not notice that the totals match. Some believe 3 × 7 and 7 × 3 are two different facts that both have to be learned.',
        words: 'Turn a paper array a quarter turn and ask: "Did I add any? Did I take any away? So what is the total now?" Say: "3 rows of 7 and 7 rows of 3 are the same amount. If you know one, you know the other."',
        watch: 'Ask "What is 7 × 3?" right after a child has worked out 3 × 7. A child who starts counting again has not taken in the turn; turn the array once more.',
      },
    },
    '3:times-tables': {
      title: 'The 2 and 5 times tables',
      objective: 'Children write the products for the 2 and 5 times tables and practice a mix of multiplication facts.',
      note: {
        mistake: 'Children skip count from the start for every fact and lose track around the sixth or seventh number. They mix up neighbors: 6 × 5 is answered with 35.',
        words: 'Start from a fact the child knows: "You know 5 × 5 is 25. So 6 × 5 is one more five: 30." Use doubles for the 2s, and half of the tens fact for the 5s: "8 × 10 is 80, so 8 × 5 is half of that, 40."',
        watch: 'Listen for how a child gets a fact: from memory, from a neighbor fact, or by counting from the start. Practice a few facts each day; a page finished by skip counting has not built memory.',
      },
    },
    '3:division-sharing': {
      title: 'Divide by sharing',
      objective: 'Children share a pile equally into a given number of bins and write how many each bin gets.',
      note: {
        mistake: 'Children write the number of bins or the size of the pile as the answer. Without counters they guess how many go in each bin and do not check that the bins use up the pile.',
        words: 'Say: "12 shared among 3 is a division: 12 ÷ 3." Then deal: "One for each, again, again, until none are left. Each gets 4." Check with multiplication: "3 bins of 4 make 12." Read the sign as "divided by."',
        watch: 'Ask every child to check one answer by multiplying. A child who sees that 3 × 4 = 12 answers 12 ÷ 3 has found the shortcut that makes division easy.',
      },
    },
    '3:division-repeated-subtraction': {
      title: 'Divide by hopping back',
      objective: 'Children find how many equal hops it takes to get from a number back to zero on a number line.',
      note: {
        mistake: 'Children write the size of the hop as the answer, or they count every mark they touch, the starting number included, which gives one too many. They do not see that this is division too.',
        words: 'Say: "Start at 15. Hop back 3 each time: 12, 9, 6, 3, 0. How many hops? Five." Write it: "15 ÷ 3 = 5. There are five 3s in 15." Ask: "How many 3s fit into 15?"',
        watch: 'Have children count hops with a finger on each arc, not on the marks. Put the two meanings side by side once: 15 shared among 3, and how many 3s are in 15.',
      },
    },
    '3:mult-div-relationship': {
      title: 'The missing factor and fact families',
      objective: 'Children find the missing factor of an array and write the two multiplications and the two divisions that belong to it.',
      note: {
        mistake: 'Children treat a division as a new problem and do not use the multiplication they just wrote. In a fact family they write a division that starts with a small number, such as 4 ÷ 24 = 6.',
        words: 'Say: "Division asks for the missing factor. 24 ÷ 4 asks: 4 times what is 24?" Point to the array: "In a fact family the total is the number we divide: 24 ÷ 4, not 4 ÷ 24." Have children read all four facts of one array aloud.',
        watch: 'Ask a division and see whether the child thinks of the multiplication. Check the order of the numbers in each division: the total, the whole array, comes first. Say "the total," never "the biggest number"; later on children will divide a smaller number by a bigger one.',
      },
    },
    '3:muldiv-word-problems': {
      title: 'Multiplication and division word problems',
      objective: 'Children solve word problems with equal groups, deciding whether the story asks for the total, for the size of each group, or for the number of groups.',
      note: {
        mistake: 'Children pick out the two numbers and multiply every time, or choose the operation from one word such as "each." They do not ask what the answer will be: a total, a share, or a number of groups.',
        words: 'Ask three questions about every story: "Do we know how many groups? Do we know how many in each group? Do we know the total?" Then: "Which of the three is missing?" Have children finish with a sentence: "Each child gets 4 stickers."',
        watch: 'Read a child\'s answer sentence, not only the number. A bare "4" does not show whether the child knows it is 4 stickers each or 4 bags. Each page holds one kind of story, so the page decides for the child: read one story from each page aloud, in mixed order and without the picture, and ask which of the three is missing.',
      },
    },
    '3:balance-equations': {
      title: 'Make it balance',
      objective: 'Children use the equal sign as a balance and write the number that makes both sides the same amount.',
      note: {
        mistake: 'Children read the equal sign as "the answer comes next." In 8 + 4 = __ + 5 they write 12 in the blank, or 17 by adding everything.',
        words: 'Say: "The equal sign means the SAME on both sides, like a balance." Work out one side first: "8 + 4 is 12. So the other side must be 12 too. What plus 5 makes 12?" Read the sign as "is the same as."',
        watch: 'Give three quick true-or-false cards: 7 = 7, 5 + 3 = 3 + 5, 12 = 8 + 4. A child who calls them wrong "because the answer is on the wrong side" still reads the sign as "the answer comes next"; that child should work with a real or a drawn balance and smaller numbers.',
      },
    },
    '3:division-remainder': {
      title: 'Division with a remainder',
      objective: 'Children make equal groups from a pile or deal it into boxes, write how many groups there are or how many each box gets, and write how many are left over.',
      note: {
        mistake: 'Children leave too many over: as many as a group or more on the grouping page, as many as the number of boxes or more on the sharing page, when one more group or one more round could be made. Or they drop the leftovers and write only the number of groups.',
        words: 'Say: "14 in groups of 4: three groups, and 2 left over." Ask: "Can you make another group from what is left? No? Then that is the remainder." On the sharing page: "14 into 4 boxes. Is there enough left to give every box one more?" State the rule together: "The remainder is always smaller than the number you divide by."',
        watch: 'Check each remainder against the number the pile was divided by: the size of a group on the grouping page, the number of boxes on the sharing page. A remainder of 5 with groups of 4 means one group is still hiding in the leftovers. Remainders are a fourth-grade standard: keep the words "left over" and treat this lesson as a first look.',
      },
    },
    '3:time-to-minute': {
      title: 'Tell time to the minute',
      objective: 'Children read an analog clock to the exact minute and choose the matching time.',
      note: {
        mistake: 'Children read to the nearest five and stop, so 4:23 is called 4:20 or 4:25. Others count every small mark from the 12 and lose count on the way around.',
        words: 'Say: "Go to the number just before the minute hand and count by fives to it: 5, 10, 15, 20. Then count the small marks one by one: 21, 22, 23." Ask: "Is the hour hand past the 4? A little or a lot?"',
        watch: 'Listen to a child count: fives first, then ones. Check times in the last quarter of the hour, where the hour hand is close to the next number.',
      },
    },
    '3:add-subtract-time': {
      title: 'Add and subtract time',
      objective: 'Children start at a clock time, add or subtract minutes or hours, and write the new time.',
      note: {
        mistake: 'Children add the minutes as plain numbers and write a time that does not exist, such as 3:75. Going back across the hour, they change the minutes and forget to change the hour.',
        words: 'Say: "An hour has 60 minutes, not 100." Jump to the full hour first: "3:45 plus 30 minutes. 15 minutes takes us to 4:00. 15 more: 4:15." Draw the jumps on an open number line with the times written on it.',
        watch: 'Look for minutes of 60 or more in an answer. Have children show the jump to the next full hour on a clock or on a line before they write.',
      },
    },
    '3:elapsed-duration': {
      title: 'How much time passed?',
      objective: 'Children compare two clock times and find how much time passed between them.',
      note: {
        mistake: 'Children subtract the two clock numbers without thinking about the clock: from 11:00 to 2:00 becomes 9 hours. Or they count the starting hour as the first hour.',
        words: 'Say: "Count the jumps from the start time to the end time: 11 to 12 is one hour, 12 to 1 is two, 1 to 2 is three." Ask: "Does three hours make sense? What could you do in that time?"',
        watch: 'Check the items that pass 12 o\'clock. A child who writes 9 hours for 11:00 to 2:00 subtracted; go around a real clock together and count each hour as it passes.',
      },
    },
    '3:time-12-24': {
      title: '12-hour and 24-hour time',
      objective: 'Children match a time on the 12-hour clock to the same time on the 24-hour clock.',
      note: {
        mistake: 'Children add 12 to morning times as well, or they drop the first digit, so that 15:00 becomes 5:00. Noon and midnight are confused.',
        words: 'Say: "After 12 noon the 24-hour clock keeps counting: 13, 14, 15." Give the rule both ways: "From 1:00 p.m. to 11:59 p.m., add 12 to the hour. From 24-hour time: if the hour is more than 12, subtract 12 and say p.m." Ask: "Is 08:00 morning or evening? How do you know?"',
        watch: 'Check noon and the hour after it, such as 12:30 p.m., which stays 12:30, and midnight, which is 00:00. Most clocks around the children show a.m. and p.m.; point out a bus schedule or a plane ticket that uses 24-hour time. This lesson goes beyond the Common Core; many Americans know 24-hour time as "military time."',
      },
    },
    '3:thermometer': {
      title: 'Read a thermometer',
      objective: 'Children read the temperature on a thermometer whose scale counts by 2, by 5, or by 10.',
      note: {
        mistake: 'Children count every mark as one degree, whatever the scale. They read the nearest printed number and ignore the marks between, or look at the top of the tube and not at the top of the colored line.',
        words: 'Ask first: "This scale does not count by ones. What do the printed numbers count by? So what is each small mark worth?" Then: "Find the top of the line. Which printed number is just below it? Count up from there." Say the temperature with its unit, as the page prints it: "70 degrees."',
        watch: 'Compare two thermometers with different scales that show the same temperature, and ask which one was harder to read and why.',
      },
    },
    '3:area-model': {
      title: 'Area: count the squares',
      objective: 'Children find the area of a rectangle by counting its squares in rows and finish the multiplication for it.',
      note: {
        mistake: 'Children count the squares one by one and miscount in a big rectangle. Others count the squares along two sides and add them, which gives a number that has nothing to do with the area.',
        words: 'Say: "Area is how many squares cover the shape with no gaps and no overlaps." Ask: "How many squares in one row? How many rows? 4 rows of 6 is 24 squares." Say the unit: "24 square units."',
        watch: 'Ask how the child counted. Rows times columns is the goal; counting one by one is the starting point. Listen for the word "square" in the unit.',
      },
    },
    '3:same-area': {
      title: 'Same area, different shape',
      objective: 'Children compare rectangles and circle the one that covers the same number of squares as another.',
      note: {
        mistake: 'Children choose the rectangle that looks most like the first one, or think a long thin rectangle must be bigger than a compact one. They judge by eye and do not count.',
        words: 'Say: "Different shape, same space. Count the squares of each one." Ask: "A 2 by 6 and a 3 by 4. How many squares in each?" Cut a 3 by 4 paper rectangle into pieces and rearrange it: "Did the area change?"',
        watch: 'See who counts and who goes by looks. Ask a child to draw two different rectangles with 12 squares on grid paper.',
      },
    },
    '3:perimeter': {
      title: 'Perimeter: walk the edge',
      objective: 'Children find the perimeter of a rectangle by counting the unit edges all the way around.',
      note: {
        mistake: 'Children count the squares along the border and not the edges, so a corner square is counted once where it has two outside edges. Or they count the squares inside and give the area.',
        words: 'Say: "Perimeter is the distance around, like a fence." Walk a finger along the outside: "Count the edges, not the squares. Mark where you start." For a rectangle: "Two long sides and two short sides: 5 + 3 + 5 + 3."',
        watch: 'Check the corners: a child who counts squares gets a number that is 4 too small. Ask "Is that the fence or the grass?" to keep perimeter and area apart.',
      },
    },
    '3:same-perimeter': {
      title: 'Same perimeter, different area',
      objective: 'Children compare rectangles and circle the one with the same distance around as another.',
      note: {
        mistake: 'Children believe that rectangles with the same perimeter must have the same area, or they compare areas because counting squares is what they did last. A long thin rectangle is judged to have the longer fence.',
        words: 'Say: "Same fence, new yard." Make a loop of string and pull it into different rectangles: "The string did not get longer. Did the space inside stay the same?" Have children count the edges of each rectangle and write the numbers.',
        watch: 'Ask for both numbers of two rectangles, the perimeter and the area, and have the child say which is which. This lesson exists to pull the two ideas apart.',
      },
    },
    '3:partition-equal-areas': {
      title: 'Equal pieces',
      objective: 'Children decide whether a shape is cut into equal parts; with the teacher, they name one of the equal parts as a unit fraction.',
      note: {
        mistake: 'This page reviews second grade. Children count the parts and do not compare them: four parts are "fourths" even when the parts differ in size. Parts that are equal in size and different in shape are turned down.',
        words: 'Ask: "Does every part cover the same amount?" Say: "Only equal parts get a fraction name. Four EQUAL parts: each one is one fourth." Show a square cut into four triangles and one cut into four small squares: "Different shapes, same amount."',
        watch: 'Look at the circles with one thin slice and the rectangles with unequal strips. A child who circles them is counting parts. Cut paper and lay the parts on top of each other; when two parts have different shapes, cut one of them and rearrange its pieces to cover the other.',
      },
    },
    '3:fraction-unit-build': {
      title: 'Name and shade a fraction',
      objective: 'Children write the fraction that the shaded parts of a shape show, and shade a shape to show a given fraction.',
      note: {
        mistake: 'Children write the shaded parts over the unshaded parts: 3 shaded and 1 not becomes 3/1. Or they turn the fraction upside down, with the number of all the parts on top.',
        words: 'Say: "The bottom number tells how many equal parts the whole has. The top number tells how many of them we mean." Count unit pieces: "One fourth, two fourths, three fourths." Use "numerator" and "denominator" once children have the idea.',
        watch: 'Check a shape with 3 of 4 parts shaded. The answer 3/1 means the child compared shaded with unshaded; count all the parts together first, then the shaded ones.',
      },
    },
    '3:whole-from-unit': {
      title: 'Find the whole',
      objective: 'Children look at one equal part and choose the bar that shows the whole it came from.',
      note: {
        mistake: 'Children choose the longest bar, or a bar as long as the part itself. They do not use the fraction to tell how many parts make the whole.',
        words: 'Say: "This piece is one third. How many thirds make a whole? Three. So the whole is three of these pieces long." Have children lay the piece down again and again, or mark its length along the bar.',
        watch: 'Ask "How many of these pieces fit in the whole?" before the child circles. The answer should match the bottom number of the fraction.',
      },
    },
    '3:compare-fractions': {
      title: 'Which fraction is greater?',
      objective: 'Children compare two fractions of the same whole with fraction bars and circle the greater one.',
      note: {
        mistake: 'Children think a bigger bottom number means a bigger fraction: one eighth is taken to be more than one fourth, because 8 is more than 4.',
        words: 'Ask: "Would you get more pizza if it is shared among 4 people or among 8?" Say: "More parts means smaller parts." With the same bottom number: "Three fifths and two fifths: the pieces are the same size, so more pieces is more." Always add: "We can only compare fractions of wholes that are the same size."',
        watch: 'Use 1/4 and 1/8 as the test. A child who picks 1/8 is comparing whole numbers; go back to two equal bars, one cut into fourths and one into eighths.',
      },
    },
    '3:equivalent-fractions': {
      title: 'Equivalent fractions: different names, same amount',
      objective: 'Children match a picture to a fraction that shows the same amount, such as one half and two fourths.',
      note: {
        mistake: 'Children look for a fraction with the same numbers as the picture and find none. Two fractions with different numbers cannot be equal, they think, so 1/2 and 2/4 are different amounts.',
        words: 'Fold a paper strip in half, then in half again: "One half is the same amount as two fourths. Nothing was added." Say: "Different name, same amount. We call them equivalent fractions." Ask: "How many sixths cover the same space as one half?"',
        watch: 'Have children lay two fraction strips one above the other and compare where the shading ends. A child who needs the numbers to match should fold paper before working on the page.',
      },
    },
    '3:right-angles': {
      title: 'Right angles',
      objective: 'Children find the right angles, the square corners, of shapes and circle them.',
      note: {
        mistake: 'Children see a right angle only when one arm lies flat and the other stands up. A square corner on a tilted shape is missed, and an angle that is nearly square is accepted.',
        words: 'Give each child a "corner checker," the corner of an index card: "Fit the card into the angle. Does it fit exactly? Then it is a right angle." Use "smaller than a right angle" and "bigger than a right angle."',
        watch: 'See who turns the card or the page to test a tilted corner. Check the angles that are almost right angles; only the card can settle those.',
      },
    },
    '3:classify-quadrilaterals': {
      title: 'Is it a rectangle?',
      objective: 'Children decide whether a four-sided shape is a rectangle by checking its sides and its angles, knowing that a square is also a rectangle.',
      note: {
        mistake: 'Children say a square is not a rectangle because "a rectangle has two long sides and two short sides." A tilted rectangle is not accepted, and a leaning parallelogram is taken for one.',
        words: 'Ask: "What makes a rectangle? Four sides and four right angles." Then: "Does a square have four sides and four right angles? Then it is a rectangle, a special one." Test corners with the corner of a card.',
        watch: 'Ask "Is a square a rectangle?" and listen for the reason. A child who says "yes, because it has four right angles" is sorting by properties, which is the point of the lesson.',
      },
    },
    '3:symmetry': {
      title: 'How many mirror lines?',
      objective: 'Children find all the lines of symmetry of a shape and write how many there are.',
      note: {
        mistake: 'Children find the up-and-down line and stop. They miss the line across and the slanted ones, or they count the diagonals of a long rectangle, which are not mirror lines.',
        words: 'Say: "Try every fold: up and down, across, corner to corner." Use cut-out shapes: "Fold it. Do the halves match exactly?" Ask: "A square has 4 mirror lines. Why does a rectangle that is not a square have only 2?"',
        watch: 'Hand out paper shapes to fold. Check the long rectangle: a child who writes 4 for it has not folded it along a diagonal.',
      },
    },
    '3:scaled-graphs': {
      title: 'Graphs with a scale',
      objective: 'Children read bar graphs whose scale counts by 5 and pictographs in which each picture stands for 5.',
      note: {
        mistake: 'Children count the grid lines or the pictures as ones and ignore the scale. A bar that ends at a line with no number is read as the printed number below it.',
        words: 'Ask first: "What does the scale count by? What does one picture stand for?" Count along: "5, 10, 15, 20." For a bar that stops at a line with no number: "The printed numbers on each side are 10 and 20. What is this line worth?"',
        watch: 'Have the child read the key or the scale aloud before the first answer. Ask one compare question ("how many more") to see whether the child uses the scaled numbers or counts pictures.',
      },
    },
    '3:line-plot-halves': {
      title: 'A line plot with halves',
      objective: 'Children read a line plot whose number line is marked in halves and write how many X marks stand above each number.',
      note: {
        mistake: 'Children skip the half marks and read only the whole numbers, moving an X at 2½ to 2 or to 3. They also mix up the measurement under a stack with the number of Xs in it.',
        words: 'Read the line aloud together: "1, one and a half, 2, two and a half." Ask: "How many things were two and a half units long? Count the Xs above that mark." Then: "How many were longer than 2?"',
        watch: 'Ask a question whose answer sits on a half mark. A child who answers for the nearest whole number is not yet reading the halves on the line.',
      },
    },
    '3:input-output': {
      title: 'Number machines',
      objective: 'Children use the rule printed on a number machine, such as add 7 or subtract 4, to fill in the numbers that are missing going in or coming out.',
      note: {
        mistake: 'Children use the rule the same way in every row. When the number that went IN is missing, they apply the rule forward again and do not undo it: on a + 7 machine with 12 coming out they write 19, not 5. Some read a minus rule as plus.',
        words: 'Have children read the rule aloud first: "This machine adds 7 to every number." For a number coming out: "5 goes in. Add 7. What comes out?" For a number going in: "12 came out. The machine added 7. What went in? Undo it: 12 minus 7." Ask: "How can you check? Put your number in and run the machine."',
        watch: 'Check the rows where the missing number is the one going in; those need the opposite operation. Have the child put the answer back through the machine: if 5 plus 7 gives the 12 that is printed, the row is right.',
      },
    },
    '3:volume-cubes': {
      title: 'Count the cubes',
      objective: 'Children count all the unit cubes in a tower, also the ones they cannot see, and write the total.',
      note: {
        mistake: 'Children count only the cubes they can see in the drawing and leave out the hidden ones at the back and underneath. Or they count the square faces they see and get a number that is far too big.',
        words: 'Build the tower with snap cubes first: "How many can you see from here? Now turn it around and take it apart. Count them all." Say: "Count layer by layer. How many cubes in the bottom layer? In the next one? Add the layers." Ask: "A cube on top must be sitting on something. What is under it?" Give the word: "The number of cubes that fill a shape is its volume."',
        watch: 'Have each child build one tower from the page with cubes and compare the count with the written answer. A child who counts by layers ("6 and 6 and 6") is ready for volume as layers times the cubes in a layer.',
      },
    },
    '3:fraction-number-line': {
      title: 'Fractions on a number line',
      objective: 'Children read the fraction that a dot marks on a number line from 0 to 1 by counting the equal spaces.',
      note: {
        mistake: 'Children count the tick marks, the ones at 0 and at 1 included, and take that for the bottom number: a line cut into 4 equal spaces has 5 marks and becomes "fifths." Or they count the marks up to the dot, starting with 1 at zero.',
        words: 'Say: "Count the SPACES between 0 and 1, not the marks. Four equal spaces: each one is one fourth. So the denominator, the bottom number, is 4." Then hop from zero: "One fourth, two fourths, three fourths. The dot is at three fourths." Ask: "Where is zero fourths? Where is four fourths?"',
        watch: 'Ask a child how they found the bottom number. "I counted the lines" means the marks were counted; fold a paper strip into fourths and lay it under the line to show the four spaces.',
      },
    },
    '3:fraction-of-set': {
      title: 'A fraction of a group',
      objective: 'Children circle a fraction of a group of pictures, such as one third of 12, and write how many that is.',
      note: {
        mistake: 'Children circle as many pictures as the bottom number says: 3 pictures for one third. With a top number above 1 (two thirds), they find one group and stop.',
        words: 'Say: "The denominator, the bottom number, tells how many equal groups to make. Thirds: make 3 equal groups. One third is ONE of the groups." Link it to division: "12 in 3 equal groups: 4 in each. One third of 12 is 4." For two thirds: "The numerator, the top number, tells how many groups to take. Two of the groups: 4 and 4, that is 8."',
        watch: 'Check that the groups a child circles are equal before looking at the number. A child who knows 12 ÷ 3 = 4 and still circles 3 pictures has not connected the fraction with the division; have that child deal 12 counters into 3 equal groups first.',
      },
    },
  },
};
