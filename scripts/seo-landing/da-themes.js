/* da-themes — the 50 color themes' Danish prose nouns (da ledger-lock 2026-06-12).
 * Authored by the da native-linguist ensemble; every plDef HAND-VERIFIED (DDO paradigms).
 *
 * Shape per entry: { gender: 'n'|'t', decl: 1|2, plIndef, plDef, h1Display, irregular? }
 *   gender:  n = fælleskøn (en-word) | t = intetkøn (et-word) — gender of the HEAD noun (§A.13.58)
 *   decl:    1 = plural in -e/-er (+ne) | 2 = zero-plural (+ene)
 *   irregular:true = consonant-doubling zero-plural; plDef is a hand-locked literal
 *                    (the Danish analog of the sv *djurna trap)
 * h1Display = verbatim axes.theme.<key>.name.da from topics-taxonomy.json.
 * Mass/place/occasion labels carry a COUNTABLE plural surrogate (commented) — the nl
 * fruit→vruchten precedent. Asserted by da-render.assertThemeTable (FAIL-halts the wave).
 */
'use strict';
const THEMES = {
  '4th_of_july':             { gender: 't', decl: 2, plIndef: 'flag',             plDef: 'flagene',             h1Display: '4. juli' }, // occasion -> count flags (long vowel: no doubling)
  'accessories':             { gender: 'n', decl: 1, plIndef: 'accessoirer',      plDef: 'accessoirerne',       h1Display: 'Tilbehør' }, // mass -> count accessoirer
  'activities':              { gender: 'n', decl: 1, plIndef: 'aktiviteter',      plDef: 'aktiviteterne',       h1Display: 'Aktiviteter' },
  'animals':                 { gender: 't', decl: 2, plIndef: 'dyr',              plDef: 'dyrene',              h1Display: 'Dyr' },
  'around_the_house':        { gender: 'n', decl: 2, plIndef: 'ting',             plDef: 'tingene',             h1Display: 'Rundt i huset' }, // place -> count "ting" (zero-pl fælleskøn)
  'at_the_supermarket':      { gender: 'n', decl: 1, plIndef: 'varer',            plDef: 'varerne',             h1Display: 'I supermarkedet' }, // place -> count goods
  'bakery':                  { gender: 'n', decl: 1, plIndef: 'kager',            plDef: 'kagerne',             h1Display: 'Bageri' }, // place -> count cakes
  'beach':                   { gender: 'n', decl: 1, plIndef: 'muslingeskaller',  plDef: 'muslingeskallerne',   h1Display: 'Strand' }, // place -> count seashells
  'birds':                   { gender: 'n', decl: 1, plIndef: 'fugle',            plDef: 'fuglene',             h1Display: 'Fugle' },
  'birds_2':                 { gender: 'n', decl: 1, plIndef: 'fugle',            plDef: 'fuglene',             h1Display: 'Fugle 2' },
  'body_parts':              { gender: 'n', decl: 1, plIndef: 'kropsdele',        plDef: 'kropsdelene',         h1Display: 'Kropsdele' },
  'breakfast':               { gender: 'n', decl: 1, plIndef: 'morgenmadsretter', plDef: 'morgenmadsretterne',  h1Display: 'Morgenmad' }, // meal -> count dishes
  'camping':                 { gender: 't', decl: 1, plIndef: 'telte',            plDef: 'teltene',             h1Display: 'Camping' }, // activity -> count tents
  'christmas':               { gender: 'n', decl: 1, plIndef: 'julegaver',        plDef: 'julegaverne',         h1Display: 'Jul' }, // occasion -> count presents
  'classroom':               { gender: 'n', decl: 1, plIndef: 'blyanter',         plDef: 'blyanterne',          h1Display: 'Klasseværelse' }, // place -> count pencils
  'clothing':                { gender: 't', decl: 1, plIndef: 'tøjstykker',       plDef: 'tøjstykkerne',        h1Display: 'Tøj' }, // mass -> count garments
  'colors':                  { gender: 'n', decl: 1, plIndef: 'farver',           plDef: 'farverne',            h1Display: 'Farver' },
  'desserts_and_sweets':     { gender: 'n', decl: 1, plIndef: 'desserter',        plDef: 'desserterne',         h1Display: 'Desserter og slik' }, // "slik" is mass
  'dinosaurs':               { gender: 'n', decl: 1, plIndef: 'dinosaurer',       plDef: 'dinosaurerne',        h1Display: 'Dinosaurer' },
  'easter':                  { gender: 't', decl: 2, plIndef: 'påskeæg',          plDef: 'påskeæggene',         h1Display: 'Påske', irregular: true }, // short vowel: æg -> æggene (gg-doubling)
  'emotions':                { gender: 'n', decl: 1, plIndef: 'følelser',         plDef: 'følelserne',          h1Display: 'Følelser' },
  'farm_animals':            { gender: 't', decl: 2, plIndef: 'bondegårdsdyr',    plDef: 'bondegårdsdyrene',    h1Display: 'Bondegårdsdyr' },
  'flowers':                 { gender: 'n', decl: 1, plIndef: 'blomster',         plDef: 'blomsterne',          h1Display: 'Blomster' },
  'forest_creatures':        { gender: 't', decl: 2, plIndef: 'skovdyr',          plDef: 'skovdyrene',          h1Display: 'Skovdyr' },
  'fruits':                  { gender: 'n', decl: 1, plIndef: 'frugter',          plDef: 'frugterne',           h1Display: 'Frugter' },
  'furniture':               { gender: 't', decl: 1, plIndef: 'møbler',           plDef: 'møblerne',            h1Display: 'Møbler' }, // syncope plural stem
  'hospital':                { gender: 'n', decl: 1, plIndef: 'sprøjter',         plDef: 'sprøjterne',          h1Display: 'Hospital' }, // place -> count syringes (sv precedent)
  'insects_and_bugs':        { gender: 't', decl: 1, plIndef: 'insekter',         plDef: 'insekterne',          h1Display: 'Insekter og kryb' },
  'kitchen_tools':           { gender: 't', decl: 1, plIndef: 'køkkenredskaber',  plDef: 'køkkenredskaberne',   h1Display: 'Køkkenredskaber' },
  'miscellaneous':           { gender: 'n', decl: 2, plIndef: 'ting',             plDef: 'tingene',             h1Display: 'Diverse' },
  'music':                   { gender: 't', decl: 1, plIndef: 'instrumenter',     plDef: 'instrumenterne',      h1Display: 'Musik' }, // mass -> count instruments
  'occupations':             { gender: 't', decl: 2, plIndef: 'erhverv',          plDef: 'erhvervene',          h1Display: 'Erhverv' },
  'ocean_life':              { gender: 't', decl: 2, plIndef: 'havdyr',           plDef: 'havdyrene',           h1Display: 'Havliv' }, // mass -> count sea animals
  'pets':                    { gender: 't', decl: 2, plIndef: 'kæledyr',          plDef: 'kæledyrene',          h1Display: 'Kæledyr' },
  'post_office':             { gender: 't', decl: 1, plIndef: 'breve',            plDef: 'brevene',             h1Display: 'Postkontor' }, // place -> count letters
  'reptiles_and_amphibians': { gender: 't', decl: 2, plIndef: 'krybdyr',          plDef: 'krybdyrene',          h1Display: 'Krybdyr og padder' },
  'shapes':                  { gender: 'n', decl: 1, plIndef: 'former',           plDef: 'formerne',            h1Display: 'Former' },
  'space':                   { gender: 'n', decl: 1, plIndef: 'stjerner',         plDef: 'stjernerne',          h1Display: 'Rummet' }, // place -> count stars
  'spring':                  { gender: 'n', decl: 1, plIndef: 'blomster',         plDef: 'blomsterne',          h1Display: 'Forår' }, // season -> count flowers
  'summer':                  { gender: 'n', decl: 1, plIndef: 'ispinde',          plDef: 'ispindene',           h1Display: 'Sommer' }, // season -> count ice lollies (nl ijsjes precedent)
  'thanksgivinng':           { gender: 't', decl: 2, plIndef: 'græskar',          plDef: 'græskarrene',         h1Display: 'Thanksgiving', irregular: true }, // short vowel: kar -> karrene (rr-doubling)
  'things_that_fly':         { gender: 't', decl: 2, plIndef: 'fly',              plDef: 'flyene',              h1Display: 'Ting der flyver' }, // long vowel: no doubling
  'tools':                   { gender: 't', decl: 1, plIndef: 'redskaber',        plDef: 'redskaberne',         h1Display: 'Værktøj' }, // mass -> count redskaber
  'toys':                    { gender: 'n', decl: 1, plIndef: 'legesager',        plDef: 'legesagerne',         h1Display: 'Legetøj' }, // mass -> count legesager (plurale tantum, DDO)
  'tree':                    { gender: 't', decl: 1, plIndef: 'træer',            plDef: 'træerne',             h1Display: 'Træer' },
  'vegetables':              { gender: 'n', decl: 1, plIndef: 'grøntsager',       plDef: 'grøntsagerne',        h1Display: 'Grøntsager' },
  'vehicles':                { gender: 't', decl: 1, plIndef: 'køretøjer',        plDef: 'køretøjerne',         h1Display: 'Køretøjer' },
  'weather':                 { gender: 'n', decl: 1, plIndef: 'skyer',            plDef: 'skyerne',             h1Display: 'Vejr' }, // mass -> count clouds
  'winter':                  { gender: 't', decl: 2, plIndef: 'snefnug',          plDef: 'snefnuggene',         h1Display: 'Vinter', irregular: true }, // short vowel: gg-doubling
  'zoo_animals':             { gender: 't', decl: 2, plIndef: 'zoodyr',           plDef: 'zoodyrene',           h1Display: 'Zoodyr' },
};
module.exports = { THEMES };
