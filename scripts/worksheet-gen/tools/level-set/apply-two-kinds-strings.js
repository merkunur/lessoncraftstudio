#!/usr/bin/env node
/**
 * Writes the page text of K-643 How Many in All? (put-together stories in two colors; Year pages Z, 2026-11-14) into i18n/strings.<loc>.json (title and
 * the instruction of levels 1 and 2) and i18n/level-instructions.json (level 3: the child draws a circle for each thing). Titles and instructions from the native and teaching review of
 * 2026-11-14 (the first build said "two kinds"; fr and fi keep "two colors" in the title: their plain question is K-028's title). Re-running it
 * writes the same text again; a changed text replaces the old one.
 *
 *   node tools/level-set/apply-two-kinds-strings.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', '..', 'i18n');
const ID = 'K-643';
const T = {
  en: ['How Many in All?', 'Listen to each story. Color the pictures to match the story and leave the rest white. Write the numbers.', 'Listen to each story. In the box, draw a circle for each one in its color. Write the numbers.'],
  de: ['Wie viele sind es zusammen?', 'Hör dir jede Rechengeschichte an. Male die Bilder passend zur Geschichte an und lass den Rest weiß. Schreib die Zahlen.', 'Hör dir jede Rechengeschichte an. Male im Rahmen für jedes Ding einen Kreis in der richtigen Farbe. Schreib die Zahlen.'],
  es: ['¿Cuántos hay en total?', 'Escucha cada historia. Colorea los dibujos como dice la historia y deja los demás en blanco. Escribe los números.', 'Escucha cada historia. En el recuadro, dibuja un círculo por cada cosa, de su color. Escribe los números.'],
  pt: ['Quantos são ao todo?', 'Ouça cada história. Pinte os desenhos como a história diz e deixe o resto em branco. Escreva os números.', 'Ouça cada história. No espaço, desenhe uma bolinha para cada coisa, com a cor dela. Escreva os números.'],
  fr: ['Deux couleurs : combien en tout ?', 'Écoute chaque histoire. Colorie les dessins comme dans l’histoire et laisse les autres en blanc. Écris les nombres.', 'Écoute chaque histoire. Dans le cadre, dessine un rond pour chaque objet, de sa couleur. Écris les nombres.'],
  it: ['Quanti sono in tutto?', 'Ascolta ogni storia. Colora i disegni come dice la storia e lascia bianchi gli altri. Scrivi i numeri.', 'Ascolta ogni storia. Nel riquadro disegna un cerchio per ogni cosa, del suo colore. Scrivi i numeri.'],
  nl: ['Hoeveel zijn het samen?', 'Luister naar elk rekenverhaal. Kleur de plaatjes zoals het verhaal zegt en laat de rest wit. Schrijf de getallen.', 'Luister naar elk rekenverhaal. Teken in het vak een rondje voor elk ding, in de goede kleur. Schrijf de getallen.'],
  sv: ['Hur många är det tillsammans?', 'Lyssna på varje räknesaga. Färglägg bilderna som sagan säger och lämna resten vita. Skriv talen.', 'Lyssna på varje räknesaga. Rita en ring i rutan för varje sak, i rätt färg. Skriv talen.'],
  da: ['Hvor mange er der i alt?', 'Lyt til hver regnehistorie. Farvelæg billederne, som historien siger, og lad resten være hvide. Skriv tallene.', 'Lyt til hver regnehistorie. Tegn en cirkel i feltet for hver ting, i den rigtige farve. Skriv tallene.'],
  no: ['Hvor mange er det til sammen?', 'Lytt til hver regnefortelling. Fargelegg bildene slik fortellingen sier, og la resten være hvite. Skriv tallene.', 'Lytt til hver regnefortelling. Tegn en ring i ruta for hver ting, i riktig farge. Skriv tallene.'],
  fi: ['Kaksi väriä: montako yhteensä?', 'Kuuntele jokainen laskutarina. Väritä kuvat tarinan mukaan ja jätä loput valkoisiksi. Kirjoita luvut.', 'Kuuntele jokainen laskutarina. Piirrä ruutuun jokaisesta yksi ympyrä oikealla värillä. Kirjoita luvut.'],
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
  j[ID] = { 3: Object.fromEntries(Object.entries(T).map(([loc, t]) => [loc, t[2]])) };
  save(f, raw, j);
}
console.log(ID + ': title and instructions written in ' + Object.keys(T).length + ' languages');
