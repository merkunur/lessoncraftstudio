/**
 * G1-542 — Make Your Own Secret Code (Secret Code maker 2026-11-03, NEW-TEMPLATES §59; types/_shared/cryptogram.js): open: the alphabet with an empty box for each letter's symbol, lines for a message and its code. Levels: 1 two lines each · 2 three · 3 four.
 */
'use strict';
const { makeCryptogram } = require('../_shared/cryptogram.js');

module.exports = makeCryptogram({
  id: 'G1-542', slug: 'make-your-own-code', gradeBand: 'G1', code: 'own',
  labels: { en: ['My message', 'My message in code'], de: ['Meine Nachricht', 'Meine Nachricht in Geheimschrift'], fr: ['Mon message', 'Mon message codé'], es: ['Mi mensaje', 'Mi mensaje en clave'], pt: ['Minha mensagem', 'Minha mensagem em código'], it: ['Il mio messaggio', 'Il mio messaggio in codice'], nl: ['Mijn bericht', 'Mijn bericht in geheimschrift'], sv: ['Mitt meddelande', 'Mitt meddelande i kod'], da: ['Min besked', 'Min besked i kode'], no: ['Min beskjed', 'Min beskjed i kode'], fi: ['Viestini', 'Viestini salakielellä'] },
  D: { 1: { lines: 2, lineH: 52 }, 2: { lines: 3, lineH: 46 }, 3: { lines: 4, lineH: 40 } },
  i18n: { en: { title: "Make Your Own Secret Code", instruction: "Draw a symbol for each letter. Write a message, then write it again in your code for a friend." } },
});
