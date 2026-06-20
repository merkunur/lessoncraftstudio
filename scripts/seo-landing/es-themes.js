'use strict';
/* Hand-verified Spanish theme-data table for the cross-language ("Aprender <X>") landing fan-out.
 * PURE SUBSTITUTION — genArt is the STORED, agreement-correct definite plural article (los/las).
 * assertThemeTable() fail-halts on a missing field or a non-{los,las} article.
 *   nPl    — natural plural example list of 3 nouns (lowercase, "y"/"e" correct)
 *   gen    — plural collective noun (lowercase)
 *   genArt — definite plural article agreeing with gen's gender: "los" (masc) / "las" (fem)
 *   h1     — Title-case Spanish display name
 */
const THEMES = {
  '4th_of_july': {nPl:'banderas, fuegos artificiales y globos', gen:'cosas del Cuatro de Julio', genArt:'las', h1:'Cuatro De Julio'},
  accessories: {nPl:'gorros, cinturones y bufandas', gen:'accesorios', genArt:'los', h1:'Accesorios'},
  animals: {nPl:'vacas, ovejas y gallinas', gen:'animales', genArt:'los', h1:'Animales'},
  around_the_house: {nPl:'lámparas, sillas y relojes', gen:'cosas de la casa', genArt:'las', h1:'Por La Casa'},
  at_the_supermarket: {nPl:'carritos, cestas y cajas', gen:'cosas del supermercado', genArt:'las', h1:'En El Supermercado'},
  bakery: {nPl:'roscas, panecillos y pasteles', gen:'cosas de la panadería', genArt:'las', h1:'Panadería'},
  beach: {nPl:'cubos, palas y estrellas de mar', gen:'cosas de la playa', genArt:'las', h1:'Playa'},
  birds: {nPl:'petirrojos, búhos y patos', gen:'aves', genArt:'las', h1:'Aves'},
  birds_2: {nPl:'loros, cisnes y cuervos', gen:'aves', genArt:'las', h1:'Aves 2'},
  breakfast: {nPl:'huevos, tortitas y plátanos', gen:'alimentos del desayuno', genArt:'los', h1:'Desayuno'},
  camping: {nPl:'tiendas, linternas y mochilas', gen:'cosas de acampada', genArt:'las', h1:'Acampada'},
  christmas: {nPl:'árboles, bolas y calcetines', gen:'cosas de Navidad', genArt:'las', h1:'Navidad'},
  classroom: {nPl:'lápices, libros y globos terráqueos', gen:'cosas del aula', genArt:'las', h1:'Aula'},
  clothing: {nPl:'camisas, calcetines y gorros', gen:'prendas de ropa', genArt:'las', h1:'Ropa'},
  desserts_and_sweets: {nPl:'magdalenas, piruletas y tartas', gen:'postres y dulces', genArt:'los', h1:'Postres Y Dulces'},
  dinosaurs: {nPl:'tiranosaurios, estegosaurios y velocirraptores', gen:'dinosaurios', genArt:'los', h1:'Dinosaurios'},
  easter: {nPl:'huevos, conejos y cestas', gen:'cosas de Pascua', genArt:'las', h1:'Pascua'},
  farm_animals: {nPl:'vacas, cerdos y cabras', gen:'animales de granja', genArt:'los', h1:'Animales De Granja'},
  flowers: {nPl:'tulipanes, margaritas y rosas', gen:'flores', genArt:'las', h1:'Flores'},
  forest_creatures: {nPl:'zorros, ciervos y erizos', gen:'animales del bosque', genArt:'los', h1:'Animales Del Bosque'},
  fruits: {nPl:'manzanas, plátanos y peras', gen:'frutas', genArt:'las', h1:'Frutas'},
  furniture: {nPl:'sofás, mesas y lámparas', gen:'muebles', genArt:'los', h1:'Muebles'},
  hospital: {nPl:'camas, vendas y estetoscopios', gen:'cosas del hospital', genArt:'las', h1:'Hospital'},
  insects_and_bugs: {nPl:'hormigas, abejas y mariquitas', gen:'insectos y bichos', genArt:'los', h1:'Insectos Y Bichos'},
  kitchen_tools: {nPl:'cucharas, batidores y sartenes', gen:'utensilios de cocina', genArt:'los', h1:'Utensilios De Cocina'},
  miscellaneous: {nPl:'llaves, botones y paraguas', gen:'cosas variadas', genArt:'las', h1:'Variados'},
  music: {nPl:'tambores, campanas y flautas', gen:'instrumentos de música', genArt:'los', h1:'Música'},
  occupations: {nPl:'cocineros, enfermeros y pilotos', gen:'oficios', genArt:'los', h1:'Oficios'},
  ocean_life: {nPl:'peces, cangrejos y pulpos', gen:'animales marinos', genArt:'los', h1:'Vida Marina'},
  pets: {nPl:'gatos, perros y conejos', gen:'mascotas', genArt:'las', h1:'Mascotas'},
  post_office: {nPl:'cartas, sellos y paquetes', gen:'cosas de correos', genArt:'las', h1:'Oficina De Correos'},
  reptiles_and_amphibians: {nPl:'ranas, serpientes y tortugas', gen:'reptiles y anfibios', genArt:'los', h1:'Reptiles Y Anfibios'},
  shapes: {nPl:'círculos, cuadrados y triángulos', gen:'formas', genArt:'las', h1:'Formas'},
  space: {nPl:'cohetes, planetas y estrellas', gen:'cosas del espacio', genArt:'las', h1:'Espacio'},
  thanksgivinng: {nPl:'pavos, calabazas y tartas', gen:'cosas de Acción de Gracias', genArt:'las', h1:'Acción De Gracias'},
  things_that_fly: {nPl:'cometas, aviones y globos', gen:'cosas que vuelan', genArt:'las', h1:'Cosas Que Vuelan'},
  tools: {nPl:'martillos, sierras y llaves inglesas', gen:'herramientas', genArt:'las', h1:'Herramientas'},
  toys: {nPl:'pelotas, bloques y ositos de peluche', gen:'juguetes', genArt:'los', h1:'Juguetes'},
  tree: {nPl:'robles, pinos y palmeras', gen:'árboles', genArt:'los', h1:'Árboles'},
  vegetables: {nPl:'zanahorias, guisantes y calabazas', gen:'verduras', genArt:'las', h1:'Verduras'},
  vehicles: {nPl:'autobuses, camiones y excavadoras', gen:'vehículos', genArt:'los', h1:'Vehículos'},
  zoo_animals: {nPl:'leones, cebras y jirafas', gen:'animales del zoológico', genArt:'los', h1:'Animales Del Zoológico'},
  colors: {nPl:'rojos, azules y verdes', gen:'colores', genArt:'los', h1:'Colores'},
  emotions: {nPl:'caras alegres, tristes y sorprendidas', gen:'emociones', genArt:'las', h1:'Emociones'},
  body_parts: {nPl:'manos, pies y orejas', gen:'partes del cuerpo', genArt:'las', h1:'Partes Del Cuerpo'},
  weather: {nPl:'soles, nubes y gotas de lluvia', gen:'cosas del tiempo', genArt:'las', h1:'El Tiempo'},
  spring: {nPl:'flores, gotas de lluvia y cometas', gen:'cosas de primavera', genArt:'las', h1:'Primavera'},
  summer: {nPl:'soles, helados y pelotas de playa', gen:'cosas de verano', genArt:'las', h1:'Verano'},
  winter: {nPl:'copos de nieve, manoplas y bufandas', gen:'cosas de invierno', genArt:'las', h1:'Invierno'},
  activities: {nPl:'correr, saltar y nadar', gen:'acciones', genArt:'las', h1:'Acciones'},
};

module.exports = { THEMES };
