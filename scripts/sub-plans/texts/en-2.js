'use strict';
/**
 * Guest teacher scripts, language en, teaching points of grade 2 (Daily Teaching System, Part 5). One script
 * per teaching point: what to SAY, how to START together, what to do when a child is STUCK; `byType` for one
 * worksheet type. Written from the pictures of the worksheets. Merged by scripts/sub-plans/apply-texts.js.
 */
module.exports = {
  loc: 'en',
  points: {
    '2:word-classes': {
      say: '"A noun names a person, an animal, a place, or a thing. A verb is something you can do. An adjective tells what something is like. Read the nine words and write each one in the right bin."',
      first: 'Read the nine words aloud together. Sort one of each kind on the board with a test sentence: "I can see a ___" for a noun, "I can ___" for a verb, and "The dolphin is ___" for an adjective. The nouns on this page have a little picture next to them. Cross out each word once it is in a bin.',
      stuck: 'Read the word to the child and have the child try the three test sentences aloud. The one that sounds right tells the bin. For your own reference, on the page for everyone the nouns are dolphin, seagull, and giraffe; the verbs are swim, sit, and run; the adjectives are slow, purple, and red.',
    },
    '2:sentence-boundaries': {
      say: '"These sentences have lost their capital letters and their end marks. Write each sentence again on the lines, the right way. A sentence starts with a capital letter. A name starts with a capital letter. The word I is always a capital. And every sentence needs an end mark."',
      first: 'Write the first sentence on the board just as it is printed. Ask: "What is wrong with it?" Fix it together: a capital letter at the start, a capital letter for each name and for the word I, and a period at the end. The children write the corrected sentence on the lines.',
      stuck: 'Have the child put a finger on the first word, then on every name, then on the end of the sentence, and ask at each place, "Capital letter? End mark?" The three small pictures above the first sentence show the three things to check.',
      byType: {
        'G2-282': {
          say: '"These sentences have lost their capital letters and their end marks, and some of them are questions. Write each sentence again on the lines, the right way. Choose the end mark: a period for a sentence that tells something, a question mark for a sentence that asks something."',
          first: 'Write the first sentence on the board just as it is printed: "can you find the pear". Ask, "What is wrong with it?" Fix the capital letter at the start. Then ask, "Does this sentence tell us something, or does it ask something?" It asks, so it ends with a question mark. Remind the children that names and the word I get a capital letter, too.',
          stuck: 'Have the child read the sentence aloud and listen: a question on this page starts with can, where, or did. Then the child puts a finger on the first word, on every name, and on the end of the sentence, and checks each place. For your own reference, on the page for everyone sentences 1, 2, and 4 are questions; sentences 3 and 5 end with a period.',
        },
      },
    },
    '2:hundreds-chart-moves': {
      say: '"Each puzzle starts at a number and has three arrows. Every arrow changes the number: up is 10 less, down is 10 more, left is 1 less, and right is 1 more. Follow the arrows and write the number where you land."',
      first: 'Point to the key at the top of the page and read it aloud together. Do the first puzzle on the board, one arrow at a time, and write the number after each arrow: for example, "30, one less is 29, ten more is 39, one less is 38."',
      stuck: 'Have the child write the new number above each arrow before going on to the next one. If the classroom has a hundreds chart, the child can put a finger on the starting number and move one square for each arrow.',
      byType: {
        'G2-322': {
          say: '"Each puzzle has two numbers, and each number has an arrow. The key at the top tells what the arrows do: up is 10 less, down is 10 more, left is 1 less, and right is 1 more. Both arrows lead to the same number. Find that mystery number and write it in the box."',
          first: 'Point to the key at the top of the page and read it aloud together. The printed directions mention "the chart": that is a hundreds chart, where one square to the right is 1 more and one square down is 10 more. No chart is printed on the page, and none is needed. Do the first puzzle on the board: "24, arrow down: 10 more is 34. 33, arrow to the right: 1 more is 34." Both arrows land on 34, so 34 is the mystery number. Tell the children to follow both arrows every time; the second arrow checks the first.',
          stuck: 'Have the child say what the arrow does before using it, and follow only one arrow at first. Then the child follows the second arrow; if the two answers are not the same, one of them needs another look. For your own reference, on the page for everyone the mystery numbers are 34, 18, 51, 28, 63, 30, 50, and 26.',
        },
      },
    },
    '2:hundred-more-less': {
      say: '"Look at the number in the middle. On the left, write the number that is 100 less. On the right, write the number that is 100 more."',
      first: 'Do the first one on the board. Ask: "A hundred more. Which digit changes? Which two stay the same?" Show that only the hundreds digit changes: 249, 349, 449. Count by hundreds from another number together.',
      stuck: 'Have the child cover the tens and the ones with a finger and look only at the hundreds digit: one less for 100 less, one more for 100 more. The two covered digits are copied as they are.',
    },
    '2:find-differences': {
      say: '"Here is a spot-the-difference puzzle with two pairs of pictures. In each pair, the picture on the right is different in 5 places. Circle each difference, and check a box under the pair for every one you find."',
      first: 'Find one difference in the top pair together: ask a child to point to it and say what changed. Circle it in the picture on the right and check off one box. The printed directions say "tick a box"; tell the children that means a check mark.',
      stuck: 'Have the child cover part of both pictures of a pair with a hand and compare one small part at a time, from top to bottom. Things can be missing, added, or changed.',
      byType: {
        'G2-389': {
          say: '"Here are two pictures that look almost the same. Picture 2 is different in 3 places. Circle each difference in picture 2. Then write one sentence about each difference on the lines. The words in the two strips under the pictures help you."',
          first: 'Find one difference together and circle it in picture 2. Read the two strips aloud: the first strip names things in the picture, and the second strip tells how a thing can change. Build a sentence together and write it on the board, for example: "In picture 2, the sun is smaller." Show that every line already starts with "In picture 2," so the children only finish the sentence.',
          stuck: 'Have the child compare one small part of the two pictures at a time, from top to bottom. For the sentence, ask, "Which thing is it? What happened to it?" The child picks one word from each strip and says the sentence aloud before writing it. For your own reference, on the page for everyone the differences are in the sun, the clouds, and the elephant.',
        },
      },
    },
    '2:skip-count-5-10-100': {
      say: '"This is a dot-to-dot, and you count by tens. Start at the orange dot at 10. Draw a line to 20, then to 30, and keep going to 100."',
      first: 'Count by tens from 10 to 100 aloud together. Find the orange dot at 10 together. Ask, "What comes after 10 when we count by tens?" Draw the first line together. The row of numbers at the bottom of the page shows the order.',
      stuck: 'Have the child say the number they are on and add ten; that is the dot to look for. The numbers in the row at the bottom can be crossed off one by one.',
      byType: {
        'G2-304': {
          say: '"This is a dot-to-dot, and you count by fives. Start at the orange dot at 5. Draw a line to 10, then to 15, and keep going to 50."',
          first: 'Count by fives from 5 to 50 aloud together. Find the orange dot at 5 together. Ask, "What comes after 5 when we count by fives?" Draw the first line together. The row of numbers at the bottom of the page shows the order.',
          stuck: 'Have the child say the number they are on and add five; that is the dot to look for. The numbers in the row at the bottom can be crossed off one by one.',
        },
        'G2-392': {
          say: '"The balloon wants to float up to the rainbow. It can only go from cloud to cloud by counting by fives: 5, 10, 15, and so on, all the way to 100. Draw its way."',
          first: 'Count by fives to 100 aloud together. Find the balloon and the cloud with the 5 together. Ask, "Which cloud comes next?" Draw the line to 10 together. Tell the children that some clouds are traps: a number can be on the page more than once, and only the one next to the path counts.',
          stuck: 'Have the child say the number they are on and add five, then look only at the clouds that touch the path from where they are. If the path ends, the child goes back to the last cloud and looks for the same number somewhere else.',
        },
      },
    },
    '2:plural-nouns': {
      say: '"Look at the pictures in each row. There is more than one. Write the word for more than one in the box, so that the sentence is complete."',
      first: 'Do the first sentence together. Ask: "What are these? One cow, three…?" Write the word on the board and point to the s at the end. Read the whole sentence aloud. The children do the other sentences the same way.',
      stuck: 'Ask the child to name one of the pictures, then say "one ___, two ___" aloud. A careful spelling that you can read is enough. For your own reference, on the page for everyone the pictures are cows, lions, hens, planes, penguins, monkeys, balls, and bats; other words that fit the picture, such as chickens or airplanes, are right as well.',
    },
    '2:pronouns': {
      say: '"We do not say a name over and over. We use a short word in its place: he, she, or they. Read each sentence. Then write it again on the lines with he, she, or they in place of the name or names."',
      first: 'Do the first sentence on the board: "Ben rides a bike." Ask, "Who is the sentence about? One boy, one girl, or more than one person?" Write the new sentence: "He rides a bike." Point out the capital letter at the start and the period at the end.',
      stuck: 'Have the child put a finger under the name or names and ask whether it is one person or more than one, and a boy or a girl. Two names joined by "and" become "They." The rest of the sentence is copied word for word.',
      byType: {
        'G2-354': {
          say: '"Words like his, her, and their tell who something belongs to. Look at who owns the thing in each row. Read the sentence and circle the word that fits: his, her, or their."',
          first: 'Do the first row together: "This is Jack. This is … drum." Ask, "Is Jack one boy, one girl, or more than one person?" Circle his. Then do the first row that has two names: "These are Lily and Emma. This is … dog." Two people own the dog, so the word is their.',
          stuck: 'Have the child count the people in the little picture: one boy takes his, one girl takes her, and two people take their, whether they are boys or girls. For your own reference, on the page for everyone the answers are his, his, her, their, her, their, their, and her.',
        },
        'G2-355': {
          stuck: 'Have the child put a finger under the name or names and ask whether it is one person or more than one, and a boy or a girl. Two names joined by "and" become "They." The rest of the sentence is copied word for word. For your own reference, on the page for everyone the new sentences start with He, They, They, They, He, She, He, and She.',
        },
      },
    },
    '2:number-line-not-from-zero': {
      say: '"These number lines do not start at zero. They start at 40 and go to 60. Each arrow points to a number. Find out which number it is and write it in the box."',
      first: 'Draw the first number line on the board. Read the printed numbers aloud: 40, 45, 50, 55, 60. Ask, "How much is one small step?" (One.) Find the printed number closest to the first arrow and count on or back from it to the arrow.',
      stuck: 'Have the child put a finger on the nearest printed number and count the small marks one by one to the arrow. An answer such as 3 or 7 means the child counted from the left end as if it were zero; point to the 40.',
      byType: {
        'G2-310': {
          say: '"These number lines do not start at zero. They start at 60 and go to 100. Each arrow points to a number. Find out which number it is and write it in the box."',
          first: 'Draw the first number line on the board. Read the printed numbers aloud: 60, 65, 70, and so on to 100. Ask, "How much is one small step?" (One.) Find the printed number closest to the first arrow and count on or back from it to the arrow.',
          stuck: 'Have the child put a finger on the nearest printed number and count the small marks one by one to the arrow. An answer that is much too small means the child counted from the left end as if it were zero; point to the 60.',
        },
        'G2-305': {
          stuck: 'Have the child put a finger on the nearest printed number and count the small marks one by one to the arrow, saying the numbers: "50, 51, 52, 53." An answer such as 3 means the child wrote the number of steps and not the number on the line. An answer such as 13 means the child counted from the left end as if it were zero; point to the 40. For your own reference, on the page for everyone the arrows point to 53 and 57 on the first line, 42 and 48 on the second, and 41 and 54 on the third.',
        },
      },
    },
    '2:column-method': {
      say: '"These addition problems are written one number under the other. Add one place at a time. Start on the right with the ones. Then add the tens."',
      first: 'Write the first problem on the board the way it is printed. Add the ones and write the answer under the ones. Add the tens and write the answer under the tens. Read the whole answer aloud. None of the problems on the page for everyone needs regrouping.',
      stuck: 'Have the child cover the tens column with a finger and add only the ones, then cover the ones and add the tens. Fingers or dots are fine for the small sums.',
      byType: {
        'G2-256': {
          say: '"These subtraction problems are written one number under the other. Subtract one place at a time. Start on the right with the ones. Then subtract the tens."',
          first: 'Write the first problem on the board the way it is printed: 69 minus 28. Subtract the ones, 9 minus 8, and write 1 under the ones. Subtract the tens, 6 minus 2, and write 4 under the tens. Read the whole answer aloud: 41. None of the problems on the page for everyone needs regrouping. In the third problem the answer has only one digit, so there is only one box.',
          stuck: 'Have the child cover the tens column with a finger and subtract only the ones, then cover the ones and subtract the tens. Counting back on fingers is fine for the small differences. For your own reference, on the page for everyone the answers are 41, 32, 5, 23, 11, and 53.',
        },
        'G2-258': {
          say: '"These addition problems have three-digit numbers, written one number under the other. Add one place at a time. Start on the right with the ones. Then add the tens. Then add the hundreds."',
          first: 'Write the first problem on the board the way it is printed: 122 plus 841. Add the ones and write 3 under the ones. Add the tens and write 6 under the tens. Add the hundreds and write 9 under the hundreds. Read the whole answer aloud: 963. None of the problems on the page for everyone needs regrouping.',
          stuck: 'Have the child cover two columns with a finger and add only the column that shows, from right to left. A zero in a column changes nothing: 6 plus 0 is 6. For your own reference, on the page for everyone the answers are 963, 959, 956, 877, 663, and 668.',
        },
        'G2-255': {
          stuck: 'Have the child cover the tens column with a finger and add only the ones, then cover the ones and add the tens. Fingers or dots are fine for the small sums. For your own reference, on the page for everyone the answers are 35, 84, 67, 92, 89, and 89.',
        },
      },
    },
    '2:calendar': {
      say: '"This is a calendar page for one month. The questions under it ask you to find things on the calendar. Read each question and write the answer in the box."',
      first: 'Read the name of the month and the names of the days across the top together. Do the first question together: find the date, put a finger on it, and go straight up to the name of the day. Write the answer. Read the other questions aloud once before the children start.',
      stuck: 'For a question about a day of the week, have the child find the day\'s name at the top and move a finger straight down its column. For a question about a picture, the child looks for the little picture inside the calendar. For your own reference, on the page for everyone the answers are Thursday, 4, the 21st, and 31.',
      byType: {
        'G2-297': {
          say: '"This is a calendar page for one month. Some days have a little picture on them, like a sticker. The questions ask you to find dates, to go one week ahead, and to count the days from one sticker to another."',
          first: 'Read the name of the month and the names of the days across the top together. Do the first question together: find the date, put a finger on it, and go straight up to the name of the day. Then show what one week later means: one row straight down, which is 7 days.',
          stuck: 'For a day of the week, have the child find the date and move a finger straight up its column. To count the days from one sticker to another, the child starts on the day after the first sticker and counts every day up to and including the second sticker. For your own reference, on the page for everyone the answers are Friday, 4, the 9th, the 17th, and 21.',
        },
      },
    },
    '2:digraphs': {
      say: '"The letters s and h together make one sound: sh, as in ship. Read each sentence. Circle every sh you find. Then count them and write the number in the box."',
      first: 'Write "sh" on the board and have the class make the sound. Read the first sentence aloud together. Find each sh together, at the beginning, in the middle, or at the end of a word, and circle it. Count the circles and write the number in the box.',
      stuck: 'Have the child put a finger under each word and look for an s with an h right after it. Read the sentence to a child who cannot read it; the task is to find the letters. An s alone or an h alone does not count. For your own reference, on the page for everyone the counts are 2 (fish, dish), 3 (shark, fish, splash), 1 (shade), and 2 (shore, shed).',
    },
    '2:synonyms': {
      say: '"Synonyms are words that mean the same thing, or almost the same, like big and large. Read the big word on each card. Then circle the word under it that means the same."',
      first: 'Do the first card together. Read the big word and the four words under it aloud. Try each one in a sentence: "The room was quiet. The room was sleepy? The room was hushed?" Circle the one that keeps the meaning. Read the words of the other cards aloud once, because some of them are new to second graders.',
      stuck: 'Read the words of the card to the child and have the child put each one into the same short sentence. For your own reference, on the page for everyone the answers are quiet and hushed, shut and close, yell and shout, jump and leap, amazed and astonished, noisy and loud, peaceful and calm, grumpy and angry.',
      byType: {
        'G2-373': {
          say: '"Synonyms are words that mean the same thing, or almost the same, like big and large. Each word on the left has a partner on the right that means the same. Draw a line from each word to its partner."',
          first: 'Read the words in both columns aloud once, because some of them may be new to the children. Do the first one together: "yummy." Read down the right column and ask which word means the same. Draw a line from yummy to delicious. Tell the children to start with the pairs they are sure about; the last ones get easier.',
          stuck: 'Read the word to the child and have the child put it into a short sentence, such as "The soup is yummy." Then the child tries the words on the right in the same sentence. For your own reference, on the page for everyone the pairs are yummy and delicious, tumble and fall, speak and talk, scared and frightened, happy and cheerful, weep and cry, hushed and quiet, cluttered and messy.',
        },
      },
    },
    '2:question-words': {
      say: '"Each sentence on this page is an answer. Some of its words are highlighted. Write the question that asks for those words. Start with a question word: who, what, where, when, or how many."',
      first: 'Do the first two on the board. Read the sentence and point to the highlighted words: "Mia finds four balls." Ask, "Is Mia a person, a thing, a place, or a time?" A person, so the question starts with Who: "Who finds four balls?" Write it with a capital letter and a question mark.',
      stuck: 'Ask what the highlighted words tell: a person (who), a thing (what), a place (where), a time (when), or a number (how many). Then help the child say the question aloud before writing it. For example: "Zoe is in the kitchen" becomes "Where is Zoe?" and "Anna sleeps at three o\'clock" becomes "When does Anna sleep?"',
      byType: {
        'G2-357': {
          say: '"Look at the four pictures at the top of the page. You are going to ask questions about them. Each line already starts with a question word: Who, What, Where, When, Why, How. Finish each question, and end it with a question mark."',
          first: 'Name the four pictures together: a builder, a pear, a house, and a clock. Make up a question for the first line aloud and write it on the board with its question mark: "Who builds the house?" Ask two children for a question that starts with What. Tell the class that any question that fits one of the pictures and starts with the printed word is right, and that nobody has to answer the questions.',
          stuck: 'Point to one picture and ask the child what they would like to know about it. Then help the child say it as a question that starts with the printed word, for example: "Where does the builder work? When does the clock ring? Why is the pear red and yellow? How tall is the house?"',
        },
        'G2-356': {
          first: 'Do the first and the third on the board. Read the first sentence and point to the highlighted word: "Mia finds four balls." Ask, "Is Mia a person, a thing, a place, or a time?" A person, so the question starts with Who: "Who finds four balls?" In the third sentence, "in the kitchen" is highlighted. That is a place, so the question starts with Where: "Where is Zoe?" Write both questions with a capital letter and a question mark.',
          stuck: 'Ask what the highlighted words tell: a person (who), a thing or an animal (what), a place (where), a time (when), or a number (how many). Then help the child say the question aloud before writing it. For your own reference, good questions for the page for everyone are: Who finds four balls? Who eats at two o\'clock? Where is Zoe? When does Anna sleep? How many kiwis does Leo see? What does Emma like? What does Ava draw? Where does Ben play? Another wording that asks for the highlighted words is right, too.',
        },
      },
    },
    '2:time-5-min-quarter': {
      say: '"Every clock on this page shows a quarter hour: something o\'clock, quarter past, half past, or quarter to. Read each clock and circle the time that matches."',
      first: 'Draw a clock on the board. Show where the long hand points for each quarter hour: on the 12 for :00, on the 3 for :15, on the 6 for :30, and on the 9 for :45. Do the first clock on the page together: read the short hand for the hour first, then the long hand for the minutes.',
      stuck: 'Ask, "Which number has the short hand just passed?" That is the hour, even when the short hand is close to the next number. Then have the child count by fives from the 12 to the long hand: 5, 10, 15. For your own reference, on the page for everyone the clocks show 11:15, 1:45, 2:45, and 8:45.',
    },
    '2:shopping-money': {
      say: '"At the top of the page is a shelf with five toys and their prices. Each question tells you what someone buys. Find the prices on the shelf, add them, and write the total."',
      first: 'Read the five prices on the shelf aloud together. Do the first question together: find the two things on the shelf, write their prices in the work space, and add them. Write the total in the box in front of the cent sign.',
      stuck: 'Have the child circle the two things on the shelf that the question shows, then write the two prices one under the other and add the ones first. Coins or drawn dimes and pennies help a child who cannot add the numbers yet.',
      byType: {
        'G2-292': {
          say: '"At the top of the page is a shelf with five fruits and their prices. Each question shows three fruits that someone buys. Find the three prices on the shelf, add them, and write the total."',
          first: 'Read the five prices on the shelf aloud together. Do the first question together: find the three fruits on the shelf and write their three prices in the work space. Add two of the prices first, then add the third. Write the total in the box in front of the cent sign.',
          stuck: 'Have the child circle the three fruits on the shelf that the question shows and write the three prices one under the other. It helps to start with two prices that make an easy number, such as 40 and 10. Drawn dimes and nickels help a child who cannot add the numbers yet.',
        },
        'G2-293': {
          say: '"At the top of the page is a shelf with five toy animals and their prices. Each question tells you what someone buys and shows the coins they pay with. Count the coins. Then figure out how much money they get back. That money is called the change."',
          first: 'Read the five prices on the shelf aloud together. Do the first question together: find the price of the animal Mia buys. Count her coins: two quarters are 50 cents. Ask, "She pays 50 cents, and the toy costs less than that. How much does she get back?" Count up from the price to 50, write the subtraction in the work space, and write the change in the box. The printed directions say "work out the change"; tell the children that means figure it out. The page has only two questions: a child who finishes picks another animal from the shelf and figures out the change from 50 cents on the back of the page.',
          stuck: 'Have the child write the price and count up to 50 by tens or fives, keeping track on fingers. Drawn dimes help: draw 50 cents as five dimes and cross out the price. For your own reference, on the page for everyone Mia buys the fox for 40 cents and gets 10 cents back, and Leo buys the giraffe for 30 cents and gets 20 cents back. For the other animals, the change from 50 cents is 30 cents (the 20-cent animal), 15 cents (the 35-cent animal), and 5 cents (the 45-cent animal).',
        },
      },
    },
    '2:grid-coordinates': {
      say: '"This grid hides a picture. Every square has a name made of a letter and a number, like B2. The lists at the bottom tell you which squares to color and in which color."',
      first: 'Make sure every child has the crayons the lists name. Show how to find a square: put one finger on the letter at the top and one finger on the number at the side, and move them until they meet. Find the first square of the first list together and color it. Tell the children to cross out each code once its square is colored.',
      stuck: 'Have the child say the code aloud, letter first, then find the letter\'s column and slide a finger down to the number\'s row. A square in the wrong place shows in the picture; the child can check its code again.',
      byType: {
        'G2-308': {
          say: '"This grid already has a picture colored in. Every square has a name made of a letter and a number, like B2. Write the name of each colored square in the list for its color."',
          first: 'Show how to name a square: go straight up from the square to its letter and straight to the side to its number, and write the letter first. Do the first colored square together and write its code in the first box of the list. Tell the children to put a small dot on each square once its code is written.',
          stuck: 'Have the child put one finger on the square and move it straight up to read the letter, then straight to the left to read the number. The order of the codes in the list does not matter, as long as every colored square is there once.',
        },
      },
    },
    '2:add-sub-within-100-practice': {
      say: '"This is a number wall. Each brick is the sum of the two bricks right under it. Start at the bottom and build every wall to the top. The numbers get bigger than twenty, so you may add on paper."',
      first: 'Draw the first wall on the board. Point to two bricks that sit side by side in the bottom row and to the brick that rests on both of them. Add them and write the sum in that brick. Fill in the second row together, then let the children finish the wall.',
      stuck: 'Put two fingers on the two bricks under the empty brick and have the child add those two numbers on scrap paper, tens and ones. A wrong brick lower down makes every brick above it wrong, so check the rows from the bottom up.',
      byType: {
        'G2-393': {
          say: '"The truck has to bring a number to the crane. The truck starts with 46, and the crane needs 54. There are several roads. Every sign on a road changes the number: plus 1, minus 10, and so on. Find the road that ends on the crane\'s number."',
          first: 'Hold up the page and show the truck with its number, the crane with its number, and one sign. Follow one road for two signs together and write the new number in the box of each sign: "46 plus 1 is 47." Tell the children to choose one road, write the new number in every box along it, and try another road if the last number is not 54.',
          stuck: 'Have the child write the new number in each sign\'s box before going on to the next sign. If a road ends on the wrong number, the child checks each step on that road first and then tries another road. Scrap paper is fine for the steps.',
        },
        'G2-313': {
          stuck: 'Put two fingers on the two bricks under the empty brick and have the child add those two numbers on scrap paper, tens and ones. A wrong brick lower down makes every brick above it wrong, so check the rows from the bottom up. For your own reference, on the page for everyone the top bricks of the four walls are 60, 70, 46, and 49.',
        },
      },
    },
    '2:compound-words': {
      say: '"A compound word is made of two smaller words, like sun and flower in sunflower. Each word on this page is printed letter by letter. Draw one line where the second word starts."',
      first: 'Write "bluebell" on the board with spaces between the letters. Ask, "Which two words do you hear?" Draw a line between blue and bell. Have the children say both words. They do the other words the same way.',
      stuck: 'Have the child say the whole word and clap once for each of the two small words, then cover the end of the word with a finger and move it until a real word shows. For your own reference, on the page for everyone the words are blue-bell, book-shelf, sand-castle, scare-crow, rain-bow, butter-cup, key-board, and earth-worm.',
    },
    '2:verb-forms': {
      say: '"Each sentence has a gap, and the verb for the gap is in the little chip at the end. Write the verb in the form that fits the sentence. Sometimes it needs an s. Sometimes it happened yesterday and needs a different ending."',
      first: 'Do the first two on the board. Read the sentence with the verb as it is printed: "Lily read in the garden today." Ask, "Does that sound right?" Fix it: "Lily reads in the garden today." Tell the children to look for words like today, every day, and yesterday.',
      stuck: 'Have the child read the sentence aloud with the verb and listen. If the sentence has "yesterday," the verb tells about the past (jumped). With one person and "today" or "every day," the verb gets an s (runs, sings).',
      byType: {
        'G2-317': {
          say: '"A verb changes its form. For something he or she does today, most verbs get an s: jumps. For something that happened yesterday, the verb changes again: jumped. Fill in the missing forms in the chart. Then finish the three sentences under it."',
          first: 'Look at the chart together: the verb, its form for he or she today, and its form for yesterday. Do the row for "dance" together by saying two sentences: "Today she dances. Yesterday she danced." Write "dances" in the empty box. Tell the children that some verbs do not add -ed for yesterday; they say the sentence aloud and listen for what sounds right.',
          stuck: 'Have the child say two sentences aloud for the verb: "Today he ___. Yesterday he ___." For your own reference, on the page for everyone the forms are dances and danced, reads and read, jumps and jumped, wanders and wandered, runs and ran, sings and sang; the three sentences take danced, sang, and reads.',
        },
        'G2-335': {
          first: 'Do two on the board. Read the third sentence with the verb as it is printed: "On Mondays Anna sing at the club." Ask, "Does that sound right?" Fix it: "On Mondays Anna sings at the club." Then do the fifth sentence the same way: "Tom jump at the pool yesterday" becomes "Tom jumped at the pool yesterday." Tell the children to look for words like today, every day, and yesterday.',
          stuck: 'Have the child read the sentence aloud with the verb and listen. If the sentence has "yesterday," the verb tells about the past (jumped). With one person and "today" or "every day," the verb gets an s (runs, sings). For your own reference, on the page for everyone the answers are reads, runs, sings, wanders, jumped, and dances. In the first, second, and last sentences a form for the past (read, ran, danced) also makes a correct sentence; count it as right.',
        },
      },
    },
    '2:measure-with-ruler': {
      say: '"Each shape sits on a ruler and starts at 0. Read the ruler at the end of the shape and write how many units long the shape is."',
      first: 'Do the first one together. Put a finger on the 0, where the shape starts, and slide it to the place where the shape ends. Read the number there and write it in the box. Say the answer with the unit: "It is 3 units long."',
      stuck: 'Have the child put a finger on the right end of the shape and move it straight down to the ruler. The number under the finger is the length. A child who counts the marks gets one too many; count the spaces between the marks instead.',
    },
    '2:bar-graphs': {
      say: '"At the top is a tally chart: it shows how many of each thing were counted. Read each tally. Then color a bar in the graph for each one, as tall as its number."',
      first: 'Draw a bundle of tally marks on the board and remind the class that a bundle with a mark across is five. Read the first tally together and write its number next to it. Find that picture under the graph and color its bar from the bottom up to the number.',
      stuck: 'Have the child write the number next to each tally first: five for each bundle, then the single marks. For the bar, the child puts a finger on that number at the side of the graph and colors up to its line.',
    },
    '2:skip-count-3-4': {
      say: '"On this page we count by threes: 3, 6, 9, 12. Some numbers are missing. Count by threes and write each missing number. The rows do not start at 3."',
      first: 'Count by threes to 30 aloud together. Do the first row on the board: read the numbers that are there and ask, "How far is it from one number to the next?" Add three to the last number before the gap and write the answer in.',
      stuck: 'Have the child add three to the number before the gap with fingers: say the number, then count three more. To check, the next printed number must be three more than the number the child wrote. For your own reference, on the page for everyone the missing numbers are 48, 51, 54 in the first row; 21, 24, 27 in the second; 39, 42, 48 in the third; 36, 42, 45 in the fourth; and 33, 39, 45 in the fifth.',
    },
    '2:read-and-answer': {
      say: '"Now it is time to read. Read the story carefully, all the way to the end. Then read each question and circle the best answer. The answers are in the story."',
      first: 'Have the children read the story quietly to themselves, then read it aloud once to the class. Do the first question together: read it, find the sentence in the story that answers it, and circle the answer. The children do the other questions on their own.',
      stuck: 'Read the question to the child and ask them to put a finger on the sentence in the story that tells the answer. If the child cannot read the story alone, read it with them. For your own reference, on the page for everyone the answers are her grandpa, a rabbit, and in the evening.',
      byType: {
        'G2-269': {
          stuck: 'Read the question to the child and ask them to put a finger on the sentence in the story that tells the answer. If the child cannot read the story alone, read it with them. For your own reference, on the page for everyone the answers are yellow, in the park, and the wind is strong.',
        },
        'G2-270': {
          stuck: 'Read the question to the child and ask them to put a finger on the sentence in the story that tells the answer. The answer to the last question is in the last sentence of the story. For your own reference, on the page for everyone the answers are his boot, Rex the dog, and play in the puddles.',
        },
        'G2-271': {
          stuck: 'Read the question to the child and ask them to put a finger on the sentence in the story that tells the answer. For your own reference, on the page for everyone the answers are three, waters the seeds, and tomatoes.',
        },
        'G2-272': {
          first: 'Have the children read the story quietly to themselves, then read it aloud once to the class. The story and the first question say "break"; tell the class that this means recess. Do the first question together: read it, find the sentence in the story that answers it, and circle the answer. The children do the other questions on their own.',
          stuck: 'Read the question to the child and ask them to put a finger on the sentence in the story that tells the answer. The last question asks how Sam feels; the last sentence of the story tells what he thinks. For your own reference, on the page for everyone the answers are it is raining, a tower, and happy about the day.',
        },
        'G2-273': {
          stuck: 'Read the question to the child and ask them to put a finger on the sentence in the story that tells the answer. For your own reference, on the page for everyone the answers are Grandpa\'s, so Grandpa cannot hear, and he claps the loudest.',
        },
        'G2-270+': {
          say: '"Now it is time to read. Read the story carefully, all the way to the end. You will not find the answers to questions 1 and 2 word for word in the story: look for clues and think about what the story tells you. Circle the best answer to questions 1 and 2. Then write your answer to question 3 on the lines, in a whole sentence."',
          first: 'Have the children read the story quietly to themselves, then read it aloud once to the class. Do the first question together: read it, and ask which sentence in the story helps us decide. (The sentences are numbered.) Circle the answer. The children do the second question and the written answer on their own.',
          stuck: 'Read the question to the child and ask, "Which sentence in the story gives you a clue?" For the written answer, have the child say the answer aloud first and start it with part of the question: "Ben needs his boot because …" For your own reference, on the page for everyone the answers are happy and rainy; for question 3, any answer that says Ben wants to go out and play in the puddles is right.',
        },
        'G2-254+': {
          say: '"Now it is time to read. Read the story carefully, all the way to the end. You will not find the answers to questions 1 and 2 word for word in the story: look for clues and think about what the story tells you. Circle the best answer to questions 1 and 2. Then write your answer to question 3 on the lines, in a whole sentence."',
          first: 'Have the children read the story quietly to themselves, then read it aloud once to the class. Do the first question together: read it, and ask which sentences in the story help us decide. (The sentences are numbered.) Circle the answer. The children do the second question and the written answer on their own.',
          stuck: 'Read the question to the child and ask, "Which sentence in the story gives you a clue?" For the written answer, have the child say the answer aloud first and start it with part of the question: "Emma checks the garden because …" For your own reference, on the page for everyone the answers are "She takes good care of the plants" and "eat them"; for question 3, any answer that says a rabbit ate two carrots is right.',
        },
        'G2-269+': {
          say: '"Now it is time to read. Read the story carefully, all the way to the end. You will not find the answers to questions 1 and 2 word for word in the story: look for clues and think about what the story tells you. Circle the best answer to questions 1 and 2. Then write your answer to question 3 on the lines, in a whole sentence. When you finish, turn the page over and write three sentences that tell what happens next in the story."',
          first: 'Have the children read the story quietly to themselves, then read it aloud once to the class. Do the first question together: read it, and ask which sentence in the story helps us decide. (The sentences are numbered.) Circle the answer. The children do the second question and the written answer on their own.',
          stuck: 'Read the question to the child and ask, "Which sentence in the story gives you a clue?" For the written answer, have the child find the sentence about the boy and say the answer aloud before writing it. For your own reference, on the page for everyone the answers are "happy and proud" and "a windy day"; for question 3, the boy claps and says the kite looks like a little dragon.',
        },
        'G2-271+': {
          say: '"Now it is time to read. Read the story carefully, all the way to the end. You will not find the answers to questions 1 and 2 word for word in the story: look for clues and think about what the story tells you. Circle the best answer to questions 1 and 2. Then write your answer to question 3 on the lines, in a whole sentence. When you finish, turn the page over and write three sentences that tell what happens next in the story."',
          first: 'Have the children read the story quietly to themselves, then read it aloud once to the class. Do the first question together: read it, and ask which sentences in the story help us decide. (The sentences are numbered.) Circle the answer. The children do the second question and the written answer on their own.',
          stuck: 'Read the question to the child and ask, "Which sentence in the story gives you a clue?" For the written answer, have the child say the answer aloud first and start it with part of the question: "Owen takes a photo because …" For your own reference, on the page for everyone the answers are "the plants grow very tall" and "proud"; for question 3, Owen wants to show the photo to his class.',
        },
        'G2-272+': {
          say: '"Now it is time to read. Read the story carefully, all the way to the end. You will not find the answers to questions 1 and 2 word for word in the story: look for clues and think about what the story tells you. Circle the best answer to questions 1 and 2. Then write your answer to question 3 on the lines, in a whole sentence. When you finish, turn the page over and write three sentences that tell what happens next in the story."',
          first: 'Have the children read the story quietly to themselves, then read it aloud once to the class. The story says the children cannot go out for "break" and that the teacher opens the game "cupboard"; tell the class that this means recess and a cabinet. Do the first question together: read it, and ask which sentences in the story help us decide. Circle the answer. The children do the second question and the written answer on their own.',
          stuck: 'Read the question to the child and ask, "Which sentence in the story gives you a clue?" For the written answer, have the child say the answer aloud first and start it with part of the question: "The teacher opens the game cupboard because …" For your own reference, on the page for everyone the answers are "they are having fun" and "that they were no fun"; for question 3, any answer that says the children cannot go outside because of the rain is right.',
        },
        'G2-273+': {
          say: '"Now it is time to read. Read the story carefully, all the way to the end. You will not find the answers to questions 1 and 2 word for word in the story: look for clues and think about what the story tells you. Circle the best answer to questions 1 and 2. Then write your answer to question 3 on the lines, in a whole sentence. When you finish, turn the page over and write three sentences that tell what happens next in the story."',
          first: 'Have the children read the story quietly to themselves, then read it aloud once to the class. Do the first question together: read it, and ask which sentence in the story helps us decide. (The sentences are numbered.) Circle the answer. The children do the second question and the written answer on their own.',
          stuck: 'Read the question to the child and ask, "Which sentence in the story gives you a clue?" For the written answer, have the child say the answer aloud first and start it with part of the question: "Ella wants to surprise Grandpa because …" For your own reference, on the page for everyone the answers are "a little nervous" and "Ella practiced all week"; for question 3, any answer that says it is Grandpa\'s birthday, or that he is turning seventy, is right.',
        },
      },
    },
    '2:root-words': {
      say: '"The three words on each card are a word family: they are all built from one small word, the root word. Circle the part that all three words share. Then write the root word in the empty stone."',
      first: 'Look at the first card together; it is already done. Read the three words and the root word: cheerful, cheerfully, cheerily, cheer. Do the second card on the board: read the three words, circle the letters they share, and write the root word. Read the words of the other cards aloud once.',
      stuck: 'Have the child cover the beginnings and the endings of the words with a finger until a small real word shows. The root word must be a word by itself. For your own reference, on the page for everyone the root words are cheer, use, play, act, power, joy, care, sleep, and rest.',
      byType: {
        'G2-359': {
          say: '"The ten words at the top come from two word families. Some are built from the root word play, and some are built from the root word help. Read each word and write it on a line of the wall that stands on its root word."',
          first: 'Read the ten words aloud together. Do two words together: "replay." Ask, "Which small word is inside it, play or help?" Write replay on a line above play. Then do "helper" the same way. Tell the children to cross out each word at the top once it is written on a wall.',
          stuck: 'Have the child look for the letters of play or of help inside the word and underline them. For your own reference, on the page for everyone the play wall gets replay, playfully, playtime, player, and playful; the help wall gets helplessly, helper, helpfully, helpful, and helpless.',
        },
        'G2-359+': {
          say: '"The twelve words at the top come from three word families. Each family is built from one root word: joy, thought, or worth. Read each word, find the root word inside it, and write the word on a line of the wall that stands on its root word."',
          first: 'Read the twelve words aloud together. Do two words together: "enjoyment." Ask, "Which root word is inside it?" Write it on a line above joy. Then do "afterthought" the same way. Tell the children to cross out each word at the top once it is written on a wall; each wall gets four words.',
          stuck: 'Have the child look for the letters of joy, thought, or worth inside the word and underline them. For your own reference, on the page for everyone the joy wall gets joyless, enjoyment, joyous, and enjoyable; the thought wall gets thoughtless, thoughtful, afterthought, and thoughtfully; the worth wall gets worthwhile, worthlessness, worthlessly, and worthy.',
        },
      },
    },
    '2:describe-a-picture': {
      say: '"Look at the picture. You are going to write three sentences about it. The beginning of each sentence is already on the line. The word bank under the picture gives you the names of the animals."',
      first: 'Look at the picture together and read the word bank aloud. Say a sentence together for the first starter: "I can see a fox and a panda." Write it on the board. Tell the children to finish each sentence with their own words and to end it with a period.',
      stuck: 'Ask the child a question about the picture: "Which animals can you see? What is the panda doing? Which one do you like, and why?" Have the child say the sentence aloud before writing it. A child who finishes early writes one more sentence on the last lines.',
      byType: {
        'G2-300': {
          say: '"Look at the picture of the fruit. You are going to write your own sentences about it. There are no sentence starters this time. The word bank under the picture gives you the names of the fruits."',
          first: 'Look at the picture together and read the word bank aloud; some of the names, such as persimmon and nectarine, may be new. Collect ideas aloud: Which fruit is the biggest in the picture? What colors can you see? Which one would you like to taste? Write one sentence on the board as an example: "The lime is bigger than the pineapple in this picture." Tell the children to write at least four sentences and to end each one with a period.',
          stuck: 'Ask the child a question about the picture: "Which fruit would you pick? What color is it? What could you make with it?" Have the child say the sentence aloud before writing it. The names of the fruits are copied from the word bank. A child who finishes early turns the sentences into a short story on the back of the page.',
        },
      },
    },
    '2:equal-groups-times': {
      say: '"The animals on this page stand in equal groups: every group has the same number. Count the groups. Count how many are in one group. Then finish the multiplication and write how many there are in all."',
      first: 'Do the first one on the board. Ask, "How many groups? How many birds in each group?" Read the multiplication aloud as "2 groups of 2." If the times sign is new to the class, tell the children that it means "groups of." Count all the birds and write 4 in the box. Show that 2 + 2 gives the same answer.',
      stuck: 'Have the child touch each group and say how many are in it, then add the groups: for 3 groups of 3, "3 and 3 and 3." Counting every animal one by one is fine as a check. For your own reference, on the page for everyone the answers are 4, 9, 8, and 4.',
      byType: {
        'G2-209': {
          say: '"The animals on this page stand in equal groups: every ring holds the same number. Count how many are in one ring. Then finish the addition and write how many there are in all."',
          first: 'Do the first one on the board. Ask, "How many rings? How many animals in each ring?" Read the addition aloud: "4 plus 4." Count all the animals to check and write 8 in the box. Say it one more way: "2 groups of 4 make 8."',
          stuck: 'Have the child touch each ring and say how many are in it, then add the numbers one after another: for four rings of 2, "2, 4, 6, 8." Counting every animal one by one is fine as a check. For your own reference, on the page for everyone the answers are 8, 8, 8, and 6.',
        },
      },
    },
    '2:arrays': {
      say: '"An array is a set of things in rows, with the same number in every row. Each problem shows a multiplication and three arrays. Circle the array that matches the multiplication."',
      first: 'Do the first one together. Read "3 × 4" aloud as "3 rows of 4." On this page the times sign means "rows of." Look at each of the three arrays: count its rows, then count how many are in one row. Circle the array with 3 rows and 4 in each row. Count all the things in it to check: there are 12.',
      stuck: 'Have the child run a finger along each row of an array and count the rows first, then count the things in the top row. On this page the first number is the number of rows and the second number is how many are in each row.',
    },
    '2:symmetry-line': {
      say: '"A mirror line cuts a picture into two halves that match exactly, like a picture and its reflection in a mirror. Look at the dashed line on each animal. If both sides match, circle the check. If they do not match, circle the cross."',
      first: 'Do the first two together. Ask about the first animal, "If we folded the picture on the dashed line, would one side land exactly on the other?" Have a child point to parts that match on both sides. For the second animal, ask what is on one side and missing on the other.',
      stuck: 'Have the child cover one side of the picture with a hand, look at the other side, and then switch. Ask, "Is there a wing here? Is there one on the other side, too?" For your own reference, on the page for everyone the bat and the sheep have a mirror line; the swan and the seagull do not.',
    },
    '2:symmetry-complete': {
      say: '"Each picture on this page is only half done. The dashed line is a mirror. Color squares on the empty side so that both sides match exactly."',
      first: 'Do the first row of the first picture together. Count how many squares are colored in that row, starting at the dashed line and counting away from it. Color the same number of squares on the other side, starting at the line again. Tell the children to work row by row from the top.',
      stuck: 'Have the child put a finger on the dashed line in one row and count the colored squares away from the line, then count the same number on the other side. A square next to the line has its partner next to the line; a square far from the line has its partner just as far away.',
      byType: {
        'G2-268': {
          say: '"Each picture on this page is only half done, and it lies on its side. The dashed line is a mirror. Color squares below the line so that the bottom half matches the top half exactly."',
          first: 'Do the first column of the first picture together. Count how many squares are colored in that column, starting at the dashed line and counting up. Color the same number of squares below the line, starting at the line again and counting down. Tell the children to work column by column from the left.',
          stuck: 'Have the child put a finger on the dashed line in one column and count the colored squares going up, then count the same number going down. A square that touches the line has its partner touching the line; a square far from the line has its partner just as far away.',
        },
      },
    },
    '2:odd-even': {
      say: '"Even numbers can be split into two equal groups. Odd numbers always have one left over. You only need to look at the last digit. If a number ends in 1, 3, 5, 7, or 9, it is odd. Circle every odd number."',
      first: 'Write 1, 3, 5, 7, 9 on the board and leave it there. Do the first row together: for each number, point to the last digit and ask, "Is it on our list?" Circle the number if it is. Show with 12 that a big first digit does not matter; only the last digit counts.',
      stuck: 'Have the child cover every digit but the last one with a finger and check it against the list on the board. For your own reference, on the page for everyone the odd numbers are 63, 47, 93, 21, 37, 73, 87, and 43.',
      byType: {
        'G2-352': {
          say: '"Read the rule at the top of the page: even numbers end in 0, 2, 4, 6, or 8, and odd numbers end in 1, 3, 5, 7, or 9. For each number, look only at the ones box. Then make a check mark in the circle under odd or under even."',
          first: 'Point to the letters T and O above the boxes: tens and ones. Do the first two numbers together: for 86, cover the tens box, read the ones box, and ask, "Is 6 on the even list or on the odd list?" Make the check mark under even. The printed directions say "tick the circle"; tell the children that means a check mark.',
          stuck: 'Have the child cover the tens box with a finger and check the ones digit against the rule at the top. For your own reference, on the page for everyone the odd numbers are 65, 37, 55, 21, 53, and 99; the even numbers are 86, 42, 32, 14, 58, and 70.',
        },
        'G2-218': {
          first: 'Write 1, 3, 5, 7, 9 on the board and leave it there. Do the first row together: for each number, point to the last digit and ask, "Is it on our list?" Circle the number if it is. Show with 12 that the first digit does not matter: the 1 is on our list, but 12 ends in 2, so 12 is not odd. Only the last digit counts.',
        },
      },
    },
    '2:synonyms~doing-stage': {
      say: '"Writers do not use the word said over and over. They pick a word that tells how something was said. Read each sentence. Choose the word from the bubble that fits best, and write it in the box."',
      first: 'Read the six words in the bubble aloud together, and have the children say "Wait for me!" in a shout and then in a whisper. Do the first sentence together: try two or three of the words in the gap and ask which one fits someone running after a bus. Tell the children to cross out each word once they have used it; every word is used one time.',
      stuck: 'Read the sentence to the child and ask how the person would say it: loudly, quietly, as a question? Then read the words that are left in the bubble. For your own reference, on the page for everyone the answers are shouted, whispered, asked, promised, explained, and answered.',
    },
    '2:retell-with-starters': {
      say: '"The four pictures tell a story from beginning to end. Write what happens in each picture on its lines. The first word is already there: First, Next, Then, Finally. The word bank at the top gives you words you may need."',
      first: 'Look at the four pictures together and have four children each tell what happens in one. Read the word bank aloud. Say a sentence for the first picture together and write it on the board: "First, the boy gets his paint and his brush." Tell the children to write one or two sentences for each picture and to end each one with a period.',
      stuck: 'Point to one picture and ask, "What is the boy doing here? What is different from the picture before?" Have the child say the sentence aloud, starting with the printed word, before writing it. A word that is spelled by its sounds is fine.',
      byType: {
        'G2-378+': {
          say: '"The four pictures tell a story from beginning to end. Write what happens in each picture on its lines. Use words that show the order, such as first, next, then, and finally. The box at the top gives you words you may need."',
          first: 'Look at the four pictures together and ask four volunteers to tell what happens in one picture each. Read the words in the box aloud. This page has no sentence starters, even though its title says "with Starters"; the order words do that job. Write First, Next, Then, Finally on the board. Say a sentence for the first picture together and write it on the board: "First, a whole banana stands on a plate." Tell the children to write two sentences for each picture and to end each one with a period. A child who finishes early writes one more sentence on the back of the page: who ate the banana?',
          stuck: 'Point to one picture and ask, "What is different from the picture before?" Have the child say the sentence aloud, starting with one of the order words on the board, before writing it. A word that is spelled by its sounds is fine.',
        },
      },
    },
    '2:equal-shares-shapes': {
      say: '"Each shape on this page is cut into two equal parts. Each part is one half. Color one half of each shape."',
      first: 'Draw a circle on the board with a line down the middle. Ask, "How many parts? Are they the same size?" Color one part and say, "I colored one half." Point to the fraction on the page and read it: "one half: 1 of 2 equal parts."',
      stuck: 'Have the child count the parts of the shape and then color exactly one of them, all the way to its edges. It does not matter which of the two parts is colored. A child who colors the whole shape counts the parts again with you.',
      byType: {
        'G2-232': {
          say: '"Equal parts are parts that are exactly the same size. Look at each shape. If it is cut into equal parts, circle it. If some parts are bigger than others, leave it alone."',
          first: 'Draw two bars on the board: one cut into three parts of the same size, and one cut into a big part and two small parts. Ask, "In which bar would everyone get a fair share?" Circle that one. Do the first row of the page together the same way.',
          stuck: 'Have the child put a finger on one part and ask, "Is every other part just as big as this one?" If one part is clearly bigger or smaller, the shape is not circled. For your own reference, on the page for everyone the shapes with equal parts are the third shape in row 1, the first and the third in row 2, the second and the third in row 3, and the third in row 4.',
        },
      },
    },
    '2:share-and-group': {
      say: '"Sharing fairly means everyone gets the same number. Each problem has a pile of animals and some bins. Share the pile equally into the bins. Then write how many each bin gets."',
      first: 'Do the first one on the board. Count the pile together: 12. Count the bins: 3. Share by drawing: cross out one animal and draw one dot in the first bin, then one for the second bin, then one for the third, and go around again until the pile is gone. Count the dots in one bin and write the answer after "12 ÷ 3 =". Read it as "12 shared among 3 is 4." If the division sign is new to the class, tell the children that it means "shared equally among."',
      stuck: 'Have the child cross out each animal as its dot is drawn, and give every bin one dot before any bin gets a second one. At the end every bin must have the same number of dots. For your own reference, on the page for everyone the answers are 4, 3, 5, and 4.',
    },
    '2:prefixes': {
      say: '"A prefix is a small part at the front of a word that changes its meaning. The key at the top shows three prefixes: re means again, pre means before, and mis means wrongly. Read what each new word means. Then write the right prefix in the empty piece in front of the word."',
      first: 'Read the key at the top aloud together. Do the first one together: "to fill an empty cup back up." Ask, "Is that again, before, or wrongly?" It is again, so the prefix is re. Write it in the empty piece and have the class read the new word aloud: refill.',
      stuck: 'Read the meaning to the child and ask for the clue: "one more time" or "back" points to re, "early," "first," or "ahead" points to pre, and "not right" or "lose" points to mis. Then the child says the new word aloud. For your own reference, on the page for everyone the words are refill, preview, misplace, prepay, reread, miscount, preheat, and misspell.',
    },
    '2:cloze-context': {
      say: '"This page has three short stories with missing words. The three little pictures above each story show the words that are missing. Find each word in the word bank at the top and write it in the box where it makes sense."',
      first: 'Read the word bank aloud together. Do the first story together: name its three pictures. Read the first sentence and say "blank" at the gap: "The blank flies over the clouds." Ask which of the three pictures fits, and write the word in the box. Tell the children to cross out each word in the bank once they have used it, and to read each story again when its three boxes are full.',
      stuck: 'Have the child name the three pictures of the story, then read each sentence aloud and try each of the three words in the gap. The spelling is copied from the word bank. For your own reference, on the page for everyone the words are airplane, rocket, and kite in the first story; duck, turtle, and dog in the second; owl, fox, and rabbit in the third.',
    },
    '2:plant-parts': {
      say: '"This is a science page about the parts of a plant. The plant in the picture has five tags with numbers. Next to it are five sentences. Each sentence tells what one part of the plant does. Find that part on the plant and write the number of its tag in the box."',
      first: 'Point to each tag on the plant and name the parts together: the flower, a leaf, the stem, the seeds in their pod, and the roots. Do one sentence together: "takes in water from the soil." Ask, "Which part of the plant is down in the soil?" The roots; write the number of their tag in the box.',
      stuck: 'Read the sentence to the child and ask a question about it: "Which part is flat and green and faces the sun? Which part do bees visit? Which part is like a straw that holds everything up?" For your own reference, on the page for everyone the answers are, from top to bottom, 2 (seeds), 4 (leaf), 5 (roots), 1 (stem), and 3 (flower).',
    },
    '2:mystery-animal': {
      say: '"Now it is time to read. Each card has five clues about a mystery animal. Read all five clues. Then find the animal in the picture bank at the top, write its name on the line, and draw it in the box."',
      first: 'Name the six animals in the picture bank together. Read the first card aloud. After each clue ask, "Which animals can it still be?" and let the children rule animals out: it has fur, so it is not the lizard, the ant, or the eagle; it cannot fly, so it is not the bat. Tell the children that one clue is never enough; all five clues have to fit.',
      stuck: 'Have the child read one clue at a time and put a finger on every animal in the bank that fits it, lifting a finger each time a clue rules an animal out. A quick sketch in the box is enough. For your own reference, on the page for everyone the animals are the bear (the wolf does not eat plants), the ant, and the eagle.',
    },
    '2:compare-two-animals': {
      say: '"Here are two fact files, one for a ladybug and one for an eagle. Each file gives four facts about its animal. Compare the facts one by one and circle same or different. Then write two things that are the same and two things that are different."',
      first: 'Read both fact files aloud together. Do the first fact together: "Animal group: the ladybug is an insect, and the eagle is a bird. Same or different?" Circle different. Write a sentence for it on the board: "Different: A ladybug is an insect, but an eagle is a bird." Tell the children to write whole sentences on the lines. The fact files use short words: "air" means that the animal flies, and "meat" means that it eats other animals (a ladybug eats tiny insects). If a child questions a fact, say that the job is to compare what the two files say.',
      stuck: 'Have the child put one finger on a fact in the ladybug\'s file and one finger on the same line in the eagle\'s file and read both aloud. For the sentences, give the child a frame: "Both animals ___." and "The ladybug ___, but the eagle ___." For your own reference, on the page for everyone the animal group and the body covering are different; where the animals live and what they eat are the same.',
    },
    '2:habitats-adaptations': {
      say: '"A habitat is the place where an animal or a plant lives. The picture on this page shows the ocean. Draw three animals that live in the ocean. Write their names on the lines, write the name of one plant that grows there, and circle the word that fits the ocean: wet or dry."',
      first: 'Collect ocean animals aloud and write their names on the board so that the children can copy the spelling: fish, shark, whale, crab, octopus, jellyfish, sea turtle. Ask for a plant that grows in the ocean: seaweed or kelp. Each child chooses three animals, draws them in the picture, and writes their names. Then every child writes two or three sentences about one of the animals on the back of the page.',
      stuck: 'Ask the child, "Which animals have you seen at an aquarium, in a book, or in a movie about the sea?" Any animal that lives in the ocean is right, and the drawing does not have to be neat. Point to the board for the spelling.',
      byType: {
        'G2-380': {
          say: '"This is a science page about how animals are built for the way they live. At the top are seven animals, each with a letter. Each sentence tells about one of them. Read the sentence, decide which animal it is, and write that animal\'s letter in the box. One animal is left over."',
          first: 'Name the seven animals together and say their letters. Read the first sentence aloud together: "Its wings are flippers: it swims fast but cannot fly." Ask, "Which animal has wings and cannot fly?" Write its letter in the box. Tell the children to cross out each animal once they have used it.',
          stuck: 'Read the sentence to the child and ask for the body part it names: teeth, a trunk, a beak, a hump. Then the child looks for that body part in the pictures. For your own reference, on the page for everyone the letters are, from top to bottom, G (penguin), B (beaver), A (elephant), F (toucan), E (woodpecker), and C (camel); the monkey is left over.',
        },
      },
    },
    '2:family-relationships': {
      say: '"Now it is time to read and think. Each sentence is a riddle about Tom\'s family. Read the riddle and work it out step by step. Then write the right family word from the box on the line. You will use each word more than one time."',
      first: 'Read the four words in the box aloud together. Do the first riddle on the board in two steps, drawing a stick person for each step: "Tom\'s dad\'s mom. Start with Tom. Step one: Tom\'s dad. Step two: his dad\'s mom. What does Tom call his dad\'s mom?" Write grandma. Keep every example about Tom\'s family, not about the children\'s own families. Tell the children that some families use other names, such as Nana or Abuela; on this page they use the words in the box.',
      stuck: 'Have the child cover the end of the riddle and say who the first two words are ("Tom\'s mom"), then add the last word ("her brother"). A quick sketch of three stick people helps. For your own reference, on the page for everyone the answers are grandma, uncle, grandma, aunt, grandpa, aunt, grandpa, and uncle.',
    },
  },
};
