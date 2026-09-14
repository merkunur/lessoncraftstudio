#!/usr/bin/env node
/**
 * verify-b3-letter-of-the-week.js — the K-317 `letter-of-the-week` gate
 * (design file §5; brief deliverable 4).
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
 *    (10) title <= 70 without the worksheet word, instruction <= 150,
 *    (11) units >= 2 chars with the unit as ONE grapheme in >= 8 items.
 *    The gate MAY read approved-words / the picture index; the spec never does.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): exemplar d1/d2/d3 + every authored letter at d2 (the unit axis).
 *    Asserts verify() empty, qa/lints.js clean, and ITSELF the K density floor
 *    (`.ws-icon` >= tokens.density.K.minElement = 56 px measured in the page —
 *    qa/lints.js has no element-size lint), hits === config, card count ===
 *    config, lane heights === config, the column inside the body, the letter
 *    card >= the design 150.
 * 3. SWEEP — 20 seeds of the exemplar at d2: hits must land in >= 6 of the 8
 *    slots and >= 2 distinct hit sets appear (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON, no fail = SILENT; either exits 1). The correct EN
 *    bank is the control (0 findings, renders clean).
 *      P1 every foil of the m page is an m-initial item  → bank rule 5 + verify()
 *      P2 de `Schaf` with graphemes s·c·h·a·f            → bank rule 3 (chunks)
 *      P3 fr foil `école` on the e page                  → bank rule 5 (NFD)
 *      P4 an item pinned to `zoo animals bw`             → bank rule 6 (BW marker)
 *      P5 pos:1 on a word-initial letter                 → bank rule 4
 *      P6 hunt icon forced to 48 px                      → the gate's own floor
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
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const MIN_ICON = tokens.density.K.minElement;   // 56
const FLOOR = { initial: 8, medial: 2, final: 2, foils: 6 };

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }

/* ------------------------------------------------------------------ bank */
function validateBank(bank, loc) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  if (!['letter', 'sound'].includes(bank.level)) push(`level "${bank.level}" is not letter|sound`);
  if (!['letter', 'syllable'].includes(bank.positionMode)) push(`positionMode "${bank.positionMode}"`);
  if (!Array.isArray(bank.letters) || !bank.letters.length) { push('no letters'); return f; }
  if (!bank.letters.some((l) => l.L === bank.exemplar)) push(`exemplar "${bank.exemplar}" is not an authored letter`);
  let byKey = null, pool = null;
  try {
    byKey = approvedByKey(loc);
    pool = approvedWords(loc).filter((e) => (loc !== 'da' || daStrict(e)) && hasPicture(e.key, loc) && traceable(displayWord(e.word, loc)));
  } catch (e) { push('approved words unavailable: ' + e.message); }
  const chunkLayer = hasChunkLayer(loc);
  for (const l of bank.letters) {
    const L = l.L;
    const tag = (x) => `letter ${L}: ${x}`;
    if (typeof L !== 'string' || [...L].length !== 1 || L !== L.toLocaleLowerCase(loc)) push(tag('L must be one lowercase letter'));
    if (!l.upper || l.upper.toLocaleLowerCase(loc) !== L) push(tag(`upper "${l.upper}" ≠ upper of ${L}`));
    if (l.pair && ([...l.pair].length !== 1 || l.pair === L)) push(tag(`pair "${l.pair}"`));
    for (const a of l.avoid || []) if ([...a].length !== 1 || a === L) push(tag(`avoid "${a}"`));
    const seen = new Set();
    const checkCommon = (x, kind) => {
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
    let initial = 0, medial = 0, final = 0;
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
    }
    let pairFoils = 0, avoidFoils = 0;
    for (const fo of l.foils || []) {
      checkCommon(fo, 'foil');
      // rule 5
      if (nfdBase(fo.word).includes(L)) push(tag(`foil "${fo.word}" contains ${L} (NFD base)`));
      const first = [...fo.word.toLocaleLowerCase(loc)][0];
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
  }
  // rule 11 units
  for (const u of bank.units || []) {
    if (typeof u.u !== 'string' || [...u.u].length < 2) push(`unit "${u.u}" shorter than 2 chars`);
    const carriers = (u.items || []).filter((it) => Array.isArray(it.graphemes) && it.graphemes.includes(u.u)).length;
    if (carriers < 8) push(`unit ${u.u}: ${carriers} items carry it as ONE grapheme < 8`);
    if ((u.foils || []).length < 6) push(`unit ${u.u}: ${(u.foils || []).length} foils < 6`);
  }
  // rule 10 strings
  const s = bank.strings && bank.strings['K-317'];
  if (!s) push('strings K-317 missing');
  else {
    if (!s.title || [...s.title].length > 70) push(`title > 70 chars`);
    if (/worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä/i.test(s.title || '')) push('title carries the worksheet word');
    if (!s.instruction || [...s.instruction].length > 150) push('instruction > 150 chars');
  }
  return f;
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, unit, baseName, seedEpoch, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: 'en', unit: unit || null, page, outDir: OUT, baseName, seedEpoch, strings });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-target]');
    const icons = [...document.querySelectorAll('.ws-icon')].map((el) => Math.min(el.offsetWidth, el.offsetHeight));
    const cards = document.querySelectorAll('[data-lcs-word][data-lcs-hit]').length;
    const hits = document.querySelectorAll('[data-lcs-hit="1"]').length;
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const zones = [...document.querySelectorAll('[data-lcs-zone]')].map((z) => { const r = z.getBoundingClientRect(); return { zone: z.dataset.lcsZone, w: r.width, h: r.height, left: r.left, right: r.right, bottom: r.bottom }; });
    const lanes = [...document.querySelectorAll('[data-lcs-prim="trace-letter"]')].filter((l) => !l.closest('[data-lcs-letter-card]')).map((l) => l.getBoundingClientRect().height);
    const writes = [...document.querySelectorAll('[data-lcs-prim="trace-word"]')].map((l) => l.getBoundingClientRect().height);
    const card = document.querySelector('[data-lcs-letter-card]');
    return {
      stamps: root ? { ...root.dataset } : null, icons, cards, hits, zones, lanes, writes,
      cardW: card ? card.getBoundingClientRect().width : 0, body: { left: body.left, right: body.right, top: body.top, bottom: body.bottom },
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath };
}

function assertRender(name, r, d) {
  const cfg = TYPE.difficulty[d];
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.icons.length === cfg.hunt.n, `${name}: ${r.m.icons.length} icons, want ${cfg.hunt.n}`);
  const minIcon = Math.min(...r.m.icons);
  ok(minIcon >= MIN_ICON, `${name}: hunt icon ${minIcon} px < K floor ${MIN_ICON}`);
  ok(r.m.cards === cfg.hunt.n, `${name}: ${r.m.cards} cards ≠ config ${cfg.hunt.n}`);
  ok(r.m.hits === cfg.hunt.hits && +r.m.stamps.lcsHits === cfg.hunt.hits, `${name}: ${r.m.hits} hits / stamp ${r.m.stamps.lcsHits} ≠ config ${cfg.hunt.hits}`);
  ok(r.m.stamps.lcsFoilPolicy === cfg.hunt.foilPolicy, `${name}: foil policy stamp ${r.m.stamps.lcsFoilPolicy} ≠ ${cfg.hunt.foilPolicy}`);
  ok(r.m.stamps.lcsScope === (cfg.hunt.hitPos === 'initial' ? 'initial' : 'anywhere'), `${name}: scope stamp ${r.m.stamps.lcsScope}`);
  ok(r.m.lanes.length === 2 && r.m.lanes.every((h) => Math.abs(h - cfg.trace.laneH) < 1), `${name}: trace lane heights ${r.m.lanes} ≠ ${cfg.trace.laneH}`);
  ok(r.m.writes.length === 2 && r.m.writes.every((h) => Math.abs(h - cfg.write.laneH) < 1), `${name}: write row heights ${r.m.writes} ≠ ${cfg.write.laneH}`);
  ok(r.m.cardW >= cfg.card.w - 0.6, `${name}: letter card ${r.m.cardW} px < ${cfg.card.w}`);
  for (const z of r.m.zones) {
    ok(z.left >= r.m.body.left - 0.6 && z.right <= r.m.body.right + 0.6, `${name}: zone ${z.zone} outside the body column`);
    ok(z.bottom <= r.m.foot - 0.6, `${name}: zone ${z.zone} reaches the footer`);
    ok(Math.abs(z.w - 660) < 1, `${name}: zone ${z.zone} width ${z.w} ≠ 660`);
  }
  return minIcon;
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function typeWithBank(bank) {
  return Object.assign({}, TYPE, { build(args, ctx) { return TYPE._buildWith(bank, args, ctx); } });
}
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}

async function main() {
  const banks = bankModule('letter-of-the-week');
  const locales = Object.keys(banks);
  // 1. bank (control)
  for (const loc of locales) {
    const f = validateBank(banks[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    const en = banks[loc];
    const counts = en.letters.map((l) => `${l.L}:${l.items.filter((i) => i.pos === 0).length}i/${l.items.filter((i) => i.pos > 0 && i.pos < i.graphemes.length - 1).length}m/${l.items.filter((i) => i.pos === i.graphemes.length - 1).length}e/${l.foils.length}f`);
    console.log(`bank ${loc}: exemplar ${en.exemplar}, letters ${counts.join(' ')}, units ${(en.units || []).length}`);
  }
  const en = banks.en;

  // 2. renders through the real pipeline
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
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
    // the long-chrome test (README: the body is 722 px under a three-line title +
    // three-line instruction): the TALLEST stack (d1, 652 by design) under a
    // 70-char title and a 150-char instruction must still clear the footer.
    {
      const strings = { title: 'Buchstabeneinführung der Woche: {U}{L} mit Bildern und Schreibzeilen', instruction: ('Fahre den großen und den kleinen Buchstaben nach, kreise die vier Bilder ein, deren Name mit {U} beginnt, und schreibe dann eine ganze Zeile von jedem.').slice(0, 150) };
      const r = await renderWith(page, TYPE, { difficulty: 1, unit: null, baseName: 'K-317-gate-d1-en-longchrome', strings });
      assertRender('d1 long chrome', r, 1);
      pngs.push(r.png);
      console.log(`render d1 long chrome (title ${[...strings.title].length} / instruction ${[...strings.instruction].length} chars): verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.bottom - r.m.body.top)} px`);
    }
    ok(TYPE.unitAxis.exemplar('en') === en.exemplar, 'unitAxis.exemplar ≠ bank exemplar');
    let threw = false;
    try { TYPE._buildWith(en, { difficulty: 2, locale: 'en', unit: 'q' }, { rng: makeRng('x') }); } catch (e) { threw = /not in the bank/.test(e.message); }
    ok(threw, 'an unauthored unit must REFUSE (throw), not fall back');

    // 3. seed sweep (build only, no browser)
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
    }

    // 4. poisons
    let killed = 0;
    // P1 — a foil replaced by an item starting with L. Three layers, all must fire:
    //   (a) bank rule 5; (b) the spec's own foil filter REFUSES to build the page
    //   (a poisoned bank never renders); (c) a page whose stamps carry an m-word
    //   as a foil (the stamp swap below, past the spec's guard) fails verify().
    {
      const b = clone(en); const m = b.letters.find((l) => l.L === 'm');
      m.foils = m.items.filter((i) => i.pos === 0).map((i) => ({ theme: i.theme, noun: i.noun, key: i.key, word: i.word }));
      const a = judge('P1 bank', validateBank(b, 'en'), /foil "m\w+" contains m \(NFD base\)/);
      let refused = [];
      try { TYPE._buildWith(b, { difficulty: 1, locale: 'en', unit: null }, { rng: makeRng('p1') }); } catch (e) { refused = [e.message]; }
      const c = judge('P1 build', refused, /letter m has 0 {2}foils < 3/, 'the spec refused the poisoned bank');
      const swapped = Object.assign({}, TYPE, { build(args, ctx) {
        const out = TYPE._buildWith(en, args, ctx);
        // first foil card → stamped as the m-item "mango" while hit stays 0
        out.bodyHtml = out.bodyHtml.replace(/data-lcs-word="[^"]+" data-lcs-vocab="[^"]+" data-lcs-graphemes="[^"]+" data-lcs-hit="0"/,
          'data-lcs-word="mango" data-lcs-vocab="mango" data-lcs-graphemes="' + JSON.stringify(['m', 'a', 'n', 'g', 'o']).replace(/"/g, '&quot;') + '" data-lcs-hit="0"');
        return out;
      } });
      const r = await renderWith(page, swapped, { difficulty: 2, unit: null, baseName: 'K-317-gate-poison-P1' });
      const d = judge('P1 verify', r.verify, /foil "mango" begins with m/);
      if (a && c && d) killed++;
    }
    // P2 — de Schaf with the letters as graphemes (the chunk layer says sch·a·f)
    {
      const b = { level: 'sound', positionMode: 'letter', showWordInPositions: false, exemplar: 's', strings: { 'K-317': { title: 'x', instruction: 'y' } },
        letters: [{ L: 's', upper: 'S', pair: 'f', avoid: ['f'], items: [{ theme: 'animals', noun: 'sheep', key: 'sheep', word: 'Schaf', graphemes: ['s', 'c', 'h', 'a', 'f'], pos: 0, split: ['schaf'] }], foils: [] }] };
      if (judge('P2', validateBank(b, 'de'), /"Schaf" graphemes .* ≠ approved chunks/)) killed++;
    }
    // P3 — fr foil école on the e page: NFD base "ecole" contains e
    {
      const b = clone(en); b.letters.push({ L: 'e', upper: 'E', pair: 'a', avoid: ['a'], items: [], foils: [{ theme: 'classroom', noun: 'school', key: 'school', word: 'école' }] });
      if (judge('P3', validateBank(b, 'fr'), /foil "école" contains e \(NFD base\)/)) killed++;
    }
    // P4 — a hit picture pinned to a BW theme
    {
      const b = clone(en); const m = b.letters.find((l) => l.L === 'm');
      const it = m.items.find((i) => i.word === 'monkey'); it.theme = 'zoo animals bw';
      if (judge('P4', validateBank(b, 'en'), /"monkey" pinned to a BW theme "zoo animals bw"/)) killed++;
    }
    // P5 — pos:1 on a word-initial letter
    {
      const b = clone(en); const m = b.letters.find((l) => l.L === 'm');
      m.items.find((i) => i.word === 'map').pos = 1;
      if (judge('P5', validateBank(b, 'en'), /item "map" pos 1 ≠ first m grapheme index 0/)) killed++;
    }
    // P6 — hunt icon forced to 48 px (the gate's OWN floor, not verify/lints)
    {
      const d2 = clone(TYPE.difficulty[2]); d2.hunt.iconPx = 48;
      const t = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 2: d2 } });
      const r = await renderWith(page, t, { difficulty: 2, unit: null, baseName: 'K-317-gate-poison-P6' });
      const found = [];
      const before = fails.length;
      const saved = assertions;
      assertRender('P6', r, 2);
      found.push(...fails.splice(before));   // the poison's findings must not count against the control
      assertions = saved;
      if (judge('P6', found, /hunt icon 48 px < K floor 56/, `verify ${r.verify.length} lints ${r.lints.length} — neither sees it`)) killed++;
    }
    console.log('poison:\n' + poisonLog.join('\n'));
    const allKilled = killed === 6;
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && allKilled;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/6 poisons killed${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/6 poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank };
