/**
 * b5-earth-and-space-faces.js — section 5 of qa/verify-b5-earth-and-space.js: the five
 * G1-378 CODE faces (nt10-E Phase E; design §3 + §5; record _work/G1-378-faces.md).
 *
 *   G1-391 moon-phases-in-order · G2-367 moon-phase-names · G2-368 day-and-night-model ·
 *   G3-394 planets-in-order · G3-395 planet-sizes
 *
 * Called by the family gate with its ok / judge / renderer; never run on its own.
 * A. the emitted specs (layout, band, strings === the bank, refusals)
 * B. the locale-neutral MODEL the faces answer from, checked against the gate's OWN
 *    tables (orbit order from the semi-major axes; size class from the diameters)
 * C. node sweep, 400 seeds per face: the shipped draw has no position tell on ANY seed,
 *    and the draw is locale-neutral (a synthetic de / pt block draws the same page)
 * D. renders through the real pipeline: d2 en at the default chrome, the 722 (de) and the
 *    677 (fi) chromes, pt (the southern mirror) for the two moon faces; verify() empty,
 *    lints clean, FILL (content ends >= 85 % of the body at the default chrome, inside it
 *    at 677), apparatus-in-instruction; every moon drawn is RASTERISED (lit/disc ±0.03 of
 *    the model, the stamp ±0.001 of (1 - cos 45°p)/2, the lit side per hemisphere); the F3
 *    Earth's pins re-measured on the pixels (±5°); the F4 glyph radii uniform; seed sweep.
 * E. poisons: the deferred §5 face poisons PR3 PR4 PR5 PR7 PR8 PR9 PR10 PR11 PR13 (+ PR6 at
 *    the face), the pt mirror, a tampered lit stamp, the planet order swapped, a planet
 *    drawing leaking into an answer surface, per-face SPARSE, FILL both ways, apparatus.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { makeRng } = require('../lib/rng.js');
const bankMod = require('../data/b5/earth-and-space.js');
const { checkMoon, expFracIn } = require('./verify-moon-phase.js');
const { checkEarthTop } = require('./verify-sky-bodies.js');
const { checkSet } = require('./verify-planets.js');

const M = bankMod.EARTH_AND_SPACE;
const FACE = {
  'moon-phases-in-order': { id: 'G1-391', dir: 'g1', band: 'G1' },
  'moon-phase-names': { id: 'G2-367', dir: 'g2', band: 'G2' },
  'day-and-night-model': { id: 'G2-368', dir: 'g2', band: 'G2' },
  'planets-in-order': { id: 'G3-394', dir: 'g3', band: 'G3' },
  'planet-sizes': { id: 'G3-395', dir: 'g3', band: 'G3' },
};
const LAYOUTS = Object.keys(FACE);
const FILL_MIN = 0.85;
/** The gate's OWN planet table: mean orbital semi-major axis (AU, NASA fact sheets). The order from the Sun is DERIVED from it. */
const AU = { mercury: 0.387, venus: 0.723, earth: 1.0, mars: 1.524, jupiter: 5.203, saturn: 9.537, uranus: 19.19, neptune: 30.07 };
const ORDER_FROM_SUN = Object.keys(AU).sort((a, b) => AU[a] - AU[b]);
/** Apparatus-in-instruction (nt10-E addition 4): every apparatus word the EN instruction names must be DRAWN on that face. */
const APPARATUS_EN = [
  [/(?<!\p{L})lines?(?!\p{L})/iu, 'svg[data-lcs-prim="writing-row"]'],
  [/(?<!\p{L})bank(?!\p{L})/iu, '[data-lcs-bank-banner], [data-lcs-planet-bank]'],
  [/(?<!\p{L})table(?!\p{L})/iu, '[data-lcs-pin-table]'],
  [/(?<!\p{L})pins?(?!\p{L})|numbered/iu, 'g[data-lcs-pin]'],
  [/(?<!\p{L})box(es)?(?!\p{L})/iu, '[data-lcs-bin], .ws-blankbox'],
  [/(?<!\p{L})moons?(?!\p{L})/iu, 'svg[data-lcs-prim="moon-phase"]'],
  [/(?<!\p{L})sun(?!\p{L})/iu, 'svg[data-lcs-body="sun"], svg[data-lcs-fan] [data-lcs-part="sun"]'],
  [/(?<!\p{L})rows?(?!\p{L})/iu, '[data-lcs-rail]'],
  [/(?<!\p{L})word(?!\p{L})/iu, '[data-lcs-bank-banner], .ws-achip'],
];

function loadFace(L) {
  const dir = path.join(__dirname, '..', 'types', FACE[L].dir);
  const f = fs.readdirSync(dir).find((x) => x.startsWith(FACE[L].id + '-'));
  if (!f) throw new Error('face spec missing: ' + FACE[L].id);
  return require(path.join(dir, f));
}
const clone = (o) => JSON.parse(JSON.stringify(o));

/** The model checks (B), as a pure function so a poisoned clone can be fed through it. */
function checkModel(Mo) {
  const f = [];
  if (Mo.PLANETS.join() !== ORDER_FROM_SUN.join()) f.push(`PLANETS ${Mo.PLANETS.join(',')} is not the order from the Sun (${ORDER_FROM_SUN.join(',')}, from the semi-major axes)`);
  for (const [id, c] of Object.entries(Mo.SIZE_CLASS)) {
    const want = id === 'sun' || id === 'moon' ? 'notPlanet' : Mo.DIAMETER_KM[id] > 40000 ? 'giant' : 'rocky';
    if (c !== want) f.push(`SIZE_CLASS.${id} ${c} ≠ ${want} (from the diameter ${Mo.DIAMETER_KM[id]} km)`);
  }
  const giants = Mo.PLANETS.filter((p) => Mo.SIZE_CLASS[p] === 'giant').map((p) => Mo.DIAMETER_KM[p]);
  const rocky = Mo.PLANETS.filter((p) => Mo.SIZE_CLASS[p] === 'rocky').map((p) => Mo.DIAMETER_KM[p]);
  if (!(Math.min(...giants) > 3 * Math.max(...rocky))) f.push('the smallest giant is not > 3x the largest rocky planet (the class would be arguable)');
  for (const [l, o] of Object.entries(Mo.PLANET_ALPHA)) if (o.slice().sort().join() !== Mo.PLANETS.slice().sort().join()) f.push(`PLANET_ALPHA.${l} is not a permutation of the planets`);
  return f;
}

/** A synthetic locale block: the EN literals in the locale's convention slots (hemisphere). */
function synth(loc) { const b = clone(bankMod.EARTH_AND_SPACE_LOC.en); b.hemisphere = loc === 'pt' ? 'S' : 'N'; return b; }

async function faceSection({ page, ok, judge, renderInstance, OUT, LONG, quick, log }) {
  const en = bankMod.EARTH_AND_SPACE_LOC.en;
  const FACES = Object.fromEntries(LAYOUTS.map((L) => [L, loadFace(L)]));
  // ---------------------------------------------------------------- A. the emitted specs
  for (const L of LAYOUTS) {
    const F = FACES[L], id = FACE[L].id;
    ok(F.id === id && F.difficulty[2].layout === L && F.difficulty[1] === F.difficulty[2] && F.difficulty[3] === F.difficulty[2], `${id}: id / difficulty.layout ${F.difficulty[2].layout} ≠ ${L}`);
    ok(F.gradeBand === FACE[L].band, `${id}: gradeBand ${F.gradeBand} ≠ ${FACE[L].band}`);
    ok(F.i18n.en.title === en.strings[L].title && F.i18n.en.instruction === en.strings[L].instruction, `${id}: i18n.en ≠ EARTH_AND_SPACE_LOC.en.strings.${L}`);
    ok(F.exerciseType === 'earth-and-space' && F.themeAxis.applicable === false, `${id}: exerciseType / themeAxis`);
    let m = null; try { F.build({ difficulty: 2, locale: 'sv' }, { rng: makeRng('x') }); } catch (e) { m = e.message; }
    ok(!!m && /no sv block|refuse/.test(m), `${id}: an unauthored sv must REFUSE (got ${m || 'a page'})`);
    m = null; try { F._buildWith({ ...en, refuse: [L] }, F.difficulty[2], { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; }
    ok(!!m && /refuses the/.test(m), `${id}: bank.refuse [${L}] must REFUSE (got ${m || 'a page'})`);
    m = null; try { F._buildWith({ ...en, strings: { ...en.strings, [L]: undefined } }, F.difficulty[2], { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; }
    ok(!!m && /no strings\./.test(m), `${id}: a missing strings.${L} must REFUSE (got ${m || 'a page'})`);
    ok(!/answer\s*key|with\s+answers/i.test(F.i18n.en.title + ' ' + F.i18n.en.instruction), `${id}: a string promises an answer key`);
  }
  {
    let m = null; try { FACES['moon-phase-names']._buildWith(en, { ...FACES['moon-phase-names'].difficulty[2], phases: [0, 1, 2, 4, 6, 0, 2, 4] }, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; }
    ok(!!m && /outside the named set/.test(m), `F2 with a crescent card must REFUSE at the composer (got ${m || 'a page'})`);
    m = null; try { FACES['day-and-night-model']._buildWith(en, { ...FACES['day-and-night-model'].difficulty[2], shadeNight: true }, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; }
    ok(!!m && /shadeNight/.test(m), `F3 shadeNight must REFUSE (got ${m || 'a page'})`);
  }
  // ---------------------------------------------------------------- B. the model
  {
    const f = checkModel(M);
    ok(f.length === 0, `the model: ${f.join('; ')}`);
    const mo = clone(M); [mo.PLANETS[2], mo.PLANETS[3]] = [mo.PLANETS[3], mo.PLANETS[2]];
    judge('PO planet order data swapped (earth <-> mars)', checkModel(mo), /is not the order from the Sun/);
    const mo2 = clone(M); mo2.SIZE_CLASS.earth = 'giant';
    judge('PO2 SIZE_CLASS earth = giant', checkModel(mo2), /SIZE_CLASS\.earth giant ≠ rocky/);
  }
  // ---------------------------------------------------------------- C. node sweep
  {
    const SEEDS = quick ? 100 : 400;
    const tells = Object.fromEntries(LAYOUTS.map((L) => [L, 0])), neutral = { ...tells }, pages = Object.fromEntries(LAYOUTS.map((L) => [L, new Set()]));
    const de = synth('de'), pt = synth('pt');
    const alpha = Object.values(M.PLANET_ALPHA).map((o) => o.join());
    for (let s = 1; s <= SEEDS; s++) for (const L of LAYOUTS) {
      const F = FACES[L], rng = () => makeRng(`${FACE[L].id}-sweep-${s}`);
      const a = F._buildWith(en, F.difficulty[2], { locale: 'en' }, { rng: rng() });
      const b = F._buildWith(L === 'moon-phases-in-order' || L === 'moon-phase-names' ? pt : de, F.difficulty[2], { locale: L.startsWith('moon') ? 'pt' : 'de' }, { rng: rng() });
      if (JSON.stringify(a.meta) !== JSON.stringify(b.meta)) neutral[L]++;
      const m = a.meta;
      pages[L].add(JSON.stringify(m));
      if (L === 'moon-phases-in-order') { const seqs = m.rails.map((r) => r.answers.join('')); if (seqs.some((q) => q === '12345' || q === '54321') || new Set(seqs).size !== seqs.length) tells[L]++; }
      if (L === 'moon-phase-names') { if (m.cards.some((p, i) => (i && p === m.cards[i - 1]) || (i >= 2 && p === m.cards[i - 2]))) tells[L]++; if (m.bank.join() === m.cards.slice(0, 4).join()) tells[L]++; }
      if (L === 'day-and-night-model') { const q = m.answers.map((x) => x[0]).join(''); if (/^(d+n+|n+d+|(dn)+d?|(nd)+n?)$/.test(q) || !/d/.test(q.slice(0, 3)) || !/n/.test(q.slice(0, 3)) || !/d/.test(q.slice(3)) || !/n/.test(q.slice(3))) tells[L]++; }
      if (L === 'planets-in-order') { const j = m.bank.join(); if (j === ORDER_FROM_SUN.join() || j === ORDER_FROM_SUN.slice().reverse().join() || alpha.includes(j)) tells[L]++; }
      if (L === 'planet-sizes') { const c = m.bank.map((id) => M.SIZE_CLASS[id]); if (c.some((x, i) => i >= 2 && x === c[i - 1] && x === c[i - 2])) tells[L]++; const np = c.map((x, i) => (x === 'notPlanet' ? i : -1)).filter((i) => i >= 0); if (np[1] - np[0] === 1 || (np[0] === 0 && np[1] === c.length - 1)) tells[L]++; }
    }
    for (const L of LAYOUTS) {
      ok(tells[L] === 0, `node sweep ${FACE[L].id}: ${tells[L]} position tells in ${SEEDS} seeds`);
      ok(neutral[L] === 0, `node sweep ${FACE[L].id}: ${neutral[L]} seeds draw differently per locale (the seed must carry no locale)`);
      ok(pages[L].size >= Math.min(SEEDS, 20), `node sweep ${FACE[L].id}: only ${pages[L].size} distinct pages in ${SEEDS} seeds`);
    }
    console.log(`faces node sweep ${SEEDS} seeds: tells ${JSON.stringify(tells)} locale-draw diffs ${JSON.stringify(neutral)} distinct ${JSON.stringify(Object.fromEntries(LAYOUTS.map((L) => [FACE[L].id, pages[L].size])))}`);
  }

  // ---------------------------------------------------------------- D. renders
  const typeWith = (L, { block, loc, patch, cfg } = {}) => {
    const F = FACES[L];
    if (!block && !patch && !cfg) return F;
    return { ...F, build(o, ctx) { const d = { ...F.difficulty[o.difficulty], ...(cfg || {}) }; const r = F._buildWith(block || en, d, { locale: loc || o.locale }, ctx); if (patch) { const h = patch(r.bodyHtml); if (h === r.bodyHtml) throw new Error('poison needle changed nothing'); r.bodyHtml = h; } return r; } };
  };
  const render = async (L, name, opts = {}) => {
    const out = await renderInstance({ type: opts.type || FACES[L], theme: null, difficulty: 2, locale: opts.locale || 'en', page, outDir: OUT, baseName: `G1-378-gate-face-${name}`, strings: opts.strings, seedEpoch: opts.seedEpoch });
    const m = await page.evaluate((rules) => {
      const root = document.querySelector('[data-ws-content][data-lcs-type="G1-378"]');
      const b = document.querySelector('.ws-body').getBoundingClientRect();
      const ins = document.querySelector('.ws-instruction');
      const text = ins ? ins.textContent.replace(/\s+/g, ' ').trim() : '';
      const app = [];
      for (const [src, flags, sel] of rules) { const re = new RegExp(src, flags); if (re.test(text) && !(root && root.querySelector(sel))) app.push(`the instruction names "${text.match(re)[0]}" but the page draws no ${sel}`); }
      return { body: b.height, bottom: root ? +root.dataset.lcsContentBottom : NaN, app };
    }, APPARATUS_EN.map(([re, sel]) => [re.source, re.flags, sel]));
    const fillF = [];
    if (opts.fill !== false && m.body >= 760 && !(m.bottom / m.body >= FILL_MIN)) fillF.push(`FILL — the content ends at ${(100 * m.bottom / m.body).toFixed(0)} % of the ${m.body.toFixed(0)} px body (< ${FILL_MIN * 100} %)`);
    return { verify: out.qa.verify, lints: out.qa.lints, html: out.html, png: out.pngPath, m, fillF, all: [...out.qa.verify.map((x) => 'verify: ' + x), ...out.qa.lints.map((x) => 'lint: ' + JSON.stringify(x)), ...m.app, ...fillF] };
  };
  /** Rasterise every moon on a page (the drawing, never the stamp) — ±0.03 lit/disc + the lit side for the page's hemisphere. */
  const moonRaster = async (html, hemi, tag) => {
    const f = [];
    let maxErr = 0;
    const svgs = [...html.matchAll(/<svg style="[^"]*"\s+xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="([\d.]+)"[^>]*data-lcs-prim="moon-phase"[\s\S]*?<\/svg>/g)];
    for (const [i, mm] of svgs.entries()) {
      const svg = mm[0].replace(/^<svg style="[^"]*"\s+/, '<svg ');
      const phase = +/data-lcs-phase="(\d)"/.exec(svg)[1];
      const c = await checkMoon(svg, { phase, hemi, d: +mm[1] }, `${tag} moon ${i + 1}`);
      f.push(...c.f);
      // the task's ±0.001: the RASTERISED lit fraction (inside the rim, 4 px per paper px) against the gate's own geometric model
      const err = Math.abs(c.m.frac - expFracIn(phase));
      maxErr = Math.max(maxErr, err);
      if (err > 0.001) f.push(`${tag} moon ${i + 1}: rasterised lit fraction ${c.m.frac.toFixed(4)} vs the model ${expFracIn(phase).toFixed(4)} (±0.001) at phase ${phase}`);
    }
    return { f, n: svgs.length, maxErr };
  };
  const pngs = [];
  for (const L of LAYOUTS) {
    const id = FACE[L].id;
    const r = await render(L, `${id}-d2`);
    pngs.push(r.png);
    ok(r.all.length === 0, `${id} d2 en: ${JSON.stringify(r.all.slice(0, 4))}`);
    const worst = [];
    for (const k of ['de', 'fi']) {
      // the chrome fixtures render on the locale's own page size (A4), exactly as the base gate does
      const w = await render(L, `${id}-d2-${k}chrome`, { strings: LONG[k], locale: k, type: typeWith(L, { block: synth(k), loc: k }) });
      ok(w.all.length === 0, `${id} ${k} chrome (${w.m.body.toFixed(0)}): ${JSON.stringify(w.all.slice(0, 4))}`);
      ok(w.m.body <= LONG[k].body + 0.6, `${id} ${k} chrome: body ${w.m.body.toFixed(0)} did not squeeze to <= ${LONG[k].body}`);
      worst.push(`${k} body ${w.m.body.toFixed(0)} fill ${(100 * w.m.bottom / w.m.body).toFixed(0)} %`);
    }
    let extra = '';
    if (L.startsWith('moon')) {
      const mr = await moonRaster(r.html, 'N', `${id} en`);
      ok(mr.f.length === 0 && mr.n > 0, `${id} en moon raster (${mr.n}): ${mr.f.slice(0, 3).join('; ')}`);
      const p = await render(L, `${id}-d2-pt`, { type: typeWith(L, { block: synth('pt'), loc: 'pt' }), locale: 'pt' });
      ok(p.all.length === 0, `${id} pt: ${JSON.stringify(p.all.slice(0, 4))}`);
      const pr = await moonRaster(p.html, 'S', `${id} pt`);
      ok(pr.f.length === 0 && pr.n > 0, `${id} pt moon raster (${pr.n}): ${pr.f.slice(0, 3).join('; ')}`);
      const waxL = [...p.html.matchAll(/data-lcs-phase="([123])" data-lcs-lit="[\d.]+" data-lcs-litside="(\w+)"/g)].filter((x) => x[2] !== 'left');
      ok(waxL.length === 0, `${id} pt: a waxing moon not lit LEFT`);
      pngs.push(p.png);
      extra = ` · moons rasterised en ${mr.n} / pt ${pr.n}, max lit error ${Math.max(mr.maxErr, pr.maxErr).toFixed(4)} (pt waxing lit LEFT)`;
    }
    if (L === 'day-and-night-model') {
      const esvg = (/<svg style="[^"]*"\s+(xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="[\d.]+" height="[\d.]+"[^>]*data-lcs-prim="earth-top"[\s\S]*?<\/svg>)/.exec(r.html) || [])[1];
      const ef = esvg ? (await checkEarthTop('<svg ' + esvg, `${id} Earth`)).filter((x) => !/spin arc|arrowhead/.test(x)) : ['no Earth svg'];
      ok(ef.length === 0, `${id} Earth pins on the pixels: ${ef.join('; ')}`);
      ok(!!esvg && /data-lcs-spin="ring"/.test(esvg) && /A [\d.]+ [\d.]+ 0 1 0 [\d.-]+ [\d.-]+" [^>]*data-lcs-part="spin"/.test(esvg), `${id}: the spin is not a counter-clockwise ring (sweep 0) — the under-pole arc read as a smile`);
      const R = +(/data-lcs-prim="sun-edge"[^>]*data-lcs-r="([\d.]+)"/.exec(r.html) || /data-lcs-r="([\d.]+)"[^>]*data-lcs-prim="sun-edge"/.exec(r.html) || [])[1];
      ok(R > 150, `${id}: the Sun edge R ${R} is not larger than the Earth`);
      extra = ` · pins on the pixels ±5° clean`;
    }
    if (L === 'planets-in-order') {
      const gl = {};
      for (const mm of r.html.matchAll(/<svg style="[^"]*"\s+(xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="[\d.]+"[^>]*data-lcs-planet="(\w+)"[\s\S]*?<\/svg>)/g)) gl[mm[2]] = '<svg ' + mm[1];
      ok(Object.keys(gl).length === 8, `${id}: ${Object.keys(gl).length} bank glyphs`);
      const cs = await checkSet(gl, `${id} bank`);
      ok(cs.f.length === 0, `${id} bank glyphs: ${cs.f.slice(0, 3).join('; ')}`);
      const ans = [...r.html.matchAll(/data-lcs-slot="(\d)" data-lcs-answer="(\w+)"/g)].map((x) => x[2]);
      ok(ans.join() === ORDER_FROM_SUN.join(), `${id}: the slot answers ${ans.join()} ≠ the order from the Sun`);
      extra = ' · 8 bank glyphs uniform + pairwise distinct in greyscale · slot answers = the order from the Sun';
    }
    const seen = new Set();
    const n = quick ? 3 : 8;
    for (let s = 2; s <= n + 1; s++) {
      const q = await render(L, `${id}-sweep-${s}`, { seedEpoch: s });
      ok(q.all.length === 0, `${id} sweep seed ${s}: ${JSON.stringify(q.all.slice(0, 3))}`);
      seen.add(q.html.replace(/data-lcs-cfg="[^"]*"/, ''));
    }
    ok(seen.size === n, `${id} sweep: ${seen.size} distinct pages of ${n}`);
    console.log(`face ${id} (${L}): d2 body ${r.m.body.toFixed(0)} fill ${(100 * r.m.bottom / r.m.body).toFixed(0)} % verify ${r.verify.length} lints ${r.lints.length} apparatus ${r.m.app.length} · ${worst.join(' · ')}${extra} · sweep ${seen.size}/${n} distinct`);
  }

  // ---------------------------------------------------------------- E. poisons (the untouched faces above are the controls)
  const fp = async (name, L, opts, re) => judge(name, (await render(L, 'poison-' + name.split(' ')[0], { ...opts, type: typeWith(L, opts) })).all, re);
  await fp('PR3 F1 grow rail in sorted order', 'moon-phases-in-order', { cfg: { poison: { sortedRail: true } } }, /answer sequence 12345 is sorted/);
  await fp('PR4 a moon inside the growCue', 'moon-phases-in-order', { cfg: { poison: { moonInCue: true } } }, /extreme printed/);
  await fp('PR13 answerBox for blankNumeralBox on F1', 'moon-phases-in-order', { cfg: { poison: { answerBox: true } } }, /data-lcs-answer="undefined"/);
  await fp('PR1f F1 pt rail drawn N', 'moon-phases-in-order', { block: synth('en'), loc: 'pt', locale: 'pt' }, /hemisphere stamp N in pt|lit side right ≠ left/);
  await fp('PL a tampered lit stamp (0.146 -> 0.148)', 'moon-phases-in-order', { patch: (h) => h.replace('data-lcs-lit="0.146"', 'data-lcs-lit="0.148"') }, /lit fraction stamp 0\.148 ≠ 0\.1464 \(±0\.001\)/);
  {
    // PM a terminator 1.5 units too wide on a crescent: lit moves ~0.02 — inside the ±0.03 shape check, outside ±0.001
    const F = FACES['moon-phases-in-order'];
    const h = F._buildWith(en, F.difficulty[2], { locale: 'en' }, { rng: makeRng('pm') }).bodyHtml;
    const bad = h.replace(/A 32\.53 46 0 0 0 0 -46 Z/, 'A 34 46 0 0 0 0 -46 Z');
    ok(bad !== h, 'PM needle changed nothing');
    const ctl = await moonRaster(h, 'N', 'PM control');
    ok(ctl.f.length === 0, `PM control: ${ctl.f.slice(0, 2).join('; ')}`);
    judge('PM a crescent terminator 1.5 units wide (lit ±0.001)', (await moonRaster(bad, 'N', 'PM')).f, /rasterised lit fraction .* \(±0\.001\) at phase 1/);
  }
  await fp('PR5 F2 with a phase-1 card', 'moon-phase-names', { cfg: { poison: { cards: [0, 2, 4, 6, 0, 1, 4, 6] } } }, /multiset/);
  await fp('PT2 F2 cards stacked (identical above)', 'moon-phase-names', { cfg: { poison: { cards: [0, 2, 0, 2, 4, 6, 4, 6] } } }, /one above the other/);
  {
    let m = null; try { FACES['day-and-night-model']._buildWith(en, { ...FACES['day-and-night-model'].difficulty[2], poison: { pinAngle: 80 } }, { locale: 'en' }, { rng: makeRng('pr6') }); } catch (e) { m = e.message; }
    judge('PR6 F3 pin at angle 80 (primitive)', m ? [m] : [], /within 40° of the day\/night line/);
  }
  await fp('PR7 F3 night half shaded', 'day-and-night-model', { cfg: { poison: { shade: true } } }, /answer printed — a night half/);
  await fp('PR8 F4 orbit disc 6 with a ring', 'planets-in-order', { patch: (h) => h.replace(/(data-lcs-slot="6"><circle [^>]*\/>)/, '$1<ellipse cx="18" cy="18" rx="20" ry="4" fill="none" stroke="#8A8276" stroke-width="2"/>') }, /slot discs not identical/);
  await fp('PR9 F4 bank = the answer order', 'planets-in-order', { cfg: { poison: { bank: M.PLANETS.slice() } } }, /answer order \/ its reverse \(tell\)/);
  {
    const glyphsOf = (html) => { const gl = {}; for (const mm of html.matchAll(/<svg style="[^"]*"\s+(xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="[\d.]+"[^>]*data-lcs-planet="(\w+)"[\s\S]*?<\/svg>)/g)) gl[mm[2]] = '<svg ' + mm[1]; return gl; };
    const F = FACES['planets-in-order'];
    const h = F._buildWith(en, F.difficulty[2], { locale: 'en' }, { rng: makeRng('pr10') }).bodyHtml;
    const bad = h.replace(/(data-lcs-planet="jupiter"[\s\S]*?<circle cx="50" cy="50" r=")30(" fill="#[0-9A-F]{6}" data-lcs-part="disc")/, '$136$2');
    ok(bad !== h, 'PR10 needle changed nothing');
    ok((await checkSet(glyphsOf(h), 'PR10 control')).f.length === 0, 'PR10 control (the untouched F4 bank) is not clean');
    judge('PR10 F4 Jupiter glyph at honest r 36', (await checkSet(glyphsOf(bad), 'PR10')).f, /glyph radii not uniform — jupiter/);
  }
  await fp('PX4 F4 slot answers swapped (order data)', 'planets-in-order', { patch: (h) => h.replace('data-lcs-slot="3" data-lcs-answer="earth"', 'data-lcs-slot="3" data-lcs-answer="mars"').replace('data-lcs-slot="4" data-lcs-answer="mars"', 'data-lcs-slot="4" data-lcs-answer="earth"') }, /≠ earth \(the fixed order from the Sun\)|≠ mars \(the fixed order/);
  await fp('PK4 a planet glyph inside the answer fan', 'planets-in-order', { patch: (h) => h.replace(/(<g data-lcs-slot="5")/, `${require('../primitives/planets.js').planetGlyph({ id: 'saturn', box: 64 }).svg.replace(/^<svg /, '<svg x="200" y="300" ')}$1`) }, /a planet drawing inside the answer fan/);
  await fp('PR11 F5 bins with 4/4/2 lines', 'planet-sizes', { cfg: { poison: { lines: [4, 4, 2] } } }, /count printed/);
  await fp('PK5 a planet glyph on the size face', 'planet-sizes', { patch: (h) => h.replace('<div class="es-bins"', `${require('../primitives/planets.js').planetGlyph({ id: 'jupiter', box: 64 }).svg}<div class="es-bins"`) }, /a planet drawing on the size face/);
  await fp('PT5 F5 Sun and Moon side by side', 'planet-sizes', { cfg: { poison: { bank: ['sun', 'moon', 'mercury', 'jupiter', 'venus', 'saturn', 'earth', 'uranus', 'mars', 'neptune'] } } }, /Sun and the Moon sit together/);
  for (const L of LAYOUTS) {
    await fp(`PS-${FACE[L].id} a 90 px gap in the stack (sparse)`, L, { patch: (h) => h.replace(/(class="es-face" style="[^"]*justify-content:flex-start;gap:)[^"]*"/, '$190px"') }, /SPARSE — \d+ px blank band/);
    await fp(`PO-${FACE[L].id} content pushed past the 677 body`, L, { strings: LONG.fi, locale: 'fi', block: synth('fi'), loc: 'fi', patch: (h) => h.replace('class="es-face" style="', 'class="es-face" style="padding-top:160px;box-sizing:border-box;') }, /runs \d+ px past the body/);
  }
  // under-fill = the pre-review FIXED stage: every lin() variable pinned to its 677 value, and a 1fr track / a space-between
  // column (which would stretch regardless) pinned to its content
  const mins = (h) => h.replace(/clamp\(([\d.]+)px, calc\([^)]*\), [\d.]+px\)/g, '$1px');
  const under = {
    'moon-phases-in-order': mins,
    'moon-phase-names': (h) => mins(h).replace(/(class="es-pgrid" style="[^"]*)flex:1 1 auto;/, '$1flex:0 0 auto;').replace(/minmax\(0,1fr\)/, '132px'),   // the design's fixed 132 px rows
    'day-and-night-model': mins,
    'planets-in-order': (h) => mins(h).replace(/--es-fh:[^;]*;/, '--es-fh:460px;'),
    'planet-sizes': (h) => mins(h).replace(/(class="es-bins" style="[^"]*)flex:1 1 auto;/, '$1flex:0 0 auto;').replace(/justify-content:space-between;/g, 'justify-content:flex-start;'),
  };
  for (const L of LAYOUTS) await fp(`PF-${FACE[L].id} the stage shrunk to its minimum (under-fill)`, L, { patch: under[L] }, /FILL — the content ends at \d+ %/);
  await fp('PA1 F1 instruction names lines + a table', 'moon-phases-in-order', { strings: { title: 'Moon Phases in Order', instruction: 'Write the names on the lines in the table.' } }, /the instruction names "(lines|table)"/);
  await fp('PA2 F3 instruction names the word bank', 'day-and-night-model', { strings: { title: 'Why Do We Have Day and Night?', instruction: 'Use the word bank to write day or night.' } }, /the instruction names "bank"/);
  log.push('  face controls: every untouched face render above is clean (verify, lints, FILL, apparatus)');
  return pngs;
}

module.exports = { faceSection, checkModel, ORDER_FROM_SUN, FACE };
