#!/usr/bin/env node
/**
 * gen-es-readiness.js — config-driven es READINESS landing engine (es language-run).
 *
 * Mirrors the de readiness engine (gen-de-readiness.js) but for es: per-type CONFIG (embedded
 * below) with native-MX SKEL/P2 prose pools, {TEMA} = taxonomy theme display (axes.theme.<key>
 * .name.es). READINESS render path (ratified from pattern-train): NO `standard`, NO `levels`
 * (Preescolar single-band, coordinate.level='preescolar'), NO `practiceProblems` (no Quiz);
 * raw l.strand = the R3 NEM campo label. One landing per theme (dedupe; extras collapse).
 * Coprime SKEL×P2 cell-assign for within-type spread (cells must exceed theme breadth).
 *
 * Reads: scripts/seo-landing/_es-readiness.json (Stage-A facts {type|mode:[{slug,theme}]}),
 *        frontend/config/topics-taxonomy.json
 * Writes: surgical insert into es.json (CRLF→LF normalized).
 * Usage: node scripts/seo-landing/gen-es-readiness.js --type=grid-match [--mode=null] [--dry-run]
 */
'use strict';
const fs = require('fs');
const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const TYPE = (argv.find((a) => a.indexOf('--type=') === 0) || '').split('=')[1];
const MODEARG = (argv.find((a) => a.indexOf('--mode=') === 0) || '--mode=null').split('=')[1];
if (!TYPE) { console.error('--type required'); process.exit(1); }
const ES = 'frontend/content/seo-landing/es.json';
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_es-readiness.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const themeDisplay = (k) => { const e = tax.axes.theme[k]; return (e && e.name && e.name.es) ? e.name.es : k.replace(/_/g, ' '); };

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.618)); for (let d = 0; d < cells; d++) for (const c of [k + d, k - d]) if (c > 1 && c < cells && gcd(c, cells) === 1) return c; return 1; }
function cellAssign(i, S, P) { const cells = S * P, st = coprimeStride(cells); const c = ((i % cells) * st) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

// ---- per-type CONFIG (R3 strands; native-MX pools; {TEMA} = theme display) ----
// Module-scope T resolves `${T}` in the SKEL/P2 plain template strings to the literal
// placeholder "{TEMA}" (filled per-entry by .replace); the h1/title/meta/carousel/P3 arrow
// functions take their own `T` param which shadows this inside their bodies.
const T = '{TEMA}';
const CONFIG = {
  'grid-match': {
    eyebrow: 'Hoja de percepción visual',
    strand: 'Saberes y Pensamiento Científico — Observación y reconocimiento de formas en el entorno',
    h1: (T, i) => [`Cuadrícula de Imágenes con ${T}: Completa el Dibujo`, `Completa la Cuadrícula de ${T}`, `Cuadrícula de ${T}: ¿Qué Imagen Falta?`][i % 3],
    title: (T) => `Cuadrícula de Imágenes con ${T}: Completa el Dibujo`,
    meta: (T) => `Hoja de percepción visual para preescolar: observa la cuadrícula de ${T}, descubre qué imagen va en cada casilla vacía y completa el dibujo. Gratis para imprimir o jugar en línea.`,
    metaAlt: (T) => `Cuadrícula de imágenes con ${T} (preescolar): observa y completa las casillas vacías. Gratis para imprimir o jugar en línea, sin registro.`,
    carousel: (T) => `Cuadrícula con ${T}`,
    SKEL: [
      `¿Qué imagen va en la casilla vacía? En esta cuadrícula de ${T}, algunas casillas ya tienen su dibujo y otras están vacías. El niño observa con atención las imágenes de ${T} que ya están puestas y descubre cuál encaja en cada hueco para que el dibujo quede completo. Aquí no se cuenta nada: se observa. Mirar una parte y descubrir cómo encaja en el todo es percepción visual, una base importante antes de la escuela. Con dibujos conocidos de ${T}, empezar es fácil y cada casilla llena se siente como un pequeño logro.`,
      `Completar un dibujo: eso es lo bonito de esta cuadrícula de ${T} para preescolar. Algunas casillas ya muestran una imagen y otras esperan vacías la pieza correcta. El niño reconoce cuál de las imágenes de ${T} va en la casilla que falta y así, poco a poco, completa toda la cuadrícula. No hay números ni se cuenta nada, solo observar con cuidado y la satisfacción de encajar cada parte en el todo. Esa percepción de cómo una parte forma el conjunto prepara al pequeño para leer y escribir, a su propio ritmo y sin presión.`,
      `Observar en lugar de contar: en esta cuadrícula de ${T}, el niño descubre qué imagen va en cada casilla vacía. Algunas ya están llenas, y las imágenes de ${T} que contienen dan la pista de lo que falta. El pequeño compara, piensa y completa la cuadrícula casilla por casilla, en una práctica tranquila de percepción parte-todo. No hay puntos ni reloj que corra; puede mirar todo el tiempo que quiera. Con ${T} de su mundo, la tarea se mantiene cercana y agradable, y el logro llega solo.`,
      `Llenar la casilla que falta: de eso trata esta cuadrícula de imágenes para preescolar. El niño mira las imágenes de ${T} que ya están en la cuadrícula y averigua qué pieza va en el hueco para que todo encaje. Así practica, jugando, a pensar la parte dentro del todo, sin una sola operación. Esta percepción visual es una destreza precursora valiosa, mucho antes de que empiece la primaria. Es una tarea suave, sin bien o mal bajo presión: el pequeño observa, prueba y se alegra cuando el dibujo de ${T} queda completo.`,
      `Algunas casillas llenas, otras vacías, y el niño completa el dibujo. En esta cuadrícula reconoce cuál de las imágenes de ${T} encaja en cada cuadro libre y así arma toda la composición. Es percepción visual pura: observar, comparar y colocar la pieza adecuada en el conjunto. Aquí no se cuenta nada, porque en preescolar el ojo importa más que el número. Con ${T} como acompañantes conocidos, la práctica se mantiene cálida y sin prisa, y cada casilla bien resuelta hace crecer un poco la confianza del pequeño.`,
      `¿Qué pieza encaja en la cuadrícula? Esa es la pregunta de esta hoja de ${T} para preescolar. El niño ve una cuadrícula con algunas casillas llenas y otras vacías, y piensa cuál de las imágenes de ${T} va en el hueco. Con dibujos que ya conoce, la primera mirada le resulta fácil. Así entrena la percepción parte-todo, una habilidad que más adelante necesitará para reconocer letras y formas. No hay carrera ni estrellas que juntar: solo el pequeño completando con calma un dibujo de ${T} y mirando con orgullo la cuadrícula terminada.`,
      `Una casilla vacía, la pieza correcta, y el dibujo queda listo. Así de sencilla y valiosa es esta cuadrícula de ${T} para preescolar. El niño observa las imágenes de ${T} en la cuadrícula y descubre cuál falta para completarlo todo. Esta tarea afina el mirar con atención y el sentido de cómo una parte pertenece al todo, sin números y sin contar. En el año previo a la escuela, eso es justamente una destreza precursora muy útil. El pequeño descubre en lugar de cumplir, y cada cuadrícula completa es un logro real que invita a seguir.`,
      `En esta cuadrícula de ${T}, el niño se vuelve un observador atento: mira con cuidado y reconoce qué pieza va en la casilla vacía. Algunas casillas ya están llenas y el resto espera; con las imágenes de ${T} como pista, el pequeño completa el dibujo casilla por casilla. Se trata de observar en lugar de contar, de la percepción parte-todo tan importante antes de que empiece la escuela. Con ${T} conocidos, todo se mantiene como un juego. No hay tiempo que corra ni error que pese: solo la calma de armar un dibujo completo.`,
    ],
    P2: [
      `En esta variante solo hay unas pocas casillas dadas, así que el niño observa con más cuidado las imágenes de ${T} para cerrar los huecos. Eso convierte el completar en una pequeña aventura de descubrimiento: se toma su tiempo, compara con calma y coloca cada pieza con gusto. Sin números y sin prisa, solo mirar y dejar que encaje, al ritmo del pequeño.`,
      `Aquí la cuadrícula ya está medio llena y el niño agrega las imágenes que faltan paso a paso. Observa las de ${T} alrededor y siente qué pieza va en el espacio vacío. Es una tarea suave y clara para empezar, donde cada niño tiene su logro. Observar en lugar de contar, a tu propio ritmo, sin presión ni competencia.`,
      `En esta versión, una cuadrícula un poco más grande invita al niño a llenar varias casillas seguidas. Con las imágenes de ${T} como guía, va reconociendo qué pieza va en cada lugar y completa todo el dibujo. Eso fortalece a la vez la constancia y el mirar con atención. No hay reloj ni puntos, solo la alegría tranquila de la cuadrícula terminada.`,
      `En esta variante las imágenes se parecen un poco entre sí, así que el niño distingue con cuidado entre las de ${T} antes de poner la pieza en la casilla vacía. Eso afina la percepción visual de una manera bonita y de juego. El pequeño puede mirar todas las veces que quiera; aquí cuenta el ojo, no el número. Un paso cariñoso hacia la percepción parte-todo.`,
      `Esta versión trae más casillas vacías, así que el niño completa el dibujo casi por su cuenta. Con las imágenes de ${T} como pequeño ancla en la cuadrícula, descubre qué pieza falta en cada caso y va llenando un hueco tras otro. Eso le da la grata sensación de haber armado algo completo. Sin prisa y sin presión de bien o mal, solo observar con calma y completar.`,
      `Aquí la cuadrícula es más pequeña y muy clara, ideal para el primer intento. El niño mira las imágenes de ${T} y completa con una sola pieza adecuada la casilla que falta. Así el completar sale rápido y dan ganas de seguir con el siguiente dibujo. Observar en lugar de contar, cálido y sin ningún apuro, al ritmo del pequeño.`,
      `En esta variante se mezcla una selección variada en la cuadrícula, así que el niño elige entre varias opciones la pieza que de verdad encaja. Compara las imágenes de ${T}, piensa con calma y completa el dibujo con cuidado. Eso fortalece al mismo tiempo el mirar con atención y la paciencia. Sin puntos ni reloj, solo el pequeño y la callada alegría de completar una cuadrícula.`,
    ],
    P3: (T) => `Si a tu pequeño le gusta esta cuadrícula de ${T}, hay mucho más para descubrir, sin presión y sin contar. Puedes imprimir la hoja en PDF para trabajar en papel o jugar la versión interactiva en línea, siempre gratis y sin registrarse. No hay cronómetros ni puntajes: el ritmo lo marca cada niño, con calidez y sin vergüenza por equivocarse. Esta actividad se enmarca en la Nueva Escuela Mexicana (SEP), dentro del campo formativo Saberes y Pensamiento Científico, en la observación y el reconocimiento de formas del entorno, ideal para niñas y niños de Preescolar (5 años).`,
  },
};

const cfg = CONFIG[TYPE];
if (!cfg) { console.error('no CONFIG for type ' + TYPE); process.exit(1); }
const key = TYPE + '|' + MODEARG;
const rawFacts = facts[key];
if (!rawFacts) { console.error('no facts for ' + key); process.exit(1); }
// dedupe to one landing per theme (first slug; skip null/ERR themes)
const seen = new Set(); const list = [];
for (const f of rawFacts) { if (!f.theme || /^ERR:/.test(f.theme) || seen.has(f.theme)) continue; seen.add(f.theme); list.push(f); }
list.sort((a, b) => a.theme < b.theme ? -1 : 1);
const S = cfg.SKEL.length, P = cfg.P2.length, cells = S * P;
console.log(`${key}: ${rawFacts.length} decks → ${list.length} themes | cells ${S}x${P}=${cells} ` + (cells > list.length ? '[OK]' : '[INVARIANT WARN cells<themes]'));

const entries = list.map((f, i) => {
  const T = themeDisplay(f.theme);
  const c = cellAssign(i, S, P);
  let meta = cfg.meta(T); if (meta.length > 170) meta = cfg.metaAlt(T);
  return {
    slug: f.slug,
    variantShape: 'singleton',
    coordinate: { type: TYPE, mode: (MODEARG === 'null' ? null : MODEARG), theme: f.theme, level: 'preescolar' },
    title: cfg.title(T),
    metaDescription: meta,
    eyebrow: cfg.eyebrow,
    h1: cfg.h1(T, i),
    strand: cfg.strand,
    slotTokens: [T, 'Preescolar (5 años)'],
    p1: cfg.SKEL[c.skel].replace(/\{TEMA\}/g, T),
    p2: cfg.P2[c.p2].replace(/\{TEMA\}/g, T),
    p3: cfg.P3(T),
    canonicalDeckSlug: f.slug,
    carousel: [1, 2, 5, 11].map((off) => { const n = list[(i + off) % list.length]; return { label: cfg.carousel(themeDisplay(n.theme)), href: n.slug }; }),
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
