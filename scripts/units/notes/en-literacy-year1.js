'use strict';
/**
 * Teacher notes, English, literacy: the first unit built for the designed school year of Grade 1 reading and writing,
 * Reading to Learn: Informational Texts (Daily Teaching System, Part 12.3, first run, 2026-11-15). Three NEW teaching
 * points, each on pages made for it (Read the Facts; Main Topic and Key Details; Name the Text Features and Use the
 * Text Features: one short informational text with two headed parts, a bold word in each, a captioned picture and, on
 * the feature pages, a glossary), and one FURTHER lesson on a point that Grade 2 teaches again ("<point>#<name>").
 * Each note was written from the pages the lesson hands out, in American English, and read by one American Grade 1
 * teacher-reviewer with a description of the pages (2026-11-15); every finding is in the text below.
 * The five notes of the unit Reading Stories: Characters and Lessons (G1-579 to G1-583) were added by
 * place-ready-k.en.literacy.js; the reviewer of the story pages read them (2026-11-17, every finding applied).
 * The four notes of the unit Long Vowels: Silent e and Vowel Teams (G1-584 to G1-587) were added by
 * place-ready-m.en.literacy.js; the reviewer of the story pages read them (2026-11-17, every finding applied).
 * The three new notes of the unit Digraphs and Blends (G1-589 to G1-591) were added by place-ready-o.en.literacy.js;
 * the reviewer of the pages read them (2026-11-17, every finding applied).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '1:info-text-key-details': {
      title: 'Facts in the text',
      objective: 'Children ask and answer questions about key details in a short informational text and point to the sentence that tells the answer.',
      note: {
        mistake: 'Children answer from what they already know about the animal and not from the text: asked where frogs live, a child writes "in trees" because they have seen a tree frog, although the text says near ponds. Others copy the first sentence that shares a word with the question without reading whether it answers.',
        words: 'Read the text aloud once while children follow with a finger, then have partners read it to each other. Say: "An informational text teaches us true things. Every answer today is in the text. Put your finger on the sentence that tells you." Ask the first question and have every child point before anyone answers. Then turn it around: "What question could YOU ask that this sentence answers? Start with What, Where, or How." The standard asks children to ask questions as well as answer them.',
        watch: 'Ask a child, "Where does it say that?" If the finger goes to the picture, the child guessed from the drawing; if it goes nowhere, the answer came from memory. On the page with sentence starters, check that the child finished each sentence with words from the text. On the hardest page, have children write the question number at the start of each underline: one whole sentence for each question, not single words here and there. The on-screen activity is a Kindergarten-level warm-up: use it before the page or for children who need support, not as the practice of the lesson.',
      },
    },
    '1:main-topic-key-details': {
      title: 'The main topic and key details',
      objective: 'Children name the main topic of an informational text and retell two or three key details that tell about it.',
      note: {
        mistake: 'Children name a detail as the topic: "It is about a sticky tongue." Or they name something the text only mentions, because it is the last thing they read. For key details they pick a small fact, such as how many legs, and leave out what each part of the text is about.',
        words: 'Say: "The main topic is what the WHOLE text is about. One or two words are enough." Test each choice aloud: "Is every part of the text about a sticky tongue? No, only one sentence. Is every part about frogs? Yes." For the details: "A key detail is an important fact the text teaches about the topic. Look at each heading, then find the important fact in the sentences under it." On the hardest page children need three key details, so one part will give two. Have children tell the topic and the details across their fingers before they write: the thumb for the topic, one finger for each detail.',
        watch: 'Listen for a child who retells the whole text sentence by sentence: ask for the two or three most important things. A child who writes "animals" has gone too wide; ask, "Which animal?" On the hardest page the details are written in the child\'s own words. A child who copies a sentence has still found a key detail; ask that child to tell it to you without looking at the text. The on-screen activity is a Kindergarten-level warm-up: use it before the page or for children who need support.',
      },
    },
    '1:text-features': {
      title: 'Text features: titles, headings, bold words, pictures, captions, and a glossary',
      objective: 'Children name the text features of an informational text (title, heading, bold word, picture, caption, glossary) and use headings, bold words, a caption, and a glossary to find facts and word meanings.',
      note: {
        mistake: 'Children read the text from the first word to the last to answer every question and never use a heading to jump to the right part. Many skip the caption, because it looks like a decoration under the picture, and take the title for a heading.',
        words: 'Before reading, go on a feature hunt: "Put your finger on the title. On a heading. On a bold word. On the picture. On the caption. On the glossary." Say: "The title tells what the whole text is about. A heading tells what one part is about. A bold word is important, and you can look it up in the glossary. A caption uses words to tell about the picture." Then model one question from the second page: "It asks about food. Which heading will help me? I read only that part."',
        watch: 'On "Name the Text Features," check the title and heading boxes first: a child who swaps them needs, "The title is for the whole text; a heading is for one part." A child who writes the picture\'s number in the caption box needs, "The caption is the words next to the picture." On "Use the Text Features," watch where a child\'s eyes go after reading a question: to a feature, or back to the first line of the text. For the glossary question, check that the child took the meaning from the glossary and did not make one up. On the hardest "Use the Text Features" page, the caption for the second picture has to tell about THAT picture with a fact from the text: "This is a ___." only names the picture and is not yet a caption that teaches.',
      },
    },
    '2:compare-two-animals#two-fact-files-grade-1': {
      title: 'Two animal fact files: same and different',
      objective: 'Children read fact files about two different animals and find which facts are the same and which are different.',
      note: {
        mistake: 'Children compare what they see in the pictures instead of the facts in the table: "They are different because this one is bigger." Size is not one of the four facts. Others stop at the first difference and call the animals different in every way, or write a fact about one animal only when asked what is different.',
        words: 'Read both fact files aloud, one fact at a time, across the two cards: "What group is the first animal in? And the second? Same or different?" Have children put one finger on each card and move down together. Teach two sentence shapes, and change the verb to fit the fact (are, live, eat, have): "Both ___ and ___ live in ___." for same, and "A ___ eats ___, but a ___ eats ___." for different. Say: "A difference needs BOTH animals in the sentence." This page gets children ready for RI.1.9. The standard itself compares two texts on the SAME topic: to teach it fully, read two short texts about one animal and ask, "What does this text tell that the other one does not?"',
        watch: 'Check the circles first: a child who circles the same word for every fact, all "same" or all "different," has not read across the two cards. In the written part, look for both animals in each sentence about a difference. In Grade 1, accept short answers and invented spelling; what counts is that the fact comes from the fact files and not from what the child already knows about the animal. The on-screen activity compares two stories, not fact files. Tell children they compare stories the same way: one thing at a time, across both.',
      },
    },
    '1:story-key-details': {
      title: 'Find the Answer in the Story',
      objective: 'Children answer questions about key details in a short story and show the sentence that tells the answer.',
      note: {
        mistake: 'Children answer from what they already know about the animals ("Owls fly at night"), not from what the story says. Some copy the first sentence that holds a word of the question. On Level 2 they write the missing words but forget the period.',
        words: 'Read the story aloud once while children follow with a finger, then read it together. Say: "The answer is in the story. Put your finger on the sentence that tells you." Model the first question: read it, find the sentence, read that sentence aloud, then answer. On Level 1 children circle one of three answers. On Level 2 the answer starts on the line and children finish it. On Level 3 they answer three of the questions in a whole sentence and underline the sentence in the story that tells each answer. Children who finish early ask a partner one more question that the story answers: "Who ...?" "Where ...?" "What ...?" On screen, Fable\'s Picture Stories gives more practice with questions about three-picture stories.',
        watch: 'An answer is right when the story says it. On Levels 2 and 3 accept the child\'s own words and any spelling you can read; on Level 3 look for a capital letter at the start, on Levels 2 and 3 for a period at the end. Accept every answer the story supports: "home" or "up the hill" for where Sam wants to take the apple. If a child answers without looking back, ask: "Where does the story say that?" On Level 3 the underlined sentence matters as much as the answer.',
      },
    },
    '1:characters-setting-events': {
      title: 'Characters, Setting, and Big Events',
      objective: 'Children tell who is in a story, where it takes place, and the big thing that happens, with details from the story.',
      note: {
        mistake: 'Children name only one character, or they add an animal that is not in the story. For the setting they tell when ("at night") but not where. For the big event they pick the first thing that happens or a small detail.',
        words: 'Teach three words with a gesture each: characters (point to a person), setting (spread your arms for the place), event (clap once: something happens). Say: "Characters are who the story is about. The setting is where and when it happens. A big event is an important thing that happens." Read the story, then ask: "Who? Where? What is the big thing that happens?" On Level 1 the story is printed without pictures: children read who is in it and circle the two characters among four animals, then the setting and the big event. On Level 2 they write a word or a few words in each box. On Level 3 they write one sentence in each box; ask for one detail, such as what kind of animal a character is. On screen, Marlo\'s Magnifier asks for the detail that proves something about a character.',
        watch: 'On Level 1 exactly two animals are circled. On Levels 2 and 3 accept names or animals ("Ben and Fay" or "a bear and a fox") and any true wording of the place and of the big event. The big event is right when the story would not work without it: Ben sharing his plums, not Fay sitting in the park. Ask: "Could we tell the story without this?" If a child says that owls eat mice, say: "In this story Ola is a friend. In stories, animals can act like people."',
      },
    },
    '1:retell-and-lesson': {
      title: 'Retell the Story and Tell Its Lesson',
      objective: 'Children retell a story by its beginning, middle, and end and tell the lesson it teaches.',
      note: {
        mistake: 'Children retell only the end, or they tell every sentence instead of the three big parts. For the lesson they say what happened ("Ben gave Fay plums") instead of what we can learn from it.',
        words: 'Hold up three fingers: "First ... Then ... In the end ..." Retell a story the class knows in three sentences before children try. On Level 1 children put three sentences in order and circle the lesson. On Level 2 they write one sentence for the beginning, the middle, and the end with the help of a word bank, then circle the lesson. On Level 3 they retell in their own words, on two rows for each part, and write the lesson. For the lesson ask: "What did the characters learn? What can we learn?" Say it as something for people: "Share what you have." Day 1: retell aloud with a partner, then Level 1. Day 2: Level 2, and Level 3 for children who are ready. On screen, Juniper\'s Story Lantern tells a tiny fable and asks for its lesson.',
        watch: 'A retelling is right when the three parts are in order and the end is there. It does not have to match the key, and the word bank is a help, not a rule. On Level 3 accept any lesson that fits the whole story and tells people how to act. "Ben gave Fay plums" is a retelling: ask "So what does the story teach us?"',
      },
    },
    '1:feeling-and-sense-words': {
      title: 'Words That Show Feelings and Senses',
      objective: 'Children find words in a story that tell how a character feels and words that tell how something looks, sounds, tastes, smells, or feels.',
      note: {
        mistake: 'Children mix up how a character feels with what a thing feels like ("soft" is not a feeling). They give their own feeling instead of the character\'s. Some think only "happy" and "sad" are feeling words.',
        words: 'Open the Feelings Check-In tool and name the feelings and their faces together. Say: "A feeling word tells how someone feels inside: glad, mad, scared." Then: "A sense word tells what you see, hear, taste, smell, or touch: loud, sweet, soft." Touch your eyes, ears, mouth, nose, and hands as you name the senses. Read the story and stop at each of the four words: "Is this a feeling, or one of our senses? Which one?" On Level 1 the four words stand in a box: children underline them in the story and circle the face or the part of the body. On Level 2 they find the two feeling words themselves and answer a question about each sense word. On Level 3 they also tell how the other character feels and why.',
        watch: 'On Level 1 a feeling word gets a face and a sense word gets a part of the body. "Warm" and "soft" are felt with the skin: the hands stand for touch. On Level 3 any feeling word is right when the reason fits the story: "Ben feels sorry because Fay is hungry." Ask: "How do you know?"',
      },
    },
    '1:who-tells-the-story': {
      title: 'Who Is Telling the Story?',
      objective: 'Children tell who is speaking at different points of a story: the narrator or one of the characters.',
      note: {
        mistake: 'Children think the character named in a sentence is the one who says it: "Now Finn was glad" is told by the narrator, not said by Finn. Some skip the quotation marks, or think the words "said Fay" are spoken by Fay.',
        words: 'Say: "The narrator tells the story. The characters talk. Quotation marks show the words a character says out loud." Read one story as a play: one child plays each character and reads only the words inside the quotation marks, and you read the rest as the narrator. Then ask about single sentences: "Who says this? How do you know?" On Level 1 children circle the narrator or a character for six sentences. On Level 2 they write a letter in a box: N for the narrator or the first letter of the character\'s name. On Level 3 they also write one thing a character could say next. On screen, Lumen\'s Lighthouse Windows asks who is telling what was seen.',
        watch: 'Words inside quotation marks belong to a character, and the words "said Fay" belong to the narrator. On the page the spoken sentences are printed without "said ...", so each has one right answer. On Level 3 accept any words that fit the character and the end of the story; quotation marks around them are a bonus in Grade 1.',
      },
    },
    '1:silent-e': {
      title: 'Silent e Changes the Vowel',
      objective: 'Children read and spell one-syllable words with a silent e and tell how the e changes the vowel sound: cap, cape.',
      note: {
        mistake: 'Children read the silent e as a sound or keep the short vowel ("cap" for cape). In spelling they leave the e off (cak) or add it to every word. Some know a_e and do not carry the pattern over to i_e, o_e, and u_e.',
        words: 'Write cap on the board and read it. Add an e and say: "The e at the end is silent. It makes the vowel say its name: cap, cape." (Some programs call it magic e.) Do the same with kit and kite, not and note, cub and cube. With u the e can say two sounds: /yoo/ in cube and cute, /oo/ in tube. Children cover the e with a finger, read the short word, lift the finger, and read the long one. On the page they first add e to each word and read both words to a partner. Then they circle the word for each picture; the two words are a pair such as tap and tape, so only the vowel sound tells them apart, and at least two pictures show the short word. Level 1 has a_e words and two sentences, Level 2 a_e and i_e words and three sentences, Level 3 all four vowels and three words to write under pictures, with the first letter printed on each row. On screen, Add the Magic e lets children build the same kind of pairs.',
        watch: 'Listen to the reading, not only to the circles: a child can circle tape and still say "tap." In the sentences only one word of the pair makes sense ("A horse has a long mane."); have the child read the sentence aloud with the word chosen. On Level 3 a word with the right vowel and a final e is on the way: a child may write "noze" for nose; show the s that says /z/ and move on.',
      },
    },
    '1:long-a-ai-ay': {
      title: 'Long a: ai and ay',
      objective: 'Children read and spell one-syllable words in which ai or ay spells long a, and use the place in the word to choose between them.',
      note: {
        mistake: 'Children write a alone (ran for rain) or a silent e for every long a (rane). They put ay in the middle of a word (trayn) or ai at the end (plai).',
        words: 'Say: "Two letters can work as a team and make one sound. A and i, and a and y, both say the name of a." Write rain and play. Ask where each team stands: "ai comes in the middle of a word. ay comes at the end." On Level 1 children draw a line from four words to their pictures, then write ai in four words and ay in four words and read them. On Level 2 they read eight printed words out loud and write each under its spelling, then read the rule and write ai or ay into six words. On Level 3 they cross out the one word of seven that does not say long a, write the other six under their spelling, write the word for three pictures, and finish two sentences with a word from a box. Have children read every finished word aloud. On screen, Build Vowel-Team Words lets them build long-vowel words from letter tiles.',
        watch: 'In the sort a word is right when it stands under its own two letters. In the Level 2 gap words the place decides: a gap at the end takes ay, a gap in the middle takes ai. Said has ai but does not say long a; it is a word to remember, and it is the word to cross out on Level 3. The Level 3 pictures are ai words (three of rain, train, snail, and nail), since few ay words can be drawn; the first letter is printed on each row, so a child who sees a rain cloud still writes rain. The word box holds two words that fit neither sentence.',
      },
    },
    '1:long-e-ee-ea': {
      title: 'Long e: ee and ea',
      objective: 'Children read and spell one-syllable words in which ee or ea spells long e.',
      note: {
        mistake: 'Children write e alone (fet for feet) or mix the two teams (leef, seel). Unlike ai and ay, no rule tells which team a word takes, so children who look for a rule guess.',
        words: 'Say: "E and e, and e and a, both say the name of e. There is no trick for these two: we learn which words take which team." Sort a few known words on the board: see, tree, feet under ee; eat, sea, leaf under ea. See and sea sound the same; the team shows which one we mean. On Level 1 children match four words to pictures, then write ee in four words and ea in four words and read them. On Level 2 they read eight printed words out loud and sort them, then write ee or ea into six words that each have a picture. On Level 3 they cross out the one word of seven that does not say long e, sort the other six, write the word for three pictures (the first letter is printed on each row), and finish two sentences from a word box. Read the sorted columns aloud together at the end. On screen, Build Vowel-Team Words gives more practice.',
        watch: 'On Level 2 each gap word has a picture so the child knows the word; which team it takes cannot be heard, so it must be remembered. A child who writes "leef" has heard the sound and needs the look of the word: point to leaf on a word wall. ea can also say short e, as in head and bread; head is the word to cross out on Level 3. The Level 3 pictures are three of bee, tree, sheep, and leaf.',
      },
    },
    '1:long-o-oa-ow': {
      title: 'Long o: oa and ow',
      objective: 'Children read and spell one-syllable words in which oa or ow spells long o, and use the place in the word to choose between them.',
      note: {
        mistake: 'Children write o alone (bot for boat) or a silent e for every long o (bote). They read ow as in cow in every word. They put ow in the middle (bowt) or oa at the end (snoa).',
        words: 'Say: "O and a, and o and w, can both say the name of o." Write boat and snow. "oa comes in the middle of a word. ow comes at the end." Tell children that ow has two sounds, as in snow and as in cow; on these pages it says the name of o in every word but cow. On Level 1 children match four words to pictures, then write oa in four words and ow in four words and read them. On Level 2 they read eight printed words out loud and sort them, read the rule, and write oa or ow into six words. On Level 3 they cross out the one word of seven that does not say long o, sort the other six, write the word for three pictures, and finish two sentences from a word box. On screen, Build Vowel-Team Words gives more practice.',
        watch: 'In the Level 2 gap words the place decides: a gap at the end takes ow, a gap in the middle takes oa. Words such as bowl and grown break this rule and are not on these pages. Cow has ow but does not say long o: it is the word to cross out on Level 3. Read row as in "row a boat." On Level 3 the pictures are three of boat, coat, goat, and toast, and the first letter on each row tells which name to write, so a child who says "ship" or "jacket" can still find the word.',
      },
    },
    '1:ck-ng-wh': {
      title: 'ck, ng, and wh',
      objective: 'Children read and spell words with ck at the end (duck), ng at the end (ring), and wh at the start (whip), knowing each spelling makes one sound.',
      note: {
        mistake: 'Children write k or c alone at the end ("duk," "soc"). They drop the g of ng ("rin") or say it as n and then g. They write w alone for wh ("wen").',
        words: 'Say: "A digraph is two letters that make one sound. c and k together make /k/ at the end of a short word: duck, sock. n and g together make the sound at the end of ring. w and h make /w/ at the start of when." Have children hum /ng/ with the mouth open. On Level 1 each copy works with ck or with ng, and a grey model starts each task: the child writes the digraph to turn five old words into new ones (dug, du__; wig, wi__), writes it into five more words, reads the new words to a partner, and circles the word that fits three sentences. On Level 2 children draw lines from four of six words to their pictures (two words, such as song beside sock, have no picture) and sort six words under ck and ng. On Level 3 wh joins: they write the word for three pictures, sort six words under ck, ng, and wh, and finish three sentences by writing the digraph. On screen, Build Blend and Digraph Words gives more practice.',
        watch: 'ck comes right after a short vowel at the end of a word. Before ng the vowel sounds a little different (ring, bang); teach -ing, -ang, -ong, -ung as chunks. In the ck sentences the other word ends in g (duck, dug), so the child must read to the end of the word. Most Americans say when and which with a plain /w/; some say /hw/, and both are fine. Levels 1 and 2 use no word that starts with a blend; truck and clock wait for Level 3.',
      },
    },
    '1:blends-start': {
      title: 'Blends at the start: st, fl, tr',
      objective: 'Children read and spell one-syllable words that start with a consonant blend (stop, flag, trip) and say both sounds of the blend.',
      note: {
        mistake: 'Children say or write only one sound of the blend: "top" for stop, "cab" for crab. Others put a vowel between the two sounds ("suh-top") or write the two letters in the wrong order ("tsop").',
        words: 'Say: "A blend is two consonants side by side. You hear both: s, t, st, stop." Stretch it, "sss-t-op," then say it fast. Pair words: top and stop, pin and spin. On Level 1 every copy is about s-blends, and a grey model starts each task: the child adds s to five old words to make new ones (top, _top), writes two given blends into two words each, reads the new words to a partner, and circles the word that fits three sentences; the other word is the same word without the s. On Level 2 children draw lines from four of six words to their pictures (two words, such as lag beside flag, have no picture) and sort six words under s-blends and l-blends. On Level 3 r-blends join: they write the word for three pictures, sort six words, and write the two letters that start a word in three sentences. On screen, Build Blend and Digraph Words lets them build blend words from letters.',
        watch: 'In an s-blend the s comes first (st, sp, sn, sk, sw, sm, sc); in an l-blend or r-blend the l or r comes second (fl, tr). sl is both an s-blend and an l-blend, so the pages leave it out. On Level 3 the sentences show no letters to choose from: the meaning tells the word ("A __ab walks on the sand": cr, crab). Have the child read the finished sentence aloud.',
      },
    },
    '1:blends-end': {
      title: 'Blends at the end: nd, mp, st, and nk',
      objective: 'Children read and spell short-vowel words that end in a consonant blend (hand, jump, nest) and hear both final sounds.',
      note: {
        mistake: 'Children leave off one of the last two sounds: "han" or "had" for hand, "jup" for jump, "nes" for nest. Before k they leave the n out ("sik" for sink). Some write the two letters in the wrong order ("hadn").',
        words: 'Say: "Some words end with two consonant sounds. Listen to the end: han-d, hand." Have children hold up a finger for each of the last two sounds. Compare had and hand, bed and bend. On Level 1 every copy is about nd, and a grey model starts each task: the child writes nd to turn five old words into new ones (had, ha__), writes nd into five more words, reads the new words to a partner, and circles the word that fits three sentences; the other word is missing a sound (sad, sand). On Level 2 children draw lines from four of six words to their pictures (two words, such as lap beside lamp, have no picture) and sort six words under nd and mp. On Level 3 st and nk join: they write the word for three pictures (hand, lamp, sink), sort four words under the four endings, and finish three sentences by writing nd, mp, st, or nk. On screen, Build Blend and Digraph Words gives more practice.',
        watch: 'In nk the n sounds like the end of ring: say sink slowly and feel the tongue move back before the k. Teach -ink, -ank, -unk as chunks. A child who writes "sigk" has heard that sound; show the n. In mp the lips close for m and pop for p. On Level 2 the four pictures are the same in every copy (hand, lamp, stamp, shrimp); the words change.',
      },
    },
  },
};
