/* =====================================================================
   TOOL #16 — FRACTION KITCHEN   (fraction-kitchen.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #16 of the Premium Tools Program
   (Wave 3) — the Math Table fractions tool: a cheerful kitchen where a
   child drags a knife along faint guide lines to REALLY cut SVG food
   (pizza / chocolate bar / sheet cake) into equal parts, shares slices
   onto friends' plates, and proves equivalence by filling a tray
   ("two fourths fill one half exactly"). Fraction names are SPOKEN in
   locale words — this tool is MEANING before notation: no ½ or 3/4
   symbols anywhere child-visible.

   NO-SHAME DESIGN (pedagogy-locked): the wobble-back on an off-center
   cut is PHYSICS, never a verdict — the unequal pieces are SHOWN for a
   beat (the teachable instant), seesaw gently, and heal; the kind voice
   line plays at most ONCE per food; the distractor guide returns
   unmarked and stays available. Distractor guides are styled PIXEL-
   IDENTICAL to correct guides. No red, no verdict-green, no ✗, no
   "wrong/oops", no timers/scores/stars, no attempt counters. Friend
   faces NEVER react to performance (a bounce on receiving a slice + one
   shared blink at completion is the whole celebration). Leftovers and
   empty plates are DISCUSSION MOMENTS: a neutral observation line, then
   the tool waits. Any future "mark the wrong cut red" request is to be
   refused.

   GEOMETRY: closed-form exact cut lines COPIED from fractions-core.js
   constants (viewBox 0 0 100 100; circle CX50 CY50 R40; rect 8..72..92)
   plus kitchen-local builders (circle sixths, rect thirds-h, 4×2 grid,
   bar lattice-snapped distractors). Every correct set is proven equal-
   area by point-sampling in scripts/verify-fraction-kitchen.js; every
   topping clears every candidate segment (no telegraphing). The
   protected fractions-core.js / fraction-equiv-core.js are UNTOUCHED.
   ===================================================================== */
var FractionKitchen = {
  id: 'fraction-kitchen',

  strings: {
    title:        {en:'Fraction Kitchen',de:'Die Bruch-Küche',fr:'La cuisine des fractions',it:'La cucina delle frazioni',es:'La cocina de fracciones',pt:'A cozinha das frações',nl:'De breukenkeuken',sv:'Bråkköket',da:'Brøkkøkkenet',no:'Brøkkjøkkenet',fi:'Murtolukukeittiö'},
    instruction:  {en:'Pick a food, pick the pieces, and cut along a line — equal parts taste best!',de:'Wähle ein Essen, wähle die Teile und schneide an einer Linie entlang — gleich große Teile schmecken am besten!',fr:'Choisis un aliment, choisis les parts et coupe le long d’une ligne — les parts égales sont les meilleures !',it:'Scegli un cibo, scegli le parti e taglia lungo una linea — le parti uguali sono le più buone!',es:'Elige una comida, elige las partes y corta por una línea — ¡las partes iguales saben mejor!',pt:'Escolha uma comida, escolha as partes e corte seguindo uma linha — partes iguais são as mais gostosas!',nl:'Kies iets lekkers, kies de stukken en snijd langs een lijn — gelijke stukken smaken het lekkerst!',sv:'Välj något gott, välj delarna och skär längs en linje — lika stora bitar smakar bäst!',da:'Vælg mad, vælg stykkerne og skær langs en linje — lige store stykker smager bedst!',no:'Velg mat, velg hvor mange biter og skjær langs en linje — like store biter smaker best!',fi:'Valitse ruoka, valitse palat ja leikkaa viivaa pitkin — yhtä suuret palat maistuvat parhaalta!'},
    /* the 10 utterance templates — {n} count, {fp} plural, {fs} singular,
       {fc} counted form, {food} localized food name, {f} friends, {p} pieces,
       {a} amount, {small}/{big} frac forms */
    cutPrompt:    {en:'Let’s cut the {food} into {n} equal parts — {fp}.',de:'Wir schneiden {food} in {n} gleich große Teile — {fp}.',fr:'Coupons {food} en {n} parts égales — des {fp}.',it:'Tagliamo {food} in {n} parti uguali — {fp}.',es:'Vamos a cortar {food} en {n} partes iguales — {fp}.',pt:'Vamos cortar {food} em {n} partes iguais — {fp}.',nl:'We snijden {food} in {n} gelijke stukken — {fp}.',sv:'Vi skär {food} i {n} lika stora delar — {fp}.',da:'Vi skærer {food} i {n} lige store dele — {fp}.',no:'Vi skjærer {food} i {n} like store deler — {fp}.',fi:'Leikataan {food} {n} yhtä suureen osaan — {fp}.'},
    cutDone:      {en:'{fp}! {n} equal parts.',de:'{fp}! {n} gleich große Teile.',fr:'Des {fp} ! {n} parts égales.',it:'{fp}! {n} parti uguali.',es:'¡{fp}! {n} partes iguales.',pt:'{fp}! {n} partes iguais.',nl:'{fp}! {n} gelijke stukken.',sv:'{fp}! {n} lika stora delar.',da:'{fp}! {n} lige store dele.',no:'{fp}! {n} like store deler.',fi:'{fp}! {n} yhtä suurta osaa.'},
    wobbleLine:   {en:'Hmm — those pieces aren’t the same size. Let’s find the cut that makes equal pieces.',de:'Hmm — diese Teile sind nicht gleich groß. Lass uns den Schnitt finden, der gleich große Teile macht.',fr:'Hmm — ces parts n’ont pas la même taille. Cherchons la coupe qui fait des parts égales.',it:'Mmm — queste parti non sono della stessa grandezza. Cerchiamo insieme il taglio che fa parti uguali.',es:'Mmm — esas partes no son del mismo tamaño. Busquemos el corte que haga partes iguales.',pt:'Hum… esses pedaços não ficaram do mesmo tamanho. Vamos procurar o corte que faz partes iguais.',nl:'Hmm — die stukken zijn niet even groot. Laten we de snee zoeken die gelijke stukken maakt.',sv:'Hmm — de där bitarna är inte lika stora. Vi letar efter snittet som ger lika stora delar.',da:'Hmm — stykkerne er ikke lige store. Lad os finde det snit, der giver lige store stykker.',no:'Hmm — de bitene er ikke like store. La oss finne snittet som gir like store deler.',fi:'Hmm — nuo palat eivät ole yhtä suuria. Etsitään viiva, joka tekee yhtä suuret palat.'},
    sharePrompt:  {en:'{f} friends want to share the {food}. Give everyone a fair share.',de:'{f} Freunde wollen sich {food} teilen. Verteile die Stücke gerecht.',fr:'{f} amis veulent partager {food}. Donne à chacun une part juste.',it:'{f} amici vogliono dividersi {food}. Dai a ognuno una parte uguale.',es:'{f} amigos quieren compartir {food}. Dale a cada uno una parte justa.',pt:'{f} amigos querem dividir {food}. Dê a cada um uma parte justa.',nl:'{f} vrienden willen {food} delen. Geef iedereen een eerlijk stuk.',sv:'{f} vänner vill dela på {food}. Ge alla en rättvis del.',da:'{f} venner vil dele {food}. Giv alle en fair del.',no:'{f} venner vil dele {food}. Gi alle en rettferdig del.',fi:'Pöydässä on {food}, ja {f} ystävää haluaa jakaa sen. Anna jokaiselle reilu osuus.'},
    shareDone:    {en:'Everyone got a fair share. Time to eat!',de:'Alle haben gleich viel bekommen. Guten Appetit!',fr:'Tout le monde a une part juste. Bon appétit !',it:'Una parte uguale per ognuno. Buon appetito!',es:'Todos tienen una parte justa. ¡A comer!',pt:'Todo mundo ganhou uma parte justa. Hora de comer!',nl:'Iedereen heeft een eerlijk stuk. Smakelijk!',sv:'Alla fick en rättvis del. Nu äter vi!',da:'Alle fik en fair del. Velbekomme!',no:'Alle fikk en rettferdig del. Nå spiser vi!',fi:'Jokainen sai reilun osuuden. Hyvää ruokahalua!'},
    shareLeftover:{en:'Everyone has one piece — and one piece is left over. Hmm!',de:'Jeder hat ein Stück — und ein Stück ist übrig. Hmm!',fr:'Tout le monde a une part — et il en reste une. Hmm !',it:'Tutti hanno una parte — e ne avanza una. Mmm!',es:'Todos tienen una parte — y sobra una. ¡Vaya!',pt:'Todo mundo tem um pedaço — e sobrou um. E agora?',nl:'Iedereen heeft een stuk — en er is één stuk over. Hmm!',sv:'Alla har en bit — och en bit blir över. Hmm!',da:'Alle har et stykke — og der er ét stykke tilovers. Hmm!',no:'Alle har en bit — og en bit er til overs. Hmm!',fi:'Jokaisella on pala — ja yksi pala jää yli. Hmm!'},
    shareEmpty:   {en:'{p} pieces, {f} friends — someone’s plate is empty!',de:'{p} Stücke, {f} Freunde — ein Teller ist leer!',fr:'{p} parts, {f} amis — une assiette est vide !',it:'{p} parti, {f} amici — un piatto resta vuoto!',es:'{p} partes, {f} amigos — ¡un plato quedó vacío!',pt:'{p} pedaços, {f} amigos — um prato ficou vazio!',nl:'{p} stukken, {f} vrienden — één bord is leeg!',sv:'{p} bitar, {f} vänner — någons tallrik är tom!',da:'{p} stykker, {f} venner — én tallerken er tom!',no:'{p} biter, {f} venner — noen har tom tallerken!',fi:'{p} palaa, {f} ystävää — jonkun lautanen on tyhjä!'},
    /* ⚠ BARE {fs} IN EVERY LOCALE, ENGLISH INCLUDED. The `s` form already
       carries its own article ("one half" / "eine Hälfte" / "un quart"),
       so a template that adds one produces "one one half". English shipped
       exactly that: its template was 'one {fs}' while all ten siblings
       were bare. The native ensembles caught this doubling in the equiv
       template and fixed it across eleven locales — and missed it here,
       in the one locale none of them was asked to read. */
    pieceName:    {en:'{fs}',de:'{fs}',fr:'{fs}',it:'{fs}',es:'{fs}',pt:'{fs}',nl:'{fs}',sv:'{fs}',da:'{fs}',no:'{fs}',fi:'{fs}'},
    equivPrompt:  {en:'Can {a} {small} fill {big}?',de:'Können {a} {small} {big} genau ausfüllen?',fr:'Est-ce que {a} {small} remplissent {big} ?',it:'{a} {small} possono riempire {big}?',es:'¿Pueden {a} {small} llenar {big}?',pt:'Será que {a} {small} enchem {big}?',nl:'Kunnen {a} {small} samen {big} vullen?',sv:'Kan {a} {small} fylla {big}?',da:'Kan {a} {small} fylde {big}?',no:'Kan {a} {small} fylle {big}?',fi:'Voiko {a} {small} täyttää saman tilan kuin {big}?'},
    equivDone:    {en:'{a} {small} fill it exactly. {a} {small} make {big}.',de:'{a} {small} füllen es genau aus. {a} {small} sind genauso viel wie {big}.',fr:'{a} {small} le remplissent exactement. {a} {small} font {big}.',it:'{a} {small} lo riempiono esattamente. {a} {small} fanno {big}.',es:'{a} {small} la llenan exactamente. {a} {small} hacen {big}.',pt:'{a} {small} enchem certinho. {a} {small} formam {big}.',nl:'{a} {small} vullen het precies. {a} {small} zijn samen {big}.',sv:'{a} {small} fyller den exakt. {a} {small} blir {big}.',da:'{a} {small} fylder den helt præcist. {a} {small} giver {big}.',no:'{a} {small} fyller den helt nøyaktig. {a} {small} blir {big}.',fi:'{a} {small} täyttää sen tarkalleen. {a} {small} on yhtä paljon kuin {big}.'},
    equivTooBig:  {en:'That piece is too big for the space left. Try a smaller one.',de:'Dieses Stück ist zu groß für den Platz, der noch frei ist. Probier ein kleineres.',fr:'Cette part est trop grande pour la place qui reste. Essaie une plus petite.',it:'Questa parte è troppo grande per lo spazio rimasto. Provane una più piccola.',es:'Esa parte es demasiado grande para el espacio que queda. Prueba una más chica.',pt:'Esse pedaço é grande demais para o espaço que sobrou. Tente um menor.',nl:'Dat stuk is te groot voor de ruimte die over is. Probeer een kleiner stuk.',sv:'Den biten är för stor för utrymmet som är kvar. Prova en mindre bit.',da:'Det stykke er for stort til den plads, der er tilbage. Prøv et mindre.',no:'Den biten er for stor for plassen som er igjen. Prøv en mindre.',fi:'Se pala on liian iso jäljellä olevaan tilaan. Kokeile pienempää.'},
    /* foods + ui */
    foodPizza:    {en:'the pizza',de:'die Pizza',fr:'la pizza',it:'la pizza',es:'la pizza',pt:'a pizza',nl:'de pizza',sv:'pizzan',da:'pizzaen',no:'pizzaen',fi:'pizza'},
    foodBar:      {en:'the chocolate bar',de:'die Schokolade',fr:'la tablette de chocolat',it:'la tavoletta di cioccolato',es:'el chocolate',pt:'a barra de chocolate',nl:'de reep chocola',sv:'chokladkakan',da:'chokoladen',no:'sjokoladen',fi:'suklaalevy'},
    foodCake:     {en:'the cake',de:'den Kuchen',fr:'le gâteau',it:'la torta',es:'el pastel',pt:'o bolo',nl:'de taart',sv:'kakan',da:'kagen',no:'kaken',fi:'kakku'},
    chipPizza:    {en:'Pizza',de:'Pizza',fr:'Pizza',it:'Pizza',es:'Pizza',pt:'Pizza',nl:'Pizza',sv:'Pizza',da:'Pizza',no:'Pizza',fi:'Pizza'},
    chipBar:      {en:'Chocolate',de:'Schokolade',fr:'Chocolat',it:'Cioccolato',es:'Chocolate',pt:'Chocolate',nl:'Chocola',sv:'Choklad',da:'Chokolade',no:'Sjokolade',fi:'Suklaa'},
    chipCake:     {en:'Cake',de:'Kuchen',fr:'Gâteau',it:'Torta',es:'Pastel',pt:'Bolo',nl:'Taart',sv:'Kaka',da:'Kage',no:'Kake',fi:'Kakku'},
    shareChip:    {en:'Share it',de:'Teilen',fr:'Partager',it:'Dividi',es:'Compartir',pt:'Dividir',nl:'Delen',sv:'Dela',da:'Del den',no:'Del ut',fi:'Jaa'},
    friendsLbl:   {en:'Friends',de:'Freunde',fr:'Amis',it:'Amici',es:'Amigos',pt:'Amigos',nl:'Vrienden',sv:'Vänner',da:'Venner',no:'Venner',fi:'Ystävät'},
    equivChip:    {en:'Fill the tray',de:'Das Tablett füllen',fr:'Remplir le plateau',it:'Riempi il vassoio',es:'Llenar la bandeja',pt:'Encher o tabuleiro',nl:'De bakplaat vullen',sv:'Fyll brickan',da:'Fyld bakken',no:'Fyll brettet',fi:'Täytä tarjotin'},
    cutAgain:     {en:'Cut again',de:'Neu schneiden',fr:'Recouper',it:'Taglia di nuovo',es:'Cortar de nuevo',pt:'Cortar de novo',nl:'Opnieuw snijden',sv:'Skär igen',da:'Skær igen',no:'Skjær igjen',fi:'Leikkaa uudelleen'},
    startAgain:   {en:'Start again',de:'Noch einmal',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw beginnen',sv:'Börja om',da:'Begynd forfra',no:'Begynn på nytt',fi:'Aloita alusta'},
    fracWhole:    {en:'one whole',de:'ein Ganzes',fr:'un entier',it:'un intero',es:'un entero',pt:'um inteiro',nl:'een hele',sv:'en hel',da:'en hel',no:'en hel',fi:'yksi kokonainen'},
    stories:      {en:'Stories',de:'Geschichten',fr:'Histoires',it:'Storie',es:'Cuentos',pt:'Histórias',nl:'Verhalen',sv:'Berättelser',da:'Historier',no:'Fortellinger',fi:'Tarinat'},
    close:        {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    /* gates */
    gateMenu:     {en:'The chocolate bar, the cake, thirds, sixths and eighths are part of Premium. The pizza with halves and fourths — cutting and sharing — is always free.',de:'Schokolade, Kuchen, Drittel, Sechstel und Achtel gehören zu Premium. Die Pizza mit Hälften und Vierteln — Schneiden und Teilen — bleibt immer kostenlos.',fr:'Le chocolat, le gâteau, les tiers, les sixièmes et les huitièmes font partie de Premium. La pizza en moitiés et en quarts — couper et partager — reste gratuite.',it:'Il cioccolato, la torta, i terzi, i sesti e gli ottavi fanno parte di Premium. La pizza in metà e in quarti — tagliare e dividere — resta sempre gratuita.',es:'El chocolate, el pastel, los tercios, los sextos y los octavos son parte de Premium. La pizza en mitades y cuartos — cortar y compartir — siempre es gratis.',pt:'O chocolate, o bolo, os terços, os sextos e os oitavos fazem parte do Premium. A pizza em metades e quartos — cortar e dividir — é sempre gratuita.',nl:'De chocola, de taart, derden, zesden en achtsten horen bij Premium. De pizza in helften en kwarten — snijden en delen — blijft altijd gratis.',sv:'Chokladkakan och kakan samt tredjedelar, sjättedelar och åttondelar ingår i Premium. Pizzan i halvor och fjärdedelar — att skära och dela — är alltid gratis.',da:'Chokoladen, kagen, tredjedele, sjettedele og ottendedele er en del af Premium. Pizzaen i halvdele og fjerdedele — at skære og dele — er altid gratis.',no:'Sjokoladen, kaken, tredeler, sjettedeler og åttedeler hører til Premium. Pizzaen med halvdeler og firedeler — å skjære og dele ut — er alltid gratis.',fi:'Suklaa, kakku, kolmasosat, kuudesosat ja kahdeksasosat kuuluvat Premiumiin. Pizza puolikkaina ja neljäsosina — leikkaaminen ja jakaminen — on aina ilmainen.'},
    gateEquiv:    {en:'The tray station — proving that two fourths fill one half exactly — is part of Premium.',de:'Die Tablett-Station — der Beweis, dass zwei Viertel genau eine Hälfte füllen — gehört zu Premium.',fr:'Le plateau — la preuve que deux quarts remplissent exactement une moitié — fait partie de Premium.',it:'Il vassoio — la prova che due quarti riempiono esattamente una metà — fa parte di Premium.',es:'La bandeja — la prueba de que dos cuartos llenan exactamente una mitad — es parte de Premium.',pt:'O tabuleiro — a prova de que dois quartos enchem exatamente uma metade — faz parte do Premium.',nl:'De bakplaat — het bewijs dat twee kwarten precies één helft vullen — hoort bij Premium.',sv:'Brickan — beviset på att två fjärdedelar fyller exakt en halva — ingår i Premium.',da:'Bakken — beviset på, at to fjerdedele fylder præcis en halvdel — er en del af Premium.',no:'Brettet — beviset på at to firedeler fyller nøyaktig en halvdel — hører til Premium.',fi:'Tarjotinpiste — todiste siitä, että kaksi neljäsosaa täyttää tarkalleen yhden puolikkaan — kuuluu Premiumiin.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    setSpeak:     {en:'Speak the fraction names',de:'Bruchnamen vorsprechen',fr:'Dire les noms des fractions',it:'Pronuncia i nomi delle frazioni',es:'Decir los nombres de las fracciones',pt:'Falar os nomes das frações',nl:'Breuknamen hardop uitspreken',sv:'Läs upp bråkens namn',da:'Sig brøkernes navne',no:'Les brøknavnene høyt',fi:'Lue murtolukujen nimet ääneen'},
    loading:      {en:'Setting the table…',de:'Der Tisch wird gedeckt…',fr:'On met la table…',it:'Apparecchiamo la tavola…',es:'Poniendo la mesa…',pt:'Arrumando a mesa…',nl:'De tafel wordt gedekt…',sv:'Bordet dukas…',da:'Bordet dækkes…',no:'Bordet dekkes…',fi:'Katetaan pöytää…'}
  },

  /* per-locale per-denominator fraction forms: s = singular ("one half" /
     "ein Halb" — the full spoken phrase), p = plural (bare), c = counted
     (the noun form after a numeral). Halves are SPECIAL-CASED per locale
     by the native ensembles; drafts below. Templates slot forms, never
     compose stems. */
  FRAC: {
    2: { s:{en:'one half',de:'eine Hälfte',fr:'une moitié',it:'una metà',es:'una mitad',pt:'uma metade',nl:'een helft',sv:'en halva',da:'en halvdel',no:'en halvdel',fi:'yksi puolikas'},
         p:{en:'halves',de:'Hälften',fr:'moitiés',it:'metà',es:'mitades',pt:'metades',nl:'helften',sv:'halvor',da:'halvdele',no:'halvdeler',fi:'puolikkaat'},
         c:{en:'halves',de:'Hälften',fr:'moitiés',it:'metà',es:'mitades',pt:'metades',nl:'helften',sv:'halvor',da:'halvdele',no:'halvdeler',fi:'puolikasta'} },
    3: { s:{en:'one third',de:'ein Drittel',fr:'un tiers',it:'un terzo',es:'un tercio',pt:'um terço',nl:'een derde',sv:'en tredjedel',da:'en tredjedel',no:'en tredel',fi:'yksi kolmasosa'},
         p:{en:'thirds',de:'Drittel',fr:'tiers',it:'terzi',es:'tercios',pt:'terços',nl:'derden',sv:'tredjedelar',da:'tredjedele',no:'tredeler',fi:'kolmasosat'},
         c:{en:'thirds',de:'Drittel',fr:'tiers',it:'terzi',es:'tercios',pt:'terços',nl:'derden',sv:'tredjedelar',da:'tredjedele',no:'tredeler',fi:'kolmasosaa'} },
    4: { s:{en:'one fourth',de:'ein Viertel',fr:'un quart',it:'un quarto',es:'un cuarto',pt:'um quarto',nl:'een kwart',sv:'en fjärdedel',da:'en fjerdedel',no:'en firedel',fi:'yksi neljäsosa'},
         p:{en:'fourths',de:'Viertel',fr:'quarts',it:'quarti',es:'cuartos',pt:'quartos',nl:'kwarten',sv:'fjärdedelar',da:'fjerdedele',no:'firedeler',fi:'neljäsosat'},
         c:{en:'fourths',de:'Viertel',fr:'quarts',it:'quarti',es:'cuartos',pt:'quartos',nl:'kwarten',sv:'fjärdedelar',da:'fjerdedele',no:'firedeler',fi:'neljäsosaa'} },
    6: { s:{en:'one sixth',de:'ein Sechstel',fr:'un sixième',it:'un sesto',es:'un sexto',pt:'um sexto',nl:'een zesde',sv:'en sjättedel',da:'en sjettedel',no:'en sjettedel',fi:'yksi kuudesosa'},
         p:{en:'sixths',de:'Sechstel',fr:'sixièmes',it:'sesti',es:'sextos',pt:'sextos',nl:'zesden',sv:'sjättedelar',da:'sjettedele',no:'sjettedeler',fi:'kuudesosat'},
         c:{en:'sixths',de:'Sechstel',fr:'sixièmes',it:'sesti',es:'sextos',pt:'sextos',nl:'zesden',sv:'sjättedelar',da:'sjettedele',no:'sjettedeler',fi:'kuudesosaa'} },
    8: { s:{en:'one eighth',de:'ein Achtel',fr:'un huitième',it:'un ottavo',es:'un octavo',pt:'um oitavo',nl:'een achtste',sv:'en åttondel',da:'en ottendedel',no:'en åttedel',fi:'yksi kahdeksasosa'},
         p:{en:'eighths',de:'Achtel',fr:'huitièmes',it:'ottavi',es:'octavos',pt:'oitavos',nl:'achtsten',sv:'åttondelar',da:'ottendedele',no:'åttedeler',fi:'kahdeksasosat'},
         c:{en:'eighths',de:'Achtel',fr:'huitièmes',it:'ottavi',es:'octavos',pt:'oitavos',nl:'achtsten',sv:'åttondelar',da:'ottendedele',no:'åttedeler',fi:'kahdeksasosaa'} }
  },

  /* premium story mode: fair-share flows with a spoken story frame.
     2 of 8 are deliberate DISCUSSION stories (leftover/mismatch). */
  STORIES: [
    { id:'st-picnic2', food:'pizza', n:2, friends:2, discussion:false,
      story:{en:'Two friends carry one pizza up the picnic hill. Both are very hungry!',de:'Zwei Freunde tragen eine Pizza den Hügel zum Picknick hinauf. Beide haben Riesenhunger!',fr:'Deux amis montent la colline du pique-nique avec une seule pizza. Et ils ont très faim tous les deux !',it:'Due amici salgono sulla collina del picnic con una pizza sola. Che fame!',es:'Dos amigos suben la colina del día de campo con una sola pizza. ¡Los dos tienen muchísima hambre!',pt:'Dois amigos sobem o morro do piquenique carregando uma pizza. Os dois estão morrendo de fome!',nl:'Twee vrienden klimmen met één pizza de picknickheuvel op. Ze hebben allebei reuzehonger!',sv:'Två kompisar går på utflykt med en pizza i korgen. Båda är jättehungriga!',da:'To venner bærer en pizza helt op på bakken til skovturen. De er begge to godt sultne!',no:'To venner bærer en pizza opp den bratte bakken til rasteplassen. Begge er skrubbsultne!',fi:'Kaksi ystävää kantaa pizzaa retkimäen päälle. Molemmilla on jo kova nälkä!'},
      closing:{en:'Half for you, half for me — the best picnic ever.',de:'Eine Hälfte für dich, eine Hälfte für mich — das beste Picknick überhaupt.',fr:'Une moitié pour toi, une moitié pour moi — le meilleur pique-nique du monde.',it:'Metà per te, metà per me — il picnic più bello del mondo.',es:'Una mitad para ti y una mitad para mí — el mejor día de campo del mundo.',pt:'Metade para você, metade para mim — o melhor piquenique do mundo.',nl:'Een helft voor jou, een helft voor mij — de lekkerste picknick ooit.',sv:'En halva till dig och en halva till mig — bästa utflykten någonsin!',da:'En halvdel til dig og en halvdel til mig — den bedste skovtur nogensinde.',no:'En halvdel til deg og en halvdel til meg — tidenes fineste tur.',fi:'Puolikas sinulle, puolikas minulle — paras eväsretki ikinä.'} },
    { id:'st-twins4', food:'pizza', n:4, friends:4, discussion:false,
      story:{en:'The twins and their two cousins baked a pizza together. Now everyone wants a piece!',de:'Die Zwillinge und ihre zwei Cousinen haben zusammen eine Pizza gebacken. Jetzt wollen alle ein Stück!',fr:'Les jumeaux et leurs deux cousines ont préparé une pizza ensemble. Maintenant, tout le monde en veut une part !',it:'I gemelli e i loro due cugini hanno preparato una pizza tutti insieme. Adesso ognuno ne vuole un pezzo!',es:'Los gemelos y sus dos primos prepararon una pizza entre todos. ¡Ahora cada uno quiere su parte!',pt:'As gêmeas e os dois primos fizeram uma pizza juntos. Agora todo mundo quer um pedaço!',nl:'De tweeling heeft samen met hun twee neefjes een pizza gebakken. Nu wil iedereen een stuk!',sv:'Tvillingarna och deras två kusiner har bakat en pizza tillsammans. Nu vill alla ha var sin bit!',da:'Tvillingerne og deres fætter og kusine har bagt en pizza sammen. Nu vil alle fire have et stykke!',no:'Tvillingene og de to søskenbarna deres har laget pizza sammen. Nå vil alle ha en bit!',fi:'Kaksoset ja heidän kaksi serkkuaan leipoivat yhdessä pizzan. Nyt jokainen haluaa oman palansa!'},
      closing:{en:'Four bakers, four fourths — fair and square.',de:'Vier Bäcker, vier Viertel — so ist es gerecht.',fr:'Quatre cuisiniers, quatre quarts — un partage juste pour tout le monde.',it:'Quattro cuochi, quattro quarti — una parte uguale per ciascuno.',es:'Cuatro cocineros, cuatro cuartos — parejo para todos.',pt:'Quatro cozinheiros, quatro quartos — cada um com a sua parte.',nl:'Vier bakkers, vier kwarten — eerlijk gedeeld.',sv:'Fyra bagare, fyra fjärdedelar — precis lika mycket till alla.',da:'Fire bagere, fire fjerdedele — helt fair for alle.',no:'Fire bakere, fire firedeler — helt rettferdig.',fi:'Neljä leipuria, neljä neljäsosaa — reilusti jaettu.'} },
    { id:'st-choc3', food:'bar', n:3, friends:3, discussion:false,
      story:{en:'Three friends found one chocolate bar in the picnic basket. Just one!',de:'Drei Freunde finden im Picknickkorb eine einzige Tafel Schokolade. Nur eine!',fr:'Trois amis trouvent une seule tablette de chocolat dans le panier de pique-nique. Une seule !',it:'Tre amici trovano una sola tavoletta di cioccolato nel cestino del picnic. Una sola!',es:'Tres amigos encontraron un chocolate en la canasta del día de campo. ¡Uno solito!',pt:'Três amigos acharam uma barra de chocolate na cesta do lanche. Uma só!',nl:'Drie vrienden vinden één reep chocola in de picknickmand. Eén maar!',sv:'Tre kompisar hittar en chokladkaka i utflyktskorgen. En enda!',da:'Tre venner finder én plade chokolade i madkurven. Kun én!',no:'Tre venner fant én sjokolade i tursekken. Bare én!',fi:'Kolme ystävää löysi eväskorista yhden suklaalevyn. Vain yhden!'},
      closing:{en:'One third each — and it tasted like more.',de:'Ein Drittel für jeden — und es hat nach mehr geschmeckt.',fr:'Un tiers chacun — et c’était encore meilleur comme ça.',it:'Un terzo a testa — e sembrava ancora più buono.',es:'Un tercio para cada uno — y supo a mucho más.',pt:'Um terço para cada um — e ficou com gostinho de quero mais.',nl:'Voor ieder een derde — en het smaakte naar meer.',sv:'En tredjedel var — och den smakade ändå som mycket mer.',da:'En tredjedel til hver — og den smagte som meget mere.',no:'En tredel til hver — og den smakte som mye mer.',fi:'Kolmasosa jokaiselle — ja jaettu herkku maistui kaikkein parhaalta.'} },
    { id:'st-cake4', food:'cake', n:4, friends:4, discussion:false,
      story:{en:'Grandpa baked one sheet cake for four helpers. They all helped stir!',de:'Opa hat einen Blechkuchen für seine vier Helfer gebacken. Alle haben beim Rühren geholfen!',fr:'Papi a préparé un grand gâteau pour ses quatre petits marmitons. Tout le monde a aidé à mélanger la pâte !',it:'Il nonno ha preparato una torta per i suoi quattro aiutanti. Tutti hanno dato una mano a mescolare!',es:'El abuelo horneó un pastel para sus cuatro ayudantes. ¡Todos ayudaron a batir la mezcla!',pt:'O vovô assou um bolo para os quatro ajudantes. Todo mundo ajudou a mexer a massa!',nl:'Opa heeft één taart gebakken voor vier hulpjes. Ze hebben allemaal meegeroerd!',sv:'Morfar har bakat en kaka i långpanna till fyra små hjälpredor. Alla fick vara med och röra i smeten!',da:'Morfar har bagt en bradepandekage til sine fire hjælpere. De har alle sammen hjulpet med at røre!',no:'Bestefar har bakt en langpannekake til de fire hjelperne sine. Alle var med og rørte!',fi:'Ukki leipoi yhden ison kakun neljälle apulaiselle. Kaikki saivat sekoittaa taikinaa!'},
      closing:{en:'Every helper got a fourth. Thanks, Grandpa!',de:'Jeder Helfer bekommt ein Viertel. Danke, Opa!',fr:'Chaque marmiton a reçu un quart. Merci, Papi !',it:'Un quarto per ogni aiutante. Grazie, nonno!',es:'Cada ayudante recibió un cuarto. ¡Gracias, abuelo!',pt:'Cada ajudante ganhou um quarto. Obrigado, vovô!',nl:'Elk hulpje krijgt een kwart. Dank je wel, opa!',sv:'Var och en fick en fjärdedel. Tack, morfar!',da:'Hver hjælper fik en fjerdedel. Tak, morfar!',no:'Hver hjelper fikk en firedel. Takk, bestefar!',fi:'Jokainen apulainen sai neljäsosan. Kiitos, ukki!'} },
    { id:'st-six6', food:'pizza', n:6, friends:6, discussion:false,
      story:{en:'The whole reading club stayed for dinner — six readers, one pizza.',de:'Der ganze Leseclub bleibt zum Abendessen — sechs Leseratten, eine Pizza.',fr:'Tout le club de lecture est resté pour le dîner — six lecteurs, une seule pizza.',it:'Tutto il club di lettura si ferma per cena — sei lettori, una pizza.',es:'Todo el club de lectura se quedó a cenar — seis lectores y una sola pizza.',pt:'O clube de leitura inteiro ficou para o jantar — seis leitores, uma pizza.',nl:'De hele leesclub blijft eten — zes lezers, één pizza.',sv:'Hela bokklubben stannade kvar på middag — sex läsare, en pizza.',da:'Hele læseklubben blev til aftensmad — seks læsere og én pizza.',no:'Hele bokklubben ble til middag — seks lesere og én pizza.',fi:'Koko lukupiiri jäi päivälliselle — kuusi lukijaa ja yksi pizza.'},
      closing:{en:'Six sixths for six readers. The book was good, the pizza better.',de:'Sechs Sechstel für sechs Leseratten. Das Buch war gut, die Pizza noch besser.',fr:'Six sixièmes pour six lecteurs. Le livre était bien, la pizza encore meilleure.',it:'Sei sesti per sei lettori. Il libro era bello, la pizza ancora di più.',es:'Seis sextos para seis lectores. El libro estuvo bueno; la pizza, mejor.',pt:'Seis sextos para seis leitores. O livro estava bom, e a pizza, melhor ainda.',nl:'Zes zesden voor zes lezers. Het boek was goed, de pizza nog lekkerder.',sv:'Sex sjättedelar till sex läsare. Boken var bra — pizzan ännu bättre.',da:'Seks sjettedele til seks læsere. Bogen var god, og pizzaen var endnu bedre.',no:'Seks sjettedeler til seks lesere. Boka var god, pizzaen enda bedre.',fi:'Kuusi kuudesosaa kuudelle lukijalle. Kirja oli hyvä, pizza vielä parempi.'} },
    { id:'st-bar6', food:'bar', n:6, friends:6, discussion:false,
      story:{en:'Six little bakers each want a piece of the big chocolate bar.',de:'Sechs kleine Bäcker wollen alle ein Stück von der großen Tafel Schokolade.',fr:'Six petits pâtissiers veulent chacun un morceau de la grande tablette de chocolat.',it:'Sei piccoli pasticceri vogliono un pezzo della grande tavoletta di cioccolato.',es:'Seis pequeños reposteros quieren su parte de la barra grande de chocolate.',pt:'Seis cozinheirinhos querem um pedaço da barra de chocolate grandona.',nl:'Zes kleine bakkers willen allemaal een stukje van de grote reep chocola.',sv:'Sex små bagare vill ha var sin bit av den stora chokladkakan.',da:'Seks små bagere vil hver have et stykke af den store plade chokolade.',no:'Seks små bakere vil ha hver sin bit av den store sjokoladen.',fi:'Kuusi pientä leipuria haluaa kukin oman palan isosta suklaalevystä.'},
      closing:{en:'Six equal pieces — the baking can begin!',de:'Sechs gleich große Stücke — jetzt kann das Backen losgehen!',fr:'Six parts égales — la pâtisserie peut commencer !',it:'Sei pezzi uguali — ora si può cominciare a cucinare!',es:'Seis partes iguales — ¡a hornear se ha dicho!',pt:'Seis pedaços iguais — agora a receita pode começar!',nl:'Zes gelijke stukken — het bakken kan beginnen!',sv:'Sex lika stora bitar — nu kan bakningen börja!',da:'Seks lige store stykker — så kan bagningen begynde!',no:'Seks like store biter — nå kan bakingen begynne!',fi:'Kuusi yhtä suurta palaa — leipominen voi alkaa!'} },
    { id:'st-left3', food:'pizza', n:4, friends:3, discussion:true,
      story:{en:'Three friends find a pizza already cut into fourths. Hmm — what now?',de:'Drei Freunde finden eine Pizza, die schon in Viertel geschnitten ist. Hmm — was nun?',fr:'Trois amis trouvent une pizza déjà coupée en quarts. Hmm — et maintenant ?',it:'Tre amici trovano una pizza già tagliata in quarti. Mmm — e adesso?',es:'Tres amigos encuentran una pizza ya cortada en cuartos. Mmm — ¿y ahora?',pt:'Três amigos encontraram uma pizza já cortada em quartos. São três amigos e quatro pedaços!',nl:'Drie vrienden vinden een pizza die al in kwarten is gesneden. Hmm — wat nu?',sv:'Tre kompisar hittar en pizza som redan är skuren i fjärdedelar. Hmm — hur blir det nu?',da:'Tre venner finder en pizza, der allerede er skåret i fjerdedele. Hmm — hvad nu?',no:'Tre venner finner en pizza som allerede er delt i firedeler. Hmm — hva nå?',fi:'Kolme ystävää löytää pizzan, joka on jo leikattu neljäsosiin. Hmm — mitä nyt?'},
      closing:{en:'What should they do with the piece that is left?',de:'Was sollen sie mit dem Stück machen, das übrig bleibt?',fr:'Que vont-ils faire de la part qui reste ?',it:'Che cosa possono fare con la parte che avanza?',es:'¿Qué pueden hacer con la parte que sobra?',pt:'O que dá para fazer com o pedaço que sobrou?',nl:'Wat zouden ze kunnen doen met het stuk dat overblijft?',sv:'Vad ska de göra med biten som blir över?',da:'Hvad skal de gøre med det stykke, der er tilovers?',no:'Hva skal de gjøre med biten som er til overs?',fi:'Mitä ystävät voisivat tehdä palalle, joka jää yli?'} },
    { id:'st-short3', food:'pizza', n:2, friends:3, discussion:true,
      story:{en:'The pizza came cut in halves — but three friends came to dinner!',de:'Die Pizza kommt in Hälften geschnitten an — aber drei Freunde sitzen am Tisch!',fr:'La pizza est arrivée coupée en moitiés — mais trois amis sont venus dîner !',it:'La pizza è arrivata tagliata a metà — ma a cena sono venuti tre amici!',es:'La pizza llegó cortada en mitades — ¡pero a cenar vinieron tres amigos!',pt:'A pizza chegou cortada em metades — mas três amigos vieram para o jantar!',nl:'De pizza komt in helften uit de doos — maar er komen drie vrienden eten!',sv:'Pizzan kom skuren i halvor — men tre kompisar kom på middag!',da:'Pizzaen kom skåret i halvdele — men der kom tre venner til aftensmad!',no:'Pizzaen kom ferdig delt i halvdeler — men det kom tre venner til middag!',fi:'Pizza oli valmiiksi leikattu puolikkaiksi — mutta illalliselle tulikin kolme ystävää!'},
      closing:{en:'How could they cut it so everyone gets a fair share?',de:'Wie könnten sie die Pizza schneiden, damit jeder gleich viel bekommt?',fr:'Comment la couper pour que chacun ait une part juste ?',it:'Come potrebbero tagliarla perché ognuno abbia una parte uguale?',es:'¿Cómo podrían cortarla para que a cada uno le toque una parte justa?',pt:'Como dá para cortar a pizza de um jeito que todo mundo ganhe uma parte justa?',nl:'Hoe zouden ze de pizza kunnen snijden zodat iedereen een eerlijk stuk krijgt?',sv:'Hur skulle de kunna skära den så att alla får en rättvis del?',da:'Hvordan kunne de skære den, så alle får en fair del?',no:'Hvordan kan de dele den slik at alle får like mye?',fi:'Miten pizzan voisi leikata niin, että jokainen saa reilun osuuden?'} }
  ],

  defaults: { speakNames: true },
  settings: [
    { key: 'speakNames', type: 'toggle', labelKey: 'setSpeak' }
  ],

  STORE_KEY: 'lcs:fraction-kitchen:v1',
  ENT_TRUST_DAYS: 14,

  /* ======================= geometry (copied + extended) ============= */
  GEO: { CX: 50, CY: 50, R: 40, RX: 8, RY: 28, RR: 92, RB: 72 },
  /* menu: food → allowed n (order = chip order). Free = pizza 2/4. */
  MENU: { pizza: [2, 3, 4, 6], bar: [2, 3, 6], cake: [2, 3, 4, 8] },
  FREE_TASKS: { pizza: [2, 4] },

  _diam: function (deg) {
    var G = this.GEO, a = deg * Math.PI / 180;
    return { x1: G.CX + G.R * Math.cos(a), y1: G.CY - G.R * Math.sin(a),
             x2: G.CX - G.R * Math.cos(a), y2: G.CY + G.R * Math.sin(a) };
  },
  _radiusLn: function (deg) {
    var G = this.GEO, a = deg * Math.PI / 180;
    return { x1: G.CX, y1: G.CY, x2: G.CX + G.R * Math.cos(a), y2: G.CY - G.R * Math.sin(a) };
  },
  _chordV: function (x) {
    var G = this.GEO, off = Math.sqrt(G.R * G.R - (x - G.CX) * (x - G.CX));
    return { x1: x, y1: G.CY - off, x2: x, y2: G.CY + off };
  },
  _vLine: function (x) { var G = this.GEO; return { x1: x, y1: G.RY, x2: x, y2: G.RB }; },
  _hLine: function (y) { var G = this.GEO; return { x1: G.RX, y1: y, x2: G.RR, y2: y }; },

  /* cuts(food, n) → { correct:[seg], distractors:[seg] } — every correct
     set proven equal-area by scripts/verify-fraction-kitchen.js */
  cuts: function (food, n) {
    var G = this.GEO;
    if (food === 'pizza') {
      if (n === 2) return { correct: [this._diam(90)], distractors: [this._chordV(34)] };
      if (n === 3) return { correct: [this._radiusLn(90), this._radiusLn(210), this._radiusLn(330)], distractors: [this._radiusLn(150)] };
      if (n === 4) return { correct: [this._diam(90), this._diam(0)], distractors: [this._chordV(30)] };
      /* sixths: three diameters 60° apart → 6 exact 60° wedges */
      return { correct: [this._diam(90), this._diam(30), this._diam(150)], distractors: [this._diam(60)] };
    }
    if (food === 'bar') {
      /* lattice x = 22,36,50,64,78 — cuts land ON scores; distractors are
         RE-SNAPPED to the lattice (physically consistent, never telegraphed) */
      if (n === 2) return { correct: [this._vLine(50)], distractors: [this._vLine(36)] };
      if (n === 3) return { correct: [this._vLine(36), this._vLine(64)], distractors: [this._vLine(22)] };
      /* sixths: all 5 score lines — a completion task, no distractor */
      return { correct: [this._vLine(22), this._vLine(36), this._vLine(50), this._vLine(64), this._vLine(78)], distractors: [] };
    }
    /* cake (unscaffolded rect) */
    var h3a = G.RY + (G.RB - G.RY) / 3, h3b = G.RY + 2 * (G.RB - G.RY) / 3;
    if (n === 2) return { correct: [this._vLine(50)], distractors: [this._vLine(34)] };
    if (n === 3) return { correct: [this._hLine(h3a), this._hLine(h3b)], distractors: [this._hLine(36)] };
    if (n === 4) return { correct: [this._vLine(50), this._hLine(50)], distractors: [this._vLine(34)] };
    /* eighths: 4×2 grid — completion task */
    return { correct: [this._vLine(29), this._vLine(50), this._vLine(71), this._hLine(50)], distractors: [] };
  },

  /* piece paths for a COMPLETE correct set (wedges / strips / cells) */
  pieces: function (food, n) {
    var G = this.GEO, out = [], i;
    var P = function (deg) { var a = deg * Math.PI / 180; return (G.CX + G.R * Math.cos(a)).toFixed(2) + ' ' + (G.CY - G.R * Math.sin(a)).toFixed(2); };
    if (food === 'pizza') {
      var angles = this.PIZZA_ANGLES[n].slice().sort(function (a, b) { return a - b; });
      for (i = 0; i < angles.length; i++) {
        var a1 = angles[i], a2 = angles[(i + 1) % angles.length];
        if (a2 <= a1) a2 += 360;
        var large = (a2 - a1) > 180 ? 1 : 0;
        var mid = (a1 + a2) / 2 * Math.PI / 180;
        out.push({
          d: 'M' + G.CX + ' ' + G.CY + ' L' + P(a1) + ' A' + G.R + ' ' + G.R + ' 0 ' + large + ' 0 ' + P(a2 % 360) + ' Z',
          cx: G.CX + G.R * 0.55 * Math.cos(mid), cy: G.CY - G.R * 0.55 * Math.sin(mid)
        });
      }
      return out;
    }
    /* rect foods: vertical/horizontal cell decomposition from the cut set */
    var xs = [G.RX], ys = [G.RY];
    this.cuts(food, n).correct.forEach(function (s) {
      if (s.x1 === s.x2) xs.push(s.x1); else ys.push(s.y1);
    });
    xs.push(G.RR); ys.push(G.RB);
    xs.sort(function (a, b) { return a - b; }); ys.sort(function (a, b) { return a - b; });
    for (var yi = 0; yi < ys.length - 1; yi++) {
      for (var xi = 0; xi < xs.length - 1; xi++) {
        out.push({
          d: 'M' + xs[xi] + ' ' + ys[yi] + ' H' + xs[xi + 1] + ' V' + ys[yi + 1] + ' H' + xs[xi] + ' Z',
          cx: (xs[xi] + xs[xi + 1]) / 2, cy: (ys[yi] + ys[yi + 1]) / 2
        });
      }
    }
    return out;
  },

  /* toppings/decoration positions — every element sits ≥ r+3 units from
     EVERY candidate cut segment incl. distractors (measured by the gate;
     the chord distractors at x=30/34 exclude the pizza's left band) */
  TOPPINGS: {
    pizza: [
      { t: 'mushroom', x: 42, y: 36.1 }, { t: 'mushroom', x: 62.5, y: 71.7 },
      { t: 'olive', x: 76.1, y: 43 }, { t: 'olive', x: 67.7, y: 32.3 },
      { t: 'olive', x: 57, y: 76.1 }, { t: 'olive', x: 23.9, y: 57 }
    ],
    cake: [
      { t: 'berry', x: 18, y: 64.5 }, { t: 'berry', x: 42, y: 65 },
      { t: 'berry', x: 60, y: 64 }, { t: 'berry', x: 81, y: 65 }
    ],
    bar: []
  },

  /* equivalence tasks: tray = big piece of (food, bigN); fill with smalls */
  EQUIV: [
    { id: 'eq-p24', food: 'pizza', big: 2, small: 4, count: 2 },
    { id: 'eq-c24', food: 'cake', big: 2, small: 4, count: 2 },
    { id: 'eq-b36', food: 'bar', big: 3, small: 6, count: 2 },
    { id: 'eq-b26', food: 'bar', big: 2, small: 6, count: 3 },
    { id: 'eq-c48', food: 'cake', big: 4, small: 8, count: 2 },
    { id: 'eq-p14', food: 'pizza', big: 1, small: 4, count: 4 }
  ],

  /* =========================== lifecycle =========================== */

  init: function (api) {
    var self = this;
    this.api = api;
    this.premium = false;
    this.food = 'pizza';
    this.n = 2;
    this.mode = 'cut';           /* cut | share | equiv */
    this.friends = 2;
    this.committed = [];         /* committed correct-line indices */
    this.sliced = false;
    this.placed = [];            /* plate idx -> piece idx */
    this._sel = null;            /* tap-to-select: the piece awaiting a plate */
    this.wobbleSpoken = {};      /* food -> true (≤1 kind line per food) */
    this.equivTask = null;
    this.equivFilled = 0;
    this.equivMisses = 0;
    this.story = null;
    this._actx = null;
    this._busy = false;

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, settings: null };
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var params = new URLSearchParams(location.search);
    this._wantFood = params.get('food');
    this._wantN = parseInt(params.get('n'), 10) || null;

    this._applyDeepLink();
    this.render();
    this._fetchEntitlement();
  },
  /* STRUCTURAL free gate: free resolves only pizza 2/4 */
  _allowed: function (food, n) {
    if (this.premium) return this.MENU[food] && this.MENU[food].indexOf(n) >= 0;
    return !!(this.FREE_TASKS[food] && this.FREE_TASKS[food].indexOf(n) >= 0);
  },
  _applyDeepLink: function () {
    if (this._wantFood && this.MENU[this._wantFood] && this._allowed(this._wantFood, this._wantN || this.MENU[this._wantFood][0])) {
      this.food = this._wantFood;
      if (this._wantN && this._allowed(this._wantFood, this._wantN)) this.n = this._wantN;
      else this.n = this.MENU[this.food].filter(this._allowed.bind(this, this.food))[0] || 2;
    } else if (!this._allowed(this.food, this.n)) { this.food = 'pizza'; this.n = 2; }
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) st.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },
  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; if (self._wrap) { self._applyDeepLink(); self.render(); } }
      }
    };
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) return;
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { trustCache(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        if (self._wrap) { self._applyDeepLink(); self.render(); }
      })
      .catch(function () { trustCache(); });
  },

  /* ============================ speech + sfx ======================== */

  _loc: function (map) { return map ? (map[this.api.lang] || map.en || '') : ''; },
  _bigName: function (task) { return task.big === 1 ? this.api.t('fracWhole') : this.frac(task.big, 's'); },
  fmt: function (key, args) {
    var s = this.api.t(key);
    s = s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
    /* A template that OPENS on a slot inherits the slot's case. `cutDone`
       is "{fp}! {n} equal parts." and the fraction plurals are bare nouns,
       so nine of eleven locales spoke — and, once the word ribbon lands,
       will SHOW — a sentence starting lowercase. German is unaffected
       only because it capitalises nouns anyway. Sentence-initial capital
       is universal across all eleven scripts here. */
    if (/^\{/.test(this.api.t(key)) && /[.!?]/.test(s)) s = s.charAt(0).toUpperCase() + s.slice(1);
    return s;
  },
  frac: function (den, form) { return this._loc(this.FRAC[den][form]); },
  _speak: function (text) {
    if (!this.api.settings.speakNames) { this.api.announce(text); return; }
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.92 }); } catch (_) {}
    this.api.announce(text);
  },
  _ctx: function () {
    if (this._actx === null) {
      try { var AC = window.AudioContext || window.webkitAudioContext; this._actx = AC ? new AC() : false; } catch (_) { this._actx = false; }
    }
    if (this._actx && this._actx.state === 'suspended') { try { this._actx.resume(); } catch (_) {} }
    return this._actx;
  },
  /* sine-only note builder (class-timer pattern) — no other waveform exists */
  _note: function (freq, at, dur, peak) {
    var ctx = this._ctx();
    if (!ctx) return;
    var t = ctx.currentTime + (at || 0);
    var osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak || 0.15, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.3));
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + (dur || 0.3) + 0.05);
  },
  _sfxSlice: function () { this._note(1318.5, 0, 0.07, 0.12); this._note(880, 0.03, 0.06, 0.08); this._note(196, 0.07, 0.18, 0.20); },
  _sfxWobble: function () { this._note(329.63, 0, 0.4, 0.10); this._note(293.66, 0.18, 0.4, 0.10); },
  _sfxPlate: function () { this._note(523.25, 0, 0.25, 0.12); },
  _sfxFit: function () { this._note(523.25, 0, 0.9, 0.12); this._note(659.25, 0.05, 0.9, 0.12); },

  /* ============================ food art ============================ */

  _toppingSVG: function (tp) {
    if (tp.t === 'mushroom') return '<circle cx="' + tp.x + '" cy="' + tp.y + '" r="4" fill="#EAD9C0" stroke="#C9B18A" stroke-width="0.8"/><circle cx="' + (tp.x - 1.2) + '" cy="' + (tp.y - 0.8) + '" r="1" fill="#DCC7A6"/>';
    if (tp.t === 'olive') return '<circle cx="' + tp.x + '" cy="' + tp.y + '" r="2.5" fill="#4A3B52"/><circle cx="' + tp.x + '" cy="' + tp.y + '" r="0.9" fill="#6B5A78"/>';
    if (tp.t === 'basil') return '<ellipse cx="' + tp.x + '" cy="' + tp.y + '" rx="5" ry="3" fill="#6FA886" stroke="#4E8A5C" stroke-width="0.7" transform="rotate(' + (tp.r || 0) + ' ' + tp.x + ' ' + tp.y + ')"/>';
    /* berry */
    return '<circle cx="' + tp.x + '" cy="' + tp.y + '" r="3" fill="#8A5FA0"/><circle cx="' + (tp.x - 0.9) + '" cy="' + (tp.y - 1) + '" r="0.8" fill="#B58BC9"/>';
  },
  _bodySVG: function (food) {
    var G = this.GEO, s = '', i;
    if (food === 'pizza') {
      s += '<circle cx="50" cy="50" r="40" fill="#D9A05B" stroke="#B97F3F" stroke-width="2.5"/>';
      /* 4 crust dots at cut-clear angles only (gate-measured) */
      [22, 70, 292, 340].forEach(function (deg) {
        var fa = deg * Math.PI / 180;
        s += '<circle cx="' + (50 + 36.6 * Math.cos(fa)).toFixed(1) + '" cy="' + (50 - 36.6 * Math.sin(fa)).toFixed(1) + '" r="1.2" fill="#C58A4E"/>';
      });
      s += '<circle cx="50" cy="50" r="33.5" fill="#F5D272"/>';
    } else if (food === 'bar') {
      s += '<rect x="8" y="28" width="84" height="44" rx="3" fill="#7A4A2B" stroke="#4E2E1B" stroke-width="2.5"/>';
      /* 6×2 molded lattice — scores at x 22/36/50/64/78, y 50 */
      for (var cx0 = 0; cx0 < 6; cx0++) {
        for (var cy0 = 0; cy0 < 2; cy0++) {
          var bx = 8 + cx0 * 14 + 1.8, by = 28 + cy0 * 22 + 1.8;
          s += '<rect x="' + bx + '" y="' + by + '" width="10.4" height="18.4" rx="1.5" fill="#8A5636"/>';
          s += '<path d="M' + bx + ' ' + (by + 2) + ' L' + bx + ' ' + by + ' L' + (bx + 2) + ' ' + by + '" fill="none" stroke="#9A6440" stroke-width="1" opacity="0.45"/>';
        }
      }
      [22, 36, 50, 64, 78].forEach(function (x) { s += '<line x1="' + x + '" y1="28" x2="' + x + '" y2="72" stroke="#5C3620" stroke-width="1.4"/>'; });
      s += '<line x1="8" y1="50" x2="92" y2="50" stroke="#5C3620" stroke-width="1.4"/>';
    } else {
      s += '<rect x="8" y="28" width="84" height="44" rx="4" fill="#F7D9A0" stroke="#C99B62" stroke-width="2.5"/>';
      s += '<rect x="12" y="32" width="76" height="36" rx="3" fill="none" stroke="#E8B45F" stroke-width="2.2" stroke-dasharray="0.1 5" stroke-linecap="round"/>';
    }
    (this.TOPPINGS[food] || []).forEach(function (tp) { s += this._toppingSVG(tp); }, this);
    return s;
  },
  _edgeTint: { pizza: '#F9E09A', bar: '#8A5636', cake: '#E8C79A' },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('frk-wide');

    var wrap = api.el('div', 'frk-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    /* board zone */
    var zone = api.el('div', 'frk-boardzone');
    zone.innerHTML = '<div class="frk-counter"></div>';
    var board = api.el('div', 'frk-board');
    board.innerHTML = '<div class="frk-hole"></div>';
    /* THREE layers, and the split is load-bearing:
         .frk-foodbox   the classList target (guides-on / exploded / unequal)
         .frk-foodsvg   the ONLY innerHTML target — so a repaint cannot
                        destroy the pointer targets mid-gesture
         .frk-hitlayer  real <button>s, because a bare SVG shape is not
                        focusable, cannot hold a 44px floor, and is
                        invisible to audit-tool-control-liveness */
    var foodBox = api.el('div', 'frk-foodbox');
    var foodSvg = api.el('div', 'frk-foodsvg');
    foodSvg.innerHTML = this._foodSVG();
    var hits = api.el('div', 'frk-hitlayer');
    foodBox.append(foodSvg, hits);
    board.appendChild(foodBox);
    zone.appendChild(board);
    this._foodBoxEl = foodBox;
    this._foodSvgEl = foodSvg;
    this._hitsEl = hits;
    var rest = api.el('div', 'frk-knife-rest');
    rest.innerHTML = '<button type="button" class="frk-knife-btn"></button>';
    this._knifeBtn = rest.querySelector('.frk-knife-btn');
    this._knifeBtn.innerHTML = this._knifeSVG();
    this._knifeBtn.setAttribute('aria-label', this.fmt('cutPrompt', {
      food: this._loc(this.strings['food' + this.food.charAt(0).toUpperCase() + this.food.slice(1)]),
      n: this.n, fp: this.frac(this.n, 'p')
    }));
    zone.appendChild(rest);
    this._knifeEl = rest.querySelector('.frk-knife');
    wrap.appendChild(zone);
    this._paintHits();
    this._wireKnife();
    this._wireBoard();

    /* plates / trays */
    if (this.mode === 'share') wrap.appendChild(this._platesRow());
    if (this.mode === 'equiv') wrap.appendChild(this._traysRow());

    wrap.appendChild(this._dock());
  },

  _foodSVG: function () {
    var cuts = this.cuts(this.food, this.n);
    var s = '<svg class="frk-food" viewBox="0 0 100 100" aria-hidden="true">';
    if (!this.sliced) {
      s += '<g class="frk-body">' + this._bodySVG(this.food) + '</g>';
      /* guides: correct + distractors styled IDENTICALLY (no telegraphing) */
      var addGuide = function (seg, kind, idx, committed) {
        s += '<line class="frk-guide' + (committed ? ' cutline' : '') + '" data-kind="' + kind + '" data-idx="' + idx + '"' +
          ' x1="' + seg.x1 + '" y1="' + seg.y1 + '" x2="' + seg.x2 + '" y2="' + seg.y2 + '"/>';
      };
      var self = this;
      cuts.correct.forEach(function (seg, i) { addGuide(seg, 'c', i, self.committed.indexOf(i) >= 0); });
      cuts.distractors.forEach(function (seg, i) { addGuide(seg, 'd', i, false); });
      s += '<line class="frk-score" x1="-20" y1="-20" x2="-20" y2="-20"/>';
    } else {
      /* sliced: pieces as clipped copies, exploded along centroid vectors */
      var pieces = this.pieces(this.food, this.n);
      var body = this._bodySVG(this.food);
      var G = this.GEO;
      var edge = this._edgeTint[this.food];
      pieces.forEach(function (p, i) {
        var dx = (p.cx - G.CX), dy = (p.cy - G.CY);
        var len = Math.hypot(dx, dy) || 1;
        var ex = (dx / len * 2.5).toFixed(2), ey = (dy / len * 2.5).toFixed(2);
        var placedIdx = this.placed.indexOf(i);
        s += '<g class="frk-piece' + (placedIdx >= 0 ? ' onplate' : '') + '" data-piece="' + i + '" style="--ex:' + ex + 'px;--ey:' + ey + 'px">' +
          '<clipPath id="frkp' + i + '"><path d="' + p.d + '"/></clipPath>' +
          '<g clip-path="url(#frkp' + i + ')">' + body + '</g>' +
          '<path d="' + p.d + '" fill="none" stroke="' + edge + '" stroke-width="1.6"/>' +
          '</g>';
      }, this);
    }
    s += '</svg>';
    return s;
  },

  _knifeSVG: function () {
    return '<svg class="frk-knife" viewBox="0 0 150 48" aria-hidden="true">' +
      '<path d="M4 24 Q4 12 20 10 L96 10 L96 34 L20 36 Q4 34 4 24 Z" fill="#DCE4E2" stroke="#B9C6C2" stroke-width="2"/>' +
      '<path d="M8 20 Q20 14 90 13" fill="none" stroke="#F4F7F6" stroke-width="2.5" stroke-linecap="round"/>' +
      '<rect x="94" y="8" width="8" height="30" rx="3" fill="#A9814F"/>' +
      '<rect x="100" y="9" width="46" height="28" rx="12" fill="#C99B62" stroke="#A9814F" stroke-width="2"/>' +
      '<circle cx="114" cy="23" r="2.2" fill="#8B6F47"/><circle cx="132" cy="23" r="2.2" fill="#8B6F47"/>' +
      '</svg>';
  },

  /* ===================== the hit overlay ============================
     Percentage positioning over the food is EXACT only while
     .frk-foodbox is square — viewBox units then map isotropically to
     px in both axes. verify-fraction-kitchen §8d asserts it, because a
     one-sided clamp would skew every target silently. */

  _paintHits: function () {
    var self = this, hits = this._hitsEl;
    if (!hits) return;
    hits.innerHTML = '';
    if (this.sliced) {
      this.pieces(this.food, this.n).forEach(function (p, i) {
        var b = self._pieceBtn(p, i);
        hits.appendChild(b);
        self._wirePiece(b);
      });
      return;
    }
    var cuts = this.cuts(this.food, this.n);
    var list = [];
    cuts.correct.forEach(function (seg, i) { if (self.committed.indexOf(i) < 0) list.push({ seg: seg, kind: 'c', idx: i }); });
    cuts.distractors.forEach(function (seg, i) { list.push({ seg: seg, kind: 'd', idx: i }); });
    /* ⚠ DOM order must not reveal which one is the decoy. The visual
       lock (pixel-identical strokes) is worthless if tab order sorts
       correct-then-distractor, which is exactly what emission order
       does. Shuffle deterministically per (food,n) so a gate can
       reproduce it and a child cannot learn it. */
    this._shuffleStable(list, this.food + ':' + this.n);
    list.forEach(function (c) { hits.appendChild(self._cutBtn(c.seg, c.kind, c.idx)); });
  },

  /* deterministic order-only shuffle — same board, same order, all session */
  _shuffleStable: function (arr, seedStr) {
    var h = 2166136261;
    for (var k = 0; k < seedStr.length; k++) { h ^= seedStr.charCodeAt(k); h = (h * 16777619) >>> 0; }
    for (var i = arr.length - 1; i > 0; i--) {
      h = (h * 1664525 + 1013904223) >>> 0;
      var j = h % (i + 1);
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  },

  _cutBtn: function (seg, kind, idx) {
    var b = this.api.el('button', 'frk-cutbtn');
    b.type = 'button';
    b.dataset.kind = kind; b.dataset.idx = idx;
    /* ⚠ IDENTICAL for correct and distractor. A label that distinguished
       them would telegraph to a screen reader precisely what the
       pixel-identical stroke refuses to telegraph to the eye. */
    b.setAttribute('aria-label', this.frac(this.n, 'p'));
    var dx = seg.x2 - seg.x1, dy = seg.y2 - seg.y1;
    var len = Math.hypot(dx, dy);
    b.style.left = ((seg.x1 + seg.x2) / 2) + '%';
    b.style.top = ((seg.y1 + seg.y2) / 2) + '%';
    b.style.width = len + '%';
    b.style.transform = 'translate(-50%,-50%) rotate(' + (Math.atan2(dy, dx) * 180 / Math.PI).toFixed(2) + 'deg)';
    return b;
  },

  /* a piece target is a disc on the piece's CENTROID, not its bbox —
     wedge bboxes overlap heavily and would make the neighbour grabbable */
  _pieceBtn: function (p, i) {
    var b = this.api.el('button', 'frk-piecebtn');
    b.type = 'button';
    b.dataset.piece = i;
    b.setAttribute('aria-label', this.fmt('pieceName', { fs: this.frac(this.n, 's') }));
    var d = this._pieceGap(this.food, this.n);
    b.style.left = p.cx + '%'; b.style.top = p.cy + '%';
    b.style.width = d + '%'; b.style.height = d + '%';
    var vx = (p.cx - this.GEO.CX), vy = (p.cy - this.GEO.CY);
    var len = Math.hypot(vx, vy) || 1;
    b.style.setProperty('--ex', (vx / len * 2.5).toFixed(2) + 'px');
    b.style.setProperty('--ey', (vy / len * 2.5).toFixed(2) + 'px');
    if (this.placed.indexOf(i) >= 0) b.classList.add('onplate');
    if (this._sel === i) { b.classList.add('selected'); b.setAttribute('aria-pressed', 'true'); }
    else if (this.mode === 'share') b.setAttribute('aria-pressed', 'false');
    return b;
  },
  /* diameter, in viewBox units, that provably cannot reach a neighbour */
  _pieceGap: function (food, n) {
    var ps = this.pieces(food, n), min = Infinity;
    for (var i = 0; i < ps.length; i++) {
      for (var j = i + 1; j < ps.length; j++) {
        min = Math.min(min, Math.hypot(ps[i].cx - ps[j].cx, ps[i].cy - ps[j].cy));
      }
    }
    if (!isFinite(min)) min = 40;
    return Math.max(12, Math.min(30, min * 0.92));
  },

  /* ===================== the drag primitive =========================
     The house "#40 pattern", file-local. LCS.drag.linear is x-only,
     element-bound and re-reads the rect every move — three separate
     disqualifications, and comparison-planks / cold-line / unit-handle
     each record why they could not use it either.

     ⚠ Moves go on WINDOW, not the element. Every surface here re-renders
     during or after its gesture, and removing a captured element from
     the document releases pointer capture with it. Hence no
     setPointerCapture anywhere.
     ⚠ The rect is snapshotted ONCE, in pointerdown. Re-reading it after a
     repaint is what made unit-handle's grip follow the finger for one
     frame and then stick. */
  _grab: function (btn, opts) {
    var self = this;
    btn.style.touchAction = 'none';
    var drag = null, suppressClick = false;
    var move = function (e) {
      if (!drag) return;
      if (!drag.moved) {
        var slop = opts.slop == null ? 8 : opts.slop;
        if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < slop) return;
        drag.moved = true;
        if (opts.onFirstMove) opts.onFirstMove(drag, e);
      }
      if (opts.onMove) opts.onMove(drag, e);
      e.preventDefault();
    };
    var up = function (e) {
      if (!drag) return;
      var d = drag; drag = null;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      suppressClick = d.moved;
      if (opts.onEnd) opts.onEnd(d, e);
    };
    btn.addEventListener('dragstart', function (e) { e.preventDefault(); });
    btn.addEventListener('pointerdown', function (e) {
      if (!e.isPrimary) return;
      if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
      if (opts.enabled && !opts.enabled()) return;
      e.preventDefault();
      /* preventDefault suppresses the focus that pointerdown would have
         given us, and a control nobody can focus is a control nobody can
         reach by keyboard */
      try { btn.focus({ preventScroll: true }); } catch (_) { try { btn.focus(); } catch (__) {} }
      var ref = opts.ref && opts.ref();
      var rect = ref ? ref.getBoundingClientRect() : null;
      drag = { rect: rect, x0: e.clientX, y0: e.clientY, moved: false };
      if (opts.onStart) opts.onStart(drag, e);
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    });
    /* a drag that MOVED suppresses the click it would otherwise fire;
       a drag that did not is a tap, and taps are how touch and keyboard
       both reach this control */
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (suppressClick) { suppressClick = false; return; }
      if (opts.onTap) opts.onTap(e);
    });
  },

  /* ======================== the knife engine ======================== */

  _wireKnife: function () {
    var self = this, btn = this._knifeBtn;
    if (!btn) return;
    if (this.sliced) { btn.classList.add('done'); return; }
    this._grab(btn, {
      slop: 0,
      ref: function () { return self._foodSvgEl; },
      enabled: function () { return !self._busy && !self.sliced; },
      onStart: function (d, e) {
        d.cut = { key: null, seg: null, progress: 0, fromStart: null };
        self._foodBoxEl.classList.add('guides-on');
        btn.classList.add('lifted');
        self._moveKnife(e);
      },
      onMove: function (d, e) { self._knifeMove(d, e); },
      onEnd: function (d) { self._endKnife(d.cut); },
      /* tap / Enter / Space: pick the knife up and hand the keyboard the
         first candidate. A drag-only control is dead to a keyboard, dead
         to assistive tech, and dead to the liveness gate. */
      onTap: function () {
        if (self._busy || self.sliced) return;
        self._foodBoxEl.classList.add('guides-on');
        var first = self._hitsEl && self._hitsEl.querySelector('.frk-cutbtn');
        if (first) { try { first.focus(); } catch (_) {} }
      }
    });
  },

  /* one continuous stroke cuts the WHOLE cross: committing no longer
     tears the gesture down, because nothing under the finger is replaced */
  _knifeMove: function (d, e) {
    if (this._busy || this.sliced) return;
    this._moveKnife(e);
    var c = d.cut;
    var pt = this._toFood(e.clientX, e.clientY, d.rect);
    if (!pt) { this._disengage(c); return; }
    var hit = this._nearestGuide(pt, c.key);
    if (!hit) { this._disengage(c); return; }
    if (c.key !== hit.key) {
      this._disengage(c);
      c.key = hit.key; c.kind = hit.kind; c.idx = hit.idx; c.seg = hit.seg;
      c.progress = 0; c.fromStart = null;
      var g = this._guideFor(hit.kind, hit.idx);
      if (g) g.classList.add('engaged');
    }
    /* progress along the segment (monotonic max from the entry end) */
    var t = this._projT(pt, c.seg);
    if (c.fromStart == null) c.fromStart = t < 0.5;
    var prog = c.fromStart ? t : 1 - t;
    c.progress = Math.max(c.progress, Math.min(1, prog));
    this._paintScore(c);
    if (c.progress >= 0.8) {
      var kind = c.kind, idx = c.idx;
      this._disengage(c);
      this._commit(kind, idx);
      if (this.sliced || this._busy) this._endKnife(c);
    }
  },

  /* the board's tap + keyboard path. DELEGATED and bound ONCE — the
     overlay's children are replaced whenever the hit set changes, and a
     per-element listener would have to be re-attached every time (which
     is how _wireKnife came to be called from three places and leak a
     handler quadruple per cut). */
  _wireBoard: function () {
    var self = this;
    this._hitsEl.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.frk-cutbtn');
      if (!b || self._busy || self.sliced) return;
      self._commit(b.dataset.kind, Number(b.dataset.idx));
    });
  },

  _moveKnife: function (e) {
    var k = this._knifeEl;
    if (!k) return;
    k.style.position = 'fixed';
    k.style.left = (e.clientX - 46) + 'px';
    k.style.top = (e.clientY - 30) + 'px';
  },
  _endKnife: function (cut) {
    this._disengage(cut);
    this._foodBoxEl.classList.remove('guides-on');
    var b = this._knifeBtn, k = this._knifeEl;
    if (b) b.classList.remove('lifted');
    if (k) { k.style.position = ''; k.style.left = ''; k.style.top = ''; }
  },
  _disengage: function (cut) {
    (this._foodSvgEl.querySelectorAll('.frk-guide.engaged') || []).forEach(function (g) { g.classList.remove('engaged'); });
    if (cut) { cut.key = null; cut.seg = null; cut.progress = 0; cut.fromStart = null; }
    var sc = this._foodSvgEl.querySelector('.frk-score');
    if (sc) { sc.style.visibility = 'hidden'; sc.setAttribute('x1', -20); sc.setAttribute('y1', -20); sc.setAttribute('x2', -20); sc.setAttribute('y2', -20); }
  },
  /* rect is the ONE snapshot taken at pointerdown — never re-measured */
  _toFood: function (cx, cy, rect) {
    var r = rect || (this._foodSvgEl && this._foodSvgEl.getBoundingClientRect());
    if (!r || !r.width) return null;
    if (cx < r.left - 40 || cx > r.right + 40 || cy < r.top - 40 || cy > r.bottom + 40) return null;
    return { x: (cx - r.left) / r.width * 100, y: (cy - r.top) / r.height * 100 };
  },
  /* reads the MODEL, not the DOM — so a repaint cannot change the answer */
  _nearestGuide: function (pt, currentKey) {
    var corridor = 9;   /* viewBox units ≈ 26px at S≈3 */
    var best = null, bestD = corridor + (currentKey ? 3 : 0);
    var self = this, cuts = this.cuts(this.food, this.n);
    var consider = function (seg, kind, idx) {
      if (kind === 'c' && self.committed.indexOf(idx) >= 0) return;
      var d = self._distToSeg(pt, seg);
      if (d < bestD) { bestD = d; best = { key: kind + idx, kind: kind, idx: idx, seg: seg }; }
    };
    cuts.correct.forEach(function (s, i) { consider(s, 'c', i); });
    cuts.distractors.forEach(function (s, i) { consider(s, 'd', i); });
    return best;
  },
  _guideFor: function (kind, idx) {
    return this._foodSvgEl.querySelector('.frk-guide[data-kind="' + kind + '"][data-idx="' + idx + '"]');
  },
  _distToSeg: function (p, s) {
    var dx = s.x2 - s.x1, dy = s.y2 - s.y1;
    var t = Math.max(0, Math.min(1, ((p.x - s.x1) * dx + (p.y - s.y1) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(p.x - (s.x1 + t * dx), p.y - (s.y1 + t * dy));
  },
  _projT: function (p, s) {
    var dx = s.x2 - s.x1, dy = s.y2 - s.y1;
    return Math.max(0, Math.min(1, ((p.x - s.x1) * dx + (p.y - s.y1) * dy) / (dx * dx + dy * dy)));
  },
  _paintScore: function (drag) {
    var sc = this._foodSvgEl.querySelector('.frk-score');
    if (!sc || !drag.seg) return;
    var s = drag.seg, t = drag.progress;
    var fx = drag.fromStart ? s.x1 : s.x2, fy = drag.fromStart ? s.y1 : s.y2;
    var tx = drag.fromStart ? s.x1 + (s.x2 - s.x1) * t : s.x2 + (s.x1 - s.x2) * t;
    var ty = drag.fromStart ? s.y1 + (s.y2 - s.y1) * t : s.y2 + (s.y1 - s.y2) * t;
    sc.setAttribute('x1', fx); sc.setAttribute('y1', fy);
    sc.setAttribute('x2', tx); sc.setAttribute('y2', ty);
    sc.style.visibility = 'visible';
  },

  _commit: function (kind, idx) {
    var self = this;
    if (this._busy || this.sliced) return;
    if (kind === 'c') {
      if (this.committed.indexOf(idx) >= 0) return;
      this.committed.push(idx);
      this._sfxSlice();
      var total = this.cuts(this.food, this.n).correct.length;
      /* SURGICAL. The old code rebuilt the whole food here and re-wired
         the knife, which (a) destroyed the node the gesture was running
         on, so a cross needed two separate press-drag-releases, and (b)
         stacked another handler quadruple on the knife every cut. One
         class and one removed button is the entire visual delta. */
      this._markCut(idx);
      if (this.committed.length === total) {
        this.sliced = true;
        this._paintFood();            /* full rebuild — the gesture is over by definition */
        requestAnimationFrame(function () { self._foodBoxEl.classList.add('exploded'); });
        this._speak(this.fmt('cutDone', { n: this.n, fp: this.frac(this.n, 'p') }));
        if (this._knifeBtn) this._knifeBtn.classList.add('done');
        this._refreshDock();
      }
      return;
    }
    /* DISTRACTOR: the unequal-beat — physics, never a verdict */
    this._busy = true;
    this._sfxWobble();
    var seg = this.cuts(this.food, this.n).distractors[idx];
    var box = this._foodBoxEl;
    box.classList.add('unequal');
    /* split visual: clip the body along the distractor into 2 unequal groups */
    this._foodSvgEl.innerHTML = this._unequalSVG(seg);
    this._hitsEl.style.visibility = 'hidden';
    var say = !this.wobbleSpoken[this.food];
    if (say) {
      this.wobbleSpoken[this.food] = true;
      setTimeout(function () { self._speak(self.api.t('wobbleLine')); }, 450);
    }
    setTimeout(function () { box.classList.add('seesaw'); }, 220);
    setTimeout(function () { box.classList.remove('seesaw'); box.classList.add('healing'); }, 920);
    setTimeout(function () {
      box.classList.remove('unequal', 'healing');
      self._paintFood();
      self._hitsEl.style.visibility = '';
      self._busy = false;
    }, 1640);
  },
  /* the whole visual delta of a non-final cut */
  _markCut: function (idx) {
    var g = this._guideFor('c', idx);
    if (g) { g.classList.add('cutline'); g.classList.remove('engaged'); }
    var b = this._hitsEl && this._hitsEl.querySelector('.frk-cutbtn[data-kind="c"][data-idx="' + idx + '"]');
    if (b) b.remove();
  },
  /* a FULL repaint — only ever called when no gesture is in flight */
  _paintFood: function () {
    this._foodSvgEl.innerHTML = this._foodSVG();
    this._paintHits();
  },
  _unequalSVG: function (seg) {
    /* two half-plane clips along the distractor segment's infinite line */
    var body = this._bodySVG(this.food);
    var G = this.GEO;
    var big = 200;
    var dx = seg.x2 - seg.x1, dy = seg.y2 - seg.y1;
    var len = Math.hypot(dx, dy) || 1;
    var nx = -dy / len, ny = dx / len;
    var mk = function (sign) {
      var ox = nx * big * sign, oy = ny * big * sign;
      return 'M' + (seg.x1 - dx * 2) + ' ' + (seg.y1 - dy * 2) +
        ' L' + (seg.x2 + dx * 2) + ' ' + (seg.y2 + dy * 2) +
        ' L' + (seg.x2 + dx * 2 + ox) + ' ' + (seg.y2 + dy * 2 + oy) +
        ' L' + (seg.x1 - dx * 2 + ox) + ' ' + (seg.y1 - dy * 2 + oy) + ' Z';
    };
    var s = '<svg class="frk-food" viewBox="0 0 100 100" aria-hidden="true">';
    [1, -1].forEach(function (sign, i) {
      s += '<g class="frk-uneq frk-uneq' + i + '" style="--ux:' + (nx * 2.5 * sign).toFixed(2) + 'px;--uy:' + (ny * 2.5 * sign).toFixed(2) + 'px">' +
        '<clipPath id="frku' + i + '"><path d="' + mk(sign) + '"/></clipPath>' +
        '<g clip-path="url(#frku' + i + ')">' + body + '</g></g>';
    });
    s += '</svg>';
    return s;
  },

  /* un-cut: tapping a committed line un-commits ("changed my mind") */
  /* (available pre-slice via the committed line's hit stroke click) */

  /* ========================= pieces + share ========================= */

  /* SHARE ONLY — the tray station draws from its own supply row, and the
     task's food is independent of the board's, so a board piece has no
     meaning in the tray. This branch used to admit 'equiv' and call a
     _dropOnTray() that was never written. */
  _wirePiece: function (btn) {
    var self = this, i = Number(btn.dataset.piece);
    this._grab(btn, {
      ref: function () { return self._wrap; },
      slop: 10,
      enabled: function () { return self.mode === 'share' && self.placed.indexOf(i) < 0; },
      onStart: function (d) { d.targets = self._targets(); },
      onFirstMove: function (d) {
        d.fly = self._makePieceFly(i);
        document.body.appendChild(d.fly);
        btn.classList.add('dragging');
        if (self.api.settings.speakNames) self._speak(self.fmt('pieceName', { fs: self.frac(self.n, 's') }));
      },
      onMove: function (d, e) {
        if (!d.fly) return;
        d.fly.style.left = (e.clientX - 45) + 'px';
        d.fly.style.top = (e.clientY - 45) + 'px';
        self._hotTarget(e.clientX, e.clientY, d.targets);
      },
      onEnd: function (d, e) {
        if (d.fly) { d.fly.remove(); d.fly = null; }
        btn.classList.remove('dragging');
        self._clearHot();
        if (!d.moved) return;                     /* a tap — the click handler owns it */
        self._dropOnPlate(i, e.clientX, e.clientY, d.targets);
      },
      onTap: function () { self._tapPiece(i); }
    });
  },
  /* tap-to-select, then tap a plate. The touch and keyboard path — a
     drag is never the only way to move a piece. */
  _tapPiece: function (i) {
    if (this.mode !== 'share') {
      if (this.api.settings.speakNames) this._speak(this.fmt('pieceName', { fs: this.frac(this.n, 's') }));
      return;
    }
    if (this.placed.indexOf(i) >= 0) return;
    this._sel = (this._sel === i) ? null : i;
    this._paintSel();
    if (this._sel === i) this._speak(this.fmt('pieceName', { fs: this.frac(this.n, 's') }));
  },
  _paintSel: function () {
    var self = this;
    (this._hitsEl.querySelectorAll('.frk-piecebtn') || []).forEach(function (b) {
      var on = Number(b.dataset.piece) === self._sel;
      b.classList.toggle('selected', on);
      if (self.mode === 'share') b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  },
  /* a plate is never a dead control: with a selection it takes that
     piece, without one it takes the first piece still on the board */
  _tapPlate: function (plateEl) {
    if (this.mode !== 'share') return;
    var idx = this._sel;
    if (idx == null) {
      var ps = this.pieces(this.food, this.n);
      for (var k = 0; k < ps.length; k++) if (this.placed.indexOf(k) < 0) { idx = k; break; }
    }
    if (idx == null) return;
    var r = plateEl.getBoundingClientRect();
    this._sel = null;
    this._dropOnPlate(idx, r.left + r.width / 2, r.top + r.height / 2,
      [{ el: plateEl, l: r.left, t: r.top, r: r.right, b: r.bottom }]);
    this._paintSel();
  },
  /* target rects, snapshotted ONCE at drag start — re-measuring every
     move is what made the old code re-layout on each pointermove */
  _targets: function () {
    var sel = this.mode === 'share' ? '.frk-plate' : '.frk-tray.fill';
    var out = [];
    (this._wrap.querySelectorAll(sel) || []).forEach(function (el) {
      var r = el.getBoundingClientRect();
      out.push({ el: el, l: r.left, t: r.top, r: r.right, b: r.bottom });
    });
    return out;
  },
  _makePieceFly: function (pieceIdx) {
    var p = this.pieces(this.food, this.n)[pieceIdx];
    var fly = document.createElement('div');
    fly.className = 'frk-fly';
    fly.innerHTML = '<svg viewBox="' + this._bboxAttr(this.food, this.n, pieceIdx) + '" width="90" height="90">' +
      '<clipPath id="frkfly"><path d="' + p.d + '"/></clipPath>' +
      '<g clip-path="url(#frkfly)">' + this._bodySVG(this.food) + '</g>' +
      '<path d="' + p.d + '" fill="none" stroke="' + this._edgeTint[this.food] + '" stroke-width="1.6"/></svg>';
    return fly;
  },
  _inTarget: function (t, x, y) {
    return x >= t.l - 16 && x <= t.r + 16 && y >= t.t - 24 && y <= t.b + 24;
  },
  _hotTarget: function (x, y, targets) {
    this._clearHot();
    targets = targets || this._targets();
    for (var i = 0; i < targets.length; i++) {
      if (this._inTarget(targets[i], x, y)) { targets[i].el.classList.add('hot'); return; }
    }
  },
  _clearHot: function () {
    (this._wrap.querySelectorAll('.hot') || []).forEach(function (el) { el.classList.remove('hot'); });
  },

  _platesRow: function () {
    var api = this.api, self = this;
    var row = api.el('div', 'frk-plates');
    var TONES = [['#F5D0A9', '#7A4E2E'], ['#E0A878', '#2A2A35'], ['#B87A50', '#4A3B2A'], ['#8D5A3B', '#2A2A35'], ['#F5D0A9', '#C7833B'], ['#E0A878', '#4A3B2A']];
    for (var i = 0; i < this.friends; i++) {
      var cell = api.el('div', 'frk-platecell');
      var tone = TONES[i % TONES.length];
      cell.innerHTML = '<svg class="frk-face" viewBox="0 0 44 44" aria-hidden="true">' +
        '<circle cx="22" cy="25" r="15" fill="' + tone[0] + '" stroke="rgba(74,59,42,.35)" stroke-width="1.5"/>' +
        '<path d="M7 21 Q22 -2 37 21 Q33 12 22 12 Q11 12 7 21 Z" fill="' + tone[1] + '"/>' +
        '<circle cx="16" cy="24" r="2" fill="#2A2A35"/><circle cx="28" cy="24" r="2" fill="#2A2A35"/>' +
        '<path d="M16.5 30 q5.5 4.5 11 0" stroke="#7A4E2E" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '</svg>';
      var plate = api.el('button', 'frk-plate');
      plate.type = 'button';
      plate.dataset.plate = i;
      plate.setAttribute('aria-label', api.t('friendsLbl') + ' ' + (i + 1));
      plate.addEventListener('click', function () { self._tapPlate(this); });
      cell.appendChild(plate);
      row.appendChild(cell);
    }
    this._platesEl = row;
    return row;
  },
  _dropOnPlate: function (pieceIdx, x, y, targets) {
    var self = this;
    targets = targets || this._targets();
    for (var k = 0; k < targets.length; k++) {
      if (this._inTarget(targets[k], x, y)) {
        var plate = targets[k].el, i = Number(plate.dataset.plate);
        if (plate.querySelector('svg')) return;   /* one slice per plate — extra slides back (render no-op) */
        var p = this.pieces(this.food, this.n)[pieceIdx];
        plate.innerHTML = '<svg viewBox="' + this._bboxAttr(this.food, this.n, pieceIdx) + '" class="frk-plateslice">' +
          '<clipPath id="frkpl' + i + '"><path d="' + p.d + '"/></clipPath>' +
          '<g clip-path="url(#frkpl' + i + ')">' + this._bodySVG(this.food) + '</g></svg>';
        this.placed.push(pieceIdx);
        if (this._sel === pieceIdx) { this._sel = null; this._paintSel(); }
        var pieceEl = this._hitsEl.querySelector('.frk-piecebtn[data-piece="' + pieceIdx + '"]');
        if (pieceEl) pieceEl.classList.add('onplate');
        var pieceGfx = this._foodSvgEl.querySelector('.frk-piece[data-piece="' + pieceIdx + '"]');
        if (pieceGfx) pieceGfx.classList.add('onplate');
        var face = plate.parentNode.querySelector('.frk-face');
        if (face) { face.classList.add('bounce'); setTimeout(function () { face.classList.remove('bounce'); }, 300); }
        this._sfxPlate();
        this._checkShare();
        return;
      }
    }
  },
  _checkShare: function () {
    var total = this.pieces(this.food, this.n).length;
    var filled = this.placed.length;
    var self = this;
    if (filled === Math.min(this.friends, total)) {
      var leftover = total - this.friends;
      setTimeout(function () {
        if (leftover > 0) {
          /* a DISCUSSION moment: observe, then WAIT */
          self._speak(self.api.t('shareLeftover'));
        } else if (leftover < 0) {
          self._speak(self.fmt('shareEmpty', { p: total, f: self.friends }));
        } else {
          (self._platesEl.querySelectorAll('.frk-face') || []).forEach(function (f) { f.classList.add('blink'); });
          var line = self.story ? self._loc(self.story.closing) : self.api.t('shareDone');
          self._speak(line);
          setTimeout(function () {
            (self._platesEl.querySelectorAll('.frk-face') || []).forEach(function (f) { f.classList.remove('blink'); });
          }, 1400);
        }
      }, 350);
    } else if (this.friends > total && filled === total) {
      setTimeout(function () { self._speak(self.fmt('shareEmpty', { p: total, f: self.friends })); }, 350);
    }
  },

  /* ========================= equivalence tray ======================= */

  PIZZA_ANGLES: { 2: [90, 270], 3: [90, 210, 330], 4: [0, 90, 180, 270], 6: [30, 90, 150, 210, 270, 330] },
  _pieceBBox: function (food, n, idx) {
    var G = this.GEO;
    if (food !== 'pizza') {
      var m = this.pieces(food, n)[idx].d.match(/M([\d.]+) ([\d.]+) H([\d.]+) V([\d.]+)/);
      return { x: +m[1], y: +m[2], w: +m[3] - +m[1], h: +m[4] - +m[2] };
    }
    if (n === 1) return { x: G.CX - G.R, y: G.CY - G.R, w: 2 * G.R, h: 2 * G.R };
    var angles = this.PIZZA_ANGLES[n].slice().sort(function (a, b) { return a - b; });
    var a1 = angles[idx], a2 = angles[(idx + 1) % angles.length];
    if (a2 <= a1) a2 += 360;
    var xs = [G.CX], ys = [G.CY];
    for (var a = a1; a <= a2; a += 3) {
      var r = a * Math.PI / 180;
      xs.push(G.CX + G.R * Math.cos(r)); ys.push(G.CY - G.R * Math.sin(r));
    }
    var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
    var minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  },
  _bboxAttr: function (food, n, idx) {
    var b = this._pieceBBox(food, n, idx), pad = 4;
    return (b.x - pad).toFixed(1) + ' ' + (b.y - pad).toFixed(1) + ' ' + (b.w + 2 * pad).toFixed(1) + ' ' + (b.h + 2 * pad).toFixed(1);
  },
  /* which small-piece indices exactly tile the reference (big) piece */
  _equivSlots: function (task) {
    var G = this.GEO;
    var small = this.pieces(task.food, task.small);
    if (task.big === 1) return small.map(function (_, i) { return i; });
    if (task.food === 'pizza') {
      var angles = this.PIZZA_ANGLES[task.big].slice().sort(function (a, b) { return a - b; });
      var A1 = angles[0], A2 = angles[1];
      return small.map(function (p, i) {
        var a = ((Math.atan2(G.CY - p.cy, p.cx - G.CX) * 180 / Math.PI) + 360) % 360;
        return (a > A1 && a < A2) ? i : -1;
      }).filter(function (i) { return i >= 0; });
    }
    var bb = this._pieceBBox(task.food, task.big, 0);
    return small.map(function (p, i) {
      return (p.cx > bb.x && p.cx < bb.x + bb.w && p.cy > bb.y && p.cy < bb.y + bb.h) ? i : -1;
    }).filter(function (i) { return i >= 0; });
  },

  _traysRow: function () {
    var api = this.api, self = this;
    var task = this.equivTask;
    var row = api.el('div', 'frk-trays');
    if (!task) return row;
    var bigPieces = task.big === 1
      ? [{ d: 'M50 10 A40 40 0 1 1 49.99 10 Z', cx: 50, cy: 50 }]
      : this.pieces(task.food, task.big);
    var refPiece = bigPieces[0];
    var smallPieces = this.pieces(task.food, task.small);
    /* the fill slots = the first `count` small pieces whose union = the ref piece
       (by construction of the geometry: adjacent pieces) */
    var ref = api.el('div', 'frk-tray ref');
    ref.innerHTML = '<svg viewBox="0 0 100 100"><clipPath id="frkref"><path d="' + refPiece.d + '"/></clipPath>' +
      '<g clip-path="url(#frkref)">' + this._bodySVG(task.food) + '</g>' +
      '<path d="' + refPiece.d + '" fill="none" stroke="#146B5E" stroke-width="1.8"/></svg>' +
      '<span class="frk-traylbl">' + this._bigName(task) + '</span>';
    var fill = api.el('div', 'frk-tray fill');
    fill.innerHTML = '<svg viewBox="0 0 100 100"><path class="frk-outline" d="' + refPiece.d + '"/>' +
      '<g class="frk-fills"></g></svg>';
    var slots = this._equivSlots(task);
    this._slotIdx = slots;
    var supply = api.el('div', 'frk-supply');
    var count = task.count + 1;   /* one extra piece — it can't fit when full */
    for (var i = 0; i < count; i++) {
      var spIdx = slots[i % slots.length];
      var sp = smallPieces[spIdx];
      var chip = api.el('button', 'frk-supplypiece');
      chip.type = 'button';
      chip.dataset.slot = i;
      chip.setAttribute('aria-label', this.frac(task.small, 's'));
      chip.innerHTML = '<svg viewBox="' + this._bboxAttr(task.food, task.small, spIdx) + '" aria-hidden="true"><clipPath id="frksup' + i + '"><path d="' + sp.d + '"/></clipPath>' +
        '<g clip-path="url(#frksup' + i + ')">' + this._bodySVG(task.food) + '</g>' +
        '<path d="' + sp.d + '" fill="none" stroke="' + this._edgeTint[task.food] + '" stroke-width="1.6"/></svg>';
      this._wireSupply(chip);
      supply.appendChild(chip);
    }
    fill.setAttribute('aria-label', this._bigName(task));
    fill.addEventListener('click', function () { self._fillNext(); });
    row.append(ref, fill, supply);
    this._fillEl = fill;
    return row;
  },
  _wireSupply: function (chip) {
    var self = this;
    this._grab(chip, {
      slop: 10,
      ref: function () { return self._wrap; },
      enabled: function () { return !chip.classList.contains('used'); },
      onStart: function (d) { d.targets = self._targets(); },
      onFirstMove: function (d) { chip.classList.add('dragging'); },
      onMove: function (d, e) {
        chip.style.transform = 'translate(' + (e.clientX - d.x0) + 'px,' + (e.clientY - d.y0) + 'px) scale(1.06)';
        self._hotTarget(e.clientX, e.clientY, d.targets);
      },
      onEnd: function (d, e) {
        chip.classList.remove('dragging');
        chip.style.transform = '';
        self._clearHot();
        if (!d.moved) return;                     /* a tap — the click handler owns it */
        if (d.targets.some(function (t) { return self._inTarget(t, e.clientX, e.clientY); })) self._fillFrom(chip);
        /* dropped anywhere else: it simply glides back, and says nothing */
      },
      /* tap / Enter / Space on a chip sends it to the tray — the drag is
         never the only way in */
      onTap: function () { self._fillFrom(chip); }
    });
  },
  /* the single arbiter: every route into the tray funnels through here,
     so there is one code path to prove rather than two that can drift */
  _fillFrom: function (chip) {
    var task = this.equivTask;
    if (!task || !chip || chip.classList.contains('used')) return;
    if (this.equivFilled >= task.count) { this._missTray(); return; }
    var sp = this.pieces(task.food, task.small)[this._slotIdx[this.equivFilled]];
    var g = this._fillEl.querySelector('.frk-fills');
    /* insertAdjacentHTML, not `innerHTML +=` — the latter re-parses and
       re-creates every piece already placed, restarting their transitions */
    g.insertAdjacentHTML('beforeend',
      '<clipPath id="frkfill' + this.equivFilled + '"><path d="' + sp.d + '"/></clipPath>' +
      '<g clip-path="url(#frkfill' + this.equivFilled + ')">' + this._bodySVG(task.food) + '</g>' +
      '<path d="' + sp.d + '" fill="none" stroke="' + this._edgeTint[task.food] + '" stroke-width="1.2"/>');
    chip.classList.add('used');
    this.equivFilled++;
    this._sfxPlate();
    if (this.equivFilled === task.count) {
      this._fillEl.classList.add('fit');
      this._sfxFit();
      this._speak(this.fmt('equivDone', { a: task.count, small: this.frac(task.small, 'c'), big: this._bigName(task) }));
    }
  },
  /* clicking the tray itself takes the next unused chip */
  _fillNext: function () {
    var chip = this._fillEl && this._fillEl.parentNode &&
      this._fillEl.parentNode.querySelector('.frk-supplypiece:not(.used)');
    if (chip) this._fillFrom(chip);
  },
  /* tray already full → glide back silently (3rd consecutive → info line) */
  _missTray: function () {
    this.equivMisses++;
    this._sfxWobble();
    if (this.equivMisses >= 3) { this.equivMisses = 0; this._speak(this.api.t('equivTooBig')); }
  },

  /* ============================ dock ================================ */

  _refreshDock: function () {
    var old = this._wrap.querySelector('.frk-dock');
    if (old) old.replaceWith(this._dock());
  },
  _dock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'frk-dock');
    var lock = ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

    /* row 1: foods + cut chips */
    var r1 = api.el('div', 'frk-chiprow');
    [['pizza', 'chipPizza'], ['bar', 'chipBar'], ['cake', 'chipCake']].forEach(function (f) {
      var locked = !self.premium && !self.FREE_TASKS[f[0]];
      var chip = api.el('button', 'frk-chip' + (self.food === f[0] ? ' active' : '') + (locked ? ' locked' : ''));
      chip.type = 'button';
      chip.innerHTML = self._miniFood(f[0]) + ' <span>' + api.t(f[1]) + '</span>' + (locked ? lock : '');
      chip.addEventListener('click', function () {
        if (locked) { self._gateInline(dock, 'gateMenu'); return; }
        self.food = f[0];
        var ns = self.MENU[f[0]].filter(function (n) { return self._allowed(f[0], n); });
        if (ns.indexOf(self.n) < 0) self.n = ns[0];
        self._resetCut();
      });
      r1.appendChild(chip);
    });
    this.MENU[this.food].forEach(function (n) {
      var locked = !self._allowed(self.food, n);
      var chip = api.el('button', 'frk-chip small' + (self.n === n ? ' active' : '') + (locked ? ' locked' : ''));
      chip.type = 'button';
      chip.innerHTML = self._miniCut(self.food, n) + (locked ? lock : '');
      chip.setAttribute('aria-label', self.frac(n, 'p'));
      chip.addEventListener('click', function () {
        if (locked) { self._gateInline(dock, 'gateMenu'); return; }
        self.n = n;
        self._resetCut();
        self._speak(self.fmt('cutPrompt', { food: self._loc(self.strings['food' + self.food.charAt(0).toUpperCase() + self.food.slice(1)]), n: n, fp: self.frac(n, 'p') }));
      });
      r1.appendChild(chip);
    });
    dock.appendChild(r1);

    /* row 2: modes */
    var r2 = api.el('div', 'frk-chiprow');
    var share = api.el('button', 'frk-chip' + (this.mode === 'share' ? ' active' : ''));
    share.type = 'button';
    share.textContent = api.t('shareChip');
    share.addEventListener('click', function () {
      self.mode = self.mode === 'share' ? 'cut' : 'share';
      self.story = null;
      if (self.mode === 'share') {
        self._speak(self.fmt('sharePrompt', { f: self.friends, food: self._loc(self.strings['food' + self.food.charAt(0).toUpperCase() + self.food.slice(1)]) }));
      }
      self.render();
    });
    r2.appendChild(share);
    if (this.mode === 'share') {
      [2, 3, 4, 6].forEach(function (f) {
        var locked = !self.premium && (f === 3 || f === 6);
        var chip = api.el('button', 'frk-chip small' + (self.friends === f ? ' active' : '') + (locked ? ' locked' : ''));
        chip.type = 'button';
        chip.textContent = String(f);
        if (locked) chip.innerHTML += lock;
        chip.setAttribute('aria-label', api.t('friendsLbl') + ' ' + f);
        chip.addEventListener('click', function () {
          if (locked) { self._gateInline(dock, 'gateMenu'); return; }
          self.friends = f;
          self.placed = [];
          self.render();
        });
        r2.appendChild(chip);
      });
    }
    var eq = api.el('button', 'frk-chip' + (this.mode === 'equiv' ? ' active' : '') + (this.premium ? '' : ' locked'));
    eq.type = 'button';
    eq.textContent = api.t('equivChip');
    if (!this.premium) eq.innerHTML += lock;
    eq.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(dock, 'gateEquiv'); return; }
      if (self.mode === 'equiv') { self.mode = 'cut'; self.equivTask = null; self.render(); return; }
      self.mode = 'equiv';
      self.equivTask = self.EQUIV[Math.floor(Math.random() * self.EQUIV.length)];
      self.equivFilled = 0; self.equivMisses = 0;
      self.render();
      self._speak(self.fmt('equivPrompt', { a: self.equivTask.count, small: self.frac(self.equivTask.small, 'c'), big: self._bigName(self.equivTask) }));
    });
    r2.appendChild(eq);
    var st = api.el('button', 'frk-chip' + (this.premium ? '' : ' locked'));
    st.type = 'button';
    st.textContent = api.t('stories');
    if (!this.premium) st.innerHTML += lock;
    st.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(dock, 'gateMenu'); return; }
      var story = self.STORIES[Math.floor(Math.random() * self.STORIES.length)];
      self.story = story;
      self.food = story.food; self.n = story.n; self.friends = story.friends;
      self.mode = 'share';
      self._resetCut(true);
      self._speak(self._loc(story.story));
    });
    r2.appendChild(st);
    var again = api.el('button', 'frk-chip');
    again.type = 'button';
    again.textContent = api.t(this.sliced ? 'cutAgain' : 'startAgain');
    again.addEventListener('click', function () { self._resetCut(true); });
    r2.appendChild(again);
    dock.appendChild(r2);
    return dock;
  },
  _resetCut: function (keepMode) {
    this.committed = [];
    this.sliced = false;
    this.placed = [];
    this._sel = null;
    if (!keepMode && this.mode === 'equiv') this.mode = 'cut';
    this.render();
  },
  _miniFood: function (food) {
    if (food === 'pizza') return '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#D9A05B"/><circle cx="12" cy="12" r="7.6" fill="#F5D272"/><circle cx="10" cy="10" r="1.4" fill="#EAD9C0"/><circle cx="15" cy="14" r="1.1" fill="#4A3B52"/></svg>';
    if (food === 'bar') return '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="1.5" fill="#7A4A2B"/><line x1="9" y1="7" x2="9" y2="17" stroke="#5C3620" stroke-width="1"/><line x1="15" y1="7" x2="15" y2="17" stroke="#5C3620" stroke-width="1"/></svg>';
    return '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="8" width="18" height="9" rx="2" fill="#F7D9A0" stroke="#C99B62"/><circle cx="9" cy="12" r="1.4" fill="#8A5FA0"/><circle cx="16" cy="13" r="1.4" fill="#8A5FA0"/></svg>';
  },
  _miniCut: function (food, n) {
    var inner = food === 'pizza' ? '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>' : '<rect x="3.5" y="6" width="17" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/>';
    var lines = '';
    if (food === 'pizza') {
      if (n === 2) lines = '<line x1="12" y1="3" x2="12" y2="21"/>';
      else if (n === 3) lines = '<line x1="12" y1="12" x2="12" y2="3"/><line x1="12" y1="12" x2="4.2" y2="16.5"/><line x1="12" y1="12" x2="19.8" y2="16.5"/>';
      else if (n === 4) lines = '<line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/>';
      else lines = '<line x1="12" y1="3" x2="12" y2="21"/><line x1="4.2" y1="7.5" x2="19.8" y2="16.5"/><line x1="19.8" y1="7.5" x2="4.2" y2="16.5"/>';
    } else {
      if (n === 2) lines = '<line x1="12" y1="6" x2="12" y2="18"/>';
      else if (n === 3) lines = food === 'cake' ? '<line x1="3.5" y1="10" x2="20.5" y2="10"/><line x1="3.5" y1="14" x2="20.5" y2="14"/>' : '<line x1="9.2" y1="6" x2="9.2" y2="18"/><line x1="14.8" y1="6" x2="14.8" y2="18"/>';
      else if (n === 4) lines = '<line x1="12" y1="6" x2="12" y2="18"/><line x1="3.5" y1="12" x2="20.5" y2="12"/>';
      else if (n === 6) lines = '<line x1="6.3" y1="6" x2="6.3" y2="18"/><line x1="9.2" y1="6" x2="9.2" y2="18"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="14.8" y1="6" x2="14.8" y2="18"/><line x1="17.7" y1="6" x2="17.7" y2="18"/>';
      else lines = '<line x1="7.75" y1="6" x2="7.75" y2="18"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="16.25" y1="6" x2="16.25" y2="18"/><line x1="3.5" y1="12" x2="20.5" y2="12"/>';
    }
    return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">' + inner + lines + '</svg>';
  },

  _gateInline: function (host, key) {
    var api = this.api;
    var old = this._wrap.querySelector('.frk-gate');
    if (old) old.remove();
    var g = api.el('div', 'frk-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-fraction-kitchen';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('beforebegin', g);
    setTimeout(function () { if (g.parentNode) g.remove(); }, 12000);
  },

  onSettings: function () { this._saveStore(); },
  reset: function () {
    this.mode = 'cut';
    this.story = null;
    this.equivTask = null;
    this._resetCut(true);
  },
  paint: function () {}
};

/* per-tool styling: STAGE ONLY + the sanctioned body class */
(function injectCSS() {
  var css = ''
  + 'body.frk-wide .lcs-app{max-width:min(1080px,96vw);}'
  + 'body.frk-wide #lcs-root{height:100%;min-height:0;}'
  + '@media (max-width:560px){body.frk-wide{overflow-y:auto;}body.frk-wide #lcs-root{height:auto;}}'
  + '@media (max-width:480px){body.frk-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}}'
  + '.frk-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.2vmin,12px);width:100%;height:100%;min-height:0;}'

  /* board zone + backdrop */
  + '.frk-boardzone{position:relative;flex:1 1 auto;min-height:300px;width:100%;display:flex;'
  +   'align-items:center;justify-content:center;}'
  + '.frk-counter{position:absolute;bottom:0;left:0;right:0;height:26px;pointer-events:none;'
  +   'background:linear-gradient(180deg,#EFE2CB,#E7DCC8);border-top:1px solid #DCCFB4;border-radius:0 0 24px 24px;}'
  + '.frk-board{position:relative;width:min(460px,86vw);height:min(340px,52vh);background:#C99B62;'
  +   'border:3px solid #A9814F;border-radius:26px;display:flex;align-items:center;justify-content:center;'
  +   'background-image:repeating-linear-gradient(180deg,transparent 0 44px,rgba(139,111,71,.14) 44px 47px);'
  +   'box-shadow:0 8px 20px rgba(20,30,28,.14);}'
  + '.frk-hole{position:absolute;top:12px;right:14px;width:18px;height:18px;border-radius:50%;background:#A8763E;}'
  + '.frk-foodbox{position:relative;width:min(300px,74vw);height:min(300px,74vw);max-height:100%;}'
  + '.frk-foodsvg{position:absolute;inset:0;}'
  + '.frk-food{display:block;width:100%;height:100%;overflow:visible;}'

  /* the hit overlay — real buttons, positioned in the foodbox's own
     percentage space. Exact because the box is square (verify §8d). */
  + '.frk-hitlayer{position:absolute;inset:0;pointer-events:none;}'
  + '.frk-cutbtn,.frk-piecebtn{position:absolute;pointer-events:auto;padding:0;margin:0;border:0;'
  +   'background:transparent;font:inherit;color:inherit;touch-action:none;cursor:pointer;'
  +   'appearance:none;-webkit-appearance:none;}'
  + '.frk-cutbtn{height:max(44px,13%);border-radius:22px;}'
  + '.frk-piecebtn{transform:translate(-50%,-50%);border-radius:50%;'
  +   'min-width:34px;min-height:34px;cursor:grab;}'
  + '.frk-foodbox.exploded .frk-piecebtn{transform:translate(-50%,-50%) translate(var(--ex),var(--ey));}'
  + '.frk-cutbtn:focus-visible,.frk-piecebtn:focus-visible{outline:3px solid var(--lcs-focus,#146B5E);outline-offset:2px;}'
  + '.frk-piecebtn.dragging{opacity:.4;}'
  + '.frk-piecebtn.onplate{pointer-events:none;}'
  + '.frk-piecebtn.selected{box-shadow:0 0 0 3px #F2C879, 0 0 0 6px rgba(242,200,121,.35);}'

  /* guides — correct and distractor styled IDENTICALLY (no telegraphing) */
  + '.frk-guide{stroke:#146B5E;stroke-width:3;stroke-dasharray:4 5;opacity:0;stroke-linecap:round;'
  +   'transition:opacity .16s var(--lcs-ease);vector-effect:non-scaling-stroke;}'
  + '.frk-foodbox.guides-on .frk-guide{opacity:.34;}'
  + '.frk-guide.engaged{opacity:.72;}'
  + '.frk-guide.cutline{opacity:1;stroke-dasharray:none;stroke-width:3.6;}'
  + '.frk-score{stroke:#146B5E;stroke-width:3.6;stroke-linecap:round;vector-effect:non-scaling-stroke;visibility:hidden;}'

  /* pieces — DECORATIVE only; the overlay button is the pointer target */
  + '.frk-piece{transform:translate(0,0);transition:transform .26s cubic-bezier(.34,1.56,.64,1);pointer-events:none;}'
  + '.frk-foodbox.exploded .frk-piece{transform:translate(var(--ex),var(--ey));}'
  + '.frk-piece.onplate{opacity:.18;}'
  + '.frk-fly{position:fixed;z-index:1000;pointer-events:none;'
  +   'filter:drop-shadow(0 10px 16px rgba(20,30,28,.25));}'

  /* the unequal-beat (physics, never a verdict) */
  + '.frk-uneq{transform:translate(0,0);transition:transform .22s cubic-bezier(.34,1.56,.64,1);transform-box:fill-box;transform-origin:center;}'
  + '.frk-foodbox.unequal .frk-uneq{transform:translate(var(--ux),var(--uy));}'
  + '.frk-foodbox.seesaw .frk-uneq0{animation:frkSee 0.35s ease-in-out 2;}'
  + '.frk-foodbox.seesaw .frk-uneq1{animation:frkSaw 0.35s ease-in-out 2;}'
  + '@keyframes frkSee{0%,100%{rotate:0deg;}50%{rotate:1.5deg;}}'
  + '@keyframes frkSaw{0%,100%{rotate:0deg;}50%{rotate:-1.5deg;}}'
  + '.frk-foodbox.healing .frk-uneq{transform:translate(0,0);transition:transform .32s var(--lcs-ease);}'

  /* knife */
  + '.frk-knife-rest{position:absolute;right:max(8px,calc(50% - 320px));top:50%;transform:translateY(-50%);'
  +   'width:88px;height:140px;background:#FDF6E8;border:1.5px solid #E7DCC8;border-radius:14px;'
  +   'display:flex;align-items:center;justify-content:center;}'
  + '.frk-knife-btn{padding:0;margin:0;border:0;background:transparent;font:inherit;color:inherit;'
  +   'touch-action:none;cursor:grab;appearance:none;-webkit-appearance:none;line-height:0;'
  +   'min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;}'
  + '.frk-knife-btn:focus-visible{outline:3px solid var(--lcs-focus,#146B5E);outline-offset:3px;border-radius:12px;}'
  + '.frk-knife-btn.lifted{cursor:grabbing;}'
  /* after the last cut the knife is PUT DOWN, not greyed out — a faded
     control reads as broken rather than as finished */
  + '.frk-knife-btn.done{cursor:default;}'
  + '.frk-knife-btn.done .frk-knife{transform:rotate(-6deg);}'
  + '.frk-knife{width:120px;height:38px;transform:rotate(-20deg);pointer-events:none;'
  +   'filter:drop-shadow(0 3px 5px rgba(20,30,28,.18));transition:transform .14s var(--lcs-ease);}'
  + '.frk-knife-btn.lifted .frk-knife{transform:rotate(0deg) scale(1.06);z-index:100;}'

  /* plates */
  + '.frk-plates{flex-shrink:0;display:flex;justify-content:center;align-items:flex-end;gap:28px;'
  +   'flex-wrap:wrap;min-height:150px;width:100%;padding:4px 0 10px;}'
  + '.frk-platecell{display:flex;flex-direction:column;align-items:center;}'
  + '.frk-face{width:54px;height:54px;margin-bottom:-10px;position:relative;z-index:2;}'
  + '.frk-face.bounce{animation:frkBounce .25s cubic-bezier(.34,1.56,.64,1);}'
  + '@keyframes frkBounce{50%{transform:scale(1.08);}}'
  + '.frk-face circle[fill="#2A2A35"]{transform-box:fill-box;transform-origin:center;}'
  + '.frk-face.blink circle[fill="#2A2A35"]{animation:frkBlink 1.2s ease-in-out;}'
  + '@keyframes frkBlink{45%,55%{transform:scaleY(.1);}}'
  /* plates and supply chips are real <button>s now — reset the UA styling */
  + '.frk-plate,.frk-supplypiece,.frk-tray.fill{font:inherit;color:inherit;padding:0;'
  +   'appearance:none;-webkit-appearance:none;cursor:pointer;}'
  + '.frk-plate:focus-visible,.frk-supplypiece:focus-visible,.frk-tray.fill:focus-visible{'
  +   'outline:3px solid var(--lcs-focus,#146B5E);outline-offset:3px;}'
  + '.frk-plate{width:108px;height:108px;border-radius:50%;background:#FFFFFF;'
  +   'border:1.5px solid #C9D8D3;box-shadow:var(--lcs-shadow-sm);display:grid;place-items:center;position:relative;}'
  + '.frk-plate::before{content:"";position:absolute;inset:12%;border-radius:50%;border:2px solid #E2F0EC;}'
  + '.frk-plate.hot{border-color:#F2784B;transform:scale(1.03);transition:all .14s var(--lcs-ease);}'
  + '.frk-plateslice{width:64%;height:64%;}'

  /* equivalence trays */
  + '.frk-trays{flex-shrink:0;display:flex;justify-content:center;align-items:center;gap:24px;'
  +   'flex-wrap:wrap;min-height:170px;width:100%;padding:4px 0 10px;}'
  + '.frk-tray{width:148px;height:148px;border-radius:16px;background:#FBF6EE;'
  +   'border:2px dashed rgba(20,107,94,.3);display:grid;place-items:center;position:relative;}'
  + '.frk-tray svg{width:86%;height:86%;}'
  + '.frk-tray.fill .frk-outline{fill:none;stroke:#146B5E;stroke-width:1.8;stroke-dasharray:4 4;opacity:.4;}'
  + '.frk-tray.fill.fit{border-style:solid;border-color:#F2C879;background:#FDF6E4;'
  +   'box-shadow:0 0 30px rgba(242,200,121,.85);transition:box-shadow .4s var(--lcs-ease);}'
  + '.frk-tray.fill.fit .frk-outline{stroke:#F2C879;stroke-dasharray:none;opacity:1;transition:all .4s;}'
  + '.frk-tray.hot{border-color:#F2784B;border-style:solid;transform:scale(1.03);transition:all .14s var(--lcs-ease);}'
  + '.frk-traylbl{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:999px;padding:2px 10px;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:12.5px;color:#2B2622;white-space:nowrap;}'
  + '.frk-supply{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;max-width:260px;'
  +   'background:#FBF6EE;border:1.5px dashed rgba(20,107,94,.18);border-radius:16px;padding:10px 12px;}'
  + '.frk-supplypiece{width:84px;height:84px;cursor:grab;background:transparent;border:0;'
  +   'touch-action:none;}'
  + '.frk-supplypiece svg{width:100%;height:100%;overflow:visible;}'
  + '.frk-supplypiece.dragging{z-index:100;position:relative;}'
  + '.frk-supplypiece.used{opacity:.2;pointer-events:none;}'

  /* dock */
  + '.frk-dock{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  + '.frk-chiprow{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;}'
  + '.frk-chip{display:inline-flex;align-items:center;gap:6px;min-height:46px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:14.5px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:8px 14px;cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.frk-chip:active{transform:scale(.96);}'
  + '.frk-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.frk-chip.locked{color:var(--lcs-ink-soft);}'
  + '.frk-chip.small{min-width:46px;justify-content:center;padding:8px 10px;}'

  /* gate */
  + '.frk-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:560px;margin:4px auto;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.frk-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'

  /* phone */
  + '@media (max-width:560px){'
  +   '.frk-board{height:min(320px,80vw);}'
  +   '.frk-knife-rest{right:6px;bottom:-6px;top:auto;transform:none;width:70px;height:104px;}'
  +   '.frk-knife{width:92px;height:30px;}'
  +   '.frk-plates{gap:14px;min-height:120px;}'
  +   '.frk-plate{width:84px;height:84px;}'
  +   '.frk-face{width:42px;height:42px;}'
  +   '.frk-tray{width:120px;height:120px;}'
  +   '.frk-supplypiece{width:66px;height:66px;}'
  +   '.frk-chiprow{gap:6px;}'
  + '}'
  + '@media (max-width:360px){'
  +   '.frk-boardzone{min-height:0;}'
  +   '.frk-board{height:min(230px,72vw);width:min(340px,94vw);}'
  +   '.frk-foodbox{width:min(200px,60vw);height:min(200px,60vw);}'
  +   '.frk-knife-rest{width:60px;height:88px;}'
  +   '.frk-knife{width:78px;height:26px;}'
  +   '.frk-wrap{gap:4px;}'
  +   '.frk-chip{padding:8px 10px;font-size:13.5px;}'
  + '}'
  + '@media (max-height:960px) and (min-width:768px){.frk-wrap{gap:5px;}.frk-plates{min-height:132px;}}'
  + '@media (min-height:900px) and (min-width:600px){.frk-board{height:min(430px,50vh);}'
  +   '.frk-foodbox{width:min(380px,74vw);height:min(380px,74vw);}}'

  /* reduced motion */
    /* =====================================================================
       WIDE VIEWPORTS — this tool is CARD-bound, not instrument-bound.
       Apparatus 1037px inside a 1080px card = 96%. 40.3% -> 66.1% at 2560.
       Its own `body.frk-wide .lcs-app{max-width:...}` is what holds it: a
       self-widen rule at (0,1,1) DELIBERATELY out-specifies the shell's
       generic `.lcs-app` tier (0,1,0), which is what kept the eighteen
       legacy self-wideners untouched when the shell tiers shipped. That
       protection is now the ceiling, so the cap is raised here, per tool.
       MEASURED with probe-tool-tiers.js at every tier FLOOR in Italian
       BEFORE it was written — every cell fits, and 1366 is untouched.
       ===================================================================== */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.frk-wide .lcs-app{max-width:min(1240px,96vw);}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.frk-wide .lcs-app{max-width:min(1560px,96vw);}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.frk-wide .lcs-app{max-width:min(1740px,96vw);}'
    + '}'
  + '@media (prefers-reduced-motion: reduce){'
  +   '.frk-piece{transition:none;}'
  +   '.frk-uneq{transition:none;}'
  +   '.frk-foodbox.seesaw .frk-uneq0,.frk-foodbox.seesaw .frk-uneq1{animation:none;}'
  +   '.frk-face.bounce{animation:none;}'
  +   '.frk-face.blink circle[fill="#2A2A35"]{animation:none;}'
  +   '.frk-tray.fill.fit{transition:border-color .12s;box-shadow:none;}'
  +   '.frk-plate.hot,.frk-tray.hot{transform:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
