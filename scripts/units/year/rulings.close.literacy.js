/**
 * The ruling of every "close" line of the literacy type work list (Daily Teaching System, Part 12.3, 2026-11-15).
 *
 * The matching (match.en.literacy.json, every candidate's generator read by the analyst) said for 91 of the 134 pages
 * the English literacy year needs: an existing type does part of the task. The rule is the one of mathematics
 * (rulings.close.math.js): "use" only where the existing page teaches the lesson's OBJECTIVE at the lesson's grade as
 * it stands. I read all 91 accounts: none does. What is missing is content more often than layout (no information
 * text in any bank, no story over 73 words, no fable, phonics units for most vowel teams, heart words beyond the
 * first-grade list), so:
 *
 *   change  the type gets a new mode, level or content bank; the note says which (the analyst's own closing sentence)
 *   build   the layout itself is missing ("far"): a new type; it joins the "to build" list
 *   N(type) a change that is DONE names the type that was built (as in the mathematics file)
 *
 * A reviewer of the lesson texts can overrule a line. Written by a one-off script from the match file; from here on
 * it is edited by hand as lines are built.
 */
'use strict';
const U = (note, level, type) => ({ rule: 'use', note, ...(level ? { level } : {}), ...(type ? { type } : {}) });
const N = (type, note, level) => U(note, level, type);
const C = (note) => ({ rule: 'change', note });
const B = (note) => ({ rule: 'build', note });
module.exports = {
  en: {
    'K-001': B('a print-concepts mode of types/_shared/reader-book.js with an 8-page fold, title page, back cover and the three task levels'),
    'K-002': C('New layout (print-concepts page), not a small change'),
    'K-003': C('a box row under each K-552 sentence'),
    'K-004': C('a count-the-words mode over the K-552/K-527 sentence bank'),
    'K-005': C('change: an oral \'teacher says it\' mode with no letters and rime-controlled picture triples'),
    'K-008': N('K-661', 'built: Short a and Short i: words to read and match to pictures, the vowel to write, words to sort under a or i, the word to write for a picture'),
    'K-009': N('K-662', 'built: Short o, Short u, and Short e: words to read and match to pictures, the vowel to write, words to sort by vowel, the word to write for a picture'),
    'K-010': N('K-663', 'built: Change One Sound to Make a New Word, a ladder of six words; the teacher says each change, the child writes the new word (first sound; first or last; first, middle or last)'),
    'K-011': N('K-664', 'built: Which Word Matches? One Letter Is Different: two words that differ in the first, the last or the middle letter beside a picture; the word to circle and the letter to underline'),
    'K-013': N('K-650', 'built: Who Is in the Story, and Where?, a read-aloud story in four picture panels; who, where and what happens to circle, to draw, to draw and name with a word'),
    'K-014': N('K-651', 'built: Retell the Story: Beginning, Middle, End, three pictures of the story to number, three boxes to draw in, three big rows for First, Then, At the end'),
    'K-015': N('K-652', 'built: Ask and Answer Questions About a Story, who and where questions, what and how questions with pictures to circle, and a box for a question of the child'),
    'K-018': N('K-654', 'built: Naming Words and Action Words, cards to cut and glue into two boxes; with K-658 Find the Action Word'),
    'K-020': N('K-655', 'built: A Sentence Starts with a Capital Letter, three- and four-word sentences without names; with K-660 Fix the First Letter'),
    'K-021': N('K-656', 'built: A Period or a Question Mark?, circle the mark, write the mark, write a sentence; with K-659 Telling or Asking? Sort the Sentences'),
    'K-022': N('K-657', 'built: Say More: Make the Sentence Longer, a picture, a short sentence and three add-ons to choose from and to write'),
    'K-024': N('K-645', 'built: Find the Facts, a fact text of four sentences in big print; four questions answered by circling one of three pictures, by drawing, or by drawing and asking a question of their own'),
    'K-025': N('K-646', 'built: What Is It All About?, the same texts; circle the picture of the whole text, then circle or draw its key details'),
    'K-026': N('K-647', 'built: Pictures That Teach, a line from each sentence of a fact text to the picture that goes with it (three sentences, four, four with one picture to draw); the labeled plant picture of the design gave way to the pictures of each text'),
    'K-027': N('K-648', 'built: First, Then, a fact text that tells a change, a question that names it, and two boxes joined by an arrow (cut and glue, draw, draw and write a word)'),
    'K-028': N('K-649', 'built: Two Texts, One Topic, two fact texts of four sentences on one topic and six pictures to sort into first text only, both texts, second text only (cut and glue, draw, draw and name)'),
    'K-029': C('an opinion frame with the writing-frames.js starter blanks'),
    'K-030': C('writing-frames.js'),
    'K-031': C('writing-frames.js'),
    '1-032': C('a one-syllable picture filter and vowel units'),
    '1-033': N('G1-589', 'built: Digraphs: ck, ng, and wh, words to build from old words, to match with pictures, to sort and to finish in sentences'),
    '1-035': N('G1-591', 'built: Blends at the End, nd, mp, st and nk: words to build, to match, to sort and to write under pictures'),
    '1-037': N('G1-580', 'built: Characters, Setting, and Events, a story of about 70 words; the two characters among four animals, the setting and the big event to circle, to write in a few words, to write as a sentence'),
    '1-038': N('G1-581', 'built: Retell the Story and Tell Its Lesson, three sentences to order, a word bank, the retelling in the own words; the lesson beside the lesson of another story'),
    '1-039': N('G1-582', 'built: Feeling Words and Sense Words, two feeling words with their faces and two sense words with the part of the body, in a story that holds no other feeling word'),
    '1-040': N('G1-583', 'built: Who Is Telling the Story?, six sentences of a story with three spoken lines: the narrator or one of the two characters'),
    '1-041': N('G1-584', 'built: Silent e Changes the Vowel, pairs to finish (cap, cap_), pictures with the two words of a pair, sentences one word of a pair fits; a_e, then a_e and i_e, then all four vowels'),
    '1-043': N('G1-585', 'built: Long a: ai and ay, one-syllable words to match, finish, sort and write, with the rule of the place in the word'),
    '1-044': N('G1-586', 'built: Long e: ee and ea, one-syllable long-e words to match, finish with a picture, sort and write'),
    '1-045': N('G1-587', 'built: Long o: oa and ow, one-syllable words to match, finish, sort and write, with the rule of the place in the word'),
    '1-046': N('G1-592', 'built: Names, Days, and Months Get Capitals (words to circle and write again, the date, the own name, the birthday month); with G1-593 Capital Letter or Small Letter? (the word to choose in a sentence)'),
    '1-047': N('G1-594', 'built: Joining Words and, but, so, because: the word that fits best to circle in sentences with pictures, two sentences to join in writing (the key gives a sample and the other right forms)'),
    '1-048': N('G1-595', 'built: Yesterday, Today, and Tomorrow: a table of regular verbs with one form missing in each row, then one verb written three ways'),
    '1-049': C('writing-frames.js'),
    '1-051': C('an informative frame (This is all about ___ ..'),
    '1-052': C('a checklist page in writing-frames.js'),
    '1-053': C('sub-category bins + a definition-frame row'),
    '1-054': C('an -s/-ed/-ing column set with regular verbs only'),
    '1-055': N('G1-575', 'built: Read the Facts, an informational text of about 60 words with two headed parts; four questions to circle, to finish from a starter, or to write and underline in the text'),
    '1-056': N('G1-576', 'built: Main Topic and Key Details on the same texts (circle the topic and copy a detail; write the topic and two or three key details)'),
    '1-057': N('G1-577', 'built (nothing was close): Use the Text Features, find-it questions from headings, bold words, caption and glossary, with G1-578 Name the Text Features as the page before it'),
    '1-059': N('G1-600', 'built: Every Syllable Has a Vowel (vowels to underline, the number of syllables to write, words to match with pictures); with G1-601 One Syllable or Two? (a sort and the two-syllable word to circle in a sentence)'),
    '1-061': N('G1-603', 'built: Heart Words said, was, of, could: sound boxes, a heart over each tricky part, sentences written from memory behind a fold'),
    '2-063': N('G2-531', 'built: Vowel Teams for Long a, e, and o (ai, ay, ee, ea, oa, ow): the team to choose, words to sort and to write in sentences'),
    '2-064': N('G2-532', 'built: Vowel Sounds oo, ou, ow, oi, and oy (words to sort by sound, ou or ow and oi or oy to choose); with G2-543 Reading Words with oo, ou, ow, oi, and oy (yes or no, riddles, read and draw)'),
    '2-065': N('G2-526', 'built: How a Character Meets a Challenge, a fable of about 135 words in beginning, middle and end; the problem, what the character does, a feeling; with G2-527 What Happens and Why (causes and effects)'),
    '2-066': N('G2-528', 'built: What Is the Lesson?, the lesson among the lesson of another fable and a literal sentence, two events that show it; with G2-529 Beginning, Middle, and End (three sentences to order, the retelling written)'),
    '2-067': C('writing-frames.js'),
    '2-068': C('No sample story with mixed mistakes, no revise checks (detail, stronger word, word-wall spelling), no checklist for the own draft'),
    '2-069': N('G2-533', 'built: Bossy r, ar and or (words to sort, to finish and to write); with G2-544 Reading Words with ar and or'),
    '2-070': N('G2-534', 'built: er, ir, and ur, One Sound, Three Spellings (the spelling that looks right, words to sort in three columns); with G2-545 Reading Words with er, ir, and ur'),
    '2-071': N('G2-546', 'built: Long Vowels in Two-Syllable Words (words to split, the long syllable to circle; vowel teams, silent e, open syllables by level); with G2-547 Build and Read Two-Syllable Words'),
    '2-072': N('G2-548', 'built: Heart Words could, would, should (sound boxes, a heart over the tricky part, sentences written from memory behind a fold); because, friend, people and others on levels 2 and 3'),
    '2-074': N('G2-519', 'built: Main Topic and Paragraphs, an informational text of about 150 words as three numbered paragraphs without title or headings; circle the main topic and give each statement its paragraph, or write topic and focus, or also a heading'),
    '2-075': N('G2-520', 'built (nothing was close): Glossary and Index, the same texts as a small book page with headings, bold words, two captioned pictures, a glossary and an index; six find-it questions to circle or to write, and on the hardest level an index entry and a glossary entry to add'),
    '2-076': N('G2-521', 'built (the science page was not close enough): What the Diagram Shows, a text of two paragraphs and a cycle diagram of drawn stages with labels and arrows; questions from the diagram, what the diagram adds, a label and an arrow to add; with G2-524 Text or Diagram? as its second page'),
    '2-077': N('G2-522', 'built: Steps in Order, a how-it-is-made text of four steps (First, Next, Then, Finally) with three pictures; number the steps, write them in a flow chart, tell why one step comes before another; with G2-525 Before and After as its second page'),
    '2-079': C('an informative planner in writing-frames.js'),
    '2-080': C('No 12-line draft under group headings, no linking words in the margin, no definition, no closing, no checklist'),
    '2-081': B('two-text research set'),
    '2-082': N('G2-535', 'built: Prefixes un- and re-: the new word to write for a meaning, words to match with meanings, un or re to write in a sentence'),
    '2-083': N('G2-536', 'built: Suffixes -ful, -less, and -ly: the base word to circle and the suffix to underline, words to match with meanings, the suffix to write in a sentence'),
    '2-084': N('G2-537', 'built: Apostrophes: contractions to write and to expand, the owner with an apostrophe and s, the word of a sentence that needs its apostrophe'),
    '2-087': C('a story bank with the arc questions'),
    '2-092': C('a letter-parts level'),
    '2-093': C('a sentence set tagged for holidays / places / brands'),
    '3-094': B('a decoding-split bank by syllable type + a C/O marking mode'),
    '3-095': B('a syllable-type bank (silent-e, vowel-team, C-le) and a name-the-type mode on the G1-305 factory'),
    '3-096': C('a suffix mode over data/b5/word-parts.js'),
    '3-097': C('grade-3 heart words + a heart-word mode'),
    '3-098': N('G3-502', 'built: Show Where the Story Says It, a fable or folktale of about 210 words in four numbered paragraphs; the answer, the paragraph, the proving sentence; with G3-503 Ask and Answer About a Story'),
    '3-099': N('G3-504', 'built: The Central Message, the message among the message of another story and a literal sentence, three events that show it; with G3-505 Retell the Story'),
    '3-100': N('G3-506', 'built: Character Traits, a trait with the sentence that shows it and a feeling at the end; with G3-507 Cause and Effect in a Story'),
    '3-103': B('No dictionary page, no guide words, no choosing among meanings, no spelling check'),
    '3-107': B('No sample opinion paragraph, no revise checks (support, linking words, commas), no peer box'),
    '3-108': C('P and Adv tags in data/grammar/grammar-tables.js SENTENCES + a label-all mode'),
    '3-109': C('irregular frames in data/b4/cloze-levelset.json + a rule column'),
    '3-111': C('an agreement sentence bank'),
    '3-112': N('G3-494', 'built: Answer with Evidence, an informational text of about 230 words in four numbered paragraphs with headings; the answer, the paragraph that proves it, on the hardest level the proving sentence; with G3-495 Ask and Answer (which question a sentence answers, questions of their own)'),
    '3-113': N('G3-496', 'built: Main Idea and Key Details, the same texts without their headings; the main idea among one too narrow and one too broad, three key details, a summary; with G3-497 The Main Idea of Each Paragraph'),
    '3-115': N('G3-510', 'built: Read the Text and the Map (five texts with a grid map of real places) and G3-511 Read the Text and Diagram (five texts with a chain of steps); every question is marked map or diagram, text, or both'),
    '3-114': N('G3-498', 'built: Use the Text Features, the text as a small book (table of contents, key words in bold, sidebar, glossary, index); with G3-499 Which Text Feature?'),
    '3-116': N('G3-500', 'built: Events in Order, four events or steps on a chain First, Next, Then, Finally with a because-sentence; with G3-501 Cause and Effect (match, the missing half, one sentence with because or so)'),
    '3-117': B('two 150-word source texts + a 3-box note organizer'),
    '3-118': C('writing-frames.js'),
    '3-119': C('No 16-line draft under headings, no definition frame, no linking words, no concluding section, no checklist'),
    '3-120': B('The research-record pages exist for one animal / one habitat, but there is no question box, no two given source texts, no report frame with headings and diagram box, no source list'),
    '3-123': C('more/most rows + adverbs in data/grammar/grammar-tables.js COMPARISON'),
    '3-125': C('a title bank with a title-case rule'),
    '3-127': C('a \'bubble to quoted sentence\' level'),
    '3-128': C('No 16-line draft under event headings, no grade-3 time phrases (later that day, after a while), no ending box, no checklist'),
    '3-129': C('a revise-the-paragraph page over the same banks'),
    '3-134': C('No two 200-word information texts on one topic, no two-circle diagram to fill, no comparing sentences'),
  },
};
void N;
