/**
 * Norwegian (bokmål) teaching-block copy for math-puzzle deck pages. From a småtrinn ruling.
 * [NSR-FLAG] per §17.5.1.
 *
 * THE COLUMN TRAP DOES NOT APPLY: `tierovergang` is the mental-arithmetic term; the
 * column-bound words are `veksling`, `å låne`, `mente`.
 *
 * TWO THINGS THE CROSS-CHECK CAUGHT, which copying Swedish would have got wrong:
 *   1. `tikamerater` is a SWEDISH CALQUE (from tiokompisar/tiokamrater). Norwegian says
 *      `tiervenner`, as does Danish. The Norwegian reviewer flagged it unprompted.
 *   2. NORWEGIAN 1. TRINN IS SIX YEARS OLD — school starts at six, and the year is largely
 *      play-based within 0-10. Swedish åk 1 is seven, a full year ahead, so
 *      "svenske nivåmerker kan ikke kopieres". Consequence: the within-10 sheets are
 *      CORRECTLY tagged 1. trinn here (unlike Sweden, where they are too easy), and the
 *      crossing sheets are 2.-trinn work.
 *
 * `regnestykke` for a single task; `oppgave` means the whole sheet.
 *
 * RANGE: band up to 20 only. The next band is 0-100, which grossly overstates a max of 23 —
 * so for 21-24 print the real number. Never write 0-100 for these sheets.
 *
 * REGISTER: du. `elevene`, not `barna` (that belongs to barnehagen). The adult is `lærer` —
 * `pedagog` reads as barnehage or spesialpedagogikk.
 *
 * LK20 only as support, never compliance: "støtter arbeid med addisjon og subtraksjon i
 * tallområdet 0-20". Never "i tråd med LK20", never a quoted kompetansemål.
 */
'use strict';

var MODE_PL = { addition: 'plussstykker', subtraction: 'minusstykker',
  mixed: 'regnestykker med addisjon og subtraksjon om hverandre' };
var SKILL = { addition: 'addisjon', subtraction: 'subtraksjon', mixed: 'skiftet mellom regneartene' };

function range(max) {
  if (max <= 10) return { phrase: 'i tallområdet 0-10', chip: 'Tallområde: 0-10',
    sentence: 'Alle tall holder seg i tallområdet 0-10.' };
  if (max <= 20) return { phrase: 'i tallområdet 0-20', chip: 'Tallområde: 0-20',
    sentence: 'Regnestykkene ligger i tallområdet 0-20; største tall er ' + max + '.' };
  // next band is 0-100 and would grossly overstate: print the real number
  return { phrase: 'med største tall ' + max, chip: 'Største tall: ' + max,
    sentence: 'Største tall på arket er ' + max + ', altså like over tjue.' };
}

function ten(tenCase, reg, ex) {
  var w = function (t, e) { return e ? t + ' (' + e + ')' : t; };
  var c = reg.crossesTen;
  switch (tenCase) {
    case 'T0': return { clause: 'uten tierovergang', sentence: 'Det er ingen tierovergang.' };
    case 'T1': return { clause: 'uten tierovergang',
      sentence: 'Det er ingen tierovergang. ' + w('Ett regnestykke fyller tieren', ex.making) + '.' };
    case 'T2': return { clause: 'uten tierovergang',
      sentence: 'Det er ingen tierovergang; ' + w('enkelte regnestykker fyller tieren', ex.making) + '.' };
    case 'T3': return { clause: 'uten tierovergang, men med tiervenner',
      sentence: 'Tieren krysses ikke. Flere regnestykker fyller tieren og øver tiervennene.' };
    case 'T4': return { clause: 'stort sett uten tierovergang',
      sentence: 'De fleste regnestykkene holder seg innenfor tieren; ' + w('enkelte går over', ex.crossing) + '.' };
    case 'T5': return { clause: 'med og uten tierovergang',
      sentence: w('Omtrent halvparten av regnestykkene går over tieren', ex.crossing)
        + '; resten holder seg innenfor.' };
    case 'T6': return { clause: 'stort sett med tierovergang',
      sentence: w('Tierovergangen står sentralt: ' + c + ' av de ni regnestykkene går over tieren', ex.crossing) + '.' };
    default: return { clause: 'gjennomgående med tierovergang',
      sentence: w('Alle ni regnestykkene går over tieren', ex.crossing) + '.' };
  }
}

var BLOCK1 = {
  S1: function (f, s) { return 'Ni ' + s.modePl + ' i et 3x3-rutenett, ' + s.range.phrase + '. ' + s.ten.sentence; },
  S2: function (f, s) { return 'Arket øver ' + s.skill + ' ' + s.range.phrase + '. ' + s.ten.sentence; },
  S3: function (f, s) { return s.ex[0] + ' og ' + s.ex[1] + ': ' + s.range.sentence + ' ' + s.ten.sentence; },
  S4: function (f, s) { return 'Til øvingsfasen etter en felles gjennomgang av tierovergangen: de ni '
    + s.modePl + ' går opp til ' + s.max + '. ' + s.ten.sentence; },
  S5: function (f, s) { return 'Pluss og minus veksler fra rute til rute: ' + s.ex[0] + ', så ' + s.ex[1]
    + '. Eleven må lese regnetegnet hver gang. ' + s.range.sentence; },
};

var BLOCK2 = {
  B1: function () { return 'Hver riktig løsning legger en puslespillbrikke, og bildet blir bare helt når '
    + 'alle ni regnestykkene stemmer — eleven ser selv om noe mangler, uten at du trenger å rette.'; },
  B2: function () { return 'Rettingen ligger i arket. En brikke som ikke passer, viser hvilket regnestykke '
    + 'som må ses på igjen, så arket fungerer også mens du er hos en annen gruppe.'; },
  B3: function () { return 'Tilbakemeldingen kommer fra materiellet og ikke fra læreren: feilen vises mens '
    + 'eleven regner, ikke dagen etter.'; },
  B4: function () { return 'Brikken som ikke passer, peker på hvilket av de ni regnestykkene som må ses på '
    + 'igjen — ikke hvorfor det ble feil. La eleven forklare hvordan den tenkte.'; },
};

var BLOCK3 = {
  C1: function () { return 'Bruk arket som stasjonsarbeid eller selvstendig arbeid etter en felles gjennomgang.'; },
  C2: function () { return 'Fungerer godt i en vikartime eller siste kvarter: instruksjonen er én setning, '
    + 'og ingen trenger å rette.'; },
  C3: function () { return 'I par kan elevene forklare for hverandre hvordan de kom over tieren, før du '
    + 'eventuelt henter fram fasiten.'; },
  C4: function () { return 'Som hjemmearbeid fungerer arket godt, fordi ingen hjemme trenger å rette eller '
    + 'kunne metoden.'; },
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
    ' Svarene er 2 til 10, ett per brikke: den som har lagt seks brikker, kan resonnere seg '
      + 'fram til de siste. La elevene skrive svarene før de legger brikkene.',
    ' Siden hvert svar fra 2 til 10 forekommer én gang, kan de siste regnestykkene gjettes. '
      + 'Be eleven si svarene høyt.',
    ' Noen elever legger etter formen på brikken i stedet for etter svaret. Regn alle ni først, '
      + 'legg etterpå.',
  ];
  var SCOPE = [
    ' Tierovergangen øves her bare i subtraksjon; addisjon over tieren finnes ikke på denne '
      + 'arktypen.',
    ' Bare minusstykkene går over tieren på dette arket; til addisjon over tieren trengs et annet.',
  ];
  // Norwegian 1. trinn is SIX — so within-10 is correctly tagged here, unlike Sweden, and the
  // crossing sheets are 2.-trinn work.
  var levelNote = (max > 20 || reg.crossesTen > 0)
    ? ' Merk: dette arket har tierovergang og tall over 20. Mange klasser møter dette først på '
      + '2. trinn — bruk det som utfordring på 1. trinn, eller som repetisjon på 2. trinn.'
    : '';

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: r.chip,
    chipMode: mode === 'addition' ? 'Addisjon' : (mode === 'subtraction' ? 'Subtraksjon' : 'Addisjon og subtraksjon'),
    chipTen: t.clause,
    taskList: ops.length ? 'De ni regnestykkene på arket: ' + ops.join(', ') + '.' : '',
    heading1: 'Hva arket øver',
    heading2: 'Hvorfor det retter seg selv',
    heading3: 'Slik bruker du det',
    block1: BLOCK1[key1](f, s) + levelNote,
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    blockExtras: 'Fasiten viser alle ni svarene, praktisk for raskt å se om nivået passer før du '
      + 'skriver ut.'
      + CAVEATS[elimIdx % CAVEATS.length]
      + (reg.crossesTen > 0 ? SCOPE[ordinal % SCOPE.length] : '')
      + (s.theme ? ' Puslespillbildet hører til temaet ' + s.theme + '.' : ''),
  };
}

module.exports = { build: build, range: range, ten: ten };
