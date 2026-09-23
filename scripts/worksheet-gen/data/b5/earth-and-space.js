/**
 * data/b5/earth-and-space.js — the G1-378 `earth-and-space` bank (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-378-earth-and-space.md §4-§5).
 *
 * EARTH_AND_SPACE_LOC[loc] — the per-locale block (FIRST export: lib/b5-common.js
 * bank('earth-and-space', loc) reads the first export; a missing block REFUSES,
 * never an en fallback). The EN block is HAND-AUTHORED here (2026-09-23, the base
 * build); the ten non-EN blocks are GENERATED later by tools/apply-b5-locale.js
 * into data/b5/locales/earth-and-space.<loc>.json from the native panels' drafts,
 * after tools/validate-b5-draft.js runs the gate's validateBank(block, loc)
 * (qa/verify-b5-earth-and-space.js, §5 rules 1-12).
 *
 * Block shape (§5):
 *   hemisphere     'N' | 'S' (S only in pt; the moon-phase primitive mirrors on it)
 *   bodies         {sun, earth, moon} — the head pill literals
 *   facts          {<the 13 FACTS ids>} — whole sentences, NEVER a frame; <= 80 chars
 *   leakForms      gendered pronouns / agreeing predicates that would reveal a body
 *                  (de/fr/es/it/pt REQUIRED non-empty); no fact may contain one
 *   genderNeutral  true — the panel's signature that every fact has a non-agreeing
 *                  subject (required with leakForms in de/fr/es/it/pt)
 *   forbiddenStems the locale's forms of the forbidden facts ("gives light", "goes
 *                  round the Sun", "rises" …) + the season / weather words; no fact
 *                  may contain one ((?<!\p{L})…(?!\p{L}), NFC, locale case-fold)
 *   phaseNames     {'0','2','4','6'} · planets {<8 ids>} · notPlanet {sun, moon}
 *   classLabels    {giant, rocky, notPlanet} · mnemonic (F4 d1 ONLY) · refuse []
 *   strings        {base, moon-phases-in-order, moon-phase-names, day-and-night-model,
 *                  planets-in-order, planet-sizes} each {title, instruction}; base ===
 *                  the spec's i18n.en. Keyed by MODE (the K-368 / G1-376 precedent):
 *                  the face ids are allocated in Phase E.
 * Nothing on the page inflects; every word is a whole literal from here.
 * The en strings are a SOURCE TO AUDIT (§4): every panel reads them and reports defects.
 *
 * EARTH_AND_SPACE — the locale-neutral model (truth vectors, planets, sizes).
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const EARTH_AND_SPACE_LOC = {
  en: {
    hemisphere: 'N',
    bodies: { sun: 'Sun', earth: 'Earth', moon: 'Moon' },
    facts: {
      ownLight: 'It makes its own light.',
      star: 'It is a star.',
      hottest: 'It is the hottest of the three.',
      biggest: 'It is the biggest of the three.',
      liveOn: 'People and animals live on it.',
      oceans: 'It has big oceans of water.',
      air: 'It has air that we can breathe.',
      planet: 'It is a planet.',
      spinDay: 'Its turning gives us day and night.',
      orbitsEarth: 'It goes around the Earth.',
      seemsToChange: 'Its shape seems to change.',
      craters: 'It is covered in craters.',
      smallest: 'It is the smallest of the three.',
    },
    leakForms: ['he', 'she', 'him', 'her', 'his', 'hers'],
    genderNeutral: true,
    forbiddenStems: [
      'gives light', 'gives us light', 'shines', 'at night', 'goes around the sun', 'goes round the sun', 'orbits the sun',
      'rises', 'sets', 'is round', 'in the sky', 'walked on', 'no air', 'reflects', 'moves across',
      'summer', 'winter', 'spring', 'autumn', 'fall', 'rain', 'snow', 'cloud', 'clouds', 'weather', 'hot day', 'cold day',
    ],
    phaseNames: { 0: 'new moon', 2: 'first quarter', 4: 'full moon', 6: 'last quarter' },
    planets: { mercury: 'Mercury', venus: 'Venus', earth: 'Earth', mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune' },
    notPlanet: { sun: 'Sun', moon: 'Moon' },
    classLabels: { giant: 'giant planet', rocky: 'small rocky planet', notPlanet: 'not a planet' },
    mnemonic: 'My Very Educated Mother Just Served Us Nachos',
    refuse: [],
    strings: {
      base: {
        title: 'Sun, Earth and Moon',
        instruction: 'Read each sentence. Is it about the Sun, the Earth or the Moon? Tick one box.',
      },
      'moon-phases-in-order': {
        title: 'Moon Phases in Order',
        instruction: 'The Moon seems to grow, then shrink. In each row, write 1 to 5 under the moons in that order.',
      },
      'moon-phase-names': {
        title: 'Name the Moon Phases',
        instruction: 'Look at each moon. Write its name on the lines. Use each word in the word bank twice.',
      },
      'day-and-night-model': {
        title: 'Why Do We Have Day and Night?',
        instruction: 'Look where the Sun is. At each numbered pin, is it day or night? Circle the word in the table.',
      },
      'planets-in-order': {
        title: 'Planets in Order from the Sun',
        instruction: 'Write the name of each planet on its line, starting next to the Sun. Use every name in the bank once.',
      },
      'planet-sizes': {
        title: 'Giant and Rocky Planets',
        instruction: 'Sort the names. Write each one in the right box: giant planet, small rocky planet or not a planet.',
      },
    },
  },
};

/** The locale-neutral model (design §5). truth = [sun, earth, moon]; exactly one 1. */
const EARTH_AND_SPACE = {
  BODIES: ['sun', 'earth', 'moon'],
  FACTS: {
    ownLight: { truth: [1, 0, 0] }, star: { truth: [1, 0, 0] }, hottest: { truth: [1, 0, 0] }, biggest: { truth: [1, 0, 0], size: true },
    liveOn: { truth: [0, 1, 0] }, oceans: { truth: [0, 1, 0] }, air: { truth: [0, 1, 0] }, planet: { truth: [0, 1, 0] }, spinDay: { truth: [0, 1, 0] },
    orbitsEarth: { truth: [0, 0, 1] }, seemsToChange: { truth: [0, 0, 1] }, craters: { truth: [0, 0, 1] }, smallest: { truth: [0, 0, 1], size: true },
  },
  FORBIDDEN_FACT_IDS: ['givesLight', 'shinesAtNight', 'orbitsSun', 'isRound', 'spins', 'seenInSky', 'walkedOn', 'noAir', 'reflects', 'sunMoves'],
  PHASES: [0, 1, 2, 3, 4, 5, 6, 7],
  NAMED_PHASES: [0, 2, 4, 6],
  PLANETS: ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
  DIAMETER_KM: { mercury: 4879, venus: 12104, earth: 12756, mars: 6792, jupiter: 142984, saturn: 120536, uranus: 51118, neptune: 49528, moon: 3475, sun: 1392700 },
  SIZE_CLASS: { mercury: 'rocky', venus: 'rocky', earth: 'rocky', mars: 'rocky', jupiter: 'giant', saturn: 'giant', uranus: 'giant', neptune: 'giant', sun: 'notPlanet', moon: 'notPlanet' },
  DAY_ANGLES: [0, 25, -25, 50, -50],
  NIGHT_ANGLES: [180, 155, -155, 130, -130],
  REFUSED_PICS: ['space/*'],   // no library picture on any face (critic §3): the gate bans every <img>
  MODES: ['base', 'moon-phases-in-order', 'moon-phase-names', 'day-and-night-model', 'planets-in-order', 'planet-sizes'],
  /** per-locale Pluto forms (rule 6) */
  PLUTO: ['pluto', 'plutón', 'plutão', 'pluton', 'plutone', 'pluuto', 'plúton'],
  /** the giant label must not carry the locale's gas stem (rule 8: Uranus and Neptune are ice giants) */
  GAS_STEMS: ['gas', 'gaz', 'gás', 'kaasu'],
  /** leakForms must be non-empty in these locales (rule 4: gendered body nouns) */
  GENDERED_LOCALES: ['de', 'fr', 'es', 'it', 'pt'],
};

module.exports = { EARTH_AND_SPACE_LOC, EARTH_AND_SPACE };
