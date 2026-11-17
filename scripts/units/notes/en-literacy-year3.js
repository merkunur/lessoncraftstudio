'use strict';
/**
 * Teacher notes, English, literacy: the four lessons of the Grade 3 unit Reading to Learn: Informational Texts
 * (Daily Teaching System, Part 12.3, seventh and eighth run, 2026-11-16; placed by place-ready-h.en.literacy.js).
 * Answer with evidence (G3-494, G3-495), main idea and key details (G3-497, G3-496), text features and search tools
 * (G3-498, G3-499), events in order and cause and effect (G3-500, G3-501). Each note was written from the pages the
 * lesson hands out, in American English, and read by one American Grade 3 teacher-reviewer against the pages
 * (2026-11-16); every finding is in the text below. A note has to fit its sheet of the teacher guide
 * (build-guide.js): about 1,900 letters in all; the first drafts of 2,100 to 2,400 ran past the foot and were cut.
 * The four notes of the unit Stories: Evidence, Lessons, and Characters (G3-502 to G3-509) were added by
 * place-ready-i.en.literacy.js; the reviewer of the story pages read them (2026-11-16, every finding applied).
 * The note of the lesson Maps, Diagrams, and Photos (G3-510, G3-511) was added by place-ready-p.en.literacy.js; the
 * reviewer of the pages read it (2026-11-17, every finding applied).
 * The four notes of the unit Reading Long Words (G3-512 to G3-519) were added by place-ready-x.en.literacy.js;
 * the reviewer of the pages read them (2026-11-18, every finding applied).
 * The five notes of the unit Sentences and Conventions (G3-520 to G3-529) were added by place-ready-y.en.literacy.js;
 * the reviewer of the pages read them (2026-11-18, every finding applied).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '3:answer-with-evidence': {
      title: 'Answer with Evidence',
      objective: 'Children ask and answer questions about an informational text and show the paragraph and the sentence that prove each answer.',
      note: {
        mistake: 'Children answer from what they think they know ("Penguins live at the North Pole") instead of from the text, or they name the paragraph where they first saw a word of the question. Asked to prove an answer, they copy the first sentence of the paragraph. Their own questions ask something the text does not answer ("Do astronauts get scared?").',
        words: 'Read the text once together; the paragraphs are numbered. Model one question aloud: "How do I know? I put my finger on the sentence that tells me. It is in paragraph 2." Use the sentence frame "The text says ..." on both days. On Level 1 of the Answer with Evidence page the paragraph number is printed after each question; on Level 2 children find the paragraph themselves; on Level 3 they also copy the sentence that proves the answer. On the Ask and Answer page a sentence from the text is the answer, and children find or write the question. Say: "A question word tells what kind of answer is coming: where asks for a place, when for a time, why for a reason, how for a way, who for a person." Before reading, teach the hard words of your text, such as lens, laboratory, huddle, telegraph, or baleen.',
        watch: 'An answer is right when the text supports it, in the child\'s own words or in the words of the text; a full sentence is not required. The paragraph number has to match: a child with the right answer and the wrong number probably answered from memory or matched a single word, so have the child go back and touch the sentence. On Level 3, accept any sentence of the right paragraph that proves the answer; the key shows one. For a child\'s own questions, check three things: the text answers the question, the answer is correct, and the paragraph number is where the answer is found.',
      },
    },
    '3:main-idea-key-details': {
      title: 'Main Idea and Key Details',
      objective: 'Children tell what each paragraph of an informational text is mostly about, determine the main idea, and explain how the key details support it.',
      note: {
        mistake: 'Children give the topic in one word ("lighthouses") instead of the main idea, which is a whole sentence about the topic. Or they pick the most interesting detail (a blue whale\'s tongue can weigh as much as an elephant), or a sentence so broad that it could fit a hundred other texts ("Many animals live in the ocean"). For a summary they copy the first sentence of each paragraph.',
        words: 'Start with the Main Idea of Each Paragraph page: the text is printed without its headings. Cover three paragraphs with a sheet of paper and read one: "What do all these sentences tell about?" Then move to the Main Idea and Key Details page: "The topic is what the text is about: blue whales. The main idea is what the text says about the topic, in a sentence." Test a main idea with the question "Does every paragraph fit under it?" A sentence that only one paragraph fits under is a detail (too narrow); a sentence that could fit many other texts is too broad. Key details hold the main idea up; ask of each: "How does it help show the main idea?" For the summary on Level 3 say: "Main idea first, then two or three key details, in your own words."',
        watch: 'On the writing levels, accept any main idea that is a sentence, names the topic, and fits all four paragraphs; it does not have to match the key. A child who writes "It is about penguins" has the topic: ask "What does the text say about penguins?" A small fact, such as a single year or number, is usually a detail, not a key detail. On Level 1 of the Main Idea and Key Details page one of the four sentences is not in the text: a child who checks it has not gone back to the text. In a summary, look for the main idea and at least two key details, and no copied sentences.',
      },
    },
    '3:text-features-search-tools': {
      title: 'Text Features and Search Tools',
      objective: 'Children use the table of contents, headings, key words in bold, a sidebar, the glossary, and the index of a text to find information quickly.',
      note: {
        mistake: 'Children reread the whole text to answer a find-it question instead of going to the text feature that takes them straight there. They mix up the table of contents (the chapters in the order of the book) and the index (important words in ABC order with every page they are on). They skip the sidebar because it sits outside the main text.',
        words: 'The text is printed as a small book: each paragraph is a page with its page number, and the book has a table of contents, a key word in bold on every page, a sidebar, a glossary, and an index. Point to each text feature and name its job: "The table of contents lists the chapters in order and the page where each begins. The index lists important words in ABC order and every page that tells about them. The glossary tells what the key words in bold mean. A sidebar gives an extra fact." On Levels 1 and 2 of the Use the Text Features page each question names the feature; on Level 3 children write the answer and the letter of the feature that helped them find it. On the Which Text Feature? page they decide which feature they would use. Bring a real nonfiction book and find its table of contents, glossary, and index together.',
        watch: 'Watch how a child finds an answer, not only the answer: a child who reads every page to find "fog" has not used the index. An index answer has to name every page, not just the first one. For the index task of Level 3, accept any important word that really stands on the named page, with that page number. On Levels 1 and 2 of the Which Text Feature? page one feature is left over, the heading: the table of contents shows all the headings in one place. On Level 3 a child\'s own question is right when the feature answers it (what a word means for the glossary, which pages tell about a word for the index).',
      },
    },
    '3:events-cause-effect': {
      title: 'Events in Order, Cause and Effect',
      objective: 'Children describe how the events, steps, and ideas in an informational text connect, using words of time and sequence and of cause and effect (because, so).',
      note: {
        mistake: 'Children list facts in the order they remember them, not in the order of the text, and begin every sentence with "then." They turn cause and effect around ("The Pony Express closed, so a telegraph line was built"). With because and so they pick the wrong word: "because" goes before the cause, "so" goes before the effect.',
        words: 'Say: "A cause makes something happen. The effect is what happens. Ask \'Why did it happen?\' to find the cause, and \'What happened because of it?\' to find the effect." Model with a pair from the classroom and say it both ways: "It started to rain, so we had recess inside. We had recess inside because it started to rain." On the Events in Order page the task names what the four events or steps tell (for example, how a blue whale breathes); have children find that part of the text first. On Level 3 they also choose one event and tell why it happens or what it leads to. On the Cause and Effect page, Level 1 matches causes with effects; on Level 2 children write the missing half; on Level 3 they also write both halves as one sentence with because or so.',
        watch: 'On the writing levels an event or an effect is right when it comes from the text, in the child\'s own words; it does not have to match the key. In a chain, check the order against the text: what comes first in the text, or what causes the next thing, comes first. In the one-sentence task, check the direction: the cause comes after "because" or before "so." A child who writes two sentences without because or so has the facts but not the connection: ask "Which one made the other happen?" If a child matches an effect to the wrong cause, have the child read the pair aloud with "so" between them and ask whether the text says that.',
      },
    },
    '3:story-evidence': {
      title: 'Show Where the Story Says It',
      objective: 'Children ask and answer questions about a story and show the paragraph and the sentence that prove each answer.',
      note: {
        mistake: 'Children answer from a version of the story they already know instead of from this text. They give the right answer with the wrong paragraph, or copy a sentence that is near the answer but does not prove it. Their own questions ask about things the story does not tell ("What was the lion\'s name?").',
        words: 'Read the story aloud once, then have children read it again on their own; the paragraphs are numbered. Model: "How do I know? I put my finger on the sentence. The story says ..." On Level 1 of the Show Where the Story Says It page the paragraph number is printed after each question; on Level 2 children find the paragraph; on Level 3 they also copy the sentence that proves the answer. On the Ask and Answer About a Story page a sentence from the story is the answer, and children circle or write the question; on Level 3 they write three questions of their own. Remind them: who asks for a character, what for a thing or an event, where for a place, when for a time, why for a reason, how for a way. A good question can be answered by pointing to the story.',
        watch: 'An answer is right when the story supports it; a full sentence is not required. Check the paragraph number: a child with the right answer and the wrong number probably answered from memory, so have the child touch the sentence. On Level 3, accept any sentence that proves the answer; the key shows one. A child\'s own question is right when it begins with the given word, the story answers it, and the paragraph number is where the answer is found.',
      },
    },
    '3:central-message': {
      title: 'Retell a Story and Find Its Central Message',
      objective: 'Children retell a fable or folktale in order, determine its central message, and explain how the events of the story show it.',
      note: {
        mistake: 'Children retell every detail instead of the main events, or they leave out the ending. For the message they retell what happens ("The mouse helps the lion") or give a rule about the characters ("Lions should watch out for hunters") instead of a lesson for people. Some pick a lesson they know from another story.',
        words: 'Start with the Retell the Story page: "What are the most important events? What can we leave out?" On Level 1 children number four given events; on Levels 2 and 3 they write the four main events after First, Next, Then, Finally. Then turn to the Central Message page: "A fable or folktale teaches a lesson about how people should act. The lesson is not about lions or mice; it is about us." Ask: "What did the character learn? What should we learn?" On Level 1 children choose the message from three sentences and check the three events that show it; on Level 2 they write the message and three events; on Level 3 they also tell how the ending teaches the message.',
        watch: 'Accept any message that is a lesson for people and fits the whole story; it does not have to match the key. "The mouse saved the lion" is a retelling, not a message: ask "So what does that teach us?" On Level 1 of the Central Message page one of the four sentences is not in the story: a child who checks it has not gone back to the text. In a retelling, look for the problem and the ending, in order; small details may be left out. The events a child lists for the message should show it, not be just any three events.',
      },
    },
    '3:characters-actions': {
      title: 'Characters: Traits, Feelings, and Actions',
      objective: 'Children describe the characters of a story by their traits and feelings and explain how what the characters do leads to what happens next.',
      note: {
        mistake: 'Children describe how a character looks ("big," "small") instead of what the character is like, or they name a feeling ("happy") when a trait is asked. They give a trait without a sentence that shows it. In cause and effect they turn the two around, or they pair two things that both happen without one making the other happen.',
        words: 'Say: "A trait is what a character is like inside, not just for a moment: clever, proud, patient. A feeling can change: the fox is pleased at first and sorry at the end. We learn traits from what characters say and do." On Level 1 of the Character Traits page children circle a trait and write the letter of the sentence that shows it; on Level 2 they choose a word from the list and copy the sentence; on Level 3 they find a word of their own and tell how a character feels at the end. On the Cause and Effect in a Story page ask: "What happened? What happened because of it?" Level 1 matches causes with effects; on Level 2 children write the missing half; on Level 3 they also write both as one sentence with because or so.',
        watch: 'On Level 3 accept any trait word that fits and that the copied sentence shows: "smart" for clever, "impolite" for rude. In The Crow and the Pitcher both words describe the crow; accept them in either order. A word about looks or a passing feeling is not a trait: ask "What is the character like inside, not just for a moment?" In the one-sentence task, check the direction: the cause comes after "because" or before "so." On the writing levels accept any cause or effect that the story tells; the key shows one.',
      },
    },
    '3:story-discussion': {
      title: 'Talk About a Story',
      objective: 'Children come to a group talk prepared, having read the story, and use their notes and the story itself to explain their ideas.',
      note: {
        mistake: 'Children come to the talk without having marked anything and say only "I liked it." They give an opinion without a reason from the story, or they repeat what the last speaker said. Some read their notes aloud and stop listening to the others.',
        words: 'Day 1: children read the story and fill in the Get Ready to Talk About a Story page: a part that surprised them with its paragraph, a question for the group, and (Levels 2 and 3) the words they will read aloud. Day 2: groups of four with the same story meet with the Talk About the Story page; give about ten minutes to write an idea for each question first, and start with the questions everyone has. Draw a name stick for the first speaker, who reads a question and gives an idea with its paragraph; each next child adds on, agrees, or disagrees. Practice the sentence starters printed on the page: "I think ... because the story says ...," "I agree with ... because ...," "I see it differently because ...," "Can you show where the story says that?"',
        watch: 'These pages have no answer key: every answer that the story supports is right. Look at the notes before the talk: a child with an empty page is not prepared, so pair the child with a partner to mark one part. During the talk, listen for the paragraph: a child who says "in paragraph 3 it says ..." is using the story. Listen also for links to what others said ("I agree with Maya because ..."). For a question about what might happen next, any paragraph that gives a reason counts.',
      },
    },
    '3:maps-diagrams-photos': {
      title: 'Maps, Diagrams, and Photos',
      objective: 'Children use a map or a diagram together with the words of a text to answer where, when, why, and how questions, and tell whether each answer came from the text, from the graphic, or from both.',
      note: {
        mistake: 'Children answer from the words alone and skip the graphic, or look only at the pictures. They mark "text" because a place name is also in the text, even when only the map shows its square, or they mark "both" for every question. Some name a square the wrong way round (2B for B2) or give the direction from the wrong place.',
        words: 'Show a map or a diagram from a science or social studies book. Ask: "What does the text tell us that the picture does not? What does the picture tell us that the text does not?" Model one question of each kind: a square or a direction read off the map, a date or a reason read in the text, and one that needs both, such as "In which square did the Union Pacific Railroad start?" The text names the city; the map shows its square. Day 1 is the map page, day 2 the diagram page. On Level 1 children circle each answer and circle where they found it. On Level 2 they write each answer and put a check mark next to the source. On Level 3 they answer four questions; then they name the two places on the map that show only a number, or write what happens in the diagram step that shows a question mark.',
        watch: 'A question is "both" only when one fact comes from each source: the text tells which place or step, and the graphic gives its square, direction, or name, or the other way round. Ask: "Could you answer it with your finger on the map alone?" On the diagram page most step names, such as evaporation or mail carrier, are printed only in the diagram; the text tells in plain words what happens. Children may already know an answer (the president lives in the White House; lions eat zebras); ask where it is printed on this page.',
      },
    },
    '3:closed-open-syllables': {
      title: 'Closed and open syllables',
      objective: 'Children divide two-syllable words into closed and open syllables (rab | bit, ro | bot, cam | el) and read each syllable with the right vowel sound.',
      note: {
        mistake: 'Children split every word after the first vowel and read camel as ca | mel ("KAY-mel"), or split after the consonant and read robot as rob | ot with a short o.',
        words: 'Say: "A closed syllable ends with a consonant, and its vowel is short: nap | kin. An open syllable ends with a vowel, and the vowel says its name: ro | bot." Day 1, Closed and Open Syllables: children split sixteen words, write C or O in a box for each syllable, and circle the word that fits each of six sentences. Level 1 words have two consonants between the vowels (rab | bit, hip | po); Level 2 words start with an open syllable (ro | bot, so | lo), plus three or four Level 1 words; on Level 3 one consonant stands between the vowels, so children try the long vowel first and then the short one. Day 2, Closed or Open?: children write each word under its head with a line between the syllables, then circle yes or no. Level 2 adds words like cam | el; on Level 3 one word fits neither head (oven, many) and is crossed out.',
        watch: 'The boxes under a word do not show where the line goes. Digraphs stay together (dol | phin, ech | o), and a blend after a long vowel goes with the next syllable (pro | gram). Ask, "Is ca | mel a word? Is cam | el?" In a second syllable the vowel is often said quickly (ba | con, lem | on, kit | ten); it is still a closed syllable.',
      },
    },
    '3:syllable-types-e-team-le': {
      title: 'Silent-e, vowel-team, and consonant-le syllables',
      objective: 'Children find silent-e, vowel-team, and consonant-le syllables in longer words (cupcake, rainbow, table, puzzle) and read the words part by part.',
      note: {
        mistake: 'Children split before the l of a consonant-le word (tab | le) and read a short a, or read the silent e of cupcake as a sound.',
        words: 'Say: "A consonant-le syllable is a consonant plus le. Count back three letters: ta | ble, bum | ble | bee. A silent e makes the vowel before it long: cup | cake. A vowel team is two or more letters that spell one vowel sound: rain | bow." Day 1: children split twelve words (nine on Level 3) and write each syllable\'s type in its box: C closed, O open, E silent e, V vowel team, L consonant-le (printed on the page); then they write ten words (twelve on Level 3) under their heads. Level 1 has consonant-le words, sorted by a short or long first vowel; Level 2 adds silent-e words and sorts by the type of the last syllable; Level 3 splits three-syllable words (bum | ble | bee) and sorts into three types. Day 2, Build Long Words: children find the box part that makes a word with each first part, write the part and the whole word, then circle yes or no for eight sentences.',
        watch: 'Words with ck before le (pickle) split after the ck; none is on these pages. The Level 1 sort leaves out oo words (noodle): oo does not say the name of o. Each first part makes a word with one box part only.',
      },
    },
    '3:suffixes-able-ment-ness-ful-less': {
      title: 'Suffixes -able, -ment, -ness, -ful, -less',
      objective: 'Children decode words with common suffixes (washable, payment, kindness, careful, endless) and tell how the suffix changes the base word.',
      note: {
        mistake: 'Children read the base and drop the suffix, mix up -ful and -less, or keep the y and the e when they spell (happyness).',
        words: 'Say: "-ful means full of, and -less means without. -ness and -ment turn a word into a noun: soft, softness. -able means can be." Day 1, Base Words and Suffixes: children circle the base and underline the suffix in twelve words, match four words to their meanings (two words of one base, such as careful and careless, so the suffix decides), and add a suffix to a base word to finish five sentences. Level 1 has -ful and -less, Level 2 adds -ness and -ment, and Level 3 has all five, with bases that change: after a consonant, y changes to i (happiness), and a silent e is dropped before -able (lovable). Day 2, Which Word Fits?: children circle the word that fits each of seven sentences (two words of one base), then build three words and write what each means.',
        watch: 'A silent e stays before a suffix that starts with a consonant (hopeful, movement), and a y after a vowel stays: playful, payment, enjoyable. The key\'s meanings are samples: accept "not careful" for careless.',
      },
    },
    '3:tricky-words-enough-though-ocean': {
      title: 'Tricky words: enough, though, ocean',
      objective: 'Children read and spell grade-level words with irregular spellings (enough, though, ocean, laugh, through) by mapping the regular parts and remembering the tricky part.',
      note: {
        mistake: 'Children sound out ough letter by letter, or spell by sound alone (enuf, tho, oshun).',
        words: 'Say: "Most of a heart word follows the rules. We learn the tricky part by heart." Map enough on the board: e | n | ou | gh, and draw a heart over ou and gh. Day 1, Heart Words: children write the letters for each sound in a box and draw a heart over the tricky part; a silent letter shares a box with the letter beside it (sl in island, sw in answer), and ough gets one box where it spells one sound (though, through). Then they fold the words back and write the heart word for each sentence; on Level 1 its first letter is on the line. Level 1 has four words and six sentences, Level 2 eight words and six sentences, Level 3 six words, four sentences, and a sentence of the child\'s own. Enough, though, and ocean are on every page. Day 2, The Sounds of ough: read the words together, then children write each one under the sound its ough makes (uff, o, or aw) and circle yes or no for five or six sentences.',
        watch: 'Don\'t sound out o-u-g-h letter by letter; teach ough as one unit and try its sounds (uff, o, aw). The e of enough says a quick /i/. On Level 3 one word (through or drought) has another ough sound and is crossed out.',
      },
    },
    '3:joining-words': {
      title: 'Joining words: and, but, so, because, when',
      objective: 'Children choose a joining word (and, but, or, so, because, when, if, after, before) that shows how two ideas go together, and write the joined sentence with a comma where one belongs.',
      note: {
        mistake: 'Children use and for everything. Many mix up so and because: so comes before the result, because before the reason. Some put a comma before because.',
        words: 'Say: "A joining word shows how two ideas go together. And adds an idea, but shows a difference, or gives a choice, so tells the result, because tells why." Day 1, Choose the Joining Word: the child circles the word that fits and writes it in the blank, with a comma in front of and, but, or, or so; the sentences print no comma, so it never gives the answer away. Level 1 offers two words (and, but, so); Level 2 adds or and because and offers three; Level 3 adds when, if, after, and before, and offers a second word of that group that does not make sense. Day 2, Join Sentences: the child joins four pairs (three on Level 3) on two lines each, circles the word, then finishes sentences that end in a joining word. The key names every word of the box that joins a pair right.',
        watch: 'It was raining, so we played inside. We played inside because it was raining. A comma goes before and, but, or, and so when they join two sentences. If the part with because, when, if, after, or before comes first, put a comma after it: When it gets dark, owls hoot. And joins almost any two sentences: ask which word shows how the ideas go together best.',
      },
    },
    '3:simple-compound-complex': {
      title: 'Simple, compound, and complex sentences',
      objective: 'Children tell simple, compound, and complex sentences apart and build compound and complex sentences from two short sentences.',
      note: {
        mistake: 'Children call every sentence with and or a comma compound, even "Mia and Leo built a snow fort." Others call any long sentence complex, or leave out the comma of a compound sentence.',
        words: 'Say: "A simple sentence is one complete thought with a subject and a verb. A compound sentence is two sentences joined by a comma and a joining word: and, but, so, or. A complex sentence is a sentence plus a part that cannot stand alone; the part starts with because, when, if, after, or before." Day 1: the child checks the kind of each sentence; Level 1 sorts ten into simple and compound (two simple ones have a list with commas), Levels 2 and 3 twelve into all three kinds, and Level 3 adds simple sentences with two subjects or two verbs and one like "We played outside after lunch." Day 2, Build: each sentence gets two lines; Level 1 joins six pairs, Level 2 writes three pairs both ways, Level 3 one pair both ways and a paragraph rewritten as two compound sentences and one complex sentence.',
        watch: 'To test a compound sentence, cover the joining word: two sentences are left. To test a complex sentence, read the part with because, when, if, after, or before alone: it cannot stand by itself. If that part comes first, put a comma after it: When it gets dark, owls hoot. The keys give one right sentence; other joins are right if they keep the meaning.',
      },
    },
    '3:comparing-adjectives-adverbs': {
      title: 'Better, best: comparing with adjectives and adverbs',
      objective: 'Children form and choose comparative and superlative adjectives and adverbs (taller, tallest; more carefully, most carefully; good, better, best) and choose an adjective or an adverb by what it tells about.',
      note: {
        mistake: 'Children add -er to long words (carefuller), use both (more taller), use -est when only two things are compared, say gooder, or write biger and happyer.',
        words: 'Say: "Compare two things with -er or more, and look for than. Compare three or more with -est or most, and look for the." Words with one syllable take -er (tall, taller); most longer words take more (careful, more careful); good, bad, well, and badly change. Show the spelling moves: big, bigger, biggest (double the last letter) and happy, happier, happiest (y becomes i). Day 1: the child circles one of three forms under each sentence; Level 1 has -er and -est words, Level 2 adds more and most, Level 3 has good, bad, well, and badly, and three sentences that ask for the adjective or the adverb. Day 2: the child writes the form of the word in ( ) in four sentences about three animals drawn at three sizes, then both forms of six words in a table (Level 2 mixes -er and more words; Level 3 adds words that change).',
        watch: 'Than means two: taller than. The ... of the three, of all, or in the world means three or more. Very, too, and as ... as take the word itself: very big. An adverb tells how someone does something: Tess painted carefully; Tess is careful.',
      },
    },
    '3:possessive-nouns': {
      title: 'Possessives: the dog\'s bone, the dogs\' bones',
      objective: 'Children write singular and plural possessives (the dog\'s bone, the dogs\' bones, the children\'s coats) and tell a possessive from a plural that owns nothing.',
      note: {
        mistake: 'Children put an apostrophe in every word that ends in s (three dog\'s ran). Others always write \'s, even when more than one owner ends in s, or write childrens\'.',
        words: 'Say: "Count the owners. One owner: add \'s, the dog\'s bone. More than one owner, and the plural ends in s: add an apostrophe after the s, the dogs\' bones. A plural that does not end in s takes \'s: the children\'s coats. A plural that owns nothing needs no apostrophe." Day 1, Possessive Nouns: the child writes who owns it for six owners ("Two dogs have bones." the dogs\' bones), then circles the word that fits in four sentences; Level 1 has one owner only, Level 2 adds more than one owner, Level 3 adds plurals such as children, men, women, mice, and geese. Day 2, Add the Apostrophe: the child writes the underlined word the right way (some need none). On Level 1 the child decides by whether something owned follows the word; on Levels 2 and 3 a first sentence says how many there are.',
        watch: 'Ask "How many owners?" before the apostrophe goes in. If no thing follows the word, it owns nothing: Three dogs ran. On these pages the number is said in words or shown by the sentence.',
      },
    },
    '3:capitals-in-titles': {
      title: 'Capitals in titles',
      objective: 'Children capitalize the first word, the last word, and the important words of book, story, and song titles, and keep small words such as a, the, and, of, and in small.',
      note: {
        mistake: 'Children capitalize every word, or only the first one. Some leave the first word small when it is a small word (the Lost Lantern).',
        words: 'Say: "In a title, the first word, the last word, and every important word start with a capital letter. Small words like a, the, and, of, and in stay small in the middle." The box on every page lists the small words. Day 1, Find the Capitals: the child circles each word that needs a capital in titles printed in small letters, then circles the right one of a title printed two ways; Level 1 has three-word titles, Level 2 titles with a, the, of, and in, Level 3 titles with a name or a colon. Day 2, Capitals in Titles: the child writes each title with its capitals, then the titles of three books he or she likes and a title for a report.',
        watch: 'Is, are, and it are short but important words, so they always get a capital. Words such as from, about, into, and with are left out of these titles because style guides disagree on them. A name always gets a capital, and so does the first word after a colon: Leo and the Lighthouse: A Summer Story. All the titles are made up.',
      },
    },
  },
};
