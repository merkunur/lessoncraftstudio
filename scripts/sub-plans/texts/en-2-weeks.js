'use strict';
/**
 * Guest teacher scripts, English (US), Grade 2: the week days of Part 5.4. New teaching points get their whole
 * script; points whose script lives in another text file get what is true of a NEW worksheet type (byType) or a week
 * script for a type the first days use ('<type>@w': true of every page of the type, where the type's own script names
 * the page of a day of Parts 5.1-5.2, with its reference answers). Written from the pages' pictures and printed text.
 * Nothing here changes a block of the 24 days. Merged into frontend/content/sub-plans/scripts/en.json by
 * scripts/sub-plans/apply-texts.js.
 */
const sortScript = (bins, example, note) => ({
  say: '"The page has pictures and boxes: ' + bins + '. Draw a line from each picture to the box where it belongs."',
  first: 'Read the words on the boxes aloud and name every picture together. Do the first picture together: ' + example + ' Draw the line from its dot to its box.' + (note ? ' ' + note : ''),
  stuck: 'Ask the question of the page about one picture at a time. If the child is not sure, ask what the child knows about it, and let the child choose and say why.',
});
const text = (task, tip) => ({
  say: '"Read the text at the top of the page carefully. Then ' + task,
  first: 'Read the title and the first part of the text aloud while the children follow. Then the children read it again on their own. Read the first question aloud together and ask, "Where in the text can we find this?" Find the sentence together and write the first answer together.' + (tip ? ' ' + tip : ''),
  stuck: 'Read the question with the child and look for its key words in the text together. Point to the part that has the answer and have the child read it aloud before writing.',
});
const writing = (say, first) => ({
  say,
  first,
  stuck: 'Have the child tell you the idea aloud first; then say, "Write that." Help with the first words of a sentence, and let the child spell words the way they sound. A short, finished piece is better than a long, unfinished one.',
});

module.exports = {
  loc: 'en',
  points: {
    // ---- new points ----
    '1:bar-model': {
      say: '"Each bar shows a whole and its two parts. One number is missing. Write the missing number in the box."',
      first: 'Draw a bar on the board split into two parts, with 60 on top as the whole and 20 in one part. Ask, "What goes with 20 to make 60?" Count on by tens together: 30, 40, 50, 60: forty. Write it in the empty part. Tell the children to check whether the missing number is a part or the whole.',
      stuck: 'Ask, "Is the whole missing? Then add the two parts. Is a part missing? Then take the other part away from the whole."',
    },
    '1:check-answers': {
      say: '"Someone has already solved these problems, but some answers are wrong. Check each one. If it is wrong, put an X in the small box and write the right answer in the big box. If it is right, leave both boxes empty."',
      first: 'Do the first problem on the board together: solve it yourself and compare with the answer that is printed. "Is it the same? Then leave both boxes empty. If not, an X and the right answer." Tell the children to solve each problem first and only then look at the printed answer.',
      stuck: 'Have the child cover the printed answer, solve the problem with fingers or a drawing, and then uncover the answer and compare.',
    },
    '2:adjective-or-adverb': {
      say: '"An adjective tells about a noun: a brave dog. An adverb tells how something is done: the dog ran bravely. Many adverbs end in -ly. Circle the word that fits each sentence, then draw an arrow to the word it tells about."',
      first: 'Write "a quick fox" and "the fox ran quickly" on the board. Ask which word tells about the fox and which tells how it ran. Read the first sentence on the page aloud with both choices and circle the one that fits together. Read the rule box about words ending in y aloud.',
      stuck: 'Ask, "Does the word tell about a thing, or about how someone does something?" A thing gets the adjective; how someone does something gets the -ly word.',
    },
    '2:bossy-r-ar-or': {
      say: '"When r comes after a vowel, it bosses the vowel and changes its sound. A-r says ar, like in park. O-r says or, like in storm. Read each word and write it under ar or or."',
      first: 'Write park and storm on the board and read them with the class. Read the first word on the page aloud together, listen for ar or or, and write it under its heading. Then read the second part of the page aloud together.',
      stuck: 'Have the child look at the letter before the r: a-r is ar, o-r is or. Read the word together slowly.',
    },
    '2:bundle-ten-ones': {
      say: '"Count the blocks in each picture. Ten small cubes make a ten, and ten tens make a hundred. Write the number they show."',
      first: 'Draw a flat (a hundred), two rods, and four small cubes on the board. Count together: "one hundred, one hundred ten, one hundred twenty, and four more: one hundred twenty-four." Tell the children that when there are ten or more cubes of one kind, they bundle ten into the next place. Do the first picture together.',
      stuck: 'Have the child count each kind first: hundreds, tens, ones. If there are more than nine ones, circle ten of them: that is one more ten.',
    },
    '2:cardinal-directions': {
      say: '"The four directions are north, east, south, and west. On a compass rose, north is at the tip that points up. Write the three missing letters in the empty boxes."',
      first: 'Draw a compass rose on the board: N at the top, S at the bottom, E on the right, W on the left. Say "Never Eat Soggy Waffles" going round from the top. On the page the orange tip points north, and it may not point up: turn the page so the orange tip points up, then fill in the boxes. Do the first rose together.',
      stuck: 'Have the child put a finger on the orange tip and say north, then go around clockwise: east, south, west.',
      byType: {
        'G2-371': {
          say: '"Look at the map. Start at the first picture of each question, look the way the word says, and circle the picture you see in that direction."',
          first: 'Find the compass rose on the map together and say the four directions. Read the first question aloud, put a finger on its first picture, and move the finger the way the word says. Circle the picture you reach. Use the map key to name the pictures.',
          stuck: 'Have the child point to the direction on the compass rose first, then move a finger the same way across the map.',
        },
      },
    },
    '2:character-challenge': text('write the answer to each question."', 'Ask the class, "What is the character\'s problem? What does the character do about it?"'),
    '2:continents': {
      say: '"The map shows the seven continents, each with a number. Write the name of each continent on its line. The names are in the box."',
      first: 'Read the seven names in the box aloud together. Point to North America on the map: "This is where the United States is." Find its number together and write North America on that line. The children do the rest, crossing each name out of the box when they use it.',
      stuck: 'Give clues: "Antarctica is the icy one at the bottom. South America is under North America. Africa is the big one in the middle." Let the child find each one on the map.',
    },
    '2:diagram-and-text': text('use the diagram to answer the questions. Questions 1 to 3 ask about the diagram; the others ask about the text."', 'Show the children how to follow the arrows of the diagram from the first picture to the last.'),
    '2:draft-an-opinion': writing('"Today you write an opinion piece: what you think and why. Circle one question. Write your opinion, give your reasons, and end with a closing sentence."', 'Read both questions aloud and let a few children say their opinion and one reason. Write the parts on the board: I think … because … Also … That is why … Each child circles one question and writes.'),
    '2:er-ir-ur': {
      say: '"Er, ir, and ur all say the same sound, like in her, first, and turn. Read each word and write it under er, ir, or ur."',
      first: 'Write her, first, and turn on the board and read them with the class. Read the first word on the page together and look at its letters: which spelling does it use? Write it under that heading. Read the second part of the page aloud together.',
      stuck: 'Point out that the sound is the same, so the child looks at the letters, not the sound: is it e-r, i-r, or u-r?',
    },
    '2:fable-lesson': text('write its lesson, the thing a reader learns from it, and what a character does that shows the lesson."', 'After reading, ask, "What does the story teach us?"'),
    '2:fraction-of-a-set': {
      say: '"Each row shows a group of pictures and a fraction. Circle that part of the group, and write how many that is."',
      first: 'Draw 8 circles on the board. Say, "One half means two equal groups. Half of 8 is 4." Circle 4. For one fourth, make four equal groups and circle one group. Do the first row together.',
      stuck: 'Have the child share the pictures into as many equal groups as the bottom number says, one picture at a time. Then circle as many groups as the top number says.',
    },
    '2:friendly-letter': {
      say: '"A friendly letter has five parts: the date, the greeting, the body, the closing, and the signature. Write the name of each part on its line, using the word bank."',
      first: 'Read the five parts in the word bank aloud and find each one in the letter on the page together: the date at the top, "Dear…" is the greeting, the long middle is the body, "Your friend" is the closing, and the name at the end is the signature. Do the first one together.',
      stuck: 'Ask, "Where does a letter start? Who is it to? Who wrote it?" Point to each part as you ask.',
    },
    '2:life-cycles': {
      say: '"A butterfly grows in four stages. Write the four stage names from the word bank on the lines under their pictures. Then cross out the name that is not part of a butterfly\'s life."',
      first: 'Read the word bank aloud together. Ask, "What does a butterfly start as?" An egg. Find the egg picture and write egg under it together. Talk through the order: egg, caterpillar, chrysalis, butterfly. A tadpole is a baby frog.',
      stuck: 'Have the child follow the arrows from the egg and name what each picture shows.',
      byType: {
        'G2-366': {
          say: '"Look at each stage, like an egg, a tadpole, or a caterpillar. Write its letter in a box under the animal it will grow into. Some boxes stay empty."',
          first: 'Name the grown-up animals together, then look at the first stage and ask, "What will this become?" Write its letter in a box under that animal.',
          stuck: 'Ask the child which animal the stage looks a little like, or say what the stage is called: a tadpole becomes a frog, a caterpillar becomes a butterfly.',
        },
      },
    },
    '2:line-plots': {
      say: '"A line plot shows how many with X marks above each number. Count the X marks above each number and write how many."',
      first: 'Draw a short number line on the board with a few X marks above the numbers. Count the X marks above one number together and write the count. Do the first question on the page together.',
      stuck: 'Have the child put a finger on the number and count the X marks straight above it, from the bottom up.',
    },
    '2:plan-informative-piece': writing('"An informative piece teaches facts. It has a topic sentence that tells what it is about, facts, and a closing sentence. Read the parts at the top, then do each part of the page."', 'Read the box with the parts of an informative piece aloud. Do the first task of the page together: find the topic sentence, a fact, or the closing sentence. Then the children go on.'),
    '2:road-signs': {
      say: '"Each road sign has a letter. Some signs tell a rule, and some warn about danger. Write the letter of each sign in the boxes of its group."',
      first: 'Look at the signs together and say what each one means. Ask about the first sign, "Does it tell drivers what they must do, like stop? Or does it warn them about something ahead?" Write its letter in the right group.',
      stuck: 'Talk through the shape: many warning signs are yellow diamonds, many rule signs are white rectangles or red, like STOP.',
      byType: {
        'G2-361': {
          say: '"Read each sentence. Circle the one road sign that fits it."',
          first: 'Read the first sentence aloud and look at the three signs next to it. Ask, "Which sign tells drivers about this?" Circle it together. Read each sentence aloud for children who need it.',
          stuck: 'Read the sentence again and name the three signs; ask which one would help in that place.',
        },
      },
    },
    '2:short-or-long-vowel': {
      say: '"A short vowel says its sound: hop. A long vowel says its name: hope. Read each word and write it under short vowel or long vowel."',
      first: 'Write hop and hope on the board and read them. Point out the e at the end and the two vowels together that often make a long sound, like ee and ay. Read the first word on the page together and decide.',
      stuck: 'Say the word slowly and hold the vowel. Then say the letter\'s name: if the word says the name, it is long.',
    },
    '2:steps-in-order': text('write the four steps in order. The first word of each step is given."', 'Ask the class to look for the words first, then, next, and last in the text.'),
    '2:subtract-with-blocks': {
      say: '"The first number is drawn on the tens-and-ones mat. Are there enough ones to take away? Mark yes or no. If there are not enough, trade one ten for ten ones. Then subtract and write the answer."',
      first: 'Do the first problem on the board: draw the tens and ones of the first number. Ask, "Can we take away the ones?" If not, cross out one ten and draw ten more ones. Then cross out the ones and tens to take away and count what is left.',
      stuck: 'Have the child compare the ones: "Do we have more ones than we take away?" If not, trade a ten. Count the leftover tens and ones together.',
    },
    '2:suffixes-ful-less-ly': {
      say: '"A suffix is a word part at the end. -ful means full of, -less means without, and -ly tells how. Circle the base word in each word and underline the suffix. Then match each word to its meaning."',
      first: 'Write playful on the board: circle play, underline -ful. Ask, "What does playful mean? Full of play." Do the same with toothless. Do the first word on the page together.',
      stuck: 'Cover the suffix with a finger and read the base word. Then add the suffix and ask what the whole word means.',
    },
    '2:true-story-plan-draft': writing('"A true story tells what really happened, in order. Read the parts of a true story at the top, then do each part of the page."', 'Read the box at the top aloud: beginning, middle with time words, and an ending. Do the first task together. For a plan, let a few children say their idea first.'),
    '2:two-step-word-problems': {
      say: '"Read each story. Write the question if it is missing, then the equation and the answer."',
      first: 'Read the first story aloud. Ask, "What do we need to find out?" Write the equation on the board together and solve it with tens and ones. Then the children read the other stories on their own.',
      stuck: 'Read the story with the child and underline the numbers. Ask, "Are things put together, or taken away?" Draw a quick bar to show the parts and the whole.',
      byType: {
        'G2-510': { say: '"Read each story. In the bar model, write the two numbers you know and a question mark for the number you need. Then solve."', first: 'Read the first story aloud. Ask, "Do we know the start? The change? The end?" Write the two numbers you know in the bar and a question mark where the missing number goes. Solve it together.' },
        'G2-511': { say: '"Each story has two steps. Do the first step, then the second step. Write the numbers in the boxes."', first: 'Read the first story aloud. Ask, "What happens first? What happens next?" Do step a together, then step b with the answer of step a.' },
      },
    },
    '2:two-versions-of-a-tale': {
      say: '"Two versions of one tale can have different characters and settings. Read both versions. Sort each fact: is it in version 1, version 2, or both?"',
      first: 'Read the two versions aloud while the children follow. Then read the first fact aloud and ask, "Which version tells this?" Write it in the right place together.',
      stuck: 'Read the fact with the child and look for it in each version, one at a time.',
    },
    '2:vowel-teams-long-a-e-o': {
      say: '"Two vowels together can make one long sound. Ai and ay spell long a, ee and ea spell long e, oa and ow spell long o. Read each word and write it under its vowel sound."',
      first: 'Write rain, play, feet, eat, boat, and snow on the board and read them. Read the first word on the page together, find its vowel team, and write it under its sound.',
      stuck: 'Have the child find the two vowels together and say the long sound they make.',
    },
    '2:words-in-real-life': {
      say: '"Describing words tell what real things are like: hot soup, a soft blanket. Read each sentence and do what the page asks."',
      first: 'Read the first part of the page aloud with the class and do its first item together. Ask, "What is this thing really like? Which word fits?"',
      stuck: 'Ask the child to think of a real one: "Have you touched one? Is it hard or soft, hot or cold?"',
    },
    'K:grid-copy': {
      byType: {
        'K-299': { say: '"Use the letter and number of each square to copy the picture onto the empty grid."' },
        'K-300': { say: '"A bigger grid: find each square by its letter and number, and copy the picture onto the empty grid."' },
      },
    },

    // ---- new types and week scripts of points whose script is in another text file ----
    '1:alphabetical-order': {
      byType: {
        'G1-264': { say: '"Put the words in ABC order. Two pairs of words start with the same letter: then look at the second letter to decide."', first: 'Point to the alphabet strip at the top. Read the six words aloud with the class. Find two words that start with the same letter together and ask, "Which second letter comes first in the alphabet?" Number the words 1 to 6 together, then the children write them in order.' },
      },
    },
    '1:hundreds-chart': {
      byType: {
        'G1-347': { say: '"Each puzzle piece is cut from a hundreds chart. Read the numbers on each piece, find where it fits on the empty chart, and write the numbers in."', first: 'Point to the empty chart and read the numbers that are printed on it. Take the first piece together: read its numbers and ask, "Where is 28 on the chart?" Count along the row to find it and write the numbers of the piece in.', stuck: 'Have the child find the tens of the number first: 28 is in the row of the 20s. Then count along the row.' },
      },
    },
    '1:map-key': {
      byType: {
        'G1-379': { say: '"The map key shows little pictures and what they stand for. Find each thing from the key on the map, and write how many there are in its box."', first: 'Read the map key aloud together. Find the first thing of the key on the map together and count it; write the number in its box. Tell the children to cross off each one they count so they do not count it twice.', stuck: 'Have the child look at one picture of the key and find all of them on the map, one at a time.' },
        'G2-505': { say: '"Follow the arrows from the flag: each arrow is one step. One arrow is wrong: the path does not end on the star. Find the wrong arrow and fix it."', first: 'Do the first puzzle on the board: put a finger on the flag and move one square for each arrow, saying "up, right, right." See where you land. Then find the arrow that takes the path the wrong way and cross it out.', stuck: 'Have the child move a finger one square per arrow and stop when the path goes off course: that arrow is the wrong one.' },
      },
    },
    '1:number-walls': {
      byType: {
        'G1-289': { say: '"The top brick of each wall is given this time. Work downward: the two bricks under a brick add up to it, so take away to find the missing one."', first: 'Draw a small wall on the board with 17 on top and 9 below it. Ask, "9 and what make 17?" Write 8. Tell the children to start where only one brick is missing.' },
      },
    },
    '1:skip-counting': {
      byType: {
        'G1-279': { say: '"The tick marks count by fives, up to 100. Write the number each arrow points to."', first: 'Count by fives to 100 together. Draw the first line on the board and count the marks from the nearest printed number: "50, 55, 60." Write the number at the arrow.', stuck: 'Have the child put a finger on the printed number before the arrow and count on by fives, one mark at a time.' },
        'G1-281': { say: '"This line goes past 100. Count by tens to each arrow and write the number."', first: 'Count by tens to 120 together. Draw the first line on the board, start at the nearest printed number, and count each mark by ten to the arrow.', stuck: 'Have the child put a finger on the printed number before the arrow and count on by tens, one mark at a time.' },
      },
    },
    '1:word-problems': {
      byType: {
        'G1-567': { say: '"Read each story. In the bar model, write the two numbers you know and a question mark for the missing part. Then write the equation and the answer."', first: 'Read the first story aloud. Ask, "Do we know the whole? Which part do we know?" Write the numbers in the bar together and a question mark in the missing part. Solve it together.', stuck: 'Draw the bar with the child: the whole on top, the parts below. Put the numbers of the story where they belong.' },
        'G1-568': { say: '"Read each story. Something happened in the middle. In the bar model, write the two numbers you know and a question mark for the missing number. Then solve."', first: 'Read the first story aloud. Ask, "How many at the start? How many at the end? What changed?" Write the numbers in the bar together and solve.', stuck: 'Act the story out with fingers: start with the first number, and ask how many went away or came to make the last number.' },
        'G1-569': { say: '"Read each story. We do not know how many there were at the start. Write the two numbers you know and a question mark in the bar model. Then solve."', first: 'Read the first story aloud. Ask, "What do we know? The change and the end. What is missing? The start." Write the numbers in the bar together and solve.', stuck: 'Have the child count back from the end, or think: "What number and the change make the end?"' },
        'G1-571': { say: '"Read each story. If the question is missing, write a question you can answer by adding or subtracting. Then write the equation and the answer."', first: 'Read the first story aloud. Ask, "What could we ask about it?" Let a few children say a question, write one on the board, and solve it together.', stuck: 'Give the child the start of a question: "How many … in all?" or "How many … are left?"' },
        'G1-572': { say: '"Read each story. Draw it in the box. Write the equation. Then write the answer."', first: 'Read the first story aloud and draw it quickly on the board with circles. Write the equation under the drawing together and the answer with a word: "12 sandwiches."', stuck: 'Have the child draw one circle for each thing in the story, cross out the ones that go away, and count.' },
      },
    },
    '2:add-sub-within-100-practice': {
      byType: {
        'G2-313@w': { first: 'Draw the first wall on the board. Point to two bricks next to each other at the bottom and add them aloud, tens and ones; write the sum in the brick above them. Tell the children to work up the wall one row at a time.' },
      },
    },
    '2:arrays': {
      byType: {
        'G2-211@w': { say: '"Count the rows and the columns of each array. Finish the multiplication sentence: rows times columns."', first: 'Draw an array of 3 rows of 4 dots on the board. Count the rows and the columns together, then add the rows: 4 + 4 + 4 = 12. Show that 3 × 4 means 3 rows of 4. Do the first picture on the page together.' },
      },
    },
    '2:bar-graphs': {
      byType: {
        'G2-237': { say: '"Use the bar graph to answer both questions. One asks you to add, and one asks you to take away."', first: 'Read the graph together: find each bar and read its number on the side. Read the first question aloud and write its number sentence together.' },
        'G2-239': { say: '"Read the tally chart. Color one box of the bar graph for each tally mark."', first: 'Count the tally marks of the first row together: a bundle with a line across is five. Color that many boxes in its bar, from the bottom up.' },
      },
    },
    '2:calendar': {
      byType: {
        'G2-277@w': { first: 'Hold up the page and read the month and the days of the week across the top. Read the first question aloud and find the answer on the calendar together: put one finger on the date and slide up the column to its day.' },
        'G2-297@w': { first: 'Hold up the page and read the month and the days of the week across the top. Read the first question aloud and find the answer together. For "one week later," move straight down one row: seven days.' },
        'G2-298@w': { first: 'Hold up the page and read the month and the days of the week across the top. Read the first question aloud: put a finger on the date and slide up the column to read its day. Read down a column to find all the dates of one day.' },
      },
    },
    '2:cloze-context': {
      byType: {
        'G2-350@w': { first: 'Read the words in the bank aloud. Read the whole first story aloud with the class and say "blank" at each gap. Look at its pictures and decide together which word goes in each box.' },
      },
    },
    '2:column-method': {
      byType: {
        'G2-251@w': { say: '"Add or subtract one place at a time. Start with the ones, then the tens. Look at the sign of each problem first."', first: 'Write the first problem on the board, one number under the other. Point to the sign: add or take away? Work the ones column first, then the tens, and write each digit under its column.' },
        'G2-256@w': { first: 'Write the first problem on the board, one number under the other. Subtract the ones first, then the tens, and write each digit under its column. Tell the children to check the sign before they start.' },
        'G2-257@w': { say: '"Add or subtract one place at a time: ones, then tens, then hundreds. Look at the sign of each problem first."', first: 'Write the first problem on the board, one number under the other. Point to the sign. Work the ones column first, then the tens, then the hundreds. Tell the children to check the sign of every problem, because the page mixes them.' },
      },
    },
    '2:compound-words': {
      byType: {
        'G2-330@w': { first: 'Read every word on the page aloud with the class. Then read the first word again and look at its picture. Ask, "Which two words make it?" Draw one line where the second word starts, together.' },
      },
    },
    '2:describe-a-picture': {
      byType: {
        'G2-278': { say: '"Look at the picture. Use the words in the word bank to help you write about what you see. The sentence starters help you begin."', first: 'Look at the picture together and read the word bank and the sentence starters aloud. Say one sentence together using the first starter, and write it on the board. Tell the children to finish each sentence with their own words and to end it with a period.', stuck: 'Ask the child, "What do you see? What is happening?" Have the child say the sentence aloud before writing it. A child who finishes early writes one more sentence on the last lines.' },
        'G2-299@w': { say: '"Look at the picture. You are going to write three sentences about it. The beginning of each sentence is already on the line. The word bank names everything in the picture."', first: 'Look at the picture together and read the word bank and the sentence starters aloud. Say one sentence together using the first starter, and write it on the board. Tell the children to finish each sentence with their own words and to end it with a period.', stuck: 'Ask the child, "What do you see? What is happening?" Have the child say the sentence aloud before writing it. A child who finishes early writes one more sentence on the last lines.' },
      },
    },
    '2:digraphs': {
      byType: {
        'G2-372@w': { say: '"Read the sentences. Circle every letter team the title names. Write how many you found in each sentence in its box."', first: 'Read the letter team in the title aloud and say its sound. Read the first sentence aloud together and circle every one of that letter team; count them and write the number in the box.' },
      },
    },
    '2:equal-shares-shapes': {
      byType: {
        'G2-228@w': { say: '"Each shape is cut into equal parts. Color the fraction the row shows."', first: 'Draw a circle cut into two equal parts and color one: "one half." Do the first shape on the page together: read the fraction, count the parts, and color.' },
        'G2-229@w': { say: '"Each shape is cut into equal parts. Read the fraction and color that many parts."', first: 'Draw a rectangle cut into four equal parts on the board and color three: "three fourths: three of four equal parts." Do the first shape on the page together: read the fraction, count the parts, and color.' },
      },
    },
    '2:expanded-form-digit-value': {
      byType: {
        'G2-401@w': { first: 'Write 257 on the board and break it up together: 200 + 50 + 7. Then go the other way: 400 + 30 + 2 = 432. Point out that some problems put the parts together and others break the number up. Do the first one on the page together.' },
      },
    },
    '2:family-relationships': {
      byType: {
        'G2-362@w': { say: '"Now it is time to read and think. Each sentence is a riddle about one child\'s family. Read the riddle and work it out step by step. Then write the right family word from the box on the line. Some words fit more than one riddle."', first: 'Draw a family tree on the board with stick people: the child the riddles are about at the bottom; the mom and the dad above the child; a grandma and a grandpa above each parent; an aunt or an uncle beside each parent; and a cousin under the aunt. Read the first riddle aloud and follow it on the tree together, one step at a time, and write the word. Keep to the family on the page, not the children\'s own families.' },
      },
    },
    '2:find-differences': {
      byType: {
        'G2-389@w': { first: 'Show the two pictures and find one difference together. Circle it in picture 2. Read the two strips of words aloud and build the first sentence together about the thing you circled, for example "In picture 2, the … is bigger." The children find the other two and write a sentence for each.' },
      },
    },
    '2:grid-coordinates': {
      byType: {
        'G2-279': { first: 'Point to the letters across the top and the numbers down the side. Read the first square, for example B2: go across to B and down to 2. Color it in its color together. Tell the children to cross off each square on the list as they color it.' },
      },
    },
    '2:habitats-adaptations': {
      byType: {
        'G2-381@w': { first: 'Read the name of the habitat on the page aloud and talk about it: "What animals live in the ocean?" Write the animals the children name on the board, so that they can copy the spelling, and add an ocean plant: seaweed or kelp. Each child draws and labels three animals.', say: '"This is your habitat report. In the picture, draw three animals that live there and write their names. Then write a plant that grows there, and circle whether the habitat is wet or dry."', first: 'Read the name of the habitat on the page aloud and talk about it: "What animals live in the ocean?" Let a few children say ideas. Each child draws and labels three animals.' },
      },
    },
    '2:hundreds-chart-moves': {
      byType: {
        'G2-323': { say: '"Count how many jumps down and how many jumps right take you from the first number to the second. Write both numbers."', first: 'Point to the key: down is 10 more, right is 1 more. Do the first one on the board: from 4 to 35, count the tens: 14, 24, 34: three jumps down; then 35: one jump right.', stuck: 'Have the child count by tens first until the tens digit matches, then by ones.' },
      },
    },
    '2:number-line-not-from-zero': {
      byType: {
        'G2-305@w': { first: 'Draw the first number line on the board. Point out that it does not start at zero. Count the small marks from the nearest printed number to the arrow and write the number.' },
        'G2-395': { say: '"Use the numbers you see to find what the line counts by. Then write the missing numbers in the boxes."', first: 'Draw the first line on the board. Ask, "How far is it from one printed number to the next? How many marks are in between?" Find the step together, then count on to each box.' },
      },
    },
    '2:odd-even': {
      byType: {
        'G2-218@w': { first: 'Write 1, 3, 5, 7, 9 on the board and leave it there. Do the first few numbers together: point to the last digit and ask, "Is it on our list?" Circle the number if it is: it is odd.' },
        'G2-351@w': { say: '"Circle the dots two by two. Then write the number as two equal parts, and write what is left over in the small box."', first: 'Draw 7 dots on the board and circle them in pairs: three pairs and one left over. Write 7 = 3 + 3 + 1 left over. Do the first one on the page together.' },
      },
    },
    '2:plant-parts': {
      byType: {
        'G2-363@w': { say: '"We eat different parts of plants: roots, stems, leaves, flowers, fruits, and seeds. Look at each food and circle the part of the plant we eat."', first: 'Draw a plant on the board and label its parts. Name the first food on the page together and ask, "Does it grow under the ground, is it the stem, a leaf, a flower, a fruit, or a seed?" Circle the word.' },
      },
    },
    '2:pronouns': {
      byType: {
        'G2-353': { say: '"Read the sentences. A pronoun like he, she, or they takes the place of a name. Draw a line from each word in a box to the name it stands for."', first: 'Read the first sentences aloud together. Point to the first word in a box and ask, "Who is she?" Draw the line to that name.' },
        'G2-354@w': { first: 'Read the first row aloud and look at who owns the thing. Ask, "Is it a boy\'s, a girl\'s, or more than one person\'s?" Circle his, her, or their together. Read each row aloud with the class.' },
      },
    },
    '2:read-and-answer': {
      byType: {
        'G2-269@w': { first: 'Read the title and the story aloud while the children follow. Then the children read it again on their own. Read the first question and its choices aloud and ask, "Where in the story does it tell us?" Circle the answer together.' },
        'G2-270@w': { first: 'Read the title and the story aloud while the children follow. Then the children read it again on their own. Read the first question and its choices aloud and ask, "Where in the story does it tell us?" Circle the answer together.' },
      },
    },
    '2:root-words': {
      byType: {
        'G2-375@w': { first: 'Read the three words of the first stone aloud. Ask, "Which part do all three words share?" Circle it in each word and write that root word in the empty stone together.' },
      },
    },
    '2:sentence-boundaries': {
      byType: {
        'G2-281': { say: '"Each sentence lost its capital letter and its end mark. Write it again with a capital letter at the start and the right end mark: a period or a question mark."', first: 'Read the first sentence aloud. Ask, "Does it tell or ask?" Write it on the board with a capital letter and the right end mark together.' },
        'G2-282@w': { first: 'Read the first sentence aloud. Ask, "Does it tell, ask, or show strong feeling?" Write it on the board with a capital letter at the start, capitals for names, and the right end mark together.' },
        'G2-307': { say: '"Two sentences ran together. Find where the first one ends and write them as two sentences, each with a capital letter and a period."', first: 'Read the first line aloud and stop where the first idea ends. Write it on the board as two sentences together.' },
      },
    },
    '2:shopping-money': {
      byType: {
        'G2-289': { say: '"Read each story and use the prices on the shelf to answer it."', first: 'Read the prices on the shelf aloud. Read the first story aloud and find the prices of the things in it; add them together on the board.' },
        'G2-290': { say: '"Answer the shopping question on each of the four cards. Use the prices on the shelf."', first: 'Read the prices on the shelf aloud. Read the first card aloud and solve it on the board together. Two quarters are 50 cents.' },
        'G2-294': { say: '"Compare the money with the price. Circle yes if there is enough money, or no if there is not. Then write the total."', first: 'Read the prices aloud. Read the first question aloud, add the two prices on the board, and compare with the money the child has.' },
      },
    },
    '2:skip-count-3-4': {
      byType: {
        'G2-207@w': { first: 'Count by threes together to 60. Read the first row aloud and clap at each empty box. Ask, "What number goes here?" Write it in. Tell the children that a row does not always start at 3.' },
        'G2-208@w': { first: 'Count by fours together to 60. Read the first row aloud and clap at each empty box. Ask, "What number goes here?" Write it in. Tell the children that a row does not always start at 4.' },
      },
    },
    '2:skip-count-5-10-100': {
      byType: {
        'G2-304@w': { first: 'Count by fives from 5 to 50 together. Find the orange dot at 5 together and draw the line to 10. Part of the picture is already drawn; the dots finish it.' },
        'G2-314@w': { first: 'Count by tens from 10 to 100 together. Find the orange dot at 10 together and draw the line to 20. Part of the picture is already drawn; the dots finish it.' },
      },
    },
    '2:symmetry-complete': {
      byType: {
        'G1-432@w': { say: '"Each picture is the same on both sides of the line, but one side is dashed. Trace the dashed half so both sides look the same."', first: 'Fold a sheet of paper in half and show that both halves match. Point to the dashed half of the first picture and trace a few dashes together, slowly.' },
      },
    },
    '2:symmetry-line': {
      byType: {
        'G2-248@w': { say: '"Circle the picture in each row that is the same on both sides."', first: 'Draw a heart with a line down the middle: "Both sides match." Look at the first row together and ask which picture would match if you folded it in the middle.' },
        'G2-247@w': { first: 'Draw a heart with a dashed line down the middle: "If I fold here, both sides match: a line of symmetry." Look at the first picture and its dashed line together: would the two sides match? Circle the check mark or the X.' },
      },
    },
    '2:synonyms': {
      byType: {
        'G2-358@w': { first: 'Read the big word on the first card and the words under it aloud. Ask, "Which one means the same?" Circle it together. Read the cards aloud with the class before they start.' },
        'G2-373@w': { first: 'Read all the words on the page aloud with the class. Do the first word on the left together: "Which word on the right means the same?" Draw the line.' },
      },
    },
    '2:time-5-min-quarter': {
      byType: {
        'G2-249@w': { say: '"Read each clock. The short hand shows the hour, and the long hand shows the minutes: count by fives. Circle the time that matches."', first: 'Draw a clock on the board. Count by fives around the numbers with the class: 5, 10, 15… Do the first clock on the page together: read the hour from the short hand, count the minutes by fives, and circle the time.' },
        'G2-250@w': { first: 'Draw a clock on the board. Show quarter past (the long hand on 3), half past (on 6), and quarter to (on 9). Do the first clock on the page together: read the hour from the short hand, the minutes from the long hand, and circle the time.' },
      },
    },
    '2:verb-forms': {
      byType: {
        'G2-334': { say: '"Read each verb on the left. Draw a line to its past tense, the yesterday form, on the right."', first: 'Write jump and jumped on the board: "Today I jump. Yesterday I jumped." Read the first verb aloud and find its yesterday form together. Some verbs change: sing, sang.' },
        'G2-336': { say: '"Be, have, do, and go change a lot. Write the today form and the yesterday form of each one in the dashed boxes. Then finish the sentences."', first: 'Say the verbs with the class: go, goes, went; have, has, had; be, is, was; do, does, did. Do the first row together.' },
        'G2-337': { say: '"Read each sentence. Three forms of the verb are printed under it. Circle the one that fits."', first: 'Read the first sentence aloud with each form. Look for a time word like yesterday or every day. Circle the form that fits together.' },
      },
    },
    '2:word-classes': {
      byType: {
        'G2-275@w': { first: 'Read all the words on the page aloud with the class. Do the first two words together: "Is it a naming word, an action word, or a describing word?" Write each in its bin.' },
        'G2-286@w': { first: 'Read all twelve words aloud with the class. Do the first two words together: "Is it a noun, a verb, or an adjective?" Write each in its bin.' },
      },
      // the answers of each page (a guest teacher has no key), from the page's own twelve words
      byPage: {
        'word-classes-toys-g2275': { stuck: 'Read the word to the child and try three test sentences aloud: "I see a ___." (a noun), "I can ___." (a verb), "It is ___." (an adjective). The one that sounds right tells the bin. For your own reference, on this page the nouns are skateboard, girl, dinosaur, and ball; the verbs swim, throw, sit, and jump; the adjectives blue, wet, tall, and fast.' },
        'word-classes-post-office-g2275-2': { stuck: 'Read the word to the child and try three test sentences aloud: "I see a ___." (a noun), "I can ___." (a verb), "It is ___." (an adjective). The one that sounds right tells the bin. For your own reference, on this page the nouns are scale, mailbox, package, and envelope; the verbs sleep, hide, sing, and climb; the adjectives fast, cold, tall, and quiet.' },
        'word-classes-fruits-g2286': { stuck: 'Read the word to the child and try three test sentences aloud: "I see a ___." (a noun), "I can ___." (a verb), "It is ___." (an adjective). The one that sounds right tells the bin. For your own reference, on this page the nouns are persimmon, kiwi, blueberry, and raspberry; the verbs run, climb, read, and catch; the adjectives hot, brave, shiny, and purple.' },
        'word-classes-body-parts-g2286-2': { stuck: 'Read the word to the child and try three test sentences aloud: "I see a ___." (a noun), "I can ___." (a verb), "It is ___." (an adjective). The one that sounds right tells the bin. For your own reference, on this page the nouns are eyebrow, heel, nose, and face; the verbs pull, eat, catch, and jump; the adjectives big, happy, fluffy, and loud. Face can be a verb too ("face the board"): it is right in either bin when the child can say a sentence that uses it that way.' },
      },
    },
  },
};

// What a child who is stuck needs on EVERY page of a type (and, where the first days' script names their own page,
// what to say): the scripts of the first days end with the answers of their own page, which a week page must not
// inherit. Merged into the type's week script ('<type>@w').
const WEEK = {
  '2:equal-shares-shapes': { 'G2-229': { stuck: 'Have the child count the equal parts of the shape and color as many as the top number of the fraction says: any parts, all the way to their edges. A child who colors the whole shape counts the parts again with you.' } },
  '2:question-words': { 'G2-357': { first: 'Name the four pictures together. Make up a question for the first line aloud and write it on the board with its question mark. Ask two children for a question that starts with What. Tell the class that any question that fits one of the pictures and starts with the printed word is right, and that nobody has to answer the questions.', stuck: 'Point to one picture and ask the child what they would like to know about it. Then help the child say it as a question that starts with the printed word: "Who is this? Where is this place? What is it doing?"' } },
  '2:symmetry-complete': { 'G1-432': { stuck: 'Have the child trace one part of the dashed half at a time and compare it with the same part on the solid side: the two must look like a picture and its reflection.' } },
  '2:digraphs': { 'G2-372': { stuck: 'Have the child put a finger under each word and look for the two letters of the title right next to each other. Read the sentence to a child who cannot read it; the task is to find the letters. One of the two letters alone does not count.' } },
  '2:plant-parts': { 'G2-363': { stuck: 'Ask the child where the food grows: under the ground (roots), the long part that holds the plant up (stem), the flat green part (leaf), the part bees visit (flower), the part with seeds inside (fruit), or the seed itself. Let the child choose and say why.' } },
  '2:word-classes': {
    'G2-275': { say: '"A noun names a person, an animal, a place, or a thing. A verb is something you can do. An adjective tells what something is like. Read every word and write each one in the right bin."', stuck: 'Read the word to the child and try three test sentences aloud: "I see a ___." (a noun), "I can ___." (a verb), "It is ___." (an adjective). The one that sounds right tells the bin.' },
    'G2-286': { say: '"A noun names a person, an animal, a place, or a thing. A verb is something you can do. An adjective tells what something is like. Read the twelve words and write each one in the right bin."', stuck: 'Read the word to the child and try three test sentences aloud: "I see a ___." (a noun), "I can ___." (a verb), "It is ___." (an adjective). The one that sounds right tells the bin.' },
  },
  '2:family-relationships': { 'G2-362': { stuck: 'Have the child cover the end of the riddle and say who its first part names ("the dad"), then add the last word ("his brother"). Following the riddle on the tree on the board helps. The children of an aunt or an uncle are cousins.' } },
  '2:expanded-form-digit-value': { 'G2-401': { stuck: 'Have the child read the number aloud slowly and write what each part says: "two hundred" is 200, "forty" is 40, "two" is 2. A child who writes 2 + 4 + 2 for 242 has copied the digits; point to the first 2 and ask, "Is this 2 ones or 2 hundreds?" The right three parts in another order are still correct.' } },
  '2:find-differences': { 'G2-389': { stuck: 'Have the child compare one small part of the two pictures at a time, from top to bottom. For the sentence, ask, "Which thing is it? What happened to it?" The child picks one word from each strip and says the sentence aloud before writing it.' } },
  '2:number-line-not-from-zero': { 'G2-305': { stuck: 'Have the child put a finger on the nearest printed number and count the small marks one by one to the arrow, saying the numbers. An answer such as 3 means the child wrote the number of steps, not the number on the line; an answer that is too small means the child counted from the left end as if it were zero.' } },
  '2:pronouns': { 'G2-353': { stuck: 'Have the child read the sentence again with the name in place of the word in the box. He goes to a boy\'s name, she to a girl\'s, and they to two or more names; if the sentence still makes sense, the line is right.' }, 'G2-354': { stuck: 'Have the child count the people in the little picture: one boy takes his, one girl takes her, and two or more people take their, whether they are boys or girls.' } },
  '2:compound-words': { 'G2-330': { stuck: 'Have the child say the whole word and clap once for each of the two small words, then cover the end of the word with a finger and move it until a real word shows.' } },
  // the first number differs from page to page (the scripts of Part 5.2 named the first number of their own page)
  '1:one-ten-more-less': { 'G1-132': { first: 'Do the first one on the board: read the number in the middle and ask, "Ten more: which digit changes, the tens or the ones?" Show that only the tens digit changes, one more ten for ten more and one less ten for ten less. Count by tens from another number together, for example 7, 17, 27, 37.' } },
  '2:hundred-more-less': { 'G2-226': { first: 'Do the first one on the board: read the number in the middle and ask, "A hundred more: which digit changes? Which two stay the same?" Show that only the hundreds digit changes. Count by hundreds from another number together.' } },
  '2:add-sub-within-100-practice': { 'G2-313': { stuck: 'Put two fingers on the two bricks under the empty brick and have the child add those two numbers on scrap paper, tens and ones. A wrong brick lower down makes every brick above it wrong, so check the rows from the bottom up.' } },
  '2:root-words': { 'G2-375': { stuck: 'Have the child cover the beginnings and the endings of the words with a finger until a small real word shows. The root word must be a word by itself.' } },
  '2:synonyms': {
    'G2-358': { stuck: 'Read the words of the card to the child and have the child put each one into the same short sentence. The word that keeps the meaning of the sentence is the one to circle.' },
    'G2-373': { stuck: 'Read the word to the child and have the child put it into a short sentence. Then the child tries the words on the right in the same sentence; the one that keeps the meaning is its partner.' },
  },
  '2:sentence-boundaries': { 'G2-282': { stuck: 'Have the child read the sentence aloud and listen: does it ask something? Then it needs a question mark. Then the child puts a finger on the first word, on every name, and on the end of the sentence, and checks each place.' } },
  '2:column-method': { 'G2-256': { stuck: 'Have the child cover the tens column with a finger and subtract only the ones, then cover the ones and subtract the tens. Counting back on fingers is fine for the small differences.' } },
  '2:read-and-answer': {
    'G2-269': { stuck: 'Read the question to the child and ask them to put a finger on the sentence in the story that tells the answer. If the child cannot read the story alone, read it with them.' },
    'G2-270': { stuck: 'Read the question to the child and ask them to put a finger on the sentence in the story that tells the answer. If the child cannot read the story alone, read it with them.' },
  },
  '2:cloze-context': { 'G2-350': { stuck: 'Have the child name the pictures of the story, then read each sentence aloud and try each word in the gap. The spelling is copied from the word bank.' } },
  '2:time-5-min-quarter': {
    'G2-249': { stuck: 'Ask, "Which number has the short hand just passed?" That is the hour, even when the short hand is close to the next number. Then have the child count by fives from the 12 to the long hand: 5, 10, 15.' },
    'G2-250': { stuck: 'Ask, "Which number has the short hand just passed?" That is the hour, even when the short hand is close to the next number. Then look at the long hand: on the 12 is o\'clock, on the 3 quarter past, on the 6 half past, on the 9 quarter to.' },
  },
  '2:calendar': {
    'G2-277': { stuck: 'For a question about a day of the week, have the child find the date and move a finger straight up its column to the day\'s name. For a question about a picture, the child looks for the little picture inside the calendar.' },
    'G2-297': { stuck: 'For a day of the week, have the child find the date and move a finger straight up its column. To count the days from one sticker to another, the child starts on the day after the first sticker and counts every day up to and including the second sticker.' },
    'G2-298': { stuck: 'For a question about a day of the week, have the child find the day\'s name at the top and move a finger straight down its column. For one date, the child moves up from the date to the day\'s name.' },
  },
  '2:odd-even': {
    'G2-218': { stuck: 'Have the child cover every digit but the last one with a finger and check it against the list on the board.' },
    'G2-351': { stuck: 'Have the child circle the dots two by two and count the pairs: that is each equal part. A dot left over goes in the small box, and the number is odd; no dot left over means it is even.' },
  },
  '2:skip-count-3-4': {
    'G2-207': { stuck: 'Have the child add three to the number before the gap with fingers: say the number, then count three more. To check, the next printed number must be three more than the number the child wrote.' },
    'G2-208': {
      say: '"On this page we count by fours: 4, 8, 12, 16. Some numbers are missing. Count by fours and write each missing number. The rows do not start at 4."',
      stuck: 'Have the child add four to the number before the gap with fingers: say the number, then count four more. To check, the next printed number must be four more than the number the child wrote.',
    },
  },
  '2:symmetry-line': {
    'G2-247': { say: '"A mirror line cuts a picture into two halves that match exactly, like a picture and its reflection in a mirror. Look at the dashed line on each picture. If both sides match, circle the check. If they do not match, circle the X."', stuck: 'Have the child cover one side of the picture with a hand, look at the other side, and then switch. Ask, "Is this part on the other side, too?" If both sides match along the dashed line, it is a line of symmetry.' },
    'G2-248': { stuck: 'Have the child cover one side of each picture with a hand, look at the other side, and then switch. The picture whose two sides match is the one to circle.' },
  },
};
for (const [id, types] of Object.entries(WEEK)) for (const [type, o] of Object.entries(types)) {
  const P = (module.exports.points[id] = module.exports.points[id] || {});
  const T = (P.byType = P.byType || {});
  T[type + '@w'] = Object.assign({}, T[type + '@w'], o);
}
