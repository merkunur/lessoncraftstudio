/* =====================================================================
   story-stage-core.js — the model of THE STORY STAGE (activity #24 of the
   one-by-one rebuild, "Solve the Story", K.OA.A.2).
   Design sheet: docs/activities-rebuild/designs/024-ten-frame.md
   ---------------------------------------------------------------------
   One round = one short story in three lines: the narrator's line (it acts
   itself out — its things arrive on the ten-frame stage), the child's line
   (the child performs it: brings more things from the supply pile, or taps
   things so they leave and stay as a crossed outline), and the question
   (the keypad wakes; the child types how many).

   The stories are stored as whole sentences per locale and per story kind,
   with {a} {b} {n} numerals and a *_1 variant wherever a 1 changes the
   grammar — never assembled from a noun and a number (fi partitive, es/pt
   gender, de/nl/sv plural). The gate parses the numerals back out of every
   rendered sentence and compares them with the round's data.

   Pure model, no DOM. Node-loadable (verify-story-stage-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  var LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
  var LEVELS_LIST = ['within5', 'within10', 'within20'];
  var FRAME = 10;

  /* the library pictures: [theme dir, noun key] — all colour themes, all seen on contact sheets */
  var PICS = {
    bird: ['spring', 'bird'], bunny: ['spring', 'bunny'], tulip: ['spring', 'tulip'],
    apple: ['At the Supermarket', 'apple'], pear: ['At the Supermarket', 'pear'],
    duck: ['farm animals', 'duck'], balloon: ['toys', 'balloon'],
    cookie: ['bakery', 'cookie'], goldfish: ['pets', 'goldfish']
  };
  /* drawn counters (within 20): one colour per picture */
  var COUNTER = { bird: '#E07A3F', bunny: '#9C6B45', tulip: '#D23B45', apple: '#D9342B', pear: '#8DB33A', duck: '#E8B71E', balloon: '#2F9C55', cookie: '#B9844C', goldfish: '#EE8A22' };

  /* type: add (add to) · take (take from) · put (put together: two kinds) */
  var KINDS = {
    bird:    { type: 'add',  pics: ['bird'],            scene: 'sky' },
    apple:   { type: 'add',  pics: ['apple'],           scene: 'table' },
    duck:    { type: 'add',  pics: ['duck'],            scene: 'pond' },
    bunny:   { type: 'add',  pics: ['bunny'],           scene: 'grass' },
    balloon: { type: 'take', pics: ['balloon'],         scene: 'sky',   leave: 'pop' },
    cookie:  { type: 'take', pics: ['cookie'],          scene: 'table', leave: 'eat' },
    fish:    { type: 'take', pics: ['goldfish'],        scene: 'pond',  leave: 'swim' },
    tulip:   { type: 'take', pics: ['tulip'],           scene: 'grass', leave: 'pick' },
    animals: { type: 'put',  pics: ['bird', 'bunny'],   scene: 'grass' },
    fruits:  { type: 'put',  pics: ['apple', 'pear'],   scene: 'table' }
  };

  /* the rounds: [kind, start, change] — no 0 anywhere, the answer never equals a number in the story */
  var LEVELS = {
    within5:  [['bird', 2, 2], ['duck', 1, 3], ['apple', 3, 2], ['bunny', 2, 1], ['balloon', 5, 2], ['cookie', 4, 1], ['fish', 5, 4], ['tulip', 3, 2], ['animals', 2, 3]],
    within10: [['bird', 3, 2], ['apple', 4, 3], ['duck', 2, 4], ['bunny', 5, 4], ['balloon', 7, 3], ['cookie', 8, 2], ['fish', 6, 4], ['tulip', 9, 5], ['animals', 4, 3], ['fruits', 5, 3]],
    within20: [['bird', 8, 5], ['apple', 9, 6], ['duck', 7, 7], ['balloon', 12, 4], ['cookie', 15, 6], ['fish', 13, 5], ['tulip', 18, 7], ['bunny', 10, 6], ['fruits', 6, 8]]
  };

  /* ---------------- the stories ----------------
     s0 = the narrator's line ({a}) · s1 = the child's line ({b}) · q = the question ·
     done = the question completed ({n}). key_1 = the form used when that number is 1. */
  var STORIES = {
    en: {
      bird:    { s0: '{a} birds sit on a branch.', s1: '{b} more birds land.', q: 'How many birds are there now?', done: 'There are {n} birds now!' },
      apple:   { s0: '{a} apples are in a basket.', s1: 'You put in {b} more.', q: 'How many apples are there now?', done: 'There are {n} apples now!' },
      duck:    { s0: '{a} ducklings swim in the pond.', s0_1: '{a} duckling swims in the pond.', s1: '{b} more ducklings swim over.', q: 'How many ducklings are there now?', done: 'There are {n} ducklings now!' },
      bunny:   { s0: '{a} bunnies play in the garden.', s1: '{b} more bunnies hop in.', s1_1: '{b} more bunny hops in.', q: 'How many bunnies are there now?', done: 'There are {n} bunnies now!' },
      balloon: { s0: '{a} balloons float in the air.', s1: '{b} balloons pop.', q: 'How many balloons are left?', done: '{n} balloons are left!' },
      cookie:  { s0: '{a} cookies are on a plate.', s1: 'You eat {b} cookies.', s1_1: 'You eat {b} cookie.', q: 'How many cookies are left?', done: '{n} cookies are left!' },
      fish:    { s0: '{a} fish swim in a tank.', s1: '{b} fish swim away.', q: 'How many fish are left?', done: '{n} fish are left!', done_1: '{n} fish is left!' },
      tulip:   { s0: '{a} tulips grow in the garden.', s1: '{b} tulips are picked.', q: 'How many tulips are left?', done: '{n} tulips are left!', done_1: '{n} tulip is left!' },
      animals: { s0: '{a} birds sit in the garden.', s1: '{b} bunnies sit with them.', q: 'How many animals are there?', done: 'There are {n} animals!' },
      fruits:  { s0: '{a} apples are on the table.', s1: '{b} pears are next to them.', q: 'How many fruits are there?', done: 'There are {n} fruits!' }
    },
    de: {
      bird:    { s0: '{a} Vögel sitzen auf einem Ast.', s1: '{b} weitere Vögel landen dazu.', q: 'Wie viele Vögel sind es jetzt?', done: 'Jetzt sind es {n} Vögel!' },
      apple:   { s0: '{a} Äpfel liegen in einem Korb.', s1: 'Du legst {b} weitere Äpfel hinein.', q: 'Wie viele Äpfel sind es jetzt?', done: 'Jetzt sind es {n} Äpfel!' },
      duck:    { s0: '{a} Entenküken schwimmen im Teich.', s0_1: '{a} Entenküken schwimmt im Teich.', s1: '{b} weitere Entenküken schwimmen herbei.', q: 'Wie viele Entenküken sind es jetzt?', done: 'Jetzt sind es {n} Entenküken!' },
      bunny:   { s0: '{a} Hasen spielen im Garten.', s1: '{b} weitere Hasen hoppeln dazu.', s1_1: '{b} weiterer Hase hoppelt dazu.', q: 'Wie viele Hasen sind es jetzt?', done: 'Jetzt sind es {n} Hasen!' },
      balloon: { s0: '{a} Luftballons schweben in der Luft.', s1: '{b} Luftballons platzen.', q: 'Wie viele Luftballons sind noch übrig?', done: '{n} Luftballons sind noch übrig!' },
      cookie:  { s0: '{a} Kekse liegen auf einem Teller.', s1: 'Du isst {b} Kekse.', s1_1: 'Du isst {b} Keks.', q: 'Wie viele Kekse sind noch übrig?', done: '{n} Kekse sind noch übrig!' },
      fish:    { s0: '{a} Fische schwimmen in einem Becken.', s1: '{b} Fische schwimmen davon.', q: 'Wie viele Fische sind noch übrig?', done: '{n} Fische sind noch übrig!', done_1: '{n} Fisch ist noch übrig!' },
      tulip:   { s0: '{a} Tulpen wachsen im Garten.', s1: '{b} Tulpen werden gepflückt.', q: 'Wie viele Tulpen sind noch übrig?', done: '{n} Tulpen sind noch übrig!', done_1: '{n} Tulpe ist noch übrig!' },
      animals: { s0: '{a} Vögel sitzen im Garten.', s1: '{b} Hasen sitzen bei ihnen.', q: 'Wie viele Tiere sind es?', done: 'Es sind {n} Tiere!' },
      fruits:  { s0: '{a} Äpfel liegen auf dem Tisch.', s1: '{b} Birnen liegen daneben.', q: 'Wie viele Früchte sind es?', done: 'Es sind {n} Früchte!' }
    },
    fr: {
      bird:    { s0: '{a} oiseaux sont sur la branche.', s1: '{b} autres oiseaux arrivent.', q: 'Combien d’oiseaux y a-t-il maintenant ?', done: 'Il y a maintenant {n} oiseaux !' },
      apple:   { s0: 'Il y a {a} pommes dans le panier.', s1: 'On en ajoute {b} de plus.', q: 'Combien de pommes y a-t-il maintenant ?', done: 'Il y a maintenant {n} pommes !' },
      duck:    { s0: '{a} canetons nagent sur l’étang.', s0_1: '{a} caneton nage sur l’étang.', s1: '{b} autres canetons arrivent en nageant.', q: 'Combien de canetons y a-t-il maintenant ?', done: 'Il y a maintenant {n} canetons !' },
      bunny:   { s0: '{a} lapins jouent dans le jardin.', s1: '{b} autres lapins arrivent en sautillant.', s1_1: '{b} autre lapin arrive en sautillant.', q: 'Combien de lapins y a-t-il maintenant ?', done: 'Il y a maintenant {n} lapins !' },
      balloon: { s0: 'Il y a {a} ballons dans le ciel.', s1: '{b} ballons éclatent.', q: 'Combien de ballons reste-t-il ?', done: 'Il reste {n} ballons !' },
      cookie:  { s0: 'Il y a {a} biscuits sur l’assiette.', s1: 'On en mange {b}.', s1_1: 'On en mange {b}.', q: 'Combien de biscuits reste-t-il ?', done: 'Il reste {n} biscuits !' },
      fish:    { s0: '{a} poissons nagent dans le bocal.', s1: '{b} poissons s’en vont.', q: 'Combien de poissons reste-t-il ?', done: 'Il reste {n} poissons !', done_1: 'Il reste {n} poisson !' },
      tulip:   { s0: 'Il y a {a} tulipes dans le jardin.', s1: 'On en cueille {b}.', q: 'Combien de tulipes reste-t-il ?', done: 'Il reste {n} tulipes !', done_1: 'Il reste {n} tulipe !' },
      animals: { s0: '{a} oiseaux sont dans le jardin.', s1: '{b} lapins sont avec eux.', q: 'Combien d’animaux y a-t-il ?', done: 'Il y a {n} animaux !' },
      fruits:  { s0: 'Il y a {a} pommes sur la table.', s1: '{b} poires sont à côté.', q: 'Combien de fruits y a-t-il ?', done: 'Il y a {n} fruits !' }
    },
    es: {
      bird:    { s0: '{a} pájaros están en el árbol.', s1: 'Llegan {b} pájaros más.', q: '¿Cuántos pájaros hay ahora?', done: '¡Ahora hay {n} pájaros!' },
      apple:   { s0: 'Hay {a} manzanas en la canasta.', s1: 'Pones {b} manzanas más.', q: '¿Cuántas manzanas hay ahora?', done: '¡Ahora hay {n} manzanas!' },
      duck:    { s0: '{a} patitos nadan en el estanque.', s0_1: '{a} patito nada en el estanque.', s1: 'Llegan nadando {b} patitos más.', q: '¿Cuántos patitos hay ahora?', done: '¡Ahora hay {n} patitos!' },
      bunny:   { s0: '{a} conejos juegan en el jardín.', s1: 'Llegan brincando {b} conejos más.', s1_1: 'Llega brincando {b} conejo más.', q: '¿Cuántos conejos hay ahora?', done: '¡Ahora hay {n} conejos!' },
      balloon: { s0: 'Tienes {a} globos.', s1: 'Se revientan {b} globos.', q: '¿Cuántos globos quedan?', done: '¡Quedan {n} globos!' },
      cookie:  { s0: 'Hay {a} galletas en el plato.', s1: 'Te comes {b} galletas.', s1_1: 'Te comes {b} galleta.', q: '¿Cuántas galletas quedan?', done: '¡Quedan {n} galletas!' },
      fish:    { s0: '{a} peces nadan en la pecera.', s1: '{b} peces se alejan nadando.', q: '¿Cuántos peces quedan?', done: '¡Quedan {n} peces!', done_1: '¡Queda {n} pez!' },
      tulip:   { s0: 'En el jardín hay {a} tulipanes.', s1: 'Cortas {b} tulipanes.', q: '¿Cuántos tulipanes quedan?', done: '¡Quedan {n} tulipanes!', done_1: '¡Queda {n} tulipán!' },
      animals: { s0: '{a} pájaros están en el jardín.', s1: '{b} conejos están con ellos.', q: '¿Cuántos animales hay?', done: '¡Hay {n} animales!' },
      fruits:  { s0: 'Hay {a} manzanas en la mesa.', s1: 'Junto a ellas hay {b} peras.', q: '¿Cuántas frutas hay?', done: '¡Hay {n} frutas!' }
    },
    it: {
      bird:    { s0: 'Sul ramo ci sono {a} uccellini.', s1: 'Ne arrivano altri {b}.', q: 'Quanti uccellini ci sono adesso?', done: 'Adesso ci sono {n} uccellini!' },
      apple:   { s0: 'In un cestino ci sono {a} mele.', s1: 'La mamma ne mette altre {b}.', q: 'Quante mele ci sono ora nel cestino?', done: 'Ora nel cestino ci sono {n} mele!' },
      duck:    { s0: 'Nello stagno nuotano {a} anatroccoli.', s0_1: 'Nello stagno nuota {a} anatroccolo.', s1: 'Arrivano altri {b} anatroccoli.', q: 'Quanti anatroccoli ci sono adesso?', done: 'Adesso ci sono {n} anatroccoli!' },
      bunny:   { s0: 'In giardino giocano {a} coniglietti.', s1: 'Arrivano saltellando altri {b} coniglietti.', s1_1: 'Arriva saltellando ancora {b} coniglietto.', q: 'Quanti coniglietti ci sono adesso?', done: 'Adesso ci sono {n} coniglietti!' },
      balloon: { s0: 'Marco tiene {a} palloncini.', s1: 'Ne scoppiano {b}.', q: 'Quanti palloncini gli rimangono?', done: 'Gli rimangono {n} palloncini!' },
      cookie:  { s0: 'Sul piatto ci sono {a} biscotti.', s1: 'Ne mangiamo {b}.', s1_1: 'Ne mangiamo {b}.', q: 'Quanti biscotti restano?', done: 'Restano {n} biscotti!' },
      fish:    { s0: 'Nella vasca ci sono {a} pesciolini.', s1: 'Poi {b} nuotano via.', q: 'Quanti pesciolini rimangono nella vasca?', done: 'Nella vasca rimangono {n} pesciolini!', done_1: 'Nella vasca rimane {n} pesciolino!' },
      tulip:   { s0: 'In giardino ci sono {a} tulipani.', s1: 'La bambina ne raccoglie {b}.', q: 'Quanti tulipani restano in giardino?', done: 'In giardino restano {n} tulipani!', done_1: 'In giardino resta {n} tulipano!' },
      animals: { s0: 'In giardino ci sono {a} uccellini.', s1: 'Con loro ci sono {b} coniglietti.', q: 'Quanti animali ci sono?', done: 'Ci sono {n} animali!' },
      fruits:  { s0: 'Sul tavolo ci sono {a} mele.', s1: 'Accanto ci sono {b} pere.', q: 'Quanti frutti ci sono?', done: 'Ci sono {n} frutti!' }
    },
    pt: {
      bird:    { s0: '{a} passarinhos estão pousados no galho.', s1: 'Mais {b} passarinhos chegam voando.', q: 'Quantos passarinhos há agora no galho?', done: 'Agora há {n} passarinhos no galho!' },
      apple:   { s0: 'Tem {a} maçãs na cesta.', s1: 'A Lia coloca mais {b} maçãs na cesta.', q: 'Quantas maçãs há agora na cesta?', done: 'Agora há {n} maçãs na cesta!' },
      duck:    { s0: '{a} patinhos estão nadando no lago.', s0_1: '{a} patinho está nadando no lago.', s1: 'Mais {b} patinhos chegam nadando.', q: 'Quantos patinhos há agora no lago?', done: 'Agora há {n} patinhos no lago!' },
      bunny:   { s0: '{a} coelhinhos brincam no jardim.', s1: 'Mais {b} coelhinhos chegam pulando.', s1_1: 'Mais {b} coelhinho chega pulando.', q: 'Quantos coelhinhos há agora?', done: 'Agora há {n} coelhinhos!' },
      balloon: { s0: 'O Téo tem {a} balões.', s1: '{b} balões estouram.', q: 'Quantos balões sobraram?', done: 'Sobraram {n} balões!' },
      cookie:  { s0: 'Tem {a} biscoitos no prato.', s1: 'A Bia come {b} biscoitos.', s1_1: 'A Bia come {b} biscoito.', q: 'Quantos biscoitos sobraram no prato?', done: 'Sobraram {n} biscoitos no prato!' },
      fish:    { s0: '{a} peixinhos estão no aquário.', s1: '{b} peixinhos nadam para longe.', q: 'Quantos peixinhos sobraram no aquário?', done: 'Sobraram {n} peixinhos no aquário!', done_1: 'Sobrou {n} peixinho no aquário!' },
      tulip:   { s0: 'Tem {a} tulipas no jardim.', s1: 'A Nina colhe {b} tulipas.', q: 'Quantas tulipas sobraram no jardim?', done: 'Sobraram {n} tulipas no jardim!', done_1: 'Sobrou {n} tulipa no jardim!' },
      animals: { s0: '{a} passarinhos estão no jardim.', s1: '{b} coelhinhos estão com eles.', q: 'Quantos animais há?', done: 'Há {n} animais!' },
      fruits:  { s0: 'Tem {a} maçãs na mesa.', s1: 'Ao lado tem {b} peras.', q: 'Quantas frutas há?', done: 'Há {n} frutas!' }
    },
    nl: {
      bird:    { s0: 'Er zitten {a} vogels op een tak.', s1: 'Er komen {b} vogels bij.', q: 'Hoeveel vogels zijn er nu?', done: 'Er zijn nu {n} vogels!' },
      apple:   { s0: 'In het mandje liggen {a} appels.', s1: 'Je legt er {b} appels bij.', q: 'Hoeveel appels zijn het nu?', done: 'Het zijn nu {n} appels!' },
      duck:    { s0: 'Er zwemmen {a} eendjes in de vijver.', s0_1: 'Er zwemt {a} eendje in de vijver.', s1: 'Er komen {b} eendjes bij.', q: 'Hoeveel eendjes zijn er nu?', done: 'Er zijn nu {n} eendjes!' },
      bunny:   { s0: 'Er spelen {a} konijntjes in de tuin.', s1: 'Er huppelen {b} konijntjes bij.', s1_1: 'Er huppelt {b} konijntje bij.', q: 'Hoeveel konijntjes zijn er nu?', done: 'Er zijn nu {n} konijntjes!' },
      balloon: { s0: 'Je hebt {a} ballonnen.', s1: 'Er knappen {b} ballonnen.', q: 'Hoeveel ballonnen heb je nog?', done: 'Je hebt nog {n} ballonnen!' },
      cookie:  { s0: 'Op het bord liggen {a} koekjes.', s1: 'Je eet er {b} op.', s1_1: 'Je eet er {b} op.', q: 'Hoeveel koekjes liggen er nog?', done: 'Er liggen nog {n} koekjes!' },
      fish:    { s0: 'Er zwemmen {a} visjes in de kom.', s1: 'Er zwemmen {b} visjes weg.', q: 'Hoeveel visjes zijn er nog?', done: 'Er zijn nog {n} visjes!', done_1: 'Er is nog {n} visje!' },
      tulip:   { s0: 'In de tuin staan {a} tulpen.', s1: 'Je plukt er {b}.', q: 'Hoeveel tulpen staan er nog?', done: 'Er staan nog {n} tulpen!', done_1: 'Er staat nog {n} tulp!' },
      animals: { s0: 'Er zitten {a} vogels in de tuin.', s1: 'Er zitten {b} konijntjes bij.', q: 'Hoeveel dieren zijn er?', done: 'Er zijn {n} dieren!' },
      fruits:  { s0: 'Er liggen {a} appels op tafel.', s1: 'Ernaast liggen {b} peren.', q: 'Hoeveel stuks fruit zijn er?', done: 'Er zijn {n} stuks fruit!' }
    },
    sv: {
      bird:    { s0: '{a} fåglar sitter på en gren.', s1: '{b} fåglar till landar.', q: 'Hur många fåglar är det nu?', done: 'Nu är det {n} fåglar!' },
      apple:   { s0: 'Det ligger {a} äpplen i korgen.', s1: 'Du lägger i {b} äpplen till.', q: 'Hur många äpplen är det nu?', done: 'Nu är det {n} äpplen!' },
      duck:    { s0: '{a} ankungar simmar i dammen.', s0_1: '{a} ankunge simmar i dammen.', s1: '{b} ankungar till kommer simmande.', q: 'Hur många ankungar är det nu?', done: 'Nu är det {n} ankungar!' },
      bunny:   { s0: '{a} kaniner leker i trädgården.', s1: '{b} kaniner till skuttar dit.', s1_1: '{b} kanin till skuttar dit.', q: 'Hur många kaniner är det nu?', done: 'Nu är det {n} kaniner!' },
      balloon: { s0: 'Du har {a} ballonger.', s1: '{b} ballonger spricker.', q: 'Hur många ballonger är kvar?', done: '{n} ballonger är kvar!' },
      cookie:  { s0: 'Det ligger {a} kakor på fatet.', s1: 'Du äter {b} kakor.', s1_1: 'Du äter {b} kaka.', q: 'Hur många kakor är kvar?', done: '{n} kakor är kvar!' },
      fish:    { s0: '{a} fiskar simmar i akvariet.', s1: '{b} fiskar simmar bort.', q: 'Hur många fiskar är kvar?', done: '{n} fiskar är kvar!', done_1: '{n} fisk är kvar!' },
      tulip:   { s0: 'Det växer {a} tulpaner i trädgården.', s1: 'Du plockar {b} tulpaner.', q: 'Hur många tulpaner är kvar?', done: '{n} tulpaner är kvar!', done_1: '{n} tulpan är kvar!' },
      animals: { s0: '{a} fåglar sitter i trädgården.', s1: '{b} kaniner sitter bredvid dem.', q: 'Hur många djur är det?', done: 'Det är {n} djur!' },
      fruits:  { s0: 'Det ligger {a} äpplen på bordet.', s1: 'Bredvid ligger {b} päron.', q: 'Hur många frukter är det?', done: 'Det är {n} frukter!' }
    },
    da: {
      bird:    { s0: '{a} fugle sidder på grenen.', s1: '{b} fugle mere lander.', q: 'Hvor mange fugle er der nu?', done: 'Nu er der {n} fugle!' },
      apple:   { s0: 'Der ligger {a} æbler i kurven.', s1: 'Du lægger {b} æbler mere i kurven.', q: 'Hvor mange æbler er der nu?', done: 'Nu er der {n} æbler!' },
      duck:    { s0: '{a} ællinger svømmer på søen.', s0_1: '{a} ælling svømmer på søen.', s1: '{b} ællinger mere kommer svømmende.', q: 'Hvor mange ællinger er der nu?', done: 'Nu er der {n} ællinger!' },
      bunny:   { s0: '{a} kaniner leger i haven.', s1: '{b} kaniner mere hopper ind.', s1_1: '{b} kanin mere hopper ind.', q: 'Hvor mange kaniner er der nu?', done: 'Nu er der {n} kaniner!' },
      balloon: { s0: 'Du har {a} balloner.', s1: '{b} balloner springer.', q: 'Hvor mange balloner er der tilbage?', done: 'Der er {n} balloner tilbage!' },
      cookie:  { s0: 'Der ligger {a} småkager på tallerkenen.', s1: 'Du spiser {b} småkager.', s1_1: 'Du spiser {b} småkage.', q: 'Hvor mange småkager er der tilbage?', done: 'Der er {n} småkager tilbage!' },
      fish:    { s0: '{a} fisk svømmer i akvariet.', s1: '{b} fisk svømmer væk.', q: 'Hvor mange fisk er der tilbage?', done: 'Der er {n} fisk tilbage!', done_1: 'Der er {n} fisk tilbage!' },
      tulip:   { s0: 'Der står {a} tulipaner i haven.', s1: 'Du plukker {b} tulipaner.', q: 'Hvor mange tulipaner er der tilbage?', done: 'Der er {n} tulipaner tilbage!', done_1: 'Der er {n} tulipan tilbage!' },
      animals: { s0: '{a} fugle sidder i haven.', s1: '{b} kaniner sidder hos dem.', q: 'Hvor mange dyr er der?', done: 'Der er {n} dyr!' },
      fruits:  { s0: 'Der ligger {a} æbler på bordet.', s1: 'Ved siden af ligger {b} pærer.', q: 'Hvor mange stykker frugt er der?', done: 'Der er {n} stykker frugt!' }
    },
    no: {
      bird:    { s0: 'Det sitter {a} fugler på grenen.', s1: '{b} fugler til lander.', q: 'Hvor mange fugler er det nå?', done: 'Nå er det {n} fugler!' },
      apple:   { s0: 'Det ligger {a} epler i kurven.', s1: 'Du legger {b} epler til.', q: 'Hvor mange epler er det nå?', done: 'Nå er det {n} epler!' },
      duck:    { s0: 'Det svømmer {a} andunger i dammen.', s0_1: 'Det svømmer {a} andunge i dammen.', s1: '{b} andunger til kommer svømmende.', q: 'Hvor mange andunger er det nå?', done: 'Nå er det {n} andunger!' },
      bunny:   { s0: 'Det leker {a} kaniner i hagen.', s1: '{b} kaniner til kommer hoppende.', s1_1: '{b} kanin til kommer hoppende.', q: 'Hvor mange kaniner er det nå?', done: 'Nå er det {n} kaniner!' },
      balloon: { s0: 'Du har {a} ballonger.', s1: '{b} ballonger sprekker.', q: 'Hvor mange ballonger er igjen?', done: '{n} ballonger er igjen!' },
      cookie:  { s0: 'Det ligger {a} kjeks på fatet.', s1: 'Du spiser {b} kjeks.', s1_1: 'Du spiser {b} kjeks.', q: 'Hvor mange kjeks er igjen?', done: '{n} kjeks er igjen!' },
      fish:    { s0: 'Det svømmer {a} fisker i akvariet.', s1: '{b} fisker svømmer vekk.', q: 'Hvor mange fisker er igjen?', done: '{n} fisker er igjen!', done_1: '{n} fisk er igjen!' },
      tulip:   { s0: 'Det står {a} tulipaner i hagen.', s1: '{b} tulipaner blir plukket.', q: 'Hvor mange tulipaner er igjen?', done: '{n} tulipaner er igjen!', done_1: '{n} tulipan er igjen!' },
      animals: { s0: 'Det sitter {a} fugler i hagen.', s1: '{b} kaniner sitter sammen med dem.', q: 'Hvor mange dyr er det?', done: 'Det er {n} dyr!' },
      fruits:  { s0: 'Det ligger {a} epler på bordet.', s1: 'Ved siden av ligger {b} pærer.', q: 'Hvor mange frukter er det?', done: 'Det er {n} frukter!' }
    },
    fi: {
      bird:    { s0: '{a} lintua istuu oksalla.', s1: '{b} lintua lentää lisää oksalle.', q: 'Kuinka monta lintua oksalla on nyt?', done: 'Oksalla on nyt {n} lintua!' },
      apple:   { s0: 'Korissa on {a} omenaa.', s1: 'Laitat koriin vielä {b} omenaa.', q: 'Kuinka monta omenaa korissa on nyt?', done: 'Korissa on nyt {n} omenaa!' },
      duck:    { s0: '{a} ankanpoikasta ui lammessa.', s0_1: '{a} ankanpoikanen ui lammessa.', s1: '{b} ankanpoikasta tulee uimaan lisää.', q: 'Kuinka monta ankanpoikasta lammessa on nyt?', done: 'Lammessa on nyt {n} ankanpoikasta!' },
      bunny:   { s0: 'Puutarhassa leikkii {a} pupua.', s1: 'Vielä {b} pupua hyppää paikalle.', s1_1: 'Vielä {b} pupu hyppää paikalle.', q: 'Kuinka monta pupua puutarhassa on nyt?', done: 'Puutarhassa on nyt {n} pupua!' },
      balloon: { s0: 'Ilmassa leijuu {a} ilmapalloa.', s1: '{b} ilmapalloa puhkeaa.', q: 'Kuinka monta ilmapalloa on jäljellä?', done: 'Jäljellä on {n} ilmapalloa!' },
      cookie:  { s0: 'Lautasella on {a} keksiä.', s1: 'Syöt {b} keksiä.', s1_1: 'Syöt {b} keksin.', q: 'Kuinka monta keksiä on jäljellä?', done: 'Jäljellä on {n} keksiä!' },
      fish:    { s0: 'Akvaariossa ui {a} kalaa.', s1: '{b} kalaa ui pois.', q: 'Kuinka monta kalaa on jäljellä?', done: 'Jäljellä on {n} kalaa!', done_1: 'Jäljellä on {n} kala!' },
      tulip:   { s0: 'Puutarhassa kasvaa {a} tulppaania.', s1: '{b} tulppaania poimitaan.', q: 'Kuinka monta tulppaania on jäljellä?', done: 'Jäljellä on {n} tulppaania!', done_1: 'Jäljellä on {n} tulppaani!' },
      animals: { s0: 'Puutarhassa istuu {a} lintua.', s1: 'Niiden vieressä istuu {b} pupua.', q: 'Kuinka monta eläintä siellä on?', done: 'Siellä on {n} eläintä!' },
      fruits:  { s0: 'Pöydällä on {a} omenaa.', s1: 'Niiden vieressä on {b} päärynää.', q: 'Kuinka monta hedelmää pöydällä on?', done: 'Pöydällä on {n} hedelmää!' }
    }
  };

  function level(name) { return LEVELS_LIST.indexOf(name) >= 0 ? name : 'within10'; }
  function result(r) { return KINDS[r.kind].type === 'take' ? r.a - r.b : r.a + r.b; }
  function rounds(name) {
    var lv = level(name);
    return LEVELS[lv].map(function (x, i) {
      var r = { id: lv + '.' + x[0] + '.' + x[1] + '-' + x[2], kind: x[0], a: x[1], b: x[2], level: lv, index: i };
      r.type = KINDS[r.kind].type; r.answer = result(r);
      return r;
    });
  }
  function interp(s, args) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
  function storyOf(lang) { return STORIES[String(lang || 'en').slice(0, 2)] || STORIES.en; }
  /* one sentence of a round's story: the *_1 form wherever the number it carries is 1 */
  function line(lang, r, key) {
    var s = storyOf(lang)[r.kind], n = key === 's0' ? r.a : key === 's1' ? r.b : key === 'done' ? r.answer : null;
    var k = (n === 1 && s[key + '_1']) ? key + '_1' : key;
    return interp(s[k], { a: r.a, b: r.b, n: r.answer });
  }
  function sentences(lang, r) { return [line(lang, r, 's0'), line(lang, r, 's1'), line(lang, r, 'q')]; }
  /* which variants a round needs (the gate checks every locale has them) */
  function needs(r) { var out = []; if (r.a === 1) out.push('s0_1'); if (r.b === 1) out.push('s1_1'); if (r.answer === 1) out.push('done_1'); return out; }

  /* ---------------- the order: order-only reshuffle ----------------
     no two adjacent equal answers · at most 2 of one story type in a row ·
     never the same order as the previous pass, and the new pass never opens
     with the story the previous one closed on. Depth-first with random picks,
     so a valid order is always found when one exists. */
  function order(pool, rand, prev) {
    rand = rand || Math.random;
    var n = pool.length;
    if (n < 2) return pool.map(function (r, i) { return i; });
    var lastPrev = prev && prev.length ? prev[prev.length - 1] : -1;
    for (var attempt = 0; attempt < 40; attempt++) {
      var used = [], seq = [];
      for (var u = 0; u < n; u++) used.push(false);
      var ok = (function dfs() {
        if (seq.length === n) return !(prev && prev.length === n && prev.join(',') === seq.join(','));
        var cands = [];
        for (var i = 0; i < n; i++) if (!used[i]) cands.push(i);
        for (var j = cands.length - 1; j > 0; j--) { var k = Math.floor(rand() * (j + 1)); var t = cands[j]; cands[j] = cands[k]; cands[k] = t; }
        for (var c = 0; c < cands.length; c++) {
          var x = cands[c], L = seq.length;
          if (L === 0 && x === lastPrev) continue;
          if (L > 0 && pool[seq[L - 1]].answer === pool[x].answer) continue;
          if (L > 1 && pool[seq[L - 1]].type === pool[x].type && pool[seq[L - 2]].type === pool[x].type) continue;
          used[x] = true; seq.push(x);
          if (dfs()) return true;
          used[x] = false; seq.pop();
        }
        return false;
      }());
      if (ok) return seq;
    }
    return pool.map(function (r, i) { return i; });
  }

  /* ---------------- state ---------------- */
  function framesFor(r) { return r.level === 'within20' ? 2 : 1; }
  function newState(r) {
    var frames = framesFor(r), places = [];
    for (var i = 0; i < frames * FRAME; i++) places.push(null);
    return {
      id: r.id, kind: r.kind, type: r.type, a: r.a, b: r.b, answer: r.answer, level: r.level,
      frames: frames, counters: frames === 2, places: places,
      line: 0, typed: '', misses: 0, help: 0, last: null, done: false, explore: false
    };
  }
  /* free play ("Tell your own"): one frame, the supply always open */
  function newPlay(r) {
    var places = [];
    for (var i = 0; i < FRAME; i++) places.push(null);
    return { explore: true, kind: r ? r.kind : 'bird', type: 'play', frames: 1, counters: false, places: places, line: 0, done: false, help: 0, last: null };
  }
  function count(st, f) { var c = 0; for (var i = 0; i < st.places.length; i++) if (st.places[i] && f(st.places[i], i)) c++; return c; }
  function firstEmpty(st) { for (var i = 0; i < st.places.length; i++) if (!st.places[i]) return i; return -1; }
  function solid(st) { return count(st, function (p) { return !p.out; }); }
  /* the child's own acting: things brought in (add / put) or made to leave (take) */
  function acted(st) { return st.type === 'take' ? count(st, function (p) { return p.who === 's' && p.out; }) : count(st, function (p) { return p.who === 'c'; }); }
  function storyThings(st) { return count(st, function (p) { return p.who === 's'; }); }

  /* the narrator's line acts itself: one more thing arrives; at a the child's line opens */
  function actOne(st) {
    if (st.explore || st.done || st.line !== 0) return -1;
    var have = storyThings(st);
    if (have >= st.a) { st.line = 1; return -1; }
    var i = firstEmpty(st);
    st.places[i] = { k: 0, who: 's', out: false };
    if (have + 1 >= st.a) st.line = 1;
    return i;
  }
  function actAll(st) { while (st.line === 0 && !st.done) { if (actOne(st) < 0 && st.line === 0) break; } }

  /* the supply pile: open in add / put stories (and free play), closed in take stories */
  function supplyKind(st) {
    if (st.explore) return 0;
    if (st.type === 'take') return -1;
    return st.type === 'put' ? 1 : 0;
  }
  function moved(st) { st.help = 0; st.last = null; }
  function canMove(st) { return !st.done && (st.explore || st.line >= 1); }
  function add(st, at) {
    if (!canMove(st)) return 'locked';
    var k = supplyKind(st);
    if (k < 0) return 'closed';
    var i = (typeof at === 'number' && at >= 0 && at < st.places.length && !st.places[at]) ? at : firstEmpty(st);
    if (i < 0) return 'full';
    st.places[i] = { k: k, who: (st.explore && st.line === 0) ? 's' : 'c', out: false };
    moved(st);
    return i;
  }
  /* a tap on a place: empty → bring one there; a thing → its own move */
  function tap(st, i) {
    if (!canMove(st)) return 'locked';
    if (i < 0 || i >= st.places.length) return 'locked';
    var p = st.places[i];
    if (!p) { var r = add(st, i); return typeof r === 'number' ? 'added' : r; }
    if (p.who === 'c') { st.places[i] = null; moved(st); return 'back'; }
    /* a story thing: only a take story (or free play after its first line) can make it leave */
    if (st.explore) {
      if (st.line === 0) { st.places[i] = null; moved(st); return 'back'; }
      p.out = !p.out; moved(st); return p.out ? 'taken' : 'restored';
    }
    if (st.type !== 'take') return 'locked';
    p.out = !p.out; moved(st);
    return p.out ? 'taken' : 'restored';
  }
  /* the next line: the question wakes only after the child has acted at least once */
  function canAsk(st) { return !st.explore && !st.done && st.line === 1 && acted(st) >= 1; }
  function ask(st) { if (!canAsk(st)) return false; st.line = 2; moved(st); return true; }

  /* the keypad: 1–10 as whole numbers (within 5 / 10); digits with 0 dimmed first (within 20) */
  function keypad(st) { return st.level === 'within20' ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; }
  function key(st, v) {
    v = String(v);
    if (st.done || st.explore || st.line !== 2) return 'locked';
    if (keypad(st).indexOf(v) < 0) return 'refused';
    if (st.level === 'within20') {
      if (st.typed === '' && v === '0') return 'refused';
      if (st.typed.length >= 2) return 'full';
      st.typed += v;
    } else st.typed = v;
    moved(st);
    return 'typed';
  }
  function del(st) { if (st.done || st.line !== 2 || !st.typed) return false; st.typed = st.typed.slice(0, -1); moved(st); return true; }

  /* Check */
  function check(st) {
    if (st.done || st.explore) return null;
    var res;
    if (st.line < 2) res = { ok: false, slip: 'act' };
    else if (st.typed === '') res = { ok: false, slip: 'empty' };
    else if (+st.typed === st.answer) { res = { ok: true, slip: 'right' }; st.done = true; }
    else { st.misses++; st.help = Math.min(2, st.misses); res = { ok: false, slip: 'wrong', k: acted(st), b: st.b }; }
    st.last = res;
    return res;
  }

  /* the replay ends on the TRUE story: the narrator's a, then exactly b brought in / taken —
     the child's own moves are kept where they fit, the extra ones undone, the missing ones done */
  function trueState(st) {
    var places = st.places.map(function (p) { return p ? { k: p.k, who: p.who, out: p.out } : null; });
    var i, idx;
    if (st.type === 'take') {
      var outs = [], ins = [];
      for (i = 0; i < places.length; i++) if (places[i] && places[i].who === 's') (places[i].out ? outs : ins).push(i);
      while (outs.length > st.b) { idx = outs.pop(); places[idx].out = false; }
      while (outs.length < st.b) { idx = ins.pop(); places[idx].out = true; outs.push(idx); }
    } else {
      var kids = [];
      for (i = 0; i < places.length; i++) if (places[i] && places[i].who === 'c') kids.push(i);
      while (kids.length > st.b) { idx = kids.pop(); places[idx] = null; }
      var need = st.b - kids.length, k = st.type === 'put' ? 1 : 0;
      for (i = 0; i < places.length && need > 0; i++) if (!places[i]) { places[i] = { k: k, who: 'c', out: false }; need--; }
    }
    return places;
  }
  function settle(st) { st.places = trueState(st); }
  /* the true story as two steps for the replay: the narrator's places, then the changed ones */
  function replayScript(st) {
    var tp = trueState(st), start = [], change = [], i;
    for (i = 0; i < tp.length; i++) if (tp[i] && tp[i].who === 's') start.push(i);
    if (st.type === 'take') { for (i = 0; i < tp.length; i++) if (tp[i] && tp[i].who === 's' && tp[i].out) change.push(i); }
    else { for (i = 0; i < tp.length; i++) if (tp[i] && tp[i].who === 'c') change.push(i); }
    return { start: start, change: change, places: tp };
  }

  /* numerals on the solid things: miss 2 → 1 … n−1 and '?' on the last (the help never writes
     the answer); done → 1 … n */
  function chips(st) {
    var out = [], i, c = 0, n = solid(st);
    for (i = 0; i < st.places.length; i++) out.push('');
    if (st.explore) return out;
    if (!st.done && st.help < 2) return out;
    for (i = 0; i < st.places.length; i++) {
      var p = st.places[i];
      if (!p || p.out) continue;
      c++;
      out[i] = (!st.done && c === n) ? '?' : c;
    }
    return out;
  }

  /* the note under the stage */
  function hint(st) {
    if (st.explore || st.done) return null;
    var take = st.type === 'take', L = st.last;
    if (L && L.slip === 'act') return { key: 'hintAct', wrong: true };
    if (st.line === 0) return null;
    if (st.line === 1) return { key: acted(st) ? null : (take ? 'hintTurnTake' : 'hintTurnAdd') };
    if (st.help >= 2) return { key: take ? 'hintBright' : 'hintEvery', more: 'hintNumbers', wrong: true };
    if (st.help === 1) return { key: take ? 'hintReplayLeft' : 'hintReplayAll', wrong: true, story: (L && L.k !== L.b) ? { b: L.b, k: L.k } : null };
    return { key: take ? 'hintAskLeft' : 'hintAsk', wrong: !!(L && L.slip === 'empty') };
  }
  function celebrateKey(r) {
    var type = r.type || KINDS[r.kind].type, ans = r.answer != null ? r.answer : result(r);
    if (type === 'take') return ans === 1 ? 'sumTake1' : r.b === 1 ? 'sumTakeB1' : 'sumTake';
    return type === 'put' ? 'sumPut' : 'sumAdd';
  }

  /* free play: the sentence builder */
  function playLines(st) {
    var start = count(st, function (p) { return p.who === 's'; });
    var more = count(st, function (p) { return p.who === 'c'; });
    var away = count(st, function (p) { return p.who === 's' && p.out; });
    var now = solid(st);
    var out = [];
    if (!start && st.line === 0) return [{ key: 'playHint' }];
    out.push({ key: start === 1 ? 'playStart1' : 'playStart', n: start });
    if (st.line >= 1) {
      if (more) out.push({ key: more === 1 ? 'playMore1' : 'playMore', k: more });
      if (away) out.push({ key: away === 1 ? 'playAway1' : 'playAway', k: away });
      if (more || away) out.push(now ? { key: now === 1 ? 'playNow1' : 'playNow', m: now } : { key: 'playNone' });
    }
    return out;
  }
  function playNext(st) { if (!st.explore || st.line !== 0 || !storyThings(st)) return false; st.line = 1; return true; }

  /* the reading pause before a line acts: read aloud → long enough for the voice; off → 1.2 s */
  function pause(text, readAloud) {
    var base = 1200;
    if (!readAloud) return base;
    return Math.max(base, Math.min(4200, 55 * String(text || '').length));
  }

  /* ---------------- layout ----------------
     wide (≥ 560): one frame of places ≤ 112 (pictures place − 10, ≥ 96 on the 648 px stage);
     two frames side by side ≤ 60 (drawn counters). narrow: one frame edge to edge, pictures
     fill the place (64 at the 360 phone); two frames stacked ≤ 48. */
  function layout(W, frames) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', frames: frames };
    if (wide) {
      if (frames === 2) { L.gap = 6; L.pad = 10; L.between = 16; L.place = Math.min(60, Math.floor((W - 4 * L.pad - L.between - 8 * L.gap) / 10)); L.pic = L.place - 10; }
      else { L.gap = 10; L.pad = 14; L.between = 0; L.place = Math.min(106, Math.floor((W - 2 * L.pad - 4 * L.gap) / 5)); L.pic = L.place - 8; }
      L.tab = 104; L.tabPic = 96; L.key = 56; L.keyH = 56; L.box = 72;
    } else {
      if (frames === 2) { L.gap = 4; L.pad = 6; L.between = 10; L.place = Math.min(44, Math.floor((W - 2 * L.pad - 4 * L.gap) / 5)); L.pic = L.place - 8; }
      else { L.gap = W >= 372 ? 4 : 2; L.pad = 0; L.between = 0; L.place = Math.min(76, Math.floor((W - 4 * L.gap) / 5)); L.pic = L.place; }
      L.tab = 68; L.tabPic = 64; L.key = Math.min(60, Math.floor((W - 4 * 5) / 5)); L.keyH = 44; L.box = 64;
    }
    return L;
  }

  var api = {
    LOCALES: LOCALES, LEVELS_LIST: LEVELS_LIST, LEVELS: LEVELS, KINDS: KINDS, PICS: PICS, COUNTER: COUNTER, STORIES: STORIES, FRAME: FRAME,
    level: level, rounds: rounds, result: result, line: line, sentences: sentences, needs: needs, order: order,
    newState: newState, newPlay: newPlay, actOne: actOne, actAll: actAll, supplyKind: supplyKind, add: add, tap: tap,
    acted: acted, solid: solid, canAsk: canAsk, ask: ask, keypad: keypad, key: key, del: del, check: check,
    trueState: trueState, settle: settle, replayScript: replayScript, chips: chips, hint: hint, celebrateKey: celebrateKey,
    playLines: playLines, playNext: playNext, pause: pause, layout: layout, interp: interp
  };
  global.StoryStageCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
