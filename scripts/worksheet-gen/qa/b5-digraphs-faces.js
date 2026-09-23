/**
 * b5-digraphs-faces.js — the G1-380 `digraphs` FACE gate (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/G1-380-digraphs.md §3 + §5; record _work/G1-380-faces.md).
 * Called by qa/verify-b5-digraphs.js after the base gate (one browser, one assertion counter,
 * one poison log): `faceGate({ page, ok, judge, validateBank, log, QUICK, OUT })`.
 *
 *   F1 K-378 sort-two · F2 G1-392 gap · F3 G1-393 match · F4 G1-394 position · F5 G2-372 text
 *
 * A. STRINGS — every face's i18n.en === the bank's strings[mode]; the face's band (F1 K, F2-F4
 *    G1, F5 G2); i18n/strings.en.json carries each face id with the same title.
 * B. REFUSALS — every face THROWS for es it sv da no (whole family) and for an unauthored
 *    locale; pt THROWS for F4 (FACE_REFUSALS) even with a bank block in hand (PR8); an unknown
 *    mode THROWS.
 * C. NODE SWEEP — 400 seeds per face through the SPEC (_buildWith, the en bank): every page free
 *    of its per-page tells (the spec's own helpers re-run on meta) + POOLED: no answer position
 *    fixed across seeds (share <= 0.6), and >= 95 % distinct pages.
 * D. RENDER — each face through the REAL pipeline (render-instance, file:// fonts) at its en
 *    chrome, a one-line chrome (the 814 body), the de 722 fixture and the fi 677 fixture:
 *    verify() empty (it measures SPARSE, FILL, the floors, the per-face answers), qa/lints.js
 *    clean, the body height per fixture; then 20 (--quick 5) seeds per face render distinct and clean.
 * E. POISON — each must FAIL for its OWN reason (the shipped face is the control):
 *    PR1 an F2 gap bead wider than the page's others · PR2 de F2 Schaf gapped at its capital ·
 *    PR3 a wire stub inside an F2 word · PR6g F1 split 6/0 at the config (spec guard) + PR6r a
 *    rendered 6/0 page · PR7 an F3 word opposite its own picture · PR8 pt F4 · PR9 an F5 lane at
 *    3 lines · PR10 an answerBox in place of blankNumeralBox · SP1-SP5 a blank band > 40 between
 *    blocks (one per face) · FH1-FH5 the content ending high at 814 · FP1-FP5 the content past
 *    the body at 677 · AT1-AT6 the per-page answer tells · AP1-AP5 an instruction naming apparatus
 *    the face does not print · PD1-PD3 the face data rules (a false pair in F5 text, an F5
 *    sentence too long for two lines, an unflagged F2 frame clash).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng } = require('../lib/rng.js');
const tokens = require('../primitives/_tokens.js');
const bankMod = require('../data/b5/digraphs.js');
const BASE = require('../types/g1/G1-380-digraphs.js');

const EN = bankMod.DIGRAPHS.en;
/** the rejected pictures' vocab keys (N.REJECTED_PICS_ALL, review 2026-09-23: the chick reads "duck", the lunchbox reads "treasure") */
const BANNED_KEYS = ['chick', 'lunchbox'];
const N = bankMod.DIGRAPHS_NEUTRAL;
const H = BASE._helpers;
const TYPES = path.join(__dirname, '..', 'types');
const FACES = [
  { id: 'K-378', mode: 'sort-two', band: 'K', file: 'k/K-378-digraphs-sort-by-letter-team.js' },
  { id: 'G1-392', mode: 'gap', band: 'G1', file: 'g1/G1-392-digraphs-write-the-missing-letter-team.js' },
  { id: 'G1-393', mode: 'match', band: 'G1', file: 'g1/G1-393-digraphs-read-and-match.js' },
  { id: 'G1-394', mode: 'position', band: 'G1', file: 'g1/G1-394-digraphs-where-is-the-letter-team.js' },
  { id: 'G2-372', mode: 'text', band: 'G2', file: 'g2/G2-372-digraphs-in-sentences.js' },
];
const CHROME = {
  one: { title: 'Digraphs', instruction: 'Circle.', body: 830 },
  de722: { title: 'Wörter mit sch, ch und au: Welche Buchstabengruppe hörst du in jedem einzelnen Bild auf dieser Seite?', instruction: 'Sprich den Namen von jedem Bild langsam und deutlich aus. Kreise danach auf derselben Reihe genau die eine Buchstabengruppe ein, die du in dem gesprochenen Wort hörst, und prüfe am Ende jede Reihe noch einmal.', body: 722 },
  fi677: { title: 'Pitkä vokaali aa, uu ja ää: mikä pitkä vokaali kuuluu kuvan sanassa, kun sanot sen ääneen hitaasti ja tarkasti omalla äänelläsi?', instruction: 'Sano jokaisen kuvan nimi ääneen hitaasti ja selvästi. Ympyröi samalta riviltä se pitkä vokaali, jonka kuulet sanassa.', body: 677 },
};

/** A synthetic de block carrying ONLY what PR2 needs: sch items that all start with a capital (Schaf, Schiff, Schuh, Schnecke). */
function deBlock() {
  const I = (theme, noun, word, seg, snd) => ({ vocabKey: noun, theme, noun, word, seg, snd, silent: [], stem: word, picOpened: true });
  return {
    head: 'x', refused: null, phonemes: ['ʃ', 'ç', 'x', 'aʊ', 'a', 'ɪ', 'f', 'uː', 'n', 'ɛ', 'k', 'ə', 'b', 'm', 'l', 'h', 's'],
    teams: {
      sch: { t: 'sch', sound: ['ʃ'], items: [I('animals', 'sheep', 'Schaf', ['Sch', 'a', 'f'], ['ʃ', 'a', 'f']), I('vehicles', 'ship', 'Schiff', ['Sch', 'i', 'ff'], ['ʃ', 'ɪ', 'f']),
        I('clothing', 'shoe', 'Schuh', ['Sch', 'uh'], ['ʃ', 'uː']), I('forest creatures', 'snail', 'Schnecke', ['Sch', 'n', 'e', 'ck', 'e'], ['ʃ', 'n', 'ɛ', 'k', 'ə'])] },
      ch: { t: 'ch', sound: ['ç', 'x'], items: [I('classroom', 'book', 'Buch', ['B', 'u', 'ch'], ['b', 'uː', 'x']), I('4th of July', 'cake', 'Kuchen', ['K', 'u', 'ch', 'e', 'n'], ['k', 'uː', 'x', 'ə', 'n']),
        I('At the Supermarket', 'milk', 'Milch', ['M', 'i', 'l', 'ch'], ['m', 'ɪ', 'l', 'ç'])] },
      au: { t: 'au', sound: ['aʊ'], items: [I('miscellaneous', 'house', 'Haus', ['H', 'au', 's'], ['h', 'aʊ', 's']), I('forest creatures', 'mouse', 'Maus', ['M', 'au', 's'], ['m', 'aʊ', 's']),
        I('christmas', 'tree', 'Baum', ['B', 'au', 'm'], ['b', 'aʊ', 'm'])] },
    },
    samesound: [], falsePairs: [], sets: { exemplar: ['sch', 'ch', 'au'], k: ['sch', 'au'], position: ['sch', 'ch', 'au'] }, sentences: [], rejectedPics: [], strings: {},
  };
}

async function faceGate({ page, ok, judge, validateBank, log, QUICK, OUT }) {
  const types = {};
  for (const f of FACES) types[f.mode] = require(path.join(TYPES, f.file));
  const fold = (s) => String(s).normalize('NFC').toLowerCase();

  /* ---------------------------------------------------------------- A. strings */
  let i18n = {};
  try { i18n = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', 'strings.en.json'), 'utf8')); } catch (e) { ok(false, 'i18n/strings.en.json unreadable'); }
  for (const f of FACES) {
    const t = types[f.mode];
    ok(t.id === f.id, `${f.id}: the spec id is ${t.id}`);
    ok(t.difficulty[2].mode === f.mode, `${f.id}: d2 mode ${t.difficulty[2].mode} ≠ ${f.mode}`);
    ok(t.i18n.en.title === EN.strings[f.mode].title && t.i18n.en.instruction === EN.strings[f.mode].instruction, `${f.id}: i18n.en ≠ the bank's strings.${f.mode}`);
    ok(t.gradeBand === f.band, `${f.id}: gradeBand ${t.gradeBand} ≠ ${f.band}`);
    const s = i18n[f.id] || (i18n.types && i18n.types[f.id]);
    ok(s && s.title === t.i18n.en.title, `${f.id}: i18n/strings.en.json does not carry the face title (run node i18n/build-en.js)`);
  }

  /* ---------------------------------------------------------------- B. refusals */
  for (const f of FACES) {
    const t = types[f.mode];
    for (const loc of N.REFUSED_LOCALES) { let m = null; try { t.build({ difficulty: 2, locale: loc }, { rng: makeRng('r') }); } catch (e) { m = e.message; } ok(m && /REFUSED whole-family/.test(m), `${f.id} ${loc} must REFUSE (got ${m})`); }
    {
      const U = require('./b5-unauthored.js');
      const p = U.refusalProbe('digraphs', 'nl', () => t.build({ difficulty: 2, locale: 'nl' }, { rng: makeRng('r') }));
      ok(U.refused(p.hidden, /no nl block/), `${f.id}: an unauthored nl must REFUSE (got ${p.hidden})`);
      ok(!U.refused(p.real, /no nl block/), `${f.id}: poison — the authored nl page passed the unauthored-refusal check (got ${p.real})`);
    }
  }
  { let m = null; try { types.position.build({ difficulty: 2, locale: 'pt' }, { rng: makeRng('r') }); } catch (e) { m = e.message; } ok(m && /pt REFUSES the position face/.test(m), `pt F4 must REFUSE before any bank is read (got ${m})`); }
  { let m = null; try { BASE._buildWith({ ...EN }, types.position.difficulty[2], { locale: 'pt' }, { rng: makeRng('r') }); } catch (e) { m = e.message; } judge('PR8 pt F4 rendered (a pt bank in hand)', m ? [m] : [], /pt REFUSES the position face/); }
  // pt is AUTHORED (2026-09-23): only its F4 is refused, by the refusal map (above, real dir). Every other pt face
  // must BUILD from the pt bank; with the pt block hidden it must refuse for the absent block, never for the F4 map.
  {
    const U = require('./b5-unauthored.js');
    for (const f of FACES.filter((x) => x.mode !== 'position')) {
      const p = U.refusalProbe('digraphs', 'pt', () => types[f.mode].build({ difficulty: 2, locale: 'pt' }, { rng: makeRng('r') }));
      ok(p.real === null, `${f.id}: the authored pt bank must build this face (got ${p.real})`);
      ok(U.refused(p.hidden, /no pt block/) && !/REFUSES the/.test(p.hidden), `${f.id}: a pt with no block must refuse for its bank, not the F4 map (got ${p.hidden})`);
    }
    // the other direction: the pt F4 map refusal is not an absent-bank refusal, and it still fires with the block hidden
    const pos = U.refusalProbe('digraphs', 'pt', () => types.position.build({ difficulty: 2, locale: 'pt' }, { rng: makeRng('r') }));
    ok(U.refused(pos.real, /pt REFUSES the position face/) && !U.refused(pos.real, /no pt block/), `pt F4 must refuse from the refusal map with the real dir (got ${pos.real})`);
  }

  /* ---------------------------------------------------------------- C. node sweep */
  const SEEDS = 400;
  for (const f of FACES) {
    const d = types[f.mode].difficulty[2];
    const pages = new Set(), pos = [];
    let tells = 0, banned = 0;
    for (let s = 1; s <= SEEDS; s++) {
      const r = BASE._buildWith(EN, d, { locale: 'en' }, { rng: makeRng(`G1-380-face-${f.mode}-${s}`) });
      const m = r.meta;
      pages.add(JSON.stringify(m.items) + JSON.stringify(m.rowR || m.bins || m.cols || m.pos || m.counts));
      let seq = null, tell = null;
      if (f.mode === 'sort-two') { seq = m.bins; tell = H.seqTell(seq, d.maxRun, { alternation: true }) || (seq.filter((b) => b === 0).length !== d.split[0] ? 'split' : null); }
      if (f.mode === 'gap') { seq = m.cols; tell = H.orderTell(seq, 3, d.maxRun); }
      if (f.mode === 'match') { seq = m.rowR.map((r, i) => (((r - i) % 6) + 6) % 6); tell = H.matchTell(m.rowR); }
      if (f.mode === 'position') { seq = m.pos; tell = H.seqTell(seq, d.maxRun, { periods: [2, 3] }) || ([0, 1].some((c) => new Set(seq.filter((_, i) => i % 2 === c)).size < 2) ? 'column' : null); }
      if (f.mode === 'text') { seq = m.counts; const tot = seq.reduce((a, b) => a + b, 0); tell = H.countTell(seq) || (tot < d.total[0] || tot > d.total[1] ? 'total' : null); }
      if (tell) tells++;
      if ((m.items || []).some((k) => BANNED_KEYS.includes(k))) banned++;
      seq.forEach((v, i) => { pos[i] = pos[i] || {}; pos[i][v] = (pos[i][v] || 0) + 1; });
    }
    const share = Math.max(...pos.map((p) => Math.max(...Object.values(p)) / SEEDS));
    ok(tells === 0, `${f.id} node sweep: ${tells} pages with a tell`);
    if (f.mode !== 'text') ok(banned === 0, `${f.id} node sweep: ${banned} pages draw a face-rejected picture (chick / lunchbox)`);
    ok(share <= 0.6, `${f.id} node sweep: one answer position fixed in ${(share * 100).toFixed(0)}% of pages (> 60%)`);
    ok(pages.size >= SEEDS * 0.95, `${f.id} node sweep: only ${pages.size} distinct pages of ${SEEDS}`);
    console.log(`face ${f.id} ${f.mode} node sweep ${SEEDS}: tells ${tells}, max per-position answer share ${(share * 100).toFixed(0)}%, distinct ${pages.size}`);
  }

  /* ---------------------------------------------------------------- D. renders */
  const render = async (type, { baseName, strings, seedEpoch, locale = 'en' }) => {
    const out = await renderInstance({ type, theme: null, difficulty: 2, locale, page, outDir: OUT, baseName, strings, seedEpoch });
    const body = await page.evaluate(() => { const b = document.querySelector('.ws-body').getBoundingClientRect(); return b.height; });
    return { verify: out.qa.verify, lints: out.qa.lints, body, png: out.png };
  };
  for (const f of FACES) {
    const t = types[f.mode];
    for (const [k, strings] of [['en', undefined], ['one', CHROME.one], ['de722', CHROME.de722], ['fi677', CHROME.fi677]]) {
      const r = await render(t, { baseName: `G1-380-gate-${f.id}-${k}`, strings: strings && { title: strings.title, instruction: strings.instruction } });
      ok(!r.verify.length, `${f.id} ${k}: verify ${JSON.stringify(r.verify.slice(0, 4))}`);
      ok(!r.lints.length, `${f.id} ${k}: lints ${JSON.stringify(r.lints.slice(0, 3))}`);
      if (strings) ok(k === 'one' ? r.body >= 800 : r.body <= strings.body + 0.6, `${f.id} ${k}: body ${r.body.toFixed(0)} px — the fixture is not the ${k} chrome`);
      console.log(`face ${f.id} render ${k}: body ${r.body.toFixed(0)} verify ${r.verify.length} lints ${r.lints.length}`);
    }
    const seen = new Set();
    for (let s = 1; s <= (QUICK ? 5 : 20); s++) {
      const r = await render(t, { baseName: `G1-380-gate-${f.id}-sweep-${s}`, seedEpoch: s });
      ok(!r.verify.length && !r.lints.length, `${f.id} sweep ${s}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${r.lints.length}`);
      seen.add(await page.evaluate(() => document.querySelector('[data-ws-content]').innerHTML.length + ':' + [...document.querySelectorAll('[data-lcs-pic], [data-lcs-sentence]')].map((e) => e.getAttribute('data-lcs-pic') || e.getAttribute('data-lcs-sentence')).join(',')));
    }
    ok(seen.size === (QUICK ? 5 : 20), `${f.id} sweep: ${seen.size} distinct pages`);
  }

  /* ---------------------------------------------------------------- E. poisons */
  const run = async (name, type, re, opts = {}) => {
    let f;
    try { const r = await render(type, { baseName: 'G1-380-gate-fpoison-' + name.split(' ')[0], strings: opts.strings, locale: opts.locale }); f = [...r.verify, ...r.lints.map((l) => JSON.stringify(l))]; } catch (e) { f = ['THREW ' + e.message]; }
    judge(name, f, re);
  };
  const doctored = (mode, fn) => ({ ...types[mode], build(o, ctx) { const r = types[mode].build(o, ctx); r.bodyHtml = fn(r.bodyHtml); return r; } });
  const withCfg = (mode, extra, B = EN, loc = 'en') => ({ ...types[mode], build(o, ctx) { return BASE._buildWith(B, { ...types[mode].difficulty[2], ...extra }, { locale: loc }, ctx); } });
  const must = (h, re, what) => { if (!re.test(h)) throw new Error(`poison anchor missing: ${what}`); return h; };
  const ONE = { title: CHROME.one.title, instruction: CHROME.one.instruction };
  const FI = { title: CHROME.fi677.title, instruction: CHROME.fi677.instruction };

  await run('PR1 F2 gap bead wider than the others', doctored('gap', (h) => must(h, /(data-lcs-gapbead[^>]*><svg[^>]*?width=")96(")/, 'gap bead').replace(/(data-lcs-gapbead[^>]*><svg[^>]*?width=")96(")/, '$1116$2')), /identical w\/h|≠ the page bead/);
  await run('PR2 de F2 Schaf gapped at its capital', withCfg('gap', { gapInitialCapital: true }, deBlock(), 'de'), /capital rule/, { locale: 'de', strings: { title: 'Buchstabengruppen', instruction: 'Schreib die Buchstabengruppe.' } });
  { // the control: the same de block with the capital rule ON refuses (sch has no lower-case item) rather than gapping a capital
    let m = null; try { BASE._buildWith(deBlock(), types.gap.difficulty[2], { locale: 'de' }, { rng: makeRng('c') }); } catch (e) { m = e.message; }
    ok(m && /"sch" has 0 gap-eligible items/.test(m), `PR2 control: the capital rule must leave de sch without a gap item (got ${m})`);
  }
  const stub = `<line x1="0" y1="25" x2="8" y2="25" stroke="${tokens.color.grid}" stroke-width="2" data-lcs-stub="L"></line>`;
  await run('PR3 a wire stub inside an F2 word', doctored('gap', (h) => must(h, /(data-lcs-gapbead[^>]*><svg[^>]*>)/, 'gap bead').replace(/(data-lcs-gapbead[^>]*><svg[^>]*>)/, '$1' + stub)), /wire stub/);
  { let m = null; try { BASE._buildWith(EN, { ...types['sort-two'].difficulty[2], split: [6, 0] }, { locale: 'en' }, { rng: makeRng('r') }); } catch (e) { m = e.message; } judge('PR6g F1 split 6/0 (config)', m ? [m] : [], /a house with < 2 pictures/); }
  await run('PR6r F1 a rendered 6/0 page', doctored('sort-two', (h) => h.replace(/data-lcs-seg="([^"]*)" data-lcs-snd="([^"]*)" data-lcs-bin-of="1"/g, 'data-lcs-seg="sh|i|p" data-lcs-snd="ʃ|ɪ|p" data-lcs-bin-of="0"')), /house ch receives 0 pictures/);
  await run('PR7 F3 a word opposite its own picture', withCfg('match', { forceRowR: [0, 2, 3, 4, 5, 1] }), /a word sits opposite its own picture/);
  await run('PR9 F5 a lane at 3 lines', doctored('text', (h) => must(h, /<p data-lcs-text style="/, 'lane text').replace('<p data-lcs-text style="', '<p data-lcs-text style="max-width:170px;')), /rendered lines > 2/);
  await run('PR10 answerBox in place of blankNumeralBox', doctored('text', (h) => must(h, /class="ws-blankbox" data-lcs-countbox="1" data-lcs-answer=""/, 'count box').replace('class="ws-blankbox" data-lcs-countbox="1" data-lcs-answer=""', 'class="ws-answerbox" data-lcs-countbox="1" data-lcs-answer="undefined"')), /answer stamp "undefined"|not the open blankNumeralBox/);
  // SPARSE, one per face (at the 814 chrome, where the slack is largest)
  await run('SP1 F1 a band between two cards', doctored('sort-two', (h) => must(h, /grid-row:2;min-height/, 'card 2').replace('grid-row:2;min-height', 'grid-row:2;margin-top:64px;min-height')), /SPARSE —/, { strings: ONE });
  await run('SP2 F2 a band under the bank', doctored('gap', (h) => must(h, /flex:0 0 auto;margin-bottom:12px/, 'bank').replace('flex:0 0 auto;margin-bottom:12px', 'flex:0 0 auto;margin-bottom:64px')), /SPARSE —/, { strings: ONE });
  await run('SP3 F3 a band between two words', doctored('match', (h) => h.replace(/(data-lcs-left="3"[^>]*style=")/, '$1margin-top:64px;')), /SPARSE —/, { strings: ONE });
  await run('SP4 F4 a band between two card rows', doctored('position', (h) => h.replace(/(data-lcs-poscard="[34]"[^>]*style=")/g, '$1margin-top:64px;')), /SPARSE —/, { strings: ONE });
  await run('SP5 F5 a band between two lanes', doctored('text', (h) => h.replace(/(data-lcs-lane="3"[^>]*style=")/, '$1margin-top:64px;')), /SPARSE —/, { strings: ONE });
  // FILL both ways
  const high = (h) => must(h, /style="flex:1;min-height:0;/, 'root').replace('style="flex:1;min-height:0;', 'style="flex:0 0 auto;min-height:0;').replace('flex:1 1 auto;min-height:0;container-type:size', 'flex:0 0 440px;min-height:0;container-type:size');
  const past = (h) => must(h, /style="flex:1;min-height:0;/, 'root').replace('style="flex:1;min-height:0;', 'style="flex:1 0 900px;min-height:900px;');
  for (const [i, f] of FACES.entries()) {
    // F1's cards size to their picture even at auto height (112 px each = 90 % of the body), so its poison
    // also pins the rows and the picture to their minimum (the shape a non-growing F1 would have)
    const hi = f.mode === 'sort-two' ? (h) => high(must(h, /repeat\(6,minmax\(88px,1fr\)\)/, 'F1 rows').replace('repeat(6,minmax(88px,1fr))', 'repeat(6,88px)').replace(/height:clamp\([^;]*\);/g, 'height:72px;')) : high;
    await run(`FH${i + 1} ${f.id} content ends high at 814`, doctored(f.mode, hi), /FILL — the content ends at/, { strings: ONE });
    await run(`FP${i + 1} ${f.id} content past the body at 677`, doctored(f.mode, past), /FILL — the content runs|overflows its root|reaches the footer/, { strings: FI });
  }
  // the per-page answer tells, on the render
  await run('AT1 F1 houses alternate', withCfg('sort-two', { forceBins: [0, 1, 0, 1, 0, 1] }), /strictly alternates/);
  await run('AT2 F1 one house three in a row', withCfg('sort-two', { forceBins: [0, 0, 0, 1, 1, 1] }), /"0" 3 times in a row/);
  await run('AT3 F2 team staircase', withCfg('gap', { forceCols: [0, 1, 2, 0, 1, 2, 0, 1] }), /staircase over >= 6 rows/);
  await run('AT4 F3 pictures reversed', withCfg('match', { forceRowR: [5, 4, 3, 2, 1, 0] }), /pictures are the words reversed/);
  await run('AT5 F4 sockets repeat with period 3', withCfg('position', { forcePos: ['beginning', 'middle', 'end', 'beginning', 'middle', 'end', 'beginning', 'middle'] }), /period 3/);
  await run('AT6 F5 counts climb', withCfg('text', { forceIds: ['s7', 's1', 's3', 's8'] }), /counts are monotone/);
  // apparatus: an instruction naming what the face does not print
  const clone = () => JSON.parse(JSON.stringify(EN));
  const withInstr = (mode, ins) => { const b = clone(); b.strings[mode].instruction = ins; return validateBank(b, 'en'); };
  judge('AP1 F1 names a box', withInstr('sort-two', "Say each picture's name. Draw a line to the letter team and write it in the box."), /strings\.sort-two instruction names/);
  judge('AP2 F2 says circle', withInstr('gap', 'Say each picture word. Circle the letter team in the dashed space.'), /strings\.gap instruction names "Circle"/);
  judge('AP3 F3 names a box', withInstr('match', 'Read each word. Write its letter team in the box, then draw a line to its picture.'), /strings\.match instruction names/);
  judge('AP4 F4 names a line', withInstr('position', 'Say each picture word. Draw a line to the beginning, middle or end space.'), /strings\.position instruction names "line"/);
  judge('AP5 F5 names a line', withInstr('text', 'Read the sentences. Circle every sh. Draw a line to its box.'), /strings\.text instruction names "line"/);
  // the rejected pictures: put chick + lunchbox back as items and drop BOTH rejection lists — F1 and the base draw them
  {
    const b = clone(); b.rejectedPics = b.rejectedPics.filter((r) => !/chick|lunchbox/.test(r.pic));
    b.teams.ch.items.push({ vocabKey: 'chick', theme: 'easter', noun: 'chick', word: 'chick', seg: ['ch', 'i', 'ck'], snd: ['tʃ', 'ɪ', 'k'], silent: [], stem: 'chick', picOpened: true },
      { vocabKey: 'lunchbox', theme: 'classroom', noun: 'lunchbox', word: 'lunchbox', seg: 'l|u|n|ch|b|o|x'.split('|'), snd: 'l|ʌ|n|tʃ|b|ɒ|ks'.split('|'), silent: [], stem: 'lunchbox', picOpened: true });
    const saved = N.REJECTED_PICS_ALL.slice(); N.REJECTED_PICS_ALL.splice(0, N.REJECTED_PICS_ALL.length, ...saved.filter((p) => !/chick|lunchbox/.test(p)));
    let face = 0, base = 0;
    try { for (let sd = 1; sd <= 200; sd++) {
      if (BASE._buildWith(b, types['sort-two'].difficulty[2], { locale: 'en' }, { rng: makeRng('pc-' + sd) }).meta.items.some((k) => BANNED_KEYS.includes(k))) face++;
      if (BASE._buildWith(b, BASE.difficulty[2], { locale: 'en' }, { rng: makeRng('pb-' + sd) }).meta.items.some((k) => BANNED_KEYS.includes(k))) base++;
    } } finally { N.REJECTED_PICS_ALL.splice(0, N.REJECTED_PICS_ALL.length, ...saved); }
    judge('PX1 rejection dropped (F1 + base draw chick / lunchbox)', face && base ? [`${face} F1 + ${base} base pages of 200 draw a rejected picture`] : [], /F1 \+ [1-9]\d* base pages of 200 draw a rejected picture/);
    judge('PX2 a block whose rejectedPics omits the chick', validateBank((() => { const x = clone(); x.rejectedPics = x.rejectedPics.filter((r) => r.pic !== 'easter/chick'); return x; })(), 'en'), /rejectedPics does not list easter\/chick with its reason/);
    judge('PX3 the chick back as a ch item', validateBank((() => { const x = clone(); x.teams.ch.items.push({ vocabKey: 'chick', theme: 'easter', noun: 'chick', word: 'chick', seg: ['ch', 'i', 'ck'], snd: ['tʃ', 'ɪ', 'k'], silent: [], stem: 'chick', picOpened: true }); return x; })(), 'en'), /easter\/chick is a rejected picture/);
  }
  await run('PR11 F4 cue shrunk to the old 12 px keys', doctored('position', (h) => must(h, /<svg[^>]*data-lcs-cueseg="\d"[^>]*>/, 'cue').replace(/(<svg[^>]*?)width="56" height="22"([^>]*data-lcs-cueseg)/g, '$1width="12" height="12"$2')), /position cue segment \d is 12x12 px/);
  // face data rules
  { const b = clone(); b.sentences[11] = { id: 's12', text: 'My cat had a mishap.', target: 'sh', hits: 1, tokens: [{ w: 'My', seg: ['M', 'y'] }, { w: 'cat', seg: ['c', 'a', 't'] }, { w: 'had', seg: ['h', 'a', 'd'] }, { w: 'a', seg: ['a'] }, { w: 'mishap', seg: ['m', 'i', 's', 'h', 'a', 'p'] }] };
    judge('PD1 F5 a false pair in connected text (mishap)', validateBank(b, 'en'), /"mishap" shows the letters "sh" 1 times but holds 0/); }
  { const b = clone(); b.sentences[0] = { ...b.sentences[0], text: 'The sheep is on the ship and the ship is on the sea and the sea is big.', tokens: 'The|sheep|is|on|the|ship|and|the|ship|is|on|the|sea|and|the|sea|is|big'.split('|').map((w) => ({ w, seg: w === 'sheep' ? ['sh', 'ee', 'p'] : w === 'ship' ? ['sh', 'i', 'p'] : [...w] })), hits: 3 };
    judge('PD2 F5 a sentence too long for two lines', validateBank(b, 'en'), /characters > 64/); }
  { const b = clone(); b.teams.sh.items.push({ vocabKey: 'chair', theme: 'furniture', noun: 'chair', word: 'shair', seg: ['sh', 'air'], snd: ['ʃ', 'ɛə'], silent: [], stem: 'shair', picOpened: true });
    judge('PD3 F2 an unflagged frame clash (sh-air reads chair)', validateBank(b, 'en'), /reads "chair", an approved word — the frame is not unique/); }
  { const b = clone(); b.teams.sh.items.push({ vocabKey: 'chair', theme: 'furniture', noun: 'chair', word: 'shair', seg: ['sh', 'air'], snd: ['ʃ', 'ɛə'], silent: [], stem: 'shair', picOpened: true, noGap: true });
    const f = validateBank(b, 'en'); ok(!f.some((x) => /frame is not unique/.test(x)), 'PD3 control: a flagged noGap item is not a frame finding'); log.push('  PD3 control: noGap-flagged clash → no frame finding'); }
}

module.exports = { faceGate, FACES };
