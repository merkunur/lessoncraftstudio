/* =====================================================================
   TOOL #17 — MEASUREMENT BENCH   (measurement-bench.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #17 of the Premium Tools Program
   (Wave 3) — the Math Table measurement tool: three illustrated benches.
   LENGTH: lay paperclips/cubes end-to-end along real image-library
   nouns; the classic K-3 gaps-and-overlaps misconception is met with a
   kindly "scooch" that closes the chain (physics + warmth, never a
   verdict). CAPACITY: press-and-hold pouring between graduated beakers
   with liquid and glugs — estimate first, then pour. WEIGHT: a real
   spring-physics balance scale weighing image-library objects in cubes
   ("The fox weighs 8 cubes!"). Estimate-then-measure is the routine on
   every bench; a guess is celebrated as thinking.

   NO-SHAME (operator-locked): no timers, scores, streaks or verdict
   colors anywhere a child can see. The estimate comparison is pure
   juxtaposition ("You guessed 6 · It measured 8") — never right/wrong.
   The scooch/overshoot voice lines fire at most ONCE per kind per
   session. Silence is the "not yet" channel.

   FREE = the length bench WITH the estimate chip (operator-ruled).
   PREMIUM = capacity + weight benches, the estimate log, saved setups.
   Gating is structural: premium benches render the gate panel unless
   entitled — a ?bench= deep link cannot leak premium DOM.

   SELF-CONTAINED: lattice evaluation copied from lay-units-core.js
   patterns; beaker SVG from pond-juice-activity.js; pour conservation
   from pour-measure-core.js; tick/formatLength conventions from the
   free ruler.js (dot-decimal cm, eighth-inch fractions, literal
   'cm'/'in'). Nothing imported; 0 lines to any core or the shell.
   Noun phrases are HAND-AUTHORED PER-LOCALE LITERALS (the sv-render
   doctrine — Nordic definite forms are suffixes; we never compose
   articles at runtime). Images resolve against pww-index-en at gate
   time; the client fetches nothing.
   ===================================================================== */
var MeasurementBench = {
  id: 'measurement-bench',

  strings: {
    title:        {en:'Measurement Bench',de:'Die Messwerkstatt',fr:'L’atelier des mesures',it:'Il banco delle misure',es:'El taller de medir',pt:'A bancada de medidas',nl:'De meetwerkbank',sv:'Mätbänken',da:'Målebænken',no:'Målebenken',fi:'Mittauspaja'},
    instruction:  {en:'Guess first, then measure — length, capacity, and weight.',de:'Erst schätzen, dann messen — Länge, Füllmenge und Gewicht.',fr:'Estime d’abord, puis mesure — longueur, contenance et poids.',it:'Prima stima, poi misura — lunghezza, capacità e peso.',es:'Primero estima, luego mide — longitud, capacidad y peso.',pt:'Primeiro estime, depois meça — comprimento, capacidade e peso.',nl:'Eerst schatten, dan meten — lengte, inhoud en gewicht.',sv:'Gissa först, mät sedan — längd, volym och vikt.',da:'Gæt først, mål bagefter — længde, rumfang og vægt.',no:'Gjett først, mål etterpå — lengde, volum og vekt.',fi:'Arvioi ensin, mittaa sitten — pituus, tilavuus ja paino.'},
    tabLength:    {en:'Length',de:'Länge',fr:'Longueur',it:'Lunghezza',es:'Longitud',pt:'Comprimento',nl:'Lengte',sv:'Längd',da:'Længde',no:'Lengde',fi:'Pituus'},
    tabCapacity:  {en:'Capacity',de:'Füllmenge',fr:'Contenance',it:'Capacità',es:'Capacidad',pt:'Capacidade',nl:'Inhoud',sv:'Volym',da:'Rumfang',no:'Volum',fi:'Tilavuus'},
    tabWeight:    {en:'Weight',de:'Gewicht',fr:'Poids',it:'Peso',es:'Peso',pt:'Peso',nl:'Gewicht',sv:'Vikt',da:'Vægt',no:'Vekt',fi:'Paino'},
    /* unit nouns — s = singular, p = plural (count-aware slots) */
    unitClipS:    {en:'paperclip',de:'Büroklammer',fr:'trombone',it:'graffetta',es:'clip',pt:'clipe',nl:'paperclip',sv:'gem',da:'clips',no:'binders',fi:'klemmari'},
    unitClipP:    {en:'paperclips',de:'Büroklammern',fr:'trombones',it:'graffette',es:'clips',pt:'clipes',nl:'paperclips',sv:'gem',da:'clips',no:'binderser',fi:'klemmaria'},
    unitCubeS:    {en:'cube',de:'Würfel',fr:'cube',it:'cubetto',es:'cubo',pt:'cubinho',nl:'blokje',sv:'kub',da:'terning',no:'kube',fi:'kuutio'},
    unitCubeP:    {en:'cubes',de:'Würfel',fr:'cubes',it:'cubetti',es:'cubos',pt:'cubinhos',nl:'blokjes',sv:'kuber',da:'terninger',no:'kuber',fi:'kuutiota'},
    cupS:         {en:'cup',de:'Becher',fr:'gobelet',it:'misurino',es:'taza',pt:'copinho',nl:'beker',sv:'mugg',da:'kop',no:'kopp',fi:'kupillinen'},
    cupP:         {en:'cups',de:'Becher',fr:'gobelets',it:'misurini',es:'tazas',pt:'copinhos',nl:'bekers',sv:'muggar',da:'kopper',no:'kopper',fi:'kupillista'},
    /* estimate-then-measure */
    estPromptLen: {en:'How many {unitP} long is {noun}?',de:'Wie viele {unitP} lang ist {noun}?',fr:'Combien de {unitP} mesure {noun} ?',it:'Quanto misura {noun} in {unitP}?',es:'¿Cuántos {unitP} mide {noun}?',pt:'Quantos {unitP} mede {noun}?',nl:'Hoeveel {unitP} lang is {noun}?',sv:'Hur många {unitP} mäter {noun}?',da:'Hvor mange {unitP} måler {noun}?',no:'Hvor mange {unitP} måler {noun}?',fi:'Mitataan {noun}! Montako {unitP} tarvitaan?'},
    estPromptCap: {en:'How many {unitP} fit in {noun}?',de:'Wie viele {unitP} fasst {noun}?',fr:'Combien de {unitP} tiennent dans {noun} ?',it:'Quanti {unitP} può contenere {noun}?',es:'¿Cuántas {unitP} caben en {noun}?',pt:'Quantos {unitP} enchem {noun}?',nl:'Hoeveel {unitP} passen er in {noun}?',sv:'Hur många {unitP} ryms i {noun}?',da:'Hvor mange {unitP} kan der være i {noun}?',no:'Hvor mange {unitP} får plass i {noun}?',fi:'Montako {unitP} mahtuu {noun}?'},
    estPromptWt:  {en:'How many {unitP} does {noun} weigh?',de:'Wie viele {unitP} wiegt {noun}?',fr:'Combien de {unitP} pèse {noun} ?',it:'Quanti {unitP} pesa {noun}?',es:'¿Cuántos {unitP} pesa {noun}?',pt:'Quantos {unitP} pesa {noun}?',nl:'Hoeveel {unitP} weegt {noun}?',sv:'Hur många {unitP} väger {noun}?',da:'Hvor mange {unitP} vejer {noun}?',no:'Hvor mange {unitP} veier {noun}?',fi:'Montako {unitP} {noun} painaa?'},
    estPin:       {en:'Pin my guess',de:'Meine Schätzung merken',fr:'Noter mon estimation',it:'Segna la mia stima',es:'Anotar mi estimación',pt:'Anotar meu palpite',nl:'Mijn schatting bewaren',sv:'Spara min gissning',da:'Gem mit gæt',no:'Lagre gjetningen min',fi:'Merkitse arvioni'},
    estNote:      {en:'My guess: {n} {unit}',de:'Meine Schätzung: {n} {unit}',fr:'Mon estimation : {n} {unit}',it:'La mia stima: {n} {unit}',es:'Mi estimación: {n} {unit}',pt:'Meu palpite: {n} {unit}',nl:'Mijn schatting: {n} {unit}',sv:'Min gissning: {n} {unit}',da:'Mit gæt: {n} {unit}',no:'Min gjetning: {n} {unit}',fi:'Arvioni: {n} {unit}'},
    compareLine:  {en:'You guessed {g} · It measured {n}',de:'Geschätzt: {g} · Gemessen: {n}',fr:'Estimé : {g} · Mesuré : {n}',it:'Stimato: {g} · Misurato: {n}',es:'Tu estimación: {g} · La medida: {n}',pt:'Seu palpite: {g} · A medida: {n}',nl:'Geschat: {g} · Gemeten: {n}',sv:'Du gissade {g} · Det blev {n}',da:'Dit gæt: {g} · Målt: {n}',no:'Gjettet: {g} · Målt: {n}',fi:'Arvio: {g} · Mittaus: {n}'},
    thinkLine:    {en:'A guess and a measure — that’s how scientists work!',de:'Schätzen und messen — genau so arbeiten Forscherinnen und Forscher!',fr:'Estimer, puis mesurer — c’est comme ça que travaillent les scientifiques !',it:'Stimare e misurare — è così che lavorano gli scienziati!',es:'Estimar y medir — ¡así trabajan los científicos!',pt:'Primeiro o palpite, depois a medida — é assim que os cientistas trabalham!',nl:'Schatten en meten — zo werken echte wetenschappers!',sv:'Att gissa och sedan mäta — precis så jobbar forskare!',da:'At gætte og måle — sådan arbejder forskere!',no:'Å gjette og måle — akkurat slik jobber forskere!',fi:'Arvio ja mittaus — juuri näin tutkijat työskentelevät!'},
    /* length bench */
    countBtn:     {en:'Count',de:'Zählen',fr:'Compter',it:'Conta',es:'Contar',pt:'Contar',nl:'Tellen',sv:'Räkna',da:'Tæl',no:'Tell',fi:'Laske'},
    lengthDone:   {en:'{noun} is {n} {unitP} long!',de:'{noun} ist {n} {unitP} lang!',fr:'{noun} mesure {n} {unitP} !',it:'{noun} misura {n} {unitP}!',es:'{noun} mide {n} {unitP} — ¡listo!',pt:'{noun} mede {n} {unitP}!',nl:'{noun} is {n} {unitP} lang!',sv:'{noun} mäter {n} {unitP}!',da:'{noun} måler {n} {unitP}!',no:'{noun} måler {n} {unitP}!',fi:'{noun} on mitattu — pituus {n} {unitP}!'},
    notCovered:   {en:'Part of {noun} isn’t covered yet — add more!',de:'Schau, {noun} ist noch nicht ganz bedeckt — leg noch mehr an!',fr:'Il reste un bout à couvrir sur {noun} — ajoutes-en !',it:'Guarda {noun}: un pezzetto è ancora scoperto — aggiungine ancora!',es:'{noun} todavía tiene una parte sin cubrir — ¡pon más!',pt:'{noun} ainda tem um pedacinho sem cobrir — coloque mais!',nl:'Een stukje van {noun} is nog niet bedekt — leg er nog wat bij!',sv:'En bit av {noun} är inte täckt än — lägg dit fler!',da:'Et stykke af {noun} er ikke dækket endnu — læg flere på!',no:'En del av {noun} er ikke dekket ennå — legg på flere!',fi:'Osa on vielä paljaana — peitä {noun} kokonaan!'},
    scoochLine:   {en:'Let’s snuggle the {unitP} together so nothing is missed.',de:'Wir rücken die {unitP} zusammen, damit nichts fehlt.',fr:'On serre les {unitP} les uns contre les autres pour ne rien oublier.',it:'Avviciniamo la fila di {unitP}, così non ci sfugge niente.',es:'Juntemos los {unitP} para que no falte nada.',pt:'Vamos deixar os {unitP} bem juntinhos, para não pular nada.',nl:'We schuiven de {unitP} tegen elkaar aan, zo slaan we niets over.',sv:'Vi knuffar ihop alla {unitP} så att inget missas.',da:'Lad os rykke de små {unitP} helt sammen, så vi ikke springer noget over.',no:'Vi legger {unitP} kant i kant — da blir ingenting glemt.',fi:'Työnnetään jokaista {unitP} vähän lähemmäs, ettei mitään jää väliin.'},
    anotherObj:   {en:'Another object',de:'Noch ein Gegenstand',fr:'Un autre objet',it:'Un altro oggetto',es:'Otro objeto',pt:'Outro objeto',nl:'Nog een voorwerp',sv:'Ett nytt föremål',da:'En ny ting',no:'En ny gjenstand',fi:'Uusi esine'},
    /* capacity bench */
    vesselJug:    {en:'the jug',de:'der Krug',fr:'la carafe',it:'la brocca',es:'la jarra',pt:'a jarra',nl:'de kan',sv:'kannan',da:'kanden',no:'kanna',fi:'kannuun'},
    vesselTall:   {en:'the tall beaker',de:'das hohe Glas',fr:'le verre haut',it:'il bicchiere alto',es:'el vaso alto',pt:'o pote alto',nl:'de hoge maatbeker',sv:'den höga bägaren',da:'det høje bæger',no:'det høye begeret',fi:'korkeaan astiaan'},
    vesselWide:   {en:'the wide beaker',de:'die breite Schale',fr:'le bol large',it:'la ciotola larga',es:'el tazón ancho',pt:'a tigela larga',nl:'de brede schaal',sv:'den breda skålen',da:'den brede skål',no:'den brede skålen',fi:'leveään astiaan'},
    capacityDone: {en:'{noun} holds {n} {unitP}!',de:'{noun} fasst {n} {unitP}!',fr:'{noun} contient {n} {unitP} !',it:'{noun} contiene {n} {unitP}!',es:'En {noun} caben {n} {unitP} — ¡ya lo medimos!',pt:'{noun} guarda {n} {unitP}!',nl:'In {noun} passen {n} {unitP}!',sv:'{noun} rymmer {n} {unitP}!',da:'{noun} kan rumme {n} {unitP}!',no:'{noun} rommer {n} {unitP}!',fi:'{noun} mahtuu {n} {unitP}!'},
    fullLine:     {en:'It’s full to the top!',de:'Randvoll!',fr:'C’est rempli à ras bord !',it:'Fino all’orlo!',es:'¡Se llenó hasta el borde!',pt:'Encheu até a boca!',nl:'Helemaal vol tot aan de rand!',sv:'Fylld ända till brädden!',da:'Fyldt helt til randen!',no:'Fylt helt til randen!',fi:'Täynnä piripintaan!'},
    pourHint:     {en:'Tap a beaker to choose it, then press and hold the jug to pour. Hold a beaker to pour it back.',de:'Tippe auf ein Gefäß und halte dann den Krug gedrückt, um zu gießen. Halte ein Gefäß gedrückt, um zurückzugießen.',fr:'Touche un récipient pour le choisir, puis maintiens la carafe appuyée pour verser. Maintiens un récipient appuyé pour reverser l’eau.',it:'Tocca un recipiente per sceglierlo, poi tieni premuta la brocca per versare. Tieni premuto un recipiente per versare di nuovo nella brocca.',es:'Toca un recipiente para elegirlo y mantén presionada la jarra para verter. Mantén presionado un recipiente para regresar el agua.',pt:'Toque em um recipiente para escolher e segure a jarra para despejar. Segure um recipiente para despejar de volta.',nl:'Tik op een bak om te kiezen en houd de kan ingedrukt om te schenken. Houd een bak ingedrukt om terug te schenken.',sv:'Tryck på ett kärl för att välja det och håll sedan kannan intryckt för att hälla. Håll ett kärl intryckt för att hälla tillbaka.',da:'Tryk på en beholder for at vælge den, og hold kanden nede for at hælde. Hold en beholder nede for at hælde tilbage.',no:'Trykk på en beholder for å velge den, og hold kanna inne for å helle. Hold en beholder inne for å helle tilbake.',fi:'Valitse astia napauttamalla ja kaada pitämällä kannua pohjassa. Kaada takaisin pitämällä astiaa pohjassa.'},
    /* weight bench */
    weightHint:   {en:'Tap cubes onto the pan until the scale balances.',de:'Lege Würfel auf die Waagschale, bis die Waage im Gleichgewicht ist.',fr:'Pose des cubes sur le plateau jusqu’à ce que la balance soit en équilibre.',it:'Metti i cubetti sul piatto finché la bilancia non è in equilibrio.',es:'Pon cubos en el platillo hasta que la balanza quede en equilibrio.',pt:'Coloque cubinhos no prato até a balança ficar equilibrada.',nl:'Leg blokjes op het schaaltje tot de weegschaal in evenwicht is.',sv:'Lägg kuber på vågskålen tills vågen är i jämvikt.',da:'Læg terninger på vægtskålen, indtil vægten er i balance.',no:'Legg kuber på vektskålen til vekten er i balanse.',fi:'Lisää kuutioita vaakakuppiin, kunnes vaaka on tasapainossa.'},
    weightDone:   {en:'{noun} weighs {n} {unitP}!',de:'{noun} wiegt {n} {unitP}!',fr:'{noun} pèse {n} {unitP} !',it:'{noun} pesa {n} {unitP}!',es:'{noun} pesa {n} {unitP} — ¡quedó en equilibrio!',pt:'{noun} pesa {n} {unitP}!',nl:'{noun} weegt {n} {unitP}!',sv:'{noun} väger {n} {unitP}!',da:'{noun} vejer {n} {unitP}!',no:'{noun} veier {n} {unitP}!',fi:'{noun} painaa {n} {unitP}!'},
    takeOneOff:   {en:'Hmm — the cubes are heavier now. Take one off?',de:'Hmm — jetzt sind die Würfel schwerer. Nimmst du einen wieder runter?',fr:'Hmm — les cubes sont plus lourds maintenant. Tu en enlèves un ?',it:'Mmm — ora i cubetti pesano di più. Ne togli uno?',es:'Mmm — ahora los cubos pesan más. ¿Le quitamos uno?',pt:'Hmm — agora os cubinhos ficaram mais pesados. Que tal tirar um?',nl:'Hmm — nu zijn de blokjes zwaarder. Haal je er eentje af?',sv:'Hmm — nu väger kuberna mer. Vill du ta bort en?',da:'Hmm — nu er terningerne tungest. Skal vi tage én af?',no:'Hmm — nå er kubene tyngst. Skal vi ta av én?',fi:'Hmm — nyt kuutiot painavat enemmän. Otatko yhden pois?'},
    /* chrome */
    rulerLabel:   {en:'Ruler check',de:'Lineal-Check',fr:'Vérif à la règle',it:'Controllo col righello',es:'Prueba con la regla',pt:'Conferir na régua',nl:'Liniaal-check',sv:'Linjalkoll',da:'Linealtjek',no:'Linjalsjekk',fi:'Viivaintarkistus'},
    myGuesses:    {en:'My guesses',de:'Meine Schätzungen',fr:'Mes estimations',it:'Le mie stime',es:'Mis estimaciones',pt:'Meus palpites',nl:'Mijn schattingen',sv:'Mina gissningar',da:'Mine gæt',no:'Mine gjetninger',fi:'Omat arvioni'},
    saveSetup:    {en:'Save this setup',de:'Aufbau speichern',fr:'Enregistrer ce montage',it:'Salva questa postazione',es:'Guardar esta estación',pt:'Salvar esta bancada',nl:'Deze opstelling opslaan',sv:'Spara uppställningen',da:'Gem opstillingen',no:'Lagre oppsettet',fi:'Tallenna tämä asetelma'},
    savedList:    {en:'Saved setups',de:'Gespeicherte Aufbauten',fr:'Montages enregistrés',it:'Postazioni salvate',es:'Estaciones guardadas',pt:'Bancadas salvas',nl:'Opgeslagen opstellingen',sv:'Sparade uppställningar',da:'Gemte opstillinger',no:'Lagrede oppsett',fi:'Tallennetut asetelmat'},
    startAgain:   {en:'Start again',de:'Noch einmal',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw beginnen',sv:'Börja om',da:'Begynd forfra',no:'Begynn på nytt',fi:'Aloita alusta'},
    gateBench:    {en:'The capacity and weight benches — pouring, weighing, the guess log and saved setups — are part of Premium. The length bench with the estimate chip is always free.',de:'Die Füllmengen- und die Gewichts-Werkbank — Gießen, Wiegen, die Schätzliste und gespeicherte Aufbauten — gehören zu Premium. Die Längen-Werkbank mit dem Schätzzettel bleibt immer kostenlos.',fr:'Les ateliers contenance et poids — verser, peser, le carnet d’estimations et les montages enregistrés — font partie de Premium. L’atelier longueur, avec son estimation, reste toujours gratuit.',it:'I banchi della capacità e del peso — versare, pesare, il diario delle stime e le postazioni salvate — fanno parte di Premium. Il banco della lunghezza, con la sua stima, resta sempre gratuito.',es:'Los talleres de capacidad y peso — verter, pesar, el diario de estimaciones y las estaciones guardadas — son parte de Premium. El taller de longitud con la estimación siempre es gratis.',pt:'As bancadas de capacidade e peso — despejar, pesar, o diário de palpites e as bancadas salvas — fazem parte do Premium. A bancada de comprimento com o palpite é sempre gratuita.',nl:'De werkbanken voor inhoud en gewicht — schenken, wegen, de schattingenlijst en opgeslagen opstellingen — horen bij Premium. De lengtewerkbank, mét schatten, blijft altijd gratis.',sv:'Volym- och viktbänkarna — att hälla, att väga, gissningsloggen och sparade uppställningar — ingår i Premium. Längdbänken med gissningsrutan är alltid gratis.',da:'Rumfangs- og vægtbænkene — at hælde og veje, gættelisten og de gemte opstillinger — hører til Premium. Længdebænken, hvor man også gætter først, er altid gratis.',no:'Volum- og vektbenkene — å helle, veie, gjettelista og lagrede oppsett — er en del av Premium. Lengdebenken med gjettelappen er alltid gratis.',fi:'Tilavuuden ja painon mittaaminen — kaataminen, punnitseminen, arvioloki ja tallennetut asetelmat — kuuluu Premiumiin. Pituuden mittaaminen arviolappuineen on aina ilmaista.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    loading:      {en:'Setting up the workshop…',de:'Die Werkstatt wird aufgebaut…',fr:'On installe l’atelier…',it:'Prepariamo il banco…',es:'Montando el taller…',pt:'Montando a bancada…',nl:'De werkbank wordt klaargezet…',sv:'Bänken ställs i ordning…',da:'Bænken stilles op…',no:'Benken settes opp…',fi:'Mittauspajaa laitetaan kuntoon…'},
    setUnits:     {en:'Ruler units',de:'Lineal-Einheiten',fr:'Unités de la règle',it:'Unità del righello',es:'Unidades de la regla',pt:'Unidades da régua',nl:'Eenheden van de liniaal',sv:'Linjalens enheter',da:'Linealens enheder',no:'Linjalens enheter',fi:'Viivaimen yksiköt'},
    unitsCm:      {en:'Centimeters',de:'Zentimeter',fr:'Centimètres',it:'Centimetri',es:'Centímetros',pt:'Centímetros',nl:'Centimeters',sv:'Centimeter',da:'Centimeter',no:'Centimeter',fi:'Senttimetrit'},
    unitsInch:    {en:'Inches',de:'Zoll',fr:'Pouces',it:'Pollici',es:'Pulgadas',pt:'Polegadas',nl:'Inches',sv:'Tum',da:'Tommer',no:'Tommer',fi:'Tuumat'},
    setRuler:     {en:'Ruler check after counting',de:'Lineal-Check nach dem Zählen',fr:'Vérification à la règle après le comptage',it:'Controllo col righello dopo il conteggio',es:'Prueba con la regla después de contar',pt:'Conferir na régua depois de contar',nl:'Liniaal-check na het tellen',sv:'Linjalkoll efter räkningen',da:'Linealtjek efter tællingen',no:'Linjalsjekk etter tellingen',fi:'Viivaintarkistus laskemisen jälkeen'},
    setMl:        {en:'Show milliliters',de:'Milliliter anzeigen',fr:'Afficher les millilitres',it:'Mostra i millilitri',es:'Mostrar mililitros',pt:'Mostrar mililitros',nl:'Milliliters tonen',sv:'Visa milliliter',da:'Vis milliliter',no:'Vis milliliter',fi:'Näytä millilitrat'},
    setSpeak:     {en:'Speak the measurements',de:'Messungen vorlesen',fr:'Dire les mesures à voix haute',it:'Leggi le misure ad alta voce',es:'Decir las medidas en voz alta',pt:'Falar as medidas em voz alta',nl:'De metingen uitspreken',sv:'Läs upp mätningarna',da:'Sig målingerne højt',no:'Les opp målingene',fi:'Lue mittaukset ääneen'}
  },

  /* hand-authored per-locale noun PHRASES (article included where the
     locale wants one; Nordic definite forms are the natives' job at
     fan-out — drafts below are bare). NEVER composed at runtime. */
  NOUNS: {
    key: {en:'the key',de:'der Schlüssel',fr:'la clé',it:'la chiave',es:'la llave',pt:'a chave',nl:'de sleutel',sv:'nyckeln',da:'nøglen',no:'nøkkelen',fi:'avain'},
    crayon: {en:'the crayon',de:'der Wachsmalstift',fr:'le crayon de cire',it:'il pastello a cera',es:'el crayón',pt:'o giz de cera',nl:'het waskrijtje',sv:'kritan',da:'farvekridtet',no:'fargestiften',fi:'vahaliitu'},
    fork: {en:'the fork',de:'die Gabel',fr:'la fourchette',it:'la forchetta',es:'el tenedor',pt:'o garfo',nl:'de vork',sv:'gaffeln',da:'gaflen',no:'gaffelen',fi:'haarukka'},
    toothbrush: {en:'the toothbrush',de:'die Zahnbürste',fr:'la brosse à dents',it:'lo spazzolino',es:'el cepillo de dientes',pt:'a escova de dentes',nl:'de tandenborstel',sv:'tandborsten',da:'tandbørsten',no:'tannbørsten',fi:'hammasharja'},
    candle: {en:'the candle',de:'die Kerze',fr:'la bougie',it:'la candela',es:'la vela',pt:'a vela',nl:'de kaars',sv:'ljuset',da:'stearinlyset',no:'stearinlyset',fi:'kynttilä'},
    wand: {en:'the wand',de:'der Zauberstab',fr:'la baguette magique',it:'la bacchetta magica',es:'la varita mágica',pt:'a varinha mágica',nl:'de toverstaf',sv:'trollstaven',da:'tryllestaven',no:'tryllestaven',fi:'taikasauva'},
    corn: {en:'the corn',de:'der Maiskolben',fr:'l’épi de maïs',it:'la pannocchia',es:'la mazorca de maíz',pt:'a espiga de milho',nl:'de maïskolf',sv:'majskolven',da:'majskolben',no:'maiskolben',fi:'maissintähkä'},
    baguette: {en:'the baguette',de:'das Baguette',fr:'la baguette',it:'la baguette',es:'la baguette',pt:'a baguete',nl:'het stokbrood',sv:'baguetten',da:'baguetten',no:'bagetten',fi:'patonki'},
    skateboard: {en:'the skateboard',de:'das Skateboard',fr:'le skateboard',it:'lo skateboard',es:'la patineta',pt:'o skate',nl:'het skateboard',sv:'skateboarden',da:'skateboardet',no:'skateboardet',fi:'rullalauta'},
    belt: {en:'the belt',de:'der Gürtel',fr:'la ceinture',it:'la cintura',es:'el cinturón',pt:'o cinto',nl:'de riem',sv:'bältet',da:'bæltet',no:'beltet',fi:'vyö'},
    tie: {en:'the tie',de:'die Krawatte',fr:'la cravate',it:'la cravatta',es:'la corbata',pt:'a gravata',nl:'de stropdas',sv:'slipsen',da:'slipset',no:'slipset',fi:'solmio'},
    celery: {en:'the celery',de:'die Selleriestange',fr:'le céleri',it:'il sedano',es:'el apio',pt:'o aipo',nl:'de selderij',sv:'sellerin',da:'sellerien',no:'sellerien',fi:'selleri'},
    leek: {en:'the leek',de:'die Lauchstange',fr:'le poireau',it:'il porro',es:'el puerro',pt:'o alho-poró',nl:'de prei',sv:'purjolöken',da:'porren',no:'purreløken',fi:'purjo'},
    'rolling-pin': {en:'the rolling pin',de:'das Nudelholz',fr:'le rouleau à pâtisserie',it:'il mattarello',es:'el rodillo',pt:'o rolo de massa',nl:'de deegroller',sv:'kaveln',da:'kagerullen',no:'kjevlet',fi:'kaulin'},
    hammer: {en:'the hammer',de:'der Hammer',fr:'le marteau',it:'il martello',es:'el martillo',pt:'o martelo',nl:'de hamer',sv:'hammaren',da:'hammeren',no:'hammeren',fi:'vasara'},
    sled: {en:'the sled',de:'der Schlitten',fr:'la luge',it:'lo slittino',es:'el trineo',pt:'o trenó',nl:'de slee',sv:'kälken',da:'kælken',no:'kjelken',fi:'kelkka'},
    ladder: {en:'the ladder',de:'die Leiter',fr:'l’échelle',it:'la scala',es:'la escalera',pt:'a escada',nl:'de ladder',sv:'stegen',da:'stigen',no:'stigen',fi:'tikkaat'},
    surfboard: {en:'the surfboard',de:'das Surfbrett',fr:'la planche de surf',it:'la tavola da surf',es:'la tabla de surf',pt:'a prancha de surfe',nl:'de surfplank',sv:'surfbrädan',da:'surfbrættet',no:'surfebrettet',fi:'surffilauta'},
    shovel: {en:'the shovel',de:'die Schaufel',fr:'la pelle',it:'la pala',es:'la pala',pt:'a pá',nl:'de schop',sv:'spaden',da:'skovlen',no:'spaden',fi:'lapio'},
    rake: {en:'the rake',de:'der Rechen',fr:'le râteau',it:'il rastrello',es:'el rastrillo',pt:'o ancinho',nl:'de hark',sv:'krattan',da:'riven',no:'riva',fi:'harava'},
    kayak: {en:'the kayak',de:'der Kajak',fr:'le kayak',it:'il kayak',es:'el kayak',pt:'o caiaque',nl:'de kajak',sv:'kajaken',da:'kajakken',no:'kajakken',fi:'kajakki'},
    canoe: {en:'the canoe',de:'das Kanu',fr:'le canoë',it:'la canoa',es:'la canoa',pt:'a canoa',nl:'de kano',sv:'kanoten',da:'kanoen',no:'kanoen',fi:'kanootti'},
    airplane: {en:'the airplane',de:'das Flugzeug',fr:'l’avion',it:'l’aeroplano',es:'el avión',pt:'o avião',nl:'het vliegtuig',sv:'flygplanet',da:'flyvemaskinen',no:'flyet',fi:'lentokone'},
    submarine: {en:'the submarine',de:'das U-Boot',fr:'le sous-marin',it:'il sottomarino',es:'el submarino',pt:'o submarino',nl:'de onderzeeër',sv:'ubåten',da:'ubåden',no:'ubåten',fi:'sukellusvene'},
    shark: {en:'the shark',de:'der Hai',fr:'le requin',it:'lo squalo',es:'el tiburón',pt:'o tubarão',nl:'de haai',sv:'hajen',da:'hajen',no:'haien',fi:'hai'},
    alligator: {en:'the alligator',de:'der Alligator',fr:'l’alligator',it:'l’alligatore',es:'el caimán',pt:'o jacaré',nl:'de alligator',sv:'alligatorn',da:'alligatoren',no:'alligatoren',fi:'alligaattori'},
    helicopter: {en:'the helicopter',de:'der Hubschrauber',fr:'l’hélicoptère',it:'l’elicottero',es:'el helicóptero',pt:'o helicóptero',nl:'de helikopter',sv:'helikoptern',da:'helikopteren',no:'helikopteret',fi:'helikopteri'},
    ferry: {en:'the ferry',de:'die Fähre',fr:'le ferry',it:'il traghetto',es:'el transbordador',pt:'a balsa',nl:'de veerboot',sv:'färjan',da:'færgen',no:'ferga',fi:'lautta'},
    truck: {en:'the truck',de:'das Postauto',fr:'le camion',it:'il camion',es:'el camión',pt:'o caminhão',nl:'de vrachtwagen',sv:'lastbilen',da:'lastbilen',no:'lastebilen',fi:'kuorma-auto'},
    boat: {en:'the boat',de:'das Boot',fr:'le bateau',it:'la barca',es:'el bote',pt:'o barco',nl:'de boot',sv:'båten',da:'båden',no:'båten',fi:'vene'},
    mouse: {en:'the mouse',de:'die Maus',fr:'la souris',it:'il topo',es:'el ratón',pt:'o rato',nl:'de muis',sv:'musen',da:'musen',no:'musen',fi:'hiiri'},
    strawberry: {en:'the strawberry',de:'die Erdbeere',fr:'la fraise',it:'la fragola',es:'la fresa',pt:'o morango',nl:'de aardbei',sv:'jordgubben',da:'jordbærret',no:'jordbæret',fi:'mansikka'},
    hamster: {en:'the hamster',de:'der Hamster',fr:'le hamster',it:'il criceto',es:'el hámster',pt:'o hamster',nl:'de hamster',sv:'hamstern',da:'hamsteren',no:'hamsteren',fi:'hamsteri'},
    apple: {en:'the apple',de:'der Apfel',fr:'la pomme',it:'la mela',es:'la manzana',pt:'a maçã',nl:'de appel',sv:'äpplet',da:'æblet',no:'eplet',fi:'omena'},
    ball: {en:'the ball',de:'der Ball',fr:'le ballon',it:'la palla',es:'la pelota',pt:'a bola',nl:'de bal',sv:'bollen',da:'bolden',no:'ballen',fi:'pallo'},
    duck: {en:'the duck',de:'die Ente',fr:'le canard',it:'l’anatra',es:'el pato',pt:'o pato',nl:'de eend',sv:'ankan',da:'anden',no:'anda',fi:'ankka'},
    book: {en:'the book',de:'das Buch',fr:'le livre',it:'il libro',es:'el libro',pt:'o livro',nl:'het boek',sv:'boken',da:'bogen',no:'boka',fi:'kirja'},
    shoe: {en:'the shoe',de:'der Schuh',fr:'la chaussure',it:'la scarpa',es:'el zapato',pt:'o sapato',nl:'de schoen',sv:'skon',da:'skoen',no:'skoen',fi:'kenkä'},
    owl: {en:'the owl',de:'die Eule',fr:'le hibou',it:'il gufo',es:'el búho',pt:'a coruja',nl:'de uil',sv:'ugglan',da:'uglen',no:'ugla',fi:'pöllö'},
    rabbit: {en:'the rabbit',de:'das Kaninchen',fr:'le lapin',it:'il coniglio',es:'el conejo',pt:'o coelho',nl:'het konijn',sv:'kaninen',da:'kaninen',no:'kaninen',fi:'kani'},
    cat: {en:'the cat',de:'die Katze',fr:'le chat',it:'il gatto',es:'el gato',pt:'o gato',nl:'de kat',sv:'katten',da:'katten',no:'katten',fi:'kissa'},
    penguin: {en:'the penguin',de:'der Pinguin',fr:'le manchot',it:'il pinguino',es:'el pingüino',pt:'o pinguim',nl:'de pinguïn',sv:'pingvinen',da:'pingvinen',no:'pingvinen',fi:'pingviini'},
    pumpkin: {en:'the pumpkin',de:'der Kürbis',fr:'la citrouille',it:'la zucca',es:'la calabaza',pt:'a abóbora',nl:'de pompoen',sv:'pumpan',da:'græskarret',no:'gresskaret',fi:'kurpitsa'},
    fox: {en:'the fox',de:'der Fuchs',fr:'le renard',it:'la volpe',es:'el zorro',pt:'a raposa',nl:'de vos',sv:'räven',da:'ræven',no:'reven',fi:'kettu'},
    dog: {en:'the dog',de:'der Hund',fr:'le chien',it:'il cane',es:'el perro',pt:'o cachorro',nl:'de hond',sv:'hunden',da:'hunden',no:'hunden',fi:'koira'},
    koala: {en:'the koala',de:'der Koala',fr:'le koala',it:'il koala',es:'el koala',pt:'o coala',nl:'de koala',sv:'koalan',da:'koalaen',no:'koalaen',fi:'koala'},
    watermelon: {en:'the watermelon',de:'die Wassermelone',fr:'la pastèque',it:'l’anguria',es:'la sandía',pt:'a melancia',nl:'de watermeloen',sv:'vattenmelonen',da:'vandmelonen',no:'vannmelonen',fi:'vesimeloni'},
    sheep: {en:'the sheep',de:'das Schaf',fr:'le mouton',it:'la pecora',es:'la oveja',pt:'a ovelha',nl:'het schaap',sv:'fåret',da:'fåret',no:'sauen',fi:'lammas'},
    pig: {en:'the pig',de:'das Schwein',fr:'le cochon',it:'il maiale',es:'el cerdo',pt:'o porco',nl:'het varken',sv:'grisen',da:'grisen',no:'grisen',fi:'sika'},
    deer: {en:'the deer',de:'der Hirsch',fr:'le cerf',it:'il cervo',es:'el venado',pt:'o cervo',nl:'het hert',sv:'hjorten',da:'hjorten',no:'hjorten',fi:'peura'},
    lion: {en:'the lion',de:'der Löwe',fr:'le lion',it:'il leone',es:'el león',pt:'o leão',nl:'de leeuw',sv:'lejonet',da:'løven',no:'løven',fi:'leijona'},
    panda: {en:'the panda',de:'der Panda',fr:'le panda',it:'il panda',es:'el panda',pt:'o panda',nl:'de panda',sv:'pandan',da:'pandaen',no:'pandaen',fi:'panda'},
    bear: {en:'the bear',de:'der Bär',fr:'l’ours',it:'l’orso',es:'el oso',pt:'o urso',nl:'de beer',sv:'björnen',da:'bjørnen',no:'bjørnen',fi:'karhu'},
    cow: {en:'the cow',de:'die Kuh',fr:'la vache',it:'la mucca',es:'la vaca',pt:'a vaca',nl:'de koe',sv:'kon',da:'koen',no:'kua',fi:'lehmä'},
    horse: {en:'the horse',de:'das Pferd',fr:'le cheval',it:'il cavallo',es:'el caballo',pt:'o cavalo',nl:'het paard',sv:'hästen',da:'hesten',no:'hesten',fi:'hevonen'}
  },

  /* image dirs/files (validated vs pww-index-en + disk by the gate) */
  META: {
    mouse:['forest creatures','mouse'], strawberry:['At the Supermarket','strawberry'], hamster:['pets','hamster'],
    apple:['At the Supermarket','apple'], ball:['toys','ball'], duck:['animals','duck'],
    book:['classroom','book'], shoe:['clothing','shoe'], owl:['animals','owl'],
    rabbit:['animals','rabbit'], cat:['animals','cat'], penguin:['animals','penguin'],
    pumpkin:['At the Supermarket','pumpkin'], fox:['animals','fox'], dog:['animals','dog'],
    koala:['animals','koala'], watermelon:['4th of July','watermelon'], sheep:['animals','sheep'],
    pig:['animals','pig'], deer:['camping','deer'], lion:['zoo animals','lion'],
    panda:['animals','panda'], bear:['camping','bear'], cow:['farm animals','cow'],
    horse:['animals','horse'], fork:['around the house','fork'], toothbrush:['around the house','toothbrush'],
    baguette:['bakery','baguette'], ladder:['tools','ladder'], key:['around the house','key'],
    crayon:['classroom','crayon'], candle:['christmas','candle'], wand:['accessories','wand'],
    corn:['At the Supermarket','corn'], skateboard:['toys','skateboard'],
    belt:['accessories','belt'], tie:['accessories','tie'], celery:['vegetables','celery'],
    leek:['vegetables','leek'], 'rolling-pin':['kitchen tools','rolling_pin'], hammer:['around the house','hammer'],
    sled:['winter','sled'], surfboard:['summer','surfboard'], shovel:['around the house','shovel'],
    rake:['around the house','rake'], kayak:['camping','kayak'], canoe:['camping','canoe'],
    airplane:['Things That Fly','airplane'], submarine:['vehicles','submarine'], shark:['ocean life','shark'],
    alligator:['reptiles and Amphibians','alligator'], helicopter:['Things That Fly','helicopter'], ferry:['vehicles','ferry'],
    truck:['post office','truck'], boat:['beach','boat']
  },

  /* length objects: rot=90 illustrations LIE DOWN on the bench; trim =
     the measured alpha bounding box of the DEPICTED object (gate re-
     measures with sharp — drift fails the build). The units chain spans
     the trimmed visible extent EXACTLY via _lenPlacement. */
  LENGTH_OBJECTS: [
    { k: 'key', w: 180, rot: 90, trim: { x: 258, y: 16, w: 488, h: 996 }, iw: 1024, ih: 1024 }, /* ratio 2.04 */
    { k: 'crayon', w: 180, rot: 90, trim: { x: 384, y: 23, w: 232, h: 985 }, iw: 1024, ih: 1024 }, /* ratio 4.25 */
    { k: 'fork', w: 180, rot: 90, trim: { x: 426, y: 25, w: 164, h: 986 }, iw: 1024, ih: 1024 }, /* ratio 6.01 */
    { k: 'toothbrush', w: 180, rot: 90, trim: { x: 432, y: 21, w: 133, h: 991 }, iw: 1024, ih: 1024 }, /* ratio 7.45 */
    { k: 'candle', w: 180, rot: 90, trim: { x: 349, y: 29, w: 329, h: 977 }, iw: 1024, ih: 1024 }, /* ratio 2.97 */
    { k: 'wand', w: 180, rot: 90, trim: { x: 339, y: 29, w: 344, h: 966 }, iw: 1024, ih: 1024 }, /* ratio 2.81 */
    { k: 'corn', w: 180, rot: 90, trim: { x: 210, y: 25, w: 535, h: 982 }, iw: 1024, ih: 1024 }, /* ratio 1.84 */
    { k: 'baguette', w: 270, rot: 0, trim: { x: 24, y: 321, w: 977, h: 402 }, iw: 1024, ih: 1024 }, /* ratio 2.43 */
    { k: 'skateboard', w: 270, rot: 0, trim: { x: 29, y: 374, w: 966, h: 299 }, iw: 1024, ih: 1024 }, /* ratio 3.23 */
    { k: 'belt', w: 270, rot: 0, trim: { x: 54, y: 253, w: 919, h: 510 }, iw: 1024, ih: 1024 }, /* ratio 1.80 */
    { k: 'tie', w: 270, rot: 90, trim: { x: 373, y: 38, w: 269, h: 971 }, iw: 1024, ih: 1024 }, /* ratio 3.61 */
    { k: 'celery', w: 270, rot: 90, trim: { x: 344, y: 30, w: 340, h: 974 }, iw: 1024, ih: 1024 }, /* ratio 2.86 */
    { k: 'leek', w: 270, rot: 90, trim: { x: 266, y: 28, w: 458, h: 980 }, iw: 1024, ih: 1024 }, /* ratio 2.14 */
    { k: 'rolling-pin', w: 270, rot: 0, trim: { x: 26, y: 203, w: 976, h: 640 }, iw: 1024, ih: 1024 }, /* ratio 1.52 */
    { k: 'hammer', w: 270, rot: 90, trim: { x: 198, y: 24, w: 594, h: 987 }, iw: 1024, ih: 1024 }, /* ratio 1.66 */
    { k: 'sled', w: 360, rot: 0, trim: { x: 25, y: 241, w: 972, h: 576 }, iw: 1024, ih: 1024 }, /* ratio 1.69 */
    { k: 'ladder', w: 360, rot: 90, trim: { x: 320, y: 24, w: 375, h: 989 }, iw: 1024, ih: 1024 }, /* ratio 2.64 */
    { k: 'surfboard', w: 360, rot: 90, trim: { x: 352, y: 20, w: 323, h: 992 }, iw: 1024, ih: 1024 }, /* ratio 3.07 */
    { k: 'shovel', w: 360, rot: 90, trim: { x: 387, y: 25, w: 270, h: 984 }, iw: 1024, ih: 1024 }, /* ratio 3.64 */
    { k: 'rake', w: 360, rot: 90, trim: { x: 327, y: 25, w: 350, h: 972 }, iw: 1024, ih: 1024 }, /* ratio 2.78 */
    { k: 'kayak', w: 450, rot: 0, trim: { x: 22, y: 240, w: 980, h: 557 }, iw: 1024, ih: 1024 }, /* ratio 1.76 */
    { k: 'canoe', w: 450, rot: 0, trim: { x: 22, y: 255, w: 982, h: 508 }, iw: 1024, ih: 1024 }, /* ratio 1.93 */
    { k: 'airplane', w: 450, rot: 0, trim: { x: 28, y: 273, w: 969, h: 492 }, iw: 1024, ih: 1024 }, /* ratio 1.97 */
    { k: 'submarine', w: 450, rot: 0, trim: { x: 29, y: 251, w: 967, h: 525 }, iw: 1024, ih: 1024 }, /* ratio 1.84 */
    { k: 'shark', w: 450, rot: 0, trim: { x: 25, y: 245, w: 975, h: 544 }, iw: 1024, ih: 1024 }, /* ratio 1.79 */
    { k: 'alligator', w: 450, rot: 0, trim: { x: 30, y: 270, w: 969, h: 541 }, iw: 1024, ih: 1024 }, /* ratio 1.79 */
    { k: 'helicopter', w: 450, rot: 0, trim: { x: 25, y: 265, w: 968, h: 509 }, iw: 1024, ih: 1024 }, /* ratio 1.90 */
    { k: 'ferry', w: 450, rot: 0, trim: { x: 27, y: 249, w: 965, h: 531 }, iw: 1024, ih: 1024 }, /* ratio 1.82 */
    { k: 'truck', w: 450, rot: 0, trim: { x: 31, y: 269, w: 961, h: 531 }, iw: 1024, ih: 1024 }, /* ratio 1.81 */
    { k: 'boat', w: 450, rot: 0, trim: { x: 21, y: 211, w: 984, h: 628 }, iw: 1024, ih: 1024 }, /* ratio 1.57 */
  ],
  UNITS: { clip: { w: 45, h: 20, sKey: 'unitClipS', pKey: 'unitClipP' }, cube: { w: 30, h: 26, sKey: 'unitCubeS', pKey: 'unitCubeP' } },
  LATTICE: 15,
  PX_PER_CM: 15,   /* lengths → 12 / 18 / 24 / 30 cm exactly */
  PX_PER_IN: 45,   /* lengths → 4 / 6 / 8 / 10 in exactly   */

  /* weight manifest — curated integer cube-weights 3-12; RELATIVE sanity
     (mouse < fox < bear) is part of the point and gate-spot-checked */
  WEIGHTS: {
    mouse: 3, strawberry: 3, hamster: 3,
    apple: 4, ball: 4,
    duck: 5, book: 5, shoe: 5, owl: 5, rabbit: 5,
    cat: 6,
    penguin: 7, pumpkin: 7,
    fox: 8, dog: 8, koala: 8, watermelon: 8,
    sheep: 9,
    pig: 10, deer: 10,
    lion: 11, panda: 11,
    bear: 12, cow: 12, horse: 12
  },

  /* capacity vessels (cup units; jug is the unmarked source) */
  VESSELS: {
    jug:  { cap: 12, start: 10, x: 60,  w: 130, h: 220, nounKey: 'vesselJug' },
    tall: { cap: 8,  start: 0,  x: 300, w: 95,  h: 250, nounKey: 'vesselTall' },
    wide: { cap: 6,  start: 0,  x: 468, w: 160, h: 150, nounKey: 'vesselWide' }
  },
  POUR_RATE: 1.6,          /* cups per second */
  ML_PER_CUP: 50,

  /* balance physics */
  BAL: { maxAngle: 14, k: 3, spring: 0.016, damp: 0.88, arm: 175 },

  defaults: { units: 'cm', rulerCheck: false, mlMode: false, speakNames: true },
  settings: [
    { key: 'units', type: 'choice', labelKey: 'setUnits', options: [
      { value: 'cm', labelKey: 'unitsCm' }, { value: 'inch', labelKey: 'unitsInch' }
    ] },
    { key: 'rulerCheck', type: 'toggle', labelKey: 'setRuler' },
    { key: 'mlMode', type: 'toggle', labelKey: 'setMl' },
    { key: 'speakNames', type: 'toggle', labelKey: 'setSpeak' }
  ],

  STORE_KEY: 'lcs:measurement-bench:v1',
  ENT_TRUST_DAYS: 14,

  /* =========================== lifecycle =========================== */

  init: function (api) {
    this.api = api;
    this.premium = false;
    this.bench = 'length';
    /* length state */
    this.lenIdx = 0;
    this.unit = 'clip';
    this.placed = [];            /* x positions (stage px) of laid units */
    this.counted = false;
    this.scoochSpoken = false;   /* ≤1 per session */
    this.coverSpoken = false;
    /* estimate state (per bench measure-cycle) */
    this.est = null;             /* {value, pinned} */
    this.measured = null;        /* number after measuring */
    /* capacity state */
    this.levels = null;
    this.capTarget = 'tall';
    this.capDone = {};           /* vessel -> announced capacity */
    this.fullSpoken = false;
    /* weight state */
    this.wtIdx = 0;
    this.cubes = 0;
    this.balAngle = 0;
    this.balVel = 0;
    this.overSpoken = false;
    this.settled = false;
    this._raf = null;
    this._actx = null;

    this.WEIGHT_KEYS = Object.keys(this.WEIGHTS);

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, settings: null, log: [], setups: [] };
    if (!this._store.log) this._store.log = [];
    if (!this._store.setups) this._store.setups = [];
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var params = new URLSearchParams(location.search);
    var want = params.get('bench');
    if (want === 'capacity' || want === 'weight' || want === 'length') this.bench = want;

    this._resetCapacity();
    this.render();
    this._fetchEntitlement();
  },

  _resetCapacity: function () {
    this.levels = { jug: this.VESSELS.jug.start, tall: 0, wide: 0 };
    this.capDone = {};
    this.fullSpoken = false;
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
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; if (self._wrap) self.render(); }
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
        if (self._wrap) self.render();
      })
      .catch(function () { trustCache(); });
  },

  /* ======================= helpers + speech ======================== */

  _loc: function (map) { return map ? (map[this.api.lang] || map.en || '') : ''; },
  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  _cap: function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; },
  _noun: function (key) { return this._loc(this.NOUNS[key]); },
  _unitName: function (unitKey, n) {
    var u = this.UNITS[unitKey];
    return this.api.t(n === 1 ? u.sKey : u.pKey);
  },
  _cupName: function (n) { return this.api.t(n === 1 ? 'cupS' : 'cupP'); },
  _imgUrl: function (key) {
    var m = this.META[key];
    return '/image-library-webp/themes/' + encodeURIComponent(m[0]) + '/' + encodeURIComponent(m[1]) + '@2x.webp';
  },
  _speak: function (text) {
    if (this.api.settings.speakNames) {
      try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.92 }); } catch (_) {}
    }
    this.api.announce(text);
  },
  /* ruler.js formatLength conventions, copied (dot-decimal cm; reduced
     eighth fractions for inch; literal suffixes) */
  formatLength: function (px) {
    if (this.api.settings.units === 'inch') {
      var inches = px / this.PX_PER_IN;
      var eighths = Math.round(inches * 8);
      var whole = Math.floor(eighths / 8), rem = eighths % 8;
      if (!rem) return whole + ' in';
      var num = rem, den = 8;
      while (num % 2 === 0) { num /= 2; den /= 2; }
      return (whole ? whole + ' ' : '') + num + '/' + den + ' in';
    }
    var cm = Math.round(px / this.PX_PER_CM * 10) / 10;
    return (cm % 1 === 0 ? String(cm) : cm.toFixed(1)) + ' cm';
  },

  _ctx: function () {
    if (this._actx === null) {
      try { var AC = window.AudioContext || window.webkitAudioContext; this._actx = AC ? new AC() : false; } catch (_) { this._actx = false; }
    }
    if (this._actx && this._actx.state === 'suspended') { try { this._actx.resume(); } catch (_) {} }
    return this._actx;
  },
  _note: function (freq, at, dur, peak) {
    var ctx = this._ctx();
    if (!ctx) return;
    var t = ctx.currentTime + (at || 0);
    var osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak || 0.12, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.25));
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + (dur || 0.25) + 0.05);
  },
  _sfxSnap: function () { this._note(880, 0, 0.06, 0.10); },
  _sfxScooch: function () { this._note(523.25, 0, 0.12, 0.09); this._note(659.25, 0.09, 0.14, 0.09); },
  _sfxGlug: function () {
    var d = 1 + (Math.random() - 0.5) * 0.06;
    this._note(392 * d, 0, 0.05, 0.10); this._note(330 * d, 0.05, 0.05, 0.10); this._note(262 * d, 0.10, 0.06, 0.10);
  },
  _sfxBloop: function () { this._note(220, 0, 0.14, 0.10); this._note(180, 0.08, 0.12, 0.07); },
  _sfxCube: function () { this._note(660, 0, 0.04, 0.08); },
  _sfxSettle: function () { this._note(523.25, 0, 0.5, 0.11); this._note(659.25, 0.05, 0.5, 0.11); },
  _sfxPin: function () { this._note(1046.5, 0, 0.05, 0.08); },

  /* ============================ render ============================= */

  render: function () {
    var api = this.api, self = this;
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    api.stage.innerHTML = '';
    document.body.classList.add('mb-wide');
    var wrap = api.el('div', 'mb-wrap');
    api.stage.appendChild(wrap);
    this._wrap = wrap;

    /* bench tabs */
    var tabs = api.el('div', 'mb-tabs');
    [['length', 'tabLength'], ['capacity', 'tabCapacity'], ['weight', 'tabWeight']].forEach(function (t) {
      var locked = t[0] !== 'length' && !self.premium;
      var b = api.el('button', 'mb-tab' + (self.bench === t[0] ? ' active' : '') + (locked ? ' locked' : ''));
      b.type = 'button';
      b.innerHTML = self._tabIcon(t[0]) + '<span>' + api.t(t[1]) + '</span>' +
        (locked ? ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>' : '');
      b.addEventListener('click', function () {
        self.bench = t[0];
        self.est = null; self.measured = null;
        self.render();
      });
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);

    /* estimate bar — UNSCALED chrome (tap targets stay ≥44 on phones) */
    var estBar = api.el('div', 'mb-estbar');
    wrap.appendChild(estBar);
    this._estHost = estBar;
    if (this.bench === 'length' || this.premium) {
      if (this.bench === 'length') {
        var lo = this.LENGTH_OBJECTS[this.lenIdx];
        estBar.appendChild(this._estimateChip('estPromptLen',
          { unitP: this._unitName(this.unit, 2), noun: this._noun(lo.k) },
          { s: this._unitName(this.unit, 1), p: this._unitName(this.unit, 2) }));
      } else if (this.bench === 'capacity') {
        estBar.appendChild(this._estimateChip('estPromptCap',
          { unitP: this._cupName(2), noun: this._loc(this.strings[this.VESSELS[this.capTarget].nounKey]) },
          { s: this._cupName(1), p: this._cupName(2) }));
      } else {
        var wk = this.WEIGHT_KEYS[this.wtIdx % this.WEIGHT_KEYS.length];
        estBar.appendChild(this._estimateChip('estPromptWt',
          { unitP: this._unitName('cube', 2), noun: this._noun(wk) },
          { s: this._unitName('cube', 1), p: this._unitName('cube', 2) }));
      }
    }

    /* stage (fixed 660-wide coordinate space, scaled to fit) */
    var stageOuter = api.el('div', 'mb-stage-outer');
    var stage = api.el('div', 'mb-stage');
    stageOuter.appendChild(stage);
    wrap.appendChild(stageOuter);
    this._stageEl = stage;
    this._stageOuter = stageOuter;

    /* STRUCTURAL premium gate: locked benches render the gate, nothing else */
    if (this.bench !== 'length' && !this.premium) {
      this._renderGate(stage);
    } else if (this.bench === 'length') this._renderLength(stage);
    else if (this.bench === 'capacity') this._renderCapacity(stage);
    else this._renderWeight(stage);

    wrap.appendChild(this._dock());
    this._fitStage();
    if (!this._fitBound) {
      this._fitBound = true;
      window.addEventListener('resize', function () { self._fitStage(); });
    }
  },
  _fitStage: function () {
    if (!this._stageEl || !this._stageOuter) return;
    var avail = this._stageOuter.clientWidth || 660;
    var s = Math.min(1, avail / 660);
    this._scale = s;
    this._stageEl.style.transform = 'scale(' + s + ')';
    /* transform doesn't shrink the LAYOUT box — collapse it with negative
       margins so flex centering can never overlap the chrome around it */
    var mv = -(430 * (1 - s)) / 2, mh = -(660 * (1 - s)) / 2;
    this._stageEl.style.margin = mv + 'px ' + mh + 'px';
    this._stageOuter.style.minHeight = (430 * s) + 'px';
    this._stageOuter.style.height = '';
  },
  _pt: function (e) {
    var r = this._stageEl.getBoundingClientRect();
    return { x: (e.clientX - r.left) / this._scale, y: (e.clientY - r.top) / this._scale };
  },
  _tabIcon: function (bench) {
    if (bench === 'length') return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="2.5" y="9" width="9" height="5" rx="2.4"/><rect x="12.5" y="9" width="9" height="5" rx="2.4"/></svg>';
    if (bench === 'capacity') return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M7 4 L7 20 L17 20 L17 4"/><line x1="7" y1="13" x2="10" y2="13"/><line x1="7" y1="9" x2="10" y2="9"/><line x1="7" y1="17" x2="10" y2="17"/></svg>';
    return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="7" x2="20" y2="7"/><path d="M4 7 L2.5 12 a2.6 2.6 0 0 0 5.4 0 Z"/><path d="M20 7 L18.5 12 a2.6 2.6 0 0 0 5.4 0 Z" transform="translate(-2 0)"/></svg>';
  },

  _renderGate: function (stage) {
    var api = this.api;
    var g = api.el('div', 'mb-gatepanel');
    var card = api.el('div', 'mb-gatecard');
    card.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#8A6320" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
    var txt = api.el('p');
    txt.textContent = api.t('gateBench');
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-measurement-bench';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    card.append(txt, a);
    g.appendChild(card);
    stage.appendChild(g);
  },

  /* ===================== the estimate chip ========================= */

  _estimateChip: function (promptKey, promptArgs, unitPair) {
    var api = this.api, self = this;
    var box = api.el('div', 'mb-est');
    if (this.measured != null && this.est && this.est.pinned) {
      box.className = 'mb-est compared';
      box.innerHTML = '<span class="mb-est-spark">✦</span><span>' + this.fmt('compareLine', { g: this.est.value, n: this.measured }) + '</span>';
      return box;
    }
    if (this.est && this.est.pinned) {
      box.className = 'mb-est pinned';
      box.textContent = this.fmt('estNote', { n: this.est.value, unit: this.est.value === 1 ? unitPair.s : unitPair.p });
      return box;
    }
    var prompt = api.el('span', 'mb-est-q');
    prompt.textContent = this.fmt(promptKey, promptArgs);
    var ctl = api.el('div', 'mb-est-ctl');
    var minus = api.el('button', 'mb-est-btn'); minus.type = 'button'; minus.textContent = '−';
    var val = api.el('span', 'mb-est-val');
    var plus = api.el('button', 'mb-est-btn'); plus.type = 'button'; plus.textContent = '+';
    var pin = api.el('button', 'mb-est-pin'); pin.type = 'button'; pin.textContent = api.t('estPin');
    if (!this.est) this.est = { value: 5, pinned: false };
    val.textContent = this.est.value;
    minus.addEventListener('click', function () { self.est.value = Math.max(1, self.est.value - 1); val.textContent = self.est.value; });
    plus.addEventListener('click', function () { self.est.value = Math.min(20, self.est.value + 1); val.textContent = self.est.value; });
    pin.addEventListener('click', function () {
      self.est.pinned = true;
      self._sfxPin();
      self.render();
    });
    ctl.append(minus, val, plus, pin);
    box.append(prompt, ctl);
    return box;
  },
  _afterMeasure: function (measured, bench, objKey) {
    this.measured = measured;
    if (this.est && this.est.pinned) {
      this._speak(this.fmt('compareLine', { g: this.est.value, n: measured }) + '. ' + this.api.t('thinkLine'));
      if (this.premium) {
        this._store.log.unshift({ bench: bench, obj: objKey, guess: this.est.value, measured: measured, at: new Date().toISOString() });
        this._store.log = this._store.log.slice(0, 12);
        this._saveStore();
      }
    }
  },

  /* ======================== LENGTH bench =========================== */

  _renderLength: function (stage) {
    var api = this.api, self = this;
    var obj = this.LENGTH_OBJECTS[this.lenIdx];
    var u = this.UNITS[this.unit];
    var X0 = Math.round((660 - obj.w) / 2), TRACK_Y = 268;
    this._lenX0 = X0; this._lenTrackY = TRACK_Y;

    stage.innerHTML = '';
    /* the object */
    var img = api.el('img', 'mb-lenobj');
    img.src = this._imgUrl(obj.k);
    img.alt = this._noun(obj.k);
    img.draggable = false;
    var pl = this._lenPlacement(obj, X0, TRACK_Y);
    img.style.width = pl.width + 'px';
    img.style.left = pl.left + 'px';
    img.style.top = pl.top + 'px';
    img.style.transformOrigin = pl.origin;
    if (pl.transform) img.style.transform = pl.transform;
    stage.appendChild(img);

    /* the track (baseline + end whiskers) */
    var track = api.el('div', 'mb-track');
    track.style.left = X0 + 'px';
    track.style.width = obj.w + 'px';
    track.style.top = TRACK_Y + 'px';
    stage.appendChild(track);

    /* laid units */
    this._unitEls = [];
    this.placed.forEach(function (x, i) { self._addUnitEl(stage, x, i); });

    /* supply pile */
    var supply = api.el('div', 'mb-supply');
    supply.style.left = '18px'; supply.style.top = (TRACK_Y + 62) + 'px';
    for (var i = 0; i < 3; i++) {
      var chip = api.el('div', 'mb-unit supply');
      chip.innerHTML = this._unitSVG(this.unit);
      chip.style.left = (i * 12) + 'px'; chip.style.top = (i * -6) + 'px';
      supply.appendChild(chip);
    }
    stage.appendChild(supply);
    this._wireSupply(supply, stage);

    /* ruler check strip (after counting, teacher setting) */
    if (this.counted && api.settings.rulerCheck) stage.appendChild(this._rulerStrip(X0, TRACK_Y + 26, obj.w));

    /* readout (after counting) */
    if (this.counted) {
      var done = api.el('div', 'mb-readout');
      done.textContent = this._cap(this.fmt('lengthDone', { noun: this._noun(obj.k), n: this.placed.length, unitP: this._unitName(this.unit, this.placed.length) }));
      stage.appendChild(done);
    }
  },
  /* PURE trim-exact placement — maps the DEPICTED object's trimmed box
     onto [X0, X0+w] with its bottom ON the track; rot=90 lies the
     illustration down (CSS y-down rotate(90deg) about top-left maps
     (x,y) -> (-y,x)). Gate-proven by applying the affine to the trim
     corners. Returns {width, left, top, transform, origin}. */
  _lenPlacement: function (obj, X0, TRACK_Y) {
    var t = obj.trim;
    if (obj.rot === 90) {
      var k = obj.w / t.h;
      return {
        width: obj.iw * k,
        left: 0, top: 0,
        origin: 'top left',
        transform: 'translate(' + (X0 + (t.y + t.h) * k) + 'px, ' + (TRACK_Y - (t.x + t.w) * k) + 'px) rotate(90deg)'
      };
    }
    var k0 = obj.w / t.w;
    return {
      width: obj.iw * k0,
      left: X0 - t.x * k0,
      top: TRACK_Y - (t.y + t.h) * k0,
      origin: 'top left',
      transform: ''
    };
  },

  _unitSVG: function (unitKey, scale) {
    var s = scale || 1;
    if (unitKey === 'clip') {
      return '<svg viewBox="0 0 45 20" width="' + (45 * s) + '" height="' + (20 * s) + '" aria-hidden="true">' +
        '<rect x="1" y="1" width="43" height="18" rx="9" fill="none" stroke="#6E8FBF" stroke-width="2.4"/>' +
        '<rect x="7" y="6" width="31" height="8" rx="4" fill="none" stroke="#6E8FBF" stroke-width="2"/></svg>';
    }
    return '<svg viewBox="0 0 30 26" width="' + (30 * s) + '" height="' + (26 * s) + '" aria-hidden="true">' +
      '<path d="M4 8 L15 3 L26 8 L26 20 L15 25 L4 20 Z" fill="#E8A53A"/>' +
      '<path d="M4 8 L15 13 L26 8 L15 3 Z" fill="#F2C879"/>' +
      '<path d="M15 13 L15 25 L4 20 L4 8 Z" fill="#D08A2E"/></svg>';
  },
  _addUnitEl: function (stage, x, idx) {
    var u = this.UNITS[this.unit];
    var el = this.api.el('div', 'mb-unit laid');
    el.innerHTML = this._unitSVG(this.unit);
    el.style.left = x + 'px';
    el.style.top = (this._lenTrackY - u.h + 14) + 'px';
    el.dataset.idx = idx;
    stage.appendChild(el);
    this._unitEls.push(el);
    this._wireLaidUnit(el, stage);
    return el;
  },
  _wireSupply: function (supply, stage) {
    var self = this;
    supply.style.touchAction = 'none';
    supply.addEventListener('pointerdown', function (e) {
      if (!e.isPrimary || self.counted) return;
      e.preventDefault();
      try { supply.setPointerCapture(e.pointerId); } catch (_) {}
      var fly = self.api.el('div', 'mb-unit fly');
      fly.innerHTML = self._unitSVG(self.unit);
      self._stageEl.appendChild(fly);
      var move = function (ev) {
        var p = self._pt(ev);
        fly.style.left = (p.x - self.UNITS[self.unit].w / 2) + 'px';
        fly.style.top = (p.y - self.UNITS[self.unit].h / 2) + 'px';
      };
      move(e);
      var onMove = function (ev) { move(ev); };
      var onUp = function (ev) {
        supply.removeEventListener('pointermove', onMove);
        supply.removeEventListener('pointerup', onUp);
        supply.removeEventListener('pointercancel', onUp);
        fly.remove();
        var p = self._pt(ev);
        self._dropUnit(p, stage);
      };
      supply.addEventListener('pointermove', onMove);
      supply.addEventListener('pointerup', onUp);
      supply.addEventListener('pointercancel', onUp);
    });
  },
  _wireLaidUnit: function (el, stage) {
    var self = this;
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', function (e) {
      if (!e.isPrimary || self.counted) return;
      e.preventDefault();
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
      var idx = Number(el.dataset.idx);
      var moved = false;
      var onMove = function (ev) {
        moved = true;
        var p = self._pt(ev);
        el.style.left = (p.x - self.UNITS[self.unit].w / 2) + 'px';
        el.style.top = (p.y - self.UNITS[self.unit].h / 2) + 'px';
      };
      var onUp = function (ev) {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onUp);
        if (!moved) return;
        var p = self._pt(ev);
        self.placed.splice(idx, 1);
        self._dropUnit(p, stage);
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
    });
  },
  _dropUnit: function (p, stage) {
    var u = this.UNITS[this.unit];
    var obj = this.LENGTH_OBJECTS[this.lenIdx];
    var nearTrack = Math.abs(p.y - this._lenTrackY) < 70;
    if (nearTrack) {
      /* snap to the sub-unit lattice CELL (gaps/overlaps stay reachable) */
      var x = Math.round((p.x - u.w / 2 - this._lenX0) / this.LATTICE) * this.LATTICE + this._lenX0;
      x = Math.max(this._lenX0 - u.w, Math.min(this._lenX0 + obj.w + u.w, x));
      this.placed.push(x);
      this._sfxSnap();
    }
    this.render();
  },
  /* PURE chain evaluation (the lay-units-core status walk, copied) —
     gate-driven directly. Returns {status, closed} where status ∈
     misaligned-start | gap | overlap | ok, and closed = the scooched
     chain positions. */
  evalChain: function (positions, x0, unitW) {
    var sorted = positions.slice().sort(function (a, b) { return a - b; });
    var status = 'ok';
    if (sorted.length && sorted[0] !== x0) status = 'misaligned-start';
    for (var i = 1; i < sorted.length; i++) {
      if (sorted[i] > sorted[i - 1] + unitW) { status = status === 'ok' ? 'gap' : status; }
      else if (sorted[i] < sorted[i - 1] + unitW) { status = status === 'ok' ? 'overlap' : status; }
    }
    return { status: status, closed: sorted.map(function (_, i) { return x0 + i * unitW; }) };
  },
  /* PURE pour step — conservation by construction; gate-driven. */
  pourAmount: function (levels, from, to, dt) {
    var cap = this.VESSELS[to].cap;
    return Math.max(0, Math.min(this.POUR_RATE * dt, levels[from], cap - levels[to]));
  },
  /* PURE balance tilt — truth derived, never stored; gate-driven. */
  balanceAngle: function (cubes, weight) {
    return this.BAL.maxAngle * Math.tanh((cubes - weight) / this.BAL.k);
  },
  _countLength: function () {
    var self = this, api = this.api;
    if (!this.placed.length || this.counted) return;
    var u = this.UNITS[this.unit];
    var obj = this.LENGTH_OBJECTS[this.lenIdx];
    var ev = this.evalChain(this.placed, this._lenX0, u.w);
    var sorted = this.placed.slice().sort(function (a, b) { return a - b; });
    var defect = ev.status !== 'ok';
    var closed = ev.closed;
    var apply = function () {
      var need = obj.w / u.w;
      if (closed.length < need) {
        self.placed = closed;
        self.render();
        if (!self.coverSpoken) { self.coverSpoken = true; self._speak(self.fmt('notCovered', { noun: self._noun(obj.k) })); }
        return;
      }
      /* overhang: extras slide back to the supply */
      self.placed = closed.slice(0, need);
      self.counted = true;
      self.render();
      /* count-up highlight then the sentence + estimate juxtaposition */
      var els = self._unitEls;
      els.forEach(function (el, i) {
        setTimeout(function () { el.classList.add('counted'); self._note(660 + i * 40, 0, 0.06, 0.07); }, i * 180);
      });
      setTimeout(function () {
        var n = self.placed.length;
        self._speak(self._cap(self.fmt('lengthDone', { noun: self._noun(obj.k), n: n, unitP: self._unitName(self.unit, n) })));
        self._afterMeasure(n, 'length', obj.k);
        self.render();
      }, this === null ? 0 : self.placed.length * 180 + 400);
    };
    if (defect) {
      /* the kindly scooch — physics + warmth, never a verdict */
      this._sfxScooch();
      if (!this.scoochSpoken) {
        this.scoochSpoken = true;
        this._speak(this.fmt('scoochLine', { unitP: this._unitName(this.unit, 2) }));
      }
      this.placed = sorted;
      this.render();
      var els = this._unitEls;
      els.forEach(function (el, i) {
        el.style.transition = 'left .28s cubic-bezier(.34,1.2,.64,1)';
        el.style.left = closed[i] + 'px';
      });
      setTimeout(apply, 420);
    } else apply();
  },
  _rulerStrip: function (x, y, w) {
    var api = this.api;
    var isIn = api.settings.units === 'inch';
    var per = isIn ? this.PX_PER_IN : this.PX_PER_CM;
    var minor = isIn ? per / 8 : per / 5;
    var strip = api.el('div', 'mb-ruler');
    strip.style.left = x + 'px'; strip.style.top = y + 'px'; strip.style.width = w + 'px';
    var s = '<svg viewBox="0 0 ' + (w + 18) + ' 34" width="' + (w + 18) + '" height="34" aria-hidden="true">' +
      '<rect x="0" y="0" width="' + (w + 14) + '" height="26" rx="4" fill="#FDF6E8" stroke="#E7DCC8" stroke-width="1.5"/>';
    for (var px = 0; px <= w + 0.1; px += minor) {
      var major = Math.abs(px % per) < 0.01 || Math.abs(px % per - per) < 0.01;
      s += '<line x1="' + px + '" y1="0" x2="' + px + '" y2="' + (major ? 12 : 6) + '" stroke="#8B6F47" stroke-width="' + (major ? 1.6 : 1) + '"/>';
      if (major && px > 0.1) s += '<text x="' + px + '" y="22" text-anchor="middle" font-size="10.5" font-weight="700" fill="#5A5348">' + Math.round(px / per) + '</text>';
    }
    s += '</svg><span class="mb-ruler-read">' + this.formatLength(w) + '</span>';
    strip.innerHTML = s;
    return strip;
  },

  /* ======================= CAPACITY bench ========================== */

  _renderCapacity: function (stage) {
    var api = this.api, self = this;
    stage.innerHTML = '';
    var hint = api.el('div', 'mb-hint');
    hint.textContent = api.t('pourHint');
    stage.appendChild(hint);

    ['jug', 'tall', 'wide'].forEach(function (vk) { stage.appendChild(self._vesselEl(vk)); });
    this._paintCapacity();
  },
  _vesselEl: function (vk) {
    var api = this.api, self = this;
    var v = this.VESSELS[vk];
    var box = api.el('div', 'mb-vessel' + (vk !== 'jug' && this.capTarget === vk ? ' target' : ''));
    box.dataset.vessel = vk;
    box.style.left = v.x + 'px';
    box.style.top = (350 - v.h) + 'px';
    box.style.width = v.w + 'px';
    box.style.height = (v.h + 46) + 'px';
    /* graduated beaker SVG (pond-juice pattern: clipPath fill + meniscus) */
    var s = '<svg class="mb-vsvg" viewBox="0 0 ' + v.w + ' ' + (v.h + 6) + '" width="' + v.w + '" height="' + (v.h + 6) + '">' +
      '<clipPath id="mbv' + vk + '"><rect x="3" y="3" width="' + (v.w - 6) + '" height="' + v.h + '" rx="7"/></clipPath>' +
      '<g clip-path="url(#mbv' + vk + ')">' +
      '<rect class="mb-liquid" x="3" y="' + (v.h + 3) + '" width="' + (v.w - 6) + '" height="' + v.h + '" fill="#7FB8D8"/>' +
      '<ellipse class="mb-meniscus" cx="' + (v.w / 2) + '" cy="' + (v.h + 3) + '" rx="' + (v.w / 2 - 4) + '" ry="3" fill="#fff" opacity="0.35"/>' +
      '</g>';
    if (vk !== 'jug') {
      for (var c = 1; c <= v.cap; c++) {
        var y = 3 + v.h - c * (v.h / v.cap);
        s += '<line x1="' + (v.w - 16) + '" y1="' + y + '" x2="' + (v.w - 4) + '" y2="' + y + '" stroke="#146B5E" stroke-width="1.6" opacity="0.65"/>';
        if (this.api.settings.mlMode ? c % 2 === 0 : true) {
          s += '<text x="' + (v.w - 19) + '" y="' + Math.max(y + 3.5, 14) + '" text-anchor="end" font-size="10" font-weight="700" fill="#146B5E" opacity="0.8">' +
            (this.api.settings.mlMode ? c * this.ML_PER_CUP : c) + '</text>';
        }
      }
    }
    s += '<rect x="3" y="3" width="' + (v.w - 6) + '" height="' + v.h + '" rx="7" fill="none" stroke="#146B5E" stroke-width="2.5"/>';
    if (vk === 'jug') s += '<path d="M' + (v.w - 3) + ' 14 q14 4 10 18" fill="none" stroke="#146B5E" stroke-width="2.5" stroke-linecap="round"/>';
    s += '</svg>';
    s += '<span class="mb-vlabel">' + this._loc(this.strings[v.nounKey]) + '</span>';
    s += '<span class="mb-vread"></span>';
    box.innerHTML = s;
    this._wireVessel(box, vk);
    return box;
  },
  _wireVessel: function (box, vk) {
    var self = this;
    box.style.touchAction = 'none';
    box.addEventListener('pointerdown', function (e) {
      if (!e.isPrimary) return;
      e.preventDefault();
      try { box.setPointerCapture(e.pointerId); } catch (_) {}
      var poured = false;
      var holdTimer = setTimeout(function () {
        poured = true;
        self._startPour(vk === 'jug' ? 'jug' : vk, vk === 'jug' ? self.capTarget : 'jug', box);
      }, 160);
      var onUp = function () {
        box.removeEventListener('pointerup', onUp);
        box.removeEventListener('pointercancel', onUp);
        clearTimeout(holdTimer);
        self._stopPour();
        if (!poured && vk !== 'jug') { self.capTarget = vk; self.est = null; self.measured = null; self.render(); }
      };
      box.addEventListener('pointerup', onUp);
      box.addEventListener('pointercancel', onUp);
    });
  },
  _startPour: function (from, to, box) {
    var self = this;
    if (from === to || this.levels[from] <= 0.01) return;
    this._pour = { from: from, to: to, last: performance.now(), lastWhole: Math.floor(this.levels[to]) };
    box.classList.add('pouring');
    this._pourBox = box;
    var step = function (now) {
      if (!self._pour) return;
      var p = self._pour;
      var dt = Math.min(0.08, (now - p.last) / 1000);
      p.last = now;
      var cap = self.VESSELS[p.to].cap;
      var amount = self.pourAmount(self.levels, p.from, p.to, dt);
      self.levels[p.from] -= amount;
      self.levels[p.to] += amount;
      if (Math.floor(self.levels[p.to]) > p.lastWhole) { p.lastWhole = Math.floor(self.levels[p.to]); self._sfxGlug(); }
      self._paintCapacity();
      if (self.levels[p.to] >= cap - 0.001) {
        /* full to the brim: auto-stop (conservation preserved, no penalty) */
        self.levels[p.to] = cap;
        self._stopPour();
        self._sfxBloop();
        if (self._pourBox) self._pourBox.classList.remove('pouring');
        var vEl = self._wrap.querySelector('.mb-vessel[data-vessel="' + p.to + '"]');
        if (vEl) { vEl.classList.add('brimful'); setTimeout(function () { vEl.classList.remove('brimful'); }, 900); }
        if (!self.fullSpoken) { self.fullSpoken = true; self._speak(self.api.t('fullLine')); }
        if (p.to !== 'jug' && !self.capDone[p.to]) {
          self.capDone[p.to] = cap;
          var noun = self._loc(self.strings[self.VESSELS[p.to].nounKey]);
          var line = self._cap(self.fmt('capacityDone', { noun: noun, n: cap, unitP: self._cupName(cap) }));
          setTimeout(function () {
            self._speak(line);
            self._afterMeasure(cap, 'capacity', p.to);
            self.render();
          }, 700);
        }
        return;
      }
      if (self.levels[p.from] <= 0.001) { self.levels[p.from] = 0; self._stopPour(); return; }
      self._raf = requestAnimationFrame(step);
    };
    this._raf = requestAnimationFrame(step);
  },
  _stopPour: function () {
    this._pour = null;
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    if (this._pourBox) { this._pourBox.classList.remove('pouring'); this._pourBox = null; }
  },
  _paintCapacity: function () {
    var self = this;
    (this._wrap.querySelectorAll('.mb-vessel') || []).forEach(function (box) {
      var vk = box.dataset.vessel;
      var v = self.VESSELS[vk];
      var frac = self.levels[vk] / v.cap;
      var fy = 3 + v.h * (1 - frac);
      var liq = box.querySelector('.mb-liquid');
      var men = box.querySelector('.mb-meniscus');
      if (liq) { liq.setAttribute('y', fy); liq.setAttribute('height', v.h * frac + 3); }
      if (men) men.setAttribute('cy', fy);
      var read = box.querySelector('.mb-vread');
      if (read) {
        var lv = Math.round(self.levels[vk] * 2) / 2;
        if (vk === 'jug') read.textContent = '';
        else read.textContent = self.api.settings.mlMode ? (Math.round(lv * self.ML_PER_CUP) + ' ml') : (lv + ' ' + self._cupName(lv === 1 ? 1 : 2));
      }
    });
  },

  /* ======================== WEIGHT bench =========================== */

  /* PURE shared hang-point — the ONE source both the SVG pan transforms
     and the HTML load overlays consume (they can never diverge). Pans
     hang at HANG_R = arm − 30, INSET from the tip, so both ropes
     (local ±20) always land ON the beam — gate-proven. */
  BAL_CX: 330, BAL_CY: 160, BAL_HANG_INSET: 30, BAL_ROPE_HALF: 20,
  _panAnchor: function (side, angleDeg) {
    var a = angleDeg * Math.PI / 180;
    var r = this.BAL.arm - this.BAL_HANG_INSET;
    var sgn = side === 'left' ? -1 : 1;
    return { x: this.BAL_CX + sgn * r * Math.cos(a), y: this.BAL_CY + sgn * r * Math.sin(a) };
  },

  /* the pan is ONE SVG assembly — strings, dish, and THE LOAD share a
     single local system inside one <g>, so connection cannot drift and
     the dish's FRONT RIM paints over the load's base (impossible with
     HTML overlays, which always sit above the SVG). Strings run from
     the hang point (0,0 = ON the beam) to the dish RIM ENDS. */
  PAN: { RIM_HALF: 54, RIM_Y: 78, DEPTH: 16, SEAT_Y: 84 },
  _cubeShape: function (x, y) {
    return '<g transform="translate(' + x + ' ' + y + ')" class="mb-cube-g" data-cube="1">' +
      '<path d="M4 8 L15 3 L26 8 L26 20 L15 25 L4 20 Z" fill="#E8A53A"/>' +
      '<path d="M4 8 L15 13 L26 8 L15 3 Z" fill="#F2C879"/>' +
      '<path d="M15 13 L15 25 L4 20 L4 8 Z" fill="#D08A2E"/></g>';
  },
  _panGroup: function (cls) {
    var P = this.PAN;
    var back = 'M' + (-P.RIM_HALF) + ' ' + P.RIM_Y + ' q ' + P.RIM_HALF + ' ' + (P.DEPTH * 2) + ' ' + (P.RIM_HALF * 2) + ' 0 Z';
    var front = 'M' + (-P.RIM_HALF) + ' ' + P.RIM_Y + ' q ' + P.RIM_HALF + ' ' + (P.DEPTH * 2) + ' ' + (P.RIM_HALF * 2) + ' 0 ' +
      'l -6 9 q -' + (P.RIM_HALF - 8) + ' ' + (P.DEPTH * 1.7) + ' -' + (P.RIM_HALF * 2 - 16) + ' 0 Z';
    return '<g class="' + cls + '">' +
      '<line x1="0" y1="0" x2="' + (-P.RIM_HALF) + '" y2="' + P.RIM_Y + '" stroke="#8B6F47" stroke-width="2.5" stroke-linecap="round"/>' +
      '<line x1="0" y1="0" x2="' + P.RIM_HALF + '" y2="' + P.RIM_Y + '" stroke="#8B6F47" stroke-width="2.5" stroke-linecap="round"/>' +
      '<circle cx="0" cy="0" r="3.5" fill="#5A4630"/>' +
      '<path d="' + back + '" fill="#9A7248"/>' +
      '<g class="mb-pan-load"></g>' +
      '<path d="' + front + '" fill="#C99B62" stroke="#8B6F47" stroke-width="2" stroke-linejoin="round"/>' +
      '</g>';
  },

  _renderWeight: function (stage) {
    var api = this.api, self = this;
    stage.innerHTML = '';
    var key = this.WEIGHT_KEYS[this.wtIdx % this.WEIGHT_KEYS.length];
    this._wtKey = key;
    var hint = api.el('div', 'mb-hint');
    hint.textContent = api.t('weightHint');
    stage.appendChild(hint);

    /* the balance (SVG in STAGE coordinates — viewBox 660x430 = the
       stage, so the HTML load overlays share ONE coordinate system);
       pans hang from _panAnchor points INSET on the beam */
    var bal = api.el('div', 'mb-balance');
    var arm = this.BAL.arm;
    var cx = this.BAL_CX, cy = this.BAL_CY;
    var P = this.PAN;
    bal.innerHTML =
      '<svg viewBox="0 0 660 430" width="660" height="430" role="img" aria-label="' +
      this._noun(key).replace(/"/g, '&quot;') + '">' +
      '<rect x="' + (cx - 7) + '" y="' + cy + '" width="14" height="196" rx="6" fill="#8B6F47"/>' +
      '<rect x="' + (cx - 67) + '" y="' + (cy + 192) + '" width="134" height="16" rx="8" fill="#6F5738"/>' +
      '<g class="mb-beam-g">' +
      '<rect x="' + (cx - arm) + '" y="' + (cy - 6) + '" width="' + (arm * 2) + '" height="12" rx="6" fill="#C99B62" stroke="#8B6F47" stroke-width="2"/>' +
      '</g>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="10" fill="#5A4630"/>' +
      this._panGroup('mb-pan-l') + this._panGroup('mb-pan-r') +
      '</svg>';
    stage.appendChild(bal);
    this._balEl = bal;

    /* THE LOADS LIVE INSIDE THE PAN GROUPS (z-ordered under the front
       rim; they ride the pan transform — nothing to align, ever) */
    var loadL = bal.querySelector('.mb-pan-l .mb-pan-load');
    loadL.innerHTML = '<image href="' + this._imgUrl(key) + '" x="-45" y="' + (P.SEAT_Y - 90) +
      '" width="90" height="90" preserveAspectRatio="xMidYMax meet"/>';
    this._paintCubes();

    /* cube supply */
    var supply = api.el('button', 'mb-cubesupply');
    supply.type = 'button';
    supply.setAttribute('aria-label', this._unitName('cube', 2));
    supply.innerHTML = this._unitSVG('cube') + this._unitSVG('cube') + this._unitSVG('cube');
    supply.addEventListener('click', function () {
      if (self.settled) return;
      if (self.cubes >= 14) return;
      self.cubes++;
      self._sfxCube();
      self._paintCubes();
      self._checkOver();
    });
    supply.style.left = '540px'; supply.style.top = '330px';
    stage.appendChild(supply);

    /* readout after settle */
    if (this.settled) {
      var done = api.el('div', 'mb-readout');
      done.textContent = this._cap(this.fmt('weightDone', { noun: this._noun(key), n: this.WEIGHTS[key], unitP: this._unitName('cube', this.WEIGHTS[key]) }));
      stage.appendChild(done);
    }

    this._runBalance();
  },
  _paintCubes: function () {
    var self = this;
    var slot = this._balEl && this._balEl.querySelector('.mb-pan-r .mb-pan-load');
    if (!slot) return;
    var P = this.PAN;
    var out = '';
    for (var i = 0; i < this.cubes; i++) {
      var col = i % 4, row = Math.floor(i / 4);
      /* 4 columns x 24px centred on the pan; rows stack UP from SEAT_Y */
      out += this._cubeShape(-48 + col * 24 + (24 - 30) / 2, P.SEAT_Y - 26 - row * 21);
    }
    slot.innerHTML = out;
    (slot.querySelectorAll('.mb-cube-g') || []).forEach(function (g) {
      g.addEventListener('click', function () {
        if (self.settled) return;
        self.cubes = Math.max(0, self.cubes - 1);
        self._sfxCube();
        self._paintCubes();
      });
    });
  },
  _checkOver: function () {
    var w = this.WEIGHTS[this._wtKey];
    if (this.cubes > w && !this.overSpoken) {
      this.overSpoken = true;
      this._speak(this.api.t('takeOneOff'));
    }
  },
  /* damped spring toward tanh tilt — truth DERIVED from the pans every
     frame, never stored */
  _runBalance: function () {
    var self = this;
    var lastLevelAt = null;
    var step = function () {
      if (!self._balEl || !self._balEl.isConnected) return;
      var w = self.WEIGHTS[self._wtKey];
      var target = self.balanceAngle(self.cubes, w);
      self.balVel += (target - self.balAngle) * self.BAL.spring;
      self.balVel *= self.BAL.damp;
      self.balAngle += self.balVel;
      self._paintBalance();
      /* settle detection: exact cubes + calm beam for 600ms */
      if (self.cubes === w && Math.abs(self.balAngle) < 0.8 && Math.abs(self.balVel) < 0.05) {
        if (lastLevelAt == null) lastLevelAt = performance.now();
        else if (performance.now() - lastLevelAt > 600 && !self.settled) {
          self.settled = true;
          self._sfxSettle();
          var n = w, key = self._wtKey;
          self._speak(self._cap(self.fmt('weightDone', { noun: self._noun(key), n: n, unitP: self._unitName('cube', n) })));
          self._afterMeasure(n, 'weight', key);
          self.render();
          return;
        }
      } else lastLevelAt = null;
      self._raf = requestAnimationFrame(step);
    };
    this._raf = requestAnimationFrame(step);
  },
  _paintBalance: function () {
    var beam = this._balEl.querySelector('.mb-beam-g');
    if (beam) beam.setAttribute('transform', 'rotate(' + this.balAngle.toFixed(2) + ' ' + this.BAL_CX + ' ' + this.BAL_CY + ')');
    var L = this._panAnchor('left', this.balAngle);
    var Rr = this._panAnchor('right', this.balAngle);
    var pl = this._balEl.querySelector('.mb-pan-l');
    var pr = this._balEl.querySelector('.mb-pan-r');
    if (pl) pl.setAttribute('transform', 'translate(' + L.x + ' ' + L.y + ')');
    if (pr) pr.setAttribute('transform', 'translate(' + Rr.x + ' ' + Rr.y + ')');
  },

  /* ============================ dock =============================== */

  _dock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'mb-dock');
    var row = api.el('div', 'mb-chiprow');

    if (this.bench === 'length') {
      /* unit picker (unscaled chrome — ≥44px on every phone) */
      ['clip', 'cube'].forEach(function (uk) {
        var b = api.el('button', 'mb-minichip' + (self.unit === uk ? ' active' : ''));
        b.type = 'button';
        b.innerHTML = self._unitSVG(uk, 0.6) + ' <span>' + self._unitName(uk, 2) + '</span>';
        b.addEventListener('click', function () {
          if (self.unit === uk) return;
          self.unit = uk; self.placed = []; self.counted = false; self.measured = null;
          if (self.est) self.est.pinned = false;
          self.render();
        });
        row.appendChild(b);
      });
      var count = api.el('button', 'mb-chip primary');
      count.type = 'button';
      count.textContent = api.t('countBtn');
      count.disabled = !this.placed.length || this.counted;
      count.addEventListener('click', function () { self._countLength(); });
      row.appendChild(count);
      var another = api.el('button', 'mb-chip');
      another.type = 'button';
      another.textContent = api.t('anotherObj');
      another.addEventListener('click', function () {
        self.lenIdx = (self.lenIdx + 1) % self.LENGTH_OBJECTS.length;
        self.placed = []; self.counted = false; self.est = null; self.measured = null;
        self.render();
      });
      row.appendChild(another);
    }
    if (this.bench === 'weight' && this.premium) {
      var anotherW = api.el('button', 'mb-chip');
      anotherW.type = 'button';
      anotherW.textContent = api.t('anotherObj');
      anotherW.addEventListener('click', function () {
        self.wtIdx = (self.wtIdx + 7) % self.WEIGHT_KEYS.length;   /* coprime hop = varied order */
        self.cubes = 0; self.balAngle = 0; self.balVel = 0;
        self.settled = false; self.overSpoken = false; self.est = null; self.measured = null;
        self.render();
      });
      row.appendChild(anotherW);
    }

    var again = api.el('button', 'mb-chip');
    again.type = 'button';
    again.textContent = api.t('startAgain');
    again.addEventListener('click', function () { self.reset(); });
    row.appendChild(again);

    /* premium: the guess log */
    if (this.premium && this._store.log.length) {
      var log = api.el('button', 'mb-chip');
      log.type = 'button';
      log.textContent = api.t('myGuesses');
      log.addEventListener('click', function () {
        var old = self._wrap.querySelector('.mb-log');
        if (old) { old.remove(); return; }
        var panel = api.el('div', 'mb-log');
        self._store.log.forEach(function (e) {
          var li = api.el('div', 'mb-log-row');
          var name = e.bench === 'capacity' ? self._loc(self.strings[self.VESSELS[e.obj].nounKey]) : self._noun(e.obj);
          li.textContent = self._cap(name) + ' — ' + self.fmt('compareLine', { g: e.guess, n: e.measured });
          panel.appendChild(li);
        });
        dock.insertAdjacentElement('beforebegin', panel);
      });
      row.appendChild(log);
    }
    dock.appendChild(row);
    return dock;
  },

  onSettings: function () { this._saveStore(); this.render(); },
  reset: function () {
    this.placed = []; this.counted = false; this.est = null; this.measured = null;
    this._resetCapacity();
    this.cubes = 0; this.balAngle = 0; this.balVel = 0; this.settled = false; this.overSpoken = false;
    this.render();
  },
  paint: function () {}
};

/* per-tool styling: STAGE ONLY + the sanctioned body class */
(function injectCSS() {
  var css = ''
  + 'body.mb-wide .lcs-app{max-width:min(1060px,96vw);}'
  + 'body.mb-wide .lcs-title{word-break:keep-all;overflow-wrap:normal;}'
  + '@media (max-width:400px){body.mb-wide .lcs-title{font-size:21px;}}'
  + 'body.mb-wide #lcs-root{height:100%;min-height:0;}'
  + '@media (max-width:560px){body.mb-wide{overflow-y:auto;}body.mb-wide #lcs-root{height:auto;}}'
  + '.mb-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.2vmin,12px);width:100%;height:100%;min-height:0;}'

  /* tabs */
  + '.mb-tabs{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
  + '.mb-tab{display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:10px 18px;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:15px;color:var(--lcs-structure);'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.mb-tab:active{transform:scale(.96);}'
  + '.mb-tab.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.mb-tab.locked{color:var(--lcs-ink-soft);}'
  + '.mb-tab.active.locked{color:var(--lcs-surface);}'

  /* stage */
  + '.mb-stage-outer{position:relative;width:100%;max-width:680px;flex:1 0 auto;display:flex;justify-content:center;align-items:center;overflow:visible;}'
  + '.mb-stage{position:relative;width:660px;height:430px;transform-origin:center center;flex:0 0 auto;'
  +   'background:linear-gradient(180deg,#FDF9F0 55%,#F2E7D3 55.2%,#EFE2CB 100%);'
  +   'border:2px solid #E7DCC8;border-radius:22px;}'

  /* gate */
  + '.mb-gatepanel{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;}'
  + '.mb-gatecard{display:flex;flex-direction:column;align-items:center;gap:10px;max-width:460px;text-align:center;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:18px;padding:22px 26px;'
  +   'box-shadow:0 6px 18px rgba(20,30,28,.08);}'
  + '.mb-gatecard p{font-family:var(--lcs-font-body);font-size:14.5px;color:var(--lcs-ink);margin:0;}'
  + '.mb-gatecard a{font-family:var(--lcs-font-display);font-weight:800;color:#C9502A;text-decoration:underline;font-size:15.5px;}'

  /* estimate bar (UNSCALED chrome above the stage) */
  + '.mb-estbar{width:100%;max-width:680px;min-height:50px;display:flex;justify-content:center;align-items:center;}'
  + '.mb-est{display:flex;align-items:center;justify-content:center;gap:6px 10px;flex-wrap:wrap;}'
  + '.mb-est-ctl{display:inline-flex;align-items:center;gap:8px;flex-wrap:nowrap;white-space:nowrap;}'
  + '.mb-est-q{font-family:var(--lcs-font-display);font-weight:700;font-size:14.5px;color:var(--lcs-ink);}'
  + '.mb-est-btn{width:44px;height:44px;border-radius:50%;border:1.5px solid var(--lcs-line);background:var(--lcs-surface);'
  +   'font-size:20px;font-weight:800;color:var(--lcs-structure);cursor:pointer;}'
  + '.mb-est-val{min-width:30px;text-align:center;font-family:var(--lcs-font-display);font-weight:800;font-size:20px;color:var(--lcs-structure);}'
  + '.mb-est-pin{min-height:44px;padding:8px 14px;border-radius:var(--lcs-radius-pill);border:1.5px solid #F2C879;'
  +   'background:#FDF0DC;font-family:var(--lcs-font-display);font-weight:700;font-size:13.5px;color:#8A6320;cursor:pointer;}'
  + '.mb-est.pinned,.mb-est.compared{pointer-events:none;font-family:var(--lcs-font-display);font-weight:700;}'
  + '.mb-est.pinned{background:#FDF0DC;border:1.5px dashed #F2C879;border-radius:12px;padding:8px 14px;'
  +   'font-size:13.5px;color:#8A6320;transform:rotate(-1.2deg);}'
  + '.mb-est.compared{background:#FDF0DC;border:1.5px solid #F2C879;border-radius:12px;padding:9px 14px;'
  +   'font-size:14px;color:#5A4630;display:inline-flex;gap:7px;}'
  + '.mb-est-spark{color:#E8A53A;font-size:16px;}'

  /* length bench */
  + '.mb-lenobj{position:absolute;pointer-events:none;user-select:none;-webkit-user-drag:none;}'
  + '.mb-track{position:absolute;height:2.5px;background:rgba(20,107,94,.35);border-radius:2px;}'
  + '.mb-track::before,.mb-track::after{content:"";position:absolute;top:-6px;width:2.5px;height:14px;'
  +   'background:rgba(20,107,94,.45);border-radius:2px;}'
  + '.mb-track::before{left:0;}.mb-track::after{right:0;}'
  + '.mb-unit{position:absolute;touch-action:none;}'
  + '.mb-unit.laid{cursor:grab;}'
  + '.mb-unit.laid.counted{background:radial-gradient(circle, rgba(242,200,121,.6), transparent 72%);border-radius:50%;}'
  + '.mb-unit.laid.counted svg{filter:drop-shadow(0 0 10px rgba(232,165,58,.95));}'
  + '.mb-unit.fly{pointer-events:none;z-index:60;filter:drop-shadow(0 8px 12px rgba(20,30,28,.25));}'
  + '.mb-supply{position:absolute;width:96px;height:56px;cursor:grab;touch-action:none;}'
  + '.mb-supply .mb-unit{pointer-events:none;position:absolute;}'
  + '.mb-minichip{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:6px 12px;'
  +   'border-radius:var(--lcs-radius-pill);border:1.5px solid var(--lcs-line);background:var(--lcs-surface);'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:13px;color:var(--lcs-structure);cursor:pointer;}'
  + '.mb-minichip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.mb-minichip.active svg [stroke="#6E8FBF"]{stroke:#CFE3DD;}'
  + '.mb-ruler{position:absolute;animation:mbSlideIn .35s var(--lcs-ease);}'
  + '.mb-ruler-read{position:absolute;left:100%;top:2px;margin-left:10px;font-family:var(--lcs-font-display);'
  +   'font-weight:800;font-size:14px;color:#146B5E;white-space:nowrap;}'
  + '@keyframes mbSlideIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}'
  + '.mb-readout{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);max-width:92%;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 18px;font-family:var(--lcs-font-display);font-weight:800;font-size:15.5px;color:#146B5E;'
  +   'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'
  + '.mb-hint{position:absolute;top:14px;left:50%;transform:translateX(-50%);max-width:88%;text-align:center;'
  +   'font-family:var(--lcs-font-body);font-size:12.5px;color:var(--lcs-ink-soft);}'

  /* capacity */
  + '.mb-vessel{position:absolute;cursor:pointer;touch-action:none;}'
  + '.mb-vessel .mb-vlabel{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);white-space:nowrap;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:12.5px;color:var(--lcs-ink-soft);}'
  + '.mb-vessel .mb-vread{position:absolute;bottom:6px;left:50%;transform:translateX(-50%);white-space:nowrap;'
  +   'font-family:var(--lcs-font-display);font-weight:800;font-size:13px;color:#146B5E;}'
  + '.mb-vessel.target .mb-vsvg rect[stroke]{stroke:#F2784B;}'
  + '.mb-vessel.target .mb-vlabel{color:#C9502A;}'
  + '.mb-vessel.pouring{transform:rotate(-7deg);transition:transform .2s var(--lcs-ease);}'
  + '.mb-vessel{transition:transform .25s var(--lcs-ease);}'
  + '.mb-vessel.brimful .mb-vsvg{filter:drop-shadow(0 0 10px rgba(127,184,216,.8));}'

  /* weight */
  + '.mb-balance{position:absolute;left:0;top:0;pointer-events:none;}'
  + '.mb-balance .mb-cube-g{pointer-events:auto;cursor:pointer;}'
  + '.mb-cubesupply{position:absolute;display:flex;gap:2px;min-width:100px;min-height:44px;padding:6px 10px;'
  +   'background:var(--lcs-surface);border:1.5px dashed rgba(20,107,94,.35);border-radius:14px;cursor:pointer;align-items:center;}'

  /* log */
  + '.mb-log{width:min(480px,92%);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);border-radius:14px;'
  +   'padding:10px 14px;display:flex;flex-direction:column;gap:5px;}'
  + '.mb-log-row{font-family:var(--lcs-font-body);font-size:13px;color:var(--lcs-ink);}'

  /* dock */
  + '.mb-dock{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;padding-bottom:4px;}'
  + '.mb-chiprow{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;}'
  + '.mb-chip{display:inline-flex;align-items:center;gap:6px;min-height:46px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:14.5px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:8px 16px;cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.mb-chip:active{transform:scale(.96);}'
  + '.mb-chip.primary{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.mb-chip:disabled{opacity:.4;cursor:default;}'

  /* phone compression (the 320 fold) */
  + '@media (max-width:560px){'
  +   '.mb-wrap{gap:5px;}'
  +   '.mb-estbar{min-height:44px;}'
  + '}'
  + '@media (max-width:400px){'
  +   '.mb-tabs{gap:6px;}'
  +   '.mb-tab{padding:8px 12px;font-size:13.5px;min-height:46px;}'
  +   '.mb-est-q{font-size:13px;}'
  + '}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.mb-unit.laid{transition:none !important;}'
  +   '.mb-vessel,.mb-vessel.pouring{transition:none;transform:none;}'
  +   '.mb-ruler{animation:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
