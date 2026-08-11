/* =====================================================================
   GATE — scripts/_the-queue-locale-check.js
   ---------------------------------------------------------------------
   Validates the ten panel-authored locale files for tool #58 THE QUEUE
   before they are folded into `mini tools/the-queue.js`.

   ⚠⚠ THE KEY LIST AND THE ENGLISH VALUES ARE READ OFF THE TOOL SOURCE,
   NEVER HARDCODED HERE. #42 shipped a registration whose completeness
   check listed FIVE of EIGHT required fields and therefore CERTIFIED an
   incomplete entry. A check carrying its own copy of the contract is
   testing a copy — and the very next edit to the tool inverts it from
   correct to backwards.

   ⚠ REFUSES TO RUN if it parses implausibly few keys — the non-vacuity
   rule applied to a field list instead of a NodeList. A regex that
   silently matched nothing would let every file pass every key check.

   ---------------------------------------------------------------------
   ⭐⭐ THE ORDINAL BAN, AND THE TRAP THAT MAKES IT NOT A TOKEN BAN
   ---------------------------------------------------------------------
   The tool's binding law (§23.2, and the header's own refuse-list) is
   that NO STRING MAY NAME A POSITION. The routine's own ordinal is
   THIRD — "count three from this end" — so `third` in each language is
   the unambiguous thing to police.

   ⚠⚠ BUT IN sv, da AND no THE ORDINAL *second* AND THE ADJECTIVE *other*
   ARE THE SAME WORD — `andra` / `anden` / `andre` — and this tool's most
   central instruction is *"pick the OTHER end"*: `den andra änden`,
   `den anden ende`, `den andre enden`. A token-level ban on the ordinal
   would FORBID THE TOOL'S OWN CORE PHRASE in three of eleven locales,
   and would teach those three panels to reword AROUND the gate instead
   of reporting it — which is the recorded `Zufallsbeutel` defect exactly.
   Finnish `toinen` carries the same double duty.

   So: the ban is on the RANK ORDINALS THAT ARE NOT HOMONYMS OF *other*,
   plus an explicit, cited exemption list. It is never widened to cover
   the homonym, and it is never loosened to let a genuine ordinal past.

   ⚠ `\b` IS ASCII-ONLY. `\btredje\b`, `\bkolmas\b` and `\bdritte\b` all
   behave differently the moment a locale letter sits beside them, and
   `\bsté\b`-shaped patterns are born dead. Every ban here is built with
   `(?<!\p{L}) … (?!\p{L})` under the `u` flag. Finnish case endings are
   LISTED, never reached for with `\w*` (the recorded `asteikko` trap: a
   greedy widening swallows an unrelated word the panel needs).

   ⚠⚠ EVERY BAN IS POISONED IN BOTH DIRECTIONS, PER LOCALE: a MUST_FIRE
   string in the policed language, and a MUST_PASS string that is correct
   prose in that language containing the near-miss. A ban tested only on
   English is tested in the one language where `\b` happens to work.

   RUN:      node scripts/_the-queue-locale-check.js
   POISON:   node scripts/_the-queue-locale-check.js --poison
             (must report EVERY check as fired at least once, must report
              the CONTROL — a synthetic CORRECT file — as PASS, and must
              report every per-locale MUST_PASS as NOT condemned)
   ===================================================================== */
'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var TOOL = path.join(ROOT, 'mini tools', 'the-queue.js');
var LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ⚠ letter-boundary, Unicode-aware. NOT `\b`. */
function word(pat) { return new RegExp('(?<!\\p{L})(?:' + pat + ')(?!\\p{L})', 'iu'); }

/* ------------------------------------------------------------------ */
/* the contract, read off the artefact                                 */
/* ------------------------------------------------------------------ */

function readToolKeys(src) {
  var m = src.match(/\n\s*strings:\s*\{([\s\S]*?)\n\s*\},\n\s*settings:/);
  if (!m) throw new Error('GATE ABORT: could not locate the strings block in the tool source.');
  var body = m[1];
  var keys = [], en = {};
  /* matches the unfolded `{ en: 'X' }` AND the folded `{ en: "X", de: … }` */
  var re = /^\s{6}(\w+):\s*\{\s*en:\s*(['"])((?:\\.|(?!\2)[\s\S])*?)\2/gm;
  var k;
  while ((k = re.exec(body)) !== null) {
    keys.push(k[1]);
    /* unescape only what `lit()` escapes — never normalise anything else */
    en[k[1]] = k[3].replace(/\\(["'\\])/g, '$1').replace(/\\n/g, '\n');
  }
  if (keys.length < 20) {
    throw new Error('GATE ABORT: parsed only ' + keys.length +
      ' string keys off the tool — implausible. The gate refuses to run ' +
      'rather than certify against an empty contract.');
  }
  return { keys: keys, en: en };
}

/* the shipped paid-plan name per locale, read off the message files —
   never remembered. 28 tools and 655 occurrences already name a plan
   that does not exist; this one does not join them. */
function readPlanTags() {
  var out = {};
  LOCALES.forEach(function (loc) {
    var p = path.join(ROOT, 'frontend', 'messages', loc + '.json');
    var j = JSON.parse(fs.readFileSync(p, 'utf8'));
    var tag = null;
    (function walk(o) {
      Object.keys(o || {}).forEach(function (k) {
        var v = o[k];
        if (k === 'planTag' && typeof v === 'string') { tag = tag || v; }
        else if (v && typeof v === 'object') walk(v);
      });
    })(j);
    if (!tag) throw new Error('GATE ABORT: no planTag in frontend/messages/' + loc + '.json');
    out[loc] = tag;
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* PER-LOCALE BANS — each with its own MUST_FIRE and MUST_PASS          */
/* ------------------------------------------------------------------ */

/* ⚠⚠ AN AUDITABLE EXEMPTION LIST WITH A REASON EACH — NEVER A LOOSENED
   PATTERN. These are the words the ordinal ban must NOT reach. */
var ORDINAL_EXEMPTIONS = {
  sv: 'andra — the ordinal *second* and the adjective *other* are one word; ' +
      '"den andra änden" IS the tool\'s central instruction',
  da: 'anden — same homonym ("den anden ende"); also the noun *duck*',
  no: 'andre — same homonym ("den andre enden")',
  fi: 'toinen — *second* and *other* are one word ("toisesta päästä")',
  it: 'prima (adv. *before*) and secondo (prep. *according to*) are NOT ranks',
  fr: 'second/seconde in "en second lieu" is not a rank in this copy',
  es: 'segundo (a unit of time) and cuarto (a room) are not ranks',
  de: 'bare `dritt` is absent from THIRD: "zu dritt" is a COUNT of who is ' +
      'waiting, which the size exemption permits — see the note on THIRD.de',
  pt: 'um/uma is the article as well as the numeral (the sv `en` shape), so ' +
      'only DIGITS are banned, never the word — the pt panel flagged this'
};

/* THIRD — the routine's own ordinal, unambiguous in every locale.
   Finnish case endings are LISTED, never `\w*`. */
var THIRD = {
  /* ⚠ BARE `dritt` IS DELIBERATELY ABSENT, AND THAT IS A BAN-TOO-WIDE FIX,
     NOT AN OVERSIGHT. German `zu dritt` means *as a group of three* — a
     genuine COUNT of who is waiting, which this tool's own exemption
     permits. The first draft of this list carried `dritt` and would have
     condemned correct German prose. The inflected forms below cover every
     ordinal reading without reaching it. */
  de: 'dritte|dritter|drittes|dritten|drittem',
  fr: 'troisième|troisièmes',
  es: 'tercero|tercera|terceros|terceras|tercer',
  pt: 'terceiro|terceira|terceiros|terceiras',
  it: 'terzo|terza|terzi|terze',
  nl: 'derde',
  sv: 'tredje',
  da: 'tredje',
  no: 'tredje',
  fi: 'kolmas|kolmannen|kolmatta|kolmannessa|kolmannesta|kolmanteen|kolmannella|kolmannelta|kolmannelle|kolmantena|kolmanneksi|kolmansia|kolmannet'
};

/* RANK — first / last, and second ONLY where it is not the *other*
   homonym. ⚠ sv/da/no/fi carry NO second here, by the exemption above.
   ⚠ it carries no `primo/prima` at all: `prima` is the everyday adverb
   *before*, which correct Italian prose in this tool will use. */
var RANK = {
  de: 'erste|erster|erstes|ersten|erstem|zweite|zweiter|zweites|zweiten|zweitem|letzte|letzter|letztes|letzten|letztem',
  fr: 'premier|première|premiers|premières|deuxième|deuxièmes|dernier|dernière|derniers|dernières',
  es: 'primero|primera|primeros|primeras|primer|último|última|últimos|últimas',
  pt: 'primeiro|primeira|primeiros|primeiras|último|última|últimos|últimas',
  it: 'ultimo|ultima|ultimi|ultime',
  nl: 'eerste|tweede|laatste',
  sv: 'första|förste|sista|siste',
  da: 'første|sidste',
  no: 'første|siste',
  fi: 'ensimmäinen|ensimmäisen|ensimmäistä|viimeinen|viimeisen|viimeistä'
};

/* ⚠ NO VEHICLE — this is a DESIGN RULING, not a naming note.
   `calendar-wall.js:677`: "A RUCKSACK, NOT A BUS. The yellow school bus
   is US-coded and the European coach is not iconic." And `bus` is not
   free anyway: `class-graph.js:133-175` + `our-day.js:649-670` ship it
   in seven languages each. The English already dropped it. */
var VEHICLE = {
  de: 'bus|busse|busses|autobus|schulbus|straßenbahn',
  fr: 'bus|autobus|autocar|tramway',
  es: 'autobús|autobuses|bus|camión|camiones|tranvía',
  pt: 'ônibus|onibus|autocarro|bonde',
  it: 'autobus|pullman|tram|corriera',
  nl: 'bus|bussen|autobus|schoolbus|tram',
  sv: 'buss|bussen|bussar|skolbuss|spårvagn',
  da: 'bus|bussen|busser|skolebus|sporvogn',
  no: 'buss|bussen|busser|skolebuss|trikk',
  fi: 'bussi|bussin|bussia|bussilla|linja-auto|koulubussi|raitiovaunu'
};

/* poison material, per locale, per ban. MUST_FIRE is a genuine violation
   in the policed language; MUST_PASS is correct prose for THIS tool that
   contains the near-miss the ban is most likely to over-reach onto. */
var POISON = {
  de: { third: 'Der dritte wartet noch.',       rank: 'Das erste Kind zählt.',      vehicle: 'Der Bus kommt gleich.',        pass: 'Nimm das andere Ende und geh dann Schritt für Schritt weiter — die Form bleibt am Busch.' },
  fr: { third: 'C’est le troisième qui attend.', rank: 'Le premier de la file.',     vehicle: 'Le bus arrive.',               pass: 'Prends l’autre bout, puis avance d’un pas : personne n’a bougé.' },
  es: { third: 'Es el tercero de la fila.',      rank: 'El primero que espera.',     vehicle: 'Llega el autobús.',            pass: 'Toma el otro extremo y avanza un paso: nadie se ha movido.' },
  pt: { third: 'É o terceiro da vez.',           rank: 'O primeiro que espera.',     vehicle: 'Chegou o ônibus.',             pass: 'Pega a outra ponta e dá um passo: ninguém saiu do lugar.' },
  it: { third: 'È il terzo che aspetta.',        rank: 'È l’ultimo rimasto.',        vehicle: 'Arriva l’autobus.',            pass: 'Prendi l’altro capo, poi fai un passo: prima di contare, guarda bene. Secondo me nessuno si è mosso.' },
  nl: { third: 'De derde staat te wachten.',     rank: 'De eerste in de rij.',       vehicle: 'De bus komt eraan.',           pass: 'Kies het andere uiteinde en zet dan één stap: er is niemand verschoven.' },
  sv: { third: 'Det är den tredje som väntar.',  rank: 'Den första i ledet.',        vehicle: 'Bussen kommer.',               pass: 'Ta den andra änden och gå ett steg — ingen har flyttat på sig.' },
  da: { third: 'Det er den tredje, der venter.', rank: 'Den første i rækken.',       vehicle: 'Bussen kommer nu.',            pass: 'Tag den anden ende, og gå ét skridt — ingen har flyttet sig.' },
  no: { third: 'Det er den tredje som venter.',  rank: 'Den første i rekka.',        vehicle: 'Bussen kommer.',               pass: 'Ta den andre enden og gå ett steg — ingen har flyttet seg.' },
  fi: { third: 'Kolmas odottaa vielä.',          rank: 'Ensimmäinen odottaa.',       vehicle: 'Bussi tulee kohta.',           pass: 'Valitse toinen pää ja astu yksi askel — kukaan ei liikkunut.' }
};

/* the six button labels sit in a wrapping flex row, 15px Nunito beside a
   17px glyph, inside a card that must survive 320px. */
var BUTTON_KEYS = ['endLeft', 'endRight', 'step', 'board', 'again', 'print'];
var BUTTON_MAX = 34;

/* ------------------------------------------------------------------ */
/* the checks                                                          */
/* ------------------------------------------------------------------ */

function hits(obj, re) {
  return Object.keys(obj).filter(function (k) {
    return typeof obj[k] === 'string' && re.test(obj[k]);
  });
}

var CHECKS = {

  parses: function (ctx) {
    return ctx.loadError ? ['does not parse / require cleanly: ' + ctx.loadError] : [];
  },

  isPlainObject: function (ctx) {
    if (ctx.loadError) return [];
    var o = ctx.obj;
    if (!o || typeof o !== 'object' || Array.isArray(o)) return ['export is not a plain object'];
    return [];
  },

  /* ⚠ FATAL CLASS: a key the tool does not declare is a control that was
     never built — the `gateClose` lesson, 31 strings across ten files for
     a control `_gate()` never renders. */
  noUnknownKeys: function (ctx) {
    if (!ctx.obj || ctx.loadError) return [];
    var bad = Object.keys(ctx.obj).filter(function (k) { return ctx.keys.indexOf(k) === -1; });
    return bad.length ? ['declares key(s) the tool does not have: ' + bad.join(', ')] : [];
  },

  valuesAreStrings: function (ctx) {
    if (!ctx.obj || ctx.loadError) return [];
    var bad = Object.keys(ctx.obj).filter(function (k) {
      return typeof ctx.obj[k] !== 'string' || ctx.obj[k].trim() === '';
    });
    return bad.length ? ['non-string or empty value at: ' + bad.join(', ')] : [];
  },

  /* ⚠⚠ DERIVED FROM THE ENGLISH, NEVER HARDCODED. `_fmt` leaves an
     unknown token in place, so a stray `{x}` ships literal braces to a
     child, and a dropped `{n}` ships a sentence with the count missing. */
  placeholderParity: function (ctx) {
    if (!ctx.obj || ctx.loadError) return [];
    var out = [];
    function toks(s) { return (String(s).match(/\{\w+\}/g) || []).slice().sort(); }
    Object.keys(ctx.obj).forEach(function (k) {
      var v = ctx.obj[k];
      if (typeof v !== 'string' || ctx.en[k] === undefined) return;
      var want = toks(ctx.en[k]), got = toks(v);
      if (want.join('|') !== got.join('|')) {
        out.push(k + ' placeholder mismatch — English has [' + (want.join(', ') || 'none') +
          '], this file has [' + (got.join(', ') || 'none') + ']');
      }
    });
    return out;
  },

  /* ⚠⚠ THE BINDING LAW: no string may name a position. The routine's own
     ordinal, policed in the panel's own language. */
  noOrdinalThird: function (ctx) {
    if (!ctx.obj || ctx.loadError || !THIRD[ctx.loc]) return [];
    var h = hits(ctx.obj, word(THIRD[ctx.loc]));
    return h.length ? ['names a position (the routine\'s own ordinal) at: ' + h.join(', ')] : [];
  },

  /* first / last / second-where-not-a-homonym. ⚠ The *other* homonym is
     EXEMPT BY CONSTRUCTION — sv/da/no/fi carry no `second` in RANK. */
  noOrdinalRank: function (ctx) {
    if (!ctx.obj || ctx.loadError || !RANK[ctx.loc]) return [];
    var h = hits(ctx.obj, word(RANK[ctx.loc]));
    return h.length ? ['names a rank at: ' + h.join(', ')] : [];
  },

  /* no cardinal numeral standing for an ordinal — and no bare digit at
     all, which is the same rule the English gate enforces at L6. Number
     WORDS are permitted (sizeThree/sizeFour are a genuine count). */
  noBareNumeral: function (ctx) {
    if (!ctx.obj || ctx.loadError) return [];
    var h = hits(ctx.obj, /[0-9]/);
    return h.length ? ['prints a bare numeral at: ' + h.join(', ')] : [];
  },

  /* ⚠ A DESIGN RULING, not a naming note: calendar-wall.js:677 already
     ruled the school bus US-coded and the European coach non-iconic, and
     `bus` ships in seven languages in two other tools. */
  noVehicle: function (ctx) {
    if (!ctx.obj || ctx.loadError || !VEHICLE[ctx.loc]) return [];
    var h = hits(ctx.obj, word(VEHICLE[ctx.loc]));
    return h.length ? ['names a vehicle (calendar-wall.js:677 ruling) at: ' + h.join(', ')] : [];
  },

  /* the paid plan is never called "Premium" — 28 tools / 655 occurrences
     name a plan that does not exist. Scoped to THIS file's own prose. */
  noPremiumWord: function (ctx) {
    if (!ctx.obj || ctx.loadError) return [];
    var h = hits(ctx.obj, word('premium'));
    return h.length ? ['writes "Premium" (the plan does not exist) at: ' + h.join(', ')] : [];
  },

  /* ...and it DOES name the shipped one, read out of messages/<loc>.json */
  namesShippedPlan: function (ctx) {
    if (!ctx.obj || ctx.loadError || !ctx.planTag) return [];
    var body = ['lockedTitle', 'lockedBody', 'gateCta'].map(function (k) {
      return typeof ctx.obj[k] === 'string' ? ctx.obj[k] : '';
    }).join(' ').toLowerCase();
    if (!body.trim()) return [];
    return body.indexOf(ctx.planTag.toLowerCase()) === -1
      ? ['the paywall copy does not name the shipped plan "' + ctx.planTag + '"'] : [];
  },

  /* no efficacy claim — the positioning constraint, in every language */
  noEfficacyClaim: function (ctx) {
    if (!ctx.obj || ctx.loadError) return [];
    var re = word('bewiesen|nachweislich|wissenschaftlich\\s+belegt|prouvé|scientifiquement\\s+prouvé|' +
      'comprobado|probado\\s+científicamente|comprovado|dimostrato\\s+scientificamente|' +
      'bewezen|bevisat|bevist|bevist|todistetusti|tieteellisesti\\s+todistettu|' +
      'garantiert|garanti|garantizado|garantito|gegarandeerd|garanterat|garantert|taatusti');
    var h = hits(ctx.obj, re);
    return h.length ? ['makes an efficacy claim at: ' + h.join(', ')] : [];
  },

  /* did the panel rebuild, or did the English survive? */
  notStillEnglish: function (ctx) {
    if (!ctx.obj || ctx.loadError) return [];
    var same = Object.keys(ctx.obj).filter(function (k) {
      return typeof ctx.obj[k] === 'string' && ctx.en[k] !== undefined &&
        ctx.obj[k].trim() === ctx.en[k].trim();
    });
    return same.length ? ['value is byte-identical to the English at: ' + same.join(', ')] : [];
  },

  /* the six button labels share a wrapping flex row that must survive
     320px beside a 17px glyph */
  buttonLabelsShort: function (ctx) {
    if (!ctx.obj || ctx.loadError) return [];
    var out = [];
    BUTTON_KEYS.forEach(function (k) {
      var v = ctx.obj[k];
      if (typeof v === 'string' && v.length > BUTTON_MAX) {
        out.push(k + ' is ' + v.length + ' chars ("' + v + '") — over ' + BUTTON_MAX + ', crowds the 320px row');
      }
    });
    return out;
  }
};

/* ------------------------------------------------------------------ */

function evaluate(obj, loadError, contract, loc, planTag) {
  var ctx = { obj: obj, loadError: loadError, keys: contract.keys, en: contract.en, loc: loc, planTag: planTag };
  var fired = {}, fails = [];
  Object.keys(CHECKS).forEach(function (name) {
    var f = CHECKS[name](ctx) || [];
    fired[name] = f.length > 0;
    f.forEach(function (msg) { fails.push(name + ': ' + msg); });
  });
  return { fails: fails, fired: fired };
}

function loadLocale(loc) {
  var p = path.join(ROOT, 'scripts', '_the-queue-locale-' + loc + '.js');
  if (!fs.existsSync(p)) return { missing: true, file: p };
  try {
    delete require.cache[require.resolve(p)];
    return { obj: require(p), file: p };
  } catch (e) {
    return { loadError: e.message, file: p };
  }
}

/* ------------------------------------------------------------------ */
/* POISON — every check observed FIRING, a CONTROL observed PASSING,    */
/* and every per-locale ban poisoned in BOTH directions.                */
/* ------------------------------------------------------------------ */

function poison(contract, tags) {
  var ok = true;

  /* the synthetic CORRECT file is DERIVED FROM THE ENGLISH so the control
     keeps passing when the English gains or loses a token */
  function goodFor(loc) {
    var g = {};
    contract.keys.forEach(function (k) {
      var v = contract.en[k];
      if (v === undefined) return;
      var tk = (v.match(/\{\w+\}/g) || []).join(' ');
      if (BUTTON_KEYS.indexOf(k) !== -1) { g[k] = 'Xyz ' + k.slice(0, 6); return; }
      g[k] = 'Xyz ' + k + (tk ? ' ' + tk : '');
    });
    /* the paywall keys must name the shipped plan, or the control fails
       on a check that is doing its job */
    ['lockedTitle', 'lockedBody', 'gateCta'].forEach(function (k) {
      if (g[k] !== undefined) g[k] = g[k] + ' — ' + tags[loc];
    });
    return g;
  }

  var keyWithTok = contract.keys.filter(function (k) {
    return contract.en[k] !== undefined && /\{\w+\}/.test(contract.en[k]);
  })[0];
  var keyNoTok = contract.keys.filter(function (k) {
    return contract.en[k] !== undefined && !/\{\w+\}/.test(contract.en[k]);
  })[0];

  console.log('--- POISON: each check must be seen FIRING ---');
  var G = goodFor('de');
  var cases = [
    ['parses',            null, 'boom'],
    ['isPlainObject',     ['not', 'an', 'object'], null],
    ['noUnknownKeys',     Object.assign({}, G, { notAKey: 'x' }), null],
    ['valuesAreStrings',  Object.assign({}, G, { step: '' }), null],
    ['placeholderParity', (function () { var o = Object.assign({}, G); o[keyNoTok] = 'Xyz stray {n} token'; return o; })(), null],
    ['placeholderParity', (function () {
      var o = Object.assign({}, G);
      if (keyWithTok) o[keyWithTok] = 'Xyz with the token removed'; else o[keyNoTok] = 'Xyz another stray {zzz}';
      return o;
    })(), null],
    ['noOrdinalThird',    Object.assign({}, G, { instruction: POISON.de.third }), null],
    ['noOrdinalRank',     Object.assign({}, G, { instruction: POISON.de.rank }), null],
    ['noBareNumeral',     Object.assign({}, G, { sayStepped: 'Schritt 3.' }), null],
    ['noVehicle',         Object.assign({}, G, { board: POISON.de.vehicle }), null],
    ['noPremiumWord',     Object.assign({}, G, { gateCta: 'Premium ansehen' }), null],
    ['namesShippedPlan',  Object.assign({}, G, { lockedTitle: 'Xyz', lockedBody: 'Xyz', gateCta: 'Xyz' }), null],
    ['noEfficacyClaim',   Object.assign({}, G, { lockedBody: 'Nachweislich wirksam im Unterricht.' }), null],
    ['notStillEnglish',   Object.assign({}, G, { title: contract.en.title }), null],
    ['buttonLabelsShort', Object.assign({}, G, { board: 'Einen vom Bahnsteig heruntergehen lassen bitte' }), null]
  ];
  var seen = {};
  cases.forEach(function (c) {
    var r = evaluate(c[1], c[2], contract, 'de', tags.de);
    if (r.fired[c[0]]) { seen[c[0]] = true; console.log('  FIRED   ' + c[0]); }
    else { ok = false; console.log('  !! DID NOT FIRE  ' + c[0] + '  <-- this check cannot fail'); }
  });
  Object.keys(CHECKS).forEach(function (n) {
    if (!seen[n]) { ok = false; console.log('  !! NEVER POISONED  ' + n); }
  });

  /* ⚠ THE CONTROL — without it, a check that fails on EVERYTHING also
     "fires" on every poison and looks perfectly healthy. */
  console.log('--- CONTROL: a synthetic CORRECT file must PASS, per locale ---');
  LOCALES.forEach(function (loc) {
    var r = evaluate(goodFor(loc), null, contract, loc, tags[loc]);
    if (r.fails.length === 0) console.log('  CONTROL ' + loc + '  passes all checks');
    else { ok = false; console.log('  !! CONTROL FAILED ' + loc + ': ' + r.fails.join(' | ')); }
  });

  /* ⚠⚠ EVERY PER-LOCALE BAN, BOTH DIRECTIONS. A ban tested only on
     English is tested in the one language where `\b` happens to work. */
  console.log('--- PER-LOCALE BANS: MUST_FIRE in the policed language, MUST_PASS on correct prose ---');
  LOCALES.forEach(function (loc) {
    var P = POISON[loc];
    [['noOrdinalThird', THIRD[loc], P.third], ['noOrdinalRank', RANK[loc], P.rank], ['noVehicle', VEHICLE[loc], P.vehicle]]
      .forEach(function (row) {
        var re = word(row[1]);
        if (!re.test(row[2])) { ok = false; console.log('  !! ' + loc + ' ' + row[0] + ' DOES NOT FIRE on "' + row[2] + '" — born dead'); }
        if (re.test(P.pass)) { ok = false; console.log('  !! ' + loc + ' ' + row[0] + ' CONDEMNS correct prose: "' + P.pass + '"'); }
      });
    console.log('  ok      ' + loc + '  3 bans fire on a real violation, 0 condemn "' + P.pass.slice(0, 44) + '…"');
  });

  /* ⚠⚠ THE EXEMPTION, POISONED THE OTHER WAY. The *other*-sense homonym
     in sv/da/no/fi must NOT be condemned — the whole point of the trap.
     ⚠ Three of these are words a panel ACTUALLY SHIPPED, not inventions:
     the Norwegian panel named its walker `vandreren`, which CONTAINS the
     substring `andre`; the German `zu dritt` is a count, not a rank; and
     the Italian `prima`/`secondo` are the everyday adverb and preposition.
     A substring ban would condemn all three, and the panel would learn to
     reword around the gate instead of reporting it. */
  console.log('--- EXEMPTIONS: the *other*-sense homonym must survive ---');
  var HOMONYM = {
    sv: 'Ta den andra änden.',
    da: 'Tag den anden ende.',
    no: 'Ta den andre enden. Vandreren står på perrongen.',
    fi: 'Valitse toinen pää.',
    de: 'Sie warten zu dritt auf dem Bahnsteig.',
    it: 'Prima di contare, guarda: secondo me nessuno si è mosso.',
    pt: 'Escolha uma ponta e dê um passo — uma contagem de cada vez.'
  };
  Object.keys(HOMONYM).forEach(function (loc) {
    var g = goodFor(loc);
    g.endRight = HOMONYM[loc];
    var r = evaluate(g, null, contract, loc, tags[loc]);
    if (r.fired.noOrdinalThird || r.fired.noOrdinalRank) {
      ok = false;
      console.log('  !! ' + loc + ' the *other*-sense homonym is CONDEMNED — "' + HOMONYM[loc] + '" (' + ORDINAL_EXEMPTIONS[loc] + ')');
    } else {
      console.log('  ok      ' + loc + '  "' + HOMONYM[loc] + '" accepted — ' + ORDINAL_EXEMPTIONS[loc]);
    }
  });

  console.log(ok ? '\nPOISON: OK\n' : '\nPOISON: BROKEN\n');
  return ok;
}

/* ------------------------------------------------------------------ */

function main() {
  var src = fs.readFileSync(TOOL, 'utf8');
  var contract = readToolKeys(src);
  var tags = readPlanTags();
  console.log('contract: ' + contract.keys.length + ' string keys read off ' +
    path.relative(ROOT, TOOL) + '; ' + Object.keys(tags).length + ' shipped planTags read off messages/\n');

  if (process.argv.indexOf('--poison') !== -1) {
    process.exit(poison(contract, tags) ? 0 : 1);
  }

  var bad = 0, missing = 0;
  LOCALES.forEach(function (loc) {
    var Lf = loadLocale(loc);
    if (Lf.missing) { missing++; console.log('  --    ' + loc + '  (not written yet)'); return; }
    var r = evaluate(Lf.obj, Lf.loadError, contract, loc, tags[loc]);
    var present = Lf.obj ? Object.keys(Lf.obj) : [];
    var held = contract.keys.filter(function (k) { return present.indexOf(k) === -1; });
    if (r.fails.length) {
      bad++;
      console.log('  FAIL  ' + loc + '  (' + present.length + '/' + contract.keys.length + ' keys)');
      r.fails.forEach(function (f) { console.log('          ' + f); });
    } else {
      console.log('  ok    ' + loc + '  (' + present.length + '/' + contract.keys.length + ' keys' +
        (held.length ? ', HELD: ' + held.join(', ') : '') + ')');
    }
  });

  console.log('\n' + (bad ? bad + ' locale file(s) FAILED' : 'all written locale files pass') +
    (missing ? '; ' + missing + ' not yet written' : ''));
  process.exit(bad ? 1 : 0);
}

main();
