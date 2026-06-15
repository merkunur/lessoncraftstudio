/* Shared `fr` THEMES table for the French landing fan-out (fr ledger-lock 2026-06-15).
 * theme axis-key -> { gen: 'm'|'f', vowelInit: bool, plIndef: bare plural (single token),
 *                     h1Display: display name (verbatim topics-taxonomy.json name.fr) }.
 *
 * The render (fr-render.js) DERIVES every contraction from plIndef + vowelInit:
 *   les/des/aux + plIndef (plural article + contractions), and de/d' + plIndef (elision by vowelInit).
 * All theme refs are PLURAL → the singular elisions (l'/du/au) never fire. assertThemeTable()
 * FAIL-halts if vowelInit disagrees with plIndef's initial (the d'/de guard).
 *
 * Authored by the fr native-linguist ensemble (curriculum + SEO + morphology agents), gender +
 * plural + vowelInit hand-verified (French authority, never cross-applied — §A.13.58). plIndef is
 * a natural countable plural a 3-7-year-old recognizes (count surrogate for place/season/mass
 * themes). h1Display verbatim from name.fr. The œ-ligature `œufs` is vowel-initial (d'œufs).
 */
'use strict';

const THEMES = {
  '4th_of_july':             { gen: 'm', vowelInit: false, plIndef: 'drapeaux',     h1Display: '4 juillet' },
  'accessories':             { gen: 'm', vowelInit: true,  plIndef: 'accessoires',  h1Display: 'Accessoires' },
  'activities':              { gen: 'f', vowelInit: true,  plIndef: 'activités',    h1Display: 'Activités' },
  'animals':                 { gen: 'm', vowelInit: true,  plIndef: 'animaux',      h1Display: 'Animaux' },
  'around_the_house':        { gen: 'm', vowelInit: true,  plIndef: 'objets',       h1Display: 'Autour de la maison' },
  'at_the_supermarket':      { gen: 'm', vowelInit: false, plIndef: 'produits',     h1Display: 'Au supermarché' },
  'bakery':                  { gen: 'm', vowelInit: false, plIndef: 'gâteaux',      h1Display: 'Boulangerie' },
  'beach':                   { gen: 'm', vowelInit: false, plIndef: 'coquillages',  h1Display: 'Plage' },
  'birds':                   { gen: 'm', vowelInit: true,  plIndef: 'oiseaux',      h1Display: 'Oiseaux' },
  'birds_2':                 { gen: 'm', vowelInit: true,  plIndef: 'oiseaux',      h1Display: 'Oiseaux 2' },
  'body_parts':              { gen: 'f', vowelInit: false, plIndef: 'mains',        h1Display: 'Parties du corps' },
  'breakfast':               { gen: 'm', vowelInit: false, plIndef: 'croissants',   h1Display: 'Petit-déjeuner' },
  'camping':                 { gen: 'f', vowelInit: false, plIndef: 'tentes',       h1Display: 'Camping' },
  'christmas':               { gen: 'm', vowelInit: false, plIndef: 'cadeaux',      h1Display: 'Noël' },
  'classroom':               { gen: 'm', vowelInit: false, plIndef: 'crayons',      h1Display: 'Salle de classe' },
  'clothing':                { gen: 'm', vowelInit: false, plIndef: 'vêtements',    h1Display: 'Vêtements' },
  'colors':                  { gen: 'f', vowelInit: false, plIndef: 'couleurs',     h1Display: 'Couleurs' },
  'desserts_and_sweets':     { gen: 'm', vowelInit: false, plIndef: 'desserts',     h1Display: 'Desserts et sucreries' },
  'dinosaurs':               { gen: 'm', vowelInit: false, plIndef: 'dinosaures',   h1Display: 'Dinosaures' },
  'easter':                  { gen: 'm', vowelInit: true,  plIndef: 'œufs',         h1Display: 'Pâques' }, // œ vowel ligature, silent consonants → d'œufs
  'emotions':                { gen: 'f', vowelInit: true,  plIndef: 'émotions',     h1Display: 'Émotions' },
  'farm_animals':            { gen: 'm', vowelInit: true,  plIndef: 'animaux',      h1Display: 'Animaux de la ferme' },
  'flowers':                 { gen: 'f', vowelInit: false, plIndef: 'fleurs',       h1Display: 'Fleurs' },
  'forest_creatures':        { gen: 'm', vowelInit: true,  plIndef: 'animaux',      h1Display: 'Créatures de la forêt' },
  'fruits':                  { gen: 'm', vowelInit: false, plIndef: 'fruits',       h1Display: 'Fruits' },
  'furniture':               { gen: 'm', vowelInit: false, plIndef: 'meubles',      h1Display: 'Meubles' },
  'hospital':                { gen: 'm', vowelInit: false, plIndef: 'lits',         h1Display: 'Hôpital' },
  'insects_and_bugs':        { gen: 'm', vowelInit: true,  plIndef: 'insectes',     h1Display: 'Insectes et bestioles' },
  'kitchen_tools':           { gen: 'm', vowelInit: true,  plIndef: 'ustensiles',   h1Display: 'Ustensiles de cuisine' },
  'miscellaneous':           { gen: 'm', vowelInit: true,  plIndef: 'objets',       h1Display: 'Divers' },
  'music':                   { gen: 'm', vowelInit: true,  plIndef: 'instruments',  h1Display: 'Musique' },
  'occupations':             { gen: 'm', vowelInit: false, plIndef: 'métiers',      h1Display: 'Métiers' },
  'ocean_life':              { gen: 'm', vowelInit: false, plIndef: 'poissons',     h1Display: 'Vie océanique' },
  'pets':                    { gen: 'm', vowelInit: false, plIndef: 'chiens',       h1Display: 'Animaux de compagnie' },
  'post_office':             { gen: 'f', vowelInit: false, plIndef: 'lettres',      h1Display: 'Bureau de poste' },
  'reptiles_and_amphibians': { gen: 'm', vowelInit: false, plIndef: 'reptiles',     h1Display: 'Reptiles et amphibiens' },
  'shapes':                  { gen: 'f', vowelInit: false, plIndef: 'formes',       h1Display: 'Formes' },
  'space':                   { gen: 'f', vowelInit: true,  plIndef: 'étoiles',      h1Display: 'Espace' },
  'spring':                  { gen: 'f', vowelInit: false, plIndef: 'fleurs',       h1Display: 'Printemps' },
  'summer':                  { gen: 'f', vowelInit: false, plIndef: 'glaces',       h1Display: 'Été' },
  'thanksgivinng':           { gen: 'f', vowelInit: false, plIndef: 'citrouilles',  h1Display: 'Action de grâce' }, // key typo preserved
  'things_that_fly':         { gen: 'm', vowelInit: true,  plIndef: 'avions',       h1Display: 'Choses qui volent' },
  'tools':                   { gen: 'm', vowelInit: true,  plIndef: 'outils',       h1Display: 'Outils' },
  'toys':                    { gen: 'm', vowelInit: false, plIndef: 'jouets',       h1Display: 'Jouets' },
  'tree':                    { gen: 'm', vowelInit: true,  plIndef: 'arbres',       h1Display: 'Arbres' },
  'vegetables':              { gen: 'm', vowelInit: false, plIndef: 'légumes',      h1Display: 'Légumes' },
  'vehicles':                { gen: 'm', vowelInit: false, plIndef: 'véhicules',    h1Display: 'Véhicules' },
  'weather':                 { gen: 'm', vowelInit: false, plIndef: 'nuages',       h1Display: 'Météo' },
  'winter':                  { gen: 'm', vowelInit: false, plIndef: 'flocons',      h1Display: 'Hiver' },
  'zoo_animals':             { gen: 'm', vowelInit: true,  plIndef: 'animaux',      h1Display: 'Animaux du zoo' },
};

module.exports = { THEMES };
