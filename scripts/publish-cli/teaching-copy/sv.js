/**
 * Swedish teaching-block copy for math-puzzle deck pages. From a lågstadie ruling
 * (förskoleklass–åk 2). [NSR-FLAG] per §17.5.1 — deferred native-speaker review.
 *
 * THE COLUMN-ARITHMETIC TRAP DOES NOT APPLY HERE — the first negative answer in eight
 * languages, and the reason each locale is asked rather than assumed. `tiotalsövergång` IS
 * the mental-arithmetic term in Swedish ("addition med tiotalsövergång"). The column-bound
 * words are `växling`, `minnessiffra` and `låna`, and those are what would betray a
 * translated page. Danish agreed independently for `tierovergang` (its column words are
 * `mente` / `at låne`).
 *
 * RANGE: band, but softer than German — write the band AND the real maximum in the same
 * sentence: "Inom talområdet 0-20, med 23 som högsta tal." A max of 17 is still
 * "talområdet 0-20", but never state a band without the actual highest number when it
 * exceeds the band's round edge.
 *
 * LEVEL: Swedish åk 1 is SEVEN years old, a year older than English Grade 1. So the
 * within-10 sheets are genuinely too easy for åk 1 and belong in förskoleklass; the max-21+
 * sheets sit at the åk 1 spring / åk 2 autumn boundary. Matches the §22.5 Nordic +1-year
 * spine.
 *
 * REGISTER: du to the teacher. `eleverna`, never `barnen` (that is förskoleklass/fritids).
 * The adult is `lärare`, never `pedagog` in running text.
 *
 * Lgr22 may be referenced ONLY as a link to centralt innehåll, never as approval:
 * "Ansluter till det centrala innehållet..." — never "Skolverket-godkänt" or "följer Lgr22".
 */
'use strict';

var MODE_PL = { addition: 'additionsuppgifter', subtraction: 'subtraktionsuppgifter',
  mixed: 'uppgifter med blandade räknesätt' };
var SKILL = { addition: 'addition', subtraction: 'subtraktion', mixed: 'växlingen mellan räknesätten' };

function range(max) {
  if (max <= 10) return { phrase: 'inom talområdet 0-10', chip: 'Talområde: 0-10',
    sentence: 'Alla tal håller sig inom talområdet 0-10.' };
  if (max <= 20) return { phrase: 'inom talområdet 0-20', chip: 'Talområde: 0-20',
    sentence: 'Uppgifterna ligger inom talområdet 0-20, med ' + max + ' som högsta tal.' };
  // band plus the real number: never a bare band when the max passes its round edge
  return { phrase: 'inom talområdet 0-20, med ' + max + ' som högsta tal',
    chip: 'Talområde: 0-20 (upp till ' + max + ')',
    sentence: 'Uppgifterna ligger inom talområdet 0-20, men det högsta talet är ' + max + '.' };
}

function ten(tenCase, reg, ex) {
  var w = function (t, e) { return e ? t + ' (' + e + ')' : t; };
  var c = reg.crossesTen;
  switch (tenCase) {
    case 'T0': return { clause: 'utan tiotalsövergång',
      sentence: 'Ingen uppgift kräver tiotalsövergång.' };
    case 'T1': return { clause: 'utan tiotalsövergång',
      sentence: 'Ingen uppgift kräver tiotalsövergång. ' + w('En uppgift landar på hel tia', ex.making) + '.' };
    case 'T2': return { clause: 'utan tiotalsövergång',
      sentence: 'Ingen uppgift kräver tiotalsövergång; ' + w('några landar på hel tia', ex.making) + '.' };
    case 'T3': return { clause: 'utan tiotalsövergång, men med tiokamrater',
      sentence: 'Tiotalet passeras inte. Flera uppgifter landar på hel tia och tränar tiokamraterna.' };
    case 'T4': return { clause: 'mestadels utan tiotalsövergång',
      sentence: 'De flesta uppgifterna stannar inom tiotalet; ' + w('några kräver tiotalsövergång', ex.crossing) + '.' };
    case 'T5': return { clause: 'med och utan tiotalsövergång',
      sentence: w('Ungefär hälften av uppgifterna kräver tiotalsövergång', ex.crossing)
        + '; de övriga stannar inom tiotalet.' };
    case 'T6': return { clause: 'mestadels med tiotalsövergång',
      sentence: w('Tiotalsövergången står i fokus: ' + c + ' av nio uppgifter kräver den', ex.crossing) + '.' };
    default: return { clause: 'genomgående med tiotalsövergång',
      sentence: w('Alla nio uppgifterna kräver tiotalsövergång', ex.crossing) + '.' };
  }
}

var BLOCK1 = {
  S1: function (f, s) { return 'Nio ' + s.modePl + ' i ett 3x3-rutnät, ' + s.range.phrase + '. ' + s.ten.sentence; },
  S2: function (f, s) { return 'Bladet tränar ' + s.skill + ' ' + s.range.phrase + '. ' + s.ten.sentence; },
  S3: function (f, s) { return s.ex[0] + ' och ' + s.ex[1] + ': ' + s.range.sentence + ' ' + s.ten.sentence; },
  S4: function (f, s) { return 'För träningsfasen efter en genomgång av tiotalsövergången: de nio '
    + s.modePl + ' går upp till ' + s.max + '. ' + s.ten.sentence; },
  S5: function (f, s) { return 'Plus och minus växlar mellan rutorna: ' + s.ex[0] + ', sedan ' + s.ex[1]
    + '. Eleven behöver läsa räknesättet varje gång. ' + s.range.sentence; },
};

var BLOCK2 = {
  B1: function () { return 'Varje rätt svar lägger en pusselbit, och temabilden blir hel först när alla nio '
    + 'uppgifterna stämmer, så eleven ser direkt om något blivit fel utan att du behöver rätta.'; },
  B2: function () { return 'Rättningen ligger i bladet. En bit som inte passar visar vilken uppgift som ska '
    + 'ses över, vilket gör att bladet fungerar även när du arbetar med en annan grupp.'; },
  B3: function () { return 'Återkopplingen kommer från materialet och inte från läraren. Felet syns medan '
    + 'eleven räknar, inte dagen efter vid genomgången.'; },
  B4: function () { return 'Biten som inte passar visar vilken av de nio uppgifterna som behöver ses över, '
    + 'inte varför den blev fel. Låt eleven berätta hur den tänkte vid ett par uppgifter.'; },
};

var BLOCK3 = {
  C1: function () { return 'Använd bladet som enskild träning efter en gemensam genomgång, gärna med tallinje '
    + 'eller tiostavar inom räckhåll.'; },
  C2: function () { return 'Fungerar bra vid vikarie eller sista kvarten: instruktionen är en mening och '
    + 'ingen behöver rätta.'; },
  C3: function () { return 'I par lägger två elever varsin bit i tur och ordning och berättar hur de tänkte.'; },
  C4: function () { return 'Som läxa fungerar bladet bra, eftersom ingen hemma behöver rätta eller kunna metoden.'; },
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
    ' Svaren är 2 till 10, ett per bit: den som lagt sex bitar kan lista ut de sista utan att '
      + 'räkna. Låt eleverna skriva svaren innan de lägger bitarna.',
    ' Eftersom varje svar mellan 2 och 10 förekommer en gång går de sista uppgifterna att gissa. '
      + 'Be eleven säga svaren högt så är saken klar.',
    ' Några elever lägger efter bitens form i stället för efter svaret. Räkna alla nio först, '
      + 'lägg sedan.',
  ];
  var SCOPE = [
    ' Tiotalsövergången tränas här bara i subtraktion; additioner över tiotalet förekommer inte '
      + 'på den här bladtypen.',
    ' Bara subtraktionerna passerar tiotalet på det här bladet; för addition över tiotalet '
      + 'behövs ett annat blad.',
  ];
  // Swedish åk 1 is 7 years old — a year above English Grade 1 — so the within-10 sheets are
  // genuinely too easy for åk 1, and the 21+ sheets sit at the åk 1 / åk 2 boundary.
  var levelNote = (max <= 10)
    ? ' Bladet håller sig inom tiotalet och passar redan i slutet av förskoleklassen; i åk 1 '
      + 'fungerar det främst som repetition eller som stöd för elever som ännu inte är säkra '
      + 'på tiokamraterna.'
    : (max > 20
      ? ' Subtraktionerna kräver tiotalsövergång — lägg bladet på vårterminen i åk 1, eller '
        + 'använd det som repetition i början av åk 2.'
      : '');

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: r.chip,
    chipMode: mode === 'addition' ? 'Addition' : (mode === 'subtraction' ? 'Subtraktion' : 'Addition och subtraktion'),
    chipTen: t.clause,
    taskList: ops.length ? 'De nio uppgifterna på bladet: ' + ops.join(', ') + '.' : '',
    heading1: 'Vad bladet tränar',
    heading2: 'Varför det rättar sig självt',
    heading3: 'Så använder du det',
    block1: BLOCK1[key1](f, s) + levelNote,
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    blockExtras: 'Facit visar alla nio svaren, praktiskt för att snabbt se om nivån passar innan '
      + 'du skriver ut.'
      + CAVEATS[elimIdx % CAVEATS.length]
      + (reg.crossesTen > 0 ? SCOPE[ordinal % SCOPE.length] : '')
      + (s.theme ? ' Pusselbilden hör till temat ' + s.theme + '.' : ''),
  };
}

module.exports = { build: build, range: range, ten: ten };
