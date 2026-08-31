/**
 * Native sentence FRAME BANKS for picture word problems (G1-213) — the
 * lcs-grammar design philosophy: fixed native-authored frames with exactly
 * three slot types ({name} proper name · {n1}/{n2} digits · {noun} noun
 * form), NO adjectives, NO definite articles, so stored vocab forms drop in
 * unchanged with zero agreement machinery. Result-unknown structures only
 * at this band (1.OA.A.1 core).
 *
 * Per locale: `names` (the locale's own K-1 name stock), `frames.add` +
 * `frames.sub`, and `nounForm`: 'plural' uses the vocab plural as-is;
 * 'partitive' (fi) requires a curated per-noun form table (`nounForms`) —
 * build REFUSES a noun with no entry (never guesses morphology).
 * The 10 non-EN banks are authored by native ensembles at the fan.
 */
'use strict';

const FRAMES = {
  en: {
    nounForm: 'plural',
    nounCase: 'lower', // vocab labels are Title Case; mid-sentence English lowercases (de will set 'keep' — German capitalizes nouns)
    names: ['Mia', 'Ben', 'Emma', 'Leo', 'Anna', 'Tom', 'Lily', 'Max'],
    frames: {
      add: [
        '{name} has {n1} {noun}. Then {name} finds {n2} more. How many {noun} are there now?',
        'There are {n1} {noun} in the box. {name} puts in {n2} more. How many {noun} are in the box now?',
        '{name} sees {n1} {noun}. Then {name} sees {n2} more. How many {noun} does {name} see in all?',
        '{name} counts {n1} {noun}. A friend brings {n2} more. How many {noun} are there in all?',
      ],
      sub: [
        '{name} has {n1} {noun}. {name} gives {n2} away. How many {noun} are left?',
        'There are {n1} {noun} on the table. {n2} fall down. How many {noun} are left?',
        '{name} collects {n1} {noun}. Then {name} loses {n2}. How many {noun} are left?',
      ],
    },
  },
};

module.exports = { FRAMES };
