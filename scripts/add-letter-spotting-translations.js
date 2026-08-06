#!/usr/bin/env node
/**
 * Add Letter Spotting translation keys to all 11 locales
 * in translations-find-and-count-complete.js
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'REFERENCE TRANSLATIONS', 'translations-find-and-count-complete.js');
let content = fs.readFileSync(filePath, 'utf8');

const newKeys = {
  en: {
    "letterSpotting": "Letter Spotting",
    "enableLetterSpotting": "Enable Letter Spotting Mode",
    "letterSpottingHint": "Find images that begin with a selected letter.",
    "letterSpottingActiveHint": "Select a letter, then click Create.",
    "selectLetter": "Select Letter",
    "letterMatchCount": "{count} image(s) start with \"{letter}\"",
    "targetImages": "Target Images",
    "distractorCount": "{count} other images available as distractors",
    "selectLetterFirst": "Select a letter to see matching images.",
    "noImagesForLetter": "No images starting with \"{letter}\" found in the {theme} theme. Please choose a different theme or letter.",
    "notEnoughDistractors": "Need at least 5 other images as distractors. Try a theme with more images.",
    "pleaseSelectLetter": "Please select a letter first.",
    "pleaseSelectEnoughDistractors": "Please select at least 5 distractor images (not starting with the letter).",
    "pleaseSelectTargetImage": "Please select at least 1 image starting with the letter {letter}.",
    "letterSpottingInstruction": "Find all the pictures that begin with the letter {letter}.",
    "more": "more"
  },
  de: {
    "letterSpotting": "Buchstaben-Suche",
    "enableLetterSpotting": "Buchstaben-Suche aktivieren",
    "letterSpottingHint": "Finde Bilder, die mit einem bestimmten Buchstaben beginnen.",
    "letterSpottingActiveHint": "W\u00e4hle einen Buchstaben, dann klicke auf Erstellen.",
    "selectLetter": "Buchstabe w\u00e4hlen",
    "letterMatchCount": "{count} Bild(er) beginnen mit \"{letter}\"",
    "targetImages": "Zielbilder",
    "distractorCount": "{count} weitere Bilder als Ablenkung verf\u00fcgbar",
    "selectLetterFirst": "W\u00e4hle einen Buchstaben, um passende Bilder zu sehen.",
    "noImagesForLetter": "Keine Bilder mit \"{letter}\" im Thema {theme} gefunden. Bitte w\u00e4hle ein anderes Thema oder einen anderen Buchstaben.",
    "notEnoughDistractors": "Mindestens 5 andere Bilder als Ablenkung n\u00f6tig. Versuche ein Thema mit mehr Bildern.",
    "pleaseSelectLetter": "Bitte w\u00e4hle zuerst einen Buchstaben.",
    "pleaseSelectEnoughDistractors": "Bitte w\u00e4hle mindestens 5 Ablenkungsbilder (die nicht mit dem Buchstaben beginnen).",
    "pleaseSelectTargetImage": "Bitte w\u00e4hle mindestens 1 Bild, das mit dem Buchstaben {letter} beginnt.",
    "letterSpottingInstruction": "Finde alle Bilder, die mit dem Buchstaben {letter} beginnen.",
    "more": "mehr"
  },
  fr: {
    "letterSpotting": "Chasse aux lettres",
    "enableLetterSpotting": "Activer la Chasse aux lettres",
    "letterSpottingHint": "Trouve les images qui commencent par une lettre choisie.",
    "letterSpottingActiveHint": "Choisis une lettre, puis clique sur Cr\u00e9er.",
    "selectLetter": "Choisir une lettre",
    "letterMatchCount": "{count} image(s) commencent par \"{letter}\"",
    "targetImages": "Images cibles",
    "distractorCount": "{count} autres images disponibles comme distracteurs",
    "selectLetterFirst": "Choisis une lettre pour voir les images correspondantes.",
    "noImagesForLetter": "Aucune image commen\u00e7ant par \"{letter}\" trouv\u00e9e dans le th\u00e8me {theme}. Choisis un autre th\u00e8me ou une autre lettre.",
    "notEnoughDistractors": "Il faut au moins 5 autres images comme distracteurs. Essaie un th\u00e8me avec plus d\u2019images.",
    "pleaseSelectLetter": "Choisis d\u2019abord une lettre.",
    "pleaseSelectEnoughDistractors": "S\u00e9lectionne au moins 5 images distractrices (ne commen\u00e7ant pas par la lettre).",
    "pleaseSelectTargetImage": "S\u00e9lectionne au moins 1 image commen\u00e7ant par la lettre {letter}.",
    "letterSpottingInstruction": "Trouve toutes les images qui commencent par la lettre {letter}.",
    "more": "plus"
  },
  es: {
    "letterSpotting": "Busca la letra",
    "enableLetterSpotting": "Activar Busca la letra",
    "letterSpottingHint": "Encuentra im\u00e1genes que empiezan con una letra seleccionada.",
    "letterSpottingActiveHint": "Selecciona una letra y haz clic en Crear.",
    "selectLetter": "Seleccionar letra",
    "letterMatchCount": "{count} imagen(es) empiezan con \"{letter}\"",
    "targetImages": "Im\u00e1genes objetivo",
    "distractorCount": "{count} otras im\u00e1genes disponibles como distractores",
    "selectLetterFirst": "Selecciona una letra para ver las im\u00e1genes correspondientes.",
    "noImagesForLetter": "No se encontraron im\u00e1genes que empiecen con \"{letter}\" en el tema {theme}. Elige otro tema u otra letra.",
    "notEnoughDistractors": "Se necesitan al menos 5 im\u00e1genes como distractores. Prueba un tema con m\u00e1s im\u00e1genes.",
    "pleaseSelectLetter": "Selecciona primero una letra.",
    "pleaseSelectEnoughDistractors": "Selecciona al menos 5 im\u00e1genes distractoras (que no empiecen con la letra).",
    "pleaseSelectTargetImage": "Selecciona al menos 1 imagen que empiece con la letra {letter}.",
    "letterSpottingInstruction": "Encuentra todas las im\u00e1genes que empiezan con la letra {letter}.",
    "more": "m\u00e1s"
  },
  it: {
    "letterSpotting": "Caccia alla lettera",
    "enableLetterSpotting": "Attiva Caccia alla lettera",
    "letterSpottingHint": "Trova le immagini che iniziano con una lettera scelta.",
    "letterSpottingActiveHint": "Scegli una lettera, poi clicca su Crea.",
    "selectLetter": "Scegli una lettera",
    "letterMatchCount": "{count} immagine/i iniziano con \"{letter}\"",
    "targetImages": "Immagini obiettivo",
    "distractorCount": "{count} altre immagini disponibili come distrattori",
    "selectLetterFirst": "Scegli una lettera per vedere le immagini corrispondenti.",
    "noImagesForLetter": "Nessuna immagine che inizia con \"{letter}\" trovata nel tema {theme}. Scegli un altro tema o un\u2019altra lettera.",
    "notEnoughDistractors": "Servono almeno 5 altre immagini come distrattori. Prova un tema con pi\u00f9 immagini.",
    "pleaseSelectLetter": "Scegli prima una lettera.",
    "pleaseSelectEnoughDistractors": "Seleziona almeno 5 immagini distrattrici (che non iniziano con la lettera).",
    "pleaseSelectTargetImage": "Seleziona almeno 1 immagine che inizia con la lettera {letter}.",
    "letterSpottingInstruction": "Trova tutte le immagini che iniziano con la lettera {letter}.",
    "more": "altro"
  },
  pt: {
    "letterSpotting": "Ca\u00e7a \u00e0 letra",
    "enableLetterSpotting": "Ativar Ca\u00e7a \u00e0 letra",
    "letterSpottingHint": "Encontra imagens que come\u00e7am com uma letra selecionada.",
    "letterSpottingActiveHint": "Seleciona uma letra e clica em Criar.",
    "selectLetter": "Selecionar letra",
    "letterMatchCount": "{count} imagem(ns) come\u00e7am com \"{letter}\"",
    "targetImages": "Imagens alvo",
    "distractorCount": "{count} outras imagens dispon\u00edveis como distra\u00e7\u00e3o",
    "selectLetterFirst": "Seleciona uma letra para ver as imagens correspondentes.",
    "noImagesForLetter": "Nenhuma imagem come\u00e7ando com \"{letter}\" encontrada no tema {theme}. Escolhe outro tema ou outra letra.",
    "notEnoughDistractors": "S\u00e3o necess\u00e1rias pelo menos 5 outras imagens como distra\u00e7\u00e3o. Tenta um tema com mais imagens.",
    "pleaseSelectLetter": "Seleciona primeiro uma letra.",
    "pleaseSelectEnoughDistractors": "Seleciona pelo menos 5 imagens de distra\u00e7\u00e3o (que n\u00e3o come\u00e7am com a letra).",
    "pleaseSelectTargetImage": "Seleciona pelo menos 1 imagem que come\u00e7a com a letra {letter}.",
    "letterSpottingInstruction": "Encontra todas as imagens que come\u00e7am com a letra {letter}.",
    "more": "mais"
  },
  nl: {
    "letterSpotting": "Letterzoeker",
    "enableLetterSpotting": "Letterzoeker activeren",
    "letterSpottingHint": "Zoek afbeeldingen die beginnen met een gekozen letter.",
    "letterSpottingActiveHint": "Kies een letter en klik op Maken.",
    "selectLetter": "Kies een letter",
    "letterMatchCount": "{count} afbeelding(en) beginnen met \"{letter}\"",
    "targetImages": "Doelafbeeldingen",
    "distractorCount": "{count} andere afbeeldingen beschikbaar als afleiding",
    "selectLetterFirst": "Kies een letter om bijpassende afbeeldingen te zien.",
    "noImagesForLetter": "Geen afbeeldingen gevonden die beginnen met \"{letter}\" in het thema {theme}. Kies een ander thema of een andere letter.",
    "notEnoughDistractors": "Er zijn minstens 5 andere afbeeldingen als afleiding nodig. Probeer een thema met meer afbeeldingen.",
    "pleaseSelectLetter": "Kies eerst een letter.",
    "pleaseSelectEnoughDistractors": "Selecteer minstens 5 afleidingsafbeeldingen (die niet met de letter beginnen).",
    "pleaseSelectTargetImage": "Selecteer minstens 1 afbeelding die begint met de letter {letter}.",
    "letterSpottingInstruction": "Zoek alle plaatjes die beginnen met de letter {letter}.",
    "more": "meer"
  },
  sv: {
    "letterSpotting": "Bokstavsjakten",
    "enableLetterSpotting": "Aktivera Bokstavsjakten",
    "letterSpottingHint": "Hitta bilder som b\u00f6rjar med en vald bokstav.",
    "letterSpottingActiveHint": "V\u00e4lj en bokstav och klicka p\u00e5 Skapa.",
    "selectLetter": "V\u00e4lj bokstav",
    "letterMatchCount": "{count} bild(er) b\u00f6rjar med \"{letter}\"",
    "targetImages": "M\u00e5lbilder",
    "distractorCount": "{count} andra bilder tillg\u00e4ngliga som distraktioner",
    "selectLetterFirst": "V\u00e4lj en bokstav f\u00f6r att se matchande bilder.",
    "noImagesForLetter": "Inga bilder som b\u00f6rjar med \"{letter}\" hittades i temat {theme}. V\u00e4lj ett annat tema eller en annan bokstav.",
    "notEnoughDistractors": "Minst 5 andra bilder beh\u00f6vs som distraktioner. Prova ett tema med fler bilder.",
    "pleaseSelectLetter": "V\u00e4lj en bokstav f\u00f6rst.",
    "pleaseSelectEnoughDistractors": "V\u00e4lj minst 5 distraktionsbilder (som inte b\u00f6rjar med bokstaven).",
    "pleaseSelectTargetImage": "V\u00e4lj minst 1 bild som b\u00f6rjar med bokstaven {letter}.",
    "letterSpottingInstruction": "Hitta alla bilder som b\u00f6rjar med bokstaven {letter}.",
    "more": "mer"
  },
  da: {
    "letterSpotting": "Bogstavsjagt",
    "enableLetterSpotting": "Aktiv\u00e9r Bogstavsjagt",
    "letterSpottingHint": "Find billeder, der begynder med et valgt bogstav.",
    "letterSpottingActiveHint": "V\u00e6lg et bogstav, og klik derefter p\u00e5 Opret.",
    "selectLetter": "V\u00e6lg bogstav",
    "letterMatchCount": "{count} billede(r) begynder med \"{letter}\"",
    "targetImages": "M\u00e5lbilleder",
    "distractorCount": "{count} andre billeder tilg\u00e6ngelige som distraktioner",
    "selectLetterFirst": "V\u00e6lg et bogstav for at se matchende billeder.",
    "noImagesForLetter": "Ingen billeder, der begynder med \"{letter}\", fundet i temaet {theme}. V\u00e6lg et andet tema eller et andet bogstav.",
    "notEnoughDistractors": "Der kr\u00e6ves mindst 5 andre billeder som distraktioner. Pr\u00f8v et tema med flere billeder.",
    "pleaseSelectLetter": "V\u00e6lg venligst et bogstav f\u00f8rst.",
    "pleaseSelectEnoughDistractors": "V\u00e6lg mindst 5 distraktionsbilleder (der ikke begynder med bogstavet).",
    "pleaseSelectTargetImage": "V\u00e6lg mindst 1 billede, der begynder med bogstavet {letter}.",
    "letterSpottingInstruction": "Find alle billeder, der begynder med bogstavet {letter}.",
    "more": "mere"
  },
  no: {
    "letterSpotting": "Bokstavsjakt",
    "enableLetterSpotting": "Aktiver Bokstavsjakt",
    "letterSpottingHint": "Finn bilder som begynner med en valgt bokstav.",
    "letterSpottingActiveHint": "Velg en bokstav, og klikk deretter p\u00e5 Opprett.",
    "selectLetter": "Velg bokstav",
    "letterMatchCount": "{count} bilde(r) begynner med \"{letter}\"",
    "targetImages": "M\u00e5lbilder",
    "distractorCount": "{count} andre bilder tilgjengelig som distraksjoner",
    "selectLetterFirst": "Velg en bokstav for \u00e5 se matchende bilder.",
    "noImagesForLetter": "Ingen bilder som begynner med \"{letter}\" funnet i temaet {theme}. Velg et annet tema eller en annen bokstav.",
    "notEnoughDistractors": "Minst 5 andre bilder trengs som distraksjoner. Pr\u00f8v et tema med flere bilder.",
    "pleaseSelectLetter": "Velg en bokstav f\u00f8rst.",
    "pleaseSelectEnoughDistractors": "Velg minst 5 distraksjonsbilder (som ikke begynner med bokstaven).",
    "pleaseSelectTargetImage": "Velg minst 1 bilde som begynner med bokstaven {letter}.",
    "letterSpottingInstruction": "Finn alle bildene som begynner med bokstaven {letter}.",
    "more": "mer"
  },
  fi: {
    "letterSpotting": "Kirjainetsint\u00e4",
    "enableLetterSpotting": "Ota Kirjainetsint\u00e4 k\u00e4ytt\u00f6\u00f6n",
    "letterSpottingHint": "Etsi kuvia, jotka alkavat valitulla kirjaimella.",
    "letterSpottingActiveHint": "Valitse kirjain ja napsauta sitten Luo.",
    "selectLetter": "Valitse kirjain",
    "letterMatchCount": "{count} kuva(a) alkaa kirjaimella \"{letter}\"",
    "targetImages": "Kohdekuvat",
    "distractorCount": "{count} muuta kuvaa saatavilla h\u00e4iri\u00f6tekij\u00f6in\u00e4",
    "selectLetterFirst": "Valitse kirjain n\u00e4hd\u00e4ksesi vastaavat kuvat.",
    "noImagesForLetter": "Kirjaimella \"{letter}\" alkavia kuvia ei l\u00f6ytynyt teemasta {theme}. Valitse toinen teema tai kirjain.",
    "notEnoughDistractors": "Tarvitaan v\u00e4hint\u00e4\u00e4n 5 muuta kuvaa h\u00e4iri\u00f6tekij\u00f6iksi. Kokeile teemaa, jossa on enemm\u00e4n kuvia.",
    "pleaseSelectLetter": "Valitse ensin kirjain.",
    "pleaseSelectEnoughDistractors": "Valitse v\u00e4hint\u00e4\u00e4n 5 h\u00e4iri\u00f6kuvaa (jotka eiv\u00e4t ala kirjaimella).",
    "pleaseSelectTargetImage": "Valitse v\u00e4hint\u00e4\u00e4n 1 kuva, joka alkaa kirjaimella {letter}.",
    "letterSpottingInstruction": "Etsi kaikki kuvat, jotka alkavat kirjaimella {letter}.",
    "more": "lis\u00e4\u00e4"
  }
};

const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
let modified = 0;

for (const locale of locales) {
  const keys = newKeys[locale];
  if (!keys) {
    console.log(`WARNING: No translations for ${locale}`);
    continue;
  }

  // Find the last key "manualModeHint" line for this locale
  // Pattern: "manualModeHint": "...(text)..."
  // We need to add a comma after it and insert new keys before the closing }
  // Build new keys string
  const indent = '    '; // 4 spaces to match existing indentation
  const newKeysStr = Object.entries(keys)
    .map(([key, value]) => {
      const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return `${indent}"${key}": "${escaped}"`;
    })
    .join(',\r\n');

  // Find and replace: add comma after manualModeHint, insert new keys before closing }
  const manualModeHintRegex = new RegExp(
    `("manualModeHint":\\s*"[^"]*")\\r?\\n(\\s*\\})`,
  );

  if (manualModeHintRegex.test(content)) {
    content = content.replace(manualModeHintRegex, `$1,\r\n${newKeysStr}\r\n$2`);
    modified++;
  } else {
    console.log(`WARNING: Could not find manualModeHint for locale ${locale}`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Done! Modified ${modified} locale blocks.`);

// Verify
const result = fs.readFileSync(filePath, 'utf8');
const letterSpottingCount = (result.match(/"letterSpotting"/g) || []).length;
console.log(`Verification: "letterSpotting" key appears ${letterSpottingCount} times (expected: 11)`);
