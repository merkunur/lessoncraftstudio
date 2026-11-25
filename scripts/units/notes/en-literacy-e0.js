'use strict';
/**
 * Teacher notes, English, literacy: three of the five design rows that waited until unit descriptions could change
 * (operator ruling 2026-11-25: a lesson goes into the unit the year design gives it, and the unit's description gets the
 * new lesson count). Written from the live English pages: K-230 Vowels and Consonants (the row of letter tiles and the
 * two boxes), the Set 5 decodable books of K-628 (Ted in Bed, Ten Red Hens, The Red Bug: four-page fold books with
 * three pages to read and draw, on screen too), G2-343 Who Am I? Mystery Animal (cards of five "I" clues, a picture bank
 * of six animals, the name to write and the animal to draw).
 * The two other rows wait: "Walk, march, tiptoe: act it out" (L.K.5.d) and "Book talk: listen, then add on" (SL.1.1.a)
 * are teacher-led with no page, no screen practice and no tool that models them (the Picture Word Wall holds nouns;
 * Name Sticks is a classroom tool), so each needs a page before it can have two real assets.
 * A note has to fit its sheet of the teacher guide (build-guide.js): about 1,850 letters in all, the routine included.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:vowels-consonants': {
      title: 'Vowels and Consonants',
      objective: 'Children sort letters into vowels and consonants and find the vowel in short words they can read.',
      routine: 'Day 1: say the vowels a, e, i, o, u and write them in red on chart paper; all the other letters are consonants. Hold up letter cards one at a time: the class stands for a vowel and stays seated for a consonant. Then write cat, pig and sun on the board; children tap the sounds, find the vowel in the middle of each word and say its short sound. Day 2: sort the first tile together (say it, check the red list, write it in its box), then children finish the page.',
      note: {
        mistake: 'Children forget e or put y with the vowels, or sort by how a letter looks (round letters as vowels). In a word they point to the first letter instead of the vowel in the middle.',
        words: 'Say: "A, e, i, o, u are the vowels. Every word we sound out has one." "Is it a vowel? Check our red list." For words: "Tap the sounds: /k/ /a/ /t/. Which sound is in the middle? That is the vowel." Children write each letter from the row in the Vowels box or the Consonants box (or cut the tiles apart and glue them); the letters change from copy to copy.',
        watch: 'Right: every vowel in the Vowels box and all the other letters in the Consonants box. A child who puts w there needs the red list again. If a child says "sometimes y," agree, but y starts yes as a consonant, so here it goes with the consonants. In the words on the board, the child points to the middle letter and says its short sound.',
      },
    },
    'K:read-decodable-text': {
      title: 'Read a Decodable Book',
      objective: 'Children read a little book made only of short-vowel words they can sound out and heart words they have learned, page by page, and draw what each page says.',
      routine: 'Day 1: read the book\'s heart words (a, the) from the board together. Fold a book step by step while children fold theirs (top half back, then left half back), and read the cover. Partners take turns reading a page, a finger under each word, sounding out any word they don\'t know right away; you listen in on one pair at a time. Day 2: children reread their book, draw what each page says, and read it to a friend or take it home.',
      note: {
        mistake: 'Children guess a word from its first letter instead of sounding it all the way through, mix up short e with short a or i ("bad" for "bed"), or skip the small heart words. After folding, some read the pages out of order.',
        words: 'Say: "Point to each word as you read it." "Sound it out, then say it fast: /b/ /e/ /d/, bed." "Does that make sense? Read the sentence again." The books of this lesson are Set 5 (short e and s as in is, with the earlier short vowels and heart words like a and the), for example Ted in Bed; each has a cover and three pages to read and draw, numbered in the corners so the order shows after folding.',
        watch: 'Right: the child reads each sentence aloud with few errors and fixes a word that does not make sense; each drawing shows what its page says (Ted in bed, the mug). Note the words a child had to sound out slowly: those are the ones to practice. The screen version shows the book page by page.',
      },
    },
    '2:mystery-animal': {
      title: 'Clues to a Mystery Animal',
      objective: 'Children read clues one at a time, ask and answer questions about the details, and use them to find a mystery animal.',
      routine: 'Day 1: post six animal pictures, think of one, and give one clue at a time ("I live in water." "I have fins."). After each clue, children ask a question back ("Does it have a shell?") and the class crosses off animals on the chart until one is left. Then a child leads a round. Day 2: the page; partners read each card aloud, one clue at a time, before they choose.',
      note: {
        mistake: 'Children stop at the first clue that fits ("I live on land" fits several animals) and write the first animal it matches. Some read "I cannot" as "I can" and choose the opposite.',
        words: 'Say: "Read one clue. Which animals in the picture bank still fit? Point to them, or cover the others with counters." "Read the next clue. Who is left?" "Which clue told you?" Each card has five clues told by the animal (what kind of animal it is, where it lives, what it eats, its body, whether it can fly or swim); the bank holds six animals, and each of the three cards has one answer.',
        watch: 'Right: the animal\'s name on the line and a drawing of it in the box on every card, and the child can point to the clue that ruled out the last other animal. Have a child who reads "I cannot fly" as "I can fly" reread that clue aloud with a finger under each word.',
      },
    },
  },
};
