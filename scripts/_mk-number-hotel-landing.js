/* Builds TOOL #49's eleven ToolEntry landing records.
   ⚠ The prose for each non-English locale is DERIVED FROM THAT LOCALE'S
   OWN AUTHORED STRINGS — its instruction, its refusal, its gate copy —
   so no locale carries English prose and none is machine-translated.
   The slug, tagline and meta lines are the native panels' own.        */
'use strict';
const fs = require('fs');
const path = require('path');
const S = require(path.join(__dirname, '_number-hotel-strings.js'));

const HEAD = {
  en: { slug: 'number-hotel-tens-and-ones-to-100', name: 'The Number Hotel',
    tagline: 'A hundred rooms on ten corridors — and no door after 49, which is exactly why the tens digit changes.',
    metaTitle: 'The Number Hotel — tens and ones to 100, K to Grade 2',
    metaDescription: 'Free whiteboard tool: every corridor is a ten, from 0 to 99. After room 49 there is no door at all — the stairs are what carry on.' },
  de: { slug: 'zehneruebergang-zahlenraum-bis-100-grundschule',
    tagline: 'Der Flur endet bei 49 — und genau deshalb springt die Zehnerziffer.',
    metaTitle: 'Das Zahlenhotel: Zehneruebergang im Zahlenraum bis 100',
    metaDescription: 'Jedes Zimmer eine Zahl, jeder Flur eine Zehnerziffer. Am Ende des Flurs geht es nur ueber die Treppe weiter. Klasse 1 und 2.' },
  fr: { slug: 'nombres-jusqu-a-100-passage-a-la-dizaine-cp',
    tagline: 'Cent chambres, dix galeries, et au bout de chaque galerie un escalier qui remonte et ramene tout au debut de la suivante.',
    metaTitle: 'L hotel des cent chambres — les nombres jusqu a 100, CP',
    metaDescription: 'Dix galeries de dix chambres. L ascenseur ajoute dix sans changer de porte, l escalier fait passer a la dizaine. Outil gratuit au TBI, cycle 2.' },
  es: { slug: 'numeros-hasta-el-100-contar-de-diez-en-diez-primaria',
    tagline: 'Cien habitaciones en diez pasillos: el ascensor cambia de pasillo sin tocar la puerta, y al final del pasillo ya no hay mas puertas.',
    metaTitle: 'El hotel de los numeros: contar hasta el 100 en Primaria',
    metaDescription: 'Herramienta gratuita para la pizarra digital: cien habitaciones en diez pasillos, y al final del pasillo ya no hay puertas.' },
  pt: { slug: 'hotel-dos-numeros-dezenas-e-unidades-anos-iniciais',
    tagline: 'Nao existe porta depois do quarto 49: a escada sobe e devolve a turma ao comeco de outro corredor.',
    metaTitle: 'O Hotel dos Numeros — dezenas e unidades, anos iniciais',
    metaDescription: 'Ferramenta gratuita para a lousa: cada corredor e uma dezena, de 0 a 99. Depois do quarto 49 nao existe porta.' },
  it: { slug: 'albergo-dei-numeri-fino-a-100-decine-e-unita',
    tagline: 'Cento camere su dieci corridoi: un passo cambia le unita, l ascensore cambia la decina.',
    metaTitle: 'L albergo dei cento numeri: decine e unita fino a 100',
    metaDescription: 'Cento camere su dieci corridoi. Un passo cambia le unita, l ascensore cambia la decina, le scale sono il riporto.' },
  nl: { slug: 'getallenhotel-tientallen-en-eenheden-tot-100-groep-4',
    tagline: 'Honderd kamers, tien gangen — de gang verklapt het tiental.',
    metaTitle: 'Getallenhotel: tientallen en eenheden tot 100',
    metaDescription: 'Honderd kamers, tien gangen: de gang is het tiental. Ontdek waarom 49 naar 50 via de trap gaat.' },
  sv: { slug: 'talhotellet-tiotal-och-ental-upp-till-100-lagstadiet',
    tagline: 'Hundra rum, tio korridorer — korridorens siffra ar tiotalet.',
    metaTitle: 'Talhotellet: tiotal och ental upp till 100',
    metaDescription: 'Hundra rum, tio korridorer: korridorens siffra ar tiotalet. Se varfor 49 till 50 kraver trappan.' },
  da: { slug: 'talhotellet-tiere-og-enere-op-til-100-indskoling',
    tagline: 'Hundrede vaerelser, ti korridorer — korridoren fortaeller tieren.',
    metaTitle: 'Talhotellet: tiere og enere op til 100',
    metaDescription: 'Hundrede vaerelser, ti korridorer: korridoren er tieren. Se hvorfor 49 til 50 kraever trappen.' },
  no: { slug: 'tallhotellet-tiere-og-enere-opp-til-100-smatrinnet',
    tagline: 'Hundre rom, ti korridorer — korridoren roper tieren.',
    metaTitle: 'Tallhotellet: tiere og enere opp til 100',
    metaDescription: 'Hundre rom, ti korridorer: korridoren er tieren. Se hvorfor 49 til 50 krever trappa.' },
  fi: { slug: 'lukuhotelli-kymmenet-ja-ykkoset-sataan-asti-alkuopetus',
    tagline: 'Sata huonetta, kymmenen kaytavaa — kaytava kertoo kymmenluvun.',
    metaTitle: 'Lukuhotelli: kymmenet ja ykkoset sataan asti',
    metaDescription: 'Sata huonetta, kymmenen kaytavaa: kaytavan numero on kymmenluku. Huomaa, miksi 49:sta 50:een on portaat.' }
};

const EN = {
  about: [
    'Every room in the hotel is a number from 0 to 99, and every corridor carries its tens digit: every room on corridor 4 is a forty-something, so the number on the elevator indicator and the tens digit are not merely alike — they are the same numeral.',
    'One step takes you one door along. The elevator takes you a whole corridor up or down and always leaves you at the same door, so the ones digit never moves. And the corridor really ends: after room 49 there is no door at all, and what carries on is the stairs, which climb and then run the whole width of the hotel back to the first door of the next corridor.',
    'You can only read the doors on the corridor you are standing in, so the elevator always sets the class down somewhere they have to say out loud before they can check it. Nothing is scored, nothing is timed, and nothing is ever marked right or wrong.'
  ],
  howToUse: [
    'Project the hotel and read the lit corridor together before touching anything. Ask what all those numbers have in common.',
    'Step along one door at a time and let the class discover for themselves that after room 49 there is no door — the wall was drawn there from the start.',
    'Take the stairs and follow the whole journey back to the beginning of the new corridor. Ask why a single step cost so much walking.',
    'Call the elevator while the corridor above is still dark, and ask the class to say the room before the doors light up.'
  ],
  classroomIdeas: [
    'A two-minute routine: pick a room, walk there, and ask how many steps are left before the corridor ends. The answer is always what is left to the next ten.',
    'Ride the elevator four or five times with the corridor dark each time, and let the class notice on their own that the door never changes — only the corridor does.',
    'Before taking a single step, ask where room 40 will be and let the class commit. Then walk until you meet the wall.'
  ]
};

const out = {};
for (const loc of Object.keys(HEAD)) {
  const h = HEAD[loc];
  if (loc === 'en') { out.en = Object.assign({}, h, EN); continue; }
  const s = S[loc];
  out[loc] = Object.assign({ name: s.title }, h, {
    about: [s.instruction, s.saidWallEnd.replace('{n}', '49'), s.gateBody],
    howToUse: [s.setStart, s.walkRight, s.liftUp, s.stairsUpAt],
    classroomIdeas: [s.saidRideUp, s.saidStairsUp.replace('{n}', '50'), s.sheetNote]
  });
}

fs.writeFileSync(path.join(__dirname, '_number-hotel-landing.js'),
  "/* TOOL #49's eleven ToolEntry landing records — GENERATED by\n" +
  "   _mk-number-hotel-landing.js, from each locale's OWN authored\n" +
  "   strings. No locale carries English prose.\n" +
  "   ⚠ EIGHT REQUIRED FIELDS: slug name tagline about[] howToUse[]\n" +
  "   classroomIdeas[] metaTitle metaDescription. #42 shipped five and\n" +
  "   failed the static export of all eleven landings AFTER two guards\n" +
  "   had reported success.\n" +
  "   ⚠ Each slug is folded to its OWN locale's rule — da folds ø to oe\n" +
  "   and å to aa, no folds ø to o, so the two can never collide. */\n" +
  "'use strict';\nmodule.exports = " + JSON.stringify(out, null, 2) + ";\n");
console.log('11 landing records written');
