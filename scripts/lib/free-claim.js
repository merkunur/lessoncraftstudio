/**
 * free-claim.js — the shared "this claims to be free" detector for VISIBLE
 * copy. Operator ruling 2026-09-14: "Because free tier allows 3 pdf download
 * monthly, 'free printable' meta data is right but it shouldn't be anywhere the
 * user can see." So SEO metadata (<title>, <meta description>, OG, JSON-LD,
 * topicMeta) MAY say it; the printed sheet (title strip, instruction, footer),
 * a landing's h1 / eyebrow / strand / p1-p3, hub cards and chips MAY NOT.
 *
 * The regexes are the ones scripts/verify-activity-prose-claims.js proved on
 * the activity corpus: `(?<!\p{L})…(?!\p{L})`, never \b or \w (both ASCII-only
 * — `käytettäv\w*` can never match `käytettävissä`); bare `frei` / `vrij` /
 * `fritt` are NOT banned (pedagogy: "explore freely", "freies Erzählen"), only
 * the PRICE words and the CARRIER collocations. Every consumer runs
 * `selfTest()` first — a ban is only trusted when it fires on MUST_FIRE and
 * stays silent on MUST_PASS in the same run.
 *
 *   hit(text) → the matched claim or null
 *   selfTest() → throws on any direction failing
 */
'use strict';

const PRICE = new RegExp(
  '(?<!\\p{L})(' +
  'free|' +
  'kostenlos\\p{L}*|kostenfrei\\p{L}*|umsonst|' +
  'gratis|gratuit\\p{L}*|grátis|' +
  // fi: the PRICE lemma ilmainen only (ilmainen / ilmaisen / ilmaiset / ilmaisia / ilmaiseksi …) — NOT
  // ilmaisu / ilmaista 'to express' / ilmaiseminen, core esiopetus pedagogy words the wide
  // `ilmais\\p{L}*` condemned in correct prose (fi Q2/Q4 landing panels, 2026-09-20); the partitive
  // `ilmaista` is the same string as the verb and stays OUT of the ban (a must-pass below)
  'ilmainen|ilmaisen|ilmaiset|ilmaisia|ilmaisiin|ilmaisissa|ilmaisista|ilmaisille|ilmaisilla|ilmaisilta|ilmaisiksi|ilmaiseksi|ilmaisina|ilmaisten|' +
  'maksuton\\p{L}*|maksutta|veloitukse\\p{L}*|' +
  'kostnadsfri\\p{L}*|vederlagsfri\\p{L}*|kosteloos|kosteloze' +
  ')(?!\\p{L})', 'iu');

const CARRIER = new RegExp(
  '(?<!\\p{L})(' +
  'frei\\s+(?:zugänglich|spielbar|nutzbar|für\\s+alle)|' +
  'vrij\\s+(?:toegankelijk|om\\s+te\\s+spelen)|' +
  'vapaasti\\s+käytettäv\\p{L}*|' +
  'fritt\\s+tillgänglig\\p{L}*|fritt\\s+tilgjengelig\\p{L}*|frit\\s+tilgængelig\\p{L}*|' +
  'sin\\s+costo|de\\s+balde|no\\s+cuesta\\s+nada|' +
  'sem\\s+custo|a\\s+custo\\s+zero|' +
  'senza\\s+costi|a\\s+costo\\s+zero|' +
  'sans\\s+frais|à\\s+titre\\s+gracieux|' +
  'at\\s+no\\s+cost|free\\s+of\\s+charge|costs\\s+nothing' +
  ')(?!\\p{L})', 'iu');

const MUST_FIRE = [
  'Free printable letter worksheet.',
  'Kostenloses Arbeitsblatt zum Ausdrucken.',
  'Dieses Blatt ist frei zugänglich.',
  'Fiche gratuite à imprimer.',
  'Ficha gratis para imprimir.',
  'Atividade gratuita para imprimir.',
  'Scheda gratuita da stampare.',
  'Gratis werkblad om te printen.',
  'Dit blad is vrij om te spelen.',
  'Gratis arbetsblad att skriva ut.',
  'Gratis arbejdsark til print.',
  'Gratis arbeidsark til utskrift.',
  'Ilmainen tulostettava tehtävä.',
  'Tehtävä on maksuton.',
  'Lataa ilmaiseksi.',
  'Ilmaiset monisteet esikouluun.',
  'Tehtävä on vapaasti käytettävissä.',
  'Available at no cost.',
];
const MUST_PASS = [
  'Circle the four pictures that begin with the letter.',
  'Das ist die Grundlage für späteres freies Erzählen und Schreiben.',
  'Kein Kästchen bleibt frei.',
  'Så barnet kan pröva fritt.',
  'Niet zomaar het dichtstbijzijnde vrije plekje.',
  'Découper les mots en syllabes : les animaux',
  'Dela upp ord i stavelser',
  'Aktiviteten er tilgængelig i browseren.',
  'Aktiviteten er tilgjengelig i nettleseren.',
  'Skriv hur många hopp det tar.',
  'Tavuta sanat',
  'Kokemusten ilmaiseminen kuvin ja sanoin.',
  'Lapsi siirtyy kuvalliseen ilmaisuun.',
  'Tekemistä ilmaisevalta sanalta.',
  'Ilmaista tunteita on vaikeaa.',
  'Freedom Day',   // a proper name containing the letters, not the word
  'Läs kalendern',
];

function hit(s) {
  const t = String(s == null ? '' : s);
  const m = PRICE.exec(t) || CARRIER.exec(t);
  return m ? m[0] : null;
}

function selfTest() {
  const bad = [];
  for (const s of MUST_FIRE) if (!hit(s)) bad.push('MUST_FIRE silent: ' + s);
  for (const s of MUST_PASS) { const h = hit(s); if (h) bad.push('MUST_PASS fired (' + h + '): ' + s); }
  if (bad.length) throw new Error('free-claim self-test failed:\n  ' + bad.join('\n  '));
  return { fire: MUST_FIRE.length, pass: MUST_PASS.length };
}

module.exports = { hit, selfTest, PRICE, CARRIER, MUST_FIRE, MUST_PASS };
