// Apply the 11 native panels' static-string fixes to both apps + translations.
'use strict';
const fs = require('fs');
const APPS = 'C:/Users/rkgen/lessoncraftstudio/REFERENCE APPS/';
const TRANS = 'C:/Users/rkgen/lessoncraftstudio/REFERENCE TRANSLATIONS/';
let problems = 0;
function mustReplace(src, from, to, label) {
  if (!src.includes(from)) { console.error('NOT FOUND: ' + label + ' :: ' + from.slice(0, 60)); problems++; return src; }
  return src.split(from).join(to);
}

function editStringsAll(src, file, mods) {
  const m = src.match(/'  var STRINGS_ALL = (\{.*?\});',/);
  if (!m) { console.error('STRINGS_ALL not found in ' + file); problems++; return src; }
  const obj = JSON.parse(m[1].replace(/\\'/g, "'"));
  for (const [loc, kv] of Object.entries(mods)) {
    for (const [k, v] of Object.entries(kv)) {
      if (!(k in obj[loc])) { console.error(`missing key ${loc}.${k} in ${file}`); problems++; continue; }
      obj[loc][k] = v;
    }
  }
  const escaped = JSON.stringify(obj).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return src.replace(m[0], "'  var STRINGS_ALL = " + escaped + ";',");
}

// ---------------- find-and-count.html ----------------
let fac = fs.readFileSync(APPS + 'find-and-count.html', 'utf8');
fac = editStringsAll(fac, 'find-and-count', {
  fr: { title: 'Trouve et compte', score: '{n} bonnes réponses sur {total}', correct: 'correctes' },
  it: { check: 'Controlla le risposte', mute: 'Silenzia i suoni', unmute: 'Attiva i suoni',
        youDidIt: "Ce l'hai fatta!", score: '{n} su {total} corrette', correct: 'corrette' },
  pt: { score: '{n} de {total} corretas', correct: 'corretas' },
  nl: { allCorrect: 'Allemaal goed!' },
  fi: { title: 'Etsi ja laske', printMyWorksheet: 'Tulosta tehtäväsivuni', unmute: 'Laita äänet päälle' },
  da: { doAnother: 'Lav et til' },
  es: { title: 'Encuentra y cuenta' },
  no: { title: 'Finn og tell' }
});
// headers
fac = mustReplace(fac, "es: { title: 'Veo Veo', description:", "es: { title: 'Veo, veo', description:", 'fac es header title');
fac = mustReplace(fac, "Compte les objets et \\u00e9cris le nombre!", "Compte les objets et \\u00e9cris le nombre !", 'fac fr header desc');
fac = mustReplace(fac, "Conta os objetos e escreve o n\\u00famero!", "Conte os objetos e escreva o n\\u00famero!", 'fac pt header desc');
fac = mustReplace(fac, "R\\u00e4kna objekten och skriv numret!", "R\\u00e4kna f\\u00f6rem\\u00e5len och skriv antalet!", 'fac sv header desc');
fac = mustReplace(fac, "Tel de objecten en schrijf het getal!", "Tel de voorwerpen en schrijf het getal!", 'fac nl header desc');
fac = mustReplace(fac, "T\\u00e6l objekterne og skriv tallet!", "T\\u00e6l tingene og skriv tallet!", 'fac da header desc');
fac = mustReplace(fac, "Tell objektene og skriv tallet!", "Tell gjenstandene og skriv tallet!", 'fac no header desc');
// letter-spotting pt (tu → você)
fac = mustReplace(fac, "pt: 'Encontra todas as imagens que come\\u00e7am com a letra {letter}.'", "pt: 'Encontre todas as imagens que come\\u00e7am com a letra {letter}.'", 'fac pt letter tpl');
// generic fallback fixes
fac = mustReplace(fac, "Trouve les objets cach\\u00e9s dans l'image ci-dessous:", "Trouve les objets cach\\u00e9s dans l'image ci-dessous :", 'fac fr fallback');
fac = mustReplace(fac, "Vind de verborgen objecten in de afbeelding hieronder:", "Zoek de verborgen voorwerpen in de afbeelding hieronder:", 'fac nl fallback');
fac = mustReplace(fac, "Find de skjulte objekter i billedet nedenfor:", "Find de skjulte ting i billedet nedenfor:", 'fac da fallback');
fac = mustReplace(fac, "Finn de skjulte objektene i bildet nedenfor:", "Finn de skjulte gjenstandene i bildet nedenfor:", 'fac no fallback');
fs.writeFileSync(APPS + 'find-and-count.html', fac, 'utf8');

// ---------------- prepositions.html ----------------
let prep = fs.readFileSync(APPS + 'prepositions.html', 'utf8');
prep = editStringsAll(prep, 'prepositions', {
  en: { title: 'Preposition Practice' },
  de: { title: 'Präpositionsübung' },
  fi: { title: 'Sijaintisanaharjoitus', printMyWorksheet: 'Tulosta tehtäväsivuni', unmute: 'Laita äänet päälle' },
  es: { title: 'Práctica de preposiciones' },
  pt: { title: 'Prática de preposições', score: '{n} de {total} corretas', correct: 'corretas' },
  da: { title: 'Øvelse med forholdsord', doAnother: 'Lav et til' },
  it: { checkAnswers: 'Controlla le risposte', mute: 'Silenzia i suoni', unmute: 'Attiva i suoni',
        youDidIt: "Ce l'hai fatta!", score: '{n} su {total} corrette', correct: 'corrette' },
  fr: { score: '{n} bonnes réponses sur {total}', correct: 'correctes' },
  nl: { allCorrect: 'Allemaal goed!' }
});
// headers (raw UTF-8 in this file, not \uXXXX escapes)
prep = mustReplace(prep, "descriptionMultipleChoice: 'Cirkel de afbeelding die het juiste voorzetsel laat zien!'", "descriptionMultipleChoice: 'Omcirkel de afbeelding die het juiste voorzetsel laat zien!'", 'prep nl MC');
prep = mustReplace(prep, "descriptionMultipleChoice: '¡Encierra en un círculo la imagen que muestra la preposición correcta!'", "descriptionMultipleChoice: '¡Rodea la imagen que muestra la preposición correcta!'", 'prep es MC');
prep = mustReplace(prep, "title: 'Præpositioner',\n                    description: 'Fuldfør hver sætning med den rigtige præposition!',\n                    descriptionMultipleChoice: 'Sæt ring om billedet, der viser den rigtige præposition!'", "title: 'Forholdsord',\n                    description: 'Fuldfør hver sætning med det rigtige forholdsord!',\n                    descriptionMultipleChoice: 'Sæt ring om billedet, der viser det rigtige forholdsord!'", 'prep da header');
fs.writeFileSync(APPS + 'prepositions.html', prep, 'utf8');

// ---------------- translations-prepositions.js ----------------
let tp = fs.readFileSync(TRANS + 'translations-prepositions.js', 'utf8');
const runtimeTitleFixes = [
  ['"runtimeTitle": "Prepositions Practice"', '"runtimeTitle": "Preposition Practice"', 'tp en runtimeTitle'],
  ['"runtimeTitle": "Präpositionen-Übung"', '"runtimeTitle": "Präpositionsübung"', 'tp de runtimeTitle'],
  ['"runtimeTitle": "Prepositioharjoitus"', '"runtimeTitle": "Sijaintisanaharjoitus"', 'tp fi runtimeTitle'],
  ['"runtimeTitle": "Práctica de Preposiciones"', '"runtimeTitle": "Práctica de preposiciones"', 'tp es runtimeTitle'],
  ['"runtimeTitle": "Prática de Preposições"', '"runtimeTitle": "Prática de preposições"', 'tp pt runtimeTitle'],
  ['"runtimeTitle": "Præpositionsøvelse"', '"runtimeTitle": "Øvelse med forholdsord"', 'tp da runtimeTitle']
];
for (const [f, t, l] of runtimeTitleFixes) tp = mustReplace(tp, f, t, l);
// vocab-filter warning refinements
tp = mustReplace(tp, 'Some images cannot be used as landmarks in this language and were replaced with basic shapes.', 'Some images cannot be used as landmarks in this language and have been replaced with basic shapes.', 'tp en warning');
tp = mustReplace(tp, 'Nogle billeder kan ikke bruges som reference på dette sprog og er blevet erstattet med grundformer.', 'Nogle billeder kan ikke bruges som reference på dette sprog og er blevet erstattet med enkle figurer.', 'tp da warning');
tp = mustReplace(tp, 'Noen bilder kan ikke brukes som referanse på dette språket og er byttet ut med grunnformer.', 'Noen bilder kan ikke brukes som referanse på dette språket og er byttet ut med enkle figurer.', 'tp no warning');
tp = mustReplace(tp, 'Joitakin kuvia ei voi käyttää kiintopisteenä tällä kielellä, ja ne on korvattu perusmuodoilla.', 'Joitakin kuvia ei voi käyttää kiintopisteenä tällä kielellä, ja ne on korvattu peruskuvioilla.', 'tp fi warning');
fs.writeFileSync(TRANS + 'translations-prepositions.js', tp, 'utf8');

// ---------------- translations-find-and-count-complete.js ----------------
let tf = fs.readFileSync(TRANS + 'translations-find-and-count-complete.js', 'utf8');
const facTitleFixes = [
  ['"runtimeTitle": "Trouve et Compte"', '"runtimeTitle": "Trouve et compte"', 'tf fr runtimeTitle'],
  ['"runtimeTitle": "Encuentra y Cuenta"', '"runtimeTitle": "Encuentra y cuenta"', 'tf es runtimeTitle'],
  ['"runtimeTitle": "Etsi ja Laske"', '"runtimeTitle": "Etsi ja laske"', 'tf fi runtimeTitle'],
  ['"runtimeTitle": "Finn og Tell"', '"runtimeTitle": "Finn og tell"', 'tf no runtimeTitle']
];
for (const [f, t, l] of facTitleFixes) tf = mustReplace(tf, f, t, l);
fs.writeFileSync(TRANS + 'translations-find-and-count-complete.js', tf, 'utf8');

console.log(problems ? `DONE WITH ${problems} PROBLEMS` : 'ALL FIXES APPLIED CLEANLY');
process.exit(problems ? 1 : 0);
