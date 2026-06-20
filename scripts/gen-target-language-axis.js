#!/usr/bin/env node
/* One-shot: inject axes['target-language'] into frontend/config/topics-taxonomy.json.
 * Powers the /learn ("Languages") cross-language category. Structure mirrors the other
 * axes: target-language.<targetIso>.{slug,name}.<pageLocale>. NAMES for the 22 live
 * (page-locale, target) pairs are the authoritative content_language_name the decks used
 * (Title-cased); the rest are standard exonyms for completeness (won't render until decks
 * exist). SLUG = ASCII-folded lowercase of the name (matches each deck's slug lead).
 * Usage: node scripts/gen-target-language-axis.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const TAX = path.resolve(__dirname, '..', 'frontend', 'config', 'topics-taxonomy.json');

// NAMES[targetIso][pageLocale] = the target language's name written in pageLocale.
const NAMES = {
  en: { en: 'English', de: 'Englisch', es: 'Inglés', fr: 'Anglais', it: 'Inglese', nl: 'Engels', pt: 'Inglês', sv: 'Engelska', da: 'Engelsk', no: 'Engelsk', fi: 'Englanti' },
  de: { en: 'German', de: 'Deutsch', es: 'Alemán', fr: 'Allemand', it: 'Tedesco', nl: 'Duits', pt: 'Alemão', sv: 'Tyska', da: 'Tysk', no: 'Tysk', fi: 'Saksa' },
  es: { en: 'Spanish', de: 'Spanisch', es: 'Español', fr: 'Espagnol', it: 'Spagnolo', nl: 'Spaans', pt: 'Espanhol', sv: 'Spanska', da: 'Spansk', no: 'Spansk', fi: 'Espanja' },
  fr: { en: 'French', de: 'Französisch', es: 'Francés', fr: 'Français', it: 'Francese', nl: 'Frans', pt: 'Francês', sv: 'Franska', da: 'Fransk', no: 'Fransk', fi: 'Ranska' },
  it: { en: 'Italian', de: 'Italienisch', es: 'Italiano', fr: 'Italien', it: 'Italiano', nl: 'Italiaans', pt: 'Italiano', sv: 'Italienska', da: 'Italiensk', no: 'Italiensk', fi: 'Italia' },
  nl: { en: 'Dutch', de: 'Niederländisch', es: 'Neerlandés', fr: 'Néerlandais', it: 'Olandese', nl: 'Nederlands', pt: 'Neerlandês', sv: 'Nederländska', da: 'Nederlandsk', no: 'Nederlandsk', fi: 'Hollanti' },
  pt: { en: 'Portuguese', de: 'Portugiesisch', es: 'Portugués', fr: 'Portugais', it: 'Portoghese', nl: 'Portugees', pt: 'Português', sv: 'Portugisiska', da: 'Portugisisk', no: 'Portugisisk', fi: 'Portugali' },
  sv: { en: 'Swedish', de: 'Schwedisch', es: 'Sueco', fr: 'Suédois', it: 'Svedese', nl: 'Zweeds', pt: 'Sueco', sv: 'Svenska', da: 'Svensk', no: 'Svensk', fi: 'Ruotsi' },
  da: { en: 'Danish', de: 'Dänisch', es: 'Danés', fr: 'Danois', it: 'Danese', nl: 'Deens', pt: 'Dinamarquês', sv: 'Danska', da: 'Dansk', no: 'Dansk', fi: 'Tanska' },
  no: { en: 'Norwegian', de: 'Norwegisch', es: 'Noruego', fr: 'Norvégien', it: 'Norvegese', nl: 'Noors', pt: 'Norueguês', sv: 'Norska', da: 'Norsk', no: 'Norsk', fi: 'Norja' },
  fi: { en: 'Finnish', de: 'Finnisch', es: 'Finés', fr: 'Finnois', it: 'Finlandese', nl: 'Fins', pt: 'Finlandês', sv: 'Finska', da: 'Finsk', no: 'Finsk', fi: 'Suomi' },
};

const NON_DECOMP = { 'æ': 'ae', 'ø': 'o', 'å': 'a', 'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss', 'ñ': 'n', 'ç': 'c', 'ł': 'l' };
function slugify(v) {
  const nfd = String(v).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const mapped = nfd.split('').map((c) => Object.prototype.hasOwnProperty.call(NON_DECOMP, c) ? NON_DECOMP[c] : c).join('');
  return mapped.replace(/[^a-z0-9-]+/g, '-').replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '');
}

const LOCALES = ['en', 'de', 'es', 'nl', 'it', 'fr', 'pt', 'sv', 'da', 'no', 'fi'];
const axis = {};
Object.keys(NAMES).forEach((target) => {
  const slug = {}, name = {};
  LOCALES.forEach((loc) => { const n = NAMES[target][loc]; name[loc] = n; slug[loc] = slugify(n); });
  axis[target] = { slug, name };
});

const tax = JSON.parse(fs.readFileSync(TAX, 'utf8'));
tax.axes['target-language'] = axis;
fs.writeFileSync(TAX, JSON.stringify(tax, null, 2) + '\n');
console.log('Injected axes.target-language with ' + Object.keys(axis).length + ' target languages × ' + LOCALES.length + ' locales.');
console.log('Sample: en→', JSON.stringify(axis.en.slug), '\n        de→', JSON.stringify(axis.de.name));
