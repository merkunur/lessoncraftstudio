'use strict';
/**
 * Teacher notes, English, literacy: the Grade 2 unit Reading to Learn: Informational Texts (Daily Teaching System,
 * Part 12.3, fourth run, 2026-11-16). Five teaching points: the main topic and each paragraph (G2-519), text
 * features (G2-523, G2-520), a text with a diagram (G2-521, G2-524), steps in order (G2-522, G2-525) and two animals
 * compared (G2-342). Each note was written from the pages the lesson hands out, in American English, and read by
 * one American Grade 2 teacher-reviewer with the pages (2026-11-16); every finding is in the text below.
 * Two notes of the unit Reading Stories and Writing (how characters meet a challenge, G2-526 and G2-527; fables and
 * their lesson, G2-529 and G2-528) were added by place-ready-j.en.literacy.js; the reviewer of the story pages read
 * them (2026-11-16, every finding applied).
 * The seven notes of the units Long Vowels and Vowel Teams and Bossy R and Longer Words (G2-530 to G2-534, G2-543 to
 * G2-548) were added by place-ready-s.en.literacy.js; the reviewer of the pages read them (2026-11-18, every finding applied).
 * The three word-building notes (G2-535 to G2-537: prefixes, suffixes, apostrophes) were added by
 * place-ready-v.en.literacy.js; the reviewer of the pages read them (2026-11-18, every finding applied).
 * The two notes on words in real life and on adjective or adverb (G2-549 to G2-551) were added by place-ready-cc.en.literacy.js;
 * the reviewer of the pages read them (2026-11-17, every finding applied).
 * The four notes of the unit Opinion Writing and Letters (G2-557 to G2-564) were added by place-ready-jj.en.literacy.js;
 * the reviewer of the pages read them (2026-11-17, every finding applied).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '2:main-topic-paragraphs': {
      title: 'The Main Topic and Each Paragraph',
      objective: 'Children name the main topic of an informational text of three paragraphs and tell what each paragraph is mostly about.',
      note: {
        mistake: 'Children name a detail as the main topic ("how beavers slap their tails") or a topic that is too wide ("animals that live in water"). For a paragraph they copy its first sentence instead of saying what the whole paragraph is mostly about, or they tell something from another paragraph.',
        words: 'The text is printed as three numbered paragraphs with no title and no headings, so children have to find the topic themselves. Read it once together. Ask: "What is every paragraph about? That is the main topic of the whole text." Then cover two paragraphs with a sheet of paper and reread the third: "What is THIS paragraph mostly about? Say it in a few words." On the easiest page, children read four statements and write the number of the paragraph next to each one. One statement fits no paragraph, so its box stays empty: say so before they start.',
        watch: 'A child who writes the same number twice has matched by a single word: have the child reread that paragraph and show you the sentences that fit the statement. On the writing pages, accept any wording that fits the whole paragraph; "what beavers build" is as good as the answer on the key. On the hardest page children also write a heading for each paragraph: a good heading is short and fits every sentence under it. In the on-screen activity children read short articles and tap the card that names the main topic, not a small detail: a quick check before or after the page.',
      },
    },
    '2:text-features': {
      title: 'Text Features: Glossary and Index',
      objective: 'Children name the features of an informational text (title, headings, bold words, captions, glossary, index) and use them to find facts quickly.',
      note: {
        mistake: 'Children mix up the glossary and the index: both are lists of words at the end of a text. They reread the whole text to answer a question that a heading or the index answers in a moment. Some read the number beside an index word as an amount, not as the place to look.',
        words: 'Start with the page Name the Text Features. Six lettered dots are placed on six parts of the text, and children write each letter next to the name of the part. Then ask about each part: "What is its job?" Say: "The glossary tells what a word MEANS. The index tells WHERE you can read about it." The three parts of each text are numbered 1, 2, and 3, like the pages of a small book, and the index names these numbers. On the page Glossary and Index, read each question and ask first, "Which part of the text will help us fastest?" Only then do children look for the answer.',
        watch: 'Ask a child to show you with a finger how the answer was found: a finger that goes straight to the heading, the caption, or the index shows that the feature is being used. On the hardest page children add one word to the index and one to the glossary. The index word has to stand in the text, with the number of its part beside it. The glossary entry has to tell what the word means; the child\'s own words are fine.',
      },
    },
    '2:diagram-and-text': {
      title: 'What the Diagram Shows',
      objective: 'Children read a diagram with labels and arrows together with a text, answer questions from the diagram, and tell what the diagram adds to the text.',
      note: {
        mistake: 'Children read the diagram like a sentence, from left to right, and stop at the last picture: they do not follow the long arrow back to the first stage. They answer a diagram question from memory or from the text. Asked what the diagram shows that the text does not, they repeat a sentence of the text.',
        words: 'Say: "A diagram is a picture that explains. The labels name each part, and the arrows show what comes next." Follow every arrow with a finger, including the long one at the bottom: "Where does it lead? Why?" Then compare: "The text tells what happens. Does it tell the NAMES of the stages? Where do we find them?" On the page Text or Diagram?, children check where they learn each fact; have them point to the sentence or to the place in the diagram first. Each fact is learned in one place only. Before reading, explain stage, phase, and, for the moon, quarter (a quarter moon looks like half a circle), but do not pre-teach caterpillar, chrysalis, larva, pupa, froglet, sprout, or seedling: the diagram teaches them.',
        watch: 'On the hardest page of What the Diagram Shows, one label and one arrow are missing. The name of the stage without a label is in the text; accept other true names too ("bean seed," "adult frog"). The arrow belongs in the gap between two stages and points to the right. For what the diagram shows that the text does not, and for the fact a child writes on Text or Diagram?, accept any true answer the child can point to: a stage name, the order, what a drawing shows. A fact that both tell, such as "butterflies lay eggs," does not count. On the moon page the long arrow also shows that the phases repeat; the text adds how often.',
      },
    },
    '2:steps-in-order': {
      title: 'Steps in Order: How It Is Made',
      objective: 'Children describe the steps of a how-it-is-made text in order with the words first, next, then, and finally, and tell why one step has to come before another.',
      note: {
        mistake: 'Children put the best-known step first (the bread in the oven) or keep the order in which the mixed-up steps appear on the page. In their own sentences they begin every step with "then." Asked why a step has to come first, they answer "because the text says so."',
        words: 'Read the text and have children put a finger on First, Next, Then, and Finally: "Each of these words tells us that a new step starts." Have four children say the four steps aloud in order, one step each, before anyone writes. On the easiest page the four steps are mixed up, and children number them 1 to 4. On the page Before and After, each sentence tells about two steps: "Which of the two happens earlier? Find both in the text." For the why-question ask: "What would go wrong if we left this step out?" Explain these words before reading, because the text uses them: hive, honeycomb, wax, dough, crust, mill, pulp, germs, cartons, grove, grease, yarn.',
        watch: 'On the writing pages a step is right when it tells what happens, in the child\'s own words; it does not have to match the key. Each box has two lines, so a whole sentence fits. Look at the first words: a child who writes "First, ... Next, ... Then, ... Finally, ..." has the order words; a child who writes "then" four times needs the four words on the board. A good why-answer names what the earlier step makes or changes: the chips have to be cooked because the sheet is made from pulp. On the page Before and After, a question about "the step right before" or "the step right after" is answered by anything that happens in that step: accept every action its paragraph tells. In the sentences that begin with Before or After, any earlier (or later) step makes a true sentence; the key shows only the nearest one.',
      },
    },
    '2:compare-two-animals': {
      title: 'Two Animals: Same and Different',
      objective: 'Children compare the facts of two animal fact files, sort them into same and different, and write what they found in sentences that name both animals.',
      note: {
        mistake: 'Children write a fact about one animal ("The eagle has feathers.") where the page asks for a comparison. Some decide by what they picture, not by the fact files: "A ladybug is small and an eagle is big," which neither fact file says.',
        words: 'Before anyone writes, draw a chart with three columns on the board: the fact, the first animal, the second animal. Fill it in together from the two fact files and mark each row S or D. Then turn rows into sentences with the comparing words of Grade 2: both, and, too for what is the same; but, while, unlike for what is different. Model one of each: "Both animals eat meat." "The ladybug is an insect, but the eagle is a bird." The Grade 2 standard asks children to compare the most important points of two texts on the SAME topic. This page compares two animals, so end the lesson with two short texts about one animal and ask, "Which point do both texts make? What does only one of them tell?"',
        watch: 'Read the four sentences each child wrote. A sentence about a difference has to name both animals and both facts; "They are different" is not enough. A sentence about what is the same should use both or too. If a child circled every row the same way, cover all rows but one and compare just that row. The on-screen activity compares two stories; the steps are the same: one point at a time, across both.',
      },
    },
    '2:character-challenge': {
      title: 'How Characters Meet a Challenge',
      objective: 'Children describe how a character in a story responds to a problem: what the character does, how the character feels, and what happens because of it.',
      note: {
        mistake: 'Children retell the whole story instead of naming the problem. They say what the character should have done, not what the character did, or they give their own feeling ("I would be sad") for the character\'s. In cause and effect they write two things that happen one after the other without one making the other happen.',
        words: 'Read the story aloud once, then read it together. Ask three questions in the same order every time: "What happens to the character? What does the character do about it? How does the character feel?" Have children point to the sentence that tells them. On Level 1 of the How a Character Meets a Challenge page children circle answers; on Level 2 they write them; on Level 3 they also tell what they would have done in the character\'s place. On the What Happens and Why page say: "A cause makes something happen. The effect is what happens." Try each pair aloud with "so" between the two: "The hare felt sure that he would win, so he lay down for a nap." On Level 3 children write one pair as a sentence with because or so.',
        watch: 'An answer is right when the story supports it, in the child\'s own words. For the feeling, accept a word that fits the story even if it is not the word on the key: "embarrassed" for ashamed, "scared" for afraid. Ask "How do you know?" and have the child show the sentence. On Level 3, any choice is fine if the reason fits the story. In the one-sentence task, check the direction: the cause comes after "because" or before "so."',
      },
    },
    '2:fable-lesson': {
      title: 'Fables: What Is the Lesson?',
      objective: 'Children retell a fable by its beginning, middle, and end and tell the lesson it teaches.',
      note: {
        mistake: 'Children retell only the part they liked best, or they tell the middle and the end and leave out how the story begins. For the lesson they repeat what happens ("The tortoise won") or give a rule about the animals ("Hares should not nap") instead of a lesson for people.',
        words: 'Tell children: "A fable is a short story that teaches a lesson. Often its characters are animals or things that act like people." Start with the Beginning, Middle, and End page: on Level 1 children put three sentences in order; on Levels 2 and 3 they write the three parts themselves (save Level 3 for Day 2, or model one lesson first: it also asks for the lesson). Hold up three fingers: "First ... then ... in the end ..." Then turn to the What Is the Lesson? page: "What did the character learn? What can we learn from it?" On Level 1 children circle the lesson and check the two sentences that show it; on Level 2 they write the lesson and what a character does that shows it; on Level 3 they also tell how the ending teaches the lesson. Have children say the lesson so that it fits a person, not only a hare or a dog.',
        watch: 'A retelling is right when the three parts are in order and the ending is there; small details may be left out, and it does not have to match the key. Accept any lesson that is about people and fits the whole story. "The tortoise won the race" is a retelling: ask "So what does the story teach us?" On Level 1 of the What Is the Lesson? page one of the three sentences is not in the story: a child who checks it has not gone back to the story.',
      },
    },
    '2:short-or-long-vowel': {
      title: 'Short or Long Vowel?',
      objective: 'Children tell short from long vowels when they read regularly spelled one-syllable words (hop and hope, step and steep, ran and rain) and sort printed words by the vowel sound.',
      note: {
        mistake: 'Children read every vowel as short (hop for hope) and skip the silent e or the second letter of a vowel team (ran for rain). Some sort by looking for an e anywhere in the word instead of reading it, and put bed or step under long.',
        words: 'Write hop and hope. Say: "A short vowel says its sound: hop. A long vowel says its name: hope." Mark the vowels the US way: a breve over the o of hop, a macron over the o of hope, and cross out the silent e. Do the same with ran and rain, step and steep: the second vowel of a team is silent too. On Level 1 children circle the word for four pictures from two words such as cap and cape, sort six words under short vowel and long vowel, and circle the word that fits in two sentences. On Level 2 they sort eight words, half of them with blends and digraphs, and circle the word in four sentences. On Level 3 they sort six harder words and cross out the one word that is neither short nor long (car, star, park, cow, now, or boy), write the word for three pictures (the first letter is printed), and write the word that fits a sentence, choosing from the two words beside it. On screen, Add the Magic e builds the same short and long pairs.',
        watch: 'A child who sorts by sight alone puts bed under long because it has an e: have the child read the word aloud and listen for the vowel. In the sentences both words are real (cub and cube), so only the meaning tells which one fits; ask the child to read the sentence with the word chosen. On Level 3 a child may write bote for boat: both say long o, so point to the vowel team on the word wall.',
      },
    },
    '2:vowel-teams-long-a-e-o': {
      title: 'Vowel Teams for Long a, e, and o',
      objective: 'Children read and spell one-syllable words with the vowel teams ai, ay, ee, ea, oa, and ow, and choose the team for a word: first by its vowel sound, then by its place in the word.',
      note: {
        mistake: 'Children pick a team of the right sound in the wrong place (trayn, snoa), mix the two teams of long e (sleap, beech for beach), or hear the long vowel and write one letter (tran).',
        words: 'Review the three long vowels and their teams: "ai and ay spell long a. ee and ea spell long e. oa and ow spell long o." Then the places: "ai and oa come in the middle of a word: chain, float. ay and ow come at the end: spray, throw." On Level 1 each copy works on one long vowel: children write its two teams into six words (the rule is printed for long a and long o; for long e the line says that ee and ea say the same sound), write the word for two pictures (the first letter is printed), and finish two sentences from a box of four words. On Level 2 they sort six words of two long vowels by their sound, then write the team that makes a word in nine words, choosing among four teams. On Level 3 they choose among all six teams for six words, write the word for a long a, a long e, and a long o picture, and finish two sentences from a box. On screen, Build Vowel-Team Words and the vowel-team level of Word Doctor\'s Clinic give more practice.',
        watch: 'Both teams of a sound read the same, so reading aloud cannot show which is right. The rule decides between ai and ay, oa and ow. For ee and ea the child must know how the word looks: have them write it both ways and pick the one that looks right. On Level 2 the sound decides the column: rain and play both go under long a. Every ow on these pages says long o (snow, grow); cow and now come in the next lesson. The word box always holds two words that fit neither sentence.',
      },
    },
    '2:vowel-sounds-oo-ou-ow-oi-oy': {
      title: 'Vowel Sounds: oo, ou, ow, oi, and oy',
      objective: 'Children read and spell words with oo (moon, book), ou and ow (cloud, cow), and oi and oy (coin, boy), and read them in sentences and riddles for meaning.',
      note: {
        mistake: 'Children give every oo the sound of moon, even in book; read ow as long o in down and town; and put ou or oi at the end of a word (cou, boi).',
        words: 'Day 1, G2-532: say "oo can say two sounds: the sound in moon and the sound in book." Then: "ou comes in the middle of a word: shout. ow comes at the end: how. ow comes before a last n or l: town, howl. oi comes in the middle: soil. oy comes at the end: boy." Children sort words and write the team into words. Day 2, G2-543: the same spellings in sentences. Children circle yes or no ("A cow can bark."), write the answers to riddles (from a box; on Level 3 the first letter is on the line), and draw what a sentence says. On both pages Level 1 reads oo, Level 2 ou, ow, oi, and oy, and Level 3 all five.',
        watch: 'A child who answers yes to "A cow can bark." may have guessed from one word: have them read the whole sentence aloud. ow can also say long o (snow); these pages never use it that way. The word hoop is never sorted on Day 1: many say it with the oo of book. you is a heart word; its ou is not the ou of cloud.',
      },
    },
    '2:bossy-r-ar-or': {
      title: 'Bossy r: ar and or',
      objective: 'Children read and spell words in which r changes the vowel, ar as in park and or as in storm, and read them in sentences and riddles for meaning.',
      note: {
        mistake: 'Children read the vowel as short and add the r as a separate sound, drop the r in spelling (cat for cart), or write ar where or belongs (barn for born).',
        words: 'Day 1, G2-533: write cat and cart. Say: "Bossy r changes the vowel sound: ar says the sound in park." Then or: storm, fork, corn. Children match words to pictures, write ar or or into words, sort, and circle the word that fits a sentence. Day 2, G2-544: children circle yes or no ("A shark can swim."), write the answers to riddles (from a box; on Level 3 the first letter is on the line), and draw what a sentence says. On both pages Level 1 reads ar only, and Levels 2 and 3 read ar and or.',
        watch: 'Words like war, warm, word, and work look like these but say other sounds; they are not on these pages. A child who writes barn for born hears the r but not the vowel: read both words aloud and ask which one fits.',
      },
    },
    '2:er-ir-ur': {
      title: 'er, ir, and ur: One Sound, Three Spellings',
      objective: 'Children read words with er, ir, and ur, which say the same sound (her, first, turn), check which spelling a word uses, and read the words in sentences and riddles.',
      note: {
        mistake: 'Children spell the sound with the one spelling they know best (berd, shurt) or with r alone (brd), and stop checking because the word sounds right.',
        words: 'Day 1, G2-534: say "er, ir, and ur say the same sound: her, first, turn." Children write er into words, sort words under er, ir, and ur, circle the spelling that looks right, and write words for pictures. Day 2, G2-545: children circle yes or no ("A cat has fur."), write the answers to riddles (from a box; on Level 3 only the first letter is on the line, so the child chooses er, ir, or ur), and draw what a sentence says. On both pages Level 1 reads er only, and Levels 2 and 3 read er, ir, and ur.',
        watch: 'Praise checking, not hearing: when a child is unsure, have them write the word two ways and pick the one that looks right. here, there, and where have the letters but not the sound; they are crossed out on Day 1 and are not on the Day 2 page.',
      },
    },
    '2:long-vowels-two-syllable-words': {
      title: 'Long vowels in two-syllable words',
      objective: 'Children split two-syllable words that have a long vowel in one syllable (rainbow, cupcake, paper), read each syllable, and read the words in sentences.',
      note: {
        mistake: 'Children read the first vowel as short (pap-er for paper), split a compound word in the wrong place, or guess a long word from its first letters.',
        words: 'Write rain | bow and say "A compound word splits between its two small words." Then cup | cake: "A silent e at the end makes the vowel long." Then pa | per: "When a syllable ends with a, e, i, o, or u, the letter says its name." On G2-546 children draw a line between the two syllables of twelve words, circle each syllable with a long a, e, i, o, or u, and circle the word that fits in six sentences. On G2-547 they finish six words from a first part and a part from a box (rain + bow), then circle yes or no for sentences. Level 1 has compound words with a vowel team, Level 2 words with a silent e, Level 3 words whose first syllable ends with its long vowel.',
        watch: 'Some words have two long syllables (oatmeal, pinecone, photo): circle both. Do not circle a second syllable with a quick weak sound (paper, tiger, open, bacon). In playground only play is long: ground\'s ou is not a long vowel. Have the child read each part aloud, then the whole word.',
      },
    },
    '2:tricky-words-could-would-should': {
      title: 'Tricky words: could, would, should',
      objective: 'Children read and spell could, would, should, because, and friend by mapping the sounds they know and learning the tricky part by heart.',
      note: {
        mistake: 'Children spell the words the way they sound (cud, wud, becuz, frend), or leave out the silent l of could, would, and should.',
        words: 'Say: "Some words have a part that does not follow the rules. We learn that part by heart." Write could in sound boxes: c, oul, d. The c and the d say the sounds children know; oul says the oo of book, and the l makes no sound, so it gets a heart. would and should work the same way: one heart over oul. In because the heart goes over au, in friend over ie. On the page children write the letters for each sound in a box and draw a heart over the tricky part; then they write the heart word that fits a sentence, with its first letter on the line. Levels 2 and 3 add again, any, many, people, does, or other: the heart goes over ai, a, a, eo, oe, o. Level 1 has four words (could, would, should, and because or friend) and four sentences; Level 2 six words and three sentences; Level 3 six words, one sentence, and a sentence of their own with two heart words from the page. On screen, Heart Words runs the same routine of sound boxes, a heart, and writing. Its first shelf (the, of, to, do, was, said, you, have, come, some) is open to everyone, with the whole routine and the printable word cards, and a teacher can type any word and show it to the class (the list is not kept). The Teacher plan adds the other eleven shelves, among them could, would, should, friend, and because; a saved list of her own words; and the wall and take-home sheets.',
        watch: 'A dashed line marked "Fold back" runs under the words: on Levels 2 and 3 the child folds the top back and writes the sentences from memory, then unfolds it to check. The heart goes over the tricky letters only: the c and d of could keep their usual sounds.',
      },
    },
    '2:prefixes-un-re': {
      title: 'Prefixes un- and re-',
      objective: 'Children tell the meaning of a word formed when un- or re- is added to a known word (happy and unhappy, tell and retell).',
      note: {
        mistake: 'Children read the base word and skip the prefix: they circle fair for "not fair" or write fold for "fold again." Some mix the two prefixes up and write retie for "the opposite of tie."',
        words: 'Say: "A prefix is a word part at the start of a word. It changes what the word means. un- means not or the opposite of: unhappy means not happy, and unlock is the opposite of lock. re- means again: retell means tell again." Write happy on the board, add un-, and read both words. Day 1, the page. Level 1 (un- only): children add un- to words and write each new word (a done example in grey, then 3 more), circle the word that means "not fair" or "the opposite of fold" among three words in five rows, and circle the word that fits in three sentences; sometimes the word without un- is the one that fits. Level 2 (un- and re-): children read two meanings (not safe, fold again) and write the new word, draw lines from four words of two base words (untie, retie, unload, reload) to their meanings, and write un or re in the gap of three sentences. Level 3 adds pre-, which means before: two meanings to write, three sentences with un, re, or pre, and one sentence of their own that uses both words from part 1. Day 2, Marigold\'s Knowing Machine on screen: children read a built word and tap what it means. pre- is on the page only.',
        watch: 'Have children read a sentence with each word before they choose: "Hold my hand so you stay unsafe" sounds wrong. The base word never changes its spelling: un + tie, re + fill. Every gap on Levels 2 and 3 takes a prefix, so the child reads the whole sentence to know which one fits. Some words only look as if they start with un- or re- (uncle, under, ready): take the letters away and no word is left.',
      },
    },
    '2:suffixes-ful-less-ly': {
      title: 'Suffixes -ful, -less, and -ly',
      objective: 'Children read words with the suffixes -ful, -less, and -ly (helpful, careless, slowly) and say what the suffix adds.',
      note: {
        mistake: 'Children read the suffix as a word of its own (care full) and spell -ful with two l\'s (carefull). In a sentence some write careful where the sentence needs careless, because they read only the base word.',
        words: 'Say: "A suffix is a word part at the end of a word. -ful means full of: helpful means full of help. -less means without: careless means without care. -ly tells how: slowly means in a slow way." Write help on the board, add -ful and then -less, and read the three words. Day 1, the page. Level 1 (-ful only): children circle the base word and underline -ful in six words (a done example in grey, then 5 more) and read each word to a partner, read meanings (full of skill) and write the -ful word (a done example in grey, then 3 more), and circle the word that fits in four sentences: the base word or its -ful word. Level 2 (-ful and -less): children mark six words, draw lines from four words of two base words (careful, careless, painful, painless) to their meanings, and write ful or less in the gap of three sentences. Level 3 adds -ly: children mark six words and cross out the one word that has no suffix, match four words, and write ful, less, or ly in three sentences. Every gap takes a suffix. Day 2, Marigold\'s Knowing Machine on screen: children read a word with -ful or -less and tap what it means; -ly is on the page only.',
        watch: 'The suffix -ful has one l: careful. On these pages the base word keeps its spelling: care + ful, safe + ly. Some words only look as if they had a suffix (jelly, belly, silly, fly, bless): take away -ly or -less and no word is left (jel, bel, sil, f, b). Ask "How?" for an -ly word: How did the turtle crawl? Slowly.',
      },
    },
    '2:apostrophes': {
      title: 'Apostrophes: can\'t and the dog\'s bowl',
      objective: 'Children use an apostrophe to write contractions (can\'t, it\'s, we\'re) and common possessives (the dog\'s bowl).',
      note: {
        mistake: 'Children put the apostrophe where the two words meet instead of where the letters are left out (do\'nt), or leave it out (dont). For an owner some write dogs with no apostrophe, or put an apostrophe in every word that ends in s.',
        words: 'Say: "An apostrophe takes the place of letters that are left out: do not becomes don\'t, and the apostrophe stands where the o was. An apostrophe and s also show who owns something: the dog\'s bowl is the bowl that belongs to the dog." Day 1, the page. Level 1 (contractions only): children write contractions from their words (a done example in grey, it is → it\'s, then 5 more), draw lines from four contractions to the two words they stand for (two first words, such as we and they, so both parts must be read), and write the two words for three contractions. Level 2 adds owners: three contractions to write, three to write the two words for, and owners with a thing, each a picture or a child\'s name printed with its word, to write as dog\'s bowl or Mia\'s kite (a done example in grey, then 3 more). Level 3: six contractions, three to write and three to write the two words for, two sentences (The kite belongs to Mia.) to write as Mia\'s kite, and four sentences with one missing apostrophe: children write that word with its apostrophe. Day 2, Nib\'s Apostrophe Seat on screen: children read two words and choose the contraction with the apostrophe in the right place. Owners with \'s are on the page only.',
        watch: 'The contraction can\'t is short for cannot. The contraction won\'t (will not) changes its spelling; it is not on the pages. Every owner on these pages is one owner. The word its, with no apostrophe, stands only on Level 3: "Its time for bed" needs it\'s. When the word to fix starts a sentence, accept a lowercase first letter.',
      },
    },
    '2:words-in-real-life': {
      title: 'Spicy, juicy, crunchy: words in real life',
      objective: 'Children connect describing words to real things and places they know (foods that are spicy or juicy, places that are noisy) and use them in sentences.',
      note: {
        mistake: 'Children pick a thing they like instead of one the word describes (spicy: ice cream), or a word that goes with another word of the sentence: for "The lunchroom is ___ when we all talk," some circle crunchy because of lunch.',
        words: 'Say: "A describing word tells what a real thing is like: how it tastes, feels, looks, or sounds. An orange is juicy." Teach calm (quiet and still: a still pond) and gloomy (dark and sad-looking: a rainy day) first. Day 1, G2-549. Level 1: circle the picture each word describes; three sentences. Level 2: match six words to pictures (one picture is left over); two sentences. Level 3: circle the two things each word describes; three sentences. Day 2, G2-550. Level 1: draw or write two real things for four words; finish two sentences (A juicy fruit is ...). Level 2: four words, then a sentence of their own. Level 3: four words, then a riddle with two of them (I am prickly and juicy. What am I?).',
        watch: 'Tastes differ, so on day 2 accept any food a child calls spicy. The key\'s things and sentences are samples: accept any real thing the word describes, not one it does not (a juicy rock); ask the child why. On day 1 no picture, thing, or sentence goes with two words of its page; some go with none (the picture left over on level 2).',
      },
    },
    '2:adjective-or-adverb': {
      title: 'Adjective or adverb?',
      objective: 'Children tell adjectives from adverbs and choose between them to describe a noun or a verb (a quick dog, the dog ran quickly).',
      note: {
        mistake: 'Children choose the -ly word because it looks longer and harder, or the shorter word every time. Some draw the arrow to the next word, even when the word it tells about stands before it (The lion is loud: loud tells about lion).',
        words: 'Say: "An adjective tells about a noun: a slow turtle. An adverb tells about a verb, how it is done: the turtle walked slowly. Many adverbs end in -ly." Ask: "Does the word tell about a person or thing, or about how someone did something?" Day 1, the page: the child circles the word that fits and draws an arrow from it to the word it tells about. Level 1: five sentences with pictures, then four words to sort. Level 2: six sentences, then short frames (a ___ boy, asked ___). Level 3: four sentences with good and well, then two of their own. Day 2, Glim\'s Describing Words — Adjectives & Adverbs on screen: children tap the word that fits; after a wrong tap, Glim says whether the blank tells about a thing or an action.',
        watch: 'On the page an adjective stands before its noun (a soft pillow) or after is, are, was, or were; on screen it also comes after looks or felt (The kitten looks sleepy) and still tells about the noun. An adverb stands before its verb or at the end (smiled kindly). The level-1 sort can be done by the -ly ending alone; the sentences show who chooses by meaning. happy changes y to i before -ly (happily); the page that holds it prints the rule. good tells about a noun and well tells how something is done: "sings good" needs well. Words with no -ly form (fast, hard, late) are not on the pages, and loud, slow, and quick never stand where "talk loud" could be said. The key\'s own sentences are samples: accept any where the adjective tells about a noun and the adverb about a verb.',
      },
    },
    '2:plan-an-opinion': {
      title: 'Plan an opinion: reasons and linking words',
      objective: 'Children state an opinion about a topic and plan two or three reasons with linking words (because, and, also) and a closing sentence.',
      note: {
        mistake: 'Children write a fact about themselves (I like pandas) instead of a view others can disagree with (Pandas are the best animals at the zoo), give a reason that does not tell why, or end with the opinion word for word.',
        words: 'Children need no page from an earlier lesson. Model first on a topic that is on no page: plan one piece about pandas on the board. Say: "An opinion tells what you think. A reason tells why. A closing sentence says the opinion again in new words, often with That is why." Day 1, Parts of an Opinion Piece: children write the letter of each mixed-up sentence of a short piece in the plan, then circle because, also, or and in gaps. On Level 3 one reason has no opener, and one sentence does not belong. Day 2, Plan Your Opinion Piece: children circle question A or B and plan: Level 1 frames, Level 2 starters (I think, because, also, That is why), Level 3 open rows, three reasons, and a word bank. Grey examples are on another topic: Level 1 fills the frames for another question; Levels 2 and 3 give notes on an animal or something in nature.',
        watch: 'Read each gap aloud with both words: because joins two sentences; in these gaps, also comes right before a doing word (They also hide nuts), and joins two words (black and white). The key\'s plan is a sample; accept any opinion whose reasons tell why.',
      },
    },
    '2:draft-an-opinion': {
      title: 'Draft an opinion piece',
      objective: 'Children draft an opinion piece from their plan, with an opinion sentence that names the topic (the introduction at Grade 2), reasons joined by linking words, and a closing sentence (the standard\'s concluding statement).',
      note: {
        mistake: 'Children copy their notes without making sentences, join every reason with and into one long sentence, or end with a new idea instead of their opinion again.',
        words: 'Children need their plan from Plan Your Opinion Piece: the draft of a copy number offers the two questions of the plan of that number; a child without a plan circles one. Model first on a topic that is on no page: "because they eat bamboo all day" becomes "One reason is that they eat bamboo all day." Day 1, Write Your Opinion Piece: rows under Opinion, Reasons, and Closing sentence. Level 1 frames (the second reason: It is also great because ___.), Level 2 starters, Level 3 open rows, three reasons, and a word bank. Day 2: reread with the checklist and add the spare-row sentence (Levels 1 and 2) or the third reason (Level 3). Day 3, Revise Your Opinion Piece: children circle what fits each gap of a short piece: the closing sentence (Level 1), a reason (Level 2), or both (Level 3); a partner listens and both check the parts; then the child writes one more reason (Level 1) or a reason or a closing sentence (Levels 2 and 3) and adds it with a caret (^).',
        watch: 'The opinion copied after That is why is never the closing sentence. The keys are samples; accept any reason that tells why.',
      },
    },
    '2:friendly-letter': {
      title: 'A friendly letter',
      objective: 'Children write a friendly letter with a date, a greeting, a body, a closing, and a signature, and use commas after the greeting and the closing.',
      note: {
        mistake: 'Children leave out the commas, put the comma after Dear (Dear, Sam), or write the closing and the signature on one line. Some forget the date.',
        words: 'Model first: write a short letter on the board and name the five parts: date (some programs call it the heading), greeting, body, closing, signature. Say: "A comma goes right after the greeting and right after the closing: Dear Sam, ... Your friend," Day 1, Parts of a Friendly Letter: children write the name of each part on the line beside it, using the word bank. Level 1 tells them where the two commas go; on Level 2 they find the two missing commas; on Level 3 one comma is in the wrong place, so they cross it out and add the two that belong. Levels 2 and 3 say that the date keeps its comma. Levels 1 and 2 end with greetings and closings to circle; Level 3 asks for a greeting and a closing to another reader. Day 2, Write a Friendly Letter: children need the five parts from day 1. They circle who they will write to and write about the topic on the page. Level 1 gives a frame on the first three rows of the body, Level 2 starters, Level 3 open rows. Grey examples come from a letter of another kind (Level 1: none under Body; Level 3: none).',
        watch: 'The bodies hold no other comma. The day-2 topic is never the kind of the day-1 letter of the same copy. The keys are samples.',
      },
    },
    '2:capitals-special-names': {
      title: 'Capitals for holidays, places, and brand names',
      objective: 'Children capitalize holidays, product names, and geographic names in sentences: each big word of a holiday or a place, and the brand of a product.',
      note: {
        mistake: 'Children capitalize every noun (River, Park), or only the first word of a name (Hudson river), or the thing after a brand (Pemmo Paper). Some capitalize seasons (Winter) because holidays have capitals.',
        words: 'Model first: write "the river" and "Hudson River" on the board. Say: "In the name of a holiday or a place, each big word starts with a capital letter: Groundhog Day, Hudson River. Small words such as of stay small: Statue of Liberty. In a product name, only the brand gets a capital, not the thing: Pemmo paper." The product names on the pages are made up, so no real brand is on them. Day 1, Find the Capital Letters: children circle each word that is missing its capital letter in six sentences, then sort words in a table. Level 1 has holidays only; Level 2 holidays and places with pairs (a lake and the name of a lake), each word written again; Level 3 sorts names: holiday, place, or product name. Day 2, Write the Capital Letters: children need the rules from day 1; they write each sentence again with its capitals. Level 3 ends with a sentence about their own town, city, or state.',
        watch: 'Seasons and words such as holiday, river, and street stay small unless they are part of a name. No sentence starts with a name: the first word already has its capital, so every capital to add belongs to a name.',
      },
    },
  },
};
