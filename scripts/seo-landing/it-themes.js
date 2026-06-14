/* Shared `it` THEMES table for the Italian landing fan-out (PART IT).
 * theme axis-key -> { nPl: 3-noun plural example list, gen: plural collective,
 *                     genArt: definite plural article (i|gli|le, agreement-correct),
 *                     h1: display name (verbatim from topics-taxonomy.json name.it) }.
 *
 * MISTAKE-FREE provenance: h1 from taxonomy name.it; nPl/gen/genArt authored by a
 * native-Italian linguist+K-3 ensemble agent, then EXHAUSTIVELY reviewed by an
 * INDEPENDENT native-Italian proofreader agent (author≠reviewer, §22.1) which
 * individually verified all 49 genArt values + every plural and applied 1 lexical
 * fix (emotions: "arrabbiature"→"rabbie"). assertThemeTable() (it-render.js) gates
 * article validity at generation time. Used only via it-render PURE SUBSTITUTION:
 * {N_PL} appears in agreement-free slots (after counting verbs / "con"); the
 * article-bearing form is the stored "{GEN_ART} {GEN}" pair — never computed.
 */
'use strict';

const THEMES = {
  accessories:             { nPl: 'cappelli, cinture e sciarpe',                  gen: 'accessori',            genArt: 'gli', h1: 'Accessori' },
  animals:                 { nPl: 'mucche, pecore e galline',                    gen: 'animali',              genArt: 'gli', h1: 'Animali' },
  around_the_house:        { nPl: 'lampade, sedie e orologi',                    gen: 'oggetti di casa',      genArt: 'gli', h1: 'In giro per casa' },
  at_the_supermarket:      { nPl: 'carrelli, cestini e scaffali',                gen: 'cose del supermercato', genArt: 'le', h1: 'Al supermercato' },
  bakery:                  { nPl: 'panini, ciambelle e torte',                   gen: 'prodotti da forno',    genArt: 'i',   h1: 'Panetteria' },
  beach:                   { nPl: 'secchielli, palette e stelle marine',         gen: 'cose della spiaggia',  genArt: 'le',  h1: 'Spiaggia' },
  birds:                   { nPl: 'pettirossi, gufi ed anatre',                  gen: 'uccelli',              genArt: 'gli', h1: 'Uccelli' },
  birds_2:                 { nPl: 'pappagalli, cigni e corvi',                   gen: 'uccelli',              genArt: 'gli', h1: 'Uccelli 2' },
  breakfast:               { nPl: 'uova, frittelle e banane',                    gen: 'cibi per la colazione', genArt: 'i',  h1: 'Colazione' },
  camping:                 { nPl: 'tende, torce e zaini',                        gen: 'cose da campeggio',    genArt: 'le',  h1: 'Campeggio' },
  christmas:               { nPl: 'alberi, palline e calze',                     gen: 'cose di Natale',       genArt: 'le',  h1: 'Natale' },
  classroom:               { nPl: 'matite, libri e mappamondi',                  gen: 'cose della classe',    genArt: 'le',  h1: 'Aula' },
  clothing:                { nPl: 'camicie, calzini e cappelli',                 gen: 'capi di abbigliamento', genArt: 'i',  h1: 'Abbigliamento' },
  desserts_and_sweets:     { nPl: 'tortine, lecca-lecca e torte',                gen: 'dolci',                genArt: 'i',   h1: 'Dolci e dolciumi' },
  dinosaurs:               { nPl: 'stegosauri, triceratopi e velociraptor',      gen: 'dinosauri',            genArt: 'i',   h1: 'Dinosauri' },
  easter:                  { nPl: 'uova, coniglietti e cestini',                 gen: 'cose di Pasqua',       genArt: 'le',  h1: 'Pasqua' },
  farm_animals:            { nPl: 'mucche, maiali e capre',                      gen: 'animali della fattoria', genArt: 'gli', h1: 'Animali della fattoria' },
  flowers:                 { nPl: 'tulipani, narcisi e rose',                    gen: 'fiori',                genArt: 'i',   h1: 'Fiori' },
  forest_creatures:        { nPl: 'volpi, orsi e ricci',                         gen: 'animali del bosco',    genArt: 'gli', h1: 'Creature della foresta' },
  fruits:                  { nPl: 'mele, banane e pere',                         gen: 'frutti',               genArt: 'i',   h1: 'Frutta' },
  furniture:               { nPl: 'divani, tavoli e lampade',                    gen: 'mobili',               genArt: 'i',   h1: 'Mobili' },
  hospital:                { nPl: 'letti, bende e stetoscopi',                   gen: "cose dell'ospedale",   genArt: 'le',  h1: 'Ospedale' },
  insects_and_bugs:        { nPl: 'formiche, api e coccinelle',                  gen: 'insetti',              genArt: 'gli', h1: 'Insetti e scarafaggi' },
  kitchen_tools:           { nPl: 'cucchiai, fruste e padelle',                  gen: 'utensili da cucina',   genArt: 'gli', h1: 'Utensili da cucina' },
  miscellaneous:           { nPl: 'chiavi, bottoni ed ombrelli',                 gen: 'oggetti vari',         genArt: 'gli', h1: 'Varie' },
  music:                   { nPl: 'tamburi, campane e flauti',                   gen: 'strumenti musicali',   genArt: 'gli', h1: 'Musica' },
  occupations:             { nPl: 'infermieri, piloti e cassieri',               gen: 'professioni',          genArt: 'le',  h1: 'Professioni' },
  ocean_life:              { nPl: 'pesci, granchi e polpi',                      gen: 'animali marini',       genArt: 'gli', h1: 'Vita oceanica' },
  pets:                    { nPl: 'gatti, cani e conigli',                       gen: 'animali domestici',    genArt: 'gli', h1: 'Animali domestici' },
  post_office:             { nPl: 'lettere, francobolli e pacchi',               gen: 'cose della posta',     genArt: 'le',  h1: 'Ufficio postale' },
  reptiles_and_amphibians: { nPl: 'rane, serpenti e tartarughe',                 gen: 'rettili e anfibi',     genArt: 'i',   h1: 'Rettili e anfibi' },
  shapes:                  { nPl: 'cerchi, quadrati e triangoli',                gen: 'forme',                genArt: 'le',  h1: 'Forme' },
  space:                   { nPl: 'razzi, pianeti e stelle',                     gen: 'cose dello spazio',    genArt: 'le',  h1: 'Spazio' },
  thanksgivinng:           { nPl: 'tacchini, zucche e torte',                    gen: 'cose del Ringraziamento', genArt: 'le', h1: 'Giorno del Ringraziamento' },
  things_that_fly:         { nPl: 'aquiloni, aeroplani e palloncini',            gen: 'cose che volano',      genArt: 'le',  h1: 'Cose che volano' },
  tools:                   { nPl: 'martelli, seghe e chiavi inglesi',            gen: 'attrezzi',             genArt: 'gli', h1: 'Attrezzi' },
  toys:                    { nPl: 'palle, bambole e robot',                      gen: 'giocattoli',           genArt: 'i',   h1: 'Giocattoli' },
  tree:                    { nPl: 'querce, abeti e betulle',                     gen: 'alberi',               genArt: 'gli', h1: 'Alberi' },
  vegetables:              { nPl: 'carote, piselli e zucche',                    gen: 'verdure',              genArt: 'le',  h1: 'Verdure' },
  vehicles:                { nPl: 'autobus, camion ed escavatori',               gen: 'veicoli',              genArt: 'i',   h1: 'Veicoli' },
  zoo_animals:             { nPl: 'leoni, zebre e giraffe',                      gen: 'animali dello zoo',    genArt: 'gli', h1: 'Animali dello zoo' },
  colors:                  { nPl: 'rossi, blu e gialli',                         gen: 'colori',               genArt: 'i',   h1: 'Colori' },
  emotions:                { nPl: 'gioie, paure e rabbie',                       gen: 'emozioni',             genArt: 'le',  h1: 'Emozioni' },
  body_parts:              { nPl: 'mani, piedi ed orecchie',                     gen: 'parti del corpo',      genArt: 'le',  h1: 'Parti del corpo' },
  weather:                 { nPl: 'soli, nuvole e gocce di pioggia',             gen: 'immagini del tempo',   genArt: 'le',  h1: 'Meteo' },
  spring:                  { nPl: 'fiori, farfalle e germogli',                  gen: 'immagini primaverili', genArt: 'le',  h1: 'Primavera' },
  summer:                  { nPl: 'ombrelloni, castelli di sabbia e palloni',    gen: 'immagini estive',      genArt: 'le',  h1: 'Estate' },
  winter:                  { nPl: 'fiocchi di neve, pupazzi di neve e slitte',   gen: 'immagini invernali',   genArt: 'le',  h1: 'Inverno' },
  activities:              { nPl: 'corse, salti e balli',                        gen: 'attività',             genArt: 'le',  h1: 'Attività' },
};

module.exports = THEMES;
