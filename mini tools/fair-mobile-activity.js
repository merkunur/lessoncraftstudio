/* =====================================================================
   fair-mobile-activity.js — ACTIVITY #107 of the one-by-one rebuild:
   "Equal Halves and Fourths" → THE FAIR MOBILE (1.G.A.3, 11 locales).
   Design: docs/activities-rebuild/designs/107-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: hang a cut-up card on a mobile with one hook per share.
   Cardboard weighs by its area, so the mobile measures "equal": fair
   shares hang perfectly level, an unfair cut tips the bar, too many
   pieces drop into the spare tray, too few leave hooks bare. A latch pin
   holds the bar level until Check pulls it out and the mobile swings to
   its true tilt; a spirit level on the bar shows it; every piece hangs on
   a spring. Level 1: halves and fourths. Level 2: thirds (a bar pivoted
   at a third) and fair shares that look different. Level 3: three named
   mobiles (½ ⅓ ¼) — hang the shaded card on the one it belongs to.
   Miss 1: the mobile shows the truth (tilt, bare hooks, spare pieces);
   the heaviest piece glows coral, the lightest teal; the hint names what
   the mobile shows. Miss 2: the pin holds the bar level again and the
   springs are measured against a dashed fair line — the extra length of
   a too-big share outlined coral, a too-small one teal.
   Success: level, every spring on the fair line, each piece labelled
   with its unit fraction; then any card can be hung and watched.
   ACTIVITY LAYER ONLY: the model is fair-mobile-core.js; every shape and
   the mobile are drawn geometry; lcs-shell.js untouched (the shell's
   Check is hidden and pressed by this activity when right).
   Test seams: window.FairMobileActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._view / ._dims / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var FairMobileActivity = {
  id: 'fair-mobile',
  apparatusClasses: ['fm-'],

  /*STRINGS-BEGIN*/strings: {
    title:        {en:'The Fair Mobile',de:'Das gerechte Mobile',nl:'De eerlijke mobiel',da:'Den retfærdige uro',sv:'Den rättvisa mobilen',no:'Den rettferdige uroen',es:'El móvil justo',it:'La giostrina giusta',pt:'O móbile justo',fr:'Le mobile équitable',fi:'Reilu mobile'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    tHalves:      {en:'Which card is cut into halves? Hang it on the mobile.',de:'Welche Karte ist in Hälften geteilt? Häng sie ans Mobile.',nl:'Welke kaart is in helften verdeeld? Hang hem aan de mobiel.',da:'Hvilket kort er delt i halvdele? Hæng det på uroen.',sv:'Vilket kort är delat i halvor? Häng det på mobilen.',no:'Hvilket kort er delt i halvdeler? Heng det på uroen.',es:'¿Qué tarjeta está dividida en medios? Cuélgala en el móvil.',it:'Quale cartoncino è diviso a metà? Appendilo alla giostrina.',pt:'Qual cartão está dividido em metades? Pendure-o no móbile.',fr:'Quelle carte est partagée en deux moitiés ? Accroche-la au mobile.',fi:'Mikä kortti on jaettu puolikkaisiin? Ripusta se mobileen.'},
    tThirds:      {en:'Which card is cut into thirds? Hang it on the mobile.',de:'Welche Karte ist in Drittel geteilt? Häng sie ans Mobile.',nl:'Welke kaart is in derden verdeeld? Hang hem aan de mobiel.',da:'Hvilket kort er delt i tredjedele? Hæng det på uroen.',sv:'Vilket kort är delat i tredjedelar? Häng det på mobilen.',no:'Hvilket kort er delt i tredjedeler? Heng det på uroen.',es:'¿Qué tarjeta está dividida en tercios? Cuélgala en el móvil.',it:'Quale cartoncino è diviso in terzi? Appendilo alla giostrina.',pt:'Qual cartão está dividido em terços? Pendure-o no móbile.',fr:'Quelle carte est partagée en tiers ? Accroche-la au mobile.',fi:'Mikä kortti on jaettu kolmasosiin? Ripusta se mobileen.'},
    tFourths:     {en:'Which card is cut into fourths? Hang it on the mobile.',de:'Welche Karte ist in Viertel geteilt? Häng sie ans Mobile.',nl:'Welke kaart is in kwarten verdeeld? Hang hem aan de mobiel.',da:'Hvilket kort er delt i fjerdedele? Hæng det på uroen.',sv:'Vilket kort är delat i fjärdedelar? Häng det på mobilen.',no:'Hvilket kort er delt i fjerdedeler? Heng det på uroen.',es:'¿Qué tarjeta está dividida en cuartos? Cuélgala en el móvil.',it:'Quale cartoncino è diviso in quarti? Appendilo alla giostrina.',pt:'Qual cartão está dividido em quartos? Pendure-o no móbile.',fr:'Quelle carte est partagée en quarts ? Accroche-la au mobile.',fi:'Mikä kortti on jaettu neljäsosiin? Ripusta se mobileen.'},
    tName:        {en:'Which mobile matches the shaded share? Hang the card on it.',de:'Welches Mobile passt zum farbigen Teil? Häng die Karte daran.',nl:'Welke mobiel past bij het gekleurde deel? Hang de kaart eraan.',da:'Hvilken uro passer til den farvede del? Hæng kortet på den.',sv:'Vilken mobil passar till den färgade delen? Häng kortet på den.',no:'Hvilken uro passer til den fargede delen? Heng kortet på den.',es:'¿Qué móvil corresponde a la parte coloreada? Cuelga la tarjeta en él.',it:'Quale giostrina corrisponde alla parte colorata? Appendi lì il cartoncino.',pt:'Qual móbile combina com a parte pintada? Pendure o cartão nele.',fr:'Quel mobile va avec la part coloriée ? Accroche la carte dessus.',fi:'Mikä mobile sopii väritettyyn osaan? Ripusta kortti siihen.'},
    hintEmpty:    {en:'Hang a card on the mobile first.',de:'Häng zuerst eine Karte ans Mobile.',nl:'Hang eerst een kaart aan de mobiel.',da:'Hæng først et kort på uroen.',sv:'Häng först ett kort på mobilen.',no:'Heng først et kort på uroen.',es:'Primero cuelga una tarjeta en el móvil.',it:'Prima appendi un cartoncino alla giostrina.',pt:'Primeiro pendure um cartão no móbile.',fr:'Accroche d’abord une carte au mobile.',fi:'Ripusta ensin kortti mobileen.'},
    hintUneq:     {en:'It tips! One share is bigger than another, so the shares are not equal.',de:'Es kippt! Ein Teil ist größer als ein anderer – die Teile sind nicht gleich groß.',nl:'Hij helt over! Eén deel is groter dan een ander, dus de delen zijn niet gelijk.',da:'Den tipper! Én del er større end en anden, så delene er ikke lige store.',sv:'Den lutar! En del är större än en annan, så delarna är inte lika stora.',no:'Den tipper! Én del er større enn en annen, så delene er ikke like store.',es:'¡Se inclina! Una parte es más grande que otra, así que las partes no son iguales.',it:'Si inclina! Una parte è più grande di un’altra, quindi le parti non sono uguali.',pt:'Inclinou! Uma parte é maior que outra, então as partes não são iguais.',fr:'Il penche ! Une part est plus grande qu’une autre : les parts ne sont pas égales.',fi:'Se kallistuu! Yksi osa on suurempi kuin toinen, joten osat eivät ole yhtä suuret.'},
    hintMany:     {en:'Some pieces have no hook. This card has too many pieces for this mobile.',de:'Manche Teile haben keinen Haken. Diese Karte hat zu viele Teile für dieses Mobile.',nl:'Sommige stukken hebben geen haakje. Deze kaart heeft te veel stukken voor deze mobiel.',da:'Nogle stykker har ingen krog. Kortet har for mange stykker til denne uro.',sv:'Några bitar har ingen krok. Kortet har för många bitar för den här mobilen.',no:'Noen biter har ingen krok. Kortet har for mange biter til denne uroen.',es:'Algunas piezas no tienen gancho. Esta tarjeta tiene demasiadas piezas para este móvil.',it:'Alcuni pezzi non hanno un gancio. Questo cartoncino ha troppi pezzi per questa giostrina.',pt:'Algumas peças ficaram sem gancho. Este cartão tem peças demais para este móbile.',fr:'Des morceaux n’ont pas de crochet. Cette carte a trop de morceaux pour ce mobile.',fi:'Joillakin paloilla ei ole koukkua. Kortissa on liikaa paloja tälle mobilelle.'},
    hintFew:      {en:'Some hooks are empty. This card has too few pieces for this mobile.',de:'Manche Haken sind leer. Diese Karte hat zu wenige Teile für dieses Mobile.',nl:'Sommige haakjes zijn leeg. Deze kaart heeft te weinig stukken voor deze mobiel.',da:'Nogle kroge er tomme. Kortet har for få stykker til denne uro.',sv:'Några krokar är tomma. Kortet har för få bitar för den här mobilen.',no:'Noen kroker er tomme. Kortet har for få biter til denne uroen.',es:'Algunos ganchos están vacíos. Esta tarjeta tiene muy pocas piezas para este móvil.',it:'Alcuni ganci sono vuoti. Questo cartoncino ha troppo pochi pezzi per questa giostrina.',pt:'Alguns ganchos estão vazios. Este cartão tem peças de menos para este móbile.',fr:'Des crochets sont vides. Cette carte a trop peu de morceaux pour ce mobile.',fi:'Jotkin koukut ovat tyhjiä. Kortissa on liian vähän paloja tälle mobilelle.'},
    hintMobile:   {en:'This mobile does not have one hook for each equal share of the card.',de:'Dieses Mobile hat nicht für jeden gleich großen Teil der Karte einen Haken.',nl:'Deze mobiel heeft niet voor elk gelijk deel van de kaart een haakje.',da:'Denne uro har ikke én krog til hver lige stor del af kortet.',sv:'Den här mobilen har inte en krok för varje lika stor del av kortet.',no:'Denne uroen har ikke én krok til hver like store del av kortet.',es:'Este móvil no tiene un gancho para cada parte igual de la tarjeta.',it:'Questa giostrina non ha un gancio per ogni parte uguale del cartoncino.',pt:'Este móbile não tem um gancho para cada parte igual do cartão.',fr:'Ce mobile n’a pas un crochet pour chaque part égale de la carte.',fi:'Tässä mobilessa ei ole koukkua jokaiselle kortin yhtä suurelle osalle.'},
    hintSprings:  {en:'Look at the springs: a bigger share pulls its spring past the dashed line. Fair shares all stop on the line.',de:'Schau auf die Federn: Ein größerer Teil zieht seine Feder über die gestrichelte Linie. Gerechte Teile bleiben alle an der Linie stehen.',nl:'Kijk naar de veren: een groter deel trekt zijn veer voorbij de stippellijn. Eerlijke delen stoppen allemaal op de lijn.',da:'Se på fjedrene: En større del trækker sin fjeder forbi den stiplede linje. Retfærdige dele stopper alle på linjen.',sv:'Titta på fjädrarna: en större del drar sin fjäder förbi den streckade linjen. Rättvisa delar stannar alla på linjen.',no:'Se på fjærene: En større del drar fjæren sin forbi den stiplede linja. Rettferdige deler stopper alle på linja.',es:'Mira los resortes: una parte más grande estira su resorte más allá de la línea punteada. Las partes justas se detienen todas en la línea.',it:'Guarda le molle: una parte più grande tira la sua molla oltre la linea tratteggiata. Le parti giuste si fermano tutte sulla linea.',pt:'Olhe as molas: uma parte maior puxa a sua mola além da linha tracejada. As partes justas param todas na linha.',fr:'Regarde les ressorts : une part plus grande tire son ressort au-delà de la ligne pointillée. Les parts équitables s’arrêtent toutes sur la ligne.',fi:'Katso jousia: suurempi osa venyttää jousensa katkoviivan ohi. Reilut osat pysähtyvät kaikki viivan kohdalle.'},
    hintCount2:   {en:'Count the shares on the card, then count the hooks: every share needs its own hook.',de:'Zähl die Teile auf der Karte, dann die Haken: Jeder Teil braucht einen eigenen Haken.',nl:'Tel de delen op de kaart en dan de haakjes: elk deel heeft een eigen haakje nodig.',da:'Tæl delene på kortet, og tæl så krogene: Hver del skal have sin egen krog.',sv:'Räkna delarna på kortet och sedan krokarna: varje del behöver en egen krok.',no:'Tell delene på kortet, og tell så krokene: Hver del trenger sin egen krok.',es:'Cuenta las partes de la tarjeta y luego los ganchos: cada parte necesita su propio gancho.',it:'Conta le parti del cartoncino, poi i ganci: ogni parte ha bisogno del suo gancio.',pt:'Conte as partes do cartão e depois os ganchos: cada parte precisa do seu próprio gancho.',fr:'Compte les parts de la carte, puis les crochets : chaque part a besoin de son crochet.',fi:'Laske kortin osat ja sitten koukut: jokainen osa tarvitsee oman koukkunsa.'},
    okHalves:     {en:'Level! Two equal shares: each share is one half.',de:'Waagerecht! Zwei gleich große Teile: Jeder Teil ist eine Hälfte.',nl:'Hij hangt recht! Twee gelijke delen: elk deel is een helft.',da:'Vandret! To lige store dele: Hver del er en halvdel.',sv:'Vågrät! Två lika stora delar: varje del är en halva.',no:'Vannrett! To like store deler: Hver del er en halvdel.',es:'¡Nivelado! Dos partes iguales: cada parte es un medio.',it:'In equilibrio! Due parti uguali: ogni parte è una metà.',pt:'Equilibrado! Duas partes iguais: cada parte é uma metade.',fr:'À l’horizontale ! Deux parts égales : chaque part est une moitié.',fi:'Vaakasuorassa! Kaksi yhtä suurta osaa: jokainen osa on puolikas.'},
    okThirds:     {en:'Level! Three equal shares: each share is one third.',de:'Waagerecht! Drei gleich große Teile: Jeder Teil ist ein Drittel.',nl:'Hij hangt recht! Drie gelijke delen: elk deel is een derde.',da:'Vandret! Tre lige store dele: Hver del er en tredjedel.',sv:'Vågrät! Tre lika stora delar: varje del är en tredjedel.',no:'Vannrett! Tre like store deler: Hver del er en tredjedel.',es:'¡Nivelado! Tres partes iguales: cada parte es un tercio.',it:'In equilibrio! Tre parti uguali: ogni parte è un terzo.',pt:'Equilibrado! Três partes iguais: cada parte é um terço, a terça parte.',fr:'À l’horizontale ! Trois parts égales : chaque part est un tiers.',fi:'Vaakasuorassa! Kolme yhtä suurta osaa: jokainen osa on kolmasosa.'},
    okFourths:    {en:'Level! Four equal shares: each share is one fourth, or one quarter.',de:'Waagerecht! Vier gleich große Teile: Jeder Teil ist ein Viertel.',nl:'Hij hangt recht! Vier gelijke delen: elk deel is een kwart.',da:'Vandret! Fire lige store dele: Hver del er en fjerdedel.',sv:'Vågrät! Fyra lika stora delar: varje del är en fjärdedel.',no:'Vannrett! Fire like store deler: Hver del er en fjerdedel.',es:'¡Nivelado! Cuatro partes iguales: cada parte es un cuarto.',it:'In equilibrio! Quattro parti uguali: ogni parte è un quarto.',pt:'Equilibrado! Quatro partes iguais: cada parte é um quarto, a quarta parte.',fr:'À l’horizontale ! Quatre parts égales : chaque part est un quart.',fi:'Vaakasuorassa! Neljä yhtä suurta osaa: jokainen osa on neljäsosa.'},
    ok3Half:      {en:'Yes! The shaded share is one half of the whole shape.',de:'Ja! Der farbige Teil ist eine Hälfte der ganzen Form.',nl:'Ja! Het gekleurde deel is een helft van de hele vorm.',da:'Ja! Den farvede del er en halvdel af hele figuren.',sv:'Ja! Den färgade delen är en halva av hela figuren.',no:'Ja! Den fargede delen er en halvdel av hele figuren.',es:'¡Sí! La parte coloreada es un medio de toda la figura.',it:'Sì! La parte colorata è una metà di tutta la figura.',pt:'Sim! A parte pintada é uma metade da figura inteira.',fr:'Oui ! La part coloriée est une moitié de la figure entière.',fi:'Kyllä! Väritetty osa on puolikas koko kuviosta.'},
    ok3Third:     {en:'Yes! The shaded share is one third of the whole shape.',de:'Ja! Der farbige Teil ist ein Drittel der ganzen Form.',nl:'Ja! Het gekleurde deel is een derde van de hele vorm.',da:'Ja! Den farvede del er en tredjedel af hele figuren.',sv:'Ja! Den färgade delen är en tredjedel av hela figuren.',no:'Ja! Den fargede delen er en tredjedel av hele figuren.',es:'¡Sí! La parte coloreada es un tercio de toda la figura.',it:'Sì! La parte colorata è un terzo di tutta la figura.',pt:'Sim! A parte pintada é um terço da figura inteira.',fr:'Oui ! La part coloriée est un tiers de la figure entière.',fi:'Kyllä! Väritetty osa on kolmasosa koko kuviosta.'},
    ok3Fourth:    {en:'Yes! The shaded share is one fourth, or one quarter, of the whole shape.',de:'Ja! Der farbige Teil ist ein Viertel der ganzen Form.',nl:'Ja! Het gekleurde deel is een kwart van de hele vorm.',da:'Ja! Den farvede del er en fjerdedel af hele figuren.',sv:'Ja! Den färgade delen är en fjärdedel av hela figuren.',no:'Ja! Den fargede delen er en fjerdedel av hele figuren.',es:'¡Sí! La parte coloreada es un cuarto de toda la figura.',it:'Sì! La parte colorata è un quarto di tutta la figura.',pt:'Sim! A parte pintada é um quarto da figura inteira.',fr:'Oui ! La part coloriée est un quart de la figure entière.',fi:'Kyllä! Väritetty osa on neljäsosa koko kuviosta.'},
    plHalf:       {en:'half',de:'Hälfte',nl:'helft',da:'halvdel',sv:'halva',no:'halvdel',es:'medio',it:'metà',pt:'metade',fr:'moitié',fi:'puolikas'},
    plThird:      {en:'third',de:'Drittel',nl:'derde',da:'tredjedel',sv:'tredjedel',no:'tredjedel',es:'tercio',it:'terzo',pt:'terço',fr:'tiers',fi:'kolmasosa'},
    plFourth:     {en:'fourth',de:'Viertel',nl:'kwart',da:'fjerdedel',sv:'fjärdedel',no:'fjerdedel',es:'cuarto',it:'quarto',pt:'quarto',fr:'quart',fi:'neljäsosa'},
    shCircle:     {en:'circle',de:'Kreis',nl:'cirkel',da:'cirkel',sv:'cirkel',no:'sirkel',es:'círculo',it:'cerchio',pt:'círculo',fr:'disque',fi:'ympyrä'},
    shSquare:     {en:'square',de:'Quadrat',nl:'vierkant',da:'kvadrat',sv:'kvadrat',no:'kvadrat',es:'cuadrado',it:'quadrato',pt:'quadrado',fr:'carré',fi:'neliö'},
    shRectangle:  {en:'rectangle',de:'Rechteck',nl:'rechthoek',da:'rektangel',sv:'rektangel',no:'rektangel',es:'rectángulo',it:'rettangolo',pt:'retângulo',fr:'rectangle',fi:'suorakulmio'},
    shTriangle:   {en:'triangle',de:'Dreieck',nl:'driehoek',da:'trekant',sv:'triangel',no:'trekant',es:'triángulo',it:'triangolo',pt:'triângulo',fr:'triangle',fi:'kolmio'},
    shHexagon:    {en:'hexagon',de:'Sechseck',nl:'zeshoek',da:'sekskant',sv:'sexhörning',no:'sekskant',es:'hexágono',it:'esagono',pt:'hexágono',fr:'hexagone',fi:'kuusikulmio'},
    aShelf:       {en:'Cards',de:'Karten',nl:'Kaarten',da:'Kort',sv:'Kort',no:'Kort',es:'Tarjetas',it:'Cartoncini',pt:'Cartões',fr:'Cartes',fi:'Kortit'},
    aCard:        {en:'card {n}: {shape}, cut into {k} pieces',de:'Karte {n}: {shape}, in {k} Teile geschnitten',nl:'kaart {n}: {shape}, in {k} stukken geknipt',da:'kort {n}: {shape}, klippet i {k} stykker',sv:'kort {n}: {shape}, klippt i {k} bitar',no:'kort {n}: {shape}, klipt i {k} biter',es:'tarjeta {n}: {shape}, cortado en {k} piezas',it:'cartoncino {n}: {shape}, tagliato in {k} pezzi',pt:'cartão {n}: {shape}, cortado em {k} peças',fr:'carte {n} : {shape}, coupé en {k} morceaux',fi:'kortti {n}: {shape}, leikattu {k} palaan'},
    aCard1:       {en:'card {n}: {shape}, not cut',de:'Karte {n}: {shape}, nicht geschnitten',nl:'kaart {n}: {shape}, niet geknipt',da:'kort {n}: {shape}, ikke klippet',sv:'kort {n}: {shape}, inte klippt',no:'kort {n}: {shape}, ikke klipt',es:'tarjeta {n}: {shape}, sin cortar',it:'cartoncino {n}: {shape}, non tagliato',pt:'cartão {n}: {shape}, sem cortes',fr:'carte {n} : {shape}, pas coupé',fi:'kortti {n}: {shape}, leikkaamaton'},
    aMobile:      {en:'a mobile with {n} hooks',de:'ein Mobile mit {n} Haken',nl:'een mobiel met {n} haakjes',da:'en uro med {n} kroge',sv:'en mobil med {n} krokar',no:'en uro med {n} kroker',es:'un móvil con {n} ganchos',it:'una giostrina con {n} ganci',pt:'um móbile com {n} ganchos',fr:'un mobile à {n} crochets',fi:'mobile, jossa on {n} koukkua'},
    aLevel:       {en:'the mobile hangs level',de:'das Mobile hängt waagerecht',nl:'de mobiel hangt recht',da:'uroen hænger vandret',sv:'mobilen hänger vågrätt',no:'uroen henger vannrett',es:'el móvil queda nivelado',it:'la giostrina resta in equilibrio',pt:'o móbile fica equilibrado',fr:'le mobile est à l’horizontale',fi:'mobile roikkuu vaakasuorassa'},
    aTips:        {en:'the mobile tips',de:'das Mobile kippt',nl:'de mobiel helt over',da:'uroen tipper',sv:'mobilen lutar',no:'uroen tipper',es:'el móvil se inclina',it:'la giostrina si inclina',pt:'o móbile inclina',fr:'le mobile penche',fi:'mobile kallistuu'},
    aMany:        {en:'some pieces have no hook',de:'manche Teile haben keinen Haken',nl:'sommige stukken hebben geen haakje',da:'nogle stykker har ingen krog',sv:'några bitar har ingen krok',no:'noen biter har ingen krok',es:'algunas piezas no tienen gancho',it:'alcuni pezzi non hanno un gancio',pt:'algumas peças ficaram sem gancho',fr:'des morceaux n’ont pas de crochet',fi:'joillakin paloilla ei ole koukkua'},
    aFew:         {en:'some hooks are empty',de:'manche Haken sind leer',nl:'sommige haakjes zijn leeg',da:'nogle kroge er tomme',sv:'några krokar är tomma',no:'noen kroker er tomme',es:'algunos ganchos están vacíos',it:'alcuni ganci sono vuoti',pt:'alguns ganchos estão vazios',fr:'des crochets sont vides',fi:'jotkin koukut ovat tyhjiä'},
    setLevel:     {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lvHF:         {en:'Halves and fourths',de:'Hälften und Viertel',nl:'Helften en kwarten',da:'Halvdele og fjerdedele',sv:'Halvor och fjärdedelar',no:'Halvdeler og fjerdedeler',es:'Medios y cuartos',it:'Metà e quarti',pt:'Metades e quartos',fr:'Moitiés et quarts',fi:'Puolikkaat ja neljäsosat'},
    lvThirds:     {en:'Thirds and fair shares',de:'Drittel und gerechte Teile',nl:'Derden en eerlijke delen',da:'Tredjedele og retfærdige dele',sv:'Tredjedelar och rättvisa delar',no:'Tredjedeler og rettferdige deler',es:'Tercios y partes justas',it:'Terzi e parti giuste',pt:'Terços e partes justas',fr:'Tiers et parts équitables',fi:'Kolmasosat ja reilut osat'},
    lvName:       {en:'Name the share',de:'Den Teil benennen',nl:'Het deel benoemen',da:'Navngiv delen',sv:'Namnge delen',no:'Navngi delen',es:'Nombra la parte',it:'Dai un nome alla parte',pt:'Dê nome à parte',fr:'Nommer la part',fi:'Nimeä osa'},
    setBubble:    {en:'Spirit level',de:'Wasserwaage',nl:'Waterpas',da:'Vaterpas',sv:'Vattenpass',no:'Vater',es:'Nivel de burbuja',it:'Livella',pt:'Nível de bolha',fr:'Niveau à bulle',fi:'Vesivaaka'},
    bOn:          {en:'On',de:'An',nl:'Aan',da:'Til',sv:'På',no:'På',es:'Encendido',it:'Sì',pt:'Ligado',fr:'Oui',fi:'Päällä'},
    bOff:         {en:'Off',de:'Aus',nl:'Uit',da:'Fra',sv:'Av',no:'Av',es:'Apagado',it:'No',pt:'Desligado',fr:'Non',fi:'Pois päältä'}
  },/*STRINGS-END*/

  defaults: { level: 'hf', bubble: 'on' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'hf', labelKey: 'lvHF' }, { value: 'thirds', labelKey: 'lvThirds' }, { value: 'name', labelKey: 'lvName' }] },
    { key: 'bubble', type: 'choice', labelKey: 'setBubble', options: [{ value: 'on', labelKey: 'bOn' }, { value: 'off', labelKey: 'bOff' }] }
  ],
  OK_MS: 4200, FAST: false,
  UNIT: { halves: 2, thirds: 3, fourths: 4 },
  SHAPEKEY: { circle: 'shCircle', square: 'shSquare', rectangle: 'shRectangle', triangle: 'shTriangle', hexagon: 'shHexagon' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pos = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._raf = 0; this._drag = null; this._swing = null;
    injectFairMobileCSS();
  },
  destroy: function () { this._stopAnim(); this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return FairMobileCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return FairMobileCore.levelOf(this._setting('level')); },
  _bubble: function () { return this._setting('bubble') !== 'off'; },
  _key: function () { return this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = FairMobileCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = FairMobileCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      var P = C.plan(this._level(), Math.random, prevIds);
      this._order = P.order.map(function (id) { return pool.indexOf(id); }); this._pos = P.pos; this._orderForPool = pool; this._pass = pass;
    }
    var r = pool[this._order[at]], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'fairmobile.' + this._loc() + '.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function () { var st = this.st; if (!st) return ''; if (st.level === 'name') return this._t('tName'); return this._t({ halves: 'tHalves', thirds: 'tThirds', fourths: 'tFourths' }[st.want]); },
  _setPrompt: function () { var line = this._promptText(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._stopAnim(); this._clearTimers(); this._endDrag(); this._at = at || 0;
    var pos = this._pos ? this._pos[this._at] : null;
    this.st = FairMobileCore.newState(this._level(), r, { pos: pos });
    this._resetView(); this._setPrompt();
  },
  _resetView: function () { this._view = { showing: false, measure: false, glow: false, note: '', ok: '', sel: null, swing: 1, labels: false, bob: null }; },
  _clearShowing: function () { var v = this._view; v.showing = false; v.measure = false; v.glow = false; v.note = ''; v.bob = null; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._pool[0], 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'fm-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="fm-mobiles"></div><div class="fm-shelf"></div><div class="fm-foot"></div><p class="fm-note" aria-live="polite"></p><p class="fm-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  /* the geometry: one mobile (L1/L2) or three side by side (L3); four cards in a row, two by two on a phone */
  _dims: function () {
    var C = FairMobileCore, w = Math.min(this._width(), 700), B = C.band(this._width()), st = this.st, three = st.level === 'name';
    var mobW = three ? Math.floor((w - 16) / 3) : Math.min(w, 460);
    /* drawing lengths (the ANGLES come from the model; the arms keep the model's proportions: the ⅓ bar is 2 : 1).
       X = the widest reach (the fourths mobile: arm + sub-arm); one scale for every mobile of the round */
    var K = three ? { A: 104, E: 52, D: 70, X: 156, pad: 50, pf: 1.0 } : { A: 120, E: 48, D: 80, X: 168, pad: 60, pf: 0.8 };
    var sc = (mobW - 16) / (2 * K.X + K.pad), S28 = 0.47, drop = 44;
    /* headroom for a bar tipped 28°, the deepest hook of this round's mobile(s), then spring + stretch + piece, and the tray */
    var low = function (t) { return t === 'halves' ? K.A * S28 : t === 'fourths' ? K.A * S28 + drop + K.E * S28 : Math.max(2 * K.D * S28, K.D * S28 + drop + K.E * S28); };
    var deep = three ? low('fourths') : low(st.mobiles[0]);
    var mobH = Math.round(16 + K.A * S28 * sc + (deep + 6 + 16 + 50 + 92 * K.pf + (three ? 18 : 0)) * sc + 30 + (three ? 44 : 0));
    var n = st.cards.length, cols = three ? 1 : (B.wide ? 4 : 4), gap = 8;
    var card = three ? (B.wide ? 140 : 120) : Math.min(132, Math.floor((w - (cols - 1) * gap) / cols));
    return { w: w, wide: B.wide, tiny: B.tiny, three: three, mobW: mobW, mobH: mobH, sc: sc, K: K, drop: drop, card: card, cols: cols, gap: gap };
  },

  /* ---- drawing ---- */
  _pieceSvgPath: function (poly, ox, oy, s) { return 'M' + poly.map(function (p) { return f1(ox + p[0] * s) + ' ' + f1(oy + p[1] * s); }).join('L') + 'Z'; },
  _cardSvg: function (id, px, shaded) {
    var C = FairMobileCore, cd = C.card(id), s = (px - 8) / 100, o = 4, out = '<svg class="fm-cardsvg" width="' + px + '" height="' + px + '" viewBox="0 0 ' + px + ' ' + px + '" aria-hidden="true" focusable="false">', self = this;
    cd.pieces.forEach(function (p, i) { out += '<path d="' + self._pieceSvgPath(p.poly, o, o, s) + '" fill="' + (shaded && i === 0 ? '#2BA392' : (i % 2 ? '#F3D9AE' : '#FBE7C6')) + '" stroke="#5A4630" stroke-width="2" stroke-dasharray="5 3" stroke-linejoin="round"/>'; });
    out += '<path d="' + this._pieceSvgPath(cd.outline, o, o, s) + '" fill="none" stroke="#3A2E1F" stroke-width="3" stroke-linejoin="round"/>';
    return out + '</svg>';
  },
  /* one mobile, drawn at its settled (or held) angles, with its pieces on springs */
  _mobileSvg: function (D, type, mi) {
    var C = FairMobileCore, G = C.DATA.GEOM, st = this.st, v = this._view, s = D.sc, W = D.mobW, H = D.mobH, self = this;
    var hungHere = st.hung != null && st.on === mi, H2 = hungHere ? C.current(st) : null, cd = hungHere ? C.card(st.cards[st.hung]) : null;
    var released = hungHere && !st.pin && !v.measure, sw = released ? v.swing : 0;
    var ang = H2 ? H2.angles : {}, A = function (k) { return (ang[k] || 0) * sw; };
    var K = D.K, cx = type === 'thirds' ? W / 2 + (K.D - K.E) / 2 * s : W / 2, pv = [cx, 16 + K.A * 0.47 * s];
    var out = '<svg class="fm-mobile" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true" focusable="false">';
    out += '<path d="M' + f1(cx - 9) + ' 4h18" stroke="#3A2E1F" stroke-width="3" stroke-linecap="round"/><line x1="' + f1(cx) + '" y1="4" x2="' + f1(pv[0]) + '" y2="' + f1(pv[1]) + '" stroke="#5A4630" stroke-width="2"/>';
    /* a bar: from its pivot p, turned by a degrees, arms [l, r] in model units; returns the world points of its ends */
    var bar = function (p, l, r, a, main) {
      var t = a * Math.PI / 180, dy = G.h * s * 0.55, c = Math.cos(t), sn = Math.sin(t);
      var P = function (x) { return [p[0] + x * s * c - dy * sn, p[1] + x * s * sn + dy * c]; };
      var e0 = P(l), e1 = P(r);
      out += '<line x1="' + f1(e0[0]) + '" y1="' + f1(e0[1]) + '" x2="' + f1(e1[0]) + '" y2="' + f1(e1[1]) + '" stroke="#3A2E1F" stroke-width="' + (main ? 10 : 8) + '" stroke-linecap="round"/>';
      out += '<line x1="' + f1(e0[0]) + '" y1="' + f1(e0[1]) + '" x2="' + f1(e1[0]) + '" y2="' + f1(e1[1]) + '" stroke="#C99A6B" stroke-width="' + (main ? 6 : 4.5) + '" stroke-linecap="round"/>';
      out += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="3.5" fill="#C9A54E" stroke="#3A2E1F" stroke-width="1.2"/>';
      var mid = P(0);
      if (main && self._bubble()) {
        /* the spirit level: a vial on the bar, its bubble sliding toward the high end */
        var vw = 30 + 14 * s, off = Math.max(-1, Math.min(1, -a / 14)) * (vw / 2 - 6);
        out += '<g transform="translate(' + f1(mid[0]) + ' ' + f1(mid[1]) + ') rotate(' + f1(a) + ')"><rect x="' + f1(-vw / 2) + '" y="-6" width="' + f1(vw) + '" height="12" rx="6" fill="#E3F2EF" stroke="#3A2E1F" stroke-width="1.5"/><line x1="-6" y1="-6" x2="-6" y2="6" stroke="#146B5E" stroke-width="1.2"/><line x1="6" y1="-6" x2="6" y2="6" stroke="#146B5E" stroke-width="1.2"/><circle class="fm-bubble" cx="' + f1(off) + '" cy="0" r="4.2" fill="#FFFFFF" stroke="#146B5E" stroke-width="1.2"/></g>';
      }
      if (main && hungHere && st.pin && !st.done) out += '<g transform="translate(' + f1(mid[0] + (self._bubble() ? 30 + 14 * s : 14)) + ' ' + f1(mid[1]) + ')"><rect x="-3" y="-11" width="6" height="22" rx="3" fill="#C9A54E" stroke="#3A2E1F" stroke-width="1.2"/></g>';
      return [e0, e1];
    };
    /* hooks: the world point of every hook, left to right */
    var hooks = [], ga = K.A, ge = K.E, gd = K.D;
    var hang = function (p) { return [p[0], p[1] + D.drop * s]; };
    if (type === 'halves') { var e = bar(pv, -ga, ga, A('top'), true); hooks = [e[0], e[1]]; }
    else if (type === 'fourths') {
      var t2 = bar(pv, -ga, ga, A('top'), true), p1 = hang(t2[0]), p2 = hang(t2[1]);
      out += '<line x1="' + f1(t2[0][0]) + '" y1="' + f1(t2[0][1]) + '" x2="' + f1(p1[0]) + '" y2="' + f1(p1[1]) + '" stroke="#5A4630" stroke-width="1.8"/><line x1="' + f1(t2[1][0]) + '" y1="' + f1(t2[1][1]) + '" x2="' + f1(p2[0]) + '" y2="' + f1(p2[1]) + '" stroke="#5A4630" stroke-width="1.8"/>';
      var s1 = bar(p1, -ge, ge, A('sub1')), s2 = bar(p2, -ge, ge, A('sub2'));
      hooks = [s1[0], s1[1], s2[0], s2[1]];
    } else {
      var t3 = bar(pv, -2 * gd, gd, A('top'), true), p3 = hang(t3[1]);
      out += '<line x1="' + f1(t3[1][0]) + '" y1="' + f1(t3[1][1]) + '" x2="' + f1(p3[0]) + '" y2="' + f1(p3[1]) + '" stroke="#5A4630" stroke-width="1.8"/>';
      var s3 = bar(p3, -ge, ge, A('sub'));
      hooks = [t3[0], s3[0], s3[1]];
    }
    /* the springs and the pieces */
    var nH = hooks.length, rest = 16 * s + 6, fairLen = 40 * s * 0.7, pieceS = s * K.pf;
    var showStretch = released || v.measure || st.done, maxY = 0, glowHi = -1, glowLo = -1;
    if (H2 && (v.glow || v.measure) && !st.done) { var ws = H2.hooks.map(function (pi) { return pi == null ? null : cd.pieces[pi].w; }); var hi = -1, lo = 2; ws.forEach(function (x, i) { if (x == null) return; if (x > hi) { hi = x; glowHi = i; } if (x < lo) { lo = x; glowLo = i; } }); if (Math.abs(hi - lo) < 1e-6) { glowHi = glowLo = -1; } }
    hooks.forEach(function (hk, i) {
      out += '<path d="M' + f1(hk[0]) + ' ' + f1(hk[1]) + 'v4a3 3 0 1 0 3 3" fill="none" stroke="#3A2E1F" stroke-width="1.6"/>';
      var pi = H2 ? H2.hooks[i] : null;
      if (pi == null) { if (H2) out += '<circle class="fm-bare" cx="' + f1(hk[0]) + '" cy="' + f1(hk[1] + 10) + '" r="5" fill="none" stroke="#C2410C" stroke-width="1.6" stroke-dasharray="3 2"/>'; return; }
      var P = cd.pieces[pi], len = rest + (showStretch ? Math.min(C.stretch(P.w, type), 72) * 0.7 * s : 0) /* fully stretched at 1.8 fair lengths: every unequal share is below that */, y0 = hk[1] + 6, y1 = y0 + len;
      out += self._spring(hk[0], y0, y1);
      var bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity; P.poly.forEach(function (q) { bx0 = Math.min(bx0, q[0]); by0 = Math.min(by0, q[1]); bx1 = Math.max(bx1, q[0]); by1 = Math.max(by1, q[1]); });
      var ox = hk[0] - P.cx * pieceS, oy = y1 + 3 - by0 * pieceS;
      var shaded = st.level === 'name' && pi === 0;
      out += '<path class="fm-piece' + (i === glowHi ? ' is-heavy' : '') + (i === glowLo ? ' is-light' : '') + '" d="' + self._pieceSvgPath(P.poly, ox, oy, pieceS) + '" fill="' + (shaded ? '#2BA392' : (pi % 2 ? '#F3D9AE' : '#FBE7C6')) + '" stroke="#3A2E1F" stroke-width="2.2" stroke-linejoin="round"/>';
      maxY = Math.max(maxY, oy + by1 * pieceS);
      /* miss 2: the extra (or missing) spring length against the fair line */
      if (v.measure && !st.done) { var fy = y0 + rest + fairLen; if (Math.abs(y1 - fy) > 1) out += '<line class="fm-extra ' + (y1 > fy ? 'is-long' : 'is-short') + '" x1="' + f1(hk[0] + 8) + '" y1="' + f1(fy) + '" x2="' + f1(hk[0] + 8) + '" y2="' + f1(y1) + '"/>'; }
      if (st.done && v.labels) { var cc = D.three ? [hk[0], oy + by1 * pieceS + 10] : [ox + P.cx * pieceS, oy + P.cy * pieceS], dn = st.level === 'name' ? self.UNIT[st.want] : nH; out += '<g class="fm-label" transform="translate(' + f1(cc[0]) + ' ' + f1(cc[1]) + ')"><text y="-3" text-anchor="middle">1</text><line x1="-6" y1="1" x2="6" y2="1" stroke="#146B5E" stroke-width="1.6"/><text y="13" text-anchor="middle">' + dn + '</text></g>'; }
    });
    if ((v.measure || st.done) && H2 && !H2.empty) { var ry = hooks[0][1] + 6 + rest + fairLen; if (!st.done || v.measure) out += '<line class="fm-fair" x1="8" y1="' + f1(ry) + '" x2="' + f1(W - 8) + '" y2="' + f1(ry) + '"/>'; else out += '<line class="fm-fair is-ok" x1="8" y1="' + f1(ry) + '" x2="' + f1(W - 8) + '" y2="' + f1(ry) + '"/>'; }
    /* the spare tray: pieces with no hook */
    {
      var tw = Math.min(110, W * 0.26), tx = W - tw - 6, ty = H - 24;
      out += '<path d="M' + f1(tx) + ' ' + f1(ty) + 'h' + f1(tw) + 'l-6 18h' + f1(-tw + 12) + 'z" fill="#E9D3B0" stroke="#3A2E1F" stroke-width="2"/>';
      if (H2 && H2.spare.length) H2.spare.forEach(function (pi, k) { var P = cd.pieces[pi], q = 0.22 * s, ox = tx + 10 + k * (tw - 20) / Math.max(1, H2.spare.length) - P.poly[0][0] * 0; out += '<path class="fm-spare" d="' + self._pieceSvgPath(P.poly, ox - 8, ty - 18, q) + '" fill="#FBE7C6" stroke="#3A2E1F" stroke-width="1.5"/>'; });
    }
    /* level 3: the name plate under the pivot */
    if (D.three) {
      /* the stacked fraction, and its word beside it where the plate has room (the success line always says it) */
      var n = this.UNIT[type], py = H - 42, PX = 6, word = this._t({ halves: 'plHalf', thirds: 'plThird', fourths: 'plFourth' }[type]);
      var wordW = word.length * 7.4 + 14, fits = 44 + wordW <= W * 0.66, PW = fits ? 44 + wordW : 44;
      out += '<g class="fm-plate"><rect x="' + f1(PX) + '" y="' + f1(py) + '" width="' + f1(PW) + '" height="38" rx="8" fill="#0E3B34"/><text x="' + f1(PX + 22) + '" y="' + f1(py + 16) + '" text-anchor="middle" class="fm-pn">1</text><line x1="' + f1(PX + 15) + '" y1="' + f1(py + 20) + '" x2="' + f1(PX + 29) + '" y2="' + f1(py + 20) + '" stroke="#FFF8E7" stroke-width="2"/><text x="' + f1(PX + 22) + '" y="' + f1(py + 34) + '" text-anchor="middle" class="fm-pn">' + n + '</text>' + (fits ? '<text x="' + f1(PX + 38 + wordW / 2) + '" y="' + f1(py + 24) + '" text-anchor="middle" class="fm-pw">' + esc(word) + '</text>' : '') + '</g>';
    }
    void maxY;
    return out + '</svg>';
  },
  _spring: function (x, y0, y1) { var n = 7, dy = (y1 - y0) / n, d = 'M' + f1(x) + ' ' + f1(y0); for (var i = 0; i < n; i++) d += 'L' + f1(x + (i % 2 ? -4 : 4)) + ' ' + f1(y0 + dy * (i + 0.5)); d += 'L' + f1(x) + ' ' + f1(y1); return '<path class="fm-spring" d="' + d + '" fill="none" stroke="#8C6A45" stroke-width="1.8" stroke-linejoin="round"/>'; },
  _paint_: function () {
    var C = FairMobileCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'fm-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + st.level;
    var mbs = this._qs('.fm-mobiles'); mbs.innerHTML = '';
    st.mobiles.forEach(function (type, mi) {
      var b = self._btn('fm-mob' + (v.bob === mi ? ' is-bob' : '') + (st.on === mi && st.hung != null ? ' is-on' : '') + (st.done && st.on === mi ? ' is-level' : ''), 'mobile-' + mi, self._t('aMobile', { n: C.DATA.HOOKS[type] }), self._mobileSvg(D, type, mi));
      b.setAttribute('data-drop', String(mi));
      b.style.width = D.mobW + 'px'; b.style.height = D.mobH + 'px';
      b.addEventListener('click', function () { self._mobileTap(mi); });
      b.addEventListener('keydown', function (e) { if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); if (!st.done && st.hung != null) { C.takeDown(st); self._afterHang(); } } });
      mbs.appendChild(b);
    });
    /* the card shelf */
    var shelf = this._qs('.fm-shelf'); shelf.innerHTML = ''; shelf.setAttribute('role', 'group'); shelf.setAttribute('aria-label', this._t('aShelf'));
    shelf.style.gridTemplateColumns = 'repeat(' + (D.three ? 1 : D.cols) + ', ' + D.card + 'px)';
    st.cards.forEach(function (id, i) {
      var cd = C.card(id), lab = self._t(cd.pieces.length === 1 ? 'aCard1' : 'aCard', { n: i + 1, shape: self._t(self.SHAPEKEY[cd.shape]), k: cd.pieces.length });
      var b = self._btn('fm-card' + (st.hung === i ? ' is-hung' : '') + (v.sel === i ? ' is-sel' : ''), 'card-' + i, lab, self._cardSvg(id, D.card - 10, st.level === 'name'));
      b.style.width = b.style.height = D.card + 'px';
      b.setAttribute('aria-pressed', st.hung === i ? 'true' : 'false');
      self._wireCard(b, i);
      shelf.appendChild(b);
    });
    var foot = this._qs('.fm-foot'); foot.innerHTML = '';
    var chk = this._btn('fm-check', 'check', null, esc(this._t('check'))); chk.disabled = st.done;
    chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.fm-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'fm-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'fm-note is-hint'; }
    else { note.textContent = ''; note.className = 'fm-note'; }
  },

  /* ---------------- the hand ---------------- */
  _wireCard: function (b, i) {
    var self = this;
    b.addEventListener('click', function () { if (self._swallowEl === b && Date.now() - self._swallow < 400) return; self._cardTap(i); });
    b.addEventListener('pointerdown', function (e) { self._down(e, i, b); });
  },
  /* one mobile: a tap hangs the card on it; three mobiles: a tap chooses the card, a tap on a mobile hangs it */
  _cardTap: function (i) {
    var st = this.st, v = this._view;
    if (st.level === 'name') { v.sel = v.sel === i ? null : i; this._paint(); return; }
    if (st.hung === i) { FairMobileCore.takeDown(st); this.api.sound(300); }
    else { FairMobileCore.hangCard(st, i, 0); this.api.sound(420); }
    this._afterHang();
  },
  _mobileTap: function (mi) {
    var st = this.st, v = this._view, C = FairMobileCore;
    if (st.level === 'name' && v.sel != null && !(st.hung === v.sel && st.on === mi)) { C.hangCard(st, v.sel, mi); v.sel = null; this.api.sound(420); this._afterHang(); return; }
    if (st.hung != null && st.on === mi && !st.done) { C.takeDown(st); this.api.sound(300); this._afterHang(); }
  },
  /* any hang or take-down: the help is taken away until the next Check; in free play the mobile swings at once */
  _afterHang: function () {
    var st = this.st;
    if (!st.done) this._clearShowing();
    else { this._view.labels = false; if (st.hung != null) { st.pin = false; this._swingTo(); return; } }
    this._paint();
  },
  _down: function (e, i, src) {
    if (e.button != null && e.button !== 0) return;
    var self = this, x0 = e.clientX, y0 = e.clientY, drag = { moved: false, ghost: null, over: null };
    var move = function (ev) {
      if (!drag.moved && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 8) return;
      if (!drag.moved) { drag.moved = true; self._drag = drag; var g = document.createElement('div'); g.className = 'fm-ghost'; g.innerHTML = src.querySelector('svg').outerHTML; document.body.appendChild(g); drag.ghost = g; src.classList.add('is-lifted'); }
      ev.preventDefault();
      drag.ghost.style.left = (ev.clientX - 40) + 'px'; drag.ghost.style.top = (ev.clientY - 40) + 'px';
      drag.ghost.style.display = 'none'; var el = document.elementFromPoint(ev.clientX, ev.clientY); drag.ghost.style.display = '';
      var t = el && el.closest ? el.closest('[data-drop]') : null; if (drag.over && drag.over !== t) drag.over.classList.remove('is-over'); drag.over = t; if (t) t.classList.add('is-over');
    };
    var up = function () {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      if (!drag.moved) return;
      self._swallow = Date.now(); self._swallowEl = src;
      var t = drag.over ? +drag.over.getAttribute('data-drop') : null; self._endDrag();
      if (t != null) { FairMobileCore.hangCard(self.st, i, t); self._view.sel = null; self.api.sound(420); self._afterHang(); }
      else self._paint();
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  },
  _endDrag: function () { var d = this._drag; if (!d) return; if (d.ghost && d.ghost.parentNode) d.ghost.parentNode.removeChild(d.ghost); if (d.over) d.over.classList.remove('is-over'); this._drag = null; },

  /* ---------------- Check ---------------- */
  _stopAnim: function () { if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; } },
  _reduced: function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } },
  /* the pin is out: a damped swing to the settled angles (about three swings in 1.6 s) */
  _swingTo: function (done) {
    var self = this, v = this._view;
    if (this.FAST || this._reduced() || typeof requestAnimationFrame === 'undefined') { v.swing = 1; this._paint(); if (done) done(); return; }
    this._stopAnim(); var t0 = null, ms = 1600;
    var tick = function (now) {
      if (t0 == null) t0 = now; var p = Math.min(1, (now - t0) / ms);
      v.swing = 1 - Math.exp(-4 * p) * Math.cos(3 * 2 * Math.PI * p) * (1 - p) ; if (p >= 1) v.swing = 1;
      self._paint();
      if (p < 1) self._raf = requestAnimationFrame(tick); else { self._raf = 0; if (done) done(); }
    };
    v.swing = 0; this._raf = requestAnimationFrame(tick);
  },
  _sr: function (s) { var el = this._qs('.fm-sr'); if (el) el.textContent = s; },
  _check: function () {
    var C = FairMobileCore, st = this.st, v = this._view, self = this;
    if (st.done) return;
    var a = C.check(st);
    if (a.result === 'tray') { this.api.sound(200); v.note = this._t('hintEmpty'); v.bob = 0; this._paint(); this.api.announce(v.note); this._later(function () { v.bob = null; }, 900); return; }
    var H = C.current(st);
    this._sr(this._t(H.spare.length ? 'aMany' : H.empty ? 'aFew' : H.level ? 'aLevel' : 'aTips'));
    if (a.result === 'ok') {
      v.showing = false; v.measure = false; v.note = '';
      var n = st.level === 'name' ? this.UNIT[st.want] : this.UNIT[st.want];
      v.ok = st.level === 'name' ? this._t({ 2: 'ok3Half', 3: 'ok3Third', 4: 'ok3Fourth' }[n]) : this._t({ 2: 'okHalves', 3: 'okThirds', 4: 'okFourths' }[n]);
      this.api.sound(880);
      this._swingTo(function () { v.labels = true; self._paint(); self.api.announce(v.ok); });
      this._advance(v.ok.length * 60 + 3600);
      return;
    }
    this.api.sound(220);
    var hk = C.hint(st);
    v.showing = true; v.note = this._t(hk.key); v.glow = true;
    if (st.show >= 2 && a.kind === 'uneq') { v.measure = true; st.pin = true; this._paint(); this.api.announce(v.note); return; }
    if (st.show >= 2 && st.level === 'name') { var want = C.card(st.cards[st.hung]).pieces.length; v.bob = st.mobiles.findIndex(function (m) { return C.DATA.HOOKS[m] === want; }); }
    this._swingTo(function () { self.api.announce(v.note); });
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

function f1(x) { return Math.round(x * 10) / 10; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectFairMobileCSS() {
  if (typeof document === 'undefined' || document.getElementById('fm-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.fm-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .fm-wrap:focus{outline:none;} .fm-wrap.is-narrow{gap:8px;}'
  + '.fm-mobiles{display:flex;justify-content:center;gap:8px;width:100%;}'
  + '.fm-mob{padding:0;border:2px solid transparent;border-radius:16px;background:linear-gradient(#FFFDF6,#F6ECDA);cursor:pointer;line-height:0;touch-action:none;} .fm-mob.is-over{border-color:#1F8A78;box-shadow:0 0 0 3px #CFE7DF;} .fm-mob.is-bob{animation:fmBob .5s ease-in-out 3;} @keyframes fmBob{50%{transform:translateY(-6px);}}'
  + '.fm-mob.is-level svg{animation:fmTurn 4s ease-in-out infinite;} @keyframes fmTurn{0%,100%{transform:scaleX(1);}50%{transform:scaleX(.94);}}'
  + '.fm-wrap.is-fast .fm-mob,.fm-wrap.is-fast .fm-mob svg,.fm-wrap.is-fast .fm-card{animation:none !important;}'
  + '.fm-piece.is-heavy{filter:drop-shadow(0 0 5px #F2784B);} .fm-piece.is-light{filter:drop-shadow(0 0 5px #1F8A78);}'
  + '.fm-fair{stroke:#146B5E;stroke-width:2;stroke-dasharray:7 5;} .fm-fair.is-ok{stroke-dasharray:none;stroke-opacity:.6;}'
  + '.fm-extra{stroke-width:5;stroke-linecap:round;} .fm-extra.is-long{stroke:#E0503C;} .fm-extra.is-short{stroke:#1F8A78;}'
  + '.fm-label text{font-family:' + H + ';font-weight:800;font-size:13px;fill:#0E3B34;}'
  + '.fm-pn{font-family:' + H + ';font-weight:800;font-size:16px;fill:#FFF8E7;} .fm-pw{font-family:' + B + ';font-weight:800;font-size:12px;fill:#FFF8E7;}'
  + '.fm-shelf{display:grid;justify-content:center;gap:8px;padding:6px 6px 10px;border-bottom:6px solid #C99A6B;border-radius:0 0 4px 4px;}'
  + '.fm-card{display:flex;align-items:center;justify-content:center;padding:0;border:2px solid #E2CFAE;border-radius:14px;background:#FFF8EC;cursor:pointer;touch-action:none;} .fm-card.is-hung{border-style:dashed;opacity:.45;} .fm-card.is-sel{border-color:#F4CF62;box-shadow:0 0 0 3px #F4CF62;} .fm-card.is-lifted{opacity:.3;}'
  + '.fm-ghost{position:fixed;z-index:50;width:80px;height:80px;pointer-events:none;filter:drop-shadow(0 6px 6px rgba(58,46,31,.3));} .fm-ghost svg{width:80px;height:80px;}'
  + '.fm-foot{display:flex;justify-content:center;width:100%;}'
  + '.fm-check{min-width:150px;min-height:54px;padding:8px 28px;border:0;border-radius:16px;background:#1F8A78;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0E5A4D;cursor:pointer;} .fm-check:disabled{opacity:.5;cursor:default;}'
  + '.fm-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .fm-note.is-hint{color:#8A3B1F;} .fm-wrap.is-narrow .fm-note{font-size:17px;}'
  + '.fm-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.fm-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'fm-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.FairMobileActivity = FairMobileActivity;
