/* =====================================================================
   _folding-wall-bans.js — TOOL #47's content bans, their exemptions AND
   their both-directions poison, in ONE file.

   ⚠ THE SAME RULE IN TWO FILES GETS HALF-FIXED. #44 shipped a French
   exemption into `apply-` while `verify-` kept its own copy and went on
   condemning the same correct sentence. So `apply-folding-wall-locales`
   and `verify-folding-wall` both import THIS, and the poison runs here.

   ⚠ EVERY BAN IS POISONED IN BOTH DIRECTIONS — a MUST-FIRE string and a
   MUST-PASS string, per locale. A ban tested only on English is tested
   in the one language where the naive form happens to work, and a ban
   that condemns correct native prose teaches a panel to reword AROUND
   it instead of reporting it.

   ⚠ AND WORD BOUNDARIES ARE UNICODE-AWARE. `\b` is ASCII-only: it
   cannot match around `sílabas` or `yhteensä`, and it fails in the
   other direction too (`\bmirror\b` cannot match `_mirrorOf`). Every
   pattern here is built with `(?<!\p{L})…(?!\p{L})` and the `u` flag.

   ⭐⭐ THE FRENCH TRAP, CAUGHT BEFORE IT SHIPPED. `multiplier`,
   `multiplication` and `multiplié` all CONTAIN `plier` — the French for
   "to fold". A substring ban on the fold-family would have condemned
   the single most necessary word in a multiplication tool. The Unicode
   boundary is what makes the ban safe, and `multiplication` is a
   MUST-PASS case so it can never regress.
   ⭐ AND THE PORTUGUESE ONE. `dobrar` means both "to fold" AND "to
   double" — and DOUBLING is the x2 family, the tool's own content. So
   Portuguese has NO fold-word ban; it would condemn the correct word
   for the thing the tool teaches. Recorded as a deliberate hole, not an
   oversight.
   ===================================================================== */
'use strict';

/* ---- law 9: no count may reach any string ------------------------- */

/* The ONLY digit sequences any string may carry, and only in the two
   keys that legitimately NAME the four families in the same numerals
   the buttons show. The exemption list is a ratchet: it may shrink. */
const DIGIT_EXEMPT = {
  stackLocked: 'names the four families the class must put away first',
  setStart: 'names the four families the setting puts away'
};
const FAM_NUMERALS = ['1', '2', '5', '10'];

/* ---- law 10: no operator glyph ------------------------------------ */
const OPS = ['×', '·', '✕', '✖', '⨯', '∙'];
/* the one exemption, by name: per-locale, print-only. German schools
   print the raised dot. */
const OP_EXEMPT_KEYS = ['opGlyph'];

/* ---- the fence: no fold / crease / mirror / twin / hinge ---------- */
/* A sibling tool owns all five, in every language. These are SURFACE
   FORMS with their inflections spelled out — never a stem, because a
   stem is how a ban becomes too wide. */
const MOTION = {
  en: ['crease', 'creases', 'mirror', 'mirrors', 'mirrored', 'twin', 'twins', 'hinge', 'hinged'],
  de: ['Falte', 'Falz', 'Knick', 'Spiegel', 'spiegeln', 'gespiegelt', 'Spiegelbild',
       'Zwilling', 'Zwillinge', 'Scharnier'],
  /* ⚠ the fold VERB is ours now, but `pli` and `pliage` as NOUNS are
     folding-sheet's named part — and `multiplication` still contains
     `pli`, which is what the Unicode boundary is for. */
  fr: ['pli', 'pliage', 'miroir', 'miroirs', 'reflet', 'refléter', 'symétrie', 'symétrique',
       'jumeau', 'jumeaux', 'jumelle', 'jumelles', 'charnière'],
  /* ⚠ it drops `piega` entirely: the noun and the imperative of the verb
     are the SAME WORD, so a whole-word ban would condemn `Piega la
     parete` — the tool's own central button. The Italian panel measured
     that it would have failed 8 of its 38 strings. */
  it: ['specchio', 'specchiare', 'simmetria', 'gemello', 'gemelli', 'gemella', 'gemelle', 'cerniera'],
  es: ['doblez', 'pliegue', 'espejo', 'reflejo', 'simetría', 'gemelo', 'gemelos',
       'gemela', 'gemelas', 'bisagra'],
  pt: ['vinco', 'espelho', 'espelhar', 'simetria', 'gêmeo', 'gêmeos', 'gêmea', 'gêmeas',
       'gemeo', 'dobradiça'],
  nl: ['plooi', 'spiegel', 'spiegelen', 'spiegelbeeld', 'spiegelsom', 'symmetrie',
       'tweeling', 'scharnier'],
  sv: ['veck', 'spegel', 'spegla', 'spegelbild', 'symmetri', 'tvilling', 'gångjärn'],
  da: ['fals', 'spejl', 'spejle', 'spejlbillede', 'symmetri', 'tvilling', 'hængsel'],
  no: ['fals', 'speil', 'speile', 'speilbilde', 'symmetri', 'tvilling', 'hengsel'],
  fi: ['peili', 'peilata', 'peilikuva', 'symmetria', 'symmetrinen', 'kaksonen', 'sarana']
};

/* ---- the K-2 ceiling: no square-number NAME on the apparatus ------ */
/* England places square-number notation in Year 5, US exponents in
   Grade 6. ⚠ It IS allowed in the landing copy, where German search
   demand for it is measured — so this ban applies to STRINGS only. */
/* ⚠ THE BARE SHAPE-WORD IS NOT THE BAN. `quadrato`, `cuadrado`,
   `quadrado` and `carré` are the ordinary words for a geometric
   SQUARE — and every card on this shelf is literally one, so a correct
   sentence like "la tavola è un quadrato" was condemned as Year-5
   notation. The banned thing is the square NUMBER term, which in every
   Romance language is a two-word phrase. Caught by the Italian panel,
   which also predicted the fix would be an exemption list rather than a
   loosened pattern — this is narrower still. */
const SQUARE_NAME = {
  en: ['squared', 'square number', 'square numbers'],
  de: ['Quadratzahl', 'Quadratzahlen'],
  fr: ['nombre carré', 'nombres carrés', 'au carré'],
  it: ['numero quadrato', 'numeri quadrati', 'al quadrato'],
  es: ['número cuadrado', 'números cuadrados', 'al cuadrado'],
  pt: ['número quadrado', 'números quadrados', 'ao quadrado'],
  nl: ['kwadraat', 'kwadraten'],
  sv: ['kvadrattal'],
  da: ['kvadrattal'],
  no: ['kvadrattall'],
  fi: ['neliöluku', 'neliöluvut']
};

/* ---- competition language, banned everywhere --------------------- */
const COMPETE = {
  en: ['score', 'timer', 'streak', 'diploma', 'level up', 'reward'],
  de: ['Punktzahl', 'Timer', 'Serie', 'Diplom', 'Belohnung'],
  fr: ['score', 'chrono', 'diplôme', 'récompense'],
  it: ['punteggio', 'timer', 'diploma', 'ricompensa'],
  es: ['puntuación', 'cronómetro', 'diploma', 'recompensa'],
  pt: ['pontuação', 'cronômetro', 'diploma', 'recompensa'],
  nl: ['score', 'timer', 'diploma', 'tafeldiploma', 'beloning'],
  sv: ['poäng', 'tidtagning', 'diplom', 'belöning'],
  da: ['point', 'stopur', 'diplom', 'belønning'],
  no: ['poeng', 'stoppeklokke', 'diplom', 'belønning'],
  fi: ['pisteet', 'ajastin', 'diplomi', 'palkinto']
};

/* ⭐⭐ THE COMPOUND HOLE, CAUGHT BY THE POISON. A whole-word ban cannot
   see `Spiegelregal` or `Peilihylly` — and a compound is EXACTLY how a
   German, Finnish or Nordic panel would name this tool. So the
   compounding languages also get a PREFIX ban, restricted to roots that
   are unambiguous in that language.
   ⚠ `vika` (sv) is NOT on this list — `vikarie` is a substitute
   teacher, and a prefix ban would condemn it. It stays whole-word only
   and `vikarie` is a MUST-PASS case. da `fold` and no `brett` ARE on
   the list, with their homographs stated below. */
const MOTION_PREFIX = {
  de: ['Spiegel', 'Zwilling', 'Scharnier'],
  nl: ['spiegel', 'tweeling', 'scharnier'],
  sv: ['spegel', 'tvilling', 'gångjärn'],
  da: ['spejl', 'tvilling', 'hængsel'],
  no: ['speil', 'tvilling', 'hengsel'],
  fi: ['peili', 'kaksonen', 'sarana']
};

function word(s) {
  const esc = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu');
}
/* boundary BEFORE only — a compound may continue */
function prefix(s) {
  const esc = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(?<!\\p{L})' + esc, 'iu');
}

/* ⚠⚠ THE ENGLISH LIST MUST NOT BLEED INTO THE OTHER TEN. This used to
   concatenate `map.en` onto every locale, so every Norwegian string was
   also checked against the English COMPETE list — which contains
   `timer`, and `timer` is the ordinary Norwegian plural of `time`,
   meaning HOURS. Any future Norwegian sentence about hours would have
   been condemned as competition language. `score` (fr/nl), `point`
   (da) and `level` are the same shape. Each locale's list is
   authoritative on its own; an English word leaking into a non-English
   string is a DIFFERENT defect with a different gate. Found by the
   Norwegian panel running the checker rather than reading it. */
function listFor(map, loc) { return map[loc] || []; }

/* ⚠⚠ THE DEFINITE ARTICLE IS A SUFFIX IN da/sv/no, AND IT DEFEATED EVERY
   WHOLE-WORD BAN. `diplomet`, `pointene`, `belønningen`, `stopuret`
   and `kvadrattallet` all passed — and the bare indefinite form on the
   list is the ONE form a real Danish sentence rarely uses. Finnish is
   worse: it inflects fifteen ways. So those four locales police the
   competition and square-number lists as PREFIXES too.
   ⚠ Found by the Danish panel RUNNING checkStrings, not reading it.
   ⚠ And the widening is bounded by the same rule as everything else
   here: each of these roots is unambiguous in its own language, and
   each has a must-fire poison case below. */
const SUFFIXING = ['da', 'sv', 'no', 'fi'];

/** Returns [] or an array of {key, ban, why, value}. */
function checkStrings(strings, loc) {
  const bad = [];
  for (const key of Object.keys(strings)) {
    const v = String(strings[key]);

    /* digits */
    const runs = v.match(/[0-9]+/g) || [];
    if (!Object.prototype.hasOwnProperty.call(DIGIT_EXEMPT, key)) {
      if (runs.length) bad.push({ key, ban: 'digit', why: 'no count may reach any string', value: v });
    } else {
      for (const r of runs) {
        if (FAM_NUMERALS.indexOf(r) < 0) {
          bad.push({ key, ban: 'digit', why: `"${r}" is not one of the four family numerals`, value: v });
        }
      }
    }

    /* operator glyphs */
    if (OP_EXEMPT_KEYS.indexOf(key) < 0) {
      for (const g of OPS) {
        if (v.indexOf(g) >= 0) bad.push({ key, ban: 'operator', why: `carries ${g}`, value: v });
      }
      if (/(?:^|[^\p{L}])[=+*](?:[^\p{L}]|$)/u.test(v)) {
        bad.push({ key, ban: 'operator', why: 'carries =, + or *', value: v });
      }
    }

    /* the fence, the ceiling and the competition language */
    for (const [name, map] of [['motion', MOTION], ['squareName', SQUARE_NAME], ['compete', COMPETE]]) {
      for (const w of listFor(map, loc)) {
        if (word(w).test(v)) bad.push({ key, ban: name, why: `carries "${w}"`, value: v });
      }
    }
    for (const w of (MOTION_PREFIX[loc] || [])) {
      if (prefix(w).test(v)) bad.push({ key, ban: 'motion', why: `compounds on "${w}"`, value: v });
    }
    if (SUFFIXING.indexOf(loc) >= 0) {
      for (const [name, map] of [['squareName', SQUARE_NAME], ['compete', COMPETE]]) {
        for (const w of (map[loc] || [])) {
          if (prefix(w).test(v)) bad.push({ key, ban: name, why: `inflects on "${w}"`, value: v });
        }
      }
    }
  }
  return bad;
}

/* ---- THE POISON, BOTH DIRECTIONS, PER LOCALE --------------------- */
/* Each case is sorted by what it MEANS, not by whether it currently
   passes — #40 filed the Swedish `tum` (inch) under MUST_PASS when it
   belonged in MUST_FIRE, and that mis-sorting teaches you to loosen a
   correct regex. */
const POISON = [
  /* MUST FIRE */
  { loc: 'en', key: 'title', v: 'Fold the twin onto its partner', fire: true, why: '⭐ FOLD is now ours; this must still fire, and only on TWIN' },
  { loc: 'en', key: 'title', v: 'The Folding Wall', fire: false, why: '⭐⭐ the tool own-name must pass — it did not, before the correction' },
  { loc: 'en', key: 'restoreBtn', v: 'Put it all back — 21 left', fire: true, why: 'a count reached a label' },
  { loc: 'de', key: 'title', v: 'Das Spiegelregal', fire: true, why: 'the fence: Spiegel' },
  { loc: 'de', key: 'sheetTitle', v: 'Quadratzahlen', fire: true, why: 'the K-2 ceiling on the apparatus' },
  { loc: 'it', key: 'sheetNote', v: 'Ogni numero quadrato resta in piedi', fire: true, why: 'the square-NUMBER term' },
  /* ⭐ the definite suffix — every one of these passed the whole-word ban */
  { loc: 'da', key: 'sheetNote', v: 'Diplomet hænger på væggen', fire: true, why: '⭐ da definite suffix defeated the ban' },
  { loc: 'da', key: 'sheetNote', v: 'Kvadrattallet står tilbage', fire: true, why: '⭐ da definite suffix, square-number term' },
  { loc: 'no', key: 'sheetNote', v: 'Poengene teller ikke her', fire: true, why: '⭐ no definite plural suffix' },
  { loc: 'sv', key: 'sheetNote', v: 'Poängen räknas inte', fire: true, why: '⭐ sv definite suffix' },
  { loc: 'fi', key: 'sheetNote', v: 'Diplomia ei jaeta', fire: true, why: '⭐ fi partitive defeated the ban' },
  { loc: 'no', key: 'sheetNote', v: 'Vent to timer', fire: false, why: '⭐ timer = HOURS in Norwegian, not a stopwatch' },
  { loc: 'it', key: 'sheetNote', v: 'La tavola è un quadrato', fire: false, why: '⭐ quadrato = the SHAPE, and every card is one' },
  { loc: 'es', key: 'sheetNote', v: 'Cada carta es un cuadrado', fire: false, why: '⭐ cuadrado = the SHAPE' },
  { loc: 'fr', key: 'title', v: 'Plier la carte', fire: false, why: 'the fold verb belongs to this tool now' },
  { loc: 'fr', key: 'title', v: 'Le miroir des tables', fire: true, why: 'a folding-sheet named part stays fenced' },
  { loc: 'nl', key: 'gateBody', v: 'Haal je tafeldiploma', fire: true, why: 'the named enemy' },
  { loc: 'sv', key: 'gateBody', v: 'Samla poäng varje dag', fire: true, why: 'competition language' },
  { loc: 'fi', key: 'title', v: 'Peilihylly', fire: true, why: 'the fence: peili' },
  { loc: 'it', key: 'sheetNote', v: 'Il numero è 3 × 4', fire: true, why: 'an operator on paper is print-only' },
  /* ⭐ THE COMPOUND CASES. Each of these is the name a native panel
     would most plausibly reach for, and a whole-word ban is blind to
     every one of them. */
  { loc: 'de', key: 'title', v: 'Das Spiegelregal', fire: true, why: '⭐ a COMPOUND on the fence root' },
  { loc: 'fi', key: 'title', v: 'Peilihylly', fire: true, why: '⭐ a COMPOUND on the fence root' },
  { loc: 'sv', key: 'title', v: 'Spegelhyllan', fire: true, why: '⭐ a COMPOUND on the fence root' },
  { loc: 'sv', key: 'title', v: 'Vikväggen', fire: false, why: '⭐ the fold compound is this tool own name' },
  { loc: 'da', key: 'title', v: 'Foldevæggen', fire: false, why: '⭐ the fold compound is this tool own name' },
  { loc: 'no', key: 'title', v: 'Brettemuren', fire: false, why: '⭐ the fold compound is this tool own name' },
  { loc: 'fi', key: 'title', v: 'Kertotaulusermi', fire: false, why: '⭐ this tool own name' },
  { loc: 'no', key: 'title', v: 'Speilhylla', fire: true, why: '⭐ a COMPOUND on the fence root' },
  { loc: 'da', key: 'title', v: 'Spejlhylden', fire: true, why: '⭐ a COMPOUND on the fence root' },
  { loc: 'nl', key: 'title', v: 'De Spiegelplank', fire: true, why: '⭐ a COMPOUND on the fence root' },

  /* MUST PASS — every one of these is CORRECT native prose */
  { loc: 'fr', key: 'about', v: 'La table de multiplication au complet.', fire: false, why: '⭐ multiplication CONTAINS plier' },
  { loc: 'fr', key: 'howToUse', v: 'Apprendre à multiplier sans tout retenir.', fire: false, why: '⭐ multiplier contains plier' },
  { loc: 'pt', key: 'about', v: 'Dobrar um número é a tabuada do dois.', fire: false, why: '⭐ dobrar is also "to double" — the x2 family' },
  { loc: 'de', key: 'famAway', v: 'Die Reihe und die Spalte wegräumen', fire: false, why: 'Spalte is the ordinary word for column' },
  { loc: 'de', key: 'setStart', v: 'Mit der 1, der 2, der 5 und der 10 schon weggeräumt öffnen', fire: false, why: 'the family numerals, in an exempt key' },
  { loc: 'nl', key: 'about', v: 'De steunsommen 1, 2, 5 en 10 kent de klas al.', fire: false, why: 'about is landing copy, not a string' },
  { loc: 'sv', key: 'shelfLabel', v: 'Hyllan. Rader och kolumner: {list}.', fire: false, why: 'ordinary Swedish' },
  { loc: 'fi', key: 'cardLabel', v: '{p}, rivi {r}, sarake {c}', fire: false, why: 'ordinary Finnish' },
  { loc: 'es', key: 'saidStack', v: 'Guardadas. Las tarjetas que conservan esos números ahora llevan dos.', fire: false, why: 'ordinary Spanish' },
  /* ⭐ AND THE THREE THE PREFIX BAN MUST NOT CONDEMN — the reason
     `vika`, `fold` and `brett` are whole-word only. */
  { loc: 'sv', key: 'sheetNote', v: 'Läraren eller en vikarie kan använda hyllan.', fire: false, why: '⭐ vikarie = a substitute teacher, not "fold"' },
  /* ⭐⭐ RE-SORTED A SECOND TIME, AND THIS TIME BECAUSE THE DESIGN
     CHANGED UNDER THEM. These two were MUST-FIRE only to justify a
     prefix over-breadth on the fold root — a compromise that existed
     because the tool was forbidden to fold. The tool folds now, the
     over-breadth is gone with its reason, and both are ordinary correct
     native prose again. ⚠ The Danish panel caught this by RUNNING the
     file: it measured 39 hits across 19 of its 38 keys, every one on
     the fold family, and refused to ship against it. A poison row can
     outlive the rule it was written for. */
  { loc: 'da', key: 'sheetNote', v: 'Der ligger en folder ved siden af.', fire: false, why: '⭐ folder = a leaflet, and the fold root is no longer banned' },
  { loc: 'no', key: 'sheetNote', v: 'Som et brettspill på bordet.', fire: false, why: '⭐ brettspill = a board game, and the fold root is no longer banned' },
  { loc: 'da', key: 'famAway', v: 'Fold {k}-rækken og {k}-kolonnen væk', fire: false, why: '⭐ the fold verb is THIS TOOL OWN and must pass' },
  { loc: 'no', key: 'famAway', v: 'Brett bort rad {k} og kolonne {k}', fire: false, why: '⭐ the fold verb belongs to this tool' },
  { loc: 'fi', key: 'famAway', v: 'Taita pois rivi {k} ja sarake {k}', fire: false, why: '⭐ the fold verb belongs to this tool' },
  { loc: 'it', key: 'stackBtn', v: 'Piega la parete lungo la diagonale', fire: false, why: '⭐ the noun and the imperative are the SAME WORD in Italian' },
  { loc: 'sv', key: 'famAway', v: 'Vik ihop rad {k} och kolumn {k}', fire: false, why: '⭐ the fold verb belongs to this tool' },
  { loc: 'da', key: 'sheetNote', v: 'Se spejlet på væggen', fire: true, why: 'a folding-sheet named part stays fenced' },
  { loc: 'no', key: 'sheetNote', v: 'To tvillinger', fire: true, why: 'the doctrinal ban — the cards are not twins' },
  { loc: 'opGlyph-exempt', key: 'opGlyph', v: '·', fire: false, why: 'the one operator exemption, print-only' }
];

function poison() {
  const out = [];
  for (const c of POISON) {
    const loc = c.loc === 'opGlyph-exempt' ? 'de' : c.loc;
    /* `about`/`howToUse` are LANDING fields, never strings — a poison
       case naming one proves the checker is not swept over them. */
    const isLanding = c.key === 'about' || c.key === 'howToUse';
    const hits = isLanding ? [] : checkStrings({ [c.key]: c.v }, loc);
    const fired = hits.length > 0;
    out.push({ ...c, fired, ok: fired === c.fire, hits });
  }
  return out;
}

module.exports = {
  DIGIT_EXEMPT, FAM_NUMERALS, OPS, OP_EXEMPT_KEYS,
  MOTION, SQUARE_NAME, COMPETE, word, checkStrings, poison
};

/* run me directly to see the poison table */
if (require.main === module) {
  const rows = poison();
  let bad = 0;
  for (const r of rows) {
    if (!r.ok) bad++;
    console.log(`${r.ok ? 'ok  ' : 'FAIL'} [${r.loc}] ${r.fire ? 'must fire' : 'must pass'} — ${r.why}`
      + (r.ok ? '' : ` :: got ${JSON.stringify(r.hits)}`));
  }
  console.log(`\npoison: ${rows.length - bad}/${rows.length} correct`);
  process.exit(bad ? 1 : 0);
}
