#!/usr/bin/env node
/**
 * apply-wp-review.js — Word Problems Level Set (walk #65, 2026-10-14): the native + pedagogy review's fixes.
 *
 *  LIVE frames (published pages): replaced by EXACT literal in the generated banks (data/word-problems/frames.js,
 *  data/b2/wp-muldiv-frames.js) AND in every i18n/.draft-* file that carries the same string (the banks are
 *  regenerated from the drafts — a fix in the bank alone would be undone). The array position never changes, so the
 *  published draw picks the same frame and only its words change. Each literal must be found at least once in the bank;
 *  a fix that finds nothing throws.
 *  NEW frames (Level Set pages): data/word-problems/word-problems-levelset.json, by kind + index.
 *  Idempotent: a second run reports every fix as already applied.
 *    node tools/level-set/apply-wp-review.js [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const DRY = process.argv.includes('--dry-run');

// [locale, bank, old frame, new frame] — the review's LIVE findings (MUST + the clear SHOULDs)
const LIVE = [
  ['it', 'g1', '{name} ha {n1} {noun}. Ne regala {n2} a un amico. Qual è il totale adesso?', '{name} ha {n1} {noun}. Ne regala {n2} a un amico. {Q} {noun} ha ancora {name}?'],
  ['it', 'g1', '{name} ha {n1} {noun}. Ne perde {n2} al parco. Qual è il totale alla fine?', '{name} ha {n1} {noun}. Ne perde {n2} al parco. {Q} {noun} ha ancora {name}?'],
  ['it', 'g1', '{name} conta {n1} {noun}. Ne dà via {n2}. Qual è il totale che resta?', '{name} conta {n1} {noun}. Ne dà via {n2}. {Q} {noun} restano?'],
  ['pt', 'g1', '{name} tem {n1} {noun} e dá {n2} {noun} para um amigo. Qual é o total de {noun} que sobra?', '{name} tem {n1} {noun} e dá {n2} {noun} para um amigo. {Q} {noun} sobram para {name}?'],
  ['pt', 'g1', '{name} tem {n1} {noun} e perde {n2} {noun}. Qual é o total de {noun} agora?', '{name} tem {n1} {noun} e perde {n2} {noun}. {Q} {noun} {name} tem agora?'],
  ['pt', 'g1', '{name} conta {n1} {noun} e tira {n2} {noun}. Qual é o total de {noun} que resta?', '{name} conta {n1} {noun} e tira {n2} {noun}. {Q} {noun} restam?'],
  ['en', 'g1', '{name} has {n1} {noun}. Then {name} finds {n2} more. How many {noun} are there now?', '{name} has {n1} {noun}. Then {name} finds {n2} more. How many {noun} does {name} have now?'],
  ['en', 'g1', 'There are {n1} {noun} on the table. {n2} fall down. How many {noun} are left?', 'There are {n1} {noun} on the table. {n2} fall down. How many {noun} are still on the table?'],
  ['fr', 'g1', '{name} a {n1} {noun}. Un ami donne {n2} {noun} à {name}. Combien y en a-t-il en tout ?', '{name} a {n1} {noun}. Un ami donne {n2} {noun} à {name}. Combien de {noun} {name} a-t-{il} maintenant ?'],
  ['pt', 'g3', '{name} reparte {n1} {noun} igualmente entre {n2} amigos. Qual é o total de {noun} de cada amigo?', '{name} reparte {n1} {noun} igualmente entre {n2} amigos. {Q} {noun} cada amigo recebe?'],
  ['pt', 'g3', '{name} coloca {n1} {noun} em {n2} sacolas, com a mesma quantidade em cada uma. Qual é o total de {noun} em cada sacola?', '{name} coloca {n1} {noun} em {n2} sacolas, com a mesma quantidade em cada uma. {Q} {noun} ficam em cada sacola?'],
  ['pt', 'g3', '{name} divide {n1} {noun} igualmente em {n2} caixas. Qual é o total de {noun} em cada caixa?', '{name} divide {n1} {noun} igualmente em {n2} caixas. {Q} {noun} ficam em cada caixa?'],
  ['de', 'g3', 'Es gibt {n1} {noun}. {name} bildet Gruppen mit je {n2} {noun}. Wie viele Gruppen sind das?', 'Es gibt {n1} {noun}. {name} bildet Gruppen. In jede Gruppe kommen {n2} {noun}. Wie viele Gruppen sind das?'],
  ['de', 'g3', '{name} packt {n1} {noun} in Kisten mit je {n2} {noun}. Wie viele Kisten braucht {name}?', '{name} packt {n1} {noun} in Kisten. In jede Kiste kommen {n2} {noun}. Wie viele Kisten braucht {name}?'],
  ['de', 'g3', '{name} füllt {n1} Tüten mit je {n2} {noun}. Wie viele {noun} sind das zusammen?', '{name} füllt {n1} Tüten. In jede Tüte kommen {n2} {noun}. Wie viele {noun} sind das zusammen?'],
  ['de', 'g3', '{name} sieht {n1} Reihen mit je {n2} {noun}. Wie viele {noun} sind das zusammen?', '{name} sieht {n1} Reihen. In jeder Reihe sind {n2} {noun}. Wie viele {noun} sind das zusammen?'],
  ['it', 'g3', '{name} divide {n1} {noun} in parti uguali fra {n2} amici. Qual è il numero di {noun} di ogni amico?', '{name} divide {n1} {noun} in parti uguali fra {n2} amici. {Q} {noun} riceve ogni amico?'],
  ['nl', 'g3', '{name} doet {n1} {noun} eerlijk in {n2} dozen. Hoeveel {noun} komen er in elke doos?', '{name} doet {n1} {noun} in {n2} dozen, in elke doos evenveel. Hoeveel {noun} komen er in elke doos?'],
  ['fi', 'g3', 'Pöydällä on {n1} riviä. Jokaisessa rivissä on {n2} {noun}. Kuinka monta {noun} {name} laskee yhteensä?', '{name} näkee pöydällä {n1} riviä. Jokaisessa rivissä on {n2} {noun}. Kuinka monta {noun} {name} laskee yhteensä?'],
];

// NEW frames: [locale, kind, index in the Level Set list, new frame]
const NEW = [
  ['en', 'addChange', 2, '{name} finds {n1} {noun}. Then {name} finds some more. Now {name} has {n3} {noun}. How many {noun} did {name} find the second time?'],
  ['en', 'addChange', 3, '{name} has {n1} {noun}. {name2} gives {name} some more. Now {name} has {n3} {noun}. How many {noun} did {name2} give {name}?'],
  ['en', 'share', 2, '{name} puts {n1} {noun} into {n2} baskets, the same number in each basket. How many {noun} go in each basket?'],
  ['en', 'group', 0, '{name} has {n1} {noun}. {name} gives all of them away, {n2} to each child. How many children get {noun}?'],
  ['en', 'group', 2, '{name} puts {n1} {noun} into baskets, {n2} {noun} in each basket. How many baskets does {name} fill?'],
  ['de', 'sub', 5, '{name} und {name2} haben zusammen {n1} {noun}. {name2} nimmt {n2} {noun} mit nach Hause. Wie viele {noun} bleiben für {name} übrig?'],
  ['de', 'addChange', 3, '{name} hat {n1} {noun}. {name2} schenkt {name} noch welche. Jetzt hat {name} {n3} {noun}. Wie viele {noun} hat {name2} {name} geschenkt?'],
  ['de', 'group', 0, '{name} hat {n1} {noun}. {name} verteilt alle, jedes Kind bekommt {n2} {noun}. Wie viele Kinder bekommen {noun}?'],
  ['de', 'group', 2, '{name} legt {n1} {noun} in Körbe. In jeden Korb passen {n2} {noun}. Wie viele Körbe füllt {name}?'],
  ['es', 'group', 0, '{name} reparte sus {n1} {noun}, {n2} a cada niño. ¿A cuántos niños les da {noun}?'],
  ['es', 'group', 2, '{name} pone {n1} {noun} en canastas. En cada canasta caben {n2} {noun}. ¿Cuántas canastas llena {name}?'],
  ['fr', 'group', 0, '{name} distribue ses {n1} {noun} : chaque enfant en reçoit {n2}. Combien d\'enfants reçoivent des {noun} ?'],
  ['fr', 'group', 2, '{name} range {n1} {noun} dans des paniers. Un panier contient {n2} {noun}. Combien de paniers {name} remplit-{il} ?'],
  ['it', 'compare', 0, '{name} ha {n1} {noun}. {name2} ha {n2} {noun}. {Q} {noun} ha {name} in più di {name2}?'],
  ['it', 'compare', 1, '{name} ha {n1} {noun}. {name2} ha {n2} {noun}. {Q} {noun} ha {name2} in meno di {name}?'],
  ['it', 'compare', 3, '{name} trova {n1} {noun}. {name2} ne trova {n2}. {Q} {noun} trova {name} in più di {name2}?'],
  ['it', 'add', 2, 'Sul tavolo ci sono {n1} {noun}. {name} ne porta ancora {n2}. {Q} {noun} ci sono adesso sul tavolo?'],
  ['it', 'group', 0, '{name} ha {n1} {noun}. Ne dà {n2} a ogni bambino finché non ne restano più. Quanti bambini ricevono {noun}?'],
  ['it', 'group', 2, '{name} mette {n1} {noun} nei cesti. In un cesto stanno {n2} {noun}. Quanti cesti riempie {name}?'],
  ['pt', 'group', 0, '{name} tem {n1} {noun} e distribui todas as unidades: cada criança ganha {n2}. Quantas crianças ganham {noun}?'],
  ['pt', 'group', 2, '{name} guarda {n1} {noun} em cestas. Em cada cesta cabem {n2} {noun}. Quantas cestas {name} enche?'],
  ['nl', 'addChange', 0, '{name} heeft {n1} {noun}. {name} krijgt er nog wat bij. Nu heeft {name} {n3} {noun}. Hoeveel {noun} heeft {name} erbij gekregen?'],
  ['nl', 'addChange', 1, 'In een doos zitten {n1} {noun}. {name} doet er nog wat bij. Nu zitten er {n3} {noun} in de doos. Hoeveel {noun} heeft {name} erbij gedaan?'],
  ['nl', 'addChange', 2, '{name} vindt {n1} {noun}. Daarna vindt {name} er nog wat. Nu heeft {name} {n3} {noun}. Hoeveel {noun} heeft {name} later gevonden?'],
  ['nl', 'addChange', 3, '{name} heeft {n1} {noun}. {name2} geeft {name} er nog wat. Nu heeft {name} {n3} {noun}. Hoeveel {noun} heeft {name2} gegeven?'],
  ['nl', 'addChange', 4, 'Er liggen {n1} {noun} op tafel. {name} brengt er nog wat. Nu liggen er {n3} {noun} op tafel. Hoeveel {noun} heeft {name} gebracht?'],
  ['nl', 'subChange', 0, '{name} heeft {n1} {noun}. {name} geeft er wat weg. Nu heeft {name} nog {n3} {noun}. Hoeveel {noun} heeft {name} weggegeven?'],
  ['nl', 'subChange', 1, 'In een doos zitten {n1} {noun}. {name} haalt er wat uit. Nu zitten er nog {n3} {noun} in de doos. Hoeveel {noun} heeft {name} eruit gehaald?'],
  ['nl', 'subChange', 2, '{name} heeft {n1} {noun}. {name} raakt er wat kwijt. Nu heeft {name} nog {n3} {noun}. Hoeveel {noun} is {name} kwijtgeraakt?'],
  ['nl', 'subChange', 3, 'Op een plank liggen {n1} {noun}. Er vallen er wat af. Nu liggen er nog {n3} {noun} op de plank. Hoeveel {noun} zijn er afgevallen?'],
  ['nl', 'subChange', 4, '{name} heeft {n1} {noun}. {name} geeft er wat aan {name2}. Nu heeft {name} nog {n3} {noun}. Hoeveel {noun} heeft {name2} gekregen?'],
  ['nl', 'group', 0, '{name} heeft {n1} {noun} en deelt ze allemaal uit: elk kind krijgt er {n2}. Hoeveel kinderen krijgen {noun}?'],
  ['nl', 'group', 2, '{name} doet {n1} {noun} in manden. In een mand passen {n2} {noun}. Hoeveel manden vult {name}?'],
  ['sv', 'sub', 5, '{name} och {name2} har {n1} {noun}. {name2} tar med sig {n2} {noun} hem. Hur många {noun} blir kvar åt {name}?'],
  ['sv', 'group', 0, '{name} delar ut alla sina {n1} {noun}, {n2} till varje barn. Hur många barn får {noun}?'],
  ['sv', 'group', 2, '{name} lägger {n1} {noun} i korgar. I en korg får det plats {n2} {noun}. Hur många korgar fyller {name}?'],
  ['da', 'group', 0, '{name} deler alle sine {n1} {noun} ud, {n2} til hvert barn. Hvor mange børn får {noun}?'],
  ['da', 'group', 2, '{name} lægger {n1} {noun} i kurve. Der kan være {n2} {noun} i en kurv. Hvor mange kurve fylder {name}?'],
  ['no', 'group', 0, '{name} deler ut alle de {n1} {noun}, {n2} til hvert barn. Hvor mange barn får {noun}?'],
  ['no', 'group', 2, '{name} legger {n1} {noun} i kurver. Det er plass til {n2} {noun} i en kurv. Hvor mange kurver fyller {name}?'],
  ['fi', 'group', 0, '{name} jakaa kaikki {n1} {noun}. Jokainen lapsi saa {n2} {noun}. Kuinka monta lasta saa {n2} {noun}?'],
  ['fi', 'group', 2, '{name} laittaa {n1} {noun} koreihin. Yhteen koriin mahtuu {n2} {noun}. Kuinka monta koria {name} täyttää?'],
  ['fi', 'subChange', 0, 'Laatikossa on {n1} {noun}. {name} ottaa laatikosta osan. Nyt laatikossa on {n3} {noun}. Kuinka monta {noun} {name} otti?'],
  ['fi', 'subChange', 1, 'Hyllyllä on {n1} {noun}. Osa putoaa lattialle. Nyt hyllyllä on {n3} {noun}. Kuinka monta {noun} putosi?'],
  ['fi', 'subChange', 2, 'Korissa on {n1} {noun}. {name} vie osan kotiin. Nyt korissa on {n3} {noun}. Kuinka monta {noun} {name} vei kotiin?'],
  ['fi', 'subChange', 3, '{name} kerää {n1} {noun}. Matkalla {name} hukkaa osan. Nyt {name} kantaa {n3} {noun}. Kuinka monta {noun} {name} hukkasi?'],
  ['fi', 'subChange', 4, 'Pöydällä on {n1} {noun}. {name} antaa osan kaverille. Nyt pöydällä on {n3} {noun}. Kuinka monta {noun} {name} antoi?'],
];

const esc = (s) => JSON.stringify(s).slice(1, -1);
const BANK = { g1: 'data/word-problems/frames.js', g3: 'data/b2/wp-muldiv-frames.js' };
const drafts = fs.readdirSync(path.join(ROOT, 'i18n')).filter((f) => /^\.draft-.*\.json$/.test(f)).map((f) => 'i18n/' + f);
const files = {};
const read = (rel) => (files[rel] = files[rel] != null ? files[rel] : fs.readFileSync(path.join(ROOT, rel), 'utf8'));
let changed = 0, already = 0;
for (const [loc, bank, oldF, newF] of LIVE) {
  for (const rel of [BANK[bank], ...drafts.filter((d) => d.endsWith('-' + loc + '.json'))]) {
    const s = read(rel);
    const o = esc(oldF), n = esc(newF);
    const k = s.split(o).length - 1;
    if (rel === BANK[bank] && !k && !s.includes(n)) throw new Error(`LIVE ${loc}: not found in ${rel}: ${oldF}`);
    if (k) { files[rel] = s.split(o).join(n); changed += k; console.log(`  ${loc} ${rel}: ${k}×`); }
    else if (rel === BANK[bank]) already++;
  }
}
const lsRel = 'data/word-problems/word-problems-levelset.json';
const LS = JSON.parse(read(lsRel));
for (const [loc, kind, i, f] of NEW) {
  const list = LS[loc][kind];
  if (!list || i >= list.length) throw new Error(`NEW ${loc} ${kind} #${i}: no such frame`);
  if (list[i] === f) { already++; continue; }
  list[i] = f; changed++;
}
files[lsRel] = JSON.stringify(LS, null, 2) + '\n';
if (!DRY) for (const [rel, s] of Object.entries(files)) fs.writeFileSync(path.join(ROOT, rel), s);
console.log(`apply-wp-review: ${changed} replacements, ${already} already applied${DRY ? ' (dry run)' : ''}`);
