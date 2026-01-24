/**
 * Import Script: Clothing Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-clothing-images.js
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
// CONFIGURATION - CLOTHING THEME
// ============================================================

const THEME_CONFIG = {
  name: 'clothing',
  type: 'images',
  sourceFolderName: 'clothing',
  displayNames: {
    en: 'Clothing',                     // American English
    de: 'Kleidung',                     // German
    fr: 'Vêtements',                    // French
    es: 'Ropa',                         // Mexican Spanish
    it: 'Abbigliamento',                // Italian
    pt: 'Roupas',                       // Brazilian Portuguese
    nl: 'Kleding',                      // Dutch
    sv: 'Kläder',                       // Swedish
    da: 'Tøj',                          // Danish
    no: 'Klær',                         // Norwegian
    fi: 'Vaatteet'                      // Finnish
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'apron.png': {
    en: 'Apron',                        // American English
    de: 'Schürze',                      // German
    fr: 'Tablier',                      // French
    es: 'Delantal',                     // Mexican Spanish
    it: 'Grembiule',                    // Italian
    pt: 'Avental',                      // Brazilian Portuguese
    nl: 'Schort',                       // Dutch
    sv: 'Förkläde',                     // Swedish
    da: 'Forklæde',                     // Danish
    no: 'Forkle',                       // Norwegian
    fi: 'Esiliina'                      // Finnish
  },
  'beanie.png': {
    en: 'Beanie',                       // American English
    de: 'Mütze',                        // German
    fr: 'Bonnet',                       // French
    es: 'Gorro',                        // Mexican Spanish
    it: 'Berretto',                     // Italian
    pt: 'Gorro',                        // Brazilian Portuguese
    nl: 'Muts',                         // Dutch
    sv: 'Mössa',                        // Swedish
    da: 'Hue',                          // Danish
    no: 'Lue',                          // Norwegian
    fi: 'Pipo'                          // Finnish
  },
  'belt.png': {
    en: 'Belt',                         // American English
    de: 'Gürtel',                       // German
    fr: 'Ceinture',                     // French
    es: 'Cinturón',                     // Mexican Spanish
    it: 'Cintura',                      // Italian
    pt: 'Cinto',                        // Brazilian Portuguese
    nl: 'Riem',                         // Dutch
    sv: 'Bälte',                        // Swedish
    da: 'Bælte',                        // Danish
    no: 'Belte',                        // Norwegian
    fi: 'Vyö'                           // Finnish
  },
  'blouse.png': {
    en: 'Blouse',                       // American English
    de: 'Bluse',                        // German
    fr: 'Chemisier',                    // French
    es: 'Blusa',                        // Mexican Spanish
    it: 'Camicetta',                    // Italian
    pt: 'Blusa',                        // Brazilian Portuguese
    nl: 'Blouse',                       // Dutch
    sv: 'Blus',                         // Swedish
    da: 'Bluse',                        // Danish
    no: 'Bluse',                        // Norwegian
    fi: 'Pusero'                        // Finnish
  },
  'boots.png': {
    en: 'Boots',                        // American English
    de: 'Stiefel',                      // German
    fr: 'Bottes',                       // French
    es: 'Botas',                        // Mexican Spanish
    it: 'Stivali',                      // Italian
    pt: 'Botas',                        // Brazilian Portuguese
    nl: 'Laarzen',                      // Dutch
    sv: 'Stövlar',                      // Swedish
    da: 'Støvler',                      // Danish
    no: 'Støvler',                      // Norwegian
    fi: 'Saappaat'                      // Finnish
  },
  'bow tie.png': {
    en: 'Bow Tie',                      // American English
    de: 'Fliege',                       // German
    fr: 'Nœud papillon',                // French
    es: 'Moño',                         // Mexican Spanish
    it: 'Papillon',                     // Italian
    pt: 'Gravata borboleta',            // Brazilian Portuguese
    nl: 'Vlinderdas',                   // Dutch
    sv: 'Fluga',                        // Swedish
    da: 'Butterfly',                    // Danish
    no: 'Sløyfe',                       // Norwegian
    fi: 'Rusetti'                       // Finnish
  },
  'cap.png': {
    en: 'Cap',                          // American English
    de: 'Kappe',                        // German
    fr: 'Casquette',                    // French
    es: 'Gorra',                        // Mexican Spanish
    it: 'Cappellino',                   // Italian
    pt: 'Boné',                         // Brazilian Portuguese
    nl: 'Pet',                          // Dutch
    sv: 'Keps',                         // Swedish
    da: 'Kasket',                       // Danish
    no: 'Caps',                         // Norwegian
    fi: 'Lippis'                        // Finnish
  },
  'cardigan.png': {
    en: 'Cardigan',                     // American English
    de: 'Strickjacke',                  // German
    fr: 'Cardigan',                     // French
    es: 'Cárdigan',                     // Mexican Spanish
    it: 'Cardigan',                     // Italian
    pt: 'Cardigã',                      // Brazilian Portuguese
    nl: 'Vest',                         // Dutch
    sv: 'Kofta',                        // Swedish
    da: 'Cardigan',                     // Danish
    no: 'Cardigan',                     // Norwegian
    fi: 'Neuletakki'                    // Finnish
  },
  'coat.png': {
    en: 'Coat',                         // American English
    de: 'Mantel',                       // German
    fr: 'Manteau',                      // French
    es: 'Abrigo',                       // Mexican Spanish
    it: 'Cappotto',                     // Italian
    pt: 'Casaco',                       // Brazilian Portuguese
    nl: 'Jas',                          // Dutch
    sv: 'Kappa',                        // Swedish
    da: 'Frakke',                       // Danish
    no: 'Kåpe',                         // Norwegian
    fi: 'Takki'                         // Finnish
  },
  'dress.png': {
    en: 'Dress',                        // American English
    de: 'Kleid',                        // German
    fr: 'Robe',                         // French
    es: 'Vestido',                      // Mexican Spanish
    it: 'Vestito',                      // Italian
    pt: 'Vestido',                      // Brazilian Portuguese
    nl: 'Jurk',                         // Dutch
    sv: 'Klänning',                     // Swedish
    da: 'Kjole',                        // Danish
    no: 'Kjole',                        // Norwegian
    fi: 'Mekko'                         // Finnish
  },
  'flip-flops.png': {
    en: 'Flip-Flops',                   // American English
    de: 'Flip-Flops',                   // German
    fr: 'Tongs',                        // French
    es: 'Chanclas',                     // Mexican Spanish
    it: 'Infradito',                    // Italian
    pt: 'Chinelos',                     // Brazilian Portuguese
    nl: 'Slippers',                     // Dutch
    sv: 'Flip-flops',                   // Swedish
    da: 'Klipklapper',                  // Danish
    no: 'Flip-flops',                   // Norwegian
    fi: 'Varvassandaalit'               // Finnish
  },
  'glove.png': {
    en: 'Glove',                        // American English
    de: 'Handschuh',                    // German
    fr: 'Gant',                         // French
    es: 'Guante',                       // Mexican Spanish
    it: 'Guanto',                       // Italian
    pt: 'Luva',                         // Brazilian Portuguese
    nl: 'Handschoen',                   // Dutch
    sv: 'Handske',                      // Swedish
    da: 'Handske',                      // Danish
    no: 'Hanske',                       // Norwegian
    fi: 'Käsine'                        // Finnish
  },
  'hat.png': {
    en: 'Hat',                          // American English
    de: 'Hut',                          // German
    fr: 'Chapeau',                      // French
    es: 'Sombrero',                     // Mexican Spanish
    it: 'Cappello',                     // Italian
    pt: 'Chapéu',                       // Brazilian Portuguese
    nl: 'Hoed',                         // Dutch
    sv: 'Hatt',                         // Swedish
    da: 'Hat',                          // Danish
    no: 'Hatt',                         // Norwegian
    fi: 'Hattu'                         // Finnish
  },
  'hoodie.png': {
    en: 'Hoodie',                       // American English
    de: 'Kapuzenpullover',              // German
    fr: 'Sweat à capuche',              // French
    es: 'Sudadera con capucha',         // Mexican Spanish
    it: 'Felpa con cappuccio',          // Italian
    pt: 'Moletom com capuz',            // Brazilian Portuguese
    nl: 'Hoodie',                       // Dutch
    sv: 'Huvtröja',                     // Swedish
    da: 'Hættetrøje',                   // Danish
    no: 'Hettegenser',                  // Norwegian
    fi: 'Huppari'                       // Finnish
  },
  'jacket.png': {
    en: 'Jacket',                       // American English
    de: 'Jacke',                        // German
    fr: 'Veste',                        // French
    es: 'Chamarra',                     // Mexican Spanish
    it: 'Giacca',                       // Italian
    pt: 'Jaqueta',                      // Brazilian Portuguese
    nl: 'Jack',                         // Dutch
    sv: 'Jacka',                        // Swedish
    da: 'Jakke',                        // Danish
    no: 'Jakke',                        // Norwegian
    fi: 'Takki'                         // Finnish
  },
  'jeans.png': {
    en: 'Jeans',                        // American English
    de: 'Jeans',                        // German
    fr: 'Jean',                         // French
    es: 'Jeans',                        // Mexican Spanish
    it: 'Jeans',                        // Italian
    pt: 'Jeans',                        // Brazilian Portuguese
    nl: 'Spijkerbroek',                 // Dutch
    sv: 'Jeans',                        // Swedish
    da: 'Jeans',                        // Danish
    no: 'Jeans',                        // Norwegian
    fi: 'Farkut'                        // Finnish
  },
  'jumpsuit.png': {
    en: 'Jumpsuit',                     // American English
    de: 'Overall',                      // German
    fr: 'Combinaison',                  // French
    es: 'Mameluco',                     // Mexican Spanish
    it: 'Tuta',                         // Italian
    pt: 'Macacão',                      // Brazilian Portuguese
    nl: 'Jumpsuit',                     // Dutch
    sv: 'Jumpsuit',                     // Swedish
    da: 'Jumpsuit',                     // Danish
    no: 'Jumpsuit',                     // Norwegian
    fi: 'Haalari'                       // Finnish
  },
  'leggings.png': {
    en: 'Leggings',                     // American English
    de: 'Leggings',                     // German
    fr: 'Legging',                      // French
    es: 'Leggings',                     // Mexican Spanish
    it: 'Leggings',                     // Italian
    pt: 'Legging',                      // Brazilian Portuguese
    nl: 'Legging',                      // Dutch
    sv: 'Leggings',                     // Swedish
    da: 'Leggings',                     // Danish
    no: 'Tights',                       // Norwegian
    fi: 'Legginsit'                     // Finnish
  },
  'mitten.png': {
    en: 'Mitten',                       // American English
    de: 'Fäustling',                    // German
    fr: 'Moufle',                       // French
    es: 'Manopla',                      // Mexican Spanish
    it: 'Muffola',                      // Italian
    pt: 'Luva sem dedos',               // Brazilian Portuguese
    nl: 'Want',                         // Dutch
    sv: 'Tumvante',                     // Swedish
    da: 'Luffe',                        // Danish
    no: 'Vott',                         // Norwegian
    fi: 'Kinnas'                        // Finnish
  },
  'overalls.png': {
    en: 'Overalls',                     // American English
    de: 'Latzhose',                     // German
    fr: 'Salopette',                    // French
    es: 'Overol',                       // Mexican Spanish
    it: 'Salopette',                    // Italian
    pt: 'Jardineira',                   // Brazilian Portuguese
    nl: 'Tuinbroek',                    // Dutch
    sv: 'Hängselbyxor',                 // Swedish
    da: 'Overalls',                     // Danish
    no: 'Selebukse',                    // Norwegian
    fi: 'Haalarit'                      // Finnish
  },
  'pajamas.png': {
    en: 'Pajamas',                      // American English
    de: 'Schlafanzug',                  // German
    fr: 'Pyjama',                       // French
    es: 'Pijama',                       // Mexican Spanish
    it: 'Pigiama',                      // Italian
    pt: 'Pijama',                       // Brazilian Portuguese
    nl: 'Pyjama',                       // Dutch
    sv: 'Pyjamas',                      // Swedish
    da: 'Pyjamas',                      // Danish
    no: 'Pysj',                         // Norwegian
    fi: 'Pyjama'                        // Finnish
  },
  'pants.png': {
    en: 'Pants',                        // American English
    de: 'Hose',                         // German
    fr: 'Pantalon',                     // French
    es: 'Pantalón',                     // Mexican Spanish
    it: 'Pantaloni',                    // Italian
    pt: 'Calça',                        // Brazilian Portuguese
    nl: 'Broek',                        // Dutch
    sv: 'Byxor',                        // Swedish
    da: 'Bukser',                       // Danish
    no: 'Bukse',                        // Norwegian
    fi: 'Housut'                        // Finnish
  },
  'rain boots.png': {
    en: 'Rain Boots',                   // American English
    de: 'Gummistiefel',                 // German
    fr: 'Bottes de pluie',              // French
    es: 'Botas de lluvia',              // Mexican Spanish
    it: 'Stivali da pioggia',           // Italian
    pt: 'Galochas',                     // Brazilian Portuguese
    nl: 'Regenlaarzen',                 // Dutch
    sv: 'Gummistövlar',                 // Swedish
    da: 'Gummistøvler',                 // Danish
    no: 'Gummistøvler',                 // Norwegian
    fi: 'Kumisaappaat'                  // Finnish
  },
  'raincoat.png': {
    en: 'Raincoat',                     // American English
    de: 'Regenmantel',                  // German
    fr: 'Imperméable',                  // French
    es: 'Impermeable',                  // Mexican Spanish
    it: 'Impermeabile',                 // Italian
    pt: 'Capa de chuva',                // Brazilian Portuguese
    nl: 'Regenjas',                     // Dutch
    sv: 'Regnrock',                     // Swedish
    da: 'Regnfrakke',                   // Danish
    no: 'Regnfrakk',                    // Norwegian
    fi: 'Sadetakki'                     // Finnish
  },
  'scarf.png': {
    en: 'Scarf',                        // American English
    de: 'Schal',                        // German
    fr: 'Écharpe',                      // French
    es: 'Bufanda',                      // Mexican Spanish
    it: 'Sciarpa',                      // Italian
    pt: 'Cachecol',                     // Brazilian Portuguese
    nl: 'Sjaal',                        // Dutch
    sv: 'Halsduk',                      // Swedish
    da: 'Halstørklæde',                 // Danish
    no: 'Skjerf',                       // Norwegian
    fi: 'Huivi'                         // Finnish
  },
  'shirt.png': {
    en: 'Shirt',                        // American English
    de: 'Hemd',                         // German
    fr: 'Chemise',                      // French
    es: 'Camisa',                       // Mexican Spanish
    it: 'Camicia',                      // Italian
    pt: 'Camisa',                       // Brazilian Portuguese
    nl: 'Overhemd',                     // Dutch
    sv: 'Skjorta',                      // Swedish
    da: 'Skjorte',                      // Danish
    no: 'Skjorte',                      // Norwegian
    fi: 'Paita'                         // Finnish
  },
  'shoe.png': {
    en: 'Shoe',                         // American English
    de: 'Schuh',                        // German
    fr: 'Chaussure',                    // French
    es: 'Zapato',                       // Mexican Spanish
    it: 'Scarpa',                       // Italian
    pt: 'Sapato',                       // Brazilian Portuguese
    nl: 'Schoen',                       // Dutch
    sv: 'Sko',                          // Swedish
    da: 'Sko',                          // Danish
    no: 'Sko',                          // Norwegian
    fi: 'Kenkä'                         // Finnish
  },
  'shorts.png': {
    en: 'Shorts',                       // American English
    de: 'Shorts',                       // German
    fr: 'Short',                        // French
    es: 'Shorts',                       // Mexican Spanish
    it: 'Pantaloncini',                 // Italian
    pt: 'Shorts',                       // Brazilian Portuguese
    nl: 'Korte broek',                  // Dutch
    sv: 'Shorts',                       // Swedish
    da: 'Shorts',                       // Danish
    no: 'Shorts',                       // Norwegian
    fi: 'Shortsit'                      // Finnish
  },
  'skirt.png': {
    en: 'Skirt',                        // American English
    de: 'Rock',                         // German
    fr: 'Jupe',                         // French
    es: 'Falda',                        // Mexican Spanish
    it: 'Gonna',                        // Italian
    pt: 'Saia',                         // Brazilian Portuguese
    nl: 'Rok',                          // Dutch
    sv: 'Kjol',                         // Swedish
    da: 'Nederdel',                     // Danish
    no: 'Skjørt',                       // Norwegian
    fi: 'Hame'                          // Finnish
  },
  'slippers.png': {
    en: 'Slippers',                     // American English
    de: 'Hausschuhe',                   // German
    fr: 'Chaussons',                    // French
    es: 'Pantuflas',                    // Mexican Spanish
    it: 'Pantofole',                    // Italian
    pt: 'Pantufas',                     // Brazilian Portuguese
    nl: 'Pantoffels',                   // Dutch
    sv: 'Tofflor',                      // Swedish
    da: 'Hjemmesko',                    // Danish
    no: 'Tøfler',                       // Norwegian
    fi: 'Tohvelit'                      // Finnish
  },
  'snow boots.png': {
    en: 'Snow Boots',                   // American English
    de: 'Schneestiefel',                // German
    fr: 'Bottes de neige',              // French
    es: 'Botas para nieve',             // Mexican Spanish
    it: 'Stivali da neve',              // Italian
    pt: 'Botas de neve',                // Brazilian Portuguese
    nl: 'Snowboots',                    // Dutch
    sv: 'Snökängor',                    // Swedish
    da: 'Snestøvler',                   // Danish
    no: 'Snøstøvler',                   // Norwegian
    fi: 'Lumikengät'                    // Finnish
  },
  'snowsuit.png': {
    en: 'Snowsuit',                     // American English
    de: 'Schneeanzug',                  // German
    fr: 'Combinaison de neige',         // French
    es: 'Traje de nieve',               // Mexican Spanish
    it: 'Tuta da neve',                 // Italian
    pt: 'Macacão de neve',              // Brazilian Portuguese
    nl: 'Sneeuwpak',                    // Dutch
    sv: 'Snödräkt',                     // Swedish
    da: 'Flyverdragt',                  // Danish
    no: 'Snedrakt',                     // Norwegian
    fi: 'Toppahaalari'                  // Finnish
  },
  'sweater.png': {
    en: 'Sweater',                      // American English
    de: 'Pullover',                     // German
    fr: 'Pull',                         // French
    es: 'Suéter',                       // Mexican Spanish
    it: 'Maglione',                     // Italian
    pt: 'Suéter',                       // Brazilian Portuguese
    nl: 'Trui',                         // Dutch
    sv: 'Tröja',                        // Swedish
    da: 'Sweater',                      // Danish
    no: 'Genser',                       // Norwegian
    fi: 'Villapaita'                    // Finnish
  },
  'sweatpants.png': {
    en: 'Sweatpants',                   // American English
    de: 'Jogginghose',                  // German
    fr: 'Pantalon de jogging',          // French
    es: 'Pants',                        // Mexican Spanish
    it: 'Pantaloni della tuta',         // Italian
    pt: 'Calça de moletom',             // Brazilian Portuguese
    nl: 'Joggingbroek',                 // Dutch
    sv: 'Mjukisbyxor',                  // Swedish
    da: 'Joggingbukser',                // Danish
    no: 'Joggebukse',                   // Norwegian
    fi: 'Verkkarit'                     // Finnish
  },
  'sweatshirt.png': {
    en: 'Sweatshirt',                   // American English
    de: 'Sweatshirt',                   // German
    fr: 'Sweat-shirt',                  // French
    es: 'Sudadera',                     // Mexican Spanish
    it: 'Felpa',                        // Italian
    pt: 'Moletom',                      // Brazilian Portuguese
    nl: 'Sweater',                      // Dutch
    sv: 'Sweatshirt',                   // Swedish
    da: 'Sweatshirt',                   // Danish
    no: 'Genser',                       // Norwegian
    fi: 'Collegepaita'                  // Finnish
  },
  'swimsuit.png': {
    en: 'Swimsuit',                     // American English
    de: 'Badeanzug',                    // German
    fr: 'Maillot de bain',              // French
    es: 'Traje de baño',                // Mexican Spanish
    it: 'Costume da bagno',             // Italian
    pt: 'Maiô',                         // Brazilian Portuguese
    nl: 'Badpak',                       // Dutch
    sv: 'Baddräkt',                     // Swedish
    da: 'Badedragt',                    // Danish
    no: 'Badedrakt',                    // Norwegian
    fi: 'Uimapuku'                      // Finnish
  },
  'tank top.png': {
    en: 'Tank Top',                     // American English
    de: 'Trägershirt',                  // German
    fr: 'Débardeur',                    // French
    es: 'Camiseta sin mangas',          // Mexican Spanish
    it: 'Canottiera',                   // Italian
    pt: 'Regata',                       // Brazilian Portuguese
    nl: 'Hemd',                         // Dutch
    sv: 'Linne',                        // Swedish
    da: 'Tanktop',                      // Danish
    no: 'Singlet',                      // Norwegian
    fi: 'Toppi'                         // Finnish
  },
  'tie.png': {
    en: 'Tie',                          // American English
    de: 'Krawatte',                     // German
    fr: 'Cravate',                      // French
    es: 'Corbata',                      // Mexican Spanish
    it: 'Cravatta',                     // Italian
    pt: 'Gravata',                      // Brazilian Portuguese
    nl: 'Stropdas',                     // Dutch
    sv: 'Slips',                        // Swedish
    da: 'Slips',                        // Danish
    no: 'Slips',                        // Norwegian
    fi: 'Solmio'                        // Finnish
  },
  'trousers.png': {
    en: 'Trousers',                     // American English
    de: 'Hose',                         // German
    fr: 'Pantalon',                     // French
    es: 'Pantalones',                   // Mexican Spanish
    it: 'Pantaloni',                    // Italian
    pt: 'Calças',                       // Brazilian Portuguese
    nl: 'Broek',                        // Dutch
    sv: 'Byxor',                        // Swedish
    da: 'Bukser',                       // Danish
    no: 'Bukser',                       // Norwegian
    fi: 'Housut'                        // Finnish
  },
  't-shirt.png': {
    en: 'T-Shirt',                      // American English
    de: 'T-Shirt',                      // German
    fr: 'T-shirt',                      // French
    es: 'Camiseta',                     // Mexican Spanish
    it: 'Maglietta',                    // Italian
    pt: 'Camiseta',                     // Brazilian Portuguese
    nl: 'T-shirt',                      // Dutch
    sv: 'T-shirt',                      // Swedish
    da: 'T-shirt',                      // Danish
    no: 'T-skjorte',                    // Norwegian
    fi: 'T-paita'                       // Finnish
  },
  'underpants.png': {
    en: 'Underpants',                   // American English
    de: 'Unterhose',                    // German
    fr: 'Sous-vêtements',               // French
    es: 'Calzones',                     // Mexican Spanish
    it: 'Mutande',                      // Italian
    pt: 'Cueca',                        // Brazilian Portuguese
    nl: 'Onderbroek',                   // Dutch
    sv: 'Kalsonger',                    // Swedish
    da: 'Underbukser',                  // Danish
    no: 'Underbukse',                   // Norwegian
    fi: 'Alushousut'                    // Finnish
  },
  'uniform.png': {
    en: 'Uniform',                      // American English
    de: 'Uniform',                      // German
    fr: 'Uniforme',                     // French
    es: 'Uniforme',                     // Mexican Spanish
    it: 'Uniforme',                     // Italian
    pt: 'Uniforme',                     // Brazilian Portuguese
    nl: 'Uniform',                      // Dutch
    sv: 'Uniform',                      // Swedish
    da: 'Uniform',                      // Danish
    no: 'Uniform',                      // Norwegian
    fi: 'Univormu'                      // Finnish
  },
  'vest.png': {
    en: 'Vest',                         // American English
    de: 'Weste',                        // German
    fr: 'Gilet',                        // French
    es: 'Chaleco',                      // Mexican Spanish
    it: 'Gilet',                        // Italian
    pt: 'Colete',                       // Brazilian Portuguese
    nl: 'Vest',                         // Dutch
    sv: 'Väst',                         // Swedish
    da: 'Vest',                         // Danish
    no: 'Vest',                         // Norwegian
    fi: 'Liivi'                         // Finnish
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
