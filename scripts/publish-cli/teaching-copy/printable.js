/**
 * Teaching blocks for the printable worksheet-generator decks.
 *
 * THIS MODULE AUTHORS ALMOST NOTHING, and that is the point. The other families needed a
 * native practitioner per locale because nobody had ever written down what those sheets
 * teach. Here it was written down when the worksheets were designed, and it has been sitting
 * in the generator's own i18n files ever since:
 *
 *   typeTitle      strings.<locale>.json      "Zählen und Einkreisen"
 *   instruction    strings.<locale>.json      "Zähle die Bilder in jedem Kästchen. Kreise die
 *                                              richtige Zahl ein."
 *   skillSentence  skill-sentences.<locale>   "Das Zählen freundlicher Bildgruppen schult die
 *                                              Eins-zu-eins-Zuordnung und legt das Fundament
 *                                              für ein sicheres Zahlverständnis."
 *
 * So the block is an ASSEMBLY, and the only strings it adds are the frame: the two section
 * headings and the classroom-use sentences, both already authored per locale for the other
 * families and imported rather than rewritten.
 *
 * WHY THIS FAMILY CANNOT HAVE THE PROBLEM code-addition HAD. There are ~240 distinct worksheet
 * types, each with its own title and instruction, so two blocks are only similar when they are
 * the same worksheet type on a different theme — and then the pictures differ. The
 * differentiation is structural rather than something the copy has to work for.
 *
 * NOTHING IS QUOTED THAT A CHILD MUST WORK OUT. These decks are printable_only: no answer key,
 * and mostly no exercises array at all. The only numbers that reach the page are the grade
 * band and the difficulty step.
 */
'use strict';

var TF = require('./three-families.js');
var HEADINGS = require('./picture-arith.js').headings;

/** The locales that have both a frame (use sentences) and generator strings. */
var LOCALES = TF.locales;

function digits(ordinal, radices) {
  var out = [], n = ordinal;
  for (var i = 0; i < radices.length; i++) { out.push(n % radices[i]); n = Math.floor(n / radices[i]); }
  return out;
}

function build(f, ordinal, locale) {
  var frame = TF.frameFor(locale);
  if (!frame) return null;

  /* An unresolved worksheet type yields NO block rather than a generic one — the same
   * defensive skip the other families use for an unauthored mode (§17.8.11). Coverage was
   * measured at 100%, so this should never fire; if it starts firing, the generator has added
   * a type whose strings have not been fanned out yet, and that is worth seeing. */
  if (!f.typeTitle || !f.instruction) return null;

  var headings = HEADINGS(locale);
  var d = digits(ordinal, [frame.uses.length, 3]);

  var nouns = (f.depictedNouns || []).slice(0, 4 + (d[1] % 3)).map(function (n) {
    return String(n).replace(/\s+\d+$/, '');
  }).filter(function (n, i, a) { return n && a.indexOf(n) === i; });

  /* Title first, then what the child does, then why it is worth doing. The title is the
   * worksheet's own name and the strongest signal on the page that this sheet is not the one
   * next to it. */
  var parts = [f.typeTitle + ' — ' + f.instruction];
  if (f.skillSentence) parts.push(f.skillSentence);
  if (nouns.length) parts.push(frame.objects(joinList(nouns, locale)));

  return {
    shapes: { block1: 'pr/' + f.worksheetType + '/' + (f.difficultyLabel || '-'), block2: null, block3: 'U' + d[0] },
    namedObjects: nouns,
    // The easier/harder set of the same worksheet type. It is already in the deck's own slug,
    // and without it two same-type sheets have identical blocks.
    chipRange: f.difficultyLabel || null,
    chipMode: f.typeTitle,
    chipTen: null,
    chipLevel: null,
    taskList: '',
    heading1: headings[0],
    heading2: null,
    heading3: headings[1],
    block1: parts.join(' '),
    block2: null,
    block3: frame.uses[d[0]],
    // No answer-key sentence, for the reason given in three-families.js: it is the most
    // repeated string in the system and the page already links the PDF.
    blockExtras: null,
  };
}

var CONJUNCTION = {
  en: ' and ', de: ' und ', nl: ' en ', fr: ' et ', es: ' y ', it: ' e ',
  pt: ' e ', sv: ' och ', da: ' og ', no: ' og ', fi: ' ja ',
};

function joinList(a, locale) {
  if (a.length < 2) return a[0] || '';
  return a.slice(0, -1).join(', ') + (CONJUNCTION[locale] || ' & ') + a[a.length - 1];
}

module.exports = { build: build, locales: LOCALES };
