/* =====================================================================
   GATE — scripts/_shape-stretcher-locale-check.js
   ---------------------------------------------------------------------
   Validates the ten panel-authored locale files for tool #57 THE SHAPE
   STRETCHER before they are folded into `mini tools/shape-stretcher.js`.

   ⚠⚠ THE KEY LIST IS READ OFF THE TOOL SOURCE, NEVER HARDCODED HERE.
   #42 shipped a registration whose completeness check listed FIVE of
   EIGHT required fields and therefore CERTIFIED an incomplete entry. A
   check that carries its own copy of the field list is testing a copy.
   So `readToolKeys()` parses `strings: { ... }` out of the tool, and

   ⚠ REFUSES TO RUN if it parses implausibly few — the non-vacuity rule
   applied to a field list instead of a NodeList. A regex that silently
   matches nothing would otherwise let every file pass every key check.

   ⚠ The English values are ALSO read off the tool, so the
   "did-not-translate" control cannot drift from what actually ships.

   RUN:      node scripts/_shape-stretcher-locale-check.js
   POISON:   node scripts/_shape-stretcher-locale-check.js --poison
             (must report EVERY check as fired at least once, and must
              report the CONTROL — a synthetic CORRECT file — as PASS)
   ===================================================================== */
'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var TOOL = path.join(ROOT, 'mini tools', 'shape-stretcher.js');
var LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* keys the SHELL consumes rather than the tool — documented exemption
   (#39: `title`/`instruction` are reached through the shell, so a
   source scan of the tool cannot see them being asked for) */
var SHELL_CONSUMED = ['title', 'instruction'];

/* ⚠⚠ AN AUDITABLE EXEMPTION LIST WITH A REASON EACH — NEVER A LOOSENED
   PATTERN. Recorded doctrine: a new gate condemns correct code before it
   catches anything, and the fix is an explicit list, not a widened regex.

   `gateClose` was one of the 32 keys in the tool when the ten panels were
   briefed. Mid-run, one panel edited `mini tools/shape-stretcher.js`
   (a file it was fenced from) and DELETED the key, so panels that read
   the tool early authored 32 and panels that read it late saw 31.
   Without this exemption the gate fails the early panels for "declaring
   a key the tool does not have" — condemning correct work for someone
   else's unauthorised edit. The key is dead either way (declared, zero
   references, no close control built by `_gate()`), so it is accepted
   and reported, never required. */
var ACCEPTED_REMOVED_KEYS = {
  gateClose: 'present at briefing time; deleted mid-run by an unauthorised panel edit; dead in both versions'
};

/* ------------------------------------------------------------------ */
/* read the contract off the artefact                                  */
/* ------------------------------------------------------------------ */

function readToolKeys(src) {
  var m = src.match(/\n\s*strings:\s*\{([\s\S]*?)\n\s*\},\n\s*settings:/);
  if (!m) throw new Error('GATE ABORT: could not locate the strings block in the tool source.');
  var body = m[1];
  var keys = [];
  var en = {};
  var re = /^\s{6}(\w+):\s*\{\s*en:\s*(['"])([\s\S]*?)\2\s*\}/gm;
  var k;
  while ((k = re.exec(body)) !== null) { keys.push(k[1]); en[k[1]] = k[3]; }

  /* ⚠ NON-VACUITY. A regex that matched nothing, or a handful, would
     make every downstream key assertion pass over an empty set. */
  if (keys.length < 20) {
    throw new Error('GATE ABORT: parsed only ' + keys.length +
      ' string keys off the tool — implausible. The gate refuses to run ' +
      'rather than certify against an empty contract.');
  }
  return { keys: keys, en: en };
}

/* ------------------------------------------------------------------ */
/* the checks                                                          */
/* ------------------------------------------------------------------ */

/* Each check returns an array of failure strings. Every one of them is
   poison-tested below — the obvious poison short-circuits at check 1 and
   leaves the rest never observed failing, which is indistinguishable
   from being UNABLE to fail. */
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

  /* no key the tool does not have — except the auditable exemptions */
  noUnknownKeys: function (ctx) {
    if (!ctx.obj) return [];
    var bad = Object.keys(ctx.obj).filter(function (k) {
      return ctx.keys.indexOf(k) === -1 &&
        !Object.prototype.hasOwnProperty.call(ACCEPTED_REMOVED_KEYS, k);
    });
    return bad.length ? ['declares key(s) the tool does not have: ' + bad.join(', ')] : [];
  },

  /* every value is a non-empty string */
  valuesAreStrings: function (ctx) {
    if (!ctx.obj) return [];
    var bad = Object.keys(ctx.obj).filter(function (k) {
      return typeof ctx.obj[k] !== 'string' || ctx.obj[k].trim() === '';
    });
    return bad.length ? ['non-string or empty value at: ' + bad.join(', ')] : [];
  },

  /* ⚠⚠ PLACEHOLDER PARITY, DERIVED FROM THE ENGLISH — NEVER HARDCODED.
     The first version of this check hardcoded "ariaShape3/4 carry {rot}
     exactly once, nobody else carries anything". Then the English
     dropped {rot} from both strings (it announced a degree numeral the
     tool's own refuse-list forbids), and the hardcoded rule inverted
     from correct to backwards in one edit — it would have DEMANDED the
     very token that had just been removed.

     Same disease as a hardcoded key list: a check carrying its own copy
     of the contract is testing a copy. The expected token multiset for
     every key is now read off `ctx.en`, so when the English changes the
     rule changes with it. `_fmt` leaves an unknown token in place, so a
     stray placeholder ships literal braces to a child. */
  placeholderParity: function (ctx) {
    if (!ctx.obj) return [];
    var out = [];
    function toks(s) { return (String(s).match(/\{\w+\}/g) || []).slice().sort(); }
    Object.keys(ctx.obj).forEach(function (k) {
      var v = ctx.obj[k];
      if (typeof v !== 'string') return;
      if (ctx.en[k] === undefined) return;          /* exempted/removed key */
      var want = toks(ctx.en[k]), got = toks(v);
      if (want.join('|') !== got.join('|')) {
        out.push(k + ' placeholder mismatch — English has [' +
          (want.join(', ') || 'none') + '], this file has [' +
          (got.join(', ') || 'none') + ']');
      }
    });
    return out;
  },

  /* ⚠ the paid plan is never called "Premium" — recorded shelf-wide
     defect, 28 tools / 655 occurrences naming a plan that does not
     exist. Scoped to THIS file's own prose, so no sibling can trip it. */
  noPremiumWord: function (ctx) {
    if (!ctx.obj) return [];
    var hits = Object.keys(ctx.obj).filter(function (k) {
      return typeof ctx.obj[k] === 'string' && /(?:^|[^\p{L}])premium(?![\p{L}])/iu.test(ctx.obj[k]);
    });
    return hits.length ? ['writes "Premium" (the plan does not exist) at: ' + hits.join(', ')] : [];
  },

  /* ⚠ no degree numeral in the copy — the tool's own binding
     refuse-list. Matches a digit followed by a degree sign or a
     degree word in any of the ten languages. */
  noDegreeNumeral: function (ctx) {
    if (!ctx.obj) return [];
    var re = /\d\s*(?:°|grad|grader|graden|gradi|graus|grados|degr|astet|asteen|astetta)/i;
    var hits = Object.keys(ctx.obj).filter(function (k) {
      return typeof ctx.obj[k] === 'string' && re.test(ctx.obj[k]);
    });
    return hits.length ? ['carries a degree numeral (refuse-list) at: ' + hits.join(', ')] : [];
  },

  /* did the panel actually rebuild, or did English survive?
     Shell-consumed keys are exempt from nothing here — an English
     `title` is still an untranslated title. */
  notStillEnglish: function (ctx) {
    if (!ctx.obj) return [];
    var same = Object.keys(ctx.obj).filter(function (k) {
      return typeof ctx.obj[k] === 'string' && ctx.en[k] !== undefined &&
        ctx.obj[k].trim() === ctx.en[k].trim();
    });
    return same.length ? ['value is byte-identical to the English at: ' + same.join(', ')] : [];
  },

  /* track labels squeeze the rail: .shp-tlabel{min-width:72px;
     font-size:14px} sits in a flex row beside the rail */
  trackLabelsShort: function (ctx) {
    if (!ctx.obj) return [];
    var out = [];
    ['lenLabel', 'skewLabel', 'turnLabel'].forEach(function (k) {
      var v = ctx.obj[k];
      if (typeof v === 'string' && v.length > 16) {
        out.push(k + ' is ' + v.length + ' chars ("' + v + '") — squeezes the rail');
      }
    });
    return out;
  }
};

/* ------------------------------------------------------------------ */

function evaluate(obj, loadError, contract) {
  var ctx = { obj: obj, loadError: loadError, keys: contract.keys, en: contract.en };
  var fired = {};
  var fails = [];
  Object.keys(CHECKS).forEach(function (name) {
    var f = CHECKS[name](ctx) || [];
    fired[name] = f.length > 0;
    f.forEach(function (msg) { fails.push(name + ': ' + msg); });
  });
  return { fails: fails, fired: fired };
}

function loadLocale(loc) {
  var p = path.join(ROOT, 'scripts', '_shape-stretcher-locale-' + loc + '.js');
  if (!fs.existsSync(p)) return { missing: true, file: p };
  try {
    delete require.cache[require.resolve(p)];
    return { obj: require(p), file: p };
  } catch (e) {
    return { loadError: e.message, file: p };
  }
}

/* ------------------------------------------------------------------ */
/* POISON — every check must be observed FAILING, and a CONTROL must    */
/* be observed PASSING. Otherwise a check that cannot fail is           */
/* indistinguishable from one that found nothing.                       */
/* ------------------------------------------------------------------ */

function poison(contract) {
  /* ⚠ THE SYNTHETIC CORRECT FILE IS ALSO DERIVED FROM THE ENGLISH.
     It reproduces each key's placeholder multiset exactly, so the
     control keeps passing when the English gains or loses a token. */
  var good = {};
  contract.keys.forEach(function (k) {
    var v = contract.en[k];
    if (v === undefined) return;
    var tk = (v.match(/\{\w+\}/g) || []).join(' ');
    good[k] = (['lenLabel', 'skewLabel', 'turnLabel'].indexOf(k) !== -1)
      ? 'Xyz'
      : ('Xyz ' + k + (tk ? ' ' + tk : ''));
  });

  /* a key that carries tokens in English (if any) and one that does not —
     so the parity poison fires whichever way the English currently sits */
  var keyWithTok = contract.keys.filter(function (k) {
    return contract.en[k] !== undefined && /\{\w+\}/.test(contract.en[k]);
  })[0];
  var keyNoTok = contract.keys.filter(function (k) {
    return contract.en[k] !== undefined && !/\{\w+\}/.test(contract.en[k]);
  })[0];

  var cases = [
    ['parses',            null, 'boom'],
    ['isPlainObject',     ['not', 'an', 'object'], null],
    ['noUnknownKeys',     Object.assign({}, good, { notAKey: 'x' }), null],
    ['valuesAreStrings',  Object.assign({}, good, { deal: '' }), null],
    /* adds a stray token where English has none — must fire */
    ['placeholderParity', (function () {
      var o = Object.assign({}, good);
      o[keyNoTok] = 'Xyz stray {rot} token';
      return o;
    })(), null],
    /* drops the tokens where English HAS some — only constructible when
       the English actually carries one; skipped cleanly otherwise, and
       the stray-token case above still exercises the check */
    ['placeholderParity', (function () {
      var o = Object.assign({}, good);
      if (keyWithTok) o[keyWithTok] = 'Xyz with the token removed';
      else o[keyNoTok] = 'Xyz another stray {zzz}';
      return o;
    })(), null],
    ['noPremiumWord',     Object.assign({}, good, { gateCta: 'Ver el plan Premium' }), null],
    ['noDegreeNumeral',   Object.assign({}, good, { saidTurn: 'Gedreht um 90 Grad.' }), null],
    ['notStillEnglish',   Object.assign({}, good, { saidPop: contract.en.saidPop }), null],
    ['trackLabelsShort',  Object.assign({}, good, { skewLabel: 'Schuintrekkenrichting' }), null]
  ];

  console.log('--- POISON (each check must be seen FIRING) ---');
  var seen = {};
  var ok = true;
  cases.forEach(function (c) {
    var r = evaluate(c[1], c[2], contract);
    if (r.fired[c[0]]) { seen[c[0]] = true; console.log('  FIRED  ' + c[0]); }
    else { ok = false; console.log('  !! DID NOT FIRE  ' + c[0] + '  <-- this check cannot fail'); }
  });
  Object.keys(CHECKS).forEach(function (n) {
    if (!seen[n]) { ok = false; console.log('  !! NEVER POISONED  ' + n); }
  });

  /* ⚠ THE CONTROL. Without it, a check that fails on EVERYTHING also
     "fires" on every poison and looks healthy. */
  var ctrl = evaluate(good, null, contract);
  if (ctrl.fails.length === 0) {
    console.log('  CONTROL  a synthetic CORRECT file passes all checks — good');
  } else {
    ok = false;
    console.log('  !! CONTROL FAILED — the gate condemns correct input:');
    ctrl.fails.forEach(function (f) { console.log('       ' + f); });
  }

  /* ⚠⚠ THE SECOND CONTROL — the exemption poisoned the OTHER WAY.
     A narrowed rule tested in one direction only is how the
     ban-too-wide defect keeps recurring: `noUnknownKeys` must FIRE on a
     genuine unknown key (above) AND must NOT fire on `gateClose`, which
     the early panels were correctly briefed to author. */
  Object.keys(ACCEPTED_REMOVED_KEYS).forEach(function (k) {
    var withRemoved = Object.assign({}, good);
    withRemoved[k] = 'Xyz ' + k;
    var r2 = evaluate(withRemoved, null, contract);
    if (r2.fired.noUnknownKeys) {
      ok = false;
      console.log('  !! CONTROL FAILED — exemption "' + k + '" is not honoured; ' +
        'the gate condemns a key the panels were briefed to author');
    } else {
      console.log('  CONTROL  exempted key "' + k + '" accepted, not condemned — good');
    }
  });
  console.log(ok ? '\nPOISON: OK\n' : '\nPOISON: BROKEN\n');
  return ok;
}

/* ------------------------------------------------------------------ */

function main() {
  var src = fs.readFileSync(TOOL, 'utf8');
  var contract = readToolKeys(src);
  console.log('contract: ' + contract.keys.length + ' string keys read off ' +
    path.relative(ROOT, TOOL) + '\n');

  if (process.argv.indexOf('--poison') !== -1) {
    process.exit(poison(contract) ? 0 : 1);
  }

  var bad = 0, missing = 0;
  LOCALES.forEach(function (loc) {
    var L = loadLocale(loc);
    if (L.missing) { missing++; console.log('  --  ' + loc + '  (not written yet)'); return; }
    var r = evaluate(L.obj, L.loadError, contract);
    var present = L.obj ? Object.keys(L.obj) : [];
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
