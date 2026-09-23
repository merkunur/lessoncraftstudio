/**
 * data/b5/maps.js — the G1-379 `maps` bank (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §4-§5).
 *
 * MAPS_LOC[loc] — the per-locale block, read ONLY through lib/b5-common.js
 * bank('maps', loc) (a missing block REFUSES, never an en fallback). The EN block is
 * HAND-AUTHORED here (2026-09-23, the base build); the ten non-EN blocks are GENERATED
 * later by tools/apply-b5-locale.js into data/b5/locales/maps.<loc>.json from the native
 * panels' drafts after tools/validate-b5-draft.js, which runs the gate's
 * validateBank(block, loc) (qa/verify-b5-maps.js, §5 rules 1-12).
 *
 * Block shape (§5 MAPS_LOC). Frames NEVER inflect: every word on the body is a stand-alone
 * nominative label, a WHOLE panel literal (no vocab, no objForms, no articles.js):
 *   keyTitle      the map key's tab ("Key" / Legende / Simbología / Teckenförklaring …)
 *   symbolWords   {house tree bush pond bench tent flowerBed bridge} singular citation forms
 *                 (de capitalised; sv/da/no INDEFINITE)
 *   dirWords      {n e s w} the four direction words
 *   dirLetters    {n e s w} === the first grapheme of each dirWord, upper-cased (rule 2:
 *                 de O = Osten, pt L = leste, fi P I E L with E = SOUTH and L = WEST)
 *   continentSet  [{id, regions:[...]}] 5..7 members over MAPS.REGIONS (a merged America
 *                 is ONE member with two regions); antarctica may be absent
 *   continentNames{<member id>: name} (<= 18 graphemes, the F3 writing budget)
 *   oceanSet      [...] 3..5 of MAPS.OCEAN_IDS, pacific always; southern ⇒ antarctica
 *   oceanNames    {<ocean id>: name}
 *   setSource     the textbook / curriculum the counts come from (rule 11; never assumed)
 *   mnemonic      the F2 d1 order mnemonic (d1 only)
 *   refuse        faces this locale will not ship (layout names)
 *   strings       { base, top-view, compass-rose, continents, continents-oceans,
 *                   directions-on-map: {title, instruction} } keyed by LAYOUT until the
 *                 emitter allocates the face ids (K-371+ / G2-360+ / G3-392+); base ===
 *                 the spec's i18n.en.
 *   The en strings are a SOURCE TO AUDIT (§4): every panel reads them and reports defects.
 *
 * MAPS — the locale-neutral facts (§5 MAPS): the symbol ids, the near-miss pair, the
 * clockwise direction order, the F1 top/side model records (TOPSIDE, consumed by
 * primitives/top-side-view.js), the world-map regions / oceans / polar leaders, the F5
 * bearing rule, the REFUSED library pictures (opened by the design editor and rejected:
 * a baked English "N E S W" dial, a side-view folded map, a colour-coded wall map).
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const MAPS_LOC = {
  en: {
    keyTitle: 'Key',
    symbolWords: { house: 'house', tree: 'tree', bush: 'bush', pond: 'pond', bench: 'bench', tent: 'tent', flowerBed: 'flower bed', bridge: 'bridge' },
    dirWords: { n: 'north', e: 'east', s: 'south', w: 'west' },
    dirLetters: { n: 'N', e: 'E', s: 'S', w: 'W' },
    continentSet: [
      { id: 'northAmerica', regions: ['northAmerica'] },
      { id: 'southAmerica', regions: ['southAmerica'] },
      { id: 'europe', regions: ['europe'] },
      { id: 'asia', regions: ['asia'] },
      { id: 'africa', regions: ['africa'] },
      { id: 'oceania', regions: ['oceania'] },
      { id: 'antarctica', regions: ['antarctica'] },
    ],
    // "Australia" vs "Oceania" is a panel question (§4); the region drawn includes New Zealand and New Guinea, so the honest name is Oceania.
    continentNames: { northAmerica: 'North America', southAmerica: 'South America', europe: 'Europe', asia: 'Asia', africa: 'Africa', oceania: 'Oceania', antarctica: 'Antarctica' },
    oceanSet: ['pacific', 'atlantic', 'indian', 'arctic', 'southern'],
    oceanNames: { pacific: 'Pacific Ocean', atlantic: 'Atlantic Ocean', indian: 'Indian Ocean', arctic: 'Arctic Ocean', southern: 'Southern Ocean' },
    setSource: 'National Geographic Education: seven continents and five oceans (the Southern Ocean recognised in 2021)',
    mnemonic: 'Never Eat Soggy Waffles',
    refuse: [],
    strings: {
      base: {
        title: 'Read the Map Key',
        instruction: 'Look at the map key. Find each thing on the map. Count them and write how many in the box.',
      },
      'top-view': {
        title: "Bird's-Eye View: From the Side and From Above",
        instruction: 'Each thing is drawn from the side. Draw a line to the same thing seen from above.',
      },
      'compass-rose': {
        title: 'North, East, South, West: Finish the Rose',
        instruction: 'Each compass rose shows one letter. Write the other three letters in the empty boxes.',
      },
      continents: {
        title: 'Label the Continents',
        instruction: 'Write the name of each numbered continent on its line. Use the names in the box.',
      },
      'continents-oceans': {
        title: 'Continents and Oceans',
        instruction: 'Find each continent and ocean on the map. Write its number in the box next to its name.',
      },
      'directions-on-map': {
        title: 'Cardinal Directions on a Map',
        instruction: 'Find the first picture on the map. Look the way the word says. Circle the one of the three pictures that lies that way.',
      },
    },
  },
};

/**
 * F1 model records (§3 F1; design B §5.4). Model space 0..100: x left-right, y FRONT (0) to
 * BACK (100), z up. Solids: box {x0,x1,y0,y1,z0,z1} · cyl {cx,cy,r,z0,z1} (vertical) ·
 * frustum {cx,cy,r0 (bottom),r1 (top),z0,z1} · cylY {cx,cz,r,y0,y1} (a cylinder along y: a
 * wheel) · gableY {x0,x1,y0,y1,z0 (eaves),z1 (ridge)} (ridge along y) · crown {cx,cy,cz,r} (a
 * leafy ball) · handle {x0,x1,z0,z1,cy,t} (a cup's C-handle on the +x side) · arc {cx,cy,r,z0}
 * (a bucket's bail over the top, in the x-z plane). `fill` is a token name.
 */
const TOPSIDE = {
  cup: { cls: 'circle', solids: [
    { type: 'frustum', cx: 50, cy: 50, r0: 18, r1: 22, z0: 0, z1: 44, fill: 'white' },
    { type: 'handle', x0: 70, x1: 84, z0: 10, z1: 34, cy: 50, t: 6, fill: 'white' },
  ] },
  bucket: { cls: 'circle', solids: [
    { type: 'frustum', cx: 50, cy: 50, r0: 17, r1: 24, z0: 0, z1: 40, fill: 'tealSoft' },
    { type: 'arc', cx: 50, cy: 50, r: 24, z0: 40, h: 18, fill: 'none' },
  ] },
  roundTable: { cls: 'circle', solids: [
    { type: 'frustum', cx: 50, cy: 50, r0: 18, r1: 6, z0: 0, z1: 6, fill: 'tealSoft' },
    { type: 'cyl', cx: 50, cy: 50, r: 5, z0: 6, z1: 38, fill: 'tealSoft' },
    { type: 'cyl', cx: 50, cy: 50, r: 42, z0: 38, z1: 44, fill: 'white' },
  ] },
  tree: { cls: 'circle', solids: [
    { type: 'cyl', cx: 50, cy: 50, r: 7, z0: 0, z1: 34, fill: 'white' },
    { type: 'crown', cx: 50, cy: 50, cz: 61, r: 34, fill: 'tealSoft' },
  ] },
  rectTable: { cls: 'rect', solids: [
    { type: 'box', x0: 12, x1: 18, y0: 28, y1: 34, z0: 0, z1: 38, fill: 'tealSoft' },
    { type: 'box', x0: 82, x1: 88, y0: 28, y1: 34, z0: 0, z1: 38, fill: 'tealSoft' },
    { type: 'box', x0: 12, x1: 18, y0: 66, y1: 72, z0: 0, z1: 38, fill: 'tealSoft' },
    { type: 'box', x0: 82, x1: 88, y0: 66, y1: 72, z0: 0, z1: 38, fill: 'tealSoft' },
    { type: 'box', x0: 8, x1: 92, y0: 24, y1: 76, z0: 38, z1: 44, fill: 'white' },
  ] },
  bed: { cls: 'rect', solids: [
    { type: 'box', x0: 8, x1: 92, y0: 25, y1: 75, z0: 0, z1: 26, fill: 'white' },
    { type: 'box', x0: 8, x1: 15, y0: 25, y1: 75, z0: 0, z1: 50, fill: 'tealSoft' },
    { type: 'box', x0: 18, x1: 34, y0: 32, y1: 68, z0: 26, z1: 33, fill: 'coralSoft' },
    { type: 'box', x0: 40, x1: 92, y0: 25, y1: 75, z0: 26, z1: 28, fill: 'tealSoft' },
  ] },
  car: { cls: 'rect', solids: [
    { type: 'cylY', cx: 24, cz: 11, r: 11, y0: 32, y1: 68, fill: 'ink' },
    { type: 'cylY', cx: 76, cz: 11, r: 11, y0: 32, y1: 68, fill: 'ink' },
    { type: 'box', x0: 6, x1: 94, y0: 30, y1: 70, z0: 12, z1: 34, fill: 'coral' },
    { type: 'box', x0: 28, x1: 70, y0: 33, y1: 67, z0: 34, z1: 54, fill: 'white' },
  ] },
  house: { cls: 'rect', solids: [
    { type: 'box', x0: 16, x1: 84, y0: 22, y1: 78, z0: 0, z1: 48, fill: 'white' },
    { type: 'box', x0: 42, x1: 58, y0: 21.5, y1: 22, z0: 0, z1: 28, fill: 'teal', face: 'front' },
    { type: 'gableY', x0: 10, x1: 90, y0: 16.67, y1: 83.33, z0: 48, z1: 85 },
  ] },
  chair: { cls: 'square', solids: [
    { type: 'box', x0: 22, x1: 28, y0: 22, y1: 28, z0: 0, z1: 40, fill: 'tealSoft' },
    { type: 'box', x0: 72, x1: 78, y0: 22, y1: 28, z0: 0, z1: 40, fill: 'tealSoft' },
    { type: 'box', x0: 22, x1: 28, y0: 72, y1: 78, z0: 0, z1: 40, fill: 'tealSoft' },
    { type: 'box', x0: 72, x1: 78, y0: 72, y1: 78, z0: 0, z1: 40, fill: 'tealSoft' },
    { type: 'box', x0: 20, x1: 80, y0: 20, y1: 80, z0: 40, z1: 46, fill: 'white' },
    { type: 'box', x0: 20, x1: 80, y0: 72, y1: 80, z0: 46, z1: 85, fill: 'coralSoft' },
  ] },
  cone: { cls: 'square', solids: [
    { type: 'box', x0: 16, x1: 84, y0: 16, y1: 84, z0: 0, z1: 6, fill: 'ink' },
    { type: 'frustum', cx: 50, cy: 50, r0: 22, r1: 3, z0: 6, z1: 85, fill: 'coral', bands: [[30, 38], [54, 62]] },
  ] },
};

const MAPS = {
  SYMBOLS: ['house', 'tree', 'bush', 'pond', 'bench', 'tent', 'flowerBed', 'bridge'],
  LINE_FEATURES: ['road', 'river', 'path'],
  NEAR_MISS: [['tree', 'bush']],
  /** the base key's four drawn from here (never tree / bush: they are always in the d2 key) */
  KEY_POOL: ['house', 'pond', 'bench', 'tent', 'flowerBed', 'bridge'],
  DIRS: ['n', 'e', 's', 'w'],   // clockwise; rose position 0..3 = up, right, down, left at rot 0
  TOPSIDE,
  TOPSIDE_NEVER_TOGETHER: [['cup', 'bucket'], ['rectTable', 'bed']],
  REGIONS: ['northAmerica', 'southAmerica', 'europe', 'asia', 'africa', 'oceania', 'antarctica'],
  OCEAN_IDS: ['pacific', 'atlantic', 'indian', 'arctic', 'southern'],
  LEADER_MEMBERS: { arctic: { void: 'topLeft', target: [-155, 77] }, southern: { void: 'bottomLeft', target: [-130, -62] }, antarctica: { void: 'bottomRight', target: [140, -80] } },
  F5: { inDeg: 30, outDeg: 90, distinctStarts: 6 },
  REFUSED_PICS: ['camping/compass', 'camping/map', 'classroom/map'],
  WORLD_SOURCE: { dataset: 'Natural Earth 1:110m land', licence: 'public domain', projection: 'natural-earth-1', lon0: 11, crop: { n: 84, s: -90, sNoAntarctica: -58 }, dpPx: 0.8 },
  LAYOUTS: ['top-view', 'compass-rose', 'continents', 'continents-oceans', 'directions-on-map'],
};

module.exports = { MAPS_LOC, MAPS };
