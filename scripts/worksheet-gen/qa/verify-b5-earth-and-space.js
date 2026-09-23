#!/usr/bin/env node
/**
 * verify-b5-earth-and-space.js — the G1-378 `earth-and-space` family gate (design
 * docs/worksheet-gen/b5-designs/G1-378-earth-and-space.md §5; nt10-E build brief
 * deliverable 4). Base page (built 2026-09-23) + section 5, the five faces (Phase E,
 * 2026-09-23: qa/b5-earth-and-space-faces.js, record _work/G1-378-faces.md) with the
 * deferred face poisons PR3 PR4 PR5 PR7 PR8 PR9 PR10 PR11 PR13.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-earth-and-space.js [--quick]
 *
 * 0. PRIMITIVES — qa/verify-moon-phase.js, qa/verify-sky-bodies.js,
 *    qa/verify-planets.js must PASS (each measures its EMITTED svg on the pixels
 *    and kills its own poisons: PR1 PR2 in moon-phase, PR6 PR8 PR12 in
 *    sky-bodies, PR10 + the Venus-as-Earth pair in planets).
 * 1. BANK — validateBank(block, loc, model) (exported; tools/b5-probe-child.js
 *    calls it for every panel draft), §5 rules 1-12 (rule 10's per-face apparatus
 *    words and rule 9's answer-key words are checked for en only: the bank shape
 *    carries no per-locale apparatus lexicon — open item for the panel brief).
 * 2. RENDER through the REAL pipeline (render/render-instance.js, file:// fonts):
 *    d1 / d2 / d3 en, then d2 under the 722 chrome (a 3-line title + 3-line
 *    instruction) and the 677 chrome (a 4-line fi title) with a LONG fixture bank
 *    (facts ~62 chars, the de/fi +40 %, and a 9-char body name). Asserts verify()
 *    empty, qa/lints.js clean and — ITSELF, from the rendered DOM — the G1 floors
 *    (ticks >= 44, fact text >= the configured px on <= 2 lines, badges 30),
 *    head discs Sun > Earth > Moon (measured widths), pills <= 92 and unclipped,
 *    no <img>, nothing past the footer, and SPARSE: the largest blank band
 *    between consecutive content blocks (head drawings, pills, badges, fact
 *    text, tick boxes) <= 40 px (slack may only fall BELOW the chart).
 * 3. SWEEP — 40 seeds (epoch 1 = the shipped seed) x d1-d3 through the node
 *    checks on bodyHtml; ANSWER-POSITION TELLS measured PER PAGE (every column
 *    holds >= 2 answers, no run of 3, not periodic, row 1 not the Sun) and
 *    POOLED over the d2 pages (each row position's body share <= 60 %, every
 *    (row, body) cell reached except (1, Sun), the 2-fact body spread over all
 *    three); the de synthetic bank draws the SAME facts in the SAME rows (the
 *    seed carries no locale); an unauthored locale REFUSES. Not --quick: the
 *    d2 seeds 2..20 rendered + verified.
 * 4. POISON — each must FAIL for its OWN reason (SILENT / WRONG REASON exit 1);
 *    the correct EN bank is the control. Bank P1-P12 (design §5). Render:
 *    PR12 a head Sun at discR 20 · PR14 an <img src=".../space/..."> · PT the
 *    rows sorted by body (run of 3) · PW a fact text ≠ the literal · PB a tick
 *    box pre-filled · PC a 3-line fact · PS the row cap removed at d1 (SPARSE)
 *    · PX tick 40 (spec guard + render floor past it).
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const freeClaim = require('../../lib/free-claim.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const bankMod = require('../data/b5/earth-and-space.js');

const M = bankMod.EARTH_AND_SPACE;
const ROOT = path.join(__dirname, '..', '..', '..');
const TAX = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
const OUT = path.join(__dirname, '..', 'out', 'dev');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const QUICK = process.argv.includes('--quick');
const TYPE = require('../types/g1/G1-378-sun-earth-and-moon.js');
const MODES = M.MODES;
const SPARSE_MAX = TYPE.SPARSE_MAX;

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const clone = (o) => JSON.parse(JSON.stringify(o));
const fold = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc || 'en');
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasWord = (text, word, loc) => new RegExp('(?<!\\p{L})' + escRe(fold(word, loc)) + '(?!\\p{L})', 'u').test(fold(text, loc));
const k208 = (loc) => { try { return (JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', `strings.${loc}.json`), 'utf8'))['K-208'] || {}).title || null; } catch (e) { return null; } };

/* =================================================================== 1. BANK */
const BASE_BAN = /(?<!\p{L})(circle|line|lines|write)(?!\p{L})/iu;
const FACE_RULE = {
  'moon-phases-in-order': { ban: /(?<!\p{L})(name|names|word|words)(?!\p{L})/iu },
  'moon-phase-names': { need: /(?<!\p{L})bank(?!\p{L})/iu },
  'day-and-night-model': { ban: /(?<!\p{L})(colou?r|shade)(?!\p{L})/iu },
  'planets-in-order': { ban: /(?<!\p{L})number(?!\p{L})/iu },
  'planet-sizes': { ban: /(?<!\p{L})draw(?!\p{L})/iu },
};
/** Estimated width of a word-bank chip at Nunito 800 18 (0.58 em / char + 24 padding); the F2 render gate is the final word (Phase E). */
// rule 5 — the phase bank's one-row width, MEASURED (never a per-character guess; the old 0.58·18 px/char +
// 24 estimate condemned the fr bank at ~717 px while the real G2-367 render put it on one row at 643.5 px):
// each `.ws-bankword` pill = Nunito 800 18 text (primitives/bankword-nunito800.advances.json, measured by
// tools/measure-bankword-advances.js) + padding 28 + border 4; `.ws-bank` gap 10; the banner's inner width
// on the G2-367 page = 675 − padding 24 − border 4 = 647 (measured on the render; the render gate at
// G1-378 'moon-phase-names' asserts the bank does not wrap, so a drift in this constant is caught there too).
const BW = require('../primitives/bankword-width.js');
const BANK_PX = 18, BANK_GAP = 10, BANK_ROW = 647;
const chipW = (w) => BW.pillWidth(w, BANK_PX);

function validateBank(block, loc, model) {
  const f = [];
  const E = (m) => f.push(m);
  const l = String(loc).slice(0, 2);
  const Mo = model || M;
  if (!block || typeof block !== 'object') return ['no block (rule 1)'];
  const lit = (x) => typeof x === 'string' && x.trim() && x === x.trim() && !/[{}]/.test(x);
  // rule 1 — shape
  for (const b of Mo.BODIES) if (!lit(block.bodies && block.bodies[b])) E(`bodies.${b} missing / empty / untrimmed / slotted (rule 1)`);
  const factIds = Object.keys(Mo.FACTS);
  const have = Object.keys(block.facts || {});
  for (const id of factIds) if (!lit(block.facts && block.facts[id])) E(`facts.${id} missing / empty / untrimmed / slotted (rule 1)`);
  for (const id of have) if (!factIds.includes(id) && !Mo.FORBIDDEN_FACT_IDS.includes(id)) E(`facts.${id} is not a model fact (rule 1)`);
  for (const p of Mo.NAMED_PHASES) if (!lit(block.phaseNames && block.phaseNames[p])) E(`phaseNames.${p} missing / empty (rule 1)`);
  for (const p of Mo.PLANETS) if (!lit(block.planets && block.planets[p])) E(`planets.${p} missing / empty (rule 1)`);
  for (const k of ['sun', 'moon']) if (!lit(block.notPlanet && block.notPlanet[k])) E(`notPlanet.${k} missing / empty (rule 1)`);
  for (const k of ['giant', 'rocky', 'notPlanet']) if (!lit(block.classLabels && block.classLabels[k])) E(`classLabels.${k} missing / empty (rule 1)`);
  if (typeof block.mnemonic !== 'string') E('mnemonic missing (rule 1; may be empty)');
  if (!Array.isArray(block.refuse)) E('refuse is not an array (rule 1)');
  if (!Array.isArray(block.leakForms)) E('leakForms is not an array (rule 1)');
  if (!Array.isArray(block.forbiddenStems) || !block.forbiddenStems.length) E('forbiddenStems missing or empty (rule 1)');
  // rule 2 — the model
  for (const [id, fx] of Object.entries(Mo.FACTS)) {
    if (!Array.isArray(fx.truth) || fx.truth.length !== 3 || fx.truth.filter((x) => x === 1).length !== 1 || fx.truth.some((x) => x !== 0 && x !== 1)) E(`FACTS.${id} truth ${JSON.stringify(fx.truth)} is not exactly one 1 (rule 2)`);
    if (Mo.FORBIDDEN_FACT_IDS.includes(id)) E(`FACTS.${id} is a FORBIDDEN fact (rule 2)`);
  }
  for (const id of have) if (Mo.FORBIDDEN_FACT_IDS.includes(id)) E(`facts.${id} is a FORBIDDEN fact (rule 2)`);
  const need = Math.max(...TYPE.difficulty[2].counts);
  for (const [bi, b] of Mo.BODIES.entries()) {
    const n = Object.values(Mo.FACTS).filter((fx) => fx.truth && fx.truth[bi] === 1 && !fx.size).length;
    if (n < need) E(`${b}: ${n} non-size facts < ${need} (d2 reachability) (rule 2)`);
  }
  // rules 3, 4, 11 — the fact literals
  const gendered = Mo.GENDERED_LOCALES.includes(l);
  if (gendered && !(Array.isArray(block.leakForms) && block.leakForms.length)) E(`leakForms empty in ${l} (a gendered-body locale) (rule 4)`);
  if (gendered && block.genderNeutral !== true) E(`genderNeutral not signed true in ${l} (rule 4)`);
  for (const id of have) {
    const t = block.facts[id];
    if (typeof t !== 'string') continue;
    if (/\p{Nd}/u.test(t)) E(`facts.${id} "${t}" carries a digit (rule 3)`);
    for (const s of block.forbiddenStems || []) if (typeof s === 'string' && s.trim() && hasWord(t, s, l)) E(`facts.${id} "${t}" matches the forbidden stem "${s}" (rule 3)`);
    for (const w of block.leakForms || []) if (typeof w === 'string' && w.trim() && hasWord(t, w, l)) E(`facts.${id} "${t}" contains the leak form "${w}" (rule 4)`);
    if ([...t].length > 80) E(`facts.${id} is ${[...t].length} chars > 80 (rule 11)`);
    for (const b of Mo.BODIES) if (block.bodies && typeof block.bodies[b] === 'string' && fold(t, l) === fold(block.bodies[b], l)) E(`facts.${id} is a body name (rule 3)`);
  }
  // rule 5 — distinct names; the phase bank fits one row
  const distinct = (obj, what) => { const seen = new Map(); for (const [k, v] of Object.entries(obj || {})) { if (typeof v !== 'string') continue; const key = fold(v, l); if (seen.has(key)) E(`${what}.${k} "${v}" equals ${what}.${seen.get(key)} (rule 5)`); seen.set(key, k); } };
  distinct(block.phaseNames, 'phaseNames');
  distinct(block.planets, 'planets');
  const pn = Mo.NAMED_PHASES.map((p) => block.phaseNames && block.phaseNames[p]).filter((x) => typeof x === 'string');
  let bankW = null;
  try { bankW = pn.reduce((a, w) => a + chipW(w), 0) + BANK_GAP * (pn.length - 1); } catch (e) { E(`the phase bank cannot be measured: ${e.message} (rule 5)`); }
  if (bankW !== null && bankW > BANK_ROW) E(`the 4 phase names measure ${bankW.toFixed(1)} px (Nunito 800 ${BANK_PX} + pill padding, gap ${BANK_GAP}) > ${BANK_ROW} (one row) (rule 5)`);
  // rule 6 — no Pluto
  for (const [k, v] of Object.entries(block.planets || {})) for (const p of Mo.PLUTO) if (typeof v === 'string' && hasWord(v, p, l)) E(`planets.${k} "${v}" is Pluto (rule 6)`);
  // rule 6b (Phase E, the F4 bank tell) — the panel's planet literals sort into the model's PLANET_ALPHA order for this
  // locale; the F4 composer keeps its one locale-neutral bank draw clear of every locale's alphabetical order from that table
  if (Mo.PLANET_ALPHA && Mo.PLANET_ALPHA[l] && Mo.PLANETS.every((p) => lit(block.planets && block.planets[p]))) {
    const got = Mo.PLANETS.slice().sort((a, b) => block.planets[a].localeCompare(block.planets[b], l));
    if (got.join() !== Mo.PLANET_ALPHA[l].join()) E(`the ${l} planet names sort as ${got.join(',')} ≠ PLANET_ALPHA.${l} ${Mo.PLANET_ALPHA[l].join(',')} — update the model table so the F4 bank stays clear of it (rule 6b)`);
  }
  // rule 7 — hemisphere
  if (block.hemisphere !== 'N' && block.hemisphere !== 'S') E(`hemisphere "${block.hemisphere}" is not N|S (rule 7)`);
  else if ((block.hemisphere === 'S') !== (l === 'pt')) E(`hemisphere ${block.hemisphere} in ${l} (S iff pt) (rule 7)`);
  // rule 8 — "giant", never "gas"
  const g = block.classLabels && block.classLabels.giant;
  if (typeof g === 'string' && Mo.GAS_STEMS.some((s) => new RegExp('(?<!\\p{L})' + escRe(s), 'iu').test(g)) && !(block.gasCitation && String(block.gasCitation).trim())) E(`classLabels.giant "${g}" carries a gas stem (Uranus and Neptune are ice giants) (rule 8)`);
  // rules 9, 10, 12 — strings
  const strings = block.strings || {};
  const keys = Object.keys(strings);
  const miss = MODES.filter((m) => !keys.includes(m)), extra = keys.filter((m) => !MODES.includes(m));
  if (miss.length || extra.length) E(`strings keys: missing [${miss.join(', ')}] extra [${extra.join(', ')}] (rule 12)`);
  const spaceName = TAX.axes.theme.space && TAX.axes.theme.space.name[l], spaceSlug = TAX.axes.theme.space && TAX.axes.theme.space.slug[l];
  const k208t = k208(l);
  for (const m of MODES) {
    const s = strings[m];
    if (!s) continue;
    const t = s.title, ins = s.instruction;
    if (!lit(t)) E(`strings.${m}.title empty / untrimmed (rule 9)`);
    if (!lit(ins)) E(`strings.${m}.instruction empty / untrimmed (rule 9)`);
    if (typeof t !== 'string' || typeof ins !== 'string') continue;
    if ([...t].length > 70) E(`strings.${m}.title ${[...t].length} chars > 70 (rule 9)`);
    if ([...ins].length > 150) E(`strings.${m}.instruction ${[...ins].length} chars > 150 (rule 9)`);
    if (WORKSHEET_WORD.test(t)) E(`strings.${m}.title "${t}" carries a worksheet-word (rule 9)`);
    for (const x of [spaceName, spaceSlug]) if (x && (hasWord(t, x, l) || fold(t, l).includes(fold(x, l)))) E(`strings.${m}.title "${t}" contains the space theme name / slug "${x}" (rule 9)`);
    if (m === 'day-and-night-model' && k208t && fold(t, l).trim() === fold(k208t, l).trim()) E(`strings.day-and-night-model.title "${t}" equals the K-208 title (rule 9)`);
    const fc = freeClaim.hit(t) || freeClaim.hit(ins);
    if (fc) E(`strings.${m} claims free ("${fc}") (rule 9)`);
    if (l === 'en') {
      if (/answer\s*key|with\s+answers|solutions?(?!\p{L})/iu.test(t + ' ' + ins)) E(`strings.${m} promises an answer key (rule 9: printable decks ship none)`);
      if (m === 'base' && BASE_BAN.test(ins)) E(`strings.base.instruction "${ins}" names circle / line / write (rule 10)`);
      const r = FACE_RULE[m];
      if (r && r.ban && r.ban.test(ins)) E(`strings.${m}.instruction "${ins}" names a banned apparatus word (rule 10)`);
      if (r && r.need && !r.need.test(ins)) E(`strings.${m}.instruction does not name the word bank (rule 10)`);
    }
  }
  const titles = MODES.map((m) => strings[m] && strings[m].title).filter((x) => typeof x === 'string');
  const tokens = (s) => new Set(fold(s, l).split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  for (let i = 0; i < titles.length; i++) for (let j = i + 1; j < titles.length; j++) {
    const a = tokens(titles[i]), b = tokens(titles[j]);
    const diff = [...a].filter((x) => !b.has(x)).length + [...b].filter((x) => !a.has(x)).length;
    if (diff === 0) E(`titles "${titles[i]}" and "${titles[j]}" do not differ by a token (rule 12)`);
  }
  return f;
}

const LEAK = { de: ['er', 'ihn', 'sein', 'seine', 'der'], fr: ['il', 'elle', 'lui', 'ils', 'elles'], es: ['el más', 'él', 'lo'], it: ['il più', 'lui', 'lei'], pt: ['o mais', 'ele', 'ela'] };
/** A synthetic locale block: the EN literals in the locale's CONVENTION slots (hemisphere, leakForms) — what the render + rule checks need. */
function syntheticBlock(loc) {
  const b = clone(bankMod.EARTH_AND_SPACE_LOC.en);
  b.hemisphere = loc === 'pt' ? 'S' : 'N';
  if (LEAK[loc]) b.leakForms = LEAK[loc].slice();
  return b;
}

/* =================================================================== node-side page reading */
const cfgFromHtml = (html) => JSON.parse(/data-lcs-cfg="([^"]+)"/.exec(html)[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
const rowsFromHtml = (html) => [...html.matchAll(/data-lcs-row="(\d+)" data-lcs-fact="([^"]+)" data-lcs-body="([^"]+)"/g)].map((m) => ({ n: +m[1], id: m[2], body: m[3] }));
/** The gate's OWN page checks (bodies re-derived from the model, never the stamp). */
function checkPage(name, html, cfg) {
  const f = [];
  const rows = rowsFromHtml(html);
  if (rows.length !== cfg.rows) f.push(`${name}: ${rows.length} rows ≠ ${cfg.rows}`);
  const seq = rows.map((r) => M.BODIES[M.FACTS[r.id].truth.indexOf(1)]);
  rows.forEach((r, i) => { if (seq[i] !== r.body) f.push(`${name} row ${i + 1}: stamp ${r.body} ≠ model ${seq[i]}`); if (M.FACTS[r.id].size && !cfg.sizeFacts) f.push(`${name} row ${i + 1}: size fact with sizeFacts off`); });
  const cnt = Object.fromEntries(M.BODIES.map((b) => [b, seq.filter((x) => x === b).length]));
  if (M.BODIES.map((b) => cnt[b]).sort().join() !== [...cfg.counts].sort().join()) f.push(`${name}: column counts ${JSON.stringify(cnt)} not a permutation of ${cfg.counts}`);
  for (const b of M.BODIES) if (cnt[b] < 2) f.push(`${name}: the ${b} column holds ${cnt[b]} answers (< 2 — a column empty of answers)`);
  if (seq[0] === 'sun') f.push(`${name}: row 1 is a Sun fact (tell)`);
  for (let i = 2; i < seq.length; i++) if (seq[i] === seq[i - 1] && seq[i] === seq[i - 2]) { f.push(`${name}: a run of three ${seq[i]} facts (tell)`); break; }
  for (const p of [2, 3]) if (seq.every((b, i) => i + p >= seq.length || b === seq[i + p])) f.push(`${name}: periodic answer pattern (period ${p}) (tell)`);
  if (new Set(rows.map((r) => r.id)).size !== rows.length) f.push(`${name}: a fact repeats`);
  if (/<img\b/.test(html)) f.push(`${name}: an <img> in the body`);
  return { f, seq, cnt };
}

/* =================================================================== 2. RENDER */
async function renderWith(page, type, { difficulty, baseName, strings, seedEpoch, locale }) {
  const { renderInstance } = require('../render/render-instance.js');
  const out = await renderInstance({ type, theme: null, difficulty, locale: locale || 'en', page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="G1-378"]');
    const blocks = root ? [...root.querySelectorAll('.es-draw svg, [data-lcs-pill], .es-badge, [data-lcs-fact-text], [data-lcs-tick], .ws-page img')].map(rect) : [];
    return {
      body: rect(document.querySelector('[data-lcs-body]')),
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
      chart: root && root.querySelector('.es-chart') ? rect(root.querySelector('.es-chart')) : null,
      imgs: document.querySelectorAll('.ws-page img').length,
      blocks,
      ticks: root ? [...root.querySelectorAll('[data-lcs-tick]')].map((t) => ({ ...rect(t), filled: !!(t.textContent.trim() || t.children.length) })) : [],
      facts: root ? [...root.querySelectorAll('[data-lcs-fact-text]')].map((p) => { const cs = getComputedStyle(p); return { ...rect(p), px: parseFloat(cs.fontSize), lh: parseFloat(cs.lineHeight), font: cs.fontFamily, text: p.textContent }; }) : [],
      badges: root ? [...root.querySelectorAll('.es-badge')].map(rect) : [],
      pills: root ? [...root.querySelectorAll('[data-lcs-pill]')].map((p) => ({ ...rect(p), sw: p.scrollWidth, cw: p.clientWidth, text: p.textContent })) : [],
      discs: root ? [...root.querySelectorAll('[data-lcs-head]')].map((h) => { const c = h.querySelector('[data-lcs-part="disc"]'); return c ? c.getBoundingClientRect().width : 0; }) : [],
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, html: out.html };
}

/** The largest blank vertical band between consecutive content blocks (union of the blocks' vertical extents). */
function maxBand(blocks) {
  const iv = blocks.filter((b) => b.h > 0).map((b) => [b.top, b.bottom]).sort((a, b) => a[0] - b[0]);
  let best = 0, end = iv.length ? iv[0][1] : 0;
  for (const [t, b] of iv.slice(1)) { if (t > end) best = Math.max(best, t - end); end = Math.max(end, b); }
  return best;
}

function assertRender(name, r, cfg) {
  const f = [];
  const F = (c, msg) => { assertions++; if (!c) f.push(msg); };
  F(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  F(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  F(r.m.imgs === 0, `${name}: ${r.m.imgs} <img> — a library picture (no picture on any face)`);
  F(r.m.ticks.length === cfg.rows * 3, `${name}: ${r.m.ticks.length} tick boxes ≠ ${cfg.rows * 3}`);
  for (const t of r.m.ticks) {
    F(t.w >= Math.max(44, cfg.tick) - 0.5 && t.h >= Math.max(44, cfg.tick) - 0.5, `${name}: a tick box ${t.w.toFixed(1)}×${t.h.toFixed(1)} under the G1 floor 44 / tick ${cfg.tick}`);
    F(!t.filled, `${name}: a tick box is not empty (answer printed)`);
    F(t.bottom <= r.m.foot + 0.6, `${name}: a tick box reaches past the footer`);
  }
  for (const p of r.m.facts) {
    F(p.px >= cfg.factPx - 0.01 && /nunito/i.test(p.font), `${name}: fact "${p.text}" at ${p.px} px ${p.font} (Nunito ${cfg.factPx})`);
    F(Math.round(p.h / p.lh) <= 2, `${name}: fact "${p.text}" runs to ${Math.round(p.h / p.lh)} lines (max 2)`);
    F(p.bottom <= r.m.foot + 0.6, `${name}: fact "${p.text}" past the footer`);
  }
  for (const b of r.m.badges) F(Math.abs(b.w - 30) < 0.6 && Math.abs(b.h - 30) < 0.6, `${name}: a row badge ${b.w.toFixed(1)}×${b.h.toFixed(1)} (30)`);
  for (const p of r.m.pills) F(p.sw <= p.cw + 0.5 && p.w <= cfg.col + 0.5, `${name}: pill "${p.text}" clipped / wider than ${cfg.col} (${p.w.toFixed(1)})`);
  F(r.m.discs.length === 3 && r.m.discs[0] > r.m.discs[1] && r.m.discs[1] > r.m.discs[2] && r.m.discs[2] > 0, `${name}: head discs ${r.m.discs.map((x) => x.toFixed(1)).join(' / ')} not strictly decreasing (Sun > Earth > Moon)`);
  F(!!r.m.chart && r.m.chart.bottom <= r.m.foot + 0.6, `${name}: the chart reaches past the footer`);
  F(!!r.m.chart && Math.abs(r.m.chart.top - r.m.body.top) < 1, `${name}: the chart is not top-anchored (top ${r.m.chart && r.m.chart.top.toFixed(0)} vs body ${r.m.body.top.toFixed(0)})`);
  const band = maxBand(r.m.blocks);
  F(band <= SPARSE_MAX, `${name}: SPARSE — ${band.toFixed(0)} px blank band between consecutive content blocks (> ${SPARSE_MAX}; the slack must fall below the chart)`);
  r.band = band;
  return f;
}

/* chrome fixtures (README ruling): 722 = a 3-line title + a 3-line instruction; 677 = a 4-line fi title */
const LONG = {
  de: { title: 'Sonne, Erde und Mond: welcher Satz passt zu welchem Himmelskörper hier?', instruction: 'Lies jeden Satz ganz genau durch. Geht es um die Sonne, um die Erde oder um den Mond? Kreuze danach in jeder Zeile genau ein einziges Kästchen unter dem richtigen Himmelskörper an.', body: 722 },
  fi: { title: 'Tasokuviot: nimeä käännetyt, kapeat, pienet ja suuret tasokuviot oikein', instruction: 'Katso jokaista kuviota tarkasti, myös käännettyjä, kapeita ja pieniä kuvioita, ja ympyröi sitten jokaisen kuvion vierestä sen oikea nimi selvästi kynällä, yksi nimi jokaiselle kuviolle.', body: 677 },   // the K-368 fixture, MEASURED at a 677 body (the chrome is all that matters here)
};
/** The long fixture bank: every fact padded to ~62 chars (the de / fi +40 %), a 9-char body name. */
function longBlock() {
  const b = clone(bankMod.EARTH_AND_SPACE_LOC.en);
  const pad = ' and that is true every single day of the year';
  for (const id of Object.keys(b.facts)) { let t = b.facts[id].replace(/\.$/, ''); t = (t + pad).slice(0, 61).replace(/\s+\S*$/, '') + '.'; b.facts[id] = t; }
  b.bodies = { sun: 'Aurinko', earth: 'la Tierra', moon: 'Kuu' };
  return b;
}

/* =================================================================== poison helpers */
const poisonLog = [];
let killed = 0, total = 0;
function judge(name, findings, re) {
  total++;
  const v = findings.some((x) => re.test(x)) ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  if (v === 'KILLED') killed++;
  poisonLog.push(`  ${name}: ${v}${v === 'KILLED' ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
}
function rewired(block, fn, cfgPatch) {
  return Object.assign(Object.create(TYPE), { build(args, ctx) {
    const cfg = { ...TYPE.difficulty[args.difficulty], ...(cfgPatch || {}) };
    const out = TYPE._buildWith(block, cfg, { locale: args.locale }, ctx);
    if (fn) out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });
}

/* =================================================================== main */
async function main() {
  const en = bankMod.EARTH_AND_SPACE_LOC.en;
  // 0. primitive gates
  for (const g of ['verify-moon-phase.js', 'verify-sky-bodies.js', 'verify-planets.js']) {
    let outp = '', code = 0;
    try { outp = execFileSync(process.execPath, [path.join(__dirname, g), ...(QUICK ? ['--no-sheets'] : [])], { encoding: 'utf8' }); } catch (e) { outp = (e.stdout || '') + (e.stderr || ''); code = e.status || 1; }
    const line = outp.trim().split('\n').pop();
    ok(code === 0 && /^PASS/.test(line), `qa/${g}: ${line}`);
    console.log(`${g}: ${line}`);
  }
  // 1. banks
  {
    const f = validateBank(en, 'en');
    ok(f.length === 0, `EN bank: ${f.length} findings\n    ` + f.join('\n    '));
    console.log(`bank en: 3 bodies, ${Object.keys(en.facts).length} facts, 4 phase names, 8 planets, ${Object.keys(en.strings).length} strings — ${f.length} findings`);
    for (const loc of LOCALES.filter((x) => x !== 'en')) {
      const sf = validateBank(syntheticBlock(loc), loc).filter((x) => /\(rule (2|4|6|7|8)\)/.test(x));
      ok(sf.length === 0, `synthetic ${loc} block: ${sf.length} convention findings\n    ` + sf.join('\n    '));
    }
    ok(en.strings.base.title === TYPE.i18n.en.title && en.strings.base.instruction === TYPE.i18n.en.instruction, 'the bank strings.base ≠ the spec i18n.en');
    const strEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', 'strings.en.json'), 'utf8'))['G1-378'];
    ok(!!strEn && strEn.title === en.strings.base.title && strEn.instruction === en.strings.base.instruction, `i18n/strings.en.json G1-378 ${JSON.stringify(strEn)} ≠ the bank strings.base (run node i18n/build-en.js)`);
  }
  // 1b. bank poisons (design §5 P1-P12)
  {
    const P = (name, block, loc, re, model) => judge(name, validateBank(block, loc, model), re);
    let b, mo;
    mo = clone(M); mo.FACTS.orbitsSun = { truth: [0, 1, 0] }; P('P1 fact orbitsSun in FACTS', en, 'en', /FACTS\.orbitsSun is a FORBIDDEN fact \(rule 2\)/, mo);
    mo = clone(M); mo.FACTS.ownLight.truth = [1, 0, 1]; P('P2 ownLight.truth = [1,0,1]', en, 'en', /FACTS\.ownLight truth \[1,0,1\] is not exactly one 1 \(rule 2\)/, mo);
    b = clone(en); b.facts.ownLight = 'It gives us light.'; P('P3 en fact "It gives us light."', b, 'en', /facts\.ownLight .* forbidden stem "gives us light" \(rule 3\)/);
    b = syntheticBlock('fr'); b.facts.orbitsEarth = 'Elle tourne autour de la Terre.'; P('P4 fr fact "Elle tourne autour de la Terre."', b, 'fr', /facts\.orbitsEarth .* leak form "elle" \(rule 4\)/);
    b = syntheticBlock('es'); b.facts.hottest = 'Es el más caliente de los tres.'; P('P5 es fact "Es el más caliente de los tres."', b, 'es', /facts\.hottest .* leak form "el más" \(rule 4\)/);
    b = syntheticBlock('pt'); b.hemisphere = 'N'; P('P6 pt hemisphere N', b, 'pt', /hemisphere N in pt .*\(rule 7\)/);
    b = syntheticBlock('sv'); b.hemisphere = 'S'; P('P7 sv hemisphere S', b, 'sv', /hemisphere S in sv .*\(rule 7\)/);
    b = syntheticBlock('de'); b.phaseNames = { 0: 'Neumond', 2: 'Halbmond', 4: 'Vollmond', 6: 'Halbmond' }; P('P8 de phaseNames 2 === 6 "Halbmond"', b, 'de', /phaseNames\.6 "Halbmond" equals phaseNames\.2 \(rule 5\)/);
    b = clone(en); b.planets.neptune = 'Pluto'; P('P9 planets include "Pluto"', b, 'en', /planets\.neptune "Pluto" is Pluto \(rule 6\)/);
    b = clone(en); b.classLabels.giant = 'gas planets'; P('P10 classLabels.giant "gas planets"', b, 'en', /classLabels\.giant "gas planets" carries a gas stem .*\(rule 8\)/);
    b = clone(en); b.strings.base.title = 'Space'; P('P11 base title "Space"', b, 'en', /strings\.base\.title "Space" contains the space theme name/);
    b = syntheticBlock('de'); b.strings.base.title = 'Weltraum'; P('P11 de base title "Weltraum"', b, 'de', /strings\.base\.title "Weltraum" contains the space theme name/);
    b = clone(en); b.facts.hottest = 'It is 150 million km away.'; P('P12 en fact "It is 150 million km away."', b, 'en', /facts\.hottest .* carries a digit \(rule 3\)/);
    // rule 5, measured (2026-09-23): both sides of the 647 px row, each checked on the real G2-367 fr render —
    // the fr panel's set = 643.5 px on ONE row; "dernier quartier." = 647.7 px and "nouvelle Lune / pleine Lune" =
    // 651.8 px each WRAP the bank to 2 rows (render verify: 'the word bank wraps to 2 rows').
    const FR4 = { 0: 'nouvelle lune', 2: 'premier quartier', 4: 'pleine lune', 6: 'dernier quartier' };
    { b = syntheticBlock('fr'); b.phaseNames = { ...FR4 }; const f = validateBank(b, 'fr').filter((x) => /phase bank|phase names measure/.test(x));
      poisonLog.push(`  C5 fr phase bank "${Object.values(FR4).join(' / ')}" (643.5 px, one row on the render): ${f.length ? 'WRONGLY FIRES — ' + f[0] : 'passes rule 5 (control)'}`);
      ok(!f.length, 'C5: the fr phase bank that renders on one row must pass rule 5'); }
    b = syntheticBlock('fr'); b.phaseNames = { ...FR4, 6: 'dernier quartier.' }; P('R5a fr phase bank 647.7 px (wraps on the render)', b, 'fr', /phase names measure 647\.7 px .* > 647 \(one row\) \(rule 5\)/);
    b = syntheticBlock('fr'); b.phaseNames = { ...FR4, 0: 'nouvelle Lune', 4: 'pleine Lune' }; P('R5b fr phase bank "nouvelle Lune / pleine Lune" 651.8 px', b, 'fr', /phase names measure 651\.8 px .*\(rule 5\)/);
    b = syntheticBlock('fr'); b.phaseNames = { ...FR4, 2: 'premier quartierł' }; P('R5c fr phase name with an unmeasured character', b, 'fr', /phase bank cannot be measured: .*no measured advance .*\(rule 5\)/);
    b = syntheticBlock('fi'); b.planets = { ...b.planets, earth: 'Maa' }; P('P13 fi "Maa" against an en-ordered PLANET_ALPHA.fi', b, 'fi', /the fi planet names sort as .* ≠ PLANET_ALPHA\.fi .*\(rule 6b\)/, { ...M, PLANET_ALPHA: { ...M.PLANET_ALPHA, fi: M.PLANET_ALPHA.en } });
  }

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    // 2. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-378-gate-d${d}-en` });
      const cfg = cfgFromHtml(r.html);
      const f = assertRender(`d${d}`, r, cfg);
      fails.push(...f);
      pngs.push(r.png);
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.w)}×${Math.round(r.m.body.h)} chart ${Math.round(r.m.chart.h)} heads ${r.m.discs.map((x) => x.toFixed(1)).join('>')} max band ${r.band.toFixed(0)} px — ${f.length} findings`);
    }
    const lb = longBlock();
    for (const k of Object.keys(LONG)) {
      const r = await renderWith(page, rewired(lb, null), { difficulty: 2, baseName: `G1-378-gate-d2-${k}-longchrome`, strings: LONG[k], locale: k });
      const f = assertRender(`d2 long chrome ${k}`, r, cfgFromHtml(r.html));
      fails.push(...f);
      ok(r.m.body.h <= LONG[k].body + 0.5, `d2 long chrome ${k}: body ${Math.round(r.m.body.h)} — the fixture did not squeeze the body to <= ${LONG[k].body}`);
      ok(r.m.facts.every((p) => Math.round(p.h / p.lh) === 2), `d2 long chrome ${k}: the ~62-char fixture facts do not all run to exactly 2 lines (${r.m.facts.map((p) => Math.round(p.h / p.lh)).join(',')})`);
      pngs.push(r.png);
      console.log(`render d2 long chrome ${k}: body ${Math.round(r.m.body.h)} px (target <= ${LONG[k].body}), chart ${Math.round(r.m.chart.h)}, facts ${r.m.facts.map((p) => Math.round(p.h / p.lh)).join('')} lines, pills ${r.m.pills.map((p) => p.w.toFixed(0)).join('/')}, max band ${r.band.toFixed(0)} — ${f.length} findings`);
    }

    // 3. sweep + answer-position tells
    const SEEDS = QUICK ? 10 : 40;
    const pos = {};   // row -> body -> n
    const twoBody = {};
    let sweepN = 0;
    for (const d of [1, 2, 3]) for (let e = 1; e <= SEEDS; e++) {
      const rng = () => makeRng(instanceSeed({ typeId: 'G1-378', theme: null, difficulty: d, seedEpoch: e }));
      let out;
      try { out = TYPE._buildWith(en, TYPE.difficulty[d], { locale: 'en' }, { rng: rng() }); } catch (err) { ok(false, `sweep d${d} seed ${e}: threw ${err.message}`); continue; }
      const cfg = cfgFromHtml(out.bodyHtml);
      const c = checkPage(`sweep d${d} seed ${e}`, out.bodyHtml, cfg);
      for (const x of c.f) ok(false, x);
      assertions++; sweepN++;
      if (d === 2) {
        c.seq.forEach((b, i) => { pos[i + 1] = pos[i + 1] || {}; pos[i + 1][b] = (pos[i + 1][b] || 0) + 1; });
        const two = M.BODIES.find((b) => c.cnt[b] === 2); twoBody[two] = (twoBody[two] || 0) + 1;
        const outDe = TYPE._buildWith(syntheticBlock('de'), TYPE.difficulty[d], { locale: 'de' }, { rng: rng() });
        ok(rowsFromHtml(outDe.bodyHtml).map((r) => r.id).join() === rowsFromHtml(out.bodyHtml).map((r) => r.id).join(), `sweep d2 seed ${e}: the de page draws different facts / rows than en (the seed must carry no locale)`);
      }
    }
    const shares = Object.fromEntries(Object.entries(pos).map(([row, m]) => [row, Object.fromEntries(M.BODIES.map((b) => [b, +((m[b] || 0) / SEEDS).toFixed(2)]))]));
    for (const [row, m] of Object.entries(shares)) {
      ok(Math.max(...Object.values(m)) <= 0.6, `pooled row ${row}: body share ${JSON.stringify(m)} — one body > 60 % of the d2 pages (position tell)`);
      for (const b of M.BODIES) if (!(row === '1' && b === 'sun')) ok(m[b] > 0, `pooled row ${row}: the ${b} column never holds that row's answer over ${SEEDS} pages`);
    }
    for (const b of M.BODIES) ok((twoBody[b] || 0) / SEEDS >= 0.15, `pooled: the ${b} column is the 2-fact column on ${twoBody[b] || 0}/${SEEDS} pages (< 15 %: the column count is a tell)`);
    console.log(`sweep: ${sweepN} pages (d1-d3 x ${SEEDS} seeds, epoch 1 = shipped) — per page: every column >= 2 answers, no run of 3, not periodic, row 1 not Sun; pooled d2 row shares ${JSON.stringify(shares)}; 2-fact column ${JSON.stringify(twoBody)}`);
    if (!QUICK) {
      for (let e = 2; e <= 20; e++) {
        const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-378-gate-sweep-s${e}`, seedEpoch: e });
        fails.push(...assertRender(`render sweep d2 seed ${e}`, r, cfgFromHtml(r.html)));
      }
      console.log('render sweep: d2 seeds 2..20 rendered + verified');
    }
    {
      // the de block is hidden for the probe (all 11 locales are authored; see qa/b5-unauthored.js)
      const U = require('./b5-unauthored.js');
      const p = U.refusalProbe('earth-and-space', 'de', () => TYPE.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }));
      ok(U.refused(p.hidden, /has no de block/), `an unauthored locale must REFUSE: ${p.hidden || 'built'}`);
      ok(!U.refused(p.real, /has no de block/), `poison — the authored de page passed the unauthored-refusal check (got ${p.real})`);
    }

    // 4. render poisons
    const gateOf = async (type, name, d = 2) => {
      const r = await renderWith(page, type, { difficulty: d, baseName: `G1-378-poison-${name}` });
      return [...r.verify.map((x) => 'verify: ' + x), ...r.lints.map((x) => 'lint: ' + x), ...assertRender(name, r, cfgFromHtml(r.html)).filter((x) => !/verify\(\)|lints /.test(x))];
    };
    judge('PR12 head Sun at discR 20', await gateOf(rewired(en, null, { sunDiscR: 20 }), 'PR12'), /head discs .* not strictly decreasing/);
    judge('PR14 <img src=".../space/...">', await gateOf(rewired(en, (h) => h.replace('<div class="es-chart"', '<img src="../../cache/themes/space/moon@3x.webp" style="width:40px;height:40px"><div class="es-chart"')), 'PR14'), /<img/);
    judge('PT rows sorted by body', await gateOf(rewired(en, (h) => {
      const parts = h.split('<div class="es-row"');
      const last = parts[parts.length - 1];
      const endAt = last.indexOf('</span></div></div>', last.lastIndexOf('data-lcs-tick="moon"')) + '</span></div></div>'.length;
      const tail = last.slice(endAt);
      const rows = [...parts.slice(1, -1), last.slice(0, endAt)].map((r) => '<div class="es-row"' + r);
      const order = { sun: 0, earth: 1, moon: 2 };
      const sorted = rows.slice().sort((a, b) => order[/data-lcs-body="(\w+)"/.exec(a)[1]] - order[/data-lcs-body="(\w+)"/.exec(b)[1]])
        .map((r, i) => r.replace(/data-lcs-row="\d+"/, `data-lcs-row="${i + 1}"`).replace(/(class="es-badge"[^>]*>)\d+</, `$1${i + 1}<`));
      const out = parts[0] + sorted.join('') + tail;
      if (out === h) throw new Error('PT: the needle changed nothing');
      return out;
    }), 'PT'), /three \w+ facts in a run|a run of three|row 1 is a Sun fact|periodic/);
    judge('PW a fact text ≠ the literal', await gateOf(rewired(en, (h) => h.replace(/(data-lcs-fact-text[^>]*>)It is a star\./, '$1It is a starr.').replace(/(data-lcs-fact-text[^>]*>)It is covered in craters\./, '$1It is covered in craterz.')), 'PW'), /fact text ".*" ≠ the literal/);
    judge('PB a tick box pre-filled', await gateOf(rewired(en, (h) => h.replace(/(data-lcs-tick="earth"[^>]*>)(<\/span>)/, '$1x$2')), 'PB'), /tick box .*not empty/);
    {
      const b = clone(en); b.facts.star = 'It is a star, a huge ball of very hot glowing gas, and it is the closest star to us, far closer than all of the others.';
      const always = rewired(b, (h) => h.replace(/(data-lcs-fact-text[^>]*>)[^<]*</, `$1${b.facts.star}<`));
      judge('PC a 3-line fact', await gateOf(always, 'PC'), /runs to 3 lines/);
    }
    judge('PS the row cap removed at d1 (sparse)', await gateOf(rewired(en, (h) => h.replace(/max-height:\d+px;min-height:0/, 'min-height:0')), 'PS', 1), /SPARSE — \d+ px blank band/);
    {
      let m = null; try { TYPE._buildWith(en, { ...TYPE.difficulty[2], tick: 40 }, { locale: 'en' }, { rng: makeRng('px') }); } catch (e) { m = e.message; }
      judge('PX tick 40 (spec guard)', m ? [m] : [], /tick 40 < the G1 floor 44/);
      judge('PX tick 40 px (render floor past the guard)', await gateOf(rewired(en, (h) => h.replace(/width:44px;height:44px;flex:0 0 44px/g, 'width:40px;height:40px;flex:0 0 40px')), 'PX'), /under the G1 floor 44/);
    }
    {
      let m = null; try { TYPE._buildWith(en, { ...TYPE.difficulty[2], layout: 'moon-dance' }, { locale: 'en' }, { rng: makeRng('f') }); } catch (e) { m = e.message; }
      judge('an unknown layout at difficulty 2', m ? [m] : [], /unknown layout "moon-dance"/);
      const out = TYPE._buildWith(en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('f') });
      ok(!/data-lcs-layout/.test(out.bodyHtml), 'the base page carries data-lcs-layout (byte-identical rule)');
    }
    // 5. the five faces (Phase E) — qa/b5-earth-and-space-faces.js
    {
      const { faceSection } = require('./b5-earth-and-space-faces.js');
      const { renderInstance } = require('../render/render-instance.js');
      pngs.push(...await faceSection({ page, ok, judge, renderInstance, OUT, LONG, quick: QUICK, log: poisonLog }));
    }
    { const ctl = await gateOf(TYPE, 'control'); ok(ctl.length === 0, `poison control (untouched d2): ${JSON.stringify(ctl.slice(0, 3))}`); }
    { const ctl = await gateOf(TYPE, 'control-d1', 1); ok(ctl.length === 0, `poison control (untouched d1, the PS control): ${JSON.stringify(ctl.slice(0, 3))}`); }
  } finally { await browser.close(); }

  console.log('poison:\n' + poisonLog.join('\n') + '\n  primitive poisons: PR1 PR2 (moon-phase) · PR6 PR8 PR12 (sky-bodies) · PR10 (planets) — in step 0\n  face poisons (Phase E): PR3 PR4 PR5 PR6 PR7 PR8 PR9 PR10 PR11 PR13 + pt mirror, lit stamp, planet order, drawing leaks, SPARSE / FILL / apparatus — above');
  console.log('renders:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  ') + (fails.length > 40 ? `\n  … ${fails.length - 40} more` : ''));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, syntheticBlock, checkPage, maxBand };
