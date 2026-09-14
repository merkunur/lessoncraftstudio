/**
 * data/b3/feelings.js — the K-319 `feelings` bank (family key `feelings`,
 * ruled 2026-09-14: the THEME axis owns `emotions`; the picture directory the
 * faces come from is still the `emotions` theme).
 *
 * EN block HAND-AUTHORED (2026-09-14, K-319 base build); the ten non-EN
 * blocks are GENERATED later by tools/apply-b3-locale.js from
 * i18n/.draft-b3-<loc>.json (native panels author word / wordF / capital /
 * alt, a scene veto, bins, checkin, strings). `data/` is gitignored — the
 * reviewer force-adds this module.
 *
 * Shape (design file §5):
 *   FEELINGS[loc] = {
 *     feelings: [{ id, word, wordF, invariant, capital, alt?, override?,
 *                  face:{theme:'emotions', noun}, matchable, valence, confusable, faceOpened }],
 *     scenes:   [{ id, objects:[{theme, noun}], feeling, alsoPlausible, vetoable, sceneOpened, alt:{en} }],
 *     veto:     [],                    a locale veto; apply- propagates it to ALL 11 (locale-neutral seed)
 *     bins:     { good:{label}, bad:{label} },
 *     checkin:  { today, draw, because, helps },
 *     strings:  { 'K-319':{title, instruction}, 'K-331'..'K-335':{title, instruction} }
 *               (the faces, keyed by their allocated ids: F1 K-331 scene ·
 *               F2 K-332 draw · F3 K-333 valence sort · F4 K-334 choice ·
 *               F5 K-335 check-in; Phase 2, 2026-09-14)
 *   `checkin.labelPx` (optional, 17|18): a panel whose widest feeling word
 *   overflows the 94 px F5 tile label at 18 declares 17 for its locale.
 *   }
 *   `scenes`, `face`, `matchable`, `valence`, `confusable` are LOCALE-NEUTRAL
 *   (copied from en by apply-); a locale may only VETO a scene.
 *
 * EN data rules applied here (every picture OPENED 2026-09-14, contact sheets
 * k319-faces.png / k319-cues.png in the build report):
 *   - `matchable:true` = exactly the six faces whose expression a K child can
 *     read without the word: happy sad angry scared surprised tired;
 *   - the five valence-only faces (merry content excited / capricious
 *     disgusted) carry `matchable:false` + `valence` for the F3 sort face and
 *     are NEVER printed as words (excited = happy with lashes: two right
 *     answers; merry / content = a second happy; capricious = crying;
 *     disgusted = pain / yuck); bored, confused, shy, sceptical are absent
 *     (not unmistakable in valence either);
 *   - `word` = the vocab citation form, lower-cased (adjectives are never
 *     capitalised; en has no capital rule); `alt` records the home word the
 *     school word displaces ("mad" → "angry");
 *   - `confusable` = the one near pair the opened art has (scared ↔ surprised);
 *     d1 excludes both, F4 d2 keeps them out of one row;
 *   - scenes are the design's GLOBAL table: teddy_bear pinned to `toys` (its
 *     vocabKey is null and it also lives in two BW dirs), bed pinned to
 *     `furniture` (hospital/bed is a wheeled hospital bed, opened), syringe
 *     `vetoable` (a locale may veto it; the veto is then global).
 */
'use strict';
const FEELINGS = {
  en: {
    feelings: [
      { id: 'happy', word: 'happy', wordF: null, invariant: true, capital: false, alt: ['glad'], face: { theme: 'emotions', noun: 'happy' }, matchable: true, valence: 'good', confusable: [], faceOpened: true },
      { id: 'sad', word: 'sad', wordF: null, invariant: true, capital: false, alt: [], face: { theme: 'emotions', noun: 'sad' }, matchable: true, valence: 'bad', confusable: [], faceOpened: true },
      { id: 'angry', word: 'angry', wordF: null, invariant: true, capital: false, alt: ['mad'], face: { theme: 'emotions', noun: 'angry' }, matchable: true, valence: 'bad', confusable: [], faceOpened: true },
      { id: 'scared', word: 'scared', wordF: null, invariant: true, capital: false, alt: ['afraid'], face: { theme: 'emotions', noun: 'scared' }, matchable: true, valence: 'bad', confusable: ['surprised'], faceOpened: true },
      { id: 'surprised', word: 'surprised', wordF: null, invariant: true, capital: false, alt: [], face: { theme: 'emotions', noun: 'surprised' }, matchable: true, valence: null, confusable: ['scared'], faceOpened: true },
      { id: 'tired', word: 'tired', wordF: null, invariant: true, capital: false, alt: ['sleepy'], face: { theme: 'emotions', noun: 'tired' }, matchable: true, valence: null, confusable: [], faceOpened: true },
      // valence-only faces (F3 "feels good / feels bad"): never printed as a word
      { id: 'merry', word: 'merry', wordF: null, invariant: true, capital: false, alt: [], face: { theme: 'emotions', noun: 'merry' }, matchable: false, valence: 'good', confusable: ['happy'], faceOpened: true },
      { id: 'content', word: 'content', wordF: null, invariant: true, capital: false, alt: [], face: { theme: 'emotions', noun: 'content' }, matchable: false, valence: 'good', confusable: ['happy'], faceOpened: true },
      { id: 'excited', word: 'excited', wordF: null, invariant: true, capital: false, alt: [], face: { theme: 'emotions', noun: 'excited' }, matchable: false, valence: 'good', confusable: ['happy'], faceOpened: true },
      { id: 'capricious', word: 'capricious', wordF: null, invariant: true, capital: false, alt: [], face: { theme: 'emotions', noun: 'capricious' }, matchable: false, valence: 'bad', confusable: ['sad'], faceOpened: true },
      { id: 'disgusted', word: 'disgusted', wordF: null, invariant: true, capital: false, alt: [], face: { theme: 'emotions', noun: 'disgusted' }, matchable: false, valence: 'bad', confusable: [], faceOpened: true },
    ],
    scenes: [
      { id: 'present', objects: [{ theme: 'christmas', noun: 'present' }], feeling: 'happy', alsoPlausible: ['surprised'], vetoable: false, sceneOpened: true, alt: { en: 'a wrapped present' } },
      { id: 'balloon', objects: [{ theme: 'toys', noun: 'balloon' }], feeling: 'happy', alsoPlausible: [], vetoable: false, sceneOpened: true, alt: { en: 'a green balloon' } },
      { id: 'medal', objects: [{ theme: 'accessories', noun: 'medal' }], feeling: 'happy', alsoPlausible: ['surprised'], vetoable: false, sceneOpened: true, alt: { en: 'a gold medal' } },
      { id: 'teddy', objects: [{ theme: 'toys', noun: 'teddy_bear' }], feeling: 'happy', alsoPlausible: ['tired'], vetoable: false, sceneOpened: true, alt: { en: 'a teddy bear' } },
      { id: 'thunderstorm', objects: [{ theme: 'weather', noun: 'thunderstorm' }], feeling: 'scared', alsoPlausible: ['surprised'], vetoable: false, sceneOpened: true, alt: { en: 'a thunderstorm' } },
      { id: 'syringe', objects: [{ theme: 'hospital', noun: 'syringe' }], feeling: 'scared', alsoPlausible: ['sad'], vetoable: true, sceneOpened: true, alt: { en: 'a syringe' } },
      { id: 'bed', objects: [{ theme: 'furniture', noun: 'bed' }], feeling: 'tired', alsoPlausible: [], vetoable: false, sceneOpened: true, alt: { en: 'a bed' } },
      { id: 'pillow-moon', objects: [{ theme: 'around the house', noun: 'pillow' }, { theme: 'space', noun: 'moon' }], feeling: 'tired', alsoPlausible: ['scared'], vetoable: false, sceneOpened: true, alt: { en: 'a pillow and the moon' } },
      { id: 'pajamas-moon', objects: [{ theme: 'clothing', noun: 'pajamas' }, { theme: 'space', noun: 'moon' }], feeling: 'tired', alsoPlausible: ['scared'], vetoable: false, sceneOpened: true, alt: { en: 'pajamas and the moon' } },
    ],
    veto: [],
    bins: { good: { label: 'Feels good' }, bad: { label: 'Feels bad' } },
    checkin: { today: 'Today I feel…', draw: 'Draw your face', because: 'because', helps: null },
    strings: {
      'K-319': {
        title: 'Feelings: Match the Face to the Word',
        instruction: 'Draw a line from each face to the feeling word that says how it feels.',
      },
      // the five faces (Phase 2); F1 cards print no text, so the instruction carries "how you would feel"
      'K-331': { title: 'How Do You Feel? Circle the Face', instruction: 'Look at the picture, think how you would feel, and circle the face that matches.' },
      'K-332': { title: 'Draw the Feeling Face', instruction: 'Read the feeling word and draw a face that shows it in the empty circle.' },
      'K-333': { title: 'Feels Good or Feels Bad? Sort the Faces', instruction: 'Draw a line from each face to the box that says whether the feeling feels good or bad.' },
      'K-334': { title: 'Which Face Shows the Feeling?', instruction: 'Read the feeling word and circle the one face in the row that shows it.' },
      'K-335': { title: 'How Do I Feel Today?', instruction: 'Circle the face that shows how you feel today, then draw your own face.' },
    },
  },
};
module.exports = { FEELINGS };
