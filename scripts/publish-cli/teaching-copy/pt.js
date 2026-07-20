/**
 * Brazilian-Portuguese teaching-block copy for math-puzzle deck pages.
 * From an anos-iniciais (1º e 2º ano) ruling. pt is Brazilian-canonical per §6.
 *
 * RANGE: band, plus the real number in a supporting clause — the practitioner was explicit
 * that Brazilian teachers use até 10 / até 20 / até 100 but distrust a vague promise, so the
 * band goes in the headline and the measured maximum in the sentence beside it. For 21-24
 * the band is `até 25` (never `até 30`), still with the real number stated.
 *
 * THE COLUMN-ARITHMETIC TRAP, seventh confirmation: `com reagrupamento` and `empréstimo`
 * belong to the armado-em-coluna algorithm ("vai um"). Here the child calculates mentally
 * without setting it up, so both would be domain errors. The correct Portuguese is
 * `passar do dez` / `ultrapassar o dez`.
 *
 * REGISTER: você. `os alunos` as the default, `as crianças` when speaking about age or
 * handling. The adult is `o professor / a professora` — `educador` is vague, `docente`
 * bureaucratic.
 *
 * REJECTED: `folha de trabalho` and `planilha` (the word is `atividade`); `imprimível`
 * (use `para imprimir`); `série` (the word is `ano`); `grade 3x3` (use `quadro 3x3`).
 *
 * BNCC may be cited ONLY where the operation genuinely matches a habilidade, and never as a
 * seal — "Alinhado à BNCC" and "aprovado pelo MEC" are both out. This copy cites none,
 * because the match would have to be verified per deck.
 */
'use strict';

var MODE_PL = { addition: 'adições', subtraction: 'subtrações', mixed: 'adições e subtrações na mesma folha' };
var SKILL = { addition: 'a adição', subtraction: 'a subtração', mixed: 'a troca de operação' };

function range(max) {
  if (max <= 10) return { phrase: 'com números até 10', chip: 'Números: até 10',
    sentence: 'Todos os números ficam até 10.' };
  if (max <= 20) return { phrase: 'com números até 20', chip: 'Números: até 20',
    sentence: 'Números até 20 — o maior número desta folha é ' + max + '.' };
  // band até 25 for 21-24, never até 30, and always with the measured number beside it
  return { phrase: 'com números até 25', chip: 'Números: até 25',
    sentence: 'Números até 25 — o maior número desta folha é ' + max + '.' };
}

function ten(tenCase, reg, ex) {
  var w = function (t, e) { return e ? t + ' (' + e + ')' : t; };
  var c = reg.crossesTen;
  switch (tenCase) {
    case 'T0': return { clause: 'sem passar do dez',
      sentence: 'Nenhuma operação passa do dez.' };
    case 'T1': return { clause: 'sem passar do dez',
      sentence: 'Nenhuma operação passa do dez. ' + w('Uma delas fecha o dez', ex.making) + '.' };
    case 'T2': return { clause: 'sem passar do dez',
      sentence: 'Nenhuma operação passa do dez; ' + w('algumas fecham o dez', ex.making) + '.' };
    case 'T3': return { clause: 'sem passar do dez, com operações que fecham o dez',
      sentence: 'O dez não é ultrapassado. Várias operações fecham exatamente o dez.' };
    case 'T4': return { clause: 'quase todas sem passar do dez',
      sentence: 'A maioria fica dentro da mesma dezena; ' + w('uma ou outra passa do dez', ex.crossing) + '.' };
    case 'T5': return { clause: 'com e sem passar do dez',
      sentence: w('Cerca de metade das operações passa do dez', ex.crossing)
        + '; as demais ficam dentro da dezena.' };
    case 'T6': return { clause: 'em sua maioria passando do dez',
      sentence: w('Passar do dez é o foco: ' + c + ' das nove operações exigem isso', ex.crossing) + '.' };
    default: return { clause: 'todas passando do dez',
      sentence: w('As nove operações passam do dez', ex.crossing) + '.' };
  }
}

var BLOCK1 = {
  S1: function (f, s) { return 'Nove ' + s.modePl + ' num quadro 3x3, ' + s.range.phrase + '. ' + s.ten.sentence; },
  S2: function (f, s) { return 'Esta atividade pratica ' + s.skill + ' ' + s.range.phrase + '. ' + s.ten.sentence; },
  S3: function (f, s) { return s.ex[0] + ' e ' + s.ex[1] + ': ' + s.range.sentence + ' ' + s.ten.sentence; },
  S4: function (f, s) { return 'Para a fase de prática, depois de trabalhar a passagem do dez: as nove '
    + s.modePl + ' chegam a ' + s.max + '. ' + s.ten.sentence; },
  S5: function (f, s) { return 'Adição e subtração se alternam de quadrinho em quadrinho: ' + s.ex[0]
    + ', depois ' + s.ex[1] + '. A criança precisa ler o sinal a cada vez. ' + s.range.sentence; },
};

var BLOCK2 = {
  B1: function () { return 'Cada resposta certa encaixa uma peça do quebra-cabeça: a imagem só fica completa '
    + 'quando as nove estiverem corretas, então a própria criança percebe o erro antes de você conferir.'; },
  B2: function () { return 'A correção fica com a atividade. Uma peça que não encaixa mostra qual operação '
    + 'revisar, o que permite usá-la enquanto você atende outro grupo.'; },
  B3: function () { return 'O retorno vem do material, não do professor: o erro aparece durante o cálculo, '
    + 'e não no dia seguinte na correção.'; },
  B4: function () { return 'A peça que não encaixa indica qual das nove operações precisa ser vista de novo, '
    + 'não por que errou. Pedir que expliquem duas em voz alta resolve.'; },
};

var BLOCK3 = {
  C1: function () { return 'Funciona bem como atividade individual depois de trabalhar a operação em sala: não há nada para corrigir.'; },
  C2: function () { return 'Útil para uma substituição ou os últimos minutos da aula: a orientação é uma frase e ninguém precisa corrigir.'; },
  C3: function () { return 'Em duplas, um aluno confere o encaixe do outro e os dois dizem o resultado em voz alta.'; },
  C4: function () { return 'Como dever de casa funciona bem, porque em casa ninguém precisa corrigir nem conhecer o método.'; },
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
    ' Os nove resultados vão de 2 a 10, um para cada peça: quem já encaixou seis consegue deduzir '
      + 'os últimos. Peça que escrevam os resultados antes de encaixar.',
    ' Como cada resultado de 2 a 10 aparece uma única vez, as últimas operações podem ser '
      + 'adivinhadas. Pedir que digam em voz alta resolve.',
    ' Algumas crianças encaixam pelo formato da peça em vez do resultado. Calcular as nove antes '
      + 'de encaixar evita esse atalho.',
  ];
  var SCOPE = [
    ' Aqui a passagem do dez só é praticada na subtração; adições acima de dez não aparecem neste '
      + 'tipo de atividade.',
    ' Nesta folha só as subtrações passam do dez; para somar acima de dez é preciso outra atividade.',
  ];
  // Tier (c) is 2º ano, not 1º. Usage advice, tag untouched.
  var levelNote = (max > 20)
    ? ' As operações desta folha passam do dez e chegam a números maiores que vinte: em muitas '
      + 'turmas ela funciona melhor no fim do 1º ano ou no início do 2º ano.'
    : '';

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: r.chip,
    chipMode: mode === 'addition' ? 'Adição' : (mode === 'subtraction' ? 'Subtração' : 'Adição e subtração'),
    chipTen: t.clause,
    taskList: ops.length ? 'As nove operações desta folha: ' + ops.join(', ') + '.' : '',
    heading1: 'O que esta atividade pratica',
    heading2: 'Por que se autocorrige',
    heading3: 'Como usar em sala',
    block1: BLOCK1[key1](f, s) + levelNote,
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    blockExtras: 'O PDF com gabarito traz os nove resultados, útil para conferir num relance se o '
      + 'nível serve antes de imprimir.'
      + CAVEATS[elimIdx % CAVEATS.length]
      + (reg.crossesTen > 0 ? SCOPE[ordinal % SCOPE.length] : '')
      + (s.theme ? ' A imagem que se completa é do tema ' + s.theme + '.' : ''),
  };
}

module.exports = { build: build, range: range, ten: ten };
