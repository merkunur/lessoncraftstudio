#!/usr/bin/env node
/**
 * Writes the page text of K-644 Name the Solid Shapes (Year pages AA, 2026-11-14) into i18n/strings.<loc>.json (title and
 * the instruction of levels 1 and 2) and i18n/level-instructions.json (level 3: two shapes on the page are none of the
 * four solids and stay white). Re-running it writes the same text again; a changed text replaces the old one.
 *
 *   node tools/level-set/apply-solids-k-strings.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', '..', 'i18n');
const ID = 'K-644';
const T = {
  en: ['Name the Solid Shapes', 'Draw a line from each solid to the thing with the same shape. Then color each solid by the color code and say its name.', 'Draw a line from each solid to the thing with the same shape. Then color each solid by the color code and say its name. Leave the shapes that are not in the code white.'],
  de: ['Geometrische Körper erkennen', 'Verbinde jeden Körper mit dem Gegenstand, der die gleiche Form hat. Male dann jeden Körper nach dem Farbcode an und sag seinen Namen.', 'Verbinde jeden Körper mit dem Gegenstand, der die gleiche Form hat. Male dann jeden Körper nach dem Farbcode an und sag seinen Namen. Körper, die nicht im Farbcode sind, bleiben weiß.'],
  es: ['Nombra los cuerpos geométricos', 'Une cada cuerpo con el objeto que tiene la misma forma. Después colorea cada cuerpo según la clave y di su nombre.', 'Une cada cuerpo con el objeto que tiene la misma forma. Después colorea cada cuerpo según la clave y di su nombre. Deja en blanco los cuerpos que no están en la clave.'],
  pt: ['Nomeie os sólidos geométricos', 'Ligue cada sólido ao objeto que tem a mesma forma. Depois pinte cada sólido de acordo com a legenda e diga o nome dele.', 'Ligue cada sólido ao objeto que tem a mesma forma. Depois pinte cada sólido de acordo com a legenda e diga o nome dele. Deixe em branco os sólidos que não estão na legenda.'],
  fr: ['Reconnaître les solides', 'Relie chaque solide à l’objet qui a la même forme. Puis colorie chaque solide selon le code et dis son nom.', 'Relie chaque solide à l’objet qui a la même forme. Puis colorie chaque solide selon le code et dis son nom. Laisse en blanc les formes qui ne sont pas dans le code.'],
  it: ['Riconosci i solidi', 'Collega ogni solido all’oggetto che ha la stessa forma. Poi colora ogni solido secondo la legenda e di’ il suo nome.', 'Collega ogni solido all’oggetto che ha la stessa forma. Poi colora ogni solido secondo la legenda e di’ il suo nome. Lascia in bianco le forme che non sono nella legenda.'],
  nl: ['Ruimtelijke figuren benoemen', 'Verbind elke figuur met het voorwerp dat dezelfde vorm heeft. Kleur dan elke figuur volgens de kleurcode en zeg hoe hij heet.', 'Verbind elke figuur met het voorwerp dat dezelfde vorm heeft. Kleur dan elke figuur volgens de kleurcode en zeg hoe hij heet. Laat de figuren die niet in de kleurcode staan wit.'],
  sv: ['Geometriska kroppar', 'Dra ett streck från varje kropp till saken med samma form. Färglägg sedan kropparna efter färgkoden och säg vad de heter.', 'Dra ett streck från varje kropp till saken med samma form. Färglägg sedan kropparna efter färgkoden och säg vad de heter. Låt formerna som inte finns i färgkoden vara vita.'],
  da: ['Rumlige figurer', 'Tegn en streg fra hver figur til tingen med samme form. Farvelæg så figurerne efter farvekoden, og sig, hvad de hedder.', 'Tegn en streg fra hver figur til tingen med samme form. Farvelæg så figurerne efter farvekoden, og sig, hvad de hedder. Lad de former, der ikke er i farvekoden, være hvide.'],
  no: ['Romfigurer', 'Trekk en strek fra hver figur til tingen med samme form. Fargelegg så figurene etter fargekoden, og si hva de heter.', 'Trekk en strek fra hver figur til tingen med samme form. Fargelegg så figurene etter fargekoden, og si hva de heter. La formene som ikke er i fargekoden, være hvite.'],
  fi: ['Kappaleiden nimet', 'Yhdistä jokainen kappale esineeseen, jolla on sama muoto. Väritä sitten kappaleet värikoodin mukaan ja sano niiden nimet.', 'Yhdistä jokainen kappale esineeseen, jolla on sama muoto. Väritä sitten kappaleet värikoodin mukaan ja sano niiden nimet. Jätä valkoisiksi muodot, joita ei ole värikoodissa.'],
};
/** writes JSON keeping the file's indent and line ends */
function save(file, raw, obj) {
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, '  '])[1];
  let out = JSON.stringify(obj, null, indent);
  if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
}
for (const [loc, [title, instruction]] of Object.entries(T)) {
  const f = path.join(I18N, 'strings.' + loc + '.json'), raw = fs.readFileSync(f, 'utf8'), j = JSON.parse(raw);
  j[ID] = { title, instruction };
  save(f, raw, j);
}
{
  const f = path.join(I18N, 'level-instructions.json'), raw = fs.readFileSync(f, 'utf8'), j = JSON.parse(raw);
  j[ID] = { 3: Object.fromEntries(Object.entries(T).map(([loc, t]) => [loc, t[2]])) };
  save(f, raw, j);
}
console.log(ID + ': title and instructions written in ' + Object.keys(T).length + ' languages');
