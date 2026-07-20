/**
 * Danish teaching-block copy for math-puzzle deck pages. From an indskoling ruling
 * (børnehaveklasse–2. klasse). [NSR-FLAG] per §17.5.1.
 *
 * THE COLUMN TRAP DOES NOT APPLY: `tierovergang` is the mental-arithmetic term. The
 * column-bound words are `mente` (plus), `at låne` / `veksle` (minus) — those are what would
 * betray a translation. Swedish and Norwegian agreed independently for their own cognates.
 *
 * WHERE DANISH DIFFERS FROM ITS SIBLINGS — cross-checked, not assumed:
 *   task noun   `regnestykke`. The Swedish choice `uppgift` looks like Danish `opgave`, but
 *               in Danish `opgave` means the whole sheet, so the cognate is a false friend.
 *   ten-pairs   `tiervenner` (with Norwegian), NOT Swedish `tiokamrater` — the Norwegian
 *               ruling explicitly flags the kamrat form as a Swedish calque.
 *   age         Danish 1. klasse is SEVEN, like Swedish åk 1 and unlike Norwegian 1. trinn
 *               (six). So the within-10 sheets sit a year below the tag here.
 *
 * RANGE: band (0-10 / 0-20 / 0-100). For 21-24 the next band up would grossly overstate, so
 * write `talområdet 0-20 med enkelte tal op til 24`.
 *
 * REGISTER: du, never De. `eleverne`; `børnene` only where the text mentions børnehaveklasse.
 * The adult is `læreren` — `pædagogen` only in a børnehaveklasse suggestion.
 *
 * Fælles Mål may be named ONLY by quoting a real kompetenceområde (e.g. tal og algebra) —
 * never "opfylder Fælles Mål", never an invented mål number.
 */
'use strict';

var MODE_PL = { addition: 'plusstykker', subtraction: 'minusstykker',
  mixed: 'regnestykker med plus og minus blandet' };
var SKILL = { addition: 'addition', subtraction: 'subtraktion', mixed: 'skiftet mellem plus og minus' };

function range(max) {
  if (max <= 10) return { phrase: 'i talområdet 0-10', chip: 'Talområde: 0-10',
    sentence: 'Alle tal holder sig i talområdet 0-10.' };
  if (max <= 20) return { phrase: 'i talområdet 0-20', chip: 'Talområde: 0-20',
    sentence: 'Regnestykkerne ligger i talområdet 0-20; det største tal er ' + max + '.' };
  // the next band is 0-100, which would grossly overstate a max of 23
  return { phrase: 'i talområdet 0-20 med enkelte tal op til ' + max,
    chip: 'Talområde: 0-20 (op til ' + max + ')',
    sentence: 'Regnestykkerne ligger i talområdet 0-20 med enkelte tal op til ' + max + '.' };
}

function ten(tenCase, reg, ex) {
  var w = function (t, e) { return e ? t + ' (' + e + ')' : t; };
  var c = reg.crossesTen;
  switch (tenCase) {
    case 'T0': return { clause: 'uden tierovergang', sentence: 'Der er ingen tierovergang.' };
    case 'T1': return { clause: 'uden tierovergang',
      sentence: 'Der er ingen tierovergang. ' + w('Ét regnestykke giver præcis 10', ex.making) + '.' };
    case 'T2': return { clause: 'uden tierovergang',
      sentence: 'Der er ingen tierovergang; ' + w('enkelte regnestykker giver præcis 10', ex.making) + '.' };
    case 'T3': return { clause: 'uden tierovergang, men med tiervenner',
      sentence: 'Tieren brydes ikke. Flere regnestykker giver præcis 10 og træner tiervennerne.' };
    case 'T4': return { clause: 'mest uden tierovergang',
      sentence: 'De fleste regnestykker bliver inden for tieren; ' + w('enkelte går over', ex.crossing) + '.' };
    case 'T5': return { clause: 'med og uden tierovergang',
      sentence: w('Omkring halvdelen af regnestykkerne går over tieren', ex.crossing)
        + '; resten bliver inden for tieren.' };
    case 'T6': return { clause: 'mest med tierovergang',
      sentence: w('Tierovergangen er i centrum: ' + c + ' af de ni regnestykker kræver den', ex.crossing) + '.' };
    default: return { clause: 'gennemgående med tierovergang',
      sentence: w('Alle ni regnestykker går over tieren', ex.crossing) + '.' };
  }
}

var BLOCK1 = {
  S1: function (f, s) { return 'Ni ' + s.modePl + ' i et 3x3-gitter, ' + s.range.phrase + '. ' + s.ten.sentence; },
  S2: function (f, s) { return 'Arket træner ' + s.skill + ' ' + s.range.phrase + '. ' + s.ten.sentence; },
  S3: function (f, s) { return s.ex[0] + ' og ' + s.ex[1] + ': ' + s.range.sentence + ' ' + s.ten.sentence; },
  S4: function (f, s) { return 'Til træningsfasen efter en fælles gennemgang af tierovergangen: de ni '
    + s.modePl + ' går op til ' + s.max + '. ' + s.ten.sentence; },
  S5: function (f, s) { return 'Plus og minus skifter fra felt til felt: ' + s.ex[0] + ', så ' + s.ex[1]
    + '. Eleven skal læse regnetegnet hver gang. ' + s.range.sentence; },
};

var BLOCK2 = {
  B1: function () { return 'Alle ni svar hører til hver sin puslespilsbrik, så et forkert resultat ikke '
    + 'passer ind — eleven opdager selv fejlen, før du når at rette.'; },
  B2: function () { return 'Rettelsen ligger i arket. En brik der ikke passer, viser hvilket regnestykke '
    + 'der skal ses efter, så arket fungerer også mens du er hos en anden gruppe.'; },
  B3: function () { return 'Tilbagemeldingen kommer fra materialet og ikke fra læreren: fejlen ses, mens '
    + 'eleven regner, og ikke først dagen efter.'; },
  B4: function () { return 'Brikken der ikke passer, peger på hvilket af de ni regnestykker der skal ses '
    + 'igen — ikke hvorfor det gik galt. Lad eleven fortælle, hvordan den regnede.'; },
};

var BLOCK3 = {
  C1: function () { return 'Brug det som selvstændigt arbejde efter en fælles gennemgang, gerne med tallinje '
    + 'eller tiestænger inden for rækkevidde.'; },
  C2: function () { return 'God til en vikartime eller det sidste kvarter: instruktionen er én sætning, og '
    + 'ingen skal rette.'; },
  C3: function () { return 'To elever kan lægge hvert sit ark og bytte, når billedet er samlet.'; },
  C4: function () { return 'Som hjemmearbejde fungerer arket godt, fordi ingen derhjemme skal rette eller '
    + 'kende metoden.'; },
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
    ' Svarene er 2 til 10, ét pr. brik: den der har lagt seks brikker, kan regne de sidste ud '
      + 'ved udelukkelse. Lad eleverne skrive svarene, før de lægger brikkerne.',
    ' Da hvert svar fra 2 til 10 kun optræder én gang, kan de sidste regnestykker gættes. Bed '
      + 'eleven sige svarene højt.',
    ' Nogle elever lægger efter brikkens form i stedet for efter svaret. Regn alle ni først, '
      + 'læg bagefter.',
  ];
  var SCOPE = [
    ' Tierovergangen trænes her kun i subtraktion; plusstykker over tieren findes ikke på denne '
      + 'arktype.',
    ' Kun minusstykkerne går over tieren på dette ark; til plus over tieren skal du bruge et andet.',
  ];
  // Danish 1. klasse is seven, like Swedish åk 1 — so within-10 sheets sit a year below the tag.
  var levelNote = (max <= 10)
    ? ' Arket er sat til 1. klasse, men de letteste ark inden for tieren fungerer også fint i '
      + 'børnehaveklassen mod foråret.'
    : (max > 20
      ? ' Arkene med de største tal kan bruges som repetition i begyndelsen af 2. klasse.'
      : '');

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: r.chip,
    chipMode: mode === 'addition' ? 'Addition' : (mode === 'subtraction' ? 'Subtraktion' : 'Plus og minus'),
    chipTen: t.clause,
    taskList: ops.length ? 'De ni regnestykker på arket: ' + ops.join(', ') + '.' : '',
    heading1: 'Hvad arket træner',
    heading2: 'Hvorfor det retter sig selv',
    heading3: 'Sådan bruger du det',
    block1: BLOCK1[key1](f, s) + levelNote,
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    blockExtras: 'Facit viser alle ni resultater, praktisk til hurtigt at se, om niveauet passer, '
      + 'før du printer.'
      + CAVEATS[elimIdx % CAVEATS.length]
      + (reg.crossesTen > 0 ? SCOPE[ordinal % SCOPE.length] : '')
      + (s.theme ? ' Puslespilsbilledet hører til temaet ' + s.theme + '.' : ''),
  };
}

module.exports = { build: build, range: range, ten: ten };
