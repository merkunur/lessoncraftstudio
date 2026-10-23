/* =====================================================================
   about-strings-core.js — the model of ACTIVITY #79 of the one-by-one
   rebuild: "The Wobble Museum" → THE ABOUT-STRINGS (W.K.2, 11 locales).
   Design sheet: docs/activities-rebuild/designs/079-wobble-museum.md
   ---------------------------------------------------------------------
   THE INVENTION: every sentence card in Bram's museum hangs by a string,
   and the string must be hooked to what the sentence is ABOUT — the room's
   big sign, or the sign of the next room peeking through the doorway. The
   off-topic fact's string goes to the doorway, and at Check that card is
   pulled out through the door into its own room; the room's own facts fly
   onto the lectern and become a page "All about …".
   Levels: Catch the drift (l1) · Make the page (l2: choose the facts from
   a cart) · Name the room (l3: three "They/It" facts, put the right picture
   in the empty frame).
   Every sentence is a LITERAL per locale; its ABOUT-WORD is authored in
   [brackets] (in es/it/pt the pronoun is dropped, so the verb carries it) —
   nothing is computed from the words. No DOM. UMD: window.AboutStringsCore
   / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AboutStringsCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['l1', 'l2', 'l3'];
  var HELPS = ['off', 'on'];
  var CARDS = ['4', '3'];

  /* the eight rooms: the room's picture, the next room's picture (the doorway), two unrelated pictures for the L3 shelf
     (each fits none of the room's mystery facts); doorFits = the mystery facts the doorway picture is also true of
     (contact sheets 2026-10-23: the lake scene holds no frog; camping/moon is a cratered moon; tree/apple is an apple tree) */
  var TOPICS = [
    { id: 'frogs', pic: 'forest-creatures/frog', door: 'camping/lake', others: ['kitchen-tools/cup', 'clothing/shoe'], doorFits: {} },
    { id: 'moon', pic: 'camping/moon', door: 'weather/sunny', others: ['fruits/banana', 'clothing/shoe'], doorFits: { all: [0] } },
    { id: 'ambulances', pic: 'vehicles/ambulance', door: 'christmas/bell', others: ['fruits/banana', 'toys/kite'], doorFits: {} },
    { id: 'rain', pic: 'weather/rainy', door: 'spring/flower', others: ['toys/ball', 'clothing/shoe'], doorFits: {} },
    { id: 'dogs', pic: 'pets/dog', door: 'pets/cat', others: ['kitchen-tools/cup', 'music/drum'], doorFits: {} },
    { id: 'bees', pic: 'insects-and-bugs/bee', door: 'insects-and-bugs/ant', others: ['clothing/shoe', 'vehicles/bus'], doorFits: {} },
    { id: 'trees', pic: 'tree/apple', door: 'things-that-fly/bird', others: ['kitchen-tools/cup', 'music/drum'], doorFits: {} },
    { id: 'hands', pic: 'body-parts/hand', door: 'body-parts/foot', others: ['toys/kite', 'fruits/banana'], doorFits: { es: [0], it: [0], pt: [0], fr: [0] } }   /* dedos / dita / doigts are fingers AND toes */
  ];
  /* facts: 0 a namer · 1 the pronoun card (◇, points back) · 2 the trap (◆) · 3 and 4 namers; drifts: about the door thing; mystery: L3 */
  var ROLE = ['namer', 'pronoun', 'trap', 'namer', 'namer'];

  /* per locale, per room: [plate (the room's sign), door plate, page title, facts ×5, drifts ×2, mystery ×3] */
  var WORDS = {
    en: {
      frogs: ['Frogs', 'Lakes', 'All about frogs', ['[Frogs] hop.', '[They] eat bugs.', '[Frogs] swim in lakes.', '[Frogs] lay eggs in water.', 'A [frog] has long back legs.'], ['[Lakes] are full of water.', '[Lakes] can be very big.'], ['[They] hop.', '[They] eat bugs.', '[They] have long back legs.']],
      moon: ['The moon', 'The sun', 'All about the moon', ['[The moon] is round.', '[It] shines at night.', '[The moon] is smaller than the sun.', '[The moon] has craters.', '[The moon] goes around the Earth.'], ['[The sun] is hot.', '[The sun] shines in the day.'], ['[It] is round.', '[It] shines at night.', '[It] has craters.']],
      ambulances: ['Ambulances', 'Bells', 'All about ambulances', ['[Ambulances] have flashing lights.', '[They] carry sick people.', '[Ambulances] have a loud siren.', '[Ambulances] drive to the hospital.', 'An [ambulance] has a bed inside.'], ['[Bells] are loud.', '[Bells] ring.'], ['[They] have a loud siren.', '[They] carry sick people.', '[They] have flashing lights.']],
      rain: ['Rain', 'Flowers', 'All about rain', ['[Rain] falls from clouds.', '[It] makes puddles.', '[Rain] helps flowers grow.', '[Rain] makes things wet.', '[Rain] comes down in drops.'], ['[Flowers] smell sweet.', '[Flowers] have petals.'], ['[It] falls from clouds.', '[It] makes puddles.', '[It] comes down in drops.']],
      dogs: ['Dogs', 'Cats', 'All about dogs', ['[Dogs] bark.', '[They] wag their tails.', '[Dogs] chase cats.', '[Dogs] like to fetch.', '[Dogs] can smell very well.'], ['[Cats] say meow.', '[Cats] climb trees.'], ['[They] bark.', '[They] like to fetch.', '[They] go for walks on a leash.']],
      bees: ['Bees', 'Ants', 'All about bees', ['[Bees] buzz.', '[They] make honey.', '[Bees] are bigger than ants.', '[Bees] live in a hive.', '[Bees] visit flowers.'], ['[Ants] live in the dirt.', '[Ants] carry crumbs.'], ['[They] buzz.', '[They] make honey.', '[They] live in a hive.']],
      trees: ['Trees', 'Birds', 'All about trees', ['[Trees] have leaves.', '[They] grow very tall.', '[Trees] give birds a home.', '[Trees] have roots.', 'Some [trees] grow apples.'], ['[Birds] can fly.', '[Birds] lay eggs.'], ['[They] have leaves.', '[They] have roots.', '[They] grow very tall.']],
      hands: ['Hands', 'Feet', 'All about hands', ['[Hands] can clap.', '[They] can wave hello.', '[Hands] help put socks on our feet.', '[Hands] can hold a cup.', 'A [hand] has five fingers.'], ['[Feet] help us walk.', '[Feet] go into socks and shoes.'], ['[They] have five fingers each.', '[They] can clap.', '[They] can hold a cup.']]
    },
    de: {
      frogs: ['Frösche', 'Seen', 'Alles über Frösche', ['[Frösche] hüpfen.', '[Sie] fressen Insekten.', '[Frösche] schwimmen in Seen.', '[Frösche] legen ihre Eier ins Wasser.', 'Ein [Frosch] hat lange Hinterbeine.'], ['[Seen] sind voller Wasser.', '[Seen] können sehr groß sein.'], ['[Sie] hüpfen.', '[Sie] fressen Insekten.', '[Sie] haben lange Hinterbeine.']],
      moon: ['Der Mond', 'Die Sonne', 'Alles über den Mond', ['[Der Mond] ist rund.', '[Er] leuchtet in der Nacht.', '[Der Mond] ist kleiner als die Sonne.', '[Der Mond] hat Krater.', '[Der Mond] kreist um die Erde.'], ['[Die Sonne] ist heiß.', '[Die Sonne] scheint am Tag.'], ['[Er] ist rund.', '[Er] leuchtet in der Nacht.', '[Er] hat Krater.']],
      ambulances: ['Krankenwagen', 'Glocken', 'Alles über Krankenwagen', ['[Krankenwagen] haben Blinklichter.', '[Sie] fahren kranke Menschen.', '[Krankenwagen] haben eine laute Sirene.', '[Krankenwagen] fahren ins Krankenhaus.', 'Ein [Krankenwagen] hat innen ein Bett.'], ['[Glocken] sind laut.', '[Glocken] läuten.'], ['[Sie] haben eine laute Sirene.', '[Sie] fahren kranke Menschen.', '[Sie] haben Blinklichter.']],
      rain: ['Regen', 'Blumen', 'Alles über Regen', ['[Regen] fällt aus den Wolken.', '[Er] macht Pfützen.', '[Regen] hilft Blumen beim Wachsen.', '[Regen] macht alles nass.', '[Regen] kommt in Tropfen.'], ['[Blumen] duften.', '[Blumen] haben Blütenblätter.'], ['[Er] fällt aus den Wolken.', '[Er] macht Pfützen.', '[Er] kommt in Tropfen.']],
      dogs: ['Hunde', 'Katzen', 'Alles über Hunde', ['[Hunde] bellen.', '[Sie] wedeln mit dem Schwanz.', '[Hunde] jagen Katzen.', '[Hunde] holen gern Stöckchen.', '[Hunde] können sehr gut riechen.'], ['[Katzen] miauen.', '[Katzen] klettern auf Bäume.'], ['[Sie] bellen.', '[Sie] holen gern Stöckchen.', '[Sie] gehen an der Leine spazieren.']],
      bees: ['Bienen', 'Ameisen', 'Alles über Bienen', ['[Bienen] summen.', '[Sie] machen Honig.', '[Bienen] sind größer als Ameisen.', '[Bienen] wohnen in einem Bienenstock.', '[Bienen] besuchen Blumen.'], ['[Ameisen] wohnen in der Erde.', '[Ameisen] tragen Krümel.'], ['[Sie] summen.', '[Sie] machen Honig.', '[Sie] fliegen von Blüte zu Blüte.']],
      trees: ['Bäume', 'Vögel', 'Alles über Bäume', ['[Bäume] haben Blätter.', '[Sie] werden sehr hoch.', '[Bäume] geben Vögeln ein Zuhause.', '[Bäume] haben Wurzeln.', 'Manche [Bäume] tragen Äpfel.'], ['[Vögel] können fliegen.', '[Vögel] legen Eier.'], ['[Sie] haben Blätter.', '[Sie] haben Wurzeln.', '[Sie] werden sehr hoch.']],
      hands: ['Hände', 'Füße', 'Alles über Hände', ['[Hände] können klatschen.', '[Sie] können zum Gruß winken.', '[Hände] helfen, Socken über die Füße zu ziehen.', '[Hände] können einen Becher halten.', 'Eine [Hand] hat fünf Finger.'], ['[Füße] helfen uns beim Gehen.', '[Füße] stecken in Socken und Schuhen.'], ['[Sie] haben je fünf Finger.', '[Sie] können klatschen.', '[Sie] können einen Becher halten.']]
    },
    nl: {
      frogs: ['Kikkers', 'Meren', 'Alles over kikkers', ['[Kikkers] springen.', '[Ze] eten insecten.', '[Kikkers] zwemmen in meren.', '[Kikkers] leggen eitjes in het water.', 'Een [kikker] heeft lange achterpoten.'], ['[Meren] zijn vol water.', '[Meren] kunnen heel groot zijn.'], ['[Ze] springen.', '[Ze] eten insecten.', '[Ze] hebben lange achterpoten.']],
      moon: ['De maan', 'De zon', 'Alles over de maan', ['[De maan] is rond.', '[Hij] schijnt in de nacht.', '[De maan] is kleiner dan de zon.', '[De maan] heeft kraters.', '[De maan] draait om de aarde.'], ['[De zon] is heet.', '[De zon] schijnt overdag.'], ['[Hij] is rond.', '[Hij] schijnt in de nacht.', '[Hij] heeft kraters.']],
      ambulances: ['Ambulances', 'Klokken', 'Alles over ambulances', ['[Ambulances] hebben zwaailichten.', '[Ze] vervoeren zieke mensen.', '[Ambulances] hebben een luide sirene.', '[Ambulances] rijden naar het ziekenhuis.', 'Een [ambulance] heeft een bed binnenin.'], ['[Klokken] zijn luid.', '[Klokken] luiden.'], ['[Ze] hebben een luide sirene.', '[Ze] vervoeren zieke mensen.', '[Ze] hebben zwaailichten.']],
      rain: ['Regen', 'Bloemen', 'Alles over regen', ['[Regen] valt uit de wolken.', '[Hij] maakt plassen.', '[Regen] helpt bloemen groeien.', '[Regen] maakt alles nat.', '[Regen] valt in druppels.'], ['[Bloemen] ruiken lekker.', '[Bloemen] hebben bloemblaadjes.'], ['[Hij] valt uit de wolken.', '[Hij] maakt plassen.', '[Hij] valt in druppels.']],
      dogs: ['Honden', 'Katten', 'Alles over honden', ['[Honden] blaffen.', '[Ze] kwispelen met hun staart.', '[Honden] jagen op katten.', '[Honden] halen graag een stok.', '[Honden] kunnen heel goed ruiken.'], ['[Katten] zeggen miauw.', '[Katten] klimmen in bomen.'], ['[Ze] blaffen.', '[Ze] halen graag een stok.', '[Ze] lopen aan de riem.']],
      bees: ['Bijen', 'Mieren', 'Alles over bijen', ['[Bijen] zoemen.', '[Ze] maken honing.', '[Bijen] zijn groter dan mieren.', '[Bijen] wonen in een bijenkorf.', '[Bijen] bezoeken bloemen.'], ['[Mieren] wonen in de grond.', '[Mieren] dragen kruimels.'], ['[Ze] zoemen.', '[Ze] maken honing.', '[Ze] vliegen van bloem naar bloem.']],
      trees: ['Bomen', 'Vogels', 'Alles over bomen', ['[Bomen] hebben bladeren.', '[Ze] worden heel hoog.', '[Bomen] geven vogels een thuis.', '[Bomen] hebben wortels.', 'Sommige [bomen] dragen appels.'], ['[Vogels] kunnen vliegen.', '[Vogels] leggen eieren.'], ['[Ze] hebben bladeren.', '[Ze] hebben wortels.', '[Ze] worden heel hoog.']],
      hands: ['Handen', 'Voeten', 'Alles over handen', ['[Handen] kunnen klappen.', '[Ze] kunnen gedag zwaaien.', '[Handen] helpen sokken over je voeten te trekken.', '[Handen] kunnen een beker vasthouden.', 'Een [hand] heeft vijf vingers.'], ['[Voeten] helpen ons lopen.', '[Voeten] gaan in sokken en schoenen.'], ['[Ze] hebben elk vijf vingers.', '[Ze] kunnen klappen.', '[Ze] kunnen een beker vasthouden.']]
    },
    da: {
      frogs: ['Frøer', 'Søer', 'Alt om frøer', ['[Frøer] hopper.', '[De] spiser insekter.', '[Frøer] svømmer i søer.', '[Frøer] lægger æg i vandet.', 'En [frø] har lange bagben.'], ['[Søer] er fulde af vand.', '[Søer] kan være meget store.'], ['[De] hopper.', '[De] spiser insekter.', '[De] har lange bagben.']],
      moon: ['Månen', 'Solen', 'Alt om månen', ['[Månen] er rund.', '[Den] lyser om natten.', '[Månen] er mindre end solen.', '[Månen] har kratere.', '[Månen] kredser om jorden.'], ['[Solen] er varm.', '[Solen] skinner om dagen.'], ['[Den] er rund.', '[Den] lyser om natten.', '[Den] har kratere.']],
      ambulances: ['Ambulancer', 'Klokker', 'Alt om ambulancer', ['[Ambulancer] har blinklys.', '[De] kører syge mennesker.', '[Ambulancer] har en høj sirene.', '[Ambulancer] kører til hospitalet.', 'En [ambulance] har en seng indeni.'], ['[Klokker] lyder højt.', '[Klokker] ringer.'], ['[De] har en høj sirene.', '[De] kører syge mennesker.', '[De] har blinklys.']],
      rain: ['Regn', 'Blomster', 'Alt om regn', ['[Regn] falder fra skyerne.', '[Den] laver vandpytter.', '[Regn] hjælper blomster med at vokse.', '[Regn] gør alting vådt.', '[Regn] falder som dråber.'], ['[Blomster] dufter dejligt.', '[Blomster] har kronblade.'], ['[Den] falder fra skyerne.', '[Den] laver vandpytter.', '[Den] falder som dråber.']],
      dogs: ['Hunde', 'Katte', 'Alt om hunde', ['[Hunde] gør.', '[De] logrer med halen.', '[Hunde] jager katte.', '[Hunde] kan lide at hente pinde.', '[Hunde] kan lugte rigtig godt.'], ['[Katte] siger miav.', '[Katte] klatrer i træer.'], ['[De] gør.', '[De] kan lide at hente pinde.', '[De] går tur i snor.']],
      bees: ['Bier', 'Myrer', 'Alt om bier', ['[Bier] summer.', '[De] laver honning.', '[Bier] er større end myrer.', '[Bier] bor i en bikube.', '[Bier] besøger blomster.'], ['[Myrer] bor i jorden.', '[Myrer] bærer krummer.'], ['[De] summer.', '[De] laver honning.', '[De] flyver fra blomst til blomst.']],
      trees: ['Træer', 'Fugle', 'Alt om træer', ['[Træer] har blade.', '[De] bliver meget høje.', '[Træer] giver fuglene et hjem.', '[Træer] har rødder.', 'Nogle [træer] får æbler.'], ['[Fugle] kan flyve.', '[Fugle] lægger æg.'], ['[De] har blade.', '[De] har rødder.', '[De] bliver meget høje.']],
      hands: ['Hænder', 'Fødder', 'Alt om hænder', ['[Hænder] kan klappe.', '[De] kan vinke farvel.', '[Hænder] hjælper med at få strømper på fødderne.', '[Hænder] kan holde en kop.', 'En [hånd] har fem fingre.'], ['[Fødder] hjælper os med at gå.', '[Fødder] skal i strømper og sko.'], ['[De] har fem fingre hver.', '[De] kan klappe.', '[De] kan holde en kop.']]
    },
    sv: {
      frogs: ['Grodor', 'Sjöar', 'Allt om grodor', ['[Grodor] hoppar.', '[De] äter insekter.', '[Grodor] simmar i sjöar.', '[Grodor] lägger ägg i vattnet.', 'En [groda] har långa bakben.'], ['[Sjöar] är fulla av vatten.', '[Sjöar] kan vara väldigt stora.'], ['[De] hoppar.', '[De] äter insekter.', '[De] har långa bakben.']],
      moon: ['Månen', 'Solen', 'Allt om månen', ['[Månen] är rund.', '[Den] lyser på natten.', '[Månen] är mindre än solen.', '[Månen] har kratrar.', '[Månen] går runt jorden.'], ['[Solen] är varm.', '[Solen] skiner på dagen.'], ['[Den] är rund.', '[Den] lyser på natten.', '[Den] har kratrar.']],
      ambulances: ['Ambulanser', 'Klockor', 'Allt om ambulanser', ['[Ambulanser] har blinkande ljus.', '[De] kör sjuka människor.', '[Ambulanser] har en högljudd siren.', '[Ambulanser] kör till sjukhuset.', 'En [ambulans] har en säng inuti.'], ['[Klockor] är högljudda.', '[Klockor] ringer.'], ['[De] har en högljudd siren.', '[De] kör sjuka människor.', '[De] har blinkande ljus.']],
      rain: ['Regn', 'Blommor', 'Allt om regn', ['[Regn] faller från molnen.', '[Det] gör vattenpölar.', '[Regn] hjälper blommor att växa.', '[Regn] gör allt blött.', '[Regn] kommer i droppar.'], ['[Blommor] doftar gott.', '[Blommor] har kronblad.'], ['[Det] faller från molnen.', '[Det] gör vattenpölar.', '[Det] kommer i droppar.']],
      dogs: ['Hundar', 'Katter', 'Allt om hundar', ['[Hundar] skäller.', '[De] viftar på svansen.', '[Hundar] jagar katter.', '[Hundar] gillar att hämta pinnar.', '[Hundar] har ett mycket bra luktsinne.'], ['[Katter] säger mjau.', '[Katter] klättrar i träd.'], ['[De] skäller.', '[De] gillar att hämta pinnar.', '[De] går på promenad i koppel.']],
      bees: ['Bin', 'Myror', 'Allt om bin', ['[Bin] surrar.', '[De] gör honung.', '[Bin] är större än myror.', '[Bin] bor i en bikupa.', '[Bin] besöker blommor.'], ['[Myror] bor i marken.', '[Myror] bär smulor.'], ['[De] surrar.', '[De] gör honung.', '[De] flyger från blomma till blomma.']],
      trees: ['Träd', 'Fåglar', 'Allt om träd', ['[Träd] har löv.', '[De] blir väldigt höga.', '[Träd] ger fåglar ett hem.', '[Träd] har rötter.', 'Vissa [träd] får äpplen.'], ['[Fåglar] kan flyga.', '[Fåglar] lägger ägg.'], ['[De] har löv.', '[De] har rötter.', '[De] blir väldigt höga.']],
      hands: ['Händer', 'Fötter', 'Allt om händer', ['[Händer] kan klappa.', '[De] kan vinka hej.', '[Händer] hjälper till att dra strumpor på fötterna.', '[Händer] kan hålla en kopp.', 'En [hand] har fem fingrar.'], ['[Fötter] hjälper oss att gå.', '[Fötter] ska i strumpor och skor.'], ['[De] har fem fingrar var.', '[De] kan klappa.', '[De] kan hålla en kopp.']]
    },
    no: {
      frogs: ['Frosker', 'Innsjøer', 'Alt om frosker', ['[Frosker] hopper.', '[De] spiser insekter.', '[Frosker] svømmer i innsjøer.', '[Frosker] legger egg i vannet.', 'En [frosk] har lange bakbein.'], ['[Innsjøer] er fulle av vann.', '[Innsjøer] kan være veldig store.'], ['[De] hopper.', '[De] spiser insekter.', '[De] har lange bakbein.']],
      moon: ['Månen', 'Solen', 'Alt om månen', ['[Månen] er rund.', '[Den] lyser om natten.', '[Månen] er mindre enn solen.', '[Månen] har kratere.', '[Månen] går rundt jorden.'], ['[Solen] er varm.', '[Solen] skinner om dagen.'], ['[Den] er rund.', '[Den] lyser om natten.', '[Den] har kratere.']],
      ambulances: ['Ambulanser', 'Bjeller', 'Alt om ambulanser', ['[Ambulanser] har blinkende lys.', '[De] kjører syke mennesker.', '[Ambulanser] har en høylytt sirene.', '[Ambulanser] kjører til sykehuset.', 'En [ambulanse] har en seng inni.'], ['[Bjeller] er høylytte.', '[Bjeller] ringer.'], ['[De] har en høylytt sirene.', '[De] kjører syke mennesker.', '[De] har blinkende lys.']],
      rain: ['Regn', 'Blomster', 'Alt om regn', ['[Regn] faller fra skyene.', '[Det] lager vannpytter.', '[Regn] hjelper blomster å vokse.', '[Regn] gjør alt vått.', '[Regn] kommer i dråper.'], ['[Blomster] lukter godt.', '[Blomster] har kronblader.'], ['[Det] faller fra skyene.', '[Det] lager vannpytter.', '[Det] kommer i dråper.']],
      dogs: ['Hunder', 'Katter', 'Alt om hunder', ['[Hunder] bjeffer.', '[De] logrer med halen.', '[Hunder] jager katter.', '[Hunder] liker å hente pinner.', '[Hunder] har veldig god luktesans.'], ['[Katter] sier mjau.', '[Katter] klatrer i trær.'], ['[De] bjeffer.', '[De] liker å hente pinner.', '[De] går tur i bånd.']],
      bees: ['Bier', 'Maur', 'Alt om bier', ['[Bier] summer.', '[De] lager honning.', '[Bier] er større enn maur.', '[Bier] bor i en bikube.', '[Bier] besøker blomster.'], ['[Maur] bor i jorden.', '[Maur] bærer smuler.'], ['[De] summer.', '[De] lager honning.', '[De] flyr fra blomst til blomst.']],
      trees: ['Trær', 'Fugler', 'Alt om trær', ['[Trær] har blader.', '[De] blir veldig høye.', '[Trær] gir fuglene et hjem.', '[Trær] har røtter.', 'Noen [trær] får epler.'], ['[Fugler] kan fly.', '[Fugler] legger egg.'], ['[De] har blader.', '[De] har røtter.', '[De] blir veldig høye.']],
      hands: ['Hender', 'Føtter', 'Alt om hender', ['[Hender] kan klappe.', '[De] kan vinke hei.', '[Hender] hjelper til med å få sokker på føttene.', '[Hender] kan holde en kopp.', 'En [hånd] har fem fingre.'], ['[Føtter] hjelper oss å gå.', '[Føtter] skal i sokker og sko.'], ['[De] har fem fingre hver.', '[De] kan klappe.', '[De] kan holde en kopp.']]
    },
    es: {
      frogs: ['Las ranas', 'Los lagos', 'Todo sobre las ranas', ['[Las ranas] saltan.', '[Comen] insectos.', '[Las ranas] nadan en los lagos.', '[Las ranas] ponen huevos en el agua.', '[La rana] tiene patas traseras largas.'], ['[Los lagos] están llenos de agua.', '[Los lagos] pueden ser muy grandes.'], ['[Saltan].', '[Comen] insectos.', '[Tienen] patas traseras largas.']],
      moon: ['La luna', 'El sol', 'Todo sobre la luna', ['[La luna] es redonda.', '[Brilla] de noche.', '[La luna] es más pequeña que el sol.', '[La luna] tiene cráteres.', '[La luna] gira alrededor de la Tierra.'], ['[El sol] da calor.', '[El sol] brilla de día.'], ['[Es] redonda.', '[Brilla] de noche.', '[Tiene] cráteres.']],
      ambulances: ['Las ambulancias', 'Las campanas', 'Todo sobre las ambulancias', ['[Las ambulancias] tienen luces que parpadean.', '[Llevan] a personas enfermas.', '[Las ambulancias] tienen una sirena muy fuerte.', '[Las ambulancias] van al hospital.', '[La ambulancia] tiene una cama adentro.'], ['[Las campanas] suenan muy fuerte.', '[Las campanas] son de metal.'], ['[Tienen] una sirena muy fuerte.', '[Llevan] a personas enfermas.', '[Tienen] luces que parpadean.']],
      rain: ['La lluvia', 'Las flores', 'Todo sobre la lluvia', ['[La lluvia] cae de las nubes.', '[Hace] charcos.', '[La lluvia] ayuda a las flores a crecer.', '[La lluvia] moja todo.', '[La lluvia] cae en gotas.'], ['[Las flores] huelen rico.', '[Las flores] tienen pétalos.'], ['[Cae] de las nubes.', '[Hace] charcos.', '[Cae] en gotas.']],
      dogs: ['Los perros', 'Los gatos', 'Todo sobre los perros', ['[Los perros] ladran.', '[Mueven] la cola.', '[Los perros] persiguen a los gatos.', '[Los perros] traen la pelota.', '[Los perros] tienen muy buen olfato.'], ['[Los gatos] dicen miau.', '[Los gatos] trepan a los árboles.'], ['[Ladran].', '[Traen] la pelota.', '[Pasean] con correa.']],
      bees: ['Las abejas', 'Las hormigas', 'Todo sobre las abejas', ['[Las abejas] zumban.', '[Hacen] miel.', '[Las abejas] son más grandes que las hormigas.', '[Las abejas] viven en una colmena.', '[Las abejas] visitan las flores.'], ['[Las hormigas] viven en la tierra.', '[Las hormigas] cargan migajas.'], ['[Zumban].', '[Hacen] miel.', '[Viven] en una colmena.']],
      trees: ['Los árboles', 'Los pájaros', 'Todo sobre los árboles', ['[Los árboles] tienen hojas.', '[Crecen] muy alto.', '[Los árboles] les dan casa a los pájaros.', '[Los árboles] tienen raíces.', 'Algunos [árboles] dan manzanas.'], ['[Los pájaros] pueden volar.', '[Los pájaros] ponen huevos.'], ['[Tienen] hojas.', '[Tienen] raíces.', '[Crecen] muy alto.']],
      hands: ['Las manos', 'Los pies', 'Todo sobre las manos', ['[Las manos] aplauden.', '[Pueden] saludar.', '[Las manos] nos ayudan a ponernos los calcetines en los pies.', '[Las manos] pueden sostener una taza.', '[La mano] tiene cinco dedos.'], ['[Los pies] nos ayudan a caminar.', '[Los pies] van dentro de calcetines y zapatos.'], ['[Tienen] cinco dedos cada una.', '[Aplauden].', '[Sostienen] una taza.']]
    },
    it: {
      frogs: ['Le rane', 'I laghi', 'Tutto sulle rane', ['[Le rane] saltano.', '[Mangiano] gli insetti.', '[Le rane] nuotano nei laghi.', '[Le rane] depongono le uova nell’acqua.', '[La rana] ha lunghe zampe posteriori.'], ['[I laghi] sono pieni d’acqua.', '[I laghi] possono essere molto grandi.'], ['[Saltano].', '[Mangiano] gli insetti.', '[Hanno] lunghe zampe posteriori.']],
      moon: ['La luna', 'Il sole', 'Tutto sulla luna', ['[La luna] è rotonda.', '[Brilla] di notte.', '[La luna] è più piccola del sole.', '[La luna] ha dei crateri.', '[La luna] gira intorno alla Terra.'], ['[Il sole] è caldo.', '[Il sole] splende di giorno.'], ['[È] rotonda.', '[Brilla] di notte.', '[Ha] dei crateri.']],
      ambulances: ['Le ambulanze', 'Le campane', 'Tutto sulle ambulanze', ['[Le ambulanze] hanno luci lampeggianti.', '[Portano] le persone malate.', '[Le ambulanze] hanno una sirena forte.', '[Le ambulanze] vanno all’ospedale.', '[L’ambulanza] ha un letto dentro.'], ['[Le campane] suonano forte.', '[Le campane] fanno din don.'], ['[Hanno] una sirena forte.', '[Portano] le persone malate.', '[Hanno] luci lampeggianti.']],
      rain: ['La pioggia', 'I fiori', 'Tutto sulla pioggia', ['[La pioggia] cade dalle nuvole.', '[Forma] le pozzanghere.', '[La pioggia] aiuta i fiori a crescere.', '[La pioggia] bagna tutto.', '[La pioggia] scende a gocce.'], ['[I fiori] hanno un buon profumo.', '[I fiori] hanno i petali.'], ['[Cade] dalle nuvole.', '[Forma] le pozzanghere.', '[Scende] a gocce.']],
      dogs: ['I cani', 'I gatti', 'Tutto sui cani', ['[I cani] abbaiano.', '[Scodinzolano].', '[I cani] rincorrono i gatti.', '[I cani] riportano la palla.', '[I cani] hanno un ottimo fiuto.'], ['[I gatti] fanno miao.', '[I gatti] si arrampicano sugli alberi.'], ['[Abbaiano].', '[Riportano] la palla.', '[Vanno] a passeggio al guinzaglio.']],
      bees: ['Le api', 'Le formiche', 'Tutto sulle api', ['[Le api] ronzano.', '[Fanno] il miele.', '[Le api] sono più grandi delle formiche.', '[Le api] vivono in un alveare.', '[Le api] visitano i fiori.'], ['[Le formiche] vivono sotto terra.', '[Le formiche] portano le briciole.'], ['[Ronzano].', '[Fanno] il miele.', '[Vivono] in un alveare.']],
      trees: ['Gli alberi', 'Gli uccelli', 'Tutto sugli alberi', ['[Gli alberi] hanno le foglie.', '[Diventano] molto alti.', '[Gli alberi] danno una casa agli uccelli.', '[Gli alberi] hanno le radici.', 'Alcuni [alberi] fanno le mele.'], ['[Gli uccelli] sanno volare.', '[Gli uccelli] depongono le uova.'], ['[Hanno] le foglie.', '[Hanno] le radici.', '[Diventano] molto alti.']],
      hands: ['Le mani', 'I piedi', 'Tutto sulle mani', ['[Le mani] applaudono.', '[Fanno] ciao.', '[Le mani] aiutano a mettere i calzini ai piedi.', '[Le mani] tengono una tazza.', '[La mano] ha cinque dita.'], ['[I piedi] ci aiutano a camminare.', '[I piedi] vanno nei calzini e nelle scarpe.'], ['[Hanno] cinque dita ciascuna.', '[Applaudono].', '[Tengono] una tazza.']]
    },
    pt: {
      frogs: ['As rãs', 'Os lagos', 'Tudo sobre as rãs', ['[As rãs] pulam.', '[Comem] insetos.', '[As rãs] nadam nos lagos.', '[As rãs] botam ovos na água.', '[A rã] tem pernas de trás compridas.'], ['[Os lagos] são cheios de água.', '[Os lagos] podem ser muito grandes.'], ['[Pulam].', '[Comem] insetos.', '[Têm] pernas de trás compridas.']],
      moon: ['A lua', 'O sol', 'Tudo sobre a lua', ['[A lua] é redonda.', '[Brilha] à noite.', '[A lua] é menor que o sol.', '[A lua] tem crateras.', '[A lua] gira em volta da Terra.'], ['[O sol] é quente.', '[O sol] brilha de dia.'], ['[É] redonda.', '[Brilha] à noite.', '[Tem] crateras.']],
      ambulances: ['As ambulâncias', 'Os sinos', 'Tudo sobre as ambulâncias', ['[As ambulâncias] têm luzes que piscam.', '[Levam] pessoas doentes.', '[As ambulâncias] têm uma sirene barulhenta.', '[As ambulâncias] vão para o hospital.', '[A ambulância] tem uma maca dentro.'], ['[Os sinos] são barulhentos.', '[Os sinos] tocam.'], ['[Têm] uma sirene barulhenta.', '[Levam] pessoas doentes.', '[Têm] luzes que piscam.']],
      rain: ['A chuva', 'As flores', 'Tudo sobre a chuva', ['[A chuva] cai das nuvens.', '[Faz] poças.', '[A chuva] ajuda as flores a crescer.', '[A chuva] molha tudo.', '[A chuva] cai em gotas.'], ['[As flores] têm cheiro bom.', '[As flores] têm pétalas.'], ['[Cai] das nuvens.', '[Faz] poças.', '[Cai] em gotas.']],
      dogs: ['Os cachorros', 'Os gatos', 'Tudo sobre os cachorros', ['[Os cachorros] latem.', '[Abanam] o rabo.', '[Os cachorros] correm atrás dos gatos.', '[Os cachorros] buscam a bolinha.', '[Os cachorros] têm um ótimo faro.'], ['[Os gatos] fazem miau.', '[Os gatos] sobem em árvores.'], ['[Latem].', '[Buscam] a bolinha.', '[Passeiam] na coleira.']],
      bees: ['As abelhas', 'As formigas', 'Tudo sobre as abelhas', ['[As abelhas] zumbem.', '[Fazem] mel.', '[As abelhas] são maiores que as formigas.', '[As abelhas] moram numa colmeia.', '[As abelhas] visitam as flores.'], ['[As formigas] moram na terra.', '[As formigas] carregam migalhas.'], ['[Zumbem].', '[Fazem] mel.', '[Moram] numa colmeia.']],
      trees: ['As árvores', 'Os pássaros', 'Tudo sobre as árvores', ['[As árvores] têm folhas.', '[Ficam] muito altas.', '[As árvores] dão casa aos pássaros.', '[As árvores] têm raízes.', 'Algumas [árvores] dão maçãs.'], ['[Os pássaros] sabem voar.', '[Os pássaros] botam ovos.'], ['[Têm] folhas.', '[Têm] raízes.', '[Ficam] muito altas.']],
      hands: ['As mãos', 'Os pés', 'Tudo sobre as mãos', ['[As mãos] batem palmas.', '[Dão] tchau.', '[As mãos] ajudam a calçar as meias nos pés.', '[As mãos] seguram um copo.', '[A mão] tem cinco dedos.'], ['[Os pés] nos ajudam a andar.', '[Os pés] vão dentro das meias e dos sapatos.'], ['[Têm] cinco dedos cada uma.', '[Batem] palmas.', '[Seguram] um copo.']]
    },
    fr: {
      frogs: ['Les grenouilles', 'Les lacs', 'Tout sur les grenouilles', ['[Les grenouilles] sautent.', '[Elles] mangent des insectes.', '[Les grenouilles] nagent dans les lacs.', '[Les grenouilles] pondent leurs œufs dans l’eau.', '[La grenouille] a de longues pattes arrière.'], ['[Les lacs] sont pleins d’eau.', '[Les lacs] peuvent être très grands.'], ['[Elles] sautent.', '[Elles] mangent des insectes.', '[Elles] ont de longues pattes arrière.']],
      moon: ['La Lune', 'Le Soleil', 'Tout sur la Lune', ['[La Lune] est ronde.', '[Elle] brille la nuit.', '[La Lune] est plus petite que le Soleil.', '[La Lune] a des cratères.', '[La Lune] tourne autour de la Terre.'], ['[Le Soleil] est chaud.', '[Le Soleil] brille le jour.'], ['[Elle] est ronde.', '[Elle] brille la nuit.', '[Elle] a des cratères.']],
      ambulances: ['Les ambulances', 'Les cloches', 'Tout sur les ambulances', ['[Les ambulances] ont des lumières qui clignotent.', '[Elles] transportent des malades.', '[Les ambulances] ont une sirène bruyante.', '[Les ambulances] vont à l’hôpital.', '[L’ambulance] a un lit à l’intérieur.'], ['[Les cloches] sont bruyantes.', '[Les cloches] sonnent.'], ['[Elles] ont une sirène bruyante.', '[Elles] transportent des malades.', '[Elles] ont des lumières qui clignotent.']],
      rain: ['La pluie', 'Les fleurs', 'Tout sur la pluie', ['[La pluie] tombe des nuages.', '[Elle] fait des flaques.', '[La pluie] aide les fleurs à pousser.', '[La pluie] mouille tout.', '[La pluie] tombe en gouttes.'], ['[Les fleurs] sentent bon.', '[Les fleurs] ont des pétales.'], ['[Elle] tombe des nuages.', '[Elle] fait des flaques.', '[Elle] tombe en gouttes.']],
      dogs: ['Les chiens', 'Les chats', 'Tout sur les chiens', ['[Les chiens] aboient.', '[Ils] remuent la queue.', '[Les chiens] courent après les chats.', '[Les chiens] rapportent la balle.', '[Les chiens] ont un très bon flair.'], ['[Les chats] font miaou.', '[Les chats] grimpent aux arbres.'], ['[Ils] aboient.', '[Ils] rapportent la balle.', '[Ils] se promènent en laisse.']],
      bees: ['Les abeilles', 'Les fourmis', 'Tout sur les abeilles', ['[Les abeilles] bourdonnent.', '[Elles] font du miel.', '[Les abeilles] sont plus grandes que les fourmis.', '[Les abeilles] vivent dans une ruche.', '[Les abeilles] butinent les fleurs.'], ['[Les fourmis] vivent sous la terre.', '[Les fourmis] portent des miettes.'], ['[Elles] bourdonnent.', '[Elles] font du miel.', '[Elles] vivent dans une ruche.']],
      trees: ['Les arbres', 'Les oiseaux', 'Tout sur les arbres', ['[Les arbres] ont des feuilles.', '[Ils] poussent très haut.', '[Les arbres] donnent une maison aux oiseaux.', '[Les arbres] ont des racines.', 'Certains [arbres] donnent des pommes.'], ['[Les oiseaux] savent voler.', '[Les oiseaux] pondent des œufs.'], ['[Ils] ont des feuilles.', '[Ils] ont des racines.', '[Ils] poussent très haut.']],
      hands: ['Les mains', 'Les pieds', 'Tout sur les mains', ['[Les mains] peuvent applaudir.', '[Elles] font coucou.', '[Les mains] aident à mettre les chaussettes aux pieds.', '[Les mains] peuvent tenir une tasse.', '[La main] a cinq doigts.'], ['[Les pieds] nous aident à marcher.', '[Les pieds] vont dans les chaussettes et les chaussures.'], ['[Elles] ont cinq doigts chacune.', '[Elles] peuvent applaudir.', '[Elles] peuvent tenir une tasse.']]
    },
    fi: {
      frogs: ['Sammakot', 'Järvet', 'Kaikki sammakoista', ['[Sammakot] hyppivät.', '[Ne] syövät hyönteisiä.', '[Sammakot] uivat järvissä.', '[Sammakot] munivat veteen.', '[Sammakolla] on pitkät takajalat.'], ['[Järvet] ovat täynnä vettä.', '[Järvet] voivat olla tosi isoja.'], ['[Ne] hyppivät.', '[Ne] syövät hyönteisiä.', '[Niillä] on pitkät takajalat.']],
      moon: ['Kuu', 'Aurinko', 'Kaikki kuusta', ['[Kuu] on pyöreä.', '[Se] loistaa yöllä.', '[Kuu] on pienempi kuin aurinko.', '[Kuussa] on kraattereita.', '[Kuu] kiertää maata.'], ['[Aurinko] on kuuma.', '[Aurinko] paistaa päivällä.'], ['[Se] on pyöreä.', '[Se] loistaa yöllä.', '[Siinä] on kraattereita.']],
      ambulances: ['Ambulanssit', 'Kellot', 'Kaikki ambulansseista', ['[Ambulansseissa] on vilkkuvalot.', '[Ne] kuljettavat sairaita ihmisiä.', '[Ambulansseissa] on kovaääninen sireeni.', '[Ambulanssit] ajavat sairaalaan.', '[Ambulanssissa] on sänky.'], ['[Kellot] ovat kovaäänisiä.', '[Kellot] ovat metallia.'], ['[Niissä] on kovaääninen sireeni.', '[Ne] kuljettavat sairaita ihmisiä.', '[Niissä] on vilkkuvalot.']],
      rain: ['Sade', 'Kukat', 'Kaikki sateesta', ['[Sade] tulee pilvistä.', '[Se] tekee lätäköitä.', '[Sade] auttaa kukkia kasvamaan.', '[Sade] kastelee kaiken.', '[Sade] tulee pisaroina.'], ['[Kukat] tuoksuvat hyvältä.', '[Kukilla] on terälehdet.'], ['[Se] tulee pilvistä.', '[Se] tekee lätäköitä.', '[Se] tulee pisaroina.']],
      dogs: ['Koirat', 'Kissat', 'Kaikki koirista', ['[Koirat] haukkuvat.', '[Ne] heiluttavat häntäänsä.', '[Koirat] jahtaavat kissoja.', '[Koirat] tuovat kepin takaisin.', '[Koirilla] on tosi hyvä hajuaisti.'], ['[Kissat] sanovat miau.', '[Kissat] kiipeävät puihin.'], ['[Ne] haukkuvat.', '[Ne] tuovat kepin takaisin.', '[Ne] käyvät kävelyllä hihnassa.']],
      bees: ['Mehiläiset', 'Muurahaiset', 'Kaikki mehiläisistä', ['[Mehiläiset] surisevat.', '[Ne] tekevät hunajaa.', '[Mehiläiset] ovat isompia kuin muurahaiset.', '[Mehiläiset] asuvat mehiläispesässä.', '[Mehiläiset] käyvät kukissa.'], ['[Muurahaiset] asuvat maassa.', '[Muurahaiset] kantavat muruja.'], ['[Ne] surisevat.', '[Ne] tekevät hunajaa.', '[Ne] lentävät kukasta kukkaan.']],
      trees: ['Puut', 'Linnut', 'Kaikki puista', ['[Puilla] on lehdet.', '[Ne] kasvavat tosi korkeiksi.', '[Puut] antavat linnuille kodin.', '[Puilla] on juuret.', 'Joissakin [puissa] kasvaa omenoita.'], ['[Linnut] osaavat lentää.', '[Linnut] munivat.'], ['[Niillä] on lehdet.', '[Niillä] on juuret.', '[Ne] kasvavat tosi korkeiksi.']],
      hands: ['Kädet', 'Jalat', 'Kaikki käsistä', ['[Kädet] taputtavat.', '[Ne] voivat vilkuttaa.', '[Kädet] auttavat vetämään sukat jalkaan.', '[Kädet] voivat pidellä kuppia.', '[Kädessä] on viisi sormea.'], ['[Jalat] auttavat meitä kävelemään.', '[Jalat] menevät sukkiin ja kenkiin.'], ['[Niissä] on viisi sormea kummassakin.', '[Ne] taputtavat.', '[Ne] voivat pidellä kuppia.']]
    }
  };

  function locale(l) { l = String(l || 'en').slice(0, 2); return WORDS[l] ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(v) >= 0 ? v : 'l1'; }
  function helpOf(v) { return HELPS.indexOf(v) >= 0 ? v : 'off'; }
  function cardsOf(v) { v = String(v); return CARDS.indexOf(v) >= 0 ? v : '4'; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }

  /* "[Frogs] hop." → { text: 'Frogs hop.', about: [0, 5] } — the about-word as authored */
  function parse(s) { var a = s.indexOf('['), b = s.indexOf(']'); return { text: s.slice(0, a) + s.slice(a + 1, b) + s.slice(b + 1), about: [a, b - 1] }; }
  function words(loc, topicId) { var w = WORDS[locale(loc)][topicId]; return { plate: w[0], door: w[1], title: w[2], facts: w[3], drifts: w[4], mystery: w[5] }; }
  function cardText(loc, r, id) {
    var w = words(loc, r.topic.id), k = id.charAt(0), i = +id.slice(1);
    return parse(k === 'f' ? w.facts[i] : k === 'd' ? w.drifts[i] : w.mystery[i]);
  }
  function doorFits(loc, topicIdx) { var f = TOPICS[topicIdx].doorFits; return (f[locale(loc)] || f.all || []).slice(); }

  function ids() { var out = []; for (var i = 0; i < TOPICS.length; i++) out.push(i); return out; }
  /* one room: its cards {id, role, about: 'topic'|'door'}. L1: the wall's cards · L2: one hung card + the cart · L3: three mystery facts + the shelf */
  function round(level, idx, cards) {
    level = levelOf(level); cards = cardsOf(cards);
    var t = TOPICS[idx], r = { id: level + '.' + idx, level: level, idx: idx, topic: t, n: cards === '3' ? 3 : 4 };
    var card = function (id) { var k = id.charAt(0), i = +id.slice(1); return { id: id, role: k === 'd' ? 'drift' : k === 'm' ? 'mystery' : ROLE[i], about: k === 'd' ? 'door' : 'topic' }; };
    if (level === 'l1') r.cards = (r.n === 4 ? ['f0', 'f1', 'f2', 'd0'] : ['f0', 'f2', 'd0']).map(card);
    else if (level === 'l2') { r.hung = card('f3'); r.cart = (r.n === 4 ? ['f2', 'f4', 'd0', 'd1'] : ['f2', 'f4', 'd0']).map(card); r.cards = [r.hung].concat(r.cart); }
    else { r.cards = ['m0', 'm1', 'm2'].map(card); r.shelf = [t.pic, t.door]; }
    return r;
  }
  function find(r, id) { for (var i = 0; i < r.cards.length; i++) if (r.cards[i].id === id) return r.cards[i]; return null; }

  /* the wall's reading order: the drift's place uniform; the pronoun card always after a card that names the topic */
  function dealWall(r, rnd) {
    var n = r.cards.length, out = new Array(n), drift = r.cards.filter(function (c) { return c.role === 'drift'; })[0];
    var at = Math.floor(rnd() * n); out[at] = drift.id;
    var rest = r.cards.filter(function (c) { return c !== drift; });
    for (var t = 0; t < 200; t++) {
      var o = shuffle(rest.slice(), rnd), slots = [], k = 0;
      for (var s = 0; s < n; s++) if (s !== at) slots.push(s);
      var ok = true, seenNamer = false;
      var tmp = out.slice(); slots.forEach(function (s, j) { tmp[s] = o[j].id; });
      for (var q = 0; q < n; q++) { var c = find(r, tmp[q]); if (c.role === 'namer' || c.role === 'trap') seenNamer = true; if (c.role === 'pronoun' && !seenNamer) ok = false; }
      if (ok) return tmp;
      k++;
    }
    return null;
  }
  function plan(rnd, prev) {
    var all = ids();
    for (var t = 0; t < 2000; t++) { var o = shuffle(all.slice(), rnd); if (prev && prev.length && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue; return o; }
    return shuffle(all.slice(), rnd);
  }

  function newState(r, rnd) {
    rnd = rnd || Math.random;
    var st = { r: r, hook: {}, wall: [], cart: [], frame: null, shelf: [], sel: null, misses: 0, tries: 0, help: 0, last: null, done: false };
    if (r.level === 'l1') { st.wall = dealWall(r, rnd); st.wall.forEach(function (id) { st.hook[id] = null; }); }
    else if (r.level === 'l2') { st.wall = [r.hung.id]; for (var i = 1; i < r.n; i++) st.wall.push(null); st.hook[r.hung.id] = null; st.cart = shuffle(r.cart.map(function (c) { return c.id; }), rnd); }
    else {
      st.wall = r.cards.map(function (c) { return c.id; }); st.wall.forEach(function (id) { st.hook[id] = 'frame'; });
      var t = r.topic, other = t.others[Math.floor(rnd() * t.others.length)];
      st.shelf = shuffle([t.pic, t.door, other], rnd);
    }
    return st;
  }
  function clear(st) { st.last = null; st.help = 0; }

  /* the hand */
  function select(st, id) { if (st.done || !find(st.r, id) || st.r.level === 'l3') return false; if (st.wall.indexOf(id) < 0) return false; st.sel = st.sel === id ? null : id; return true; }
  function hookTo(st, id, sign) {
    if (st.done || st.r.level === 'l3' || st.wall.indexOf(id) < 0) return false;
    if (sign !== null && sign !== 'topic' && sign !== 'door') return false;
    st.hook[id] = sign; st.sel = null; clear(st); return true;
  }
  function hang(st, id) {   /* L2: a cart card onto the first empty hook */
    if (st.done || st.r.level !== 'l2' || st.cart.indexOf(id) < 0) return false;
    var slot = st.wall.indexOf(null); if (slot < 0) return false;
    st.wall[slot] = id; st.cart.splice(st.cart.indexOf(id), 1); st.hook[id] = null; st.sel = null; clear(st); return true;
  }
  function unhang(st, id) {   /* L2: a wall card back to the cart (the first card was hung by the museum and stays) */
    if (st.done || st.r.level !== 'l2' || id === st.r.hung.id) return false;
    var slot = st.wall.indexOf(id); if (slot < 0) return false;
    st.wall[slot] = null; st.cart.push(id); delete st.hook[id]; st.sel = null; clear(st); return true;
  }
  function place(st, pic) {   /* L3: a shelf picture into the frame (null empties the frame) */
    if (st.done || st.r.level !== 'l3') return false;
    if (pic !== null && st.shelf.indexOf(pic) < 0) return false;
    st.frame = pic; clear(st); return true;
  }

  function miss(st, reason, extra) { st.misses++; st.tries++; st.help = Math.min(2, st.tries); st.last = { reason: reason }; if (extra) for (var k in extra) st.last[k] = extra[k]; return { ok: false, reason: reason }; }
  function wrongStrings(st) { var r = st.r, out = []; st.wall.forEach(function (id) { if (id && st.hook[id] !== find(r, id).about) out.push(id); }); return out; }
  function check(st) {
    if (st.done) return { ok: true };
    st.sel = null;
    var r = st.r;
    if (r.level === 'l3') {
      if (!st.frame) { st.last = { reason: 'frame' }; st.help = 0; return { ok: false, reason: 'frame' }; }
      if (st.frame !== r.topic.pic) return miss(st, 'sign', { pic: st.frame });
    } else {
      var loose = st.wall.filter(function (id) { return id && !st.hook[id]; });
      if (loose.length) { st.last = { reason: 'loose', cards: loose }; st.help = 0; return { ok: false, reason: 'loose' }; }
      var wrong = wrongStrings(st);
      if (wrong.length) return miss(st, 'strings', { cards: wrong });
      if (r.level === 'l2') {
        var left = st.cart.filter(function (id) { return find(r, id).about === 'topic'; });
        if (left.length) return miss(st, 'missing', { cards: left });
      }
    }
    st.done = true; st.last = null; st.help = 0;
    return { ok: true };
  }
  function hint(st) {
    if (st.done || !st.last) return null;
    var R = st.last.reason;
    if (R === 'loose') return 'hLoose';
    if (R === 'frame') return 'hFrame';
    if (R === 'sign') return st.help >= 2 ? 'hSign2' : 'hSign';
    if (R === 'missing') return st.help >= 2 ? 'hMissing2' : 'hMissing';
    return st.help >= 2 ? 'hMiss2' : 'hMiss1';
  }
  /* miss 1: the about-words light (all of them, or only the wrong cards' with "Words that help" on) */
  function lit(st, helpOn) {
    if (!st.last || st.last.reason !== 'strings') return [];
    if (helpOn) return st.last.cards.slice();
    return st.wall.filter(function (id) { return !!id; });
  }
  /* the card a pronoun card points back to: the nearest card before it on the wall that names the topic */
  function pointsTo(st, id) {
    var c = find(st.r, id); if (!c || c.role !== 'pronoun') return null;
    var at = st.wall.indexOf(id);
    for (var q = at - 1; q >= 0; q--) { var p = st.wall[q] && find(st.r, st.wall[q]); if (p && (p.role === 'namer' || p.role === 'trap')) return p.id; }
    return null;
  }
  /* miss 2: each wrong string → the sign it belongs to; L2 a fact left on the cart → the wall */
  function threads(st) {
    if (st.help < 2 || !st.last || st.done) return [];
    var r = st.r;
    if (st.last.reason === 'strings') return wrongStrings(st).map(function (id) { return { card: id, to: find(r, id).about }; });
    if (st.last.reason === 'missing') return st.cart.filter(function (id) { return find(r, id).about === 'topic'; }).map(function (id) { return { card: id, to: 'wall' }; });
    if (st.last.reason === 'sign') return [{ pic: r.topic.pic, to: 'frame' }];
    return [];
  }
  /* L3 miss: the facts the picture in the frame is NOT true of (their strings sag) */
  function refuses(st, loc) {
    var r = st.r; if (r.level !== 'l3' || !st.last || st.last.reason !== 'sign') return [];
    var fits = st.frame === r.topic.door ? doorFits(loc, r.idx) : [];
    return r.cards.map(function (c, i) { return i; }).filter(function (i) { return fits.indexOf(i) < 0; }).map(function (i) { return r.cards[i].id; });
  }
  /* the page: the room's facts in order, a pronoun card right after the card it points back to */
  function page(st) {
    var r = st.r, ids2 = st.wall.filter(function (id) { return id && find(r, id).about === 'topic'; });
    var pron = ids2.filter(function (id) { return find(r, id).role === 'pronoun'; }), rest = ids2.filter(function (id) { return find(r, id).role !== 'pronoun'; });
    if (pron.length && rest.length) rest.splice(1, 0, pron[0]); else rest = rest.concat(pron);
    return rest;
  }
  function leaving(st) { return st.wall.filter(function (id) { return id && find(st.r, id).about === 'door'; }); }

  /* sizes per width: library pictures at the floor (the room's sign 128 / 88, the doorway 96 / 64) */
  function layout(W) {
    var wide = W >= 560, tiny = W < 300;
    return { mode: wide ? 'wide' : 'narrow', tiny: tiny, W: W, sign: wide ? 128 : tiny ? 72 : 88, door: wide ? 96 : 64, shelf: wide ? 96 : tiny ? 64 : 72 };
  }

  return {
    DATA: { TOPICS: TOPICS, WORDS: WORDS, ROLE: ROLE },
    LOCALES: LOCALES, LEVELS: LEVELS, HELPS: HELPS, CARDS: CARDS,
    locale: locale, levelOf: levelOf, helpOf: helpOf, cardsOf: cardsOf, shuffle: shuffle, parse: parse, words: words, cardText: cardText, doorFits: doorFits,
    ids: ids, round: round, find: find, dealWall: dealWall, plan: plan, newState: newState,
    select: select, hookTo: hookTo, hang: hang, unhang: unhang, place: place, wrongStrings: wrongStrings, check: check, hint: hint,
    lit: lit, pointsTo: pointsTo, threads: threads, refuses: refuses, page: page, leaving: leaving, layout: layout
  };
}));
