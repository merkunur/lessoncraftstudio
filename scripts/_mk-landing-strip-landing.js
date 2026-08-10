/* Builds TOOL #51's eleven ToolEntry landing records AND its hub card.
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
const T = require(path.join(__dirname, '..', 'mini tools', 'landing-strip.js'));
const S = T.strings;
const LOC = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const s = (k, l) => (S[k] && (S[k][l] || S[k].en)) || '';

const HEAD = {
  en: { slug: 'landing-strip-nearer-0-50-or-100-number-sense',
    tagline: 'Three posts on a bare strip — and after you open up a ten, the same three posts are there again.',
    metaTitle: 'The Landing Strip — is it nearer 0, 50 or 100? K to Grade 2',
    metaDescription: 'Free whiteboard tool: a number appears, the class says which post it is nearest to, then puts it on the strip. Open up the ten it lives in and the same question comes back.' },
  de: { slug: 'zahlen-einschaetzen-naeher-an-0-50-oder-100-grundschule',
    tagline: 'Drei Pfosten auf einem leeren Feld — und in einem Zehner stehen dieselben drei wieder da.',
    metaTitle: 'Zahlen einschätzen: näher an 0, 50 oder 100? Klasse 1 und 2',
    metaDescription: 'Eine Zahl erscheint, die Klasse sagt, welchem Pfosten sie am nächsten ist, und legt sie dann ab. Öffne den Zehner, und dieselbe Frage kommt wieder.' },
  fr: { slug: 'estimer-un-nombre-plus-pres-de-0-50-ou-100-cp-ce1',
    tagline: 'Trois repères sur une bande nue — et quand on ouvre une dizaine, les trois mêmes repères sont là.',
    metaTitle: 'Plus près de 0, de 50 ou de 100 ? Estimer un nombre, CP-CE1',
    metaDescription: 'Un nombre arrive, la classe dit de quel repère il est le plus proche, puis le pose. Ouvrez la dizaine où il habite et la même question revient.' },
  es: { slug: 'estimar-numeros-mas-cerca-de-0-50-o-100-primaria',
    tagline: 'Tres postes en una franja vacía, y al abrir una decena están otra vez los tres.',
    metaTitle: '¿Más cerca de 0, de 50 o de 100? Estimar números en Primaria',
    metaDescription: 'Aparece un número, la clase dice a qué poste está más cerca y luego lo coloca. Abre la decena donde vive y vuelve la misma pregunta.' },
  pt: { slug: 'estimar-numeros-mais-perto-de-0-50-ou-100-anos-iniciais',
    tagline: 'Três postes numa faixa vazia — e ao abrir uma dezena os três estão lá de novo.',
    metaTitle: 'Mais perto de 0, de 50 ou de 100? Estimar números, anos iniciais',
    metaDescription: 'Um número aparece, a turma diz de que poste está mais perto e então o coloca. Abra a dezena onde ele mora e a mesma pergunta volta.' },
  it: { slug: 'stimare-i-numeri-piu-vicino-a-0-50-o-100-primaria',
    tagline: 'Tre pali su una fascia vuota, e aprendo una decina i tre pali ci sono di nuovo.',
    metaTitle: 'Più vicino a 0, a 50 o a 100? Stimare i numeri, primaria',
    metaDescription: 'Arriva un numero, la classe dice a quale palo è più vicino e poi lo mette giù. Apri la decina in cui abita e torna la stessa domanda.' },
  nl: { slug: 'getallen-schatten-dichter-bij-0-50-of-100-groep-3-4',
    tagline: 'Drie palen op een lege baan — en in een tiental staan dezelfde drie er weer.',
    metaTitle: 'Dichter bij 0, 50 of 100? Getallen schatten, groep 3 en 4',
    metaDescription: 'Er komt een getal, de klas zegt bij welke paal het het dichtst staat en legt het dan neer. Open het tiental waar het woont en dezelfde vraag komt terug.' },
  sv: { slug: 'uppskatta-tal-narmare-0-50-eller-100-lagstadiet',
    tagline: 'Tre stolpar på ett tomt fält — och öppnar man ett tiotal står samma tre där igen.',
    metaTitle: 'Närmare 0, 50 eller 100? Uppskatta tal, lågstadiet',
    metaDescription: 'Ett tal dyker upp, klassen säger vilken stolpe det är närmast och lägger sedan ner det. Öppna tiotalet där det bor så kommer samma fråga tillbaka.' },
  da: { slug: 'vurder-tal-taettere-paa-0-50-eller-100-indskoling',
    tagline: 'Tre stolper på et tomt felt — og åbner man en tier, står de samme tre der igen.',
    metaTitle: 'Tættere på 0, 50 eller 100? Vurder tal, indskolingen',
    metaDescription: 'Et tal dukker op, klassen siger, hvilken stolpe det er tættest på, og lægger det så ned. Åbn tieren, hvor det bor, og det samme spørgsmål vender tilbage.' },
  no: { slug: 'anslaa-tall-naermere-0-50-eller-100-smatrinnet',
    tagline: 'Tre stolper på et tomt felt — og åpner du en tier, står de samme tre der igjen.',
    metaTitle: 'Nærmere 0, 50 eller 100? Anslå tall, småtrinnet',
    metaDescription: 'Et tall dukker opp, klassen sier hvilken stolpe det er nærmest, og legger det så ned. Åpne tieren der det bor, og det samme spørsmålet kommer igjen.' },
  fi: { slug: 'lukujen-arviointi-lahempana-nollaa-viittakymmenta-vai-sataa-alkuopetus',
    tagline: 'Kolme tolppaa tyhjällä kentällä — ja kun avaa yhden kymmenen, samat kolme ovat taas siinä.',
    metaTitle: 'Lähempänä nollaa, viittäkymmentä vai sataa? Lukujen arviointi',
    metaDescription: 'Luku ilmestyy, luokka sanoo mitä tolppaa se on lähinnä ja asettaa sen sitten paikalleen. Avaa kymmen, jossa se asuu, ja sama kysymys palaa.' }
};

const EN_ABOUT = [
  'The strip is bare. There is a wall at each end and three posts on it — one at each end and one in the middle — and nothing else at all. No ticks, no marks, no numbers along it. A number appears above the strip, and before anybody may put it anywhere, the class has to say which of the three posts it is nearest to.',
  'That question first is the whole design. Asking a child to place 71 on an empty strip asks for a precision their finger cannot express and their reasoning has not got yet; asking whether 71 is nearer 0, nearer 50 or nearer 100 asks for the judgement that actually does the work. Only once the class has committed does the strip let them slide the number along it and put it down. Then the true place appears below.',
  'Then the strip re-rules itself into the ten the number lives in, and the same three posts are back — 80, 85 and 90 — so the same question is asked again one level down. Nothing is scored, nothing is timed, nothing is ever marked right or wrong, and the tool keeps no record of how far off anybody was. It counts only which post the class chose.'
];
const EN_HOW = [
  'Read the strip together before the first number: two walls, three posts, and nothing in between. Ask what the middle post must be if the ends are 0 and 100.',
  'When the number appears, take a vote on the three posts before anyone touches the strip. The vote is the lesson; the placing is the check.',
  'Slide the number along and put it down where the class agreed. Wait — the strip pauses before it answers, so say out loud where you think it will land.',
  'Open up the ten it lives in. The three posts come back. Ask the same question again and let the class notice it is the same question.'
];
const EN_IDEAS = [
  'A two-minute routine: three numbers, three votes, no placing at all. Just "nearer 0, nearer 50, or nearer 100?" and why.',
  'Save the hard ones for the vote: 25 and 75 split a class down the middle, and that argument is worth more than ten easy rounds.',
  'Open up a ten and ask which post 47 would be nearest to if this little strip were the whole world. Then go back out and ask again.'
];

const out = {};
LOC.forEach(function (l) {
  const h = HEAD[l];
  out[l] = Object.assign({ name: s('title', l) }, h, l === 'en'
    ? { about: EN_ABOUT, howToUse: EN_HOW, classroomIdeas: EN_IDEAS }
    : {
      about: [s('instruction', l), s('ariaStrip', l), s('gateBody', l)],
      howToUse: [s('postMid', l) + '. ' + s('postHigh', l) + '.',
        s('place', l) + '. ' + s('saidTruth', l).replace('{t}', '80').replace('{n}', '60'),
        s('rerule', l) + '. ' + s('saidRerule', l).replace('{a}', '80').replace('{b}', '90')],
      classroomIdeas: [s('saidArrive', l).replace('{n}', '71'),
        s('back', l) + '. ' + s('saidBack', l).replace('{a}', '0').replace('{b}', '100'),
        s('sheetNote', l)]
    });
});

fs.writeFileSync(path.join(__dirname, '_landing-strip-landing.js'),
  "/* TOOL #51's eleven ToolEntry landing records — GENERATED by\n" +
  "   _mk-landing-strip-landing.js from each locale's OWN authored\n   strings. */\n'use strict';\nmodule.exports = " +
  JSON.stringify(out, null, 2) + ";\n");

const per = (k) => LOC.map(l => '      ' + l + ': ' + JSON.stringify(k(l)) + ',').join('\n');
const card = '  {\n    id: "landing-strip",\n' +
  '    mini_tool_url: "/mini-tools/landing-strip.html",\n' +
  '    title: {\n' + per(l => s('title', l)) + '\n    },\n' +
  '    tagline: {\n' + per(l => HEAD[l].tagline) + '\n    },\n' +
  '    description: {\n' + per(l => out[l].about.join(' ')) + '\n    },\n  },\n';
fs.writeFileSync(path.join(__dirname, '_landing-strip-card.txt'), card);
console.log('11 landing records + the hub card written');
