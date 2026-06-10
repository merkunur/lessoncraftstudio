#!/usr/bin/env node
/**
 * gen-es-chartcount.js — generate the 49 remaining es chart-count landing entries
 * (the lead `contar-en-grafico-animales` is already in es.json) on the salvaged
 * 50-theme catalog. Quiz node fans (operator-ruled post-RRT).
 *
 * Honest-count binding: per-category count = manifest icon occurrences (= rendered
 * bar height, from _cc-facts.json) and plural/gender = image-vocabulary.js. Prose
 * p2 counts AND Quiz acceptedAnswers both draw from the SAME facts → agree by
 * construction with the chart. Ledger: K.MD.B.3 (no-targetUrl), campo strand,
 * Preescolar–Primer span (levels), NEM(SEP), ¿cuántos hay? framing.
 *
 * Reads:  scripts/seo-landing/_cc-facts.json  (Stage-A server dump, pulled local)
 *         REFERENCE TRANSLATIONS/image-vocabulary.js  (es [sing,plural,gender])
 *         frontend/config/topics-taxonomy.json  (axes.theme.<key>.name.es)
 * Writes: surgical insert of 49 entries at the head of es.json landings[].
 *
 * Usage: node scripts/seo-landing/gen-es-chartcount.js [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const LEAD_SLUG = 'contar-en-grafico-animales';
const ES = 'frontend/content/seo-landing/es.json';
// Cull: themes en's proven chart-count set deliberately excludes — non-countable-
// discrete for "count how many objects" (activities=verbs/sports, emotions=faces,
// weather/seasons=abstract, body_parts per operator). Decks stay /decks/, no landing.
const CULL_THEMES = new Set(['activities', 'body_parts', 'emotions', 'spring', 'summer', 'weather', 'winter']);

// --- load sources ---
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_cc-facts.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const vmod = {};
new Function('module', fs.readFileSync('REFERENCE TRANSLATIONS/image-vocabulary.js', 'utf8') + '\nmodule.exports=IMAGE_VOCABULARY;')(vmod);
const VOCAB = vmod.exports;

// [singular, plural, gender] override map — checked BEFORE vocab (precedence).
// Two classes:
//  (a) VOCAB GAPS — nouns absent from image-vocabulary.js (8).
//  (b) COUNT-NOUN OVERRIDES — vocab resolves to an abstract/awkward label that
//      mis-describes the rendered ICON; each verified against the deck thumbnail
//      (icon-depiction → noun) per the operator's honest-count gate.
const OVERRIDE = {
  // (a) vocab gaps
  poplar:    ['Álamo', 'Álamos', 'm'],
  palm:      ['Palmera', 'Palmeras', 'f'],
  hemlock:   ['Cicuta', 'Cicutas', 'f'],
  spruce:    ['Picea', 'Piceas', 'f'],
  sceptical: ['Cara escéptica', 'Caras escépticas', 'f'],   // (in a culled theme; harmless)
  spanner:   ['Llave inglesa', 'Llaves inglesas', 'f'],
  rocker:    ['Mecedora', 'Mecedoras', 'f'],
  note:      ['Nota musical', 'Notas musicales', 'f'],
  // (b) count-noun overrides — icon-verified (thumbnail), precedence over vocab
  liberty:     ['Estatua de la Libertad', 'Estatuas de la Libertad', 'f'], // icon: Statue of Liberty
  'uncle-sam': ['Tío Sam', 'Tíos Sam', 'm'],                               // icon: Uncle Sam figure
  uncle_sam:   ['Tío Sam', 'Tíos Sam', 'm'],
  autumn:      ['Árbol de otoño', 'Árboles de otoño', 'm'],                // icon: autumn-foliage tree (NOT a leaf)
  delivery:    ['Cartero', 'Carteros', 'm'],                               // icon: mail-carrier person
  santa:       ['Santa Claus', 'Santa Claus', 'm'],                        // icon: Santa figure (invariant plural)
  'santa-claus': ['Santa Claus', 'Santa Claus', 'm'],
  santa_claus: ['Santa Claus', 'Santa Claus', 'm'],
};

function resolveEs(nounKey) {
  const base = nounKey.replace(/-\d+$/, '');
  // override precedence (curated count-nouns + vocab gaps)
  if (OVERRIDE[nounKey]) return OVERRIDE[nounKey];
  if (OVERRIDE[base]) return OVERRIDE[base];
  if (OVERRIDE[base.replace(/-/g, '_')]) return OVERRIDE[base.replace(/-/g, '_')];
  const cands = [nounKey, nounKey.replace(/-/g, '_'), nounKey.replace(/-/g, '')];
  if (base !== nounKey) cands.push(base, base.replace(/-/g, '_'), base.replace(/-/g, ''));
  for (const k of cands) { if (VOCAB[k] && VOCAB[k].es) return VOCAB[k].es; }
  return null;
}
// proper nouns whose first letter must NOT be lowercased mid-sentence
const PROPER = new Set(['Santa Claus']);
const lc = (s) => PROPER.has(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);
function themeDisplay(themeKey) {
  const e = tax.axes.theme[themeKey];
  return (e && e.name && e.name.es) ? e.name.es : themeKey;
}

// --- native-MX prose: theme + specific-noun woven throughout (§22 boilerplate→
// mode-true sharpening) so each page's unique content dominates the corpus. ex =
// 2-3 of the deck's own category nouns (plural, lowercased); top = the tallest bar.
function p1(T, ex, i) {
  const [a, b, c] = ex;
  return [
    `Esta hoja de conteo con el tema de ${T} invita a las niñas y los niños a contar y organizar datos: hay que juntar los dibujos iguales —por ejemplo, separar ${a} de ${b}— contar cuántos hay de cada clase y colorear las casillas hasta la altura correcta para ir armando una gráfica o pictograma. Al clasificar ${a}, ${b} y ${c} en columnas, el pequeño practica una idea base del pensamiento matemático: ordenar por categorías y comparar cantidades.`,
    `Con esta gráfica de conteo de ${T}, las niñas y los niños cuentan para responder «¿cuántos hay?». La hoja mezcla varios dibujos —${a}, ${b}, ${c}…— y pide reunir los que son iguales, contar cada grupo y pintar una columna casilla por casilla hasta formar un pictograma. Es una primera aproximación a la organización de datos: clasificar ${a} y ${b} por tipo, contar cuántos hay y comparar cuál grupo es más grande.`,
    `En esta actividad de ${T}, el niño mira los dibujos, junta los iguales —los ${a} con los ${a}, los ${b} con los ${b}— cuenta cuántos hay de cada uno y colorea las casillas que correspondan. Al terminar, columnas como la de ${c} forman un pictograma que se lee de un vistazo. La tarea ejercita el conteo y la clasificación de manera concreta y visual, sin prisa.`,
    `Esta hoja de conteo y gráfica con ${T} propone una tarea clara: clasificar los dibujos por tipo —${a}, ${b}, ${c} y más— contar cuántos hay de cada clase y colorear una casilla por dibujo hasta levantar cada columna. Así el pequeño aprende a organizar datos y a comparar cantidades, viendo de inmediato qué grupo tiene más y cuál tiene menos.`,
  ][i % 4];
}
function p3(T, top, i) {
  return [
    `La hoja de ${T} se puede imprimir en PDF para trabajar en papel o jugar en línea, siempre gratis y sin registrarse. No hay cronómetros ni puntajes: el ritmo lo marca cada niño, sin vergüenza por equivocarse, porque contar de nuevo —volver a revisar la columna de ${top}, por ejemplo— es parte de aprender. Esta actividad se alinea con la Nueva Escuela Mexicana (SEP), en el campo formativo Saberes y Pensamiento Científico (Matemáticas), y es ideal para Preescolar (5 años) a Primer grado de primaria, de 5 a 7 años.`,
    `Puedes descargar el PDF de ${T} para imprimir o jugar la versión interactiva en línea, gratis y sin crear cuenta. Sin cronómetro ni puntaje: cada niña y cada niño avanza a su ritmo, con calidez y sin presión. La actividad se alinea con la Nueva Escuela Mexicana (SEP) en el campo formativo Saberes y Pensamiento Científico (Matemáticas), pensada para Preescolar (5 años) a Primer grado de primaria (5 a 7 años). Después de contar, conviene comparar las columnas y ver si la de ${top} es la más alta.`,
    `Disponible gratis: imprime la hoja de ${T} para trabajar en papel o juégala en línea, sin necesidad de registrarse. No incluye cronómetros ni puntajes; revisar y contar otra vez también es aprender. Se alinea con la Nueva Escuela Mexicana (SEP), campo formativo Saberes y Pensamiento Científico (Matemáticas), ideal para niñas y niños de Preescolar (5 años) a Primer grado de primaria, con edades de 5 a 7 años. El siguiente paso es comparar cuál categoría tiene más dibujos.`,
    `Esta gráfica de ${T} está disponible gratis para imprimir en PDF o jugar en línea, sin registro. Sin relojes ni puntajes: el ritmo lo pone cada niño, con un tono amable. Alineada con la Nueva Escuela Mexicana (SEP), en el campo formativo Saberes y Pensamiento Científico (Matemáticas), es ideal para Preescolar (5 años) a Primer grado de primaria, de 5 a 7 años. Al final, comparar las columnas —¿es la de ${top} la más grande?— afianza la lectura del pictograma.`,
  ][i % 4];
}

function buildEntry(deck, i) {
  const T = themeDisplay(deck.themeKey);
  const cats = deck.categories.map((c) => {
    const es = resolveEs(c.nounKey);
    if (!es) throw new Error('UNRESOLVED noun ' + c.nounKey + ' in ' + deck.slug);
    return { sing: es[0], plural: es[1], gender: es[2] || 'm', count: c.count };
  });
  // p2: honest-count weave — "cuenta 5 loros, 4 cerdos … y 1 ballena" (2 skeletons)
  const items = cats.map((c) => `${c.count} ${lc(c.count === 1 ? c.sing : c.plural)}`);
  const list = items.length > 1 ? items.slice(0, -1).join(', ') + ' y ' + items[items.length - 1] : items[0];
  const ex = cats.map((c) => lc(c.plural));               // example nouns for p1
  const top = lc([...cats].sort((a, b) => b.count - a.count)[0].plural); // tallest bar for p3
  const p2 = (i % 2 === 0)
    ? `En este mazo, el niño cuenta ${list}. Al colorear una casilla por cada dibujo, la columna más alta muestra de un vistazo qué grupo tiene más y cuál tiene menos; señalar con el dedo cada dibujo mientras se cuenta ayuda a no perder la cuenta y a comprobar la respuesta.`
    : `Aquí hay que contar ${list}. Cada grupo se lleva a su propia columna, así que al terminar se ve a simple vista cuál categoría quedó más alta y cuál más baja; contar señalando con el dedo evita saltarse dibujos y permite revisar la respuesta antes de seguir.`;
  // meta ≤170
  let meta = `Hoja de conteo con el tema de ${T} para niños de 5 a 7 años: cuenta cuántos hay de cada dibujo y colorea la gráfica. Gratis para imprimir o jugar en línea sin registro.`;
  if (meta.length > 170) meta = `Hoja de conteo (${T}) para niños de 5 a 7 años: cuenta cuántos hay de cada dibujo y colorea la gráfica. Gratis para imprimir o jugar sin registro.`;
  if (meta.length > 170) meta = `Hoja de conteo con ${T}: cuenta cuántos hay de cada dibujo y colorea la gráfica. Gratis para imprimir o jugar en línea sin registro.`;
  // practiceProblems — gender-correct, one per category
  const pp = cats.map((c) => ({
    q: `${c.gender === 'f' ? '¿Cuántas' : '¿Cuántos'} ${lc(c.plural)} hay?`,
    a: String(c.count),
  }));
  return {
    slug: deck.slug,
    variantShape: 'singleton',
    coordinate: { type: 'chart-count', mode: null, theme: deck.themeKey, level: 'primer-grado' },
    levels: ['preescolar', 'primer-grado'],
    title: `Contar ${T} en una Gráfica: ¿Cuántos Hay?`,
    metaDescription: meta,
    eyebrow: 'Hoja de conteo y gráfica',
    h1: `Cuenta y Completa la Gráfica: ${T}`,
    strand: 'Saberes y Pensamiento Científico — Matemáticas',
    standard: 'K.MD.B.3',
    slotTokens: [...cats.map((c) => c.sing), T, 'Preescolar (5 años) a Primer grado'],
    p1: p1(T, [ex[0], ex[1] || ex[0], ex[2] || ex[1] || ex[0]], i),
    p2,
    p3: p3(T, top, i),
    canonicalDeckSlug: deck.slug,
    carousel: [],
    practiceProblems: pp,
  };
}

const targets = facts.filter((d) => d.slug !== LEAD_SLUG && !CULL_THEMES.has(d.themeKey));
console.log('culled (non-countable):', facts.filter((d) => CULL_THEMES.has(d.themeKey)).map((d) => d.themeKey).join(', '));
const entries = targets.map((d, i) => buildEntry(d, i));
console.log('built entries:', entries.length, '(skipped lead:', facts.length - targets.length + ')');

// sanity preview
entries.slice(0, 3).forEach((e) => {
  console.log('---', e.slug, '---');
  console.log('  title:', e.title, '| meta len:', e.metaDescription.length);
  console.log('  h1:', e.h1);
  console.log('  p2:', e.p2.slice(0, 140));
  console.log('  pp:', JSON.stringify(e.practiceProblems));
});

if (DRY) { console.log('\n[DRY-RUN] no write.'); process.exit(0); }

// surgical insert at head of landings[] (normalize CRLF→LF; git stores LF)
const raw = fs.readFileSync(ES, 'utf8').replace(/\r\n/g, '\n');
const anchor = '  "landings": [\n';
if (raw.indexOf('"' + entries[0].slug + '"') !== -1) { console.error('FIRST ENTRY ALREADY PRESENT — abort'); process.exit(1); }
const blocks = entries.map((e) => JSON.stringify(e, null, 2).split('\n').map((ln) => '    ' + ln).join('\n')).join(',\n');
const next = raw.replace(anchor, anchor + blocks + ',\n', 1);
JSON.parse(next); // validate
fs.writeFileSync(ES, next);
console.log('inserted', entries.length, 'entries; total landings now:', JSON.parse(next).landings.length);
