/**
 * guide-showcase-configs.ts — Config-driven visual showcase data for
 * guide / bundle / idea / start pages.
 *
 * Uses the SAME component types (HeroShowcaseConfig, TieredShowcaseConfig,
 * SpotlightConfig, GalleryConfig) and /samples/ image URLs as tool pages.
 * Zero file reads, zero build-time risk.
 */

import type {
  HeroShowcaseConfig,
  TieredShowcaseConfig,
  SpotlightConfig,
  GalleryConfig,
} from '@/app/[locale]/apps/[slug]/showcase/ShowcaseSections';
import { imgUrl, tPills, tStringPills } from '@/config/showcase-i18n';
import { germanImages } from '@/config/german-showcase-images';
import { frenchImages } from '@/config/french-showcase-images';
import { spanishImages } from '@/config/spanish-showcase-images';
import { portugueseImages } from '@/config/portuguese-showcase-images';
import { italianImages } from '@/config/italian-showcase-images';
import { dutchImages } from '@/config/dutch-showcase-images';
import { swedishImages } from '@/config/swedish-showcase-images';
import { danishImages } from '@/config/danish-showcase-images';
import { norwegianImages } from '@/config/norwegian-showcase-images';
import { finnishImages } from '@/config/finnish-showcase-images';

export interface PageShowcaseConfig {
  hero: HeroShowcaseConfig;
  tiered: TieredShowcaseConfig;
  spotlight: SpotlightConfig;
  gallery: GalleryConfig;
}

// ─── Image URL builder ───
function img(appFolder: string, filename: string) {
  return `/samples/english/${encodeURIComponent(appFolder)}/${encodeURIComponent(filename)}`;
}

function localizedImg(appFolder: string, filename: string, locale: string) {
  if (locale === 'de') return imgUrl(appFolder, filename, 'de');
  if (locale === 'fr') return imgUrl(appFolder, filename, 'fr');
  if (locale === 'es') return imgUrl(appFolder, filename, 'es');
  if (locale === 'pt') return imgUrl(appFolder, filename, 'pt');
  if (locale === 'it') return imgUrl(appFolder, filename, 'it');
  if (locale === 'nl') return imgUrl(appFolder, filename, 'nl');
  if (locale === 'sv') return imgUrl(appFolder, filename, 'sv');
  if (locale === 'da') return imgUrl(appFolder, filename, 'da');
  if (locale === 'no') return imgUrl(appFolder, filename, 'no');
  if (locale === 'fi') return imgUrl(appFolder, filename, 'fi');
  return img(appFolder, filename);
}

// ─── Per-app visual data ───
// Each app provides: representative images, accent color, decorative symbol,
// display name, and short descriptors for generated configs.

export interface AppVisualData {
  folder: string;           // /samples/english/{folder}/
  accent: string;           // Tailwind color name
  symbol: string;           // decorative symbol
  label: string;            // short display name
  imgs: string[];           // 6+ filenames (hero×3, tiered×1, spotlight×1, gallery×3)
  answerKey: string;        // answer key image filename
  pills: Array<{ label: string; icon: string }>;
  spotPills: string[];
  galleryPills: string[];
  tierDesc: [string, string, string]; // beginner, explorer, expert
  frameColor: string;       // gallery frame hex
}

export const appData: Record<string, AppVisualData> = {
  addition: {
    folder: 'addition', accent: 'orange', symbol: '+', label: 'Addition',
    imgs: ['Addition Fun 1.webp', 'Addition Fun 2.webp', 'Addition Fun 3.webp', 'Addition Fun 4.webp', 'Addition Fun 5.webp', 'Addition Fun 6.webp'],
    answerKey: 'Addition Fun 5 answer_key.webp',
    pills: [{ label: 'Pictures + Numbers', icon: '🖼' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Print Instantly!', 'Pictures for Math', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Differentiated'],
    tierDesc: ['Simple picture counting (1-5)', 'Mixed images with sums to 10', 'Multi-step problems up to 20'],
    frameColor: '#b87333',
  },
  subtraction: {
    folder: 'subtraction', accent: 'pink', symbol: '−', label: 'Subtraction',
    imgs: ['Subtraction Fun 1.webp', 'Subtraction Fun 2.webp', 'Subtraction Fun 3.webp', 'Subtraction Fun 4.webp', 'cross out.webp', 'image number.webp'],
    answerKey: 'Subtraction Fun 1 answer_key.webp',
    pills: [{ label: 'Cross Out Method', icon: '✕' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Print Instantly!', 'Cross Out Pictures', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Modes'],
    tierDesc: ['Cross out pictures (1-5)', 'Image-number subtraction to 10', 'Mixed modes up to 20'],
    frameColor: '#C2185B',
  },
  'code-addition': {
    folder: 'code addition', accent: 'purple', symbol: '🔓', label: 'Code Addition',
    imgs: ['Code Breaker Addition 1.webp', 'Code Breaker Addition 2.webp', 'Code Breaker Addition 3.webp', 'Code Breaker Addition 4.webp', 'image_addition_worksheet.webp', 'Code Breaker Addition 1.webp'],
    answerKey: 'Code Breaker Addition 1 answer_key.webp',
    pills: [{ label: 'Decode Messages', icon: '🔓' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Crack the Code!', 'Math + Logic', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Engaging', 'Answers Included', 'Problem Solving'],
    tierDesc: ['Simple addition codes (1-5)', 'Intermediate codes to 10', 'Advanced decoding to 20'],
    frameColor: '#7B1FA2',
  },
  'more-less': {
    folder: 'more less', accent: 'teal', symbol: '⟨', label: 'More or Less',
    imgs: ['More Less.webp', 'More Less (8).webp', 'More Less (9).webp', 'More Less (10).webp', 'More Less (11).webp', 'More Less (12).webp'],
    answerKey: 'More Less answer_key (8).webp',
    pills: [{ label: 'Compare Amounts', icon: '⟨' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Compare & Learn!', 'Visual Comparisons', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Visual Learning', 'Answers Included', 'Number Sense'],
    tierDesc: ['Compare groups of 1-5', 'Compare amounts to 10', 'Greater/less than to 20'],
    frameColor: '#00796B',
  },
  'math-puzzle': {
    folder: 'math puzzle', accent: 'indigo', symbol: '✧', label: 'Math Puzzle',
    imgs: ['Math Puzzles.webp', 'Math Puzzles (1).webp', 'Math Puzzles (2).webp', 'Math Puzzles (3).webp', 'Math Puzzles (5).webp', 'Math Puzzles (8).webp'],
    answerKey: 'Math Puzzles answer_key (1).webp',
    pills: [{ label: 'Brain Teasers', icon: '🧩' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Puzzle Fun!', 'Math + Logic', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Challenging', 'Answers Included', 'Critical Thinking'],
    tierDesc: ['Simple number puzzles', 'Multi-step math puzzles', 'Advanced logic challenges'],
    frameColor: '#303F9F',
  },
  'math-worksheet': {
    folder: 'math worksheet', accent: 'blue', symbol: '=', label: 'Math Worksheet',
    imgs: ['Math Worksheet 1.webp', 'Math Worksheet 2.webp', 'Math Worksheet 3.webp', 'Math Worksheet 4.webp', 'Math Worksheet 8.webp', 'Math Worksheet 10.webp'],
    answerKey: 'Math Worksheet 1 answer_key.webp',
    pills: [{ label: 'Practice Problems', icon: '📝' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Practice Makes Perfect!', 'All Operations', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Comprehensive', 'Answers Included', 'All Skill Levels'],
    tierDesc: ['Basic operations (1-5)', 'Mixed problems to 10', 'Advanced multi-operation'],
    frameColor: '#1565C0',
  },
  'chart-count': {
    folder: 'chart count', accent: 'emerald', symbol: '📊', label: 'Chart Count',
    imgs: ['Picture Graph 1.webp', 'Picture Graph 2.webp', 'Picture Graph 3.webp', 'Picture Graph 5.webp', 'Picture Graph 8.webp', 'chart count.webp'],
    answerKey: 'Picture Graph 1 answer_key.webp',
    pills: [{ label: 'Picture Graphs', icon: '📊' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Data Made Fun!', 'Visual Graphing', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Data Skills', 'Answers Included', 'Visual Learning'],
    tierDesc: ['Count and graph (1-5)', 'Read and interpret graphs', 'Create multi-category graphs'],
    frameColor: '#2E7D32',
  },
  wordsearch: {
    folder: 'wordsearch', accent: 'sky', symbol: '🔍', label: 'Word Search',
    imgs: ['Word Search 1.webp', 'Word Search 2.webp', 'Word Search 3.webp', 'Word Search 4.webp', 'Word Search 6.webp', 'Word Search 8.webp'],
    answerKey: 'Word Search 1 answer_key.webp',
    pills: [{ label: 'Find Hidden Words', icon: '🔍' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Find the Words!', 'Custom Themes', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Vocabulary Builder', 'Answers Included', 'Any Theme'],
    tierDesc: ['Simple 6×6 grids', 'Medium 10×10 puzzles', 'Challenging 15×15 grids'],
    frameColor: '#0277BD',
  },
  crossword: {
    folder: 'crossword', accent: 'violet', symbol: '✦', label: 'Crossword',
    imgs: ['crossword_worksheet.webp', 'crossword_worksheet (1).webp', 'crossword_worksheet (2).webp', 'crossword_worksheet (3).webp', 'crossword_worksheet (5).webp', 'crossword_worksheet (6).webp'],
    answerKey: 'crossword_answer_key (1).webp',
    pills: [{ label: 'Crossword Puzzles', icon: '✦' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Solve the Clues!', 'Vocabulary Fun', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Word Skills', 'Answers Included', 'Custom Words'],
    tierDesc: ['Simple 5-word crosswords', 'Medium 10-word puzzles', 'Advanced 15+ word grids'],
    frameColor: '#7C3AED',
  },
  'word-scramble': {
    folder: 'word scramble', accent: 'rose', symbol: '🔀', label: 'Word Scramble',
    imgs: ['Word Scramble 1.webp', 'Word Scramble 2.webp', 'Word Scramble 3.webp', 'Word Scramble 4.webp', 'Word Scramble 8.webp', 'Word Scramble 10.webp'],
    answerKey: 'Word Scramble 1 answer-key.webp',
    pills: [{ label: 'Unscramble Words', icon: '🔀' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Unscramble Fun!', 'Spelling Practice', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Spelling Skills', 'Answers Included', 'Any Theme'],
    tierDesc: ['3-4 letter words', '5-6 letter scrambles', '7+ letter challenges'],
    frameColor: '#E91E63',
  },
  cryptogram: {
    folder: 'cryptogram', accent: 'amber', symbol: '🔐', label: 'Cryptogram',
    imgs: ['cryptogram_worksheet.webp', 'cryptogram_worksheet (1).webp', 'cryptogram_worksheet (2).webp', 'cryptogram_worksheet (3).webp', 'cryptogram_worksheet (6).webp', 'cryptogram_worksheet (8).webp'],
    answerKey: 'cryptogram_answer_key (1).webp',
    pills: [{ label: 'Decode Secrets', icon: '🔐' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Crack the Code!', 'Letter Substitution', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Logic Skills', 'Answers Included', 'Engaging'],
    tierDesc: ['Simple letter codes', 'Intermediate ciphers', 'Advanced cryptograms'],
    frameColor: '#F57C00',
  },
  'word-guess': {
    folder: 'word guess', accent: 'cyan', symbol: '💡', label: 'Word Guess',
    imgs: ['clue-grid_worksheet.webp', 'clue-grid_worksheet (1).webp', 'clue-grid_worksheet (2).webp', 'clue-grid_worksheet (3).webp', 'clue-grid_worksheet (4).webp', 'custom word list.webp'],
    answerKey: 'clue-grid_answer-key (1).webp',
    pills: [{ label: 'Guess the Word', icon: '💡' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Guess It!', 'Picture Clues', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Vocabulary', 'Answers Included', 'Picture Clues'],
    tierDesc: ['Simple picture clues', 'Multi-clue puzzles', 'Advanced word deduction'],
    frameColor: '#00838F',
  },
  writing: {
    folder: 'writing', accent: 'indigo', symbol: '✏', label: 'Writing',
    imgs: ['writing.webp', 'writing beginning letter.webp', 'writing custom.webp', 'writing.webp', 'writing beginning letter.webp', 'writing custom.webp'],
    answerKey: 'writing.webp',
    pills: [{ label: 'Handwriting Practice', icon: '✏' }, { label: 'Guided Lines', icon: '─' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Write & Learn!', 'Letter Formation', 'Guided Practice'],
    galleryPills: ['Print-Ready', 'Fine Motor Skills', 'Traceable', 'All Letters'],
    tierDesc: ['Tracing practice', 'Guided letter writing', 'Independent writing'],
    frameColor: '#283593',
  },
  'alphabet-train': {
    folder: 'alphabet train', accent: 'green', symbol: '🚂', label: 'Alphabet Train',
    imgs: ['Alphabet Train 1.webp', 'Alphabet Train 2.webp', 'Alphabet Train 3.webp', 'Alphabet Train 4.webp', 'Alphabet Train 5.webp', 'Alphabet Train 8.webp'],
    answerKey: 'Alphabet Train 1 answer_key.webp',
    pills: [{ label: 'ABC Learning', icon: '🚂' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['All Aboard ABC!', 'Letter Recognition', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Phonics', 'Answers Included', 'Fun Theme'],
    tierDesc: ['Letter recognition A-H', 'Letter matching I-P', 'Full alphabet challenges'],
    frameColor: '#388E3C',
  },
  prepositions: {
    folder: 'prepositions', accent: 'teal', symbol: '📍', label: 'Prepositions',
    imgs: ['prepositions_worksheet.webp', 'prepositions_worksheet (1).webp', 'prepositions_worksheet (2).webp', 'prepositions_worksheet (3).webp', 'prepositions_worksheet (5).webp', 'prepositions_worksheet (6).webp'],
    answerKey: 'prepositions_answer_key (1).webp',
    pills: [{ label: 'Position Words', icon: '📍' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Where Is It?', 'Position Practice', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Grammar', 'Answers Included', 'Visual Learning'],
    tierDesc: ['Basic positions (in, on, under)', 'Intermediate prepositions', 'Advanced spatial words'],
    frameColor: '#00695C',
  },
  coloring: {
    folder: 'coloring', accent: 'rose', symbol: '🎨', label: 'Coloring',
    imgs: ['coloring portrait 1.webp', 'coloring portrait 2.webp', 'coloring portrait 3.webp', 'coloring portrait 4.webp', 'coloring portrait 5.webp', 'coloring portrait 6.webp'],
    answerKey: 'coloring portrait 1.webp',
    pills: [{ label: 'Color & Create', icon: '🎨' }, { label: 'Themed Pages', icon: '🖌' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Color Your World!', '100+ Themes', 'Print & Color'],
    galleryPills: ['Print-Ready', 'Creative Fun', 'Any Theme', 'Fine Motor Skills'],
    tierDesc: ['Simple outlines', 'Detailed scenes', 'Complex patterns'],
    frameColor: '#AD1457',
  },
  'draw-and-color': {
    folder: 'draw and color', accent: 'amber', symbol: '✏', label: 'Draw & Color',
    imgs: ['grid-drawing_worksheet.webp', 'grid-drawing_worksheet (1).webp', 'grid-drawing_worksheet (2).webp', 'grid-drawing_worksheet (5).webp', 'grid-drawing_worksheet (8).webp', 'grid-drawing_worksheet (10).webp'],
    answerKey: 'grid-drawing_worksheet.webp',
    pills: [{ label: 'Grid Drawing', icon: '✏' }, { label: 'Step-by-Step', icon: '📐' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Draw It!', 'Grid Guidance', 'Creative Fun'],
    galleryPills: ['Print-Ready', 'Art Skills', 'Step-by-Step', 'Any Theme'],
    tierDesc: ['Simple grid copies', 'Detailed grid drawings', 'Freehand challenges'],
    frameColor: '#E65100',
  },
  'drawing-lines': {
    folder: 'drawing lines', accent: 'cyan', symbol: '〰', label: 'Drawing Lines',
    imgs: ['drawing_lines_horizontal.webp', 'drawing_lines_vertical.webp', 'drawing_lines_curve 1.webp', 'drawing_lines_curve 2.webp', 'drawing_lines_curve 3.webp', 'drawing_lines_worksheet (1).webp'],
    answerKey: 'drawing_lines_horizontal.webp',
    pills: [{ label: 'Trace Lines', icon: '〰' }, { label: 'Fine Motor', icon: '✋' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Trace & Learn!', 'Motor Skills', 'Pre-Writing'],
    galleryPills: ['Print-Ready', 'Pre-Writing', 'Fine Motor', 'Progressive'],
    tierDesc: ['Straight lines', 'Curved paths', 'Complex patterns'],
    frameColor: '#006064',
  },
  matching: {
    folder: 'matching', accent: 'emerald', symbol: '🔗', label: 'Matching',
    imgs: ['Match Up 1.webp', 'Match Up 2.webp', 'Match Up 3.webp', 'Match Up 5.webp', 'Match Up 8.webp', 'matching portrait.webp'],
    answerKey: 'Match Up 1 answer_key.webp',
    pills: [{ label: 'Match Pairs', icon: '🔗' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Find the Match!', 'Visual Pairing', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Cognitive Skills', 'Answers Included', 'Any Theme'],
    tierDesc: ['Simple 3-pair matching', 'Medium 5-pair matching', 'Advanced 8+ pairs'],
    frameColor: '#1B5E20',
  },
  'grid-match': {
    folder: 'grid match', accent: 'blue', symbol: '⊞', label: 'Grid Match',
    imgs: ['Grid Match.webp', 'Grid Match (1).webp', 'Grid Match (2).webp', 'Grid Match (3).webp', 'Grid Match (6).webp', 'Grid Match (8).webp'],
    answerKey: 'Grid Match answer_key (1).webp',
    pills: [{ label: 'Grid Puzzles', icon: '⊞' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Match the Grid!', 'Spatial Skills', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Logic', 'Answers Included', 'Visual Thinking'],
    tierDesc: ['Simple 2×2 grids', 'Medium 3×3 grids', 'Advanced 4×4 grids'],
    frameColor: '#1565C0',
  },
  'shadow-match': {
    folder: 'shadow match', accent: 'violet', symbol: '👤', label: 'Shadow Match',
    imgs: ['shadow-match-worksheet.webp', 'shadow-match-worksheet (1).webp', 'shadow-match-worksheet (2).webp', 'shadow-match-worksheet (3).webp', 'shadow-match-horizontal.webp', 'shadow-match-vertical.webp'],
    answerKey: 'shadow-match-answer-key (1).webp',
    pills: [{ label: 'Match Shadows', icon: '👤' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Find the Shadow!', 'Visual Matching', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Observation', 'Answers Included', 'Fun Challenge'],
    tierDesc: ['Simple shadow pairs', 'Rotated shadows', 'Complex shadow puzzles'],
    frameColor: '#4527A0',
  },
  bingo: {
    folder: 'bingo', accent: 'red', symbol: '🎯', label: 'Bingo',
    imgs: ['bingo_card.webp', 'bingo_card_1.webp', 'bingo_card_2.webp', 'bingo_card_3.webp', 'bingo_card_4.webp', 'callout.webp'],
    answerKey: 'callout.webp',
    pills: [{ label: 'Bingo Cards', icon: '🎯' }, { label: 'Callout Sheets', icon: '📋' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['BINGO!', 'Group Activity', 'Print & Play'],
    galleryPills: ['Print-Ready', 'Group Fun', 'Custom Themes', 'Callouts Included'],
    tierDesc: ['3×3 simple bingo', '4×4 picture bingo', '5×5 full bingo cards'],
    frameColor: '#C62828',
  },
  'picture-sort': {
    folder: 'picture sort', accent: 'orange', symbol: '📦', label: 'Picture Sort',
    imgs: ['Picture Sort.webp', 'Picture Sort (1).webp', 'Picture Sort (2).webp', 'Picture Sort (3).webp', 'Picture Sort (5).webp', 'Picture Sort (6).webp'],
    answerKey: 'Picture Sort answer_key (1).webp',
    pills: [{ label: 'Sort & Classify', icon: '📦' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Sort It Out!', 'Categories', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Classification', 'Answers Included', 'Critical Thinking'],
    tierDesc: ['2-category sorting', '3-category sorting', '4+ category challenges'],
    frameColor: '#E65100',
  },
  'missing-pieces': {
    folder: 'missing pieces', accent: 'indigo', symbol: '🧩', label: 'Missing Pieces',
    imgs: ['Missing Pieces.webp', 'Missing Pieces (1).webp', 'Missing Pieces (2).webp', 'Missing Pieces (3).webp', 'Missing Pieces (6).webp', 'Missing Pieces (8).webp'],
    answerKey: 'Missing Pieces answer_key (1).webp',
    pills: [{ label: 'Find Missing Parts', icon: '🧩' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Complete the Picture!', 'Visual Logic', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Observation', 'Answers Included', 'Spatial Skills'],
    tierDesc: ['Simple missing parts', 'Multi-piece puzzles', 'Complex visual challenges'],
    frameColor: '#283593',
  },
  'odd-one-out': {
    folder: 'odd one out', accent: 'amber', symbol: '❓', label: 'Odd One Out',
    imgs: ['Find the Odd One Out.webp', 'Find the Odd One Out (1).webp', 'Find the Odd One Out (2).webp', 'Find the Odd One Out (3).webp', 'Find the Odd One Out (5).webp', 'Find the Odd One Out (6).webp'],
    answerKey: 'Find the Odd One Out answer-key (1).webp',
    pills: [{ label: 'Spot the Odd One', icon: '❓' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Which One Is Different?', 'Visual Reasoning', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Logic', 'Answers Included', 'Observation Skills'],
    tierDesc: ['Simple 3-item groups', 'Medium 4-item groups', 'Advanced 6+ items'],
    frameColor: '#FF8F00',
  },
  sudoku: {
    folder: 'sudoku', accent: 'teal', symbol: '▦', label: 'Sudoku',
    imgs: ['sudoku_easy.webp', 'sudoku medium.webp', 'sudoku hard.webp', 'sudoku_worksheet.webp', 'sudoku_worksheet (3).webp', 'sudoku_worksheet (5).webp'],
    answerKey: 'sudoku_answer_key (1).webp',
    pills: [{ label: 'Picture Sudoku', icon: '▦' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Sudoku Fun!', 'Logic Puzzles', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Brain Training', 'Answers Included', '3 Difficulties'],
    tierDesc: ['Easy 4×4 picture sudoku', 'Medium 6×6 grids', 'Hard 9×9 challenges'],
    frameColor: '#00695C',
  },
  'picture-path': {
    folder: 'picture path', accent: 'green', symbol: '🛤', label: 'Picture Path',
    imgs: ['Picture Pathway.webp', 'Picture Pathway (1).webp', 'Picture Pathway (2).webp', 'Picture Pathway (3).webp', 'Picture Pathway (5).webp', 'Picture Pathway (6).webp'],
    answerKey: 'Picture Pathway answer_key (1).webp',
    pills: [{ label: 'Follow the Path', icon: '🛤' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Find the Way!', 'Maze & Path', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Navigation', 'Answers Included', 'Fun Themes'],
    tierDesc: ['Simple straight paths', 'Branching pathways', 'Complex maze paths'],
    frameColor: '#2E7D32',
  },
  'find-and-count': {
    folder: 'find and count', accent: 'sky', symbol: '👁', label: 'Find & Count',
    imgs: ['I Spy 1.webp', 'I Spy 2.webp', 'I Spy 3.webp', 'I Spy 4.webp', 'I Spy 8.webp', 'I Spy 10.webp'],
    answerKey: 'I Spy 1 answer_key.webp',
    pills: [{ label: 'I Spy & Count', icon: '👁' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['I Spy!', 'Count & Find', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Counting', 'Answers Included', 'Themed Scenes'],
    tierDesc: ['Find 3-5 objects', 'Count up to 10 items', 'Advanced multi-count scenes'],
    frameColor: '#0277BD',
  },
  'find-objects': {
    folder: 'find objects', accent: 'purple', symbol: '🔎', label: 'Find Objects',
    imgs: ['spotworks_worksheet.webp', 'spotworks_worksheet (1).webp', 'spotworks_worksheet (2).webp', 'spotworks_worksheet (5).webp', 'spotworks_worksheet (8).webp', 'spotworks_worksheet (10).webp'],
    answerKey: 'spotworks_answer_key (1).webp',
    pills: [{ label: 'Hidden Objects', icon: '🔎' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Find Them All!', 'Sharp Eyes', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Observation', 'Answers Included', 'Detailed Scenes'],
    tierDesc: ['Simple hidden objects', 'Moderate scene searches', 'Complex find challenges'],
    frameColor: '#6A1B9A',
  },
  'treasure-hunt': {
    folder: 'treasure hunt', accent: 'amber', symbol: '🗺', label: 'Treasure Hunt',
    imgs: ['Treasure Hunt 1.webp', 'Treasure Hunt 2.webp', 'Treasure Hunt 3.webp', 'Treasure Hunt 4.webp', 'Treasure Hunt 5.webp', 'north south.webp'],
    answerKey: 'Treasure Hunt 1 answer_key.webp',
    pills: [{ label: 'Map Adventures', icon: '🗺' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Hunt for Treasure!', 'Map Reading', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Navigation', 'Answers Included', 'Adventure'],
    tierDesc: ['Simple grid maps', 'Directional treasure maps', 'Complex multi-step hunts'],
    frameColor: '#F57F17',
  },
  'big-small': {
    folder: 'big small', accent: 'pink', symbol: '↕', label: 'Big & Small',
    imgs: ['big-small-worksheet_worksheet.webp', 'big-small identical images.webp', 'big-small-different images.webp', 'big-small number 1-2-3.webp', 'big-small-worksheet_worksheet (5).webp', 'big-small-worksheet_worksheet (10).webp'],
    answerKey: 'big-small-worksheet_answer_key (1).webp',
    pills: [{ label: 'Size Comparison', icon: '↕' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Big or Small?', 'Visual Comparison', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Size Concepts', 'Answers Included', 'Visual Learning'],
    tierDesc: ['Simple big vs small', 'Order by size', 'Complex comparisons'],
    frameColor: '#C2185B',
  },
  'pattern-train': {
    folder: 'pattern train', accent: 'orange', symbol: '🔄', label: 'Pattern Train',
    imgs: ['pattern_train_worksheet.webp', 'pattern_train_worksheet (1).webp', 'pattern_train_worksheet (2).webp', 'pattern_train_worksheet (3).webp', 'pattern_train_worksheet (5).webp', 'pattern_train_worksheet (8).webp'],
    answerKey: 'pattern_train_answer_key (1).webp',
    pills: [{ label: 'Pattern Fun', icon: '🔄' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Complete the Pattern!', 'Train Theme', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Pattern Skills', 'Answers Included', 'Engaging Theme'],
    tierDesc: ['AB patterns', 'ABC patterns', 'Complex ABCD patterns'],
    frameColor: '#E65100',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet', accent: 'violet', symbol: '◆', label: 'Pattern Worksheet',
    imgs: ['pattern_worksheet.webp', 'pattern_worksheet (1).webp', 'pattern_worksheet (2).webp', 'pattern_worksheet (3).webp', 'pattern_worksheet (5).webp', 'pattern_worksheet (8).webp'],
    answerKey: 'pattern_answer_key (1).webp',
    pills: [{ label: 'Pattern Recognition', icon: '◆' }, { label: 'Answer Keys', icon: '✓' }, { label: 'Print-Ready', icon: '🖨' }, { label: 'Free Trial with Watermark', icon: '★' }],
    spotPills: ['Spot the Pattern!', 'Logical Thinking', 'With Answer Keys'],
    galleryPills: ['Print-Ready', 'Critical Thinking', 'Answers Included', 'Multiple Modes'],
    tierDesc: ['Simple repeating patterns', 'Growing patterns', 'Complex mixed patterns'],
    frameColor: '#4527A0',
  },
};

// ─── Gradient presets ───
const heroGradients = [
  'linear-gradient(135deg, #fff7ed 0%, #fed7aa 30%, #fdba74 60%, #fb923c 100%)',
  'linear-gradient(155deg, #F3E5F5 0%, #FCE4EC 50%, #FFF3E0 100%)',
  'linear-gradient(145deg, #ecfdf5 0%, #d1fae5 40%, #a7f3d0 100%)',
  'linear-gradient(135deg, #eff6ff 0%, #dbeafe 40%, #bfdbfe 100%)',
  'linear-gradient(155deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
  'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 40%, #ddd6fe 100%)',
  'linear-gradient(145deg, #ecfeff 0%, #cffafe 40%, #a5f3fc 100%)',
  'linear-gradient(135deg, #fefce8 0%, #fef9c3 40%, #fde68a 100%)',
];

const tieredGradients = [
  'linear-gradient(180deg, #dbeafe 0%, #fef3c7 40%, #fed7aa 70%, #fecaca 100%)',
  'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 40%, #fef3c7 100%)',
  'linear-gradient(180deg, #d1fae5 0%, #dbeafe 40%, #fef3c7 100%)',
  'linear-gradient(180deg, #cffafe 0%, #dbeafe 40%, #ede9fe 100%)',
  'linear-gradient(180deg, #fce7f3 0%, #fef3c7 40%, #d1fae5 100%)',
];

const spotlightGradients = [
  'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
  'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
  'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
  'linear-gradient(180deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)',
  'linear-gradient(180deg, #fff7ed 0%, #fed7aa 50%, #fdba74 100%)',
  'linear-gradient(180deg, #fefce8 0%, #fef9c3 50%, #fde68a 100%)',
];

const galleryGradient = 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)';

// ─── German app visual data ───
// Built from English appData + German image filenames + German text.

const deLabels: Record<string, string> = {
  addition: 'Additions', subtraction: 'Subtraktions', 'code-addition': 'Codeknacker',
  'more-less': 'Vergleichs', 'math-puzzle': 'Mathe-Rätsel', 'math-worksheet': 'Mathe-Übungs',
  'chart-count': 'Bilddiagramm', wordsearch: 'Wortsuche', crossword: 'Kreuzworträtsel',
  'word-scramble': 'Buchstabensalat', cryptogram: 'Kryptogramm', 'word-guess': 'Worträtsel',
  writing: 'Schreib', 'alphabet-train': 'Alphabet-Zug', prepositions: 'Präpositions',
  coloring: 'Ausmal', 'draw-and-color': 'Rasterzeichen', 'drawing-lines': 'Linien',
  'big-small': 'Größenvergleichs', 'pattern-train': 'Musterzug', 'pattern-worksheet': 'Muster',
  matching: 'Zuordnungs', 'grid-match': 'Raster-Puzzle', 'shadow-match': 'Schatten',
  bingo: 'Bilder-Bingo', 'picture-sort': 'Sortier', 'missing-pieces': 'Puzzle',
  'odd-one-out': 'Logik', sudoku: 'Sudoku', 'picture-path': 'Pfad',
  'find-and-count': 'Such-und-Zähl', 'find-objects': 'Suchbild', 'treasure-hunt': 'Schatzsuche',
};

const deTierDescs: Record<string, [string, string, string]> = {
  addition: ['Einfaches Bilder-Zählen (1-5)', 'Gemischte Bilder bis 10', 'Mehrstufige Aufgaben bis 20'],
  subtraction: ['Bilder durchstreichen (1-5)', 'Bild-Zahl-Subtraktion bis 10', 'Gemischte Modi bis 20'],
  'code-addition': ['Einfache Codes (1-5)', 'Mittlere Codes bis 10', 'Komplexe Codes bis 20'],
  'more-less': ['Gruppen vergleichen (1-5)', 'Themengruppen bis 10', 'Größer/kleiner/gleich'],
  'math-puzzle': ['Einfache Zahlenrätsel', 'Mehrstufige Rätsel', 'Komplexe Logik-Aufgaben'],
  'math-worksheet': ['Einfache Rechenaufgaben (1-5)', 'Gemischte Aufgaben bis 10', 'Fortgeschrittene Mehrstufenaufgaben'],
  'chart-count': ['Zählen und darstellen (1-5)', 'Diagramme interpretieren', 'Mehrkategorien-Diagramme'],
  wordsearch: ['Einfache 6×6-Raster', 'Mittlere 10×10-Rätsel', 'Anspruchsvolle 15×15-Raster'],
  crossword: ['Einfache 5-Wort-Rätsel', 'Mittlere 10-Wort-Rätsel', 'Fortgeschrittene 15+ Wort-Gitter'],
  'word-scramble': ['3-4 Buchstabenwörter', '5-6 Buchstaben-Rätsel', '7+ Buchstaben-Herausforderungen'],
  cryptogram: ['Einfache Buchstabencodes', 'Mittelschwere Verschlüsselungen', 'Fortgeschrittene Kryptogramme'],
  'word-guess': ['Einfache Bilderhinweise', 'Mehrteilige Rätsel', 'Fortgeschrittenes Wort-Raten'],
  writing: ['Nachzeichnen üben', 'Geführtes Schreiben', 'Selbstständiges Schreiben'],
  'alphabet-train': ['Buchstaben A-H', 'Buchstaben I-P', 'Ganzes Alphabet'],
  prepositions: ['Grundpositionen (auf, in, unter)', 'Erweiterte Präpositionen', 'Komplexe Raumbeschreibungen'],
  coloring: ['Einfache Umrisse', 'Detaillierte Szenen', 'Komplexe Muster'],
  'draw-and-color': ['Einfache Rasterkopien', 'Detaillierte Rasterzeichnungen', 'Freie Herausforderungen'],
  'drawing-lines': ['Gerade Linien', 'Geschwungene Pfade', 'Komplexe Muster'],
  'big-small': ['Einfach groß vs. klein', 'Nach Größe ordnen', 'Komplexe Vergleiche'],
  'pattern-train': ['AB-Muster', 'ABC-Muster', 'Komplexe ABCD-Muster'],
  'pattern-worksheet': ['Einfache Wiederholungen', 'Wachsende Muster', 'Gemischte Komplexmuster'],
  matching: ['Einfache 3-Paar-Zuordnung', 'Mittlere 5-Paar-Zuordnung', 'Fortgeschrittene 8+ Paare'],
  'grid-match': ['Einfache 2×2-Raster', 'Mittlere 3×3-Raster', 'Fortgeschrittene 4×4-Raster'],
  'shadow-match': ['Einfache Schattenpaare', 'Gedrehte Schatten', 'Komplexe Schattenrätsel'],
  bingo: ['Einfaches 3×3-Bingo', '4×4 Bilder-Bingo', '5×5 Vollbingo'],
  'picture-sort': ['2-Kategorien-Sortierung', '3-Kategorien-Sortierung', '4+ Kategorien'],
  'missing-pieces': ['Einfache fehlende Teile', 'Mehrteilige Puzzles', 'Komplexe visuelle Rätsel'],
  'odd-one-out': ['Einfache 3er-Gruppen', 'Mittlere 4er-Gruppen', 'Fortgeschrittene 6+ Gruppen'],
  sudoku: ['Einfaches 4×4 Bilder-Sudoku', 'Mittlere 6×6-Raster', 'Schwere 9×9-Raster'],
  'picture-path': ['Einfache gerade Pfade', 'Verzweigte Wege', 'Komplexe Labyrinth-Pfade'],
  'find-and-count': ['3-5 Objekte finden', 'Bis zu 10 zählen', 'Fortgeschrittene Zählszenen'],
  'find-objects': ['Einfache Objekte', 'Mittelschwere Szenen', 'Komplexe Suchbilder'],
  'treasure-hunt': ['Einfache Gitterkarten', 'Richtungsbasierte Karten', 'Mehrstufige Jagden'],
};

function getDeAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const gi = germanImages[key];
  if (!gi) return en;

  return {
    ...en,
    label: deLabels[key] || en.label,
    imgs: gi.imgs,
    answerKey: gi.answerKey,
    pills: tPills(en.pills, 'de'),
    spotPills: tStringPills(en.spotPills, 'de'),
    galleryPills: tStringPills(en.galleryPills, 'de'),
    tierDesc: deTierDescs[key] || en.tierDesc,
  };
}

// ─── French app visual data ───

const frLabels: Record<string, string> = {
  addition: 'Addition', subtraction: 'Soustraction', 'code-addition': 'Code addition',
  'more-less': 'Plus ou moins', 'math-puzzle': 'Puzzle maths', 'math-worksheet': 'Fiche maths',
  'chart-count': 'Graphique', wordsearch: 'Mots cachés', crossword: 'Mots croisés',
  'word-scramble': 'Lettres mélangées', cryptogram: 'Cryptogramme', 'word-guess': 'Devine le mot',
  writing: 'Écriture', 'alphabet-train': 'Train alphabet', prepositions: 'Prépositions',
  coloring: 'Coloriage', 'draw-and-color': 'Dessin grille', 'drawing-lines': 'Lignes',
  'big-small': 'Grand-petit', 'pattern-train': 'Train motifs', 'pattern-worksheet': 'Motifs',
  matching: 'Association', 'grid-match': 'Grille puzzle', 'shadow-match': 'Ombres',
  bingo: 'Loto images', 'picture-sort': 'Tri', 'missing-pieces': 'Puzzle',
  'odd-one-out': 'Intrus', sudoku: 'Sudoku', 'picture-path': 'Chemin',
  'find-and-count': 'Cherche et compte', 'find-objects': 'Objets cachés', 'treasure-hunt': 'Chasse au trésor',
};

const frTierDescs: Record<string, [string, string, string]> = {
  addition: ['Compter des images simples (1-5)', 'Images mélangées jusqu\'à 10', 'Opérations à plusieurs étapes jusqu\'à 20'],
  subtraction: ['Barrer des images (1-5)', 'Soustraction image-nombre jusqu\'à 10', 'Modes mixtes jusqu\'à 20'],
  'code-addition': ['Codes simples (1-5)', 'Codes intermédiaires jusqu\'à 10', 'Codes complexes jusqu\'à 20'],
  'more-less': ['Comparer des groupes (1-5)', 'Groupes thématiques jusqu\'à 10', 'Plus grand/plus petit/égal'],
  'math-puzzle': ['Puzzles numériques simples', 'Puzzles à plusieurs étapes', 'Défis logiques complexes'],
  'math-worksheet': ['Opérations simples (1-5)', 'Problèmes mixtes jusqu\'à 10', 'Opérations avancées multiples'],
  'chart-count': ['Compter et représenter (1-5)', 'Interpréter des graphiques', 'Graphiques multi-catégories'],
  wordsearch: ['Grilles simples 6×6', 'Grilles moyennes 10×10', 'Grilles avancées 15×15'],
  crossword: ['Mots croisés simples de 5 mots', 'Puzzles moyens de 10 mots', 'Grilles avancées de 15+ mots'],
  'word-scramble': ['Mots de 3-4 lettres', 'Mots de 5-6 lettres', 'Défis de 7+ lettres'],
  cryptogram: ['Codes de lettres simples', 'Chiffrements intermédiaires', 'Cryptogrammes avancés'],
  'word-guess': ['Indices en images simples', 'Puzzles à plusieurs parties', 'Devinettes avancées'],
  writing: ['Pratique de traçage', 'Écriture guidée', 'Écriture autonome'],
  'alphabet-train': ['Lettres A-H', 'Lettres I-P', 'Alphabet complet'],
  prepositions: ['Positions de base (sur, dans, sous)', 'Prépositions étendues', 'Relations spatiales complexes'],
  coloring: ['Contours simples', 'Scènes détaillées', 'Motifs complexes'],
  'draw-and-color': ['Copies de grille simples', 'Dessins de grille détaillés', 'Défis libres'],
  'drawing-lines': ['Lignes droites', 'Chemins courbes', 'Motifs complexes'],
  'big-small': ['Simple : grand vs. petit', 'Ordonner par taille', 'Comparaisons complexes'],
  'pattern-train': ['Motifs AB', 'Motifs ABC', 'Motifs ABCD complexes'],
  'pattern-worksheet': ['Répétitions simples', 'Motifs croissants', 'Motifs mixtes complexes'],
  matching: ['Association simple de 3 paires', 'Association moyenne de 5 paires', 'Association avancée de 8+ paires'],
  'grid-match': ['Grilles simples 2×2', 'Grilles moyennes 3×3', 'Grilles avancées 4×4'],
  'shadow-match': ['Paires d\'ombres simples', 'Ombres tournées', 'Puzzles d\'ombres complexes'],
  bingo: ['Loto simple 3×3', 'Loto d\'images 4×4', 'Loto complet 5×5'],
  'picture-sort': ['Tri en 2 catégories', 'Tri en 3 catégories', '4+ catégories'],
  'missing-pieces': ['Pièces manquantes simples', 'Puzzles à plusieurs pièces', 'Puzzles visuels complexes'],
  'odd-one-out': ['Groupes simples de 3', 'Groupes moyens de 4', 'Avancé : groupes de 6+'],
  sudoku: ['Sudoku en images simple 4×4', 'Grilles moyennes 6×6', 'Grilles difficiles 9×9'],
  'picture-path': ['Chemins droits simples', 'Chemins ramifiés', 'Labyrinthes complexes'],
  'find-and-count': ['Trouver 3-5 objets', 'Compter jusqu\'à 10', 'Scènes avancées'],
  'find-objects': ['Objets simples', 'Scènes intermédiaires', 'Recherches complexes'],
  'treasure-hunt': ['Cartes en grille simples', 'Cartes directionnelles', 'Chasses à plusieurs étapes'],
};

function getFrAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const fi = frenchImages[key];
  if (!fi) return en;

  return {
    ...en,
    label: frLabels[key] || en.label,
    imgs: fi.imgs,
    answerKey: fi.answerKey,
    pills: tPills(en.pills, 'fr'),
    spotPills: tStringPills(en.spotPills, 'fr'),
    galleryPills: tStringPills(en.galleryPills, 'fr'),
    tierDesc: frTierDescs[key] || en.tierDesc,
  };
}

// ─── Spanish app visual data ───

const esLabels: Record<string, string> = {
  addition: 'Suma', subtraction: 'Resta', 'code-addition': 'Código suma',
  'more-less': 'Comparación', 'math-puzzle': 'Puzzle matemático', 'math-worksheet': 'Hoja de matemáticas',
  'chart-count': 'Gráfico', wordsearch: 'Sopa de letras', crossword: 'Crucigrama',
  'word-scramble': 'Palabras revueltas', cryptogram: 'Criptograma', 'word-guess': 'Adivina la palabra',
  writing: 'Escritura', 'alphabet-train': 'Tren del alfabeto', prepositions: 'Preposiciones',
  coloring: 'Colorear', 'draw-and-color': 'Dibujo cuadrícula', 'drawing-lines': 'Líneas',
  'big-small': 'Comparación de tamaños', 'pattern-train': 'Tren de patrones', 'pattern-worksheet': 'Patrones',
  matching: 'Asociación', 'grid-match': 'Puzzle cuadrícula', 'shadow-match': 'Sombras',
  bingo: 'Bingo de imágenes', 'picture-sort': 'Clasificación', 'missing-pieces': 'Puzzle',
  'odd-one-out': 'Lógica', sudoku: 'Sudoku', 'picture-path': 'Camino',
  'find-and-count': 'Buscar y contar', 'find-objects': 'Objetos ocultos', 'treasure-hunt': 'Búsqueda del tesoro',
};

const esTierDescs: Record<string, [string, string, string]> = {
  addition: ['Conteo simple con imágenes (1-5)', 'Imágenes mixtas hasta 10', 'Problemas de varios pasos hasta 20'],
  subtraction: ['Tachar imágenes (1-5)', 'Resta imagen-número hasta 10', 'Modos mixtos hasta 20'],
  'code-addition': ['Códigos simples (1-5)', 'Códigos intermedios hasta 10', 'Códigos complejos hasta 20'],
  'more-less': ['Comparar grupos (1-5)', 'Grupos temáticos hasta 10', 'Mayor/menor/igual'],
  'math-puzzle': ['Puzzles numéricos simples', 'Puzzles de varios pasos', 'Desafíos lógicos complejos'],
  'math-worksheet': ['Operaciones simples (1-5)', 'Problemas mixtos hasta 10', 'Operaciones avanzadas múltiples'],
  'chart-count': ['Contar y representar (1-5)', 'Interpretar gráficos', 'Gráficos multi-categoría'],
  wordsearch: ['Cuadrículas simples 6×6', 'Cuadrículas medianas 10×10', 'Cuadrículas avanzadas 15×15'],
  crossword: ['Crucigramas simples de 5 palabras', 'Puzzles intermedios de 10 palabras', 'Cuadrículas avanzadas de 15+ palabras'],
  'word-scramble': ['Palabras de 3-4 letras', 'Palabras de 5-6 letras', 'Desafíos de 7+ letras'],
  cryptogram: ['Códigos de letras simples', 'Cifrados intermedios', 'Criptogramas avanzados'],
  'word-guess': ['Pistas de imágenes simples', 'Puzzles de varias partes', 'Adivinanzas avanzadas'],
  writing: ['Práctica de trazado', 'Escritura guiada', 'Escritura autónoma'],
  'alphabet-train': ['Letras A-H', 'Letras I-P', 'Alfabeto completo'],
  prepositions: ['Posiciones básicas (sobre, en, debajo)', 'Preposiciones ampliadas', 'Relaciones espaciales complejas'],
  coloring: ['Contornos simples', 'Escenas detalladas', 'Patrones complejos'],
  'draw-and-color': ['Copias de cuadrícula simples', 'Dibujos de cuadrícula detallados', 'Desafíos libres'],
  'drawing-lines': ['Líneas rectas', 'Caminos curvos', 'Patrones complejos'],
  'big-small': ['Simple: grande vs. pequeño', 'Ordenar por tamaño', 'Comparaciones complejas'],
  'pattern-train': ['Patrones AB', 'Patrones ABC', 'Patrones ABCD complejos'],
  'pattern-worksheet': ['Repeticiones simples', 'Patrones crecientes', 'Patrones mixtos complejos'],
  matching: ['Asociación simple de 3 parejas', 'Asociación media de 5 parejas', 'Asociación avanzada de 8+ parejas'],
  'grid-match': ['Cuadrículas simples 2×2', 'Cuadrículas medias 3×3', 'Cuadrículas avanzadas 4×4'],
  'shadow-match': ['Parejas de sombras simples', 'Sombras rotadas', 'Puzzles de sombras complejos'],
  bingo: ['Bingo simple 3×3', 'Bingo de imágenes 4×4', 'Bingo completo 5×5'],
  'picture-sort': ['Clasificación en 2 categorías', 'Clasificación en 3 categorías', '4+ categorías'],
  'missing-pieces': ['Piezas faltantes simples', 'Puzzles de varias piezas', 'Puzzles visuales complejos'],
  'odd-one-out': ['Grupos simples de 3', 'Grupos medios de 4', 'Avanzado: grupos de 6+'],
  sudoku: ['Sudoku de imágenes simple 4×4', 'Cuadrículas medias 6×6', 'Cuadrículas difíciles 9×9'],
  'picture-path': ['Caminos rectos simples', 'Caminos ramificados', 'Laberintos complejos'],
  'find-and-count': ['Encontrar 3-5 objetos', 'Contar hasta 10', 'Escenas avanzadas'],
  'find-objects': ['Objetos simples', 'Escenas intermedias', 'Búsquedas complejas'],
  'treasure-hunt': ['Mapas de cuadrícula simples', 'Mapas con direcciones', 'Búsquedas de varios pasos'],
};

function getEsAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const si = spanishImages[key];
  if (!si) return en;

  return {
    ...en,
    label: esLabels[key] || en.label,
    imgs: si.imgs,
    answerKey: si.answerKey,
    pills: tPills(en.pills, 'es'),
    spotPills: tStringPills(en.spotPills, 'es'),
    galleryPills: tStringPills(en.galleryPills, 'es'),
    tierDesc: esTierDescs[key] || en.tierDesc,
  };
}


// ─── Portuguese app visual data ───

const ptLabels: Record<string, string> = {
  addition: 'Adição', subtraction: 'Subtração', 'code-addition': 'Código adição',
  'more-less': 'Comparação', 'math-puzzle': 'Puzzle matemático', 'math-worksheet': 'Folha de matemática',
  'chart-count': 'Gráfico', wordsearch: 'Caça-palavras', crossword: 'Palavras cruzadas',
  'word-scramble': 'Letras embaralhadas', cryptogram: 'Criptograma', 'word-guess': 'Adivinha a palavra',
  writing: 'Escrita', 'alphabet-train': 'Comboio do alfabeto', prepositions: 'Preposições',
  coloring: 'Colorir', 'draw-and-color': 'Desenho grelha', 'drawing-lines': 'Linhas',
  'big-small': 'Comparação de tamanhos', 'pattern-train': 'Comboio de padrões', 'pattern-worksheet': 'Padrões',
  matching: 'Associação', 'grid-match': 'Puzzle grelha', 'shadow-match': 'Sombras',
  bingo: 'Bingo de imagens', 'picture-sort': 'Classificação', 'missing-pieces': 'Puzzle',
  'odd-one-out': 'Lógica', sudoku: 'Sudoku', 'picture-path': 'Caminho',
  'find-and-count': 'Procurar e contar', 'find-objects': 'Objetos escondidos', 'treasure-hunt': 'Caça ao tesouro',
};

const ptTierDescs: Record<string, [string, string, string]> = {
  addition: ['Contagem simples com imagens (1-5)', 'Imagens mistas até 10', 'Problemas de vários passos até 20'],
  subtraction: ['Riscar imagens (1-5)', 'Subtração imagem-número até 10', 'Modos mistos até 20'],
  'code-addition': ['Códigos simples (1-5)', 'Códigos intermédios até 10', 'Códigos complexos até 20'],
  'more-less': ['Comparar grupos (1-5)', 'Grupos temáticos até 10', 'Maior/menor/igual'],
  'math-puzzle': ['Puzzles numéricos simples', 'Puzzles de vários passos', 'Desafios lógicos complexos'],
  'math-worksheet': ['Operações simples (1-5)', 'Problemas mistos até 10', 'Operações avançadas múltiplas'],
  'chart-count': ['Contar e representar (1-5)', 'Interpretar gráficos', 'Gráficos multi-categoria'],
  wordsearch: ['Grelhas simples 6×6', 'Grelhas médias 10×10', 'Grelhas avançadas 15×15'],
  crossword: ['Palavras cruzadas simples de 5 palavras', 'Puzzles intermédios de 10 palavras', 'Grelhas avançadas de 15+ palavras'],
  'word-scramble': ['Palavras de 3-4 letras', 'Palavras de 5-6 letras', 'Desafios de 7+ letras'],
  cryptogram: ['Códigos de letras simples', 'Cifras intermédias', 'Criptogramas avançados'],
  'word-guess': ['Pistas de imagens simples', 'Puzzles de várias partes', 'Adivinhações avançadas'],
  writing: ['Prática de traçado', 'Escrita guiada', 'Escrita autónoma'],
  'alphabet-train': ['Letras A-H', 'Letras I-P', 'Alfabeto completo'],
  prepositions: ['Posições básicas (sobre, em, debaixo)', 'Preposições alargadas', 'Relações espaciais complexas'],
  coloring: ['Contornos simples', 'Cenas detalhadas', 'Padrões complexos'],
  'draw-and-color': ['Cópias de grelha simples', 'Desenhos de grelha detalhados', 'Desafios livres'],
  'drawing-lines': ['Linhas retas', 'Caminhos curvos', 'Padrões complexos'],
  'big-small': ['Simples: grande vs. pequeno', 'Ordenar por tamanho', 'Comparações complexas'],
  'pattern-train': ['Padrões AB', 'Padrões ABC', 'Padrões ABCD complexos'],
  'pattern-worksheet': ['Repetições simples', 'Padrões crescentes', 'Padrões mistos complexos'],
  matching: ['Associação simples de 3 pares', 'Associação média de 5 pares', 'Associação avançada de 8+ pares'],
  'grid-match': ['Grelhas simples 2×2', 'Grelhas médias 3×3', 'Grelhas avançadas 4×4'],
  'shadow-match': ['Pares de sombras simples', 'Sombras rodadas', 'Puzzles de sombras complexos'],
  bingo: ['Bingo simples 3×3', 'Bingo de imagens 4×4', 'Bingo completo 5×5'],
  'picture-sort': ['Classificação em 2 categorias', 'Classificação em 3 categorias', '4+ categorias'],
  'missing-pieces': ['Peças em falta simples', 'Puzzles de várias peças', 'Puzzles visuais complexos'],
  'odd-one-out': ['Grupos simples de 3', 'Grupos médios de 4', 'Avançado: grupos de 6+'],
  sudoku: ['Sudoku de imagens simples 4×4', 'Grelhas médias 6×6', 'Grelhas difíceis 9×9'],
  'picture-path': ['Caminhos retos simples', 'Caminhos ramificados', 'Labirintos complexos'],
  'find-and-count': ['Encontrar 3-5 objetos', 'Contar até 10', 'Cenas avançadas'],
  'find-objects': ['Objetos simples', 'Cenas intermédias', 'Pesquisas complexas'],
  'treasure-hunt': ['Mapas de grelha simples', 'Mapas com direções', 'Caças de vários passos'],
};

function getPtAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const pi = portugueseImages[key];
  if (!pi) return en;

  return {
    ...en,
    label: ptLabels[key] || en.label,
    imgs: pi.imgs,
    answerKey: pi.answerKey,
    pills: tPills(en.pills, 'pt'),
    spotPills: tStringPills(en.spotPills, 'pt'),
    galleryPills: tStringPills(en.galleryPills, 'pt'),
    tierDesc: ptTierDescs[key] || en.tierDesc,
  };
}

// ─── Italian app visual data ───

const itLabels: Record<string, string> = {
  addition: 'Addizione', subtraction: 'Sottrazione', 'code-addition': 'Codice addizione',
  'more-less': 'Confronto', 'math-puzzle': 'Puzzle matematico', 'math-worksheet': 'Foglio di matematica',
  'chart-count': 'Grafico', wordsearch: 'Cerca parole', crossword: 'Cruciverba',
  'word-scramble': 'Lettere mescolate', cryptogram: 'Crittogramma', 'word-guess': 'Indovina la parola',
  writing: 'Scrittura', 'alphabet-train': 'Treno dell\'alfabeto', prepositions: 'Preposizioni',
  coloring: 'Colorare', 'draw-and-color': 'Disegno a griglia', 'drawing-lines': 'Linee',
  'big-small': 'Confronto dimensioni', 'pattern-train': 'Treno dei pattern', 'pattern-worksheet': 'Pattern',
  matching: 'Abbinamento', 'grid-match': 'Puzzle griglia', 'shadow-match': 'Ombre',
  bingo: 'Bingo con immagini', 'picture-sort': 'Classificazione', 'missing-pieces': 'Puzzle',
  'odd-one-out': 'Logica', sudoku: 'Sudoku', 'picture-path': 'Percorso',
  'find-and-count': 'Trova e conta', 'find-objects': 'Oggetti nascosti', 'treasure-hunt': 'Caccia al tesoro',
};

const itTierDescs: Record<string, [string, string, string]> = {
  addition: ['Conteggio semplice con immagini (1-5)', 'Immagini miste fino a 10', 'Problemi a più passaggi fino a 20'],
  subtraction: ['Cancellare immagini (1-5)', 'Sottrazione immagine-numero fino a 10', 'Modalità miste fino a 20'],
  'code-addition': ['Codici semplici (1-5)', 'Codici intermedi fino a 10', 'Codici complessi fino a 20'],
  'more-less': ['Confronta gruppi (1-5)', 'Gruppi tematici fino a 10', 'Maggiore/minore/uguale'],
  'math-puzzle': ['Puzzle numerici semplici', 'Puzzle a più passaggi', 'Sfide logiche complesse'],
  'math-worksheet': ['Operazioni semplici (1-5)', 'Problemi misti fino a 10', 'Operazioni avanzate multiple'],
  'chart-count': ['Contare e rappresentare (1-5)', 'Interpretare grafici', 'Grafici multi-categoria'],
  wordsearch: ['Griglie semplici 6×6', 'Griglie medie 10×10', 'Griglie avanzate 15×15'],
  crossword: ['Cruciverba semplice da 5 parole', 'Puzzle intermedi da 10 parole', 'Griglie avanzate da 15+ parole'],
  'word-scramble': ['Parole di 3-4 lettere', 'Parole di 5-6 lettere', 'Sfide di 7+ lettere'],
  cryptogram: ['Codici di lettere semplici', 'Cifre intermedie', 'Crittogrammi avanzati'],
  'word-guess': ['Indizi con immagini semplici', 'Puzzle a più parti', 'Indovinelli avanzati'],
  writing: ['Pratica di ricalco', 'Scrittura guidata', 'Scrittura autonoma'],
  'alphabet-train': ['Lettere A-H', 'Lettere I-P', 'Alfabeto completo'],
  prepositions: ['Posizioni base (sopra, dentro, sotto)', 'Preposizioni ampliate', 'Relazioni spaziali complesse'],
  coloring: ['Contorni semplici', 'Scene dettagliate', 'Pattern complessi'],
  'draw-and-color': ['Copie a griglia semplici', 'Disegni a griglia dettagliati', 'Sfide libere'],
  'drawing-lines': ['Linee dritte', 'Percorsi curvi', 'Pattern complessi'],
  'big-small': ['Semplice: grande vs. piccolo', 'Ordinare per dimensione', 'Confronti complessi'],
  'pattern-train': ['Pattern AB', 'Pattern ABC', 'Pattern ABCD complessi'],
  'pattern-worksheet': ['Ripetizioni semplici', 'Pattern crescenti', 'Pattern misti complessi'],
  matching: ['Abbinamento semplice da 3 coppie', 'Abbinamento medio da 5 coppie', 'Abbinamento avanzato da 8+ coppie'],
  'grid-match': ['Griglie semplici 2×2', 'Griglie medie 3×3', 'Griglie avanzate 4×4'],
  'shadow-match': ['Coppie di ombre semplici', 'Ombre ruotate', 'Puzzle di ombre complessi'],
  bingo: ['Bingo semplice 3×3', 'Bingo con immagini 4×4', 'Bingo completo 5×5'],
  'picture-sort': ['Classificazione in 2 categorie', 'Classificazione in 3 categorie', '4+ categorie'],
  'missing-pieces': ['Pezzi mancanti semplici', 'Puzzle a più pezzi', 'Puzzle visivi complessi'],
  'odd-one-out': ['Gruppi semplici da 3', 'Gruppi medi da 4', 'Avanzato: gruppi da 6+'],
  sudoku: ['Sudoku con immagini semplice 4×4', 'Griglie medie 6×6', 'Griglie difficili 9×9'],
  'picture-path': ['Percorsi dritti semplici', 'Percorsi ramificati', 'Labirinti complessi'],
  'find-and-count': ['Trovare 3-5 oggetti', 'Contare fino a 10', 'Scene avanzate'],
  'find-objects': ['Oggetti semplici', 'Scene intermedie', 'Ricerche complesse'],
  'treasure-hunt': ['Mappe a griglia semplici', 'Mappe con direzioni', 'Cacce a più passaggi'],
};

function getItAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const ii = italianImages[key];
  if (!ii) return en;

  return {
    ...en,
    label: itLabels[key] || en.label,
    imgs: ii.imgs,
    answerKey: ii.answerKey,
    pills: tPills(en.pills, 'it'),
    spotPills: tStringPills(en.spotPills, 'it'),
    galleryPills: tStringPills(en.galleryPills, 'it'),
    tierDesc: itTierDescs[key] || en.tierDesc,
  };
}

// ─── Dutch labels + tier descs ───
const nlLabels: Record<string, string> = {
  addition: 'Optellen', subtraction: 'Aftrekken', 'code-addition': 'Code Optellen', 'more-less': 'Meer of Minder',
  'math-puzzle': 'Rekenpuzzel', 'math-worksheet': 'Rekenwerkblad', 'alphabet-train': 'Alfabettrein',
  prepositions: 'Voorzetsels', 'word-guess': 'Raad het Woord', 'word-scramble': 'Letterpuzzel',
  wordsearch: 'Woordzoeker', cryptogram: 'Cryptogram', writing: 'Schrijven',
  'big-small': 'Groot & Klein', 'pattern-train': 'Patroontrein', 'pattern-worksheet': 'Patronenwerkblad',
  'draw-and-color': 'Tekenen & Kleuren', 'drawing-lines': 'Lijnen Trekken', coloring: 'Kleuren',
  'chart-count': 'Plaatjesgrafiek', matching: 'Koppelen', 'grid-match': 'Rasterpuzzel',
  'shadow-match': 'Schaduw Koppelen', bingo: 'Bingo', 'picture-sort': 'Sorteren',
  'missing-pieces': 'Ontbrekende Stukjes', 'odd-one-out': 'Vreemde Eend', sudoku: 'Sudoku',
  'picture-path': 'Afbeeldingspad', 'find-and-count': 'Zoek & Tel', 'find-objects': 'Zoek & Vind',
  crossword: 'Kruiswoord', 'treasure-hunt': 'Schattenjacht',
};

const nlTierDescs: Record<string, [string, string, string]> = {
  addition: ['Eenvoudig tellen (1-5)', 'Gemengde plaatjes tot 10', 'Gevorderd tot 20'],
  subtraction: ['Doorstrepen (1-5)', 'Plaatje-getal tot 10', 'Gemengd tot 20'],
  'code-addition': ['Eenvoudige codes (1-5)', 'Grotere sommen', 'Meerstapscodes'],
  'more-less': ['Groepen vergelijken (1-5)', 'Themagroepen tot 10', 'Groter/kleiner/gelijk'],
  'math-puzzle': ['Eenvoudige puzzels', 'Gemiddelde puzzels', 'Uitdagende puzzels'],
  'math-worksheet': ['Basisoefeningen', 'Gemiddelde oefeningen', 'Gevorderde oefeningen'],
  'alphabet-train': ['Hoofdletters herkennen', 'Kleine letters koppelen', 'Complete alfabetoefening'],
  prepositions: ['Basisposities', 'Uitgebreide posities', 'Complexe beschrijvingen'],
  'word-guess': ['Eenvoudige woorden', 'Langere woorden', 'Uitdagende woorden'],
  'word-scramble': ['Korte woorden (3-4)', 'Gemiddeld (5-6)', 'Lang (7+)'],
  wordsearch: ['Klein rooster (6 woorden)', 'Gemiddeld (10 woorden)', 'Groot (15+ woorden)'],
  cryptogram: ['Eenvoudige vervanging', 'Complexere codes', 'Meester-uitdagingen'],
  writing: ['Lijnen overtrekken', 'Letters vormen', 'Woorden schrijven'],
  'big-small': ['Duidelijke verschillen', 'Subtiele vergelijkingen', 'Complexe ordening'],
  'pattern-train': ['AB-patronen', 'ABC-patronen', 'AABB-patronen'],
  'pattern-worksheet': ['Eenvoudige patronen', 'Gemiddelde patronen', 'Complexe patronen'],
  'draw-and-color': ['Eenvoudige vormen', 'Gedetailleerder', 'Creatieve creaties'],
  'drawing-lines': ['Rechte lijnen', 'Gebogen lijnen', 'Complexe patronen'],
  coloring: ['Grote vlakken', 'Gedetailleerd', 'Fijne details'],
  'chart-count': ['Eenvoudige grafieken', 'Meer categorieën', 'Complexe analyse'],
  matching: ['Eenvoudige paren (3)', 'Gemiddeld (5 paren)', 'Gevorderd (8+ paren)'],
  'grid-match': ['Eenvoudig 2×2', 'Gemiddeld 3×3', 'Gevorderd 4×4'],
  'shadow-match': ['Eenvoudige schaduwen', 'Gedraaide schaduwen', 'Complexe puzzels'],
  bingo: ['Eenvoudig 3×3', 'Plaatjesbingo 4×4', 'Volledig 5×5'],
  'picture-sort': ['2 categorieën', '3 categorieën', '4+ categorieën'],
  'missing-pieces': ['Eenvoudig ontbrekend', 'Meerdelige puzzels', 'Complexe visuele puzzels'],
  'odd-one-out': ['Eenvoudige groepen (3)', 'Gemiddeld (4)', 'Gevorderd (6+)'],
  sudoku: ['Eenvoudig 4×4', 'Gemiddeld 6×6', 'Moeilijk 9×9'],
  'picture-path': ['Rechte paden', 'Vertakte wegen', 'Complexe labyrinten'],
  'find-and-count': ['3-5 objecten vinden', 'Tot 10 tellen', 'Gevorderde scènes'],
  'find-objects': ['Eenvoudige objecten', 'Gemiddelde scènes', 'Complexe zoekplaatjes'],
  'treasure-hunt': ['Eenvoudige rasterkaarten', 'Richtingskaarten', 'Meerstaps-jachten'],
};

// ── Swedish labels ──
const svLabels: Record<string, string> = {
  addition: 'Addition', subtraction: 'Subtraktion', 'code-addition': 'Kodaddition', 'more-less': 'Mer eller Mindre',
  'math-puzzle': 'Mattepussel', 'math-worksheet': 'Mattearbetsblad', 'alphabet-train': 'Alfabetståg',
  prepositions: 'Prepositioner', 'word-guess': 'Gissa Ordet', 'word-scramble': 'Bokstavspussel',
  wordsearch: 'Ordletning', cryptogram: 'Kryptogram', writing: 'Skrivning',
  'big-small': 'Stor & Liten', 'pattern-train': 'Mönstertåg', 'pattern-worksheet': 'Mönsterarbetsblad',
  'draw-and-color': 'Rita & Färglägg', 'drawing-lines': 'Dra Linjer', coloring: 'Färgläggning',
  'chart-count': 'Bilddiagram', matching: 'Matchning', 'grid-match': 'Rutnätspussel',
  'shadow-match': 'Skuggmatchning', bingo: 'Bingo', 'picture-sort': 'Sortering',
  'missing-pieces': 'Saknade Bitar', 'odd-one-out': 'Udda Fågeln', sudoku: 'Sudoku',
  'picture-path': 'Bildväg', 'find-and-count': 'Sök & Räkna', 'find-objects': 'Sök & Hitta',
  crossword: 'Korsord', 'treasure-hunt': 'Skattjakt',
};

const svTierDescs: Record<string, [string, string, string]> = {
  addition: ['Enkelt räknande (1-5)', 'Blandade bilder till 10', 'Avancerat till 20'],
  subtraction: ['Stryk över (1-5)', 'Bild-tal till 10', 'Blandat till 20'],
  'code-addition': ['Enkla koder (1-5)', 'Större summor', 'Flerstegskoder'],
  'more-less': ['Grupper att jämföra (1-5)', 'Temagrupper till 10', 'Större/mindre/lika'],
  'math-puzzle': ['Enkla pussel', 'Medelsvåra pussel', 'Utmanande pussel'],
  'math-worksheet': ['Grundövningar', 'Medelsvåra övningar', 'Avancerade övningar'],
  'alphabet-train': ['Stora bokstäver', 'Små bokstäver att koppla', 'Komplett alfabetövning'],
  prepositions: ['Grundpositioner', 'Utökade positioner', 'Komplexa beskrivningar'],
  'word-guess': ['Enkla ord', 'Längre ord', 'Utmanande ord'],
  'word-scramble': ['Korta ord (3-4)', 'Medelsvåra (5-6)', 'Långa (7+)'],
  wordsearch: ['Litet rutnät (6 ord)', 'Medelstort (10 ord)', 'Stort (15+ ord)'],
  cryptogram: ['Enkel ersättning', 'Mer komplexa koder', 'Mästarutmaningar'],
  writing: ['Linjer att spåra', 'Bokstäver att forma', 'Ord att skriva'],
  'big-small': ['Tydliga skillnader', 'Subtila jämförelser', 'Komplex ordning'],
  'pattern-train': ['AB-mönster', 'ABC-mönster', 'AABB-mönster'],
  'pattern-worksheet': ['Enkla mönster', 'Medelsvåra mönster', 'Komplexa mönster'],
  'draw-and-color': ['Enkla former', 'Mer detaljerat', 'Kreativa skapelser'],
  'drawing-lines': ['Raka linjer', 'Böjda linjer', 'Komplexa mönster'],
  coloring: ['Stora ytor', 'Detaljerat', 'Fina detaljer'],
  'chart-count': ['Enkla diagram', 'Fler kategorier', 'Komplex analys'],
  matching: ['Enkla par (3)', 'Medelsvårt (5 par)', 'Avancerat (8+ par)'],
  'grid-match': ['Enkelt 2×2', 'Medelsvårt 3×3', 'Avancerat 4×4'],
  'shadow-match': ['Enkla skuggor', 'Roterade skuggor', 'Komplexa pussel'],
  bingo: ['Enkelt 3×3', 'Bildbingo 4×4', 'Fullständig 5×5'],
  'picture-sort': ['2 kategorier', '3 kategorier', '4+ kategorier'],
  'missing-pieces': ['Enkelt saknade', 'Flerdelsipussel', 'Komplexa visuella pussel'],
  'odd-one-out': ['Enkla grupper (3)', 'Medelsvårt (4)', 'Avancerat (6+)'],
  sudoku: ['Enkelt 4×4', 'Medelsvårt 6×6', 'Svårt 9×9'],
  'picture-path': ['Raka vägar', 'Förgrenade vägar', 'Komplexa labyrinter'],
  'find-and-count': ['3-5 objekt att hitta', 'Räkna till 10', 'Avancerade scener'],
  'find-objects': ['Enkla objekt', 'Medelsvåra scener', 'Komplexa sökbilder'],
  'treasure-hunt': ['Enkla rutnätskartor', 'Riktningskartor', 'Flerstegsjakter'],
  crossword: ['Mini-korsord (5 ord)', 'Medelkorsord (10 ord)', 'Stort korsord (15+ ord)'],
};

function getSvAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const si = swedishImages[key];
  if (!si) return en;

  return {
    ...en,
    label: svLabels[key] || en.label,
    imgs: si.imgs,
    answerKey: si.answerKey,
    pills: tPills(en.pills, 'sv'),
    spotPills: tStringPills(en.spotPills, 'sv'),
    galleryPills: tStringPills(en.galleryPills, 'sv'),
    tierDesc: svTierDescs[key] || en.tierDesc,
  };
}

function getNlAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const ni = dutchImages[key];
  if (!ni) return en;

  return {
    ...en,
    label: nlLabels[key] || en.label,
    imgs: ni.imgs,
    answerKey: ni.answerKey,
    pills: tPills(en.pills, 'nl'),
    spotPills: tStringPills(en.spotPills, 'nl'),
    galleryPills: tStringPills(en.galleryPills, 'nl'),
    tierDesc: nlTierDescs[key] || en.tierDesc,
  };
}

// ── Danish labels ──
const daLabels: Record<string, string> = {
  addition: 'Addition', subtraction: 'Subtraktion', 'code-addition': 'Kodeaddition', 'more-less': 'Mere eller Mindre',
  'math-puzzle': 'Matematikpuslespil', 'math-worksheet': 'Matematikopgave', 'alphabet-train': 'Alfabettog',
  prepositions: 'Præpositioner', 'word-guess': 'Gæt Ordet', 'word-scramble': 'Bogstavrod',
  wordsearch: 'Ordsøgning', cryptogram: 'Kryptogram', writing: 'Skrivning',
  'big-small': 'Stor & Lille', 'pattern-train': 'Mønstertoget', 'pattern-worksheet': 'Mønstergåder',
  'draw-and-color': 'Tegn & Farvlæg', 'drawing-lines': 'Linjetegning', coloring: 'Farvelægning',
  'chart-count': 'Billediagram', matching: 'Find Parrene', 'grid-match': 'Gitterpuslespil',
  'shadow-match': 'Skyggematching', bingo: 'Bingo', 'picture-sort': 'Sortering',
  'missing-pieces': 'Manglende Dele', 'odd-one-out': 'Find den Ulige', sudoku: 'Sudoku',
  'picture-path': 'Billedsti', 'find-and-count': 'Søg & Tæl', 'find-objects': 'Find Objekter',
  crossword: 'Krydsord', 'treasure-hunt': 'Skattejagt',
};

const daTierDescs: Record<string, [string, string, string]> = {
  addition: ['Simpel tælling (1-5)', 'Blandede billeder til 10', 'Avanceret til 20'],
  subtraction: ['Overstrygning (1-5)', 'Billed-tal til 10', 'Blandet til 20'],
  'code-addition': ['Simple koder (1-5)', 'Større summer', 'Flertrins koder'],
  'more-less': ['Grupper at sammenligne (1-5)', 'Temagrupper til 10', 'Større/mindre/lig med'],
  'math-puzzle': ['Simple puslespil', 'Mellemsvære puslespil', 'Udfordrende puslespil'],
  'math-worksheet': ['Grundlæggende øvelser', 'Mellemsvære øvelser', 'Avancerede øvelser'],
  'alphabet-train': ['Store bogstaver', 'Små bogstaver at koble', 'Komplet alfabetøvelse'],
  prepositions: ['Grundlæggende positioner', 'Udvidede positioner', 'Komplekse beskrivelser'],
  'word-guess': ['Simple ord', 'Længere ord', 'Udfordrende ord'],
  'word-scramble': ['Korte ord (3-4)', 'Mellemsvære (5-6)', 'Lange (7+)'],
  wordsearch: ['Lille gitter (6 ord)', 'Mellemstort (10 ord)', 'Stort (15+ ord)'],
  cryptogram: ['Simpel erstatning', 'Mere komplekse koder', 'Mesterudfordringer'],
  writing: ['Linjer at spore', 'Bogstaver at forme', 'Ord at skrive'],
  'big-small': ['Tydelige forskelle', 'Subtile sammenligninger', 'Kompleks ordning'],
  'pattern-train': ['AB-mønstre', 'ABC-mønstre', 'AABB-mønstre'],
  'pattern-worksheet': ['Simple mønstre', 'Mellemsvære mønstre', 'Komplekse mønstre'],
  'draw-and-color': ['Simple former', 'Mere detaljeret', 'Kreative skabelser'],
  'drawing-lines': ['Lige linjer', 'Buede linjer', 'Komplekse mønstre'],
  coloring: ['Store områder', 'Detaljeret', 'Fine detaljer'],
  'chart-count': ['Simple diagrammer', 'Flere kategorier', 'Kompleks analyse'],
  matching: ['Simple par (3)', 'Mellemsvært (5 par)', 'Avanceret (8+ par)'],
  'grid-match': ['Simpelt 2×2', 'Mellemsvært 3×3', 'Avanceret 4×4'],
  'shadow-match': ['Simple skygger', 'Roterede skygger', 'Komplekse puslespil'],
  bingo: ['Simpelt 3×3', 'Billedbingo 4×4', 'Komplet 5×5'],
  'picture-sort': ['2 kategorier', '3 kategorier', '4+ kategorier'],
  'missing-pieces': ['Simple manglende dele', 'Flerdele puslespil', 'Komplekse visuelle puslespil'],
  'odd-one-out': ['Simple grupper (3)', 'Mellemsvært (4)', 'Avanceret (6+)'],
  sudoku: ['Simpelt 4×4', 'Mellemsvært 6×6', 'Svært 9×9'],
  'picture-path': ['Lige veje', 'Forgrenede veje', 'Komplekse labyrinter'],
  'find-and-count': ['3-5 objekter at finde', 'Tæl til 10', 'Avancerede scener'],
  'find-objects': ['Simple objekter', 'Mellemsvære scener', 'Komplekse søgebilleder'],
  'treasure-hunt': ['Simple gitterkort', 'Retningskort', 'Flertrins jagter'],
  crossword: ['Mini-krydsord (5 ord)', 'Mellemkrydsord (10 ord)', 'Stort krydsord (15+ ord)'],
};

function getDaAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const di = danishImages[key];
  if (!di) return en;

  return {
    ...en,
    label: daLabels[key] || en.label,
    imgs: di.imgs,
    answerKey: di.answerKey,
    pills: tPills(en.pills, 'da'),
    spotPills: tStringPills(en.spotPills, 'da'),
    galleryPills: tStringPills(en.galleryPills, 'da'),
    tierDesc: daTierDescs[key] || en.tierDesc,
  };
}

// ── Norwegian labels ──
const noLabels: Record<string, string> = {
  addition: 'Addisjon', subtraction: 'Subtraksjon', 'code-addition': 'Kodeaddisjon', 'more-less': 'Mer eller Mindre',
  'math-puzzle': 'Matematikkpuslespill', 'math-worksheet': 'Matematikkoppgave', 'alphabet-train': 'Alfabettog',
  prepositions: 'Preposisjoner', 'word-guess': 'Gjett Ordet', 'word-scramble': 'Bokstavblanding',
  wordsearch: 'Ordsok', cryptogram: 'Kryptogram', writing: 'Skriving',
  'big-small': 'Stor & Liten', 'pattern-train': 'Monstertog', 'pattern-worksheet': 'Monsteroppgaver',
  'draw-and-color': 'Tegn & Fargelegg', 'drawing-lines': 'Linjetegning', coloring: 'Fargelegging',
  'chart-count': 'Bildediagram', matching: 'Finn Parene', 'grid-match': 'Rutenettpuslespill',
  'shadow-match': 'Skyggematching', bingo: 'Bingo', 'picture-sort': 'Sortering',
  'missing-pieces': 'Manglende Deler', 'odd-one-out': 'Finn den Ulike', sudoku: 'Sudoku',
  'picture-path': 'Bildesti', 'find-and-count': 'Sok & Tell', 'find-objects': 'Finn Objekter',
  crossword: 'Kryssord', 'treasure-hunt': 'Skattejakt',
};

const noTierDescs: Record<string, [string, string, string]> = {
  addition: ['Enkel telling (1-5)', 'Blandede bilder til 10', 'Avansert til 20'],
  subtraction: ['Stryk over (1-5)', 'Bilde-tall til 10', 'Blandet til 20'],
  'code-addition': ['Enkle koder (1-5)', 'Storre summer', 'Flertrinnskoder'],
  'more-less': ['Grupper a sammenligne (1-5)', 'Temagrupper til 10', 'Storre/mindre/lik'],
  'math-puzzle': ['Enkle puslespill', 'Mellomvanskelige puslespill', 'Utfordrende puslespill'],
  'math-worksheet': ['Grunnleggende ovelser', 'Mellomvanskelige ovelser', 'Avanserte ovelser'],
  'alphabet-train': ['Store bokstaver', 'Sma bokstaver a koble', 'Komplett alfabetovelse'],
  prepositions: ['Grunnleggende preposisjoner', 'Utvidede preposisjoner', 'Komplekse beskrivelser'],
  'word-guess': ['Enkle ord', 'Lengre ord', 'Utfordrende ord'],
  'word-scramble': ['Korte ord (3-4)', 'Mellomvanskelige (5-6)', 'Lange (7+)'],
  wordsearch: ['Lite rutenett (6 ord)', 'Mellomstort (10 ord)', 'Stort (15+ ord)'],
  cryptogram: ['Enkel erstatning', 'Mer komplekse koder', 'Mesterutfordringer'],
  writing: ['Linjer a spore', 'Bokstaver a forme', 'Ord a skrive'],
  'big-small': ['Tydelige forskjeller', 'Subtile sammenligninger', 'Kompleks ordning'],
  'pattern-train': ['AB-monstre', 'ABC-monstre', 'AABB-monstre'],
  'pattern-worksheet': ['Enkle monstre', 'Mellomvanskelige monstre', 'Komplekse monstre'],
  'draw-and-color': ['Enkle former', 'Mer detaljert', 'Kreative skapelser'],
  'drawing-lines': ['Rette linjer', 'Buede linjer', 'Komplekse monstre'],
  coloring: ['Store flater', 'Detaljert', 'Fine detaljer'],
  'chart-count': ['Enkle diagrammer', 'Flere kategorier', 'Kompleks analyse'],
  matching: ['Enkle par (3)', 'Mellomvanskelig (5 par)', 'Avansert (8+ par)'],
  'grid-match': ['Enkelt 2x2', 'Mellomvanskelig 3x3', 'Avansert 4x4'],
  'shadow-match': ['Enkle skygger', 'Roterte skygger', 'Komplekse puslespill'],
  bingo: ['Enkelt 3x3', 'Bildebingo 4x4', 'Fullstendig 5x5'],
  'picture-sort': ['2 kategorier', '3 kategorier', '4+ kategorier'],
  'missing-pieces': ['Enkle manglende deler', 'Flerdelspuslespill', 'Komplekse visuelle puslespill'],
  'odd-one-out': ['Enkle grupper (3)', 'Mellomvanskelig (4)', 'Avansert (6+)'],
  sudoku: ['Enkelt 4x4', 'Mellomvanskelig 6x6', 'Vanskelig 9x9'],
  'picture-path': ['Rette veier', 'Forgrenede veier', 'Komplekse labyrinter'],
  'find-and-count': ['3-5 objekter a finne', 'Telle til 10', 'Avanserte scener'],
  'find-objects': ['Enkle objekter', 'Mellomvanskelige scener', 'Komplekse sokebilder'],
  'treasure-hunt': ['Enkle rutenettkart', 'Retningskart', 'Flertrinns jakter'],
  crossword: ['Mini-kryssord (5 ord)', 'Mellomkryssord (10 ord)', 'Stort kryssord (15+ ord)'],
};

function getNoAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const ni = norwegianImages[key];
  if (!ni) return en;

  return {
    ...en,
    label: noLabels[key] || en.label,
    imgs: ni.imgs,
    answerKey: ni.answerKey,
    pills: tPills(en.pills, 'no'),
    spotPills: tStringPills(en.spotPills, 'no'),
    galleryPills: tStringPills(en.galleryPills, 'no'),
    tierDesc: noTierDescs[key] || en.tierDesc,
  };
}

// ── Finnish labels ──
const fiLabels: Record<string, string> = {
  addition: 'Yhteenlasku', subtraction: 'Vahennyslasku', 'code-addition': 'Koodiyhteenlasku', 'more-less': 'Enemman vai Vahemman',
  'math-puzzle': 'Matematiikkapulmapeli', 'math-worksheet': 'Matematiikkatehtava', 'alphabet-train': 'Aakkosjuna',
  prepositions: 'Prepositiot', 'word-guess': 'Arvaa Sana', 'word-scramble': 'Kirjainsekoitus',
  wordsearch: 'Sanahaku', cryptogram: 'Kryptogrammi', writing: 'Kirjoitus',
  'big-small': 'Iso & Pieni', 'pattern-train': 'Kuviojuna', 'pattern-worksheet': 'Kuviotehtavat',
  'draw-and-color': 'Piirra & Varita', 'drawing-lines': 'Viivapiirtaminen', coloring: 'Varitys',
  'chart-count': 'Kuvakaavio', matching: 'Loyda Parit', 'grid-match': 'Ruudukkopulmapeli',
  'shadow-match': 'Varjoyhdistaminen', bingo: 'Bingo', 'picture-sort': 'Lajittelu',
  'missing-pieces': 'Puuttuvat Osat', 'odd-one-out': 'Loyda Erilainen', sudoku: 'Sudoku',
  'picture-path': 'Kuvapolku', 'find-and-count': 'Etsi & Laske', 'find-objects': 'Loyda Esineet',
  crossword: 'Ristikko', 'treasure-hunt': 'Aarteenetsinta',
};

const fiTierDescs: Record<string, [string, string, string]> = {
  addition: ['Yksinkertainen laskeminen (1-5)', 'Sekoitetut kuvat 10 asti', 'Edistynyt 20 asti'],
  subtraction: ['Yliviivaa (1-5)', 'Kuva-luvut 10 asti', 'Sekoitettu 20 asti'],
  'code-addition': ['Yksinkertaiset koodit (1-5)', 'Suuremmat summat', 'Monivaiheisia koodeja'],
  'more-less': ['Ryhmat vertailtavaksi (1-5)', 'Teemaryhmat 10 asti', 'Suurempi/pienempi/yhta suuri'],
  'math-puzzle': ['Yksinkertaiset pulmapelit', 'Keskivaikeat pulmapelit', 'Haastavat pulmapelit'],
  'math-worksheet': ['Perusharjoitukset', 'Keskivaikeat harjoitukset', 'Edistyneet harjoitukset'],
  'alphabet-train': ['Isot kirjaimet', 'Pienet kirjaimet yhdistettavaksi', 'Taydelliset aakkosharjoitukset'],
  prepositions: ['Perusprepositiot', 'Laajennetut prepositiot', 'Monimutkaiset kuvaukset'],
  'word-guess': ['Yksinkertaiset sanat', 'Pidemmat sanat', 'Haastavat sanat'],
  'word-scramble': ['Lyhyet sanat (3-4)', 'Keskivaikeat (5-6)', 'Pitkat (7+)'],
  wordsearch: ['Pieni ruudukko (6 sanaa)', 'Keskikokoinen (10 sanaa)', 'Suuri (15+ sanaa)'],
  cryptogram: ['Yksinkertainen korvaus', 'Monimutkaisemmat koodit', 'Mestaritason haasteet'],
  writing: ['Viivoja jaljennettavaksi', 'Kirjaimia muotoiltavaksi', 'Sanoja kirjoitettavaksi'],
  'big-small': ['Selkeat erot', 'Hienoiset vertailut', 'Monimutkainen jarjestaminen'],
  'pattern-train': ['AB-kuviot', 'ABC-kuviot', 'AABB-kuviot'],
  'pattern-worksheet': ['Yksinkertaiset kuviot', 'Keskivaikeat kuviot', 'Monimutkaiset kuviot'],
  'draw-and-color': ['Yksinkertaiset muodot', 'Yksityiskohtaisempi', 'Luovat luomukset'],
  'drawing-lines': ['Suorat viivat', 'Kaartuvat viivat', 'Monimutkaiset kuviot'],
  coloring: ['Suuret alueet', 'Yksityiskohtainen', 'Hienot yksityiskohdat'],
  'chart-count': ['Yksinkertaiset kaaviot', 'Useampia kategorioita', 'Monimutkainen analyysi'],
  matching: ['Yksinkertaiset parit (3)', 'Keskivaikea (5 paria)', 'Edistynyt (8+ paria)'],
  'grid-match': ['Yksinkertainen 2x2', 'Keskivaikea 3x3', 'Edistynyt 4x4'],
  'shadow-match': ['Yksinkertaiset varjot', 'Kaannetyt varjot', 'Monimutkaiset pulmapelit'],
  bingo: ['Yksinkertainen 3x3', 'Kuvabingo 4x4', 'Taysi 5x5'],
  'picture-sort': ['2 kategoriaa', '3 kategoriaa', '4+ kategoriaa'],
  'missing-pieces': ['Yksinkertaiset puuttuvat osat', 'Moniosaiset palapelit', 'Monimutkaiset visuaaliset palapelit'],
  'odd-one-out': ['Yksinkertaiset ryhmat (3)', 'Keskivaikea (4)', 'Edistynyt (6+)'],
  sudoku: ['Yksinkertainen 4x4', 'Keskivaikea 6x6', 'Vaikea 9x9'],
  'picture-path': ['Suorat reitit', 'Haarautuvat reitit', 'Monimutkaiset sokkelot'],
  'find-and-count': ['3-5 kohdetta loydettavaksi', 'Laske 10 asti', 'Edistyneet kohtaukset'],
  'find-objects': ['Yksinkertaiset esineet', 'Keskivaikeat kohtaukset', 'Monimutkaiset etsintakuvat'],
  'treasure-hunt': ['Yksinkertaiset ruudukkokartat', 'Suuntakartat', 'Monivaiheisia etsintoja'],
  crossword: ['Miniristikko (5 sanaa)', 'Keskikokoinen ristikko (10 sanaa)', 'Suuri ristikko (15+ sanaa)'],
};

function getFiAppData(key: string): AppVisualData {
  const en = appData[key];
  if (!en) return appData.addition;
  const fi = finnishImages[key];
  if (!fi) return en;

  return {
    ...en,
    label: fiLabels[key] || en.label,
    imgs: fi.imgs,
    answerKey: fi.answerKey,
    pills: tPills(en.pills, 'fi'),
    spotPills: tStringPills(en.spotPills, 'fi'),
    galleryPills: tStringPills(en.galleryPills, 'fi'),
    tierDesc: fiTierDescs[key] || en.tierDesc,
  };
}

// ─── Config generator ───
// Builds a full ShowcaseConfig from 4 app IDs (primary + 3 supporting).
// The primary app provides hero images + spotlight; supporting apps fill tiered/gallery.

function buildConfig(
  apps: [string, string, string, string],
  pageTitle: string,
  seed: number,
  locale: string = 'en',
): PageShowcaseConfig {
  const [a1, a2, a3, a4] = apps;
  const isDe = locale === 'de';
  const isFr = locale === 'fr';
  const isEs = locale === 'es';
  const isPt = locale === 'pt';
  const isIt = locale === 'it';
  const isNl = locale === 'nl';
  const isSv = locale === 'sv';
  const isDa = locale === 'da';
  const isNo = locale === 'no';
  const isFi = locale === 'fi';
  const getData = isDe ? getDeAppData : isFr ? getFrAppData : isEs ? getEsAppData : isPt ? getPtAppData : isIt ? getItAppData : isNl ? getNlAppData : isSv ? getSvAppData : isDa ? getDaAppData : isNo ? getNoAppData : isFi ? getFiAppData : (k: string) => appData[k] || appData.addition;
  const d1 = getData(a1);
  const d2 = getData(a2);
  const d3 = getData(a3);
  const d4 = getData(a4);
  const imgFn = (folder: string, filename: string) => localizedImg(folder, filename, locale);

  return {
    hero: {
      gradient: heroGradients[seed % heroGradients.length],
      accentColor: d1.accent,
      badge: isDe ? 'Professionelle Druckvorlagen' : isFr ? 'Imprimables professionnels' : isEs ? 'Imprimibles profesionales' : isPt ? 'Imprimíveis profissionais' : isIt ? 'Stampabili professionali' : isNl ? 'Professionele Werkbladen' : isSv ? 'Professionella Arbetsblad' : isDa ? 'Professionelle Arbejdsark' : isNo ? 'Profesjonelle Arbeidsark' : isFi ? 'Ammattimaiset tyolehdet' : 'Professional Printables',
      heading: pageTitle,
      subheading: isDe
        ? `Erstellen Sie beeindruckende ${d1.label}-Arbeitsblätter, die Ihre Kunden lieben werden`
        : isFr
        ? `Créez de superbes fiches ${d1.label.toLowerCase()} que vos clients adoreront`
        : isEs
        ? `Crea impresionantes hojas de ${d1.label.toLowerCase()} que a tus clientes les encantarán`
        : isPt
        ? `Crie impressionantes folhas de ${d1.label.toLowerCase()} que os seus clientes vão adorar`
        : isIt
        ? `Crea splendide schede di ${d1.label.toLowerCase()} che i tuoi clienti adoreranno`
        : isNl
        ? `Maak prachtige ${d1.label.toLowerCase()} werkbladen waar je klanten van houden`
        : isSv
        ? `Skapa fantastiska ${d1.label.toLowerCase()} arbetsblad som dina kunder kommer att älska`
        : isDa
        ? `Skab fantastiske ${d1.label.toLowerCase()} arbejdsark som dine kunder vil elske`
        : isNo
        ? `Lag fantastiske ${d1.label.toLowerCase()} arbeidsark som kundene dine vil elske`
        : isFi
        ? `Luo upeita ${d1.label.toLowerCase()} tyolehtia joita asiakkaasi rakastavat`
        : `Create stunning ${d1.label.toLowerCase()} worksheets your customers will love`,
      images: [
        { src: imgFn(d1.folder, d1.imgs[0]), alt: isDe ? `${d1.label} Arbeitsblatt Beispiel 1` : isFr ? `Fiche ${d1.label} exemple 1` : isEs ? `Hoja de trabajo ${d1.label} ejemplo 1` : isPt ? `Folha de trabalho ${d1.label} exemplo 1` : isIt ? `Scheda di ${d1.label} esempio 1` : isNl ? `${d1.label} werkblad voorbeeld 1` : isSv ? `${d1.label} arbetsblad exempel 1` : isDa ? `${d1.label} arbejdsark eksempel 1` : isNo ? `${d1.label} arbeidsark eksempel 1` : isFi ? `${d1.label} tyolehti esimerkki 1` : `${d1.label} worksheet sample 1` },
        { src: imgFn(d1.folder, d1.imgs[1]), alt: isDe ? `${d1.label} Arbeitsblatt Beispiel 2` : isFr ? `Fiche ${d1.label} exemple 2` : isEs ? `Hoja de trabajo ${d1.label} ejemplo 2` : isPt ? `Folha de trabalho ${d1.label} exemplo 2` : isIt ? `Scheda di ${d1.label} esempio 2` : isNl ? `${d1.label} werkblad voorbeeld 2` : isSv ? `${d1.label} arbetsblad exempel 2` : isDa ? `${d1.label} arbejdsark eksempel 2` : isNo ? `${d1.label} arbeidsark eksempel 2` : isFi ? `${d1.label} tyolehti esimerkki 2` : `${d1.label} worksheet sample 2` },
        { src: imgFn(d1.folder, d1.imgs[2]), alt: isDe ? `${d1.label} Arbeitsblatt Beispiel 3` : isFr ? `Fiche ${d1.label} exemple 3` : isEs ? `Hoja de trabajo ${d1.label} ejemplo 3` : isPt ? `Folha de trabalho ${d1.label} exemplo 3` : isIt ? `Scheda di ${d1.label} esempio 3` : isNl ? `${d1.label} werkblad voorbeeld 3` : isSv ? `${d1.label} arbetsblad exempel 3` : isDa ? `${d1.label} arbejdsark eksempel 3` : isNo ? `${d1.label} arbeidsark eksempel 3` : isFi ? `${d1.label} tyolehti esimerkki 3` : `${d1.label} worksheet sample 3` },
      ],
      pills: d1.pills,
      decorativeSymbol: d1.symbol,
    },
    tiered: {
      gradient: tieredGradients[seed % tieredGradients.length],
      badge: isDe ? 'Schwierigkeitsstufen' : isFr ? 'Niveaux de compétence' : isEs ? 'Niveles de habilidad' : isPt ? 'Níveis de habilidade' : isIt ? 'Livelli di abilità' : isNl ? 'Vaardigheidsniveaus' : isSv ? 'Färdighetsnivåer' : isDa ? 'Færdighedsniveauer' : isNo ? 'Ferdighetsniva' : isFi ? 'Taitotasot' : 'Skill Levels',
      heading: isDe ? 'Arbeitsblätter für jede Stufe' : isFr ? 'Des fiches pour chaque niveau' : isEs ? 'Hojas de trabajo para cada nivel' : isPt ? 'Folhas de trabalho para cada nível' : isIt ? 'Schede per ogni livello' : isNl ? 'Werkbladen voor elk niveau' : isSv ? 'Arbetsblad för varje nivå' : isDa ? 'Arbejdsark for hvert niveau' : isNo ? 'Arbeidsark for hvert niva' : isFi ? 'Tyolehdet jokaiselle tasolle' : 'Worksheets for Every Level',
      subheading: isDe ? 'Drei Schwierigkeitsstufen für differenzierte Inhalte' : isFr ? 'Trois niveaux de difficulté pour un contenu différencié' : isEs ? 'Tres niveles de dificultad para contenido diferenciado' : isPt ? 'Três níveis de dificuldade para conteúdo diferenciado' : isIt ? 'Tre livelli di difficoltà per contenuti differenziati' : isNl ? 'Drie moeilijkheidsniveaus voor gedifferentieerde inhoud' : isSv ? 'Tre svårighetsnivåer för differentierat innehåll' : isDa ? 'Tre sværhedstrin for differentieret indhold' : isNo ? 'Tre vanskelighetsgrader for differensiert innhold' : isFi ? 'Kolme vaikeustasoa eriytetylle sisallolle' : 'Three difficulty tiers for differentiated content',
      tiers: [
        {
          name: isDe ? 'Anfänger' : isFr ? 'Débutant' : isEs ? 'Principiante' : isPt ? 'Iniciante' : isIt ? 'Principiante' : isNl ? 'Beginner' : isSv ? 'Nybörjare' : isDa ? 'Begynder' : isNo ? 'Nybegynner' : isFi ? 'Aloittelija' : 'Beginner', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: imgFn(d2.folder, d2.imgs[0]), alt: isDe ? `${d2.label} Anfänger-Arbeitsblatt` : isFr ? `Fiche ${d2.label} débutant` : isEs ? `Hoja de ${d2.label} principiante` : isPt ? `Folha de ${d2.label} iniciante` : isIt ? `Scheda di ${d2.label} principiante` : isNl ? `${d2.label} beginner werkblad` : isSv ? `${d2.label} nybörjararbetsblad` : isDa ? `${d2.label} begynderarbejdsark` : isNo ? `${d2.label} nybegynnerarbeidsark` : isFi ? `${d2.label} aloittelijatyolehti` : `${d2.label} beginner worksheet` },
          desc: d2.tierDesc[0],
        },
        {
          name: isDe ? 'Entdecker' : isFr ? 'Explorateur' : isEs ? 'Explorador' : isPt ? 'Explorador' : isIt ? 'Esploratore' : isNl ? 'Ontdekker' : isSv ? 'Utforskare' : isDa ? 'Opdager' : isNo ? 'Oppdager' : isFi ? 'Tutkija' : 'Explorer', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 2,
          image: { src: imgFn(d3.folder, d3.imgs[1]), alt: isDe ? `${d3.label} Fortgeschrittenen-Arbeitsblatt` : isFr ? `Fiche ${d3.label} intermédiaire` : isEs ? `Hoja de ${d3.label} intermedio` : isPt ? `Folha de ${d3.label} intermédio` : isIt ? `Scheda di ${d3.label} intermedio` : isNl ? `${d3.label} gemiddeld werkblad` : isSv ? `${d3.label} mellanivåarbetsblad` : isDa ? `${d3.label} mellemarbejdsark` : isNo ? `${d3.label} mellomarbeidsark` : isFi ? `${d3.label} keskitason tyolehti` : `${d3.label} intermediate worksheet` },
          desc: d3.tierDesc[1],
        },
        {
          name: isDe ? 'Experte' : isFr ? 'Expert' : isEs ? 'Experto' : isPt ? 'Especialista' : isIt ? 'Esperto' : isNl ? 'Expert' : isSv ? 'Expert' : isDa ? 'Ekspert' : isNo ? 'Ekspert' : isFi ? 'Asiantuntija' : 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: imgFn(d4.folder, d4.imgs[2]), alt: isDe ? `${d4.label} Experten-Arbeitsblatt` : isFr ? `Fiche ${d4.label} avancé` : isEs ? `Hoja de ${d4.label} avanzado` : isPt ? `Folha de ${d4.label} avançado` : isIt ? `Scheda di ${d4.label} avanzato` : isNl ? `${d4.label} gevorderd werkblad` : isSv ? `${d4.label} avancerat arbetsblad` : isDa ? `${d4.label} avanceret arbejdsark` : isNo ? `${d4.label} avansert arbeidsark` : isFi ? `${d4.label} edistynyt tyolehti` : `${d4.label} advanced worksheet` },
          desc: d4.tierDesc[2],
        },
      ],
      trophyText: isDe ? 'Professionelle Qualität auf jedem Schwierigkeitsniveau' : isFr ? 'Qualité professionnelle à chaque niveau de difficulté' : isEs ? 'Calidad profesional en cada nivel de dificultad' : isPt ? 'Qualidade profissional em cada nível de dificuldade' : isIt ? 'Qualità professionale ad ogni livello di difficoltà' : isNl ? 'Professionele kwaliteit op elk moeilijkheidsniveau' : isSv ? 'Professionell kvalitet på varje svårighetsnivå' : isDa ? 'Professionel kvalitet på hvert sværhedsniveau' : isNo ? 'Profesjonell kvalitet pa hvert vanskelighetsniva' : isFi ? 'Ammattimainen laatu jokaisella vaikeustasolla' : 'Professional quality at every difficulty level',
    },
    spotlight: {
      gradient: spotlightGradients[seed % spotlightGradients.length],
      heading: isDe ? `${d1.label}-Präsentation` : isFr ? `Vitrine ${d1.label}` : isEs ? `Muestra de ${d1.label}` : isPt ? `Mostra de ${d1.label}` : isIt ? `Vetrina ${d1.label}` : isNl ? `${d1.label}-Etalage` : isSv ? `${d1.label} Utställning` : isDa ? `${d1.label} Udstilling` : isNo ? `${d1.label} Utstilling` : isFi ? `${d1.label} Esittely` : `${d1.label} Showcase`,
      tagline: isDe ? 'So sieht es aus!' : isFr ? 'Découvrez ce que vous pouvez créer !' : isEs ? '¡Mira lo que puedes crear!' : isPt ? 'Veja o que pode criar!' : isIt ? 'Scopri cosa puoi creare!' : isNl ? 'Bekijk wat je kunt maken!' : isSv ? 'Se vad du kan skapa!' : isDa ? 'Se hvad du kan skabe!' : isNo ? 'Se hva du kan lage!' : isFi ? 'Katso mita voit luoda!' : 'See What You Can Create!',
      image: { src: imgFn(d1.folder, d1.imgs[3]), alt: isDe ? `Hervorgehobenes ${d1.label}-Arbeitsblatt` : isFr ? `Fiche ${d1.label.toLowerCase()} en vedette` : isEs ? `Hoja de ${d1.label.toLowerCase()} destacada` : isPt ? `Folha de ${d1.label.toLowerCase()} em destaque` : isIt ? `Scheda di ${d1.label.toLowerCase()} in evidenza` : isNl ? `Uitgelicht ${d1.label.toLowerCase()} werkblad` : isSv ? `Utvalt ${d1.label.toLowerCase()} arbetsblad` : isDa ? `Udvalgt ${d1.label.toLowerCase()} arbejdsark` : isNo ? `Utvalgt ${d1.label.toLowerCase()} arbeidsark` : isFi ? `Esitelty ${d1.label.toLowerCase()} tyolehti` : `Featured ${d1.label.toLowerCase()} worksheet` },
      pills: d1.spotPills,
      hasBunting: seed % 2 === 0,
      hasConfetti: true,
      accentColor: d1.accent,
    },
    gallery: {
      gradient: galleryGradient,
      heading: isDe ? 'Professionelle Arbeitsblatt-Galerie' : isFr ? 'Galerie de fiches professionnelles' : isEs ? 'Galería profesional de hojas de trabajo' : isPt ? 'Galeria profissional de folhas de trabalho' : isIt ? 'Galleria professionale di schede' : isNl ? 'Professionele Werkblad Galerij' : isSv ? 'Professionellt Arbetsbladsgalleri' : isDa ? 'Professionelt Arbejdsarkgalleri' : isNo ? 'Profesjonelt Arbeidsarkgalleri' : isFi ? 'Ammattimainen tyolehtgalleria' : 'Professional Worksheet Gallery',
      subheading: isDe ? 'Klare, professionelle Layouts für Ihr Geschäft' : isFr ? 'Mises en page soignées et professionnelles pour votre activité' : isEs ? 'Diseños limpios y profesionales listos para tu negocio' : isPt ? 'Layouts limpos e profissionais prontos para o seu negócio' : isIt ? 'Layout puliti e professionali pronti per il tuo business' : isNl ? 'Strakke, professionele layouts klaar voor je bedrijf' : isSv ? 'Rena, professionella layouter redo för ditt företag' : isDa ? 'Rene, professionelle layouts klar til din forretning' : isNo ? 'Rene, profesjonelle oppsett klare for din virksomhet' : isFi ? 'Siistit, ammattimaiset asettelut valmiina yritykseesi' : 'Clean, polished layouts ready for your business',
      items: [
        { image: { src: imgFn(d2.folder, d2.imgs[3]), alt: isDe ? `${d2.label} professionelles Arbeitsblatt` : isFr ? `Fiche ${d2.label} professionnelle` : isEs ? `Hoja de ${d2.label} profesional` : isPt ? `Folha de ${d2.label} profissional` : isIt ? `Scheda di ${d2.label} professionale` : isNl ? `${d2.label} professioneel werkblad` : isSv ? `${d2.label} professionellt arbetsblad` : isDa ? `${d2.label} professionelt arbejdsark` : isNo ? `${d2.label} profesjonelt arbeidsark` : isFi ? `${d2.label} ammattimainen tyolehti` : `${d2.label} professional worksheet` }, label: d2.label },
        { image: { src: imgFn(d3.folder, d3.imgs[4]), alt: isDe ? `${d3.label} professionelles Arbeitsblatt` : isFr ? `Fiche ${d3.label} professionnelle` : isEs ? `Hoja de ${d3.label} profesional` : isPt ? `Folha de ${d3.label} profissional` : isIt ? `Scheda di ${d3.label} professionale` : isNl ? `${d3.label} professioneel werkblad` : isSv ? `${d3.label} professionellt arbetsblad` : isDa ? `${d3.label} professionelt arbejdsark` : isNo ? `${d3.label} profesjonelt arbeidsark` : isFi ? `${d3.label} ammattimainen tyolehti` : `${d3.label} professional worksheet` }, label: d3.label },
        { image: { src: imgFn(d4.folder, d4.imgs[0]), alt: isDe ? `${d4.label} professionelles Arbeitsblatt` : isFr ? `Fiche ${d4.label} professionnelle` : isEs ? `Hoja de ${d4.label} profesional` : isPt ? `Folha de ${d4.label} profissional` : isIt ? `Scheda di ${d4.label} professionale` : isNl ? `${d4.label} professioneel werkblad` : isSv ? `${d4.label} professionellt arbetsblad` : isDa ? `${d4.label} professionelt arbejdsark` : isNo ? `${d4.label} profesjonelt arbeidsark` : isFi ? `${d4.label} ammattimainen tyolehti` : `${d4.label} professional worksheet` }, label: d4.label },
      ],
      pills: isDe
        ? ['Druckfertig', 'Professionelle Qualität', 'Verschiedene Formate', 'Lösungsschlüssel']
        : isFr
        ? ['Prêt à imprimer', 'Qualité professionnelle', 'Formats multiples', 'Corrigés']
        : isEs
        ? ['Listo para imprimir', 'Calidad profesional', 'Múltiples formatos', 'Claves de respuesta']
        : isPt
        ? ['Pronto para imprimir', 'Qualidade profissional', 'Múltiplos formatos', 'Chaves de resposta']
        : isIt
        ? ['Pronto per la stampa', 'Qualità professionale', 'Formati multipli', 'Chiavi di risposta']
        : isNl
        ? ['Printklaar', 'Professionele kwaliteit', 'Meerdere formaten', 'Antwoordsleutels']
        : isSv
        ? ['Utskriftsredo', 'Professionell kvalitet', 'Flera format', 'Facit']
        : isDa
        ? ['Printklart', 'Professionel kvalitet', 'Flere formater', 'Facit']
        : isNo
        ? ['Utskriftsklar', 'Profesjonell kvalitet', 'Flere formater', 'Fasit']
        : isFi
        ? ['Tulostusvalmiit', 'Ammattimainen laatu', 'Useita formaatteja', 'Vastausavaimet']
        : ['Print-Ready', 'Professional Quality', 'Multiple Formats', 'Answer Keys'],
      frameColor: d1.frameColor,
    },
  };
}

// ═══════════════════════════════════════════════════════════════════
// PAGE ASSIGNMENTS — pageType + pageId → 4 app IDs + display title
// ═══════════════════════════════════════════════════════════════════

interface PageEntry {
  type: 'guide' | 'bundle' | 'idea' | 'start';
  id: string;
  title: string;
  apps: [string, string, string, string];
}

const pages: PageEntry[] = [
  // ─── GUIDES (65) ───
  { type: 'guide', id: 'sell-math-worksheets-etsy', title: 'Math Worksheets for Etsy', apps: ['addition', 'subtraction', 'math-puzzle', 'math-worksheet'] },
  { type: 'guide', id: 'sell-word-search-etsy', title: 'Word Search for Etsy', apps: ['wordsearch', 'crossword', 'word-scramble', 'cryptogram'] },
  { type: 'guide', id: 'start-etsy-printable-shop', title: 'Start Your Etsy Shop', apps: ['addition', 'wordsearch', 'coloring', 'matching'] },
  { type: 'guide', id: 'create-etsy-coloring-pages', title: 'Coloring Pages for Etsy', apps: ['coloring', 'draw-and-color', 'big-small', 'alphabet-train'] },
  { type: 'guide', id: 'sell-educational-printables-etsy', title: 'Educational Printables', apps: ['addition', 'wordsearch', 'coloring', 'matching'] },
  { type: 'guide', id: 'price-etsy-printables', title: 'Pricing Your Printables', apps: ['addition', 'wordsearch', 'sudoku', 'coloring'] },
  { type: 'guide', id: 'etsy-seo-educational-printables', title: 'Etsy SEO for Printables', apps: ['wordsearch', 'addition', 'coloring', 'sudoku'] },
  { type: 'guide', id: 'create-etsy-worksheet-bundles', title: 'Worksheet Bundles', apps: ['addition', 'subtraction', 'wordsearch', 'coloring'] },
  { type: 'guide', id: 'math-activity-books-kdp', title: 'Math Activity Books', apps: ['addition', 'subtraction', 'math-puzzle', 'math-worksheet'] },
  { type: 'guide', id: 'publish-puzzle-books-kdp', title: 'Puzzle Books for KDP', apps: ['wordsearch', 'crossword', 'sudoku', 'math-puzzle'] },
  { type: 'guide', id: 'word-search-books-kdp', title: 'Word Search Books', apps: ['wordsearch', 'crossword', 'math-puzzle', 'bingo'] },
  { type: 'guide', id: 'make-money-kdp-activity-books', title: 'KDP Activity Books', apps: ['math-worksheet', 'wordsearch', 'sudoku', 'coloring'] },
  { type: 'guide', id: 'kdp-formatting-worksheets', title: 'KDP Formatting Guide', apps: ['math-worksheet', 'addition', 'wordsearch', 'writing'] },
  { type: 'guide', id: 'best-kdp-activity-book-niches', title: 'Best KDP Niches', apps: ['math-worksheet', 'wordsearch', 'coloring', 'sudoku'] },
  { type: 'guide', id: 'sudoku-books-kdp', title: 'Sudoku Books for KDP', apps: ['sudoku', 'math-puzzle', 'wordsearch', 'coloring'] },
  { type: 'guide', id: 'kdp-vs-etsy-printables', title: 'KDP vs Etsy', apps: ['wordsearch', 'addition', 'coloring', 'math-puzzle'] },
  { type: 'guide', id: 'create-sell-tpt-resources', title: 'TPT Resources', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'guide', id: 'tpt-store-optimization', title: 'TPT Store Optimization', apps: ['wordsearch', 'math-puzzle', 'matching', 'crossword'] },
  { type: 'guide', id: 'sell-printables-gumroad', title: 'Sell on Gumroad', apps: ['coloring', 'wordsearch', 'math-worksheet', 'matching'] },
  { type: 'guide', id: 'sell-creative-fabrica', title: 'Sell on Creative Fabrica', apps: ['coloring', 'matching', 'wordsearch', 'drawing-lines'] },
  { type: 'guide', id: 'create-addition-worksheets', title: 'Addition Worksheets', apps: ['addition', 'math-worksheet', 'code-addition', 'subtraction'] },
  { type: 'guide', id: 'create-subtraction-worksheets', title: 'Subtraction Worksheets', apps: ['subtraction', 'addition', 'math-worksheet', 'code-addition'] },
  { type: 'guide', id: 'create-word-search-puzzles', title: 'Word Search Puzzles', apps: ['wordsearch', 'crossword', 'word-scramble', 'cryptogram'] },
  { type: 'guide', id: 'create-crossword-puzzles', title: 'Crossword Puzzles', apps: ['crossword', 'wordsearch', 'word-scramble', 'cryptogram'] },
  { type: 'guide', id: 'create-math-puzzle-worksheets', title: 'Math Puzzle Worksheets', apps: ['math-puzzle', 'addition', 'subtraction', 'code-addition'] },
  { type: 'guide', id: 'create-handwriting-sheets', title: 'Handwriting Sheets', apps: ['writing', 'alphabet-train', 'drawing-lines', 'word-guess'] },
  { type: 'guide', id: 'create-coloring-pages', title: 'Coloring Pages', apps: ['coloring', 'draw-and-color', 'drawing-lines', 'pattern-worksheet'] },
  { type: 'guide', id: 'create-bingo-cards', title: 'Bingo Cards', apps: ['bingo', 'matching', 'picture-sort', 'grid-match'] },
  { type: 'guide', id: 'create-matching-worksheets', title: 'Matching Worksheets', apps: ['matching', 'bingo', 'grid-match', 'shadow-match'] },
  { type: 'guide', id: 'create-pattern-worksheets', title: 'Pattern Worksheets', apps: ['pattern-worksheet', 'pattern-train', 'big-small', 'matching'] },
  { type: 'guide', id: 'create-picture-sudoku', title: 'Picture Sudoku', apps: ['sudoku', 'pattern-worksheet', 'matching', 'bingo'] },
  { type: 'guide', id: 'create-maze-worksheets', title: 'Maze Worksheets', apps: ['picture-path', 'sudoku', 'treasure-hunt', 'find-objects'] },
  { type: 'guide', id: 'create-hidden-object-worksheets', title: 'Hidden Object Worksheets', apps: ['find-objects', 'find-and-count', 'picture-path', 'wordsearch'] },
  { type: 'guide', id: 'create-size-comparison-worksheets', title: 'Size Comparison Worksheets', apps: ['big-small', 'more-less', 'pattern-worksheet', 'odd-one-out'] },
  { type: 'guide', id: 'create-counting-worksheets', title: 'Counting Worksheets', apps: ['chart-count', 'addition', 'more-less', 'matching'] },
  { type: 'guide', id: 'create-drawing-worksheets', title: 'Drawing Worksheets', apps: ['draw-and-color', 'drawing-lines', 'coloring', 'pattern-train'] },
  { type: 'guide', id: 'create-sorting-worksheets', title: 'Sorting Worksheets', apps: ['picture-sort', 'matching', 'odd-one-out', 'bingo'] },
  { type: 'guide', id: 'create-shadow-matching-worksheets', title: 'Shadow Matching', apps: ['shadow-match', 'matching', 'picture-sort', 'odd-one-out'] },
  { type: 'guide', id: 'create-odd-one-out-puzzles', title: 'Odd One Out Puzzles', apps: ['odd-one-out', 'shadow-match', 'missing-pieces', 'picture-sort'] },
  { type: 'guide', id: 'create-missing-pieces-puzzles', title: 'Missing Pieces Puzzles', apps: ['missing-pieces', 'odd-one-out', 'shadow-match', 'grid-match'] },
  { type: 'guide', id: 'create-treasure-hunt-worksheets', title: 'Treasure Hunt Worksheets', apps: ['treasure-hunt', 'find-objects', 'picture-path', 'grid-match'] },
  { type: 'guide', id: 'create-alphabet-worksheets', title: 'Alphabet Worksheets', apps: ['alphabet-train', 'writing', 'wordsearch', 'pattern-train'] },
  { type: 'guide', id: 'create-preposition-worksheets', title: 'Preposition Worksheets', apps: ['prepositions', 'alphabet-train', 'word-guess', 'matching'] },
  { type: 'guide', id: 'create-cryptogram-puzzles', title: 'Cryptogram Puzzles', apps: ['cryptogram', 'wordsearch', 'word-scramble', 'word-guess'] },
  { type: 'guide', id: 'create-chart-count-worksheets', title: 'Chart & Count Worksheets', apps: ['chart-count', 'big-small', 'pattern-train', 'matching'] },
  { type: 'guide', id: 'create-worksheet-bundles', title: 'Worksheet Bundles', apps: ['addition', 'wordsearch', 'coloring', 'matching'] },
  { type: 'guide', id: 'niche-selection-printables', title: 'Niche Selection', apps: ['wordsearch', 'coloring', 'matching', 'addition'] },
  { type: 'guide', id: 'create-printable-product-line', title: 'Product Line Creation', apps: ['matching', 'addition', 'coloring', 'wordsearch'] },
  { type: 'guide', id: 'pricing-educational-printables', title: 'Pricing Strategy', apps: ['math-worksheet', 'addition', 'wordsearch', 'coloring'] },
  { type: 'guide', id: 'scale-printable-business-guide', title: 'Scale Your Business', apps: ['draw-and-color', 'math-worksheet', 'wordsearch', 'matching'] },
  { type: 'guide', id: 'passive-income-worksheets', title: 'Passive Income', apps: ['math-worksheet', 'addition', 'wordsearch', 'matching'] },
  { type: 'guide', id: 'understanding-commercial-licenses', title: 'Commercial Licenses', apps: ['wordsearch', 'addition', 'coloring', 'matching'] },
  { type: 'guide', id: 'research-profitable-niches', title: 'Research Niches', apps: ['matching', 'wordsearch', 'coloring', 'math-worksheet'] },
  { type: 'guide', id: 'multilingual-printable-business', title: 'Multilingual Printables', apps: ['wordsearch', 'word-guess', 'matching', 'addition'] },
  { type: 'guide', id: 'worksheets-multiple-languages', title: 'Multi-Language Worksheets', apps: ['alphabet-train', 'wordsearch', 'word-guess', 'prepositions'] },
  { type: 'guide', id: 'copyright-printable-sellers', title: 'Copyright Guide', apps: ['writing', 'wordsearch', 'coloring', 'math-worksheet'] },
  { type: 'guide', id: 'customer-support-digital-products', title: 'Customer Support', apps: ['matching', 'addition', 'wordsearch', 'math-worksheet'] },
  { type: 'guide', id: 'automate-printable-business', title: 'Automate Your Business', apps: ['math-worksheet', 'addition', 'wordsearch', 'coloring'] },
  { type: 'guide', id: 'social-media-printable-marketing', title: 'Social Media Marketing', apps: ['bingo', 'coloring', 'wordsearch', 'matching'] },
  { type: 'guide', id: 'pinterest-marketing-worksheets', title: 'Pinterest Marketing', apps: ['coloring', 'bingo', 'wordsearch', 'matching'] },
  { type: 'guide', id: 'email-marketing-printables', title: 'Email Marketing', apps: ['wordsearch', 'coloring', 'addition', 'matching'] },
  { type: 'guide', id: 'get-reviews-printable-products', title: 'Getting Reviews', apps: ['matching', 'coloring', 'wordsearch', 'addition'] },
  { type: 'guide', id: 'seasonal-marketing-printables', title: 'Seasonal Marketing', apps: ['bingo', 'coloring', 'wordsearch', 'find-and-count'] },
  { type: 'guide', id: 'digital-vs-physical-printables', title: 'Digital vs Physical', apps: ['addition', 'coloring', 'wordsearch', 'bingo'] },
  { type: 'guide', id: 'quality-standards-worksheets', title: 'Quality Standards', apps: ['wordsearch', 'addition', 'coloring', 'math-worksheet'] },

  // ─── BUNDLES (6) ───
  { type: 'bundle', id: 'math-bundle', title: 'Math & Number Bundle', apps: ['addition', 'subtraction', 'code-addition', 'more-less'] },
  { type: 'bundle', id: 'literacy-bundle', title: 'Letters & Words Bundle', apps: ['alphabet-train', 'prepositions', 'word-guess', 'word-scramble'] },
  { type: 'bundle', id: 'visual-bundle', title: 'Drawing & Art Bundle', apps: ['big-small', 'pattern-train', 'pattern-worksheet', 'draw-and-color'] },
  { type: 'bundle', id: 'matching-bundle', title: 'Matching & Sorting Bundle', apps: ['matching', 'grid-match', 'shadow-match', 'bingo'] },
  { type: 'bundle', id: 'puzzle-bundle', title: 'Puzzles & Games Bundle', apps: ['missing-pieces', 'odd-one-out', 'sudoku', 'picture-path'] },
  { type: 'bundle', id: 'search-bundle', title: 'Search & Find Bundle', apps: ['find-and-count', 'find-objects', 'crossword', 'treasure-hunt'] },

  // ─── IDEAS (45) ───
  { type: 'idea', id: 'farm-animals-printable-ideas', title: 'Farm Animals Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'ocean-animals-printable-ideas', title: 'Ocean Animals Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'safari-animals-printable-ideas', title: 'Safari Animals Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'pets-printable-ideas', title: 'Pets Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'dinosaur-printable-ideas', title: 'Dinosaur Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'birds-printable-ideas', title: 'Birds Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'insects-printable-ideas', title: 'Insects Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'forest-animals-printable-ideas', title: 'Forest Animals Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'christmas-printable-ideas', title: 'Christmas Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'halloween-printable-ideas', title: 'Halloween Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'easter-printable-ideas', title: 'Easter Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'valentines-day-printable-ideas', title: "Valentine's Day Printables", apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'back-to-school-printable-ideas', title: 'Back to School Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'summer-printable-ideas', title: 'Summer Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'winter-printable-ideas', title: 'Winter Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'spring-printable-ideas', title: 'Spring Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'thanksgiving-printable-ideas', title: 'Thanksgiving Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'parents-day-printable-ideas', title: "Parents' Day Printables", apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'space-printable-ideas', title: 'Space Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'transportation-printable-ideas', title: 'Transportation Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'food-cooking-printable-ideas', title: 'Food & Cooking Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'sports-printable-ideas', title: 'Sports Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'music-printable-ideas', title: 'Music Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'construction-printable-ideas', title: 'Construction Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'pirates-printable-ideas', title: 'Pirates Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'fairy-tale-printable-ideas', title: 'Fairy Tale Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'camping-printable-ideas', title: 'Camping Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'underwater-printable-ideas', title: 'Underwater Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'preschool-printable-ideas', title: 'Preschool Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'kindergarten-printable-ideas', title: 'Kindergarten Printables', apps: ['find-and-count', 'wordsearch', 'matching', 'addition'] },
  { type: 'idea', id: 'first-grade-printable-ideas', title: 'First Grade Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'second-grade-printable-ideas', title: 'Second Grade Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'third-grade-printable-ideas', title: 'Third Grade Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'homeschool-printable-ideas', title: 'Homeschool Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'special-education-printable-ideas', title: 'Special Education Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'esl-printable-ideas', title: 'ESL Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'summer-learning-printable-ideas', title: 'Summer Learning Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'math-facts-printable-ideas', title: 'Math Facts Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'subscription-box-printable-ideas', title: 'Subscription Box Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'print-on-demand-printable-ideas', title: 'Print on Demand Printables', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'digital-download-printable-ideas', title: 'Digital Download Ideas', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'physical-printable-product-ideas', title: 'Physical Product Ideas', apps: ['addition', 'wordsearch', 'matching', 'coloring'] },
  { type: 'idea', id: 'party-supply-printable-ideas', title: 'Party Supply Printables', apps: ['wordsearch', 'coloring', 'bingo', 'matching'] },
  { type: 'idea', id: 'custom-worksheet-service-ideas', title: 'Custom Worksheet Services', apps: ['addition', 'wordsearch', 'coloring', 'bingo'] },
  { type: 'idea', id: 'bulk-licensing-printable-ideas', title: 'Bulk Licensing Ideas', apps: ['addition', 'wordsearch', 'coloring', 'bingo'] },

  // ─── START (12) ───
  { type: 'start', id: 'complete-guide-printable-business', title: 'Complete Printable Business Guide', apps: ['wordsearch', 'addition', 'coloring', 'matching'] },
  { type: 'start', id: 'create-worksheets-that-sell', title: 'Create Worksheets That Sell', apps: ['addition', 'subtraction', 'wordsearch', 'coloring'] },
  { type: 'start', id: 'printable-business-blueprint', title: 'Printable Business Blueprint', apps: ['math-puzzle', 'wordsearch', 'coloring', 'addition'] },
  { type: 'start', id: 'etsy-printable-business', title: 'Etsy Printable Business', apps: ['coloring', 'wordsearch', 'addition', 'find-and-count'] },
  { type: 'start', id: 'amazon-kdp-activity-books', title: 'Amazon KDP Activity Books', apps: ['sudoku', 'wordsearch', 'math-puzzle', 'crossword'] },
  { type: 'start', id: 'create-multilingual-worksheets', title: 'Multilingual Worksheets', apps: ['wordsearch', 'crossword', 'word-scramble', 'alphabet-train'] },
  { type: 'start', id: 'commercial-license-guide', title: 'Commercial License Guide', apps: ['wordsearch', 'addition', 'coloring', 'crossword'] },
  { type: 'start', id: 'printable-business-income', title: 'Printable Business Income', apps: ['math-worksheet', 'wordsearch', 'coloring', 'sudoku'] },
  { type: 'start', id: 'tools-for-printable-business', title: 'Tools for Your Business', apps: ['matching', 'wordsearch', 'math-worksheet', 'coloring'] },
  { type: 'start', id: 'marketing-printable-business', title: 'Marketing Your Business', apps: ['bingo', 'wordsearch', 'coloring', 'math-worksheet'] },
  { type: 'start', id: 'scaling-printable-business', title: 'Scaling Your Business', apps: ['draw-and-color', 'wordsearch', 'math-worksheet', 'coloring'] },
  { type: 'start', id: 'printable-business-legal', title: 'Legal Guide for Printables', apps: ['writing', 'wordsearch', 'math-worksheet', 'crossword'] },
];

// ─── Build config maps ───
type PageKey = `${'guide' | 'bundle' | 'idea' | 'start'}:${string}`;
const enConfigMap = new Map<PageKey, PageShowcaseConfig>();
const deConfigMap = new Map<PageKey, PageShowcaseConfig>();
const frConfigMap = new Map<PageKey, PageShowcaseConfig>();
const esConfigMap = new Map<PageKey, PageShowcaseConfig>();
const ptConfigMap = new Map<PageKey, PageShowcaseConfig>();
const itConfigMap = new Map<PageKey, PageShowcaseConfig>();
const nlConfigMap = new Map<PageKey, PageShowcaseConfig>();
const svConfigMap = new Map<PageKey, PageShowcaseConfig>();
const daConfigMap = new Map<PageKey, PageShowcaseConfig>();
const noConfigMap = new Map<PageKey, PageShowcaseConfig>();
const fiConfigMap = new Map<PageKey, PageShowcaseConfig>();

pages.forEach((p, i) => {
  const key = `${p.type}:${p.id}` as PageKey;
  enConfigMap.set(key, buildConfig(p.apps, p.title, i, 'en'));
  deConfigMap.set(key, buildConfig(p.apps, p.title, i, 'de'));
  frConfigMap.set(key, buildConfig(p.apps, p.title, i, 'fr'));
  esConfigMap.set(key, buildConfig(p.apps, p.title, i, 'es'));
  ptConfigMap.set(key, buildConfig(p.apps, p.title, i, 'pt'));
  itConfigMap.set(key, buildConfig(p.apps, p.title, i, 'it'));
  nlConfigMap.set(key, buildConfig(p.apps, p.title, i, 'nl'));
  svConfigMap.set(key, buildConfig(p.apps, p.title, i, 'sv'));
  daConfigMap.set(key, buildConfig(p.apps, p.title, i, 'da'));
  noConfigMap.set(key, buildConfig(p.apps, p.title, i, 'no'));
  fiConfigMap.set(key, buildConfig(p.apps, p.title, i, 'fi'));
});

// ─── Public API ───
export function getPageShowcaseConfig(
  pageType: 'guide' | 'bundle' | 'idea' | 'start',
  pageId: string,
  locale: string = 'en',
): PageShowcaseConfig | null {
  const key = `${pageType}:${pageId}` as PageKey;
  if (locale === 'de') return deConfigMap.get(key) ?? null;
  if (locale === 'fr') return frConfigMap.get(key) ?? null;
  if (locale === 'es') return esConfigMap.get(key) ?? null;
  if (locale === 'pt') return ptConfigMap.get(key) ?? null;
  if (locale === 'it') return itConfigMap.get(key) ?? null;
  if (locale === 'nl') return nlConfigMap.get(key) ?? null;
  if (locale === 'sv') return svConfigMap.get(key) ?? null;
  if (locale === 'da') return daConfigMap.get(key) ?? null;
  if (locale === 'no') return noConfigMap.get(key) ?? null;
  if (locale === 'fi') return fiConfigMap.get(key) ?? null;
  return enConfigMap.get(key) ?? null;
}
