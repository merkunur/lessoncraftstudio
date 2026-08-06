#!/usr/bin/env node
/* =====================================================================
   apply-calendar-wall-locales.js — write calendar-wall's strings block
   from the SoT.
   ---------------------------------------------------------------------
   Run:  node scripts/apply-calendar-wall-locales.js [--dry-run] [--brief]

   Rewrites the whole `strings: { ... }` block in `mini tools/calendar-wall.js`
   from `scripts/_calendar-wall-strings.js`. Idempotent: running it twice
   changes nothing the second time.

   --brief  prints the native-panel work list (the `draft: true` keys)
            instead of writing anything.

   IT REFUSES TO WRITE rather than ship a defect:
     · a missing or empty key in any of the eleven locales
     · a key present in one locale and absent in another
     · a non-EN string identical to the English (an untranslated leak),
       except for the small, EXPLICIT list of keys that are legitimately
       identical (a bare numeral is a bare numeral in every language)
     · a placeholder present in `en` and lost in another locale, or one
       invented that `en` does not have
     · a digit standing where a placeholder belongs
     · a VERDICT, a SCORE or a STREAK  (§20.4: none of these exist here)
     · A UNIT SMALLER THAN A DAY — the permanent tripwire from the tool's
       own header. `learning-clock` and six clock engines own the hour
       scale; this tool's unit is the day. If a string ever says "hour"
       or "minute" the tool has become the clock's object.

   ⭐⭐ EVERY BAN IS POISON-TESTED IN BOTH DIRECTIONS, and that is not
   ceremony. This programme has now recorded FOUR separate occasions where
   a newly written ban condemned CORRECT native prose — `Zufallsbeutel`
   rejected for containing the German word for chance, `par` rejected as
   French, "how many cubes TALL" rejected by a height ban, `dessinée en
   volume` rejected by a volume ban. A ban that rejects correct writing
   does not protect the product; it teaches the next panel to write around
   the checker instead of reporting it. So each rule below carries a
   MUST_FIRE example and a MUST_PASS example, and `--self-test` runs them.

   ⚠ `\b` IS ASCII-ONLY, which is the one mistake that makes a ban in
   these languages silently dead. `\btässä\b` can never match, and `\btime\b`
   misses the Norwegian plural `timer`. Every boundary here is written
   with the Unicode lookaround pair instead.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'mini tools', 'calendar-wall.js');
const SoT = require('./_calendar-wall-strings.js');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* keys that are legitimately identical across locales — an EXPLICIT,
   auditable list with a reason each, never a loosened comparison */
const SAME_IS_FINE = {
  setWeather6: 'a bare numeral is the same numeral in every language',
  dockCalendar: 'the international Latin root; every panel independently chose it',
  /* ⚠ CAUGHT BY THE CHECK ON ITS FIRST RUN, and it is the check working
     rather than the check being wrong. `cellAria` is "{d}. {state}" —
     two placeholders and a full stop, with every actual word supplied by
     OTHER keys. There is nothing in it to translate. An entry here is an
     EXEMPTION WITH A REASON, which is the only honest way to answer a
     ban that has fired on correct data; loosening the comparison so it
     stops noticing would have hidden the next real leak. */
  cellAria: 'two placeholders and a full stop; every word comes from another key',
};

/* ---- the bans. Each: id, per-locale patterns, and BOTH poison cases. -- */
function W(body, flags) {
  /* Unicode-safe word boundary: no letter either side. */
  return new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', (flags || '') + 'iu');
}

const BANS = [
  {
    id: 'sub-day-unit',
    why: 'the permanent tripwire: this tool\'s unit is the DAY. learning-clock owns the hour.',
    /* per-locale, because the words differ and because a single global
       pattern would have to be so wide it would condemn correct prose */
    re: {
      en: W('hours?|minutes?|seconds?|o.clock'),
      de: W('stunden?|minuten?|sekunden?|uhrzeit'),
      fr: W('heures?|minutes?|secondes?'),
      /* ⭐ ITALIAN `ora` IS A HOMOGRAPH AND THE FIRST VERSION OF THIS BAN
         CONDEMNED CORRECT PROSE FOR IT. `ora` is the hour AND the adverb
         "now", so "Contiamoli insieme ora" — count them together now —
         failed a rule written to keep clocks out. The plural `ore` is
         unambiguous, so it stays bare; the singular is only banned where
         a quantity makes the unit sense certain (`due ore`, `un'ora`,
         `mezz'ora`). That leaves a bare adverbial `ora` uncovered, which
         is the honest trade: a NARROWER ban that is right beats a wider
         one that punishes the Italian panel for writing Italian. */
      it: W('ore|minuti?|secondi?|orologio|(?:\\d+\\s*|un[\'’]|mezz[\'’])ora'),
      es: W('horas?|minutos?|segundos?'),
      pt: W('horas?|minutos?|segundos?'),
      nl: W('uur|uren|minuut|minuten|seconden?'),
      sv: W('timmar?|timme|minuter?|sekunder?|klockan'),
      da: W('timer?|time|minutter?|sekunder?|klokken'),
      no: W('timer?|time|minutter?|sekunder?|klokka|klokken'),
      fi: W('tunti|tunnin|tuntia|minuutti|minuuttia|sekunti|sekuntia|kello'),
    },
    mustFire: { de: 'In zwei Stunden', no: 'om to timer', fi: 'kaksi tuntia',
                it: 'fra due ore', es: 'en dos horas', da: 'om to timer' },
    /* ⚠ THE MUST_PASS CASES ARE THE POINT. `Geburtstag` contains no unit
       but `Sekundär-` would; Italian `ora` is also the adverb "now" and
       Spanish `ahora` contains it — the lookarounds are what keep those
       out. If any of these ever fires, the ban is too wide and the FIX IS
       THE PATTERN, never the example. */
    mustPass: { it: 'Contiamoli insieme ora', es: 'Ahora contamos los días', de: 'Geburtstag', no: 'Tell dem sammen', fi: 'Lasketaan yhdessä' },
  },
  {
    id: 'verdict-or-score',
    why: 'operator-locked: no timer, no score, no streak, no verdict anywhere in the catalog.',
    re: {
      /* ⭐⭐ BAN-TOO-WIDE, FOURTH TIME IN THIS PROGRAMME, AND THIS ONE
         CONDEMNED THE MOST IMPORTANT SENTENCE IN THE TOOL. A bare
         `points?` matched "the month your class can point AT" — the verb
         this whole rebuild exists to make possible, since the shipped
         build's defect was that a teacher could NOT point at the
         eighteenth. English `point` is a verb, a dot, and a unit of
         score; only the last is forbidden, and only the last takes a
         number in front of it. Same trap in French, where `point` is
         also the full stop and "à ce point". The scoring sense keeps its
         own word (`score`) unqualified. */
      en: W('correct|wrong|scores?|streaks?|well done|\\d+\\s*points?'),
      de: W('richtig|falsch|punkte|punktzahl|serie'),
      fr: W('correct|correcte|faux|score|série|\\d+\\s*points?'),
      it: W('corretto|sbagliato|punteggio|punti'),
      es: W('correcto|incorrecto|puntaje|puntos'),
      pt: W('correto|errado|pontuação|pontos'),
      nl: W('goed zo|fout|score|punten'),
      sv: W('rätt|fel|poäng'),
      da: W('rigtigt|forkert|poæng|point'),
      no: W('riktig|feil|poeng'),
      fi: W('oikein|väärin|pisteet|pisteitä'),
    },
    mustFire: { en: 'You scored 8 points', de: 'Das ist richtig', sv: 'Rätt svar',
                fr: 'Tu as 8 points' },
    /* ⚠ THE TWO `point` CASES BELOW ARE THE POISON THAT CAUGHT THIS
       BAN BEING TOO WIDE, and they stay so it can never widen again.
       The English one is the tool's own instruction string. */
    mustPass: { en: 'The month your class can point at', de: 'Schulfrei',
                sv: 'Ingen skola', fi: 'Ei koulua',
                fr: 'Le mois que ta classe peut pointer du doigt' },
  },
  {
    id: 'countdown-arrow',
    why: 'cold-line refuse #2, adopted verbatim: position and distance only, never a drawn jump.',
    re: {
      en: W('jump|hop|arrow|leap'),
      de: W('sprung|sprünge|pfeil'),
      fr: W('saut|sauts|flèche'),
      it: W('salto|salti|freccia'),
      es: W('salto|saltos|flecha'),
      pt: W('salto|saltos|seta'),
      nl: W('sprong|sprongen|pijl'),
      sv: W('hopp|pil'),
      da: W('hop|pil'),
      no: W('hopp|pil'),
      fi: W('hyppy|hypyt|nuoli'),
    },
    mustFire: { en: 'Jump to the day', no: 'Hopp til dagen' },
    mustPass: { en: 'Count them together', fi: 'Lasketaan yhdessä', da: 'Tæl dem sammen' },
  },
];

/* ===================================================================== */
function validate() {
  const errors = [];
  const keys = Object.keys(SoT);
  if (!keys.length) { errors.push('the SoT is empty'); return errors; }

  for (const k of keys) {
    const e = SoT[k];
    if (!e || typeof e !== 'object') { errors.push(k + ': not an object'); continue; }

    for (const L of LOCALES) {
      const v = e[L];
      if (v === undefined) { errors.push(k + '.' + L + ': MISSING'); continue; }
      if (typeof v !== 'string' || !v.trim()) { errors.push(k + '.' + L + ': empty'); continue; }
      if (L !== 'en' && v === e.en && !SAME_IS_FINE[k]) {
        errors.push(k + '.' + L + ': identical to the English (untranslated leak)');
      }
      const b = BANS.filter(B => B.re[L] && B.re[L].test(v));
      for (const B of b) errors.push(k + '.' + L + ': banned (' + B.id + ') in "' + v + '"');
    }

    const enPh = ((e.en || '').match(/\{\w+\}/g) || []).slice().sort().join(',');
    for (const L of LOCALES) {
      if (typeof e[L] !== 'string') continue;
      const ph = (e[L].match(/\{\w+\}/g) || []).slice().sort().join(',');
      if (ph !== enPh) errors.push(k + '.' + L + ': placeholders "' + ph + '" != en "' + enPh + '"');
      /* a digit where a placeholder belongs */
      if (enPh.indexOf('{n}') >= 0 && /(?<!\p{L})\d+(?!\p{L})/u.test(e[L].replace(/\{\w+\}/g, ''))) {
        errors.push(k + '.' + L + ': a literal digit stands where {n} belongs');
      }
    }
  }
  return errors;
}

function selfTest() {
  let bad = 0;
  console.log('poisoning ' + BANS.length + ' bans in BOTH directions\n');
  for (const B of BANS) {
    for (const L of Object.keys(B.mustFire)) {
      const hit = B.re[L] && B.re[L].test(B.mustFire[L]);
      console.log('  ' + (hit ? 'fires  ' : 'MISSED ') + B.id + ' [' + L + '] "' + B.mustFire[L] + '"');
      if (!hit) bad++;
    }
    for (const L of Object.keys(B.mustPass)) {
      const hit = B.re[L] && B.re[L].test(B.mustPass[L]);
      console.log('  ' + (hit ? 'TOO WIDE ' : 'passes ') + B.id + ' [' + L + '] "' + B.mustPass[L] + '"');
      if (hit) bad++;
    }
  }
  console.log('\n' + (bad ? 'SELF-TEST FAIL (' + bad + ')' : 'SELF-TEST PASS — every ban fires on its defect and spares correct prose'));
  return bad;
}

function render() {
  const lines = ['  strings: {'];
  const keys = Object.keys(SoT);
  keys.forEach(function (k, i) {
    const e = SoT[k];
    const parts = LOCALES.map(L => L + ':' + JSON.stringify(e[L]));
    lines.push('    ' + k + ': {' + parts.join(',') + '}' + (i === keys.length - 1 ? '' : ','));
  });
  lines.push('  },');
  return lines.join('\n');
}

function braceEnd(s, from) {
  let i = s.indexOf('{', from), depth = 0, quote = null, cmt = null;
  for (; i < s.length; i++) {
    const c = s[i], n = s[i + 1];
    if (cmt === 'block') { if (c === '*' && n === '/') { cmt = null; i++; } continue; }
    if (cmt === 'line') { if (c === '\n') cmt = null; continue; }
    if (quote) { if (c === '\\') { i++; continue; } if (c === quote) quote = null; continue; }
    if (c === '/' && n === '*') { cmt = 'block'; i++; continue; }
    if (c === '/' && n === '/') { cmt = 'line'; i++; continue; }
    if (c === '"' || c === "'") { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

/* ---- main ---- */
const argv = process.argv.slice(2);
if (argv.indexOf('--self-test') >= 0) process.exit(selfTest() ? 1 : 0);

if (argv.indexOf('--brief') >= 0) {
  const drafts = Object.keys(SoT).filter(k => SoT[k].draft);
  console.log('NATIVE-PANEL WORK LIST — ' + drafts.length + ' of ' + Object.keys(SoT).length + ' keys\n');
  for (const k of drafts) console.log('  ' + k.padEnd(18) + JSON.stringify(SoT[k].en));
  process.exit(0);
}

if (selfTest()) { console.error('\nrefusing to run: a ban is broken'); process.exit(1); }
console.log('');

const errors = validate();
if (errors.length) {
  console.error('REFUSING TO WRITE — ' + errors.length + ' problem(s):');
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}

let src = fs.readFileSync(TOOL, 'utf8');
const at = src.indexOf('  strings: {');
if (at < 0) { console.error('REFUSING TO WRITE: no `strings: {` block in ' + TOOL); process.exit(1); }
const end = braceEnd(src, at);
if (end < 0) { console.error('REFUSING TO WRITE: unbalanced strings block'); process.exit(1); }
/* swallow the trailing comma the block already carries */
let tail = end + 1;
if (src[tail] === ',') tail++;

const next = src.slice(0, at) + render() + src.slice(tail);
const changed = next !== src;

if (argv.indexOf('--dry-run') >= 0) {
  console.log((changed ? 'WOULD REWRITE' : 'no change') + ' — ' + Object.keys(SoT).length + ' keys x ' + LOCALES.length + ' locales');
  process.exit(0);
}
if (changed) fs.writeFileSync(TOOL, next, 'utf8');
const drafts = Object.keys(SoT).filter(k => SoT[k].draft).length;
console.log((changed ? 'WROTE' : 'already current') + ' — ' + Object.keys(SoT).length + ' keys x ' + LOCALES.length +
            ' locales, ' + drafts + ' awaiting a native panel');
