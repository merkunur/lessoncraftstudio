/* one-shot: write TOOL #54's landing HEAD + English prose into the
   generator, and rewire the per-locale derivations onto this tool's own
   keys. Written to a file rather than piped through a heredoc — an
   apostrophe in the prose kept terminating the shell string. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '_mk-doubling-mirror-landing.js');
let s = fs.readFileSync(P, 'utf8');

const HEAD = {
  en: ['doubling-mirror-doubles-and-halves-with-counters',
    'Close the hinge and the far leaf gets the same number of REAL counters — you can touch every one of them.',
    'The Doubling Mirror — doubles and halves, Grade 1 and 2',
    'Free whiteboard tool: say what the double will be, then close the tray and count. Nine opens into five and four, because the odd one has to go somewhere.'],
  de: ['verdoppeln-und-halbieren-mit-plaettchen-grundschule',
    'Klappe zu — und auf der anderen Seite liegen genauso viele ECHTE Plättchen, die man alle anfassen kann.',
    'Verdoppeln und Halbieren mit Plättchen, Klasse 1 und 2',
    'Sagt zuerst, was das Doppelte ist, und klappt dann zu. Neun teilt sich in fünf und vier, denn das eine muss irgendwohin.'],
  fr: ['doubles-et-moities-avec-des-jetons-cp-ce1',
    'Referme la charnière et l’autre volet reçoit autant de VRAIS jetons — on peut les toucher tous.',
    'Doubles et moitiés avec des jetons, CP-CE1',
    'Dites d’abord quel sera le double, puis refermez le plateau et comptez. Neuf s’ouvre en cinq et quatre, parce que celui qui reste doit aller quelque part.'],
  es: ['dobles-y-mitades-con-fichas-primaria',
    'Cierra la bisagra y la otra hoja recibe la misma cantidad de fichas DE VERDAD, y se pueden tocar todas.',
    'Dobles y mitades con fichas, Primaria',
    'Decid primero cuál será el doble y luego cerrad la bandeja y contad. Nueve se abre en cinco y cuatro, porque la que sobra tiene que ir a algún sitio.'],
  pt: ['dobro-e-metade-com-fichas-anos-iniciais',
    'Feche a dobradiça e a outra aba recebe a mesma quantidade de fichas DE VERDADE — dá para tocar em todas.',
    'Dobro e metade com fichas, anos iniciais',
    'Digam primeiro qual vai ser o dobro e depois fechem a bandeja e contem. Nove abre em cinco e quatro, porque a que sobra precisa ir para algum lado.'],
  it: ['doppio-e-meta-con-i-gettoni-scuola-primaria',
    'Chiudi la cerniera e l’altra anta riceve altrettanti gettoni VERI: si possono toccare tutti.',
    'Doppio e metà con i gettoni, scuola primaria',
    'Dite prima quale sarà il doppio, poi chiudete il vassoio e contate. Nove si apre in cinque e quattro, perché quello che avanza deve andare da qualche parte.'],
  nl: ['verdubbelen-en-halveren-met-fiches-groep-3-4',
    'Klap het scharnier dicht en de andere klep krijgt evenveel ECHTE fiches — je kunt ze allemaal aanraken.',
    'Verdubbelen en halveren met fiches, groep 3 en 4',
    'Zeg eerst wat het dubbele wordt en klap dan de bak dicht en tel. Negen gaat open in vijf en vier, want die ene moet ergens heen.'],
  sv: ['dubbelt-och-halften-med-brickor-lagstadiet',
    'Fäll ihop gångjärnet och den andra halvan får lika många RIKTIGA brickor — alla går att ta i.',
    'Dubbelt och hälften med brickor, lågstadiet',
    'Säg först vad dubbelt blir och fäll sedan ihop brickan och räkna. Nio öppnas till fem och fyra, för den som blir över måste hamna någonstans.'],
  da: ['det-dobbelte-og-halvdelen-med-brikker-indskoling',
    'Luk hængslet, og den anden klap får lige så mange RIGTIGE brikker — man kan røre ved dem alle.',
    'Det dobbelte og halvdelen med brikker, indskolingen',
    'Sig først, hvad det dobbelte bliver, og luk så bakken og tæl. Ni åbner sig til fem og fire, for den ene, der bliver tilovers, skal jo et sted hen.'],
  no: ['det-dobbelte-og-halvparten-med-brikker-smatrinnet',
    'Lukk hengselet, og den andre klaffen får like mange EKTE brikker — du kan ta på alle sammen.',
    'Det dobbelte og halvparten med brikker, småtrinnet',
    'Si først hva det dobbelte blir, og lukk så brettet og tell. Ni åpner seg til fem og fire, for den ene som blir til overs må jo et sted.'],
  fi: ['kaksinkertaistaminen-ja-puolittaminen-nappuloilla-alkuopetus',
    'Sulje sarana, ja toiselle puoliskolle tulee yhtä monta OIKEAA nappulaa — niihin kaikkiin voi koskea.',
    'Kaksinkertaistaminen ja puolittaminen nappuloilla, alkuopetus',
    'Sanokaa ensin, mikä on kaksinkertainen määrä, ja sulkekaa sitten alusta ja laskekaa. Yhdeksän avautuu viideksi ja neljäksi, koska ylimääräisen on mentävä jonnekin.']
};
const q = x => JSON.stringify(x);
let head = 'const HEAD = {\n';
Object.keys(HEAD).forEach(function (l, i, a) {
  const h = HEAD[l];
  head += '  ' + l + ': { slug: ' + q(h[0]) + ',\n    tagline: ' + q(h[1]) +
    ',\n    metaTitle: ' + q(h[2]) + ',\n    metaDescription: ' + q(h[3]) + ' }' +
    (i === a.length - 1 ? '\n' : ',\n');
});
head += '};\n\n';

const EN = 'const EN_ABOUT = [\n' + [
  'It is not a mirror, and that is the point. A mirror doubles an appearance, not a quantity — a child who counts twelve in front of one has counted six things and six reflections, and the reflections are reversed and are not there. So this is a tray with two leaves and a hinge between them, and everything on it is a real counter you can touch once.',
  'Put counters on the near leaf and say what the double will be before anything moves. Then close the hinge: the far leaf receives the same number again, and the class can count all of them, one at a time, and find they were right. Open the hinge and it comes apart into two equal leaves.',
  'And an odd total does not stall. Nine will not open into two equal leaves, so one counter has no partner — and the class decides which leaf it goes on. Nine becomes five and four. That is a double and one more, which is the whole of the near-double idea, arrived at by watching rather than by being told. Nothing is scored, nothing is timed, and nothing is ever marked right or wrong.'
].map(q).join(',\n  ').replace(/^/, '  ') + '\n];\nconst EN_HOW = [\n  ' + [
  'Set out a few counters and take the class vote on the double BEFORE you close anything. The saying-first is the lesson; the closing is the check.',
  'Close the hinge and count the whole tray together, touching each counter once. There is nothing to take on trust.',
  'Open a tray that will not split evenly and say nothing. Somebody will notice that one counter has nowhere to go.',
  'Let the class choose the odd one a leaf, then read what the tray says: five and four, a double and one more.'
].map(q).join(',\n  ') + '\n];\nconst EN_IDEAS = [\n  ' + [
  'A two-minute routine: three trays, three votes said out loud, and the count afterwards to settle each one.',
  'Do eight and then nine back to back. Ask what the tray did differently — it did nothing differently, which is what odd means.',
  'Start from a full tray and open it instead. Halving is the same hinge running the other way, and the class can see that it is.'
].map(q).join(',\n  ') + '\n];\n';

s = s.slice(0, s.indexOf('const HEAD = {')) + head + EN + s.slice(s.indexOf('const out = {};'));

/* rewire the per-locale derivations onto THIS tool's keys */
s = s.replace(/about: \[[^\]]*\]/,
  "about: [s('instruction', l), s('ariaTray', l), s('gateBody', l)]");
s = s.replace(/howToUse: \[[\s\S]*?\],\n      classroomIdeas/,
  "howToUse: [s('addOne', l) + ' ' + s('saidPlace', l).split('{n}').join('6'),\n" +
  "        s('close', l) + ' ' + s('saidClosed', l).split('{n}').join('6').split('{d}').join('12'),\n" +
  "        s('open', l) + ' ' + s('saidOpened', l).split('{t}').join('12').split('{a}').join('6')],\n" +
  "      classroomIdeas");
s = s.replace(/classroomIdeas: \[[\s\S]*?\]\n    \}\);/,
  "classroomIdeas: [s('saidOddWaiting', l).split('{t}').join('9'),\n" +
  "        s('saidOddPlaced', l).split('{t}').join('9').split('{a}').join('5').split('{b}').join('4').split('{s}').join('1'),\n" +
  "        s('sheetNote', l)]\n    });");
fs.writeFileSync(P, s);
console.log('landing HEAD + English prose written, derivations rewired');
