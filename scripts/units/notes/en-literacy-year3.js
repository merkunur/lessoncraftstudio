'use strict';
/**
 * Teacher notes, English, literacy: the first two lessons of the Grade 3 unit Reading to Learn: Informational Texts
 * (Daily Teaching System, Part 12.3, seventh run, 2026-11-16). The unit is NOT placed yet: a unit needs four lessons,
 * and the pages of its other three do not exist (scripts/units/year/add-points-g.en.literacy.js). Two teaching points: answer with evidence (G3-494 Answer with Evidence,
 * G3-495 Ask and Answer) and main idea and key details (G3-497 The Main Idea of Each Paragraph, G3-496 Main Idea
 * and Key Details). Each note was written from the pages the lesson hands out, in American English, and read by one
 * American Grade 3 teacher-reviewer against the pages (2026-11-16); every finding is in the text below.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '3:answer-with-evidence': {
      title: 'Answer with Evidence',
      objective: 'Children ask and answer questions about an informational text and show the paragraph and the sentence that prove each answer.',
      note: {
        mistake: 'Children answer from what they think they know ("Penguins live at the North Pole") instead of from the text, or they write the right answer and then name the paragraph where they first saw a word of the question. Asked to prove an answer, they copy the first sentence of the paragraph. When they write their own questions, they ask something the text does not answer ("Do astronauts get scared?").',
        words: 'Read the text once together; the paragraphs are numbered. Model one question aloud: "How do I know? I put my finger on the sentence that tells me. It is in paragraph 2." Use the sentence frame "The text says ..." on both days. On Level 1 of the Answer with Evidence page the number of the paragraph is printed after each question, so children practice finding the sentence inside one paragraph; on Level 2 they find the paragraph themselves; on Level 3 they also copy the sentence that proves the answer. On the Ask and Answer page the direction is turned around: a sentence from the text is the answer, and children find or write the question. Say: "A question word tells what kind of answer is coming: where asks for a place, when for a time, why for a reason, how for a way, who for a person, what for a thing or an event." Before reading, teach the words of the text your class reads. Lighthouses: coast, beam, lens, fog. Living on the Space Station: laboratory, crew, pouch, treadmill. Emperor Penguins: huddle, waterproof. The Pony Express: stagecoach, telegraph, route. Blue Whales: krill, baleen, mammal, calf.',
        watch: 'An answer is right when the text supports it, in the child\'s own words or in the words of the text; a full sentence is not required on the answer line. The paragraph number has to match the answer: a child with the right answer and the wrong number probably answered from memory or matched a single word, so have the child go back and touch the sentence. On Level 3, accept any sentence of the right paragraph that proves the answer; the key shows one. On the Ask and Answer page, a question is right when the sentence in the box answers it and it begins with the given word; it does not have to match the key. For a child\'s own questions, check three things: the text answers the question, the child\'s answer is correct, and the paragraph number is where the answer is found.',
      },
    },
    '3:main-idea-key-details': {
      title: 'Main Idea and Key Details',
      objective: 'Children tell what each paragraph of an informational text is mostly about, determine the main idea of the whole text, recount the key details, and explain how they support the main idea.',
      note: {
        mistake: 'Children give the topic in one word ("lighthouses") instead of the main idea, which is a whole sentence about the topic. Or they pick the most interesting detail as the main idea (a blue whale\'s tongue can weigh as much as an elephant), or a sentence so broad that it could fit a hundred other texts ("Many animals live in the ocean"). For a summary they copy the first sentence of each paragraph.',
        words: 'Start with the Main Idea of Each Paragraph page: the text is printed without its headings, so children have to say what each paragraph is mostly about. Cover three paragraphs with a sheet of paper and read one: "What do all these sentences tell about?" Then move to the whole text with the Main Idea and Key Details page: "The topic is what the text is about: blue whales. The main idea is what the text says about the topic, in a sentence." Test a main idea with the question "Does every paragraph fit under it?" A sentence that only one paragraph fits under is a detail (too narrow); a sentence that could fit many other texts is too broad. Key details are the ideas that hold the main idea up, often one from each of three paragraphs. Ask of each key detail: "How does it help show the main idea?" For the summary on Level 3 say: "Main idea first, then two or three key details, in your own words."',
        watch: 'On the writing levels, accept any main idea that is a sentence, names the topic, and fits all four paragraphs; it does not have to match the key. A child who writes "It is about penguins" has the topic: ask "What does the text say about penguins?" A key detail is right when it comes from the text and supports the child\'s own main idea; a small fact, such as a single year or number, is usually a detail, not a key detail. On Level 1 of the Main Idea and Key Details page one of the four sentences is not in the text at all: a child who checks it has not gone back to the text. On Level 1 of the Main Idea of Each Paragraph page one statement fits no paragraph, so one box stays empty; a child who fills all five boxes has matched by a single word. In a summary, look for the main idea and at least two key details, and no copied sentences.',
      },
    },
  },
};
