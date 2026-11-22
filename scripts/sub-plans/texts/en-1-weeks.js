'use strict';
/**
 * Guest teacher scripts, English (US), Grade 1: the week days of Part 5.4. New teaching points get their whole
 * script; points whose script lives in texts/en-1.js or en-k.js get what is true of a NEW worksheet type (byType),
 * a week script for a type the first days use ('<type>@w': true of every page of the type, where the type's own
 * script names the page of a day of Parts 5.1-5.2), or what is true of ONE page (byPage: the picture words of a
 * sound or spelling task, read off the page and its manifest). Nothing here changes a block of the 24 days.
 * Merged into frontend/content/sub-plans/scripts/en.json by scripts/sub-plans/apply-texts.js.
 */
const sortScript = (bins, example, note) => ({
  say: '"At the top of the page there are pictures. At the bottom there are boxes: ' + bins + '. Draw a line from each picture to the box where it belongs."',
  first: 'Read the words on the boxes aloud and point to each box. Name every picture together, so that everyone knows what it shows. Do the first picture together: ' + example + ' Draw the line from the dot under the picture to its box.' + (note ? ' ' + note : ''),
  stuck: 'Point to one picture at a time and ask the question of the page about it. If the child is not sure, ask about something the child knows: "Have you ever seen one? What is it like?" Then let the child choose the box.',
});
const story = (task) => ({
  say: '"Read the story at the top of the page. Then ' + task,
  first: 'Read the title and the story aloud to the class while the children follow with a finger. Then read the first question aloud and ask, "Where in the story does it tell us?" Find the sentence together and finish the first answer together. The children read the story again on their own before they do the rest.',
  stuck: 'Read the question with the child and look for its words in the story together. Point to the sentence that has the answer and have the child read it aloud. The answer may be a few words; it does not need to be a long sentence.',
});

module.exports = {
  loc: 'en',
  points: {
    // ---- new points ----
    '1:add-three-addends': {
      say: '"Each problem adds three numbers. Look for two numbers that make ten, add them first, and then add the third number."',
      first: 'Write 9 + 1 + 8 on the board. Ask, "Which two numbers make ten?" Circle 9 and 1: "Ten. Ten and eight more is eighteen." Write 18. Tell the children that if no two numbers make ten, they may add in any order.',
      stuck: 'Have the child look at each pair of numbers and ask, "Do these two make ten?" If no pair does, add the first two, then count on the third with fingers.',
      byType: {
        'G1-570': {
          say: '"Each story has three numbers. Read the story, draw it in the box, and write the three numbers in the number sentence. Look for two numbers that make ten. Then write how many in all."',
          first: 'Read the first story aloud while the children follow. Ask, "What are the three numbers?" Write them on the board with plus signs. Draw quick circles for them. Look for two numbers that make ten together, add them first, then add the third.',
          stuck: 'Read the story with the child, one sentence at a time, and underline each number. Have the child draw circles for each number and count them all.',
        },
      },
    },
    '1:animal-classes-coverings': Object.assign(sortScript('Mammals, Birds, and Reptiles', 'ask, "Does it have fur, feathers, or scales? Does it lay eggs or feed its babies milk?"', 'Mammals have fur or hair, birds have feathers, and reptiles have dry scales.'), {
      byType: {
        'G1-205': sortScript('Fur, Feathers, and Scales', 'ask, "What covers this animal\'s body: fur, feathers, or scales?"', 'Fur is soft hair, feathers have a stem with soft sides, and scales are small, hard plates on the skin.'),
      },
    }),
    '1:blends-start': {
      say: '"Each word starts with two letters that you can hear together, like s and l in sled. Say the name of each picture. Write the two letters it starts with."',
      first: 'Say "sled" slowly: "s-l-ed. Two sounds at the start: s and l." Name all the pictures together, so that everyone uses the same words (they are below). Do the first one together and write its two letters on the board.',
      stuck: 'Say the word slowly and stretch the start: "ssslll-ed." Ask the child to say the first sound, then the second sound, and write both letters.',
      byPage: {
        'digraphs-g1493': { first: 'Say "sled" slowly: "s-l-ed. Two sounds at the start: s and l." Name the pictures together: swan, train, sled, snail, spatula, stove, broom, flag. Do the first one together: "swan, s-w." Write sw. For your own reference: sw, tr, sl, sn, sp, st, br, fl.' },
        'digraphs-g1493-2': { first: 'Say "sled" slowly: "s-l-ed. Two sounds at the start: s and l." Name the pictures together: dress, snowflake, flamingo, swing, stool, glass, slide, spatula. Do the first one together: "dress, d-r." Write dr. For your own reference: dr, sn, fl, sw, st, gl, sl, sp.' },
        'digraphs-g1493-3': { first: 'Say "sled" slowly: "s-l-ed. Two sounds at the start: s and l." Name the pictures together: spider, dragon, flute, stove, crib, glove, plunger, snorkel. Do the first one together: "spider, s-p." Write sp. For your own reference: sp, dr, fl, st, cr, gl, pl, sn.' },
      },
    },
    '1:capitals-names-days-months': {
      say: '"Names of people and pets, and the days of the week, start with a capital letter. Other words do not, unless they start the sentence. In each sentence, circle the word that is written the right way."',
      first: 'Write "Monday" and "monday" on the board and ask which is right. Read the first sentence aloud with both choices: "On Monday, or monday, we have a test." Circle Monday together. Read each sentence aloud with the class before they choose. Then read the second part of the page together.',
      stuck: 'Ask the child, "Is this word a name, a day, or a month? Does it start the sentence?" If yes, it gets a capital letter.',
    },
    '1:characters-setting-events': story('write who is in it, where it takes place, and what happens."'),
    '1:digraphs': {
      say: '"Two letters can make one sound: s-h says sh, c-h says ch, and t-h says th. Say the name of each picture and listen for the letter team."',
      first: 'Write sh, ch, and th on the board and say each sound with the class: sh like a quiet library, ch like a train, th with the tongue between the teeth. Name the pictures together (they are below). Do the first one together.',
      stuck: 'Say the word slowly and stop at the letter team: "mu-sh-room." Then say sh, ch, and th and ask which one it sounds like.',
      byType: {
        'G1-380': { say: '"Two letters can make one sound: sh, ch, and th. Say the name of each picture. Circle the letter team you hear in it."' },
        'G1-392': { say: '"Each picture word is missing its letter team: sh, ch, or th. Say the word and write the missing letter team in the dashed space."' },
        'G1-393': {
          say: '"Read each word. Its letter team is marked. Draw a line from the word to the picture it names."',
          first: 'Write sh, ch, and th on the board and say each sound with the class. Read the first word together, sound by sound, and find its picture. Tell the children to read the letter team as one sound.',
          stuck: 'Cover the word with a finger and uncover it a part at a time: "ben… ch… bench." Then find the picture together.',
        },
        'G1-588': {
          say: '"First read each word and draw a line to its picture; two words have no picture. Then read the words in the second part and write each one under sh or ch."',
          first: 'Write sh and ch on the board and say each sound with the class. Read the words of the first part aloud together: hip, shelf, chick, chips, ship, kick. Find the first picture together and draw its line. For the second part, read the first word together and ask, "sh or ch?"',
          stuck: 'Read the word for the child, slowly, and stop at the letter team. Then ask which letter team makes that sound.',
        },
      },
      byPage: {
        'digraphs-g1380': { first: 'Write sh, ch, and th on the board and say each sound with the class. Name the pictures together: mushroom, shrimp, chair, chocolate, jellyfish, thumb, bench, feather. Do the first one together: "mushroom: sh." Circle sh. For your own reference: sh: mushroom, shrimp, jellyfish; ch: chair, chocolate, bench; th: thumb, feather.' },
        'digraphs-g1392': { first: 'Write sh, ch, and th on the board and say each sound with the class. Name the pictures together: bench, thermometer, chocolate, thumb, shoe, chair, jellyfish, wreath. Do the first one together: "ben…ch." Write ch in the dashed space. For your own reference: ch, th, ch, th, sh, ch, sh, th.' },
      },
    },
    '1:doubles-halves': {
      say: '"A double is a number added to itself, like 4 + 4. A half is one of two equal parts. Some cards ask for the double, others for the half. Write each answer in the box."',
      first: 'Hold up 4 fingers on each hand: "4 and 4 is 8. Eight is the double of four." Then hold up 8 fingers and split them into two equal parts: "Half of 8 is 4." Read the word on the first card, double or half, and do it together.',
      stuck: 'For a double, have the child count the pictures and then count them again on from the first number. For a half, have the child share the pictures in two groups, one for you and one for the child, until none are left.',
      byType: {
        'G1-288': { say: '"Every card cuts a group in half: two equal parts. Write the two equal parts."' },
      },
    },
    '1:fact-families': {
      say: '"The three numbers on the roof are a family. They make four facts: two adding and two taking away. Use the three numbers to finish all four facts in each house."',
      first: 'Draw a house on the board with 3, 7, and 10 on the roof. Write the four facts together: 3 + 7 = 10, 7 + 3 = 10, 10 − 3 = 7, 10 − 7 = 3. Point out that the biggest number is the whole: it comes after the equals sign when we add and first when we take away.',
      stuck: 'Have the child find the biggest number on the roof and circle it: that is the whole. The other two are the parts. Adding the parts makes the whole; taking a part away from the whole leaves the other part.',
    },
    '1:family-generations': {
      say: '"In each row there are family words. Write 1, 2, and 3 to put them in order, from the oldest generation to the youngest."',
      first: 'Talk about a family: grandparents are the oldest generation, then parents, aunts, and uncles, then children like brothers, sisters, and cousins. Read the first row aloud together and ask, "Who is the oldest?" Write 1 under that word, then 2 and 3.',
      stuck: 'Ask the child about each word: "Is that a grandparent, a parent, or a child?" Grandparents get 1, parents 2, children 3. Every family is different; this page is about the words.',
      byType: {
        'G1-386': {
          say: '"Read each clue. It tells you who someone is in the family. Write each name in the right name box on the family tree."',
          first: 'Read the names on the tree and the first clue aloud. Find the child the clues are about on the tree. Ask, "If Leo is Jack\'s brother, where does he go on the tree?" Write Leo in that box together.',
          stuck: 'Read the clue with the child and point to Jack on the tree. Ask, "Is a brother next to Jack, above him, or two rows up?" Brothers and sisters are next to him, parents above, grandparents at the top.',
        },
      },
    },
    '1:food-groups': (() => {
      const NOTE = 'If a food fits two groups, either box is right when the child can say why.';
      const s = sortScript('Fruits, Vegetables, Grains, and Protein', 'ask, "Is this a fruit, a vegetable, a grain like bread or pasta, or a protein like eggs, meat, or fish?"', NOTE);
      // the page that shows a tomato
      s.byPage = { 'science-sort-g1207-2': { first: s.first.replace(NOTE, 'A tomato can be called a fruit or a vegetable; either box is right for it.') } };
      return s;
    })(),
    '1:habitats-needs': Object.assign(sortScript('Land, Water, and Air', 'ask, "Where does this animal spend most of its time: on land, in the water, or in the air?"', 'An animal that flies lives on land too, so Air and Land are both right for it when the child can say why.'), {
      byPage: {
        // the page with a crab (review of Part 5.4)
        'science-sort-g1202': { first: 'Read the words on the boxes aloud and point to each box. Name every picture together, so that everyone knows what it shows. Do the first picture together: ask, "Where does this animal spend most of its time: on land, in the water, or in the air?" Draw the line from the dot under the picture to its box. An animal that flies lives on land too, so Air and Land are both right for it, and a crab lives in the water and on land, so Water and Land are both right for it, when the child can say why.' },
      },
      byType: {
        'G1-206': sortScript('Plant Eaters and Meat Eaters', 'ask, "What does this animal eat: plants or other animals?"'),
      },
    }),
    '1:info-text-key-details': story('write the answer to each question by finishing the sentence."'),
    '1:joining-words': {
      say: '"A joining word puts two sentences together. And adds one more thing. But tells something you did not expect. So tells what happened because of it. Circle the joining word that fits best in each sentence."',
      first: 'Read the box with the three joining words aloud. Read the first sentence aloud three times, once with each joining word, and ask which one makes the most sense. Circle it. For the last part, read the two sentences together and join them on the lines.',
      stuck: 'Read the sentence with each joining word for the child and ask, "Which one sounds right?" For but, ask, "Is the second part a surprise?"',
    },
    '1:long-or-short-vowel': {
      say: '"Say each word. Listen to the colored vowel. Does it say its name, like the a in rake? That is a long vowel: circle the line. Does it make its short sound, like the a in bag? Circle the curve."',
      first: 'Write rake and bag on the board and say both: "rake, a says its name: long. bag, a says /a/: short." Read the words on the page aloud together. Do the first one together and circle the line or the curve.',
      stuck: 'Say the word slowly and hold the vowel. Then say the letter\'s name: if the word says the name, it is long.',
      byPage: {
        'phonological-awareness-g1495': { stuck: 'Say the word slowly and hold the vowel. Then say the letter\'s name: if the word says the name, it is long. For your own reference: long: rake, nose, stove, slide; short: chick, bag, fish, nest.' },
        'phonological-awareness-g1495-2': { stuck: 'Say the word slowly and hold the vowel. Then say the letter\'s name: if the word says the name, it is long. For your own reference: long: tape, stove, globe, beet; short: shrimp, nest, leg, sled.' },
        'phonological-awareness-g1495-3': { stuck: 'Say the word slowly and hold the vowel. Then say the letter\'s name: if the word says the name, it is long. For your own reference: long: flute, goat, cube, face; short: rock, sack, hen, shrimp.' },
      },
    },
    '1:main-topic-key-details': story('write what the whole text is about, the main topic, and two key details: facts the text tells about it."'),
    '1:map-key': {
      say: '"Start at the flag on the grid. Follow the steps, one at a time: each step says which way to move and how many squares. Circle the picture where you land."',
      first: 'Put your finger on the flag and read the first step aloud: "Move 1 square right." Move the finger together and stop. Read the next step and move again. Tell the children to count the squares, not the lines, and to keep the finger on the page until the last step.',
      stuck: 'Have the child say each step aloud and point with a finger. Check right and left: "Which hand is your right hand? Move that way."',
    },
    '1:measure-length-units': {
      say: '"Each picture sits on a row of squares. Count the squares from one end of the picture to the other, and write the length."',
      first: 'Do the first one together: put a finger on the square under the start of the picture and count each square to the end. Write the number in the box. Tell the children to count only the squares under the picture.',
      stuck: 'Have the child make a small mark in each square while counting it.',
    },
    '1:mental-math-to-100': {
      say: '"Solve each problem in your head. Think of the tens and the ones. Write the answer in the box."',
      first: 'Write 36 + 6 on the board. Say, "36 is 3 tens and 6 ones. 6 and 6 make 12, so we get one more ten: 42." Do one taking away ten: 46 − 10 = 36: "only the tens change." Then the children work on their own.',
      stuck: 'Have the child say the tens and the ones of the first number. For adding or taking away tens, only the tens digit changes; for ones, count on or back from the number.',
      byType: {
        'G1-558': { say: '"Add or take away tens in your head. Only the tens change. Write the answer in the box."', first: 'Write 34 − 10 on the board and count back by ten together: "34, 24." Ask, "What changed? The tens. The ones stayed 4." Do 56 − 30 together: three tens back: 46, 36, 26.' },
      },
    },
    '1:missing-number-equations': {
      say: '"In each problem one number is missing. Work out the missing number in your head and write it in the box."',
      first: 'Write 6 + __ = 10 on the board. Ask, "Six and how many more make ten?" Count on from 6 with fingers to 10: four. Write 4. Then do one with take away: 8 − __ = 5.',
      stuck: 'Have the child say the problem aloud with a hum for the box. Count on or back with fingers from the first number to the answer, and count the fingers.',
    },
    '1:number-line-placement': {
      say: '"Each arrow points to a mark on the number line. Count on from the number before it and write the number the arrow points to."',
      first: 'Draw the first number line on the board. Count the marks with the class from 0, one by one, up to the arrow. Write that number. Tell the children that not every mark has its number written; they count the marks between.',
      stuck: 'Have the child find the last printed number before the arrow, put a finger on it, and count each mark up to the arrow.',
    },
    '1:number-words': {
      say: '"Each number has a word that we read and write. Read the number and circle the word that matches it."',
      first: 'Write 1 to 20 on the board and the words for a few of them. Do the first one together: read the number, read the three words, and circle the matching one.',
      stuck: 'Have the child say the number aloud and listen to its first sound; find the word that starts with that letter. Read the words with the child.',
      byType: {
        'G1-227': { say: '"Find the word for each number in the word bank at the top. Write it on the line."', first: 'Read the words in the word bank aloud together. Do the first one together: read the number, find its word in the bank, and copy it letter by letter.' },
      },
    },
    '1:odd-even-pairs': {
      say: '"Even numbers can be shared in pairs with none left over. Odd numbers always have one left over. Write each number in the house where it belongs: the odd house or the even house."',
      first: 'Count by twos together: 2, 4, 6, 8, 10: these are even. Write them on the board. The numbers in between, 1, 3, 5, 7, 9, are odd. Tell the children that a number ending in 0, 2, 4, 6, or 8 is even. Do the first number together.',
      stuck: 'Have the child look at the last digit of the number and check it against the list of even numbers on the board. For a small number, draw dots in pairs.',
    },
    '1:ordinal-numbers': {
      say: '"Each row of pictures starts at a flag. Find the small picture in the row and write which place it stands in, counting from the flag: first, second, third, and so on."',
      first: 'Write 1st, 2nd, 3rd, 4th, 5th on the board and read them. Do the first one together: start at the flag, touch each picture and count: "first, second, third." Stop at the small picture and write its place.',
      stuck: 'Have the child put a finger next to the flag and move to the right one picture at a time, saying the places aloud.',
    },
    '1:retell-and-lesson': story('write what happens at the beginning, in the middle, and at the end, using the word bank. Then circle the lesson of the story."'),
    '1:shades-of-meaning': {
      say: '"Each row has three words that mean almost the same thing, but some are stronger. Write 1 for the weakest word, 2 for the middle one, and 3 for the strongest."',
      first: 'Act out the first row: tap the desk softly, knock, then bang. Ask which is the weakest and which is the strongest. Write 1, 2, 3 together. Read every row aloud with the class.',
      stuck: 'Act the words out with the child or say them with your voice, from a little to a lot.',
    },
    '1:shape-attributes': {
      say: '"Look at each shape. Count its sides and corners. Write its name on the line, using the names in the box."',
      first: 'Draw a circle, a triangle, a square, and a rectangle on the board and read their names in the box. Do the first shape together: count the sides and choose the name.',
      stuck: 'Have the child count the sides with a finger: 3 sides is a triangle; 4 equal sides is a square; 4 sides, two long and two short, is a rectangle; no sides is a circle.',
    },
    '1:sink-float': sortScript('Float and Sink', 'ask, "If we put this in water, would it float on top or sink to the bottom?"', 'This page asks what the children think; a child who can say why has done the page well.'),
    '1:story-key-details': story('finish the answer to each question."'),
    '1:synonyms': {
      say: '"Synonyms are words that mean the same thing, like big and large. Under each picture there are words. Circle the two words that mean the same and tell about the picture."',
      first: 'Write big and large on the board: "They mean the same." Look at the first picture together and read its words aloud. Ask, "Which two mean the same and fit the picture?" Circle them.',
      stuck: 'Read the words with the child and ask, "Which word could you put in place of this one?"',
    },
    '1:true-false-equations': {
      say: '"Is each number sentence true? If both sides are the same amount, it is true: circle the check mark. If not, it is false: circle the X."',
      first: 'Write 10 − 2 = 8 on the board and ask, "Is ten take away two eight? Yes: true." Write 9 = 5 + 6 and ask, "Is five and six nine? No: false." Remind the children that the equals sign means "the same as" and can be on either side.',
      stuck: 'Have the child work out the side with the plus or minus sign and then compare it with the number on the other side.',
    },
    '1:true-story-plan-and-draft': {
      say: '"Time words like first, next, and last tell the order of a story. First read the little story and circle its time words. Then plan your own true story in the boxes."',
      first: 'Read the story on the page aloud and circle the time words together: first, then, last. Do the numbering part together. For the plan, let a few children say an idea: a rainy day, something new they learned. Each child draws and writes a few words in each box: First, Next, Last, and how they felt.',
      stuck: 'Ask the child, "What did you do first? And then?" Write one word for the child to copy, or let the child draw and label.',
    },
    '1:verb-tense': {
      say: '"A verb tells when something happens: yesterday I walked, today I walk, tomorrow I will walk. Write the missing verbs. Then circle the verb that fits the time word in each sentence."',
      first: 'Write walked, walk, will walk under Yesterday, Today, and Tomorrow on the board. Do the first row on the page together. For the second part, read the first sentence aloud and look for the time word: yesterday, today, or tomorrow.',
      stuck: 'Ask, "Did it happen already, is it happening now, or will it happen later?" Already: add -ed. Later: will.',
    },
    'K:grid-copy': {
      say: '"Look at the picture on the small grid. Color the same squares on the empty grid so the picture appears again."',
      first: 'Point to the letters across the top and the numbers down the side. Find one colored square together, say its letter and number, and color the same square on the empty grid. Tell the children to do one row at a time.',
      stuck: 'Have the child put one finger on a colored square and another on the same row and column of the empty grid.',
      byType: {
        'K-502': { say: '"Look at the picture on the small grid. Color the same squares on the big grid, where every square is twice as big."', first: 'Find the top-left colored square on the small grid together and count which row and which column it is in. Find the same row and column on the big grid and color that square. Tell the children to do one row at a time.' },
      },
    },
    '1:question-words': {
      say: '"Read each answer. Look at the highlighted words. Which question asks for them: who, what, where, when, or how many? Write that question word in the box."',
      first: 'Read the question words in the bank aloud. Read the first answer and its question aloud and look at the highlighted words. Ask, "Which question word asks for these words?" Write it in the box together. Do the rest of the page by reading each answer aloud with the class.',
      stuck: 'Ask the child: "Is the highlighted part a person? Then who. A thing? What. A place? Where. A time? When. A number? How many."',
    },

    // ---- new types, week scripts and pages of points whose script is in en-1.js or en-k.js ----
    '1:add-within-10-models': {
      byType: {
        'G1-102': { say: '"In each row there are two groups of pictures. Count both groups. Write how many there are altogether after the equals sign."', first: 'Do the first row together: count the first group, then keep counting into the second group. Write the number after the equals sign. Show the children how to start with the bigger group and count on.' },
      },
    },
    '1:alphabetical-order': {
      byType: {
        'G1-262': { first: 'Point to the alphabet strip at the top of the page. Read the four words on the cards aloud with the class. Ask, "Which word starts with the letter that comes first in the alphabet?" Write a 1 on its card together. Tell the children to number the other cards 2, 3, and 4.' },
        'G1-263': { first: 'Point to the alphabet strip at the top of the page. Read the four words on the cards aloud with the class. Ask, "Which word starts with the letter that comes first in the alphabet?" Write a 1 on its card together. The children number the other cards and then copy the words onto the lines in that order.' },
      },
    },
    '1:bar-graphs': {
      byType: {
        'G1-144': { say: '"Look at the bars. A taller bar means more. Circle the one with the most."', first: 'Hold up the page and point to each bar. Ask, "Which bar is the tallest?" Put a finger on its top and read its number on the side. Circle the picture of that bar together.' },
      },
    },
    '1:cloze': {
      byType: {
        'G1-350': {
          say: '"Each sentence is missing a word. The words are in the word bank at the top, and each sentence has a picture. Find the word that fits and write it in the box."',
          first: 'Read the words in the bank aloud together. Read the first sentence aloud and say "blank" at the gap. Look at its picture and ask, "Which word fits?" Write it in the box together.',
          stuck: 'Read the sentence with the child, one word at a time, and say "blank" at the gap. Look at the picture together and find its word in the bank.',
        },
      },
    },
    '1:coins': {
      byType: {
        'G1-229': { say: '"Each box has coins in it. The number on a coin tells you how many cents it is worth. Count how much money is in each box and write the amount."', first: 'Draw the four coins on the board with their value: a quarter is 25 cents, a dime is 10, a nickel is 5, and a penny is 1. Do the first box together: start with the coin that is worth the most and count on: "25, 50… 55, 60." Write the amount in the box in front of the cent sign.' },
        'G1-232': { say: '"Each row has two purses. Count the money in each purse. Circle the purse that has more."', first: 'Draw the four coins on the board with their value: a quarter is 25 cents, a dime is 10, a nickel is 5, and a penny is 1. Do the first row together: count each purse, biggest coin first, and write the two amounts next to it. Circle the purse with more.' },
      },
    },
    '1:count-on-back-hops': {
      byType: {
        'G1-117': { say: '"Each number line has a dot where you start, and arcs that show the hops back. Count back one mark for each hop, and write the number where the last hop lands."', first: 'Draw the first number line on the board. Put your finger on the starting dot and say its number. Follow the arcs back one at a time and count back aloud. Write where the last arc lands. Point out that the line is numbered by twos: each small mark between two numbers is the number in between.' },
        'G1-118': { say: '"Each number line shows a number sentence. Start at the dot, count the hops forward, and write the answer of the addition."', first: 'Draw the first number line on the board. Read the number sentence aloud. Put your finger on the starting dot and follow the hops: "two… three, four, five." Write the answer. Point out that the line is numbered by twos: each small mark between two numbers is the number in between.' },
        'G1-119': { say: '"Each number line shows a take-away sentence. Follow the hops backward and write the answer."', first: 'Draw the first number line on the board. Read the number sentence aloud. Put your finger on the starting number and follow the hops back, counting back aloud. Write where you land. Point out that the line is numbered by twos: each small mark between two numbers is the number in between.' },
      },
    },
    '1:days-months-seasons': {
      byType: {
        'G1-321@w': {
          say: '"Each box has one month in the middle. Write the month that comes before it and the month that comes after it."',
          first: 'Say the months of the year aloud together, twice, and write them on the board in order. Do the first box together: find the month on the board and read the month on its left and on its right. Write them.',
          stuck: 'Have the child find the month on the board and put a finger on it: one step back is before, one step on is after. After December comes January again.',
        },
      },
    },
    '1:fluency-within-20': {
      byType: {
        'G1-208': { say: '"This is math you already know: adding and taking away with numbers up to 20. Do the ones you know first. Then go back to the others."' },
        'G1-217@w': { first: 'Do the first two problems on the board together and think aloud: "Nine take away five. I count back from nine: eight, seven, six, five, four." Then the children work on their own; tell them to skip a hard one and come back to it.' },
        'G1-439': {
          say: '"Each problem has a number line. Jump to the ten first, then jump the rest. Fill in the boxes."',
          first: 'Do 9 + 2 on the board: "From 9, one jump makes 10. One more is 11." Write 9 + 1 + 1 = 11. Show that 2 was split into 1 and 1. Do a take-away one the same way: from 13 back to 10, then the rest.',
          stuck: 'Ask, "How many to get to ten?" Write that part first, then ask how much is left of the number to add or take away.',
        },
      },
    },
    '1:hundreds-chart': {
      byType: {
        'G1-130': { say: '"Two boxes on the chart are colored to start you off. Find the counting pattern and color every number that comes in it."', first: 'Point to the two colored boxes and read them: for example 5 and 10. Ask, "How do we get from 5 to 10? We count by fives." Color 15 together and say the next one: 20. The children go on to the end of the chart.', stuck: 'Have the child count on from the last colored number by the same jump, touching each box.' },
        'G1-310': { say: '"Each puzzle piece is a part of a hundreds chart. One number is printed on each piece. Write every missing number: 1 more to the right, 1 less to the left, 10 more below, 10 less above."', first: 'Draw a small piece on the board with 76 in it. Ask, "What is right of 76? One more: 77. Left? 75. Below? Ten more: 86. Above? 66." Fill the boxes together.', stuck: 'Have the child say the rule for the box: right is one more, left is one less, down is ten more, up is ten less.' },
      },
    },
    '1:mazes': {
      byType: {
        // every page of the type: its title names the animal, its goal and its things (rabbit and carrots, bee and sunflowers, crab and shells)
        'G1-424@w': {
          say: '"Read the title with me. Help the animal reach its goal and pick up every one of its things on the way, without using a path twice. Fill in a circle for each one you pick up."',
          first: 'Hold up the page and read the title and the directions aloud. Show the animal, its goal, and the things it must pick up, and count the things together. Tell the children to plan the whole way with a finger before they draw, because the first way they see may miss one.',
          stuck: 'Have the child put a finger on each thing to pick up and look at which paths lead to it. If the way is blocked because a path was already used, the child starts again with a finger and picks up the things in another order.',
        },
        'G1-425': { say: '"Help the animal get home safely. Look at the whole maze first. Do not take a road with one of the dangers the page names."', first: 'Read the title aloud and show the start and the goal. Point to the dangers on the page and say that a road with a danger is closed. Trace a way with your finger and stop at each fork: "Is there a danger on this road?" Tell the children to find the whole way with a finger before they draw.' },
      },
    },
    '1:number-of-the-day': {
      byType: {
        'G1-256': { say: '"Look at the big number: it is the number of the day. Every box asks something about it: its word, the numbers before and after, ten more and ten less. Fill in all the boxes."' },
        'G1-257': { say: '"Look at the big number: it is the number of the day. Show it in tens and ones, and fill in every box on the page."' },
      },
    },
    '1:number-walls': {
      byType: {
        'G1-267': { say: '"Add each pair of bricks next to each other and write the sum in the brick above them. Keep going up until the wall reaches the top."' },
      },
    },
    '1:one-ten-more-less': {
      byType: {
        'G1-131': { say: '"Look at the number in the middle. On the left, write the number that is 1 less. On the right, write the number that is 1 more."', first: 'Write 1 to 100 in rows of ten on the board, or point to the class hundred chart. Do the first one together: find the number, step one back for 1 less and one on for 1 more.', stuck: 'Have the child count aloud up to the number and say the next one: that is 1 more. The one said just before it is 1 less.' },
      },
    },
    '1:opposites': {
      byType: {
        'G1-307': { say: '"Read the word on each card. Find its opposite in the word bank and write it on the line."', first: 'Read the words in the bank aloud. Read the first card together and ask, "What is the opposite of day?" Find night in the bank and write it on the line.', stuck: 'Act the word out for the child, or ask, "What is the other end of this word?"' },
        'G1-337': { say: '"Read the word. One of the three words under it means the opposite. Circle it, not the one that means the same."', first: 'Read the first word and its three choices aloud. Ask, "Which one means the opposite?" Point out that one choice means almost the same as the word: that is the trap. Circle the opposite.', stuck: 'Read each choice and ask, "Does it mean the same, or the opposite?"' },
      },
    },
    '1:phoneme-boxes': {
      byType: {
        'G1-312@w': { first: 'Do the first picture together: say its word slowly, one sound at a time, holding up a finger for each sound. Write one sound in each box from the left. Leave the boxes you do not need empty. Name all the pictures first, so that everyone uses the same words (they are below).' },
      },
      byPage: {
        'sound-boxes-things-that-fly-g1312-2': { first: 'Name the pictures together: swan, jet, rocket, duck, seagull, balloon. Do "jet" on the board: say j-e-t, one finger for each sound, and write one sound in each box. Leave the boxes you do not need empty. Some sounds take two letters, like ck in duck.' },
        'sound-boxes-toys-g1312-3': { first: 'Name the pictures together: boat, swing, robot, scooter, rocket, train. Do "boat" on the board: say b-oa-t, one finger for each sound, and write one sound in each box: oa is one sound. Leave the boxes you do not need empty.' },
        'sound-boxes-beach-g1312-4': { first: 'Name the pictures together: fish, chair, sailboat, seagull, hat, bucket. Do "fish" on the board: say f-i-sh, one finger for each sound, and write one sound in each box: sh is one sound. Leave the boxes you do not need empty.' },
        'sound-boxes-camping-g1312-5': { first: 'Name the pictures together: fish, fox, hat, vest, bear, raccoon. Do "hat" on the board: say h-a-t, one finger for each sound, and write one sound in each box. Leave the boxes you do not need empty.' },
      },
    },
    '1:pronouns': {
      byType: {
        'G1-352': { say: '"Look at each person and read the name. Which word do we use instead of the name: he, she, or they? Circle it."', first: 'Write he, she, and they on the board. Read the first name aloud and look at the picture together. Ask, "Is it one boy, one girl, or more than one person?" Circle the word. For two names, it is always they.', stuck: 'Have the child look at the picture and say how many people it shows. One boy is he, one girl is she, and two or more people are they.' },
        'G1-372': { say: '"Read each name card. Write the name under the word we use for that person: he, she, or they."', first: 'Write he, she, and they on the board. Read the first name card aloud and ask, "Would we say he, she, or they?" Write the name under that word together. Two names on one card go under they.', stuck: 'Read the name card with the child. One boy is he, one girl is she, and two or more people are they: two names on one card go under they.' },
      },
    },
    '1:read-and-follow': {
      byType: {
        'G1-341': { say: '"Read each sentence and look at the row of pictures. Is the sentence true or false? Circle the right word."', first: 'Point to the row of pictures and name them together from left to right. Read the first sentence aloud and check it on the row together, counting the pictures from the left. Circle true or false.' },
      },
    },
    '1:rhyming': {
      byType: {
        'G1-309@w': { first: 'Name the pictures of each row together, so that everyone uses the same words (they are below). Do the first row together: say the first picture with each of the others and ask which one rhymes. Circle it and write its word on the line. Spelling it the way it sounds is fine.' },
        'G1-343@w': { first: 'Name the big pictures and the small pictures in the bank together, so that everyone uses the same words (they are below). Take the first small picture: say it with each big picture and ask which one rhymes. Write its word on a line under that big picture.' },
        'G1-345': {
          say: '"Say the name of each picture. Find the two words in the bank that rhyme with it and write them on its lines. Some words in the bank fit nowhere."',
          first: 'Read the words in the bank aloud together and name the pictures: dog, car, hat, sock. Do the first picture together: "dog… which words in the bank sound like dog at the end?" Write them on its lines. For your own reference: dog: frog, log; car: guitar, star; hat: bat, cat; sock: lock, rock. Pool, sheep, nail, and plate fit nowhere.',
          stuck: 'Say the picture word and each word of the bank one after the other. If the endings sound the same, it rhymes.',
        },
      },
      byPage: {
        'rhyming-words-g1309-2-at': { stuck: 'Say the first picture with each choice and stretch the endings. For your own reference, the rows are glass (grass, chair, rock), hat (mouse, van, cat), plate (sweater, gate, train), shelf (crane, drum, elf), shirt (skirt, cap, whale), cart (clock, heart, nail); the rhymes are grass, cat, gate, elf, skirt, heart.' },
        'rhyming-words-g1309-3-at': { stuck: 'Say the first picture with each choice and stretch the endings. For your own reference, the rows are hat (nail, cat, shelf), bear (car, pear, crane), boat (coat, plate, mouse), rake (lamp, cake, log), nose (rose, rock, star), shirt (guitar, pan, skirt); the rhymes are cat, pear, coat, cake, rose, skirt.' },
        'rhyming-words-g1343-2-at': { stuck: 'Say the small picture with each big picture and stretch the endings. For your own reference, the rhyming families are hat, bat, cat; balloon, spoon, raccoon; jar, star, guitar.' },
        'rhyming-words-g1343-3-at': { stuck: 'Say the small picture with each big picture and stretch the endings. For your own reference, the rhyming families are pie, tie, eye; bear, pear, chair; bat, hat, cat.' },
      },
    },
    '1:skip-counting': {
      byType: {
        'G1-123@w': { say: '"On this page we count by tens: 10, 20, 30. Some numbers are missing. Count by tens and write each missing number."', first: 'Count by tens to 100 together, clapping on each number. Read the first row aloud together and clap at each empty box. Ask, "What number goes here?" Write it in. Tell the children that a row does not always start at 10.', stuck: 'Have the child whisper the count by tens from the first number of the row, one box at a time: each number is ten more than the one before it.' },
        'G1-125@w': { say: '"On this page we count by twos: 2, 4, 6, 8. Some numbers are missing. Count by twos and write each missing number."', first: 'Count by twos to 40 together, whispering the numbers in between. Read the first row aloud together and clap at each empty box. Ask, "What number goes here?" Write it in. Tell the children that a row does not always start at 2.', stuck: 'Have the child whisper the count by twos from the first number of the row, one box at a time: each number is two more than the one before it.' },
        'G1-278@w': { say: '"On each number line the marks count by fives. Count by fives from the printed numbers to each arrow, and write the number it points to."', first: 'Count by fives to 50 together. Draw the first line on the board, start at 0, and count each mark: "5, 10, 15." Stop at the arrow and write that number.', stuck: 'Have the child put a finger on the printed number before the arrow and count on by fives, one mark at a time.' },
      },
    },
    '1:spell-picture-words': {
      byType: {
        'G1-301': { say: '"Say the name of each picture. Find its word in the word bank, and write it in the letter boxes, one letter in each box."', first: 'Read the words in the bank aloud together and name the pictures. Do the first one together: find the word, count its letters and the boxes, and write one letter in each box.' },
        'G1-304': { say: '"Say the name of each picture. Use every clue to write its word: the word bank, the letter boxes, and the first letter."', first: 'Read the words in the bank aloud together and name the pictures. Do the first one together: find the word in the bank, check its first letter, and write one letter in each box.' },
      },
      byPage: {
        'write-the-word-food-bw-g1258-2': { first: 'Read the words in the bank aloud together: bread, cheese, donut, fish, pizza, taco. Name the pictures together. Do the first one together on the board: find its word in the bank and finish it after the first letter.' },
        'write-the-word-accessories-g1258-3': { first: 'Read the words in the bank aloud together and name the pictures: hat, mask, scarf, wallet, medal, vest. Do the first one together on the board: find its word in the bank and finish it after the first letter.' },
      },
    },
    '1:story-sequencing': {
      byType: {
        'G1-400': {
          say: '"Each row is a little story in three pictures, and a question mark shows the picture that comes next. Look at what changes. Circle the picture below the story that belongs in the question-mark frame."',
          first: 'Do the first story together: ask a child to say what happens in each picture. Ask, "What happens next?" Look at the three choices below and circle the one that goes on the story.',
          stuck: 'Have the child tell the story aloud with each choice at the end; the choice that makes sense is the right one.',
        },
        'G1-401@w': { first: 'Do the first story together: look at the first picture and the last one and ask, "What changed? What must have happened in between?" Let two or three children say their ideas. Each child draws their own middle picture; many drawings can be right.' },
        'G1-402@w': { first: 'Read the four sentences of the first story aloud. Ask, "What happens first? How do you know?" Write 1 next to it, then 2, 3, and 4 together. Then draw a line from each sentence to its picture.' },
      },
    },
    '1:subtract-cross-out': {
      byType: {
        'G1-104@w': { first: 'Do the first box together: count all the pictures, then count the crossed-out ones. Read the number sentence aloud. Count the pictures that are not crossed out and write the number after the equals sign.' },
      },
    },
    '1:syllables-split': {
      byType: {
        'G1-325': { say: '"Read the word beside each picture. Copy it on the line and write a small dash between its syllables, its beats."', first: 'Clap a long word together: "el-e-phant, three claps." Write el-e-phant on the board with dashes. Read the first word on the page together, clap it, and copy it with dashes.', stuck: 'Have the child put a hand under the chin and say the word: each time the chin drops is a syllable. Write the word one syllable at a time.' },
      },
    },
    '1:tens-and-ones': {
      byType: {
        'G1-563@w': { say: '"Each picture shows ten-rods. Each rod is ten. Count the tens, write how many tens there are, and then write the number."', first: 'Draw three rods on the board and count by tens: "10, 20, 30. Three tens is thirty." Do the first one on the page together: count the rods, write the number of tens, then the number.' },
        'G1-564@w': { say: '"Each picture shows one ten-rod and some ones. Write how many ones there are, and then write the number: ten and some more."', first: 'Draw one rod and three small cubes on the board: "One ten and three ones: thirteen." Do the first one on the page together: count the ones, write the number of ones, then the number.' },
      },
    },
    '1:time-read': {
      byType: {
        'G1-148@w': { say: '"Read each clock. The short hand shows the hour. Circle the time that matches the clock."', first: 'Draw a clock on the board showing 3:00 and say, "The long hand is on the 12, so it is something o\'clock. The short hand points to 3: three o\'clock." Do the first clock on the page together. Some choices end in :30; check where the long hand points.' },
        'G1-477@w': { say: '"Read the times in words. Draw a line from each clock to the words that tell its time."', first: 'Draw a clock on the board at half past three and say, "The long hand is on the 6: half past. The short hand is just past the 3: half past three." Read the words on the page aloud together and match the first clock together. Quarter past means the long hand is on the 3.' },
      },
    },
    '1:unscramble-sentence': {
      byType: {
        'G1-282': { say: '"The words of each sentence are mixed up. The word with the capital letter comes first, and the word with the end mark comes last. Put the words in order and write the sentence on the line."' },
        'G1-283': { say: '"The words of each sentence are mixed up, and there is no capital letter and no period to help you. Put the words in order and write the sentence with a capital letter and a period."' },
      },
    },
    '1:word-classes': {
      byType: {
        'G1-300': { say: '"A noun names a person, an animal, a place, or a thing. An adjective tells what something is like, like big or red. Read each word and write it in the right bin."', first: 'Read all the words on the page aloud with the class. Do the first two words together: "Is it a thing, or does it tell what something is like?" Write each in its bin.' },
      },
    },
    '1:word-families-syllable-reading': {
      byType: {
        'G1-332': { say: '"The carpet at the top has rows of words. Each row is a word family: the words end the same. Read every word out loud. Then find each picture\'s word on the carpet and color it."', first: 'Read the carpet aloud together, one row at a time. Name the first picture and find its word together. Color it. Tell the children to say the picture word, then look in the row whose words end the same way.' },
        'G1-333': { say: '"Read every word on the carpet out loud. Say each picture word, find it on the carpet, and write the two letters it starts with on the line."', first: 'Read the carpet aloud together. Name the first picture, find its word, and write its first two letters on the line together: they are a blend, two sounds you hear together.' },
      },
      byPage: {
        'syllable-reading-g1332': { first: 'Read the carpet aloud together, one row at a time. Name the pictures together: log, fan, jug, cat, can, clock. Find the first picture\'s word together and color it.' },
        'syllable-reading-g1332-2': { first: 'Read the carpet aloud together, one row at a time. Name the pictures together: bat, mug, jug, log, rock, van. Find the first picture\'s word together and color it.' },
        'syllable-reading-g1333': { first: 'Read the carpet aloud together. Name the pictures together: truck, drum, clock, swan, flag, frog. Do the first one together: find "truck" and write tr on the line.' },
        'syllable-reading-g1333-4-l2': { first: 'Read the carpet aloud together. Name the pictures together: glass, brush, swing, stamp, truck, crib. Do the first one together: find "glass" and write gl on the line.' },
      },
    },
    '1:word-problems': {
      byType: {
        'G1-213@w': { first: 'Read the first story aloud while the children follow with a finger. Ask, "What do we know? What do we need to find out?" Count the pictures together or count on, and write the answer in the box. Then read each story aloud for the class, one at a time.' },
        'G1-238@w': { first: 'Read the first story aloud while the children follow with a finger. Ask, "Are things put together? Then we add." Use the pictures to count all, and write the answer in the box. Then read each story aloud for the class, one at a time.' },
        'G1-239@w': { first: 'Read the first story aloud while the children follow with a finger. Ask, "Are some taken away? Then we subtract." Use the pictures: cover the ones that go away and count the rest. Write the answer in the box. Then read each story aloud for the class.' },
        'G1-240@w': { first: 'Read the first story aloud while the children follow with a finger. Ask, "Do we add or take away?" Use the pictures to count, and write the answer in the box. Then read each story aloud for the class, one at a time.' },
      },
    },
    'K:mazes': {
      byType: {
        'K-411': { say: '"Read the title with me: it tells you who is going where. At every fork, take the road to the next number when you count: 1, 2, 3, all the way to 20."', first: 'Count from 1 to 20 aloud together. Put your finger on the start and find 1. Ask, "What comes next? Which road goes to 2?" Draw the first part together. Tell the children to say each number as they reach it.' },
      },
    },
  },
};

// What a child who is stuck needs on EVERY page of a type: the scripts of the first days end with the answers of
// their own page, which a week page must not inherit. Merged into the type's week script ('<type>@w').
const WEEK = {
  '1:fluency-within-20': { 'G1-217': { stuck: 'Have the child count up from the smaller number to the bigger one on fingers: for 17 minus 9, say "9" and count up to 17. Drawing dots and crossing them out is fine, too.' } },
  '1:tens-and-ones': {
    'G1-563': { stuck: 'Have the child touch each rod and count by tens: 10, 20, 30. The number of rods is the number of tens, and the number ends in 0.' },
    'G1-564': { stuck: 'Have the child say "ten" for the rod and count on by ones for each cube: eleven, twelve, thirteen. The number starts with 1 and ends with the number of ones.' },
  },
};
for (const [id, types] of Object.entries(WEEK)) for (const [type, o] of Object.entries(types)) {
  const P = (module.exports.points[id] = module.exports.points[id] || {});
  const T = (P.byType = P.byType || {});
  T[type + '@w'] = Object.assign({}, T[type + '@w'], o);
}
