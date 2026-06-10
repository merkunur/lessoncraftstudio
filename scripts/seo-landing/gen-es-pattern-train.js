#!/usr/bin/env node
/**
 * gen-es-pattern-train.js — es pattern-train (readiness) landings. AB-LEAD first
 * (--mode=ab, the 50 blank-exercise_mode decks); fan aab/abb/aabb/abc later.
 *
 * Readiness, NO-CCSS: no `standard`, no `levels` (Preescolar single-band via
 * coordinate.level='preescolar'), no `practiceProblems` (no Quiz). Strand = the
 * LOCKED es readiness-strand doctrine label: campo "Saberes y Pensamiento
 * Científico" + the native NEM Fase-2 PDA descriptor "Patrones de repetición y
 * crecimiento". Per-mode prose weaves the theme + the deck's own element nouns
 * (from manifest elementToImage) for cross-theme distinctness (§22 sharpening);
 * patterning makes NO count-claim so there is no honest-count/noun-vs-icon gate —
 * the element names are just the pictures that repeat.
 *
 * Reads: scripts/seo-landing/_pt-<mode>-facts.json (Stage-A dump), topics-taxonomy.json
 * Writes: surgical insert into es.json (CRLF→LF normalized; git stores LF).
 * Usage: node scripts/seo-landing/gen-es-pattern-train.js --mode=ab [--dry-run]
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
const lc = (s) => s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
const themeDisplay = (k) => { const e = tax.axes.theme[k]; return (e && e.name && e.name.es) ? e.name.es : k; };

// Mode spec: human pattern label + the repeating-unit description. AB lead now.
const MODE = {
  ab:   { label: 'AB',   unitWords: 'dos dibujos que se turnan' },
  aab:  { label: 'AAB',  unitWords: 'una unidad de tres: dos iguales y luego uno distinto' },
  abb:  { label: 'ABB',  unitWords: 'una unidad de tres: uno distinto y luego dos iguales' },
  aabb: { label: 'AABB', unitWords: 'una unidad de cuatro: dos iguales y luego otros dos iguales' },
  abc:  { label: 'ABC',  unitWords: 'una unidad de tres dibujos diferentes' },
};
// sequence illustration from element nouns, per mode (lowercased)
function seqIllustration(mode, els) {
  const e = els.map(lc);
  const a = e[0], b = e[1] || e[0], c = e[2] || b;
  if (mode === 'ab') return `${a}, ${b}, ${a}, ${b}…`;
  if (mode === 'aab') return `${a}, ${a}, ${b}, ${a}, ${a}, ${b}…`;
  if (mode === 'abb') return `${a}, ${b}, ${b}, ${a}, ${b}, ${b}…`;
  if (mode === 'aabb') return `${a}, ${a}, ${b}, ${b}, ${a}, ${a}, ${b}, ${b}…`;
  if (mode === 'abc') return `${a}, ${b}, ${c}, ${a}, ${b}, ${c}…`;
  return `${a}, ${b}…`;
}

const H1 = (lab, T, i) => [
  `Continúa el Patrón ${lab} con ${T}`,
  `Patrón ${lab} con ${T}: ¿Qué Dibujo Sigue?`,
  `Completa el Patrón ${lab} de ${T}`,
][i % 3];
function p1(T, lab, unit, seq, a, b, i) {
  return [
    `Esta hoja de patrones con ${T} arma un patrón ${lab}: ${unit} para formar una secuencia como ${seq} El niño descubre la parte que se repite y dice qué dibujo sigue. Continuar patrones de repetición es pensamiento lógico-matemático del preescolar, sin contar nada.`,
    `Termina el patrón. En esta hoja, ${a} y ${b} se turnan en un ritmo ${lab} —${seq}— y el pequeño completa los espacios vacíos para que el tren siga igual. Leer un patrón sencillo y continuarlo es de las primeras destrezas de razonamiento del preescolar.`,
    `Un patrón ${lab} es de los más sencillos: ${unit}. Esta hoja lo arma con dibujos de ${T} —la serie va ${seq}— y pide al niño colocar el dibujo correcto en cada vagón vacío. Reconocer el ritmo y extenderlo desarrolla la atención y el orden, sin números de por medio.`,
    `¿Qué sigue? En este tren de vagones, los dibujos de ${T} avanzan en un patrón ${lab}: ${seq} El niño observa, encuentra la regla que se repite y la continúa. Es seriación temprana: notar el orden de una sucesión y extenderlo, una base del pensamiento matemático.`,
    `Con ${a} y ${b} turnándose, esta hoja de ${T} crea un patrón ${lab} que se repite así: ${seq} La tarea del pequeño es mirar la secuencia, descubrir qué parte se repite y completar lo que falta. Continuar patrones prepara la mente para el conteo y las operaciones.`,
    `Esta actividad de preescolar presenta un patrón ${lab} con ${T}: ${unit}, en el orden ${seq} El niño completa las casillas vacías siguiendo el ritmo. Reconocer y continuar patrones es una destreza precursora del pensamiento numérico, sin sumar ni contar.`,
    `Mira el tren de dibujos: ${seq} Es un patrón ${lab} hecho con ${T}. El pequeño descubre la regla que se repite y elige el dibujo que sigue en cada espacio. Esta práctica afina la observación y el razonamiento lógico antes de los números.`,
    `El patrón ${lab} de esta hoja repite ${T} con un ritmo claro —${seq}— para que el niño anticipe qué viene después. Encontrar la unidad que se repite y continuarla es razonamiento de patrones, una base del aprendizaje matemático que se trabaja en el preescolar.`,
  ][i % 8];
}
function p2(T, lab, seq, i) {
  return [
    `La gracia del patrón ${lab} está en su ritmo constante: una vez descubierta la parte que se repite, el niño puede predecir qué sigue. Señalar con el dedo y decir la serie en voz alta —${seq}— ayuda a no perder el hilo y a comprobar la respuesta.`,
    `Para resolverlo, el pequeño lee la secuencia de izquierda a derecha, encuentra la unidad que se repite y la extiende. Nombrar cada dibujo de ${T} mientras avanza mantiene la atención en el ritmo del patrón, no en la cantidad: aquí no se cuenta nada.`,
    `Extender un patrón ${lab} pide sostener una regla simple en la mente y aplicarla una y otra vez. Esa constancia es preparación matemática del preescolar; hacerlo con dibujos conocidos de ${T} mantiene el reto claro y el ritmo fácil de ver.`,
    `El patrón se completa observando, no contando: el niño mira ${seq}, capta el ritmo y coloca el dibujo que falta. Trabajar con ${T} hace la práctica cercana, y decir la serie en voz alta convierte la seriación en un juego de observación.`,
    `Cada vagón vacío es una pequeña pregunta, «¿qué sigue?». El niño responde mirando el patrón ${lab} y continuando su ritmo. Practicar con ${T} mantiene la tarea concreta y divertida, y prepara el camino hacia el conteo y el orden numérico.`,
    `Al continuar el patrón ${lab}, el pequeño ejercita la idea de que una secuencia sigue una regla y se puede predecir. Con ${T} en los vagones, descubrir y extender ese ritmo se vuelve una práctica de razonamiento, sin ninguna operación de por medio.`,
  ][i % 6];
}
function p3(T, i) {
  return [
    `La hoja se puede imprimir en PDF para trabajar en papel o jugar en línea de forma interactiva, siempre gratis y sin necesidad de registrarse. No hay cronómetros ni puntajes: el ritmo lo marca cada niño, con un tono cálido y sin vergüenza por equivocarse. Esta actividad se alinea con la Nueva Escuela Mexicana (SEP), dentro del campo formativo Saberes y Pensamiento Científico, en el proceso de reconocer patrones de repetición y crecimiento, ideal para Preescolar (5 años).`,
    `Puedes descargar el PDF de ${T} para imprimir o jugar la versión interactiva en línea, gratis y sin crear cuenta. Sin cronómetro ni puntaje: cada niña y cada niño avanza a su ritmo, porque observar de nuevo la secuencia es parte de aprender. Se alinea con la Nueva Escuela Mexicana (SEP) en el campo formativo Saberes y Pensamiento Científico —reconocer y continuar patrones de repetición y crecimiento— pensada para Preescolar (5 años).`,
    `Disponible gratis: imprime la hoja de patrones o juégala en línea de forma interactiva, sin registrarse. No incluye cronómetros ni puntajes; el ritmo lo pone cada niño, con calidez y sin presión. Se alinea con la Nueva Escuela Mexicana (SEP), campo formativo Saberes y Pensamiento Científico, en el aprendizaje de reconocer patrones de repetición y crecimiento, ideal para Preescolar (5 años).`,
    `Esta hoja de ${T} está lista para imprimir en PDF o jugar en línea, gratis y sin cuenta. Nada de relojes ni calificaciones: el niño avanza tranquilo, y volver a mirar el patrón es parte natural de aprender. Alineada con la Nueva Escuela Mexicana (SEP), campo formativo Saberes y Pensamiento Científico —patrones de repetición y crecimiento—, pensada para Preescolar (5 años).`,
    `Juega la versión interactiva en línea o imprime el PDF; siempre gratis, sin registro. Sin cronómetro ni puntaje, cada pequeño marca su ritmo. La actividad se enmarca en la Nueva Escuela Mexicana (SEP), dentro de Saberes y Pensamiento Científico, en el reconocimiento y la continuación de patrones de repetición y crecimiento, ideal para niñas y niños de Preescolar (5 años).`,
  ][i % 5];
}

const spec = MODE[modeArg];
const entries = facts.map((d, i) => {
  const T = themeDisplay(d.themeKey);
  const seq = seqIllustration(modeArg, d.elements);
  const a = lc(d.elements[0] || ''); const b = lc(d.elements[1] || a);
  let meta = `Hoja de patrones ${spec.label} con ${T} para preescolar: observa la secuencia (${seq.replace('…','')}) y descubre qué sigue. Gratis para imprimir o jugar en línea sin registro.`;
  if (meta.length > 170) meta = `Patrón ${spec.label} con ${T} (preescolar): observa la secuencia y descubre qué dibujo sigue. Gratis para imprimir o jugar en línea sin registro.`;
  if (meta.length > 170) meta = `Patrón ${spec.label} con ${T}: ¿qué sigue? Hoja de preescolar gratis para imprimir o jugar en línea.`;
  return {
    slug: d.slug,
    variantShape: 'singleton',
    coordinate: { type: 'pattern-train', mode: (modeArg === 'ab' ? null : modeArg), theme: d.themeKey, level: 'preescolar' },
    title: `Patrón ${spec.label} con ${T}: ¿Qué Sigue?`,
    metaDescription: meta,
    eyebrow: 'Hoja de patrones',
    h1: H1(spec.label, T, i),
    strand: STRAND,
    slotTokens: [d.elements[0], d.elements[1], T, 'Preescolar (5 años)'].filter(Boolean),
    p1: p1(T, spec.label, spec.unitWords, seq, a, b, i),
    p2: p2(T, spec.label, seq, i),
    p3: p3(T, i),
    canonicalDeckSlug: d.slug,
    carousel: [],
  };
});

console.log(`mode=${modeArg} | built ${entries.length} entries`);
entries.slice(0, 2).forEach((e) => {
  console.log('---', e.slug, '---');
  console.log('  title:', e.title, '| meta len:', e.metaDescription.length);
  console.log('  p1:', e.p1.slice(0, 150));
});

if (DRY) { console.log('\n[DRY-RUN] no write.'); process.exit(0); }
const raw = fs.readFileSync(ES, 'utf8').replace(/\r\n/g, '\n');
const anchor = '  "landings": [\n';
if (raw.indexOf('"' + entries[0].slug + '"') !== -1) { console.error('FIRST ENTRY ALREADY PRESENT — abort'); process.exit(1); }
const blocks = entries.map((e) => JSON.stringify(e, null, 2).split('\n').map((ln) => '    ' + ln).join('\n')).join(',\n');
const next = raw.replace(anchor, anchor + blocks + ',\n', 1);
JSON.parse(next);
fs.writeFileSync(ES, next);
console.log('inserted', entries.length, '| total landings now:', JSON.parse(next).landings.length);
