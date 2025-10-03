const fs = require('fs');

const file = 'translations.js';
let content = fs.readFileSync(file, 'utf8');

// Define translations for "none" in each language
const noneTranslations = {
  fr: 'Aucun',
  es: 'Ninguno', 
  pt: 'Nenhum',
  it: 'Nessuno',
  nl: 'Geen',
  sv: 'Ingen',
  da: 'Ingen',
  no: 'Ingen',
  fi: 'Ei mitään'
};

// Replace each language's [NEEDS_TRANSLATION] None
for (const [lang, translation] of Object.entries(noneTranslations)) {
  const pattern = new RegExp(`("${lang}": \{[\s\S]*?"none": ")\[NEEDS_TRANSLATION\] None(")`, 'g');
  content = content.replace(pattern, `$1${translation}$2`);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed "none" translations for all languages');
