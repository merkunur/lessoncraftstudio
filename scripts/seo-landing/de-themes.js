/* Shared de THEMES table for the German landing fan-out (STEP 2 readiness bulk + STEP 1 addition).
 * theme axis-key -> { nPl: stored-plural phrase, gen: PLURAL collective, h1: de display name }.
 * nPl verified against REFERENCE TRANSLATIONS/image-vocabulary.js (de stored plurals);
 * h1 verbatim from frontend/config/topics-taxonomy.json name.de. gen is ALWAYS a PLURAL noun
 * (so "die {GEN}" + the datN() dative helper both work). Gender-safe: every value is a plural
 * usable only after die / a preposition / a fixed-neuter anchor — never slotted singular.
 *
 * The 41 "object" themes mirror gen-de-addition.js verbatim (the shipped STEP-1 set). Readiness-only
 * themes (colors/emotions/body_parts/weather/seasons/activities — valid under the readiness gate, which
 * has NO countability check) are appended as each readiness sub-slice's enum surfaces them, T1-verified.
 */
'use strict';

const THEMES = {
  // --- 41 object themes (STEP-1 addition set; valid for every type) ---
  accessories:             {nPl:'Hüte, Gürtel und Schals',                  gen:'Accessoires',          h1:'Accessoires'},
  animals:                 {nPl:'Kühe, Schafe und Hühner',                  gen:'Tiere',                h1:'Tiere'},
  around_the_house:        {nPl:'Lampen, Stühle und Uhren',                 gen:'Haushaltsdinge',       h1:'Rund ums Haus'},
  at_the_supermarket:      {nPl:'Einkaufswagen, Körbe und Regale',          gen:'Supermarktdinge',      h1:'Im Supermarkt'},
  bakery:                  {nPl:'Bagels, Brötchen und Kuchen',              gen:'Backwaren',            h1:'Bäckerei'},
  beach:                   {nPl:'Eimer, Schaufeln und Seesterne',           gen:'Strandsachen',         h1:'Strand'},
  birds:                   {nPl:'Rotkehlchen, Eulen und Enten',             gen:'Vögel',                h1:'Vögel'},
  birds_2:                 {nPl:'Papageien, Schwäne und Krähen',            gen:'Vögel',                h1:'Vögel 2'},
  breakfast:               {nPl:'Eier, Pfannkuchen und Bananen',            gen:'Frühstückssachen',     h1:'Frühstück'},
  camping:                 {nPl:'Zelte, Taschenlampen und Rucksäcke',       gen:'Campingsachen',        h1:'Camping'},
  christmas:               {nPl:'Bäume, Christbaumkugeln und Weihnachtsstrümpfe', gen:'Weihnachtssachen', h1:'Weihnachten'},
  classroom:               {nPl:'Bleistifte, Bücher und Globen',            gen:'Klassenzimmersachen',  h1:'Klassenzimmer'},
  clothing:                {nPl:'Hemden, Socken und Hüte',                  gen:'Kleidungsstücke',      h1:'Kleidung'},
  desserts_and_sweets:     {nPl:'Cupcakes, Lutscher und Kuchen',            gen:'Süßigkeiten',          h1:'Desserts und Süßigkeiten'},
  dinosaurs:               {nPl:'Stegosauren, Triceratops und Velociraptore', gen:'Dinosaurier',        h1:'Dinosaurier'},
  easter:                  {nPl:'Eier, Häschen und Körbe',                  gen:'Ostersachen',          h1:'Ostern'},
  farm_animals:            {nPl:'Kühe, Schweine und Ziegen',                gen:'Bauernhoftiere',       h1:'Bauernhoftiere'},
  flowers:                 {nPl:'Tulpen, Narzissen und Rosen',              gen:'Blumen',               h1:'Blumen'},
  forest_creatures:        {nPl:'Füchse, Bären und Igel',                   gen:'Waldtiere',            h1:'Waldtiere'},
  fruits:                  {nPl:'Äpfel, Bananen und Birnen',                gen:'Früchte',              h1:'Früchte'},
  furniture:               {nPl:'Sofas, Tische und Lampen',                 gen:'Möbelstücke',          h1:'Möbel'},
  hospital:                {nPl:'Betten, Verbände und Stethoskope',         gen:'Krankenhaussachen',    h1:'Krankenhaus'},
  insects_and_bugs:        {nPl:'Ameisen, Bienen und Marienkäfer',          gen:'Insekten',             h1:'Insekten und Käfer'},
  kitchen_tools:           {nPl:'Löffel, Schneebesen und Pfannen',          gen:'Küchenutensilien',     h1:'Küchenwerkzeuge'},
  miscellaneous:           {nPl:'Schlüssel, Knöpfe und Regenschirme',       gen:'Alltagsgegenstände',   h1:'Verschiedenes'},
  music:                   {nPl:'Trommeln, Glocken und Flöten',             gen:'Instrumente',          h1:'Musik'},
  occupations:             {nPl:'Krankenschwestern, Piloten und Kassierer', gen:'Berufe',               h1:'Berufe'},
  ocean_life:              {nPl:'Fische, Krabben und Kraken',               gen:'Meerestiere',          h1:'Meeresleben'},
  pets:                    {nPl:'Katzen, Hunde und Kaninchen',              gen:'Haustiere',            h1:'Haustiere'},
  post_office:             {nPl:'Briefe, Stempel und Pakete',               gen:'Postsachen',           h1:'Postamt'},
  reptiles_and_amphibians: {nPl:'Frösche, Schlangen und Schildkröten',      gen:'Reptilien',            h1:'Reptilien und Amphibien'},
  shapes:                  {nPl:'Kreise, Quadrate und Dreiecke',            gen:'Formen',               h1:'Formen'},
  space:                   {nPl:'Raketen, Planeten und Sterne',             gen:'Weltraumsachen',       h1:'Weltraum'},
  thanksgivinng:           {nPl:'Truthähne, Kürbisse und Kuchen',           gen:'Erntedanksachen',      h1:'Erntedankfest'},
  things_that_fly:         {nPl:'Drachen, Flugzeuge und Ballons',           gen:'Flugobjekte',          h1:'Dinge die fliegen'},
  tools:                   {nPl:'Hämmer, Handsägen und Schraubenschlüssel', gen:'Werkzeuge',            h1:'Werkzeuge'},
  toys:                    {nPl:'Bälle, Puppen und Roboter',                gen:'Spielsachen',          h1:'Spielzeug'},
  tree:                    {nPl:'Eichen, Tannen und Birken',                gen:'Bäume',                h1:'Bäume'},
  vegetables:              {nPl:'Karotten, Erbsen und Kürbisse',            gen:'Gemüsesorten',         h1:'Gemüse'},
  vehicles:                {nPl:'Busse, Lastwagen und Bagger',              gen:'Fahrzeuge',            h1:'Fahrzeuge'},
  zoo_animals:             {nPl:'Löwen, Zebras und Giraffen',               gen:'Zootiere',             h1:'Zootiere'},
  // --- readiness-only themes (valid under the no-countability readiness gate; T1-verified) ---
  // colors/emotions/activities use noun-only plurals (no bare adjectives — they'd break "die {N_PL}";
  // colors avoids the shapes-theme nPl collision via colour-shade nouns).
  colors:                  {nPl:'Rottöne, Blautöne und Gelbtöne',           gen:'Farben',               h1:'Farben'},
  emotions:                {nPl:'Lachgesichter, Weingesichter und Wutgesichter', gen:'Gefühle',          h1:'Emotionen'},
  body_parts:              {nPl:'Hände, Füße und Ohren',                    gen:'Körperteile',          h1:'Körperteile'},
  weather:                 {nPl:'Sonnen, Wolken und Regentropfen',          gen:'Wetterbilder',         h1:'Wetter'},
  spring:                  {nPl:'Blumen, Schmetterlinge und Knospen',       gen:'Frühlingsbilder',      h1:'Frühling'},
  summer:                  {nPl:'Sonnenschirme, Sandburgen und Bälle',      gen:'Sommerbilder',         h1:'Sommer'},
  winter:                  {nPl:'Schneeflocken, Schneemänner und Schlitten', gen:'Winterbilder',        h1:'Winter'},
  activities:              {nPl:'Laufbilder, Springbilder und Tanzbilder',  gen:'Aktivitäten',          h1:'Aktivitäten'},
};

module.exports = { THEMES };
