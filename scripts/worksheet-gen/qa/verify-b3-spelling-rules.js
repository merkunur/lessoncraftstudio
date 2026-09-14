#!/usr/bin/env node
/**
 * verify-b3-spelling-rules.js — the G2-315 `spelling-rules` gate (design §5).
 *
 *   node qa/verify-b3-spelling-rules.js [--quick] [--epochs=N]
 *
 * Four sections, exit 1 on any real failure OR any silent poison:
 *
 *  A. DATA (node, no browser) — the bank validator (design §5 rules 1-11 as
 *     they apply to the base) over EVERY rule of the EN bank, re-deriving
 *     each stamped gap from the rule regex (diff, not trust): the word is the
 *     vocab display word of its key and joins approved-words-en.json, the
 *     picture is a colour-index candidate (no BW marker), the gap slices
 *     concatenate to `g` ∈ cands, `g` sits where the regex fires exactly
 *     once (split rules: two one-letter boxes, the second on the final e),
 *     the frame is UNIQUE against the WHOLE locale pool for every candidate,
 *     models are not items, foils carry no candidate, contrast items carry
 *     pair[1], the excluded family is absent, proof forms derive, the case
 *     rule, the title/instruction guards, the chip graphemes, ≤ 12 letters;
 *     then the pool record per rule × d1-3 (≥ 10 or REFUSED, never filled).
 *     Non-vacuity: 0 items checked = FAIL.
 *
 *  B. RENDER (the REAL pipeline, render/render-instance.js — fonts load only
 *     from file://) — the exemplar rule at d1-3, every other rule at d2 (all
 *     three levels + a seed-epoch sweep unless --quick), each with the `unit`
 *     the wave would pass: lints clean, verify() empty, the G2 element floor
 *     (picture ≥ 36 px, chips ≥ 36, model pictures ≥ 36) and the type's own
 *     floors (cell ≥ 24, letters ≥ 22 px), node-side re-derivation of every
 *     stamped word + gap through `eligible()` and the bank literal, the rule
 *     box models === the bank's first N, and the Baloo 2 advance / ink
 *     measurement of every printed letter AND of the widest glyph set
 *     (m w W M Ä Ö Ü Å) at every cell used (design "Risks").
 *
 *  C. CHROME — a three-line title + three-line instruction (the README's
 *     722 px body) at d1-3: lints clean, verify() clean (card containment,
 *     the picture shrinks to ≥ 36).
 *
 *  D. POISONS — every case design §5 lists that applies to the base, each
 *     must FAIL against the same checker that passed the correct bank/page
 *     (the control): P1 frame not unique · P2 gap not at the rule grapheme ·
 *     P3 proof form does not derive · P4 model is an item · P5 foil carries
 *     the rule grapheme · P7 excluded family · P8 gap width leaks the answer
 *     (a per-card box at the fixed-width level) · P9 magic e needs two gaps;
 *     P6 (bins line count) is a Face-4 case and runs in D2. Plus the DOM
 *     poisons on a real render (a printed gap letter · a model word on a card
 *     · a wrong card count · a duplicate word · a coral letter · a text node
 *     printing a card word · a chip outside cands) and the refusals (a short
 *     pool · an unauthored unit · a locale without a bank block · fewer
 *     models than the config) — and a 30 px W in a 24 cell.
 *
 *  PHASE 2 (2026-09-14) — the five faces (G2-324 choice · G2-325 detective ·
 *  G2-326 bins · G2-327 anchor · G2-328 plural; types/g2, rows in
 *  tools/b3var-rows/spelling-rules.js):
 *  A2. the face bank rules (pairHead on pair rules; `not[]` needs a why; the
 *      `gap.kind:'plural'` rule: plural = the vocab plural, ONE gap on the plural
 *      at the changed grapheme where the regex fires once, derives by `stem`,
 *      frame-unique, refuses the base + every gap face, ≥ 6 pairs; one string
 *      block per face, titles unique in the family, en === the spec) + the
 *      face × rule record (REFUSED cells reported, never filled) + the
 *      per-face exemplar (exemplarFor === the face spec's unit axis).
 *  B2. every face rendered through the real pipeline at d2 en on its exemplar
 *      (+ every other carrying rule unless --quick): lints/verify clean, the G2
 *      floors, Baloo 2 advance/ink on every printed letter, every stamped
 *      word/gap/cell re-derived node-side from the face pool + the bank literal,
 *      the title carries rule.head / rule.pairHead on ONE line; a seed sweep;
 *      every REFUSED (face, rule) cell throws at build.
 *  C2. the 722 px chrome per face.
 *  D2. face poisons: bank (PF1-10) · build refusals (magic e on choice/bins/
 *      plural, the plural rule on the base/detective, ai-ay's 2 contrast words,
 *      five k words, 7 pairs, a model without a plural) · DOM per face (P8 per-
 *      card box width, chip order/sides/labels, coral on detective, a gap box on
 *      detective, a filled copy box, P6 four lines for 8 words, unequal line
 *      counts, a pill printing its word, swapped bin labels, a 7/1 membership, a
 *      written-on ruling, a missing scaffold box, an ink rule letter, a non-rule
 *      letter printed, the plural as a text node, a gap on an unchanged span, a
 *      missing clone, a model without its lead, a changed singular letter, a
 *      foreign clone, a narrower plural box) — each judged on ITS message.
 *  Final line: PASS (N assertions, M/M poisons killed) | FAIL.
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const spec = require('../types/g2/G2-315-spelling-rules.js');
const { bank: loadBank, approvedByKey } = require('../lib/b3-common.js');
const { vocab, excluded, displayWord } = require('../lib/b2-common.js');
const { pictureIndex, candidates } = require('../lib/b3-picture-index.js');
const { makeRng } = require('../lib/rng.js');

const ID = 'G2-315';
const KEY = 'spelling-rules';
const OUT = path.join(__dirname, '..', 'out', 'dev');
const G2_FLOOR = 36;
const CELL_MIN = 24;
const BW_MARK = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)\b/;
const WORKSHEET_WORD = /worksheet|arbeitsblatt|hoja de trabajo|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtäväsivu/i;

const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.slice(n.length + 3) : d; };
const QUICK = flags.has('--quick');
const EPOCHS = +arg('epochs', 3);

let asserts = 0, fails = [];
function ok(cond, msg) { asserts++; if (!cond) fails.push(msg); return !!cond; }

// ---------------------------------------------------------------- the pool + the frame test
/** The whole locale pool of pictured display words (frame uniqueness runs against THIS, never the rule's items). */
function poolWords(loc) {
  const v = vocab(); const idx = pictureIndex(); const set = new Set();
  for (const key of idx.keys()) {
    if (excluded(key, loc)) continue;
    const e = v[key] && v[key][loc]; if (!e || !e[0]) continue;
    const w = e[0].toLocaleLowerCase(loc);
    if (/^\p{L}+$/u.test(w)) set.add(w);
  }
  return set;
}
/** The word with its gap letters replaced by candidate c (one gap: pre+c+post whatever c's length; several: c split across the gaps by len). */
function frameWith(word, gaps, c) {
  const L = [...word];
  if (gaps.length === 1) return L.slice(0, gaps[0].from).join('') + c + L.slice(gaps[0].from + gaps[0].len).join('');
  const total = gaps.reduce((s, g) => s + g.len, 0);
  const cl = [...c];
  if (cl.length !== total) return null;
  let at = 0; const out = L.slice();
  for (const g of gaps) for (let i = 0; i < g.len; i++) out[g.from + i] = cl[at++];
  return out.join('');
}
// K-287 isRegular: en = prefix; elsewhere the folded stem (all but the last letter) carries over
function isRegular(sing, plur, loc) {
  const s = sing.toLocaleLowerCase(loc), p = plur.toLocaleLowerCase(loc);
  if (p === s) return false;
  if (loc === 'en') return p.startsWith(s);
  const fold = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return fold(p).startsWith(fold(s).slice(0, Math.max(2, [...s].length - 1)));
}

/**
 * The bank validator for ONE locale block (design §5 rules 1-11 as they apply
 * to the base). `env` may override the data doors (poisons): {vocab, approved,
 * candidates(key,loc), pool:Set}. Returns findings[]; each starts with a
 * stable reason so a poison is judged on ITS message, never on "some failure".
 */
function validateBank(b, loc, env) {
  const out = [];
  const E = Object.assign({ vocab: vocab(), approved: approvedByKey(loc), candidates: (k, l) => candidates(k, l), pool: poolWords(loc) }, env || {});
  let checked = 0;
  if (!b || !b.rules || !Object.keys(b.rules).length) return ['bank: no rules'];
  if (!b.rules[b.exemplar]) out.push(`bank: exemplar "${b.exemplar}" is not a rule`);
  const exclRe = b.exclude && b.exclude.re ? new RegExp(b.exclude.re, 'u') : null;
  const s = b.strings && b.strings[ID];
  if (!s || !s.title || !s.instruction) out.push('strings: G2-315 title/instruction missing');
  else {
    if ([...s.title].length > 70) out.push(`strings: title > 70 chars (${[...s.title].length})`);
    if (WORKSHEET_WORD.test(s.title)) out.push('strings: title carries the worksheet word');
    if ([...s.instruction].length > 150) out.push(`strings: instruction > 150 chars`);
    if (!/[.!?…]$/.test(s.instruction.trim())) out.push('strings: instruction has no end mark');
  }
  for (const [id, r] of Object.entries(b.rules)) {
    const tag = `${loc}/${id}`;
    if (!r.gap || !r.gap.re || !Array.isArray(r.cands) || !r.cands.length) { out.push(`${tag}: gap.re / cands missing`); continue; }
    let re; try { re = new RegExp(r.gap.re, 'gu'); } catch (e) { out.push(`${tag}: regex does not compile`); continue; }
    const split = r.gap.boxes === 'split';
    const pluralKind = r.gap.kind === 'plural';   // a Face-6 rule: its gaps sit on the PLURAL and are checked by validateFaces
    // (10) chip graphemes in cands
    for (const chip of String(r.chip || '').split(/\s+/).filter(Boolean)) {
      if (!r.cands.includes(chip.replace(/_/g, ''))) out.push(`${tag}: chip "${chip}" not in cands`);
    }
    const modelWords = new Set((r.models || []).map((m) => m.word));
    const itemWords = new Set();
    const checkWordPic = (it, role) => {
      const v = E.vocab[it.vocabKey] && E.vocab[it.vocabKey][loc];
      if (!v || !v[0]) { out.push(`${tag}: ${role} "${it.word}": no vocab entry for key ${it.vocabKey}`); return false; }
      if (displayWord(v[0], loc, b.capital) !== it.word) out.push(`${tag}: ${role} "${it.word}" is not the vocab display word of ${it.vocabKey} ("${displayWord(v[0], loc, b.capital)}")`);
      const a = E.approved.get(it.vocabKey);
      if (!a || a.word.toLocaleLowerCase(loc) !== it.word.toLocaleLowerCase(loc)) out.push(`${tag}: ${role} "${it.word}": not approved (approved-words-${loc})`);
      if (!it.theme || !it.noun) out.push(`${tag}: ${role} "${it.word}": no pinned picture`);
      else {
        if (BW_MARK.test(it.theme)) out.push(`${tag}: ${role} "${it.word}": BW theme ${it.theme}`);
        if (!E.candidates(it.vocabKey, loc).some((c) => c.theme === it.theme && c.noun === it.noun)) out.push(`${tag}: ${role} "${it.word}": picture ${it.theme}/${it.noun} is not a colour-index candidate`);
      }
      // (9) the case rule
      if ((loc === 'de') !== /^\p{Lu}/u.test(it.word)) out.push(`${tag}: ${role} "${it.word}": case rule (${loc}) violated`);
      return true;
    };
    const checkGaps = (it, role) => {
      const low = it.word.toLocaleLowerCase(loc);
      const L = [...low]; const n = L.length;
      if (!Array.isArray(it.gaps) || !it.gaps.length) { out.push(`${tag}: ${role} "${it.word}": no gaps`); return; }
      for (const g of it.gaps) if (!(g.from >= 0 && g.len >= 1 && g.from + g.len <= n)) { out.push(`${tag}: ${role} "${it.word}": gap out of range`); return; }
      if (loc === 'de' && it.gaps.some((g) => g.from === 0)) out.push(`${tag}: ${role} "${it.word}": de gap in the capital cell`);
      // (2) slices → g ∈ cands
      const gg = it.gaps.map((g) => L.slice(g.from, g.from + g.len).join('')).join('');
      if (gg !== String(it.g).toLocaleLowerCase(loc)) out.push(`${tag}: ${role} "${it.word}": gap slices "${gg}" ≠ g "${it.g}"`);
      if (!r.cands.includes(gg)) out.push(`${tag}: ${role} "${it.word}": g "${gg}" not in cands`);
      // (3) g === the FIRST (and only) match of the regex
      re.lastIndex = 0;
      const ms = [...low.matchAll(re)];
      if (ms.length !== 1) out.push(`${tag}: ${role} "${it.word}": rule grapheme occurs ${ms.length}× (want 1)`);
      else {
        const at = [...low.slice(0, ms[0].index)].length, mlen = [...ms[0][0]].length;
        if (split) {
          if (it.gaps.length !== 2 || it.gaps[0].len !== 1 || it.gaps[1].len !== 1 || it.gaps[1].from !== n - 1) out.push(`${tag}: ${role} "${it.word}": magic e needs two gaps (the vowel + the final e), got ${JSON.stringify(it.gaps)}`);
          else if (it.gaps[0].from !== at) out.push(`${tag}: ${role} "${it.word}": gap not at the rule grapheme (regex fires at ${at}, gap at ${it.gaps[0].from})`);
        } else if (it.gaps.length !== 1 || it.gaps[0].from !== at || it.gaps[0].len !== mlen) {
          out.push(`${tag}: ${role} "${it.word}": gap not at the rule grapheme (regex ${at}:${mlen}, gap ${it.gaps.map((g) => g.from + ':' + g.len).join(',')})`);
        }
      }
      // (4) frame uniqueness against the WHOLE locale pool, every candidate
      for (const c of r.cands) {
        if (c === gg) continue;
        const alt = frameWith(low, it.gaps, c);
        if (alt && alt !== low && E.pool.has(alt)) out.push(`${tag}: ${role} "${it.word}": frame not unique — "${alt}" is also a pool word`);
      }
      // (11) ≤ 12 letters
      if (n > 12) out.push(`${tag}: ${role} "${it.word}": ${n} letters > 12`);
    };
    for (const m of r.models || []) { checked++; checkWordPic(m, 'model'); if (!pluralKind) checkGaps(m, 'model'); }
    for (const it of r.items || []) {
      checked++;
      if (!checkWordPic(it, 'item')) continue;
      if (!pluralKind) checkGaps(it, 'item');
      if (itemWords.has(it.word)) out.push(`${tag}: item "${it.word}": duplicate`);
      itemWords.add(it.word);
      // (7) models are not items
      if (modelWords.has(it.word)) out.push(`${tag}: model is an item — "${it.word}"`);
      // (5) contrast items carry pair[1]
      if (it.side === 'contrast' && (!r.pair || String(it.g).toLocaleLowerCase(loc) !== r.pair[1])) out.push(`${tag}: item "${it.word}": side contrast but g "${it.g}" ≠ pair[1]`);
      // P7 excluded family
      if (exclRe && exclRe.test(it.word.toLocaleLowerCase(loc))) out.push(`${tag}: item "${it.word}": excluded family (${b.exclude.re})`);
      // (6) proof / plural derive (regex rules with a proof; plural-kind rules derive in validateFaces)
      if (!pluralKind && r.proof && r.proof.kind === 'plural' && it.plural) {
        const pre = new RegExp(r.proof.re, 'u');
        if (!pre.test(it.plural.toLocaleLowerCase(loc)) || !isRegular(it.word, it.plural, loc)) out.push(`${tag}: item "${it.word}": proof form does not derive ("${it.plural}" vs ${r.proof.re})`);
      }
    }
    // (5) foils carry no candidate
    for (const f of r.foils || []) {
      checked++;
      checkWordPic(f, 'foil');
      const low = f.word.toLocaleLowerCase(loc);
      re.lastIndex = 0;
      if (re.test(low) || r.cands.some((c) => low.includes(c))) out.push(`${tag}: foil carries the rule grapheme — "${f.word}"`);
      if (itemWords.has(f.word) || modelWords.has(f.word)) out.push(`${tag}: foil "${f.word}" is an item/model`);
    }
    // (8) floors — REFUSED, reported, never filled
    if ((r.items || []).length < 10) out.push(`${tag}: ${(r.items || []).length} items < 10 — the base is REFUSED for this rule`);
    if ((r.foils || []).length < 2) out.push(`${tag}: ${(r.foils || []).length} foils < 2 (F3 d3 refused)`);
  }
  if (!checked) out.push('bank: 0 items checked (vacuous)');
  return out;
}

function cfgFor(d) { const c = spec.difficulty[d]; return { minLetters: c.minLetters, maxLetters: c.maxLetters, gapCells: c.gapCells }; }

// ---------------------------------------------------------------- A. DATA
function sectionData(en) {
  console.log('\n== A. DATA — the EN bank validator + the pool record per rule × level ==');
  const bad = validateBank(en, 'en');
  ok(bad.length === 0, 'EN bank validator: ' + bad.slice(0, 6).join(' | '));
  const nItems = Object.values(en.rules).reduce((s, r) => s + r.items.length, 0);
  console.log(`  validator: ${nItems} items + ${Object.values(en.rules).reduce((s, r) => s + r.models.length + r.foils.length, 0)} models/foils over ${Object.keys(en.rules).length} rules → ${bad.length} findings`);
  const record = {};
  for (const id of Object.keys(en.rules)) {
    const line = [id.padEnd(10)];
    for (const d of [1, 2, 3]) {
      const c = spec.difficulty[d];
      const pool = spec.eligible('en', id, { ...cfgFor(d), bank: en });
      const floor = Math.max(c.cards, c.minPool || 0);
      const refused = pool.length < floor || en.rules[id].models.length < c.models;
      record[`${id}|d${d}`] = { pool: pool.length, refused };
      line.push(`d${d}:${String(pool.length).padStart(3)}${refused ? '✗' : ' '}`);
      // every pooled item re-checked: gaps agree with the bank literal, cells within the row
      const byWord = new Map(en.rules[id].items.map((it) => [it.word, it]));
      const badPool = pool.filter((it) => { const lit = byWord.get(it.word); return !lit || JSON.stringify(lit.gaps) !== JSON.stringify(it.gaps) || it.cells > 12 || it.cells * spec.cellFor(it.cells, c.cellMax) > 296; });
      ok(badPool.length === 0 && (refused || pool.length >= floor), `${id}/d${d}: pool ${pool.length} (${badPool.map((x) => x.word).join(',')})`);
    }
    console.log('  ' + line.join(' '));
  }
  ok(!record['magic-e|d1'].refused && !record['magic-e|d2'].refused && !record['magic-e|d3'].refused, 'the exemplar (magic-e) ships at d1-3');
  ok(record['floss|d3'].refused, 'floss d3 (≥ 6 letters, 3-cell box) is REFUSED on the measured pool (8 < 10)');
  ok([1, 2, 3].every((d) => record[`y-ies-f-ves|d${d}`].refused), 'the plural-form rule (y-ies-f-ves) is REFUSED on the base at every level');
  console.log('  REFUSED cells: ' + Object.entries(record).filter(([, v]) => v.refused).map(([k]) => k).join(', '));
  return record;
}

// ---------------------------------------------------------------- B/C. RENDER
async function renderJob(page, job) {
  return renderInstance({
    type: spec, theme: null, difficulty: job.d, locale: 'en', unit: job.unit || null, page, outDir: OUT,
    baseName: `${ID}-gate-${job.tag || (job.unit || 'exemplar')}-d${job.d}-en${job.epoch ? '-e' + job.epoch : ''}`,
    strings: job.strings, seedEpoch: job.epoch || 1,
  });
}

/** In-page measurements: floors, glyph advance + ink containment, stamps, body height. */
async function measurePage(page) {
  return page.evaluate(() => {
    const r = { fails: [], stamps: [], models: [], chips: [], cells: new Set(), minPic: 1e9, minChip: 1e9, minModelPic: 1e9, minFont: 1e9, maxAdvRatio: 0, letters: 0, body: 0, widest: {} };
    const root = document.querySelector('[data-lcs-type="G2-315"]');
    r.rule = root.dataset.lcsRule; r.cards = +root.dataset.lcsCards;
    r.body = Math.round(document.querySelector('[data-lcs-body]').getBoundingClientRect().height);
    r.title = root.ownerDocument.querySelector('[data-lcs-title]') ? root.ownerDocument.querySelector('[data-lcs-title]').textContent.trim() : '';
    const c = document.createElement('canvas'); const ctx = c.getContext('2d');
    const inkOf = (ch, size) => { ctx.font = `700 ${size}px 'Baloo 2'`; const m = ctx.measureText(ch); return { adv: m.width, asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent, fa: m.fontBoundingBoxAscent, fd: m.fontBoundingBoxDescent }; };
    for (const ch of root.querySelectorAll('[data-lcs-chip]')) { const b = ch.getBoundingClientRect(); r.minChip = Math.min(r.minChip, b.width, b.height); r.chips.push(ch.dataset.lcsChip); }
    for (const p of root.querySelectorAll('[data-lcs-model]')) { r.models.push(p.dataset.lcsModel); const b = p.querySelector('img').getBoundingClientRect(); r.minModelPic = Math.min(r.minModelPic, b.width, b.height); }
    for (const st of root.querySelectorAll('.ws-card-stage[data-lcs-face="base"]')) {
      r.stamps.push({ vocab: st.dataset.lcsVocab, word: st.dataset.lcsWord, gap: st.dataset.lcsGap, cell: +st.dataset.lcsCell, cells: +st.dataset.lcsCells });
      const img = st.querySelector('img'); const ir = img.getBoundingClientRect();
      r.minPic = Math.min(r.minPic, ir.width, ir.height);
      const ws = st.querySelector('[data-lcs-prim="gap-word"]');
      const cell = +ws.dataset.lcsCell, size = +ws.dataset.lcsFontpx, h = ws.getBoundingClientRect().height;
      r.cells.add(cell); r.minFont = Math.min(r.minFont, size);
      for (const t of ws.querySelectorAll('text')) {
        r.letters++;
        const adv = t.getComputedTextLength();
        r.maxAdvRatio = Math.max(r.maxAdvRatio, adv / (cell - 2));
        if (adv > cell - 2) r.fails.push(`"${t.textContent}" advance ${adv.toFixed(1)} > cell−2 (${cell - 2})`);
        const y = +t.getAttribute('y'); const k = inkOf(t.textContent, size);
        const base = y + (k.fa - k.fd) / 2;
        if (base - k.asc < 0 || base + k.desc > h) r.fails.push(`"${t.textContent}" ink ${(base - k.asc).toFixed(1)}..${(base + k.desc).toFixed(1)} outside the ${h} box`);
      }
    }
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

async function checkRender(page, job, out, en) {
  const tag = `${job.tag || job.unit || 'magic-e'}/d${job.d}${job.epoch ? '/e' + job.epoch : ''}`;
  ok(out.qa.lints.length === 0, `${tag}: lints ${out.qa.lints.join(' | ')}`);
  ok(out.qa.verify.length === 0, `${tag}: verify ${out.qa.verify.join(' | ')}`);
  const m = await measurePage(page);
  const d = spec.difficulty[job.d];
  const unit = job.unit || en.exemplar;
  const rule = en.rules[unit];
  ok(m.fails.length === 0, `${tag}: measure ${m.fails.slice(0, 4).join(' | ')}`);
  ok(m.rule === unit, `${tag}: rule stamp ${m.rule} ≠ ${unit}`);
  ok(m.minPic >= G2_FLOOR, `${tag}: picture ${m.minPic} < G2 floor ${G2_FLOOR}`);
  ok(m.minChip >= G2_FLOOR, `${tag}: chip ${m.minChip} < ${G2_FLOOR}`);
  ok(d.models === 0 || m.minModelPic >= G2_FLOOR, `${tag}: model picture ${m.minModelPic} < ${G2_FLOOR}`);
  ok(m.minFont >= 22, `${tag}: letters ${m.minFont} px < 22`);
  ok(m.cells.every((c) => c >= CELL_MIN), `${tag}: a cell below ${CELL_MIN} (${m.cells.join('/')})`);
  ok(m.letters > 0 && m.stamps.length === d.cards, `${tag}: ${m.stamps.length} stamps / ${m.letters} letters (non-vacuity)`);
  ok(m.chips.join(' ') === rule.chip, `${tag}: chips "${m.chips.join(' ')}" ≠ bank "${rule.chip}"`);
  ok(m.models.join(',') === rule.models.slice(0, d.models).map((x) => x.word).join(','), `${tag}: models ${m.models.join(',')} ≠ bank first ${d.models}`);
  ok(m.title.includes(rule.head), `${tag}: title "${m.title}" does not carry the rule head "${rule.head}"`);
  // node-side re-derivation: every stamped word is in eligible() with the bank literal gaps
  const pool = spec.eligible('en', unit, { ...cfgFor(job.d), bank: en });
  const byKey = new Map(pool.map((e) => [e.vocabKey, e]));
  for (const s of m.stamps) {
    const e = byKey.get(s.vocab);
    const litGap = e && e.gaps.map((g) => g.from + ':' + g.len).join(',');
    ok(!!e && e.word === s.word && litGap === s.gap && e.cells === s.cells && spec.cellFor(e.cells, d.cellMax) === s.cell, `${tag}: stamp ${s.vocab}/${s.word} gap ${s.gap} cell ${s.cell} not re-derived from eligible()`);
  }
  return m;
}

const LONG_STRINGS = {
  title: 'Spelling Rules Practice Sheet: {UNIT} Words for the Whole Class Today',
  instruction: 'Read the rule in the box out loud with a friend. Say each picture word slowly, then write the missing rule letters in the dashed boxes, and check the whole page again before you hand it in.',
};

// ---------------------------------------------------------------- D. POISONS
function clone(x) { return JSON.parse(JSON.stringify(x)); }

let killed = 0, total = 0;
const poison = (name, findings, re) => {
  total++;
  const hit = (findings || []).find((x) => re.test(x));
  if (hit) killed++;
  console.log(`  ${hit ? 'KILLED  ' : 'SURVIVED'} ${name}${hit ? '  — ' + hit : (findings && findings.length ? '  — WRONG REASON: ' + findings[0] : '  — SILENT')}`);
};

async function sectionPoisons(page, en) {
  console.log('\n== D. POISONS (each must FAIL on ITS message; the correct bank/page is the control) ==');
  const ctl = validateBank(en, 'en');
  ok(ctl.length === 0, 'poison control: the EN bank passes the validator: ' + ctl.join(';'));
  const pool = poolWords('en');
  const item = (rule, word) => en.rules[rule].items.find((i) => i.word === word);

  // P1 frame not unique: `cap` gapped at the vowel under a rule whose cands include u while `cup` is a pool word
  ok(pool.has('cup') && pool.has('cap'), 'P1 premise: cap and cup are both pool words');
  let b = clone(en);
  b.rules['vowel-x'] = { id: 'vowel-x', head: 'x', chip: 'a u', band: 'G2', gap: { kind: 'regex', re: '(?<=c)[au](?=p)', boxes: 'wide' }, cands: ['a', 'u'], pair: null, proof: null, models: [],
    items: [{ ...item('c-k-ck', 'cap'), gaps: [{ from: 1, len: 1 }], g: 'a', side: 'rule' }], foils: [], refuse: {} };
  poison('P1 cap with u in cands while cup is in the pool', validateBank(b, 'en'), /frame not unique/);
  // P2 gap not at the rule grapheme (the de Sonne/S class): en cake gapped at 0
  b = clone(en); b.rules['magic-e'].items[0] = { ...item('magic-e', 'gate'), gaps: [{ from: 0, len: 1 }, { from: 3, len: 1 }], g: 'ge' };
  poison('P2 gate gapped at cell 0 (g "ge")', validateBank(b, 'en'), /gap not at the rule grapheme/);
  b = clone(en); b.rules['c-k-ck'].items[0] = { ...item('c-k-ck', 'cap'), gaps: [{ from: 1, len: 1 }], g: 'a' };
  poison('P2b cap gapped at the vowel (single-gap rule)', validateBank(b, 'en'), /gap not at the rule grapheme/);
  // P3 proof form does not derive (nl schaap/schepen class): an en plural proof with a stem that does not carry
  // (the control keeps only the items whose vocab plural is the regular -s form: candy/candies, peas/peas are honest irregulars)
  const regularS = (bk) => { bk.rules['c-k-ck'].proof = { kind: 'plural', re: 's$' }; bk.rules['c-k-ck'].items = bk.rules['c-k-ck'].items.filter((i) => i.plural && /s$/.test(i.plural) && isRegular(i.word, i.plural, 'en')); return bk; };
  b = regularS(clone(en)); b.rules['c-k-ck'].items[0].plural = 'kittens';
  poison(`P3 ${b.rules['c-k-ck'].items[0].word} with plural "kittens" under a plural proof`, validateBank(b, 'en'), /proof form does not derive .*kittens/);
  const p3ctl = regularS(clone(en));
  ok(p3ctl.rules['c-k-ck'].items.length >= 10 && validateBank(p3ctl, 'en').length === 0, 'P3 control: the regular vocab plurals derive under a plural proof');
  // P4 model is an item
  b = clone(en); b.rules['magic-e'].items.push({ ...b.rules['magic-e'].models[0], side: 'rule', plural: null, pluralGap: null });
  poison('P4 model cake also in items', validateBank(b, 'en'), /model is an item/);
  // P5 foil carries the rule grapheme
  const duckPic = candidates('duck', 'en')[0];
  b = clone(en); b.rules['c-k-ck'].foils[0] = { theme: duckPic.theme, noun: duckPic.noun, vocabKey: 'duck', word: 'duck' };
  poison('P5 foil duck under c/k/ck', validateBank(b, 'en'), /foil carries the rule grapheme/);
  // P6 — Face 4 (bins): runs as a DOM poison in D2 (sectionFacePoisons), not on the base
  console.log('  (D2)     P6 bins with 4 lines for a 4/4 split — a Face-4 DOM poison, see D2');
  // P7 excluded family
  const dino = candidates('ankylosaurus', 'en')[0];
  ok(!!dino, 'P7 premise: ankylosaurus has a colour picture');
  b = clone(en); b.rules['c-k-ck'].items.push({ theme: dino.theme, noun: dino.noun, vocabKey: 'ankylosaurus', word: 'ankylosaurus', gaps: [{ from: 2, len: 1 }], g: 'k', side: 'rule', plural: null, pluralGap: null });
  poison('P7 ankylosaurus under c/k/ck', validateBank(b, 'en'), /excluded family/);
  // P9 magic e with ONE gap {from:1,len:3}
  b = clone(en); b.rules['magic-e'].items[0] = { ...item('magic-e', 'gate'), gaps: [{ from: 1, len: 3 }], g: 'ate' };
  poison('P9 gate with one gap 1:3', validateBank(b, 'en'), /magic e needs two gaps/);
  // more validator poisons: a not-approved word · a wrong picture · a BW theme · a chip outside cands
  b = clone(en); b.rules['magic-e'].items[0] = { ...item('magic-e', 'gate'), word: 'gase', vocabKey: 'gate' };
  poison('a word that is not the vocab word (gate → "gase")', validateBank(b, 'en'), /not the vocab display word/);
  b = clone(en); b.rules['magic-e'].items[0] = { ...item('magic-e', 'gate'), theme: 'animals bw', noun: 'gate' };
  poison('a BW theme pinned', validateBank(b, 'en'), /BW theme|not a colour-index candidate/);
  b = clone(en); b.rules['ee-ea'].chip = 'ee ea oo';
  poison('a chip outside cands (oo)', validateBank(b, 'en'), /chip "oo" not in cands/);

  // build-time refusals
  const rng = () => makeRng('G2-315|poison|1');
  let threw = null;
  try { spec.build({ theme: null, difficulty: 3, locale: 'en', unit: 'floss' }, { rng: rng() }); } catch (e) { threw = e.message; }
  poison('floss d3 (pool 8 < 10) builds', [threw || ''], /REFUSED/);
  threw = null;
  try { spec.build({ theme: null, difficulty: 2, locale: 'en', unit: 'ss-sz' }, { rng: rng() }); } catch (e) { threw = e.message; }
  poison('an unauthored unit (ss-sz) builds', [threw || ''], /not in the bank/);
  threw = null;
  try { spec.build({ theme: null, difficulty: 2, locale: 'de' }, { rng: rng() }); } catch (e) { threw = e.message; }
  poison('a locale without a bank block (de) builds', [threw || ''], /no de block/);
  threw = null;
  b = clone(en); b.rules['magic-e'].models = b.rules['magic-e'].models.slice(0, 1);
  try { spec._buildWith(b, { difficulty: 1, locale: 'en', unit: null }, { rng: rng() }); } catch (e) { threw = e.message; }
  poison('one model under a 3-model config builds', [threw || ''], /models < 3/);
  threw = null;
  b = clone(en); b.rules['magic-e'].items[0] = { ...item('magic-e', 'gate'), theme: 'animals', noun: 'gate' };
  try { spec._buildWith(b, { difficulty: 2, locale: 'en', unit: null }, { rng: makeRng('G2-315|poison|gate') }); } catch (e) { threw = e.message; }
  // the poisoned item may not be sampled by this seed — try a few seeds until it is (the guard is per rendered item)
  for (let k = 0; k < 40 && !threw; k++) { try { spec._buildWith(b, { difficulty: 2, locale: 'en', unit: null }, { rng: makeRng('G2-315|poison|gate|' + k) }); } catch (e) { threw = e.message; } }
  poison('a picture that is not a colour-index candidate renders', [threw || ''], /not a colour-index candidate/);

  // DOM poisons on real renders: d1 (len boxes) and d3 (fixed 3-cell boxes)
  const outD1 = await renderJob(page, { d: 1, tag: 'poison' });
  ok(outD1.qa.verify.length === 0 && outD1.qa.lints.length === 0, 'DOM-poison control render (d1) is clean');
  const dom = async (name, mutate, re) => {
    await page.reload({ waitUntil: 'networkidle0' });
    await page.evaluate(mutate);
    const v = await spec.verify(page);
    poison(name, v, re);
  };
  await dom('a gap letter printed inside its box', () => {
    const st = document.querySelector('.ws-card-stage[data-lcs-face="base"]');
    const ws = st.querySelector('[data-lcs-prim="gap-word"]');
    const g = st.dataset.lcsGap.split(',')[0].split(':').map(Number);
    const t = ws.querySelector('text').cloneNode(true); t.textContent = [...st.dataset.lcsWord][g[0]]; ws.appendChild(t);
  }, /printed letters .* ≠ word minus gaps/);
  await dom('a model word stamped onto a card', () => {
    const st = document.querySelector('.ws-card-stage[data-lcs-face="base"]');
    const m = document.querySelector('[data-lcs-model]').dataset.lcsModel;
    st.dataset.lcsWord = m; st.dataset.lcsGap = document.querySelector('[data-lcs-model]').dataset.lcsModelGaps;
  }, /is a model word/);
  await dom('a wrong card count stamp', () => { document.querySelector('[data-lcs-type="G2-315"]').dataset.lcsCards = '5'; }, /want 5/);
  await dom('a duplicate word', () => {
    const st = [...document.querySelectorAll('.ws-card-stage[data-lcs-face="base"]')];
    st[1].innerHTML = st[0].innerHTML; for (const k of Object.keys(st[0].dataset)) st[1].dataset[k] = st[0].dataset[k];
  }, /duplicate/);
  await dom('a coral (answer-coloured) letter on a card', () => {
    document.querySelector('[data-lcs-prim="gap-word"] text').setAttribute('fill', '#F2784B');
  }, /coral letter/);
  await dom('a text node printing a card word beside the box', () => {
    const st = document.querySelector('.ws-card-stage[data-lcs-face="base"]');
    const sp = document.createElement('span'); sp.textContent = st.dataset.lcsWord; document.querySelector('[data-lcs-rulebox]').appendChild(sp);
  }, /prints a card word/);
  await dom('a chip outside cands', () => { const c = document.querySelector('[data-lcs-chip]'); c.dataset.lcsChip = 'oo'; c.textContent = 'oo'; }, /not a candidate/);
  await dom('a gap moved off the rule grapheme (stamp)', () => {
    const st = [...document.querySelectorAll('.ws-card-stage[data-lcs-face="base"]')].find((s) => +s.dataset.lcsGap.split(':')[0] > 0);
    const gaps = st.dataset.lcsGap.split(',').map((x) => x.split(':').map(Number)); gaps[0][0] -= 1; st.dataset.lcsGap = gaps.map((g) => g.join(':')).join(',');
  }, /not at the rule grapheme|split rule needs|printed letters/);
  await page.reload({ waitUntil: 'networkidle0' });
  ok((await spec.verify(page)).length === 0, 'DOM-poison control after reload (d1) is clean');
  // P8 at d3: one box shrunk to its grapheme length (the per-card width leak)
  const outD3 = await renderJob(page, { d: 3, tag: 'poison' });
  ok(outD3.qa.verify.length === 0 && outD3.qa.lints.length === 0, 'DOM-poison control render (d3) is clean');
  await dom('P8 a gap box one cell wide at the fixed-width level', () => {
    const st = document.querySelector('.ws-card-stage[data-lcs-face="base"]');
    const cell = +st.dataset.lcsCell; const b = st.querySelector('[data-lcs-gapbox]');
    b.setAttribute('width', cell - 2);
  }, /gap width leaks the answer/);
  await page.reload({ waitUntil: 'networkidle0' });
  ok((await spec.verify(page)).length === 0, 'DOM-poison control after reload (d3) is clean');
  // a 30 px W in a 24 cell
  const adv = await page.evaluate(() => { const c = document.createElement('canvas').getContext('2d'); c.font = "700 30px 'Baloo 2'"; return c.measureText('W').width; });
  poison(`a 30 px W (${adv.toFixed(1)}) in a 24 cell`, [adv > 22 ? 'advance > cell−2' : ''], /advance/);
  ok(adv < 30, 'poison premise: the real Baloo 2 loaded (W at 30 px measures < 30)');
  console.log(`  base poisons ${killed}/${total} killed`);
  return killed === total;
}

// ================================================================ PHASE 2 — the five faces (2026-09-14)
const { loadType } = require('../lib/load-types.js');
const FACE_IDS = { choice: 'G2-324', detective: 'G2-325', bins: 'G2-326', anchor: 'G2-327', plural: 'G2-328' };
const FACES = Object.keys(FACE_IDS);
const faceSpec = (face) => loadType(FACE_IDS[face]);

/** The plural-form rule checks (design §5 rules 2/3/4/6 on the PLURAL) for one item/model; findings pushed to out. */
function checkPluralItem(b, loc, r, it, role, out, E, tag) {
  const v = E.vocab[it.vocabKey] && E.vocab[it.vocabKey][loc];
  if (!it.plural) { out.push(`${tag}: ${role} "${it.word}": no plural`); return; }
  if (v && v[1] && displayWord(v[1], loc, b.capital) !== it.plural) out.push(`${tag}: ${role} "${it.word}": plural "${it.plural}" is not the vocab plural ("${displayWord(v[1], loc, b.capital)}")`);
  const lp = it.plural.toLocaleLowerCase(loc), ls = it.word.toLocaleLowerCase(loc);
  if (!/^\p{L}+$/u.test(lp)) out.push(`${tag}: ${role} "${it.word}": plural not letters only`);
  if (lp === ls) out.push(`${tag}: ${role} "${it.word}": plural equals the singular`);
  const re = new RegExp(r.gap.re, 'gu');
  const L = [...lp], n = L.length;
  if (!Array.isArray(it.gaps) || it.gaps.length !== 1) { out.push(`${tag}: ${role} "${it.word}": a plural-form item needs ONE gap on the plural`); return; }
  const g0 = it.gaps[0];
  if (!(g0.from >= 0 && g0.len >= 1 && g0.from + g0.len <= n)) { out.push(`${tag}: ${role} "${it.word}": gap out of range on the plural`); return; }
  const gg = L.slice(g0.from, g0.from + g0.len).join('');
  if (gg !== String(it.g).toLocaleLowerCase(loc)) out.push(`${tag}: ${role} "${it.word}": gap slices "${gg}" ≠ g "${it.g}"`);
  if (!r.cands.includes(gg)) out.push(`${tag}: ${role} "${it.word}": g "${gg}" not in cands`);
  const ms = [...lp.matchAll(re)];
  if (ms.length !== 1) out.push(`${tag}: ${role} "${it.word}": rule grapheme occurs ${ms.length}× in the plural (want 1)`);
  else {
    const at = [...lp.slice(0, ms[0].index)].length, mlen = [...ms[0][0]].length;
    if (g0.from !== at || g0.len !== mlen) out.push(`${tag}: ${role} "${it.word}": gap not at the rule grapheme (regex ${at}:${mlen}, gap ${g0.from}:${g0.len})`);
  }
  // the gap span DIFFERS from the singular at that position (the plural changes the spelling there)
  const S = [...ls];
  if (S.slice(g0.from, g0.from + g0.len).join('') === gg) out.push(`${tag}: ${role} "${it.word}": gap span "${gg}" unchanged from the singular — the gap does not sit at the change`);
  // derivation: singular minus `stem` is a prefix of the plural and the rest is g (K-287 isRegular with the folded stem carried)
  if (r.gap.stem) {
    const stem = ls.replace(new RegExp(r.gap.stem, 'u'), '');
    if (stem === ls || !lp.startsWith(stem) || lp.slice(stem.length) !== gg) out.push(`${tag}: ${role} "${it.word}": proof form does not derive ("${it.plural}" ≠ stem "${stem}" + "${gg}")`);
  }
  if (r.proof && r.proof.kind === 'plural' && !new RegExp(r.proof.re, 'u').test(lp)) out.push(`${tag}: ${role} "${it.word}": proof form does not derive (${r.proof.re})`);
  // frame uniqueness on the plural frame
  for (const c of r.cands) {
    if (c === gg) continue;
    const alt = frameWith(lp, it.gaps, c);
    if (alt && alt !== lp && E.pool.has(alt)) out.push(`${tag}: ${role} "${it.word}": frame not unique — "${alt}" is also a pool word`);
  }
  if (n > 12) out.push(`${tag}: ${role} "${it.word}": plural ${n} letters > 12`);
}

/** The face-level bank rules (extends validateBank; same env override, same stable reasons). */
function validateFaces(b, loc, env) {
  const out = [];
  const E = Object.assign({ vocab: vocab(), approved: approvedByKey(loc), candidates: (k, l) => candidates(k, l), pool: poolWords(loc) }, env || {});
  let checked = 0;
  for (const [id, r] of Object.entries(b.rules || {})) {
    const tag = `${loc}/${id}`;
    // pair faces need the pair's own head (the {UNIT} of Which One? / Sort)
    if (Array.isArray(r.pair) && r.pair.length === 2 && !(typeof r.pairHead === 'string' && r.pairHead.trim())) out.push(`${tag}: pairHead missing (a pair rule names its opposition for the pair faces)`);
    if (Array.isArray(r.pair) && r.pair.length === 2 && !r.pair.every((p) => r.cands.includes(p))) out.push(`${tag}: pair ${r.pair.join('/')} not in cands`);
    for (const it of r.items || []) {
      if (it.not !== undefined) {
        checked++;
        if (!Array.isArray(it.not) || !it.not.length || !it.not.every((f) => FACES.includes(f))) out.push(`${tag}: item "${it.word}": not[] must name faces (${FACES.join('/')})`);
        if (!(typeof it.why === 'string' && it.why.trim())) out.push(`${tag}: item "${it.word}": not without why`);
      }
    }
    if (r.gap && r.gap.kind === 'plural') {
      if (!r.gap.stem) out.push(`${tag}: a plural-form rule needs gap.stem`);
      for (const f of ['base', 'choice', 'detective', 'bins', 'anchor']) if (!(r.refuse && r.refuse[f])) out.push(`${tag}: a plural-form rule must refuse the ${f} face`);
      for (const m of r.models || []) { checked++; checkPluralItem(b, loc, r, m, 'model', out, E, tag); }
      for (const it of r.items || []) { checked++; checkPluralItem(b, loc, r, it, 'item', out, E, tag); }
      const pairs = (r.items || []).filter((it) => it.plural).length;
      if (pairs < 6) out.push(`${tag}: ${pairs} plural pairs < 6 — the plural face is REFUSED for this rule`);
    }
  }
  // strings: one block per face, title ≤ 70 / no worksheet word / unique in the family, instruction ≤ 150 with an end mark, === the spec's en strings
  const titles = new Map();
  for (const [face, fid] of Object.entries(FACE_IDS)) {
    checked++;
    const s = b.strings && b.strings[fid];
    if (!s || !s.title || !s.instruction) { out.push(`strings: ${fid} (${face}) title/instruction missing`); continue; }
    if ([...s.title].length > 70) out.push(`strings: ${fid} title > 70 chars`);
    if (WORKSHEET_WORD.test(s.title)) out.push(`strings: ${fid} title carries the worksheet word`);
    if ([...s.instruction].length > 150) out.push(`strings: ${fid} instruction > 150 chars`);
    if (!/[.!?…]$/.test(s.instruction.trim())) out.push(`strings: ${fid} instruction has no end mark`);
    const key = s.title.toLocaleLowerCase(loc);
    if (titles.has(key)) out.push(`strings: ${fid} title not unique in the family (= ${titles.get(key)})`);
    titles.set(key, fid);
    if (b.strings[ID] && b.strings[ID].title.toLocaleLowerCase(loc) === key) out.push(`strings: ${fid} title not unique in the family (= the base)`);
    if (loc === 'en') {
      const sp = faceSpec(face);
      if (!sp.i18n || !sp.i18n.en || sp.i18n.en.title !== s.title || sp.i18n.en.instruction !== s.instruction) out.push(`strings: ${fid} en block ≠ the spec's i18n.en (two sources)`);
    }
  }
  if (!checked) out.push('faces: 0 items checked (vacuous)');
  return out;
}

/** The face × rule record: pool sizes or the refusal reason (never filled). */
function faceRecord(en) {
  console.log('\n== A2. FACES — the bank rules for the faces + the face × rule record (REFUSED, never filled) ==');
  const bad = validateFaces(en, 'en');
  ok(bad.length === 0, 'EN face validator: ' + bad.slice(0, 6).join(' | '));
  console.log(`  face validator → ${bad.length} findings`);
  const rec = {};
  for (const face of FACES) {
    const sp = faceSpec(face);
    const d = sp.difficulty[2];
    const line = [face.padEnd(10)];
    for (const id of Object.keys(en.rules)) {
      const r = en.rules[id];
      let why = spec.faceRefusal(r, face), size = null;
      if (!why) {
        try {
          if (face === 'plural') {
            const f = d.form;
            size = spec.eligiblePlural('en', id, { bank: en, maxSingular: f.maxSingular, maxPlural: f.maxPlural, gapCells: f.gapCells, pic: f.pic, clonePx: f.clonePx, singCell: f.singCell, plurCellMax: f.plurCellMax });
            if (size.length < Math.max(f.rows, d.minPool || 0)) why = `pool ${size.length} < ${Math.max(f.rows, d.minPool || 0)}`;
          } else if (face === 'choice' || face === 'bins') {
            const c = face === 'choice' ? d.choice : d.bins;
            const G = face === 'choice' ? Math.max(...r.pair.map((p) => [...p].length)) : 'len';
            const pool = spec.eligible('en', id, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: G, bank: en, rowMax: face === 'choice' ? c.rowMax : undefined, face });
            const A = pool.filter((it) => it.g === r.pair[0]).length, B = pool.filter((it) => it.g === r.pair[1]).length;
            size = [A, B];
            const need = face === 'choice' ? c.sides : [c.split[0], c.split[0]];
            if (A < Math.max(need[0], c.minSide) || B < Math.max(need[1], c.minSide)) why = `sides ${A}/${B} < ${Math.max(need[0], c.minSide)}`;
          } else {
            const pool = spec.eligible('en', id, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: 'len', bank: en, face });
            size = face === 'detective' ? pool.filter((it) => spec.cellFor([...it.word].length, d.cellMax, 302 - 8 - 56) >= CELL_MIN) : pool;
            if (size.length < Math.max(d.cards, d.minPool || 0)) why = `pool ${size.length} < ${Math.max(d.cards, d.minPool || 0)}`;
          }
        } catch (e) { why = e.message; }
      }
      const shown = size === null ? '-' : (typeof size[0] === 'number' ? size.join('/') : String(size.length));
      rec[`${face}|${id}`] = { refused: !!why, why, size: shown };
      line.push(`${id}:${why ? '✗' : shown}`);
    }
    console.log('  ' + line.join('  '));
  }
  // the expected en shape (design §3 + the base bank): magic e has no pair → choice/bins ship on c-k-ck; plural ships on the plural-form rule only
  ok(rec['choice|magic-e'].refused && rec['bins|magic-e'].refused, 'magic e (split rule, pair null) refuses choice + bins');
  ok(!rec['choice|c-k-ck'].refused && !rec['bins|c-k-ck'].refused, 'c-k-ck carries choice + bins');
  ok(rec['choice|ai-ay'].refused && /sides/.test(rec['choice|ai-ay'].why), 'ai-ay refuses choice on its measured contrast side (2 ay words)');
  ok(rec['choice|ee-ea'].refused && rec['choice|floss'].refused, 'ee-ea + floss refuse choice (bank refuse)');
  ok(!rec['detective|magic-e'].refused && !rec['anchor|magic-e'].refused, 'magic e carries detective + anchor');
  ok(!rec['plural|y-ies-f-ves'].refused, 'the plural-form rule carries the plural face');
  ok(['magic-e', 'c-k-ck', 'ee-ea', 'ai-ay', 'floss'].every((id) => rec[`plural|${id}`].refused), 'every gap rule refuses the plural face');
  ok(['choice', 'detective', 'bins', 'anchor'].every((f) => rec[`${f}|y-ies-f-ves`].refused), 'the plural-form rule refuses every gap face');
  for (const face of FACES) ok(spec.exemplarFor(en, face) === faceSpec(face).unitAxis.exemplar('en'), `${face}: the face spec's unit axis resolves the same exemplar as exemplarFor`);
  ok(spec.exemplarFor(en, 'choice') === 'c-k-ck' && spec.exemplarFor(en, 'bins') === 'c-k-ck' && spec.exemplarFor(en, 'plural') === 'y-ies-f-ves' && spec.exemplarFor(en, 'detective') === 'magic-e' && spec.exemplarFor(en, 'anchor') === 'magic-e', 'en face exemplars: choice/bins c-k-ck · detective/anchor magic-e · plural y-ies-f-ves');
  ok(spec.unitAxis.units('en').every((u) => en.rules[u].gap.kind !== 'plural'), 'the base unit axis lists no plural-form rule');
  console.log('  REFUSED cells: ' + Object.entries(rec).filter(([, v]) => v.refused).map(([k, v]) => `${k} (${v.why})`).join(' · '));
  return rec;
}

/** In-page measurement for a face render: every gap-word svg (whatever the face), floors per face. */
async function measureFace(page, face) {
  return page.evaluate((face) => {
    const r = { fails: [], words: [], cells: new Set(), minPic: 1e9, minFont: 1e9, letters: 0, maxAdvRatio: 0, body: 0, widest: {}, title: '', chips: [], models: [], extra: {} };
    const root = document.querySelector('[data-lcs-type="G2-315"]');
    r.face = root.dataset.lcsFace; r.rule = root.dataset.lcsRule; r.spec = root.dataset.lcsSpec;
    r.body = Math.round(document.querySelector('[data-lcs-body]').getBoundingClientRect().height);
    const te = document.querySelector('[data-lcs-title]'); r.title = te ? te.textContent.trim() : ''; r.titleH = te ? Math.round(te.getBoundingClientRect().height) : 0;
    const c = document.createElement('canvas'); const ctx = c.getContext('2d');
    const inkOf = (ch, size) => { ctx.font = `700 ${size}px 'Baloo 2'`; const m = ctx.measureText(ch); return { adv: m.width, asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent, fa: m.fontBoundingBoxAscent, fd: m.fontBoundingBoxDescent }; };
    for (const ch of root.querySelectorAll('[data-lcs-rulebox] [data-lcs-chip]')) r.chips.push(ch.dataset.lcsChip);
    for (const p of root.querySelectorAll('[data-lcs-model]')) r.models.push((p.dataset.lcsModelLead ? p.dataset.lcsModelLead + '→' : '') + p.dataset.lcsModel);
    for (const st of root.querySelectorAll(`.ws-card-stage[data-lcs-face="${face}"]`)) {
      r.words.push({ vocab: st.dataset.lcsVocab, word: st.dataset.lcsWord, plural: st.dataset.lcsPlural || null, gap: st.dataset.lcsGap || st.dataset.lcsRuleAt || '', side: st.dataset.lcsSide || null, cell: +st.dataset.lcsCell, cells: +st.dataset.lcsCells });
      const img = st.querySelector('img'); const ir = img.getBoundingClientRect();
      r.minPic = Math.min(r.minPic, ir.width, ir.height);
    }
    for (const p of root.querySelectorAll('[data-lcs-bank]')) { r.words.push({ vocab: p.dataset.lcsBank, word: p.dataset.lcsWord, gap: '', side: null }); const ir = p.querySelector('img').getBoundingClientRect(); r.minPic = Math.min(r.minPic, ir.width, ir.height); }
    for (const ws of root.querySelectorAll('[data-lcs-prim="gap-word"]')) {
      const cell = +ws.dataset.lcsCell, size = +ws.dataset.lcsFontpx, h = ws.getBoundingClientRect().height;
      r.cells.add(cell); r.minFont = Math.min(r.minFont, size);
      for (const t of ws.querySelectorAll('text')) {
        r.letters++;
        const adv = t.getComputedTextLength();
        r.maxAdvRatio = Math.max(r.maxAdvRatio, adv / (cell - 2));
        if (adv > cell - 2) r.fails.push(`"${t.textContent}" advance ${adv.toFixed(1)} > cell−2 (${cell - 2})`);
        const y = +t.getAttribute('y'); const k = inkOf(t.textContent, size);
        const base = y + (k.fa - k.fd) / 2;
        if (base - k.asc < 0 || base + k.desc > h) r.fails.push(`"${t.textContent}" ink outside the ${h} box`);
      }
    }
    for (const cell of r.cells) {
      const size = cell - 2;
      for (const g of ['m', 'w', 'W', 'M', 'Ä', 'Ö', 'Ü', 'Å']) { const k = inkOf(g, size); r.widest[`${g}@${size}`] = +k.adv.toFixed(2); if (k.adv > cell - 2) r.fails.push(`widest glyph ${g} at ${size}px: ${k.adv.toFixed(1)} > ${cell - 2}`); }
    }
    if (face === 'choice') { const ch = [...root.querySelectorAll('.ws-letter-chip')].map((e) => e.getBoundingClientRect()); r.extra.minChip = Math.min(...ch.map((b) => Math.min(b.width, b.height))); r.extra.cardChips = ch.length; }
    if (face === 'bins') {
      const rows = [...root.querySelectorAll('[data-lcs-bin-row] [data-lcs-prim="writing-row"]')].map((e) => e.getBoundingClientRect());
      r.extra.rows = rows.length; r.extra.minRow = Math.min(...rows.map((b) => b.height));
      const bins = [...root.querySelectorAll('[data-lcs-bin]')].map((e) => e.getBoundingClientRect()); r.extra.binH = Math.round(Math.min(...bins.map((b) => b.height)));
      r.extra.split = [...root.querySelectorAll('[data-lcs-bin]')].map((b) => b.dataset.lcsBin);
    }
    if (face === 'detective') { const cb = [...root.querySelectorAll('[data-lcs-copybox]')].map((e) => e.getBoundingClientRect()); r.extra.boxes = cb.length; r.extra.minBox = Math.min(...cb.map((b) => Math.min(b.width, b.height))); }
    if (face === 'plural') { r.extra.clones = root.querySelectorAll('[data-lcs-clones] img').length; const cl = [...root.querySelectorAll('[data-lcs-clones] img')].map((e) => e.getBoundingClientRect()); r.extra.minClone = Math.min(...cl.map((b) => Math.min(b.width, b.height))); r.extra.maxRight = Math.max(...[...root.querySelectorAll('[data-lcs-wordrow] svg')].map((e) => Math.round(e.getBoundingClientRect().right))); }
    if (face === 'anchor') { r.extra.scaffold = root.querySelectorAll('[data-lcs-scaffoldbox]').length; r.extra.coral = [...root.querySelectorAll('.ws-card text')].filter((t) => (t.getAttribute('fill') || '').toUpperCase() === '#F2784B').length; }
    r.cells = [...r.cells];
    return r;
  }, face);
}

/** Node-side re-derivation of a face render against the bank + the face pool. */
async function checkFace(page, face, out, en, job) {
  const sp = faceSpec(face);
  const d = sp.difficulty[2];
  const tag = `${face}${job.unit ? '/' + job.unit : ''}${job.tag ? '/' + job.tag : ''}`;
  ok(out.qa.lints.length === 0, `${tag}: lints ${out.qa.lints.join(' | ')}`);
  ok(out.qa.verify.length === 0, `${tag}: verify ${out.qa.verify.slice(0, 5).join(' | ')}`);
  const m = await measureFace(page, face);
  const unit = job.unit || spec.exemplarFor(en, face);
  const r = en.rules[unit];
  ok(m.fails.length === 0, `${tag}: measure ${m.fails.slice(0, 4).join(' | ')}`);
  ok(m.face === face && m.rule === unit && m.spec === FACE_IDS[face], `${tag}: root stamps face/rule/spec (${m.face}/${m.rule}/${m.spec})`);
  ok(m.minPic >= G2_FLOOR, `${tag}: picture ${m.minPic} < ${G2_FLOOR}`);
  ok(m.words.length > 0 && (face === 'bins' ? m.chips.length === 2 && m.extra.rows > 0 : m.letters > 0), `${tag}: ${m.words.length} words / ${m.letters} letters (non-vacuity)`);
  ok(m.minFont >= 22 && m.cells.every((c) => c >= CELL_MIN), `${tag}: letters ${m.minFont} px / cells ${m.cells.join('/')} below the floor`);
  const head = (face === 'choice' || face === 'bins') ? r.pairHead : r.head;
  ok(m.title.includes(head), `${tag}: title "${m.title}" does not carry "${head}"`);
  ok(m.titleH > 0 && (job.strings || m.titleH < 70), `${tag}: title wraps (${m.titleH}px) — "${m.title}"`);
  ok(m.models.length === d.models, `${tag}: ${m.models.length} models ≠ ${d.models}`);
  if (face === 'choice' || face === 'bins') {
    const order = spec.chipOrder(r.pair);
    ok(m.chips.join('|') === order.join('|'), `${tag}: rule-box chips ${m.chips.join('|')} ≠ ${order.join('|')}`);
    const G = face === 'choice' ? Math.max(...r.pair.map((p) => [...p].length)) : 'len';
    const pool = spec.eligible('en', unit, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: G, bank: en, rowMax: face === 'choice' ? d.choice.rowMax : undefined, face });
    const byKey = new Map(pool.map((e) => [e.vocabKey, e]));
    for (const w of m.words) {
      const e = byKey.get(w.vocab);
      ok(!!e && e.word === w.word && r.pair.includes(e.g), `${tag}: ${w.vocab}/${w.word} not re-derived from the ${face} pool`);
      if (face === 'choice' && e) ok(w.gap === e.gaps.map((g) => g.from + ':' + g.len).join(',') && w.side === (e.g === r.pair[0] ? 'rule' : 'contrast') && w.cells === e.cells && spec.cellFor(e.cells, d.cellMax, d.choice.rowMax) === w.cell, `${tag}: ${w.word} gap/side/cell stamps`);
    }
    const sides = [m.words.filter((w) => r.pair[0] === (byKey.get(w.vocab) || {}).g).length, m.words.filter((w) => r.pair[1] === (byKey.get(w.vocab) || {}).g).length];
    if (face === 'choice') ok(sides[0] === d.choice.sides[0] && sides[1] === d.choice.sides[1], `${tag}: sides ${sides.join('/')} ≠ ${d.choice.sides.join('/')}`);
    else ok(sides[0] + sides[1] === d.bins.items && sides.every((s) => s >= d.bins.split[0] && s <= d.bins.split[1]), `${tag}: split ${sides.join('/')} outside ${d.bins.split.join('-')}`);
    if (face === 'choice') ok(m.extra.minChip >= d.choice.chipPx - 0.6 && m.extra.cardChips === 2 * d.cards, `${tag}: card chips ${m.extra.cardChips} @ ${m.extra.minChip}`);
    if (face === 'bins') ok(m.extra.rows === 2 * d.bins.rows && m.extra.minRow >= d.bins.rowH - 0.6 && m.extra.split.join('|') === order.join('|'), `${tag}: bins rows ${m.extra.rows} @ ${m.extra.minRow}, heads ${m.extra.split.join('|')}`);
  } else if (face === 'plural') {
    const f = d.form;
    const pool = spec.eligiblePlural('en', unit, { bank: en, maxSingular: f.maxSingular, maxPlural: f.maxPlural, gapCells: f.gapCells, pic: f.pic, clonePx: f.clonePx, singCell: f.singCell, plurCellMax: f.plurCellMax });
    const byKey = new Map(pool.map((e) => [e.vocabKey, e]));
    for (const w of m.words) {
      const e = byKey.get(w.vocab);
      ok(!!e && e.word === w.word && e.plural === w.plural && w.gap === e.gaps.map((g) => g.from + ':' + g.len).join(',') && w.cell === e.cell && w.cells === e.cells, `${tag}: ${w.vocab} singular/plural/gap/cell not re-derived from eligiblePlural()`);
    }
    ok(m.words.length === f.rows && m.extra.clones === 3 * f.rows && m.extra.minClone >= f.clonePx - 0.6, `${tag}: ${m.words.length} rows, ${m.extra.clones} clones @ ${m.extra.minClone}`);
    ok(m.models.join(',') === r.models.slice(0, d.models).map((x) => displayWord(x.word, 'en', en.capital) + '→' + displayWord(x.plural, 'en', en.capital)).join(','), `${tag}: models ${m.models.join(',')} ≠ the bank's singular→plural`);
    ok(m.extra.maxRight <= 703 - 14 - 12 - 2 + 0.6, `${tag}: a plural row reaches ${m.extra.maxRight} past the card`);
  } else {
    const pool = spec.eligible('en', unit, { minLetters: d.minLetters, maxLetters: d.maxLetters, gapCells: 'len', bank: en, face });
    const byKey = new Map(pool.map((e) => [e.vocabKey, e]));
    for (const w of m.words) {
      if (w.side === 'foil') { ok(r.foils.some((f) => f.vocabKey === w.vocab && f.word === w.word), `${tag}: foil ${w.word} not in the bank`); continue; }
      const e = byKey.get(w.vocab);
      ok(!!e && e.word === w.word && w.gap === e.gaps.map((g) => g.from + ':' + g.len).join(','), `${tag}: ${w.vocab}/${w.word} gap ${w.gap} not re-derived from the ${face} pool`);
      if (face === 'anchor' && e) ok(w.cell === spec.cellFor([...e.word].length, d.cellMax) && w.cells === [...e.word].length, `${tag}: ${w.word} cell ${w.cell} / cells ${w.cells}`);
      if (face === 'detective' && e) ok(w.cell === spec.cellFor([...e.word].length, d.cellMax, 302 - 8 - 56) && w.cells === [...e.word].length, `${tag}: ${w.word} cell ${w.cell} / cells ${w.cells}`);
    }
    ok(m.models.join(',') === r.models.slice(0, d.models).map((x) => x.word).join(','), `${tag}: models ${m.models.join(',')} ≠ bank first ${d.models}`);
    ok(m.words.length === d.cards, `${tag}: ${m.words.length} cards ≠ ${d.cards}`);
    if (face === 'anchor') ok(m.extra.scaffold > 0 && m.extra.coral === m.letters, `${tag}: ${m.extra.scaffold} scaffold boxes, ${m.extra.coral} coral of ${m.letters} letters`);
    if (face === 'detective') ok(m.extra.boxes === d.cards && m.extra.minBox >= 40, `${tag}: ${m.extra.boxes} copy boxes @ ${m.extra.minBox}`);
    if (face === 'anchor') ok(m.words.every((w) => w.word !== 'neptune'), `${tag}: neptune (not:['anchor']) on an anchor page`);
  }
  return m;
}

async function renderFace(page, face, job) {
  const sp = faceSpec(face);
  return renderInstance({
    type: sp, theme: null, difficulty: 2, locale: 'en', unit: job.unit || null, page, outDir: OUT,
    baseName: `${FACE_IDS[face]}-gate-d2-en${job.unit ? '-u' + job.unit : ''}${job.tag ? '-' + job.tag : ''}${job.epoch ? '-e' + job.epoch : ''}`,
    strings: job.strings, seedEpoch: job.epoch || 1,
  });
}

const FACE_LONG = {
  choice: { title: 'Which One? {UNIT} Practice Sheet for the Whole Class Today and Tomorrow', instruction: 'Look at the picture and read the word out loud with a friend. Circle the right letters under it, then write them in the dashed box, and check the whole page again before you hand it in.' },
  detective: { title: 'Rule Detective: {UNIT} Practice Sheet for the Whole Class Today and Tomorrow', instruction: 'Read each word out loud with a friend. Find the rule letters, circle them in the word, then copy them into the small box, and check the whole page again before you hand it in.' },
  bins: { title: 'Sort by Spelling Rule: {UNIT} Practice Sheet for the Whole Class Today', instruction: 'Say each picture word out loud with a friend. Write it in the bin with its spelling, one word on each line, and check the whole page again before you hand it in to the teacher.' },
  anchor: { title: 'Write the Word: {UNIT} Practice Sheet for the Whole Class Today and Tomorrow', instruction: 'The rule letters are printed in orange. Say the picture word out loud, write all the other letters in the boxes, and check the whole page again before you hand it in.' },
  plural: { title: 'Plurals: {UNIT} Practice Sheet for the Whole Class Today and Tomorrow Morning', instruction: 'Read the word for one out loud with a friend. Write the word for many in the boxes. The plural changes the spelling, so check the whole page again before you hand it in.' },
};

async function sectionFaces(page, en, rec) {
  console.log('\n== B2. FACE RENDERS (real pipeline, d2 en; exemplar + every other carrying rule unless --quick) ==');
  for (const face of FACES) {
    const units = [null, ...(QUICK ? [] : Object.keys(en.rules).filter((id) => id !== spec.exemplarFor(en, face) && !rec[`${face}|${id}`].refused))];
    for (const unit of units) {
      const out = await renderFace(page, face, { unit });
      const m = await checkFace(page, face, out, en, { unit });
      console.log(`  ${(face + (unit ? '/' + unit : '')).padEnd(20)} words ${m.words.map((w) => w.word + (w.plural ? '→' + w.plural : '')).join(',')}  cells ${m.cells.join('/')}  pic ≥ ${Math.round(m.minPic)}  body ${m.body}px  title "${m.title}"${m.extra.binH ? '  bin ' + m.extra.binH + 'px' : ''}`);
    }
    // seed sweep (node-side): the face builds under every seed and varies
    const sets = new Set(); let built = 0;
    for (let e = 1; e <= (QUICK ? 6 : 12); e++) {
      const sp = faceSpec(face);
      const rr = sp._buildWith(en, { difficulty: 2, locale: 'en', unit: null }, { rng: makeRng(`${FACE_IDS[face]}|sweep|${e}`) });
      sets.add(rr.meta.words.slice().sort().join(',')); built++;
    }
    ok(built > 0 && sets.size >= 2, `${face}: seed sweep ${sets.size} distinct word sets over ${built} seeds`);
    console.log(`  ${face} sweep: ${sets.size} distinct word sets over ${built} seeds`);
  }
  // refusals at build: every REFUSED (face, rule) cell throws
  for (const [k, v] of Object.entries(rec)) {
    if (!v.refused) continue;
    const [face, unit] = k.split('|');
    let threw = null;
    try { faceSpec(face).build({ theme: null, difficulty: 2, locale: 'en', unit }, { rng: makeRng('G2-315|face-refuse|1') }); } catch (e) { threw = e.message; }
    ok(/REFUSED|not in the bank/.test(threw || ''), `${k}: recorded REFUSED but build() did not refuse (${threw})`);
  }

  console.log('\n== C2. FACE CHROME — three-line title + three-line instruction (the 722 px body) ==');
  for (const face of FACES) {
    const out = await renderFace(page, face, { tag: 'longchrome', strings: FACE_LONG[face] });
    const m = await checkFace(page, face, out, en, { tag: 'longchrome', strings: FACE_LONG[face] });
    const lines = await page.evaluate(() => [document.querySelector('[data-lcs-title]').getBoundingClientRect().height, document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height].map(Math.round));
    ok(lines[0] >= 90 && lines[1] >= 60, `${face}/longchrome: chrome did not wrap to three lines (title ${lines[0]}, instruction ${lines[1]})`);
    console.log(`  ${face.padEnd(10)} body ${m.body}px (title ${lines[0]}px, instruction ${lines[1]}px), picture ≥ ${Math.round(m.minPic)}px, cells ${m.cells.join('/')}`);
  }
}

async function sectionFacePoisons(page, en, poison) {
  console.log('\n== D2. FACE POISONS (each must FAIL on ITS message; the correct bank/page is the control) ==');
  const ctl = validateFaces(en, 'en');
  ok(ctl.length === 0, 'face poison control: the EN bank passes the face validator: ' + ctl.join(';'));
  const pr = () => en.rules['y-ies-f-ves'];
  let b = clone(en); delete b.rules['c-k-ck'].pairHead;
  poison('PF1 a pair rule without pairHead', validateFaces(b, 'en'), /pairHead missing/);
  b = clone(en); b.rules['y-ies-f-ves'].items[1].plural = 'bunnys';
  poison('PF2 bunny with plural "bunnys" (does not derive; also not the vocab plural)', validateFaces(b, 'en'), /proof form does not derive|not the vocab plural/);
  b = clone(en); b.rules['y-ies-f-ves'].items[12] = { ...pr().items[12], gaps: [{ from: 0, len: 3 }], g: 'wol' };
  poison('PF3 wolves gapped at the unchanged span (0:3)', validateFaces(b, 'en'), /gap not at the rule grapheme|unchanged from the singular|not in cands/);
  b = clone(en); b.rules['magic-e'].items[0] = { ...b.rules['magic-e'].items[0], not: ['anchor'] };
  poison('PF4 an item kept off a face without a why', validateFaces(b, 'en'), /not without why/);
  b = clone(en); b.rules['y-ies-f-ves'].items[0] = { ...pr().items[0], plural: 'babys', gaps: [{ from: 3, len: 2 }], g: 'ys' };
  poison('PF5 baby with plural "babys" (not the vocab plural)', validateFaces(b, 'en'), /not the vocab plural/);
  b = clone(en); b.strings['G2-326'] = { ...b.strings['G2-324'] };
  poison('PF6 two faces sharing one title', validateFaces(b, 'en'), /title not unique/);
  b = clone(en); delete b.strings['G2-328'];
  poison('PF7 a face string block missing', validateFaces(b, 'en'), /strings: G2-328 .*missing/);
  b = clone(en); b.rules['y-ies-f-ves'].refuse = { base: 'x' };
  poison('PF8 a plural-form rule that does not refuse the gap faces', validateFaces(b, 'en'), /must refuse the choice face/);
  b = clone(en); b.rules['y-ies-f-ves'].items = pr().items.slice(0, 5);
  poison('PF9 five plural pairs (< 6)', validateFaces(b, 'en'), /plural pairs < 6/);
  b = clone(en); b.strings['G2-324'] = { ...b.strings['G2-324'], title: 'Which One? {UNIT} Worksheet' };
  poison('PF10 a face title carrying the worksheet word', validateFaces(b, 'en'), /worksheet word/);

  // build-time refusals per face
  const tryBuild = (face, unit, bank, cfg) => { let t = null; try { const sp = faceSpec(face); (bank ? sp._buildWith(bank, { difficulty: 2, locale: 'en', unit }, { rng: makeRng('G2-315|fp|1') }) : sp.build({ theme: null, difficulty: 2, locale: 'en', unit }, { rng: makeRng('G2-315|fp|1') })); } catch (e) { t = e.message; } void cfg; return [t || '']; };
  poison('magic e on the choice face builds', tryBuild('choice', 'magic-e'), /no letter pair.*REFUSED/);
  poison('magic e on the bins face builds', tryBuild('bins', 'magic-e'), /no letter pair.*REFUSED/);
  poison('magic e on the plural face builds', tryBuild('plural', 'magic-e'), /not a plural-form rule.*REFUSED/);
  poison('the plural-form rule on the base builds', [(() => { try { spec.build({ theme: null, difficulty: 2, locale: 'en', unit: 'y-ies-f-ves' }, { rng: makeRng('G2-315|fp|2') }); return ''; } catch (e) { return e.message; } })()], /plural-form rule has no base page.*REFUSED/);
  poison('the plural-form rule on the detective face builds', tryBuild('detective', 'y-ies-f-ves'), /REFUSED/);
  poison('ai-ay on the choice face builds (2 contrast words)', tryBuild('choice', 'ai-ay'), /sides 19\/2.*REFUSED/);
  b = clone(en); b.rules['c-k-ck'].items = b.rules['c-k-ck'].items.filter((it) => it.g !== 'k').concat(b.rules['c-k-ck'].items.filter((it) => it.g === 'k').slice(0, 5));
  poison('c-k-ck bins with five k words (< minSide 6)', tryBuild('bins', 'c-k-ck', b), /sides \d+\/5 .*REFUSED/);
  b = clone(en); b.rules['y-ies-f-ves'].items = pr().items.slice(0, 7);
  poison('the plural face on 7 pairs (< minPool 10)', tryBuild('plural', 'y-ies-f-ves', b), /eligible pairs < 10.*REFUSED/);
  b = clone(en); b.rules['y-ies-f-ves'].models = pr().models.map((m) => ({ ...m, plural: undefined }));
  poison('a plural model without a plural', tryBuild('plural', 'y-ies-f-ves', b), /has no plural.*REFUSED/);

  // DOM poisons per face (a fresh control render each; the same verify() that passed it)
  const dom = async (face, name, mutate, re) => {
    await page.reload({ waitUntil: 'networkidle0' });
    await page.evaluate(mutate);
    poison(name, await faceSpec(face).verify(page), re);
  };
  // choice
  let out = await renderFace(page, 'choice', { tag: 'poison' });
  ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, 'choice DOM-poison control render is clean');
  await dom('choice', 'P8 a gap box two cells wide on one card (per-card width)', () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="choice"]'); const cell = +st.dataset.lcsCell; st.querySelector('[data-lcs-gapbox]').setAttribute('width', 2 * cell - 2); }, /gap width leaks the answer/);
  await dom('choice', 'chips reordered on one card', () => { const row = document.querySelector('.ws-card-stage[data-lcs-face="choice"] [data-lcs-chips]'); row.appendChild(row.firstElementChild); }, /one fixed order on every card/);
  await dom('choice', 'sides 8/0 (every card re-stamped as the rule side)', () => { document.querySelectorAll('.ws-card-stage[data-lcs-face="choice"]').forEach((s) => { s.dataset.lcsSide = 'rule'; }); }, /side "rule" disagrees|sides 8\/0/);
  await dom('choice', 'a chip re-labelled ck', () => { const c = document.querySelector('.ws-card-stage[data-lcs-face="choice"] .ws-letter-chip'); c.textContent = 'ck'; }, /chips .*one fixed order/);
  await dom('choice', 'a gap letter printed inside its box', () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="choice"]'); const ws = st.querySelector('[data-lcs-prim="gap-word"]'); const g = st.dataset.lcsGap.split(':').map(Number); const t = ws.querySelector('text').cloneNode(true); t.textContent = [...st.dataset.lcsWord][g[0]]; ws.appendChild(t); }, /printed letters .* ≠ word minus gaps/);
  await dom('choice', 'the rule-box chips swapped (k|c)', () => { const box = document.querySelector('[data-lcs-rulebox] [data-lcs-chips]'); box.appendChild(box.firstElementChild); }, /rule box chips .* ≠ the pair in chip order/);
  await page.reload({ waitUntil: 'networkidle0' });
  ok((await faceSpec('choice').verify(page)).length === 0, 'choice control after reload is clean');
  // detective
  out = await renderFace(page, 'detective', { tag: 'poison' });
  ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, 'detective DOM-poison control render is clean');
  await dom('detective', 'a coral letter on a detective card (the answer highlighted)', () => { document.querySelector('.ws-card-stage[data-lcs-face="detective"] text').setAttribute('fill', '#F2784B'); }, /coral letter on a detective card/);
  await dom('detective', 'a gap box injected on a detective card', () => { const ws = document.querySelector('.ws-card-stage[data-lcs-face="detective"] [data-lcs-prim="gap-word"]'); const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); r.setAttribute('data-lcs-gapbox', '0'); r.setAttribute('width', '20'); r.setAttribute('height', '20'); ws.appendChild(r); }, /a gap box on a detective card/);
  await dom('detective', 'a copy box with text in it', () => { document.querySelector('[data-lcs-copybox]').textContent = 'ae'; }, /copy box not empty/);
  await dom('detective', 'a rule card re-stamped as a foil', () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="detective"]'); st.dataset.lcsSide = 'foil'; delete st.dataset.lcsRuleAt; }, /foil .* carries the rule grapheme/);
  await dom('detective', 'the rule-at stamp moved off the grapheme', () => { const st = [...document.querySelectorAll('.ws-card-stage[data-lcs-face="detective"]')].find((s) => +s.dataset.lcsRuleAt.split(':')[0] > 0); const g = st.dataset.lcsRuleAt.split(',').map((x) => x.split(':').map(Number)); g[0][0] -= 1; st.dataset.lcsRuleAt = g.map((x) => x.join(':')).join(','); }, /not at the rule grapheme|split rule needs|not in cands/);
  await page.reload({ waitUntil: 'networkidle0' });
  ok((await faceSpec('detective').verify(page)).length === 0, 'detective control after reload is clean');
  // bins
  out = await renderFace(page, 'bins', { tag: 'poison' });
  ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, 'bins DOM-poison control render is clean');
  await dom('bins', 'P6 four lines in each bin (a 4/4 split would be stated)', () => { document.querySelectorAll('[data-lcs-bin]').forEach((b) => { b.querySelector('[data-lcs-bin-row]').remove(); b.querySelector('[data-lcs-bin-lines]').dataset.lcsBinLines = '4'; }); }, /line count leaks the split/);
  await dom('bins', 'one bin with one line fewer', () => { const b = document.querySelector('[data-lcs-bin]'); b.querySelector('[data-lcs-bin-row]').remove(); b.querySelector('[data-lcs-bin-lines]').dataset.lcsBinLines = '4'; }, /different line counts/);
  await dom('bins', 'a bank pill printing its word', () => { const p = document.querySelector('[data-lcs-bank]'); const s = document.createElement('span'); s.textContent = p.dataset.lcsWord; p.appendChild(s); }, /bank pill prints text/);
  await dom('bins', 'the bin labels swapped', () => { const bs = [...document.querySelectorAll('[data-lcs-bin]')]; const a = bs[0].querySelector('[data-lcs-chip]'), b2 = bs[1].querySelector('[data-lcs-chip]'); const t = a.textContent; a.textContent = b2.textContent; a.dataset.lcsChip = b2.textContent; b2.textContent = t; b2.dataset.lcsChip = t; }, /label chip .* ≠ the bin key/);
  await dom('bins', 'membership 7/1 (pills re-stamped)', () => { const root = document.querySelector('[data-lcs-type="G2-315"]'); const pair = root.dataset.lcsPair.split(','); const src = [...document.querySelectorAll('[data-lcs-bank]')].find((p) => p.dataset.lcsWord.includes(pair[0]) && !p.dataset.lcsWord.includes(pair[1])); [...document.querySelectorAll('[data-lcs-bank]')].forEach((p, i) => { if (i) { p.dataset.lcsWord = src.dataset.lcsWord + 'x'.repeat(i); } }); }, /outside the split|rule grapheme occurs|not letters only/);
  await dom('bins', 'a writing row with text on it', () => { const svg = document.querySelector('[data-lcs-bin-row] svg'); const t = document.createElementNS('http://www.w3.org/2000/svg', 'text'); t.textContent = 'cat'; t.setAttribute('x', 10); t.setAttribute('y', 30); svg.appendChild(t); }, /row 1 not empty|visible text on the bins page/);
  await page.reload({ waitUntil: 'networkidle0' });
  ok((await faceSpec('bins').verify(page)).length === 0, 'bins control after reload is clean');
  // anchor
  out = await renderFace(page, 'anchor', { tag: 'poison' });
  ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, 'anchor DOM-poison control render is clean');
  await dom('anchor', 'a scaffold box removed (one letter fewer to write)', () => { document.querySelector('.ws-card-stage[data-lcs-face="anchor"] [data-lcs-scaffoldbox]').remove(); }, /boxes, want/);
  await dom('anchor', 'a rule letter printed in ink instead of coral', () => { document.querySelector('.ws-card-stage[data-lcs-face="anchor"] text').setAttribute('fill', '#3A3530'); }, /not coral/);
  await dom('anchor', 'a non-rule letter printed', () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="anchor"]'); const ws = st.querySelector('[data-lcs-prim="gap-word"]'); const t = ws.querySelector('text').cloneNode(true); const g = st.dataset.lcsGap.split(':').map(Number); const k = g[0] === 0 ? 1 : 0; t.textContent = [...st.dataset.lcsWord][k]; t.setAttribute('x', (k + 0.5) * +st.dataset.lcsCell); ws.appendChild(t); }, /≠ the rule letters/);
  await dom('anchor', 'the gap stamp moved off the grapheme', () => { const st = [...document.querySelectorAll('.ws-card-stage[data-lcs-face="anchor"]')].find((s) => +s.dataset.lcsGap.split(':')[0] > 0); const g = st.dataset.lcsGap.split(',').map((x) => x.split(':').map(Number)); g[0][0] -= 1; st.dataset.lcsGap = g.map((x) => x.join(':')).join(','); }, /not at the rule grapheme|split rule needs|not in cands|≠ the rule letters/);
  await page.reload({ waitUntil: 'networkidle0' });
  ok((await faceSpec('anchor').verify(page)).length === 0, 'anchor control after reload is clean');
  // plural
  out = await renderFace(page, 'plural', { tag: 'poison' });
  ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, 'plural DOM-poison control render is clean');
  await dom('plural', 'the plural printed as a text node', () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="plural"]'); const s = document.createElement('span'); s.textContent = st.dataset.lcsPlural; document.querySelector('[data-lcs-rulebox]').appendChild(s); }, /prints an answer word/);
  await dom('plural', 'the gap re-stamped onto an unchanged span', () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="plural"]'); st.dataset.lcsGap = '0:3'; }, /unchanged from the singular|not at the rule grapheme|not in cands/);
  await dom('plural', 'one clone removed', () => { document.querySelector('[data-lcs-clones] img').remove(); }, /clones, want 3/);
  await dom('plural', 'a model without its singular lead', () => { document.querySelector('[data-lcs-model-leadword]').remove(); }, /singular lead not printed/);
  await dom('plural', 'the singular printed with a letter changed', () => { const t = document.querySelector('[data-lcs-singular] text'); t.textContent = t.textContent === 'x' ? 'y' : 'x'; }, /singular printed .* ≠/);
  await dom('plural', 'a clone showing another picture', () => { const c = document.querySelectorAll('[data-lcs-clones] img'); c[0].setAttribute('src', document.querySelector('[data-lcs-model] img').getAttribute('src')); }, /clone shows another picture/);
  await dom('plural', 'P8 the plural box one cell narrower', () => { const st = document.querySelector('.ws-card-stage[data-lcs-face="plural"]'); const cell = +st.dataset.lcsCell; const b = st.querySelector('[data-lcs-wordrow] [data-lcs-gapbox]'); b.setAttribute('width', 2 * cell - 2); }, /gap width leaks the answer/);
  await page.reload({ waitUntil: 'networkidle0' });
  ok((await faceSpec('plural').verify(page)).length === 0, 'plural control after reload is clean');
}


// ---------------------------------------------------------------- main
module.exports = { validateBank, validateFaces, frameWith, poolWords, FACE_IDS };
if (require.main === module) (async () => {
  const t0 = Date.now();
  const en = loadBank(KEY, 'en');
  const record = sectionData(en);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let poisonsOk = false;
  try {
    console.log('\n== B. RENDER (real pipeline; unit = the rule the wave passes) ==');
    const rules = Object.keys(en.rules);
    const jobs = [];
    for (const d of [1, 2, 3]) jobs.push({ d, unit: null });
    for (const u of rules) {
      if (u === en.exemplar) continue;
      for (const d of QUICK ? [2] : [1, 2, 3]) if (!record[`${u}|d${d}`].refused) jobs.push({ d, unit: u });
    }
    if (!QUICK) for (let e = 2; e <= EPOCHS; e++) jobs.push({ d: 2, unit: null, epoch: e });
    const widest = {};
    for (const job of jobs) {
      const out = await renderJob(page, job);
      const m = await checkRender(page, job, out, en);
      Object.assign(widest, m.widest);
      console.log(`  ${((job.unit || en.exemplar) + '/d' + job.d + (job.epoch ? '/e' + job.epoch : '')).padEnd(22)} words ${m.stamps.map((s) => s.word).join(',')}  cells ${m.cells.join('/')}  pic ≥ ${Math.round(m.minPic)}  body ${m.body}px  maxAdv ${(m.maxAdvRatio * 100).toFixed(0)}% of cell−2`);
    }
    console.log('  widest-glyph advances (px): ' + Object.entries(widest).map(([k, v]) => k + '=' + v).join(' '));
    for (const [k, v] of Object.entries(record)) {
      if (!v.refused) continue;
      const [u, dd] = k.split('|');
      let threw = null;
      try { spec.build({ theme: null, difficulty: +dd.slice(1), locale: 'en', unit: u }, { rng: makeRng('G2-315|refuse-check|7') }); } catch (e) { threw = e.message; }
      ok(/REFUSED/.test(threw || ''), `${k}: recorded REFUSED but build() did not refuse`);
    }

    console.log('\n== C. CHROME — three-line title + three-line instruction (the 722 px body) ==');
    for (const d of [1, 2, 3]) {
      const out = await renderJob(page, { d, tag: 'longchrome', strings: LONG_STRINGS });
      const m = await checkRender(page, { d, tag: 'longchrome' }, out, en);
      const lines = await page.evaluate(() => [document.querySelector('[data-lcs-title]').getBoundingClientRect().height, document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height].map(Math.round));
      ok(lines[0] >= 90 && lines[1] >= 60, `longchrome/d${d}: chrome did not wrap to three lines (title ${lines[0]}, instruction ${lines[1]})`);
      console.log(`  d${d}: body ${m.body}px (title ${lines[0]}px, instruction ${lines[1]}px), picture ≥ ${Math.round(m.minPic)}px, cells ${m.cells.join('/')}`);
    }

    await sectionPoisons(page, en);
    const rec = faceRecord(en);
    await sectionFaces(page, en, rec);
    await sectionFacePoisons(page, en, poison);
    poisonsOk = killed === total;
    console.log(`  poisons ${killed}/${total} killed`);
  } finally {
    await browser.close();
  }
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  if (fails.length) console.log('\nFAILS:\n  ' + fails.join('\n  '));
  const verdict = fails.length === 0 && poisonsOk;
  console.log(`\n${ID} gate: ${asserts} assertions, ${fails.length} failed, poisons ${poisonsOk ? 'all killed' : 'SURVIVOR'}, ${secs}s → ${verdict ? 'PASS' : 'FAIL'}`);
  console.log(`${verdict ? 'PASS' : 'FAIL'} (${asserts} assertions, ${killed}/${total} poisons killed)`);
  process.exit(verdict ? 0 : 1);
})().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
