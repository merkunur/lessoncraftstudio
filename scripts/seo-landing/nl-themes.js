/**
 * nl-themes.js — Dutch (nl) collective prose-noun table for the SEO landing fan-out.
 *
 * One entry per live nl catalog theme key (50 themes). Each carries a single
 * COLLECTIVE countable prose noun (Option A) used by the landing prose to say
 * "tel [plDef]" / "...met [plIndef]...".
 *
 * Field spec:
 *   gender   'de'  = de-word (common) | 'het' = het-word (neuter) of the SINGULAR
 *            of the prose noun. Stored DEFENSIVELY only — the prose stays plural,
 *            so gender is NOT load-bearing. Resolved per nl de/het authority
 *            (§A.13.58), NEVER another locale's codes.
 *   plIndef  bare indefinite plural, lowercase SINGLE token (one word).
 *            HAND-VERIFIED per entry — Dutch plurals are irregular:
 *              -s vs -en (appel->appels, hond->honden),
 *              vowel-doubling (boot->boten),
 *              f->v / s->z devoicing (wolf->wolven, huis->huizen),
 *              suppletives (kind->kinderen, ei->eieren).
 *   plDef    plural DEFINITE — UNIFORMLY 'de ' + plIndef for EVERY gender.
 *            Dutch has NO definiteness-suffix morphology (unlike Swedish):
 *            the definite plural article is always "de", appended as a separate
 *            word. This is the ONLY two-token field. No suffix trap, no engine
 *            morphology — pure prefix.
 *   h1Display  capitalized display label, VERBATIM from
 *              topics-taxonomy.json axes.theme.<key>.name.nl
 *   mass     true ONLY for mass / abstract / place / occasion / season display
 *            labels with no natural countable plural. h1Display KEEPS the
 *            taxonomy label; plIndef/plDef store a distinct COUNTABLE surrogate
 *            the prose can count (commented per entry). Surrogate CHOICE mirrors
 *            the sv-themes.js precedent, rendered with the correct Dutch word.
 *
 * Superordinate animal collectives -> dieren (de dieren); vehicles -> voertuigen.
 * Forms cross-checked against REFERENCE TRANSLATIONS/image-vocabulary.js (nl
 * [singular, plural, gender]) where a representative image noun exists; theme-
 * level collectives (dieren / voertuigen / insecten / ...) are standard Dutch.
 */

const THEMES = {
  // Holidays / occasions — the label is an occasion; count the concrete
  // countable object in the scene (flags / gifts / eggs / pumpkins).
  '4th_of_july':            { gender: 'de',  plIndef: 'vlaggen',       plDef: 'de vlaggen',       h1Display: '4 juli', mass: true }, // occasion -> count flags (vlag -> vlaggen, consonant-doubling)
  'accessories':            { gender: 'de',  plIndef: 'accessoires',  plDef: 'de accessoires',   h1Display: 'Accessoires' }, // loanword, plural -s
  'activities':             { gender: 'de',  plIndef: 'activiteiten', plDef: 'de activiteiten',  h1Display: 'Activiteiten' }, // -teit -> -teiten
  'animals':                { gender: 'het', plIndef: 'dieren',       plDef: 'de dieren',        h1Display: 'Dieren' }, // het dier -> dieren
  'around_the_house':       { gender: 'de',  plIndef: 'spullen',      plDef: 'de spullen',       h1Display: 'Rond het huis', mass: true }, // place -> count "spullen" (things)
  'at_the_supermarket':     { gender: 'het', plIndef: 'producten',    plDef: 'de producten',     h1Display: 'In de supermarkt', mass: true }, // place -> count products (het product -> producten)
  'bakery':                 { gender: 'het', plIndef: 'broodjes',     plDef: 'de broodjes',      h1Display: 'Bakkerij', mass: true }, // place -> count rolls (het broodje -> broodjes, diminutive -s)
  'beach':                  { gender: 'de',  plIndef: 'schelpen',     plDef: 'de schelpen',      h1Display: 'Strand', mass: true }, // place -> count shells (schelp -> schelpen)
  'birds':                  { gender: 'de',  plIndef: 'vogels',       plDef: 'de vogels',        h1Display: 'Vogels' }, // vogel -> vogels (-el takes -s)
  'birds_2':                { gender: 'de',  plIndef: 'vogels',       plDef: 'de vogels',        h1Display: 'Vogels 2' },
  'body_parts':             { gender: 'het', plIndef: 'lichaamsdelen', plDef: 'de lichaamsdelen', h1Display: 'Lichaamsdelen' }, // het lichaamsdeel -> -delen
  'breakfast':              { gender: 'de',  plIndef: 'boterhammen',  plDef: 'de boterhammen',   h1Display: 'Ontbijt', mass: true }, // meal -> count sandwiches (boterham -> boterhammen, consonant-doubling)
  'camping':                { gender: 'de',  plIndef: 'tenten',       plDef: 'de tenten',        h1Display: 'Kamperen', mass: true }, // activity -> count tents (tent -> tenten)
  'christmas':              { gender: 'het', plIndef: 'cadeaus',      plDef: 'de cadeaus',       h1Display: 'Kerstmis', mass: true }, // occasion -> count gifts (het cadeau -> cadeaus)
  'classroom':              { gender: 'het', plIndef: 'potloden',     plDef: 'de potloden',      h1Display: 'Klaslokaal', mass: true }, // place -> count pencils (het potlood -> potloden, o->oo + d->d)
  'clothing':               { gender: 'het', plIndef: 'kledingstukken', plDef: 'de kledingstukken', h1Display: 'Kleding', mass: true }, // mass "kleding" -> count garments (het kledingstuk -> -stukken)
  'colors':                 { gender: 'de',  plIndef: 'kleuren',      plDef: 'de kleuren',       h1Display: 'Kleuren' }, // kleur -> kleuren
  'desserts_and_sweets':    { gender: 'het', plIndef: 'toetjes',      plDef: 'de toetjes',       h1Display: 'Desserts en snoep' }, // het toetje -> toetjes (diminutive -s)
  'dinosaurs':              { gender: 'de',  plIndef: 'dinosaurussen', plDef: 'de dinosaurussen', h1Display: 'Dinosaurussen' }, // dinosaurus -> dinosaurussen (consonant-doubling)
  'easter':                 { gender: 'het', plIndef: 'eieren',       plDef: 'de eieren',        h1Display: 'Pasen', mass: true }, // occasion -> count eggs (het ei -> eieren, suppletive -eren)
  'emotions':               { gender: 'de',  plIndef: 'emoties',      plDef: 'de emoties',       h1Display: 'Emoties' }, // emotie -> emoties (-tie takes -s)
  'farm_animals':           { gender: 'het', plIndef: 'dieren',       plDef: 'de dieren',        h1Display: 'Boerderijdieren' },
  'flowers':                { gender: 'de',  plIndef: 'bloemen',      plDef: 'de bloemen',       h1Display: 'Bloemen' }, // bloem -> bloemen
  'forest_creatures':       { gender: 'het', plIndef: 'dieren',       plDef: 'de dieren',        h1Display: 'Boswezens' },
  'fruits':                 { gender: 'de',  plIndef: 'vruchten',     plDef: 'de vruchten',      h1Display: 'Fruit', mass: true }, // "fruit" is mass -> count vruchten (vrucht -> vruchten)
  'furniture':              { gender: 'het', plIndef: 'meubels',      plDef: 'de meubels',       h1Display: 'Meubels' }, // het meubel -> meubels (-el takes -s)
  'hospital':               { gender: 'de',  plIndef: 'spuiten',      plDef: 'de spuiten',       h1Display: 'Ziekenhuis', mass: true }, // place -> count syringes (spuit -> spuiten)
  'insects_and_bugs':       { gender: 'het', plIndef: 'insecten',     plDef: 'de insecten',      h1Display: 'Insecten en beestjes' }, // het insect -> insecten
  'kitchen_tools':          { gender: 'de',  plIndef: 'keukenspullen', plDef: 'de keukenspullen',  h1Display: 'Keukengerei', mass: true }, // mass "keukengerei" (def. would be "het") -> count plural "keukenspullen" (de keukenspullen)
  'miscellaneous':          { gender: 'de',  plIndef: 'spullen',      plDef: 'de spullen',       h1Display: 'Diversen', mass: true }, // abstract "Diversen" -> count "spullen"
  'music':                  { gender: 'het', plIndef: 'instrumenten', plDef: 'de instrumenten',  h1Display: 'Muziek', mass: true }, // mass "Muziek" -> count instruments (het instrument -> instrumenten)
  'occupations':            { gender: 'het', plIndef: 'beroepen',     plDef: 'de beroepen',      h1Display: 'Beroepen' }, // het beroep -> beroepen
  'ocean_life':             { gender: 'het', plIndef: 'zeedieren',    plDef: 'de zeedieren',     h1Display: 'Oceaanleven', mass: true }, // mass "Oceaanleven" -> count sea creatures (het zeedier -> zeedieren)
  'pets':                   { gender: 'het', plIndef: 'dieren',       plDef: 'de dieren',        h1Display: 'Huisdieren' },
  'post_office':            { gender: 'de',  plIndef: 'brieven',      plDef: 'de brieven',       h1Display: 'Postkantoor', mass: true }, // place -> count letters (brief -> brieven, f->v devoicing)
  'reptiles_and_amphibians':{ gender: 'het', plIndef: 'reptielen',    plDef: 'de reptielen',     h1Display: 'Reptielen en amfibieën' }, // het reptiel -> reptielen
  'shapes':                 { gender: 'de',  plIndef: 'vormen',       plDef: 'de vormen',        h1Display: 'Vormen' }, // vorm -> vormen
  'space':                  { gender: 'de',  plIndef: 'sterren',      plDef: 'de sterren',       h1Display: 'Ruimte', mass: true }, // place "Ruimte" -> count stars (ster -> sterren, consonant-doubling)
  'spring':                 { gender: 'de',  plIndef: 'bloemen',      plDef: 'de bloemen',       h1Display: 'Lente', mass: true }, // season -> count flowers
  'summer':                 { gender: 'het', plIndef: 'ijsjes',       plDef: 'de ijsjes',        h1Display: 'Zomer', mass: true }, // season -> count ice creams (het ijsje -> ijsjes, diminutive -s)
  'thanksgivinng':          { gender: 'de',  plIndef: 'pompoenen',    plDef: 'de pompoenen',     h1Display: 'Thanksgiving', mass: true }, // occasion -> count pumpkins (pompoen -> pompoenen)
  'things_that_fly':        { gender: 'het', plIndef: 'vliegtuigen',  plDef: 'de vliegtuigen',   h1Display: 'Dingen die vliegen', mass: true }, // label -> count airplanes (het vliegtuig -> vliegtuigen)
  'tools':                  { gender: 'het', plIndef: 'gereedschappen', plDef: 'de gereedschappen', h1Display: 'Gereedschap', mass: true }, // mass "Gereedschap" -> countable gereedschappen (het gereedschap -> -pen)
  'toys':                   { gender: 'het', plIndef: 'speelgoedjes', plDef: 'de speelgoedjes',  h1Display: 'Speelgoed', mass: true }, // mass "Speelgoed" -> count (informal) speelgoedjes (diminutive -s)
  'tree':                   { gender: 'de',  plIndef: 'bomen',        plDef: 'de bomen',         h1Display: 'Bomen' }, // boom -> bomen (vowel single-down oo->o + -en)
  'vegetables':             { gender: 'de',  plIndef: 'groenten',     plDef: 'de groenten',      h1Display: 'Groenten' }, // groente -> groenten
  'vehicles':               { gender: 'het', plIndef: 'voertuigen',   plDef: 'de voertuigen',    h1Display: 'Voertuigen' }, // het voertuig -> voertuigen
  'weather':                { gender: 'de',  plIndef: 'wolken',       plDef: 'de wolken',        h1Display: 'Weer', mass: true }, // mass "Weer" -> count clouds (wolk -> wolken)
  'winter':                 { gender: 'de',  plIndef: 'sneeuwvlokken', plDef: 'de sneeuwvlokken', h1Display: 'Winter', mass: true }, // season -> count snowflakes (sneeuwvlok -> -vlokken, consonant-doubling)
  'zoo_animals':            { gender: 'het', plIndef: 'dieren',       plDef: 'de dieren',        h1Display: 'Dierentuindieren' },
};

module.exports = { THEMES };
