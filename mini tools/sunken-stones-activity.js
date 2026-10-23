/* =====================================================================
   sunken-stones-activity.js — ACTIVITY #86 of the one-by-one rebuild:
   "Lily's Ten Stones" → THE SUNKEN STONES (1.OA.C.6, 11 locales).
   Design sheet: docs/activities-rebuild/designs/086-ten-stones.md
   ---------------------------------------------------------------------
   THE INVENTION: the pond is a number line 0–20 and the stones on the far
   side of ten are under water until Lily stands on the golden Ten Stone.
   The number to add or take away is a rope of beads; the child pulls Lily
   back like a slingshot (one bead per stone of pull) and lets go — or taps
   a stone ahead. A leap across ten splashes (never a miss) and she swims
   back, so every crossing breaks at ten and the rest is what is left on
   the rope. Then the child types the stone she is on.
   ACTIVITY LAYER ONLY: the model is sunken-stones-core.js; the frog is the
   library picture pets/frog via lcs-pictures.js (it faces left, so it is
   mirrored for leaps to the right); lcs-shell.js untouched (the shell's
   Check is hidden and pressed by this activity on success). Test seams:
   window.SunkenStonesActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var SunkenStonesActivity = {
  id: 'sunken-stones',
  apparatusClasses: ['sk-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Lily’s Ten Stones',de:'Lilys Zehnersteine',nl:'De tienstenen van Lily',da:'Lilys tisten',sv:'Lilys tiostenar',no:'Lilys tisteiner',es:'Las piedras del diez de Lily',it:'I sassi del dieci di Lily',pt:'As pedras do dez da Lily',fr:'Les pierres du dix de Lily',fi:'Lilyn kymppikivet'},
    tLine:       {en:'Pull Lily back and let go. Going past ten? Stop on the Ten Stone first!',de:'Zieh Lily zurück und lass los. Geht es über die Zehn? Spring zuerst auf den Zehnerstein!',nl:'Trek Lily naar achteren en laat los. Ga je over de tien? Stop eerst op de tiensteen!',da:'Træk Lily tilbage og giv slip. Skal hun forbi ti? Stop på tistenen først!',sv:'Dra Lily bakåt och släpp. Ska hon förbi tio? Stanna på tiostenen först!',no:'Dra Lily bakover og slipp. Skal hun forbi ti? Stopp på tisteinen først!',es:'Jala a Lily hacia atrás y suéltala. ¿Vas a pasar el diez? ¡Primero detente en la piedra del diez!',it:'Tira indietro Lily e lasciala andare. Devi superare il dieci? Fermati prima sul sasso del dieci!',pt:'Puxe a Lily para trás e solte. Vai passar do dez? Pare primeiro na pedra do dez!',fr:'Tire Lily en arrière et lâche-la. Tu passes par-dessus dix ? Arrête-toi d’abord sur la pierre du dix !',fi:'Vedä Lilyä taaksepäin ja päästä irti. Menetkö kympin yli? Pysähdy ensin kymppikivelle!'},
    hPick:       {en:'Tap a shining stone to choose where Lily starts.',de:'Tipp auf einen leuchtenden Stein: Dort fängt Lily an.',nl:'Tik op een glanzende steen: daar begint Lily.',da:'Tryk på en skinnende sten: Der begynder Lily.',sv:'Tryck på en glänsande sten: där börjar Lily.',no:'Trykk på en skinnende stein: Der begynner Lily.',es:'Toca una piedra brillante para elegir dónde empieza Lily.',it:'Tocca un sasso luccicante per scegliere da dove parte Lily.',pt:'Toque numa pedra brilhante para escolher onde a Lily começa.',fr:'Touche une pierre brillante pour choisir où Lily commence.',fi:'Napauta kiiltävää kiveä: siitä Lily lähtee.'},
    hRope:       {en:'Lily still has beads on her rope. Keep leaping!',de:'Lily hat noch Perlen an ihrer Schnur. Spring weiter!',nl:'Lily heeft nog kralen aan haar touw. Spring verder!',da:'Lily har stadig perler på sin snor. Hop videre!',sv:'Lily har fortfarande pärlor på sitt snöre. Hoppa vidare!',no:'Lily har fortsatt perler på snoren sin. Hopp videre!',es:'Lily todavía tiene cuentas en su cuerda. ¡Sigue saltando!',it:'Lily ha ancora perline sulla sua cordicella. Continua a saltare!',pt:'A Lily ainda tem contas na corda. Continue pulando!',fr:'Lily a encore des perles sur sa ficelle. Continue à sauter !',fi:'Lilyn narussa on vielä helmiä. Hyppää lisää!'},
    hBankGo:     {en:'Lily has not reached the bank at 20 yet. Keep leaping!',de:'Lily ist noch nicht am Ufer bei 20. Spring weiter!',nl:'Lily is nog niet bij de oever bij 20. Spring verder!',da:'Lily er ikke nået til bredden ved 20 endnu. Hop videre!',sv:'Lily har inte kommit till stranden vid 20 än. Hoppa vidare!',no:'Lily har ikke kommet til bredden ved 20 ennå. Hopp videre!',es:'Lily todavía no llega a la orilla del 20. ¡Sigue saltando!',it:'Lily non è ancora arrivata alla riva del 20. Continua a saltare!',pt:'A Lily ainda não chegou à margem do 20. Continue pulando!',fr:'Lily n’est pas encore arrivée à la rive du 20. Continue à sauter !',fi:'Lily ei ole vielä rannalla luvun 20 kohdalla. Hyppää lisää!'},
    nSplash:     {en:'Splash! That stone is under water. Stop on the Ten Stone first.',de:'Platsch! Dieser Stein ist unter Wasser. Spring zuerst auf den Zehnerstein.',nl:'Plons! Die steen ligt onder water. Stop eerst op de tiensteen.',da:'Plask! Den sten er under vand. Stop på tistenen først.',sv:'Plask! Den stenen är under vattnet. Stanna på tiostenen först.',no:'Plask! Den steinen er under vann. Stopp på tisteinen først.',es:'¡Splash! Esa piedra está bajo el agua. Primero detente en la piedra del diez.',it:'Splash! Quel sasso è sott’acqua. Fermati prima sul sasso del dieci.',pt:'Tchibum! Essa pedra está debaixo d’água. Pare primeiro na pedra do dez.',fr:'Plouf ! Cette pierre est sous l’eau. Arrête-toi d’abord sur la pierre du dix.',fi:'Plumps! Se kivi on veden alla. Pysähdy ensin kymppikivelle.'},
    nReeds:      {en:'Splash! That is past the bank. Make a shorter leap.',de:'Platsch! Das ist hinter dem Ufer. Spring ein bisschen weniger weit.',nl:'Plons! Dat is voorbij de oever. Spring een beetje minder ver.',da:'Plask! Det er forbi bredden. Hop lidt kortere.',sv:'Plask! Det är förbi stranden. Hoppa lite kortare.',no:'Plask! Det er forbi bredden. Hopp litt kortere.',es:'¡Splash! Eso está más allá de la orilla. Salta un poco menos.',it:'Splash! È oltre la riva. Salta un po’ meno lontano.',pt:'Tchibum! Isso fica depois da margem. Pule um pouco menos.',fr:'Plouf ! C’est plus loin que la rive. Saute un peu moins loin.',fi:'Plumps! Se on rannan takana. Hyppää vähän lyhyemmälle.'},
    nRope:       {en:'Lily does not have that many beads left.',de:'So viele Perlen hat Lily nicht mehr.',nl:'Zoveel kralen heeft Lily niet meer.',da:'Så mange perler har Lily ikke tilbage.',sv:'Så många pärlor har Lily inte kvar.',no:'Så mange perler har ikke Lily igjen.',es:'A Lily ya no le quedan tantas cuentas.',it:'A Lily non restano così tante perline.',pt:'A Lily não tem mais tantas contas.',fr:'Il ne reste pas autant de perles à Lily.',fi:'Lilyllä ei ole enää niin montaa helmeä.'},
    nFar:        {en:'That leap is too long for Lily. Make two shorter leaps.',de:'So weit kann Lily nicht springen. Mach zwei kürzere Sprünge.',nl:'Zo ver kan Lily niet springen. Maak twee kortere sprongen.',da:'Så langt kan Lily ikke hoppe. Lav to kortere hop.',sv:'Så långt kan Lily inte hoppa. Gör två kortare hopp.',no:'Så langt kan ikke Lily hoppe. Ta to kortere hopp.',es:'Lily no puede saltar tan lejos. Haz dos saltos más cortos.',it:'Lily non può saltare così lontano. Fai due salti più corti.',pt:'A Lily não consegue pular tão longe. Faça dois pulos mais curtos.',fr:'Lily ne peut pas sauter si loin. Fais deux sauts plus courts.',fi:'Lily ei jaksa hypätä noin pitkälle. Tee kaksi lyhyempää hyppyä.'},
    nTen:        {en:'The Ten Stone! The stones on the other side are up now.',de:'Der Zehnerstein! Jetzt sind die Steine auf der anderen Seite aufgetaucht.',nl:'De tiensteen! Nu zijn de stenen aan de andere kant boven water.',da:'Tistenen! Nu er stenene på den anden side kommet op af vandet.',sv:'Tiostenen! Nu har stenarna på andra sidan kommit upp.',no:'Tisteinen! Nå har steinene på den andre siden kommet opp.',es:'¡La piedra del diez! Ya salieron las piedras del otro lado.',it:'Il sasso del dieci! Ora i sassi dall’altra parte sono emersi.',pt:'A pedra do dez! Agora as pedras do outro lado saíram da água.',fr:'La pierre du dix ! Les pierres de l’autre côté sont sorties de l’eau.',fi:'Kymppikivi! Nyt toisen puolen kivet ovat nousseet pintaan.'},
    hType:       {en:'Which stone is Lily on? Type it.',de:'Auf welchem Stein sitzt Lily? Tipp die Zahl ein.',nl:'Op welke steen zit Lily? Typ het getal.',da:'Hvilken sten sidder Lily på? Skriv tallet.',sv:'Vilken sten sitter Lily på? Skriv talet.',no:'Hvilken stein sitter Lily på? Skriv tallet.',es:'¿En qué piedra está Lily? Escribe el número.',it:'Su quale sasso è Lily? Scrivi il numero.',pt:'Em que pedra a Lily está? Digite o número.',fr:'Sur quelle pierre est Lily ? Tape le nombre.',fi:'Millä kivellä Lily on? Kirjoita luku.'},
    hTypeBank:   {en:'How far did Lily leap altogether? Type it.',de:'Wie weit ist Lily insgesamt gesprungen? Tipp die Zahl ein.',nl:'Hoe ver is Lily in totaal gesprongen? Typ het getal.',da:'Hvor langt hoppede Lily i alt? Skriv tallet.',sv:'Hur långt hoppade Lily sammanlagt? Skriv talet.',no:'Hvor langt hoppet Lily til sammen? Skriv tallet.',es:'¿Cuánto saltó Lily en total? Escribe el número.',it:'Quanto ha saltato Lily in tutto? Scrivi il numero.',pt:'Quanto a Lily pulou ao todo? Digite o número.',fr:'De combien Lily a-t-elle sauté en tout ? Tape le nombre.',fi:'Kuinka pitkälle Lily hyppäsi yhteensä? Kirjoita luku.'},
    hOn:         {en:'Count on from the Ten Stone to Lily.',de:'Zähl vom Zehnerstein weiter bis zu Lily.',nl:'Tel door vanaf de tiensteen tot Lily.',da:'Tæl videre fra tistenen hen til Lily.',sv:'Räkna vidare från tiostenen fram till Lily.',no:'Tell videre fra tisteinen fram til Lily.',es:'Cuenta hacia adelante desde la piedra del diez hasta Lily.',it:'Conta in avanti dal sasso del dieci fino a Lily.',pt:'Conte para a frente da pedra do dez até a Lily.',fr:'Compte en avançant de la pierre du dix jusqu’à Lily.',fi:'Laske eteenpäin kymppikiveltä Lilyyn asti.'},
    hBack:       {en:'Count back from the Ten Stone to Lily.',de:'Zähl vom Zehnerstein zurück bis zu Lily.',nl:'Tel terug vanaf de tiensteen tot Lily.',da:'Tæl tilbage fra tistenen hen til Lily.',sv:'Räkna bakåt från tiostenen fram till Lily.',no:'Tell bakover fra tisteinen fram til Lily.',es:'Cuenta hacia atrás desde la piedra del diez hasta Lily.',it:'Conta all’indietro dal sasso del dieci fino a Lily.',pt:'Conte para trás da pedra do dez até a Lily.',fr:'Compte en reculant de la pierre du dix jusqu’à Lily.',fi:'Laske taaksepäin kymppikiveltä Lilyyn asti.'},
    hNear:       {en:'Count from the nearest numbered stone to Lily.',de:'Zähl von der Zahl, die Lily am nächsten ist, bis zu Lily.',nl:'Tel vanaf de dichtstbijzijnde steen met een getal tot Lily.',da:'Tæl fra den nærmeste sten med et tal hen til Lily.',sv:'Räkna från den närmaste stenen med ett tal fram till Lily.',no:'Tell fra den nærmeste steinen med et tall fram til Lily.',es:'Cuenta desde la piedra con número más cercana hasta Lily.',it:'Conta dal sasso con il numero più vicino fino a Lily.',pt:'Conte da pedra com número mais perto até a Lily.',fr:'Compte à partir de la pierre numérotée la plus proche jusqu’à Lily.',fi:'Laske lähimmästä numeroidusta kivestä Lilyyn asti.'},
    hTenOn:      {en:'Ten and {r} more is …?',de:'Zehn und noch {r} sind …?',nl:'Tien en nog {r} is …?',da:'Ti og {r} mere er …?',sv:'Tio och {r} till är …?',no:'Ti og {r} til er …?',es:'¿Diez y {r} más son …?',it:'Dieci e ancora {r} fa …?',pt:'Dez e mais {r} são …?',fr:'Dix et encore {r}, ça fait … ?',fi:'Kymmenen ja vielä {r} on …?'},
    hTenBack:    {en:'Ten take away {r} is …?',de:'Zehn weniger {r} sind …?',nl:'Tien min {r} is …?',da:'Ti minus {r} er …?',sv:'Tio minus {r} är …?',no:'Ti minus {r} er …?',es:'¿Diez menos {r} son …?',it:'Dieci meno {r} fa …?',pt:'Dez menos {r} são …?',fr:'Dix moins {r}, ça fait … ?',fi:'Kymmenen miinus {r} on …?'},
    hBankMiss:   {en:'Add up Lily’s leaps: how far did she go altogether?',de:'Rechne Lilys Sprünge zusammen: Wie weit ist sie insgesamt gesprungen?',nl:'Tel de sprongen van Lily op: hoe ver ging ze in totaal?',da:'Læg Lilys hop sammen: Hvor langt nåede hun i alt?',sv:'Lägg ihop Lilys hopp: hur långt kom hon sammanlagt?',no:'Legg sammen hoppene til Lily: Hvor langt kom hun til sammen?',es:'Suma los saltos de Lily: ¿cuánto avanzó en total?',it:'Somma i salti di Lily: quanto ha fatto in tutto?',pt:'Some os pulos da Lily: quanto ela andou ao todo?',fr:'Additionne les sauts de Lily : de combien a-t-elle avancé en tout ?',fi:'Laske Lilyn hypyt yhteen: kuinka pitkälle hän pääsi yhteensä?'},
    okAdd:       {en:'{a} + {p} = 10, 10 + {r} = {s} — so {a} + {b} = {s}!',de:'{a} + {p} = 10, 10 + {r} = {s} – also {a} + {b} = {s}!',nl:'{a} + {p} = 10, 10 + {r} = {s} – dus {a} + {b} = {s}!',da:'{a} + {p} = 10, 10 + {r} = {s} – altså {a} + {b} = {s}!',sv:'{a} + {p} = 10, 10 + {r} = {s} – alltså {a} + {b} = {s}!',no:'{a} + {p} = 10, 10 + {r} = {s} – altså {a} + {b} = {s}!',es:'{a} + {p} = 10, 10 + {r} = {s}: entonces, ¡{a} + {b} = {s}!',it:'{a} + {p} = 10, 10 + {r} = {s}: quindi {a} + {b} = {s}!',pt:'{a} + {p} = 10, 10 + {r} = {s}: então {a} + {b} = {s}!',fr:'{a} + {p} = 10, 10 + {r} = {s} : donc {a} + {b} = {s} !',fi:'{a} + {p} = 10, 10 + {r} = {s} – siis {a} + {b} = {s}!'},
    okSub:       {en:'{a} − {p} = 10, 10 − {r} = {s} — so {a} − {b} = {s}!',de:'{a} − {p} = 10, 10 − {r} = {s} – also {a} − {b} = {s}!',nl:'{a} − {p} = 10, 10 − {r} = {s} – dus {a} − {b} = {s}!',da:'{a} − {p} = 10, 10 − {r} = {s} – altså {a} − {b} = {s}!',sv:'{a} − {p} = 10, 10 − {r} = {s} – alltså {a} − {b} = {s}!',no:'{a} − {p} = 10, 10 − {r} = {s} – altså {a} − {b} = {s}!',es:'{a} − {p} = 10, 10 − {r} = {s}: entonces, ¡{a} − {b} = {s}!',it:'{a} − {p} = 10, 10 − {r} = {s}: quindi {a} − {b} = {s}!',pt:'{a} − {p} = 10, 10 − {r} = {s}: então {a} − {b} = {s}!',fr:'{a} − {p} = 10, 10 − {r} = {s} : donc {a} − {b} = {s} !',fi:'{a} − {p} = 10, 10 − {r} = {s} – siis {a} − {b} = {s}!'},
    okPlainAdd:  {en:'{a} + {b} = {s}!',de:'{a} + {b} = {s}!',nl:'{a} + {b} = {s}!',da:'{a} + {b} = {s}!',sv:'{a} + {b} = {s}!',no:'{a} + {b} = {s}!',es:'¡{a} + {b} = {s}!',it:'{a} + {b} = {s}!',pt:'{a} + {b} = {s}!',fr:'{a} + {b} = {s} !',fi:'{a} + {b} = {s}!'},
    okPlainSub:  {en:'{a} − {b} = {s}!',de:'{a} − {b} = {s}!',nl:'{a} − {b} = {s}!',da:'{a} − {b} = {s}!',sv:'{a} − {b} = {s}!',no:'{a} − {b} = {s}!',es:'¡{a} − {b} = {s}!',it:'{a} − {b} = {s}!',pt:'{a} − {b} = {s}!',fr:'{a} − {b} = {s} !',fi:'{a} − {b} = {s}!'},
    okRel:       {en:'The same stones as {s} + {b} = {a}, the other way!',de:'Dieselben Steine wie bei {s} + {b} = {a}, nur andersherum!',nl:'Dezelfde stenen als bij {s} + {b} = {a}, maar dan andersom!',da:'De samme sten som i {s} + {b} = {a}, bare den anden vej!',sv:'Samma stenar som i {s} + {b} = {a}, fast åt andra hållet!',no:'De samme steinene som i {s} + {b} = {a}, bare motsatt vei!',es:'¡Las mismas piedras que en {s} + {b} = {a}, pero al revés!',it:'Gli stessi sassi di {s} + {b} = {a}, ma al contrario!',pt:'As mesmas pedras de {s} + {b} = {a}, só que ao contrário!',fr:'Les mêmes pierres que pour {s} + {b} = {a}, mais dans l’autre sens !',fi:'Samat kivet kuin laskussa {s} + {b} = {a}, mutta toiseen suuntaan!'},
    okShort:     {en:'Starting on {big} was the shorter way!',de:'Bei {big} anzufangen war der kürzere Weg!',nl:'Beginnen bij {big} was de kortste weg!',da:'At starte på {big} var den korteste vej!',sv:'Att börja på {big} var den kortare vägen!',no:'Å starte på {big} var den korteste veien!',es:'¡Empezar en el {big} fue el camino más corto!',it:'Partire da {big} era la strada più corta!',pt:'Começar no {big} foi o caminho mais curto!',fr:'Commencer sur le {big}, c’était le chemin le plus court !',fi:'Luvusta {big} aloittaminen oli lyhyempi reitti!'},
    okBank:      {en:'{k} + {n} = 20!',de:'{k} + {n} = 20!',nl:'{k} + {n} = 20!',da:'{k} + {n} = 20!',sv:'{k} + {n} = 20!',no:'{k} + {n} = 20!',es:'¡{k} + {n} = 20!',it:'{k} + {n} = 20!',pt:'{k} + {n} = 20!',fr:'{k} + {n} = 20 !',fi:'{k} + {n} = 20!'},
    setFacts:    {en:'Facts',de:'Aufgaben',nl:'Sommen',da:'Regnestykker',sv:'Uppgifter',no:'Regnestykker',es:'Operaciones',it:'Operazioni',pt:'Operações',fr:'Calculs',fi:'Laskut'},
    fAdd:        {en:'Adding',de:'Plus',nl:'Optellen',da:'Plus',sv:'Addition',no:'Addisjon',es:'Sumas',it:'Addizioni',pt:'Somas',fr:'Additions',fi:'Yhteenlasku'},
    fBoth:       {en:'Adding and taking away',de:'Plus und Minus',nl:'Optellen en aftrekken',da:'Plus og minus',sv:'Addition och subtraktion',no:'Addisjon og subtraksjon',es:'Sumas y restas',it:'Addizioni e sottrazioni',pt:'Somas e subtrações',fr:'Additions et soustractions',fi:'Yhteen- ja vähennyslasku'},
    setLabels:   {en:'Stone numbers',de:'Zahlen an den Steinen',nl:'Getallen bij de stenen',da:'Tal ved stenene',sv:'Tal vid stenarna',no:'Tall ved steinene',es:'Números de las piedras',it:'Numeri dei sassi',pt:'Números das pedras',fr:'Nombres des pierres',fi:'Kivien luvut'},
    lFive:       {en:'Every 5',de:'Jede 5.',nl:'Om de 5',da:'Hver 5.',sv:'Var 5:e',no:'Hver 5.',es:'Cada 5',it:'Ogni 5',pt:'De 5 em 5',fr:'Tous les 5',fi:'Joka viides'},
    lAll:        {en:'Every stone',de:'Jeder Stein',nl:'Elke steen',da:'Hver sten',sv:'Varje sten',no:'Hver stein',es:'Todas las piedras',it:'Ogni sasso',pt:'Todas as pedras',fr:'Chaque pierre',fi:'Jokainen kivi'},
    ariaLily:    {en:'Lily is on stone {n}. Beads on the rope: {r}.',de:'Lily sitzt auf Stein {n}. Perlen an der Schnur: {r}.',nl:'Lily zit op steen {n}. Kralen aan het touw: {r}.',da:'Lily sidder på sten {n}. Perler på snoren: {r}.',sv:'Lily sitter på sten {n}. Pärlor på snöret: {r}.',no:'Lily sitter på stein {n}. Perler på snoren: {r}.',es:'Lily está en la piedra {n}. Cuentas en la cuerda: {r}.',it:'Lily è sul sasso {n}. Perline sulla cordicella: {r}.',pt:'A Lily está na pedra {n}. Contas na corda: {r}.',fr:'Lily est sur la pierre {n}. Perles sur la ficelle : {r}.',fi:'Lily on kivellä {n}. Helmiä narussa: {r}.'},
    ariaLilyBank:{en:'Lily is on stone {n}.',de:'Lily sitzt auf Stein {n}.',nl:'Lily zit op steen {n}.',da:'Lily sidder på sten {n}.',sv:'Lily sitter på sten {n}.',no:'Lily sitter på stein {n}.',es:'Lily está en la piedra {n}.',it:'Lily è sul sasso {n}.',pt:'A Lily está na pedra {n}.',fr:'Lily est sur la pierre {n}.',fi:'Lily on kivellä {n}.'},
    ariaPad:     {en:'Lily is waiting on a lily pad.',de:'Lily wartet auf einem Seerosenblatt.',nl:'Lily wacht op een waterleliblad.',da:'Lily venter på et åkandeblad.',sv:'Lily väntar på ett näckrosblad.',no:'Lily venter på et nøkkeroseblad.',es:'Lily espera en una hoja de nenúfar.',it:'Lily aspetta su una foglia di ninfea.',pt:'A Lily espera numa folha de vitória-régia.',fr:'Lily attend sur une feuille de nénuphar.',fi:'Lily odottaa lumpeenlehdellä.'},
    ariaUndo:    {en:'Back one leap',de:'Einen Sprung zurück',nl:'Eén sprong terug',da:'Ét hop tilbage',sv:'Ett hopp tillbaka',no:'Ett hopp tilbake',es:'Un salto atrás',it:'Un salto indietro',pt:'Um pulo para trás',fr:'Un saut en arrière',fi:'Yksi hyppy takaisin'},
    ariaCheck:   {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    ariaDel:     {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'},
    ariaAnswer:  {en:'Your answer: {n}',de:'Deine Antwort: {n}',nl:'Jouw antwoord: {n}',da:'Dit svar: {n}',sv:'Ditt svar: {n}',no:'Svaret ditt: {n}',es:'Tu respuesta: {n}',it:'La tua risposta: {n}',pt:'Sua resposta: {n}',fr:'Ta réponse : {n}',fi:'Vastauksesi: {n}'}
  },/*STRINGS-END*/

  defaults: { facts: 'both', labels: 'five' },
  settings: [
    { key: 'facts', type: 'choice', labelKey: 'setFacts', options: [{ value: 'add', labelKey: 'fAdd' }, { value: 'both', labelKey: 'fBoth' }] },
    { key: 'labels', type: 'choice', labelKey: 'setLabels', options: [{ value: 'five', labelKey: 'lFive' }, { value: 'all', labelKey: 'lAll' }] }
  ],
  OK_MS: 3800, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._view = {}; this._coil = 0; this._pics = null;
    injectStonesCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') LCSPictures.load('pets').then(function (th) { self._pics = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return SunkenStonesCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return SunkenStonesCore.levelOf(this._setting('facts')); },
  _key: function () { return this._level(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = SunkenStonesCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SunkenStonesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), Math.random, prev);
      this._order = p.order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._t('tLine') }; this._pa = pa;
    return {
      id: 'stones.' + this._loc() + '.' + this._level() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx) {
    var C = SunkenStonesCore;
    this._clearTimers(); this._view = {}; this._coil = 0;
    this.st = C.newState(C.round(this._level(), idx));
    var line = this._t('tLine'); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this._start(0);
    this._render2();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sk-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="sk-eq" aria-live="polite"></div><div class="sk-rope" aria-hidden="true"></div><div class="sk-pond" role="group"></div><div class="sk-tools"><button type="button" class="sk-tbtn" data-k="undo"></button></div><p class="sk-note" aria-live="polite"></p><div class="sk-keys" role="group"></div>';
    this._q = function (s) { return wrap.querySelector(s); };
    var un = this._q('[data-k="undo"]');
    un.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 9 4 15l6 6" fill="none" stroke="#146B5E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15h13a8 8 0 0 1 0 16h-3" fill="none" stroke="#146B5E" stroke-width="3.5" stroke-linecap="round"/></svg>';
    un.setAttribute('aria-label', this._t('ariaUndo'));
    un.addEventListener('click', function () { if (SunkenStonesCore.undo(self.st)) { self._view = {}; self.api.sound(380); self._paint(); } });
    wrap.addEventListener('keydown', function (e) {
      if (e.target && e.target.getAttribute && e.target.getAttribute('data-k') === 'lily') return;
      if (/^[0-9]$/.test(e.key)) { self._type(e.key); e.preventDefault(); }
      else if (e.key === 'Backspace') { self._type('del'); e.preventDefault(); }
      else if (e.key === 'u' || e.key === 'U') { if (SunkenStonesCore.undo(self.st)) { self._view = {}; self._paint(); } e.preventDefault(); }
      else if (e.key === 'Enter') { self._check(); e.preventDefault(); }
    });
    var pond = this._q('.sk-pond');
    pond.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-k="lily"]')) return;
      var st = self.st, G = self._G; if (!G || st.done) return;
      var rb = pond.getBoundingClientRect(), x = e.clientX - rb.left, n = Math.round((x - G.m) / G.pitch) + G.lo;
      if (n < G.lo || n > G.hi || Math.abs(G.x(n) - x) > Math.max(G.pitch * 0.6, 14)) return;
      if (st.lily == null) { if (SunkenStonesCore.chooseStart(st, n)) { self._view = {}; self.api.sound(520); self._paint(); } return; }
      self._leapResult(SunkenStonesCore.leapTo(st, n), n);
    });
    var keys = this._q('.sk-keys');
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del', 'ok'].forEach(function (k) {
      var b = api.el('button', 'sk-key' + (k === 'ok' ? ' is-ok' : k === 'del' ? ' is-del' : '')); b.type = 'button'; b.setAttribute('data-k', 'key-' + k);
      if (k === 'ok') { b.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 17l6 6 12-14" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'; b.setAttribute('aria-label', self._t('ariaCheck')); }
      else if (k === 'del') { b.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 8h14v16H12l-7-8z" fill="none" stroke="#146B5E" stroke-width="3" stroke-linejoin="round"/><path d="M15 13l6 6M21 13l-6 6" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/></svg>'; b.setAttribute('aria-label', self._t('ariaDel')); }
      else b.textContent = k;
      b.addEventListener('click', function () { if (k === 'ok') self._check(); else self._type(k); });
      keys.appendChild(b);
    });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  /* the pond's geometry: which stones are drawn and where */
  _geom: function (W) {
    var C = SunkenStonesCore, r = this.st.r, narrow = W < 620, ZW = Math.min(W, 660), win = narrow ? C.reach(r) : { lo: 0, hi: 20 };
    if (r.kind === 'bank') win.hi = 20;
    var m = narrow ? 18 : 22, pitch = (ZW - 2 * m) / (win.hi - win.lo), lily = narrow ? (W < 340 ? 64 : 72) : 96;
    var stone = Math.max(14, Math.min(28, pitch * 0.82)), H = lily + (narrow ? 70 : 84), sy = H - (narrow ? 34 : 40);
    return { narrow: narrow, ZW: ZW, lo: win.lo, hi: win.hi, m: m, pitch: pitch, stone: stone, lilyPx: lily, H: H, sy: sy, bead: Math.max(22, Math.min(31, pitch)),
      x: function (n) { return m + (n - win.lo) * pitch; } };
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = SunkenStonesCore, st = this.st, r = st.r, G = this._G = this._geom(this._width()), v = this._view, self = this, bank = r.kind === 'bank';
    this._wrap.className = 'sk-wrap is-' + (G.narrow ? 'narrow' : 'wide') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    /* ---- the equation strip: the leaps as they are made ---- */
    var box = '<span class="sk-ans' + (st.done ? ' is-ok' : '') + '" aria-label="' + this._t('ariaAnswer', { n: st.typed || '–' }) + '">' + (st.typed || '') + '</span>', op = r.dir > 0 ? ' + ' : ' − ', eq = '';
    if (bank) eq = '<span>' + r.a + ' + </span>' + box + '<span> = 20</span>';
    else if (!st.leaps.length) eq = '<span>' + (r.kind === 'anchor' && st.start != null ? st.start + op + st.rope : r.a + op + r.b) + ' = </span>' + box;
    else st.leaps.forEach(function (n, i) {
      var last = i === st.leaps.length - 1, fin = last && C.finished(st);
      eq += '<span class="sk-seg">' + st.stops[i] + op + n + ' = ' + (fin ? '' : st.stops[i + 1]) + '</span>' + (fin ? box : '');
    });
    this._q('.sk-eq').innerHTML = eq;
    /* ---- the bead rope ---- */
    var rope = this._q('.sk-rope'), left = st.rope == null ? 0 : st.rope - (this._coil || 0);
    rope.hidden = bank || st.rope == null || (left <= 0 && !this._coil);   /* an empty rope is gone, not a stray cord */
    var bs = G.narrow ? 16 : 22, rs = '';
    if (!rope.hidden) { var rw = Math.max(1, left) * (bs + 4) + 24; rs = '<svg width="' + rw + '" height="' + (bs + 8) + '" viewBox="0 0 ' + rw + ' ' + (bs + 8) + '"><line x1="4" y1="' + (bs / 2 + 4) + '" x2="' + (rw - 4) + '" y2="' + (bs / 2 + 4) + '" class="sk-cord"/>'; for (var i = 0; i < left; i++) rs += '<circle cx="' + (14 + i * (bs + 4) + bs / 2) + '" cy="' + (bs / 2 + 4) + '" r="' + (bs / 2) + '" class="sk-bead' + (r.dir > 0 ? ' is-add' : ' is-sub') + (v.glint ? ' is-glint' : '') + '"/>'; rs += '</svg>'; }
    rope.innerHTML = rs;
    /* ---- the pond ---- */
    var pond = this._q('.sk-pond'); pond.innerHTML = ''; pond.style.width = G.ZW + 'px'; pond.style.height = G.H + 'px';
    var s = '<svg class="sk-water" width="' + G.ZW + '" height="' + G.H + '" viewBox="0 0 ' + G.ZW + ' ' + G.H + '" aria-hidden="true"><defs><linearGradient id="skw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D3EEF4"/><stop offset="1" stop-color="#9FD3E0"/></linearGradient></defs>';
    s += '<rect x="0" y="' + (G.H * 0.28) + '" width="' + G.ZW + '" height="' + (G.H * 0.72) + '" rx="18" fill="url(#skw)"/>';
    for (var w = 0; w < 3; w++) s += '<path d="M' + (20 + w * 160) + ' ' + (G.H * 0.5 + w * 9) + ' q 20 -6 40 0 t 40 0" class="sk-ripple"/>';
    if (bank) s += '<rect x="' + (G.x(20) - G.pitch * 0.5) + '" y="' + (G.H * 0.28) + '" width="' + (G.ZW - G.x(20) + G.pitch * 0.5) + '" height="' + (G.H * 0.72) + '" rx="12" class="sk-bank"/>';
    var gh = this._ghost(G), labels = this._setting('labels') === 'all';
    for (var n = G.lo; n <= G.hi; n++) {
      var x = G.x(n), ten = n === 10, sz = ten ? G.stone * 1.22 : G.stone, sunk = C.sunken(st, n), pick = st.lily == null && r.starts.indexOf(n) >= 0;
      s += '<ellipse cx="' + x.toFixed(1) + '" cy="' + G.sy + '" rx="' + (sz / 2).toFixed(1) + '" ry="' + (sz * 0.46).toFixed(1) + '" class="sk-stone' + (ten ? ' is-ten' : '') + (sunk ? ' is-sunk' : '') + (v.rise && !sunk && C.side(n) !== C.side(st.stops[0]) ? ' is-rise' : '') + (pick ? ' is-pick' : '') + (st.lily === n && st.show >= 1 ? ' is-pulse' : '') + '" style="animation-delay:' + (Math.abs(n - 10) * 40) + 'ms"/>';
      if (sunk) s += '<path d="M' + (x - sz * 0.5) + ' ' + (G.sy - 3) + ' q ' + (sz * 0.25) + ' -4 ' + (sz * 0.5) + ' 0 t ' + (sz * 0.5) + ' 0" class="sk-over"/>';
      if (labels || n % 5 === 0 || (G.narrow && n === G.lo)) s += '<text x="' + x.toFixed(1) + '" y="' + (G.sy + sz * 0.46 + (G.narrow ? 16 : 20)) + '" class="sk-lab' + (ten ? ' is-ten' : '') + '" font-size="' + (G.narrow ? 14 : 18) + '">' + n + '</text>';
      if (gh[n] != null) s += '<text x="' + x.toFixed(1) + '" y="' + (G.sy - sz * 0.46 - 8) + '" class="sk-ghost" font-size="' + (G.narrow ? 13 : 16) + '">' + gh[n] + '</text>';
    }
    /* miss 2 (and bank misses): the leaps as arcs with their lengths */
    if (st.show >= 2 || (bank && st.show >= 1)) st.leaps.forEach(function (len, i) {   /* a lone arc is drawn without its length: that number would be the answer */
      var x1 = G.x(st.stops[i]), x2 = G.x(st.stops[i + 1]), hgt = Math.min(G.H * 0.42, 22 + Math.abs(x2 - x1) * 0.25), y0 = G.sy - G.stone * 0.4;
      s += '<path d="M' + x1 + ' ' + y0 + ' Q ' + ((x1 + x2) / 2) + ' ' + (y0 - hgt * 2) + ' ' + x2 + ' ' + y0 + '" class="sk-arc"/>' + (st.leaps.length >= 2 ? '<text x="' + ((x1 + x2) / 2) + '" y="' + (y0 - hgt - 6) + '" class="sk-arclab" font-size="' + (G.narrow ? 15 : 18) + '">' + len + '</text>' : '');
    });
    /* the splash ring */
    if (v.splash != null && v.splash >= G.lo && v.splash <= G.hi) s += '<circle cx="' + G.x(v.splash) + '" cy="' + G.sy + '" r="' + G.stone + '" class="sk-splash"/>';
    /* the pull preview: where the coil would send Lily */
    if (this._coil && st.lily != null) { var tx = st.lily + r.dir * this._coil; if (tx >= G.lo && tx <= G.hi) s += '<ellipse cx="' + G.x(tx) + '" cy="' + G.sy + '" rx="' + (G.stone * 0.7) + '" ry="' + (G.stone * 0.45) + '" class="sk-aim"/>'; }
    s += '</svg>'; pond.innerHTML = s;
    /* the lily pad (anchor rounds, before a start is chosen) */
    if (st.lily == null) { var pad = this.api.el('span', 'sk-pad'); pad.style.cssText = 'left:' + (G.ZW / 2 - G.lilyPx * 0.6) + 'px;top:' + (G.H * 0.3) + 'px;width:' + (G.lilyPx * 1.2) + 'px;height:' + (G.lilyPx * 0.5) + 'px;'; pond.appendChild(pad); }
    /* Lily */
    var L = this.api.el('button', 'sk-lily' + (v.hop ? ' is-hop' : '') + (v.splash != null ? ' is-wet' : '') + (st.done ? ' is-happy' : '')); L.type = 'button'; L.setAttribute('data-k', 'lily');
    var lx = st.lily == null ? G.ZW / 2 : Math.max(G.lilyPx / 2, Math.min(G.ZW - G.lilyPx / 2, G.x(st.lily))), ly = st.lily == null ? G.H * 0.3 - G.lilyPx * 0.62 : G.sy - G.stone * 0.3 - G.lilyPx;
    L.style.cssText = 'left:' + (lx - G.lilyPx / 2) + 'px;top:' + ly + 'px;width:' + G.lilyPx + 'px;height:' + G.lilyPx + 'px;';
    L.setAttribute('aria-label', st.lily == null ? this._t('ariaPad') : bank || st.rope == null ? this._t('ariaLilyBank', { n: st.lily }) : this._t('ariaLily', { n: st.lily, r: st.rope }));
    if (this._pics && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(this._pics, 'frog', this._loc(), { size: G.lilyPx }); im.className = 'sk-frog' + (r.dir > 0 ? ' is-right' : ''); im.alt = ''; im.style.width = G.lilyPx + 'px'; im.style.height = G.lilyPx + 'px'; L.appendChild(im); }
    L.disabled = st.done;
    this._wireLily(L, G);
    pond.appendChild(L);
    /* the coil: beads pulled off the rope, behind Lily */
    if (this._coil && st.lily != null) {
      var cw = Math.min(this._coil * G.bead, G.ZW), cx0 = r.dir > 0 ? lx - G.lilyPx * 0.35 - cw : lx + G.lilyPx * 0.35, cy = G.sy - G.lilyPx * 0.45, cs = '<svg class="sk-coil" style="left:' + cx0 + 'px;top:' + (cy - 14) + 'px" width="' + cw + '" height="28" viewBox="0 0 ' + cw + ' 28" aria-hidden="true"><path d="M0 14 ' + Array.from({ length: this._coil * 2 }, function (_, k) { return 'L ' + ((k + 1) * cw / (self._coil * 2)).toFixed(1) + ' ' + (k % 2 ? 14 : 4); }).join(' ') + '" class="sk-spring"/>';
      for (var c = 0; c < this._coil; c++) cs += '<circle cx="' + ((c + 0.5) * cw / this._coil).toFixed(1) + '" cy="20" r="' + Math.min(8, G.bead * 0.3) + '" class="sk-bead' + (r.dir > 0 ? ' is-add' : ' is-sub') + '"/>';
      cs += '</svg>'; pond.insertAdjacentHTML('beforeend', cs);
    }
    /* ---- tools, keys, note ---- */
    this._q('[data-k="undo"]').disabled = st.done || !st.leaps.length;
    var fin = C.finished(st);
    [].forEach.call(this._wrap.querySelectorAll('.sk-key'), function (k) { var key = k.getAttribute('data-k'); k.disabled = st.done || (!fin && key !== 'key-ok'); });
    var note = this._q('.sk-note'), hk = C.hint(st), txt = '', cls = 'sk-note', last = st.leaps.length ? st.leaps[st.leaps.length - 1] : 0;
    if (st.done && v.msg) { txt = v.msg; cls += ' is-ok'; }
    else if (hk) { txt = this._t(hk, { r: Math.abs(st.lily - 10) }); cls += (hk === 'nTen' || hk === 'hType' || hk === 'hTypeBank') ? ' is-ok' : ' is-hint'; }
    else if (st.lily == null) { txt = this._t('hPick'); cls += ' is-ok'; }
    note.className = cls; note.textContent = txt;
  },
  /* miss 1: ghost numerals counting from the ten (or the nearest label) toward Lily, stopping before her stone */
  _ghost: function (G) {
    var st = this.st, out = {}; if (st.show < 1 || st.r.kind === 'bank' || st.lily == null) return out;
    var C = SunkenStonesCore, from = C.viaTen(st) ? 10 : Math.round(st.lily / 5) * 5, dir = st.lily > from ? 1 : -1;
    if (from === st.lily) return out;
    for (var n = from + dir; n !== st.lily; n += dir) out[n] = n;
    return out;
  },
  /* pull Lily back like a slingshot: one bead per stone-width of pull, the opposite way of the leap */
  _wireLily: function (L, G) {
    var self = this;
    /* the drag is followed on the window: the pond is redrawn while pulling, which would drop a pointer capture on Lily */
    L.addEventListener('pointerdown', function (e) {
      var st = self.st; if (st.done || st.lily == null || SunkenStonesCore.finished(st)) return;
      var x0 = e.clientX, id = e.pointerId; e.preventDefault();
      var move = function (ev) {
        if (ev.pointerId !== id) return; var pull = (x0 - ev.clientX) * self.st.r.dir, n = Math.max(0, Math.min(SunkenStonesCore.maxLeap(self.st), Math.round(pull / self._G.bead)));
        if (n !== self._coil) { self._coil = n; if (n) self.api.sound(500 + n * 40); self._paint(); }
      };
      var up = function (ev) {
        if (ev.pointerId !== id) return; window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        var n = self._coil; self._coil = 0; if (ev.type === 'pointerup' && n > 0) self._leapBy(n); else self._paint();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
    L.addEventListener('keydown', function (e) {
      var st = self.st, C = SunkenStonesCore;
      if (st.lily == null && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter')) { if (e.key === 'Enter') { var s0 = st.r.starts[self._pickIdx || 0]; if (C.chooseStart(st, s0)) { self._view = {}; self._paint(); } } else { self._pickIdx = ((self._pickIdx || 0) + 1) % st.r.starts.length; } e.preventDefault(); return; }
      if (e.key === 'ArrowUp') { self._coil = Math.min(C.maxLeap(st) || 0, (self._coil || 0) + 1); self._paint(); e.preventDefault(); }
      else if (e.key === 'ArrowDown') { self._coil = Math.max(0, (self._coil || 0) - 1); self._paint(); e.preventDefault(); }
      else if (e.key === 'Enter' || e.key === ' ') { var n = self._coil; self._coil = 0; if (n > 0) self._leapBy(n); else self._check(); e.preventDefault(); }
    });
  },
  _leapBy: function (n) { var st = this.st, t = st.lily + st.r.dir * n; this._leapResult(SunkenStonesCore.leap(st, n), t); },
  /* what a leap did: a hop, the stones rising at ten, or a splash ring where Lily went under */
  _leapResult: function (res, target) {
    var st = this.st, self = this;
    if (!res) return;
    this._view = {};
    if (res === 'splash' || res === 'reeds') { this._view.splash = Math.max(0, Math.min(20, target)); this.api.sound(160); }
    else if (res === 'rope') this.api.sound(240);
    else { this._view.hop = true; this.api.sound(640); if (res === 'ten') { this._view.rise = true; for (var k = 0; k < 6; k++) (function (k) { self._later(function () { self.api.sound(700 + k * 60); }, self._ms(40 * k)); })(k); } }
    this._paint(); this.api.announce(this._q('.sk-note').textContent || '');
    if (res === 'land' || res === 'ten') { if (SunkenStonesCore.finished(st)) { var kk = this._q('.sk-keys'); if (kk && kk.scrollIntoView) kk.scrollIntoView({ block: 'nearest' }); } }
  },
  _type: function (k) { if (this.st.done) return; if (SunkenStonesCore.type(this.st, k)) { this._view = {}; this.api.sound(560); this._paint(); } },
  _check: function () {
    var C = SunkenStonesCore, st = this.st, r = st.r, self = this;
    if (st.done) return;
    var res = C.check(st);
    this._view = {};
    if (!res.ok) { if (res.reason === 'go') this._view.glint = true; this.api.sound(res.reason === 'miss' ? 220 : 460); this._paint(); this.api.announce(this._q('.sk-note').textContent || ''); var kk = this._q('.sk-keys'); if (kk && kk.scrollIntoView) kk.scrollIntoView({ block: 'nearest' }); return; }
    var msg, s0 = st.stops[0], b = r.kind === 'anchor' ? C.ropeFor(r, s0) : r.b;
    if (r.kind === 'bank') msg = this._t('okBank', { k: r.a, n: r.answer });
    else if (C.viaTen(st) && st.leaps.length === 2) msg = this._t(r.dir > 0 ? 'okAdd' : 'okSub', { a: s0, p: st.leaps[0], r: st.leaps[1], s: r.answer, b: b });
    else msg = this._t(r.dir > 0 ? 'okPlainAdd' : 'okPlainSub', { a: s0, b: b, s: r.answer });
    if (r.relation) msg += ' ' + this._t('okRel', { s: r.answer, b: r.b, a: r.a });
    if (r.kind === 'anchor' && s0 === Math.max(r.a, r.b)) msg += ' ' + this._t('okShort', { big: s0 });
    if (this._pa) this._pa.msg = msg; this._view = { msg: msg };
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140)); this._later(function () { self.api.sound(1568); }, this._ms(280));
    this._paint(); this.api.announce(msg);
    this._later(function () { var nn = self._q('.sk-note'); if (nn && nn.scrollIntoView) nn.scrollIntoView({ block: 'nearest' }); }, 0);
    this._advance(msg.length * 60 + 1500);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 3800 ? ms : 0));
  }
};

var skCssDone = false;
function injectStonesCSS() {
  if (skCssDone || typeof document === 'undefined') return;
  skCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sk-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;}'
  + '.sk-eq{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:0 .6em;font-family:' + H + ';font-weight:800;font-size:30px;line-height:1.25;color:#0F4A40;max-width:100%;min-height:52px;}'
  + '.sk-eq span{white-space:nowrap;} .sk-seg+.sk-seg::before{content:"·";margin-right:.5em;color:#9CC9BE;}'
  + '.sk-ans{display:inline-flex;align-items:center;justify-content:center;min-width:62px;height:48px;padding:0 8px;box-sizing:border-box;border-radius:12px;background:#FFFFFF;box-shadow:inset 0 0 0 3px #0F4A40;margin-left:.25em;} .sk-ans:empty::after{content:"?";color:#9CC9BE;} .sk-ans.is-ok{background:#146B5E;color:#FFFFFF;}'
  + '.sk-rope{min-height:30px;display:flex;justify-content:center;} .sk-rope[hidden]{display:none;} .sk-rope svg{display:block;} .sk-cord{stroke:#146B5E;stroke-width:3;stroke-linecap:round;}'
  + '.sk-bead.is-add{fill:#F2784B;stroke:#B5461F;stroke-width:2;} .sk-bead.is-sub{fill:#1E8A78;stroke:#0F5C4F;stroke-width:2;} .sk-bead.is-glint{animation:skGlint .5s ease-in-out 2;} @keyframes skGlint{50%{fill:#FFD27A;}}'
  + '.sk-pond{position:relative;max-width:100%;cursor:pointer;} .sk-water{position:absolute;left:0;top:0;display:block;} .sk-ripple{fill:none;stroke:#FFFFFF;stroke-opacity:.55;stroke-width:2;}'
  + '.sk-bank{fill:#7DB36B;opacity:.85;} .sk-stone{fill:#CFC6B8;stroke:#3A342B;stroke-width:2;transition:opacity .3s;} .sk-stone.is-ten{fill:#E8A53A;stroke:#8A5A00;stroke-width:2.5;}'
  + '.sk-stone.is-sunk{fill:#8FC7D6;stroke:none;opacity:.45;} .sk-stone.is-sunk.is-ten{opacity:1;} .sk-over{fill:none;stroke:#FFFFFF;stroke-opacity:.7;stroke-width:1.6;}'
  + '.sk-stone.is-rise{animation:skRise .5s ease-out both;} @keyframes skRise{from{opacity:.3;transform:translateY(6px);}}'
  + '.sk-stone.is-pick{stroke:#D4A21E;stroke-width:4;animation:skPick 1.2s ease-in-out infinite;} @keyframes skPick{50%{stroke:#FFE7A8;}}'
  + '.sk-stone.is-pulse{stroke:#F2784B;stroke-width:4;}'
  + '.sk-lab{fill:#0F4A40;font-family:' + H + ';font-weight:800;text-anchor:middle;} .sk-lab.is-ten{fill:#8A5A00;}'
  + '.sk-ghost{fill:#B5461F;font-family:' + H + ';font-weight:800;text-anchor:middle;animation:skUp .3s ease-out both;} @keyframes skUp{from{opacity:0;transform:translateY(4px);}}'
  + '.sk-arc{fill:none;stroke:#146B5E;stroke-width:2.5;stroke-dasharray:6 4;} .sk-arclab{fill:#146B5E;font-family:' + H + ';font-weight:800;text-anchor:middle;}'
  + '.sk-splash{fill:none;stroke:#FFFFFF;stroke-width:3;animation:skSplash .7s ease-out both;} @keyframes skSplash{from{opacity:1;r:4;}to{opacity:0;}}'
  + '.sk-aim{fill:none;stroke:#F2784B;stroke-width:3;stroke-dasharray:4 3;}'
  + '.sk-pad{position:absolute;border-radius:50%;background:#5BA05A;box-shadow:inset 0 -4px 0 #3D7A3C;}'
  + '.sk-lily{position:absolute;z-index:3;padding:0;border:0;background:none;cursor:grab;touch-action:none;transition:left .35s cubic-bezier(.3,1.3,.5,1),top .35s;} .sk-lily:disabled{cursor:default;}'
  + '.sk-frog{display:block;pointer-events:none;} .sk-frog.is-right{transform:scaleX(-1);}'
  + '.sk-lily.is-hop .sk-frog{animation:skHop .4s ease-out;} @keyframes skHop{40%{translate:0 -22px;}}'
  + '.sk-lily.is-wet .sk-frog{animation:skWet .6s ease-in-out;} @keyframes skWet{30%{translate:0 10px;opacity:.6;}70%{translate:0 -4px;}}'
  + '.sk-lily.is-happy .sk-frog{animation:skHappy .5s ease-in-out 2;} @keyframes skHappy{50%{translate:0 -16px;}}'
  + '.sk-lily:focus-visible,.sk-tbtn:focus-visible,.sk-key:focus-visible{outline:3px solid #146B5E;outline-offset:3px;border-radius:12px;}'
  + '.sk-coil{position:absolute;z-index:2;pointer-events:none;overflow:visible;} .sk-spring{fill:none;stroke:#146B5E;stroke-width:2.5;}'
  + '.sk-tools{display:flex;gap:10px;justify-content:center;} .sk-tbtn{width:52px;height:52px;padding:0;border:0;border-radius:26px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #146B5E,0 3px 0 #9CC9BE;cursor:pointer;display:flex;align-items:center;justify-content:center;} .sk-tbtn svg{width:28px;height:28px;} .sk-tbtn:disabled{opacity:.3;cursor:default;}'
  + '.sk-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .sk-note:empty{display:none;} .sk-note.is-hint{color:#B5461F;} .sk-note.is-ok{color:#146B5E;}'
  + '.sk-wrap.is-done .sk-note.is-ok{font-family:' + H + ';font-size:21px;}'
  + '.sk-keys{display:grid;grid-template-columns:repeat(12,minmax(44px,52px));gap:6px;justify-content:center;width:100%;}'
  + '.sk-key{height:52px;border:0;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #0F4A40,0 4px 0 #9CC9BE;font-family:' + H + ';font-weight:800;font-size:26px;color:#0F4A40;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.sk-key svg{width:28px;height:28px;} .sk-key.is-ok{background:#146B5E;box-shadow:0 4px 0 #0F4A40;} .sk-key:disabled{opacity:.35;cursor:default;}'
  + '.sk-wrap.is-narrow{gap:6px;} .sk-wrap.is-narrow .sk-eq{font-size:22px;min-height:40px;} .sk-wrap.is-narrow .sk-ans{min-width:48px;height:38px;border-radius:10px;} .sk-wrap.is-narrow .sk-tbtn{width:46px;height:46px;}'
  + '.sk-wrap.is-narrow .sk-keys{grid-template-columns:repeat(6,minmax(44px,1fr));max-width:420px;gap:5px;} .sk-wrap.is-narrow .sk-key{height:46px;font-size:24px;} .sk-wrap.is-narrow .sk-note{font-size:17px;}'
  + '.sk-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.sk-keys,.sk-tools,.sk-note{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.sk-wrap *{animation-duration:.15s !important;animation-iteration-count:1 !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'sk-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.SunkenStonesActivity = SunkenStonesActivity;
