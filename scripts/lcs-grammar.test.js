#!/usr/bin/env node
/**
 * Unit tests for REFERENCE TRANSLATIONS/lcs-grammar.js — the shared grammar
 * engine behind find-and-count instructions + prepositions fill-in sentences.
 *
 * Pins every per-locale trap class:
 *   - sentence-casing (de keeps capitals, others lowercase)
 *   - list conjunctions incl. es y→e
 *   - Italian phonological articles (lo/l'/gli, uno/un')
 *   - French de-elision + h-aspiré
 *   - Romance per-noun quantifiers (mixed-gender lists)
 *   - German dative plural rule; indefinite dative articles
 *   - Scandinavian indefinite articles from gender codes
 *   - Finnish genitive frames (incl. plurale tantum between)
 *   - the null-on-unresolvable guarantee (no guessed forms, ever)
 *   - worksheet/answer-key/expected consistency by construction
 *
 * Run: node scripts/lcs-grammar.test.js
 */
'use strict';

const path = require('path');
const G = require(path.join(__dirname, '..', 'REFERENCE TRANSLATIONS', 'lcs-grammar.js'));

let pass = 0, fail = 0;
function eq(actual, expected, label) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { pass++; }
  else { fail++; console.error(`FAIL ${label}\n  expected: ${e}\n  actual:   ${a}`); }
}
function truthy(v, label) { if (v) pass++; else { fail++; console.error(`FAIL ${label}: expected truthy`); } }

// ---------- casing ----------
eq(G.sentenceCaseNoun('Chats', 'fr'), 'chats', 'fr lowercase');
eq(G.sentenceCaseNoun('Äpfel', 'de'), 'Äpfel', 'de keeps capital');
eq(G.sentenceCaseNoun('Äpplen', 'sv'), 'äpplen', 'sv lowercase umlaut');
eq(G.sentenceCaseNoun('Omenat', 'fi'), 'omenat', 'fi lowercase');

// ---------- list join ----------
eq(G.listJoin('en', ['apples']), 'apples', 'en single');
eq(G.listJoin('en', ['apples', 'cats']), 'apples and cats', 'en pair');
eq(G.listJoin('de', ['Äpfel', 'Katzen', 'Hunde']), 'Äpfel, Katzen und Hunde', 'de triple');
eq(G.listJoin('es', ['gatos', 'iguanas']), 'gatos e iguanas', 'es y→e before i');
eq(G.listJoin('es', ['gatos', 'hipopótamos']), 'gatos e hipopótamos', 'es y→e before hi');
eq(G.listJoin('es', ['gatos', 'estrellas']), 'gatos y estrellas', 'es y stays');
eq(G.listJoin('fi', ['omenat', 'kissat']), 'omenat ja kissat', 'fi ja');

// ---------- Italian articles ----------
eq(G.itDefArticle('elefanti', 'm', true), 'gli', 'it gli before vowel pl');
eq(G.itDefArticle('zaini', 'm', true), 'gli', 'it gli before z pl');
eq(G.itDefArticle('studenti', 'm', true), 'gli', 'it gli before s+cons pl');
eq(G.itDefArticle('gatti', 'm', true), 'i', 'it i plain pl');
eq(G.itDefArticle('stella', 'f', false), 'la', 'it la');
eq(G.itDefArticle('ancora', 'f', false), "l'", "it l' fem vowel");
eq(G.itDefArticle('albero', 'm', false), "l'", "it l' masc vowel");
eq(G.itDefArticle('zaino', 'm', false), 'lo', 'it lo before z');
eq(G.itIndefArticle('zaino', 'm'), 'uno', 'it uno');
eq(G.itIndefArticle('albero', 'm'), 'un', 'it un before vowel (no apostrophe)');
eq(G.itIndefArticle('ancora', 'f'), "un'", "it un' fem vowel");
eq(G.itIndefArticle('stella', 'f'), 'una', 'it una');

// ---------- French elision ----------
eq(G.frDe('étoiles'), "d'", 'fr d’ before vowel');
eq(G.frDe('chats'), 'de ', 'fr de before consonant');
eq(G.frDe('hélicoptères'), "d'", 'fr d’ before h muet');
eq(G.frDe('hiboux'), 'de ', 'fr de before h aspiré (hibou)');
eq(G.frDe('hérissons'), 'de ', 'fr de before h aspiré (hérisson)');

// ---------- Romance quantifiers ----------
eq(G.romanceQuantifier('fr', 'm', 'chats'), 'tous les', 'fr tous les');
eq(G.romanceQuantifier('fr', 'f', 'étoiles'), 'toutes les', 'fr toutes les');
eq(G.romanceQuantifier('it', 'm', 'elefanti'), 'tutti gli', 'it tutti gli');
eq(G.romanceQuantifier('it', 'm', 'gatti'), 'tutti i', 'it tutti i');
eq(G.romanceQuantifier('it', 'f', 'stelle'), 'tutte le', 'it tutte le');
eq(G.romanceQuantifier('es', null, 'gatos'), null, 'es missing gender → null');

// ---------- German dative plural ----------
eq(G.deDativePlural('Sterne'), 'Sternen', 'de +n');
eq(G.deDativePlural('Herzen'), 'Herzen', 'de ends n unchanged');
eq(G.deDativePlural('Autos'), 'Autos', 'de ends s unchanged');
eq(G.deDativePlural('Würfel'), 'Würfeln', 'de -el +n');

// ---------- indefinite articles ----------
eq(G.indefArticle('de', 'f', 'Blume'), 'einer', 'de einer');
eq(G.indefArticle('de', 'n', 'Herz'), 'einem', 'de einem n');
eq(G.indefArticle('sv', 't', 'hjärta'), 'ett', 'sv ett');
eq(G.indefArticle('sv', 'n', 'stjärna'), 'en', 'sv en');
eq(G.indefArticle('da', 't', 'hjerte'), 'et', 'da et');
eq(G.indefArticle('no', 'n', 'hjerte'), 'et', 'no et');
eq(G.indefArticle('no', 'f', 'stjerne'), 'en', 'no f→en (conservative bokmål)');
eq(G.indefArticle('nl', null, 'ster'), 'een', 'nl invariant een');
eq(G.indefArticle('sv', 'm', 'x'), null, 'sv invalid gender code → null');

// ---------- find-and-count instruction ----------
eq(G.findCountInstruction('en', 'circle', [{ plural: 'Apples' }]),
  'Circle all the apples', 'en circle');
eq(G.findCountInstruction('de', 'circle', [{ plural: 'Äpfel' }]),
  'Kreise alle Äpfel ein', 'de circle separable prefix');
eq(G.findCountInstruction('fr', 'circle', [{ plural: 'Chats', gender: 'm' }, { plural: 'Étoiles', gender: 'f' }]),
  'Entoure tous les chats et toutes les étoiles', 'fr mixed genders per-noun quantifier');
eq(G.findCountInstruction('it', 'count', [{ plural: 'Elefanti', gender: 'm' }]),
  'Conta tutti gli elefanti', 'it gli in instruction');
eq(G.findCountInstruction('es', 'cross', [{ plural: 'Gatos', gender: 'm' }, { plural: 'Estrellas', gender: 'f' }]),
  'Tacha todos los gatos y todas las estrellas', 'es mixed genders');
eq(G.findCountInstruction('fi', 'square', [{ plural: 'Omenat' }]),
  'Merkitse kaikki omenat neliöllä', 'fi square nominative-safe');
eq(G.findCountInstruction('fi', 'count', [{ plural: 'Omenat' }, { plural: 'Kissat' }]),
  'Laske kaikki omenat ja kissat', 'fi count');
eq(G.findCountInstruction('fr', 'circle', [{ plural: 'Chats' }]), null,
  'fr missing gender → null (caller falls back)');
eq(G.findCountInstruction('sv', 'circle', []), null, 'empty nouns → null');
eq(G.findCountInstruction('sv', 'circle', [{ plural: null }]), null, 'null plural → null');

// ---------- how many ----------
eq(G.howManyQuestion('de', { plural: 'Katzen' }), 'Wie viele Katzen?', 'de wie viele');
eq(G.howManyQuestion('fr', { plural: 'Étoiles', gender: 'f' }), "Combien d'étoiles ?", 'fr elided');
eq(G.howManyQuestion('fr', { plural: 'Chats', gender: 'm' }), 'Combien de chats ?', 'fr plain');
eq(G.howManyQuestion('es', { plural: 'Estrellas', gender: 'f' }), '¿Cuántas estrellas?', 'es fem');
eq(G.howManyQuestion('pt', { plural: 'Gatos', gender: 'm' }), 'Quantos gatos?', 'pt masc');
eq(G.howManyQuestion('it', { plural: 'Stelle', gender: 'f' }), 'Quante stelle?', 'it fem');
eq(G.howManyQuestion('fi', { plural: 'Omenat' }), 'Kuinka monta?', 'fi noun-free');
eq(G.howManyQuestion('es', { plural: 'Gatos' }), null, 'es no gender → null');
eq(G.howManyShort('da'), 'Hvor mange?', 'da short');

// ---------- prepositions sentences ----------
function sentence(r) { return r ? r.prefix + r.expected + r.suffix : null; }
function worksheet(r) { return r ? r.prefix + '__________' + r.suffix : null; }

const starDe = G.shapeLandmark('star', 'de');
eq(sentence(G.prepSentence('de', 'in', starDe)), '{img} ist in einem Stern.', 'de in einem');
eq(sentence(G.prepSentence('de', 'under', starDe)), '{img} ist unter einem Stern.', 'de unter');
eq(sentence(G.prepSentence('de', 'between', starDe)), '{img} ist zwischen zwei Sternen.', 'de between dative plural');
const heartDe = G.shapeLandmark('heart', 'de');
eq(sentence(G.prepSentence('de', 'between', heartDe)), '{img} ist zwischen zwei Herzen.', 'de Herzen unchanged');

const circleFr = G.shapeLandmark('circle', 'fr');
eq(sentence(G.prepSentence('fr', 'under', circleFr)), '{img} est sous un cercle.', 'fr frame A');
eq(sentence(G.prepSentence('fr', 'next to', circleFr)), "{img} est à côté d'un cercle.", 'fr frame B d’un');
const starFr = G.shapeLandmark('star', 'fr');
eq(sentence(G.prepSentence('fr', 'above', starFr)), "{img} est au-dessus d'une étoile.", 'fr frame B d’une');
eq(sentence(G.prepSentence('fr', 'between', starFr)), '{img} est entre deux étoiles.', 'fr between');

const circleEs = G.shapeLandmark('circle', 'es');
eq(sentence(G.prepSentence('es', 'in', circleEs)), '{img} está dentro de un círculo.', 'es dentro de un');
eq(sentence(G.prepSentence('es', 'under', circleEs)), '{img} está debajo de un círculo.', 'es de un — no contraction needed');
const starEs = G.shapeLandmark('star', 'es');
eq(sentence(G.prepSentence('es', 'between', starEs)), '{img} está entre dos estrellas.', 'es between');

const circlePt = G.shapeLandmark('circle', 'pt');
eq(sentence(G.prepSentence('pt', 'in', circlePt)), '{img} está dentro de um círculo.', 'pt dentro de um');
eq(sentence(G.prepSentence('pt', 'on top of', circlePt)), '{img} está em cima de um círculo.', 'pt em cima de um');
const starPt = G.shapeLandmark('star', 'pt');
eq(sentence(G.prepSentence('pt', 'between', starPt)), '{img} está entre duas estrelas.', 'pt duas fem');
eq(sentence(G.prepSentence('pt', 'between', circlePt)), '{img} está entre dois círculos.', 'pt dois masc');

const hexIt = G.shapeLandmark('hexagon', 'it');
eq(sentence(G.prepSentence('it', 'in', hexIt)), '{img} è dentro un esagono.', 'it dentro un before vowel');
const starIt = G.shapeLandmark('star', 'it');
eq(sentence(G.prepSentence('it', 'next to', starIt)), '{img} è accanto a una stella.', 'it accanto a una');
eq(sentence(G.prepSentence('it', 'between', starIt)), '{img} è tra due stelle.', 'it between');

const starSv = G.shapeLandmark('star', 'sv');
eq(sentence(G.prepSentence('sv', 'under', starSv)), '{img} är under en stjärna.', 'sv indefinite');
const heartSv = G.shapeLandmark('heart', 'sv');
eq(sentence(G.prepSentence('sv', 'in', heartSv)), '{img} är i ett hjärta.', 'sv ett');
eq(sentence(G.prepSentence('sv', 'between', starSv)), '{img} är mellan två stjärnor.', 'sv between två');

const heartDa = G.shapeLandmark('heart', 'da');
eq(sentence(G.prepSentence('da', 'on top of', heartDa)), '{img} er oven på et hjerte.', 'da oven på et hjerte');
const starNo = G.shapeLandmark('star', 'no');
eq(sentence(G.prepSentence('no', 'behind', starNo)), '{img} er bak en stjerne.', 'no en stjerne');

const starNl = G.shapeLandmark('star', 'nl');
eq(sentence(G.prepSentence('nl', 'under', starNl)), '{img} is onder een ster.', 'nl een');
eq(sentence(G.prepSentence('nl', 'between', starNl)), '{img} is tussen twee sterren.', 'nl between');

const starEn = G.shapeLandmark('star', 'en');
eq(sentence(G.prepSentence('en', 'in front of', starEn)), '{img} is in front of the star.', 'en definite');
eq(sentence(G.prepSentence('en', 'between', starEn)), '{img} is between the stars.', 'en between');

const starFi = G.shapeLandmark('star', 'fi');
eq(sentence(G.prepSentence('fi', 'on top of', starFi)), '{img} on tähden päällä.', 'fi postposition genitive');
eq(worksheet(G.prepSentence('fi', 'on top of', starFi)), '{img} on tähden __________.', 'fi blank at postposition');
eq(sentence(G.prepSentence('fi', 'between', starFi)), '{img} on kahden tähden välissä.', 'fi between kahden gen');
const heartFi = G.shapeLandmark('heart', 'fi');
eq(sentence(G.prepSentence('fi', 'under', heartFi)), '{img} on sydämen alla.', 'fi sydämen gradation');

// fi plurale tantum between (no 'kahden')
const ptLm = { key: '__pt_test__', singular: 'sakset', plural: 'sakset', gender: null, fiGen: 'saksien', fiPt: true };
eq(sentence(G.prepSentence('fi', 'between', ptLm)), '{img} on saksien välissä.', 'fi PT between drops kahden');

// unresolvable → null (never guess)
eq(G.prepSentence('de', 'in', { key: 'x', singular: 'Blob', plural: 'Blobs', gender: null }), null, 'de missing gender → null');
eq(G.prepSentence('fi', 'in', { key: 'no-such-key', singular: 'x', plural: 'y' }), null, 'fi missing genitive → null');
eq(G.prepSentence('sv', 'in', { key: 'x', singular: 'grej', plural: 'grejer', gender: 'q' }), null, 'sv bad gender code → null');

// ---------- distractors ----------
const dDe = G.prepDistractorLabels('de', 'under', starDe);
truthy(dDe.length >= 4, 'de singular pool ≥4');
truthy(dDe.indexOf('zwischen') < 0, 'de between excluded from singular frame');
const dFrA = G.prepDistractorLabels('fr', 'under', circleFr);
truthy(dFrA.indexOf('dans') >= 0 && dFrA.indexOf('à côté') < 0, 'fr frame A pool excludes frame B');
const dFrB = G.prepDistractorLabels('fr', 'next to', circleFr);
truthy(dFrB.length >= 2, 'fr frame B pool ≥2 (with extras)');
truthy(dFrB.indexOf('au-dessus') >= 0, 'fr frame B contains au-dessus');
const dFi = G.prepDistractorLabels('fi', 'on top of', starFi);
truthy(dFi.length >= 4 && dFi.indexOf('välissä') < 0, 'fi pool excludes välissä');
const dIt = G.prepDistractorLabels('it', 'on top of', starIt);
truthy(dIt.indexOf('sopra') < 0, 'it distractors never duplicate the correct label');
const dBetween = G.prepDistractorLabels('sv', 'between', starSv);
truthy(dBetween.length >= 2, 'sv between-frame has distractors');

// worksheet+expected ≡ answer key by construction (structural invariant)
G.LOCALES.forEach(function (loc) {
  Object.keys(G.PREP_FORMS).forEach(function (p) {
    const lm = G.shapeLandmark('triangle', loc);
    const r = G.prepSentence(loc, p, lm);
    truthy(r !== null, `triangle ${loc}/${p} builds`);
    if (r) {
      eq(worksheet(r).replace('__________', r.expected), sentence(r), `consistency ${loc}/${p}`);
      truthy(worksheet(r).split('_________').length === 2, `single blank run ${loc}/${p}`);
    }
  });
});

// all 8 shapes build in all 11 locales for a representative preposition
G.LOCALES.forEach(function (loc) {
  Object.keys(G.SHAPE_NOUNS).forEach(function (s) {
    const r = G.prepSentence(loc, 'under', G.shapeLandmark(s, loc));
    truthy(r !== null, `shape ${s} builds in ${loc}`);
  });
});

// ---------- 2026-08-18 native-audit round additions ----------
// en serial comma (3+ only)
eq(G.listJoin('en', ['dogs', 'apples', 'cats']), 'dogs, apples, and cats', 'en Oxford comma on triple');
eq(G.listJoin('en', ['dogs', 'cats']), 'dogs and cats', 'en pair keeps no comma');

// German n-Deklination (weak nouns) + Herz
const elephantDe = { key: 'elephant', singular: 'Elefant', plural: 'Elefanten', gender: 'm' };
eq(sentence(G.prepSentence('de', 'next to', elephantDe)), '{img} ist neben einem Elefanten.', 'de weak Elefanten');
eq(sentence(G.prepSentence('de', 'in', heartDe)), '{img} ist in einem Herzen.', 'de Herzen dative');
const lionDe = { key: 'lion', singular: 'Löwe', plural: 'Löwen', gender: 'm' };
eq(sentence(G.prepSentence('de', 'behind', lionDe)), '{img} ist hinter einem Löwen.', 'de weak Löwen');

// German adjective+noun phrases: curated or refused
const eggDe = { key: 'boiled-egg', singular: 'Gekochtes Ei', plural: 'Gekochte Eier', gender: 'n' };
eq(sentence(G.prepSentence('de', 'under', eggDe)), '{img} ist unter einem gekochten Ei.', 'de curated phrase dative');
eq(sentence(G.prepSentence('de', 'between', eggDe)), '{img} ist zwischen zwei gekochten Eiern.', 'de curated phrase dative plural');
const footballDe = { key: 'football', singular: 'American Football', plural: 'American Football', gender: 'm' };
eq(G.prepSentence('de', 'under', footballDe), null, 'de uncurated phrase → refuse');
eq(G.findCountInstruction('de', 'circle', [{ key: 'green-beans', plural: 'Grüne Bohnen', gender: 'f' }]),
  'Kreise alle grünen Bohnen ein', 'de FaC curated alle-form');
eq(G.findCountInstruction('de', 'circle', [{ key: 'football', plural: 'American Football', gender: 'm' }]),
  null, 'de FaC uncurated phrase → null');

// Plurale-tantum landmark guard (fi-PT proxy + deny list)
const scissorsEs = { key: 'scissors', singular: 'Tijeras', plural: 'Tijeras', gender: 'f' };
eq(G.prepSentence('es', 'under', scissorsEs), null, 'es PT landmark refused in singular frame');
eq(sentence(G.prepSentence('es', 'between', scissorsEs)), '{img} está entre dos tijeras.', 'es PT allowed in between frame');
const pantsDe = { key: 'pants', singular: 'Hose', plural: 'Hosen', gender: 'f' };
eq(sentence(G.prepSentence('de', 'under', pantsDe)), '{img} ist unter einer Hose.', 'de real singular passes PT proxy');
const usSv = { key: 'us', singular: 'USA', plural: 'USA', gender: 't' };
eq(G.prepSentence('sv', 'in', usSv), null, 'sv deny-list us refused');

// dentro-forms (es/pt/it) — ratified by native panels
eq(sentence(G.prepSentence('es', 'in', starEs)), '{img} está dentro de una estrella.', 'es dentro de una');
eq(sentence(G.prepSentence('pt', 'in', starPt)), '{img} está dentro de uma estrela.', 'pt dentro de uma');
eq(sentence(G.prepSentence('it', 'in', starIt)), '{img} è dentro una stella.', 'it dentro una');

// da two-word 'oven på' with complement
eq(sentence(G.prepSentence('da', 'on top of', G.shapeLandmark('star', 'da'))), '{img} er oven på en stjerne.', 'da oven på en stjerne');

// confusable pair excluded from distractors, both directions, all locales
G.LOCALES.forEach(function (loc) {
  const lm = G.shapeLandmark('star', loc);
  const above = G.prepSentence(loc, 'above', lm);
  const ontop = G.prepSentence(loc, 'on top of', lm);
  const dAbove = G.prepDistractorLabels(loc, 'above', lm);
  const dOntop = G.prepDistractorLabels(loc, 'on top of', lm);
  truthy(ontop && dAbove.indexOf(ontop.expected) < 0, `no on-top-of distractor for above (${loc})`);
  truthy(above && dOntop.indexOf(above.expected) < 0, `no above distractor for on-top-of (${loc})`);
  truthy(dAbove.length >= 2 && dOntop.length >= 2, `pools still ≥2 after exclusion (${loc})`);
});

// sv hexagon → sexhörning; fi cylinder shape → lieriö but vocab key stays sylinterin
eq(sentence(G.prepSentence('sv', 'under', G.shapeLandmark('hexagon', 'sv'))), '{img} är under en sexhörning.', 'sv sexhörning');
eq(sentence(G.prepSentence('fi', 'on top of', G.shapeLandmark('cylinder', 'fi'))), '{img} on lieriön päällä.', 'fi shape lieriö genitive');
const cylVocabFi = { key: 'cylinder', singular: 'Sylinteri', plural: 'Sylinterit' };
eq(sentence(G.prepSentence('fi', 'on top of', cylVocabFi)), '{img} on sylinterin päällä.', 'fi custom cylinder keeps sylinterin');

// it uovo class: vocab gender 'f' (feminine PLURAL uova) but singular takes
// masculine article — "un uovo sodo", never "un'uovo"; invariable feminines
// in -o (foto) keep "una".
const eggIt = { key: 'boiled-egg', singular: 'Uovo sodo', plural: 'Uova sode', gender: 'f' };
eq(sentence(G.prepSentence('it', 'under', eggIt)), '{img} è sotto un uovo sodo.', 'it uovo-class masc singular article');
const fotoIt = { key: 'camera-x', singular: 'Foto', plural: 'Foto', gender: 'f' };
eq(G.itIndefArticle('foto', G.itSingularArticleGender ? 'f' : 'f'), 'una', 'it foto keeps una');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
