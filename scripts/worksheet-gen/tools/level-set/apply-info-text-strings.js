#!/usr/bin/env node
/**
 * Writes the page text of the information-text pages (types/_shared/info-text.js; English literacy year,
 * 2026-11-15) into i18n/strings.en.json (title and the instruction of level 2) and i18n/level-instructions.json (the
 * instructions of levels 1 and 3). English only: the texts are English texts. Run again after a wording change; it
 * replaces its own entries and touches no other.
 *
 *   node tools/level-set/apply-info-text-strings.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', '..', 'i18n');
const CHECK = process.argv.includes('--check');

const TEXT = {
  'G1-575': {
    title: 'Read the Facts',
    1: 'Read the text. Circle the answer to each question.',
    2: 'Read the text. Write the answer to each question. Finish the sentence.',
    3: 'Read the text. Write the answer to each question. Then underline the sentence in the text that tells you the answer.',
  },
  'G1-576': {
    title: 'Main Topic and Key Details',
    1: 'Read the text. Circle what the text is mostly about. Then copy one key detail from the text.',
    2: 'Read the text. Write the main topic. Then write two key details from the text.',
    3: 'Read the text. Write the main topic. Then write three key details in your own words.',
  },
  'G1-577': {
    title: 'Use the Text Features',
    1: 'Read the text. Use the headings, the bold words, the caption, and the glossary. Circle each answer.',
    2: 'Read the text. Use the headings, the bold words, the caption, and the glossary to write each answer.',
    3: 'Read the text. Use the headings, the bold words, the caption, and the glossary to write each answer. Then write a caption for the second picture.',
  },
  'G1-578': {
    title: 'Name the Text Features',
    1: "Look at the text. Each numbered dot is on one part of the text. Write the dot's number in the box next to the name of that part.",
    2: "Look at the text. Each numbered dot is on one part of the text. Write the dot's number in the box next to the name of that part.",
    3: "Look at the text. Each numbered dot is on one part of the text. Write the dot's number in the box next to the name of that part. Then read each job and write the number of the part that does it.",
  },
  'G2-519': {
    title: "Main Topic and Paragraphs",
    1: "Read the text. Circle the main topic. Then write the number of the paragraph next to what it is mostly about.",
    2: "Read the text. Write the main topic of the whole text. Then write what each paragraph is mostly about.",
    3: "Read the text. Write the main topic. Then write a heading for each paragraph and what the paragraph is mostly about.",
  },
  'G2-520': {
    title: "Glossary and Index",
    1: "Read the text. Use the headings, the bold words, the captions, the glossary, and the index. Circle each answer.",
    2: "Read the text. Use the headings, the bold words, the captions, the glossary, and the index to write each answer.",
    3: "Read the text. Use the text features to write each answer. Then add a word to the index and a word to the glossary.",
  },
  'G2-521': {
    title: "What the Diagram Shows",
    1: "Read the text and study the diagram. Circle each answer. Questions 1 to 4 ask about the diagram. Question 5 asks about the text and the diagram.",
    2: "Read the text and study the diagram. Write each answer. Questions 1 to 3 ask about the diagram. Questions 4 and 5 ask about the text and the diagram.",
    3: "Read the text and study the diagram. One label and one arrow are missing. Add them. Then write each answer.",
  },
  'G2-522': {
    title: "Steps in Order",
    1: "Read the text. Put the four steps in order. Then circle each answer.",
    2: "Read the text. Write the four steps in order. The first word of each step is given.",
    3: "Read the text. Write the four steps in order. Use the words first, next, then, and finally. Then answer the question.",
  },
  'G2-523': {
    title: "Name the Text Features",
    1: "Each dot with a letter is on one part of the text. Write the letter of the dot next to the name of the part. Then write the letter of the part that does each job.",
    2: "Each dot with a letter is on one part of the text. Write the letter of the dot next to the name of the part. Then write the letter of the part that does each job.",
    3: "Each dot with a letter is on one part of the text. Write the letter of the dot next to the name of the part. Then write the name of the part that does each job.",
  },
  'G2-524': {
    title: "Text or Diagram?",
    1: "Read the text and study the diagram. Where do you learn each fact? Make a check mark under \"in the text\" or under \"in the diagram.\"",
    2: "Read the text and study the diagram. Where do you learn each fact? Make a check mark under \"in the text\" or under \"in the diagram.\"",
    3: "Read the text and study the diagram. Make a check mark under \"in the text\" or under \"in the diagram.\" Then write your answers.",
  },
  'G2-525': {
    title: "Before and After",
    1: "Read the text. Then read each sentence about two steps. Circle before or after.",
    2: "Read the text. Answer questions 1 and 2 with a whole sentence. Then write before or after.",
    3: "Read the text. Finish each sentence. Then write a sentence of your own.",
  },
  'G3-494': {
    title: "Answer with Evidence",
    1: "Read the text. Circle each answer. The number after each question tells which paragraph has the answer.",
    2: "Read the text. Write each answer. In the box, write the number of the paragraph that proves your answer.",
    3: "Read the text. Write each answer and the number of the paragraph that proves it. Then copy the sentence from the text that proves your answer.",
  },
  'G3-495': {
    title: "Ask and Answer",
    1: "Read the text. Each sentence in a box is from the text. Circle the question that the sentence answers.",
    2: "Read the text. Each sentence in a box is from the text. Write the question that the sentence answers. The first word is given.",
    3: "Read the text. Write three questions about it. Begin each one with the word given. Then write each answer and the number of the paragraph that tells it.",
  },
  'G3-496': {
    title: "Main Idea and Key Details",
    1: "Read the text. Circle the main idea of the whole text. Then check the three key details.",
    2: "Read the text. Write the main idea of the whole text and three key details that support it.",
    3: "Read the text. Write the main idea and three key details that support it. Then write a summary.",
  },
  'G3-497': {
    title: "The Main Idea of Each Paragraph",
    1: "Read the text. Write the number of each paragraph next to what it is mostly about. Then circle the best heading for two of the paragraphs.",
    2: "Read the text. Write what each paragraph is mostly about.",
    3: "Read the text. Write a heading for each paragraph and what the paragraph is mostly about.",
  },
  'G3-500': {
    title: "Events in Order",
    1: "Read the text. Put the four events or steps in order. Then circle the answer to each question.",
    2: "Read the text. Then write the four events or steps in order.",
    3: "Read the text. Write the four events or steps in order. Then explain why one of them happens or what it leads to.",
  },
  'G3-501': {
    title: "Cause and Effect",
    1: "Read the text. A cause makes something happen. An effect is what happens. Next to each cause, write the letter of its effect.",
    2: "Read the text. A cause makes something happen. An effect is what happens. Write the missing cause or effect.",
    3: "Read the text. Write the missing cause or effect. Then write the cause and the effect as one sentence with because or so.",
  },
  'G3-498': {
    title: "Use the Text Features",
    1: "This text is printed as a small book. Read it. Then use the text feature named in each question and circle the answer.",
    2: "This text is printed as a small book. Read it. Then use the text feature named in each question and write the answer.",
    3: "Read this small book. Write each answer and the letter of the text feature that helped you find it. Then add two words to the index.",
  },
  'G3-499': {
    title: "Which Text Feature?",
    1: "This text is printed as a small book. Read it. Then write the letter of the text feature you would use each time.",
    2: "This text is printed as a small book. Read it. Write the letter of the text feature you would use. Then use it and write what you find.",
    3: "This text is printed as a small book. Read it. For each text feature, write a question that it answers. Then write the answer.",
  },
  'G3-502': {
    title: "Show Where the Story Says It",
    1: "Read the story. Circle each answer. The number after each question tells which paragraph has the answer.",
    2: "Read the story. Write each answer. In the box, write the number of the paragraph that proves your answer.",
    3: "Read the story. Write each answer and the number of the paragraph that proves it. Then copy the sentence from the story that proves your answer.",
  },
  'G3-503': {
    title: "Ask and Answer About a Story",
    1: "Read the story. Each sentence in a box is from the story. Circle the question that the sentence answers.",
    2: "Read the story. Each sentence in a box is from the story. Write the question that the sentence answers. The first word is given.",
    3: "Read the story. Write three questions about it. Begin each one with the word given. Then write each answer and the number of the paragraph that tells it.",
  },
  'G3-504': {
    title: "The Central Message",
    1: "Read the story. Circle its central message. Then check the three sentences that show the message.",
    2: "Read the story. Write its central message and three things in the story that show it.",
    3: "Read the story. Write its central message and three things that show it. Then tell how the ending teaches the message.",
  },
  'G3-505': {
    title: "Retell the Story",
    1: "Read the story. Put the four events in order. Then circle the answer to each question.",
    2: "Read the story. Then retell it: write the four main events in order.",
    3: "Read the story. Retell it: write the four main events in order. Then explain why one of them happens or what it leads to.",
  },
  'G3-506': {
    title: "Character Traits",
    1: "Read the story. Circle the word that tells what each character is like. Then write the letter of the sentence that shows it.",
    2: "Read the story. Choose a word from the list for each character and write it. Then copy the sentence from the story that shows it.",
    3: "Read the story. Tell what each character is like in a word of your own, and copy the sentence that shows it. Then tell how a character feels at the end.",
  },
  'G3-507': {
    title: "Cause and Effect in a Story",
    1: "Read the story. In a story, one thing can make another thing happen. Next to each cause, write the letter of its effect.",
    2: "Read the story. In a story, one thing can make another thing happen. Write the missing cause or effect.",
    3: "Read the story. Write the missing cause or effect. Then write the cause and the effect as one sentence with because or so.",
  },
  'G3-508': {
    title: "Get Ready to Talk About a Story",
    1: "Read the story. Get ready to talk about it with your group. Write your notes.",
    2: "Read the story. Get ready to talk about it with your group. Write your notes and copy the words you will read aloud.",
    3: "Read the story. Get ready to talk about it with your group. Write your notes. Be ready to show the part of the story that supports each note.",
  },
  'G3-509': {
    title: "Talk About the Story",
    1: "Read the story. Think about each question before your group talks. Write your idea and the number of the paragraph that supports it.",
    2: "Read the story. Think about each question before your group talks. Write your idea and the number of the paragraph that supports it.",
    3: "Read the story. Write your idea for each question and the number of the paragraph that supports it. Then write a question of your own for the group.",
  },
  'G2-526': {
    title: "How a Character Meets a Challenge",
    1: "Read the story. Then circle the answer to each question.",
    2: "Read the story. Then write the answer to each question.",
    3: "Read the story. Write the answer to each question. Then tell what you would have done and why.",
  },
  'G2-527': {
    title: "What Happens and Why",
    1: "Read the story. A cause makes something happen. An effect is what happens. Next to each cause, write the letter of its effect.",
    2: "Read the story. A cause makes something happen. An effect is what happens. Write the effect of each cause.",
    3: "Read the story. Write the missing cause or effect. Then write one cause and its effect as one sentence.",
  },
  'G2-528': {
    title: "What Is the Lesson?",
    1: "Read the story. Circle its lesson. Then put a check mark next to the two sentences that show the lesson.",
    2: "Read the story. Write its lesson. Then write what a character does that shows the lesson.",
    3: "Read the story. Write its lesson and what a character does that shows it. Then tell how the ending teaches the lesson.",
  },
  'G2-529': {
    title: "Beginning, Middle, and End",
    1: "Read the story. Put the three sentences in order. Then circle what happens in the middle.",
    2: "Read the story. Then retell it: write what happens at the beginning, in the middle, and at the end.",
    3: "Read the story. Retell it: write the beginning, the middle, and the end. Then write the lesson of the story.",
  },
};

function edit(file, fn) {
  const raw = fs.readFileSync(file, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const j = JSON.parse(raw);
  fn(j);
  const m = raw.match(/\n([ \t]+)"/);
  let out = JSON.stringify(j, null, m ? m[1].length : 2);
  if (eol === '\r\n') out = out.replace(/\n/g, '\r\n');
  if (/\r?\n$/.test(raw)) out += eol;
  if (out === raw) return false;
  if (!CHECK) fs.writeFileSync(file, out);
  return true;
}

const a = edit(path.join(I18N, 'strings.en.json'), (j) => { for (const [id, t] of Object.entries(TEXT)) j[id] = { title: t.title, instruction: t[2] }; });
const b = edit(path.join(I18N, 'level-instructions.json'), (j) => { for (const [id, t] of Object.entries(TEXT)) { const lv = {}; for (const n of [1, 3]) if (t[n] !== t[2]) lv[n] = { en: t[n] }; j[id] = lv; } });
if (CHECK && (a || b)) { console.error('info-text strings: the i18n files do not hold the text of this script'); process.exit(1); }
console.log('info-text strings: ' + (a || b ? 'written' : 'already there') + ' (' + Object.keys(TEXT).join(', ') + ')');
