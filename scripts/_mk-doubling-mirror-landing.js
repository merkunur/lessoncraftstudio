/* Builds TOOL #54's eleven ToolEntry landing records AND its hub card.
   ⚠ The prose for each non-English locale is DERIVED FROM THAT LOCALE'S
   OWN AUTHORED STRINGS, so no locale carries English prose and none is
   machine-translated.
   ⚠ EIGHT REQUIRED FIELDS: slug name tagline about[] howToUse[]
   classroomIdeas[] metaTitle metaDescription. #42 shipped five and
   failed the static export of all eleven landings AFTER two guards had
   reported success. */
'use strict';
const fs = require('fs');
const path = require('path');
const T = require(path.join(__dirname, '..', 'mini tools', 'doubling-mirror.js'));
const S = T.strings;
const LOC = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const s = (k, l) => (S[k] && (S[k][l] || S[k].en)) || '';

const HEAD = {
  en: { slug: "doubling-mirror-doubles-and-halves-with-counters",
    tagline: "Close the hinge and the far leaf gets the same number of REAL counters — you can touch every one of them.",
    metaTitle: "The Doubling Mirror — doubles and halves, Grade 1 and 2",
    metaDescription: "Free whiteboard tool: say what the double will be, then close the tray and count. Nine opens into five and four, because the odd one has to go somewhere." },
  de: { slug: "verdoppeln-und-halbieren-mit-plaettchen-grundschule",
    tagline: "Klappe zu — und auf der anderen Seite liegen genauso viele ECHTE Plättchen, die man alle anfassen kann.",
    metaTitle: "Verdoppeln und Halbieren mit Plättchen, Klasse 1 und 2",
    metaDescription: "Sagt zuerst, was das Doppelte ist, und klappt dann zu. Neun teilt sich in fünf und vier, denn das eine muss irgendwohin." },
  fr: { slug: "doubles-et-moities-avec-des-jetons-cp-ce1",
    tagline: "Referme la charnière et l’autre volet reçoit autant de VRAIS jetons — on peut les toucher tous.",
    metaTitle: "Doubles et moitiés avec des jetons, CP-CE1",
    metaDescription: "Dites d’abord quel sera le double, puis refermez le plateau et comptez. Neuf s’ouvre en cinq et quatre, parce que celui qui reste doit aller quelque part." },
  es: { slug: "dobles-y-mitades-con-fichas-primaria",
    tagline: "Cierra la bisagra y la otra hoja recibe la misma cantidad de fichas DE VERDAD, y se pueden tocar todas.",
    metaTitle: "Dobles y mitades con fichas, Primaria",
    metaDescription: "Decid primero cuál será el doble y luego cerrad la bandeja y contad. Nueve se abre en cinco y cuatro, porque la que sobra tiene que ir a algún sitio." },
  pt: { slug: "dobro-e-metade-com-fichas-anos-iniciais",
    tagline: "Feche a dobradiça e a outra aba recebe a mesma quantidade de fichas DE VERDADE — dá para tocar em todas.",
    metaTitle: "Dobro e metade com fichas, anos iniciais",
    metaDescription: "Digam primeiro qual vai ser o dobro e depois fechem a bandeja e contem. Nove abre em cinco e quatro, porque a que sobra precisa ir para algum lado." },
  it: { slug: "doppio-e-meta-con-i-gettoni-scuola-primaria",
    tagline: "Chiudi la cerniera e l’altra anta riceve altrettanti gettoni VERI: si possono toccare tutti.",
    metaTitle: "Doppio e metà con i gettoni, scuola primaria",
    metaDescription: "Dite prima quale sarà il doppio, poi chiudete il vassoio e contate. Nove si apre in cinque e quattro, perché quello che avanza deve andare da qualche parte." },
  nl: { slug: "verdubbelen-en-halveren-met-fiches-groep-3-4",
    tagline: "Klap het scharnier dicht en de andere klep krijgt evenveel ECHTE fiches — je kunt ze allemaal aanraken.",
    metaTitle: "Verdubbelen en halveren met fiches, groep 3 en 4",
    metaDescription: "Zeg eerst wat het dubbele wordt en klap dan de bak dicht en tel. Negen gaat open in vijf en vier, want die ene moet ergens heen." },
  sv: { slug: "dubbelt-och-halften-med-brickor-lagstadiet",
    tagline: "Fäll ihop gångjärnet och den andra halvan får lika många RIKTIGA brickor — alla går att ta i.",
    metaTitle: "Dubbelt och hälften med brickor, lågstadiet",
    metaDescription: "Säg först vad dubbelt blir och fäll sedan ihop brickan och räkna. Nio öppnas till fem och fyra, för den som blir över måste hamna någonstans." },
  da: { slug: "det-dobbelte-og-halvdelen-med-brikker-indskoling",
    tagline: "Luk hængslet, og den anden klap får lige så mange RIGTIGE brikker — man kan røre ved dem alle.",
    metaTitle: "Det dobbelte og halvdelen med brikker, indskolingen",
    metaDescription: "Sig først, hvad det dobbelte bliver, og luk så bakken og tæl. Ni åbner sig til fem og fire, for den ene, der bliver tilovers, skal jo et sted hen." },
  no: { slug: "det-dobbelte-og-halvparten-med-brikker-smatrinnet",
    tagline: "Lukk hengselet, og den andre klaffen får like mange EKTE brikker — du kan ta på alle sammen.",
    metaTitle: "Det dobbelte og halvparten med brikker, småtrinnet",
    metaDescription: "Si først hva det dobbelte blir, og lukk så brettet og tell. Ni åpner seg til fem og fire, for den ene som blir til overs må jo et sted." },
  fi: { slug: "kaksinkertaistaminen-ja-puolittaminen-nappuloilla-alkuopetus",
    tagline: "Sulje sarana, ja toiselle puoliskolle tulee yhtä monta OIKEAA nappulaa — niihin kaikkiin voi koskea.",
    metaTitle: "Kaksinkertaistaminen ja puolittaminen nappuloilla, alkuopetus",
    metaDescription: "Sanokaa ensin, mikä on kaksinkertainen määrä, ja sulkekaa sitten alusta ja laskekaa. Yhdeksän avautuu viideksi ja neljäksi, koska ylimääräisen on mentävä jonnekin." }
};

const EN_ABOUT = [
  "It is not a mirror, and that is the point. A mirror doubles an appearance, not a quantity — a child who counts twelve in front of one has counted six things and six reflections, and the reflections are reversed and are not there. So this is a tray with two leaves and a hinge between them, and everything on it is a real counter you can touch once.",
  "Put counters on the near leaf and say what the double will be before anything moves. Then close the hinge: the far leaf receives the same number again, and the class can count all of them, one at a time, and find they were right. Open the hinge and it comes apart into two equal leaves.",
  "And an odd total does not stall. Nine will not open into two equal leaves, so one counter has no partner — and the class decides which leaf it goes on. Nine becomes five and four. That is a double and one more, which is the whole of the near-double idea, arrived at by watching rather than by being told. Nothing is scored, nothing is timed, and nothing is ever marked right or wrong."
];
const EN_HOW = [
  "Set out a few counters and take the class vote on the double BEFORE you close anything. The saying-first is the lesson; the closing is the check.",
  "Close the hinge and count the whole tray together, touching each counter once. There is nothing to take on trust.",
  "Open a tray that will not split evenly and say nothing. Somebody will notice that one counter has nowhere to go.",
  "Let the class choose the odd one a leaf, then read what the tray says: five and four, a double and one more."
];
const EN_IDEAS = [
  "A two-minute routine: three trays, three votes said out loud, and the count afterwards to settle each one.",
  "Do eight and then nine back to back. Ask what the tray did differently — it did nothing differently, which is what odd means.",
  "Start from a full tray and open it instead. Halving is the same hinge running the other way, and the class can see that it is."
];
const out = {};
LOC.forEach(function (l) {
  const h = HEAD[l];
  out[l] = Object.assign({ name: s('title', l) }, h, l === 'en'
    ? { about: EN_ABOUT, howToUse: EN_HOW, classroomIdeas: EN_IDEAS }
    : {
      about: [s('instruction', l), s('ariaTray', l), s('gateBody', l)],
      howToUse: [s('addOne', l) + ' ' + s('saidPlace', l).split('{n}').join('6'),
        s('close', l) + ' ' + s('saidClosed', l).split('{n}').join('6').split('{d}').join('12'),
        s('open', l) + ' ' + s('saidOpened', l).split('{t}').join('12').split('{a}').join('6')],
      classroomIdeas: [s('saidOddWaiting', l).split('{t}').join('9'),
        s('saidOddPlaced', l).split('{t}').join('9').split('{a}').join('5').split('{b}').join('4').split('{s}').join('1'),
        s('sheetNote', l)]
    });
});

fs.writeFileSync(path.join(__dirname, '_doubling-mirror-landing.js'),
  "/* TOOL #54's eleven ToolEntry landing records — GENERATED by\n" +
  "   _mk-doubling-mirror-landing.js from each locale's OWN authored\n   strings. */\n'use strict';\nmodule.exports = " +
  JSON.stringify(out, null, 2) + ";\n");

const per = (k) => LOC.map(l => '      ' + l + ': ' + JSON.stringify(k(l)) + ',').join('\n');
const card = '  {\n    id: "doubling-mirror",\n' +
  '    mini_tool_url: "/mini-tools/doubling-mirror.html",\n' +
  '    title: {\n' + per(l => s('title', l)) + '\n    },\n' +
  '    tagline: {\n' + per(l => HEAD[l].tagline) + '\n    },\n' +
  '    description: {\n' + per(l => out[l].about.join(' ')) + '\n    },\n  },\n';
fs.writeFileSync(path.join(__dirname, '_doubling-mirror-card.txt'), card);
console.log('11 landing records + the hub card written');
