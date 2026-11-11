'use strict';
/**
 * Guest teacher scripts, English (US), Grade 1 teaching points (Daily Teaching System, Part 5.1). One script per
 * teaching point: what to SAY, how to START together, what to do when a child is STUCK; `byType` holds the sentences
 * that are true of one worksheet type only. Written from the title and directions each worksheet prints
 * (scripts/sub-plans/candidates.js), for an adult who has never seen the class.
 * A point that has only `byType` here adds those types to a script that frontend/content/sub-plans/scripts/en.json
 * already holds (the pilot pack's points). Merged by scripts/sub-plans/apply-texts.js.
 */
module.exports = {
  loc: 'en',
  points: {
    '1:spell-picture-words': {
      say: '"Say the name of each picture. Find its word in the word bank. The first letter is already there; you write the rest of the word."',
      first: 'Name all the pictures together, so that everyone uses the same word for each. Read the word bank aloud. Do the first picture together: say the word, find it in the word bank, and copy the rest of it after the first letter. Cross the word out in the word bank.',
      stuck: 'Have the child say the picture word and listen for its first sound, then look in the word bank for a word that starts with the letter that is already written. Read the words in the word bank for a child who cannot read them.',
      byType: {
        'G1-259': {
          say: '"Say the name of each picture. Every word you need is in the word bank at the top. Find the right word and write it next to its picture."',
          first: 'Name all the pictures together, so that everyone uses the same word for each. Read the word bank aloud. Do the first picture together: say the word, listen for its first sound, find the word in the word bank, and copy it onto the lines. Cross the word out in the word bank.',
          stuck: 'Have the child say the picture word and its first sound, then look in the word bank for a word that starts with that letter. Read the words in the word bank for a child who cannot read them, and have the child copy the word one letter at a time.',
        },
      },
    },
    '1:add-within-10-models': {
      say: '"Each domino has dots on two sides. Count the dots on both sides and write how many there are altogether. That number is called the sum."',
      first: 'Draw the first domino on the board. Count the dots on the left side, then keep counting on the right side. Write the two numbers and the sum. Show the children how to start with the bigger side and count on from it.',
      stuck: 'Have the child touch each dot while counting. If the child counts one side, starts over at one for the other side, and writes that second number, count across both sides with them once without stopping.',
    },
    '1:word-families-syllable-reading': {
      say: '"The box at the top has two word families. The words in the first row all end in -an. The words in the second row all end in -at. Read them out loud. Then say each picture word and circle the word under the picture that names it."',
      first: 'Read the words at the top aloud together, row by row (the printed directions call this box the carpet), and ask what is the same in all the words of a row. Do the first picture together: name it, read the three words under it, and circle the one that names the picture.',
      stuck: 'Have the child name the picture and say its first sound, then look for the word that begins with that letter. If two words begin the same way, have the child read both to the end.',
    },
    '1:phoneme-boxes': {
      say: '"Say the word for each picture slowly, like a turtle. Write one sound in each box, starting on the left. If the word has fewer sounds than boxes, leave the last boxes empty."',
      first: 'Name all the pictures together. On the page for everyone they are panda, koala, bison, zebra, tiger, and seal. Do the first word on the board: draw the boxes, say the word slowly, and tap a box for each sound. Write the letter or letters for each sound in its box. Count the sounds together.',
      stuck: 'Have the child say the word slowly and push a finger forward for each sound. Two letters that make one sound, such as sh, go in one box together. A child who fills every box, whether the word needs them all or not, is spelling letter by letter and not listening for sounds; say the word together again and tap one box for each sound.',
    },
    '1:subtract-cross-out': {
      say: '"In each box, some pictures are crossed out. They are gone. Count the pictures that are left and write that number."',
      first: 'Do the first box together. Ask, "How many were there at the start? How many are crossed out? How many are left?" Count the ones that are left aloud and write the number. Say it as a subtraction: "Six take away two is four."',
      stuck: 'Have the child circle each picture that is not crossed out while counting it. If the child counts every picture, cover the crossed-out ones with a finger.',
    },
    '1:count-on-back-hops': {
      say: '"Each number line has a dot where you start, and little arcs that show the hops. Count the hops forward from the dot, and write the number where the last hop lands."',
      first: 'Draw the first number line on the board. Put your finger on the starting dot and say its number. Follow the arcs one at a time and count on aloud: "fifteen… sixteen, seventeen, eighteen." Write the number where the last arc lands. Point out that the line is numbered by twos: each small mark between two numbers is the number in between.',
      stuck: 'Have the child put a finger on the dot, say its number, and move one mark for each arc while counting on. If the child cannot tell which number the dot is on, count the marks from the last printed number together.',
    },
    '1:picture-sudoku': {
      say: '"This is a picture puzzle. Each row across, each column down, and each small box needs all four pictures, one of each. Find out which picture is missing in each empty space, and draw it or write its first letter."',
      first: 'Do one empty space together. Pick a row that has only one empty space and name the three pictures that are already in it. Ask, "Which one is missing?" Draw it in. Tell the children to always look for the row, column, or box that is almost full.',
      stuck: 'Point to a row or column with only one empty space and have the child name the pictures in it. If none is that full, have the child check the row and the column of one empty space together to see which pictures are already used.',
    },
    '1:number-of-the-day': {
      say: '"Look at the big number on the page. It is the number of the day. Every box on the page asks something about that number. Fill in all the boxes."',
      first: 'Read the number of the day aloud together. Go around the page and read the label of each box aloud, so that the children know what each one asks for. Fill in the tens and ones box together: "How many tens are in this number? How many ones?" The children do the other boxes on their own.',
      stuck: 'Read the label of the box to the child again. Have the child build the number with ten fingers and some more, or draw a row of ten dots and the extra ones. A child who cannot finish every box should do the ones they know.',
    },
    '1:skip-counting': {
      say: '"On this page we count by fives: 5, 10, 15, 20. Some numbers are missing. Count by fives and write each missing number. Be careful: the rows do not all start at 5."',
      first: 'Count by fives to 100 aloud together, twice. Do the first row on the board: read the first number, count on by fives, and clap at each empty box. Ask, "What number comes here?" Write it in.',
      stuck: 'Have the child whisper the count by fives from the first number of the row. Numbers you say when you count by fives end in 5 or in 0; if the child\'s number ends in something else, count the row together.',
    },
    '1:cloze': {
      say: '"Each sentence has a gap, and one of the pictures belongs in it. Read the sentence, find the picture that makes sense, and draw a line from the sentence to that picture."',
      first: 'Name all the pictures together. Read the first sentence aloud together and say "blank" at the gap. Try a picture word in the gap: "Does that make sense?" Draw the line together. Then the children read the other sentences on their own.',
      stuck: 'Read the sentence with the child, one word at a time, and say "blank" at the gap. Then say the sentence with each picture word in turn and ask which one makes sense.',
    },
    '1:syllables-split': {
      say: '"Words have parts called syllables. Say each picture word and clap its parts. Then draw one scoop under the word for every syllable you hear."',
      first: 'Name all the pictures together. Clap the first word together and count the claps. Show on the board how to draw a scoop, a little curved line, under each part of the word.',
      stuck: 'Have the child put a hand under the chin and say the word at normal speed: the chin drops once for each syllable. The number of drops is the number of scoops.',
    },
    '1:number-walls': {
      say: '"This is a number wall. Each brick is the sum of the two bricks right under it. Start at the bottom and build every wall to the top."',
      first: 'Draw the first wall on the board. Point to two bricks that sit side by side in the bottom row and to the brick that rests on both of them: "Three plus two is five. Five goes on top." Fill in that wall together.',
      stuck: 'Put two fingers on the two bricks under the empty brick and have the child add those two numbers with fingers or dots. If the child writes the sum next to the bricks and not above them, point to the brick that touches both.',
    },
    '1:hundreds-chart': {
      say: '"This chart has the numbers from 1 to 100 in order, but some numbers are hiding. Write each missing number in its box."',
      first: 'Read the first row of the chart aloud together. Find the first empty box together and ask, "What number comes just before it? So what number goes here?" Show that the number in the box above is ten less.',
      stuck: 'Have the child look at the number just before the empty box and count one more. For an empty box at the start of a row, look at the number above it: it has the same last digit, and it is ten less.',
    },
    '1:logic-picture-clues': {
      say: '"These are detective puzzles. The picture clues tell you what each child has and does not have. A crossed-out picture means the child does NOT have it. A circled picture means the child has it."',
      first: 'Do the first puzzle together on the board. Read the first clue: the name with a crossed-out picture means that child does NOT have that thing. Find the child\'s row and the picture\'s column in the grid and put an X in that box. A circled picture means the child has it: put a check mark in that box and an X in the other boxes of that row and that column. Go through the clues one by one. At the end, circle what each child has in the row of answers under the grid.',
      stuck: 'Have the child take one clue at a time and make its mark in the grid before reading the next clue. When a row has only one box without an X, that box gets the check mark: it is what the child in the puzzle has.',
    },
    '1:days-months-seasons~season-wheel': {
      say: '"There are twelve months in a year and four seasons: winter, spring, summer, and fall. Each season has its own color in the key. Color the circle next to each month in the color of its season."',
      first: 'Make sure every child has the crayons the key names. Read the color key aloud together. Read the names of the twelve months aloud and have the children point to each one. Do the first month together: "January. Which season is it in? Which color is that?" Color its circle. For your own reference: December, January, and February are winter; March, April, and May are spring; June, July, and August are summer; September, October, and November are fall.',
      stuck: 'Read the month to the child and ask what the weather is like then, or what holiday or birthday comes in that month. Then find that season in the key.',
    },
    '1:opposites': {
      say: '"Opposites are words that are as different as they can be, like hot and cold, or up and down. Find the two words that are opposites and write each pair on a line, one word on each side of the arrow."',
      first: 'Read all the words on the page aloud together. Take the first word and ask, "What is the opposite?" Find that word on the page and write the pair on the first line, one word on each side of the arrow. Cross out both words.',
      stuck: 'Read a word to the child and act it out or use it in a sentence: "The soup is hot. The ice is…?" Have the child cross out each word once it is used, so that fewer words are left to choose from.',
    },
    '1:time-read': {
      say: '"Every clock on this page shows a time that is half past the hour. Read each clock and circle the time that matches."',
      first: 'Draw a clock on the board that shows half past two. Say: "The long hand points to the 6. That means half past. The short hand tells the hour. It has gone past the 2 and is halfway to the 3, so the time is half past two, or 2:30." Do the first clock on the page together.',
      stuck: 'Ask, "Which number has the short hand just passed?" That number is the hour. A child who names the next number is looking at where the short hand is going, not at where it has been.',
    },
    '1:picture-analogies': {
      say: '"Look at the first two pictures and see what changed from the first to the second. Then look at the third picture: it changes in the same way. Circle the picture that shows it."',
      first: 'Do the first row together. Point to the first two pictures and ask, "What happened? Did it get bigger or smaller?" Say it in a sentence: "The big one turned into a small one." Then point to the third picture: "So this one turns into…?" Circle the answer among the three choices.',
      stuck: 'Have the child say what changed in the first pair in their own words, then say the same about the third picture. Check each choice: it has to be the same fruit as the third picture, and changed in the same way.',
    },
    '1:days-months-seasons': {
      say: '"There are twelve months in a year. On this page they are mixed up. January already has a 1. Number the other months from 2 to 12 in the order of the year."',
      first: 'Say the months of the year aloud together, twice. Read the month names on the page aloud and have the children point to each one. Ask, "Which month comes after January?" Find February together and write a 2 next to it.',
      stuck: 'Say the months in order with the child from January and stop at each one so the child can find its word and number it. If the classroom has a calendar, the child may use it.',
    },
    '1:word-classes': {
      say: '"A noun names a person, an animal, a place, or a thing, like dog or school. A verb is something you can do, like run or sing. Read each word and write it in the right bin: noun or verb."',
      first: 'Read the ten words aloud together. Take the first word and try two test sentences: "I can see a ___" for a noun, and "I can ___" for a verb. Decide together and write the word in its bin. Cross it out in the list.',
      stuck: 'Read the word to the child and have the child try both test sentences aloud: "I can see a jump. I can jump." The one that sounds right tells the bin. A word that can be both, such as "paint," is right in either bin if the child can use it in a sentence.',
    },
    '1:pronouns': {
      say: '"We do not say a name over and over. We use a short word in its place: he, she, or they. Read the first sentence. Then write the word from the word bank that takes the place of the name in the second sentence."',
      first: 'Read the word bank aloud together: She, They, He. Read the first pair of sentences aloud. Ask, "Who is the sentence about? One boy, one girl, or more than one person?" Choose the word together and write it in the second sentence. Read both sentences again.',
      stuck: 'Read both sentences with the child and put a finger under the name or names. Ask whether it is one person or more than one, and a boy or a girl. Then try each word from the word bank in the gap and read the sentence aloud.',
    },
    '1:coins': {
      say: '"Each purse has coins in it. The number on a coin tells you how many cents it is worth. Count how much money is in the purse and write the amount in the box."',
      first: 'Draw the three coins on the board: a 10 is a dime, a 5 is a nickel, and a 1 is a penny. Do the first purse together: start with the coin that is worth the most and count on: "10… 15… 16 cents." Write the amount in the box in front of the cent sign.',
      stuck: 'Have the child touch each coin, biggest number first, and say the running total. A child who counts the coins and not the cents (three coins are "3") should read the number on each coin aloud first. If the classroom has play coins, let the child lay them out.',
    },
    '1:bar-graphs': {
      say: '"A bar graph shows how many with bars. A taller bar means more. Read each bar and write its number."',
      first: 'Hold up the page and point to the first bar. Put your finger on the top of the bar and slide it across to the numbers on the side. Read the number together and write it in the box.',
      stuck: 'Have the child put a finger on the top of the bar and move it straight across to the numbers. The child may also count the boxes in the bar from the bottom up.',
    },
    '1:rhyming': {
      byType: {
        'G1-343': {
          say: '"Rhyming words sound the same at the end, like cat and hat. At the top of the page are small pictures. Say each one, find the big picture it rhymes with, and write its word on a line under that big picture."',
          first: 'Name the big pictures and the small pictures together, so that everyone uses the same words. On the page for everyone the big pictures are clock, dog, and cat, and the small ones are bat, frog, sock, hat, rock, and log. Take the first small picture and say its word with each big picture in turn. Ask which pair sounds the same at the end. Write the word on the board under that big picture; the children write it on a line.',
          stuck: 'Say the two words one after the other and stretch the ending: "c-AT, h-AT." If the child does not know a picture\'s name, tell them. For spelling, have the child say the word slowly and write a letter for each sound; a careful try is enough.',
        },
      },
    },
    '1:mazes': {
      byType: {
        'G1-422': {
          say: '"Many streets lead to the green car, but the tow truck wants the SHORTEST way. Find it, draw it, and write how many street pieces it takes."',
          first: 'Hold up the page and show the tow truck and the green car. Trace one way with your finger and count the street pieces aloud. Ask, "Is there a shorter way?" Tell the children to try at least two ways with a finger and count each before they draw.',
          stuck: 'Have the child trace a way with a finger and count the pieces, then try another way and count again. The way with the smaller number is the one to draw.',
        },
      },
    },
    '1:find-the-differences': {
      byType: {
        'G1-413': {
          say: '"Here is a spot-the-difference puzzle. The bottom picture is not the same as the top one. Some things have changed, and some things may be gone. Circle every difference in the bottom picture, then write how many you found."',
          first: 'Find one difference together: ask a child to point to it and say what changed. Circle it in the bottom picture. Do not tell the class how many differences there are; counting them is part of the puzzle.',
          stuck: 'Have the child cover part of both pictures with a hand and compare one small part at a time, from top to bottom. Remind the child to look for things that are missing, too.',
        },
        'G1-414': {
          say: '"Here is a spot-the-difference puzzle. Three things in the bottom picture have changed. Circle them. Then read the words and check the ones that name the things that changed."',
          first: 'Find one difference together and circle it in the bottom picture. Read the list of words aloud. Ask, "Which word names the thing we just circled?" Check its box together.',
          stuck: 'Have the child compare one small part of the two pictures at a time, from top to bottom. Read the words to a child who cannot read them, and ask, "Did this one change?" for each.',
        },
        'G1-415': {
          say: '"This page has two pairs of pictures. In each pair, picture 2 is picture 1 flipped over, the way a mirror would show it. But some things are still different: four in all. Circle them in picture 2 and check a box for each one. Then fold the page on the dashed line to check."',
          first: 'Hold the page up and show how picture 2 is flipped: what is on the left in picture 1 is on the right in picture 2. Find one difference together and circle it. Show how to fold the page on the line at the end, so that the two pictures lie on top of each other.',
          stuck: 'Have the child pick one thing in picture 1 and find it in picture 2 on the other side. Folding the page on the line and holding it up to the window shows what does not match.',
        },
      },
    },
    '1:read-and-follow': {
      byType: {
        'G1-308': {
          say: '"Now it is time to read. Each sentence tells you to do something to the row of pictures with your pencil. Read the sentence, do exactly what it says, and check the little box when you are done."',
          first: 'Point to the flag and tell the children that the row of pictures starts there. Read the first sentence aloud together, pointing to each word. Ask, "Which picture? What do we do to it?" Do it together and check the box.',
          stuck: 'Point to the word the child cannot read and say its first sound; if that is not enough, read the word. Then have the child read the whole sentence again and tell you what to do before picking up the pencil.',
        },
      },
    },
    '1:unscramble-sentence': {
      byType: {
        'G1-302': {
          say: '"The words of these sentences got mixed up. Your job is to put them back in order and write the sentence. One word has the end mark after it, so it goes last. You have to find the word that goes first."',
          first: 'Write the mixed-up words of the first sentence on the board. Read them aloud with the class. Find the word with the end mark and say, "This one is last." Ask, "Which word could start the sentence?" Try the children\'s ideas aloud until one order sounds right. Write the sentence with a capital letter at the start.',
          stuck: 'Have the child read every word aloud, then try a first word and read on: "Does that sound like something you would say?" If the child cannot read a word, read it for them. Cross out each word once it is used. Remind the child that the word I is always written as a capital letter.',
        },
      },
    },
    '1:story-sequencing': {
      byType: {
        'G1-402': {
          say: '"Each story on this page is told in four sentences, but the sentences are out of order. Read them. Number them 1 to 4 in the order things happen. Then draw a line from each sentence to its picture."',
          first: 'Do the first story together. Read the four sentences aloud. Ask, "Which one happens first? How do you know?" Write a 1 in its box, then find 2, 3, and 4. Read the story in order, and draw a line from each sentence to the picture that shows it.',
          stuck: 'Read the sentences to the child and ask which one could be the beginning. Have the child tell the story aloud in the order of the numbers; if it makes sense, the order is right. The pictures help: look at what changes from one to the next.',
        },
      },
    },
    '1:word-problems': {
      byType: {
        'G1-241': {
          say: '"Each problem on this page is a short story with numbers. Read the story, look at the picture, and write the answer in the box. We will do the first one together. If you cannot read a word, raise your hand and I will help you."',
          first: 'Read the first story aloud together, twice. Ask: "What happens in the story? Do we get more, or do some go away?" Find the answer together and write it in the box. Then the children read the other stories on their own. Walk around and read a story aloud to any child who needs it; this page is math practice, not a reading test.',
        },
      },
    },
  },
};
