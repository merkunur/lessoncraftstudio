#!/usr/bin/env node
/**
 * Gate: tap-to-edit slots (lib/slot.js, ARCHITECTURE §4.3) in every pilot template.
 *
 * For each template of each pilot maker, Node only (fast):
 *   1. catalogue untouched — the type built WITHOUT the maker's ctx (no slotsOut, no overrides) gives the same bodyHtml +
 *      meta as the committed version at git HEAD~0 of a reference ref (--ref=, default HEAD) for 3 themes × levels × 2
 *      copies; a slot change must never alter a published page
 *   2. in the maker, for every slot role: overriding item 0 with an unused pool item applies it (slots.values[0] = the
 *      choice), leaves every other item as drawn, and stamps a tap target for it in the html; a duplicate of another item
 *      and a key outside the pool are refused (the page is unchanged)
 *   3. every template that draws pictures or words from a pool exposes a slot (no silent template without tap-to-edit)
 *
 * The reference builds run in a WORKER process that loads only the reference tree (2026-11-02): loaded in this process
 * beside the current code they shared module state through the linked data folder — an old engine merged its locales
 * into a data module the current engine then read, and correct templates failed as "cannot be built".
 *
 *   node scripts/makers/gates/slots.js [--ref=HEAD] [--makers=a,b]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..', '..');
const REF = (process.argv.find((a) => a.startsWith('--ref=')) || '--ref=HEAD').slice(6);
const ONLY = ((process.argv.find((a) => a.startsWith('--makers=')) || '').slice(9)).split(',').filter(Boolean);
const { makePage } = require('../runtime.js');
const { resolveStrings } = require(path.join(REPO, 'scripts/worksheet-gen/i18n/strings.js'));
const { makeRng, instanceSeed } = require(path.join(REPO, 'scripts/worksheet-gen/lib/rng.js'));

// templates that legitimately have no slot: their content is fixed by a setting (the Word control) or carries no
// picture/word pool (dots, tallies, numerals)
const NO_SLOT = new Set(['K-005', 'K-015', 'K-017', 'K-024', 'K-025', 'G1-105', 'G1-106', 'K-388', 'K-389', 'K-390', 'K-391', 'K-392',
  // the one-word maker templates (2026-10-31): the Word control picks the word; the sentences come with it
  'K-433', 'K-434', 'K-435', 'K-436', 'K-438', 'K-439',
  // numerals, dots, frames, beads, tallies — no picture or word on the page (Counting, Ten Frames, Number Charts makers)
  'K-446', 'K-449', 'K-450', 'K-451', 'K-452', 'K-453', 'K-454', 'K-021', 'K-022', 'G1-130', 'G1-131', 'G1-132', 'G1-310',
  'G1-347', 'G1-348', 'G1-434', 'G1-435', 'G1-436', 'G1-271',
  // fractions: shapes, bars and numerals only (Fractions maker 2026-11-01; G2-233 / G3-320 have picture slots)
  'G2-228', 'G2-229', 'G2-230', 'G2-231', 'G2-232', 'G2-234', 'G2-406', 'G2-407', 'G2-408', 'G2-409', 'G2-410',
  'G3-315', 'G3-316', 'G3-317', 'G3-318', 'G3-319', 'G3-321', 'G3-322', 'G3-343',
  // multiplication + division: numerals only (Multiplication & Division maker 2026-11-01; the picture faces have slots)
  'G1-110', 'G1-111', 'G2-411', 'G3-313', 'G3-358', 'G3-364', 'G3-365', 'G3-366', 'G3-367', 'G3-368', 'G3-381', 'G3-382', 'G3-383', 'G3-384',
  'G3-402', 'G3-403', 'G3-404', 'G3-405', 'G3-407', 'G3-408', 'G3-409', 'G3-410', 'G3-411',
  // money: coins and notes are drawn tokens, not pictures (Money maker 2026-11-01; the store's tags have slots)
  'K-461', 'G2-471', 'G2-472', 'G2-473', 'G3-474', 'G1-211', 'G1-228', 'G1-229', 'G1-230', 'G1-231', 'G1-232',
  // place value + rounding: blocks and numerals only (Place Value maker 2026-11-01)
  'G1-120', 'G1-121', 'G1-122', 'G1-133', 'G2-203', 'G2-205', 'G2-206', 'G2-222', 'G2-223', 'G2-224', 'G2-225', 'G2-227', 'G2-346',
  'G2-401', 'G2-402', 'G2-403', 'G2-404', 'G2-405', 'G1-476',
  // Telling Time (2026-11-02): times on clock faces — no picture or word pool (G1-478 / G2-474 carry the day's moments as slots)
  'G1-148', 'G1-149', 'G1-150', 'G1-212', 'G1-233', 'G1-234', 'G1-235', 'G1-236', 'G1-237', 'G2-249', 'G2-250', 'G3-344', 'G3-354', 'G3-355', 'G3-356',
  'G1-477', 'G1-479', 'G3-475', 'K-462', 'G3-387', 'G3-388', 'G3-389', 'G3-390', 'G3-391', 'G1-351', 'G1-455', 'G1-456', 'G1-457', 'G2-351', 'G2-352', 'G2-400', 'G3-386', 'G1-135', 'G1-136', 'G1-137', 'G2-219', 'G2-220', 'G3-325', 'K-460', 'G1-453', 'G1-454', 'G2-398', 'G2-399', 'G2-218', 'G2-226', 'G2-321', 'G2-322', 'G2-323', 'G2-394', 'G3-328',
  // Measurement & Size (2026-11-02): jugs, thermometers, cube towers and cut-out rulers — no picture pool; G2-477 Which Unit?
  // draws its things from a reviewed cross-theme list where swapping one could change its right unit
  'G2-260', 'G2-263', 'G3-345', 'G3-346', 'G3-476', 'G2-475', 'G2-477',
  // Graphs & Data (2026-11-02): the line plots draw numbers and X marks only
  'G2-240', 'G3-335',
  // Shapes & Geometry (2026-11-02): pictures drawn from shapes, grids, nets — no library picture or word pool
  'K-464', 'G3-477', 'G2-478',
  // ... and the shape IS the answer: the 2D-shape family's reviewed objects (data/b5/2d-shapes.js), the shapes theme's
  // drawings and the reviewed real solids (geometry-tasks) — a swapped picture would change what is right (as K-038)
  'K-368', 'K-371', 'K-372', 'G1-381', 'G1-382', 'G1-383', 'K-075', 'K-076', 'G2-241', 'G2-242', 'G2-243', 'G2-244', 'G2-245',
  'G2-246', 'G3-337', 'G3-338', 'G3-339', 'G3-340', 'G3-341', 'G3-342',
  // Patterns (2026-11-02): G1-483 numbers only
  'G1-483',
  // Number Tracing (2026-11-02): K-468 numerals and number words only
  'K-468',
  // ... K-517 / K-518 (2026-11-02): the numbers to 100 in tens rows and the formation poster — numerals only
  'K-517', 'K-518',
  // Letter Tracing (2026-11-02): K-525 / K-526 print the alphabet in order — the copies walk it; no picture or word pool
  'K-525', 'K-526',
  // Cursive Handwriting (2026-11-02): the family's faces print the bank's native-reviewed literals in the school script
  // (lessons, joins, names, pictured words, sentences — each checked for the page's mark classes and look-alikes); a
  // teacher's own words are G2-480 / G2-481 (typed slots, refused outside the script's coverage); G2-482 keeps its reviewed
  // look-alike-free word set, G2-483 prints the alphabet in order
  'G2-377', 'G2-384', 'G2-385', 'G2-386', 'G2-387', 'G3-401', 'G2-482', 'G2-483',
  // Alphabet & Letters (2026-11-02): the alphabet in its own order (train, chart, cards, before / after) and a letter hunt
  // built from the alphabet — no picture or word pool to swap from
  'K-530', 'K-531', 'K-532', 'G1-492', 'K-534',
  // Same & Different (2026-11-02): K-069 What Is It? draws each row's picture TOGETHER with the two choices its visible
  // part cannot be read as (masks) — a swapped picture needs new choices and re-draws every later row
  'K-069',
  // Sorting (2026-11-02): G1-485 draws its shapes and colours by code — the Level control and "New version" change them
  'G1-485',
  // Dot to Dot (2026-11-02): the picture IS the dots — a scene whose outline takes the level's number of dots and whose
  // numbers all find a free place (the d2d index), or a hand-drawn figure; it is not a library picture, so no picker can
  // offer it — "New version" moves through the level's pictures. The numbers / letters come from the level
  'K-285', 'K-294', 'K-295', 'K-296', 'K-308', 'K-309', 'G1-285', 'G1-294', 'G2-304', 'G2-314', 'K-473', 'G1-486',
  'K-505', 'K-506', 'K-507',
  // Color by Number (2026-11-02): the code faces draw shapes and numerals / sums / facts by code (the Level control and
  // "New version" change them); the illustrated pictures (K-393 / K-394) are one drawn design each — the design is the page
  'K-241', 'K-265', 'K-266', 'K-267', 'K-268', 'K-269', 'G3-478', 'K-393', 'K-394', 'G1-487', 'K-513',
  // the composed-scene makers (2026-11-02): a Find the Differences scene, a How to Draw lesson and a Picture Tracing scene
  // are each ONE reviewed composition (the differences, the steps, the occlusion depend on every drawing in it) — "New
  // version" walks the face's published and Level Set copies; a single drawing is never swapped
  'K-395', 'K-397', 'K-398', 'K-399', 'K-400', 'G1-412', 'G1-413', 'G1-414', 'G1-415', 'G2-388', 'G2-389',
  'K-396', 'K-401', 'K-402', 'K-403', 'K-404', 'G1-416', 'G1-417', 'G1-418', 'G1-419', 'G2-390', 'G2-391',
  'K-418', 'K-419', 'K-420', 'K-421', 'K-422', 'K-423', 'K-424', 'K-425', 'K-426', 'K-427', 'K-428', 'K-429', 'K-430', 'K-431', 'K-432',
  'G1-429', 'G1-430', 'G1-431', 'G1-432', 'G1-433',
  'K-488', 'K-489', 'K-490', 'K-491', 'K-492', 'K-493', 'K-494', 'K-495', 'K-496', 'K-497', 'K-498', 'K-499', 'K-500', 'K-501',
  // Same & Different (2026-11-02): K-509's pictures are chosen TOGETHER so that no two outlines are alike — a swapped picture
  // could hide behind another's outline (two right answers)
  'K-509',
  // K-038 Heavy or Light?: the PAIR is the question (ranked by real weight, a set gap apart) — a swapped picture changes it
  'K-038',
  // logic puzzles (task 6, 2026-11-01): numerals, cages and shapes only — the picture faces G1-471 / G3-471 / G1-472 have slots
  'G1-470', 'G3-470', 'G2-470', 'G3-472', 'G3-473',
  // logic puzzles: number walls, magic squares and number balances are numerals only (Logic & Math Puzzles maker 2026-11-01)
  'G1-246', 'G1-266', 'G1-267', 'G1-268', 'G1-289', 'G2-313', 'G3-349', 'G3-350',
  // Mazes (final phase 2026-11-03): the handmade mazes (K-405 engine) are pinned scenes — every picture is drawn into
  // its roads and the one way is proved on that drawing, so a swapped picture would break the scene (K-480 places its
  // kind's pictures through that engine); K-484 / K-485 are grid mazes with no picture or word
  'K-405', 'K-406', 'K-407', 'K-408', 'K-409', 'K-410', 'K-411', 'K-412', 'K-413', 'K-480', 'K-484', 'K-485', 'G1-420', 'G1-421', 'G1-422', 'G1-423', 'G1-424', 'G1-425', 'G1-426', 'G1-427', 'G1-428', 'G2-392', 'G2-393',
  // Calendar (final phase 2026-11-03): the days and months of the language ARE the content (every name, in order),
  // and Today's Date / the birthday graph take the class's own day and data — nothing is drawn from a pool a teacher
  // would swap (the Read the Calendar faces G2-277 / G2-296..298 / G2-312 have sticker slots)
  'G1-319', 'G1-320', 'G1-321', 'G1-322', 'G1-525', 'G1-526', 'K-321', 'K-337',
  // Number of the Day / number words (final phase 2026-11-03): numerals and the language's number words only — the
  // level's range draws them, there is no picture or word pool to swap from
  'G1-210', 'G1-223', 'G1-224', 'G1-225', 'G1-226', 'G1-227', 'G1-243', 'G1-255', 'G1-256', 'G1-257', 'G1-514', 'G2-491',
  // Make Your Own Secret Code (G1-542): the child invents the code — nothing is drawn; Number Word Search (K-568):
  // the language's number words for the level's range
  'G1-542', 'K-568',
  // the hidden-message word search: the grid is rebuilt from a fresh word list until the letters left over spell a
  // sentence exactly; a swapped word changes that letter count, so no single-word swap can be kept (Regenerate draws
  // another page)
  'G2-494',
  // Ordinal Numbers to 31 / Symbol and Word / Ordinal Number Cards (final phase 2026-11-03): the ordinals of the
  // level's range in the language's own notation and words (and a row of dots) — no picture or word pool to swap from
  'G1-515', 'G1-516', 'G1-521',
  // Number, Word and Picture / Number Word Cards (final phase 2026-11-03): numerals, the language's number words and
  // ten frames of the level's range — no picture or word pool to swap from
  'K-556', 'K-557',
  // Bingo (final phase 2026-11-03): a level's pool is ONE caller set, drawn by its own fixed seed
  // (types/_shared/bingo.js poolOf) and shared by every card page and the caller-card page — a swapped picture or
  // word would be a cell no caller card ever calls; the teacher chooses the theme and the level
  'K-569', 'K-570', 'K-571', 'K-572', 'K-573', 'K-574', 'K-575', 'K-576', 'K-577', 'K-578', 'G1-543', 'G1-544', 'G1-545', 'G1-546',
  // All About Me (final phase 2026-11-03): the poster (K-323), My Family (K-343) and My Name (K-346) are fill-in
  // pages — fixed prompts, frames and lanes the child fills with her own drawing, name and numbers; nothing is drawn
  // from a pool. Feelings scene face (K-331): each card is an authored scene, its objects drawn object-disjoint
  // across the page and balanced across feelings — Regenerate draws another set
  'K-323', 'K-343', 'K-346', 'K-331',
  // Family (final phase 2026-11-03): every face draws ONE invented family graph (the portrait cast) and derives every
  // word and answer from it — each person carries a kinship path from the child, a word is legal only when exactly
  // one person carries it, and verify() re-derives the parents from the drawn lines; nothing can be swapped without
  // redrawing the family (Regenerate draws another), and the tree template is empty
  'K-370', 'K-375', 'G1-385', 'G1-386', 'G1-387', 'G2-362',
  // Feelings This Week (K-564) and Feelings Cards (K-566) print ALL six faces a K child reads without the word, every
  // page; My Friend and Me (G1-531) is a two-ring diagram the children fill — nothing is drawn from a pool
  'K-564', 'K-566', 'G1-531',
  // Finish the Rhyme (G1-344, the couplet face of Rhyming Words): each answer finishes a written sentence (its rhyme
  // AND its meaning) — another word of the rhyme class would rhyme but make a nonsense line; Regenerate draws other
  // couplets
  'G1-344',
  // Letter Tracing (final phase 2026-11-03): no draw — a page traces the letters of its group (a-f, g-l … the
  // language's own letters, the first letters) in alphabet order, and the group is the teacher's unit setting
  'K-238', 'K-254', 'K-255', 'K-256', 'K-257', 'K-258', 'K-278', 'K-279', 'K-280', 'K-281', 'K-282', 'K-283',
  // Maps & Grids (final phase 2026-11-03): Map Skills (G1-379 and its faces K-377, G2-369..371, G3-396) draw ONE
  // invented island whose symbols and places are placed into its land and paths, and the continents and oceans are
  // fixed geography; the room plan (K-563) draws furniture models; Draw Your Own Map (G1-530) is empty; Grid
  // Coordinates (G2-279, G2-302, G2-303, G2-308) is a pixel figure drawn cell by cell from the level's set (its key
  // names are English only) — Regenerate draws another
  'G1-379', 'K-377', 'G2-369', 'G2-370', 'G2-371', 'G3-396', 'K-563', 'G1-530', 'G2-279', 'G2-302', 'G2-303', 'G2-308',
  // Digraphs in Sentences (G2-372, the text face of Digraphs): the child finds the letter team in written sentences —
  // every word belongs to its sentence (meaning, grammar), so a swapped word would make a wrong sentence; Regenerate
  // draws other sentences
  'G2-372',
  // Reading (final phase 2026-11-03): the Reading Log (K-554) is a page to fill for any book; the comprehension
  // stories (G2-254, G2-269..273) are each a reviewed story with its own questions; Read and Do (G1-308, G1-338..342)
  // composes every instruction WITH its strip or card — the place, the count and the word forms of its nouns (the fi
  // partitive …) — so a swapped noun is a new instruction, not a new picture: Regenerate draws another page
  'K-554', 'G2-254', 'G2-269', 'G2-270', 'G2-271', 'G2-272', 'G2-273', 'G1-308', 'G1-338', 'G1-339', 'G1-340', 'G1-341', 'G1-342',
  // Fill in the Blank: Story (G2-350, the story face of Cloze): each page is ONE authored story whose gaps run
  // through its sentences — a swapped sentence would break the story; Regenerate draws another
  'G2-350',
  // Question Words (G1-353 and its faces G1-373..375, G2-356, G2-357): every row is composed from a frame and the
  // part it asks about — a person of the portrait cast, a thing, a place, a number or a time — with that part's own
  // word forms and clash rules; a swapped part is a new question, not a new picture: Regenerate draws another page
  'G1-353', 'G1-373', 'G1-374', 'G1-375', 'G2-356', 'G2-357',
  // Grammar (final phase 2026-11-03): Verb Forms (G2-317, G2-334..338) pairs each verb with a sentence frame that
  // fits only some verbs and plans its gap columns over the page — a swapped verb needs another frame; Pronouns
  // (G1-352, G1-371, G1-372, G2-353..355) draws people of the portrait cast with their names, and the answer is that
  // person's pronoun — Regenerate draws another page
  'G2-317', 'G2-334', 'G2-335', 'G2-336', 'G2-337', 'G2-338', 'G1-352', 'G1-371', 'G1-372', 'G2-353', 'G2-354', 'G2-355',
  // Opposites in a Sentence (G1-335) and Opposite or the Same? (G1-337): each row is a sentence frame written for its
  // pair, or a pair with its own synonym and far word chosen across the page so no word is a second right answer — a
  // swapped pair needs other sentences and distractors: Regenerate
  'G1-335', 'G1-337',
  // Synonyms (G2-358 and its faces G1-395, G1-396, G2-373, G2-374, G3-397): every row is a concept group drawn with
  // its near set and domain across the page so no word is a second right answer, and each face composes its rows
  // (shade scales, pairs, said-sentences, word fields) from those groups — a swapped word would change the page's
  // answers: Regenerate
  'G2-358', 'G1-395', 'G1-396', 'G2-373', 'G2-374', 'G3-397',
  // Word Parts (G2-359 and its faces G1-397, G2-375, G2-376, G3-398, G3-399) and Compound Words (G2-316,
  // G2-330..333): every card is a word family or a compound drawn as a unit — its member, parts, link and foils
  // chosen across the page so no foil belongs to another card and no half meets its partner — a swapped word would
  // change the other cards' answers: Regenerate
  'G2-359', 'G1-397', 'G2-375', 'G2-376', 'G3-398', 'G3-399', 'G2-316', 'G2-330', 'G2-331', 'G2-332', 'G2-333',
  // Stories & Writing (final phase 2026-11-03): Story Sequencing (K-379, K-381, G1-400..402, G2-378) draws each page
  // as ONE plan — its stories, their panel orders, foils and tray slots chosen together against answer tells; the
  // Animal Fact File (G2-318, G2-339..343) draws an animal with its true facts against the other animals' profiles;
  // the Story Map (G1-506) and Postcard (G1-510) are frames the child fills — Regenerate draws another page
  'K-379', 'K-381', 'G1-400', 'G1-401', 'G1-402', 'G2-378', 'G2-318', 'G2-339', 'G2-340', 'G2-341', 'G2-342', 'G2-343', 'G1-506', 'G1-510',
]);
// a template whose theme pictures are DECORATION only (themeAxis.decorative: a corner flourish on a numeral page) has
// nothing a teacher would swap — no slot is required

const WORKER = `'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { makeRng, instanceSeed } = require('./scripts/worksheet-gen/lib/rng.js');
const sha = (x) => crypto.createHash('sha1').update(String(x)).digest('hex');
const norm = (x) => String(x).split('.scratch/slots-ref/').join('');
(async () => {
  const jobs = JSON.parse(fs.readFileSync(path.join(__dirname, 'slots-jobs.json'), 'utf8')), out = {}, types = {};
  for (const j of jobs) {
    if (!(j.file in types)) { try { types[j.file] = require(path.join(__dirname, j.file)); } catch (e) { types[j.file] = { loadError: e.message }; } }
    const type = types[j.file];
    if (type.loadError) { out[j.key] = { loadError: type.loadError }; continue; }
    const seed = instanceSeed({ typeId: j.id, theme: j.theme, difficulty: j.d, seedEpoch: 1, variant: j.v, unit: j.unit });
    try { const a = await type.build({ theme: j.theme, difficulty: j.d, locale: 'en', unit: j.unit }, { rng: makeRng(seed), variant: j.v }); out[j.key] = { h: sha(norm(a.bodyHtml)), m: sha(norm(JSON.stringify(a.meta))) }; }
    catch (e) { out[j.key] = { err: e.message }; }
  }
  fs.writeFileSync(path.join(__dirname, 'slots-ref.json'), JSON.stringify(out));
})().catch((e) => { console.error(e); process.exit(1); });
`;

let fails = 0;
const fail = (m) => { fails++; console.log('FAIL ' + m); };

// the committed versions of every file under types/ (shared builders included) go into a temp tree, so require()
// of a HEAD type resolves its HEAD siblings
const tmp = path.join(REPO, '.scratch', 'slots-ref');
fs.rmSync(tmp, { recursive: true, force: true });
const wgRel = 'scripts/worksheet-gen';
function refCopy(rel) {
  const dst = path.join(tmp, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, execSync(`git show ${REF}:${rel}`, { cwd: REPO, maxBuffer: 64 << 20 }));
}
// mirror the worksheet-gen code tree at REF (not data/cache: those are read through the platform from the real repo;
// qa/ too: primitives/dot-figure.js reuses qa/verify-b2-figures.js's geometry, so a dot-to-dot type loads it)
const files = execSync(`git ls-tree -r --name-only ${REF} ${wgRel}/types ${wgRel}/templates ${wgRel}/primitives ${wgRel}/lib ${wgRel}/image-cache ${wgRel}/page ${wgRel}/qa`, { cwd: REPO, maxBuffer: 64 << 20 }).toString().split('\n').filter((f) => /\.(js|json)$/.test(f));   // .json too: primitives/font-metrics.json
files.forEach(refCopy);
// shared non-code inputs the REF code reads relative to itself
// the publish-cli helpers the platform loads (the vocabulary), read from the real repo
try { fs.symlinkSync(path.join(REPO, 'scripts', 'publish-cli'), path.join(tmp, 'scripts', 'publish-cli'), 'junction'); } catch (e) { /* exists */ }
// the syllable safety pipeline's approved words (lib/b3-common.js reads scripts/v2-data relative to itself): without them every
// REF build of a syllable template threw and the gate reported its catalogue as changed (G1-324, 2026-11-03)
try { fs.symlinkSync(path.join(REPO, 'scripts', 'v2-data'), path.join(tmp, 'scripts', 'v2-data'), 'junction'); } catch (e) { /* exists */ }
// two more shared inputs outside worksheet-gen that REF code requires relative to itself: scripts/lib (the syllable split
// screen loads scripts/lib/free-claim.js) and REFERENCE TRANSLATIONS (lcs-grammar.js, the position-word sentences) —
// without them every REF build of G1-325..328 / K-546..549 threw and the gate reported their catalogue as changed
try { fs.symlinkSync(path.join(REPO, 'scripts', 'lib'), path.join(tmp, 'scripts', 'lib'), 'junction'); } catch (e) { /* exists */ }
try { fs.symlinkSync(path.join(REPO, 'REFERENCE TRANSLATIONS'), path.join(tmp, 'REFERENCE TRANSLATIONS'), 'junction'); } catch (e) { /* exists */ }
for (const d of ['data', 'i18n', 'cache', 'assets']) {
  const src = path.join(REPO, wgRel, d);
  const dst = path.join(tmp, wgRel, d);
  if (d !== 'data') { try { fs.symlinkSync(src, dst, 'junction'); } catch (e) { /* exists */ } continue; }
  // data/: linked entry by entry, except the b3 banks, which are COPIED — b3-common merges the locale files into the
  // bank module's object, so one module shared by the REF code and the current code would be merged twice
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src)) {
    if (e === 'b3') fs.cpSync(path.join(src, e), path.join(dst, e), { recursive: true });
    else { try { fs.symlinkSync(path.join(src, e), path.join(dst, e), fs.statSync(path.join(src, e)).isDirectory() ? 'junction' : 'file'); } catch (er) { fs.copyFileSync(path.join(src, e), path.join(dst, e)); } }
  }
}

// every maker built so far (out/makers/versions.json), or the ones asked for
const MAKER_LANG = Object.fromEntries(require('../topic-map.js').MAKERS.map((x) => [x.id, x.lang]));
const MAKERS = Object.keys(JSON.parse(fs.readFileSync(path.join(REPO, 'out/makers/versions.json'), 'utf8'))).filter((m) => !ONLY.length || ONLY.includes(m));
const crypto = require('crypto');
const sha = (x) => crypto.createHash('sha1').update(String(x)).digest('hex');
const tjOf = (m) => JSON.parse(fs.readFileSync(path.join(REPO, 'out/makers', m, fs.readFileSync(path.join(REPO, 'out/makers', m, 'current.txt'), 'utf8').trim(), 'templates.json'), 'utf8'));
// the slots gate builds the English pages: the themes the template offers in English (templates.json localeThemes)
const themesOf = (t0) => { const t = { ...t0, themes: (t0.localeThemes && t0.localeThemes.en) || t0.themes }; return (t.themed ? [t.themes[0], t.themes[1], t.themes.find((x) => /bw(\s+\d+)?$/i.test(x)) || t.themes[2]] : [null]); };
// a unit drawn for one level (t.unitLevels) is asked for at that level only
const unitAtOf = (t) => (d) => ((t.units && t.units.en) || []).filter((u) => (!t.unitLevels || t.unitLevels[u.id] === d) && (!t.localeUnitLevels || !t.localeUnitLevels['en'] || (t.localeUnitLevels['en'][u.id] || []).includes(d))).map((u) => u.id)[0] || null;
const jobKey = (id, theme, d, v) => [id, theme, d, v].join('|');
// 1 (reference side): the catalogue builds of every template that existed at REF, by the worker in its own process
const jobs = [];
for (const m of MAKERS) for (const t of tjOf(m).templates) {
  if (!fs.existsSync(path.join(tmp, t.file))) continue;
  if (!t.locales.includes('en')) continue;   // (English pages only: K-540 is taught in es pt it fr)
  const unitAt = unitAtOf(t);
  for (const theme of themesOf(t)) for (const d of ((t.localeLevels && t.localeLevels['en']) || t.levels)) for (const v of [1, 2]) jobs.push({ key: jobKey(t.id, theme, d, v), id: t.id, file: t.file, theme, d, v, unit: unitAt(d) });
}
fs.writeFileSync(path.join(tmp, 'slots-jobs.json'), JSON.stringify(jobs));
fs.writeFileSync(path.join(tmp, 'slots-ref-worker.js'), WORKER);
execSync('node slots-ref-worker.js', { cwd: tmp, stdio: 'inherit', maxBuffer: 64 << 20 });
const REFOUT = JSON.parse(fs.readFileSync(path.join(tmp, 'slots-ref.json'), 'utf8'));

for (const m of MAKERS) {
  const ver = fs.readFileSync(path.join(REPO, 'out/makers', m, 'current.txt'), 'utf8').trim();
  const tj = JSON.parse(fs.readFileSync(path.join(REPO, 'out/makers', m, ver, 'templates.json'), 'utf8'));
  for (const t of tj.templates) {
    if (!t.locales.includes('en')) continue;   // (English pages only)
    const type = require(path.join(REPO, t.file));
    const isNew = !fs.existsSync(path.join(tmp, t.file));   // a template born after REF has no catalogue output to keep
    const loadErr = !isNew && (REFOUT[jobKey(t.id, themesOf(t)[0], ((t.localeLevels && t.localeLevels.en) || t.levels)[0], 1)] || {}).loadError;
    if (loadErr) fail(`${t.id}: cannot load ${REF} version (${loadErr})`);
    const strings = resolveStrings(t.id, 'en', type);
    const themes = themesOf(t);
    const unitAt = unitAtOf(t);
    // 1. catalogue untouched (the reference side was built by the worker; the reference tree's picture file URLs carry its
    // .scratch/slots-ref/ prefix, which the worker removed — the only allowed difference)
    let same = 0, n = 0;
    for (const theme of themes) for (const d of ((t.localeLevels && t.localeLevels['en']) || t.levels)) for (const v of [1, 2]) {
      n++;
      const unit = unitAt(d);
      const seed = instanceSeed({ typeId: t.id, theme, difficulty: d, seedEpoch: 1, variant: v, unit });
      const r = isNew ? null : REFOUT[jobKey(t.id, theme, d, v)];
      let b, eb = null;
      try { b = type.build({ theme, difficulty: d, locale: 'en', unit }, { rng: makeRng(seed), variant: v }); } catch (e) { eb = e; }
      // a seed that cannot be built (the maker then retries a fresh seed) is unchanged when it threw before too
      if ((r && r.err) || eb) { if (r && r.err && eb) same++; else if (!r && eb) fail(`${t.id}: build threw (${eb.message})`); continue; }
      if (r && !r.loadError && r.h === sha(b.bodyHtml) && r.m === sha(JSON.stringify(b.meta))) same++;
    }
    if (!isNew && same !== n) fail(`${t.id}: catalogue output changed in ${n - same}/${n} builds`);
    // 2 + 3. slots in the maker
    const theme = themes[0];
    // the level checked: level 2, or the first level whose page exposes a slot (a level may draw dots, another pictures)
    const lvEn = ((t.localeLevels && t.localeLevels['en']) || t.levels);
    const lv = [...new Set([lvEn.includes(2) ? 2 : lvEn[0], ...lvEn])];
    // the page the maker shows: the first seed that builds (runtime.generate's fresh-seed ladder), every check on that seed
    const SV = [null, '1.1', '1.2', '1.3', '1.4'];
    const svOf = (x) => SV.find((sv) => { try { makePage({ type, strings, locale: 'en', difficulty: x, theme, unit: unitAt(x), variant: 1, ...(sv ? { seedVariant: sv } : {}) }); return true; } catch (e) { return false; } });
    const mk = (x, sv, extra) => makePage({ type, strings, locale: 'en', difficulty: x, theme, unit: unitAt(x), variant: 1, ...(sv ? { seedVariant: sv } : {}), ...(extra || {}) });
    const tryMk = (x, sv, extra) => { try { return mk(x, sv, extra); } catch (e) { return null; } };
    const d = lv.find((x) => { const sv = svOf(x); return sv !== undefined && Object.keys(mk(x, sv).slots).length; }) || lv[0];
    const sv0 = svOf(d);
    if (sv0 === undefined) { fail(`${t.id}: level ${d} cannot be built for ${theme}`); continue; }
    const base = mk(d, sv0);
    const roles = Object.keys(base.slots);
    const decorative = !!(type.themeAxis && type.themeAxis.decorative);
    // a maker with no word data (topic-map lang 'none': numerals, lines, charts) has no word pool; its template needs a
    // slot only when it draws pictures as content (a theme that is not mere decoration)
    const numeralOnly = MAKER_LANG[m] === 'none' && !(type.themeAxis && type.themeAxis.applicable && !decorative);
    if (!roles.length && !NO_SLOT.has(t.id) && !decorative && !numeralOnly) fail(`${t.id}: draws from a pool but exposes no slot`);
    if (roles.length && NO_SLOT.has(t.id)) fail(`${t.id}: listed as slot-less but exposes ${roles.join(',')}`);
    for (const role of roles) {
      const s = base.slots[role];
      // the probe choice: a pool item on NO slot of the page first (a type refuses a picture another slot already shows —
      // K-510 keeps its groups apart), else any item outside this slot
      const onPage = new Set(Object.values(base.slots).flatMap((x) => x.values || []));
      const frees = s.pool.filter((k) => !s.values.includes(k));
      if (!frees.length) { console.log(`note ${t.id} ${role}: pool has no unused item`); continue; }
      // a refused probe proves nothing about the accepting path (2026-11-03: G1-305 refused "bat", another syllable count,
      // and the gate stopped there): the free choices are tried in turn until one is taken; a slot that refuses EVERY
      // free choice is one a teacher can never use
      // every free choice already on the page in ANOTHER role (G1-140: a row's three length-fitting pictures, the other two
      // rows hold two of them) — the page is full for this slot, a type rightly refuses a picture twice: noted, not a fault
      if (!frees.some((k) => !onPage.has(k))) { console.log(`note ${t.id} ${role}: every free choice is already on the page`); continue; }
      const order = [...frees.filter((k) => !onPage.has(k)), ...frees.filter((k) => onPage.has(k))];
      // the item probed: item 0 first, then the next ones (2026-11-03: a Cloze plural page has two spare frames and both break
      // the theme cap for row 1) — a slot is dead only when NO item takes any free choice
      let free = null, ed = null, refusedN = 0, at = 0;
      for (let j = 0; j < Math.min(s.values.length, 8) && !ed; j++) {
        for (const k of order) {
          const r = tryMk(d, sv0, { overrides: { [role]: { [j]: k } } });
          if (r && !r.slots[role].refused) { free = k; ed = r; at = j; break; }
          refusedN++;
        }
      }
      if (!ed) { fail(`${t.id} ${role}: every free choice (${refusedN}) is refused — a slot a teacher can never use`); continue; }
      if (refusedN) console.log(`note ${t.id} ${role}: ${refusedN} choice(s) refused by the type's own rule before ${free} was taken (item ${at})`);
      const e = ed.slots[role];
      if (e.values[at] !== free) fail(`${t.id} ${role}: the choice was not applied`);
      if (JSON.stringify(e.values.filter((x, j) => j !== at)) !== JSON.stringify(s.values.filter((x, j) => j !== at))) fail(`${t.id} ${role}: other items changed`);
      if (!ed.html.includes(`data-lcs-slot="${role}.${at}"`)) fail(`${t.id} ${role}: no tap target for item ${at}`);
      if (ed.html === base.html) fail(`${t.id} ${role}: the page did not change`);
      if (s.values.length > 1) {
        const dup = tryMk(d, sv0, { overrides: { [role]: { 0: s.values[1] } } });
        if (dup && dup.html !== base.html) fail(`${t.id} ${role}: a duplicate was not refused`);
      }
      const out = tryMk(d, sv0, { overrides: { [role]: { 0: '__not_in_pool__' } } });
      if (out && out.html !== base.html) fail(`${t.id} ${role}: a key outside the pool was not refused`);
    }
    console.log(`${fails ? '' : 'ok   '}${m} ${t.id}: catalogue ${isNew ? 'new template' : same + '/' + n + ' identical'}; slots ${roles.join(',') || '-'}`);
  }
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(fails ? `slots gate: ${fails} failing` : 'slots gate: all pass');
if (fails) process.exitCode = 1;
