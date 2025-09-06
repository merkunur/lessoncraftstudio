const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

// Comprehensive translations for all image names
const imageTranslations = {
  // Animals
  "cat": {
    "en": "Cat",
    "de": "Katze",
    "fr": "Chat",
    "es": "Gato",
    "pt": "Gato",
    "it": "Gatto",
    "nl": "Kat",
    "sv": "Katt",
    "da": "Kat",
    "no": "Katt",
    "fi": "Kissa"
  },
  "dog": {
    "en": "Dog",
    "de": "Hund",
    "fr": "Chien",
    "es": "Perro",
    "pt": "Cão",
    "it": "Cane",
    "nl": "Hond",
    "sv": "Hund",
    "da": "Hund",
    "no": "Hund",
    "fi": "Koira"
  },
  "bird": {
    "en": "Bird",
    "de": "Vogel",
    "fr": "Oiseau",
    "es": "Pájaro",
    "pt": "Pássaro",
    "it": "Uccello",
    "nl": "Vogel",
    "sv": "Fågel",
    "da": "Fugl",
    "no": "Fugl",
    "fi": "Lintu"
  },
  "cow": {
    "en": "Cow",
    "de": "Kuh",
    "fr": "Vache",
    "es": "Vaca",
    "pt": "Vaca",
    "it": "Mucca",
    "nl": "Koe",
    "sv": "Ko",
    "da": "Ko",
    "no": "Ku",
    "fi": "Lehmä"
  },
  "pig": {
    "en": "Pig",
    "de": "Schwein",
    "fr": "Cochon",
    "es": "Cerdo",
    "pt": "Porco",
    "it": "Maiale",
    "nl": "Varken",
    "sv": "Gris",
    "da": "Gris",
    "no": "Gris",
    "fi": "Sika"
  },
  "sheep": {
    "en": "Sheep",
    "de": "Schaf",
    "fr": "Mouton",
    "es": "Oveja",
    "pt": "Ovelha",
    "it": "Pecora",
    "nl": "Schaap",
    "sv": "Får",
    "da": "Får",
    "no": "Sau",
    "fi": "Lammas"
  },
  "lion": {
    "en": "Lion",
    "de": "Löwe",
    "fr": "Lion",
    "es": "León",
    "pt": "Leão",
    "it": "Leone",
    "nl": "Leeuw",
    "sv": "Lejon",
    "da": "Løve",
    "no": "Løve",
    "fi": "Leijona"
  },
  "tiger": {
    "en": "Tiger",
    "de": "Tiger",
    "fr": "Tigre",
    "es": "Tigre",
    "pt": "Tigre",
    "it": "Tigre",
    "nl": "Tijger",
    "sv": "Tiger",
    "da": "Tiger",
    "no": "Tiger",
    "fi": "Tiikeri"
  },
  "mouse": {
    "en": "Mouse",
    "de": "Maus",
    "fr": "Souris",
    "es": "Ratón",
    "pt": "Rato",
    "it": "Topo",
    "nl": "Muis",
    "sv": "Mus",
    "da": "Mus",
    "no": "Mus",
    "fi": "Hiiri"
  },
  "fox": {
    "en": "Fox",
    "de": "Fuchs",
    "fr": "Renard",
    "es": "Zorro",
    "pt": "Raposa",
    "it": "Volpe",
    "nl": "Vos",
    "sv": "Räv",
    "da": "Ræv",
    "no": "Rev",
    "fi": "Kettu"
  },
  "elephant": {
    "en": "Elephant",
    "de": "Elefant",
    "fr": "Éléphant",
    "es": "Elefante",
    "pt": "Elefante",
    "it": "Elefante",
    "nl": "Olifant",
    "sv": "Elefant",
    "da": "Elefant",
    "no": "Elefant",
    "fi": "Norsu"
  },
  "bear": {
    "en": "Bear",
    "de": "Bär",
    "fr": "Ours",
    "es": "Oso",
    "pt": "Urso",
    "it": "Orso",
    "nl": "Beer",
    "sv": "Björn",
    "da": "Bjørn",
    "no": "Bjørn",
    "fi": "Karhu"
  },
  "alligator": {
    "en": "Alligator",
    "de": "Alligator",
    "fr": "Alligator",
    "es": "Caimán",
    "pt": "Jacaré",
    "it": "Alligatore",
    "nl": "Alligator",
    "sv": "Alligator",
    "da": "Alligator",
    "no": "Alligator",
    "fi": "Alligaattori"
  },
  "frog": {
    "en": "Frog",
    "de": "Frosch",
    "fr": "Grenouille",
    "es": "Rana",
    "pt": "Sapo",
    "it": "Rana",
    "nl": "Kikker",
    "sv": "Groda",
    "da": "Frø",
    "no": "Frosk",
    "fi": "Sammakko"
  },
  "giraffe": {
    "en": "Giraffe",
    "de": "Giraffe",
    "fr": "Girafe",
    "es": "Jirafa",
    "pt": "Girafa",
    "it": "Giraffa",
    "nl": "Giraffe",
    "sv": "Giraff",
    "da": "Giraf",
    "no": "Sjiraff",
    "fi": "Kirahvi"
  },
  "giraf": { // Alternative spelling
    "en": "Giraffe",
    "de": "Giraffe",
    "fr": "Girafe",
    "es": "Jirafa",
    "pt": "Girafa",
    "it": "Giraffa",
    "nl": "Giraffe",
    "sv": "Giraff",
    "da": "Giraf",
    "no": "Sjiraff",
    "fi": "Kirahvi"
  },
  "monkey": {
    "en": "Monkey",
    "de": "Affe",
    "fr": "Singe",
    "es": "Mono",
    "pt": "Macaco",
    "it": "Scimmia",
    "nl": "Aap",
    "sv": "Apa",
    "da": "Abe",
    "no": "Ape",
    "fi": "Apina"
  },
  "ape": {
    "en": "Ape",
    "de": "Menschenaffe",
    "fr": "Grand singe",
    "es": "Simio",
    "pt": "Primata",
    "it": "Scimmia",
    "nl": "Mensaap",
    "sv": "Människoapa",
    "da": "Menneskeabe",
    "no": "Menneskeape",
    "fi": "Ihmisapina"
  },
  "lamb": {
    "en": "Lamb",
    "de": "Lamm",
    "fr": "Agneau",
    "es": "Cordero",
    "pt": "Cordeiro",
    "it": "Agnello",
    "nl": "Lam",
    "sv": "Lamm",
    "da": "Lam",
    "no": "Lam",
    "fi": "Karitsa"
  },
  "turtle": {
    "en": "Turtle",
    "de": "Schildkröte",
    "fr": "Tortue",
    "es": "Tortuga",
    "pt": "Tartaruga",
    "it": "Tartaruga",
    "nl": "Schildpad",
    "sv": "Sköldpadda",
    "da": "Skildpadde",
    "no": "Skilpadde",
    "fi": "Kilpikonna"
  },
  "zebra": {
    "en": "Zebra",
    "de": "Zebra",
    "fr": "Zèbre",
    "es": "Cebra",
    "pt": "Zebra",
    "it": "Zebra",
    "nl": "Zebra",
    "sv": "Zebra",
    "da": "Zebra",
    "no": "Sebra",
    "fi": "Seepra"
  },
  "octopus": {
    "en": "Octopus",
    "de": "Oktopus",
    "fr": "Pieuvre",
    "es": "Pulpo",
    "pt": "Polvo",
    "it": "Polpo",
    "nl": "Octopus",
    "sv": "Bläckfisk",
    "da": "Blæksprutte",
    "no": "Blekksprut",
    "fi": "Mustekala"
  },
  // Food
  "apple": {
    "en": "Apple",
    "de": "Apfel",
    "fr": "Pomme",
    "es": "Manzana",
    "pt": "Maçã",
    "it": "Mela",
    "nl": "Appel",
    "sv": "Äpple",
    "da": "Æble",
    "no": "Eple",
    "fi": "Omena"
  },
  "banana": {
    "en": "Banana",
    "de": "Banane",
    "fr": "Banane",
    "es": "Plátano",
    "pt": "Banana",
    "it": "Banana",
    "nl": "Banaan",
    "sv": "Banan",
    "da": "Banan",
    "no": "Banan",
    "fi": "Banaani"
  },
  "carrot": {
    "en": "Carrot",
    "de": "Karotte",
    "fr": "Carotte",
    "es": "Zanahoria",
    "pt": "Cenoura",
    "it": "Carota",
    "nl": "Wortel",
    "sv": "Morot",
    "da": "Gulerod",
    "no": "Gulrot",
    "fi": "Porkkana"
  },
  "fish": {
    "en": "Fish",
    "de": "Fisch",
    "fr": "Poisson",
    "es": "Pez",
    "pt": "Peixe",
    "it": "Pesce",
    "nl": "Vis",
    "sv": "Fisk",
    "da": "Fisk",
    "no": "Fisk",
    "fi": "Kala"
  },
  "egg": {
    "en": "Egg",
    "de": "Ei",
    "fr": "Œuf",
    "es": "Huevo",
    "pt": "Ovo",
    "it": "Uovo",
    "nl": "Ei",
    "sv": "Ägg",
    "da": "Æg",
    "no": "Egg",
    "fi": "Muna"
  },
  "grapes": {
    "en": "Grapes",
    "de": "Trauben",
    "fr": "Raisins",
    "es": "Uvas",
    "pt": "Uvas",
    "it": "Uva",
    "nl": "Druiven",
    "sv": "Vindruvor",
    "da": "Vindruer",
    "no": "Druer",
    "fi": "Viinirypäleet"
  },
  "honey": {
    "en": "Honey",
    "de": "Honig",
    "fr": "Miel",
    "es": "Miel",
    "pt": "Mel",
    "it": "Miele",
    "nl": "Honing",
    "sv": "Honung",
    "da": "Honning",
    "no": "Honning",
    "fi": "Hunaja"
  },
  "icecream": {
    "en": "Ice Cream",
    "de": "Eiscreme",
    "fr": "Glace",
    "es": "Helado",
    "pt": "Sorvete",
    "it": "Gelato",
    "nl": "IJsje",
    "sv": "Glass",
    "da": "Is",
    "no": "Iskrem",
    "fi": "Jäätelö"
  },
  "juice": {
    "en": "Juice",
    "de": "Saft",
    "fr": "Jus",
    "es": "Jugo",
    "pt": "Suco",
    "it": "Succo",
    "nl": "Sap",
    "sv": "Juice",
    "da": "Juice",
    "no": "Juice",
    "fi": "Mehu"
  },
  "donut": {
    "en": "Donut",
    "de": "Donut",
    "fr": "Beignet",
    "es": "Dona",
    "pt": "Rosquinha",
    "it": "Ciambella",
    "nl": "Donut",
    "sv": "Munk",
    "da": "Donut",
    "no": "Smultring",
    "fi": "Donitsi"
  },
  "orange": {
    "en": "Orange",
    "de": "Orange",
    "fr": "Orange",
    "es": "Naranja",
    "pt": "Laranja",
    "it": "Arancia",
    "nl": "Sinaasappel",
    "sv": "Apelsin",
    "da": "Appelsin",
    "no": "Appelsin",
    "fi": "Appelsiini"
  },
  // Shapes
  "circle": {
    "en": "Circle",
    "de": "Kreis",
    "fr": "Cercle",
    "es": "Círculo",
    "pt": "Círculo",
    "it": "Cerchio",
    "nl": "Cirkel",
    "sv": "Cirkel",
    "da": "Cirkel",
    "no": "Sirkel",
    "fi": "Ympyrä"
  },
  "square": {
    "en": "Square",
    "de": "Quadrat",
    "fr": "Carré",
    "es": "Cuadrado",
    "pt": "Quadrado",
    "it": "Quadrato",
    "nl": "Vierkant",
    "sv": "Fyrkant",
    "da": "Firkant",
    "no": "Firkant",
    "fi": "Neliö"
  },
  "triangle": {
    "en": "Triangle",
    "de": "Dreieck",
    "fr": "Triangle",
    "es": "Triángulo",
    "pt": "Triângulo",
    "it": "Triangolo",
    "nl": "Driehoek",
    "sv": "Triangel",
    "da": "Trekant",
    "no": "Trekant",
    "fi": "Kolmio"
  },
  "heart": {
    "en": "Heart",
    "de": "Herz",
    "fr": "Cœur",
    "es": "Corazón",
    "pt": "Coração",
    "it": "Cuore",
    "nl": "Hart",
    "sv": "Hjärta",
    "da": "Hjerte",
    "no": "Hjerte",
    "fi": "Sydän"
  },
  "star": {
    "en": "Star",
    "de": "Stern",
    "fr": "Étoile",
    "es": "Estrella",
    "pt": "Estrela",
    "it": "Stella",
    "nl": "Ster",
    "sv": "Stjärna",
    "da": "Stjerne",
    "no": "Stjerne",
    "fi": "Tähti"
  },
  "hexagon": {
    "en": "Hexagon",
    "de": "Sechseck",
    "fr": "Hexagone",
    "es": "Hexágono",
    "pt": "Hexágono",
    "it": "Esagono",
    "nl": "Zeshoek",
    "sv": "Hexagon",
    "da": "Sekskant",
    "no": "Sekskant",
    "fi": "Kuusikulmio"
  },
  "cube": {
    "en": "Cube",
    "de": "Würfel",
    "fr": "Cube",
    "es": "Cubo",
    "pt": "Cubo",
    "it": "Cubo",
    "nl": "Kubus",
    "sv": "Kub",
    "da": "Terning",
    "no": "Kube",
    "fi": "Kuutio"
  },
  "cylinder": {
    "en": "Cylinder",
    "de": "Zylinder",
    "fr": "Cylindre",
    "es": "Cilindro",
    "pt": "Cilindro",
    "it": "Cilindro",
    "nl": "Cilinder",
    "sv": "Cylinder",
    "da": "Cylinder",
    "no": "Sylinder",
    "fi": "Sylinteri"
  },
  // Transportation
  "car": {
    "en": "Car",
    "de": "Auto",
    "fr": "Voiture",
    "es": "Coche",
    "pt": "Carro",
    "it": "Auto",
    "nl": "Auto",
    "sv": "Bil",
    "da": "Bil",
    "no": "Bil",
    "fi": "Auto"
  },
  "bus": {
    "en": "Bus",
    "de": "Bus",
    "fr": "Bus",
    "es": "Autobús",
    "pt": "Ônibus",
    "it": "Autobus",
    "nl": "Bus",
    "sv": "Buss",
    "da": "Bus",
    "no": "Buss",
    "fi": "Bussi"
  },
  "train": {
    "en": "Train",
    "de": "Zug",
    "fr": "Train",
    "es": "Tren",
    "pt": "Trem",
    "it": "Treno",
    "nl": "Trein",
    "sv": "Tåg",
    "da": "Tog",
    "no": "Tog",
    "fi": "Juna"
  },
  // Nature
  "tree": {
    "en": "Tree",
    "de": "Baum",
    "fr": "Arbre",
    "es": "Árbol",
    "pt": "Árvore",
    "it": "Albero",
    "nl": "Boom",
    "sv": "Träd",
    "da": "Træ",
    "no": "Tre",
    "fi": "Puu"
  },
  "sun": {
    "en": "Sun",
    "de": "Sonne",
    "fr": "Soleil",
    "es": "Sol",
    "pt": "Sol",
    "it": "Sole",
    "nl": "Zon",
    "sv": "Sol",
    "da": "Sol",
    "no": "Sol",
    "fi": "Aurinko"
  },
  "moon": {
    "en": "Moon",
    "de": "Mond",
    "fr": "Lune",
    "es": "Luna",
    "pt": "Lua",
    "it": "Luna",
    "nl": "Maan",
    "sv": "Måne",
    "da": "Måne",
    "no": "Måne",
    "fi": "Kuu"
  },
  // Objects
  "ball": {
    "en": "Ball",
    "de": "Ball",
    "fr": "Balle",
    "es": "Pelota",
    "pt": "Bola",
    "it": "Palla",
    "nl": "Bal",
    "sv": "Boll",
    "da": "Bold",
    "no": "Ball",
    "fi": "Pallo"
  },
  "book": {
    "en": "Book",
    "de": "Buch",
    "fr": "Livre",
    "es": "Libro",
    "pt": "Livro",
    "it": "Libro",
    "nl": "Boek",
    "sv": "Bok",
    "da": "Bog",
    "no": "Bok",
    "fi": "Kirja"
  },
  "pen": {
    "en": "Pen",
    "de": "Stift",
    "fr": "Stylo",
    "es": "Bolígrafo",
    "pt": "Caneta",
    "it": "Penna",
    "nl": "Pen",
    "sv": "Penna",
    "da": "Pen",
    "no": "Penn",
    "fi": "Kynä"
  },
  "hammer": {
    "en": "Hammer",
    "de": "Hammer",
    "fr": "Marteau",
    "es": "Martillo",
    "pt": "Martelo",
    "it": "Martello",
    "nl": "Hamer",
    "sv": "Hammare",
    "da": "Hammer",
    "no": "Hammer",
    "fi": "Vasara"
  },
  "scissors": {
    "en": "Scissors",
    "de": "Schere",
    "fr": "Ciseaux",
    "es": "Tijeras",
    "pt": "Tesoura",
    "it": "Forbici",
    "nl": "Schaar",
    "sv": "Sax",
    "da": "Saks",
    "no": "Saks",
    "fi": "Sakset"
  },
  "umbrella": {
    "en": "Umbrella",
    "de": "Regenschirm",
    "fr": "Parapluie",
    "es": "Paraguas",
    "pt": "Guarda-chuva",
    "it": "Ombrello",
    "nl": "Paraplu",
    "sv": "Paraply",
    "da": "Paraply",
    "no": "Paraply",
    "fi": "Sateenvarjo"
  },
  "vase": {
    "en": "Vase",
    "de": "Vase",
    "fr": "Vase",
    "es": "Jarrón",
    "pt": "Vaso",
    "it": "Vaso",
    "nl": "Vaas",
    "sv": "Vas",
    "da": "Vase",
    "no": "Vase",
    "fi": "Maljakko"
  },
  "robot": {
    "en": "Robot",
    "de": "Roboter",
    "fr": "Robot",
    "es": "Robot",
    "pt": "Robô",
    "it": "Robot",
    "nl": "Robot",
    "sv": "Robot",
    "da": "Robot",
    "no": "Robot",
    "fi": "Robotti"
  },
  "ufo": {
    "en": "UFO",
    "de": "UFO",
    "fr": "OVNI",
    "es": "OVNI",
    "pt": "OVNI",
    "it": "UFO",
    "nl": "UFO",
    "sv": "UFO",
    "da": "UFO",
    "no": "UFO",
    "fi": "UFO"
  },
  "map": {
    "en": "Map",
    "de": "Karte",
    "fr": "Carte",
    "es": "Mapa",
    "pt": "Mapa",
    "it": "Mappa",
    "nl": "Kaart",
    "sv": "Karta",
    "da": "Kort",
    "no": "Kart",
    "fi": "Kartta"
  },
  "whiteboard": {
    "en": "Whiteboard",
    "de": "Whiteboard",
    "fr": "Tableau blanc",
    "es": "Pizarra",
    "pt": "Quadro branco",
    "it": "Lavagna",
    "nl": "Whiteboard",
    "sv": "Whiteboard",
    "da": "Whiteboard",
    "no": "Tavle",
    "fi": "Valkotaulu"
  },
  // Math symbols
  "equal": {
    "en": "Equal",
    "de": "Gleich",
    "fr": "Égal",
    "es": "Igual",
    "pt": "Igual",
    "it": "Uguale",
    "nl": "Gelijk",
    "sv": "Lika med",
    "da": "Lig med",
    "no": "Lik",
    "fi": "Yhtä suuri"
  },
  "less": {
    "en": "Less than",
    "de": "Kleiner als",
    "fr": "Moins que",
    "es": "Menor que",
    "pt": "Menor que",
    "it": "Minore di",
    "nl": "Kleiner dan",
    "sv": "Mindre än",
    "da": "Mindre end",
    "no": "Mindre enn",
    "fi": "Pienempi kuin"
  },
  "more": {
    "en": "Greater than",
    "de": "Größer als",
    "fr": "Plus que",
    "es": "Mayor que",
    "pt": "Maior que",
    "it": "Maggiore di",
    "nl": "Groter dan",
    "sv": "Större än",
    "da": "Større end",
    "no": "Større enn",
    "fi": "Suurempi kuin"
  },
  // Additional common items
  "wing": {
    "en": "Wing",
    "de": "Flügel",
    "fr": "Aile",
    "es": "Ala",
    "pt": "Asa",
    "it": "Ala",
    "nl": "Vleugel",
    "sv": "Vinge",
    "da": "Vinge",
    "no": "Vinge",
    "fi": "Siipi"
  },
  "witch": {
    "en": "Witch",
    "de": "Hexe",
    "fr": "Sorcière",
    "es": "Bruja",
    "pt": "Bruxa",
    "it": "Strega",
    "nl": "Heks",
    "sv": "Häxa",
    "da": "Heks",
    "no": "Heks",
    "fi": "Noita"
  },
  "yarn": {
    "en": "Yarn",
    "de": "Garn",
    "fr": "Fil",
    "es": "Hilo",
    "pt": "Fio",
    "it": "Filato",
    "nl": "Garen",
    "sv": "Garn",
    "da": "Garn",
    "no": "Garn",
    "fi": "Lanka"
  },
  "yak": {
    "en": "Yak",
    "de": "Yak",
    "fr": "Yak",
    "es": "Yak",
    "pt": "Iaque",
    "it": "Yak",
    "nl": "Jak",
    "sv": "Jak",
    "da": "Yak",
    "no": "Jakokse",
    "fi": "Jakki"
  },
  "vulture": {
    "en": "Vulture",
    "de": "Geier",
    "fr": "Vautour",
    "es": "Buitre",
    "pt": "Abutre",
    "it": "Avvoltoio",
    "nl": "Gier",
    "sv": "Gam",
    "da": "Grib",
    "no": "Gribb",
    "fi": "Korppikotka"
  },
  "xerus": {
    "en": "Ground Squirrel",
    "de": "Erdhörnchen",
    "fr": "Écureuil terrestre",
    "es": "Ardilla terrestre",
    "pt": "Esquilo terrestre",
    "it": "Scoiattolo di terra",
    "nl": "Grondeekhoorn",
    "sv": "Jordekorre",
    "da": "Jordegern",
    "no": "Jordekorn",
    "fi": "Maaorava"
  },
  "window": {
    "en": "Window",
    "de": "Fenster",
    "fr": "Fenêtre",
    "es": "Ventana",
    "pt": "Janela",
    "it": "Finestra",
    "nl": "Raam",
    "sv": "Fönster",
    "da": "Vindue",
    "no": "Vindu",
    "fi": "Ikkuna"
  },
  "necklace": {
    "en": "Necklace",
    "de": "Halskette",
    "fr": "Collier",
    "es": "Collar",
    "pt": "Colar",
    "it": "Collana",
    "nl": "Ketting",
    "sv": "Halsband",
    "da": "Halskæde",
    "no": "Halskjede",
    "fi": "Kaulakoru"
  },
  "utensil": {
    "en": "Utensil",
    "de": "Besteck",
    "fr": "Ustensile",
    "es": "Utensilio",
    "pt": "Utensílio",
    "it": "Utensile",
    "nl": "Bestek",
    "sv": "Redskap",
    "da": "Redskab",
    "no": "Redskap",
    "fi": "Ruokailuväline"
  },
  "addition": {
    "en": "Addition",
    "de": "Addition",
    "fr": "Addition",
    "es": "Suma",
    "pt": "Adição",
    "it": "Addizione",
    "nl": "Optelling",
    "sv": "Addition",
    "da": "Addition",
    "no": "Addisjon",
    "fi": "Yhteenlasku"
  }
};

// Function to update image asset translations
async function updateImageAssetTranslations(assetId, fileName, translations) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/image-assets/${assetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          translations: translations,
          displayName: translations.en || fileName
        }
      })
    });
    
    if (response.ok) {
      console.log(`✓ Updated translations for: ${fileName}`);
      return true;
    } else {
      console.error(`✗ Failed to update ${fileName}:`, response.status);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error updating ${fileName}:`, error);
    return false;
  }
}

async function updateAllTranslations() {
  console.log('===========================================');
  console.log('Updating Image Asset Translations');
  console.log('===========================================\n');
  
  try {
    // Fetch all image assets
    const response = await fetch(`${STRAPI_URL}/api/image-assets?pagination[limit]=100`);
    if (!response.ok) {
      console.error('Failed to fetch image assets');
      return;
    }
    
    const data = await response.json();
    const assets = data.data || [];
    
    console.log(`Found ${assets.length} image assets\n`);
    
    let updatedCount = 0;
    
    for (const asset of assets) {
      const fileName = asset.attributes.fileName;
      const assetId = asset.id;
      
      // Get base name without extension and special characters
      const baseName = fileName.toLowerCase()
        .replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
        .replace(/[-_\s]+/g, '')
        .replace(/\d+$/, ''); // Remove trailing numbers
      
      // Check if we have translations for this image
      let translations = imageTranslations[baseName];
      
      // Try alternative names if not found
      if (!translations) {
        // Try with spaces/dashes removed
        const alternativeName = fileName.toLowerCase()
          .replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
          .replace(/\s+\d+$/, ''); // Remove trailing numbers with space
        translations = imageTranslations[alternativeName];
      }
      
      if (translations) {
        const updated = await updateImageAssetTranslations(assetId, fileName, translations);
        if (updated) {
          updatedCount++;
        }
      } else {
        console.log(`⚠ No translations found for: ${fileName}`);
      }
    }
    
    console.log('\n===========================================');
    console.log('Translation Update Complete!');
    console.log(`Updated ${updatedCount} out of ${assets.length} assets`);
    console.log('===========================================');
    
  } catch (error) {
    console.error('Error during update:', error);
  }
}

// Run the update
updateAllTranslations().catch(console.error);