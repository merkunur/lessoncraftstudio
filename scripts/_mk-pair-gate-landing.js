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
  en: { slug: 'pair-gate-round-to-the-nearest-ten',
    tagline: 'Let go and it runs downhill into the nearest ten — until it lands on the ridge, where the ground is level and nothing happens at all.',
    metaTitle: 'The Rounding Hill — rounding to the nearest ten, Grade 2 and 3',
    metaDescription: 'Free whiteboard tool: 47 runs downhill into 50 because that is what nearest means. On 45 the stone will not fall, and the class decides which way the ridge tips.' },
  de: { slug: 'runden-auf-zehner-am-huegel-grundschule',
    tagline: 'Loslassen, und der Stein rollt in den nächsten Zehner — bis er genau auf dem Grat liegt, wo der Boden eben ist.',
    metaTitle: 'Runden auf Zehner: der Hügel, Klasse 2 und 3',
    metaDescription: '47 rollt zur 50, weil das nächste eben die 50 ist. Auf der 45 fällt der Stein nicht von selbst — die Klasse entscheidet, wohin der Grat kippt.' },
  fr: { slug: 'arrondir-a-la-dizaine-la-butte-cycle-2',
    tagline: 'Lâchez la pierre : elle descend vers la dizaine la plus proche — sauf sur la crête, où le sol est plat.',
    metaTitle: 'Arrondir à la dizaine : la butte, cycle 2 et 3',
    metaDescription: '47 descend vers 50, parce que c est cela, le plus proche. Sur 45 la pierre ne tombe pas toute seule : la classe décide de quel côté penche la crête.' },
  es: { slug: 'redondear-a-la-decena-la-loma-primaria',
    tagline: 'Suelta la piedra y baja hacia la decena más cercana — salvo en la cresta, donde el suelo está llano.',
    metaTitle: 'Redondear a la decena: la loma, Primaria',
    metaDescription: '47 baja a 50, porque eso es lo más cercano. En 45 la piedra no cae sola: la clase decide hacia dónde se inclina la cresta.' },
  pt: { slug: 'arredondar-para-a-dezena-a-colina-anos-iniciais',
    tagline: 'Solte a pedra e ela desce para a dezena mais próxima — menos na crista, onde o chão está plano.',
    metaTitle: 'Arredondar para a dezena: a colina, anos iniciais',
    metaDescription: '47 desce para 50, porque é isso o mais próximo. Em 45 a pedra não cai sozinha: a turma decide para que lado a crista pende.' },
  it: { slug: 'arrotondare-alla-decina-la-collina-primaria',
    tagline: 'Lascia la pietra e scende verso la decina più vicina — tranne sul crinale, dove il terreno è piano.',
    metaTitle: 'Arrotondare alla decina: la collina, primaria',
    metaDescription: '47 scende a 50, perché è quello il più vicino. Su 45 la pietra non cade da sola: la classe decide da che parte pende il crinale.' },
  nl: { slug: 'afronden-op-tientallen-de-heuvel-groep-4-5',
    tagline: 'Laat de steen los en hij rolt naar het dichtstbijzijnde tiental — behalve op de kam, waar de grond vlak is.',
    metaTitle: 'Afronden op tientallen: de heuvel, groep 4 en 5',
    metaDescription: '47 rolt naar 50, want dat is het dichtstbij. Op 45 valt de steen niet vanzelf: de klas beslist welke kant de kam op helt.' },
  sv: { slug: 'avrunda-till-tiotal-kullen-lagstadiet',
    tagline: 'Släpp stenen och den rullar ner i närmaste tiotal — utom på krönet, där marken är plan.',
    metaTitle: 'Avrunda till tiotal: kullen, lågstadiet',
    metaDescription: '47 rullar till 50, för det är närmast. På 45 faller stenen inte av sig själv: klassen bestämmer åt vilket håll krönet lutar.' },
  da: { slug: 'afrunding-til-tiere-bakken-indskoling',
    tagline: 'Slip stenen, og den triller ned i den nærmeste tier — undtagen på kammen, hvor jorden er flad.',
    metaTitle: 'Afrunding til tiere: bakken, indskolingen',
    metaDescription: '47 triller til 50, for det er nærmest. På 45 falder stenen ikke af sig selv: klassen bestemmer, hvilken vej kammen hælder.' },
  no: { slug: 'avrunding-til-tiere-bakken-smatrinnet',
    tagline: 'Slipp steinen, og den triller ned i nærmeste tier — bortsett fra på kammen, der bakken er flat.',
    metaTitle: 'Avrunding til tiere: bakken, småtrinnet',
    metaDescription: '47 triller til 50, for det er nærmest. På 45 faller steinen ikke av seg selv: klassen bestemmer hvilken vei kammen heller.' },
  fi: { slug: 'pyoristaminen-kymmeniin-kumpu-alkuopetus',
    tagline: 'Päästä kivi irti, ja se vierii lähimpään kymmeneen — paitsi harjalla, jossa maa on tasainen.',
    metaTitle: 'Pyöristäminen kymmeniin: kumpu, alkuopetus',
    metaDescription: '47 vierii viiteenkymmeneen, koska se on lähin. Luvussa 45 kivi ei putoa itsestään: luokka päättää, kummalle puolelle harja kallistuu.' }
};
const EN_ABOUT = [
  'The ground has a dip at each of two round numbers — 40 and 50 — and a ridge exactly halfway between them, at 45. A numbered stone is set down anywhere on it. Let go, and it runs downhill into whichever dip it is nearer: 47 goes to 50, because that is what nearest MEANS, and there is nothing at all to decide about it.',
  'And then there is the ridge. On 45 the ground under the stone is level. It does not roll one way after a moment. It does not pick. It teeters, and it goes on teetering, because a machine that quietly chose would be pretending there was a right answer where there is not one. Rounding a half really is a rule somebody made up, and this is the apparatus that admits it.',
  'So the class settles it. Once they choose which way a ridge tips, the ridge is drawn leaning that way from then on, and every later tie follows it — the rule the room made, visible on the ground itself, with no words written anywhere. Take the lean away and the stone goes back to teetering, because the rule leaving must take its consequence with it. Nothing is scored, nothing is timed, and nothing is marked right or wrong.'
];
const EN_HOW = [
  'Read the ground before the first stone: two dips with a round number in each, a ridge between them, and nothing else on it.',
  'Put the stone somewhere on a slope and ask the class which dip it will run to BEFORE you let go. The slope, not the digit, is the reason.',
  'Then put one exactly on the ridge and let go. Say nothing and let it teeter. The silence is the lesson.',
  'Settle the ridge together, and point out that from now on the ground itself remembers what this class decided.'
];
const EN_IDEAS = [
  'A two-minute routine: three stones, and for each one the class says which dip BEFORE it is let go. Only the last one is a tie.',
  'Ask why 44 and 46 are easy and 45 is not, and refuse to answer. The ground has already answered.',
  'Switch to hundreds and set a stone on 450. The ground looks identical, which is the point: the ridge is always the five in the middle.'
];
const out = {};
LOC.forEach(function (l) {
  const h = HEAD[l];
  out[l] = Object.assign({ name: s('title', l) }, h, l === 'en'
    ? { about: EN_ABOUT, howToUse: EN_HOW, classroomIdeas: EN_IDEAS }
    : {
      about: [s('instruction', l), s('ariaGround', l), s('gateBody', l)],
      howToUse: [s('letGo', l) + '. ' + s('saidSettled', l).replace('{n}', '47').replace('{d}', '50'),
        s('saidTeeter', l).replace('{n}', '45'),
        s('tiltUp', l) + '. ' + s('saidTiltSet', l).replace('{d}', '50')],
      classroomIdeas: [s('saidTiltClear', l), s('ariaRidge', l), s('sheetNote', l)]
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
