#!/usr/bin/env node
/**
 * Gate: answer keys (runtime.js KEY_CSS + the templates' key examples, 2026-10-31).
 *
 * For every template of every built maker, 3 levels × 2 copies × en + fi (the long-word language):
 *   - a template either has a key, or is in NO_KEY below with the reason (a new template without a key fails until it
 *     gets one or a reason — no maker ships a page whose answers nobody can check)
 *   - the key shows EVERY answer the page carries: an empty write-in box / answer cell shows its answer (its ::after
 *     content), a right choice is ringed, a ring / badge mark is drawn; at least one mark per page
 *   - the key passes the page's layout checks (overflow, footer band, broken images) — a written-in answer must fit
 *   - the key shows the same content as the page (runtime.js throws otherwise) — built here, so that holds too
 * Poisoned on every run: a key layer without the ring rule must fail.
 *
 *   node scripts/makers/gates/answer-keys.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const runtime = require('../runtime.js');
const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.js'));
const { runLints } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'qa', 'lints.js'));

/** templates with no answer key, and why (a key would mark nothing that is right or wrong) */
const NO_KEY = {
  'K-012': 'one-to-one: any pairing is right',
  'K-239': 'tracing and writing the word',
  'K-388': 'the word of the day: trace and write',
  'K-389': 'fill-in sentences — the key needs the word seated on the writing line (lib/key-on-row.js): OPEN',
  'K-390': 'sentence steps — the key needs text seated on writing lines: OPEN',
  'K-391': 'tracing sentences',
  'K-433': 'read, trace, write',
  'K-434': 'tracing',
  'K-435': 'draw what the sentence says (open)',
  'K-439': 'rainbow writing',
  'K-440': 'a reading game',
  'K-441': 'flash cards',
  'K-453': 'flash cards to cut',
  'K-455': 'desk number lines to cut out (material)',
  'G1-441': 'fact triangle cards to cut out (material)',
  'G1-452': 'doubles memory cards to cut out (material)',
  'G2-402': 'place-value chart and digit cards to cut out (material)',
  'G2-406': 'fraction strips to cut out (material)',
  'G3-411': 'times table keyring cards to cut out (material)',
  'G1-473': 'classroom store price tags and play money to cut out (material)',
  'K-462': 'a clock face and two hands to cut out and fasten (material)',
  'G2-475': 'four rulers to cut out at their real size (material)',
  'G1-481': 'the class survey graph: the data come from the class, there is no right answer (material)',
  'G2-478': 'a net to cut out, fold and glue into a die, a box or a pyramid (material)',
  'K-372': 'draw the named shapes on dot paper: any triangle, square or rectangle drawn on the dots is right (drawing)',
  'K-468': 'trace the number words: the word to trace is printed on the page (handwriting)',
  // number tracing (2026-11-02): every number to trace or write is printed on its own row — the page is its own key
  'K-237': 'number tracing: each row prints the number it traces', 'K-249': 'number tracing 0-4: the numbers are printed on the page',
  'K-250': 'number tracing 5-9: the numbers are printed on the page', 'K-251': 'trace and write: each row prints the number the child writes',
  'K-252': 'number tracing 1-10: the numbers are printed on the page', 'K-253': 'teen numbers: the numbers are printed on the page',
  'K-466': 'make your own pattern: an empty train and pictures to cut out — the child invents the pattern (material)',
  // Coloring Pages (2026-11-02): colouring is open — any colours are right; K-477's word is printed to trace; K-479's key
  // may be the teacher's own ("your favourite colour"), so no page of it can be marked
  // How to Draw (2026-11-02): the child's own drawing — nothing to mark (Order the Steps G1-418 has its key: the order)
  'K-396': 'a drawing page: the child draws the picture', 'K-401': 'a drawing page: the child draws the picture', 'K-402': 'a drawing page: trace, then draw', 'K-403': 'a drawing page: the child finishes the picture',
  'K-404': 'a drawing page: draw, then copy the printed word', 'G1-416': 'a drawing page: draw with the grid', 'G1-417': 'a drawing page: draw the picture into the scene', 'G1-419': 'a drawing page: copy each step',
  'G2-390': 'a drawing page: draw, then write freely about it', 'G2-391': 'a drawing page: draw from memory',
  // Picture Tracing (2026-11-02): tracing pages — nothing to mark (Trace and Count K-427, the shape picture K-430 and the
  // hidden animals G1-433 have their keys: the count, the circles, the five animals)
  'K-418': 'a tracing page: trace the dashed lines', 'K-419': 'a tracing page: trace the dashed lines', 'K-420': 'a tracing page: look, then trace',
  'K-421': 'a tracing page: trace the round lines', 'K-422': 'a tracing page: trace the straight lines', 'K-423': 'a tracing page: trace the zigzags',
  'K-424': 'a tracing page: trace the curls and spirals', 'K-425': 'trace and colour: any colours are right', 'K-426': 'a tracing page: start at the dot and trace',
  'K-428': 'a tracing page: the missing parts are dashed to trace', 'K-429': 'a tracing page: trace the dashed lines', 'K-431': 'a tracing page: trace the dashed lines',
  'K-432': 'a tracing page: trace big, middle, small', 'G1-429': 'a tracing page: trace the dotted lines', 'G1-430': 'a tracing page: the word to trace is printed under the picture',
  'G1-431': 'trace, then draw freely in the empty space', 'G1-432': 'a tracing page: the other half is dashed to trace',
  // Pencil Control Lines (2026-11-02): cutting and stroke tracing — nothing to mark (K-482 draws its key: the copied line)
  'K-481': 'cutting practice: the child cuts along the lines', 'K-483': 'a tracing page: trace the letter strokes',
  'K-236': 'stroke tracing: the child traces the dashed paths', 'K-244': 'stroke tracing: the child traces the dashed lines',
  'K-245': 'stroke tracing: the child traces the dashed lines', 'K-246': 'stroke tracing: the child traces the dashed lines',
  'K-247': 'stroke tracing: the child traces the dashed paths', 'K-248': 'stroke tracing: the child traces the dashed paths',
  'K-385': 'stroke tracing: the child traces the dashed lines', 'K-386': 'stroke tracing: the child traces the dashed shapes',
  'K-387': 'a line from each picture to the next along the dashed path: the path is printed',
  'K-493': 'directed drawing: the step cards are the model',
  'K-514': 'an open key: the teacher or the child chooses the colours, nothing to mark',
  'K-498': 'a tracing page: trace the picture', 'K-499': 'trace the picture and its word, then write the word',
  'K-500': 'a tracing booklet: trace, cut and staple',
  'K-476': 'a coloring page: any colours are right', 'K-477': 'color and trace: the word to trace is printed on the page',
  'K-478': 'a scene to color: any colours are right', 'K-479': 'color by the key: an open key the teacher may write herself',
  'K-515': 'a coloring page by size: the key names the colours, any shade is right', 'G1-488': 'color, then write freely about the picture',
  'K-516': 'a coloring booklet: color every page',
  'K-519': 'an open board: the child invents the figure',
  'K-527': 'a tracing page: trace and copy the sentence', 'G1-491': 'a word book page: the child writes an own sentence',
  'K-523': 'a tracing page: trace and write the name', 'K-524': 'a tracing page: trace the letter of each first sound',
  'K-525': 'a tracing page: trace the capital and small letter', 'K-526': 'letter formation cards: nothing to mark',
  'K-517': 'a tracing page: trace and write the numbers', 'K-518': 'a number formation poster: nothing to mark',
  'G2-377': 'a cursive copybook page: trace and write the letters', 'G2-384': 'a cursive copybook page: trace and write the capitals and names',
  'G2-385': 'a cursive copybook page: trace and write the joins', 'G2-386': 'a cursive copybook page: trace and write the words',
  'G3-401': 'a cursive copybook page: trace and copy the sentences', 'G2-480': 'a cursive copybook page: trace and write the own words',
  'G2-481': 'a cursive copybook page: trace and write the letter', 'G2-483': 'a cursive alphabet poster / desk strip: nothing to mark',
  'K-531': 'an alphabet chart: nothing to mark', 'K-534': 'alphabet cards to cut and order: the answer is the alphabet itself',
  // Letter Tracing / Word Tracing & Writing (2026-11-02): tracing pages — the model is on the page, nothing to mark
  ...Object.fromEntries(['K-238', 'K-254', 'K-255', 'K-256', 'K-257', 'K-258', 'K-278', 'K-279', 'K-280', 'K-281', 'K-282', 'K-283'].map((id) => [id, 'a letter tracing page: trace and write the letters'])),
  ...Object.fromEntries(['K-284', 'K-289', 'K-290', 'K-291', 'K-310', 'K-311', 'K-315'].map((id) => [id, 'a word tracing page: trace and write the words'])),
  'K-353': 'a materials and model page: cut out the pieces and copy the two figures, their seams already drawn',
  // B7 (2026-11-03): open pages and classroom games — the child's own data, own feelings or own invention, or a game
  // whose every card is right
  'G1-525': 'the class birthday graph: the data come from the class',
  'G1-530': 'draw your own map: an open drawing with its own key', 'G2-493': 'coordinate battleship: a game, each player hides own ships',
  'K-564': 'my feelings this week: the child\'s own feelings', 'K-565': 'the feelings thermometer: the child\'s own feeling and what helps',
  'G1-531': 'my friend and me: two children\'s own answers', 'K-566': 'feelings cards to cut out (material)',
  'G1-542': 'make your own secret code: the child invents the code',
  ...Object.fromEntries(['K-569', 'K-570', 'K-571', 'K-572', 'K-573', 'G1-543', 'G1-544'].map((id) => [id, 'bingo cards: every card is right, the caller decides what is marked'])),
  ...Object.fromEntries(['K-574', 'K-575', 'K-576', 'K-577', 'K-578', 'G1-545', 'G1-546'].map((id) => [id, 'bingo caller cards to cut out (material)'])),
  // the open writing / drawing / material pages of the B5-B7 makers (2026-11-03): nothing the sheet can mark
  'K-554': 'my reading log: the child writes about her own book', 'K-555': 'write about the picture: the child\'s own sentences',
  'G1-503': 'stretch the sentence: the child\'s own longer sentence', 'G1-506': 'story map: the child plans her own story',
  'G1-507': 'comic strip: the child writes what the characters say', 'G1-508': 'roll a story: the dice choose, the child writes her own story',
  'G1-509': 'describe the character: the sentences are finished in the child\'s own words', 'G1-510': 'write a postcard: the child\'s own message',
  'G1-513': 'write a story for the number sentence: the child\'s own story', 'G1-519': 'look, cover, write, check: the word is printed on the page and the child checks herself',
  'G1-342': 'read and draw: the child draws what each sentence says (drawing)',
  'K-543': 'word wall labels to cut out (material)', 'K-544': 'a picture dictionary to read (material)', 'K-557': 'number word cards to cut out (material)',
  'G1-521': 'ordinal number cards to cut out and match: the parts fit one way (material)', 'G1-496': 'syllable puzzles to cut out: the pieces fit one way (material)',
  'G1-346': 'open: the child writes two rhymes of their own for each word — any real word that rhymes is right',
  'G2-357': 'open: the child finishes questions of their own about the picture (Level Set 2026-09-29: printable only, no single answer)',
  'K-541': 'clap and count: an open clapping sheet — the page makes no syllable claim (a count is a safety-gated claim; the teacher\'s own words)',
  'K-323': 'all about me: the child\'s own name, age and family', 'K-332': 'draw the feeling face: any face that shows the feeling (drawing)',
  'G2-278': 'write about the picture: the child\'s own sentences', 'G2-299': 'write about the picture with starters: the child\'s own sentences',
  'G2-300': 'write about the picture: the child\'s own story', 'G2-318': 'animal fact file: the child finds the facts and writes them in her own words',
  'G2-341': 'finish the sentences with facts from the printed file and add one of her own (writing)', 'G2-378': 'retell the story: the child\'s own sentences',
  // final phase round 2 (2026-11-03): each page read — the child's own feelings, favourites, family and name, or cards to cut
  'K-335': 'how do I feel today: the child circles her own feeling and draws her own face',
  'K-342': 'my favorite things: the child circles her own favourite and copies its printed word',
  'K-343': 'all about my family: the child draws and counts her own family',
  'K-345': 'I can: the child ticks what she can do and writes what she wants to learn',
  'K-346': 'my name: the child writes and counts her own name and a friend\'s',
  'K-375': 'family words: the word is printed to trace and copy on the line beside its number',
  'G1-387': 'family tree template: the child draws and names her own people',
  ...Object.fromEntries(['K-324', 'K-347', 'K-348', 'K-349', 'K-350', 'G1-324'].map((id) => [id, 'picture and word cards to cut out: each card carries its own word (material)'])),
};

(async () => {
  const versions = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', 'versions.json'), 'utf8'));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-keys-'));
  const browser = await puppeteer.launch({ args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 703, height: 945 });
  let fails = 0, keys = 0;
  const fail = (s) => { fails++; if (fails <= 25) console.log('FAIL ' + s); };

  /** what a mounted key shows: answers missing from it */
  const audit = () => page.evaluate(() => {
    const miss = [];
    let marks = 0;
    for (const el of document.querySelectorAll('[data-lcs-answer]')) {
      const want = el.getAttribute('data-lcs-answer');
      if (!want) continue;
      if (el.children.length || el.textContent.trim()) { marks++; continue; }   // drawn / written by the template
      const shown = getComputedStyle(el, '::after').content.replace(/^"|"$/g, '');
      if (shown !== want) miss.push(`answer "${want}" not shown (${shown})`); else marks++;
    }
    for (const el of document.querySelectorAll('[data-lcs-correct]')) {
      if (getComputedStyle(el).boxShadow === 'none') miss.push('a right choice is not ringed'); else marks++;
    }
    for (const el of document.querySelectorAll('[data-lcs-key-ring]')) {
      if (parseFloat(getComputedStyle(el).outlineWidth) < 3) miss.push('a ring mark is not drawn'); else marks++;
    }
    for (const el of document.querySelectorAll('[data-lcs-key-badge]')) {
      const c = getComputedStyle(el, '::after').content.replace(/^"|"$/g, '');
      if (c !== el.getAttribute('data-lcs-key-badge')) miss.push('a badge is not drawn'); else marks++;
    }
    // an answer seated on a writing row (lib/key-on-row.js — an SVG <text>, G1-336 Pair Up the Opposites): its words drawn
    for (const el of document.querySelectorAll('[data-lcs-keytext]')) {
      const b = el.getBBox ? el.getBBox() : el.getBoundingClientRect();
      if (!el.textContent.trim() || !(b.width > 0)) miss.push('a written answer is not drawn'); else marks++;
    }
    // a chip the key rings itself (letterChips: a 3 px border where the others have 2; division pills: a 4 px outline)
    for (const el of document.querySelectorAll('[data-lcs-keyring]')) {
      const cs = getComputedStyle(el);
      if (Math.max(parseFloat(cs.outlineWidth) || 0, parseFloat(cs.borderTopWidth) || 0) < 3) miss.push('a ringed chip is not drawn'); else marks++;
    }
    marks += document.querySelectorAll('[data-lcs-key-sample]').length;
    return { miss, marks };
  });
  const mount = async (html) => {
    const f = path.join(tmp, 'k.html');
    fs.writeFileSync(f, html);
    await page.goto('file:///' + f.split(path.sep).join('/'), { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; });
  };

  for (const [maker, v] of Object.entries(versions)) {
    const tj = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', maker, v.current, 'templates.json'), 'utf8'));
    for (const t of tj.templates) {
      if (t.interactive) continue;   // an interactive template draws its own key (the catalogue's)
      if (!t.hasKey) { if (!NO_KEY[t.id]) fail(`${maker} ${t.id}: no answer key and no reason in NO_KEY`); continue; }
      if (NO_KEY[t.id]) fail(`${maker} ${t.id}: listed in NO_KEY but has a key — take it off the list`);
      const type = require(path.join(REPO, t.file));
      for (const loc of ['en', 'fi'].filter((l) => t.locales.includes(l))) for (const d of t.keyLevels.filter((x) => !t.localeLevels || !t.localeLevels[loc] || t.localeLevels[loc].includes(x))) for (const variant of [1, 2]) {
        const s = withLevelInstruction(resolveStrings(t.id, loc, type), t.id, d, loc);
        const theme = t.themed ? ((t.localeThemes && t.localeThemes[loc]) || t.themes)[(variant - 1) % ((t.localeThemes && t.localeThemes[loc]) || t.themes).length] : null;
        const lu = ((t.units && t.units[loc]) || []).filter((u) => (!t.unitLevels || t.unitLevels[u.id] === d) && (!t.localeUnitLevels || !t.localeUnitLevels[loc] || (t.localeUnitLevels[loc][u.id] || []).includes(d)));   // the level's units
        const unit = lu.length ? lu[variant % lu.length].id : null;
        // the page the browser gives the teacher: runtime.generate, with its fresh-seed retries (a first seed that misses
        // is retried there too); a page no retry builds is a FAIL
        const g = await runtime.generate({ type, strings: s, locale: loc, difficulty: d, theme, unit, variant, answerKey: true, answerKeySuffix: tj.answerKey[loc] }, async (html) => { await mount(html); return page; });
        if (!g.ok) { fail(`${t.id} ${loc} L${d} v${variant}: ${(g.fails || []).slice(0, 2).join(' | ')}`); continue; }
        const r = g;
        if (!r.keyHtml) { fail(`${t.id} ${loc} L${d} v${variant}: no key page (this level has a key)`); continue; }
        keys++;
        await mount(r.keyHtml);
        const a = await audit();
        if (a.miss.length) fail(`${t.id} ${loc} L${d} v${variant}: ${a.miss.slice(0, 3).join('; ')}`);
        if (!a.marks) fail(`${t.id} ${loc} L${d} v${variant}: the key marks nothing`);
        const lint = (await runLints(page, { gradeBand: type.gradeBand })).filter((x) => /overflow|footer|broken image|font too small/.test(x));
        if (lint.length) fail(`${t.id} ${loc} L${d} v${variant}: ${lint.slice(0, 2).join(' | ')}`);
      }
    }
  }
  // poison: a key without the ring rule must be caught
  const sample = runtime.makePage({ type: require(path.join(REPO, 'scripts/worksheet-gen/types/k/K-002-count-and-circle.js')), strings: resolveStrings('K-002', 'en', {}), locale: 'en', difficulty: 2, theme: 'animals', variant: 1, answerKey: true });
  await mount(sample.keyHtml.replace(".lcs-keypage [data-lcs-correct]{box-shadow:0 0 0 4px #F2784B;border-radius:999px}", ''));
  const p = await audit();
  if (!p.miss.length) fail('poison: a key without the ring rule was not caught');
  // poison: a key whose answers seated on the writing rows are blank must be caught (and the real one counted)
  const t336 = require(path.join(REPO, 'scripts/worksheet-gen/types/g1/G1-336-opposites-pair-up.js'));
  const k336 = runtime.makePage({ type: t336, strings: withLevelInstruction(resolveStrings('G1-336', 'en', t336), 'G1-336', 2, 'en'), locale: 'en', difficulty: 2, theme: null, variant: 1, answerKey: true }).keyHtml;
  await mount(k336);
  const p0 = await audit();
  if (p0.miss.length || !p0.marks) fail(`poison control: the G1-336 key reads ${p0.marks} marks, ${p0.miss.length} missing`);
  const blanked = k336.replace(/(<text\b[^>]*\bdata-lcs-keytext="1"[^>]*>)[^<]*(<\/text>)/g, '$1$2');
  if (blanked === k336) fail('poison: the G1-336 key has no seated answer to blank');
  await mount(blanked);
  const p1 = await audit();
  if (!p1.miss.length) fail('poison: a key whose written answers are blank was not caught');
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(fails ? `answer keys: ${keys} key pages, ${fails} failing` : `answer keys: ${keys} key pages, all pass (no key by design: ${Object.keys(NO_KEY).length} templates)`);
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('answer keys: error — ' + e.message); process.exit(1); });
