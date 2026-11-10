/**
 * data/fl/names.js — what the new drawings are called in the 11 languages (docs/makers/FLAGSHIP.md). en = American English,
 * pt = Brazilian, es = Mexican. ALIAS: a drawing the image vocabulary already names (its reviewed word is used); NAMES: the
 * rest, written for these drawings and read by the native reviewer. LIB: library drawings whose file name has no word.
 * Order of a row: en de fr es pt it nl sv da no fi.
 */
'use strict';
const ALIAS = {
  flower_friend: 'flower', leaf_friend: 'leaf', mushroom_friend: 'mushroom', tulip_friend: 'tulip', sunflower: 'flower', robot_friend: 'robot', round_robot: 'robot', tall_robot: 'robot', toy_robot: 'robot', robot_dog: 'robot',
  star_friend: 'star', sun_friend: 'sun', moon_friend: 'moon', door_friend: 'door', cushion_friend: 'pillow', teacher_apple: 'apple', farm_cat: 'cat', sheep_dog: 'dog', baby_chick: 'chick', burger: 'hamburger',
  kitten: 'cat', puppy: 'dog', hippo: 'hippopotamus', husky: 'dog', cherries: 'cherry', sea_shell: 'seashell', rain_drop: 'droplet', kite_friend: 'kite', easter_bunny: 'rabbit',
  valentine_heart: 'heart', calculator_friend: 'calculator', toothbrush_friend: 'toothbrush', rain_cloud: 'cloud', autumn_leaf: 'leaf',
  rubber_duck: 'duck', toy_train: 'train', steam_train_car: 'train', rocket_car: 'car', bath_tub: 'bathtub', tugboat: 'boat', river_rock_frog: 'frog', snowy_owl: 'owl', arctic_fox: 'fox',
};
const row = (s) => { const k = s.split('|').map((x) => x.trim()); return Object.fromEntries(['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].map((l, i) => [l, k[i]])); };
const NAMES = Object.fromEntries(Object.entries({
  moth: 'Moth|Nachtfalter|Papillon de nuit|Polilla|Mariposa|Falena|Nachtvlinder|Nattfjäril|Natsværmer|Nattsvermer|Yöperhonen',
  praying_mantis: 'Praying Mantis|Gottesanbeterin|Mante religieuse|Mantis|Louva-a-deus|Mantide|Bidsprinkhaan|Bönsyrsa|Knæler|Kneler|Rukoilijasirkka',
  bee_hive: 'Beehive|Bienenstock|Ruche|Colmena|Colmeia|Alveare|Bijenkorf|Bikupa|Bistade|Bikube|Mehiläispesä',
  garden_gnome: 'Garden Gnome|Gartenzwerg|Nain de jardin|Gnomo de jardín|Gnomo de jardim|Nano da giardino|Tuinkabouter|Trädgårdstomte|Havenisse|Hagenisse|Puutarhatonttu',
  baby_dinosaur: 'Baby Dinosaur|Dino-Baby|Bébé dinosaure|Dinosaurio bebé|Dinossauro bebê|Cucciolo di dinosauro|Babydinosaurus|Dinosaurieunge|Dinosaurunge|Dinosaurunge|Dinosauruksen poikanen',
  dinosaur_egg: 'Dinosaur Egg|Dinosaurier-Ei|Œuf de dinosaure|Huevo de dinosaurio|Ovo de dinossauro|Uovo di dinosauro|Dinosaurusei|Dinosaurieägg|Dinosauræg|Dinosauregg|Dinosauruksen muna',
  pterodactyl: 'Pterodactyl|Flugsaurier|Ptérodactyle|Pterodáctilo|Pterodáctilo|Pterodattilo|Pterodactylus|Flygödla|Flyveøgle|Flygeøgle|Lentolisko',
  spinosaurus: 'Spinosaurus|Spinosaurus|Spinosaure|Espinosaurio|Espinossauro|Spinosauro|Spinosaurus|Spinosaurus|Spinosaurus|Spinosaurus|Spinosaurus',
  plesiosaur: 'Plesiosaur|Plesiosaurier|Plésiosaure|Plesiosaurio|Plesiossauro|Plesiosauro|Plesiosaurus|Plesiosaurie|Plesiosaur|Plesiosaur|Plesiosaurus',
  dinosaur_footprint: 'Dinosaur Footprint|Dinosaurier-Fußspur|Empreinte de dinosaure|Huella de dinosaurio|Pegada de dinossauro|Impronta di dinosauro|Dinosaurusvoetafdruk|Dinosaurieavtryck|Dinosaurfodspor|Dinosaurfotspor|Dinosauruksen jalanjälki',
  volcano: 'Volcano|Vulkan|Volcan|Volcán|Vulcão|Vulcano|Vulkaan|Vulkan|Vulkan|Vulkan|Tulivuori',
  fossil: 'Fossil|Fossil|Fossile|Fósil|Fóssil|Fossile|Fossiel|Fossil|Fossil|Fossil|Fossiili',
  mammoth: 'Mammoth|Mammut|Mammouth|Mamut|Mamute|Mammut|Mammoet|Mammut|Mammut|Mammut|Mammutti',
  fern: 'Fern|Farn|Fougère|Helecho|Samambaia|Felce|Varen|Ormbunke|Bregne|Bregne|Saniainen',
  dino_friends: 'Dinosaur Friends|Dino-Freunde|Amis dinosaures|Dinosaurios amigos|Dinossauros amigos|Dinosauri amici|Dinovrienden|Dinosauriekompisar|Dinosaurvenner|Dinosaurvenner|Dinosaurusystävät',
  dino_in_a_hat: 'Party Dinosaur|Party-Dino|Dinosaure de fête|Dinosaurio de fiesta|Dinossauro de festa|Dinosauro in festa|Feestdinosaurus|Festdinosaurie|Festdinosaur|Festdinosaur|Juhladinosaurus',
  castle: 'Castle|Schloss|Château|Castillo|Castelo|Castello|Kasteel|Slott|Slot|Slott|Linna',
  princess: 'Princess|Prinzessin|Princesse|Princesa|Princesa|Principessa|Prinses|Prinsessa|Prinsesse|Prinsesse|Prinsessa',
  prince: 'Prince|Prinz|Prince|Príncipe|Príncipe|Principe|Prins|Prins|Prins|Prins|Prinssi',
  knight: 'Knight|Ritter|Chevalier|Caballero|Cavaleiro|Cavaliere|Ridder|Riddare|Ridder|Ridder|Ritari',
  wizard: 'Wizard|Zauberer|Magicien|Mago|Mago|Mago|Tovenaar|Trollkarl|Troldmand|Trollmann|Velho',
  fairy: 'Fairy|Fee|Fée|Hada|Fada|Fata|Fee|Fe|Fe|Fe|Keiju',
  magic_wand: 'Magic Wand|Zauberstab|Baguette magique|Varita mágica|Varinha mágica|Bacchetta magica|Toverstaf|Trollspö|Tryllestav|Tryllestav|Taikasauva',
  frog_prince: 'Frog Prince|Froschkönig|Prince grenouille|Príncipe rana|Príncipe sapo|Principe ranocchio|Kikkerprins|Grodprins|Frøprins|Froskeprins|Sammakkoprinssi',
  pumpkin_carriage: 'Pumpkin Coach|Kürbiskutsche|Carrosse citrouille|Carroza de calabaza|Carruagem de abóbora|Carrozza di zucca|Pompoenkoets|Pumpavagn|Græskarkaret|Gresskarvogn|Kurpitsavaunut',
  glass_slipper: 'Glass Slipper|Gläserner Schuh|Pantoufle de verre|Zapatilla de cristal|Sapatinho de cristal|Scarpetta di cristallo|Glazen muiltje|Glassko|Glassko|Glassko|Lasikenkä',
  magic_lamp: 'Magic Lamp|Wunderlampe|Lampe magique|Lámpara mágica|Lâmpada mágica|Lampada magica|Wonderlamp|Trollampa|Tryllelampe|Tryllelampe|Taikalamppu',
  flying_carpet: 'Flying Carpet|Fliegender Teppich|Tapis volant|Alfombra voladora|Tapete voador|Tappeto volante|Vliegend tapijt|Flygande matta|Flyvende tæppe|Flygende teppe|Lentävä matto',
  treasure_key: 'Old Key|Alter Schlüssel|Vieille clé|Llave antigua|Chave antiga|Chiave antica|Oude sleutel|Gammal nyckel|Gammel nøgle|Gammel nøkkel|Vanha avain',
  magic_mirror: 'Magic Mirror|Zauberspiegel|Miroir magique|Espejo mágico|Espelho mágico|Specchio magico|Toverspiegel|Trollspegel|Tryllespejl|Tryllespeil|Taikapeili',
  cottage_in_the_woods: 'Cottage|Häuschen|Chaumière|Cabaña|Casinha|Casetta|Huisje|Stuga|Hytte|Hytte|Mökki',
  mushroom_house: 'Mushroom House|Pilzhaus|Maison champignon|Casa de hongo|Casa de cogumelo|Casa fungo|Paddenstoelhuis|Svamphus|Svampehus|Sopphus|Sienitalo',
  tooth_fairy: 'Tooth Fairy|Zahnfee|Fée des dents|Hada de los dientes|Fada do dente|Fatina dei denti|Tandenfee|Tandfe|Tandfe|Tannfe|Hammaskeiju',
  storybook: 'Storybook|Märchenbuch|Livre de contes|Libro de cuentos|Livro de histórias|Libro di fiabe|Sprookjesboek|Sagobok|Eventyrbog|Eventyrbok|Satukirja',
  hay_bale: 'Hay Bale|Heuballen|Botte de foin|Paca de heno|Fardo de feno|Balla di fieno|Hooibaal|Höbal|Høballe|Høyballe|Heinäpaali',
  farm_fence: 'Fence|Zaun|Clôture|Cerca|Cerca|Staccionata|Hek|Staket|Hegn|Gjerde|Aita',
  milk_can: 'Milk Can|Milchkanne|Bidon de lait|Lechera|Latão de leite|Bidone del latte|Melkbus|Mjölkkanna|Mælkejunge|Melkespann|Maitotonkka',
  egg_basket: 'Egg Basket|Eierkorb|Panier d’œufs|Canasta de huevos|Cesta de ovos|Cesto di uova|Eiermand|Äggkorg|Æggekurv|Eggekurv|Munakori',
  pancakes: 'Pancakes|Pfannkuchen|Crêpes|Hotcakes|Panquecas|Pancake|Pannenkoeken|Pannkakor|Pandekager|Pannekaker|Letut',
  milk_carton: 'Milk Carton|Milchkarton|Brique de lait|Cartón de leche|Caixa de leite|Cartone del latte|Melkpak|Mjölkpaket|Mælkekarton|Melkekartong|Maitopurkki',
  sushi_roll: 'Sushi Roll|Sushi-Rolle|Rouleau de sushi|Rollo de sushi|Sushi|Rotolo di sushi|Sushirol|Sushirulle|Sushirulle|Sushirull|Sushirulla',
  soup_bowl: 'Bowl of Soup|Suppenschüssel|Bol de soupe|Plato de sopa|Tigela de sopa|Ciotola di zuppa|Kom soep|Soppskål|Suppeskål|Suppebolle|Keittokulho',
  birthday_cake: 'Birthday Cake|Geburtstagstorte|Gâteau d’anniversaire|Pastel de cumpleaños|Bolo de aniversário|Torta di compleanno|Verjaardagstaart|Födelsedagstårta|Fødselsdagskage|Bursdagskake|Syntymäpäiväkakku',
  honey_pot: 'Honey Pot|Honigtopf|Pot de miel|Tarro de miel|Pote de mel|Vasetto di miele|Honingpot|Honungsburk|Honningkrukke|Honningkrukke|Hunajapurkki',
  skunk: 'Skunk|Stinktier|Mouffette|Zorrillo|Gambá|Puzzola|Stinkdier|Skunk|Stinkdyr|Stinkdyr|Haisunäätä',
  mole: 'Mole|Maulwurf|Taupe|Topo|Toupeira|Talpa|Mol|Mullvad|Muldvarp|Muldvarp|Maamyyrä',
  tree_stump: 'Tree Stump|Baumstumpf|Souche|Tocón|Toco de árvore|Ceppo|Boomstronk|Stubbe|Træstub|Trestubbe|Kanto',
  bird_nest: 'Bird’s Nest|Vogelnest|Nid|Nido|Ninho|Nido|Vogelnest|Fågelbo|Fuglerede|Fuglereir|Linnunpesä',
  camping_tent: 'Tent|Zelt|Tente|Casa de campaña|Barraca|Tenda|Tent|Tält|Telt|Telt|Teltta',
  wood_log: 'Log|Baumstamm|Bûche|Tronco|Tronco|Tronco|Boomstam|Stock|Træstamme|Tømmerstokk|Tukki',
  crescent: 'Crescent|Halbmond|Croissant de lune|Media luna|Meia-lua|Mezzaluna|Halve maan|Halvmåne|Halvmåne|Halvmåne|Puolikuu',
  spoon_and_fork: 'Fork and Spoon|Gabel und Löffel|Fourchette et cuillère|Tenedor y cuchara|Garfo e colher|Forchetta e cucchiaio|Vork en lepel|Gaffel och sked|Gaffel og ske|Gaffel og skje|Haarukka ja lusikka',
  flower_pot: 'Flowerpot|Blumentopf|Pot de fleurs|Maceta|Vaso de flores|Vaso di fiori|Bloempot|Blomkruka|Urtepotte|Blomsterpotte|Kukkaruukku',
  cozy_socks: 'Socks|Socken|Chaussettes|Calcetines|Meias|Calzini|Sokken|Strumpor|Sokker|Sokker|Sukat',
  toilet_paper_friend: 'Toilet Paper|Toilettenpapier|Papier toilette|Papel de baño|Papel higiênico|Carta igienica|Wc-papier|Toalettpapper|Toiletpapir|Toalettpapir|Vessapaperi',
  mermaid: 'Mermaid|Meerjungfrau|Sirène|Sirena|Sereia|Sirena|Zeemeermin|Sjöjungfru|Havfrue|Havfrue|Merenneito',
  treasure_chest: 'Treasure Chest|Schatztruhe|Coffre au trésor|Cofre del tesoro|Baú do tesouro|Forziere|Schatkist|Skattkista|Skattekiste|Skattekiste|Aarrearkku',
  sea_otter: 'Sea Otter|Seeotter|Loutre de mer|Nutria marina|Lontra-marinha|Lontra marina|Zeeotter|Havsutter|Havodder|Havoter|Merisaukko',
  life_ring: 'Life Ring|Rettungsring|Bouée de sauvetage|Salvavidas|Boia salva-vidas|Salvagente|Reddingsboei|Livboj|Redningskrans|Livbøye|Pelastusrengas',
  coral_reef: 'Coral Reef|Korallenriff|Récif de corail|Arrecife de coral|Recife de coral|Barriera corallina|Koraalrif|Korallrev|Koralrev|Korallrev|Koralliriutta',
  builder: 'Builder|Bauarbeiter|Maçon|Albañil|Pedreiro|Muratore|Bouwvakker|Byggarbetare|Bygningsarbejder|Bygningsarbeider|Rakentaja',
  dentist: 'Dentist|Zahnarzt|Dentiste|Dentista|Dentista|Dentista|Tandarts|Tandläkare|Tandlæge|Tannlege|Hammaslääkäri',
  painter: 'Painter|Maler|Peintre|Pintor|Pintor|Pittore|Schilder|Målare|Maler|Maler|Maalari',
  scientist: 'Scientist|Forscher|Scientifique|Científico|Cientista|Scienziato|Wetenschapper|Forskare|Forsker|Forsker|Tutkija',
  reading_child: 'Reading|Lesen|Lecture|Lectura|Leitura|Lettura|Lezen|Läsning|Læsning|Lesing|Lukeminen',
  boy_waving: 'Boy|Junge|Garçon|Niño|Menino|Bambino|Jongen|Pojke|Dreng|Gutt|Poika',
  girl_jumping: 'Girl|Mädchen|Fille|Niña|Menina|Bambina|Meisje|Flicka|Pige|Jente|Tyttö',
  child_with_balloon: 'Child with a Balloon|Kind mit Ballon|Enfant au ballon|Niño con globo|Criança com balão|Bambino con palloncino|Kind met ballon|Barn med ballong|Barn med ballon|Barn med ballong|Lapsi ja ilmapallo',
  child_with_kite: 'Child with a Kite|Kind mit Drachen|Enfant au cerf-volant|Niño con papalote|Criança com pipa|Bambino con aquilone|Kind met vlieger|Barn med drake|Barn med drage|Barn med drage|Lapsi ja leija',
  child_painting: 'Child Painting|Malendes Kind|Enfant qui peint|Niño pintando|Criança pintando|Bambino che dipinge|Schilderend kind|Barn som målar|Barn der maler|Barn som maler|Maalaava lapsi',
  friends_holding_hands: 'Friends|Freunde|Amis|Amigos|Amigos|Amici|Vrienden|Vänner|Venner|Venner|Ystävät',
  grandparents: 'Grandparents|Großeltern|Grands-parents|Abuelos|Avós|Nonni|Grootouders|Mor- och farföräldrar|Bedsteforældre|Besteforeldre|Isovanhemmat',
  fish_bowl: 'Fish Bowl|Goldfischglas|Bocal à poisson|Pecera|Aquário|Boccia per pesci|Vissenkom|Akvarium|Akvarium|Akvarium|Kalamalja',
  dog_house: 'Doghouse|Hundehütte|Niche|Casa de perro|Casinha de cachorro|Cuccia|Hondenhok|Hundkoja|Hundehus|Hundehus|Koirankoppi',
  pet_bowl: 'Pet Bowl|Futternapf|Gamelle|Plato para mascota|Tigela de ração|Ciotola|Voerbak|Matskål|Madskål|Matskål|Ruokakuppi',
  yarn_ball: 'Ball of Yarn|Wollknäuel|Pelote de laine|Bola de estambre|Novelo de lã|Gomitolo|Bol wol|Garnnystan|Garnnøgle|Garnnøste|Lankakerä',
  pet_collar: 'Collar|Halsband|Collier|Collar|Coleira|Collare|Halsband|Halsband|Halsbånd|Halsbånd|Kaulapanta',
  cat_and_mouse: 'Cat and Mouse|Katze und Maus|Chat et souris|Gato y ratón|Gato e rato|Gatto e topo|Kat en muis|Katt och mus|Kat og mus|Katt og mus|Kissa ja hiiri',
  puppy_in_a_basket: 'Puppy in a Basket|Welpe im Korb|Chiot dans un panier|Cachorro en la canasta|Filhote no cesto|Cucciolo nel cesto|Puppy in de mand|Valp i korgen|Hvalp i kurven|Valp i kurven|Koiranpentu korissa',
  kitten_in_a_box: 'Kitten in a Box|Kätzchen im Karton|Chaton dans une boîte|Gatito en la caja|Gatinho na caixa|Gattino nella scatola|Poesje in de doos|Kattunge i lådan|Killing i kassen|Kattunge i esken|Kissanpentu laatikossa',
  sleeping_puppy: 'Sleeping Puppy|Schlafender Welpe|Chiot endormi|Cachorro dormido|Filhote dormindo|Cucciolo addormentato|Slapende puppy|Sovande valp|Sovende hvalp|Sovende valp|Nukkuva koiranpentu',
  mitten_pair: 'Mittens|Fäustlinge|Moufles|Mitones|Luvas|Muffole|Wanten|Vantar|Vanter|Votter|Lapaset',
  ice_cave: 'Ice Cave|Eishöhle|Grotte de glace|Cueva de hielo|Caverna de gelo|Grotta di ghiaccio|IJsgrot|Isgrotta|Ishule|Ishule|Jääluola',
  penguin_family: 'Penguin Family|Pinguinfamilie|Famille de manchots|Familia de pingüinos|Família de pinguins|Famiglia di pinguini|Pinguïnfamilie|Pingvinfamilj|Pingvinfamilie|Pingvinfamilie|Pingviiniperhe',
  baobab: 'Baobab|Affenbrotbaum|Baobab|Baobab|Baobá|Baobab|Apenbroodboom|Baobab|Baobab|Baobab|Apinanleipäpuu',
  safari_jeep: 'Safari Jeep|Safari-Jeep|Jeep de safari|Jeep de safari|Jipe de safári|Jeep da safari|Safarijeep|Safarijeep|Safarijeep|Safarijeep|Safariauto',
  glue_bottle: 'Glue|Kleber|Colle|Pegamento|Cola|Colla|Lijm|Lim|Lim|Lim|Liima',
  pencil_case: 'Pencil Case|Federmäppchen|Trousse|Lapicera|Estojo|Astuccio|Etui|Pennfodral|Penalhus|Pennal|Penaali',
  paint_palette: 'Paint Palette|Malpalette|Palette de peinture|Paleta de pintura|Paleta de tinta|Tavolozza|Verfpalet|Palett|Malerpalet|Malerpalett|Maalipaletti',
  chalk_board: 'Chalkboard|Tafel|Tableau|Pizarrón|Lousa|Lavagna|Schoolbord|Svart tavla|Tavle|Tavle|Liitutaulu',
  school_desk: 'School Desk|Schulbank|Pupitre|Pupitre|Carteira|Banco di scuola|Schooltafel|Skolbänk|Skolebord|Skolepult|Koulupulpetti',
  school_house: 'School|Schule|École|Escuela|Escola|Scuola|School|Skola|Skole|Skole|Koulu',
  lunch_box: 'Lunch Box|Brotdose|Boîte à goûter|Lonchera|Lancheira|Portapranzo|Broodtrommel|Matlåda|Madkasse|Matboks|Eväsrasia',
  graduation_hat: 'Graduation Cap|Doktorhut|Toque de diplômé|Birrete|Capelo|Tocco|Afstudeerhoed|Studenthatt|Studenterhue|Studenthatt|Valmistujaislakki',
  pencil_holder: 'Pencil Cup|Stiftebecher|Pot à crayons|Portalápices|Porta-lápis|Portamatite|Pennenbeker|Pennburk|Blyantsholder|Pennebeger|Kynäpurkki',
  tambourine: 'Tambourine|Tamburin|Tambourin|Pandereta|Pandeiro|Tamburello|Tamboerijn|Tamburin|Tamburin|Tamburin|Tamburiini',
  maracas: 'Maracas|Rasseln|Maracas|Maracas|Maracas|Maracas|Sambaballen|Maracas|Maracas|Maracas|Marakassit',
  music_notes: 'Music Notes|Musiknoten|Notes de musique|Notas musicales|Notas musicais|Note musicali|Muzieknoten|Musiknoter|Noder|Noter|Nuotit',
  toy_blocks: 'Toy Blocks|Bauklötze|Jeu de cubes|Cubos de juguete|Blocos de brinquedo|Cubi|Blokken|Byggklossar|Klodser|Byggeklosser|Palikat',
  jack_in_the_box: 'Jack-in-the-Box|Springteufel|Diable à ressort|Caja de sorpresas|Caixa surpresa|Scatola a sorpresa|Duveltje uit een doosje|Gubben i lådan|Trold i æske|Troll i eske|Vieteriukko',
  windy_day: 'Windy Day|Windiger Tag|Jour de vent|Día de viento|Dia de vento|Giornata di vento|Winderige dag|Blåsig dag|Blæsende dag|Vindfull dag|Tuulinen päivä',
  scarf_and_hat: 'Hat and Scarf|Mütze und Schal|Bonnet et écharpe|Gorro y bufanda|Touca e cachecol|Berretto e sciarpa|Muts en sjaal|Mössa och halsduk|Hue og halstørklæde|Lue og skjerf|Pipo ja kaulaliina',
  spring_flowers: 'Spring Flowers|Frühlingsblumen|Fleurs de printemps|Flores de primavera|Flores de primavera|Fiori di primavera|Lentebloemen|Vårblommor|Forårsblomster|Vårblomster|Kevätkukat',
  bird_house: 'Birdhouse|Vogelhaus|Nichoir|Casa de pájaros|Casinha de passarinho|Casetta per uccelli|Vogelhuisje|Fågelholk|Fuglehus|Fuglekasse|Linnunpönttö',
  bucket_and_spade: 'Bucket and Shovel|Eimer und Schaufel|Seau et pelle|Cubeta y pala|Balde e pá|Secchiello e paletta|Emmer en schep|Hink och spade|Spand og skovl|Bøtte og spade|Ämpäri ja lapio',
  balloons: 'Balloons|Luftballons|Ballons|Globos|Balões|Palloncini|Ballonnen|Ballonger|Balloner|Ballonger|Ilmapallot',
  party_popper: 'Party Popper|Konfettikanone|Canon à confettis|Lanzador de confeti|Lança-confete|Sparacoriandoli|Confettikanon|Konfettikanon|Konfettikanon|Konfettikanon|Konfettitykki',
  halloween_ghost: 'Ghost|Gespenst|Fantôme|Fantasma|Fantasma|Fantasma|Spook|Spöke|Spøgelse|Spøkelse|Kummitus',
  witch_hat: 'Witch Hat|Hexenhut|Chapeau de sorcière|Sombrero de bruja|Chapéu de bruxa|Cappello da strega|Heksenhoed|Häxhatt|Heksehat|Heksehatt|Noidan hattu',
  jack_o_lantern: 'Jack-o’-Lantern|Halloween-Kürbis|Citrouille d’Halloween|Calabaza de Halloween|Abóbora de Halloween|Zucca di Halloween|Halloweenpompoen|Halloweenpumpa|Græskarlygte|Gresskarlykt|Kurpitsalyhty',
  candy_basket: 'Candy Basket|Süßigkeitenkorb|Panier de bonbons|Canasta de dulces|Cesta de doces|Cesto di caramelle|Snoepmand|Godiskorg|Slikkurv|Godterikurv|Karkkikori',
  fireworks: 'Fireworks|Feuerwerk|Feu d’artifice|Fuegos artificiales|Fogos de artifício|Fuochi d’artificio|Vuurwerk|Fyrverkeri|Fyrværkeri|Fyrverkeri|Ilotulitus',
  paper_lantern: 'Paper Lantern|Papierlaterne|Lanterne en papier|Farol de papel|Lanterna de papel|Lanterna di carta|Papieren lampion|Papperslykta|Papirlanterne|Papirlykt|Paperilyhty',
  baseball_glove: 'Baseball Glove|Baseballhandschuh|Gant de baseball|Guante de béisbol|Luva de beisebol|Guantone da baseball|Honkbalhandschoen|Baseballhandske|Baseballhandske|Baseballhanske|Pesäpalloräpylä',
  alien: 'Alien|Außerirdischer|Extraterrestre|Extraterrestre|Alienígena|Alieno|Buitenaards wezen|Utomjording|Rumvæsen|Romvesen|Avaruusolio',
  moon_rover: 'Moon Rover|Mondfahrzeug|Rover lunaire|Vehículo lunar|Jipe lunar|Rover lunare|Maanwagen|Månbil|Månebil|Månebil|Kuuauto',
  space_helmet: 'Space Helmet|Astronautenhelm|Casque spatial|Casco espacial|Capacete espacial|Casco spaziale|Ruimtehelm|Rymdhjälm|Rumhjelm|Romhjelm|Avaruuskypärä',
  space_station: 'Space Station|Raumstation|Station spatiale|Estación espacial|Estação espacial|Stazione spaziale|Ruimtestation|Rymdstation|Rumstation|Romstasjon|Avaruusasema',
  alien_baby: 'Baby Alien|Alien-Baby|Bébé extraterrestre|Extraterrestre bebé|Alienígena bebê|Alieno bebè|Babyalien|Utomjordingsbebis|Rumvæsenbaby|Romvesenbaby|Avaruusolion vauva',
  meteor_shower: 'Meteor Shower|Meteorschauer|Pluie de météores|Lluvia de meteoros|Chuva de meteoros|Pioggia di meteore|Meteorenregen|Meteorregn|Meteorregn|Meteorregn|Meteoriparvi',
  rocket_launch: 'Rocket Launch|Raketenstart|Décollage de fusée|Lanzamiento de cohete|Lançamento de foguete|Lancio del razzo|Raketlancering|Raketuppskjutning|Raketopsendelse|Rakettoppskyting|Raketin laukaisu',
  fuzzy_monster: 'Fuzzy Monster|Zottelmonster|Monstre poilu|Monstruo peludo|Monstro peludo|Mostro peloso|Harig monster|Lurvigt monster|Lodent monster|Lodent monster|Karvainen hirviö',
  one_eyed_monster: 'One-Eyed Monster|Einäugiges Monster|Monstre à un œil|Monstruo de un ojo|Monstro de um olho|Mostro con un occhio|Eenogig monster|Enögt monster|Enøjet monster|Enøyd monster|Yksisilmäinen hirviö',
  horned_monster: 'Horned Monster|Monster mit Hörnern|Monstre à cornes|Monstruo con cuernos|Monstro de chifres|Mostro con le corna|Monster met hoorns|Monster med horn|Monster med horn|Monster med horn|Sarvipäinen hirviö',
  tentacle_monster: 'Tentacle Monster|Tentakelmonster|Monstre à tentacules|Monstruo de tentáculos|Monstro de tentáculos|Mostro con i tentacoli|Tentakelmonster|Tentakelmonster|Tentakelmonster|Tentakkelmonster|Lonkerohirviö',
  little_monster: 'Little Monster|Kleines Monster|Petit monstre|Monstruito|Monstrinho|Mostriciattolo|Klein monster|Litet monster|Lille monster|Lite monster|Pieni hirviö',
  jelly_monster: 'Jelly Monster|Glibber-Monster|Monstre gélatine|Monstruo de gelatina|Monstro de gelatina|Mostro gelatina|Geleimonster|Gelémonster|Gelémonster|Gelémonster|Hyytelöhirviö',
  crane_truck: 'Crane Truck|Kranwagen|Camion-grue|Camión grúa|Caminhão guindaste|Autogrù|Kraanwagen|Kranbil|Kranvogn|Kranbil|Nosturiauto',
  flame_friend: 'Flame|Flamme|Flamme|Flama|Chama|Fiamma|Vlam|Låga|Flamme|Flamme|Liekki',
  stone_friend: 'Stone|Stein|Pierre|Piedra|Pedra|Sasso|Steen|Sten|Sten|Stein|Kivi',
  babys_onesie: 'Baby Onesie|Babybody|Body de bébé|Mameluco|Macacão de bebê|Tutina|Rompertje|Babybody|Babybody|Babybody|Vauvan body',
  preserver_ring: 'Life Ring|Rettungsring|Bouée de sauvetage|Salvavidas|Boia salva-vidas|Salvagente|Reddingsboei|Livboj|Redningskrans|Livbøye|Pelastusrengas',
  biberon: 'Baby Bottle|Babyflasche|Biberon|Biberón|Mamadeira|Biberon|Babyfles|Nappflaska|Sutteflaske|Tåteflaske|Tuttipullo',
  bulb: 'Light Bulb|Glühbirne|Ampoule|Foco|Lâmpada|Lampadina|Gloeilamp|Glödlampa|Elpære|Lyspære|Hehkulamppu',
  frame: 'Picture Frame|Bilderrahmen|Cadre|Marco|Porta-retrato|Cornice|Fotolijst|Tavelram|Billedramme|Bilderamme|Kuvakehys',
  mortar: 'Mortar and Pestle|Mörser|Mortier|Molcajete|Pilão|Mortaio|Vijzel|Mortel|Morter|Morter|Huhmar',
  chefs_knife: 'Kitchen Knife|Küchenmesser|Couteau de cuisine|Cuchillo de cocina|Faca de cozinha|Coltello da cucina|Keukenmes|Kökskniv|Køkkenkniv|Kjøkkenkniv|Keittiöveitsi',
  conversation: 'Speech Bubble|Sprechblase|Bulle|Globo de diálogo|Balão de fala|Nuvoletta|Tekstballon|Pratbubbla|Taleboble|Snakkeboble|Puhekupla',
  page: 'Sheet of Paper|Blatt Papier|Feuille de papier|Hoja de papel|Folha de papel|Foglio di carta|Vel papier|Pappersark|Stykke papir|Papirark|Paperiarkki',
  note: 'Note|Notiz|Note|Nota|Bilhete|Biglietto|Briefje|Papperslapp|Seddel|Papirlapp|Lappu',
  ice_cream_cone: 'Ice Cream Cone|Eistüte|Cornet de glace|Cono de helado|Casquinha de sorvete|Cono gelato|IJshoorntje|Glasstrut|Isvaffel|Iskrem|Jäätelötötterö',
  birthday_hat: 'Party Hat|Partyhut|Chapeau de fête|Gorro de fiesta|Chapéu de festa|Cappello da festa|Feesthoedje|Partyhatt|Festhat|Festhatt|Juhlahattu',
  ice_cream_van: 'Ice Cream Truck|Eiswagen|Camion de glaces|Camión de helados|Carro de sorvete|Furgone dei gelati|IJscowagen|Glassbil|Isbil|Isbil|Jäätelöauto',
  dumper_truck: 'Dump Truck|Kipplaster|Camion benne|Camión de volteo|Caminhão basculante|Autocarro ribaltabile|Kiepwagen|Tippbil|Tipvogn|Tippbil|Kippiauto',
  pickup: 'Pickup Truck|Pick-up|Pick-up|Camioneta|Picape|Pick-up|Pick-up|Pickup|Pickup|Pickup|Avolava-auto',
  lounge: 'Beach Chair|Liegestuhl|Chaise longue|Silla de playa|Espreguiçadeira|Sdraio|Ligstoel|Solstol|Liggestol|Solstol|Aurinkotuoli',
  mixer_truck: 'Cement Mixer|Betonmischer|Bétonnière|Camión revolvedor|Betoneira|Betoniera|Betonmolen|Betongbil|Betonbil|Betongbil|Betoniauto',
  crescent_moon: 'Crescent Moon|Mondsichel|Croissant de lune|Luna creciente|Lua crescente|Falce di luna|Maansikkel|Månskära|Månesegl|Månesigd|Kuunsirppi',
}).map(([k, v]) => [k, row(v)]));
/** library drawings whose file name finds no word: the vocabulary key that names them, or a row */
const LIB = {
  clown_fish: 'clownfish', sallad: 'salad', 'double-decker': 'bus', puffer: 'pufferfish', cruise: 'ship',
};
/** the gender of a name above in the languages whose titles need it, in each language's own code (de m f n · fr es pt it m f ·
 *  sv da n common, t neuter · no m f n); "-" = no form there (a German adjective inflects: never a guess) */
const GL = ['de', 'fr', 'es', 'pt', 'it', 'sv', 'da', 'no'];
const GENDERS = Object.fromEntries(`moth m m f f f n n m
praying_mantis f f f m f n n m
bee_hive m f f f m n t m
garden_gnome m m m m m n n m
baby_dinosaur n m m m m n n m
dinosaur_egg n m m m m t t n
pterodactyl m m m m m n n m
spinosaurus m m m m m n n m
plesiosaur m m m m m n n m
dinosaur_footprint f f f f f t t n
volcano m m m m m n n m
fossil n m m m m t t n
mammoth n m m m m n n m
fern m f m f f n n m
dino_in_a_hat m m m m m n n m
castle n m m m m t t n
princess f f f f f n n f
prince m m m m m n n m
knight m m m m m n n m
wizard m m m m m n n m
fairy f f f f f n n f
magic_wand m f f f f t n m
frog_prince m m m m m n n m
pumpkin_carriage f m f f f n n m
glass_slipper - f f m f n n m
magic_lamp f f f f f n n f
flying_carpet - m f m m n t n
treasure_key - f f f f n n m
magic_mirror m m m m m n t n
cottage_in_the_woods n f f f f n n f
mushroom_house n f f f f t t n
tooth_fairy f f f f f n n f
storybook n m m m m n n f
hay_bale m f f m f n n m
farm_fence m f f f f t t n
milk_can f m f m m n n n
egg_basket m m f f m n n m
milk_carton m f m f m t n m
sushi_roll f m m m m n n m
soup_bowl f m m f f n n m
birthday_cake f m m m f n n m
honey_pot m m m m m n n f
skunk n f m m f n t n
mole m f m f f n n m
tree_stump m f m m m n n m
bird_nest n m m m m t n n
camping_tent n f f f f t t n
wood_log m f m m m n n m
crescent m m f f f n n m
flower_pot m m f m m n n m
mermaid f f f f f n n f
treasure_chest f m m m m n n f
sea_otter m f f f f n n m
life_ring m f m f m n n m
preserver_ring m f m f m n n m
coral_reef n m m m f t t n
builder m m m m m n n m
dentist m m m m m n n m
painter m m m m m n n m
scientist m m m m m n n m
boy_waving m m m m m n n m
girl_jumping n f f f f n n f
fish_bowl n m f m f t t n
dog_house f f f f f n t n
pet_bowl m f m f f n n m
yarn_ball n f f m m t t n
pet_collar n m m f m t t n
sleeping_puppy - m m m m n n m
ice_cave f f f f f n n f
penguin_family f f f f f n n f
baobab m m m m m n n m
safari_jeep m f m m f n n m
pencil_case n f f m m t t n
paint_palette f f f f f n n m
chalk_board f m m f f n n f
school_desk f m m f m n t m
school_house f f f f f n n f
lunch_box f f f f m n n m
graduation_hat m f m m m n n m
pencil_holder m m m m m n n n
tambourine n m f m m n n m
jack_in_the_box m m f f f - - -
windy_day - m m m f n n m
bird_house n m f f f n t f
party_popper f m m m m n n m
halloween_ghost n m m m m t t n
witch_hat m m m m m n n m
jack_o_lantern m f f f f n n f
candy_basket m m f f m n n m
paper_lantern f f m f f n n f
baseball_glove m m m f m n n m
alien - m m m m n t n
moon_rover n m m m m n n m
space_helmet m m m m m n n m
space_station f f f f f n n m
alien_baby n m m m m n n m
meteor_shower m f f f f t n n
rocket_launch m m m m m n n f
fuzzy_monster n m m m m t t n
one_eyed_monster - m m m m t t n
horned_monster n m m m m t t n
tentacle_monster n m m m m t t n
little_monster - m m m m t t n
jelly_monster n m m m m t t n
crane_truck m m m m f n n m
flame_friend f f f f f n n f
stone_friend m f f f m n n m
babys_onesie m m m m f n n m
biberon f m m f m n n f
bulb f f m f f n n f
frame m m m m f n n f
mortar m m m m m n n m
chefs_knife n m m f m n n m
conversation f f m m f n n f
page n f f f m t t n
note f f f m m n n m
ice_cream_cone f m m f m n n m
birthday_hat m m m m m n n m
ice_cream_van m m m m m n n m
dumper_truck m m m m m n n m
pickup m m f f m n n m
lounge m f f f f n n m
mixer_truck m f m f f n n m`.split('\n').map((row) => { const [k, ...g] = row.trim().split(/\s+/); return [k, Object.fromEntries(GL.map((l, i) => [l, g[i] === '-' ? null : g[i]]))]; }));
/** a plural or a phrase: never printed after an article */
const NOFORM = new Set('dino_friends pancakes spoon_and_fork cozy_socks toilet_paper_friend reading_child child_with_balloon child_with_kite child_painting friends_holding_hands grandparents cat_and_mouse puppy_in_a_basket kitten_in_a_box mitten_pair glue_bottle maracas music_notes toy_blocks scarf_and_hat spring_flowers bucket_and_spade balloons fireworks'.split(' '));
module.exports = { ALIAS, NAMES, LIB, GENDERS, NOFORM };
