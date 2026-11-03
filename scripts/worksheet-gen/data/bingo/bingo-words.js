/**
 * data/bingo/bingo-words.js — Shape and Colour Bingo's phrases (2026-11-03): «a red triangle» in each language, WRITTEN
 * OUT (the colour word agrees with the shape noun: de roter Kreis / rotes Dreieck, nl rode cirkel / rood vierkant,
 * da/no rødt kvadrat; fr/es/pt/it the colour after the noun) — never assembled at run time. No article: the caller card
 * names the shape. The colour words are data/color-words.js, the shape names data/b5/locales/2d-shapes.<loc>.json.
 */
'use strict';
const SHAPE_COLOR = {
  en: {
    circle: {
      red: "red circle",
      blue: "blue circle",
      yellow: "yellow circle",
      green: "green circle"
    },
    square: {
      red: "red square",
      blue: "blue square",
      yellow: "yellow square",
      green: "green square"
    },
    triangle: {
      red: "red triangle",
      blue: "blue triangle",
      yellow: "yellow triangle",
      green: "green triangle"
    },
    rectangle: {
      red: "red rectangle",
      blue: "blue rectangle",
      yellow: "yellow rectangle",
      green: "green rectangle"
    },
    hexagon: {
      red: "red hexagon",
      blue: "blue hexagon",
      yellow: "yellow hexagon",
      green: "green hexagon"
    }
  },
  de: {
    circle: {
      red: "roter Kreis",
      blue: "blauer Kreis",
      yellow: "gelber Kreis",
      green: "grüner Kreis"
    },
    square: {
      red: "rotes Quadrat",
      blue: "blaues Quadrat",
      yellow: "gelbes Quadrat",
      green: "grünes Quadrat"
    },
    triangle: {
      red: "rotes Dreieck",
      blue: "blaues Dreieck",
      yellow: "gelbes Dreieck",
      green: "grünes Dreieck"
    },
    rectangle: {
      red: "rotes Rechteck",
      blue: "blaues Rechteck",
      yellow: "gelbes Rechteck",
      green: "grünes Rechteck"
    },
    hexagon: {
      red: "rotes Sechseck",
      blue: "blaues Sechseck",
      yellow: "gelbes Sechseck",
      green: "grünes Sechseck"
    }
  },
  fr: {
    circle: {
      red: "cercle rouge",
      blue: "cercle bleu",
      yellow: "cercle jaune",
      green: "cercle vert"
    },
    square: {
      red: "carré rouge",
      blue: "carré bleu",
      yellow: "carré jaune",
      green: "carré vert"
    },
    triangle: {
      red: "triangle rouge",
      blue: "triangle bleu",
      yellow: "triangle jaune",
      green: "triangle vert"
    },
    rectangle: {
      red: "rectangle rouge",
      blue: "rectangle bleu",
      yellow: "rectangle jaune",
      green: "rectangle vert"
    },
    hexagon: {
      red: "hexagone rouge",
      blue: "hexagone bleu",
      yellow: "hexagone jaune",
      green: "hexagone vert"
    }
  },
  es: {
    circle: {
      red: "círculo rojo",
      blue: "círculo azul",
      yellow: "círculo amarillo",
      green: "círculo verde"
    },
    square: {
      red: "cuadrado rojo",
      blue: "cuadrado azul",
      yellow: "cuadrado amarillo",
      green: "cuadrado verde"
    },
    triangle: {
      red: "triángulo rojo",
      blue: "triángulo azul",
      yellow: "triángulo amarillo",
      green: "triángulo verde"
    },
    rectangle: {
      red: "rectángulo rojo",
      blue: "rectángulo azul",
      yellow: "rectángulo amarillo",
      green: "rectángulo verde"
    },
    hexagon: {
      red: "hexágono rojo",
      blue: "hexágono azul",
      yellow: "hexágono amarillo",
      green: "hexágono verde"
    }
  },
  pt: {
    circle: {
      red: "círculo vermelho",
      blue: "círculo azul",
      yellow: "círculo amarelo",
      green: "círculo verde"
    },
    square: {
      red: "quadrado vermelho",
      blue: "quadrado azul",
      yellow: "quadrado amarelo",
      green: "quadrado verde"
    },
    triangle: {
      red: "triângulo vermelho",
      blue: "triângulo azul",
      yellow: "triângulo amarelo",
      green: "triângulo verde"
    },
    rectangle: {
      red: "retângulo vermelho",
      blue: "retângulo azul",
      yellow: "retângulo amarelo",
      green: "retângulo verde"
    },
    hexagon: {
      red: "hexágono vermelho",
      blue: "hexágono azul",
      yellow: "hexágono amarelo",
      green: "hexágono verde"
    }
  },
  it: {
    circle: {
      red: "cerchio rosso",
      blue: "cerchio blu",
      yellow: "cerchio giallo",
      green: "cerchio verde"
    },
    square: {
      red: "quadrato rosso",
      blue: "quadrato blu",
      yellow: "quadrato giallo",
      green: "quadrato verde"
    },
    triangle: {
      red: "triangolo rosso",
      blue: "triangolo blu",
      yellow: "triangolo giallo",
      green: "triangolo verde"
    },
    rectangle: {
      red: "rettangolo rosso",
      blue: "rettangolo blu",
      yellow: "rettangolo giallo",
      green: "rettangolo verde"
    },
    hexagon: {
      red: "esagono rosso",
      blue: "esagono blu",
      yellow: "esagono giallo",
      green: "esagono verde"
    }
  },
  nl: {
    circle: {
      red: "rode cirkel",
      blue: "blauwe cirkel",
      yellow: "gele cirkel",
      green: "groene cirkel"
    },
    square: {
      red: "rood vierkant",
      blue: "blauw vierkant",
      yellow: "geel vierkant",
      green: "groen vierkant"
    },
    triangle: {
      red: "rode driehoek",
      blue: "blauwe driehoek",
      yellow: "gele driehoek",
      green: "groene driehoek"
    },
    rectangle: {
      red: "rode rechthoek",
      blue: "blauwe rechthoek",
      yellow: "gele rechthoek",
      green: "groene rechthoek"
    },
    hexagon: {
      red: "rode zeshoek",
      blue: "blauwe zeshoek",
      yellow: "gele zeshoek",
      green: "groene zeshoek"
    }
  },
  sv: {
    circle: {
      red: "röd cirkel",
      blue: "blå cirkel",
      yellow: "gul cirkel",
      green: "grön cirkel"
    },
    square: {
      red: "röd kvadrat",
      blue: "blå kvadrat",
      yellow: "gul kvadrat",
      green: "grön kvadrat"
    },
    triangle: {
      red: "röd triangel",
      blue: "blå triangel",
      yellow: "gul triangel",
      green: "grön triangel"
    },
    rectangle: {
      red: "röd rektangel",
      blue: "blå rektangel",
      yellow: "gul rektangel",
      green: "grön rektangel"
    },
    hexagon: {
      red: "röd sexhörning",
      blue: "blå sexhörning",
      yellow: "gul sexhörning",
      green: "grön sexhörning"
    }
  },
  da: {
    circle: {
      red: "rød cirkel",
      blue: "blå cirkel",
      yellow: "gul cirkel",
      green: "grøn cirkel"
    },
    square: {
      red: "rødt kvadrat",
      blue: "blåt kvadrat",
      yellow: "gult kvadrat",
      green: "grønt kvadrat"
    },
    triangle: {
      red: "rød trekant",
      blue: "blå trekant",
      yellow: "gul trekant",
      green: "grøn trekant"
    },
    rectangle: {
      red: "rødt rektangel",
      blue: "blåt rektangel",
      yellow: "gult rektangel",
      green: "grønt rektangel"
    },
    hexagon: {
      red: "rød sekskant",
      blue: "blå sekskant",
      yellow: "gul sekskant",
      green: "grøn sekskant"
    }
  },
  no: {
    circle: {
      red: "rød sirkel",
      blue: "blå sirkel",
      yellow: "gul sirkel",
      green: "grønn sirkel"
    },
    square: {
      red: "rødt kvadrat",
      blue: "blått kvadrat",
      yellow: "gult kvadrat",
      green: "grønt kvadrat"
    },
    triangle: {
      red: "rød trekant",
      blue: "blå trekant",
      yellow: "gul trekant",
      green: "grønn trekant"
    },
    rectangle: {
      red: "rødt rektangel",
      blue: "blått rektangel",
      yellow: "gult rektangel",
      green: "grønt rektangel"
    },
    hexagon: {
      red: "rød sekskant",
      blue: "blå sekskant",
      yellow: "gul sekskant",
      green: "grønn sekskant"
    }
  },
  fi: {
    circle: {
      red: "punainen ympyrä",
      blue: "sininen ympyrä",
      yellow: "keltainen ympyrä",
      green: "vihreä ympyrä"
    },
    square: {
      red: "punainen neliö",
      blue: "sininen neliö",
      yellow: "keltainen neliö",
      green: "vihreä neliö"
    },
    triangle: {
      red: "punainen kolmio",
      blue: "sininen kolmio",
      yellow: "keltainen kolmio",
      green: "vihreä kolmio"
    },
    rectangle: {
      red: "punainen suorakulmio",
      blue: "sininen suorakulmio",
      yellow: "keltainen suorakulmio",
      green: "vihreä suorakulmio"
    },
    hexagon: {
      red: "punainen kuusikulmio",
      blue: "sininen kuusikulmio",
      yellow: "keltainen kuusikulmio",
      green: "vihreä kuusikulmio"
    }
  }
};
// the card's header: the game's name in the classroom (fr loto, es-MX lotería, da banko)
const BINGO_WORD = { en: 'BINGO', de: 'BINGO', fr: 'LOTO', es: 'LOTERÍA', pt: 'BINGO', it: 'BINGO', nl: 'BINGO', sv: 'BINGO', da: 'BANKO', no: 'BINGO', fi: 'BINGO' };
// sight words that SOUND the same (or nearly) when the caller reads them: a pool keeps one of each group — two cells
// for one call otherwise (the B7 native review 2026-11-03: fr et / est, de den / dem, da og / at, nl een / en …; fr ne / pas
// do not sound alike, they always come together)
const HOMOPHONES = {
  en: ['to two too', 'for four', 'no know', 'here hear', 'there their', 'see sea', 'be bee', 'i eye', 'one won', 'blue blew', 'ate eight', 'by buy bye', 'right write', 'new knew', 'our hour', 'red read', 'so sew', 'would wood'],
  de: ['den dem', 'am an', 'in im', 'ein eine einen einem einer', 'das dass', 'seit seid', 'man mann', 'wieder wider', 'war wahr', 'mal mahl'],
  fr: ['et est ai', 'a à as', 'ce se', 'il ils', 'elle elles', 'ou où', 'son sont', 'on ont', 'la là', 'mes mais met mets', "ces ses c'est s'est sait", 'des dès', 'sur sûr', 'du dû', 'peu peut peux', 'vers vert verre ver', 'cent sans sang', 'leur leurs', 'tout tous', 'moi mois', 'tant temps', 'si six', 'fin faim', 'mon mont', 'ma mât', 'quand camp', 'ne pas'],
  es: ['el él', 'tu tú', 'mi mí', 'si sí', 'se sé', 'te té', 'de dé', 'mas más', 'que qué', 'como cómo', 'donde dónde', 'cuando cuándo', 'quien quién', 'cual cuál', 'hay ay ahí', 'a ha ah', 'e he eh', 'o oh', 'haya halla', 'vaya valla', 'tubo tuvo'],
  pt: ['a à há', 'mas mais', 'mau mal', 'tem têm', 'vem vêm', 'por pôr', 'da dá', 'de dê', 'nos nós', 'sem cem', 'se sé', 'pais país', 'ate até'],
  it: ['e è ed', 'a ha ad', 'o ho', 'anno hanno', 'ai hai', 'la là', 'li lì', 'si sì', 'da dà', 'di dì', 'ne né', 'se sé', 'te tè', "ce c'è"],
  nl: ['een en', 'zij zijn zei', 'wij wei', 'mij mei', 'u uw', 'hart hard', 'wat wad', 'het t'],
  sv: ['och å', 'de det dem', 'jag ja', 'vad va var vart', 'är e', 'en än', 'vi vid', 'mig mej', 'dig dej', 'sig sej'],
  da: ['og at af å', 'de dem di', 'hun hund', 'vil vel', 'jeg jer', 'mig mit min'],
  no: ['og å', 'de dem di', 'hun hund', 'vil vel', 'her hær', 'hva va var'],
  fi: [],
};
// pictures a kindergarten child confuses whatever the theme (beyond data/graph-lookalikes.js's per-theme groups)
const LOOKALIKE_ALL = [['dog', 'wolf', 'fox'], ['cat', 'tiger'], ['dolphin', 'whale'], ['seagull', 'swan']];
// letter-sound bingo, beyond the alphabet maker's SAME_SOUND: pt W (waffle) is heard as U; fi D / F (loan sounds) are
// heard as T / V; and a reviewed picture whose word does not start with its letter's usual sound in speech (nl envelop
// is said «anvelop»; da ovn and ost open with the å-sound — da O is orm)
const LETTER_SAME_EXTRA = { pt: ['uw'], fi: ['dt', 'fv'] };
const LETTER_PICTURE_OUT = { nl: ['envelope'], da: ['oven', 'cheese'] };
// a sight word whose six bank sentences all hold another pool word gets its caller sentence here (bingo only; the bank's
// sentences stay as published): the target once, no other pool word, no word said like one (B7 re-check 2026-11-03)
const CALLER_SENTENCES = {
  en: { have: 'Cats have soft fur.', funny: 'Grandpa tells funny jokes.' },
  fr: { mais: 'Léo est petit, mais fort.' },
  es: { le: 'Le doy un beso.' },
  no: { men: 'Suppen er het, men god.' },
};
module.exports = { CALLER_SENTENCES, BINGO_WORD, SHAPE_COLOR, SHAPES: ["circle","square","triangle","rectangle","hexagon"], COLORS: ["red","blue","yellow","green"], HOMOPHONES, LOOKALIKE_ALL, LETTER_SAME_EXTRA, LETTER_PICTURE_OUT };
