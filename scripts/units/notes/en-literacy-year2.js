'use strict';
/**
 * Teacher notes, English, literacy: the Grade 2 unit Reading to Learn: Informational Texts (Daily Teaching System,
 * Part 12.3, fourth run, 2026-11-16). Five teaching points: the main topic and each paragraph (G2-519), text
 * features (G2-523, G2-520), a text with a diagram (G2-521, G2-524), steps in order (G2-522, G2-525) and two animals
 * compared (G2-342). Each note was written from the pages the lesson hands out, in American English, and read by
 * one American Grade 2 teacher-reviewer with the pages (2026-11-16); every finding is in the text below.
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
  },
};
