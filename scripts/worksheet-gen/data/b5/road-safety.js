'use strict';
/**
 * data/b5/road-safety.js — the K-369 `road-safety` bank (nt10-E). Design:
 * docs/worksheet-gen/b5-designs/K-369-road-safety.md §5.
 *
 * TWO layers:
 *   COMMON        locale-neutral facts the GATE owns (roles, the per-convention
 *                 class table read from geometry, confusables, the light rule,
 *                 step kinds, the closed shape/glyph sets). Never per locale.
 *   ROAD_SAFETY   one block per locale. The EN block is hand-authored here (US
 *                 MUTCD 11th ed. 2023); every other locale is GENERATED into
 *                 data/b5/locales/road-safety.<loc>.json by tools/apply-b5-
 *                 locale.js after its native panel SIGNS the sign table against
 *                 the national annex. An absent block REFUSES (lib/b5-common.js
 *                 bank() throws; the spec never falls back to en or to another
 *                 locale's sign).
 *
 * THE EN BLOCK IS A SOURCE TO AUDIT (critic §2): every literal below was written
 * against the §5 validator rules (validateBank in qa/verify-b5-road-safety.js):
 * no meaning / situation contains a word printed inside its own sign, one
 * sentence per instruction, titles <= 70, the sign head never bare.
 * `signedBy` for en records WHO checked each record against which MUTCD figure;
 * the operator's signed review may replace it.
 */

const COMMON = {
  roles: ['stop', 'yield', 'crossing', 'pedestrian-warning', 'children', 'school', 'signal-ahead', 'bike-warning',
    'no-entry', 'no-vehicles', 'no-bikes', 'no-pedestrians', 'footpath', 'bike-path', 'shared-path', 'info-1', 'info-2'],
  conventions: ['vienna', 'mutcd', 'mx', 'br'],
  shapes: ['octagon', 'triUp', 'triDown', 'circle', 'square', 'diamond', 'pentagon', 'plateCircle'],
  fields: ['white', 'yellow', 'red', 'blue'],
  glyphs: ['walker', 'walkerOnStripes', 'crossingTriangle', 'twoChildren', 'adultChild', 'bicycle', 'trafficLightMini', 'bar', 'text', 'none'],
  /** the GATE's own table, per convention, keyed on geometry (shape + rim-vs-fill); design §5 verbatim */
  classOf: {
    vienna: { triUp: 'warning', 'circle+rim': 'prohibition', 'circle+blue': 'mandatory', square: 'information', octagon: 'priority', triDown: 'priority', 'circle+red': 'prohibition' },
    mutcd: { diamond: 'warning', pentagon: 'warning', octagon: 'regulatory', triDown: 'regulatory', plateCircle: 'regulatory', 'circle+red': 'regulatory' },
    mx: { diamond: 'preventiva', octagon: 'restrictiva', triDown: 'restrictiva', plateCircle: 'restrictiva', square: 'informativa' },
    br: { diamond: 'advertencia', octagon: 'regulamentacao', triDown: 'regulamentacao', 'circle+rim': 'regulamentacao', square: 'indicacao' },
  },
  // Two roles are CONFUSABLE when one sentence can be satisfied by BOTH signs (a sign-quiz row would then have two
  // right answers) or when they read alike at a glance. The gate owns the meaning model (ROLE_SATISFIES in
  // qa/verify-b5-road-safety.js, rule 13) and FAILS if a pair it derives is missing here. Audit 2026-09-23 added the
  // bans that overlap (no-vehicles also bans bikes; a footpath bans bikes and vehicles; a bike path bans walkers),
  // the walking / crossing / children cluster and the riding cluster.
  confusable: [['children', 'crossing'], ['crossing', 'footpath'], ['stop', 'yield'], ['signal-ahead', 'crossing'], ['no-entry', 'no-vehicles'], ['school', 'crossing'],
    ['no-bikes', 'no-vehicles'], ['no-bikes', 'footpath'], ['no-vehicles', 'footpath'], ['no-pedestrians', 'bike-path'],
    ['crossing', 'pedestrian-warning'], ['pedestrian-warning', 'children'], ['pedestrian-warning', 'school'], ['children', 'school'],
    ['children', 'bike-warning'], ['school', 'bike-warning'],
    ['pedestrian-warning', 'footpath'], ['pedestrian-warning', 'shared-path'], ['footpath', 'shared-path'],
    ['bike-warning', 'bike-path'], ['bike-warning', 'shared-path'], ['bike-path', 'shared-path']],
  lightRule: { ped: { 0: 'stop', 1: 'go' }, ped3: { 0: 'stop', 2: 'go' }, car: { 0: 'stop', 1: 'stop', 2: 'go' } },
  stepKinds: ['stop-kerb', 'look-left', 'look-right', 'look-both', 'walk-across', 'listen'],
  modes: ['base', 'colour-lights', 'crossing-steps', 'sign-meaning', 'sign-kinds', 'sign-quiz'],
};

/** The geometry key the class table is read with (shape + rim-vs-fill); pure, shared by the validator and the gate. */
function geometryKey(sign) {
  if (sign.shape !== 'circle') return sign.shape;
  if (sign.rim === 'red') return 'circle+rim';
  if (sign.field === 'red') return 'circle+red';
  if (sign.field === 'blue') return 'circle+blue';
  return 'circle?';
}

const SIGNED_EN = 'K-369 build 2026-09-23, checked against the MUTCD 11th ed. (2023) figure named in regRef; operator review pending';

const ROAD_SAFETY = {
  en: {
    convention: 'mutcd',
    signs: {
      stop: { code: 'R1-1', regRef: 'MUTCD 11th ed. Fig. 2B-1', shape: 'octagon', rim: 'white', field: 'red', glyph: 'text', text: 'STOP', slash: false, class: 'regulatory', signedBy: SIGNED_EN },
      yield: { code: 'R1-2', regRef: 'MUTCD 11th ed. Fig. 2B-1', shape: 'triDown', rim: 'red', field: 'white', glyph: 'text', text: 'YIELD', slash: false, class: 'regulatory', signedBy: SIGNED_EN },
      crossing: { code: 'W11-2', regRef: 'MUTCD 11th ed. Fig. 2C-11', shape: 'diamond', rim: 'ink', field: 'yellow', glyph: 'walker', text: '', slash: false, class: 'warning', signedBy: SIGNED_EN },
      school: { code: 'S1-1', regRef: 'MUTCD 11th ed. Fig. 7B-1', shape: 'pentagon', rim: 'ink', field: 'yellow', glyph: 'twoChildren', text: '', slash: false, class: 'warning', signedBy: SIGNED_EN },
      'no-entry': { code: 'R5-1', regRef: 'MUTCD 11th ed. Fig. 2B-13', shape: 'circle', rim: null, field: 'red', glyph: 'bar', text: 'DO NOT|ENTER', slash: false, class: 'regulatory', signedBy: SIGNED_EN },
      'signal-ahead': { code: 'W3-3', regRef: 'MUTCD 11th ed. Fig. 2C-6', shape: 'diamond', rim: 'ink', field: 'yellow', glyph: 'trafficLightMini', text: '', slash: false, class: 'warning', signedBy: SIGNED_EN },
      'bike-warning': { code: 'W11-1', regRef: 'MUTCD 11th ed. Fig. 2C-11', shape: 'diamond', rim: 'ink', field: 'yellow', glyph: 'bicycle', text: '', slash: false, class: 'warning', signedBy: SIGNED_EN },
      'no-bikes': { code: 'R5-6', regRef: 'MUTCD 11th ed. Fig. 2B-13', shape: 'plateCircle', rim: 'red', field: 'white', glyph: 'bicycle', text: '', slash: true, class: 'regulatory', signedBy: SIGNED_EN },
      'no-pedestrians': { code: 'R9-3', regRef: 'MUTCD 11th ed. Fig. 2B-26', shape: 'plateCircle', rim: 'red', field: 'white', glyph: 'walker', text: '', slash: true, class: 'regulatory', signedBy: SIGNED_EN },
    },
    setG1: ['stop', 'yield', 'crossing', 'school', 'no-entry', 'signal-ahead'],
    kindsPool: ['stop', 'yield', 'no-bikes', 'no-pedestrians', 'crossing', 'signal-ahead', 'bike-warning', 'school'],
    classes: [{ key: 'regulatory', label: 'Rule signs' }, { key: 'warning', label: 'Warning signs' }],
    // MUTCD 4I: the upraised HAND (Portland orange) and the WALKING PERSON (lunar white on a dark lens), 2 lamps
    pedLight: { stop: 'hand', go: 'walking', lamps: 2 },
    amber: { token: 'codeYellow', word: 'yellow' },
    // yellow = GET READY TO STOP (Danish panel 2026-09-23: 'slow down' is the unsafe reading; MUTCD 4F: a steady yellow
    // warns the red is coming) — so an en amber car answers the stop chip, one answer
    amberMeans: 'stop',
    chipWords: { ped: { stop: 'wait', go: 'walk' }, car: { stop: 'stop', go: 'go' } },
    meanings: {
      stop: 'Every car must halt here, then look.',
      yield: 'Slow down and let the others go first.',
      crossing: 'Watch for people crossing the road.',   // W11-2 WARNS drivers; "may walk" read as permission (review 2026-09-23)
      school: 'Children walk here on their way to class.',
      'no-entry': 'No car may drive into the street from this side.',
      'signal-ahead': 'Watch out, a traffic light is coming.',
    },
    situations: {
      stop: ['Every car has to halt at this corner before it goes on.', 'Drivers must come to a full halt here and look both ways.'],
      yield: ['Slow down and let the cars on the big road go first.', 'Drivers wait for a gap and let others pass before they go.'],
      crossing: ['People walk across the street here, so drivers watch for them.', 'This is a spot where people cross the road on foot.'],
      school: ['Many children walk to class here in the morning.', 'Drivers go slowly because kids are going to and from class.'],
      'no-entry': ['Cars may never drive into this street from here.', 'This is the wrong way in, so drivers must turn around.'],
      'signal-ahead': ['There is a traffic light a little way down this road.', 'Get ready: soon there will be lights that turn red.'],
      'bike-warning': ['Watch out for people riding bikes on this road.', 'People on bicycles use this road, so drive with care.'],
      'no-bikes': ['You may not ride a bicycle on this road.', 'Bicycles are not allowed here. Push yours on another path.'],
      'no-pedestrians': ['People may not cross the street on foot at this spot.', 'Walkers must not cross here. Use the crossing further on.'],
    },
    steps: ['stop-kerb', 'look-left', 'look-right', 'look-left', 'walk-across'],
    listenStep: null,
    familyHead: 'Road Safety',
    signHead: 'Traffic Signs',
    childAnchors: ['for Kids', 'Kindergarten', 'Grade 1', 'Grade 2'],
    strings: {
      base: { title: 'Road Safety: Read the Traffic Light', instruction: 'Look at the lamp that is on, then circle what to do.' },
      'colour-lights': { title: 'Road Safety: Color the Traffic Lights', instruction: 'Find the lamp with rays on each traffic light and color it the color it shines.' },
      'crossing-steps': { title: 'Crossing the Road Safely: the Steps', instruction: 'Write 1 to 5 in the boxes to show how to cross the road.' },
      'sign-meaning': { title: 'Road Safety: Traffic Signs and Their Meanings', instruction: 'Draw a line from each road sign to what it means.' },
      'sign-kinds': { title: 'Road Safety: Kinds of Traffic Signs', instruction: 'Write the letter of each road sign in the boxes of its group.' },
      'sign-quiz': { title: 'Road Safety Quiz: Which Sign Fits?', instruction: 'Read each sentence and circle the one road sign that fits it.' },
    },
  },
};

module.exports = { ROAD_SAFETY, COMMON, geometryKey };
