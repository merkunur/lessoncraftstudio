/**
 * data/b3/verb-forms.js — the G2-317 `verb-forms` bank (family key
 * `verb-forms`; design docs/worksheet-gen/b3-designs/G2-317-verb-forms.md §5).
 *
 * EN block HAND-AUTHORED (2026-09-14, G2-317 base build); the ten non-EN blocks
 * are GENERATED later by tools/apply-b3-locale.js from i18n/.draft-b3-<loc>.json
 * (native panels author mode / columns / units / matchPersons / verbs with EVERY
 * form / irregularCore / frames / hunt / strings in their own grammar — the EN
 * block is a SOURCE TO AUDIT, never a target to translate). `data/` is
 * gitignored — the reviewer force-adds this module.
 *
 * Shape (design §5):
 *   VERB_FORMS[loc] = {
 *     head, mode: 'persons'|'tense', band: 'G2'|'G3', exemplar: '<unit key>',
 *     columns: [{key, label}],                 pronouns (persons) | the two tenses (tense)
 *     units:   [{key, kind:'tense'|'group', label, band}],   `kind:'tense'` swaps forms[unit];
 *                                              `kind:'group'` filters the pool by verb.group
 *     poolMap: { regular: 'all' } | {},        the locale's reading of the spec's pool NAME
 *                                              (en: L.2.1.d makes the irregular past THE G2
 *                                              target, so `regular` → `all`; fi
 *                                              `noGradation`; sv/da/no `weak`) — a bank
 *                                              decision, never a locale branch in code
 *     matchPersons: [...],                     persons with pairwise DISTINCT forms ([] in
 *                                              tense mode — Face 2 rebuilds as match:'tense')
 *     verbs: [{ inf, group, irregular, gradation, tier, pic:{theme,noun}|null, picOpened,
 *               labelOverride:{}, forms:{ <unit>: { <col>: literal } } }],
 *     irregularCore: [{ inf, pic:null, forms:{…} }],          Face 4 (Phase 2)
 *     frames: [{ id, text, col, unit, fits:[inf…], subjectLiteral, pic:null }],
 *              `{form}` exactly once, the subject INSIDE the literal, <= 44 chars
 *     hunt: { nounHomographs: [...] },         Face 6 (Phase 2) guard
 *     strings: { 'G2-317': {title, instruction}, F2..F6: {…} }
 *   }
 *
 * EN data rules applied here (measured with node against the real files;
 * contact sheet out/dev/G2-317-pictures-sheet.png, EVERY picture opened
 * 2026-09-14 — see _work/G2-317-build.md):
 *   - `inf` = the 28 citation forms of data/b2/word-classes.js WORD_CLASSES.en.verbs,
 *     tiers copied from there; nothing added, nothing dropped;
 *   - mode 'tense' (the design's en rebuild: the base form is printed, the 3sg
 *     present `runs` and the past `ran` are the two gappable columns — L.1.1.c +
 *     L.2.1.d); `read` past === the infinitive → an ANCHOR by the design's rule (1),
 *     printed, never gapped;
 *   - irregular = 12/28 (run sleep eat sing read swim sit draw throw catch build hide),
 *     the pedagogy's count; `gradation:false` everywhere (a fi property);
 *   - pictures: the 9-picture ALLOWLIST only — run→activities/running · read→reading ·
 *     jump→jumping (a girl with a skipping rope, weak but opened) · dance→dancing ·
 *     sing→occupations/singer (a boy at a stand microphone WITH a guitar — dual cue,
 *     accepted per the critic) · wander→activities/hiking (the critic's en candidate:
 *     a hiker stepping over rocks). writing / baking / artist match no en verb in the
 *     word-classes bank (write / bake / paint are not citation forms there) and stay
 *     unassigned; athlete (a second runner) is DROPPED; swimming / singing / painting /
 *     playground are OBJECTS (goggles, microphone, palette, climbing frame) — refused;
 *   - frames: 17 (base) + 8 (Phase 2, f18-f25: the irregular core's lanes; fits = core +
 *     UNPICTURED verbs only, so the base's table-slot filter never sees them), every
 *     subject a SENTENCES.en name inside the literal, `{form}` once, <= 44 chars, no
 *     `dance / play / jump` noun token (hunt.nounHomographs), no free claim.
 */
'use strict';

const VERB_FORMS = {
  en: {
    head: 'Verb Forms: Today and Yesterday',
    mode: 'tense',
    band: 'G2',
    exemplar: 'today-yesterday',
    columns: [
      { key: 'pres', label: 'he/she today' },
      { key: 'past', label: 'yesterday' },
    ],
    units: [
      { key: 'today-yesterday', kind: 'tense', label: 'Today and Yesterday', band: 'G2' },
    ],
    poolMap: { regular: 'all' },   // L.2.1.d: the irregular past IS the Grade 2 target (design §2 ladder: en `all`)
    matchPersons: [],              // tense mode — Face 2 ships as match:'tense' (infinitive → past among past + present distractors)
    verbs: [
      { inf: 'run', group: 'irregular', irregular: true, gradation: false, tier: 1, pic: { theme: 'activities', noun: 'running' }, picOpened: true, labelOverride: {}, forms: { 'today-yesterday': { pres: 'runs', past: 'ran' } } },
      { inf: 'jump', group: 'regular', irregular: false, gradation: false, tier: 1, pic: { theme: 'activities', noun: 'jumping' }, picOpened: true, labelOverride: {}, forms: { 'today-yesterday': { pres: 'jumps', past: 'jumped' } } },
      { inf: 'sleep', group: 'irregular', irregular: true, gradation: false, tier: 1, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'sleeps', past: 'slept' } } },
      { inf: 'eat', group: 'irregular', irregular: true, gradation: false, tier: 1, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'eats', past: 'ate' } } },
      { inf: 'sing', group: 'irregular', irregular: true, gradation: false, tier: 1, pic: { theme: 'occupations', noun: 'singer' }, picOpened: true, labelOverride: {}, forms: { 'today-yesterday': { pres: 'sings', past: 'sang' } } },
      { inf: 'read', group: 'irregular', irregular: true, gradation: false, tier: 1, pic: { theme: 'activities', noun: 'reading' }, picOpened: true, labelOverride: {}, forms: { 'today-yesterday': { pres: 'reads', past: 'read' } } },
      { inf: 'swim', group: 'irregular', irregular: true, gradation: false, tier: 1, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'swims', past: 'swam' } } },
      { inf: 'play', group: 'regular', irregular: false, gradation: false, tier: 1, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'plays', past: 'played' } } },
      { inf: 'hop', group: 'regular', irregular: false, gradation: false, tier: 1, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'hops', past: 'hopped' } } },
      { inf: 'sit', group: 'irregular', irregular: true, gradation: false, tier: 1, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'sits', past: 'sat' } } },
      { inf: 'climb', group: 'regular', irregular: false, gradation: false, tier: 2, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'climbs', past: 'climbed' } } },
      { inf: 'laugh', group: 'regular', irregular: false, gradation: false, tier: 2, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'laughs', past: 'laughed' } } },
      { inf: 'draw', group: 'irregular', irregular: true, gradation: false, tier: 2, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'draws', past: 'drew' } } },
      { inf: 'wash', group: 'regular', irregular: false, gradation: false, tier: 2, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'washes', past: 'washed' } } },
      { inf: 'push', group: 'regular', irregular: false, gradation: false, tier: 2, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'pushes', past: 'pushed' } } },
      { inf: 'pull', group: 'regular', irregular: false, gradation: false, tier: 2, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'pulls', past: 'pulled' } } },
      { inf: 'throw', group: 'irregular', irregular: true, gradation: false, tier: 2, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'throws', past: 'threw' } } },
      { inf: 'catch', group: 'irregular', irregular: true, gradation: false, tier: 2, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'catches', past: 'caught' } } },
      { inf: 'whisper', group: 'regular', irregular: false, gradation: false, tier: 3, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'whispers', past: 'whispered' } } },
      { inf: 'wander', group: 'regular', irregular: false, gradation: false, tier: 3, pic: { theme: 'activities', noun: 'hiking' }, picOpened: true, labelOverride: {}, forms: { 'today-yesterday': { pres: 'wanders', past: 'wandered' } } },
      { inf: 'giggle', group: 'regular', irregular: false, gradation: false, tier: 3, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'giggles', past: 'giggled' } } },
      { inf: 'gather', group: 'regular', irregular: false, gradation: false, tier: 3, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'gathers', past: 'gathered' } } },
      { inf: 'listen', group: 'regular', irregular: false, gradation: false, tier: 3, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'listens', past: 'listened' } } },
      { inf: 'carry', group: 'regular', irregular: false, gradation: false, tier: 3, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'carries', past: 'carried' } } },
      { inf: 'build', group: 'irregular', irregular: true, gradation: false, tier: 3, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'builds', past: 'built' } } },
      { inf: 'dance', group: 'regular', irregular: false, gradation: false, tier: 2, pic: { theme: 'activities', noun: 'dancing' }, picOpened: true, labelOverride: {}, forms: { 'today-yesterday': { pres: 'dances', past: 'danced' } } },
      { inf: 'shout', group: 'regular', irregular: false, gradation: false, tier: 3, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'shouts', past: 'shouted' } } },
      { inf: 'hide', group: 'irregular', irregular: true, gradation: false, tier: 2, pic: null, picOpened: false, labelOverride: {}, forms: { 'today-yesterday': { pres: 'hides', past: 'hid' } } },
    ],
    irregularCore: [
      { inf: 'be', pic: null, forms: { 'today-yesterday': { pres: 'is', past: 'was' } } },
      { inf: 'have', pic: null, forms: { 'today-yesterday': { pres: 'has', past: 'had' } } },
      { inf: 'do', pic: null, forms: { 'today-yesterday': { pres: 'does', past: 'did' } } },
      { inf: 'go', pic: null, forms: { 'today-yesterday': { pres: 'goes', past: 'went' } } },
    ],
    frames: [
      { id: 'f01', text: 'Every day Mia {form} in the park.', col: 'pres', unit: 'today-yesterday', fits: ['run', 'jump', 'dance', 'sing', 'play', 'wander', 'hop'], subjectLiteral: 'Mia', pic: null },
      { id: 'f02', text: 'Today Ben {form} with his sister.', col: 'pres', unit: 'today-yesterday', fits: ['play', 'read', 'swim', 'run', 'dance', 'sing', 'draw', 'jump'], subjectLiteral: 'Ben', pic: null },
      { id: 'f03', text: 'Emma {form} every afternoon.', col: 'pres', unit: 'today-yesterday', fits: ['read', 'swim', 'play', 'dance', 'sing', 'draw', 'run', 'sleep'], subjectLiteral: 'Emma', pic: null },
      { id: 'f04', text: 'After school Leo {form} at home.', col: 'pres', unit: 'today-yesterday', fits: ['read', 'draw', 'play', 'sleep', 'sing', 'dance', 'build'], subjectLiteral: 'Leo', pic: null },
      { id: 'f05', text: 'On Mondays Anna {form} at the club.', col: 'pres', unit: 'today-yesterday', fits: ['swim', 'dance', 'sing', 'run', 'jump', 'climb'], subjectLiteral: 'Anna', pic: null },
      { id: 'f06', text: 'Tom {form} the big box every time.', col: 'pres', unit: 'today-yesterday', fits: ['push', 'pull', 'carry', 'hide'], subjectLiteral: 'Tom', pic: null },
      { id: 'f07', text: 'Lily {form} in the garden today.', col: 'pres', unit: 'today-yesterday', fits: ['run', 'jump', 'play', 'dance', 'read', 'sing', 'wander', 'draw'], subjectLiteral: 'Lily', pic: null },
      { id: 'f08', text: 'Max {form} at the pool every week.', col: 'pres', unit: 'today-yesterday', fits: ['swim', 'jump', 'play'], subjectLiteral: 'Max', pic: null },
      { id: 'f09', text: 'Yesterday Max {form} at the party.', col: 'past', unit: 'today-yesterday', fits: ['dance', 'sing', 'eat', 'laugh', 'play', 'jump', 'giggle', 'shout'], subjectLiteral: 'Max', pic: null },
      { id: 'f10', text: 'Last night Mia {form} for an hour.', col: 'past', unit: 'today-yesterday', fits: ['read', 'sleep', 'dance', 'sing', 'draw', 'play', 'build'], subjectLiteral: 'Mia', pic: null },
      { id: 'f11', text: 'On Sunday Ben {form} in the lake.', col: 'past', unit: 'today-yesterday', fits: ['swim'], subjectLiteral: 'Ben', pic: null },
      { id: 'f12', text: 'Yesterday Emma {form} the ball.', col: 'past', unit: 'today-yesterday', fits: ['throw', 'catch', 'hide', 'carry', 'push', 'pull'], subjectLiteral: 'Emma', pic: null },
      { id: 'f13', text: 'Last week Leo {form} in the forest.', col: 'past', unit: 'today-yesterday', fits: ['wander', 'run', 'play', 'hide', 'climb'], subjectLiteral: 'Leo', pic: null },
      { id: 'f14', text: 'Anna {form} at the picnic yesterday.', col: 'past', unit: 'today-yesterday', fits: ['eat', 'laugh', 'sing', 'dance', 'run', 'giggle'], subjectLiteral: 'Anna', pic: null },
      { id: 'f15', text: 'Tom {form} at the pool yesterday.', col: 'past', unit: 'today-yesterday', fits: ['swim', 'jump', 'play'], subjectLiteral: 'Tom', pic: null },
      { id: 'f16', text: 'Yesterday Lily {form} a tall tower.', col: 'past', unit: 'today-yesterday', fits: ['build', 'draw'], subjectLiteral: 'Lily', pic: null },
      { id: 'f17', text: 'Last night Max {form} on the sofa.', col: 'past', unit: 'today-yesterday', fits: ['sleep', 'read', 'sit'], subjectLiteral: 'Max', pic: null },
      // Phase 2 (faces): frames the irregular core (be have do go) can fill — Face 4 keeps its three lanes. Their `fits`
      // name ONLY core verbs + UNPICTURED verbs, so no base-table slot (pictured verbs only) ever sees them and the
      // base's lane RNG path stays byte-identical (tools/b3-baseline.js). Every subject a SENTENCES.en name; <= 44 chars.
      { id: 'f18', text: 'Today Mia {form} at home.', col: 'pres', unit: 'today-yesterday', fits: ['be', 'sleep', 'play', 'draw'], subjectLiteral: 'Mia', pic: null },
      { id: 'f19', text: 'Ben {form} a red bike.', col: 'pres', unit: 'today-yesterday', fits: ['have', 'push', 'pull', 'wash', 'hide'], subjectLiteral: 'Ben', pic: null },
      { id: 'f20', text: 'Every morning Leo {form} to school.', col: 'pres', unit: 'today-yesterday', fits: ['go'], subjectLiteral: 'Leo', pic: null },
      { id: 'f21', text: 'Anna {form} her homework after school.', col: 'pres', unit: 'today-yesterday', fits: ['do'], subjectLiteral: 'Anna', pic: null },
      { id: 'f22', text: 'Yesterday Tom {form} at the zoo.', col: 'past', unit: 'today-yesterday', fits: ['be', 'eat', 'laugh', 'draw', 'sit', 'play', 'giggle', 'shout'], subjectLiteral: 'Tom', pic: null },
      { id: 'f23', text: 'Last week Emma {form} to the sea.', col: 'past', unit: 'today-yesterday', fits: ['go'], subjectLiteral: 'Emma', pic: null },
      { id: 'f24', text: 'Yesterday Lily {form} a bad cold.', col: 'past', unit: 'today-yesterday', fits: ['have'], subjectLiteral: 'Lily', pic: null },
      { id: 'f25', text: 'Max {form} the dishes last night.', col: 'past', unit: 'today-yesterday', fits: ['do', 'wash'], subjectLiteral: 'Max', pic: null },
    ],
    hunt: { nounHomographs: ['dance', 'play', 'jump'] },
    strings: {
      'G2-317': {
        title: 'Verb Forms: Today and Yesterday',
        instruction: 'Look at the picture and read the verb. Write its today form and its yesterday form in the dashed boxes, then finish the sentences.',
      },
      F2: { title: 'Match the Verb to Its Past Form', instruction: 'Read each verb on the left. Draw a line to its yesterday form on the right — one line for each verb.' },
      F3: { title: 'Verb Forms in Sentences with Pictures', instruction: 'Look at the picture and read the verb in the chip. Write the form that fits the sentence in the dashed box.' },
      F4: { title: 'The Irregular Verbs: be, have, do, go', instruction: 'These verbs change a lot. Write the today form and the yesterday form of each one in the dashed boxes.' },
      F5: { title: 'Choose the Right Verb Form', instruction: 'Read the sentence. Three forms of the verb are printed under it. Circle the one that fits.' },
      F6: { title: 'Find the Verb, Write Its Base Form', instruction: 'Underline the verb in each sentence. Then write its base form in the dashed box.' },
    },
  },
};

module.exports = { VERB_FORMS };
