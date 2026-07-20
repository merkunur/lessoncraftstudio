/**
 * French teaching-block copy for math-puzzle deck pages.
 *
 * From a CP/CE1 practitioner ruling. Sibling of de.js / en.js / nl.js in structure only —
 * the content rules are French, and they cut across the other locales rather than following
 * any one of them:
 *
 *   range   TRUE MAXIMUM, like English, NOT a band like German. French has no Zahlenraum
 *           convention: the programmes use 10 / 20 / 100 as goals, not as labels. Printing
 *           "jusqu'a 20" on a sheet whose largest number is 23 is simply false to a French
 *           teacher. Round forms only when the max IS 10 or 20.
 *   ages    FORBIDDEN, like German, unlike English. France identifies by classe (CP, CE1),
 *           never by age. "pour les 6-7 ans" marks the page as foreign.
 *
 * THE COLUMN-ARITHMETIC TRAP — now confirmed in four languages.
 * The obvious word for crossing the ten is the WRITTEN-ALGORITHM word, and it is wrong in
 * all of them: en "regrouping", fr "avec retenue", es "con llevada", it "con il riporto".
 * Each practitioner flagged it independently and unprompted. Here the child calculates
 * 13 - 8 mentally; there are no columns and nothing is carried. The correct French is
 * `passage de la dizaine`.
 *
 * OTHER REJECTIONS: `probleme` means a word problem, not a calculation — a single cell is a
 * `calcul`. `feuille de travail` is a calque of worksheet; the French word is `fiche`.
 * `espace numerique` is a calque of the German. `operations mixtes` is a calque.
 *
 * REGISTER: vous, never tu. `les eleves` (les enfants is parent register). The adult is
 * `l'enseignant`, or addressed directly as `vos eleves`. Never maitre/maitresse in writing.
 *
 * NEVER claim `conforme aux programmes officiels` or cite the socle commun (a cycle-level
 * scale, never a single sheet). The permitted form is a link to `les attendus de fin de CP`
 * and only where the content genuinely supports it.
 */
'use strict';

var MODE_PL = {
  addition: 'additions',
  subtraction: 'soustractions',
  mixed: 'additions et soustractions mélangées',
};

var SKILL = {
  addition: "l'addition",
  subtraction: 'la soustraction',
  mixed: 'le passage d’une opération à l’autre',
};

/** True maximum, always. Round forms only when the maximum genuinely is 10 or 20. */
function range(max) {
  return {
    phrase: 'jusqu’à ' + max,
    chip: 'Nombres jusqu’à ' + max,
    sentence: max === 10
      ? 'Tous les nombres restent jusqu’à 10.'
      : 'Le plus grand nombre de la fiche est ' + max + '.',
  };
}

/** Direction follows the operation: a crossing here is always a subtraction. */
function ten(tenCase, reg, ex) {
  var w = function (t, e) { return e ? t + ' (' + e + ')' : t; };
  var c = reg.crossesTen;
  switch (tenCase) {
    case 'T0':
      return { clause: 'sans passage de la dizaine',
        sentence: 'Aucun calcul ne franchit la dizaine.' };
    case 'T1':
      return { clause: 'sans passage de la dizaine',
        sentence: 'Aucun calcul ne franchit la dizaine. '
          + w('Un calcul complète exactement à dix', ex.making) + '.' };
    case 'T2':
      return { clause: 'sans passage de la dizaine',
        sentence: 'Aucun calcul ne franchit la dizaine ; '
          + w('quelques-uns complètent exactement à dix', ex.making) + '.' };
    case 'T3':
      return { clause: 'sans passage de la dizaine, avec des compléments à dix',
        sentence: 'La dizaine n’est pas franchie. Plusieurs calculs complètent à dix et '
          + 'travaillent donc les compléments à dix.' };
    case 'T4':
      return { clause: 'en majorité sans passage de la dizaine',
        sentence: 'La plupart des calculs restent dans la dizaine ; '
          + w('quelques-uns la franchissent', ex.crossing) + '.' };
    case 'T5':
      return { clause: 'avec et sans passage de la dizaine',
        sentence: w('Environ la moitié des calculs franchissent la dizaine', ex.crossing)
          + ' ; les autres restent dans la dizaine.' };
    case 'T6':
      return { clause: 'en majorité avec passage de la dizaine',
        sentence: w('Le passage de la dizaine domine : ' + c + ' calculs sur neuf le demandent', ex.crossing) + '.' };
    default:
      return { clause: 'entièrement avec passage de la dizaine',
        sentence: w('Chacun des neuf calculs franchit la dizaine', ex.crossing) + '.' };
  }
}

var BLOCK1 = {
  S1: function (f, s) {
    return 'Neuf ' + s.modePl + ' dans une grille 3x3, ' + s.range.phrase + '. ' + s.ten.sentence;
  },
  S2: function (f, s) {
    return 'Cette fiche travaille ' + s.skill + ' ' + s.range.phrase + '. ' + s.ten.sentence;
  },
  S3: function (f, s) {
    return s.ex[0] + ' et ' + s.ex[1] + ' : ' + s.range.sentence + ' ' + s.ten.sentence;
  },
  S4: function (f, s) {
    return 'Pour la phase d’entraînement, une fois le passage de la dizaine installé : '
      + 'les neuf ' + s.modePl + ' vont ' + s.range.phrase + '. ' + s.ten.sentence;
  },
  S5: function (f, s) {
    return 'Additions et soustractions alternent d’une case à l’autre : ' + s.ex[0]
      + ', puis ' + s.ex[1] + '. L’élève doit donc relire le signe à chaque fois. '
      + s.range.sentence;
  },
};

var BLOCK2 = {
  B1: function () {
    return 'Chaque bonne réponse pose une pièce du puzzle : l’image ne se reconstitue que '
      + 'si les neuf calculs sont justes. L’élève voit donc immédiatement son erreur, sans '
      + 'correction de votre part.';
  },
  B2: function () {
    return 'La correction est portée par la fiche elle-même. Une pièce qui ne s’emboîte pas '
      + 'signale le calcul à reprendre, ce qui permet de la donner en autonomie.';
  },
  B3: function () {
    return 'Le retour vient du matériel et non de l’adulte. L’élève repère l’erreur '
      + 'pendant qu’il calcule, et non le lendemain à la correction.';
  },
  B4: function () {
    return 'La pièce qui ne convient pas indique lequel des neuf calculs doit être repris — '
      + 'elle ne dit pas pourquoi. Faire verbaliser deux procédures suffit à le savoir.';
  },
};

var BLOCK3 = {
  C1: function () {
    return 'À utiliser en autonomie ou en atelier, après avoir travaillé la notion en classe. '
      + 'Aucune correction n’est à prévoir.';
  },
  C2: function () {
    return 'Pratique pour un remplacement ou une fin de séance : la consigne tient en une '
      + 'phrase et personne n’a besoin de corriger.';
  },
  C3: function () {
    return 'En binôme, deux élèves posent une pièce à tour de rôle et verbalisent leur '
      + 'procédure — 23 moins 13, j’enlève d’abord 3.';
  },
  C4: function () {
    return 'À donner à la maison une fois la procédure installée en classe : personne n’a '
      + 'besoin de connaître la méthode pour vérifier.';
  },
};

var FAMILY = {
  T0: ['S1', 'S2'], T1: ['S3', 'S1'], T2: ['S3', 'S2'], T3: ['S3', 'S1'],
  T4: ['S2', 'S1'], T5: ['S2', 'S1'], T6: ['S2', 'S4'], T7: ['S2', 'S4'],
};

function digits(ordinal, radices) {
  var out = [], n = ordinal;
  for (var i = 0; i < radices.length; i++) { out.push(n % radices[i]); n = Math.floor(n / radices[i]); }
  return out;
}

function build(f, ordinal) {
  var reg = f.regrouping || {};
  var mode = (reg.additions > 0 && reg.subtractions > 0) ? 'mixed'
    : (reg.subtractions > 0 ? 'subtraction' : 'addition');
  var max = f.band.maxSeen;
  var r = range(max);
  var t = ten(f.tenCase, reg, f.tenExample || {});
  var ops = (f.operations || []).map(function (o) { return o.text; });

  var s = { modePl: MODE_PL[mode], skill: SKILL[mode], max: max, range: r, ten: t,
    ex: f.examples || [], theme: f.themeName || null };

  var fam = FAMILY[f.tenCase] || ['S1', 'S2'];
  var b2 = ['B1', 'B2', 'B3', 'B4'];
  var uses = (max > 20) ? ['C3', 'C1'] : (max <= 10 ? ['C1', 'C4'] : ['C1', 'C2', 'C3']);
  var d = digits(ordinal, [fam.length, b2.length, uses.length, 3]);
  var key1 = (mode === 'mixed' && s.ex.length >= 2) ? 'S5' : fam[d[0]];
  var elimIdx = (mode === 'mixed' && s.ex.length >= 2) ? (ordinal % 3) : d[3];

  var CAVEATS = [
    ' Les neuf résultats vont de 2 à 10, une fois chacun : un élève qui a placé six pièces '
      + 'peut déduire les dernières. Faites écrire les résultats avant de placer les pièces.',
    ' Comme chaque résultat de 2 à 10 n’apparaît qu’une fois, les derniers calculs '
      + 'peuvent se deviner. Un rapide passage à l’oral lève le doute.',
    ' Certains élèves assemblent d’après la forme des pièces plutôt que d’après le '
      + 'résultat. Faire calculer les neuf avant de placer évite ce contournement.',
  ];

  // Verified across the corpus: a crossing is always a subtraction, so addition over ten is
  // never practised on this worksheet type.
  var SCOPE = [
    ' Le passage de la dizaine n’est travaillé ici qu’en soustraction ; les additions '
      + 'au-delà de dix n’apparaissent pas sur ce type de fiche.',
    ' Seules les soustractions franchissent la dizaine sur cette fiche ; pour l’addition '
      + 'au-delà de dix, il faut une autre fiche.',
  ];

  // The CP tag is wrong above 20: subtraction with a crossing only settles from period 4 of
  // CP. Stated as usage advice, tag untouched.
  var levelNote = (max > 20)
    ? ' Cette fiche s’adresse plutôt à des élèves de fin de CP ou de début de CE1 : la '
      + 'soustraction avec passage de la dizaine ne s’installe qu’à partir de la '
      + 'période 4 du CP.'
    : '';

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: r.chip,
    chipMode: mode === 'addition' ? 'Addition'
      : (mode === 'subtraction' ? 'Soustraction' : 'Addition et soustraction'),
    chipTen: t.clause,
    taskList: ops.length ? 'Les neuf calculs de cette fiche : ' + ops.join(', ') + '.' : '',
    heading1: 'Ce que cette fiche travaille',
    heading2: 'Pourquoi elle s’auto-corrige',
    heading3: 'Comment l’utiliser en classe',
    block1: BLOCK1[key1](f, s) + levelNote,
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    blockExtras: 'Le corrigé PDF donne les neuf résultats — pratique pour vérifier en un coup '
      + 'd’œil que le niveau convient avant d’imprimer.'
      + CAVEATS[elimIdx % CAVEATS.length]
      + (reg.crossesTen > 0 ? SCOPE[ordinal % SCOPE.length] : '')
      + (s.theme ? ' L’image à reconstituer porte sur le thème ' + s.theme + '.' : ''),
  };
}

module.exports = { build: build, range: range, ten: ten };
