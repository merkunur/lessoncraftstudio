/* no-themes — the 50 color themes' Norwegian (bokmål) prose nouns (no ledger-lock 2026-06-15).
 * Authored by the no native-linguist ensemble; every plDef HAND-VERIFIED (Bokmålsordboka paradigms).
 * Full ruling: go-luminous-moon-agent-a22e62e92042214f5.md.
 *
 * Shape per entry: { gender: 'n'|'t', decl: 1|2, plIndef, plDef, h1Display, irregular? }
 *   gender:  n = felleskjønn (en-word) | t = intetkjønn (et-word) — gender of the HEAD noun (§A.13.58),
 *            RE-RESOLVED per-locale (do NOT carry da codes: vehicles/camping/post_office differ).
 *   decl:    1 = -er plural (STRIP -er, +ene) | 2 = zero-plural (+ene)   [bokmål ≠ Danish: -er dropped]
 *   irregular:true = vowel-change plural; plDef is a hand-locked literal (the no analog of *dyrne).
 * h1Display = verbatim axes.theme.<key>.name.no from topics-taxonomy.json.
 * Mass/place/occasion labels carry a COUNTABLE plural surrogate (commented).
 * Asserted by no-render.assertThemeTable (FAIL-halts the wave).
 *
 * BOKMÅL NOTE: the whole Danish consonant-doubling irregular class collapses to regular here
 * (egg→eggene, gresskar→gresskarene, snøfnugg→snøfnuggene); the -er-syncope themes
 * (blomster→blomstene, møbler→møblene) are decl-1 REGULAR under the strip-er+ene rule and are
 * VERIFIED by the assertion. The ONLY irregular is `tree` (trær→trærne, vowel-change).
 */
'use strict';
const THEMES = {
  '4th_of_july':             { gender: 't', decl: 2, plIndef: 'flagg',             plDef: 'flaggene',             h1Display: '4. juli' }, // occasion -> count flags (et flagg / flere flagg / flaggene)
  'accessories':             { gender: 't', decl: 2, plIndef: 'tilbehør',          plDef: 'tilbehørene',          h1Display: 'Tilbehør' }, // mass -> count tilbehør (zero-pl)
  'activities':              { gender: 'n', decl: 1, plIndef: 'aktiviteter',       plDef: 'aktivitetene',         h1Display: 'Aktiviteter' },
  'animals':                 { gender: 't', decl: 2, plIndef: 'dyr',               plDef: 'dyrene',               h1Display: 'Dyr' },
  'around_the_house':        { gender: 'n', decl: 2, plIndef: 'ting',              plDef: 'tingene',              h1Display: 'Rundt i huset' }, // place -> count "ting" (zero-pl felleskjønn)
  'at_the_supermarket':      { gender: 'n', decl: 1, plIndef: 'varer',             plDef: 'varene',               h1Display: 'I supermarkedet' }, // place -> count goods
  'bakery':                  { gender: 'n', decl: 1, plIndef: 'kaker',             plDef: 'kakene',               h1Display: 'Bakeri' }, // place -> count cakes
  'beach':                   { gender: 't', decl: 2, plIndef: 'skjell',            plDef: 'skjellene',            h1Display: 'Strand' }, // place -> count seashells
  'birds':                   { gender: 'n', decl: 1, plIndef: 'fugler',            plDef: 'fuglene',              h1Display: 'Fugler' },
  'birds_2':                 { gender: 'n', decl: 1, plIndef: 'fugler',            plDef: 'fuglene',              h1Display: 'Fugler 2' },
  'body_parts':              { gender: 'n', decl: 1, plIndef: 'kroppsdeler',       plDef: 'kroppsdelene',         h1Display: 'Kroppsdeler' },
  'breakfast':               { gender: 'n', decl: 1, plIndef: 'frokostretter',     plDef: 'frokostrettene',       h1Display: 'Frokost' }, // meal -> count dishes
  'camping':                 { gender: 't', decl: 2, plIndef: 'telt',              plDef: 'teltene',              h1Display: 'Camping' }, // activity -> count tents (zero-pl neuter — NOT da "telte")
  'christmas':               { gender: 'n', decl: 1, plIndef: 'julegaver',         plDef: 'julegavene',           h1Display: 'Jul' }, // occasion -> count presents
  'classroom':               { gender: 'n', decl: 1, plIndef: 'blyanter',          plDef: 'blyantene',            h1Display: 'Klasserom' }, // place -> count pencils
  'clothing':                { gender: 't', decl: 2, plIndef: 'klesplagg',         plDef: 'klesplaggene',         h1Display: 'Klær' }, // "Klær" plurale-tantum; count surrogate klesplagg (zero-pl)
  'colors':                  { gender: 'n', decl: 1, plIndef: 'farger',            plDef: 'fargene',              h1Display: 'Farger' },
  'desserts_and_sweets':     { gender: 'n', decl: 1, plIndef: 'desserter',         plDef: 'dessertene',           h1Display: 'Desserter og godteri' }, // "godteri" is mass; head = desserter
  'dinosaurs':               { gender: 'n', decl: 1, plIndef: 'dinosaurer',        plDef: 'dinosaurene',          h1Display: 'Dinosaurer' },
  'easter':                  { gender: 't', decl: 2, plIndef: 'påskeegg',          plDef: 'påskeeggene',          h1Display: 'Påske' }, // NO doubling: egg / flere egg / eggene -> påskeeggene
  'emotions':                { gender: 'n', decl: 1, plIndef: 'følelser',          plDef: 'følelsene',            h1Display: 'Følelser' },
  'farm_animals':            { gender: 't', decl: 2, plIndef: 'gårdsdyr',          plDef: 'gårdsdyrene',          h1Display: 'Gårdsdyr' },
  'flowers':                 { gender: 'n', decl: 1, plIndef: 'blomster',          plDef: 'blomstene',            h1Display: 'Blomster' }, // -er syncope: blomster -> blomstene (decl-1 regular under strip-er+ene)
  'forest_creatures':        { gender: 't', decl: 2, plIndef: 'skogsdyr',          plDef: 'skogsdyrene',          h1Display: 'Skogsdyr' },
  'fruits':                  { gender: 'n', decl: 1, plIndef: 'frukter',           plDef: 'fruktene',             h1Display: 'Frukter' }, // bokmål: frukter -> fruktene (NOT da frugterne)
  'furniture':               { gender: 't', decl: 1, plIndef: 'møbler',            plDef: 'møblene',              h1Display: 'Møbler' }, // -er syncope: møbler -> møblene (decl-1 regular)
  'hospital':                { gender: 'n', decl: 1, plIndef: 'sprøyter',          plDef: 'sprøytene',            h1Display: 'Sykehus' }, // place -> count syringes
  'insects_and_bugs':        { gender: 't', decl: 1, plIndef: 'insekter',          plDef: 'insektene',            h1Display: 'Insekter og kryp' },
  'kitchen_tools':           { gender: 't', decl: 1, plIndef: 'kjøkkenredskaper',  plDef: 'kjøkkenredskapene',    h1Display: 'Kjøkkenredskaper' },
  'miscellaneous':           { gender: 'n', decl: 2, plIndef: 'ting',              plDef: 'tingene',              h1Display: 'Diverse' },
  'music':                   { gender: 't', decl: 1, plIndef: 'instrumenter',      plDef: 'instrumentene',        h1Display: 'Musikk' }, // mass -> count instruments
  'occupations':             { gender: 't', decl: 1, plIndef: 'yrker',             plDef: 'yrkene',               h1Display: 'Yrker' },
  'ocean_life':              { gender: 't', decl: 2, plIndef: 'havdyr',            plDef: 'havdyrene',            h1Display: 'Havliv' }, // mass -> count sea animals (zero-pl neuter)
  'pets':                    { gender: 't', decl: 2, plIndef: 'kjæledyr',          plDef: 'kjæledyrene',          h1Display: 'Kjæledyr' },
  'post_office':             { gender: 't', decl: 2, plIndef: 'brev',              plDef: 'brevene',              h1Display: 'Postkontor' }, // place -> count letters (zero-pl neuter — NOT da "breve")
  'reptiles_and_amphibians': { gender: 't', decl: 1, plIndef: 'reptiler',          plDef: 'reptilene',            h1Display: 'Reptiler og amfibier' }, // head = reptiler
  'shapes':                  { gender: 'n', decl: 1, plIndef: 'former',            plDef: 'formene',              h1Display: 'Former' },
  'space':                   { gender: 'n', decl: 1, plIndef: 'stjerner',          plDef: 'stjernene',            h1Display: 'Verdensrommet' }, // place -> count stars
  'spring':                  { gender: 'n', decl: 1, plIndef: 'blomster',          plDef: 'blomstene',            h1Display: 'Vår' }, // season -> count flowers (same syncope as flowers)
  'summer':                  { gender: 'n', decl: 1, plIndef: 'ispinner',          plDef: 'ispinnene',            h1Display: 'Sommer' }, // season -> count ice lollies
  'thanksgivinng':           { gender: 't', decl: 2, plIndef: 'gresskar',          plDef: 'gresskarene',          h1Display: 'Thanksgiving' }, // NO doubling: gresskar / flere gresskar / gresskarene. key typo preserved
  'things_that_fly':         { gender: 't', decl: 2, plIndef: 'fly',               plDef: 'flyene',               h1Display: 'Ting som flyr' }, // zero-pl neuter
  'tools':                   { gender: 't', decl: 2, plIndef: 'verktøy',           plDef: 'verktøyene',           h1Display: 'Verktøy' }, // "Verktøy" neuter zero-pl (operator: verktøyene over redskapene)
  'toys':                    { gender: 'n', decl: 1, plIndef: 'leker',             plDef: 'lekene',               h1Display: 'Leker' }, // head "leke", display "Leker"
  'tree':                    { gender: 't', decl: 1, plIndef: 'trær',              plDef: 'trærne',               h1Display: 'Trær', irregular: true }, // vowel-change pl: et tre / trær / trærne — the one true bokmål irregular
  'vegetables':              { gender: 'n', decl: 1, plIndef: 'grønnsaker',        plDef: 'grønnsakene',          h1Display: 'Grønnsaker' },
  'vehicles':                { gender: 't', decl: 2, plIndef: 'kjøretøy',          plDef: 'kjøretøyene',          h1Display: 'Kjøretøy' }, // "Kjøretøy" neuter zero-pl (NOT da decl1 "køretøjer")
  'weather':                 { gender: 'n', decl: 1, plIndef: 'skyer',             plDef: 'skyene',               h1Display: 'Vær' }, // mass -> count clouds
  'winter':                  { gender: 't', decl: 2, plIndef: 'snøfnugg',          plDef: 'snøfnuggene',          h1Display: 'Vinter' }, // NO doubling: snøfnugg / flere snøfnugg / snøfnuggene
  'zoo_animals':             { gender: 't', decl: 2, plIndef: 'dyrehagedyr',       plDef: 'dyrehagedyrene',       h1Display: 'Dyrehagedyr' }, // zero-pl neuter
};
module.exports = { THEMES };
