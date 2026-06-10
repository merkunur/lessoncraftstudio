#!/usr/bin/env node
/**
 * gen-es-pattern-train.js — es pattern-train (readiness) landings, PER-MODE-DISTINCT prose.
 *
 * Operator doctrine (2026-06-10): for a multi-mode coordinate whose modes are genuinely
 * different content, build PER-MODE-DISTINCT prose pools at the lead (NOT shared framing
 * with a label/seq swap) — it is both the cross-mode similarity fix (en-like ~0.24, vs 0.798
 * for the shared-framing version) AND an honest-fit improvement: each mode's prose describes
 * ITS specific pattern structure (AB two-that-alternate / AAB two-then-one / ABB one-then-two
 * / AABB pairs / ABC three-distinct). Each pool weaves theme + the deck's element nouns + the
 * actual sequence; within-mode spread via lcm(6,5,4)=60 > ~50 entries/mode.
 *
 * Readiness, NO-CCSS (ratified live): no `standard`, no `levels` (Preescolar single-band via
 * coordinate.level='preescolar'), no `practiceProblems` (no Quiz). Strand = the LOCKED
 * "Saberes y Pensamiento Científico — Patrones de repetición y crecimiento".
 *
 * Reads: scripts/seo-landing/_pt-<mode>-facts.json (Stage-A: {slug,themeKey,elements}),
 *        frontend/config/topics-taxonomy.json
 * Writes: surgical insert into es.json (CRLF→LF normalized; git stores LF).
 * Usage: node scripts/seo-landing/gen-es-pattern-train.js --mode=ab|aab|abb|aabb|abc [--dry-run]
 */
'use strict';
const fs = require('fs');

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const modeArg = (argv.find((a) => a.indexOf('--mode=') === 0) || '--mode=ab').split('=')[1];
const ES = 'frontend/content/seo-landing/es.json';
const STRAND = 'Saberes y Pensamiento Científico — Patrones de repetición y crecimiento';

const facts = JSON.parse(fs.readFileSync(`scripts/seo-landing/_pt-${modeArg}-facts.json`, 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
// Element nouns render mid-sentence → fully lowercase (vocab caps each word: "Hot Dog" →
// "hot dog", "Pavo Real" → "pavo real"); PROPER nouns keep their casing ("Tío Sam").
const PROPER_ELEMENTS = new Set(['Tío Sam', 'Santa Claus', 'Estatua de la Libertad']);
const lc = (s) => !s ? s : PROPER_ELEMENTS.has(s) ? s : s.toLowerCase();
const themeDisplay = (k) => { const e = tax.axes.theme[k]; return (e && e.name && e.name.es) ? e.name.es : k; };
const LABEL = { ab: 'AB', aab: 'AAB', abb: 'ABB', aabb: 'AABB', abc: 'ABC' };
function seqIllustration(mode, els) {
  const e = els.map(lc); const a = e[0], b = e[1] || e[0], c = e[2] || b;
  if (mode === 'ab') return `${a}, ${b}, ${a}, ${b}…`;
  if (mode === 'aab') return `${a}, ${a}, ${b}, ${a}, ${a}, ${b}…`;
  if (mode === 'abb') return `${a}, ${b}, ${b}, ${a}, ${b}, ${b}…`;
  if (mode === 'aabb') return `${a}, ${a}, ${b}, ${b}, ${a}, ${a}, ${b}, ${b}…`;
  if (mode === 'abc') return `${a}, ${b}, ${c}, ${a}, ${b}, ${c}…`;
  return `${a}, ${b}…`;
}

// Per-mode-distinct pools. ctx = {T, a, b, c, seq, lab}. Each pool's framing describes its
// OWN pattern structure in mode-specific language (the cross-mode distinctness + honest-fit).
const POOLS = {
  ab: {
    h1: (x) => [`Continúa el Patrón AB con ${x.T}`, `Patrón AB con ${x.T}: ¿Qué Dibujo Sigue?`, `Completa el Patrón AB de ${x.T}`],
    p1: (x) => [
      `En un patrón AB, dos dibujos se turnan: primero uno, luego el otro, y vuelta a empezar. Esta hoja de ${x.T} pone a ${x.a} y ${x.b} a turnarse —${x.seq}— y el niño descubre cuál toca después. Es de los primeros patrones que se aprenden en preescolar, puro ir y venir.`,
      `Esta hoja de ${x.T} arma el patrón más sencillo de todos: el AB, donde ${x.a} y ${x.b} se alternan sin parar. La serie avanza ${x.seq} y la última casilla espera el dibujo que sigue. Alternar dos dibujos y predecir el siguiente es razonamiento de patrones temprano.`,
      `Dos dibujos que se turnan, una y otra vez: ese es el patrón AB. Con ${x.T}, la fila va ${x.seq}, y el pequeño solo tiene que ver el vaivén entre ${x.a} y ${x.b} para saber qué viene. Reconocer esta alternancia es una base del pensamiento lógico del preescolar.`,
      `¿Qué sigue cuando ${x.a} y ${x.b} se alternan? Eso es un patrón AB, y esta hoja de ${x.T} lo plantea con la serie ${x.seq} El niño nota que después de ${x.a} siempre viene ${x.b}, y completa el vagón vacío. Sencillo, rítmico y sin contar nada.`,
      `El patrón AB es un vaivén: ${x.a}, ${x.b}, y otra vez. En esta hoja de ${x.T} la secuencia ${x.seq} se repite con ese ritmo de dos, y el pequeño elige el dibujo que continúa. Captar la alternancia entre dos elementos es seriación en su forma más clara.`,
      `Aquí ${x.a} y ${x.b} se turnan en un patrón AB: uno sí, uno no, sin descanso. La hoja de ${x.T} muestra ${x.seq} y deja huecos para que el niño mantenga el turno. Leer y continuar una alternancia simple prepara la mente para patrones más largos.`,
    ],
    p2: (x) => [
      `Como el patrón AB solo alterna dos dibujos, el ritmo es fácil de oír: ${x.a}, ${x.b}, ${x.a}, ${x.b}… El niño señala cada vagón y dice la serie en voz alta; al llegar al hueco, la propia voz le dice si toca ${x.a} o ${x.b}.`,
      `La clave del AB es el turno: después de ${x.a} viene ${x.b}, y después de ${x.b} regresa ${x.a}. Mirando la fila de ${x.T} y diciendo «uno, otro, uno, otro», el pequeño anticipa el dibujo que falta sin necesidad de contar.`,
      `Un patrón AB se completa observando el vaivén. El niño recorre ${x.seq} con el dedo, descubre que dos dibujos de ${x.T} se turnan, y coloca el que sigue. Es una tarea de ritmo y observación, no de cantidad.`,
      `Para seguir el AB, basta preguntar «¿cuál de los dos toca ahora?». Con ${x.a} y ${x.b} turnándose en ${x.T}, el pequeño completa el hueco eligiendo el opuesto al último dibujo. Esa alternancia simple es la puerta de entrada a los patrones.`,
      `El AB no pide contar: pide notar el turno entre ${x.a} y ${x.b}. Decir la serie de ${x.T} en voz alta —y volver a empezar si hace falta— deja ver el ritmo y vuelve la seriación un juego tranquilo.`,
    ],
  },
  aab: {
    h1: (x) => [`Continúa el Patrón AAB con ${x.T}`, `Patrón AAB con ${x.T}: ¿Qué Dibujo Sigue?`, `Completa el Patrón AAB de ${x.T}`],
    p1: (x) => [
      `En un patrón AAB, el primer dibujo aparece dos veces seguidas y luego llega el segundo una sola vez. Esta hoja de ${x.T} lo arma con ${x.a}, ${x.a}, ${x.b} repitiéndose —${x.seq}— y el niño descubre qué toca después. Un ritmo de tres con una pequeña sorpresa al final.`,
      `Esta hoja de ${x.T} trabaja el patrón AAB: ${x.a} dos veces seguidas y después ${x.b} una vez, y otra vez. La serie ${x.seq} repite ese grupo de tres, y la casilla vacía espera el dibujo que continúa. Notar que el grupo es «dos y luego uno» es un paso más que el simple AB.`,
      `Dos iguales y luego uno distinto: ese es el corazón del patrón AAB. Con ${x.T}, la fila avanza ${x.seq}, repitiendo ${x.a}, ${x.a}, ${x.b}. El pequeño descubre la unidad de tres y la continúa, afinando su lectura de patrones.`,
      `¿Qué sigue después de ${x.a}, ${x.a}, ${x.b}? Eso es un patrón AAB, y esta hoja de ${x.T} lo plantea con la serie ${x.seq} El niño aprende a esperar ${x.a} dos veces antes de cada ${x.b}, y completa el vagón que falta.`,
      `El patrón AAB tiene un ritmo de tres: ${x.a}, ${x.a}, ${x.b}, y vuelta a empezar. En esta hoja de ${x.T}, ${x.seq} se repite con ese compás, y el pequeño elige el dibujo que sigue. Reconocer que el primer elemento se duplica antes del segundo es seriación más rica.`,
      `Aquí ${x.a} aparece de a dos y ${x.b} de a uno, formando un patrón AAB. La hoja de ${x.T} muestra ${x.seq} y deja huecos para que el niño mantenga ese grupo de tres. Continuar un patrón con repetición desigual ejercita la atención al detalle.`,
    ],
    p2: (x) => [
      `Lo distintivo del AAB es que un dibujo se repite antes del otro: ${x.a}, ${x.a}, y recién entonces ${x.b}. El niño señala cada vagón de ${x.T} y dice el grupo de tres en voz alta; así descubre si el hueco pide ${x.a} otra vez o ya toca ${x.b}.`,
      `Para seguir el AAB hay que contar el turno doble: ${x.a} dos veces y ${x.b} una vez, una y otra vez. Recorriendo ${x.seq} con el dedo, el pequeño nota cuándo se cierra el grupo de tres y coloca el dibujo correcto, sin operaciones de por medio.`,
      `El AAB se completa observando el ritmo «dos y uno». El niño mira la fila de ${x.T}, ve que ${x.a} viene en pareja y ${x.b} en solitario, y continúa la serie. Es una unidad de tres que se lee de un vistazo cuando se dice en voz alta.`,
      `Seguir un patrón AAB pide notar dónde empieza y termina el grupo: ${x.a}, ${x.a}, ${x.b}. Con ${x.T} en los vagones, el pequeño anticipa el siguiente dibujo preguntándose «¿ya apareció ${x.a} dos veces?». Ese pequeño análisis es razonamiento de patrones.`,
      `A diferencia del simple turno, el AAB repite el primer dibujo antes de cambiar. Decir ${x.seq} en voz alta —marcando ${x.a} dos veces y luego ${x.b}— ayuda al niño de ${x.T} a no perder el grupo de tres y a completar el hueco con seguridad.`,
    ],
  },
  abb: {
    h1: (x) => [`Continúa el Patrón ABB con ${x.T}`, `Patrón ABB con ${x.T}: ¿Qué Dibujo Sigue?`, `Completa el Patrón ABB de ${x.T}`],
    p1: (x) => [
      `En un patrón ABB, primero llega un dibujo solo y luego el otro repetido dos veces. Esta hoja de ${x.T} lo arma con ${x.a}, ${x.b}, ${x.b} —${x.seq}— y el niño descubre qué sigue. Es el espejo del AAB: aquí la pareja está al final.`,
      `Esta hoja de ${x.T} trabaja el patrón ABB: ${x.a} una vez y después ${x.b} dos veces seguidas, y otra vez. La serie ${x.seq} repite ese grupo de tres, y la casilla vacía espera el dibujo que continúa. Notar que el segundo elemento se duplica es la clave.`,
      `Uno distinto y luego dos iguales: así avanza el patrón ABB. Con ${x.T}, la fila va ${x.seq}, repitiendo ${x.a}, ${x.b}, ${x.b}. El pequeño descubre la unidad de tres y la continúa, observando dónde aparece la pareja.`,
      `¿Qué sigue después de ${x.a}, ${x.b}, ${x.b}? Eso es un patrón ABB, y esta hoja de ${x.T} lo plantea con ${x.seq} El niño aprende a esperar ${x.b} dos veces tras cada ${x.a}, y completa el vagón que falta.`,
      `El patrón ABB lleva un ritmo de tres con la repetición al final: ${x.a}, ${x.b}, ${x.b}. En esta hoja de ${x.T}, ${x.seq} se repite con ese compás, y el pequeño elige el dibujo que sigue. Ver que el segundo dibujo viene en pareja afina la lectura.`,
      `Aquí ${x.a} aparece de a uno y ${x.b} de a dos, formando un patrón ABB. La hoja de ${x.T} muestra ${x.seq} y deja huecos para mantener ese grupo de tres. Continuar el ritmo «uno y luego dos» ejercita la atención.`,
    ],
    p2: (x) => [
      `Lo distintivo del ABB es que la pareja va al final: ${x.a}, y luego ${x.b}, ${x.b}. El niño señala cada vagón de ${x.T} y dice el grupo de tres en voz alta; así sabe si el hueco pide ${x.b} otra vez o ya vuelve ${x.a}.`,
      `Para seguir el ABB hay que esperar el turno doble del segundo dibujo: ${x.a} una vez y ${x.b} dos veces, una y otra vez. Recorriendo ${x.seq} con el dedo, el pequeño nota cuándo se cierra el grupo de tres y coloca el dibujo correcto.`,
      `El ABB se completa observando el ritmo «uno y dos». El niño mira la fila de ${x.T}, ve que ${x.a} viene solo y ${x.b} en pareja, y continúa la serie. Es una unidad de tres clara al decirla en voz alta.`,
      `Seguir un patrón ABB pide notar dónde está la pareja: ${x.a}, ${x.b}, ${x.b}. Con ${x.T} en los vagones, el pequeño anticipa el siguiente dibujo preguntándose «¿ya apareció ${x.b} dos veces?». Ese análisis es razonamiento de patrones.`,
      `A diferencia del AAB, en el ABB la repetición llega después del primer dibujo. Decir ${x.seq} en voz alta —${x.a} una vez y luego ${x.b} dos veces— ayuda al niño de ${x.T} a no perder el grupo de tres y a completar el hueco.`,
    ],
  },
  aabb: {
    h1: (x) => [`Continúa el Patrón AABB con ${x.T}`, `Patrón AABB con ${x.T}: ¿Qué Dibujo Sigue?`, `Completa el Patrón AABB de ${x.T}`],
    p1: (x) => [
      `En un patrón AABB, dos dibujos iguales llegan juntos y después otros dos iguales: pares y pares. Esta hoja de ${x.T} lo arma con ${x.a}, ${x.a}, ${x.b}, ${x.b} —${x.seq}— y el niño descubre qué sigue. Un ritmo de cuatro hecho de dos parejas.`,
      `Esta hoja de ${x.T} trabaja el patrón AABB: ${x.a} dos veces y luego ${x.b} dos veces, y otra vez. La serie ${x.seq} repite ese grupo de cuatro, y la casilla vacía espera el dibujo que continúa. Ver que cada dibujo viene en pareja es la clave.`,
      `Dos iguales y dos iguales: así avanza el patrón AABB. Con ${x.T}, la fila va ${x.seq}, repitiendo el bloque ${x.a}, ${x.a}, ${x.b}, ${x.b}. El pequeño descubre la unidad de cuatro y la continúa, observando las parejas.`,
      `¿Qué sigue después de ${x.a}, ${x.a}, ${x.b}, ${x.b}? Eso es un patrón AABB, y esta hoja de ${x.T} lo plantea con ${x.seq} El niño aprende a contar de a dos —${x.a} dos veces, ${x.b} dos veces— antes de que el grupo vuelva a empezar.`,
      `El patrón AABB es un ritmo de cuatro en parejas: ${x.a}, ${x.a}, ${x.b}, ${x.b}. En esta hoja de ${x.T}, ${x.seq} se repite con ese compás, y el pequeño elige el dibujo que sigue. Reconocer dos parejas seguidas es seriación más larga.`,
      `Aquí ${x.a} y ${x.b} aparecen de a dos cada uno, formando un patrón AABB. La hoja de ${x.T} muestra ${x.seq} y deja huecos para mantener ese grupo de cuatro. Continuar un ritmo de parejas ejercita la memoria del patrón.`,
    ],
    p2: (x) => [
      `Lo distintivo del AABB es que todo viene de a dos: primero la pareja de ${x.a}, luego la pareja de ${x.b}. El niño señala cada vagón de ${x.T} y dice el grupo de cuatro en voz alta; así sabe si el hueco cierra una pareja o abre la siguiente.`,
      `Para seguir el AABB hay que llevar la cuenta de las parejas: ${x.a} dos veces, ${x.b} dos veces, una y otra vez. Recorriendo ${x.seq} con el dedo, el pequeño nota cuándo se completa cada par y coloca el dibujo correcto.`,
      `El AABB se completa observando el ritmo «dos y dos». El niño mira la fila de ${x.T}, ve que ${x.a} y ${x.b} llegan en parejas, y continúa la serie. Es una unidad de cuatro que se ordena fácil al decirla en voz alta.`,
      `Seguir un patrón AABB pide notar dónde termina una pareja y empieza la otra: ${x.a}, ${x.a}, ${x.b}, ${x.b}. Con ${x.T} en los vagones, el pequeño anticipa el dibujo preguntándose «¿ya van dos?». Ese análisis es razonamiento de patrones.`,
      `A diferencia del AB, el AABB agrupa los dibujos de a dos antes de cambiar. Decir ${x.seq} en voz alta —marcando las dos parejas— ayuda al niño de ${x.T} a no perder el grupo de cuatro y a completar el hueco con seguridad.`,
    ],
  },
  abc: {
    h1: (x) => [`Continúa el Patrón ABC con ${x.T}`, `Patrón ABC con ${x.T}: ¿Qué Dibujo Sigue?`, `Completa el Patrón ABC de ${x.T}`],
    p1: (x) => [
      `En un patrón ABC, tres dibujos distintos van en fila y luego el trío vuelve a empezar. Esta hoja de ${x.T} lo arma con ${x.a}, ${x.b}, ${x.c} repitiéndose —${x.seq}— y el niño descubre qué sigue. Sin repeticiones dentro del grupo: tres diferentes, en orden.`,
      `Esta hoja de ${x.T} trabaja el patrón ABC: tres dibujos diferentes —${x.a}, ${x.b}, ${x.c}— en un orden fijo que se repite. La serie ${x.seq} avanza con ese trío, y la casilla vacía espera el que continúa. Recordar el orden de tres es un paso más exigente.`,
      `Tres dibujos distintos en secuencia: así avanza el patrón ABC. Con ${x.T}, la fila va ${x.seq}, repitiendo ${x.a}, ${x.b}, ${x.c} sin cambiar el orden. El pequeño descubre el trío y lo continúa, memorizando la fila.`,
      `¿Qué sigue después de ${x.a}, ${x.b}, ${x.c}? Eso es un patrón ABC, y esta hoja de ${x.T} lo plantea con ${x.seq} El niño aprende que ningún dibujo se repite dentro del grupo: primero ${x.a}, luego ${x.b}, luego ${x.c}, y otra vez.`,
      `El patrón ABC es un ritmo de tres sin repeticiones: ${x.a}, ${x.b}, ${x.c}, y vuelta a empezar. En esta hoja de ${x.T}, ${x.seq} se repite con ese orden, y el pequeño elige el dibujo que sigue. Seguir un trío de elementos distintos es seriación más rica.`,
      `Aquí tres dibujos —${x.a}, ${x.b}, ${x.c}— se turnan en orden, formando un patrón ABC. La hoja de ${x.T} muestra ${x.seq} y deja huecos para mantener el trío. Continuar un patrón de tres distintos ejercita la memoria de secuencia.`,
    ],
    p2: (x) => [
      `Lo distintivo del ABC es que los tres dibujos son diferentes y el orden manda: ${x.a}, después ${x.b}, después ${x.c}. El niño señala cada vagón de ${x.T} y dice el trío en voz alta; así sabe cuál de los tres toca en el hueco.`,
      `Para seguir el ABC hay que recordar la fila completa: ${x.a}, ${x.b}, ${x.c}, una y otra vez. Recorriendo ${x.seq} con el dedo, el pequeño nota en qué punto del trío está y coloca el dibujo correcto, sin contar.`,
      `El ABC se completa recordando el orden. El niño mira la fila de ${x.T}, ve que tres dibujos se turnan sin repetirse, y continúa la serie. Es un trío que se sostiene mejor al decirlo en voz alta.`,
      `Seguir un patrón ABC pide tener presentes los tres dibujos y su orden: ${x.a}, ${x.b}, ${x.c}. Con ${x.T} en los vagones, el pequeño anticipa el siguiente preguntándose «¿cuál de los tres va ahora?». Ese repaso es razonamiento de patrones.`,
      `A diferencia de los patrones con repetición, el ABC no duplica ningún dibujo dentro del grupo. Decir ${x.seq} en voz alta —los tres en orden— ayuda al niño de ${x.T} a no perder el trío y a completar el hueco con seguridad.`,
    ],
  },
};
// p3 (print/NEM close) — mode-tagged so even this paragraph differs across modes.
function p3(x, i) {
  return [
    `La hoja del patrón ${x.lab} se puede imprimir en PDF o jugar en línea de forma interactiva, siempre gratis y sin registrarse. No hay cronómetros ni puntajes: el ritmo lo marca cada niño, sin vergüenza por equivocarse. Se alinea con la Nueva Escuela Mexicana (SEP), campo formativo Saberes y Pensamiento Científico, en el reconocimiento de patrones de repetición y crecimiento, ideal para Preescolar (5 años).`,
    `Descarga el PDF de ${x.T} (patrón ${x.lab}) para imprimir o juega la versión interactiva en línea, gratis y sin crear cuenta. Sin reloj ni calificación: cada niña y cada niño avanza a su paso, porque volver a mirar la fila es parte de aprender. Enmarcada en la Nueva Escuela Mexicana (SEP), Saberes y Pensamiento Científico, en patrones de repetición y crecimiento, para Preescolar (5 años).`,
    `Imprime esta hoja de patrón ${x.lab} con ${x.T} o juégala en línea, sin registro y siempre gratis. Nada de cronómetros ni puntajes; el pequeño marca su ritmo con calma. Alineada con la Nueva Escuela Mexicana (SEP), campo formativo Saberes y Pensamiento Científico, en el aprendizaje de reconocer y continuar patrones, ideal para Preescolar (5 años).`,
    `El patrón ${x.lab} de ${x.T} está disponible para imprimir en PDF o jugar en línea de forma interactiva, gratis y sin cuenta. Sin relojes ni notas: cada niño avanza tranquilo. Se enmarca en la Nueva Escuela Mexicana (SEP), Saberes y Pensamiento Científico, en el reconocimiento de patrones de repetición y crecimiento, para niñas y niños de Preescolar (5 años).`,
  ][i % 4];
}

const pool = POOLS[modeArg];
const entries = facts.map((d, i) => {
  const T = themeDisplay(d.themeKey);
  const e = (d.elements || []).map((s) => s);
  const x = { T, a: lc(e[0] || ''), b: lc(e[1] || e[0] || ''), c: lc(e[2] || e[1] || e[0] || ''), seq: seqIllustration(modeArg, d.elements), lab: LABEL[modeArg] };
  const p1arr = pool.p1(x), p2arr = pool.p2(x), h1arr = pool.h1(x);
  let meta = `Hoja de patrones ${x.lab} con ${T} para preescolar: observa la secuencia (${x.seq.replace('…','')}) y descubre qué sigue. Gratis para imprimir o jugar en línea sin registro.`;
  if (meta.length > 170) meta = `Patrón ${x.lab} con ${T} (preescolar): observa la secuencia y descubre qué dibujo sigue. Gratis para imprimir o jugar en línea sin registro.`;
  if (meta.length > 170) meta = `Patrón ${x.lab} con ${T}: ¿qué sigue? Hoja de preescolar gratis para imprimir o jugar en línea.`;
  return {
    slug: d.slug,
    variantShape: 'singleton',
    coordinate: { type: 'pattern-train', mode: (modeArg === 'ab' ? null : modeArg), theme: d.themeKey, level: 'preescolar' },
    title: `Patrón ${x.lab} con ${T}: ¿Qué Sigue?`,
    metaDescription: meta,
    eyebrow: 'Hoja de patrones',
    h1: h1arr[i % h1arr.length],
    strand: STRAND,
    slotTokens: [d.elements[0], d.elements[1], d.elements[2], T, 'Preescolar (5 años)'].filter(Boolean),
    p1: p1arr[i % p1arr.length],
    p2: p2arr[i % p2arr.length],
    p3: p3(x, i),
    canonicalDeckSlug: d.slug,
    carousel: [],
  };
});

console.log(`mode=${modeArg} | built ${entries.length} | p1 pool ${pool.p1({T:'',a:'',b:'',c:'',seq:'',lab:''}).length} / p2 ${pool.p2({T:'',a:'',b:'',c:'',seq:'',lab:''}).length}`);
entries.slice(0, 2).forEach((e) => console.log('  ', e.slug, '|', e.title, '| meta', e.metaDescription.length, '\n     p1:', e.p1.slice(0, 120)));

if (DRY) { console.log('\n[DRY-RUN] no write.'); process.exit(0); }
const raw = fs.readFileSync(ES, 'utf8').replace(/\r\n/g, '\n');
const anchor = '  "landings": [\n';
if (raw.indexOf('"' + entries[0].slug + '"') !== -1) { console.error('FIRST ENTRY ALREADY PRESENT — abort'); process.exit(1); }
const blocks = entries.map((e) => JSON.stringify(e, null, 2).split('\n').map((ln) => '    ' + ln).join('\n')).join(',\n');
const next = raw.replace(anchor, anchor + blocks + ',\n', 1);
JSON.parse(next);
fs.writeFileSync(ES, next);
console.log('inserted', entries.length, '| total landings now:', JSON.parse(next).landings.length);
