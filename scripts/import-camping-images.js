/**
 * Import Script: Camping Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/import-camping-images.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Detect environment and set paths
const isServer = fs.existsSync('/opt/lessoncraftstudio');
let frontendRoot;

if (isServer) {
  frontendRoot = '/opt/lessoncraftstudio/frontend';
} else {
  frontendRoot = path.resolve(__dirname, '..', 'frontend');
}

process.chdir(frontendRoot);

// Load dependencies from frontend
const { PrismaClient } = require(path.join(frontendRoot, 'node_modules', '@prisma', 'client'));
const sharp = require(path.join(frontendRoot, 'node_modules', 'sharp'));

const prisma = new PrismaClient();

// ============================================================
// CONFIGURATION - CAMPING THEME
// ============================================================

const THEME_CONFIG = {
  name: 'camping',
  type: 'images',
  sourceFolderName: 'camping',
  displayNames: {
    en: 'Camping',                    // American English
    de: 'Camping',                    // German
    fr: 'Camping',                    // French
    es: 'Campamento',                 // Mexican Spanish
    it: 'Campeggio',                  // Italian
    pt: 'Acampamento',                // Brazilian Portuguese
    nl: 'Kamperen',                   // Dutch
    sv: 'Camping',                    // Swedish
    da: 'Camping',                    // Danish
    no: 'Camping',                    // Norwegian
    fi: 'Leirielämä'                  // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'backpack.png': {
    en: 'Backpack',                   // American English
    de: 'Rucksack',                   // German
    fr: 'Sac à dos',                  // French
    es: 'Mochila',                    // Mexican Spanish
    it: 'Zaino',                      // Italian
    pt: 'Mochila',                    // Brazilian Portuguese
    nl: 'Rugzak',                     // Dutch
    sv: 'Ryggsäck',                   // Swedish
    da: 'Rygsæk',                     // Danish
    no: 'Ryggsekk',                   // Norwegian
    fi: 'Reppu'                       // Finnish
  },
  'bear.png': {
    en: 'Bear',                       // American English
    de: 'Bär',                        // German
    fr: 'Ours',                       // French
    es: 'Oso',                        // Mexican Spanish
    it: 'Orso',                       // Italian
    pt: 'Urso',                       // Brazilian Portuguese
    nl: 'Beer',                       // Dutch
    sv: 'Björn',                      // Swedish
    da: 'Bjørn',                      // Danish
    no: 'Bjørn',                      // Norwegian
    fi: 'Karhu'                       // Finnish
  },
  'binoculars.png': {
    en: 'Binoculars',                 // American English
    de: 'Fernglas',                   // German
    fr: 'Jumelles',                   // French
    es: 'Binoculares',                // Mexican Spanish
    it: 'Binocolo',                   // Italian
    pt: 'Binóculos',                  // Brazilian Portuguese
    nl: 'Verrekijker',                // Dutch
    sv: 'Kikare',                     // Swedish
    da: 'Kikkert',                    // Danish
    no: 'Kikkert',                    // Norwegian
    fi: 'Kiikari'                     // Finnish
  },
  'boots.png': {
    en: 'Boots',                      // American English
    de: 'Stiefel',                    // German
    fr: 'Bottes',                     // French
    es: 'Botas',                      // Mexican Spanish
    it: 'Stivali',                    // Italian
    pt: 'Botas',                      // Brazilian Portuguese
    nl: 'Laarzen',                    // Dutch
    sv: 'Stövlar',                    // Swedish
    da: 'Støvler',                    // Danish
    no: 'Støvler',                    // Norwegian
    fi: 'Saappaat'                    // Finnish
  },
  'cabin.png': {
    en: 'Cabin',                      // American English
    de: 'Hütte',                      // German
    fr: 'Cabane',                     // French
    es: 'Cabaña',                     // Mexican Spanish
    it: 'Capanna',                    // Italian
    pt: 'Cabana',                     // Brazilian Portuguese
    nl: 'Hut',                        // Dutch
    sv: 'Stuga',                      // Swedish
    da: 'Hytte',                      // Danish
    no: 'Hytte',                      // Norwegian
    fi: 'Mökki'                       // Finnish
  },
  'camper.png': {
    en: 'Camper',                     // American English
    de: 'Wohnmobil',                  // German
    fr: 'Camping-car',                // French
    es: 'Casa rodante',               // Mexican Spanish
    it: 'Camper',                     // Italian
    pt: 'Trailer',                    // Brazilian Portuguese
    nl: 'Camper',                     // Dutch
    sv: 'Husbil',                     // Swedish
    da: 'Autocamper',                 // Danish
    no: 'Bobil',                      // Norwegian
    fi: 'Matkailuauto'                // Finnish
  },
  'campfire.png': {
    en: 'Campfire',                   // American English
    de: 'Lagerfeuer',                 // German
    fr: 'Feu de camp',                // French
    es: 'Fogata',                     // Mexican Spanish
    it: 'Falò',                       // Italian
    pt: 'Fogueira',                   // Brazilian Portuguese
    nl: 'Kampvuur',                   // Dutch
    sv: 'Lägereld',                   // Swedish
    da: 'Lejrbål',                    // Danish
    no: 'Leirbål',                    // Norwegian
    fi: 'Nuotio'                      // Finnish
  },
  'camping chair.png': {
    en: 'Camping Chair',              // American English
    de: 'Campingstuhl',               // German
    fr: 'Chaise de camping',          // French
    es: 'Silla de camping',           // Mexican Spanish
    it: 'Sedia da campeggio',         // Italian
    pt: 'Cadeira de camping',         // Brazilian Portuguese
    nl: 'Campingstoel',               // Dutch
    sv: 'Campingstol',                // Swedish
    da: 'Campingstol',                // Danish
    no: 'Campingstol',                // Norwegian
    fi: 'Retkituoli'                  // Finnish
  },
  'canoe.png': {
    en: 'Canoe',                      // American English
    de: 'Kanu',                       // German
    fr: 'Canoë',                      // French
    es: 'Canoa',                      // Mexican Spanish
    it: 'Canoa',                      // Italian
    pt: 'Canoa',                      // Brazilian Portuguese
    nl: 'Kano',                       // Dutch
    sv: 'Kanot',                      // Swedish
    da: 'Kano',                       // Danish
    no: 'Kano',                       // Norwegian
    fi: 'Kanootti'                    // Finnish
  },
  'compass.png': {
    en: 'Compass',                    // American English
    de: 'Kompass',                    // German
    fr: 'Boussole',                   // French
    es: 'Brújula',                    // Mexican Spanish
    it: 'Bussola',                    // Italian
    pt: 'Bússola',                    // Brazilian Portuguese
    nl: 'Kompas',                     // Dutch
    sv: 'Kompass',                    // Swedish
    da: 'Kompas',                     // Danish
    no: 'Kompass',                    // Norwegian
    fi: 'Kompassi'                    // Finnish
  },
  'cooler.png': {
    en: 'Cooler',                     // American English
    de: 'Kühlbox',                    // German
    fr: 'Glacière',                   // French
    es: 'Hielera',                    // Mexican Spanish
    it: 'Frigorifero portatile',      // Italian
    pt: 'Caixa térmica',              // Brazilian Portuguese
    nl: 'Koelbox',                    // Dutch
    sv: 'Kylväska',                   // Swedish
    da: 'Køletaske',                  // Danish
    no: 'Kjølebag',                   // Norwegian
    fi: 'Kylmälaukku'                 // Finnish
  },
  'deer.png': {
    en: 'Deer',                       // American English
    de: 'Hirsch',                     // German
    fr: 'Cerf',                       // French
    es: 'Venado',                     // Mexican Spanish
    it: 'Cervo',                      // Italian
    pt: 'Veado',                      // Brazilian Portuguese
    nl: 'Hert',                       // Dutch
    sv: 'Hjort',                      // Swedish
    da: 'Hjort',                      // Danish
    no: 'Hjort',                      // Norwegian
    fi: 'Peura'                       // Finnish
  },
  'firefly.png': {
    en: 'Firefly',                    // American English
    de: 'Glühwürmchen',               // German
    fr: 'Luciole',                    // French
    es: 'Luciérnaga',                 // Mexican Spanish
    it: 'Lucciola',                   // Italian
    pt: 'Vagalume',                   // Brazilian Portuguese
    nl: 'Vuurvliegje',                // Dutch
    sv: 'Eldfluga',                   // Swedish
    da: 'Ildflue',                    // Danish
    no: 'Ildflue',                    // Norwegian
    fi: 'Tulikärpänen'                // Finnish
  },
  'fish.png': {
    en: 'Fish',                       // American English
    de: 'Fisch',                      // German
    fr: 'Poisson',                    // French
    es: 'Pez',                        // Mexican Spanish
    it: 'Pesce',                      // Italian
    pt: 'Peixe',                      // Brazilian Portuguese
    nl: 'Vis',                        // Dutch
    sv: 'Fisk',                       // Swedish
    da: 'Fisk',                       // Danish
    no: 'Fisk',                       // Norwegian
    fi: 'Kala'                        // Finnish
  },
  'fishing rod.png': {
    en: 'Fishing Rod',                // American English
    de: 'Angelrute',                  // German
    fr: 'Canne à pêche',              // French
    es: 'Caña de pescar',             // Mexican Spanish
    it: 'Canna da pesca',             // Italian
    pt: 'Vara de pescar',             // Brazilian Portuguese
    nl: 'Hengel',                     // Dutch
    sv: 'Fiskespö',                   // Swedish
    da: 'Fiskestang',                 // Danish
    no: 'Fiskestang',                 // Norwegian
    fi: 'Onkivapa'                    // Finnish
  },
  'flashlight.png': {
    en: 'Flashlight',                 // American English
    de: 'Taschenlampe',               // German
    fr: 'Lampe de poche',             // French
    es: 'Linterna',                   // Mexican Spanish
    it: 'Torcia',                     // Italian
    pt: 'Lanterna',                   // Brazilian Portuguese
    nl: 'Zaklamp',                    // Dutch
    sv: 'Ficklampa',                  // Swedish
    da: 'Lommelygte',                 // Danish
    no: 'Lommelykt',                  // Norwegian
    fi: 'Taskulamppu'                 // Finnish
  },
  'forest.png': {
    en: 'Forest',                     // American English
    de: 'Wald',                       // German
    fr: 'Forêt',                      // French
    es: 'Bosque',                     // Mexican Spanish
    it: 'Foresta',                    // Italian
    pt: 'Floresta',                   // Brazilian Portuguese
    nl: 'Bos',                        // Dutch
    sv: 'Skog',                       // Swedish
    da: 'Skov',                       // Danish
    no: 'Skog',                       // Norwegian
    fi: 'Metsä'                       // Finnish
  },
  'fox.png': {
    en: 'Fox',                        // American English
    de: 'Fuchs',                      // German
    fr: 'Renard',                     // French
    es: 'Zorro',                      // Mexican Spanish
    it: 'Volpe',                      // Italian
    pt: 'Raposa',                     // Brazilian Portuguese
    nl: 'Vos',                        // Dutch
    sv: 'Räv',                        // Swedish
    da: 'Ræv',                        // Danish
    no: 'Rev',                        // Norwegian
    fi: 'Kettu'                       // Finnish
  },
  'frog.png': {
    en: 'Frog',                       // American English
    de: 'Frosch',                     // German
    fr: 'Grenouille',                 // French
    es: 'Rana',                       // Mexican Spanish
    it: 'Rana',                       // Italian
    pt: 'Sapo',                       // Brazilian Portuguese
    nl: 'Kikker',                     // Dutch
    sv: 'Groda',                      // Swedish
    da: 'Frø',                        // Danish
    no: 'Frosk',                      // Norwegian
    fi: 'Sammakko'                    // Finnish
  },
  'grill.png': {
    en: 'Grill',                      // American English
    de: 'Grill',                      // German
    fr: 'Barbecue',                   // French
    es: 'Asador',                     // Mexican Spanish
    it: 'Griglia',                    // Italian
    pt: 'Churrasqueira',              // Brazilian Portuguese
    nl: 'Barbecue',                   // Dutch
    sv: 'Grill',                      // Swedish
    da: 'Grill',                      // Danish
    no: 'Grill',                      // Norwegian
    fi: 'Grilli'                      // Finnish
  },
  'hammock.png': {
    en: 'Hammock',                    // American English
    de: 'Hängematte',                 // German
    fr: 'Hamac',                      // French
    es: 'Hamaca',                     // Mexican Spanish
    it: 'Amaca',                      // Italian
    pt: 'Rede',                       // Brazilian Portuguese
    nl: 'Hangmat',                    // Dutch
    sv: 'Hängmatta',                  // Swedish
    da: 'Hængekøje',                  // Danish
    no: 'Hengekøye',                  // Norwegian
    fi: 'Riippumatto'                 // Finnish
  },
  'hat.png': {
    en: 'Hat',                        // American English
    de: 'Hut',                        // German
    fr: 'Chapeau',                    // French
    es: 'Sombrero',                   // Mexican Spanish
    it: 'Cappello',                   // Italian
    pt: 'Chapéu',                     // Brazilian Portuguese
    nl: 'Hoed',                       // Dutch
    sv: 'Hatt',                       // Swedish
    da: 'Hat',                        // Danish
    no: 'Hatt',                       // Norwegian
    fi: 'Hattu'                       // Finnish
  },
  'hot dog.png': {
    en: 'Hot Dog',                    // American English
    de: 'Hotdog',                     // German
    fr: 'Hot-dog',                    // French
    es: 'Hot dog',                    // Mexican Spanish
    it: 'Hot dog',                    // Italian
    pt: 'Cachorro-quente',            // Brazilian Portuguese
    nl: 'Hotdog',                     // Dutch
    sv: 'Korv med bröd',              // Swedish
    da: 'Hotdog',                     // Danish
    no: 'Pølse i brød',               // Norwegian
    fi: 'Hodari'                      // Finnish
  },
  'kayak.png': {
    en: 'Kayak',                      // American English
    de: 'Kajak',                      // German
    fr: 'Kayak',                      // French
    es: 'Kayak',                      // Mexican Spanish
    it: 'Kayak',                      // Italian
    pt: 'Caiaque',                    // Brazilian Portuguese
    nl: 'Kajak',                      // Dutch
    sv: 'Kajak',                      // Swedish
    da: 'Kajak',                      // Danish
    no: 'Kajakk',                     // Norwegian
    fi: 'Kajakki'                     // Finnish
  },
  'kettle.png': {
    en: 'Kettle',                     // American English
    de: 'Kessel',                     // German
    fr: 'Bouilloire',                 // French
    es: 'Tetera',                     // Mexican Spanish
    it: 'Bollitore',                  // Italian
    pt: 'Chaleira',                   // Brazilian Portuguese
    nl: 'Ketel',                      // Dutch
    sv: 'Vattenkokare',               // Swedish
    da: 'Kedel',                      // Danish
    no: 'Kjele',                      // Norwegian
    fi: 'Kattila'                     // Finnish
  },
  'lake.png': {
    en: 'Lake',                       // American English
    de: 'See',                        // German
    fr: 'Lac',                        // French
    es: 'Lago',                       // Mexican Spanish
    it: 'Lago',                       // Italian
    pt: 'Lago',                       // Brazilian Portuguese
    nl: 'Meer',                       // Dutch
    sv: 'Sjö',                        // Swedish
    da: 'Sø',                         // Danish
    no: 'Innsjø',                     // Norwegian
    fi: 'Järvi'                       // Finnish
  },
  'lantern.png': {
    en: 'Lantern',                    // American English
    de: 'Laterne',                    // German
    fr: 'Lanterne',                   // French
    es: 'Farol',                      // Mexican Spanish
    it: 'Lanterna',                   // Italian
    pt: 'Lampião',                    // Brazilian Portuguese
    nl: 'Lantaarn',                   // Dutch
    sv: 'Lykta',                      // Swedish
    da: 'Lanterne',                   // Danish
    no: 'Lykt',                       // Norwegian
    fi: 'Lyhty'                       // Finnish
  },
  'log.png': {
    en: 'Log',                        // American English
    de: 'Holzscheit',                 // German
    fr: 'Bûche',                      // French
    es: 'Tronco',                     // Mexican Spanish
    it: 'Ceppo',                      // Italian
    pt: 'Tora',                       // Brazilian Portuguese
    nl: 'Boomstam',                   // Dutch
    sv: 'Stock',                      // Swedish
    da: 'Træstamme',                  // Danish
    no: 'Tømmerstokk',                // Norwegian
    fi: 'Halko'                       // Finnish
  },
  'map.png': {
    en: 'Map',                        // American English
    de: 'Karte',                      // German
    fr: 'Carte',                      // French
    es: 'Mapa',                       // Mexican Spanish
    it: 'Mappa',                      // Italian
    pt: 'Mapa',                       // Brazilian Portuguese
    nl: 'Kaart',                      // Dutch
    sv: 'Karta',                      // Swedish
    da: 'Kort',                       // Danish
    no: 'Kart',                       // Norwegian
    fi: 'Kartta'                      // Finnish
  },
  'moon.png': {
    en: 'Moon',                       // American English
    de: 'Mond',                       // German
    fr: 'Lune',                       // French
    es: 'Luna',                       // Mexican Spanish
    it: 'Luna',                       // Italian
    pt: 'Lua',                        // Brazilian Portuguese
    nl: 'Maan',                       // Dutch
    sv: 'Måne',                       // Swedish
    da: 'Måne',                       // Danish
    no: 'Måne',                       // Norwegian
    fi: 'Kuu'                         // Finnish
  },
  'mountain.png': {
    en: 'Mountain',                   // American English
    de: 'Berg',                       // German
    fr: 'Montagne',                   // French
    es: 'Montaña',                    // Mexican Spanish
    it: 'Montagna',                   // Italian
    pt: 'Montanha',                   // Brazilian Portuguese
    nl: 'Berg',                       // Dutch
    sv: 'Berg',                       // Swedish
    da: 'Bjerg',                      // Danish
    no: 'Fjell',                      // Norwegian
    fi: 'Vuori'                       // Finnish
  },
  'oar.png': {
    en: 'Oar',                        // American English
    de: 'Ruder',                      // German
    fr: 'Rame',                       // French
    es: 'Remo',                       // Mexican Spanish
    it: 'Remo',                       // Italian
    pt: 'Remo',                       // Brazilian Portuguese
    nl: 'Roeispaan',                  // Dutch
    sv: 'Åra',                        // Swedish
    da: 'Åre',                        // Danish
    no: 'Åre',                        // Norwegian
    fi: 'Airo'                        // Finnish
  },
  'owl.png': {
    en: 'Owl',                        // American English
    de: 'Eule',                       // German
    fr: 'Hibou',                      // French
    es: 'Búho',                       // Mexican Spanish
    it: 'Gufo',                       // Italian
    pt: 'Coruja',                     // Brazilian Portuguese
    nl: 'Uil',                        // Dutch
    sv: 'Uggla',                      // Swedish
    da: 'Ugle',                       // Danish
    no: 'Ugle',                       // Norwegian
    fi: 'Pöllö'                       // Finnish
  },
  'picnic table.png': {
    en: 'Picnic Table',               // American English
    de: 'Picknicktisch',              // German
    fr: 'Table de pique-nique',       // French
    es: 'Mesa de picnic',             // Mexican Spanish
    it: 'Tavolo da picnic',           // Italian
    pt: 'Mesa de piquenique',         // Brazilian Portuguese
    nl: 'Picknicktafel',              // Dutch
    sv: 'Picknickbord',               // Swedish
    da: 'Picnicbord',                 // Danish
    no: 'Piknikbord',                 // Norwegian
    fi: 'Piknikpöytä'                 // Finnish
  },
  'pine tree.png': {
    en: 'Pine Tree',                  // American English
    de: 'Kiefer',                     // German
    fr: 'Pin',                        // French
    es: 'Pino',                       // Mexican Spanish
    it: 'Pino',                       // Italian
    pt: 'Pinheiro',                   // Brazilian Portuguese
    nl: 'Dennenboom',                 // Dutch
    sv: 'Tall',                       // Swedish
    da: 'Fyrretræ',                   // Danish
    no: 'Furu',                       // Norwegian
    fi: 'Mänty'                       // Finnish
  },
  'pinecone.png': {
    en: 'Pinecone',                   // American English
    de: 'Tannenzapfen',               // German
    fr: 'Pomme de pin',               // French
    es: 'Piña de pino',               // Mexican Spanish
    it: 'Pigna',                      // Italian
    pt: 'Pinha',                      // Brazilian Portuguese
    nl: 'Dennenappel',                // Dutch
    sv: 'Kotte',                      // Swedish
    da: 'Grankogle',                  // Danish
    no: 'Kongle',                     // Norwegian
    fi: 'Käpy'                        // Finnish
  },
  'rabbit.png': {
    en: 'Rabbit',                     // American English
    de: 'Hase',                       // German
    fr: 'Lapin',                      // French
    es: 'Conejo',                     // Mexican Spanish
    it: 'Coniglio',                   // Italian
    pt: 'Coelho',                     // Brazilian Portuguese
    nl: 'Konijn',                     // Dutch
    sv: 'Kanin',                      // Swedish
    da: 'Kanin',                      // Danish
    no: 'Kanin',                      // Norwegian
    fi: 'Kani'                        // Finnish
  },
  'raccoon.png': {
    en: 'Raccoon',                    // American English
    de: 'Waschbär',                   // German
    fr: 'Raton laveur',               // French
    es: 'Mapache',                    // Mexican Spanish
    it: 'Procione',                   // Italian
    pt: 'Guaxinim',                   // Brazilian Portuguese
    nl: 'Wasbeer',                    // Dutch
    sv: 'Tvättbjörn',                 // Swedish
    da: 'Vaskebjørn',                 // Danish
    no: 'Vaskebjørn',                 // Norwegian
    fi: 'Pesukarhu'                   // Finnish
  },
  'river.png': {
    en: 'River',                      // American English
    de: 'Fluss',                      // German
    fr: 'Rivière',                    // French
    es: 'Río',                        // Mexican Spanish
    it: 'Fiume',                      // Italian
    pt: 'Rio',                        // Brazilian Portuguese
    nl: 'Rivier',                     // Dutch
    sv: 'Flod',                       // Swedish
    da: 'Flod',                       // Danish
    no: 'Elv',                        // Norwegian
    fi: 'Joki'                        // Finnish
  },
  'rock.png': {
    en: 'Rock',                       // American English
    de: 'Felsen',                     // German
    fr: 'Rocher',                     // French
    es: 'Roca',                       // Mexican Spanish
    it: 'Roccia',                     // Italian
    pt: 'Pedra',                      // Brazilian Portuguese
    nl: 'Rots',                       // Dutch
    sv: 'Sten',                       // Swedish
    da: 'Sten',                       // Danish
    no: 'Stein',                      // Norwegian
    fi: 'Kivi'                        // Finnish
  },
  'rope.png': {
    en: 'Rope',                       // American English
    de: 'Seil',                       // German
    fr: 'Corde',                      // French
    es: 'Cuerda',                     // Mexican Spanish
    it: 'Corda',                      // Italian
    pt: 'Corda',                      // Brazilian Portuguese
    nl: 'Touw',                       // Dutch
    sv: 'Rep',                        // Swedish
    da: 'Reb',                        // Danish
    no: 'Tau',                        // Norwegian
    fi: 'Köysi'                       // Finnish
  },
  'sleeping bag.png': {
    en: 'Sleeping Bag',               // American English
    de: 'Schlafsack',                 // German
    fr: 'Sac de couchage',            // French
    es: 'Bolsa de dormir',            // Mexican Spanish
    it: 'Sacco a pelo',               // Italian
    pt: 'Saco de dormir',             // Brazilian Portuguese
    nl: 'Slaapzak',                   // Dutch
    sv: 'Sovsäck',                    // Swedish
    da: 'Sovepose',                   // Danish
    no: 'Sovepose',                   // Norwegian
    fi: 'Makuupussi'                  // Finnish
  },
  'squirrel.png': {
    en: 'Squirrel',                   // American English
    de: 'Eichhörnchen',               // German
    fr: 'Écureuil',                   // French
    es: 'Ardilla',                    // Mexican Spanish
    it: 'Scoiattolo',                 // Italian
    pt: 'Esquilo',                    // Brazilian Portuguese
    nl: 'Eekhoorn',                   // Dutch
    sv: 'Ekorre',                     // Swedish
    da: 'Egern',                      // Danish
    no: 'Ekorn',                      // Norwegian
    fi: 'Orava'                       // Finnish
  },
  'tent.png': {
    en: 'Tent',                       // American English
    de: 'Zelt',                       // German
    fr: 'Tente',                      // French
    es: 'Tienda de campaña',          // Mexican Spanish
    it: 'Tenda',                      // Italian
    pt: 'Barraca',                    // Brazilian Portuguese
    nl: 'Tent',                       // Dutch
    sv: 'Tält',                       // Swedish
    da: 'Telt',                       // Danish
    no: 'Telt',                       // Norwegian
    fi: 'Teltta'                      // Finnish
  },
  'trail.png': {
    en: 'Trail',                      // American English
    de: 'Wanderweg',                  // German
    fr: 'Sentier',                    // French
    es: 'Sendero',                    // Mexican Spanish
    it: 'Sentiero',                   // Italian
    pt: 'Trilha',                     // Brazilian Portuguese
    nl: 'Pad',                        // Dutch
    sv: 'Stig',                       // Swedish
    da: 'Sti',                        // Danish
    no: 'Sti',                        // Norwegian
    fi: 'Polku'                       // Finnish
  },
  'vest.png': {
    en: 'Vest',                       // American English
    de: 'Weste',                      // German
    fr: 'Gilet',                      // French
    es: 'Chaleco',                    // Mexican Spanish
    it: 'Gilet',                      // Italian
    pt: 'Colete',                     // Brazilian Portuguese
    nl: 'Vest',                       // Dutch
    sv: 'Väst',                       // Swedish
    da: 'Vest',                       // Danish
    no: 'Vest',                       // Norwegian
    fi: 'Liivi'                       // Finnish
  },
  'water.png': {
    en: 'Water',                      // American English
    de: 'Wasser',                     // German
    fr: 'Eau',                        // French
    es: 'Agua',                       // Mexican Spanish
    it: 'Acqua',                      // Italian
    pt: 'Água',                       // Brazilian Portuguese
    nl: 'Water',                      // Dutch
    sv: 'Vatten',                     // Swedish
    da: 'Vand',                       // Danish
    no: 'Vann',                       // Norwegian
    fi: 'Vesi'                        // Finnish
  }
};

// ============================================================
// DO NOT MODIFY BELOW THIS LINE
// ============================================================

function generateUniqueFilename(originalName) {
  const timestamp = Date.now();
  const randomStr = crypto.randomBytes(4).toString('hex');
  const baseName = path.basename(originalName, path.extname(originalName))
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${baseName}-${timestamp}-${randomStr}.webp`;
}

async function optimizeImage(inputBuffer) {
  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  if (metadata.format === 'svg') {
    return {
      buffer: inputBuffer,
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: 'svg'
    };
  }

  let pipeline = image;
  if (metadata.width > 800 || metadata.height > 800) {
    pipeline = pipeline.resize(800, 800, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  const outputBuffer = await pipeline.webp({ quality: 85 }).toBuffer();
  const outputMetadata = await sharp(outputBuffer).metadata();

  return {
    buffer: outputBuffer,
    width: outputMetadata.width,
    height: outputMetadata.height,
    format: 'webp'
  };
}

async function main() {
  console.log('='.repeat(60));
  console.log(`Image Import Script: ${THEME_CONFIG.displayNames.en}`);
  console.log('='.repeat(60));

  // Resolve paths
  let projectRoot, sourceDir, destDir;
  const sourceFolderName = THEME_CONFIG.sourceFolderName;

  if (isServer) {
    projectRoot = '/opt/lessoncraftstudio';
    sourceDir = path.join(projectRoot, 'image library', sourceFolderName);
    destDir = path.join(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  } else {
    projectRoot = path.resolve(__dirname, '..');
    sourceDir = path.resolve(projectRoot, 'image library', sourceFolderName);
    destDir = path.resolve(projectRoot, 'frontend', 'public', 'images', THEME_CONFIG.name);
  }

  console.log(`\nSource: ${sourceDir}`);
  console.log(`Destination: ${destDir}`);

  if (!fs.existsSync(sourceDir)) {
    console.error(`\nERROR: Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created destination directory`);
  }

  try {
    // Step 1: Create or update theme
    console.log('\n--- Step 1: Creating/Updating Theme ---');

    let theme = await prisma.imageTheme.findFirst({
      where: { name: THEME_CONFIG.name, type: THEME_CONFIG.type }
    });

    if (theme) {
      console.log(`Theme exists (id: ${theme.id}), updating...`);
      theme = await prisma.imageTheme.update({
        where: { id: theme.id },
        data: { displayNames: THEME_CONFIG.displayNames }
      });
    } else {
      theme = await prisma.imageTheme.create({
        data: {
          name: THEME_CONFIG.name,
          type: THEME_CONFIG.type,
          displayNames: THEME_CONFIG.displayNames,
          sortOrder: 0
        }
      });
      console.log(`Created new theme (id: ${theme.id})`);
    }

    // Step 2: Process images
    console.log('\n--- Step 2: Processing Images ---');

    const files = fs.readdirSync(sourceDir).filter(f =>
      /\.(png|jpg|jpeg|webp|svg)$/i.test(f)
    );

    console.log(`Found ${files.length} image files`);

    let successCount = 0, skipCount = 0, errorCount = 0;

    const maxSortOrder = await prisma.imageLibraryItem.aggregate({
      where: { themeId: theme.id },
      _max: { sortOrder: true }
    });
    let currentSortOrder = (maxSortOrder._max.sortOrder || 0) + 1;

    for (const filename of files) {
      console.log(`\nProcessing: ${filename}`);

      const translations = IMAGE_TRANSLATIONS[filename];
      if (!translations) {
        console.log(`  WARNING: No translations for "${filename}", skipping`);
        skipCount++;
        continue;
      }

      try {
        const inputBuffer = fs.readFileSync(path.join(sourceDir, filename));
        const optimized = await optimizeImage(inputBuffer);
        const newFilename = generateUniqueFilename(filename);
        const destPath = path.join(destDir, newFilename);
        const relativeFilePath = `/images/${THEME_CONFIG.name}/${newFilename}`;

        fs.writeFileSync(destPath, optimized.buffer);
        console.log(`  Saved: ${newFilename} (${optimized.width}x${optimized.height})`);

        // Check if already exists
        const existing = await prisma.imageLibraryItem.findFirst({
          where: {
            themeId: theme.id,
            translations: { path: ['en'], equals: translations.en }
          }
        });

        if (existing) {
          await prisma.imageLibraryItem.update({
            where: { id: existing.id },
            data: {
              translations,
              filePath: relativeFilePath,
              filename: newFilename,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height
            }
          });
          console.log(`  Updated existing record`);
        } else {
          await prisma.imageLibraryItem.create({
            data: {
              themeId: theme.id,
              filename: newFilename,
              filePath: relativeFilePath,
              fileSize: optimized.buffer.length,
              mimeType: optimized.format === 'svg' ? 'image/svg+xml' : 'image/webp',
              width: optimized.width,
              height: optimized.height,
              translations,
              sortOrder: currentSortOrder++
            }
          });
          console.log(`  Created database record`);
        }

        successCount++;
      } catch (err) {
        console.error(`  ERROR: ${err.message}`);
        errorCount++;
      }
    }

    // Step 3: Sync to standalone
    if (isServer) {
      const standaloneDir = path.join(projectRoot, 'frontend', '.next', 'standalone', 'public', 'images', THEME_CONFIG.name);
      console.log(`\n--- Syncing to standalone build ---`);
      if (!fs.existsSync(standaloneDir)) {
        fs.mkdirSync(standaloneDir, { recursive: true });
      }
      const destFiles = fs.readdirSync(destDir);
      for (const file of destFiles) {
        fs.copyFileSync(path.join(destDir, file), path.join(standaloneDir, file));
      }
      console.log(`Copied ${destFiles.length} files to standalone`);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('IMPORT COMPLETE');
    console.log('='.repeat(60));
    console.log(`Theme: ${THEME_CONFIG.name} (${theme.id})`);
    console.log(`Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);

  } catch (error) {
    console.error('\nFATAL ERROR:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
