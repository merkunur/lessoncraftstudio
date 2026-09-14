#!/usr/bin/env node
/**
 * verify-b3-sound-boxes.js — the K-318 `sound-boxes` gate (design §5).
 *
 *   node qa/verify-b3-sound-boxes.js [--quick] [--locales=en] [--themes=a,b] [--seeds=N]
 *
 * Own ground truth: the gate reads approved-words-<loc>.json and
 * data/b3/sound-boxes.js DIRECTLY (never the spec's helpers) and re-derives
 * every segmentation itself; the render section renders through the REAL
 * pipeline (render/render-instance.js, file:// fonts) and diffs the page
 * stamps against that derivation — "diff, not trust".
 *
 * Sections
 *   A  bank data: key approved · flat join === word (case-folded) · rows === count ·
 *      rows[s] === split[s] unless the key is in remergeAcrossSyllable (and then it
 *      MUST straddle — a listed key that does not is a dead flag) · every multigraph
 *      whitelisted · exclude keys approved and not banked · da strict pool (no
 *      policy_managed on a banked key) · no localized BW marker.
 *   B  pools: for every wave theme the d2 pool after segmentation (>= 8 or the
 *      cell is REFUSED, never filled — a §1 wave theme below 8 is a FAIL) and the
 *      d1/d3 pools (recorded).
 *   C  renders: wave themes × d1-d3 (d1/d3 refusals recorded), the worst LEGAL
 *      chrome (3-line title + 3-line instruction) × d1-d3, the nl-style dots
 *      stack at d2 under the same chrome, and a seed sweep on the exemplar theme.
 *      Each render: lints clean · verify() empty · picture >= 56 px (K) / 44 (G1)
 *      · every box >= 44 px · box row <= 302 · nothing past its card · every
 *      card's data-lcs-chunks equals the re-derived segmentation · non-vacuity
 *      (0 cards checked = FAIL).
 *   D  poisons (each must FAIL; the correct bank is the control): P1 unapproved
 *      key · P2 join != word (horse -> hors) · P3 multigraph off the whitelist ·
 *      P4 seam merged outside remergeAcrossSyllable · P5 dead remerge flag ·
 *      P6 excluded key also banked · P7 da strict pool violated · P8 pool below
 *      the floor renders instead of refusing · P9 chunks stamp != word · P10 wide
 *      flag flipped · P11 the word printed on its card · P12 duplicate word ·
 *      P13 a box removed · P14 boxes squashed below 44 · P15 box row wider than
 *      the card · P16 blank page (non-vacuity).
 * Exit 1 on any real failure OR any silent poison.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { entriesFor, displayWord, fileUri } = require('../lib/b2-common.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev', 'k318-gate');
const APPROVED_DIR = path.resolve(ROOT, '..', 'v2-data', 'verify-syllable-boundaries', 'output');
const BANK_FILE = path.join(ROOT, 'data', 'b3', 'sound-boxes.js');

const WAVE_THEMES = { en: ['animals', 'around the house', 'forest creatures', 'toys', 'zoo animals', 'farm animals', 'vehicles', 'clothing'] };
const EXEMPLAR = { en: 'animals' };
const FLOOR = 8;
const CARD_INNER = 302;
const BOX_FLOOR = 44;
const PIC_FLOOR = { K: 56, G1: 44, G2: 36, G3: 36 };
// the EN grapheme whitelist (data/b3/sound-boxes.js header); other locales get theirs with their block
const WHITELIST = {
  en: new Set('sh ch th ck ng qu wh ph tch dge ee oo ea ai ay oa ou ow oi oy ie ei ey igh aw au ar or er ir ur ll ss ff zz tt pp bb dd gg mm nn rr cc se ce'.split(' ')),
};
const BW_MARKERS = /\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;
// worst legal chrome: 70-char title (3 lines at ~24 chars/line) + 150-char instruction (3 lines)
const LONG_CHROME = {
  title: 'Sound Boxes for Beginning Readers: Say Every Sound Out Loud Slowly',
  instruction: 'Say the picture word slowly, sound by sound. Write one sound in each box. A wide box with a curve under it holds two letters that make one sound together.',
};

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const QUICK = flags.has('--quick');

function approvedMap(loc) {
  const j = JSON.parse(fs.readFileSync(path.join(APPROVED_DIR, 'approved-words-' + loc + '.json'), 'utf8'));
  const m = new Map();
  for (const e of j.entries) if (!m.has(e.key)) m.set(e.key, e);
  return m;
}
function loadBank() {
  delete require.cache[require.resolve(BANK_FILE)];
  const mod = require(BANK_FILE);
  return mod[Object.keys(mod)[0]];
}
function clone(o) { return JSON.parse(JSON.stringify(o)); }

/* ---------------- A. bank data (pure node) ---------------- */
function checkBank(cfg, loc, ap) {
  const fails = [];
  const wl = WHITELIST[loc] || new Set();
  const remerge = new Set(cfg.remergeAcrossSyllable || []);
  const exclude = new Set(cfg.exclude || []);
  let rows = 0;
  for (const [key, syl] of Object.entries(cfg.bank || {})) {
    rows++;
    const a = ap.get(key);
    if (!a) { fails.push(`A: "${key}" is not in approved-words-${loc}.json`); continue; }
    if (cfg.strictPool === 'policy_managed_absent' && a.policy_managed !== undefined) fails.push(`A: "${key}" carries policy_managed:${a.policy_managed} (strict pool)`);
    if (!Array.isArray(syl) || !syl.length || syl.some((r) => !Array.isArray(r) || !r.length)) { fails.push(`A: "${key}" rows malformed`); continue; }
    const flat = syl.flat();
    if (flat.some((g) => typeof g !== 'string' || !g.length)) fails.push(`A: "${key}" has an empty grapheme`);
    if (flat.join('') !== a.word.toLocaleLowerCase(loc)) fails.push(`A: "${key}" joins to "${flat.join('')}" != "${a.word}"`);
    if (syl.length !== a.count) fails.push(`A: "${key}" has ${syl.length} rows, approved count ${a.count}`);
    const straddles = syl.some((r, s) => r.join('') !== (a.split[s] || ''));
    if (remerge.has(key)) { if (!straddles) fails.push(`A: "${key}" listed in remergeAcrossSyllable but its rows match the split (dead flag)`); }
    else if (straddles) fails.push(`A: "${key}" merges across an approved seam (${a.split.join('-')}) without remergeAcrossSyllable`);
    for (const g of flat) if ([...g].length >= 2 && wl.size && !wl.has(g)) fails.push(`A: "${key}" multigraph "${g}" is not whitelisted`);
    if (exclude.has(key)) fails.push(`A: "${key}" is both excluded and banked`);
  }
  for (const key of exclude) if (!ap.has(key)) fails.push(`A: exclude "${key}" is not an approved word`);
  if (!rows) fails.push('A: the bank is empty');
  return fails;
}

/* ---------------- B. pools (own re-derivation) ---------------- */
function derive(cfg, key) {
  if ((cfg.exclude || []).includes(key)) return null;
  const rows = cfg.bank && cfg.bank[key];
  return rows ? rows.flat() : null;
}
function fitBox(n, wideCount, box, gap) {
  const b = Math.min(box, Math.floor((CARD_INNER - gap * (n - 1) - 2) / (n + 0.5 * wideCount)));
  return b < BOX_FLOOR ? null : b;
}
function poolFor(cfg, loc, theme, d) {
  const seen = new Set(); const out = [];
  for (const e of entriesFor(theme, loc)) {
    const word = displayWord(e.singular, loc);
    if (!/^\p{L}+$/u.test(word)) continue;
    const flat = derive(cfg, e.vocabKey);
    if (!flat || flat.join('') !== word.toLocaleLowerCase(loc)) continue;
    const n = flat.length, wide = flat.filter((g) => [...g].length >= 2).length;
    if (n < d.minG || n > d.maxG || wide > d.maxWide) continue;
    if (!fitBox(n, wide, d.box, d.gap)) continue;
    if (seen.has(word)) continue; seen.add(word);
    out.push({ key: e.vocabKey, noun: e.noun, word, flat, wide });
  }
  return out;
}

/* ---------------- C. renders (real pipeline) ---------------- */
async function renderCheck(page, type, cfgOrNull, job, opts) {
  const t = cfgOrNull ? { ...type, build: (o, ctx) => type._buildWith(cfgOrNull, o, ctx) } : type;
  if (opts && opts.post) { const inner = t.build; t.build = async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; }; }
  const out = await renderInstance({
    type: t, theme: job.theme, difficulty: job.difficulty, locale: job.locale, strings: job.strings,
    seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  // the gate's own measurements (qa/lints.js has no size lint)
  const band = type.difficulty[job.difficulty].band || type.gradeBand;
  const m = await page.evaluate((picFloor) => {
    const res = { cards: [], fails: [] };
    const stages = [...document.querySelectorAll('.ws-card-stage[data-lcs-word]')];
    stages.forEach((st, i) => {
      const img = st.querySelector('img');
      const ib = img ? img.getBoundingClientRect() : { height: 0 };
      if (ib.height < picFloor - 0.6) res.fails.push(`card ${i + 1}: picture ${ib.height.toFixed(1)} < ${picFloor}`);
      const rects = [...st.querySelectorAll('rect[data-lcs-box]')];
      rects.forEach((r, j) => { const h = r.getBoundingClientRect().height; if (h < 44 - 0.6) res.fails.push(`card ${i + 1}: box ${j + 1} ${h.toFixed(1)} < 44`); });
      const svg = st.querySelector('svg[data-lcs-soundboxes]');
      const card = st.closest('.ws-card').getBoundingClientRect();
      if (svg) {
        const sb = svg.getBoundingClientRect();
        if (sb.width > 302 + 0.6) res.fails.push(`card ${i + 1}: row ${sb.width.toFixed(1)} > 302`);
        if (sb.bottom > card.bottom - 1 || sb.top < card.top + 1) res.fails.push(`card ${i + 1}: row outside its card`);
      } else res.fails.push(`card ${i + 1}: no box row`);
      if (ib.height && (ib.top < card.top || ib.bottom > card.bottom)) res.fails.push(`card ${i + 1}: picture outside its card`);
      res.cards.push({ word: st.dataset.lcsWord, key: st.dataset.lcsVocab, chunks: st.dataset.lcsChunks, dots: !!st.querySelector('[data-lcs-hakdots]') });
    });
    return res;
  }, PIC_FLOOR[band] || 44);
  fails.push(...m.fails.map((x) => 'size: ' + x));
  // diff the stamps against the gate's own derivation
  const cfg = cfgOrNull || loadBank()[job.locale];
  m.cards.forEach((c, i) => {
    const flat = derive(cfg, c.key);
    if (!flat) fails.push(`derive: card ${i + 1} "${c.key}" has no bank row`);
    else if (flat.join('|') !== c.chunks) fails.push(`derive: card ${i + 1} stamps "${c.chunks}", bank says "${flat.join('|')}"`);
    if (flat && flat.join('') !== c.word.toLocaleLowerCase(job.locale)) fails.push(`derive: card ${i + 1} word "${c.word}" != bank join`);
  });
  if (!m.cards.length) fails.push('non-vacuity: 0 cards checked');
  return { fails, cards: m.cards, pngPath: out.pngPath };
}

async function main() {
  const locales = arg('locales', 'en').split(',');
  const themesArg = arg('themes');
  const seeds = +arg('seeds', QUICK ? 2 : 6);
  const type = loadType('K-318');
  let assertions = 0, failures = [];
  const note = (ok, msg) => { assertions++; if (!ok) failures.push(msg); };
  const bankAll = loadBank();
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    for (const loc of locales) {
      const cfg = bankAll[loc];
      note(!!cfg, `no ${loc} block in the bank`);
      if (!cfg) continue;
      const ap = approvedMap(loc);
      // ---- A
      const a = checkBank(cfg, loc, ap);
      assertions += Object.keys(cfg.bank).length * 6;
      failures.push(...a);
      console.log(`[A] ${loc}: ${Object.keys(cfg.bank).length} bank rows, ${a.length} data faults`);
      // ---- B
      const themes = themesArg ? themesArg.split(',') : (WAVE_THEMES[loc] || [EXEMPLAR[loc]]);
      const pools = {};
      for (const theme of themes) {
        note(!BW_MARKERS.test(theme), `theme "${theme}" carries a BW marker`);
        const p = { 1: poolFor(cfg, loc, theme, type.difficulty[1]), 2: poolFor(cfg, loc, theme, type.difficulty[2]), 3: poolFor(cfg, loc, theme, type.difficulty[3]) };
        pools[theme] = p;
        const d3wide = p[3].filter((e) => e.wide).length;
        const refuse1 = p[1].length < type.difficulty[1].cards, refuse3 = p[3].length < type.difficulty[3].cards || d3wide < type.difficulty[3].minWideCards;
        console.log(`[B] ${loc}/${theme}: d2 pool ${p[2].length}${p[2].length < FLOOR ? ' REFUSED (< ' + FLOOR + ')' : ''} · d1 ${p[1].length}${refuse1 ? ' (refused)' : ''} · d3 ${p[3].length} (${d3wide} wide)${refuse3 ? ' (refused)' : ''}`);
        note(p[2].length >= FLOOR, `${loc}/${theme}: d2 pool ${p[2].length} < ${FLOOR} — a §1 wave theme below the floor`);
        // every eligible picture exists on disk
        for (const e of p[2]) { const uri = fileUri(theme, e.noun); note(fs.existsSync(decodeURIComponent(new URL(uri).pathname.replace(/^\/([A-Za-z]:)/, '$1'))), `${loc}/${theme}: picture missing for ${e.key}`); }
      }
      // ---- C
      const renders = [];
      const ex = EXEMPLAR[loc] || themes[0];
      for (const theme of themes) for (const d of QUICK && theme !== ex ? [2] : [1, 2, 3]) renders.push({ theme, difficulty: d, locale: loc, baseName: `K-318-${theme}-d${d}-${loc}`, tag: 'sweep' });
      for (const d of [1, 2, 3]) renders.push({ theme: ex, difficulty: d, locale: loc, strings: LONG_CHROME, baseName: `K-318-${ex}-d${d}-${loc}-longchrome`, tag: 'long-chrome' });
      for (let s = 2; s <= seeds; s++) renders.push({ theme: ex, difficulty: 2, locale: loc, seedEpoch: s, baseName: `K-318-${ex}-d2-${loc}-seed${s}`, tag: 'seed' });
      const seen = new Map();
      for (const job of renders) {
        const p = pools[job.theme][job.difficulty];
        const d = type.difficulty[job.difficulty];
        const expectRefusal = p.length < d.cards || (d.poolFloor && p.length < d.poolFloor) || (d.minWideCards && p.filter((e) => e.wide).length < d.minWideCards);
        let r;
        try { r = await renderCheck(page, type, null, job); } catch (e) { r = { thrown: e.message }; }
        if (expectRefusal) { note(!!r.thrown, `${job.baseName}: rendered although the pool is ${p.length} (should refuse)`); console.log(`[C] ${job.baseName}: REFUSED (${p.length} eligible)`); continue; }
        note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
        if (r.thrown) continue;
        assertions += 8 * r.cards.length;
        note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
        if (job.tag === 'seed') { const key = r.cards.map((c) => c.key).join(','); note(!seen.has(key), `${job.baseName}: same six words as seed ${seen.get(key)}`); seen.set(key, job.seedEpoch); }
        console.log(`[C] ${job.baseName}: ${r.cards.length} cards [${r.cards.map((c) => c.word).join(' ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
      }
      // the dots stack (nl ships dots at d2) under the worst chrome, on this locale's bank
      {
        const dotCfg = clone(cfg); dotCfg.dots = true;
        const r = await renderCheck(page, type, dotCfg, { theme: ex, difficulty: 2, locale: loc, strings: LONG_CHROME, baseName: `K-318-${ex}-d2-${loc}-dots-longchrome` });
        note(r.fails.length === 0, `dots stack: ${r.fails.join(' | ')}`);
        note(r.cards.every((c) => c.dots), 'dots stack: a card without dots');
        console.log(`[C] dots stack under long chrome: ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
      }
    }

    // ---- D. poisons (en bank; each must FAIL; control = the correct bank)
    const loc = 'en';
    const cfg = bankAll.en; const ap = approvedMap(loc);
    const ex = EXEMPLAR.en;
    const control = await renderCheck(page, type, cfg, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-318-control' });
    note(control.fails.length === 0 && checkBank(cfg, loc, ap).length === 0, 'control (correct bank) did not pass: ' + control.fails.join(' | '));
    const poisons = [];
    const dataPoison = (name, mutate, want) => poisons.push({ name, run: async () => { const c = clone(cfg); mutate(c); const f = checkBank(c, loc, ap); return f.some((x) => want.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    dataPoison('P1 unapproved key', (c) => { c.bank.unicornhorn = [['u', 'n', 'i', 'c', 'or', 'n']]; }, /not in approved/);
    dataPoison('P2 join != word (horse -> hors)', (c) => { c.bank.horse = [['h', 'or', 's']]; }, /joins to "hors"/);
    dataPoison('P3 multigraph off the whitelist', (c) => { c.bank.sheep = [['sh', 'eep']]; }, /not whitelisted/);
    dataPoison('P4 seam merged outside remergeAcrossSyllable', (c) => { c.bank.tiger = [['t', 'i'], ['g', 'er']]; }, /merges across an approved seam/);
    dataPoison('P5 dead remerge flag', (c) => { c.remergeAcrossSyllable.push('tiger'); }, /dead flag/);
    dataPoison('P6 excluded key also banked', (c) => { c.exclude.push('cat'); }, /both excluded and banked/);
    poisons.push({ name: 'P7 da strict pool violated', run: async () => {
      // the design names da `hund` (vocabKey `dog`, policy_managed:true — measured); fall back to any true key
      const da = approvedMap('da');
      const e = (da.get('dog') && da.get('dog').policy_managed === true) ? da.get('dog') : [...da.values()].find((x) => x.policy_managed === true && /^\p{L}+$/u.test(x.word));
      if (!e) return 'NEEDLE MATCHED NOTHING (no policy_managed:true entry in da)';
      const f = checkBank({ mode: 'bank', strictPool: 'policy_managed_absent', bank: { [e.key]: [[...e.word.toLowerCase()]] } }, 'da', da);
      return f.some((x) => /strict pool/.test(x)) ? null : 'silent';
    } });
    poisons.push({ name: 'P8 pool below the floor renders', run: async () => {
      const c = clone(cfg); const keep = new Set(['bat', 'cat', 'dog', 'fox', 'pig']); c.bank = Object.fromEntries(Object.entries(c.bank).filter(([k]) => keep.has(k)));
      try { await renderCheck(page, type, c, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-318-poison-p8' }); return 'silent (rendered 6 cards from a 5-word pool)'; } catch (e) { return /refused|< 8/.test(e.message) ? null : 'wrong error: ' + e.message; }
    } });
    const htmlPoison = (name, post, want) => poisons.push({ name, run: async () => {
      const r = await renderCheck(page, type, cfg, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-318-poison-' + name.slice(0, 3).toLowerCase() }, { post });
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    const once = (re, fn) => (html) => { let done = false; return html.replace(re, (m, ...g) => { if (done) return m; done = true; return fn(m, ...g); }); };
    htmlPoison('P9 chunks stamp != word', once(/data-lcs-chunks="([^"]+)"/, (m, v) => `data-lcs-chunks="${v}|s"`), /chunks .* != word|stamps/);
    htmlPoison('P10 wide flag flipped', once(/data-lcs-wide="0"/, () => 'data-lcs-wide="1"'), /wide=/);
    htmlPoison('P11 the word printed on its card', (html) => html.replace(/(data-lcs-word="([^"]+)"[^>]*>)/, (m, open, w) => `${open}<span style="font-size:20px">${w}</span>`), /visible text/);
    htmlPoison('P12 duplicate word', (html) => { const ws = [...html.matchAll(/data-lcs-word="([^"]+)" data-lcs-vocab="([^"]+)" data-lcs-chunks="([^"]+)"/g)]; const a = ws[0], b = ws[1]; return html.replace(b[0], a[0]); }, /duplicate/);
    htmlPoison('P13 a box removed', once(/<rect x="1" y="1"[^>]*data-lcs-box="0"[^>]*\/>/, () => ''), /boxes for|svg says/);
    htmlPoison('P14 boxes squashed below 44', once(/(<svg[^>]*) height="(\d+)"([^>]*data-lcs-soundboxes)/, (m, a, h, b) => `${a} height="30"${b}`), /< 44|squashed/);
    htmlPoison('P15 box row wider than the card', once(/(<svg[^>]*) width="(\d+)" height="(\d+)"([^>]*data-lcs-soundboxes)/, (m, a, w, h, b) => `${a} width="340" height="${h}"${b}`), /> 302|wider/);
    htmlPoison('P16 blank page (non-vacuity)', (html) => html.replace(/<section class="ws-card"[\s\S]*<\/section>/, ''), /non-vacuity|cards, want|blank/);
    let killed = 0;
    for (const p of poisons) {
      let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
      const ok = res === null;
      if (ok) killed++;
      console.log(`[D] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
    }
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    const verdict = failures.length === 0;
    if (failures.length) console.log('FAILS:\n  ' + failures.join('\n  '));
    console.log(`K-318 gate: ${assertions} assertions, ${failures.length} failures, poisons ${killed}/${poisons.length} killed → ${verdict ? 'PASS' : 'FAIL'}`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { checkBank, poolFor, derive, fitBox, WHITELIST };
