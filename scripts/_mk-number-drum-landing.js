/* Builds TOOL #50's eleven ToolEntry landing records AND its hub card.
   ⚠ The prose for each non-English locale is DERIVED FROM THAT LOCALE'S
   OWN AUTHORED STRINGS — its instruction, its refusals, its sheet copy —
   so no locale carries English prose and none is machine-translated.
   ⚠ Each slug is folded to its OWN locale's rule: da folds ø→oe and å→aa,
   no folds ø→o, so the two can never collide.                          */
'use strict';
const fs = require('fs');
const path = require('path');
const T = require(path.join(__dirname, '..', 'mini tools', 'number-drum.js'));
const S = T.strings;
const LOC = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const s = (k, l) => S[k][l] || S[k].en;

const HEAD = {
  en: { slug: 'number-drum-ones-and-tens-rolling-to-100',
    tagline: 'Two rings of numerals — and the only place on this site where the 0 is drawn directly under the 9.',
    metaTitle: 'The Number Drum — crossing the tens, K to Grade 2',
    metaDescription: 'Free whiteboard tool: turn the ones ring past its 9 and a tooth catches the tens ring and drags it round. Stop it half way and ask whether it says 29 or 30.' },
  de: { slug: 'zahlenring-zehner-und-einer-bis-100-grundschule',
    tagline: 'Unter der 9 steht die 0 — deshalb kommt nach neununddreißig nicht „dreißigzehn“.',
    metaTitle: 'Der Zahlenring: Zehnerübergang bis 100 und bis 999',
    metaDescription: 'Dreh den Einerring über die 9 hinaus, und ein Zahn nimmt den Zehnerring mit. Halte mittendrin an und frag die Klasse, ob da 29 oder 30 steht. Klasse 1 und 2.' },
  fr: { slug: 'anneau-des-nombres-passage-a-la-dizaine-cp',
    tagline: 'Sur un anneau, le 0 est dessiné juste sous le 9 — et c’est toute la différence avec une bande qui s’arrête.',
    metaTitle: 'L’anneau des nombres — le passage à la dizaine, CP',
    metaDescription: 'Fais tourner l’anneau des unités au-delà du 9 : une dent accroche l’anneau des dizaines et l’entraîne. Arrête-toi à mi-chemin et demande si c’est 29 ou 30.' },
  es: { slug: 'anillo-de-los-numeros-decenas-y-unidades-primaria',
    tagline: 'En un anillo el 0 está dibujado justo debajo del 9, y por eso después del treinta y nueve no viene «treinta y diez».',
    metaTitle: 'El anillo de los números: pasar de decena, Primaria',
    metaDescription: 'Gira el anillo de las unidades más allá del 9 y un diente engancha el de las decenas. Párate a medio camino y pregunta si pone 29 o 30.' },
  pt: { slug: 'anel-dos-numeros-dezenas-e-unidades-anos-iniciais',
    tagline: 'No anel o 0 fica desenhado logo abaixo do 9 — é isso que falta numa fila que termina.',
    metaTitle: 'O anel dos números: mudar de dezena, anos iniciais',
    metaDescription: 'Gire o anel das unidades para além do 9 e um dente engata no anel das dezenas. Pare no meio do caminho e pergunte se está 29 ou 30.' },
  it: { slug: 'anello-dei-numeri-cambio-decina-scuola-primaria',
    tagline: 'Sull’anello lo 0 è disegnato proprio sotto il 9, e dopo trentanove non può venire «trentadieci».',
    metaTitle: 'L’anello dei numeri: il cambio di decina, primaria',
    metaDescription: 'Gira l’anello delle unità oltre il 9 e un dente aggancia quello delle decine. Fermati a metà e chiedi se c’è scritto 29 o 30.' },
  nl: { slug: 'getallenring-tientallen-en-eenheden-groep-3',
    tagline: 'Op een ring staat de 0 recht onder de 9 — dat is precies wat een rij die ophoudt niet laat zien.',
    metaTitle: 'De getallenring: over het tiental heen, groep 3 en 4',
    metaDescription: 'Draai de ring van de eenheden voorbij de 9 en een tand pakt de ring van de tientallen mee. Stop halverwege en vraag of er 29 of 30 staat.' },
  sv: { slug: 'talringen-tiotalsovergang-lagstadiet',
    tagline: 'På en ring står 0 rakt under 9 — det syns aldrig på en rad som tar slut.',
    metaTitle: 'Talringen: över tiotalet, lågstadiet',
    metaDescription: 'Vrid entalsringen förbi sin 9 så hakar en tand i tiotalsringen och drar med den. Stanna halvvägs och fråga om det står 29 eller 30.' },
  da: { slug: 'talringen-tiereovergang-indskoling',
    tagline: 'På en ring står 0 lige under 9 — det kan en række der stopper aldrig vise.',
    metaTitle: 'Talringen: over tieren, indskolingen',
    metaDescription: 'Drej enerringen forbi sit 9-tal, så griber en tand fat i tierringen og trækker den med. Stop halvvejs og spørg, om der står 29 eller 30.' },
  no: { slug: 'tallringen-tierovergang-smatrinnet',
    tagline: 'På en ring står 0 rett under 9 — det viser aldri en rekke som tar slutt.',
    metaTitle: 'Tallringen: over tieren, småtrinnet',
    metaDescription: 'Vri enerringen forbi 9-tallet, så griper en tann tak i tierringen og drar den med. Stopp halvveis og spør om det står 29 eller 30.' },
  fi: { slug: 'lukurengas-kymmenylitys-alkuopetus',
    tagline: 'Renkaassa 0 on piirretty suoraan 9:n alle — sitä ei näy rivissä, joka loppuu.',
    metaTitle: 'Lukurengas: kymmenylitys, alkuopetus',
    metaDescription: 'Pyöritä ykkösrengasta yli sen yhdeksän, niin hammas tarttuu kymmenrenkaaseen ja vetää sen mukanaan. Pysähdy puoliväliin ja kysy, lukeeko siinä 29 vai 30.' }
};

const EN_ABOUT = [
  'Two rings of numerals stand side by side in a frame, and the frame shows three numerals of each: the one above, the one at the window, and the one below. That is the whole idea. On a ring the 0 sits directly under the 9, so a child can see at rest — without turning anything — that the ones come back round.',
  'Turn the ones ring past its 9 and a tooth on that ring catches the ring beside it and drags it round too. Nothing is corrected, because nothing wrong can be reached: the rings are worked out from one position, so a ring that says 9 next to a ring that says 3 in a 29 is not a state this apparatus can be put into.',
  'There is no readout anywhere. The rings are the number. In slow turning the crank moves half a notch, which parks the apparatus mid-catch — twenty-nine hanging on the edge of thirty — and there the question of what it says is genuinely open, which is what the class argues about. Nothing is scored, nothing is timed, and nothing is ever marked right or wrong.'
];
const EN_HOW = [
  'Show it at rest and read the three numerals of the ones ring together. Ask what is underneath the 9, before anything moves.',
  'Turn forward one at a time up to 9, then once more, and let the class watch the tooth reach the bar before either ring moves.',
  'Switch to slow turning and stop on the catch. Ask the class to commit: is that 29 or 30? Then finish the turn.',
  'Turn the tens ring on its own and ask why the ones ring did not move at all.'
];
const EN_IDEAS = [
  'A two-minute routine: park it on any number and ask how many more turns before the tens ring has to move. The answer is what is left to the next ten.',
  'Run it backwards from 40 and ask what the ones ring does at 40 to 39 — it goes the other way round, and the tens ring surrenders with it.',
  'Take it up to 99 and turn once. Two teeth catch, one after the other, and three rings move on one turn.'
];

const out = {};
LOC.forEach(function (l) {
  const h = HEAD[l];
  out[l] = Object.assign({ name: s('title', l) }, h, l === 'en'
    ? { about: EN_ABOUT, howToUse: EN_HOW, classroomIdeas: EN_IDEAS }
    : {
      about: [s('instruction', l), s('ariaFrame', l), s('gateBody', l)],
      howToUse: [s('fwd', l) + '. ' + s('fwdHalf', l) + '.', s('slow', l) + '. ' + s('saidBetween', l).replace('{a}', '29').replace('{b}', '30') + '?', s('up10', l) + '.'],
      classroomIdeas: [s('saidTopEnd', l).replace('{n}', '99'), s('saidCarry', l).replace('{n}', '40'), s('sheetNote', l)]
    });
});

fs.writeFileSync(path.join(__dirname, '_number-drum-landing.js'),
  "/* TOOL #50's eleven ToolEntry landing records — GENERATED by\n" +
  "   _mk-number-drum-landing.js from each locale's OWN authored strings.\n" +
  "   ⚠ EIGHT REQUIRED FIELDS: slug name tagline about[] howToUse[]\n" +
  "   classroomIdeas[] metaTitle metaDescription. #42 shipped five and\n" +
  "   failed the static export of all eleven landings AFTER two guards\n" +
  "   had reported success. */\n" +
  "'use strict';\nmodule.exports = " + JSON.stringify(out, null, 2) + ";\n");

/* the hub card, in the shape `lib/manipulatives.ts` already uses */
const per = (k) => LOC.map(l => '      ' + l + ': ' + JSON.stringify(k(l)) + ',').join('\n');
const card = '  {\n    id: "number-drum",\n' +
  '    mini_tool_url: "/mini-tools/number-drum.html",\n' +
  '    title: {\n' + per(l => s('title', l)) + '\n    },\n' +
  '    tagline: {\n' + per(l => HEAD[l].tagline) + '\n    },\n' +
  '    description: {\n' + per(l => out[l].about.join(' ')) + '\n    },\n  },\n';
fs.writeFileSync(path.join(__dirname, '_number-drum-card.txt'), card);
console.log('11 landing records + the hub card written');
