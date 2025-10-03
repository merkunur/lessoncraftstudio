import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Dictionary of common image words and their translations
const commonTranslations: Record<string, Record<string, string>> = {
  // Animals
  'cat': { de: 'Katze', fr: 'Chat', es: 'Gato', it: 'Gatto', pt: 'Gato', nl: 'Kat', sv: 'Katt', da: 'Kat', no: 'Katt', fi: 'Kissa' },
  'dog': { de: 'Hund', fr: 'Chien', es: 'Perro', it: 'Cane', pt: 'Cachorro', nl: 'Hond', sv: 'Hund', da: 'Hund', no: 'Hund', fi: 'Koira' },
  'bird': { de: 'Vogel', fr: 'Oiseau', es: 'Pájaro', it: 'Uccello', pt: 'Pássaro', nl: 'Vogel', sv: 'Fågel', da: 'Fugl', no: 'Fugl', fi: 'Lintu' },
  'fish': { de: 'Fisch', fr: 'Poisson', es: 'Pez', it: 'Pesce', pt: 'Peixe', nl: 'Vis', sv: 'Fisk', da: 'Fisk', no: 'Fisk', fi: 'Kala' },
  'elephant': { de: 'Elefant', fr: 'Éléphant', es: 'Elefante', it: 'Elefante', pt: 'Elefante', nl: 'Olifant', sv: 'Elefant', da: 'Elefant', no: 'Elefant', fi: 'Norsu' },
  'lion': { de: 'Löwe', fr: 'Lion', es: 'León', it: 'Leone', pt: 'Leão', nl: 'Leeuw', sv: 'Lejon', da: 'Løve', no: 'Løve', fi: 'Leijona' },
  'tiger': { de: 'Tiger', fr: 'Tigre', es: 'Tigre', it: 'Tigre', pt: 'Tigre', nl: 'Tijger', sv: 'Tiger', da: 'Tiger', no: 'Tiger', fi: 'Tiikeri' },
  'bear': { de: 'Bär', fr: 'Ours', es: 'Oso', it: 'Orso', pt: 'Urso', nl: 'Beer', sv: 'Björn', da: 'Bjørn', no: 'Bjørn', fi: 'Karhu' },
  'rabbit': { de: 'Kaninchen', fr: 'Lapin', es: 'Conejo', it: 'Coniglio', pt: 'Coelho', nl: 'Konijn', sv: 'Kanin', da: 'Kanin', no: 'Kanin', fi: 'Kaniini' },
  'monkey': { de: 'Affe', fr: 'Singe', es: 'Mono', it: 'Scimmia', pt: 'Macaco', nl: 'Aap', sv: 'Apa', da: 'Abe', no: 'Ape', fi: 'Apina' },
  'horse': { de: 'Pferd', fr: 'Cheval', es: 'Caballo', it: 'Cavallo', pt: 'Cavalo', nl: 'Paard', sv: 'Häst', da: 'Hest', no: 'Hest', fi: 'Hevonen' },
  'cow': { de: 'Kuh', fr: 'Vache', es: 'Vaca', it: 'Mucca', pt: 'Vaca', nl: 'Koe', sv: 'Ko', da: 'Ko', no: 'Ku', fi: 'Lehmä' },
  'pig': { de: 'Schwein', fr: 'Cochon', es: 'Cerdo', it: 'Maiale', pt: 'Porco', nl: 'Varken', sv: 'Gris', da: 'Gris', no: 'Gris', fi: 'Sika' },
  'sheep': { de: 'Schaf', fr: 'Mouton', es: 'Oveja', it: 'Pecora', pt: 'Ovelha', nl: 'Schaap', sv: 'Får', da: 'Får', no: 'Sau', fi: 'Lammas' },
  'chicken': { de: 'Huhn', fr: 'Poulet', es: 'Pollo', it: 'Pollo', pt: 'Frango', nl: 'Kip', sv: 'Kyckling', da: 'Kylling', no: 'Kylling', fi: 'Kana' },
  'duck': { de: 'Ente', fr: 'Canard', es: 'Pato', it: 'Anatra', pt: 'Pato', nl: 'Eend', sv: 'Anka', da: 'And', no: 'And', fi: 'Ankka' },
  'frog': { de: 'Frosch', fr: 'Grenouille', es: 'Rana', it: 'Rana', pt: 'Sapo', nl: 'Kikker', sv: 'Groda', da: 'Frø', no: 'Frosk', fi: 'Sammakko' },
  'bee': { de: 'Biene', fr: 'Abeille', es: 'Abeja', it: 'Ape', pt: 'Abelha', nl: 'Bij', sv: 'Bi', da: 'Bi', no: 'Bie', fi: 'Mehiläinen' },
  'butterfly': { de: 'Schmetterling', fr: 'Papillon', es: 'Mariposa', it: 'Farfalla', pt: 'Borboleta', nl: 'Vlinder', sv: 'Fjäril', da: 'Sommerfugl', no: 'Sommerfugl', fi: 'Perhonen' },
  'spider': { de: 'Spinne', fr: 'Araignée', es: 'Araña', it: 'Ragno', pt: 'Aranha', nl: 'Spin', sv: 'Spindel', da: 'Edderkop', no: 'Edderkopp', fi: 'Hämähäkki' },
  'snail': { de: 'Schnecke', fr: 'Escargot', es: 'Caracol', it: 'Lumaca', pt: 'Caracol', nl: 'Slak', sv: 'Snigel', da: 'Snegl', no: 'Snegl', fi: 'Etana' },
  'turtle': { de: 'Schildkröte', fr: 'Tortue', es: 'Tortuga', it: 'Tartaruga', pt: 'Tartaruga', nl: 'Schildpad', sv: 'Sköldpadda', da: 'Skildpadde', no: 'Skilpadde', fi: 'Kilpikonna' },
  'snake': { de: 'Schlange', fr: 'Serpent', es: 'Serpiente', it: 'Serpente', pt: 'Cobra', nl: 'Slang', sv: 'Orm', da: 'Slange', no: 'Slange', fi: 'Käärme' },
  'crocodile': { de: 'Krokodil', fr: 'Crocodile', es: 'Cocodrilo', it: 'Coccodrillo', pt: 'Crocodilo', nl: 'Krokodil', sv: 'Krokodil', da: 'Krokodille', no: 'Krokodille', fi: 'Krokotiili' },
  'giraffe': { de: 'Giraffe', fr: 'Girafe', es: 'Jirafa', it: 'Giraffa', pt: 'Girafa', nl: 'Giraf', sv: 'Giraff', da: 'Giraf', no: 'Giraff', fi: 'Kirahvi' },
  'zebra': { de: 'Zebra', fr: 'Zèbre', es: 'Cebra', it: 'Zebra', pt: 'Zebra', nl: 'Zebra', sv: 'Zebra', da: 'Zebra', no: 'Sebra', fi: 'Seepra' },
  'kangaroo': { de: 'Känguru', fr: 'Kangourou', es: 'Canguro', it: 'Canguro', pt: 'Canguru', nl: 'Kangoeroe', sv: 'Känguru', da: 'Kænguru', no: 'Kenguru', fi: 'Kenguru' },
  'penguin': { de: 'Pinguin', fr: 'Pingouin', es: 'Pingüino', it: 'Pinguino', pt: 'Pinguim', nl: 'Pinguïn', sv: 'Pingvin', da: 'Pingvin', no: 'Pingvin', fi: 'Pingviini' },
  'owl': { de: 'Eule', fr: 'Hibou', es: 'Búho', it: 'Gufo', pt: 'Coruja', nl: 'Uil', sv: 'Uggla', da: 'Ugle', no: 'Ugle', fi: 'Pöllö' },
  'parrot': { de: 'Papagei', fr: 'Perroquet', es: 'Loro', it: 'Pappagallo', pt: 'Papagaio', nl: 'Papegaai', sv: 'Papegoja', da: 'Papegøje', no: 'Papegøye', fi: 'Papukaija' },
  'eagle': { de: 'Adler', fr: 'Aigle', es: 'Águila', it: 'Aquila', pt: 'Águia', nl: 'Adelaar', sv: 'Örn', da: 'Ørn', no: 'Ørn', fi: 'Kotka' },
  'dolphin': { de: 'Delfin', fr: 'Dauphin', es: 'Delfín', it: 'Delfino', pt: 'Golfinho', nl: 'Dolfijn', sv: 'Delfin', da: 'Delfin', no: 'Delfin', fi: 'Delfiini' },
  'whale': { de: 'Wal', fr: 'Baleine', es: 'Ballena', it: 'Balena', pt: 'Baleia', nl: 'Walvis', sv: 'Val', da: 'Hval', no: 'Hval', fi: 'Valas' },
  'shark': { de: 'Hai', fr: 'Requin', es: 'Tiburón', it: 'Squalo', pt: 'Tubarão', nl: 'Haai', sv: 'Haj', da: 'Haj', no: 'Hai', fi: 'Hai' },
  'octopus': { de: 'Oktopus', fr: 'Pieuvre', es: 'Pulpo', it: 'Polpo', pt: 'Polvo', nl: 'Octopus', sv: 'Bläckfisk', da: 'Blæksprutte', no: 'Blekksprut', fi: 'Mustekala' },
  'crab': { de: 'Krabbe', fr: 'Crabe', es: 'Cangrejo', it: 'Granchio', pt: 'Caranguejo', nl: 'Krab', sv: 'Krabba', da: 'Krabbe', no: 'Krabbe', fi: 'Rapu' },
  'starfish': { de: 'Seestern', fr: 'Étoile de mer', es: 'Estrella de mar', it: 'Stella marina', pt: 'Estrela-do-mar', nl: 'Zeester', sv: 'Sjöstjärna', da: 'Søstjerne', no: 'Sjøstjerne', fi: 'Meritähti' },
  'jellyfish': { de: 'Qualle', fr: 'Méduse', es: 'Medusa', it: 'Medusa', pt: 'Água-viva', nl: 'Kwal', sv: 'Manet', da: 'Gople', no: 'Manet', fi: 'Meduusa' },
  'seahorse': { de: 'Seepferdchen', fr: 'Hippocampe', es: 'Caballito de mar', it: 'Cavalluccio marino', pt: 'Cavalo-marinho', nl: 'Zeepaardje', sv: 'Sjöhäst', da: 'Søhest', no: 'Sjøhest', fi: 'Merihevonen' },
  'mouse': { de: 'Maus', fr: 'Souris', es: 'Ratón', it: 'Topo', pt: 'Rato', nl: 'Muis', sv: 'Mus', da: 'Mus', no: 'Mus', fi: 'Hiiri' },
  'squirrel': { de: 'Eichhörnchen', fr: 'Écureuil', es: 'Ardilla', it: 'Scoiattolo', pt: 'Esquilo', nl: 'Eekhoorn', sv: 'Ekorre', da: 'Egern', no: 'Ekorn', fi: 'Orava' },
  'hedgehog': { de: 'Igel', fr: 'Hérisson', es: 'Erizo', it: 'Riccio', pt: 'Ouriço', nl: 'Egel', sv: 'Igelkott', da: 'Pindsvin', no: 'Piggsvin', fi: 'Siili' },
  'bat': { de: 'Fledermaus', fr: 'Chauve-souris', es: 'Murciélago', it: 'Pipistrello', pt: 'Morcego', nl: 'Vleermuis', sv: 'Fladdermus', da: 'Flagermus', no: 'Flaggermus', fi: 'Lepakko' },
  'fox': { de: 'Fuchs', fr: 'Renard', es: 'Zorro', it: 'Volpe', pt: 'Raposa', nl: 'Vos', sv: 'Räv', da: 'Ræv', no: 'Rev', fi: 'Kettu' },
  'wolf': { de: 'Wolf', fr: 'Loup', es: 'Lobo', it: 'Lupo', pt: 'Lobo', nl: 'Wolf', sv: 'Varg', da: 'Ulv', no: 'Ulv', fi: 'Susi' },
  'deer': { de: 'Hirsch', fr: 'Cerf', es: 'Ciervo', it: 'Cervo', pt: 'Veado', nl: 'Hert', sv: 'Hjort', da: 'Hjort', no: 'Hjort', fi: 'Peura' },
  'moose': { de: 'Elch', fr: 'Élan', es: 'Alce', it: 'Alce', pt: 'Alce', nl: 'Eland', sv: 'Älg', da: 'Elg', no: 'Elg', fi: 'Hirvi' },
  'reindeer': { de: 'Rentier', fr: 'Renne', es: 'Reno', it: 'Renna', pt: 'Rena', nl: 'Rendier', sv: 'Ren', da: 'Rensdyr', no: 'Rein', fi: 'Poro' },
  'camel': { de: 'Kamel', fr: 'Chameau', es: 'Camello', it: 'Cammello', pt: 'Camelo', nl: 'Kameel', sv: 'Kamel', da: 'Kamel', no: 'Kamel', fi: 'Kameli' },
  'panda': { de: 'Panda', fr: 'Panda', es: 'Panda', it: 'Panda', pt: 'Panda', nl: 'Panda', sv: 'Panda', da: 'Panda', no: 'Panda', fi: 'Panda' },
  'koala': { de: 'Koala', fr: 'Koala', es: 'Koala', it: 'Koala', pt: 'Coala', nl: 'Koala', sv: 'Koala', da: 'Koala', no: 'Koala', fi: 'Koala' },
  'gorilla': { de: 'Gorilla', fr: 'Gorille', es: 'Gorila', it: 'Gorilla', pt: 'Gorila', nl: 'Gorilla', sv: 'Gorilla', da: 'Gorilla', no: 'Gorilla', fi: 'Gorilla' },
  'chimpanzee': { de: 'Schimpanse', fr: 'Chimpanzé', es: 'Chimpancé', it: 'Scimpanzé', pt: 'Chimpanzé', nl: 'Chimpansee', sv: 'Schimpans', da: 'Chimpanse', no: 'Sjimpanse', fi: 'Simpanssi' },
  'hippopotamus': { de: 'Nilpferd', fr: 'Hippopotame', es: 'Hipopótamo', it: 'Ippopotamo', pt: 'Hipopótamo', nl: 'Nijlpaard', sv: 'Flodhäst', da: 'Flodhest', no: 'Flodhest', fi: 'Virtahepo' },
  'rhinoceros': { de: 'Nashorn', fr: 'Rhinocéros', es: 'Rinoceronte', it: 'Rinoceronte', pt: 'Rinoceronte', nl: 'Neushoorn', sv: 'Noshörning', da: 'Næsehorn', no: 'Neshorn', fi: 'Sarvikuono' },
  'llama': { de: 'Lama', fr: 'Lama', es: 'Llama', it: 'Lama', pt: 'Lhama', nl: 'Lama', sv: 'Lama', da: 'Lama', no: 'Lama', fi: 'Laama' },
  'peacock': { de: 'Pfau', fr: 'Paon', es: 'Pavo real', it: 'Pavone', pt: 'Pavão', nl: 'Pauw', sv: 'Påfågel', da: 'Påfugl', no: 'Påfugl', fi: 'Riikinkukko' },
  'flamingo': { de: 'Flamingo', fr: 'Flamant', es: 'Flamenco', it: 'Fenicottero', pt: 'Flamingo', nl: 'Flamingo', sv: 'Flamingo', da: 'Flamingo', no: 'Flamingo', fi: 'Flamingo' },
  'swan': { de: 'Schwan', fr: 'Cygne', es: 'Cisne', it: 'Cigno', pt: 'Cisne', nl: 'Zwaan', sv: 'Svan', da: 'Svane', no: 'Svane', fi: 'Joutsen' },
  'pigeon': { de: 'Taube', fr: 'Pigeon', es: 'Paloma', it: 'Piccione', pt: 'Pombo', nl: 'Duif', sv: 'Duva', da: 'Due', no: 'Due', fi: 'Kyyhkynen' },
  'rooster': { de: 'Hahn', fr: 'Coq', es: 'Gallo', it: 'Gallo', pt: 'Galo', nl: 'Haan', sv: 'Tupp', da: 'Hane', no: 'Hane', fi: 'Kukko' },
  'goat': { de: 'Ziege', fr: 'Chèvre', es: 'Cabra', it: 'Capra', pt: 'Cabra', nl: 'Geit', sv: 'Get', da: 'Ged', no: 'Geit', fi: 'Vuohi' },
  'donkey': { de: 'Esel', fr: 'Âne', es: 'Burro', it: 'Asino', pt: 'Burro', nl: 'Ezel', sv: 'Åsna', da: 'Æsel', no: 'Esel', fi: 'Aasi' },
  'turkey': { de: 'Truthahn', fr: 'Dinde', es: 'Pavo', it: 'Tacchino', pt: 'Peru', nl: 'Kalkoen', sv: 'Kalkon', da: 'Kalkun', no: 'Kalkun', fi: 'Kalkkuna' },
  'goose': { de: 'Gans', fr: 'Oie', es: 'Ganso', it: 'Oca', pt: 'Ganso', nl: 'Gans', sv: 'Gås', da: 'Gås', no: 'Gjess', fi: 'Hanhi' },

  // Colors
  'red': { de: 'Rot', fr: 'Rouge', es: 'Rojo', it: 'Rosso', pt: 'Vermelho', nl: 'Rood', sv: 'Röd', da: 'Rød', no: 'Rød', fi: 'Punainen' },
  'blue': { de: 'Blau', fr: 'Bleu', es: 'Azul', it: 'Blu', pt: 'Azul', nl: 'Blauw', sv: 'Blå', da: 'Blå', no: 'Blå', fi: 'Sininen' },
  'yellow': { de: 'Gelb', fr: 'Jaune', es: 'Amarillo', it: 'Giallo', pt: 'Amarelo', nl: 'Geel', sv: 'Gul', da: 'Gul', no: 'Gul', fi: 'Keltainen' },
  'green': { de: 'Grün', fr: 'Vert', es: 'Verde', it: 'Verde', pt: 'Verde', nl: 'Groen', sv: 'Grön', da: 'Grøn', no: 'Grønn', fi: 'Vihreä' },
  'orange': { de: 'Orange', fr: 'Orange', es: 'Naranja', it: 'Arancione', pt: 'Laranja', nl: 'Oranje', sv: 'Orange', da: 'Orange', no: 'Oransje', fi: 'Oranssi' },
  'purple': { de: 'Lila', fr: 'Violet', es: 'Morado', it: 'Viola', pt: 'Roxo', nl: 'Paars', sv: 'Lila', da: 'Lilla', no: 'Lilla', fi: 'Violetti' },
  'pink': { de: 'Rosa', fr: 'Rose', es: 'Rosa', it: 'Rosa', pt: 'Rosa', nl: 'Roze', sv: 'Rosa', da: 'Lyserød', no: 'Rosa', fi: 'Vaaleanpunainen' },
  'brown': { de: 'Braun', fr: 'Marron', es: 'Marrón', it: 'Marrone', pt: 'Marrom', nl: 'Bruin', sv: 'Brun', da: 'Brun', no: 'Brun', fi: 'Ruskea' },
  'black': { de: 'Schwarz', fr: 'Noir', es: 'Negro', it: 'Nero', pt: 'Preto', nl: 'Zwart', sv: 'Svart', da: 'Sort', no: 'Svart', fi: 'Musta' },
  'white': { de: 'Weiß', fr: 'Blanc', es: 'Blanco', it: 'Bianco', pt: 'Branco', nl: 'Wit', sv: 'Vit', da: 'Hvid', no: 'Hvit', fi: 'Valkoinen' },
  'gray': { de: 'Grau', fr: 'Gris', es: 'Gris', it: 'Grigio', pt: 'Cinza', nl: 'Grijs', sv: 'Grå', da: 'Grå', no: 'Grå', fi: 'Harmaa' },

  // Fruits
  'apple': { de: 'Apfel', fr: 'Pomme', es: 'Manzana', it: 'Mela', pt: 'Maçã', nl: 'Appel', sv: 'Äpple', da: 'Æble', no: 'Eple', fi: 'Omena' },
  'banana': { de: 'Banane', fr: 'Banane', es: 'Plátano', it: 'Banana', pt: 'Banana', nl: 'Banaan', sv: 'Banan', da: 'Banan', no: 'Banan', fi: 'Banaani' },
  'orange': { de: 'Orange', fr: 'Orange', es: 'Naranja', it: 'Arancia', pt: 'Laranja', nl: 'Sinaasappel', sv: 'Apelsin', da: 'Appelsin', no: 'Appelsin', fi: 'Appelsiini' },
  'grape': { de: 'Traube', fr: 'Raisin', es: 'Uva', it: 'Uva', pt: 'Uva', nl: 'Druif', sv: 'Druva', da: 'Drue', no: 'Drue', fi: 'Rypäle' },
  'strawberry': { de: 'Erdbeere', fr: 'Fraise', es: 'Fresa', it: 'Fragola', pt: 'Morango', nl: 'Aardbei', sv: 'Jordgubbe', da: 'Jordbær', no: 'Jordbær', fi: 'Mansikka' },
  'watermelon': { de: 'Wassermelone', fr: 'Pastèque', es: 'Sandía', it: 'Anguria', pt: 'Melancia', nl: 'Watermeloen', sv: 'Vattenmelon', da: 'Vandmelon', no: 'Vannmelon', fi: 'Vesimeloni' },
  'pineapple': { de: 'Ananas', fr: 'Ananas', es: 'Piña', it: 'Ananas', pt: 'Abacaxi', nl: 'Ananas', sv: 'Ananas', da: 'Ananas', no: 'Ananas', fi: 'Ananas' },
  'cherry': { de: 'Kirsche', fr: 'Cerise', es: 'Cereza', it: 'Ciliegia', pt: 'Cereja', nl: 'Kers', sv: 'Körsbär', da: 'Kirsebær', no: 'Kirsebær', fi: 'Kirsikka' },
  'peach': { de: 'Pfirsich', fr: 'Pêche', es: 'Melocotón', it: 'Pesca', pt: 'Pêssego', nl: 'Perzik', sv: 'Persika', da: 'Fersken', no: 'Fersken', fi: 'Persikka' },
  'pear': { de: 'Birne', fr: 'Poire', es: 'Pera', it: 'Pera', pt: 'Pera', nl: 'Peer', sv: 'Päron', da: 'Pære', no: 'Pære', fi: 'Päärynä' },
  'lemon': { de: 'Zitrone', fr: 'Citron', es: 'Limón', it: 'Limone', pt: 'Limão', nl: 'Citroen', sv: 'Citron', da: 'Citron', no: 'Sitron', fi: 'Sitruuna' },
  'kiwi': { de: 'Kiwi', fr: 'Kiwi', es: 'Kiwi', it: 'Kiwi', pt: 'Kiwi', nl: 'Kiwi', sv: 'Kiwi', da: 'Kiwi', no: 'Kiwi', fi: 'Kiivi' },
  'mango': { de: 'Mango', fr: 'Mangue', es: 'Mango', it: 'Mango', pt: 'Manga', nl: 'Mango', sv: 'Mango', da: 'Mango', no: 'Mango', fi: 'Mango' },
  'plum': { de: 'Pflaume', fr: 'Prune', es: 'Ciruela', it: 'Prugna', pt: 'Ameixa', nl: 'Pruim', sv: 'Plommon', da: 'Blomme', no: 'Plomme', fi: 'Luumu' },

  // Vegetables
  'carrot': { de: 'Karotte', fr: 'Carotte', es: 'Zanahoria', it: 'Carota', pt: 'Cenoura', nl: 'Wortel', sv: 'Morot', da: 'Gulerod', no: 'Gulrot', fi: 'Porkkana' },
  'tomato': { de: 'Tomate', fr: 'Tomate', es: 'Tomate', it: 'Pomodoro', pt: 'Tomate', nl: 'Tomaat', sv: 'Tomat', da: 'Tomat', no: 'Tomat', fi: 'Tomaatti' },
  'potato': { de: 'Kartoffel', fr: 'Pomme de terre', es: 'Patata', it: 'Patata', pt: 'Batata', nl: 'Aardappel', sv: 'Potatis', da: 'Kartoffel', no: 'Potet', fi: 'Peruna' },
  'onion': { de: 'Zwiebel', fr: 'Oignon', es: 'Cebolla', it: 'Cipolla', pt: 'Cebola', nl: 'Ui', sv: 'Lök', da: 'Løg', no: 'Løk', fi: 'Sipuli' },
  'cucumber': { de: 'Gurke', fr: 'Concombre', es: 'Pepino', it: 'Cetriolo', pt: 'Pepino', nl: 'Komkommer', sv: 'Gurka', da: 'Agurk', no: 'Agurk', fi: 'Kurkku' },
  'broccoli': { de: 'Brokkoli', fr: 'Brocoli', es: 'Brócoli', it: 'Broccoli', pt: 'Brócolis', nl: 'Broccoli', sv: 'Broccoli', da: 'Broccoli', no: 'Brokkoli', fi: 'Parsakaali' },
  'pepper': { de: 'Paprika', fr: 'Poivron', es: 'Pimiento', it: 'Peperone', pt: 'Pimentão', nl: 'Paprika', sv: 'Paprika', da: 'Peberfrugt', no: 'Paprika', fi: 'Paprika' },
  'lettuce': { de: 'Salat', fr: 'Laitue', es: 'Lechuga', it: 'Lattuga', pt: 'Alface', nl: 'Sla', sv: 'Sallad', da: 'Salat', no: 'Salat', fi: 'Salaatti' },
  'cabbage': { de: 'Kohl', fr: 'Chou', es: 'Repollo', it: 'Cavolo', pt: 'Repolho', nl: 'Kool', sv: 'Kål', da: 'Kål', no: 'Kål', fi: 'Kaali' },
  'corn': { de: 'Mais', fr: 'Maïs', es: 'Maíz', it: 'Mais', pt: 'Milho', nl: 'Maïs', sv: 'Majs', da: 'Majs', no: 'Mais', fi: 'Maissi' },
  'pumpkin': { de: 'Kürbis', fr: 'Citrouille', es: 'Calabaza', it: 'Zucca', pt: 'Abóbora', nl: 'Pompoen', sv: 'Pumpa', da: 'Græskar', no: 'Gresskar', fi: 'Kurpitsa' },
  'mushroom': { de: 'Pilz', fr: 'Champignon', es: 'Champiñón', it: 'Fungo', pt: 'Cogumelo', nl: 'Paddenstoel', sv: 'Svamp', da: 'Svamp', no: 'Sopp', fi: 'Sieni' },
  'peas': { de: 'Erbsen', fr: 'Petits pois', es: 'Guisantes', it: 'Piselli', pt: 'Ervilhas', nl: 'Erwten', sv: 'Ärtor', da: 'Ærter', no: 'Erter', fi: 'Herneet' },
  'beans': { de: 'Bohnen', fr: 'Haricots', es: 'Judías', it: 'Fagioli', pt: 'Feijão', nl: 'Bonen', sv: 'Bönor', da: 'Bønner', no: 'Bønner', fi: 'Pavut' },
  'spinach': { de: 'Spinat', fr: 'Épinard', es: 'Espinaca', it: 'Spinaci', pt: 'Espinafre', nl: 'Spinazie', sv: 'Spenat', da: 'Spinat', no: 'Spinat', fi: 'Pinaatti' },
  'cauliflower': { de: 'Blumenkohl', fr: 'Chou-fleur', es: 'Coliflor', it: 'Cavolfiore', pt: 'Couve-flor', nl: 'Bloemkool', sv: 'Blomkål', da: 'Blomkål', no: 'Blomkål', fi: 'Kukkakaali' },
  'eggplant': { de: 'Aubergine', fr: 'Aubergine', es: 'Berenjena', it: 'Melanzana', pt: 'Berinjela', nl: 'Aubergine', sv: 'Aubergine', da: 'Aubergine', no: 'Aubergine', fi: 'Munakoiso' },
  'zucchini': { de: 'Zucchini', fr: 'Courgette', es: 'Calabacín', it: 'Zucchina', pt: 'Abobrinha', nl: 'Courgette', sv: 'Zucchini', da: 'Squash', no: 'Squash', fi: 'Kesäkurpitsa' },
  'radish': { de: 'Rettich', fr: 'Radis', es: 'Rábano', it: 'Ravanello', pt: 'Rabanete', nl: 'Radijs', sv: 'Rädisa', da: 'Radise', no: 'Reddik', fi: 'Retiisi' },
  'garlic': { de: 'Knoblauch', fr: 'Ail', es: 'Ajo', it: 'Aglio', pt: 'Alho', nl: 'Knoflook', sv: 'Vitlök', da: 'Hvidløg', no: 'Hvitløk', fi: 'Valkosipuli' },
  'celery': { de: 'Sellerie', fr: 'Céleri', es: 'Apio', it: 'Sedano', pt: 'Aipo', nl: 'Selderij', sv: 'Selleri', da: 'Selleri', no: 'Selleri', fi: 'Selleri' },

  // Shapes
  'circle': { de: 'Kreis', fr: 'Cercle', es: 'Círculo', it: 'Cerchio', pt: 'Círculo', nl: 'Cirkel', sv: 'Cirkel', da: 'Cirkel', no: 'Sirkel', fi: 'Ympyrä' },
  'square': { de: 'Quadrat', fr: 'Carré', es: 'Cuadrado', it: 'Quadrato', pt: 'Quadrado', nl: 'Vierkant', sv: 'Kvadrat', da: 'Firkant', no: 'Firkant', fi: 'Neliö' },
  'triangle': { de: 'Dreieck', fr: 'Triangle', es: 'Triángulo', it: 'Triangolo', pt: 'Triângulo', nl: 'Driehoek', sv: 'Triangel', da: 'Trekant', no: 'Trekant', fi: 'Kolmio' },
  'rectangle': { de: 'Rechteck', fr: 'Rectangle', es: 'Rectángulo', it: 'Rettangolo', pt: 'Retângulo', nl: 'Rechthoek', sv: 'Rektangel', da: 'Rektangel', no: 'Rektangel', fi: 'Suorakulmio' },
  'star': { de: 'Stern', fr: 'Étoile', es: 'Estrella', it: 'Stella', pt: 'Estrela', nl: 'Ster', sv: 'Stjärna', da: 'Stjerne', no: 'Stjerne', fi: 'Tähti' },
  'heart': { de: 'Herz', fr: 'Cœur', es: 'Corazón', it: 'Cuore', pt: 'Coração', nl: 'Hart', sv: 'Hjärta', da: 'Hjerte', no: 'Hjerte', fi: 'Sydän' },
  'diamond': { de: 'Raute', fr: 'Losange', es: 'Rombo', it: 'Rombo', pt: 'Losango', nl: 'Ruit', sv: 'Romb', da: 'Rombe', no: 'Rombe', fi: 'Timantti' },
  'oval': { de: 'Oval', fr: 'Ovale', es: 'Óvalo', it: 'Ovale', pt: 'Oval', nl: 'Ovaal', sv: 'Oval', da: 'Oval', no: 'Oval', fi: 'Soikea' },
  'pentagon': { de: 'Fünfeck', fr: 'Pentagone', es: 'Pentágono', it: 'Pentagono', pt: 'Pentágono', nl: 'Vijfhoek', sv: 'Pentagon', da: 'Pentagon', no: 'Pentagon', fi: 'Viisikulmio' },
  'hexagon': { de: 'Sechseck', fr: 'Hexagone', es: 'Hexágono', it: 'Esagono', pt: 'Hexágono', nl: 'Zeshoek', sv: 'Hexagon', da: 'Sekskant', no: 'Sekskant', fi: 'Kuusikulmio' },
  'octagon': { de: 'Achteck', fr: 'Octogone', es: 'Octágono', it: 'Ottagono', pt: 'Octógono', nl: 'Achthoek', sv: 'Oktagon', da: 'Oktagon', no: 'Åttekant', fi: 'Kahdeksankulmio' },
  'cube': { de: 'Würfel', fr: 'Cube', es: 'Cubo', it: 'Cubo', pt: 'Cubo', nl: 'Kubus', sv: 'Kub', da: 'Terning', no: 'Kube', fi: 'Kuutio' },
  'sphere': { de: 'Kugel', fr: 'Sphère', es: 'Esfera', it: 'Sfera', pt: 'Esfera', nl: 'Bol', sv: 'Sfär', da: 'Sfære', no: 'Sfære', fi: 'Pallo' },
  'cylinder': { de: 'Zylinder', fr: 'Cylindre', es: 'Cilindro', it: 'Cilindro', pt: 'Cilindro', nl: 'Cilinder', sv: 'Cylinder', da: 'Cylinder', no: 'Sylinder', fi: 'Sylinteri' },
  'cone': { de: 'Kegel', fr: 'Cône', es: 'Cono', it: 'Cono', pt: 'Cone', nl: 'Kegel', sv: 'Kon', da: 'Kegle', no: 'Kjegle', fi: 'Kartio' },
  'pyramid': { de: 'Pyramide', fr: 'Pyramide', es: 'Pirámide', it: 'Piramide', pt: 'Pirâmide', nl: 'Piramide', sv: 'Pyramid', da: 'Pyramide', no: 'Pyramide', fi: 'Pyramidi' },

  // Objects
  'book': { de: 'Buch', fr: 'Livre', es: 'Libro', it: 'Libro', pt: 'Livro', nl: 'Boek', sv: 'Bok', da: 'Bog', no: 'Bok', fi: 'Kirja' },
  'pen': { de: 'Stift', fr: 'Stylo', es: 'Bolígrafo', it: 'Penna', pt: 'Caneta', nl: 'Pen', sv: 'Penna', da: 'Pen', no: 'Penn', fi: 'Kynä' },
  'pencil': { de: 'Bleistift', fr: 'Crayon', es: 'Lápiz', it: 'Matita', pt: 'Lápis', nl: 'Potlood', sv: 'Blyertspenna', da: 'Blyant', no: 'Blyant', fi: 'Lyijykynä' },
  'eraser': { de: 'Radiergummi', fr: 'Gomme', es: 'Goma de borrar', it: 'Gomma', pt: 'Borracha', nl: 'Gum', sv: 'Suddgummi', da: 'Viskelæder', no: 'Viskelær', fi: 'Pyyhekumi' },
  'ruler': { de: 'Lineal', fr: 'Règle', es: 'Regla', it: 'Righello', pt: 'Régua', nl: 'Liniaal', sv: 'Linjal', da: 'Lineal', no: 'Linjal', fi: 'Viivoitin' },
  'scissors': { de: 'Schere', fr: 'Ciseaux', es: 'Tijeras', it: 'Forbici', pt: 'Tesoura', nl: 'Schaar', sv: 'Sax', da: 'Saks', no: 'Saks', fi: 'Sakset' },
  'glue': { de: 'Kleber', fr: 'Colle', es: 'Pegamento', it: 'Colla', pt: 'Cola', nl: 'Lijm', sv: 'Lim', da: 'Lim', no: 'Lim', fi: 'Liima' },
  'crayon': { de: 'Wachsmalstift', fr: 'Crayon de cire', es: 'Crayón', it: 'Pastello a cera', pt: 'Giz de cera', nl: 'Kleurpotlood', sv: 'Vaxkrita', da: 'Farvekridt', no: 'Fargestift', fi: 'Vahaliitu' },
  'paintbrush': { de: 'Pinsel', fr: 'Pinceau', es: 'Pincel', it: 'Pennello', pt: 'Pincel', nl: 'Kwast', sv: 'Pensel', da: 'Pensel', no: 'Pensel', fi: 'Sivellin' },
  'backpack': { de: 'Rucksack', fr: 'Sac à dos', es: 'Mochila', it: 'Zaino', pt: 'Mochila', nl: 'Rugzak', sv: 'Ryggsäck', da: 'Rygsæk', no: 'Ryggsekk', fi: 'Reppu' },
  'ball': { de: 'Ball', fr: 'Ballon', es: 'Pelota', it: 'Palla', pt: 'Bola', nl: 'Bal', sv: 'Boll', da: 'Bold', no: 'Ball', fi: 'Pallo' },
  'bicycle': { de: 'Fahrrad', fr: 'Vélo', es: 'Bicicleta', it: 'Bicicletta', pt: 'Bicicleta', nl: 'Fiets', sv: 'Cykel', da: 'Cykel', no: 'Sykkel', fi: 'Polkupyörä' },
  'car': { de: 'Auto', fr: 'Voiture', es: 'Coche', it: 'Auto', pt: 'Carro', nl: 'Auto', sv: 'Bil', da: 'Bil', no: 'Bil', fi: 'Auto' },
  'bus': { de: 'Bus', fr: 'Bus', es: 'Autobús', it: 'Autobus', pt: 'Ônibus', nl: 'Bus', sv: 'Buss', da: 'Bus', no: 'Buss', fi: 'Bussi' },
  'train': { de: 'Zug', fr: 'Train', es: 'Tren', it: 'Treno', pt: 'Trem', nl: 'Trein', sv: 'Tåg', da: 'Tog', no: 'Tog', fi: 'Juna' },
  'airplane': { de: 'Flugzeug', fr: 'Avion', es: 'Avión', it: 'Aereo', pt: 'Avião', nl: 'Vliegtuig', sv: 'Flygplan', da: 'Fly', no: 'Fly', fi: 'Lentokone' },
  'boat': { de: 'Boot', fr: 'Bateau', es: 'Barco', it: 'Barca', pt: 'Barco', nl: 'Boot', sv: 'Båt', da: 'Båd', no: 'Båt', fi: 'Vene' },
  'helicopter': { de: 'Hubschrauber', fr: 'Hélicoptère', es: 'Helicóptero', it: 'Elicottero', pt: 'Helicóptero', nl: 'Helikopter', sv: 'Helikopter', da: 'Helikopter', no: 'Helikopter', fi: 'Helikopteri' },
  'rocket': { de: 'Rakete', fr: 'Fusée', es: 'Cohete', it: 'Razzo', pt: 'Foguete', nl: 'Raket', sv: 'Raket', da: 'Raket', no: 'Rakett', fi: 'Raketti' },
  'house': { de: 'Haus', fr: 'Maison', es: 'Casa', it: 'Casa', pt: 'Casa', nl: 'Huis', sv: 'Hus', da: 'Hus', no: 'Hus', fi: 'Talo' },
  'tree': { de: 'Baum', fr: 'Arbre', es: 'Árbol', it: 'Albero', pt: 'Árvore', nl: 'Boom', sv: 'Träd', da: 'Træ', no: 'Tre', fi: 'Puu' },
  'flower': { de: 'Blume', fr: 'Fleur', es: 'Flor', it: 'Fiore', pt: 'Flor', nl: 'Bloem', sv: 'Blomma', da: 'Blomst', no: 'Blomst', fi: 'Kukka' },
  'sun': { de: 'Sonne', fr: 'Soleil', es: 'Sol', it: 'Sole', pt: 'Sol', nl: 'Zon', sv: 'Sol', da: 'Sol', no: 'Sol', fi: 'Aurinko' },
  'moon': { de: 'Mond', fr: 'Lune', es: 'Luna', it: 'Luna', pt: 'Lua', nl: 'Maan', sv: 'Måne', da: 'Måne', no: 'Måne', fi: 'Kuu' },
  'cloud': { de: 'Wolke', fr: 'Nuage', es: 'Nube', it: 'Nuvola', pt: 'Nuvem', nl: 'Wolk', sv: 'Moln', da: 'Sky', no: 'Sky', fi: 'Pilvi' },
  'rain': { de: 'Regen', fr: 'Pluie', es: 'Lluvia', it: 'Pioggia', pt: 'Chuva', nl: 'Regen', sv: 'Regn', da: 'Regn', no: 'Regn', fi: 'Sade' },
  'snow': { de: 'Schnee', fr: 'Neige', es: 'Nieve', it: 'Neve', pt: 'Neve', nl: 'Sneeuw', sv: 'Snö', da: 'Sne', no: 'Snø', fi: 'Lumi' },
  'umbrella': { de: 'Regenschirm', fr: 'Parapluie', es: 'Paraguas', it: 'Ombrello', pt: 'Guarda-chuva', nl: 'Paraplu', sv: 'Paraply', da: 'Paraply', no: 'Paraply', fi: 'Sateenvarjo' },
  'hat': { de: 'Hut', fr: 'Chapeau', es: 'Sombrero', it: 'Cappello', pt: 'Chapéu', nl: 'Hoed', sv: 'Hatt', da: 'Hat', no: 'Hatt', fi: 'Hattu' },
  'shirt': { de: 'Hemd', fr: 'Chemise', es: 'Camisa', it: 'Camicia', pt: 'Camisa', nl: 'Shirt', sv: 'Skjorta', da: 'Skjorte', no: 'Skjorte', fi: 'Paita' },
  'shoe': { de: 'Schuh', fr: 'Chaussure', es: 'Zapato', it: 'Scarpa', pt: 'Sapato', nl: 'Schoen', sv: 'Sko', da: 'Sko', no: 'Sko', fi: 'Kenkä' },
  'sock': { de: 'Socke', fr: 'Chaussette', es: 'Calcetín', it: 'Calzino', pt: 'Meia', nl: 'Sok', sv: 'Strumpa', da: 'Sok', no: 'Sokk', fi: 'Sukka' },
  'dress': { de: 'Kleid', fr: 'Robe', es: 'Vestido', it: 'Vestito', pt: 'Vestido', nl: 'Jurk', sv: 'Klänning', da: 'Kjole', no: 'Kjole', fi: 'Mekko' },
  'pants': { de: 'Hose', fr: 'Pantalon', es: 'Pantalones', it: 'Pantaloni', pt: 'Calças', nl: 'Broek', sv: 'Byxor', da: 'Bukser', no: 'Bukse', fi: 'Housut' },
  'jacket': { de: 'Jacke', fr: 'Veste', es: 'Chaqueta', it: 'Giacca', pt: 'Jaqueta', nl: 'Jas', sv: 'Jacka', da: 'Jakke', no: 'Jakke', fi: 'Takki' },
  'sweater': { de: 'Pullover', fr: 'Pull', es: 'Suéter', it: 'Maglione', pt: 'Suéter', nl: 'Trui', sv: 'Tröja', da: 'Sweater', no: 'Genser', fi: 'Neule' },
  'scarf': { de: 'Schal', fr: 'Écharpe', es: 'Bufanda', it: 'Sciarpa', pt: 'Cachecol', nl: 'Sjaal', sv: 'Halsduk', da: 'Tørklæde', no: 'Skjerf', fi: 'Huivi' },
  'gloves': { de: 'Handschuhe', fr: 'Gants', es: 'Guantes', it: 'Guanti', pt: 'Luvas', nl: 'Handschoenen', sv: 'Handskar', da: 'Handsker', no: 'Hansker', fi: 'Käsineet' },
  'glasses': { de: 'Brille', fr: 'Lunettes', es: 'Gafas', it: 'Occhiali', pt: 'Óculos', nl: 'Bril', sv: 'Glasögon', da: 'Briller', no: 'Briller', fi: 'Lasit' },
  'watch': { de: 'Uhr', fr: 'Montre', es: 'Reloj', it: 'Orologio', pt: 'Relógio', nl: 'Horloge', sv: 'Klocka', da: 'Ur', no: 'Klokke', fi: 'Kello' },
  'clock': { de: 'Uhr', fr: 'Horloge', es: 'Reloj', it: 'Orologio', pt: 'Relógio', nl: 'Klok', sv: 'Klocka', da: 'Ur', no: 'Klokke', fi: 'Kello' },
  'phone': { de: 'Telefon', fr: 'Téléphone', es: 'Teléfono', it: 'Telefono', pt: 'Telefone', nl: 'Telefoon', sv: 'Telefon', da: 'Telefon', no: 'Telefon', fi: 'Puhelin' },
  'computer': { de: 'Computer', fr: 'Ordinateur', es: 'Ordenador', it: 'Computer', pt: 'Computador', nl: 'Computer', sv: 'Dator', da: 'Computer', no: 'Datamaskin', fi: 'Tietokone' },
  'camera': { de: 'Kamera', fr: 'Appareil photo', es: 'Cámara', it: 'Fotocamera', pt: 'Câmera', nl: 'Camera', sv: 'Kamera', da: 'Kamera', no: 'Kamera', fi: 'Kamera' },
  'television': { de: 'Fernseher', fr: 'Télévision', es: 'Televisión', it: 'Televisione', pt: 'Televisão', nl: 'Televisie', sv: 'Tv', da: 'Fjernsyn', no: 'Fjernsyn', fi: 'Televisio' },
  'radio': { de: 'Radio', fr: 'Radio', es: 'Radio', it: 'Radio', pt: 'Rádio', nl: 'Radio', sv: 'Radio', da: 'Radio', no: 'Radio', fi: 'Radio' },
  'lamp': { de: 'Lampe', fr: 'Lampe', es: 'Lámpara', it: 'Lampada', pt: 'Lâmpada', nl: 'Lamp', sv: 'Lampa', da: 'Lampe', no: 'Lampe', fi: 'Lamppu' },
  'bed': { de: 'Bett', fr: 'Lit', es: 'Cama', it: 'Letto', pt: 'Cama', nl: 'Bed', sv: 'Säng', da: 'Seng', no: 'Seng', fi: 'Sänky' },
  'chair': { de: 'Stuhl', fr: 'Chaise', es: 'Silla', it: 'Sedia', pt: 'Cadeira', nl: 'Stoel', sv: 'Stol', da: 'Stol', no: 'Stol', fi: 'Tuoli' },
  'table': { de: 'Tisch', fr: 'Table', es: 'Mesa', it: 'Tavolo', pt: 'Mesa', nl: 'Tafel', sv: 'Bord', da: 'Bord', no: 'Bord', fi: 'Pöytä' },
  'door': { de: 'Tür', fr: 'Porte', es: 'Puerta', it: 'Porta', pt: 'Porta', nl: 'Deur', sv: 'Dörr', da: 'Dør', no: 'Dør', fi: 'Ovi' },
  'window': { de: 'Fenster', fr: 'Fenêtre', es: 'Ventana', it: 'Finestra', pt: 'Janela', nl: 'Raam', sv: 'Fönster', da: 'Vindue', no: 'Vindu', fi: 'Ikkuna' },
  'spoon': { de: 'Löffel', fr: 'Cuillère', es: 'Cuchara', it: 'Cucchiaio', pt: 'Colher', nl: 'Lepel', sv: 'Sked', da: 'Ske', no: 'Skje', fi: 'Lusikka' },
  'fork': { de: 'Gabel', fr: 'Fourchette', es: 'Tenedor', it: 'Forchetta', pt: 'Garfo', nl: 'Vork', sv: 'Gaffel', da: 'Gaffel', no: 'Gaffel', fi: 'Haarukka' },
  'knife': { de: 'Messer', fr: 'Couteau', es: 'Cuchillo', it: 'Coltello', pt: 'Faca', nl: 'Mes', sv: 'Kniv', da: 'Kniv', no: 'Kniv', fi: 'Veitsi' },
  'plate': { de: 'Teller', fr: 'Assiette', es: 'Plato', it: 'Piatto', pt: 'Prato', nl: 'Bord', sv: 'Tallrik', da: 'Tallerken', no: 'Tallerken', fi: 'Lautanen' },
  'cup': { de: 'Tasse', fr: 'Tasse', es: 'Taza', it: 'Tazza', pt: 'Xícara', nl: 'Kopje', sv: 'Kopp', da: 'Kop', no: 'Kopp', fi: 'Kuppi' },
  'glass': { de: 'Glas', fr: 'Verre', es: 'Vaso', it: 'Bicchiere', pt: 'Copo', nl: 'Glas', sv: 'Glas', da: 'Glas', no: 'Glass', fi: 'Lasi' },
  'bottle': { de: 'Flasche', fr: 'Bouteille', es: 'Botella', it: 'Bottiglia', pt: 'Garrafa', nl: 'Fles', sv: 'Flaska', da: 'Flaske', no: 'Flaske', fi: 'Pullo' },
  'bowl': { de: 'Schüssel', fr: 'Bol', es: 'Tazón', it: 'Ciotola', pt: 'Tigela', nl: 'Kom', sv: 'Skål', da: 'Skål', no: 'Bolle', fi: 'Kulho' },
  'pot': { de: 'Topf', fr: 'Pot', es: 'Olla', it: 'Pentola', pt: 'Panela', nl: 'Pan', sv: 'Kastrull', da: 'Gryde', no: 'Gryte', fi: 'Pata' },
  'pan': { de: 'Pfanne', fr: 'Poêle', es: 'Sartén', it: 'Padella', pt: 'Frigideira', nl: 'Koekenpan', sv: 'Stekpanna', da: 'Pande', no: 'Panne', fi: 'Pannu' },
  'oven': { de: 'Ofen', fr: 'Four', es: 'Horno', it: 'Forno', pt: 'Forno', nl: 'Oven', sv: 'Ugn', da: 'Ovn', no: 'Ovn', fi: 'Uuni' },
  'refrigerator': { de: 'Kühlschrank', fr: 'Réfrigérateur', es: 'Refrigerador', it: 'Frigorifero', pt: 'Geladeira', nl: 'Koelkast', sv: 'Kylskåp', da: 'Køleskab', no: 'Kjøleskap', fi: 'Jääkaappi' },
  'microwave': { de: 'Mikrowelle', fr: 'Micro-ondes', es: 'Microondas', it: 'Microonde', pt: 'Micro-ondas', nl: 'Magnetron', sv: 'Mikrovågsugn', da: 'Mikrobølgeovn', no: 'Mikrobølgeovn', fi: 'Mikroaaltouuni' },
  'toaster': { de: 'Toaster', fr: 'Grille-pain', es: 'Tostadora', it: 'Tostapane', pt: 'Torradeira', nl: 'Broodrooster', sv: 'Brödrost', da: 'Brødrister', no: 'Brødrister', fi: 'Leivänpaahdin' },
  'kettle': { de: 'Wasserkocher', fr: 'Bouilloire', es: 'Tetera', it: 'Bollitore', pt: 'Chaleira', nl: 'Waterkoker', sv: 'Vattenkokare', da: 'Kedel', no: 'Vannkoker', fi: 'Vedenkeitin' },
  'blender': { de: 'Mixer', fr: 'Mixeur', es: 'Batidora', it: 'Frullatore', pt: 'Liquidificador', nl: 'Mixer', sv: 'Mixer', da: 'Blender', no: 'Mikser', fi: 'Tehosekoitin' },
  'bread': { de: 'Brot', fr: 'Pain', es: 'Pan', it: 'Pane', pt: 'Pão', nl: 'Brood', sv: 'Bröd', da: 'Brød', no: 'Brød', fi: 'Leipä' },
  'cheese': { de: 'Käse', fr: 'Fromage', es: 'Queso', it: 'Formaggio', pt: 'Queijo', nl: 'Kaas', sv: 'Ost', da: 'Ost', no: 'Ost', fi: 'Juusto' },
  'milk': { de: 'Milch', fr: 'Lait', es: 'Leche', it: 'Latte', pt: 'Leite', nl: 'Melk', sv: 'Mjölk', da: 'Mælk', no: 'Melk', fi: 'Maito' },
  'egg': { de: 'Ei', fr: 'Œuf', es: 'Huevo', it: 'Uovo', pt: 'Ovo', nl: 'Ei', sv: 'Ägg', da: 'Æg', no: 'Egg', fi: 'Muna' },
  'butter': { de: 'Butter', fr: 'Beurre', es: 'Mantequilla', it: 'Burro', pt: 'Manteiga', nl: 'Boter', sv: 'Smör', da: 'Smør', no: 'Smør', fi: 'Voi' },
  'water': { de: 'Wasser', fr: 'Eau', es: 'Agua', it: 'Acqua', pt: 'Água', nl: 'Water', sv: 'Vatten', da: 'Vand', no: 'Vann', fi: 'Vesi' },
  'juice': { de: 'Saft', fr: 'Jus', es: 'Jugo', it: 'Succo', pt: 'Suco', nl: 'Sap', sv: 'Juice', da: 'Juice', no: 'Juice', fi: 'Mehu' },
  'coffee': { de: 'Kaffee', fr: 'Café', es: 'Café', it: 'Caffè', pt: 'Café', nl: 'Koffie', sv: 'Kaffe', da: 'Kaffe', no: 'Kaffe', fi: 'Kahvi' },
  'tea': { de: 'Tee', fr: 'Thé', es: 'Té', it: 'Tè', pt: 'Chá', nl: 'Thee', sv: 'Te', da: 'Te', no: 'Te', fi: 'Tee' },
  'cake': { de: 'Kuchen', fr: 'Gâteau', es: 'Pastel', it: 'Torta', pt: 'Bolo', nl: 'Taart', sv: 'Tårta', da: 'Kage', no: 'Kake', fi: 'Kakku' },
  'cookie': { de: 'Keks', fr: 'Biscuit', es: 'Galleta', it: 'Biscotto', pt: 'Biscoito', nl: 'Koekje', sv: 'Kaka', da: 'Kiks', no: 'Kjeks', fi: 'Keksi' },
  'candy': { de: 'Bonbon', fr: 'Bonbon', es: 'Caramelo', it: 'Caramella', pt: 'Doce', nl: 'Snoep', sv: 'Godis', da: 'Slik', no: 'Godteri', fi: 'Karkki' },
  'ice cream': { de: 'Eis', fr: 'Glace', es: 'Helado', it: 'Gelato', pt: 'Sorvete', nl: 'IJs', sv: 'Glass', da: 'Is', no: 'Iskrem', fi: 'Jäätelö' },
  'pizza': { de: 'Pizza', fr: 'Pizza', es: 'Pizza', it: 'Pizza', pt: 'Pizza', nl: 'Pizza', sv: 'Pizza', da: 'Pizza', no: 'Pizza', fi: 'Pizza' },
  'burger': { de: 'Burger', fr: 'Hamburger', es: 'Hamburguesa', it: 'Hamburger', pt: 'Hambúrguer', nl: 'Hamburger', sv: 'Hamburgare', da: 'Burger', no: 'Burger', fi: 'Hampurilainen' },
  'sandwich': { de: 'Sandwich', fr: 'Sandwich', es: 'Sándwich', it: 'Panino', pt: 'Sanduíche', nl: 'Boterham', sv: 'Smörgås', da: 'Sandwich', no: 'Smørbrød', fi: 'Voileipä' },
  'salad': { de: 'Salat', fr: 'Salade', es: 'Ensalada', it: 'Insalata', pt: 'Salada', nl: 'Salade', sv: 'Sallad', da: 'Salat', no: 'Salat', fi: 'Salaatti' },
  'soup': { de: 'Suppe', fr: 'Soupe', es: 'Sopa', it: 'Zuppa', pt: 'Sopa', nl: 'Soep', sv: 'Soppa', da: 'Suppe', no: 'Suppe', fi: 'Keitto' },
  'rice': { de: 'Reis', fr: 'Riz', es: 'Arroz', it: 'Riso', pt: 'Arroz', nl: 'Rijst', sv: 'Ris', da: 'Ris', no: 'Ris', fi: 'Riisi' },
  'pasta': { de: 'Nudeln', fr: 'Pâtes', es: 'Pasta', it: 'Pasta', pt: 'Massa', nl: 'Pasta', sv: 'Pasta', da: 'Pasta', no: 'Pasta', fi: 'Pasta' },
  'meat': { de: 'Fleisch', fr: 'Viande', es: 'Carne', it: 'Carne', pt: 'Carne', nl: 'Vlees', sv: 'Kött', da: 'Kød', no: 'Kjøtt', fi: 'Liha' },
  'chicken': { de: 'Hähnchen', fr: 'Poulet', es: 'Pollo', it: 'Pollo', pt: 'Frango', nl: 'Kip', sv: 'Kyckling', da: 'Kylling', no: 'Kylling', fi: 'Kana' },
  'bacon': { de: 'Speck', fr: 'Bacon', es: 'Tocino', it: 'Pancetta', pt: 'Bacon', nl: 'Spek', sv: 'Bacon', da: 'Bacon', no: 'Bacon', fi: 'Pekoni' },
  'sausage': { de: 'Wurst', fr: 'Saucisse', es: 'Salchicha', it: 'Salsiccia', pt: 'Salsicha', nl: 'Worst', sv: 'Korv', da: 'Pølse', no: 'Pølse', fi: 'Makkara' },
  'ham': { de: 'Schinken', fr: 'Jambon', es: 'Jamón', it: 'Prosciutto', pt: 'Presunto', nl: 'Ham', sv: 'Skinka', da: 'Skinke', no: 'Skinke', fi: 'Kinkku' },
  'hot dog': { de: 'Hot Dog', fr: 'Hot dog', es: 'Perrito caliente', it: 'Hot dog', pt: 'Cachorro-quente', nl: 'Hotdog', sv: 'Korv', da: 'Hotdog', no: 'Pølse', fi: 'Hodari' },
  'taco': { de: 'Taco', fr: 'Taco', es: 'Taco', it: 'Taco', pt: 'Taco', nl: 'Taco', sv: 'Taco', da: 'Taco', no: 'Taco', fi: 'Taco' },
  'sushi': { de: 'Sushi', fr: 'Sushi', es: 'Sushi', it: 'Sushi', pt: 'Sushi', nl: 'Sushi', sv: 'Sushi', da: 'Sushi', no: 'Sushi', fi: 'Sushi' },
  'noodles': { de: 'Nudeln', fr: 'Nouilles', es: 'Fideos', it: 'Tagliatelle', pt: 'Macarrão', nl: 'Noedels', sv: 'Nudlar', da: 'Nudler', no: 'Nudler', fi: 'Nuudelit' },

  // Body parts
  'head': { de: 'Kopf', fr: 'Tête', es: 'Cabeza', it: 'Testa', pt: 'Cabeça', nl: 'Hoofd', sv: 'Huvud', da: 'Hoved', no: 'Hode', fi: 'Pää' },
  'eye': { de: 'Auge', fr: 'Œil', es: 'Ojo', it: 'Occhio', pt: 'Olho', nl: 'Oog', sv: 'Öga', da: 'Øje', no: 'Øye', fi: 'Silmä' },
  'ear': { de: 'Ohr', fr: 'Oreille', es: 'Oreja', it: 'Orecchio', pt: 'Orelha', nl: 'Oor', sv: 'Öra', da: 'Øre', no: 'Øre', fi: 'Korva' },
  'nose': { de: 'Nase', fr: 'Nez', es: 'Nariz', it: 'Naso', pt: 'Nariz', nl: 'Neus', sv: 'Näsa', da: 'Næse', no: 'Nese', fi: 'Nenä' },
  'mouth': { de: 'Mund', fr: 'Bouche', es: 'Boca', it: 'Bocca', pt: 'Boca', nl: 'Mond', sv: 'Mun', da: 'Mund', no: 'Munn', fi: 'Suu' },
  'teeth': { de: 'Zähne', fr: 'Dents', es: 'Dientes', it: 'Denti', pt: 'Dentes', nl: 'Tanden', sv: 'Tänder', da: 'Tænder', no: 'Tenner', fi: 'Hampaat' },
  'tongue': { de: 'Zunge', fr: 'Langue', es: 'Lengua', it: 'Lingua', pt: 'Língua', nl: 'Tong', sv: 'Tunga', da: 'Tunge', no: 'Tunge', fi: 'Kieli' },
  'face': { de: 'Gesicht', fr: 'Visage', es: 'Cara', it: 'Viso', pt: 'Rosto', nl: 'Gezicht', sv: 'Ansikte', da: 'Ansigt', no: 'Ansikt', fi: 'Kasvot' },
  'hair': { de: 'Haar', fr: 'Cheveux', es: 'Pelo', it: 'Capelli', pt: 'Cabelo', nl: 'Haar', sv: 'Hår', da: 'Hår', no: 'Hår', fi: 'Hiukset' },
  'neck': { de: 'Hals', fr: 'Cou', es: 'Cuello', it: 'Collo', pt: 'Pescoço', nl: 'Nek', sv: 'Hals', da: 'Hals', no: 'Nakke', fi: 'Kaula' },
  'shoulder': { de: 'Schulter', fr: 'Épaule', es: 'Hombro', it: 'Spalla', pt: 'Ombro', nl: 'Schouder', sv: 'Axel', da: 'Skulder', no: 'Skulder', fi: 'Olkapää' },
  'arm': { de: 'Arm', fr: 'Bras', es: 'Brazo', it: 'Braccio', pt: 'Braço', nl: 'Arm', sv: 'Arm', da: 'Arm', no: 'Arm', fi: 'Käsivarsi' },
  'elbow': { de: 'Ellbogen', fr: 'Coude', es: 'Codo', it: 'Gomito', pt: 'Cotovelo', nl: 'Elleboog', sv: 'Armbåge', da: 'Albue', no: 'Albue', fi: 'Kyynärpää' },
  'hand': { de: 'Hand', fr: 'Main', es: 'Mano', it: 'Mano', pt: 'Mão', nl: 'Hand', sv: 'Hand', da: 'Hånd', no: 'Hånd', fi: 'Käsi' },
  'finger': { de: 'Finger', fr: 'Doigt', es: 'Dedo', it: 'Dito', pt: 'Dedo', nl: 'Vinger', sv: 'Finger', da: 'Finger', no: 'Finger', fi: 'Sormi' },
  'thumb': { de: 'Daumen', fr: 'Pouce', es: 'Pulgar', it: 'Pollice', pt: 'Polegar', nl: 'Duim', sv: 'Tumme', da: 'Tommelfinger', no: 'Tommel', fi: 'Peukalo' },
  'chest': { de: 'Brust', fr: 'Poitrine', es: 'Pecho', it: 'Petto', pt: 'Peito', nl: 'Borst', sv: 'Bröst', da: 'Bryst', no: 'Bryst', fi: 'Rinta' },
  'stomach': { de: 'Bauch', fr: 'Ventre', es: 'Estómago', it: 'Pancia', pt: 'Barriga', nl: 'Buik', sv: 'Mage', da: 'Mave', no: 'Mage', fi: 'Vatsa' },
  'back': { de: 'Rücken', fr: 'Dos', es: 'Espalda', it: 'Schiena', pt: 'Costas', nl: 'Rug', sv: 'Rygg', da: 'Ryg', no: 'Rygg', fi: 'Selkä' },
  'leg': { de: 'Bein', fr: 'Jambe', es: 'Pierna', it: 'Gamba', pt: 'Perna', nl: 'Been', sv: 'Ben', da: 'Ben', no: 'Bein', fi: 'Jalka' },
  'knee': { de: 'Knie', fr: 'Genou', es: 'Rodilla', it: 'Ginocchio', pt: 'Joelho', nl: 'Knie', sv: 'Knä', da: 'Knæ', no: 'Kne', fi: 'Polvi' },
  'foot': { de: 'Fuß', fr: 'Pied', es: 'Pie', it: 'Piede', pt: 'Pé', nl: 'Voet', sv: 'Fot', da: 'Fod', no: 'Fot', fi: 'Jalka' },
  'toe': { de: 'Zeh', fr: 'Orteil', es: 'Dedo del pie', it: 'Dito del piede', pt: 'Dedo do pé', nl: 'Teen', sv: 'Tå', da: 'Tå', no: 'Tå', fi: 'Varvas' },
  'ankle': { de: 'Knöchel', fr: 'Cheville', es: 'Tobillo', it: 'Caviglia', pt: 'Tornozelo', nl: 'Enkel', sv: 'Ankel', da: 'Ankel', no: 'Ankel', fi: 'Nilkka' },
  'wrist': { de: 'Handgelenk', fr: 'Poignet', es: 'Muñeca', it: 'Polso', pt: 'Pulso', nl: 'Pols', sv: 'Handled', da: 'Håndled', no: 'Håndledd', fi: 'Ranne' },
  'hip': { de: 'Hüfte', fr: 'Hanche', es: 'Cadera', it: 'Anca', pt: 'Quadril', nl: 'Heup', sv: 'Höft', da: 'Hofte', no: 'Hofte', fi: 'Lonkka' },
};

// Function to translate a single word using the dictionary
function translateWord(word: string, targetLang: string): string | null {
  const lowerWord = word.toLowerCase().trim();

  // Check if we have a direct translation
  if (commonTranslations[lowerWord]) {
    return commonTranslations[lowerWord][targetLang] || null;
  }

  // Check for multi-word phrases (like "ice cream")
  for (const key in commonTranslations) {
    if (lowerWord.includes(key) && commonTranslations[key][targetLang]) {
      return commonTranslations[key][targetLang];
    }
  }

  return null;
}

// Function to translate image name to all languages
function translateImageName(englishName: string): Record<string, string> {
  const translations: Record<string, string> = { en: englishName };
  const languages = ['de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

  for (const lang of languages) {
    const translation = translateWord(englishName, lang);
    if (translation) {
      translations[lang] = translation;
    } else {
      // If no translation found, keep the English name
      translations[lang] = englishName;
    }
  }

  return translations;
}

async function updateImageTranslations() {
  console.log('🌍 Starting image translation process...\n');

  try {
    // Get all images from database
    const images = await prisma.imageLibraryItem.findMany({
      orderBy: { createdAt: 'asc' }
    });

    console.log(`Found ${images.length} images to process\n`);

    let updatedCount = 0;
    let alreadyTranslatedCount = 0;
    let noTranslationCount = 0;

    for (const image of images) {
      const translations = image.translations as Record<string, string>;

      // Check if already has translations for all languages
      const hasAllTranslations = translations.en &&
        translations.de && translations.fr && translations.es &&
        translations.it && translations.pt && translations.nl &&
        translations.sv && translations.da && translations.no && translations.fi;

      if (hasAllTranslations) {
        alreadyTranslatedCount++;
        process.stdout.write(`   ✓ ${translations.en} - already translated\r`);
        continue;
      }

      // Get English name
      const englishName = translations.en || image.filename.replace(/\.(png|jpe?g|gif|svg)$/i, '').replace(/[-_]/g, ' ');

      // Generate translations
      const newTranslations = translateImageName(englishName);

      // Check if we found translations (not just English)
      const foundTranslations = Object.keys(newTranslations).length > 1;

      if (!foundTranslations) {
        noTranslationCount++;
        console.log(`   ⚠ No translation found for: ${englishName}`);
        continue;
      }

      // Update database
      await prisma.imageLibraryItem.update({
        where: { id: image.id },
        data: { translations: newTranslations }
      });

      updatedCount++;
      console.log(`   ✓ ${englishName} → ${Object.keys(newTranslations).length} languages`);
    }

    console.log(`\n\n✅ Translation complete!`);
    console.log(`   Updated: ${updatedCount}`);
    console.log(`   Already translated: ${alreadyTranslatedCount}`);
    console.log(`   No translation found: ${noTranslationCount}`);
    console.log(`   Total processed: ${images.length}`);

  } catch (error) {
    console.error('❌ Translation failed:', error);
    throw error;
  }
}

updateImageTranslations()
  .catch((e) => {
    console.error('❌ Script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
