/**
 * Import Script: Animals BW (Black and White) Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-animals-bw-images.js
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
// CONFIGURATION
// ============================================================

const THEME_CONFIG = {
  name: 'animals_bw',
  type: 'images',
  displayNames: {
    en: 'Animals BW',
    de: 'Tiere SW',
    fr: 'Animaux NB',
    es: 'Animales BN',
    it: 'Animali BN',
    pt: 'Animais PB',
    nl: 'Dieren ZW',
    sv: 'Djur SV',
    da: 'Dyr SH',
    no: 'Dyr SH',
    fi: 'Elaimet MV'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'alligator.png': {
    en: 'Alligator',
    de: 'Alligator',
    fr: 'Alligator',
    es: 'Caiman',
    it: 'Alligatore',
    pt: 'Jacare',
    nl: 'Alligator',
    sv: 'Alligator',
    da: 'Alligator',
    no: 'Alligator',
    fi: 'Alligaattori'
  },
  'alligator 2.png': {
    en: 'Alligator 2',
    de: 'Alligator 2',
    fr: 'Alligator 2',
    es: 'Caiman 2',
    it: 'Alligatore 2',
    pt: 'Jacare 2',
    nl: 'Alligator 2',
    sv: 'Alligator 2',
    da: 'Alligator 2',
    no: 'Alligator 2',
    fi: 'Alligaattori 2'
  },
  'bat.png': {
    en: 'Bat',
    de: 'Fledermaus',
    fr: 'Chauve-souris',
    es: 'Murcielago',
    it: 'Pipistrello',
    pt: 'Morcego',
    nl: 'Vleermuis',
    sv: 'Fladdermus',
    da: 'Flagermus',
    no: 'Flaggermus',
    fi: 'Lepakko'
  },
  'bat 2.png': {
    en: 'Bat 2',
    de: 'Fledermaus 2',
    fr: 'Chauve-souris 2',
    es: 'Murcielago 2',
    it: 'Pipistrello 2',
    pt: 'Morcego 2',
    nl: 'Vleermuis 2',
    sv: 'Fladdermus 2',
    da: 'Flagermus 2',
    no: 'Flaggermus 2',
    fi: 'Lepakko 2'
  },
  'bear.png': {
    en: 'Bear',
    de: 'Bar',
    fr: 'Ours',
    es: 'Oso',
    it: 'Orso',
    pt: 'Urso',
    nl: 'Beer',
    sv: 'Bjorn',
    da: 'Bjorn',
    no: 'Bjorn',
    fi: 'Karhu'
  },
  'bear 2.png': {
    en: 'Bear 2',
    de: 'Bar 2',
    fr: 'Ours 2',
    es: 'Oso 2',
    it: 'Orso 2',
    pt: 'Urso 2',
    nl: 'Beer 2',
    sv: 'Bjorn 2',
    da: 'Bjorn 2',
    no: 'Bjorn 2',
    fi: 'Karhu 2'
  },
  'beaver.png': {
    en: 'Beaver',
    de: 'Biber',
    fr: 'Castor',
    es: 'Castor',
    it: 'Castoro',
    pt: 'Castor',
    nl: 'Bever',
    sv: 'Baver',
    da: 'Baever',
    no: 'Bever',
    fi: 'Majava'
  },
  'bison.png': {
    en: 'Bison',
    de: 'Bison',
    fr: 'Bison',
    es: 'Bisonte',
    it: 'Bisonte',
    pt: 'Bisao',
    nl: 'Bizon',
    sv: 'Bison',
    da: 'Bison',
    no: 'Bison',
    fi: 'Biisoni'
  },
  'bull.png': {
    en: 'Bull',
    de: 'Stier',
    fr: 'Taureau',
    es: 'Toro',
    it: 'Toro',
    pt: 'Touro',
    nl: 'Stier',
    sv: 'Tjur',
    da: 'Tyr',
    no: 'Okse',
    fi: 'Harka'
  },
  'camel.png': {
    en: 'Camel',
    de: 'Kamel',
    fr: 'Chameau',
    es: 'Camello',
    it: 'Cammello',
    pt: 'Camelo',
    nl: 'Kameel',
    sv: 'Kamel',
    da: 'Kamel',
    no: 'Kamel',
    fi: 'Kameli'
  },
  'camel 2.png': {
    en: 'Camel 2',
    de: 'Kamel 2',
    fr: 'Chameau 2',
    es: 'Camello 2',
    it: 'Cammello 2',
    pt: 'Camelo 2',
    nl: 'Kameel 2',
    sv: 'Kamel 2',
    da: 'Kamel 2',
    no: 'Kamel 2',
    fi: 'Kameli 2'
  },
  'capybara.png': {
    en: 'Capybara',
    de: 'Capybara',
    fr: 'Capybara',
    es: 'Capibara',
    it: 'Capibara',
    pt: 'Capivara',
    nl: 'Capibara',
    sv: 'Kapybara',
    da: 'Flodsvin',
    no: 'Flodsvin',
    fi: 'Kapybara'
  },
  'cat 2.png': {
    en: 'Cat',
    de: 'Katze',
    fr: 'Chat',
    es: 'Gato',
    it: 'Gatto',
    pt: 'Gato',
    nl: 'Kat',
    sv: 'Katt',
    da: 'Kat',
    no: 'Katt',
    fi: 'Kissa'
  },
  'chameleon.png': {
    en: 'Chameleon',
    de: 'Chamaleon',
    fr: 'Cameleon',
    es: 'Camaleon',
    it: 'Camaleonte',
    pt: 'Camaleao',
    nl: 'Kameleon',
    sv: 'Kameleont',
    da: 'Kamaeleon',
    no: 'Kameleon',
    fi: 'Kameleontti'
  },
  'cow.png': {
    en: 'Cow',
    de: 'Kuh',
    fr: 'Vache',
    es: 'Vaca',
    it: 'Mucca',
    pt: 'Vaca',
    nl: 'Koe',
    sv: 'Ko',
    da: 'Ko',
    no: 'Ku',
    fi: 'Lehma'
  },
  'cow 2.png': {
    en: 'Cow 2',
    de: 'Kuh 2',
    fr: 'Vache 2',
    es: 'Vaca 2',
    it: 'Mucca 2',
    pt: 'Vaca 2',
    nl: 'Koe 2',
    sv: 'Ko 2',
    da: 'Ko 2',
    no: 'Ku 2',
    fi: 'Lehma 2'
  },
  'crab.png': {
    en: 'Crab',
    de: 'Krabbe',
    fr: 'Crabe',
    es: 'Cangrejo',
    it: 'Granchio',
    pt: 'Caranguejo',
    nl: 'Krab',
    sv: 'Krabba',
    da: 'Krabbe',
    no: 'Krabbe',
    fi: 'Rapu'
  },
  'dog.png': {
    en: 'Dog',
    de: 'Hund',
    fr: 'Chien',
    es: 'Perro',
    it: 'Cane',
    pt: 'Cachorro',
    nl: 'Hond',
    sv: 'Hund',
    da: 'Hund',
    no: 'Hund',
    fi: 'Koira'
  },
  'dog 2.png': {
    en: 'Dog 2',
    de: 'Hund 2',
    fr: 'Chien 2',
    es: 'Perro 2',
    it: 'Cane 2',
    pt: 'Cachorro 2',
    nl: 'Hond 2',
    sv: 'Hund 2',
    da: 'Hund 2',
    no: 'Hund 2',
    fi: 'Koira 2'
  },
  'donkey.png': {
    en: 'Donkey',
    de: 'Esel',
    fr: 'Ane',
    es: 'Burro',
    it: 'Asino',
    pt: 'Burro',
    nl: 'Ezel',
    sv: 'Asna',
    da: 'Aesel',
    no: 'Esel',
    fi: 'Aasi'
  },
  'dragon.png': {
    en: 'Dragon',
    de: 'Drache',
    fr: 'Dragon',
    es: 'Dragon',
    it: 'Drago',
    pt: 'Dragao',
    nl: 'Draak',
    sv: 'Drake',
    da: 'Drage',
    no: 'Drage',
    fi: 'Lohikaarme'
  },
  'duck.png': {
    en: 'Duck',
    de: 'Ente',
    fr: 'Canard',
    es: 'Pato',
    it: 'Anatra',
    pt: 'Pato',
    nl: 'Eend',
    sv: 'Anka',
    da: 'And',
    no: 'And',
    fi: 'Ankka'
  },
  'elephant.png': {
    en: 'Elephant',
    de: 'Elefant',
    fr: 'Elephant',
    es: 'Elefante',
    it: 'Elefante',
    pt: 'Elefante',
    nl: 'Olifant',
    sv: 'Elefant',
    da: 'Elefant',
    no: 'Elefant',
    fi: 'Norsu'
  },
  'elephant 2.png': {
    en: 'Elephant 2',
    de: 'Elefant 2',
    fr: 'Elephant 2',
    es: 'Elefante 2',
    it: 'Elefante 2',
    pt: 'Elefante 2',
    nl: 'Olifant 2',
    sv: 'Elefant 2',
    da: 'Elefant 2',
    no: 'Elefant 2',
    fi: 'Norsu 2'
  },
  'elephant 3.png': {
    en: 'Elephant 3',
    de: 'Elefant 3',
    fr: 'Elephant 3',
    es: 'Elefante 3',
    it: 'Elefante 3',
    pt: 'Elefante 3',
    nl: 'Olifant 3',
    sv: 'Elefant 3',
    da: 'Elefant 3',
    no: 'Elefant 3',
    fi: 'Norsu 3'
  },
  'fish.png': {
    en: 'Fish',
    de: 'Fisch',
    fr: 'Poisson',
    es: 'Pez',
    it: 'Pesce',
    pt: 'Peixe',
    nl: 'Vis',
    sv: 'Fisk',
    da: 'Fisk',
    no: 'Fisk',
    fi: 'Kala'
  },
  'fox .png': {
    en: 'Fox',
    de: 'Fuchs',
    fr: 'Renard',
    es: 'Zorro',
    it: 'Volpe',
    pt: 'Raposa',
    nl: 'Vos',
    sv: 'Rav',
    da: 'Raev',
    no: 'Rev',
    fi: 'Kettu'
  },
  'frog.png': {
    en: 'Frog',
    de: 'Frosch',
    fr: 'Grenouille',
    es: 'Rana',
    it: 'Rana',
    pt: 'Sapo',
    nl: 'Kikker',
    sv: 'Groda',
    da: 'Fro',
    no: 'Frosk',
    fi: 'Sammakko'
  },
  'giraffe.png': {
    en: 'Giraffe',
    de: 'Giraffe',
    fr: 'Girafe',
    es: 'Jirafa',
    it: 'Giraffa',
    pt: 'Girafa',
    nl: 'Giraffe',
    sv: 'Giraff',
    da: 'Giraf',
    no: 'Sjiraff',
    fi: 'Kirahvi'
  },
  'giraffe 2.png': {
    en: 'Giraffe 2',
    de: 'Giraffe 2',
    fr: 'Girafe 2',
    es: 'Jirafa 2',
    it: 'Giraffa 2',
    pt: 'Girafa 2',
    nl: 'Giraffe 2',
    sv: 'Giraff 2',
    da: 'Giraf 2',
    no: 'Sjiraff 2',
    fi: 'Kirahvi 2'
  },
  'goat.png': {
    en: 'Goat',
    de: 'Ziege',
    fr: 'Chevre',
    es: 'Cabra',
    it: 'Capra',
    pt: 'Cabra',
    nl: 'Geit',
    sv: 'Get',
    da: 'Ged',
    no: 'Geit',
    fi: 'Vuohi'
  },
  'hippopotamus.png': {
    en: 'Hippopotamus',
    de: 'Nilpferd',
    fr: 'Hippopotame',
    es: 'Hipopotamo',
    it: 'Ippopotamo',
    pt: 'Hipopotamo',
    nl: 'Nijlpaard',
    sv: 'Flodhast',
    da: 'Flodhest',
    no: 'Flodhest',
    fi: 'Virtahepo'
  },
  'horse.png': {
    en: 'Horse',
    de: 'Pferd',
    fr: 'Cheval',
    es: 'Caballo',
    it: 'Cavallo',
    pt: 'Cavalo',
    nl: 'Paard',
    sv: 'Hast',
    da: 'Hest',
    no: 'Hest',
    fi: 'Hevonen'
  },
  'kangaroo.png': {
    en: 'Kangaroo',
    de: 'Kanguru',
    fr: 'Kangourou',
    es: 'Canguro',
    it: 'Canguro',
    pt: 'Canguru',
    nl: 'Kangoeroe',
    sv: 'Kanguru',
    da: 'Kaenguru',
    no: 'Kenguru',
    fi: 'Kenguru'
  },
  'koala.png': {
    en: 'Koala',
    de: 'Koala',
    fr: 'Koala',
    es: 'Koala',
    it: 'Koala',
    pt: 'Coala',
    nl: 'Koala',
    sv: 'Koala',
    da: 'Koala',
    no: 'Koala',
    fi: 'Koala'
  },
  'koala 2.png': {
    en: 'Koala 2',
    de: 'Koala 2',
    fr: 'Koala 2',
    es: 'Koala 2',
    it: 'Koala 2',
    pt: 'Coala 2',
    nl: 'Koala 2',
    sv: 'Koala 2',
    da: 'Koala 2',
    no: 'Koala 2',
    fi: 'Koala 2'
  },
  'lion.png': {
    en: 'Lion',
    de: 'Lowe',
    fr: 'Lion',
    es: 'Leon',
    it: 'Leone',
    pt: 'Leao',
    nl: 'Leeuw',
    sv: 'Lejon',
    da: 'Love',
    no: 'Love',
    fi: 'Leijona'
  },
  'lion 2.png': {
    en: 'Lion 2',
    de: 'Lowe 2',
    fr: 'Lion 2',
    es: 'Leon 2',
    it: 'Leone 2',
    pt: 'Leao 2',
    nl: 'Leeuw 2',
    sv: 'Lejon 2',
    da: 'Love 2',
    no: 'Love 2',
    fi: 'Leijona 2'
  },
  'llama.png': {
    en: 'Llama',
    de: 'Lama',
    fr: 'Lama',
    es: 'Llama',
    it: 'Lama',
    pt: 'Lhama',
    nl: 'Lama',
    sv: 'Lama',
    da: 'Lama',
    no: 'Lama',
    fi: 'Laama'
  },
  'meerkat.png': {
    en: 'Meerkat',
    de: 'Erdmannchen',
    fr: 'Suricate',
    es: 'Suricata',
    it: 'Suricato',
    pt: 'Suricato',
    nl: 'Stokstaartje',
    sv: 'Surikat',
    da: 'Surikat',
    no: 'Surikat',
    fi: 'Mangusti'
  },
  'monkey.png': {
    en: 'Monkey',
    de: 'Affe',
    fr: 'Singe',
    es: 'Mono',
    it: 'Scimmia',
    pt: 'Macaco',
    nl: 'Aap',
    sv: 'Apa',
    da: 'Abe',
    no: 'Ape',
    fi: 'Apina'
  },
  'monkey 2.png': {
    en: 'Monkey 2',
    de: 'Affe 2',
    fr: 'Singe 2',
    es: 'Mono 2',
    it: 'Scimmia 2',
    pt: 'Macaco 2',
    nl: 'Aap 2',
    sv: 'Apa 2',
    da: 'Abe 2',
    no: 'Ape 2',
    fi: 'Apina 2'
  },
  'mouse.png': {
    en: 'Mouse',
    de: 'Maus',
    fr: 'Souris',
    es: 'Raton',
    it: 'Topo',
    pt: 'Rato',
    nl: 'Muis',
    sv: 'Mus',
    da: 'Mus',
    no: 'Mus',
    fi: 'Hiiri'
  },
  'octopus.png': {
    en: 'Octopus',
    de: 'Oktopus',
    fr: 'Pieuvre',
    es: 'Pulpo',
    it: 'Polpo',
    pt: 'Polvo',
    nl: 'Octopus',
    sv: 'Blackfisk',
    da: 'Blaeksprutte',
    no: 'Blekksprut',
    fi: 'Mustekala'
  },
  'ostrich.png': {
    en: 'Ostrich',
    de: 'Strauss',
    fr: 'Autruche',
    es: 'Avestruz',
    it: 'Struzzo',
    pt: 'Avestruz',
    nl: 'Struisvogel',
    sv: 'Struts',
    da: 'Struds',
    no: 'Struts',
    fi: 'Strutsi'
  },
  'ostrich 2.png': {
    en: 'Ostrich 2',
    de: 'Strauss 2',
    fr: 'Autruche 2',
    es: 'Avestruz 2',
    it: 'Struzzo 2',
    pt: 'Avestruz 2',
    nl: 'Struisvogel 2',
    sv: 'Struts 2',
    da: 'Struds 2',
    no: 'Struts 2',
    fi: 'Strutsi 2'
  },
  'otter.png': {
    en: 'Otter',
    de: 'Otter',
    fr: 'Loutre',
    es: 'Nutria',
    it: 'Lontra',
    pt: 'Lontra',
    nl: 'Otter',
    sv: 'Utter',
    da: 'Odder',
    no: 'Oter',
    fi: 'Saukko'
  },
  'otter 2.png': {
    en: 'Otter 2',
    de: 'Otter 2',
    fr: 'Loutre 2',
    es: 'Nutria 2',
    it: 'Lontra 2',
    pt: 'Lontra 2',
    nl: 'Otter 2',
    sv: 'Utter 2',
    da: 'Odder 2',
    no: 'Oter 2',
    fi: 'Saukko 2'
  },
  'owl.png': {
    en: 'Owl',
    de: 'Eule',
    fr: 'Hibou',
    es: 'Buho',
    it: 'Gufo',
    pt: 'Coruja',
    nl: 'Uil',
    sv: 'Uggla',
    da: 'Ugle',
    no: 'Ugle',
    fi: 'Pollo'
  },
  'panda.png': {
    en: 'Panda',
    de: 'Panda',
    fr: 'Panda',
    es: 'Panda',
    it: 'Panda',
    pt: 'Panda',
    nl: 'Panda',
    sv: 'Panda',
    da: 'Panda',
    no: 'Panda',
    fi: 'Panda'
  },
  'panda 2.png': {
    en: 'Panda 2',
    de: 'Panda 2',
    fr: 'Panda 2',
    es: 'Panda 2',
    it: 'Panda 2',
    pt: 'Panda 2',
    nl: 'Panda 2',
    sv: 'Panda 2',
    da: 'Panda 2',
    no: 'Panda 2',
    fi: 'Panda 2'
  },
  'parrot.png': {
    en: 'Parrot',
    de: 'Papagei',
    fr: 'Perroquet',
    es: 'Loro',
    it: 'Pappagallo',
    pt: 'Papagaio',
    nl: 'Papegaai',
    sv: 'Papegoja',
    da: 'Papegoje',
    no: 'Papegoya',
    fi: 'Papukaija'
  },
  'penguin.png': {
    en: 'Penguin',
    de: 'Pinguin',
    fr: 'Pingouin',
    es: 'Pinguino',
    it: 'Pinguino',
    pt: 'Pinguim',
    nl: 'Pinguin',
    sv: 'Pingvin',
    da: 'Pingvin',
    no: 'Pingvin',
    fi: 'Pingviini'
  },
  'penguin 2.png': {
    en: 'Penguin 2',
    de: 'Pinguin 2',
    fr: 'Pingouin 2',
    es: 'Pinguino 2',
    it: 'Pinguino 2',
    pt: 'Pinguim 2',
    nl: 'Pinguin 2',
    sv: 'Pingvin 2',
    da: 'Pingvin 2',
    no: 'Pingvin 2',
    fi: 'Pingviini 2'
  },
  'pig.png': {
    en: 'Pig',
    de: 'Schwein',
    fr: 'Cochon',
    es: 'Cerdo',
    it: 'Maiale',
    pt: 'Porco',
    nl: 'Varken',
    sv: 'Gris',
    da: 'Gris',
    no: 'Gris',
    fi: 'Sika'
  },
  'piglet.png': {
    en: 'Piglet',
    de: 'Ferkel',
    fr: 'Porcelet',
    es: 'Cerdito',
    it: 'Maialino',
    pt: 'Leitao',
    nl: 'Biggetje',
    sv: 'Smågris',
    da: 'Smågris',
    no: 'Smågris',
    fi: 'Porsas'
  },
  'rabbit.png': {
    en: 'Rabbit',
    de: 'Hase',
    fr: 'Lapin',
    es: 'Conejo',
    it: 'Coniglio',
    pt: 'Coelho',
    nl: 'Konijn',
    sv: 'Kanin',
    da: 'Kanin',
    no: 'Kanin',
    fi: 'Kani'
  },
  'rabbit 2.png': {
    en: 'Rabbit 2',
    de: 'Hase 2',
    fr: 'Lapin 2',
    es: 'Conejo 2',
    it: 'Coniglio 2',
    pt: 'Coelho 2',
    nl: 'Konijn 2',
    sv: 'Kanin 2',
    da: 'Kanin 2',
    no: 'Kanin 2',
    fi: 'Kani 2'
  },
  'raccoon.png': {
    en: 'Raccoon',
    de: 'Waschbar',
    fr: 'Raton laveur',
    es: 'Mapache',
    it: 'Procione',
    pt: 'Guaxinim',
    nl: 'Wasbeer',
    sv: 'Tvattbjorn',
    da: 'Vaskebjorn',
    no: 'Vaskebjorn',
    fi: 'Pesukarhu'
  },
  'raccoon 2.png': {
    en: 'Raccoon 2',
    de: 'Waschbar 2',
    fr: 'Raton laveur 2',
    es: 'Mapache 2',
    it: 'Procione 2',
    pt: 'Guaxinim 2',
    nl: 'Wasbeer 2',
    sv: 'Tvattbjorn 2',
    da: 'Vaskebjorn 2',
    no: 'Vaskebjorn 2',
    fi: 'Pesukarhu 2'
  },
  'raccoon 3.png': {
    en: 'Raccoon 3',
    de: 'Waschbar 3',
    fr: 'Raton laveur 3',
    es: 'Mapache 3',
    it: 'Procione 3',
    pt: 'Guaxinim 3',
    nl: 'Wasbeer 3',
    sv: 'Tvattbjorn 3',
    da: 'Vaskebjorn 3',
    no: 'Vaskebjorn 3',
    fi: 'Pesukarhu 3'
  },
  'raccoon 4.png': {
    en: 'Raccoon 4',
    de: 'Waschbar 4',
    fr: 'Raton laveur 4',
    es: 'Mapache 4',
    it: 'Procione 4',
    pt: 'Guaxinim 4',
    nl: 'Wasbeer 4',
    sv: 'Tvattbjorn 4',
    da: 'Vaskebjorn 4',
    no: 'Vaskebjorn 4',
    fi: 'Pesukarhu 4'
  },
  'reindeer.png': {
    en: 'Reindeer',
    de: 'Rentier',
    fr: 'Renne',
    es: 'Reno',
    it: 'Renna',
    pt: 'Rena',
    nl: 'Rendier',
    sv: 'Ren',
    da: 'Rensdyr',
    no: 'Reinsdyr',
    fi: 'Poro'
  },
  'rhinoceros.png': {
    en: 'Rhinoceros',
    de: 'Nashorn',
    fr: 'Rhinoceros',
    es: 'Rinoceronte',
    it: 'Rinoceronte',
    pt: 'Rinoceronte',
    nl: 'Neushoorn',
    sv: 'Noshörning',
    da: 'Naeshorn',
    no: 'Neshorn',
    fi: 'Sarvikuono'
  },
  'rooster.png': {
    en: 'Rooster',
    de: 'Hahn',
    fr: 'Coq',
    es: 'Gallo',
    it: 'Gallo',
    pt: 'Galo',
    nl: 'Haan',
    sv: 'Tupp',
    da: 'Hane',
    no: 'Hane',
    fi: 'Kukko'
  },
  'seahorse.png': {
    en: 'Seahorse',
    de: 'Seepferdchen',
    fr: 'Hippocampe',
    es: 'Caballito de mar',
    it: 'Cavalluccio marino',
    pt: 'Cavalo-marinho',
    nl: 'Zeepaardje',
    sv: 'Sjohast',
    da: 'Sohest',
    no: 'Sjohest',
    fi: 'Merihevonen'
  },
  'seal.png': {
    en: 'Seal',
    de: 'Robbe',
    fr: 'Phoque',
    es: 'Foca',
    it: 'Foca',
    pt: 'Foca',
    nl: 'Zeehond',
    sv: 'Sal',
    da: 'Sael',
    no: 'Sel',
    fi: 'Hylje'
  },
  'sheep.png': {
    en: 'Sheep',
    de: 'Schaf',
    fr: 'Mouton',
    es: 'Oveja',
    it: 'Pecora',
    pt: 'Ovelha',
    nl: 'Schaap',
    sv: 'Far',
    da: 'Far',
    no: 'Sau',
    fi: 'Lammas'
  },
  'sheep 2.png': {
    en: 'Sheep 2',
    de: 'Schaf 2',
    fr: 'Mouton 2',
    es: 'Oveja 2',
    it: 'Pecora 2',
    pt: 'Ovelha 2',
    nl: 'Schaap 2',
    sv: 'Far 2',
    da: 'Far 2',
    no: 'Sau 2',
    fi: 'Lammas 2'
  },
  'sloth.png': {
    en: 'Sloth',
    de: 'Faultier',
    fr: 'Paresseux',
    es: 'Perezoso',
    it: 'Bradipo',
    pt: 'Preguica',
    nl: 'Luiaard',
    sv: 'Sengångare',
    da: 'Dovendyr',
    no: 'Dovendyr',
    fi: 'Laiskiainen'
  },
  'snail.png': {
    en: 'Snail',
    de: 'Schnecke',
    fr: 'Escargot',
    es: 'Caracol',
    it: 'Lumaca',
    pt: 'Caracol',
    nl: 'Slak',
    sv: 'Snigel',
    da: 'Snegl',
    no: 'Snegle',
    fi: 'Etana'
  },
  'squirrel .png': {
    en: 'Squirrel',
    de: 'Eichhornchen',
    fr: 'Ecureuil',
    es: 'Ardilla',
    it: 'Scoiattolo',
    pt: 'Esquilo',
    nl: 'Eekhoorn',
    sv: 'Ekorre',
    da: 'Egern',
    no: 'Ekorn',
    fi: 'Orava'
  },
  'swan.png': {
    en: 'Swan',
    de: 'Schwan',
    fr: 'Cygne',
    es: 'Cisne',
    it: 'Cigno',
    pt: 'Cisne',
    nl: 'Zwaan',
    sv: 'Svan',
    da: 'Svane',
    no: 'Svane',
    fi: 'Joutsen'
  },
  'teddy bear.png': {
    en: 'Teddy Bear',
    de: 'Teddybar',
    fr: 'Ours en peluche',
    es: 'Osito de peluche',
    it: 'Orsacchiotto',
    pt: 'Ursinho de pelucia',
    nl: 'Teddybeer',
    sv: 'Nallebjorn',
    da: 'Bamse',
    no: 'Bamse',
    fi: 'Nallekarhu'
  },
  'teddy bear 2.png': {
    en: 'Teddy Bear 2',
    de: 'Teddybar 2',
    fr: 'Ours en peluche 2',
    es: 'Osito de peluche 2',
    it: 'Orsacchiotto 2',
    pt: 'Ursinho de pelucia 2',
    nl: 'Teddybeer 2',
    sv: 'Nallebjorn 2',
    da: 'Bamse 2',
    no: 'Bamse 2',
    fi: 'Nallekarhu 2'
  },
  'tiger .png': {
    en: 'Tiger',
    de: 'Tiger',
    fr: 'Tigre',
    es: 'Tigre',
    it: 'Tigre',
    pt: 'Tigre',
    nl: 'Tijger',
    sv: 'Tiger',
    da: 'Tiger',
    no: 'Tiger',
    fi: 'Tiikeri'
  },
  'turtle.png': {
    en: 'Turtle',
    de: 'Schildkrote',
    fr: 'Tortue',
    es: 'Tortuga',
    it: 'Tartaruga',
    pt: 'Tartaruga',
    nl: 'Schildpad',
    sv: 'Skoldpadda',
    da: 'Skildpadde',
    no: 'Skilpadde',
    fi: 'Kilpikonna'
  },
  'Tyrannosaurus Rex.png': {
    en: 'T-Rex',
    de: 'T-Rex',
    fr: 'T-Rex',
    es: 'Tiranosaurio',
    it: 'T-Rex',
    pt: 'Tiranossauro',
    nl: 'T-Rex',
    sv: 'T-Rex',
    da: 'T-Rex',
    no: 'T-Rex',
    fi: 'T-Rex'
  },
  'unicorn.png': {
    en: 'Unicorn',
    de: 'Einhorn',
    fr: 'Licorne',
    es: 'Unicornio',
    it: 'Unicorno',
    pt: 'Unicornio',
    nl: 'Eenhoorn',
    sv: 'Enhörning',
    da: 'Enhjorning',
    no: 'Enhjorning',
    fi: 'Yksisarvinen'
  },
  'whale.png': {
    en: 'Whale',
    de: 'Wal',
    fr: 'Baleine',
    es: 'Ballena',
    it: 'Balena',
    pt: 'Baleia',
    nl: 'Walvis',
    sv: 'Val',
    da: 'Hval',
    no: 'Hval',
    fi: 'Valas'
  },
  'whale 2.png': {
    en: 'Whale 2',
    de: 'Wal 2',
    fr: 'Baleine 2',
    es: 'Ballena 2',
    it: 'Balena 2',
    pt: 'Baleia 2',
    nl: 'Walvis 2',
    sv: 'Val 2',
    da: 'Hval 2',
    no: 'Hval 2',
    fi: 'Valas 2'
  },
  'zebra.png': {
    en: 'Zebra',
    de: 'Zebra',
    fr: 'Zebre',
    es: 'Cebra',
    it: 'Zebra',
    pt: 'Zebra',
    nl: 'Zebra',
    sv: 'Zebra',
    da: 'Zebra',
    no: 'Sebra',
    fi: 'Seepra'
  },
  'zebra 2.png': {
    en: 'Zebra 2',
    de: 'Zebra 2',
    fr: 'Zebre 2',
    es: 'Cebra 2',
    it: 'Zebra 2',
    pt: 'Zebra 2',
    nl: 'Zebra 2',
    sv: 'Zebra 2',
    da: 'Zebra 2',
    no: 'Sebra 2',
    fi: 'Seepra 2'
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
  const sourceFolderName = 'animals bw';

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
