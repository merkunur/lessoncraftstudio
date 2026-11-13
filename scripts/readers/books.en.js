'use strict';
/**
 * The English readers (Daily Teaching System, Part 8): the 12 mini-books of the pilot (8.1).
 *
 * Two series:
 *   first   decodable mini-books: every word is decodable at the book's SET (scope.en.js) or a heart word taught by
 *           then. The text pages carry NO picture: the child reads the sentence and draws it, so no picture can give a
 *           word away, and the drawing shows the teacher whether the sentence was understood. From set 5 on a page
 *           has two sentences.
 *   theme   picture readers (about guided reading levels A to C): one clear library picture a page. The adult NAMES
 *           THE PICTURES with the child before reading (the child does not guess a word from a picture); the rest is
 *           the level's sight words and words decodable by then. `newWords` (three at most) are read together first.
 *
 * A book is one sheet folded twice: a cover and three pages ("mini-book"; a classroom book of seven pages would need
 * two sheets, so each set and level gets several mini-books). " | " in a page marks the line break on the printed
 * page. `talk` = questions for the adult after reading; `note` = the teacher's line. Written in American English;
 * never translated (another language gets its own books, because its decodable words differ).
 * Checked by `node scripts/readers/gate.js`: a book with a word its set has not taught does not build.
 * Read by one early-reading reviewer with the printed pages on 2026-11-13; her findings are worked in.
 */
const pic = (theme, noun, ...words) => ({ theme, noun, words });
module.exports = [
  // ── decodable mini-books ──
  { id: 'dad-and-sam', series: 'first', stage: 2, title: 'Dad and Sam',
    pages: ['Sam is mad.', 'Dad sits | and pats Sam.', 'Sam naps. | Dad naps.'],
    talk: ['How does Sam feel on the first page?', 'What does Dad do?', 'What happens at the end?'],
    note: 'New in this book: i, n, d and the heart word "is". In "sits", "pats" and "naps" the last s is an ending: have the child read "sit", "pat", "nap" first, then add the s. The a in "Sam" and "and" sounds a little different from the a in "pat": say the word naturally.' },
  { id: 'kit-and-the-dog', series: 'first', stage: 3, title: 'Kit and the Dog',
    pages: ['Kit the cat | sat on a mat.', 'A dog got | on the mat.', 'Kit hid in a pot!'],
    talk: ['Where is Kit at the start?', 'Why does Kit hide?', 'Where would you hide?'],
    note: 'New in this book: o, c, k, g, h. "Kit" and "cat" start with the same sound and two different letters: point to both.' },
  { id: 'the-red-bug', series: 'first', stage: 5, title: 'The Red Bug',
    pages: ['A red bug | sat on a log. | It had a nap.', 'Ben sat on the log. | The bug ran | up his leg!', 'Ben did not get mad. | Ben let the bug go.'],
    talk: ['Where is the bug first?', 'Whose leg is it?', 'Was Ben kind to the bug? How do you know?'],
    note: 'New in this book: e, and s that says /z/ in "his". "log" and "leg" differ only in the middle sound: have the child read them side by side and say which sound changed.' },
  { id: 'fox-on-a-box', series: 'first', stage: 7, title: 'Fox on a Box',
    pages: ['A fox sat | on a big box. | It was fun.', '"Quack!" | said the duck. | The duck was | in the box!', 'The fox fell | off the box. | The duck had the box!'],
    talk: ['Who is on the box?', 'Where is the duck?', 'Why does the fox fall?'],
    note: 'New in this book: ck, ll, ff and the heart word "said". In "quack", q and u work together to say /k/ /w/, and ck says one sound, /k/. Show the child the speech marks: they hold the words the duck says.' },
  { id: 'chip-can-sing', series: 'first', stage: 8, title: 'Chip Can Sing',
    pages: ['Chip is a chick. | He is with his mom.', 'Chip can sing a song. | It is a long, | long song!', 'Then Mom sings | with him. | They sing and sing.'],
    talk: ['Who is Chip?', 'What can Chip do?', 'What does Mom do at the end?'],
    note: 'New in this book: ch, th, ng and the heart word "they". Two letters, one sound: underline ch, ck, th and ng with the child. Read "-ing" and "-ong" as chunks: the vowel sounds a little different before ng.' },
  // ── picture readers ──
  { id: 'i-see-pets', series: 'theme', level: 'A', title: 'I See Pets', newWords: ['pets'], cover: pic('farm animals', 'cat'),
    pages: ['I see a cat.', 'I see a dog.', 'I see a fish.'],
    pics: [pic('farm animals', 'cat', 'cat'), pic('animals', 'dog', 'dog'), pic('animals', 'fish', 'fish')],
    talk: ['Which pets are in the book?', 'Which pet would you like?', 'What does a pet need?'],
    note: 'Level A: one line, one pattern. Name the three pictures together first. The child points under each word and checks the first letter of the last word. If the child says "puppy", point to the d.' },
  { id: 'at-the-farm', series: 'theme', level: 'A', title: 'At the Farm', newWords: ['farm'], cover: pic('farm animals', 'cow'),
    pages: ['Look at the cow.', 'Look at the pig.', 'Look at the sheep.'],
    pics: [pic('farm animals', 'cow', 'cow'), pic('farm animals', 'pig', 'pig'), pic('farm animals', 'sheep', 'sheep')],
    talk: ['Which animals live on the farm?', 'What does each animal say?', 'Which animal gives us wool?'],
    note: 'Level A: the pattern "Look at the" stays; only the animal changes. Name the pictures together first. "pig" can be sounded out: let the child try. If the child says "lamb", point to the sh.' },
  { id: 'my-lunch', series: 'theme', level: 'A', title: 'My Lunch', newWords: ['lunch'], cover: pic('fruits', 'apple'),
    pages: ['I like my apple.', 'I like my bread.', 'I like my milk.'],
    pics: [pic('fruits', 'apple', 'apple'), pic('At the Supermarket', 'bread', 'bread'), pic('breakfast', 'milk', 'milk')],
    talk: ['What is in the lunch?', 'What do you like for lunch?', 'Which of these comes from a cow?'],
    note: 'Level A: three sight words, "I", "like", "my", on every page. Name the pictures together first. Ask the child to find "like" on each page.' },
  { id: 'it-can-go', series: 'theme', level: 'A', title: 'It Can Go', newWords: ['too'], cover: pic('vehicles', 'car'),
    pages: ['The car can go.', 'The bus can go.', 'The snail | can go, too!'],
    pics: [pic('vehicles', 'car', 'car'), pic('vehicles', 'bus', 'bus'), pic('forest creatures', 'snail', 'snail')],
    talk: ['What can go fast?', 'What is funny about the last page?', 'What else can go?'],
    note: 'Level A: the pattern "The … can go" stays. Name the pictures together first. "can" and "bus" can be sounded out. Read "too" together first: the last page adds it after a comma.' },
  { id: 'big-and-little', series: 'theme', level: 'B', title: 'Big and Little', cover: pic('zoo animals', 'elephant'),
    pages: ['The elephant is big.', 'The mouse is little.', 'The whale is very big!'],
    pics: [pic('zoo animals', 'elephant', 'elephant'), { ...pic('forest creatures', 'mouse', 'mouse'), scale: 0.6 }, { ...pic('animals', 'whale', 'whale'), scale: 1.2 }],
    talk: ['Which animal is little?', 'Which animal is the biggest?', 'Name something bigger than you and something smaller than you.'],
    note: 'Level B: the last word changes between "big" and "little", so the child must read it and cannot recite the pattern. Name the three animals together first.' },
  { id: 'the-frog', series: 'theme', level: 'C', title: 'The Frog', newWords: ['green', 'jump', 'swim'], cover: pic('reptiles and Amphibians', 'frog', 'frog'),
    pages: ['This frog is green.', 'A frog can jump | and swim.', 'It can eat a bug!'],
    pics: [pic('reptiles and Amphibians', 'frog', 'frog'), pic('pets', 'frog', 'frog'), pic('Things That Fly', 'beetle', 'bug')],
    talk: ['What color is the frog?', 'What can a frog do?', 'What does a frog eat?'],
    note: 'Level C: a fact book with no pattern. Read "green", "jump" and "swim" with the child before the book is opened. "bug" can be sounded out.' },
  { id: 'the-big-cloud', series: 'theme', level: 'C', title: 'The Big Cloud', cover: pic('weather', 'partly_cloudy', 'cloud'),
    pages: ['The sun is up. | It is hot.', 'Here is | a big cloud.', 'I get my umbrella!'],
    pics: [pic('weather', 'sun', 'sun'), { ...pic('weather', 'cloudy', 'cloud'), scale: 1.15 }, pic('accessories', 'umbrella', 'umbrella')],
    talk: ['What is the weather like at the start?', 'What comes next?', 'Why does the child get an umbrella?'],
    note: 'Level C: two sentences on the first page. The story is told by what comes next: ask the child to say what will happen before turning the page. Name the pictures together first.' },
];
