'use strict';
/**
 * Teacher notes, English, literacy: the Kindergarten unit Reading to Learn: Fact Texts (Daily Teaching System,
 * Part 12.3, third run, 2026-11-15). Five NEW teaching points: four on the pages of types/_shared/fact-text-k.js and (2026-11-16) one on types/_shared/two-texts-k.js: a
 * fact text of four short sentences in big print that the teacher reads aloud, with answers that are pictures.
 * Each note was written from the pages the lesson hands out, in American English, and read by one American
 * kindergarten teacher-reviewer with a description of the pages (2026-11-15); every finding is in the text below.
 * The four notes of the unit Reading Stories (K-650 to K-653) were added by
 * place-ready-l.en.literacy.js; the reviewer of the story pages read them (2026-11-17, every finding applied).
 * The four notes of the unit Words and Sentences (K-654 to K-660) were added by place-ready-n.en.literacy.js;
 * the reviewer of the pages read them (2026-11-17, every finding applied).
 * The note of K:place-words (K-548, K-546) was added by place-ready-q.en.literacy.js; a US teacher read it
 * (2026-11-17, every finding applied).
 * The four notes of the unit Short Vowels and CVC Words (K-661 to K-664) were added by place-ready-t.en.literacy.js;
 * the reviewer of the pages read them (2026-11-18, every finding applied).
 * The four notes of the unit How Books and Print Work (K-665 to K-672) were added by place-ready-ee.en.literacy.js;
 * the reviewer of the pages read them (2026-11-17, every finding applied).
 * The four notes of the unit Draw and Write: Opinions, Facts, and Stories (K-673 to K-680) were added by place-ready-oo.en.literacy.js;
 * the reviewer of the pages read them (2026-11-17, every finding applied).
 * The note on blending the first sound and the rest (K-681, K-682) was added by place-ready-ppa.en.literacy.js;
 * the reviewer of the pages read it (2026-11-17, every finding applied).
 * The note on words with two meanings (K-683, K-684) was added by place-ready-ppb.en.literacy.js;
 * the reviewer of the pages read it (2026-11-17, every finding applied).
 * The note on two stories, two adventures (K-685, K-686) was added by place-ready-ppc.en.literacy.js;
 * the reviewer of the pages read it (2026-11-17, every finding applied).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:fact-text-key-details': {
      title: 'Find the Facts',
      objective: 'Children listen to a short fact text, read along, and, with support, ask and answer questions about its key details, answering with a picture.',
      note: {
        mistake: 'Children answer from what they already know and not from the text: asked where an owl sleeps, a child circles the bed "because you sleep in a bed," although the text says in a tree. Others circle the picture they like best, or the first one in the row.',
        words: 'Read the text aloud twice while children point under each word. Say: "A fact text tells us true things. Today every answer is in the text." Read one question at a time. Then reread the text one sentence at a time and say, "Thumbs up when you hear the answer." Then: "Put your finger on that sentence." Only then do children circle or draw. On the page with two questions to draw, the last box asks for a question of the child\'s own: give a starter, "Ask me something about owls. Start with What or Where," and write the question down for a child who cannot yet. Then read the text again together: does it answer the question? If not, say, "That is a great question to find out more about."',
        watch: 'Ask a child, "How do you know?" A child who points to the sentence has used the text; a child who says "I just know" needs the sentence read again. On the drawing pages, a drawing counts when the child can tell you what it is and which sentence it comes from; the drawing does not have to be good. The on-screen activity shows a two-sentence fact, and the child taps its key detail. Children read it on their own, so use it with a small group or sit beside children who cannot yet read it.',
      },
    },
    'K:fact-text-main-topic': {
      title: 'What Is It All About?',
      objective: 'Children say what a whole fact text is about (its main topic) and tell one or two things the text says about it.',
      note: {
        mistake: 'Children pick a detail as the topic: for the text about cows they circle the milk, because milk is in two of the four sentences. Asked for a detail, they tell something they know that the text never says.',
        words: 'Say: "The topic is what the WHOLE text is about." Point to a detail picture in the first row (on the cow page, the milk) and ask, "Is every sentence about this?" Read the sentences one by one and have children show a thumb up or down for each. "Is every sentence about cows? Then cows is the topic." For the details: "Tell me one thing the text says about cows. And one more." Have children say each detail in a whole sentence before they circle or draw it.',
        watch: 'In the first row, a child who circles a detail picture does not yet see that the topic is what every sentence is about. On the drawing pages, ask the child to tell you the two details and check that both are in the text. On the hardest page, children may copy a word from the text or sound it out; accept invented spelling. The on-screen activity asks what a short text read aloud is all about (its topic): a good warm-up before the page.',
      },
    },
    'K:pictures-and-text': {
      title: 'Pictures That Teach',
      objective: 'Children match each sentence of a fact text to the picture that goes with it and tell what the picture shows.',
      note: {
        mistake: 'Children draw a line to the nearest picture, or match by one word they catch: "leaves" in a sentence about a nest pulls them to the picture of a tree. On the page with a missing picture they draw the animal or thing of the text again, not what the sentence without a picture tells about.',
        words: 'Read the first sentence aloud and ask, "Which picture shows this? Tell me what you see in it." Say: "Every picture goes with one sentence. If two pictures seem to fit, listen to the other sentences first: each picture is used one time." Have children trace the line with a finger before they draw it. For the empty box: "Which sentence has no picture yet? Draw what THAT sentence tells about."',
        watch: 'Look for two lines that end at one picture: the child matched by a single word. Read the other sentences to the child again and have the child use each picture once. On the easiest page there are three sentences, on the others four. Ask each child about one line, "What part of this sentence does the picture show you?": the standard is about telling how a picture and the words go together, not only about drawing the line. The on-screen activity reads one part of a story aloud and asks which picture shows it. It uses stories, not fact texts: use it as a warm-up or at a center, and afterward ask, "How did the picture help you?"',
      },
    },
    'K:first-then': {
      title: 'First, Then',
      objective: 'Children tell what comes first and what comes next in a fact text that tells a change.',
      note: {
        mistake: 'Children put the two things in the order they like or in the order of the pictures on the strip, not in the order of the text. On the drawing pages they draw the first two things the text names and not the two the question asks about.',
        words: 'Read the text aloud, then the question in the box: it tells which change the page is about. Say: "What was there FIRST? What did it turn into, or what came NEXT?" Have children answer in one sentence with both words: "First it is a caterpillar, then it is a butterfly." On the cut-and-glue page say: "Three pictures, two boxes. One picture is not part of the answer; it is left over."',
        watch: 'Before the glue comes out, have each child lay the two pictures in the boxes and tell you the sentence with first and then. A child who reverses them should hear the text once more and listen for the words that tell the change, like "turns into," "grows into," or "then." On the hardest page, children may copy the two words from the text or sound them out; accept invented spelling. The on-screen activity shows one fact and asks which fact comes next or happens because of it: use it after the page, and ask, "How do these two facts go together?"',
      },
    },
    'K:two-texts-one-topic': {
      title: 'Two Texts, One Topic',
      objective: 'With help, children tell what two short fact texts on one topic both say and what only one of them says.',
      note: {
        mistake: 'Children sort by what they know, not by what the texts say: a cat may play with a ball too, so the ball goes in the middle, although only the text about dogs tells about a ball. Many children wear boots in the snow, but only the rainy-day text tells about boots. Others glue a card under the first text that names it and never check the second text. Most cards can be placed from what children already know, so a correct page does not prove they compared the texts. The proof is pointing to the sentence in each text.',
        words: 'Read the first text aloud, then the second, while children point under the words. Say: "Both texts are about pets" (or trees, the weather, the sky, farm animals). "Some things are in both texts. Some are in only one." Hold up one picture card and name it with the word of the text ("leaves," "rain boots," "yarn," "a mail truck"): "Listen for it." Read both texts again, and children raise a hand each time they hear the word. "Did you hear it in the first text? In the second? In both?" Only then do they glue the card. The picture of each text is at the top of its box, and the middle box shows both pictures.',
        watch: 'Ask about one card in the middle: "Show me where each text says it." A child who can point to both sentences has compared the texts. On the cut-and-glue page, two pictures go in each box. On the drawing pages, anything a text tells about counts, and a quick sketch is fine; on the draw-and-write page invented spelling is fine too. A drawing of the cat or the dog only copies the picture at the top: ask for something the text says about it. The on-screen activity compares two stories, not fact texts: use it as a warm-up or at a center, and tell children they do the same thing here with facts.',
      },
    },
    'K:story-who-where': {
      title: 'Who Is in the Story, and Where?',
      objective: 'Children tell who a story is about, where it happens, and one big thing that happens in it.',
      note: {
        mistake: 'Children name every animal in the pictures instead of the one the story is about. For "where" they point to a thing ("the hat") and not to a place. For "what happened" they tell only the ending.',
        words: 'Read the story aloud twice: first straight through, then panel by panel while children touch each number. Teach three words with a gesture each: characters (point to yourself: who), setting (spread your arms: where), events (clap once: what happens). Ask: "Who is the story about? Where does it happen? What is one big thing that happens?" On Level 1 children circle a picture for each question. On Level 2 they draw the character, the place, and one thing that happens in three boxes. On Level 3 they draw in smaller boxes and write a word on the big row next to each drawing; writing the sounds they hear is fine ("lak" for lake). On screen, Dot\'s Story Spine asks for the start, the trouble, and the fix of a little story.',
        watch: 'A drawing is right when you can tell what it shows, or the child can tell you. Ask: "Who is this? Where is she?" If a child draws a helper (Frog for Duck), ask: "Whose hat is it? Who is the story about?" When the title names two animals (Bear and the Bee), or two animals do the work together (Rabbit and Hen), either one or both is right. On Level 1 the third row shows one pair of pictures from this story and two pairs from other stories.',
      },
    },
    'K:retell-beginning-middle-end': {
      title: 'Retell the Story: Beginning, Middle, End',
      objective: 'Children retell a story they have heard in order: what happens at the beginning, in the middle, and at the end.',
      note: {
        mistake: 'Children start with the part they liked best, or they tell only the end. Some name things ("a duck, a hat") instead of telling what happened.',
        words: 'Read the story aloud twice. Hold up three fingers and retell a story the class knows: "First ... Then ... At the end ..." On Level 1 children look at three pairs of pictures from the story and write 1, 2, and 3 to put them in order; then they tell the story to a partner with the pictures. On Level 2 they draw the beginning, the middle, and the end. On Level 3 they tell the story and finish three sentences that begin First, Then, and At the end, on big rows; a child may tell you the words to write, or write the sounds he or she hears. The telling matters more than the drawing: every child tells the story aloud once. On screen, Wake Up, Pip! lets children retell a story in order to a sleepy friend.',
        watch: 'A retelling is right when the three parts are in order and the end is there. Small details may be left out. The story has four panels and the page asks for three parts, so two panels may go together; on Levels 2 and 3 a beginning drawn from the first or second panel is right. This page prints the panels without numbers. If a child skips the middle, point to the second or third panel and ask: "What happened here?"',
      },
    },
    'K:story-questions': {
      title: 'Ask and Answer Questions About a Story',
      objective: 'Children answer who, where, what, and how questions about a story they have heard, and ask a question of their own.',
      note: {
        mistake: 'Children answer with something they know about the animal, not with what the story says. They mix up who and where. When asked for a question, they tell something instead ("The duck has a hat").',
        words: 'Read the story aloud twice. Read each question aloud and have children point to the panel that tells the answer before they circle a picture. On Level 1 the questions begin with Who and Where. On Level 2 they begin with What and How; a How question asks for a feeling, and children circle a face. On Level 3 children answer two questions and ask one of their own: they draw what they want to know, or they tell you the question and you write it in the box. Say: "A question asks something we want to know. It often starts with who, what, where, when, why, or how." On screen, Fable\'s Picture Stories gives more questions about three-picture stories.',
        watch: 'An answer is right when the story says it. Ask: "Which picture of the story shows that?" For a child\'s own question, accept any real question about the story, even one the story does not answer ("Why did Frog help?"). If the child tells a fact, say: "Turn it into a question. Start with who or what."',
      },
    },
    'K:pictures-and-words': {
      title: 'The Pictures and the Words',
      objective: 'Children match each part of a story they hear to the picture that shows it.',
      note: {
        mistake: 'Children draw a line to the picture straight across from the sentence. They match by one thing they see (any picture with the cat) and not by what happens in the sentence.',
        words: 'This page prints the sentences of a story on the left and its pictures on the right, mixed up. Read sentence 1 aloud, have children put a finger on its dot, and ask: "Which picture shows this part? What do you see in it?" Then children draw the line. Say: "The pictures show what the words tell." On Level 1 there are three sentences (the first and the last of the story and one from the middle), on Level 2 all four. On Level 3 one picture is missing: children draw it in the empty box, then draw the line to it. Afterward, read the story again and let children point to each picture as its part is read. On screen, in Otto\'s Picture Book, children tap the picture that shows the part Otto reads.',
        watch: 'No picture stands straight across from its sentence, so a child who draws straight lines has not matched. Many pairs share an animal or a thing (the hat, Rabbit, the honey), so one picture is not enough. Ask: "Do you hear both things in this sentence?" On Level 3 the drawing is right when it shows who and what the sentence tells.',
      },
    },
    'K:naming-and-action-words': {
      title: 'Naming words and action words',
      objective: 'Children sort pictured words into naming words (dog, cup) and action words (run, jump) and say each one in a sentence.',
      note: {
        mistake: 'Children sort by what they see first: the card of a girl running goes to the naming box because it shows a girl. Some name an action card with a naming word (runner, dancer) and then sort it as one.',
        words: 'Say: "A naming word names a person, an animal, or a thing: doctor, dog, cup. An action word tells what someone does: run, jump." Hold up a ball and act out jumping; ask which one you can do. Day 1, Naming Words and Action Words: children cut out twelve cards and glue six in the naming box and six in the action box. On Level 1 the cards are pictures only, so name each card; the words to say are printed in small grey type at the foot of the Level 1 page, row by row. Level 2 prints the word under each picture; Level 3 is for children who read: the cards are words only, and children finish "The ___ can ___." Day 2, Find the Action Word: each row has one action and two naming words. On Level 1 name the three pictures in each row (one is a person standing still, such as a doctor or a farmer); the words to say are printed at the foot of the Level 1 page, row by row; children circle the action word. On Level 2 children read three short words and circle the action word. On Level 3 they read six sentences, circle the naming word, and underline the action word, as in the example at the top.',
        watch: 'For a card a child is unsure of, try it in "I can ___." "I can dog" makes no sense; "I can swim" does. Name each action picture with the action word: dance, not dancer; read, not book. A person is a naming word too: doctor and baby name who someone is, not what someone does. In the sentences, fast, big, little, and red are neither kind; only the naming word and the action word are marked.',
      },
    },
    'K:capital-letter': {
      title: 'A sentence starts with a capital letter',
      objective: 'Children find the capital letter at the start of a sentence and in the word I, and fix sentences that start with a small letter.',
      note: {
        mistake: 'Children copy a sentence as it is printed and keep the small letter. Some write a capital at the start of every word, and many write the word I as a small i.',
        words: 'Write "the cat ran." on the board. Ask: "How does a sentence start?" Change the t to a T. Say: "A sentence starts with a capital letter. The word I is always a capital letter." Day 1, Fix the First Letter: each sentence is printed two ways, once with a capital and once with a small first letter. On Level 1 (three-word sentences) children circle the one written right; on Level 2 they circle it and write its capital letter in the box; on Level 3 every sentence starts with a small letter and children write its first word with a capital on the line. Day 2, A Sentence Starts with a Capital Letter: children circle the first letter of six sentences and each word I. Three sentences start with a small letter; for those, children write the capital in the box in front of the sentence. Level 1 has three-word sentences, Level 2 four- and five-word sentences, and Level 3 adds a sentence to copy on a line.',
        watch: 'The sentences have no names, so the only capitals are the first letters and I. On Day 1 the two ways differ in one letter only: have the child point to it. On Day 2 a child who writes a capital in every box has not looked; ask, "Does this letter look like the capital on our alphabet chart?" Check that the word I is circled inside a sentence too ("here I am").',
      },
    },
    'K:period-or-question-mark': {
      title: 'A period or a question mark?',
      objective: 'Children name the period and the question mark, tell which one ends a telling sentence and which one ends an asking sentence, and add the right mark.',
      note: {
        mistake: 'Children choose by the picture or by how long the sentence is, not by what it says. Some put a question mark only after a question that starts with what or where, and miss questions such as "Can a bee fly".',
        words: 'Draw a period and a question mark and name them. Say: "A telling sentence tells something and ends with a period. An asking sentence asks something and ends with a question mark." Read a pair aloud: "The dog can run. Can the dog run?" Ask which one asks. Day 1, Telling or Asking? Sort the Sentences: numbered strips, half telling and half asking, to cut out and glue under the period or the question mark. On Level 1 read each strip aloud the way you would say it; on Level 2 children read eight strips; on Level 3 they read six strips and write the mark at the end of each before gluing. Day 2, A Period or a Question Mark?: on Level 1 children circle the mark for six sentences you read; on Level 2 they read eight short sentences and write the mark in the box; on Level 3 they write the mark for four sentences, then one telling and one asking sentence about a picture.',
        watch: 'Every asking sentence on these pages starts with who, what, where, when, why, how, can, is, do, or does; point to the first word when a child is unsure. Half the sentences on a page tell and half ask. On Day 2, Level 3, a child may tell the two sentences while you write them; check the end marks.',
      },
    },
    'K:make-the-sentence-longer': {
      title: 'Say more: make the sentence longer',
      objective: 'Children say a complete sentence about a picture, make it longer with words that tell where or when (The dog plays in the rain.), and write the words they added.',
      note: {
        mistake: 'Children add words that do not fit the picture, or add a whole new sentence (The dog plays. It is raining.). When they write, some copy the short sentence again instead of the new words.',
        words: 'Show a picture and say a short sentence: "The cat sits." Ask: "Where? When?" Point to the sun, the moon, the rain, or the snow in the corner of the picture: "The cat sits in the sun." Say: "We can make a sentence longer. We add words that tell where or when." Each page has four pictures, and each shows one of these signs. On Level 1 read the sentence and its three choices; children circle the words that fit the picture. On Level 2 they circle the words and write them on the line. On Level 3 they write their own words on the line. Have each child read the whole long sentence aloud. On screen, Sunny-Side Diner has children say a whole order in one long sentence.',
        watch: 'The picture decides: a dog with snowflakes stands in the snow, not in the sun. On Level 3 accept any words that tell where or when and fit the picture (in the snow, outside, at night); the key gives one answer. Listen for one whole sentence when the child reads it back.',
      },
    },
    'K:place-words': {
      title: 'In, on top of, under, next to',
      objective: 'Children use the place words in, on top of, under, next to, above, between, behind, and in front of to tell where a thing is in a picture.',
      note: {
        mistake: 'Children mix up above and on top of: a thing that is on top of another touches it, a thing that is above floats over it. Many point and say "there" and never say the place word.',
        words: 'Start with a real box and a toy: "Where is the bear? In the box. On top of the box. Under the box. Next to the box." Then hold the toy over the box without touching it: "Above. It does not touch." On the page Choose the Position Word each row shows a picture and a shape beside a sentence, and the child circles the one word of three that fits. Level 1 has in, on top of, under, and next to; Level 2 adds above and between; Level 3 adds behind and in front of. On a flat page, behind means the shape hides part of the picture, and in front of means the picture covers part of the shape; show this first with two paper cutouts. On day 2, on the page Read and Draw, read each sentence with the child ("The fish is under the square."); the child draws the fish where the sentence says, in the box with the shape. On screen, Bramble\'s Parking Tower gives more practice with above, below, next to, and between (below means the same as under).',
        watch: 'Ask the child to say the finished sentence aloud and to show it with a hand: "Show me under." On Read and Draw, look at where the drawing sits, not at how well it is drawn: on top of touches the shape, above floats over it.',
      },
    },
    'K:short-a-i': {
      title: 'Short a and short i',
      objective: 'Children say the short sounds of a and i and read and spell CVC words with them, such as cat, map, pig, and sit.',
      note: {
        mistake: 'Children say the letter\'s name, not its sound ("ay" for a). Others read the first letter and guess the rest, so "ham" becomes "hat," or they read "him" as "ham" because they skip the vowel. When they spell, a and i get mixed up.',
        words: 'Say: "Short a says /ă/, as in apple. Short i says /ĭ/, as in igloo." Model blending: touch each letter, say its sound, then say the sounds fast: /k/ /ă/ /t/, cat. Day 1, Short a and Short i: on every level children read six words and draw a line from each word to its picture. Two words have no picture; each differs from a pictured word only in the vowel (hat and hit), so children must read the middle letter. If a child does not know a picture, look at the six words together: the picture\'s word is one of them. Level 1 practices short a: the four pictures are short-a words, and children write a in six words, starting from the grey example, and read the new words to a partner. Level 2 mixes a and i: after the match, children read four words aloud and write each one under a or i, crossing out each word as they write it. Level 3: after the match, children write the word for three pictures; the first letter is printed on the line, and one picture is the pig. Day 2, Build the CVC Word: children build CVC words from letters on screen and read each word they build.',
        watch: 'Listen for the vowel. A child who reads "him" as "ham" is reading the first and last letters only: cover the word, uncover one letter at a time, and have the child say each sound. When a child writes "bg" for bag, stretch the word together (/b/ /ă/ /g/) and ask, "What do you hear in the middle?" Before n and m, the a in can, fan, and ham sounds a little different; it is still short a, spelled a.',
      },
    },
    'K:short-o-u-e': {
      title: 'Short o, short u, and short e',
      objective: 'Children say the short sounds of o, u, and e and read and spell CVC words with them, such as hot, bug, and bed.',
      note: {
        mistake: 'Children mix up short o and short u (hot and hut) and short e and short i. They often spell short e with an i, especially before n or m: in many US homes pen and pin sound the same.',
        words: 'Say: "Short o says /ŏ/, as in octopus. Short u says /ŭ/, as in umbrella. Short e says /ĕ/, as in elephant." Have children say each sound with you: /ŏ/: drop your jaw, as for the doctor\'s "ahh." /ŭ/: a short, relaxed "uh." /ĕ/: open your mouth a little less than for /ă/. Day 1, Short o, Short u, and Short e: on every level children read six words and draw a line from each word to its picture; two words have no picture and differ from a pictured word only in the vowel (pot and pit). If a child does not know a picture, look at the six words together: the picture\'s word is one of them. Level 1 practices one vowel; each copy uses o or u. Children write the vowel in six words, starting from the grey example, and read the new words to a partner. Level 2 uses two of the three vowels: after the match, children read four words aloud and write each under its vowel. Level 3 uses all three: children write the word for three pictures, one with each vowel; the first letter is printed on the line. Day 2, Build the CVC Word: children build CVC words on screen and read each word they build.',
        watch: 'The pages keep e and i apart: no task asks a child to hear the difference between e and i before n or m, and no sort puts e against i. When a child spells pen with an i, show the printed word and say, "This word uses e." In some homes dog and log sound a little like "dawg"; accept the child\'s way of saying them and keep the spelling o.',
      },
    },
    'K:change-one-sound': {
      title: 'Change one sound to make a new word',
      objective: 'Children change the first, last, or middle sound of a spoken CVC word to make a new word (cat to hat, hat to ham, ham to him) and spell each new word.',
      note: {
        mistake: 'Children change the wrong sound: asked to change /t/ in cat to /p/, they say "pat." Others say a rhyming word instead of making the change. When they spell, some write a new word from scratch and change two letters. The middle sound is the hardest to hear.',
        words: 'Model with letter tiles: "Say cat. Change /k/ to /h/. What is the new word? Hat." Swap the tile so children see that one letter changes and the rest stay. Day 1, Change One Sound: each page is a ladder of six words. Read the top word together; it is printed with its picture. Then read the steps printed at the foot of the page, one at a time ("2 change /k/ to /h/"). Children write the new word on the next step and read it; say the new word together before the next change. When the new sound is /k/, the step line names the letter, c or k. Level 1: only the first sound changes; the last two letters are printed in grey to trace, and children write the first letter. Level 2: the first or the last sound changes, and children write the whole word in the three boxes. Level 3: the first, middle, or last sound changes. Day 2, Pepper\'s Sound Swap: children change one sound on screen to make a new word.',
        watch: 'Before each change, have the child point to the box of the sound you named. A child who writes two new letters has started over: read the word on the step above and ask, "Which sound changed?" Every word on the ladder is a real word, and no step changes e and i before n or m (pen, pin), which sound alike in many homes.',
      },
    },
    'K:words-one-letter-apart': {
      title: 'Which word matches: cat or cot?',
      objective: 'Children tell apart two words that differ by one letter (hat and hot, bag and big) by saying the sound of the letter that differs and choosing the word for the picture.',
      note: {
        mistake: 'Children circle the word that starts like the picture\'s name without reading the rest. Others look at the picture, say its name, and circle any word of the right length without reading the letter that differs.',
        words: 'Write hat and hot on the board. Say: "These words look almost the same. One letter is different." Read both words with the children, point to the a and the o, and say their sounds: /ă/, /ŏ/. Day 1, Which Word Matches?: each page has ten pictures (eight on Levels 2 and 3), each with two words that differ in one letter. Children read both words, circle the word for the picture, and underline the letter that is different in the word they circled. Level 1: the first letter differs (cat and bat). Level 2: the last letter differs (cat and can). Level 3: the middle letter, the vowel, differs (hat and hot). Day 2, Bingo\'s Word Hunt: children read look-alike words on screen and tap the one that names the picture.',
        watch: 'Ask the child to say the sound of the letter that differs in each word; a child who can circle the word but not say the sounds is guessing from the picture. Level 3 never pairs e and i before n or m (pen and pin), which sound alike in many US homes. Every picture is one most kindergartners name with its word; if a child calls a picture something else, have the child read both words: only one of them names the picture.',
      },
    },
    'K:book-parts': {
      title: 'Front cover, back cover, and title page',
      objective: 'Children find and name the front cover, the back cover, and the title page of a book and show where the story starts.',
      note: {
        mistake: 'Children call the title page the front cover, because both show the title. Some think the back cover is the last page of the story.',
        words: 'Hold up a picture book and say: "The front cover shows the title, the author, and a picture. Inside, the title page shows the title and the author again. The story starts after it. Turn the book over: this is the back cover. The back cover often tells about the book and has a bar code." Day 1, K-665: read the box on the page with the class. Level 1: two books, each drawn as its three parts; children circle each front cover and put an X on each back cover. Level 2: children cut out three labels, glue each under its part, and circle the title on the front cover and on the title page. Level 3: a fourth part, the first page of the story, gets no label; children put a green dot on it (either page of that open book is right). Day 2, K-666: children make their own front cover and title page. They trace the title (Levels 1 and 2) or copy it from the big title above the row (Level 3), draw a picture, and write their name after by: they are the author.',
        watch: 'Ask, "How do you know this is the front cover?" A child who points to the title and the picture knows; a child who points to any book shape is guessing. A front cover has its spine on the left, a back cover on the right. The titles and authors are made up.',
      },
    },
    'K:left-to-right': {
      title: 'Read left to right, top to bottom',
      objective: 'Children follow printed words from left to right, top to bottom, and page by page while the teacher reads, pointing to each word.',
      note: {
        mistake: 'Children start in the middle of a line, or at its end they stay on the line instead of sweeping back to the left. In an open book they read the higher words first, even on the right page.',
        words: 'Use a big book or chart: point under each word and sweep back to the left. Say: "We start at the left and read to the right. Then we go back to the left and down to the next line." Day 1, K-667: sentences of four to six words run over two lines, each on a page that ends just after the first line. Level 1: a green dot marks the start and a red dot the end; children trace the arrow under each line and the arrow back to the next line while you read. Level 2: nothing is printed; children put the green and the red dot and draw the arrows. Level 3: children write 1, 2, 3 ... in the box under each word. Day 2, K-668: pattern-book pages (I see a cow.). Level 1: two pages; children number the three lines and dot the first and the last word of each page. Level 2: a book of four pages as two open spreads; children write the page numbers in the circles and dot the first and the last word of the book. Level 3: two open spreads; children number the four lines of each.',
        watch: 'On Level 3 of K-668 at least one spread has its right page\'s lines higher than its left page\'s. A child who writes 1 on the highest line reads top first: ask, "Which page do we read first?"',
      },
    },
    'K:spoken-written-words': {
      title: 'One spoken word, one written word',
      objective: 'Children match each word they say in a short sentence to one written word on the page, pointing word by word.',
      note: {
        mistake: 'Children touch a word for each beat, so caterpillar gets four taps and they run out of words before the sentence ends. Some think one letter or a scribble is a word.',
        words: 'Write a short sentence on chart paper; say it and touch one word at a time; clap a long word and show it is still one word. Say: "Each word we say is one word on the page." Day 1, K-669: children circle the word in each row. Then read each sentence slowly while they touch each word and put one dot under it. Level 1: three words of one beat. Level 2: four or five words, one or two of two beats. Level 3: a word of three beats or more. Day 2, K-670: say the name of each picture; children circle the word that fits. A word that takes longer to say usually has more letters. Have children clap the word before they choose (Level 2). Level 1 gives two words, Level 2 three. Level 3: for each picture, read the sentence the teacher strip names; the children point to the words; you do not. Cut the strip off before you copy the page.',
        watch: 'A child who ends on the last word before you finish has tapped beats: touch the words together again. On K-670 you name each picture, so no child has to guess its name.',
      },
    },
    'K:spaces-between-words': {
      title: 'Spaces between words: count the words',
      objective: 'Children find the spaces that separate printed words, count the words in a sentence, and leave a finger space when they copy one.',
      note: {
        mistake: 'Children count beats or letters instead of words, or count the spaces and forget the last word. When they write, they run the words together.',
        words: 'Write a sentence on chart paper without spaces, then with finger spaces; ask which is easier to read. Say: "A space comes between two words. We count the words, not the claps." Day 1, K-671: four sentences in big print with wide spaces. Children draw a line in each space, count the words, and circle the number (Level 1: two or three words, each space marked with a dotted box) or write it in the box (Level 2: three to five words; Level 3: four to six words). On Levels 2 and 3 a sentence always has more beats than words. Day 2, K-672: each row shows a sentence with spaces and the same sentence without them; children circle the one that is easy to read. Then they cut out big word cards and glue them in the order of the sentence above, a finger space between them: three cards on Level 1, four on Level 2, five on Level 3. Level 3 also has a short sentence to copy on a writing row with finger spaces.',
        watch: 'Have children put a finger after each word as they glue or write. A child who writes 4 for The rabbit hops. is counting beats: touch each word and count again.',
      },
    },
    'K:opinion-favorite-why': {
      title: 'My favorite and why: an opinion',
      objective: 'Children tell what they like best and why: they find the opinion and the reason in short pieces, then draw and write their own.',
      note: {
        mistake: 'Children name a favorite and give no reason, or give a reason that does not tell why they like it (blue because it is a color).',
        words: 'Model first on chart paper. Say: "My favorite time of day is night because it is quiet." Point to the part that tells what you like and the part that tells why. Read every instruction, sentence, and word bank aloud, pointing to each. A class vote with Class Graph (each child taps an answer) helps before day 2. Day 1, What I Like Best and Why: children circle what they like best in each row (any choice is right). Read each piece; children circle the sentence that tells what the writer likes best and draw a line under the sentence that tells why. On Level 3 the first sentence tells the topic and gets no mark. Day 2, My Favorite and Why: children circle one of three topics or my own, draw, and write. Level 1 prints My favorite, is, and because it is, with a word bank of reason words (a child may use his or her own word); Level 2 prints My favorite and because; Level 3 starts with I and has a word bank. A grey model on another topic shows the shape.',
        watch: 'Accept sounded-out spelling: fn for fun is right. A child who cannot yet write a word may tell it, and you write it. Check that the reason fits its thing: blue because it is cool is a reason.',
      },
    },
    'K:fact-draw-label-write': {
      title: 'Teach a fact: draw, label, and write',
      objective: 'Children name a topic, draw and label it, and write one or two facts about it.',
      note: {
        mistake: 'Children write a sentence about something else (A cow says moo. on a cat page), or label a part with the name of the whole animal.',
        words: 'Model first: draw a snail and label its shell and feelers. Say: "A snail can crawl. A snail has a shell." Read every instruction, sentence, and word bank aloud, pointing to each; read each sentence twice. Day 1, Facts and Labels: children put a check mark in the box of each sentence about the pictured animal, thing, or plant and an X in the box of the one about something else. Then they label two parts: Level 1 cuts out two cards and glues each in the box its line comes from; Levels 2 and 3 write the words of the word bank on the lines (on Level 3 one word names no part). Extra practice for day 1: the screen activity The Wobble Museum — Stick to the Topic (find the sentence about something else). Day 2, I Can Teach You a Fact: children circle one of three animals or my own, draw it, write two labels beside the box with a line to each part, and finish A ___ can ___ and A ___ has ___ (Level 1 with a word bank, Level 2 sounded out; Level 3 starts with A and has a word bank).',
        watch: 'Accept sounded-out spelling: wng for wing is right. A child who cannot yet write a word may tell it, and you write it. If an animal starts with a, e, i, o, or u, help the child write An. Ask, "How do you know?" A fact is something true that you saw or learned.',
      },
    },
    'K:small-moment-draw-write': {
      title: 'What happened to me: a small moment',
      objective: 'Children tell one small moment in the order it happened, draw and write it, and tell how they felt.',
      note: {
        mistake: 'Children tell a whole day (I got up. I ate. I went to school.) instead of one small moment, or leave out how they felt.',
        words: 'Model first: draw three boxes. Say: "I found a feather. I showed my teacher. I put it on the science table. I felt proud." Read every instruction and word aloud, pointing to each. Day 1, Put a Small Moment in Order: the sentences are printed out of order. Read the sentences as they are printed, pointing to each; read them again. Ask, "What happened first?" Children write 1 in that box, then 2 and 3 (Level 3: 1 to 4). Then they circle the face that shows how the writer felt (the last sentence shows it) and draw what happened last. Day 2, My Small Moment: children circle one of two moments or my own and draw it in three boxes: first, next, last. Level 1 writes I ___ for the last box and I felt ___; Levels 2 and 3 write I ___ beside each small box; on Level 3 the faces have no words and a word bank stands beside First.',
        watch: 'Accept sounded-out spelling. A child who cannot yet write a word may tell it, and you write it. Let a child say each sentence aloud before writing it; ask, "What happened next?" Mad means angry.',
      },
    },
    'K:authors-chair-add-detail': {
      title: 'Author\'s chair: a friend asks, I add',
      objective: 'Children read their writing to the class, answer a classmate\'s question, and add one detail to the picture or the words.',
      note: {
        mistake: 'Friends give praise (I like it.) instead of a question, or the author answers out loud but adds nothing to the page.',
        words: 'Model first with your own piece: read "I made a mask." A child asks, "What animal is it?" Say: "It is a fox mask." and add the detail with a colored pencil. Read every instruction, question, and sentence aloud, pointing to each. Day 1, A Friend Asks, I Add: read each piece, its question, and the sentences; children circle the sentence that answers the question (on Level 3 one choice only says the piece again). Day 2, Author\'s Chair: each author gets this page; staple it to the piece he or she read. Three children a day sit in the author\'s chair and read a piece they wrote in this unit. Pull a name with Name Sticks; that child asks one question. On Level 1 the friend asks with one of the four starters on the page, and the author circles it; on Levels 2 and 3 you or the friend write the question on the row. The author draws the new detail in the box and writes it (Level 1 one word, Level 2 one row, Level 3 a sentence), then checks I shared, I listened, and I added a detail.',
        watch: 'Accept sounded-out spelling. A child who cannot yet write a word may tell it, and you write it. Children need a finished piece from this unit. Teach questions that ask for a detail: Who? What? Where? When? A yes-or-no question gets no detail.',
      },
    },
    'K:onset-rime-blend': {
      title: 'Blend the first sound and the rest',
      objective: 'Children blend a spoken first sound and the rest of a one-syllable word (/m/ … /ŏp/) into the word and find its picture, and they split a word into its first sound and the rest.',
      note: {
        mistake: 'Children name a picture as soon as they hear the first sound, without the rest. Some add a vowel to a first sound (/buh/ for /b/).',
        words: 'Children should already hear the first sound of a word and hear rhymes. Model with words that are on no page (mop, man, sit, top). Say: “Listen: /m/ … /ŏp/. I put the parts together: mop. Your turn: /s/ … /ĭt/.” Day 1, K-681: read the teacher lines at the foot of the answer key, row by row: the first sound, a short wait, then the rest; never the whole word. Level 1: the first sound alone finds the word; still say the rest. Level 2: one first sound a row, so only the rest decides. Level 3: some pictures rhyme, some start alike: children need both parts. Day 2, K-682: name each picture for the class first. A child says a picture word in two parts, touching the small box (first sound) and the long box (the rest); a partner blends it. Level 1 words start with a sound you can stretch (/mmm/), level 2 with one you cannot (/b/). Level 3: circle the two that rhyme. On the screen: Blend Onset and Rime — Listen and Find the Word.',
        watch: 'On level 2 a child who hears only the first sound cannot choose: watch who waits for the rest. Goat and coat differ only in /g/ and /k/: say them clearly. The key writes a short vowel with a curve (/ŏp/), a long one with a bar (/ōp/).',
      },
    },
    'K:two-meanings': {
      title: 'Words with two meanings',
      objective: 'Children find the two meanings of a familiar word (a bat that flies, a bat for baseball) and choose the meaning that fits a sentence.',
      note: {
        mistake: 'Children pick the meaning they know best without listening to the sentence, or think one of the two pictures has the wrong name.',
        words: 'Children know the everyday meaning of each word. Model with duck, which is on no page. Say: “A duck is a bird. When a ball flies at you, you duck: you bend down fast. One word, two meanings.” Day 1, K-683: read the word at the start of each row, then its sentence two times from the teacher lines at the foot of the answer key; children circle the picture of what the word means in that sentence. Level 1: two pictures a row. Level 2: one more picture of something else. Level 3: you read two sentences a word; children circle the picture for the first and draw a line under the picture for the second. Sometimes both sentences use the same meaning: then both marks go under one picture. Day 2, K-684: read each word; children draw a line from its picture to the other picture that the same word names (levels 2 and 3: one picture has no partner). Level 3: children draw the familiar meaning of two words and say a sentence with each.',
        watch: 'Ask, “Which words in the sentence tell you?” A child who names them (bend down fast, for duck) is listening. On level 3 the third picture is another word\'s meaning: only the sentence rules it out. Accept any true drawing; the key says what counts.',
      },
    },
    'K:compare-two-stories': {
      title: 'Two stories, two adventures',
      objective: 'Children compare what happens to the characters of two stories and tell one thing that is the same and one that is different.',
      note: {
        mistake: 'Children sort a card by what could happen instead of what the story said, or put a card in Both because it is true of one story.',
        words: 'Children should already retell a story: who, where, what happened. Model with two tiny stories of your own: a cat loses a sock at school, a dog loses a sock at the park. Say: “Both lost a sock: that card goes in the middle, Both. Only the cat was at school: Story 1.” Day 1, K-685: read both stories two times, then each card: “Which story told us this? Or both?” Cut the cards before you sort, or sort first and glue last. Level 1: four cards; levels 2 and 3: five. Level 3: each child tells a partner one more thing that is the same. Day 2, K-686: choose a copy with another pair of stories. Name the faces first: happy, sad, tired, surprised, scared, angry. Children draw one thing that is the same and how the stories differ (Story 1 in box 1), then circle how each animal felt at the end. Level 3: children write a word for each drawing. Then use the same chart with two books your class knows. On the screen: Willow\'s Story Corner — Two Tales, Alike or Different? (Kindergarten).',
        watch: 'Every card is stated in its story: when a child disagrees, read the sentence back. A card goes in Story 1 only when Story 2 says something else. A sad face stands where the animal was sad before the end: the row asks about the end.',
      },
    },
  },
};
