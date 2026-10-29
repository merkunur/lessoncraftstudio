/* =====================================================================
   run-on-activity.js — ACTIVITY #163 of the one-by-one rebuild: "Tell
   Time to the Nearest 5 Minutes — Set the Clock" → THE RUN-ON TEST
   (2.MD.C.7; all 11 locales). Model: run-on-core.js (RunOnCore).
   Design: docs/activities-rebuild/designs/163-clock.md
   ---------------------------------------------------------------------
   A target time (digits + the locale's own spoken phrase). The child
   drags both hands — loose, each moves alone; nothing reads them back
   while they are set. Check: the readout flips to the time the hands make,
   a brass gear slides into the centre and the clock runs on to the next
   o'clock. A right clock arrives square (the short hand on its number,
   the number lights, the bell strikes it — one ring mark per stroke); a
   short hand put in the wrong place arrives crooked between two numbers.
   That catches "9:20 with the short hand on the 9", which the readout
   alone (it reads 9:20) never could. Miss 2 shows the minute ring and two
   dashed slots for the hands. No timer, no score.
   Test seams: window.RunOnActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._render2 / ._setLong / ._setShort / ._check / ._g / .FAST /
   .OK_MS.
   ===================================================================== */
var RunOnActivity = {
  id: 'run-on',
  /* the drawn apparatus (the hierarchy gate): the clock, the target card, the readout */
  apparatusClasses: ['ro-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Set the Clock","de":"Stell die Uhr","fr":"Règle l’horloge","es":"Pon el reloj en hora","pt":"Acerte o relógio","it":"Regola l’orologio","nl":"Zet de klok","sv":"Ställ klockan","da":"Stil uret","no":"Still klokka","fi":"Aseta kello"},
    instruction: {"en":"Set the clock to the time on the card. Drag the long hand to the minutes and the short hand to the hour. Press Check: the clock links its hands together and runs on to the next o’clock. A clock set right arrives with the short hand right on a number, and the bell strikes. If the short hand was in the wrong place, the clock arrives crooked.","de":"Stell die Uhr auf die Uhrzeit auf der Karte. Zieh den großen Zeiger zu den Minuten und den kleinen Zeiger zur Stunde. Drück auf Prüfen: Die Uhr kuppelt ihre Zeiger zusammen und läuft bis zur nächsten vollen Stunde weiter. Eine richtig gestellte Uhr kommt mit dem kleinen Zeiger genau auf einer Zahl an, und die Glocke schlägt. Stand der kleine Zeiger falsch, kommt die Uhr schief an.","fr":"Règle l’horloge sur l’heure de la carte. Fais glisser la grande aiguille sur les minutes et la petite aiguille sur l’heure. Appuie sur Vérifier : l’horloge relie ses aiguilles et avance jusqu’à l’heure pile suivante. Une horloge bien réglée arrive avec la petite aiguille pile sur un nombre, et la cloche sonne. Si la petite aiguille était mal placée, l’horloge arrive de travers.","es":"Pon el reloj en la hora de la tarjeta. Arrastra la manecilla larga a los minutos y la manecilla corta a la hora. Presiona Revisar: el reloj une sus manecillas y avanza hasta la siguiente hora en punto. Un reloj bien puesto llega con la manecilla corta justo en un número, y suena la campana. Si la manecilla corta estaba mal, el reloj llega chueco.","pt":"Acerte o relógio na hora do cartão. Arraste o ponteiro grande para os minutos e o ponteiro pequeno para a hora. Aperte Conferir: o relógio junta os ponteiros e anda até a próxima hora exata. Um relógio acertado chega com o ponteiro pequeno bem em cima de um número, e o sino toca. Se o ponteiro pequeno estava no lugar errado, o relógio chega torto.","it":"Regola l’orologio sull’ora del cartellino. Trascina la lancetta lunga sui minuti e la lancetta corta sull’ora. Premi Controlla: l’orologio aggancia le lancette e va avanti fino all’ora esatta successiva. Un orologio regolato bene arriva con la lancetta corta proprio su un numero, e la campana suona. Se la lancetta corta era nel posto sbagliato, l’orologio arriva storto.","nl":"Zet de klok op de tijd van de kaart. Sleep de grote wijzer naar de minuten en de kleine wijzer naar het uur. Druk op Controleer: de klok koppelt de wijzers aan elkaar en loopt door tot het volgende hele uur. Een goed gezette klok komt aan met de kleine wijzer precies op een getal, en de bel slaat. Stond de kleine wijzer verkeerd, dan komt de klok scheef aan.","sv":"Ställ klockan på tiden på kortet. Dra stora visaren till minuterna och lilla visaren till timmen. Tryck på Kolla: klockan kopplar ihop visarna och går fram till nästa hela timme. En rätt ställd klocka kommer fram med lilla visaren precis på en siffra, och klockan slår. Stod lilla visaren fel kommer klockan fram snett.","da":"Stil uret efter klokkeslættet på kortet. Træk den store viser til minutterne og den lille viser til timen. Tryk på Tjek: uret kobler viserne sammen og går frem til næste hele time. Et rigtigt stillet ur kommer frem med den lille viser lige på et tal, og klokken slår. Stod den lille viser forkert, kommer uret skævt frem.","no":"Still klokka etter klokkeslettet på kortet. Dra den store viseren til minuttene og den lille viseren til timen. Trykk på Sjekk: klokka kobler viserne sammen og går fram til neste hele time. Ei riktig stilt klokke kommer fram med den lille viseren rett på et tall, og klokka slår. Stod den lille viseren feil, kommer klokka skjevt fram.","fi":"Aseta kello kortin ajalle. Vedä pitkä viisari minuuttien kohdalle ja lyhyt viisari tunnin kohdalle. Paina Tarkista: kello kytkee viisarit yhteen ja kulkee seuraavaan tasatuntiin. Oikein asetettu kello pysähtyy niin, että lyhyt viisari on täsmälleen numeron kohdalla, ja kello lyö. Jos lyhyt viisari oli väärässä kohdassa, kello pysähtyy vinoon."},
    taskLine: {"en":"Set the clock to this time. Move both hands.","de":"Stell die Uhr auf diese Uhrzeit. Bewege beide Zeiger.","fr":"Règle l’horloge sur cette heure. Déplace les deux aiguilles.","es":"Pon el reloj en esta hora. Mueve las dos manecillas.","pt":"Acerte o relógio nesta hora. Mova os dois ponteiros.","it":"Regola l’orologio su quest’ora. Muovi tutte e due le lancette.","nl":"Zet de klok op deze tijd. Verplaats beide wijzers.","sv":"Ställ klockan på den här tiden. Flytta båda visarna.","da":"Stil uret efter dette klokkeslæt. Flyt begge visere.","no":"Still klokka etter dette klokkeslettet. Flytt begge viserne.","fi":"Aseta kello tähän aikaan. Siirrä molempia viisareita."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    hintEmpty: {"en":"Drag the long hand to the minutes and the short hand to the hour.","de":"Zieh den großen Zeiger zu den Minuten und den kleinen Zeiger zur Stunde.","fr":"Fais glisser la grande aiguille sur les minutes et la petite aiguille sur l’heure.","es":"Arrastra la manecilla larga a los minutos y la corta a la hora.","pt":"Arraste o ponteiro grande para os minutos e o pequeno para a hora.","it":"Trascina la lancetta lunga sui minuti e quella corta sull’ora.","nl":"Sleep de grote wijzer naar de minuten en de kleine wijzer naar het uur.","sv":"Dra stora visaren till minuterna och lilla visaren till timmen.","da":"Træk den store viser til minutterne og den lille viser til timen.","no":"Dra den store viseren til minuttene og den lille viseren til timen.","fi":"Vedä pitkä viisari minuuttien kohdalle ja lyhyt viisari tunnin kohdalle."},
    hintChange: {"en":"Move a hand first, then press Check.","de":"Bewege zuerst einen Zeiger, dann drück auf Prüfen.","fr":"Déplace d’abord une aiguille, puis appuie sur Vérifier.","es":"Primero mueve una manecilla y luego presiona Revisar.","pt":"Primeiro mova um ponteiro e depois aperte Conferir.","it":"Prima muovi una lancetta, poi premi Controlla.","nl":"Verplaats eerst een wijzer en druk dan op Controleer.","sv":"Flytta en visare först och tryck sedan på Kolla.","da":"Flyt først en viser, og tryk så på Tjek.","no":"Flytt først en viser, og trykk så på Sjekk.","fi":"Siirrä ensin viisaria ja paina sitten Tarkista."},
    hintLong: {"en":"{mi} minutes is the long hand on the {n}.","de":"{mi} Minuten: Da steht der große Zeiger auf der {n}.","fr":"{mi} minutes, c’est la grande aiguille sur le {n}.","es":"A los {mi} minutos, la manecilla larga está en el {n}.","pt":"Aos {mi} minutos, o ponteiro grande fica no {n}.","it":"{mi} minuti vuol dire la lancetta lunga sul numero {n}.","nl":"{mi} minuten: dan staat de grote wijzer op de {n}.","sv":"{mi} minuter: då står stora visaren på {n}:an.","da":"{mi} minutter: så står den store viser på {n}-tallet.","no":"{mi} minutter: da står den store viseren på {n}-tallet.","fi":"{mi} minuuttia: silloin pitkä viisari on numeron {n} kohdalla."},
    hintLongOn: {"en":"On the hour, the long hand is on the 12.","de":"Bei einer vollen Stunde steht der große Zeiger auf der 12.","fr":"À l’heure pile, la grande aiguille est sur le 12.","es":"En punto, la manecilla larga está en el 12.","pt":"Na hora exata, o ponteiro grande fica no 12.","it":"All’ora esatta, la lancetta lunga è sul numero 12.","nl":"Bij een heel uur staat de grote wijzer op de 12.","sv":"På hel timme står stora visaren på 12:an.","da":"På hel time står den store viser på 12-tallet.","no":"På hel time står den store viseren på 12-tallet.","fi":"Tasatunnilla pitkä viisari on numeron 12 kohdalla."},
    hintReal: {"en":"Your clock shows a real time — {readout}. Now make it {time}.","de":"Deine Uhr zeigt eine echte Uhrzeit: {readout}. Jetzt stell {time} ein.","fr":"Ton horloge montre une vraie heure : {readout}. Maintenant, mets {time}.","es":"Tu reloj marca una hora de verdad: {readout}. Ahora pon {time}.","pt":"O seu relógio mostra uma hora de verdade: {readout}. Agora acerte {time}.","it":"Il tuo orologio segna un’ora vera: {readout}. Ora metti {time}.","nl":"Je klok laat een echte tijd zien: {readout}. Zet hem nu op {time}.","sv":"Din klocka visar en riktig tid: {readout}. Ställ nu in {time}.","da":"Dit ur viser et rigtigt klokkeslæt: {readout}. Stil det nu på {time}.","no":"Klokka di viser et ekte klokkeslett: {readout}. Still den nå på {time}.","fi":"Kellosi näyttää oikean ajan: {readout}. Aseta nyt {time}."},
    hintShort: {"en":"At {mi} minutes past, the short hand has left the {h}: it is part of the way to the {h1}.","de":"{mi} Minuten nach der vollen Stunde ist der kleine Zeiger schon von der {h} weg und ein Stück auf dem Weg zur {h1}.","fr":"À {mi} minutes après l’heure, la petite aiguille a quitté le {h} : elle est en chemin vers le {h1}.","es":"A los {mi} minutos, la manecilla corta ya dejó el {h}: va de camino al {h1}.","pt":"Aos {mi} minutos, o ponteiro pequeno já saiu do {h}: está a caminho do {h1}.","it":"Dopo {mi} minuti, la lancetta corta ha lasciato il numero {h}: è in cammino verso il numero {h1}.","nl":"Na {mi} minuten is de kleine wijzer al weg van de {h}: hij is op weg naar de {h1}.","sv":"Efter {mi} minuter har lilla visaren lämnat {h}:an: den är på väg mot {h1}:an.","da":"Efter {mi} minutter har den lille viser forladt {h}-tallet: den er på vej hen mod {h1}-tallet.","no":"Etter {mi} minutter har den lille viseren forlatt {h}-tallet: den er på vei mot {h1}-tallet.","fi":"Kun tasatunnista on kulunut {mi} minuuttia, lyhyt viisari on jo lähtenyt numerosta {h} ja on matkalla numeroon {h1}."},
    hintShortOn: {"en":"At {h} o’clock the short hand is right on the {h}.","de":"Um {h} Uhr steht der kleine Zeiger genau auf der {h}.","fr":"À {h} heures pile, la petite aiguille est juste sur le {h}.","es":"A las {h} en punto, la manecilla corta está justo en el {h}.","pt":"Às {h} em ponto, o ponteiro pequeno fica bem em cima do {h}.","it":"Alle {h} in punto, la lancetta corta è proprio sul numero {h}.","nl":"Om {h} uur staat de kleine wijzer precies op de {h}.","sv":"När klockan är {h} står lilla visaren precis på {h}:an.","da":"Når klokken er præcis {h}, står den lille viser lige på {h}-tallet.","no":"Når klokka er nøyaktig {h}, står den lille viseren rett på {h}-tallet.","fi":"Kun kello on tasan {h}, lyhyt viisari on täsmälleen numeron {h} kohdalla."},
    hintBoth: {"en":"Set the long hand first, then the short hand.","de":"Stell zuerst den großen Zeiger, dann den kleinen.","fr":"Règle d’abord la grande aiguille, puis la petite.","es":"Primero pon la manecilla larga y luego la corta.","pt":"Primeiro acerte o ponteiro grande, depois o pequeno.","it":"Prima sistema la lancetta lunga, poi quella corta.","nl":"Zet eerst de grote wijzer goed, dan de kleine.","sv":"Ställ stora visaren först, sedan den lilla.","da":"Stil den store viser først, og så den lille.","no":"Still den store viseren først, og så den lille.","fi":"Aseta ensin pitkä viisari ja sitten lyhyt."},
    helpOn: {"en":"The long hand goes on the 12. The short hand goes right on the {h}.","de":"Der große Zeiger kommt auf die 12. Der kleine Zeiger kommt genau auf die {h}.","fr":"La grande aiguille va sur le 12. La petite va juste sur le {h}.","es":"La manecilla larga va en el 12. La corta va justo en el {h}.","pt":"O ponteiro grande vai no 12. O pequeno vai bem em cima do {h}.","it":"La lancetta lunga va sul numero 12. Quella corta va proprio sul numero {h}.","nl":"De grote wijzer gaat op de 12. De kleine wijzer gaat precies op de {h}.","sv":"Stora visaren ska stå på 12:an. Lilla visaren ska stå precis på {h}:an.","da":"Den store viser skal stå på 12-tallet. Den lille viser skal stå lige på {h}-tallet.","no":"Den store viseren skal stå på 12-tallet. Den lille viseren skal stå rett på {h}-tallet.","fi":"Pitkä viisari menee numeron 12 kohdalle. Lyhyt viisari menee täsmälleen numeron {h} kohdalle."},
    helpJust: {"en":"Count by fives to {mi}. Then the short hand goes just past the {h}.","de":"Zähl in Fünferschritten bis {mi}. Dann kommt der kleine Zeiger knapp hinter die {h}.","fr":"Compte de 5 en 5 jusqu’à {mi}. Puis la petite aiguille va juste après le {h}.","es":"Cuenta de 5 en 5 hasta {mi}. Luego la manecilla corta va apenas pasando el {h}.","pt":"Conte de 5 em 5 até {mi}. Depois o ponteiro pequeno vai logo depois do {h}.","it":"Conta di 5 in 5 fino a {mi}. Poi la lancetta corta va appena dopo il numero {h}.","nl":"Tel per 5 tot {mi}. Dan gaat de kleine wijzer net voorbij de {h}.","sv":"Räkna med fem i taget till {mi}. Sedan ska lilla visaren stå strax efter {h}:an.","da":"Tæl fem ad gangen til {mi}. Så skal den lille viser stå lige efter {h}-tallet.","no":"Tell fem om gangen til {mi}. Så skal den lille viseren stå like etter {h}-tallet.","fi":"Laske viisi kerrallaan lukuun {mi}. Sitten lyhyt viisari menee vähän numeron {h} ohi."},
    helpFive: {"en":"The long hand goes on the 1. Then the short hand goes just past the {h}.","de":"Der große Zeiger kommt auf die 1. Dann kommt der kleine Zeiger knapp hinter die {h}.","fr":"La grande aiguille va sur le 1. Puis la petite aiguille va juste après le {h}.","es":"La manecilla larga va en el 1. Luego la manecilla corta va apenas pasando el {h}.","pt":"O ponteiro grande vai no 1. Depois o ponteiro pequeno vai logo depois do {h}.","it":"La lancetta lunga va sul numero 1. Poi la lancetta corta va appena dopo il numero {h}.","nl":"De grote wijzer gaat op de 1. Dan gaat de kleine wijzer net voorbij de {h}.","sv":"Stora visaren ska stå på 1:an. Sedan ska lilla visaren stå strax efter {h}:an.","da":"Den store viser skal stå på 1-tallet. Så skal den lille viser stå lige efter {h}-tallet.","no":"Den store viseren skal stå på 1-tallet. Så skal den lille viseren stå like etter {h}-tallet.","fi":"Pitkä viisari menee numeron 1 kohdalle. Sitten lyhyt viisari menee vähän numeron {h} ohi."},
    helpQuarter: {"en":"Count by fives to {mi}. Then the short hand goes a quarter of the way to the {h1}.","de":"Zähl in Fünferschritten bis {mi}. Dann geht der kleine Zeiger ein Viertel des Wegs zur {h1}.","fr":"Compte de 5 en 5 jusqu’à {mi}. Puis la petite aiguille va au quart du chemin vers le {h1}.","es":"Cuenta de 5 en 5 hasta {mi}. Luego la manecilla corta va a un cuarto del camino hacia el {h1}.","pt":"Conte de 5 em 5 até {mi}. Depois o ponteiro pequeno vai um quarto do caminho até o {h1}.","it":"Conta di 5 in 5 fino a {mi}. Poi la lancetta corta va a un quarto della strada verso il numero {h1}.","nl":"Tel per 5 tot {mi}. Dan gaat de kleine wijzer een kwart van de weg naar de {h1}.","sv":"Räkna med fem i taget till {mi}. Sedan ska lilla visaren gå en fjärdedel av vägen mot {h1}:an.","da":"Tæl fem ad gangen til {mi}. Så skal den lille viser en fjerdedel af vejen hen mod {h1}-tallet.","no":"Tell fem om gangen til {mi}. Så skal den lille viseren en firedel av veien mot {h1}-tallet.","fi":"Laske viisi kerrallaan lukuun {mi}. Sitten lyhyt viisari menee neljänneksen matkasta kohti numeroa {h1}."},
    helpLess: {"en":"Count by fives to {mi}. Then the short hand goes not quite halfway to the {h1}.","de":"Zähl in Fünferschritten bis {mi}. Dann geht der kleine Zeiger noch nicht ganz den halben Weg zur {h1}.","fr":"Compte de 5 en 5 jusqu’à {mi}. Puis la petite aiguille va un peu moins loin que la moitié du chemin vers le {h1}.","es":"Cuenta de 5 en 5 hasta {mi}. Luego la manecilla corta va sin llegar a la mitad del camino hacia el {h1}.","pt":"Conte de 5 em 5 até {mi}. Depois o ponteiro pequeno vai um pouco menos da metade do caminho para o {h1}.","it":"Conta di 5 in 5 fino a {mi}. Poi la lancetta corta va un po’ meno della metà della strada verso il numero {h1}.","nl":"Tel per 5 tot {mi}. Dan gaat de kleine wijzer nog niet helemaal halverwege naar de {h1}.","sv":"Räkna med fem i taget till {mi}. Sedan ska lilla visaren gå inte riktigt halvvägs mot {h1}:an.","da":"Tæl fem ad gangen til {mi}. Så skal den lille viser ikke helt halvvejs hen mod {h1}-tallet.","no":"Tell fem om gangen til {mi}. Så skal den lille viseren ikke helt halvveis mot {h1}-tallet.","fi":"Laske viisi kerrallaan lukuun {mi}. Sitten lyhyt viisari menee alle puolenvälin kohti numeroa {h1}."},
    okLess: {"en":"{time} — {phrase}. The short hand is not quite halfway to the {h1}.","de":"{time} — {phrase}. Der kleine Zeiger ist noch nicht ganz den halben Weg zur {h1} gegangen.","fr":"{time} — {phrase}. La petite aiguille n’est pas encore à mi-chemin vers le {h1}.","es":"{time} — {phrase}. La manecilla corta todavía no llega a la mitad del camino hacia el {h1}.","pt":"{time} — {phrase}. O ponteiro pequeno ainda não chegou à metade do caminho para o {h1}.","it":"{time} — {phrase}. La lancetta corta non è ancora a metà strada verso il numero {h1}.","nl":"{time} — {phrase}. De kleine wijzer is nog niet halverwege naar de {h1}.","sv":"{time} — {phrase}. Lilla visaren har inte riktigt gått halvvägs mot {h1}:an.","da":"{time} — {phrase}. Den lille viser er ikke helt halvvejs hen mod {h1}-tallet.","no":"{time} — {phrase}. Den lille viseren er ikke helt halvveis mot {h1}-tallet.","fi":"{time} — {phrase}. Lyhyt viisari on kulkenut alle puolenvälin kohti numeroa {h1}."},
    helpHalf: {"en":"Count by fives to {mi}. Then the short hand goes halfway to the {h1}.","de":"Zähl in Fünferschritten bis {mi}. Dann geht der kleine Zeiger genau den halben Weg zur {h1}.","fr":"Compte de 5 en 5 jusqu’à {mi}. Puis la petite aiguille va à mi-chemin vers le {h1}.","es":"Cuenta de 5 en 5 hasta {mi}. Luego la manecilla corta va a la mitad del camino hacia el {h1}.","pt":"Conte de 5 em 5 até {mi}. Depois o ponteiro pequeno vai até a metade do caminho para o {h1}.","it":"Conta di 5 in 5 fino a {mi}. Poi la lancetta corta va a metà strada verso il numero {h1}.","nl":"Tel per 5 tot {mi}. Dan gaat de kleine wijzer halverwege naar de {h1}.","sv":"Räkna med fem i taget till {mi}. Sedan ska lilla visaren gå halvvägs mot {h1}:an.","da":"Tæl fem ad gangen til {mi}. Så skal den lille viser halvvejs hen mod {h1}-tallet.","no":"Tell fem om gangen til {mi}. Så skal den lille viseren halvveis mot {h1}-tallet.","fi":"Laske viisi kerrallaan lukuun {mi}. Sitten lyhyt viisari menee puoliväliin kohti numeroa {h1}."},
    helpMore: {"en":"Count by fives to {mi}. Then the short hand goes more than halfway to the {h1}.","de":"Zähl in Fünferschritten bis {mi}. Dann geht der kleine Zeiger mehr als den halben Weg zur {h1}.","fr":"Compte de 5 en 5 jusqu’à {mi}. Puis la petite aiguille va plus loin que la moitié du chemin vers le {h1}.","es":"Cuenta de 5 en 5 hasta {mi}. Luego la manecilla corta va más allá de la mitad del camino hacia el {h1}.","pt":"Conte de 5 em 5 até {mi}. Depois o ponteiro pequeno passa da metade do caminho para o {h1}.","it":"Conta di 5 in 5 fino a {mi}. Poi la lancetta corta va oltre la metà della strada verso il numero {h1}.","nl":"Tel per 5 tot {mi}. Dan gaat de kleine wijzer meer dan halverwege naar de {h1}.","sv":"Räkna med fem i taget till {mi}. Sedan ska lilla visaren gå mer än halvvägs mot {h1}:an.","da":"Tæl fem ad gangen til {mi}. Så skal den lille viser mere end halvvejs hen mod {h1}-tallet.","no":"Tell fem om gangen til {mi}. Så skal den lille viseren mer enn halvveis mot {h1}-tallet.","fi":"Laske viisi kerrallaan lukuun {mi}. Sitten lyhyt viisari menee yli puolenvälin kohti numeroa {h1}."},
    helpNearly: {"en":"Count by fives to {mi}. Then the short hand goes nearly to the {h1}.","de":"Zähl in Fünferschritten bis {mi}. Dann kommt der kleine Zeiger fast bis zur {h1}.","fr":"Compte de 5 en 5 jusqu’à {mi}. Puis la petite aiguille va presque jusqu’au {h1}.","es":"Cuenta de 5 en 5 hasta {mi}. Luego la manecilla corta va casi hasta el {h1}.","pt":"Conte de 5 em 5 até {mi}. Depois o ponteiro pequeno vai quase até o {h1}.","it":"Conta di 5 in 5 fino a {mi}. Poi la lancetta corta va quasi fino al numero {h1}.","nl":"Tel per 5 tot {mi}. Dan gaat de kleine wijzer bijna tot de {h1}.","sv":"Räkna med fem i taget till {mi}. Sedan ska lilla visaren gå nästan ända fram till {h1}:an.","da":"Tæl fem ad gangen til {mi}. Så skal den lille viser næsten hen til {h1}-tallet.","no":"Tell fem om gangen til {mi}. Så skal den lille viseren nesten helt fram til {h1}-tallet.","fi":"Laske viisi kerrallaan lukuun {mi}. Sitten lyhyt viisari menee melkein numeron {h1} kohdalle."},
    okOn: {"en":"{time} — {phrase}. The long hand is on the 12, the short hand on the {h}.","de":"{time} — {phrase}. Der große Zeiger steht auf der 12, der kleine auf der {h}.","fr":"{time} — {phrase}. La grande aiguille est sur le 12, la petite sur le {h}.","es":"{time} — {phrase}. La manecilla larga está en el 12 y la corta en el {h}.","pt":"{time} — {phrase}. O ponteiro grande está no 12 e o pequeno no {h}.","it":"{time} — {phrase}. La lancetta lunga è sul numero 12, quella corta sul numero {h}.","nl":"{time} — {phrase}. De grote wijzer staat op de 12, de kleine op de {h}.","sv":"{time} — {phrase}. Stora visaren står på 12:an och lilla visaren på {h}:an.","da":"{time} — {phrase}. Den store viser står på 12-tallet og den lille på {h}-tallet.","no":"{time} — {phrase}. Den store viseren står på 12-tallet og den lille på {h}-tallet.","fi":"{time} — {phrase}. Pitkä viisari on numeron 12 kohdalla ja lyhyt numeron {h} kohdalla."},
    okJust: {"en":"{time} — {phrase}. The short hand is just past the {h}.","de":"{time} — {phrase}. Der kleine Zeiger ist knapp hinter der {h}.","fr":"{time} — {phrase}. La petite aiguille est juste après le {h}.","es":"{time} — {phrase}. La manecilla corta acaba de pasar el {h}.","pt":"{time} — {phrase}. O ponteiro pequeno está logo depois do {h}.","it":"{time} — {phrase}. La lancetta corta è appena dopo il numero {h}.","nl":"{time} — {phrase}. De kleine wijzer is net voorbij de {h}.","sv":"{time} — {phrase}. Lilla visaren står strax efter {h}:an.","da":"{time} — {phrase}. Den lille viser står lige efter {h}-tallet.","no":"{time} — {phrase}. Den lille viseren står like etter {h}-tallet.","fi":"{time} — {phrase}. Lyhyt viisari on juuri ohittanut numeron {h}."},
    okQuarter: {"en":"{time} — {phrase}. The short hand is a quarter of the way to the {h1}.","de":"{time} — {phrase}. Der kleine Zeiger ist ein Viertel des Wegs zur {h1} gegangen.","fr":"{time} — {phrase}. La petite aiguille est au quart du chemin vers le {h1}.","es":"{time} — {phrase}. La manecilla corta está a un cuarto del camino hacia el {h1}.","pt":"{time} — {phrase}. O ponteiro pequeno andou um quarto do caminho até o {h1}.","it":"{time} — {phrase}. La lancetta corta è a un quarto della strada verso il numero {h1}.","nl":"{time} — {phrase}. De kleine wijzer is een kwart van de weg naar de {h1}.","sv":"{time} — {phrase}. Lilla visaren har gått en fjärdedel av vägen mot {h1}:an.","da":"{time} — {phrase}. Den lille viser er en fjerdedel af vejen hen mod {h1}-tallet.","no":"{time} — {phrase}. Den lille viseren har gått en firedel av veien mot {h1}-tallet.","fi":"{time} — {phrase}. Lyhyt viisari on kulkenut neljänneksen matkasta kohti numeroa {h1}."},
    okHalf: {"en":"{time} — {phrase}. The short hand is halfway to the {h1}.","de":"{time} — {phrase}. Der kleine Zeiger ist genau auf halbem Weg zur {h1}.","fr":"{time} — {phrase}. La petite aiguille est à mi-chemin vers le {h1}.","es":"{time} — {phrase}. La manecilla corta está a la mitad del camino hacia el {h1}.","pt":"{time} — {phrase}. O ponteiro pequeno está na metade do caminho para o {h1}.","it":"{time} — {phrase}. La lancetta corta è a metà strada verso il numero {h1}.","nl":"{time} — {phrase}. De kleine wijzer is halverwege naar de {h1}.","sv":"{time} — {phrase}. Lilla visaren har gått halvvägs mot {h1}:an.","da":"{time} — {phrase}. Den lille viser er halvvejs hen mod {h1}-tallet.","no":"{time} — {phrase}. Den lille viseren er halvveis mot {h1}-tallet.","fi":"{time} — {phrase}. Lyhyt viisari on puolivälissä matkalla kohti numeroa {h1}."},
    okMore: {"en":"{time} — {phrase}. The short hand is more than halfway to the {h1}.","de":"{time} — {phrase}. Der kleine Zeiger ist mehr als den halben Weg zur {h1} gegangen.","fr":"{time} — {phrase}. La petite aiguille a passé la moitié du chemin vers le {h1}.","es":"{time} — {phrase}. La manecilla corta ya pasó la mitad del camino hacia el {h1}.","pt":"{time} — {phrase}. O ponteiro pequeno já passou da metade do caminho para o {h1}.","it":"{time} — {phrase}. La lancetta corta ha superato la metà della strada verso il numero {h1}.","nl":"{time} — {phrase}. De kleine wijzer is meer dan halverwege naar de {h1}.","sv":"{time} — {phrase}. Lilla visaren har gått mer än halvvägs mot {h1}:an.","da":"{time} — {phrase}. Den lille viser er mere end halvvejs hen mod {h1}-tallet.","no":"{time} — {phrase}. Den lille viseren er mer enn halvveis mot {h1}-tallet.","fi":"{time} — {phrase}. Lyhyt viisari on kulkenut yli puolenvälin kohti numeroa {h1}."},
    okNearly: {"en":"{time} — {phrase}. The short hand is nearly at the {h1}.","de":"{time} — {phrase}. Der kleine Zeiger ist fast bei der {h1}.","fr":"{time} — {phrase}. La petite aiguille est presque sur le {h1}.","es":"{time} — {phrase}. La manecilla corta casi llega al {h1}.","pt":"{time} — {phrase}. O ponteiro pequeno quase chega ao {h1}.","it":"{time} — {phrase}. La lancetta corta è quasi sul numero {h1}.","nl":"{time} — {phrase}. De kleine wijzer is bijna bij de {h1}.","sv":"{time} — {phrase}. Lilla visaren är nästan framme vid {h1}:an.","da":"{time} — {phrase}. Den lille viser er næsten ved {h1}-tallet.","no":"{time} — {phrase}. Den lille viseren er nesten ved {h1}-tallet.","fi":"{time} — {phrase}. Lyhyt viisari on melkein numeron {h1} kohdalla."},
    aLong: {"en":"Long hand, pointing at the {n}: {mm} minutes","de":"Großer Zeiger, zeigt auf die {n}: {mm} Minuten","fr":"Grande aiguille, sur le {n} : {mm} minutes","es":"Manecilla larga, en el {n}: {mm} minutos","pt":"Ponteiro grande, no {n}: {mm} minutos","it":"Lancetta lunga, sul numero {n}: {mm} minuti","nl":"Grote wijzer, op de {n}: {mm} minuten","sv":"Stora visaren, på {n}:an: {mm} minuter","da":"Den store viser, på {n}-tallet: {mm} minutter","no":"Den store viseren, på {n}-tallet: {mm} minutter","fi":"Pitkä viisari, numeron {n} kohdalla: {mm} minuuttia"},
    aShortOn: {"en":"Short hand, on the {h}","de":"Kleiner Zeiger, auf der {h}","fr":"Petite aiguille, sur le {h}","es":"Manecilla corta, en el {h}","pt":"Ponteiro pequeno, no {h}","it":"Lancetta corta, sul numero {h}","nl":"Kleine wijzer, op de {h}","sv":"Lilla visaren, på {h}:an","da":"Den lille viser, på {h}-tallet","no":"Den lille viseren, på {h}-tallet","fi":"Lyhyt viisari, numeron {h} kohdalla"},
    aShortBetween: {"en":"Short hand, between the {h} and the {h1}","de":"Kleiner Zeiger, zwischen der {h} und der {h1}","fr":"Petite aiguille, entre le {h} et le {h1}","es":"Manecilla corta, entre el {h} y el {h1}","pt":"Ponteiro pequeno, entre o {h} e o {h1}","it":"Lancetta corta, tra i numeri {h} e {h1}","nl":"Kleine wijzer, tussen de {h} en de {h1}","sv":"Lilla visaren, mellan {h}:an och {h1}:an","da":"Den lille viser, mellem {h}-tallet og {h1}-tallet","no":"Den lille viseren, mellom {h}-tallet og {h1}-tallet","fi":"Lyhyt viisari, numeroiden {h} ja {h1} välissä"},
    aReadout: {"en":"Your clock says {time}","de":"Deine Uhr zeigt {time}","fr":"Ton horloge indique {time}","es":"Tu reloj marca {time}","pt":"O seu relógio mostra {time}","it":"Il tuo orologio segna {time}","nl":"Je klok wijst {time} aan","sv":"Din klocka visar {time}","da":"Dit ur viser {time}","no":"Klokka di viser {time}","fi":"Kellosi näyttää {time}"},
    aRunSquare: {"en":"The clock ran on to the next hour: the short hand is right on the {h1}.","de":"Die Uhr ist bis zur nächsten vollen Stunde gelaufen: Der kleine Zeiger steht genau auf der {h1}.","fr":"L’horloge a avancé jusqu’à l’heure pile suivante : la petite aiguille est juste sur le {h1}.","es":"El reloj avanzó hasta la siguiente hora en punto: la manecilla corta está justo en el {h1}.","pt":"O relógio andou até a próxima hora exata: o ponteiro pequeno está bem em cima do {h1}.","it":"L’orologio è andato avanti fino all’ora esatta: la lancetta corta è proprio sul numero {h1}.","nl":"De klok liep door tot het volgende hele uur: de kleine wijzer staat precies op de {h1}.","sv":"Klockan gick fram till nästa hela timme: lilla visaren står precis på {h1}:an.","da":"Uret gik frem til næste hele time: den lille viser står lige på {h1}-tallet.","no":"Klokka gikk fram til neste hele time: den lille viseren står rett på {h1}-tallet.","fi":"Kello kulki seuraavaan tasatuntiin: lyhyt viisari on täsmälleen numeron {h1} kohdalla."},
    aRunCrooked: {"en":"The clock ran on to the next hour, but the short hand stopped between the {a} and the {b}.","de":"Die Uhr ist bis zur nächsten vollen Stunde gelaufen, aber der kleine Zeiger ist zwischen der {a} und der {b} stehen geblieben.","fr":"L’horloge a avancé jusqu’à l’heure pile suivante, mais la petite aiguille s’est arrêtée entre le {a} et le {b}.","es":"El reloj avanzó hasta la siguiente hora en punto, pero la manecilla corta se quedó entre el {a} y el {b}.","pt":"O relógio andou até a próxima hora exata, mas o ponteiro pequeno parou entre o {a} e o {b}.","it":"L’orologio è andato avanti fino all’ora esatta, ma la lancetta corta si è fermata tra i numeri {a} e {b}.","nl":"De klok liep door tot het volgende hele uur, maar de kleine wijzer bleef tussen de {a} en de {b} staan.","sv":"Klockan gick fram till nästa hela timme, men lilla visaren stannade mellan {a}:an och {b}:an.","da":"Uret gik frem til næste hele time, men den lille viser standsede mellem {a}-tallet og {b}-tallet.","no":"Klokka gikk fram til neste hele time, men den lille viseren stoppet mellom {a}-tallet og {b}-tallet.","fi":"Kello kulki seuraavaan tasatuntiin, mutta lyhyt viisari pysähtyi numeroiden {a} ja {b} väliin."},
    setTimes: {"en":"Times","de":"Uhrzeiten","fr":"Heures","es":"Horas","pt":"Horas","it":"Orari","nl":"Tijden","sv":"Tider","da":"Klokkeslæt","no":"Klokkeslett","fi":"Ajat"},
    tOH: {"en":"O’clock and half past","de":"Volle und halbe Stunden","fr":"Heures pile et demies","es":"Horas en punto y medias horas","pt":"Horas exatas e meias horas","it":"Ore esatte e mezze ore","nl":"Hele en halve uren","sv":"Hela och halva timmar","da":"Hele og halve timer","no":"Hele og halve timer","fi":"Tasa- ja puolitunnit"},
    tQ: {"en":"Quarter hours","de":"Viertelstunden","fr":"Quarts d’heure","es":"Cuartos de hora","pt":"Quartos de hora","it":"Quarti d’ora","nl":"Kwartieren","sv":"Kvartar","da":"Kvarterer","no":"Kvarter","fi":"Vartit"},
    tFive: {"en":"Five minutes","de":"5-Minuten-Schritte","fr":"Minutes de 5 en 5","es":"De 5 en 5 minutos","pt":"De 5 em 5 minutos","it":"Minuti di 5 in 5","nl":"Per 5 minuten","sv":"Var femte minut","da":"Hvert femte minut","no":"Hvert femte minutt","fi":"Viiden minuutin ajat"},
    tMixed: {"en":"Mixed","de":"Gemischt","fr":"Mélangé","es":"Mezclado","pt":"Misturado","it":"Misto","nl":"Gemengd","sv":"Blandat","da":"Blandet","no":"Blandet","fi":"Sekaisin"},
    setRing: {"en":"Minute ring","de":"Minutenring","fr":"Anneau des minutes","es":"Anillo de minutos","pt":"Anel dos minutos","it":"Anello dei minuti","nl":"Minutenring","sv":"Minutring","da":"Minutring","no":"Minuttring","fi":"Minuuttirengas"},
    rOff: {"en":"Off","de":"Aus","fr":"Non","es":"No","pt":"Não","it":"No","nl":"Uit","sv":"Av","da":"Fra","no":"Av","fi":"Pois"},
    rOn: {"en":"On","de":"An","fr":"Oui","es":"Sí","pt":"Sim","it":"Sì","nl":"Aan","sv":"På","da":"Til","no":"På","fi":"Päällä"}
  },/*STRINGS-END*/
  defaults: { times: 'five', ring: 'off' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [{ value: 'oh', labelKey: 'tOH' }, { value: 'q', labelKey: 'tQ' }, { value: 'five', labelKey: 'tFive' }, { value: 'mixed', labelKey: 'tMixed' }] },
    { key: 'ring', type: 'choice', labelKey: 'setRing', options: [{ value: 'off', labelKey: 'rOff' }, { value: 'on', labelKey: 'rOn' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null;
    injectRunOnCSS();
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return RunOnCore.levelOf(this._setting('times')); },
  _ringOn: function () { return this._setting('ring') === 'on'; },
  _loc: function () { return RunOnCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level(); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = RunOnCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = RunOnCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'run-on.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = RunOnCore.newState(this._level(), k);
    this._view = { note: '', soft: false, run: null, shown: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
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
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ro-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="ro-main"><div class="ro-target ro-art" data-qa="target"></div><div class="ro-clock" data-qa="clock"></div><div class="ro-side"><div class="ro-readout ro-art" data-qa="readout"></div><div class="ro-goline"></div></div></div><p class="ro-note" data-qa="note" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _geometry: function (W, done) {
    var wide = W >= 600, cramp = W < 330;
    var S = wide ? Math.min(340, W - 290) : cramp ? Math.min(228, W - 20) : Math.min(300, W - 20);
    if (!wide && done) S = Math.min(S, cramp ? 168 : 250);
    return { W: W, wide: wide, cramp: cramp, S: S };
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width();
    var g = this._g = this._geometry(W, st.done);
    this._wrap.className = 'ro-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    this._paintTarget();
    this._paintClock();
    this._paintReadout();
    this._paintGo();
    var note = this._qs('.ro-note');
    if (v.note) { note.textContent = v.note; note.className = 'ro-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'ro-note'; }
    this._setPrompt();
  },
  _paintTarget: function () {
    var st = this.st, r = st.round, C = RunOnCore, loc = this._loc(), el = this._qs('.ro-target');
    var txt = C.fmt(loc, r.h, r.m), sep = loc === 'fr' ? ' h ' : txt.charAt(String(r.h).length), mm = (r.m < 10 ? '0' : '') + r.m;
    el.innerHTML = '<span class="ro-digits"><span class="ro-hh">' + r.h + '</span><span class="ro-sep">' + this._esc(sep) + '</span><span class="ro-mm">' + mm + '</span></span><span class="ro-phrase" data-phrase="1">' + this._esc(C.phrase(loc, r.h, r.m)) + '</span>';
  },
  /* the hands the clock shows now: the child's, or the run-on in progress */
  _hands: function () {
    var st = this.st, v = this._view;
    if (v.run) return { long: v.run.long + 30 * v.run.i, short: v.run.short + 2.5 * v.run.i };
    return { long: st.long, short: st.short };
  },
  _paintClock: function () {
    var st = this.st, r = st.round, g = this._g, C = RunOnCore, v = this._view, el = this._qs('.ro-clock'), self = this, loc = this._loc();
    var CX = 200, CY = 220, R = 165, P = function (a, rad) { var t = (a - 90) * Math.PI / 180; return [CX + rad * Math.cos(t), CY + rad * Math.sin(t)]; };
    var vr = st.verdict, help = st.help && !!vr, H = this._hands(), lv = st.level, k = g.S / 400;
    el.innerHTML = ''; el.style.width = g.S + 'px'; el.style.height = Math.round(g.S * 420 / 400) + 'px';
    var o = '';
    /* the bell on top; after a run-on its strokes are counted as ring marks beside it */
    o += '<path class="ro-bell" d="M184 36 Q184 14 200 12 Q216 14 216 36 L222 44 L178 44 Z"/><circle class="ro-clapper" cx="200" cy="47" r="4"/>';
    var arr = v.arrive;
    if (arr && arr.square) for (var b = 0; b < arr.struck; b++) { var bx = 236 + (b % 6) * 18, by = 22 + Math.floor(b / 6) * 18; o += '<circle class="ro-stroke" data-stroke="' + (b + 1) + '" cx="' + bx + '" cy="' + by + '" r="6"/>'; }
    if (arr && !arr.square) o += '<path class="ro-clank" data-clank="1" d="M236 24 L250 38 M250 24 L236 38"/>';
    o += '<circle class="ro-face" cx="' + CX + '" cy="' + CY + '" r="' + R + '"/>';
    /* the rim: the bold marks depend on the level (o'clock & half: 12 and 6; quarters: 12 3 6 9; five minutes: all twelve) */
    var boldEvery = lv === 'oh' ? 30 : lv === 'q' ? 15 : 5;
    for (var i = 0; i < 60; i++) { var bold = i % boldEvery === 0, five = i % 5 === 0, t1 = P(i * 6, R - 4), t2 = P(i * 6, bold ? R - 22 : five ? R - 14 : R - 10); o += '<path class="ro-tick' + (bold ? ' is-bold' : five ? ' is-five' : '') + '" d="M' + t1[0].toFixed(1) + ' ' + t1[1].toFixed(1) + 'L' + t2[0].toFixed(1) + ' ' + t2[1].toFixed(1) + '"/>'; }
    /* the minute ring (setting, and always on miss 2): 05 … 55 outside the rim */
    if (this._ringOn() || help) for (var q = 1; q < 12; q++) { var mp = P(q * 30, R + 20); o += '<text class="ro-min" data-min="' + q * 5 + '" x="' + mp[0].toFixed(1) + '" y="' + (mp[1] + 5).toFixed(1) + '" text-anchor="middle">' + (q < 2 ? '0' : '') + q * 5 + '</text>'; }
    /* miss 1, short hand wrong: the right gap (between h and h+1) shaded pale */
    if (vr && !v.run && !help && (vr.kind === 'short' || vr.kind === 'both') && r.m > 0) { var gp = function (a, rad) { return P(a, rad).map(function (x) { return x.toFixed(1); }).join(' '); }; var a0 = (r.h % 12) * 30, a1 = a0 + 30; o += '<path class="ro-gap" data-gap="' + r.h + '" d="M' + CX + ' ' + CY + 'L' + gp(a0, R - 26) + 'A' + (R - 26) + ' ' + (R - 26) + ' 0 0 1 ' + gp(a1, R - 26) + 'Z"/>'; }
    /* miss 1, long hand wrong: a teal ring at the mark where the long hand belongs */
    if (vr && !v.run && !help && !vr.longOk) { var lm = P(r.m * 6, R - 12); o += '<circle class="ro-ring" data-ring="' + r.m + '" cx="' + lm[0].toFixed(1) + '" cy="' + lm[1].toFixed(1) + '" r="13"/>'; }
    /* miss 2: the slots — a dashed notch for the long hand and a dashed short hand where it belongs */
    if (help && !v.run) { var sl = C.slots(r), e1 = P(sl.long, R - 30), e2 = P(sl.short, R * 0.55); o += '<path class="ro-slot-long" data-slot="long" d="M' + CX + ' ' + CY + 'L' + e1[0].toFixed(1) + ' ' + e1[1].toFixed(1) + '"/><path class="ro-slot-short" data-slot="short" d="M' + CX + ' ' + CY + 'L' + e2[0].toFixed(1) + ' ' + e2[1].toFixed(1) + '"/>'; }
    /* the arrival of a crooked run-on: where the short hand stopped, ringed */
    if (arr && !arr.square && !v.run) { var ap = P(arr.arrive, R * 0.55); o += '<circle class="ro-crooked" data-crooked="' + arr.arrive + '" cx="' + ap[0].toFixed(1) + '" cy="' + ap[1].toFixed(1) + '" r="14"/>'; }
    /* the numerals (the one the bell strikes lights up) */
    for (var h = 1; h <= 12; h++) { var np = P(h * 30, R - 40), lit = arr && arr.square && arr.struck === h; o += '<text class="ro-num' + (lit ? ' is-lit' : '') + '" x="' + np[0].toFixed(1) + '" y="' + (np[1] + 10).toFixed(1) + '" text-anchor="middle">' + h + '</text>'; }
    o += '<circle class="ro-rim" cx="' + CX + '" cy="' + CY + '" r="' + R + '"/>';
    /* the hands, loose; the gear slides into the centre only for the run-on */
    var hand = function (ang, len, cls, extra) { var e = P(ang, len); return '<path class="' + cls + '"' + (extra || '') + ' d="M' + CX + ' ' + CY + 'L' + e[0].toFixed(1) + ' ' + e[1].toFixed(1) + '"/>'; };
    o += hand(H.short, R * 0.55, 'ro-hhand', ' data-short="' + st.short + '"') + hand(H.long, R * 0.86, 'ro-mhand', ' data-long="' + st.long + '"');
    var geared = !!v.run || st.done, gx = geared ? CX : CX + 46, gy = geared ? CY : CY + 46;
    o += '<g class="ro-gear' + (geared ? ' is-in' : '') + '" data-gear="' + (geared ? 'in' : 'out') + '">' + this._gearPath(gx, gy, 17) + '</g>';
    o += '<circle class="ro-cap" cx="' + CX + '" cy="' + CY + '" r="8"/>';
    el.insertAdjacentHTML('beforeend', '<svg class="ro-art ro-svg" viewBox="0 0 400 420" width="' + g.S + '" height="' + Math.round(g.S * 420 / 400) + '" aria-hidden="true">' + o + '</svg>');
    /* the two grips: real buttons over the hands (drag, or arrow keys), 44 px; the long one at the tip, the short one in its middle third */
    var grip = function (which, ang, rad, label) {
      var p = P(ang, rad), b = self._btn('ro-grip is-' + which, 'grip-' + which, label, '');
      b.style.left = (p[0] * k - 22).toFixed(1) + 'px'; b.style.top = (p[1] * k - 22).toFixed(1) + 'px'; b.disabled = st.done || !!v.run;
      b.addEventListener('pointerdown', function (e) { if (e.button || st.done || v.run) return; e.preventDefault(); self._dragHand(e, which); });
      b.addEventListener('keydown', function (e) { self._keyHand(e, which); });
      el.appendChild(b);
    };
    var rdL = Math.round(((st.long % 360) + 360) % 360 / 6) % 60, sh = C.readout(0, st.short), sa = ((st.short % 360) + 360) % 360, on = Math.abs(sa - Math.round(sa / 30) * 30) < 1.25;
    grip('long', H.long, R * 0.86, this._t('aLong', { n: rdL / 5 || 12, mm: (rdL < 10 ? '0' : '') + rdL }));
    grip('short', H.short, R * 0.38, on ? this._t('aShortOn', { h: (Math.round(sa / 30) % 12) || 12 }) : this._t('aShortBetween', { h: sh.h, h1: C.wrap(sh.h + 1) }));
  },
  _gearPath: function (x, y, r) {
    var o = '<circle class="ro-gearbody" cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    for (var i = 0; i < 8; i++) { var a = i * 45 * Math.PI / 180, x1 = x + (r + 5) * Math.cos(a), y1 = y + (r + 5) * Math.sin(a); o += '<circle class="ro-gearbody" cx="' + x1.toFixed(1) + '" cy="' + y1.toFixed(1) + '" r="4.5"/>'; }
    return o + '<circle class="ro-gearhole" cx="' + x + '" cy="' + y + '" r="5"/>';
  },
  _paintReadout: function () {
    var st = this.st, v = this._view, vr = st.verdict, C = RunOnCore, loc = this._loc(), el = this._qs('.ro-readout');
    var rd = st.done ? { h: st.round.h, m: st.round.m } : vr && v.shown ? vr.readout : null;
    if (!rd) { el.className = 'ro-readout ro-art is-empty'; el.innerHTML = '<span class="ro-hh">––</span><span class="ro-sep">' + (loc === 'fr' ? 'h' : ['nl', 'sv', 'da', 'no', 'fi'].indexOf(loc) >= 0 ? '.' : ':') + '</span><span class="ro-mm">––</span>'; el.setAttribute('data-readout', ''); el.removeAttribute('aria-label'); return; }
    var mm = (rd.m < 10 ? '0' : '') + rd.m, txt = C.fmt(loc, rd.h, rd.m), sep = loc === 'fr' ? ' h ' : txt.charAt(String(rd.h).length);
    el.className = 'ro-readout ro-art' + (st.done ? ' is-good' : '');
    el.innerHTML = '<span class="ro-hh' + (vr && rd.h !== st.round.h ? ' is-off' : '') + '">' + rd.h + '</span><span class="ro-sep">' + this._esc(sep) + '</span><span class="ro-mm' + (vr && !vr.longOk ? ' is-off' : '') + '">' + mm + '</span>';
    el.setAttribute('data-readout', rd.h + ':' + mm); el.setAttribute('aria-label', this._t('aReadout', { time: txt }));
  },
  _paintGo: function () {
    var st = this.st, self = this, el = this._qs('.ro-goline'); el.innerHTML = '';
    var c = this._btn('ro-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    c.disabled = st.done || !!this._view.run; c.addEventListener('click', function () { self._check(); }); el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { var v = this._view; v.note = ''; v.shown = false; v.arrive = null; this._paint(); },
  _setLong: function (d) { if (this._view.run || !RunOnCore.setLong(this.st, d)) return false; this.api.sound(520); this._moved(); return true; },
  _setShort: function (d) { if (this._view.run || !RunOnCore.setShort(this.st, d)) return false; this.api.sound(420); this._moved(); return true; },
  _keyHand: function (e, which) {
    var st = this.st, k = e.key, d = 0;
    if (k === 'ArrowRight' || k === 'ArrowUp') d = 1; else if (k === 'ArrowLeft' || k === 'ArrowDown') d = -1; else return;
    e.preventDefault();
    if (which === 'long') this._setLong(st.long + 30 * d); else this._setShort(st.short + (e.shiftKey ? 30 : 2.5) * d);
    this.api.announce(this._qs('[data-k="grip-' + which + '"]').getAttribute('aria-label'));
  },
  _dragHand: function (e, which) {
    var self = this, el = this._qs('.ro-clock');
    var angleAt = function (ev) { var r = el.getBoundingClientRect(), k = r.width / 400, x = ev.clientX - r.left - 200 * k, y = ev.clientY - r.top - 220 * k; return (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360; };
    this._endDrag();
    var mv = function (ev) { ev.preventDefault(); var a = angleAt(ev); if (which === 'long') self._setLong(a); else self._setShort(a); };
    var up = function () { self._endDrag(); var b = self._qs('[data-k="grip-' + which + '"]'); if (b) self.api.announce(b.getAttribute('aria-label')); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _check: function () {
    var st = this.st, v = this._view, C = RunOnCore, self = this; if (st.done || v.run) return;
    var base = { long: st.long, short: st.short }, res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    /* every Check: the readout flips, the gear slides in, the clock runs on to the next o'clock and back */
    var run = res.run, finish = function () {
      v.run = null; v.arrive = run;
      self.api.announce(run.square ? self._t('aRunSquare', { h1: run.struck }) : self._t('aRunCrooked', { a: run.between[0], b: run.between[1] }));
      if (res.result === 'ok') self._success(); else self._miss();
    };
    v.shown = true; v.note = ''; v.arrive = null;
    if (this.FAST || run.steps === 0) { v.arrive = run; this._paint(); finish(); return; }
    v.run = { long: base.long, short: base.short, i: 0 }; this._paint();
    var tick = function () {
      if (!v.run) return;
      if (v.run.i < run.steps) { v.run.i++; self.api.sound(640); self._paintClock(); self._later(tick, 120); }
      else { v.arrive = run; self._paintClock(); self.api.sound(run.square ? 880 : 180); self._later(finish, 600); }
    };
    this._later(tick, 250);
  },
  _miss: function () {
    var st = this.st, v = this._view, C = RunOnCore, key = C.hint(st);
    v.soft = false; v.note = this._t(key, C.args(st, this._loc()));
    this._paint(); this.api.announce(v.note); this.api.sound(240);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = RunOnCore;
    var msg = this._t(C.okKey(r), C.args(st, this._loc()));
    v.note = '';
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectRunOnCSS() {
  if (typeof document === 'undefined' || document.getElementById('ro-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ro-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .ro-wrap:focus{outline:none;}'
  + '.ro-main{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;} .ro-wrap.is-wide .ro-main{display:grid;grid-template-columns:auto 260px;grid-template-rows:auto auto;column-gap:22px;row-gap:12px;justify-content:center;align-items:center;} .ro-wrap.is-wide .ro-clock{grid-column:1;grid-row:1 / span 2;} .ro-wrap.is-wide .ro-target{grid-column:2;grid-row:1;align-self:end;} .ro-wrap.is-wide .ro-side{grid-column:2;grid-row:2;align-self:start;}'
  + '.ro-side{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;} .ro-wrap.is-wide .ro-side{flex-direction:column;}'
  + '.ro-target{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 14px;border-radius:14px;background:#2F3640;box-shadow:inset 0 0 0 3px ' + INK + ',0 3px 0 #14181D;}'
  + '.ro-digits{display:flex;align-items:center;gap:3px;font-family:' + H + ';font-weight:800;font-size:52px;line-height:1.05;} .ro-hh,.ro-mm{border-radius:9px;padding:0 8px;} .ro-target .ro-hh,.ro-readout .ro-hh{background:#FDE3D6;color:#C4522F;} .ro-target .ro-mm,.ro-readout .ro-mm{background:#DDF1EC;color:#146B5E;} .ro-sep{color:#FFF8E7;}'
  + '.ro-phrase{font-family:' + B + ';font-weight:800;font-size:19px;color:#FFF8E7;text-align:center;} .ro-wrap.is-narrow .ro-digits{font-size:40px;} .ro-wrap.is-narrow .ro-phrase{font-size:16px;} .ro-wrap.is-cramp .ro-digits{font-size:32px;} .ro-wrap.is-cramp .ro-phrase{font-size:14px;}'
  + '.ro-clock{position:relative;flex:none;touch-action:none;} .ro-svg{display:block;overflow:visible;}'
  + '.ro-bell{fill:#C9A23A;stroke:#7A5E14;stroke-width:2;} .ro-clapper{fill:#7A5E14;} .ro-stroke{fill:#FFD449;stroke:#B98B00;stroke-width:2;} .ro-clank{stroke:#C4522F;stroke-width:4;stroke-linecap:round;}'
  + '.ro-face{fill:#FFF8E7;} .ro-rim{fill:none;stroke:#146B5E;stroke-width:6;} .ro-tick{stroke:#9A9284;stroke-width:1.5;} .ro-tick.is-five{stroke:#6E6658;stroke-width:2.2;} .ro-tick.is-bold{stroke:#146B5E;stroke-width:4.5;}'
  + '.ro-num{font-family:' + H + ';font-weight:800;font-size:30px;fill:' + INK + ';stroke:#FFF8E7;stroke-width:5;paint-order:stroke;stroke-linejoin:round;} .ro-num.is-lit{fill:#B98B00;font-size:36px;}'
  + '.ro-min{font-family:' + H + ';font-weight:800;font-size:16px;fill:#146B5E;}'
  + '.ro-hhand{stroke:#F2784B;stroke-width:12;stroke-linecap:round;} .ro-mhand{stroke:#146B5E;stroke-width:6;stroke-linecap:round;} .ro-cap{fill:#C9A23A;stroke:' + INK + ';stroke-width:1.5;}'
  + '.ro-gearbody{fill:#C9A23A;stroke:#7A5E14;stroke-width:1.5;} .ro-gearhole{fill:#FFF8E7;} .ro-gear{opacity:.55;} .ro-gear.is-in{opacity:1;}'
  + '.ro-gap{fill:#F7C9B6;opacity:.55;} .ro-ring{fill:none;stroke:#146B5E;stroke-width:4;} .ro-crooked{fill:none;stroke:#C4522F;stroke-width:4;stroke-dasharray:5 4;}'
  + '.ro-slot-long{stroke:#146B5E;stroke-width:7;stroke-dasharray:8 6;stroke-linecap:round;opacity:.6;} .ro-slot-short{stroke:#C4522F;stroke-width:12;stroke-dasharray:8 6;stroke-linecap:round;opacity:.5;}'
  + '.ro-grip{position:absolute;width:44px;height:44px;border:0;border-radius:50%;padding:0;background:transparent;cursor:grab;touch-action:none;} .ro-grip::after{content:"";position:absolute;inset:9px;border-radius:50%;background:rgba(255,255,255,.55);box-shadow:inset 0 0 0 3px currentColor;} .ro-grip.is-long{color:#146B5E;} .ro-grip.is-short{color:#C4522F;} .ro-grip:focus-visible{outline:3px solid #2F3640;outline-offset:1px;} .ro-grip:disabled{cursor:default;} .ro-grip:disabled::after{display:none;}'
  + '.ro-readout{display:flex;align-items:center;gap:3px;padding:6px 12px;border-radius:12px;background:#2F3640;box-shadow:inset 0 0 0 3px ' + INK + ';font-family:' + H + ';font-weight:800;font-size:34px;line-height:1.1;} .ro-readout.is-empty .ro-hh,.ro-readout.is-empty .ro-mm{background:#4A525C;color:#8E96A0;} .ro-readout .is-off{box-shadow:0 0 0 3px #E0603A;} .ro-readout.is-good{box-shadow:inset 0 0 0 3px ' + INK + ',0 0 0 4px #FFD449;}'
  + '.ro-wrap.is-narrow .ro-readout{font-size:28px;}'
  + '.ro-wrap.is-done .ro-goline{display:none;} .ro-wrap.is-cramp.is-done .ro-side{display:none;}'
  + '.ro-go{height:52px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0E4F45;} .ro-go svg{width:22px;height:22px;} .ro-go:disabled{opacity:.45;cursor:default;} .ro-wrap.is-narrow .ro-go{height:48px;}'
  + '.ro-note{margin:0;max-width:640px;min-height:1.3em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .ro-wrap.is-narrow .ro-note{font-size:16px;line-height:1.25;} .ro-note.is-hint{color:#9A3412;} .ro-wrap.is-narrow .ro-note:empty{display:none;}'
  + '.ro-wrap.is-done .ro-goline{display:none;} .ro-wrap.is-done .ro-note:empty{display:none;}'
  + '.ro-wrap.is-fast *{animation:none !important;transition:none !important;}';
  var s = document.createElement('style'); s.id = 'ro-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.RunOnActivity = RunOnActivity;
