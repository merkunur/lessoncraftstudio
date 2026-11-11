'use strict';
/**
 * Guest teacher scripts, English (US), Kindergarten teaching points (Daily Teaching System, Part 5.1). One script per
 * teaching point: what to SAY, how to START together, what to do when a child is STUCK; `byType` holds the sentences
 * that are true of one worksheet type only. Written from the title and directions each worksheet prints
 * (scripts/sub-plans/candidates.js), for an adult who has never seen the class. Kindergartners cannot read the
 * directions: the guest teacher reads them aloud.
 * Merged into frontend/content/sub-plans/scripts/en.json by scripts/sub-plans/apply-texts.js.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:pre-writing-strokes': {
      say: '"Today your pencil goes for a walk. Each line starts at an orange dot. Follow the arrow and stay on the line as well as you can."',
      first: 'Hold up the page and trace the first line with your finger, from the orange dot in the direction of the arrow. Have the children trace it in the air with a finger, then on the page with a finger, and only then with a pencil. Remind them to go slowly: this is not a race.',
      stuck: 'Check the grip: the pencil is pinched between the thumb and the pointer finger and rests on the middle finger. If a child starts at the wrong end, put your finger on the orange dot and say, "Start here." A wobbly line is fine; do not have the child erase.',
    },
    'K:letter-identification': {
      say: '"Look at the letter in the box. Your job is to find every letter in the row that is the same, and circle it."',
      first: 'Do the first row together. Point to the letter in the box and say its name. Move your finger along the row and stop at each letter: "Is this one the same? Look closely." Circle the ones that match. Tell the children that some letters look almost alike, so they have to look closely.',
      stuck: 'Cover the row with a sheet of paper and uncover one letter at a time. Have the child hold a finger under the letter in the box and compare. If the child circles a letter that only looks similar, put the two side by side and ask what is different.',
    },
    'K:letter-case': {
      say: '"Every letter has two shapes, a capital letter and a small letter. Draw a line from each capital letter to the small letter that goes with it."',
      first: 'Do the first one together. Point to the first capital letter and ask for its name. Then point to the small letters one at a time and ask, "Does this one go with it?" Draw the line together. Tell the children to do the ones they are sure of first.',
      stuck: 'Point to the alphabet on the classroom wall, where each capital letter stands next to its small letter, and have the child find the letter there. If the room has no alphabet, tell the child the answer for that pair and move on; this is review, not a test.',
    },
    'K:letter-formation': {
      say: '"Now we practice writing letters. Start at the orange dot and follow the arrows. Trace the letters first. Then write one all by yourself on the empty line."',
      first: 'Write the first letter of the page big on the board, saying where you start and which way you go. Have the children write it in the air with you. Then they trace the letters on the page. Walk around and watch where each child starts.',
      stuck: 'Put your finger on the orange dot: "Start here. Which way does the arrow point?" If the letter the child writes alone is far from the model, have the child trace one more and try again. Do not ask for a perfect letter.',
      byType: {
        'K-257': {
          say: '"Now we practice writing five special letters: a, e, i, o, and u. They are called vowels. Start at the orange dot and follow the arrows. Trace the letters first. Then write one all by yourself on the empty line."',
        },
        'K-278': {
          say: '"Now we practice writing small letters. Start at the orange dot and follow the arrows. Trace the letters first. Then write one all by yourself on the empty line."',
        },
      },
    },
    'K:compare-size-extremes': {
      say: '"In each row, some things are big and some are small. Look at all of them. Then circle the BIGGEST one."',
      first: 'Do the first row together. Point to each picture and ask, "Is this the biggest? Is there a bigger one?" Circle the biggest one together. Remind the children to look at every picture in the row before they circle.',
      stuck: 'Have the child point to two pictures at a time and say which of the two is bigger, keeping a finger on the winner, until the row is done. The picture under the finger at the end gets the circle.',
    },
    'K:patterns': {
      say: '"A pattern is something that repeats, over and over. Say the pattern out loud. Then circle what comes next."',
      first: 'Do the first row together. Point to each picture and have the class say its name like a chant: "bird, koala, bird, koala…" Stop at the box with the question mark and ask, "What comes next?" Circle it in the little row of choices underneath.',
      stuck: 'Have the child touch each picture and say its name aloud from the start of the row, then say the next word before looking at the choices. If the child cannot name a picture, give it a simple name.',
      byType: {
        'K-047': {
          first: 'Do the first row together. Point to each picture and have the class say its name like a chant. Most patterns on this page have three parts that repeat, such as "papaya, apple, pear, papaya, apple, pear." Stop at the box with the question mark and ask, "What comes next?" Circle it in the little row of choices underneath.',
        },
      },
    },
    'K:same-different-visual': {
      say: '"In each row, the animals are the same, but one is a different animal. Find the one that is different and circle it."',
      first: 'Do the first row together. Point to the pictures one by one: "Same… same… same… different!" Ask a child to say what is different about it. Circle it together.',
      stuck: 'Have the child point to the first picture and name the animal, then point to each of the others and ask, "Is this the same animal?" The one that gets a "no" is the one to circle.',
    },
    'K:feelings': {
      say: '"Look at each picture. Think about how it would make you feel. Then circle the face that shows that feeling."',
      first: 'Look at the first picture together and ask what it shows (a bed, a present, a thunderstorm, and so on). Ask, "How does that make you feel?" Let two or three children answer; they may not all feel the same, and that is fine. Each child circles the face that matches their own answer.',
      stuck: 'Ask the child what the picture shows and when they have seen one. Then point to each face and name the feeling it shows. There is no wrong answer on this page; any face the child can explain is right.',
      byType: {
        'K-332': {
          say: '"Each circle on this page needs a face. I will read the feeling word, and you draw a face that shows that feeling."',
          first: 'Read the first feeling word aloud. Make the face yourself and have the children make it too. Ask, "What does the mouth do? What do the eyebrows do?" Then they draw the face in the empty circle. Read each of the other words aloud before the children draw.',
          stuck: 'Read the word again and have the child make the face. Ask about the mouth first: does it go up, go down, or open? The drawing does not have to be good; two eyes and a mouth are enough.',
        },
        'K-335': {
          say: '"This page is about you. Circle the face that shows how you feel right now. Then draw your own face."',
          first: 'Point to each face and read the feeling word under it. Tell the children that every feeling is okay and that they do not have to show their page to other children. Each child circles one face and then draws their own face in the big circle. Children who can write may finish the sentence that starts with "because" on the lines; the others may leave the lines empty.',
          stuck: 'A child who cannot choose may circle two faces. If a child circles a sad or an angry face, do not ask why in front of the class. Later, when the two of you are alone, you may ask quietly, "Do you want to tell me about it?" and accept a no. Write the child\'s name on the "How the day went" form so that the teacher knows. If a child tells you something that makes you worry about their safety, tell the office before you leave.',
        },
      },
    },
    'K:all-about-me-personal': {
      say: '"This page is all about you. Write your name and how old you are. Draw yourself and your family. Then draw your favorite animal, your favorite food, and your favorite color."',
      first: 'Show the page and read the words in each box aloud as you point to it: "My name is," "I am ___ years old," "This is me," "My family," and the three favorites. Write a name and an age on the board as an example. Children who cannot write their name yet may copy it from their name tag or desk label.',
      stuck: 'For the name, point to the child\'s name tag and have the child copy it one letter at a time. For the drawings, ask a question: "Who lives in your house? What do you like to play with?" Any drawing is fine.',
      byType: {
        'K-342': {
          say: '"In each row there are pictures of different things. Circle the one you like best. Then copy its word on the line."',
          first: 'Do the first row together: name the pictures, ask a few children which one they like best, and show how to circle one. Then show how to copy its word onto the line, letter by letter. Everyone circles their own favorite; there is no right answer.',
          stuck: 'Have the child put a finger under the word and copy one letter at a time, moving the finger along. If the child cannot choose, say, "Pick the one you would like to have today."',
        },
        'K-323': {
          first: 'Show the page and read the words in each box aloud as you point to it: "My name is," "I am ___ years old," "This is me," "My family," and the three favorites. Write the numbers 4, 5, and 6 on the board and ask, "Who is 5?" so that the children can copy their age. Do not write a name on the board as an example; some children would copy it. Children who cannot write their name yet may copy it from their name tag or desk label.',
          stuck: 'For the name, point to the child\'s name tag and have the child copy it one letter at a time. For the drawings, ask a question: "Who lives with you? What animal do you like best?" The child decides who is in their family; any drawing is fine.',
        },
      },
    },
    'K:alphabet-order': {
      say: '"This is a dot-to-dot with letters. Start at the letter a and draw a line to b, then to c, and keep going in ABC order until the picture is finished."',
      first: 'Say or sing the alphabet together once, slowly. Find the dot with the letter a together and put a finger on it. Ask, "What comes after a?" Find b and draw the first line together. Tell the children to say the alphabet quietly as they go.',
      stuck: 'Point to the row of letters at the bottom of the page: it shows the order. Have the child find the letter they are on in that row; the next letter in the row is the dot to look for. The letters on this page stop at t.',
    },
    'K:order-by-size': {
      say: '"Each box has three pictures: a small one, a medium one, and a big one. Write 1 on the smallest, 2 on the medium one, and 3 on the biggest."',
      first: 'Write 1, 2, 3 on the board. Do the first box together. Ask, "Which one is the smallest?" It gets the 1. "Which one is the biggest?" It gets the 3. "Which one is left?" It gets the 2.',
      stuck: 'Have the child point to the smallest and the biggest first; the one that is left is the medium one. A child who cannot write the numbers yet may copy them from the board.',
    },
    'K:position-words': {
      say: '"Look at where each animal is: on the box, under the box, or beside the box. In every picture, circle the animal that is ON the box."',
      first: 'Put a book on a chair, then under it, then beside it, and have the class say the word each time. Then do the first picture on the page together: "Which animal is ON the box?" Circle it. Ask about the others, too: "Which one is under the box? Which one is beside it?"',
      stuck: 'Have the child show the word with a hand and the desk: "Put your hand ON the desk. Now UNDER the desk." Then go back to the picture and ask the child to point to the top of the box.',
    },
    'K:mazes': {
      say: '"Time for a maze. Start at the picture at the top and find the way to the bottom. Use your finger first, then your pencil."',
      first: 'Hold up the page and show the start and the goal. Trace the beginning of the way with your finger and stop at the first place where the path splits: "Which way? Let\'s try one." Tell the children to find the whole way with a finger before they draw.',
      stuck: 'Tell the child that a dead end is part of every maze: go back to the last place where the path split and try the other way. Starting from the goal and working backward also helps.',
    },
    'K:spot-the-difference': {
      say: '"These two pictures look the same, but a few things have changed. Find what is different in the picture on the right and circle it."',
      first: 'Find one difference together: ask a child to point to it and say what changed. Circle it in the picture on the right. Tell the children to keep looking until they cannot find any more.',
      stuck: 'Have the child pick one thing in the left picture, find the same thing in the right picture, and ask, "Is it the same?" Then go on to the next thing, from the top of the picture to the bottom.',
    },
    'K:numeral-formation': {
      say: '"Now we practice writing numbers. Trace each number. Then write it yourself in the empty space."',
      first: 'Write the first number of the page big on the board and say where it starts and which way it goes. Have the children write it in the air with you. They trace the number on the page and then write their own.',
      stuck: 'Show the child where the number starts and guide the first stroke with your finger on the page. A number written backward is common at this age; show the right way once and move on.',
    },
    'K:beginning-sounds': {
      say: '"Say the name of each picture and listen for the very first sound. Then write the letter for that sound."',
      first: 'Name all the pictures on the page together, so that everyone uses the same word for each. On the page for everyone they are bus, hat, sun, pig, apple, dog, ball, and fish. Do the first one: say the word slowly and ask, "What is the first sound?" and then, "Which letter makes that sound?" Write the letter on the board; the children write it on the page.',
      stuck: 'Say the word and stretch the first sound: "mmm-oon." Have the child say it back. If the child knows the sound and not the letter, point to the letter on the classroom alphabet or write it for the child to copy.',
    },
    'K:rhyme': {
      say: '"Rhyming words sound the same at the end, like cat and hat. Draw a line from each picture on the left to the picture on the right that rhymes with it."',
      first: 'Name all the pictures together, so that everyone uses the same words. Say the first picture on the left, then say it with each picture on the right: "boat, frog… boat, goat." Ask which pair sounds the same at the end. Draw that line together. For your own reference, the pairs on the page for everyone are boat and goat, bed and sled, dog and frog, cat and hat, bee and tree.',
      stuck: 'Say the two words one after the other and stretch the ending: "c-AT, h-AT." If the endings sound the same, they rhyme. If the child does not know what a picture is called, tell them.',
    },
    'K:count-how-many': {
      say: '"Count the shapes in each box. Touch each one as you count. Then write the number."',
      first: 'Count the first box aloud together, touching each shape on your page as the class counts. Ask, "So how many are there?" Write the number on the board. Then write the numbers 1 to 10 on the board and leave them there for children who need to copy them.',
      stuck: 'Have the child cross out each shape while counting it, so that none is counted twice. If the child does not know how to write the number, point to it on the board.',
    },
    'K:count-forward-missing': {
      say: '"Some numbers on these number strips are missing. Count along the strip and write each number that is missing."',
      first: 'Write the numbers 1 to 10 on the board. Count the first strip aloud together, pointing to each box, and clap at the empty box: "one, two, (clap), four." Ask, "What number goes here?" Write it in. The children do the other strips the same way.',
      stuck: 'Have the child read the first number of the strip and count on aloud from it, touching each box; the number they say at the empty box is the one to write. A child who does not know how to write a number may copy it from the board.',
      byType: {
        'K-020': {
          first: 'Write the numbers 1 to 20 on the board; the strips on this page go up to 20, and they do not all start at 1. Read the first strip aloud together, pointing to each box, and clap at each empty box: "five, (clap), seven, eight." Ask, "What number goes here?" Write it in. The children do the other strips the same way.',
        },
      },
    },
    'K:colour-by-number': {
      say: '"Each shape on this page has a number in it. The code at the top tells you which color goes with each number. Color every shape in the color of its number."',
      first: 'Make sure every child has the crayons the code names. Read the code aloud together. Take the first number of the code, find one shape with that number in it, and color it together. Tell the children to do one color at a time.',
      stuck: 'Have the child put a finger on the number inside the shape, then find the same number in the code. If a child does not have a color, another color is fine as long as they use the same one for that number every time.',
    },
    'K:dot-to-dot-sequence': {
      say: '"This is a dot-to-dot. Start at the orange dot, at number 1. Draw a line to 2, then to 3, and keep counting until you get to 10."',
      first: 'Count from 1 to 10 aloud together. Find the orange dot together and put a finger on it. Ask, "What comes after 1?" Find 2 and draw the first line together.',
      stuck: 'Have the child say the number they are on and count one more; that is the number to look for. Point to the part of the page where the next dot is. If a line went to the wrong dot, leave it and go on from the right one.',
    },
    'K:sound-position': {
      say: '"Say the name of each picture and listen for the LAST sound, the sound at the very end. Then write the letter for that sound."',
      first: 'Name all the pictures together. On the page for everyone they are fox, sun, bus, book, bed, drum, pig, and cat. Do one together: say the word slowly and hold the last sound: "bus-sss." Ask, "What is the last sound? Which letter makes that sound?" Write the letter on the board. Remind the children that this page asks for the end of the word, not the beginning.',
      stuck: 'Say the word, stop before the last sound, and let the child finish it: "bu…" "sss!" A child who writes the first letter has listened to the beginning; say the word once more and tap the table at the last sound.',
    },
    'K:count-syllables': {
      say: '"Words have beats, like music. The beats are called syllables. Say the name of each picture, clap the beats, and write how many claps you made."',
      first: 'Clap a few children\'s names together: "Ma-ri-a, three claps." Name all the pictures on the page together. On the page for everyone they are airplane (2), ambulance (3), banana (3), dog (1), sun (1), cat (1), apron (2), and acorn (2). Clap the first picture\'s word together and write the number on the board.',
      stuck: 'Have the child put a hand under the chin and say the word at normal speed: the chin drops once for each syllable. If the child claps every sound, say the word together the way you would say it when talking.',
    },
    'K:word-sentence-tracing': {
      say: '"These are words we see all the time. Read the word, trace it, and then write it yourself on the empty line."',
      first: 'Read the words on the page aloud and have the class read each one after you. Do the first word together: read it, write it on the board, trace over it with your finger, and write it once more next to it. Tell the children to say the word each time they finish writing it.',
      stuck: 'Read the word for the child and have the child say it back while pointing to it. For the writing, have the child copy one letter at a time and keep the letters close together.',
    },
    'K:compare-groups': {
      say: '"In each box there are two groups. Count both groups. Then circle the group that has MORE."',
      first: 'Do the first box together: count one group aloud, then the other. Ask, "Which number is more?" Circle that group. Tell the children that a group can look big and still have fewer things in it, so they have to count.',
      stuck: 'Have the child draw a line from each thing in one group to one thing in the other group. The group with things left over has more.',
    },
    'K:before-after-back': {
      say: '"Each number has a neighbor before it and a neighbor after it. Write the number that comes just before and the number that comes just after."',
      first: 'Write the numbers 1 to 20 in a row on the board and leave them there. Do the first one together: find the number on the board, point to the number before it and the number after it, and write them on the page.',
      stuck: 'Walk to the board with the child and have the child put a finger on the number: one step to the left is the number before, one step to the right is the number after.',
    },
    'K:shape-naming': {
      say: '"Look at the code at the top. It tells you which color each shape gets. Color every shape in the picture in the color the code shows."',
      first: 'Make sure every child has the crayons the code shows. Go through the code together: point to each shape, have the class name it, and say its color. Find one shape in the picture and color it together. Tell the children to do one kind of shape at a time.',
      stuck: 'Have the child put a finger on the shape and look for the same shape in the code. A shape that is bigger, smaller, or turned is still the same shape.',
    },
    'K:days-of-week': {
      say: '"There are seven days in a week. On this page the days are mixed up. The first day already has a 1. Number the other days from 2 to 7, in the order they come."',
      first: 'Say the days of the week together, starting with the day that is marked 1 on the page. Read all the day names on the page aloud and have the children point to each. Find the day that comes second together and write a 2 next to it.',
      stuck: 'Say the days in order with the child, beginning with the day marked 1, and stop after each one so the child can find its word. Read the words for a child who cannot read them yet; the first letters help.',
    },
    'K:word-picture-match': {
      say: '"Read each word. Then draw a line from the word to its picture."',
      first: 'Name all the pictures together. Do the first word on the board: point to each letter, say its sound, and blend the sounds into the word. Ask, "Which picture is that?" Draw the line together.',
      stuck: 'Have the child say the sound of each letter and then say the sounds faster. If that does not work, ask for the first sound only and look for the pictures that begin with it. Read the word for the child if they are still stuck.',
    },
    'K:cvc-build': {
      say: '"Next to each picture are the letters of its word, but they are mixed up. Say the word, listen to its sounds, and write the letters in the right order."',
      first: 'Name all the pictures together. Do the first word on the board: say the word slowly and ask, "What is the first sound? The next sound? The last sound?" Write a letter for each sound and read the word together.',
      stuck: 'Have the child say the word slowly and hold up one finger for each sound. Ask which of the letters makes the first sound, and cross each letter out when it is used. Then have the child read the word they wrote.',
      byType: {
        'K-224': {
          say: '"Each word on this page has a gap in the middle: one letter is missing. Say the picture\'s name, listen for the sound in the middle, and write its letter."',
          first: 'Name all the pictures together. On the page for everyone they are fig, dog, pig, leg, fox, hat, cat, and bus. Do the first word on the board: say the word slowly, point to each letter as you say its sound, and stop at the empty space. Ask, "Which sound belongs here? Which letter makes it?" Write it in and read the word together.',
          stuck: 'Say the word slowly and stretch the sound in the middle: "p-iii-g." The missing letter is always one of the vowels: a, e, i, o, or u. Write the five vowels on the board for the child to choose from.',
        },
        'K-231': {
          first: 'Name all the pictures together. On the page for everyone they are frog, fox, bus, sun, star, and ball. Do the first word on the board: say the word slowly and ask, "What is the first sound? The next sound? The last sound?" Write a letter for each sound and read the word together.',
        },
      },
    },
    'K:combine-groups': {
      say: '"In each box there are two groups. Count all the things in both groups together, and write how many there are in all."',
      first: 'Do the first box together: count the first group aloud and keep counting through the second group without starting over. Ask, "How many in all?" Write the number on the board.',
      stuck: 'Have the child touch each picture while counting and keep going from the first group into the second. If the child starts again at one for the second group, count with them once.',
    },
    'K:number-bonds-k': {
      say: '"A number bond shows a number and the two parts that make it. The whole is on top, and the two parts are below. One number is missing. Find it and write it in the dashed circle."',
      first: 'Draw the first number bond on the board. Point to the top circle and say, "This is the whole." Point to the two circles below: "These are the two parts." Show it with fingers: "The whole is 5. One part is 2. How many are in the other part?" Write the answer in the dashed circle.',
      stuck: 'Give the child counters, or have them draw dots: as many as the whole. Cover as many as the part that is shown and count what is left. If the whole is the number that is missing, count both parts together.',
      byType: {
        'K-276': {
          say: '"A number bond shows a number and the two parts that make it. On this page the two parts are there, and the whole is missing. Put the two parts together and write the whole in the dashed circle."',
          first: 'Draw the first number bond on the board. Point to the two parts and ask, "How many is that together?" Count both parts with fingers and write the whole in the dashed circle.',
          stuck: 'Have the child draw dots for each part under the number bond and count all the dots. That number is the whole.',
        },
      },
    },
    'K:classify-count-kinds': {
      say: '"This is an I Spy picture. Many different things are mixed together. Count each kind and write its number."',
      first: 'Look at the first kind together: point to its little picture next to the answer box. Find every one of that kind in the big picture and cross each one out as the class counts aloud. Write the number in the box.',
      stuck: 'Have the child do one kind at a time and put a small mark on each one as it is counted. If the count is off, count the marks together.',
    },
    'K:seasons': {
      say: '"A tree looks different in winter, spring, summer, and fall. Each box has a bare tree. Draw what belongs on the tree in that season."',
      first: 'Make sure every child has crayons. Read the name of each season aloud and point to its box. Talk about each one for a moment: "What does a tree look like in winter? What grows on it in spring? What does it have in summer? What happens to the leaves in fall?" Then the children draw on the bare trees, one box at a time, and color them.',
      stuck: 'Ask the child one question about the season: "Is it warm or cold? Are there leaves on the tree?" Any drawing that fits the season is right; where you live, winter may not mean snow.',
    },
    'K:story-sequencing': {
      say: '"Each row shows a little story in four pictures, but the pictures are out of order. Look at what changes. Write 1 under what happens first, then 2, 3, and 4."',
      first: 'Do the first story together. Ask a child to say what is happening in each picture. Ask, "Which one happens first? How do you know?" Write a 1 in the box under it, then find 2, 3, and 4 together. Have a child tell the whole story in order.',
      stuck: 'Ask the child to find the picture where the story starts, where nothing has happened yet. Then ask, "What happens after that?" Have the child tell the story aloud; if it makes sense, the order is right.',
    },
    'K:family': {
      say: '"This page shows a family. Each person on the family tree has a number. Find the person with the same number, trace the family word, and write it again on the line."',
      first: 'Look at the family tree together. The girl with the star is Anna, and the words say who each person is to her. Read the family words on the page aloud. Do number 1 together: find the person with the 1 on the tree, find the word with the 1, trace it, and write it again on line 1.',
      stuck: 'Have the child put a finger on the number next to the word and find the same number on the tree. Read the word for the child. If a child says their own family does not look like this one, say, "Every family is different. This page is about Anna\'s family."',
    },
    'K:tally-marks': {
      say: '"Tally marks are a quick way to count. Make one mark for each picture. The fifth mark goes across the other four, like a gate."',
      first: 'Draw tally marks on the board while the class counts to five: four marks standing up, and the fifth one across them. Do the first box together: count the pictures and draw one mark for each.',
      stuck: 'Have the child cross out one picture and draw one mark, then the next picture and the next mark. Count the marks together at the end. If the child draws five standing marks before the one across, show the group of five on the board again.',
    },
    'K:fact-fluency-colour-code': {
      say: '"Every shape on this page has a little math problem in it. Find the answer, look for that number in the code, and color the shape in that color."',
      first: 'Make sure every child has the crayons the code names. Do one shape together: read the problem, find the answer with fingers, and write the answer small next to the problem. Find that number in the code and color the shape. Tell the children to check the sign first: plus or minus.',
      stuck: 'Let the child use fingers or draw dots to find the answer. Have the child write the answer in the shape before looking at the code. If the answer is not in the code, the child should work the problem again.',
    },
    'K:category-odd-one-out': {
      say: '"In each row, the shapes are all the same but one. Find the one that does not belong and circle it."',
      first: 'Do the first row together. Point to the shapes one by one and name them: "star, star, star…" Ask, "Which one is not a star?" Circle it and have a child say why it does not belong.',
      stuck: 'Have the child point to the first shape and then to each of the others, asking, "Is this the same shape?" If the child chooses another one and can give a good reason, accept it.',
    },
  },
};
