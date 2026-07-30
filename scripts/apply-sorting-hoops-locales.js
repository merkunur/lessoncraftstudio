#!/usr/bin/env node
/* =====================================================================
   apply-sorting-hoops-locales.js — the locale pass for Sorting Hoops.

   Injects the ten non-EN locales into `strings` in
   `mini tools/sorting-hoops.js`, one physical line per key, in the house
   order (en de fr it es pt nl sv da no fi).

   ⚠ CURATION: these are BUILDER DRAFTS written IN the locale — never
   machine-translated — and are corrected in place by the per-locale
   native 3-agent ensembles (§A.13.48). sv/da/no/fi carry [NSR-FLAG] per
   §17.5.1. pt is Brazilian per §6.

   ⚠ THE VALUE LABELS ARE CHILD SENTENCES, NOT DICTIONARY GLOSSES. They
   are read aloud to a class of five-year-olds when the teacher reveals
   the rule, so they are phrased the way a teacher says them — "It is
   alive", not "animate" — and the register carries across.

   Idempotent: re-running rewrites the same lines.
   Usage: node scripts/apply-sorting-hoops-locales.js [--write]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const P = path.join(__dirname, '..', 'mini tools', 'sorting-hoops.js');
const WRITE = process.argv.includes('--write');
const LOC = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* key: [de, fr, it, es, pt, nl, sv, da, no, fi] — en stays as authored */
const L = {
  title: ['Sortierreifen', 'Cerceaux de tri', 'Cerchi per classificare', 'Aros para clasificar', 'Arcos de classificação', 'Sorteerhoepels', 'Sorteringsringar', 'Sorteringsringe', 'Sorteringsringer', 'Lajitteluvanteet'],
  instruction: ['Zieht Dinge in die Reifen. Was in beide gehört, kommt in die Schnittmenge.', 'Faites glisser les objets dans les cerceaux. Ce qui appartient aux deux va là où ils se croisent.', 'Trascinate le cose dentro i cerchi. Quello che appartiene a entrambi va dove si sovrappongono.', 'Arrastrad las cosas a los aros. Lo que pertenece a los dos va donde se cruzan.', 'Arrastem as coisas para dentro dos arcos. O que pertence aos dois vai onde eles se cruzam.', 'Sleep dingen in de hoepels. Wat in allebei hoort, gaat waar ze elkaar overlappen.', 'Dra saker in i ringarna. Det som hör hemma i båda hamnar där de överlappar.', 'Træk ting ind i ringene. Det, der hører til i begge, kommer der, hvor de overlapper.', 'Dra ting inn i ringene. Det som hører hjemme i begge, havner der de overlapper.', 'Vedä esineet vanteisiin. Se mikä kuuluu molempiin, tulee kohtaan jossa vanteet menevät päällekkäin.'],
  modeOpen: ['Frei sortieren', 'Tri libre', 'Classifica libera', 'Clasificar libre', 'Classificar livre', 'Vrij sorteren', 'Fri sortering', 'Fri sortering', 'Fri sortering', 'Vapaa lajittelu'],
  modeGuess: ['Errate meine Regel', 'Devine ma règle', 'Indovina la mia regola', 'Adivina mi regla', 'Adivinhe a minha regra', 'Raad mijn regel', 'Gissa min regel', 'Gæt min regel', 'Gjett regelen min', 'Arvaa sääntöni'],
  trayLabel: ['Dinge zum Sortieren', 'Objets à trier', 'Cose da classificare', 'Cosas para clasificar', 'Coisas para classificar', 'Dingen om te sorteren', 'Saker att sortera', 'Ting at sortere', 'Ting å sortere', 'Lajiteltavaa'],
  outsideLabel: ['Außerhalb der Reifen', 'En dehors des cerceaux', 'Fuori dai cerchi', 'Fuera de los aros', 'Fora dos arcos', 'Buiten de hoepels', 'Utanför ringarna', 'Uden for ringene', 'Utenfor ringene', 'Vanteiden ulkopuolella'],
  hoopA: ['Reifen 1', 'Cerceau 1', 'Cerchio 1', 'Aro 1', 'Arco 1', 'Hoepel 1', 'Ring 1', 'Ring 1', 'Ring 1', 'Vanne 1'],
  hoopB: ['Reifen 2', 'Cerceau 2', 'Cerchio 2', 'Aro 2', 'Arco 2', 'Hoepel 2', 'Ring 2', 'Ring 2', 'Ring 2', 'Vanne 2'],
  setRule: ['Regeln festlegen', 'Choisir les règles', 'Scegli le regole', 'Elegir las reglas', 'Escolher as regras', 'Regels instellen', 'Välj reglerna', 'Vælg reglerne', 'Velg reglene', 'Aseta säännöt'],
  hiddenRule: ['Geheim', 'Secrète', 'Segreta', 'Secreta', 'Secreta', 'Geheim', 'Hemlig', 'Hemmelig', 'Hemmelig', 'Salainen'],
  noRule: ['Alles', 'Tout', 'Qualsiasi cosa', 'Cualquier cosa', 'Qualquer coisa', 'Alles', 'Vad som helst', 'Hvad som helst', 'Hva som helst', 'Mikä tahansa'],
  reveal: ['Regeln zeigen', 'Montrer les règles', 'Mostra le regole', 'Mostrar las reglas', 'Mostrar as regras', 'Regels laten zien', 'Visa reglerna', 'Vis reglerne', 'Vis reglene', 'Näytä säännöt'],
  hide: ['Regeln wieder verstecken', 'Cacher les règles', 'Nascondi di nuovo le regole', 'Esconder las reglas otra vez', 'Esconder as regras de novo', 'Regels weer verbergen', 'Dölj reglerna igen', 'Skjul reglerne igen', 'Skjul reglene igjen', 'Piilota säännöt taas'],
  newThings: ['Neue Dinge', 'De nouveaux objets', 'Cose nuove', 'Cosas nuevas', 'Coisas novas', 'Nieuwe dingen', 'Nya saker', 'Nye ting', 'Nye ting', 'Uudet esineet'],
  clearMat: ['Matte leeren', 'Vider le tapis', 'Svuota il tappeto', 'Vaciar la alfombra', 'Esvaziar o tapete', 'Mat leegmaken', 'Töm mattan', 'Tøm måtten', 'Tøm matta', 'Tyhjennä matto'],
  trayBlocks: ['Formen', 'Formes', 'Forme', 'Formas', 'Formas', 'Vormen', 'Former', 'Former', 'Former', 'Muodot'],
  trayPictures: ['Bilder', 'Images', 'Immagini', 'Imágenes', 'Imagens', 'Plaatjes', 'Bilder', 'Billeder', 'Bilder', 'Kuvat'],
  printBtn: ['Matte drucken', 'Imprimer le tapis', 'Stampa il tappeto', 'Imprimir la alfombra', 'Imprimir o tapete', 'Mat afdrukken', 'Skriv ut mattan', 'Udskriv måtten', 'Skriv ut matta', 'Tulosta matto'],
  gatePrint: ['Das Drucken gehört zum Lehrer-Paket.', 'L’impression fait partie de l’offre Enseignant.', 'La stampa fa parte del piano Insegnante.', 'La impresión es parte del plan Docente.', 'A impressão faz parte do plano Professor.', 'Afdrukken hoort bij het Leerkracht-pakket.', 'Utskrift ingår i Lärarpaketet.', 'Udskrivning er en del af Lærerpakken.', 'Utskrift er en del av Lærerpakken.', 'Tulostus kuuluu Opettaja-tilaukseen.'],
  gateRules: ['Die Bildregeln gehören zum Lehrer-Paket.', 'Les règles sur les images font partie de l’offre Enseignant.', 'Le regole sulle immagini fanno parte del piano Insegnante.', 'Las reglas sobre las imágenes son parte del plan Docente.', 'As regras sobre as imagens fazem parte do plano Professor.', 'De regels bij de plaatjes horen bij het Leerkracht-pakket.', 'Bildreglerna ingår i Lärarpaketet.', 'Billedreglerne er en del af Lærerpakken.', 'Bildereglene er en del av Lærerpakken.', 'Kuvasäännöt kuuluvat Opettaja-tilaukseen.'],
  unlock: ['Lehrer-Paket ansehen', 'Voir l’offre Enseignant', 'Vedi il piano Insegnante', 'Ver el plan Docente', 'Ver o plano Professor', 'Bekijk het Leerkracht-pakket', 'Se Lärarpaketet', 'Se Lærerpakken', 'Se Lærerpakken', 'Katso Opettaja-tilaus'],
  privacyLine: ['Hier wird nichts gespeichert, gezählt oder irgendwohin gesendet.', 'Rien ici n’est enregistré, compté ni envoyé où que ce soit.', 'Qui non si salva, non si conta e non si invia nulla.', 'Aquí no se guarda, no se cuenta ni se envía nada.', 'Aqui nada é guardado, contado nem enviado para lugar nenhum.', 'Hier wordt niets bewaard, geteld of ergens naartoe gestuurd.', 'Ingenting här sparas, räknas eller skickas någonstans.', 'Intet her bliver gemt, talt eller sendt nogen steder hen.', 'Ingenting her blir lagret, talt eller sendt noe sted.', 'Täällä ei tallenneta, lasketa eikä lähetetä mitään.'],
  setSpeak: ['Das Wort sagen, wenn ein Bild angetippt wird', 'Dire le mot quand on touche une image', 'Di’ la parola quando si tocca un’immagine', 'Decir la palabra al tocar una imagen', 'Dizer a palavra ao tocar numa imagem', 'Het woord zeggen als je op een plaatje tikt', 'Säg ordet när man trycker på en bild', 'Sig ordet, når man trykker på et billede', 'Si ordet når man trykker på et bilde', 'Sano sana, kun kuvaa napautetaan'],
  setPatterns: ['Muster zusätzlich zu den Farben', 'Ajouter des motifs en plus des couleurs', 'Aggiungi motivi oltre ai colori', 'Añadir tramas además de los colores', 'Adicionar padrões além das cores', 'Patronen naast de kleuren', 'Mönster utöver färgerna', 'Mønstre ud over farverne', 'Mønstre i tillegg til fargene', 'Kuviot värien lisäksi'],
  rColour: ['Es ist {v}', 'C’est {v}', 'È {v}', 'Es {v}', 'É {v}', 'Het is {v}', 'Den är {v}', 'Den er {v}', 'Den er {v}', 'Se on {v}'],
  rShape: ['Es ist ein {v}', 'C’est un {v}', 'È un {v}', 'Es un {v}', 'É um {v}', 'Het is een {v}', 'Det är en {v}', 'Det er en {v}', 'Det er en {v}', 'Se on {v}'],
  rSize: ['Es ist {v}', 'C’est {v}', 'È {v}', 'Es {v}', 'É {v}', 'Het is {v}', 'Den är {v}', 'Den er {v}', 'Den er {v}', 'Se on {v}'],
  rTheme: ['Es gehört zu {v}', 'Ça fait partie de {v}', 'Fa parte di {v}', 'Es de {v}', 'É de {v}', 'Het hoort bij {v}', 'Det hör till {v}', 'Det hører til {v}', 'Det hører til {v}', 'Se kuuluu ryhmään {v}'],
  rLiving: ['{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}'],
  rNatural: ['{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}'],
  rEdible: ['{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}'],
  rMoves: ['{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}'],
  rSizeBand: ['{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}'],
  rHabitat: ['{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}', '{v}'],
  /* ⚠ "beats" = the clap, not the letter. de Silben / fr syllabes / fi tavua
     (partitive singular after a numeral — "2 tavua", never "2 tavut"). */
  rSyll: ['Das Wort hat {v} Silben', 'Le mot a {v} syllabes', 'La parola ha {v} sillabe', 'La palabra tiene {v} sílabas', 'A palavra tem {v} sílabas', 'Het woord heeft {v} klankgroepen', 'Ordet har {v} stavelser', 'Ordet har {v} stavelser', 'Ordet har {v} stavelser', 'Sanassa on {v} tavua'],
  rInitial: ['Das Wort fängt mit {v} an', 'Le mot commence par {v}', 'La parola comincia con {v}', 'La palabra empieza por {v}', 'A palavra começa com {v}', 'Het woord begint met {v}', 'Ordet börjar på {v}', 'Ordet begynder med {v}', 'Ordet begynner med {v}', 'Sana alkaa kirjaimella {v}'],
  vRed: ['rot', 'rouge', 'rosso', 'rojo', 'vermelho', 'rood', 'röd', 'rød', 'rød', 'punainen'],
  vBlue: ['blau', 'bleu', 'blu', 'azul', 'azul', 'blauw', 'blå', 'blå', 'blå', 'sininen'],
  vYellow: ['gelb', 'jaune', 'giallo', 'amarillo', 'amarelo', 'geel', 'gul', 'gul', 'gul', 'keltainen'],
  vGreen: ['grün', 'vert', 'verde', 'verde', 'verde', 'groen', 'grön', 'grøn', 'grønn', 'vihreä'],
  vCircle: ['Kreis', 'cercle', 'cerchio', 'círculo', 'círculo', 'cirkel', 'cirkel', 'cirkel', 'sirkel', 'ympyrä'],
  vSquare: ['Quadrat', 'carré', 'quadrato', 'cuadrado', 'quadrado', 'vierkant', 'kvadrat', 'kvadrat', 'kvadrat', 'neliö'],
  vTriangle: ['Dreieck', 'triangle', 'triangolo', 'triángulo', 'triângulo', 'driehoek', 'triangel', 'trekant', 'trekant', 'kolmio'],
  vHexagon: ['Sechseck', 'hexagone', 'esagono', 'hexágono', 'hexágono', 'zeshoek', 'sexhörning', 'sekskant', 'sekskant', 'kuusikulmio'],
  vBig: ['groß', 'grand', 'grande', 'grande', 'grande', 'groot', 'stor', 'stor', 'stor', 'iso'],
  vSmall: ['klein', 'petit', 'piccolo', 'pequeño', 'pequeno', 'klein', 'liten', 'lille', 'liten', 'pieni'],
  vLiving: ['Es lebt', 'C’est vivant', 'È vivo', 'Está vivo', 'Está vivo', 'Het leeft', 'Den lever', 'Den lever', 'Den lever', 'Se elää'],
  vOnceLiving: ['Es hat einmal gelebt', 'C’était vivant autrefois', 'Una volta era vivo', 'Estuvo vivo alguna vez', 'Já esteve vivo', 'Het heeft ooit geleefd', 'Den har levt en gång', 'Den har levet engang', 'Den har levd en gang', 'Se on joskus elänyt'],
  vNeverLiving: ['Es hat nie gelebt', 'Ça n’a jamais été vivant', 'Non è mai stato vivo', 'Nunca estuvo vivo', 'Nunca esteve vivo', 'Het heeft nooit geleefd', 'Den har aldrig levt', 'Den har aldrig levet', 'Den har aldri levd', 'Se ei ole koskaan elänyt'],
  vNatural: ['Niemand hat es gemacht', 'Personne ne l’a fabriqué', 'Non l’ha fatto nessuno', 'Nadie lo ha hecho', 'Ninguém o fez', 'Niemand heeft het gemaakt', 'Ingen har gjort den', 'Ingen har lavet den', 'Ingen har laget den', 'Kukaan ei ole tehnyt sitä'],
  vMade: ['Menschen haben es gemacht', 'Ce sont les gens qui l’ont fabriqué', 'L’hanno fatto le persone', 'Lo han hecho las personas', 'As pessoas é que o fizeram', 'Mensen hebben het gemaakt', 'Människor har gjort den', 'Mennesker har lavet den', 'Mennesker har laget den', 'Ihmiset ovat tehneet sen'],
  vEdible: ['Man kann es essen', 'On peut le manger', 'Si può mangiare', 'Se puede comer', 'Dá para comer', 'Je kunt het opeten', 'Man kan äta den', 'Man kan spise den', 'Man kan spise den', 'Sen voi syödä'],
  vNotEdible: ['Man isst es nicht', 'On ne le mange pas', 'Non si mangia', 'No se come', 'Não se come', 'Je eet het niet op', 'Man äter inte den', 'Man spiser den ikke', 'Man spiser den ikke', 'Sitä ei syödä'],
  vSelf: ['Es bewegt sich von allein', 'Ça bouge tout seul', 'Si muove da solo', 'Se mueve solo', 'Move-se sozinho', 'Het beweegt uit zichzelf', 'Den rör sig själv', 'Den bevæger sig selv', 'Den beveger seg selv', 'Se liikkuu itsestään'],
  vMoved: ['Etwas anderes bewegt es', 'C’est autre chose qui le fait bouger', 'Lo muove qualcos’altro', 'Lo mueve otra cosa', 'Outra coisa é que o move', 'Iets anders beweegt het', 'Något annat flyttar den', 'Noget andet flytter den', 'Noe annet flytter den', 'Jokin muu liikuttaa sitä'],
  vStill: ['Es bleibt, wo es ist', 'Ça reste où c’est', 'Sta dov’è', 'Se queda donde está', 'Fica onde está', 'Het blijft waar het is', 'Den står kvar där den är', 'Den bliver, hvor den er', 'Den blir der den er', 'Se pysyy paikallaan'],
  vHand: ['Es passt in deine Hand', 'Ça tient dans ta main', 'Sta nella tua mano', 'Cabe en tu mano', 'Cabe na tua mão', 'Het past in je hand', 'Den får plats i din hand', 'Den kan være i din hånd', 'Den får plass i hånda di', 'Se mahtuu kämmenelle'],
  vPerson: ['Es ist ungefähr so groß wie du', 'C’est à peu près grand comme toi', 'È grande più o meno come te', 'Es más o menos así de grande como tú', 'É mais ou menos do teu tamanho', 'Het is ongeveer even groot als jij', 'Den är ungefär lika stor som du', 'Den er cirka lige så stor som dig', 'Den er omtrent så stor som deg', 'Se on suunnilleen sinun kokoisesi'],
  vBigger: ['Es ist größer als ein Erwachsener', 'C’est plus grand qu’un adulte', 'È più grande di un adulto', 'Es más grande que una persona mayor', 'É maior do que um adulto', 'Het is groter dan een volwassene', 'Den är större än en vuxen', 'Den er større end en voksen', 'Den er større enn en voksen', 'Se on isompi kuin aikuinen'],
  vLand: ['Es lebt an Land', 'Ça vit sur la terre', 'Vive sulla terra', 'Vive en la tierra', 'Vive em terra', 'Het leeft op het land', 'Den lever på land', 'Den lever på land', 'Den lever på land', 'Se elää maalla'],
  vWater: ['Es lebt im Wasser', 'Ça vit dans l’eau', 'Vive nell’acqua', 'Vive en el agua', 'Vive na água', 'Het leeft in het water', 'Den lever i vatten', 'Den lever i vand', 'Den lever i vann', 'Se elää vedessä'],
  vAir: ['Es fliegt in der Luft', 'Ça vole dans les airs', 'Vola nell’aria', 'Vuela por el aire', 'Voa pelo ar', 'Het vliegt door de lucht', 'Den flyger i luften', 'Den flyver i luften', 'Den flyr i lufta', 'Se lentää ilmassa']
};

let src = fs.readFileSync(P, 'utf8');
let done = 0;
const missing = [];

Object.keys(L).forEach((key) => {
  const re = new RegExp('^(\\s*' + key + ':\\s*)\\{ en: (\'(?:[^\'\\\\]|\\\\.)*\') \\},?$', 'm');
  const m = re.exec(src);
  if (!m) { missing.push(key); return; }
  const vals = L[key];
  if (vals.length !== 10) { missing.push(key + ' (expected 10 locales, got ' + vals.length + ')'); return; }
  const parts = ['en: ' + m[2]];
  LOC.slice(1).forEach((loc, i) => {
    const v = vals[i];
    if (/'/.test(v)) { missing.push(key + '.' + loc + ' contains a straight apostrophe'); return; }
    parts.push(loc + ": '" + v + "'");
  });
  src = src.replace(re, m[1] + '{ ' + parts.join(', ') + ' },');
  done++;
});

/* every key that is still en-only after the pass */
const enOnly = (src.match(/^\s*([a-zA-Z]+):\s*\{ en: '(?:[^'\\]|\\.)*' \},?$/gm) || [])
  .map((s) => s.trim().split(':')[0]);

if (missing.length) { console.error('HALT:\n  ' + missing.join('\n  ')); process.exit(1); }
console.log(`${done} keys localised into ${LOC.length} locales`);
if (enOnly.length) { console.error('HALT — still en-only: ' + enOnly.join(', ')); process.exit(1); }
if (!WRITE) { console.log('(dry run — pass --write)'); process.exit(0); }
fs.writeFileSync(P, src, 'utf8');
console.log('written');
