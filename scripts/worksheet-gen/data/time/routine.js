/**
 * routine.js — a child's day for the Telling Time maker (NEW-TEMPLATES §15 T2 daily routine, T5 a.m. / p.m.; 2026-11-02).
 * Each activity: a library picture (opened on a contact sheet, never a clock — a clock on a clock page is a second
 * clock to read), a short label ×11 and the window of the day it happens in, per locale where a country's day differs
 * (es-MX "la comida" is the main meal after school, ~14:00-15:30; Nordic school lunch is ~11:00; es-MX bedtime is
 * later). part: 'am' (morning) or 'pm' (after noon); oneHalf: the NAME of the moment fixes the half of the day it
 * belongs to (breakfast, dinner, bedtime) — T5 (a.m. / p.m.) uses only those: people brush their teeth, take a bus or
 * walk the dog morning AND evening, so those cards had two right answers (2026-11-02). Lunch takes the half its time is in
 * (never a 12:xx time on T5).
 * Windows are [from, to] in minutes after midnight, inclusive; a page draws its times inside them at the level's step.
 * rank: the order of a day — a page's times rise with it (never bed before dinner, school before the bus; native review
 * 2026-11-02: the windows overlap, so the order is checked, not hoped for). Windows per country from the same review.
 * Native + pedagogy reviewed with the rest of the maker's text before any page prints a label.
 */
'use strict';

const H = (h, m = 0) => h * 60 + m;

const ROUTINE = [
  { id: 'brushTeeth', rank: 1, pic: { theme: 'around the house', noun: 'toothbrush' }, part: 'am', win: [H(6, 30), H(7, 30)], winBy: { pt: [H(6), H(7)] } },
  { id: 'breakfast', rank: 2, pic: { theme: 'breakfast', noun: 'cereal' }, part: 'am', oneHalf: true, win: [H(6, 30), H(8)], winBy: { pt: [H(6), H(7)] } },
  { id: 'school', rank: 4, pic: { theme: 'classroom', noun: 'backpack' }, part: 'am', oneHalf: true, win: [H(7, 30), H(8, 30)], winBy: { pt: [H(6, 30), H(7, 30)], fr: [H(8), H(8, 30)], nl: [H(8), H(8, 30)] } },
  { id: 'bus', rank: 3, pic: { theme: 'vehicles', noun: 'bus' }, part: 'am', win: [H(7), H(8)], winBy: { pt: [H(6, 30), H(7, 15)] } },
  { id: 'lunch', rank: 5, pic: { theme: 'classroom', noun: 'lunchbox' }, part: null, oneHalf: true, win: [H(11, 30), H(13)],
    // es-MX: a lunchbox is the recess snack ("el lonche", ~10:30); the main meal "la comida" is at home after school
    winBy: { es: [H(10), H(11)], pt: [H(11, 30), H(12, 30)], de: [H(12), H(13, 30)], it: [H(12, 30), H(13, 30)], sv: [H(11), H(12)], da: [H(11), H(12)], no: [H(11), H(12)], fi: [H(11), H(12)] } },
  { id: 'dinner', rank: 7, pic: { theme: 'At the Supermarket', noun: 'pizza' }, part: 'pm', oneHalf: true, win: [H(17, 30), H(18, 30)],
    winBy: { de: [H(18), H(19)], fr: [H(19), H(20)], es: [H(19, 30), H(21)], pt: [H(19), H(20)], it: [H(19, 30), H(20, 30)], sv: [H(17), H(18)], da: [H(17, 30), H(18, 30)], no: [H(16, 30), H(17, 30)], fi: [H(17), H(18)] } },
  { id: 'playBall', rank: 6, pic: { theme: 'toys', noun: 'ball' }, part: 'pm', win: [H(15), H(17, 30)] },
  { id: 'bike', rank: 6, pic: { theme: 'toys', noun: 'bicycle' }, part: 'pm', win: [H(15), H(18)] },
  { id: 'dog', rank: 6, pic: { theme: 'pets', noun: 'dog' }, part: 'pm', win: [H(16), H(18, 30)] },
  { id: 'book', rank: 10, pic: { theme: 'classroom', noun: 'book' }, part: 'pm', win: [H(19), H(20)], winBy: { es: [H(20), H(21)], pt: [H(20), H(21)], it: [H(20, 30), H(21, 15)], fr: [H(19, 30), H(20, 30)] } },
  { id: 'bath', rank: 8, pic: { theme: 'around the house', noun: 'bathtub' }, part: 'pm', win: [H(18), H(19, 30)], winBy: { es: [H(19, 30), H(20, 30)], it: [H(19), H(20)] } },
  { id: 'pajamas', rank: 9, pic: { theme: 'clothing', noun: 'pajamas' }, part: 'pm', oneHalf: true, win: [H(19), H(20)], winBy: { es: [H(20), H(21)], pt: [H(20), H(21)], it: [H(20, 15), H(21)] } },
  { id: 'bed', rank: 11, pic: { theme: 'around the house', noun: 'bed' }, part: 'pm', oneHalf: true, win: [H(19, 30), H(20, 30)], winBy: { es: [H(20, 30), H(21, 30)], pt: [H(20, 30), H(21, 30)], it: [H(20, 45), H(21, 30)], fr: [H(20), H(21)] } },
];

/** the label of each activity, the way a child's book names that moment of the day (es = Mexican Spanish, pt = Brazilian) */
const LABELS = {
  en: { brushTeeth: 'Brush teeth', breakfast: 'Breakfast', school: 'Go to school', bus: 'Take the bus', lunch: 'Lunch', dinner: 'Dinner', playBall: 'Play ball', bike: 'Ride a bike', dog: 'Walk the dog', book: 'Read a book', bath: 'Bath time', pajamas: 'Put on pajamas', bed: 'Go to bed' },
  de: { brushTeeth: 'Zähne putzen', breakfast: 'Frühstück', school: 'Zur Schule gehen', bus: 'Bus fahren', lunch: 'Mittagessen', dinner: 'Abendessen', playBall: 'Ball spielen', bike: 'Fahrrad fahren', dog: 'Mit dem Hund Gassi gehen', book: 'Ein Buch lesen', bath: 'Baden', pajamas: 'Schlafanzug anziehen', bed: 'Ins Bett gehen' },
  fr: { brushTeeth: 'Se brosser les dents', breakfast: 'Le petit déjeuner', school: 'Aller à l’école', bus: 'Prendre le bus', lunch: 'Le déjeuner', dinner: 'Le dîner', playBall: 'Jouer au ballon', bike: 'Faire du vélo', dog: 'Promener le chien', book: 'Lire un livre', bath: 'Prendre son bain', pajamas: 'Mettre son pyjama', bed: 'Aller se coucher' },
  es: { brushTeeth: 'Lavarse los dientes', breakfast: 'El desayuno', school: 'Ir a la escuela', bus: 'Tomar el camión', lunch: 'El lonche', dinner: 'La cena', playBall: 'Jugar con la pelota', bike: 'Andar en bici', dog: 'Pasear al perro', book: 'Leer un libro', bath: 'Bañarse', pajamas: 'Ponerse la pijama', bed: 'Ir a dormir' },
  pt: { brushTeeth: 'Escovar os dentes', breakfast: 'Café da manhã', school: 'Ir para a escola', bus: 'Pegar o ônibus', lunch: 'Almoço', dinner: 'Jantar', playBall: 'Jogar bola', bike: 'Andar de bicicleta', dog: 'Passear com o cachorro', book: 'Ler um livro', bath: 'Hora do banho', pajamas: 'Colocar o pijama', bed: 'Ir dormir' },
  it: { brushTeeth: 'Lavarsi i denti', breakfast: 'La colazione', school: 'Andare a scuola', bus: 'Prendere l’autobus', lunch: 'Il pranzo', dinner: 'La cena', playBall: 'Giocare a palla', bike: 'Andare in bici', dog: 'Portare fuori il cane', book: 'Leggere un libro', bath: 'Fare il bagno', pajamas: 'Mettersi il pigiama', bed: 'Andare a letto' },
  nl: { brushTeeth: 'Tanden poetsen', breakfast: 'Ontbijten', school: 'Naar school gaan', bus: 'Met de bus gaan', lunch: 'Lunchen', dinner: 'Avondeten', playBall: 'Met de bal spelen', bike: 'Fietsen', dog: 'De hond uitlaten', book: 'Een boek lezen', bath: 'In bad gaan', pajamas: 'Pyjama aantrekken', bed: 'Naar bed gaan' },
  sv: { brushTeeth: 'Borsta tänderna', breakfast: 'Äta frukost', school: 'Gå till skolan', bus: 'Åka buss', lunch: 'Äta lunch', dinner: 'Äta middag', playBall: 'Spela boll', bike: 'Cykla', dog: 'Gå ut med hunden', book: 'Läsa en bok', bath: 'Bada', pajamas: 'Ta på sig pyjamas', bed: 'Gå och lägga sig' },
  da: { brushTeeth: 'Børste tænder', breakfast: 'Spise morgenmad', school: 'Tage i skole', bus: 'Tage bussen', lunch: 'Spise frokost', dinner: 'Spise aftensmad', playBall: 'Spille bold', bike: 'Cykle', dog: 'Gå tur med hunden', book: 'Læse en bog', bath: 'Tage et bad', pajamas: 'Tage nattøj på', bed: 'Gå i seng' },
  no: { brushTeeth: 'Pusse tennene', breakfast: 'Spise frokost', school: 'Gå til skolen', bus: 'Ta bussen', lunch: 'Spise matpakke', dinner: 'Spise middag', playBall: 'Spille ball', bike: 'Sykle', dog: 'Gå tur med hunden', book: 'Lese en bok', bath: 'Bade', pajamas: 'Ta på seg pyjamas', bed: 'Legge seg' },
  fi: { brushTeeth: 'Hampaiden pesu', breakfast: 'Aamupala', school: 'Kouluunlähtö', bus: 'Bussimatka', lunch: 'Lounas', dinner: 'Päivällinen', playBall: 'Pallopeli', bike: 'Pyöräily', dog: 'Koiran ulkoilutus', book: 'Kirjan lukeminen', bath: 'Kylpy', pajamas: 'Pyjaman pukeminen', bed: 'Nukkumaanmeno' },
};

const loc2 = (locale) => String(locale || 'en').slice(0, 2);
/** the activity's window in this locale */
const windowOf = (a, locale) => (a.winBy && a.winBy[loc2(locale)]) || a.win;
const labelOf = (a, locale) => {
  const L = LABELS[loc2(locale)];
  if (!L || !L[a.id]) throw new Error('routine: no ' + loc2(locale) + ' label for ' + a.id);
  return L[a.id];
};

module.exports = { ROUTINE, LABELS, windowOf, labelOf };
