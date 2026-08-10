/* one-shot: normalise TOOL #50's paid-plan name against the SHIPPED
   lexicon in frontend/messages/*.json. ⚠ Measured, not assumed — every
   native panel finds this defect independently because a panel cannot
   see the product lexicon, and 28 tools still say "Premium", a plan
   that exists in no locale. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '_number-drum-strings.js');
let s = fs.readFileSync(P, 'utf8');

const FIX = [
  ['Mit einem Lehrkraft-Zugang kommen', 'Mit dem Lehrkraft-Abo kommen'],
  ['Lehrkraft-Zugang ansehen', 'Zum Lehrkraft-Abo'],
  ['L’accès Enseignant ajoute', 'L’abonnement Enseignant ajoute'],
  ['Voir l’accès Enseignant', 'Découvrir l’abonnement Enseignant'],
  ['El acceso Docente añade', 'El plan Docente añade'],
  ['Ver el acceso Docente', 'Conoce el plan Docente'],
  ['O acesso Professor acrescenta', 'O plano Professor acrescenta'],
  ['Ver o acesso Professor', 'Conheça o plano Professor'],
  ['L’accesso Insegnante aggiunge', 'Il piano Insegnante aggiunge'],
  ['Vedi l’accesso Insegnante', 'Scopri il piano Insegnante'],
  ['Met een Leerkracht-toegang komen', 'Met het Leerkracht-abonnement komen'],
  ['Bekijk de Leerkracht-toegang', 'Bekijk het Leerkracht-abonnement'],
  ['Med Lärare får du dessutom', 'Med Lärarabonnemanget får du dessutom'],
  ['Se Lärare\'', 'Se Lärarabonnemanget\''],
  ['Med Lærer får du desuden', 'Med Lærer-abonnementet får du desuden'],
  ['Med Lærer får du i tillegg', 'Med Lærer-abonnementet får du i tillegg'],
  ['Se Lærer\'', 'Se Lærer-abonnementet\''],
  ['Opettaja-tunnus tuo', 'Opettajatilaus tuo'],
  ['Katso Opettaja-tunnus', 'Tutustu Opettajatilaukseen']
];

let n = 0;
FIX.forEach(function (f) {
  if (s.indexOf(f[0]) < 0) { console.log('  MISS: ' + f[0]); return; }
  s = s.split(f[0]).join(f[1]); n++;
});
if (n < FIX.length) throw new Error(n + '/' + FIX.length + ' applied — refusing to write a half-fix');
fs.writeFileSync(P, s);
console.log('normalised ' + n + ' plan-name references to the shipped lexicon');
