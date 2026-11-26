#!/usr/bin/env node
/**
 * The click-rate test of 2026-11-26 (operator: "yes"): the new title and meta description of the 25 CHANGE pages.
 * Reads pages.json (the 50 pages, their pairs and their live title/description before the change) and writes
 * treatment.json. Fails on a page that is not a CHANGE page, a title over 60 characters (before the brand suffix the
 * layout adds) or a description outside 120-160 characters. apply-treatment.js writes treatment.json into the sources.
 *
 *   node docs/SEO/ctr-test-2026-11/build-treatment.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = __dirname;

/** [path, source, title, description]. source: landing:<loc> · override:<loc>:<section>:<key> · seasonal:<loc>:<season> · subjecthub:<loc>:<subject>:<level> */
const T = [
  ['/es/topic/preescolar/grande-pequeno', 'override:es:intersection:big-small__preschool', 'Grande y pequeño para preescolar – fichas para imprimir', 'Fichas de grande y pequeño para preescolar: compara los dibujos y elige el grande, el mediano o el pequeño. Imprime el PDF gratis o resuélvelas en línea.'],
  ['/en/topic/find-objects', 'override:en:singleAxis:find-objects', 'Find the Objects Worksheets – Hidden Objects, Free PDF', 'Find the objects worksheets: kids search a busy picture scene and find every object on the list, or spot the one that is different. Free PDF or play online.'],
  ['/it/worksheets/linea-dei-numeri-fino-a-30', 'landing:it', 'Linea dei numeri fino a 30: scheda classe prima PDF gratis', 'Linea dei numeri fino a 30 per la classe prima: quattro rette con le etichette ogni cinque e frecce sui numeri da scrivere. Scheda gratuita in PDF da stampare.'],
  ['/en/worksheets/arrays-multiplication-grade-2', 'landing:en', 'Multiplication Array Worksheets for 2nd Grade – Free PDF', 'Free 2nd grade array worksheets: count the rows and how many are in each row, then write the repeated addition – a first step to multiplication. Printable PDF.'],
  ['/it/worksheets/frasi-in-corsivo-da-ricopiare', 'landing:it', 'Frasi in corsivo da ricopiare – scheda classe seconda PDF', 'Tre frasi in stampato da ricopiare in corsivo, classe seconda: la prima è anche in corsivo grigio da ripassare; due righe per frase. Scheda PDF gratis.'],
  ['/fr/worksheets/decoupage-collage', 'landing:fr', 'Découpage collage maternelle à imprimer (PDF gratuit)', 'Fiche de découpage collage pour la maternelle : l’enfant découpe les images d’animaux, les trie et colle chacune dans la bonne case. PDF gratuit à imprimer.'],
  ['/it/worksheets/inizio-svolgimento-e-conclusione-di-una-storia', 'landing:it', 'Inizio, svolgimento e conclusione: scheda classe prima PDF', 'Inizio, svolgimento e conclusione, classe prima: due storie con inizio e fine illustrati e un riquadro vuoto dove il bambino disegna lo svolgimento. PDF gratis.'],
  ['/nl/worksheets/getallenlijn-tot-30', 'landing:nl', 'Getallenlijn tot 30 – werkblad groep 3 (gratis PDF)', 'Gratis werkblad getallenlijn tot 30 voor groep 3: vier lijnen met de vijfvouden erbij en pijlen naar de getallen die het kind zelf invult. Print de PDF.'],
  ['/no/worksheets/oppstilt-addisjon-tosifret', 'landing:no', 'Oppstilt addisjon uten veksling – oppgaveark PDF gratis', 'Gratis oppgaveark i oppstilt addisjon: seks plusstykker med tosifrede tall uten veksling, og plassverdibokser holder enere og tiere på plass. PDF til utskrift.'],
  ['/it/worksheets/lettere-maiuscole-tratteggiate', 'landing:it', 'Lettere maiuscole tratteggiate da stampare – PDF gratis', 'Lettere maiuscole tratteggiate, scuola dell’infanzia: sei lettere da ricalcare, ognuna con uno spazio vuoto a fine riga per scriverla da solo. PDF gratis.'],
  ['/de/worksheets/silbenkarten-tiere', 'landing:de', 'Silbenkarten Tiere mit Silbenbögen – 1. Klasse PDF', 'Silbenkarten für die 1. Klasse: acht Tierkarten, jedes Wort mit Silbenbögen – Ka-nin-chen, Fle-der-maus. Silbe für Silbe lesen. Kostenlos als PDF.'],
  ['/de/worksheets/kontinente-und-ozeane-weltkarte-klasse-3', 'landing:de', 'Kontinente und Ozeane – Arbeitsblatt Weltkarte, Klasse 3', 'Arbeitsblatt Kontinente und Ozeane, Klasse 3: Das Kind ordnet den zwölf Nummern auf der Weltkarte die sieben Kontinente und fünf Ozeane zu. Kostenlos als PDF.'],
  ['/pt/worksheets/numeros-pontilhados', 'landing:pt', 'Números pontilhados de 0 a 9 para imprimir – PDF grátis', 'Números pontilhados de 0 a 9 para cobrir, na educação infantil: modelo, ponto de partida e setas mostram o traçado certo. Atividade para imprimir em PDF grátis.'],
  ['/nl/worksheets/rekenpiramide-tot-100', 'landing:nl', 'Rekenpiramide tot 100 – werkblad groep 4 (gratis PDF)', 'Werkblad rekenpiramides tot 100 voor groep 4: vier piramides met startgetallen van 5 tot 12, en het kind telt steen voor steen op tot de top. Gratis PDF.'],
  ['/it/worksheets/continenti-e-oceani-sulla-carta-geografica', 'landing:it', 'Continenti e oceani sul planisfero – scheda classe terza PDF', 'Scheda su continenti e oceani per la classe terza: sul planisfero ci sono undici numeri da abbinare ai nomi di sei continenti e cinque oceani. PDF gratis.'],
  ['/fi/worksheets/labyrintti-tehtavat', 'landing:fi', 'Labyrintti lapsille – tulostettava tehtävä esikouluun (PDF)', 'Ilmainen labyrinttitehtävä esikouluun: lapsi kuljettaa kynää isoa labyrinttia pitkin eläinhahmolta maaliin. Harjoittaa hahmottamista ja kynänhallintaa.'],
  ['/it/worksheets/i-contrari-con-i-prefissi-in-s-dis', 'landing:it', 'I contrari con i prefissi in-, s-, dis- – classe seconda PDF', 'Contrari con i prefissi per la classe seconda: otto parole come fortunato e utile, il bambino sceglie in-, s- o dis- e scrive il contrario. PDF gratis.'],
  ['/sv/worksheets/brak-lika-delar-ak-2', 'landing:sv', 'Bråk åk 2 – arbetsblad om lika delar och halvor (PDF)', 'Gratis arbetsblad i bråk för åk 2: dela figurer i halvor, tredjedelar och fjärdedelar, färglägg en del och känn igen lika delar. Skriv ut som PDF.'],
  ['/it/worksheets/l-intruso-stesso-tema-aula-9c8f', 'landing:it', 'Trova l’intruso – oggetti dell’aula, infanzia (PDF gratis)', 'Trova l’intruso per la scuola dell’infanzia: in ogni fila quattro oggetti dell’aula, uno non c’entra. Gioca online o stampa il PDF gratis, con le soluzioni.'],
  ['/nl/worksheets/verhaal-op-volgorde-leggen-kleuters', 'landing:nl', 'Verhaal op volgorde leggen – werkblad kleuters (gratis PDF)', 'Gratis werkblad voor kleuters: twee korte verhalen van vier plaatjes. Het kind zet elk verhaal op volgorde door 1 tot en met 4 in de hokjes te schrijven.'],
  ['/fr/topic/sciences/ce1-cours-elementaire-1', 'subjecthub:fr:science:grade-1', 'Fiches de sciences CE1 en PDF – à imprimer gratuitement', 'Fiches de sciences CE1 en PDF avec corrigés : vivant ou non-vivant, flotte ou coule, cycles de vie et habitats. À imprimer gratuitement ou à faire en ligne.'],
  ['/en/worksheets/beginning-middle-and-end-of-a-story', 'landing:en', 'Beginning, Middle and End of a Story Worksheet – 1st Grade', 'Beginning, middle and end worksheet for 1st grade: two picture stories show the start and the finish, and children draw what happens in the middle. Free PDF.'],
  ['/pt/topic/primavera', 'seasonal:pt:spring', 'Atividades de primavera para educação infantil – PDF grátis', 'Atividades de primavera para a educação infantil: contar e associar com figuras da estação. Para imprimir em PDF grátis ou fazer online.'],
  ['/da/worksheets/stamtrae-skabelon-til-boern', 'landing:da', 'Stamtræ-skabelon til børn – gratis til print (PDF)', 'Gratis stamtræ-skabelon til børn i 1. klasse: et tomt træ med rammer, hvor barnet tegner de mennesker, der betyder noget, og skriver navnene. PDF til print.'],
  ['/it/worksheets/piramidi-di-numeri-oltre-il-20', 'landing:it', 'Piramidi di numeri oltre il 20 – scheda classe seconda PDF', 'Piramidi di numeri oltre il 20 per la classe seconda: quattro piramidi con la base fra 5 e 12; si somma piano per piano e la cima sale verso il 100. PDF gratis.'],
];

const pages = JSON.parse(fs.readFileSync(path.join(DIR, 'pages.json'), 'utf8'));
const before = new Map(pages.pairs.map((p) => [p.change.url.replace('https://www.lessoncraftstudio.com', ''), p.change.before]));
const out = [];
let bad = 0;
for (const [p, source, title, description] of T) {
  const problems = [];
  if (!before.has(p)) problems.push('not a CHANGE page');
  const tl = [...title].length, dl = [...description].length;
  if (tl > 60) problems.push(`title ${tl} > 60`);
  if (dl < 120 || dl > 160) problems.push(`description ${dl} outside 120-160`);
  if (problems.length) bad++;
  console.log(`${String(tl).padStart(3)} ${String(dl).padStart(3)} ${problems.join('; ')} ${p}`);
  out.push({ path: p, source, before: before.get(p) || null, after: { title, description } });
}
if (out.length !== pages.pairs.length) { console.log(`expected ${pages.pairs.length} pages, have ${out.length}`); bad++; }
if (bad) { console.log(`${bad} problem(s); treatment.json not written`); process.exit(1); }
fs.writeFileSync(path.join(DIR, 'treatment.json'), JSON.stringify(out, null, 1) + '\n');
console.log(`treatment.json: ${out.length} pages`);
