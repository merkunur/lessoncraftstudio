'use strict';
/**
 * Teacher notes, English, Kindergarten literacy (Daily Teaching System, Part 4.3). Written from what each lesson's
 * worksheets PRINT (scripts/units/dump-points.js), in American English. The six points of the pilot unit "Hearing
 * Sounds in Words" were written straight into frontend/content/units/points/en.json and are not repeated here.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:pre-writing-strokes': {
      title: 'Lines, zigzags, and curves',
      objective: 'Children trace straight lines, zigzags, waves, and curves from the starting dot in the direction of the arrow.',
      note: {
        mistake: 'Children start wherever the pencil lands and trace against the arrow, or they lift the pencil at every bend. Many hold the pencil in a fist and press so hard that the hand is tired after two lines.',
        words: 'Say: "Find the orange dot. That is where the pencil starts. Follow the arrow and do not lift until the line ends." For the grip: "Pinch the pencil with your thumb and pointer finger; let it rest on your middle finger." Name each stroke as the child traces it: "straight across, zigzag, wave, curve around."',
        watch: 'Watch the starting point and the direction, not how neat the line is. A child who starts at the wrong end or traces against the arrow here will form letters the same way; correct it now, one line at a time, by putting the child\'s finger on the orange dot before the pencil goes down.',
      },
    },
    'K:letter-identification': {
      title: 'Find the letter',
      objective: 'Children find every copy of a letter among letters that look like it, such as b, d, p, and q.',
      note: {
        mistake: 'Children circle b, d, p, and q as the same letter: a stick and a ball. Turning a toy does not change what it is, so they do not expect turning a letter to change it.',
        words: 'Say: "Letters are special. Turn a b around and it is a different letter." Give each one a short cue and keep it all year: "b: stick first, then the ball. d: ball first, then the stick. p: the stick hangs down below the line, then the ball. q: ball first, then the stick hangs down." Ask: "What comes first, the stick or the ball? Does the stick go up or hang down?"',
        watch: 'Have the child name each letter they circle. A child who circles correctly and cannot name the letters is matching shapes; one who names d as b needs the cue, not more circling.',
      },
    },
    'K:letter-case': {
      title: 'Capital and small letters',
      objective: 'Children match each capital letter to its small letter.',
      note: {
        mistake: 'Children match the pairs that look alike (C c, S s, O o) and guess at the ones that do not: A a, G g, R r, Q q. The small letters b, d, p, and q get the wrong partners.',
        words: 'Say: "Every letter has two shapes, a capital and a small one. We also call them uppercase and lowercase. They have the same name and stand for the same sound." Point to both: "Capital G, small g." Ask: "Which pairs look alike? Which look different?"',
        watch: 'Note which pairs each child misses and practice only those. The pairs that look different have to be learned one at a time; there is no trick for them.',
      },
    },
    'K:letter-formation': {
      title: 'Write the letters',
      objective: 'Children trace each letter from its starting dot in the direction of the arrows and write one on their own.',
      note: {
        mistake: 'Children draw letters from the bottom up or in pieces, so that an M is four lines drawn in any order and an O goes around the wrong way. The letter looks right on the page, and the habit slows writing later.',
        words: 'Say the path aloud for each letter and use the same words every time: "Capital B: down, back to the top, around, around." Ask: "Where does it start? Which way does the arrow go first?" Write the letter big in the air together before the pencil touches the page.',
        watch: 'Stand where you can see the hand moving. Check the letter the child writes alone on the empty line; that one shows whether the path was learned or only followed.',
      },
    },
    'K:alphabet-order': {
      title: 'The alphabet in order',
      objective: 'Children say the alphabet in order, write the letters that are missing, and connect dots in alphabet order.',
      note: {
        mistake: 'Children can sing the alphabet and cannot say what comes after a letter in the middle without starting from A. "L, M, N, O, P" is sung as one word, so those letters get lost.',
        words: 'Say the alphabet slowly while pointing to each letter, and stop: "…F, G. What comes next?" Ask: "What comes after K? What comes before K?" Slow down at "L, M, N, O, P" and tap each letter.',
        watch: 'Notice who sings from A for every gap. Keep an alphabet strip on the desk for those children and have them find a letter and its neighbors by looking, then from memory.',
      },
    },
    'K:word-sentence-tracing': {
      title: 'Trace and write words',
      objective: 'Children trace a short word, read it, and write it on their own from left to right.',
      note: {
        mistake: 'Children trace the letters in any order and never read the word, so the page becomes drawing practice. When they write the word alone, they leave out a letter, change the order of the letters, or spread the letters so far apart that the word looks like two.',
        words: 'Say: "Read it first. Now trace it, and say each sound as you trace its letter. Now write it and read it again." For a sight word that does not sound out: "Spell it as you trace: t-h-e, the." For spacing: "Letters in one word sit close together, like friends. If you write the word twice, leave a finger space between."',
        watch: 'Ask the child to read back what was written. Look at the word written alone: are the letters in order, close together, and sitting on the line?',
      },
    },
    'K:all-about-me-personal': {
      title: 'All about me',
      objective: 'Children write their name and age, draw themselves and their favorite things, and copy the words for things they like.',
      note: {
        mistake: 'Children write their name in all capitals or with letters out of order, and some cannot yet write the numeral for their age. Copying a word, they skip a letter or lose their place and start it over.',
        words: 'Say: "Your name starts with a capital letter. The other letters are small." For copying: "Look at the first letter. Write it. Look at the next one." Ask each child about the drawing: "Tell me about your picture."',
        watch: 'This page has no wrong answers about the child\'s life; correct only the name and the copied words. Listen to what children say about their drawings, and write their words under the picture if they ask.',
      },
    },
    'K:word-picture-match': {
      title: 'Match words to pictures',
      objective: 'Children read a short word and match it to the picture it names.',
      note: {
        mistake: 'Children look at the first letter only and take the first picture that starts with it: "cat" is matched to the cup. Or they name the pictures and guess at the words by their length.',
        words: 'Say: "Touch each letter and say its sound. Now say the sounds fast. What word is it?" Then: "Does the word end the way the picture\'s name ends? Check the last sound."',
        watch: 'Listen to a child sound out one word. A child who says the first sound and then names a picture is guessing; cover the pictures and have the word read first.',
      },
    },
    'K:sight-words-reading': {
      title: 'Sight words',
      objective: 'Children read a common word at a glance, find it among words that look like it, and write it in a sentence.',
      note: {
        mistake: 'Children mix up words that look alike (was and saw, on and no, the and they). With a word that has one irregular part, they sound out that part as it is spelled, say "sayd" for said or "wass" for was, and do not notice that it is not a word they know.',
        words: 'Say: "Sound out the parts that play by the rules. One part you have to know by heart." Point to that part: "In \'said,\' s and d say their sounds; the a-i says /e/, and that is the heart part." For a word with no tricky part: "This one plays by the rules all the way: /o/ /n/, on." Have children read the word, spell it aloud, and read it again: "said, s-a-i-d, said."',
        watch: 'Check the look-alike boxes on the coloring page: they show which words a child confuses. Have the child read the finished sentences aloud; writing the word in is not the same as reading it.',
      },
    },
    'K:digraphs-k': {
      title: 'sh and ch',
      objective: 'Children say a picture\'s name and decide whether it begins with the sound of sh or the sound of ch.',
      note: {
        mistake: 'Children hear /sh/ and /ch/ as the same sound, or say one for the other: "shair" for chair, "chip" for ship. This is most common in children whose home language has only one of the two sounds, such as Spanish. Others name the picture with a different word (boat for ship) and then cannot find its sound.',
        words: 'Say: "Two letters, one sound. sh says /sh/, the quiet sound. ch says /ch/, like a sneeze." Stretch the first sound: "shhhh-ip." You can hold /sh/; you cannot hold /ch/. Ask: "Can you hold the sound?"',
        watch: 'Name every picture together before anyone draws a line, so that all children sort the same words. Have each child say the word before drawing the line. A child who sorts by looking and not by saying will not hear the difference; say the pairs together and feel the mouth: ship, chip; shoe, chew.',
      },
    },
    'K:singular-plural': {
      title: 'One and many',
      objective: 'Children tell the word for one from the word for more than one and write the plural with s.',
      note: {
        mistake: 'Children say the plural when they talk and leave the s off when they write. They have not noticed that the s at the end is what tells "more than one."',
        words: 'Say: "One cat. Two cats. What did I add? Listen to the end." Have children say both and hold the last sound: "cats-s-s." Tell them once: "In \'dogs\' the end sounds like /z/, but we still write s." Ask: "Is it one or more than one? Does your word have its s?"',
        watch: 'Read the child\'s written plural and check the last letter. Irregular plurals (feet, mice) come later; if a child says "foots," accept it for now and say the right word back.',
      },
    },
    'K:articles': {
      title: 'A or an?',
      objective: 'Children say a picture word aloud and choose a or an to go in front of it.',
      note: {
        mistake: 'Children always circle "a," or they guess. They have not noticed that "a apple" is hard to say, because nobody has asked them to listen for it.',
        words: 'Say both and let children hear it: "a apple… an apple. Which one is easier to say?" Give the rule in child words: "If the word starts with a vowel sound, like the first sound in apple, egg, igloo, octopus, or umbrella, use an." Have them say the whole pair: "an egg, a dog."',
        watch: 'Make sure children say the words aloud; this page cannot be done silently at this age. For children who speak another language at home, a and an may be new and need more spoken practice.',
      },
    },
    'K:category-sort': {
      title: 'Sort into groups',
      objective: 'Children decide which group each picture belongs to, such as animals or food, and sort the pictures.',
      note: {
        mistake: 'Children put things together because they go together in life (the dog with the bone) and not because they are the same kind of thing. Asked why, they tell a story about the two pictures.',
        words: 'Name the group before sorting: "This bin is for animals. Is a dog an animal? Is a bone an animal?" Ask for the group word: "A dog, a cat, and a cow are all…?" Use "belongs" and "kind of": "A carrot is a kind of food."',
        watch: 'Ask "Why does it go there?" for one picture per child. "Because it is an animal" names a category; "because the dog eats it" tells a story. Both are thinking; only the first is sorting.',
      },
    },
    'K:category-odd-one-out': {
      title: 'Which one does not belong?',
      objective: 'Children look at a row of pictures, find the one that is not the same kind of thing, and say why.',
      note: {
        mistake: 'Children circle the picture that looks different (the biggest one, the only red one) when the row is about kinds of things. Or they circle one and cannot say what the other three have in common.',
        words: 'Ask: "What are these three? They are all fruit. Is the shoe a fruit?" Have the child finish the sentence: "The shoe does not belong because…" Accept another answer if the reason is good, and say so.',
        watch: 'The reason matters more than the circle. A child who gives a different answer with a sound reason has done the thinking; ask the class whether they can see it that way too.',
      },
    },
    'K:opposites': {
      title: 'Opposites',
      objective: 'Children match a picture to the picture that shows its opposite, such as big and small or hot and cold.',
      note: {
        mistake: 'Children match two pictures that go together (hot and the sun, night and a bed) and not two that are opposite. Or they join a picture to the nearest picture without looking at the word printed with it.',
        words: 'Act them out: "Stand up… sit down. Open… shut." Say: "Opposites are as different as they can be." Ask with a sentence to finish: "The soup is hot. The ice is…?"',
        watch: 'Have children say both words of each pair they join. A child who can act out the opposite and cannot name it needs the words; that is a vocabulary matter, not a thinking one.',
      },
    },
    'K:story-sequencing': {
      title: 'First, next, last',
      objective: 'Children look at the pictures of a short story and put them in the order in which things happen.',
      note: {
        mistake: 'Children number the pictures from left to right as they are printed, without looking at what happens in them. Or they find the first picture and guess the other two.',
        words: 'Ask: "What is different in this picture? What happened before that?" Tell the story with the three words: "FIRST the seed is in the ground. NEXT a leaf comes up. LAST there is a flower." Have the child tell it back the same way.',
        watch: 'Have each child tell the story aloud from the finished page. If the telling makes sense, the order is right; a child who cannot tell it has numbered boxes, not ordered a story.',
      },
    },
  },
};
