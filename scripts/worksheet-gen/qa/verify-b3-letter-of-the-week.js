#!/usr/bin/env node
/**
 * verify-b3-letter-of-the-week.js — the K-317 `letter-of-the-week` gate
 * (design file §5; brief deliverable 4) — base + the five nt20-C faces
 * (K-325 words-with · K-326 positions · K-327 circle-and-count · G1-311 unit ·
 * K-328 pair; _FACE-BRIEF.md deliverable 3).
 *
 *   node scripts/worksheet-gen/qa/verify-b3-letter-of-the-week.js [--quick]
 *
 * 1. BANK — every locale block of data/b3/letter-of-the-week.js against the
 *    §5 validator rules (1) word ↔ approved-words-<loc>.json by key (da strict),
 *    (2) graphemes.join === word, (3) de/nl/sv/no graphemes === approved
 *    chunks.flat(), (4) pos = first target grapheme, (5) foils NFD-free of L,
 *    (6) the pinned (theme, noun) carries the key in the colour picture index
 *    and no localized BW marker, (7) no duplicate word per letter, case rule,
 *    traceable(), (8) pair letter has >= 4 initial words in the eligible pool
 *    + the block carries >= 2 pair-initial and >= 4 avoid-initial foils (what
 *    d3 / d2 draw), (9) floors 8 initial / 2 medial / 2 final / 6 foils,
 *    (10) title <= 70 without the worksheet word, instruction <= 150 — for
 *    the base AND every face id, and the bank's face strings === the emitted
 *    specs' i18n.en (two copies that cannot drift), (11) units >= 2 chars with
 *    the unit as ONE grapheme in >= 8 items, >= 6 foils free of the unit
 *    substring, every unit picture pinned + approved, pos = first unit
 *    grapheme; >= 3 units or `refuse.F5`.
 *    FACE CAPACITY (reported per letter; a FAIL only for the exemplar, which
 *    must ship every face): F3 once-only 2/2/2 (letter or syllable mode),
 *    F4 >= rows words at 1..2 occurrences <= maxLetters reaching minTotal
 *    (de/nl/sv/no: every L its OWN grapheme), F6 >= 4 pair-initial foils.
 *    The gate MAY read approved-words / the picture index; the spec never does.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): the base (exemplar d1/d2/d3 + every letter at d2), every face at
 *    d2 for the exemplar (+ every unit for G1-311, + every other letter for
 *    K-325/326/327/328), and the worst legal chrome (70-char title +
 *    150-char instruction) on the tallest stacks. Asserts verify() empty,
 *    qa/lints.js clean, and ITSELF the floors (`.ws-icon` >= K 56 / G1 44 px
 *    measured in the page; position boxes, answer boxes and letter chips
 *    >= 30 px — qa/lints.js has no element-size lint), counts === config,
 *    stamps === config, every zone inside the body column and above the footer.
 * 3. SWEEP (skipped by --quick) — 20 seeds: base hits in >= 6 of 8 slots +
 *    >= 2 hit sets; K-326 every position lands in >= 4 of 6 slots; K-328 each
 *    letter lands in >= 6 of 8 slots.
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON, no fail = SILENT; either exits 1). The correct EN
 *    bank is the control (0 findings, renders clean).
 *      P1 every foil of the m page is an m-initial item  → bank rule 5 + verify()
 *      P2 de `Schaf` with graphemes s·c·h·a·f            → bank rule 3 (chunks)
 *      P3 fr foil `école` on the e page                  → bank rule 5 (NFD)
 *      P4 an item pinned to `zoo animals bw`             → bank rule 6 (BW marker)
 *      P5 pos:1 on a word-initial letter                 → bank rule 4
 *      P6 hunt icon forced to 48 px                      → the gate's own floor
 *      P7 K-325: an m-INITIAL word stamped as an anywhere hit   → verify()
 *      P8 K-325: a bank with no medial m words           → the spec REFUSES
 *      P9 K-326: a card stamped pos 1 for a word-initial letter → verify()
 *     P10 K-326: "hammer" (m twice) on the position face  → verify()
 *     P11 K-327: an answer box one short of the count + a caps row printing
 *         lowercase                                       → verify()
 *     P12 G1-311: "shark" split s·h + "grasshopper" as an sh foil → bank rule 11
 *         / rule 5(F5) + the spec REFUSES + verify()
 *     P13 K-328: "mask" stamped n + the chips swapped     → verify()
 *     P14 K-326 position box forced to 24 px / K-328 chip to 24 px → the gate's floor
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { approvedByKey, approvedWords, daStrict, hasChunkLayer, nfdBase, bankModule } = require('../lib/b3-common.js');
const { candidates, hasPicture } = require('../lib/b3-picture-index.js');
const { traceable, displayWord } = require('../lib/b2-common.js');
const tokens = require('../primitives/_tokens.js');

const TYPE = require('../types/k/K-317-letter-of-the-week.js');
const FACES = {
  'K-325': require('../types/k/K-325-letter-of-the-week-words-with.js'),
  'K-326': require('../types/k/K-326-letter-of-the-week-beginning-middle-end.js'),
  'K-327': require('../types/k/K-327-letter-of-the-week-circle-and-count.js'),
  'G1-311': require('../types/g1/G1-311-sound-of-the-week.js'),
  'K-328': require('../types/k/K-328-letter-of-the-week-m-or-n.js'),
};
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const MIN_ICON = { K: tokens.density.K.minElement, G1: tokens.density.G1.minElement };   // 56 / 44
const MIN_BOX = 30;   // design §3: the 30 px answer floor for boxes + chips
const FLOOR = { initial: 8, medial: 2, final: 2, foils: 6 };
const UNIT_FLOOR = { items: 8, foils: 6, units: 3 };
const POISONS = 14;

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
const count = (w, L) => [...nfdBase(w)].filter((c) => c === L).length;

/* ------------------------------------------------------------------ bank */
function validateBank(bank, loc) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  if (!['letter', 'sound'].includes(bank.level)) push(`level "${bank.level}" is not letter|sound`);
  if (!['letter', 'syllable'].includes(bank.positionMode)) push(`positionMode "${bank.positionMode}"`);
  if (!Array.isArray(bank.letters) || !bank.letters.length) { push('no letters'); return { findings: f, capacity: {} }; }
  if (!bank.letters.some((l) => l.L === bank.exemplar)) push(`exemplar "${bank.exemplar}" is not an authored letter`);
  let byKey = null, pool = null;
  try {
    byKey = approvedByKey(loc);
    pool = approvedWords(loc).filter((e) => (loc !== 'da' || daStrict(e)) && hasPicture(e.key, loc) && traceable(displayWord(e.word, loc)));
  } catch (e) { push('approved words unavailable: ' + e.message); }
  const chunkLayer = hasChunkLayer(loc);
  const capacity = {};   // per letter: which faces the data can carry
  const checkCommonFor = (tag, seen) => (x, kind) => {
    const w = x.word;
    if (typeof w !== 'string' || !w) { push(tag(`${kind} without a word`)); return false; }
    if (seen.has(w)) push(tag(`duplicate word "${w}"`)); seen.add(w);
    // rule 1: word ↔ approved entry by key (da strict)
    const e = byKey && byKey.get(x.key);
    if (!e) push(tag(`"${w}" (key ${x.key}) is not in approved-words-${loc}.json`));
    else {
      if (displayWord(e.word, loc) !== w) push(tag(`"${w}" ≠ approved word "${displayWord(e.word, loc)}" for key ${x.key}`));
      if (loc === 'da' && !daStrict(e)) push(tag(`"${w}" is policy-managed (da strict pool)`));
      if (kind === 'item' && JSON.stringify(x.split) !== JSON.stringify(e.split)) push(tag(`"${w}" split ${JSON.stringify(x.split)} ≠ approved ${JSON.stringify(e.split)}`));
    }
    // rule 7: case + traceable
    const first = [...w][0];
    const isUpper = first !== first.toLocaleLowerCase(loc);
    if ((loc === 'de') !== isUpper) push(tag(`"${w}" case rule (${loc}) violated`));
    if (!traceable(w)) push(tag(`"${w}" is not traceable()`));
    // rule 6: picture pinned to a colour (theme, noun) carrying the key
    if (BW_MARKER.test(String(x.theme))) push(tag(`"${w}" pinned to a BW theme "${x.theme}" (localized BW marker)`));
    else if (!candidates(x.key, loc).some((c) => c.theme === x.theme && c.noun === x.noun)) push(tag(`"${w}" picture ${x.theme}/${x.noun} does not carry key ${x.key} in the colour picture index`));
    return !!e;
  };
  for (const l of bank.letters) {
    const L = l.L;
    const tag = (x) => `letter ${L}: ${x}`;
    if (typeof L !== 'string' || [...L].length !== 1 || L !== L.toLocaleLowerCase(loc)) push(tag('L must be one lowercase letter'));
    if (!l.upper || l.upper.toLocaleLowerCase(loc) !== L) push(tag(`upper "${l.upper}" ≠ upper of ${L}`));
    if (l.pair && ([...l.pair].length !== 1 || l.pair === L)) push(tag(`pair "${l.pair}"`));
    for (const a of l.avoid || []) if ([...a].length !== 1 || a === L) push(tag(`avoid "${a}"`));
    const checkCommon = checkCommonFor(tag, new Set());
    let initial = 0, medial = 0, final = 0;
    const once = [0, 0, 0];      // F3: once-only items per position (letter mode)
    const onceSyl = [0, 0, 0];   // F3: once-only per syllable position
    let f4 = 0, f4extra = 0;     // F4: words at 1..2 occurrences <= 9 letters; the multi-occurrence surplus
    for (const it of l.items || []) {
      const hasE = checkCommon(it, 'item');
      const g = it.graphemes;
      if (!Array.isArray(g) || !g.length) { push(tag(`"${it.word}" has no graphemes`)); continue; }
      // rule 2
      if (g.join('') !== it.word.toLocaleLowerCase(loc)) push(tag(`"${it.word}" graphemes ${JSON.stringify(g)} do not spell the word`));
      // rule 3: the verified chunk layer is the ONLY grapheme source in de/nl/sv/no
      if (chunkLayer && hasE) {
        const e = byKey.get(it.key);
        const flat = Array.isArray(e.chunks) ? e.chunks.flat() : null;
        if (!flat || JSON.stringify(flat.map((s) => s.toLocaleLowerCase(loc))) !== JSON.stringify(g.map((s) => s.toLocaleLowerCase(loc)))) {
          push(tag(`"${it.word}" graphemes ${JSON.stringify(g)} ≠ approved chunks ${JSON.stringify(flat)}`));
        }
      }
      // rule 4: pos = first target grapheme; hit rule by level
      const at = g.indexOf(L);
      if (at < 0) push(tag(`item "${it.word}" does not contain ${L} as a grapheme`));
      if (it.pos !== at) push(tag(`item "${it.word}" pos ${it.pos} ≠ first ${L} grapheme index ${at}`));
      const hit = bank.level === 'sound' ? g[0] === L : [...it.word.toLocaleLowerCase(loc)][0] === L;
      if (at === 0) { initial++; if (!hit) push(tag(`item "${it.word}" pos 0 but not a hit at level ${bank.level}`)); }
      else if (at === g.length - 1) final++;
      else if (at > 0) medial++;
      // face capacity
      const nG = g.filter((x) => x === L).length, nW = count(it.word, L);
      if (nG === 1 && nW === 1 && at >= 0) once[at === 0 ? 0 : at === g.length - 1 ? 2 : 1]++;
      const sylIdx = (it.split || []).map((s, k) => (nfdBase(s).includes(L) ? k : -1)).filter((k) => k >= 0);
      if (sylIdx.length === 1 && (it.split || []).length >= 2) onceSyl[sylIdx[0] === 0 ? 0 : sylIdx[0] === it.split.length - 1 ? 2 : 1]++;
      const occ = chunkLayer && nG !== nW ? -1 : nW;
      if ([...it.word].length <= 9 && occ >= 1 && occ <= 2) { f4++; f4extra += occ - 1; }
    }
    let pairFoils = 0, avoidFoils = 0;
    for (const fo of l.foils || []) {
      checkCommon(fo, 'foil');
      // rule 5
      if (nfdBase(fo.word).includes(L)) push(tag(`foil "${fo.word}" contains ${L} (NFD base)`));
      if (fo.graphemes && fo.graphemes.join('') !== fo.word.toLocaleLowerCase(loc)) push(tag(`foil "${fo.word}" graphemes do not spell the word`));
      const first = bank.level === 'sound' && fo.graphemes ? fo.graphemes[0] : [...fo.word.toLocaleLowerCase(loc)][0];
      // K-328 derives the b-side answer from graphemes[0] at sound level: a pair-initial foil
      // without graphemes could hide a digraph onset (de "Schaf" is not an s-word)
      if (bank.level === 'sound' && !fo.graphemes && first === l.pair) push(tag(`pair-initial foil "${fo.word}" needs graphemes at level sound (K-328 reads graphemes[0])`));
      if (first === l.pair) pairFoils++;
      if ((l.avoid || []).includes(first)) avoidFoils++;
    }
    // rule 9 floors (base + faces 2-4 data floors)
    if (initial < FLOOR.initial) push(tag(`${initial} initial items < ${FLOOR.initial}`));
    if (medial < FLOOR.medial) push(tag(`${medial} medial items < ${FLOOR.medial}`));
    if (final < FLOOR.final) push(tag(`${final} final items < ${FLOOR.final}`));
    if ((l.foils || []).length < FLOOR.foils) push(tag(`${(l.foils || []).length} foils < ${FLOOR.foils}`));
    // rule 8
    if (pairFoils < 2) push(tag(`${pairFoils} foils begin with the pair letter ${l.pair} (d3 needs 2)`));
    if (avoidFoils < 4) push(tag(`${avoidFoils} foils begin with an avoid letter ${JSON.stringify(l.avoid)} (d2 needs 4)`));
    if (pool && l.pair) {
      const pairInitial = new Set(pool.filter((e) => [...displayWord(e.word, loc).toLocaleLowerCase(loc)][0] === l.pair).map((e) => e.word)).size;
      if (pairInitial < 4) push(tag(`pair letter ${l.pair} has ${pairInitial} initial words in the eligible ${loc} pool < 4`));
    }
    // face capacity (K-326 2/2/2 · K-327 6 rows reaching 8 · K-328 4 pair-initial foils)
    const f3 = bank.positionMode === 'syllable' ? onceSyl : once;
    capacity[L] = {
      F3: f3.every((n) => n >= 2), F3n: f3.join('/'),
      F4: f4 >= 6 && f4extra >= 2, F4n: `${f4}w+${f4extra}`,
      F6: pairFoils >= 4, F6n: pairFoils,
    };
    if (L === bank.exemplar) {
      if (!capacity[L].F3) push(tag(`exemplar cannot fill K-326 (once-only ${f3.join('/')} < 2/2/2 in ${bank.positionMode} mode)`));
      if (!capacity[L].F4) push(tag(`exemplar cannot fill K-327 (${f4} words at 1-2 occurrences, surplus ${f4extra} < 2)`));
      if (!capacity[L].F6) push(tag(`exemplar cannot fill K-328 (${pairFoils} pair-initial foils < 4)`));
    }
  }
  // rule 11 units (face 5)
  const units = bank.units || [];
  if (units.length && !units.some((u) => u.u === (bank.unitExemplar || units[0].u))) push(`unitExemplar "${bank.unitExemplar}" is not an authored unit`);
  if (units.length < UNIT_FLOOR.units && !(bank.refuse && bank.refuse.F5)) push(`${units.length} units < ${UNIT_FLOOR.units} and F5 is not refused (refuse.F5)`);
  for (const u of units) {
    const tag = (x) => `unit ${u.u}: ${x}`;
    if (typeof u.u !== 'string' || [...u.u].length < 2) push(tag('shorter than 2 chars'));
    if (!u.upper || u.upper.toLocaleLowerCase(loc) !== u.u) push(tag(`upper "${u.upper}" ≠ upper of ${u.u}`));
    if (!/^(K|G1|G2)$/.test(String(u.band))) push(tag(`band "${u.band}"`));
    const checkCommon = checkCommonFor(tag, new Set());
    let carriers = 0;
    for (const it of u.items || []) {
      checkCommon(it, 'item');
      const g = it.graphemes;
      if (!Array.isArray(g) || !g.length) { push(tag(`"${it.word}" has no graphemes`)); continue; }
      if (g.join('') !== it.word.toLocaleLowerCase(loc)) push(tag(`"${it.word}" graphemes ${JSON.stringify(g)} do not spell the word`));
      if (!g.includes(u.u)) push(tag(`item "${it.word}" does not carry ${u.u} as ONE grapheme`));
      else { carriers++; if (it.pos !== g.indexOf(u.u)) push(tag(`item "${it.word}" pos ${it.pos} ≠ first ${u.u} grapheme index ${g.indexOf(u.u)}`)); }
    }
    for (const fo of u.foils || []) {
      checkCommon(fo, 'foil');
      if (nfdBase(fo.word).includes(u.u)) push(tag(`foil "${fo.word}" contains the unit ${u.u}`));
    }
    if (carriers < UNIT_FLOOR.items) push(tag(`${carriers} items carry it as ONE grapheme < ${UNIT_FLOOR.items}`));
    if ((u.foils || []).length < UNIT_FLOOR.foils) push(tag(`${(u.foils || []).length} foils < ${UNIT_FLOOR.foils}`));
  }
  // rule 10 strings — base + every face
  const ids = ['K-317', ...Object.keys(FACES)];
  for (const id of ids) {
    const s = bank.strings && bank.strings[id];
    if (!s) { push(`strings ${id} missing`); continue; }
    if (!s.title || [...s.title].length > 70) push(`${id}: title > 70 chars`);
    if (/worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä/i.test(s.title || '')) push(`${id}: title carries the worksheet word`);
    if (!s.instruction || [...s.instruction].length > 150) push(`${id}: instruction > 150 chars`);
    if (loc === 'en') {
      const spec = id === 'K-317' ? TYPE : FACES[id];
      if (spec.i18n.en.title !== s.title || spec.i18n.en.instruction !== s.instruction) push(`${id}: bank strings ≠ the spec's i18n.en (the two copies drifted)`);
    }
  }
  return { findings: f, capacity };
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, unit, baseName, seedEpoch, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: 'en', unit: unit || null, page, outDir: OUT, baseName, seedEpoch, strings });
  const m = await page.evaluate(() => {
    const rect = (el) => el.getBoundingClientRect();
    const root = document.querySelector('[data-ws-content][data-lcs-target]');
    const icons = [...document.querySelectorAll('.ws-icon')].map((el) => Math.min(el.offsetWidth, el.offsetHeight));
    const cards = document.querySelectorAll('[data-lcs-word][data-lcs-hit]').length;
    const hits = document.querySelectorAll('[data-lcs-hit="1"]').length;
    const body = rect(document.querySelector('[data-lcs-body]'));
    const zones = [...document.querySelectorAll('[data-lcs-zone]')].map((z) => { const r = rect(z); return { zone: z.dataset.lcsZone, w: r.width, h: r.height, left: r.left, right: r.right, bottom: r.bottom }; });
    const lanes = [...document.querySelectorAll('[data-lcs-prim="trace-letter"]')].filter((l) => !l.closest('[data-lcs-letter-card]')).map((l) => rect(l).height);
    const writes = [...document.querySelectorAll('[data-lcs-zone="write"] [data-lcs-prim="trace-word"]')].map((l) => rect(l).height);
    const card = document.querySelector('[data-lcs-letter-card]');
    const sizes = (sel) => [...document.querySelectorAll(sel)].map((el) => { const r = rect(el); return Math.min(r.width, r.height); });
    return {
      stamps: root ? { ...root.dataset } : null, icons, cards, hits, zones, lanes, writes,
      posCards: document.querySelectorAll('[data-lcs-word][data-lcs-pos]').length, posBoxes: sizes('[data-lcs-posbox]'),
      rows: document.querySelectorAll('[data-lcs-row]').length, answerBoxes: sizes('[data-lcs-row] [data-lcs-answer]'),
      pairCards: document.querySelectorAll('[data-lcs-word][data-lcs-answer]').length, chips: sizes('[data-lcs-chip]'),
      cardW: card ? rect(card).width : 0, body: { left: body.left, right: body.right, top: body.top, bottom: body.bottom },
      foot: rect(document.querySelector('.ws-foot')).top,
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath };
}

function assertCommon(name, r, band) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  const minIcon = r.m.icons.length ? Math.min(...r.m.icons) : 0;
  ok(minIcon >= MIN_ICON[band], `${name}: icon ${minIcon} px < ${band} floor ${MIN_ICON[band]}`);
  for (const z of r.m.zones) {
    ok(z.left >= r.m.body.left - 0.6 && z.right <= r.m.body.right + 0.6, `${name}: zone ${z.zone} outside the body column`);
    ok(z.bottom <= r.m.foot - 0.6, `${name}: zone ${z.zone} reaches the footer`);
    ok(Math.abs(z.w - 660) < 1, `${name}: zone ${z.zone} width ${z.w} ≠ 660`);
  }
  return minIcon;
}
function assertRender(name, r, d, type) {
  const cfg = (type || TYPE).difficulty[d];
  const minIcon = assertCommon(name, r, (type || TYPE).gradeBand);
  ok(r.m.icons.length === cfg.hunt.n, `${name}: ${r.m.icons.length} icons, want ${cfg.hunt.n}`);
  ok(r.m.cards === cfg.hunt.n, `${name}: ${r.m.cards} cards ≠ config ${cfg.hunt.n}`);
  ok(r.m.hits === cfg.hunt.hits && +r.m.stamps.lcsHits === cfg.hunt.hits, `${name}: ${r.m.hits} hits / stamp ${r.m.stamps.lcsHits} ≠ config ${cfg.hunt.hits}`);
  ok(r.m.stamps.lcsFoilPolicy === cfg.hunt.foilPolicy, `${name}: foil policy stamp ${r.m.stamps.lcsFoilPolicy} ≠ ${cfg.hunt.foilPolicy}`);
  ok(r.m.stamps.lcsScope === (cfg.hunt.hitPos === 'initial' ? 'initial' : 'anywhere'), `${name}: scope stamp ${r.m.stamps.lcsScope}`);
  ok(String(r.m.stamps.lcsMinMedial || '') === String(cfg.hunt.minMedial || ''), `${name}: min-medial stamp ${r.m.stamps.lcsMinMedial} ≠ ${cfg.hunt.minMedial}`);
  const wantLanes = cfg.trace.lanes === 'upper' ? 1 : 2;
  ok(r.m.lanes.length === wantLanes && r.m.lanes.every((h) => Math.abs(h - cfg.trace.laneH) < 1), `${name}: trace lane heights ${r.m.lanes} ≠ ${cfg.trace.laneH} × ${wantLanes}`);
  ok(r.m.writes.length === 2 && r.m.writes.every((h) => Math.abs(h - cfg.write.laneH) < 1), `${name}: write row heights ${r.m.writes} ≠ ${cfg.write.laneH}`);
  ok(r.m.cardW >= cfg.card.w - 0.6, `${name}: letter card ${r.m.cardW} px < ${cfg.card.w}`);
  if (cfg.unit) {
    ok(r.m.stamps.lcsFace === 'unit' && r.m.stamps.lcsUnit === r.m.stamps.lcsTarget && [...r.m.stamps.lcsUnit].length >= 2, `${name}: unit stamps ${r.m.stamps.lcsFace}/${r.m.stamps.lcsUnit}`);
    ok(r.m.stamps.lcsUnitFoils === (cfg.unit.foilPolicy || 'any'), `${name}: unit foil policy stamp ${r.m.stamps.lcsUnitFoils}`);
  } else ok(!r.m.stamps.lcsFace, `${name}: unexpected face stamp ${r.m.stamps.lcsFace}`);
  return minIcon;
}
function assertSlim(name, r, cfg) {
  ok(r.m.lanes.length === 1 && Math.abs(r.m.lanes[0] - cfg.trace.laneH) < 1, `${name}: slim zone 1 lanes ${r.m.lanes} ≠ [${cfg.trace.laneH}]`);
  ok(r.m.writes.length === 0, `${name}: write rows present on a slim face`);
  ok(r.m.cardW >= cfg.card.w - 0.6, `${name}: letter card ${r.m.cardW} px < ${cfg.card.w}`);
  ok(r.m.stamps.lcsLanes === 'upper', `${name}: lanes stamp ${r.m.stamps.lcsLanes}`);
}
function assertPositions(name, r, type) {
  const cfg = type.difficulty[2], p = cfg.positions;
  assertCommon(name, r, type.gradeBand);
  assertSlim(name, r, cfg);
  ok(r.m.stamps.lcsFace === 'positions', `${name}: face stamp ${r.m.stamps.lcsFace}`);
  ok(r.m.posCards === p.cards && r.m.icons.length === p.cards, `${name}: ${r.m.posCards} cards / ${r.m.icons.length} icons ≠ ${p.cards}`);
  ok(r.m.stamps.lcsSplit === p.split.join(','), `${name}: split stamp ${r.m.stamps.lcsSplit} ≠ ${p.split.join(',')}`);
  ok(r.m.posBoxes.length === 3 * p.cards, `${name}: ${r.m.posBoxes.length} position boxes ≠ ${3 * p.cards}`);
  const minBox = r.m.posBoxes.length ? Math.min(...r.m.posBoxes) : 0;
  ok(minBox >= MIN_BOX, `${name}: position box ${minBox} px < floor ${MIN_BOX}`);
  ok(Math.abs(minBox - p.boxPx) < 1, `${name}: position box ${minBox} ≠ config ${p.boxPx}`);
  return minBox;
}
function assertWordHunt(name, r, type) {
  const cfg = type.difficulty[2], w = cfg.wordHunt;
  assertCommon(name, r, type.gradeBand);
  assertSlim(name, r, cfg);
  ok(r.m.stamps.lcsFace === 'word-hunt', `${name}: face stamp ${r.m.stamps.lcsFace}`);
  ok(r.m.rows === w.rows && r.m.icons.length === w.rows, `${name}: ${r.m.rows} rows / ${r.m.icons.length} icons ≠ ${w.rows}`);
  ok(+r.m.stamps.lcsTotal >= w.minTotal && +r.m.stamps.lcsMinTotal === w.minTotal, `${name}: total ${r.m.stamps.lcsTotal} / floor ${r.m.stamps.lcsMinTotal} vs config ${w.minTotal}`);
  ok(+r.m.stamps.lcsCapsRows === w.capsRows, `${name}: caps rows stamp ${r.m.stamps.lcsCapsRows}`);
  const minBox = r.m.answerBoxes.length ? Math.min(...r.m.answerBoxes) : 0;
  ok(r.m.answerBoxes.length === w.rows && minBox >= MIN_BOX && Math.abs(minBox - w.boxPx) < 1, `${name}: answer boxes ${r.m.answerBoxes} (want ${w.rows} × ${w.boxPx})`);
  return minBox;
}
function assertPair(name, r, type) {
  const cfg = type.difficulty[2], p = cfg.pair;
  assertCommon(name, r, type.gradeBand);
  assertSlim(name, r, cfg);
  ok(r.m.stamps.lcsFace === 'pair', `${name}: face stamp ${r.m.stamps.lcsFace}`);
  ok(r.m.pairCards === p.cards && r.m.icons.length === p.cards, `${name}: ${r.m.pairCards} cards / ${r.m.icons.length} icons ≠ ${p.cards}`);
  ok(r.m.stamps.lcsSplit === p.split.join(','), `${name}: split stamp ${r.m.stamps.lcsSplit}`);
  ok(r.m.stamps.lcsPairA === r.m.stamps.lcsTarget && r.m.stamps.lcsPairB === r.m.stamps.lcsPair, `${name}: pair stamps ${r.m.stamps.lcsPairA}/${r.m.stamps.lcsPairB}`);
  const minChip = r.m.chips.length ? Math.min(...r.m.chips) : 0;
  ok(r.m.chips.length === 2 * p.cards && minChip >= MIN_BOX && Math.abs(minChip - p.chipPx) < 1, `${name}: chips ${r.m.chips.length} × ${minChip} px (want ${2 * p.cards} × ${p.chipPx})`);
  return minChip;
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function typeWithBank(type, bank) {
  return Object.assign({}, type, { build(args, ctx) { return type._buildWith(bank, args, ctx); } });
}
/** A face type whose build() rewrites the page's stamps (a poison past the spec's own guards). */
function typeWithSwap(type, swap) {
  return Object.assign({}, type, { build(args, ctx) { const out = type._buildWith(bankModule('letter-of-the-week').en, args, ctx); out.bodyHtml = swap(out.bodyHtml); return out; } });
}
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
/** Run an assertion function on a poisoned render without counting its findings against the control. */
function isolated(fn) {
  const before = fails.length, saved = assertions;
  fn();
  const found = fails.splice(before);
  assertions = saved;
  return found;
}
const LONG = { title: 'Buchstabeneinführung der Woche: {U}{L} mit Bildern und Schreibzeilen', instruction: ('Fahre den großen und den kleinen Buchstaben nach, kreise die vier Bilder ein, deren Name mit {U} beginnt, und schreibe dann eine ganze Zeile von jedem.').slice(0, 150) };

async function main() {
  const banks = bankModule('letter-of-the-week');
  const locales = Object.keys(banks);
  // 1. bank (control)
  for (const loc of locales) {
    const { findings: f, capacity } = validateBank(banks[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    const en = banks[loc];
    const counts = en.letters.map((l) => `${l.L}:${l.items.filter((i) => i.pos === 0).length}i/${l.items.filter((i) => i.pos > 0 && i.pos < i.graphemes.length - 1).length}m/${l.items.filter((i) => i.pos === i.graphemes.length - 1).length}e/${l.foils.length}f`);
    console.log(`bank ${loc}: exemplar ${en.exemplar}, letters ${counts.join(' ')}, units ${(en.units || []).map((u) => `${u.u}:${u.items.length}/${u.foils.length}`).join(' ') || 0}`);
    console.log(`  face capacity ${loc}: ` + Object.entries(capacity).map(([L, c]) => `${L}[F3 ${c.F3 ? 'ok' : 'DROP'} ${c.F3n} · F4 ${c.F4 ? 'ok' : 'DROP'} ${c.F4n} · F6 ${c.F6 ? 'ok' : 'DROP'} ${c.F6n}]`).join(' '));
  }
  const en = banks.en;

  // 2. renders through the real pipeline
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    // 2a. the base
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, unit: null, baseName: `K-317-gate-d${d}-en` });
      const mi = assertRender(`d${d} ${en.exemplar}`, r, d);
      pngs.push(r.png);
      console.log(`render d${d} ${en.exemplar}: verify ${r.verify.length} lints ${r.lints.length} icons>=${mi} hits ${r.m.hits}/${r.m.cards}`);
    }
    for (const L of TYPE.unitAxis.units('en')) {
      if (L === en.exemplar) continue;
      const r = await renderWith(page, TYPE, { difficulty: 2, unit: L, baseName: `K-317-gate-d2-en-u${L}` });
      const mi = assertRender(`d2 unit ${L}`, r, 2);
      pngs.push(r.png);
      console.log(`render d2 ${L}: verify ${r.verify.length} lints ${r.lints.length} icons>=${mi} hits ${r.m.hits}/${r.m.cards}`);
    }
    {
      // the long-chrome test (README: the body is 722 px under a three-line title +
      // three-line instruction): the TALLEST base stack (d1, 652) must still clear the footer.
      const r = await renderWith(page, TYPE, { difficulty: 1, unit: null, baseName: 'K-317-gate-d1-en-longchrome', strings: LONG });
      assertRender('d1 long chrome', r, 1);
      pngs.push(r.png);
      console.log(`render d1 long chrome (title ${[...LONG.title].length} / instruction ${[...LONG.instruction].length} chars): verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.bottom - r.m.body.top)} px`);
    }
    ok(TYPE.unitAxis.exemplar('en') === en.exemplar, 'unitAxis.exemplar ≠ bank exemplar');
    let threw = false;
    try { TYPE._buildWith(en, { difficulty: 2, locale: 'en', unit: 'q' }, { rng: makeRng('x') }); } catch (e) { threw = /not in the bank/.test(e.message); }
    ok(threw, 'an unauthored unit must REFUSE (throw), not fall back');

    // 2b. the faces — exemplar at d2 (every letter for the letter faces, every unit for G1-311) + long chrome
    const faceLetters = TYPE.unitAxis.units('en');
    const runFace = async (id, assertFn, units, band) => {
      const type = FACES[id];
      for (const u of units) {
        const r = await renderWith(page, type, { difficulty: 2, unit: u === en.exemplar || u === (en.unitExemplar || '') ? null : u, baseName: `${id}-gate-d2-en${u === en.exemplar || u === en.unitExemplar ? '' : '-u' + u}` });
        const floor = assertFn(`${id} ${u}`, r, type);
        pngs.push(r.png);
        console.log(`render ${id} ${u}: verify ${r.verify.length} lints ${r.lints.length} icons>=${Math.min(...r.m.icons)} floor ${floor} stack ${Math.round(Math.max(...r.m.zones.map((z) => z.bottom)) - Math.min(...r.m.zones.map((z) => z.bottom - z.h)))} px`);
      }
      const r = await renderWith(page, type, { difficulty: 2, unit: null, baseName: `${id}-gate-d2-en-longchrome`, strings: LONG });
      assertFn(`${id} long chrome`, r, type);
      pngs.push(r.png);
      console.log(`render ${id} long chrome: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.bottom - r.m.body.top)} px, lowest zone ${Math.round(r.m.foot - Math.max(...r.m.zones.map((z) => z.bottom)))} px above the footer`);
    };
    await runFace('K-325', (n, r, t) => assertRender(n, r, 2, t), faceLetters);
    await runFace('K-326', assertPositions, faceLetters);
    await runFace('K-327', assertWordHunt, faceLetters);
    await runFace('K-328', assertPair, faceLetters);
    await runFace('G1-311', (n, r, t) => assertRender(n, r, 2, t), FACES['G1-311'].unitAxis.units('en'));
    ok(FACES['G1-311'].unitAxis.exemplar('en') === (en.unitExemplar || en.units[0].u), 'G1-311 unitAxis.exemplar ≠ bank unitExemplar');
    ok(FACES['G1-311'].unitAxis.tokens('sh', 'en').U === 'Sh', 'G1-311 tokens U ≠ the unit block upper');
    threw = false;
    try { FACES['G1-311']._buildWith(en, { difficulty: 2, locale: 'en', unit: 'zz' }, { rng: makeRng('x') }); } catch (e) { threw = /unit "zz" is not in the bank/.test(e.message); }
    ok(threw, 'G1-311: an unauthored unit must REFUSE (throw), not fall back');
    // every face resolves to a config that differs from the base's d2 and from every sibling
    const cfgs = Object.entries(FACES).map(([id, t]) => [id, JSON.stringify(t.difficulty[2])]);
    for (const [id, c] of cfgs) ok(c !== JSON.stringify(TYPE.difficulty[2]), `${id}: resolved d2 config equals the base's`);
    for (let i = 0; i < cfgs.length; i++) for (let j = i + 1; j < cfgs.length; j++) ok(cfgs[i][1] !== cfgs[j][1], `${cfgs[i][0]} and ${cfgs[j][0]} resolve to the same config`);

    // 3. seed sweeps (build only, no browser)
    if (!QUICK) {
      const slotHit = new Array(TYPE.difficulty[2].hunt.n).fill(0);
      const sets = new Set();
      for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: 'K-317', theme: null, difficulty: 2, seedEpoch: k }));
        const b = TYPE.build({ theme: null, difficulty: 2, locale: 'en', unit: null }, { rng });
        const seq = [...b.bodyHtml.matchAll(/data-lcs-hit="([01])"/g)].map((m) => m[1]);
        ok(seq.length === TYPE.difficulty[2].hunt.n, `sweep seed ${k}: ${seq.length} cards`);
        seq.forEach((v, i) => { if (v === '1') slotHit[i]++; });
        sets.add(b.meta.hits.slice().sort().join(','));
      }
      const covered = slotHit.filter((n) => n > 0).length;
      ok(covered >= 6, `sweep: hits landed in ${covered} of 8 slots (< 6)`);
      ok(sets.size >= 2, `sweep: only ${sets.size} distinct hit sets over 20 seeds`);
      console.log(`sweep: hits in ${covered}/8 slots, ${sets.size} distinct hit sets`);
      // K-326: each position lands in >= 4 of the 6 slots; K-328: each letter in >= 6 of 8
      const posSlots = [new Array(6).fill(0), new Array(6).fill(0), new Array(6).fill(0)];
      const pairSlots = { a: new Array(8).fill(0), b: new Array(8).fill(0) };
      let medialMin = 9;
      for (let k = 1; k <= 20; k++) {
        const b3 = FACES['K-326'].build({ theme: null, difficulty: 2, locale: 'en', unit: null }, { rng: makeRng(instanceSeed({ typeId: 'K-326', theme: null, difficulty: 2, seedEpoch: k })) });
        b3.meta.positions.forEach((p, i) => posSlots[p][i]++);
        const b6 = FACES['K-328'].build({ theme: null, difficulty: 2, locale: 'en', unit: null }, { rng: makeRng(instanceSeed({ typeId: 'K-328', theme: null, difficulty: 2, seedEpoch: k })) });
        b6.meta.answers.forEach((a, i) => pairSlots[a === 'm' ? 'a' : 'b'][i]++);
        const b2 = FACES['K-325'].build({ theme: null, difficulty: 2, locale: 'en', unit: null }, { rng: makeRng(instanceSeed({ typeId: 'K-325', theme: null, difficulty: 2, seedEpoch: k })) });
        const medial = b2.meta.hits.filter((w) => { const g = en.letters[0].items.find((i) => i.word === w).graphemes; return g.indexOf('m') < g.length - 1; }).length;
        medialMin = Math.min(medialMin, medial);
      }
      const posCov = posSlots.map((s) => s.filter((n) => n > 0).length);
      ok(posCov.every((n) => n >= 4), `K-326 sweep: positions landed in ${posCov.join('/')} of 6 slots (< 4)`);
      const pairCov = [pairSlots.a, pairSlots.b].map((s) => s.filter((n) => n > 0).length);
      ok(pairCov.every((n) => n >= 6), `K-328 sweep: letters landed in ${pairCov.join('/')} of 8 slots (< 6)`);
      ok(medialMin >= 2, `K-325 sweep: a page carried ${medialMin} medial hits < 2`);
      console.log(`sweep faces: K-326 positions in ${posCov.join(' · ')} of 6 slots, K-328 letters in ${pairCov.join(' · ')} of 8 slots, K-325 medial hits >= ${medialMin}`);
    }

    // 4. poisons
    let killed = 0;
    const gq = (arr) => JSON.stringify(arr).replace(/"/g, '&quot;');
    // P1 — a foil replaced by an item starting with L. Three layers, all must fire:
    //   (a) bank rule 5; (b) the spec's own foil filter REFUSES to build the page
    //   (a poisoned bank never renders); (c) a page whose stamps carry an m-word
    //   as a foil (the stamp swap below, past the spec's guard) fails verify().
    {
      const b = clone(en); const m = b.letters.find((l) => l.L === 'm');
      m.foils = m.items.filter((i) => i.pos === 0).map((i) => ({ theme: i.theme, noun: i.noun, key: i.key, word: i.word }));
      const a = judge('P1 bank', validateBank(b, 'en').findings, /foil "m\w+" contains m \(NFD base\)/);
      let refused = [];
      try { TYPE._buildWith(b, { difficulty: 1, locale: 'en', unit: null }, { rng: makeRng('p1') }); } catch (e) { refused = [e.message]; }
      const c = judge('P1 build', refused, /letter m has 0 {2}foils < 3/, 'the spec refused the poisoned bank');
      const swapped = typeWithSwap(TYPE, (h) => h.replace(/data-lcs-word="[^"]+" data-lcs-vocab="[^"]+" data-lcs-graphemes="[^"]+" data-lcs-hit="0"/,
        'data-lcs-word="mango" data-lcs-vocab="mango" data-lcs-graphemes="' + gq(['m', 'a', 'n', 'g', 'o']) + '" data-lcs-hit="0"'));
      const r = await renderWith(page, swapped, { difficulty: 2, unit: null, baseName: 'K-317-gate-poison-P1' });
      const d = judge('P1 verify', r.verify, /foil "mango" begins with m/);
      if (a && c && d) killed++;
    }
    // P2 — de Schaf with the letters as graphemes (the chunk layer says sch·a·f)
    {
      const b = { level: 'sound', positionMode: 'letter', showWordInPositions: false, exemplar: 's', strings: { 'K-317': { title: 'x', instruction: 'y' } },
        letters: [{ L: 's', upper: 'S', pair: 'f', avoid: ['f'], items: [{ theme: 'animals', noun: 'sheep', key: 'sheep', word: 'Schaf', graphemes: ['s', 'c', 'h', 'a', 'f'], pos: 0, split: ['schaf'] }], foils: [] }] };
      if (judge('P2', validateBank(b, 'de').findings, /"Schaf" graphemes .* ≠ approved chunks/)) killed++;
    }
    // P3 — fr foil école on the e page: NFD base "ecole" contains e
    {
      const b = clone(en); b.letters.push({ L: 'e', upper: 'E', pair: 'a', avoid: ['a'], items: [], foils: [{ theme: 'classroom', noun: 'school', key: 'school', word: 'école' }] });
      if (judge('P3', validateBank(b, 'fr').findings, /foil "école" contains e \(NFD base\)/)) killed++;
    }
    // P4 — a hit picture pinned to a BW theme
    {
      const b = clone(en); const m = b.letters.find((l) => l.L === 'm');
      const it = m.items.find((i) => i.word === 'monkey'); it.theme = 'zoo animals bw';
      if (judge('P4', validateBank(b, 'en').findings, /"monkey" pinned to a BW theme "zoo animals bw"/)) killed++;
    }
    // P5 — pos:1 on a word-initial letter
    {
      const b = clone(en); const m = b.letters.find((l) => l.L === 'm');
      m.items.find((i) => i.word === 'map').pos = 1;
      if (judge('P5', validateBank(b, 'en').findings, /item "map" pos 1 ≠ first m grapheme index 0/)) killed++;
    }
    // P6 — hunt icon forced to 48 px (the gate's OWN floor, not verify/lints)
    {
      const d2 = clone(TYPE.difficulty[2]); d2.hunt.iconPx = 48;
      const t = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 2: d2 } });
      const r = await renderWith(page, t, { difficulty: 2, unit: null, baseName: 'K-317-gate-poison-P6' });
      const found = isolated(() => assertRender('P6', r, 2));
      if (judge('P6', found, /icon 48 px < K floor 56/, `verify ${r.verify.length} lints ${r.lints.length} — neither sees it`)) killed++;
    }
    // P7 — K-325: an m-INITIAL word ("map") stamped as an anywhere hit (a card swap past the spec)
    {
      const t = typeWithSwap(FACES['K-325'], (h) => h.replace(/data-lcs-word="[^"]+" data-lcs-vocab="[^"]+" data-lcs-graphemes="[^"]+" data-lcs-hit="1"/,
        'data-lcs-word="map" data-lcs-vocab="map" data-lcs-graphemes="' + gq(['m', 'a', 'p']) + '" data-lcs-hit="1"'));
      const r = await renderWith(page, t, { difficulty: 2, unit: null, baseName: 'K-325-gate-poison-P7' });
      if (judge('P7', r.verify, /"map" stamped hit=1 but letter at 0/)) killed++;
    }
    // P8 — K-325: a bank whose m block has no medial words → the spec refuses (never renders 4 finals)
    {
      const b = clone(en); const m = b.letters.find((l) => l.L === 'm');
      m.items = m.items.filter((i) => i.pos === 0 || i.pos === i.graphemes.length - 1);
      let refused = [];
      try { FACES['K-325']._buildWith(b, { difficulty: 2, locale: 'en', unit: null }, { rng: makeRng('p8') }); } catch (e) { refused = [e.message]; }
      const a = judge('P8 build', refused, /letter m has 0 medial items < 2/, 'the spec refused');
      const c = judge('P8 bank', validateBank(b, 'en').findings, /letter m: 0 medial items < 2/);
      if (a && c) killed++;
    }
    // P9 — K-326: a card stamped pos 1 whose word begins with m ("map")
    {
      const t = typeWithSwap(FACES['K-326'], (h) => h.replace(/data-lcs-word="[^"]+" data-lcs-vocab="[^"]+" data-lcs-graphemes="[^"]+" data-lcs-pos="[012]"/,
        'data-lcs-word="map" data-lcs-vocab="map" data-lcs-graphemes="' + gq(['m', 'a', 'p']) + '" data-lcs-pos="1"'));
      const r = await renderWith(page, t, { difficulty: 2, unit: null, baseName: 'K-326-gate-poison-P9' });
      if (judge('P9', r.verify, /"map" stamped pos 1 but derived 0/)) killed++;
    }
    // P10 — K-326: "hammer" (m twice) on the position face, stamped pos 1
    {
      const t = typeWithSwap(FACES['K-326'], (h) => h.replace(/data-lcs-word="[^"]+" data-lcs-vocab="[^"]+" data-lcs-graphemes="[^"]+" data-lcs-pos="[012]"/,
        'data-lcs-word="hammer" data-lcs-vocab="hammer" data-lcs-graphemes="' + gq(['h', 'a', 'm', 'm', 'e', 'r']) + '" data-lcs-pos="1"'));
      const r = await renderWith(page, t, { difficulty: 2, unit: null, baseName: 'K-326-gate-poison-P10' });
      if (judge('P10', r.verify, /"hammer" carries m 2 times/)) killed++;
    }
    // P11 — K-327: an answer box one short of the count (the stamp AND the box), and a caps row re-stamped upper while printing lowercase
    {
      const t = typeWithSwap(FACES['K-327'], (h) => h
        .replace(/data-lcs-count="2"/, 'data-lcs-count="1"')
        .replace(/data-lcs-casemode="lower"/, 'data-lcs-casemode="upper"'));
      const r = await renderWith(page, t, { difficulty: 2, unit: null, baseName: 'K-327-gate-poison-P11' });
      const a = judge('P11 count', r.verify, /stamped count 1 ≠ 2/);
      const c = judge('P11 caps', r.verify, /caps row prints "[a-z]+"/);
      const d = judge('P11 caps-n', r.verify, /3 caps rows, want 2/);
      if (a && c && d) killed++;
    }
    // P12 — G1-311: "shark" authored s·h (the unit split) + "grasshopper" as an sh foil (a seam s+h IS an sh substring)
    {
      const b = clone(en); const sh = b.units.find((u) => u.u === 'sh');
      sh.items.find((i) => i.word === 'shark').graphemes = ['s', 'h', 'a', 'r', 'k'];
      sh.foils.push({ theme: 'insects and bugs', noun: 'grasshopper', key: 'grasshopper', word: 'grasshopper' });
      const f = validateBank(b, 'en').findings;
      const a = judge('P12 bank item', f, /item "shark" does not carry sh as ONE grapheme/);
      const c = judge('P12 bank foil', f, /foil "grasshopper" contains the unit sh/);
      // every item split → the spec refuses (0 carriers)
      const b2 = clone(en); b2.units.find((u) => u.u === 'sh').items.forEach((i) => { i.graphemes = [...i.word]; });
      let refused = [];
      try { FACES['G1-311']._buildWith(b2, { difficulty: 2, locale: 'en', unit: null }, { rng: makeRng('p12') }); } catch (e) { refused = [e.message]; }
      const d = judge('P12 build', refused, /unit sh has 0 any items < 4 hits/, 'the spec refused');
      // a page whose foil card is "grasshopper" (past the spec) fails verify()
      const t = typeWithSwap(FACES['G1-311'], (h) => h.replace(/data-lcs-word="[^"]+" data-lcs-vocab="[^"]+" data-lcs-graphemes="[^"]+" data-lcs-hit="0"/,
        'data-lcs-word="grasshopper" data-lcs-vocab="grasshopper" data-lcs-graphemes="' + gq([...'grasshopper']) + '" data-lcs-hit="0"'));
      const r = await renderWith(page, t, { difficulty: 2, unit: null, baseName: 'G1-311-gate-poison-P12' });
      const e = judge('P12 verify', r.verify, /foil "grasshopper" contains the unit sh/);
      if (a && c && d && e) killed++;
    }
    // P13 — K-328: "mask" stamped n (a b-card that begins with a), and the chips swapped n | m
    {
      const t = typeWithSwap(FACES['K-328'], (h) => h
        .replace(/data-lcs-word="[^"]+" data-lcs-vocab="[^"]+" data-lcs-graphemes="[^"]+" data-lcs-answer="n"/,
          'data-lcs-word="mask" data-lcs-vocab="mask" data-lcs-graphemes="' + gq(['m', 'a', 's', 'k']) + '" data-lcs-answer="n"')
        .replace(/data-lcs-chip="m"([^>]*)>m</, 'data-lcs-chip="n"$1>n<'));
      const r = await renderWith(page, t, { difficulty: 2, unit: null, baseName: 'K-328-gate-poison-P13' });
      const a = judge('P13 answer', r.verify, /"mask" stamped n but begins with m/);
      const c = judge('P13 chips', r.verify, /chips n\|n, want m\|n/);
      if (a && c) killed++;
    }
    // P14 — the gate's OWN floors on the faces: a K-326 position box at 24 px, a K-328 chip at 24 px
    {
      const d2 = clone(FACES['K-326'].difficulty[2]); d2.positions.boxPx = 24;
      const t = Object.assign({}, FACES['K-326'], { difficulty: { 1: d2, 2: d2, 3: d2 } });
      const r = await renderWith(page, t, { difficulty: 2, unit: null, baseName: 'K-326-gate-poison-P14' });
      const found = isolated(() => assertPositions('P14', r, t));
      const a = judge('P14 box', found, /position box 24 px < floor 30/, `verify ${r.verify.length} lints ${r.lints.length} — neither sees it`);
      const d6 = clone(FACES['K-328'].difficulty[2]); d6.pair.chipPx = 24;
      const t6 = Object.assign({}, FACES['K-328'], { difficulty: { 1: d6, 2: d6, 3: d6 } });
      const r6 = await renderWith(page, t6, { difficulty: 2, unit: null, baseName: 'K-328-gate-poison-P14' });
      const found6 = isolated(() => assertPair('P14', r6, t6));
      const c = judge('P14 chip', found6, /chips 16 × 24 px/, `verify ${r6.verify.length} lints ${r6.lints.length} — neither sees it`);
      if (a && c) killed++;
    }
    console.log('poison:\n' + poisonLog.join('\n'));
    const allKilled = killed === POISONS;
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && allKilled;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${POISONS} poisons killed${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${POISONS} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank };
