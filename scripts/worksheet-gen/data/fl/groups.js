/**
 * data/fl/groups.js — the picture themes of the six flagship makers as a teacher thinks of them (docs/makers/FLAGSHIP.md):
 * "Animals", not "animals bw 3". One group gathers the library's numbered themes and the new drawings of the same subject.
 * Names: en = American English, pt = Brazilian, es = Mexican.
 */
'use strict';
const G = (id, themes, en, de, fr, es, pt, it, nl, sv, da, no, fi) => ({ id, themes, names: { en, de, fr, es, pt, it, nl, sv, da, no, fi } });
const GROUPS = [
  G('animals', ['animals bw', 'animals bw 2', 'animals bw 3', 'animals bw 4', 'animals bw 5', 'faces bw'], 'Animals', 'Tiere', 'Animaux', 'Animales', 'Animais', 'Animali', 'Dieren', 'Djur', 'Dyr', 'Dyr', 'Eläimet'),
  G('pets', ['pets bw'], 'Pets', 'Haustiere', 'Animaux de compagnie', 'Mascotas', 'Animais de estimação', 'Animali domestici', 'Huisdieren', 'Husdjur', 'Kæledyr', 'Kjæledyr', 'Lemmikit'),
  G('farm', ['farm bw', 'farm animals bw', 'farm friends bw'], 'On the Farm', 'Auf dem Bauernhof', 'À la ferme', 'En la granja', 'Na fazenda', 'In fattoria', 'Op de boerderij', 'På bondgården', 'På bondegården', 'På gården', 'Maatilalla'),
  G('safari', ['zoo animals bw', 'safari friends bw'], 'Zoo and Safari', 'Zoo und Safari', 'Zoo et safari', 'Zoológico y safari', 'Zoológico e safári', 'Zoo e safari', 'Dierentuin en safari', 'Djurpark och safari', 'Zoo og safari', 'Dyrepark og safari', 'Eläintarha ja safari'),
  G('forest', ['forest friends bw'], 'In the Forest', 'Im Wald', 'Dans la forêt', 'En el bosque', 'Na floresta', 'Nel bosco', 'In het bos', 'I skogen', 'I skoven', 'I skogen', 'Metsässä'),
  G('ocean', ['sea life bw', 'sea life bw 2', 'ocean friends bw'], 'In the Ocean', 'Im Meer', 'Dans la mer', 'En el mar', 'No mar', 'Nel mare', 'In de zee', 'I havet', 'I havet', 'I havet', 'Meressä'),
  G('polar', ['polar friends bw'], 'Polar Animals', 'Polartiere', 'Animaux polaires', 'Animales polares', 'Animais polares', 'Animali polari', 'Pooldieren', 'Polardjur', 'Polardyr', 'Polardyr', 'Napaseutujen eläimet'),
  G('birds', ['birds bw', 'birds bw 2'], 'Birds', 'Vögel', 'Oiseaux', 'Aves', 'Aves', 'Uccelli', 'Vogels', 'Fåglar', 'Fugle', 'Fugler', 'Linnut'),
  G('bugs', ['bugs bw'], 'Bugs', 'Krabbeltiere', 'Petites bêtes', 'Bichitos', 'Insetos', 'Insetti', 'Beestjes', 'Småkryp', 'Småkryb', 'Småkryp', 'Ötökät'),
  G('dinosaurs', ['dinosaurs bw'], 'Dinosaurs', 'Dinosaurier', 'Dinosaures', 'Dinosaurios', 'Dinossauros', 'Dinosauri', 'Dinosaurussen', 'Dinosaurier', 'Dinosaurer', 'Dinosaurer', 'Dinosaurukset'),
  G('fairy', ['fairy tales bw'], 'Fairy Tales', 'Märchen', 'Contes de fées', 'Cuentos de hadas', 'Contos de fadas', 'Fiabe', 'Sprookjes', 'Sagor', 'Eventyr', 'Eventyr', 'Sadut'),
  G('space', ['space bw', 'space friends bw'], 'Space', 'Weltall', 'Espace', 'Espacio', 'Espaço', 'Spazio', 'Ruimte', 'Rymden', 'Verdensrummet', 'Verdensrommet', 'Avaruus'),
  G('robots', ['robots and monsters bw'], 'Robots and Monsters', 'Roboter und Monster', 'Robots et monstres', 'Robots y monstruos', 'Robôs e monstros', 'Robot e mostri', 'Robots en monsters', 'Robotar och monster', 'Robotter og monstre', 'Roboter og monstre', 'Robotit ja hirviöt'),
  G('vehicles', ['vehicles bw', 'vehicles bw 2', 'vehicles bw 3', 'things that go bw'], 'Things That Go', 'Fahrzeuge', 'Véhicules', 'Vehículos', 'Veículos', 'Veicoli', 'Voertuigen', 'Fordon', 'Køretøjer', 'Kjøretøy', 'Kulkuneuvot'),
  G('food', ['food bw', 'food bw 2', 'food bw 3', 'dessert bw', 'yummy food bw'], 'Food', 'Essen', 'Nourriture', 'Comida', 'Comida', 'Cibo', 'Eten', 'Mat', 'Mad', 'Mat', 'Ruoka'),
  G('fruit', ['fruits bw'], 'Fruit', 'Obst', 'Fruits', 'Frutas', 'Frutas', 'Frutta', 'Fruit', 'Frukt', 'Frugt', 'Frukt', 'Hedelmät'),
  G('vegetables', ['vegetables bw', 'vegetables bw 2'], 'Vegetables', 'Gemüse', 'Légumes', 'Verduras', 'Legumes e verduras', 'Verdure', 'Groenten', 'Grönsaker', 'Grøntsager', 'Grønnsaker', 'Vihannekset'),
  G('kitchen', ['kitchen bw'], 'In the Kitchen', 'In der Küche', 'Dans la cuisine', 'En la cocina', 'Na cozinha', 'In cucina', 'In de keuken', 'I köket', 'I køkkenet', 'På kjøkkenet', 'Keittiössä'),
  G('home', ['home bw', 'home bw 2', 'household bw', 'furniture bw', 'home and nature bw', 'home friends bw'], 'At Home', 'Zu Hause', 'À la maison', 'En casa', 'Em casa', 'A casa', 'Thuis', 'Hemma', 'Derhjemme', 'Hjemme', 'Kotona'),
  G('nature', ['nature bw', 'nature friends bw'], 'Nature', 'Natur', 'Nature', 'Naturaleza', 'Natureza', 'Natura', 'Natuur', 'Naturen', 'Naturen', 'Naturen', 'Luonto'),
  G('school', ['classroom bw', 'classroom bw 2', 'education bw', 'school friends bw'], 'At School', 'In der Schule', 'À l’école', 'En la escuela', 'Na escola', 'A scuola', 'Op school', 'I skolan', 'I skolen', 'På skolen', 'Koulussa'),
  G('music', ['music bw'], 'Music', 'Musik', 'Musique', 'Música', 'Música', 'Musica', 'Muziek', 'Musik', 'Musik', 'Musikk', 'Musiikki'),
  G('toys', ['toys bw', 'toys bw 2', 'toys and play bw'], 'Toys', 'Spielzeug', 'Jouets', 'Juguetes', 'Brinquedos', 'Giocattoli', 'Speelgoed', 'Leksaker', 'Legetøj', 'Leker', 'Lelut'),
  G('sports', ['sports bw', 'sports bw 2', 'sports and play bw'], 'Sports', 'Sport', 'Sports', 'Deportes', 'Esportes', 'Sport', 'Sport', 'Sport', 'Sport', 'Sport', 'Urheilu'),
  G('clothes', ['apparel bw'], 'Clothes', 'Kleidung', 'Vêtements', 'Ropa', 'Roupas', 'Vestiti', 'Kleding', 'Kläder', 'Tøj', 'Klær', 'Vaatteet'),
  G('tools', ['tools bw'], 'Tools', 'Werkzeug', 'Outils', 'Herramientas', 'Ferramentas', 'Attrezzi', 'Gereedschap', 'Verktyg', 'Værktøj', 'Verktøy', 'Työkalut'),
  G('objects', ['objects bw'], 'Everyday Things', 'Alltagsdinge', 'Objets du quotidien', 'Cosas de todos los días', 'Coisas do dia a dia', 'Oggetti di ogni giorno', 'Dingen van elke dag', 'Vardagssaker', 'Hverdagsting', 'Hverdagsting', 'Arkiset esineet'),
  G('beach', ['beach bw', 'beach bw 2'], 'At the Beach', 'Am Strand', 'À la plage', 'En la playa', 'Na praia', 'Al mare', 'Aan het strand', 'På stranden', 'På stranden', 'På stranden', 'Rannalla'),
  G('travel', ['travel and holiday bw'], 'Travel', 'Reisen', 'Voyages', 'Viajes', 'Viagens', 'Viaggi', 'Op reis', 'Resor', 'Rejser', 'Reiser', 'Matkalla'),
  G('people', ['helpers bw', 'children bw'], 'People', 'Menschen', 'Personnes', 'Personas', 'Pessoas', 'Persone', 'Mensen', 'Människor', 'Mennesker', 'Mennesker', 'Ihmiset'),
  G('seasons', ['seasons bw'], 'Seasons and Weather', 'Jahreszeiten und Wetter', 'Saisons et météo', 'Estaciones y clima', 'Estações e clima', 'Stagioni e tempo', 'Seizoenen en weer', 'Årstider och väder', 'Årstider og vejr', 'Årstider og vær', 'Vuodenajat ja sää'),
  G('celebrations', ['celebrations bw'], 'Celebrations', 'Feste', 'Fêtes', 'Fiestas', 'Festas', 'Feste', 'Feesten', 'Fester', 'Fester', 'Fester', 'Juhlat'),
  G('christmas', ['Christmas bw', 'Christmas bw 2'], 'Christmas', 'Weihnachten', 'Noël', 'Navidad', 'Natal', 'Natale', 'Kerst', 'Jul', 'Jul', 'Jul', 'Joulu'),
  G('easter', ['Easter bw', 'Easter bw 2'], 'Easter', 'Ostern', 'Pâques', 'Pascua', 'Páscoa', 'Pasqua', 'Pasen', 'Påsk', 'Påske', 'Påske', 'Pääsiäinen'),
  G('valentine', ['valentine bw', 'valentine bw 2'], 'Valentine’s Day', 'Valentinstag', 'Saint-Valentin', 'Día del Amor', 'Dia dos Namorados', 'San Valentino', 'Valentijnsdag', 'Alla hjärtans dag', 'Valentinsdag', 'Valentinsdagen', 'Ystävänpäivä'),
  G('shapes', ['shape friends bw'], 'Shapes', 'Formen', 'Formes', 'Figuras', 'Formas', 'Forme', 'Vormen', 'Former', 'Former', 'Former', 'Muodot'),
];
const groupOfTheme = new Map(GROUPS.flatMap((g) => g.themes.map((t) => [t, g.id])));
module.exports = { GROUPS, groupOfTheme };
