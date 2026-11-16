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
  },
};
