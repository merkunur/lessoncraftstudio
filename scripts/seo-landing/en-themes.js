/* Shared en THEMES table for the cross-language ("Learn <X>") landing fan-out (en page-locale → 10 targets).
 * theme axis-key -> { nPl: English plural example list, gen: English collective, h1: display name }.
 * Seeded from the English THEMES literal in gen-wave4-literacyA.js (nouns/gen/h1), with the singular
 * `nouns` triples pluralized for {N_PL}. gen + h1 reused verbatim. English needs no declension, so the
 * render (en-render.js) is pure substitution. Used by gen-crosslang-v2.js (listForm=nPl, coll=gen, disp=h1).
 */
'use strict';

const THEMES = {
  '4th_of_july':           {nPl:'flags, stars and drums',                gen:'Fourth of July things',  h1:'Fourth of July Things'},
  accessories:             {nPl:'hats, belts and scarves',              gen:'accessories',            h1:'Accessories'},
  animals:                 {nPl:'cats, sheep and hens',                 gen:'animals',                h1:'Animals'},
  around_the_house:        {nPl:'lamps, chairs and clocks',             gen:'household things',       h1:'Household Things'},
  at_the_supermarket:      {nPl:'carts, baskets and tills',             gen:'supermarket things',     h1:'Supermarket Things'},
  bakery:                  {nPl:'bagels, buns and cakes',               gen:'bakery treats',          h1:'Bakery Treats'},
  beach:                   {nPl:'buckets, spades and starfish',         gen:'beach things',           h1:'Beach Things'},
  birds:                   {nPl:'robins, owls and ducks',               gen:'birds',                  h1:'Birds'},
  birds_2:                 {nPl:'parrots, swans and crows',             gen:'birds',                  h1:'More Birds'},
  breakfast:               {nPl:'eggs, pancakes and bananas',           gen:'breakfast foods',        h1:'Breakfast'},
  camping:                 {nPl:'tents, torches and backpacks',         gen:'camping gear',           h1:'Camping Gear'},
  christmas:               {nPl:'trees, baubles and stockings',         gen:'Christmas things',       h1:'Christmas'},
  classroom:               {nPl:'pencils, books and globes',            gen:'classroom objects',      h1:'Classroom Objects'},
  clothing:                {nPl:'shirts, socks and hats',               gen:'clothes',                h1:'Clothes'},
  desserts_and_sweets:     {nPl:'cupcakes, lollipops and pies',         gen:'sweet treats',           h1:'Desserts and Sweets'},
  dinosaurs:               {nPl:'tyrannosaurs, stegosaurs and raptors', gen:'dinosaurs',              h1:'Dinosaurs'},
  easter:                  {nPl:'eggs, bunnies and baskets',            gen:'Easter things',          h1:'Easter'},
  farm_animals:            {nPl:'cows, pigs and goats',                 gen:'farm animals',           h1:'Farm Animals'},
  flowers:                 {nPl:'tulips, daisies and roses',            gen:'flowers',                h1:'Flowers'},
  forest_creatures:        {nPl:'foxes, deer and hedgehogs',            gen:'forest creatures',       h1:'Forest Creatures'},
  fruits:                  {nPl:'apples, bananas and pears',            gen:'fruit',                  h1:'Fruits'},
  furniture:               {nPl:'sofas, tables and lamps',              gen:'furniture',              h1:'Furniture'},
  hospital:                {nPl:'beds, bandages and stethoscopes',      gen:'hospital things',        h1:'Hospital Things'},
  insects_and_bugs:        {nPl:'ants, bees and ladybugs',              gen:'bugs',                   h1:'Insects and Bugs'},
  kitchen_tools:           {nPl:'spoons, whisks and pans',              gen:'kitchen tools',          h1:'Kitchen Tools'},
  miscellaneous:           {nPl:'keys, buttons and umbrellas',          gen:'everyday objects',       h1:'Everyday Objects'},
  music:                   {nPl:'drums, bells and flutes',              gen:'instruments',            h1:'Musical Instruments'},
  occupations:             {nPl:'chefs, nurses and pilots',             gen:'community helpers',      h1:'Community Helpers'},
  ocean_life:              {nPl:'fish, crabs and octopuses',            gen:'sea creatures',          h1:'Ocean Life'},
  pets:                    {nPl:'cats, dogs and rabbits',               gen:'pets',                   h1:'Pets'},
  post_office:             {nPl:'letters, stamps and parcels',          gen:'post',                   h1:'Post Office'},
  reptiles_and_amphibians: {nPl:'frogs, snakes and turtles',           gen:'reptiles',               h1:'Reptiles and Amphibians'},
  shapes:                  {nPl:'circles, squares and triangles',       gen:'shapes',                 h1:'Shapes'},
  space:                   {nPl:'rockets, planets and stars',           gen:'space things',           h1:'Space'},
  thanksgivinng:           {nPl:'turkeys, pumpkins and pies',           gen:'Thanksgiving things',    h1:'Thanksgiving'},
  things_that_fly:         {nPl:'kites, planes and balloons',           gen:'flying things',          h1:'Things That Fly'},
  tools:                   {nPl:'hammers, saws and wrenches',           gen:'tools',                  h1:'Tools'},
  toys:                    {nPl:'balls, blocks and teddies',            gen:'toys',                   h1:'Toys'},
  tree:                    {nPl:'oaks, pines and palms',                gen:'trees',                  h1:'Trees'},
  vegetables:              {nPl:'carrots, peas and pumpkins',           gen:'vegetables',             h1:'Vegetables'},
  vehicles:                {nPl:'buses, trucks and diggers',            gen:'vehicles',               h1:'Vehicles'},
  zoo_animals:             {nPl:'lions, zebras and giraffes',           gen:'zoo animals',            h1:'Zoo Animals'},
  colors:                  {nPl:'reds, blues and greens',               gen:'colors',                 h1:'Colors'},
  emotions:                {nPl:'smiling, sad and surprised faces',     gen:'feelings',               h1:'Feelings'},
  body_parts:              {nPl:'hands, feet and ears',                 gen:'body parts',             h1:'Body Parts'},
  weather:                 {nPl:'sunshine, rain and snow',              gen:'weather',                h1:'Weather'},
  spring:                  {nPl:'flowers, raindrops and kites',         gen:'spring things',          h1:'Spring'},
  summer:                  {nPl:'sunshine, ice creams and beach balls', gen:'summer things',          h1:'Summer'},
  winter:                  {nPl:'snowflakes, mittens and scarves',      gen:'winter things',          h1:'Winter'},
  activities:              {nPl:'running, jumping and swimming',        gen:'action words',           h1:'Activities'},
};

module.exports = { THEMES };
