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
    /* ⭐ IMPERSONAL ON BOTH SIDES, IN ALL ELEVEN.
       The shipped English was 'You guessed {g} · It measured {n}' — "you"
       against "it" is person-versus-truth, which is exactly the asymmetry a
       no-shame juxtaposition must not have, and en/es/pt/sv/da all carried it
       while de/fr/it/nl/no/fi already used the impersonal participle pair.
       The rule for the native panels: two labels, two numbers, no verb of
       judgement, no second person, no comparative, and never the difference
       (an "off by 2" is a score). */
    compareLine: {en:"Guessed: {g} · Measured: {n}",de:"Geschätzt: {g} · Gemessen: {n}",fr:"Estimation : {g} · Mesure : {n}",it:"Stima: {g} · Misura: {n}",es:"Estimación: {g} · Medición: {n}",pt:"Estimativa: {g} · Medida: {n}",nl:"Geschat: {g} · Gemeten: {n}",sv:"Gissning: {g} · Mätning: {n}",da:"Gæt: {g} · Måling: {n}",no:"Gjetning: {g} · Måling: {n}",fi:"Arvio: {g} · Mittaus: {n}"},
    measuredOnly: {en:"Measured: {n}",de:"Gemessen: {n}",fr:"Mesure : {n}",it:"Misura: {n}",es:"Medición: {n}",pt:"Medida: {n}",nl:"Gemeten: {n}",sv:"Mätning: {n}",da:"Måling: {n}",no:"Måling: {n}",fi:"Mittaus: {n}"},
    thinkLine:    {en:'A guess and a measure — that’s how scientists work!',de:'Schätzen und messen — genau so arbeiten Forscherinnen und Forscher!',fr:'Estimer, puis mesurer — c’est comme ça que travaillent les scientifiques !',it:'Stimare e misurare — è così che lavorano gli scienziati!',es:'Estimar y medir — ¡así trabajan los científicos!',pt:'Primeiro o palpite, depois a medida — é assim que os cientistas trabalham!',nl:'Schatten en meten — zo werken echte wetenschappers!',sv:'Att gissa och sedan mäta — precis så jobbar forskare!',da:'At gætte og måle — sådan arbejder forskere!',no:'Å gjette og måle — akkurat slik jobber forskere!',fi:'Arvio ja mittaus — juuri näin tutkijat työskentelevät!'},
    /* length bench */
    countBtn:     {en:'Count',de:'Zählen',fr:'Compter',it:'Conta',es:'Contar',pt:'Contar',nl:'Tellen',sv:'Räkna',da:'Tæl',no:'Tell',fi:'Laske'},
    lengthDone:   {en:'{noun} is {n} {unitP} long!',de:'{noun} ist {n} {unitP} lang!',fr:'{noun} mesure {n} {unitP} !',it:'{noun} misura {n} {unitP}!',es:'{noun} mide {n} {unitP} — ¡listo!',pt:'{noun} mede {n} {unitP}!',nl:'{noun} is {n} {unitP} lang!',sv:'{noun} mäter {n} {unitP}!',da:'{noun} måler {n} {unitP}!',no:'{noun} måler {n} {unitP}!',fi:'{noun} on mitattu — pituus {n} {unitP}!'},
    notCovered:   {en:'Part of {noun} isn’t covered yet — add more!',de:'Schau, {noun} ist noch nicht ganz bedeckt — leg noch mehr an!',fr:'Il reste un bout à couvrir sur {noun} — ajoutes-en !',it:'Guarda {noun}: un pezzetto è ancora scoperto — aggiungine ancora!',es:'{noun} todavía tiene una parte sin cubrir — ¡pon más!',pt:'{noun} ainda tem um pedacinho sem cobrir — coloque mais!',nl:'Een stukje van {noun} is nog niet bedekt — leg er nog wat bij!',sv:'En bit av {noun} är inte täckt än — lägg dit fler!',da:'Et stykke af {noun} er ikke dækket endnu — læg flere på!',no:'En del av {noun} er ikke dekket ennå — legg på flere!',fi:'Osa on vielä paljaana — peitä {noun} kokonaan!'},
    /* the endpoint misconception — 1.MD.A.2 names it explicitly ("span it …
       with no gaps or overlaps", FROM the endpoint) and the tool had no line
       for it at all: a chain starting left of the object was silently yanked
       to the start with the gap line, or nothing. */
    startLine: {en:"Let’s begin at the very start of {noun}, so nothing is missed.",de:"Wir fangen ganz vorne an, da wo {noun} anfängt — dann fehlt nichts.",fr:"On part juste du bord, là où {noun} commence, comme ça on n’oublie rien.",it:"Il primo pezzo va proprio dove comincia {noun}, così non ci sfugge niente.",es:"La primera pieza va justo donde empieza {noun}, así no nos dejamos nada.",pt:"A primeira peça vai bem onde {noun} começa, assim não fica nada de fora.",nl:"We beginnen helemaal bij het begin van {noun}, dan slaan we niets over.",sv:"Vi börjar precis vid kanten på {noun}, så att ingenting missas.",da:"Vi begynder helt ude ved kanten af {noun}, så vi får det hele med.",no:"Vi starter helt ute ved kanten av {noun}, så får vi med alt sammen.",fi:"{noun} mitataan aivan päästä alkaen, niin mitään ei jää väliin."},
    /* ⭐⭐ THE LABEL MUST BE DEFECT-NEUTRAL — "With gaps" WAS FALSE.
       Two native panels found this independently, in code written the same
       hour, and the Nordic panel traced it: a GAPPY chain closes to FEWER
       units than the object needs, so `closed.length < need0` fires
       _speakCover and returns — this line is never reached. It renders for
       OVERLAPS (where the laid count is HIGHER and the scooch pushes them
       APART) and for a misaligned start. So the one case the old label named
       is the one case that cannot produce it.
       ⚠ AND THE PLACEHOLDERS ARE RENAMED. {a}/{b} are vessel NOUN PHRASES in
       capSameLine/capDiffLine and bare INTEGERS here — the same two letters
       for two incompatible types, in a `fmt` that is a blind global regex.
       Both panels called it a design error; a future retrofit reasoning about
       placeholder meaning would render a beaker's name where a count belongs
       and fail no gate. */
    bothCountsLine: {en:"First count: {n1} · End to end: {n2}",de:"So gelegt: {n1} · Kante an Kante: {n2}",fr:"D’abord : {n1} · Bout à bout : {n2}",it:"Come stavano: {n1} · Tutti attaccati: {n2}",es:"Tal como estaban: {n1} · Todas juntas: {n2}",pt:"Do jeito que ficaram: {n1} · Bem juntinhas: {n2}",nl:"Eerste telling: {n1} · Tegen elkaar: {n2}",sv:"Som de låg: {n1} · Kant i kant: {n2}",da:"Som de lå: {n1} · Kant mod kant: {n2}",no:"Slik de lå: {n1} · Kant i kant: {n2}",fi:"Näin ladottuna: {n1} · Kiinni toisissaan: {n2}"},
    scoochLine:   {en:'Let’s snuggle the {unitP} together so nothing is missed.',de:'Wir rücken die {unitP} zusammen, damit nichts fehlt.',fr:'On serre les {unitP} les uns contre les autres pour ne rien oublier.',it:'Avviciniamo la fila di {unitP}, così non ci sfugge niente.',es:'Juntemos los {unitP} para que no falte nada.',pt:'Vamos deixar os {unitP} bem juntinhos, para não pular nada.',nl:'We schuiven de {unitP} tegen elkaar aan, zo slaan we niets over.',sv:'Vi knuffar ihop alla {unitP} så att inget missas.',da:'Lad os rykke de små {unitP} helt sammen, så vi ikke springer noget over.',no:'Vi legger {unitP} kant i kant — da blir ingenting glemt.',fi:'Työnnetään jokaista {unitP} vähän lähemmäs, ettei mitään jää väliin.'},
    anotherObj:   {en:'Another object',de:'Noch ein Gegenstand',fr:'Un autre objet',it:'Un altro oggetto',es:'Otro objeto',pt:'Outro objeto',nl:'Nog een voorwerp',sv:'Ett nytt föremål',da:'En ny ting',no:'En ny gjenstand',fi:'Uusi esine'},
    anotherPair: {en:"Two new beakers",de:"Zwei andere Gefäße",fr:"Deux autres récipients",it:"Altri due recipienti",es:"Otros dos recipientes",pt:"Outros dois recipientes",nl:"Twee nieuwe bakjes",sv:"Två nya kärl",da:"To nye beholdere",no:"To nye beholdere",fi:"Uudet astiat"},
    lengthHint: {en:"Drag paperclips or cubes from the pile and lay them along the object. Drag one back to the pile to take it away.",de:"Zieh Büroklammern oder Würfel aus dem Stapel und leg sie am Gegenstand entlang. Zieh sie auf den Stapel zurück, um sie wieder wegzunehmen.",fr:"Fais glisser les trombones ou les cubes du tas et pose-les le long de l’objet, puis appuie sur Compter.",it:"Trascina i pezzi dal mucchietto e mettili lungo l’oggetto, uno dopo l’altro. Trascina un pezzo nel mucchietto per toglierlo.",es:"Arrastra las piezas del montón y ponlas a lo largo del objeto, una detrás de otra. Arrastra una pieza al montón para quitarla.",pt:"Arraste as peças do montinho e coloque-as ao longo do objeto, uma depois da outra. Arraste uma peça de volta para o montinho para tirá-la.",nl:"Sleep paperclips of blokjes van de stapel en leg ze langs het voorwerp. Sleep er een terug naar de stapel om hem weg te halen.",sv:"Dra en i taget från högen och lägg dem längs föremålet.",da:"Træk én ad gangen fra bunken, og læg dem langs tingen.",no:"Dra én om gangen fra haugen og legg dem langs gjenstanden.",fi:"Vedä pinosta mittapaloja ja lado ne viivalle kuvan alle. Palan voi siirtää tai vetää takaisin pinoon."},
    /* capacity bench */
    vesselJug:    {en:'the jug',de:'der Krug',fr:'la carafe',it:'la brocca',es:'la jarra',pt:'a jarra',nl:'de kan',sv:'kannan',da:'kanden',no:'kanna',fi:'kannuun'},
    vesselTall:   {en:'the tall beaker',de:'das hohe Glas',fr:'le verre haut',it:'il bicchiere alto',es:'el vaso alto',pt:'o pote alto',nl:'de hoge maatbeker',sv:'den höga bägaren',da:'det høje bæger',no:'det høye begeret',fi:'korkeaan astiaan'},
    vesselWide:   {en:'the wide beaker',de:'die breite Schale',fr:'le bol large',it:'la ciotola larga',es:'el tazón ancho',pt:'a tigela larga',nl:'de brede schaal',sv:'den breda skålen',da:'den brede skål',no:'den brede skålen',fi:'leveään astiaan'},
    capacityDone: {en:'{noun} holds {n} {unitP}!',de:'{noun} fasst {n} {unitP}!',fr:'{noun} contient {n} {unitP} !',it:'{noun} contiene {n} {unitP}!',es:'En {noun} caben {n} {unitP} — ¡ya lo medimos!',pt:'{noun} guarda {n} {unitP}!',nl:'In {noun} passen {n} {unitP}!',sv:'{noun} rymmer {n} {unitP}!',da:'{noun} kan rumme {n} {unitP}!',no:'{noun} rommer {n} {unitP}!',fi:'{noun} mahtuu {n} {unitP}!'},
    fullLine:     {en:'It’s full to the top!',de:'Randvoll!',fr:'C’est rempli à ras bord !',it:'Fino all’orlo!',es:'¡Se llenó hasta el borde!',pt:'Encheu até a boca!',nl:'Helemaal vol tot aan de rand!',sv:'Fylld ända till brädden!',da:'Fyldt helt til randen!',no:'Fylt helt til randen!',fi:'Täynnä piripintaan!'},
    pourHint:     {en:'Tap a beaker to choose it, then press and hold the jug to pour. Hold a beaker to pour it back.',de:'Tippe auf ein Gefäß und halte dann den Krug gedrückt, um zu gießen. Halte ein Gefäß gedrückt, um zurückzugießen.',fr:'Touche un récipient pour le choisir, puis maintiens la carafe appuyée pour verser. Maintiens un récipient appuyé pour reverser l’eau.',it:'Tocca un recipiente per sceglierlo, poi tieni premuta la brocca per versare. Tieni premuto un recipiente per versare di nuovo nella brocca.',es:'Toca un recipiente para elegirlo y mantén presionada la jarra para verter. Mantén presionado un recipiente para regresar el agua.',pt:'Toque em um recipiente para escolher e segure a jarra para despejar. Segure um recipiente para despejar de volta.',nl:'Tik op een bak om te kiezen en houd de kan ingedrukt om te schenken. Houd een bak ingedrukt om terug te schenken.',sv:'Tryck på ett kärl för att välja det och håll sedan kannan intryckt för att hälla. Håll ett kärl intryckt för att hälla tillbaka.',da:'Tryk på en beholder for at vælge den, og hold kanden nede for at hælde. Hold en beholder nede for at hælde tilbage.',no:'Trykk på en beholder for å velge den, og hold kanna inne for å helle. Hold en beholder inne for å helle tilbake.',fi:'Valitse astia napauttamalla ja kaada pitämällä kannua pohjassa. Kaada takaisin pitämällä astiaa pohjassa.'},
    /* the conservation moment: both vessels filled. DESCRIBES the containers —
       never "you were tricked", never a comparative aimed at what the child
       believed. Fires at most once per pair. */
    capSameLine: {en:"{a} and {b} both hold {n} {unitP}. Two different shapes, the same number of {unitP}.",de:"{a} und {b} fassen beide {n} {unitP}. Sie sehen ganz verschieden aus, und die Zahl ist gleich.",fr:"{a} et {b} contiennent tous les deux {n} {unitP}. Ils ne se ressemblent pas du tout, et le nombre est le même.",it:"{a} e {b} contengono {n} {unitP}. Da fuori non si somigliano per niente, e il numero è lo stesso.",es:"En {a} y en {b} caben {n} {unitP}. Por fuera no se parecen en nada, y el número es el mismo.",pt:"{a} e {b} guardam {n} {unitP}. Por fora não se parecem em nada, e o número é o mesmo.",nl:"In {a} en in {b} passen allebei {n} {unitP}. Twee verschillende vormen, hetzelfde aantal {unitP}.",sv:"{a} och {b} rymmer båda {n} {unitP}. De ser helt olika ut, och ändå blir det lika många.",da:"{a} og {b} rummer begge {n} {unitP}. De ser helt forskellige ud, og alligevel bliver det lige mange.",no:"{a} og {b} rommer begge {n} {unitP}. De ser helt ulike ut, og likevel blir det like mange.",fi:"{a} mahtuu {n} {unitP} ja {b} mahtuu {n} {unitP}. Astiat näyttävät aivan erilaisilta, ja luku on sama."},
    capDiffLine: {en:"{a} holds {na} {unitP} and {b} holds {nb} {unitP}.",de:"{a} fasst {na} {unitP}, {b} fasst {nb} {unitP}.",fr:"{a} contient {na} {unitP} et {b} en contient {nb}.",it:"{a} contiene {na} {unitP} e {b} ne contiene {nb}.",es:"En {a} caben {na} {unitP} y en {b} caben {nb}.",pt:"{a} guarda {na} {unitP} e {b} guarda {nb}.",nl:"In {a} passen {na} {unitP} en in {b} passen er {nb}.",sv:"{a} rymmer {na} {unitP} och {b} rymmer {nb}.",da:"{a} rummer {na} {unitP}, og {b} rummer {nb}.",no:"{a} rommer {na} {unitP} og {b} rommer {nb}.",fi:"{a} mahtuu {na} {unitP} ja {b} mahtuu {nb} {unitP}."},
    /* weight bench */
    weightHint:   {en:'Tap cubes onto the pan until the scale balances.',de:'Lege Würfel auf die Waagschale, bis die Waage im Gleichgewicht ist.',fr:'Pose des cubes sur le plateau jusqu’à ce que la balance soit en équilibre.',it:'Metti i cubetti sul piatto finché la bilancia non è in equilibrio.',es:'Pon cubos en el platillo hasta que la balanza quede en equilibrio.',pt:'Coloque cubinhos no prato até a balança ficar equilibrada.',nl:'Leg blokjes op het schaaltje tot de weegschaal in evenwicht is.',sv:'Lägg kuber på vågskålen tills vågen är i jämvikt.',da:'Læg terninger på vægtskålen, indtil vægten er i balance.',no:'Legg kuber på vektskålen til vekten er i balanse.',fi:'Lisää kuutioita vaakakuppiin, kunnes vaaka on tasapainossa.'},
    weightDone:   {en:'{noun} weighs {n} {unitP}!',de:'{noun} wiegt {n} {unitP}!',fr:'{noun} pèse {n} {unitP} !',it:'{noun} pesa {n} {unitP}!',es:'{noun} pesa {n} {unitP} — ¡quedó en equilibrio!',pt:'{noun} pesa {n} {unitP}!',nl:'{noun} weegt {n} {unitP}!',sv:'{noun} väger {n} {unitP}!',da:'{noun} vejer {n} {unitP}!',no:'{noun} veier {n} {unitP}!',fi:'{noun} painaa {n} {unitP}!'},
    /* ⚠ WAS THE CLOSEST THING TO A VERDICT IN THE FILE: "Hmm — the cubes are
       heavier now. Take one off?" is an instruction to undo a specific choice
       the child just made, delivered by the machine, and it survived only on a
       once-per-session throttle. The beam already says everything that follows;
       the sentence now only DESCRIBES the picture. */
    takeOneOff: {en:"The cubes are heavier now.",de:"Jetzt ist die Waagschale mit den Würfeln schwerer.",fr:"Maintenant, le plateau des cubes descend : il est plus lourd.",it:"Adesso pesa di più il piatto dei cubetti.",es:"Ahora pesa más el platillo de los cubos.",pt:"Agora o prato dos cubinhos está mais pesado.",nl:"Nu zijn de blokjes zwaarder.",sv:"Nu är det kuberna som väger ner.",da:"Nu er det terningerne, der vejer ned.",no:"Nå er det kubene som veier ned.",fi:"Nyt kuutioiden puoli painaa enemmän."},
    /* chrome */
    rulerLabel:   {en:'Ruler check',de:'Lineal-Check',fr:'Vérif à la règle',it:'Controllo col righello',es:'Prueba con la regla',pt:'Conferir na régua',nl:'Liniaal-check',sv:'Linjalkoll',da:'Linealtjek',no:'Linjalsjekk',fi:'Viivaintarkistus'},
    myGuesses:    {en:'My guesses',de:'Meine Schätzungen',fr:'Mes estimations',it:'Le mie stime',es:'Mis estimaciones',pt:'Meus palpites',nl:'Mijn schattingen',sv:'Mina gissningar',da:'Mine gæt',no:'Mine gjetninger',fi:'Omat arvioni'},
    saveSetup:    {en:'Save this setup',de:'Aufbau speichern',fr:'Enregistrer ce montage',it:'Salva questa postazione',es:'Guardar esta estación',pt:'Salvar esta bancada',nl:'Deze opstelling opslaan',sv:'Spara uppställningen',da:'Gem opstillingen',no:'Lagre oppsettet',fi:'Tallenna tämä asetelma'},
    savedList:    {en:'Saved setups',de:'Gespeicherte Aufbauten',fr:'Montages enregistrés',it:'Postazioni salvate',es:'Estaciones guardadas',pt:'Bancadas salvas',nl:'Opgeslagen opstellingen',sv:'Sparade uppställningar',da:'Gemte opstillinger',no:'Lagrede oppsett',fi:'Tallennetut asetelmat'},
    printSheet: {en:"Print the measuring pages",de:"Arbeitsblatt drucken",fr:"Imprimer la fiche",it:"Stampa la scheda delle misure",es:"Imprimir la ficha de medidas",pt:"Imprimir a folha de medidas",nl:"Meetbladen afdrukken",sv:"Skriv ut arket",da:"Print arket",no:"Skriv ut arket",fi:"Tulosta moniste"},
    startAgain:   {en:'Start again',de:'Noch einmal',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw beginnen',sv:'Börja om',da:'Begynd forfra',no:'Begynn på nytt',fi:'Aloita alusta'},
    gateBench:    {en:'The capacity and weight benches — pouring, weighing, the guess log and saved setups — are part of Premium. The length bench with the estimate chip is always free.',de:'Die Füllmengen- und die Gewichts-Werkbank — Gießen, Wiegen, die Schätzliste und gespeicherte Aufbauten — gehören zu Premium. Die Längen-Werkbank mit dem Schätzzettel bleibt immer kostenlos.',fr:'Les ateliers contenance et poids — verser, peser, le carnet d’estimations et les montages enregistrés — font partie de Premium. L’atelier longueur, avec son estimation, reste toujours gratuit.',it:'I banchi della capacità e del peso — versare, pesare, il diario delle stime e le postazioni salvate — fanno parte di Premium. Il banco della lunghezza, con la sua stima, resta sempre gratuito.',es:'Los talleres de capacidad y peso — verter, pesar, el diario de estimaciones y las estaciones guardadas — son parte de Premium. El taller de longitud con la estimación siempre es gratis.',pt:'As bancadas de capacidade e peso — despejar, pesar, o diário de palpites e as bancadas salvas — fazem parte do Premium. A bancada de comprimento com o palpite é sempre gratuita.',nl:'De werkbanken voor inhoud en gewicht — schenken, wegen, de schattingenlijst en opgeslagen opstellingen — horen bij Premium. De lengtewerkbank, mét schatten, blijft altijd gratis.',sv:'Volym- och viktbänkarna — att hälla, att väga, gissningsloggen och sparade uppställningar — ingår i Premium. Längdbänken med gissningsrutan är alltid gratis.',da:'Rumfangs- og vægtbænkene — at hælde og veje, gættelisten og de gemte opstillinger — hører til Premium. Længdebænken, hvor man også gætter først, er altid gratis.',no:'Volum- og vektbenkene — å helle, veie, gjettelista og lagrede oppsett — er en del av Premium. Lengdebenken med gjettelappen er alltid gratis.',fi:'Tilavuuden ja painon mittaaminen — kaataminen, punnitseminen, arvioloki ja tallennetut asetelmat — kuuluu Premiumiin. Pituuden mittaaminen arviolappuineen on aina ilmaista.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    loading:      {en:'Setting up the workshop…',de:'Die Werkstatt wird aufgebaut…',fr:'On installe l’atelier…',it:'Prepariamo il banco…',es:'Montando el taller…',pt:'Montando a bancada…',nl:'De werkbank wordt klaargezet…',sv:'Bänken ställs i ordning…',da:'Bænken stilles op…',no:'Benken settes opp…',fi:'Mittauspajaa laitetaan kuntoon…'},
    setUnits:     {en:'Ruler units',de:'Lineal-Einheiten',fr:'Unités de la règle',it:'Unità del righello',es:'Unidades de la regla',pt:'Unidades da régua',nl:'Eenheden van de liniaal',sv:'Linjalens enheter',da:'Linealens enheder',no:'Linjalens enheter',fi:'Viivaimen yksiköt'},
    unitsCm:      {en:'Centimeters',de:'Zentimeter',fr:'Centimètres',it:'Centimetri',es:'Centímetros',pt:'Centímetros',nl:'Centimeters',sv:'Centimeter',da:'Centimeter',no:'Centimeter',fi:'Senttimetrit'},
    unitsInch:    {en:'Inches',de:'Zoll',fr:'Pouces',it:'Pollici',es:'Pulgadas',pt:'Polegadas',nl:'Inches',sv:'Tum',da:'Tommer',no:'Tommer',fi:'Tuumat'},
    setRuler:     {en:'Ruler check after counting',de:'Lineal-Check nach dem Zählen',fr:'Vérification à la règle après le comptage',it:'Controllo col righello dopo il conteggio',es:'Prueba con la regla después de contar',pt:'Conferir na régua depois de contar',nl:'Liniaal-check na het tellen',sv:'Linjalkoll efter räkningen',da:'Linealtjek efter tællingen',no:'Linjalsjekk etter tellingen',fi:'Viivaintarkistus laskemisen jälkeen'},
    setScale: {en:"Numbers on the beakers",de:"Zahlen an den Gefäßen",fr:"Graduations des récipients",it:"Tacche sui recipienti",es:"Marcas en los recipientes",pt:"Marcas nos recipientes",nl:"Cijfers op de bakjes",sv:"Siffror på kärlen",da:"Tal på beholderne",no:"Tall på beholderne",fi:"Astioiden numerot"},
    scaleNone: {en:"No numbers",de:"Ohne Zahlen",fr:"Sans chiffres",it:"Senza numeri",es:"Sin números",pt:"Sem números",nl:"Geen cijfers",sv:"Utan siffror",da:"Uden tal",no:"Uten tall",fi:"Ei numeroita"},
    scaleCups: {en:"Cups",de:"Becher",fr:"Gobelets",it:"Misurini",es:"Tazas",pt:"Copinhos",nl:"Bekers",sv:"Muggar",da:"Kopper",no:"Kopper",fi:"Kupilliset"},
    scaleMl: {en:"Milliliters",de:"Milliliter",fr:"Millilitres",it:"Millilitri",es:"Mililitros",pt:"Mililitros",nl:"Milliliters",sv:"Milliliter",da:"Milliliter",no:"Milliliter",fi:"Millilitrat"},
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
  /* ⚠ RESPREAD. The header claims relative sanity "is part of the point", and
     the shipped table gave up exactly where a child would notice: FOUR things
     as different as a duck, a book, a shoe and a rabbit all weighed 5, and the
     top of the range ceilinged out with bear = cow = horse = 12. The ordering
     the bench claims to teach has to survive at the heavy end, which is where
     it is most obvious. Still integers, still 3..16. */
  WEIGHTS: {
    strawberry: 3, mouse: 3,
    apple: 4, hamster: 4,
    ball: 5, owl: 5,
    book: 6, shoe: 6,
    duck: 7, rabbit: 7,
    cat: 8,
    penguin: 9, pumpkin: 9,
    fox: 10, koala: 10,
    watermelon: 11, dog: 11,
    sheep: 12,
    deer: 13, pig: 13,
    lion: 14, panda: 14,
    bear: 15,
    cow: 16, horse: 16
  },

  /* =================== capacity: the vessel model ===================
     ⭐⭐ A CUP IS THE SAME AMOUNT IN EVERY VESSEL, AND IT WAS NOT.
     Measured on the shipped build: jug 130x220 for 12 cups, tall 95x250 for
     8, wide 160x150 for 6 — that is 2383 / 2969 / 4000 px2 per cup, a 68%
     spread. On a bench whose whole subject is that a unit is a fixed amount,
     the drawn unit visibly was not one. Worse, the WIDE beaker had the LARGER
     cross-section (24000 vs 23750) while holding FEWER cups.
     Every vessel below spends exactly CUP_AREA px2 per cup, so the areas are
     the cups and a child can trust their eyes.

     ⭐⭐ AND THE TALL ONE HELD MORE, WHICH IS THE MISCONCEPTION THIS BENCH
     EXISTS TO DISTURB. tall=8 vs wide=6 confirmed "taller means more", twice,
     and then the bench died — jug 10 could never fill 8+6=14, so both
     beakers were unfillable and press-and-hold went silent with no message.
     The pairs below are authored: two COLLISIONS (same capacity, nothing
     alike), two INVERSIONS (the taller one holds FEWER), and two ordinary
     pairs so the inversion is a discovery and not a rule. */
  CUP_AREA: 1900,
  CAP_BASE_Y: 350,
  CAP_PAIRS: [
    /* 1 COLLISION — 6 and 6, one 190 tall and one 75 tall */
    { tall: { w: 60, h: 190, cap: 6 }, wide: { w: 152, h: 75, cap: 6 } },
    /* 2 INVERSION — the 190-tall holds 5, the 100-tall holds 8 */
    { tall: { w: 50, h: 190, cap: 5 }, wide: { w: 152, h: 100, cap: 8 } },
    /* 3 ordinary — taller holds more, so the inversion stays a discovery */
    { tall: { w: 70, h: 190, cap: 7 }, wide: { w: 100, h: 76, cap: 4 } },
    /* 4 COLLISION — 8 and 8 */
    { tall: { w: 76, h: 200, cap: 8 }, wide: { w: 152, h: 100, cap: 8 } },
    /* 5 INVERSION — 190 tall holds 5, 75 tall holds 6 */
    { tall: { w: 50, h: 190, cap: 5 }, wide: { w: 152, h: 75, cap: 6 } },
    /* 6 ordinary */
    { tall: { w: 60, h: 190, cap: 6 }, wide: { w: 100, h: 57, cap: 3 } }
  ],
  JUG: { w: 150, h: 228, cap: 18 },
  /* live geometry for the CURRENT pair — rebuilt by _buildVessels. Seeded
     with pair 0 so the pure gate can read it without running init. */
  VESSELS: {
    jug:  { cap: 18, start: 14, x: 40,  w: 150, h: 228, nounKey: 'vesselJug' },
    tall: { cap: 6,  start: 0,  x: 291, w: 60,  h: 190, nounKey: 'vesselTall' },
    wide: { cap: 6,  start: 0,  x: 447, w: 152, h: 75,  nounKey: 'vesselWide' }
  },
  POUR_RATE: 1.6,          /* cups per second */
  ML_PER_CUP: 50,

  /* balance physics */
  BAL: { maxAngle: 14, k: 3, spring: 0.016, damp: 0.88, arm: 175 },

  /* ⚠ `mlMode` (a toggle) became `capScale` (a choice) because the third state
     is the one that matters: the graduation numerals OFF. With them on, the
     capacity answer is printed on the glass and can be read without pouring a
     drop — which is exactly what this tool's own cited ancestor
     pour-measure-core.js locks out. Off is the default; the number comes from
     counting the tally. A teacher who wants the scale can still have it. */
  defaults: { units: 'cm', rulerCheck: false, capScale: 'none', speakNames: true },
  settings: [
    { key: 'units', type: 'choice', labelKey: 'setUnits', options: [
      { value: 'cm', labelKey: 'unitsCm' }, { value: 'inch', labelKey: 'unitsInch' }
    ] },
    { key: 'rulerCheck', type: 'toggle', labelKey: 'setRuler' },
    { key: 'capScale', type: 'choice', labelKey: 'setScale', options: [
      { value: 'none', labelKey: 'scaleNone' },
      { value: 'cups', labelKey: 'scaleCups' },
      { value: 'ml', labelKey: 'scaleMl' }
    ] },
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
    /* ⚠ ONE THROTTLE PER DEFECT KIND, not one for all three. A single boolean
       meant the first defect a child met silenced the other two for the whole
       session. */
    this._defectSpoken = {};
    this._laidCount = null;      /* the count BEFORE the scooch, when they differ */
    /* estimate state (per bench measure-cycle) */
    this.est = null;             /* {value, pinned} */
    this.measured = null;        /* number after measuring */
    /* capacity state */
    this.levels = null;
    this.capPair = 0;
    this.capTarget = 'tall';
    this.capDone = {};           /* vessel -> announced capacity */
    this.fullSpoken = false;
    this.pairSpoken = false;
    /* weight state */
    this.wtIdx = 0;
    this.cubes = 0;
    this.balAngle = 0;
    this.balVel = 0;
    this.overSpoken = false;
    this.settled = false;
    this._raf = null;
    this._actx = null;
    this._hintDone = {};        /* bench -> the child has done the thing; retire the nudge */
    this._benchAnnounced = null;
    this._lastMeasured = {};    /* bench -> the previous result, seeds the next guess */
    this._estBy = {};           /* estKey -> {value, pinned} */
    this._measBy = {};          /* estKey -> the measured number */
    this.thinkSpoken = false;

    this.WEIGHT_KEYS = Object.keys(this.WEIGHTS);

    /* ⭐⭐ RELEASE THE VIEWPORT BINDING — MEASURED, NOT DERIVED.
       scripts/repro-wodb-iframe-height.js reproduced this on production
       2026-08-05 and names THIS tool in its results table: the bench drew
       inside a 422px iframe at BOTH 1440 and 2560. The chain was
       `body.mb-wide #lcs-root{height:100%}` -> lcs-shell.css:70
       `.lcs-app{height:100%}` resolving against the IFRAME viewport ->
       lcs-shell.js reporting that height back to the parent, which had set
       it from ActivityIframe's INITIAL_HEIGHT = 420. A fixed point. Phones
       escaped through the 560px rule, which is exactly why it survived: it
       bit only at the widths a teacher projects from, and every QA render
       of this tool was ever taken against measurement-bench.html directly.
       The stage is now width-driven and content height drives the iframe.
       ⚠ AND FREEING IT CLIPS THE STANDALONE DOCUMENT unless the shell's
       `html,body{height:100%;overflow:hidden}` is released too — that is
       the defect wodb hit the moment after its own fix. Tool-scoped via a
       class on the root; 0 lines to the shell. */
    document.documentElement.classList.add('mb-html');

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

  /* Lay out the current pair. Widths differ per pair, so the x positions are
     COMPUTED from them — a hardcoded x would collide the moment a wider
     vessel came up. Bases share one line, because two vessels standing at
     different heights cannot be compared by eye. */
  _buildVessels: function () {
    var p = this.CAP_PAIRS[this.capPair % this.CAP_PAIRS.length];
    var J = this.JUG;
    var total = J.w + p.tall.w + p.wide.w;
    var gap = Math.max(24, Math.round((660 - 80 - total) / 2));
    var x0 = Math.round((660 - (total + gap * 2)) / 2);
    this.VESSELS = {
      jug:  { cap: J.cap, start: p.tall.cap + p.wide.cap + 2, x: x0, w: J.w, h: J.h, nounKey: 'vesselJug' },
      tall: { cap: p.tall.cap, start: 0, x: x0 + J.w + gap, w: p.tall.w, h: p.tall.h, nounKey: 'vesselTall' },
      wide: { cap: p.wide.cap, start: 0, x: x0 + J.w + gap + p.tall.w + gap, w: p.wide.w, h: p.wide.h, nounKey: 'vesselWide' }
    };
  },

  _resetCapacity: function () {
    this._buildVessels();
    this.levels = { jug: this.VESSELS.jug.start, tall: 0, wide: 0 };
    this.capDone = {};
    this.capTarget = 'tall';
    this.fullSpoken = false;
    this.pairSpoken = false;
  },

  /* the next problem — the control the bench never had */
  _nextPair: function () {
    this.capPair = (this.capPair + 1) % this.CAP_PAIRS.length;
    this._resetCapacity();
    this.measured = null;
    this.render();
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
    /* ⚠ A RENDER MID-DRAG DESTROYS THE ELEMENT UNDER THE FINGER.
       render() does stage.innerHTML = '', and three things can fire it while a
       pointer is down: the entitlement fetch resolving (a network round trip,
       so ~200ms after mount — right inside a first drag), a settings toggle,
       and the brim handler 650ms after a pour while the finger is very likely
       still on the jug. The capture goes with the node, the pointerup lands on
       nothing, and it reads as "the tool stopped responding". Defer instead. */
    if (this._dragging) { this._renderQueued = true; return; }
    this._renderQueued = false;
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
        self.render();
      });
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);
    this._tabsEl = tabs;

    /* ⭐ THE HINT IS UNSCALED CHROME AND IT IS A FIRST-RUN NUDGE, NOT FURNITURE.
       It used to be a 12.5px line INSIDE the scaled stage, which renders at 5.7
       device pixels at the 320px floor — instructions shipped as decoration. It
       was also inconsistent: capacity and weight drew one and the LENGTH bench,
       the only one a free teacher ever sees, drew none at all. Now: one slot,
       every bench, real size, and it retires itself after the child has
       actually done the thing, so it never becomes permanent clutter.
       ⚠ The screen-reader path must NOT depend on an element that hides itself
       — the same string is announced on bench entry regardless. */
    var hintKey = { length: 'lengthHint', capacity: 'pourHint', weight: 'weightHint' }[this.bench];
    var hintTxt = (hintKey && this.strings[hintKey]) ? api.t(hintKey) : '';
    var hint = api.el('p', 'mb-hint');
    if (hintTxt && !this._hintDone[this.bench] && !(this.bench !== 'length' && !this.premium)) {
      hint.textContent = hintTxt;
      hint.classList.add('on');
    }
    wrap.appendChild(hint);
    this._hintEl = hint;
    if (hintTxt && this._benchAnnounced !== this.bench) {
      this._benchAnnounced = this.bench;
      api.announce(hintTxt);
    }

    /* ⭐ THE GUESS BELONGS TO THE OBJECT, NOT TO THE SESSION.
       `est` was a single slot cleared on every tab change, every unit switch
       and — worst — on every beaker tap, so glancing at the other beaker
       silently destroyed a pinned guess. Keyed per object it survives all
       three, and coming back to a vessel restores what the child said. */
    var ek = this._estKey();
    this.est = this._estBy[ek] || null;
    this.measured = this._measBy[ek] != null ? this._measBy[ek] : null;

    /* estimate bar — UNSCALED chrome (tap targets stay ≥44 on phones) */
    var estBar = api.el('div', 'mb-estbar');
    wrap.appendChild(estBar);
    this._estHost = estBar;
    estBar.appendChild(this._buildEstimateChip());

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

    /* the read-aloud sentence lives OUTSIDE the scaled stage.
       ⚠ A 45-character German sentence at a legible size cannot fit inside a
       297px-wide stage on a 320px phone, at ANY counter-scale — so the old
       in-stage pill answered that with `text-overflow:ellipsis`, i.e. it
       silently truncated the one string a teacher reads out loud. Out here it
       is ordinary responsive text that wraps, in every language. */
    var say = api.el('div', 'mb-say');
    var sayText = this._sayLine();
    if (sayText) { say.textContent = sayText; say.classList.add('on'); }
    wrap.appendChild(say);
    this._sayEl = say;

    var dock = this._dock();
    wrap.appendChild(dock);
    this._dockEl = dock;
    this._ensureSheet();
    this._measureEstBar();
    this._fitStage();
    if (!this._fitBound) {
      this._fitBound = true;
      window.addEventListener('resize', function () { self._fitStage(); });
    }
    /* the estimate bar and the say-line change height as the child works, and
       neither fires a window resize — a ResizeObserver is the only thing that
       sees them.
       ⚠ TWO WAYS THIS BITES. (a) `wrap` is a NEW element on every render, so
       one observe() at mount would watch a detached node forever — re-observe
       here, every time. (b) _fitStage WRITES the stage's height, which resizes
       the wrap, which fires the observer again: an infinite loop unless the
       fit is idempotent. It is — _fitStage early-returns when the scale it
       computes equals the one already applied — so the second pass terminates. */
    if (window.ResizeObserver) {
      if (!this._ro) this._ro = new ResizeObserver(function () { self._fitStage(); });
      this._ro.disconnect();
      this._ro.observe(wrap);
    }
  },
  /* Everything the card spends on height that is NOT the stage.
     ⚠ MEASURED AS A DIFFERENCE, NOT SUMMED FROM A LIST. Adding up the tabs,
     the estimate bar and the dock under-counted by ~90px — the wrap's three
     flex gaps, the card's own padding and the shell header were all missing —
     and the dock dropped below the fold on four of eight viewports while the
     arithmetic said it fitted. A list of parts goes stale the first time a
     part is added; a difference cannot.
     This is NOT circular: the stage's own height is the thing subtracted out,
     so the result is invariant under the scale it is used to compute. */
  _overheadH: function () {
    var app = this._wrap && this._wrap.closest ? this._wrap.closest('.lcs-app') : null;
    if (!app || !this._stageOuter) return 300;
    var a = app.getBoundingClientRect().height;
    var st = this._stageOuter.getBoundingClientRect().height;
    if (!(a > 0)) return 300;
    return Math.max(0, a - st);
  },

  /* Reserve the estimate bar's TALLEST state once, by rendering a hidden
     clone of the longest prompt this locale can produce and measuring it. One
     measurement beats a per-language tuning table, and the reserve is the
     WRAPPED height — clipping a wrapped German prompt would trade a jump for
     a truncation. Re-measured on width change because wrapping depends on it. */
  _measureEstBar: function () {
    if (!this._estHost || !this._wrap) return;
    var w = Math.round(this._estHost.clientWidth || 0);
    if (!w) return;
    if (this._estBarW === w && this._estBarH) {
      this._wrap.style.setProperty('--mb-estbar-h', this._estBarH + 'px');
      return;
    }
    var longest = '';
    ['estPromptLen', 'estPromptCap', 'estPromptWt'].forEach(function (k) {
      var s = this.api.t(k);
      if (s && s.length > longest.length) longest = s;
    }, this);
    var ghost = this.api.el('div', 'mb-est');
    ghost.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;left:-9999px;width:' + w + 'px;';
    var q = this.api.el('span', 'mb-est-q');
    q.textContent = longest.replace(/\{unitP\}/g, this._unitName('clip', 2)).replace(/\{noun\}/g, this._noun('toothbrush'));
    var ctl = this.api.el('div', 'mb-est-ctl');
    ctl.innerHTML = '<button class="mb-est-btn">-</button><span class="mb-est-val">00</span>' +
      '<button class="mb-est-btn">+</button><button class="mb-est-pin">' + this._esc(this.api.t('estPin')) + '</button>';
    ghost.append(q, ctl);
    this._wrap.appendChild(ghost);
    var h = Math.ceil(ghost.getBoundingClientRect().height);
    ghost.remove();
    this._estBarW = w;
    this._estBarH = Math.max(52, h + 4);
    this._wrap.style.setProperty('--mb-estbar-h', this._estBarH + 'px');
  },

  _fitStage: function () {
    if (!this._stageEl || !this._stageOuter) return;
    var avail = this._stageOuter.clientWidth || 660;
    /* ⭐⭐ THE CEILING IS A WIDTH, AND IT IS `.mb-stage-outer`'s max-width —
       NOT `--mb-maxscale`. The shipped build read a scale cap out of CSS
       tiers, but `avail` can never exceed the outer's max-width, so the base
       680px pinned every board to 680/660 = 1.03 no matter what the cap said.
       Both numbers had to be raised together and only the tiers did it.
       ⚠ AND NO TIER COULD EVER FIRE: every one was gated on `min-height:880px`
       while the production iframe measures 422px (repro-wodb-iframe-height).
       Even standalone, 1366x768 and 1600x900 — the two commonest classroom
       projectors — failed that gate. So the bench has never once drawn above
       its design size anywhere. Tiers are now keyed on WIDTH alone and set the
       outer's max-width directly; the scale simply follows from it. */
    var s = avail / 660;
    /* ⭐ A REAL VERTICAL TERM. The old routine fitted WIDTH ONLY, which is why
       the height-gated tier system existed as a proxy for it — and it meant a
       two-line German estimate prompt shrank the vertical budget with nothing
       to notice. This is not circular: none of the chrome measured by
       _chromeH depends on the stage's scale. */
    var budget = (window.innerHeight || 800) - this._overheadH() - 16;
    if (budget > 200) s = Math.min(s, budget / 430);
    if (!(s > 0.1)) s = 0.1;
    /* ⚠ IDEMPOTENCE IS LOAD-BEARING, not tidiness: this routine writes the
       stage's height, the ResizeObserver watching the wrap sees that write,
       and without this guard the two feed each other forever.
       ⚠⚠ BUT IT MUST BE KEYED ON THE ELEMENT TOO, NOT THE NUMBER ALONE.
       render() builds a BRAND NEW .mb-stage every time, and a second render at
       the same viewport (the entitlement fetch resolving, a tab change, a
       settings toggle) computes the same scale — so a value-only guard
       returned early and left the fresh element with NO transform at all. It
       measured 660px at every viewport from 320 to 2560 while `_scale` held
       the correct 0.43. The state was right and the render was wrong, which is
       exactly why the probe reads the RENDER. */
    if (this._fitEl === this._stageEl && this._scale && Math.abs(this._scale - s) < 0.0005) return;
    this._fitEl = this._stageEl;
    this._scale = s;
    this._stageEl.style.transform = 'scale(' + s + ')';
    /* transform doesn't shrink the LAYOUT box — collapse it with negative
       margins so flex centering can never overlap the chrome around it */
    var mv = -(430 * (1 - s)) / 2, mh = -(660 * (1 - s)) / 2;
    this._stageEl.style.margin = mv + 'px ' + mh + 'px';
    this._stageOuter.style.minHeight = (430 * s) + 'px';
    this._stageOuter.style.height = '';
    /* ⭐ PUBLISH THE SCALE so everything that must stay a constant DEVICE size
       can divide it back out. At the 320px floor s ~ 0.45, which rendered the
       12.5px hint at 5.7 device pixels and the vessel readings at 5.9 — text
       shipped as decoration. Sentences moved out of the stage entirely; what
       remains in here are short numerals and the hit boxes, which counter-scale
       cleanly with calc(<px> / var(--mb-s)). */
    if (this._wrap) this._wrap.style.setProperty('--mb-s', String(s));
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

  /* the guess range is per bench, because a stepper capped at 20 against a
     largest attainable answer of 8 is neither reachable nor usable */
  EST_RANGE: { length: 15, capacity: 12, weight: 18 },

  /* one place that decides WHAT is being asked about — so the estimate slot
     can be repainted on its own, without a render() that would destroy the
     apparatus the answer just came from */
  _buildEstimateChip: function () {
    if (this.bench !== 'length' && !this.premium) return this.api.el('span');
    if (this.bench === 'length') {
      var lo = this.LENGTH_OBJECTS[this.lenIdx];
      return this._estimateChip('estPromptLen',
        { unitP: this._unitName(this.unit, 2), noun: this._noun(lo.k) },
        { s: this._unitName(this.unit, 1), p: this._unitName(this.unit, 2) });
    }
    if (this.bench === 'capacity') {
      return this._estimateChip('estPromptCap',
        { unitP: this._cupName(2), noun: this._loc(this.strings[this.VESSELS[this.capTarget].nounKey]) },
        { s: this._cupName(1), p: this._cupName(2) });
    }
    var wk = this.WEIGHT_KEYS[this.wtIdx % this.WEIGHT_KEYS.length];
    return this._estimateChip('estPromptWt',
      { unitP: this._unitName('cube', 2), noun: this._noun(wk) },
      { s: this._unitName('cube', 1), p: this._unitName('cube', 2) });
  },

  _estimateChip: function (promptKey, promptArgs, unitPair) {
    var api = this.api, self = this;
    var box = api.el('div', 'mb-est');
    /* ⭐⭐ THE PREDICTION IS GATED ON THE QUESTION BEING OPEN — IN THE MODEL.
       Two failures, both READ OFF THE SHIPPED RENDERS: on the capacity bench
       the tall beaker stood full, the readout said "8 cups", and the bar was
       still asking "How many cups fit in the tall beaker?" with a live
       stepper; on the weight bench the pill said "The mouse weighs 3 cubes!"
       beside a bar asking how much the mouse weighs. The answer was on screen,
       next to the question. Cause: the chip only swapped to the comparison
       when `measured != null && est.pinned`, so an UNPINNED guess fell through
       to the prompt forever. CLAUDE.md already records this class against this
       tool ("guards the REVEAL correctly and leaves the PREDICTION live"); it
       was worse than recorded. Asking is now conditional on there being
       nothing revealed yet, whether or not anybody pinned anything. */
    if (this.measured != null) {
      box.className = 'mb-est compared';
      box.innerHTML = (this.est && this.est.pinned)
        ? '<span class="mb-est-spark">✦</span><span>' + this._esc(this.fmt('compareLine', { g: this.est.value, n: this.measured })) + '</span>'
        : '<span class="mb-est-spark">✦</span><span>' + this._esc(this.fmt('measuredOnly', { n: this.measured })) + '</span>';
      return box;
    }
    if (this.est && this.est.pinned) {
      /* ⚠ EDITABLE UNTIL MEASURED. The pinned note was `pointer-events:none`,
         so a child who fat-fingered the stepper to 20 was stuck with the typo
         for the whole measurement — and it was then juxtaposed against the
         real number as if they had meant it. Frozen only once an answer
         exists, because editing a guess AFTER seeing the answer is the one
         edit that destroys the routine. */
      var note = api.el('button', 'mb-est pinned');
      note.type = 'button';
      note.textContent = this.fmt('estNote', { n: this.est.value, unit: this.est.value === 1 ? unitPair.s : unitPair.p });
      note.setAttribute('aria-label', note.textContent + ' — ' + api.t('estPin'));
      note.addEventListener('click', function () { self.est.pinned = false; self.render(); });
      return note;
    }
    var prompt = api.el('span', 'mb-est-q');
    prompt.textContent = this.fmt(promptKey, promptArgs);
    var ctl = api.el('div', 'mb-est-ctl');
    var minus = api.el('button', 'mb-est-btn'); minus.type = 'button'; minus.textContent = '−';
    var val = api.el('span', 'mb-est-val');
    var plus = api.el('button', 'mb-est-btn'); plus.type = 'button'; plus.textContent = '+';
    var pin = api.el('button', 'mb-est-pin'); pin.type = 'button'; pin.textContent = api.t('estPin');
    var hi = this.EST_RANGE[this.bench] || 15;
    /* ⚠ seeded from the LAST MEASUREMENT on this bench, not from a constant 5.
       Starting every guess at 5 on every bench biases the whole routine toward
       one number and makes the guess log worthless as evidence of thinking.
       Carrying the previous result forward is also the cheapest benchmark
       there is — the first stirring of "about how many of those". */
    if (!this.est) {
      var seed = this._lastMeasured[this.bench];
      this.est = { value: Math.max(1, Math.min(hi, seed != null ? seed : Math.round(hi / 2))), pinned: false };
      this._estBy[this._estKey()] = this.est;
    }
    var paint = function () {
      val.textContent = self.est.value;
      minus.disabled = self.est.value <= 1;
      plus.disabled = self.est.value >= hi;
    };
    paint();
    var step = function (d) { self.est.value = Math.max(1, Math.min(hi, self.est.value + d)); paint(); };
    this._wireRepeat(minus, function () { step(-1); });
    this._wireRepeat(plus, function () { step(1); });
    pin.addEventListener('click', function () {
      self.est.pinned = true;
      self._sfxPin();
      self.render();
    });
    ctl.append(minus, val, plus, pin);
    box.append(prompt, ctl);
    return box;
  },

  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },

  /* what the current question is ABOUT — the identity a guess is filed under */
  _estKey: function () {
    if (this.bench === 'length') return 'length:' + this.LENGTH_OBJECTS[this.lenIdx].k + ':' + this.unit;
    if (this.bench === 'capacity') return 'capacity:' + this.capPair + ':' + this.capTarget;
    return 'weight:' + this.WEIGHT_KEYS[this.wtIdx % this.WEIGHT_KEYS.length];
  },

  /* hold-to-repeat: reaching 15 by fifteen separate taps is how a K child
     abandons the estimate. Steps by ONE throughout — stepping by 2 would
     destroy the unit-count meaning of the number. */
  _wireRepeat: function (btn, fn) {
    var t = null, iv = null;
    var stop = function () { clearTimeout(t); clearInterval(iv); t = iv = null; };
    btn.addEventListener('click', function () { fn(); });
    btn.addEventListener('pointerdown', function (e) {
      if (!e.isPrimary || (e.button !== 0 && e.pointerType === 'mouse')) return;
      stop();
      t = setTimeout(function () { iv = setInterval(fn, 110); }, 420);
    });
    ['pointerup', 'pointercancel', 'pointerleave', 'lostpointercapture'].forEach(function (ev) {
      btn.addEventListener(ev, stop);
    });
  },
  _afterMeasure: function (measured, bench, objKey) {
    this.measured = measured;
    this._measBy[this._estKey()] = measured;
    this._lastMeasured[bench] = measured;
    if (this.est && this.est.pinned) {
      /* ⚠ thinkLine was appended to EVERY comparison. Heard after every single
         measurement it stops being encouragement and starts reading as
         consolation — the exact valence the no-shame rule exists to avoid.
         Once per session, like every other warm line in this file. */
      var praise = '';
      if (!this.thinkSpoken) { this.thinkSpoken = true; praise = '. ' + this.api.t('thinkLine'); }
      this._speak(this.fmt('compareLine', { g: this.est.value, n: measured }) + praise);
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
    stage.dataset.locked = this.counted ? '1' : '0';
    /* ⭐ the contact shadow — the single largest "this is standing on
       something" signal, and it costs one element. Same law on every bench:
       longer the nearer the front of the slab. */
    stage.appendChild(this._castShadow(X0 + obj.w / 2, TRACK_Y, obj.w / 2));
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

    /* ⭐⭐ THE SUPPLY IS A REAL BUTTON, NOT A DRAG-ONLY DIV.
       It was a plain <div> wired with `pointerdown` only — no click, no key
       handler, no tabindex, no role — while `api.announce` reads the hint
       "drag units from the pile" to a screen-reader user on bench entry. The
       tool was instructing people to operate a control that is dead to them,
       on the ONE bench a free teacher sees. The weight bench's supply has been
       a real <button> with an aria-label all along, so this was not even
       internally consistent.
       Clicking or pressing Enter/Space lays one unit at the next lattice slot,
       which is also the discoverable path the drag never offered. */
    var supply = api.el('button', 'mb-supply');
    supply.type = 'button';
    supply.style.left = '14px'; supply.style.top = (TRACK_Y + 34) + 'px';
    for (var i = 0; i < 3; i++) {
      var chip = api.el('div', 'mb-unit supply');
      chip.innerHTML = this._unitSVG(this.unit);
      chip.style.left = (i * 12) + 'px'; chip.style.top = (i * -6) + 'px';
      supply.appendChild(chip);
    }
    supply.setAttribute('aria-label', this._unitName(this.unit, 2));
    supply.disabled = this.counted;
    stage.appendChild(supply);
    this._wireSupply(supply, stage);
    /* the click/keyboard path: lay ONE unit at the next lattice slot.
       ⚠ suppressed when a drag just ended, or a completed drop would also
       fire this and lay two. */
    supply.addEventListener('click', function () {
      if (self._justDragged) { self._justDragged = false; return; }
      if (self.counted) return;
      var u = self.UNITS[self.unit];
      self.placed.push(self._lenX0 + self.placed.length * u.w);
      self._hintDone.length = true;
      self._sfxSnap();
      self.render();
      var s2 = self._stageEl && self._stageEl.querySelector('.mb-supply');
      if (s2) s2.focus();
      self.api.announce(self.placed.length + ' ' + self._unitName(self.unit, self.placed.length));
    });

    /* ruler check strip (after counting, teacher setting) */
    if (this.counted && api.settings.rulerCheck) stage.appendChild(this._rulerStrip(X0, TRACK_Y + 26, obj.w));

  },

  /* repaint the two unscaled chrome slots without touching the stage — so a
     result can land without destroying the apparatus that produced it */
  _refreshSay: function () {
    if (!this._sayEl) return;
    var t = this._sayLine();
    this._sayEl.textContent = t || '';
    this._sayEl.classList.toggle('on', !!t);
    this._fitStage();
  },
  _refreshEstimate: function () {
    if (!this._estHost) return;
    var ek = this._estKey();
    this.est = this._estBy[ek] || null;
    this.measured = this._measBy[ek] != null ? this._measBy[ek] : null;
    this._estHost.innerHTML = '';
    this._estHost.appendChild(this._buildEstimateChip());
  },

  /* ⭐ THE RESULT SENTENCE IS DERIVED FROM STATE, ONCE, FOR ALL THREE BENCHES.
     It used to be built inline in _renderLength and _renderWeight and NOWHERE
     for capacity — so the capacity bench announced its result in speech only
     and showed nothing at all, on the one bench whose result is hardest to
     read off the apparatus. One function, one slot, three benches. */
  _sayLine: function () {
    if (this.bench === 'length') {
      if (!this.counted) return '';
      var obj = this.LENGTH_OBJECTS[this.lenIdx];
      var done = this._cap(this.fmt('lengthDone', {
        noun: this._noun(obj.k), n: this.placed.length,
        unitP: this._unitName(this.unit, this.placed.length)
      }));
      /* both counts, when the chain had to be closed and the number changed —
         the visible form of "a gappy chain and a tight chain are not the same
         measurement". Neither is called wrong; they are simply both shown. */
      if (this._laidCount != null && this._laidCount !== this.placed.length) {
        /* ⚠ a DIFFERENT joiner from the one inside the string. Joined with the
           same middot, the pair and the sentence became three
           typographically identical fragments — "First count: 12 · End to
           end: 10 · The key is 10 paperclips long!" — with no way to see
           where the comparison stopped and the result began. */
        return this.fmt('bothCountsLine', { n1: this._laidCount, n2: this.placed.length }) + ' — ' + done;
      }
      return done;
    }
    if (this.bench === 'capacity') {
      if (!this.premium) return '';
      var n = this.capDone[this.capTarget];
      if (n == null) return '';
      return this._cap(this.fmt('capacityDone', {
        noun: this._loc(this.strings[this.VESSELS[this.capTarget].nounKey]),
        n: n, unitP: this._cupName(n)
      }));
    }
    if (!this.premium || !this.settled) return '';
    var key = this.WEIGHT_KEYS[this.wtIdx % this.WEIGHT_KEYS.length];
    var w = this.WEIGHTS[key];
    return this._cap(this.fmt('weightDone', {
      noun: this._noun(key), n: w, unitP: this._unitName('cube', w)
    }));
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
      /* ⭐ Filled silhouette with one carved slot, contoured in wood-deep.
         The shipped clip was two CONCENTRIC strokes (2.4px and 2.0px) in
         #6E8FBF — the only cool blue in the file, so it read as a UI icon that
         had wandered onto the bench — and at the 320px floor those two lines
         land ~1.1px apart with a ~1.8px gap, which is a moiré generator when
         ten of them sit in a row. End radius 5, not 10, so two abutted clips
         meet over half their height and the chain reads AS a chain. */
      return '<svg class="mb-u" viewBox="0 0 45 20" width="' + (45 * s) + '" height="' + (20 * s) + '" aria-hidden="true">' +
        '<path class="u-face" fill-rule="evenodd" d="M5.9 1.2 H39.1 A4.7 4.7 0 0 1 43.8 5.9 V14.1 A4.7 4.7 0 0 1 39.1 18.8 H5.9 A4.7 4.7 0 0 1 1.2 14.1 V5.9 A4.7 4.7 0 0 1 5.9 1.2 Z M9.4 6.1 H35.6 A3.9 3.9 0 0 1 35.6 13.9 H13.2"/>' +
        '<path class="u-lite" d="M4.4 6.0 A3.4 3.4 0 0 1 7.8 3.4 H30.6"/></svg>';
    }
    /* ⭐⭐ THE CUBE MUST FILL ITS PITCH. The shipped art spanned x=4..26 inside
       a 30-wide cell — 22px of drawing in a 30px lattice step — so a chain the
       tool had just scooched to MATHEMATICAL PERFECTION still drew an 8px gap
       between every pair. On a bench whose entire lesson is "no gaps, no
       overlaps", the art contradicted the answer, and no gate could see it:
       evalChain was measuring positions, which were right.
       Flat-ortho now, matching the clip (the old isometric was a second
       projection in the same chain), with the right cheek doing the work of
       the seam so an abutted row reads as cubes without a notch. */
    return '<svg class="mb-u" viewBox="0 0 30 26" width="' + (30 * s) + '" height="' + (26 * s) + '" aria-hidden="true">' +
      '<path class="u-lite-f" d="M2.4 2.2 H27.6 A1.6 1.6 0 0 1 29.2 3.8 V8.6 H0.8 V3.8 A1.6 1.6 0 0 1 2.4 2.2 Z"/>' +
      '<path class="u-face" d="M0.8 8.6 H24.4 V22.2 A1.6 1.6 0 0 1 22.8 23.8 H2.4 A1.6 1.6 0 0 1 0.8 22.2 Z"/>' +
      '<path class="u-side" d="M24.4 8.6 H29.2 V22.2 A1.6 1.6 0 0 1 27.6 23.8 H24.4 Z"/>' +
      '<path class="u-line" d="M0.8 8.6 H29.2 M24.4 8.6 V23.6"/>' +
      '<rect class="u-line" x="0.8" y="2.2" width="28.4" height="21.6" rx="1.9"/></svg>';
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
      /* the house guard (sorting-hoops.js:877) — without it a right-press or a
         stylus barrel button starts a drag, the context menu eats the
         pointerup, and the ghost is stranded on the stage forever */
      if (!e.isPrimary || self.counted || (e.button !== 0 && e.pointerType === 'mouse')) return;
      e.preventDefault();
      try { supply.setPointerCapture(e.pointerId); } catch (_) {}
      self._dragging = true;
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
      var teardown = function () {
        supply.removeEventListener('pointermove', onMove);
        supply.removeEventListener('pointerup', onUp);
        supply.removeEventListener('pointercancel', onCancel);
        supply.removeEventListener('lostpointercapture', onCancel);
        fly.remove();
        self._dragging = false;
      };
      var onUp = function (ev) { teardown(); self._justDragged = true; self._dropUnit(self._pt(ev), stage); };
      /* ⚠ CANCEL MUST NOT DROP. `pointercancel` was bound to the same handler
         as `pointerup`, so a palm rejection on a whiteboard — or the browser
         taking the pointer away — LAID A PAPERCLIP the child never released.
         Cancel now discards the drag and changes nothing. */
      var onCancel = function () { teardown(); if (self._renderQueued) { self._renderQueued = false; self.render(); } };
      supply.addEventListener('pointermove', onMove);
      supply.addEventListener('pointerup', onUp);
      supply.addEventListener('pointercancel', onCancel);
      supply.addEventListener('lostpointercapture', onCancel);
    });
  },
  _wireLaidUnit: function (el, stage) {
    var self = this;
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', function (e) {
      if (!e.isPrimary || self.counted || (e.button !== 0 && e.pointerType === 'mouse')) return;
      e.preventDefault();
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
      var idx = Number(el.dataset.idx);
      var home = { left: el.style.left, top: el.style.top };
      var moved = false;
      self._dragging = true;
      var onMove = function (ev) {
        moved = true;
        var p = self._pt(ev);
        el.style.left = (p.x - self.UNITS[self.unit].w / 2) + 'px';
        el.style.top = (p.y - self.UNITS[self.unit].h / 2) + 'px';
      };
      var teardown = function () {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onCancel);
        el.removeEventListener('lostpointercapture', onCancel);
        self._dragging = false;
      };
      var onUp = function (ev) {
        teardown();
        if (!moved) return;
        var p = self._pt(ev);
        self.placed.splice(idx, 1);
        self._dropUnit(p, stage);
      };
      /* ⚠ a cancelled drag puts the unit BACK. Here the old code was worse
         than on the supply: `pointercancel` reached the same handler, which
         had already spliced the unit out of `placed`, so the model and the
         view diverged on a gesture the child never completed. */
      var onCancel = function () {
        teardown();
        el.style.left = home.left; el.style.top = home.top;
        if (self._renderQueued) { self._renderQueued = false; self.render(); }
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onCancel);
      el.addEventListener('lostpointercapture', onCancel);
    });
  },
  _dropUnit: function (p, stage) {
    var u = this.UNITS[this.unit];
    var obj = this.LENGTH_OBJECTS[this.lenIdx];
    /* ⚠ THE SUPPLY PILE SAT INSIDE THE DROP BAND. The band is +/-70 of the
       track at y=268, i.e. 198..338, and the pile lives at TRACK_Y+62 = 330 —
       so dropping a unit back onto the pile LAID it instead, clamped to the
       far left of the track. The pile is now an explicit return zone. */
    var overPile = p.x < 130 && p.y > this._lenTrackY + 30;
    var nearTrack = !overPile && Math.abs(p.y - this._lenTrackY) < 70;
    if (nearTrack) {
      /* snap to the sub-unit lattice CELL (gaps/overlaps stay reachable) */
      var x = Math.round((p.x - u.w / 2 - this._lenX0) / this.LATTICE) * this.LATTICE + this._lenX0;
      x = Math.max(this._lenX0 - u.w, Math.min(this._lenX0 + obj.w + u.w, x));
      this.placed.push(x);
      this._hintDone.length = true;
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
    var laidCount = sorted.length;

    /* the count-up: one number word per unit, staggered.
       ⚠ the stagger was a flat 180ms and the total wait `n*180+400`, i.e. 3.1
       SECONDS for a 15-cube chain, with the pitch climbing to 1.22kHz by the
       end — shrill and long enough to be dead air. Budgeted now, and the pitch
       repeats over one octave instead of climbing forever. */
    var countUp = function (done) {
      var els = self._unitEls;
      var stag = els.length ? Math.min(110, 1400 / els.length) : 0;
      els.forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('counted');
          self._note(392 * Math.pow(2, (i % 8) / 12), 0, 0.05, 0.06);
        }, i * stag);
      });
      setTimeout(done, els.length * stag + 260);
    };

    var finish = function () {
      var need = obj.w / u.w;
      /* ⚠ overhang units are RETURNED, not deleted. `closed.slice(0, need)`
         silently dropped the child's extra units with no animation and no
         sound — and units standing past the end of the object are the endpoint
         idea seen from the other side, so they are worth showing. */
      var extra = Math.max(0, closed.length - need);
      self.placed = closed.slice(0, need);
      self.counted = true;
      self.render();
      if (extra) self._returnExtras(extra);
      countUp(function () {
        var n = self.placed.length;
        self._speak(self._cap(self.fmt('lengthDone', { noun: self._noun(obj.k), n: n, unitP: self._unitName(self.unit, n) })));
        self._afterMeasure(n, 'length', obj.k);
        self.render();
      });
    };

    var need0 = obj.w / u.w;
    /* ⚠ an UNDER-COVERED chain is never scooched. The shipped code still
       re-laid a perfectly-spaced-but-too-short chain for no reason, moving the
       child's units to answer a question they had not finished asking. */
    if (closed.length < need0) {
      if (!defect) { this._speakCover(obj); return; }
      this._slide(closed, function () { self.placed = closed; self.render(); self._speakCover(obj); });
      return;
    }

    if (!defect) { finish(); return; }

    /* ⭐⭐ COUNT, SCOOCH, COUNT.
       The shipped order scooched FIRST and counted the closed chain, so the
       child never saw the thing the bench exists to show: that a gappy chain
       and a tight chain give DIFFERENT NUMBERS for the same object. The
       correction was performed on their behalf, silently, before the question
       was ever asked. Counting as-laid first turns the scooch from a cover-up
       into the demonstration — and it costs nothing against the no-shame rule,
       because both numbers are simply stated, neither is called wrong, and a
       tremor is still tidied up rather than scored. */
    this.placed = sorted;
    this.counted = true;
    this.render();
    countUp(function () {
      self._sfxScooch();
      self._speakDefect(ev, obj);
      self._laidCount = laidCount;
      self._slide(closed, function () {
        self.counted = false;
        finish();
      });
    });
  },

  /* slide the laid units to `to`, then continue */
  _slide: function (to, then) {
    var els = this._unitEls || [];
    var reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) {}
    els.forEach(function (el, i) {
      if (!reduce) el.style.transition = 'left .28s cubic-bezier(.34,1.2,.64,1)';
      el.style.left = to[i] + 'px';
    });
    setTimeout(then, reduce ? 0 : 420);
  },

  /* extras slide visibly back to the pile instead of vanishing */
  _returnExtras: function (n) {
    var self = this;
    for (var i = 0; i < n; i++) {
      (function (i) {
        var ghost = self.api.el('div', 'mb-unit fly');
        ghost.innerHTML = self._unitSVG(self.unit);
        ghost.style.left = (self._lenX0 + (self.placed.length + i) * self.UNITS[self.unit].w) + 'px';
        ghost.style.top = (self._lenTrackY - self.UNITS[self.unit].h + 14) + 'px';
        ghost.style.transition = 'left .34s var(--lcs-ease), top .34s var(--lcs-ease), opacity .34s linear';
        self._stageEl.appendChild(ghost);
        setTimeout(function () {
          ghost.style.left = '18px';
          ghost.style.top = (self._lenTrackY + 62) + 'px';
          ghost.style.opacity = '0';
        }, 20 + i * 70);
        setTimeout(function () { ghost.remove(); }, 460 + i * 70);
      })(i);
    }
    this._sfxBloop();
  },

  /* ⚠ NOT throttled. "Part of it isn't covered yet" is a description of the
     state right now, not a correction of a choice — every other throttled line
     in this file is a correction. Throttled, the second press of Count on a
     short chain produced total silence, which is the canonical "is it broken?"
     moment. */
  _speakCover: function (obj) {
    this._speak(this.fmt('notCovered', { noun: this._noun(obj.k) }));
  },

  /* ⚠ the throttle is PER DEFECT KIND. One `scoochSpoken` boolean covered
     gaps, overlaps and a misaligned start alike, so whichever a child met
     first silenced the other two for the session — and the endpoint line, the
     misconception 1.MD.A.2 actually names, was never authored at all. */
  _speakDefect: function (ev, obj) {
    var kind = ev.status === 'misaligned-start' ? 'start' : (ev.status === 'overlap' ? 'overlap' : 'gap');
    if (this._defectSpoken[kind]) return;
    this._defectSpoken[kind] = true;
    if (kind === 'start') this._speak(this.fmt('startLine', { noun: this._noun(obj.k) }));
    else this._speak(this.fmt('scoochLine', { unitP: this._unitName(this.unit, 2) }));
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
      /* class, not a font-size attribute: a CSS font-size beats the attribute,
         which is how the counter-scale reaches SVG numerals at all */
      if (major && px > 0.1) s += '<text class="mb-ruler-num" x="' + px + '" y="22" text-anchor="middle" font-weight="700" fill="#5A5348">' + Math.round(px / per) + '</text>';
    }
    s += '</svg><span class="mb-ruler-read">' + this.formatLength(w) + '</span>';
    strip.innerHTML = s;
    return strip;
  },

  /* ======================= CAPACITY bench ========================== */

  _renderCapacity: function (stage) {
    var self = this;
    stage.innerHTML = '';
    ['jug', 'tall', 'wide'].forEach(function (vk) { stage.appendChild(self._vesselEl(vk)); });
    /* the falling water spans the gap BETWEEN vessels, so it cannot live
       inside either of them */
    var stream = this.api.el('div', 'mb-streamlayer');
    stage.appendChild(stream);
    this._streamEl = stream;
    this._paintCapacity();
  },
  /* ONE viewing height for the whole instrument: every horizontal ellipse on
     this bench uses ry = rx * 0.115. The shipped build drew a fixed ry=3
     meniscus in every vessel, so a 150-wide jug and a 50-wide flask had the
     same surface perspective — physically incoherent, and it is why nothing
     read as a container. */
  _ry: function (rx) { return +(rx * 0.115).toFixed(2); },

  /* ONE formula for every object that stands on the bench, so the three
     benches agree about where the light is. Never `filter: drop-shadow` —
     that is an offscreen pass per element, and the length bench can have
     fifteen of them on screen at once. */
  _castShadow: function (cx, baseY, halfW) {
    var ry = 4 + (baseY - 237) * 0.036;
    var el = this.api.el('div', 'mb-cast-el');
    el.style.left = (cx - halfW * 1.06) + 'px';
    el.style.top = (baseY - ry * 0.45) + 'px';
    el.style.width = (halfW * 2.12) + 'px';
    el.style.height = (ry * 2) + 'px';
    return el;
  },

  _vesselEl: function (vk) {
    var api = this.api;
    var v = this.VESSELS[vk];
    var box = api.el('div', 'mb-vessel' + (vk !== 'jug' && this.capTarget === vk ? ' target' : ''));
    box.dataset.vessel = vk;
    box.style.left = v.x + 'px';
    box.style.top = (this.CAP_BASE_Y - v.h) + 'px';
    box.style.width = v.w + 'px';
    /* ⚠ the caption stack is anchored to the BASE LINE, not to the bottom of
       the box. Anchoring to the box bottom put the label a fixed 24px up from
       a box whose height varies with the vessel, so on the short vessels it
       printed over the glass — and the vessels now vary a lot, because the
       pairs deliberately contrast a tall narrow one with a wide short one. */
    box.style.height = (v.h + 92) + 'px';

    var W = v.w, H = v.h, CX = W / 2, RX = W / 2 - 4, RY = this._ry(RX);
    /* ⚠ the viewBox is widened LEFT for the numeral gutter and RIGHT for the
       spout. The shipped jug drew its spout at x = w-3 with a control point at
       w+11 inside width="w" — so it was CLIPPED OFF and the jug had no visible
       spout at all, which is the one mark that says "this pours, from here". */
    var GUT = 30, EXT = (vk === 'jug') ? 26 : 6;
    var vbW = GUT + W + EXT, vbH = H + 34;

    /* ⭐ THE GLASS IS ITS OWN ELEMENT. Rotating `.mb-vessel` tipped the label
       and the live reading with it; only `.mb-vbody` tilts now. */
    var s = '<div class="mb-vbody"><svg class="mb-vsvg" viewBox="' + (-GUT) + ' -14 ' + vbW + ' ' + vbH + '" width="' + vbW + '" height="' + vbH + '">' +
      '<defs><clipPath id="mbv' + vk + '"><rect x="3" y="3" width="' + (W - 6) + '" height="' + H + '" rx="7"/></clipPath></defs>' +
      '<ellipse class="mb-cast" cx="' + CX + '" cy="' + (H + 7) + '" rx="' + (RX + 6) + '" ry="' + this._ry(RX + 6) + '"/>' +
      /* the liquid rides its own group so it can be counter-rotated and stay LEVEL while the glass tips */
      '<g clip-path="url(#mbv' + vk + ')"><g class="mb-liq-g">' +
      '<rect class="mb-liquid" x="3" y="' + (H + 3) + '" width="' + (W - 6) + '" height="' + H + '"/>' +
      '<ellipse class="mb-surf" cx="' + CX + '" cy="' + (H + 3) + '" rx="' + RX + '" ry="' + RY + '"/>' +
      '<path class="mb-mensc" d="M' + (CX - RX) + ' ' + (H + 3) + ' Q ' + CX + ' ' + (H + 3 - RY * 1.7) + ' ' + (CX + RX) + ' ' + (H + 3) + '"/>' +
      '</g></g>' +
      '<ellipse class="mb-vbase" cx="' + CX + '" cy="' + (H + 1) + '" rx="' + RX + '" ry="' + RY + '"/>' +
      '<rect class="mb-vwall" x="3" y="3" width="' + (W - 6) + '" height="' + H + '" rx="7"/>' +
      '<rect class="mb-vthick" x="5.6" y="5.6" width="' + (W - 11.2) + '" height="' + (H - 5) + '" rx="5"/>' +
      '<ellipse class="mb-vrim" cx="' + CX + '" cy="3" rx="' + RX + '" ry="' + RY + '"/>' +
      '<path class="mb-vrim-f" d="M' + (CX - RX) + ' 3 Q ' + CX + ' ' + (3 + RY * 2) + ' ' + (CX + RX) + ' 3"/>' +
      '<rect class="mb-vshine" x="9" y="' + (3 + RY + 6) + '" width="' + Math.min(7, W / 8) + '" height="' + Math.max(10, H - RY - 24) + '" rx="3.5"/>';
    /* the lip. BOTH sides exist — a beaker pouring LEFT needs a lip on the
       left or the tilt has no explanation — and each is revealed only while
       pouring that way. */
    s += '<path class="mb-lip lip-r" d="M' + (W - 4) + ' 16 q16 5 12 21"/>';
    s += '<path class="mb-lip lip-l" d="M4 16 q-16 5 -12 21"/>';
    if (vk === 'jug') s += '<path class="mb-vhandle" d="M4 46 q-20 6 -20 32 q0 24 20 28"/>';

    if (vk !== 'jug') {
      var showNums = api.settings.capScale !== 'none';
      for (var c = 1; c <= v.cap; c++) {
        var y = 3 + H - c * (H / v.cap);
        s += '<path class="mb-grad" d="M-5 ' + y + ' H10"/>';
        /* ⚠ NUMERALS LIVE IN THE GUTTER, OUTSIDE THE GLASS. Inside they sat
           teal-on-water at 2.6:1 — a contrast failure — and they printed the
           answer on the wall, which is precisely what this tool's own cited
           ancestor pour-measure-core.js locks out. Off by default now: the
           number comes from counting the tally, i.e. from measuring. */
        if (showNums && (api.settings.capScale === 'ml' ? c % 2 === 0 : true)) {
          s += '<text class="mb-grad-num" x="-9" y="' + (y + 3.6) + '" text-anchor="end">' +
            (api.settings.capScale === 'ml' ? c * this.ML_PER_CUP : c) + '</text>';
        }
      }
    }
    s += '</svg></div>';
    s += '<span class="mb-vlabel" style="top:' + (H + 26) + 'px">' + this._loc(this.strings[v.nounKey]) + '</span>';
    s += '<span class="mb-vread" style="top:' + (H + 46) + 'px"></span>';
    s += '<span class="mb-tally" style="top:' + (H + 66) + 'px"></span>';
    box.innerHTML = s;
    this._wireVessel(box, vk);
    return box;
  },
  /* ⭐⭐ 280ms, AND THE WAIT IS VISIBLE.
     The shipped threshold was 160ms. Median tap for a 5-7 year old runs
     150-250ms, and a whiteboard stylus longer still because the pen has to
     seat — so a teacher's FIRST tap on a beaker poured instead of selecting,
     and then (defect 2) tipped away from the target. Those two compounded
     into the whole first impression of the capacity bench.
     Raising the number alone would only trade one silent guess for another,
     so the wait now ARMS VISIBLY: a ring closes over the threshold. Lift
     before it closes and it was a tap; let it close and the pour begins. The
     gesture teaches itself the first time anybody presses anything. */
  HOLD_MS: 280,

  _wireVessel: function (box, vk) {
    var self = this;
    box.style.touchAction = 'none';
    box.addEventListener('pointerdown', function (e) {
      /* the house guard (sorting-hoops.js:877). Without it a right-press or a
         stylus barrel button opened the context menu, which swallowed the
         pointerup — leaving the pour rAF running until the jug was empty. */
      if (!e.isPrimary || (e.button !== 0 && e.pointerType === 'mouse')) return;
      e.preventDefault();
      try { box.setPointerCapture(e.pointerId); } catch (_) {}
      var poured = false;
      box.classList.add('arming');
      var holdTimer = setTimeout(function () {
        poured = true;
        box.classList.remove('arming');
        self._startPour(vk === 'jug' ? 'jug' : vk, vk === 'jug' ? self.capTarget : 'jug', box);
      }, self.HOLD_MS);
      var done = function () {
        box.removeEventListener('pointerup', done);
        box.removeEventListener('pointercancel', done);
        box.removeEventListener('lostpointercapture', done);
        box.classList.remove('arming');
        clearTimeout(holdTimer);
        self._stopPour();
        if (!poured && vk !== 'jug') self._setTarget(vk);
      };
      box.addEventListener('pointerup', done);
      box.addEventListener('pointercancel', done);
      /* a render() mid-press (the entitlement fetch, the brim timer) destroys
         this element and the capture with it; without this the press never
         ends and the arming timer fires on a detached node */
      box.addEventListener('lostpointercapture', done);
    });
  },

  _setTarget: function (vk) {
    if (this.capTarget === vk) return;
    this.capTarget = vk;
    this.measured = this.capDone[vk] != null ? this.capDone[vk] : null;
    this.render();
  },
  /* ⭐⭐ THE TILT DIRECTION IS DERIVED FROM GEOMETRY, NEVER FROM A NAME.
     The shipped rule was a single `.mb-vessel.pouring{transform:rotate(-7deg)}`
     on the SOURCE. In CSS (y-down) negative is COUNTER-clockwise, and the jug
     sits left of both targets — so it lifted its spout and tipped AWAY from
     whatever it was pouring into. The same rule was reused for the reverse
     pour (beaker -> jug, leftward), where negative is right, so one of the two
     directions was correct only by accident.
     Comparing the two vessels' CENTRES means it stays correct if anyone
     reorders the table, adds a vessel, or changes the layout — which this
     rebuild does, since x is now computed per pair.
     7deg was also too shallow to read across a room; 16 is a pour, not a
     topple. And the pivot is the BASE CORNER on the target's side, not the
     box centre, because that is where a real jug turns. */
  _pourGeom: function (from, to) {
    var S = this.VESSELS[from], T = this.VESSELS[to];
    var sgn = (T.x + T.w / 2) > (S.x + S.w / 2) ? 1 : -1;
    return { sgn: sgn, deg: sgn * 16 };
  },

  _startPour: function (from, to, box) {
    var self = this;
    if (from === to || this.levels[from] <= 0.01) return;
    this._hintDone.capacity = true;
    this._pour = { from: from, to: to, last: performance.now(), lastWhole: Math.floor(this.levels[to]) };
    var g = this._pourGeom(from, to);
    var S = this.VESSELS[from];
    var body = box.querySelector('.mb-vbody');
    if (body) {
      body.style.transformOrigin = (g.sgn > 0 ? (S.w - 8) : 8) + 'px ' + (S.h + 3) + 'px';
      body.style.setProperty('--mb-tilt', g.deg + 'deg');
    }
    box.classList.add('pouring');
    box.dataset.pourDir = g.sgn > 0 ? 'r' : 'l';
    var tgt = this._wrap.querySelector('.mb-vessel[data-vessel="' + to + '"]');
    if (tgt) tgt.classList.add('receiving');
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
      self._paintStream();
      if (self.levels[p.to] >= cap - 0.001) {
        /* full to the brim: auto-stop (conservation preserved, no penalty).
           _stopPour does the quantising, the announce and the cleanup — this
           branch only clamps and hands over, so the brim path and the
           finger-lifted path can never drift apart. */
        self.levels[p.from] -= (cap - self.levels[p.to]);
        self.levels[p.to] = cap;
        self._sfxBloop();
        self._stopPour();
        return;
      }
      if (self.levels[p.from] <= 0.001) { self.levels[p.from] = 0; self._stopPour(); return; }
      self._raf = requestAnimationFrame(step);
    };
    this._raf = requestAnimationFrame(step);
  },

  /* everything that happens once the water has stopped moving */
  _afterPour: function (to) {
    var self = this;
    if (to === 'jug') { this.render(); return; }
    var v = this.VESSELS[to];
    var full = this.levels[to] >= v.cap - 1e-6;
    if (full) {
      var vEl = this._wrap.querySelector('.mb-vessel[data-vessel="' + to + '"]');
      if (vEl) { vEl.classList.add('brimful'); setTimeout(function () { vEl.classList.remove('brimful'); }, 900); }
      if (!this.fullSpoken) { this.fullSpoken = true; this._speak(this.api.t('fullLine')); }
      if (this.capDone[to] == null) {
        this.capDone[to] = v.cap;
        var line = this._cap(this.fmt('capacityDone', {
          noun: this._loc(this.strings[v.nounKey]), n: v.cap, unitP: this._cupName(v.cap)
        }));
        setTimeout(function () {
          self._speak(line);
          self._afterMeasure(v.cap, 'capacity', to);
          self._sayPair();
          self.render();
        }, 650);
        return;
      }
    }
    this.render();
  },

  /* ⭐ THE CONSERVATION MOMENT — the reason the pairs are authored.
     Fires once, only when BOTH vessels on the bench have been filled, and it
     only ever DESCRIBES the two containers. Never "you were tricked", never a
     comparative aimed at what the child believed. */
  _sayPair: function () {
    if (this.pairSpoken) return;
    if (this.capDone.tall == null || this.capDone.wide == null) return;
    this.pairSpoken = true;
    var a = this.capDone.tall, b = this.capDone.wide;
    var nA = this._loc(this.strings.vesselTall), nB = this._loc(this.strings.vesselWide);
    var line = a === b
      ? this.fmt('capSameLine', { a: nA, b: nB, n: a, unitP: this._cupName(a) })
      /* ⚠ the plural is chosen from {na}, the number the unit is ATTACHED to —
         not from max(a,b). Three panels caught this independently: taking the
         larger would print "1 tazas" / "1 kupillista" the day a one-cup vessel
         is authored, and the whole point of the pair table is that new pairs
         get added. */
      : this.fmt('capDiffLine', { a: nA, na: a, b: nB, nb: b, unitP: this._cupName(a) });
    var self = this;
    setTimeout(function () { self._speak(self._cap(line)); }, 900);
  },

  /* ⭐ THE STREAM IS WHAT MAKES THE DIRECTION UNAMBIGUOUS.
     A tilt alone reads as "something moved"; a falling ribbon between two
     named vessels reads as "this one is filling that one", from the back of
     the room, at any scale. It lives in STAGE coordinates, not inside either
     vessel, so it can span the gap at all. */
  _paintStream: function () {
    var p = this._pour;
    var host = this._streamEl;
    if (!host) return;
    if (!p) { host.innerHTML = ''; return; }
    var S = this.VESSELS[p.from], T = this.VESSELS[p.to];
    var g = this._pourGeom(p.from, p.to);
    var baseY = this.CAP_BASE_Y;
    /* the pivot, in stage coordinates */
    var px = S.x + (g.sgn > 0 ? S.w - 8 : 8), py = baseY + 3;
    /* the lip, untilted, then carried round the pivot by the tilt */
    var lx0 = S.x + (g.sgn > 0 ? S.w + 8 : -8), ly0 = (baseY - S.h) + 18;
    var a = g.deg * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
    var vx = lx0 - px, vy = ly0 - py;
    var lx = px + vx * c - vy * sn, ly = py + vx * sn + vy * c;
    var tx = T.x + T.w / 2;
    var ty = (baseY - T.h) + 3 + T.h * (1 - this.levels[p.to] / T.cap);
    var d = 'M' + lx.toFixed(1) + ' ' + ly.toFixed(1) +
      ' C ' + (lx + g.sgn * 26).toFixed(1) + ' ' + (ly + 34).toFixed(1) + ', ' +
      (tx - g.sgn * 8).toFixed(1) + ' ' + (ty - 90).toFixed(1) + ', ' + tx.toFixed(1) + ' ' + ty.toFixed(1);
    host.innerHTML =
      '<svg viewBox="0 0 660 430" width="660" height="430">' +
      '<path class="mb-stream-b" d="' + d + '"/><path class="mb-stream" d="' + d + '"/>' +
      '<g class="mb-splash" transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ')">' +
      '<ellipse class="mb-ripple" rx="6" ry="0.7"/>' +
      '<circle class="mb-drop d1" cx="-9" cy="-3" r="2.4"/>' +
      '<circle class="mb-drop d2" cx="7" cy="-5" r="2"/>' +
      '</g></svg>';
  },

  _stopPour: function () {
    var p = this._pour;
    this._pour = null;
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    /* ⭐ A CUP ONLY EVER LANDS WHOLE. The shipped readout printed
       `Math.round(lv*2)/2`, i.e. "3.5 cups" — half a unit, shown to a
       five-year-old, on the bench that exists to teach that a unit is one
       fixed amount. On release the cup in flight finishes if the source can
       cover it and rolls back if it cannot; either way the total is exactly
       preserved, so conservation survives the quantisation. */
    if (p) {
      var to = p.to, from = p.from;
      var cur = this.levels[to];
      var up = Math.ceil(cur - 1e-9);
      var need = up - cur;
      if (need > 1e-9 && this.levels[from] >= need - 1e-9 && up <= this.VESSELS[to].cap + 1e-9) {
        this.levels[to] = up; this.levels[from] -= need;
      } else {
        var dn = Math.floor(cur + 1e-9);
        this.levels[from] += (cur - dn); this.levels[to] = dn;
      }
      this.levels[from] = Math.max(0, +this.levels[from].toFixed(6));
      this.levels[to] = Math.max(0, +this.levels[to].toFixed(6));
      this._paintCapacity();
      this._afterPour(to);
    }
    this._paintStream();
    if (this._pourBox) { this._pourBox.classList.remove('pouring'); this._pourBox = null; }
    if (this._wrap) {
      var r = this._wrap.querySelectorAll('.mb-vessel.receiving');
      for (var i = 0; i < r.length; i++) r[i].classList.remove('receiving');
    }
  },
  /* ⭐ THE TALLY IS WHERE THE NUMBER COMES FROM.
     A cup glyph per whole cup, painted FROM `levels` rather than accumulated —
     so pouring back removes them one at a time, and that reversibility is the
     whole conservation lesson: the same water came back. It is also why the
     graduation numerals can default off: the child counts units they have
     handled instead of reading an answer printed on the glass. */
  _tallySVG: function (n, cap) {
    if (!n) return '';
    var per = 12, s = '<svg viewBox="0 0 ' + (cap * per + 4) + ' 18" width="' + (cap * per + 4) + '" height="18" aria-hidden="true">';
    for (var i = 0; i < n; i++) {
      var x = 2 + i * per;
      s += '<path class="mb-tallycup" d="M' + x + ' 3 H' + (x + 9) + ' L' + (x + 7.6) + ' 14 H' + (x + 1.4) + ' Z"/>';
    }
    return s + '</svg>';
  },

  _paintCapacity: function () {
    var self = this;
    var boxes = this._wrap ? this._wrap.querySelectorAll('.mb-vessel') : [];
    Array.prototype.forEach.call(boxes, function (box) {
      var vk = box.dataset.vessel;
      var v = self.VESSELS[vk];
      if (!v) return;
      var lvl = self.levels[vk];
      var frac = lvl / v.cap;
      var fy = 3 + v.h * (1 - frac);
      var liq = box.querySelector('.mb-liquid');
      var surf = box.querySelector('.mb-surf');
      var men = box.querySelector('.mb-mensc');
      var RX = v.w / 2 - 4, CX = v.w / 2, RY = self._ry(RX);
      if (liq) { liq.setAttribute('y', fy); liq.setAttribute('height', v.h * frac + 3); }
      if (surf) { surf.setAttribute('cy', fy); }
      if (men) men.setAttribute('d', 'M' + (CX - RX) + ' ' + fy + ' Q ' + CX + ' ' + (fy - RY * 1.7) + ' ' + (CX + RX) + ' ' + fy);
      /* ⚠ WATER DOES NOT TILT WITH ITS GLASS. The shipped build had the liquid
         inside the rotated box, so it stayed rigidly glued to the tipping
         vessel — the one thing that instantly reads as fake. Counter-rotating
         the liquid group about the surface keeps it level. */
      var lg = box.querySelector('.mb-liq-g');
      /* ⚠ an EMPTY vessel must be empty. At level 0 the liquid rect still had
         3px of height and the surface ellipse still drew its full-width arc at
         the base, so a vessel holding nothing showed a blue puddle — and the
         capacity bench spends most of its time with one vessel empty. */
      if (lg) lg.style.display = lvl > 1e-6 ? '' : 'none';
      if (lg) {
        var tilt = box.classList.contains('pouring')
          ? parseFloat((box.querySelector('.mb-vbody') || { style: { getPropertyValue: function () { return '0'; } } }).style.getPropertyValue('--mb-tilt')) || 0
          : 0;
        lg.setAttribute('transform', tilt ? 'rotate(' + (-tilt) + ' ' + CX + ' ' + fy + ')' : '');
      }
      var read = box.querySelector('.mb-vread');
      if (read) {
        var whole = Math.round(lvl);
        read.textContent = vk === 'jug' ? ''
          : (self.api.settings.capScale === 'ml' ? (whole * self.ML_PER_CUP + ' ml')
            : (whole + ' ' + self._cupName(whole === 1 ? 1 : 2)));
      }
      var tal = box.querySelector('.mb-tally');
      if (tal) tal.innerHTML = vk === 'jug' ? '' : self._tallySVG(Math.round(lvl), v.cap);
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
  /* alpha-trims of the weight illustrations (the length-bench lesson
     applied here too: seat the DEPICTED object, never the image box —
     book/shoe/watermelon carry up to 23% transparent padding below the
     art). Gate re-measures with sharp; drift fails the build. */
  WTRIMS: {
    mouse: { x: 23, y: 78, w: 969, h: 890, iw: 1024, ih: 1024 },
    strawberry: { x: 134, y: 29, w: 739, h: 976, iw: 1024, ih: 1024 },
    hamster: { x: 26, y: 23, w: 977, h: 990, iw: 1024, ih: 1024 },
    apple: { x: 125, y: 24, w: 759, h: 982, iw: 1024, ih: 1024 },
    ball: { x: 26, y: 24, w: 963, h: 987, iw: 1024, ih: 1024 },
    duck: { x: 116, y: 19, w: 782, h: 989, iw: 1024, ih: 1024 },
    book: { x: 19, y: 273, w: 978, h: 517, iw: 1024, ih: 1024 },
    shoe: { x: 27, y: 274, w: 970, h: 550, iw: 1024, ih: 1024 },
    owl: { x: 53, y: 34, w: 899, h: 966, iw: 1024, ih: 1024 },
    rabbit: { x: 97, y: 18, w: 823, h: 993, iw: 1024, ih: 1024 },
    cat: { x: 93, y: 26, w: 828, h: 998, iw: 1024, ih: 1024 },
    penguin: { x: 176, y: 22, w: 647, h: 992, iw: 1024, ih: 1024 },
    pumpkin: { x: 40, y: 31, w: 946, h: 980, iw: 1024, ih: 1024 },
    fox: { x: 151, y: 33, w: 739, h: 972, iw: 1024, ih: 1024 },
    dog: { x: 109, y: 26, w: 804, h: 984, iw: 1024, ih: 1024 },
    koala: { x: 60, y: 20, w: 896, h: 986, iw: 1024, ih: 1024 },
    watermelon: { x: 43, y: 148, w: 935, h: 739, iw: 1024, ih: 1024 },
    sheep: { x: 29, y: 26, w: 972, h: 976, iw: 1024, ih: 1024 },
    pig: { x: 52, y: 27, w: 922, h: 975, iw: 1024, ih: 1024 },
    deer: { x: 130, y: 25, w: 746, h: 987, iw: 1024, ih: 1024 },
    lion: { x: 75, y: 26, w: 877, h: 986, iw: 1024, ih: 1024 },
    panda: { x: 57, y: 25, w: 890, h: 982, iw: 1024, ih: 1024 },
    bear: { x: 205, y: 21, w: 598, h: 993, iw: 1024, ih: 1024 },
    cow: { x: 24, y: 94, w: 976, h: 865, iw: 1024, ih: 1024 },
    horse: { x: 61, y: 16, w: 902, h: 999, iw: 1024, ih: 1024 }
  },
  /* PURE placement: maps the trimmed art bottom-center onto (0, SEAT_Y)
     inside the pan group, capped to fit the dish — gate-proven. */
  _wtPlacement: function (key) {
    var t = this.WTRIMS[key];
    var k = Math.min(74 / t.h, 84 / t.w);
    return {
      width: t.iw * k, height: t.ih * k,
      x: -(t.x + t.w / 2) * k,
      y: this.PAN.SEAT_Y - (t.y + t.h) * k
    };
  },
  _cubeShape: function (x, y) {
    /* the same cube the length bench lays, so the unit is ONE object across
       the whole instrument (see _unitSVG for why the isometric one went) */
    return '<g transform="translate(' + x + ' ' + y + ')" class="mb-cube-g mb-u" data-cube="1">' +
      '<path class="u-lite-f" d="M2.4 2.2 H27.6 A1.6 1.6 0 0 1 29.2 3.8 V8.6 H0.8 V3.8 A1.6 1.6 0 0 1 2.4 2.2 Z"/>' +
      '<path class="u-face" d="M0.8 8.6 H24.4 V22.2 A1.6 1.6 0 0 1 22.8 23.8 H2.4 A1.6 1.6 0 0 1 0.8 22.2 Z"/>' +
      '<path class="u-side" d="M24.4 8.6 H29.2 V22.2 A1.6 1.6 0 0 1 27.6 23.8 H24.4 Z"/>' +
      '<path class="u-line" d="M0.8 8.6 H29.2 M24.4 8.6 V23.6"/>' +
      '<rect class="u-line" x="0.8" y="2.2" width="28.4" height="21.6" rx="1.9"/></g>';
  },
  _panGroup: function (cls) {
    var P = this.PAN;
    var back = 'M' + (-P.RIM_HALF) + ' ' + P.RIM_Y + ' q ' + P.RIM_HALF + ' ' + (P.DEPTH * 2) + ' ' + (P.RIM_HALF * 2) + ' 0 Z';
    var front = 'M' + (-P.RIM_HALF) + ' ' + P.RIM_Y + ' q ' + P.RIM_HALF + ' ' + (P.DEPTH * 2) + ' ' + (P.RIM_HALF * 2) + ' 0 ' +
      'l -6 9 q -' + (P.RIM_HALF - 8) + ' ' + (P.DEPTH * 1.7) + ' -' + (P.RIM_HALF * 2 - 16) + ' 0 Z';
    /* ⭐ THE YOKE IS REAL NOW. `BAL_ROPE_HALF: 20` was declared once and used
       NOWHERE in the tool — a constant documenting a two-point suspension that
       was never drawn, while both cords ran from a single point at (0,0). The
       gate meanwhile built two assertions ON that constant and a third
       enforcing the single-point version, so it was validating geometry that
       did not exist and pinning in place the geometry that did.
       Both cord tops are repositioned every frame by _paintBalance so they
       stay ON the sloping beam; a fixed local offset would visibly detach. */
    return '<g class="mb-pan ' + cls + '">' +
      '<line class="pan-str a" x1="' + (-this.BAL_ROPE_HALF) + '" y1="0" x2="' + (-P.RIM_HALF + 6) + '" y2="' + (P.RIM_Y - 2) + '"/>' +
      '<line class="pan-str b" x1="' + this.BAL_ROPE_HALF + '" y1="0" x2="' + (P.RIM_HALF - 6) + '" y2="' + (P.RIM_Y - 2) + '"/>' +
      '<path class="pan-back" d="' + back + '"/>' +
      '<g class="mb-pan-load"></g>' +
      '<path class="pan-front" d="' + front + '"/>' +
      '<path class="pan-shine" d="M' + (-P.RIM_HALF + 14) + ' ' + (P.RIM_Y + 1.6) + ' Q 0 ' + (P.RIM_Y + 13) + ' ' + (P.RIM_HALF - 14) + ' ' + (P.RIM_Y + 1.6) + '"/>' +
      '</g>';
  },

  _renderWeight: function (stage) {
    var api = this.api, self = this;
    stage.innerHTML = '';
    var key = this.WEIGHT_KEYS[this.wtIdx % this.WEIGHT_KEYS.length];
    this._wtKey = key;

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
      /* it stands on the bench like everything else */
      '<ellipse class="mb-cast" cx="' + cx + '" cy="' + (cy + 210) + '" rx="76" ry="7.5"/>' +
      /* plinth, then a TAPERED post — a straight 14px bar reads as a pipe */
      '<rect class="bal-wood-d" x="' + (cx - 68) + '" y="' + (cy + 190) + '" width="136" height="20" rx="10"/>' +
      '<rect class="bal-wood" x="' + (cx - 64) + '" y="' + (cy + 190) + '" width="128" height="7" rx="3.5"/>' +
      '<path class="bal-wood" d="M' + (cx - 8) + ' ' + (cy + 8) + ' H' + (cx + 8) + ' L' + (cx + 13) + ' ' + (cy + 192) + ' H' + (cx - 13) + ' Z"/>' +
      /* the knife edge: the fulcrum points UP at the pivot, which is what a
         balance actually turns on */
      '<path class="bal-wood-d" d="M' + cx + ' ' + (cy - 13) + ' L' + (cx + 12.5) + ' ' + (cy + 10) + ' H' + (cx - 12.5) + ' Z"/>' +
      /* ⭐ THE INDEX PLATE + NEEDLE. This is the biggest single win on the
         bench: it gives "level" a mechanical, wordless signal, which is
         exactly what the no-shame rule wants and what a number or a colour
         could never be. Five paths. */
      /* sized so the needle's SWEEP is the thing you see: at maxAngle 14 a
         64-long needle travels 64·sin14 = 15.5px, which needs a plate about
         34 half-wide to read as "off centre" versus "dead centre" from the
         back of a room. Smaller than this and it is a sticker, not a gauge. */
      '<rect class="bal-plate" x="' + (cx - 34) + '" y="' + (cy + 34) + '" width="68" height="34" rx="11"/>' +
      '<path class="bal-tick-s" d="M' + (cx - 20) + ' ' + (cy + 42) + ' v18 M' + (cx + 20) + ' ' + (cy + 42) + ' v18"/>' +
      '<path class="bal-tick" d="M' + cx + ' ' + (cy + 38) + ' v26"/>' +
      '<g class="mb-beam-g">' +
      '<path class="bal-beam" d="M' + (cx - arm) + ' ' + (cy - 6) + ' Q ' + cx + ' ' + (cy - 12) + ' ' + (cx + arm) + ' ' + (cy - 6) +
        ' L' + (cx + arm) + ' ' + (cy + 6) + ' Q ' + cx + ' ' + (cy + 12) + ' ' + (cx - arm) + ' ' + (cy + 6) + ' Z"/>' +
      '<path class="bal-beam-hi" d="M' + (cx - arm + 18) + ' ' + (cy - 6.6) + ' Q ' + cx + ' ' + (cy - 12.4) + ' ' + (cx + arm - 18) + ' ' + (cy - 6.6) + '"/>' +
      /* the stirrups make BAL_ROPE_HALF real — see the note on _panGroup */
      '<path class="bal-stir" d="M' + (cx - arm + 10) + ' ' + (cy + 7) + ' H' + (cx - arm + 50) +
        ' M' + (cx + arm - 50) + ' ' + (cy + 7) + ' H' + (cx + arm - 10) + '"/>' +
      '<path class="bal-needle" d="M' + cx + ' ' + (cy + 6) + ' L' + (cx - 5.4) + ' ' + (cy + 56) + ' L' + cx + ' ' + (cy + 64) + ' L' + (cx + 5.4) + ' ' + (cy + 56) + ' Z"/>' +
      '</g>' +
      '<circle class="bal-boss" cx="' + cx + '" cy="' + cy + '" r="8.5"/>' +
      '<circle class="bal-boss-hi" cx="' + (cx - 2.8) + '" cy="' + (cy - 2.8) + '" r="2.7"/>' +
      this._panGroup('mb-pan-l') + this._panGroup('mb-pan-r') +
      '</svg>';
    stage.appendChild(bal);
    this._balEl = bal;

    /* THE LOADS LIVE INSIDE THE PAN GROUPS (z-ordered under the front
       rim; they ride the pan transform — nothing to align, ever) */
    var loadL = bal.querySelector('.mb-pan-l .mb-pan-load');
    var wp = this._wtPlacement(key);
    loadL.innerHTML = '<image href="' + this._imgUrl(key) + '" x="' + wp.x + '" y="' + wp.y +
      '" width="' + wp.width + '" height="' + wp.height + '"/>';
    this._paintCubes();

    /* cube supply */
    var supply = api.el('button', 'mb-cubesupply');
    supply.type = 'button';
    supply.setAttribute('aria-label', this._unitName('cube', 2));
    supply.innerHTML = this._unitSVG('cube') + this._unitSVG('cube') + this._unitSVG('cube');
    supply.addEventListener('click', function () {
      if (self.settled) return;
      if (self.cubes >= 18) return;
      self.cubes++;
      self._hintDone.weight = true;
      self._sfxCube();
      self._paintCubes();
      self._checkOver();
    });
    supply.style.left = '520px'; supply.style.top = '318px';
    stage.appendChild(supply);

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
          /* ⚠ THE SETTLE MOMENT USED TO CALL render(), which does
             stage.innerHTML = '' — so it destroyed the SVG on the exact frame
             it was meant to celebrate on, and any animation attached there was
             wiped in the same tick. Mark the element instead; the say-line
             below is unscaled chrome and repaints on its own. */
          self._balEl.classList.add('settled');
          self._speak(self._cap(self.fmt('weightDone', { noun: self._noun(key), n: n, unitP: self._unitName('cube', n) })));
          self._afterMeasure(n, 'weight', key);
          self._refreshSay();
          self._refreshEstimate();
          return;
        }
      } else lastLevelAt = null;
      /* the beam has arrived and nothing is moving — stop the rAF instead of
         spinning it forever at zero velocity */
      if (self.settled) return;
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
    /* the two cord tops sit ±BAL_ROPE_HALF ALONG THE BEAM, so they must be
       rotated by the beam angle — a fixed horizontal offset would lift off the
       beam the moment it tilts. The pan itself stays plumb (a pan on flexible
       cord hangs vertically whatever the beam does), which is why only the
       cord tops move and not the group's rotation. */
    var r = this.balAngle * Math.PI / 180, H = this.BAL_ROPE_HALF;
    var dx = (H * Math.cos(r)).toFixed(2), dy = (H * Math.sin(r)).toFixed(2);
    var self = this;
    ['l', 'r'].forEach(function (side) {
      var g = self._balEl.querySelector('.mb-pan-' + side);
      if (!g) return;
      var a = g.querySelector('.pan-str.a'), b = g.querySelector('.pan-str.b');
      if (a) { a.setAttribute('x1', -dx); a.setAttribute('y1', -dy); }
      if (b) { b.setAttribute('x1', dx); b.setAttribute('y1', dy); }
    });
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
          self.unit = uk; self.placed = []; self.counted = false; self._laidCount = null;
          self._measBy[self._estKey()] = null;
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
        self.placed = []; self.counted = false; self._laidCount = null;
        self.render();
      });
      row.appendChild(another);
    }
    /* ⭐⭐ THE CONTROL THE CAPACITY BENCH NEVER HAD.
       _dock built `anotherObj` for length and for weight and NOTHING for
       capacity — so once a beaker was filled the bench was over. It was worse
       than a missing chip: the answer was the vessel's declared cap, so only
       two measurements existed in the whole bench, and jug 10 could not even
       fill 8+6=14, leaving press-and-hold silently refusing at an empty jug
       with no sound and no message. Six authored pairs now, and this chip. */
    if (this.bench === 'capacity' && this.premium) {
      var pairBtn = api.el('button', 'mb-chip');
      pairBtn.type = 'button';
      pairBtn.textContent = api.t('anotherPair');
      pairBtn.addEventListener('click', function () { self._nextPair(); });
      row.appendChild(pairBtn);
    }
    if (this.bench === 'weight' && this.premium) {
      var anotherW = api.el('button', 'mb-chip');
      anotherW.type = 'button';
      anotherW.textContent = api.t('anotherObj');
      anotherW.addEventListener('click', function () {
        self.wtIdx = (self.wtIdx + 7) % self.WEIGHT_KEYS.length;   /* coprime hop = varied order */
        self.cubes = 0; self.balAngle = 0; self.balVel = 0;
        self.settled = false; self.overSpoken = false;
        self.render();
      });
      row.appendChild(anotherW);
    }

    /* ⭐ THIS CHIP CLEARS THE CURRENT BENCH, NOT ALL THREE.
       The shell header already carries a reset control that calls tool.reset()
       (lcs-shell.js:565), so the tool was shipping TWO identical global
       resets — and the widest chip in the dock threw away the length chain and
       the weight pans when all a teacher wanted was to empty the beakers.
       Header = the whole tool; this = this bench. Zero new strings. */
    var again = api.el('button', 'mb-chip');
    again.type = 'button';
    again.textContent = api.t('startAgain');
    again.addEventListener('click', function () { self._resetBench(self.bench); });
    row.appendChild(again);

    if (this.premium) {
      var pr = api.el('button', 'mb-chip');
      pr.type = 'button';
      pr.textContent = api.t('printSheet');
      pr.addEventListener('click', function () {
        self._ensureSheet();
        setTimeout(function () { try { window.print(); } catch (_) {} }, 60);
      });
      row.appendChild(pr);
    }

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

  /* ⭐ THE SHEET IS ABSENT UNLESS ENTITLED — not merely behind the chip.
     Gating only the button leaves Ctrl+P, which no chip guards, handing a free
     visitor the paid pages; that exact defect has shipped twice in this
     programme. Built on demand and rebuilt whenever the tier or the bench
     changes, so the probe cannot measure an empty container either. */
  _ensureSheet: function () {
    if (!this._wrap) return;
    var host = this._wrap.parentNode || this._wrap;
    var old = host.querySelector ? host.querySelector('.mb-sheet') : null;
    if (old) old.remove();
    document.body.classList.toggle('mb-paid', !!this.premium);
    if (!this.premium) return;

    var api = this.api;
    var sheet = api.el('div', 'mb-sheet');
    var esc = this._esc.bind(this);
    var cupP = this._cupName(2), clipP = this._unitName('clip', 2), cubeP = this._unitName('cube', 2);

    /* PAGE 1 — the record of the routine: guess, then measure, on real
       objects in the room. The columns ARE the routine; no words needed. */
    var p1 = api.el('div', 'mb-page');
    var rows = '';
    for (var i = 0; i < 8; i++) rows += '<div class="mb-pr"><div class="mb-pc wide"></div><div class="mb-pc"></div><div class="mb-pc"></div></div>';
    p1.innerHTML = '<h2 class="mb-phead">' + esc(api.t('title')) + '</h2>' +
      '<div class="mb-prow">' +
      '<div class="mb-pr mb-phr"><div class="mb-pc wide">' + esc(api.t('anotherObj')) + '</div>' +
      '<div class="mb-pc">' + esc(api.t('estPin')) + '</div><div class="mb-pc">' + esc(api.t('countBtn')) + '</div></div>' +
      rows + '</div>';

    /* PAGE 2 — units to cut out and lay along a real object, at a real size,
       plus the capacity and weight columns. Squares, because a printed
       paperclip is a picture of a unit and a cut square IS one. */
    var p2 = api.el('div', 'mb-page');
    var strip = '';
    for (i = 0; i < 20; i++) strip += '<div class="mb-pu"></div>';
    var rows2 = '';
    for (i = 0; i < 6; i++) rows2 += '<div class="mb-pr"><div class="mb-pc wide"></div><div class="mb-pc"></div><div class="mb-pc"></div></div>';
    p2.innerHTML = '<h2 class="mb-phead">' + esc(api.t('tabLength')) + ' · ' + esc(api.t('tabCapacity')) + ' · ' + esc(api.t('tabWeight')) + '</h2>' +
      '<div class="mb-pstrip">' + strip + '</div>' +
      '<div class="mb-prow">' +
      '<div class="mb-pr mb-phr"><div class="mb-pc wide">' + esc(api.t('anotherObj')) + '</div>' +
      '<div class="mb-pc">' + esc(clipP) + ' / ' + esc(cubeP) + '</div>' +
      '<div class="mb-pc">' + esc(cupP) + '</div></div>' + rows2 + '</div>';

    sheet.append(p1, p2);
    host.appendChild(sheet);
    this._sheetEl = sheet;
  },

  /* clear ONE bench, keeping the object/pair it is on */
  _resetBench: function (b) {
    var k;
    if (b === 'length') {
      this.placed = []; this.counted = false; this._laidCount = null;
      k = this._estKey(); delete this._estBy[k]; delete this._measBy[k];
    } else if (b === 'capacity') {
      this._resetCapacity();
      for (k in this._estBy) if (k.indexOf('capacity:') === 0) delete this._estBy[k];
      for (k in this._measBy) if (k.indexOf('capacity:') === 0) delete this._measBy[k];
    } else {
      this.cubes = 0; this.balAngle = 0; this.balVel = 0;
      this.settled = false; this.overSpoken = false;
      k = this._estKey(); delete this._estBy[k]; delete this._measBy[k];
    }
    this.est = null; this.measured = null;
    this.render();
  },

  /* the shell header's reset — the whole tool */
  reset: function () {
    this.placed = []; this.counted = false; this._laidCount = null; this.est = null; this.measured = null;
    this._estBy = {}; this._measBy = {}; this._lastMeasured = {};
    this.capPair = 0;
    this._resetCapacity();
    this.cubes = 0; this.balAngle = 0; this.balVel = 0; this.settled = false; this.overSpoken = false;
    this.render();
  },
  paint: function () {}
};

/* per-tool styling: STAGE ONLY + the sanctioned body class */
(function injectCSS() {
  var css = ''
  /* ====== THE WHOLE INSTRUMENT, TWELVE VALUES ==========================
     Cream and ink come from the shell. White is a MATERIAL, only ever
     rgba(255,255,255,a) for glass and rim light. Darker variants are DERIVED
     (base + N% --mb-shade), never new tokens.
     ⚠ Contrast is why the contours exist: --mb-brass is 2.09:1 on cream, so
     the unit is legible from the back of a room ONLY because every one of them
     is contoured in --mb-wood-deep (5.84:1). The contour is structural, not
     decorative. The old art had none, and amber-on-cream at 13px on a
     projector is invisible. */
  + 'body.mb-wide{'
  +   '--mb-paper:#FDF6E8;--mb-line:#E7DCC8;'
  +   '--mb-teal:#146B5E;--mb-teal-soft:#4E9184;'
  +   '--mb-coral:#F2784B;--mb-coral-ink:#B8431F;'
  +   '--mb-wood:#B98A55;--mb-wood-deep:#7A5A34;'
  +   '--mb-brass:#E2A03F;--mb-brass-lite:#F4CE8C;'
  +   '--mb-water:#6FAED0;--mb-shade:#3A2C1C;'
  + '}'
  /* the unit — one brass object, two silhouettes. The clip and the cube are
     the same KIND of thing (an arbitrary unit); giving them different hues
     told a child they were different categories. */
  + '.mb-u{overflow:visible;}'
  + '.mb-u .u-face{fill:var(--mb-brass);stroke:var(--mb-wood-deep);stroke-width:1.5;stroke-linejoin:round;}'
  + '.mb-u .u-lite-f{fill:var(--mb-brass-lite);stroke:none;}'
  + '.mb-u .u-side{fill:#B68236;stroke:none;}'
  + '.mb-u .u-line{fill:none;stroke:var(--mb-wood-deep);stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;}'
  + '.mb-u .u-lite{fill:none;stroke:var(--mb-brass-lite);stroke-width:1.2;stroke-linecap:round;opacity:.9;}'
  + 'body.mb-wide .lcs-app{max-width:min(1060px,96vw);}'
  + 'body.mb-wide .lcs-title{word-break:keep-all;overflow-wrap:normal;}'
  + '@media (max-width:400px){body.mb-wide .lcs-title{font-size:21px;}}'
  /* ⚠ THE SHELL'S INSTRUCTION LINE IS HIDDEN IN EVERY EMBED ANYWAY
     (lcs-shell.css:261), which is where teaching actually happens — so a tool
     that leans on it is unguided exactly where it matters. This one now
     carries its own per-bench nudge on the stage. Hiding the shell's copy here
     stops it being said twice on the standalone page, and at 320px it was
     wrapping into a five-line ragged column beside the control buttons and
     spending ~90px of the height the instrument needs. Tool-scoped; the shell
     is untouched. */
  + 'body.mb-wide .lcs-instruction{display:none;}'
  /* ⭐⭐ NO ROOT HEIGHT BINDING. The shipped `body.mb-wide #lcs-root{height:100%}`
     made `.lcs-app{height:100%}` (lcs-shell.css:70) resolve against the IFRAME
     viewport, which lcs-shell.js then reported back to the parent, which had
     set it from ActivityIframe's INITIAL_HEIGHT=420 — a fixed point, MEASURED
     at 422px on production at both 1440 and 2560 (repro-wodb-iframe-height.js
     names this tool). Phones escaped via the 560px counter-rule, which is why
     it survived: it bit only at projector widths, and every QA render of this
     tool was taken against the .html directly. Content height now drives the
     iframe, so both are deleted.
     ⚠ AND THE SHELL'S OWN `html,body{height:100%;overflow:hidden}` MUST BE
     RELEASED WITH IT, or freeing the stage simply clips the dock off the
     bottom of the standalone page. Tool-scoped on a root class; the shell is
     untouched. */
  + 'html.mb-html,html.mb-html body.mb-wide{height:auto;min-height:100%;overflow-y:auto;}'
  + 'html.mb-html body.mb-wide{overflow-x:hidden;}'
  + '.mb-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.2vmin,12px);width:100%;--mb-s:1;}'

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
  /* ⭐ THIS max-width IS THE TRUE SCALE GOVERNOR. _fitStage computes
     avail/660, and `avail` is this box — so the shipped base of 680px pinned
     every board to 1.03x regardless of what --mb-maxscale claimed. The tiers
     below raise it, and nothing else caps the scale. */
  + '.mb-stage-outer{position:relative;width:100%;max-width:680px;display:flex;justify-content:center;align-items:center;overflow:visible;}'
  /* ⭐ THE BENCH IS A PLACE, NOT A GRADIENT.
     The shipped stage was one two-stop linear-gradient whose seam sat at
     y=236 while NOTHING stood on it — the length track is at 268, the vessel
     bases at 350, the balance foot at 368 — so the painted horizon was
     decorative and unrelated to where anything rested. That is exactly why
     three unrelated instruments read as diagrams floating on paper.
     Four things fix it and none of them costs a DOM node: a lit wall above a
     shaded seam, a slab with grain running along it, a front lip so the bench
     has thickness and you are standing AT it, and (in the SVG) a contact
     shadow under everything that stands. */
  + '.mb-stage{position:relative;width:660px;height:430px;transform-origin:center center;flex:0 0 auto;'
  +   'border:2px solid #D9C9A8;border-radius:22px;overflow:hidden;'
  +   'background:linear-gradient(180deg,#FBF3E4 0px,#F7EFDF 140px,#EFE6D3 232px,'
  +     'rgba(58,44,28,.17) 233px,rgba(58,44,28,.17) 236px,'
  +     '#DCC29F 237px,#D5B58F 330px,#CFAB80 430px);}'
  /* grain runs ALONG the bench, because planks do */
  + '.mb-stage::before{content:"";position:absolute;left:0;right:0;top:237px;bottom:0;pointer-events:none;'
  +   'background:repeating-linear-gradient(180deg,rgba(122,90,52,.05) 0 1px,transparent 1px 9px),'
  +     'repeating-linear-gradient(180deg,transparent 0 48px,rgba(122,90,52,.11) 48px 50px);}'
  /* the front lip: the slab has thickness */
  + '.mb-stage::after{content:"";position:absolute;left:0;right:0;bottom:0;height:15px;pointer-events:none;'
  +   'background:linear-gradient(180deg,#BE8F5B 0,#AC8150 100%);border-top:2px solid #7A5A34;}'

  /* gate */
  + '.mb-gatepanel{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;}'
  + '.mb-gatecard{display:flex;flex-direction:column;align-items:center;gap:10px;max-width:460px;text-align:center;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:18px;padding:22px 26px;'
  +   'box-shadow:0 6px 18px rgba(20,30,28,.08);}'
  + '.mb-gatecard p{font-family:var(--lcs-font-body);font-size:14.5px;color:var(--lcs-ink);margin:0;}'
  + '.mb-gatecard a{font-family:var(--lcs-font-display);font-weight:800;color:#C9502A;text-decoration:underline;font-size:15.5px;}'

  /* estimate bar (UNSCALED chrome above the stage) */
  /* ⭐ A FIXED HEIGHT, RESERVED FOR THE TALLEST STATE IN THIS LOCALE.
     The bar has four states of different heights (a wrapped two-line prompt +
     stepper, the stepper alone, the pinned note, the comparison) and it was
     `min-height:50px`, so the stage JUMPED vertically at the exact instant the
     child pinned the guess — and everyone pins first, because it is the
     topmost control. It jumped again on resolve and again on every tab
     change. The height is measured at mount rather than tabulated per
     language, because the prompt is ~2x longer in some locales than others. */
  + '.mb-estbar{width:100%;max-width:680px;height:var(--mb-estbar-h,58px);'
  +   'display:flex;justify-content:center;align-items:center;}'
  + '.mb-est{display:flex;align-items:center;justify-content:center;gap:6px 10px;flex-wrap:wrap;max-width:100%;}'
  + '.mb-est-ctl{display:inline-flex;align-items:center;gap:8px;flex-wrap:nowrap;white-space:nowrap;max-width:100%;}'
  /* ⚠ at 320 the stepper plus a long pin label overruns the card — measured at
     2px in German ("Meine Schätzung merken"), and the h-overflow check could
     not see it because the tool's own `overflow-x:hidden` suppresses
     scrollWidth. The pin wraps to two lines rather than pushing the row wide;
     the row itself never scrolls, because a control a child cannot see is the
     same as one that is not there. */
  + '@media (max-width:420px){'
  +   '.mb-est-ctl{gap:6px;}'
  +   '.mb-est-pin{white-space:normal;line-height:1.1;max-width:42vw;padding:6px 10px;}'
  + '}'
  + '.mb-est-q{font-family:var(--lcs-font-display);font-weight:700;font-size:14.5px;color:var(--lcs-ink);}'
  + '.mb-est-btn{width:44px;height:44px;border-radius:50%;border:1.5px solid var(--lcs-line);background:var(--lcs-surface);'
  +   'font-size:20px;font-weight:800;color:var(--lcs-structure);cursor:pointer;}'
  + '.mb-est-val{min-width:30px;text-align:center;font-family:var(--lcs-font-display);font-weight:800;font-size:20px;color:var(--lcs-structure);}'
  + '.mb-est-pin{min-height:44px;padding:8px 14px;border-radius:var(--lcs-radius-pill);border:1.5px solid #F2C879;'
  +   'background:#FDF0DC;font-family:var(--lcs-font-display);font-weight:700;font-size:13.5px;color:#8A6320;cursor:pointer;}'
  + '.mb-est.compared{pointer-events:none;}'
  + '.mb-est.pinned,.mb-est.compared{font-family:var(--lcs-font-display);font-weight:700;}'
  /* the pinned note is a BUTTON now — tapping it reopens the stepper, until an
     answer exists. It keeps the paper-note look; only the deadness goes. */
  + '.mb-est.pinned{background:#FDF0DC;border:1.5px dashed #F2C879;border-radius:12px;padding:8px 14px;'
  +   'font-size:13.5px;color:var(--mb-wood-deep);transform:rotate(-1.2deg);cursor:pointer;min-height:44px;}'
  + '.mb-est.compared{background:#FDF0DC;border:1.5px solid #F2C879;border-radius:12px;padding:9px 14px;'
  +   'font-size:14px;color:#5A4630;display:inline-flex;gap:7px;}'
  + '.mb-est-spark{color:#E8A53A;font-size:16px;}'

  /* length bench */
  + '.mb-lenobj{position:absolute;pointer-events:none;user-select:none;-webkit-user-drag:none;}'
  + '.mb-cast-el{position:absolute;border-radius:50%;background:var(--mb-shade);opacity:.13;'
  +   'pointer-events:none;filter:blur(1.5px);}'
  + '.mb-track{position:absolute;height:2.5px;background:var(--mb-teal-soft);opacity:.55;border-radius:2px;}'
  + '.mb-track::before,.mb-track::after{content:"";position:absolute;top:-6px;width:2.5px;height:14px;'
  +   'background:var(--mb-teal-soft);border-radius:2px;}'
  + '.mb-track::before{left:0;}.mb-track::after{right:0;}'
  + '.mb-unit{position:absolute;touch-action:none;}'
  /* ⭐ THE HIT BOX IS SIZED IN DEVICE PIXELS, THE DRAWING IS NOT.
     A clip draws 45x20 stage units; at the 320px floor (s ~ 0.45) that is
     20x9 DEVICE pixels — less than a third of the 34px canvas floor, and a
     target no six-year-old can hit. The pseudo-element grows the grabbable
     area to 34 device px without touching the art, so the chain still reads
     as paperclips laid edge to edge. */
  + '.mb-unit::after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);'
  +   'width:max(100%,calc(34px / var(--mb-s)));height:max(100%,calc(34px / var(--mb-s)));}'
  + '.mb-unit.laid{cursor:grab;}'
  + '.mb-unit.laid:active{cursor:grabbing;}'
  + '.mb-supply:active{cursor:grabbing;}'
  /* the cursor must not promise a grab the handlers refuse after counting */
  + '.mb-stage[data-locked="1"] .mb-unit.laid,.mb-stage[data-locked="1"] .mb-supply{cursor:default;}'
  + '.mb-stage[data-locked="1"] .mb-supply{opacity:.45;}'
  + '.mb-unit.laid.counted{background:radial-gradient(circle, rgba(242,200,121,.6), transparent 72%);border-radius:50%;}'
  + '.mb-unit.laid.counted svg{filter:drop-shadow(0 0 10px rgba(232,165,58,.95));}'
  + '.mb-unit.fly{pointer-events:none;z-index:60;filter:drop-shadow(0 8px 12px rgba(20,30,28,.25));}'
  /* ⭐ THE TWO SUPPLIES ARE A CONSTANT DEVICE SIZE.
     Both live inside the scaled stage, so at the 320px floor (s ~ 0.43) the
     length pile measured 41x24 and the cube tray 43x19 REAL pixels — under
     half the 44px floor, on the only two controls that put a unit on the
     bench. It went unseen because the tap-target gate excluded a class the
     tool never emits (`mb-cube`) and because the pile was a <div>, which
     `querySelectorAll('button, a')` cannot match. Both are buttons now, the
     gate sees them, and the floor is divided back out of the scale. */
  + '.mb-supply{position:absolute;width:96px;height:56px;cursor:grab;touch-action:none;'
  +   'background:none;border:0;padding:0;'
  +   'min-width:calc(48px / var(--mb-s));min-height:calc(48px / var(--mb-s));}'
  + '.mb-supply .mb-unit{pointer-events:none;position:absolute;}'
  + '.mb-minichip{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:6px 12px;'
  +   'border-radius:var(--lcs-radius-pill);border:1.5px solid var(--lcs-line);background:var(--lcs-surface);'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:13px;color:var(--lcs-structure);cursor:pointer;}'
  + '.mb-minichip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  /* ⚠ recolour BY CLASS. The shipped rule was `svg [stroke="#6E8FBF"]`, an
     attribute-value match on a literal hex — it breaks silently the instant
     anyone touches the palette, which is exactly what this pass does. */
  + '.mb-minichip.active .mb-u .u-face{fill:var(--mb-brass-lite);stroke:#FDF6E8;}'
  + '.mb-minichip.active .mb-u .u-line{stroke:#FDF6E8;}'
  + '.mb-minichip.active .mb-u .u-lite-f{fill:#FDF6E8;}'
  + '.mb-minichip.active .mb-u .u-side{fill:var(--mb-brass);}'
  + '.mb-ruler{position:absolute;animation:mbSlideIn .35s var(--lcs-ease);}'
  + '.mb-ruler-read{position:absolute;left:100%;top:2px;margin-left:10px;font-family:var(--lcs-font-display);'
  +   'font-weight:800;font-size:calc(14px / var(--mb-s));color:#146B5E;white-space:nowrap;}'
  + '@keyframes mbSlideIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}'
  /* ⭐ THE READ-ALOUD SENTENCE AND THE HINT LIVE OUT HERE, UNSCALED.
     Both used to sit inside the transform. At the 320px floor s ~ 0.45, so the
     hint rendered at 5.7 device pixels and the result pill at 7 — and the pill
     answered a long German sentence with `text-overflow:ellipsis`, i.e. it
     truncated the one string the teacher is meant to read out. No counter-scale
     fixes that: a legible 45-character sentence simply does not fit inside a
     297px-wide stage. Out here they wrap, in all eleven languages. */
  + '.mb-say{min-height:0;width:100%;max-width:680px;display:flex;justify-content:center;}'
  + '.mb-say.on{margin-top:2px;background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:18px;padding:8px 18px;font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(14px,1.6vmin,17px);line-height:1.2;color:#146B5E;text-align:center;'
  +   'width:auto;max-width:min(92%,680px);animation:mbSlideIn .3s var(--lcs-ease);}'
  + '.mb-hint{margin:0;max-width:min(92%,620px);text-align:center;display:none;'
  +   'font-family:var(--lcs-font-body);font-size:clamp(12.5px,1.35vmin,15px);line-height:1.25;'
  +   'color:var(--lcs-ink-soft);}'
  + '.mb-hint.on{display:block;}'

  /* ⭐ COUNTER-SCALE WHAT MUST STAY A CONSTANT DEVICE SIZE. `--mb-s` is
     published by _fitStage. Only short numerals and labels remain inside the
     stage — sentences moved out above — so dividing the scale back out is
     exact and costs no wrapping. */
  + '.mb-ruler-num{font-size:calc(10.5px / var(--mb-s));}'
  + '.mb-grad-num{font-size:calc(10px / var(--mb-s));}'

  /* capacity */
  + '.mb-vessel{position:absolute;cursor:pointer;touch-action:none;}'
  + '.mb-vessel .mb-vlabel{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:calc(12.5px / var(--mb-s));color:var(--lcs-ink-soft);}'
  + '.mb-vessel .mb-vread{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;'
  +   'font-family:var(--lcs-font-display);font-weight:800;font-size:calc(13px / var(--mb-s));color:var(--mb-teal);}'
  + '.mb-vessel .mb-tally{position:absolute;left:50%;transform:translateX(-50%);'
  +   'display:flex;justify-content:center;pointer-events:none;}'
  + '.mb-tallycup{fill:var(--mb-water);stroke:var(--mb-teal);stroke-width:1.1;stroke-linejoin:round;}'
  /* glass */
  + '.mb-vsvg{overflow:visible;}'
  + '.mb-vwall{fill:none;stroke:var(--mb-teal);stroke-width:2.6;}'
  + '.mb-vthick{fill:none;stroke:rgba(255,255,255,.62);stroke-width:1.1;}'
  + '.mb-vrim{fill:none;stroke:var(--mb-teal);stroke-width:2.6;}'
  + '.mb-vrim-f{fill:none;stroke:rgba(255,255,255,.70);stroke-width:1.6;stroke-linecap:round;}'
  + '.mb-vbase{fill:none;stroke:var(--mb-teal);stroke-width:2.2;opacity:.55;}'
  + '.mb-vshine{fill:rgba(255,255,255,.55);}'
  + '.mb-lip,.mb-vhandle{fill:none;stroke:var(--mb-teal);stroke-width:2.6;stroke-linecap:round;}'
  /* ⚠ a beaker pouring LEFT needs a lip on the LEFT or the tilt has no
     explanation. Both exist; each shows only while pouring its own way. */
  + '.mb-lip{opacity:0;transition:opacity .18s var(--lcs-ease);}'
  + '.mb-vessel[data-vessel="jug"] .lip-r{opacity:1;}'
  + '.mb-vessel.pouring[data-pour-dir="r"] .lip-r{opacity:1;}'
  + '.mb-vessel.pouring[data-pour-dir="l"] .lip-l{opacity:1;}'
  + '.mb-liquid{fill:var(--mb-water);}'
  + '.mb-surf{fill:#8CC0DC;}'
  + '.mb-mensc{fill:none;stroke:rgba(255,255,255,.60);stroke-width:1.5;stroke-linecap:round;}'
  + '.mb-cast{fill:var(--mb-shade);opacity:.13;}'
  + '.mb-grad{stroke:var(--mb-teal);stroke-width:1.8;stroke-linecap:round;}'
  + '.mb-grad-num{fill:var(--mb-teal);font-family:var(--lcs-font-display);}'
  /* selection by CLASS, not by matching a literal stroke value */
  + '.mb-vessel.target .mb-vwall,.mb-vessel.target .mb-vrim{stroke:var(--mb-coral);}'
  + '.mb-vessel.target .mb-vlabel{color:var(--mb-coral-ink);}'
  /* ⭐ the arming ring: the 280ms wait made visible, so press-and-hold
     teaches itself and a tap can no longer pour by accident */
  + '.mb-vessel::after{content:"";position:absolute;left:50%;top:50%;width:54px;height:54px;'
  +   'margin:-27px 0 0 -27px;border-radius:50%;border:3px solid var(--mb-coral);'
  +   'opacity:0;transform:scale(.6);pointer-events:none;}'
  + '.mb-vessel.arming::after{opacity:.9;transform:scale(1);'
  +   'transition:transform 280ms linear,opacity 120ms var(--lcs-ease);}'
  /* the tilt lives on the GLASS, so the label and the reading stay level */
  + '.mb-vbody{display:block;transition:transform 200ms cubic-bezier(.45,0,.25,1);}'
  + '.mb-vessel.pouring .mb-vbody{transform:rotate(var(--mb-tilt,16deg));}'
  + '.mb-vessel.brimful .mb-vrim{stroke:var(--mb-coral);}'
  /* the falling water */
  + '.mb-streamlayer{position:absolute;inset:0;pointer-events:none;}'
  + '.mb-stream-b{fill:none;stroke:#6597B0;stroke-width:8;stroke-linecap:round;opacity:.5;}'
  + '.mb-stream{fill:none;stroke:var(--mb-water);stroke-width:5;stroke-linecap:round;'
  +   'stroke-dasharray:16 10;animation:mbFlow 480ms linear infinite;}'
  + '.mb-ripple{fill:none;stroke:rgba(255,255,255,.75);stroke-width:1.6;'
  +   'animation:mbRipple 620ms var(--lcs-ease) infinite;}'
  + '.mb-drop{fill:rgba(255,255,255,.85);animation:mbDrop 460ms var(--lcs-ease) infinite;}'
  + '.mb-drop.d2{animation-delay:150ms;}'
  + '@keyframes mbFlow{to{stroke-dashoffset:-26;}}'
  + '@keyframes mbRipple{0%{rx:5;ry:.6;opacity:.9}100%{rx:26;ry:3;opacity:0}}'
  + '@keyframes mbDrop{0%{transform:translate(0,0);opacity:.9}100%{transform:translate(0,-13px);opacity:0}}'

  /* weight */
  + '.mb-balance{position:absolute;left:0;top:0;pointer-events:none;}'
  + '.mb-balance .mb-cube-g{pointer-events:auto;cursor:pointer;}'
  + '.bal-wood{fill:var(--mb-wood);stroke:var(--mb-wood-deep);stroke-width:1.8;stroke-linejoin:round;}'
  + '.bal-wood-d{fill:var(--mb-wood-deep);}'
  + '.bal-beam{fill:var(--mb-wood);stroke:var(--mb-wood-deep);stroke-width:2;stroke-linejoin:round;}'
  + '.bal-beam-hi{fill:none;stroke:rgba(255,255,255,.34);stroke-width:2.4;stroke-linecap:round;}'
  + '.bal-stir{stroke:var(--mb-wood-deep);stroke-width:3;stroke-linecap:round;}'
  + '.bal-needle{fill:var(--mb-coral);}'
  + '.bal-plate{fill:var(--mb-paper);stroke:var(--mb-line);stroke-width:1.4;}'
  + '.bal-tick{stroke:var(--mb-teal);stroke-width:2.6;stroke-linecap:round;}'
  + '.bal-tick-s{stroke:var(--mb-teal-soft);stroke-width:1.8;stroke-linecap:round;opacity:.7;}'
  + '.bal-boss{fill:var(--mb-brass);stroke:var(--mb-wood-deep);stroke-width:2;}'
  + '.bal-boss-hi{fill:rgba(255,255,255,.55);}'
  /* 1.6px cord with a light core — 2.5px reads as dowel, not string, and a
     curve would be a lie about the physics (slack cord on a balance) */
  + '.pan-str{stroke:var(--mb-wood-deep);stroke-width:1.6;stroke-linecap:round;}'
  + '.pan-back{fill:#936E44;}'
  + '.pan-front{fill:var(--mb-wood);stroke:var(--mb-wood-deep);stroke-width:1.8;stroke-linejoin:round;}'
  + '.pan-shine{fill:none;stroke:rgba(255,255,255,.32);stroke-width:2.2;stroke-linecap:round;}'
  /* the moment of balance — on the boss and the plate, never a colour verdict */
  + '.mb-balance.settled .bal-boss{animation:mbBoss 420ms cubic-bezier(.34,1.32,.5,1);'
  +   'transform-box:fill-box;transform-origin:center;}'
  + '.mb-balance.settled .bal-plate{animation:mbPlate 900ms var(--lcs-ease);}'
  + '@keyframes mbBoss{0%{transform:scale(1)}45%{transform:scale(1.18)}100%{transform:scale(1)}}'
  + '@keyframes mbPlate{0%,100%{fill:var(--mb-paper)}30%{fill:var(--mb-brass-lite)}}'
  + '.mb-cubesupply{position:absolute;display:flex;gap:2px;padding:6px 10px;'
  +   'min-width:max(100px,calc(48px / var(--mb-s)));min-height:calc(48px / var(--mb-s));'
  +   'background:var(--mb-paper);border:1.5px solid var(--mb-wood-deep);border-radius:14px;cursor:pointer;'
  +   'align-items:center;box-shadow:0 3px 0 rgba(58,44,28,.14);}'

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

  /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
     Every instrument lives inside ONE fixed 660x430 stage that _fitStage
     scales, so a tier is now ONE number: how wide `.mb-stage-outer` may be.
     The scale follows from it, and _fitStage's own height term stops the
     bench outgrowing a short screen — which is what the old height GATES were
     a clumsy proxy for.
     ⚠⚠ THOSE GATES WERE NOT MERELY CLUMSY, THEY WERE DEAD. Every tier
     required `min-height:880px` or more while the production iframe measures
     422px, so not one of them could ever fire there — and standalone,
     1366x768 and 1600x900 (the two commonest classroom projectors) failed
     them too. Keyed on WIDTH alone now, with the two mid-range steps that
     were missing, so the common classroom display finally grows.
     The tabs and chips are scaled by hand because they sit OUTSIDE the stage
     and do not ride the transform; leaving them would grow the instrument
     and keep the controls at phone size. */
  + '@media (min-width:1000px){'
  +   'body.mb-wide .lcs-app{max-width:min(1000px,96vw);}'
  +   'body.mb-wide .mb-stage-outer{max-width:780px;}'
  + '}'
  + '@media (min-width:1200px){'
  +   'body.mb-wide .lcs-app{max-width:min(1120px,96vw);}'
  +   'body.mb-wide .mb-stage-outer{max-width:860px;}'
  + '}'
  + '@media (min-width:1367px){'
  +   'body.mb-wide .lcs-app{max-width:min(1192px,96vw);}'
  +   'body.mb-wide .mb-stage-outer{max-width:900px;}'
  +   'body.mb-wide .mb-tab{min-height:54px;padding:12px 22px;font-size:17px;}'
  +   'body.mb-wide .mb-tab svg{width:22px;height:22px;}'
  +   'body.mb-wide .mb-estbar{max-width:900px;min-height:58px;}'
  +   'body.mb-wide .mb-est-q{font-size:18px;}'
  +   'body.mb-wide .mb-est-val{font-size:26px;min-width:40px;}'
  +   'body.mb-wide .mb-est-btn{width:50px;height:50px;font-size:24px;}'
  +   'body.mb-wide .mb-est-pin{font-size:16px;min-height:50px;padding:10px 18px;}'
  +   'body.mb-wide .mb-chip{min-height:52px;font-size:16px;padding:10px 18px;}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.mb-wide{--mb-maxscale:1.7;}'
  +   'body.mb-wide .lcs-app{max-width:min(1560px,96vw);}'
  +   'body.mb-wide .mb-stage-outer{max-width:1200px;}'
  +   'body.mb-wide .mb-tab{min-height:60px;padding:14px 26px;font-size:19px;}'
  +   'body.mb-wide .mb-tab svg{width:25px;height:25px;}'
  +   'body.mb-wide .mb-estbar{max-width:1200px;min-height:64px;}'
  +   'body.mb-wide .mb-est-q{font-size:20px;}'
  +   'body.mb-wide .mb-est-val{font-size:30px;min-width:46px;}'
  +   'body.mb-wide .mb-est-btn{width:54px;height:54px;font-size:26px;}'
  +   'body.mb-wide .mb-est-pin{font-size:17px;min-height:54px;}'
  +   'body.mb-wide .mb-chip{min-height:56px;font-size:17px;padding:11px 20px;}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.mb-wide{--mb-maxscale:1.84;}'
  +   'body.mb-wide .lcs-app{max-width:min(1752px,96vw);}'
  +   'body.mb-wide .mb-stage-outer{max-width:1340px;}'
  +   'body.mb-wide .mb-tab{min-height:64px;padding:15px 30px;font-size:21px;}'
  +   'body.mb-wide .mb-tab svg{width:27px;height:27px;}'
  +   'body.mb-wide .mb-estbar{max-width:1340px;}'
  +   'body.mb-wide .mb-est-q{font-size:22px;}'
  +   'body.mb-wide .mb-est-val{font-size:34px;min-width:52px;}'
  +   'body.mb-wide .mb-est-btn{width:58px;height:58px;font-size:28px;}'
  +   'body.mb-wide .mb-est-pin{font-size:18px;min-height:56px;}'
  +   'body.mb-wide .mb-chip{min-height:58px;font-size:18px;padding:12px 22px;}'
  + '}'
  /* ⚠ A FOURTH STEP, KEYED ONLY ON HEIGHT, BECAUSE THE CAP IS HEIGHT-BOUND.
     The stage is a fixed 660x430, so its scale is set by vertical budget and
     its width follows. At 2400x1150 — tier C's own FLOOR — a cap of 1.95 cut
     the dock by 3px, while the same cap on a 1440-tall board had 280px to
     spare. Lowering the number to fit the floor would have left every tall
     board at 49% of its width, so the answer is a step, not a smaller cap:
     1.9 where the board is short, 2.2 where there is height to pay for it. */
  + '@media (min-width:2400px) and (min-height:1300px){'
  +   'body.mb-wide{--mb-maxscale:2.2;}'
  +   'body.mb-wide .mb-stage-outer{max-width:1520px;}'
  + '}'

  /* reduced motion.
     ⚠ THE SHIPPED BLOCK DELETED ALL POUR FEEDBACK: `transform:none` on
     `.mb-vessel.pouring` meant a reduced-motion user saw literally nothing
     happen when they poured. The STATIC tilt and the STATIC stream are facts
     about what is going on, not decoration — only the motion goes. */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.mb-unit.laid{transition:none !important;}'
  +   '.mb-vbody{transition:none;}'
  +   '.mb-vessel.arming::after{transition:none;}'
  +   '.mb-stream{animation:none;stroke-dasharray:none;}'
  +   '.mb-ripple,.mb-drop{animation:none;opacity:.5;}'
  +   '.mb-balance.settled .bal-boss,.mb-balance.settled .bal-plate{animation:none;}'
  +   '.mb-ruler{animation:none;}'
  +   '.mb-say.on{animation:none;}'
  + '}'

  /* the sheet is display:none on screen and only ever appears in print */
  + '.mb-sheet{display:none;}'

  /* =====================================================================
     ⭐ THE PRINT SHEET — a recording sheet for the routine the bench runs.
     ⚠ DOUBLE-LOCKED, because Ctrl+P is guarded by no chip: the subtree is
     absent unless entitled AND every rule below is scoped `body.mb-paid`. A
     block that is merely behind a button hands a free visitor the paid sheet
     the moment they press Ctrl+P.
     ⚠ LINE ART ONLY. Chrome ships "Background graphics" OFF for a great many
     teachers, so anything carried by a background-color photocopies BLANK.
     Borders print unconditionally; nothing here is filled.
     ⚠ The heading is the shell's own title, un-hidden — eleven locales, zero
     new strings.
     ===================================================================== */
  + '@media print{'
  +   '@page{size:A4 portrait;margin:14mm;}'
  +   'body.mb-paid html,body.mb-paid body,body.mb-paid .lcs-app,body.mb-paid .lcs-stage{'
  +     'background:#FFF !important;box-shadow:none !important;height:auto !important;'
  +     'max-height:none !important;max-width:none !important;overflow:visible !important;padding:0 !important;}'
  +   'body.mb-paid .lcs-header,body.mb-paid .lcs-controls,body.mb-paid .lcs-instruction{display:none !important;}'
  +   'body.mb-paid .mb-wrap{display:none !important;}'
  +   'body.mb-paid .mb-sheet{display:block !important;}'
  +   'body.mb-paid .mb-page{break-after:page;page-break-after:always;break-inside:avoid;'
  +     'page-break-inside:avoid;color:#000;font-family:Nunito,sans-serif;}'
  +   'body.mb-paid .mb-page:last-child{break-after:auto;page-break-after:auto;}'
  /* a name rule, not a label — the no-words law does not stop at the paper */
  +   'body.mb-paid .mb-page::before{content:"";display:block;width:82mm;height:0;'
  +     'border-bottom:.7pt solid #444;margin:0 0 7mm;}'
  +   'body.mb-paid .mb-phead{font-family:Baloo\\ 2,serif;font-size:17pt;font-weight:700;margin:0 0 5mm;}'
  +   'body.mb-paid .mb-prow{display:table;width:100%;border-collapse:collapse;}'
  +   'body.mb-paid .mb-pr{display:table-row;}'
  +   'body.mb-paid .mb-pc{display:table-cell;height:14mm;border:.7pt solid #666;'
  +     'text-align:center;vertical-align:middle;font-family:Baloo\\ 2,serif;font-size:13pt;width:25%;}'
  +   'body.mb-paid .mb-pc.wide{width:50%;text-align:left;padding-left:3mm;}'
  +   'body.mb-paid .mb-phr .mb-pc{height:10mm;font-size:11pt;}'
  /* the unit strip: real squares to cut out and lay along a real object */
  +   'body.mb-paid .mb-pstrip{display:flex;flex-wrap:wrap;gap:0;margin:0 0 6mm;}'
  +   'body.mb-paid .mb-pu{width:18mm;height:18mm;border:.9pt solid #333;}'
  +   'body.mb-paid .mb-pnote{font-size:10.5pt;line-height:1.35;margin:0 0 5mm;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
