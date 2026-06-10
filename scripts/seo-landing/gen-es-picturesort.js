#!/usr/bin/env node
/**
 * gen-es-picturesort.js — es picture-sort "-vs-" PAIRS (the de-orphan content side).
 *
 * Each landing sorts pictures of TWO themes (A = anchor "Animales", B = the other) into two
 * groups. Readiness (NO standard), preescolar, strand "Clasificación de seres vivos y objetos
 * por sus características" (R3). CHART-COUNT FENCE: sort/clasificar/separar/agrupar lexicon —
 * NEVER count-framing ("contar"/"cuántos") so it stays off chart-count's K.MD.B.3 head term.
 * es demand-cap = the 34 animals-anchored pairs (highest-recognition sort anchor). The deck's
 * "A-vs-B" subjectTag drives the locale-agnostic de-orphan (topic-decks.ts themeSubjectTagsWhere,
 * rides unchanged) so each page surfaces on BOTH component theme hubs.
 *
 * Reads: scripts/seo-landing/_ps-facts.json ({slug,pairKey,anchorDisp,otherDisp}), es.json.
 * Writes: surgical insert into es.json. Usage: node scripts/seo-landing/gen-es-picturesort.js [--dry-run]
 */
'use strict';
const fs = require('fs');
const DRY = process.argv.includes('--dry-run');
const ES = 'frontend/content/seo-landing/es.json';
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_ps-facts.json', 'utf8'));

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.618)); for (let d = 0; d < cells; d++) for (const c of [k + d, k - d]) if (c > 1 && c < cells && gcd(c, cells) === 1) return c; return 1; }
function cellAssign(i, S, P) { const cells = S * P, st = coprimeStride(cells); const c = ((i % cells) * st) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

const STRAND = 'Saberes y Pensamiento Científico — Clasificación de seres vivos y objetos por sus características';
const h1Forms = (A, B, i) => [`Clasifica las Imágenes: ${A} y ${B}`, `${A} o ${B}: Separa en Dos Grupos`, `Clasificar ${A} y ${B} por Categorías`][i % 3];
// {A} anchor display, {B} other display. Sort lexicon only — chart-count fence.
const SKEL = [
  `En esta hoja se mezclan dos clases de imágenes: las de {A} y las de {B}. El niño observa cada dibujo y lo coloca en el grupo al que pertenece —de un lado {A}, del otro {B}—, separando todo por su categoría. Aquí no se cuenta nada: se clasifica. Mirar en qué se parecen unas imágenes y en qué se diferencian de otras, y agruparlas por eso, es una habilidad científica temprana muy valiosa para la escuela. Con dibujos conocidos de {A} y {B}, empezar es fácil y cada grupo bien armado se siente como un pequeño logro.`,
  `Separar en dos grupos: de eso trata esta hoja de clasificación para preescolar. Todas las imágenes de {A} y de {B} están revueltas, y el niño las ordena según a qué clase pertenecen. Reconoce qué hace que un dibujo sea de {A} y qué lo hace de {B}, y así forma dos montones bien separados. No hay números ni se cuenta nada, solo observar con calma y clasificar por características. Esa forma de agrupar por semejanzas y diferencias prepara al pequeño para pensar y ordenar el mundo, a su propio ritmo y sin presión.`,
  `¿De qué grupo es cada imagen? El niño mira un dibujo, decide si va con {A} o con {B}, y lo coloca en su lugar. Esta hoja revuelve las imágenes de {A} y {B} para que el pequeño las clasifique, separando una categoría de la otra. No se cuenta: se observa y se agrupa por características. Esta práctica de clasificación es una destreza precursora tranquila, sin números, que en la escuela ayuda a ordenar ideas. Con {A} y {B} conocidos, la tarea se mantiene cercana y agradable, y la satisfacción de tener todo ordenado llega sola.`,
  `Clasificar es comparar y agrupar: en esta hoja, el niño separa las imágenes de {A} de las de {B}. Observa cada dibujo, nota qué características tiene y lo manda al grupo que le corresponde. Como solo hay dos categorías, la tarea es clara y da ánimo. El pequeño descubre que puede ordenar un montón revuelto con solo mirar con atención. Esta clasificación por características es una base científica valiosa, mucho antes de la primaria, y se hace sin contar y sin presión, con {A} y {B} de su mundo.`,
  `Dos grupos, un montón de imágenes revueltas, y el niño pone orden. En esta hoja separa las de {A} de las de {B}, llevando cada dibujo a su categoría. Es clasificación pura: observar, comparar y agrupar por lo que las imágenes tienen en común. Aquí no se cuenta nada, porque en preescolar el ojo y el criterio importan más que el número. Con {A} y {B} como acompañantes conocidos, la práctica se mantiene cálida y sin prisa, y cada grupo bien separado hace crecer un poco la confianza del pequeño.`,
  `¿{A} o {B}? Esa es la pregunta de esta hoja de clasificación para preescolar. El niño ve imágenes de las dos clases mezcladas y decide, una por una, a qué grupo pertenece cada dibujo. Con {A} y {B} que ya conoce, la primera mirada le resulta fácil. Así entrena el clasificar por características, una habilidad que más adelante necesitará para ordenar, comparar y razonar. No hay carrera ni estrellas que juntar: solo el pequeño separando con calma {A} de {B} y mirando con orgullo sus dos grupos terminados.`,
  `Un dibujo, una categoría, y poco a poco todo queda ordenado. Así de sencilla y valiosa es esta hoja de clasificar {A} y {B} para preescolar. El niño observa las imágenes revueltas y las reparte en dos grupos según sean de {A} o de {B}. Esta tarea afina el mirar con atención y el sentido de cómo agrupar por semejanzas, sin números y sin contar. En el año previo a la escuela, clasificar así es justamente una destreza precursora muy útil. El pequeño descubre en lugar de cumplir, y cada montón bien separado es un logro real que invita a seguir.`,
  `En esta hoja, el niño se vuelve un pequeño clasificador: observa cada imagen y decide si pertenece al grupo de {A} o al de {B}. Las imágenes empiezan todas revueltas, y el pequeño las separa por su categoría hasta dejar dos grupos claros. Se trata de observar y agrupar, no de contar, esa clasificación por características tan importante antes de que empiece la escuela. Con {A} y {B} conocidos, todo se mantiene como un juego. No hay tiempo que corra ni error que pese: solo la calma de ordenar un montón revuelto en sus dos grupos.`,
];
const P2 = [
  `En esta variante las imágenes de {A} y {B} se parecen un poco en color o forma, así que el niño observa con más cuidado antes de mandar cada dibujo a su grupo. Eso convierte el clasificar en una pequeña aventura de descubrimiento: se toma su tiempo, compara con calma y separa cada imagen con gusto. Sin números y sin prisa, solo mirar y agrupar por categoría, al ritmo del pequeño.`,
  `Aquí hay pocas imágenes, así que el niño arma rápido los dos grupos de {A} y {B} y siente enseguida el logro de tener todo ordenado. Es una tarea suave y clara para empezar, donde cada niño separa con confianza. Clasificar en lugar de contar, a tu propio ritmo, sin presión ni competencia.`,
  `En esta versión hay más imágenes para repartir, así que el niño clasifica un montón más grande de {A} y {B}, llevando cada dibujo a su grupo. Eso fortalece a la vez la constancia y el mirar con atención. No hay reloj ni puntos, solo la alegría tranquila de ver los dos grupos bien separados.`,
  `Aquí el niño puede nombrar en voz alta cada imagen mientras la coloca: "este es de {A}", "este es de {B}". Decir la categoría mientras separa ayuda a fijar el criterio y hace el clasificar más divertido. Aquí cuenta el ojo y el razonamiento, no el número, a su propio ritmo y sin apuro.`,
  `En esta variante hay un par de imágenes que podrían confundir, así que el niño piensa con cuidado a qué grupo van. Comparar entre {A} y {B} y decidir con calma afina el criterio de clasificación. Si duda, puede volver a mirar; cada decisión cuenta y nada lo apura. Sin presión de bien o mal, solo separar con calma en dos grupos.`,
  `Aquí lo bonito es hacerlo juntos: revuelvan las imágenes de {A} y {B} y vayan separándolas mientras conversan sobre por qué cada una va en su grupo. Hablar de las semejanzas y diferencias enriquece el clasificar y el lenguaje a la vez. Todo de juego, sin números, sin contar y sin carrera, al ritmo del pequeño.`,
  `En esta variante se mezcla una buena cantidad de imágenes, así que el niño clasifica con paciencia todo el montón de {A} y {B} hasta dejar dos grupos completos. Eso fortalece al mismo tiempo el mirar con atención y la constancia. Sin puntos ni reloj, solo el pequeño y la callada alegría de haber ordenado todo por categorías.`,
];
const P3 = (A, B) => `Si a tu pequeño le gusta separar estas imágenes de ${A} y ${B}, hay mucho más para descubrir, sin presión y sin contar. Puedes imprimir la hoja en PDF para trabajar en papel o jugar la versión interactiva en línea, siempre gratis y sin registrarse. No hay cronómetros ni puntajes: el ritmo lo marca cada niño, con calidez y sin vergüenza por equivocarse. Esta actividad se enmarca en la Nueva Escuela Mexicana (SEP), dentro del campo formativo Saberes y Pensamiento Científico, en la clasificación de seres vivos y objetos por sus características, ideal para niñas y niños de Preescolar (5 años).`;

const list = facts.slice().sort((a, b) => a.slug < b.slug ? -1 : 1);
const S = SKEL.length, P = P2.length, cells = S * P;
console.log(`picture-sort: ${list.length} pairs | cells ${S}x${P}=${cells} ` + (cells > list.length ? '[OK]' : '[WARN cells<pairs]'));
const fill = (s, A, B) => s.replace(/\{A\}/g, A).replace(/\{B\}/g, B);
const entries = list.map((f, i) => {
  const A = f.anchorDisp, B = f.otherDisp;
  const c = cellAssign(i, S, P);
  let meta = `Hoja de clasificación para preescolar: separa las imágenes de ${A} y ${B} en dos grupos, por sus características. Sin contar. Gratis para imprimir o jugar en línea.`;
  if (meta.length > 170) meta = `Clasifica ${A} y ${B} (preescolar): separa las imágenes en dos grupos. Gratis para imprimir o jugar en línea, sin registro.`;
  if (meta.length > 170) meta = meta.slice(0, 168).replace(/\s+\S*$/, '') + '.';
  return {
    slug: f.slug,
    variantShape: 'singleton',
    coordinate: { type: 'picture-sort', mode: null, theme: f.pairKey, level: 'preescolar' },
    title: `Clasifica las Imágenes: ${A} y ${B}`,
    metaDescription: meta,
    eyebrow: 'Hoja de clasificación',
    h1: h1Forms(A, B, i),
    strand: STRAND,
    slotTokens: [A, B, 'Preescolar (5 años)'],
    p1: fill(SKEL[c.skel], A, B),
    p2: fill(P2[c.p2], A, B),
    p3: P3(A, B),
    canonicalDeckSlug: f.slug,
    carousel: [1, 2, 5, 11].map((off) => { const n = list[(i + off) % list.length]; return { label: `Clasifica ${n.anchorDisp} y ${n.otherDisp}`, href: n.slug }; }),
  };
});
console.log('built', entries.length, '| sample', entries[0].slug, '|', entries[0].title);

if (DRY) { console.log('[DRY-RUN]'); process.exit(0); }
const raw = fs.readFileSync(ES, 'utf8').replace(/\r\n/g, '\n');
if (raw.indexOf('"' + entries[0].slug + '"') !== -1) { console.error('FIRST ENTRY ALREADY PRESENT — abort'); process.exit(1); }
const anchor = '  "landings": [\n';
const blocks = entries.map((e) => JSON.stringify(e, null, 2).split('\n').map((ln) => '    ' + ln).join('\n')).join(',\n');
const next = raw.replace(anchor, anchor + blocks + ',\n', 1);
JSON.parse(next);
fs.writeFileSync(ES, next);
console.log('inserted', entries.length, '| total now', JSON.parse(next).landings.length);
