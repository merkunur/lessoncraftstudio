/**
 * calendar.js — per-locale calendar facts + question frames for G2-277.
 *
 *   weekStart   — 0 Sunday (en, pt-BR) · 1 Monday (the other nine; the es
 *                 panel may rule 0 for Latin America)
 *   dayNames    — 7 full names, SUNDAY-FIRST order (index = JS getUTCDay)
 *   dayAbbr     — 7 header abbreviations, same order
 *   dayPlural   — the countWeekday plural ("How many Fridays…"), same order
 *   monthNames  — 12
 *   ordinalStyle — 'en' (14th) · 'dot' (14.) · 'plain' (14) · 'fr' (1er / 14) ·
 *                  'nl' (14e) · 'sv' (14:e)
 *   frames      — question frames; slots {date} {dayPlural} {sticker}
 *                 {stickerA} {stickerB} ({sticker*} = an inline picture)
 *
 * Day/month name tables for all 11 locales are PRE-AUTHORED here (calendar
 * facts, audited by each panel at the fan); question frames for the 10 non-EN
 * locales are authored by the panels and merged by tools/apply-b2-locale.js.
 */
'use strict';

function ordinal(style, n) {
  if (style === 'en') {
    const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  if (style === 'dot') return n + '.';
  if (style === 'fr') return n === 1 ? '1er' : String(n);
  if (style === 'nl') return n + 'e';
  if (style === 'sv') return n + ':e';
  return String(n);
}

const NAMES = {
  en: { weekStart: 0, ordinalStyle: 'en',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayPlural: ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
  de: { weekStart: 1, ordinalStyle: 'dot',
    dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    dayAbbr: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    dayPlural: ['Sonntage', 'Montage', 'Dienstage', 'Mittwoche', 'Donnerstage', 'Freitage', 'Samstage'],
    monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'] },
  fr: { weekStart: 1, ordinalStyle: 'fr',
    dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    dayAbbr: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    dayPlural: ['dimanches', 'lundis', 'mardis', 'mercredis', 'jeudis', 'vendredis', 'samedis'],
    monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'] },
  es: { weekStart: 1, ordinalStyle: 'plain',
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayAbbr: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayPlural: ['domingos', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábados'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'] },
  pt: { weekStart: 0, ordinalStyle: 'plain',
    dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
    dayAbbr: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayPlural: ['domingos', 'segundas-feiras', 'terças-feiras', 'quartas-feiras', 'quintas-feiras', 'sextas-feiras', 'sábados'],
    monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'] },
  it: { weekStart: 1, ordinalStyle: 'plain',
    dayNames: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
    dayAbbr: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
    dayPlural: ['domeniche', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabati'],
    monthNames: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'] },
  nl: { weekStart: 1, ordinalStyle: 'nl',
    dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    dayAbbr: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    dayPlural: ['zondagen', 'maandagen', 'dinsdagen', 'woensdagen', 'donderdagen', 'vrijdagen', 'zaterdagen'],
    monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'] },
  sv: { weekStart: 1, ordinalStyle: 'sv',
    dayNames: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
    dayAbbr: ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'],
    dayPlural: ['söndagar', 'måndagar', 'tisdagar', 'onsdagar', 'torsdagar', 'fredagar', 'lördagar'],
    monthNames: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'] },
  da: { weekStart: 1, ordinalStyle: 'dot',
    dayNames: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    dayAbbr: ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'],
    dayPlural: ['søndage', 'mandage', 'tirsdage', 'onsdage', 'torsdage', 'fredage', 'lørdage'],
    monthNames: ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'] },
  no: { weekStart: 1, ordinalStyle: 'dot',
    dayNames: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    dayAbbr: ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'],
    dayPlural: ['søndager', 'mandager', 'tirsdager', 'onsdager', 'torsdager', 'fredager', 'lørdager'],
    monthNames: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'] },
  fi: { weekStart: 1, ordinalStyle: 'dot',
    dayNames: ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'],
    dayAbbr: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
    dayPlural: ['sunnuntaita', 'maanantaita', 'tiistaita', 'keskiviikkoa', 'torstaita', 'perjantaita', 'lauantaita'],
    monthNames: ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'] },
};

const FRAMES = {
  en: {
    dayOfDate: 'What day of the week is the {date}?',
    countWeekday: 'How many {dayPlural} are in this month?',
    stickerDate: 'On which date is the {sticker}?',
    weekLater: 'What is the date one week after the {date}?',
    daysInMonth: 'How many days does this month have?',
    firstDay: 'What day of the week is the first day of the month?',
    lastDay: 'What day of the week is the last day of the month?',
    after: 'How many days after the {stickerA} is the {stickerB}?',
  },
};

// the 10 non-EN frame banks (+ any name/weekStart override a panel ruled) are
// GENERATED into calendar-frames.js by tools/apply-b2-locale.js
let GENERATED = {};
try { GENERATED = require('./calendar-frames.js').CALENDAR_FRAMES || {}; } catch (e) { GENERATED = {}; }

const CALENDAR = {};
for (const [loc, n] of Object.entries(NAMES)) {
  const g = GENERATED[loc] || {};
  const { frames: gFrames, ...overrides } = g;
  CALENDAR[loc] = { ...n, ...overrides, frames: gFrames || FRAMES[loc] || null };
}

module.exports = { CALENDAR, NAMES, FRAMES, ordinal };
