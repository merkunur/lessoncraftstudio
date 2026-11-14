#!/usr/bin/env node
/**
 * Writes the page text of G2-518 Length Story Problems (Year pages AB, 2026-11-14) into i18n/strings.<loc>.json (title
 * and the instruction of levels 2 and 3) and i18n/level-instructions.json (level 1: the first story is worked). The
 * instructions are those of the bar-model story pages (G2-509, read by native reviewers) with "numbers" made "lengths",
 * and one sentence more: the longest length goes in the top bar (native and teaching review 2026-11-14: a child who
 * copied the worked join story put the start of a take-away story in a part, under a question mark).
 * Re-running it writes the same text again; a changed text replaces the old one.
 *
 *   node tools/level-set/apply-length-stories-strings.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', '..', 'i18n');
const ID = 'G2-518';
// [title, instruction, the sentence level 1 adds]
const T = {
  en: ['Length Story Problems', 'Read each story. In the bar model, write the two lengths you know and a question mark for the length you need to find. The longest length goes in the top bar. Write an equation. Then write the answer.', 'The first story is done for you.'],
  de: ['Sachaufgaben mit Längen', 'Lies jede Sachaufgabe. Trage in das Streifenmodell die zwei Längen ein, die du kennst, und ein Fragezeichen für die gesuchte Länge. In den oberen Streifen kommt die größte Länge. Schreibe eine Rechnung. Schreibe dann die Antwort in das Kästchen.', 'Die erste Aufgabe ist schon gelöst.'],
  es: ['Problemas de longitud con modelo de barras', 'Lee cada problema. En el modelo de barras, escribe las dos longitudes que conoces y un signo de interrogación para la longitud que buscas. La longitud mayor va en la barra de arriba. Escribe una operación. Después escribe la respuesta.', 'El primer problema ya está resuelto.'],
  pt: ['Probleminhas de comprimento com modelo de barras', 'Leia cada probleminha. No modelo de barras, escreva os dois comprimentos que você conhece e um ponto de interrogação para o comprimento que você procura. O maior comprimento vai na barra de cima. Escreva uma conta. Depois escreva a resposta.', 'O primeiro probleminha já está resolvido.'],
  fr: ['Problèmes de longueurs avec un schéma en barres', 'Lis chaque problème. Dans le schéma en barres, écris les deux longueurs que tu connais et un point d’interrogation pour la longueur que tu cherches. La plus grande longueur va dans la barre du haut. Écris un calcul. Puis écris la réponse.', 'Le premier problème est déjà résolu.'],
  it: ['Problemi con le lunghezze e il modello a barre', 'Leggi ogni problema. Nel modello a barre scrivi le due lunghezze che conosci e un punto interrogativo per la lunghezza che cerchi. La lunghezza maggiore va nella barra in alto. Scrivi un’operazione. Poi scrivi la risposta.', 'Il primo problema è già risolto.'],
  nl: ['Verhaalsommen met lengtes en het strookmodel', 'Lees elke verhaalsom. Schrijf in het strookmodel de twee lengtes die je weet en een vraagteken voor de lengte die je zoekt. De grootste lengte komt in de bovenste strook. Schrijf een som. Schrijf daarna het antwoord op.', 'De eerste verhaalsom is al gemaakt.'],
  sv: ['Räknehändelser med längder', 'Läs varje räknehändelse. Skriv i blockmodellen de två längder du vet och ett frågetecken för längden du söker. Den största längden skriver du i det översta blocket. Skriv en uträkning. Skriv sedan svaret.', 'Den första räknehändelsen är redan löst.'],
  da: ['Regnehistorier med længder', 'Læs hver regnehistorie. Skriv i blokmodellen de to længder, du kender, og et spørgsmålstegn for den længde, du skal finde. Den største længde skal stå i den øverste blok. Skriv et regnestykke. Skriv så svaret.', 'Den første regnehistorie er allerede løst.'],
  no: ['Regnefortellinger med lengder', 'Les hver regnefortelling. Skriv i blokkmodellen de to lengdene du vet, og et spørsmålstegn for lengden du skal finne. Den største lengden skal stå i den øverste blokken. Skriv et regnestykke. Skriv så svaret.', 'Den første regnefortellingen er allerede løst.'],
  fi: ['Sanallisia tehtäviä pituuksista', 'Lue jokainen tehtävä. Kirjoita palkkimalliin kaksi pituutta, jotka tiedät, ja kysymysmerkki etsittävän pituuden kohdalle. Suurin pituus kirjoitetaan ylempään palkkiin. Kirjoita lasku. Kirjoita sitten vastaus.', 'Ensimmäinen tehtävä on jo ratkaistu.'],
};
/** writes JSON keeping the file's indent and line ends */
function save(file, raw, obj) {
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, '  '])[1];
  let out = JSON.stringify(obj, null, indent);
  if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
}
for (const [loc, [title, instruction]] of Object.entries(T)) {
  const f = path.join(I18N, 'strings.' + loc + '.json'), raw = fs.readFileSync(f, 'utf8'), j = JSON.parse(raw);
  j[ID] = { title, instruction };
  save(f, raw, j);
}
{
  const f = path.join(I18N, 'level-instructions.json'), raw = fs.readFileSync(f, 'utf8'), j = JSON.parse(raw);
  j[ID] = { 1: Object.fromEntries(Object.entries(T).map(([loc, t]) => [loc, t[1] + ' ' + t[2]])) };
  save(f, raw, j);
}
console.log(ID + ': title and instructions written in ' + Object.keys(T).length + ' languages');
