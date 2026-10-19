/* =====================================================================
   snake-lunch-activity.js — ACTIVITY #26 of the one-by-one rebuild:
   "Clunk's Lost Lunch" (K.OA.A.3) — THE SNAKE-GROOVE LUNCHBOX.
   Design sheet: docs/activities-rebuild/designs/026-clunks-lost-lunch.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: Clunk's lunchbox has a snake-shaped groove of exactly his
   number of cups. Snacks hang on a wall as STRANDS of identical library
   treats (one treat, a numeral tag and k pips); a strand dropped in the box
   uncoils and snakes into the next k cups round the hairpin. The lid only
   shuts when the groove is exactly full — empty dimples leave a gap, a tail
   over the rim makes it bonk. The feed lever is padlocked until the lid
   shuts; Clunk (the library toy robot) eats, and his lunch log prints the
   equation biggest part first, so 6 + 4 and 4 + 6 are one lunch. "Snack bar"
   is free play.

   ACTIVITY LAYER ONLY: the model is snake-lunch-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by the lever when the round is
   complete). Test seams: window.SnakeLunchActivity.st / ._order / ._pool /
   .FAST (no snaking, for the gates).
   ===================================================================== */
'use strict';

var SnakeLunchActivity = {
  id: 'snake-lunch',
  apparatusClasses: ['sl-'],

  strings: {
    title:        {en:'Clunk’s Lost Lunch',de:'Clunks verlorenes Pausenbrot',fr:'Le goûter perdu de Clunk',it:'Il pranzo perduto di Clunk',es:'La lonchera perdida de Clunk',pt:'O lanche perdido do Clunk',nl:'Clunks verloren lunch',sv:'Clunks borttappade matlåda',da:'Clunks forsvundne madpakke',no:'Clunks forsvunne matpakke',fi:'Clunkin kadonneet eväät'},
    instruction:  {en:'Clunk’s lunchbox must be exactly full — not one cup empty, nothing over the edge. Then pull the lever to feed him.',de:'Clunks Brotdose muss genau voll sein – keine Mulde leer, nichts über dem Rand. Dann zieh den Hebel und füttere ihn.',fr:'La boîte de Clunk doit être pleine pile\u202f: aucun creux vide, rien qui dépasse. Puis tire le levier pour le nourrir.',it:'Il cestino di Clunk deve essere pieno esattamente: nessuna buca vuota, niente fuori dal bordo. Poi tira la leva per dargli da mangiare.',es:'La lonchera de Clunk debe quedar exactamente llena: ningún hueco vacío, nada colgando. Luego jala la palanca para darle de comer.',pt:'A lancheira do Clunk precisa ficar exatamente cheia: nenhum buraquinho vazio, nada para fora. Depois puxe a alavanca para alimentá-lo.',nl:'Clunks lunchbox moet precies vol zijn: geen kuiltje leeg, niets over de rand. Trek dan aan de hendel om hem te voeren.',sv:'Clunks matlåda ska vara precis full – ingen grop tom, inget över kanten. Dra sedan i spaken och mata honom.',da:'Clunks madkasse skal være præcis fuld – ingen tom fordybning, intet ud over kanten. Træk så i håndtaget, og fodr ham.',no:'Clunks matboks må være helt full – ingen tom grop, ingenting over kanten. Dra så i spaken og mat ham.',fi:'Clunkin eväsrasian pitää olla täsmälleen täynnä – ei yhtään tyhjää kuoppaa, ei mitään reunan yli. Vedä sitten vivusta ja syötä hänet.'},
    promptAny:    {en:'Fill Clunk’s lunchbox: {n} cups.',de:'Füll Clunks Brotdose: {n} Mulden.',fr:'Remplis la boîte de Clunk : {n} creux.',it:'Riempi il cestino di Clunk: {n} buche.',es:'Llena la lonchera de Clunk: {n} huecos.',pt:'Encha a lancheira do Clunk: {n} buraquinhos.',nl:'Vul Clunks lunchbox: {n} kuiltjes.',sv:'Fyll Clunks matlåda: {n} gropar.',da:'Fyld Clunks madkasse: {n} fordybninger.',no:'Fyll Clunks matboks: {n} groper.',fi:'Täytä Clunkin eväsrasia: {n} kuoppaa.'},
    promptAgain:  {en:'Yum! Now pack {n} a whole new way.',de:'Lecker! Jetzt pack {n} auf eine ganz neue Art.',fr:'Miam\u202f! Maintenant, fais {n} d’une toute nouvelle façon.',it:'Gnam! Ora prepara {n} in un modo tutto nuovo.',es:'¡Qué rico! Ahora llena {n} de una forma nueva.',pt:'Hum! Agora monte {n} de um jeito novo.',nl:'Mmm! Pak nu {n} op een heel nieuwe manier in.',sv:'Mums! Packa nu {n} på ett helt nytt sätt.',da:'Mums! Pak nu {n} på en helt ny måde.',no:'Nam! Pakk nå {n} på en helt ny måte.',fi:'Nam! Pakkaa nyt {n} aivan uudella tavalla.'},
    promptTwo:    {en:'Pack {n} two different ways.',de:'Pack {n} auf zwei verschiedene Arten.',fr:'Fais {n} de deux façons différentes.',it:'Prepara {n} in due modi diversi.',es:'Llena {n} de dos formas distintas.',pt:'Monte {n} de dois jeitos diferentes.',nl:'Pak {n} op twee verschillende manieren in.',sv:'Packa {n} på två olika sätt.',da:'Pak {n} på to forskellige måder.',no:'Pakk {n} på to forskjellige måter.',fi:'Pakkaa {n} kahdella eri tavalla.'},
    promptHalf:   {en:'{g} cups are full. Add one snack to fill the box.',de:'{g} sind schon drin. Leg einen Snack dazu, damit die Dose voll ist.',fr:'{g} sont déjà rangés. Ajoute un goûter pour remplir la boîte.',it:'{g} sono già dentro. Aggiungi un bocconcino per riempire il cestino.',es:'Ya hay {g} adentro. Agrega una botana para llenar la lonchera.',pt:'Já tem {g} dentro. Coloque um petisco para encher a lancheira.',nl:'Er zitten er al {g} in. Doe er één hapje bij om de box te vullen.',sv:'{g} är redan packade. Lägg i ett mellanmål så att lådan blir full.',da:'{g} er allerede pakket. Læg én snack i, så kassen bliver fuld.',no:'{g} er allerede pakket. Legg i én matbit så boksen blir full.',fi:'{g} on jo pakattu. Lisää yksi välipala, niin rasia täyttyy.'},
    promptFinish: {en:'{g} cups are full. Fill the box with exactly two snacks.',de:'{g} sind schon drin. Füll die Dose mit genau zwei Snacks.',fr:'{g} sont déjà rangés. Remplis la boîte avec exactement deux goûters.',it:'{g} sono già dentro. Riempi il cestino con esattamente due bocconcini.',es:'Ya hay {g} adentro. Llena la lonchera con exactamente dos botanas.',pt:'Já tem {g} dentro. Encha a lancheira com exatamente dois petiscos.',nl:'Er zitten er al {g} in. Vul de box met precies twee hapjes.',sv:'{g} är redan packade. Fyll lådan med exakt två mellanmål.',da:'{g} er allerede pakket. Fyld kassen med præcis to snacks.',no:'{g} er allerede pakket. Fyll boksen med nøyaktig to matbiter.',fi:'{g} on jo pakattu. Täytä rasia täsmälleen kahdella välipalalla.'},
    promptExact:  {en:'Fill {n} cups with exactly {k} snacks.',de:'Füll {n} Mulden mit genau {k} Snacks.',fr:'Remplis {n} creux avec exactement {k} goûters.',it:'Riempi {n} buche con esattamente {k} bocconcini.',es:'Llena {n} huecos con exactamente {k} botanas.',pt:'Encha {n} buraquinhos com exatamente {k} petiscos.',nl:'Vul {n} kuiltjes met precies {k} hapjes.',sv:'Fyll {n} gropar med exakt {k} mellanmål.',da:'Fyld {n} fordybninger med præcis {k} snacks.',no:'Fyll {n} groper med nøyaktig {k} matbiter.',fi:'Täytä {n} kuoppaa täsmälleen {k} välipalalla.'},
    promptOnly:   {en:'Only these snacks today! Fill {n} cups.',de:'Heute gibt es nur diese Snacks! Füll {n} Mulden.',fr:'Seulement ces goûters aujourd’hui ! Remplis {n} creux.',it:'Oggi solo questi bocconcini! Riempi {n} buche.',es:'¡Hoy solo hay estas botanas! Llena {n} huecos.',pt:'Hoje só tem estes petiscos! Encha {n} buraquinhos.',nl:'Vandaag alleen deze hapjes! Vul {n} kuiltjes.',sv:'Bara de här mellanmålen i dag! Fyll {n} gropar.',da:'Kun de her snacks i dag! Fyld {n} fordybninger.',no:'Bare disse matbitene i dag! Fyll {n} groper.',fi:'Tänään vain nämä välipalat! Täytä {n} kuoppaa.'},
    promptTooFull:{en:'Too full! Take snacks out until the lid shuts.',de:'Zu voll! Nimm Snacks heraus, bis der Deckel zugeht.',fr:'Trop plein ! Enlève des goûters jusqu’à ce que le couvercle se ferme.',it:'Troppo pieno! Togli bocconcini finché il coperchio si chiude.',es:'¡Demasiado llena! Saca botanas hasta que la tapa se cierre.',pt:'Cheia demais! Tire petiscos até a tampa fechar.',nl:'Te vol! Haal hapjes eruit tot het deksel dichtgaat.',sv:'För fullt! Ta ur mellanmål tills locket går igen.',da:'For fuld! Tag snacks ud, til låget lukker.',no:'For fullt! Ta ut matbiter til lokket går igjen.',fi:'Liian täynnä! Ota välipaloja pois, kunnes kansi menee kiinni.'},
    promptWhat:   {en:'What did Clunk eat? Set his number.',de:'Was hat Clunk gegessen? Stell seine Zahl ein.',fr:'Qu’a mangé Clunk ? Règle son nombre.',it:'Che cosa ha mangiato Clunk? Imposta il suo numero.',es:'¿Qué comió Clunk? Pon su número.',pt:'O que o Clunk comeu? Coloque o número dele.',nl:'Wat heeft Clunk gegeten? Zet zijn getal goed.',sv:'Vad åt Clunk? Ställ in hans tal.',da:'Hvad spiste Clunk? Indstil hans tal.',no:'Hva spiste Clunk? Still inn tallet hans.',fi:'Mitä Clunk söi? Aseta hänen lukunsa.'},
    hintStart:    {en:'Drag a snack into the lunchbox.',de:'Zieh einen Snack in die Brotdose.',fr:'Fais glisser un goûter dans la boîte.',it:'Trascina un bocconcino nel cestino.',es:'Arrastra una botana a la lonchera.',pt:'Arraste um petisco para a lancheira.',nl:'Sleep een hapje in de lunchbox.',sv:'Dra ett mellanmål till matlådan.',da:'Træk en snack ned i madkassen.',no:'Dra en matbit ned i matboksen.',fi:'Vedä välipala eväsrasiaan.'},
    hintGap:      {en:'Some cups are still empty.',de:'Ein paar Mulden sind noch leer.',fr:'Des creux sont encore vides.',it:'Alcune buche sono ancora vuote.',es:'Todavía hay huecos vacíos.',pt:'Ainda tem buraquinhos vazios.',nl:'Er zijn nog lege kuiltjes.',sv:'Några gropar är fortfarande tomma.',da:'Nogle fordybninger er stadig tomme.',no:'Noen groper er fortsatt tomme.',fi:'Osa kuopista on vielä tyhjiä.'},
    hintBonk:     {en:'Too much! A snack is hanging over the edge.',de:'Zu viel! Ein Snack hängt über den Rand.',fr:'Trop ! Un goûter dépasse du bord.',it:'Troppo! Un bocconcino pende fuori dal bordo.',es:'¡Demasiado! Una botana cuelga por la orilla.',pt:'Demais! Um petisco está pendurado para fora.',nl:'Te veel! Er hangt een hapje over de rand.',sv:'För mycket! Ett mellanmål hänger över kanten.',da:'For meget! En snack hænger ud over kanten.',no:'For mye! En matbit henger over kanten.',fi:'Liikaa! Välipala roikkuu reunan yli.'},
    hintCountOn:  {en:'Count on to {n}.',de:'Zähl weiter bis {n}.',fr:'Continue à compter jusqu’à {n}.',it:'Continua a contare fino a {n}.',es:'Sigue contando hasta {n}.',pt:'Continue contando até {n}.',nl:'Tel verder tot {n}.',sv:'Räkna vidare till {n}.',da:'Tæl videre til {n}.',no:'Tell videre til {n}.',fi:'Jatka laskemista lukuun {n}.'},
    hintExactly:  {en:'Clunk wants exactly {k} snacks.',de:'Clunk will genau {k} Snacks.',fr:'Clunk veut exactement {k} goûters.',it:'Clunk vuole esattamente {k} bocconcini.',es:'Clunk quiere exactamente {k} botanas.',pt:'O Clunk quer exatamente {k} petiscos.',nl:'Clunk wil precies {k} hapjes.',sv:'Clunk vill ha exakt {k} mellanmål.',da:'Clunk vil have præcis {k} snacks.',no:'Clunk vil ha nøyaktig {k} matbiter.',fi:'Clunk haluaa täsmälleen {k} välipalaa.'},
    hintTwoMore:  {en:'Add exactly two snacks.',de:'Leg genau zwei Snacks dazu.',fr:'Ajoute exactement deux goûters.',it:'Aggiungi esattamente due bocconcini.',es:'Agrega exactamente dos botanas.',pt:'Coloque exatamente dois petiscos.',nl:'Doe er precies twee hapjes bij.',sv:'Lägg i exakt två mellanmål.',da:'Læg præcis to snacks i.',no:'Legg i nøyaktig to matbiter.',fi:'Lisää täsmälleen kaksi välipalaa.'},
    hintOne:      {en:'Add just one snack.',de:'Leg nur einen Snack dazu.',fr:'Ajoute un seul goûter.',it:'Aggiungi un solo bocconcino.',es:'Agrega solo una botana.',pt:'Coloque só um petisco.',nl:'Doe er maar één hapje bij.',sv:'Lägg bara i ett mellanmål.',da:'Læg kun én snack i.',no:'Legg bare i én matbit.',fi:'Lisää vain yksi välipala.'},
    hintRepeat:   {en:'Clunk ate that lunch already. Pack a new way!',de:'Diese Mahlzeit hatte Clunk schon. Pack die Zahl auf eine neue Art!',fr:'Clunk a déjà mangé ce repas. Remplis la boîte autrement !',it:'Clunk ha già mangiato questo pranzo. Preparane uno nuovo!',es:'Clunk ya comió eso. ¡Llénala de otra forma!',pt:'O Clunk já comeu esse lanche. Monte de um jeito novo!',nl:'Die lunch heeft Clunk al gehad. Pak het op een nieuwe manier in!',sv:'Den lunchen har Clunk redan ätit. Packa på ett nytt sätt!',da:'Den madpakke har Clunk allerede spist. Pak på en ny måde!',no:'Den matpakken har Clunk allerede spist. Pakk på en ny måte!',fi:'Nuo eväät Clunk söi jo. Pakkaa uudella tavalla!'},
    hintCountCups:{en:'Count all the cups.',de:'Zähl alle Mulden.',fr:'Compte tous les creux.',it:'Conta tutte le buche.',es:'Cuenta todos los huecos.',pt:'Conte todos os buraquinhos.',nl:'Tel alle kuiltjes.',sv:'Räkna alla gropar.',da:'Tæl alle fordybningerne.',no:'Tell alle gropene.',fi:'Laske kaikki kuopat.'},
    hintNumbers:  {en:'Count with the numbers. Which number goes on the question mark?',de:'Zähl mit den Zahlen. Welche Zahl gehört zum Fragezeichen?',fr:'Compte avec les nombres. Quel nombre va sur le point d’interrogation ?',it:'Conta con i numeri. Quale numero va sul punto interrogativo?',es:'Cuenta con los números. ¿Qué número va en el signo de interrogación?',pt:'Conte com os números. Qual número vai no ponto de interrogação?',nl:'Tel met de getallen. Welk getal hoort bij het vraagteken?',sv:'Räkna med talen. Vilket tal ska stå vid frågetecknet?',da:'Tæl med tallene. Hvilket tal hører til spørgsmålstegnet?',no:'Tell med tallene. Hvilket tall hører til spørsmålstegnet?',fi:'Laske lukujen avulla. Mikä luku kuuluu kysymysmerkin paikalle?'},
    hintCould:    {en:'These snacks could fit.',de:'Diese Snacks könnten passen.',fr:'Ces goûters pourraient convenir.',it:'Questi bocconcini potrebbero andare bene.',es:'Estas botanas podrían caber.',pt:'Estes petiscos podem caber.',nl:'Deze hapjes zouden kunnen passen.',sv:'De här mellanmålen kan passa.',da:'De her snacks kan passe.',no:'Disse matbitene kan passe.',fi:'Nämä välipalat voisivat sopia.'},
    hintCloud:    {en:'Tap Clunk’s cloud and set his number.',de:'Tipp auf Clunks Wolke und stell seine Zahl ein.',fr:'Touche le nuage de Clunk et règle son nombre.',it:'Tocca la nuvoletta di Clunk e imposta il suo numero.',es:'Toca la nube de Clunk y pon su número.',pt:'Toque na nuvem do Clunk e coloque o número dele.',nl:'Tik op Clunks wolkje en zet zijn getal goed.',sv:'Tryck på Clunks moln och ställ in hans tal.',da:'Tryk på Clunks sky, og indstil hans tal.',no:'Trykk på Clunks sky og still inn tallet hans.',fi:'Napauta Clunkin pilveä ja aseta hänen lukunsa.'},
    yum:          {en:'{n} = {a} + {b} — yum!',de:'{n} = {a} + {b} – lecker!',fr:'{n} = {a} + {b} – miam !',it:'{n} = {a} + {b}, gnam!',es:'{n} = {a} + {b}, ¡qué rico!',pt:'{n} = {a} + {b}, hum!',nl:'{n} = {a} + {b} – mmm!',sv:'{n} = {a} + {b} – mums!',da:'{n} = {a} + {b} – mums!',no:'{n} = {a} + {b} – nam!',fi:'{n} = {a} + {b} – nam!'},
    yum3:         {en:'{n} = {a} + {b} + {c} — yum!',de:'{n} = {a} + {b} + {c} – lecker!',fr:'{n} = {a} + {b} + {c} – miam !',it:'{n} = {a} + {b} + {c}, gnam!',es:'{n} = {a} + {b} + {c}, ¡qué rico!',pt:'{n} = {a} + {b} + {c}, hum!',nl:'{n} = {a} + {b} + {c} – mmm!',sv:'{n} = {a} + {b} + {c} – mums!',da:'{n} = {a} + {b} + {c} – mums!',no:'{n} = {a} + {b} + {c} – nam!',fi:'{n} = {a} + {b} + {c} – nam!'},
    celebrateTwo: {en:'Two different lunches, and both make {n}!',de:'Zwei verschiedene Mahlzeiten, und beide ergeben {n}!',fr:'Deux repas différents, et les deux font {n} !',it:'Due pranzi diversi, ed entrambi fanno {n}!',es:'¡Dos comidas distintas, y las dos hacen {n}!',pt:'Dois lanches diferentes, e os dois fazem {n}!',nl:'Twee verschillende lunches, en allebei zijn ze {n}!',sv:'Två olika luncher, och båda blir {n}!',da:'To forskellige madpakker, og begge giver {n}!',no:'To forskjellige matpakker, og begge blir {n}!',fi:'Kahdet erilaiset eväät, ja molemmissa on {n}!'},
    celebrateWhat:{en:'Clunk ate {a} and {b} — that’s {n}!',de:'Clunk hat {a} und {b} gegessen – das sind {n}!',fr:'Clunk a mangé {a} et {b} : ça fait {n} !',it:'Clunk ha mangiato {a} e {b}: fanno {n}!',es:'¡Clunk comió {a} y {b}: son {n}!',pt:'O Clunk comeu {a} e {b}: são {n}!',nl:'Clunk at {a} en {b} – dat is {n}!',sv:'Clunk åt {a} och {b} – det blir {n}!',da:'Clunk spiste {a} og {b} – det giver {n}!',no:'Clunk spiste {a} og {b} – det blir {n}!',fi:'Clunk söi {a} ja {b} – se on {n}!'},
    celebrateJust:{en:'Just right — the lid shuts on {n}!',de:'Genau richtig – der Deckel geht bei {n} zu!',fr:'Juste ce qu’il faut : le couvercle se ferme sur {n} !',it:'Giusto giusto: il coperchio si chiude su {n}!',es:'¡Perfecto: la tapa se cierra con {n}!',pt:'Na medida certa: a tampa fecha com {n}!',nl:'Precies goed – het deksel gaat dicht bij {n}!',sv:'Precis lagom – locket går igen vid {n}!',da:'Lige tilpas – låget lukker ved {n}!',no:'Akkurat passe – lokket går igjen ved {n}!',fi:'Juuri sopivasti – kansi menee kiinni, kun kuoppia on {n}!'},
    celebrateFed: {en:'Clunk’s lunch makes {n} — yum!',de:'Clunks Mahlzeit ergibt {n} – lecker!',fr:'Le repas de Clunk fait {n} – miam !',it:'Il pranzo di Clunk fa {n}, gnam!',es:'¡La comida de Clunk hace {n}, qué rico!',pt:'O lanche do Clunk faz {n}, hum!',nl:'Clunks lunch is {n} – mmm!',sv:'Clunks lunch blir {n} – mums!',da:'Clunks madpakke giver {n} – mums!',no:'Clunks matpakke blir {n} – nam!',fi:'Clunkin eväissä on {n} – nam!'},
    celebratePass:{en:'Clunk’s lunch log is full!',de:'Clunks Essensbuch ist voll!',fr:'Le carnet des repas de Clunk est plein !',it:'Il quaderno dei pranzi di Clunk è pieno!',es:'¡La libreta de comidas de Clunk está llena!',pt:'O caderno de lanches do Clunk está cheio!',nl:'Clunks lunchboekje is vol!',sv:'Clunks lunchbok är full!',da:'Clunks madbog er fuld!',no:'Clunks matbok er full!',fi:'Clunkin eväskirja on täynnä!'},
    play:         {en:'Snack bar',de:'Snackbar',fr:'Le bar à goûters',it:'Il bancone',es:'Puesto de botanas',pt:'Lanchonete',nl:'Hapjesbar',sv:'Mellanmålsbaren',da:'Snackbaren',no:'Matbitbaren',fi:'Välipalabaari'},
    playBack:     {en:'Back to the task',de:'Zurück zur Aufgabe',fr:'Retour à l’exercice',it:'Torna all’esercizio',es:'Volver a la tarea',pt:'Voltar à tarefa',nl:'Terug naar de opdracht',sv:'Tillbaka till uppgiften',da:'Tilbage til opgaven',no:'Tilbake til oppgaven',fi:'Takaisin tehtävään'},
    playNote:     {en:'Pack any lunch. When the lid shuts, the log writes the sum.',de:'Pack, was du willst. Wenn der Deckel zugeht, schreibt das Buch die Rechnung.',fr:'Remplis comme tu veux. Quand le couvercle se ferme, le carnet écrit le calcul.',it:'Prepara il pranzo che vuoi. Quando il coperchio si chiude, il quaderno scrive il calcolo.',es:'Llena como quieras. Cuando la tapa se cierra, la libreta escribe la suma.',pt:'Monte como quiser. Quando a tampa fecha, o caderno escreve a conta.',nl:'Pak in wat je wilt. Als het deksel dichtgaat, schrijft het boekje de som.',sv:'Packa vad du vill. När locket går igen skriver boken uträkningen.',da:'Pak hvad du vil. Når låget lukker, skriver bogen regnestykket.',no:'Pakk hva du vil. Når lokket går igjen, skriver boka regnestykket.',fi:'Pakkaa mitä haluat. Kun kansi menee kiinni, kirja kirjoittaa laskun.'},
    strand:       {en:'Strand of {k}',de:'Kette mit {k}',fr:'Chapelet de {k}',it:'Filo da {k}',es:'Tira de {k}',pt:'Fileira de {k}',nl:'Snoer van {k}',sv:'Band med {k}',da:'Snor med {k}',no:'Snor med {k}',fi:'Nauha, jossa {k}'},
    boxLabel:     {en:'Lunchbox, {n} cups',de:'Brotdose, {n} Mulden',fr:'Boîte à goûter, {n} creux',it:'Cestino, {n} buche',es:'Lonchera, {n} huecos',pt:'Lancheira, {n} buraquinhos',nl:'Lunchbox, {n} kuiltjes',sv:'Matlåda, {n} gropar',da:'Madkasse, {n} fordybninger',no:'Matboks, {n} groper',fi:'Eväsrasia, {n} kuoppaa'},
    lidLabel:     {en:'Lid',de:'Deckel',fr:'Couvercle',it:'Coperchio',es:'Tapa',pt:'Tampa',nl:'Deksel',sv:'Lock',da:'Låg',no:'Lokk',fi:'Kansi'},
    lever:        {en:'Feed lever',de:'Fütterhebel',fr:'Levier du repas',it:'Leva della pappa',es:'Palanca de comida',pt:'Alavanca da comida',nl:'Voerhendel',sv:'Matspak',da:'Fodringshåndtag',no:'Matspak',fi:'Ruokavipu'},
    leverLocked:  {en:'Feed lever (locked)',de:'Fütterhebel (gesperrt)',fr:'Levier du repas (bloqué)',it:'Leva della pappa (bloccata)',es:'Palanca de comida (con candado)',pt:'Alavanca da comida (travada)',nl:'Voerhendel (op slot)',sv:'Matspak (låst)',da:'Fodringshåndtag (låst)',no:'Matspak (låst)',fi:'Ruokavipu (lukossa)'},
    cloud:        {en:'Clunk’s number',de:'Clunks Zahl',fr:'Le nombre de Clunk',it:'Il numero di Clunk',es:'El número de Clunk',pt:'O número do Clunk',nl:'Clunks getal',sv:'Clunks tal',da:'Clunks tal',no:'Clunks tall',fi:'Clunkin luku'},
    sizeLess:     {en:'Fewer cups',de:'Weniger Mulden',fr:'Moins de creux',it:'Meno buche',es:'Menos huecos',pt:'Menos buraquinhos',nl:'Minder kuiltjes',sv:'Färre gropar',da:'Færre fordybninger',no:'Færre groper',fi:'Vähemmän kuoppia'},
    sizeMore:     {en:'More cups',de:'Mehr Mulden',fr:'Plus de creux',it:'Più buche',es:'Más huecos',pt:'Mais buraquinhos',nl:'Meer kuiltjes',sv:'Fler gropar',da:'Flere fordybninger',no:'Flere groper',fi:'Enemmän kuoppia'},
    logLabel:     {en:'Lunch log: {f} of {t}',de:'Essensbuch: {f} von {t}',fr:'Carnet des repas : {f} sur {t}',it:'Quaderno dei pranzi: {f} su {t}',es:'Libreta de comidas: {f} de {t}',pt:'Caderno de lanches: {f} de {t}',nl:'Lunchboekje: {f} van {t}',sv:'Lunchbok: {f} av {t}',da:'Madbog: {f} af {t}',no:'Matbok: {f} av {t}',fi:'Eväskirja: {f}/{t}'},
    setSize:      {en:'Lunch size',de:'Größe der Mahlzeit',fr:'Taille du repas',it:'Grandezza del pranzo',es:'Tamaño de la comida',pt:'Tamanho do lanche',nl:'Grootte van de lunch',sv:'Lunchens storlek',da:'Madpakkens størrelse',no:'Matpakkens størrelse',fi:'Eväiden koko'},
    upto5:        {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opp til 5',fi:'5:een asti'},
    six10:        {en:'6 to 10',de:'6 bis 10',fr:'De 6 à 10',it:'Da 6 a 10',es:'Del 6 al 10',pt:'De 6 a 10',nl:'6 tot en met 10',sv:'6 till 10',da:'6 til 10',no:'6 til 10',fi:'6–10'},
    big:          {en:'Big lunch',de:'Große Mahlzeit',fr:'Gros repas',it:'Pranzo grande',es:'Comida grande',pt:'Lanche grande',nl:'Grote lunch',sv:'Stor lunch',da:'Stor madpakke',no:'Stor matpakke',fi:'Isot eväät'},
    setTags:      {en:'Number tags',de:'Zahlenschilder',fr:'Étiquettes nombres',it:'Cartellini numerati',es:'Etiquetas con número',pt:'Etiquetas de número',nl:'Getalkaartjes',sv:'Sifferlappar',da:'Talmærker',no:'Tall-lapper',fi:'Numerolaput'},
    show:         {en:'Show',de:'Zeigen',fr:'Afficher',it:'Mostra',es:'Mostrar',pt:'Mostrar',nl:'Tonen',sv:'Visa',da:'Vis',no:'Vis',fi:'Näytä'},
    hide:         {en:'Hide',de:'Ausblenden',fr:'Masquer',it:'Nascondi',es:'Ocultar',pt:'Ocultar',nl:'Verbergen',sv:'Dölj',da:'Skjul',no:'Skjul',fi:'Piilota'}
  },

  defaults: { size: 'six10', tags: 'show' },
  settings: [
    { key: 'size', type: 'choice', labelKey: 'setSize', options: [{ value: 'upto5', labelKey: 'upto5' }, { value: 'six10', labelKey: 'six10' }, { value: 'big', labelKey: 'big' }] },
    { key: 'tags', type: 'choice', labelKey: 'setTags', options: [{ value: 'show', labelKey: 'show' }, { value: 'hide', labelKey: 'hide' }] }
  ],

  SNAKE_MS: 90, FEED_MS: 1300, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._busy = false; this._timers = []; this._ro = null; this._reveal = null; this._lidAnim = null; this._keysOpen = false; this._lastPass = false;
    this._themes = {};
    injectSnakeLunchCSS();
    if (typeof LCSPictures !== 'undefined') ['fruits', 'desserts and sweets', 'toys'].forEach(function (dir) {
      LCSPictures.load(dir).then(function (th) { self._themes[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* bare */ });
    });
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var st = self._cur(); if (!st || st.done) return;
      if (ev.key === 'l' || ev.key === 'L') { self._tapLid(); ev.preventDefault(); }
      else if (ev.key === 'f' || ev.key === 'F') { self._feed(); ev.preventDefault(); }
      else if (/^[0-9]$/.test(ev.key) && st.kind === 'whatdid') { var v = st.cloud && st.cloud === 1 ? 10 + +ev.key : +ev.key; if (v >= 2) self._setCloud(v); else if (ev.key === '1') st.cloud = 1; ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers();
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
  _level: function () { return SnakeLunchCore.level(this.api && this.api.settings && this.api.settings.size); },
  _tagsOn: function () { return !(this.api && this.api.settings && this.api.settings.tags === 'hide'); },
  _ensurePool: function () { var key = this._level(); if (!this._pool || this._poolKey !== key) { this._pool = SnakeLunchCore.rounds(key); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = SnakeLunchCore.order(pool, Math.random, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = SnakeLunchCore.order(pool, Math.random, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    var last = index % n === n - 1;
    return {
      id: 'snake-lunch.' + r.id,
      promptKey: SnakeLunchCore.promptKey(r),
      promptArgs: { n: r.n, k: r.k, g: SnakeLunchCore.sum(r.locked), a: r.box[0], b: r.box[1] },
      celebrateKey: SnakeLunchCore.celebrateKey(r, last),
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool.st = SnakeLunchCore.newState(r); tool._round = r; tool._playing = false;
        tool._busy = false; tool._reveal = null; tool._lidAnim = null; tool._keysOpen = false;
      },
      /* the lever presses Check itself when the round is complete */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },
  _treat: function () { return this._playing ? SnakeLunchCore.TREATS[0] : (this._round ? this._round.treat : SnakeLunchCore.TREATS[0]); },
  _src: function (pair) { var th = this._themes[pair[0]]; if (!th || typeof LCSPictures === 'undefined') return ''; try { return LCSPictures.url(th, pair[1]); } catch (e) { return ''; } },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this;
    if (!this.st) { this._round = SnakeLunchCore.rounds('six10')[0]; this.st = SnakeLunchCore.newState(this._round); }
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'sl-wrap'); this._wrap = wrap;
    var body = api.el('div', 'sl-body');

    /* Clunk: his number cloud, the robot, the feed lever, the log */
    var side = api.el('div', 'sl-side'); this._side = side;
    var cloud = api.el('button', 'sl-cloud'); cloud.type = 'button'; cloud.addEventListener('click', function () { self._toggleKeys(); }); this._cloud = cloud; side.appendChild(cloud);
    var robot = document.createElement('img'); robot.className = 'sl-robot'; robot.alt = ''; robot.draggable = false; robot.setAttribute('aria-hidden', 'true'); this._robot = robot;
    var puff = api.el('span', 'sl-puff'); puff.innerHTML = '<i></i><i></i><i></i>'; this._puff = puff;
    var rwrap = api.el('div', 'sl-robotwrap'); rwrap.appendChild(puff); rwrap.appendChild(robot); side.appendChild(rwrap);
    var lever = api.el('button', 'sl-lever'); lever.type = 'button';
    lever.innerHTML = '<span class="sl-lever-post"></span><span class="sl-lever-arm"><span class="sl-lever-knob"></span></span><svg class="sl-lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="#4D4237"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="#4D4237" stroke-width="2.6"/></svg>';
    lever.addEventListener('click', function () { self._feed(); }); this._lever = lever; side.appendChild(lever);
    var log = api.el('div', 'sl-log'); log.setAttribute('role', 'img'); this._log = log; side.appendChild(log);

    /* the wall and the box */
    var main = api.el('div', 'sl-main');
    var wall = api.el('div', 'sl-wall'); wall.setAttribute('role', 'group'); this._wall = wall; main.appendChild(wall);
    var boxWrap = api.el('div', 'sl-boxwrap'); this._boxWrap = boxWrap;
    var lidEl = api.el('button', 'sl-lid'); lidEl.type = 'button'; lidEl.addEventListener('click', function () { self._tapLid(); }); this._lidEl = lidEl; boxWrap.appendChild(lidEl);
    var box = api.el('div', 'sl-box'); box.setAttribute('role', 'group'); this._box = box;
    var thread = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); thread.setAttribute('class', 'sl-thread'); thread.setAttribute('aria-hidden', 'true'); this._thread = thread; box.appendChild(thread);
    var cupsEl = api.el('div', 'sl-cups'); this._cupsEl = cupsEl; box.appendChild(cupsEl);
    var plate = api.el('div', 'sl-plate'); this._plate = plate; box.appendChild(plate);
    boxWrap.appendChild(box);
    var over = api.el('div', 'sl-over'); this._over = over; boxWrap.appendChild(over);
    main.appendChild(boxWrap);
    var keys = api.el('div', 'sl-keys'); keys.setAttribute('role', 'group'); this._keys = keys; main.appendChild(keys);
    var stepper = api.el('div', 'sl-stepper'); this._stepper = stepper;
    var less = api.el('button', 'sl-step'); less.type = 'button'; less.textContent = '−'; less.addEventListener('click', function () { self._size(-1); }); this._lessBtn = less;
    var more = api.el('button', 'sl-step'); more.type = 'button'; more.textContent = '+'; more.addEventListener('click', function () { self._size(1); }); this._moreBtn = more;
    stepper.appendChild(less); stepper.appendChild(more); main.appendChild(stepper);

    body.appendChild(main); body.appendChild(side);
    wrap.appendChild(body);
    var note = api.el('div', 'sl-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var row = api.el('div', 'sl-actions'); this._actions = row;
    var playBtn = api.el('button', 'sl-tool sl-playbtn'); playBtn.type = 'button'; playBtn.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = playBtn; row.appendChild(playBtn);
    wrap.appendChild(row);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _layout: function () {
    var L = this._L = SnakeLunchCore.layout(this._width()), w = this._wrap;
    w.classList.toggle('is-wide', L.mode === 'wide'); w.classList.toggle('is-narrow', L.mode === 'narrow');
    w.classList.toggle('is-tiny', L.left < 326);
    /* on the smallest phones the snack-bar button rides in Clunk's row */
    if (this._playBtn) { var host = L.left < 326 ? this._side : this._actions; if (this._playBtn.parentNode !== host) host.appendChild(this._playBtn); }
    w.style.setProperty('--sl-cup', L.cup + 'px');
    w.style.setProperty('--sl-cupgap', L.cupGap + 'px');
    w.style.setProperty('--sl-face', L.face + 'px');
    w.style.setProperty('--sl-coil', L.coil + 'px');
    w.style.setProperty('--sl-robot', L.robot + 'px');
    w.style.setProperty('--sl-lever', L.lever + 'px');
    w.style.setProperty('--sl-right', L.right + 'px');
    w.style.setProperty('--sl-key', L.key + 'px');
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
    var st = this._cur(), t = this.api.t, self = this, L = this._L;
    if (!st || !this._wrap) return;
    var w = this._wrap, treatSrc = this._src(this._treat());
    w.classList.toggle('is-play', !!st.explore);
    w.classList.toggle('is-done', !!st.done);
    w.classList.toggle('is-what', st.kind === 'whatdid');
    w.classList.toggle('is-tags', this._tagsOn());

    /* Clunk */
    var rs = this._src(['toys', 'robot']); if (rs && this._robot.getAttribute('src') !== rs) this._robot.setAttribute('src', rs);
    this._robot.hidden = !rs;
    var cv = st.kind === 'whatdid' ? (st.cloud == null ? '?' : String(st.cloud)) : String(st.n);
    this._cloud.textContent = cv;
    this._cloud.disabled = st.kind !== 'whatdid' || st.done || this._busy;
    this._cloud.classList.toggle('is-dial', st.kind === 'whatdid' && !st.done);
    this._cloud.classList.toggle('is-wrong', !!(st.last && st.last.reason === 'cloud' && st.help));
    this._cloud.setAttribute('aria-label', t('cloud') + ': ' + cv);
    var shut = SnakeLunchCore.lid(st) === 'shut' && !this._reveal;
    var unlocked = st.kind === 'whatdid' ? st.cloud != null : shut;
    this._lever.classList.toggle('is-locked', !unlocked && !st.explore);
    this._lever.disabled = st.done || this._busy || !!st.explore;
    this._lever.hidden = !!st.explore;
    this._lever.setAttribute('aria-label', t(unlocked ? 'lever' : 'leverLocked')); this._lever.title = this._lever.getAttribute('aria-label');

    /* the log: one strip per lunch eaten, dashed strips still to come */
    var total = st.explore ? 0 : st.need, html = '', ways = st.ways.slice();
    if (st.explore && SnakeLunchCore.lid(st) === 'shut' && SnakeLunchCore.filled(st)) ways = [SnakeLunchCore.wayKey(SnakeLunchCore.parts(st))];
    var rows = Math.max(total, ways.length);
    for (var i = 0; i < rows; i++) {
      var key = ways[i];
      if (key) {
        var ps = key.split('+').map(Number), cups = '';
        ps.forEach(function (p, j) { for (var q = 0; q < p; q++) cups += '<i class="sl-mini sl-p' + j + '"></i>'; });
        html += '<div class="sl-strip is-on' + (st.last && st.last.reason === 'repeat' && st.last.key === key ? ' is-flash' : '') + '"><span class="sl-minis">' + cups + '</span><b>' + st.n + ' = ' + ps.join(' + ') + '</b></div>';
      } else html += '<div class="sl-strip"></div>';
    }
    if (this._log.getAttribute('data-html') !== html) { this._log.innerHTML = html; this._log.setAttribute('data-html', html); }
    this._log.setAttribute('aria-label', interp(t('logLabel'), { f: st.ways.length, t: total }));
    this._log.hidden = !rows;

    /* the wall: the strands still on their pegs (a strand in the box leaves an empty hook) */
    var wallStrands = st.strands.filter(function (s) { return !s.locked && (st.kind !== 'toofull' || true); });
    var helpIds = this._round && !st.explore ? SnakeLunchCore.helpful(st, this._round) : [];
    var sig = wallStrands.map(function (s) { return s.id; }).join(',');
    if (this._wall.getAttribute('data-sig') !== sig) {
      this._wall.setAttribute('data-sig', sig); this._wall.innerHTML = ''; this._coils = {};
      wallStrands.forEach(function (s) {
        var b = self.api.el('button', 'sl-strand'); b.type = 'button'; b.setAttribute('data-id', s.id);
        var pips = ''; for (var q = 0; q < s.k; q++) pips += '<i></i>';
        b.innerHTML = '<span class="sl-hook"></span><img class="sl-face" alt="" aria-hidden="true" draggable="false"><span class="sl-tag">' + s.k + '</span><span class="sl-pips">' + pips + '</span>';
        self._bindStrand(b, s.id);
        self._wall.appendChild(b); self._coils[s.id] = b;
      });
    }
    wallStrands.forEach(function (s) {
      var b = self._coils[s.id]; if (!b) return;
      var img = b.querySelector('.sl-face'); if (treatSrc && img.getAttribute('src') !== treatSrc) img.setAttribute('src', treatSrc); img.hidden = !treatSrc;
      b.classList.toggle('is-out', s.at !== 'wall');
      b.disabled = s.at !== 'wall' || st.done || self._busy || st.kind === 'whatdid';
      b.classList.toggle('is-could', helpIds.indexOf(s.id) >= 0);
      b.setAttribute('aria-label', interp(t('strand'), { k: s.k }));
    });
    this._wall.hidden = st.kind === 'whatdid';

    /* the box: the snake of cups */
    var C = SnakeLunchCore.cups(st), n = st.n, rows2 = Math.ceil(n / 5), cup = L.cup, gap = L.cupGap;
    var bw = 5 * cup + 4 * gap, bh = rows2 * cup + (rows2 - 1) * gap;
    this._cupsEl.style.width = bw + 'px'; this._cupsEl.style.height = bh + 'px';
    if (this._cupsEl.children.length !== n) {
      this._cupsEl.innerHTML = '';
      for (var c = 0; c < n; c++) {
        (function (ci) {
          var el = self.api.el('button', 'sl-cup'); el.type = 'button';
          el.innerHTML = '<img class="sl-pic" alt="" aria-hidden="true" draggable="false"><b class="sl-num"></b>';
          el.addEventListener('click', function () { self._tapCup(ci); });
          self._cupsEl.appendChild(el);
        }(c));
      }
    }
    var countOn = SnakeLunchCore.countOn(st), cupChips = SnakeLunchCore.cupChips(st), filledN = SnakeLunchCore.filled(st);
    var shownUpTo = this._reveal ? this._reveal.upto : Infinity;
    var pts = {};
    for (var ci = 0; ci < n; ci++) {
      var el = this._cupsEl.children[ci], pos = SnakeLunchCore.cupPos(ci), cc = C.inside[ci];
      el.style.left = (pos.col * (cup + gap)) + 'px'; el.style.top = (pos.row * (cup + gap)) + 'px';
      var showIt = cc && ci < shownUpTo;
      el.classList.toggle('is-full', !!showIt);
      el.classList.toggle('is-locked', !!(cc && cc.locked));
      el.setAttribute('data-slot', cc ? String(cc.slot % 4) : '');
      var pic = el.querySelector('.sl-pic');
      if (showIt && treatSrc) { if (pic.getAttribute('src') !== treatSrc) pic.setAttribute('src', treatSrc); pic.hidden = false; } else pic.hidden = true;
      var num = el.querySelector('.sl-num'), lab = '';
      if (!cc && countOn.length && ci >= filledN) lab = String(countOn[ci - filledN]);
      if (cupChips.length) lab = String(cupChips[ci]);
      num.textContent = lab; num.classList.toggle('is-on', !!lab); num.classList.toggle('is-q', lab === '?');
      el.classList.toggle('is-counton', !!(!cc && countOn.length));
      el.disabled = !cc || st.done || this._busy || st.kind === 'whatdid';
      if (cc && showIt) { (pts[cc.strand] = pts[cc.strand] || []).push([pos.col * (cup + gap) + cup / 2, pos.row * (cup + gap) + cup / 2, cc.slot]); }
    }
    /* the thread of each strand, drawn along the groove */
    var svgHtml = '';
    Object.keys(pts).forEach(function (id) { var p = pts[id]; if (p.length < 2) return; svgHtml += '<polyline class="sl-th sl-th' + (p[0][2] % 4) + '" points="' + p.map(function (q) { return q[0] + ',' + q[1]; }).join(' ') + '"/>'; });
    this._thread.setAttribute('viewBox', '0 0 ' + bw + ' ' + bh); this._thread.style.width = bw + 'px'; this._thread.style.height = bh + 'px';
    this._thread.innerHTML = svgHtml;
    this._plate.textContent = st.kind === 'whatdid' ? '' : String(n);
    this._plate.hidden = st.kind === 'whatdid';
    this._box.setAttribute('aria-label', interp(t('boxLabel'), { n: st.kind === 'whatdid' ? '?' : n }));
    /* what hangs over the rim: beads on a dangling thread */
    var ov = this._reveal ? Math.max(0, Math.min(shownUpTo, C.inside.length + C.over.length) - n) : C.over.length;
    var ovHtml = ''; for (var o = 0; o < ov; o++) ovHtml += '<i style="--sl-o:' + o + '"></i>';
    if (this._over.getAttribute('data-n') !== String(ov)) { this._over.innerHTML = ovHtml; this._over.setAttribute('data-n', String(ov)); }
    this._over.hidden = !ov;
    this._over.classList.toggle('is-left', (rows2 - 1) % 2 === 1);
    /* the lid */
    var lidState = this._lidAnim || (shut ? 'shut' : 'open');
    this._lidEl.className = 'sl-lid is-' + lidState;
    this._lidEl.setAttribute('aria-label', t('lidLabel'));
    this._lidEl.disabled = st.done || this._busy || st.kind === 'whatdid';
    this._lidEl.hidden = st.kind === 'whatdid';

    /* the cloud keys (WHAT DID) */
    var showKeys = st.kind === 'whatdid' && !st.done && this._keysOpen;
    if (showKeys) {
      var max = SnakeLunchCore.cloudRange(st);
      if (this._keys.getAttribute('data-max') !== String(max)) {
        this._keys.innerHTML = '';
        for (var v = 2; v <= max; v++) (function (val) { var kb = self.api.el('button', 'sl-key'); kb.type = 'button'; kb.textContent = String(val); kb.setAttribute('data-v', String(val)); kb.addEventListener('click', function () { self._setCloud(val); }); self._keys.appendChild(kb); }(v));
        this._keys.setAttribute('data-max', String(max));
      }
    }
    this._keys.hidden = !showKeys;

    /* the free-play size stepper */
    this._stepper.hidden = !st.explore;
    this._lessBtn.disabled = !st.explore || st.n <= 2; this._moreBtn.disabled = !st.explore || st.n >= 10;
    this._lessBtn.setAttribute('aria-label', t('sizeLess')); this._moreBtn.setAttribute('aria-label', t('sizeMore'));

    /* the note */
    var h = st.explore ? { key: 'playNote' } : SnakeLunchCore.hint(st);
    if (h && h.key === 'hintExactly' && st.kind === 'finish') h.key = 'hintTwoMore';
    var text = h ? interp(t(h.key), h) + (h.more ? ' ' + interp(t(h.more), h) : '') : '';
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', !!(h && h.wrong));
    this._note.classList.toggle('is-good', !!(h && h.good));

    this._playBtn.textContent = t(st.explore ? 'playBack' : 'play');
    this._playBtn.disabled = this._busy;
  },

  /* ---------------- the hand ---------------- */
  /* a strand: tap = it flies into the box; drag = drop it on the box */
  _bindStrand: function (b, id) {
    var self = this, drag = null;
    b.addEventListener('pointerdown', function (ev) {
      if (b.disabled) return;
      drag = { x: ev.clientX, y: ev.clientY, id: ev.pointerId, moved: false };
      try { b.setPointerCapture(ev.pointerId); } catch (e) { /* older browsers */ }
    });
    b.addEventListener('pointermove', function (ev) {
      if (!drag || ev.pointerId !== drag.id) return;
      var dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 8) return;
      drag.moved = true; b.classList.add('is-lifted'); b.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.06)';
    });
    var end = function (ev) {
      if (!drag || ev.pointerId !== drag.id) return;
      var d = drag; drag = null; b.classList.remove('is-lifted'); b.style.transform = '';
      if (!d.moved) return;
      b._dragged = true;
      var r = self._boxWrap.getBoundingClientRect();
      if (ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top - 20 && ev.clientY <= r.bottom + 20) self._drop(id);
    };
    b.addEventListener('pointerup', end);
    b.addEventListener('pointercancel', function () { drag = null; b.classList.remove('is-lifted'); b.style.transform = ''; });
    b.addEventListener('click', function () { if (b._dragged) { b._dragged = false; return; } self._drop(id); });
  },
  _drop: function (id) {
    var st = this._cur(), self = this;
    if (!st || this._busy || this._reveal) return;
    var before = SnakeLunchCore.filled(st);
    var res = SnakeLunchCore.drop(st, id);
    if (res === 'locked' || res === 'refused') { this.api.sound(260); return; }
    this._lidAnim = null;
    var s = SnakeLunchCore.byId(st, id);
    this.api.track('drop', { id: st.id, k: s.k, lid: res });
    /* the strand snakes in cup by cup (a "plip" per treat, rising) */
    if (this.FAST) { this._afterSnake(); return; }
    this._reveal = { upto: before };
    this._paint();
    var step = function (j) {
      if (self._cur() !== st) return;
      self._reveal = { upto: before + j };
      self.api.sound(523 * Math.pow(2, (before + j) / 12));
      self._paint();
      if (j < s.k) self._later(function () { step(j + 1); }, self.SNAKE_MS);
      else self._later(function () { self._reveal = null; self._afterSnake(); }, 300);
    };
    step(1);
  },
  _afterSnake: function () {
    var st = this._cur();
    this._reveal = null;
    var l = SnakeLunchCore.lid(st);
    if (l === 'shut') { this.api.sound(700); this._later(function () { /* click-CLACK */ }, 0); bounce(this._lidEl, 'sl-clack'); }
    if (l === 'bonk') bounce(this._over, 'sl-swing');
    this._paint();
  },
  _tapCup: function (ci) {
    var st = this._cur();
    if (!st || this._busy || this._reveal) return;
    var cc = SnakeLunchCore.cups(st).inside[ci]; if (!cc) return;
    var res = SnakeLunchCore.takeOut(st, cc.strand);
    if (res === 'locked') { bounce(this._cupsEl.children[ci], 'sl-shake'); this.api.sound(240); return; }
    this._lidAnim = null;
    this.api.sound(360);
    this._paint();
  },
  _tapLid: function () {
    var st = this._cur(), self = this;
    if (!st || this._busy || this._reveal || st.kind === 'whatdid') return;
    var l = SnakeLunchCore.tryLid(st);
    if (l === 'shut') { this._paint(); return; }
    this._lidAnim = l === 'gap' ? 'gap' : 'bonk';
    this.api.sound(l === 'gap' ? 220 : 180);
    this._paint();
    this._later(function () { self._lidAnim = null; self._paint(); }, this._ms(520));
  },
  _toggleKeys: function () {
    var st = this.st;
    if (!st || st.kind !== 'whatdid' || st.done || this._busy) return;
    this._keysOpen = !this._keysOpen; this._paint();
    var first = this._keys.querySelector('.sl-key'); if (first && this._keysOpen) first.focus({ preventScroll: true });
  },
  _setCloud: function (v) {
    var st = this.st;
    if (!st || !SnakeLunchCore.setCloud(st, v)) return;
    this.api.sound(480); this._keysOpen = false; this._paint();
  },

  /* the feed lever (= Check) */
  _feed: function () {
    var st = this.st, self = this;
    if (!st || this._busy || this._reveal || this._playing || st.done) return;
    var res = SnakeLunchCore.feed(st);
    if (!res) return;
    this.api.track('feed', { id: st.id, ok: res.ok, reason: res.reason, misses: st.misses });
    if (!res.ok) {
      this.api.sound(res.miss ? 280 : 240);
      bounce(this._lever, 'sl-wiggle');
      if (res.reason === 'gap' || res.reason === 'bonk') { this._lidAnim = res.reason; this._later(function () { self._lidAnim = null; self._paint(); }, this._ms(520)); }
      if (res.reason === 'empty') { var first = this._wall.querySelector('.sl-strand:not(:disabled)'); bounce(first, 'sl-bob'); }
      if (res.reason === 'unset') bounce(this._cloud, 'sl-bob');
      this._paint();
      return;
    }
    /* the feed: the box rolls to Clunk, he hops, steam puffs, the log prints */
    this._busy = true;
    this.api.sound(520); this._later(function () { self.api.sound(660); }, 160); this._later(function () { self.api.sound(780); }, 320);
    bounce(this._boxWrap, 'sl-roll'); bounce(this._robot, 'sl-hop'); bounce(this._puff, 'sl-puffing');
    this._paint();
    this._later(function () {
      if (!st.done) { var others = st.strands.filter(function (s) { return !s.locked; }); st.strands = st.strands.filter(function (s) { return s.locked; }).concat(SnakeLunchCore.shuffle(others, Math.random)); }
      self._busy = false; self._paint();
      if (st.done) { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }
    }, this._ms(this.FEED_MS));
  },

  /* ---------------- free play ---------------- */
  _togglePlay: function () {
    if (this._busy || this._reveal) return;
    this._lidAnim = null; this._keysOpen = false;
    if (this._playing) { this._playing = false; this._paint(); return; }
    this._playing = true; this._play = SnakeLunchCore.newPlay(6);
    this._paint();
  },
  _size: function (d) { var st = this._play; if (!this._playing || !st) return; SnakeLunchCore.setSize(st, st.n + d); this.api.sound(440); this._paint(); }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args && args[k] != null) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var slCssDone = false;
function injectSnakeLunchCSS() {
  if (slCssDone || typeof document === 'undefined') return;
  slCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.sl-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:12px;--sl-cup:96px;--sl-cupgap:4px;--sl-face:96px;--sl-coil:120px;--sl-robot:100px;--sl-lever:64px;--sl-right:128px;--sl-key:48px;--sl-ink:#2B3A36;}'
  + '.sl-body{display:flex;flex-direction:column;align-items:stretch;gap:10px;}'
  + '.sl-wrap.is-wide .sl-body{flex-direction:row;align-items:flex-start;gap:12px;}'
  + '.sl-main{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:10px;}'
  /* Clunk */
  + '.sl-side{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.sl-wrap.is-wide .sl-side{width:var(--sl-right);flex:none;}'
  + '.sl-wrap.is-narrow .sl-side{order:-1;flex-direction:row;justify-content:center;flex-wrap:wrap;gap:8px;}'
  + '.sl-body{} .sl-wrap.is-narrow .sl-body{flex-direction:column;} .sl-wrap.is-narrow .sl-main{order:1;}'
  + '.sl-cloud{position:relative;min-width:72px;height:52px;padding:0 12px;border:0;border-radius:26px;background:#fff;color:var(--sl-ink);font:800 32px/52px var(--lcs-font-display);box-shadow:inset 0 0 0 3px #B6C4BF,8px 10px 0 -4px #fff,8px 10px 0 -1px #B6C4BF;}'
  + '.sl-cloud:disabled{cursor:default;} .sl-cloud.is-dial{cursor:pointer;box-shadow:inset 0 0 0 3px var(--lcs-structure),8px 10px 0 -4px #fff,8px 10px 0 -1px var(--lcs-structure);} .sl-cloud.is-wrong{color:#9C3F1C;animation:sl-flashk .4s ease-in-out 3;}'
  + '.sl-robotwrap{position:relative;width:var(--sl-robot);height:var(--sl-robot);}'
  + '.sl-robot{width:100%;height:100%;object-fit:contain;} .sl-robot[hidden]{display:none;}'
  + '.sl-robot.sl-hop{animation:sl-hopk .44s ease-in-out 2;} @keyframes sl-hopk{50%{transform:translateY(-14px);}}'
  + '.sl-puff{position:absolute;left:10%;top:-6px;width:40px;height:30px;pointer-events:none;} .sl-puff i{position:absolute;width:14px;height:14px;border-radius:50%;background:#C9CED0;opacity:0;}'
  + '.sl-puff i:nth-child(1){left:0;top:12px;} .sl-puff i:nth-child(2){left:12px;top:4px;} .sl-puff i:nth-child(3){left:24px;top:0;}'
  + '.sl-puff.sl-puffing i{animation:sl-puffk .9s ease-out both;} .sl-puff.sl-puffing i:nth-child(2){animation-delay:.15s;} .sl-puff.sl-puffing i:nth-child(3){animation-delay:.3s;}'
  + '@keyframes sl-puffk{0%{opacity:0;transform:scale(.4);}30%{opacity:.9;}100%{opacity:0;transform:scale(1.6) translateY(-16px);}}'
  + '.sl-lever{position:relative;width:var(--sl-lever);height:var(--sl-lever);padding:0;border:0;background:none;cursor:pointer;} .sl-lever[hidden]{display:none;}'
  + '.sl-lever-post{position:absolute;left:50%;bottom:4px;width:34%;height:22%;transform:translateX(-50%);border-radius:6px;background:#7A6A58;}'
  + '.sl-lever-arm{position:absolute;left:50%;bottom:18%;width:12%;height:62%;transform-origin:50% 100%;transform:translateX(-50%) rotate(-20deg);border-radius:6px;background:#9AA5A1;transition:transform .15s;}'
  + '.sl-lever-knob{position:absolute;left:50%;top:-30%;width:400%;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle at 35% 30%,#F79A73,var(--lcs-accent) 60%,#C95A31);box-shadow:0 2px 0 #9C3F1C;}'
  + '.sl-lever:not(.is-locked):not(:disabled) .sl-lever-arm{animation:sl-ready 1.2s ease-in-out infinite;} @keyframes sl-ready{50%{transform:translateX(-50%) rotate(-6deg);}}'
  + '.sl-lock{position:absolute;right:-2px;bottom:-2px;width:22px;height:22px;opacity:0;transition:opacity .2s;} .sl-lever.is-locked .sl-lock{opacity:1;} .sl-lever.is-locked .sl-lever-knob{opacity:.55;filter:grayscale(.6);}'
  + '.sl-lever.sl-wiggle .sl-lever-arm{animation:sl-wigk .3s ease-in-out 2;} @keyframes sl-wigk{50%{transform:translateX(-50%) rotate(-30deg);}}'
  + '.sl-log{display:flex;flex-direction:column;gap:6px;width:100%;} .sl-log[hidden]{display:none;}'
  + '.sl-wrap.is-narrow .sl-log{width:auto;min-width:120px;}'
  + '.sl-strip{min-height:30px;border-radius:8px;box-shadow:inset 0 0 0 2px #D5DED9;background:repeating-linear-gradient(90deg,transparent 0 6px,rgba(213,222,217,.6) 6px 9px);padding:4px 6px;box-sizing:border-box;}'
  + '.sl-strip.is-on{background:#FFFBF2;box-shadow:inset 0 0 0 2px #E8D9B8;} .sl-strip.is-flash{animation:sl-flashk .45s ease-in-out 3;}'
  + '.sl-minis{display:flex;flex-wrap:wrap;gap:2px;} .sl-mini{width:8px;height:8px;border-radius:2px;} .sl-p0{background:#F2784B;} .sl-p1{background:#2E9C88;} .sl-p2{background:#E8A53A;} .sl-p3{background:#7B6BB0;}'
  + '.sl-strip b{display:block;font:800 16px/20px var(--lcs-font-display);color:var(--sl-ink);white-space:nowrap;}'
  /* the wall */
  + '.sl-wall{display:grid;grid-template-columns:repeat(4,var(--sl-coil));gap:8px 8px;justify-content:center;padding:10px 8px;border-radius:14px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #E2D3B5;background-image:radial-gradient(circle,#E2D3B5 2px,transparent 2.5px);background-size:24px 24px;} .sl-wall[hidden]{display:none;}'
  + '.sl-wrap.is-narrow .sl-wall{gap:6px;padding:6px 0;width:100%;box-sizing:border-box;}'
  + '.sl-strand{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;padding:12px 2px 6px;border:0;border-radius:12px;background:rgba(255,255,255,.7);cursor:grab;touch-action:none;transition:transform .12s;}'
  + '.sl-strand:disabled{cursor:default;} .sl-strand.is-lifted{z-index:20;box-shadow:0 10px 18px rgba(0,0,0,.18);}'
  + '.sl-strand.is-out .sl-face,.sl-strand.is-out .sl-tag,.sl-strand.is-out .sl-pips{visibility:hidden;}'
  + '.sl-hook{position:absolute;top:3px;left:50%;width:14px;height:9px;margin-left:-7px;border:3px solid #9AA5A1;border-bottom:0;border-radius:8px 8px 0 0;}'
  + '.sl-face{width:var(--sl-face);height:var(--sl-face);object-fit:contain;pointer-events:none;} .sl-face[hidden]{display:none;}'
  + '.sl-tag{position:absolute;top:6px;right:4px;min-width:34px;height:34px;border-radius:17px;background:#fff;color:var(--sl-ink);font:800 22px/34px var(--lcs-font-display);box-shadow:inset 0 0 0 2px #2B3A36;}'
  + '.sl-wrap:not(.is-tags) .sl-tag{display:none;}'
  + '.sl-wrap.is-narrow .sl-tag{min-width:26px;height:26px;font-size:17px;line-height:26px;border-radius:13px;}'
  + '.sl-pips{display:grid;grid-template-columns:repeat(5,10px);gap:3px;justify-content:center;} .sl-pips i{width:10px;height:10px;border-radius:50%;background:#B9844C;}'
  + '.sl-wrap.is-narrow .sl-pips{grid-template-columns:repeat(5,8px);gap:2px;} .sl-wrap.is-narrow .sl-pips i{width:8px;height:8px;}'
  + '.sl-strand.is-could{box-shadow:inset 0 0 0 3px #2E9C88;} .sl-strand.is-could .sl-tag{box-shadow:inset 0 0 0 3px #2E9C88;color:#1F7A69;}'
  + '.sl-strand.sl-bob{animation:sl-bobk .5s ease-in-out 2;} @keyframes sl-bobk{50%{transform:translateY(-6px);}}'
  /* the box */
  + '.sl-boxwrap{position:relative;padding-top:50px;}'
  + '.sl-box{position:relative;padding:8px;border-radius:16px;background:#FBF3E4;box-shadow:inset 0 0 0 4px var(--lcs-structure),0 4px 10px rgba(20,60,50,.12);}'
  + '.sl-wrap.is-narrow .sl-box{padding:4px 0;border-radius:12px;box-shadow:0 0 0 3px var(--lcs-structure);}'
  + '.sl-cups{position:relative;}'
  + '.sl-thread{position:absolute;left:8px;top:8px;pointer-events:none;overflow:visible;z-index:1;} .sl-wrap.is-narrow .sl-thread{left:0;top:4px;}'
  + '.sl-th{fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:.75;} .sl-th0{stroke:#F2784B;} .sl-th1{stroke:#2E9C88;} .sl-th2{stroke:#E8A53A;} .sl-th3{stroke:#7B6BB0;}'
  + '.sl-cup{position:absolute;width:var(--sl-cup);height:var(--sl-cup);padding:0;border:0;border-radius:50%;background:radial-gradient(circle at 50% 40%,#fff 55%,#EADFC8 100%);box-shadow:inset 0 3px 6px rgba(80,60,30,.25),0 0 0 2px #D8C9A8;display:grid;place-items:center;cursor:pointer;}'
  + '.sl-cup:disabled{cursor:default;}'
  + '.sl-cup[data-slot="0"].is-full{box-shadow:inset 0 3px 6px rgba(80,60,30,.25),0 0 0 3px #F2784B;} .sl-cup[data-slot="1"].is-full{box-shadow:inset 0 3px 6px rgba(80,60,30,.25),0 0 0 3px #2E9C88;} .sl-cup[data-slot="2"].is-full{box-shadow:inset 0 3px 6px rgba(80,60,30,.25),0 0 0 3px #E8A53A;} .sl-cup[data-slot="3"].is-full{box-shadow:inset 0 3px 6px rgba(80,60,30,.25),0 0 0 3px #7B6BB0;}'
  + '.sl-cup.is-locked::after{content:"";position:absolute;right:6%;top:6%;width:14px;height:8px;border-radius:3px;background:#C9A24A;box-shadow:0 0 0 2px #fff;}'
  + '.sl-pic{position:relative;z-index:2;width:var(--sl-cup);height:var(--sl-cup);object-fit:contain;pointer-events:none;} .sl-pic[hidden]{display:none;}'
  + '.sl-cup.is-full .sl-pic{animation:sl-plip .16s ease-out both;} @keyframes sl-plip{from{transform:translateY(-10px);opacity:.3;}to{transform:none;opacity:1;}}'
  + '.sl-num{position:absolute;z-index:3;right:2px;top:2px;min-width:24px;height:24px;padding:0 4px;box-sizing:border-box;border-radius:12px;background:#fff;color:var(--sl-ink);font:800 15px/24px var(--lcs-font-display);box-shadow:0 1px 3px rgba(0,0,0,.3);}'
  + '.sl-num:not(.is-on){display:none;} .sl-num.is-q{background:var(--lcs-structure);color:#fff;}'
  + '.sl-cup.is-counton{box-shadow:inset 0 0 0 3px var(--lcs-structure);background:repeating-linear-gradient(45deg,#fff 0 5px,#E3F1EC 5px 10px);} .sl-cup.is-counton .sl-num{position:static;font-size:22px;background:none;box-shadow:none;}'
  + '.sl-cup.sl-shake{animation:sl-shk .3s ease-in-out 1;} @keyframes sl-shk{25%{translate:-3px 0;}75%{translate:3px 0;}}'
  + '.sl-plate{position:absolute;left:-10px;top:-14px;z-index:4;min-width:40px;height:40px;padding:0 6px;box-sizing:border-box;border-radius:20px;background:#fff;color:var(--lcs-structure);font:800 24px/40px var(--lcs-font-display);text-align:center;box-shadow:inset 0 0 0 3px var(--lcs-structure);} .sl-plate[hidden]{display:none;}'
  /* the lid */
  + '.sl-lid{position:absolute;left:4%;right:4%;top:0;height:46px;z-index:5;padding:0;border:0;border-radius:10px 10px 4px 4px;background:linear-gradient(180deg,#3FA090,var(--lcs-structure));clip-path:polygon(7% 0,93% 0,100% 100%,0 100%);cursor:pointer;transition:height .25s,top .25s,left .25s,right .25s,opacity .25s;} .sl-lid[hidden]{display:none;}'
  + '.sl-lid.is-open{opacity:.9;}'
  + '.sl-lid.is-gap{animation:sl-gapk .52s ease-in-out 1;} @keyframes sl-gapk{50%{transform:translateY(22px);}}'
  + '.sl-lid.is-bonk{animation:sl-bonkk .52s ease-in-out 1;} @keyframes sl-bonkk{40%{transform:translateY(30px) rotate(-3deg);}60%{transform:translateY(6px) rotate(2deg);}}'
  + '.sl-lid.is-shut{left:0;right:0;top:50px;height:calc(100% - 50px);clip-path:none;border-radius:16px;background:linear-gradient(180deg,rgba(46,140,124,.82),rgba(20,107,94,.86));box-shadow:0 0 0 3px #0E4E44;cursor:default;}'
  + '.sl-lid.is-shut::after{content:"";position:absolute;left:50%;bottom:-6px;width:30px;height:14px;margin-left:-15px;border-radius:4px;background:#C9A24A;}'
  + '.sl-lid.sl-clack{animation:sl-clackk .3s ease-out 1;} @keyframes sl-clackk{40%{transform:scale(1.02);}}'
  + '.sl-boxwrap.sl-roll{animation:sl-rollk 1.2s ease-in-out 1;} @keyframes sl-rollk{40%{transform:translateX(40px) scale(.96);opacity:.6;}60%{transform:translateX(40px) scale(.96);opacity:0;}61%{transform:translateX(-30px);opacity:0;}100%{transform:none;opacity:1;}}'
  /* what hangs over the rim */
  + '.sl-over{display:flex;gap:4px;justify-content:flex-end;padding:4px 6px 0;} .sl-over[hidden]{display:none;}'
  + '.sl-over.is-left{justify-content:flex-start;}'
  + '.sl-over i{width:22px;height:22px;border-radius:50%;background:#C9844B;box-shadow:0 0 0 3px #F2784B;transform:rotate(calc(var(--sl-o) * 8deg)) translateY(calc(var(--sl-o) * 2px));}'
  + '.sl-over.sl-swing{animation:sl-swingk .3s ease-in-out 2;} @keyframes sl-swingk{50%{transform:rotate(-4deg);}}'
  /* the cloud keys */
  + '.sl-keys{display:grid;grid-template-columns:repeat(5,var(--sl-key));gap:6px;justify-content:center;} .sl-keys[hidden]{display:none;}'
  + '.sl-wrap.is-wide .sl-keys{grid-template-columns:repeat(7,var(--sl-key));}'
  + '.sl-key{height:var(--sl-key);padding:0;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;font:800 22px/1 var(--lcs-font-display);color:var(--lcs-structure);cursor:pointer;}'
  + '.sl-stepper{display:flex;gap:10px;} .sl-stepper[hidden]{display:none;}'
  + '.sl-step{width:48px;height:48px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 26px/1 var(--lcs-font-display);cursor:pointer;} .sl-step:disabled{opacity:.4;cursor:default;}'
  /* the note and the actions */
  + '.sl-note{box-sizing:border-box;align-self:center;width:100%;max-width:560px;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--sl-ink);text-align:center;} .sl-note[hidden]{display:none;}'
  + '.sl-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;} .sl-note.is-good{border-color:#C9A24A;background:#FFF6DA;font-family:var(--lcs-font-display);font-size:22px;font-weight:800;}'
  + '.sl-actions{display:flex;justify-content:center;gap:12px;}'
  + '.sl-tool{min-height:48px;padding:0 14px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 15px/1 var(--lcs-font-body);cursor:pointer;} .sl-tool:disabled{opacity:.45;cursor:default;}'
  + '.sl-strand:focus-visible,.sl-cup:focus-visible,.sl-lid:focus-visible,.sl-lever:focus-visible,.sl-cloud:focus-visible,.sl-key:focus-visible,.sl-tool:focus-visible,.sl-step:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '@keyframes sl-flashk{50%{box-shadow:0 0 0 4px #F2C14E;}}'
  /* narrow */
  + '.sl-wrap.is-narrow{gap:8px;} .sl-wrap.is-narrow .sl-note{font-size:15px;padding:7px 10px;} .sl-wrap.is-narrow .sl-cloud{min-width:56px;height:44px;font-size:26px;line-height:44px;}'
  + '.sl-wrap.is-narrow .sl-strip b{font-size:14px;line-height:16px;} .sl-wrap.is-narrow .sl-strip{min-height:24px;padding:3px 5px;}'
  + '.sl-wrap.is-narrow .sl-strand{padding:10px 0 4px;}'
  + '.sl-wrap.is-tiny .sl-wall{grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:var(--sl-coil);justify-content:start;overflow-x:auto;overscroll-behavior-x:contain;padding:6px;}'
  + '.sl-wrap.is-tiny .sl-actions:empty{display:none;} .sl-wrap.is-tiny .sl-side .sl-playbtn{min-height:44px;padding:0 10px;font-size:13px;}'
  + '@media (prefers-reduced-motion:reduce){.sl-pic,.sl-robot,.sl-puff i,.sl-boxwrap,.sl-lid,.sl-lever-arm,.sl-over,.sl-strand{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'sl-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = SnakeLunchActivity;
if (typeof window !== 'undefined') window.SnakeLunchActivity = SnakeLunchActivity;
