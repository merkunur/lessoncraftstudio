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
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const spec = require('../types/g1/G1-305-syllable-split.js');
const { approvedByKey, texAgreed, daStrict, bank } = require('../lib/b3-common.js');

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
  const poison = (name, failed, detail) => { total++; if (failed) killed++; console.log(`  ${failed ? 'KILLED  ' : 'SURVIVED'} ${name}${detail ? '  — ' + detail : ''}`); };
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
  console.log(`  poisons ${killed}/${total} killed`);
  return killed === total;
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

    poisonsOk = await sectionPoisons(page);
  } finally {
    await browser.close();
  }
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  if (fails.length) console.log('\nFAILS:\n  ' + fails.join('\n  '));
  const verdict = fails.length === 0 && poisonsOk;
  console.log(`\n${ID} gate: ${asserts} assertions, ${fails.length} failed, poisons ${poisonsOk ? 'all killed' : 'SURVIVOR'}, ${secs}s → ${verdict ? 'PASS' : 'FAIL'}`);
  process.exit(verdict ? 0 : 1);
})().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
