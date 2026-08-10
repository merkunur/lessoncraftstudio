/* Verifier for scripts/_pair-gate-strings.js.
   ⚠ The key list is read DYNAMICALLY off the tool, never written down here
   (the #52 lesson: a re-scoped string was caught exactly this way).
   ⚠ Every ban is poison-tested in BOTH directions — a must-fire string AND
   a must-pass string — so a ban that is too wide is caught as loudly as one
   that is too narrow. Run:  node scripts/_pair-gate-verify-strings.js       */
'use strict';
var TOOL = require('../mini tools/pair-gate.js');
var SETS = require('./_pair-gate-strings.js');
var LOCS = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
var fails = 0, checks = 0;
function ok(c, m) { checks++; if (!c) { fails++; console.log('  FAIL  ' + m); } }

/* --- non-vacuity first: a key list of implausible length means the read
       failed, and every parity check below would then be hollow --------- */
var KEYS = Object.keys(TOOL.strings);
if (KEYS.length < 20) { console.log('ABORT: read only ' + KEYS.length + ' keys off the tool'); process.exit(1); }
console.log('read ' + KEYS.length + ' keys dynamically off mini tools/pair-gate.js\n');

function ph(s) { var m = String(s).match(/\{\w+\}/g) || []; return m.slice().sort().join(''); }

/* the ban list. `re` must fire, `pass` must NOT — both asserted below. */
var BANS = [
  /* platform-owned, all locales */
  { name: 'gate-as-part', re: /(?<!\p{L})(gate|Tor|Tore|Pforte|poort|portti|portal|portaali|puerta|porta|porte|port|portti)(?!\p{L})/iu,
    fire: 'Das Tor ist offen', pass: 'Der Rundbogen ist offen' },
  { name: 'pair/even', re: /(?<!\p{L})(pair|paire|par|pari|Paar|paar|par(?:et|en))(?!\p{L})/iu,
    fire: 'Ce nombre est pair', pass: 'Ce nombre passe' },
  { name: 'row-word', re: /(?<!\p{L})(Reihe|Reihen|rangée|rangées|fila|filas|rij|rijen|rad|rader|række|rækker|rekke|rekker|rivi|rivit|jono)(?!\p{L})/iu,
    fire: 'in Reihen zu zwei', fire2: 'op een rij', pass: 'nebeneinander' },
  { name: 'counter', re: /(?<!\p{L})(Wendeplättchen|jeton|jetons|ficha|fichas|gettone|gettoni|fiche|fiches|bricka|brickor|brik|brikker|laskunappi|laskunapit)(?!\p{L})/iu,
    fire: 'lägg en bricka', pass: 'lägg en marscherare' },
  { name: 'bench', re: /(?<!\p{L})(bänk\w*|bænk\w*|benk\w*|penkki\w*|banco|banchi|Werkbank|werkbank)(?!\p{L})/iu,
    fire: 'på bänken', pass: 'på bordet' },
  { name: 'file(arrow-strip fr)', re: /(?<!\p{L})(file|files)(?!\p{L})/iu,
    fire: 'la file qui attend', pass: 'le défilé qui attend' },
  { name: 'door(number-hotel)', re: /(?<!\p{L})(Tür\w*|deur\w*|dør\w*|dörr\w*|ovi|ovet|ovelle|puerta\w*|porta|porte)(?!\p{L})/iu,
    fire: 'die Tür geht auf', pass: 'der Sims ist frei' },
  /* a NOUN for the one left behind — the drawing exists to remove that verdict */
  { name: 'loner-noun', re: /(?<!\p{L})(loner|Einzelgänger|Übriggebliebene\w*|Stehengebliebene\w*|solitario|solitaire|overskyder\w*|ylijäämä\w*)(?!\p{L})/iu,
    fire: 'die Stehengebliebenen kommen drauf', pass: 'die, die stehen geblieben sind, kommen drauf' },
  /* the arch word every locale already spends on number-line's jump arcs */
  { name: 'taken-arch', re: /(?<!\p{L})(Bogen|Bögen|arc|arcs|arco|arcos|archi|boog|bogen|båge|bågen|bue|buen|kaari|kaaren)(?!\p{L})/iu,
    fire: 'der Bogen ist offen', pass: 'der Rundbogen ist offen' },
  /* de only: track-repair's railway sleeper */
  { name: 'de-Schwelle', loc: 'de', re: /(?<!\p{L})Schwelle\w*(?!\p{L})/iu,
    fire: 'auf die Schwelle stellen', pass: 'auf den Sims stellen' },
  /* fi only: number-hotel's corridor. ⚠ NO left boundary — Finnish
     compounds, so the collision hides inside `holvikäytävä`, and the
     left-anchored form let exactly that through when poisoned. */
  { name: 'fi-käytävä', loc: 'fi', re: /käytäv\p{L}*/iu,
    fire: 'holvikäytävästä läpi', fire2: 'käytävällä', pass: 'holvista läpi' }
];

console.log('--- poison: every ban must FIRE on a violation and PASS a correct string ---');
BANS.forEach(function (b) {
  ok(b.re.test(b.fire), 'ban "' + b.name + '" did NOT fire on: ' + b.fire);
  if (b.fire2) ok(b.re.test(b.fire2), 'ban "' + b.name + '" did NOT fire on: ' + b.fire2);
  ok(!b.re.test(b.pass), 'ban "' + b.name + '" is TOO WIDE — condemned: ' + b.pass);
});
console.log('  ' + (fails ? fails + ' poison failures' : 'all ' + BANS.length + ' bans fire and none is too wide'));

/* poison the parity checks themselves */
console.log('\n--- poison: parity checks must fail on a synthetic defect ---');
(function () {
  var f0 = fails;
  var bogus = JSON.parse(JSON.stringify(SETS.de));
  delete bogus.saidSill; bogus.saidRank = 'X {n} Y';               /* dropped key + dropped {w} */
  KEYS.forEach(function (k) {
    if (!(k in bogus)) { fails++; }
    else if (ph(bogus[k]) !== ph(TOOL.strings[k].en)) { fails++; }
  });
  var caught = fails - f0; fails = f0;
  ok(caught >= 2, 'parity check did not catch the synthetic defect (caught ' + caught + ')');
  console.log('  synthetic missing-key + missing-placeholder caught ' + caught + ' times');
})();

console.log('\n--- the real sets ---');
LOCS.forEach(function (loc) {
  var s = SETS[loc], f0 = fails;
  ok(!!s, loc + ': locale missing entirely');
  if (!s) return;
  var mine = Object.keys(s);
  ok(mine.length === KEYS.length, loc + ': has ' + mine.length + ' keys, tool has ' + KEYS.length);
  KEYS.forEach(function (k) {
    ok(k in s, loc + ': missing key ' + k);
    if (!(k in s)) return;
    ok(ph(s[k]) === ph(TOOL.strings[k].en),
      loc + '.' + k + ': placeholders ' + (ph(s[k]) || '(none)') + ' ≠ EN ' + (ph(TOOL.strings[k].en) || '(none)'));
    ok(String(s[k]).trim().length > 0, loc + ': empty ' + k);
  });
  mine.forEach(function (k) { ok(KEYS.indexOf(k) >= 0, loc + ': extra key ' + k); });
  BANS.forEach(function (b) {
    if (b.loc && b.loc !== loc) return;
    KEYS.forEach(function (k) {
      if (!(k in s)) return;
      /* the paywall KEY NAMES are the platform's own and are not part names */
      if (b.name === 'gate-as-part' && /^gate/.test(k)) return;
      var m = String(s[k]).match(b.re);
      ok(!m, loc + '.' + k + ': banned "' + b.name + '" → ' + (m && m[0]) + '  in: ' + s[k]);
    });
  });
  console.log('  ' + loc + (fails === f0 ? '  clean' : '  ' + (fails - f0) + ' FAILURES'));
});

/* plan name must match messages/<loc>.json homepageV6.planTag verbatim */
console.log('\n--- paid plan name vs homepageV6.planTag ---');
LOCS.forEach(function (loc) {
  var tag = require('../frontend/messages/' + loc + '.json').homepageV6.planTag;
  var hit = String(SETS[loc].gateBody + ' ' + SETS[loc].gateCta).indexOf(tag) >= 0;
  ok(hit, loc + ': planTag "' + tag + '" appears in neither gateBody nor gateCta');
  console.log('  ' + loc + '  ' + tag + (hit ? '  ✓' : '  ✗'));
});

console.log('\n' + (fails ? 'FAIL — ' + fails + ' of ' + checks : 'PASS — all ' + checks) + ' assertions');
process.exit(fails ? 1 : 0);
