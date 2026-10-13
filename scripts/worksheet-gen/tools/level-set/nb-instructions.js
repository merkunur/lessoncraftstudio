/**
 * nb-instructions.js — Number Bonds Level Set (2026-10-13): the titles + printed instruction of the NEW faces K-414..417
 * (bonds of 6, 7, 8, 9 — each locale's own naming of its existing bond pages: Amigos del 5 → Amigos del 6, Splitsen van 5
 * → Splitsen van 6, Tallvenner til 20 → Tallvenner til 6 …) and the on-screen instruction. Applied by
 * tools/level-set/apply-nb-instructions.js into i18n/strings.<loc>.json and i18n/interactive-instructions.json
 * "number-bonds". The printed instruction is the one each locale already prints on its general bond pages (K-274).
 */
'use strict';
const NEW_FACES = { 'K-414': 6, 'K-415': 7, 'K-416': 8, 'K-417': 9 };
module.exports = {
  NEW_FACES,
  title: {
    en: (n) => `Number Bonds of ${n}`,
    de: (n) => `Die Zahl ${n} zerlegen`,
    es: (n) => `Amigos del ${n}`,
    fr: (n) => `Les compléments à ${n}`,
    it: (n) => (n === 8 ? "Amici dell'8" : `Amici del ${n}`),   // elision before a vowel (otto) — review 2026-10-13
    pt: (n) => `Amigos do ${n}`,
    nl: (n) => `Splitsen van ${n}`,
    sv: (n) => `Talkamrater till ${n}`,
    da: (n) => `Talvenner til ${n}`,
    no: (n) => `Tallvenner til ${n}`,
    fi: (n) => `Luvun ${n} hajotelmat`,
  },
  // the instruction of the locale's general bond page (K-274), so a teacher reads the same sentence on every bond page
  instructionFrom: 'K-274',
  // es (review 2026-10-13): "el círculo de puntos" (the DOTTED circle) reads as "the circle WITH dots" on the pages that
  // draw counting dots inside the circles (Amigos del 5 / del 10 con puntos) — every es bond page now says "vacío"; the
  // live es pages are republished in place with it
  esInstruction: 'Mira cada esquema. Escribe el número que falta en el círculo vacío.',
  esFaces: ['K-243', 'K-273', 'K-274', 'K-275', 'K-276', 'K-277'],
  // sv K-274 level 3 (review 2026-10-13): some bonds there miss the WHOLE, and "Dela upp talet i två delar" (split the
  // number) is false on them — level 3 prints its own line (the other locales keep their K-274 line, true there)
  k274L3sv: 'Talet består av två delar. Skriv talet som fattas i den streckade cirkeln.',
  screen: {
    screen: {
      en: 'Look at each number bond. Tap the missing number.',
      de: 'Schau dir jede Zahlzerlegung an. Tippe die fehlende Zahl an.',
      es: 'Mira cada esquema. Toca el número que falta.',
      fr: 'Observe chaque schéma. Touche le nombre qui manque.',
      it: 'Guarda ogni schema e tocca il numero che manca.',
      pt: 'Observe cada esquema e toque no número que falta.',
      nl: 'Kijk naar elke splitsing. Tik op het getal dat mist.',
      sv: 'Titta på varje uppdelning. Tryck på talet som fattas.',
      da: 'Find det tal, der mangler, og tryk på det.',
      no: 'Se på delene og det hele. Trykk på tallet som mangler.',
      fi: 'Katso jokaista hajotelmaa ja napauta puuttuvaa lukua.',
    },
  },
};
