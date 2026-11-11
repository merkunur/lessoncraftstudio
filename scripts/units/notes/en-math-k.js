'use strict';
/**
 * Teacher notes, English, Kindergarten math (Daily Teaching System, Part 4.2). One entry per teaching point: the
 * lesson's title, its objective, and the note (the usual mistake, the words to use, what to watch for).
 * Written from what each lesson's worksheets PRINT (scripts/units/dump-points.js), in American English.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:position-words': {
      title: 'Position words',
      objective: 'Children use the words on, under, beside, left, and right to say where something is, and circle the picture in the place that is named.',
      note: {
        mistake: 'Children circle the picture they like best, not the one in the place that was named. Left and right are the hardest: many children find the correct side only while they face the same way as the teacher.',
        words: 'Say the whole sentence each time: "The cat is ON the box. The ball is UNDER the box." For left and right, stand with your back to the children so that your left is their left, and say: "Put your finger on the line. Slide it this way. This is the LEFT side." Have children say the position word back to you.',
        watch: 'Watch who can also SAY where a picture is, not only circle it. A child who mixes up left and right but knows on, under, and beside needs more turns with the line page, not with the box page.',
      },
    },
    'K:scene-search': {
      title: 'Find every one like it',
      objective: 'Children search a busy picture for every picture or shape like the one in the box and circle them all.',
      note: {
        mistake: 'Children circle the first two or three they see and stop, or they circle a picture that is only the same color or nearly the same shape.',
        words: 'Ask: "Is it exactly like the one in the box? Did you find them all? How do you know?" Teach a path for the eyes: "Start at the top and go row by row, like reading."',
        watch: 'Watch who searches in order and who jumps around the page. Children who jump around miss pictures; give them a strip of paper to slide down the page row by row.',
      },
    },
    'K:compare-size-extremes': {
      title: 'Biggest and tallest',
      objective: 'Children compare the pictures in a row and circle the biggest or the tallest one.',
      note: {
        mistake: 'Children say "big" for everything: a tall thing and a long thing are both "the big one." Some circle the picture that sits highest on the page and not the tallest one.',
        words: 'Use a different word for each kind of size: "We say TALL for things that stand up, like a tree. We say BIG for the one that takes up the most room." Ask: "Do they all stand on the same line? Look from the bottom to the top. Which one is the TALLEST?" Ask for the opposite too: "Which one is the shortest?"',
        watch: 'Watch who looks at every picture in the row before circling. A child who circles after looking at only two should touch each picture first and say its size word.',
      },
    },
    'K:order-by-size': {
      title: 'Put them in order by size',
      objective: 'Children put three or five pictures in order from smallest to biggest and number them, starting with 1 for the smallest.',
      note: {
        mistake: 'With three pictures children find the smallest and the biggest and guess the middle one. With five they get the two ends and mix up the middle, or they number the pictures from left to right without looking at the sizes.',
        words: 'Say: "Find the smallest. That one is number 1. Now look at the ones that are left. Which is the smallest NOW?" Use "smaller than" and "bigger than": "The cup is bigger than the spoon and smaller than the pot."',
        watch: 'Watch who starts over with "the smallest of what is left" each time. That child has a method and can do five pictures; a child who guesses should stay with three.',
      },
    },
    'K:patterns': {
      title: 'What comes next?',
      objective: 'Children read a repeating pattern aloud, find the part that repeats, and circle what comes next.',
      note: {
        mistake: 'Children look only at the last picture and choose one that is different from it. That works for a two-part pattern and fails for a three-part one. Others copy the first picture of the row every time.',
        words: 'Read the pattern aloud together and tap it: "apple, pear, apple, pear, apple…" Stop and let the class say the next one. Ask: "Which part keeps coming back?" Call it "the part that repeats."',
        watch: 'Watch who can tell you the part that repeats ("apple, pear"), not only the next picture. A child who chants the row correctly and circles the wrong picture stopped chanting before looking at the choices: have the child chant the row again, say the next word aloud, and only then look for it among the choices.',
      },
    },
    'K:one-to-one': {
      title: 'One for each',
      objective: 'Children give each object exactly one partner by drawing a line, and say whether there are enough.',
      note: {
        mistake: 'Children draw two lines to the same partner, or skip one that sits a little off to the side. When one is left without a partner, they draw a line to a picture that already has one so that nobody is left out.',
        words: 'Say: "One for you, one for you. Each one gets ONE partner." When something is left over: "Is there one for each? Which group has more?" Use "enough" and "not enough."',
        watch: 'Watch the lines: one line from each picture and one line to each picture. A child who gives one picture two lines should put a finger on each partner as it is used ("this one is taken"). A child who can tell you "there are not enough" without counting understands matching.',
      },
    },
    'K:compare-groups': {
      title: 'More and fewer',
      objective: 'Children compare two groups and tell which has more and which has fewer.',
      note: {
        mistake: 'Children choose the group that takes up more room or has the bigger pictures, not the one with more in it. "Fewer" is a new word for most children; on that page they circle the bigger group again.',
        words: 'Ask: "Which group has MORE? How can we check?" Check by matching one to one or by counting both. Say "fewer" for things and "less than" for numbers: "There are fewer cats than dogs. Five is more than three. Three is less than five." Show two equal groups once: "These two groups have the same number."',
        watch: 'Watch what children do when the smaller group is spread out wide. A child who counts or matches before answering is ready; a child who answers at a glance and is wrong should line the two groups up.',
      },
    },
    'K:count-how-many': {
      title: 'Count and write how many',
      objective: 'Children count up to 10 pictures, say the last number as how many there are, and write that number.',
      note: {
        mistake: 'Children say the numbers faster than they touch, so they count a picture twice or skip one. Asked "How many?" after counting, some start counting again and do not say the last number.',
        words: 'Say: "Touch one, say one number." After the count ask: "So how many are there?" and wait for one number, not a recount. On the ten frame: "The top row is full. That is five. Six, seven."',
        watch: 'Watch the finger and the voice together. A child whose voice runs ahead of the finger should cross out each picture while saying its number. A backward 3 or 7 in the written answer is a handwriting matter, not a counting mistake.',
      },
    },
    'K:subitize': {
      title: 'How many? Look fast',
      objective: 'Children look at a small group for a moment and say how many there are without counting one by one.',
      note: {
        mistake: 'Children count every dot with a finger even for two or three. In five or six dots they do not see the smaller groups (a four and a two), so they have nothing to do but count.',
        words: 'Show a group for two seconds, cover it, and ask: "How many did you see? HOW did you see them?" Accept "I saw two and two." Say: "You did not count. Your eyes knew."',
        watch: 'Watch for moving lips and pointing fingers: those children are still counting by ones. Stay with one to four for them and use dice patterns, which look the same every time.',
      },
    },
    'K:count-out-n': {
      title: 'Make a group of that many',
      objective: 'Children read a number and color or draw exactly that many, stopping when they reach the number.',
      note: {
        mistake: 'Children color all the pictures in the row. They can count a group that is already there, but they do not stop when they reach the number they were given.',
        words: 'Say: "The number says 4. Color one, two, three, four. STOP. Is that four? Check." Have the child say the number before starting and again at the end: "I need four. I have four."',
        watch: 'Watch who stops alone at the number and who needs your "stop." A child who needs it should keep the number in sight: one finger on the number while the other hand colors.',
      },
    },
    'K:numeral-formation': {
      title: 'Write the numbers 0 to 9',
      objective: 'Children trace and write the numbers 0 to 9, starting each one at the dot and following the arrows.',
      note: {
        mistake: 'Children start at the bottom and draw the number like a picture, so 8 comes out as two circles stacked up and 9 as a ball with a stick added. Reversed 2, 3, 5, and 7 are common at this age and are not a sign of a problem.',
        words: 'Give every number a short saying and use the same one all year, for example for 5: "Down, around, then put on its hat." Ask: "Where does it start? At the orange dot. Which way does the arrow go?"',
        watch: 'Watch the hand, not the finished page: a number that looks right can be written from the bottom up. Check the pencil grip while children trace, and correct one number at a time.',
      },
    },
    'K:shape-naming': {
      title: 'Name the shape',
      objective: 'Children name circles, squares, triangles, and rectangles, even when a shape is turned, long, or thin.',
      note: {
        mistake: 'Children know a triangle only when it sits flat with the point on top. A triangle standing on its point is "upside down" or "not a triangle," and a square on its corner becomes "a diamond."',
        words: 'Turn a shape in your hand and ask: "Is it still a triangle? Why?" Give the reason every time: "It has three straight sides and three corners, so it is a triangle." For the turned square: "Four sides all the same length and four square corners. It is still a square."',
        watch: 'Listen to what children say about the long, thin triangle and the turned square. A child who counts the sides to decide is using the rule; a child who says "it does not look like one" is going by the picture.',
      },
    },
    'K:count-sides': {
      title: 'Count the sides',
      objective: 'Children count the sides of a shape, write the number, and match shapes to their number of sides.',
      note: {
        mistake: 'Children count around the shape and forget where they started, so one side is counted twice. Some count sides and corners together, and some say a circle has one side.',
        words: 'Say: "Put a mark on the side where you start. Trace each side with your finger and count. Stop at your mark." Ask: "Is a side straight? Then how many straight sides does a circle have?" (None.)',
        watch: 'Watch who marks a starting side. Check the six-sided shapes first: that is where a double count shows.',
      },
    },
    'K:compose-shapes': {
      title: 'Build shapes from pieces',
      objective: 'Children put tangram pieces together to make a figure and show where the pieces meet inside a shape.',
      note: {
        mistake: 'Children lay a piece down the way it came off the page and give up when it does not fit. They do not think of turning it or flipping it over. On the drawing page they draw a line where no two pieces could meet.',
        words: 'Say: "Turn it. Flip it. Slide it." Name what happened: "Two small triangles made a square." Ask: "Which piece fills this corner? Which side of the piece is the long side?"',
        watch: 'Watch who turns a piece before asking for help. Scissors are part of this lesson: a child who cuts off a corner cannot make the pieces fit, so cut the sets ahead of time for children who are still learning to cut on a line.',
      },
    },
    'K:mirror-image': {
      title: 'Mirror pictures',
      objective: 'Children look at a picture and choose the one that shows it the way a mirror would.',
      note: {
        mistake: 'Children circle the picture that is exactly the same, or the one that is upside down. They do not yet see that a mirror swaps left and right and keeps top and bottom.',
        words: 'Hold a small mirror beside a picture and ask: "The dog looks left. Which way does the dog in the mirror look?" Say: "In a mirror, left and right trade places. Up stays up."',
        watch: 'Notice which wrong answer a child picks. The same picture means the child has not seen the swap; the upside-down picture means the child is turning, not flipping. Show the difference: draw a dog with a thick marker on one half of a folded sheet, hold it against the window and trace it on the other half, then open the sheet. The two dogs face each other, and neither one is upside down.',
      },
    },
    'K:count-forward-missing': {
      title: 'Fill in the missing numbers',
      objective: 'Children count along a number strip to 10 and to 20 and write the numbers that are missing.',
      note: {
        mistake: 'Children can count from 1 but cannot say what comes after a number in the middle. To fill a gap after 7 they go back and whisper from 1. In the teens they say "three-teen" and "five-teen," skip 13 or 15, or write the digits in the order they hear them: 31 for thirteen, 71 for seventeen.',
        words: 'Ask: "What comes right after 7? Say it without starting at 1." Count on together from different numbers: "Start at 6. Seven, eight, nine." Say the teen numbers slowly and point: "thir-teen, four-teen, fif-teen."',
        watch: 'Watch who whispers from 1 for every gap. That child needs many short "start at… and count on" turns aloud before more pages. Check 11, 12, 13, and 15, the numbers that do not sound like what they are.',
      },
    },
    'K:dot-to-dot-sequence': {
      title: 'Connect the dots in order',
      objective: 'Children connect numbered dots in counting order, from 1 to 10 and from 11 to 20, to finish a picture.',
      note: {
        mistake: 'Children connect a dot to the nearest dot, not to the next number. They read 12 as 21, or they lift the pencil, lose their place, and cannot find where they were.',
        words: 'Say: "Say the number you are on. What comes next? Find it BEFORE you draw." Keep one finger on the dot you are on and look for the next number with your eyes.',
        watch: 'Watch the first three lines. A child who looks for the next number before moving the pencil will finish alone. If the picture comes out wrong, count aloud along the lines together to find where it left the order.',
      },
    },
    'K:before-after-back': {
      title: 'Before, after, and counting back',
      objective: 'Children write the number that comes before and the number that comes after, and count backward from 10.',
      note: {
        mistake: '"After" is easy because it is the next counting word. "Before" is hard: children write the number after again, or count up from 1 to find it. Counting back, they skip a number or jump from 10 to 8.',
        words: 'On a number line: "Put your finger on 6. The number BEFORE is one step back. The number AFTER is one step forward." Count down like a rocket: "10, 9, 8…" Say "one less" for before and "one more" for after.',
        watch: 'Watch who finds the number before without counting up from 1. Children who cannot should use the number line for every item; take it away only when they stop looking at it.',
      },
    },
    'K:ordinal-position': {
      title: 'First, second, third',
      objective: 'Children find the first, second, third, and later places in a line, counting from the end that is marked.',
      note: {
        mistake: 'Children always count from the left, even when the arrow or the flag is on the right. Some mark that many pictures (three pictures for "third") and not the one picture in third place.',
        words: 'Ask first: "Where does the line start? Find the arrow." Then: "First, second, third. The THIRD one is only this one." Line up five children and ask: "Who is second? Now turn around. Who is second now?"',
        watch: 'Watch what happens when the start is on the right. A child who looks for the arrow before counting has the idea. Keep "three" and "third" apart: "Three is how many. Third is which one."',
      },
    },
    'K:colour-by-number': {
      title: 'Color by number',
      objective: 'Children read the number in each part of a picture and color the part with the color the key gives for that number.',
      note: {
        mistake: 'Children color by what the thing should look like ("grass is green") and not by the number. They mix up 6 and 9, or color a part next door because they did not look inside it for its number.',
        words: 'Say: "Find the number inside the part. Find that number in the key. What color does the key say?" Do one color at a time: "Find every 3 first. All the 3s are blue."',
        watch: 'Watch who goes back to the key for each part. One color at a time keeps the key in mind and shows you quickly who cannot yet tell 6 from 9.',
      },
    },
    'K:classify-count-kinds': {
      title: 'Count each kind',
      objective: 'Children look at a mixed group of pictures, count each kind separately, and write how many of each there are.',
      note: {
        mistake: 'Children count everything on the page as one group, or they count one kind and lose track because the pictures are mixed. A picture gets counted twice or not at all.',
        words: 'Say: "We are counting only the birds now. Is this a bird? Then mark it." Teach children to cross out or dot each picture as they count it. Ask afterward: "Which kind has the most?"',
        watch: 'Watch who marks what has been counted. A child who marks and still gets a wrong number has a counting problem: count aloud together, touching each mark. A child who does not mark has a keeping-track problem: hand that child a crayon and have every counted picture crossed out.',
      },
    },
    'K:tally-marks': {
      title: 'Tally marks',
      objective: 'Children show a count with tally marks, crossing the fifth mark over the first four, and read a tally back as a number.',
      note: {
        mistake: 'Children draw five upright marks and cross them with a sixth, so every bundle is worth six. Others never cross and draw one long row of single marks.',
        words: 'Chant while drawing: "One, two, three, four, and SHUT THE GATE." Say: "The gate is number five. It is not an extra one." To read a tally, start from the bundle: "Five… six, seven." With two bundles: "Five, ten… eleven."',
        watch: 'Watch children draw: count the upright marks before the cross goes on. When they read a tally, listen for "five" said at once for a bundle and not "one, two, three, four, five."',
      },
    },
    'K:estimate': {
      title: 'Take a good guess',
      objective: 'Children look at a group, choose the better guess for how many there are, and then check by counting.',
      note: {
        mistake: 'Children count quietly before they guess, because they want to be right. Or they give a wild number ("a hundred") for eight things. Both show that a guess is not yet a thinking step for them.',
        words: 'Say: "A good guess has a math name: an ESTIMATE. An estimate is not a count. Look, think, and tell me: closer to 5 or closer to 20?" After the count: "Was your estimate close? It does not have to be the same." Praise close estimates, not only exact ones.',
        watch: 'Watch who changes the circled guess after counting. Tell the class that a guess stays as it was; the count is a second answer. Notice who uses a group they know ("that looks like a full ten frame").',
      },
    },
    'K:days-of-week': {
      title: 'The days of the week',
      objective: 'Children say the seven days of the week in order and put the days in order on a page.',
      note: {
        mistake: 'Children can sing the days in order but cannot start in the middle: asked what comes after Wednesday, they sing from the beginning. Tuesday and Thursday get mixed up because they start alike.',
        words: 'Ask every morning: "What day is it today? What day was yesterday? What day will it be tomorrow?" Point to the words while the class says them. For the two T days, look at the second letter: "Tuesday starts with T-U. Thursday starts with T-H, like \'three.\'"',
        watch: 'Watch who has to start the whole song for each answer. On the copying page, check that each word is copied letter by letter from the word bank; that page is reading and writing as much as math.',
      },
    },
    'K:combine-groups': {
      title: 'How many altogether?',
      objective: 'Children put two groups together, count all of them, and write how many there are in all.',
      note: {
        mistake: 'Children count the first group, then start again at 1 for the second group and write that second number. They count two groups; they do not yet join them.',
        words: 'Say: "Here are three. Here are two. Push them together. How many ALTOGETHER?" Count across the gap without stopping: "one, two, three… four, five." Then say and write the sentence: "Three and two make five. Three plus two equals five: 3 + 2 = 5." Use "altogether" and "in all" for the total.',
        watch: 'Watch what happens at the gap between the groups. A child who keeps counting has joined them. A child who says the first number and counts on from it is already using a first-grade strategy; let it be.',
      },
    },
    'K:number-bonds-k': {
      title: 'Number bonds to 5 and to 10',
      objective: 'Children break a number up to 10 into two parts and find the part that is missing in a number bond.',
      note: {
        mistake: 'Children add the two numbers they see. When the bond shows 5 on top and 2 below, they write 7 in the empty circle, because every number so far was something to add.',
        words: 'Point and say: "The top circle is the WHOLE. The two circles below are the PARTS." Ask: "Five is the whole. Two is one part. What is the other part?" Show it with five counters: "Two here. How many are over there?"',
        watch: 'Look for answers bigger than the whole: that child added. Go back to counters and split one group in different ways before returning to the page.',
      },
    },
    'K:odd-even-pairing': {
      title: 'Odd or even?',
      objective: 'Children pair up the pictures in a group and say that the number is even when every one has a partner and odd when one is left over.',
      note: {
        mistake: 'Children circle three pictures together or leave out a picture that is far away, so they end with a leftover that should not be there, or with none when there should be one. Some think "odd" means strange.',
        words: 'Say: "Two by two. Does everyone have a partner?" Then name it: "No one is left over. Six is EVEN." "One is left over. Seven is ODD." Line the class up in pairs to see it.',
        watch: 'Check that every circle holds exactly two. This is a first look at a second-grade idea, an extra for a class that is ready: the goal is careful pairing, not knowing by heart which numbers are odd.',
      },
    },
    'K:fact-fluency-colour-code': {
      title: 'Add and subtract to color',
      objective: 'Children solve addition and subtraction facts and color each part of a picture with the color for its answer.',
      note: {
        mistake: 'Children see two numbers and add, even when the sign is a minus. Or they solve the fact correctly and then color by the first number in the problem and not by the answer.',
        words: 'Say: "Circle the sign first. Is it plus or minus?" Then: "Write the answer small in the part. Now look in the code for THAT number." Let children use fingers or a ten frame; this page is practice, not a speed test.',
        watch: 'Watch who writes the answers before coloring. The picture shows mistakes by itself: a part in the wrong color is a fact to check together. The easier pages stay within 5, where Kindergarten children are expected to be fluent; the standard pages go to 10, so keep counters or a ten frame at hand.',
      },
    },
    'K:number-bonds-20': {
      title: 'Partners that make 20',
      objective: 'Children find the number that goes with a given number to make 20, using the partners that make 10.',
      note: {
        mistake: 'Children who know the partners of 10 do not use them here: for 13 and what make 20 they count up by ones from 13 and are often off by one. They do not see that 13 is 10 and 3, so its partner is the partner of 3.',
        words: 'Say: "What goes with 3 to make 10? Seven. So 13 and 7 make 20." On two ten frames: "One frame is full. In the other, 3 are filled. How many are empty?" Write the pair of facts: "3 + 7 = 10. 13 + 7 = 20."',
        watch: 'Watch who uses the partners of 10. A child who counts on by ones for every bond should go back to the bonds of 10; this page reaches into first grade and is not for everyone yet.',
      },
    },
    'K:heavy-light': {
      title: 'Heavier or lighter?',
      objective: 'Children look at two things from everyday life and circle the one that is heavier.',
      note: {
        mistake: 'Children circle the bigger picture. A big balloon is chosen over a small rock, because bigger has always meant more.',
        words: 'Bring a balloon and a rock, or a big empty box and a small full bottle: "Which is bigger? Which is heavier? Hold one in each hand." Say: "Big is how much room it takes up. Heavy is how hard it pulls down on your hand."',
        watch: 'Look at the pairs where the smaller thing is the heavier one; those tell you who understands. Let children be the balance: arms out, one thing in each hand, and the heavy side goes down.',
      },
    },
  },
};
