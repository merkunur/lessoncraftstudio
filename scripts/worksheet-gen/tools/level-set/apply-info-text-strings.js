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
  'G1-579': {
    title: "Find the Answer in the Story",
    1: "Read the story. Then circle the answer to each question.",
    2: "Read the story. Then finish the answer to each question.",
    3: "Read the story. Write the answer to each question in a sentence. Then underline the sentence in the story that tells you the answer.",
  },
  'G1-580': {
    title: "Characters, Setting, and Events",
    1: "Read the story. Circle the two characters. Then circle where the story takes place and what happens.",
    2: "Read the story. Write who is in it, where it takes place, and what happens.",
    3: "Read the story. Write one sentence about the characters, one about the setting, and one about the big event.",
  },
  'G1-581': {
    title: "Retell the Story and Tell Its Lesson",
    1: "Read the story. Put the three sentences in order. Then circle the lesson of the story.",
    2: "Read the story. Write what happens at the beginning, in the middle, and at the end. Use the word bank. Then circle the lesson.",
    3: "Read the story. Retell it in your own words: the beginning, the middle, and the end. Then write its lesson.",
  },
  'G1-582': {
    title: "Feeling Words and Sense Words",
    1: "Read the story. Find the words from the box and underline them. Then circle the picture that goes with each word.",
    2: "Read the story. Underline the two feeling words and write them. Then answer the questions about sense words.",
    3: "Read the story. Underline and write the two feeling words. Answer the questions about sense words. Then tell how a character feels and why.",
  },
  'G1-583': {
    title: "Who Is Telling the Story?",
    1: "Read the story. Who says or tells each sentence? Circle the narrator or the character.",
    2: "Read the story. Who says or tells each sentence? Write the letter in the box.",
    3: "Read the story. Write the letter of who says or tells each sentence. Then write what a character could say next.",
  },
  'K-650': {
    title: "Who Is in the Story, and Where?",
    1: "Listen to the story. Circle who the story is about, where it happens, and what happens.",
    2: "Listen to the story. Draw who the story is about, where it happens, and one thing that happens.",
    3: "Listen to the story. Draw who, where, and what happens. Write a word next to each picture.",
  },
  'K-651': {
    title: "Retell the Story: Beginning, Middle, End",
    1: "Listen to the story. Write 1 under what happens first, 2 under what happens next, and 3 under what happens last. Then tell the story.",
    2: "Listen to the story. Draw the beginning, the middle, and the end. Then tell the story.",
    3: "Listen to the story. Tell it to a partner. Then finish the three sentences: First, Then, At the end.",
  },
  'K-652': {
    title: "Ask and Answer Questions About a Story",
    1: "Listen to the story and to each question. Circle the picture that answers the question.",
    2: "Listen to the story and to each question. Circle the picture that answers it. Tell how you know.",
    3: "Listen to the story. Circle the picture that answers each question. Then ask a question of your own.",
  },
  'K-653': {
    title: "The Pictures and the Words",
    1: "Listen to each sentence. Draw a line from each sentence to its picture.",
    2: "Listen to each sentence of the story. Draw a line from each sentence to its picture.",
    3: "Listen to each sentence. Draw a line to its picture. One picture is missing. Draw it in the empty box, then draw a line to it.",
  },
  'G1-584': {
    title: "Silent e Changes the Vowel",
    1: "The e at the end is silent. It makes the vowel say its name.",
    2: "The e at the end is silent. It makes the vowel say its name.",
    3: "The e at the end is silent. It makes the vowel say its name.",
  },
  'G1-585': {
    title: "Long a: ai and ay",
    1: "ai and ay both spell long a.",
    2: "ai and ay both spell long a.",
    3: "ai and ay both spell long a.",
  },
  'G1-586': {
    title: "Long e: ee and ea",
    1: "ee and ea both spell long e.",
    2: "ee and ea both spell long e.",
    3: "ee and ea both spell long e.",
  },
  'G1-587': {
    title: "Long o: oa and ow",
    1: "oa and ow both spell long o.",
    2: "oa and ow both spell long o.",
    3: "oa and ow both spell long o.",
  },
  'G1-588': {
    title: "Letter Teams: sh, ch, and th",
    1: "Write the letter team to make new words and to finish the words. Read every word. Then circle the word that fits each sentence.",
    2: "Read each word and draw a line to its picture. Then write each word under its letter team.",
    3: "Write the word for each picture. Write each word under its letter team. Then finish the words in the sentences.",
  },
  'G1-589': {
    title: "Letter Teams: ck, ng, and wh",
    1: "Write the letter team to make new words and to finish the words. Read every word. Then circle the word that fits each sentence.",
    2: "Read each word and draw a line to its picture. Then write each word under its letter team.",
    3: "Write the word for each picture. Write each word under its letter team. Then finish the words in the sentences.",
  },
  'G1-590': {
    title: "Blends at the Start",
    1: "Add s to make new words, and write the blend in each word. Read every word. Then circle the word that fits each sentence.",
    2: "Read each word and draw a line to its picture. Then write each word under its kind of blend.",
    3: "Write the word for each picture. Write each word under its kind of blend. Then write the two letters that start the words in the sentences.",
  },
  'G1-591': {
    title: "Blends at the End",
    1: "Write nd to make new words and to finish the words. Read every word. Then circle the word that fits each sentence.",
    2: "Read each word and draw a line to its picture. Then write each word under its ending.",
    3: "Write the word for each picture. Write each word under its ending. Then finish the words in the sentences.",
  },
  'G3-510': {
    title: "Read the Text and the Map",
    1: "Read the text and look at the map. Circle the answer to each question. Then circle where you found it.",
    2: "Read the text and look at the map. Write each answer. Then put a check mark next to where you found it.",
    3: "Read the text and look at the map. Write each answer and put a check mark next to where you found it. Then name the two numbered places.",
  },
  'G3-511': {
    title: "Read the Text and Diagram",
    1: "Read the text and look at the diagram. Circle the answer to each question. Then circle where you found it.",
    2: "Read the text and look at the diagram. Write each answer. Then put a check mark next to where you found it.",
    3: "Read the text and look at the diagram. Write each answer and put a check mark next to where you found it. Then write the missing step.",
  },
  'K-654': {
    title: "Naming Words and Action Words",
    1: "Listen as your teacher names each picture. Cut out the cards. Glue each card in the naming box or the action box.",
    2: "Read the word on each card. Cut out the cards. Glue each card in the naming box or the action box.",
    3: "Cut out the cards and glue each one in its box. Then finish the sentence with a naming word and an action word.",
  },
  'K-655': {
    title: "A Sentence Starts with a Capital Letter",
    1: "Circle the first letter of each sentence and every word I. If a sentence starts with a small letter, write its capital letter in the box above it.",
    2: "Circle the first letter of each sentence and every word I. If a sentence starts with a small letter, write its capital letter in the box above it.",
    3: "Circle the first letter of each sentence and every word I. Write a capital letter in the box above each small first letter. Then copy the sentence at the bottom.",
  },
  'K-656': {
    title: "A Period or a Question Mark?",
    1: "Listen as your teacher reads each sentence. Does it tell or ask? Circle the period or the question mark.",
    2: "Read each sentence. Does it tell or ask? Write a period or a question mark in the box.",
    3: "Write a period or a question mark in each box. Then write one telling sentence and one asking sentence about the picture.",
  },
  'K-657': {
    title: "Say More: Make the Sentence Longer",
    1: "Listen as your teacher reads each sentence. Look at the picture. Circle the words that tell where or when.",
    2: "Read each sentence and look at the picture. Circle the words that tell where or when. Write them on the line.",
    3: "Read each sentence and look at the picture. Write your own words on the line to tell where or when.",
  },
  'K-658': {
    title: "Find the Action Word",
    1: "Listen as your teacher names the pictures in each row. Circle the picture that shows an action.",
    2: "Read the three words in each row. Circle the action word.",
    3: "Read each sentence. Circle the naming word. Draw a line under the action word.",
  },
  'K-659': {
    title: "Telling or Asking? Sort the Sentences",
    1: "Listen as your teacher reads each strip. Cut out the strips. Glue each one in the period box or the question mark box.",
    2: "Read each strip. Cut out the strips. Glue each one in the period box or the question mark box.",
    3: "Read each strip and write a period or a question mark in its box. Then cut out the strips and glue each one in the box for its mark.",
  },
  'K-660': {
    title: "Fix the First Letter",
    1: "Each sentence is written two ways. Circle the one that starts with a capital letter.",
    2: "Circle the sentence that starts with a capital letter. Then write that capital letter in the box.",
    3: "Each sentence starts with a small letter. Write its first word with a capital letter on the line.",
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
