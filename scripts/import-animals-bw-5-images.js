/**
 * Import Script: Animals BW 5 Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-animals-bw-5-images.js
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
  name: 'animals_bw_5',
  type: 'images',
  displayNames: {
    en: 'Animals BW 5',
    de: 'Tiere SW 5',
    fr: 'Animaux NB 5',
    es: 'Animales BN 5',
    it: 'Animali BN 5',
    pt: 'Animais PB 5',
    nl: 'Dieren ZW 5',
    sv: 'Djur SV 5',
    da: 'Dyr SH 5',
    no: 'Dyr SH 5',
    fi: 'Elaimet MV 5'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
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
  'bee.png': {
    en: 'Bee',
    de: 'Biene',
    fr: 'Abeille',
    es: 'Abeja',
    it: 'Ape',
    pt: 'Abelha',
    nl: 'Bij',
    sv: 'Bi',
    da: 'Bi',
    no: 'Bie',
    fi: 'Mehilainen'
  },
  'bee 2.png': {
    en: 'Bee 2',
    de: 'Biene 2',
    fr: 'Abeille 2',
    es: 'Abeja 2',
    it: 'Ape 2',
    pt: 'Abelha 2',
    nl: 'Bij 2',
    sv: 'Bi 2',
    da: 'Bi 2',
    no: 'Bie 2',
    fi: 'Mehilainen 2'
  },
  'bird.png': {
    en: 'Bird',
    de: 'Vogel',
    fr: 'Oiseau',
    es: 'Pajaro',
    it: 'Uccello',
    pt: 'Passaro',
    nl: 'Vogel',
    sv: 'Fagel',
    da: 'Fugl',
    no: 'Fugl',
    fi: 'Lintu'
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
  'bull 2.png': {
    en: 'Bull 2',
    de: 'Stier 2',
    fr: 'Taureau 2',
    es: 'Toro 2',
    it: 'Toro 2',
    pt: 'Touro 2',
    nl: 'Stier 2',
    sv: 'Tjur 2',
    da: 'Tyr 2',
    no: 'Okse 2',
    fi: 'Harka 2'
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
  'chicken.png': {
    en: 'Chicken',
    de: 'Huhn',
    fr: 'Poule',
    es: 'Gallina',
    it: 'Gallina',
    pt: 'Galinha',
    nl: 'Kip',
    sv: 'Hona',
    da: 'Hone',
    no: 'Hone',
    fi: 'Kana'
  },
  'chinchilla.png': {
    en: 'Chinchilla',
    de: 'Chinchilla',
    fr: 'Chinchilla',
    es: 'Chinchilla',
    it: 'Cincilla',
    pt: 'Chinchila',
    nl: 'Chinchilla',
    sv: 'Chinchilla',
    da: 'Chinchilla',
    no: 'Chinchilla',
    fi: 'Chinchilla'
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
  'crocodile.png': {
    en: 'Crocodile',
    de: 'Krokodil',
    fr: 'Crocodile',
    es: 'Cocodrilo',
    it: 'Coccodrillo',
    pt: 'Crocodilo',
    nl: 'Krokodil',
    sv: 'Krokodil',
    da: 'Krokodille',
    no: 'Krokodille',
    fi: 'Krokotiili'
  },
  'crocodile 2.png': {
    en: 'Crocodile 2',
    de: 'Krokodil 2',
    fr: 'Crocodile 2',
    es: 'Cocodrilo 2',
    it: 'Coccodrillo 2',
    pt: 'Crocodilo 2',
    nl: 'Krokodil 2',
    sv: 'Krokodil 2',
    da: 'Krokodille 2',
    no: 'Krokodille 2',
    fi: 'Krokotiili 2'
  },
  'dinosaur.png': {
    en: 'Dinosaur',
    de: 'Dinosaurier',
    fr: 'Dinosaure',
    es: 'Dinosaurio',
    it: 'Dinosauro',
    pt: 'Dinossauro',
    nl: 'Dinosaurus',
    sv: 'Dinosaurie',
    da: 'Dinosaur',
    no: 'Dinosaur',
    fi: 'Dinosaurus'
  },
  'dinosaur 2.png': {
    en: 'Dinosaur 2',
    de: 'Dinosaurier 2',
    fr: 'Dinosaure 2',
    es: 'Dinosaurio 2',
    it: 'Dinosauro 2',
    pt: 'Dinossauro 2',
    nl: 'Dinosaurus 2',
    sv: 'Dinosaurie 2',
    da: 'Dinosaur 2',
    no: 'Dinosaur 2',
    fi: 'Dinosaurus 2'
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
  'dog 3.png': {
    en: 'Dog 3',
    de: 'Hund 3',
    fr: 'Chien 3',
    es: 'Perro 3',
    it: 'Cane 3',
    pt: 'Cachorro 3',
    nl: 'Hond 3',
    sv: 'Hund 3',
    da: 'Hund 3',
    no: 'Hund 3',
    fi: 'Koira 3'
  },
  'dolphin.png': {
    en: 'Dolphin',
    de: 'Delfin',
    fr: 'Dauphin',
    es: 'Delfin',
    it: 'Delfino',
    pt: 'Golfinho',
    nl: 'Dolfijn',
    sv: 'Delfin',
    da: 'Delfin',
    no: 'Delfin',
    fi: 'Delfiini'
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
  'eagle.png': {
    en: 'Eagle',
    de: 'Adler',
    fr: 'Aigle',
    es: 'Aguila',
    it: 'Aquila',
    pt: 'Aguia',
    nl: 'Adelaar',
    sv: 'Orn',
    da: 'Orn',
    no: 'Orn',
    fi: 'Kotka'
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
  'flamingo.png': {
    en: 'Flamingo',
    de: 'Flamingo',
    fr: 'Flamant',
    es: 'Flamenco',
    it: 'Fenicottero',
    pt: 'Flamingo',
    nl: 'Flamingo',
    sv: 'Flamingo',
    da: 'Flamingo',
    no: 'Flamingo',
    fi: 'Flamingo'
  },
  'fox.png': {
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
  'fox 2.png': {
    en: 'Fox 2',
    de: 'Fuchs 2',
    fr: 'Renard 2',
    es: 'Zorro 2',
    it: 'Volpe 2',
    pt: 'Raposa 2',
    nl: 'Vos 2',
    sv: 'Rav 2',
    da: 'Raev 2',
    no: 'Rev 2',
    fi: 'Kettu 2'
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
  'gorilla.png': {
    en: 'Gorilla',
    de: 'Gorilla',
    fr: 'Gorille',
    es: 'Gorila',
    it: 'Gorilla',
    pt: 'Gorila',
    nl: 'Gorilla',
    sv: 'Gorilla',
    da: 'Gorilla',
    no: 'Gorilla',
    fi: 'Gorilla'
  },
  'hamster .png': {
    en: 'Hamster',
    de: 'Hamster',
    fr: 'Hamster',
    es: 'Hamster',
    it: 'Criceto',
    pt: 'Hamster',
    nl: 'Hamster',
    sv: 'Hamster',
    da: 'Hamster',
    no: 'Hamster',
    fi: 'Hamsteri'
  },
  'hedgehog.png': {
    en: 'Hedgehog',
    de: 'Igel',
    fr: 'Herisson',
    es: 'Erizo',
    it: 'Riccio',
    pt: 'Porco-espinho',
    nl: 'Egel',
    sv: 'Iggelkott',
    da: 'Pindsvin',
    no: 'Piggsvin',
    fi: 'Siili'
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
  'jellyfish.png': {
    en: 'Jellyfish',
    de: 'Qualle',
    fr: 'Meduse',
    es: 'Medusa',
    it: 'Medusa',
    pt: 'Agua-viva',
    nl: 'Kwal',
    sv: 'Manet',
    da: 'Vandmand',
    no: 'Manet',
    fi: 'Meduusa'
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
  'leopard.png': {
    en: 'Leopard',
    de: 'Leopard',
    fr: 'Leopard',
    es: 'Leopardo',
    it: 'Leopardo',
    pt: 'Leopardo',
    nl: 'Luipaard',
    sv: 'Leopard',
    da: 'Leopard',
    no: 'Leopard',
    fi: 'Leopardi'
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
  'lizard.png': {
    en: 'Lizard',
    de: 'Eidechse',
    fr: 'Lezard',
    es: 'Lagarto',
    it: 'Lucertola',
    pt: 'Lagarto',
    nl: 'Hagedis',
    sv: 'Odla',
    da: 'Firben',
    no: 'Ogle',
    fi: 'Lisko'
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
    fi: 'Polly'
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
  'peacock.png': {
    en: 'Peacock',
    de: 'Pfau',
    fr: 'Paon',
    es: 'Pavo real',
    it: 'Pavone',
    pt: 'Pavao',
    nl: 'Pauw',
    sv: 'Pafagel',
    da: 'Pafugl',
    no: 'Pafugl',
    fi: 'Riikinkukko'
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
  'pony.png': {
    en: 'Pony',
    de: 'Pony',
    fr: 'Poney',
    es: 'Poni',
    it: 'Pony',
    pt: 'Ponei',
    nl: 'Pony',
    sv: 'Ponny',
    da: 'Pony',
    no: 'Ponni',
    fi: 'Poni'
  },
  'rabbit.png': {
    en: 'Rabbit',
    de: 'Kaninchen',
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
  'shark.png': {
    en: 'Shark',
    de: 'Hai',
    fr: 'Requin',
    es: 'Tiburon',
    it: 'Squalo',
    pt: 'Tubarao',
    nl: 'Haai',
    sv: 'Haj',
    da: 'Haj',
    no: 'Hai',
    fi: 'Hai'
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
  'sloth.png': {
    en: 'Sloth',
    de: 'Faultier',
    fr: 'Paresseux',
    es: 'Perezoso',
    it: 'Bradipo',
    pt: 'Preguica',
    nl: 'Luiaard',
    sv: 'Sengangare',
    da: 'Dovendyr',
    no: 'Dovendyr',
    fi: 'Laiskiainen'
  },
  'snake.png': {
    en: 'Snake',
    de: 'Schlange',
    fr: 'Serpent',
    es: 'Serpiente',
    it: 'Serpente',
    pt: 'Cobra',
    nl: 'Slang',
    sv: 'Orm',
    da: 'Slange',
    no: 'Slange',
    fi: 'Kaarme'
  },
  'squirrel.png': {
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
  'squirrel 2.png': {
    en: 'Squirrel 2',
    de: 'Eichhornchen 2',
    fr: 'Ecureuil 2',
    es: 'Ardilla 2',
    it: 'Scoiattolo 2',
    pt: 'Esquilo 2',
    nl: 'Eekhoorn 2',
    sv: 'Ekorre 2',
    da: 'Egern 2',
    no: 'Ekorn 2',
    fi: 'Orava 2'
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
  'tiger.png': {
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
  'vulture.png': {
    en: 'Vulture',
    de: 'Geier',
    fr: 'Vautour',
    es: 'Buitre',
    it: 'Avvoltoio',
    pt: 'Abutre',
    nl: 'Gier',
    sv: 'Gam',
    da: 'Grib',
    no: 'Gribb',
    fi: 'Korppikotka'
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
  const sourceFolderName = 'animals bw 5';

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
