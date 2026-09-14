#!/usr/bin/env node
/**
 * verify-b3-syllable-split.js — the G1-305 `syllable-split` gate (design §5).
 *
 *   node qa/verify-b3-syllable-split.js [--quick] [--themes=a,b] [--epochs=N]
 *
 * Four sections, exit 1 on any real failure OR any silent poison:
 *
 *  A. DATA (node, no browser) — the base pool of every wave theme × 11
 *     locales × d1-3 through the spec's PURE `eligible()`, printed as the
 *     refusal record (design §5 rule 10: pool ≥ floor or the cell is
 *     REFUSED, never filled). en reads the real bank; the ten other locales
 *     read a PROVISIONAL bank shaped by design §4 (casing / strict pool /
 *     mute-e) until their panel block lands — labelled as such. Every entry
 *     of every pool is re-checked against the approved file (rules 1-6).
 *
 *  B. RENDER (the REAL pipeline, render/render-instance.js — fonts load only
 *     from file://) — the exemplar theme at d1-3 (+ every wave theme and a
 *     seed-epoch sweep unless --quick): lints clean, verify() empty, the G1
 *     element floor (picture ≥ 44 px) and the type's own floors (arc zone ≥
 *     26, letters ≥ 22 px), node-side re-derivation of every stamped word
 *     through `eligible()` (rules 1-3), the long-card count, and the Baloo 2
 *     advance / ink measurement of every printed letter AND of the widest
 *     glyph set (m w W M Ä Ö Ü Å) at every cell used (rule 9, critic OPEN 1).
 *
 *  C. CHROME — a three-line title + three-line instruction (the README's
 *     722 px body) at d1-3: lints clean, verify() clean (card containment).
 *
 *  D. POISONS — every case design §5 lists that applies to the base, each
 *     must FAIL against the same checker that passed the correct page
 *     (the control): not-approved word · wrong split · count out of range ·
 *     rule-only boundary on a tex face · da policy_managed · fr mute-e ·
 *     a separated form printed · a printed arc in the base · a duplicate
 *     word · a dot on a boundary · a wrong card count · foreign visible
 *     text · a 30 px W in a 24 cell · a short pool must REFUSE.
 *
 *  FACES (Phase 2, 2026-09-14 — design §3 + §5, the five emitted specs
 *  G1-325 rewrite · G1-326 cloze · G1-327 scramble · G1-328 sort · G1-329 kings):
 *
 *  E. FACE DATA — every face's d2 pool per wave theme × 11 locales through
 *     the same PURE `eligible()` with the face's own options (texPool on the
 *     boundary faces, blankLen on cloze, one-vowel-run on kings, c2/c3 ≥ 4 on
 *     sort, min3 on scramble); rules 1-6 on every pooled entry; the design's
 *     en ship lines asserted cell for cell (cloze 4 themes, scramble none,
 *     sort 8, kings refused). Non-en banks are PROVISIONAL (§4 shape).
 *  F. FACE RENDER — each face through the real pipeline at d2: en for
 *     rewrite / cloze / sort; scramble and kings REFUSE in en by design (no
 *     three-syllable texPool words / kings:false), so they render against a
 *     SYNTHETIC de (+ es scramble, nl kings) block through the spec's
 *     `_buildWith` seam — lints clean, verify() clean, floors (picture ≥ 44,
 *     tiles ≥ 40, letters ≥ 22 / tiles ≥ 18 / model ≥ 22 px), every stamped
 *     word re-derived node-side, the sort bank's ranks re-derived from
 *     data/b2/collation.js, the kings' vowel list re-derived from
 *     data/literacy/letter-knowledge.json, the Baloo 2 advance/ink check on
 *     every cell letter, and the worst legal chrome (3-line title + 3-line
 *     instruction) for every face.
 *  G. FACE POISONS — the §5 face cases + the ones the base deferred, each
 *     must FAIL (the correct render is the control): a proportional cloze
 *     box · two blanks · the missing syllable printed · a solid box · a
 *     5-letter blank · scramble identity order · first tile = first
 *     syllable · a foreign tile · a rule-only word on the tex face · a
 *     short three-syllable pool must REFUSE · sort 5:3 · bank grouped by
 *     count · bank out of collation order · heading ≠ sortLabels · a printed
 *     answer on a ruling · c3 < 4 must REFUSE · kings stamp wrong · an arc
 *     shifted off its syllable · a vowel dot on a card · the example word on
 *     a card · blank arcs on the kings face · a two-run syllable · the
 *     example without dots · en kings:false must REFUSE · a tick in the
 *     hyphen lane · model ≠ word · a separated form on the rewrite page ·
 *     a missing writing row · a face row without its knob is the base.
 *
 *   --faces-png  also writes out/dev/<faceId>-<theme>-d2-<loc>.png for the
 *                synthetic-locale faces (the reviewer's PNGs for G1-327/329).
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const spec = require('../types/g1/G1-305-syllable-split.js');
const { approvedByKey, texAgreed, daStrict, bank } = require('../lib/b3-common.js');
const { loadType } = require('../lib/load-types.js');
const { compare } = require('../data/b2/collation.js');
const VOWELS = require('../data/literacy/letter-knowledge.json').vowels;
const { makeRng } = require('../lib/rng.js');

const ID = 'G1-305';
const OUT = path.join(__dirname, '..', 'out', 'dev');
const WAVE_THEMES = ['around the house', 'At the Supermarket', 'zoo animals', 'clothing', 'forest creatures', 'toys', 'animals', 'fruits', 'vehicles', 'ocean life', 'pets', 'body parts'];
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const EXEMPLAR = 'animals';
const G1_FLOOR = 44;
const MUTE_E = /[^aeiouyéèêë]e$/u;

const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.slice(n.length + 3) : d; };
const QUICK = flags.has('--quick');
const FACES_PNG = flags.has('--faces-png');
const THEMES = arg('themes') ? arg('themes').split(',') : WAVE_THEMES;
const EPOCHS = +arg('epochs', 3);

let asserts = 0, fails = [];
function ok(cond, msg) { asserts++; if (!cond) fails.push(msg); return !!cond; }

/** PROVISIONAL non-en banks (design §4) — for the pool record only; the real blocks come from the panels. */
function bankFor(loc) {
  if (loc === 'en') return bank('syllable-split', 'en');
  try { return bank('syllable-split', loc); } catch (e) { /* not authored yet */ }
  return {
    mark: ['es', 'pt', 'it', 'fi'].includes(loc) ? 'bar' : 'arc', hyphen: '-', casing: loc === 'de' ? 'keep' : 'lower',
    kings: !['en', 'fr'].includes(loc), vowelExtra: loc === 'nl' ? ['ij'] : [],
    strictPool: loc === 'da' ? 'policy_managed_absent' : null, refuse: { finalMuteE: loc === 'fr' },
    sortLabels: { 2: '2', 3: '3' }, example: { vocabKey: null }, instructionTavutettu: null, exclude: [], _provisional: true,
  };
}

/**
 * Rules 1-6 on a list of stamps {vocab, word, split[], count} for (loc, cfg).
 * `approved` may be overridden (poisons); `cfg.pool==='tex'` = a boundary face.
 */
function checkStamps(stamps, loc, cfg, b, approved) {
  const out = [];
  const ap = approved || approvedByKey(loc);
  const seen = new Set();
  for (const s of stamps) {
    const a = ap.get(s.vocab);
    const tag = `${s.vocab}/"${s.word}"`;
    if (!a) { out.push(`${tag}: not approved (no approved-words entry)`); continue; }
    if (a.word.toLocaleLowerCase(loc) !== String(s.word).toLocaleLowerCase(loc)) { out.push(`${tag}: not approved (approved word is "${a.word}")`); continue; }
    if (a.split.map((x) => x.toLocaleLowerCase(loc)).join('|') !== s.split.join('|')) out.push(`${tag}: stamped split ${s.split.join('|')} ≠ approved ${a.split.join('|')}`);
    if (!(s.count >= 2) || s.count !== s.split.length || s.count !== a.count) out.push(`${tag}: count ${s.count} vs approved ${a.count} / ${s.split.length} parts`);
    if (s.count < cfg.minCount || s.count > cfg.maxCount) out.push(`${tag}: count ${s.count} outside ${cfg.minCount}-${cfg.maxCount}`);
    if ([...s.word].length > cfg.maxLetters) out.push(`${tag}: ${[...s.word].length} letters > ${cfg.maxLetters}`);
    if (cfg.pool === 'tex' && !texAgreed(a)) out.push(`${tag}: boundary face needs TeX agreement (sources ${(a.sources_agreed || []).join(',')})`);
    if ((loc === 'da' || (b && b.strictPool === 'policy_managed_absent')) && !daStrict(a)) out.push(`${tag}: da policy_managed entry in the strict pool`);
    if (b && b.refuse && b.refuse.finalMuteE && MUTE_E.test(s.split[s.split.length - 1])) out.push(`${tag}: final mute-e refused`);
    if (seen.has(s.word)) out.push(`${tag}: duplicate`);
    seen.add(s.word);
  }
  return out;
}

function cfgFor(d) { const c = spec.difficulty[d]; return { minCount: c.minCount, maxCount: c.maxCount, maxLetters: c.maxLetters, pool: 'full', dots: c.dots }; }

// ---------------------------------------------------------------- A. DATA
function sectionData() {
  console.log('\n== A. DATA — base pool per theme × locale (words / REFUSED below floor); non-en = PROVISIONAL bank ==');
  const record = {};
  for (const d of [1, 2, 3]) {
    const c = spec.difficulty[d];
    const floor = Math.max(c.cards, c.minPool || 0);
    console.log(`-- d${d}: count ${c.minCount}-${c.maxCount}, ≤ ${c.maxLetters} letters, floor ${floor}${c.dots ? ', dot/boundary filter' : ''}`);
    for (const theme of WAVE_THEMES) {
      const line = [theme.padEnd(20)];
      for (const loc of LOCALES) {
        const b = bankFor(loc);
        const pool = spec.eligible(loc, theme, { ...cfgFor(d), bank: b });
        const long = pool.filter((e) => e.count >= 3).length;
        const refused = pool.length < floor;
        record[`${theme}|d${d}|${loc}`] = { pool: pool.length, long, refused };
        line.push(`${loc}:${String(pool.length).padStart(2)}${refused ? '✗' : ' '}`);
        // rules 1-6 on every pooled entry (0 checked = FAIL)
        const bad = checkStamps(pool.map((e) => ({ vocab: e.vocabKey, word: e.word, split: e.split, count: e.count })), loc, cfgFor(d), b);
        ok(bad.length === 0 && (refused || pool.length > 0), `${theme}/${loc}/d${d} pool entries (${pool.length} checked): ${bad.slice(0, 3).join('; ')}`);
      }
      console.log(line.join(' '));
    }
  }
  // the design's d2 ship table (measured 2026-09-13) must still hold on today's data
  const d2 = (t, l) => record[`${t}|d2|${l}`];
  // design §1 table (zoo animals is listed 11/11 there but da zoo is in the same file's refused list —
  // measured 6 < 8 on the strict pool; the refused list wins, so zoo = 10/11)
  for (const t of ['around the house', 'At the Supermarket', 'clothing', 'forest creatures', 'toys', 'animals']) {
    ok(LOCALES.every((l) => !d2(t, l).refused), `design table: ${t} ships 11/11 at d2`);
  }
  ok(d2('zoo animals', 'da').refused && LOCALES.filter((l) => l !== 'da').every((l) => !d2('zoo animals', l).refused), 'design table: zoo animals 10/11 (da refused, strict pool 6)');
  ok(d2('fruits', 'da').refused && LOCALES.filter((l) => l !== 'da').every((l) => !d2('fruits', l).refused), 'design table: fruits 10/11 (da refused)');
  ok(d2('vehicles', 'da').refused && LOCALES.filter((l) => l !== 'da').every((l) => !d2('vehicles', l).refused), 'design table: vehicles 10/11 (da refused)');
  ok(d2('ocean life', 'da').refused && LOCALES.filter((l) => l !== 'da').every((l) => !d2('ocean life', l).refused), 'design table: ocean life 10/11 (da refused)');
  ok(d2('pets', 'da').refused && d2('pets', 'no').refused && LOCALES.filter((l) => !['da', 'no'].includes(l)).every((l) => !d2('pets', l).refused), 'design table: pets 9/11 (da, no refused)');
  ok(d2('body parts', 'en').refused && d2('body parts', 'da').refused && LOCALES.filter((l) => !['en', 'da'].includes(l)).every((l) => !d2('body parts', l).refused), 'design table: body parts 9/11 (en, da refused)');
  // the count-3 shortfall the spec records on the page (minLongCards honoured only where the pool has them)
  const short = [];
  for (const t of WAVE_THEMES) for (const l of LOCALES) { const r = d2(t, l); if (!r.refused && r.long < spec.difficulty[2].minLongCards) short.push(`${t}/${l}:${r.long}`); }
  console.log('d2 cells shipping with < 2 three-syllable words (recorded on the page as data-lcs-long): ' + (short.join(', ') || 'none'));
  const refusedD2 = Object.entries(record).filter(([k, v]) => k.includes('|d2|') && v.refused).map(([k]) => k.replace('|d2|', '/'));
  console.log('d2 REFUSED cells: ' + refusedD2.join(', '));
  return record;
}

// ---------------------------------------------------------------- B/C. RENDER
async function renderJob(page, job) {
  const out = await renderInstance({
    type: spec, theme: job.theme, difficulty: job.d, locale: 'en', page, outDir: OUT,
    baseName: `${ID}-gate-${job.tag || job.theme.replace(/\s+/g, '_')}-d${job.d}-en${job.epoch ? '-e' + job.epoch : ''}`,
    strings: job.strings, seedEpoch: job.epoch || 1,
  });
  return out;
}

/** In-page measurements: floors, glyph advance + ink containment, card containment, stamps. */
async function measurePage(page) {
  return page.evaluate(() => {
    const r = { fails: [], stamps: [], cells: new Set(), minPic: 1e9, minArc: 1e9, minFont: 1e9, maxAdvRatio: 0, letters: 0, body: 0 };
    const root = document.querySelector('[data-lcs-type="G1-305"]');
    r.long = +root.dataset.lcsLong; r.cards = +root.dataset.lcsCards;
    r.body = Math.round(document.querySelector('[data-lcs-body]').getBoundingClientRect().height);
    const c = document.createElement('canvas'); const ctx = c.getContext('2d');
    const inkOf = (ch, size) => { ctx.font = `700 ${size}px 'Baloo 2'`; const m = ctx.measureText(ch); return { adv: m.width, asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent, fa: m.fontBoundingBoxAscent, fd: m.fontBoundingBoxDescent }; };
    for (const st of root.querySelectorAll('.ws-card-stage[data-lcs-face="base"]')) {
      r.stamps.push({ vocab: st.dataset.lcsVocab, word: st.dataset.lcsWord, split: st.dataset.lcsSplit.split('|'), count: +st.dataset.lcsCount });
      const img = st.querySelector('img'); const ir = img.getBoundingClientRect();
      r.minPic = Math.min(r.minPic, ir.width, ir.height);
      const ws = st.querySelector('[data-lcs-prim="syllable-word"]');
      const cell = +ws.dataset.lcsCell, size = +ws.dataset.lcsFontpx, h = ws.getBoundingClientRect().height;
      r.cells.add(cell); r.minFont = Math.min(r.minFont, size);
      const az = st.querySelector('[data-lcs-arcmode]'); r.minArc = Math.min(r.minArc, az.getBoundingClientRect().height);
      for (const t of ws.querySelectorAll('text')) {
        r.letters++;
        const adv = t.getComputedTextLength();
        r.maxAdvRatio = Math.max(r.maxAdvRatio, adv / (cell - 2));
        if (adv > cell - 2) r.fails.push(`"${t.textContent}" advance ${adv.toFixed(1)} > cell−2 (${cell - 2})`);
        const y = +t.getAttribute('y'); const k = inkOf(t.textContent, size);
        const base = y + (k.fa - k.fd) / 2;   // dominant-baseline:central → alphabetic baseline
        if (base - k.asc < 0 || base + k.desc > h) r.fails.push(`"${t.textContent}" ink ${(base - k.asc).toFixed(1)}..${(base + k.desc).toFixed(1)} outside the ${h} box`);
      }
      const cr = st.closest('.ws-card').getBoundingClientRect();
      for (const el of st.querySelectorAll('img, svg')) {
        const b = el.getBoundingClientRect();
        if (b.bottom > cr.bottom + 0.6 || b.top < cr.top - 0.6) r.fails.push(`<${el.tagName.toLowerCase()}> clipped by its card`);
      }
    }
    // rule 9 on the widest glyph set at every cell used on this page
    r.widest = {};
    for (const cell of r.cells) {
      const size = cell - 2;
      for (const g of ['m', 'w', 'W', 'M', 'Ä', 'Ö', 'Ü', 'Å']) {
        const k = inkOf(g, size);
        r.widest[`${g}@${size}`] = +k.adv.toFixed(2);
        if (k.adv > cell - 2) r.fails.push(`widest glyph ${g} at ${size}px: ${k.adv.toFixed(1)} > ${cell - 2}`);
      }
    }
    r.cells = [...r.cells];
    return r;
  });
}

async function checkRender(page, job, out) {
  const tag = `${job.tag || job.theme}/d${job.d}${job.epoch ? '/e' + job.epoch : ''}`;
  ok(out.qa.lints.length === 0, `${tag}: lints ${out.qa.lints.join(' | ')}`);
  ok(out.qa.verify.length === 0, `${tag}: verify ${out.qa.verify.join(' | ')}`);
  const m = await measurePage(page);
  ok(m.fails.length === 0, `${tag}: measure ${m.fails.slice(0, 4).join(' | ')}`);
  ok(m.minPic >= G1_FLOOR, `${tag}: picture ${m.minPic} < G1 floor ${G1_FLOOR}`);
  ok(m.minArc >= 26, `${tag}: arc zone ${m.minArc} < 26`);
  ok(m.minFont >= 22, `${tag}: letters ${m.minFont} px < 22`);
  ok(m.letters > 0 && m.stamps.length === spec.difficulty[job.d].cards, `${tag}: ${m.stamps.length} stamps / ${m.letters} letters (non-vacuity)`);
  // node-side re-derivation: every stamped word is in eligible() for the resolved config, rules 1-3
  const cfg = cfgFor(job.d);
  const pool = spec.eligible('en', job.theme, { ...cfg, bank: bank('syllable-split', 'en') });
  const byKey = new Map(pool.map((e) => [e.vocabKey, e]));
  for (const s of m.stamps) {
    const e = byKey.get(s.vocab);
    ok(!!e && e.word === s.word && e.split.join('|') === s.split.join('|') && e.count === s.count, `${tag}: stamp ${s.vocab}/${s.word} not re-derived from eligible()`);
  }
  const bad = checkStamps(m.stamps, 'en', cfg, bank('syllable-split', 'en'));
  ok(bad.length === 0, `${tag}: stamps ${bad.join(' | ')}`);
  const longPool = pool.filter((e) => e.count >= 3).length;
  const wantLong = Math.min(spec.difficulty[job.d].minLongCards || 0, longPool);
  ok(m.long === wantLong && m.stamps.filter((s) => s.count >= 3).length >= wantLong, `${tag}: long cards ${m.long}, want ${wantLong} (pool has ${longPool})`);
  return m;
}

const LONG_STRINGS = {
  title: 'Syllable Division Practice with Picture Words for the Whole Class Today',
  instruction: 'Say each picture word out loud and clap its parts with a friend. Then draw one scoop under every syllable you hear, and check the whole page again before you hand it in.',
};

// ---------------------------------------------------------------- D. POISONS
async function sectionPoisons(page) {
  console.log('\n== D. POISONS (each must FAIL; the correct page/bank is the control) ==');
  let killed = 0, total = 0;
  const poison = (name, failed, detail) => { total++; if (failed) killed++; console.log(`  ${failed ? 'KILLED  ' : 'SURVIVED'} ${name}${detail ? '  — ' + String(detail).replace(/\s+/g, ' ').slice(0, 160) : ''}`); };
  const en = bank('syllable-split', 'en');
  const cfg2 = cfgFor(2);
  const control = checkStamps([{ vocab: 'rabbit', word: 'rabbit', split: ['rab', 'bit'], count: 2 }], 'en', cfg2, en);
  ok(control.length === 0, 'poison control (rabbit) must pass: ' + control.join(';'));
  // 1. not approved
  let r = checkStamps([{ vocab: 'zebra', word: 'sebra', split: ['se', 'bra'], count: 2 }], 'en', cfg2, en);
  poison('not-approved word (zebra/"sebra")', r.some((x) => /not approved/.test(x)), r[0]);
  // 2. wrong split
  r = checkStamps([{ vocab: 'camera', word: 'camera', split: ['kam', 'era'], count: 2 }], 'en', cfg2, en);
  poison('stamped split kam|era', r.some((x) => /split/.test(x)), r[0]);
  // 3. count out of range (a 4-syllable word on the d2 face)
  const ap = approvedByKey('en');
  const four = [...ap.values()].find((e) => e.count === 4 && /^\p{L}+$/u.test(e.word));
  r = checkStamps([{ vocab: four.key, word: four.word, split: four.split, count: 4 }], 'en', cfg2, en);
  poison(`count 4 on the d2 face (${four.word})`, r.some((x) => /outside/.test(x)), r[0]);
  // 4. rule-only boundary on a tex face (en acorn: rule + vocab-phonics-syl)
  const acorn = ap.get('acorn');
  ok(!!acorn && !texAgreed(acorn), 'poison premise: en acorn is approved without TeX');
  r = checkStamps([{ vocab: 'acorn', word: 'acorn', split: acorn.split, count: acorn.count }], 'en', { ...cfg2, pool: 'tex' }, en);
  poison('en acorn on a boundary (tex) face', r.some((x) => /TeX/.test(x)), r[0]);
  const rc = checkStamps([{ vocab: 'acorn', word: 'acorn', split: acorn.split, count: acorn.count }], 'en', cfg2, en);
  ok(rc.length === 0, 'control: acorn passes the count-only base');
  // 5. da policy_managed:true
  const daAp = new Map([['zebra', { key: 'zebra', word: 'zebra', split: ['ze', 'bra'], count: 2, sources_agreed: ['TeX'], policy_managed: true }]]);
  r = checkStamps([{ vocab: 'zebra', word: 'zebra', split: ['ze', 'bra'], count: 2 }], 'da', cfg2, bankFor('da'), daAp);
  poison('da policy_managed:true', r.some((x) => /policy_managed/.test(x)), r[0]);
  const daCtl = checkStamps([{ vocab: 'zebra', word: 'zebra', split: ['ze', 'bra'], count: 2 }], 'da', cfg2, bankFor('da'), new Map([['zebra', { ...daAp.get('zebra'), policy_managed: undefined }]]));
  ok(daCtl.length === 0, 'control: da strict entry passes');
  // 6. fr final mute-e
  const frAp = approvedByKey('fr'); const voiture = frAp.get('car');
  ok(!!voiture && voiture.word === 'voiture', 'poison premise: fr car = voiture');
  r = checkStamps([{ vocab: 'car', word: 'voiture', split: voiture.split, count: voiture.count }], 'fr', { ...cfg2, maxCount: 4 }, bankFor('fr'), frAp);
  poison('fr voiture (final mute-e)', r.some((x) => /mute-e/.test(x)), r[0]);
  // 7-8. DOM poisons on a real render: separated form · printed arc · duplicate · dot on boundary · card count · foreign text
  const out = await renderJob(page, { theme: EXEMPLAR, d: 1, tag: 'poison' });
  ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, 'DOM-poison control render is clean');
  const dom = async (name, mutate, re) => {
    await page.reload({ waitUntil: 'networkidle0' });
    await page.evaluate(mutate);
    const v = await spec.verify(page);
    poison(name, v.some((x) => re.test(x)), v.find((x) => re.test(x)) || v[0]);
  };
  await dom('a separated form of the word printed', () => {
    const st = document.querySelector('.ws-card-stage[data-lcs-face="base"]');
    const sp = document.createElement('span'); sp.textContent = st.dataset.lcsSplit.replace('|', '-'); st.appendChild(sp);
  }, /separated form/);
  await dom('a printed arc in the base', () => {
    const az = document.querySelector('[data-lcs-arcmode]');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', 'M 4,3 Q 40,20 76,3'); p.setAttribute('stroke', '#146B5E'); p.setAttribute('fill', 'none'); az.appendChild(p);
  }, /printed arc/);
  await dom('a duplicate word', () => {
    const st = [...document.querySelectorAll('.ws-card-stage[data-lcs-face="base"]')];
    st[1].dataset.lcsWord = st[0].dataset.lcsWord; st[1].dataset.lcsVocab = st[0].dataset.lcsVocab; st[1].dataset.lcsSplit = st[0].dataset.lcsSplit; st[1].dataset.lcsCount = st[0].dataset.lcsCount;
    st[1].querySelector('[data-lcs-wordrow]').innerHTML = st[0].querySelector('[data-lcs-wordrow]').innerHTML;
    st[1].querySelector('[data-lcs-arczone]').innerHTML = st[0].querySelector('[data-lcs-arczone]').innerHTML; st[1].dataset.lcsCell = st[0].dataset.lcsCell;
  }, /duplicate/);
  await dom('a d1 dot moved onto the syllable boundary', () => {
    const st = document.querySelector('.ws-card-stage[data-lcs-face="base"]');
    const cell = +st.dataset.lcsCell; const first = [...st.dataset.lcsSplit.split('|')[0]].length;
    st.querySelector('[data-lcs-dot="1"]').setAttribute('cx', first * cell);
  }, /boundary/);
  await dom('a wrong card count stamp', () => { document.querySelector('[data-lcs-type="G1-305"]').dataset.lcsCards = '5'; }, /want 5/);
  await dom('a stray visible letter on a card', () => {
    const ws = document.querySelector('[data-lcs-prim="syllable-word"]');
    const t = ws.querySelector('text').cloneNode(true); t.textContent = 'x'; ws.appendChild(t);
  }, /cell letters|visible text/);
  await dom('data-lcs-arcs leaking the count', () => { document.querySelector('[data-lcs-arcmode]').dataset.lcsArcs = '2'; }, /leaks/);
  await page.reload({ waitUntil: 'networkidle0' });
  const ctl = await spec.verify(page);
  ok(ctl.length === 0, 'DOM-poison control after reload is clean: ' + ctl.join(';'));
  // 9. a 30 px W in a 24 cell
  const adv = await page.evaluate(() => { const c = document.createElement('canvas').getContext('2d'); c.font = "700 30px 'Baloo 2'"; return c.measureText('W').width; });
  poison(`a 30 px W (${adv.toFixed(1)}) in a 24 cell`, adv > 24 - 2, `${adv.toFixed(1)} > 22`);
  ok(adv < 30, 'poison premise: the real Baloo 2 loaded (W at 30 px measures < 30)');
  // 10. a short pool must REFUSE, never fill
  let threw = null;
  try { spec.build({ theme: 'body parts', difficulty: 2, locale: 'en' }, { rng: require('../lib/rng.js').makeRng('G1-305|poison|1') }); } catch (e) { threw = e.message; }
  poison('en body parts d2 (pool 6 < 8) builds', /REFUSED/.test(threw || ''), threw);
  threw = null;
  try { spec.build({ theme: EXEMPLAR, difficulty: 2, locale: 'de' }, { rng: require('../lib/rng.js').makeRng('G1-305|poison|1') }); } catch (e) { threw = e.message; }
  poison('a locale without a bank block builds (de)', /no de block/.test(threw || ''), threw);
  const baseKilled = killed, baseTotal = total;
  await sectionFacePoisons(page, poison);
  console.log(`  poisons ${killed}/${total} killed (base ${baseKilled}/${baseTotal}, faces ${killed - baseKilled}/${total - baseTotal})`);
  POISONS.killed = killed; POISONS.total = total;
  return killed === total;
}
const POISONS = { killed: 0, total: 0 };


// ================================================================ FACES (Phase 2)
const FACE_IDS = { rewrite: 'G1-325', cloze: 'G1-326', scramble: 'G1-327', sort: 'G1-328', kings: 'G1-329' };
const FACE_SPECS = {};
for (const [face, id] of Object.entries(FACE_IDS)) FACE_SPECS[face] = loadType(id);

/** SYNTHETIC non-en blocks for the faces en refuses by design (scramble: no three-syllable texPool words; kings: kings:false). */
// MEASURED 2026-09-14: letter-knowledge.json vowels are the bare letters only (es/pt 'aeiou'), so an accented
// vowel (mán, ré, ângora) is a NON-vowel to the king rule and the word silently drops out of the Vowel King pool
// (es 78 / pt 69 / it 6 of the 2-3-syllable texPool). vowelExtra is the bank's field for exactly this: the es
// block below carries the accented set the es panel must author (pt: áéíóúâêôãõ, it: àèéìòù, fi/nl: none).
const SYNTH = {
  de: { mark: 'arc', hyphen: '-', casing: 'keep', kings: true, vowelExtra: [], strictPool: null, refuse: { finalMuteE: false }, sortLabels: { 2: '2 Silben', 3: '3 Silben' }, example: { vocabKey: 'banana' }, instructionTavutettu: null, exclude: [], _synthetic: true },
  es: { mark: 'bar', hyphen: '-', casing: 'lower', kings: true, vowelExtra: ['á', 'é', 'í', 'ó', 'ú', 'ü'], strictPool: null, refuse: { finalMuteE: false }, sortLabels: { 2: 'bisílabas', 3: 'trisílabas' }, example: { vocabKey: 'camel' }, instructionTavutettu: null, exclude: [], _synthetic: true },
  nl: { mark: 'arc', hyphen: '-', casing: 'lower', kings: true, vowelExtra: ['ij'], strictPool: null, refuse: { finalMuteE: false }, sortLabels: { 2: '2 lettergrepen', 3: '3 lettergrepen' }, example: { vocabKey: 'banana' }, instructionTavutettu: null, exclude: [], _synthetic: true },
};
function faceBankFor(loc) { if (loc === 'en') return bank('syllable-split', 'en'); try { return bank('syllable-split', loc); } catch (e) { /* not authored */ } return SYNTH[loc] || bankFor(loc); }

/** The face's resolved d2 config + the eligible() options for (loc, bank). */
function faceCfg(face, loc, b) {
  const fs_ = FACE_SPECS[face];
  const d = fs_.difficulty[2];
  return { d, opts: spec.faceOpts(face, d, b, loc) };
}
/** The face's pool after the face's own sampling rules (rewrite lane cap; sort c2/c3; scramble min3). */
function facePool(face, loc, theme, b) {
  const { d, opts } = faceCfg(face, loc, b);
  let pool = spec.eligible(loc, theme, opts);
  if (face === 'rewrite') pool = pool.filter((e) => [...e.word].length <= Math.min(d.maxLetters, 17 - e.count));
  const floor = Math.max(d.cards || 0, d.minPool || 0);
  let refused = pool.length < floor, why = refused ? `pool ${pool.length} < ${floor}` : '';
  if (face === 'scramble' && pool.filter((e) => e.count >= 3).length < (d.min3 || 0)) { refused = true; why = `t3 ${pool.filter((e) => e.count >= 3).length} < min3 ${d.min3}`; }
  if (face === 'sort') { const c2 = pool.filter((e) => e.count === 2).length, c3 = pool.filter((e) => e.count === 3).length; if (c2 < d.perCol || c3 < d.perCol) { refused = true; why = `c2 ${c2} / c3 ${c3} < ${d.perCol}`; } }
  if (face === 'kings' && !b.kings) { refused = true; why = 'bank kings:false'; }
  return { pool, refused, why, d, opts };
}

// ---------------------------------------------------------------- E. FACE DATA
function sectionFaceData() {
  console.log('\n== E. FACE DATA — d2 face pool per theme × locale (✗ = REFUSED); non-en = PROVISIONAL / SYNTHETIC bank ==');
  const rec = {};
  for (const face of Object.keys(FACE_IDS)) {
    const { d } = faceCfg(face, 'en', bank('syllable-split', 'en'));
    console.log(`-- ${FACE_IDS[face]} ${face}: count ${d.minCount}-${d.maxCount}, ≤ ${d.maxLetters} letters, pool ${d.pool || 'full'}${d.blankLen ? ', blank ' + d.blankLen.join('-') : ''}${d.min3 ? ', min3 ' + d.min3 : ''}${d.perCol ? ', ' + d.perCol + ':' + d.perCol : ''}${d.kings ? ', one vowel run per syllable' : ''}`);
    for (const theme of WAVE_THEMES) {
      const line = [theme.padEnd(20)];
      for (const loc of LOCALES) {
        const b = faceBankFor(loc);
        const r = facePool(face, loc, theme, b);
        rec[`${face}|${theme}|${loc}`] = r;
        line.push(`${loc}:${String(r.pool.length).padStart(2)}${r.refused ? '✗' : ' '}`);
        const cfg = { minCount: r.d.minCount, maxCount: r.d.maxCount, maxLetters: r.d.maxLetters, pool: r.opts.pool };
        const bad = checkStamps(r.pool.map((e) => ({ vocab: e.vocabKey, word: e.word, split: e.split, count: e.count })), loc, cfg, b);
        ok(bad.length === 0 && (r.refused || r.pool.length > 0), `${face}/${theme}/${loc} pool entries (${r.pool.length} checked): ${bad.slice(0, 3).join('; ')}`);
        // face rules on every pooled entry: blank syllable exists (cloze) · one vowel run per syllable (kings)
        if (face === 'cloze') ok(r.pool.every((e) => e.split.some((sy) => [...sy].length >= 2 && [...sy].length <= 4)), `${face}/${theme}/${loc}: an entry without a 2-4 letter syllable`);
        if (face === 'kings') ok(r.pool.every((e) => e.split.every((sy) => spec.kingRuns(sy, r.opts.kings.vowels, r.opts.kings.extra).length === 1)), `${face}/${theme}/${loc}: an entry with a syllable of ≠ 1 vowel run`);
        if (r.opts.pool === 'tex') ok(r.pool.every((e) => texAgreed(e.approved)), `${face}/${theme}/${loc}: a rule-only entry on a boundary face`);
      }
      console.log(line.join(' '));
    }
  }
  const en = (face, t) => rec[`${face}|${t}|en`];
  // design §3 ship lines for en (the real bank), cell for cell
  const clozeShip = ['animals', 'clothing', 'around the house', 'At the Supermarket'];
  for (const t of WAVE_THEMES) ok(en('cloze', t).refused === !clozeShip.includes(t), `design: cloze en ${t} ${clozeShip.includes(t) ? 'ships' : 'refused'} (pool ${en('cloze', t).pool.length})`);
  ok(en('cloze', 'animals').pool.length === 9 && en('cloze', 'clothing').pool.length === 8 && en('cloze', 'around the house').pool.length === 16 && en('cloze', 'At the Supermarket').pool.length === 18, 'design: cloze en animals 9 / clothing 8 / house 16 / supermarket 18');
  for (const t of WAVE_THEMES) ok(en('scramble', t).refused, `design: scramble en ${t} REFUSED (t3 ${en('scramble', t).pool.filter((e) => e.count >= 3).length})`);
  const sortShip = ['fruits', 'vehicles', 'zoo animals', 'clothing', 'around the house', 'At the Supermarket', 'forest creatures', 'ocean life'];
  for (const t of WAVE_THEMES) ok(en('sort', t).refused === !sortShip.includes(t), `design: sort en ${t} ${sortShip.includes(t) ? 'ships' : 'refused'} (${en('sort', t).why})`);
  for (const t of WAVE_THEMES) ok(en('kings', t).refused && en('kings', t).why === 'bank kings:false', `design: kings en ${t} REFUSED by the bank`);
  for (const t of WAVE_THEMES) ok(en('rewrite', t).refused === (t === 'body parts'), `design: rewrite en ${t} (full pool, same cells as the base)`);
  // fr kings refused by the (provisional) bank too; de/pt/nl/fi kings every wave theme except the base's refused cells
  for (const t of WAVE_THEMES) ok(rec[`kings|${t}|fr`].refused && rec[`kings|${t}|fr`].why === 'bank kings:false', `design: kings fr ${t} REFUSED by the bank`);
  for (const loc of ['de', 'pt', 'nl', 'fi']) for (const t of WAVE_THEMES) ok(!rec[`kings|${t}|${loc}`].refused, `design: kings ${loc} ${t} ships (${rec[`kings|${t}|${loc}`].why})`);
  const refusedCells = Object.entries(rec).filter(([, v]) => v.refused).length, total = Object.keys(rec).length;
  console.log(`face cells: ${total - refusedCells} ship / ${refusedCells} REFUSED of ${total}`);
  return rec;
}

// ---------------------------------------------------------------- F. FACE RENDER
async function renderFace(page, face, theme, loc, extra) {
  const type = FACE_SPECS[face];
  const b = faceBankFor(loc);
  const wrapped = loc === 'en' ? type : { ...type, build: (a, c) => type._buildWith(b, a, c) };
  const tag = (extra && extra.tag) || '';
  const outDir = FACES_PNG && !tag && loc !== 'en' ? OUT : path.join(OUT, 'g1305-faces');
  const out = await renderInstance({
    type: wrapped, theme, difficulty: 2, locale: loc, page, outDir,
    baseName: FACES_PNG && !tag && loc !== 'en' ? `${FACE_IDS[face]}-${theme}-d2-${loc}` : `${FACE_IDS[face]}-${theme.replace(/\s+/g, '_')}-d2-${loc}${tag ? '-' + tag : ''}${extra && extra.epoch ? '-e' + extra.epoch : ''}`,
    strings: extra && extra.strings, seedEpoch: (extra && extra.epoch) || 1,
  });
  return { out, b, type };
}

/** In-page measurements for a face page. */
async function measureFace(page) {
  return page.evaluate(() => {
    const r = { fails: [], stamps: [], minPic: 1e9, minFont: 1e9, minTile: 1e9, body: 0, cells: [], letters: 0, widest: {}, bank: [], kings: [] };
    const root = document.querySelector('[data-lcs-type="G1-305"]');
    r.face = root.dataset.lcsFace;
    r.body = Math.round(document.querySelector('[data-lcs-body]').getBoundingClientRect().height);
    const c = document.createElement('canvas'); const ctx = c.getContext('2d');
    const inkOf = (ch, size) => { ctx.font = `700 ${size}px 'Baloo 2'`; const m = ctx.measureText(ch); return { adv: m.width, asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent, fa: m.fontBoundingBoxAscent, fd: m.fontBoundingBoxDescent }; };
    const cellsSeen = new Set();
    for (const st of root.querySelectorAll('.ws-card-stage[data-lcs-word]')) {
      r.stamps.push({ vocab: st.dataset.lcsVocab, word: st.dataset.lcsWord, split: st.dataset.lcsSplit.split('|'), count: +st.dataset.lcsCount, blank: st.dataset.lcsBlank, order: st.dataset.lcsOrder, kings: st.dataset.lcsKings });
      const img = st.querySelector('img'); const ir = img.getBoundingClientRect();
      r.minPic = Math.min(r.minPic, ir.width, ir.height);
      const ws = st.querySelector('[data-lcs-prim="syllable-word"]');
      if (ws) {
        const cell = +ws.dataset.lcsCell, size = +ws.dataset.lcsFontpx, h = ws.getBoundingClientRect().height;
        cellsSeen.add(cell); r.minFont = Math.min(r.minFont, size);
        for (const t of ws.querySelectorAll('text')) {
          r.letters++;
          const adv = t.getComputedTextLength();
          if (adv > cell - 2) r.fails.push(`"${t.textContent}" advance ${adv.toFixed(1)} > cell−2 (${cell - 2})`);
          const y = +t.getAttribute('y'); const k = inkOf(t.textContent, size);
          const base = y + (k.fa - k.fd) / 2;
          if (base - k.asc < 0 || base + k.desc > h) r.fails.push(`"${t.textContent}" ink outside the ${h} box`);
        }
      }
      const model = st.querySelector('[data-lcs-model]');
      if (model) r.minFont = Math.min(r.minFont, parseFloat(getComputedStyle(model).fontSize));
      for (const t of st.querySelectorAll('.ws-tile')) {
        r.minTile = Math.min(r.minTile, t.getBoundingClientRect().height);
        r.minFont = Math.min(r.minFont, parseFloat(getComputedStyle(t).fontSize));
        const span = document.createRange(); span.selectNodeContents(t);
        if (span.getBoundingClientRect().width > t.getBoundingClientRect().width - 20) r.fails.push(`tile "${t.textContent}" text overflows its padding`);
      }
      const cr = st.closest('.ws-card').getBoundingClientRect();
      for (const el of st.querySelectorAll('img, svg, .ws-tile, [data-lcs-model]')) {
        const b = el.getBoundingClientRect();
        if (b.bottom > cr.bottom + 0.6 || b.top < cr.top - 0.6 || b.right > cr.right + 0.6) r.fails.push(`<${el.tagName.toLowerCase()}> clipped by its card`);
      }
    }
    for (const ch of root.querySelectorAll('[data-lcs-bank-word]')) {
      r.bank.push({ word: ch.dataset.lcsBankWord, vocab: ch.dataset.lcsBank, count: +ch.dataset.lcsCount, rank: +ch.dataset.lcsRank });
      const im = ch.querySelector('img'); if (im) r.minPic = Math.min(r.minPic, im.getBoundingClientRect().height);
      r.minFont = Math.min(r.minFont, parseFloat(getComputedStyle(ch).fontSize));
    }
    const ex = root.querySelector('[data-lcs-kings-example]');
    if (ex) { r.example = ex.dataset.lcsKingsExample; r.exampleKings = ex.dataset.lcsKingsStamp; r.exampleDots = ex.querySelectorAll('[data-lcs-vowel-dot]').length; }
    r.vowels = root.dataset.lcsVowels; r.vowelExtra = root.dataset.lcsVowelextra; r.labels = root.dataset.lcsLabels;
    for (const cell of cellsSeen) { const size = cell - 2; for (const g of ['m', 'w', 'W', 'M', 'Ä', 'Ö', 'Ü', 'Å']) { const k = inkOf(g, size); r.widest[`${g}@${size}`] = +k.adv.toFixed(2); if (k.adv > cell - 2) r.fails.push(`widest glyph ${g} at ${size}px: ${k.adv.toFixed(1)} > ${cell - 2}`); } }
    r.cells = [...cellsSeen];
    // the footer / body containment of the whole grid
    const br = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    for (const el of root.querySelectorAll('.ws-card, .ws-lane, [data-lcs-bank-banner], [data-lcs-kings-example]')) { const b = el.getBoundingClientRect(); if (b.bottom > br.bottom + 0.6) r.fails.push(`<${el.className}> below the body (${Math.round(b.bottom)} > ${Math.round(br.bottom)})`); }
    return r;
  });
}

async function checkFaceRender(page, face, theme, loc, res, tag) {
  const { out, b } = res;
  const label = `${FACE_IDS[face]}/${theme}/${loc}${tag ? '/' + tag : ''}`;
  ok(out.qa.lints.length === 0, `${label}: lints ${out.qa.lints.join(' | ')}`);
  ok(out.qa.verify.length === 0, `${label}: verify ${out.qa.verify.join(' | ')}`);
  const m = await measureFace(page);
  ok(m.face === face, `${label}: page face ${m.face} ≠ ${face} (the knob was not declared)`);
  ok(m.fails.length === 0, `${label}: measure ${m.fails.slice(0, 4).join(' | ')}`);
  ok(m.minPic >= G1_FLOOR, `${label}: picture ${m.minPic} < G1 floor ${G1_FLOOR}`);
  const { d, opts } = faceCfg(face, loc, b);
  const r = facePool(face, loc, theme, b);
  ok(!r.refused, `${label}: rendered a cell the data section records REFUSED (${r.why})`);
  const byKey = new Map(r.pool.map((e) => [e.vocabKey, e]));
  if (face === 'sort') {
    ok(m.bank.length === d.bank, `${label}: ${m.bank.length} bank chips, want ${d.bank}`);
    ok(m.minFont >= 16, `${label}: bank font ${m.minFont} < 16`);
    for (const s of m.bank) { const e = byKey.get(s.vocab); ok(!!e && e.word === s.word && e.count === s.count, `${label}: bank word ${s.vocab}/${s.word} not re-derived from eligible()`); }
    const sorted = m.bank.slice().sort((x, y) => compare(x.word, y.word, loc));
    ok(sorted.map((x) => x.word).join('|') === m.bank.map((x) => x.word).join('|'), `${label}: bank not in collation order (${m.bank.map((x) => x.word).join(',')})`);
    ok(m.bank.every((x, i) => x.rank === i), `${label}: ranks not 0..n`);
    const counts = m.bank.map((x) => x.count);
    ok(!(counts.every((v, i) => i === 0 || v >= counts[i - 1]) || counts.every((v, i) => i === 0 || v <= counts[i - 1])), `${label}: bank grouped by count ${counts.join(',')}`);
    ok(m.labels === (d.cols || [2, 3]).map((n) => String(b.sortLabels[n])).join('|'), `${label}: headings ${m.labels} ≠ sortLabels`);
    const bad = checkStamps(m.bank.map((x) => ({ vocab: x.vocab, word: x.word, split: byKey.get(x.vocab) ? byKey.get(x.vocab).split : [], count: x.count })), loc, { minCount: d.minCount, maxCount: d.maxCount, maxLetters: d.maxLetters, pool: opts.pool }, b);
    ok(bad.length === 0, `${label}: bank stamps ${bad.join(' | ')}`);
  } else {
    ok(m.stamps.length === d.cards, `${label}: ${m.stamps.length} stamps, want ${d.cards} (non-vacuity)`);
    for (const s of m.stamps) {
      const e = byKey.get(s.vocab);
      ok(!!e && e.word === s.word && e.split.join('|') === s.split.join('|') && e.count === s.count, `${label}: stamp ${s.vocab}/${s.word} not re-derived from eligible(${face})`);
    }
    const bad = checkStamps(m.stamps, loc, { minCount: d.minCount, maxCount: d.maxCount, maxLetters: d.maxLetters, pool: opts.pool }, b);
    ok(bad.length === 0, `${label}: stamps ${bad.join(' | ')}`);
    if (face === 'cloze' || face === 'kings') { ok(m.letters > 0 && m.minFont >= 22, `${label}: cell letters ${m.minFont}px < 22 (${m.letters} letters)`); }
    if (face === 'rewrite') ok(m.minFont >= 22, `${label}: model font ${m.minFont} < 22`);
    if (face === 'scramble') {
      ok(m.minTile >= 40 && m.minFont >= 18, `${label}: tiles ${m.minTile}px / font ${m.minFont}px`);
      ok(m.stamps.filter((s) => s.count >= 3).length >= (d.min3 || 0), `${label}: fewer than min3 three-tile rows`);
      for (const s of m.stamps) { const o = s.order.split(',').map(Number); ok(o[0] !== 0 && !o.every((v, k) => v === k), `${label}: order ${s.order} starts with the true first syllable`); }
    }
    if (face === 'kings') {
      ok(m.vowels === VOWELS[loc] && (m.vowelExtra || '') === (b.vowelExtra || []).join('|'), `${label}: stamped vowels "${m.vowels}"/"${m.vowelExtra}" ≠ letter-knowledge ${VOWELS[loc]} + bank extra`);
      for (const s of m.stamps) {
        let at = 0; const exp = s.split.map((sy) => { const k = spec.kingRuns(sy, VOWELS[loc], b.vowelExtra || [])[0]; const o = (at + k.at) + ':' + k.len; at += [...sy].length; return o; }).join('|');
        ok(s.kings === exp, `${label}: kings ${s.kings} ≠ ${exp} for ${s.word}`);
      }
      const ap = approvedByKey(loc); const ex = ap.get(b.example.vocabKey);
      ok(!!ex && m.example && m.example.toLocaleLowerCase(loc) === ex.word.toLocaleLowerCase(loc) && texAgreed(ex) && ex.count >= 2 && ex.count <= 3, `${label}: example ${m.example} is not the bank's approved texPool word`);
      ok(m.exampleDots === (ex ? ex.count : -1), `${label}: example dots ${m.exampleDots} ≠ ${ex && ex.count}`);
      ok(!m.stamps.some((s) => s.word === m.example), `${label}: the example word is on a card`);
    }
    if (face === 'cloze') for (const s of m.stamps) { const bl = [...s.split[+s.blank]].length; ok(bl >= opts.blankLen[0] && bl <= opts.blankLen[1], `${label}: blank syllable "${s.split[+s.blank]}" outside ${opts.blankLen.join('-')}`); }
  }
  return m;
}

const FACE_LONG = {
  title: 'Syllable Practice with Picture Words for the Whole Class to Share Today',
  instruction: 'Say each picture word out loud and clap its parts with a friend. Then do what the page asks for every word, and check the whole page again before you hand it in.',
};
/** The render plan: (face, theme, loc) for the exemplar + (full run) every shipping wave theme per locale rendered. */
function facePlan(rec) {
  const plan = [
    ['rewrite', 'animals', 'en'], ['cloze', 'animals', 'en'], ['sort', 'zoo animals', 'en'],
    ['scramble', 'zoo animals', 'de'], ['scramble', 'At the Supermarket', 'es'], ['kings', 'animals', 'de'], ['kings', 'around the house', 'nl'],
  ];
  if (!QUICK) {
    for (const face of Object.keys(FACE_IDS)) for (const loc of ['en', 'de', 'es', 'nl']) for (const theme of THEMES) {
      if (plan.some((p) => p[0] === face && p[1] === theme && p[2] === loc)) continue;
      if (loc !== 'en' && !SYNTH[loc]) continue;
      if (rec[`${face}|${theme}|${loc}`].refused) continue;
      plan.push([face, theme, loc]);
    }
  }
  return plan;
}

// ---------------------------------------------------------------- G. FACE POISONS
async function sectionFacePoisons(page, poison) {
  console.log('\n== G. FACE POISONS (each must FAIL; the correct render is the control) ==');
  const dom = async (name, res, mutate, re) => {
    await page.reload({ waitUntil: 'networkidle0' });
    await page.evaluate(mutate);
    const v = await spec.verify(page);
    poison(name, v.some((x) => re.test(x)), v.find((x) => re.test(x)) || v[0]);
  };
  const clean = async (name) => { await page.reload({ waitUntil: 'networkidle0' }); const v = await spec.verify(page); ok(v.length === 0, `control after ${name} reload is clean: ${v.join(';')}`); };
  // -- cloze
  let res = await renderFace(page, 'cloze', 'animals', 'en', { tag: 'poison' });
  ok(res.out.qa.verify.length === 0, 'cloze poison control render is clean');
  await dom('cloze: a length-proportional box', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="cloze"]'); const bx = st.querySelector('[data-lcs-blank]'); bx.setAttribute('width', +st.dataset.lcsBlanklen * +st.dataset.lcsCell - 4); }, /not exactly 4 cells/);
  await dom('cloze: two blank boxes', res, () => { const bx = document.querySelector('rect[data-lcs-blank]'); bx.parentNode.appendChild(bx.cloneNode(true)); }, /blank boxes, want exactly 1/);
  await dom('cloze: the missing syllable printed as text', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="cloze"]'); const sp = document.createElement('span'); sp.textContent = st.dataset.lcsSplit.split('|')[+st.dataset.lcsBlank]; st.appendChild(sp); }, /missing syllable .* is printed|visible text/);
  await dom('cloze: a solid (undashed) box', res, () => { document.querySelector('rect[data-lcs-blank]').removeAttribute('stroke-dasharray'); }, /not dashed/);
  await dom('cloze: a 5-letter blank (outside 2-4)', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="cloze"]'); st.dataset.lcsBlanklen = '5'; }, /outside 2-4|blank stamp/);
  await dom('cloze: an arc zone on the cloze face', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="cloze"]'); const d = document.createElement('div'); d.innerHTML = '<svg data-lcs-arcs="0" data-lcs-arcmode="blank" width="10" height="10"></svg>'; st.appendChild(d.firstChild); }, /arc zone on the cloze/);
  await clean('cloze');
  // -- scramble (synthetic de)
  res = await renderFace(page, 'scramble', 'zoo animals', 'de', { tag: 'poison' });
  ok(res.out.qa.verify.length === 0, 'scramble poison control render is clean');
  await dom('scramble: tiles in word order (identity)', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="scramble"]'); const row = st.querySelector('.ws-tilerow'); [...row.children].sort((a, b) => +a.dataset.lcsTile - +b.dataset.lcsTile).forEach((t) => row.appendChild(t)); st.dataset.lcsOrder = [...row.children].map((t) => t.dataset.lcsTile).join(','); }, /identity|true first/);
  await dom('scramble: the first tile is the true first syllable (3 tiles)', res, () => { const st = [...document.querySelectorAll('.ws-card-stage[data-lcs-face="scramble"]')].find((s) => +s.dataset.lcsCount === 3); const row = st.querySelector('.ws-tilerow'); const first = [...row.children].find((t) => t.dataset.lcsTile === '0'); row.insertBefore(first, row.firstChild); st.dataset.lcsOrder = [...row.children].map((t) => t.dataset.lcsTile).join(','); }, /true first syllable/);
  await dom('scramble: a foreign tile (multiset ≠ split)', res, () => { document.querySelector('.ws-tile').textContent = 'xy'; }, /≠ syllable|multiset/);
  await dom('scramble: a separated form written on the page', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="scramble"]'); const sp = document.createElement('span'); sp.textContent = st.dataset.lcsSplit.replace(/\|/g, '-'); document.querySelector('[data-lcs-body]').appendChild(sp); }, /separated form/);
  await dom('scramble: a writing row removed', res, () => { document.querySelector('[data-lcs-writerow]').innerHTML = ''; }, /no writing row/);
  await clean('scramble');
  const deCfg = faceCfg('scramble', 'de', SYNTH.de);
  let r = checkStamps([{ vocab: 'acorn', word: 'acorn', split: approvedByKey('en').get('acorn').split, count: approvedByKey('en').get('acorn').count }], 'en', { minCount: 2, maxCount: 3, maxLetters: 11, pool: deCfg.opts.pool }, bank('syllable-split', 'en'));
  poison('scramble: en acorn (rule-only) on the tex face', r.some((x) => /TeX/.test(x)), r[0]);
  let threw = null;
  try { FACE_SPECS.scramble.build({ theme: 'animals', difficulty: 2, locale: 'en' }, { rng: makeRng('G1-327|poison|1') }); } catch (e) { threw = e.message; }
  poison('scramble: en animals (0 three-syllable texPool words) builds', /REFUSED/.test(threw || '') && /min3/.test(threw), threw);
  // -- sort
  res = await renderFace(page, 'sort', 'zoo animals', 'en', { tag: 'poison' });
  ok(res.out.qa.verify.length === 0, 'sort poison control render is clean');
  await dom('sort: 5:3 bank', res, () => { const ch = [...document.querySelectorAll('[data-lcs-bank-word]')].find((c) => c.dataset.lcsCount === '3'); ch.dataset.lcsCount = '2'; }, /words of 3 syllables|words of 2 syllables/);
  await dom('sort: bank grouped by count', res, () => { const bk = document.querySelector('[data-lcs-bank-banner]'); const ch = [...bk.children].sort((a, b) => +a.dataset.lcsCount - +b.dataset.lcsCount); ch.forEach((c, i) => { c.dataset.lcsRank = i; bk.appendChild(c); }); }, /grouped by count/);
  // out of collation order with the ranks RESTAMPED: the browser check trusts the rank stamps (it cannot
  // require collation.js), so this one must be caught by the node-side re-derivation the render check runs
  {
    await page.reload({ waitUntil: 'networkidle0' });
    await page.evaluate(() => { const bk = document.querySelector('[data-lcs-bank-banner]'); bk.appendChild(bk.firstElementChild); [...bk.children].forEach((c, i) => { c.dataset.lcsRank = i; }); });
    const m = await measureFace(page);
    const sorted = m.bank.slice().sort((x, y) => compare(x.word, y.word, 'en'));
    const nodeFails = sorted.map((x) => x.word).join('|') !== m.bank.map((x) => x.word).join('|');
    poison('sort: bank out of collation order (ranks restamped) — node-side re-derivation', nodeFails, m.bank.map((x) => x.word).join(','));
  }
  await dom('sort: heading ≠ sortLabels', res, () => { document.querySelector('[data-lcs-col-label]').textContent = 'two syllables'; }, /sortLabels/);
  await dom('sort: a printed answer on a ruling', res, () => { const svg = document.querySelector('[data-lcs-ruling-row] svg'); const t = document.createElementNS('http://www.w3.org/2000/svg', 'text'); t.textContent = 'bi-son'; t.setAttribute('x', 8); t.setAttribute('y', 40); svg.appendChild(t); }, /carries text|separated form/);
  await dom('sort: a count printed beside a word', res, () => { const ch = document.querySelector('[data-lcs-bank-word]'); const sp = document.createElement('span'); sp.textContent = ch.dataset.lcsCount; ch.appendChild(sp); }, /chip text|prints .* texts/);
  await clean('sort');
  threw = null;
  try { FACE_SPECS.sort.build({ theme: 'animals', difficulty: 2, locale: 'en' }, { rng: makeRng('G1-328|poison|1') }); } catch (e) { threw = e.message; }
  poison('sort: en animals (14:3) builds', /REFUSED/.test(threw || '') && /three-syllable/.test(threw), threw);
  // the node-side collation re-derivation (the browser check trusts the rank stamps; this one does not)
  {
    const mBank = [{ word: 'zebra', vocab: 'zebra', count: 2, rank: 0 }, { word: 'bison', vocab: 'bison', count: 2, rank: 1 }];
    const sorted = mBank.slice().sort((x, y) => compare(x.word, y.word, 'en'));
    poison('sort: node-side collation (zebra before bison)', sorted.map((x) => x.word).join('|') !== mBank.map((x) => x.word).join('|'), 'collation says bison < zebra');
  }
  // -- kings (synthetic de)
  res = await renderFace(page, 'kings', 'animals', 'de', { tag: 'poison' });
  ok(res.out.qa.verify.length === 0, 'kings poison control render is clean');
  await dom('kings: a wrong kings stamp', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="kings"]'); st.dataset.lcsKings = st.dataset.lcsKings.replace(/^\d+/, (m) => String(+m + 1)); }, /kings .* ≠ re-derived/);
  await dom('kings: an arc shifted off its syllable', res, () => { const p = document.querySelector('.ws-card-stage[data-lcs-face="kings"] path'); p.setAttribute('d', p.getAttribute('d').replace(/M\s*([\d.]+)/, (m, x) => 'M ' + (+x + 10))); }, /arc 1 spans/);
  await dom('kings: a vowel dot on a card', res, () => { const az = document.querySelector('.ws-card-stage[data-lcs-face="kings"] [data-lcs-arcmode]'); const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('cx', 20); c.setAttribute('cy', 8); c.setAttribute('r', 5); c.setAttribute('data-lcs-vowel-dot', '1'); az.appendChild(c); }, /vowel dot on a card/);
  await dom('kings: the example word also on a card', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="kings"]'); st.dataset.lcsWord = document.querySelector('[data-lcs-kings-example]').dataset.lcsKingsExample; }, /example word is also on a card|split .* ≠ word|cell letters/);
  await dom('kings: blank arcs (the split not printed)', res, () => { const az = document.querySelector('.ws-card-stage[data-lcs-face="kings"] [data-lcs-arcmode]'); az.dataset.lcsArcmode = 'blank'; }, /must be printed/);
  await dom('kings: a two-run syllable stamped on a card', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="kings"]'); st.dataset.lcsWord = 'Aua'; st.dataset.lcsSplit = 'au|a'; st.dataset.lcsCount = '2'; st.dataset.lcsKings = '0:2|2:1'; st.querySelector('[data-lcs-prim="syllable-word"]').dataset.lcsCells = '3'; }, /no single vowel run|cell letters|kings/);
  await dom('kings: the example without its dots', res, () => { document.querySelectorAll('[data-lcs-vowel-dot]').forEach((d) => d.remove()); }, /vowel dots for/);
  await clean('kings');
  threw = null;
  try { FACE_SPECS.kings.build({ theme: 'animals', difficulty: 2, locale: 'en' }, { rng: makeRng('G1-329|poison|1') }); } catch (e) { threw = e.message; }
  poison('kings: en (bank kings:false) builds', /REFUSED/.test(threw || '') && /kings:false/.test(threw), threw);
  threw = null;
  try { FACE_SPECS.kings._buildWith({ ...SYNTH.de, example: { vocabKey: 'dog' } }, { theme: 'animals', difficulty: 2, locale: 'de' }, { rng: makeRng('G1-329|poison|2') }); } catch (e) { threw = e.message; }
  poison('kings: a one-syllable example (de Hund)', /REFUSED/.test(threw || '') && /example/.test(threw), threw);
  threw = null;
  try { FACE_SPECS.kings._buildWith({ ...SYNTH.de, example: { vocabKey: 'acorn' } }, { theme: 'animals', difficulty: 2, locale: 'de' }, { rng: makeRng('G1-329|poison|2') }); } catch (e) { threw = e.message; }
  ok(threw === null, 'control: de Eichel (ei-chel, TeX-agreed, one king per syllable) is a valid example: ' + threw);
  {
    // a two-run example: an approved 2-3 syllable texPool word with a syllable holding two vowel runs — search the de file
    const ap = approvedByKey('de');
    const twoRun = [...ap.values()].find((e) => texAgreed(e) && e.count >= 2 && e.count <= 3 && /^\p{L}+$/u.test(e.word) && e.split.some((sy) => spec.kingRuns(sy.toLocaleLowerCase('de'), VOWELS.de, []).length !== 1));
    if (twoRun) {
      threw = null;
      try { FACE_SPECS.kings._buildWith({ ...SYNTH.de, example: { vocabKey: twoRun.key } }, { theme: 'animals', difficulty: 2, locale: 'de' }, { rng: makeRng('G1-329|poison|3') }); } catch (e) { threw = e.message; }
      poison(`kings: a two-run example (de ${twoRun.word} ${twoRun.split.join('-')})`, /REFUSED/.test(threw || '') && /king-eligible/.test(threw), threw);
    } else {
      // MEASURED: every de 2-3-syllable texPool word is king-eligible, so no real word can poison the example's
      // run rule here; the rule itself is poisoned on a card ("a two-run syllable stamped on a card") and the
      // node-side filter is exercised by the pools of every locale in section E (the kings column).
      const all = [...ap.values()].filter((e) => texAgreed(e) && e.count >= 2 && e.count <= 3).length;
      ok(all > 100, `kings: de texPool 2-3-syllable words measured (${all}) — none has a two-run syllable, the example poison has no real specimen`);
      console.log(`  (kings: de texPool holds ${all} 2-3-syllable words, 100 % king-eligible — the two-run example poison has no real specimen; the card-level one stands)`);
    }
  }
  // -- rewrite
  res = await renderFace(page, 'rewrite', 'animals', 'en', { tag: 'poison' });
  ok(res.out.qa.verify.length === 0, 'rewrite poison control render is clean');
  await dom('rewrite: a tick in the hyphen lane', res, () => { const svg = document.querySelector('[data-lcs-hyphen-lane] svg'); const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', 'M 60,10 L 60,50'); p.setAttribute('stroke', '#C8BFAE'); p.setAttribute('data-lcs-tick', '1'); svg.appendChild(p); }, /tick or text in the hyphen lane/);
  await dom('rewrite: model ≠ word', res, () => { document.querySelector('[data-lcs-model]').textContent = 'kola'; }, /model .* ≠ word/);
  await dom('rewrite: a separated form printed', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="rewrite"]'); const sp = document.createElement('span'); sp.textContent = st.dataset.lcsSplit.replace(/\|/g, '-'); st.appendChild(sp); }, /separated form|visible text/);
  await dom('rewrite: a writing row removed', res, () => { document.querySelector('[data-lcs-hyphen-lane]').innerHTML = ''; }, /no hyphen lane|writing rows/);
  await dom('rewrite: an arc zone on the rewrite face', res, () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="rewrite"]'); const d = document.createElement('div'); d.innerHTML = '<svg data-lcs-arcs="0" data-lcs-arcmode="blank" width="10" height="10"></svg>'; st.appendChild(d.firstChild); }, /arc zone on the rewrite/);
  await clean('rewrite');
  // -- the knob: a face row without its knob resolves to the base (faceOf), i.e. it is the base wearing a title
  poison('a face config without its knob is the base', spec.faceOf({ ...spec.difficulty[2], cards: 6, cols: 1, rows: 6 }) === 'base' && spec.faceOf(FACE_SPECS.rewrite.difficulty[2]) === 'rewrite', 'faceOf() reads the knob, not the shape');
}

// ---------------------------------------------------------------- main
(async () => {
  const t0 = Date.now();
  const record = sectionData();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let poisonsOk = false;
  try {
    console.log('\n== B. RENDER (real pipeline) ==');
    const jobs = [];
    for (const d of [1, 2, 3]) jobs.push({ theme: EXEMPLAR, d });
    if (!QUICK) {
      for (const theme of THEMES) for (const d of [1, 2, 3]) if (theme !== EXEMPLAR && !record[`${theme}|d${d}|en`].refused) jobs.push({ theme, d });
      for (let e = 2; e <= EPOCHS; e++) jobs.push({ theme: EXEMPLAR, d: 2, epoch: e });
    }
    const widest = {};
    for (const job of jobs) {
      const out = await renderJob(page, job);
      const m = await checkRender(page, job, out);
      Object.assign(widest, m.widest);
      console.log(`  ${(job.theme + '/d' + job.d + (job.epoch ? '/e' + job.epoch : '')).padEnd(30)} words ${m.stamps.map((s) => s.word).join(',')}  cells ${m.cells.join('/')}  long ${m.long}  body ${m.body}px  maxAdv ${(m.maxAdvRatio * 100).toFixed(0)}% of cell−2`);
    }
    console.log('  widest-glyph advances (px): ' + Object.entries(widest).map(([k, v]) => k + '=' + v).join(' '));
    // refused cells must refuse in the real build too
    for (const d of [1, 2, 3]) for (const theme of THEMES) {
      if (!record[`${theme}|d${d}|en`].refused) continue;
      let threw = null;
      try { spec.build({ theme, difficulty: d, locale: 'en' }, { rng: require('../lib/rng.js').makeRng('G1-305|refuse-check|7') }); } catch (e) { threw = e.message; }
      ok(/REFUSED/.test(threw || ''), `${theme}/d${d}: recorded REFUSED but build() did not refuse`);
    }

    console.log('\n== C. CHROME — three-line title + three-line instruction (the 722 px body) ==');
    for (const d of [1, 2, 3]) {
      const out = await renderJob(page, { theme: EXEMPLAR, d, tag: 'longchrome', strings: LONG_STRINGS });
      const m = await checkRender(page, { theme: EXEMPLAR, d, tag: 'longchrome' }, out);
      const lines = await page.evaluate(() => [document.querySelector('[data-lcs-title]').getBoundingClientRect().height, document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height].map(Math.round));
      ok(lines[0] >= 90 && lines[1] >= 60, `longchrome/d${d}: chrome did not wrap to three lines (title ${lines[0]}, instruction ${lines[1]})`);
      console.log(`  d${d}: body ${m.body}px (title ${lines[0]}px, instruction ${lines[1]}px), picture ≥ ${m.minPic}px, arc ≥ ${m.minArc}px`);
    }

    // ---------------------------------------------------------------- the faces
    const frec = sectionFaceData();
    console.log('\n== F. FACE RENDER (real pipeline; en where the face ships in en, else a SYNTHETIC block through _buildWith) ==');
    for (const [face, theme, loc] of facePlan(frec)) {
      const res = await renderFace(page, face, theme, loc);
      const m = await checkFaceRender(page, face, theme, loc, res);
      const words = face === 'sort' ? m.bank.map((x) => x.word) : m.stamps.map((s) => s.word);
      console.log(`  ${(FACE_IDS[face] + ' ' + face + '/' + theme + '/' + loc).padEnd(44)} body ${m.body}px pic ≥ ${m.minPic}  ${words.join(',')}${m.cells.length ? '  cells ' + m.cells.join('/') : ''}`);
      if (!QUICK && loc === 'en' || (!QUICK && face !== 'sort' && loc !== 'en' && theme === facePlan(frec).find((p) => p[0] === face && p[2] === loc)[1])) {
        for (let e = 2; e <= EPOCHS; e++) { const r2 = await renderFace(page, face, theme, loc, { epoch: e }); await checkFaceRender(page, face, theme, loc, r2, 'e' + e); }
      }
    }
    console.log('\n== F2. FACE CHROME — three-line title + three-line instruction on every face ==');
    for (const [face, theme, loc] of [['rewrite', 'animals', 'en'], ['cloze', 'animals', 'en'], ['sort', 'zoo animals', 'en'], ['scramble', 'zoo animals', 'de'], ['kings', 'animals', 'de']]) {
      const res = await renderFace(page, face, theme, loc, { tag: 'longchrome', strings: FACE_LONG });
      const m = await checkFaceRender(page, face, theme, loc, res, 'longchrome');
      const lines = await page.evaluate(() => [document.querySelector('[data-lcs-title]').getBoundingClientRect().height, document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height].map(Math.round));
      ok(lines[0] >= 90 && lines[1] >= 60, `${face}/longchrome: chrome did not wrap to three lines (title ${lines[0]}, instruction ${lines[1]})`);
      console.log(`  ${(FACE_IDS[face] + ' ' + face).padEnd(20)} body ${m.body}px (title ${lines[0]}, instruction ${lines[1]}), picture ≥ ${m.minPic}px${m.minTile < 1e9 ? ', tiles ≥ ' + m.minTile : ''}`);
    }
    // refused face cells must refuse in the real build too (en, real bank)
    for (const face of Object.keys(FACE_IDS)) for (const theme of THEMES) {
      if (!frec[`${face}|${theme}|en`].refused) continue;
      let threw = null;
      try { FACE_SPECS[face].build({ theme, difficulty: 2, locale: 'en' }, { rng: makeRng(FACE_IDS[face] + '|refuse-check|7') }); } catch (e) { threw = e.message; }
      ok(/REFUSED/.test(threw || ''), `${face}/${theme}/en: recorded REFUSED but build() did not refuse`);
    }

    poisonsOk = await sectionPoisons(page);
  } finally {
    await browser.close();
  }
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  if (fails.length) console.log('\nFAILS:\n  ' + fails.join('\n  '));
  const verdict = fails.length === 0 && poisonsOk;
  console.log(`\n${ID} gate: ${asserts} assertions, ${fails.length} failed, poisons ${poisonsOk ? 'all killed' : 'SURVIVOR'} (${POISONS.killed}/${POISONS.total}), ${secs}s → ${verdict ? 'PASS' : 'FAIL'}`);
  console.log(`${verdict ? 'PASS' : 'FAIL'} (${asserts} assertions, ${POISONS.killed}/${POISONS.total} poisons killed)`);
  process.exit(verdict ? 0 : 1);
})().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
