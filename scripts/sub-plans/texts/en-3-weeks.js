'use strict';
/**
 * Guest teacher scripts, English (US), Grade 3: the week days of Part 5.4. New teaching points get their whole
 * script; points whose script lives in another text file get what is true of a NEW worksheet type (byType) or a week
 * script for a type the first days use ('<type>@w', and '<type>+@w' for its harder page: true of every page of the
 * type, where the type's own script names the page of a day of Parts 5.1-5.2, with its reference answers). Written
 * from the pages' pictures and printed text. Nothing here changes a block of the 24 days. Merged into
 * frontend/content/sub-plans/scripts/en.json by scripts/sub-plans/apply-texts.js.
 */
const text = (what, task, tip) => ({
  say: '"Read the ' + what + ' carefully, all the way to the end. Then ' + task,
  first: 'Read the title and the first paragraph aloud while the children follow; they read the rest on their own. Read the first question aloud and ask, "Which paragraph tells us?" Find it together and write the first answer together.' + (tip ? ' ' + tip : ''),
  stuck: 'Read the question with the child and look for its key words in the ' + what + '. Have the child put a finger on the paragraph that answers it and read it aloud before writing. A short answer in the child\'s own words is fine.',
});
const lesson = (say, first, stuck) => ({ say, first, stuck: stuck || 'Read the rule box at the top with the child again and do one more item together. Then let the child try the next one alone and check it with you.' });
const writing = (say, first) => ({
  say,
  first,
  stuck: 'Have the child tell you the idea aloud first; then say, "Write that." Help with the first words of a sentence, and let the child spell words as well as they can. A short, finished piece is better than a long, unfinished one.',
});

module.exports = {
  loc: 'en',
  points: {
    // ---- reading ----
    '3:answer-with-evidence': Object.assign(text('text', 'write each answer. In the box, write the number of the paragraph that proves your answer."', 'Show the children the small numbers at the start of the paragraphs.'), {
      byType: {
        'G3-495': {
          say: '"Read the text. Each sentence in a box comes from the text. Write the question that the sentence answers. The first one is started for you."',
          first: 'Read the text aloud with the class. Read the first sentence in a box and ask, "What question does this answer?" Look at how the first one is started and finish it together. A question ends with a question mark.',
          stuck: 'Have the child find the sentence in the text and ask, "What would someone ask to get this answer: who, what, where, when, why, or how?"',
        },
      },
    }),
    '3:central-message': Object.assign(text('story', 'write its central message, the lesson it teaches, and three things in the story that show it."', 'After reading, ask, "What does this story teach us?"'), {
      byType: {
        'G3-505': text('story', 'retell it: write the four main events in order."', 'Ask the class, "What happens first? What is the most important thing that happens next?"'),
      },
    }),
    '3:events-cause-effect': Object.assign(text('text', 'write the four events or steps in order."', 'Look for time words like first, then, and later together.'), {
      byType: {
        'G3-501': text('text', 'write the missing cause or effect. A cause makes something happen; an effect is what happens."', 'Write "Because it rained, the game was canceled" on the board: the rain is the cause, the canceled game the effect.'),
      },
    }),
    '3:main-idea-key-details': Object.assign(text('text', 'write the main idea of the whole text and three key details that support it."', 'Ask, "What is the whole text mostly about?" before the children write.'), {
      byType: {
        'G3-497': text('text', 'write what each paragraph is mostly about."', 'Do the first paragraph together: read it and say in a few words what it is mostly about.'),
      },
    }),
    '3:story-evidence': Object.assign(text('story', 'write each answer. In the box, write the number of the paragraph that proves your answer."', 'Show the children the small numbers at the start of the paragraphs.'), {
      byType: {
        'G3-503': {
          say: '"Read the story. Each sentence in a box comes from the story. Write the question that the sentence answers. The first one is started for you."',
          first: 'Read the story aloud with the class. Read the first sentence in a box and ask, "What question does this answer?" Look at how the first one is started and finish it together.',
          stuck: 'Have the child find the sentence in the story and ask, "What would someone ask to get this answer: who, what, where, when, why, or how?"',
        },
      },
    }),
    '2:read-and-answer': {
      byType: {
        'G2-254+@w': { first: 'Read the title and the story aloud while the children follow; then they read it again on their own. Read the first question and its choices aloud and ask, "Which sentence helps us?" Circle the answer together. Question 3 asks the children to write their own answer on the lines: tell them to use a full sentence.' },
        'G2-269+@w': { first: 'Read the title and the story aloud while the children follow; then they read it again on their own. Read the first question and its choices aloud and ask, "Which sentence helps us?" Circle the answer together. Question 3 asks the children to write their own answer on the lines: tell them to use a full sentence.' },
        'G2-270+@w': { first: 'Read the title and the story aloud while the children follow; then they read it again on their own. Read the first question and its choices aloud and ask, "Which sentence helps us?" Circle the answer together. Question 3 asks the children to write their own answer on the lines: tell them to use a full sentence.' },
        'G2-271+@w': { first: 'Read the title and the story aloud while the children follow; then they read it again on their own. Read the first question and its choices aloud and ask, "Which sentence helps us?" Circle the answer together. Question 3 asks the children to write their own answer on the lines: tell them to use a full sentence.' },
        'G2-272+@w': { first: 'Read the title and the story aloud while the children follow; then they read it again on their own. Read the first question and its choices aloud and ask, "Which sentence helps us?" Circle the answer together. Question 3 asks the children to write their own answer on the lines: tell them to use a full sentence.' },
        'G2-273+@w': { first: 'Read the title and the story aloud while the children follow; then they read it again on their own. Read the first question and its choices aloud and ask, "Which sentence helps us?" Circle the answer together. Question 3 asks the children to write their own answer on the lines: tell them to use a full sentence.' },
      },
    },

    // ---- word work ----
    '3:closed-open-syllables': Object.assign(lesson(
      '"A closed syllable ends with a consonant, and its vowel is short: rab in rabbit. An open syllable ends with a vowel, and the vowel says its name: ro in robot. Read each word, draw a line between its syllables, and write C or O for each one."',
      'Read the box at the top aloud. Write robot and rabbit on the board, split them together (ro|bot, rab|bit), and mark each part C or O. Read the first word on the page together and do it.',
      'Have the child look at the letters between the two vowels. Two consonants: split between them. One consonant: split after the first vowel and say it long; if that is not a word, split after the consonant and say it short. A part that ends with a vowel is open, a part that ends with a consonant is closed.'), {
      byType: {
        // the sort page (review of Part 5.4: it has headings, not boxes for C and O)
        'G3-513': { say: '"A closed syllable ends with a consonant, and its vowel is short: rab in rabbit. An open syllable ends with a vowel, and the vowel says its name: ro in robot. Read each word and write it under its heading, closed or open first syllable, with a line between its syllables. Then answer each sentence with yes or no."', first: 'Read the two headings aloud. Write tiger and napkin on the board and split them together: ti|ger has an open first syllable with a long i, nap|kin a closed one with a short a. Read the first word on the page together and write it under its heading.' },
      },
      // the answers of each page (a guest teacher has no key), from the page's words and the generator's own word list
      byPage: {
        'syllable-split-g3512': { stuck: 'Have the child look at the letters between the two vowels. Two consonants: split between them. One consonant: split after the first vowel and say it long; if that is not a word, split after the consonant and say it short. A part that ends with a vowel is open, a part that ends with a consonant is closed. For your own reference, on this page the splits are hu|mid, e|mu, pro|gram, ra|ven, la|bel, ten|nis, so|lo, pu|pil, ha|lo, mi|nus, po|lo, bi|son, lo|go, pup|pet, hu|man, and pen|cil; a part that ends with a vowel gets O, a part that ends with a consonant gets C. The sentences take silo, unit, music, bacon, hotel, and photo.' },
        'syllable-split-g3512-2': { stuck: 'Have the child look at the letters between the two vowels. Two consonants: split between them. One consonant: split after the first vowel and say it long; if that is not a word, split after the consonant and say it short. A part that ends with a vowel is open, a part that ends with a consonant is closed. For your own reference, on this page the splits are cac|tus, si|lo, e|mu, mo|ment, mo|tel, si|lent, ro|dent, pic|nic, ba|con, hu|mid, si|ren, dol|phin, to|ken, ten|nis, po|lo, and ra|ven; a part that ends with a vowel gets O, a part that ends with a consonant gets C. The sentences take program, frozen, broken, pupil, halo, and label.' },
        'syllable-split-g3512-3': { stuck: 'Have the child look at the letters between the two vowels. Two consonants: split between them. One consonant: split after the first vowel and say it long; if that is not a word, split after the consonant and say it short. A part that ends with a vowel is open, a part that ends with a consonant is closed. For your own reference, on this page the splits are lo|go, pho|to, si|ren, o|val, to|tal, i|tem, si|lo, pup|pet, pic|nic, ha|lo, to|ken, ro|dent, e|mu, pen|cil, u|nit, and pro|gram; a part that ends with a vowel gets O, a part that ends with a consonant gets C. The sentences take even, broken, solo, human, raven, and minus.' },
        'syllable-split-g3513': { stuck: 'Have the child look at the letters between the two vowels. Two consonants: split between them. One consonant: split after the first vowel and say it long; if that is not a word, split after the consonant and say it short. A part that ends with a vowel is open, a part that ends with a consonant is closed. For your own reference, on this page the words with a closed first syllable are hel|met, sig|nal, rib|bon, mod|el, grav|el, and trav|el; the words with an open first syllable are ro|bot, fo|cus, mu|sic, and mo|tel. The answers to the sentences are yes, no, no, yes, no, no.' },
        'syllable-split-g3513-2': { stuck: 'Have the child look at the letters between the two vowels. Two consonants: split between them. One consonant: split after the first vowel and say it long; if that is not a word, split after the consonant and say it short. A part that ends with a vowel is open, a part that ends with a consonant is closed. For your own reference, on this page the words with a closed first syllable are ab|sent, in|vent, mag|ic, tun|nel, pet|al, and rob|in; the words with an open first syllable are lo|go, ro|dent, u|nit, and li|lac. The answers to the sentences are yes, no, no, yes, no, no.' },
      },
    }),
    '3:context-clues': lesson(
      '"When you do not know a word, the words around it can help. The box at the top shows four kinds of clues: a definition, a synonym, an antonym, and an example. Read each sentence and do what the page asks."',
      'Read the box at the top aloud with an example of each kind. Read the first sentence on the page aloud and find the clue together: "Which words help us know what it means?"',
      'Read the sentence with the child and cover the new word. Ask, "What word could go here?" Then find the words that helped.'),
    '3:parts-of-speech': Object.assign(lesson(
      '"Every word has a job. A noun names something, a pronoun takes its place, a verb shows an action or being, an adjective tells about a noun, and an adverb tells how. Label each word by its job."',
      'Read the box with the letters for each job aloud. Read the first sentence on the page aloud and label its first word together: "What job does this word do here?"',
      'Ask the questions one by one: "Is it a thing? Does it replace a name? Is it something you do? Does it describe a thing? Does it tell how?"'), {
      byType: {
        'G3-531': { say: '"Every word has a job. A noun names something, a pronoun takes its place, a verb shows an action or being, an adjective tells about a noun, and an adverb tells how, when, or how often. Write each word in the column of its job and cross it out. Then write two more words of your own for each job."' },
      },
      byPage: {
        'word-classes-g3530': { stuck: 'Ask the questions one by one: "Is it a thing? Does it replace a name? Is it something you do? Does it describe a thing? Does it tell how?" For your own reference, on this page: 1 playful Adj, kittens N, chased V, it P; 2 cookies N, were V, crunchy Adj; 3 Omar N, built V, huge Adj, castle N; 4 noisy Adj, parrot N, repeated V, funny Adj, words N; 5 She P, waved V, sadly Adv; 6 We P, happily Adv, shared V, warm Adj, bread N; 7 ocean N, was V, calm Adj; 8 Rosa N, carefully Adv, painted V, tiny Adj, shell N.' },
        'word-classes-g3530-2': { stuck: 'Ask the questions one by one: "Is it a thing? Does it replace a name? Is it something you do? Does it describe a thing? Does it tell how?" For your own reference, on this page: 1 I P, always Adv, wash V, dishes N; 2 He P, gladly Adv, shared V, juicy Adj, apples N; 3 Ella N, quietly Adv, closed V, door N; 4 They P, hugged V, me P; 5 He P, quickly Adv, finished V, tricky Adj, puzzle N; 6 friendly Adj, nurse N, often Adv, helped V, us P; 7 You P, laugh V, often Adv; 8 Thirsty Adj, horses N, drank V, cool Adj, water N.' },
        'word-classes-g3531': { stuck: 'Ask the questions one by one: "Is it a thing? Does it replace a name? Is it something you do? Does it describe a thing? Does it tell how?" For your own reference, on this page the nouns are planet and aunt; the pronouns you, I, he, and they; the verbs hid and drank; the adjectives hungry, huge, and shiny; the adverbs neatly, now, sadly, and soon.' },
        'word-classes-g3531-2': { stuck: 'Ask the questions one by one: "Is it a thing? Does it replace a name? Is it something you do? Does it describe a thing? Does it tell how?" For your own reference, on this page the nouns are teacher and zoo; the pronouns it, them, and we; the verbs hid, dug, and grabbed; the adjectives curly, hungry, and cozy; the adverbs always, slowly, soon, and calmly.' },
      },
    }),
    '3:plural-nouns': lesson(
      '"A plural noun names more than one. Its spelling follows a rule: add -s; add -es after s, x, z, ch, or sh; change y to i and add -es; some words change completely. Read the rules at the top and do each part of the page."',
      'Read the rule box aloud and write one example of each rule on the board: cats, boxes, babies, leaves. Do the first item on the page together and say which rule it follows.',
      'Have the child look at the last letter or letters of the word and find the matching rule in the box.'),
    '3:past-tense-verbs': Object.assign(lesson(
      '"Regular verbs add -ed in the past: walk, walked. Irregular verbs change: go, went. Read the rules at the top and do each part of the page."',
      'Read the rule box aloud with an example of each rule. Do the first item on the page together and say which rule it follows.',
      'Ask the child to say the verb in a sentence with "yesterday": "Yesterday I…" The word they say is often the past tense; then check its spelling with the rules.'), {
      byType: {
        'G3-535': lesson(
          '"This little story is told in the present. Rewrite it in the past tense: change every numbered verb to its yesterday form."',
          'Read the story aloud. Do the first numbered verb together: "make… yesterday we made." Write it on the line. Remind the children that some verbs just add -ed and some change.',
          'Have the child read the sentence with "yesterday" at the start and say the verb that sounds right.'),
      },
    }),
    '3:possessive-nouns': lesson(
      '"An apostrophe shows who owns something. One owner: add apostrophe s, the bee\'s hive. More than one owner that ends in s: add the apostrophe after the s, the bees\' hives. Read the box and do each part of the page."',
      'Read the box at the top aloud. Write the bee\'s hive and the bees\' hives on the board and ask how many bees there are in each. Do the first item together: "How many owners?"',
      'Ask the child, "Is there one owner or more than one?" Then point to the matching rule in the box.'),
    '3:suffixes-able-ment-ness-ful-less': lesson(
      '"A suffix at the end changes a word: kind and -ness make kindness. Read each word, circle the base word, and underline the suffix. Then do the rest of the page."',
      'Write kindness on the board: circle kind, underline -ness. Ask what it means: being kind. Do the first word on the page together.',
      'Cover the suffix with a finger and read the base word. Then read the whole word and ask what it means.'),

    // ---- writing ----
    '3:dialogue-and-description': lesson(
      '"Quotation marks go around the exact words someone says. A comma or an end mark goes inside the closing quotation mark: “We won,” said Kim. Read the box and do each part of the page."',
      'Read the box at the top aloud. Write a line of dialogue on the board and point to each mark. Do the first item on the page together.',
      'Have the child put a finger on the words the person says: they go inside the quotation marks, and the comma or end mark goes in with them.'),
    '3:joining-words': lesson(
      '"A joining word shows how two ideas go together. And adds another idea, because tells why, but shows a difference, and so tells the result. Join the sentences with a word from the box."',
      'Read the box aloud. Read the first two sentences aloud and try each joining word between them. Ask which one makes sense and write the joined sentence together.',
      'Read the two sentences with each joining word and ask, "Which one tells how they go together?"'),
    '3:linking-words': Object.assign(lesson(
      '"Linking words join an opinion to its reasons. Because and since tell why. Therefore tells what happens as a result. For example gives an example. Circle the linking word that fits each sentence."',
      'Read the box at the top aloud. Read the first sentence aloud with each linking word and circle the one that fits together.',
      'Ask, "Does the second part give a reason, a result, or an example?" Then find the word for it in the box.'), {
      byType: {
        'G3-551': writing('"Write your opinion piece. Choose one question, state your opinion, give reasons, and join them with linking words. End with a closing sentence."', 'Read the questions aloud and let a few children say an opinion and a reason. Write a frame on the board: In my opinion … because … Also, … For example, … That is why … Each child circles one question and writes.'),
      },
    }),
    '3:opinion-and-reasons': Object.assign(lesson(
      '"An opinion piece tells what the writer thinks and gives reasons for it. A fact can be checked and proved true. Read the box at the top and do each part of the page."',
      'Read the box at the top aloud. Write "Dogs are the best pets" and "Dogs have four legs" on the board and ask which is an opinion and which is a fact. Do the first item on the page together.',
      'Ask, "Can everyone agree, and can we check it? Then it is a fact. Could people disagree? Then it is an opinion."'), {
      byType: {
        'G3-549': writing('"Plan your opinion piece before you write: choose a question, write your opinion, and give reasons that tell why."', 'Read the questions aloud and let a few children say their opinion and one reason. Each child circles a question and fills in the plan.'),
      },
    }),
    '3:plan-a-story': Object.assign(lesson(
      '"Every story has characters, a setting, a problem, and a narrator who tells it. Read the box at the top and do each part of the page."',
      'Read the box at the top aloud and name the parts in a story the class knows. Do the first item on the page together.',
      'Ask the child, "Who is in the story? Where is it? What goes wrong? Who tells it?"'), {
      byType: {
        'G3-565': writing('"Plan your story: choose a story idea, then plan the beginning, the middle, and the end."', 'Read the story ideas aloud and let a few children say what could happen. Each child circles an idea and fills in the plan: who and where at the beginning, the problem in the middle, how it is solved at the end.'),
      },
    }),
    '3:time-words-in-stories': Object.assign(lesson(
      '"Time words like first, later that day, and finally tell when things happen in a story. Read the box at the top and do each part of the page."',
      'Read the box of time words aloud. Do the first item on the page together and say where the time word goes.',
      'Ask the child, "Does this happen at the start, in the middle, or at the end?" Then pick a time word from that part of the box.'), {
      byType: {
        'G3-569': writing('"Write a short story with time words, so a reader can follow the events in order. Read the example first."', 'Read the example story aloud and point to its time words. Let a few children say a story idea. Each child writes a story with at least three time words.'),
      },
    }),

    // ---- math ----
    '3:compare-fractions': lesson(
      '"Each row has two fraction bars. Look at both bars. Circle the bigger fraction."',
      'Draw two bars of the same length on the board, one cut into halves and one into fourths. Shade one half and one fourth and ask which is bigger. Do the first row on the page together: compare how much of each bar is shaded.',
      'Have the child compare the shaded parts of the two bars side by side. When the bars are the same size, the longer shaded part is the bigger fraction.'),
    '3:division-sharing': lesson(
      '"Share the pile equally into the bins. Write how many each bin gets. That is division: 12 ÷ 3 means 12 shared into 3 equal groups."',
      'Draw 12 dots and 3 circles on the board. Share the dots one at a time into the circles and count each circle: 4. Write 12 ÷ 3 = 4. Do the first problem on the page together.',
      'Have the child share the pictures one by one, crossing each off, until none is left. Then count one bin.'),
    '3:equivalent-fractions': lesson(
      '"Some fractions look different but show the same amount, like one half and two fourths. Draw a line from each picture to the fraction that shows the same amount."',
      'Draw two bars of the same length: one with one half shaded, one with two fourths shaded. Show that the shaded parts are the same length. Do the first picture on the page together: count the parts and the shaded parts.',
      'Have the child count the equal parts (the bottom number) and the shaded parts (the top number) of the picture, then find the fraction that matches.'),
    '3:mult-equal-groups': lesson(
      '"Count the equal groups and how many are in each group. Finish the multiplication: the number of groups times the number in each group."',
      'Draw 3 groups of 4 dots on the board. Count the groups and the dots in one group: 3 groups of 4 is 3 × 4 = 12. Do the first one on the page together.',
      'Have the child count by the number in each group: 4, 8, 12. The number of groups is how many times they count.'),
    '3:right-angles': lesson(
      '"A right angle is a square corner, like the corner of a sheet of paper. Circle every right angle on the page."',
      'Hold up a sheet of paper and show its square corner. Show the children how to check a corner on the page with the corner of a sheet of paper or an index card. Find one right angle together and circle it.',
      'Give the child a scrap of paper and have them hold its corner in each angle: if it fits exactly, it is a right angle.'),
    '3:scaled-graphs': lesson(
      '"Careful: on this graph each line of the scale counts by five, not by one. Read the value of each bar and write it."',
      'Point to the scale on the side and count it together: 0, 5, 10, 15. Read the first bar together: slide a finger from its top across to the scale. If it stops between two lines, it is halfway between them.',
      'Have the child put a finger on the top of the bar and move it straight across to the scale, then count by fives from zero up to that line.'),
    '3:time-to-minute': lesson(
      '"Read each clock to the minute. The short hand shows the hour. Count the minutes by fives, then by ones. Circle the time that matches."',
      'Draw a clock on the board with the long hand two marks after the 4. Count by fives to the 4 (20) and then by ones (21, 22): 22 minutes. Do the first clock on the page together.',
      'Have the child count by fives to the number before the long hand, then count each small mark by ones.'),
    '2:mass-grams': lesson(
      '"Read each measuring cup and balance scale. Write the amount with its unit: grams for the scale, milliliters for the cup."',
      'Point to the numbers on the first cup or scale and count the marks between them together. Read where the line or the pointer is and write the amount with its unit.',
      'Have the child find the printed number just below the line and count the marks up to it.'),
    '2:moon-phases': lesson(
      '"Look at each moon. Write its name on the lines: new moon, first quarter, full moon, or last quarter. Use each word in the word bank twice."',
      'Read the word bank aloud. Draw a full moon (all bright) and a new moon (dark) on the board. A quarter moon shows half of the circle bright. Do the first moon on the page together.',
      'Ask the child, "Is it all bright, all dark, or half bright?" A half-bright moon is a quarter: first quarter when the right side is bright, last quarter when the left side is.'),
    '2:day-and-night': lesson(
      '"Look where the Sun is. The side of Earth that faces the Sun has day; the other side has night. At each numbered pin, is it day or night? Circle the word in the table."',
      'Point from the Sun on the page to Earth and show the side that faces it. Do the first pin together: "Does it face the Sun?" Circle day or night.',
      'Have the child trace a line from the Sun to the pin: if Earth is in the way, it is night there.'),
    '2:sink-float': Object.assign(lesson(
      '"The same clay can sink or float: a ball of clay sinks, a clay boat floats. Color the ring where each clay shape ends up, circle the thing that floats, then draw your own clay boat."',
      'Talk about the pictures: a ball and a flat boat made of the same clay. Ask, "Which one floats? Why?" Do the first part together.',
      'Ask the child, "Is it flat and wide like a boat, or a tight ball?"'), {
      byType: {
        'G2-383': lesson('"Read each sentence about things that sink and float, and circle true or false."', 'Name the pictures at the top together. Read the first sentence aloud and ask, "Is that true?" Talk about it, then circle.', 'Ask the child what happens to that thing in a bathtub or a pool.'),
      },
    }),
    '3:continents-oceans': lesson(
      '"The map shows the continents and the oceans, each with a number. Find each one on the map and write its number in the box next to its name."',
      'Read the names aloud together. Point to North America: "This is where the United States is." Find its number and write it next to North America together. The oceans are the big blue areas.',
      'Give clues: "The Pacific is the biggest ocean, on the left and right. Antarctica is the icy land at the bottom." Let the child find each one.'),

    '3:elapsed-duration': {
      say: '"Each row shows a start clock and an end clock. Read both and write how much time passed. The word next to the box tells you to answer in hours or in minutes."',
      first: 'Read the two clocks of the first row together and write both times on the board. Count on from the start time to the end time: by hours when the box says hours, by fives when it says minutes. Write the answer in the box.',
      stuck: 'Have the child write both times first. For hours, count the hours on from the first clock: "9 o\'clock, 10, 11, 12: three hours." For minutes, count by fives from where the first minute hand points to where the second one points, going past the 12 if it has to.',
    },
    '3:thermometer': {
      say: '"A thermometer shows how hot or cold it is. Find where the red line stops on the scale and write that temperature in degrees Fahrenheit."',
      first: 'Look at the scale of the first thermometer together: the numbers go up by tens, and each small mark between two numbers is 2 more degrees. Put a finger on the top of the red line, find the number just below it, and count up by twos to the top of the line. Write the number in the box.',
      stuck: 'Have the child find the number just below the top of the red line and count the small marks up by twos: "80, 82, 84, 86, 88." The top of the red line is the temperature, never the number above it.',
    },

    // ---- week scripts and new types of points whose script is in another text file ----
    '3:area-model': {
      byType: {
        'G3-488@w': { say: '"To find the area of a rectangle, multiply its two side lengths. Write the equation and the area with its unit."', first: 'Draw a rectangle on the board with sides 4 and 3 and fill it with a grid: count the squares, 12. Show that 4 × 3 = 12 square units. Do the first rectangle on the page together and write the unit.' },
        'G3-489@w': { say: '"Draw one straight line to split each L-shape into two rectangles. Find the area of each part. Then add the two areas."', first: 'Draw an L-shape on the board and split it with one line into two rectangles. Find each area and add them. Do the first shape on the page together.' },
      },
    },
    '3:arithmetic-patterns': {
      byType: {
        'G3-327@w': { say: '"The numbers in each row go down by the same amount. Find how much, and write the missing numbers."', first: 'Read the first row aloud. Look at two numbers next to each other and ask, "How much less is the second?" Count back by that amount to fill the empty boxes together.' },
        'G3-329@w': { say: '"Find the counting rule of each row: what is added each time? Write each missing number."', first: 'Read the first row aloud and look at two numbers next to each other: how much is added? Count on by that amount to fill the empty boxes together.' },
      },
    },
    '3:column-regrouping': {
      byType: {
        'G3-357@w': { say: '"Look at the sign of each problem first. Work one place at a time, starting with the ones: carry when a sum is ten or more, borrow when the top digit is too small."', first: 'Write the first problem on the board, one number under the other. Point to the sign first. Work the ones column first: if it is 10 or more, carry a ten; if you cannot take away, borrow a ten. Then the tens and the hundreds.' },
        'G3-362@w': { say: '"These are subtraction problems, written one number under the other. Work one place at a time, starting with the ones, and borrow when the top digit is too small. Where the tens digit is 0, borrow from the hundreds first."', first: 'Write the first problem on the board. The top number has a zero in the tens place, so to borrow for the ones you first borrow from the hundreds: the 0 becomes 10, then 9. Work it through together.' },
        'G3-363@w': { say: '"Look at the sign of each problem first: some add and some take away. Work one place at a time, starting with the ones: carry when a sum is ten or more, borrow when the top digit is too small."', first: 'Write the first problem on the board, one number under the other. Point to the sign first: the page mixes adding and taking away. Work the ones column first and carry or borrow when you need to.' },
      },
    },
    '3:fraction-unit-build': {
      byType: {
        'G3-316@w': { first: 'Draw a rectangle cut into four equal parts and color three: "three fourths." Do the first shape on the page together: read the fraction, count the equal parts, and color as many as the top number says.' },
      },
    },
    '3:input-output': {
      byType: {
        'G3-328@w': { first: 'Read the rule of the first machine aloud, for example "+9." Do the first number together: put it in, use the rule, and write what comes out. If the number that comes out is given, go backward: use the opposite rule.' },
      },
    },
    '3:muldiv-word-problems': {
      byType: {
        'G3-370@w': { say: '"Read each story. Are equal groups put together? Then you multiply. Is a total shared or split into equal groups? Then you divide. Write the number sentence and the answer."', first: 'Read the first story aloud. Ask, "Is it equal groups put together (multiply), or a total shared into equal groups (divide)?" Use the picture and write the answer and the answer sentence together.' },
        'G3-373@w': { say: '"Read each story. Are equal groups put together? Then you multiply. Is a total shared or split into equal groups? Then you divide. Write the number sentence and the answer."', first: 'Read the first story aloud. Circle equal groups in the picture together and count the groups: that is the answer.' },
        'G3-374@w': { say: '"Read each story. Are equal groups put together? Then you multiply. Is a total shared or split into equal groups? Then you divide. Write the number sentence and the answer."', first: 'Read both stories aloud. One shares things equally, the other makes equal groups; both are division. Solve the first one together with a quick drawing.' },
        'G3-375@w': { say: '"Read each story. Are equal groups put together? Then you multiply. Is a total shared or split into equal groups? Then you divide. Write the number sentence and the answer."', first: 'Read both stories aloud. One makes equal groups (multiply), the other splits a total into equal groups (divide). Solve the first one together with a quick drawing.' },
      },
    },
    '3:mult-div-relationship': {
      byType: {
        'G3-312@w': { say: '"Count the rows of each array and the things in one row. Write the missing factor."', first: 'Draw an array on the board, for example 2 rows of 7. Write ? × 7 = 14 and ask, "How many rows of 7 make 14?" Count the rows together. Do the first one on the page together.' },
        'G3-369@w': { say: '"Use the three numbers on the roof of each house to finish two multiplications and two divisions."', first: 'Draw a house with 2, 9, and 18 on the roof. Write the four facts together: 2 × 9, 9 × 2, 18 ÷ 2, 18 ÷ 9. The biggest number is the product. Do the first house on the page together.' },
      },
    },
    '3:perimeter': {
      byType: {
        'G3-490@w': { say: '"The perimeter of each shape is given. Write an equation with n for the missing side. Then find n."', first: 'Draw a rectangle on the board with sides 5, 5, 10, and n and the perimeter 30. Add the sides you know (20) and ask, "What more makes 30?" n = 10. Do the first shape on the page together.' },
      },
    },
    '3:rounding': {
      byType: {
        'G3-323@w': { first: 'Draw a number line from 400 to 500 with the dot near 470. Ask, "Is the dot closer to 400 or to 500?" Do the first one on the page together and circle the closer hundred.' },
        'G3-387@w': { first: 'Read the box at the top: 0 to 4 round down, 5 to 9 round up. Do the first number together: look at its ones digit and write it in the right bin.' },
        'G3-388@w': { first: 'Read the box at the top: look at the tens digit; 0 to 4 round down, 5 to 9 round up. Do the first number together on the board: 462 has 6 tens, so it rounds up to 500.' },
        'G3-390@w': { first: 'Read the ten at the top of the page. Do the first numbers together: look at the ones digit, round each one to the nearest ten, and circle it if it rounds to the ten at the top.' },
      },
    },
    '3:times-tables': {
      byType: {
        'G3-364@w': { say: '"Multiply. Write each product in the box. All the problems on this page use the same times table."', first: 'Count by the table\'s number together to ten times it. Do the first two problems together and show that each answer is the one before plus one more group.' },
        'G3-365@w': { say: '"Multiply. Write each product in the box. All the problems on this page use the same times table."', first: 'Count by the table\'s number together to ten times it. Do the first two problems together and show that each answer is the one before plus one more group.' },
        'G3-366@w': { say: '"Multiply. Write each product in the box. All the problems on this page use the same times table."', first: 'Count by the table\'s number together to ten times it. Do the first two problems together and show that each answer is the one before plus one more group.' },
        'G3-367@w': { say: '"Multiply. Write each product in the box. All the problems on this page use the same times table."', first: 'Count by the table\'s number together to ten times it. Do the first two problems together and show that each answer is the one before plus one more group.' },
        'G3-368@w': { say: '"Multiply. Write each product in the box. All the problems on this page use the same times table."', first: 'Count by the table\'s number together to ten times it. Do the first two problems together and show that each answer is the one before plus one more group.' },
      },
    },
    '2:hundreds-chart-moves': {
      byType: {
        'G2-322@w': { first: 'Point to the key at the top: up is 10 less, down is 10 more, left is 1 less, right is 1 more. Do the first puzzle on the board: follow the first number\'s arrow, then the second number\'s arrow, and check that both land on the same number.' },
      },
    },
  },
};

// What a child who is stuck needs on EVERY page of a type (and what to say where the first days' script describes a
// type of another task): the scripts of the first days end with the answers of their own page, which a week page must
// not inherit. Merged into the type's week script ('<type>@w').
const readStuck = 'Read the question to the child and ask, "Which sentence in the story gives you a clue?" For the written answer, have the child say the answer aloud first and start it with part of the question.';
const WEEK = {
  '2:read-and-answer': { 'G2-254+': { stuck: readStuck }, 'G2-269+': { stuck: readStuck }, 'G2-270+': { stuck: readStuck }, 'G2-271+': { stuck: readStuck }, 'G2-272+': { stuck: readStuck }, 'G2-273+': { stuck: readStuck } },
  '2:hundreds-chart-moves': { 'G2-322': { stuck: 'Have the child say what the arrow does before using it, and follow only one arrow at first. Then the child follows the second arrow; if the two answers are not the same, one of them needs another look.' } },
  '3:rounding': {
    // the script of Part 5.2 worked the first number of its own page and gave that page's answers
    'G3-391': {
      say: '"Round each number two times: first to the nearest ten, then to the nearest hundred. Look at the digit to the right of the place you round to: 0 to 4, round down; 5 to 9, round up."',
      first: 'Read the example at the top together; the wavy equal sign means "is about." Do the first number on the board: underline its tens digit and look at the ones digit to round to the nearest ten; then underline its hundreds digit and look at the tens digit to round to the nearest hundred. Tell the children to start from the number on the page both times.',
      stuck: 'Have the child say the two tens the number is between and ask which one is closer; then the two hundreds. A 5 always rounds up.',
    },
    'G3-323': { stuck: 'Have the child put a finger on the dot and count the small steps to each end of the line; the end with fewer steps is closer. Each small step is 10.' },
    'G3-387': { say: '"Rounding to the nearest ten: look at the ones digit. 0 to 4 round down, 5 to 9 round up. Write each number in the right bin: round down or round up."', stuck: 'Have the child cover every digit but the ones digit with a finger and check it against the box at the top: 0 to 4 down, 5 to 9 up.' },
    'G3-388': { say: '"Round each number to the nearest hundred and write it in the box. Look at the tens digit: 0 to 4 round down, 5 to 9 round up."', stuck: 'Have the child point to the tens digit and check it against the box at the top. Rounding down keeps the hundreds digit; rounding up adds one to it; the tens and ones become zeros.' },
    'G3-390': { say: '"The ten at the top is the answer we look for. Round each number to the nearest ten, and circle every number that rounds to the ten at the top."', stuck: 'Have the child round each number on its own: look at the ones digit, 0 to 4 down, 5 to 9 up. Then compare with the ten at the top.' },
  },
  '3:column-regrouping': {
    'G3-357': { stuck: 'Have the child cover all but one column and work it aloud. If a sum is ten or more, carry the ten; if the top digit is too small, borrow a ten. Check the sign of each problem first.' },
    'G3-362': { stuck: 'Have the child work one column at a time. Where the tens digit is 0, the child borrows from the hundreds first: the 0 becomes 10, then gives one ten to the ones and becomes 9.' },
    'G3-363': { stuck: 'Have the child cover all but one column and work it aloud. If a sum is ten or more, carry the ten; if the top digit is too small, borrow a ten. Check the sign of each problem first.' },
  },
  '3:arithmetic-patterns': {
    'G3-327': { stuck: 'Have the child find two numbers next to each other with no gap and count down from one to the other: that is the step. Where one box is empty between two numbers, the jump is two steps.' },
    'G3-329': { stuck: 'Have the child find two numbers next to each other with no gap and count up from one to the other: that is the step. Where one box is empty between two numbers, the jump is two steps.' },
  },
  '3:times-tables': Object.fromEntries(['G3-364', 'G3-365', 'G3-366', 'G3-367', 'G3-368'].map((t) => [t, { stuck: 'Have the child count by the table\'s number on fingers, one finger for each group, or start from a fact the child knows: 5 times the number, then count on by one more group.' }])),
  '3:input-output': { 'G3-328': { stuck: 'Ask the child, "Is the missing number before the arrow or after it?" After the arrow, the child uses the rule. Before the arrow, the child does the opposite, then checks by putting the number through the machine.' } },
  '3:mult-div-relationship': {
    'G3-312': { stuck: 'Have the child count the rows and the shapes in one row of the array. The missing factor is the number that is not printed: rows times shapes in a row makes the total.' },
    'G3-369': { stuck: 'Have the child find the biggest number on the roof: it is the product. The two smaller numbers are the factors: they multiply to the product, and the product divided by one factor gives the other.' },
  },
  '3:muldiv-word-problems': Object.fromEntries(['G3-370', 'G3-373', 'G3-374', 'G3-375'].map((t) => [t, { stuck: 'Ask the child to underline the two numbers in the story and to say what each number counts: the groups, or how many are in each group. The picture shows the groups, and counting them is fine as a check.' }])),
  '3:area-model': {
    'G3-488': { stuck: 'Have the child find the two side lengths and multiply them. A child who does not know the fact adds one side as many times as the other side says. The unit is "square" and the unit of the sides.' },
    'G3-489': { stuck: 'Help the child draw the line where the L bends, so that two rectangles show. Then find the two side lengths of each rectangle; a missing length is the long side take away the short side.' },
  },
  '3:perimeter': { 'G3-490': { stuck: 'Have the child add the sides that are given and take that sum away from the perimeter: what is left is n. Check by adding all the sides, n too: the sum must be the perimeter.' } },
  '3:fraction-unit-build': { 'G3-316': { say: '"Each shape is cut into equal parts. Read the fraction next to it and color that many parts: the top number tells how many to color, the bottom number how many equal parts the whole has."', stuck: 'Have the child count the equal parts of the shape and check them against the bottom number. Then color one part at a time, counting up to the top number.' } },
};
for (const [id, types] of Object.entries(WEEK)) for (const [type, o] of Object.entries(types)) {
  const P = (module.exports.points[id] = module.exports.points[id] || {});
  const T = (P.byType = P.byType || {});
  T[type + '@w'] = Object.assign({}, T[type + '@w'], o);
}
