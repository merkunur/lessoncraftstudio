/* =====================================================================
   spring-switch-activity.js — ACTIVITY #25 of the one-by-one rebuild:
   "Chuffer's Switchyard" (K.OA.A.3) — THE SPRING SWITCH.
   Design sheet: docs/activities-rebuild/designs/025-chuffer.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: the child never moves a crate. A load waits in the hill
   wagon; hold the release lever and the crates roll down one at a time;
   each goes into whichever car the SWITCH faces as it crosses the fork. A
   split is a moment of throwing the switch. The child reads each car on a
   number-bond plate (whole over two parts — the worksheets' diagram) and
   pulls the coupler: a true, new split is banked into the route book, a
   staircase of every way. Back up rolls every crate home (the whole never
   changes); the turntable turns a banked pair round (2 + 3 → 3 + 2). Sealed
   rounds hide one car under a tarp with its number; back-up rounds merge two
   cars into one wagon. "Shunting yard" is free play.
   No mascot but the library toy train; drawn yard geometry only.

   ACTIVITY LAYER ONLY: the model is spring-switch-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by the yard when the round is
   complete). Test seams: window.SpringSwitchActivity.st / ._order / ._pool /
   .FAST (no rolling, for the gates).
   ===================================================================== */
'use strict';

var SpringSwitchActivity = {
  id: 'spring-switch',
  apparatusClasses: ['sw-'],

  strings: {
    title:        {en:'Chuffer’s Switchyard',de:'Chuffers Rangierbahnhof',fr:'La gare de triage de Chuffer',it:'Lo scalo di smistamento di Chuffer',es:'El patio de maniobras de Chuffer',pt:'O pátio de manobras do Chuffer',nl:'Het rangeerterrein van Tuf',sv:'Puffes bangård',da:'Puffs rangerbanegård',no:'Puffens skiftetomt',fi:'Puksun ratapiha'},
    instruction:  {en:'Let the crates roll, read the cars, set the numbers, then pull the coupler.',de:'Lass die Kisten rollen, lies die Wagen ab, stell die Zahlen ein und zieh dann an der Kupplung.',fr:'Fais rouler les caisses, regarde les wagons, règle les nombres, puis tire l’attelage.',it:'Fai rotolare le casse, guarda i vagoni, imposta i numeri e poi tira il gancio.',es:'Haz rodar las cajas, mira los vagones, pon los números y luego jala el enganche.',pt:'Faça as caixas rolarem, olhe os vagões, coloque os números e depois puxe o engate.',nl:'Laat de kisten rollen, kijk naar de wagons, zet de getallen goed en trek dan aan de koppeling.',sv:'Låt lådorna rulla, titta på vagnarna, ställ in talen och dra sedan i kopplingen.',da:'Lad kasserne rulle, se på vognene, indstil tallene, og træk så i koblingen.',no:'La kassene trille, se på vognene, still inn tallene og trekk så i koblingen.',fi:'Vieritä laatikot, katso vaunut, aseta luvut ja vedä sitten kytkimestä.'},
    promptAll:    {en:'Find every way to split {n} crates.',de:'Finde alle Möglichkeiten, {n} Kisten aufzuteilen.',fr:'Trouve toutes les façons de partager {n} caisses.',it:'Trova tutti i modi per dividere {n} casse.',es:'Encuentra todas las formas de repartir {n} cajas.',pt:'Encontre todos os jeitos de dividir {n} caixas.',nl:'Vind alle manieren om {n} kisten te verdelen.',sv:'Hitta alla sätt att dela upp {n} lådor.',da:'Find alle måder at dele {n} kasser på.',no:'Finn alle måter å dele {n} kasser på.',fi:'Etsi kaikki tavat jakaa {n} laatikkoa.'},
    promptSome:   {en:'Find {w} ways to split {n} crates.',de:'Finde {w} Möglichkeiten, {n} Kisten aufzuteilen.',fr:'Trouve {w} façons de partager {n} caisses.',it:'Trova {w} modi per dividere {n} casse.',es:'Encuentra {w} formas de repartir {n} cajas.',pt:'Encontre {w} jeitos de dividir {n} caixas.',nl:'Vind {w} manieren om {n} kisten te verdelen.',sv:'Hitta {w} sätt att dela upp {n} lådor.',da:'Find {w} måder at dele {n} kasser på.',no:'Finn {w} måter å dele {n} kasser på.',fi:'Etsi {w} tapaa jakaa {n} laatikkoa.'},
    promptSealed: {en:'One car holds {k}. Send crates to make {n}.',de:'Ein Wagen hat schon {k}. Schick Kisten, damit es {n} werden.',fr:'Un wagon en a déjà {k}. Envoie des caisses pour faire {n}.',it:'Un vagone ne ha già {k}. Manda casse per fare {n}.',es:'Un vagón ya tiene {k}. Manda cajas para hacer {n}.',pt:'Um vagão já tem {k}. Mande caixas para fazer {n}.',nl:'Eén wagon heeft er al {k}. Stuur kisten om {n} te maken.',sv:'En vagn har redan {k}. Skicka lådor så att det blir {n}.',da:'Én vogn har allerede {k}. Send kasser, så det bliver {n}.',no:'Én vogn har allerede {k}. Send kasser så det blir {n}.',fi:'Yhdessä vaunussa on jo {k}. Lähetä laatikoita, niin että niitä on yhteensä {n}.'},
    promptBack:   {en:'Back up the cars. How many crates in all?',de:'Lass die Wagen zurückrollen. Wie viele Kisten sind es zusammen?',fr:'Fais reculer les wagons. Combien de caisses en tout ?',it:'Fai tornare indietro i vagoni. Quante casse in tutto?',es:'Haz retroceder los vagones. ¿Cuántas cajas hay en total?',pt:'Faça os vagões voltarem. Quantas caixas ao todo?',nl:'Laat de wagons terugrijden. Hoeveel kisten zijn het samen?',sv:'Backa vagnarna. Hur många lådor är det tillsammans?',da:'Bak vognene tilbage. Hvor mange kasser er der i alt?',no:'Rygg vognene tilbake. Hvor mange kasser er det til sammen?',fi:'Peruuta vaunut. Montako laatikkoa on yhteensä?'},
    check:        {en:'Check',de:'Prüfen',fr:'Vérifier',it:'Verifica',es:'Comprobar',pt:'Verificar',nl:'Controleer',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    banked:       {en:'{n} = {a} + {b}!',de:'{n} = {a} + {b}!',fr:'{n} = {a} + {b} !',it:'{n} = {a} + {b}!',es:'¡{n} = {a} + {b}!',pt:'{n} = {a} + {b}!',nl:'{n} = {a} + {b}!',sv:'{n} = {a} + {b}!',da:'{n} = {a} + {b}!',no:'{n} = {a} + {b}!',fi:'{n} = {a} + {b}!'},
    hintStart:    {en:'Hold the lever to let the crates roll. Flick the switch to choose a car.',de:'Halt den Hebel gedrückt, dann rollen die Kisten. Stell die Weiche, um einen Wagen zu wählen.',fr:'Garde le doigt sur le levier pour faire rouler les caisses. Change l’aiguillage pour choisir un wagon.',it:'Tieni premuta la leva e le casse rotolano. Gira lo scambio per scegliere un vagone.',es:'Mantén presionada la palanca para que rueden las cajas. Mueve el cambio de vía para elegir un vagón.',pt:'Segure a alavanca para as caixas rolarem. Vire o desvio para escolher um vagão.',nl:'Houd de hendel ingedrukt, dan rollen de kisten. Zet de wissel om een wagon te kiezen.',sv:'Håll in spaken så rullar lådorna. Lägg om växeln för att välja vagn.',da:'Hold håndtaget nede, så ruller kasserne. Stil sporskiftet for at vælge en vogn.',no:'Hold spaken nede, så triller kassene. Legg om sporvekselen for å velge vogn.',fi:'Pidä vipua alhaalla, niin laatikot vierivät. Käännä vaihde ja valitse vaunu.'},
    hintSealedStart:{en:'Hold the lever to send crates into the open car.',de:'Halt den Hebel gedrückt, dann rollen Kisten in den offenen Wagen.',fr:'Garde le doigt sur le levier pour envoyer des caisses dans le wagon ouvert.',it:'Tieni premuta la leva per mandare casse nel vagone aperto.',es:'Mantén presionada la palanca para mandar cajas al vagón abierto.',pt:'Segure a alavanca para mandar caixas para o vagão aberto.',nl:'Houd de hendel ingedrukt om kisten naar de open wagon te sturen.',sv:'Håll in spaken för att skicka lådor till den öppna vagnen.',da:'Hold håndtaget nede for at sende kasser til den åbne vogn.',no:'Hold spaken nede for å sende kasser til den åpne vognen.',fi:'Pidä vipua alhaalla, niin laatikoita menee avoimeen vaunuun.'},
    hintOneEmpty: {en:'Both cars need crates.',de:'Beide Wagen brauchen Kisten.',fr:'Les deux wagons ont besoin de caisses.',it:'Tutti e due i vagoni hanno bisogno di casse.',es:'Los dos vagones necesitan cajas.',pt:'Os dois vagões precisam de caixas.',nl:'Beide wagons hebben kisten nodig.',sv:'Båda vagnarna behöver lådor.',da:'Begge vogne skal have kasser.',no:'Begge vognene trenger kasser.',fi:'Kumpaankin vaunuun tarvitaan laatikoita.'},
    hintHill:     {en:'Some crates are still on the hill. Send them all down.',de:'Ein paar Kisten sind noch oben. Schick alle hinunter.',fr:'Il reste des caisses en haut. Envoie-les toutes en bas.',it:'Alcune casse sono ancora in cima. Mandale giù tutte.',es:'Todavía hay cajas arriba. Mándalas todas abajo.',pt:'Ainda tem caixas lá em cima. Mande todas para baixo.',nl:'Er staan nog kisten boven. Stuur ze allemaal naar beneden.',sv:'Några lådor är kvar uppe. Skicka ner alla.',da:'Nogle kasser er stadig deroppe. Send dem alle ned.',no:'Noen kasser er fortsatt der oppe. Send alle ned.',fi:'Osa laatikoista on vielä ylhäällä. Lähetä ne kaikki alas.'},
    hintUnset:    {en:'Read each car and set the numbers.',de:'Lies jeden Wagen ab und stell die Zahlen ein.',fr:'Regarde chaque wagon et règle les nombres.',it:'Guarda ogni vagone e imposta i numeri.',es:'Mira cada vagón y pon los números.',pt:'Olhe cada vagão e coloque os números.',nl:'Kijk naar elke wagon en zet de getallen goed.',sv:'Titta på varje vagn och ställ in talen.',da:'Se på hver vogn, og indstil tallene.',no:'Se på hver vogn og still inn tallene.',fi:'Katso kumpikin vaunu ja aseta luvut.'},
    hintBackFirst:{en:'Back up the cars first: the crates roll into the wagon.',de:'Lass zuerst die Wagen zurückrollen: Die Kisten rollen in den Wagen oben.',fr:'Fais d’abord reculer les wagons : les caisses roulent dans le wagon du haut.',it:'Prima fai tornare indietro i vagoni: le casse rotolano nel vagone in alto.',es:'Primero haz retroceder los vagones: las cajas ruedan al vagón de arriba.',pt:'Primeiro faça os vagões voltarem: as caixas rolam para o vagão lá de cima.',nl:'Laat eerst de wagons terugrijden: de kisten rollen in de wagon bovenaan.',sv:'Backa vagnarna först: lådorna rullar upp i vagnen.',da:'Bak først vognene tilbage: kasserne ruller op i vognen.',no:'Rygg vognene tilbake først: kassene triller opp i vognen.',fi:'Peruuta ensin vaunut: laatikot vierivät ylös vaunuun.'},
    hintRepeat:   {en:'You found that way already. Try a different split.',de:'Diese Möglichkeit hast du schon. Probier eine andere Aufteilung.',fr:'Tu as déjà trouvé cette façon. Essaie un autre partage.',it:'Questo modo l’hai già trovato. Prova a dividere in un altro modo.',es:'Esa forma ya la encontraste. Prueba otra manera de repartir.',pt:'Esse jeito você já achou. Tente dividir de outro jeito.',nl:'Die manier had je al. Probeer een andere verdeling.',sv:'Det sättet har du redan hittat. Prova en annan uppdelning.',da:'Den måde har du allerede fundet. Prøv en anden deling.',no:'Den måten har du allerede funnet. Prøv en annen deling.',fi:'Tämän tavan löysit jo. Kokeile toista jakoa.'},
    hintCountL:   {en:'Count the left car again.',de:'Zähl den linken Wagen noch einmal.',fr:'Recompte le wagon de gauche.',it:'Conta di nuovo il vagone di sinistra.',es:'Cuenta otra vez el vagón de la izquierda.',pt:'Conte de novo o vagão da esquerda.',nl:'Tel de linker wagon nog eens.',sv:'Räkna den vänstra vagnen igen.',da:'Tæl den venstre vogn igen.',no:'Tell den venstre vognen igjen.',fi:'Laske vasen vaunu uudelleen.'},
    hintCountR:   {en:'Count the right car again.',de:'Zähl den rechten Wagen noch einmal.',fr:'Recompte le wagon de droite.',it:'Conta di nuovo il vagone di destra.',es:'Cuenta otra vez el vagón de la derecha.',pt:'Conte de novo o vagão da direita.',nl:'Tel de rechter wagon nog eens.',sv:'Räkna den högra vagnen igen.',da:'Tæl den højre vogn igen.',no:'Tell den høyre vognen igjen.',fi:'Laske oikea vaunu uudelleen.'},
    hintHasL:     {en:'Count the left car with the numbers. Which number goes on the question mark?',de:'Zähl den linken Wagen mit den Zahlen. Welche Zahl gehört zum Fragezeichen?',fr:'Compte le wagon de gauche avec les nombres. Quel nombre va sur le point d’interrogation ?',it:'Conta il vagone di sinistra con i numeri. Quale numero va sul punto interrogativo?',es:'Cuenta el vagón de la izquierda con los números. ¿Qué número va en el signo de interrogación?',pt:'Conte o vagão da esquerda com os números. Qual número vai no ponto de interrogação?',nl:'Tel de linker wagon met de getallen. Welk getal hoort bij het vraagteken?',sv:'Räkna den vänstra vagnen med talen. Vilket tal ska stå vid frågetecknet?',da:'Tæl den venstre vogn med tallene. Hvilket tal hører til spørgsmålstegnet?',no:'Tell den venstre vognen med tallene. Hvilket tall hører til spørsmålstegnet?',fi:'Laske vasen vaunu lukujen avulla. Mikä luku kuuluu kysymysmerkin paikalle?'},
    hintHasR:     {en:'Count the right car with the numbers. Which number goes on the question mark?',de:'Zähl den rechten Wagen mit den Zahlen. Welche Zahl gehört zum Fragezeichen?',fr:'Compte le wagon de droite avec les nombres. Quel nombre va sur le point d’interrogation ?',it:'Conta il vagone di destra con i numeri. Quale numero va sul punto interrogativo?',es:'Cuenta el vagón de la derecha con los números. ¿Qué número va en el signo de interrogación?',pt:'Conte o vagão da direita com os números. Qual número vai no ponto de interrogação?',nl:'Tel de rechter wagon met de getallen. Welk getal hoort bij het vraagteken?',sv:'Räkna den högra vagnen med talen. Vilket tal ska stå vid frågetecknet?',da:'Tæl den højre vogn med tallene. Hvilket tal hører til spørgsmålstegnet?',no:'Tell den høyre vognen med tallene. Hvilket tall hører til spørsmålstegnet?',fi:'Laske oikea vaunu lukujen avulla. Mikä luku kuuluu kysymysmerkin paikalle?'},
    hintTogether: {en:'Together the cars must make {n}.',de:'In beiden Wagen zusammen müssen {n} Kisten sein.',fr:'Ensemble, les wagons doivent faire {n}.',it:'Insieme i vagoni devono fare {n}.',es:'Entre los dos vagones debe haber {n} cajas.',pt:'Juntos, os vagões precisam fazer {n}.',nl:'Samen moeten de wagons {n} maken.',sv:'Tillsammans ska det vara {n} lådor i vagnarna.',da:'Tilsammen skal vognene give {n}.',no:'Til sammen skal vognene bli {n}.',fi:'Vaunuissa pitää olla yhteensä {n}.'},
    hintCountOn:  {en:'Count on from {k} to {n}.',de:'Zähl von {k} weiter bis {n}.',fr:'Compte à partir de {k} jusqu’à {n}.',it:'Conta da {k} in avanti fino a {n}.',es:'Sigue contando desde {k} hasta {n}.',pt:'Conte a partir de {k} até {n}.',nl:'Tel verder vanaf {k} tot {n}.',sv:'Räkna vidare från {k} till {n}.',da:'Tæl videre fra {k} til {n}.',no:'Tell videre fra {k} til {n}.',fi:'Jatka laskemista luvusta {k} lukuun {n}.'},
    hintCountAll: {en:'Count all the crates in the wagon.',de:'Zähl alle Kisten im Wagen oben.',fr:'Compte toutes les caisses du wagon.',it:'Conta tutte le casse nel vagone.',es:'Cuenta todas las cajas del vagón.',pt:'Conte todas as caixas do vagão.',nl:'Tel alle kisten in de wagon.',sv:'Räkna alla lådor i vagnen uppe.',da:'Tæl alle kasserne i vognen.',no:'Tell alle kassene i vognen.',fi:'Laske kaikki vaunun laatikot.'},
    hintNumbers:  {en:'Count with the numbers. Which number goes on the question mark?',de:'Zähl mit den Zahlen. Welche Zahl gehört zum Fragezeichen?',fr:'Compte avec les nombres. Quel nombre va sur le point d’interrogation ?',it:'Conta con i numeri. Quale numero va sul punto interrogativo?',es:'Cuenta con los números. ¿Qué número va en el signo de interrogación?',pt:'Conte com os números. Qual número vai no ponto de interrogação?',nl:'Tel met de getallen. Welk getal hoort bij het vraagteken?',sv:'Räkna med talen. Vilket tal ska stå vid frågetecknet?',da:'Tæl med tallene. Hvilket tal hører til spørgsmålstegnet?',no:'Tell med tallene. Hvilket tall hører til spørsmålstegnet?',fi:'Laske lukujen avulla. Mikä luku kuuluu kysymysmerkin paikalle?'},
    celebrateAll: {en:'You found every way to make {n}!',de:'Du hast alle Möglichkeiten für {n} gefunden!',fr:'Tu as trouvé toutes les façons de faire {n} !',it:'Hai trovato tutti i modi per fare {n}!',es:'¡Encontraste todas las formas de hacer {n}!',pt:'Você achou todos os jeitos de fazer {n}!',nl:'Je hebt alle manieren gevonden om {n} te maken!',sv:'Du har hittat alla sätt att göra {n}!',da:'Du har fundet alle måder at lave {n} på!',no:'Du har funnet alle måter å lage {n} på!',fi:'Löysit kaikki tavat tehdä {n}!'},
    celebrateSome:{en:'You found {w} ways to make {n}!',de:'Du hast {w} Möglichkeiten für {n} gefunden!',fr:'Tu as trouvé {w} façons de faire {n} !',it:'Hai trovato {w} modi per fare {n}!',es:'¡Encontraste {w} formas de hacer {n}!',pt:'Você achou {w} jeitos de fazer {n}!',nl:'Je hebt {w} manieren gevonden om {n} te maken!',sv:'Du har hittat {w} sätt att göra {n}!',da:'Du har fundet {w} måder at lave {n} på!',no:'Du har funnet {w} måter å lage {n} på!',fi:'Löysit {w} tapaa tehdä {n}!'},
    celebrateMake:{en:'{a} and {b} make {n}!',de:'{a} und {b} sind zusammen {n}!',fr:'{a} et {b}, ça fait {n} !',it:'{a} e {b} fanno {n}!',es:'¡{a} y {b} hacen {n}!',pt:'{a} e {b} fazem {n}!',nl:'{a} en {b} is samen {n}!',sv:'{a} och {b} blir {n}!',da:'{a} og {b} giver {n}!',no:'{a} og {b} blir {n}!',fi:'{a} ja {b} on yhteensä {n}!'},
    celebrateTen: {en:'Every way to make 10 is on the staircase!',de:'Alle Möglichkeiten für 10 stehen auf der Treppe!',fr:'Toutes les façons de faire 10 sont sur l’escalier !',it:'Tutti i modi per fare 10 sono sulla scala!',es:'¡Todas las formas de hacer 10 están en la escalera!',pt:'Todos os jeitos de fazer 10 estão na escada!',nl:'Alle manieren om 10 te maken staan op de trap!',sv:'Alla sätt att göra 10 finns på trappan!',da:'Alle måder at lave 10 på står på trappen!',no:'Alle måter å lage 10 på står på trappen!',fi:'Kaikki tavat tehdä 10 ovat portaissa!'},
    play:         {en:'Shunting yard',de:'Rangieren',fr:'Manœuvres libres',it:'Manovre',es:'Maniobras',pt:'Manobras',nl:'Rangeren',sv:'Växla fritt',da:'Rangér selv',no:'Skift selv',fi:'Vaihtotyö'},
    playBack:     {en:'Back to the task',de:'Zurück zur Aufgabe',fr:'Retour à l’exercice',it:'Torna all’esercizio',es:'Volver a la tarea',pt:'Voltar à tarefa',nl:'Terug naar de opdracht',sv:'Tillbaka till uppgiften',da:'Tilbage til opgaven',no:'Tilbake til oppgaven',fi:'Takaisin tehtävään'},
    playNote:     {en:'Roll any load. The number bond fills itself in.',de:'Lass eine beliebige Ladung rollen. Das Zahlenhaus füllt sich von selbst.',fr:'Fais rouler la charge que tu veux. La maison des nombres se remplit toute seule.',it:'Fai rotolare il carico che vuoi. Lo schema si riempie da solo.',es:'Haz rodar la carga que quieras. El esquema se llena solo.',pt:'Faça rolar a carga que quiser. O diagrama se preenche sozinho.',nl:'Laat elke lading rollen die je wilt. Het splitsschema vult zichzelf in.',sv:'Rulla vilken last du vill. Talkamratsbilden fyller i sig själv.',da:'Rul hvilken last du vil. Talhuset udfylder sig selv.',no:'Trill hvilken last du vil. Tallhuset fyller seg ut selv.',fi:'Vieritä mikä kuorma tahansa. Lukukaavio täyttyy itsestään.'},
    release:      {en:'Release lever: let a crate roll',de:'Hebel: eine Kiste rollen lassen',fr:'Levier : faire rouler une caisse',it:'Leva: fai rotolare una cassa',es:'Palanca: deja rodar una caja',pt:'Alavanca: deixe uma caixa rolar',nl:'Hendel: laat een kist rollen',sv:'Spak: låt en låda rulla',da:'Håndtag: lad en kasse rulle',no:'Spak: la en kasse trille',fi:'Vipu: päästä laatikko vierimään'},
    switchL:      {en:'Switch: points to the left car',de:'Weiche: zeigt zum linken Wagen',fr:'Aiguillage : vers le wagon de gauche',it:'Scambio: verso il vagone di sinistra',es:'Cambio de vía: hacia el vagón de la izquierda',pt:'Desvio: para o vagão da esquerda',nl:'Wissel: naar de linker wagon',sv:'Växel: mot den vänstra vagnen',da:'Sporskifte: mod den venstre vogn',no:'Sporveksel: mot den venstre vognen',fi:'Vaihde: kohti vasenta vaunua'},
    switchR:      {en:'Switch: points to the right car',de:'Weiche: zeigt zum rechten Wagen',fr:'Aiguillage : vers le wagon de droite',it:'Scambio: verso il vagone di destra',es:'Cambio de vía: hacia el vagón de la derecha',pt:'Desvio: para o vagão da direita',nl:'Wissel: naar de rechter wagon',sv:'Växel: mot den högra vagnen',da:'Sporskifte: mod den højre vogn',no:'Sporveksel: mot den høyre vognen',fi:'Vaihde: kohti oikeaa vaunua'},
    backUp:       {en:'Back up: roll the crates home',de:'Zurückrollen: die Kisten fahren heim',fr:'Reculer : les caisses rentrent',it:'Indietro: le casse tornano su',es:'Retroceder: las cajas regresan',pt:'Voltar: as caixas voltam',nl:'Terugrijden: de kisten gaan terug',sv:'Backa: lådorna rullar hem',da:'Bak: kasserne ruller hjem',no:'Rygg: kassene triller hjem',fi:'Peruuta: laatikot vierivät takaisin'},
    coupler:      {en:'Coupler',de:'Kupplung',fr:'Attelage',it:'Gancio',es:'Enganche',pt:'Engate',nl:'Koppeling',sv:'Koppling',da:'Kobling',no:'Kobling',fi:'Kytkin'},
    turntable:    {en:'Turntable: turn the cars round',de:'Drehscheibe: die Wagen umdrehen',fr:'Plaque tournante : retourner les wagons',it:'Piattaforma girevole: gira i vagoni',es:'Plataforma giratoria: da vuelta a los vagones',pt:'Girador: vire os vagões',nl:'Draaischijf: draai de wagons om',sv:'Vändskiva: vänd på vagnarna',da:'Drejeskive: vend vognene',no:'Svingskive: snu vognene',fi:'Kääntöpöytä: käännä vaunut'},
    wagon:        {en:'Hill wagon: {n}',de:'Wagen oben: {n}',fr:'Wagon du haut : {n}',it:'Vagone in alto: {n}',es:'Vagón de arriba: {n}',pt:'Vagão de cima: {n}',nl:'Wagon bovenaan: {n}',sv:'Vagnen uppe: {n}',da:'Vognen oppe: {n}',no:'Vognen oppe: {n}',fi:'Ylävaunu: {n}'},
    carL:         {en:'Left car',de:'Linker Wagen',fr:'Wagon de gauche',it:'Vagone di sinistra',es:'Vagón de la izquierda',pt:'Vagão da esquerda',nl:'Linker wagon',sv:'Vänstra vagnen',da:'Venstre vogn',no:'Venstre vogn',fi:'Vasen vaunu'},
    carR:         {en:'Right car',de:'Rechter Wagen',fr:'Wagon de droite',it:'Vagone di destra',es:'Vagón de la derecha',pt:'Vagão da direita',nl:'Rechter wagon',sv:'Högra vagnen',da:'Højre vogn',no:'Høyre vogn',fi:'Oikea vaunu'},
    dial:         {en:'Set this number',de:'Diese Zahl einstellen',fr:'Régler ce nombre',it:'Imposta questo numero',es:'Poner este número',pt:'Colocar este número',nl:'Dit getal instellen',sv:'Ställ in det här talet',da:'Indstil dette tal',no:'Still inn dette tallet',fi:'Aseta tämä luku'},
    loadLess:     {en:'One crate fewer',de:'Eine Kiste weniger',fr:'Une caisse de moins',it:'Una cassa in meno',es:'Una caja menos',pt:'Uma caixa a menos',nl:'Eén kist minder',sv:'En låda mindre',da:'Én kasse mindre',no:'Én kasse mindre',fi:'Yksi laatikko vähemmän'},
    loadMore:     {en:'One crate more',de:'Eine Kiste mehr',fr:'Une caisse de plus',it:'Una cassa in più',es:'Una caja más',pt:'Uma caixa a mais',nl:'Eén kist meer',sv:'En låda till',da:'Én kasse mere',no:'Én kasse til',fi:'Yksi laatikko lisää'},
    bookLabel:    {en:'Ways found: {f} of {t}',de:'Gefundene Möglichkeiten: {f} von {t}',fr:'Façons trouvées : {f} sur {t}',it:'Modi trovati: {f} su {t}',es:'Formas encontradas: {f} de {t}',pt:'Jeitos encontrados: {f} de {t}',nl:'Gevonden manieren: {f} van {t}',sv:'Hittade sätt: {f} av {t}',da:'Fundne måder: {f} af {t}',no:'Funnet måter: {f} av {t}',fi:'Löydetyt tavat: {f}/{t}'},
    setNumbers:   {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    upto5:        {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opp til 5',fi:'5:een asti'},
    six9:         {en:'6 to 9',de:'6 bis 9',fr:'De 6 à 9',it:'Da 6 a 9',es:'Del 6 al 9',pt:'De 6 a 9',nl:'6 tot en met 9',sv:'6 till 9',da:'6 til 9',no:'6 til 9',fi:'6–9'},
    ten:          {en:'Make ten',de:'Zur 10 ergänzen',fr:'Faire 10',it:'Amici del 10',es:'Formar 10',pt:'Formar 10',nl:'Verliefde harten',sv:'Talkamrater till 10',da:'Tiervenner',no:'Tiervenner',fi:'Kymppiparit'},
    setTurn:      {en:'Turntable',de:'Drehscheibe',fr:'Plaque tournante',it:'Piattaforma girevole',es:'Plataforma giratoria',pt:'Girador',nl:'Draaischijf',sv:'Vändskiva',da:'Drejeskive',no:'Svingskive',fi:'Kääntöpöytä'},
    show:         {en:'Show',de:'Zeigen',fr:'Afficher',it:'Mostra',es:'Mostrar',pt:'Mostrar',nl:'Tonen',sv:'Visa',da:'Vis',no:'Vis',fi:'Näytä'},
    hide:         {en:'Hide',de:'Ausblenden',fr:'Masquer',it:'Nascondi',es:'Ocultar',pt:'Ocultar',nl:'Verbergen',sv:'Dölj',da:'Skjul',no:'Skjul',fi:'Piilota'}
  },

  defaults: { numbers: 'upto5', turntable: 'show' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'upto5', labelKey: 'upto5' }, { value: 'six9', labelKey: 'six9' }, { value: 'ten', labelKey: 'ten' }] },
    { key: 'turntable', type: 'choice', labelKey: 'setTurn', options: [{ value: 'show', labelKey: 'show' }, { value: 'hide', labelKey: 'hide' }] }
  ],

  ROLL_MS: 300, STREAM_MS: 450, CHECK_MS: 500, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._busy = false; this._inflight = 0; this._timers = []; this._ro = null; this._hold = null;
    this._dial = null; this._tarp = false; this._flash = null; this._lit = null; this._tenBook = []; this._tenPass = -1;
    this._themes = {};
    injectSpringSwitchCSS();
    if (typeof LCSPictures !== 'undefined') LCSPictures.load('toys').then(function (th) { self._themes.toys = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the siding stays empty */ });
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var st = self._cur(); if (!st || st.done) return;
      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') { self._flick(ev.key === 'ArrowLeft' ? 'L' : 'R'); ev.preventDefault(); }
      else if (ev.key === ' ' && tg !== 'BUTTON') { self._releaseOne(); ev.preventDefault(); }
      else if (ev.key === 'b' || ev.key === 'B') { self._backUp(); ev.preventDefault(); }
      else if (ev.key === 't' || ev.key === 'T') { self._turn(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers(); this._stopHold();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    this._pool = null; this._order = null; this._playing = false;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },

  /* ---------------- rounds ---------------- */
  _level: function () { return SpringSwitchCore.level(this.api && this.api.settings && this.api.settings.numbers); },
  _turnOn: function () { return !(this.api && this.api.settings && this.api.settings.turntable === 'hide'); },
  _ensurePool: function () { var key = this._level(); if (!this._pool || this._poolKey !== key) { this._pool = SpringSwitchCore.rounds(key); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = SpringSwitchCore.order(pool, Math.random, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = SpringSwitchCore.order(pool, Math.random, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    /* Make ten: one staircase of the bonds of ten for the whole pass */
    var lastOfTen = r.level === 'ten' && index % n === n - 1;
    if (r.level === 'ten' && this._tenPass !== pass) { this._tenBook = []; this._tenPass = pass; }
    var self = this;
    return {
      id: 'spring-switch.' + r.id,
      promptKey: r.kind === 'all' ? (r.need < r.n - 1 ? 'promptSome' : 'promptAll') : r.kind === 'sealed' ? 'promptSealed' : 'promptBack',
      promptArgs: { n: r.n, w: r.need, k: r.k, a: r.a, b: r.b },
      celebrateKey: lastOfTen ? 'celebrateTen' : SpringSwitchCore.celebrateKey(r),
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._stopHold();
        tool.st = SpringSwitchCore.newState(r, r.level === 'ten' ? self._tenBook : null); tool._round = r; tool._playing = false;
        tool._busy = false; tool._inflight = 0; tool._dial = null; tool._tarp = false; tool._flash = null; tool._lit = null;
        if (tool._flyLayer) tool._flyLayer.innerHTML = '';
      },
      /* the yard presses Check itself when the round is complete */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this;
    if (!this.st) { this._round = SpringSwitchCore.rounds('upto5')[0]; this.st = SpringSwitchCore.newState(this._round); }
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'sw-wrap'); this._wrap = wrap;
    var body = api.el('div', 'sw-body'); this._body = body;

    /* the yard */
    var yard = api.el('div', 'sw-yard'); this._yard = yard;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'sw-rails'); svg.setAttribute('aria-hidden', 'true'); this._rails = svg; yard.appendChild(svg);
    var train = document.createElement('img'); train.className = 'sw-train'; train.alt = ''; train.draggable = false; train.setAttribute('aria-hidden', 'true'); this._train = train; yard.appendChild(train);
    var puff = api.el('div', 'sw-puff'); puff.innerHTML = '<i></i><i></i><i></i>'; this._puff = puff; yard.appendChild(puff);
    this._wagon = this._car('sw-wagon'); yard.appendChild(this._wagon.el);
    var wnum = api.el('div', 'sw-wnum'); this._wnum = wnum; yard.appendChild(wnum);
    var back = api.el('button', 'sw-back'); back.type = 'button';
    back.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>';
    back.addEventListener('click', function () { self._backUp(); }); this._backBtn = back; yard.appendChild(back);
    var lever = api.el('button', 'sw-lever'); lever.type = 'button';
    lever.innerHTML = '<span class="sw-lever-post"></span><span class="sw-lever-arm"><span class="sw-lever-knob"></span></span>';
    this._bindLever(lever); this._lever = lever; yard.appendChild(lever);
    var sw = api.el('button', 'sw-switch'); sw.type = 'button';
    sw.innerHTML = '<span class="sw-switch-base"></span><span class="sw-switch-arm"><span class="sw-switch-knob"></span></span>';
    sw.addEventListener('click', function () { self._flick(); }); this._switchBtn = sw; yard.appendChild(sw);
    this._cars = { L: this._car('sw-car sw-car-l'), R: this._car('sw-car sw-car-r') };
    yard.appendChild(this._cars.L.el); yard.appendChild(this._cars.R.el);
    var tarp = api.el('div', 'sw-tarp'); this._tarpEl = tarp; yard.appendChild(tarp);
    var coup = api.el('button', 'sw-coupler'); coup.type = 'button';
    coup.innerHTML = '<span class="sw-coupler-hook"></span><span class="sw-coupler-handle"></span>';
    coup.addEventListener('click', function () { self._couple(); }); this._coupler = coup; yard.appendChild(coup);
    var fly = api.el('div', 'sw-fly'); this._flyLayer = fly; yard.appendChild(fly);
    body.appendChild(yard);

    /* the plate column: the number bond, the equation, the dial keys, the route book */
    var col = api.el('div', 'sw-col'); this._col = col;
    var bond = api.el('div', 'sw-bond'); this._bond = bond;
    bond.innerHTML = '<svg class="sw-bond-lines" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><path d="M50 18L22 52"/><path d="M50 18L78 52"/></svg>';
    this._circles = {};
    ['w', 'a', 'b'].forEach(function (k) {
      var c = api.el('button', 'sw-circle sw-circle-' + k); c.type = 'button';
      c.addEventListener('click', function () { self._openDial(k); });
      bond.appendChild(c); self._circles[k] = c;
    });
    col.appendChild(bond);
    var eq = api.el('div', 'sw-eq'); eq.setAttribute('aria-live', 'polite'); this._eq = eq; col.appendChild(eq);
    var keys = api.el('div', 'sw-keys'); keys.setAttribute('role', 'group'); this._keys = keys; col.appendChild(keys);
    var bk = api.el('div', 'sw-book'); bk.setAttribute('role', 'img'); this._book = bk; col.appendChild(bk);
    var stepper = api.el('div', 'sw-stepper'); this._stepper = stepper;
    var less = api.el('button', 'sw-step'); less.type = 'button'; less.textContent = '−'; less.addEventListener('click', function () { self._load(-1); }); this._lessBtn = less;
    var more = api.el('button', 'sw-step'); more.type = 'button'; more.textContent = '+'; more.addEventListener('click', function () { self._load(1); }); this._moreBtn = more;
    stepper.appendChild(less); stepper.appendChild(more); col.appendChild(stepper);
    body.appendChild(col);
    wrap.appendChild(body);

    var note = api.el('div', 'sw-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var row = api.el('div', 'sw-actions');
    var turn = api.el('button', 'sw-turn'); turn.type = 'button';
    turn.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 0 1-14 5.3"/><path d="M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4"/><path d="M6 21v-4h4"/></svg>';
    turn.addEventListener('click', function () { self._turn(); }); this._turnBtn = turn; row.appendChild(turn);
    var playBtn = api.el('button', 'sw-tool sw-playbtn'); playBtn.type = 'button'; playBtn.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = playBtn; row.appendChild(playBtn);
    var go = api.el('button', 'sw-go'); go.type = 'button'; go.addEventListener('click', function () { self._couple(); }); this._go = go; row.appendChild(go);
    wrap.appendChild(row);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  /* a car or the hill wagon: a flatbed with 2 × 5 slots */
  _car: function (cls) {
    var el = this.api.el('div', cls), slots = [];
    var grid = this.api.el('div', 'sw-slots');
    for (var i = 0; i < 10; i++) { var s = this.api.el('span', 'sw-slot'); s.innerHTML = '<i class="sw-crate"></i><b class="sw-chip"></b>'; grid.appendChild(s); slots.push(s); }
    el.appendChild(grid);
    var wheels = this.api.el('span', 'sw-wheels'); wheels.innerHTML = '<i></i><i></i>'; el.appendChild(wheels);
    return { el: el, slots: slots };
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  /* the yard geometry: the train, the hill wagon, the back-up chip and the release lever on top;
     the fork and the switch in the middle; the two cars and the coupler at the bottom */
  _layout: function () {
    var L = this._L = SpringSwitchCore.layout(this._width()), w = this._wrap, Y = L.yard, c = L.c;
    w.classList.toggle('is-wide', L.mode === 'wide'); w.classList.toggle('is-narrow', L.mode === 'narrow');
    w.classList.toggle('is-tiny', Y < 340);
    w.style.setProperty('--sw-c', c + 'px');
    w.style.setProperty('--sw-col', L.col + 'px');
    w.style.setProperty('--sw-whole', L.whole + 'px');
    w.style.setProperty('--sw-part', L.part + 'px');
    w.style.setProperty('--sw-key', L.key + 'px');
    var pad = 6, gapTop = L.mode === 'wide' ? 10 : 6;
    var rowH = Math.max(L.train, L.carH + 12);
    var G = { pad: pad };
    G.train = { x: pad, y: pad + rowH - L.train, w: L.train, h: L.train };
    G.wagon = { x: pad + L.train + gapTop, y: pad + (rowH - L.carH - 12), w: L.carW, h: L.carH };
    G.back = { x: G.wagon.x + L.carW + gapTop, y: G.wagon.y + (L.carH - 44) / 2, w: 44, h: 44 };
    G.lever = { x: Math.min(Y - pad - L.lever, G.back.x + 44 + gapTop), y: pad + rowH - L.lever - 4, w: L.lever, h: L.lever };
    var forkH = L.mode === 'wide' ? 96 : 70;
    G.fork = { x: Y / 2, y: pad + rowH + forkH * 0.5 };
    G.sw = { x: Y / 2 + 22, y: G.fork.y - L.lever + 4, w: L.lever, h: L.lever };
    var carsW = 2 * L.carW + L.coupler + 2 * 8;
    var cy = pad + rowH + forkH;
    G.carL = { x: (Y - carsW) / 2, y: cy, w: L.carW, h: L.carH };
    G.carR = { x: G.carL.x + L.carW + L.coupler + 16, y: cy, w: L.carW, h: L.carH };
    G.coupler = { x: G.carL.x + L.carW + 8, y: cy + L.carH / 2 - 36, w: L.coupler, h: 72 };
    G.H = cy + L.carH + 14 + pad;
    this._G = G;
    var place = function (el, b) { el.style.left = b.x + 'px'; el.style.top = b.y + 'px'; el.style.width = b.w + 'px'; el.style.height = b.h + 'px'; };
    this._yard.style.width = Y + 'px'; this._yard.style.height = G.H + 'px';
    place(this._train, G.train); place(this._wagon.el, G.wagon); place(this._backBtn, G.back); place(this._lever, G.lever);
    place(this._switchBtn, G.sw); place(this._cars.L.el, G.carL); place(this._cars.R.el, G.carR); place(this._coupler, G.coupler);
    this._wnum.style.left = (G.wagon.x - 12) + 'px'; this._wnum.style.top = (G.wagon.y - 12) + 'px';
    this._puff.style.left = (G.train.x + G.train.w * 0.2) + 'px'; this._puff.style.top = (G.train.y - 6) + 'px';
    /* the rails: wagon → fork → each car */
    var wx = G.wagon.x + L.carW / 2, wy = G.wagon.y + L.carH + 8;
    var lx = G.carL.x + L.carW / 2, rx = G.carR.x + L.carW / 2, ty = G.carL.y - 4;
    this._rails.setAttribute('viewBox', '0 0 ' + Y + ' ' + G.H);
    this._rails.innerHTML = ''
      + '<path class="sw-hill" d="M' + (G.wagon.x - 10) + ' ' + (wy + 4) + 'L' + (G.wagon.x + L.carW + 10) + ' ' + (wy + 4) + 'Q' + (Y - 20) + ' ' + (wy + 10) + ' ' + Y + ' ' + (G.fork.y + 26) + 'L0 ' + (G.fork.y + 26) + 'Q20 ' + (wy + 10) + ' ' + (G.wagon.x - 10) + ' ' + (wy + 4) + 'Z"/>'
      + '<path class="sw-rail" d="M' + wx + ' ' + wy + 'L' + G.fork.x + ' ' + G.fork.y + '"/>'
      + '<path class="sw-rail sw-rail-l" d="M' + G.fork.x + ' ' + G.fork.y + 'L' + lx + ' ' + ty + '"/>'
      + '<path class="sw-rail sw-rail-r" d="M' + G.fork.x + ' ' + G.fork.y + 'L' + rx + ' ' + ty + '"/>'
      + '<path class="sw-blade sw-blade-l" d="M' + G.fork.x + ' ' + G.fork.y + 'L' + (G.fork.x + (lx - G.fork.x) * 0.22) + ' ' + (G.fork.y + (ty - G.fork.y) * 0.22) + '"/>'
      + '<path class="sw-blade sw-blade-r" d="M' + G.fork.x + ' ' + G.fork.y + 'L' + (G.fork.x + (rx - G.fork.x) * 0.22) + ' ' + (G.fork.y + (ty - G.fork.y) * 0.22) + '"/>'
      + '<circle class="sw-forkdot" cx="' + G.fork.x + '" cy="' + G.fork.y + '" r="5"/>';
    this._paths = { wx: wx, wy: wy, lx: lx, rx: rx, ty: ty };
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- paint ---------------- */
  _paint: function () {
    var st = this._cur(), t = this.api.t, self = this;
    if (!st || !this._wrap) return;
    var w = this._wrap;
    w.classList.toggle('is-play', !!st.explore);
    w.classList.toggle('is-done', !!st.done);
    w.classList.toggle('is-sealed', !!st.sealed);
    w.classList.toggle('is-back', st.kind === 'backup');

    /* the train */
    if (this._themes.toys && typeof LCSPictures !== 'undefined') { try { var src = LCSPictures.url(this._themes.toys, 'train'); if (this._train.getAttribute('src') !== src) this._train.setAttribute('src', src); } catch (e) { /* no train */ } }
    this._train.hidden = !this._train.getAttribute('src');

    /* the hill wagon */
    var chips = SpringSwitchCore.chips(st);
    var hillShown = Math.max(0, st.hill - this._inflight);
    this._fill(this._wagon, hillShown, chips.hill, this._lit === 'hill' ? 'is-lit' : '');
    this._wnum.textContent = st.kind === 'backup' && !st.done ? (st.backed ? '' : '') : String(st.sealed ? '' : st.n);
    this._wnum.hidden = !this._wnum.textContent;
    this._wagon.el.setAttribute('aria-label', interp(t('wagon'), { n: hillShown }));
    this._wagon.el.setAttribute('role', 'img');
    this._backBtn.setAttribute('aria-label', t('backUp')); this._backBtn.title = t('backUp');
    this._backBtn.disabled = st.done || this._busy || !!this._inflight || (st.kind === 'backup' ? st.backed : (!st.L && !st.R));
    this._backBtn.classList.toggle('is-awake', st.kind === 'backup' && !st.backed && !st.done);

    /* the lever and the switch */
    this._lever.setAttribute('aria-label', t('release')); this._lever.title = t('release');
    this._lever.disabled = st.done || st.kind === 'backup' || this._busy || hillShown <= 0;
    this._lever.classList.toggle('is-awake', !st.done && !st.L && !st.R && !this._inflight && st.kind !== 'backup' && !st.explore && st.hill > 0);
    this._switchBtn.classList.toggle('is-r', (st.sealed ? SpringSwitchCore.openSide(st) : st.sw) === 'R');
    this._switchBtn.disabled = st.done || !!st.sealed || st.kind === 'backup' || this._busy;
    this._switchBtn.setAttribute('aria-label', t((st.sealed ? SpringSwitchCore.openSide(st) : st.sw) === 'R' ? 'switchR' : 'switchL'));
    this._switchBtn.title = this._switchBtn.getAttribute('aria-label');
    this._rails.classList.toggle('is-r', (st.sealed ? SpringSwitchCore.openSide(st) : st.sw) === 'R');
    this._rails.classList.toggle('is-locked', st.kind === 'backup');

    /* the cars */
    var open = SpringSwitchCore.openSide(st);
    ['L', 'R'].forEach(function (s) {
      var car = self._cars[s], n = s === 'L' ? st.L : st.R;
      if (st.sealed && st.sealed.side === s) n = self._tarp ? st.sealed.k : 0;
      self._fill(car, n, chips[s], self._lit === s ? 'is-lit' : '');
      car.el.setAttribute('aria-label', t(s === 'L' ? 'carL' : 'carR'));
      car.el.setAttribute('role', 'img');
      car.el.classList.toggle('is-flash', self._flash === s);
      /* sealed miss: the open car shows the places still missing and the crates too many */
      var marks = st.sealed && s === open && st.help >= 1 && st.last && st.last.reason === 'sealedWrong';
      var want = st.sealed ? st.n - st.sealed.k : 0;
      car.slots.forEach(function (sl, i) {
        sl.classList.toggle('is-need', !!(marks && i < want && i >= n));
        sl.classList.toggle('is-extra', !!(marks && i >= want && i < n));
        var lab = chips.slots.length && s === open ? chips.slots[i] : null;
        if (lab != null) { var ch = sl.querySelector('.sw-chip'); ch.textContent = String(lab); ch.classList.add('is-on'); }
      });
    });
    var sealedSide = st.sealed && st.sealed.side;
    this._tarpEl.hidden = !sealedSide || this._tarp;
    if (sealedSide) {
      var b = sealedSide === 'L' ? this._G.carL : this._G.carR;
      this._tarpEl.style.left = (b.x - 3) + 'px'; this._tarpEl.style.top = (b.y - 3) + 'px'; this._tarpEl.style.width = (b.w + 6) + 'px'; this._tarpEl.style.height = (b.h + 6) + 'px';
      this._tarpEl.textContent = String(st.sealed.k);
      this._tarpEl.classList.toggle('is-l', sealedSide === 'L');
    }
    this._coupler.setAttribute('aria-label', t('coupler')); this._coupler.title = t('coupler');
    this._coupler.disabled = st.done || !!st.explore || this._busy || !!this._inflight;
    this._coupler.hidden = !!st.explore;

    /* the bond */
    var dials = SpringSwitchCore.dials(st);
    var pv = st.explore ? { w: st.n, a: st.L || null, b: st.R || null } : st.plate;
    ['w', 'a', 'b'].forEach(function (k) {
      var c = self._circles[k], v = pv[k], isDial = dials.indexOf(k) >= 0;
      c.textContent = v == null ? '' : String(v);
      c.classList.toggle('is-dial', isDial && !st.done);
      c.classList.toggle('is-empty', v == null);
      c.classList.toggle('is-open', self._dial === k);
      c.classList.toggle('is-wrong', !!(st.last && st.help >= 1 && ((st.last.reason === 'wrongL' && k === 'a') || (st.last.reason === 'wrongR' && k === 'b') || (st.last.reason === 'wrongWhole' && k === 'w'))));
      c.disabled = !isDial || st.done || self._busy;
      if (isDial) c.setAttribute('aria-label', t('dial') + (v == null ? '' : ': ' + v)); else c.setAttribute('aria-label', v == null ? '' : String(v));
    });
    /* the equation writes itself only after a way is banked (free play: once the hill is empty) */
    var eqText = '';
    if (st.explore) { if (st.hill === 0 && st.L && st.R) eqText = st.n + ' = ' + st.L + ' + ' + st.R; }
    else if (st.last && st.last.ok) eqText = (st.kind === 'backup' ? (st.a + st.b) : st.n) + ' = ' + st.last.a + ' + ' + st.last.b;
    else if (st.done && st.lastBanked) eqText = st.n + ' = ' + st.lastBanked.a + ' + ' + st.lastBanked.b;
    this._eq.textContent = eqText;
    this._eq.classList.toggle('is-on', !!eqText);

    /* the dial keys */
    if (this._dial && dials.indexOf(this._dial) >= 0 && !st.done) {
      var max = SpringSwitchCore.dialRange(st, this._dial);
      if (this._keys.getAttribute('data-max') !== String(max) || this._keys.getAttribute('data-box') !== this._dial) {
        this._keys.innerHTML = '';
        for (var v = 1; v <= max; v++) (function (val) { var kb = self.api.el('button', 'sw-key'); kb.type = 'button'; kb.textContent = String(val); kb.addEventListener('click', function () { self._setDial(val); }); self._keys.appendChild(kb); }(v));
        this._keys.setAttribute('data-max', String(max)); this._keys.setAttribute('data-box', this._dial);
      }
      this._keys.hidden = false;
      this._keys.classList.toggle('is-l', this._dial === 'a'); this._keys.classList.toggle('is-r', this._dial === 'b');
    } else { this._keys.hidden = true; if (this._dial && (st.done || dials.indexOf(this._dial) < 0)) this._dial = null; }

    /* the route book */
    var rows = SpringSwitchCore.book(st);
    this._book.hidden = !rows || !this._keys.hidden;
    if (rows) {
      var sig = rows.map(function (r) { return r.found ? 1 : 0; }).join('') + '|' + rows.length + '|' + (this._flashRow || '');
      if (this._book.getAttribute('data-sig') !== sig) {
        this._book.setAttribute('data-sig', sig);
        var tot = rows[0].a + rows[0].b, html = '';
        rows.forEach(function (r) {
          var flash = self._flashRow === r.a + '+' + r.b ? ' is-flash' : '';
          html += '<div class="sw-row' + (r.found ? ' is-found' : '') + flash + '"><span class="sw-bar sw-bar-a" style="width:' + (100 * r.a / tot) + '%"></span><span class="sw-bar sw-bar-b" style="width:' + (100 * r.b / tot) + '%"></span></div>';
        });
        this._book.innerHTML = html;
      }
      var f = rows.filter(function (r) { return r.found; }).length;
      this._book.setAttribute('aria-label', interp(t('bookLabel'), { f: f, t: st.level === 'ten' ? rows.length : st.need }));
      this._book.classList.toggle('is-goal', st.kind === 'all' && st.found.length >= st.need);
    }
    this._stepper.hidden = !st.explore;
    this._lessBtn.setAttribute('aria-label', t('loadLess')); this._moreBtn.setAttribute('aria-label', t('loadMore'));
    this._lessBtn.disabled = !st.explore || st.n <= 2 || st.L + st.R > 0 || !!this._inflight;
    this._moreBtn.disabled = !st.explore || st.n >= 10 || st.L + st.R > 0 || !!this._inflight;

    /* the note */
    var h = st.explore ? { key: 'playNote' } : SpringSwitchCore.hint(st);
    var text = h ? interp(t(h.key), h) : '';
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', !!(h && h.wrong));
    this._note.classList.toggle('is-good', !!(h && h.key === 'banked'));

    /* the actions */
    this._turnBtn.hidden = !this._turnOn() || st.kind !== 'all' || !!st.explore;
    this._turnBtn.disabled = !SpringSwitchCore.canMirror(st) || this._busy || !!this._inflight;
    this._turnBtn.setAttribute('aria-label', t('turntable')); this._turnBtn.title = t('turntable');
    this._playBtn.textContent = t(st.explore ? 'playBack' : 'play');
    this._playBtn.disabled = this._busy;
    this._go.textContent = t('check');
    this._go.hidden = !!st.explore;
    this._go.disabled = st.done || this._busy || !!this._inflight;
  },
  _fill: function (car, n, chips, cls) {
    car.slots.forEach(function (sl, i) {
      sl.classList.toggle('is-full', i < n);
      var ch = sl.querySelector('.sw-chip'), lab = chips && chips[i] != null ? chips[i] : '';
      ch.textContent = lab === '' ? '' : String(lab);
      ch.classList.toggle('is-on', lab !== '');
      ch.classList.toggle('is-q', lab === '?');
    });
    car.el.classList.toggle('is-lit', cls === 'is-lit');
  },

  /* ---------------- the hand ---------------- */
  /* hold the lever: one crate now, then one every 450 ms while held; a tap = exactly one */
  _bindLever: function (lever) {
    var self = this;
    lever.addEventListener('pointerdown', function (ev) {
      if (lever.disabled) return;
      ev.preventDefault();
      try { lever.setPointerCapture(ev.pointerId); } catch (e) { /* older browsers */ }
      self._stopHold();
      lever.classList.add('is-down'); lever._pointer = true;
      self._releaseOne();
      self._hold = setInterval(function () { if (!self._releaseOne()) self._stopHold(); }, self.FAST ? 30 : self.STREAM_MS);
    });
    var up = function () { self._stopHold(); };
    lever.addEventListener('pointerup', up); lever.addEventListener('pointercancel', up); lever.addEventListener('lostpointercapture', up);
    lever.addEventListener('click', function (ev) { if (lever._pointer) { lever._pointer = false; return; } self._releaseOne(); });
  },
  _stopHold: function () { if (this._hold) { clearInterval(this._hold); this._hold = null; } if (this._lever) this._lever.classList.remove('is-down'); },
  /* a crate leaves the wagon, rolls to the fork (the switch decides there), then into its car */
  _releaseOne: function () {
    var st = this._cur(), self = this;
    if (!st || st.done || this._busy || st.kind === 'backup') return false;
    if (st.hill - this._inflight <= 0) { bounce(this._wagon.el, 'sw-nope'); return false; }
    this._dial = null; this._lit = null; this._flash = null; this._tarp = false;
    var G = this._G, P = this._paths, c = this._L.c;
    var fromSlot = this._slotXY('wagon', Math.max(0, st.hill - this._inflight - 1));
    this._inflight++;
    if (this.FAST) { this._inflight--; this._cross(st, null); return true; }
    var el = document.createElement('i'); el.className = 'sw-crate sw-flyer'; el.style.width = (c - 6) + 'px'; el.style.height = (c - 6) + 'px';
    el.style.left = (fromSlot.x - (c - 6) / 2) + 'px'; el.style.top = (fromSlot.y - (c - 6) / 2) + 'px';
    this._flyLayer.appendChild(el);
    this._paint();
    this.api.sound(380);
    var dx1 = G.fork.x - fromSlot.x, dy1 = G.fork.y - fromSlot.y;
    var anim = el.animate ? el.animate([{ transform: 'translate(0,0) rotate(0)' }, { transform: 'translate(' + (P.wx - fromSlot.x) + 'px,' + (P.wy - fromSlot.y) + 'px) rotate(90deg)' }, { transform: 'translate(' + dx1 + 'px,' + dy1 + 'px) rotate(200deg)' }], { duration: this.ROLL_MS, easing: 'ease-in', fill: 'forwards' }) : null;
    var arrive = function () { self._inflight--; self._cross(st, el, fromSlot); };
    if (anim) anim.onfinish = arrive; else this._later(arrive, this.ROLL_MS);
    return true;
  },
  _cross: function (st, el, fromSlot) {
    var self = this;
    if (st !== this._cur()) { if (el && el.parentNode) el.parentNode.removeChild(el); return; }
    var side = SpringSwitchCore.release(st);
    if (side !== 'L' && side !== 'R') { if (el && el.parentNode) el.parentNode.removeChild(el); bounce(this._wagon.el, 'sw-nope'); this._paint(); return; }
    var idx = SpringSwitchCore.carCount(st, side) - 1;
    this.api.sound(side === 'L' ? 520 : 600);
    if (!el) { this._paint(); return; }
    var to = this._slotXY(side, idx), G = this._G;
    var a2 = el.animate([{ transform: 'translate(' + (G.fork.x - fromSlot.x) + 'px,' + (G.fork.y - fromSlot.y) + 'px) rotate(200deg)' }, { transform: 'translate(' + (to.x - fromSlot.x) + 'px,' + (to.y - fromSlot.y) + 'px) rotate(360deg)' }], { duration: this.ROLL_MS, easing: 'ease-out', fill: 'forwards' });
    /* the car fills when the crate lands */
    var car = this._cars[side];
    car.slots[idx] && car.slots[idx].classList.add('sw-pending');
    a2.onfinish = function () { if (el.parentNode) el.parentNode.removeChild(el); if (car.slots[idx]) car.slots[idx].classList.remove('sw-pending'); self.api.sound(300); self._paint(); };
    this._paint();
  },
  /* the centre of slot i of the wagon / a car, in yard coordinates (slots fill row by row) */
  _slotXY: function (which, i) {
    var G = this._G, c = this._L.c, b = which === 'wagon' ? G.wagon : which === 'L' ? G.carL : G.carR;
    var col = i % 5, row = Math.floor(i / 5);
    return { x: b.x + 8 + col * c + c / 2, y: b.y + 8 + row * c + c / 2 };
  },
  _flick: function (side) {
    var st = this._cur();
    if (!st || this._busy) return;
    if (!SpringSwitchCore.flick(st, side)) { if (st.sealed) bounce(this._switchBtn, 'sw-nope'); return; }
    this.api.sound(st.sw === 'R' ? 240 : 200);
    this._dial = null;
    bounce(this._switchBtn, 'sw-clack');
    this._paint();
  },
  _backUp: function () {
    var st = this._cur();
    if (!st || this._busy || this._inflight) return;
    if (!SpringSwitchCore.backUp(st)) return;
    this._dial = null; this._lit = null; this._flash = null; this._tarp = false;
    this.api.sound(330);
    bounce(this._wagon.el, 'sw-whoosh');
    this._paint();
  },
  _openDial: function (box) {
    var st = this._cur();
    if (!st || st.done || this._busy || SpringSwitchCore.dials(st).indexOf(box) < 0) return;
    this._dial = this._dial === box ? null : box;
    this._paint();
    var first = this._keys.querySelector('.sw-key'); if (first && this._dial) first.focus({ preventScroll: true });
  },
  _setDial: function (v) {
    var st = this._cur();
    if (!st || !this._dial) return;
    if (SpringSwitchCore.setPlate(st, this._dial, v)) { this.api.sound(480); this._lit = null; this._flash = null; }
    var box = this._dial; this._dial = null;
    this._paint();
    if (this._circles[box]) this._circles[box].focus({ preventScroll: true });
  },
  _turn: function () {
    var st = this._cur();
    if (!st || this._busy || this._inflight || !this._turnOn()) return;
    if (!SpringSwitchCore.mirror(st)) return;
    this.api.sound(420);
    bounce(this._cars.L.el, 'sw-spin'); bounce(this._cars.R.el, 'sw-spin');
    this._paint();
  },

  /* the coupler (= Check) */
  _couple: function () {
    var st = this.st, self = this;
    if (!st || this._busy || this._inflight || this._playing || st.done) return;
    this._dial = null; this._flash = null; this._lit = null; this._tarp = false; this._flashRow = null;
    var res = SpringSwitchCore.couple(st);
    if (!res) return;
    this.api.track('couple', { id: st.id, ok: res.ok, reason: res.reason, misses: st.misses });
    if (res.ok) {
      this.api.sound(560); this._later(function () { self.api.sound(760); }, 160);
      this._flashRow = res.a + '+' + res.b;
      bounce(this._cars.L.el, 'sw-clank'); bounce(this._cars.R.el, 'sw-clank');
      bounce(this._train, 'sw-hitch'); bounce(this._puff, 'sw-puffing');
      this._paint();
      if (res.complete) {
        this._busy = true; this._paint();
        this._later(function () { self._busy = false; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled && self.st.done) chk.click(); }, this._ms(this.CHECK_MS));
      }
      return;
    }
    if (res.reason === 'repeat') { this._flashRow = res.key; this.api.sound(300); this._paint(); return; }
    if (!res.miss) {
      this.api.sound(300);
      if (res.reason === 'empty') bounce(st.kind === 'sealed' ? this._lever : this._lever, 'sw-nope');
      if (res.reason === 'oneEmpty') bounce(this._cars[res.side].el, 'sw-nope');
      if (res.reason === 'unset') SpringSwitchCore.dials(st).forEach(function (k) { bounce(self._circles[k], 'sw-pulse'); });
      if (res.reason === 'backFirst') bounce(this._backBtn, 'sw-pulse');
      this._paint();
      return;
    }
    this.api.sound(280);
    if (res.reason === 'wrongL' || res.reason === 'wrongR') { this._lit = res.side; this._flash = res.side; }
    if (res.reason === 'wrongWhole') this._lit = 'hill';
    if (res.reason === 'sealedWrong') { this._tarp = true; this._later(function () { self._tarp = false; self._paint(); }, this._ms(1500)); }
    this._paint();
  },

  /* ---------------- free play ---------------- */
  _togglePlay: function () {
    if (this._busy || this._inflight) return;
    this._dial = null; this._lit = null; this._flash = null; this._tarp = false;
    if (this._playing) { this._playing = false; this._paint(); return; }
    this._playing = true; this._play = SpringSwitchCore.newPlay(5);
    this._paint();
  },
  _load: function (d) { var st = this._play; if (!this._playing || !st || this._inflight) return; if (st.L + st.R) return; SpringSwitchCore.setLoad(st, st.n + d); this.api.sound(440); this._paint(); }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args && args[k] != null) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var swCssDone = false;
function injectSpringSwitchCSS() {
  if (swCssDone || typeof document === 'undefined') return;
  swCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.sw-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:12px;--sw-c:32px;--sw-col:196px;--sw-whole:64px;--sw-part:56px;--sw-key:52px;--sw-ink:#2B3A36;--sw-l:#F2784B;--sw-r:#2E9C88;}'
  + '.sw-body{display:flex;flex-direction:column;align-items:center;gap:10px;}'
  + '.sw-wrap.is-wide .sw-body{flex-direction:row;align-items:flex-start;justify-content:center;gap:12px;}'
  /* the yard */
  + '.sw-yard{position:relative;flex:none;border-radius:16px;background:linear-gradient(180deg,#E8F3F8 0%,#EEF6EA 55%,#E3EED8 100%);box-shadow:inset 0 0 0 2px #D6E6DD;overflow:hidden;}'
  + '.sw-rails{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}'
  + '.sw-hill{fill:#D4E5C2;}'
  + '.sw-rail{fill:none;stroke:#7A6A58;stroke-width:6;stroke-linecap:round;stroke-dasharray:2 0;}'
  + '.sw-rail-l,.sw-rail-r{stroke:#B7AB9C;}'
  + '.sw-rails:not(.is-r) .sw-rail-l,.sw-rails.is-r .sw-rail-r{stroke:#7A6A58;}'
  + '.sw-blade{stroke:#4D4237;stroke-width:8;stroke-linecap:round;opacity:.15;transition:opacity .16s;}'
  + '.sw-rails:not(.is-r) .sw-blade-l,.sw-rails.is-r .sw-blade-r{opacity:1;}'
  + '.sw-rails.is-locked .sw-blade{opacity:.15;}'
  + '.sw-forkdot{fill:#4D4237;}'
  + '.sw-train{position:absolute;object-fit:contain;pointer-events:none;transform:scaleX(-1);} .sw-train[hidden]{display:none;}'
  + '.sw-train.sw-hitch{animation:sw-hitchk .7s var(--lcs-ease) 1;} @keyframes sw-hitchk{0%,100%{transform:scaleX(-1) translateX(0);}40%{transform:scaleX(-1) translateX(-14px);}}'
  + '.sw-puff{position:absolute;width:40px;height:30px;pointer-events:none;} .sw-puff i{position:absolute;width:14px;height:14px;border-radius:50%;background:#C9CED0;opacity:0;}'
  + '.sw-puff i:nth-child(1){left:0;top:12px;} .sw-puff i:nth-child(2){left:12px;top:4px;} .sw-puff i:nth-child(3){left:24px;top:0;}'
  + '.sw-puff.sw-puffing i{animation:sw-puffk .9s ease-out both;} .sw-puff.sw-puffing i:nth-child(2){animation-delay:.12s;} .sw-puff.sw-puffing i:nth-child(3){animation-delay:.24s;}'
  + '@keyframes sw-puffk{0%{opacity:0;transform:scale(.4);}30%{opacity:.9;}100%{opacity:0;transform:scale(1.6) translateY(-14px);}}'
  /* a flatbed: 2 × 5 slots of crates */
  + '.sw-wagon,.sw-car{position:absolute;box-sizing:border-box;padding:8px;border-radius:10px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #B79A72,0 3px 0 #8C7458;}'
  + '.sw-car-l{box-shadow:inset 0 0 0 3px var(--sw-l),0 3px 0 #C95A31;} .sw-car-r{box-shadow:inset 0 0 0 3px var(--sw-r),0 3px 0 #1F7A69;}'
  + '.sw-slots{display:grid;grid-template-columns:repeat(5,var(--sw-c));grid-template-rows:repeat(2,var(--sw-c));}'
  + '.sw-slot{position:relative;display:grid;place-items:center;box-shadow:inset 0 0 0 1px rgba(140,116,88,.25);}'
  + '.sw-crate{display:block;width:calc(var(--sw-c) - 6px);height:calc(var(--sw-c) - 6px);border-radius:4px;background:linear-gradient(45deg,transparent 46%,#8A5A2B 46% 54%,transparent 54%),linear-gradient(-45deg,transparent 46%,#8A5A2B 46% 54%,transparent 54%),#C98A4B;box-shadow:inset 0 0 0 2px #8A5A2B;}'
  + '.sw-slot .sw-crate{opacity:0;transform:scale(.6);transition:opacity .12s,transform .12s;} .sw-slot.is-full .sw-crate{opacity:1;transform:none;} .sw-slot.sw-pending .sw-crate{opacity:0;}'
  + '.sw-flyer{position:absolute;z-index:5;pointer-events:none;}'
  + '.sw-fly{position:absolute;inset:0;pointer-events:none;}'
  + '.sw-slot.is-need{box-shadow:inset 0 0 0 2px var(--lcs-structure);background:repeating-linear-gradient(45deg,#fff 0 4px,#E3F1EC 4px 8px);}'
  + '.sw-slot.is-extra .sw-crate{box-shadow:inset 0 0 0 2px #8A5A2B,0 0 0 3px #F2784B;}'
  + '.sw-chip{position:absolute;inset:auto;min-width:18px;height:18px;padding:0 3px;border-radius:9px;background:rgba(255,255,255,.95);color:var(--sw-ink);font:800 12px/18px var(--lcs-font-display);text-align:center;box-shadow:0 1px 2px rgba(0,0,0,.3);pointer-events:none;}'
  + '.sw-chip:not(.is-on){display:none;} .sw-chip.is-q{background:var(--lcs-structure);color:#fff;}'
  + '.sw-car.is-lit .sw-slot.is-full .sw-crate,.sw-wagon.is-lit .sw-slot.is-full .sw-crate{animation:sw-litk .9s ease-in-out 2;} @keyframes sw-litk{50%{filter:brightness(1.25);box-shadow:inset 0 0 0 2px #8A5A2B,0 0 0 3px #F2C14E;}}'
  + '.sw-car.is-flash{animation:sw-flashk .4s ease-in-out 3;} @keyframes sw-flashk{50%{filter:drop-shadow(0 0 6px #F2C14E);}}'
  + '.sw-wheels{position:absolute;left:12%;right:12%;bottom:-11px;display:flex;justify-content:space-between;} .sw-wheels i{width:14px;height:14px;border-radius:50%;background:#4D4237;box-shadow:inset 0 0 0 3px #7A6A58;}'
  + '.sw-wnum{position:absolute;z-index:2;min-width:32px;height:32px;padding:0 4px;box-sizing:border-box;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 3px #B79A72;text-align:center;font:800 20px/32px var(--lcs-font-display);color:#7A5A3A;pointer-events:none;} .sw-wnum[hidden]{display:none;}'
  + '.sw-tarp{position:absolute;z-index:3;display:grid;place-items:center;box-sizing:border-box;border-radius:10px;background:repeating-linear-gradient(135deg,#5E7F6E 0 10px,#567565 10px 20px);color:#fff;font:800 40px/1 var(--lcs-font-display);text-shadow:0 2px 0 rgba(0,0,0,.25);box-shadow:0 3px 0 #3F5A4D;} .sw-tarp[hidden]{display:none;}'
  + '.sw-wrap.is-narrow .sw-tarp{font-size:32px;}'
  /* the levers, the switch, the coupler, the back-up chip */
  + '.sw-lever,.sw-switch,.sw-coupler,.sw-back{position:absolute;padding:0;border:0;background:none;cursor:pointer;touch-action:none;}'
  + '.sw-lever:disabled,.sw-switch:disabled,.sw-coupler:disabled,.sw-back:disabled{cursor:default;}'
  + '.sw-lever-post{position:absolute;left:50%;bottom:4px;width:30%;height:22%;transform:translateX(-50%);border-radius:6px;background:#7A6A58;}'
  + '.sw-lever-arm{position:absolute;left:50%;bottom:18%;width:12%;height:62%;transform-origin:50% 100%;transform:translateX(-50%) rotate(-24deg);border-radius:6px;background:#9AA5A1;transition:transform .12s var(--lcs-ease);}'
  + '.sw-lever-knob{position:absolute;left:50%;top:-30%;width:400%;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle at 35% 30%,#F79A73,var(--lcs-accent) 60%,#C95A31);box-shadow:0 2px 0 #9C3F1C;}'
  + '.sw-lever.is-down .sw-lever-arm{transform:translateX(-50%) rotate(28deg);}'
  + '.sw-lever.is-awake .sw-lever-arm{animation:sw-bob 1.4s ease-in-out infinite;} @keyframes sw-bob{0%,100%{transform:translateX(-50%) rotate(-24deg);}50%{transform:translateX(-50%) rotate(-10deg);}}'
  + '.sw-lever:disabled .sw-lever-knob{filter:grayscale(.8);opacity:.6;}'
  + '.sw-switch-base{position:absolute;left:50%;bottom:4px;width:44%;height:16%;transform:translateX(-50%);border-radius:5px;background:#4D4237;}'
  + '.sw-switch-arm{position:absolute;left:50%;bottom:14%;width:12%;height:60%;transform-origin:50% 100%;transform:translateX(-50%) rotate(-32deg);border-radius:5px;background:#7A6A58;transition:transform .16s var(--lcs-ease);}'
  + '.sw-switch.is-r .sw-switch-arm{transform:translateX(-50%) rotate(32deg);}'
  + '.sw-switch-knob{position:absolute;left:50%;top:-30%;width:380%;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFE08A,#F2C14E 60%,#C99A2A);box-shadow:0 2px 0 #8C6A12;}'
  + '.sw-switch:disabled .sw-switch-knob{filter:grayscale(.7);opacity:.55;}'
  + '.sw-switch.sw-clack{animation:sw-clackk .2s ease-out 1;} @keyframes sw-clackk{50%{transform:translateY(2px);}}'
  + '.sw-coupler-hook{position:absolute;left:0;right:0;top:50%;height:10px;margin-top:-5px;border-radius:5px;background:#4D4237;}'
  + '.sw-coupler-handle{position:absolute;left:50%;top:6px;width:30px;height:46px;margin-left:-15px;border-radius:10px 10px 14px 14px;background:linear-gradient(180deg,#9AA5A1,#6E7A76);box-shadow:inset 0 -4px 0 rgba(0,0,0,.2),0 0 0 3px #fff;transition:transform .15s;}'
  + '.sw-coupler:not(:disabled):hover .sw-coupler-handle{transform:translateY(6px);} .sw-coupler:disabled .sw-coupler-handle{opacity:.5;}'
  + '.sw-coupler[hidden]{display:none;}'
  + '.sw-back{display:grid;place-items:center;border-radius:12px;background:#fff;color:var(--lcs-structure);box-shadow:inset 0 0 0 2px var(--lcs-structure-soft,#CFE3DD);} .sw-back:disabled{opacity:.4;}'
  + '.sw-back.is-awake{box-shadow:inset 0 0 0 3px var(--lcs-accent);animation:sw-pulsek 1.2s ease-in-out infinite;}'
  + '.sw-lever:focus-visible,.sw-switch:focus-visible,.sw-coupler:focus-visible,.sw-back:focus-visible,.sw-circle:focus-visible,.sw-key:focus-visible,.sw-go:focus-visible,.sw-turn:focus-visible,.sw-step:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;border-radius:12px;}'
  /* the plate column */
  + '.sw-col{display:flex;flex-direction:column;align-items:center;gap:10px;}'
  + '.sw-wrap.is-wide .sw-col{width:var(--sw-col);flex:none;}'
  + '.sw-wrap.is-narrow .sw-col{flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:flex-start;width:100%;}'
  + '.sw-bond{position:relative;width:176px;height:calc(var(--sw-whole) + var(--sw-part) + 30px);flex:none;}'
  + '.sw-bond-lines{position:absolute;inset:0;width:100%;height:100%;} .sw-bond-lines path{stroke:#9AA8A3;stroke-width:2.2;fill:none;vector-effect:non-scaling-stroke;}'
  + '.sw-circle{position:absolute;display:grid;place-items:center;padding:0;border:0;border-radius:50%;background:#fff;color:var(--sw-ink);font:800 26px/1 var(--lcs-font-display);box-shadow:inset 0 0 0 3px #9AA8A3;}'
  + '.sw-circle-w{left:50%;top:0;width:var(--sw-whole);height:var(--sw-whole);margin-left:calc(var(--sw-whole) / -2);font-size:30px;}'
  + '.sw-circle-a,.sw-circle-b{bottom:0;width:var(--sw-part);height:var(--sw-part);}'
  + '.sw-circle-a{left:4px;box-shadow:inset 0 0 0 3px var(--sw-l);} .sw-circle-b{right:4px;box-shadow:inset 0 0 0 3px var(--sw-r);}'
  + '.sw-circle.is-dial{cursor:pointer;background:#fff;} .sw-circle.is-dial.is-empty{background:repeating-linear-gradient(45deg,#fff 0 5px,#F1F5F3 5px 10px);}'
  + '.sw-circle.is-dial:not(:disabled):hover{filter:brightness(.97);} .sw-circle.is-open{box-shadow:inset 0 0 0 4px var(--lcs-structure),0 0 0 4px rgba(20,107,94,.18);}'
  + '.sw-circle.is-wrong{color:#9C3F1C;animation:sw-wrongk .4s ease-in-out 3;} @keyframes sw-wrongk{50%{box-shadow:inset 0 0 0 4px #E5784B;}}'
  + '.sw-circle:disabled{cursor:default;}'
  + '.sw-eq{min-height:34px;font:800 26px/34px var(--lcs-font-display);color:var(--sw-ink);text-align:center;}'
  + '.sw-eq:not(.is-on){visibility:hidden;}'
  + '.sw-wrap.is-narrow .sw-eq{order:3;width:100%;min-height:30px;line-height:30px;font-size:22px;}'
  + '.sw-keys{display:grid;grid-template-columns:repeat(5,var(--sw-key));gap:5px;} .sw-keys[hidden]{display:none;}'
  + '.sw-wrap.is-wide .sw-keys,.sw-wrap.is-narrow .sw-keys{grid-template-columns:repeat(3,var(--sw-key));}'
  + '.sw-key{height:var(--sw-key);padding:0;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;font:800 22px/1 var(--lcs-font-display);color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;}'
  + '.sw-keys.is-l .sw-key{border-color:#F4B79C;color:#C9542A;} .sw-keys.is-r .sw-key{border-color:#9ED0C4;color:#1F7A69;}'
  + '.sw-book{display:flex;flex-direction:column;gap:4px;width:176px;} .sw-book[hidden]{display:none;}'
  + '.sw-row{display:flex;height:16px;border-radius:5px;overflow:hidden;box-shadow:inset 0 0 0 2px #D5DED9;background:repeating-linear-gradient(90deg,transparent 0 6px,rgba(213,222,217,.6) 6px 9px);}'
  + '.sw-bar{display:block;height:100%;opacity:0;transition:opacity .25s;} .sw-bar-a{background:var(--sw-l);} .sw-bar-b{background:var(--sw-r);}'
  + '.sw-row.is-found{background:none;box-shadow:none;} .sw-row.is-found .sw-bar{opacity:1;}'
  + '.sw-row.is-flash{animation:sw-rowk .45s ease-in-out 3;} @keyframes sw-rowk{50%{transform:scale(1.06);box-shadow:0 0 0 3px #F2C14E;}}'
  + '.sw-book.is-goal .sw-row.is-found{box-shadow:0 0 0 2px #F2C14E;}'
  + '.sw-wrap.is-narrow .sw-book{width:132px;gap:3px;} .sw-wrap.is-narrow .sw-row{height:12px;}'
  + '.sw-stepper{display:flex;gap:10px;} .sw-stepper[hidden]{display:none;}'
  + '.sw-step{width:48px;height:48px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 26px/1 var(--lcs-font-display);cursor:pointer;} .sw-step:disabled{opacity:.4;cursor:default;}'
  /* the note and the actions */
  + '.sw-note{box-sizing:border-box;align-self:center;width:100%;max-width:560px;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--sw-ink);text-align:center;} .sw-note[hidden]{display:none;}'
  + '.sw-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;} .sw-note.is-good{border-color:#C9A24A;background:#FFF6DA;font-family:var(--lcs-font-display);font-size:24px;font-weight:800;}'
  + '.sw-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;}'
  + '.sw-turn{width:56px;height:56px;border-radius:50%;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);display:grid;place-items:center;cursor:pointer;padding:0;} .sw-turn[hidden]{display:none;} .sw-turn:disabled{opacity:.35;cursor:default;}'
  + '.sw-tool{min-height:48px;padding:0 14px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 15px/1 var(--lcs-font-body);cursor:pointer;} .sw-tool:disabled{opacity:.45;cursor:default;}'
  + '.sw-go{min-width:130px;height:56px;padding:0 22px;border-radius:14px;border:0;background:var(--lcs-accent);color:#fff;font:800 20px/1 var(--lcs-font-display);cursor:pointer;touch-action:manipulation;box-shadow:0 4px 0 #C95A31;} .sw-go[hidden]{display:none;} .sw-go:disabled{opacity:.5;cursor:default;}'
  /* motion */
  + '.sw-nope{animation:sw-wob .3s var(--lcs-ease) 1;} @keyframes sw-wob{0%,100%{translate:0 0;}25%{translate:-5px 0;}75%{translate:5px 0;}}'
  + '.sw-pulse{animation:sw-pulsek .5s var(--lcs-ease) 2;} @keyframes sw-pulsek{50%{scale:1.08;}}'
  + '.sw-clank{animation:sw-clankk .3s ease-out 1;} @keyframes sw-clankk{40%{translate:0 -4px;}}'
  + '.sw-spin{animation:sw-spink .6s var(--lcs-ease) 1;} @keyframes sw-spink{50%{scale:.85 1;}}'
  + '.sw-whoosh{animation:sw-whooshk .5s ease-out 1;} @keyframes sw-whooshk{40%{translate:0 -6px;}}'
  /* narrow */
  + '.sw-wrap.is-narrow.is-tiny .sw-actions{gap:8px;} .sw-wrap.is-narrow.is-tiny .sw-go{min-width:96px;padding:0 14px;} .sw-wrap.is-narrow.is-tiny .sw-tool{padding:0 9px;font-size:13px;} .sw-wrap.is-narrow.is-tiny .sw-turn{width:46px;height:46px;}'
  + '.sw-wrap.is-narrow.is-tiny .sw-bond{width:132px;} .sw-wrap.is-narrow.is-tiny .sw-col{gap:8px;} .sw-wrap.is-narrow.is-tiny .sw-book{width:128px;}'
  + '.sw-wrap.is-narrow{gap:8px;} .sw-wrap.is-narrow .sw-note{font-size:15px;padding:7px 10px;} .sw-wrap.is-narrow .sw-bond{width:150px;}'
  + '.sw-wrap.is-narrow .sw-go{height:50px;min-width:110px;font-size:18px;} .sw-wrap.is-narrow .sw-turn{width:50px;height:50px;} .sw-wrap.is-narrow .sw-tool{min-height:46px;font-size:14px;}'
  + '.sw-wrap.is-narrow .sw-circle{font-size:22px;} .sw-wrap.is-narrow .sw-circle-w{font-size:26px;}'
  + '@media (prefers-reduced-motion:reduce){.sw-flyer{display:none;} .sw-slot .sw-crate,.sw-lever-arm,.sw-switch-arm,.sw-train,.sw-puff i,.sw-row,.sw-car,.sw-wagon{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'sw-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = SpringSwitchActivity;
if (typeof window !== 'undefined') window.SpringSwitchActivity = SpringSwitchActivity;
