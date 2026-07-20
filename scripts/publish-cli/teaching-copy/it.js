/**
 * Italian teaching-block copy for math-puzzle deck pages. From a classe prima/seconda ruling.
 *
 * RANGE: hybrid, and the practitioner called it the only honest option. Italian has real
 * curricular steps — entro il 10 / entro il 20 / entro il 100 — but "entro il 23" does not
 * exist as a phrase. So: max <= 10 -> `entro il 10`; 11-20 -> `entro il 20`; 21-24 -> NOT
 * `entro il 20` (that would be false) but `il numero più alto è 23`.
 *
 * THE COLUMN-ARITHMETIC TRAP, sixth confirmation: `con il riporto` belongs to the algorithm
 * in columns; here the child calculates mentally, so it is a domain error. `prestito` is
 * both obsolete and wrong (nothing is given back — in columns the word is `cambio`). The
 * correct Italian is `passaggio della decina`.
 *
 * REGISTER: tu, never Lei — Lei reads like a commercial catalogue rather than a colleague.
 * `i bambini` at this age (`gli alunni` is the more formal alternative); never `studenti` in
 * primary. The adult is `insegnante` — `maestra` only colloquially, `docente` bureaucratic.
 *
 * REJECTED: `spazio numerico` / `ambito numerico` (calques), `foglio di lavoro` (the word is
 * `scheda`), `esercizio` for a single cell (that is the whole sheet), `problema` (a word
 * problem only), and `autovalutazione` — the sheet is `autocorrettiva`, a different thing.
 *
 * Indicazioni nazionali may be cited only generically and verifiably; never an invented
 * traguardo number, never "conforme/approvato dal Ministero".
 */
'use strict';

var MODE_PL = { addition: 'addizioni', subtraction: 'sottrazioni', mixed: 'addizioni e sottrazioni insieme' };
var SKILL = { addition: "l'addizione", subtraction: 'la sottrazione', mixed: 'il cambio di operazione' };

function range(max) {
  if (max <= 10) return { phrase: 'entro il 10', chip: 'Numeri: entro il 10',
    sentence: 'Tutti i numeri restano entro il 10.' };
  if (max <= 20) return { phrase: 'entro il 20', chip: 'Numeri: entro il 20',
    sentence: 'Le operazioni restano entro il 20; il numero più alto della scheda è ' + max + '.' };
  // "entro il 23" does not exist in Italian: name the highest number instead
  return { phrase: 'con numeri fino a ' + max, chip: 'Numero più alto: ' + max,
    sentence: 'Il numero più alto della scheda è ' + max + ', quindi si va oltre il 20.' };
}

function ten(tenCase, reg, ex) {
  var w = function (t, e) { return e ? t + ' (' + e + ')' : t; };
  var c = reg.crossesTen;
  switch (tenCase) {
    case 'T0': return { clause: 'senza passaggio della decina',
      sentence: 'Nessuna operazione supera la decina.' };
    case 'T1': return { clause: 'senza passaggio della decina',
      sentence: 'Nessuna operazione supera la decina. ' + w('Una arriva esattamente a 10', ex.making) + '.' };
    case 'T2': return { clause: 'senza passaggio della decina',
      sentence: 'Nessuna operazione supera la decina; ' + w('qualcuna arriva esattamente a 10', ex.making) + '.' };
    case 'T3': return { clause: 'senza passaggio della decina, con operazioni che arrivano a 10',
      sentence: 'La decina non viene superata. Più operazioni arrivano esattamente a 10.' };
    case 'T4': return { clause: 'in prevalenza senza passaggio della decina',
      sentence: 'La maggior parte resta entro la decina; ' + w('qualcuna la supera', ex.crossing) + '.' };
    case 'T5': return { clause: 'con e senza passaggio della decina',
      sentence: w('Circa la metà delle operazioni supera la decina', ex.crossing)
        + '; le altre restano entro la decina.' };
    case 'T6': return { clause: 'in prevalenza con passaggio della decina',
      sentence: w('Il passaggio della decina è al centro: ' + c + ' operazioni su nove lo richiedono', ex.crossing) + '.' };
    default: return { clause: 'tutte con passaggio della decina',
      sentence: w('Tutte e nove le operazioni superano la decina', ex.crossing) + '.' };
  }
}

var BLOCK1 = {
  S1: function (f, s) { return 'Nove ' + s.modePl + ' in una griglia 3x3, ' + s.range.phrase + '. ' + s.ten.sentence; },
  S2: function (f, s) { return 'Questa scheda esercita ' + s.skill + ' ' + s.range.phrase + '. ' + s.ten.sentence; },
  S3: function (f, s) { return s.ex[0] + ' e ' + s.ex[1] + ': ' + s.range.sentence + ' ' + s.ten.sentence; },
  S4: function (f, s) { return 'Per la fase di esercizio, dopo aver lavorato sul passaggio della decina: le nove '
    + s.modePl + ' arrivano fino a ' + s.max + '. ' + s.ten.sentence; },
  S5: function (f, s) { return 'Addizione e sottrazione si alternano da una casella all altra: ' + s.ex[0]
    + ', poi ' + s.ex[1] + '. Il bambino deve rileggere il segno ogni volta. ' + s.range.sentence; },
};

var BLOCK2 = {
  B1: function () { return 'Ogni risultato esatto colloca un pezzo del puzzle: l immagine si completa solo con '
    + 'tutte e nove le operazioni giuste, così il bambino si accorge da solo dell errore.'; },
  B2: function () { return 'La correzione la fa la scheda. Un pezzo che non entra segnala quale operazione '
    + 'riprendere, quindi funziona anche mentre segui un altro gruppo.'; },
  B3: function () { return 'Il riscontro arriva dal materiale e non dall insegnante: l errore si vede mentre si '
    + 'calcola, non il giorno dopo alla correzione.'; },
  B4: function () { return 'Il pezzo che non entra dice quale delle nove operazioni va rivista, non perché sia '
    + 'sbagliata. Far verbalizzare due procedimenti basta a capirlo.'; },
};

var BLOCK3 = {
  C1: function () { return 'Funziona bene come lavoro autonomo di dieci minuti, dopo aver spiegato la procedura in classe.'; },
  C2: function () { return 'Comoda per una supplenza o per l ultima mezz ora: la consegna è una frase e nessuno deve correggere.'; },
  C3: function () { return 'A coppie, due bambini collocano un pezzo a turno e dicono ad alta voce il risultato.'; },
  C4: function () { return 'Come compito a casa va bene proprio perché nessuno deve correggere né conoscere il metodo.'; },
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
    ' I nove risultati vanno da 2 a 10, uno ciascuno: chi ha già collocato sei pezzi può dedurre '
      + 'gli ultimi. Fai scrivere i risultati prima di collocare i pezzi.',
    ' Poiché ogni risultato da 2 a 10 compare una volta sola, le ultime operazioni si possono '
      + 'indovinare. Farle dire ad alta voce risolve il dubbio.',
    ' Alcuni bambini incastrano guardando la forma del pezzo invece del risultato. Calcolare tutte '
      + 'e nove prima di collocare evita la scorciatoia.',
  ];
  var SCOPE = [
    ' Qui il passaggio della decina si esercita solo nelle sottrazioni; le addizioni oltre il dieci '
      + 'non compaiono in questo tipo di scheda.',
    ' Su questa scheda superano la decina soltanto le sottrazioni; per l addizione oltre il dieci '
      + 'serve una scheda diversa.',
  ];
  // Above 20 this is classe seconda work under a classe prima tag. Usage advice, tag untouched.
  var levelNote = (max > 20)
    ? ' Con il passaggio della decina e numeri oltre il 20 la scheda risulta impegnativa a fine '
      + 'prima: molte colleghe la usano come ripasso nelle prime settimane di classe seconda.'
    : '';

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: r.chip,
    chipMode: mode === 'addition' ? 'Addizione' : (mode === 'subtraction' ? 'Sottrazione' : 'Addizione e sottrazione'),
    chipTen: t.clause,
    taskList: ops.length ? 'Le nove operazioni di questa scheda: ' + ops.join(', ') + '.' : '',
    heading1: 'Che cosa esercita questa scheda',
    heading2: 'Perché si autocorregge',
    heading3: 'Come usarla in classe',
    block1: BLOCK1[key1](f, s) + levelNote,
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    blockExtras: 'Il PDF con le soluzioni riporta tutti e nove i risultati, comodo per controllare '
      + 'in un attimo se il livello va bene prima di stampare.'
      + CAVEATS[elimIdx % CAVEATS.length]
      + (reg.crossesTen > 0 ? SCOPE[ordinal % SCOPE.length] : '')
      + (s.theme ? ' L immagine da ricomporre riguarda il tema ' + s.theme + '.' : ''),
  };
}

module.exports = { build: build, range: range, ten: ten };
