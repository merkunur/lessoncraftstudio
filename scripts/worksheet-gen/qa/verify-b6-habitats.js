#!/usr/bin/env node
/**
 * verify-b6-habitats.js — the family gate of G1-398 `habitats` (nt5-F, b6; design
 * docs/worksheet-gen/b6-designs/G1-398-habitats.md §5 "qa/verify-b6-habitats.js").
 *
 *   node scripts/worksheet-gen/qa/verify-b6-habitats.js [--quick]
 *
 * BANK — validateBank(block, loc) (§5 rules 1-2 + 6-12; also exported for
 *   tools/validate-b6-draft.js): every picture resolves, is opened, carries a vocab key, has a
 *   names[loc] entry, is not EXCLUDED, not a pets / farm-animals / BW theme; every lives value is
 *   a habitat key (or the camel's desert life fact), no animal at both poles; the claim literals
 *   <= 140 chars, never naming a pool animal, the camel claim says fat and never water; the needs
 *   table (a food is never in its own animal's neverEats; no toy / object food); HOMES exactly
 *   the six; titles <= 70, no worksheet-word, no free-claim, no answer-key promise, never the
 *   G1-202 / G2-318 strings, never a bare theme name; instructions <= 150, name only their
 *   face's apparatus, never the G1-202 instruction; tile labels distinct; strings keys exact.
 * COMPOSER (pure build, 400 seeds per difficulty): the page oracle (§5 rule 4) + the drawer
 *   tells on every page; the base reach (rule 3: every set member drawn, the composer never
 *   refuses); the answer-position tells POOLED (n = 400, d2) in both directions — the letter at
 *   each drawer position within +-8 points of that letter's overall share, and each habitat's
 *   letter within +-8 points of 1 / windows — and on the SHIPPED instance (seedEpoch 1).
 * RENDER (the real pipeline, render/render-instance.js, file:// fonts): d1, d2, d3 en —
 *   verify() empty, qa/lints.js clean, the floors measured HERE (pictures >= picPx >= 44, letter
 *   boxes 64 x 44, plaques one line >= 15 px, every window a habitat-tile svg); the 677 stack (a
 *   four-line title + three-line instruction chrome) fits above the footer; SWEEP (skipped by
 *   --quick): 20 seeds x d2 render 20 distinct, verify-clean pages.
 * POISON (each must FAIL for its own reason; the correct EN bank is the control): P1 P2 P3 P4
 *   P5 P6 P7 P11 P12 P13 P14 P15 P16 P17 P18 P19 + PR1 PR2 PR5 (an animal name printed) PR7 PR8
 *   PR9.
 * FACES (Phase E) — qa/b6-habitats-faces.js: the five faces K-383 G1-406 G2-380 G1-407 G2-381 (strings,
 *   400-seed sweeps + pooled and shipped tells, renders at own / 814 / 677 chromes with SPARSE + FILL,
 *   P8 P9 P10 PR3 PR4 PR6 PR10 + IA + SP / FL per face).
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const resolve = require('../image-cache/resolve.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { renderInstance } = require('../render/render-instance.js');
const freeClaim = require('../../lib/free-claim.js');
const TYPE = require('../types/g1/G1-398-animal-habitats.js');
const { HABITATS_LOC, HABITATS } = require('../data/b6/habitats.js');

const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWER_KEY = /with answers|answer key|lösungen|soluzion|solucion|soluções|corrigé|antwoorden|facit|svar(?!\p{L})|vastaukset|med løsning/iu;
const BW_MARKER = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s\d+)?$/i;
// the G1-202 / G2-318 printed titles of every locale (Boundary, m) + the bare theme names
const NEIGHBOUR_TITLES = ['Where Do Animals Live?', 'Wo leben die Tiere?', '¿Dónde viven los animales?', 'Onde os Animais Vivem?', 'Où vivent les animaux ?',
  'Dove vivono gli animali?', 'Waar wonen de dieren?', 'Var bor djuren?', 'Hvor bor dyrene?', 'Missä eläimet elävät?', 'Animal Fact File'];
const BARE_THEMES = ['animals', 'ocean life', 'forest creatures', 'zoo animals', 'insects and bugs', 'winter', 'tiere', 'meeresleben', 'waldtiere', 'djur', 'dyr',
  'eläimet', 'havsliv', 'havliv', 'merielämä', 'skogsdjur', 'skovdyr', 'skogsdyr', 'metsän eläimet'];
// per-face words an instruction may NOT use (§5 rule 10; en source — the panels carry their own)
const FACE_BANS = { base: /\b(line|circle|cross)\b/i, homes: /\b(write|letter|word)\b/i, odd: /\b(letter|write)\b/i, adapt: /\b(window|habitat picture|draw a line)\b/i, needs: /\b(toy|write)\b/i };

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const nameRe = (n, loc) => new RegExp(`(?<!\\p{L})${esc(n.normalize('NFC').toLocaleLowerCase(loc))}(?!\\p{L})`, 'u');

/* ================================================================== BANK (§5 rules) */
function validateBank(block, loc, truth = HABITATS) {
  const e = [];
  const m = resolve.manifest();
  // rule 1 — pictures
  const excl = new Set(truth.EXCLUDED.map((x) => x.theme + '/' + x.noun));
  const pics = [...truth.ANIMALS.map((a) => [a.key, a.pic]), ...Object.entries(truth.HOME_PICS || {}), ...Object.entries(truth.FOOD_PICS || {})];
  for (const [k, p] of pics) {
    const th = m.themes[p.theme], n = th && th.nouns[p.noun];
    if (!n) { e.push(`rule 1: ${k} picture ${p.theme}/${p.noun} is not cached`); continue; }
    try { resolve.fileUri(p.theme, p.noun); } catch (x) { e.push(`rule 1: ${k} fileUri: ${x.message}`); }
    if (!n.vocabKey) e.push(`rule 1: ${k} picture ${p.theme}/${p.noun} has no vocab key (no name, no alt)`);
    if (excl.has(p.theme + '/' + p.noun)) e.push(`rule 1: ${k} picture ${p.theme}/${p.noun} is EXCLUDED after opening`);
    if (truth.REFUSED_THEMES.includes(p.theme)) e.push(`rule 1: ${k} picture from the refused theme "${p.theme}" (no pet / farm animal)`);
    if (BW_MARKER.test(p.theme)) e.push(`rule 1: ${k} picture from a BW theme "${p.theme}"`);
  }
  for (const a of truth.ANIMALS) {
    if (a.picOpened !== true) e.push(`rule 1: ${a.key} picture not opened`);
    if (truth.EXCLUDED_KEYS.includes(a.key)) e.push(`rule 1: ${a.key} is an EXCLUDED animal`);
    if (!block.names || !Array.isArray(block.names[a.key]) || !block.names[a.key].length) e.push(`rule 1: ${loc} names.${a.key} missing`);
    // rule 2
    for (const h of a.lives) if (!truth.HABITAT_KEYS.includes(h) && !truth.EXTRA_LIVES.includes(h)) e.push(`rule 2: ${a.key} lives "${h}" is not a habitat key`);
    if (a.lives.includes('polar-arctic') && a.lives.includes('polar-antarctic')) e.push(`rule 2: ${a.key} lives at both poles`);
  }
  // rule 6 — claims (static)
  const names = Object.values(block.names || {}).flat();
  for (const c of truth.ADAPT) {
    if (truth.ADAPT_BANNED.includes(c.key)) e.push(`rule 6: claim ${c.key} is banned`);
    for (const k of c.trueOf) if (!truth.ANIMALS.find((a) => a.key === k)) e.push(`rule 6: claim ${c.key} trueOf ${k} is not a pool animal`);
    if ((block.refuseClaims || []).includes(c.key)) continue;
    const t = block.adapt && block.adapt[c.key];
    if (typeof t !== 'string' || !t.trim()) { e.push(`rule 6: ${loc} adapt.${c.key} missing`); continue; }
    if (t.length > 140) e.push(`rule 6: ${loc} adapt.${c.key} ${t.length} chars > 140`);
    const low = t.normalize('NFC').toLocaleLowerCase(loc);
    for (const n of names) if (nameRe(n, loc).test(low)) e.push(`rule 6: ${loc} adapt.${c.key} names the animal "${n}"`);
  }
  // rule 6b (fix round 1): NO place word inside any claim — the place gives the row away. The place words are every
  // word (>= 3 letters) of the locale's tile labels + its optional `placeWords` list (en: desert, sea, ice, jungle …)
  const placeWords = new Set([...Object.values(block.tileLabel || {}).flatMap((v) => String(v).normalize('NFC').toLocaleLowerCase(loc).split(/[^\p{L}]+/u)), ...(block.placeWords || []).map((w) => w.normalize('NFC').toLocaleLowerCase(loc))].filter((w) => w.length >= 3));
  // optional `placeWordExempt` {word: reason}: a tile word that is ALSO an ordinary word the claims need (no: `vann`
  // = lake AND water); a reason of >= 12 chars is required, so an exemption is always an audited decision
  const exempt = new Set(Object.entries(block.placeWordExempt || {}).filter(([, why]) => typeof why === 'string' && why.trim().length >= 12).map(([w]) => w.normalize('NFC').toLocaleLowerCase(loc)));
  for (const [w, why] of Object.entries(block.placeWordExempt || {})) if (typeof why !== 'string' || why.trim().length < 12) e.push(`rule 6b: ${loc} placeWordExempt.${w} needs a reason (>= 12 chars)`);
  for (const c of truth.ADAPT) {
    const t = block.adapt && block.adapt[c.key];
    if (typeof t !== 'string' || (block.refuseClaims || []).includes(c.key)) continue;
    const low = t.normalize('NFC').toLocaleLowerCase(loc);
    for (const w of placeWords) if (!exempt.has(w) && nameRe(w, loc).test(low)) e.push(`rule 6b: ${loc} adapt.${c.key} names the place "${w}" (the place gives the row away)`);
  }
  if (loc === 'en') { const c = block.adapt && block.adapt['camel-hump']; if (c && (!/\bfat\b/i.test(c) || /\bwater\b/i.test(c.split(/[,.:;]/)[0]))) e.push('rule 6: en camel-hump must say fat and never water in the hump clause'); }
  // rule 7 — needs (static)
  for (const [a, n] of Object.entries(truth.NEEDS)) {
    if (n.neverEats.includes(n.food)) e.push(`rule 7: ${a} neverEats its own food ${n.food}`);
    if (n.neverHome.includes(n.home)) e.push(`rule 7: ${a} neverHome its own home ${n.home}`);
    if (!truth.FOOD_PICS[n.food]) e.push(`rule 7: ${a} food ${n.food} has no picture`);
    for (const x of n.neverEats) if (!truth.FOOD_PICS[x]) e.push(`rule 7: ${a} neverEats ${x} is not a food picture (never a toy / an object)`);
  }
  for (const [k, p] of Object.entries(truth.FOOD_PICS)) if (/toys|tools|furniture|classroom|vehicles/i.test(p.theme)) e.push(`rule 7: food ${k} is a ${p.theme} picture (not a need)`);
  // rule 8 — homes
  const H6 = { bird: 'nest', bee: 'hive', spider: 'web', rabbit: 'burrow', ant: 'anthill', beaver: 'lodge' };
  if (JSON.stringify(Object.entries(truth.HOMES).sort()) !== JSON.stringify(Object.entries(H6).sort())) e.push('rule 8: HOMES are not exactly the six pairs');
  for (const h of Object.values(truth.HOMES)) if (truth.HOMES_REFUSED.includes(h)) e.push(`rule 8: home ${h} is refused`);
  // rules 9 / 10 / 12 — strings
  const S = block.strings || {};
  const want = ['G1-398', ...truth.LAYOUTS.map((l) => truth.FACE_IDS[l])];
  const layoutOfId = Object.fromEntries(Object.entries(truth.FACE_IDS).map(([l, id]) => [id, l]));
  const have = Object.keys(S);
  if (want.filter((k) => !have.includes(k)).length || have.filter((k) => !want.includes(k)).length) e.push(`rule 12: strings keys [${have}] ≠ [${want}]`);
  const titles = [];
  for (const [k, v] of Object.entries(S)) {
    const face = k === 'G1-398' ? 'base' : (layoutOfId[k] || k);
    const t = (v && v.title) || '', ins = (v && v.instruction) || '';
    if (!t || t.length > 70) e.push(`rule 9: ${loc} ${k} title "${t}" (${t.length}) empty or > 70`);
    if (WORKSHEET_WORD.test(t)) e.push(`rule 9: ${loc} ${k} title carries a worksheet-word`);
    for (const x of [t, ins]) { const f = freeClaim.hit(x); if (f) e.push(`rule 9: ${loc} ${k} claims free ("${f}")`); if (ANSWER_KEY.test(x)) e.push(`rule 9: ${loc} ${k} promises an answer key`); }
    const tl = t.normalize('NFC').toLocaleLowerCase(loc);
    for (const n of NEIGHBOUR_TITLES) { const nl = n.toLocaleLowerCase(loc); if (tl === nl || tl.startsWith(nl) || nl.startsWith(tl)) e.push(`rule 9: ${loc} ${k} title is the neighbour's "${n}"`); }
    if (BARE_THEMES.includes(tl.replace(/[^\p{L} ]/gu, '').trim())) e.push(`rule 9: ${loc} ${k} title is a bare theme name`);
    if (loc === 'fi' && /^eläinten kodit\.?$/i.test(t.trim())) e.push('rule 9: fi title "Eläinten kodit" alone (the homeless-animal SERP)');
    if (!ins || ins.length > 150 || !/[.!?]$/.test(ins)) e.push(`rule 10: ${loc} ${k} instruction empty / > 150 / no end mark`);
    // rule 10b (fix round 1): ONE child sentence — a terminal mark (. ! ? …) followed by a space and a capital is a
    // second sentence (a numbered abbreviation like "z. B." is lower-case after its dot and passes)
    if (/(?<!(?:^|[^\p{L}])\p{L})[.!?…]["»”]?\s+[¡¿]?\p{Lu}/u.test(ins.trim())) e.push(`rule 10b: ${loc} ${k} instruction is more than one sentence ("${ins}")`);
    if (loc === 'en' && FACE_BANS[face] && FACE_BANS[face].test(ins)) e.push(`rule 10: ${loc} ${k} instruction names apparatus not on its face (${FACE_BANS[face]})`);
    if (loc === 'en' && face === 'report' && !(/draw/i.test(ins) && /write/i.test(ins) && /circle/i.test(ins))) e.push('rule 10: en report instruction must draw + write + circle');
    if (ins.trim().toLocaleLowerCase(loc) === truth.G1_202_EN.instruction.toLowerCase()) e.push(`rule 10: ${loc} ${k} instruction is the G1-202 instruction`);
    titles.push([k, tl]);
  }
  for (let i = 0; i < titles.length; i++) for (let j = i + 1; j < titles.length; j++) if (titles[i][1] === titles[j][1]) e.push(`rule 12: ${titles[i][0]} and ${titles[j][0]} share a title`);
  // rule 11 — tile labels
  const TL = block.tileLabel || {};
  const labKeys = ['ocean', 'pond', 'forest', 'meadow', 'polar', 'polar-arctic', 'savanna', 'rainforest'];
  const used = new Set([...(block.sets && block.sets.base || []), ...((block.sets && block.sets.base || []).includes('polar') ? ['polar-arctic'] : [])]);
  for (const k of labKeys) if (used.has(k) && (typeof TL[k] !== 'string' || !TL[k].trim())) e.push(`rule 11: ${loc} tileLabel.${k} missing`);
  const vals = labKeys.filter((k) => TL[k]).map((k) => TL[k].normalize('NFC').toLocaleLowerCase(loc));
  if (new Set(vals).size !== vals.length) e.push(`rule 11: ${loc} tile labels repeat`);
  if (loc === 'no') { if (Object.values(TL).some((v) => /(?<!\p{L})sjø(?!\p{L})/iu.test(v))) e.push('rule 11: no "sjø" is the SEA, never a tile label'); if (TL.pond && TL.ocean && TL.pond === TL.ocean) e.push('rule 11: no lake = sea'); }
  if (loc === 'pt' && /cerrado/i.test(TL.savanna || '')) e.push('rule 11: pt savanna is never "Cerrado"');
  return e;
}

/* ================================================================== COMPOSER statistics (pure build) */
function composerSweep() {
  const en = HABITATS_LOC.en;
  for (const dn of [1, 2, 3]) {
    const d = TYPE.difficulty[dn];
    const drawn = new Set();
    let n = 0;
    for (let k = 1; k <= 400; k++) {
      const rng = makeRng(instanceSeed({ typeId: 'G1-398', theme: null, difficulty: dn, seedEpoch: k }));
      let c;
      try { c = TYPE._compose(d, en, 'en', rng); } catch (x) { ok(false, `d${dn} seed ${k}: the composer refused (${x.message})`); continue; }
      n++;
      c.windows.forEach((w) => drawn.add(w.habitat.startsWith('polar') ? 'polar' : w.habitat));
      for (const x of TYPE.pageOracle(c.windows, c.drawer)) ok(false, `d${dn} seed ${k}: oracle ${x}`);
      for (const x of TYPE.drawerTells(c.drawer.map((a) => a.answer), d.cols, d.minRowDistinct)) ok(false, `d${dn} seed ${k}: drawer ${x}`);
      const tiles = c.windows.map((w) => (w.habitat.startsWith('polar') ? 'polar' : w.habitat));
      let near = 0; for (const [a, b] of HABITATS.NEAR) if (tiles.includes(a) && tiles.includes(b)) near++;
      ok(near <= d.nearPairs, `d${dn} seed ${k}: ${near} near pairs > ${d.nearPairs}`);
      ok(c.drawer.length === d.animals, `d${dn} seed ${k}: ${c.drawer.length} animals ≠ ${d.animals}`);
      const per = {}; c.drawer.forEach((a) => { per[a.answer] = (per[a.answer] || 0) + 1; });
      ok(c.windows.every((w) => per[w.letter] >= d.perWindow[0] && per[w.letter] <= d.perWindow[1]), `d${dn} seed ${k}: a window count outside [${d.perWindow}]`);
      ok(new Set(Object.values(per)).size > 1, `d${dn} seed ${k}: all-equal counts`);
    }
    ok(n === 400, `d${dn}: ${n}/400 pages composed`);
    for (const t of en.sets.base) ok(drawn.has(t), `d${dn}: set member ${t} never drawn in 400 seeds (rule 3 reach)`);
  }
}

/**
 * The §1 LOCALE SETS (the panels have not authored their blocks yet, so the sets are probed on the en block
 * with the set swapped in): after the generalist audit widened `lives`, every fixed set must still compose a
 * legal base AND a legal F2 page on every seed — the widened table may never leave a window empty.
 */
const LOCALE_SETS = {
  'de/sv/da/no/fi': { sets: { base: ['forest', 'meadow', 'pond', 'ocean'] } },
  es: { sets: { base: ['rainforest', 'forest', 'ocean', 'pond'] } },
  // fix round 1: penguins and walruses also live at SEA (pt panel), so a page with an ocean AND a polar window has no
  // polar animal with a single answer — the pt set WITH Polo must REFUSE the base (the design's OPEN 3 contingency:
  // the pt panel drops Polo -> 3 windows); F2 still composes with it
  pt: { sets: { base: ['rainforest', 'ocean', 'savanna', 'polar'] }, rainforestRegion: 'americas', expectBaseRefusal: true },
  'pt without Polo (OPEN 3)': { sets: { base: ['rainforest', 'ocean', 'savanna'] }, rainforestRegion: 'americas' },
};
function localeSetSweep() {
  const odd = { ...TYPE.difficulty[2], layout: 'odd', rows: 4, perRow: 4, nearPairs: 1 };
  const out = [];
  for (const [name, patch] of Object.entries(LOCALE_SETS)) {
    const block = { ...HABITATS_LOC.en, ...patch };
    let base = 0, f2 = 0; const minPool = {};
    for (let k = 1; k <= 200; k++) {
      const rng = makeRng(instanceSeed({ typeId: 'G1-398', theme: null, difficulty: 2, seedEpoch: k }));
      try {
        if (patch.expectBaseRefusal) { let threw = false; try { TYPE._compose(TYPE.difficulty[2], block, 'xx', rng); } catch (x) { threw = true; } ok(threw, `${name} base seed ${k}: composed although a page with ocean + polar has no single-answer polar animal`); if (threw) base++; throw new Error('skip'); }
        const c = TYPE._compose(TYPE.difficulty[2], block, 'xx', rng);
        for (const x of TYPE.pageOracle(c.windows, c.drawer, { rainforestRegion: block.rainforestRegion })) ok(false, `${name} base seed ${k}: ${x}`);
        const per = {}; c.drawer.forEach((a) => { per[a.answer] = (per[a.answer] || 0) + 1; });
        c.windows.forEach((w) => { minPool[w.habitat] = Math.min(minPool[w.habitat] || 9, per[w.letter] || 0); });
        base++;
      } catch (x) { if (x.message !== 'skip') ok(false, `${name} base seed ${k}: the composer refused (${x.message})`); }
      try {
        const m = TYPE._composeOdd(odd, block, 'xx', makeRng(instanceSeed({ typeId: 'G1-406', theme: null, difficulty: 2, seedEpoch: k })));
        for (const r of m.rows) for (const x of TYPE.oddRowOracle(r.habitat, r.residents, r.stranger, block.rainforestRegion || null)) ok(false, `${name} F2 seed ${k}: ${x}`);
        f2++;
      } catch (x) { ok(false, `${name} F2 seed ${k}: the composer refused (${x.message})`); }
    }
    out.push(`  ${name}: base ${base}/200 ${patch.expectBaseRefusal ? 'REFUSED (expected)' : 'legal'}, F2 ${f2}/200 legal; fewest animals per window [${Object.entries(minPool).map(([h, v]) => h + ' ' + v).join(', ')}]`);
  }
  return out;
}

function tellStats() {
  const d = TYPE.difficulty[2];
  // n = 2000 (was 400): at 400 a habitat drawn on ~60 pages read 35 % for one letter — sampling noise over 28
  // habitat x letter cells (sd ~5.6 points at n 60); the sample is RAISED, never the +-8 threshold (nt10-E lesson)
  const N = 2000;
  const letterTot = {}, posLetter = Array.from({ length: d.animals }, () => ({})), habLetter = {};
  let shipped = null;
  for (let k = 1; k <= N; k++) {
    const c = TYPE._compose(d, HABITATS_LOC.en, 'en', makeRng(instanceSeed({ typeId: 'G1-398', theme: null, difficulty: 2, seedEpoch: k })));
    if (k === 1) shipped = c;
    c.drawer.forEach((a, i) => { letterTot[a.answer] = (letterTot[a.answer] || 0) + 1; posLetter[i][a.answer] = (posLetter[i][a.answer] || 0) + 1; });
    for (const w of c.windows) { const h = w.habitat.startsWith('polar') ? 'polar' : w.habitat; (habLetter[h] = habLetter[h] || {})[w.letter] = (habLetter[h][w.letter] || 0) + 1; }
  }
  const tot = N * d.animals;
  const rows = [];
  let worst = 0;
  for (let i = 0; i < d.animals; i++) for (const L of Object.keys(letterTot)) {
    const share = (posLetter[i][L] || 0) / N, base = letterTot[L] / tot, dev = (share - base) * 100;
    worst = Math.max(worst, Math.abs(dev));
    ok(Math.abs(dev) <= 8, `position ${i + 1}: letter ${L} ${(100 * share).toFixed(1)} % vs its overall ${(100 * base).toFixed(1)} % (> ±8 points)`);
  }
  rows.push(`per-position letter share: max |dev| ${worst.toFixed(1)} points (n ${N})`);
  let worstH = 0;
  for (const [h, byL] of Object.entries(habLetter)) {
    const n = Object.values(byL).reduce((s, v) => s + v, 0);
    if (n < 40) continue;
    for (const L of ['A', 'B', 'C', 'D']) { const dev = ((byL[L] || 0) / n - 0.25) * 100; worstH = Math.max(worstH, Math.abs(dev)); ok(Math.abs(dev) <= 8, `habitat ${h} is letter ${L} ${(100 * (byL[L] || 0) / n).toFixed(1)} % (≠ 25 ± 8)`); }
  }
  rows.push(`habitat -> letter share: max |dev| ${worstH.toFixed(1)} points from 25 %`);
  const letters = shipped.drawer.map((a) => a.answer);
  ok(!TYPE.drawerTells(letters, d.cols, d.minRowDistinct).length, 'the shipped instance carries a drawer tell');
  rows.push(`shipped instance (seedEpoch 1): windows ${shipped.windows.map((w) => w.letter + '=' + w.habitat).join(' ')} · drawer ${letters.join('')}`);
  return rows;
}

/* ================================================================== RENDER */
function typeWith(block, cfg) {
  return { ...TYPE, build(o, ctx) { return TYPE._buildWith(block, cfg, { locale: o.locale }, ctx); }, verify: TYPE.verify.bind(TYPE) };
}
async function render(page, type, { difficulty = 2, name, strings, seedEpoch } = {}) {
  return renderInstance({ type, theme: null, difficulty, locale: 'en', page, strings, seedEpoch, outDir: OUT, baseName: `G1-398-gate-${name}` });
}
async function floors(page, d) {
  return page.evaluate((picPx) => {
    const f = [];
    const R = (e) => e.getBoundingClientRect();
    const root = document.querySelector('[data-lcs-type="habitats"]');
    for (const img of root.querySelectorAll('img[data-lcs-pic]')) if (R(img).width < picPx - 0.5 || R(img).width < 44) f.push(`picture ${R(img).width.toFixed(1)} < ${picPx}`);
    for (const b of root.querySelectorAll('.ws-blankbox')) if (Math.abs(R(b).width - 64) > 0.6 || Math.abs(R(b).height - 44) > 0.6) f.push(`box ${R(b).width.toFixed(1)} x ${R(b).height.toFixed(1)}`);
    for (const p of root.querySelectorAll('[data-lcs-plaque]')) { if (parseFloat(getComputedStyle(p).fontSize) < 15) f.push('plaque < 15 px'); if (R(p).height > 27) f.push('plaque not one line'); }
    for (const w of root.querySelectorAll('[data-lcs-window]')) if (!w.querySelector('svg[data-lcs-prim="habitat-tile"]')) f.push('a window is not a habitat-tile');
    const foot = document.querySelector('.ws-foot'), drawer = root.querySelector('[data-lcs-drawer]');
    if (foot && drawer && R(drawer).bottom > R(foot).top + 0.6) f.push(`the drawer (${R(drawer).bottom.toFixed(0)}) reaches the footer (${R(foot).top.toFixed(0)})`);
    return { f, body: R(document.querySelector('.ws-body')).height, stack: R(drawer).bottom - R(root).top, pics: [...root.querySelectorAll('img[data-lcs-pic]')].map((i) => R(i).width) };
  }, d.picPx);
}

async function main() {
  freeClaim.selfTest();
  // --- bank
  const en = HABITATS_LOC.en;
  validateBank(en, 'en').forEach((x) => ok(false, 'bank: ' + x)); assertions++;
  ok(en.strings['G1-398'].title === TYPE.i18n.en.title && en.strings['G1-398'].instruction === TYPE.i18n.en.instruction, "strings['G1-398'] ≠ the spec's i18n.en");
  try { require('../i18n/build-en.js').buildEn(); ok(true, ''); } catch (x) { ok(false, 'i18n/build-en: ' + x.message); }
  // --- composer
  composerSweep();
  const tells = tellStats();
  console.log(tells.join('\n'));
  console.log(['locale sets (generalist audit, 200 seeds each):', ...localeSetSweep()].join('\n'));

  // --- bank poisons
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 3).join(' | ') : 'SILENT'}`); if (k) killed++; };
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const truthWith = (fn) => { const t = clone(HABITATS); fn(t); return t; };
  const addAnimal = (a) => truthWith((t) => t.ANIMALS.push({ picOpened: true, coastal: false, lookalike: [], group: null, region: null, notWithWindow: [], faces: null, ...a }));
  judge('P3 ocean life/squid added', validateBank({ ...en, names: { ...en.names, squid: ['squid'] } }, 'en', addAnimal({ key: 'squid', pic: { theme: 'ocean life', noun: 'squid' }, lives: ['ocean'] })), /rule 1: .*EXCLUDED/);
  judge('P5 zoo animals/jaguar added', validateBank({ ...en, names: { ...en.names, jaguar: ['jaguar'] } }, 'en', addAnimal({ key: 'jaguar', pic: { theme: 'zoo animals', noun: 'jaguar' }, lives: ['rainforest'] })), /rule 1: .*EXCLUDED/);
  judge('P13 zoo animals/polar_bear (vocab NULL)', validateBank({ ...en, names: { ...en.names, pb: ['polar bear'] } }, 'en', addAnimal({ key: 'pb', pic: { theme: 'zoo animals', noun: 'polar_bear' }, lives: ['polar-arctic'] })), /rule 1: .*(no vocab key|EXCLUDED|not cached)/);
  judge('P14 a cat from pets', validateBank({ ...en, names: { ...en.names, cat: ['cat'] } }, 'en', addAnimal({ key: 'cat', pic: { theme: 'pets', noun: 'cat' }, lives: ['forest'] })), /rule 1: .*(refused theme|not cached)/);
  judge('P6 F3 claim "Its hump stores water"', validateBank({ ...en, adapt: { ...en.adapt, 'camel-hump': 'Its hump stores water, so it can go a long time without drinking in the desert.' } }, 'en'), /rule 6: en camel-hump/);
  judge('P7 F3 claim naming "giraffe"', validateBank({ ...en, adapt: { ...en.adapt, 'giraffe-neck': 'The giraffe has a long neck that reaches the leaves high up in the trees.' } }, 'en'), /rule 6: .*names the animal "giraffe"/);
  judge('P11 F4 bee food distractor = its own food', validateBank(en, 'en', truthWith((t) => { t.NEEDS.bee.neverEats.push('flower'); })), /rule 7: bee neverEats its own food/);
  judge('P12 F4 distractor = toys/ball', validateBank(en, 'en', truthWith((t) => { t.FOOD_PICS.ball = { theme: 'toys', noun: 'ball' }; t.NEEDS.rabbit.neverEats.push('ball'); })), /rule 7: food ball is a toys picture/);
  judge('P15 F1 woodpecker ↔ tree hole', validateBank(en, 'en', truthWith((t) => { t.HOMES.woodpecker = 'tree-hole'; })), /rule 8/);
  judge('P17 base instruction = the G1-202 instruction', validateBank({ ...en, strings: { ...en.strings, 'G1-398': { ...en.strings['G1-398'], instruction: 'Draw a line from each animal to where it lives.' } } }, 'en'), /rule 10: .*G1-202 instruction/);
  judge('P18 no tileLabel.pond "sjø"', validateBank({ ...en, tileLabel: { ...en.tileLabel, pond: 'sjø' } }, 'no'), /rule 11: no "sjø"/);
  // fix round 1 poisons
  judge('P1S a two-sentence instruction (fi-style block)', validateBank({ ...en, strings: { ...en.strings, 'G1-406': { ...en.strings['G1-406'], instruction: 'Katso jokaista riviä. Ruksaa eläin, joka ei asu siellä.' } } }, 'fi'), /rule 10b: fi G1-406 instruction is more than one sentence/);
  judge('P1S2 control: one sentence with "z. B." passes rule 10b', validateBank({ ...en, strings: { ...en.strings, 'G1-406': { ...en.strings['G1-406'], instruction: 'Streiche in jeder Reihe das Tier durch, das z. B. nicht im Wald lebt.' } } }, 'de').filter((x) => /rule 10b/.test(x)).length ? ['rule 10b fired on a correct single sentence'] : ['CONTROL-OK'], /CONTROL-OK/);
  judge('P5b a claim naming a place ("desert")', validateBank({ ...en, adapt: { ...en.adapt, 'camel-hump': 'Its hump stores fat, so it can go a long time without food in the desert.' } }, 'en'), /rule 6b: en adapt.camel-hump names the place "desert"/);
  judge('P6X placeWordExempt: a lake word that also means water (control: must pass)', validateBank({ ...en, tileLabel: { ...en.tileLabel, pond: 'Water' }, adapt: { ...en.adapt, 'elephant-trunk': 'Its long trunk sucks up water and picks up food.' }, placeWordExempt: { water: 'the en test lake word also means water' } }, 'en').filter((x) => /rule 6b/.test(x)).length ? ['rule 6b fired on an exempt word'] : ['CONTROL-OK'], /CONTROL-OK/);
  judge('P6Y the same without the exemption fails', validateBank({ ...en, tileLabel: { ...en.tileLabel, pond: 'Water' }, adapt: { ...en.adapt, 'elephant-trunk': 'Its long trunk sucks up water and picks up food.' } }, 'en'), /rule 6b: en adapt.elephant-trunk names the place "water"/);
  judge('P2H the heron back in the pool', validateBank({ ...en, names: { ...en.names, heron: ['heron'] } }, 'en', addAnimal({ key: 'heron', pic: { theme: 'birds 2', noun: 'heron' }, lives: ['pond'] })), /rule 1: .*EXCLUDED/);
  judge('P19 fi F1 title "Eläinten kodit"', validateBank({ ...en, strings: { ...en.strings, 'K-383': { ...en.strings['K-383'], title: 'Eläinten kodit' } } }, 'fi'), /rule 9: fi title "Eläinten kodit"/);

  // --- render
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pages = [];
  try {
    for (const dn of [1, 2, 3]) {
      const out = await render(page, TYPE, { difficulty: dn, name: `d${dn}` });
      out.qa.verify.forEach((x) => ok(false, `d${dn} verify: ${x}`)); assertions++;
      out.qa.lints.forEach((x) => ok(false, `d${dn} lint: ${JSON.stringify(x)}`)); assertions++;
      const fl = await floors(page, TYPE.difficulty[dn]);
      fl.f.forEach((x) => ok(false, `d${dn} floor: ${x}`)); assertions++;
      console.log(`d${dn}: body ${fl.body.toFixed(0)} px, stack ${fl.stack.toFixed(0)} px, pictures ${[...new Set(fl.pics.map((p) => p.toFixed(0)))]} px — ${out.pngPath}`);
      pages.push(out.pngPath);
    }
    // the 677 chrome: a four-line title + three-line instruction (the fi length test)
    const long = { title: 'Missä eläimet asuvat? Metsä, niitty, järvi ja meri: elinympäristöt ja niiden eläimet kuvina, kirjaimina ja pienin sanoin', instruction: 'Katso elinympäristöjä tarkasti. Kirjoita jokaisen eläimen alle sen elinympäristön kirjain, jossa eläin asuu ja elää koko vuoden.' };
    const o677 = await render(page, TYPE, { name: 'chrome677', strings: long });
    const fl = await floors(page, TYPE.difficulty[2]);
    fl.f.forEach((x) => ok(false, `677 chrome floor: ${x}`)); assertions++;
    o677.qa.lints.forEach((x) => ok(false, `677 chrome lint: ${JSON.stringify(x)}`));
    ok(fl.body <= 680, `the chrome test did not reach the 677 body (${fl.body.toFixed(0)} px): it tests nothing`);
    console.log(`677 chrome: body ${fl.body.toFixed(0)} px, stack ${fl.stack.toFixed(0)} px — ${o677.pngPath}`);
    // sweep
    if (!QUICK) {
      const seen = new Set();
      for (let k = 2; k <= 21; k++) {
        const o = await render(page, TYPE, { name: `sweep`, seedEpoch: k });
        o.qa.verify.forEach((x) => ok(false, `sweep ${k} verify: ${x}`)); o.qa.lints.forEach((x) => ok(false, `sweep ${k} lint: ${JSON.stringify(x)}`)); assertions++;
        seen.add(JSON.stringify(o.meta.windows) + JSON.stringify(o.meta.drawer));
      }
      ok(seen.size === 20, `sweep: ${seen.size}/20 distinct pages`);
      console.log(`sweep: 20 seeds x d2, ${seen.size} distinct pages`);
    }
    // render poisons (verify() must catch them)
    const d2 = TYPE.difficulty[2];
    const rp = async (name, cfg, block, re) => { const o = await render(page, typeWith(block || en, { ...d2, ...cfg }), { name: 'poison' }); judge(name, o.qa.verify, re); };
    await rp('P1 penguin + walrus on one base page', { forcePage: { habitats: ['ocean', 'polar-antarctic', 'forest', 'meadow'], drawer: ['whale', 'penguin', 'deer', 'walrus', 'bee', 'shark', 'squirrel', 'ladybug'] } }, null, /Arctic and an Antarctic|meets 0 windows/);
    await rp('P2 duck on a page with an ocean window', { forcePage: { habitats: ['ocean', 'pond', 'forest', 'meadow'], drawer: ['whale', 'duck', 'deer', 'frog', 'bee', 'shark', 'squirrel', 'ladybug'] } }, null, /coastal bird/);
    await rp('P4 frog on a page with a rainforest window', { forcePage: { habitats: ['rainforest', 'pond', 'forest', 'meadow'], drawer: ['toucan', 'frog', 'squirrel', 'beaver', 'grasshopper', 'sloth', 'dragonfly', 'macaw'] } }, null, /frog: lives \[pond,meadow,forest,rainforest\] meets \d windows/);   // the frog's tree-frog home is now an honest `lives` entry (generalist audit), not a notWithWindow rule
    await rp('P16 pt Amazônia page with a gorilla', { forcePage: { habitats: ['rainforest', 'ocean', 'savanna', 'polar-antarctic'], drawer: ['sloth', 'whale', 'gorilla', 'lion', 'penguin', 'shark', 'zebra', 'toucan'] } }, { ...en, rainforestRegion: 'americas' }, /not a americas rainforest animal/);
    await rp('PP a generalist answering through a secondary habitat (ladybug -> forest, no meadow)', { forcePage: { habitats: ['ocean', 'forest', 'pond', 'savanna'], drawer: ['whale', 'ladybug', 'frog', 'lion', 'shark', 'squirrel', 'beaver', 'zebra'] } }, null, /ladybug: answers through forest, not its primary habitat meadow/);
    await rp('P4P a penguin on a base page with an ocean AND a polar window (penguins live at sea too)', { forcePage: { habitats: ['ocean', 'polar-antarctic', 'forest', 'savanna'], drawer: ['whale', 'penguin', 'deer', 'lion', 'shark', 'squirrel', 'zebra', 'crab'] } }, null, /penguin: lives \[polar-antarctic,ocean\] meets 2 windows/);
    await rp('PR1 answer letters ABCDABCD', { forcePage: { habitats: ['ocean', 'forest', 'meadow', 'savanna'], drawer: ['whale', 'deer', 'bee', 'lion', 'shark', 'squirrel', 'ladybug', 'zebra'] } }, null, /periodic/);
    await rp('PR2 per-window counts 2,2,2,2', { forcePage: { habitats: ['ocean', 'forest', 'meadow', 'savanna'], drawer: ['whale', 'deer', 'bee', 'lion', 'squirrel', 'shark', 'zebra', 'ladybug'] } }, null, /all-equal counts/);
    await rp('PR5 an animal name printed in the body', {}, { ...en, tileLabel: { ...en.tileLabel, ocean: 'Whale Ocean', pond: 'Frog Pond', forest: 'Deer Forest', meadow: 'Bee Meadow', savanna: 'Lion Savanna', rainforest: 'Sloth Rainforest', polar: 'Penguin Ice', 'polar-arctic': 'Walrus Arctic' } }, /name in body/);
    await rp('PR7 a window as a library <img>', { forceWindowImg: true }, null, /tile is not the primitive/);
    await rp('PR8 answerBox in place of blankNumeralBox', { forceAnswerBox: true }, null, /stamps "undefined"/);
    await rp('PR9 a plaque wider than 280 at 17 px', { forcePlaquePx: 17 }, { ...en, tileLabel: { ...en.tileLabel, ocean: 'The Great Wide Deep Blue Salty Ocean', pond: 'The Small Still Freshwater Garden Pond', forest: 'The Tall Dark Leafy Broadleaf Forest', meadow: 'The Sunny Flowering Summer Meadow Hill', savanna: 'The Hot Dry Grassy African Savanna', rainforest: 'The Warm Wet Steamy Tropical Rainforest', polar: 'The Freezing Cold Polar Ice Floes', 'polar-arctic': 'The Freezing Cold Arctic Ice Floes' } }, /plaque overflow/);
    // the five faces (Phase E): strings, sweeps + tells, renders at three chromes, SPARSE / FILL, poisons
    const faceLog = [];
    await require('./b6-habitats-faces.js').faceGate({ page, ok, judge, validateBank, quick: QUICK, log: faceLog });
    console.log(['faces:', ...faceLog].join('\n'));
  } finally { await browser.close(); }

  console.log('poison:\n' + log.join('\n'));
  console.log('PNGs:\n  ' + pages.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, validateBank };
