// Comprehensive translation dictionary for themes and images
// Supports 11 languages: en, de, fr, es, pt, it, nl, sv, da, no, fi

const themeTranslations = {
  // Main themes
  'alphabet': {
    'en': 'Alphabet', 'de': 'Alphabet', 'fr': 'Alphabet', 'es': 'Alfabeto', 
    'pt': 'Alfabeto', 'it': 'Alfabeto', 'nl': 'Alfabet', 'sv': 'Alfabet', 
    'da': 'Alfabet', 'no': 'Alfabet', 'fi': 'Aakkoset'
  },
  'animals': {
    'en': 'Animals', 'de': 'Tiere', 'fr': 'Animaux', 'es': 'Animales',
    'pt': 'Animais', 'it': 'Animali', 'nl': 'Dieren', 'sv': 'Djur',
    'da': 'Dyr', 'no': 'Dyr', 'fi': 'Eläimet'
  },
  'coloring': {
    'en': 'Coloring', 'de': 'Ausmalen', 'fr': 'Coloriage', 'es': 'Colorear',
    'pt': 'Colorir', 'it': 'Colorare', 'nl': 'Kleuren', 'sv': 'Färgläggning',
    'da': 'Farvelægning', 'no': 'Fargelegging', 'fi': 'Värittäminen'
  },
  'drawing lines': {
    'en': 'Drawing Lines', 'de': 'Linien zeichnen', 'fr': 'Tracer des lignes', 'es': 'Dibujar líneas',
    'pt': 'Desenhar linhas', 'it': 'Disegnare linee', 'nl': 'Lijnen tekenen', 'sv': 'Rita linjer',
    'da': 'Tegne linjer', 'no': 'Tegne linjer', 'fi': 'Viivojen piirtäminen'
  },
  'food': {
    'en': 'Food', 'de': 'Essen', 'fr': 'Nourriture', 'es': 'Comida',
    'pt': 'Comida', 'it': 'Cibo', 'nl': 'Eten', 'sv': 'Mat',
    'da': 'Mad', 'no': 'Mat', 'fi': 'Ruoka'
  },
  'furniture': {
    'en': 'Furniture', 'de': 'Möbel', 'fr': 'Meubles', 'es': 'Muebles',
    'pt': 'Móveis', 'it': 'Mobili', 'nl': 'Meubels', 'sv': 'Möbler',
    'da': 'Møbler', 'no': 'Møbler', 'fi': 'Huonekalut'
  },
  'general': {
    'en': 'General', 'de': 'Allgemein', 'fr': 'Général', 'es': 'General',
    'pt': 'Geral', 'it': 'Generale', 'nl': 'Algemeen', 'sv': 'Allmän',
    'da': 'Generel', 'no': 'Generell', 'fi': 'Yleinen'
  },
  'icons': {
    'en': 'Icons', 'de': 'Symbole', 'fr': 'Icônes', 'es': 'Iconos',
    'pt': 'Ícones', 'it': 'Icone', 'nl': 'Pictogrammen', 'sv': 'Ikoner',
    'da': 'Ikoner', 'no': 'Ikoner', 'fi': 'Kuvakkeet'
  },
  'miscellaneous': {
    'en': 'Miscellaneous', 'de': 'Verschiedenes', 'fr': 'Divers', 'es': 'Varios',
    'pt': 'Diversos', 'it': 'Vari', 'nl': 'Diversen', 'sv': 'Övrigt',
    'da': 'Diverse', 'no': 'Diverse', 'fi': 'Sekalaiset'
  },
  'new': {
    'en': 'New', 'de': 'Neu', 'fr': 'Nouveau', 'es': 'Nuevo',
    'pt': 'Novo', 'it': 'Nuovo', 'nl': 'Nieuw', 'sv': 'Ny',
    'da': 'Ny', 'no': 'Ny', 'fi': 'Uusi'
  },
  'object': {
    'en': 'Object', 'de': 'Gegenstand', 'fr': 'Objet', 'es': 'Objeto',
    'pt': 'Objeto', 'it': 'Oggetto', 'nl': 'Voorwerp', 'sv': 'Föremål',
    'da': 'Genstand', 'no': 'Gjenstand', 'fi': 'Esine'
  },
  'prepositions': {
    'en': 'Prepositions', 'de': 'Präpositionen', 'fr': 'Prépositions', 'es': 'Preposiciones',
    'pt': 'Preposições', 'it': 'Preposizioni', 'nl': 'Voorzetsels', 'sv': 'Prepositioner',
    'da': 'Præpositioner', 'no': 'Preposisjoner', 'fi': 'Prepositiot'
  },
  'symbols': {
    'en': 'Symbols', 'de': 'Symbole', 'fr': 'Symboles', 'es': 'Símbolos',
    'pt': 'Símbolos', 'it': 'Simboli', 'nl': 'Symbolen', 'sv': 'Symboler',
    'da': 'Symboler', 'no': 'Symboler', 'fi': 'Symbolit'
  },
  'alphabetsvg': {
    'en': 'Alphabet SVG', 'de': 'Alphabet SVG', 'fr': 'Alphabet SVG', 'es': 'Alfabeto SVG',
    'pt': 'Alfabeto SVG', 'it': 'Alfabeto SVG', 'nl': 'Alfabet SVG', 'sv': 'Alfabet SVG',
    'da': 'Alfabet SVG', 'no': 'Alfabet SVG', 'fi': 'Aakkoset SVG'
  }
};

const imageTranslations = {
  // Animals
  'cat': { 'en': 'Cat', 'de': 'Katze', 'fr': 'Chat', 'es': 'Gato', 'pt': 'Gato', 'it': 'Gatto', 'nl': 'Kat', 'sv': 'Katt', 'da': 'Kat', 'no': 'Katt', 'fi': 'Kissa' },
  'dog': { 'en': 'Dog', 'de': 'Hund', 'fr': 'Chien', 'es': 'Perro', 'pt': 'Cão', 'it': 'Cane', 'nl': 'Hond', 'sv': 'Hund', 'da': 'Hund', 'no': 'Hund', 'fi': 'Koira' },
  'bird': { 'en': 'Bird', 'de': 'Vogel', 'fr': 'Oiseau', 'es': 'Pájaro', 'pt': 'Pássaro', 'it': 'Uccello', 'nl': 'Vogel', 'sv': 'Fågel', 'da': 'Fugl', 'no': 'Fugl', 'fi': 'Lintu' },
  'fish': { 'en': 'Fish', 'de': 'Fisch', 'fr': 'Poisson', 'es': 'Pez', 'pt': 'Peixe', 'it': 'Pesce', 'nl': 'Vis', 'sv': 'Fisk', 'da': 'Fisk', 'no': 'Fisk', 'fi': 'Kala' },
  'elephant': { 'en': 'Elephant', 'de': 'Elefant', 'fr': 'Éléphant', 'es': 'Elefante', 'pt': 'Elefante', 'it': 'Elefante', 'nl': 'Olifant', 'sv': 'Elefant', 'da': 'Elefant', 'no': 'Elefant', 'fi': 'Norsu' },
  
  // Food  
  'apple': { 'en': 'Apple', 'de': 'Apfel', 'fr': 'Pomme', 'es': 'Manzana', 'pt': 'Maçã', 'it': 'Mela', 'nl': 'Appel', 'sv': 'Äpple', 'da': 'Æble', 'no': 'Eple', 'fi': 'Omena' },
  'banana': { 'en': 'Banana', 'de': 'Banane', 'fr': 'Banane', 'es': 'Plátano', 'pt': 'Banana', 'it': 'Banana', 'nl': 'Banaan', 'sv': 'Banan', 'da': 'Banan', 'no': 'Banan', 'fi': 'Banaani' },
  'bread': { 'en': 'Bread', 'de': 'Brot', 'fr': 'Pain', 'es': 'Pan', 'pt': 'Pão', 'it': 'Pane', 'nl': 'Brood', 'sv': 'Bröd', 'da': 'Brød', 'no': 'Brød', 'fi': 'Leipä' },
  'pizza': { 'en': 'Pizza', 'de': 'Pizza', 'fr': 'Pizza', 'es': 'Pizza', 'pt': 'Pizza', 'it': 'Pizza', 'nl': 'Pizza', 'sv': 'Pizza', 'da': 'Pizza', 'no': 'Pizza', 'fi': 'Pizza' },
  
  // Transportation
  'car': { 'en': 'Car', 'de': 'Auto', 'fr': 'Voiture', 'es': 'Coche', 'pt': 'Carro', 'it': 'Auto', 'nl': 'Auto', 'sv': 'Bil', 'da': 'Bil', 'no': 'Bil', 'fi': 'Auto' },
  'bus': { 'en': 'Bus', 'de': 'Bus', 'fr': 'Bus', 'es': 'Autobús', 'pt': 'Ônibus', 'it': 'Autobus', 'nl': 'Bus', 'sv': 'Buss', 'da': 'Bus', 'no': 'Buss', 'fi': 'Bussi' },
  'train': { 'en': 'Train', 'de': 'Zug', 'fr': 'Train', 'es': 'Tren', 'pt': 'Trem', 'it': 'Treno', 'nl': 'Trein', 'sv': 'Tåg', 'da': 'Tog', 'no': 'Tog', 'fi': 'Juna' },
  
  // School
  'book': { 'en': 'Book', 'de': 'Buch', 'fr': 'Livre', 'es': 'Libro', 'pt': 'Livro', 'it': 'Libro', 'nl': 'Boek', 'sv': 'Bok', 'da': 'Bog', 'no': 'Bok', 'fi': 'Kirja' },
  'pencil': { 'en': 'Pencil', 'de': 'Bleistift', 'fr': 'Crayon', 'es': 'Lápiz', 'pt': 'Lápis', 'it': 'Matita', 'nl': 'Potlood', 'sv': 'Penna', 'da': 'Blyant', 'no': 'Blyant', 'fi': 'Kynä' },
  'desk': { 'en': 'Desk', 'de': 'Schreibtisch', 'fr': 'Bureau', 'es': 'Escritorio', 'pt': 'Mesa', 'it': 'Scrivania', 'nl': 'Bureau', 'sv': 'Skrivbord', 'da': 'Skrivebord', 'no': 'Pult', 'fi': 'Pöytä' },
  
  // Furniture
  'chair': { 'en': 'Chair', 'de': 'Stuhl', 'fr': 'Chaise', 'es': 'Silla', 'pt': 'Cadeira', 'it': 'Sedia', 'nl': 'Stoel', 'sv': 'Stol', 'da': 'Stol', 'no': 'Stol', 'fi': 'Tuoli' },
  'table': { 'en': 'Table', 'de': 'Tisch', 'fr': 'Table', 'es': 'Mesa', 'pt': 'Mesa', 'it': 'Tavolo', 'nl': 'Tafel', 'sv': 'Bord', 'da': 'Bord', 'no': 'Bord', 'fi': 'Pöytä' },
  'armchair': { 'en': 'Armchair', 'de': 'Sessel', 'fr': 'Fauteuil', 'es': 'Sillón', 'pt': 'Poltrona', 'it': 'Poltrona', 'nl': 'Fauteuil', 'sv': 'Fåtölj', 'da': 'Lænestol', 'no': 'Lenestol', 'fi': 'Nojatuoli' },
  'cupboard': { 'en': 'Cupboard', 'de': 'Schrank', 'fr': 'Placard', 'es': 'Armario', 'pt': 'Armário', 'it': 'Armadio', 'nl': 'Kast', 'sv': 'Skåp', 'da': 'Skab', 'no': 'Skap', 'fi': 'Kaappi' },
  
  // Miscellaneous items
  'baseball': { 'en': 'Baseball', 'de': 'Baseball', 'fr': 'Baseball', 'es': 'Béisbol', 'pt': 'Beisebol', 'it': 'Baseball', 'nl': 'Honkbal', 'sv': 'Baseboll', 'da': 'Baseball', 'no': 'Baseball', 'fi': 'Pesäpallo' },
  'cup': { 'en': 'Cup', 'de': 'Tasse', 'fr': 'Tasse', 'es': 'Taza', 'pt': 'Xícara', 'it': 'Tazza', 'nl': 'Kopje', 'sv': 'Kopp', 'da': 'Kop', 'no': 'Kopp', 'fi': 'Kuppi' },
  'carpet': { 'en': 'Carpet', 'de': 'Teppich', 'fr': 'Tapis', 'es': 'Alfombra', 'pt': 'Tapete', 'it': 'Tappeto', 'nl': 'Tapijt', 'sv': 'Matta', 'da': 'Tæppe', 'no': 'Teppe', 'fi': 'Matto' },
  'curtain': { 'en': 'Curtain', 'de': 'Vorhang', 'fr': 'Rideau', 'es': 'Cortina', 'pt': 'Cortina', 'it': 'Tenda', 'nl': 'Gordijn', 'sv': 'Gardin', 'da': 'Gardin', 'no': 'Gardin', 'fi': 'Verho' },
  'door': { 'en': 'Door', 'de': 'Tür', 'fr': 'Porte', 'es': 'Puerta', 'pt': 'Porta', 'it': 'Porta', 'nl': 'Deur', 'sv': 'Dörr', 'da': 'Dør', 'no': 'Dør', 'fi': 'Ovi' },
  
  // New category items
  'camera': { 'en': 'Camera', 'de': 'Kamera', 'fr': 'Caméra', 'es': 'Cámara', 'pt': 'Câmera', 'it': 'Fotocamera', 'nl': 'Camera', 'sv': 'Kamera', 'da': 'Kamera', 'no': 'Kamera', 'fi': 'Kamera' },
  'crab': { 'en': 'Crab', 'de': 'Krabbe', 'fr': 'Crabe', 'es': 'Cangrejo', 'pt': 'Caranguejo', 'it': 'Granchio', 'nl': 'Krab', 'sv': 'Krabba', 'da': 'Krabbe', 'no': 'Krabbe', 'fi': 'Rapu' },
  'gear': { 'en': 'Gear', 'de': 'Zahnrad', 'fr': 'Engrenage', 'es': 'Engranaje', 'pt': 'Engrenagem', 'it': 'Ingranaggio', 'nl': 'Tandwiel', 'sv': 'Kugghjul', 'da': 'Tandhjul', 'no': 'Tannhjul', 'fi': 'Hammaspyörä' },
  'label': { 'en': 'Label', 'de': 'Etikett', 'fr': 'Étiquette', 'es': 'Etiqueta', 'pt': 'Etiqueta', 'it': 'Etichetta', 'nl': 'Label', 'sv': 'Etikett', 'da': 'Etiket', 'no': 'Etikett', 'fi': 'Etiketti' },
  'lock': { 'en': 'Lock', 'de': 'Schloss', 'fr': 'Serrure', 'es': 'Cerradura', 'pt': 'Fechadura', 'it': 'Serratura', 'nl': 'Slot', 'sv': 'Lås', 'da': 'Lås', 'no': 'Lås', 'fi': 'Lukko' },
  'magnifier': { 'en': 'Magnifier', 'de': 'Lupe', 'fr': 'Loupe', 'es': 'Lupa', 'pt': 'Lupa', 'it': 'Lente', 'nl': 'Vergrootglas', 'sv': 'Förstoringsglas', 'da': 'Forstørrelsesglas', 'no': 'Forstørrelsesglass', 'fi': 'Suurennuslasi' },
  'music': { 'en': 'Music', 'de': 'Musik', 'fr': 'Musique', 'es': 'Música', 'pt': 'Música', 'it': 'Musica', 'nl': 'Muziek', 'sv': 'Musik', 'da': 'Musik', 'no': 'Musikk', 'fi': 'Musiikki' },
  
  // Object category items
  'badge': { 'en': 'Badge', 'de': 'Abzeichen', 'fr': 'Badge', 'es': 'Insignia', 'pt': 'Crachá', 'it': 'Distintivo', 'nl': 'Badge', 'sv': 'Märke', 'da': 'Emblem', 'no': 'Merke', 'fi': 'Rintamerkki' },
  'beard': { 'en': 'Beard', 'de': 'Bart', 'fr': 'Barbe', 'es': 'Barba', 'pt': 'Barba', 'it': 'Barba', 'nl': 'Baard', 'sv': 'Skägg', 'da': 'Skæg', 'no': 'Skjegg', 'fi': 'Parta' },
  'bone': { 'en': 'Bone', 'de': 'Knochen', 'fr': 'Os', 'es': 'Hueso', 'pt': 'Osso', 'it': 'Osso', 'nl': 'Bot', 'sv': 'Ben', 'da': 'Knogle', 'no': 'Bein', 'fi': 'Luu' },
  'briefcase': { 'en': 'Briefcase', 'de': 'Aktentasche', 'fr': 'Porte-documents', 'es': 'Maletín', 'pt': 'Pasta', 'it': 'Valigetta', 'nl': 'Aktetas', 'sv': 'Portfölj', 'da': 'Mappe', 'no': 'Stresskoffert', 'fi': 'Salkku' },
  'cane': { 'en': 'Cane', 'de': 'Gehstock', 'fr': 'Canne', 'es': 'Bastón', 'pt': 'Bengala', 'it': 'Bastone', 'nl': 'Wandelstok', 'sv': 'Käpp', 'da': 'Stok', 'no': 'Stokk', 'fi': 'Keppi' },
  
  // Symbols
  'equal': { 'en': 'Equal', 'de': 'Gleich', 'fr': 'Égal', 'es': 'Igual', 'pt': 'Igual', 'it': 'Uguale', 'nl': 'Gelijk', 'sv': 'Lika', 'da': 'Lig', 'no': 'Lik', 'fi': 'Yhtä suuri' },
  'less': { 'en': 'Less', 'de': 'Weniger', 'fr': 'Moins', 'es': 'Menos', 'pt': 'Menos', 'it': 'Meno', 'nl': 'Minder', 'sv': 'Mindre', 'da': 'Mindre', 'no': 'Mindre', 'fi': 'Vähemmän' },
  'more': { 'en': 'More', 'de': 'Mehr', 'fr': 'Plus', 'es': 'Más', 'pt': 'Mais', 'it': 'Più', 'nl': 'Meer', 'sv': 'Mer', 'da': 'Mere', 'no': 'Mer', 'fi': 'Enemmän' }
};

module.exports = {
  themeTranslations,
  imageTranslations
};