#!/usr/bin/env node
/**
 * apply-ord-strings.js — Level Set 2026-10-14 (walk #62, Ordinal Numbers): the screen sentences ×11
 * (i18n/interactive-instructions.json `ordinal-numbers.{tap,word,write}`) and the race page's level-1 printed
 * instruction ×11 (i18n/level-instructions.json `G1-318.1`: four runners, so "write 1st … 4th", never "… 6th").
 * Each locale's sentence uses that locale's own name for the printed piece (chip / Plättchen / ficha / nappula …) and
 * its own notation. Idempotent; re-run after a review fix.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const IA = path.join(__dirname, '..', '..', 'i18n', 'interactive-instructions.json');
const LV = path.join(__dirname, '..', '..', 'i18n', 'level-instructions.json');

const SCREEN = {
  tap: {
    en: 'Start at the flag. Count to the place on the chip and tap that picture.',
    de: 'Beginne bei der Fahne. Zähle bis zum Platz auf dem Plättchen und tippe auf dieses Bild.',
    es: 'Empieza en la bandera. Cuenta hasta el lugar de la ficha y toca ese dibujo.',
    fr: "Pars du drapeau. Compte jusqu'au rang de l'étiquette et touche cette image.",
    it: 'Parti dalla bandierina. Conta fino al posto del gettone e tocca quella figura.',
    pt: 'Comece na bandeira. Conte até o lugar indicado no cartão e toque nessa figura.',
    nl: 'Begin bij de vlag. Tel tot de plaats op het fiche en tik op dat plaatje.',
    sv: 'Börja vid flaggan. Räkna fram till platsen på brickan och tryck på den bilden.',
    da: 'Start ved flaget. Tæl hen til pladsen på brikken, og tryk på det billede.',
    no: 'Start ved flagget. Tell til plassen på brikken og trykk på det bildet.',
    fi: 'Aloita lipun kohdalta. Laske nappulan osoittamaan paikkaan asti ja napauta sitä kuvaa.',
  },
  word: {
    en: 'Read the word. Count from the flag to that place and tap the picture there.',
    de: 'Lies das Wort. Zähle von der Fahne bis zu diesem Platz und tippe auf das Bild dort.',
    es: 'Lee la palabra. Cuenta desde la bandera hasta ese lugar y toca el dibujo que está ahí.',
    fr: "Lis le mot. Compte depuis le drapeau jusqu'à ce rang et touche l'image qui s'y trouve.",
    it: 'Leggi la parola. Conta dalla bandierina fino a quel posto e tocca la figura che c\'è.',
    pt: 'Leia a palavra. Conte a partir da bandeira até esse lugar e toque na figura que está lá.',
    nl: 'Lees het woord. Tel vanaf de vlag tot die plaats en tik op het plaatje dat daar staat.',
    sv: 'Läs ordet. Räkna från flaggan fram till den platsen och tryck på bilden där.',
    da: 'Læs ordet. Tæl fra flaget hen til den plads, og tryk på billedet der.',
    no: 'Les ordet. Tell fra flagget til den plassen og trykk på bildet der.',
    fi: 'Lue sana. Laske lipusta siihen paikkaan asti ja napauta siinä olevaa kuvaa.',
  },
  write: {
    en: 'Tap an empty box and type the place, like 3rd.',
    de: 'Tippe auf ein leeres Kästchen und schreibe den Platz mit Punkt, zum Beispiel 3.',
    es: 'Toca un recuadro vacío y escribe el lugar, por ejemplo 3.º',
    fr: 'Touche une case vide et écris le rang, par exemple 3e.',
    it: 'Tocca una casella vuota e scrivi il posto, per esempio 3º.',
    pt: 'Toque em um quadradinho vazio e escreva o lugar, por exemplo 3º.',
    nl: 'Tik op een leeg vakje en typ de plaats, bijvoorbeeld 3e.',
    sv: 'Tryck på en tom ruta och skriv platsen, till exempel 3:e.',
    da: 'Tryk på en tom kasse, og skriv pladsen med punktum, for eksempel 3.',
    no: 'Trykk på en tom rute og skriv plassen med punktum, for eksempel 3.',
    fi: 'Napauta tyhjää ruutua ja kirjoita paikka pisteen kanssa, esimerkiksi 3.',
  },
};
// G1-318 level 1 (four runners): the published sentence with the list cut to four places
const RACE_L1 = {
  en: 'Look how close each runner is to the finish line. The nearest is 1st. Write 1st, 2nd, 3rd and 4th.',
  de: 'Schau, wie nah jeder Läufer am Ziel ist. Wer dem Ziel am nächsten ist, wird 1. Schreibe die Plätze 1. bis 4. auf.',
  es: 'Mira qué tan cerca de la meta está cada corredor. El más cercano es el 1.º. Escribe 1.º, 2.º, 3.º y 4.º.',
  fr: "Regarde qui est le plus près de l'arrivée : c'est le 1er. Écris 1er, 2e, 3e et 4e.",
  it: 'Guarda quanto è vicino al traguardo ogni corridore. Il più vicino è il 1º. Scrivi 1º, 2º, 3º e 4º.',
  pt: 'Veja quem está mais perto da linha de chegada. O mais perto é o 1º. Escreva 1º, 2º, 3º e 4º.',
  nl: 'Kijk hoe dicht elke renner bij de finish is. De dichtstbijzijnde is 1e. Schrijf 1e, 2e, 3e en 4e.',
  sv: 'Titta hur nära mållinjen varje löpare är. Den närmaste är 1:a. Skriv 1:a, 2:a, 3:e och 4:e.',
  da: 'Se, hvor tæt hver løber er på målstregen. Den nærmeste er nr. 1. Skriv 1., 2., 3. og 4.',
  no: 'Se hvor nær mål hver løper er. Den som er nærmest, blir 1. Skriv 1., 2., 3. og 4.',
  fi: 'Katso, kuinka lähellä maaliviivaa jokainen kilpailija on. Lähin on 1. Kirjoita 1., 2., 3. ja 4.',
};

const ia = JSON.parse(fs.readFileSync(IA, 'utf8'));
ia['ordinal-numbers'] = SCREEN;
const save = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 1).replace(/\n/g, '\r\n') + '\r\n', 'utf8');   // the files' own format: 1-space indent, CRLF
save(IA, ia);
const lv = JSON.parse(fs.readFileSync(LV, 'utf8'));
lv['G1-318'] = { ...(lv['G1-318'] || {}), 1: RACE_L1 };
save(LV, lv);
console.log('ordinal-numbers screen sentences ×' + Object.keys(SCREEN).length + ' + G1-318 level 1 ×11 written');
