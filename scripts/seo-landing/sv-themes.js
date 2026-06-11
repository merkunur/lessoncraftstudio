/**
 * sv-themes.js — Swedish (sv) collective prose-noun table for the SEO landing fan-out.
 *
 * One entry per live sv catalog theme key (50 themes). Each carries a single
 * COLLECTIVE countable prose noun (Option A) used by the landing prose to say
 * "räkna [plDef]" / "...med [plIndef]...".
 *
 * Field spec:
 *   gender   't' = ett-word (neuter) | 'n' = en-word (COMMON — NOT neuter)
 *   decl     SAG declension 1-5 of the prose noun:
 *              1 = -or | 2 = -ar | 3 = -er | 4 = -n (neuter vowel-final) | 5 = zero-plural neuter
 *   plIndef  bare indefinite plural, lowercase single token
 *   plDef    plural DEFINITE, lowercase single token — LOAD-BEARING.
 *            Derived strictly by declension:
 *              decl 1/2/3 (-or/-ar/-er) -> plIndef + 'na'
 *              decl 4     (-n)           -> plIndef + 'a'
 *              decl 5     (zero-plural)  -> plIndef + 'en'
 *   h1Display  capitalized display label, VERBATIM from
 *              topics-taxonomy.json axes.theme.<key>.name.sv
 *
 * Mass/abstract/place display labels keep h1Display as the taxonomy label but
 * store a distinct COUNTABLE collective prose noun for plIndef/plDef
 * (commented per entry). Forms sourced from REFERENCE TRANSLATIONS/image-vocabulary.js
 * (sv [singular, plural, gender]) where a representative image noun exists;
 * superordinate collectives (djur/fordon/verktyg/...) are standard SAG forms.
 */

const THEMES = {
  // Holidays / occasions — countable collective "föremål"/"saker" surrogates where the
  // label is an occasion; flags/decorations are the concrete countable in these scenes.
  '4th_of_july':            { gender: 'n', decl: 1, plIndef: 'flaggor',     plDef: 'flaggorna',     h1Display: '4 juli' }, // occasion -> count flags (flagga, decl 1)
  'accessories':            { gender: 'n', decl: 3, plIndef: 'accessoarer', plDef: 'accessoarerna', h1Display: 'Tillbehör' }, // "Tillbehör" is zero-plural; use accessoar (decl 3) as countable
  'activities':             { gender: 'n', decl: 3, plIndef: 'aktiviteter', plDef: 'aktiviteterna', h1Display: 'Aktiviteter' },
  'animals':                { gender: 't', decl: 5, plIndef: 'djur',        plDef: 'djuren',        h1Display: 'Djur' },
  'around_the_house':       { gender: 'n', decl: 3, plIndef: 'saker',       plDef: 'sakerna',       h1Display: 'Runt huset' }, // place label -> count "saker" (sak, decl 3 -ar? no: sak->saker decl 3)
  'at_the_supermarket':     { gender: 'n', decl: 1, plIndef: 'varor',       plDef: 'varorna',       h1Display: 'I snabbköpet' }, // place -> count "varor" (vara, decl 1)
  'bakery':                 { gender: 't', decl: 5, plIndef: 'bakverk',     plDef: 'bakverken',     h1Display: 'Bageri' }, // place -> count "bakverk" (ett, zero-plural)
  'beach':                  { gender: 'n', decl: 1, plIndef: 'snäckor',     plDef: 'snäckorna',     h1Display: 'Strand' }, // place -> count shells (snäcka, decl 1)
  'birds':                  { gender: 'n', decl: 2, plIndef: 'fåglar',      plDef: 'fåglarna',      h1Display: 'Fåglar' },
  'birds_2':               { gender: 'n', decl: 2, plIndef: 'fåglar',      plDef: 'fåglarna',      h1Display: 'Fåglar 2' },
  'body_parts':             { gender: 'n', decl: 2, plIndef: 'kroppsdelar', plDef: 'kroppsdelarna', h1Display: 'Kroppsdelar' },
  'breakfast':              { gender: 'n', decl: 2, plIndef: 'smörgåsar',   plDef: 'smörgåsarna',   h1Display: 'Frukost' }, // meal -> count sandwiches (smörgås, decl 2)
  'camping':                { gender: 't', decl: 5, plIndef: 'tält',        plDef: 'tälten',        h1Display: 'Camping' }, // activity -> count tents (tält, ett zero-plural)
  'christmas':              { gender: 'n', decl: 3, plIndef: 'presenter',   plDef: 'presenterna',   h1Display: 'Jul' }, // occasion -> count gifts (present, decl 3)
  'classroom':              { gender: 'n', decl: 1, plIndef: 'pennor',      plDef: 'pennorna',      h1Display: 'Klassrum' }, // place -> count pens (penna, decl 1)
  'clothing':               { gender: 'n', decl: 3, plIndef: 'kläder',      plDef: 'kläderna',      h1Display: 'Kläder' }, // plurale tantum, ends -er -> +na
  'colors':                 { gender: 'n', decl: 3, plIndef: 'färger',      plDef: 'färgerna',      h1Display: 'Färger' },
  'desserts_and_sweets':    { gender: 'n', decl: 3, plIndef: 'efterrätter', plDef: 'efterrätterna', h1Display: 'Efterrätter och godis' },
  'dinosaurs':              { gender: 'n', decl: 3, plIndef: 'dinosaurier', plDef: 'dinosaurierna', h1Display: 'Dinosaurier' },
  'easter':                 { gender: 't', decl: 5, plIndef: 'ägg',         plDef: 'äggen',         h1Display: 'Påsk' }, // occasion -> count eggs (ägg, ett zero-plural)
  'emotions':               { gender: 'n', decl: 1, plIndef: 'känslor',     plDef: 'känslorna',     h1Display: 'Känslor' },
  'farm_animals':           { gender: 't', decl: 5, plIndef: 'djur',        plDef: 'djuren',        h1Display: 'Bondgårdsdjur' },
  'flowers':                { gender: 'n', decl: 1, plIndef: 'blommor',     plDef: 'blommorna',     h1Display: 'Blommor' },
  'forest_creatures':       { gender: 't', decl: 5, plIndef: 'djur',        plDef: 'djuren',        h1Display: 'Skogsdjur' },
  'fruits':                 { gender: 'n', decl: 3, plIndef: 'frukter',     plDef: 'frukterna',     h1Display: 'Frukter' },
  'furniture':              { gender: 'n', decl: 3, plIndef: 'möbler',      plDef: 'möblerna',      h1Display: 'Möbler' },
  'hospital':               { gender: 'n', decl: 1, plIndef: 'sprutor',     plDef: 'sprutorna',     h1Display: 'Sjukhus' }, // place -> count syringes (spruta, decl 1)
  'insects_and_bugs':       { gender: 'n', decl: 3, plIndef: 'insekter',    plDef: 'insekterna',    h1Display: 'Insekter och kryp' },
  'kitchen_tools':          { gender: 't', decl: 5, plIndef: 'redskap',     plDef: 'redskapen',     h1Display: 'Köksredskap' }, // redskap, ett zero-plural
  'miscellaneous':          { gender: 'n', decl: 3, plIndef: 'saker',       plDef: 'sakerna',       h1Display: 'Blandat' }, // "Blandat" abstract -> count "saker"
  'music':                  { gender: 't', decl: 5, plIndef: 'instrument',  plDef: 'instrumenten',  h1Display: 'Musik' }, // mass label -> count instruments (instrument, ett zero-plural)
  'occupations':            { gender: 't', decl: 4, plIndef: 'yrken',       plDef: 'yrkena',        h1Display: 'Yrken' }, // yrke (ett, decl 4) -> yrken -> yrkena
  'ocean_life':             { gender: 't', decl: 5, plIndef: 'havsdjur',    plDef: 'havsdjuren',    h1Display: 'Havsliv' }, // mass label "Havsliv" -> count "havsdjur" (ett zero-plural)
  'pets':                   { gender: 't', decl: 5, plIndef: 'djur',        plDef: 'djuren',        h1Display: 'Husdjur' },
  'post_office':            { gender: 't', decl: 5, plIndef: 'brev',        plDef: 'breven',        h1Display: 'Postkontor' }, // place -> count letters (brev, ett zero-plural)
  'reptiles_and_amphibians':{ gender: 'n', decl: 3, plIndef: 'reptiler',    plDef: 'reptilerna',    h1Display: 'Reptiler och groddjur' },
  'shapes':                 { gender: 'n', decl: 3, plIndef: 'former',      plDef: 'formerna',      h1Display: 'Former' },
  'space':                  { gender: 'n', decl: 1, plIndef: 'stjärnor',    plDef: 'stjärnorna',    h1Display: 'Rymden' }, // place label "Rymden" -> count stars (stjärna, decl 1)
  'spring':                 { gender: 'n', decl: 1, plIndef: 'blommor',     plDef: 'blommorna',     h1Display: 'Vår' }, // season -> count flowers
  'summer':                 { gender: 'n', decl: 2, plIndef: 'solar',       plDef: 'solarna',       h1Display: 'Sommar' }, // season -> count suns (sol, decl 2)
  'thanksgivinng':          { gender: 'n', decl: 1, plIndef: 'pumpor',      plDef: 'pumporna',      h1Display: 'Thanksgiving' }, // occasion -> count pumpkins (pumpa, decl 1)
  'things_that_fly':        { gender: 't', decl: 5, plIndef: 'flygplan',    plDef: 'flygplanen',    h1Display: 'Saker som flyger' }, // count airplanes (flygplan, ett zero-plural)
  'tools':                  { gender: 't', decl: 5, plIndef: 'verktyg',     plDef: 'verktygen',     h1Display: 'Verktyg' }, // verktyg, ett zero-plural
  'toys':                   { gender: 'n', decl: 3, plIndef: 'leksaker',    plDef: 'leksakerna',    h1Display: 'Leksaker' }, // leksak, decl 3
  'tree':                   { gender: 't', decl: 5, plIndef: 'träd',        plDef: 'träden',        h1Display: 'Träd' }, // träd, ett zero-plural
  'vegetables':             { gender: 'n', decl: 3, plIndef: 'grönsaker',   plDef: 'grönsakerna',   h1Display: 'Grönsaker' }, // grönsak, decl 3
  'vehicles':               { gender: 't', decl: 5, plIndef: 'fordon',      plDef: 'fordonen',      h1Display: 'Fordon' }, // fordon, ett zero-plural
  'weather':                { gender: 't', decl: 5, plIndef: 'moln',        plDef: 'molnen',        h1Display: 'Väder' }, // mass label "Väder" -> count clouds (moln, ett zero-plural)
  'winter':                 { gender: 'n', decl: 1, plIndef: 'snöflingor',  plDef: 'snöflingorna',  h1Display: 'Vinter' }, // season -> count snowflakes (snöflinga, decl 1)
  'zoo_animals':            { gender: 't', decl: 5, plIndef: 'djur',        plDef: 'djuren',        h1Display: 'Djurparksdjur' },
};

module.exports = { THEMES };
