#!/usr/bin/env node
/**
 * One-shot: apply linguist-reviewed corrections to sv/da/no/fi message files.
 *
 * Per `docs/audit-results/about-linguist-review-2026-05-27.json`. Each
 * correction is keyed by dotted path; we walk the object, replace the
 * value at that path, and write back with JSON.stringify(_, null, 2) +
 * trailing newline (matches `seo-inject-aboutpage-i18n.js`'s pattern,
 * which is how these files were last touched).
 *
 * Read-only on all locales NOT in the fixes table. Safe to re-run.
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'frontend', 'messages');

const FIXES = {
  sv: {
    'aboutPage.meta.description':
      'Om LessonCraftStudio — gratis arbetsblad och interaktiva aktiviteter för F-3 på 11 språk, för tvåspråkiga, flerspråkiga och internationella klassrum.',
    'aboutPage.intro':
      'LessonCraftStudio publicerar gratis arbetsblad och interaktiva aktiviteter för F-3 på 11 språk. Allt är fritt att bläddra i, skriva ut, dela och bädda in — ingen registrering krävs.',
    'aboutPage.whatWeOfferBody':
      'Utskrivbara PDF:er och webbläsarbaserade aktiviteter inom matematik, läsinlärning och ordförråd — på engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, svenska, danska, norska och finska.',
    'aboutPage.audienceBody':
      'För lärare och föräldrar i tvåspråkiga, flerspråkiga och internationella klassrum, särskilt i förskoleåldern och tidiga skolåren (3–7 år).',
  },
  da: {
    'aboutPage.meta.description':
      'Om LessonCraftStudio — gratis opgaveark og interaktive aktiviteter til børnehaveklasse til 3. klasse på 11 sprog, til tosprogede klasser, sprogbadsklasser og internationale skoler.',
    'aboutPage.intro':
      'LessonCraftStudio udgiver gratis opgaveark og interaktive aktiviteter til børnehaveklasse til 3. klasse på 11 sprog. Alt kan frit gennemses, printes, deles og indlejres — ingen tilmelding nødvendig.',
    'aboutPage.whatWeOfferBody':
      "Printbare PDF'er og aktiviteter, der kan spilles direkte i browseren, inden for matematik, lydmetoden og ordforråd — på engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, dansk, norsk og finsk.",
    'aboutPage.audienceHeading':
      'Hvem er det til?',
    'aboutPage.audienceBody':
      'Lavet til lærere og forældre i tosprogede klasser, sprogbadsklasser og internationale skoler — især til de små fra 3 til 7 år.',
    'aboutPage.teamBody':
      'Vi opdaterer dette afsnit — kig forbi igen snart.',
  },
  no: {
    'aboutPage.meta.description':
      'Om LessonCraftStudio – gratis oppgaveark og interaktive aktiviteter for barnehage til 3. trinn på 11 språk, laget for tospråklige klasser, språkbadsklasser og internasjonale skoler.',
    'aboutPage.intro':
      'LessonCraftStudio publiserer gratis oppgaveark og interaktive aktiviteter for barnehage til 3. trinn på 11 språk. Alt er gratis å bla i, skrive ut, dele og bygge inn – ingen registrering nødvendig.',
    'aboutPage.whatWeOfferBody':
      'PDF-er til utskrift og aktiviteter som spilles i nettleseren, innen matematikk, lese- og skriveopplæring og ordforråd, på engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk.',
    'aboutPage.audienceHeading':
      'Hvem det er for',
    'aboutPage.audienceBody':
      'Laget for lærere og foreldre i tospråklige klasser, språkbadsklasser og internasjonale skoler, særlig på småbarnstrinnet (3–7 år).',
    'aboutPage.teamBody':
      'Vi oppdaterer denne delen – stikk innom igjen snart.',
  },
  fi: {
    'aboutPage.meta.description':
      'Tietoa LessonCraftStudiosta – maksuttomia esi- ja alkuopetuksen tehtäväarkkeja ja interaktiivisia tehtäviä 11 kielellä kaksikielisille, monikielisille ja kansainvälisille luokille.',
    'aboutPage.intro':
      'LessonCraftStudio julkaisee maksuttomia esi- ja alkuopetuksen tehtäväarkkeja ja interaktiivisia tehtäviä 11 kielellä. Kaikkea saa vapaasti selata, tulostaa, jakaa ja upottaa – rekisteröitymistä ei tarvita.',
    'aboutPage.whatWeOfferBody':
      'Tulostettavia PDF-tiedostoja ja selaimessa pelattavia tehtäviä matematiikkaan, lukemisen alkeisiin ja sanavarastoon. Saatavilla englanniksi, saksaksi, ranskaksi, espanjaksi, portugaliksi, italiaksi, hollanniksi, ruotsiksi, tanskaksi, norjaksi ja suomeksi.',
    'aboutPage.audienceBody':
      'Tarkoitettu opettajille ja vanhemmille kaksikielisissä, monikielisissä ja kansainvälisissä luokissa, erityisesti varhaiskasvatuksessa ja esiopetuksessa (3–7-vuotiaat).',
    'aboutPage.teamBody':
      'Päivitämme tätä osiota – palaathan pian uudelleen.',
    'footer.about':
      'Meistä',
  },
};

function setByPath(obj, dottedPath, value) {
  const parts = dottedPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (cur[parts[i]] == null || typeof cur[parts[i]] !== 'object') {
      throw new Error(`Path missing at "${parts.slice(0, i + 1).join('.')}"`);
    }
    cur = cur[parts[i]];
  }
  const last = parts[parts.length - 1];
  if (!(last in cur)) {
    throw new Error(`Final key "${dottedPath}" not present in target file`);
  }
  cur[last] = value;
}

function apply(locale) {
  const file = path.join(MESSAGES_DIR, `${locale}.json`);
  const raw = fs.readFileSync(file, 'utf-8');
  const data = JSON.parse(raw);
  const fixes = FIXES[locale];
  let changed = 0;
  for (const [dottedPath, newValue] of Object.entries(fixes)) {
    setByPath(data, dottedPath, newValue);
    changed += 1;
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`  ${locale}.json: ${changed} keys updated`);
}

function main() {
  console.log('Applying linguist-reviewed fixes to 4 locale files:');
  for (const locale of ['sv', 'da', 'no', 'fi']) {
    apply(locale);
  }
  console.log('');
  console.log('Done. en.json + other 6 locales NOT touched.');
}

main();
