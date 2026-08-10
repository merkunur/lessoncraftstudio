/* Builds TOOL #53's eleven ToolEntry landing records AND its hub card.
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
const T = require(path.join(__dirname, '..', 'mini tools', 'pair-gate.js'));
const S = T.strings;
const LOC = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const s = (k, l) => (S[k] && (S[k][l] || S[k].en)) || '';

const HEAD = {
  en: { slug: 'pair-gate-odd-and-even-by-pairing-counters',
    tagline: 'The archway takes exactly two abreast — and whoever is left standing is drawn no differently from anybody else. Only the empty place beside them is.',
    metaTitle: 'The Pair Gate — odd and even by pairing, Grade 1 and 2',
    metaDescription: 'Free whiteboard tool: predict whether everybody gets through, then call them forward two abreast. Two parades that each leave one behind make a full rank together.' },
  de: { slug: 'gerade-und-ungerade-zahlen-durch-paare-grundschule',
    tagline: 'Der Rundbogen lässt genau zwei nebeneinander durch — und wer stehen bleibt, sieht aus wie alle anderen. Nur der leere Platz daneben nicht.',
    metaTitle: 'Gerade und ungerade: paarweise durch den Rundbogen, Klasse 1 und 2',
    metaDescription: 'Sagt erst, ob alle durchkommen, und ruft sie dann paarweise vor. Zwei Umzüge, bei denen je einer stehen bleibt, ergeben zusammen eine volle Reihe.' },
  fr: { slug: 'nombres-pairs-et-impairs-par-appariement-cp-ce1',
    tagline: 'L arche laisse passer exactement deux de front — et celui qui reste ne se distingue en rien. Seule la place vide à côté de lui se voit.',
    metaTitle: 'Pairs et impairs : passer deux de front, CP-CE1',
    metaDescription: 'Dites d abord si tout le monde passera, puis appelez-les deux de front. Deux défilés qui laissent chacun quelqu un forment ensemble un rang complet.' },
  es: { slug: 'numeros-pares-e-impares-emparejando-primaria',
    tagline: 'El pórtico deja pasar exactamente dos a la vez, y quien se queda no se dibuja distinto. Solo se ve el hueco vacío a su lado.',
    metaTitle: 'Pares e impares: pasar de dos en dos, Primaria',
    metaDescription: 'Decid primero si pasarán todos y luego llamadlos de dos en dos. Dos desfiles que dejan a uno cada uno forman juntos una fila completa.' },
  pt: { slug: 'numeros-pares-e-impares-formando-duplas-anos-iniciais',
    tagline: 'O pórtico deixa passar exatamente dois lado a lado — e quem fica não é desenhado de outro jeito. Só o lugar vazio ao lado dele.',
    metaTitle: 'Pares e ímpares: passar dois lado a lado, anos iniciais',
    metaDescription: 'Digam primeiro se todos vão passar e depois chamem de dois em dois. Dois desfiles que deixam um cada um formam juntos uma fila cheia.' },
  it: { slug: 'numeri-pari-e-dispari-a-coppie-scuola-primaria',
    tagline: 'L arcata lascia passare esattamente due affiancati — e chi resta non è disegnato in modo diverso. Si vede solo il posto vuoto accanto.',
    metaTitle: 'Pari e dispari: passare due affiancati, primaria',
    metaDescription: 'Dite prima se passeranno tutti, poi chiamateli due affiancati. Due sfilate che lasciano uno ciascuna formano insieme una fila intera.' },
  nl: { slug: 'even-en-oneven-getallen-door-paren-groep-3-4',
    tagline: 'De doorgang laat er precies twee naast elkaar door — en wie blijft staan ziet er hetzelfde uit als alle anderen. Alleen de lege plek ernaast niet.',
    metaTitle: 'Even en oneven: twee naast elkaar, groep 3 en 4',
    metaDescription: 'Zeg eerst of iedereen erdoor komt en roep ze dan twee naast elkaar. Twee optochten die er elk één laten staan vormen samen een volle rij.' },
  sv: { slug: 'jamna-och-udda-tal-genom-parbildning-lagstadiet',
    tagline: 'Valvet släpper igenom precis två i bredd — och den som blir stående ritas likadant som alla andra. Bara den tomma platsen bredvid syns.',
    metaTitle: 'Jämnt och udda: två i bredd genom valvet, lågstadiet',
    metaDescription: 'Säg först om alla kommer igenom och ropa dem sedan två i bredd. Två parader som var för sig lämnar en kvar bildar tillsammans en hel rad.' },
  da: { slug: 'lige-og-ulige-tal-gennem-parvis-indskoling',
    tagline: 'Hvælvingen lukker præcis to ved siden af hinanden igennem — og den, der bliver stående, ser ud som alle andre. Kun den tomme plads ved siden af.',
    metaTitle: 'Lige og ulige: to ad gangen gennem hvælvingen, indskolingen',
    metaDescription: 'Sig først, om alle kommer igennem, og kald dem så frem to ad gangen. To optog, der hver efterlader én, danner sammen en hel række.' },
  no: { slug: 'partall-og-oddetall-gjennom-parvis-smatrinnet',
    tagline: 'Hvelvingen slipper gjennom nøyaktig to ved siden av hverandre — og den som blir stående, ser ut som alle andre. Bare den tomme plassen ved siden av.',
    metaTitle: 'Partall og oddetall: to om gangen gjennom hvelvingen, småtrinnet',
    metaDescription: 'Si først om alle kommer gjennom, og rop dem så fram to om gangen. To opptog som hver etterlater én, danner sammen en hel rekke.' },
  fi: { slug: 'parilliset-ja-parittomat-luvut-parittamalla-alkuopetus',
    tagline: 'Holvista mahtuu tasan kaksi rinnakkain — eikä seisomaan jäänyt näytä muista poikkeavalta. Vain viereinen tyhjä paikka näkyy.',
    metaTitle: 'Parilliset ja parittomat: kaksi rinnakkain holvista, alkuopetus',
    metaDescription: 'Sanokaa ensin, pääsevätkö kaikki läpi, ja kutsukaa heidät sitten kaksi rinnakkain. Kaksi kulkuetta, joista kummastakin jää yksi, muodostavat yhdessä täyden rivin.' }
};
const EN_ABOUT = [
  'A parade of marchers, an archway wide enough for exactly two of them, and a yard on the far side. Before anybody moves, the class has to say whether everybody will get through — and only then does the bar lift. That order is the whole design: the first thing that happens is a judgement, not an animation.',
  'Then the ranks are called forward, one at a time. When fewer than two are left, the archway simply refuses. It goes on refusing, and nothing anywhere calls the child wrong. What is left standing is drawn exactly like every other marcher — identical circle, identical colour — because being left over is not being wrong. What IS drawn is the empty place beside them, and that empty place is the whole of what the number is telling you.',
  'Then a second parade arrives that also leaves somebody behind, and both of them step onto the sill — a plate exactly as wide as the archway. A full plate is a rank, and a rank goes through. At two abreast that always happens, which is odd plus odd making even. At three abreast it sometimes does not, and the tool says so rather than pretending — which is what makes two special rather than merely typical.'
];
const EN_HOW = [
  'Take the vote before anything moves. The bar will not lift until the class has committed, and the commitment is the lesson.',
  'Call the ranks forward yourself and let the class count them through. Stop the moment the archway refuses and say nothing.',
  'Point at the empty place, not at the marcher standing beside it. The marcher has done nothing unusual; the gap is the news.',
  'Bring the second parade and put both left-behinds on the sill. Ask whether the sill is a rank before you find out.'
];
const EN_IDEAS = [
  'A two-minute routine: three parades, three votes, and the vote said out loud before a single rank is called.',
  'Run a parade of twelve and a parade of thirteen back to back at the same width, and ask what the archway did differently. It did nothing differently — that is the point.',
  'Widen the archway to three and try the same theorem. Two left-behinds sometimes make a rank now and sometimes do not, which is the best argument for why two is the interesting one.'
];
const out = {};
LOC.forEach(function (l) {
  const h = HEAD[l];
  out[l] = Object.assign({ name: s('title', l) }, h, l === 'en'
    ? { about: EN_ABOUT, howToUse: EN_HOW, classroomIdeas: EN_IDEAS }
    : {
      about: [s('instruction', l), s('ariaYard', l), s('gateBody', l)],
      howToUse: [s('predNo', l) + '. ' + s('saidPredNo', l),
        s('call', l) + '. ' + s('saidStand', l).replace('{s}','1').replace('{n}','17').replace('{k}','2'),
        s('sill', l) + '. ' + s('saidSill', l).replace('{a}','1').replace('{b}','1')],
      classroomIdeas: [s('ariaStand', l).replace('{n}','1').replace('{e}','1'),
        s('second', l) + '. ' + s('saidSecond', l).replace('{n}','13').replace('{s}','1'),
        s('sheetNote', l)]
    });
});

fs.writeFileSync(path.join(__dirname, '_pair-gate-landing.js'),
  "/* TOOL #53's eleven ToolEntry landing records — GENERATED by\n" +
  "   _mk-pair-gate-landing.js from each locale's OWN authored\n   strings. */\n'use strict';\nmodule.exports = " +
  JSON.stringify(out, null, 2) + ";\n");

const per = (k) => LOC.map(l => '      ' + l + ': ' + JSON.stringify(k(l)) + ',').join('\n');
const card = '  {\n    id: "pair-gate",\n' +
  '    mini_tool_url: "/mini-tools/pair-gate.html",\n' +
  '    title: {\n' + per(l => s('title', l)) + '\n    },\n' +
  '    tagline: {\n' + per(l => HEAD[l].tagline) + '\n    },\n' +
  '    description: {\n' + per(l => out[l].about.join(' ')) + '\n    },\n  },\n';
fs.writeFileSync(path.join(__dirname, '_pair-gate-card.txt'), card);
console.log('11 landing records + the hub card written');
