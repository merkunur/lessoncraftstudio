/**
 * G1-377 — Butterfly Life Cycle: the Field-Guide Plate (nt10-E, b5; family key
 * `animal-life-cycles`, G1, science, no CCSS — `teaches` "Animal life cycles (science
 * readiness)"; en prose names NGSS 3-LS1-1 as the Grade 3 standard this is readiness for).
 * Design: docs/worksheet-gen/b5-designs/G1-377-animal-life-cycles.md §2 / §5; rulings
 * _work/G1-377-critic.md; build record _work/G1-377-build.md.
 *
 * One flowering host plant stands in the middle of the page and the whole life of the
 * butterfly happens ON it at real scale: a speck of an egg, a small caterpillar, a chrysalis
 * hanging under a leaf, a butterfly on the flower, each ringed coral. A thin teal tether runs
 * from each ring to a big magnifier LENS in a page corner that shows that stage magnified
 * (primitives/life-stage.js). The egg's box is printed 1; the child writes 2, 3, 4 by the
 * other lenses, then — below a dashed rule — the number of the picture that comes AFTER the
 * butterfly (the egg, 1). A child who thinks life is a line writes 5; the loop box is binary.
 *
 * THEME axis OFF, no unitAxis, no library picture, NO word in the body (numerals + drawings).
 * build() reads ONLY its bank: the locale block through lib/b5-common.js bank() (a missing
 * block THROWS — refusal, never an en fallback) and the locale-neutral ALC facts of the same
 * module. Never image-vocabulary.js at render.
 *
 * Ladder (a CONFIG; every guard keys on the RESOLVED keys, never the level index):
 *   d1  anchors egg + adult (1 and 4 printed) · no loop row · lens 144 / box 60     (warm-up; not shipped)
 *   d2  anchors egg · loop row · lens 132 / box 56 / loop lens 104                  (ships)
 *   d3  no anchor · loop row · lens 124 / box 52 / loop lens 96                    (scaffold; not shipped)
 *
 * COMPOSER (locale-neutral — the seed carries no locale): arrangement =
 * ALC.ARRANGEMENTS[rng.int(0, 3)] — the four of the 24 corner placements that pass BOTH tell
 * tests (no linear reading order and no corner walk from the egg reads the cycle; the adult in
 * a top lens). Nothing else is random.
 *
 * Stack (design): plate 528 + dashed rule 18 + loop row 116 = 662 <= 677 (the 4-line fi title)
 * <= 722; the root is a TOP-anchored column: slack falls below the loop row, never between blocks (the nt10-E SPARSE ruling; the design said space-evenly).
 *
 * verify(page) re-derives every answer from the RENDER + the stamps: four lenses, four
 * distinct stages === the biology; rank = biology index + 1 === the box's hidden answer; the
 * given boxes are exactly the configured anchors and print their rank, every other box empty;
 * the loop box present iff configured and expects the successor of the adult ((n-1+1) mod n);
 * the placement read off the rendered lens centres is tell-free (none of the 8 linear reading
 * orders, neither corner walk from the egg reads 1-2-3-4, the adult in a top lens) and in the
 * frozen list; every tether starts on its lens ring and ends on its own spot ring (<= 2 px),
 * crosses no other tether, no other lens, not the stem; spot rings pairwise >= 30 px apart;
 * no text in the body but the given numerals; no <img>; the G1 floors.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const C5 = require('../../templates/components-b5.js');
const { ALC } = require('../../data/b5/animal-life-cycles.js');

const ID = 'G1-377';
const KEY = 'animal-life-cycles';
const G1_FLOOR = 44;
const NUMERAL_FLOOR = 26;

function literal(v, what, loc) {
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: ${loc} ${what} is missing (refuse — never a vocab / en fallback)`);
  if (v !== v.trim()) throw new Error(`${ID}: ${loc} ${what} "${v}" is not trimmed`);
  if (/[{}]/.test(v)) throw new Error(`${ID}: ${loc} ${what} "${v}" carries a slot`);
  return v;
}
/** §5 helper contract — each THROWS on a missing literal, never falls back to the vocab. */
function stageWord(block, animal, stage, loc) { return literal(block && block.stageWords && block.stageWords[animal] && block.stageWords[animal][stage], `stageWords.${animal}.${stage}`, loc); }
function statement(block, id, loc) { return literal(block && block.statements && block.statements[id], `statements.${id}`, loc); }
function decoyWord(block, loc) { return literal(block && block.decoy && block.decoy['frog.tadpole'], 'decoy.frog.tadpole', loc); }
function successor(animal, stage) { const s = ALC.STAGES[animal]; const i = s.indexOf(stage); if (i < 0) throw new Error(`${ID}: ${animal} has no stage ${stage}`); return s[(i + 1) % s.length]; }
function statementPool(block, cls) {
  const drop = new Set((block && block.drop) || []);
  return ALC.COMPARE.filter((c) => !drop.has(c.id) && (cls === 'both' ? c.truth.length === 2 : c.truth.length === 1 && c.truth[0] === cls));
}
function stringsFor(block, id, loc) {
  const s = block && block.strings && block.strings[id];
  if (!s) throw new Error(`${ID}: the ${loc} bank has no strings.${id} — refuse`);
  literal(s.title, `strings.${id}.title`, loc); literal(s.instruction, `strings.${id}.instruction`, loc);
  return s;
}

const TYPE = {
  id: ID,
  slug: 'butterfly-life-cycle',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { animal: 'butterfly', anchors: ['egg', 'adult'], loop: false, lensD: 144, boxPx: 60, loopLensD: null, givenPx: 32 },
    2: { animal: 'butterfly', anchors: ['egg'], loop: true, lensD: 132, boxPx: 56, loopLensD: 104, givenPx: 32 },
    3: { animal: 'butterfly', anchors: [], loop: true, lensD: 124, boxPx: 52, loopLensD: 96, givenPx: 32 },
  },
  i18n: {
    en: {
      title: 'Butterfly Life Cycle',
      instruction: 'The egg is 1: write 2, 3 and 4 in the boxes as it grows, and in the last box the number of the picture that comes after the butterfly.',
    },
  },
  stageWord, statement, decoyWord, successor, statementPool, stringsFor,

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam). */
  _buildWith(block, d, { locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    if (!block || typeof block !== 'object') throw new Error(`${ID}: no ${loc} bank block`);
    if (!d || typeof d !== 'object') throw new Error(`${ID}: no difficulty config`);
    if (d.layout !== undefined) return this._buildFace(block, d, loc, ctx);   // Phase E faces; the base path below is untouched
    stringsFor(block, ID, loc);
    if ((block.refuse || []).includes('base')) throw new Error(`${ID}: the ${loc} panel refused the base`);
    const stages = ALC.STAGES[d.animal];
    if (!stages) throw new Error(`${ID}: unknown animal ${d.animal}`);
    if (stages.length !== 4) throw new Error(`${ID}: the plate draws a 4-stage cycle; ${d.animal} has ${stages.length}`);
    for (const a of d.anchors) if (!stages.includes(a)) throw new Error(`${ID}: anchor ${a} is not a ${d.animal} stage`);
    if (!(d.lensD >= 90 && d.lensD >= G1_FLOOR)) throw new Error(`${ID}: lens ${d.lensD} under the floor`);
    if (!(d.boxPx >= G1_FLOOR)) throw new Error(`${ID}: box ${d.boxPx} < the G1 floor ${G1_FLOOR}`);
    if (!(d.givenPx >= NUMERAL_FLOOR)) throw new Error(`${ID}: given numeral ${d.givenPx} px < ${NUMERAL_FLOOR}`);
    if (d.loop && !(d.loopLensD >= 90)) throw new Error(`${ID}: loop lens ${d.loopLensD} < 90`);
    const rng = ctx.rng;
    const pick = ALC.ARRANGEMENTS[rng.int(0, ALC.ARRANGEMENTS.length - 1)];
    const arrangement = d.forceArrangement || pick;   // forceArrangement: the gate's poison seam only (verify must catch a bad one)
    const loopAnswer = stages.indexOf(successor(d.animal, stages[stages.length - 1])) + 1;
    const cfg = { animal: d.animal, anchors: d.anchors, loop: !!d.loop, lensD: d.lensD, boxPx: d.boxPx, loopLensD: d.loopLensD, givenPx: d.givenPx };
    const parts = [C5.lifePlate({ arrangement, anchors: d.anchors, lensD: d.lensD, boxPx: d.boxPx, givenPx: d.givenPx, animal: d.animal, stages })];
    if (d.loop) {
      parts.push(`<div data-lcs-rule style="width:639px;height:18px;flex:0 0 18px;display:flex;align-items:center"><div style="width:100%;border-top:2px dashed #C8BFAE"></div></div>`);
      parts.push(C5.loopRow({ animal: d.animal, lensD: d.loopLensD, boxPx: d.boxPx, answer: loopAnswer }));
    }
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-family="${KEY}" data-lcs-cfg='${JSON.stringify(cfg)}' ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:0;min-height:0">${parts.join('')}</div>`;
    return { bodyHtml, meta: { arrangement: arrangement.id || 'X', placement: { TL: arrangement.TL, TR: arrangement.TR, BL: arrangement.BL, BR: arrangement.BR }, loopAnswer, cfg } };
  },

  /* ================================================================ Phase E faces (design §3) */
  /**
   * ONE additive `layout` knob (d.layout undefined = the base path above, byte-identical). Every
   * guard keys on the RESOLVED config, never the level index. The root keeps the family marker
   * data-lcs-type="G1-377" and adds data-lcs-face / data-lcs-layout (stamped only on a face).
   *   frog-cut-paste  F1 G1-389  order a gradual change with the hands: 5 pads round a pond, the frogspawn given, 4 square tiles to cut + glue
   *   label           F2 G2-365  name each stage: the complete loop in order, an empty lane under each lens, bank = 4 words + 1 decoy
   *   metamorphosis   F3 G2-366  classify 8 lettered young stages into 3 bins crowned by the adult
   *   compare         F4 G3-393  tick butterfly / frog / both for 8 animal-free statements
   *   next            F5 G1-390  circle the stage that comes right after (2 rows ask what follows an ADULT)
   * Tell rules (per PAGE, on whatever seed is drawn — the seed carries no locale): F1 strip order a
   * derangement of the pad order and not its reverse; F2 bank order neither the loop nor its reverse,
   * the decoy neither first nor last; F3 strip not grouped, <= 1 adjacent same-animal pair, frog cards
   * not all on odd / all on even positions; F4 class sequence not constant / grouped / alternating /
   * a period-3 staircase, no run of 3; F5 the correct slot uses each slot rows/3 times, not constant,
   * not monotone, not a cyclic staircase, no two consecutive rows of one animal. The `force*` keys
   * are the gate's poison seams only (verify must catch a bad one).
   */
  _buildFace(block, d, loc, ctx) {
    if (!ALC.FACES.includes(d.layout)) throw new Error(`${ID}: unknown layout "${d.layout}"`);
    const faceId = ALC.FACE_IDS[d.layout], band = ALC.FACE_BAND[d.layout];
    if (this.id !== faceId) throw new Error(`${ID}: spec ${this.id} carries layout ${d.layout} — that face is ${faceId}`);
    stringsFor(block, faceId, loc);
    if ((block.refuse || []).some((x) => x === d.layout || x === faceId)) throw new Error(`${ID}: the ${loc} panel refused ${faceId} (${d.layout})`);
    if (!ctx || !ctx.rng) throw new Error(`${ID}: no rng in ctx`);
    const spawnForm = block.spawnForm === undefined ? 'clump' : block.spawnForm;
    if (!['clump', 'string'].includes(spawnForm)) throw new Error(`${ID}: ${loc} spawnForm "${spawnForm}"`);
    const fn = { 'frog-cut-paste': '_facePond', label: '_faceLabel', metamorphosis: '_faceSort', compare: '_faceCompare', next: '_faceNext' }[d.layout];
    const r = this[fn](block, d, loc, ctx.rng, spawnForm);
    const cfg = { layout: d.layout, face: faceId, band, ...r.cfg };
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-family="${KEY}" data-lcs-face="${faceId}" data-lcs-layout="${d.layout}" data-lcs-cfg='${JSON.stringify(cfg)}' ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:${r.gap}px;min-height:0${r.rootCss || ''}">${r.parts.join('')}</div>`;
    return { bodyHtml, meta: { layout: d.layout, face: faceId, ...r.meta, cfg } };
  },
  /** rejection-sample `draw()` until `legal(x)`; a config that cannot be satisfied THROWS (never a tell page). */
  _drawLegal(rng, draw, legal, what) {
    for (let i = 0; i < 2000; i++) { const x = draw(); if (legal(x)) return x; }
    throw new Error(`${ID}: no tell-free ${what} in 2000 draws`);
  },
  _floor(v, min, what) { if (!(typeof v === 'number' && v >= min)) throw new Error(`${ID}: ${what} ${v} < ${min}`); return v; },

  _facePond(block, d, loc, rng, spawnForm) {
    const bio = ALC.STAGES[d.animal];
    if (!bio) throw new Error(`${ID}: unknown animal ${d.animal}`);
    if (!Array.isArray(d.stages) || d.stages.length < 4) throw new Error(`${ID}: F1 needs >= 4 stages`);
    let last = -1;
    for (const s of d.stages) { const i = bio.indexOf(s); if (i <= last) throw new Error(`${ID}: F1 stages [${d.stages}] are not in the ${d.animal}'s biological order`); last = i; }
    if (!Array.isArray(d.anchors) || !d.anchors.length || d.anchors.some((a) => !d.stages.includes(a))) throw new Error(`${ID}: F1 anchors [${d.anchors}] must be pad stages`);
    this._floor(d.padLens, 90, 'F1 pad lens'); this._floor(d.tileLens, 90, 'F1 tile lens'); this._floor(d.cell, d.tileLens + 8, 'F1 cell');
    this._floor(d.ghost, d.cell + 12, 'F1 ghost (>= cell + 12)'); this._floor(d.padR, d.padLens / 2 + 8, 'F1 pad r'); this._floor(d.ringMax, 500, 'F1 ring max height');
    const tiles = d.stages.filter((s) => !d.anchors.includes(s));
    const legal = (o) => o.length === tiles.length && o.every((s, i) => s !== tiles[i]) && o.join() !== tiles.slice().reverse().join();
    const order = d.forceTiles || this._drawLegal(rng, () => rng.shuffle(tiles), legal, 'F1 strip');
    const parts = [
      C5.lifePondRing({ animal: d.animal, stages: d.stages, anchors: d.anchors, padR: d.padR, ghost: d.ghost, padLens: d.padLens, spawnForm, maxH: d.ringMax }),
      C5.lifeCutStrip({ animal: d.animal, tiles: order, cell: d.cell, tileLens: d.tileLens, spawnForm }),
    ];
    return { parts, gap: 16, cfg: { animal: d.animal, stages: d.stages, anchors: d.anchors, padR: d.padR, ghost: d.ghost, cell: d.cell, tileLens: d.tileLens, padLens: d.padLens, ringMax: d.ringMax }, meta: { tiles: order } };
  },

  _faceLabel(block, d, loc, rng) {
    const stages = ALC.STAGES[d.animal];
    if (!stages || stages.length !== 4) throw new Error(`${ID}: F2 labels a 4-stage loop`);
    this._floor(d.lensD, 90, 'F2 lens'); this._floor(d.lane && d.lane[1], 36, 'F2 lane height'); this._floor(d.glyphH, 26, 'F2 glyph'); this._floor(d.wordPx, 18, 'F2 bank word px'); this._floor(d.lensMax, d.lensD, 'F2 lens max'); this._floor(d.loopMax, 2 * d.lensD + 2 * (8 + d.lane[1]) + 52, 'F2 loop max');
    const words = stages.map((s) => ({ key: s, text: stageWord(block, d.animal, s, loc) }));
    if (d.decoy) {
      const [a, s] = String(d.decoy).split('.');
      if (a === d.animal || !ALC.STAGES[a] || !ALC.STAGES[a].includes(s)) throw new Error(`${ID}: F2 decoy ${d.decoy} is not a stage of ANOTHER animal`);
      if (d.decoy !== 'frog.tadpole') throw new Error(`${ID}: the bank carries only the frog.tadpole decoy literal`);
      const t = decoyWord(block, loc);
      if (words.some((w) => w.text.normalize('NFC').toLocaleLowerCase(loc) === t.normalize('NFC').toLocaleLowerCase(loc))) throw new Error(`${ID}: ${loc} decoy "${t}" is a stage word`);
      words.push({ key: d.decoy, text: t, decoy: true });
    }
    const loopKeys = stages.join(), revKeys = stages.slice().reverse().join();
    const legal = (o) => { const st = o.filter((w) => !w.decoy).map((w) => w.key).join(); const di = o.findIndex((w) => w.decoy); return st !== loopKeys && st !== revKeys && (!d.decoy || (di > 0 && di < o.length - 1)); };
    const order = d.forceBank ? d.forceBank.map((k) => words.find((w) => w.key === k)) : this._drawLegal(rng, () => rng.shuffle(words), legal, 'F2 bank');
    const parts = [];
    if (d.bank !== false) parts.push(C5.lifeWordBank({ words: order, wordPx: d.wordPx }));
    parts.push(C5.lifeLabelLoop({ animal: d.animal, stages, lensD: d.lensD, lensMax: d.lensMax, lane: d.lane, glyphH: d.glyphH, maxH: d.loopMax }));
    return { parts, gap: 0, cfg: { animal: d.animal, decoy: d.decoy || null, bank: d.bank !== false, lensD: d.lensD, lensMax: d.lensMax, lane: d.lane, glyphH: d.glyphH, wordPx: d.wordPx }, meta: { bank: order.map((w) => w.key) } };
  },

  _faceSort(block, d, loc, rng, spawnForm) {
    const animals = d.animals;
    if (!Array.isArray(animals) || animals.length < 2 || animals.some((a) => !ALC.STAGES[a])) throw new Error(`${ID}: F3 animals [${animals}]`);
    for (const c of d.cards) {
      const [a, s] = c.split('.');
      if (ALC.SORT_EXCLUDE.includes(c)) throw new Error(`${ID}: F3 card ${c} is in SORT_EXCLUDE (two eggs on leaves are a drawing test)`);
      if (!animals.includes(a) || !ALC.YOUNG.includes(c) || s === 'adult') throw new Error(`${ID}: F3 card ${c} is not a young stage of a binned animal`);
    }
    if (new Set(d.cards).size !== d.cards.length) throw new Error(`${ID}: F3 cards repeat`);
    this._floor(d.lensD, 100, 'F3 young lens'); this._floor(d.adultD, 90, 'F3 adult lens'); this._floor(d.box, 36, 'F3 box'); this._floor(d.lensMax, d.lensD, 'F3 lens max'); this._floor(d.adultMax, d.adultD, 'F3 adult max'); this._floor(d.boxMax, d.box, 'F3 box max'); this._floor(d.binsMax, d.adultD + 44 + 2 * d.box, 'F3 bins max');
    const animalOf = (c) => c.split('.')[0];
    const legal = (o) => { const seq = o.map(animalOf); let runs = 1, adj = 0; for (let i = 1; i < seq.length; i++) if (seq[i] === seq[i - 1]) adj++; else runs++; const fp = seq.map((a, i) => (a === 'frog' ? i % 2 : -1)).filter((x) => x >= 0); return runs > new Set(seq).size && adj <= 1 && new Set(fp).size !== 1; };
    const order = d.forceCards || this._drawLegal(rng, () => rng.shuffle(d.cards), legal, 'F3 strip');
    const letters = 'ABCDEFGHIJKL';
    const cards = order.map((c, i) => ({ animal: animalOf(c), stage: c.split('.')[1], letter: letters[i] }));
    const bins = animals.map((a) => ({ animal: a, cap: cards.filter((c) => c.animal === a).length, expect: cards.filter((c) => c.animal === a).map((c) => c.letter) }));
    if (bins.some((b) => !b.cap)) throw new Error(`${ID}: F3 an empty bin`);
    const parts = [C5.lifeYoungStrip({ cards, lensD: d.lensD, lensMax: d.lensMax, spawnForm }), C5.lifeAdultBins({ bins, adultD: d.adultD, adultMax: d.adultMax, box: d.box, boxMax: d.boxMax, maxH: d.binsMax })];
    // FILL: the root is a size container so the young lenses can grow with the body (lifeYoungStrip)
    return { parts, gap: 30, rootCss: ';container-type:size', cfg: { animals, lensD: d.lensD, lensMax: d.lensMax, adultD: d.adultD, adultMax: d.adultMax, box: d.box, n: d.cards.length }, meta: { cards: order } };
  },

  _faceCompare(block, d, loc, rng) {
    const mix = d.mix || {};
    this._floor(d.tick, 36, 'F4 tick'); this._floor(d.textPx, 14, 'F4 text px'); this._floor(d.headD, 90, 'F4 head lens'); this._floor(d.rowMinH, 56, 'F4 row min (2 lines)');
    const n = (mix.both || 0) + (mix.butterfly || 0) + (mix.frog || 0);
    if (n !== d.rows) throw new Error(`${ID}: F4 mix sums to ${n} ≠ rows ${d.rows}`);
    let picked = [];
    for (const cls of ['both', 'butterfly', 'frog']) {
      const pool = statementPool(block, cls);
      if (pool.length < (mix[cls] || 0)) throw new Error(`${ID}: the ${loc} ${cls} pool holds ${pool.length} < ${mix[cls]} (refuse)`);
      picked = picked.concat(rng.sample(pool, mix[cls] || 0).map((c) => ({ ...c, cls })));
    }
    const clsTell = (s) => this._classTell(s);
    const order = d.forceStmts ? d.forceStmts.map((id) => { const c = ALC.COMPARE.find((x) => x.id === id); return { ...c, cls: c.truth.length === 2 ? 'both' : c.truth[0] }; })
      : this._drawLegal(rng, () => rng.shuffle(picked), (o) => !clsTell(o.map((x) => x.cls)), 'F4 class sequence');
    const rows = order.map((c) => ({ id: c.id, cls: c.cls, truth: c.truth, text: statement(block, c.id, loc) }));
    const parts = [C5.lifeCompareTable({ rows, headD: d.headD, tick: d.tick, rowMinH: d.rowMinH, textPx: d.textPx })];
    return { parts, gap: 0, cfg: { rows: d.rows, mix, headD: d.headD, tick: d.tick, rowMinH: d.rowMinH, textPx: d.textPx }, meta: { stmts: rows.map((r) => r.id), classes: rows.map((r) => r.cls) } };
  },
  /** A class-sequence tell (null = tell-free): constant, grouped into runs, a run of 3, strictly alternating, a staircase (>= 6 items stepping round the class cycle one way). */
  _classTell(seq) {
    const k = new Set(seq).size;
    if (k <= 1) return 'constant';
    let runs = 1, run = 1, maxRun = 1;
    for (let i = 1; i < seq.length; i++) { if (seq[i] === seq[i - 1]) run++; else { runs++; run = 1; } maxRun = Math.max(maxRun, run); }
    if (runs === k) return 'grouped';
    if (maxRun >= 3) return 'a run of 3';
    let alt = 1, altBest = 1;
    for (let i = 1; i < seq.length; i++) { alt = seq[i] !== seq[i - 1] && (i < 2 || alt < 2 || seq[i] === seq[i - 2]) ? alt + 1 : (seq[i] !== seq[i - 1] ? 2 : 1); altBest = Math.max(altBest, alt); }
    if (altBest >= 6) return 'alternating';
    // staircase: >= 6 consecutive items stepping round the class cycle in one direction (both > butterfly > frog > both …)
    const CY = ['both', 'butterfly', 'frog'];
    let st = 0, best = 0;
    for (let i = 1; i < seq.length; i++) { const d = (CY.indexOf(seq[i]) - CY.indexOf(seq[i - 1]) + 3) % 3; const pd = i > 1 ? (CY.indexOf(seq[i - 1]) - CY.indexOf(seq[i - 2]) + 3) % 3 : -1; st = d && d === pd ? st + 1 : (d ? 1 : 0); best = Math.max(best, st); }
    if (best >= 5) return 'staircase';
    return null;
  },

  _faceNext(block, d, loc, rng, spawnForm) {
    const animals = d.animals;
    if (!Array.isArray(animals) || animals.some((a) => !ALC.STAGES[a])) throw new Error(`${ID}: F5 animals [${animals}]`);
    if (d.rows !== animals.length * d.perAnimal) throw new Error(`${ID}: F5 rows ${d.rows} ≠ ${animals.length} x ${d.perAnimal}`);
    if (d.rows % 3) throw new Error(`${ID}: F5 rows must split evenly over the 3 slots`);
    if (!(d.wrap >= 1 && d.wrap <= animals.length) || !animals.includes('butterfly')) throw new Error(`${ID}: F5 wrap ${d.wrap} (one butterfly adult + others)`);
    this._floor(d.promptD, 100, 'F5 prompt lens'); this._floor(d.chipD, 90, 'F5 chip lens');
    const wrapAnimals = ['butterfly'].concat(rng.sample(animals.filter((a) => a !== 'butterfly'), d.wrap - 1));
    const rows = [];
    for (const a of animals) {
      const S = ALC.STAGES[a];
      const prompts = (wrapAnimals.includes(a) ? ['adult'] : []).concat(rng.sample(S.filter((s) => s !== 'adult'), d.perAnimal - (wrapAnimals.includes(a) ? 1 : 0)));
      for (const p of prompts) {
        const i = S.indexOf(p), succ = successor(a, p), pred = S[(i - 1 + S.length) % S.length];
        // the froglet and the frog differ by size + a tail stub: never both on one row when one of them is the answer
        const twin = ALC.LOOKALIKE[`${a}.${succ}`];
        const others = S.filter((s) => s !== p && s !== succ && s !== pred && `${a}.${s}` !== twin);
        const distract = S.length === 4 ? S.filter((s) => s !== p && s !== succ) : [pred, rng.pick(others)];
        if (distract.some((s) => `${a}.${s}` === twin)) throw new Error(`${ID}: F5 row ${a}.${p} would show ${twin} beside its look-alike answer`);
        rows.push({ animal: a, prompt: p, answer: succ, distract });
      }
    }
    const ord = this._drawLegal(rng, () => rng.shuffle(rows), (o) => o.every((r, i) => i === 0 || r.animal !== o[i - 1].animal), 'F5 row order');
    const slotLegal = (s) => { const up = s.every((x, i) => i === 0 || x >= s[i - 1]), dn = s.every((x, i) => i === 0 || x <= s[i - 1]); const cyc = [1, 2].some((st) => s.every((x, i) => i === 0 || x === (s[i - 1] + st) % 3)); return !up && !dn && !cyc && new Set(s).size === 3; };
    const slots = d.forceSlots || this._drawLegal(rng, () => rng.shuffle([].concat(...[0, 1, 2].map((x) => Array(d.rows / 3).fill(x)))), slotLegal, 'F5 correct-slot pattern');
    const out = ord.map((r, i) => { const dd = rng.shuffle(r.distract); const chips = []; let k = 0; for (let j = 0; j < 3; j++) chips.push(j === slots[i] ? r.answer : dd[k++]); return { animal: r.animal, prompt: r.prompt, answer: r.answer, chips }; });
    const parts = [C5.lifeNextRows({ rows: out, promptD: d.promptD, chipD: d.chipD, spawnForm })];
    return { parts, gap: 0, cfg: { animals, rows: d.rows, perAnimal: d.perAnimal, wrap: d.wrap, promptD: d.promptD, chipD: d.chipD }, meta: { rows: out.map((r) => `${r.animal}.${r.prompt}>${r.answer}`), slots } };
  },

  /** Face verify: re-derives every answer from the stamps + the render (page.evaluate: no require). */
  async _verifyFace(page) {
    return page.evaluate(({ ID, STAGES, YOUNG, SORT_EXCLUDE, COMPARE, LOOKALIKE }) => {
      const f = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) return ['no root'];
      let cfg; try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { return ['unreadable cfg']; }
      const layout = root.dataset.lcsLayout;
      const FLOOR = cfg.band === 'G1' ? 44 : 36;
      const R = (e) => e.getBoundingClientRect();
      const body = document.querySelector('.ws-body').getBoundingClientRect();
      const foot = document.querySelector('.ws-foot') ? document.querySelector('.ws-foot').getBoundingClientRect().top : Infinity;
      if (root.querySelector('img')) f.push('an <img> in the body');
      for (const e of root.children) { const r = R(e); if (r.left < body.left - 0.5 || r.right > body.right + 0.5) f.push('a block leaves the body column'); if (r.bottom > foot + 0.5) f.push('a block reaches the footer'); }
      if (R(root).top > body.top + 8) f.push('the stage floats (top-anchor it)');
      // every lens draws what its wrapper says
      for (const l of root.querySelectorAll('[data-lcs-lens]')) { const svg = l.querySelector('svg[data-lcs-prim="life-stage"]'); const [a, s] = (l.dataset.lcsStage || '').split('.'); if (!svg || svg.dataset.lcsFigure !== `life-${a}-${s}`) f.push(`lens ${l.dataset.lcsStage}: the drawing is ${svg ? svg.dataset.lcsFigure : 'missing'}`); if (!STAGES[a] || !STAGES[a].includes(s)) f.push(`lens ${l.dataset.lcsStage}: not a butterfly / frog / ladybird stage`); }
      const texts = (allow) => { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const t = n.textContent.trim(); if (t && !allow(n.parentElement)) f.push(`text in the body: "${t.slice(0, 30)}"`); } };
      const diam = (e) => R(e).width;
      const classTell = (seq) => { const k = new Set(seq).size; if (k <= 1) return 'constant'; let runs = 1, run = 1, mr = 1; for (let i = 1; i < seq.length; i++) { if (seq[i] === seq[i - 1]) run++; else { runs++; run = 1; } mr = Math.max(mr, run); } if (runs === k) return 'grouped'; if (mr >= 3) return 'a run of 3'; let alt = 1, altBest = 1; for (let i = 1; i < seq.length; i++) { alt = seq[i] !== seq[i - 1] && (i < 2 || alt < 2 || seq[i] === seq[i - 2]) ? alt + 1 : (seq[i] !== seq[i - 1] ? 2 : 1); altBest = Math.max(altBest, alt); } if (altBest >= 6) return 'alternating'; const CY = ['both', 'butterfly', 'frog']; let st = 0, best = 0; for (let i = 1; i < seq.length; i++) { const d = (CY.indexOf(seq[i]) - CY.indexOf(seq[i - 1]) + 3) % 3; const pd = i > 1 ? (CY.indexOf(seq[i - 1]) - CY.indexOf(seq[i - 2]) + 3) % 3 : -1; st = d && d === pd ? st + 1 : (d ? 1 : 0); best = Math.max(best, st); } if (best >= 5) return 'staircase'; return null; };

      if (layout === 'frog-cut-paste') {
        const bio = STAGES[cfg.animal];
        const pads = [...root.querySelectorAll('[data-lcs-pad]')];
        if (pads.length !== cfg.stages.length) f.push(`${pads.length} pads ≠ ${cfg.stages.length}`);
        const ring = root.querySelector('[data-lcs-pond-ring]').getBoundingClientRect();
        const P = pads.map((p) => ({ el: p, slot: +p.dataset.lcsSlot, expect: p.dataset.lcsExpect, x: +p.dataset.lcsCx, y: +p.dataset.lcsCy, r: +p.dataset.lcsR }));
        P.sort((a, b) => a.slot - b.slot);
        P.forEach((p, i) => { if (p.slot !== i + 1) f.push('pad slots are not 1..n'); if (p.expect !== cfg.stages[i]) f.push(`pad ${p.slot} expects ${p.expect} ≠ ${cfg.stages[i]}`); });
        if (ring.height < 500 - 0.5 || ring.height > cfg.ringMax + 0.5) f.push(`pond ring ${ring.height.toFixed(0)} px outside [500, ${cfg.ringMax}]`);
        let last = -1; for (const p of P) { const i = bio.indexOf(p.expect); if (i <= last) f.push(`pad ${p.slot} (${p.expect}) breaks the biological order`); last = i; }
        // clockwise from the top: angles about the pad centroid increase with the slot
        const mx = P.reduce((s, p) => s + p.x, 0) / P.length, my = P.reduce((s, p) => s + p.y, 0) / P.length;
        const ang = P.map((p) => { let a = Math.atan2(p.y - my, p.x - mx) * 180 / Math.PI + 90; while (a < -1) a += 360; return a; });
        if (!ang.every((a, i) => i === 0 || a > ang[i - 1])) f.push(`the pads do not run clockwise from the top [${ang.map((a) => a.toFixed(0))}]`);
        for (const p of P) {
          const r = R(p.el); if (Math.abs(r.left - ring.left + p.r - p.x) > 1 || Math.abs(r.top + r.height / 2 - ring.top - (+p.el.dataset.lcsFy) * ring.height) > 1 || Math.abs(r.width - 2 * p.r) > 0.6) f.push(`pad ${p.slot} stamp and box disagree`);
          const lensEl = p.el.querySelector('[data-lcs-lens]'), ghost = p.el.querySelector('[data-lcs-ghost]');
          if (cfg.anchors.includes(p.expect)) {
            if (!lensEl || lensEl.dataset.lcsStage !== `${cfg.animal}.${p.expect}`) f.push(`pad ${p.slot}: the given ${p.expect} is not drawn on it`);
            else if (Math.abs(diam(lensEl) - cfg.padLens) > 0.6) f.push(`pad ${p.slot} lens ${diam(lensEl)} ≠ ${cfg.padLens}`);
          } else {
            if (lensEl) f.push(`answer printed: pad ${p.slot} already shows ${lensEl.dataset.lcsStage}`);
            if (!ghost) f.push(`pad ${p.slot}: no ghost to glue on`);
            else { const g = R(ghost); if (ghost.children.length || ghost.textContent.trim()) f.push(`answer printed: pad ${p.slot}'s ghost is not empty`); if (g.width < cfg.cell + 12 - 0.6) f.push(`ghost ${g.width} < cell + 12`); if (Math.hypot(g.width, g.height) / 2 > p.r + 0.6) f.push(`pad ${p.slot}: the ghost leaves its pad`); }
          }
        }
        // the cycle closes: the return arc runs from the last pad back to pad 1
        const ret = root.querySelector('[data-lcs-arrow="return"]');
        const arrows = root.querySelectorAll('[data-lcs-arrow]');
        if (arrows.length !== P.length) f.push(`${arrows.length} arcs ≠ ${P.length} (one between every pair of pads, the last one closing the ring)`);
        if (!ret || ret.dataset.lcsTo !== '1' || +ret.dataset.lcsFrom !== P.length) f.push('cycle not closed: no return arc from the last pad to pad 1');
        else { const tip = ret.querySelector('[data-lcs-arrow-tip]').dataset.lcsArrowTip.split(',').map(Number); const dd = Math.hypot(tip[0] - P[0].x, tip[1] - P[0].y); if (dd < P[0].r || dd > P[0].r + 14) f.push(`cycle not closed: the return arc ends ${dd.toFixed(0)} px from pad 1`); }
        // the strip
        const strip = root.querySelector('[data-lcs-strip]');
        if (!strip || root.lastElementChild !== strip) f.push('the cut strip is not the last block');
        const tiles = [...root.querySelectorAll('[data-lcs-tile]')].map((t) => t.dataset.lcsTile);
        const want = cfg.stages.filter((s) => !cfg.anchors.includes(s));
        if (tiles.slice().sort().join() !== want.slice().sort().join()) f.push(`strip tiles [${tiles}] ≠ the open pads [${want}]`);
        if (tiles.some((s, i) => s === want[i])) f.push(`strip order [${tiles}] is not a derangement of the pad order (a tile sits in its own pad's place)`);
        if (tiles.join() === want.slice().reverse().join()) f.push('strip order is the pad order reversed');
        for (const t of root.querySelectorAll('[data-lcs-tile]')) { const r = R(t), l = t.querySelector('[data-lcs-lens]'); if (Math.abs(r.width - cfg.cell) > 0.6 || Math.abs(r.height - cfg.cell) > 0.6) f.push(`tile cell ${r.width}x${r.height} ≠ ${cfg.cell} square`); if (!l || diam(l) < Math.max(90, FLOOR) || Math.abs(diam(l) - cfg.tileLens) > 0.6) f.push('tile lens size'); if (l && l.dataset.lcsStage !== `${cfg.animal}.${t.dataset.lcsTile}`) f.push('tile stamp ≠ its drawing'); }
        const cut = root.querySelector('[data-lcs-cut] [data-lcs-cutlines]');
        if (!cut || cut.querySelectorAll('[data-lcs-cut-v]').length !== tiles.length - 1 || !cut.querySelector('[data-lcs-cut-frame]')) f.push('no cut lines round the tiles');
        if (!root.querySelector('[data-lcs-strip] [data-lcs-scissors]')) f.push('no scissors on the cut strip');
        if (strip) { const s = R(strip); for (const p of P) if (s.top < R(p.el).bottom - 0.5) f.push(`the strip overlaps pad ${p.slot}`); }
        texts(() => false);
        return f;
      }
      if (layout === 'label') {
        const bio = STAGES[cfg.animal];
        const lenses = [...root.querySelectorAll('[data-lcs-label-loop] [data-lcs-lens]')], lanes = [...root.querySelectorAll('[data-lcs-label]')];
        if (lenses.length !== 4 || lanes.length !== 4) f.push(`${lenses.length} lenses / ${lanes.length} lanes ≠ 4`);
        const cx = (e) => { const r = R(e); return [r.left + r.width / 2, r.top + r.height / 2]; };
        const all = lenses.map(cx), mX = all.reduce((s, p) => s + p[0], 0) / 4, mY = all.reduce((s, p) => s + p[1], 0) / 4;
        const posOf = (e) => { const [x, y] = cx(e); return (y < mY ? 'T' : 'B') + (x < mX ? 'L' : 'R'); };
        const loop = ['TL', 'TR', 'BR', 'BL'];
        for (const l of lenses) { const s = l.dataset.lcsStage.split('.')[1], p = posOf(l); if (loop[bio.indexOf(s)] !== p) f.push(`the loop is not in biological order: ${s} sits ${p}`); if (diam(l) < cfg.lensD - 0.6 || diam(l) > cfg.lensMax + 0.6 || diam(l) < FLOOR || Math.abs(R(l).height - diam(l)) > 0.6) f.push(`lens ${s} ${diam(l).toFixed(1)} px outside [${cfg.lensD}, ${cfg.lensMax}]`); }
        const seen = new Set();
        for (const ln of lanes) {
          const s = ln.dataset.lcsLabel; seen.add(s);
          const r = R(ln), above = lenses.filter((l) => { const q = R(l); return q.bottom <= r.top + 0.5 && r.top - q.bottom < 16 && Math.abs((q.left + q.width / 2) - (r.left + r.width / 2)) < 1; });
          if (above.length !== 1 || above[0].dataset.lcsStage !== `${cfg.animal}.${s}`) f.push(`lane ${s} is not under its own lens`);
          if (ln.textContent.trim() || ln.querySelector('text')) f.push(`answer printed: lane ${s} is not empty`);
          if (r.height < FLOOR) f.push(`lane ${s} ${r.height} px < ${FLOOR}`);
        }
        if (seen.size !== 4 || !bio.every((s) => seen.has(s))) f.push('lanes ↔ stages is not a bijection');
        const ret = root.querySelector('[data-lcs-arrow="return"]');
        if (root.querySelectorAll('[data-lcs-arrow]').length !== 4 || !ret || ret.dataset.lcsFrom !== 'BL' || ret.dataset.lcsTo !== 'TL') f.push('cycle not closed: the loop needs 4 arrows, the last BL -> TL');
        if (cfg.bank) {
          const words = [...root.querySelectorAll('[data-lcs-bank-word]')];
          const keys = words.map((w) => w.dataset.lcsBankWord);
          const st = keys.filter((k) => bio.includes(k));
          if (st.slice().sort().join() !== bio.slice().sort().join()) f.push(`bank stages [${st}] ≠ the ${cfg.animal} stages`);
          if (st.join() === bio.join()) f.push('bank order is the loop order (a copy-down tell)');
          if (st.join() === bio.slice().reverse().join()) f.push('bank order is the loop reversed');
          const dec = words.filter((w) => w.hasAttribute('data-lcs-decoy'));
          if (cfg.decoy) {
            if (dec.length !== 1 || dec[0].dataset.lcsBankWord !== cfg.decoy) f.push('the decoy is missing or unstamped');
            else { const i = words.indexOf(dec[0]); if (i === 0 || i === words.length - 1) f.push(`decoy position: the decoy sits ${i === 0 ? 'first' : 'last'} in the bank`); const [a, s] = cfg.decoy.split('.'); if (a === cfg.animal || !(STAGES[a] || []).includes(s)) f.push('the decoy is a stage of this animal'); const dt = dec[0].textContent.trim().toLowerCase(); if (words.some((w) => w !== dec[0] && w.textContent.trim().toLowerCase() === dt)) f.push('the decoy literal equals a stage word'); }
          } else if (dec.length) f.push('a decoy on a level without one');
          if (words.length !== 4 + (cfg.decoy ? 1 : 0)) f.push(`${words.length} bank words`);
          for (const w of words) { if (parseFloat(getComputedStyle(w).fontSize) < cfg.wordPx - 0.01) f.push('bank word under its px'); if (R(w).height < 36 - 0.5) f.push(`bank word ${R(w).height.toFixed(0)} px tall < 36`); }
          const b = root.querySelector('[data-lcs-bank-banner]'); if (b && R(b).height > 120) f.push('the bank wraps to more than two rows');
        }
        texts((el) => !!el.closest('[data-lcs-bank-banner]'));
        return f;
      }
      if (layout === 'metamorphosis') {
        const cards = [...root.querySelectorAll('[data-lcs-young-strip] [data-lcs-lens]')];
        if (cards.length !== cfg.n) f.push(`${cards.length} cards ≠ ${cfg.n}`);
        const C = cards.map((c) => { const r = R(c); return { el: c, st: c.dataset.lcsStage, a: c.dataset.lcsStage.split('.')[0], letter: (c.querySelector('[data-lcs-card]') || {}).textContent, top: r.top, left: r.left, d: r.width }; });
        C.sort((p, q) => (Math.abs(p.top - q.top) > 10 ? p.top - q.top : p.left - q.left));
        C.forEach((c, i) => { if (c.letter !== 'ABCDEFGHIJKL'[i] || c.el.dataset.lcsYoung !== c.letter) f.push(`card ${i + 1} reads "${c.letter}" (letters A.. in reading order)`); if (SORT_EXCLUDE.includes(c.st)) f.push(`SORT_EXCLUDE: ${c.st} is a card`); else if (!YOUNG.includes(c.st)) f.push(`card ${c.st} is not a young stage`); if (c.d < cfg.lensD - 0.6 || c.d > cfg.lensMax + 0.6 || c.d < 100 - 0.6) f.push(`card ${c.st} ${c.d.toFixed(1)} px outside [${cfg.lensD}, ${cfg.lensMax}]`); });
        const seq = C.map((c) => c.a);
        let runs = 1, adj = 0; for (let i = 1; i < seq.length; i++) if (seq[i] === seq[i - 1]) adj++; else runs++;
        if (runs === new Set(seq).size) f.push(`grouping tell: the strip reads in bin groups [${seq}]`);
        if (adj > 1) f.push(`grouping tell: ${adj} adjacent same-animal pairs (> 1)`);
        const fp = new Set(seq.map((a, i) => (a === 'frog' ? i % 2 : -1)).filter((x) => x >= 0)); if (fp.size === 1) f.push('grouping tell: every frog card on one parity');
        const bins = [...root.querySelectorAll('[data-lcs-bin]')];
        if (bins.length !== cfg.animals.length) f.push(`${bins.length} bins`);
        for (const b of bins) {
          const a = b.dataset.lcsBin, mine = C.filter((c) => c.a === a).map((c) => c.letter);
          const ad = b.querySelector('[data-lcs-bin-adult]');
          if (!ad || ad.dataset.lcsStage !== `${a}.adult`) f.push(`bin ${a} is not crowned by its adult`); else if (diam(ad) < cfg.adultD - 0.6 || diam(ad) > cfg.adultMax + 0.6) f.push(`adult lens ${diam(ad).toFixed(1)} px outside [${cfg.adultD}, ${cfg.adultMax}]`);
          if (+b.dataset.lcsCap !== mine.length) f.push(`bin ${a} cap ${b.dataset.lcsCap} ≠ ${mine.length} cards`);
          if ((b.dataset.lcsExpect || '').split(',').filter(Boolean).sort().join() !== mine.slice().sort().join()) f.push(`bin ${a} expects ${b.dataset.lcsExpect} ≠ ${mine}`);
          const boxes = [...b.querySelectorAll('[data-lcs-bin-box]')];
          if (boxes.length !== mine.length) f.push(`bin ${a} has ${boxes.length} boxes ≠ ${mine.length}`);
          for (const x of boxes) { if (x.textContent.trim()) f.push(`answer printed in bin ${a}`); if (R(x).width < Math.max(FLOOR, cfg.box) - 0.6) f.push('bin box under the floor'); }
        }
        if (C.some((c) => c.st.endsWith('.adult'))) f.push('an adult among the young cards');
        texts((el) => !!el.closest('[data-lcs-card]'));
        return f;
      }
      if (layout === 'compare') {
        const rows = [...root.querySelectorAll('[data-lcs-stmt]')];
        if (rows.length !== cfg.rows) f.push(`${rows.length} rows ≠ ${cfg.rows}`);
        const heads = {}; for (const h of root.querySelectorAll('[data-lcs-head]')) { heads[h.dataset.lcsHead] = h; if (h.dataset.lcsStage !== `${h.dataset.lcsHead}.adult`) f.push('a head lens is not its adult'); if (Math.abs(diam(h) - cfg.headD) > 0.6) f.push('head lens size'); }
        if (!heads.butterfly || !heads.frog) f.push('the two adult heads are missing');
        const cls = [], count = { both: 0, butterfly: 0, frog: 0 };
        for (const r of rows) {
          const id = r.dataset.lcsStmt, c = COMPARE.find((x) => x.id === id);
          if (!c) { f.push(`unknown statement ${id}`); continue; }
          if (r.dataset.lcsExpect !== c.truth.join(',')) f.push(`tick truth: ${id} expects [${r.dataset.lcsExpect}] ≠ [${c.truth}]`);
          const k = c.truth.length === 2 ? 'both' : c.truth[0]; cls.push(k); count[k]++;
          if (r.dataset.lcsClass !== k) f.push(`${id} class stamp ${r.dataset.lcsClass} ≠ ${k}`);
          for (const a of ['butterfly', 'frog']) { const t = r.querySelector(`[data-lcs-tick="${a}"]`); if (!t) { f.push(`${id}: no ${a} tick`); continue; } const q = R(t); if (q.width < Math.max(FLOOR, cfg.tick) - 0.6) f.push('tick under the floor'); if (t.textContent.trim() || t.children.length) f.push(`answer printed: ${id} ${a} box is ticked`); if (heads[a]) { const h = R(heads[a]); if (Math.abs((q.left + q.width / 2) - (h.left + h.width / 2)) > 1) f.push(`${id}: the ${a} tick is not under the ${a} head`); } }
          const tx = r.querySelector('[data-lcs-stmt-text]'); if (!tx || !tx.textContent.trim()) f.push(`${id}: no statement text`); else { if (R(tx).height > 2 * 22 + 1) f.push(`${id}: the statement runs to ${Math.round(R(tx).height / 22)} lines (> 2)`); if (parseFloat(getComputedStyle(tx).fontSize) < cfg.textPx - 0.01) f.push('statement px'); if (R(tx).bottom > R(r).bottom + 0.5) f.push(`${id}: the statement spills out of its row`); }
        }
        for (const k of Object.keys(count)) if (count[k] !== (cfg.mix[k] || 0)) f.push(`class multiset ${JSON.stringify(count)} ≠ mix ${JSON.stringify(cfg.mix)}`);
        const tell = classTell(cls); if (tell) f.push(`${tell === 'staircase' ? 'staircase' : 'class-sequence tell (' + tell + ')'}: [${cls}]`);
        texts((el) => !!el.closest('[data-lcs-stmt-text]'));
        return f;
      }
      if (layout === 'next') {
        const rows = [...root.querySelectorAll('[data-lcs-next-row]')];
        if (rows.length !== cfg.rows) f.push(`${rows.length} rows ≠ ${cfg.rows}`);
        const slots = [], per = {}; let wraps = 0;
        rows.forEach((r, i) => {
          const [a, p] = r.dataset.lcsPrompt.split('.'); const S = STAGES[a]; per[a] = (per[a] || 0) + 1;
          const pl = r.querySelector('[data-lcs-prompt-lens]');
          if (!pl || pl.dataset.lcsStage !== r.dataset.lcsPrompt) f.push(`row ${i + 1}: the prompt drawing ≠ its stamp`); else if (Math.abs(diam(pl) - cfg.promptD) > 0.6) f.push('prompt lens size');
          const succ = `${a}.${S[(S.indexOf(p) + 1) % S.length]}`;
          if (r.dataset.lcsAnswer !== succ) f.push(`successor: row ${i + 1} (${r.dataset.lcsPrompt}) expects ${r.dataset.lcsAnswer} ≠ ${succ}`);
          if (p === 'adult') wraps++;
          const chips = [...r.querySelectorAll('[data-lcs-chip]')];
          if (chips.length !== 3) f.push(`row ${i + 1}: ${chips.length} chips`);
          const cs = chips.map((c) => c.dataset.lcsChip);
          if (cs.includes(r.dataset.lcsPrompt)) f.push(`row ${i + 1}: prompt among chips (${r.dataset.lcsPrompt})`);
          if (cs.some((c) => c.split('.')[0] !== a)) f.push(`row ${i + 1}: a chip of another animal`);
          if (new Set(cs).size !== cs.length) f.push(`row ${i + 1}: two chips alike`);
          if (cs.filter((c) => c === succ).length !== 1) f.push(`row ${i + 1}: the successor ${succ} is not among the chips exactly once`);
          if (LOOKALIKE[succ] && cs.includes(LOOKALIKE[succ])) f.push(`row ${i + 1}: look-alike — ${LOOKALIKE[succ]} beside the answer ${succ}`);
          chips.forEach((c) => { if (c.dataset.lcsStage !== c.dataset.lcsChip) f.push('chip stamp ≠ drawing'); if (diam(c) < Math.max(90, FLOOR) || Math.abs(diam(c) - cfg.chipD) > 0.6) f.push('chip size'); });
          slots.push(cs.indexOf(succ));
          if (i && rows[i - 1].dataset.lcsPrompt.split('.')[0] === a) f.push(`rows ${i} and ${i + 1} are the same animal`);
        });
        if (wraps !== cfg.wrap) f.push(`${wraps} rows ask what follows an adult ≠ wrap ${cfg.wrap}`);
        for (const a of cfg.animals) if (per[a] !== cfg.perAnimal) f.push(`${a} has ${per[a] || 0} rows ≠ ${cfg.perAnimal}`);
        const cnt = [0, 1, 2].map((k) => slots.filter((s) => s === k).length);
        if (cnt.some((c) => c !== cfg.rows / 3)) f.push(`correct-slot tell: slots used ${cnt} (want ${cfg.rows / 3} each)`);
        const up = slots.every((x, i) => i === 0 || x >= slots[i - 1]), dn = slots.every((x, i) => i === 0 || x <= slots[i - 1]);
        const cyc = [1, 2].some((st) => slots.every((x, i) => i === 0 || x === (slots[i - 1] + st) % 3));
        if (up || dn || cyc) f.push(`correct-slot tell: [${slots}] is monotone / a staircase`);
        if (root.querySelector('[data-lcs-circled]')) f.push('a chip is pre-circled');
        texts(() => false);
        return f;
      }
      return [`unknown layout "${layout}"`];
    }, { ID, STAGES: ALC.STAGES, YOUNG: ALC.YOUNG, SORT_EXCLUDE: ALC.SORT_EXCLUDE, COMPARE: ALC.COMPARE, LOOKALIKE: ALC.LOOKALIKE });
  },

  async verify(page) {
    const layout = await page.evaluate((id) => { const r = document.querySelector(`[data-lcs-type="${id}"]`); return r ? (r.dataset.lcsLayout || null) : null; }, ID);
    if (layout) return this._verifyFace(page);
    return page.evaluate(({ ID, STAGES, ARRANGEMENTS }) => {
      const f = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) return ['no root'];
      let cfg; try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { return ['unreadable cfg']; }
      const stages = STAGES[cfg.animal];
      if (document.querySelector('.ws-body img')) f.push('an <img> in the body');
      const plate = root.querySelector('[data-lcs-plate]');
      if (!plate) return f.concat('no plate');
      const pr = plate.getBoundingClientRect();
      const lenses = [...plate.querySelectorAll('[data-lcs-lens]')];
      if (lenses.length !== 4) f.push(`${lenses.length} plate lenses ≠ 4`);
      const L = lenses.map((l) => {
        const r = l.getBoundingClientRect(), svg = l.querySelector('svg[data-lcs-prim="life-stage"]');
        const [a, s] = (l.dataset.lcsStage || '').split('.');
        if (!svg || svg.dataset.lcsFigure !== `life-${a}-${s}`) f.push(`lens ${l.dataset.lcsStage}: the drawing is ${svg ? svg.dataset.lcsFigure : 'missing'}`);
        return { el: l, animal: a, stage: s, cx: r.left - pr.left + r.width / 2, cy: r.top - pr.top + r.height / 2, d: r.width, h: r.height };
      });
      if (new Set(L.map((x) => x.stage)).size !== 4 || !stages.every((s) => L.some((x) => x.stage === s && x.animal === cfg.animal))) f.push(`the lenses show ${L.map((x) => x.animal + '.' + x.stage).join(',')} — not the four ${cfg.animal} stages`);
      for (const x of L) { if (Math.abs(x.d - cfg.lensD) > 0.6 || Math.abs(x.h - cfg.lensD) > 0.6) f.push(`lens ${x.stage} ${x.d.toFixed(1)} px ≠ ${cfg.lensD}`); if (x.d < 44) f.push(`lens ${x.stage} under the G1 floor`); }
      // positions from the RENDER
      const mx = (Math.min(...L.map((x) => x.cx)) + Math.max(...L.map((x) => x.cx))) / 2, my = (Math.min(...L.map((x) => x.cy)) + Math.max(...L.map((x) => x.cy))) / 2;
      const at = {};
      for (const x of L) { const p = (x.cy < my ? 'T' : 'B') + (x.cx < mx ? 'L' : 'R'); if (at[p]) f.push(`two lenses in the ${p} corner`); at[p] = x; }
      const rank = (s) => stages.indexOf(s) + 1;
      if (['TL', 'TR', 'BL', 'BR'].every((p) => at[p])) {
        const R = Object.fromEntries(Object.entries(at).map(([p, x]) => [p, rank(x.stage)]));
        const orders = [['TL', 'TR', 'BL', 'BR'], ['TR', 'TL', 'BR', 'BL'], ['BL', 'BR', 'TL', 'TR'], ['BR', 'BL', 'TR', 'TL'], ['TL', 'BL', 'TR', 'BR'], ['TR', 'BR', 'TL', 'BL'], ['BL', 'TL', 'BR', 'TR'], ['BR', 'TR', 'BL', 'TL']];
        for (const o of orders) if (o.map((p) => R[p]).join() === '1,2,3,4') f.push(`arrangement tell: reading ${o.join('>')} reads the cycle in order`);
        const ring = ['TL', 'TR', 'BR', 'BL'];
        const e = ring.findIndex((p) => R[p] === 1);
        for (const dir of [1, -1]) { const walk = [0, 1, 2, 3].map((k) => R[ring[(e + dir * k + 8) % 4]]).join(); if (walk === '1,2,3,4') f.push(`arrangement tell: the corner walk ${dir > 0 ? 'clockwise' : 'anticlockwise'} from the egg reads the cycle`); }
        if (!(at.TL.stage === 'adult' || at.TR.stage === 'adult')) f.push('arrangement tell: the adult is not in a top lens (its mark is the flower)');
        const placed = { TL: at.TL.stage, TR: at.TR.stage, BL: at.BL.stage, BR: at.BR.stage };
        if (!ARRANGEMENTS.some((a) => ['TL', 'TR', 'BL', 'BR'].every((p) => a[p] === placed[p]))) f.push(`arrangement tell: ${JSON.stringify(placed)} is not one of the frozen tell-free placements`);
        // per-page answer placement: every corner holds a distinct rank, the open answers sit in distinct corners
        const open = Object.values(R).filter((r, i) => !cfg.anchors.includes(stages[r - 1]));
        if (new Set(Object.values(R)).size !== 4) f.push('two corners hold the same answer');
        void open;
      }
      // boxes
      const boxes = [...plate.querySelectorAll('[data-lcs-box]')];
      if (boxes.length !== 4) f.push(`${boxes.length} plate boxes ≠ 4`);
      for (const b of boxes) {
        const x = L.find((l) => l.el.dataset.lcsPos === b.dataset.lcsPos);
        if (!x) { f.push(`box ${b.dataset.lcsPos} has no lens`); continue; }
        const want = String(rank(x.stage));
        if (b.dataset.lcsAnswer !== want) f.push(`box by the ${x.stage} expects "${b.dataset.lcsAnswer}" ≠ ${want}`);
        const given = cfg.anchors.includes(x.stage);
        const txt = b.textContent.trim();
        if (given && (b.dataset.lcsGiven !== want || txt !== want)) f.push(`the ${x.stage} box should print its rank ${want} (prints "${txt}")`);
        if (!given && (txt || b.dataset.lcsGiven)) f.push(`answer printed: the ${x.stage} box shows "${txt || b.dataset.lcsGiven}"`);
        const r = b.getBoundingClientRect();
        if (r.width < 44 || r.height < 44 || Math.abs(r.width - cfg.boxPx) > 0.6) f.push(`box ${x.stage} ${r.width.toFixed(0)} px (want ${cfg.boxPx}, >= 44)`);
        const lr = x.el.getBoundingClientRect();
        if (Math.abs((r.left + r.width / 2) - (lr.left + lr.width / 2)) > 1 || r.top < lr.bottom - 0.5 || r.top - lr.bottom > 16) f.push(`box ${x.stage} is not centred under its lens`);
        if (given && parseFloat(getComputedStyle(b).fontSize) < 26) f.push(`given numeral under 26 px`);
      }
      // loop
      const loop = root.querySelector('[data-lcs-loop]');
      if (cfg.loop) {
        if (!loop) f.push('the loop box is missing');
        else {
          const want = String(stages.indexOf(stages[(stages.length - 1 + 1) % stages.length]) + 1);
          if (loop.dataset.lcsAnswer !== want) f.push(`cycle: the box after the ${stages[stages.length - 1]} expects "${loop.dataset.lcsAnswer}" ≠ ${want} (after the adult comes the first stage again)`);
          if (loop.textContent.trim()) f.push('answer printed: the loop box is not empty');
          const ll = root.querySelector('[data-lcs-loop-lens]');
          if (!ll || ll.dataset.lcsStage !== `${cfg.animal}.${stages[stages.length - 1]}`) f.push('the loop row does not show the adult');
          else if (Math.abs(ll.getBoundingClientRect().width - cfg.loopLensD) > 0.6) f.push('loop lens size');
        }
      } else if (loop) f.push('a loop box on a level without the loop');
      // tethers + spots (plate svg coordinates === plate px)
      const svg = plate.querySelector('svg[data-lcs-scenery]');
      const spots = {}, teth = {};
      for (const c of svg.querySelectorAll('circle[data-lcs-spot]')) spots[c.dataset.lcsSpot] = { x: +c.getAttribute('cx'), y: +c.getAttribute('cy'), r: +c.getAttribute('r') };
      for (const t of svg.querySelectorAll('line[data-lcs-tether]')) teth[t.dataset.lcsTether] = { a: [+t.getAttribute('x1'), +t.getAttribute('y1')], b: [+t.getAttribute('x2'), +t.getAttribute('y2')] };
      const segX = (p, q, r, s) => { const d = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]); return d(p, q, r) * d(p, q, s) < 0 && d(r, s, p) * d(r, s, q) < 0; };
      const segDist = (c, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1]; const t = Math.max(0, Math.min(1, ((c[0] - a[0]) * dx + (c[1] - a[1]) * dy) / (dx * dx + dy * dy))); return Math.hypot(c[0] - a[0] - t * dx, c[1] - a[1] - t * dy); };
      const stem = svg.querySelector('[data-lcs-stem]').getBBox();
      for (const x of L) {
        const s = spots[x.stage], t = teth[x.stage];
        if (!s || !t) { f.push(`${x.stage}: no spot ring / tether`); continue; }
        if (Math.abs(Math.hypot(t.b[0] - s.x, t.b[1] - s.y) - s.r) > 2) f.push(`tether off spot: the ${x.stage} tether ends ${(Math.hypot(t.b[0] - s.x, t.b[1] - s.y) - s.r).toFixed(1)} px from its spot ring`);
        if (Math.abs(Math.hypot(t.a[0] - x.cx, t.a[1] - x.cy) - x.d * 97 / 200) > 2) f.push(`the ${x.stage} tether does not start on its lens ring`);
        for (const y of L) if (y !== x && segDist([y.cx, y.cy], t.a, t.b) < y.d / 2) f.push(`the ${x.stage} tether crosses the ${y.stage} lens`);
        for (const [k, u] of Object.entries(teth)) if (k !== x.stage && segX(t.a, t.b, u.a, u.b)) f.push(`the ${x.stage} and ${k} tethers cross`);
        const corners = [[stem.x, stem.y], [stem.x + stem.width, stem.y], [stem.x + stem.width, stem.y + stem.height], [stem.x, stem.y + stem.height]];
        for (let i = 0; i < 4; i++) if (segX(t.a, t.b, corners[i], corners[(i + 1) % 4])) f.push(`the ${x.stage} tether crosses the stem`);
      }
      const sk = Object.keys(spots);
      for (let i = 0; i < sk.length; i++) for (let j = i + 1; j < sk.length; j++) if (Math.hypot(spots[sk[i]].x - spots[sk[j]].x, spots[sk[i]].y - spots[sk[j]].y) < 30) f.push(`spot rings ${sk[i]} / ${sk[j]} closer than 30 px`);
      // text: nothing but the given numerals
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) { const t = n.textContent.trim(); if (!t) continue; const box = n.parentElement.closest('[data-lcs-given]'); if (!box) f.push(`text in the body: "${t.slice(0, 30)}"`); }
      // stays in the page
      const br = document.querySelector('.ws-body').getBoundingClientRect();
      for (const e of root.querySelectorAll('[data-lcs-plate],[data-lcs-loop-row]')) { const r = e.getBoundingClientRect(); if (r.left < br.left - 0.5 || r.right > br.right + 0.5 || r.top < br.top - 0.5 || r.bottom > br.bottom + 0.5) f.push('the plate / loop row leaves the body'); }
      return f;
    }, { ID, STAGES: ALC.STAGES, ARRANGEMENTS: ALC.ARRANGEMENTS });
  },
};

module.exports = TYPE;
