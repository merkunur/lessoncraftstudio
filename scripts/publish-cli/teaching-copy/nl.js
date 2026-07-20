/**
 * Dutch teaching-block copy for math-puzzle deck pages.
 *
 * Authored from a Dutch basisonderwijs (groep 3-4) practitioner ruling. Structurally a
 * sibling of de.js and en.js; the content rules are Dutch and are NOT a translation of
 * either — the two existing locales already contradict each other on ages and on whether to
 * print a band or a measured maximum.
 *
 * THE RULING, and what it rejects:
 *
 *   getalgebied    `sommen t/m 20`. The band exists in Dutch (10 -> 20 -> 100) but is rarely
 *                  spoken as an abstract noun. `t/m` beats `tot` in a facts line because
 *                  `tot 20` is strictly exclusive. ABOVE the band there is no band: say the
 *                  real number, `met getallen tot 24`.
 *                  REJECTED: getallenbereik / getalruimte / getalbereik (calques from
 *                  German and English, not methodetaal); `tot 25` as a rounding of 24 (no
 *                  such band exists, it reads as invented); `cijferen tot 20` — cijferen is
 *                  column arithmetic, a different domain entirely and fatal to credibility.
 *
 *   op de tien     `aanvullen tot 10`, with the classroom term `de vriendjes van 10` as the
 *                  recognisable secondary. REJECTED: tienaanvulling (reads as a translated
 *                  Zehnerergänzung), tiencomplement / aanvulsom (jargon no groep-3 teacher
 *                  uses), `tien vol maken` (too childlike for teacher copy).
 *
 *   over de tien   `met tienoverschrijding` as the label, `over het tiental heen` as the
 *                  natural prose form. REJECTED: tienovergang (does not exist), tienerovergang
 *                  (means something about adolescents), `de tien passeren`.
 *
 *   gemengd        `plus- en minsommen door elkaar` — "door elkaar" carries the didactic
 *                  load: the child must re-read the operation each time.
 *                  REJECTED: wisselende bewerkingen / bewerkingswisseling (policy language,
 *                  not classroom language); bare `gemengde sommen` (ambiguous).
 *
 * REGISTER: `je`, not `u`. Dutch education copy addressing teachers has been je-taal for a
 * decade; `u` reads as a sales page. And a groep-3 task is a `som`, never an `opgave`
 * (which belongs to higher years and tests). The adult is the `leerkracht` — never `docent`,
 * which is secondary/higher education.
 *
 * LEVEL: groep 3 is the year of `tot 20`; `tot 100` starts in groep 4. So a deck whose
 * numbers pass 20 is groep-4 material sitting under a groep-3 tag. Say so as usage advice,
 * never as an apology, and never change the tag.
 *
 * NEVER claim SLO approval or kerndoel compliance — SLO approves no material, the kerndoelen
 * are being revised, and "voldoet aan de kerndoelen" reads as bluff. Placement in the
 * leerlijn is the defensible form.
 */
'use strict';

var MODE_PL = {
  addition: 'plussommen',
  subtraction: 'minsommen',
  mixed: 'plus- en minsommen door elkaar',
};

var SKILL = {
  addition: 'het optellen',
  subtraction: 'het aftrekken',
  mixed: 'het wisselen tussen plus en min',
};

/**
 * Range. Band up to 20, real number above it — the practitioner was explicit that inventing
 * a band that does not exist ("tot 25") is worse than naming the true ceiling.
 */
function range(max) {
  if (max <= 10) {
    return { phrase: 'sommen t/m 10', chip: 'Getallen: t/m 10',
      sentence: 'Alle getallen blijven onder de 10.' };
  }
  if (max <= 20) {
    return { phrase: 'sommen t/m 20', chip: 'Getallen: t/m 20',
      sentence: 'De sommen blijven t/m 20; het grootste getal op het blad is ' + max + '.' };
  }
  return { phrase: 'sommen met getallen tot ' + max, chip: 'Getallen: tot ' + max,
    sentence: 'De getallen lopen tot ' + max + ' en gaan daarmee net over de 20 heen.' };
}

/**
 * The ten-relationship. Direction follows the OPERATION, not the deck mode — verified across
 * the corpus that a crossing is always a subtraction (every answer is 2-10, so a sum can
 * never pass ten on this worksheet type).
 */
function ten(tenCase, reg, ex) {
  var withEx = function (t, e) { return e ? t + ' (' + e + ')' : t; };
  var c = reg.crossesTen;
  switch (tenCase) {
    case 'T0':
      return { clause: 'zonder tienoverschrijding', sentence: 'Er komt geen tienoverschrijding in voor.' };
    case 'T1':
      return { clause: 'zonder tienoverschrijding',
        sentence: 'Er komt geen tienoverschrijding in voor. '
          + withEx('Een som vult precies aan tot 10', ex.making) + '.' };
    case 'T2':
      return { clause: 'zonder tienoverschrijding',
        sentence: 'Er komt geen tienoverschrijding in voor; '
          + withEx('een paar sommen vullen precies aan tot 10', ex.making) + '.' };
    case 'T3':
      return { clause: 'zonder tienoverschrijding, wel met aanvullen tot 10',
        sentence: 'De tien wordt niet overschreden. Meerdere sommen vullen precies aan tot 10 '
          + '— de vriendjes van 10.' };
    case 'T4':
      return { clause: 'grotendeels zonder tienoverschrijding',
        sentence: 'De meeste sommen blijven binnen het tiental; '
          + withEx('een enkele gaat over het tiental heen', ex.crossing) + '.' };
    case 'T5':
      return { clause: 'deels met, deels zonder tienoverschrijding',
        sentence: withEx('Ongeveer de helft van de sommen gaat over het tiental heen', ex.crossing)
          + '; de rest blijft binnen het tiental.' };
    case 'T6':
      return { clause: 'grotendeels met tienoverschrijding',
        sentence: withEx('De tienoverschrijding staat voorop: ' + c + ' van de negen sommen gaan over het tiental heen', ex.crossing) + '.' };
    default:
      return { clause: 'doorlopend met tienoverschrijding',
        sentence: withEx('Elke som gaat over het tiental heen', ex.crossing) + '.' };
  }
}

var BLOCK1 = {
  S1: function (f, s) {
    return 'Negen ' + s.modePl + ' in een 3x3-raster, ' + s.range.phrase + '. ' + s.ten.sentence;
  },
  S2: function (f, s) {
    return 'Dit blad oefent ' + s.skill + ' met ' + s.range.phrase + '. ' + s.ten.sentence;
  },
  S3: function (f, s) {
    return s.ex[0] + ' en ' + s.ex[1] + ': ' + s.range.sentence + ' ' + s.ten.sentence;
  },
  S4: function (f, s) {
    return 'Voor de oefenfase nadat de tienoverschrijding is aangeboden: de negen '
      + s.modePl + ' lopen tot ' + s.max + '. ' + s.ten.sentence;
  },
  // mixed only — re-reading the operation is itself the difficulty
  S5: function (f, s) {
    return 'Plus en min wisselen per vakje: ' + s.ex[0] + ', dan ' + s.ex[1]
      + '. Het kind moet dus bij elke som opnieuw kijken welke bewerking er staat. '
      + s.range.sentence;
  },
};

var BLOCK2 = {
  B1: function (f, s) {
    return 'Het blad kijkt zichzelf na: klopt een uitkomst niet, dan past het stukje niet in '
      + 'de plaat. Het kind ziet de fout zelf en kan hem herstellen zonder te vragen.';
  },
  B2: function (f, s) {
    return 'De plaat is de controle — hij wordt pas compleet als alle negen sommen kloppen. '
      + 'Daardoor werkt het blad ook als je zelf met een ander groepje bezig bent.';
  },
  B3: function (f, s) {
    return 'De terugkoppeling komt van het materiaal en niet van jou. Dat scheelt nakijktijd, '
      + 'en het kind merkt tijdens het werken al dat er iets niet klopt.';
  },
  B4: function (f, s) {
    return 'Of het goed gerekend heeft, ziet het kind aan de plaat. Een stukje dat niet past '
      + 'wijst aan welke som nog een keer bekeken moet worden — niet waarom hij fout ging.';
  },
};

var BLOCK3 = {
  C1: function (f, s) {
    return 'Leg het blad in de weektaak of bij het klaar-werk. Omdat het zichzelf nakijkt, '
      + 'kan het ook tijdens het zelfstandig werken mee.';
  },
  C2: function (f, s) {
    return 'Handig voor een invalles of het laatste half uur: de uitleg is een zin en niemand '
      + 'hoeft na te kijken.';
  },
  C3: function (f, s) {
    return 'Na verlengde instructie kun je het blad als oefening inzetten. In tweetallen leggen '
      + 'twee kinderen om beurten een stukje en zeggen daarbij hun uitkomst hardop.';
  },
  C4: function (f, s) {
    return 'Als huiswerk werkt het goed, juist omdat thuis niemand hoeft na te kijken en geen '
      + 'rekenmethode hoeft te kennen.';
  },
};

var FAMILY = {
  T0: ['S1', 'S2'], T1: ['S3', 'S1'], T2: ['S3', 'S2'], T3: ['S3', 'S1'],
  T4: ['S2', 'S1'], T5: ['S2', 'S1'], T6: ['S2', 'S4'], T7: ['S2', 'S4'],
};

function digits(ordinal, radices) {
  var out = [], n = ordinal;
  for (var i = 0; i < radices.length; i++) { out.push(n % radices[i]); n = Math.floor(n / radices[i]); }
  return out;
}

function build(f, ordinal) {
  var reg = f.regrouping || {};
  // Mode from the operations, never manifest.exercise_mode — 98 of 148 English decks carry a
  // mode that contradicts their own content.
  var mode = (reg.additions > 0 && reg.subtractions > 0) ? 'mixed'
    : (reg.subtractions > 0 ? 'subtraction' : 'addition');
  var max = f.band.maxSeen;
  var r = range(max);
  var t = ten(f.tenCase, reg, f.tenExample || {});
  var ops = (f.operations || []).map(function (o) { return o.text; });

  var s = {
    modePl: MODE_PL[mode], skill: SKILL[mode], max: max, range: r, ten: t,
    ex: f.examples || [], theme: f.themeName || null,
  };

  var fam = FAMILY[f.tenCase] || ['S1', 'S2'];
  var b2 = ['B1', 'B2', 'B3', 'B4'];
  // groep 3 is the tot-20 year; above that it is groep-4 material and the uses shift
  var uses = (max > 20) ? ['C3', 'C2'] : (max <= 10 ? ['C1', 'C4'] : ['C1', 'C2', 'C3']);
  var d = digits(ordinal, [fam.length, b2.length, uses.length, 3]);

  var key1 = (mode === 'mixed' && s.ex.length >= 2) ? 'S5' : fam[d[0]];
  // when block 1 is forced, its digit selects nothing — give it the caveat instead
  var elimIdx = (mode === 'mixed' && s.ex.length >= 2) ? (ordinal % 3) : d[3];

  var CAVEATS = [
    ' Elke uitkomst van 2 t/m 10 komt precies een keer voor, dus de laatste sommen kunnen '
      + 'worden weggestreept. Laat de sommen hardop zeggen als je zeker wilt weten dat ze echt gerekend zijn.',
    ' Omdat elk antwoord van 2 t/m 10 een keer voorkomt, kan een kind de laatste stukjes '
      + 'afleiden. Laat de uitkomsten eerst opschrijven als je dat wilt voorkomen.',
    ' Sommige kinderen leggen op vorm in plaats van op uitkomst. Leg de stukjes met de '
      + 'beeldzijde naar beneden als je dat wilt uitsluiten.',
  ];

  // Verified structurally: a crossing is always a subtraction here, so addition over the ten
  // is never practised. The practitioner called this the strongest sentence available.
  var SCOPE = [
    ' De tienoverschrijding wordt hier alleen bij het aftrekken geoefend; optellen over het '
      + 'tiental komt op dit bladtype niet voor.',
    ' Let op: alleen de minsommen gaan over het tiental. Voor optellen over de tien heb je een '
      + 'ander blad nodig.',
  ];

  // Above the band this is groep-4 material under a groep-3 tag. Usage advice, not apology.
  // The competence clause deliberately avoids the phrase "sommen t/m 20". That wording is
  // also how the copy states the SHEET's range, so the verifier could not tell a claim about
  // this worksheet from a statement about what the child can already do — 39 false failures.
  // Rewording the sentence is better than loosening the assertion, and it reads more directly.
  var levelNote = (max > 20)
    ? ' Dit blad gaat met getallen tot ' + max + ' boven de 20 uit. In de meeste methodes komt '
      + 'dat pas in groep 4 aan bod — zet het in groep 3 alleen in bij kinderen die tot 20 al '
      + 'vlot rekenen.'
    : '';

  return {
    shapes: { block1: key1, block2: b2[d[1]], block3: uses[d[2]] },
    chipRange: r.chip,
    chipMode: mode === 'addition' ? 'Optellen' : (mode === 'subtraction' ? 'Aftrekken' : 'Optellen en aftrekken'),
    chipTen: t.clause,
    taskList: ops.length ? 'De negen sommen op dit blad: ' + ops.join(', ') + '.' : '',
    heading1: 'Wat oefent dit blad?',
    heading2: 'Waarom het zichzelf nakijkt',
    heading3: 'Zo zet je het in',
    block1: BLOCK1[key1](f, s) + levelNote,
    block2: BLOCK2[b2[d[1]]](f, s),
    block3: BLOCK3[uses[d[2]]](f, s),
    blockExtras: 'Op het antwoordblad staan alle negen uitkomsten — handig om voor het printen '
      + 'even te kijken of het getalgebied past.'
      + CAVEATS[elimIdx % CAVEATS.length]
      + (reg.crossesTen > 0 ? SCOPE[ordinal % SCOPE.length] : '')
      + (s.theme ? ' De plaat hoort bij het thema ' + s.theme + '.' : ''),
  };
}

module.exports = { build: build, range: range, ten: ten };
