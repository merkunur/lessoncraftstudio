/**
 * Finnish teaching-block copy for math-puzzle deck pages. From an alkuopetus ruling.
 * [NSR-FLAG] per §17.5.1.
 *
 * FINNISH REQUIRED A DIFFERENT ARCHITECTURE, not a translation of the shared slot frame.
 * Finnish inflects, so a numeral or a name cannot simply be dropped into a sentence:
 *
 *   NEVER `20 asti`   — "asti / saakka" governs the ILLATIVE, so it would have to be
 *                       `kahteenkymmeneen asti`, and 23 becomes
 *                       `kahteenkymmeneenkolmeen asti`. Leaving the digit uninflected is
 *                       visibly careless. The frame is abandoned entirely.
 *   INSTEAD  `Lukualue 0-23.`  — nominative, invariant, correct for every number.
 *   THEME    `Teemana {X}.`    — the Finnish equivalent of German `zum Thema X`: essive
 *                       `teemana` leaves the theme name in the nominative. Avoid
 *                       `aiheesta Kesä` (elative would inflect the name) and
 *                       `Kesä-teemainen` (compound trap).
 *   COUNTS   `Yhdeksän laskua.` as its own sentence rather than an inflected phrase.
 *
 * THE MOST IMPORTANT CORRECTION IN THE WHOLE FAN-OUT:
 * `kymmenylitys` is the ADDITION term — 8 + 5 goes OVER ten. A subtraction 13 - 8 goes
 * UNDER ten, which is `kymmenalitus`. Because every answer here is 2-10, crossing only ever
 * happens in subtraction, so the correct word for this entire worksheet type is
 * **kymmenalitus**. My own plan file proposed `kymmenylitys`; it would have been wrong on
 * all 145 Finnish pages.
 *
 * The column trap does not apply: Finnish keeps carrying lexically separate as
 * `muistinumero` (allekkain laskeminen), so the mental-arithmetic term is safe.
 *
 * RANGE: TRUE MAXIMUM. Finnish has no Zahlenraum convention that would round 17 up to 20 —
 * a teacher picks the sheet precisely to see how far it goes.
 *
 * REGISTER: sinä. `oppilaat` for school-age (`lapset` only for esiopetus). The adult is
 * `opettaja`, never `ohjaaja` (that reads as varhaiskasvatus or a club).
 *
 * OPS 2014 may be cited ONLY with a content area, never a goal level: the permitted form is
 * "Liittyy OPS 2014:n sisältöalueeseen S2 Luvut ja laskutoimitukset." Never OPS-hyväksytty.
 */
'use strict';

var MODE_PL = { addition: 'yhteenlaskua', subtraction: 'vähennyslaskua',
  mixed: 'yhteen- ja vähennyslaskua sekaisin' };
var SKILL = { addition: 'yhteenlaskua', subtraction: 'vähennyslaskua',
  mixed: 'laskutavan vaihtamista' };

/** Invariant nominative frame — see the header note on why "asti" is unusable. */
function range(max) {
  return {
    phrase: 'lukualueella 0-' + max,
    chip: 'Lukualue 0-' + max,
    sentence: 'Lukualue 0-' + max + '.',
  };
}

/**
 * Crossing DOWNWARD is kymmenalitus, and on this worksheet type that is the only crossing
 * that can occur. `kymmenylitys` is reserved for its true (addition) meaning.
 */
function ten(tenCase, reg, ex) {
  var w = function (t, e) { return e ? t + ' (esimerkiksi ' + e + ')' : t; };
  var c = reg.crossesTen;
  switch (tenCase) {
    case 'T0': return { clause: 'ilman kymmenalitusta', sentence: 'Kymmenen alle ei mennä.' };
    case 'T1': return { clause: 'ilman kymmenalitusta',
      sentence: 'Kymmenen alle ei mennä. ' + w('Yksi lasku osuu tasan kymmeneen', ex.making) + '.' };
    case 'T2': return { clause: 'ilman kymmenalitusta',
      sentence: 'Kymmenen alle ei mennä; ' + w('muutama lasku osuu tasan kymmeneen', ex.making) + '.' };
    case 'T3': return { clause: 'ilman kymmenalitusta, mutta kymmenpareja harjoitellen',
      sentence: 'Kymmenen alle ei mennä. Useampi lasku osuu tasan kymmeneen ja harjoittaa kymmenpareja.' };
    case 'T4': return { clause: 'enimmäkseen ilman kymmenalitusta',
      sentence: 'Useimmat laskut pysyvät kymmenen sisällä; ' + w('muutamassa mennään kymmenen ali', ex.crossing) + '.' };
    case 'T5': return { clause: 'osin kymmenalituksella',
      sentence: w('Noin puolessa laskuista mennään kymmenen ali', ex.crossing)
        + ', loput pysyvät kymmenen sisällä.' };
    case 'T6': return { clause: 'enimmäkseen kymmenalituksella',
      sentence: w('Kymmenalitus on keskiössä: ' + c + ' laskussa yhdeksästä mennään kymmenen ali', ex.crossing) + '.' };
    default: return { clause: 'kauttaaltaan kymmenalituksella',
      sentence: w('Kaikissa yhdeksässä laskussa mennään kymmenen ali', ex.crossing) + '.' };
  }
}

var BLOCK1 = {
  S1: function (f, s) { return 'Yhdeksän laskua 3x3-ruudukossa. ' + s.range.sentence + ' ' + s.ten.sentence; },
  S2: function (f, s) { return 'Tehtävä harjoittaa ' + s.skill + ' ' + s.range.phrase + '. ' + s.ten.sentence; },
  S3: function (f, s) { return s.ex[0] + ' ja ' + s.ex[1] + '. ' + s.range.sentence + ' ' + s.ten.sentence; },
  S4: function (f, s) { return 'Harjoitteluvaiheeseen sen jälkeen, kun kymmenalitus on käyty läpi. '
    + s.range.sentence + ' ' + s.ten.sentence; },
  S5: function (f, s) { return 'Plus ja miinus vaihtelevat ruudusta toiseen: ' + s.ex[0] + ', sitten '
    + s.ex[1] + '. Oppilaan on luettava laskumerkki joka kerta. ' + s.range.sentence; },
};

var BLOCK2 = {
  B1: function () { return 'Oikea vastaus asettaa yhden palapelin palan, joten kuva täydentyy vasta kun '
    + 'kaikki yhdeksän laskua ovat oikein — oppilas huomaa virheen itse, eikä sinun tarvitse tarkistaa.'; },
  B2: function () { return 'Tarkistus on tehtävässä itsessään. Pala joka ei sovi kertoo, mikä lasku pitää '
    + 'katsoa uudelleen, joten tehtävä toimii myös silloin kun ohjaat toista ryhmää.'; },
  B3: function () { return 'Palaute tulee materiaalista eikä opettajalta: virhe näkyy laskemisen aikana, '
    + 'ei vasta seuraavana päivänä.'; },
  B4: function () { return 'Sopimaton pala kertoo, mikä yhdeksästä laskusta pitää katsoa uudelleen — ei '
    + 'sitä, miksi se meni väärin. Pyydä oppilasta kertomaan, miten hän laski.'; },
};

var BLOCK3 = {
  C1: function () { return 'Käytä itsenäisenä työnä yhteisen läpikäynnin jälkeen, lukusuora tai '
    + 'kymmenentangot lähettyvillä.'; },
  C2: function () { return 'Sopii sijaisen tunnille tai viimeiselle vartille: ohje on yksi lause, eikä '
    + 'kenenkään tarvitse tarkistaa.'; },
  C3: function () { return 'Paritehtävänä 10-15 minuutin jaksona: oppilaat kertovat toisilleen, miten '
    + 'menivät kymmenen ali.'; },
  C4: function () { return 'Kotitehtävänä tehtävä toimii hyvin, koska kotona kenenkään ei tarvitse '
    + 'tarkistaa eikä tuntea menetelmää.'; },
};

var FAMILY = { T0: ['S1','S2'], T1: ['S3','S1'], T2: ['S3','S2'], T3: ['S3','S1'],
  T4: ['S2','S1'], T5: ['S2','S1'], T6: ['S2','S4'], T7: ['S2','S4'] };

function digits(o, r) { var out = [], n = o; for (var i = 0; i < r.length; i++) { out.push(n % r[i]); n = Math.floor(n / r[i]); } return out; }

function build(f, ordinal) {
  var reg = f.regrouping || {};
  var mode = (reg.additions > 0 && reg.subtractions > 0) ? 'mixed'
    : (reg.subtractions > 0 ? 'subtraction' : 'addition');
  var max = f.band.maxSeen;
  var r = range(max), t = ten(f.tenCase, reg, f.tenExample || {});
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
    ' Vastaukset ovat 2-10, yksi kutakin palaa kohti: kuusi palaa asettanut voi päätellä loput '
      + 'laskematta. Pyydä kirjoittamaan vastaukset ennen palojen asettamista.',
    ' Koska jokainen vastaus 2-10 esiintyy vain kerran, viimeiset laskut voi arvata. Pyydä '
      + 'oppilasta sanomaan vastaukset ääneen.',
    ' Osa oppilaista asettaa palat muodon eikä vastauksen perusteella. Laske ensin kaikki '
      + 'yhdeksän, aseta vasta sitten.',
  ];
  var SCOPE = [
    ' Kymmenalitusta harjoitellaan tässä vain vähennyslaskuissa; yhteenlaskut kymmenen yli '
      + 'eivät kuulu tähän tehtävätyyppiin.',
    ' Vain vähennyslaskuissa mennään kymmenen ali; kymmenylitykseen yhteenlaskussa tarvitaan '
      + 'toinen tehtävä.',
  ];
  var levelNote = (max > 20)
    ? ' Sopii parhaiten 1. luokan kevääseen tai 2. luokan alkuun: vähennyslaskuissa mennään '
      + 'kymmenen ali ja suurin luku on ' + max + '.'
    : '';

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: r.chip,
    chipMode: mode === 'addition' ? 'Yhteenlasku' : (mode === 'subtraction' ? 'Vähennyslasku' : 'Yhteen- ja vähennyslasku'),
    chipTen: t.clause,
    taskList: ops.length ? 'Tehtävän yhdeksän laskua: ' + ops.join(', ') + '.' : '',
    heading1: 'Mitä tehtävä harjoittaa',
    heading2: 'Miksi se tarkistaa itsensä',
    heading3: 'Näin käytät sitä',
    block1: BLOCK1[key1](f, s) + levelNote,
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    // `Teemana {X}.` — essive frame leaves the theme name in the nominative, the Finnish
    // equivalent of the German case-safe `zum Thema X`.
    blockExtras: 'Vastaukset löytyvät erillisestä PDF:stä, mistä näet nopeasti ennen tulostusta, '
      + 'sopiiko taso.'
      + CAVEATS[elimIdx % CAVEATS.length]
      + (reg.crossesTen > 0 ? SCOPE[ordinal % SCOPE.length] : '')
      + (s.theme ? ' Teemana ' + s.theme + '.' : ''),
  };
}

module.exports = { build: build, range: range, ten: ten };
