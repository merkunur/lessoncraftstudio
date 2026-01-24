/**
 * Import Script: Around the House Images
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio && node scripts/import-around-the-house-images.js
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
  name: 'around_the_house',
  type: 'images',
  displayNames: {
    en: 'Around the House',
    de: 'Rund ums Haus',
    fr: 'Autour de la maison',
    es: 'Alrededor de la casa',
    it: 'In giro per casa',
    pt: 'Pela casa',
    nl: 'Rond het huis',
    sv: 'Runt huset',
    da: 'Rundt i huset',
    no: 'Rundt i huset',
    fi: 'Kodin ympärillä'
  }
};

// Image translations - KEY IS THE EXACT FILENAME
const IMAGE_TRANSLATIONS = {
  'alarm clock.png': {
    en: 'Alarm Clock',
    de: 'Wecker',
    fr: 'Reveil',
    es: 'Despertador',
    it: 'Sveglia',
    pt: 'Despertador',
    nl: 'Wekker',
    sv: 'Vackarklocka',
    da: 'Vaekker',
    no: 'Vekkerklokke',
    fi: 'Heratyskello'
  },
  'armchair.png': {
    en: 'Armchair',
    de: 'Sessel',
    fr: 'Fauteuil',
    es: 'Sillon',
    it: 'Poltrona',
    pt: 'Poltrona',
    nl: 'Fauteuil',
    sv: 'Fatölj',
    da: 'Laenestol',
    no: 'Lenestol',
    fi: 'Nojatuoli'
  },
  'bathtub.png': {
    en: 'Bathtub',
    de: 'Badewanne',
    fr: 'Baignoire',
    es: 'Banera',
    it: 'Vasca da bagno',
    pt: 'Banheira',
    nl: 'Badkuip',
    sv: 'Badkar',
    da: 'Badekar',
    no: 'Badekar',
    fi: 'Kylpyamme'
  },
  'bed.png': {
    en: 'Bed',
    de: 'Bett',
    fr: 'Lit',
    es: 'Cama',
    it: 'Letto',
    pt: 'Cama',
    nl: 'Bed',
    sv: 'Sang',
    da: 'Seng',
    no: 'Seng',
    fi: 'Sanky'
  },
  'blender.png': {
    en: 'Blender',
    de: 'Mixer',
    fr: 'Mixeur',
    es: 'Licuadora',
    it: 'Frullatore',
    pt: 'Liquidificador',
    nl: 'Blender',
    sv: 'Mixer',
    da: 'Blender',
    no: 'Blender',
    fi: 'Tehosekoitin'
  },
  'bookshelf.png': {
    en: 'Bookshelf',
    de: 'Bucherregal',
    fr: 'Etagere',
    es: 'Estante',
    it: 'Libreria',
    pt: 'Estante',
    nl: 'Boekenkast',
    sv: 'Bokhylla',
    da: 'Bogreol',
    no: 'Bokhylle',
    fi: 'Kirjahylly'
  },
  'bowl.png': {
    en: 'Bowl',
    de: 'Schussel',
    fr: 'Bol',
    es: 'Tazon',
    it: 'Ciotola',
    pt: 'Tigela',
    nl: 'Kom',
    sv: 'Skal',
    da: 'Skal',
    no: 'Bolle',
    fi: 'Kulho'
  },
  'broom.png': {
    en: 'Broom',
    de: 'Besen',
    fr: 'Balai',
    es: 'Escoba',
    it: 'Scopa',
    pt: 'Vassoura',
    nl: 'Bezem',
    sv: 'Kvast',
    da: 'Kost',
    no: 'Kost',
    fi: 'Luuta'
  },
  'brush.png': {
    en: 'Brush',
    de: 'Burste',
    fr: 'Brosse',
    es: 'Cepillo',
    it: 'Spazzola',
    pt: 'Escova',
    nl: 'Borstel',
    sv: 'Borste',
    da: 'Borste',
    no: 'Borste',
    fi: 'Harja'
  },
  'cabinet.png': {
    en: 'Cabinet',
    de: 'Schrank',
    fr: 'Armoire',
    es: 'Gabinete',
    it: 'Armadio',
    pt: 'Armario',
    nl: 'Kast',
    sv: 'Skap',
    da: 'Skab',
    no: 'Skap',
    fi: 'Kaappi'
  },
  'carpet.png': {
    en: 'Carpet',
    de: 'Teppich',
    fr: 'Tapis',
    es: 'Alfombra',
    it: 'Tappeto',
    pt: 'Tapete',
    nl: 'Tapijt',
    sv: 'Matta',
    da: 'Taeppe',
    no: 'Teppe',
    fi: 'Matto'
  },
  'chair.png': {
    en: 'Chair',
    de: 'Stuhl',
    fr: 'Chaise',
    es: 'Silla',
    it: 'Sedia',
    pt: 'Cadeira',
    nl: 'Stoel',
    sv: 'Stol',
    da: 'Stol',
    no: 'Stol',
    fi: 'Tuoli'
  },
  'clock.png': {
    en: 'Clock',
    de: 'Uhr',
    fr: 'Horloge',
    es: 'Reloj',
    it: 'Orologio',
    pt: 'Relogio',
    nl: 'Klok',
    sv: 'Klocka',
    da: 'Ur',
    no: 'Klokke',
    fi: 'Kello'
  },
  'closet.png': {
    en: 'Closet',
    de: 'Schrank',
    fr: 'Placard',
    es: 'Closet',
    it: 'Armadio',
    pt: 'Closet',
    nl: 'Kast',
    sv: 'Garderob',
    da: 'Skab',
    no: 'Skap',
    fi: 'Vaatekaappi'
  },
  'coffee table.png': {
    en: 'Coffee Table',
    de: 'Couchtisch',
    fr: 'Table basse',
    es: 'Mesa de centro',
    it: 'Tavolino',
    pt: 'Mesa de centro',
    nl: 'Salontafel',
    sv: 'Soffbord',
    da: 'Sofabord',
    no: 'Salongbord',
    fi: 'Sohvapoyta'
  },
  'comb.png': {
    en: 'Comb',
    de: 'Kamm',
    fr: 'Peigne',
    es: 'Peine',
    it: 'Pettine',
    pt: 'Pente',
    nl: 'Kam',
    sv: 'Kam',
    da: 'Kam',
    no: 'Kam',
    fi: 'Kampa'
  },
  'computer.png': {
    en: 'Computer',
    de: 'Computer',
    fr: 'Ordinateur',
    es: 'Computadora',
    it: 'Computer',
    pt: 'Computador',
    nl: 'Computer',
    sv: 'Dator',
    da: 'Computer',
    no: 'Datamaskin',
    fi: 'Tietokone'
  },
  'couch.png': {
    en: 'Couch',
    de: 'Couch',
    fr: 'Canape',
    es: 'Sofa',
    it: 'Divano',
    pt: 'Sofa',
    nl: 'Bank',
    sv: 'Soffa',
    da: 'Sofa',
    no: 'Sofa',
    fi: 'Sohva'
  },
  'cup.png': {
    en: 'Cup',
    de: 'Tasse',
    fr: 'Tasse',
    es: 'Taza',
    it: 'Tazza',
    pt: 'Xicara',
    nl: 'Kopje',
    sv: 'Kopp',
    da: 'Kop',
    no: 'Kopp',
    fi: 'Kuppi'
  },
  'curtains.png': {
    en: 'Curtains',
    de: 'Vorhange',
    fr: 'Rideaux',
    es: 'Cortinas',
    it: 'Tende',
    pt: 'Cortinas',
    nl: 'Gordijnen',
    sv: 'Gardiner',
    da: 'Gardiner',
    no: 'Gardiner',
    fi: 'Verhot'
  },
  'cushion.png': {
    en: 'Cushion',
    de: 'Kissen',
    fr: 'Coussin',
    es: 'Cojin',
    it: 'Cuscino',
    pt: 'Almofada',
    nl: 'Kussen',
    sv: 'Kudde',
    da: 'Pude',
    no: 'Pute',
    fi: 'Tyyny'
  },
  'desk.png': {
    en: 'Desk',
    de: 'Schreibtisch',
    fr: 'Bureau',
    es: 'Escritorio',
    it: 'Scrivania',
    pt: 'Escrivaninha',
    nl: 'Bureau',
    sv: 'Skrivbord',
    da: 'Skrivebord',
    no: 'Skrivebord',
    fi: 'Tyopoyta'
  },
  'dishwasher.png': {
    en: 'Dishwasher',
    de: 'Geschirrspuler',
    fr: 'Lave-vaisselle',
    es: 'Lavavajillas',
    it: 'Lavastoviglie',
    pt: 'Lava-loucas',
    nl: 'Vaatwasser',
    sv: 'Diskmaskin',
    da: 'Opvaskemaskine',
    no: 'Oppvaskmaskin',
    fi: 'Astianpesukone'
  },
  'door.png': {
    en: 'Door',
    de: 'Tur',
    fr: 'Porte',
    es: 'Puerta',
    it: 'Porta',
    pt: 'Porta',
    nl: 'Deur',
    sv: 'Dorr',
    da: 'Dor',
    no: 'Dor',
    fi: 'Ovi'
  },
  'dresser.png': {
    en: 'Dresser',
    de: 'Kommode',
    fr: 'Commode',
    es: 'Comoda',
    it: 'Cassettiera',
    pt: 'Comoda',
    nl: 'Ladekast',
    sv: 'Byra',
    da: 'Kommode',
    no: 'Kommode',
    fi: 'Lipasto'
  },
  'dryer.png': {
    en: 'Dryer',
    de: 'Trockner',
    fr: 'Seche-linge',
    es: 'Secadora',
    it: 'Asciugatrice',
    pt: 'Secadora',
    nl: 'Droger',
    sv: 'Torktumlare',
    da: 'Torretumbler',
    no: 'Torketrommel',
    fi: 'Kuivausrumpu'
  },
  'dustpan.png': {
    en: 'Dustpan',
    de: 'Kehrschaufel',
    fr: 'Pelle a poussiere',
    es: 'Recogedor',
    it: 'Paletta',
    pt: 'Pa de lixo',
    nl: 'Blik',
    sv: 'Sopskyffel',
    da: 'Fejebakke',
    no: 'Feiebrett',
    fi: 'Rikkalapio'
  },
  'fan.png': {
    en: 'Fan',
    de: 'Ventilator',
    fr: 'Ventilateur',
    es: 'Ventilador',
    it: 'Ventilatore',
    pt: 'Ventilador',
    nl: 'Ventilator',
    sv: 'Flakt',
    da: 'Ventilator',
    no: 'Vifte',
    fi: 'Tuuletin'
  },
  'faucet.png': {
    en: 'Faucet',
    de: 'Wasserhahn',
    fr: 'Robinet',
    es: 'Grifo',
    it: 'Rubinetto',
    pt: 'Torneira',
    nl: 'Kraan',
    sv: 'Kran',
    da: 'Vandhane',
    no: 'Kran',
    fi: 'Hana'
  },
  'fence.png': {
    en: 'Fence',
    de: 'Zaun',
    fr: 'Cloture',
    es: 'Cerca',
    it: 'Recinto',
    pt: 'Cerca',
    nl: 'Hek',
    sv: 'Staket',
    da: 'Hegn',
    no: 'Gjerde',
    fi: 'Aita'
  },
  'fireplace.png': {
    en: 'Fireplace',
    de: 'Kamin',
    fr: 'Cheminee',
    es: 'Chimenea',
    it: 'Camino',
    pt: 'Lareira',
    nl: 'Open haard',
    sv: 'Spis',
    da: 'Pejs',
    no: 'Peis',
    fi: 'Takka'
  },
  'floor lamp.png': {
    en: 'Floor Lamp',
    de: 'Stehlampe',
    fr: 'Lampadaire',
    es: 'Lampara de pie',
    it: 'Lampada da terra',
    pt: 'Luminaria de piso',
    nl: 'Staande lamp',
    sv: 'Golvlampa',
    da: 'Standerlampe',
    no: 'Gulvlampe',
    fi: 'Jalkalamppu'
  },
  'fork.png': {
    en: 'Fork',
    de: 'Gabel',
    fr: 'Fourchette',
    es: 'Tenedor',
    it: 'Forchetta',
    pt: 'Garfo',
    nl: 'Vork',
    sv: 'Gaffel',
    da: 'Gaffel',
    no: 'Gaffel',
    fi: 'Haarukka'
  },
  'fridge.png': {
    en: 'Fridge',
    de: 'Kuhlschrank',
    fr: 'Refrigerateur',
    es: 'Refrigerador',
    it: 'Frigorifero',
    pt: 'Geladeira',
    nl: 'Koelkast',
    sv: 'Kylskap',
    da: 'Koleskab',
    no: 'Kjoleskap',
    fi: 'Jaakaappi'
  },
  'garage.png': {
    en: 'Garage',
    de: 'Garage',
    fr: 'Garage',
    es: 'Garage',
    it: 'Garage',
    pt: 'Garagem',
    nl: 'Garage',
    sv: 'Garage',
    da: 'Garage',
    no: 'Garasje',
    fi: 'Autotalli'
  },
  'gate.png': {
    en: 'Gate',
    de: 'Tor',
    fr: 'Portail',
    es: 'Porton',
    it: 'Cancello',
    pt: 'Portao',
    nl: 'Poort',
    sv: 'Grind',
    da: 'Port',
    no: 'Port',
    fi: 'Portti'
  },
  'glass.png': {
    en: 'Glass',
    de: 'Glas',
    fr: 'Verre',
    es: 'Vaso',
    it: 'Bicchiere',
    pt: 'Copo',
    nl: 'Glas',
    sv: 'Glas',
    da: 'Glas',
    no: 'Glass',
    fi: 'Lasi'
  },
  'grill.png': {
    en: 'Grill',
    de: 'Grill',
    fr: 'Barbecue',
    es: 'Parrilla',
    it: 'Griglia',
    pt: 'Churrasqueira',
    nl: 'Grill',
    sv: 'Grill',
    da: 'Grill',
    no: 'Grill',
    fi: 'Grilli'
  },
  'hammer.png': {
    en: 'Hammer',
    de: 'Hammer',
    fr: 'Marteau',
    es: 'Martillo',
    it: 'Martello',
    pt: 'Martelo',
    nl: 'Hamer',
    sv: 'Hammare',
    da: 'Hammer',
    no: 'Hammer',
    fi: 'Vasara'
  },
  'heater.png': {
    en: 'Heater',
    de: 'Heizung',
    fr: 'Radiateur',
    es: 'Calentador',
    it: 'Riscaldatore',
    pt: 'Aquecedor',
    nl: 'Verwarming',
    sv: 'Varmare',
    da: 'Varmer',
    no: 'Varmeovn',
    fi: 'Lammitin'
  },
  'hose.png': {
    en: 'Hose',
    de: 'Schlauch',
    fr: 'Tuyau',
    es: 'Manguera',
    it: 'Tubo',
    pt: 'Mangueira',
    nl: 'Slang',
    sv: 'Slang',
    da: 'Slange',
    no: 'Slange',
    fi: 'Letku'
  },
  'iron.png': {
    en: 'Iron',
    de: 'Bugeleisen',
    fr: 'Fer a repasser',
    es: 'Plancha',
    it: 'Ferro da stiro',
    pt: 'Ferro de passar',
    nl: 'Strijkijzer',
    sv: 'Strykjarn',
    da: 'Strygejern',
    no: 'Strykejern',
    fi: 'Silitysrauta'
  },
  'ironing board.png': {
    en: 'Ironing Board',
    de: 'Bugelbrett',
    fr: 'Planche a repasser',
    es: 'Tabla de planchar',
    it: 'Asse da stiro',
    pt: 'Tabua de passar',
    nl: 'Strijkplank',
    sv: 'Strykbrada',
    da: 'Strygbraet',
    no: 'Strykebrett',
    fi: 'Silityslauta'
  },
  'kettle.png': {
    en: 'Kettle',
    de: 'Wasserkocher',
    fr: 'Bouilloire',
    es: 'Tetera',
    it: 'Bollitore',
    pt: 'Chaleira',
    nl: 'Waterkoker',
    sv: 'Vattenkokare',
    da: 'Elkedel',
    no: 'Vannkoker',
    fi: 'Vedenkeitin'
  },
  'key.png': {
    en: 'Key',
    de: 'Schlussel',
    fr: 'Cle',
    es: 'Llave',
    it: 'Chiave',
    pt: 'Chave',
    nl: 'Sleutel',
    sv: 'Nyckel',
    da: 'Nogle',
    no: 'Nokkel',
    fi: 'Avain'
  },
  'kitchen.png': {
    en: 'Kitchen',
    de: 'Kuche',
    fr: 'Cuisine',
    es: 'Cocina',
    it: 'Cucina',
    pt: 'Cozinha',
    nl: 'Keuken',
    sv: 'Kok',
    da: 'Kokken',
    no: 'Kjokken',
    fi: 'Keittio'
  },
  'knife.png': {
    en: 'Knife',
    de: 'Messer',
    fr: 'Couteau',
    es: 'Cuchillo',
    it: 'Coltello',
    pt: 'Faca',
    nl: 'Mes',
    sv: 'Kniv',
    da: 'Kniv',
    no: 'Kniv',
    fi: 'Veitsi'
  },
  'lamp.png': {
    en: 'Lamp',
    de: 'Lampe',
    fr: 'Lampe',
    es: 'Lampara',
    it: 'Lampada',
    pt: 'Lampada',
    nl: 'Lamp',
    sv: 'Lampa',
    da: 'Lampe',
    no: 'Lampe',
    fi: 'Lamppu'
  },
  'laundry basket.png': {
    en: 'Laundry Basket',
    de: 'Waschekorb',
    fr: 'Panier a linge',
    es: 'Canasta de ropa',
    it: 'Cesto biancheria',
    pt: 'Cesto de roupa',
    nl: 'Wasmand',
    sv: 'Tvättkorg',
    da: 'Vasketojskurv',
    no: 'Skittentoyskurv',
    fi: 'Pyykkikori'
  },
  'lawn mower.png': {
    en: 'Lawn Mower',
    de: 'Rasenmaher',
    fr: 'Tondeuse',
    es: 'Cortadora de cesped',
    it: 'Tosaerba',
    pt: 'Cortador de grama',
    nl: 'Grasmaaier',
    sv: 'Grasklippare',
    da: 'Plaeneklipper',
    no: 'Gressklipper',
    fi: 'Ruohonleikkuri'
  },
  'light switch.png': {
    en: 'Light Switch',
    de: 'Lichtschalter',
    fr: 'Interrupteur',
    es: 'Interruptor',
    it: 'Interruttore',
    pt: 'Interruptor',
    nl: 'Lichtschakelaar',
    sv: 'Strombrytare',
    da: 'Lyskontakt',
    no: 'Lysbryter',
    fi: 'Valokatkaisin'
  },
  'lock.png': {
    en: 'Lock',
    de: 'Schloss',
    fr: 'Serrure',
    es: 'Candado',
    it: 'Lucchetto',
    pt: 'Cadeado',
    nl: 'Slot',
    sv: 'Las',
    da: 'Las',
    no: 'Las',
    fi: 'Lukko'
  },
  'mailbox.png': {
    en: 'Mailbox',
    de: 'Briefkasten',
    fr: 'Boite aux lettres',
    es: 'Buzon',
    it: 'Cassetta postale',
    pt: 'Caixa de correio',
    nl: 'Brievenbus',
    sv: 'Brevlada',
    da: 'Postkasse',
    no: 'Postkasse',
    fi: 'Postilaatikko'
  },
  'microwave.png': {
    en: 'Microwave',
    de: 'Mikrowelle',
    fr: 'Micro-ondes',
    es: 'Microondas',
    it: 'Microonde',
    pt: 'Micro-ondas',
    nl: 'Magnetron',
    sv: 'Mikrovag',
    da: 'Mikrobolgeovn',
    no: 'Mikrobolgeovn',
    fi: 'Mikroaaltouuni'
  },
  'mirror.png': {
    en: 'Mirror',
    de: 'Spiegel',
    fr: 'Miroir',
    es: 'Espejo',
    it: 'Specchio',
    pt: 'Espelho',
    nl: 'Spiegel',
    sv: 'Spegel',
    da: 'Spejl',
    no: 'Speil',
    fi: 'Peili'
  },
  'mop.png': {
    en: 'Mop',
    de: 'Mopp',
    fr: 'Serpilliere',
    es: 'Trapeador',
    it: 'Mocio',
    pt: 'Esfregao',
    nl: 'Dweil',
    sv: 'Mopp',
    da: 'Moppe',
    no: 'Mopp',
    fi: 'Moppi'
  },
  'nightstand.png': {
    en: 'Nightstand',
    de: 'Nachttisch',
    fr: 'Table de nuit',
    es: 'Mesa de noche',
    it: 'Comodino',
    pt: 'Criado-mudo',
    nl: 'Nachtkastje',
    sv: 'Nattduksbord',
    da: 'Natbord',
    no: 'Nattbord',
    fi: 'Yopoyta'
  },
  'outlet.png': {
    en: 'Outlet',
    de: 'Steckdose',
    fr: 'Prise',
    es: 'Enchufe',
    it: 'Presa',
    pt: 'Tomada',
    nl: 'Stopcontact',
    sv: 'Eluttag',
    da: 'Stikkontakt',
    no: 'Stikkontakt',
    fi: 'Pistorasia'
  },
  'oven.png': {
    en: 'Oven',
    de: 'Ofen',
    fr: 'Four',
    es: 'Horno',
    it: 'Forno',
    pt: 'Forno',
    nl: 'Oven',
    sv: 'Ugn',
    da: 'Ovn',
    no: 'Ovn',
    fi: 'Uuni'
  },
  'pan.png': {
    en: 'Pan',
    de: 'Pfanne',
    fr: 'Poele',
    es: 'Sarten',
    it: 'Padella',
    pt: 'Frigideira',
    nl: 'Pan',
    sv: 'Stekpanna',
    da: 'Pande',
    no: 'Panne',
    fi: 'Pannu'
  },
  'pen.png': {
    en: 'Pen',
    de: 'Stift',
    fr: 'Stylo',
    es: 'Pluma',
    it: 'Penna',
    pt: 'Caneta',
    nl: 'Pen',
    sv: 'Penna',
    da: 'Pen',
    no: 'Penn',
    fi: 'Kyna'
  },
  'pencil.png': {
    en: 'Pencil',
    de: 'Bleistift',
    fr: 'Crayon',
    es: 'Lapiz',
    it: 'Matita',
    pt: 'Lapis',
    nl: 'Potlood',
    sv: 'Penna',
    da: 'Blyant',
    no: 'Blyant',
    fi: 'Lyijykyna'
  },
  'picture frame.png': {
    en: 'Picture Frame',
    de: 'Bilderrahmen',
    fr: 'Cadre photo',
    es: 'Marco de foto',
    it: 'Cornice',
    pt: 'Porta-retrato',
    nl: 'Fotolijst',
    sv: 'Fotoram',
    da: 'Billedramme',
    no: 'Bilderamme',
    fi: 'Valokuvakehys'
  },
  'pillow.png': {
    en: 'Pillow',
    de: 'Kissen',
    fr: 'Oreiller',
    es: 'Almohada',
    it: 'Cuscino',
    pt: 'Travesseiro',
    nl: 'Kussen',
    sv: 'Kudde',
    da: 'Pude',
    no: 'Pute',
    fi: 'Tyyny'
  },
  'plate.png': {
    en: 'Plate',
    de: 'Teller',
    fr: 'Assiette',
    es: 'Plato',
    it: 'Piatto',
    pt: 'Prato',
    nl: 'Bord',
    sv: 'Tallrik',
    da: 'Tallerken',
    no: 'Tallerken',
    fi: 'Lautanen'
  },
  'pot.png': {
    en: 'Pot',
    de: 'Topf',
    fr: 'Casserole',
    es: 'Olla',
    it: 'Pentola',
    pt: 'Panela',
    nl: 'Pot',
    sv: 'Gryta',
    da: 'Gryde',
    no: 'Gryte',
    fi: 'Kattila'
  },
  'rake.png': {
    en: 'Rake',
    de: 'Rechen',
    fr: 'Rateau',
    es: 'Rastrillo',
    it: 'Rastrello',
    pt: 'Ancinho',
    nl: 'Hark',
    sv: 'Krattar',
    da: 'Rive',
    no: 'Rake',
    fi: 'Harava'
  },
  'refrigerator.png': {
    en: 'Refrigerator',
    de: 'Kuhlschrank',
    fr: 'Refrigerateur',
    es: 'Refrigerador',
    it: 'Frigorifero',
    pt: 'Geladeira',
    nl: 'Koelkast',
    sv: 'Kylskap',
    da: 'Koleskab',
    no: 'Kjoleskap',
    fi: 'Jaakaappi'
  },
  'remote control.png': {
    en: 'Remote Control',
    de: 'Fernbedienung',
    fr: 'Telecommande',
    es: 'Control remoto',
    it: 'Telecomando',
    pt: 'Controle remoto',
    nl: 'Afstandsbediening',
    sv: 'Fjarrkontroll',
    da: 'Fjernbetjening',
    no: 'Fjernkontroll',
    fi: 'Kaukosaadin'
  },
  'rug.png': {
    en: 'Rug',
    de: 'Teppich',
    fr: 'Tapis',
    es: 'Alfombra',
    it: 'Tappeto',
    pt: 'Tapete',
    nl: 'Kleed',
    sv: 'Matta',
    da: 'Taeppe',
    no: 'Teppe',
    fi: 'Matto'
  },
  'scissors.png': {
    en: 'Scissors',
    de: 'Schere',
    fr: 'Ciseaux',
    es: 'Tijeras',
    it: 'Forbici',
    pt: 'Tesoura',
    nl: 'Schaar',
    sv: 'Sax',
    da: 'Saks',
    no: 'Saks',
    fi: 'Sakset'
  },
  'shampoo.png': {
    en: 'Shampoo',
    de: 'Shampoo',
    fr: 'Shampooing',
    es: 'Champu',
    it: 'Shampoo',
    pt: 'Xampu',
    nl: 'Shampoo',
    sv: 'Schampo',
    da: 'Shampoo',
    no: 'Sjampo',
    fi: 'Shampoo'
  },
  'shovel.png': {
    en: 'Shovel',
    de: 'Schaufel',
    fr: 'Pelle',
    es: 'Pala',
    it: 'Pala',
    pt: 'Pa',
    nl: 'Schop',
    sv: 'Spade',
    da: 'Skovl',
    no: 'Spade',
    fi: 'Lapio'
  },
  'sink.png': {
    en: 'Sink',
    de: 'Spule',
    fr: 'Evier',
    es: 'Fregadero',
    it: 'Lavandino',
    pt: 'Pia',
    nl: 'Gootsteen',
    sv: 'Diskbank',
    da: 'Vask',
    no: 'Vask',
    fi: 'Pesuallas'
  },
  'sofa.png': {
    en: 'Sofa',
    de: 'Sofa',
    fr: 'Sofa',
    es: 'Sofa',
    it: 'Sofa',
    pt: 'Sofa',
    nl: 'Sofa',
    sv: 'Soffa',
    da: 'Sofa',
    no: 'Sofa',
    fi: 'Sohva'
  },
  'spoon.png': {
    en: 'Spoon',
    de: 'Loffel',
    fr: 'Cuillere',
    es: 'Cuchara',
    it: 'Cucchiaio',
    pt: 'Colher',
    nl: 'Lepel',
    sv: 'Sked',
    da: 'Ske',
    no: 'Skje',
    fi: 'Lusikka'
  },
  'stairs.png': {
    en: 'Stairs',
    de: 'Treppe',
    fr: 'Escalier',
    es: 'Escaleras',
    it: 'Scale',
    pt: 'Escadas',
    nl: 'Trap',
    sv: 'Trappa',
    da: 'Trappe',
    no: 'Trapp',
    fi: 'Portaat'
  },
  'stove.png': {
    en: 'Stove',
    de: 'Herd',
    fr: 'Cuisiniere',
    es: 'Estufa',
    it: 'Fornello',
    pt: 'Fogao',
    nl: 'Fornuis',
    sv: 'Spis',
    da: 'Komfur',
    no: 'Komfyr',
    fi: 'Liesi'
  },
  'table.png': {
    en: 'Table',
    de: 'Tisch',
    fr: 'Table',
    es: 'Mesa',
    it: 'Tavolo',
    pt: 'Mesa',
    nl: 'Tafel',
    sv: 'Bord',
    da: 'Bord',
    no: 'Bord',
    fi: 'Poyta'
  },
  'telephone.png': {
    en: 'Telephone',
    de: 'Telefon',
    fr: 'Telephone',
    es: 'Telefono',
    it: 'Telefono',
    pt: 'Telefone',
    nl: 'Telefoon',
    sv: 'Telefon',
    da: 'Telefon',
    no: 'Telefon',
    fi: 'Puhelin'
  },
  'television.png': {
    en: 'Television',
    de: 'Fernseher',
    fr: 'Television',
    es: 'Television',
    it: 'Televisore',
    pt: 'Televisao',
    nl: 'Televisie',
    sv: 'TV',
    da: 'Fjernsyn',
    no: 'TV',
    fi: 'Televisio'
  },
  'toaster.png': {
    en: 'Toaster',
    de: 'Toaster',
    fr: 'Grille-pain',
    es: 'Tostadora',
    it: 'Tostapane',
    pt: 'Torradeira',
    nl: 'Broodrooster',
    sv: 'Brödrost',
    da: 'Brødrister',
    no: 'Brodrister',
    fi: 'Leivänpaahdin'
  },
  'toilet paper.png': {
    en: 'Toilet Paper',
    de: 'Toilettenpapier',
    fr: 'Papier toilette',
    es: 'Papel higienico',
    it: 'Carta igienica',
    pt: 'Papel higienico',
    nl: 'Toiletpapier',
    sv: 'Toalettpapper',
    da: 'Toiletpapir',
    no: 'Toalettpapir',
    fi: 'Wc-paperi'
  },
  'toilet.png': {
    en: 'Toilet',
    de: 'Toilette',
    fr: 'Toilettes',
    es: 'Inodoro',
    it: 'Gabinetto',
    pt: 'Vaso sanitario',
    nl: 'Toilet',
    sv: 'Toalett',
    da: 'Toilet',
    no: 'Toalett',
    fi: 'Wc'
  },
  'toolbox.png': {
    en: 'Toolbox',
    de: 'Werkzeugkasten',
    fr: 'Boite a outils',
    es: 'Caja de herramientas',
    it: 'Cassetta attrezzi',
    pt: 'Caixa de ferramentas',
    nl: 'Gereedschapskist',
    sv: 'Verktygslada',
    da: 'Vaerktojskasse',
    no: 'Verktoyskasse',
    fi: 'Tyokalulaatikko'
  },
  'toothbrush.png': {
    en: 'Toothbrush',
    de: 'Zahnburste',
    fr: 'Brosse a dents',
    es: 'Cepillo de dientes',
    it: 'Spazzolino',
    pt: 'Escova de dentes',
    nl: 'Tandenborstel',
    sv: 'Tandborste',
    da: 'Tandborste',
    no: 'Tannborste',
    fi: 'Hammasharja'
  },
  'toothpaste.png': {
    en: 'Toothpaste',
    de: 'Zahnpasta',
    fr: 'Dentifrice',
    es: 'Pasta de dientes',
    it: 'Dentifricio',
    pt: 'Pasta de dente',
    nl: 'Tandpasta',
    sv: 'Tandkram',
    da: 'Tandpasta',
    no: 'Tannkrem',
    fi: 'Hammastahna'
  },
  'trash can.png': {
    en: 'Trash Can',
    de: 'Mulleimer',
    fr: 'Poubelle',
    es: 'Bote de basura',
    it: 'Cestino',
    pt: 'Lixeira',
    nl: 'Prullenbak',
    sv: 'Soptunna',
    da: 'Skraldespand',
    no: 'Soppelbotte',
    fi: 'Roskakori'
  },
  'vacuum cleaner.png': {
    en: 'Vacuum Cleaner',
    de: 'Staubsauger',
    fr: 'Aspirateur',
    es: 'Aspiradora',
    it: 'Aspirapolvere',
    pt: 'Aspirador',
    nl: 'Stofzuiger',
    sv: 'Dammsugare',
    da: 'Stovsuger',
    no: 'Stovsuger',
    fi: 'Polynimuri'
  },
  'vase.png': {
    en: 'Vase',
    de: 'Vase',
    fr: 'Vase',
    es: 'Florero',
    it: 'Vaso',
    pt: 'Vaso',
    nl: 'Vaas',
    sv: 'Vas',
    da: 'Vase',
    no: 'Vase',
    fi: 'Maljakko'
  },
  'wardrobe.png': {
    en: 'Wardrobe',
    de: 'Kleiderschrank',
    fr: 'Armoire',
    es: 'Ropero',
    it: 'Guardaroba',
    pt: 'Guarda-roupa',
    nl: 'Kledingkast',
    sv: 'Garderob',
    da: 'Garderobe',
    no: 'Garderobe',
    fi: 'Vaatekaappi'
  },
  'washing machine.png': {
    en: 'Washing Machine',
    de: 'Waschmaschine',
    fr: 'Machine a laver',
    es: 'Lavadora',
    it: 'Lavatrice',
    pt: 'Maquina de lavar',
    nl: 'Wasmachine',
    sv: 'Tvattmaskin',
    da: 'Vaskemaskine',
    no: 'Vaskemaskin',
    fi: 'Pesukone'
  },
  'watering can.png': {
    en: 'Watering Can',
    de: 'Giesskanne',
    fr: 'Arrosoir',
    es: 'Regadera',
    it: 'Innaffiatoio',
    pt: 'Regador',
    nl: 'Gieter',
    sv: 'Vattenkanna',
    da: 'Vandkande',
    no: 'Vannkanne',
    fi: 'Kastelukannu'
  },
  'window.png': {
    en: 'Window',
    de: 'Fenster',
    fr: 'Fenetre',
    es: 'Ventana',
    it: 'Finestra',
    pt: 'Janela',
    nl: 'Raam',
    sv: 'Fonster',
    da: 'Vindue',
    no: 'Vindu',
    fi: 'Ikkuna'
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
  const sourceFolderName = 'around the house';

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
