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
 *     P6 (bins line count) is a Face-4 case and is recorded N/A. Plus the DOM
 *     poisons on a real render (a printed gap letter · a model word on a card
 *     · a wrong card count · a duplicate word · a coral letter · a text node
 *     printing a card word · a chip outside cands) and the refusals (a short
 *     pool · an unauthored unit · a locale without a bank block · fewer
 *     models than the config) — and a 30 px W in a 24 cell.
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
    for (const m of r.models || []) { checked++; checkWordPic(m, 'model'); checkGaps(m, 'model'); }
    for (const it of r.items || []) {
      checked++;
      if (!checkWordPic(it, 'item')) continue;
      checkGaps(it, 'item');
      if (itemWords.has(it.word)) out.push(`${tag}: item "${it.word}": duplicate`);
      itemWords.add(it.word);
      // (7) models are not items
      if (modelWords.has(it.word)) out.push(`${tag}: model is an item — "${it.word}"`);
      // (5) contrast items carry pair[1]
      if (it.side === 'contrast' && (!r.pair || String(it.g).toLocaleLowerCase(loc) !== r.pair[1])) out.push(`${tag}: item "${it.word}": side contrast but g "${it.g}" ≠ pair[1]`);
      // P7 excluded family
      if (exclRe && exclRe.test(it.word.toLocaleLowerCase(loc))) out.push(`${tag}: item "${it.word}": excluded family (${b.exclude.re})`);
      // (6) proof / plural derive
      if (r.proof && r.proof.kind === 'plural' && it.plural) {
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

async function sectionPoisons(page, en) {
  console.log('\n== D. POISONS (each must FAIL on ITS message; the correct bank/page is the control) ==');
  let killed = 0, total = 0;
  const poison = (name, findings, re) => {
    total++;
    const hit = (findings || []).find((x) => re.test(x));
    if (hit) killed++;
    console.log(`  ${hit ? 'KILLED  ' : 'SURVIVED'} ${name}${hit ? '  — ' + hit : (findings && findings.length ? '  — WRONG REASON: ' + findings[0] : '  — SILENT')}`);
  };
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
  // P6 — Face 4 (bins) only; not on the base
  console.log('  N/A      P6 bins with 4 lines for a 4/4 split — Face 4 (Phase 2), no bins on the base');
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
  console.log(`  poisons ${killed}/${total} killed`);
  return killed === total;
}

// ---------------------------------------------------------------- main
module.exports = { validateBank, frameWith, poolWords };
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

    poisonsOk = await sectionPoisons(page, en);
  } finally {
    await browser.close();
  }
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  if (fails.length) console.log('\nFAILS:\n  ' + fails.join('\n  '));
  const verdict = fails.length === 0 && poisonsOk;
  console.log(`\n${ID} gate: ${asserts} assertions, ${fails.length} failed, poisons ${poisonsOk ? 'all killed' : 'SURVIVOR'}, ${secs}s → ${verdict ? 'PASS' : 'FAIL'}`);
  process.exit(verdict ? 0 : 1);
})().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
