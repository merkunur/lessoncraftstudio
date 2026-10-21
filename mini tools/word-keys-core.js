/* =====================================================================
   word-keys-core.js — the model of ACTIVITY #61 of the one-by-one rebuild:
   "Tell the Words Apart" → THE WORD KEYS (RF.K.3.c, 11 locales).
   Design sheet: docs/activities-rebuild/designs/061-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: each little word is a key whose letters are its teeth.
   A sentence has a padlock in its gap, and the lock only turns for the
   key with exactly the right letters in exactly the right order: saw
   slides into was's lock and will not turn. A jammed key shows which
   teeth differ, which tooth sticks out, which notch stays empty.
     three — Three keys: one lock, the word and two of its look-alikes
             (the third look-alike rotates in on the next pass)
     ring  — Key ring: three sentences, three keys; each key opens exactly
             one of the locks, so every look-alike is right somewhere
     cut   — Cut the key: cut the word tooth by tooth from a tray of
             letters, then turn it
   No DOM. UMD: window.WordKeysCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.WordKeysCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* per locale: sets 'word|look look look' ×8 · one 'picture|sentence' per set (the gap is _) ·
     boards 'w1 w2 w3|picture|sentence for w1|picture|sentence for w2|picture|sentence for w3' (an empty picture = no picture) */
  /*DATA-BEGIN*/
  var DATA = {
    en: {
      sets: ['was|saw war wax', 'of|off for or', 'the|they then them', 'were|where here we', 'want|went what wait', 'no|on now not', 'who|how why hot', 'saw|was say sat'],
      one: ['animals/cat|The cat _ on the bed.', 'animals/duck|One _ the ducks can swim.', 'camping/moon|I can see _ moon.', 'animals/pig|The pigs _ in the mud.', 'fruits/apple|I _ a red apple.', 'around the house/plate|I have _ cake left.', 'around the house/door|_ is at the door?', 'vehicles/bus|I _ the bus go by.'],
      boards: ['was saw say|animals/cat|The cat _ on the bed.|vehicles/bus|I _ the bus go by.||What did you _?',
        'of off for|animals/duck|One _ the ducks can swim.|accessories/hat|Take _ your hat.|bakery/cupcake|This cupcake is _ you.',
        'the then they|camping/moon|I can see _ moon.|breakfast/pancake|We eat, and _ we play.|animals/dog|Look at the dogs. _ can run.',
        'no on not|around the house/plate|I have _ cake left.|animals/cat|The cat sat _ the bed.|beach/sun|The sun is _ cold.',
        'who how why|around the house/door|_ is at the door?|bakery/cupcake|_ old are you?|clothing/coat|_ do you wear a coat? Because it is cold.',
        'want went what|fruits/apple|I _ a red apple.|activities/playground|We _ to the park.|christmas/present|_ is in the box?',
        'were where we|animals/pig|The pigs _ in the mud.|accessories/sock|_ is my sock?|vehicles/bus|Can _ go now?',
        'saw was wax|beach/whale|We _ a whale in the sea.|breakfast/pancake|The pancake _ hot.|christmas/candle|The candle is made of _.']
    },
    de: {
      sets: ['der|dir den dem', 'ein|eins Bein nein', 'und|uns rund Hund', 'mit|mir Mut mag', 'war|wir wer was', 'bei|bin bist beim', 'vom|von vor wo', 'alle|alt also aller'],
      one: ['animals/dog|_ Hund spielt im Garten.', 'farm animals/horse|Da steht _ Pferd.', 'animals/cat|Die Katze _ der Hund spielen.', 'toys/ball|Ich spiele _ dem Ball.', 'bakery/cupcake|Der Cupcake _ lecker.', 'animals/rabbit|Das Kaninchen sitzt _ seiner Mama.', 'around the house/cup|Die Tasse fällt _ Tisch.', 'animals/fish|_ Fische schwimmen.'],
      boards: ['der den dem|animals/dog|_ Hund spielt im Garten.|toys/ball|Ich sehe _ Ball.|animals/dog|Ich gebe _ Hund einen Knochen.',
        'ein eins nein|farm animals/horse|Da steht _ Pferd.||Drei, zwei, _ – los!|around the house/bathtub|_, der Hund will nicht baden.',
        'und uns Hund|animals/cat|Die Katze _ der Hund spielen.|activities/reading|Mama liest _ ein Buch vor.|animals/dog|Der _ bellt.',
        'mit mir Mut|toys/ball|Ich spiele _ dem Ball.|fruits/apple|Gib _ den Apfel!|animals/tiger|Der Tiger hat viel _.',
        'war wir wer|bakery/cupcake|Der Cupcake _ lecker.|beach/sandcastle|_ spielen im Sand.|around the house/door|_ klopft an die Tür?',
        'bei bin bist|animals/rabbit|Das Kaninchen sitzt _ seiner Mama.|around the house/bed|Ich _ müde.|animals/dog|Du _ mein Freund.',
        'vom von vor|around the house/cup|Die Tasse fällt _ Tisch.|around the house/mailbox|Im Briefkasten ist ein Brief _ Lisa.|around the house/door|Die Katze sitzt _ der Tür.',
        'alle alt also|animals/fish|_ Fische schwimmen.|vehicles/car|Das Auto ist sehr _.|accessories/umbrella|Es regnet, _ nehme ich den Schirm.']
    },
    nl: {
      sets: ['de|den doe dek', 'het|hen heb heet', 'een|en eet aan', 'met|mat mes mis', 'niet|nieuw noot nies', 'dat|dan dak das', 'kan|kar kat kam', 'ik|uit is in'],
      one: ['animals/cat|_ kat slaapt op het bed.', 'farm animals/horse|_ paard eet gras.', 'animals/dog|Ik heb _ hond.', 'toys/ball|Ik speel _ de bal.', 'animals/fish|De vis kan _ lopen.', 'clothing/raincoat|Ik weet _ het regent.', 'birds/parrot|De vogel _ vliegen.', 'fruits/apple|_ eet een appel.'],
      boards: ['de doe dek|animals/cat|_ kat slaapt op het bed.|clothing/coat|_ je jas aan!|around the house/table|Ik _ de tafel.',
        'het heb heet|farm animals/horse|_ paard eet gras.|animals/dog|Ik _ een hond.|beach/sun|De zon is _.',
        'een en eet|animals/dog|Ik heb _ hond.|animals/cat|De kat _ de hond spelen.|animals/rabbit|Het konijn _ een wortel.',
        'met mes mat|toys/ball|Ik speel _ de bal.|around the house/knife|Ik snijd met een _.|around the house/rug|De kat ligt op de _.',
        'niet nieuw noot|animals/fish|De vis kan _ lopen.|vehicles/bicycle|Mijn fiets is _.|camping/squirrel|De eekhoorn eet een _.',
        'dat dak das|clothing/raincoat|Ik weet _ het regent.|animals/cat|De kat zit op het _.|accessories/scarf|In de winter draag ik een _.',
        'kan kat kam|birds/parrot|De vogel _ vliegen.|animals/cat|De _ zegt miauw.|around the house/comb|Met een _ maak ik mijn haar netjes.',
        'ik is in|fruits/apple|_ eet een appel.|beach/sun|De zon _ warm.|animals/fish|De vis zwemt _ het water.']
    },
    da: {
      sets: ['en|et han der', 'er|en der har', 'det|den der ven', 'og|om op os', 'på|pas så pæn', 'med|ved fed mit', 'han|hun hat kan', 'var|vare far har'],
      one: ['animals/dog|Jeg har _ hund.', 'animals/cat|Katten _ lille.', 'clothing/raincoat|_ regner i dag.', 'animals/cat|Katten _ hunden leger.', 'around the house/table|Katten sidder _ bordet.', 'animals/dog|Jeg går tur _ hunden.', 'animals/dog|Peter har en hund. _ leger med den.', 'bakery/muffin|Muffinen _ lækker.'],
      boards: ['en et der|animals/dog|Jeg har _ hund.|fruits/apple|Jeg har _ æble.|animals/cat|Se, _ er katten!',
        'er der har|animals/cat|Katten _ lille.|toys/ball|Hvor er bolden? _ er den!|animals/dog|Jeg _ to hunde.',
        'det den ven|clothing/raincoat|_ regner i dag.|toys/ball|Jeg kan lide _ røde bold.|animals/dog|Hunden er min bedste _.',
        'og op os|animals/cat|Katten _ hunden leger.|beach/sun|Solen står _.|activities/reading|Mor læser for _.',
        'på pæn pas|around the house/table|Katten sidder _ bordet.|animals/dog|Det er en _ hund.|vehicles/car|_ på bilen!',
        'med ved mit|animals/dog|Jeg går tur _ hunden.|around the house/door|Katten sidder _ døren.|fruits/apple|Det er _ æble.',
        'han hun hat|animals/dog|Peter har en hund. _ leger med den.|animals/cat|Mia har en kat. _ aer den.|accessories/hat|Jeg har en _ på hovedet.',
        'var far har|bakery/muffin|Muffinen _ lækker.|vehicles/car|Min _ kører bilen.|animals/cat|Katten _ en lang hale.']
    },
    sv: {
      sets: ['en|ett än in', 'är|ärt här när', 'det|den de dit', 'på|par så får', 'med|mer mat mod', 'inte|inne ute ifrån', 'han|hon hann hand', 'och|ost oss ord'],
      one: ['animals/dog|Jag har _ hund.', 'animals/cat|Katten _ liten.', 'clothing/raincoat|_ regnar ute.', 'around the house/table|Katten sitter _ bordet.', 'animals/dog|Jag leker _ hunden.', 'animals/fish|Fisken kan _ gå.', 'animals/dog|Kalle har en hund. _ leker med den.', 'animals/cat|Katten _ hunden leker.'],
      boards: ['en ett in|animals/dog|Jag har _ hund.|fruits/apple|Jag har _ äpple.|animals/cat|Katten går _ i huset.',
        'är här när|animals/cat|Katten _ liten.|toys/ball|_ är min boll.|bakery/cupcake|_ fyller du år?',
        'det den dit|clothing/raincoat|_ regnar ute.|toys/ball|_ röda bollen är min.|vehicles/bus|Vi åker _ i morgon.',
        'på så får|around the house/table|Katten sitter _ bordet.|animals/dog|Jag är _ glad!|christmas/present|Jag _ en present.',
        'med mer mat|animals/dog|Jag leker _ hunden.|breakfast/milk|Kan jag få _ mjölk?|animals/cat|Katten äter sin _.',
        'inte inne ifrån|animals/fish|Fisken kan _ gå.|animals/cat|Katten vill vara _ när det regnar.|vehicles/bus|Bussen kommer _ stan.',
        'han hon hand|animals/dog|Kalle har en hund. _ leker med den.|animals/cat|Lisa har en katt. _ klappar den.|body parts/hand|Jag vinkar med min _.',
        'och oss ost|animals/cat|Katten _ hunden leker.|activities/reading|Mamma läser för _.|pets/mouse|Musen äter _.']
    },
    no: {
      sets: ['en|et den han', 'et|en der det', 'er|en der har', 'det|den der vet', 'med|men ved mer', 'har|han hare hav', 'var|vår har han', 'på|pose så gå'],
      one: ['animals/dog|Jeg har _ hund.', 'fruits/apple|Jeg spiser _ eple.', 'animals/cat|Katten _ liten.', 'clothing/raincoat|_ regner i dag.', 'animals/dog|Jeg går tur _ hunden.', 'animals/dog|Jeg _ en hund.', 'vehicles/bus|Bussen _ her i går.', 'around the house/table|Katten sitter _ bordet.'],
      boards: ['en et den|animals/dog|Jeg har _ hund.|fruits/apple|Jeg har _ eple.|toys/ball|Hvor er ballen? Jeg ser _ ikke.',
        'et der det|fruits/apple|Jeg spiser _ eple.|animals/cat|Katten sitter _ borte.|christmas/snowman|_ snør i dag.',
        'er der har|animals/cat|Katten _ liten.|vehicles/bus|Se, _ er bussen!|toys/ball|Jeg _ to baller.',
        'det den vet|clothing/raincoat|_ regner i dag.|toys/ball|Jeg liker _ røde ballen.|animals/cat|Jeg _ hvor katten er.',
        'med men mer|animals/dog|Jeg går tur _ hunden.|animals/cat|Katten er liten, _ hunden er stor.|breakfast/milk|Kan jeg få _ melk?',
        'har han hare|animals/dog|Jeg _ en hund.|animals/cat|Ola har en katt. _ leker med den.||En _ hopper i snøen.',
        'var vår har|vehicles/bus|Bussen _ her i går.|animals/cat|Dette er _ katt.|animals/dog|Hunden _ en ball.',
        'på så gå|around the house/table|Katten sitter _ bordet.|animals/dog|Jeg er _ glad!|activities/playground|Vi skal _ til parken.']
    },
    es: {
      sets: ['el|en es al', 'la|las le ya', 'los|lo las sol', 'un|una uno tan', 'con|cono como son', 'por|pon par pan', 'mis|mi mes miel', 'sus|sur su luz'],
      one: ['animals/cat|_ gato duerme en la cama.', 'farm animals/hen|_ gallina pone un huevo.', 'animals/dog|_ perros corren en el parque.', 'animals/dog|Tengo _ perro.', 'around the house/sink|Me lavo las manos _ jabón.', 'around the house/door|El gato pasa _ la puerta.', 'clothing/shoe|Me pongo _ zapatos nuevos.', 'toys/ball|Los niños juegan con _ pelotas.'],
      boards: ['el en es|animals/cat|_ gato duerme en la cama.|animals/fish|El pez vive _ el agua.|beach/sun|El sol _ amarillo.',
        'la las ya|farm animals/hen|_ gallina pone un huevo.|fruits/apple|Me gustan _ manzanas.|camping/moon|_ es de noche y sale la luna.',
        'los las sol|animals/dog|_ perros corren en el parque.|fruits/apple|_ manzanas son rojas.|beach/sun|El _ brilla mucho.',
        'un una uno|animals/dog|Tengo _ perro.|fruits/apple|Me como _ manzana.|toys/balloon|Tengo dos globos y tú tienes _.',
        'con como son|around the house/sink|Me lavo las manos _ jabón.|animals/elephant|Es tan grande _ una casa.|animals/duck|Los patitos _ amarillos.',
        'por pan pon|around the house/door|El gato pasa _ la puerta.|bakery/bun|Me como un _ dulce.|around the house/table|_ la mesa, por favor.',
        'mis mi miel|clothing/shoe|Me pongo _ zapatos nuevos.|animals/cat|_ gato duerme mucho.|breakfast/honey|La abeja hace _.',
        'sus su luz|toys/ball|Los niños juegan con _ pelotas.|animals/dog|El perro come en _ plato.|around the house/lamp|Prende la _, por favor.']
    },
    pt: {
      sets: ['o|os ou ovo', 'da|do na dia', 'um|uma em eu', 'meu|meus mel meia', 'que|quem qual quente', 'não|nada mão pão', 'com|como bom som', 'ela|ele dela mala'],
      one: ['animals/cat|_ gato dorme na cama.', 'toys/ball|Peguei a bola _ menina.', 'animals/dog|Tenho _ cachorro.', 'animals/dog|Este é o _ cachorro.', 'clothing/raincoat|Eu acho _ vai chover.', 'animals/cat|O gato _ quer água.', 'around the house/sink|Eu lavo as mãos _ sabonete.', 'toys/ball|A menina pega a bola. _ joga a bola.'],
      boards: ['o os ou|animals/cat|_ gato dorme na cama.|animals/duck|_ patos nadam no lago.|breakfast/milk|Você quer leite _ água?',
        'da do na|toys/ball|Peguei a bola _ menina.|animals/dog|O rabo _ cachorro balança.|animals/fish|O peixe vive _ água.',
        'um uma em|animals/dog|Tenho _ cachorro.|fruits/apple|Comi _ maçã.|animals/cat|O gato dorme _ cima da cama.',
        'meu meus mel|animals/dog|Este é o _ cachorro.|clothing/shoe|Estes são os _ sapatos.|breakfast/honey|A abelha faz _.',
        'que quem quente|clothing/raincoat|Eu acho _ vai chover.|around the house/door|_ está na porta?|beach/sun|O sol está _.',
        'não nada pão|animals/cat|O gato _ quer água.|animals/fish|O peixe _ no aquário.|breakfast/butter|Eu como _ com manteiga.',
        'com como bom|around the house/sink|Eu lavo as mãos _ sabonete.|animals/elephant|É grande _ uma casa.|bakery/cupcake|Este cupcake é muito _.',
        'ela ele mala|toys/ball|A menina pega a bola. _ joga a bola.|animals/dog|O menino tem um cachorro. _ ama o cachorro.||Eu levo a _ na viagem.']
    },
    fr: {
      sets: ['les|le lit bus', 'une|un lune dune', 'dans|dent danse dame', 'pour|pou pot jour', 'avec|avant avion avez', 'mon|mot moi bon', 'son|salon sol sont', 'petit|patte pot lit'],
      one: ['animals/cat|Tous _ chats dorment.', 'fruits/apple|J’ai _ pomme.', 'animals/fish|Le poisson nage _ l’eau.', 'christmas/present|Ce cadeau est _ toi.', 'animals/dog|Je me promène _ mon chien.', 'animals/dog|C’est _ chien.', 'around the house/bowl|Le chien mange dans _ bol.', 'animals/cat|Mon chat est tout _.'],
      boards: ['les le lit|animals/cat|Tous _ chats dorment.|animals/dog|_ chien court.|around the house/bed|Le chat dort sur le _.',
        'une un lune|fruits/apple|J’ai _ pomme.|animals/dog|J’ai _ chien.|camping/moon|La nuit, je vois la _.',
        'dans dent danse|animals/fish|Le poisson nage _ l’eau.|body parts/tooth|J’ai mal à une _.|activities/dancing|La fille _ avec son ami.',
        'pour poule jour|christmas/present|Ce cadeau est _ toi.|farm animals/hen|La _ pond un œuf.|beach/sun|Il fait _, le soleil brille.',
        'avec avant avion|animals/dog|Je me promène _ mon chien.|around the house/sink|Je me lave les mains _ de manger.||Un _ vole dans le ciel.',
        'mon moi bon|animals/dog|C’est _ chien.|animals/cat|Le chat dort près de _.|bakery/croissant|Ce croissant est très _.',
        'son sont sol|around the house/bowl|Le chien mange dans _ bol.|animals/cat|Les chats _ contents.|toys/ball|La balle roule sur le _.',
        'petit patte lit|animals/cat|Mon chat est tout _.|animals/dog|Le chien lève la _.|around the house/bed|Je dors dans mon _.']
    },
    it: {
      sets: ['il|in li al', 'la|le lo va', 'uno|una un buono', 'con|come cono cane', 'per|pera pere però', 'che|chi cane casa', 'non|nonno nome mano', 'sono|suono sano sole'],
      one: ['animals/cat|_ gatto dorme.', 'farm animals/hen|_ gallina fa l’uovo.', 'accessories/backpack|Ho _ zaino.', 'around the house/sink|Mi lavo le mani _ il sapone.', 'christmas/present|Questo regalo è _ te.', 'beach/sun|_ bello il sole!', 'animals/cat|Il gatto _ vuole l’acqua.', 'fruits/apple|Le mele _ rosse.'],
      boards: ['il in al|animals/cat|_ gatto dorme.|animals/fish|Il pesce vive _ acqua.|breakfast/milk|Do il latte _ gatto.',
        'la le va|farm animals/hen|_ gallina fa l’uovo.|fruits/apple|_ mele sono rosse.|animals/dog|Il cane _ al parco.',
        'uno una un|accessories/backpack|Ho _ zaino.|fruits/apple|Mangio _ mela.|animals/dog|Ho _ cane.',
        'con come cono|around the house/sink|Mi lavo le mani _ il sapone.|animals/elephant|È grande _ una casa.||Mangio il gelato nel _.',
        'per pera però|christmas/present|Questo regalo è _ te.|fruits/pear|Mangio una _ verde.|accessories/umbrella|Piove, _ io gioco lo stesso.',
        'che chi casa|beach/sun|_ bello il sole!|around the house/door|_ bussa alla porta?|animals/dog|Il cane torna a _.',
        'non nome mano|animals/cat|Il gatto _ vuole l’acqua.|animals/dog|Il _ del mio cane è Fido.|body parts/hand|Alzo la _.',
        'sono suono sole|fruits/apple|Le mele _ rosse.|christmas/bell|Il _ della campana è forte.|beach/sun|Il _ splende nel cielo.']
    },
    fi: {
      sets: ['ja|jo jaa jano', 'on|en ovi onni', 'ei|en eli oi', 'se|ne sen me', 'hän|hana häntä hänen', 'mutta|matto mitta mato', 'kun|kuu kuin kana', 'tämä|tämän nämä tähti'],
      one: ['animals/cat|Kissa _ koira leikkivät.', 'animals/cat|Kissa _ pieni.', 'animals/fish|Kala _ osaa kävellä.', 'toys/ball|Tässä on pallo. _ pomppii.', 'farm animals/horse|Liisa ratsastaa. _ on iloinen.', 'animals/cat|Kissa on pieni, _ koira on iso.', 'beach/sun|Ilta tulee, _ aurinko laskee.', 'fruits/apple|_ omena on minun.'],
      boards: ['ja jo jano|animals/cat|Kissa _ koira leikkivät.|vehicles/bus|Bussi tuli _.|animals/dog|Koiralla on _.',
        'on en ovi|animals/cat|Kissa _ pieni.|around the house/bed|Minä _ halua nukkua.|around the house/door|_ on auki.',
        'ei en eli|animals/fish|Kala _ osaa kävellä.|animals/dog|Minä _ pelkää koiraa.|animals/dog|Tämä on Musti _ meidän koira.',
        'se ne me|toys/ball|Tässä on pallo. _ pomppii.|animals/cat|Tässä on kaksi kissaa. _ nukkuvat.|activities/playground|_ menemme puistoon.',
        'hän häntä hai|farm animals/horse|Liisa ratsastaa. _ on iloinen.|animals/cat|Kissan _ on pitkä.||Meressä ui iso _.',
        'mutta matto mato|animals/cat|Kissa on pieni, _ koira on iso.|around the house/rug|Olohuoneessa on iso pehmeä _.||Linnun nokassa on _.',
        'kun kuu kana|beach/sun|Ilta tulee, _ aurinko laskee.|camping/moon|Taivaalla on _.|farm animals/hen|_ munii munan.',
        'tämä nämä tähti|fruits/apple|_ omena on minun.|fruits/apple|_ omenat ovat sinun.|christmas/star|Taivaalla loistaa _.']
    }
  };
  /*DATA-END*/

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var GAMES = ['three', 'ring', 'cut'];
  var MIN_ROUNDS = 7, TRAY = 8, FILL = 'aeinorstlu';

  function locale(l) { l = String(l || 'en').slice(0, 2); return DATA[l] ? l : 'en'; }
  function low(s) { return String(s).normalize('NFC').toLocaleLowerCase(); }
  function cap(s) { return s.charAt(0).toLocaleUpperCase() + s.slice(1); }
  function base(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase(); }
  /* a lock: the sentence around its gap; a gap at the start takes a capital */
  function lock(pic, text, answer) {
    var i = text.indexOf('_');
    return { pic: pic || null, before: text.slice(0, i), after: text.slice(i + 1), answer: answer, initial: !text.slice(0, i).trim() };
  }
  function filled(lk, word) { return lk.before + (lk.initial ? cap(word) : word) + lk.after; }

  function rounds(loc, game) {
    loc = locale(loc); var D = DATA[loc];
    if (game === 'ring') return D.boards.map(function (b, i) {
      var p = b.split('|'), keys = p[0].split(' ');
      return { id: 'ring-' + i, game: game, loc: loc, i: i, keys: keys, locks: keys.map(function (w, k) { return lock(p[1 + k * 2], p[2 + k * 2], w); }) };
    });
    return D.sets.map(function (s, i) {
      var p = s.split('|'), q = D.one[i].split('|');
      return { id: game + '-' + i + '-' + low(p[0]), game: game, loc: loc, i: i, target: p[0], looks: p[1].split(' '), locks: [lock(q[0], q[1], p[0])] };
    });
  }
  function games(loc) { loc = locale(loc); return GAMES.filter(function (g) { return rounds(loc, g).length >= MIN_ROUNDS; }); }
  function game(loc, g) { var gs = games(loc); return gs.indexOf(g) >= 0 ? g : gs[0]; }

  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }

  /* Three keys, one pass: the word and two of its three look-alikes (the one left out rotates with the pass),
     the word's peg balanced 3/3/2 over the pass */
  function dealThree(R, rnd, pass) {
    var pegs = []; for (var q = 0; q < R.length; q++) pegs.push(q % 3); shuffle(pegs, rnd);
    return R.map(function (r, k) {
      /* the look-alike left out never takes the last one that shares the word's first letter with it */
      var f = base(r.target).charAt(0), cand = [0, 1, 2].filter(function (o) { return r.looks.some(function (w, j) { return j !== o && base(w).charAt(0) === f; }); });
      if (!cand.length) cand = [0, 1, 2];
      var out = cand[(k + (pass || 0)) % cand.length], looks = r.looks.filter(function (_, j) { return j !== out; });
      if (rnd() < 0.5) looks.reverse();
      var keys = [], li = 0; for (var s = 0; s < 3; s++) keys.push(s === pegs[k] ? r.target : looks[li++]);
      return keys;
    });
  }
  /* Key ring: the keys on the rail never hang in the order of the locks (a derangement), alternating its two forms */
  function dealRing(R, rnd) {
    var forms = [[1, 2, 0], [2, 0, 1]], start = rnd() < 0.5 ? 0 : 1;
    return R.map(function (r, k) { return forms[(k + start) % 2].map(function (i) { return r.keys[i]; }); });
  }
  /* Cut the key: the word's letters, the look-alikes' other letters, filled to 8 tiles;
     the word's letters never stand next to each other in spelling order */
  function tray(r, rnd) {
    var need = [], extra = [];
    Array.from(low(r.target)).forEach(function (c) { if (need.indexOf(c) < 0) need.push(c); });
    r.looks.forEach(function (w) { Array.from(low(w)).forEach(function (c) { if (need.indexOf(c) < 0 && extra.indexOf(c) < 0) extra.push(c); }); });
    Array.from(FILL).forEach(function (c) { if (need.length + extra.length < TRAY && need.indexOf(c) < 0 && extra.indexOf(c) < 0) extra.push(c); });
    var tiles = need.concat(extra.slice(0, Math.max(0, TRAY - need.length)));
    for (var t = 0; t < 200; t++) { shuffle(tiles, rnd); if (!spellsInOrder(tiles, need)) break; }
    return tiles;
  }
  function spellsInOrder(tiles, need) { for (var i = 0; i + 1 < need.length; i++) { var a = tiles.indexOf(need[i]); if (a >= 0 && tiles[a + 1] === need[i + 1]) return true; } return false; }

  /* ---------------- the round ---------------- */
  function newState(r, opts) {
    opts = opts || {};
    var st = { r: r, keys: opts.keys || (r.keys || [r.target].concat(r.looks.slice(0, 2))).slice(), inLock: r.locks.map(function () { return null; }), opened: r.locks.map(function () { return false; }), cut: '', tiles: opts.tiles || [], misses: 0, help: 0, show: false, last: null, done: false };
    return st;
  }
  function moved(st) { st.show = false; st.last = null; }
  /* a key into a lock (from the rail or from another lock); an opened lock takes nothing */
  function insert(st, key, li) {
    if (st.done || st.r.game === 'cut' || li < 0 || li >= st.r.locks.length || st.opened[li] || st.keys.indexOf(key) < 0) return false;
    if (st.inLock[li] === key) return false;
    for (var j = 0; j < st.inLock.length; j++) if (st.inLock[j] === key && !st.opened[j]) st.inLock[j] = null;
    if (st.opened.some(function (o, j) { return o && st.r.locks[j].answer === key; })) return false;   /* a key that opened a lock stays there */
    st.inLock[li] = key; moved(st); return true;
  }
  function remove(st, li) { if (st.done || st.opened[li] || !st.inLock[li]) return false; st.inLock[li] = null; moved(st); return true; }
  function cutLetter(st, ch) { if (st.done || st.r.game !== 'cut' || st.cut.length >= 7 || st.tiles.indexOf(ch) < 0) return false; st.cut += ch; moved(st); return true; }
  function uncut(st) { if (st.done || !st.cut.length) return false; st.cut = Array.from(st.cut).slice(0, -1).join(''); moved(st); return true; }
  /* tooth by tooth against the lock's word: which teeth differ (accents are teeth), which stick out, how many notches stay empty */
  function diff(answer, key) {
    var a = Array.from(String(answer).normalize('NFC')), b = Array.from(String(key).normalize('NFC')), glow = [], extra = [];
    for (var i = 0; i < b.length; i++) { if (i >= a.length) extra.push(i); else if (a[i] !== b[i]) glow.push(i); }
    return { glow: glow, extra: extra, missing: Math.max(0, a.length - b.length) };
  }
  function opens(key, answer) { return String(key).normalize('NFC') === String(answer).normalize('NFC'); }
  /* THE TURN: every lock with a key in it is tried; right keys turn and the locks open for good, wrong keys jam */
  function turn(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (r.game === 'cut') { st.inLock[0] = st.cut || null; }
    var tried = [];
    r.locks.forEach(function (lk, i) { if (!st.opened[i] && st.inLock[i]) tried.push(i); });
    if (!tried.length) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
    var opened = [], jammed = [];
    tried.forEach(function (i) { if (opens(st.inLock[i], r.locks[i].answer)) { st.opened[i] = true; opened.push(i); } else jammed.push({ lock: i, key: st.inLock[i], diff: diff(r.locks[i].answer, st.inLock[i]) }); });
    if (!jammed.length && st.opened.every(Boolean)) { st.done = true; st.show = false; st.last = { result: 'right', opened: opened }; return { ok: true, opened: opened }; }
    if (!jammed.length) { st.show = true; st.last = { result: 'open', opened: opened }; return { ok: false, kase: 'open', opened: opened }; }
    st.misses++; st.help = Math.min(3, st.misses); st.show = true;
    st.last = { result: 'jam', opened: opened, jammed: jammed };
    return { ok: false, kase: 'jam', opened: opened, jammed: jammed };
  }
  /* the help in a jammed lock: glowing teeth at miss 1, glass pins at miss 2, ghost letters from miss 3 */
  function lockHelp(st, li) {
    if (st.done || !st.show || !st.last || st.last.result !== 'jam') return null;
    var j = st.last.jammed.filter(function (x) { return x.lock === li; })[0]; if (!j) return null;
    return { diff: j.diff, glass: st.help >= 2, ghost: st.help >= 3, pins: Array.from(st.r.locks[li].answer).length };
  }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    if (st.last.result === 'empty') return st.r.game === 'cut' ? 'hintEmptyCut' : 'hintEmpty';
    if (st.last.result === 'jam') return st.help >= 2 ? (st.r.game === 'cut' ? 'hintGlassCut' : 'hintGlass') : 'hintJam';
    if (st.last.result === 'open') return 'hintOpen';
    return null;
  }
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }
  function layout(W) {
    var wide = W >= 560, tiny = W < 340, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.pic = wide ? 120 : 72; L.rpic = wide ? 96 : 64;
    L.font = wide ? 30 : tiny ? 21 : 23; L.rfont = wide ? 26 : tiny ? 21 : 22;
    L.tooth = wide ? 34 : tiny ? 24 : 27; L.letter = wide ? 30 : tiny ? 20 : 23; L.keyH = wide ? 64 : 52; L.bow = wide ? 40 : 30;
    L.lockW = wide ? 132 : 112; L.lockH = wide ? 72 : 60; L.tile = wide ? 56 : tiny ? 46 : 60;
    return L;
  }

  return {
    DATA: DATA, LOCALES: LOCALES, GAMES: GAMES, MIN_ROUNDS: MIN_ROUNDS, TRAY: TRAY,
    locale: locale, rounds: rounds, games: games, game: game, filled: filled, cap: cap, seeded: seeded, dealThree: dealThree, dealRing: dealRing, tray: tray, spellsInOrder: spellsInOrder,
    newState: newState, insert: insert, remove: remove, cutLetter: cutLetter, uncut: uncut, diff: diff, opens: opens, turn: turn, lockHelp: lockHelp, hint: hint, order: order, layout: layout
  };
}));
