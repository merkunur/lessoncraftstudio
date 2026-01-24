/**
 * Import Script: At the Supermarket Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-at-the-supermarket-images.js
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
  name: 'at_the_supermarket',
  type: 'images',
  displayNames: {
    en: 'At the Supermarket',
    de: 'Im Supermarkt',
    fr: 'Au supermarché',
    es: 'En el supermercado',
    it: 'Al supermercato',
    pt: 'No supermercado',
    nl: 'In de supermarkt',
    sv: 'I snabbköpet',
    da: 'I supermarkedet',
    no: 'I supermarkedet',
    fi: 'Ruokakaupassa'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'apple.png': {
    en: 'Apple',
    de: 'Apfel',
    fr: 'Pomme',
    es: 'Manzana',
    it: 'Mela',
    pt: 'Maçã',
    nl: 'Appel',
    sv: 'Äpple',
    da: 'Æble',
    no: 'Eple',
    fi: 'Omena'
  },
  'bacon.png': {
    en: 'Bacon',
    de: 'Speck',
    fr: 'Bacon',
    es: 'Tocino',
    it: 'Pancetta',
    pt: 'Bacon',
    nl: 'Spek',
    sv: 'Bacon',
    da: 'Bacon',
    no: 'Bacon',
    fi: 'Pekoni'
  },
  'bag.png': {
    en: 'Bag',
    de: 'Tüte',
    fr: 'Sac',
    es: 'Bolsa',
    it: 'Sacchetto',
    pt: 'Sacola',
    nl: 'Tas',
    sv: 'Påse',
    da: 'Pose',
    no: 'Pose',
    fi: 'Kassi'
  },
  'bagel.png': {
    en: 'Bagel',
    de: 'Bagel',
    fr: 'Bagel',
    es: 'Bagel',
    it: 'Bagel',
    pt: 'Bagel',
    nl: 'Bagel',
    sv: 'Bagel',
    da: 'Bagel',
    no: 'Bagel',
    fi: 'Bageli'
  },
  'banana.png': {
    en: 'Banana',
    de: 'Banane',
    fr: 'Banane',
    es: 'Plátano',
    it: 'Banana',
    pt: 'Banana',
    nl: 'Banaan',
    sv: 'Banan',
    da: 'Banan',
    no: 'Banan',
    fi: 'Banaani'
  },
  'basket.png': {
    en: 'Basket',
    de: 'Korb',
    fr: 'Panier',
    es: 'Canasta',
    it: 'Cestino',
    pt: 'Cesta',
    nl: 'Mand',
    sv: 'Korg',
    da: 'Kurv',
    no: 'Kurv',
    fi: 'Kori'
  },
  'blueberry.png': {
    en: 'Blueberry',
    de: 'Blaubeere',
    fr: 'Myrtille',
    es: 'Arándano',
    it: 'Mirtillo',
    pt: 'Mirtilo',
    nl: 'Bosbes',
    sv: 'Blåbär',
    da: 'Blåbær',
    no: 'Blåbær',
    fi: 'Mustikka'
  },
  'bread.png': {
    en: 'Bread',
    de: 'Brot',
    fr: 'Pain',
    es: 'Pan',
    it: 'Pane',
    pt: 'Pão',
    nl: 'Brood',
    sv: 'Bröd',
    da: 'Brød',
    no: 'Brød',
    fi: 'Leipä'
  },
  'broccoli.png': {
    en: 'Broccoli',
    de: 'Brokkoli',
    fr: 'Brocoli',
    es: 'Brócoli',
    it: 'Broccoli',
    pt: 'Brócolis',
    nl: 'Broccoli',
    sv: 'Broccoli',
    da: 'Broccoli',
    no: 'Brokkoli',
    fi: 'Parsakaali'
  },
  'butter.png': {
    en: 'Butter',
    de: 'Butter',
    fr: 'Beurre',
    es: 'Mantequilla',
    it: 'Burro',
    pt: 'Manteiga',
    nl: 'Boter',
    sv: 'Smör',
    da: 'Smør',
    no: 'Smør',
    fi: 'Voi'
  },
  'cake.png': {
    en: 'Cake',
    de: 'Kuchen',
    fr: 'Gâteau',
    es: 'Pastel',
    it: 'Torta',
    pt: 'Bolo',
    nl: 'Taart',
    sv: 'Tårta',
    da: 'Kage',
    no: 'Kake',
    fi: 'Kakku'
  },
  'can.png': {
    en: 'Can',
    de: 'Dose',
    fr: 'Boîte de conserve',
    es: 'Lata',
    it: 'Lattina',
    pt: 'Lata',
    nl: 'Blik',
    sv: 'Burk',
    da: 'Dåse',
    no: 'Boks',
    fi: 'Tölkki'
  },
  'candy.png': {
    en: 'Candy',
    de: 'Süßigkeiten',
    fr: 'Bonbon',
    es: 'Dulce',
    it: 'Caramella',
    pt: 'Doce',
    nl: 'Snoep',
    sv: 'Godis',
    da: 'Slik',
    no: 'Godteri',
    fi: 'Karkki'
  },
  'carrot.png': {
    en: 'Carrot',
    de: 'Karotte',
    fr: 'Carotte',
    es: 'Zanahoria',
    it: 'Carota',
    pt: 'Cenoura',
    nl: 'Wortel',
    sv: 'Morot',
    da: 'Gulerod',
    no: 'Gulrot',
    fi: 'Porkkana'
  },
  'cart.png': {
    en: 'Cart',
    de: 'Einkaufswagen',
    fr: 'Chariot',
    es: 'Carrito',
    it: 'Carrello',
    pt: 'Carrinho',
    nl: 'Winkelwagen',
    sv: 'Kundvagn',
    da: 'Indkøbsvogn',
    no: 'Handlevogn',
    fi: 'Ostoskärry'
  },
  'cash register.png': {
    en: 'Cash Register',
    de: 'Kasse',
    fr: 'Caisse enregistreuse',
    es: 'Caja registradora',
    it: 'Registratore di cassa',
    pt: 'Caixa registradora',
    nl: 'Kassa',
    sv: 'Kassaapparat',
    da: 'Kasseapparat',
    no: 'Kassaapparat',
    fi: 'Kassakone'
  },
  'cereal.png': {
    en: 'Cereal',
    de: 'Müsli',
    fr: 'Céréales',
    es: 'Cereal',
    it: 'Cereali',
    pt: 'Cereal',
    nl: 'Ontbijtgranen',
    sv: 'Flingor',
    da: 'Morgenmad',
    no: 'Frokostblanding',
    fi: 'Murot'
  },
  'cheese.png': {
    en: 'Cheese',
    de: 'Käse',
    fr: 'Fromage',
    es: 'Queso',
    it: 'Formaggio',
    pt: 'Queijo',
    nl: 'Kaas',
    sv: 'Ost',
    da: 'Ost',
    no: 'Ost',
    fi: 'Juusto'
  },
  'cherry.png': {
    en: 'Cherry',
    de: 'Kirsche',
    fr: 'Cerise',
    es: 'Cereza',
    it: 'Ciliegia',
    pt: 'Cereja',
    nl: 'Kers',
    sv: 'Körsbär',
    da: 'Kirsebær',
    no: 'Kirsebær',
    fi: 'Kirsikka'
  },
  'chocolate bar.png': {
    en: 'Chocolate Bar',
    de: 'Schokoriegel',
    fr: 'Barre de chocolat',
    es: 'Barra de chocolate',
    it: 'Barretta di cioccolato',
    pt: 'Barra de chocolate',
    nl: 'Chocoladereep',
    sv: 'Chokladkaka',
    da: 'Chokoladebar',
    no: 'Sjokoladeplate',
    fi: 'Suklaapatukka'
  },
  'cookie.png': {
    en: 'Cookie',
    de: 'Keks',
    fr: 'Biscuit',
    es: 'Galleta',
    it: 'Biscotto',
    pt: 'Biscoito',
    nl: 'Koekje',
    sv: 'Kaka',
    da: 'Småkage',
    no: 'Kjeks',
    fi: 'Keksi'
  },
  'corn.png': {
    en: 'Corn',
    de: 'Mais',
    fr: 'Maïs',
    es: 'Elote',
    it: 'Mais',
    pt: 'Milho',
    nl: 'Maïs',
    sv: 'Majs',
    da: 'Majs',
    no: 'Mais',
    fi: 'Maissi'
  },
  'cucumber.png': {
    en: 'Cucumber',
    de: 'Gurke',
    fr: 'Concombre',
    es: 'Pepino',
    it: 'Cetriolo',
    pt: 'Pepino',
    nl: 'Komkommer',
    sv: 'Gurka',
    da: 'Agurk',
    no: 'Agurk',
    fi: 'Kurkku'
  },
  'donut.png': {
    en: 'Donut',
    de: 'Donut',
    fr: 'Beignet',
    es: 'Dona',
    it: 'Ciambella',
    pt: 'Rosquinha',
    nl: 'Donut',
    sv: 'Munk',
    da: 'Doughnut',
    no: 'Smultring',
    fi: 'Donitsi'
  },
  'egg.png': {
    en: 'Egg',
    de: 'Ei',
    fr: 'Œuf',
    es: 'Huevo',
    it: 'Uovo',
    pt: 'Ovo',
    nl: 'Ei',
    sv: 'Ägg',
    da: 'Æg',
    no: 'Egg',
    fi: 'Muna'
  },
  'fish.png': {
    en: 'Fish',
    de: 'Fisch',
    fr: 'Poisson',
    es: 'Pescado',
    it: 'Pesce',
    pt: 'Peixe',
    nl: 'Vis',
    sv: 'Fisk',
    da: 'Fisk',
    no: 'Fisk',
    fi: 'Kala'
  },
  'french fries.png': {
    en: 'French Fries',
    de: 'Pommes frites',
    fr: 'Frites',
    es: 'Papas fritas',
    it: 'Patatine fritte',
    pt: 'Batatas fritas',
    nl: 'Frietjes',
    sv: 'Pommes frites',
    da: 'Pommes frites',
    no: 'Pommes frites',
    fi: 'Ranskalaiset'
  },
  'garlic.png': {
    en: 'Garlic',
    de: 'Knoblauch',
    fr: 'Ail',
    es: 'Ajo',
    it: 'Aglio',
    pt: 'Alho',
    nl: 'Knoflook',
    sv: 'Vitlök',
    da: 'Hvidløg',
    no: 'Hvitløk',
    fi: 'Valkosipuli'
  },
  'grapes.png': {
    en: 'Grapes',
    de: 'Trauben',
    fr: 'Raisins',
    es: 'Uvas',
    it: 'Uva',
    pt: 'Uvas',
    nl: 'Druiven',
    sv: 'Druvor',
    da: 'Druer',
    no: 'Druer',
    fi: 'Viinirypäleet'
  },
  'ham.png': {
    en: 'Ham',
    de: 'Schinken',
    fr: 'Jambon',
    es: 'Jamón',
    it: 'Prosciutto',
    pt: 'Presunto',
    nl: 'Ham',
    sv: 'Skinka',
    da: 'Skinke',
    no: 'Skinke',
    fi: 'Kinkku'
  },
  'ice cream.png': {
    en: 'Ice Cream',
    de: 'Eiscreme',
    fr: 'Glace',
    es: 'Helado',
    it: 'Gelato',
    pt: 'Sorvete',
    nl: 'IJsje',
    sv: 'Glass',
    da: 'Is',
    no: 'Iskrem',
    fi: 'Jäätelö'
  },
  'jam.png': {
    en: 'Jam',
    de: 'Marmelade',
    fr: 'Confiture',
    es: 'Mermelada',
    it: 'Marmellata',
    pt: 'Geleia',
    nl: 'Jam',
    sv: 'Sylt',
    da: 'Syltetøj',
    no: 'Syltetøy',
    fi: 'Hillo'
  },
  'juice.png': {
    en: 'Juice',
    de: 'Saft',
    fr: 'Jus',
    es: 'Jugo',
    it: 'Succo',
    pt: 'Suco',
    nl: 'Sap',
    sv: 'Juice',
    da: 'Juice',
    no: 'Juice',
    fi: 'Mehu'
  },
  'kiwi.png': {
    en: 'Kiwi',
    de: 'Kiwi',
    fr: 'Kiwi',
    es: 'Kiwi',
    it: 'Kiwi',
    pt: 'Kiwi',
    nl: 'Kiwi',
    sv: 'Kiwi',
    da: 'Kiwi',
    no: 'Kiwi',
    fi: 'Kiivi'
  },
  'lemon.png': {
    en: 'Lemon',
    de: 'Zitrone',
    fr: 'Citron',
    es: 'Limón',
    it: 'Limone',
    pt: 'Limão',
    nl: 'Citroen',
    sv: 'Citron',
    da: 'Citron',
    no: 'Sitron',
    fi: 'Sitruuna'
  },
  'lettuce.png': {
    en: 'Lettuce',
    de: 'Salat',
    fr: 'Laitue',
    es: 'Lechuga',
    it: 'Lattuga',
    pt: 'Alface',
    nl: 'Sla',
    sv: 'Sallad',
    da: 'Salat',
    no: 'Salat',
    fi: 'Salaatti'
  },
  'melon.png': {
    en: 'Melon',
    de: 'Melone',
    fr: 'Melon',
    es: 'Melón',
    it: 'Melone',
    pt: 'Melão',
    nl: 'Meloen',
    sv: 'Melon',
    da: 'Melon',
    no: 'Melon',
    fi: 'Meloni'
  },
  'milk.png': {
    en: 'Milk',
    de: 'Milch',
    fr: 'Lait',
    es: 'Leche',
    it: 'Latte',
    pt: 'Leite',
    nl: 'Melk',
    sv: 'Mjölk',
    da: 'Mælk',
    no: 'Melk',
    fi: 'Maito'
  },
  'muffin.png': {
    en: 'Muffin',
    de: 'Muffin',
    fr: 'Muffin',
    es: 'Muffin',
    it: 'Muffin',
    pt: 'Muffin',
    nl: 'Muffin',
    sv: 'Muffin',
    da: 'Muffin',
    no: 'Muffins',
    fi: 'Muffini'
  },
  'mushroom.png': {
    en: 'Mushroom',
    de: 'Pilz',
    fr: 'Champignon',
    es: 'Champiñón',
    it: 'Fungo',
    pt: 'Cogumelo',
    nl: 'Paddenstoel',
    sv: 'Svamp',
    da: 'Svamp',
    no: 'Sopp',
    fi: 'Sieni'
  },
  'oil.png': {
    en: 'Oil',
    de: 'Öl',
    fr: 'Huile',
    es: 'Aceite',
    it: 'Olio',
    pt: 'Óleo',
    nl: 'Olie',
    sv: 'Olja',
    da: 'Olie',
    no: 'Olje',
    fi: 'Öljy'
  },
  'onion.png': {
    en: 'Onion',
    de: 'Zwiebel',
    fr: 'Oignon',
    es: 'Cebolla',
    it: 'Cipolla',
    pt: 'Cebola',
    nl: 'Ui',
    sv: 'Lök',
    da: 'Løg',
    no: 'Løk',
    fi: 'Sipuli'
  },
  'orange.png': {
    en: 'Orange',
    de: 'Orange',
    fr: 'Orange',
    es: 'Naranja',
    it: 'Arancia',
    pt: 'Laranja',
    nl: 'Sinaasappel',
    sv: 'Apelsin',
    da: 'Appelsin',
    no: 'Appelsin',
    fi: 'Appelsiini'
  },
  'pasta.png': {
    en: 'Pasta',
    de: 'Nudeln',
    fr: 'Pâtes',
    es: 'Pasta',
    it: 'Pasta',
    pt: 'Macarrão',
    nl: 'Pasta',
    sv: 'Pasta',
    da: 'Pasta',
    no: 'Pasta',
    fi: 'Pasta'
  },
  'peach.png': {
    en: 'Peach',
    de: 'Pfirsich',
    fr: 'Pêche',
    es: 'Durazno',
    it: 'Pesca',
    pt: 'Pêssego',
    nl: 'Perzik',
    sv: 'Persika',
    da: 'Fersken',
    no: 'Fersken',
    fi: 'Persikka'
  },
  'peanut butter.png': {
    en: 'Peanut Butter',
    de: 'Erdnussbutter',
    fr: 'Beurre de cacahuète',
    es: 'Crema de cacahuate',
    it: 'Burro di arachidi',
    pt: 'Pasta de amendoim',
    nl: 'Pindakaas',
    sv: 'Jordnötssmör',
    da: 'Jordnøddesmør',
    no: 'Peanøttsmør',
    fi: 'Maapähkinävoi'
  },
  'pear.png': {
    en: 'Pear',
    de: 'Birne',
    fr: 'Poire',
    es: 'Pera',
    it: 'Pera',
    pt: 'Pera',
    nl: 'Peer',
    sv: 'Päron',
    da: 'Pære',
    no: 'Pære',
    fi: 'Päärynä'
  },
  'peas.png': {
    en: 'Peas',
    de: 'Erbsen',
    fr: 'Petits pois',
    es: 'Chícharos',
    it: 'Piselli',
    pt: 'Ervilhas',
    nl: 'Erwten',
    sv: 'Ärtor',
    da: 'Ærter',
    no: 'Erter',
    fi: 'Herneet'
  },
  'pepper.png': {
    en: 'Pepper',
    de: 'Paprika',
    fr: 'Poivron',
    es: 'Pimiento',
    it: 'Peperone',
    pt: 'Pimentão',
    nl: 'Paprika',
    sv: 'Paprika',
    da: 'Peberfrugt',
    no: 'Paprika',
    fi: 'Paprika'
  },
  'pie.png': {
    en: 'Pie',
    de: 'Kuchen',
    fr: 'Tarte',
    es: 'Pay',
    it: 'Torta',
    pt: 'Torta',
    nl: 'Taart',
    sv: 'Paj',
    da: 'Tærte',
    no: 'Pai',
    fi: 'Piirakka'
  },
  'pineapple.png': {
    en: 'Pineapple',
    de: 'Ananas',
    fr: 'Ananas',
    es: 'Piña',
    it: 'Ananas',
    pt: 'Abacaxi',
    nl: 'Ananas',
    sv: 'Ananas',
    da: 'Ananas',
    no: 'Ananas',
    fi: 'Ananas'
  },
  'pizza.png': {
    en: 'Pizza',
    de: 'Pizza',
    fr: 'Pizza',
    es: 'Pizza',
    it: 'Pizza',
    pt: 'Pizza',
    nl: 'Pizza',
    sv: 'Pizza',
    da: 'Pizza',
    no: 'Pizza',
    fi: 'Pizza'
  },
  'plum.png': {
    en: 'Plum',
    de: 'Pflaume',
    fr: 'Prune',
    es: 'Ciruela',
    it: 'Prugna',
    pt: 'Ameixa',
    nl: 'Pruim',
    sv: 'Plommon',
    da: 'Blomme',
    no: 'Plomme',
    fi: 'Luumu'
  },
  'popcorn.png': {
    en: 'Popcorn',
    de: 'Popcorn',
    fr: 'Popcorn',
    es: 'Palomitas',
    it: 'Popcorn',
    pt: 'Pipoca',
    nl: 'Popcorn',
    sv: 'Popcorn',
    da: 'Popcorn',
    no: 'Popcorn',
    fi: 'Popcorn'
  },
  'potato chips.png': {
    en: 'Potato Chips',
    de: 'Kartoffelchips',
    fr: 'Chips',
    es: 'Papas fritas',
    it: 'Patatine',
    pt: 'Batatas chips',
    nl: 'Chips',
    sv: 'Chips',
    da: 'Chips',
    no: 'Potetgull',
    fi: 'Perunalastut'
  },
  'potato.png': {
    en: 'Potato',
    de: 'Kartoffel',
    fr: 'Pomme de terre',
    es: 'Papa',
    it: 'Patata',
    pt: 'Batata',
    nl: 'Aardappel',
    sv: 'Potatis',
    da: 'Kartoffel',
    no: 'Potet',
    fi: 'Peruna'
  },
  'pretzels.png': {
    en: 'Pretzels',
    de: 'Brezeln',
    fr: 'Bretzels',
    es: 'Pretzels',
    it: 'Pretzel',
    pt: 'Pretzels',
    nl: 'Pretzels',
    sv: 'Kringlor',
    da: 'Kringle',
    no: 'Kringle',
    fi: 'Rinkilät'
  },
  'price tag.png': {
    en: 'Price Tag',
    de: 'Preisschild',
    fr: 'Étiquette de prix',
    es: 'Etiqueta de precio',
    it: 'Cartellino del prezzo',
    pt: 'Etiqueta de preço',
    nl: 'Prijskaartje',
    sv: 'Prislapp',
    da: 'Prismærke',
    no: 'Prislapp',
    fi: 'Hintalappu'
  },
  'pumpkin.png': {
    en: 'Pumpkin',
    de: 'Kürbis',
    fr: 'Citrouille',
    es: 'Calabaza',
    it: 'Zucca',
    pt: 'Abóbora',
    nl: 'Pompoen',
    sv: 'Pumpa',
    da: 'Græskar',
    no: 'Gresskar',
    fi: 'Kurpitsa'
  },
  'raspberry.png': {
    en: 'Raspberry',
    de: 'Himbeere',
    fr: 'Framboise',
    es: 'Frambuesa',
    it: 'Lampone',
    pt: 'Framboesa',
    nl: 'Framboos',
    sv: 'Hallon',
    da: 'Hindbær',
    no: 'Bringebær',
    fi: 'Vadelma'
  },
  'rice.png': {
    en: 'Rice',
    de: 'Reis',
    fr: 'Riz',
    es: 'Arroz',
    it: 'Riso',
    pt: 'Arroz',
    nl: 'Rijst',
    sv: 'Ris',
    da: 'Ris',
    no: 'Ris',
    fi: 'Riisi'
  },
  'salt.png': {
    en: 'Salt',
    de: 'Salz',
    fr: 'Sel',
    es: 'Sal',
    it: 'Sale',
    pt: 'Sal',
    nl: 'Zout',
    sv: 'Salt',
    da: 'Salt',
    no: 'Salt',
    fi: 'Suola'
  },
  'sauce.png': {
    en: 'Sauce',
    de: 'Soße',
    fr: 'Sauce',
    es: 'Salsa',
    it: 'Salsa',
    pt: 'Molho',
    nl: 'Saus',
    sv: 'Sås',
    da: 'Sovs',
    no: 'Saus',
    fi: 'Kastike'
  },
  'sausage.png': {
    en: 'Sausage',
    de: 'Wurst',
    fr: 'Saucisse',
    es: 'Salchicha',
    it: 'Salsiccia',
    pt: 'Salsicha',
    nl: 'Worst',
    sv: 'Korv',
    da: 'Pølse',
    no: 'Pølse',
    fi: 'Makkara'
  },
  'shampoo.png': {
    en: 'Shampoo',
    de: 'Shampoo',
    fr: 'Shampooing',
    es: 'Champú',
    it: 'Shampoo',
    pt: 'Xampu',
    nl: 'Shampoo',
    sv: 'Schampo',
    da: 'Shampoo',
    no: 'Sjampo',
    fi: 'Shampoo'
  },
  'soda.png': {
    en: 'Soda',
    de: 'Limonade',
    fr: 'Soda',
    es: 'Refresco',
    it: 'Bibita',
    pt: 'Refrigerante',
    nl: 'Frisdrank',
    sv: 'Läsk',
    da: 'Sodavand',
    no: 'Brus',
    fi: 'Limonadi'
  },
  'strawberry.png': {
    en: 'Strawberry',
    de: 'Erdbeere',
    fr: 'Fraise',
    es: 'Fresa',
    it: 'Fragola',
    pt: 'Morango',
    nl: 'Aardbei',
    sv: 'Jordgubbe',
    da: 'Jordbær',
    no: 'Jordbær',
    fi: 'Mansikka'
  },
  'tomato.png': {
    en: 'Tomato',
    de: 'Tomate',
    fr: 'Tomate',
    es: 'Tomate',
    it: 'Pomodoro',
    pt: 'Tomate',
    nl: 'Tomaat',
    sv: 'Tomat',
    da: 'Tomat',
    no: 'Tomat',
    fi: 'Tomaatti'
  },
  'toothbrush.png': {
    en: 'Toothbrush',
    de: 'Zahnbürste',
    fr: 'Brosse à dents',
    es: 'Cepillo de dientes',
    it: 'Spazzolino da denti',
    pt: 'Escova de dentes',
    nl: 'Tandenborstel',
    sv: 'Tandborste',
    da: 'Tandbørste',
    no: 'Tannbørste',
    fi: 'Hammasharja'
  },
  'water.png': {
    en: 'Water',
    de: 'Wasser',
    fr: 'Eau',
    es: 'Agua',
    it: 'Acqua',
    pt: 'Água',
    nl: 'Water',
    sv: 'Vatten',
    da: 'Vand',
    no: 'Vann',
    fi: 'Vesi'
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
  const sourceFolderName = THEME_CONFIG.displayNames.en;

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
