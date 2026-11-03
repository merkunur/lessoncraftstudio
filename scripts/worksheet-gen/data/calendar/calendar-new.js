/**
 * data/calendar/calendar-new.js — the Calendar maker's new templates (2026-11-03, NEW-TEMPLATES §53), native per language.
 * The day and month NAMES are never here: they are data/b2/calendar.js NAMES (dayNames Sunday-first, monthNames,
 * monthAbbr, weekStart — en / pt-BR / es-MX start the week on Sunday). This file holds only what those names are used in:
 *   numeric   the written order of a date and its separator (en-US month first 10/14/2026, sv ISO 2026-10-14, the others
 *             day first: de 14.10.2026, fr 14/10/2026, nl 14-10-2026)
 *   today     the sentence "Today is …" with {weekday} {day} {month} {year} (G1-526): each slot is a box
 *   monthIn   fi only: the month forms the frames need (partitive «lokakuuta» after a day, inessive «lokakuussa»)
 *   labels    yesterday / today / tomorrow (G1-526 level 3)
 *   subjects  six school subjects with the library picture that shows each (G1-527 timetable): art = the palette,
 *             music = the piano, PE = gymnastics, reading, writing, swimming = the goggles
 *   tt        the timetable questions: whichDay {pic} → a day, whatDo {day} → a picture, howMany {pic} → a number
 *   dayIn     the weekday as the whatDo frame needs it (fi essive maanantaina, da habitual mandagen), Monday…Friday
 *   bday      the birthday-graph questions (G1-525): most, fewest (plural: a tie is a right answer), inMonth {month} (a
 *             write-in line: the class picks a month that has birthdays — never a count of 0), total
 */
'use strict';
const NN = ' ';

const NEW = {
  en: {
    numeric: { order: ['m', 'd', 'y'], sep: '/' },
    today: 'Today is {weekday}, {month} {day}, {year}.',
    labels: { yesterday: 'Yesterday', today: 'Today', tomorrow: 'Tomorrow' },
    subjects: { art: 'Art', music: 'Music', pe: 'P.E.', reading: 'Reading', writing: 'Writing', swimming: 'Swimming' },
    tt: { whichDay: 'On which day do we have {pic}?', whatDo: 'What do we have on {day}?', howMany: 'On how many days do we have {pic}?' },
    bday: { most: 'Which month has the most birthdays?', fewest: 'Which months have the fewest birthdays?', inMonth: 'How many children have a birthday in {month}?', total: 'How many children are there in all?' },
  },
  de: {
    numeric: { order: ['d', 'm', 'y'], sep: '.' },
    today: 'Heute ist {weekday}, der {day}. {month} {year}.',
    labels: { yesterday: 'Gestern', today: 'Heute', tomorrow: 'Morgen' },
    subjects: { art: 'Kunst', music: 'Musik', pe: 'Sport', reading: 'Lesen', writing: 'Schreiben', swimming: 'Schwimmen' },
    tt: { whichDay: 'An welchem Tag haben wir {pic}?', whatDo: 'Was haben wir am {day}?', howMany: 'An wie vielen Tagen haben wir {pic}?' },
    bday: { most: 'In welchem Monat haben die meisten Kinder Geburtstag?', fewest: 'In welchen Monaten haben die wenigsten Kinder Geburtstag?', inMonth: 'Wie viele Kinder haben im {month} Geburtstag?', total: 'Wie viele Kinder sind es insgesamt?' },
  },
  fr: {
    numeric: { order: ['d', 'm', 'y'], sep: '/' },
    today: "Aujourd'hui, nous sommes le {weekday} {day} {month} {year}.",
    labels: { yesterday: 'Hier', today: "Aujourd'hui", tomorrow: 'Demain' },
    subjects: { art: 'Arts plastiques', music: 'Musique', pe: 'Sport', reading: 'Lecture', writing: 'Écriture', swimming: 'Piscine' },
    tt: { whichDay: 'Quel jour avons-nous {pic}' + NN + '?', whatDo: "Qu'avons-nous le {day}" + NN + '?', howMany: 'Combien de jours avons-nous {pic}' + NN + '?' },
    bday: { most: "Quel mois a le plus d'anniversaires" + NN + '?', fewest: "Quels mois ont le moins d'anniversaires" + NN + '?', inMonth: "Combien d'enfants ont leur anniversaire en {month}" + NN + '?', total: "Combien d'enfants y a-t-il en tout" + NN + '?' },
  },
  es: {
    numeric: { order: ['d', 'm', 'y'], sep: '/' },
    today: 'Hoy es {weekday} {day} de {month} de {year}.',
    labels: { yesterday: 'Ayer', today: 'Hoy', tomorrow: 'Mañana' },
    subjects: { art: 'Artes', music: 'Música', pe: 'Educación física', reading: 'Lectura', writing: 'Escritura', swimming: 'Natación' },
    tt: { whichDay: '¿Qué día tenemos {pic}?', whatDo: '¿Qué tenemos el {day}?', howMany: '¿Cuántos días tenemos {pic}?' },
    bday: { most: '¿Qué mes tiene más cumpleaños?', fewest: '¿Qué meses tienen menos cumpleaños?', inMonth: '¿Cuántos niños cumplen años en {month}?', total: '¿Cuántos niños hay en total?' },
  },
  pt: {
    numeric: { order: ['d', 'm', 'y'], sep: '/' },
    today: 'Hoje é {weekday}, {day} de {month} de {year}.',
    labels: { yesterday: 'Ontem', today: 'Hoje', tomorrow: 'Amanhã' },
    subjects: { art: 'Artes', music: 'Música', pe: 'Educação física', reading: 'Leitura', writing: 'Escrita', swimming: 'Natação' },
    tt: { whichDay: 'Em que dia temos {pic}?', whatDo: 'O que temos na {day}?', howMany: 'Em quantos dias temos {pic}?' },
    bday: { most: 'Qual mês tem mais aniversários?', fewest: 'Quais meses têm menos aniversários?', inMonth: 'Quantas crianças fazem aniversário em {month}?', total: 'Quantas crianças há ao todo?' },
  },
  it: {
    numeric: { order: ['d', 'm', 'y'], sep: '/' },
    today: 'Oggi è {weekday} {day} {month} {year}.',
    labels: { yesterday: 'Ieri', today: 'Oggi', tomorrow: 'Domani' },
    subjects: { art: 'Arte', music: 'Musica', pe: 'Educazione fisica', reading: 'Lettura', writing: 'Scrittura', swimming: 'Nuoto' },
    tt: { whichDay: 'In che giorno abbiamo {pic}?', whatDo: 'Che cosa abbiamo il {day}?', howMany: 'In quanti giorni abbiamo {pic}?' },
    bday: { most: 'Quale mese ha più compleanni?', fewest: 'Quali mesi hanno meno compleanni?', inMonth: 'Quanti bambini compiono gli anni in {month}?', total: 'Quanti bambini ci sono in tutto?' },
  },
  nl: {
    numeric: { order: ['d', 'm', 'y'], sep: '-' },
    today: 'Vandaag is het {weekday} {day} {month} {year}.',
    labels: { yesterday: 'Gisteren', today: 'Vandaag', tomorrow: 'Morgen' },
    subjects: { art: 'Tekenen', music: 'Muziek', pe: 'Gym', reading: 'Lezen', writing: 'Schrijven', swimming: 'Zwemmen' },
    tt: { whichDay: 'Op welke dag hebben we {pic}?', whatDo: 'Wat hebben we op {day}?', howMany: 'Op hoeveel dagen hebben we {pic}?' },
    bday: { most: 'In welke maand zijn de meeste kinderen jarig?', fewest: 'In welke maanden zijn de minste kinderen jarig?', inMonth: 'Hoeveel kinderen zijn in {month} jarig?', total: 'Hoeveel kinderen zijn er in totaal?' },
  },
  sv: {
    numeric: { order: ['y', 'm', 'd'], sep: '-' },
    today: 'I dag är det {weekday} den {day} {month} {year}.',
    labels: { yesterday: 'I går', today: 'I dag', tomorrow: 'I morgon' },
    subjects: { art: 'Bild', music: 'Musik', pe: 'Idrott', reading: 'Läsa', writing: 'Skriva', swimming: 'Simning' },
    tt: { whichDay: 'Vilken dag har vi {pic}?', whatDo: 'Vad har vi på {day}?', howMany: 'Hur många dagar har vi {pic}?' },
    bday: { most: 'Vilken månad fyller flest barn år?', fewest: 'Vilka månader fyller färst barn år?', inMonth: 'Hur många barn fyller år i {month}?', total: 'Hur många barn är det sammanlagt?' },
  },
  da: {
    numeric: { order: ['d', 'm', 'y'], sep: '.' },
    today: 'I dag er det {weekday} den {day}. {month} {year}.',
    labels: { yesterday: 'I går', today: 'I dag', tomorrow: 'I morgen' },
    subjects: { art: 'Billedkunst', music: 'Musik', pe: 'Idræt', reading: 'Læsning', writing: 'Skrivning', swimming: 'Svømning' },
    tt: { whichDay: 'Hvilken dag har vi {pic}?', whatDo: 'Hvad har vi om {day}?', howMany: 'Hvor mange dage har vi {pic}?' },
    bday: { most: 'Hvilken måned har flest fødselsdage?', fewest: 'Hvilke måneder har færrest fødselsdage?', inMonth: 'Hvor mange børn har fødselsdag i {month}?', total: 'Hvor mange børn er der i alt?' },
    dayIn: ['mandagen', 'tirsdagen', 'onsdagen', 'torsdagen', 'fredagen'],
  },
  no: {
    numeric: { order: ['d', 'm', 'y'], sep: '.' },
    today: 'I dag er det {weekday} {day}. {month} {year}.',
    labels: { yesterday: 'I går', today: 'I dag', tomorrow: 'I morgen' },
    subjects: { art: 'Kunst og håndverk', music: 'Musikk', pe: 'Kroppsøving', reading: 'Lesing', writing: 'Skriving', swimming: 'Svømming' },
    tt: { whichDay: 'Hvilken dag har vi {pic}?', whatDo: 'Hva har vi på {day}?', howMany: 'Hvor mange dager har vi {pic}?' },
    bday: { most: 'Hvilken måned har flest bursdager?', fewest: 'Hvilke måneder har færrest bursdager?', inMonth: 'Hvor mange barn har bursdag i {month}?', total: 'Hvor mange barn er det til sammen?' },
  },
  fi: {
    numeric: { order: ['d', 'm', 'y'], sep: '.' },
    today: 'Tänään on {weekday} {day}. {month} {year}.',
    labels: { yesterday: 'Eilen', today: 'Tänään', tomorrow: 'Huomenna' },
    subjects: { art: 'Kuvataide', music: 'Musiikki', pe: 'Liikunta', reading: 'Lukeminen', writing: 'Kirjoittaminen', swimming: 'Uinti' },
    tt: { whichDay: 'Minä päivänä meillä on {pic}?', whatDo: 'Mitä meillä on {day}?', howMany: 'Monena päivänä meillä on {pic}?' },
    bday: { most: 'Minä kuukautena on eniten syntymäpäiviä?', fewest: 'Minä kuukausina on vähiten syntymäpäiviä?', inMonth: 'Montako lasta täyttää vuosia {month}?', total: 'Montako lasta on yhteensä?' },
    dayIn: ['maanantaina', 'tiistaina', 'keskiviikkona', 'torstaina', 'perjantaina'],
    // fi: after a day number the month is partitive (14. lokakuuta), «in» a month inessive (lokakuussa)
    monthIn: { today: (m) => m + 'ta', bday: (m) => m + 'ssa' },
  },
};

// the picture of each school subject (activities theme, opened 2026-11-03: a palette, a piano, a girl doing gymnastics, a
// girl reading, a boy writing, swimming goggles)
const SUBJECT_PICTURES = { art: 'painting', music: 'piano', pe: 'gymnastics', reading: 'reading', writing: 'writing', swimming: 'swimming' };
const SUBJECT_THEME = 'activities';

module.exports = { CAL_NEW: NEW, SUBJECT_PICTURES, SUBJECT_THEME };
