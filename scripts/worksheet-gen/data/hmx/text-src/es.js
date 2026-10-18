/**
 * data/hmx/text-src/es.js — Spanish (es-MX) words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: the noun with its definite article ('el erizo', 'la cubeta', 'los arándanos'); "a + el" → al, "de + el" → del.
 * Mexican usage as in the published face strings (papalote, cubeta, carro, pasto). Templates follow i18n/strings.es.json.
 */
'use strict';
const NOUNS = {
  'lamb': 'el corderito', 'haystack': 'el montón de paja', 'pig': 'el cerdito', 'mud puddle': 'el charco de lodo', 'ox': 'el buey', 'apple basket': 'la canasta de manzanas',
  'snail': 'el caracol', 'strawberry': 'la fresa', 'boy on the bike': 'el niño en bicicleta', 'slide': 'la resbaladilla', 'duck': 'el pato', 'bread': 'el pan',
  'squirrel': 'la ardilla', 'pine cone': 'la piña de pino', 'mouse': 'el ratón', 'pumpkin': 'la calabaza', 'sloth': 'el perezoso', 'tree': 'el árbol',
  'zebra': 'la cebra', 'elephant': 'el elefante', 'camel': 'el camello', 'palm tree': 'la palmera', 'sea turtle': 'la tortuga marina', 'sea': 'el mar',
  'girl on the sled': 'la niña en trineo', 'cabin': 'la cabaña', 'seal': 'la foca', 'hole in the ice': 'el hoyo en el hielo', 'hiker': 'la excursionista', 'tent': 'la casa de campaña',
  'owl': 'el búho', 'oak tree': 'el roble', 'mail carrier': 'el cartero', 'mailbox': 'el buzón', 'bunny': 'el conejito', 'Easter basket': 'la canasta de Pascua',
  'firefighter': 'el bombero', 'fire truck': 'el camión de bomberos', 'seagull': 'la gaviota', 'fish': 'el pez', 'raccoon': 'el mapache', 'cooler': 'la hielera',
  'triceratops': 'el triceratops', 'big tree': 'el árbol grande', 'farmer': 'el granjero', 'tractor': 'el tractor', 'astronaut': 'el astronauta', 'rocket': 'el cohete',
  'pufferfish': 'el pez globo', 'shell': 'la concha', 'robot': 'el robot', 'ice cream': 'el helado', 'donkey': 'el burro', 'carrot': 'la zanahoria',
  'beaver': 'el castor', 'log': 'el tronco', 'turkey': 'el guajolote', 'corn': 'el elote', 'skier': 'la esquiadora', 'snowman': 'el muñeco de nieve',
  'swan': 'el cisne', 'nest': 'el nido', 'macaw': 'la guacamaya', 'banana': 'el plátano', 'fox': 'el zorro', 'lantern': 'la linterna',
  'hamster': 'el hámster', 'apple': 'la manzana', 'kitten': 'el gatito', 'milk': 'la leche', 'crab': 'el cangrejo', 'beach ball': 'la pelota de playa',
  'ladybug': 'la catarina', 'sunflower': 'el girasol', 'penguin': 'el pingüino', 'igloo': 'el iglú', 'turtle': 'la tortuga', 'flower': 'la flor',
  'girl': 'la niña', 'swing': 'el columpio', 'chick': 'el pollito', 'egg': 'el huevo', 'horse': 'el caballo', 'hen': 'la gallina',
  'toy dinosaur': 'el dinosaurio de juguete', 'cake': 'el pastel', 'bird': 'el pajarito', 'birdhouse': 'la casita para pájaros', 'monkey': 'el mono', 'rabbit': 'el conejo',
  'cabbage': 'la col', 'seahorse': 'el caballito de mar', 'seaweed': 'el alga', 'badger': 'el tejón', 'chestnut tree': 'el castaño', 'Santa': 'Santa Claus:m',
  'sleigh': 'el trineo', 'llama': 'la llama', 'rhino': 'el rinoceronte', 'hippo': 'el hipopótamo', 'tortoise': 'la tortuga', 'watermelon': 'la sandía',
  'dinosaur': 'el dinosaurio', 'bear': 'el oso', 'honey': 'la miel', 'pelican': 'el pelícano', 'boat': 'el barco', 'garbage truck': 'el camión de la basura',
  'trash can': 'el bote de basura', 'canoe': 'la canoa', 'kayak': 'el kayak', 'ship': 'el barco grande', 'lighthouse': 'el faro', 'sailboat': 'el velero', 'island': 'la isla',
  'beach hut': 'la cabaña de playa', 'frog': 'la rana', 'puffin': 'el frailecillo', 'lifeguard tower': 'la torre del salvavidas', 'house': 'la casa', 'goose': 'el ganso',
  'cheese': 'el queso', 'earthworm': 'la lombriz', 'leaf': 'la hoja', 'gopher': 'la tuza', 'potato': 'la papa', 'gerbil': 'el jerbo', 'blueberry': 'el arándano',
  'meerkat': 'el suricato', 'ferret': 'el hurón', 'ball': 'la pelota', 'chipmunk': 'la ardillita', 'acorn': 'la bellota', 'ambulance': 'la ambulancia', 'doctor': 'el doctor',
  'bus': 'el camión', 'boy': 'el niño', 'jeep': 'el jeep', 'surfboard': 'la tabla de surf', 'motorcycle': 'la moto', 'garage': 'la cochera', 'van': 'la camioneta',
  'package': 'el paquete', 'cement mixer': 'la revolvedora', 'builder': 'el albañil', 'truck': 'el camión de carga', 'forklift': 'el montacargas', 'race car': 'el carro de carreras',
  'mechanic': 'el mecánico', 'bee': 'la abeja', 'little girl': 'la niñita', 'basket': 'la canasta', 'foal': 'el potrillo', 'porcupine': 'el puercoespín', 'apple tree': 'el manzano',
  'hummingbird': 'el colibrí', 'cherry tree': 'el cerezo', 'guinea pig': 'el cuyo', 'bowl': 'el tazón', 'moon': 'la luna', 'lemur': 'el lémur', 'elf': 'el duende',
  'sack': 'el costal', 'sandcastle': 'el castillo de arena', 'duckling': 'el patito', 'puddle': 'el charco', 'coral': 'el coral', 'planet': 'el planeta',
  'snowboarder': 'el snowboardista', 'hot cocoa': 'el chocolate caliente', 'butterfly': 'la mariposa', 'rose': 'la rosa', 'water lily': 'el nenúfar', 'radish': 'el rábano',
  'toy car': 'el carrito', 'little dinosaur': 'el dinosaurito', 'ant': 'la hormiga', 'cookie': 'la galleta', 'gazelle': 'la gacela', 'baobab tree': 'el baobab',
  'caterpillar': 'la oruga', 'toad': 'el sapo', 'dragonfly': 'la libélula', 'Earth': 'la Tierra', 'teddy bear': 'el osito de peluche', 'cupcake': 'el panquecito', 'airplane': 'el avión',
  'rainbow': 'el arcoíris', 'helicopter': 'el helicóptero', 'mountain': 'la montaña', 'submarine': 'el submarino', 'whale': 'la ballena', 'toy train': 'el trenecito',
  'camper': 'la casa rodante', 'bike': 'la bicicleta', 'playground': 'el parque de juegos', 'dragon': 'el dragón', 'campfire': 'la fogata', 'flying horse': 'el caballo volador',
  'sun': 'el sol', 'oyster': 'la ostra', 'monster truck': 'el camión monstruo', 'big rock': 'la roca grande', 'octopus': 'el pulpo', 'flamingo': 'el flamenco',
  'stork': 'la cigüeña', 'parrot': 'el loro', 'grapes': 'las uvas', 'koala': 'el koala', 'kangaroo': 'el canguro', 'bull': 'el toro', 'turnip': 'el nabo', 'cow': 'la vaca',
  'clover': 'el trébol', 'deer': 'el venado', 'bluebells': 'las campanillas', 'dog': 'el perro', 'digger': 'la excavadora', 'rock': 'la roca', 'scooter': 'la motoneta',
  'jet': 'el jet', 'cloud': 'la nube', 'eagle': 'el águila:f', 'manatee': 'el manatí', 'pineapple': 'la piña', 'Christmas tree': 'el árbol de Navidad',
  'toy helicopter': 'el helicóptero de juguete', 'blocks': 'los bloques', 'bison': 'el bisonte', 'wheat': 'el trigo', 'sheep': 'la oveja', 'grass': 'el pasto',
  'moose': 'el alce', 'birch tree': 'el abedul', 'leopard': 'el leopardo', 'alligator': 'el caimán', 'goat': 'la cabra', 'lettuce': 'la lechuga', 'tall tree': 'el árbol alto',
  'peacock': 'el pavo real', 'hat': 'el sombrero', 'doll': 'la muñeca', 'pudding': 'el flan', 'reindeer': 'el reno', 'bell': 'la campana', 'chinchilla': 'la chinchilla',
  'raspberry': 'la frambuesa', 'squid': 'el calamar', 'cat': 'el gato', 'walnut tree': 'el nogal', 'bulldozer': 'el buldócer', 'sand pile': 'el montón de arena',
  'toy truck': 'el camioncito', 'ferry': 'el ferri', 'train': 'el tren', 'backpack': 'la mochila', 'banana tree': 'la mata de plátano', 'orange tree': 'el naranjo',
  'cherry blossom': 'el cerezo en flor', 'tiger': 'el tigre', 'toucan': 'el tucán', 'panda': 'el panda', 'barn': 'el granero', 'hay': 'la paja', 'mushroom': 'el hongo',
  'pyramid': 'la pirámide', 'umbrella': 'el paraguas', 'starfish': 'la estrella de mar', 'vegetables': 'las verduras', 'hedgehog': 'el erizo',
};
const COLLECT = { // [todas las …, cada …, falta …]
  'hmx-collect-acorns': ['todas las bellotas', 'cada bellota', 'Falta una bellota.'], 'hmx-collect-flowers': ['todos los girasoles', 'cada girasol', 'Falta un girasol.'],
  'hmx-collect-corn': ['todos los elotes', 'cada elote', 'Falta un elote.'], 'hmx-collect-fish': ['todos los peces', 'cada pez', 'Falta un pez.'],
  'hmx-collect-shells': ['todas las conchas', 'cada concha', 'Falta una concha.'], 'hmx-collect-strawberries': ['todas las fresas', 'cada fresa', 'Falta una fresa.'],
  'hmx-collect-stars': ['todas las estrellas', 'cada estrella', 'Falta una estrella.'], 'hmx-collect-bananas': ['todos los plátanos', 'cada plátano', 'Falta un plátano.'],
  'hmx-collect-presents': ['todos los regalos', 'cada regalo', 'Falta un regalo.'], 'hmx-collect-eggs': ['todos los huevos de Pascua', 'cada huevo', 'Falta un huevo de Pascua.'],
  'hmx-collect-apples': ['todas las manzanas', 'cada manzana', 'Falta una manzana.'], 'hmx-collect-hibiscus': ['todas las flores', 'cada flor', 'Falta una flor.'],
};
const AVOID = { // [esquiva a/…, ningún A ni ningún B, un A ni por un B]
  'hmx-avoid-duckling': ['al zorro', 'ningún zorro ni por ninguna serpiente', 'un zorro ni por una serpiente'], 'hmx-avoid-fish': ['al tiburón', 'ningún tiburón ni por ninguna medusa', 'un tiburón ni por una medusa'],
  'hmx-avoid-rocket': ['los asteroides', 'ningún asteroide ni por ningún meteorito', 'un asteroide ni por un meteorito'], 'hmx-avoid-snowboard': ['las rocas', 'ninguna roca ni por ningún árbol', 'una roca ni por un árbol'],
  'hmx-avoid-butterfly': ['a la araña', 'ninguna araña ni por ninguna avispa', 'una araña ni por una avispa'], 'hmx-avoid-frog': ['a la garza', 'ninguna garza ni por ningún caimán', 'una garza ni por un caimán'],
  'hmx-avoid-rabbit': ['al halcón', 'ningún halcón ni por ningún lobo', 'un halcón ni por un lobo'], 'hmx-avoid-toycar': ['los charcos', 'ningún charco ni por ningún montón de piedras', 'un charco ni por un montón de piedras'],
  'hmx-avoid-raptor': ['al tiranosaurio', 'ningún tiranosaurio ni por ningún montón de piedras', 'un tiranosaurio ni por un montón de piedras'], 'hmx-avoid-penguin': ['a la orca', 'ninguna orca ni por ningún hoyo en el hielo', 'una orca ni por un hoyo en el hielo'],
  'hmx-avoid-ant': ['a la araña', 'ningún charco ni por ninguna araña', 'un charco ni por una araña'], 'hmx-avoid-gazelle': ['al leopardo', 'ningún leopardo ni por ninguna hiena', 'un leopardo ni por una hiena'],
};
const HOP = { 'hmx-hop-frog': 'por las hojas del estanque', 'hmx-hop-penguin': 'por los bloques de hielo', 'hmx-hop-caterpillar': 'por las piedras del jardín', 'hmx-hop-astronaut': 'por el espacio', 'hmx-hop-teddy': 'por los dulces', 'hmx-hop-fox': 'por las hojas de otoño' };
const COLOUR = { 'hmx-colour-pig': ['la granja', 'el dibujo de la granja'], 'hmx-colour-horse': ['el campo', 'el dibujo del campo'], 'hmx-colour-monkey': ['la selva', 'el dibujo de la selva'],
  'hmx-colour-penguin': ['el hielo', 'el dibujo del hielo'], 'hmx-colour-hedgehog': ['el prado', 'el dibujo del prado'], 'hmx-colour-turtle': ['la playa', 'el dibujo de la playa'],
  'hmx-colour-squirrel': ['el bosque', 'el dibujo del bosque'], 'hmx-colour-camel': ['el desierto', 'el dibujo del desierto'], 'hmx-colour-frog': ['el día de lluvia', 'el dibujo de la lluvia'],
  'hmx-colour-octopus': ['el mar', 'el dibujo del mar'], 'hmx-colour-bee': ['el jardín', 'el dibujo del jardín'], 'hmx-colour-dog': ['la casa', 'el dibujo de la casa'],
  'hmx-colour-rocket': ['el espacio', 'el dibujo del espacio'], 'hmx-colour-ambulance': ['la ciudad', 'el dibujo de la ciudad'], 'hmx-colour-snowman': ['el invierno', 'el dibujo de invierno'],
  'hmx-colour-tractor': ['la cosecha', 'el dibujo de la cosecha'] };
const BABIES = { 'hmx-babies-meadow': 'en el prado', 'hmx-babies-sunset': 'al atardecer', 'hmx-babies-snow': 'en la nieve', 'hmx-babies-orchard': 'en la huerta', 'hmx-babies-spring': 'en primavera', 'hmx-babies-wheat': 'en el trigal' };
const STRINGS = { farm: 'en la granja', beach: 'en la playa', snow: 'en la nieve', savanna: 'en la sabana', pets: 'en el parque', dinos: 'con los dinosaurios', forest: 'en el bosque', kids: 'en el parque de juegos', jungle: 'en la selva' };
const CUE = { 'hmx-sound-leopard': 'leopardo', 'hmx-sound-tiger': 'tigre', 'hmx-sound-toucan': 'tucán', 'hmx-sound-tractor': 'tractor', 'hmx-sound-panda': 'panda', 'hmx-sound-pelican': 'pelícano' };

function forms(key) {
  let s = NOUNS[key]; if (!s) throw new Error('es: no forms for "' + key + '"');
  if (/:[mf]$/.test(s)) s = s.slice(0, -2);
  let a, de;
  if (s.startsWith('el ')) { a = 'al ' + s.slice(3); de = 'del ' + s.slice(3); }
  else if (/^(la|los|las) /.test(s)) { a = 'a ' + s; de = 'de ' + s; }
  else { a = 'a ' + s; de = 'de ' + s; }   // a proper name (Santa Claus)
  return { def: s, Def: s[0].toUpperCase() + s.slice(1), a, de };
}
const hasta = (G) => 'hasta ' + G.def;
function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  // a vehicle is carried ("lleva el avión"); the personal "a" belongs to animals and people
  const VEH = new Set(['airplane', 'toy train', 'helicopter', 'bike', 'submarine', 'monster truck']);
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  switch (f) {
    case 'base': return { title: `Laberinto para niños: ${H.def} y ${G.def}`, printTitle: `Ayuda ${H.a} a llegar ${G.a}`, instruction: `Ayuda ${H.a} a llegar ${G.a}. Dibuja una línea por el camino.`, tap: `Empieza en el círculo verde con la flecha. Arrastra por el camino ${hasta(G)}.` };
    case 'first-maze': return { title: `Mi primer laberinto: ${H.def} y ${G.def}`, printTitle: `Ayuda ${H.a} a llegar ${G.a}`, instruction: `Ayuda ${H.a} a llegar ${G.a}. Dibuja una línea por el camino ancho sin salirte de las orillas.`, tap: `Empieza en el círculo verde. Arrastra por el camino ancho ${hasta(G)}.` };
    case 'big-maze': return { title: `Laberinto grande: ${H.def} y ${G.def}`, printTitle: `Ayuda ${H.a} a encontrar ${G.def.startsWith('el ') || G.def.startsWith('la ') || G.def.startsWith('los ') || G.def.startsWith('las ') ? G.def : G.def}`, instruction: `Primero mira todo el laberinto. Luego dibuja el camino ${H.de} ${hasta(G)}.`, tap: `Mira primero y luego arrastra del círculo verde ${hasta(G)}. Si un camino se acaba, regresa.` };
    case 'river': { const swim = en[2] === 'swim'; return { title: `Laberinto del río: ${H.def} y ${G.def}`, printTitle: swim ? `Ayuda ${H.a} a nadar ${hasta(G)}` : `Lleva ${H.def} ${hasta(G)}`, instruction: `${swim ? `Ayuda ${H.a} a nadar` : `Lleva ${H.def}`} por el agua ${hasta(G)}. Dibuja una línea por el agua.`, tap: `Empieza en el círculo verde. Arrastra por el agua ${hasta(G)}.` }; }
    case 'burrow': return { title: `Laberinto bajo tierra: ${H.def} y ${G.def}`, printTitle: `Ayuda ${H.a} a llegar ${G.a}`, instruction: `Ayuda ${H.a} a bajar y subir por los túneles ${hasta(G)}. Dibuja una línea por el camino.`, tap: `Empieza en el círculo verde. Arrastra por los túneles ${hasta(G)}.` };
    case 'shortest-way': return { title: `Laberinto de la ciudad: ${H.def} y el camino más corto`, printTitle: `El camino más corto ${hasta(G)}`, instruction: `Muchas calles llevan ${G.a}. Dibuja el camino más corto para ${H.def} y escribe cuántos tramos de calle recorre.`, tap: `Arrastra el camino más corto del círculo verde ${hasta(G)}.` };
    case 'babies-mothers': return { title: `Laberinto: las crías buscan a su mamá ${BABIES[sk.id]}`, printTitle: 'Ayuda a cada cría a encontrar a su mamá', instruction: 'Ayuda a cada cría a encontrar a su propia mamá. Dibuja una línea de cada cría hasta su mamá.', tap: 'Arrastra de cada cría hasta su propia mamá.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'su papalote' : kites === 0 ? 'su globo' : 'su papalote o su globo'; const whatT = balloons === 0 ? 'el papalote' : kites === 0 ? 'el globo' : 'cada hilo';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      return { title: `Líneas enredadas ${where}: ¿de quién es ${whatT}?`, printTitle: `¿De quién es ${whatT}?`,
        instruction: kids ? `Sigue cada hilo desde un niño o un juguete hasta ${what}. Escribe su número en el cuadro de arriba.` : `Sigue cada hilo desde un animal hasta ${what}. Escribe el número del animal en el cuadro de arriba.`,
        tap: kids ? `Arrastra por cada hilo desde el niño o el juguete hasta ${what}.` : `Arrastra por cada hilo desde el animal hasta ${what}.` };
    }
    case 'collect': { const [all, each, missed] = COLLECT[sk.id]; return { title: `Laberinto: ${H.def} recoge ${all}`, printTitle: `Ayuda ${H.a} a recoger ${all}`, instruction: `Ayuda ${H.a} a llegar ${G.a} y recoge ${each} sin pasar dos veces por el mismo camino. Marca un círculo por ${each}.`, tap: `Arrastra del círculo verde ${hasta(G)}. Pasa por ${each}.`, missed: missed + ' Mira el círculo rojo.' }; }
    case 'avoid': { const [t, none, one] = AVOID[sk.id]; const obj = ['rocket', 'toy car'].includes(hk); return { title: `Laberinto: ${H.def} esquiva ${t}`, printTitle: `Lleva ${obj ? H.def : H.a} ${hasta(G)} sin peligro`, instruction: `Ayuda ${H.a} a llegar ${G.a}. No tomes ningún camino donde haya ${one.replace(' ni por ', ' o ')}.`, tap: `Arrastra del círculo verde ${hasta(G)} sin tomar un camino con ${one.replace(' ni por ', ' o ')}.` }; }
    case 'letter-hop': return { title: `Salta las letras en orden: ${H.def} ${HOP[sk.id]}`, printTitle: `Salta ${HOP[sk.id]} en orden alfabético`, instruction: 'Empieza en la casilla que señala la flecha. Colorea la siguiente letra del abecedario en una casilla vecina, hasta llegar a la {LAST}.', tap: 'Empieza en el círculo verde. Arrastra casilla por casilla a la siguiente letra del abecedario.' };
    case 'abc-capitals': return { title: `Laberinto del abecedario: ${H.def} y ${G.def}`, printTitle: `Lleva ${VEH.has(hk) ? H.def : H.a} de la A a la Z ${hasta(G)}`, instruction: `Ayuda ${H.a} a llegar ${G.a}. En cada cruce, ve a la piedra con la siguiente letra del abecedario.`, tap: 'Empieza en el círculo verde. En cada cruce, arrastra a la siguiente letra.' };
    case 'abc-lowercase': return { title: `Laberinto de letras minúsculas: ${H.def}`, printTitle: `Lleva ${VEH.has(hk) ? H.def : H.a} de la a a la z ${hasta(G)}`, instruction: `Ayuda ${H.a} a llegar ${G.a}. En cada cruce, ve a la piedra con la siguiente letra minúscula.`, tap: 'Empieza en el círculo verde. En cada cruce, arrastra a la siguiente minúscula.' };
    case 'numbers-20': return { title: `Laberinto de números del 1 al 20: ${H.def} y ${G.def}`, printTitle: `Cuenta con ${H.def} ${hasta(G)}`, instruction: `Ayuda ${H.a} a llegar ${G.a}. En cada cruce, ve al número que sigue, del 1 al 20.`, tap: 'Empieza en el círculo verde. En cada cruce, arrastra al número que sigue.' };
    case 'skip-5': return { title: `Laberinto de 5 en 5: ${H.def} y ${G.def}`, printTitle: `Cuenta de 5 en 5 ${hasta(G)}`, instruction: `Ayuda ${H.a} a llegar ${G.a}. Cuenta de 5 en 5 de piedra en piedra hasta el 100.`, tap: 'Empieza en el círculo verde. Arrastra de piedra en piedra contando de 5 en 5.' };
    case 'make-10': return { title: `Laberinto de sumas que dan 10: ${H.def} y ${G.def}`, printTitle: 'Pisa solo las sumas que dan 10', instruction: `Ayuda ${H.a} a llegar ${G.a}. Pisa solo las piedras cuya suma da 10.`, tap: 'Empieza en el círculo verde. Arrastra solo por las piedras que dan 10.' };
    case 'subtract-20': return { title: `Laberinto de restas hasta 20: ${H.def} y ${G.def}`, printTitle: `Ayuda ${H.a} a llegar ${G.a}`, instruction: `Mira el número junto ${H.a}. Pisa solo las piedras cuyo resultado es ese número.`, tap: `Empieza en el círculo verde. Arrastra solo por las piedras que dan el número ${H.de}.` };
    case 'running-total': return { title: `Laberinto de sumas y restas: ${H.def} y ${G.def}`, printTitle: `Suma y resta en el camino ${hasta(G)}`, instruction: `Empieza con el número ${H.de} y escribe el nuevo número en cada cuadro. Encuentra el camino que termina en el número ${G.de}.`, tap: `Empieza en el círculo verde. Arrastra por el camino que termina en el número ${G.de}.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Laberinto de sonidos iniciales: como ${c}`, printTitle: `Dibujos que empiezan como ${c}`, instruction: `Di el nombre de cada dibujo. Pisa solo los dibujos que empiezan con el mismo sonido que ${c}.`, tap: `Empieza en el círculo verde. Arrastra solo por los dibujos que empiezan como ${c}.` }; }
    case 'maze-colouring': { const [place, dib] = COLOUR[sk.id]; return { title: `Laberinto para colorear: ${H.def} y ${G.def}`, printTitle: `Resuelve el laberinto y colorea ${place}`, instruction: `Dibuja el camino ${H.de} ${hasta(G)} y colorea todo el camino. Luego colorea ${dib}.`, tap: `Empieza en el círculo verde. Arrastra por el camino ${hasta(G)}.` }; }
    default: throw new Error('es: no template for ' + f);
  }
}
module.exports = { build, NOUNS };
