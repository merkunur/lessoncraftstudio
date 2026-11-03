/**
 * data/maps/maps-new.js — the Maps & Coordinates maker's new templates (2026-11-03, NEW-TEMPLATES §54). The move
 * sentences are the old treasure-hunt app's (REFERENCE APPS/treasure-hunt.html v32.2.0 moveFrame: per-locale word order,
 * the direction phrase carries its preposition — never "Gehe nach Westen 1 Feld"), with the start taken as a picture:
 *   start    "Start at {pic}."
 *   move     {steps} {unit} {dir}; unit = one / many (de 1 Feld / 2 Felder, fi 1 ruutu / 2 ruutua — after a number)
 *   dirs     up down left right + north east south west (the app's phrases)
 *   steps    G1-529's column heads: which way, how many squares
 * The compass letters and the direction names are data/b5 maps (bank('maps', L): dirLetters, dirWords).
 */
'use strict';
const NN = ' ';

const MAPS_NEW = {
  en: { start: 'Start at {pic}.', move: 'Move {steps} {unit} {dir}.', unit: ['square', 'squares'],
    dirs: { up: 'up', down: 'down', left: 'left', right: 'right', north: 'north', east: 'east', south: 'south', west: 'west' },
    steps: { way: 'Which way?', count: 'How many squares?' } },
  de: { start: 'Beginne bei {pic}.', move: 'Gehe {steps} {unit} {dir}.', unit: ['Feld', 'Felder'],
    dirs: { up: 'nach oben', down: 'nach unten', left: 'nach links', right: 'nach rechts', north: 'nach Norden', east: 'nach Osten', south: 'nach Süden', west: 'nach Westen' },
    steps: { way: 'Welche Richtung?', count: 'Wie viele Felder?' } },
  fr: { start: 'Commence à {pic}.', move: 'Avance de {steps} {unit} {dir}.', unit: ['case', 'cases'],
    dirs: { up: 'vers le haut', down: 'vers le bas', left: 'vers la gauche', right: 'vers la droite', north: 'vers le nord', east: "vers l'est", south: 'vers le sud', west: "vers l'ouest" },
    steps: { way: 'Quelle direction' + NN + '?', count: 'Combien de cases' + NN + '?' } },
  es: { start: 'Empieza en {pic}.', move: 'Avanza {steps} {unit} {dir}.', unit: ['cuadro', 'cuadros'],
    dirs: { up: 'hacia arriba', down: 'hacia abajo', left: 'a la izquierda', right: 'a la derecha', north: 'al norte', east: 'al este', south: 'al sur', west: 'al oeste' },
    steps: { way: '¿Hacia dónde?', count: '¿Cuántos cuadros?' } },
  pt: { start: 'Comece em {pic}.', move: 'Avance {steps} {unit} {dir}.', unit: ['casa', 'casas'],
    dirs: { up: 'para cima', down: 'para baixo', left: 'para a esquerda', right: 'para a direita', north: 'para o norte', east: 'para o leste', south: 'para o sul', west: 'para o oeste' },
    steps: { way: 'Para onde?', count: 'Quantas casas?' } },
  it: { start: 'Inizia da {pic}.', move: 'Avanza di {steps} {unit} {dir}.', unit: ['casella', 'caselle'],
    dirs: { up: "verso l'alto", down: 'verso il basso', left: 'a sinistra', right: 'a destra', north: 'a nord', east: 'a est', south: 'a sud', west: 'a ovest' },
    steps: { way: 'In che direzione?', count: 'Quante caselle?' } },
  nl: { start: 'Begin bij {pic}.', move: 'Ga {steps} {unit} {dir}.', unit: ['vak', 'vakken'],
    dirs: { up: 'omhoog', down: 'omlaag', left: 'naar links', right: 'naar rechts', north: 'naar het noorden', east: 'naar het oosten', south: 'naar het zuiden', west: 'naar het westen' },
    steps: { way: 'Welke kant op?', count: 'Hoeveel vakken?' } },
  sv: { start: 'Börja vid {pic}.', move: 'Gå {steps} {unit} {dir}.', unit: ['ruta', 'rutor'],
    dirs: { up: 'uppåt', down: 'nedåt', left: 'åt vänster', right: 'åt höger', north: 'norrut', east: 'österut', south: 'söderut', west: 'västerut' },
    steps: { way: 'Vilket håll?', count: 'Hur många rutor?' } },
  da: { start: 'Start ved {pic}.', move: 'Gå {steps} {unit} {dir}.', unit: ['felt', 'felter'],
    dirs: { up: 'op', down: 'ned', left: 'til venstre', right: 'til højre', north: 'nordpå', east: 'østpå', south: 'sydpå', west: 'vestpå' },
    steps: { way: 'Hvilken vej?', count: 'Hvor mange felter?' } },
  no: { start: 'Start ved {pic}.', move: 'Gå {steps} {unit} {dir}.', unit: ['rute', 'ruter'],
    dirs: { up: 'opp', down: 'ned', left: 'til venstre', right: 'til høyre', north: 'nordover', east: 'østover', south: 'sørover', west: 'vestover' },
    steps: { way: 'Hvilken vei?', count: 'Hvor mange ruter?' } },
  fi: { start: 'Aloita kohdasta {pic}.', move: 'Siirry {steps} {unit} {dir}.', unit: ['ruutu', 'ruutua'],
    dirs: { up: 'ylös', down: 'alas', left: 'vasemmalle', right: 'oikealle', north: 'pohjoiseen', east: 'itään', south: 'etelään', west: 'länteen' },
    steps: { way: 'Mihin suuntaan?', count: 'Montako ruutua?' } },
};
// a move's change of cell: up / north is a row up
const DELTA = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1], north: [-1, 0], south: [1, 0], west: [0, -1], east: [0, 1] };

module.exports = { MAPS_NEW, DELTA };
