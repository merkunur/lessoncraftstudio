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
    'K-008': C('Small-to-moderate change: a vowel unit axis + a larger CVC bank'),
    'K-009': C('Needs a vowel unit axis and a larger CVC bank'),
    'K-011': C('a minimal-pair bank with first/last/middle levels'),
    'K-013': C('a read-aloud picture-panel story bank + Who/Where/What-happened boxes'),
    'K-014': C('a read-aloud story bank on the same layouts'),
    'K-015': C('picture-answer questions for a short read-aloud story'),
    'K-018': C('action pictures (library \'activities\' theme) and a cut-and-sort mode'),
    'K-020': C('a K level with 3-4-word sentences and no names'),
    'K-021': C('a \'write only the end mark\' K level with pictures'),
    'K-022': C('a K level with a picture and a printed add-on box'),
    'K-024': N('K-645', 'built: Find the Facts, a fact text of four sentences in big print; four questions answered by circling one of three pictures, by drawing, or by drawing and asking a question of their own'),
    'K-025': N('K-646', 'built: What Is It All About?, the same texts; circle the picture of the whole text, then circle or draw its key details'),
    'K-026': N('K-647', 'built: Pictures That Teach, a line from each sentence of a fact text to the picture that goes with it (three sentences, four, four with one picture to draw); the labeled plant picture of the design gave way to the pictures of each text'),
    'K-027': N('K-648', 'built: First, Then, a fact text that tells a change, a question that names it, and two boxes joined by an arrow (cut and glue, draw, draw and write a word)'),
    'K-028': N('K-649', 'built: Two Texts, One Topic, two fact texts of four sentences on one topic and six pictures to sort into first text only, both texts, second text only (cut and glue, draw, draw and name)'),
    'K-029': C('an opinion frame with the writing-frames.js starter blanks'),
    'K-030': C('writing-frames.js'),
    'K-031': C('writing-frames.js'),
    '1-032': C('a one-syllable picture filter and vowel units'),
    '1-033': C('ng and wh units in data/b3/spelling-rules.js or the letter-of-the-week bank'),
    '1-035': C('a final-blend bank (nd, mp, st, nk) for the G1-493 factory'),
    '1-037': C('a characters-setting-events box set in G1-506 + a story from the G2-254 pools'),
    '1-038': B('a fable bank with lesson choices'),
    '1-039': C('a short story/poem bank with tagged feeling and sense words'),
    '1-041': C('CVC/CVCe pair bank + a vowel-by-vowel level'),
    '1-043': C('a corrected long-a bank with one-syllable ai and ay words'),
    '1-044': C('clean the bank to one-syllable long-e words'),
    '1-045': C('an oa-ow rule unit in data/b3/spelling-rules.js'),
    '1-046': C('sentences with days and months'),
    '1-048': C('a future column + a regular -ed level'),
    '1-049': C('writing-frames.js'),
    '1-051': C('an informative frame (This is all about ___ ..'),
    '1-052': C('a checklist page in writing-frames.js'),
    '1-053': C('sub-category bins + a definition-frame row'),
    '1-054': C('an -s/-ed/-ing column set with regular verbs only'),
    '1-055': N('G1-575', 'built: Read the Facts, an informational text of about 60 words with two headed parts; four questions to circle, to finish from a starter, or to write and underline in the text'),
    '1-056': N('G1-576', 'built: Main Topic and Key Details on the same texts (circle the topic and copy a detail; write the topic and two or three key details)'),
    '1-057': N('G1-577', 'built (nothing was close): Use the Text Features, find-it questions from headings, bold words, caption and glossary, with G1-578 Name the Text Features as the page before it'),
    '1-059': C('enable English with a closed-syllable word filter (napkin, basket)'),
    '1-061': C('add the words + a heart-word mapping mode in types/_shared/sight-word-pages.js'),
    '2-063': C('an oa-ow unit + cleaned long-a / long-e banks'),
    '2-064': C('three rule units in data/b3/spelling-rules.js (with the oi-middle / oy-end and ou-middle / ow-end rule)'),
    '2-065': C('longer stories + an organizer layout'),
    '2-066': B('a fable bank (~150 words) with retell strips and lesson choices'),
    '2-067': C('writing-frames.js'),
    '2-068': C('No sample story with mixed mistakes, no revise checks (detail, stronger word, word-wall spelling), no checklist for the own draft'),
    '2-069': C('an ar-or rule unit'),
    '2-070': C('an er-ir-ur rule unit (three bins on the G2-326 sort face)'),
    '2-071': C('a decoding-split bank by syllable type'),
    '2-072': C('add the words + a heart-word mode'),
    '2-074': N('G2-519', 'built: Main Topic and Paragraphs, an informational text of about 150 words as three numbered paragraphs without title or headings; circle the main topic and give each statement its paragraph, or write topic and focus, or also a heading'),
    '2-075': N('G2-520', 'built (nothing was close): Glossary and Index, the same texts as a small book page with headings, bold words, two captioned pictures, a glossary and an index; six find-it questions to circle or to write, and on the hardest level an index entry and a glossary entry to add'),
    '2-076': N('G2-521', 'built (the science page was not close enough): What the Diagram Shows, a text of two paragraphs and a cycle diagram of drawn stages with labels and arrows; questions from the diagram, what the diagram adds, a label and an arrow to add; with G2-524 Text or Diagram? as its second page'),
    '2-077': N('G2-522', 'built: Steps in Order, a how-it-is-made text of four steps (First, Next, Then, Finally) with three pictures; number the steps, write them in a flow chart, tell why one step comes before another; with G2-525 Before and After as its second page'),
    '2-079': C('an informative planner in writing-frames.js'),
    '2-080': C('No 12-line draft under group headings, no linking words in the margin, no definition, no closing, no checklist'),
    '2-081': B('two-text research set'),
    '2-082': C('an un-/re- prefix-key set in data/b5/word-parts.js'),
    '2-083': C('a suffix-meaning mode over the same bank'),
    '2-087': C('a story bank with the arc questions'),
    '2-092': C('a letter-parts level'),
    '2-093': C('a sentence set tagged for holidays / places / brands'),
    '3-094': B('a decoding-split bank by syllable type + a C/O marking mode'),
    '3-095': B('a syllable-type bank (silent-e, vowel-team, C-le) and a name-the-type mode on the G1-305 factory'),
    '3-096': C('a suffix mode over data/b5/word-parts.js'),
    '3-097': C('grade-3 heart words + a heart-word mode'),
    '3-098': C('longer grade-3 stories in the same Level Set format'),
    '3-099': B('a ~250-word folktale bank with message choices'),
    '3-100': C('No 250-word story with a changing character, no character web with proof lines, no cause-and-effect chain'),
    '3-103': B('No dictionary page, no guide words, no choosing among meanings, no spelling check'),
    '3-107': B('No sample opinion paragraph, no revise checks (support, linking words, commas), no peer box'),
    '3-108': C('P and Adv tags in data/grammar/grammar-tables.js SENTENCES + a label-all mode'),
    '3-109': C('irregular frames in data/b4/cloze-levelset.json + a rule column'),
    '3-111': C('an agreement sentence bank'),
    '3-112': N('G3-494', 'built: Answer with Evidence, an informational text of about 230 words in four numbered paragraphs with headings; the answer, the paragraph that proves it, on the hardest level the proving sentence; with G3-495 Ask and Answer (which question a sentence answers, questions of their own)'),
    '3-113': N('G3-496', 'built: Main Idea and Key Details, the same texts without their headings; the main idea among one too narrow and one too broad, three key details, a summary; with G3-497 The Main Idea of Each Paragraph'),
    '3-115': C('No 200-word text, no rain map, no questions that combine text and picture'),
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
