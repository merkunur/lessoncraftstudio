'use strict';
/**
 * Guest teacher scripts, English (US), Kindergarten: the week days of Part 5.4 (a sub day for every week of the
 * year). New teaching points get their whole script; points whose script lives in texts/en-k.js get only what is
 * true of a NEW worksheet type (byType) or of ONE page (byPage: the picture words of a sound task, read off the page
 * picture and its manifest, Part 5 rules 4-5). Nothing here changes a block of the 24 days of Parts 5.1-5.2.
 * Kindergartners cannot read the directions: the guest teacher reads them aloud.
 * Merged into frontend/content/sub-plans/scripts/en.json by scripts/sub-plans/apply-texts.js.
 */
// the same sentence for several pages of one type (the pages differ only in their pictures)
const pages = (slugs, o) => Object.fromEntries(slugs.map((s) => [s, o]));
// a sort page with two or three labeled bins at the bottom: one script, its words given per point
const sortScript = (bins, example, note) => ({
  say: '"At the top of the page there are pictures. At the bottom there are ' + bins + '. Draw a line from each picture to the box where it belongs."',
  first: 'Read the words on the boxes aloud and point to each box. Name every picture together, so that everyone knows what it shows. Do the first picture together: ' + example + ' Draw the line from the dot under the picture to its box.' + (note ? ' ' + note : ''),
  stuck: 'Point to one picture at a time and ask the question of the page about it. If the child is not sure, ask about something the child knows: "Have you ever seen one? Where?" Then let the child choose the box.',
});

module.exports = {
  loc: 'en',
  points: {
    // ---- the Kindergarten social studies points (Stage D-3, 2026-11-24): the closing block of the weeks after their
    // lesson, written from the pages (lcs-stage-d/batch-sk/TEXT-DUMP.md; K-213 and K-212 from their generators) ----
    'K:class-rules': {
      say: '"Each row shows the same child two times. In one picture the child follows a class rule. Circle that picture, and put an X on the other one."',
      first: 'Do the first row together. Ask, "Which picture keeps everyone safe or helps us learn?" (walking in the hall, raising a hand, listening at story time, cleaning up the blocks). Have the children say the rule in their own words, then circle that picture and cross out the other.',
      stuck: 'Point to each picture and ask, "What is the child doing? Is that what we do in our class?" Say the rule for the child ("We walk in the hall.") and let the child find the picture that shows it.',
    },
    'K:take-turns-share': {
      say: '"Look at each picture. If the friends are taking turns, sharing or helping, circle it. If someone is not being kind, put an X on it."',
      first: 'Do one picture together. Ask, "What is happening here? Is that kind?" Talk about what the child does, never about a bad child. If a picture shows grabbing, say: "Grabbing a toy is not kind. What could the child do instead?"',
      stuck: 'Ask how the other friend in the picture feels: a happy friend usually means a kind picture, a sad friend means someone was not kind. Some pages have more kind pictures than others, so look at each picture on its own.',
    },
    'K:long-ago-today': {
      say: '"The pictures on the left are things from long ago. The pictures on the right are things we use today. Draw a line from each long-ago thing to the thing that does the same job today."',
      first: 'Name the long-ago things on your page together. Do the top one together: "What job does this do? Which thing on the right does that job today?"',
      stuck: 'Ask, "What job does this do?" (washing clothes, giving light at night, getting from place to place, talking to someone far away). Then have the child find the picture on the right that does the same job.',
    },
    'K:community-helpers': {
      say: '"Each helper on the left uses one of the tools on the right. Draw a line from each helper to the tool they use."',
      first: 'Name each helper and each tool on your page together. Do the top helper together: "What does this helper do at work? Which tool helps with that job?" If there is one more tool than helpers, one tool belongs to no one on the page; it gets no line.',
      stuck: 'Ask, "What does this helper do at work? What do they hold to do it?" Let the child act it out, then find that tool.',
    },
    'K:wants-needs': {
      say: '"Draw a line from each picture to Needs or to Wants. Needs are things we must have to live. Wants are things that are nice to have."',
      first: 'Point to the words Needs and Wants and read them aloud. Do the first picture together: "Can we live without this? Then is it a need or a want?"',
      stuck: 'Ask, "Could you live without it?" Food, water, clothes and a home are needs; toys and treats are wants.',
    },
    'K:choosing-one-thing': {
      say: '"In each row you can have only one thing. Circle the one you choose and put an X on the one you do not pick. There is no wrong answer."',
      first: 'The small "1" at the start of a row is not a choice. Read the first row together and say what the 1 means: a hand with a coin, "You have one coin. You can buy one of these, not both."; a hand with a book, "You can take home one book."; just the 1, "Recess has time for one thing." Ask, "Which do you choose?" Two children who choose differently are both right.',
      stuck: 'Ask, "Which one would you like more?" Then help the child put an X on the other one: "That is the one you give up." Check only that every row has one circle and one X.',
    },
    'K:goods-and-services': {
      say: '"Each worker on the left makes something or does something. Draw a line from each worker to what they make or do."',
      first: 'Name the workers on your page together by what they wear and hold (a tall white hat and a rolling pin: a baker; a hard hat and a hammer: a builder; a striped pole, scissors and a comb: a barber; a cap and a bag of letters: a mail carrier). Do the top worker together: "What does this worker make or do?"',
      stuck: 'Ask, "What is this worker holding? What would they make or do with it?"',
    },
    'K:our-flag': {
      say: '"This is the flag of our country, the United States. If your flag has red dots, color the stripes with the dots red. Color it like the small flag: red and white stripes, red at the top and the bottom. Color the box blue around the stars, and leave the stars white."',
      first: 'Look at the small colored flag together and name the stripes from the top: red, white, red. Each child needs a red crayon and a blue one; the white stripes and the stars stay white.',
      stuck: 'Have the child put a finger on a stripe of the small flag and find the same stripe on the big one. A stripe colored by mistake is fine; go on to the next stripe together.',
    },
    'K:fair-for-everyone': {
      say: '"The two pictures in each row show the same moment. Circle the picture that is fair to everyone."',
      first: 'Do the first row together. Ask, "In which picture does everyone get a turn, or the same?" Talk about what the children do (keeping the swing, sharing the crackers, letting a friend play), never about a bad child.',
      stuck: 'Ask how each child in the picture feels. In the fair picture everyone can smile; in the other one someone is left out, still waiting, or has none.',
    },
    'K:hot-cold-places': {
      say: '"One big picture is a snowy, cold place and the other is a hot beach. Draw a line from each thing to the place where people would use it."',
      first: 'Name the two places together and ask what the weather is like in each. Do the first thing together: "Would people use this in the snow or at the beach? Why?"',
      stuck: 'Ask, "Would this keep you warm, or help you stay cool?" Things for cold, snowy days go with the snowy place; things for hot, sunny days go with the beach.',
    },
    // ---- new points ----
    'K:animal-babies': {
      say: '"On the left are grown-up animals. On the right are their babies, but they are mixed up. Draw a line from each grown-up animal to its own baby."',
      first: 'Name the grown-up animals together, then the babies. Do the first one together: point to the first grown-up animal and ask, "Which baby belongs to it? How do you know?" Draw the line from dot to dot. Some babies look very different from their parents, like a caterpillar and a butterfly.',
      stuck: 'Point to one baby and ask what kind of animal it will be when it grows up. If the child does not know, say what the baby is called: a calf is a baby cow, a foal is a baby horse, a chick is a baby hen.',
    },
    'K:animal-groups-homes': Object.assign(sortScript('two boxes for two kinds of animals', 'ask, "Where does this animal live? Does it live with people, or in the wild?"'), {
      byType: {
        'K-204': { first: 'Read the two boxes aloud, Pets and Wild Animals, and name every animal together. Do the first one together: ask, "Can this animal live in a house with people, or does it live in the wild?" Draw the line from the dot under it to its box. A rabbit can be a pet or wild; either box is right for it.' },
        'K-209': { first: 'Read the two boxes aloud, Farm Animals and Wild Animals, and name every animal together. Do the first one together: ask, "Does this animal live on a farm, or in the wild?" Draw the line from the dot under it to its box.' },
      },
    }),
    'K:count-out-n': {
      say: '"Look at the number at the start of each row. Color that many pictures in the row, no more and no fewer. Leave the other pictures white."',
      first: 'Read the first number together. Touch the pictures of that row one by one as the class counts aloud, and color one picture for each number said. Stop at the number. Count the colored pictures once more to check.',
      stuck: 'Have the child put a finger on the first picture and say "one" while coloring it, then "two" on the next. Stop when the count reaches the number in the circle. If the child has colored too many, count the colored ones together and start a fresh row more slowly.',
    },
    'K:articles': {
      say: '"Under each picture are two little words: a and an. Say the name of the picture with a in front of it, then with an. Circle the one that sounds right."',
      first: 'Say the picture words of the page together first (they are below). Do the first one together: "a elephant, an elephant. Which sounds right?" Circle an. Tell the children that an goes in front of words that start with a, e, i, o, or u.',
      stuck: 'Say both choices for the child, slowly, and let the child hear which one is easier to say. Ask, "Does the word start with a, e, i, o, or u?"',
      byPage: {
        'articles-animals-k306': { first: 'Name the pictures together: elephant, pig, owl, fox. Do the first one together: "a elephant, an elephant. Which sounds right?" Circle an. Tell the children that an goes in front of words that start with a, e, i, o, or u. For your own reference: an elephant, a pig, an owl, a fox.' },
        'articles-food-bw-2-k306-2': { first: 'Name the pictures together: donut, taco, egg, iron (the iron for clothes). Do the first one together: "a donut, an donut. Which sounds right?" Circle a. Tell the children that an goes in front of words that start with a, e, i, o, or u. For your own reference: a donut, a taco, an egg, an iron.' },
        'articles-household-bw-k306-4': { first: 'Name the pictures together: cup, bed, umbrella, bottle. Do the first one together: "a cup, an cup. Which sounds right?" Circle a. Tell the children that an goes in front of words that start with a, e, i, o, or u. For your own reference: a cup, a bed, an umbrella, a bottle.' },
      },
    },
    'K:capital-letter': {
      say: '"Each box has the same sentence two times. One starts with a capital letter, and one does not. Circle the sentence that starts the right way. Then write that capital letter in the box."',
      first: 'Read the two sentences of the first box aloud while you point to them. Ask, "Which one starts with a big letter, a capital?" Circle it together and copy the capital letter into the box. Remind the children that every sentence starts with a capital letter.',
      stuck: 'Cover all but the first letter of each sentence with your finger and ask, "Which one is the big letter?" A child who is not sure may look for the same letter on the classroom alphabet.',
    },
    'K:conservation': {
      say: '"In each box there are two groups. Count each group and write how many. Then circle the check mark if the two groups have the same number, or the X if they do not."',
      first: 'Do the first box together: count the top group aloud, touching each picture, and write the number. Count the bottom group the same way. Ask, "Are the numbers the same?" Circle the check mark or the X. Tell the children that a group that is spread out can still have the same number as a group that is close together.',
      stuck: 'Have the child put a small dot on each picture while counting it, so that none is counted twice. Then compare the two numbers on the page: "Are they the same number?"',
    },
    'K:count-on': {
      say: '"The number on each box tells how many are hidden inside. Start at that number and count on, one more for each picture next to the box. Write how many there are in all."',
      first: 'Do the first one together: put your hand on the box and say its number. Then touch each picture and count on aloud: "Six… seven." Write the number in the empty box. Tell the children not to count the box from one: they start at its number.',
      stuck: 'Have the child say the number on the box and then tap each picture while saying the next number. If the child starts again at one, say the box number together and go on from there.',
    },
    'K:day-night': sortScript('two boxes, Day and Night', 'ask, "Do we see this in the day or at night?"', 'Some things can be seen in the day and at night, like the moon; let the child choose and say why.'),
    'K:digraphs-k': {
      say: '"Two letters can make one sound. S and h say sh, like in shoe. C and h say ch, like in cheese. Say the name of each picture. Do you hear sh or ch? Draw a line to that side."',
      first: 'Say sh and ch together a few times. Name the pictures together, so that everyone uses the same words. Do the first one together: say the word slowly and ask, "Do you hear sh or ch?" Draw the line to that side of the page.',
      stuck: 'Say the word and stretch its first sound: "sh-sh-shoe." Then say "sh" and "ch" and ask which one it sounds like.',
      byPage: {
        'digraphs-k378': { first: 'Say sh and ch together a few times. Name the pictures together: chocolate, shorts, wheelchair, cheese, shoe, shrimp. Do the first one together: say "chocolate" slowly and ask, "Do you hear sh or ch?" Draw the line to ch. For your own reference: ch: chocolate, wheelchair (the ch is in "chair"), cheese; sh: shorts, shoe, shrimp.' },
      },
    },
    'K:draw-shapes': {
      say: '"Each box names a shape. Connect the dots with your pencil to draw that shape. If there is a thick line in the box, start there."',
      first: 'Read the name in each box aloud and draw that shape on the board: a triangle has 3 sides, a square has 4 sides that are all the same length, a rectangle has 4 sides with two long and two short. Draw the first shape together on the dot paper, going from dot to dot with straight lines.',
      stuck: 'Have the child count the sides of the shape on the board and put a finger on the dots where the corners will go. Then draw one side at a time from corner to corner.',
    },
    'K:fruit-vegetable': (() => {
      const NOTE = 'If a food can be called both, either box is right when the child can say why.';
      const s = sortScript('two boxes, Fruits and Vegetables', 'ask, "Is this a fruit or a vegetable?"', NOTE);
      // (the tomato notes of science-sort-k202 and -k202-3 are gone: tomato, cucumber and corn were retired from these
      // pages on 2026-11-23 and the pages republished, so no K-202 page shows a tomato)
      return s;
    })(),
    'K:healthy-food': sortScript('two boxes, Healthy and Not Healthy', 'ask, "Is this good for our body every day, or is it a treat for once in a while?"', 'A treat is fine once in a while; the page only asks which foods to eat every day.'),
    'K:human-body': {
      say: '"Look at the picture. Each line points to a part of the body. The words are in the box at the top. Copy the right word onto each line."',
      first: 'Read the words in the box aloud and have the children touch that part of their own body for each one. Do the first line together: follow it with your finger to the part it points to, say its name, find the word in the box, and copy it onto the line letter by letter.',
      stuck: 'Have the child touch the part on their own body and say its name. Then find the word in the box together; the first letter helps: "Eye starts with e. Where is the word that starts with e?" Eye and ear both start with e: eye ends with e, ear ends with r.',
      byType: {
        'K-344': { say: '"This page is about your face. Each line points to a part of the face. Copy the right word from the box onto each line. Then draw your own face in the big box."' },
      },
      // a page whose word box is arm, hand, neck, shoulder (no eye or ear): its own first-letter example
      byPage: {
        'human-body-k354-2': { stuck: 'Have the child touch the part on their own body and say its name. Then find the word in the box together; the first letter helps: "Hand starts with h. Where is the word that starts with h?"' },
      },
    },
    'K:living-nonliving': sortScript('two boxes, Living and Non-living', 'ask, "Does it grow and need water and air? Then it is living." Plants are living too, even though they do not walk or run.'),
    'K:naming-and-action-words': {
      say: '"Each row has three words. One of them is something you can DO, like hop or run. That is the action word. Circle it."',
      first: 'Read the three words of the first row aloud and have the class read them with you: hop, egg, hat. Ask, "Which one can you do?" Have everyone hop once. Circle hop. Read each row aloud with the class before they choose.',
      stuck: 'Read the three words for the child and ask about each one: "Can you ___?" The word that makes sense is the action word.',
    },
    'K:natural-made': sortScript('two boxes, Natural and Man-made', 'ask, "Did people make this, or is it found in nature?"'),
    'K:one-more-one-less': {
      say: '"In each row, count the pictures. Then read the label. For one more, draw one more picture in the empty box. Write how many there are now."',
      first: 'Read the first label aloud: "1 more." Count the pictures together, then draw one more in the empty box (a circle is fine). Count again and write the new number after the arrow. Tell the children that one more is always the next number when we count.',
      stuck: 'Have the child count the pictures and then say the next number: "Four… then five." That is how many there are with one more.',
    },
    'K:period-or-question-mark': {
      say: '"Some sentences tell us something. Some sentences ask us something. A telling sentence ends with a period. An asking sentence ends with a question mark. Write the right mark in each box."',
      first: 'Draw a period and a question mark on the board. Read the first sentence aloud: "The car is green." Ask, "Does it tell or ask?" It tells, so write a period. Read every sentence aloud to the class and let them decide before they write.',
      stuck: 'Read the sentence again and ask, "Could you answer it with yes or no?" If you can, it asks, and it gets a question mark.',
    },
    'K:place-words': {
      say: '"Look at each picture. Where is the small picture? Circle the word that fits in the sentence."',
      first: 'Read the first sentence aloud with a hum for the gap: "The apple is hmm the circle." Read the three words below it. Ask, "Where is the apple?" Read the sentence with each word and circle the one that is true.',
      stuck: 'Have the child show the place word with a pencil and a book: "Put the pencil under the book. Now next to it." Then look at the picture again.',
    },
    'K:scene-search': {
      say: '"Look at the picture in the box at the top. Find every picture on the page that is just like it, and circle them all."',
      first: 'Point to the picture in the box and name it together. Find one like it on the page together and circle it. Tell the children to look across the page row by row, like reading, so they do not miss any.',
      stuck: 'Have the child cover the page with a sheet of paper and slide it down slowly, looking at one row at a time.',
      byType: {
        'K-371': {
          say: '"Each picture is something we see every day. Is its shape a circle or a rectangle? Color the shape it has."',
          first: 'Draw a circle and a rectangle on the board and name them. Name the first picture together and ask, "Is it round like a circle, or does it have four sides like a rectangle?" Color that shape in the box next to the picture.',
          stuck: 'Have the child trace the outside of the picture with a finger: round all the way around is a circle; four straight sides are a rectangle.',
        },
      },
    },
    'K:shadow-closure': {
      say: '"Each picture on the left has a shadow on the right. A shadow is dark and shows only the shape. Draw a line from each picture to its shadow."',
      first: 'Do the first one together: look at the outline of the first picture and ask, "Which shadow has the same shape?" Draw the line from dot to dot. Tell the children to look at the edges: the ears, the wheels, the tail.',
      stuck: 'Have the child trace the outside of the picture with a finger, then trace the shadows until one has the same shape.',
      byType: {
        'K-069': {
          say: '"In each row only a small part of a picture is showing. Which whole picture does it belong to? Circle it."',
          first: 'Do the first row together: look at the small part and ask, "What could this be? An ear, a tail, a head?" Look at the three whole pictures and circle the one the part belongs to.',
          stuck: 'Have the child find the part on each of the three pictures: "Does this one have it?"',
        },
      },
    },
    'K:singular-plural': {
      say: '"One means just one thing. Many means more than one. The word for one is written for you. Trace the word for many."',
      first: 'Read the first word aloud and show one finger. Then show two fingers and say the word for many. Point to the s at the end: "We add s when there is more than one." Trace the word for many together. Read each word on the page aloud with the class before they trace.',
      stuck: 'Read the word for one and the word for many for the child and have the child point to the part that is different. Then trace one letter at a time.',
      byType: {
        'K-287': { say: '"The word for one is written for you. Read it with me. Then trace the word for many, and write it yourself on the empty line."' },
      },
      byPage: {
        'singular-plural-animals-k302': { stuck: 'Read the word for one and the word for many for the child and have the child point to the part that is different. "Fox" gets -es: foxes. Then trace one letter at a time.' },
        'singular-plural-sea-life-bw-2-k287-2': { stuck: 'Read the word for one and the word for many for the child and have the child point to the part that is different. "Octopus" gets -es: octopuses. Then trace one letter at a time.' },
      },
    },
    'K:subitize': {
      say: '"Look at each group very quickly, without counting one by one. How many do you see? Circle the number."',
      first: 'Hold up three fingers for a second and hide them: "How many?" Do the same with five. Then look at the first group on the page together for a moment and circle the number. Tell the children that it is fine to check by counting after they have guessed.',
      stuck: 'Have the child look for small groups inside the big one: "I see two and two. That makes four." Then count to check.',
    },
    'K:take-away': {
      say: '"Count the dots in each ten-frame. Some dots are crossed out: they are taken away. Write how many are left."',
      first: 'Do the first one together: count all the dots, then count the crossed-out ones. Read the number sentence aloud: "Ten take away one." Count the dots that are not crossed out and write the number after the equals sign.',
      stuck: 'Have the child cover each crossed-out dot with a finger and count only the dots that can still be seen.',
    },
    'K:teen-numbers': {
      say: '"A teen number is ten and some more. One ten-frame holds ten. Count what is in the two ten-frames and write the number. Then finish the number sentence: ten plus how many more."',
      first: 'Do the first one together: point to the full ten-frame and say, "That is ten." Count on with the second frame: "eleven, twelve…" Write the number. Then read the sentence: "Twelve equals ten plus…" and write how many are in the second frame.',
      stuck: 'Have the child start at ten for the full frame and count on, touching each dot in the second frame.',
      byType: {
        'K-637': {
          say: '"Read the number in each row. Draw that many dots in the two ten-frames. Fill the first ten-frame all the way before you start the second one."',
          first: 'Do the first one together: read the number, for example 13. Fill the first ten-frame with ten dots while counting aloud, then count on in the second frame: "eleven, twelve, thirteen." Stop when you reach the number.',
          stuck: 'Have the child fill the first frame and say "ten", then draw one dot at a time in the second frame while counting on.',
        },
      },
    },
    'K:transport-flying': sortScript('labeled boxes', 'ask, "Where does this go? Does it fly?"'),

    // ---- new types and pages of points whose script is in texts/en-k.js ----
    'K:all-about-me-personal': {
      byType: {
        'K-345': {
          say: '"This page is about what YOU can do. Listen to each sentence. If you can do it, put a check in its box. At the bottom, write one thing you want to learn."',
          first: 'Read each sentence aloud while the children point to it: "I can paint a picture. I can brush my teeth…" After each one, pause so that every child can check the box or leave it empty. Tell them there is no wrong answer. For the last line, write "I want to learn to" on the board and let children say their ideas first.',
          stuck: 'Read the sentence again and ask the child, "Can you do that?" For the last line, a child may draw the thing and write the first letter or one word with your help.',
        },
      },
    },
    'K:before-after-back': {
      byType: {
        'K-022': {
          say: '"Each row has two numbers with an empty box between them. Write the number that comes in the middle."',
          first: 'Write the numbers 1 to 20 in a row on the board. Do the first row together: find both numbers on the board and point to the one between them. Write it in the empty box.',
          stuck: 'Have the child count up from the first number: "Fourteen… fifteen." The number they say next is the one in the middle.',
        },
        'K-023': {
          say: '"This is a countdown, like for a rocket: 10, 9, 8 and down to 1. Some numbers are missing. Write each missing number."',
          first: 'Count down from 10 to 1 together, with a quiet "blast off" at the end. Do the first strip together, pointing to each box, and say the number at each empty box.',
          stuck: 'Have the child say the countdown from 10 while touching each box; the number they say at an empty box is the one to write.',
        },
      },
    },
    'K:beginning-sounds': {
      byType: {
        'K-228': {
          say: '"At the bottom are three boxes, each with a letter. Say the name of each picture and listen for its first sound. Draw a line from the picture to the letter it begins with."',
          first: 'Read the three letters on the boxes aloud and say their sounds. Name every picture together, so that everyone uses the same word (they are below). Do the first one together: say the word slowly and ask, "What is the first sound? Which box has that letter?" Draw the line.',
          stuck: 'Say the word and stretch the first sound. Then say the sound of each letter on the boxes and ask which one matches.',
        },
        'K-328': {
          say: '"Say the name of each picture. Does it begin with mmm or nnn? Circle m or n."',
          first: 'Say the sounds mmm and nnn together; feel the lips close for m. Name the pictures together: nest, necklace, moon, nose, medal, milk, nurse, mitten. Do the first one together: "nest. Does it start with mmm or nnn?" Circle n. For your own reference: n: nest, necklace, nose, nurse; m: moon, medal, milk, mitten.',
          stuck: 'Have the child say the word with a hand on the lips: for m the lips close, for n they stay open.',
        },
      },
      byPage: {
        'beginning-sounds-k228': { first: 'Read the letters on the boxes aloud, B, C, and S, and say their sounds. Name the pictures together: star, cow, bus, cat, sun, banana, sock, ball, carrot. Do the first one together: "star. What is the first sound?" Draw a line to S. For your own reference: B: bus, banana, ball; C: cow, cat, carrot; S: star, sun, sock.' },
        'beginning-sounds-k228-2': { first: 'Read the letters on the boxes aloud, B, C, and S, and say their sounds. Name the pictures together: cow, can (a soup can), sink, seal, salt (the salt shaker), bat, cat, bun, bus. Do the first one together: "cow. What is the first sound?" Draw a line to C. For your own reference: B: bat, bun, bus; C: cow, can, cat; S: sink, seal, salt.' },
        'beginning-sounds-k228-3': { first: 'Read the letters on the boxes aloud, B, C, and S, and say their sounds. Name the pictures together: bed, sock, bat, car, cup, sun, cake, bus, spoon. Do the first one together: "bed. What is the first sound?" Draw a line to B. For your own reference: B: bed, bat, bus; C: car, cup, cake; S: sock, sun, spoon.' },
        'beginning-sounds-k228-4': { first: 'Read the letters on the boxes aloud, B, C, and S, and say their sounds. Name the pictures together: seal, bag, sock, bee, cup, cake, car, bus, sink. Do the first one together: "seal. What is the first sound?" Draw a line to S. For your own reference: B: bag, bee, bus; C: cup, cake, car; S: seal, sock, sink.' },
        'beginning-sounds-k228-5': { first: 'Read the letters on the boxes aloud, B, C, and S, and say their sounds. Name the pictures together: cake, cow, sink, bat, bee, bed, cat, sock, salt (the salt shaker). Do the first one together: "cake. What is the first sound?" Draw a line to C. For your own reference: B: bat, bee, bed; C: cake, cow, cat; S: sink, sock, salt.' },
      },
    },
    'K:compare-groups': {
      byType: {
        'K-009': { say: '"In each box there are two groups. Count both groups. Then circle the group that has FEWER."', first: 'Do the first box together: count one group aloud, then the other. Ask, "Which number is less?" Circle that group: it has fewer. Tell the children that fewer means not as many.' },
        'K-606': {
          say: '"Each box has two numbers. Which number is greater, which one means more? Color the greater number."',
          first: 'Write the numbers 1 to 20 on the board. Do the first box together: find both numbers on the board and ask, "Which one comes later when we count?" That one is greater. Color it.',
          stuck: 'Have the child count aloud from one and stop at the first of the two numbers that comes up; the other number is the greater one.',
        },
      },
    },
    'K:compare-size-extremes': {
      byType: {
        'K-035': { say: '"In each row, some things are tall and some are short. Look at all of them. Then circle the TALLEST one."', first: 'Do the first row together. Point to each picture and ask, "Is this the tallest? Is there a taller one?" Circle the tallest together. Remind the children to look at every picture in the row before they circle.' },
        'K-037': { say: '"In each row, some shapes are long and some are short. Look at all of them. Then circle the LONGEST one."', first: 'Do the first row together. Move your finger from one end of each shape to the other and ask, "Is this the longest? Is there a longer one?" Circle the longest together. Remind the children to look at every shape in the row before they circle.' },
      },
    },
    'K:count-forward-missing': {
      byType: {
        'K-632': { first: 'Write the numbers 1 to 100 in rows of ten on the board, or point to the class hundred chart. The strips on this page start at big numbers. Read the first strip aloud together, pointing to each box, and clap at each empty box. Ask, "What number goes here?" Write it in. The children do the other strips the same way.' },
      },
    },
    'K:count-how-many': {
      byType: {
        'K-002': { say: '"Count the pictures in each box. Touch each one as you count. Then circle the number that tells how many."', first: 'Count the first box aloud together, touching each picture on your page as the class counts. Ask, "So how many are there?" Circle that number among the numbers in the box.' },
        'K-027': { say: '"The pictures in each box stand in rows. Count all of them. Then write how many there are in all."', first: 'Count the first box aloud together, one row at a time, touching each picture as the class counts. Ask, "So how many are there in all?" Write the number on the board. Then write the numbers 1 to 20 on the board and leave them there for children who need to copy them.' },
        'K-640': { say: '"Count all the pictures in each box. There are between 11 and 20. Write how many there are in all."', first: 'Count the first box aloud together, touching each picture as the class counts. Ask, "So how many are there?" Write the number on the board. Then write the numbers 1 to 20 on the board and leave them there for children who need to copy them.' },
      },
    },
    'K:count-syllables': {
      byType: {
        'K-234': {
          say: '"Words have beats, called syllables. Say the name of each picture and clap its beats. Draw a line to the box with that number: 1, 2, or 3."',
          first: 'Clap a few children\'s names together. Name the pictures together: acorn, sun, apron, airplane, dog, ambulance, cat, banana, astronaut. Clap the first word together and draw its line. For your own reference: 1 beat: sun, dog, cat; 2 beats: acorn, apron, airplane; 3 beats: ambulance, banana, astronaut.',
        },
      },
      byPage: {
        'phonological-awareness-k233-2': { first: 'Clap a few children\'s names together: "Ma-ri-a, three claps." Name all the pictures together: domino, eraser, oval, ant, tomato, bat, baby, bed. The second picture is an eraser, not lipstick. Clap the first picture\'s word together and write the number on the board. For your own reference: domino 3, eraser 3, oval 2, ant 1, tomato 3, bat 1, baby 2, bed 1.' },
      },
    },
    'K:cvc-build': {
      byPage: {
        'word-building-k224-2': { first: 'Name all the pictures together: fig, bun (the bread), jet, jam, lid, dog, cap, fox. Do the first word on the board: say the word slowly, point to each letter as you say its sound, and stop at the empty space. Ask, "Which sound belongs here? Which letter makes it?" Write it in and read the word together.' },
        'word-building-k224-4': { first: 'Name all the pictures together: dog, bag, bed, leg, jug, bus, bat, fig. Do the first word on the board: say the word slowly, point to each letter as you say its sound, and stop at the empty space. Ask, "Which sound belongs here? Which letter makes it?" Write it in and read the word together.' },
        'word-building-k224-5': { first: 'Name all the pictures together: lid, bed, dog, bus, fan, fox, fig, bun (the bread). Do the first word on the board: say the word slowly, point to each letter as you say its sound, and stop at the empty space. Ask, "Which sound belongs here? Which letter makes it?" Write it in and read the word together.' },
        'word-building-k231-2': { first: 'Name all the pictures together: fig, lid, bee, bus, cup, jam. Do the first word on the board: say the word slowly and ask, "What is the first sound? The next sound? The last sound?" Write a letter for each sound and read the word together. "Bee" has two e\'s that make one sound.' },
        'word-building-k231-3': { first: 'Name all the pictures together: ham, jar, egg, hot (the hot sun), ant, jet. Do the first word on the board: say the word slowly and ask, "What is the first sound? The next sound? The last sound?" Write a letter for each sound and read the word together. "Egg" ends with two g\'s.' },
        'word-building-k231-4': { first: 'Name all the pictures together: can, jet, cup, bun (the bread), lid, cat. Do the first word on the board: say the word slowly and ask, "What is the first sound? The next sound? The last sound?" Write a letter for each sound and read the word together.' },
      },
    },
    'K:days-of-week': {
      byType: {
        'K-337': {
          say: '"The days of the week go down the ladder in order. Some days are already written. Find the missing days in the word box at the top and copy them onto the empty lines."',
          first: 'Say the days of the week together, starting with Sunday. Read the days already on the ladder aloud. Do the first empty line together: "Sunday, then…?" Find Monday in the word box and copy it letter by letter.',
          stuck: 'Say the days in order with the child, pointing down the ladder, and stop at the empty line. Help the child find the word in the box by its first letter.',
        },
      },
    },
    'K:dot-to-dot-sequence': {
      byType: {
        'K-285': { say: '"This is a dot-to-dot. Start at the orange dot, at number 1. Draw a line to 2, then to 3, and keep counting until you get to 20."', first: 'Count from 1 to 20 aloud together. Find the orange dot together and put a finger on it. Ask, "What comes after 1?" Find 2 and draw the first line together. The numbers 1 to 20 are printed at the bottom of the page to help.' },
        'K-295': { say: '"This is a dot-to-dot. Start at the orange dot, at number 11. Draw a line to 12, then to 13, and keep counting until you get to 20."', first: 'Count from 11 to 20 aloud together. Find the orange dot, number 11, together and put a finger on it. Ask, "What comes after 11?" Find 12 and draw the first line together.' },
        'K-296': { say: '"This is a dot-to-dot. Start at the orange dot, at number 11. Count on and draw a line to each next number, all the way to 30."', first: 'Count from 11 to 30 aloud together. Find the orange dot, number 11, together and put a finger on it. Find 12 and draw the first line together. The numbers 11 to 30 are printed at the bottom of the page to help.' },
      },
    },
    'K:family': {
      byType: {
        'K-370': {
          say: '"This page shows a family tree. Each person has a number. Under the tree are family words. Write each person\'s number in the box next to their family word."',
          first: 'Look at the family tree together. The child with the star is the one the words are about: each word says who a person is to that child. Read the family words aloud. Do the first one together: ask, for example, "Which person is the mom?" Find her number on the tree and write it in the box next to the word.',
          stuck: 'Read the word for the child and ask who that person is to the child with the star. If a child says their own family does not look like this one, say, "Every family is different. This page is about this child\'s family."',
        },
      },
      // (2026-11-24: family-k375-6 is handed out no more since the family words became a social studies lesson of weeks 6-11)
      byPage: pages(['family-k375-2', 'family-k375-3', 'family-k375-4', 'family-k375-5'], {
        first: 'Look at the family tree together. The child with the star is the one the words are about. Read the family words on the page aloud. Do number 1 together: find the person with the 1 on the tree, find the word with the 1, trace it, and write it again on line 1.',
        stuck: 'Have the child put a finger on the number next to the word and find the same number on the tree. Read the word for the child. If a child says their own family does not look like this one, say, "Every family is different. This page is about this child\'s family."',
      }),
    },
    'K:feelings': {
      byType: {
        'K-331@w': { first: 'Look at the first picture together and ask what it shows. Ask, "How does that make you feel?" Let two or three children answer; they may not all feel the same, and that is fine. Each child circles the face that matches their own answer.' },
        'K-333': {
          say: '"Each face shows a feeling. Some feelings feel good, and some feel bad. Draw a line from each face to the box Feels good or Feels bad."',
          first: 'Make each face on the page with your own face and let the class name the feeling: happy, sad, scared, and so on. Do the first one together: "Does that feeling feel good or bad?" Draw the line to its box.',
          stuck: 'Make the face yourself and ask the child to make it too. Ask, "When do you feel like this? Is it a nice feeling?"',
        },
        'K-334': {
          say: '"Each row has a feeling word and three faces. Circle the face that shows that feeling."',
          first: 'Read every feeling word on the page aloud: tired, angry, happy, scared, surprised, sad. Make each face for the class. Do the first row together: read the word, look at the three faces, and circle the one that matches.',
          stuck: 'Read the word for the child and make the face. Ask the child to point to the face on the page that looks like yours.',
        },
      },
    },
    'K:mazes': {
      byType: {
        'K-405': { say: '"Time for a maze. Find the way along the light path from the animal to its goal. Use your finger first, then your pencil."', first: 'Hold up the page and show where the path starts, at the animal with the arrow, and where it ends. Trace the beginning of the way with your finger and stop at the first place where the path splits: "Which way? Let\'s try one." Tell the children to find the whole way with a finger before they draw.' },
        'K-406': { say: '"Time for a maze. Help the animal get to its goal. Draw a line along the wide road and stay between its edges."', first: 'Hold up the page, read its title aloud, and show where the road starts, at the animal with the arrow, and where it ends. Trace the road with your finger and stop at each place where it splits: "Which way leads to the goal?" Tell the children to find the whole way with a finger before they draw.' },
        'K-407': { say: '"Time for a maze. Draw a line along the blue water from the start to the goal, and stay inside the water."', first: 'Hold up the page, read its title aloud, and show where the water starts, at the arrow, and where it ends. Trace the water with your finger and stop at each place where it splits: "Which way leads to the goal?" Tell the children to find the whole way with a finger before they draw.' },
      },
    },
    'K:numeral-formation': {
      byType: {
        'K-237': { say: '"Now we practice writing numbers. Start at the orange dot and follow the arrows. Trace each number in the row."' },
        'K-467': {
          say: '"Count the pictures in each row. The number that tells how many is at the end of the row. Trace it."',
          first: 'Count the pictures of the first row aloud together, touching each one. Say the number and point to it at the end of the row. Write it big on the board and show where it starts. Then the children trace it.',
          stuck: 'Have the child touch each picture while counting. For the tracing, put your finger on the orange dot: "Start here."',
        },
      },
    },
    'K:order-by-size': {
      byType: {
        'K-034': { say: '"Each row has five pictures of the same thing in different sizes. Write 1 under the smallest, then 2, 3, 4, and 5 under the biggest."', first: 'Write 1, 2, 3, 4, 5 on the board. Do the first row together. Ask, "Which one is the smallest?" It gets the 1. "Which one is next?" It gets the 2. Go on until the biggest gets the 5.', stuck: 'Have the child find the smallest one left each time and cross it off lightly after writing its number.' },
        'K-036': { say: '"Each row has four pictures of the same thing. Write 1 under the shortest, then 2 and 3, and 4 under the tallest."', first: 'Write 1, 2, 3, 4 on the board. Do the first row together. Ask, "Which one is the shortest?" It gets the 1. "Which one is next?" It gets the 2. Go on until the tallest gets the 4.', stuck: 'Have the child find the shortest one left each time and cross it off lightly after writing its number.' },
      },
    },
    'K:patterns': {
      byType: {
        'K-048': { first: 'Do the first row together. Point to each picture and have the class say its name like a chant. On this page each picture comes two times, and then the next picture comes two times. Stop at the box with the question mark and ask, "What comes next?" Circle it among the choices.' },
        'K-049': { say: '"Each row is a pattern, but one picture is missing. Find the empty box. Circle the picture that belongs in it."', first: 'Do the first row together. Point to each shape and have the class say its name like a chant. Stop at the empty box and ask, "What goes here?" Say the pattern again with that shape and circle it among the choices at the end of the row.' },
        'K-050': { first: 'Do the first row together. Point to each picture and say "big" or "small" like a chant: "big, small, big, small…" Stop at the box with the question mark and ask, "What comes next: a big one or a small one?" Circle it among the choices.' },
        'K-053': { say: '"These patterns grow: each box has one more than the box before. Count the boxes. Circle the group that comes next."', first: 'Do the first row together: count the pictures in each box aloud, "one, two, three." Ask, "So how many come next?" Count the groups at the end of the row and circle the one with four.' },
      },
    },
    'K:position-words': {
      byType: {
        'K-065': { say: '"There is a line down the middle of the page. Circle every picture on the LEFT side of the line."', first: 'Have the children hold up their left hand: the thumb and pointer finger make an L. Point to the left side of the page. Find one picture on the left together and circle it.', stuck: 'Have the child hold up the L hand and lay it next to the page on the left side. Everything on that side of the line gets a circle.' },
        'K-066': { say: '"The page has three rows: the top, the middle, and the bottom. Circle every picture in the MIDDLE row."', first: 'Point to the top row, the middle row, and the bottom row and have the class say each word. Find one picture in the middle row together and circle it.', stuck: 'Have the child put one finger on the top row and one on the bottom row: the middle is between the fingers.' },
        'K-067': { say: '"There is a big shape on the page. Circle every picture that is INSIDE the big shape."', first: 'Trace the edge of the big shape with your finger. Ask, "Which pictures are inside the line? Which are outside?" Find one inside together and circle it.', stuck: 'Have the child trace the edge of the shape with a finger: a picture inside the line gets a circle.' },
      },
      byPage: {
        'position-words-shapes-k064': {
          say: '"Each card names a place: ON the box, UNDER the box, or BESIDE the box. Circle the shape that is in that place."',
          first: 'Put a book on a chair, then under it, then beside it, and have the class say the word each time. Read the words under each card aloud: ON the box, UNDER the box, BESIDE the box, UNDER the box. Do the first card together: "Which shape is ON the box?" Circle it.',
        },
      },
    },
    'K:pre-writing-strokes': {
      byType: {
        'K-419': { say: '"Start at the dot on the whale. Trace the big whale slowly, all the way around, without lifting your pencil."', first: 'Hold up the page and trace the whale in the air with your finger, slowly, from the dot all the way around. Have the children trace it on the page with a finger first, then with a pencil. Remind them to go slowly: this is not a race.' },
        'K-420': { say: '"Look at the animal in the frame. The same animal next to it is drawn with dashes. Trace it."', first: 'Hold up the page and point to the picture in the frame and to the dashed picture next to it. Trace a few dashes with your finger. Have the children trace with a finger first, then with a pencil, one part of the animal at a time.' },
        'K-421': { say: '"Start at each dot and trace round and round, like the letter o."', first: 'Draw a big circle on the board, starting at the top and going to the left, like the letter o. Have the children draw circles in the air. Then they trace each round picture on the page from its dot.' },
        'K-422': { say: '"Each column has an arrow at the top. Trace the lines in that column the way the arrow points: down, then across, then slanted."', first: 'Point to the three arrows and show each way with your hand: down, across, slanted. Trace the first line of the first column in the air with the class, from the top down. Tell the children to do one column at a time.' },
        'K-424': { say: '"Trace the spirals and loops: the snail, the lollipop, the bow, the pretzel, and the pinwheel."', first: 'Draw a spiral on the board, starting in the middle and going round and round outward. Have the children draw spirals in the air. Then they trace each picture on the page, one at a time, slowly.' },
      },
    },
    'K:rhyme': {
      byType: {
        'K-352': {
          say: '"In each box there are two pictures. Say both names out loud. If the two words rhyme, circle the check mark. If they do not rhyme, circle the X."',
          first: 'Say "cat, hat" and "cat, dog" and ask which pair rhymes. Name all the pictures on the page together, so that everyone uses the same words (they are below). Do the first box together: say the two words and ask, "Do they sound the same at the end?" Circle the check mark or the X.',
          stuck: 'Say the two words one after the other and stretch their endings. If the endings sound the same, they rhyme.',
        },
      },
      byPage: {
        'phonological-awareness-k232-3': { first: 'Name all the pictures together, so that everyone uses the same words: on the left bed, bag, cat, dog, boat; on the right frog, goat, sled, hat, flag. Say the first picture on the left with each picture on the right: "bed, frog… bed, sled." Ask which pair sounds the same at the end. Draw that line together. For your own reference, the pairs are bed and sled, bag and flag, cat and hat, dog and frog, boat and goat.' },
        'phonological-awareness-k232-5': { first: 'Name all the pictures together, so that everyone uses the same words: on the left sun, cat, boat, star, bed; on the right car, goat, bun (the bread), sled, hat. Say the first picture on the left with each picture on the right: "sun, car… sun, bun." Ask which pair sounds the same at the end. Draw that line together. For your own reference, the pairs are sun and bun, cat and hat, boat and goat, star and car, bed and sled.' },
        'rhyming-words-k352': { first: 'Say "cat, hat" and "cat, dog" and ask which pair rhymes. Name the pictures together, two by two: cake and hand, boat and shirt, lock and sock, bag and duck, car and guitar, rug and brain, log and frog, hat and cat (the last animal is a cat). Do the first box together and circle the check mark or the X. For your own reference, these rhyme: lock and sock, car and guitar, log and frog, hat and cat; the other four do not.' },
        'rhyming-words-k352-2-at': { first: 'Say "cat, hat" and "cat, dog" and ask which pair rhymes. Name the pictures together, two by two: hand and sand, balloon and raccoon, sheep and jeep, pan and chair, car and crane, hat and bat, letter (the envelope) and bread, shirt and map. Do the first box together and circle the check mark or the X. For your own reference, these rhyme: hand and sand, balloon and raccoon, sheep and jeep, hat and bat; the other four do not.' },
        'rhyming-words-k352-3-at': { first: 'Say "cat, hat" and "cat, dog" and ask which pair rhymes. Name the pictures together, two by two: bat and cat, moose and deer, cap and map, snail and nail, train and balloon, nest and swing, bed and rake, pear and chair. Do the first box together and circle the check mark or the X. For your own reference, these rhyme: bat and cat, cap and map, snail and nail, pear and chair; the other four do not.' },
        'rhyming-words-k352-4-at': { first: 'Say "cat, hat" and "cat, dog" and ask which pair rhymes. Name the pictures together, two by two: nest and vest, can and coat, lock and elf, glass and truck, jeep and sheep, bat and hat, map and cap, log and sled. Do the first box together and circle the check mark or the X. For your own reference, these rhyme: nest and vest, jeep and sheep, bat and hat, map and cap; the other four do not.' },
      },
    },
    'K:same-different-visual': {
      byType: {
        'K-044': { say: '"In each row, the pictures are the same, but one is a different size. Find it and circle it."', first: 'Do the first row together. Point to the pictures one by one: "Same size… same size… this one is smaller!" Circle it together.', stuck: 'Have the child point to two pictures at a time and ask, "Are they the same size?"' },
        'K-058': { say: '"Every picture on this page has a twin, a picture that looks just the same. Draw a line to join the two pictures of each pair."', first: 'Point to the first picture and ask, "Where is its twin?" Find it together and draw the line. Tell the children to cross off nothing: each picture is in one pair only.', stuck: 'Have the child name one picture and look for the same name somewhere else on the page.' },
        'K-062': { say: '"On this page two pictures are exactly the same. Find the two twins and circle both."', first: 'Name the pictures together. Ask, "Do you see two that are the same?" Let the children look for a while; then show how to check: put a finger on each one and compare the colors and the parts.', stuck: 'Have the child name each picture; two pictures with the same name may be the twins.' },
        'K-080': { say: '"In each row the shapes are the same, but one shape does not belong. Find it and circle it."', first: 'Do the first row together. Point to the shapes one by one: "same… same… this one is different!" Ask a child to say what is different about it. Circle it.', stuck: 'Have the child name each shape in the row; the one with a different name gets the circle.' },
      },
    },
    'K:seasons': {
      byType: {
        'K-207': {
          say: '"At the top are clothes. At the bottom are two boxes: Summer and Winter. Draw a line from each piece of clothing to the season we wear it in."',
          first: 'Read the two boxes aloud and name every piece of clothing together. Do the first one together: ask, "Do we wear this when it is hot or when it is cold?" Draw the line to its box.',
          stuck: 'Ask the child, "Would you wear this to the beach or in the snow?" Where you live, winter may not mean snow; let the child explain.',
        },
        'K-338': {
          say: '"Each card has three pictures that belong to one season. Under them are four signs: a snowflake for winter, a flower for spring, a sun for summer, and a leaf for fall. Circle the sign of the season."',
          first: 'Point to the four signs and name the seasons together. Do the first card together: name the three pictures and ask, "When do we see these?" Circle the sign.',
          stuck: 'Ask the child about one picture at a time: "Is it hot or cold then? Are there flowers or falling leaves?"',
        },
      },
    },
    'K:shape-naming': {
      byType: {
        'K-368': {
          say: '"Look at each shape. It may be turned or skinny, but it is still the same shape. Circle its name."',
          first: 'Draw a circle, a triangle, a square, and a rectangle on the board and name them. Do the first shape together: count its sides and read the three names next to it. Circle the right one.',
          stuck: 'Have the child count the sides with a finger: 3 sides is a triangle; 4 sides of the same length is a square; 4 sides, two long and two short, is a rectangle; round with no sides is a circle.',
        },
      },
    },
    'K:sound-position': {
      byType: {
        'K-227': {
          say: '"Say the name of each picture and listen for the sound in the MIDDLE. Write the vowel you hear: a, e, i, o, or u."',
          first: 'Write a, e, i, o, u on the board. Name the pictures together: bed, dog, fox, hen, cat, bus, fig, mug. Do the first one together: say "b-e-d" slowly and stretch the middle: "beeed." Ask, "Which vowel?" Write e. For your own reference: bed e, dog o, fox o, hen e, cat a, bus u, fig i, mug u.',
          stuck: 'Say the word slowly and hold the middle sound. Then say each vowel sound on the board and ask which one matches.',
        },
      },
    },
    'K:spot-the-difference': {
      byType: {
        'K-399': { say: '"The two pictures are the same, but three things are missing from the bottom picture. Find each empty place, circle it, and check a box for each one."', first: 'Hold up the page and compare the two pictures with the class, from the top down. Find one thing that is missing together and circle the empty place in the bottom picture. Check the first box.', stuck: 'Have the child pick one thing in the top picture and look for it in the bottom picture: "Is it there?" There are three missing things; the three boxes help them count.' },
        'K-400': { say: '"Each row shows the same picture two times, but one place in the right picture is different. Circle it, and check the box of that row."', first: 'Do the first row together: compare the left and the right picture, part by part, and find the one difference. Circle it in the right picture and check the box of the row.', stuck: 'Have the child cover half of each picture with a hand and compare one half at a time.' },
      },
    },
    'K:tally-marks': {
      byType: {
        'K-015': { say: '"Each box has tally marks. Count them and write the number."', first: 'Draw tally marks on the board while the class counts to five: four marks standing up and the fifth one across them. Do the first box together: count the marks and write the number. A bundle of five with a line across counts as five.', stuck: 'Have the child touch each mark and count. For a bundle with a line across, say "five" and count on from there: six, seven…' },
        'K-025': { say: '"On the left are numbers. On the right are tally marks. Draw a line from each number to its tally marks."', first: 'Draw a bundle of five tally marks on the board. Count the first group of marks together and find its number on the left. Draw the line.', stuck: 'Have the child touch each mark and count. For a bundle with a line across, say "five" and count on from there: six, seven…' },
      },
    },
    'K:word-picture-match': {
      byPage: {
        'picture-vocabulary-k225-2': { first: 'Read the words on the page aloud and have the class read each one after you. Name the pictures together: bus, can (a soup can), key, fig, fox, bun (the bread). Do the first word together and draw the line.' },
        'picture-vocabulary-k225-3': { first: 'Read the words on the page aloud and have the class read each one after you. Name the pictures together: bag, dog, fan, bun (the bread), egg, key. Do the first word together and draw the line.' },
        'picture-vocabulary-k225-4': { first: 'Read the words on the page aloud and have the class read each one after you. Name the pictures together: cap, fan, bee, hen, hot (the hot sun), jam. Do the first word together and draw the line.' },
      },
    },
    'K:word-sentence-tracing': {
      byType: {
        'K-284': { say: '"Say the name of each picture. Its word is written next to it. Trace the dashed letters, then write the word yourself on the empty lines."', first: 'Name the pictures together and read each word aloud. Do the first word together: read it, trace over it with your finger, and write it once more on the board, saying each letter.' },
        'K-289': { say: '"Each picture has its word next to it. Read the word, trace the dashed word, then write it on the empty line."', first: 'Name the pictures together and read each word aloud. Do the first word together: read it, trace it with your finger, and write it on the board once more, saying each letter.' },
        'K-291': { say: '"These words are long. Read each word with me, trace it, and then write it yourself on the empty line."', first: 'Name the pictures together and read each long word aloud, clapping its parts: "skate-board." Do the first word together: trace it with your finger and write it on the board, one part at a time.' },
      },
    },
  },
};
