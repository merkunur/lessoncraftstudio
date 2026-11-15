'use strict';
/**
 * Teacher notes, English, literacy: the first unit built for the designed school year of Grade 1 reading and writing,
 * Reading to Learn: Informational Texts (Daily Teaching System, Part 12.3, first run, 2026-11-15). Three NEW teaching
 * points, each on pages made for it (Read the Facts; Main Topic and Key Details; Name the Text Features and Use the
 * Text Features: one short informational text with two headed parts, a bold word in each, a captioned picture and, on
 * the feature pages, a glossary), and one FURTHER lesson on a point that Grade 2 teaches again ("<point>#<name>").
 * Each note was written from the pages the lesson hands out, in American English, and read by one American Grade 1
 * teacher-reviewer with a description of the pages (2026-11-15); every finding is in the text below.
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
  },
};
