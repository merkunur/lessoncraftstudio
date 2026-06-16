/**
 * fi-themes.js — Finnish (fi) collective prose-noun table for the SEO landing fan-out.
 *
 * One entry per live fi catalog theme key (50 themes). Each carries a single COLLECTIVE countable
 * prose noun in the four case forms the landing prose needs (Finnish has NO gender, NO articles —
 * the agreement axis is CASE + vowel harmony). The render layer (fi-render.js) only substitutes;
 * it never inflects. Per CLAUDE.md §A.13.56 each grammatical slot needs its OWN correct case form,
 * stored here as a hand-verified native literal.
 *
 * Field spec:
 *   h1Display  NOMINATIVE PLURAL, Capitalized — VERBATIM from topics-taxonomy.json
 *              axes.theme.<key>.name.fi (may be a multi-word display label).
 *   nomPl      nominative plural, lowercase   (subject slot: "{N_PL} ovat sekaisin")
 *   partSg     PARTITIVE SINGULAR, lowercase  (count phrase: "montako {N_PART_SG}?")
 *   partPl     PARTITIVE PLURAL, lowercase    (object/of slot: "laske {N_PART_PL}", "kuvia {N_PART_PL}")
 *   genPl      GENITIVE PLURAL, lowercase     ("{N_GEN} kuvat" = pictures of the X)
 *   multiword  (optional) true when a case form is legitimately 2 words (assertThemeTable then
 *              only enforces lowercase, not single-token).
 *   harmonyOverride (optional) 'back'|'front' to pin a mixed compound's harmony class explicitly.
 *
 * Vowel harmony invariant (enforced by assertThemeTable's A3, the *djurna analog): a back-vowel
 * stem (a/o/u) takes -a/-en back-harmonic suffixes (omenoita), a front stem (ä/ö/y or neutral-only)
 * takes -ä/-en front-harmonic suffixes (eläimiä). A stored suffix in the wrong harmony class
 * FAIL-halts the wave.
 *
 * Phrase/locative/mass display labels (Kodin ympärillä, Ruokakaupassa, Sää, ...) keep h1Display as
 * the taxonomy label but store a distinct COUNTABLE collective noun for the case slots (the
 * sv-themes precedent). The non-obvious collective choices are commented + flagged in the report.
 *
 * [NSR-FLAG][fi] per §17.5.1 — Finnish native-speaker review pending.
 */
'use strict';

const THEMES = {
  // ---- clean countable plural labels: case forms inflect the same head noun the label names ----
  'accessories':            { h1Display: 'Asusteet',                     nomPl: 'asusteet',       partSg: 'asustetta',     partPl: 'asusteita',      genPl: 'asusteiden' },
  'activities':             { h1Display: 'Aktiviteetit',                 nomPl: 'aktiviteetit',   partSg: 'aktiviteettia',  partPl: 'aktiviteetteja', genPl: 'aktiviteettien' },
  'animals':                { h1Display: 'Eläimet',                      nomPl: 'eläimet',        partSg: 'eläintä',        partPl: 'eläimiä',        genPl: 'eläinten' },
  'birds':                  { h1Display: 'Linnut',                       nomPl: 'linnut',         partSg: 'lintua',         partPl: 'lintuja',        genPl: 'lintujen' },
  'birds_2':                { h1Display: 'Linnut 2',                      nomPl: 'linnut',         partSg: 'lintua',         partPl: 'lintuja',        genPl: 'lintujen' },
  'body_parts':             { h1Display: 'Ruumiinosat',                  nomPl: 'ruumiinosat',    partSg: 'ruumiinosaa',    partPl: 'ruumiinosia',    genPl: 'ruumiinosien' },
  'clothing':               { h1Display: 'Vaatteet',                     nomPl: 'vaatteet',       partSg: 'vaatetta',       partPl: 'vaatteita',      genPl: 'vaatteiden' },
  'colors':                 { h1Display: 'Värit',                        nomPl: 'värit',          partSg: 'väriä',          partPl: 'värejä',         genPl: 'värien' },
  'desserts_and_sweets':    { h1Display: 'Jälkiruoat ja makeiset',       nomPl: 'jälkiruoat',     partSg: 'jälkiruokaa',    partPl: 'jälkiruokia',    genPl: 'jälkiruokien' }, // label is 2 themes; count desserts (jälkiruoka)
  'dinosaurs':              { h1Display: 'Dinosaurukset',                nomPl: 'dinosaurukset',  partSg: 'dinosaurusta',   partPl: 'dinosauruksia',  genPl: 'dinosaurusten' },
  'emotions':               { h1Display: 'Tunteet',                      nomPl: 'tunteet',        partSg: 'tunnetta',       partPl: 'tunteita',       genPl: 'tunteiden' },
  'farm_animals':           { h1Display: 'Maatilan eläimet',             nomPl: 'eläimet',        partSg: 'eläintä',        partPl: 'eläimiä',        genPl: 'eläinten' }, // count the animals
  'flowers':                { h1Display: 'Kukat',                        nomPl: 'kukat',          partSg: 'kukkaa',         partPl: 'kukkia',         genPl: 'kukkien' },
  'forest_creatures':       { h1Display: 'Metsän eläimet',               nomPl: 'eläimet',        partSg: 'eläintä',        partPl: 'eläimiä',        genPl: 'eläinten' },
  'fruits':                 { h1Display: 'Hedelmät',                     nomPl: 'hedelmät',       partSg: 'hedelmää',       partPl: 'hedelmiä',       genPl: 'hedelmien' },
  'furniture':              { h1Display: 'Huonekalut',                   nomPl: 'huonekalut',     partSg: 'huonekalua',     partPl: 'huonekaluja',    genPl: 'huonekalujen' },
  'insects_and_bugs':       { h1Display: 'Hyönteiset ja ötökät',         nomPl: 'hyönteiset',     partSg: 'hyönteistä',     partPl: 'hyönteisiä',     genPl: 'hyönteisten' }, // count insects (hyönteinen)
  'kitchen_tools':          { h1Display: 'Keittiövälineet',              nomPl: 'keittiövälineet',partSg: 'keittiövälinettä',partPl: 'keittiövälineitä',genPl: 'keittiövälineiden' },
  'occupations':            { h1Display: 'Ammatit',                      nomPl: 'ammatit',        partSg: 'ammattia',       partPl: 'ammatteja',      genPl: 'ammattien' },
  'pets':                   { h1Display: 'Lemmikit',                     nomPl: 'lemmikit',       partSg: 'lemmikkiä',      partPl: 'lemmikkejä',     genPl: 'lemmikkien' },
  'reptiles_and_amphibians':{ h1Display: 'Matelijat ja sammakkoeläimet', nomPl: 'matelijat',      partSg: 'matelijaa',      partPl: 'matelijoita',    genPl: 'matelijoiden' }, // count reptiles (matelija)
  'shapes':                 { h1Display: 'Muodot',                       nomPl: 'muodot',         partSg: 'muotoa',         partPl: 'muotoja',        genPl: 'muotojen' },
  'things_that_fly':        { h1Display: 'Lentävät asiat',               nomPl: 'lentävät asiat', partSg: 'lentävää asiaa', partPl: 'lentäviä asioita',genPl: 'lentävien asioiden', multiword: true }, // "flying things" — countable phrase
  'tools':                  { h1Display: 'Työkalut',                     nomPl: 'työkalut',       partSg: 'työkalua',       partPl: 'työkaluja',      genPl: 'työkalujen' },
  'toys':                   { h1Display: 'Lelut',                        nomPl: 'lelut',          partSg: 'lelua',          partPl: 'leluja',         genPl: 'lelujen' },
  'tree':                   { h1Display: 'Puut',                         nomPl: 'puut',           partSg: 'puuta',          partPl: 'puita',          genPl: 'puiden' },
  'vegetables':             { h1Display: 'Vihannekset',                  nomPl: 'vihannekset',    partSg: 'vihannesta',     partPl: 'vihanneksia',    genPl: 'vihannesten' },
  'vehicles':               { h1Display: 'Ajoneuvot',                    nomPl: 'ajoneuvot',      partSg: 'ajoneuvoa',      partPl: 'ajoneuvoja',     genPl: 'ajoneuvojen' },
  'zoo_animals':            { h1Display: 'Eläintarhan eläimet',          nomPl: 'eläimet',        partSg: 'eläintä',        partPl: 'eläimiä',        genPl: 'eläinten' },

  // ---- phrase / locative / mass / occasion labels: h1Display = taxonomy label, case forms use a
  //      sensible COUNTABLE collective noun (sv precedent; non-obvious choices flagged in report) ----
  '4th_of_july':            { h1Display: 'Itsenäisyyspäivä',             nomPl: 'liput',          partSg: 'lippua',         partPl: 'lippuja',        genPl: 'lippujen' }, // occasion -> count flags (lippu)
  'around_the_house':       { h1Display: 'Kodin ympärillä',              nomPl: 'esineet',        partSg: 'esinettä',       partPl: 'esineitä',       genPl: 'esineiden' }, // place -> count objects (esine)
  'at_the_supermarket':     { h1Display: 'Ruokakaupassa',                nomPl: 'tuotteet',       partSg: 'tuotetta',       partPl: 'tuotteita',      genPl: 'tuotteiden' }, // place -> count products (tuote)
  'bakery':                 { h1Display: 'Leipomo',                      nomPl: 'leivonnaiset',   partSg: 'leivonnaista',   partPl: 'leivonnaisia',   genPl: 'leivonnaisten' }, // place -> count pastries (leivonnainen)
  'beach':                  { h1Display: 'Ranta',                        nomPl: 'simpukat',       partSg: 'simpukkaa',      partPl: 'simpukoita',     genPl: 'simpukoiden' }, // place -> count shells (simpukka)
  'breakfast':              { h1Display: 'Aamiainen',                    nomPl: 'ruoat',          partSg: 'ruokaa',         partPl: 'ruokia',         genPl: 'ruokien' }, // meal -> count foods (ruoka)
  'camping':                { h1Display: 'Leirielämä',                   nomPl: 'teltat',         partSg: 'telttaa',        partPl: 'telttoja',       genPl: 'telttojen' }, // activity -> count tents (teltta)
  'christmas':              { h1Display: 'Joulu',                        nomPl: 'lahjat',         partSg: 'lahjaa',         partPl: 'lahjoja',        genPl: 'lahjojen' }, // occasion -> count gifts (lahja)
  'classroom':              { h1Display: 'Luokkahuone',                  nomPl: 'kynät',          partSg: 'kynää',          partPl: 'kyniä',          genPl: 'kynien' }, // place -> count pens (kynä)
  'easter':                 { h1Display: 'Pääsiäinen',                   nomPl: 'munat',          partSg: 'munaa',          partPl: 'munia',          genPl: 'munien' }, // occasion -> count eggs (muna)
  'hospital':               { h1Display: 'Sairaala',                     nomPl: 'välineet',       partSg: 'välinettä',      partPl: 'välineitä',      genPl: 'välineiden' }, // place -> count instruments (väline)
  'miscellaneous':          { h1Display: 'Sekalaista',                   nomPl: 'esineet',        partSg: 'esinettä',       partPl: 'esineitä',       genPl: 'esineiden' }, // abstract -> count objects (esine)
  'music':                  { h1Display: 'Musiikki',                     nomPl: 'soittimet',      partSg: 'soitinta',       partPl: 'soittimia',      genPl: 'soittimien' }, // mass -> count instruments (soitin)
  'ocean_life':             { h1Display: 'Merielämä',                    nomPl: 'meren eläimet',  partSg: 'meren eläintä',  partPl: 'meren eläimiä',  genPl: 'meren eläinten', multiword: true }, // mass -> count sea animals
  'post_office':            { h1Display: 'Postitoimisto',                nomPl: 'kirjeet',        partSg: 'kirjettä',       partPl: 'kirjeitä',       genPl: 'kirjeiden' }, // place -> count letters (kirje)
  'space':                  { h1Display: 'Avaruus',                      nomPl: 'tähdet',         partSg: 'tähteä',         partPl: 'tähtiä',         genPl: 'tähtien' }, // place -> count stars (tähti)
  'spring':                 { h1Display: 'Kevät',                        nomPl: 'kukat',          partSg: 'kukkaa',         partPl: 'kukkia',         genPl: 'kukkien' }, // season -> count flowers (kukka)
  'summer':                 { h1Display: 'Kesä',                         nomPl: 'auringot',       partSg: 'aurinkoa',       partPl: 'aurinkoja',      genPl: 'aurinkojen' }, // season -> count suns (aurinko)
  'thanksgivinng':          { h1Display: 'Kiitospäivä',                  nomPl: 'kurpitsat',      partSg: 'kurpitsaa',      partPl: 'kurpitsoita',    genPl: 'kurpitsoiden' }, // occasion -> count pumpkins (kurpitsa)
  'weather':                { h1Display: 'Sää',                          nomPl: 'pilvet',         partSg: 'pilveä',         partPl: 'pilviä',         genPl: 'pilvien' }, // mass -> count clouds (pilvi)
  'winter':                 { h1Display: 'Talvi',                        nomPl: 'lumihiutaleet',  partSg: 'lumihiutaletta',  partPl: 'lumihiutaleita', genPl: 'lumihiutaleiden' }, // season -> count snowflakes (lumihiutale)
};

module.exports = { THEMES };
