/**
 * Spanish teaching-block copy for math-puzzle deck pages. From a 1º-2º de Primaria ruling.
 *
 * RANGE: band up to 20, real number above it. `hasta 10` / `hasta 20` are genuine Spanish
 * curricular bands, but there is no working band at 30 for these years — so a max of 21-24
 * prints the real number. Saying `hasta 100` would mislead and `hasta 30` sounds invented.
 *
 * THE COLUMN-ARITHMETIC TRAP, fifth confirmation: `con llevada` / `sin llevada` belongs to
 * the WRITTEN algorithm ("me llevo una"). Here the child computes 13 - 8 mentally, with no
 * columns and nothing carried, so it would be a domain error. The correct Spanish is
 * `pasar de la decena`. Same mistake as en regrouping, fr retenue, it riporto, pt
 * reagrupamento — every practitioner flagged it unprompted.
 *
 * REGISTER: tú, not usted (usted reads administrative). `los alumnos`, not `los niños` as
 * the default. The adult is `el maestro / la maestra` — `profesor` reads secondary.
 *
 * REJECTED CALQUES: `hoja de trabajo` (worksheet) -> `ficha`; `grado 1` -> `1º de Primaria`;
 * `espacio numérico` / `rango numérico` (from the German); `operaciones combinadas` (that
 * means bracketed expressions, years 3-4); `amigos del diez` for landing on ten (it means
 * pairs summing to 10, a different thing).
 *
 * LOMLOE may only be referenced generically ("los saberes básicos de numeración y cálculo").
 * Never a criterion code, never "currículo oficial aprobado", and never name a comunidad
 * autónoma — the curriculum varies by region.
 */
'use strict';

var MODE_PL = { addition: 'sumas', subtraction: 'restas', mixed: 'sumas y restas mezcladas' };
var SKILL = { addition: 'la suma', subtraction: 'la resta', mixed: 'el cambio de operación' };

function range(max) {
  if (max <= 10) return { phrase: 'con números hasta 10', chip: 'Números: hasta 10',
    sentence: 'Todos los números se quedan por debajo de 10.' };
  if (max <= 20) return { phrase: 'con números hasta 20', chip: 'Números: hasta 20',
    sentence: 'Los números llegan como mucho a ' + max + ', dentro de la banda hasta 20.' };
  // no functional band at 30 in these years: print the real number
  return { phrase: 'con números hasta ' + max, chip: 'Números: hasta ' + max,
    sentence: 'El número más alto de la ficha es ' + max + ', por encima de la banda hasta 20.' };
}

function ten(tenCase, reg, ex) {
  var w = function (t, e) { return e ? t + ' (' + e + ')' : t; };
  var c = reg.crossesTen;
  switch (tenCase) {
    case 'T0': return { clause: 'sin pasar de la decena',
      sentence: 'Ninguna operación pasa de la decena.' };
    case 'T1': return { clause: 'sin pasar de la decena',
      sentence: 'Ninguna operación pasa de la decena. ' + w('Una llega justo a 10', ex.making) + '.' };
    case 'T2': return { clause: 'sin pasar de la decena',
      sentence: 'Ninguna operación pasa de la decena; ' + w('alguna llega justo a 10', ex.making) + '.' };
    case 'T3': return { clause: 'sin pasar de la decena, con operaciones que llegan justo a 10',
      sentence: 'No se pasa de la decena. Varias operaciones llegan justo a 10.' };
    case 'T4': return { clause: 'casi todas sin pasar de la decena',
      sentence: 'La mayoría se queda dentro de la misma decena; ' + w('alguna la pasa', ex.crossing) + '.' };
    case 'T5': return { clause: 'con y sin paso de la decena',
      sentence: w('Alrededor de la mitad de las operaciones pasan de la decena', ex.crossing)
        + '; el resto se queda dentro.' };
    case 'T6': return { clause: 'en su mayoría pasando de la decena',
      sentence: w('El paso de la decena es lo central: ' + c + ' de las nueve operaciones lo exigen', ex.crossing) + '.' };
    default: return { clause: 'todas pasando de la decena',
      sentence: w('Las nueve operaciones pasan de la decena', ex.crossing) + '.' };
  }
}

var BLOCK1 = {
  S1: function (f, s) { return 'Nueve ' + s.modePl + ' en una cuadrícula de 3x3, ' + s.range.phrase + '. ' + s.ten.sentence; },
  S2: function (f, s) { return 'Esta ficha practica ' + s.skill + ' ' + s.range.phrase + '. ' + s.ten.sentence; },
  S3: function (f, s) { return s.ex[0] + ' y ' + s.ex[1] + ': ' + s.range.sentence + ' ' + s.ten.sentence; },
  S4: function (f, s) { return 'Para la fase de práctica, una vez trabajado el paso de la decena: las nueve '
    + s.modePl + ' llegan hasta ' + s.max + '. ' + s.ten.sentence; },
  S5: function (f, s) { return 'La suma y la resta se alternan de casilla en casilla: ' + s.ex[0]
    + ', luego ' + s.ex[1] + '. El alumno tiene que leer el signo cada vez. ' + s.range.sentence; },
};

var BLOCK2 = {
  B1: function () { return 'Cada resultado correcto coloca una pieza del puzle: si una sola operación falla, '
    + 'el dibujo no se completa y el propio alumno detecta el error sin esperar a que se lo corrijas.'; },
  B2: function () { return 'La corrección la lleva la ficha. Una pieza que no encaja señala qué operación hay '
    + 'que repasar, así que funciona también mientras tú atiendes a otro grupo.'; },
  B3: function () { return 'La respuesta viene del material y no del maestro. El alumno ve el fallo mientras '
    + 'calcula, no al día siguiente en la corrección.'; },
  B4: function () { return 'La pieza que no encaja indica cuál de las nueve operaciones hay que mirar otra vez, '
    + 'no por qué falló. Pedir que expliquen dos en voz alta lo aclara.'; },
};

var BLOCK3 = {
  C1: function () { return 'Va bien en rincones o como tarea de repaso al terminar la explicación: no hay nada que corregir.'; },
  C2: function () { return 'Útil para una sustitución o los últimos minutos de clase: la consigna es una frase y '
    + 'nadie tiene que corregir.'; },
  C3: function () { return 'Por parejas, dos alumnos colocan una pieza por turno y dicen en voz alta su resultado.'; },
  C4: function () { return 'Como tarea para casa funciona bien, porque en casa nadie necesita corregir ni conocer el método.'; },
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
    ' Los nueve resultados van del 2 al 10, uno cada uno: quien ya ha colocado seis piezas puede '
      + 'deducir las últimas. Pide que escriban los resultados antes de colocar.',
    ' Como cada resultado del 2 al 10 aparece una sola vez, las últimas operaciones se pueden '
      + 'adivinar. Que las digan en voz alta lo resuelve.',
    ' Algunos alumnos encajan por la forma de la pieza en vez de por el resultado. Calcular las '
      + 'nueve antes de colocar evita ese atajo.',
  ];
  var SCOPE = [
    ' Aquí el paso de la decena solo se practica restando; las sumas por encima de diez no aparecen '
      + 'en este tipo de ficha.',
    ' Solo las restas pasan de la decena en esta ficha; para sumar por encima de diez hace falta otra.',
  ];
  // Tier (c) is 2º de Primaria, not 1º. Usage advice, tag untouched.
  var levelNote = (max > 20)
    ? ' Por el tamaño de los números y por las restas que pasan de la decena, esta ficha encaja '
      + 'mejor al final de 1º o al empezar 2º de Primaria; en el primer trimestre de 1º conviene '
      + 'resolverla con material manipulativo o en pequeño grupo.'
    : '';

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: r.chip,
    chipMode: mode === 'addition' ? 'Suma' : (mode === 'subtraction' ? 'Resta' : 'Suma y resta'),
    chipTen: t.clause,
    taskList: ops.length ? 'Las nueve operaciones de esta ficha: ' + ops.join(', ') + '.' : '',
    heading1: 'Qué practica esta ficha',
    heading2: 'Por qué se autocorrige',
    heading3: 'Cómo usarla en clase',
    block1: BLOCK1[key1](f, s) + levelNote,
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    blockExtras: 'El PDF de soluciones trae los nueve resultados, útil para comprobar de un vistazo '
      + 'si el nivel encaja antes de imprimir.'
      + CAVEATS[elimIdx % CAVEATS.length]
      + (reg.crossesTen > 0 ? SCOPE[ordinal % SCOPE.length] : '')
      + (s.theme ? ' La imagen que se completa es del tema ' + s.theme + '.' : ''),
  };
}

module.exports = { build: build, range: range, ten: ten };
