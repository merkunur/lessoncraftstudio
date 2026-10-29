/* =====================================================================
   minute-train-activity.js — ACTIVITY #161 of the one-by-one rebuild:
   "Sprocket's Clock — Read the Clock to Five Minutes" → THE MINUTE TRAIN
   (2.MD.C.7; all 11 locales). Model: minute-train-core.js
   (MinuteTrainCore). Design: docs/activities-rebuild/designs/161-clock-digital.md
   ---------------------------------------------------------------------
   A toy railway runs round the inside of the rim. Every carriage is
   exactly five minutes long; the child sends carriages out of the tunnel
   at the 12 until the train reaches the long hand — a level-crossing
   barrier it cannot pass — and the last roof says the minutes. The child
   writes the hour and the minutes on the card.
   Misses show their own picture: wrong minutes → the train the CHILD's
   minutes make (a part-carriage for "04"); the next hour → the train
   finishes the lap, and only the closing carriage steps the short hand on;
   any other hour → the short hand is outlined. Miss 2 builds the right
   train with "?" on the last roof. Solved → the train pushes the clock.
   No timer, no score.
   Test seams: window.MinuteTrainActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._add / ._remove / ._type /
   ._back / ._focus / ._check / ._g / .FAST / .OK_MS.
   ===================================================================== */
var MinuteTrainActivity = {
  id: 'minute-train',
  /* the drawn apparatus (the hierarchy gate): the clock, the railway, the card */
  apparatusClasses: ['mt-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Sprocket's Clock","de":"Sprockets Uhr","fr":"L’horloge de Sprocket","es":"El reloj de Sprocket","pt":"O relógio do Sprocket","it":"L’orologio di Sprocket","nl":"De klok van Kukel","sv":"Tores klocka","da":"Sprockets ur","no":"Sprockets klokke","fi":"Sprocketin kello"},
    instruction: {"en":"Read the clock. Tap the tunnel or + to send out carriages: each carriage is five minutes long, and the train stops at the long hand. The last roof says the minutes. The hour is the number the short hand is on or has passed. Write the time on the card and press Check.","de":"Lies die Uhrzeit ab. Tippe auf den Tunnel oder auf +, dann fährt ein Wagen heraus: Jeder Wagen ist fünf Minuten lang, und der Zug hält am großen Zeiger. Auf dem letzten Dach stehen die Minuten. Die Stunde ist die Zahl, auf der der kleine Zeiger steht oder an der er schon vorbei ist. Schreib die Uhrzeit auf die Karte und drück auf Prüfen.","fr":"Lis l’heure. Touche le tunnel ou + pour faire sortir des wagons : chaque wagon dure cinq minutes, et le train s’arrête à la grande aiguille. Le dernier toit indique les minutes. L’heure, c’est le nombre où se trouve la petite aiguille, ou celui qu’elle a dépassé. Écris l’heure sur la carte et appuie sur Vérifier.","es":"Lee el reloj. Toca el túnel o + para que salgan vagones: cada vagón mide cinco minutos, y el tren se detiene en la manecilla larga. El último techo dice los minutos. La hora es el número en el que está la manecilla corta o el que ya pasó. Escribe la hora en la tarjeta y presiona Revisar.","pt":"Leia o relógio. Toque no túnel ou no + para soltar vagões: cada vagão vale cinco minutos, e o trem para no ponteiro grande. O último teto mostra os minutos. A hora é o número em que o ponteiro pequeno está ou pelo qual ele já passou. Escreva a hora no cartão e aperte Conferir.","it":"Leggi l’orologio. Tocca la galleria o + per far uscire i vagoni: ogni vagone vale cinque minuti, e il treno si ferma alla lancetta lunga. L’ultimo tetto dice i minuti. L’ora è il numero su cui si trova la lancetta corta o quello che ha già superato. Scrivi l’ora sul cartellino e premi Controlla.","nl":"Lees de klok. Tik op de tunnel of op + om wagons te laten uitrijden: elke wagon is vijf minuten lang, en de trein stopt bij de grote wijzer. Op het laatste dak staan de minuten. Het uur is het getal waar de kleine wijzer op staat of al voorbij is. Schrijf de tijd op de kaart en druk op Controleer.","sv":"Läs klockan. Tryck på tunneln eller + för att skicka ut vagnar: varje vagn är fem minuter lång, och tåget stannar vid stora visaren. På det sista taket står minuterna. Timmen är den siffra som lilla visaren står på eller redan har passerat. Skriv tiden på kortet och tryck på Kolla.","da":"Læs uret. Tryk på tunnelen eller + for at sende vogne ud: hver vogn er fem minutter lang, og toget stopper ved den store viser. På det sidste tag står minutterne. Timen er det tal, den lille viser står på eller allerede er gået forbi. Skriv klokkeslættet på kortet, og tryk på Tjek.","no":"Les klokka. Trykk på tunnelen eller + for å sende ut vogner: hver vogn er fem minutter lang, og toget stopper ved den store viseren. På det siste taket står minuttene. Timen er tallet den lille viseren står på eller allerede har passert. Skriv klokkeslettet på kortet og trykk på Sjekk.","fi":"Lue kello. Napauta tunnelia tai +-painiketta, niin vaunuja lähtee liikkeelle: jokainen vaunu on viiden minuutin mittainen, ja juna pysähtyy pitkän viisarin kohdalle. Viimeisessä katossa lukee minuutit. Tunti on se numero, jonka kohdalla lyhyt viisari on tai jonka se on jo ohittanut. Kirjoita aika korttiin ja paina Tarkista."},
    taskLine: {"en":"What time is it? Write it on the card.","de":"Wie spät ist es? Schreib es auf die Karte.","fr":"Quelle heure est-il ? Écris-la sur la carte.","es":"¿Qué hora es? Escríbela en la tarjeta.","pt":"Que horas são? Escreva no cartão.","it":"Che ore sono? Scrivilo sul cartellino.","nl":"Hoe laat is het? Schrijf het op de kaart.","sv":"Vad är klockan? Skriv det på kortet.","da":"Hvad er klokken? Skriv det på kortet.","no":"Hva er klokka? Skriv det på kortet.","fi":"Paljonko kello on? Kirjoita se korttiin."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    hintBlank: {"en":"Write the hour and the minutes.","de":"Schreib die Stunde und die Minuten.","fr":"Écris l’heure et les minutes.","es":"Escribe la hora y los minutos.","pt":"Escreva a hora e os minutos.","it":"Scrivi l’ora e i minuti.","nl":"Schrijf het uur en de minuten.","sv":"Skriv timmen och minuterna.","da":"Skriv timen og minutterne.","no":"Skriv timen og minuttene.","fi":"Kirjoita tunti ja minuutit."},
    hintBump: {"en":"The train can't go past the long hand.","de":"Der Zug kann nicht über den großen Zeiger hinaus.","fr":"Le train ne peut pas dépasser la grande aiguille.","es":"El tren no puede pasar la manecilla larga.","pt":"O trem não pode passar do ponteiro grande.","it":"Il treno non può andare oltre la lancetta lunga.","nl":"De trein kan niet voorbij de grote wijzer.","sv":"Tåget kan inte åka förbi stora visaren.","da":"Toget kan ikke køre forbi den store viser.","no":"Toget kan ikke kjøre forbi den store viseren.","fi":"Juna ei pääse pitkän viisarin ohi."},
    hintMinutes: {"en":"Your minutes stop here. Where is the long hand?","de":"Deine Minuten hören hier auf. Wo ist der große Zeiger?","fr":"Tes minutes s’arrêtent ici. Où est la grande aiguille ?","es":"Tus minutos llegan hasta aquí. ¿Dónde está la manecilla larga?","pt":"Os seus minutos param aqui. Onde está o ponteiro grande?","it":"I tuoi minuti arrivano fin qui. Dov’è la lancetta lunga?","nl":"Jouw minuten stoppen hier. Waar is de grote wijzer?","sv":"Dina minuter slutar här. Var är stora visaren?","da":"Dine minutter stopper her. Hvor er den store viser?","no":"Minuttene dine stopper her. Hvor er den store viseren?","fi":"Sinun minuuttisi loppuvat tähän. Missä pitkä viisari on?"},
    hintNext: {"en":"The short hand gets to the next number only when the train goes all the way round. Which number has it passed?","de":"Der kleine Zeiger erreicht die nächste Zahl erst, wenn der Zug ganz herumgefahren ist. An welcher Zahl ist er schon vorbei?","fr":"La petite aiguille n’arrive au nombre suivant que quand le train a fait tout le tour. Quel nombre a-t-elle déjà dépassé ?","es":"La manecilla corta llega al siguiente número solo cuando el tren da toda la vuelta. ¿Qué número ya pasó?","pt":"O ponteiro pequeno só chega ao próximo número quando o trem dá a volta inteira. Por qual número ele já passou?","it":"La lancetta corta arriva al numero dopo solo quando il treno ha fatto tutto il giro. Quale numero ha già superato?","nl":"De kleine wijzer komt pas bij het volgende getal als de trein helemaal rond is. Welk getal is hij al voorbij?","sv":"Lilla visaren kommer fram till nästa siffra först när tåget har åkt hela varvet. Vilken siffra har den redan passerat?","da":"Den lille viser når først det næste tal, når toget har kørt hele vejen rundt. Hvilket tal er den allerede gået forbi?","no":"Den lille viseren kommer først til neste tall når toget har kjørt hele runden. Hvilket tall har den allerede passert?","fi":"Lyhyt viisari pääsee seuraavaan numeroon vasta, kun juna on ajanut koko kierroksen. Minkä numeron se on jo ohittanut?"},
    hintHour: {"en":"The short hand shows the hour. Which number has it passed?","de":"Der kleine Zeiger zeigt die Stunde. An welcher Zahl ist er schon vorbei?","fr":"La petite aiguille montre l’heure. Quel nombre a-t-elle déjà dépassé ?","es":"La manecilla corta marca la hora. ¿Qué número ya pasó?","pt":"O ponteiro pequeno mostra a hora. Por qual número ele já passou?","it":"La lancetta corta segna l’ora. Quale numero ha già superato?","nl":"De kleine wijzer wijst het uur aan. Welk getal is hij al voorbij?","sv":"Lilla visaren visar timmen. Vilken siffra har den redan passerat?","da":"Den lille viser fortæller timen. Hvilket tal er den allerede gået forbi?","no":"Den lille viseren forteller timen. Hvilket tall har den allerede passert?","fi":"Lyhyt viisari näyttää tunnin. Minkä numeron se on jo ohittanut?"},
    hintHourOn: {"en":"The short hand shows the hour. Which number is it on?","de":"Der kleine Zeiger zeigt die Stunde. Auf welcher Zahl steht er?","fr":"La petite aiguille montre l’heure. Sur quel nombre est-elle ?","es":"La manecilla corta marca la hora. ¿En qué número está?","pt":"O ponteiro pequeno mostra a hora. Em qual número ele está?","it":"La lancetta corta segna l’ora. Su quale numero si trova?","nl":"De kleine wijzer wijst het uur aan. Op welk getal staat hij?","sv":"Lilla visaren visar timmen. Vilken siffra står den på?","da":"Den lille viser fortæller timen. Hvilket tal står den på?","no":"Den lille viseren forteller timen. Hvilket tall står den på?","fi":"Lyhyt viisari näyttää tunnin. Minkä numeron kohdalla se on?"},
    hintChange: {"en":"Change your answer first, then press Check.","de":"Ändere zuerst deine Antwort, dann drück auf Prüfen.","fr":"Change d’abord ta réponse, puis appuie sur Vérifier.","es":"Primero cambia tu respuesta y luego presiona Revisar.","pt":"Primeiro mude a sua resposta e depois aperte Conferir.","it":"Prima cambia la tua risposta, poi premi Controlla.","nl":"Verander eerst je antwoord en druk dan op Controleer.","sv":"Ändra ditt svar först och tryck sedan på Kolla.","da":"Ret dit svar først, og tryk så på Tjek.","no":"Endre svaret ditt først, og trykk så på Sjekk.","fi":"Muuta ensin vastaustasi ja paina sitten Tarkista."},
    hintHelp: {"en":"Count the carriages by fives up to the long hand: 5, 10, 15… The short hand has passed the bold number.","de":"Zähl die Wagen in Fünferschritten bis zum großen Zeiger: 5, 10, 15 … Der kleine Zeiger ist an der dicken Zahl schon vorbei.","fr":"Compte les wagons de 5 en 5 jusqu’à la grande aiguille : 5, 10, 15… La petite aiguille a dépassé le nombre en gras.","es":"Cuenta los vagones de 5 en 5 hasta la manecilla larga: 5, 10, 15… La manecilla corta ya pasó el número en negrita.","pt":"Conte os vagões de 5 em 5 até o ponteiro grande: 5, 10, 15… O ponteiro pequeno já passou do número em negrito.","it":"Conta i vagoni di 5 in 5 fino alla lancetta lunga: 5, 10, 15… La lancetta corta ha superato il numero in grassetto.","nl":"Tel de wagons per 5 tot aan de grote wijzer: 5, 10, 15 … De kleine wijzer is het dikke getal al voorbij.","sv":"Räkna vagnarna med fem i taget fram till stora visaren: 5, 10, 15 … Lilla visaren har passerat den feta siffran.","da":"Tæl vognene fem ad gangen hen til den store viser: 5, 10, 15 … Den lille viser er gået forbi det fede tal.","no":"Tell vognene fem om gangen bort til den store viseren: 5, 10, 15 … Den lille viseren har passert det fete tallet.","fi":"Laske vaunut viisi kerrallaan pitkään viisariin asti: 5, 10, 15 … Lyhyt viisari on ohittanut lihavoidun numeron."},
    okFive: {"en":"{t} — the long hand is on the {n}: {count} minutes. The short hand has passed the {h}.","de":"{t} — Der große Zeiger steht auf der {n}: {count} Minuten. Der kleine ist an der {h} vorbei.","fr":"{t} — la grande aiguille est sur le {n} : {count} minutes. La petite a dépassé le {h}.","es":"{t} — la manecilla larga está en el {n}: {count} minutos. La corta ya pasó el {h}.","pt":"{t} — o ponteiro grande está no {n}: {count} minutos. O pequeno já passou do {h}.","it":"{t} — la lancetta lunga è sul numero {n}: {count} minuti. Quella corta ha superato il numero {h}.","nl":"{t} — de grote wijzer staat op de {n}: {count} minuten. De kleine is de {h} voorbij.","sv":"{t} — stora visaren står på {n}:an: {count} minuter. Lilla visaren har passerat {h}:an.","da":"{t} — den store viser står på {n}-tallet: {count} minutter. Den lille viser er gået forbi {h}-tallet.","no":"{t} — den store viseren står på {n}-tallet: {count} minutter. Den lille viseren har passert {h}-tallet.","fi":"{t} — pitkä viisari on numeron {n} kohdalla: {count} minuuttia. Lyhyt viisari on ohittanut numeron {h}."},
    okOclock: {"en":"{t} — {h} o’clock: the long hand is on the 12 and the short hand is on the {h}.","de":"{t} — {h} Uhr: Der große Zeiger steht auf der 12, der kleine auf der {h}.","fr":"{t} — {h} heures pile : la grande aiguille est sur le 12, la petite sur le {h}.","es":"{t} — las {h} en punto: la manecilla larga está en el 12 y la corta en el {h}.","pt":"{t} — {h} em ponto: o ponteiro grande está no 12 e o pequeno no {h}.","it":"{t} — le {h} in punto: la lancetta lunga è sul numero 12 e quella corta sul numero {h}.","nl":"{t} — {h} uur: de grote wijzer staat op de 12 en de kleine op de {h}.","sv":"{t} — klockan {h}: stora visaren står på 12:an och lilla visaren på {h}:an.","da":"{t} — klokken {h}: den store viser står på 12-tallet, og den lille viser står på {h}-tallet.","no":"{t} — klokka {h}: den store viseren står på 12-tallet, og den lille viseren står på {h}-tallet.","fi":"{t} — tasan {h}: pitkä viisari on numeron 12 kohdalla ja lyhyt viisari numeron {h} kohdalla."},
    okPast: {"en":"{t} — quarter past {h}: the long hand is on the 3, and the short hand has just passed the {h}.","de":"{t} — Viertel nach {h}: Der große Zeiger steht auf der 3, der kleine ist gerade an der {h} vorbei.","fr":"{t} — {h} heures et quart : la grande aiguille est sur le 3, la petite vient de dépasser le {h}.","es":"{t} — las {h} y cuarto: la manecilla larga está en el 3 y la corta acaba de pasar el {h}.","pt":"{t} — {h} e quinze: o ponteiro grande está no 3 e o pequeno acabou de passar do {h}.","it":"{t} — le {h} e un quarto: la lancetta lunga è sul numero 3 e quella corta ha appena superato il numero {h}.","nl":"{t} — kwart over {h}: de grote wijzer staat op de 3 en de kleine is net voorbij de {h}.","sv":"{t} — kvart över {h}: stora visaren står på 3:an och lilla visaren har precis passerat {h}:an.","da":"{t} — kvart over {h}: den store viser står på 3-tallet, og den lille viser er lige gået forbi {h}-tallet.","no":"{t} — kvart over {h}: den store viseren står på 3-tallet, og den lille viseren har akkurat passert {h}-tallet.","fi":"{t} — varttia yli {h}: pitkä viisari on numeron 3 kohdalla, ja lyhyt viisari on juuri ohittanut numeron {h}."},
    okHalf: {"en":"{t} — half past {h}: the long hand is on the 6, and the short hand is halfway between the {h} and the {h1}.","de":"{t} — halb {h1}: Der große Zeiger steht auf der 6, der kleine genau zwischen der {h} und der {h1}.","fr":"{t} — {h} heures et demie : la grande aiguille est sur le 6, la petite à mi-chemin entre le {h} et le {h1}.","es":"{t} — las {h} y media: la manecilla larga está en el 6 y la corta, a la mitad entre el {h} y el {h1}.","pt":"{t} — {h} e meia: o ponteiro grande está no 6 e o pequeno fica no meio, entre o {h} e o {h1}.","it":"{t} — le {h} e mezza: la lancetta lunga è sul numero 6 e quella corta è a metà tra i numeri {h} e {h1}.","nl":"{t} — half {h1}: de grote wijzer staat op de 6 en de kleine precies tussen de {h} en de {h1}.","sv":"{t} — halv {h1}: stora visaren står på 6:an och lilla visaren mitt emellan {h}:an och {h1}:an.","da":"{t} — halv {h1}: den store viser står på 6-tallet, og den lille viser står midt mellem {h}-tallet og {h1}-tallet.","no":"{t} — halv {h1}: den store viseren står på 6-tallet, og den lille viseren står midt mellom {h}-tallet og {h1}-tallet.","fi":"{t} — puoli {h1}: pitkä viisari on numeron 6 kohdalla, ja lyhyt viisari on numeroiden {h} ja {h1} puolivälissä."},
    okTo: {"en":"{t} — quarter to {h1}: the long hand is on the 9, and the short hand has passed the {h} and is nearly at the {h1}.","de":"{t} — Viertel vor {h1}: Der große Zeiger steht auf der 9, der kleine ist an der {h} vorbei und fast bei der {h1}.","fr":"{t} — {h1} heures moins le quart : la grande aiguille est sur le 9, la petite a dépassé le {h} et arrive presque au {h1}.","es":"{t} — cuarto para las {h1}: la manecilla larga está en el 9; la corta ya pasó el {h} y casi llega al {h1}.","pt":"{t} — quinze para as {h1}: o ponteiro grande está no 9; o pequeno já passou do {h} e quase chega ao {h1}.","it":"{t} — le {h1} meno un quarto: la lancetta lunga è sul numero 9; quella corta ha superato il numero {h} ed è quasi sul numero {h1}.","nl":"{t} — kwart voor {h1}: de grote wijzer staat op de 9; de kleine is de {h} voorbij en bijna bij de {h1}.","sv":"{t} — kvart i {h1}: stora visaren står på 9:an; lilla visaren har passerat {h}:an och är nästan framme vid {h1}:an.","da":"{t} — kvart i {h1}: den store viser står på 9-tallet; den lille viser er gået forbi {h}-tallet og er næsten ved {h1}-tallet.","no":"{t} — kvart på {h1}: den store viseren står på 9-tallet; den lille viseren har passert {h}-tallet og er nesten ved {h1}-tallet.","fi":"{t} — varttia vaille {h1}: pitkä viisari on numeron 9 kohdalla; lyhyt viisari on ohittanut numeron {h} ja on melkein numeron {h1} kohdalla."},
    aAdd: {"en":"Send out a carriage (five minutes)","de":"Einen Wagen herausfahren lassen (fünf Minuten)","fr":"Faire sortir un wagon (cinq minutes)","es":"Sacar un vagón (cinco minutos)","pt":"Soltar um vagão (cinco minutos)","it":"Far uscire un vagone (cinque minuti)","nl":"Een wagon laten uitrijden (vijf minuten)","sv":"Skicka ut en vagn (fem minuter)","da":"Send en vogn ud (fem minutter)","no":"Send ut en vogn (fem minutter)","fi":"Lähetä vaunu (viisi minuuttia)"},
    aRemove: {"en":"Send the last carriage back","de":"Den letzten Wagen zurückfahren lassen","fr":"Faire rentrer le dernier wagon","es":"Regresar el último vagón","pt":"Mandar o último vagão de volta","it":"Far rientrare l’ultimo vagone","nl":"De laatste wagon terug laten rijden","sv":"Skicka tillbaka den sista vagnen","da":"Send den sidste vogn tilbage","no":"Send den siste vognen tilbake","fi":"Lähetä viimeinen vaunu takaisin"},
    aCar: {"en":"Carriage {k}: {m} minutes","de":"Wagen {k}: {m} Minuten","fr":"Wagon {k} : {m} minutes","es":"Vagón {k}: {m} minutos","pt":"Vagão {k}: {m} minutos","it":"Vagone {k}: {m} minuti","nl":"Wagon {k}: {m} minuten","sv":"Vagn {k}: {m} minuter","da":"Vogn {k}: {m} minutter","no":"Vogn {k}: {m} minutter","fi":"Vaunu {k}: {m} minuuttia"},
    aTrain: {"en":"Carriages on the track: {k} ({m} minutes).","de":"Wagen auf den Schienen: {k} ({m} Minuten).","fr":"Wagons sur la voie : {k} ({m} minutes).","es":"Vagones en la vía: {k} ({m} minutos).","pt":"Vagões nos trilhos: {k} ({m} minutos).","it":"Vagoni sui binari: {k} ({m} minuti).","nl":"Wagons op het spoor: {k} ({m} minuten).","sv":"Vagnar på spåret: {k} ({m} minuter).","da":"Vogne på sporet: {k} ({m} minutter).","no":"Vogner på sporet: {k} ({m} minutter).","fi":"Vaunuja raiteilla: {k} ({m} minuuttia)."},
    aHourBox: {"en":"Hour box: {v}","de":"Stundenfeld: {v}","fr":"Case des heures : {v}","es":"Casilla de la hora: {v}","pt":"Caixa da hora: {v}","it":"Casella delle ore: {v}","nl":"Vakje voor het uur: {v}","sv":"Ruta för timmen: {v}","da":"Felt til timen: {v}","no":"Rute for timen: {v}","fi":"Tuntiruutu: {v}"},
    aMinBox: {"en":"Minute box: {v}","de":"Minutenfeld: {v}","fr":"Case des minutes : {v}","es":"Casilla de los minutos: {v}","pt":"Caixa dos minutos: {v}","it":"Casella dei minuti: {v}","nl":"Vakje voor de minuten: {v}","sv":"Ruta för minuterna: {v}","da":"Felt til minutterne: {v}","no":"Rute for minuttene: {v}","fi":"Minuuttiruutu: {v}"},
    aBack: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Radera","da":"Slet","no":"Slett","fi":"Poista"},
    aClockOn: {"en":"The long hand is on the 12 and the short hand is on the {a}.","de":"Der große Zeiger steht auf der 12, der kleine auf der {a}.","fr":"La grande aiguille est sur le 12 et la petite sur le {a}.","es":"La manecilla larga está en el 12 y la corta en el {a}.","pt":"O ponteiro grande está no 12 e o pequeno no {a}.","it":"La lancetta lunga è sul numero 12 e quella corta sul numero {a}.","nl":"De grote wijzer staat op de 12 en de kleine op de {a}.","sv":"Stora visaren står på 12:an och lilla visaren på {a}:an.","da":"Den store viser står på 12-tallet, og den lille viser står på {a}-tallet.","no":"Den store viseren står på 12-tallet, og den lille viseren står på {a}-tallet.","fi":"Pitkä viisari on numeron 12 kohdalla ja lyhyt viisari numeron {a} kohdalla."},
    aClockBetween: {"en":"The long hand is on the {n}; the short hand is between the {a} and the {b}.","de":"Der große Zeiger steht auf der {n}, der kleine zwischen der {a} und der {b}.","fr":"La grande aiguille est sur le {n} ; la petite est entre le {a} et le {b}.","es":"La manecilla larga está en el {n}; la corta, entre el {a} y el {b}.","pt":"O ponteiro grande está no {n}; o pequeno, entre o {a} e o {b}.","it":"La lancetta lunga è sul numero {n}; quella corta è tra i numeri {a} e {b}.","nl":"De grote wijzer staat op de {n}; de kleine staat tussen de {a} en de {b}.","sv":"Stora visaren står på {n}:an; lilla visaren står mellan {a}:an och {b}:an.","da":"Den store viser står på {n}-tallet; den lille viser står mellem {a}-tallet og {b}-tallet.","no":"Den store viseren står på {n}-tallet; den lille viseren står mellom {a}-tallet og {b}-tallet.","fi":"Pitkä viisari on numeron {n} kohdalla; lyhyt viisari on numeroiden {a} ja {b} välissä."},
    aClockDone: {"en":"The clock shows {time}.","de":"Die Uhr zeigt {time}.","fr":"L’horloge indique {time}.","es":"El reloj marca {time}.","pt":"O relógio mostra {time}.","it":"L’orologio segna {time}.","nl":"De klok wijst {time} aan.","sv":"Klockan visar {time}.","da":"Uret viser {time}.","no":"Klokka viser {time}.","fi":"Kello näyttää {time}."},
    setTimes: {"en":"Times","de":"Uhrzeiten","fr":"Heures","es":"Horas","pt":"Horas","it":"Orari","nl":"Tijden","sv":"Tider","da":"Klokkeslæt","no":"Klokkeslett","fi":"Ajat"},
    tL1: {"en":"Quarter hours","de":"Viertelstunden","fr":"Quarts d’heure","es":"Cuartos de hora","pt":"Quartos de hora","it":"Quarti d’ora","nl":"Kwartieren","sv":"Kvartar","da":"Kvarterer","no":"Kvarter","fi":"Vartit"},
    tL2: {"en":"Five minutes","de":"5-Minuten-Schritte","fr":"Minutes de 5 en 5","es":"De 5 en 5 minutos","pt":"De 5 em 5 minutos","it":"Minuti di 5 in 5","nl":"Per 5 minuten","sv":"Var femte minut","da":"Hvert femte minut","no":"Hvert femte minutt","fi":"Viiden minuutin välein"},
    setRoof: {"en":"Roof numbers","de":"Zahlen auf den Dächern","fr":"Nombres sur les toits","es":"Números en los techos","pt":"Números nos tetos","it":"Numeri sui tetti","nl":"Getallen op de daken","sv":"Siffror på taken","da":"Tal på tagene","no":"Tall på takene","fi":"Numerot katoissa"},
    rShown: {"en":"Shown","de":"Sichtbar","fr":"Affichés","es":"Visibles","pt":"Visíveis","it":"Visibili","nl":"Zichtbaar","sv":"Synliga","da":"Vises","no":"Vises","fi":"Näkyvissä"},
    rHidden: {"en":"Hidden","de":"Versteckt","fr":"Cachés","es":"Ocultos","pt":"Escondidos","it":"Nascosti","nl":"Verborgen","sv":"Dolda","da":"Skjult","no":"Skjult","fi":"Piilossa"}
  },/*STRINGS-END*/
  defaults: { times: '1', roof: 'shown' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [{ value: '1', labelKey: 'tL1' }, { value: '2', labelKey: 'tL2' }] },
    { key: 'roof', type: 'choice', labelKey: 'setRoof', options: [{ value: 'shown', labelKey: 'rShown' }, { value: 'hidden', labelKey: 'rHidden' }] }
  ],
  OK_MS: 500, FAST: false,
  THEMES: ['farm-animals'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._themes = {}; this._picsReady = false; this._bumpSaid = false;
    injectMinuteTrainCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function (e) { if (typeof console !== 'undefined') console.error(e); });
    }
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return MinuteTrainCore.levelOf(this._setting('times')); },
  _roof: function () { return this._setting('roof') !== 'hidden'; },
  _loc: function () { return MinuteTrainCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level(); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = MinuteTrainCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = MinuteTrainCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'minute-train.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = MinuteTrainCore.newState(this._level(), k);
    this._view = { note: '', soft: false, win: false, fresh: -1, bump: false, step: false, honour: false };
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'mt-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="mt-main"><div class="mt-clock" data-qa="clock"></div><div class="mt-side"><div class="mt-row"><div class="mt-train-btns"></div><div class="mt-card"></div></div><div class="mt-pad"></div></div></div><p class="mt-note" data-qa="note" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._keyboard(e); });
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
    var wide = W >= 560, cramp = W < 330;
    var S = wide ? Math.min(400, W - 270) : cramp ? Math.min(280, W - 8) : Math.min(320, W - 8);
    /* the smallest phones, once solved: the clock closes up so the success line and Next stay above the fold */
    if (cramp && done) S = Math.min(S, 180);
    return { W: W, wide: wide, cramp: cramp, S: S, rooster: wide ? 96 : 64 };
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width();
    var g = this._g = this._geometry(W, st.done);
    this._wrap.className = 'mt-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    this._paintClock();
    this._paintTrainBtns();
    this._paintCard();
    this._paintPad();
    var note = this._qs('.mt-note');
    if (v.note) { note.textContent = v.note; note.className = 'mt-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'mt-note'; }
    this._setPrompt();
    v.fresh = -1;
  },
  /* an annular sector of the railway: from a0° to a1° clockwise from the 12 */
  _sector: function (a0, a1, r1, r2) {
    var P = function (a, r) { var t = (a - 90) * Math.PI / 180; return (200 + r * Math.cos(t)).toFixed(1) + ' ' + (200 + r * Math.sin(t)).toFixed(1); };
    var big = a1 - a0 > 180 ? 1 : 0;
    return 'M' + P(a0, r2) + 'A' + r2 + ' ' + r2 + ' 0 ' + big + ' 1 ' + P(a1, r2) + 'L' + P(a1, r1) + 'A' + r1 + ' ' + r1 + ' 0 ' + big + ' 0 ' + P(a0, r1) + 'Z';
  },
  /* one carriage k (1-based): exactly one number-gap, [30(k−1)°, 30k°]; roof says 5k (or "?", or nothing when roof numbers are hidden) */
  _car: function (k, cls, roof, frac) {
    var C = MinuteTrainCore, a0 = 30 * (k - 1) + 1.6, a1 = 30 * (k - 1) + 30 * (frac || 1) - 1.6, mid = (a0 + a1) / 2, t = (mid - 90) * Math.PI / 180;
    var o = '<g class="mt-car' + cls + '" data-car="' + k + '"' + (frac && frac < 1 ? ' data-part="' + frac + '"' : '') + '><path d="' + this._sector(a0, a1, 112, 142) + '"/>';
    /* wheels */
    [a0 + 5, a1 - 5].forEach(function (a) { if (a1 - a0 < 12) return; var w = (a - 90) * Math.PI / 180; o += '<circle class="mt-wheel" cx="' + (200 + 145 * Math.cos(w)).toFixed(1) + '" cy="' + (200 + 145 * Math.sin(w)).toFixed(1) + '" r="4.5"/>'; });
    if (roof !== null && roof !== undefined) o += '<text class="mt-roof" x="' + (200 + 127 * Math.cos(t)).toFixed(1) + '" y="' + (200 + 127 * Math.sin(t) + 6).toFixed(1) + '" text-anchor="middle">' + roof + '</text>';
    return o + '</g>';
  },
  _paintClock: function () {
    var st = this.st, r = st.round, g = this._g, C = MinuteTrainCore, v = this._view, el = this._qs('.mt-clock'), self = this, roofOn = this._roof();
    var P = function (a, rad) { var t = (a - 90) * Math.PI / 180; return [200 + rad * Math.cos(t), 200 + rad * Math.sin(t)]; };
    var vk = st.verdict && st.verdict.kind, help = st.help && !!vk;
    var clock = st.done ? C.freeClock(st) : { h: r.h, m: r.m, cars: st.cars };
    el.innerHTML = ''; el.style.width = g.S + 'px'; el.style.height = g.S + 'px';
    var o = '<circle class="mt-face" cx="200" cy="200" r="190"/>';
    for (var i = 0; i < 60; i++) { var t1 = P(i * 6, 186), t2 = P(i * 6, i % 5 ? 180 : 174); o += '<path class="mt-tick' + (i % 5 ? '' : ' is-hour') + '" d="M' + t1[0].toFixed(1) + ' ' + t1[1].toFixed(1) + 'L' + t2[0].toFixed(1) + ' ' + t2[1].toFixed(1) + '"/>'; }
    /* miss 2: the number the short hand has passed is bold */
    for (var h = 1; h <= 12; h++) { var q = P(h * 30, 160), bold = help && (r.h % 12 || 12) === h; o += '<text class="mt-num' + (bold ? ' is-bold' : '') + '" x="' + q[0].toFixed(1) + '" y="' + (q[1] + 9).toFixed(1) + '" text-anchor="middle">' + h + '</text>'; }
    o += '<circle class="mt-rim" cx="200" cy="200" r="190"/>';
    /* the railway: two rails and sleepers every 6° */
    for (var s = 0; s < 360; s += 6) { var s1 = P(s, 108), s2 = P(s, 146); o += '<path class="mt-sleeper" d="M' + s1[0].toFixed(1) + ' ' + s1[1].toFixed(1) + 'L' + s2[0].toFixed(1) + ' ' + s2[1].toFixed(1) + '"/>'; }
    o += '<circle class="mt-rail" cx="200" cy="200" r="112"/><circle class="mt-rail" cx="200" cy="200" r="142"/>';
    /* the train */
    var train = '';
    if (vk && !help && vk === 'minutes') {
      /* the CHILD's minutes: whole carriages (pale past the long hand) and the part of one more */
      var ct = C.childTrain(st.verdict.m), max = C.maxCars(r);
      for (var k = 1; k <= Math.min(12, ct.whole); k++) train += this._car(k, k > max ? ' is-over' : ' is-child', roofOn ? 5 * k : null);
      if (ct.part > 0 && ct.whole < 12) train += this._car(ct.whole + 1, ' is-part', null, ct.part);
    } else if (help) {
      /* miss 2: the right train, every roof lit except the last ("?") */
      var mx = C.maxCars(r);
      for (var k2 = 1; k2 <= mx; k2++) train += this._car(k2, ' is-help', k2 === mx ? '?' : roofOn ? 5 * k2 : null);
    } else {
      /* the next hour: the minutes were right, so the train runs to the long hand — and then finishes the lap in pale carriages to the 12 */
      var shownCars = vk === 'nextHour' ? C.maxCars(r) : clock.cars;
      for (var k3 = 1; k3 <= shownCars; k3++) train += this._car(k3, (k3 === v.fresh ? ' is-new' : '') + (v.bump && k3 === clock.cars ? ' is-bump' : ''), roofOn ? 5 * k3 : null);
      if (vk === 'nextHour') for (var k4 = C.maxCars(r) + 1; k4 <= 12; k4++) train += this._car(k4, ' is-lap', null);
      if (v.bump && clock.cars === 0) train += this._car(1, ' is-bump is-ghostcar', null, 0.35);
    }
    o += '<g class="mt-train' + (v.honour ? ' is-honour' : '') + '" data-cars="' + clock.cars + '">' + train + '</g>';
    /* the tunnel: a slim stone portal at the 12, where the line starts (carriages run under it); its sign says +5 when the roofs count */
    o += '<g class="mt-tunnel" data-k="tunnel"><path class="mt-hit" d="' + this._sector(-12, 12, 96, 160) + '"/><path class="mt-arch" d="' + this._sector(-5, 5, 104, 150) + '"/>'
      + (roofOn ? '<g class="mt-sign" data-sign="5"><rect x="183" y="58" width="34" height="22" rx="6"/><text x="200" y="75" text-anchor="middle">+5</text></g>' : '') + '</g>';
    /* the hands: the long hand is the level-crossing barrier where it crosses the rails */
    var ma = C.minuteAngle(clock.m), ha = C.hourAngle(clock.h, clock.m);
    var hand = function (ang, len, cls, extra) { var e = P(ang, len); return '<path class="' + cls + '"' + (extra || '') + ' d="M200 200L' + e[0].toFixed(1) + ' ' + e[1].toFixed(1) + '"/>'; };
    var b1 = P(ma, 106), b2 = P(ma, 148);
    o += hand(ma, 152, 'mt-mhand', ' data-minute="' + ma + '"');
    o += '<path class="mt-barrier' + (vk === 'minutes' ? ' is-pulse' : '') + '" d="M' + b1[0].toFixed(1) + ' ' + b1[1].toFixed(1) + 'L' + b2[0].toFixed(1) + ' ' + b2[1].toFixed(1) + '"/><path class="mt-barrier-red" d="M' + b1[0].toFixed(1) + ' ' + b1[1].toFixed(1) + 'L' + b2[0].toFixed(1) + ' ' + b2[1].toFixed(1) + '"/>';
    var outline = vk === 'hour' || vk === 'swap' || help;
    if (outline) o += hand(ha, 92, 'mt-hhand-ink', ' data-outline="1"');
    o += hand(ha, 92, 'mt-hhand' + (outline ? ' is-outline' : ''), ' data-hour="' + ha + '"');
    /* the next hour: only the closing carriage steps the short hand onto the next number (shown for a moment) */
    if (v.step) o += hand(C.hourAngle(r.h % 12 + 1, 0), 92, 'mt-hhand is-step', ' data-step="1"');
    o += '<circle class="mt-cap" cx="200" cy="200" r="9"/>';
    el.insertAdjacentHTML('beforeend', '<svg class="mt-art mt-svg" viewBox="0 0 400 400" width="' + g.S + '" height="' + g.S + '" aria-hidden="true">' + o + '</svg>');
    var tun = el.querySelector('.mt-tunnel'); if (tun) tun.addEventListener('click', function () { self._add(); });
    /* the hands read aloud: a description of the hands, never the time (until it is solved) */
    var sr = document.createElement('span'); sr.className = 'mt-srtext';
    var hh = clock.h % 12 || 12;
    sr.textContent = st.done ? this._t('aClockDone', { time: C.fmt(this._loc(), clock.h, clock.m) }) : this._t(clock.m ? 'aClockBetween' : 'aClockOn', { n: C.longNumber(clock.m), a: hh, b: hh % 12 + 1 }) + ' ' + this._t('aTrain', { k: clock.cars, m: clock.cars * 5 });
    el.appendChild(sr);
  },
  _paintTrainBtns: function () {
    var st = this.st, self = this, el = this._qs('.mt-train-btns'); el.innerHTML = '';
    var add = this._btn('mt-tbtn is-add', 'add', this._t('aAdd'), '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 32V20a14 14 0 0 1 28 0v12" fill="#B8AE9C" stroke="#2F2A3B" stroke-width="2.5"/><path d="M12 32V21a8 8 0 0 1 16 0v11z" fill="#2F2A3B"/><path d="M20 8v-6M17 5h6" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/></svg><span>+</span>');
    add.addEventListener('click', function () { self._add(); }); el.appendChild(add);
    var rm = this._btn('mt-tbtn is-remove', 'remove', this._t('aRemove'), '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 32V20a14 14 0 0 1 28 0v12" fill="#B8AE9C" stroke="#2F2A3B" stroke-width="2.5"/><path d="M12 32V21a8 8 0 0 1 16 0v11z" fill="#2F2A3B"/></svg><span>−</span>');
    var frozen = st.done && (st.free === null || st.free === st.round.h * 60 + st.round.m);
    rm.disabled = st.done ? frozen : st.cars === 0; rm.addEventListener('click', function () { self._remove(); }); el.appendChild(rm);
  },
  /* the digital card: an hour box and a minute box, the locale's separator between them (fr « h ») */
  _paintCard: function () {
    var st = this.st, self = this, el = this._qs('.mt-card'), loc = this._loc(), vk = st.verdict && st.verdict.kind, C = MinuteTrainCore;
    el.innerHTML = ''; el.className = 'mt-card mt-art' + (st.done ? ' is-glow' : '');
    var sep = loc === 'fr' ? 'h' : ['nl', 'sv', 'da', 'no', 'fi'].indexOf(loc) >= 0 ? '.' : ':';
    var fc = st.done ? C.freeClock(st) : null;
    ['h', 'm'].forEach(function (b, i) {
      var markIt = (b === 'h' && /^(hour|swap|nextHour)$/.test(vk || '')) || (b === 'm' && vk === 'minutes');
      var val = fc ? (b === 'h' ? String(fc.h) : (fc.m < 10 ? '0' : '') + fc.m) : st[b];
      var x = self._btn('mt-box' + (st.focus === b && !st.done ? ' is-focus' : '') + (markIt ? ' is-mark' : '') + (b === 'h' ? ' is-h' : ' is-m'), 'box-' + b, self._t(b === 'h' ? 'aHourBox' : 'aMinBox', { v: val || '—' }), self._esc(val || ''));
      x.setAttribute('data-value', val); x.disabled = st.done; x.setAttribute('inputmode', 'numeric');
      x.addEventListener('click', function () { self._focus(b); });
      el.appendChild(x);
      if (!i) { var s = document.createElement('span'); s.className = 'mt-sep'; s.textContent = sep; el.appendChild(s); }
    });
    var ro = this._themes['farm-animals'], old = this._qs('.mt-row .mt-rooster'); if (old) old.remove();
    if (st.done && ro && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(ro, 'rooster', loc, { size: this._g.rooster }); im.className = 'mt-rooster mt-art' + (this._view.win ? ' is-crow' : ''); im.alt = ''; im.setAttribute('data-rooster', '1'); im.style.width = this._g.rooster + 'px'; im.style.height = this._g.rooster + 'px'; this._qs('.mt-row').appendChild(im); }
  },
  _paintPad: function () {
    var st = this.st, self = this, el = this._qs('.mt-pad'); el.innerHTML = '';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].forEach(function (d) {
      var b = self._btn('mt-key', 'key-' + d, d, d); b.disabled = st.done;
      b.addEventListener('click', function () { self._type(d); }); el.appendChild(b);
    });
    var bk = this._btn('mt-key mt-back', 'back', this._t('aBack'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11v12H9l-6-6z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 9.5l5 5M17 9.5l-5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>');
    bk.disabled = st.done || (!st.h && !st.m); bk.addEventListener('click', function () { self._back(); }); el.appendChild(bk);
    var c = this._btn('mt-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    c.disabled = st.done; c.addEventListener('click', function () { self._check(); }); el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _after: function () { this._view.note = ''; this._view.bump = false; this._view.step = false; this._paint(); },
  _add: function () {
    var st = this.st, v = this._view, C = MinuteTrainCore, res = C.addCar(st);
    if (res === 'bump') {
      v.bump = true; v.note = this._bumpSaid ? '' : this._t('hintBump'); v.soft = true; this._bumpSaid = true; this.api.sound(200); this._paint();
      if (v.note) this.api.announce(v.note);
      var self = this; this._later(function () { v.bump = false; if (self._wrap) self._paintClock(); }, this.FAST ? 0 : 400);
      return 'bump';
    }
    if (res === 'ring') { v.honour = true; this.api.sound(880); var s2 = this; this._later(function () { v.honour = false; if (s2._wrap) s2._paintClock(); }, this.FAST ? 0 : 1200); }
    else this.api.sound(st.done ? 520 : 600);
    v.note = ''; v.bump = false; v.step = false; v.fresh = st.done ? C.freeClock(st).cars : st.cars; this._paint();
    if (!st.done) this.api.announce(this._t('aCar', { k: st.cars, m: st.cars * 5 }));
    return res;
  },
  _remove: function () { if (!MinuteTrainCore.removeCar(this.st)) return false; this.api.sound(330); this._after(); return true; },
  _type: function (d) { if (!MinuteTrainCore.typeDigit(this.st, d)) return false; this.api.sound(440); this._after(); return true; },
  _back: function () { if (!MinuteTrainCore.back(this.st)) return false; this._after(); return true; },
  _focus: function (b) { if (!MinuteTrainCore.focus(this.st, b)) return false; this._paint(); return true; },
  _keyboard: function (e) {
    var k = e.key;
    if (/^[0-9]$/.test(k)) { e.preventDefault(); this._type(k); }
    else if (k === 'Backspace') { e.preventDefault(); this._back(); }
    else if (k === 'Enter' && (e.target === this._wrap || /^key-|^back$|^box-/.test((e.target.getAttribute && e.target.getAttribute('data-k')) || ''))) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = MinuteTrainCore, self = this; if (st.done) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'ok') { this._success(); return; }
    v.soft = false; v.note = this._t(C.hint(st)); v.bump = false; v.step = false;
    this._paint(); this.api.announce(v.note); this.api.sound(240);
    /* the next hour: once the lap closes, the short hand steps onto the next number for a moment, then goes back */
    if (res.kind === 'nextHour' && !st.help) {
      this._later(function () { if (st.verdict && st.verdict.kind === 'nextHour') { v.step = true; self._paintClock(); self._later(function () { v.step = false; if (self._wrap) self._paintClock(); }, 1000); } }, this.FAST ? 0 : 500);
    }
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = MinuteTrainCore;
    var msg = this._t(C.okKey(r), C.okArgs(r, this._loc()));
    v.note = ''; v.win = true; v.honour = true;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg);
    this.api.sound(988);
    var self = this;
    this._later(function () { v.honour = false; if (self._wrap) self._paintClock(); }, this.FAST ? 0 : 1200);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectMinuteTrainCSS() {
  if (typeof document === 'undefined' || document.getElementById('mt-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.mt-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .mt-wrap:focus{outline:none;}'
  + '.mt-main{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;} .mt-wrap.is-wide .mt-main{flex-direction:row;align-items:center;justify-content:center;gap:18px;}'
  + '.mt-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;} .mt-wrap.is-wide .mt-side{width:250px;flex:none;}'
  + '.mt-row{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;} .mt-wrap.is-wide .mt-row{flex-direction:column;}'
  + '.mt-clock{position:relative;flex:none;} .mt-svg{display:block;overflow:visible;} .mt-srtext{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}'
  + '.mt-face{fill:#FFFDF6;} .mt-rim{fill:none;stroke:#146B5E;stroke-width:8;} .mt-tick{stroke:#8A8197;stroke-width:1.5;} .mt-tick.is-hour{stroke:' + INK + ';stroke-width:3;}'
  + '.mt-num{font-family:' + H + ';font-weight:800;font-size:27px;fill:' + INK + ';} .mt-num.is-bold{fill:#C4522F;font-size:34px;}'
  + '.mt-sleeper{stroke:#C9B99A;stroke-width:3;} .mt-rail{fill:none;stroke:#7A6E5E;stroke-width:2.2;}'
  + '.mt-car path{fill:#146B5E;stroke:' + INK + ';stroke-width:2.5;stroke-linejoin:round;} .mt-wheel{fill:' + INK + ';} .mt-roof{font-family:' + H + ';font-weight:800;font-size:19px;fill:#fff;}'
  + '.mt-car.is-child path{fill:#3E8E80;} .mt-car.is-over path{fill:#CFE6E1;stroke:#7FB3A9;stroke-dasharray:5 4;} .mt-car.is-over .mt-roof{fill:#146B5E;}'
  + '.mt-car.is-part path{fill:#F7C9B6;stroke:#C4522F;stroke-dasharray:5 4;} .mt-car.is-lap path{fill:#E3F0ED;stroke:#7FB3A9;stroke-dasharray:5 4;} .mt-car.is-lap .mt-roof{fill:#146B5E;}'
  + '.mt-car.is-help path{fill:#2E9C88;} .mt-car.is-ghostcar path{fill:#F2784B;opacity:.7;}'
  + '.mt-arch{fill:none;stroke:#8C8170;stroke-width:7;stroke-linejoin:round;} .mt-hit{fill:transparent;} .mt-tunnel{cursor:pointer;} .mt-sign rect{fill:#FFD449;stroke:' + INK + ';stroke-width:2;} .mt-sign text{font-family:' + H + ';font-weight:800;font-size:16px;fill:' + INK + ';}'
  + '.mt-mhand{stroke:#146B5E;stroke-width:7;stroke-linecap:round;} .mt-hhand{stroke:#F2784B;stroke-width:12;stroke-linecap:round;} .mt-hhand-ink{stroke:#2F2A3B;stroke-width:21;stroke-linecap:round;} .mt-hhand.is-step{stroke:#F2784B;opacity:.55;stroke-dasharray:8 6;}'
  + '.mt-barrier{stroke:#fff;stroke-width:13;stroke-linecap:butt;} .mt-barrier-red{stroke:#D7263D;stroke-width:13;stroke-dasharray:7 7;} .mt-cap{fill:' + INK + ';}'
  + '.mt-wrap:not(.is-fast) .mt-hhand-ink{animation:mtBlink .45s ease-in-out 4;} .mt-wrap:not(.is-fast) .mt-barrier.is-pulse{animation:mtBlink .5s ease-in-out 3;}'
  + '.mt-wrap:not(.is-fast) .mt-car.is-new{animation:mtRoll .3s ease-out both;transform-origin:200px 200px;} .mt-wrap:not(.is-fast) .mt-car.is-bump{animation:mtShake .12s ease-in-out 3;transform-origin:200px 200px;} .mt-wrap:not(.is-fast) .mt-train.is-honour{animation:mtLap 1.2s ease-in-out;transform-origin:200px 200px;}'
  + '.mt-train-btns{display:flex;gap:8px;}'
  + '.mt-tbtn{width:72px;height:56px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:0 0 0 2px #CDBFA4 inset,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;display:flex;align-items:center;justify-content:center;gap:2px;} .mt-tbtn svg{width:30px;height:30px;} .mt-tbtn:disabled{opacity:.45;cursor:default;}'
  + '.mt-card{display:flex;align-items:center;gap:4px;padding:8px 10px;border-radius:14px;background:#2F3640;box-shadow:inset 0 0 0 3px #1E232A,0 3px 0 #14181D;} .mt-card.is-glow{box-shadow:inset 0 0 0 3px #1E232A,0 0 0 4px #FFD449;}'
  + '.mt-box{width:68px;height:64px;border:0;border-radius:10px;background:#DDEBD8;box-shadow:0 0 0 2px #9FB89A inset;font-family:' + H + ';font-weight:800;font-size:38px;cursor:pointer;padding:0;} .mt-box.is-h{color:#C4522F;} .mt-box.is-m{color:#146B5E;} .mt-box.is-focus{box-shadow:0 0 0 3px #FFD449 inset;} .mt-box.is-mark{text-decoration:underline;text-decoration-color:#E0603A;text-decoration-thickness:3px;text-underline-offset:4px;} .mt-box:disabled{cursor:default;}'
  + '.mt-sep{font-family:' + H + ';font-weight:800;font-size:32px;color:#DDEBD8;}'
  + '.mt-pad{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:100%;} .mt-wrap.is-narrow .mt-pad{grid-template-columns:repeat(6,minmax(44px,1fr));gap:5px;}'
  + '.mt-key{height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:0 0 0 2px #CDBFA4 inset,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:23px;color:' + INK + ';cursor:pointer;display:flex;align-items:center;justify-content:center;} .mt-key svg{width:24px;height:24px;} .mt-key:disabled{opacity:.45;cursor:default;}'
  + '.mt-go{grid-column:span 2;height:48px;border:0;border-radius:12px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:19px;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0E4F45;} .mt-go svg{width:20px;height:20px;} .mt-go:disabled{opacity:.45;cursor:default;}'
  + '.mt-wrap.is-narrow .mt-key,.mt-wrap.is-narrow .mt-go{height:44px;font-size:20px;} .mt-wrap.is-narrow .mt-go{grid-column:span 1;} .mt-wrap.is-narrow .mt-go span{display:none;} .mt-wrap.is-narrow .mt-go svg{width:24px;height:24px;}'
  + '.mt-wrap.is-narrow .mt-tbtn{width:60px;height:52px;} .mt-wrap.is-narrow .mt-box{width:54px;height:52px;font-size:30px;} .mt-wrap.is-cramp .mt-tbtn{width:52px;height:48px;} .mt-wrap.is-cramp .mt-box{width:48px;height:48px;font-size:27px;} .mt-wrap.is-cramp .mt-row{gap:6px;}'
  + '.mt-rooster{object-fit:contain;pointer-events:none;flex:none;} .mt-wrap:not(.is-fast) .mt-rooster.is-crow{animation:mtBounce .5s ease-out 2;}'
  + '.mt-note{margin:0;max-width:640px;min-height:1.3em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .mt-wrap.is-narrow .mt-note{font-size:16px;line-height:1.25;} .mt-note.is-hint{color:#9A3412;} .mt-wrap.is-narrow .mt-note:empty{display:none;}'
  + '.mt-wrap.is-done .mt-pad{display:none;} .mt-wrap.is-cramp.is-done .mt-tbtn.is-remove{display:none;} .mt-wrap.is-done .mt-note:empty{display:none;}'
  + '@keyframes mtRoll{from{transform:rotate(-30deg);opacity:.4;}to{transform:none;opacity:1;}} @keyframes mtShake{0%,100%{transform:none;}50%{transform:rotate(-3deg);}} @keyframes mtLap{from{transform:rotate(0);}to{transform:rotate(360deg);}}'
  + '@keyframes mtBlink{0%,100%{opacity:1;}50%{opacity:.25;}} @keyframes mtBounce{0%,100%{transform:scale(1);}40%{transform:scale(1.12) translateY(-6px);}}'
  + '.mt-wrap.is-fast *{animation:none !important;transition:none !important;}';
  var s = document.createElement('style'); s.id = 'mt-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.MinuteTrainActivity = MinuteTrainActivity;
