/**
 * sentence-items.js — the Sentences maker's view of the tagged grammar sentences (2026-11-02): data/grammar/grammar-
 * tables.js SENTENCES hold the SAME 18 sentences, in the same order, in all 11 languages (each native, tagged N M V A D
 * X), so a sentence index names the same picture everywhere:
 *   SUBJECT_KEY[i]  the vocab key of the sentence's subject (null: names / "I"; it 10 is a fish, not a duck)
 *   INTRANSITIVE    the indices whose subject + verb alone is a whole sentence (The dog plays.)
 * parse(s) → tokens [{ w, tag }]; split(tokens) → { subject: tokens before the verb (a clitic before it stays with
 * the verb), predicate: the verb and the rest } — the subject never ends in an X.
 */
'use strict';
const { SENTENCES } = require('../../data/grammar/grammar-tables.js');

const SUBJECT_KEY = ['dog', 'bird', 'frog', 'cat', 'girl', 'man', 'rabbit', 'bear', 'ball', 'apple', 'duck', null, 'horse', 'teacher', 'baby', 'cat', null, 'cat'];
const SUBJECT_KEY_BY_LOCALE = { it: { 10: 'fish' } };
const INTRANSITIVE = [0, 1, 2, 3, 7, 8, 9, 10, 14];
// pro-drop locales: a verb phrase alone is a whole sentence there ("Juega con Tom."), so it is never a fragment
const PRO_DROP = new Set(['es', 'pt', 'it', 'fi']);
const CLITICS = new Set(['se', 'me', 'te', 'le', 'lo', 'la', 'nos', 'si', 'mi', 'ti', 'ci', 'vi']);

const parse = (s) => s.split(' ').map((t) => { const i = t.lastIndexOf('/'); return { w: t.slice(0, i), tag: t.slice(i + 1) }; });

function sentencesOf(locale) {
  const L = String(locale || 'en').slice(0, 2);
  const list = SENTENCES[L];
  if (!list) throw new Error(`sentence-items: no sentences for ${L}`);
  return list.map((s, i) => ({ i, tokens: parse(s), key: (SUBJECT_KEY_BY_LOCALE[L] && SUBJECT_KEY_BY_LOCALE[L][i] !== undefined) ? SUBJECT_KEY_BY_LOCALE[L][i] : (SUBJECT_KEY[i] || null) }));
}

/** subject = the tokens before the first verb (trailing X — a clitic — goes with the verb); predicate = the rest */
function split(tokens) {
  const words = tokens.filter((t) => t.tag !== '.');
  let v = words.findIndex((t) => t.tag === 'V');
  if (v < 1) return null;
  // a clitic pronoun belongs to the verb (es "se sube"); a subject pronoun ("Mia and I") stays in the subject
  while (v > 1 && words[v - 1].tag === 'X' && CLITICS.has(words[v - 1].w.toLowerCase())) v--;
  const subject = words.slice(0, v), predicate = words.slice(v);
  if (!subject.some((t) => t.tag === 'N' || t.tag === 'M')) return null;
  return { subject, predicate };
}
const text = (tokens) => tokens.map((t) => t.w).join(' ');

// ---- themed sentences from the b2 frame bank (data/b2/sentences.js), the rules G1-249 Unscramble keeps (native review)
const { SENTENCES: FRAMES } = require('../../data/b2/sentences.js');
const SB = require('../../lib/sentence-bank.js');
const { entriesFor, displayWord, fileUri, countable } = require('../../lib/b2-common.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
const ANIMAL_THEMES = new Set(['animals', 'birds', 'birds 2', 'dinosaurs', 'farm animals', 'forest creatures', 'insects and bugs',
  'ocean life', 'pets', 'reptiles and amphibians', 'sea life', 'zoo animals']);
// + domino (review 2026-11-02): the picture is one tile, and de Dominos / es dominós / da-no dominoer name the game
const BLOCK = new Set(['medicine', 'cocktail', 'evergreen', 'vanity', 'dice', 'plunger', 'cast', 'columbine', 'heptagon', 'marigold', 'stage', 'ufo', 'chainsaw', 'sickle', 'nail', 'cape', 'domino']);
// + de s13 "Meine {noun} sind ganz neu": new swans, new wolves (review 2026-11-02, new pages only)
const PUB_OBJECTS = { es: ['s16'], pt: ['s7'], it: ['s13', 's15'], da: ['s9'], no: ['s14'], fi: ['s8'], de: ['s13'] };
const NUMERALS = {
  en: { two: 2, three: 3, four: 4, five: 5 }, de: { zwei: 2, drei: 3, vier: 4, fünf: 5 }, fr: { deux: 2, trois: 3, quatre: 4, cinq: 5 },
  es: { dos: 2, tres: 3, cuatro: 4, cinco: 5 }, pt: { dois: 2, duas: 2, três: 3, quatro: 4, cinco: 5 }, it: { due: 2, tre: 3, quattro: 4, cinque: 5 },
  nl: { twee: 2, drie: 3, vier: 4, vijf: 5 }, sv: { två: 2, tre: 3, fyra: 4, fem: 5 }, da: { to: 2, tre: 3, fire: 4, fem: 5 },
  no: { to: 2, tre: 3, fire: 4, fem: 5 }, fi: { kaksi: 2, kolme: 3, neljä: 4, viisi: 5 },
};

/**
 * n sentences of the bank's simple frames, each with a picture noun of the theme: [{ canonical, noun (the form in the
 * sentence), entry, src, frame, count (how many of the thing the sentence means: a numeral before {noun}, else 3 for a
 * plural, 1 for a singular / a Finnish object partitive) }]. Throws when the theme cannot give n.
 */
// NEUTRAL frames (review 2026-11-02): the bank's frames, filled with any noun of a theme, said false or odd things ("my
// whales are brand new", "four moose in the box", a girl as a possession, "alla bollar" without the definite form).
// These six are true of ANY pictured thing — see, draw, find, count, look — always with a number, so the picture shows
// exactly what the sentence says. {num} is the numeral (pt: dois / duas by the noun's gender), {noun} the plural
// (fi: the partitive singular after a numeral, the bank's own nounForms table).
const NNBSP_ = ' ';
const NEUTRAL = {
  en: ['I can see {num} {noun}.', '{name} draws {num} {noun}.', '{name} finds {num} {noun}.', '{name} counts {num} {noun}.', 'Look, {num} {noun}!', '{name} and {name} see {num} {noun}.'],
  de: ['Ich sehe {num} {noun}.', '{name} malt {num} {noun}.', '{name} findet {num} {noun}.', '{name} zählt {num} {noun}.', 'Schau, {num} {noun}!', '{name} und {name} sehen {num} {noun}.'],
  fr: ['Je vois {num} {noun}.', '{name} dessine {num} {noun}.', '{name} trouve {num} {noun}.', '{name} compte {num} {noun}.', `Regarde, {num} {noun}${NNBSP_}!`, '{name} et {name} voient {num} {noun}.'],
  es: ['Yo veo {num} {noun}.', '{name} dibuja {num} {noun}.', '{name} encuentra {num} {noun}.', '{name} cuenta {num} {noun}.', '¡Mira, {num} {noun}!', '{name} y {name} ven {num} {noun}.'],
  pt: ['Eu vejo {num} {noun}.', '{name} desenha {num} {noun}.', '{name} encontra {num} {noun}.', '{name} conta {num} {noun}.', 'Olha, {num} {noun}!', '{name} e {name} veem {num} {noun}.'],
  it: ['Io vedo {num} {noun}.', '{name} disegna {num} {noun}.', '{name} trova {num} {noun}.', '{name} conta {num} {noun}.', 'Guarda, {num} {noun}!', '{name} e {name} vedono {num} {noun}.'],
  nl: ['Ik zie {num} {noun}.', '{name} tekent {num} {noun}.', '{name} vindt {num} {noun}.', '{name} telt {num} {noun}.', 'Kijk, {num} {noun}!', '{name} en {name} zien {num} {noun}.'],
  sv: ['Jag ser {num} {noun}.', '{name} ritar {num} {noun}.', '{name} hittar {num} {noun}.', '{name} räknar {num} {noun}.', 'Titta, {num} {noun}!', '{name} och {name} ser {num} {noun}.'],
  da: ['Jeg ser {num} {noun}.', '{name} tegner {num} {noun}.', '{name} finder {num} {noun}.', '{name} tæller {num} {noun}.', 'Se, {num} {noun}!', '{name} og {name} ser {num} {noun}.'],
  no: ['Jeg ser {num} {noun}.', '{name} tegner {num} {noun}.', '{name} finner {num} {noun}.', '{name} teller {num} {noun}.', 'Se, {num} {noun}!', '{name} og {name} ser {num} {noun}.'],
  fi: ['Minä näen {num} {noun}.', '{name} piirtää {num} {noun}.', '{name} löytää {num} {noun}.', '{name} laskee {num} {noun}.', 'Katso, {num} {noun}!', '{name} ja {name} näkevät {num} {noun}.'],
};
const NUM_WORDS = {
  en: ['two', 'three', 'four', 'five'], de: ['zwei', 'drei', 'vier', 'fünf'], fr: ['deux', 'trois', 'quatre', 'cinq'], es: ['dos', 'tres', 'cuatro', 'cinco'],
  pt: ['dois', 'três', 'quatro', 'cinco'], it: ['due', 'tre', 'quattro', 'cinque'], nl: ['twee', 'drie', 'vier', 'vijf'], sv: ['två', 'tre', 'fyra', 'fem'],
  da: ['to', 'tre', 'fire', 'fem'], no: ['to', 'tre', 'fire', 'fem'], fi: ['kaksi', 'kolme', 'neljä', 'viisi'],
};
// never people (a girl, a baby: es needs "a" before them, and they are no things to count or find), never a picture of
// many things (fi singular = plural: blocks, dice)
const PEOPLE = new Set(['girl', 'boy', 'baby', 'man', 'woman', 'child', 'children', 'grandma', 'grandpa', 'mother', 'father', 'doctor', 'nurse', 'teacher', 'firefighter', 'police officer', 'chef', 'farmer', 'singer']);

function frameSentences({ locale, theme, rng, n, maxTokens = 9, maxLetters = 10 }) {
  const L = String(locale || 'en').slice(0, 2);
  const bank = FRAMES[L];
  if (!bank || !NEUTRAL[L]) throw new Error(`sentence-items: no frames for ${L}`);
  const V = require('../../lib/b2-common.js').vocab();
  const entries = entriesFor(theme, L).filter(countable)
    .filter((e) => !/\s/.test(e.singular.trim()) && !/\s/.test(e.plural.trim()) && [...e.plural.trim()].length <= maxLetters && [...e.singular.trim()].length <= maxLetters)
    .filter((e) => !BLOCK.has(e.vocabKey) && !PEOPLE.has(e.vocabKey) && !nameRefused(theme, e.noun) && !REFUSED_NOUNS.has(e.noun) && !/^[A-ZÆØÅÄÖ]{2,}$/.test(e.singular.trim()))
    .filter((e) => { const f = V[e.vocabKey] && V[e.vocabKey].fi; return !(f && f[0] === f[1]); })
    .filter((e) => L !== 'fi' || (bank.nounForms && bank.nounForms.partitive && bank.nounForms.partitive[e.vocabKey]));
  if (entries.length < n) throw new Error(`sentence-items: theme ${theme}/${L} has ${entries.length} nouns (< ${n})`);
  const frames = [];
  while (frames.length < n) frames.push(...rng.shuffle(NEUTRAL[L].map((text, i) => ({ id: 'n' + (i + 1), text }))));
  frames.length = n;
  const nouns = rng.sample(entries, n);
  return frames.map((frame, i) => {
    const e = nouns[i];
    const cs = bank.nounCase === 'keep' ? 'keep' : 'lower';
    const noun = SB.resolveNoun(bank, { id: frame.id, noun: L === 'fi' ? 'partitive' : 'pl' }, { ...e, singular: displayWord(e.singular, L, cs), plural: displayWord(e.plural, L, cs) }, L);
    const count = rng.int(2, 5);
    let num = NUM_WORDS[L][count - 2];
    if (L === 'pt' && count === 2 && e.gender === 'f') num = 'duas';
    const canonical = SB.fillFrame(frame.text.replace('{num}', num), { name: rng.sample(bank.names, 2), noun, n: '', color: '' });
    return { canonical, noun, entry: e, src: fileUri(theme, e.noun), frame, count };
  });
}

module.exports = { sentencesOf, split, text, parse, frameSentences, SUBJECT_KEY, INTRANSITIVE, PRO_DROP, NUMERALS };
